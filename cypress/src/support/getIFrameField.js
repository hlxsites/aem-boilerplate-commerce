// Kept as a pure chain of retriable query commands (get/its/should/find) with
// NO .then() in the middle. A trailing assertion from the caller
// (e.g. .should('be.visible')) re-runs this whole chain — re-reading
// contentDocument from the live iframe element — so a mid-load re-render that
// detaches the iframe body doesn't permanently break the command chain.
const getIFrameField = (iframe, field) => {
  return getIframeBody(iframe).find(field);
};

const getIframeBody = (iframe) => {
  return (
    cy
      .get(iframe)
      // Cypress yields a jQuery element whose real DOM node is under "0".
      // Read the iframe document/body via "its" deep-property access, which
      // auto-retries until the body is loaded. https://on.cypress.io/its
      .its('0.contentDocument.body')
      .should('not.be.empty')
  );
};

Cypress.Commands.add('getIFrameField', getIFrameField);
