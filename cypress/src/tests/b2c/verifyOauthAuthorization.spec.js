/**
 * The commerce-login and commerce-create-account blocks complete OAuth 2.0 authorization requests
 * (authorization code + PKCE).
 * Commerce is stubbed: the spec covers the block, not a backend with OAuth 2.0 enabled.
 */
const OAUTH_REQUEST = {
  client_id: 'cypress-client',
  redirect_uri: 'https://client.example.com/callback',
  scope: 'openid',
  state: 'cypress-state',
  code_challenge: 'E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM',
  code_challenge_method: 'S256',
};

const CUSTOMER_TOKEN = 'cypress-customer-token';

const visitAuthorizationPage = (params = OAUTH_REQUEST) => {
  const search = new URLSearchParams({ response_type: 'code', ...params });
  cy.visit(`/customer/login?${search}`);
};

const STORAGE_KEY = 'oauth_authorization_request';

/**
 * Opens the create-account page with an OAuth request stored by an earlier sign-in page of the tab.
 */
const visitCreateAccountWithStoredRequest = (expires = Date.now() + 60000) => {
  cy.visit('/customer/create', {
    onBeforeLoad(win) {
      win.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
        request: OAUTH_REQUEST,
        expires,
      }));
    },
  });
};

const isOperation = (req, name) => req.method === 'POST'
  && typeof req.body?.query === 'string'
  && req.body.query.includes(name);

/**
 * The fake customer token is unknown to Commerce, which answers 401 and the storefront signs the
 * shopper out. Send every other call as a guest call instead.
 */
const stubCustomerCalls = () => {
  cy.intercept('**/graphql*', (req) => {
    if (req.headers.authorization === `Bearer ${CUSTOMER_TOKEN}`) {
      delete req.headers.authorization;
    }
  });
};

/**
 * Stubs issueOauthAuthorizationCode. The redirect stays on the storefront origin so Cypress can
 * assert the browser left the sign-in page.
 */
const stubIssueAuthorizationCode = (response) => {
  cy.intercept('POST', '**/graphql*', (req) => {
    if (isOperation(req, 'issueOauthAuthorizationCode')) {
      req.alias = 'issueCode';
      req.reply(response);
    }
  });
};

const countIssueCodeCalls = () => {
  const calls = { count: 0 };
  cy.intercept('POST', '**/graphql*', (req) => {
    if (isOperation(req, 'issueOauthAuthorizationCode')) {
      calls.count += 1;
    }
  });
  return calls;
};

const redirectResponse = () => ({
  data: {
    issueOauthAuthorizationCode: {
      redirect_url: `${Cypress.config('baseUrl')}?code=cypress-code&state=${OAUTH_REQUEST.state}`,
    },
  },
});

const assertIssueCodeRequest = () => {
  cy.wait('@issueCode').then(({ request }) => {
    expect(request.headers.authorization).to.equal(`Bearer ${CUSTOMER_TOKEN}`);
    expect(request.body.variables.input).to.deep.equal(OAUTH_REQUEST);
  });
};

const assertRedirectedToClient = () => {
  cy.location('pathname').should('not.include', '/customer/login');
  cy.location('pathname').should('not.include', '/customer/create');
  cy.location('search').should('include', 'code=cypress-code');
};

describe('Verify OAuth 2.0 authorization from the sign-in page', () => {
  beforeEach(stubCustomerCalls);

  // The global afterEach deletes the signed-in customer; there is no real one here.
  afterEach(() => cy.clearCookie('auth_dropin_user_token'));

  it('redirects a signed-in shopper back to the client', () => {
    stubIssueAuthorizationCode(redirectResponse());
    cy.setCookie('auth_dropin_user_token', CUSTOMER_TOKEN);

    visitAuthorizationPage();

    assertIssueCodeRequest();
    assertRedirectedToClient();
  });

  it('asks a signed-out shopper to sign in before issuing a code', () => {
    const issueCodeCalls = countIssueCodeCalls();

    visitAuthorizationPage();

    cy.get('.commerce-login input[name="email"]').should('be.visible');
    cy.get('.commerce-login input[name="password"]').should('be.visible');
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });

  it('shows an error and keeps the shopper on the page when Commerce refuses', () => {
    stubIssueAuthorizationCode({
      errors: [{ message: 'The client is not allowed to use this redirect URI.' }],
    });
    cy.setCookie('auth_dropin_user_token', CUSTOMER_TOKEN);

    visitAuthorizationPage();

    cy.wait('@issueCode');
    cy.get('.commerce-login__oauth-notification [role="alert"]')
      .should('be.visible')
      .and('contain.text', 'The client is not allowed to use this redirect URI.');
    cy.location('pathname').should('include', '/customer/login');
  });

  it('keeps the regular sign-in flow when the OAuth request is incomplete', () => {
    const withoutPkce = { ...OAUTH_REQUEST };
    delete withoutPkce.code_challenge;
    const issueCodeCalls = countIssueCodeCalls();
    cy.setCookie('auth_dropin_user_token', CUSTOMER_TOKEN);

    visitAuthorizationPage(withoutPkce);

    cy.location('pathname').should('include', '/customer/account');
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });

  it('drops a stored request when the URL starts a new incomplete one', () => {
    const withoutPkce = { ...OAUTH_REQUEST, client_id: 'other-client' };
    delete withoutPkce.code_challenge;
    const issueCodeCalls = countIssueCodeCalls();
    cy.setCookie('auth_dropin_user_token', CUSTOMER_TOKEN);

    cy.visit(`/customer/login?${new URLSearchParams({ response_type: 'code', ...withoutPkce })}`, {
      onBeforeLoad(win) {
        win.sessionStorage.setItem(STORAGE_KEY, JSON.stringify({
          request: OAUTH_REQUEST,
          expires: Date.now() + 60000,
        }));
      },
    });

    cy.location('pathname').should('include', '/customer/account');
    cy.window().then((win) => expect(win.sessionStorage.getItem(STORAGE_KEY)).to.equal(null));
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });

  it('still shows the sign-in form when sessionStorage cannot be written', () => {
    const search = new URLSearchParams({ response_type: 'code', ...OAUTH_REQUEST });
    cy.visit(`/customer/login?${search}`, {
      onBeforeLoad(win) {
        const { setItem } = win.Storage.prototype;
        cy.stub(win.Storage.prototype, 'setItem').callsFake(function fake(key, value) {
          if (key === STORAGE_KEY) {
            throw new win.DOMException('Quota exceeded', 'QuotaExceededError');
          }
          return setItem.call(this, key, value);
        });
      },
    });

    cy.get('.commerce-login input[name="email"]').should('be.visible');
    cy.get('.commerce-login input[name="password"]').should('be.visible');
  });
});

describe('Verify OAuth 2.0 authorization from the create-account page', () => {
  beforeEach(stubCustomerCalls);

  afterEach(() => cy.clearCookie('auth_dropin_user_token'));

  it('links the sign-in page to create-account and keeps the OAuth request', () => {
    visitAuthorizationPage();

    cy.get('.commerce-login .auth-sign-in-form').find('a, button').contains(/create|sign up|register/i)
      .should('be.visible')
      .click();

    cy.location('pathname').should('include', '/customer/create');
    cy.get('.commerce-create-account input[name="email"]').should('be.visible');
    cy.window().then((win) => {
      const stored = JSON.parse(win.sessionStorage.getItem(STORAGE_KEY));
      expect(stored.request).to.deep.equal(OAUTH_REQUEST);
    });
  });

  it('redirects the signed-in new customer back to the client', () => {
    stubIssueAuthorizationCode(redirectResponse());
    cy.setCookie('auth_dropin_user_token', CUSTOMER_TOKEN);

    visitCreateAccountWithStoredRequest();

    assertIssueCodeRequest();
    assertRedirectedToClient();
    cy.window().then((win) => expect(win.sessionStorage.getItem(STORAGE_KEY)).to.equal(null));
  });

  it('keeps the OAuth request when the new customer must confirm the email first', () => {
    const issueCodeCalls = countIssueCodeCalls();
    cy.intercept('**/graphql*', (req) => {
      if (isOperation(req, 'createCustomerV2')) {
        req.alias = 'createCustomer';
        req.reply({
          data: {
            createCustomerV2: {
              customer: {
                firstname: 'Cypress', lastname: 'Shopper', email: 'oauth.signup@example.com',
              },
            },
          },
        });
      } else if (decodeURIComponent(req.url).includes('GET_STORE_CONFIG')
        || isOperation(req, 'GET_STORE_CONFIG')) {
        req.continue((res) => {
          if (res.body?.data?.storeConfig) {
            res.body.data.storeConfig.create_account_confirmation = true;
          }
        });
      }
    });

    visitCreateAccountWithStoredRequest();
    cy.get('.commerce-create-account input[name="firstName"]').type('Cypress');
    cy.get('.commerce-create-account input[name="lastName"]').type('Shopper');
    cy.get('.commerce-create-account input[name="email"]').type('oauth.signup@example.com');
    cy.get('.commerce-create-account input[name="password"]').type('Cypress!Pass2026');
    cy.get('.commerce-create-account input[type="checkbox"]').check({ force: true });
    cy.get('.commerce-create-account button[type="submit"]').click();

    cy.wait('@createCustomer');
    cy.get('.commerce-create-account .auth-email-confirmation-form__title').should('be.visible');
    // Gives a code request, if any, time to start before asserting there was none.
    cy.wait(1000);
    cy.location('pathname').should('include', '/customer/create');
    cy.window().then((win) => {
      const stored = JSON.parse(win.sessionStorage.getItem(STORAGE_KEY));
      expect(stored.request).to.deep.equal(OAUTH_REQUEST);
    });
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });

  it('asks the new customer to sign in when the automatic sign-in fails', () => {
    const issueCodeCalls = countIssueCodeCalls();
    cy.intercept('**/graphql*', (req) => {
      if (isOperation(req, 'createCustomerV2')) {
        req.reply({
          data: {
            createCustomerV2: {
              customer: {
                firstname: 'Cypress', lastname: 'Shopper', email: 'oauth.signup@example.com',
              },
            },
          },
        });
      } else if (isOperation(req, 'GET_CUSTOMER_TOKEN')) {
        req.alias = 'customerToken';
        req.reply({ errors: [{ message: 'The account sign-in was incorrect.' }] });
      }
    });

    visitCreateAccountWithStoredRequest();
    cy.get('.commerce-create-account input[name="firstName"]').type('Cypress');
    cy.get('.commerce-create-account input[name="lastName"]').type('Shopper');
    cy.get('.commerce-create-account input[name="email"]').type('oauth.signup@example.com');
    cy.get('.commerce-create-account input[name="password"]').type('Cypress!Pass2026');
    cy.get('.commerce-create-account input[type="checkbox"]').check({ force: true });
    cy.get('.commerce-create-account button[type="submit"]').click();

    cy.wait('@customerToken');
    cy.get('.commerce-create-account .commerce-login__oauth-notification')
      .should('contain.text', 'Sign in to continue')
      .find('a')
      .should('have.attr', 'href')
      .and('include', '/customer/login');
    cy.window().then((win) => {
      const stored = JSON.parse(win.sessionStorage.getItem(STORAGE_KEY));
      expect(stored.request).to.deep.equal(OAUTH_REQUEST);
    });
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });

  it('ignores an expired OAuth request', () => {
    const issueCodeCalls = countIssueCodeCalls();

    visitCreateAccountWithStoredRequest(Date.now() - 1000);

    cy.get('.commerce-create-account input[name="email"]').should('be.visible');
    cy.get('.commerce-login__oauth-notification').should('not.exist');
    cy.window().then((win) => expect(win.sessionStorage.getItem(STORAGE_KEY)).to.equal(null));
    cy.then(() => expect(issueCodeCalls.count).to.equal(0));
  });
});
