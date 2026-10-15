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

import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

/*
 * Isolated environments for testing real production ES modules (ECMAScript Module, or ESM)
 * without a browser. Browser APIs and external imports are simulated; each loader creates
 * fresh module state and exposes controls for the scenario under test.
 */

/**
 * Loads production consent modules into the supplied isolated VM context.
 * The caller supplies browser globals; module state is never shared across tests.
 * @param {object} context VM context containing the required browser globals.
 * @returns {Promise<object>} Evaluated consent and analyticsEvents modules.
 */
export async function createConsentModule(context) {
  const analyticsSource = await readFile(new URL('../../scripts/analytics-events.js', import.meta.url), 'utf8');
  const analyticsEvents = new vm.SourceTextModule(analyticsSource, { context });
  await analyticsEvents.link(() => {});
  await analyticsEvents.evaluate();
  const source = await readFile(new URL('../../scripts/consent.js', import.meta.url), 'utf8');
  const consent = new vm.SourceTextModule(source, { context });
  await consent.link(() => analyticsEvents);
  await consent.evaluate();
  return { consent, analyticsEvents };
}

/**
 * Provides a fresh consent state and an update function that emits the upstream
 * event payload. No storage, CMP or browser document is required for these tests.
 * @returns {Promise<object>} getConsent(topic) and update(consented) controls.
 */
export async function loadConsent() {
  const window = new EventTarget();
  const context = vm.createContext({ window, Set });
  const { consent: module } = await createConsentModule(context);
  const update = (consented) => {
    const event = new Event('consent.update');
    event.detail = { consented };
    window.dispatchEvent(event);
  };
  return {
    getConsent: module.namespace.getConsent,
    topics: module.namespace.CONSENT_TOPICS,
    update,
  };
}

/**
 * Loads real Commerce history code with an in-memory store and controllable ACDL
 * listeners. Drop-in/config imports are stubbed; emit() simulates future events.
 * @returns {Promise<object>} Commerce exports, storage, listeners, document,
 *  and update/emit controls for consent changes and data-layer events.
 */
export async function loadCommerce() {
  const window = new EventTarget();
  const storage = new Map();
  const listeners = new Map();
  const state = {
    shoppingCartContext: { items: [{ product: { sku: 'purchased-sku' } }] },
  };
  const dataLayer = {
    addEventListener(name, callback) {
      const callbacks = listeners.get(name) || [];
      callbacks.push(callback);
      listeners.set(name, callbacks);
    },
    getState: (name) => state[name],
  };
  window.location = { hostname: 'localhost', href: 'https://localhost/' };
  window.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  window.adobeDataLayer = { push: (callback) => callback(dataLayer) };
  const document = { addEventListener() {}, prerendering: false };
  const context = vm.createContext({ window, document, console, URL, URLSearchParams, structuredClone });
  const modules = new Map();
  const stubs = {
    '@dropins/tools/lib.js': { getCookie() {} },
    '@dropins/tools/lib/aem/configs.js': {
      getHeaders: () => ({ 'magento-store-view-code': 'store' }),
      getConfigValue() {}, getRootPath() {}, initializeConfig() {}, getListOfRootPaths() {},
    },
    '@dropins/tools/event-bus.js': { events: {} },
    '@dropins/tools/fetch-graphql.js': { FetchGraphQL: class {} },
    './aem.js': { getMetadata() {}, readBlockConfig() {} },
    './initializers/index.js': { default() {} },
    './acdl/adobe-client-data-layer.min.js': {},
  };
  /** Resolves imports to cached production modules or declared dependency stubs. */
  async function resolve(specifier) {
    if (modules.has(specifier)) return modules.get(specifier);
    let module;
    if (specifier in stubs) {
      const exports = stubs[specifier];
      module = new vm.SyntheticModule(Object.keys(exports), function initialize() {
        Object.entries(exports).forEach(([name, value]) => this.setExport(name, value));
      }, { context });
    } else {
      const source = await readFile(new URL(`../../scripts/${specifier.replace('./', '')}`, import.meta.url), 'utf8');
      module = new vm.SourceTextModule(source, {
        context,
        importModuleDynamically: async (dependency) => {
          const imported = await resolve(dependency);
          if (imported.status === 'linked') await imported.evaluate();
          return imported;
        },
      });
    }
    modules.set(specifier, module);
    await module.link(resolve);
    return module;
  }
  const commerce = await resolve('./commerce.js');
  await commerce.evaluate();
  return {
    commerce: commerce.namespace, storage, listeners, document,
    update(consented) {
      const event = new Event('consent.update');
      event.detail = { consented };
      window.dispatchEvent(event);
    },
    emit(name, event = {}) {
      (listeners.get(name) || []).forEach((callback) => callback(event));
    },
  };
}

/**
 * Seeds prior-session history and loads the real recommendations block with a
 * minimal DOM/render double. Records storage reads, initial props and setProps
 * updates without mounting the actual drop-in or making GraphQL requests.
 * @returns {Promise<object>} Readers, storage, read counts, recorded props,
 *  and render/update controls for mounting and consent transitions.
 */
export async function loadRecommendationReaders() {
  const window = new EventTarget();
  const timers = [];
  const renders = [];
  const propUpdates = [];
  const container = { children: [] };
  const document = {
    createRange: () => ({
      createContextualFragment: () => ({ querySelector: () => container }),
    }),
  };
  window.adobeDataLayer = { push: (callback) => callback({ addEventListener() {} }) };
  const storage = new Map([
    ['store:productViewHistory', JSON.stringify([{ sku: 'old-view', date: '2026-01-01' }])],
    ['store:purchaseHistory', JSON.stringify([{ items: ['old-purchase'], date: '2026-01-01' }])],
  ]);
  let reads = 0;
  window.matchMedia = () => ({ matches: false });
  window.localStorage = {
    getItem(key) { reads += 1; return storage.get(key) ?? null; },
    removeItem: (key) => storage.delete(key),
  };
  const context = vm.createContext({
    window, document, console,
    setTimeout: (callback) => { timers.push(callback); return timers.length; },
    clearTimeout() {},
  });
  const { consent } = await createConsentModule(context);
  const exports = {
    events: {
      on(name, callback) { if (name === 'cart/data') callback({ totalQuantity: 0 }); },
    },
    getConfigValue() {}, Button() {}, Icon() {}, provider: {},
    tryRenderAemAssetsImage() {}, default() {},
    render: {
      render(component, props) {
        renders.push(props);
        return async () => ({
          setProps(callback) { propUpdates.push(callback(props)); },
        });
      },
    },
    publishRecsItemAddToCartClick() {}, WishlistToggle() {},
    readBlockConfig: () => ({}), fetchPlaceholders: async () => ({}), getProductLink() {},
    getStoreIdentifier: () => 'store', getConsent: consent.namespace.getConsent,
    CONSENT_TOPICS: consent.namespace.CONSENT_TOPICS,
  };
  const dependency = new vm.SyntheticModule(Object.keys(exports), function initialize() {
    Object.entries(exports).forEach(([name, value]) => this.setExport(name, value));
  }, { context });
  await dependency.link(() => {});
  const source = await readFile(new URL('../../blocks/product-recommendations/product-recommendations.js', import.meta.url), 'utf8');
  const module = new vm.SourceTextModule(source, { context });
  await module.link((specifier) => (
    specifier === '../../scripts/consent.js' ? consent : dependency
  ));
  await module.evaluate();
  return {
    readers: module.namespace, storage, reads: () => reads, renders, propUpdates,
    async render() {
      await module.namespace.default({ children: [], appendChild() {} });
      timers.splice(0).forEach((callback) => callback());
      await new Promise((resolve) => setImmediate(resolve));
    },
    update(consented) {
      const event = new Event('consent.update');
      event.detail = { consented };
      window.dispatchEvent(event);
    },
  };
}

/**
 * Executes real consent/analytics loaders after initializing the analytics
 * event adapter as loadCommerceLazy does, then records imports, ACDL pushes and
 * Alloy calls. beforeImport reproduces races; settle drains nested imports.
 * @param {object} options URL search, prerendering state, analytics config and
 *  an optional beforeImport hook executed before a dynamic dependency loads.
 * @returns {Promise<object>} Browser doubles, import/push/Alloy recordings,
 *  and load/update/settle controls for executing and completing scenarios.
 */
export async function loadAnalytics({
  search = '',
  hostname = 'localhost',
  prerendering = false,
  beforeImport,
  analytics = {},
} = {}) {
  const window = new EventTarget();
  const document = new EventTarget();
  document.prerendering = prerendering;
  document.cookie = '';
  window.location = { search, hostname };
  const pushes = [];
  const imports = [];
  const pendingImports = [];
  const alloyCalls = [];
  const warnings = [];
  const testConsole = Object.create(console);
  testConsole.warn = (...args) => warnings.push(args);
  window.magentoStorefrontEvents = {
    subscribe: {}, publish: { pageView() {} },
  };
  window.adobeDataLayer = { push: (...items) => pushes.push(...items) };
  window.alloy = (...args) => { alloyCalls.push(args); return Promise.resolve(); };
  const context = vm.createContext({
    window, document, URLSearchParams, console: testConsole, structuredClone,
    CustomEvent: class extends Event {
      constructor(name, options) { super(name); this.detail = options.detail; }
    },
  });
  const { consent, analyticsEvents } = await createConsentModule(context);
  analyticsEvents.namespace.initializeAnalyticsEvents(
    () => consent.namespace.getConsent(consent.namespace.CONSENT_TOPICS.COLLECTION)
      && !document.prerendering,
  );
  const exports = {
    getConfigValue: () => analytics,
    getUserTokenCookie: () => null,
    getConsent: consent.namespace.getConsent,
  };
  const dependencies = new vm.SyntheticModule(Object.keys(exports), function initialize() {
    Object.entries(exports).forEach(([name, value]) => this.setExport(name, value));
  }, { context });
  await dependencies.link(() => {});
  const moduleCache = new Map();
  /** Evaluates a production loader while replacing SDK/collector side effects. */
  async function load(filename) {
    if (moduleCache.has(filename)) return moduleCache.get(filename);
    const source = await readFile(new URL(`../../scripts/${filename}`, import.meta.url), 'utf8');
    const module = new vm.SourceTextModule(source, {
      context,
      importModuleDynamically: (specifier) => {
        imports.push(specifier);
        const pending = (async () => {
          if (beforeImport) await beforeImport(specifier);
          if (specifier === './consented.js') return load('consented.js');
          const imported = new vm.SyntheticModule([], () => {}, { context });
          await imported.link(() => {});
          await imported.evaluate();
          return imported;
        })();
        pendingImports.push(pending);
        return pending;
      },
    });
    moduleCache.set(filename, module);
    await module.link((specifier) => {
      if (specifier === './consent.js') return consent;
      if (specifier === './analytics-events.js') return analyticsEvents;
      return dependencies;
    });
    await module.evaluate();
    return module;
  }
  return {
    window, document, imports, pushes, alloyCalls, warnings, load,
    update(consented) {
      const event = new Event('consent.update');
      event.detail = { consented };
      window.dispatchEvent(event);
    },
    async settle() {
      let settled = 0;
      while (settled < pendingImports.length) {
        // A resolved import can schedule more imports; drain until the chain is stable.
        const batch = pendingImports.slice(settled);
        settled = pendingImports.length;
        await Promise.all(batch);
        await new Promise((resolve) => setImmediate(resolve));
      }
    },
  };
}