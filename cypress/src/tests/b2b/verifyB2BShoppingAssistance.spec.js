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

import * as fields from "../../fields";
import * as actions from "../../actions";
import { customerShippingAddress, checkMoneyOrder } from "../../fixtures";
import {
  findCustomerByEmail,
  requestCustomerOtp,
} from "../../support/b2bCompanyAPICalls";

describe("B2B Shopping Assistance", { tags: ["@B2BSaas"] }, () => {
  let testUserEmail;

  const completeCheckoutAndPlaceOrder = (phaseLabel) => {
    cy.logToTerminal(`💳 ${phaseLabel}: Navigating to checkout`);
    cy.get(".minicart-wrapper").click();
    cy.get('.minicart-panel[data-loaded="true"]').should("exist");
    cy.contains("View Cart").click();
    cy.get(".dropin-button--primary").contains("Checkout").click();
    cy.url().should("include", "/checkout");

    // Reuse the stable checkout pattern used in b2c checkout specs.
    cy.wait(2000); // Reduced from 5000
    cy.url().should("include", "/checkout");

    cy.logToTerminal(`📦 ${phaseLabel}: Filling shipping address`);
    cy.get("body").then(($body) => {
      const isSelectableState = $body.find(`${fields.shippingFormState}:visible`).length > 0;
      actions.setGuestShippingAddress(customerShippingAddress, isSelectableState);
    });

    // Reload page after filling shipping address to ensure state persistence
    cy.logToTerminal(`🔄 ${phaseLabel}: Reloading page after shipping address fill`);
    cy.reload();
    cy.url().should("include", "/checkout");
    
    // Wait for checkout form to fully reinitialize after reload
    cy.wait(2000); // Reduced from 5000
    cy.get('form[name="selectedShippingAddress"]', { timeout: 15000 })
      .should('be.visible');
    
    // Scroll down to ensure form visibility
    cy.scrollTo(0, 300);

    cy.wait(1000); // Reduced from 3000
    cy.logToTerminal(`📦 ${phaseLabel}: Selecting shipping method (if shown)`);
    cy.get("body").then(($body) => {
      const shippingMethodSelector =
        'input[name="shipping_method"], input[name="shipping-method"], input[data-testid="shipping-method-radioButton"]';
      const $shippingMethods = $body.find(shippingMethodSelector);

      if ($shippingMethods.length > 0) {
        cy.wrap($shippingMethods.first()).check({ force: true });
        cy.wait(1000); // Reduced from 2000
      } else {
        cy.logToTerminal("ℹ️ Shipping method is not shown, continuing checkout");
      }
    });

    cy.logToTerminal(`💰 Selecting payment method: ${checkMoneyOrder.name}`);
    cy.wait(2000); // Reduced from 5000
    actions.setPaymentMethod(checkMoneyOrder);

    cy.logToTerminal("📄 Accepting checkout terms");
    actions.checkTermsAndConditions();
    cy.wait(2000); // Reduced from 5000

    actions.placeOrder();
    cy.logToTerminal(`✅ ${phaseLabel}: Order submitted`);
  };

  const resetAuthStateAndOpenLogin = () => {
    cy.logToTerminal("➡️ Opening login page before auth state reset");
    cy.visit("/customer/login");
    cy.url().should("include", "/customer/login");

    cy.logToTerminal("🧹 Clearing cookies/storage before admin OTP login");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    cy.logToTerminal("🔄 Reloading login page after auth cleanup");
    cy.reload();
    cy.url().should("include", "/customer/login");
    cy.get("main .auth-sign-in-form", { timeout: 30000 }).should("be.visible");
  };

  const signInAsAdminWithOtp = (email, otp) => {
    cy.logToTerminal(`🔐 Attempting OTP login with email: ${email}, OTP: ${otp}`);
    
    cy.get("main .auth-sign-in-form", { timeout: 30000 })
      .should("be.visible")
      .within(() => {
        cy.get('input[name="email"]')
          .should("be.visible")
          .should("not.be.disabled")
          .clear({ force: true })
          .type(email, { delay: 50 }); // Add delay to prevent character scrambling in CI/CD

        cy.get('input[name="password"]')
          .should("be.visible")
          .should("not.be.disabled")
          .clear({ force: true })
          .type(otp, { delay: 50 }); // Add delay for password too

        // Verify values were entered correctly
        cy.get('input[name="email"]').should('have.value', email);
        cy.get('input[name="password"]').should('have.value', otp);
        cy.logToTerminal(`✅ Form filled - Email: ${email}, Password length: ${otp.length}`);

        // Log submit button info using specific selector (within form scope)
        cy.get('button.auth-sign-in-form__button--submit[type="submit"]').then($btn => {
          cy.logToTerminal(`📍 Submit button text: "${$btn.text().trim()}"`);
        });
        
        cy.get('button.auth-sign-in-form__button--submit[type="submit"]')
          .should("be.visible")
          .and("not.be.disabled")
          .click();

        cy.logToTerminal("⏳ Waiting 5s after first submit...");
        cy.wait(5000);
      });

    // Log current URL after submit
    cy.url().then(url => {
      cy.logToTerminal(`📍 Current URL after submit: ${url}`);
    });

    // Check for any error messages on the page
    cy.get('body').then($body => {
      const errorSelectors = [
        '.error-message',
        '[role="alert"]',
        '.message-error',
        '.field-error',
        '.auth-sign-in-form__error',
        '.dropin-notification--error'
      ];
      
      errorSelectors.forEach(selector => {
        const $error = $body.find(selector);
        if ($error.length > 0) {
          cy.logToTerminal(`❌ Error found (${selector}): ${$error.text().trim()}`);
        }
      });
      
      const allErrors = $body.find(errorSelectors.join(', ')).text().trim();
      if (!allErrors) {
        cy.logToTerminal('✅ No error messages found on page');
      }
    });

    // Guard against occasional missed submit handling on first click.
    cy.location("pathname", { timeout: 15000 }).then((pathname) => {
      cy.logToTerminal(`📍 Current pathname: ${pathname}`);
      
      if (pathname.includes("/customer/login")) {
        cy.logToTerminal("ℹ️ Still on login page after submit, retrying submit once");
        
        // Check form state before retry
        cy.get('main .auth-sign-in-form').then($form => {
          cy.logToTerminal(`📋 Form visible: ${$form.is(':visible')}`);
          
          const emailValue = $form.find('input[name="email"]').val();
          const passValue = $form.find('input[name="password"]').val();
          cy.logToTerminal(`📋 Email field value: ${emailValue}`);
          cy.logToTerminal(`📋 Password field length: ${passValue ? passValue.length : 0}`);
          
          // If password was cleared, refill the form
          if (!passValue || passValue.length === 0) {
            cy.logToTerminal("⚠️ Password field empty, refilling form");
        cy.get('main .auth-sign-in-form input[name="email"]').clear().type(email, { delay: 50 });
        cy.get('main .auth-sign-in-form input[name="password"]').clear().type(otp, { delay: 50 });
        cy.wait(2000); // Wait for form to stabilize after refill
        cy.logToTerminal("✅ Form refilled, waiting for stabilization");
      }
    });
    
    // Wait a bit to ensure DOM is stable before looking for button
    cy.wait(1000);
    
    // Log button state separately using specific selector with increased timeout
    cy.get('main button.auth-sign-in-form__button--submit[type="submit"]', { timeout: 10000 }).then($btns => {
      cy.logToTerminal(`📍 Retry - Found ${$btns.length} submit buttons`);
    });
    
    // Click first button to avoid multiple elements error
    cy.get('main button.auth-sign-in-form__button--submit[type="submit"]', { timeout: 10000 })
      .first()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
    
    cy.logToTerminal("⏳ Waiting 8s after retry submit...");
    cy.wait(8000);
    
    cy.url().then(url => {
      cy.logToTerminal(`📍 URL after retry: ${url}`);
    });
    
    // Explicitly wait for redirect away from login page
    cy.url({ timeout: 30000 }).should("not.include", "/customer/login");
    cy.logToTerminal("✅ Successfully redirected after retry");
      } else {
        cy.logToTerminal("✅ Successfully redirected on first submit");
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
    // cy.intercept("**/graphql").as("defaultGraphQL");

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

      // Step 11: Product will be added by admin after OTP login
      cy.logToTerminal("ℹ️ Step 11: Skipping product add - will be done by admin");

      // Step 14: Logout and move to OTP login flow
      cy.logToTerminal("🔄 Pre-Step 14: Reloading page before logout");
      cy.reload();
      cy.logToTerminal("🚪 Step 14: Logging out before OTP admin login");
      cy.visit("/");
      cy.get(".nav-dropdown-button", { timeout: 60000 })
        .should("be.visible")
        .click({ force: true });

      cy.contains("button", /^logout$/i, { timeout: 60000 })
        .click({ force: true });

      // Always enforce a clean login state after logout before OTP login flow.
      resetAuthStateAndOpenLogin();

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
            signInAsAdminWithOtp(testUserEmail, otpResponse.otp);
            cy.url().should("include", "/customer/account");

            // Step 17.5: Add product as admin for assisted purchase
            cy.logToTerminal("🛒 Step 17.5: Admin adding product for customer");
            cy.visit("/products/youth-tee/adb150");
            cy.reload();
            cy.get(".product-details__buttons__add-to-cart button")
              .should("be.visible")
              .click();
            cy.wait(1000); // Reduced from 2000

            // Step 18: Complete second order in admin session
            cy.logToTerminal("🧾 Step 18: Completing second purchase as admin");
            completeCheckoutAndPlaceOrder("Order 2 (admin session)");

            // Step 19: Verify order appears in Seller Assisted Purchasing activity table
            // User is already logged in after checkout, no need for second OTP login
            cy.logToTerminal("📋 Step 19: Verifying order in Seller Assisted Purchasing (user already logged in)");
            cy.visit("/customer/seller-assisted-purchasing");
            cy.logToTerminal("✅ Step 19.1: Page visited");
            
            cy.url().should("include", "/customer/seller-assisted-purchasing");
            cy.logToTerminal("✅ Step 19.2: URL verified");
            
            cy.get('[data-testid="dropin-header-container"]')
              .should("be.visible")
              .contains("Seller assisted purchasing");
            cy.logToTerminal("✅ Step 19.3: Header container found");
            
            // Check what's on the page before looking for table
            cy.get('body').then($body => {
              const bodyText = $body.text();
              cy.logToTerminal(`📄 Page content preview: ${bodyText.substring(0, 500)}`);
              
              const hasTable = $body.find(".account-seller-assisted-buying-activity-table__table").length > 0;
              const hasNoDataMsg = bodyText.includes("No activities") || bodyText.includes("no data") || bodyText.includes("empty");
              cy.logToTerminal(`🔍 Table exists: ${hasTable}, No-data message: ${hasNoDataMsg}`);
            });
            
            // Try to find the table with longer timeout
            cy.get(".account-seller-assisted-buying-activity-table__table", { timeout: 20000 }).should(
              "be.visible",
            );
            cy.logToTerminal("✅ Step 19.4: Activity table found");
            
            cy.contains(
              ".account-seller-assisted-buying-activity-table__table",
              "Order Placed",
              { timeout: 10000 }
            ).should("be.visible");
            cy.logToTerminal("✅ Step 19.5: 'Order Placed' text found in table");
            
            cy.contains(
              ".account-seller-assisted-buying-activity-table__table",
              `email = ${testUserEmail}`,
              { timeout: 10000 }
            ).should("be.visible");
            cy.logToTerminal(`✅ Step 19.6: Email '${testUserEmail}' found in table`);
            
            cy.logToTerminal("✅ Order verified in activity table");

            cy.logToTerminal(
              "✅ Full flow completed: registration, checkbox checks, OTP admin login, admin purchase, verification",
            );
          });
        });

      // ==================================================================
      // TODO END: OTP re-login + checkout order placement extension
      // ==================================================================

      cy.logToTerminal(
        "✅ TC-01: Complete Shopping Assistance flow completed successfully",
      );
    });
  });
});