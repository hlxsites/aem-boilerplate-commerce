import * as fields from '../fields/index';
import {
  assertSearchIconVisible,
} from '../assertions';

export const setGuestEmail = (customerEmail) => {
  cy.get(fields.shippingFormGuestEmail).clear().type(customerEmail);
};

export const setGuestShippingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.shippingFormFirstName).should('be.visible');
  cy.get(fields.shippingFormFirstName).focus().clear().type(customerAddress.firstName);
  cy.get(fields.shippingFormLastName).focus().clear().type(customerAddress.lastName);
  cy.get(fields.shippingFormStreet).focus().clear().type(customerAddress.street);
  cy.get(fields.shippingFormStreet1).focus().clear().type(customerAddress.street1);
  if (isSelectableState) {
    cy.get(fields.shippingFormState).select(customerAddress.region);
  } else {
    cy.get(fields.shippingFormInputState).type(customerAddress.region);
  }
  cy.get(fields.shippingFormCity).focus().clear().type(customerAddress.city);
  cy.get(fields.shippingFormPostCode).focus().clear().type(customerAddress.postCode);
  cy.get(fields.shippingFormTelephone).focus().clear().type(customerAddress.telephone);
};

export const setGuestBillingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.billingFormFirstName).focus().should("not.be.disabled").clear().type(customerAddress.firstName, { force: true });
  cy.get(fields.billingFormLastName).focus().should("not.be.disabled").clear().type(customerAddress.lastName, { force: true });
  cy.get(fields.billingFormStreet).focus().should("not.be.disabled").clear().type(customerAddress.street, { force: true });
  cy.get(fields.billingFormStreet1).focus().should("not.be.disabled").clear().type(customerAddress.street1, { force: true });
  if (isSelectableState) {
    cy.get(fields.billingFormState).focus().should("not.be.disabled").select(customerAddress.region, { force: true });
  } else {
    cy.get(fields.billingFormInputState).focus().should("not.be.disabled").type(customerAddress.region, { force: true });
  }
  cy.get(fields.billingFormCity).focus().should("not.be.disabled").clear().type(customerAddress.city, { force: true });
  cy.get(fields.billingFormPostCode).focus().should("not.be.disabled").clear().type(customerAddress.postCode, { force: true });
  cy.get(fields.billingFormTelephone).focus().should("not.be.disabled").clear().type(customerAddress.telephone, { force: true });
};

export const uncheckBillToShippingAddress = () => {
  cy.get(fields.billToShippingAddress).focus().should("not.be.disabled").uncheck({ force: true });
};

export const placeOrder = () => {
  cy.get(fields.placeOrderButton).should('be.visible')
  cy.get(fields.placeOrderButton).click();
};

export const createAccount = () => {
  cy.contains("Create account").click();
};

export const signUpUser = (sign_up, isValid = true) => {
  const random = Cypress._.random(0, 10000000);
  const username = `${random}${sign_up.email}`;
  cy.contains("Create account").should('be.visible');
  if (sign_up.company) {
    cy.get(fields.authFormUserCompany).clear().type(sign_up.company);
  }
  if (sign_up.email) {
    cy.get(fields.authFormUserEmail).eq(1).clear({ force: true }).type(username);
  }
  cy.get(fields.authFormUserFirstName).clear().type(sign_up.firstName);
  cy.get(fields.authFormUserLastName).clear().type(sign_up.lastName);
  cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);

  if (isValid) {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);
  } else {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.shortPassword);
  }
  cy.get('.dropin-picker__select').select('Male');
  assertSearchIconVisible();
  closeHamburgerMenu();
  cy.percyTakeSnapshot('Auth Create Account', 1280)
  createAccount();
};


export const closeHamburgerMenu = () => {
  cy.get('[aria-label="Close navigation"]').click({ force: true });
};
