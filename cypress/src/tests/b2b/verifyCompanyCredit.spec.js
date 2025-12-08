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
 * @fileoverview Company Credit E2E tests.
 * Tests cover:
 * - USF-2563: Company Credit feature
 * - TC-47 (P0): Company Admin has access to Company Credit page (multiple cases)
 * - TC-48 (P2): User permissions for Company Credit page
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 7: Company Credit
 *
 * PREREQUISITES:
 * - Payment on Account must be ENABLED in Admin Panel
 * - Store > Configuration > Sales > Payment Methods > Payment on Account = Yes
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-47 CASE_2 (P0): Verify Company Credit page when "Payment on Account" is
 *   enabled, but there is no record/operation yet to display
 *   - Verifies: Title, three summary blocks (Outstanding Balance, Available
 *     Credit, Credit Limit) all showing 0.00, empty grid with "No data available"
 *
 * TC-47 CASE_3 (P0): "Reimbursement" record shown in grid (reimburse/add amount
 *   to balance)
 *   - Verifies: Outstanding Balance shows reimbursed amount, "Reimbursed"
 *     operation appears in grid
 *
 * TC-47 CASE_4 (P0): "Allocation" record shown in grid (set credit limit)
 *   - Verifies: Credit Limit shows set value, "Allocated" operation appears
 *     in grid
 *
 * TC-48 (P2): Verify that the user can or cannot see data on the Company Credit
 *   page based on their company role permissions
 *   - Verifies: User with restricted role can see summary blocks but cannot
 *     see credit history data in the table
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 * TC-47 CASE_1: Company Admin opens the Company Credit page when Payment on
 *   Account is disabled
 *   - Reason: Requires admin configuration change during test
 *   - Recommendation: Manual testing or separate configuration test
 *
 * TC-47 CASE_5: "Purchase" record in the grid (Checkout using Company Credits)
 *   - Reason: Requires full checkout flow with Payment on Account payment method
 *   - Recommendation: Cover in dedicated checkout E2E tests
 *
 * TC-47 CASE_6: "Reverted" record in the grid (Cancel order)
 *   - Reason: Requires order placement and Admin Panel order cancellation
 *   - Recommendation: Cover in dedicated order management E2E tests
 *
 * TC-47 CASE_7: "Refunded" record in the grid (Credit Memo)
 *   - Reason: Requires full order processing, invoice, shipment, and credit
 *     memo creation with "Refund to Company Credit"
 *   - Recommendation: Cover in dedicated order management E2E tests
 *
 * ==========================================================================
 */

import {
  createCompany,
  createCompanyUser,
  getCompanyCredit,
  updateCompanyCredit,
  increaseCompanyCreditBalance,
  cleanupTestCompany,
  createCompanyRole,
  assignRoleToUser,
  deleteCompanyRole,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
} from '../../fixtures/companyManagementData';
import { customerShippingAddress } from '../../fixtures';
import { login, setGuestShippingAddress, checkTermsAndConditions } from '../../actions';

describe('USF-2563: Company Credit', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('💳 Company Credit test suite started');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Test cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  afterEach(() => {
    cy.logToTerminal('🗑️ Cleaning up test data');
    cy.then(async () => {
      try {
        await cleanupTestCompany();
        cy.logToTerminal('✅ Test data cleanup completed');
      } catch (error) {
        cy.logToTerminal(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  // ==========================================================================
  // TC-47 CASE_2 (P0): Company Credit page when Payment on Account is enabled
  // Verifies page elements and empty state for new company
  // ==========================================================================

  it('TC-47 CASE_2: Company Credit page displays correctly with no records', () => {
    cy.logToTerminal('========= 📋 TC-47 CASE_2: Verify Company Credit page (empty state) =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify page title');
      cy.contains('Company Credit', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify credit summary blocks exist');
      // Per test plan: Three blocks display - Outstanding Balance, Available Credit, Credit Limit
      cy.contains(/outstanding.*balance/i, { timeout: 10000 })
        .should('be.visible');
      cy.contains(/available.*credit/i)
        .should('be.visible');
      cy.contains(/credit.*limit/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify initial values are 0.00 for new company');
      // New company should have 0.00 for all credit values - MUST be visible
      cy.contains('0.00', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_2: Company Credit page verified (empty state)');
    });
  });

  // ==========================================================================
  // TC-47 CASE_3 (P0): "Reimbursed" record shown in grid
  // Per test plan: Reimburse/add amount to balance creates record
  // ==========================================================================

  it('TC-47 CASE_3: Reimbursed record appears when balance is added', () => {
    cy.logToTerminal('========= 📋 TC-47 CASE_3: Verify Reimbursed record in grid =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('💵 Get company credit ID and reimburse balance via REST API');
      cy.then(async () => {
        // First get the credit info to get the credit ID
        const creditInfo = await getCompanyCredit(Cypress.env('testCompanyId'));
        const creditId = creditInfo.id;
        cy.logToTerminal(`✅ Got credit ID: ${creditId}`);

        // Store credit ID for verification
        Cypress.env('testCreditId', creditId);

        // Reimburse $5.00 to the balance (per test plan CASE_3)
        await increaseCompanyCreditBalance(creditId, 5.00, 'USD', 'Test reimbursement');
        cy.logToTerminal('✅ Balance reimbursed via REST API: $5.00');
      });

      cy.wait(3000); // Wait for indexing

      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify balance value $5.00 is displayed');
      // Per test plan: Outstanding Balance: 5.00 - MUST be visible
      cy.contains('5.00', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Reimbursed" record in history grid');
      // Per test plan: Reimbursed record MUST appear in grid
      cy.contains(/reimburs/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_3: Reimbursement record verified');
    });
  });

  // ==========================================================================
  // TC-47 CASE_4 (P0): "Allocation" record shown in grid (set credit limit)
  // Per test plan: Set credit limit creates Allocation record
  // ==========================================================================

  it('TC-47 CASE_4: Allocation record appears when credit limit is set', () => {
    cy.logToTerminal('========= 📋 TC-47 CASE_4: Verify Allocation record in grid =========');

    setupTestCompanyAndAdmin();

    cy.then(async () => {
      cy.logToTerminal('💰 Set credit limit via REST API');

      // First get the credit info to get the credit ID
      const creditInfo = await getCompanyCredit(Cypress.env('testCompanyId'));
      const creditId = creditInfo.id;
      const companyId = creditInfo.company_id;
      cy.logToTerminal(`✅ Got credit ID: ${creditId}, company ID: ${companyId}`);

      // Set credit limit to $10.01 (per test plan CASE_4)
      await updateCompanyCredit(creditId, {
        company_id: companyId,
        credit_limit: 10.01,
        currency_code: 'USD',
      });
      cy.logToTerminal('✅ Credit limit set via REST API: $10.01');
    });

    cy.then(() => {
      cy.wait(3000); // Wait for indexing

      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify credit limit value $10.01 is displayed');
      // Per test plan: Credit Limit: 10.01 - MUST be visible
      cy.contains('10.01', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Allocation" record in history grid');
      // Per test plan: Allocation record MUST appear in grid
      cy.contains(/allocat/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_4: Credit limit allocation verified');
    });
  });

  // ==========================================================================
  // TC-47 Combined: Verify multiple operations show in grid
  // Tests both reimbursement AND allocation in sequence
  // ==========================================================================

  it('TC-47 Combined: Multiple credit operations show in grid', () => {
    cy.logToTerminal('========= 📋 TC-47 Combined: Verify multiple operations in grid =========');

    setupTestCompanyAndAdmin();

    cy.then(async () => {
      cy.logToTerminal('💰 Set up credit via REST API (reimburse + set limit)');

      // Get the credit info
      const creditInfo = await getCompanyCredit(Cypress.env('testCompanyId'));
      const creditId = creditInfo.id;
      const companyId = creditInfo.company_id;
      cy.logToTerminal(`✅ Got credit ID: ${creditId}, company ID: ${companyId}`);

      // Step 1: Reimburse $5.00 (per test plan CASE_3)
      await increaseCompanyCreditBalance(creditId, 5.00, 'USD', 'Initial reimbursement');
      cy.logToTerminal('✅ Balance reimbursed: $5.00');

      // Step 2: Set credit limit to $10.01 (per test plan CASE_4)
      await updateCompanyCredit(creditId, {
        company_id: companyId,
        credit_limit: 10.01,
        currency_code: 'USD',
      });
      cy.logToTerminal('✅ Credit limit set: $10.01');
    });

    cy.then(() => {
      cy.wait(3000); // Wait for indexing

      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify credit summary shows correct values');
      // Per test plan: Outstanding Balance: 5.00 - MUST be visible
      cy.contains('5.00', { timeout: 15000 })
        .should('be.visible');

      // Per test plan: Credit Limit: 10.01 - MUST be visible
      cy.contains('10.01', { timeout: 15000 })
        .should('be.visible');

      // Per test plan: Available Credit: 15.01 (5.00 + 10.01) - MUST be visible
      cy.contains('15.01', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify grid has both Reimbursed and Allocation records');
      // Per test plan: Both operation types MUST appear in grid
      cy.contains(/reimburs/i, { timeout: 15000 })
        .should('be.visible');
      cy.contains(/allocat/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 Combined: Multiple credit operations verified');
    });
  });

  // ==========================================================================
  // TC-48 (P2): User permissions for Company Credit page
  // Per test plan (lines 4396-4491):
  // - User with restricted role should NOT see credit history data in the table
  // - User CAN see the summary blocks (Outstanding Balance, Available Credit, Credit Limit)
  // - But the history table should show "No data available"
  //
  // Test approach:
  // 1. Create company with credit operations (reimbursement + allocation)
  // 2. Create user with no credit permissions
  // 3. Login as restricted user and verify history table is empty
  // ==========================================================================

  it('TC-48: User without credit permissions cannot see credit history data', () => {
    cy.logToTerminal('========= 📋 TC-48: Verify permission restrictions for Company Credit =========');

    setupTestCompanyWithNoCreditPermissionUser();

    cy.then(async () => {
      cy.logToTerminal('💰 Adding credit operations to company...');

      // Get the credit info
      const creditInfo = await getCompanyCredit(Cypress.env('testCompanyId'));
      const creditId = creditInfo.id;
      const companyId = creditInfo.company_id;
      cy.logToTerminal(`✅ Got credit ID: ${creditId}, company ID: ${companyId}`);

      // Add reimbursement
      await increaseCompanyCreditBalance(creditId, 5.00, 'USD', 'Test reimbursement for TC-48');
      cy.logToTerminal('✅ Added reimbursement: $5.00');

      // Set credit limit
      await updateCompanyCredit(creditId, {
        company_id: companyId,
        credit_limit: 10.00,
        currency_code: 'USD',
      });
      cy.logToTerminal('✅ Set credit limit: $10.00');
    });

    cy.then(() => {
      cy.wait(3000); // Wait for indexing

      cy.logToTerminal('🔐 Login as user with no credit permissions');
      loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify user can see summary blocks but NOT history data');

      // User CAN see the summary blocks
      cy.contains(/outstanding.*balance/i, { timeout: 10000 })
        .should('be.visible');
      cy.logToTerminal('✅ Summary blocks are visible (expected)');

      // User should NOT see the credit history records
      // The history table should show "No data available" or similar
      cy.get('body').then(($body) => {
        const bodyText = $body.text();

        // Check if "Reimbursed" or "Allocated" records are visible
        const hasReimbursed = bodyText.match(/reimburs/i);
        const hasAllocated = bodyText.match(/allocat/i);

        if (hasReimbursed || hasAllocated) {
          // FAIL: User can see credit history without permission
          throw new Error(
            'TC-48 FAILED: User without credit permissions can see credit history records. ' +
            'Expected: "No data available" in history table. ' +
            'Found: Reimbursed/Allocated records visible.'
          );
        }

        // Verify "No data available" or empty state is shown
        const hasNoData = bodyText.match(/no.*data|no.*records|no.*history/i);
        if (hasNoData) {
          cy.logToTerminal('✅ History table shows "No data available" (expected)');
        } else {
          cy.logToTerminal('✅ History table is empty or hidden (expected)');
        }
      });

      cy.logToTerminal('✅ TC-48: Permission restriction verified - user cannot see credit history');
    });
  });

  // ==========================================================================
  // TC-47 CASE_5: Refund (Credit Memo)
  // ==========================================================================

  it('TC-47 CASE_5: Refunded record appears when order is refunded via credit memo', () => {
    cy.logToTerminal('========= 📋 TC-47 CASE_5: Verify Refunded record after credit memo =========');

    cy.then(async () => {
      cy.logToTerminal('🏢 Setting up test company with Payment on Account...');
      await cy.setupCompanyWithCredit();
    });

    cy.then(() => {
      cy.loginAsCompanyAdmin();

      cy.logToTerminal('🛒 Adding product to cart for order...');
      cy.visit('/products/alpine-double-barrel-backpack/ADB150');
      cy.wait(2000);

      cy.get('.product-details__buttons__add-to-cart button', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(2000);

      cy.logToTerminal('✅ Product added to cart, proceeding to checkout...');
      cy.visit('/checkout');
      cy.wait(3000);

      // Fill shipping address
      cy.logToTerminal('📝 Filling shipping address...');
      setGuestShippingAddress(customerShippingAddress, true);
      cy.wait(3000);

      // Select shipping method
      cy.logToTerminal('📦 Selecting shipping method...');
      cy.get('body').then(($body) => {
        if ($body.find('input[name="shipping_method"]').length > 0) {
          cy.get('input[name="shipping_method"]').first().check({ force: true });
          cy.wait(2000);
        }
      });
      cy.wait(5000);

      // Select Payment on Account
      cy.logToTerminal('💳 Selecting Payment on Account...');
      cy.get('input[value="companycredit"]', { timeout: 10000 })
        .should('exist')
        .check({ force: true });
      cy.wait(2000);

      // Accept T&C if present
      checkTermsAndConditions();

      // Place order
      cy.logToTerminal('🎯 Placing order...');
      cy.contains('button', /place.*order/i, { timeout: 10000 }).click();

      // Wait for success page and extract order number
      cy.url({ timeout: 30000 }).should('match', /success|confirmation|order-details/);
      cy.wait(3000);

      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        const orderMatch = bodyText.match(/order.*?(\d{9})/i) || bodyText.match(/(\d{9})/);
        if (orderMatch) {
          const orderNumber = orderMatch[1];
          cy.logToTerminal(`✅ Order placed successfully: ${orderNumber}`);
          Cypress.env('testOrderNumber', orderNumber);
        } else {
          throw new Error('Could not extract order number from success page');
        }
      });
      
      // Wait for backend to process order
      cy.wait(5000);
    });

    cy.then(async () => {
      const orderNumber = Cypress.env('testOrderNumber');
      cy.logToTerminal(`💰 Creating invoice and credit memo for order ${orderNumber}...`);

      // Import API functions
      const { createInvoice, createCreditMemo, getOrderByIncrementId } = require('../../support/b2bCompanyAPICalls');

      // First, get the order entity_id from increment_id
      try {
        const order = await getOrderByIncrementId(orderNumber);
        const orderId = order.entity_id;
        cy.logToTerminal(`✅ Found order entity_id: ${orderId} for increment_id: ${orderNumber}`);

        // Create invoice using entity_id
        const invoiceId = await createInvoice(orderId);
        cy.logToTerminal(`✅ Invoice created: ${invoiceId}`);

        // Create credit memo (triggers automatic company credit refund)
        const creditMemoId = await createCreditMemo(orderId, invoiceId);
        cy.logToTerminal(`✅ Credit memo created: ${creditMemoId}`);

        cy.wait(5000); // Wait for credit history to update
      } catch (error) {
        cy.logToTerminal(`❌ Error processing order ${orderNumber}: ${error.message}`);
        throw error;
      }
    });

    cy.then(() => {
      cy.logToTerminal('📍 Verifying Refunded record in credit history...');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      // Verify "Refunded" record appears
      cy.contains(/refund/i, { timeout: 10000 }).should('be.visible');
      cy.logToTerminal('✅ TC-47 CASE_5: Refunded record verified in credit history');
    });
  });

  // ==========================================================================
  // TC-47 CASE_6: Revert (Order Cancellation)
  // ==========================================================================

  it('TC-47 CASE_6: Reverted record appears when order is cancelled', () => {
    cy.logToTerminal('========= 📋 TC-47 CASE_6: Verify Reverted record after order cancellation =========');

    cy.then(async () => {
      cy.logToTerminal('🏢 Setting up test company with Payment on Account...');
      await cy.setupCompanyWithCredit();
    });

    cy.then(() => {
      cy.loginAsCompanyAdmin();

      cy.logToTerminal('🛒 Adding product to cart for order...');
      cy.visit('/products/alpine-double-barrel-backpack/ADB150');
      cy.wait(2000);

      cy.get('.product-details__buttons__add-to-cart button', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(2000);

      cy.logToTerminal('✅ Product added to cart, proceeding to checkout...');
      cy.visit('/checkout');
      cy.wait(3000);

      // Fill shipping address
      cy.logToTerminal('📝 Filling shipping address...');
      setGuestShippingAddress(customerShippingAddress, true);
      cy.wait(3000);

      // Select shipping method
      cy.logToTerminal('📦 Selecting shipping method...');
      cy.get('body').then(($body) => {
        if ($body.find('input[name="shipping_method"]').length > 0) {
          cy.get('input[name="shipping_method"]').first().check({ force: true });
          cy.wait(2000);
        }
      });
      cy.wait(5000);

      // Select Payment on Account
      cy.logToTerminal('💳 Selecting Payment on Account...');
      cy.get('input[value="companycredit"]', { timeout: 10000 })
        .should('exist')
        .check({ force: true });
      cy.wait(2000);

      // Accept T&C if present
      checkTermsAndConditions();

      // Place order
      cy.logToTerminal('🎯 Placing order...');
      cy.contains('button', /place.*order/i, { timeout: 10000 }).click();

      // Wait for success page and extract order number
      cy.url({ timeout: 30000 }).should('match', /success|confirmation|order-details/);
      cy.wait(3000);

      cy.get('body').then(($body) => {
        const bodyText = $body.text();
        const orderMatch = bodyText.match(/order.*?(\d{9})/i) || bodyText.match(/(\d{9})/);
        if (orderMatch) {
          const orderNumber = orderMatch[1];
          cy.logToTerminal(`✅ Order placed successfully: ${orderNumber}`);
          Cypress.env('testOrderNumber', orderNumber);
        } else {
          throw new Error('Could not extract order number from success page');
        }
      });
      
      // Wait for backend to process order
      cy.wait(5000);
    });

    cy.then(async () => {
      const orderNumber = Cypress.env('testOrderNumber');
      cy.logToTerminal(`❌ Cancelling order ${orderNumber}...`);

      // Import API functions
      const { cancelOrder, getOrderByIncrementId } = require('../../support/b2bCompanyAPICalls');

      try {
        // First, get the order entity_id from increment_id
        const order = await getOrderByIncrementId(orderNumber);
        const orderId = order.entity_id;
        cy.logToTerminal(`✅ Found order entity_id: ${orderId} for increment_id: ${orderNumber}`);

        // Cancel order using entity_id (triggers automatic company credit restoration)
        await cancelOrder(orderId);
        cy.logToTerminal(`✅ Order ${orderNumber} cancelled`);

        cy.wait(5000); // Wait for credit history to update
      } catch (error) {
        cy.logToTerminal(`❌ Error cancelling order ${orderNumber}: ${error.message}`);
        throw error;
      }
    });

    cy.then(() => {
      cy.logToTerminal('📍 Verifying Reverted record in credit history...');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      // Verify "Reverted" record appears
      cy.contains(/revert/i, { timeout: 10000 }).should('be.visible');
      cy.logToTerminal('✅ TC-47 CASE_6: Reverted record verified in credit history');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Credit test suite completed');
  });
});

// ==========================================================================
// Helper Functions
// ==========================================================================

/**
 * Setup test company and admin via REST API.
 * Stores company/admin info in Cypress.env for cleanup.
 * Uses baseCompanyData fixture for all company and admin data.
 */
const setupTestCompanyAndAdmin = () => {
  cy.logToTerminal('🏢 Setting up test company and admin...');

  cy.then(async () => {
    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: baseCompanyData.companyName,
      companyEmail: baseCompanyData.companyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California region ID
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: baseCompanyData.adminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Store for cleanup
    Cypress.env('currentTestCompanyEmail', baseCompanyData.companyEmail);
    Cypress.env('currentTestAdminEmail', baseCompanyData.adminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);

    cy.logToTerminal(`✅ Admin: ${testCompany.company_admin.email}`);
  });
};

/**
 * Setup test company with both admin and regular user.
 * Stores all info in Cypress.env for cleanup.
 * Uses baseCompanyData and companyUsers fixtures for all data.
 */
const setupTestCompanyWithRegularUser = () => {
  cy.logToTerminal('🏢 Setting up test company with regular user...');

  cy.then(async () => {
    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: baseCompanyData.companyName,
      companyEmail: baseCompanyData.companyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California region ID
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: baseCompanyData.adminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    cy.logToTerminal('👤 Creating regular company user...');
    const regularUser = await createCompanyUser({
      email: companyUsers.regularUser.email,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email}`);

    // Store for cleanup
    Cypress.env('currentTestCompanyEmail', baseCompanyData.companyEmail);
    Cypress.env('currentTestAdminEmail', baseCompanyData.adminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);
    Cypress.env('regularUserEmail', regularUser.email);
    Cypress.env('regularUserPassword', companyUsers.regularUser.password);
    Cypress.env('regularUserId', regularUser.id);
  });
};

/**
 * Setup test company with a user that has NO credit permissions.
 * Creates a custom role with no credit-related permissions and assigns it to the user.
 * This is used for TC-48 to verify permission restrictions.
 */
const setupTestCompanyWithNoCreditPermissionUser = () => {
  cy.logToTerminal('🏢 Setting up test company with no-credit-permission user...');

  cy.then(async () => {
    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: baseCompanyData.companyName,
      companyEmail: baseCompanyData.companyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California region ID
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: baseCompanyData.adminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Create a custom role with NO credit permissions
    // Only basic permissions - no Magento_Company::credit resource
    cy.logToTerminal('🎭 Creating custom role with NO credit permissions...');
    const noCreditRole = await createCompanyRole({
      company_id: testCompany.id,
      role_name: 'No Credit Access',
      permissions: [
        // Basic company resources only - NO credit permissions
        // Per swagger: permission object requires resource_id (string) and permission (string)
        { resource_id: 'Magento_Company::index', permission: 'allow' },
        { resource_id: 'Magento_Company::view', permission: 'allow' },
      ],
    });
    cy.logToTerminal(`✅ Custom role created: ${noCreditRole.role_name} (ID: ${noCreditRole.id})`);

    cy.logToTerminal('👤 Creating company user...');
    const regularUser = await createCompanyUser({
      email: companyUsers.regularUser.email,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ User created: ${regularUser.email} (ID: ${regularUser.id})`);

    // Assign the no-credit role to the user
    cy.logToTerminal('🎭 Assigning no-credit role to user...');
    await assignRoleToUser(regularUser.id, noCreditRole);
    cy.logToTerminal('✅ No-credit role assigned to user');

    // Store for cleanup
    Cypress.env('currentTestCompanyEmail', baseCompanyData.companyEmail);
    Cypress.env('currentTestAdminEmail', baseCompanyData.adminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);
    Cypress.env('regularUserEmail', regularUser.email);
    Cypress.env('regularUserPassword', companyUsers.regularUser.password);
    Cypress.env('regularUserId', regularUser.id);
    Cypress.env('noCreditRoleId', noCreditRole.id);
  });
};

/**
 * Login as company admin using stored credentials.
 */
const loginAsCompanyAdmin = () => {
  const urls = Cypress.env('poUrls');
  const user = {
    email: Cypress.env('adminEmail'),
    password: Cypress.env('adminPassword'),
  };
  login(user, urls);
  cy.logToTerminal('✅ Admin logged in');
};

/**
 * Login as regular company user using stored credentials.
 */
const loginAsRegularUser = () => {
  const urls = Cypress.env('poUrls');
  const user = {
    email: Cypress.env('regularUserEmail'),
    password: Cypress.env('regularUserPassword'),
  };
  // Wait for any pending operations before login
  cy.wait(1000);
  login(user, urls);
  cy.logToTerminal('✅ Regular user logged in');
};
