import { signUpUser } from '../../actions';
import { assertAuthUser } from '../../assertions';
import * as fields from "../../fields";

describe("Verify Complex Product Requisition List Redirect", { tags: "@B2BSaas" }, () => {
  it("Should redirect to PDP when trying to add a complex product to requisition list from PLP", () => {
    // Sign up and authenticate user
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate to Requisition Lists from Account menu
    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get(fields.reqListGridEmptyList).should('exist')
      .within(() => {
        cy.contains('No Requisition Lists found').should('be.visible');
      });

    // Create new Requisition List
    cy.contains('Add new Requisition List').should('be.visible').click();
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .type('Test Requisition List');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .should('not.be.disabled')
      .type('Test description');
    cy.contains('Cancel').should('be.visible');
    cy.contains('Save').should('be.visible').and('not.be.disabled').click();
    cy.wait(1000);
    cy.contains('Test Requisition List').should('be.visible');
    cy.get(fields.requisitionListItemRow).should('have.length', 1);

    // Navigate to a category page or search for products
    // Using the Apparel category as it typically contains configurable products
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");
    cy.contains("Apparel").should('be.visible').click();

    // Wait for product list to load
    cy.get(fields.productListGrid, { timeout: 10000 }).should('be.visible');

    // Find a complex/configurable product by checking for products with "ComplexProductView" typename
    // Since we can't directly check product type in Cypress, we'll look for products that have options
    // Or we can navigate to a known configurable product category

    // Alternative: Search for a specific configurable product
    cy.visit('/search?q=configurable');
    cy.get(fields.productListGrid, { timeout: 10000 }).should('be.visible');
    cy.wait(2000);

    // Find the first product card with a requisition list dropdown
    cy.get(fields.requisitionListNamesOnPLP).first().should('exist');

    // Get the current URL to compare later
    cy.url().then((currentUrl) => {
      // Try to add to requisition list from the first product
      // Note: For a complex product, this should trigger a redirect
      cy.get(fields.requisitionListNamesOnPLP)
        .first()
        .find('select')
        .select('Test Requisition List');

      // Wait a bit for potential redirect
      cy.wait(2000);

      // Check if we've been redirected to a product detail page
      cy.url().should('not.equal', currentUrl);
      cy.url().should('include', '/products/');

      // Verify we're on a product detail page
      cy.get('.product-details__wrapper').should('exist');

      // Verify the notification/alert is displayed
      cy.get('.product-details__alert', { timeout: 5000 })
        .should('be.visible')
        .and('not.be.empty');

      // Verify the alert contains the expected message
      cy.get('.product-details__alert')
        .invoke('text')
        .should('match', /select product options/i);

      // Verify the product options are visible (confirming it's a complex product)
      cy.get('.product-details__options').should('exist');
    });
  });

  it("Should also redirect when trying to create a new requisition list with a complex product from PLP", () => {
    // Sign up and authenticate user
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate to search for configurable products
    cy.visit('/search?q=configurable');
    cy.get(fields.productListGrid, { timeout: 10000 }).should('be.visible');
    cy.wait(2000);

    // Find the first product card with a requisition list dropdown
    cy.get(fields.requisitionListNamesOnPLP).first().should('exist');

    // Get the current URL to compare later
    cy.url().then((currentUrl) => {
      // Try to create a new requisition list from a complex product
      cy.get(fields.requisitionListNamesOnPLP)
        .first()
        .find('select')
        .select('Create Requisition List');

      // Wait for the form to appear
      cy.wait(1000);

      // Fill out the requisition list form
      cy.get(fields.requisitionListFormName, { timeout: 10000 })
        .should('be.visible')
        .should('not.be.disabled')
        .type('New List from Complex Product');

      cy.get(fields.requisitionListFormDescription)
        .should('be.visible')
        .should('not.be.disabled')
        .type('Test description');

      // Submit the form - this should trigger the redirect
      cy.get('[data-testid="requisition-list-form-save"]')
        .should('be.visible')
        .scrollIntoView()
        .click();

      // Wait a bit for potential redirect
      cy.wait(2000);

      // Check if we've been redirected to a product detail page instead of creating the list
      cy.url().should('not.equal', currentUrl);
      cy.url().should('include', '/products/');

      // Verify we're on a product detail page
      cy.get('.product-details__wrapper').should('exist');

      // Verify the notification/alert is displayed
      cy.get('.product-details__alert', { timeout: 5000 })
        .should('be.visible')
        .and('not.be.empty');

      // Verify the alert contains the expected message
      cy.get('.product-details__alert')
        .invoke('text')
        .should('match', /select product options/i);
    });
  });

  it("Should allow adding a simple product to requisition list from PLP without redirect", () => {
    // Sign up and authenticate user
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Create a requisition list first
    cy.contains('Requisition Lists').should('be.visible').click();
    cy.contains('Add new Requisition List').should('be.visible').click();
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .type('Simple Product List');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .type('For simple products');
    cy.contains('Save').should('be.visible').click();
    cy.wait(1000);

    // Navigate to Apparel category which should have simple products
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");
    cy.contains("Apparel").should('be.visible').click();
    cy.get(fields.productListGrid, { timeout: 10000 }).should('be.visible');
    cy.wait(2000);

    // Get the current URL
    cy.url().then((currentUrl) => {
      // Add a simple product to the requisition list
      // This should NOT redirect
      cy.get(fields.requisitionListNamesOnPLP)
        .first()
        .find('select')
        .select('Simple Product List');

      cy.wait(2000);

      // Verify we're still on the same page (no redirect for simple products)
      cy.url().should('equal', currentUrl);

      // No alert should be shown on PLP
      cy.get('.search__alert').should('not.exist');
    });
  });
});

