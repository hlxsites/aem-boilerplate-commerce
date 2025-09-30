import { signUpUser } from '../../actions';
import { assertAuthUser } from '../../assertions';
import { products } from '../../fixtures';

describe("Verify B2B Requisition Lists feature", { tags: "@B2BSaas" },  () => {
  it("Verify B2B Requisition is not available for guest users", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get('.product-details__buttons__add-to-req-list').should('not.exist');

    // Open Catalog Menu
    cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();
    cy.get('.product-details__buttons__add-to-req-list').should('not.exist');
  });

  it("Verify B2B Requisition is available for authenticated users", () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });

    // Navigate to Requisition Lists from Account menu
    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get('.requisition-list-grid-wrapper__content').should('exist');

    // Create new Requisition List
    cy.contains('Add new Requisition List').should('be.visible').click();
    cy.get('#requisition-list-form-name').type('Newly Created Requisition List');
    cy.get('#requisition-list-form-description').type('Here goes a dummy description');
    cy.contains('Cancel').should('be.visible');
    cy.contains('Save').should('be.visible').click();
    cy.contains('Newly Created Requisition List').should('be.visible');
    cy.get('.requisition-list-item__row').should('have.length', 1);

    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get('.product-details__buttons__add-to-req-list').should('exist');

    // Add product to Existing Requisition List from PDP
    cy.get('.requisition-list-names__picker select').select('Newly Created Requisition List');

    // Create a new list and add product to it from PDP
    cy.get('.requisition-list-names__picker select').select('Create Requisition List')
    cy.get('#requisition-list-form-name').type('Req list created from PDP');
    cy.get('#requisition-list-form-description').type('Another dummy description');
    cy.contains('Save').should('be.visible').click();

    // Assert new Requisition List is created and can be selected
    cy.get('.requisition-list-names__picker select').select('Req list created from PDP');

    // Open Catalog Menu
    cy.get(".nav-drop").first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();
    cy.get('.product-discovery-product-actions__requisition-list-names').should('exist');

    // Add product to Existing Requisition List from PLP
    cy.get('.requisition-list-names__picker select').eq(1).select('Newly Created Requisition List');

    // Create a new list and add product to it from PLP
    cy.get('.requisition-list-names__picker select').eq(1).select('Create Requisition List')
    cy.get('#requisition-list-form-name').type('Now a Req list from PLP');
    cy.get('#requisition-list-form-description').type('Yet another dummy description');
    cy.contains('Save').should('be.visible').click();

    // Assert new Requisition List is created and can be selected
    cy.get('.requisition-list-names__picker select').eq(1).select('Now a Req list from PLP');

    // Go to customer account page
    cy.visit("/customer/account");

    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get('.requisition-list-grid-wrapper__content').should('exist');
    cy.get('.requisition-list-item__row').should('have.length', 3);

    // Rename Requisition List
    cy.get('.requisition-list-item__actions button[data-testid="rename-button"]').eq(1).click();
    cy.contains('Rename Requisition List').should('be.visible');
    cy.get('#requisition-list-form-name').clear().type('Updated Requisition List');
    cy.get('#requisition-list-form-description').clear().type('Dummy description');
    cy.contains('Save').should('be.visible').click();
    cy.contains('Updated Requisition List').should('be.visible');

    // Remove Requisition List
    cy.get('.requisition-list-item__actions button[data-testid="remove-button"]').eq(2).click();
    cy.get('.requisition-list-modal__buttons button[data-testid="rl-modal-confirm-button"]').click();
    cy.get('.requisition-list-item__row').should('have.length', 2);
  });

});
