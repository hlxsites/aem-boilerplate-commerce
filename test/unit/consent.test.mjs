/*
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import {
  createConsentModule,
  loadConsent,
  loadCommerce,
  loadRecommendationReaders,
  loadAnalytics,
} from '../helpers/consent-environments.mjs';

/*
 * These tests execute real production modules in isolated Node VM contexts.
 * Helpers simulate browser APIs and external dependencies, not a full browser.
 * Scenario-specific doubles remain inline where their behavior is the regression.
 */

// --- Consent state ---
test('public topic constants preserve their values and are immutable', async () => {
  const context = vm.createContext({ window: new EventTarget() });
  const { consent } = await createConsentModule(context);
  const topics = consent.namespace.CONSENT_TOPICS;
  assert.equal(topics.COLLECTION, 'commerce-collection');
  assert.equal(topics.RECOMMENDATIONS, 'commerce-recommendations');
  assert.equal(Object.keys(topics).length, 2);
  assert.equal(Object.isFrozen(topics), true);
});

test('omitted or empty topic returns global consent; invalid topics never grant consent', async () => {
  const { getConsent, update } = await loadConsent();
  for (const consented of [false, true, false, true]) {
    update(consented);
    assert.equal(getConsent(), consented);
    assert.equal(getConsent(''), consented);
    assert.equal(getConsent(undefined), consented);
    for (const topic of [null, false, 0, true, 1, ' ', 'unknown', [], {}]) {
      assert.equal(getConsent(topic), false);
    }
  }
});

test('known and unknown topics are denied before consent', async () => {
  const { getConsent, topics } = await loadConsent();
  assert.equal(getConsent(topics.COLLECTION), false);
  assert.equal(getConsent(topics.RECOMMENDATIONS), false);
  assert.equal(getConsent('unknown'), false);
});

test('acceptance, repeated acceptance, revocation and reacceptance', async () => {
  const { getConsent, topics, update } = await loadConsent();
  for (const consented of [true, true, false, true]) {
    update(consented);
    assert.equal(getConsent(topics.COLLECTION), consented);
    assert.equal(getConsent(topics.RECOMMENDATIONS), consented);
    assert.equal(getConsent('unknown'), false);
  }
});

test('malformed consent values never grant consent', async () => {
  const { getConsent, topics, update } = await loadConsent();
  for (const consented of ['true', 1, null, undefined]) {
    update(consented);
    assert.equal(getConsent(topics.COLLECTION), false);
  }
});

// --- History persistence and listener lifecycle ---
test('history is gated, retained on revocation and listeners are registered once', async () => {
  const app = await loadCommerce();
  await app.commerce.loadCommerceLazy();
  await app.commerce.loadCommerceLazy();
  assert.equal(app.listeners.get('adobeDataLayer:event').length, 1);
  assert.equal(app.listeners.get('adobeDataLayer:change').length, 1);
  assert.equal(app.listeners.get('place-order').length, 1);
  const view = { productContext: { sku: 'viewed-sku' } };
  app.emit('adobeDataLayer:change', view);
  app.emit('place-order');
  assert.equal(app.storage.size, 0);
  app.update(true);
  app.emit('adobeDataLayer:change', view);
  app.emit('place-order');
  assert.equal(JSON.parse(app.storage.get('store:productViewHistory'))[0].sku, 'viewed-sku');
  assert.deepEqual(JSON.parse(app.storage.get('store:purchaseHistory'))[0].items, ['purchased-sku']);
  const stored = [...app.storage];
  app.update(false);
  app.emit('adobeDataLayer:change', { productContext: { sku: 'declined-sku' } });
  app.emit('place-order');
  assert.deepEqual([...app.storage], stored);
  app.update(true);
  app.emit('place-order');
  assert.equal(JSON.parse(app.storage.get('store:purchaseHistory')).length, 2);
});

test('history preserves twenty-entry limits, unique views and prerendering guard', async () => {
  const app = await loadCommerce();
  await app.commerce.loadCommerceLazy();
  app.update(true);
  for (let index = 0; index < 25; index += 1) {
    app.emit('adobeDataLayer:change', { productContext: { sku: `sku-${index}` } });
    app.emit('place-order');
  }
  const views = () => JSON.parse(app.storage.get('store:productViewHistory'));
  assert.equal(views().length, 20);
  assert.equal(views()[0].sku, 'sku-5');
  app.emit('adobeDataLayer:change', { productContext: { sku: 'sku-5' } });
  assert.equal(views().length, 20);
  assert.equal(views().at(-1).sku, 'sku-5');
  assert.equal(JSON.parse(app.storage.get('store:purchaseHistory')).length, 20);
  const stored = [...app.storage];
  app.document.prerendering = true;
  app.emit('adobeDataLayer:change', { productContext: { sku: 'prerendered' } });
  app.emit('place-order');
  assert.deepEqual([...app.storage], stored);
});

// --- Recommendations: history readers and rendered props ---
test('recommendations never read existing history without consent and retain it on revocation', async () => {
  const app = await loadRecommendationReaders();
  const original = [...app.storage];
  assert.equal(app.readers.getProductViewHistory().length, 0);
  assert.equal(app.readers.getPurchaseHistory().length, 0);
  assert.equal(app.reads(), 0);
  app.update(true);
  assert.equal(app.readers.getProductViewHistory()[0].sku, 'old-view');
  assert.equal(app.readers.getPurchaseHistory()[0].items[0], 'old-purchase');
  const previousReads = app.reads();
  app.update(false);
  assert.equal(app.readers.getProductViewHistory().length, 0);
  assert.equal(app.readers.getPurchaseHistory().length, 0);
  assert.equal(app.reads(), previousReads);
  assert.deepEqual([...app.storage], original);
  app.update(true);
  assert.equal(app.readers.getProductViewHistory()[0].sku, 'old-view');
});

test('rendered recommendation props lose history on revocation and regain it only on reacceptance', async () => {
  const app = await loadRecommendationReaders();
  app.update(true);
  await app.render();
  assert.equal(app.renders[0].userViewHistory[0].sku, 'old-view');
  app.update(false);
  assert.equal(app.propUpdates.at(-1).userViewHistory.length, 0);
  assert.equal(app.propUpdates.at(-1).userPurchaseHistory.length, 0);
  assert.equal(app.storage.size, 2);
  app.update(true);
  assert.equal(app.propUpdates.at(-1).userViewHistory[0].sku, 'old-view');
  const updates = app.propUpdates.length;
  app.update(true);
  assert.equal(app.propUpdates.length, updates);
});

// --- Analytics: loading, revocation and asynchronous imports ---
test('upstream query accepts documented values and defaults to denied', async () => {
  for (const value of ['', 'decline', 'false', '0', 'no', 'invalid']) {
    const app = await loadAnalytics({ search: value ? `?consent=${value}` : '' });
    await app.load('consent-check.js');
    await app.settle();
    assert.deepEqual(app.imports, []);
  }
  for (const value of ['accept', 'true', '1', 'yes', 'ACCEPT']) {
    const app = await loadAnalytics({ search: `?consent=${value}` });
    await app.load('consent-check.js');
    await app.settle();
    assert.deepEqual(app.imports, ['./consented.js', './commerce-events-sdk.js', './commerce-events-collector.js']);
  }
});

test('consent query override is ignored on AEM preview and storefront hosts', async () => {
  for (const hostname of [
    'branch--repo--owner.aem.page',
    'www.storefront.example',
    'main--repo--owner.aem.live',
  ]) {
    const app = await loadAnalytics({ hostname, search: '?consent=accept' });
    await app.load('consent-check.js');
    await app.settle();
    assert.deepEqual(app.imports, []);
  }
});

test('testing placeholder warning is emitted once per load, regardless of query override', async () => {
  for (const search of ['', '?consent=accept']) {
    const app = await loadAnalytics({ search, analytics: null });
    await app.load('consent-check.js');
    await app.settle();
    assert.equal(app.warnings.length, 1);
    assert.match(app.warnings[0][0], /consent-check\.js testing placeholder/);
    app.update(false);
    app.update(true);
    app.update(false);
    assert.equal(app.warnings.length, 1);
  }
});

test('late consent loads analytics once and revocation disables forwarding without erasing history', async () => {
  const app = await loadAnalytics({
    analytics: { 'aep-ims-org-id': 'org', 'aep-datastream-id': 'stream' },
  });
  await app.load('consent-check.js');
  assert.deepEqual(app.imports, []);
  app.update(true);
  await app.settle();
  const initialImports = [...app.imports];
  app.update(true);
  await app.settle();
  assert.deepEqual(app.imports, initialImports);
  app.update(false);
  await app.settle();
  assert.equal(app.document.cookie, 'mg_dnt=true; path=/; SameSite=Lax');
  assert.equal(app.pushes.at(-1).eventForwardingContext.commerce, false);
  assert.equal(app.pushes.at(-1).eventForwardingContext.aep, false);
  assert.equal(app.alloyCalls.at(-1)[1].consent[0].value.general, 'out');
  app.update(true);
  await app.settle();
  assert.deepEqual(app.imports, initialImports);
  assert.equal(app.pushes.at(-1).eventForwardingContext.commerce, true);
});

test('prerendering and absent analytics configuration never import SDK or collector', async () => {
  const app = await loadAnalytics({ search: '?consent=accept', prerendering: true });
  await app.load('consent-check.js');
  await app.settle();
  assert.deepEqual(app.imports, ['./consented.js']);
  app.document.prerendering = false;
  app.document.dispatchEvent(new Event('prerenderingchange'));
  await app.settle();
  assert.equal(app.imports.at(-1), './commerce-events-collector.js');
  const unconfigured = await loadAnalytics({ search: '?consent=accept', analytics: null });
  await unconfigured.load('consent-check.js');
  await unconfigured.settle();
  assert.deepEqual(unconfigured.imports, ['./consented.js']);
  assert.deepEqual(unconfigured.pushes.filter((item) => typeof item !== 'function'), []);
});

test('revocation while SDK is loading prevents collector import', async () => {
  let app;
  let revoked = false;
  app = await loadAnalytics({
    search: '?consent=accept',
    beforeImport(specifier) {
      // Revoke while the SDK is loading, before the collector can be imported.
      if (specifier === './commerce-events-sdk.js' && !revoked) {
        revoked = true;
        app.update(false);
      }
    },
  });
  await app.load('consent-check.js');
  await app.settle();
  assert.deepEqual(app.imports, ['./consented.js', './commerce-events-sdk.js']);
  app.update(true);
  await app.settle();
  assert.equal(app.imports.at(-1), './commerce-events-collector.js');
});

// --- Analytics regression: pre-consent ACDL replay ---
test('collector subscriptions replay only authorized events, including those generated while loading', async () => {
  const window = new EventTarget();
  const past = [];
  const listeners = [];
  const received = [];
  const dataLayer = {
    addEventListener(name, handler, options = {}) {
      // Real ACDL replays past matching events unless the listener requests future only.
      if (options.scope !== 'future') {
        past.filter((event) => event.event === name).forEach((event) => handler(structuredClone(event)));
      }
      listeners.push({ name, handler });
    },
    removeEventListener(name, handler) {
      const index = listeners.findIndex((listener) => listener.name === name && listener.handler === handler);
      if (index !== -1) listeners.splice(index, 1);
    },
  };
  window.adobeDataLayer = {
    push(item) {
      if (typeof item === 'function') { item(dataLayer); return; }
      past.push(item);
      for (const name of ['adobeDataLayer:event', item.event]) {
        listeners.filter((listener) => listener.name === name)
          .forEach((listener) => listener.handler(structuredClone(item)));
      }
    },
  };
  const context = vm.createContext({ window, structuredClone });
  const { consent, analyticsEvents } = await createConsentModule(context);
  analyticsEvents.namespace.initializeAnalyticsEvents(
    () => consent.namespace.getConsent(consent.namespace.CONSENT_TOPICS.COLLECTION)
      && !window.document?.prerendering,
  );
  const update = (consented) => {
    const event = new Event('consent.update');
    event.detail = { consented };
    window.dispatchEvent(event);
  };
  const sdk = {
    subscribe: {
      pageView(handler, options) { this.addEventListener('page-view', handler, options); },
      searchRequestSent(handler) { this.addEventListener('search-request-sent', handler); },
      addEventListener: dataLayer.addEventListener.bind(dataLayer),
    },
    unsubscribe: {
      pageView(handler) { this.removeEventListener('page-view', handler); },
      removeEventListener: dataLayer.removeEventListener.bind(dataLayer),
    },
  };
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'denied' } });
  update(true);
  analyticsEvents.namespace.startAnalyticsEventCapture();
  // Accepted events can arrive before the collector registers its subscriptions.
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'accepted-while-loading' } });
  analyticsEvents.namespace.configureAnalyticsSubscriptions(sdk);
  sdk.subscribe.pageView((event) => received.push(event.eventInfo.id));
  sdk.subscribe.searchRequestSent((event) => received.push(event.eventInfo.id));
  assert.deepEqual(received, ['accepted-while-loading']);
  analyticsEvents.namespace.finishAnalyticsEventCapture();
  const lateSubscriber = [];
  sdk.subscribe.pageView((event) => lateSubscriber.push(event.eventInfo.id));
  assert.deepEqual(lateSubscriber, []);
  window.adobeDataLayer.push({ event: 'search-request-sent', eventInfo: { id: 'accepted-future' } });
  assert.deepEqual(received, ['accepted-while-loading', 'accepted-future']);
  assert.deepEqual(lateSubscriber, []);
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'accepted-after-load' } });
  assert.deepEqual(received, ['accepted-while-loading', 'accepted-future', 'accepted-after-load']);
  assert.deepEqual(lateSubscriber, ['accepted-after-load']);
  update(false);
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'revoked' } });
  assert.equal(received.length, 3);
  update(true);
  const newSubscriber = [];
  const handler = (event) => newSubscriber.push(event.eventInfo.id);
  sdk.subscribe.pageView(handler);
  assert.deepEqual(newSubscriber, []);
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'reaccepted' } });
  assert.deepEqual(newSubscriber, ['reaccepted']);
  sdk.unsubscribe.pageView(handler);
  sdk.unsubscribe.pageView(() => {});
  window.adobeDataLayer.push({ event: 'page-view', eventInfo: { id: 'unsubscribed' } });
  assert.deepEqual(newSubscriber, ['reaccepted']);
  assert.equal(past.length, 7);
});

// --- Page-loading regression: ACDL readiness before delayed consent ---
test('delayed consent waits for Commerce lazy initialization', async () => {
  let ready;
  let release;
  const lazyStarted = new Promise((resolve) => { ready = resolve; });
  const lazyComplete = new Promise((resolve) => { release = resolve; });
  const imports = [];
  const document = {
    documentElement: {},
    querySelector: () => null,
    getElementById: () => null,
  };
  const window = { location: { hash: '', hostname: 'localhost' }, hlx: { codeBasePath: '' } };
  const context = vm.createContext({
    document, window, console, sessionStorage: { getItem: () => null },
  });
  const aem = {
    loadHeader() {}, loadFooter() {}, decorateIcons() {}, decorateBlocks() {},
    decorateTemplateAndTheme() {}, waitForFirstImage() {}, loadSection() {},
    loadSections: async () => {}, loadCSS: async () => {}, buildBlock() {},
  };
  const commerce = {
    loadCommerceEager() {},
    loadCommerceLazy: () => { ready(); return lazyComplete; },
    initializeCommerce() {}, applyTemplates() {}, decorateLinks() {}, loadErrorPage() {},
    decorateSections() {}, IS_UE: false, IS_DA: false,
  };
  function dependency(exports) {
    return new vm.SyntheticModule(Object.keys(exports), function initialize() {
      Object.entries(exports).forEach(([name, value]) => this.setExport(name, value));
    }, { context });
  }
  const aemModule = dependency(aem);
  const commerceModule = dependency(commerce);
  const source = await readFile(new URL('../../scripts/scripts.js', import.meta.url), 'utf8');
  const module = new vm.SourceTextModule(source, {
    context,
    importModuleDynamically: async (specifier) => {
      imports.push(specifier);
      const imported = dependency({});
      await imported.link(() => {});
      await imported.evaluate();
      return imported;
    },
  });
  await module.link((specifier) => (specifier === './aem.js' ? aemModule : commerceModule));
  await module.evaluate();
  await lazyStarted;
  // Keep Commerce lazy unresolved to prove that delayed consent has not started.
  assert.deepEqual(imports, []);
  release();
  await new Promise((resolve) => setImmediate(resolve));
  assert.deepEqual(imports, ['./consent-check.js']);
});