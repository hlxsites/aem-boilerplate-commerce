import * as fields from "../fields/index";

export const setGuestEmail = (customerEmail) => {
  cy.get(fields.shippingFormGuestEmail).clear().type(customerEmail);
};

export const setGuestShippingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.shippingFormFirstName).clear().type(customerAddress.firstName);
  cy.get(fields.shippingFormLastName).clear().type(customerAddress.lastName);
  cy.get(fields.shippingFormStreet).clear().type(customerAddress.street);
  cy.get(fields.shippingFormStreet1).clear().type(customerAddress.street1);
  if (isSelectableState) {
    cy.get(fields.shippingFormState).select(customerAddress.region);
  } else {
    cy.get(fields.shippingFormInputState).type(customerAddress.region);
  }
  cy.get(fields.shippingFormCity).clear().type(customerAddress.city);
  cy.get(fields.shippingFormPostCode).clear().type(customerAddress.postCode);
  cy.get(fields.shippingFormTelephone).clear().type(customerAddress.telephone);
};

export const setGuestBillingAddress = (customerAddress, isSelectableState) => {
  cy.get(fields.billingFormFirstName)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.firstName, { force: true });
  cy.get(fields.billingFormLastName)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.lastName, { force: true });
  cy.get(fields.billingFormStreet)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.street, { force: true });
  cy.get(fields.billingFormStreet1)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.street1, { force: true });
  if (isSelectableState) {
    cy.get(fields.billingFormState)
      .should("not.be.disabled")
      .select(customerAddress.region, { force: true });
  } else {
    cy.get(fields.billingFormInputState)
      .should("not.be.disabled")
      .type(customerAddress.region, { force: true });
  }
  cy.get(fields.billingFormCity)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.city, { force: true });
  cy.get(fields.billingFormPostCode)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.postCode, { force: true });
  cy.get(fields.billingFormTelephone)
    .should("not.be.disabled")
    .clear()
    .type(customerAddress.telephone, { force: true });
};

export const uncheckBillToShippingAddress = () => {
  cy.get(fields.billToShippingAddress).uncheck({ force: true });
};

export const placeOrder = () => {
  // Wait for the button to be both visible and enabled — it stays disabled
  // until payment details have finished validating/tokenizing, so this is the
  // deterministic anchor that replaces fixed waits before placing the order.
  cy.get(fields.placeOrderButton).should("be.visible").and("not.be.disabled");
  cy.get(fields.placeOrderButton).click();
};

export const createAccount = () => {
  cy.contains("Create account").click();
};

export const signUpUser = (sign_up, isValid = true) => {
  const random = Cypress._.random(0, 10000000);
  const username = `${random}${sign_up.email}`;
  cy.contains("Create account").should("be.visible");
  if (sign_up.email) {
    cy.get(fields.authFormUserEmail)
      .eq(1)
      .clear({ force: true })
      .type(username);
  }
  cy.get(fields.authFormUserFirstName).clear().type(sign_up.firstName);
  cy.get(fields.authFormUserLastName).clear().type(sign_up.lastName);
  cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);

  if (isValid) {
    cy.get(fields.authFormUserPassword).eq(1).clear().type(sign_up.password);
  } else {
    cy.get(fields.authFormUserPassword)
      .eq(1)
      .clear()
      .type(sign_up.shortPassword);
  }
  createAccount();
};

export const setPaymentMethod = (paymentMethod) => {
  cy.get(fields.paymentMethods).contains(paymentMethod.name).click();
  if (paymentMethod.name === 'Credit Card') {
    const { cc_number, cc_exp, cc_cid } = paymentMethod.params;
    // The hosted payment-services dropin mounts its iframes and then re-renders
    // them once it finishes loading. Assert each field is visible before typing
    // so Cypress requeries past the re-render instead of grabbing a stale
    // (about-to-detach) iframe reference.
    cy.getIFrameField(fields.creditCardNumberIFrame, fields.creditCardNumber)
      .should('be.visible')
      .type(cc_number);
    cy.getIFrameField(fields.creditCardExpIFrame, fields.creditCardExp)
      .should('be.visible')
      .type(cc_exp);
    cy.getIFrameField(fields.creditCardCvvIFrame, fields.creditCardCvv)
      .should('be.visible')
      .type(cc_cid);
  }
};

export function checkTermsAndConditions() {
  cy.get(fields.termsAndConditionsCheckbox).check({ force: true });
  cy.get(fields.termsAndConditionsCheckbox).should('be.checked');
}

export const fillGiftOptiosForm = (className, type = 'order') => {
  if (type === 'product') {
    cy.get(className).contains('Gift options').should('be.visible').click();
  }

  if (type === 'order') {
    // These dropin checkboxes are visually-hidden inputs (hence force click);
    // cy.get retries for existence and the trailing should('be.checked') confirms.
    cy.get(`${className} ${fields.giftOptionCardIncludedCheckBox}`)
      .click({
        force: true,
      })
      .should('be.checked');
  }

  cy.get(`${className} ${fields.giftOptionWrapCheckBox}`)
    .click({
      force: true,
    })
    .should('be.checked');

  // Toggling the checkboxes above re-renders the form; the recipient input
  // re-mounts and may drop the first keystroke. .click() triggers focus after
  // the re-render; .clear() makes the Cypress retry chain safe (removes any
  // partial value from a previous attempt before retyping).
  cy.get(`${className} ${fields.giftOptionRecipientName}`)
    .should('be.visible')
    .click()
    .clear()
    .type('giftOptionRecipientName')
    .should('have.value', 'giftOptionRecipientName')
    .blur();
  cy.get(`${className} ${fields.giftOptionSenderName}`)
    .should('be.visible')
    .type('giftOptionSenderName')
    .should('have.value', 'giftOptionSenderName')
    .blur();
  cy.get(`${className} ${fields.giftOptionMessage}`)
    .should('be.visible')
    .type('giftOptionMessage')
    .should('have.value', 'giftOptionMessage')
    .blur(); // Added .blur() here

  cy.get(className).contains('Customize').should('be.visible').click();
  // Wait for the wrap-design modal to render before selecting an image and
  // applying; clicking before the grid loads silently skips the selection so
  // the gift-wrap charge never appears in the order summary.
  cy.get(`.cart-gift-options-view__modal-grid-item img`)
    .eq(1)
    .should('be.visible')
    .click();
  cy.contains('.dropin-button--primary', 'Apply')
    .should('be.visible')
    .click();
};

export const fillGiftOptiosMessageForm = (className, type = 'order') => {
  if (type === 'product') {
    cy.get(className).contains('Gift options').should('be.visible').click();
  }

  cy.get(`${className} ${fields.giftOptionRecipientName}`)
    .should('be.visible')
    .type('giftOptionRecipientName')
    .should('have.value', 'giftOptionRecipientName')
    .blur();
  cy.get(`${className} ${fields.giftOptionSenderName}`)
    .should('be.visible')
    .type('giftOptionSenderName')
    .should('have.value', 'giftOptionSenderName')
    .blur();
  cy.get(`${className} ${fields.giftOptionMessage}`)
    .should('be.visible')
    .type('giftOptionMessage')
    .should('have.value', 'giftOptionMessage')
    .blur(); // Added .blur() here
};

export const fillGiftOptiosFormEmpty = (className) => {
  cy.get(`${className} ${fields.giftOptionRecipientName}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();

  cy.get(`${className} ${fields.giftOptionSenderName}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();

  cy.get(`${className} ${fields.giftOptionMessage}`, {
    timeout: 2000,
  })
    .clear()
    .should('have.value', '')
    .blur();
};

export const createAddress = (address, isValid = true) => {
  cy.get(fields.fieldUserFirstName).clear().type(address.firstName);
  cy.get(fields.fieldUserLastName).clear().type(address.lastName);
  cy.get(fields.fieldUserStreet).clear().type(address.street);
  cy.get(fields.fieldUserStreet2).clear().type(address.streetMultiline_2);
  cy.get(fields.fieldUserSelectCountry).select(address.countryCode);
  cy.get(fields.fieldUserTextRegion).clear().type(address.region);
  cy.get(fields.fieldUserCity).clear().type(address.city);
  cy.get(fields.fieldUserPhone).clear().type(address.telephone);
  cy.get(fields.fieldUserPostCode).clear().type(address.postcode);
  cy.get(fields.fieldUserVatId).clear().type(address.vatId);
  cy.get(fields.authFormUserCheckBoxShipping).then(($checkbox) => {
    $checkbox.prop('checked', address.defaultShipping);
  });
};

export const inputSearchString = (searchString) => {
  cy.get(fields.searchIcon).click();
  cy.get(fields.searchField)
    .should("be.visible")
    .type(searchString);
};

export const editProductOptions = (selectedOption, updateProductOptionTo) => {
  cy.contains('Edit').click();
  cy.get('.modal-content').should('be.visible');
  cy.get('select').eq(1)
    .find('option:selected')
    .should('have.text', selectedOption);
  cy.get(".dropin-incrementer__increase-button").eq(1).click();
  cy.get(".dropin-incrementer__input").eq(1).should("have.value", "2");
  cy.get('select').eq(1).select(updateProductOptionTo);
  cy.get('select').eq(1)
    .find('option:selected')
    .should('have.text', updateProductOptionTo);
  cy.contains('Update in Cart').should('be.visible').click();
}

export const typeInFieldBasedOnText = (textToSearch, enterInput) => {
  cy.contains(textToSearch)
    .parent()
    .find('input')
    .type(enterInput);
}