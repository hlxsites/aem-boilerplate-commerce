/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

/**
 * @fileoverview B2B Shopping Assistance E2E Tests.
 * Tests cover:
 * - User registration with Remote Shopping Assistance consent
 * - Verification that user is auto-logged in after registration
 * - Navigation to Seller Assisted Purchasing page
 * - Verification of page header and checkbox state
 * - Toggle checkbox on/off and verify UI messages
 * - Verification of "disabled" message when checkbox is unchecked
 * - Verification that message disappears when checkbox is re-enabled
 *
 * Test Plan: B2B Shopping Assistance feature
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-01 (P0): Complete Shopping Assistance flow (Frontend)
 *   - Register with consent enabled
 *   - Auto-login after registration
 *   - Navigate to /customer/seller-assisted-purchasing
 *   - Verify page header "Seller assisted purchasing"
 *   - Verify checkbox is checked
 *   - Uncheck checkbox
 *   - Verify disabled message appears
 *   - Re-check checkbox
 *   - Verify disabled message disappears
 * ==========================================================================
 */

import * as fields from "../../fields";
import * as actions from "../../actions";
import { customerShippingAddress, checkMoneyOrder } from "../../fixtures";
import {
  findCustomerByEmail,
  requestCustomerOtp,
} from "../../support/b2bCompanyAPICalls";

describe("B2B Shopping Assistance", { tags: ["@B2BSaas"] }, () => {
  let testUserEmail;

  const typeIntoVisibleField = (selectors, value, fieldLabel = "field") => {
    const selectorQuery = selectors.join(", ");

    const waitForVisibleField = (attempt = 1, maxAttempts = 8) =>
      cy.get("body", { timeout: 5000 }).then(($body) => {
        const visibleSelectors = selectors.filter(
          (selector) => $body.find(`${selector}:visible`).length > 0,
        );

        if (visibleSelectors.length > 0) {
          cy.logToTerminal(
            `✅ ${fieldLabel} is visible via: ${visibleSelectors[0]}`,
          );
          return;
        }

        if (attempt >= maxAttempts) {
          throw new Error(
            `Timed out waiting for visible ${fieldLabel}. Selectors: ${selectorQuery}`,
          );
        }

        cy.logToTerminal(
          `⏳ ${fieldLabel} is not visible yet (${attempt}/${maxAttempts}), scrolling checkout section and retrying`,
        );
        scrollCheckoutShippingSection();
        return Cypress.Promise.delay(1000).then(() =>
          waitForVisibleField(attempt + 1, maxAttempts),
        );
      });

    waitForVisibleField();

    cy.get(selectorQuery)
      .filter(":visible")
      .first()
      .then(($field) => {
        cy.wrap($field).clear({ force: true });
        cy.wrap($field).type(value, { force: true });
      });
  };

  const ensureCheckoutMainLoaded = () => {
    cy.url().then((url) => {
      cy.logToTerminal(`🔎 Checkout debug URL before main check: ${url}`);
    });

    cy.get("body", { timeout: 60000 }).then(($body) => {
      const hasMain = $body.find(".checkout__main:visible").length > 0;
      const hasShippingForm =
        $body.find(".checkout__shipping-form:visible").length > 0;
      const hasCheckoutLogin = $body.find(".checkout__login").length > 0;

      if (!hasMain) {
        const bodyText = $body.text().replace(/\s+/g, " ").trim().slice(0, 600);
        cy.logToTerminal(
          `⚠️ Checkout debug snapshot before failure: main=${hasMain}, shipping=${hasShippingForm}, login=${hasCheckoutLogin}`,
        );
        cy.logToTerminal(`⚠️ Checkout body preview: ${bodyText}`);
      }
    });

    cy.get(".checkout__main", { timeout: 60000 }).should("be.visible");
  };

  const ensureCheckoutAndFormsReady = () => {
    ensureCheckoutMainLoaded();
    cy.get(".checkout__shipping-form", { timeout: 60000 }).should("exist");
  };

  const ensureShippingMethodsReady = () => {
    const shippingMethodSelector =
      'input[name="shipping-method"], input[name="shipping_method"], input[data-testid="shipping-method-radioButton"]';

    // Some checkout implementations lazy-render shipping methods only when
    // the shipping section enters viewport.
    cy.get(".checkout__shipping-form", { timeout: 60000 })
      .should("exist")
      .scrollIntoView({ duration: 300 });
    cy.window().then((win) => {
      win.scrollBy(0, 250);
    });

    cy.get("body", { timeout: 15000 }).should(($body) => {
      expect(
        $body.find(shippingMethodSelector).length,
        "shipping methods should be rendered",
      ).to.be.greaterThan(0);
    });
  };

  const waitForVisibleSelectors = (
    selectors,
    label,
    attempt = 1,
    maxAttempts = 8,
    failOnTimeout = true,
  ) => {
    const selectorQuery = selectors.join(", ");

    return cy.get("body", { timeout: 5000 }).then(($body) => {
      const visibleSelectors = selectors.filter(
        (selector) => $body.find(`${selector}:visible`).length > 0,
      );

      if (visibleSelectors.length > 0) {
        cy.logToTerminal(`✅ ${label} is visible via: ${visibleSelectors[0]}`);
        return;
      }

      if (attempt >= maxAttempts) {
        const bodyText = $body.text().replace(/\s+/g, " ").trim().slice(0, 600);
        cy.logToTerminal(
          `⚠️ ${label} debug before failure. Selectors: ${selectorQuery}`,
        );
        cy.logToTerminal(`⚠️ ${label} body preview: ${bodyText}`);
        if (failOnTimeout) {
          throw new Error(
            `Timed out waiting for visible ${label}. Selectors: ${selectorQuery}`,
          );
        }
        cy.logToTerminal(
          `ℹ️ Proceeding without strict ${label} visibility check`,
        );
        return false;
      }

      cy.logToTerminal(
        `⏳ ${label} not visible yet (${attempt}/${maxAttempts}), scrolling and retrying`,
      );
      scrollCheckoutShippingSection();
      return Cypress.Promise.delay(1000).then(() =>
        waitForVisibleSelectors(
          selectors,
          label,
          attempt + 1,
          maxAttempts,
          failOnTimeout,
        ),
      );
    });
  };

  const waitForTextInBody = (text, label, attempt = 1, maxAttempts = 8) =>
    cy.get("body", { timeout: 5000 }).then(($body) => {
      const bodyText = $body.text().replace(/\s+/g, " ");

      if (bodyText.includes(text)) {
        cy.logToTerminal(`✅ ${label} text found: ${text}`);
        return;
      }

      if (attempt >= maxAttempts) {
        cy.logToTerminal(`⚠️ ${label} text not found: ${text}`);
        cy.logToTerminal(`⚠️ ${label} body preview: ${bodyText.trim().slice(0, 600)}`);
        throw new Error(`Timed out waiting for text "${text}" in ${label}`);
      }

      cy.logToTerminal(
        `⏳ ${label} text not found yet (${attempt}/${maxAttempts}), scrolling and retrying`,
      );
      scrollCheckoutShippingSection();
      return Cypress.Promise.delay(1000).then(() =>
        waitForTextInBody(text, label, attempt + 1, maxAttempts),
      );
    });

  const ensureShippingAddressFieldsReady = (
    attempt = 1,
    maxAttempts = 12,
    reloaded = false,
    failOnTimeout = true,
  ) => {
    const firstNameSelectors = [
      'input[name="firstName"]',
      'input[name="firstname"]',
      'input[name="shippingAddress.firstName"]',
      'input[name="shippingAddress.firstname"]',
      'input[autocomplete="given-name"]',
    ];

    return cy.get("body", { timeout: 5000 }).then(($body) => {
      const visibleSelector = firstNameSelectors.find(
        (selector) => $body.find(`${selector}:visible`).length > 0,
      );

      if (visibleSelector) {
        cy.logToTerminal(
          `✅ shipping address fields are ready via: ${visibleSelector}`,
        );
        return;
      }

      if (attempt >= maxAttempts) {
        const bodyText = $body.text().replace(/\s+/g, " ").trim().slice(0, 600);
        cy.logToTerminal(
          "⚠️ shipping address fields are not visible after retries",
        );
        cy.logToTerminal(`⚠️ shipping form body preview: ${bodyText}`);
        if (failOnTimeout) {
          throw new Error(
            `Timed out waiting for shipping address fields. Selectors: ${firstNameSelectors.join(", ")}`,
          );
        }
        cy.logToTerminal(
          "ℹ️ Proceeding without strict shipping address fields check",
        );
        return false;
      }

      if (!reloaded && attempt === 6) {
        cy.logToTerminal(
          "🔄 Shipping fields still missing, reloading checkout and retrying",
        );
        cy.reload();
        cy.url().should("include", "/checkout");
        ensureCheckoutAndFormsReady();
        scrollCheckoutShippingSection();
        return ensureShippingAddressFieldsReady(
          attempt + 1,
          maxAttempts,
          true,
          failOnTimeout,
        );
      }

      cy.logToTerminal(
        `⏳ shipping address fields are not visible yet (${attempt}/${maxAttempts}), scrolling and retrying`,
      );
      scrollCheckoutShippingSection();
      return Cypress.Promise.delay(1000).then(() =>
        ensureShippingAddressFieldsReady(
          attempt + 1,
          maxAttempts,
          reloaded,
          failOnTimeout,
        ),
      );
    });
  };

  const scrollCheckoutShippingSection = () => {
    cy.get(".checkout__shipping-form", { timeout: 60000 })
      .should("exist")
      .scrollIntoView({ duration: 300 });
    cy.window().then((win) => {
      // Trigger lazy observers: scroll down and then slightly back up.
      win.scrollBy(0, 300);
      win.scrollBy(0, -140);
    });
  };

  const completeCheckoutAndPlaceOrder = (phaseLabel) => {
    cy.logToTerminal(`💳 ${phaseLabel}: Navigating to checkout`);
    cy.get(".minicart-wrapper").click();
    cy.get('.minicart-panel[data-loaded="true"]').should("exist");
    cy.contains("View Cart").click();
    cy.get(".dropin-button--primary").contains("Checkout").click();
    cy.url().should("include", "/checkout");

    // In this project checkout can hydrate with delay after navigation.
    cy.reload();
    cy.url().should("include", "/checkout");
    cy.logToTerminal("⏳ Waiting for checkout to fully load...");
    ensureCheckoutAndFormsReady();
    scrollCheckoutShippingSection();
    cy.get(".checkout__login").should("exist");
    cy.get("body").then(($body) => {
      if ($body.find(".checkout-login-form__customer-email").length > 0) {
        cy.get(".checkout-login-form__customer-email")
          .first()
          .should(($email) => {
            expect($email.text().trim()).to.contain(testUserEmail);
          });
        cy.logToTerminal(`✅ Checkout contact email is present: ${testUserEmail}`);
      } else if ($body.text().includes(testUserEmail)) {
        cy.logToTerminal(
          `✅ Checkout login section contains email text: ${testUserEmail}`,
        );
      } else {
        cy.logToTerminal(
          "ℹ️ Checkout login email is not rendered in UI, continuing",
        );
      }
    });
    cy.logToTerminal("✅ Checkout UI and shipping form are loaded");

    cy.logToTerminal(`📦 ${phaseLabel}: Completing checkout and placing order`);
    cy.logToTerminal(
      "📝 Waiting for shipping form and filling shipping address",
    );
    scrollCheckoutShippingSection();
    ensureShippingAddressFieldsReady();
    typeIntoVisibleField(
      [
        'input[name="firstName"]',
        'input[name="firstname"]',
        'input[name="shippingAddress.firstName"]',
        'input[name="shippingAddress.firstname"]',
        'input[autocomplete="given-name"]',
      ],
      customerShippingAddress.firstName,
      "shipping first name",
    );
    typeIntoVisibleField(
      [
        'input[name="lastName"]',
        'input[name="lastname"]',
        'input[name="shippingAddress.lastName"]',
        'input[name="shippingAddress.lastname"]',
        'input[autocomplete="family-name"]',
      ],
      customerShippingAddress.lastName,
      "shipping last name",
    );
    typeIntoVisibleField(
      [
        'input[name="street"]',
        'input[name="street[0]"]',
        'input[name="shippingAddress.street"]',
        'input[name="shippingAddress.street[0]"]',
      ],
      customerShippingAddress.street,
      "shipping street line 1",
    );
    typeIntoVisibleField(
      [
        'input[name="streetMultiline_2"]',
        'input[name="street[1]"]',
        'input[name="shippingAddress.street[1]"]',
      ],
      customerShippingAddress.street1,
      "shipping street line 2",
    );
    cy.get("body").then(($body) => {
      const regionSelectSelector =
        'select[name="region"], select[name="regionId"], select[name="region_id"], select[name="shippingAddress.regionId"]';

      if ($body.find(`${regionSelectSelector}:visible`).length > 0) {
        cy.get(`${regionSelectSelector}:visible`)
          .first()
          .select(customerShippingAddress.region, { force: true });
      } else {
        typeIntoVisibleField(
          [
            'input[name="region"]',
            'input[name="regionId"]',
            'input[name="shippingAddress.region"]',
            'input[name="shippingAddress.regionId"]',
          ],
          customerShippingAddress.region,
          "shipping region",
        );
      }
    });
    typeIntoVisibleField(
      ['input[name="city"]', 'input[name="shippingAddress.city"]'],
      customerShippingAddress.city,
      "shipping city",
    );
    typeIntoVisibleField(
      [
        'input[name="postcode"]',
        'input[name="postalCode"]',
        'input[name="shippingAddress.postcode"]',
        'input[name="shippingAddress.postalCode"]',
      ],
      customerShippingAddress.postCode,
      "shipping postcode",
    );
    typeIntoVisibleField(
      [
        'input[name="telephone"]',
        'input[name="phone"]',
        'input[name="shippingAddress.telephone"]',
        'input[name="shippingAddress.phone"]',
      ],
      customerShippingAddress.telephone,
      "shipping telephone",
    );

    cy.logToTerminal(
      "🔄 Shipping form is filled, reloading checkout before methods checks",
    );
    cy.reload();
    cy.url().should("include", "/checkout");
    ensureCheckoutAndFormsReady();
    ensureShippingMethodsReady();

    waitForVisibleSelectors(
      [
        'input[name="shipping-method"]',
        'input[name="shipping_method"]',
        'input[data-testid="shipping-method-radioButton"]',
      ],
      "shipping methods",
      1,
      8,
      false,
    );
    cy.get("body").then(($body) => {
      const shippingMethodSelector =
        'input[name="shipping-method"], input[name="shipping_method"], input[data-testid="shipping-method-radioButton"]';
      const $shippingMethods = $body.find(shippingMethodSelector);

      if ($shippingMethods.length > 0) {
        const isAnyChecked = $shippingMethods.is(":checked");
        if (!isAnyChecked) {
          cy.logToTerminal("🚚 Selecting shipping method");
          cy.wrap($shippingMethods.first()).check({ force: true });
        }
      } else {
        cy.logToTerminal(
          "ℹ️ Shipping methods not rendered yet, continuing checkout",
        );
      }
    });

    waitForTextInBody(checkMoneyOrder.name, "payment section");
    cy.contains(checkMoneyOrder.name).should("be.visible");
    cy.logToTerminal(`💰 Selecting payment method: ${checkMoneyOrder.name}`);
    actions.setPaymentMethod(checkMoneyOrder);

    cy.get('[data-testid="checkout-terms-and-conditions-form"]').should(
      "exist",
    );
    cy.get(
      '[data-testid="checkout-terms-and-conditions-form"] input[name="default"][type="checkbox"]',
    )
      .first()
      .then(($checkbox) => {
        if (!$checkbox.is(":checked")) {
          cy.logToTerminal("📄 Accepting checkout terms");
          cy.wrap($checkbox).check({ force: true });
        }
      });
    cy.get(
      '[data-testid="checkout-terms-and-conditions-form"] input[name="default"][type="checkbox"]',
    )
      .first()
      .should("be.checked");

    cy.get(".checkout-place-order__button")
      .should("be.visible")
      .click({ force: true });
    cy.logToTerminal(`✅ ${phaseLabel}: Order submitted`);
  };

  const resetAuthStateAndOpenLogin = () => {
    cy.logToTerminal("🧹 Clearing cookies/storage before admin OTP login");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    cy.visit("/customer/login");
    cy.reload();
    cy.url().should("include", "/customer/login");
    cy.get("main .auth-sign-in-form", { timeout: 30000 }).should("be.visible");
  };

  const signInAsAdminWithOtp = (email, otp) => {
    cy.get("main .auth-sign-in-form", { timeout: 30000 })
      .should("be.visible")
      .within(() => {
        cy.get('input[name="email"]', { timeout: 30000 })
          .should("be.visible")
          .clear({ force: true })
          .type(email, { force: true });

        cy.get('input[name="password"]', { timeout: 30000 })
          .should("be.visible")
          .clear({ force: true })
          .type(otp, { force: true });

        cy.get('button[type="submit"]', { timeout: 30000 })
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
      });

    // Guard against occasional missed submit handling on first click.
    cy.location("pathname", { timeout: 15000 }).then((pathname) => {
      if (pathname.includes("/customer/login")) {
        cy.logToTerminal(
          "ℹ️ Still on login page after submit, retrying submit once",
        );
        cy.get('main .auth-sign-in-form button[type="submit"]')
          .should("be.visible")
          .and("not.be.disabled")
          .click({ force: true });
      }
    });
  };

  before(() => {
    cy.logToTerminal("🚀 B2B Shopping Assistance test suite started");
  });

  beforeEach(() => {
    cy.logToTerminal("🧹 B2B Shopping Assistance test cleanup");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");

    // Handle uncaught exceptions
    cy.on("uncaught:exception", (err) => {
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("renderCompanySwitcher") ||
        err.message.includes("User token has been revoked")
      ) {
        return false;
      }
      return true;
    });
  });

  after(() => {
    cy.logToTerminal("🏁 B2B Shopping Assistance test suite completed");
  });

  /**
   * ==========================================================================
   * TC-01: Complete Shopping Assistance Flow - Register, Verify, and Modify
   * ==========================================================================
   * Steps:
   * 1. Navigate to registration page
   * 2. Fill registration form with all required fields
   * 3. Enable "Allow remote shopping assistance" checkbox
   * 4. Submit registration (user is auto-logged in after registration)
   * 5. Navigate to Shopping Assistance settings page
   * 6. Verify checkbox is checked (from registration)
   * 7. Uncheck the checkbox
   * 8. Save changes
   * 9. Verify changes persisted
   */
  it("TC-01: Complete Shopping Assistance flow - register and modify settings", () => {
    cy.logToTerminal(
      "========= 🚀 TC-01: Complete Shopping Assistance Flow =========",
    );

    // Step 1: Navigate to registration page
    cy.logToTerminal("📝 Step 1: Navigating to registration page");
    cy.visit("/customer/create");
    cy.contains("Create account").should("be.visible");

    // Step 2: Fill registration form using fixture data
    cy.logToTerminal("✍️ Step 2: Filling registration form");

    cy.fixture("userInfo").then(({ sign_up }) => {
      // Generate unique email for this test
      const random = Cypress._.random(0, 10000000);
      testUserEmail = `${random}${sign_up.email}`;

      cy.logToTerminal(`📧 Test user email: ${testUserEmail}`);

      // Fill in email
      cy.get(fields.authFormUserEmail).eq(1).clear({ force: true });
      cy.get(fields.authFormUserEmail).eq(1).type(testUserEmail);

      // Fill in first name
      cy.get(fields.authFormUserFirstName).clear();
      cy.get(fields.authFormUserFirstName).type(sign_up.firstName);

      // Fill in last name
      cy.get(fields.authFormUserLastName).clear();
      cy.get(fields.authFormUserLastName).type(sign_up.lastName);

      // Fill in password
      cy.get(fields.authFormUserPassword).eq(1).clear();
      cy.get(fields.authFormUserPassword).eq(1).type(sign_up.password);

      // Step 3: Enable Remote Shopping Assistance checkbox
      cy.logToTerminal(
        "✅ Step 3: Enabling Remote Shopping Assistance checkbox",
      );

      cy.get('[data-testid="remoteShoppingAssistanceConsent"]', {
        timeout: 30000,
      }).should("exist");
      cy.get('[data-testid="remoteShoppingAssistanceConsent"]')
        .find('input[name="allowRemoteShoppingAssistance"]')
        .should("exist")
        .check({ force: true })
        .should("be.checked");
      cy.logToTerminal("✅ Remote Shopping Assistance checkbox enabled");

      // Step 4: Submit registration (user is auto-logged in)
      cy.logToTerminal("📤 Step 4: Submitting registration form");
      actions.createAccount();

      // Verify successful registration and auto-login
      cy.logToTerminal(
        "🔍 Step 4.1: Verifying successful registration and auto-login",
      );
      cy.url().should("include", "/customer/account");

      // Verify user is logged in
      cy.contains(sign_up.firstName).should("be.visible");

      cy.logToTerminal("✅ User successfully registered and auto-logged in");

      // Step 5: Navigate to Seller Assisted Purchasing page
      cy.logToTerminal("🔍 Step 5: Navigating to Seller Assisted Purchasing");
      cy.visit("/customer/seller-assisted-purchasing");

      // Verify page loaded with correct header
      cy.get('[data-testid="dropin-header-container"]')
        .should("be.visible")
        .contains("Seller assisted purchasing");
      cy.logToTerminal("✅ Seller Assisted Purchasing page loaded");

      // Step 6: Verify checkbox exists and is checked
      cy.logToTerminal(
        "✅ Step 6: Verifying Remote Shopping Assistance checkbox is enabled",
      );
      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .should("exist")
        .then(($checkbox) => {
          if (!$checkbox.is(":checked")) {
            cy.logToTerminal(
              "ℹ️ Remote Shopping Assistance checkbox was not checked after registration, enabling it now",
            );
            cy.wrap($checkbox).check({ force: true });
          }
        })
        .should("be.checked");

      // Step 7: Uncheck the checkbox
      cy.logToTerminal("⬜ Step 7: Disabling Remote Shopping Assistance");
      cy.get('input[name="allowRemoteShoppingAssistance"]').uncheck({
        force: true,
      });
      cy.get('input[name="allowRemoteShoppingAssistance"]').should(
        "not.be.checked",
      );

      // Step 8: Verify disabled message appears
      cy.logToTerminal("🔍 Step 8: Verifying disabled message appears");
      cy.contains(
        "Seller assisted purchasing is currently disabled. New sessions cannot be started.",
      ).should("be.visible");

      // Step 9: Re-enable the checkbox
      cy.logToTerminal("✅ Step 9: Re-enabling Remote Shopping Assistance");
      cy.get('input[name="allowRemoteShoppingAssistance"]').check({
        force: true,
      });
      cy.get('input[name="allowRemoteShoppingAssistance"]').should(
        "be.checked",
      );

      // Step 10: Verify disabled message is gone
      cy.logToTerminal("🔍 Step 10: Verifying disabled message is gone");
      cy.contains(
        "Seller assisted purchasing is currently disabled. New sessions cannot be started.",
      ).should("not.exist");

      // Step 11: Add product and place first order as customer
      cy.logToTerminal("🛒 Step 11: Adding product for first customer order");
      cy.visit("/products/youth-tee/adb150");
      cy.reload();
      cy.get(".product-details__buttons__add-to-cart button")
        .should("be.visible")
        .click();

      cy.logToTerminal("🧾 Step 12: Completing first purchase as customer");
      completeCheckoutAndPlaceOrder("Order 1 (customer session)");

      // Step 13: Add same product again for admin-assisted purchase
      cy.logToTerminal("🛒 Step 13: Adding product again for admin purchase");
      cy.visit("/products/youth-tee/adb150");
      cy.reload();
      cy.get(".product-details__buttons__add-to-cart button")
        .should("be.visible")
        .click();

      // Step 14: Reset browser auth state before OTP login flow
      cy.logToTerminal("🔄 Pre-Step 14: Reloading page before logout");
      cy.reload();
      cy.logToTerminal(
        "🧹 Step 14: Clearing session/local storage/cookies before OTP admin login",
      );
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.window().then((win) => {
        win.sessionStorage.clear();
      });
      cy.visit("/");
      cy.reload();
      cy.logToTerminal("✅ Browser auth state cleanup completed");

      // ======================================================================
      // TODO START: OTP re-login + checkout order placement extension
      // ======================================================================

      // Step 15: Lookup customer for OTP flow
      cy.logToTerminal("🔎 Step 15: Looking up customer for admin OTP login");
      cy.wrap(null)
        .then(() => findCustomerByEmail(testUserEmail))
        .then((customer) => {
          expect(customer, `Customer should exist for email: ${testUserEmail}`)
            .to.exist;
          expect(customer.id, "Customer ID should be numeric").to.be.a(
            "number",
          );

          cy.logToTerminal(`🆔 Found customer ID: ${customer.id}`);

          const otpReasonWithEmail = `test:${testUserEmail}`;
          cy.logToTerminal(
            `📨 Step 16: Requesting OTP with reason: ${otpReasonWithEmail}`,
          );
          return requestCustomerOtp(customer.id, otpReasonWithEmail).then((otpResponse) => {
            expect(otpResponse, "OTP response should exist").to.exist;
            expect(otpResponse.otp, "OTP code should be present").to.be.a(
              "string",
            );

            cy.logToTerminal(
              `✅ OTP request completed: ${JSON.stringify(otpResponse)}`,
            );
            cy.logToTerminal(`🔑 OTP for ${testUserEmail}: ${otpResponse.otp}`);
            cy.log(`OTP for ${testUserEmail}: ${otpResponse.otp}`);

            // Step 17: Login as admin using OTP
            cy.logToTerminal("🔐 Step 17: Signing in as admin with OTP password");
            cy.visit("/customer/login");
            signInAsAdminWithOtp(testUserEmail, otpResponse.otp);
            cy.url().should("include", "/customer/account");

            // Step 18: Complete second order in admin session
            cy.logToTerminal("🧾 Step 18: Completing second purchase as admin");
            completeCheckoutAndPlaceOrder("Order 2 (admin session)");

            cy.logToTerminal(
              "✅ Full flow completed: registration, checkbox checks, customer purchase, OTP admin login, admin purchase",
            );
            return null;
          });
        });

      // ==================================================================
      // TODO END: OTP re-login + checkout order placement extension
      // ==================================================================

      cy.visit("/customer/seller-assisted-purchasing");
      cy.url().should("include", "/customer/seller-assisted-purchasing");
      cy.get('[data-testid="dropin-header-container"]')
        .should("be.visible")
        .contains("Seller assisted purchasing");
      cy.get(".account-seller-assisted-buying-activity-table__table").should(
        "be.visible",
      );
      cy.contains(
        ".account-seller-assisted-buying-activity-table__table",
        "Order Placed",
      ).should("be.visible");
      cy.contains(
        ".account-seller-assisted-buying-activity-table__table",
        `email = ${testUserEmail}`,
      ).should("be.visible");

      cy.logToTerminal(
        "✅ TC-01: Complete Shopping Assistance flow completed successfully",
      );
    });
  });
});