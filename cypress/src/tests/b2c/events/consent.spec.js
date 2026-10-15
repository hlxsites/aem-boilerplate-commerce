function waitForConsentGate() {
  cy.wait('@consentGate');
  cy.window().should((win) => {
    expect(win.__consentTestState, 'initial consent decision applied').to.have.property('consented');
  });
  cy.window().its('adobeDataLayer.getState').should('be.a', 'function');
}

function updateConsent(consented) {
  cy.window().then((win) => {
    win.dispatchEvent(new win.CustomEvent('consent.update', { detail: { consented } }));
  });
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

describe('Commerce consent lifecycle', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      win.addEventListener('consent.update', (event) => {
        win.__consentTestState = event.detail;
      });
    });
    cy.clearAllLocalStorage();
    cy.clearAllCookies();
    cy.intercept('**/scripts/consent-check.js').as('consentGate');
    cy.intercept('**/scripts/commerce-events-*.js', { middleware: true }, (request) => {
      request.on('before:response', (response) => {
        response.headers['cache-control'] = 'no-store';
      });
    });
    cy.intercept('**/scripts/commerce-events-sdk.js').as('sdk');
    cy.intercept('**/scripts/commerce-events-collector.js').as('collector');
  });

  it('does not load analytics libraries or write history without consent', () => {
    cy.visit('/');
    waitForConsentGate();
    cy.window().then((win) => {
      win.adobeDataLayer.push({ productContext: { sku: 'consent-test-denied' } });
      const identifier = getStoreIdentifier(win);
      expect(win.localStorage.getItem(`${identifier}:productViewHistory`)).to.be.null;
      expect(win.localStorage.getItem(`${identifier}:purchaseHistory`)).to.be.null;
      expect(win.magentoStorefrontEvents).to.be.undefined;
    });
    cy.get('@sdk.all').should('have.length', 0);
    cy.get('@collector.all').should('have.length', 0);
  });

  it('retains existing history and blocks writes after explicit decline', () => {
    cy.visit('/?consent=decline');
    waitForConsentGate();
    cy.window().then((win) => {
      const identifier = getStoreIdentifier(win);
      const viewKey = `${identifier}:productViewHistory`;
      const purchaseKey = `${identifier}:purchaseHistory`;
      const views = JSON.stringify([{ sku: 'old-view', date: '2026-01-01' }]);
      const purchases = JSON.stringify([{ items: ['old-purchase'], date: '2026-01-01' }]);
      win.localStorage.setItem(viewKey, views);
      win.localStorage.setItem(purchaseKey, purchases);
      win.adobeDataLayer.push({ productContext: { sku: 'consent-test-denied' } });
      win.adobeDataLayer.push({ event: 'place-order' });
      expect(win.localStorage.getItem(viewKey)).to.equal(views);
      expect(win.localStorage.getItem(purchaseKey)).to.equal(purchases);
    });
    cy.get('@collector.all').should('have.length', 0);
  });

  it('supports late acceptance, revocation and reacceptance without duplicate imports', () => {
    cy.visit('/?consent=decline');
    waitForConsentGate();
    updateConsent(true);
    cy.wait('@sdk');
    cy.wait('@collector');
    cy.window().then((win) => {
      win.adobeDataLayer.push({ productContext: { sku: 'consent-test-accepted' } });
      const key = `${getStoreIdentifier(win)}:productViewHistory`;
      expect(JSON.parse(win.localStorage.getItem(key)).at(-1).sku).to.equal('consent-test-accepted');
    });
    updateConsent(false);
    cy.window().then((win) => {
      const key = `${getStoreIdentifier(win)}:productViewHistory`;
      const previous = win.localStorage.getItem(key);
      win.adobeDataLayer.push({ productContext: { sku: 'consent-test-revoked' } });
      expect(win.localStorage.getItem(key)).to.equal(previous);
      expect(win.adobeDataLayer.getState('eventForwardingContext').commerce).to.equal(false);
      expect(win.document.cookie).to.include('mg_dnt=true');
    });
    updateConsent(true);
    updateConsent(true);
    cy.get('@sdk.all').should('have.length', 1);
    cy.get('@collector.all').should('have.length', 1);
    cy.window().then((win) => {
      expect(win.adobeDataLayer.getState('eventForwardingContext').commerce).to.equal(true);
    });
  });

  it('does not send new Commerce collector requests after revocation', () => {
    cy.intercept('https://commerce.adobedc.net/collector/**', {
      statusCode: 200, body: '',
    }).as('analytics');
    cy.visit('/?consent=decline');
    waitForConsentGate();
    cy.clock();
    updateConsent(true);
    cy.wait('@sdk');
    cy.wait('@collector');
    cy.window().then((win) => win.magentoStorefrontEvents.publish.pageView());
    cy.wait('@analytics');
    cy.get('@analytics.all').then((acceptedRequests) => {
      const acceptedCount = acceptedRequests.length;
      updateConsent(false);
      cy.window().then((win) => {
        win.magentoStorefrontEvents.publish.pageView();
        win.dispatchEvent(new win.Event('beforeunload'));
      });
      cy.tick(10000);
      cy.get('@analytics.all').should('have.length', acceptedCount);
    });
  });
});