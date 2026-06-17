const deleteCustomerAco = (customerToken) => {
  const endpoint = (Cypress.env('API_ENDPOINT') || '').replace(/\/+$/, '');
  cy.request({
    method: 'GET',
    url: `${endpoint}/rest/default/V1/customers/me`,
    auth: { bearer: customerToken },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200 && response.body?.id) {
      const customerId = response.body.id;
      cy.wrap(null).then(async () => {
        const ACCSApiClient = require('./accsClient');
        const client = new ACCSApiClient();
        await client.delete(`/V1/customers/${customerId}`);
      });
    }
  });
};

const deleteCustomer = () => {
  cy.getUserTokenCookie().then((token) => {
    if (!token) return;

    if (Cypress.env('IS_ACO') === true) {
      deleteCustomerAco(token);
      return;
    }

    const queryDeleteCustomer = `mutation {deleteCustomer}`;
    cy.request({
      method: 'POST',
      url: Cypress.env('graphqlEndPoint'),
      auth: { bearer: token },
      headers: { 'content-type': 'application/json' },
      body: { query: JSON.parse(JSON.stringify(queryDeleteCustomer)) },
    }).then((response) => {
      expect(response).property('status').to.equal(200);
    });
  });
};

Cypress.Commands.add('deleteCustomer', deleteCustomer);

// Always delete customer after every test.
afterEach(() => {
  if (Cypress.env('isAemAssetsSuite')) {
    return;
  }

  // Skip automatic customer deletion for B2B Purchase Orders test suite
  const currentTestTitle = Cypress.currentTest?.title || '';
  const currentSuiteName = Cypress.currentTest?.titlePath?.[0] || '';

  const skipDeleteTests = [
    'Purchase Orders end-to-end workflow',
    'B2B Purchase Orders',
    'Cleanup - Delete approval rules, users and roles',
    'Verify B2B Requisition List Sharing feature',
    'Seller Assisted Buying',
    'USF-2563: Company Credit (Optimized Journey)',
  ];

  const shouldSkip = skipDeleteTests.some(
    (testName) =>
      currentTestTitle.includes(testName) || currentSuiteName.includes(testName)
  );

  if (shouldSkip) {
    cy.log('Skipping automatic customer deletion for B2B Purchase Orders test');
    return;
  }

  cy.deleteCustomer();
});
