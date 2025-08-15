import {
  signUpUser,
  createAddress
} from "../../actions";
import {
  assertAuthUser
} from "../../assertions";

describe("Verify user account functionality", () => {
  it("Verify auth user can create addresses", () => {
    cy.visit("/customer/create");
    cy.fixture("userInfo").then(({ sign_up }) => {
      signUpUser(sign_up);
      assertAuthUser(sign_up);
      cy.wait(5000);
    });
    cy.contains('Edit').should('not.be.disabled').click({ force: true });
    cy.percyTakeSnapshot('My Account Customer', 1280);
    cy.contains('Addresses').should('not.be.disabled').click({ force: true });
    cy.contains('No saved addresses').should('be.visible');
    cy.contains('Create new').should('not.be.disabled').click({ force: true });
    cy.get('[data-testid="addressesFormTitle"]')
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Add address');

    cy.fixture('addressInfo').then(({ add_new_address }) => {
      createAddress(add_new_address);
    });
    cy.contains('Save').should('be.visible').click();
    cy.get('.account-address-card__description').should('be.visible');
    cy.percyTakeSnapshot('My Account Address', 1280);
  });
});
