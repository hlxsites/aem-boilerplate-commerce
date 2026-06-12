// Pure chain of retriable query commands with no .then() in the middle.
// A trailing .should('be.visible') from the caller re-runs the whole chain,
// re-reading contentDocument from the live iframe element so a mid-load
// re-render that detaches the iframe body doesn't permanently break it.
const getIFrameField = (iframe, field) => {
  return getIframeBody(iframe).find(field);
};

const getIframeBody = (iframe) => {
  return (
    cy
      .get(iframe)
      .its('0.contentDocument.body')
      .should('not.be.empty')
  );
};

Cypress.Commands.add('getIFrameField', getIFrameField);
