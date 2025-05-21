import {
  setGuestEmail,
  setGuestShippingAddress,
  setPaymentMethod,
  placeOrder,
  checkTermsAndConditions,
  setGuestBillingAddress,
} from '../../actions';
import {
  assertCartSummaryProduct,
  assertCartSummaryProductsOnCheckout,
  assertTitleHasLink,
  assertProductImage,
  assertCartSummaryMisc,
  assertOrderSummaryMisc,
  assertOrderConfirmationCommonDetails,
  assertOrderConfirmationBillingDetails,
  assertSelectedPaymentMethod,
} from '../../assertions';
import {
  customerShippingAddress,
  paymentServicesCreditCard,
  checkMoneyOrder,
  customerBillingAddress,
} from '../../fixtures/index';
import * as fields from "../../fields";

describe('Verify guest user can place order with virtual product', () => {
  it('Verify guest user can place order with virtual product', () => {
    cy.visit('');
    cy.get('.nav-search-button').click();
    cy.get('input[type="search"]').type('VIRTUAL123{enter}');
    cy.contains('Virtual').click();
    //cy.get('.dropin-incrementer__increase-button').click();
    cy.get('.dropin-incrementer__input').should('have.value', '1');
    // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
    cy.wait(1000);
    cy.contains('Add to Cart').click();
    cy.get('.minicart-wrapper').click();
    assertCartSummaryProduct(
      'Virtual Product',
      'VIRTUAL123',
      '1',
      '$100.00',
      '$100.00',
      '0'
    )('.cart-mini-cart');
    assertTitleHasLink(
      'Virtual Product',
      '/products/sample-virtual-product/VIRTUAL123'
    )('.cart-mini-cart');
    //assertProductImage(Cypress.env('virtualProductImageName'))('.cart-mini-cart');
    cy.contains('View Cart').click();
    assertCartSummaryProduct(
      'Virtual Product',
      'VIRTUAL123',
      '1',
      '$100.00',
      '$100.00',
      '0'
    )('.commerce-cart-wrapper');
    assertTitleHasLink(
      'Virtual Product',
      '/products/sample-virtual-product/VIRTUAL123'
    )('.commerce-cart-wrapper');
    // Virtual products typically don't have shipping costs
    cy.get('.dropin-button--primary')
      .contains('Checkout')
      .click();
    assertCartSummaryMisc(1);
    assertCartSummaryProductsOnCheckout(
      'Virtual Product',
      'VIRTUAL123',
      '1',
      '$100.00',
      '$100.00',
      '0'
    );
    
    const apiMethod = 'setGuestEmailOnCart';
    const urlTest = Cypress.env('graphqlEndPoint');
    cy.intercept('POST', urlTest, (req) => {
      let data = req.body.query;
      if (data && typeof data == 'string') {
        if (data.includes(apiMethod)) {
          req.alias = 'setEmailOnCart';
        }
      }
    });
    setGuestEmail(customerBillingAddress.email);
    cy.wait('@setEmailOnCart');

    // For virtual products, shipping address might not be required
    // However, we still need billing address which is typically the same field
    //setGuestShippingAddress(customerShippingAddress, true);
    
    // For virtual products, typically no shipping costs
    assertOrderSummaryMisc('$100.00', null, '$100.00');

    assertSelectedPaymentMethod(checkMoneyOrder.code, 0);
    setPaymentMethod(paymentServicesCreditCard);
    assertSelectedPaymentMethod(paymentServicesCreditCard.code, 2);

    setGuestBillingAddress(customerBillingAddress, true);

    checkTermsAndConditions();
    cy.wait(5000);
    placeOrder();

    assertOrderConfirmationCommonDetails(customerBillingAddress, paymentServicesCreditCard);
    assertOrderConfirmationBillingDetails(customerBillingAddress);
    // Skip shipping assertion for virtual products
    
    // Obtain order reference from URL and visit order details page
    cy.url().then((url) => {
      const orderRef = url.split('?')[1];
      cy.visit('/order-details?' + orderRef)
    })

    // CANCEL ORDER
    cy.get(fields.cancelButton).should('exist');
    cy.get(fields.cancelButton).click();

    cy.get(fields.cancellationReasonsSelector).select('1');
    cy.get(fields.cancellationReasonsSelector).should('have.value', '1');

    cy.get(fields.submitCancelOrderButton).click();

    cy.get('.dropin-header-container__title', { timeout: 3000 })
      .should('exist')
      .and('be.visible')
      .and('contain.text', 'Cancellation requested');

    cy.get(fields.cancellationReasonsModal).should('not.exist');

    cy.get('.order-order-status-content__wrapper-description p')
      .should('exist')
      .and('be.visible')
      .and(
        'contain.text',
        'The cancellation has been requested'
      ).and(
        'contain.text',
        'Check your email for further instructions.'
      );
  });
}); 