import { signUpUser } from '../../actions';
import { assertAuthUser } from '../../assertions';
import { products } from '../../fixtures';
import * as fields from "../../fields";

describe("Verify B2B Requisition Lists feature", { tags: "@B2BSaas" },  () => {
  it("Verify B2B Requisition is not available for guest users", () => {
    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should('not.exist');

    // Open Catalog Menu
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();
    cy.get(fields.addToRequisitionListButton).should('not.exist');
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
    cy.get(fields.reqListGridEmptyList).should('exist')
      .within(() => {
        cy.contains('No Requisition Lists found').should('be.visible');
      });

    // Create new Requisition List
    cy.contains('Add new Requisition List').should('be.visible').click();
    // Wait for form fields to be enabled
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .type('Newly Created Requisition List');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .should('not.be.disabled')
      .type('Here goes a dummy description');
    cy.contains('Cancel').should('be.visible');
    cy.contains('Save').should('be.visible').and('not.be.disabled').click();
    cy.wait(1000); // Wait for list to be created
    cy.contains('Newly Created Requisition List').should('be.visible');
    cy.get(fields.requisitionListItemRow).should('have.length', 1);

    // Navigate to PDP
    cy.visit(products.simple.urlPath);
    cy.get(fields.addToRequisitionListButton).should('exist');

    // Add product to Existing Requisition List from PDP
    cy.get(fields.requisitionListNamesOnPDP).select('Newly Created Requisition List');

    // Create a new list and add product to it from PDP
    cy.get(fields.requisitionListNamesOnPDP).select('Create Requisition List');
    // Wait for the form card to appear and fields to be enabled
    cy.get('.dropin-card', { timeout: 10000 }).should('be.visible');
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .type('Req list created from PDP');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .should('not.be.disabled')
      .type('Another dummy description');
    cy.contains('Save').should('be.visible').and('not.be.disabled').click();
    // Wait for the form card to disappear
    cy.get('.dropin-card', { timeout: 10000 }).should('not.exist');

    // Assert new Requisition List is created and can be selected
    cy.get(fields.requisitionListNamesOnPDP).select('Req list created from PDP');

    // Open Catalog Menu
    cy.get(fields.navDrop).first().should('be.visible').trigger("mouseenter");

    // Navigate to Apparel category page
    cy.contains("Apparel").should('be.visible').click();

    // Wait for products to load and requisition list selects to render
    cy.get(fields.requisitionListNamesSelectOnPLP, { timeout: 10000 }).should('have.length.at.least', 2);

    // Add product to Existing Requisition List from PLP
    cy.get(fields.requisitionListNamesSelectOnPLP).eq(0).should('be.visible').select('Newly Created Requisition List');

    // Create a new list and add product to it from PLP
    cy.get(fields.requisitionListNamesSelectOnPLP).eq(1).should('be.visible').select('Create Requisition List');
    // Wait for the form card to appear and fields to be enabled
    cy.get('.dropin-card', { timeout: 10000 }).should('be.visible');
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .type('Now a Req list from PLP');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .should('not.be.disabled')
      .type('Yet another dummy description');
    cy.contains('Save').should('be.visible').and('not.be.disabled').click();
    // Wait for the form card to disappear
    cy.get('.dropin-card', { timeout: 10000 }).should('not.exist');

    // Assert new Requisition List is created and can be selected
    cy.get(fields.requisitionListNamesSelectOnPLP).eq(1).should('be.visible').select('Now a Req list from PLP');

    // Go to customer account page
    cy.visit("/customer/account");

    cy.contains('Requisition Lists').should('be.visible').click();
    cy.get(fields.reqListGridWrapper).should('exist');
    cy.get(fields.requisitionListItemRow).should('have.length', 3);

    // Rename Requisition List
    cy.get(fields.requisitionListItemActionsRenameButton).eq(1).click();
    cy.contains('Rename Requisition List').should('be.visible');
    // Wait for form fields to be enabled
    cy.get(fields.requisitionListFormName, { timeout: 10000 })
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type('Updated Requisition List');
    cy.get(fields.requisitionListFormDescription)
      .should('be.visible')
      .should('not.be.disabled')
      .clear()
      .type('Dummy description');
    cy.contains('Save').should('be.visible').and('not.be.disabled').click();
    cy.wait(1000); // Wait for list to be updated
    cy.contains('Updated Requisition List').should('be.visible');

    // Remove Requisition List
    cy.get(fields.requisitionListItemActionsRemoveButton).eq(2).click();
    cy.get(fields.requisitionListModalConfirmButton).click();
    cy.get(fields.requisitionListItemRow).should('have.length', 2);
  });

});
