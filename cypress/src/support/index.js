import "./deleteCustomer";
import "./getUserTokenCookie";
import "./waitForResource";
import "./sessionStorage";
import "./getIFrameField";
import "./waitForImages";
import "./interceptConfig";
import "./waitForWishlistPage";
import "@percy/cypress";
import "./percyTakeSnapshot";
import "./waitForLoadingSkeletonToDisappear";
import "./deleteNegotiableQuotes";

import registerCypressGrep from "@cypress/grep";
registerCypressGrep();

// Custom command to log to terminal in CI
Cypress.Commands.add("logToTerminal", (message) => {
  cy.log(message);
  cy.task("log", message);
});
