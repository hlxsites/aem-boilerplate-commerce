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
 * @fileoverview Company Credit E2E Journey Tests (OPTIMIZED).
 *
 * Tests Company Credit functionality through realistic user journeys.
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 7: Company Credit
 *
 * ==========================================================================
 * OPTIMIZATION APPROACH:
 * ==========================================================================
 * BEFORE: 5 individual tests with separate setup/cleanup (2:43 runtime, ~33s per test)
 * AFTER: 1 comprehensive journey test (~1-2min runtime)
 * TIME SAVED: ~1 minute (35% reduction)
 *
 * KEY OPTIMIZATION:
 * - Setup company + user ONCE instead of 5 times
 * - Test credit operations in sequence (empty state → reimbursement → allocation)
 * - Test permission restrictions in same journey
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-47 CASE_2: Company Credit page displays correctly with no records
 * TC-47 CASE_3: Reimbursed record appears in grid
 * TC-47 CASE_4: Allocation record appears in grid
 * TC-48: User permissions for Company Credit page
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
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
} from '../../fixtures/companyManagementData';
import { login } from '../../actions';

describe('USF-2563: Company Credit (Optimized Journey)', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('💳 Company Credit test suite started (OPTIMIZED)');
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

  /**
   * ==========================================================================
   * JOURNEY: Complete Company Credit Workflow
   * ==========================================================================
   * Combines: TC-47 (CASE_2, CASE_3, CASE_4), TC-48
   * Tests: Empty state, reimbursement, allocation, permission restrictions
   * Setup: ONCE at journey start
   * Time: ~1-2 minutes (vs 5 tests x 33s = 2.75 minutes)
   */
  it('JOURNEY: Company credit display and operations with permissions', () => {
    cy.logToTerminal('========= 🚀 JOURNEY: Complete Company Credit Workflow =========');

    // ========== SETUP: Create company with admin + restricted user (ONCE) ==========
    setupTestCompanyWithRestrictedUser();

    cy.then(() => {
      // ========== TC-47 CASE_2: Empty state ==========
      cy.logToTerminal('--- STEP 1: TC-47 CASE_2 - Verify empty state ---');

      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify page title');
      cy.contains('Company Credit', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify credit summary blocks exist');
      cy.contains(/outstanding.*balance/i, { timeout: 10000 })
        .should('be.visible');
      cy.contains(/available.*credit/i)
        .should('be.visible');
      cy.contains(/credit.*limit/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify initial values are 0.00');
      cy.contains('0.00', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_2: Empty state verified');

      // ========== TC-47 CASE_3: Reimbursement operation ==========
      cy.logToTerminal('--- STEP 2: TC-47 CASE_3 - Add reimbursement ---');

      cy.logToTerminal('💵 Reimburse balance via REST API');
      cy.then(async () => {
        const creditInfo = await getCompanyCredit(Cypress.env('testCompanyId'));
        const creditId = creditInfo.id;
        Cypress.env('testCreditId', creditId);

        await increaseCompanyCreditBalance(creditId, 5.00, 'USD', 'Test reimbursement');
        cy.logToTerminal('✅ Balance reimbursed: $5.00');
      });

      cy.wait(3000);

      // Reload page to see reimbursement
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify balance value $5.00 is displayed');
      cy.contains('5.00', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Reimbursed" record in history grid');
      cy.contains(/reimburs/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_3: Reimbursement record verified');

      // ========== TC-47 CASE_4: Allocation operation ==========
      cy.logToTerminal('--- STEP 3: TC-47 CASE_4 - Set credit limit (allocation) ---');

      cy.logToTerminal('💳 Set credit limit via REST API');
      cy.then(async () => {
        const creditId = Cypress.env('testCreditId');
        const companyId = Cypress.env('testCompanyId');
        await updateCompanyCredit(creditId, {
          company_id: companyId,
          credit_limit: 100.00,
          currency_code: 'USD',
        });
        cy.logToTerminal('✅ Credit limit set to $100.00');
      });

      cy.wait(3000);

      // Reload page to see allocation
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify credit limit $100.00 is displayed');
      cy.contains('100', { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Allocated" record in history grid');
      cy.contains(/allocat/i, { timeout: 15000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-47 CASE_4: Allocation record verified');

      // ========== TC-48: Test restricted user permissions ==========
      cy.logToTerminal('--- STEP 4: TC-48 - Verify restricted user access ---');

      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as restricted user');
      loginAsRestrictedUser();

      cy.logToTerminal('📍 Navigate to Company Credit page');
      cy.visit('/customer/company/credit');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify restricted user can see summary blocks');
      cy.contains('Company Credit', { timeout: 10000 })
        .should('be.visible');
      cy.contains(/outstanding.*balance/i)
        .should('be.visible');
      cy.contains(/credit.*limit/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify restricted user cannot see history data');
      cy.get('body').then(($body) => {
        // History table should be empty or show access denied
        if ($body.text().match(/no.*data|access.*denied/i)) {
          cy.logToTerminal('✅ History correctly hidden/restricted');
        } else {
          // Check if history entries are NOT visible
          cy.contains(/reimburs|allocat/i).should('not.exist');
          cy.logToTerminal('✅ History entries not visible');
        }
      });

      cy.logToTerminal('✅ TC-48: Restricted user permissions verified');
      cy.logToTerminal('========= 🎉 JOURNEY COMPLETED =========');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Credit test suite completed');
  });
});

// ==========================================================================
// Helper Functions
// ==========================================================================

const setupTestCompanyAndAdmin = () => {
  cy.logToTerminal('🏢 Setting up test company and admin...');
  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    Cypress.env('currentTestCompanyEmail', uniqueCompanyEmail);
    Cypress.env('currentTestAdminEmail', uniqueAdminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);
  });
};

const setupTestCompanyWithRestrictedUser = () => {
  cy.logToTerminal('🏢 Setting up test company with restricted user...');
  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueRestrictedUserEmail = `restricted.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    // Create restricted role (no credit history access)
    const restrictedRole = await createCompanyRole({
      company_id: testCompany.id,
      role_name: 'Restricted User',
      permissions: [], // No permissions
    });

    // Create restricted user
    const restrictedUser = await createCompanyUser({
      email: uniqueRestrictedUserEmail,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    // Assign restricted role (pass role object, not just ID)
    await assignRoleToUser(restrictedUser.id, restrictedRole);

    Cypress.env('currentTestCompanyEmail', uniqueCompanyEmail);
    Cypress.env('currentTestAdminEmail', uniqueAdminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);
    Cypress.env('restrictedUserEmail', uniqueRestrictedUserEmail);
    Cypress.env('restrictedUserPassword', companyUsers.regularUser.password);
    Cypress.env('restrictedRoleId', restrictedRole.id);
  });
};

const loginAsCompanyAdmin = () => {
  const urls = Cypress.env('poUrls');
  const user = {
    email: Cypress.env('adminEmail'),
    password: Cypress.env('adminPassword'),
  };
  login(user, urls);
  cy.logToTerminal('✅ Admin logged in');
};

const loginAsRestrictedUser = () => {
  const urls = Cypress.env('poUrls');
  const user = {
    email: Cypress.env('restrictedUserEmail'),
    password: Cypress.env('restrictedUserPassword'),
  };
  login(user, urls);
  cy.logToTerminal('✅ Restricted user logged in');
};
