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

// Enable console logs in CI
if (Cypress.config("isTextTerminal")) {
  require("cypress-log-to-output");
}
