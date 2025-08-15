import * as fields from "../../fields";
describe("Search Feature", { tags: ["@skipSaas", "@skipPaas"] },  () => {
  it("Verify quick search features", () => {
    // Visit the homepage
    cy.visit("/");

    cy.get(searchIcon).click();
    cy.get(searchField)
      .should("be.visible")
      .type("shirt");

    // Check if search results are displayed
    cy.get(productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(productCard)
      .should("have.length.at.least", 1);

    // Check that each result has product name
    cy.get(productName)
      .should("have.length.at.least", 1)
      .each(($name) => {
        cy.wrap($name).should("not.be.empty");
      });

    // Check that each result has price information
    cy.get(productPrice)
      .should("have.length.at.least", 1)
      .each(($price) => {
        cy.wrap($price).should("not.be.empty");
      });

    // Click on first search result
    cy.get(productImage)
      .first()
      .click();

    // Verify navigation to product page
    cy.url().should("include", "/products/");

    // Verify product page elements are loaded
    cy.get(".product-details", { timeout: 10000 })
      .should("be.visible");
  });

  it("Verify Search results page", () => {
    it("Verify quick search features", () => {
      // Visit the homepage
      cy.visit("/");

      cy.get(searchIcon).click();
      cy.get(searchField)
        .should("be.visible")
        .type("tee{enter}");

      // Wait for random quick search dropdown to disappear
      cy.wait(1000);

      // Check if search results are displayed
      cy.get(productListGrid)
        .should("be.visible");

      // Verify that product items are shown
      cy.get(productCard)
        .should("have.length.at.least", 1);

      // Check that each result has product name
      cy.get(productName)
        .should("have.length.at.least", 1)
        .each(($name) => {
          cy.wrap($name).should("not.be.empty");
        });

      // Check that each result has price information
      cy.get(productPrice)
        .should("have.length.at.least", 1)
        .each(($price) => {
          cy.wrap($price).should("not.be.empty");
        });

      // Click on first search result
      cy.get(productImage)
        .first()
        .click();

      // Verify navigation to product page
      cy.url().should("include", "/products/");

      // Verify product page elements are loaded
      cy.get(".product-details", { timeout: 10000 })
        .should("be.visible");
    });
  });
});