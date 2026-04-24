/**
 * Cypress custom commands for Requisition List API operations.
 *
 * Uses cy.request() so calls run through Cypress's network layer
 * (bypasses CORS, respects baseUrl config).
 *
 * @example
 * cy.generateRequisitionListShareToken({
 *   email: 'sender@example.com',
 *   password: 'password',
 *   requisitionListUid: 'base64uid==',
 * }).then((token) => { ... });
 */

/**
 * Generate a fresh share token for a requisition list.
 * Signs in as the given customer via GraphQL, then calls shareRequisitionListByToken.
 *
 * @param {object} options
 * @param {string} options.email - Sender's email
 * @param {string} options.password - Sender's password
 * @param {string} options.requisitionListUid - Base64-encoded requisition list UID
 * @yields {string} The plain share token
 */
Cypress.Commands.add('generateRequisitionListShareToken', ({ email, password, requisitionListUid }) => {
  const graphqlEndpoint = Cypress.env('graphqlEndPoint');

  // 1. Get customer auth token
  cy.request({
    method: 'POST',
    url: graphqlEndpoint,
    body: {
      query: `mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) { token }
      }`,
      variables: { email, password },
    },
  }).then((loginRes) => {
    const customerToken = loginRes.body?.data?.generateCustomerToken?.token;
    if (!customerToken) throw new Error('generateRequisitionListShareToken: failed to get customer token');

    // 2. Generate the share token
    cy.request({
      method: 'POST',
      url: graphqlEndpoint,
      headers: { Authorization: `Bearer ${customerToken}` },
      body: {
        query: `mutation shareRequisitionListByToken($requisitionListUid: ID!) {
          shareRequisitionListByToken(requisitionListUid: $requisitionListUid) { token }
        }`,
        variables: { requisitionListUid },
      },
    }).then((shareRes) => {
      const token = shareRes.body?.data?.shareRequisitionListByToken?.token;
      if (!token) {
        const errors = shareRes.body?.errors?.map((e) => e.message).join(', ');
        throw new Error(`generateRequisitionListShareToken: ${errors}`);
      }
      return token;
    });
  });
});
