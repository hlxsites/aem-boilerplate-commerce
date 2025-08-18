import * as fields from "../../fields";
describe("Search Feature", () => {
  it("Verify quick search features", () => {
    // Visit the homepage
    cy.visit("/");

    cy.get(fields.searchIcon).click();
    cy.get(fields.searchField)
      .should("be.visible")
      .type("tops");

    // Check if search results are displayed
    cy.get(fields.productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(fields.productCard)
      .should("have.length.at.least", 1);

    // Check that each result has product name
    cy.get(fields.productName)
      .should("have.length.at.least", 1)
      .each(($name) => {
        cy.wrap($name).should("not.be.empty");
      });

    // Check that each result has price information
    cy.get(fields.productPrice)
      .should("have.length.at.least", 1)
      .each(($price) => {
        cy.wrap($price).should("not.be.empty");
      });

    cy.get('img').each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($el) => {
          // Check that the image has a naturalWidth greater than 0
          expect($el[0].naturalWidth).to.be.greaterThan(0);
        });
    });

    // Click on first search result
    cy.get(fields.productImage)
      .first()
      .click();

    // Verify navigation to product page
    cy.url().should("include", "/products/");

    // Verify product page elements are loaded
    cy.get(".product-details", { timeout: 10000 })
      .should("be.visible");

  });

  it("Verify Search results page", () => {
    // Visit the homepage
    cy.visit("/");

    cy.get(fields.searchIcon).click();
    cy.get(fields.searchField)
      .should("be.visible")
      .type("sleeve{enter}");

    // Wait for random quick search dropdown to disappear
    cy.wait(1000);

    // Check if search results are displayed
    cy.get(fields.productListGrid)
      .should("be.visible");

    // Verify that product items are shown
    cy.get(fields.productCard)
      .should("have.length.at.least", 1);

    // Check that each result has product name
    cy.get(fields.productName)
      .should("have.length.at.least", 1)
      .each(($name) => {
        cy.wrap($name).should("not.be.empty");
      });

    // Check that each result has price information
    cy.get(fields.productPrice)
      .should("have.length.at.least", 1)
      .each(($price) => {
        cy.wrap($price).should("not.be.empty");
      });

    cy.get('img').each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($el) => {
          // Check that the image has a naturalWidth greater than 0
          expect($el[0].naturalWidth).to.be.greaterThan(0);
        });
    });

    // Click on first search result
    cy.get(fields.productImage)
      .first()
      .click();

    // Verify navigation to product page
    cy.url().should("include", "/products/");

    // Verify product page elements are loaded
    cy.get(".product-details", { timeout: 10000 })
      .should("be.visible");

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

    cy.get('img').each(($img) => {
      cy.wrap($img)
        .should('be.visible')
        .and(($el) => {
          // Check that the image has a naturalWidth greater than 0
          expect($el[0].naturalWidth).to.be.greaterThan(0);
        });
    });

    cy.percyTakeSnapshot('Search results page', 1280);
  });

});