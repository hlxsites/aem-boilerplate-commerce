function waitForConsentGate(consented) {
  cy.wait('@consentGate');
  cy.window().should((win) => {
    expect(win.__consentDecisions, 'one load-time consent notification').to.deep.equal([{ consented }]);
    expect(win.adobeDataLayer?.getState, 'real ACDL initialized').to.be.a('function');
  });
}

// Native module caching makes this a settlement barrier, not another initialization.
// Do not use while a real module response is deliberately held.
function settleConsentedModule() {
  return cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
    const script = win.document.createElement('script');
    script.type = 'module';
    script.nonce = 'aem';
    script.src = '/scripts/consented.js';
    script.onload = () => { script.remove(); resolve(); };
    script.onerror = () => { script.remove(); reject(new Error('consented.js failed to evaluate')); };
    win.document.head.appendChild(script);
  }));
}

function getStoreIdentifier(win) {
  const { public: { default: config } = {} } = JSON.parse(win.sessionStorage.getItem('config') || '{}');
  const headers = { ...config?.headers?.all, ...config?.headers?.cs };
  const name = Object.keys(headers).find(
    (key) => ['magento-store-view-code', 'ac-view-id'].includes(key.toLowerCase()),
  );
  expect(name, 'configured history store').to.exist;
  return headers[name];
}

function expectInitialPageView(win) {
  expect(win.adobeDataLayer.filter((entry) => entry?.event === 'page-view'),
    'one native initial page view').to.have.length(1);
}

function expectNoCollectors() {
  cy.get('@sdk.all').should('have.length', 0);
  cy.get('@collector.all').should('have.length', 0);
  cy.get('@analytics.all').should('have.length', 0);
}

function waitForAnalytics() {
  cy.wait('@sdk');
  cy.wait('@collector');
  cy.window().should((win) => {
    expect(win.magentoStorefrontEvents?.publish?.pageView, 'real SDK executed').to.be.a('function');
    expect(win.adobeDataLayer.getState('eventForwardingContext')?.commerce).to.equal(true);
  });
  cy.wait('@analytics');
}

describe('Commerce consent load gate', () => {
  let releases;
  let observedConsent;

  // Hold the real response body, never replace a library with a mock.
  function holdModule(path, alias) {
    let started = false;
    let release;
    const held = new Cypress.Promise((resolve) => { release = resolve; });
    releases.push(release);
    cy.intercept(path, (request) => {
      started = true;
      request.continue(() => held);
    }).as(alias);
    return {
      waitForStart: () => cy.wrap(null).should(() => {
        expect(started, `${path} request started`).to.equal(true);
      }),
      release: () => cy.then(() => { release(); }),
    };
  }

  beforeEach(() => {
    releases = [];
    cy.on('window:before:load', (win) => {
      observedConsent = false;
      win.sessionStorage.removeItem('config');
      win.__consentDecisions = [];
      win.addEventListener('consent.update', (event) => {
        observedConsent = event.detail?.consented === true;
        win.__consentDecisions.push(event.detail);
      });
    });
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
    cy.clearAllCookies();
    cy.interceptConfig();
    cy.intercept('**/config.json', (request) => {
      request.continue((response) => {
        const config = response.body.public.default.analytics;
        if (config) {
          delete config['aep-ims-org-id'];
          delete config['aep-datastream-id'];
        }
      });
    });
    cy.intercept('**/scripts/**/*.js', { middleware: true }, (request) => {
      delete request.headers['if-none-match'];
      delete request.headers['if-modified-since'];
      request.on('before:response', (response) => {
        response.headers['cache-control'] = 'no-store';
      });
    });
    cy.intercept('**/scripts/consent-check.js').as('consentGate');
    cy.intercept('**/scripts/commerce-events-sdk.js').as('sdk');
    cy.intercept('**/scripts/commerce-events-collector.js').as('collector');
    cy.intercept('https://commerce.adobedc.net/collector/**', {
      statusCode: 200, body: '',
    }).as('analytics');
  });

  afterEach(() => {
    releases.forEach((release) => release());
  });

  ['/', '/?consent=', '/?consent=decline', '/?consent=invalid'].forEach((url) => {
    it(`retains data without loading collectors at ${url}`, () => {
      cy.visit(url);
      waitForConsentGate(false);
      cy.window().then((win) => {
        const entry = { event: 'page-view', eventInfo: { marker: 'denied-retained' } };
        win.adobeDataLayer.push(entry);
        expect(win.adobeDataLayer.filter((event) => event?.eventInfo?.marker === 'denied-retained'))
          .to.deep.equal([entry]);
        expect(win.magentoStorefrontEvents).to.be.undefined;
      });
      expectNoCollectors();
    });
  });

  ['true', '1', 'yes', 'ACCEPT'].forEach((consent) => {
    it(`loads analytics for upstream consent value ${consent}`, () => {
      cy.visit('/', { qs: { consent } });
      waitForConsentGate(true);
      settleConsentedModule();
      waitForAnalytics();
      cy.window().then(expectInitialPageView);
    });
  });

  function visitWithStoredHistory(
    consented,
    path = Cypress.env('prexPages').pdpAcdlOnly,
    onBeforeLoad = () => {},
  ) {
    cy.request('/config.json').then(({ body }) => {
      const config = body.public.default;
      const headers = { ...config.headers?.all, ...config.headers?.cs };
      const name = Object.keys(headers).find(
        (key) => ['magento-store-view-code', 'ac-view-id'].includes(key.toLowerCase()),
      );
      expect(name, 'configured history store').to.exist;
      const identifier = headers[name];
      cy.visit(path, {
        qs: consented ? { consent: 'accept' } : {},
        onBeforeLoad(win) {
          const date = '2026-01-01T00:00:00.000Z';
          win.localStorage.setItem(`${identifier}:productViewHistory`, JSON.stringify([
            { sku: 'ADB156', date },
          ]));
          win.localStorage.setItem(`${identifier}:purchaseHistory`, JSON.stringify([
            { items: ['ADB174'], date },
          ]));
          onBeforeLoad(win);
        },
      });
    });
  }

  function pushHistoryActivity(win, sku) {
    win.adobeDataLayer.push(
      { productContext: { sku } },
      { shoppingCartContext: { items: [{ product: { sku } }] } },
      { event: 'place-order' },
    );
  }

  it('retains existing history while consent is unknown, then deletes it on denial without reading it', () => {
    const gate = holdModule('**/scripts/consent-check.js', 'consentGate');
    visitWithStoredHistory(false, '/', (win) => {
      cy.spy(win.Storage.prototype, 'getItem').as('historyReads');
      cy.spy(win.Storage.prototype, 'setItem').as('historyWrites');
    });
    gate.waitForStart();
    cy.window().should((win) => {
      expect(win.adobeDataLayer?.getState).to.be.a('function');
      expect(win.__consentDecisions).to.deep.equal([]);
    }).then((win) => {
      const identifier = getStoreIdentifier(win);
      // Property access checks preservation without calling the spied getItem.
      expect(win.localStorage[`${identifier}:productViewHistory`]).to.contain('ADB156');
      expect(win.localStorage[`${identifier}:purchaseHistory`]).to.contain('ADB174');
      pushHistoryActivity(win, 'BEFORE-CONSENT');
    });
    gate.release();
    waitForConsentGate(false);
    cy.window().then((win) => { pushHistoryActivity(win, 'DENIED'); });
    ['historyReads', 'historyWrites'].forEach((alias) => {
      cy.get(`@${alias}`).should((spy) => {
        const historyCalls = spy.getCalls().filter(
          ({ args }) => /:(productViewHistory|purchaseHistory)$/.test(args[0]),
        );
        expect(historyCalls, `${alias} without consent`).to.have.length(0);
      });
    });
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).to.equal(null);
      expect(win.localStorage.getItem(`${identifier}:purchaseHistory`)).to.equal(null);
    });
    expectNoCollectors();
  });

  it('records only consented activity and clears history on withdrawal without replay on reacceptance', () => {
    visitWithStoredHistory(false, '/');
    waitForConsentGate(false);
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      const viewKey = `${identifier}:productViewHistory`;
      const purchaseKey = `${identifier}:purchaseHistory`;
      win.localStorage.setItem('other-store:productViewHistory', '[]');
      win.localStorage.setItem('essential-test-data', 'keep');
      pushHistoryActivity(win, 'BEFORE-CONSENT');
      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: true } }));
      expect(win.localStorage.getItem(viewKey)).to.equal(null);
      expect(win.localStorage.getItem(purchaseKey)).to.equal(null);

      pushHistoryActivity(win, 'CONSENTED');
      expect(JSON.parse(win.localStorage.getItem(viewKey)).map(({ sku }) => sku))
        .to.deep.equal(['CONSENTED']);
      expect(JSON.parse(win.localStorage.getItem(purchaseKey)).map(({ items }) => items))
        .to.deep.equal([['CONSENTED']]);

      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: false } }));
      expect(win.localStorage.getItem(viewKey)).to.equal(null);
      expect(win.localStorage.getItem(purchaseKey)).to.equal(null);
      expect(win.localStorage.getItem('other-store:productViewHistory')).to.equal('[]');
      expect(win.localStorage.getItem('essential-test-data')).to.equal('keep');
      pushHistoryActivity(win, 'AFTER-WITHDRAWAL');
      expect(win.localStorage.getItem(viewKey)).to.equal(null);
      expect(win.localStorage.getItem(purchaseKey)).to.equal(null);

      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: true } }));
      expect(win.localStorage.getItem(viewKey)).to.equal(null);
      expect(win.localStorage.getItem(purchaseKey)).to.equal(null);
      pushHistoryActivity(win, 'NEW-CONSENT');
      expect(JSON.parse(win.localStorage.getItem(viewKey)).map(({ sku }) => sku))
        .to.deep.equal(['NEW-CONSENT']);
      expect(JSON.parse(win.localStorage.getItem(purchaseKey)).map(({ items }) => items))
        .to.deep.equal([['NEW-CONSENT']]);
    });
    expectNoCollectors();
  });

  it('applies a denial from another document without rebroadcasting it', () => {
    visitWithStoredHistory(true, '/');
    waitForConsentGate(true);
    let peer;
    let messages;
    cy.window().then((win) => {
      peer = new win.BroadcastChannel('storefront:consent');
      messages = cy.spy(win.BroadcastChannel.prototype, 'postMessage');
      peer.postMessage({ type: 'GRANTED' });
      peer.postMessage({ type: 'DECLINED' });
    });
    cy.window().should((win) => {
      expect(win.__consentDecisions).to.deep.equal([{ consented: true }, { consented: false }]);
    }).then((win) => {
      const identifier = getStoreIdentifier(win);
      const echoedMessages = messages.getCalls().filter(
        ({ thisValue }) => thisValue.name === 'storefront:consent' && thisValue !== peer,
      );
      expect(echoedMessages, 'remote denial is not rebroadcast').to.have.length(0);
      pushHistoryActivity(win, 'AFTER-REMOTE-DENIAL');
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).to.equal(null);
      expect(win.localStorage.getItem(`${identifier}:purchaseHistory`)).to.equal(null);
      peer.close();
    });
  });

  it('broadcasts a local denial to other documents', () => {
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    cy.window().then((win) => new Cypress.Promise((resolve, reject) => {
      const peer = new win.BroadcastChannel('storefront:consent');
      const timeout = win.setTimeout(() => {
        peer.close();
        reject(new Error('Cross-tab consent notification was not received'));
      }, 5000);
      peer.onmessage = ({ data }) => {
        win.clearTimeout(timeout);
        peer.close();
        resolve(data);
      };
      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: false } }));
    })).should('deep.equal', { type: 'DECLINED' });
  });

  it('broadcasts the initial denial to other documents', () => {
    let peer;
    const received = [];
    cy.visit('/', {
      onBeforeLoad(win) {
        peer = new win.BroadcastChannel('storefront:consent');
        peer.onmessage = ({ data }) => received.push(data);
      },
    });
    waitForConsentGate(false);
    cy.wrap(null).should(() => {
      expect(received).to.deep.equal([{ type: 'DECLINED' }]);
    }).then(() => { peer.close(); });
  });

  [false, true].forEach((reaccepted) => {
    it(`${reaccepted ? 'cancels' : 'defers'} a prerendered denial before activation`, () => {
      let prerendering = true;
      let messages;
      cy.visit('/', {
        onBeforeLoad(win) {
          Object.defineProperty(win.document, 'prerendering', {
            configurable: true, get: () => prerendering,
          });
          messages = cy.spy(win.BroadcastChannel.prototype, 'postMessage');
        },
      });
      waitForConsentGate(false);
      cy.window().then((win) => {
        const consentMessages = () => messages.getCalls().filter(
          ({ thisValue }) => thisValue.name === 'storefront:consent',
        );
        expect(consentMessages(), 'no denial before activation').to.have.length(0);
        if (reaccepted) {
          win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: true } }));
        }
        prerendering = false;
        win.document.dispatchEvent(new win.Event('prerenderingchange'));
        expect(consentMessages(), 'denial after activation').to.have.length(reaccepted ? 0 : 1);
      });
    });
  });

  it('honors local denial and logs when cross-tab notifications are unavailable', () => {
    cy.visit('/?consent=accept', {
      onBeforeLoad(win) {
        cy.stub(win, 'BroadcastChannel').value(undefined);
        cy.stub(win.console, 'warn').as('consentWarning');
      },
    });
    waitForConsentGate(true);
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      pushHistoryActivity(win, 'BEFORE-LOCAL-DENIAL');
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).not.to.equal(null);
      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: false } }));
      pushHistoryActivity(win, 'AFTER-LOCAL-DENIAL');
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).to.equal(null);
      expect(win.localStorage.getItem(`${identifier}:purchaseHistory`)).to.equal(null);
    });
    cy.get('@consentWarning').should('have.been.calledWithMatch', 'BroadcastChannel is unavailable');
  });

  it('logs invalid history without overwriting it or interrupting ACDL', () => {
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      const histories = ['productViewHistory', 'purchaseHistory'];
      const errors = cy.stub(win.console, 'error');

      ['{', '{}', ''].forEach((value, index) => {
        histories.forEach((history) => win.localStorage.setItem(`${identifier}:${history}`, value));
        expect(() => pushHistoryActivity(win, `INVALID-${index}`)).not.to.throw();
        histories.forEach((history) => {
          expect(win.localStorage.getItem(`${identifier}:${history}`)).to.equal(value);
        });
      });

      histories.forEach((history) => {
        const calls = errors.getCalls().filter(({ args }) => args[0] === `Error recording ${history}`);
        expect(calls.map(({ args }) => args[1].name))
          .to.deep.equal(['SyntaxError', 'TypeError', 'SyntaxError']);
      });
    });
  });

  it('logs blocked history reads and writes without interrupting ACDL', () => {
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      const viewKey = `${identifier}:productViewHistory`;
      const purchaseKey = `${identifier}:purchaseHistory`;
      const storage = win.localStorage;
      const { getItem, setItem } = win.Storage.prototype;
      const errors = cy.stub(win.console, 'error');
      cy.stub(win.Storage.prototype, 'getItem').callsFake(function read(key) {
        if (this === storage && key === viewKey) throw new win.DOMException('Blocked', 'SecurityError');
        return getItem.call(this, key);
      });
      cy.stub(win.Storage.prototype, 'setItem').callsFake(function write(key, value) {
        if (this === storage && key === purchaseKey) throw new win.DOMException('Blocked', 'SecurityError');
        return setItem.call(this, key, value);
      });

      expect(() => pushHistoryActivity(win, 'STORAGE-BLOCKED')).not.to.throw();
      ['productViewHistory', 'purchaseHistory'].forEach((history) => {
        const calls = errors.getCalls().filter(({ args }) => args[0] === `Error recording ${history}`);
        expect(calls.map(({ args }) => args[1].name)).to.deep.equal(['SecurityError']);
      });
    });
  });

  it('does not persist retained activity when consent is granted before history tracking initializes', () => {
    const acdl = holdModule('**/scripts/acdl/adobe-client-data-layer.min.js', 'acdl');
    cy.intercept('**/config.json', (request) => {
      request.continue((response) => { delete response.body.public.default.analytics; });
    });
    cy.visit('/?consent=accept');
    acdl.waitForStart();
    cy.window().then((win) => {
      pushHistoryActivity(win, 'BEFORE-CONSENT');
      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: true } }));
    });
    acdl.release();
    cy.wait('@consentGate');
    cy.window().should((win) => {
      expect(win.__consentDecisions).to.deep.equal([{ consented: true }, { consented: true }]);
    });
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).to.equal(null);
      expect(win.localStorage.getItem(`${identifier}:purchaseHistory`)).to.equal(null);
      pushHistoryActivity(win, 'NEW-ACTIVITY');
      expect(JSON.parse(win.localStorage.getItem(`${identifier}:productViewHistory`))
        .map(({ sku }) => sku)).to.deep.equal(['NEW-ACTIVITY']);
      expect(JSON.parse(win.localStorage.getItem(`${identifier}:purchaseHistory`))
        .map(({ items }) => items)).to.deep.equal([['NEW-ACTIVITY']]);
    });
    expectNoCollectors();
  });

  function interceptRecommendations() {
    cy.intercept({ method: 'GET', url: /recommendationsByUnitIds/ }, (request) => {
      const variables = JSON.parse(new URL(request.url).searchParams.get('variables'));
      if (observedConsent) {
        expect(variables.userViewHistory.map((entry) => entry.sku)).to.include('ADB156');
        expect(variables.userPurchaseHistory).to.deep.include({
          items: ['ADB174'], date: '2026-01-01T00:00:00.000Z',
        });
      } else {
        ['userViewHistory', 'userPurchaseHistory', 'cartSkus'].forEach((key) => {
          expect(variables, `unconsented recommendation inputs exclude ${key}`)
            .not.to.have.property(key);
        });
        expect(variables, 'unconsented PDP request excludes shopper-derived price')
          .not.to.have.property('currentProduct');
      }
      request.reply({ data: { recommendationsByUnitIds: { results: [], totalResults: 0 } } });
    }).as('privateRecommendations');
  }

  it('removes personal recommendation inputs after a denial from another document', () => {
    interceptRecommendations();
    visitWithStoredHistory(true);
    waitForConsentGate(true);
    cy.wait('@privateRecommendations');
    let beforeDenial;
    let peer;
    cy.get('@privateRecommendations.all').then((requests) => { beforeDenial = requests.length; });
    cy.window().then((win) => {
      peer = new win.BroadcastChannel('storefront:consent');
      peer.postMessage({ type: 'DECLINED' });
    });
    cy.get('@privateRecommendations.all').should((requests) => {
      expect(requests.length, 'recommendations reload after remote denial').to.be.greaterThan(beforeDenial);
      const variables = JSON.parse(new URL(requests[requests.length - 1].request.url)
        .searchParams.get('variables'));
      ['userViewHistory', 'userPurchaseHistory', 'cartSkus'].forEach((key) => {
        expect(variables).not.to.have.property(key);
      });
    }).then(() => { peer.close(); });
  });

  [false, true].forEach((consented) => {
    it(`${consented ? 'includes' : 'withholds'} personal recommendation inputs across cart interaction and reload`, () => {
      interceptRecommendations();
      visitWithStoredHistory(consented);
      waitForConsentGate(consented);
      cy.wait('@privateRecommendations');
      if (consented) waitForAnalytics();

      let beforeCart;
      cy.get('@privateRecommendations.all').then((requests) => { beforeCart = requests.length; });
      cy.get('.product-details__buttons__add-to-cart button')
        .should('be.visible').and('not.be.disabled').click();
      cy.get('.nav-cart-button').should('have.attr', 'data-count', '1');
      cy.get('@privateRecommendations.all').should((requests) => {
        expect(requests.length, 'recommendations reload after adding to cart').to.be.greaterThan(beforeCart);
        if (consented) {
          const variables = JSON.parse(new URL(requests[requests.length - 1].request.url)
            .searchParams.get('variables'));
          expect(variables.cartSkus).to.include('ADB125');
          if (Cypress.env('catalogApiKey')) {
            expect(variables.currentProduct).to.include({ sku: 'ADB125' });
            expect(variables.currentProduct.price).to.be.a('number');
          }
        }
      });

      let beforeReload;
      cy.get('@privateRecommendations.all').then((requests) => { beforeReload = requests.length; });
      cy.reload();
      waitForConsentGate(consented);
      cy.get('@privateRecommendations.all').should((requests) => {
        expect(requests.length, 'recommendations remain available after reload').to.be.greaterThan(beforeReload);
      });
      if (consented) {
        waitForAnalytics();
      } else {
        expectNoCollectors();
      }
    });
  });

  it('withholds history until the real upstream notification, then updates the mounted list', () => {
    const gate = holdModule('**/scripts/consent-check.js', 'consentGate');
    interceptRecommendations();
    visitWithStoredHistory(true);
    gate.waitForStart();
    cy.wait('@privateRecommendations');
    expectNoCollectors();
    gate.release();
    waitForConsentGate(true);
    waitForAnalytics();
    cy.get('@privateRecommendations.all').should((requests) => {
      const variables = JSON.parse(new URL(requests[requests.length - 1].request.url)
        .searchParams.get('variables'));
      expect(variables.userViewHistory.map((entry) => entry.sku)).to.include('ADB156');
      expect(variables.userPurchaseHistory).to.deep.include({
        items: ['ADB174'], date: '2026-01-01T00:00:00.000Z',
      });
    });
    cy.get('.recommendations-product-list').should('have.length', 1);
  });

  function appendAuthoredRecommendationBlock() {
    cy.request(`${Cypress.env('prexPages').displayPlp}.plain.html`).then(({ body }) => {
      cy.window().then((win) => {
        const fragment = win.document.createRange().createContextualFragment(body);
        const authored = fragment.querySelector('.product-recommendations');
        expect(authored, 'backend-authored recommendation block').not.to.equal(null);
        const script = win.document.createElement('script');
        script.type = 'module';
        script.nonce = 'aem';
        script.dataset.lateRecommendation = 'true';
        script.textContent = `
          import { decorateBlock, loadBlock } from '/scripts/aem.js';
          const section = document.createElement('div');
          section.className = 'section';
          section.dataset.sectionStatus = 'loaded';
          section.innerHTML = ${JSON.stringify(authored.outerHTML)};
          document.querySelector('main').appendChild(section);
          const block = section.querySelector('.product-recommendations');
          decorateBlock(block);
          await loadBlock(block);
          document.querySelector('script[data-late-recommendation]').remove();
        `;
        script.onerror = () => { script.remove(); throw new Error('Late block failed to initialize'); };
        win.document.head.appendChild(script);
      });
    });
  }

  it('uses the captured decision for blocks first loaded after the upstream notification', () => {
    interceptRecommendations();
    [false, true].forEach((consented) => {
      visitWithStoredHistory(consented, '/');
      waitForConsentGate(consented);
      if (consented) waitForAnalytics();
      appendAuthoredRecommendationBlock();
      cy.wait('@privateRecommendations');
      cy.get('.product-recommendations').should('have.attr', 'data-block-status', 'loaded');
      if (!consented) expectNoCollectors();
    });
  });

  it('loads real analytics once with all four contexts and one initial page view', () => {
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    settleConsentedModule();
    waitForAnalytics();
    cy.window().then((win) => {
      expectInitialPageView(win);
      const config = JSON.parse(win.sessionStorage.getItem('config')).public.default.analytics;
      const storefront = win.adobeDataLayer.getState('storefrontInstanceContext');
      expect(storefront).to.include({
        baseCurrencyCode: config['base-currency-code'],
        environment: config.environment,
        storeUrl: config['store-url'],
      });
      if (config['environment-id']) {
        expect(storefront.environmentId, 'analytics tenant').to.equal(config['environment-id']);
      }
      if (config['view-id']) {
        expect(storefront.viewId, 'ACO catalog view').to.equal(config['view-id']);
      } else {
        expect(storefront.storeId, 'Commerce store').to.equal(Number(config['store-id']));
        expect(storefront.storeViewId, 'Commerce store view').to.equal(Number(config['store-view-id']));
        expect(storefront.websiteId, 'Commerce website').to.equal(Number(config['website-id']));
      }
      if (config.locale) {
        expect(storefront.locale, 'configured locale').to.equal(config.locale);
      }
      expect(win.adobeDataLayer.getState('eventForwardingContext')).to.deep.equal({
        commerce: true, aep: false,
      });
      expect(win.adobeDataLayer.getState('shopperContext')).to.deep.equal({ shopperId: 'guest' });
      expect(win.adobeDataLayer.getState('aepContext')).to.deep.equal({});
      // Neither an incoming event nor a URL change revokes this document's startup.
      win.history.replaceState(null, '', '/?consent=decline');
      win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented: false } }));
      expect(win.adobeDataLayer.getState('eventForwardingContext').commerce).to.equal(true);
    });
    cy.get('@sdk.all').should('have.length', 1);
    cy.get('@collector.all').should('have.length', 1);
  });

  it('replays retained page events through the real collector after a slow load', () => {
    const collector = holdModule('**/scripts/commerce-events-collector.js', 'collector');
    const markers = [];
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    collector.waitForStart();
    cy.window().should((win) => {
      expect(win.magentoStorefrontEvents?.subscribe?.pageView).to.be.a('function');
    }).then((win) => {
      expectInitialPageView(win);
      const sdk = win.magentoStorefrontEvents;
      const original = sdk.subscribe.pageView;
      sdk.subscribe.pageView = function observePageViews(handler, options) {
        return original.call(this, (event) => {
          if (event.eventInfo?.marker) markers.push(event.eventInfo.marker);
          return handler(event);
        }, options);
      };
      ['queued-1', 'queued-2'].forEach((marker) => {
        win.adobeDataLayer.push({ event: 'page-view', eventInfo: { marker } });
      });
    });
    collector.release();
    settleConsentedModule();
    cy.wrap(markers).should('deep.equal', ['queued-1', 'queued-2']);
    cy.wait('@analytics');
    cy.window().then((win) => {
      win.adobeDataLayer.push({ event: 'page-view', eventInfo: { marker: 'live-3' } });
    });
    cy.wrap(markers).should('deep.equal', ['queued-1', 'queued-2', 'live-3']);
    cy.window().then((win) => {
      const events = win.adobeDataLayer.filter((entry) => entry?.event === 'page-view');
      expect(events.filter((entry) => !entry.eventInfo?.marker)).to.have.length(1);
      expect(events.filter((entry) => entry.eventInfo?.marker).map((entry) => entry.eventInfo.marker))
        .to.deep.equal(['queued-1', 'queued-2', 'live-3']);
    });
    cy.get('@sdk.all').should('have.length', 1);
    cy.get('@collector.all').should('have.length', 1);
  });

  it('waits for real ACDL initialization before starting the consent gate', () => {
    const acdl = holdModule('**/scripts/acdl/adobe-client-data-layer.min.js', 'acdl');
    cy.visit(Cypress.env('prexPages').pdpAcdlOnly, { qs: { consent: 'accept' } });
    acdl.waitForStart();
    cy.window().its('__consentDecisions').should('deep.equal', []);
    expectNoCollectors();
    acdl.release();
    waitForConsentGate(true);
    settleConsentedModule();
    waitForAnalytics();
    cy.window().then(expectInitialPageView);
    cy.get('@sdk.all').should('have.length', 1);
    cy.get('@collector.all').should('have.length', 1);
  });

  it('defers analytics until one emulated prerender activation', () => {
    let prerendering = true;
    cy.visit('/?consent=accept', {
      onBeforeLoad(win) {
        Object.defineProperty(win.document, 'prerendering', {
          configurable: true, get: () => prerendering,
        });
      },
    });
    waitForConsentGate(true);
    settleConsentedModule();
    expectNoCollectors();
    cy.window().then((win) => {
      prerendering = false;
      win.document.dispatchEvent(new win.Event('prerenderingchange'));
    });
    waitForAnalytics();
    cy.window().then((win) => {
      win.document.dispatchEvent(new win.Event('prerenderingchange'));
      expectInitialPageView(win);
      expect(win.adobeDataLayer.filter((entry) => entry?.storefrontInstanceContext)).to.have.length(1);
    });
    cy.get('@sdk.all').should('have.length', 1);
    cy.get('@collector.all').should('have.length', 1);
  });

  it('loads no collectors when analytics config is absent despite acceptance', () => {
    cy.intercept('**/config.json', (request) => {
      request.continue((response) => { delete response.body.public.default.analytics; });
    });
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    settleConsentedModule();
    cy.window().then(expectInitialPageView);
    expectNoCollectors();
  });

  it('records accepted history with SKU deduplication and 20-entry caps even without analytics config', () => {
    cy.intercept('**/config.json', (request) => {
      request.continue((response) => { delete response.body.public.default.analytics; });
    });
    cy.visit('/?consent=accept');
    waitForConsentGate(true);
    settleConsentedModule();
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      for (let index = 0; index < 25; index += 1) {
        win.adobeDataLayer.push({ productContext: { sku: `view-${index}` } });
      }
      win.adobeDataLayer.push({ productContext: { sku: 'view-24' } });
      const views = JSON.parse(win.localStorage.getItem(`${identifier}:productViewHistory`));
      expect(views.map((entry) => entry.sku))
        .to.deep.equal(Array.from({ length: 20 }, (_, index) => `view-${index + 5}`));
      views.forEach((entry) => {
        expect(Object.keys(entry).sort()).to.deep.equal(['date', 'sku']);
        expect(new Date(entry.date).toISOString()).to.equal(entry.date);
      });
      for (let index = 0; index < 25; index += 1) {
        win.adobeDataLayer.push({
          shoppingCartContext: { items: [{ product: { sku: `purchase-${index}` } }] },
        });
        win.adobeDataLayer.push({ event: 'place-order' });
      }
      const purchases = JSON.parse(win.localStorage.getItem(`${identifier}:purchaseHistory`));
      expect(purchases.map((entry) => entry.items))
        .to.deep.equal(Array.from({ length: 20 }, (_, index) => [`purchase-${index + 5}`]));
      purchases.forEach((entry) => {
        expect(Object.keys(entry).sort()).to.deep.equal(['date', 'items']);
        expect(new Date(entry.date).toISOString()).to.equal(entry.date);
      });
    });
    expectNoCollectors();
  });
});
