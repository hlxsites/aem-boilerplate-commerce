import {
    setGuestEmail,
    setGuestShippingAddress,
    placeOrder,
    closeHamburgerMenu,
} from '../../actions';
import {
    assertCartSummaryProduct,
    assertCartSummaryProductsOnCheckout,
    assertTitleHasLink,
    assertProductImage,
    assertCartSummaryMisc,
    assertOrderSummaryMisc,
    assertOrderConfirmationCommonDetails,
    assertOrderConfirmationShippingDetails,
    assertOrderConfirmationBillingDetails,
    assertOrderConfirmationShippingMethod,
    assertSearchIconVisible,
} from '../../assertions';
import {

    assertSelectedPaymentMethod,
} from '../../assertions';
import {
    customerShippingAddress,
} from '../../fixtures/index';
import {
    estimatedShippingCountrySelector,
  } from '../../fields';

describe('Verify guest user can place order', () => {
    it('Verify guest user can place order', () => {
        cy.visit('');
        cy.get('.nav-drop')
            .contains('Catalog')
            .click();
        cy.contains('Crown Summit Backpack')
            .should('be.visible')
            .should("have.attr", "href", "/products/crown-summit-backpack/24-MB03")
            .should("have.text", "Crown Summit Backpack");
        cy.contains('Crown Summit Backpack').click();
        cy.get('.dropin-incrementer__increase-button').click();
        cy.get('.dropin-incrementer__input').should('have.value', '2');
        // cypress fails intermittently as it takes old value 1, this is needed for tests to be stable
        cy.wait(1000);
        cy.contains('Add to Cart').click();
        cy.get('.minicart-wrapper').click();
        assertCartSummaryProduct(
            'Crown Summit Backpack',
            '24-MB03',
            '2',
            '$38.00',
            '$76.00',
            '0'
        )('.cart-mini-cart');
        assertTitleHasLink(
            'Crown Summit Backpack',
            '/products/crown-summit-backpack/24-MB03'
        )('.cart-mini-cart');
        assertProductImage('/mb03-black-0.jpg')('.cart-mini-cart');
        cy.contains('View Cart').click({ force: true });
        assertCartSummaryProduct(
            'Crown Summit Backpack',
            '24-MB03',
            '2',
            '$38.00',
            '$76.00',
            '0'
        )('.commerce-cart-wrapper');
        assertTitleHasLink(
            'Crown Summit Backpack',
            '/products/crown-summit-backpack/24-MB03'
        )('.commerce-cart-wrapper');
        assertProductImage('/mb03-black-0.jpg')('.commerce-cart-wrapper');
        cy.contains('Estimated Shipping').should('be.visible');
        cy.get('.cart-order-summary--loading').should('not.exist');
        cy.get('.dropin-picker__placeholder').should('not.be.visible');
        cy.get(estimatedShippingCountrySelector).should('have.value', 'US');
        assertSearchIconVisible();
        closeHamburgerMenu();
        cy.percyTakeSnapshot('Cart page', 1280);
        cy.get('.dropin-button--primary')
            .contains('Checkout')
            .click({ force: true });
        assertCartSummaryMisc(2);
        assertCartSummaryProductsOnCheckout(
            'Crown Summit Backpack',
            '24-MB03',
            '2',
            '$38.00',
            '$76.00',
            '0'
        );
        cy.contains('Estimated Shipping').should('be.visible');
        assertSearchIconVisible();
        cy.get('.cart-order-summary--loading').should('not.exist');
        closeHamburgerMenu();
        cy.percyTakeSnapshot('Checkout Page', 1280);
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
        setGuestEmail(customerShippingAddress.email);
        cy.wait('@setEmailOnCart');
        setGuestShippingAddress(customerShippingAddress, true);
        assertOrderSummaryMisc('$76.00', '$10.00', '$86.00');
        assertSelectedPaymentMethod('checkmo', 0);
        cy.wait(5000);
        placeOrder();
        assertOrderConfirmationCommonDetails(customerShippingAddress);
        assertOrderConfirmationShippingDetails(customerShippingAddress);
        assertOrderConfirmationBillingDetails(customerShippingAddress);
        assertOrderConfirmationShippingMethod(customerShippingAddress);
        assertSearchIconVisible();
        cy.get('[aria-label="Open navigation"]').should('exist');
        cy.percyTakeSnapshot('Order Confirmation', 1280);
        /**
         * TODO - when /order-details page will be ready
         * Redirect to /order-details?orderRef={ORDER_TOKEN}
         * Confirm that elements similar to orderConfirmation page present (not exactly the same, separate assert needed)
         */
    });
});