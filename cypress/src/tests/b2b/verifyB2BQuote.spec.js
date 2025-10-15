import {
    createCustomerAndAssignCompany,
    submitQuoteToCustomer,
  } from '../../support/b2bQuoteAPICalls';
  import {
    assertCartSummaryProduct,
  } from "../../assertions";

describe("Verify B2B Quote feature", () => {
    let customerData;
    before(() => {
        // Load customer fixture data
        cy.fixture('customerinfo').then((data) => {
            customerData = data;
        });
    });
    it("Verify B2B Quote feature on Cart", { tags: "@B2BSaas" }, () => {
        const random = Cypress._.random(0, 10000000);
        const username = `${random}${customerData.customer.email}`;
        // Visit the homepage
        cy.visit('/').then(async () => {
            // Create customer and Assign Company through Rest API
            try {
                const result = await createCustomerAndAssignCompany(
                    customerData.customer.firstname,
                    customerData.customer.lastname,
                    username,
                    customerData.customer.password,
                    customerData.customer.is_subscribed
                );
            } catch (error) {
                console.error('Error:', error);
            }
        });
        cy.visit('/customer/login');
        cy.get('[name="signIn_form"]').should('be.visible');
        cy.wait(2000);
        cy.get('[name="email"]').eq(1).type(username);
        cy.get('[name="password"]').eq(1).type(customerData.customer.password);
        cy.wait(1000);
        cy.get('.auth-sign-in-form__form__buttons button').eq(3).click({force: true});
        cy.url().should("include", "/customer/account");
        cy.contains(customerData.customer.firstname).should("be.visible");
        cy.contains(customerData.customer.lastname).should("be.visible");
        cy.contains(username).should("be.visible");
        cy.visit("/products/youth-tee/adb150");
        cy.get(".dropin-incrementer__input").clear().type(10);
        cy.wait(2000);
        cy.get(".dropin-incrementer__input").should("have.value", "10");
        cy.get(".product-details__buttons__add-to-cart button")
            .should("be.visible")
            .click();
        cy.get(".minicart-wrapper").click();
        cy.get('.minicart-panel[data-loaded="true"]').should('exist');
        cy.get(".minicart-panel").should("not.be.empty");
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".cart-mini-cart");
        cy.contains("View Cart").click();
        assertCartSummaryProduct(
            "Youth tee",
            "ADB150",
            "10",
            "$10.00",
            "$100.00",
            "0",
        )(".commerce-cart-wrapper");
        cy.contains("Request a Quote").click();
    });
});
