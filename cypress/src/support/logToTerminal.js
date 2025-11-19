Cypress.Commands.add("logToTerminal", (message) => {
  cy.log(message);
  cy.task("log", message);
});