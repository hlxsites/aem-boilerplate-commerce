
import {
assertImageListDisplay,
assertSearchResultClick,
aseertSearchResults
} from "../../assertions";

import {
  inputSearchString
  } from "../../actions";

import * as fields from "../../fields";

describe("Search Feature", () => {
  it("Verify quick search features", () => {
    // Visit the homepage
    cy.visit("/");

    //Input search string
    inputSearchString("tops");

    aseertSearchResults();

    assertImageListDisplay('.product-discovery-product-list__grid');

    assertSearchResultClick();

  });

  it("Verify Search results page", () => {
    // Visit the homepage
    cy.visit("/");
    
    // Input search string and hit enter
    inputSearchString("sleeve{enter}");

    // Wait for random quick search dropdown to disappear
    cy.wait(1000);

    aseertSearchResults();

    assertImageListDisplay('.product-discovery-product-list__grid');

    assertSearchResultClick();

  });

  it("Verify Filter on search results page", () => {
    // Visit the homepage
    cy.visit("/search?q=tee&page=1&sort=&filter=categories%3Acollections%7Cprice%3A10-25");

    // Check if search results are displayed
    cy.get(fields.productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(fields.productCard)
      .should("have.length.at.least", 1);

      assertImageListDisplay('.product-discovery-product-list__grid');

    cy.percyTakeSnapshot('Search results page', 1280);
  });

});