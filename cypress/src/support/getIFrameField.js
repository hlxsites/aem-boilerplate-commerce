const getIFrameField = (iFrame, field) => {
  return getIframeBody(iFrame).find(field);
};

const getIframeDocument = (iframeName) => {
  return cy
  .get(`iframe[name="${iframeName}"]`)
  // Cypress yields jQuery element, which has the real
  // DOM element under property "0".
  // From the real DOM iframe element we can get
  // the "document" element, it is stored in "contentDocument" property
  // Cypress "its" command can access deep properties using dot notation
  // https://on.cypress.io/its
  .its('0.contentDocument').should('exist')
}

const getIframeBody = (iframeName) => {
  // get the document
  return getIframeDocument(iframeName)
  // automatically retries until body is loaded
  .its('body').should('not.be.undefined')
  // wraps "body" DOM element to allow
  // chaining more Cypress commands, like ".find(...)"
  .then(cy.wrap)
}



Cypress.Commands.add('getIFrameField', getIFrameField);
