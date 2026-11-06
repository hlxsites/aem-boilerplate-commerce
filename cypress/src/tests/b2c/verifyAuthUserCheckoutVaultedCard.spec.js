import {
  setGuestShippingAddress,
  placeOrder,
  signUpUser,
  setPaymentMethod,
  checkTermsAndConditions,
} from "../../actions";
import {
  assertAuthUser,
  assertOrderConfirmationShippingDetails,
  assertSelectedPaymentMethod,
} from "../../assertions";
import {
  customerShippingAddress,
  paymentServicesCreditCard,
} from "../../fixtures/index";

const VAULT_CODE = "payment_services_paypal_vault";
const SAVE_CARD_LABEL = "Save this card for future purchases";
const STORED_METHOD = ".checkout-payment-methods__stored-method";

let customerCartLoadedAt = 0;

const trackCustomerCartLoads = () => {
  cy.intercept("POST", Cypress.env("graphqlEndPoint"), (req) => {
    if (req.body?.query?.includes("customerCart")) {
      req.continue(() => {
        customerCartLoadedAt = Date.now();
      });
    }
  });
};

const addProductAndGoToCheckout = () => {
  let visitedAt;
  cy.then(() => {
    visitedAt = Date.now();
  });
  cy.visit("/products/youth-tee/adb150");
  // Adding before the cart dropin resolves the customer's cart makes it fall back to
  // createGuestCart, which the backend rejects for logged-in customers.
  cy.wrap(null).should(() => {
    expect(customerCartLoadedAt).to.be.greaterThan(visitedAt);
  });
  cy.get(".product-details__buttons__add-to-cart button")
    .should("be.visible")
    .and("not.be.disabled")
    .click();
  cy.get(".minicart-wrapper").click();
  // Gate on the SKU so the cart mutation has finished before leaving the page.
  cy.get(".cart-mini-cart").contains(".dropin-cart-item__sku", "ADB150", {
    timeout: 30000,
  });
  cy.visit("/checkout");
};

const assertOrderPlaced = (firstName) => {
  cy.get(".order-confirmation", { timeout: 60000 })
    .should("contain", `${firstName}, thank you for your order!`)
    .and("contain", "Order summary");
  cy.contains("p", /ORDER #\d+/).should("be.visible");
};

// The vault is only enabled on the SaaS sandbox tenant.
describe(
  "Verify auth user can place an order with a vaulted card",
  { tags: ["@skipPaas", "@skipAco", "@skipSaasProd"] },
  () => {
    it("Saves a card on the first order and pays with it on the second", () => {
      trackCustomerCartLoads();
      cy.visit("/customer/create");
      cy.get(".minicart-wrapper").should("be.visible");
      cy.fixture("userInfo").then(({ sign_up }) => {
        signUpUser(sign_up);
        assertAuthUser(sign_up);

        // First order: pay with a new card and ask to store it.
        addProductAndGoToCheckout();
        setGuestShippingAddress(customerShippingAddress, true);
        setPaymentMethod(paymentServicesCreditCard);
        assertSelectedPaymentMethod(paymentServicesCreditCard.code);
        cy.contains(SAVE_CARD_LABEL).should("be.visible").click();
        checkTermsAndConditions();
        placeOrder();
        assertOrderPlaced(sign_up.firstName);
        assertOrderConfirmationShippingDetails(customerShippingAddress);

        // Second order: the stored card must be offered and sent to the cart as a vault method.
        const paymentMethodCodes = [];
        cy.intercept("POST", Cypress.env("graphqlEndPoint"), (req) => {
          if (req.body?.query?.includes("setPaymentMethodOnCart")) {
            paymentMethodCodes.push(req.body.variables?.input?.code);
          }
        });
        addProductAndGoToCheckout();
        setGuestShippingAddress(customerShippingAddress, true);
        cy.get(STORED_METHOD, { timeout: 30000 })
          .should("have.length.at.least", 1)
          .first()
          .should("contain", "1111")
          .click();
        // A default method may be set first, so check every call instead of the first one.
        cy.wrap(null).should(() => {
          expect(paymentMethodCodes).to.include(VAULT_CODE);
        });
        cy.get(`${STORED_METHOD}--selected`).should("have.length", 1);
        checkTermsAndConditions();
        placeOrder();
        assertOrderPlaced(sign_up.firstName);
      });
    });
  },
);
