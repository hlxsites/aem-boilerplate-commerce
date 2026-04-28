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

import * as fields from '../../fields';
import * as actions from '../../actions';
import { findCustomerByEmail } from '../../support/b2bCompanyAPICalls';

describe('B2B Shopping Assistance', { tags: ['@B2BSaas'] }, () => {
  let testUserEmail;
  let testUserPassword;

  before(() => {
    cy.logToTerminal('🚀 B2B Shopping Assistance test suite started');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 B2B Shopping Assistance test cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');

    // Handle uncaught exceptions
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to fetch') || 
          err.message.includes('renderCompanySwitcher')) {
        return false;
      }
      return true;
    });
  });

  after(() => {
    cy.logToTerminal('🏁 B2B Shopping Assistance test suite completed');
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
  it('TC-01: Complete Shopping Assistance flow - register and modify settings', () => {
    cy.logToTerminal('========= 🚀 TC-01: Complete Shopping Assistance Flow =========');

    // Step 1: Navigate to registration page
    cy.logToTerminal('📝 Step 1: Navigating to registration page');
    cy.visit('/customer/create');
    cy.contains('Create account').should('be.visible');

    // Step 2: Fill registration form using fixture data
    cy.logToTerminal('✍️ Step 2: Filling registration form');
    
    cy.fixture('userInfo').then(({ sign_up }) => {
      // Generate unique email for this test
      const random = Cypress._.random(0, 10000000);
      testUserEmail = `${random}${sign_up.email}`;
      testUserPassword = sign_up.password;
      
      cy.logToTerminal(`📧 Test user email: ${testUserEmail}`);

      // Fill in email
      cy.get(fields.authFormUserEmail)
        .eq(1)
        .clear({ force: true });
      cy.get(fields.authFormUserEmail)
        .eq(1)
        .type(testUserEmail);
      
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
      cy.logToTerminal('✅ Step 3: Enabling Remote Shopping Assistance checkbox');
      
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="remoteShoppingAssistanceConsent"]').length > 0) {
          cy.logToTerminal('Found Remote Shopping Assistance consent section');
          
          // Find and check the checkbox
          cy.get('[data-testid="remoteShoppingAssistanceConsent"]')
            .find('input[name="allowRemoteShoppingAssistance"]')
            .check({ force: true });
          
          // Verify checkbox is checked
          cy.get('[data-testid="remoteShoppingAssistanceConsent"]')
            .find('input[name="allowRemoteShoppingAssistance"]')
            .should('be.checked');
          
          cy.logToTerminal('✅ Remote Shopping Assistance checkbox enabled');
        } else {
          cy.logToTerminal('⚠️ Remote Shopping Assistance checkbox not found, proceeding without it');
        }
      });

      // Step 4: Submit registration (user is auto-logged in)
      cy.logToTerminal('📤 Step 4: Submitting registration form');
      actions.createAccount();
      
      // Verify successful registration and auto-login
      cy.logToTerminal('🔍 Step 4.1: Verifying successful registration and auto-login');
      cy.url().should('include', '/customer/account');
      
      // Verify user is logged in
      cy.contains(sign_up.firstName).should('be.visible');
      
      cy.logToTerminal('✅ User successfully registered and auto-logged in');

      // Step 5: Navigate to Seller Assisted Purchasing page
      cy.logToTerminal('🔍 Step 5: Navigating to Seller Assisted Purchasing');
      cy.visit('/customer/seller-assisted-purchasing');
      
      // Verify page loaded with correct header
      cy.get('[data-testid="dropin-header-container"]')
        .should('be.visible')
        .contains('Seller assisted purchasing');
      cy.logToTerminal('✅ Seller Assisted Purchasing page loaded');

      // Step 6: Verify checkbox exists and is checked
      cy.logToTerminal('✅ Step 6: Verifying Remote Shopping Assistance checkbox is enabled');
      
      cy.get('[data-testid="sellerAssistedPurchasingId"]')
        .should('be.visible');
      
      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .should('exist')
        .should('be.checked');
      
      cy.logToTerminal('✅ Remote Shopping Assistance checkbox is checked (as expected from registration)');

      // Step 7: Uncheck the checkbox
      cy.logToTerminal('⬜ Step 7: Disabling Remote Shopping Assistance');
      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .uncheck({ force: true });

      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .should('not.be.checked');
      
      cy.logToTerminal('✅ Checkbox unchecked');

      // Step 8: Verify disabled message appears
      cy.logToTerminal('🔍 Step 8: Verifying disabled message appears');
      cy.contains('Seller assisted purchasing is currently disabled. New sessions cannot be started.')
        .should('be.visible');
      
      cy.logToTerminal('✅ Disabled message is visible');

      // Step 9: Re-enable the checkbox
      cy.logToTerminal('✅ Step 9: Re-enabling Remote Shopping Assistance');
      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .check({ force: true });

      cy.get('input[name="allowRemoteShoppingAssistance"]')
        .should('be.checked');
      
      cy.logToTerminal('✅ Checkbox re-checked');

      // Step 10: Verify disabled message is gone
      cy.logToTerminal('🔍 Step 10: Verifying disabled message is gone');
      cy.contains('Seller assisted purchasing is currently disabled. New sessions cannot be started.')
        .should('not.exist');
      
      cy.logToTerminal('✅ Disabled message is not visible');

      cy.logToTerminal('✅ TC-01: Complete Shopping Assistance flow completed successfully');
    });
  });
});
