/**
 * The commerce-login block completes OAuth 2.0 authorization requests (authorization code + PKCE).
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
});
