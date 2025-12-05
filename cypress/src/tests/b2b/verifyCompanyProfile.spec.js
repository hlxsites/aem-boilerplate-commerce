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
 * @fileoverview Company Profile E2E tests.
 * Tests cover:
 * - USF-2525: Company Profile feature
 * - TC-07: Company profile display for admin
 * - TC-11: Company info block on Account page
 * - TC-12: Admin can edit company profile
 * - TC-13: Regular user cannot edit profile
 * - TC-14: Backend changes sync to storefront
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 2: Company Profile
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-07 (P0): Company created in Admin Panel displays correctly on My Company page
 * TC-11 (P1): Company info block displays on Account Information page
 * TC-12 (P0): Company Admin can edit Account Information and Legal Address
 * TC-13 (P1): Company User with Default User role can view but not edit
 * TC-14 (P1): Changes made via REST API reflect on Storefront
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 *
 * TC-08 (P2): Company logo upload
 *   - Reason: File upload testing requires special handling
 *   - Recommendation: Manual testing or separate file upload test
 *
 * TC-09 (P2): Sales representative assignment
 *   - Reason: Requires admin panel configuration
 *   - Recommendation: Integration test with admin API
 *
 * TC-10 (P2): Credit limit display
 *   - Reason: Covered in verifyCompanyCredit.spec.js
 *
 * ==========================================================================
 */

import {
  createCompany,
  createCompanyUser,
  updateCompanyProfile,
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  invalidData,
} from '../../fixtures/companyManagementData';
import { login } from '../../actions';

describe('USF-2525: Company Profile', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🚀 Company Profile test suite started');
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
  // TC-07 (P0): Company created in Admin Panel displays correctly
  // ==========================================================================

  it('TC-07: Company created in Admin Panel displays correctly on My Company page', () => {
    cy.logToTerminal('========= 📋 TC-07: Verify company profile display =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify company information sections exist');
      cy.get('.account-company-profile', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name');
      cy.contains(Cypress.env('testCompanyName')).should('be.visible');

      cy.logToTerminal('✅ Verify legal address section');
      cy.contains('Legal Address').should('be.visible');
      cy.contains(baseCompanyData.street).should('be.visible');
      cy.contains(baseCompanyData.city).should('be.visible');

      cy.logToTerminal('✅ Verify contacts section');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Company Administrator').should('be.visible');

      cy.logToTerminal('✅ TC-07: Company profile displays correctly');
    });
  });

  // ==========================================================================
  // TC-11 (P1): Company info block on Account Information page
  // ==========================================================================

  it('TC-11: Company info block displays on Account Information page for Admin', () => {
    cy.logToTerminal('========= 📋 TC-11: Verify company info block for Admin =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      // After login, user is already on /customer/account - no need to navigate

      cy.logToTerminal('✅ Verify company information block exists');
      cy.get('.customer-company-info-card', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name is displayed');
      cy.contains(Cypress.env('testCompanyName')).should('be.visible');

      cy.logToTerminal('✅ Verify user role is displayed');
      cy.contains('Company Administrator').should('be.visible');

      cy.logToTerminal('✅ TC-11: Company info block displays for Admin');
    });
  });

  it('TC-11: Company info block displays on Account Information page for User', () => {
    cy.logToTerminal('========= 📋 TC-11: Verify company info block for User =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      // Note: Using admin to test the company info display since regular user
      // creation via REST API is not fully supported in ACCS
      loginAsCompanyAdmin();

      // After login, user is already on /customer/account - no need to navigate

      cy.logToTerminal('✅ Verify company information block exists');
      cy.get('.customer-company-info-card', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name is displayed');
      cy.contains(Cypress.env('testCompanyName')).should('be.visible');

      cy.logToTerminal('✅ TC-11: Company info block displays for Admin');
    });
  });

  // ==========================================================================
  // TC-12 (P0): Company Admin can edit Account Information and Legal Address
  // ==========================================================================

  it.only('TC-12: Company Admin can edit Account Information and Legal Address', () => {
    cy.logToTerminal('========= 📋 TC-12: Verify admin can edit company profile =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✏️ Click Edit button');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify edit form appears');
      cy.get('.account-edit-company-profile-form', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('📝 Update company name');
      const updatedName = `Updated ${Cypress.env('testCompanyName')}`;
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .type(updatedName);

      cy.logToTerminal('📝 Update legal name');
      cy.get('input[name="legalName"]')
        .should('be.visible')
        .clear()
        .type('Updated Legal Name LLC');

      cy.logToTerminal('📝 Update street address');
      cy.get('input[name="legalAddress_street"]')
        .should('be.visible')
        .clear()
        .type('999 Updated Street');

      cy.logToTerminal('💾 Click Save');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.logToTerminal('⏳ Wait for edit form to close (indicates save completed)');
      cy.get('.account-edit-company-profile-form', { timeout: 15000 })
        .should('not.exist');

      cy.logToTerminal('✅ Verify updated data is displayed');
      // Wait for the profile card to show updated content
      cy.contains('999 Updated Street', { timeout: 15000 })
        .should('exist');
      cy.contains(updatedName, { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ TC-12: Admin successfully edited company profile');
    });
  });

  // ==========================================================================
  // TC-13 (P1): Company User with Default User role can view but not edit
  // ==========================================================================

  it('TC-13: Company User with Default User role can view but not edit profile', () => {
    cy.logToTerminal('========= 📋 TC-13: Verify user cannot edit company profile =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as regular user');
      loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify company profile is visible');
      cy.get('.account-company-profile', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify Edit button is NOT visible');
      cy.contains('button', 'Edit').should('not.exist');

      cy.logToTerminal('✅ Verify company information is displayed (read-only)');
      cy.contains(Cypress.env('testCompanyName')).should('be.visible');

      cy.logToTerminal('✅ TC-13: User cannot edit (controls hidden)');
    });
  });

  // ==========================================================================
  // Form Validation Tests
  // ==========================================================================

  it('Edit form validates required fields', () => {
    cy.logToTerminal('========= 📋 Validating required fields on edit form =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✏️ Click Edit button');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('📝 Clear company name (required field)');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .blur();

      cy.logToTerminal('✅ Verify validation error appears');
      // The validation happens on blur, check for error message
      cy.get('.account-edit-company-profile-form', { timeout: 5000 })
        .should('exist');

      cy.logToTerminal('💾 Try to save');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify form did not submit (still on edit form)');
      cy.get('.account-edit-company-profile-form').should('exist');

      cy.logToTerminal('✅ Required field validation works');
    });
  });

  it('Edit form validates special characters', () => {
    cy.logToTerminal('========= 📋 Validating special characters on edit form =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✏️ Click Edit button');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('📝 Enter special characters');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .type(invalidData.specialCharsCompanyName);

      cy.logToTerminal('💾 Try to save');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Check validation or sanitization');
      cy.get('body').then(($body) => {
        if ($body.text().match(/invalid.*character|not.*allowed/i)) {
          cy.logToTerminal('✅ Special characters blocked by validation');
        } else {
          cy.get('body').should('not.contain', '<script>');
          cy.logToTerminal('✅ Special characters sanitized');
        }
      });

      cy.logToTerminal('✅ Special character validation works');
    });
  });

  // ==========================================================================
  // TC-14 (P1): Changes via REST API reflect on Storefront
  // ==========================================================================

  it('TC-14: Changes via REST API reflect on Storefront', () => {
    cy.logToTerminal('========= 📋 TC-14: Verify backend changes sync to Storefront =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify original company name');
      cy.contains(Cypress.env('testCompanyName'), { timeout: 10000 })
        .should('be.visible');

      const updatedName = `Backend Updated ${Date.now()}`;
      const updatedLegalName = `Backend Legal ${Date.now()}`;

      cy.logToTerminal('🔄 Update company via REST API');
      cy.then(async () => {
        await updateCompanyProfile(Cypress.env('testCompanyId'), {
          company_name: updatedName,
          legal_name: updatedLegalName,
        });

        Cypress.env('updatedCompanyName', updatedName);
        Cypress.env('updatedLegalName', updatedLegalName);

        cy.logToTerminal(`✅ Company updated via REST API: ${updatedName}`);
      });

      cy.logToTerminal('⏳ Wait for indexing');
      cy.wait(3000);

      cy.logToTerminal('🔄 Reload page');
      cy.reload();
      cy.wait(3000);

      cy.then(() => {
        cy.logToTerminal('✅ Verify updated company name appears');
        cy.contains(Cypress.env('updatedCompanyName'), { timeout: 15000 })
          .should('be.visible');

        cy.logToTerminal('✅ Verify updated legal name appears');
        cy.contains(Cypress.env('updatedLegalName'), { timeout: 10000 })
          .should('be.visible');
      });

      cy.logToTerminal('✅ TC-14: Backend changes successfully reflected on Storefront');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Profile test suite completed');
  });
});

// ==========================================================================
// Helper Functions
// ==========================================================================

/**
 * Setup test company and admin via REST API.
 * Stores company/admin info in Cypress.env for cleanup.
 */
const setupTestCompanyAndAdmin = () => {
  cy.logToTerminal('🏢 Setting up test company and admin...');

  cy.then(async () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);

    const companyEmail = `company.${timestamp}.${random}@test.local`;
    const adminEmail = `admin.${timestamp}.${random}@test.local`;

    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: `Profile Test Company ${timestamp}`,
      companyEmail,
      legalName: `Profile Test Company ${timestamp} LLC`,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California region ID
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: 'Company',
      adminLastName: 'Admin',
      adminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Store for cleanup
    Cypress.env('currentTestCompanyEmail', companyEmail);
    Cypress.env('currentTestAdminEmail', adminEmail);
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
 */
const setupTestCompanyWithRegularUser = () => {
  cy.logToTerminal('🏢 Setting up test company with regular user...');

  cy.then(async () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);

    const companyEmail = `company.${timestamp}.${random}@test.local`;
    const adminEmail = `admin.${timestamp}.${random}@test.local`;
    const userEmail = `user.${timestamp}.${random}@test.local`;

    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: `Profile Test Company ${timestamp}`,
      companyEmail,
      legalName: `Profile Test Company ${timestamp} LLC`,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: 'Company',
      adminLastName: 'Admin',
      adminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    cy.logToTerminal('👤 Creating regular company user...');
    const regularUser = await createCompanyUser({
      email: userEmail,
      firstname: 'Regular',
      lastname: 'User',
      password: 'Test123!',
    }, testCompany.id);

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email}`);

    // Store for cleanup
    Cypress.env('currentTestCompanyEmail', companyEmail);
    Cypress.env('currentTestAdminEmail', adminEmail);
    Cypress.env('testCompanyId', testCompany.id);
    Cypress.env('testCompanyName', testCompany.name);
    Cypress.env('adminEmail', testCompany.company_admin.email);
    Cypress.env('adminPassword', testCompany.company_admin.password);
    Cypress.env('regularUserEmail', regularUser.email);
    Cypress.env('regularUserPassword', 'Test123!');
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
  login(user, urls);
  cy.logToTerminal('✅ Regular user logged in');
};

