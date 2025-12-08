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
 * - TC-07: Company profile display for admin (required fields)
 * - TC-08: Company profile display with all fields (covered in TC-07)
 * - TC-11: Company info block on Account page
 * - TC-12: Admin can edit company profile (includes form validation)
 * - TC-13: Regular user cannot edit profile
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 2: Company Profile
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-07 (P0): Company created in Admin Panel displays correctly on My Company page
 * TC-08 (P1): Company created with ALL fields displays correctly (covered in TC-07)
 * TC-11 (P1): Company info block displays on Account Information page
 * TC-12 (P0): Company Admin can edit Account Information and Legal Address
 * TC-13 (P0): Company User with Default User role can view but not edit
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 *
 * TC-09 (P0): Company Profile displays correct data when created from Storefront
 *   - Reason: Companies created via storefront have status 0 (Pending)
 *   - Activation requires PUT /V1/company/{id} which returns 404 on ACCS
 *   - This is the same platform limitation as TC-14
 *   - Recommendation: Manual testing or test on non-ACCS environment
 *
 * TC-10 (P2): Applicable Payment/Shipping Methods display on My Company page
 *   - Reason: Requires specific admin configuration
 *   - Recommendation: Manual testing or separate configuration test
 *
 * TC-14 (P1): Changes made via REST API reflect on Storefront
 *   - Reason: PUT /V1/company/{companyId} returns 404 on ACCS platform
 *   - The endpoint is documented but not implemented in ACCS environment
 *   - See: https://adobe-commerce-saas.redoc.ly/tag/companycompanyId#operation/PutV1CompanyCompanyId
 *   - Recommendation: Manual testing or test on non-ACCS environment
 *
 * ==========================================================================
 */

import {
  createCompany,
  createCompanyUser,
  updateCompanyProfile,
  cleanupTestCompany,
  findCompanyByEmail,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
  invalidData,
} from '../../fixtures/companyManagementData';
import { companyRegistrationData } from '../../fixtures/companyData';
import { COMPANY_CREATE_PATH } from '../../fields';
import {
  login,
  fillCompanyRegistrationForm,
  submitCompanyRegistrationForm,
} from '../../actions';
import {
  assertCompanyRegistrationForm,
  assertCompanyRegistrationSuccess,
} from '../../assertions';

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
  // TC-08 (P1): Company created with ALL fields displays correctly
  // Note: TC-08 is covered here by verifying all optional fields
  // ==========================================================================

  it('TC-07/TC-08: Company created in Admin Panel displays correctly on My Company page', () => {
    cy.logToTerminal('========= 📋 TC-07/TC-08: Verify company profile display (all fields) =========');

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

      // --- TC-07: Required fields ---
      cy.logToTerminal('✅ Verify company name');
      cy.then(() => {
        cy.contains(Cypress.env('testCompany').name).should('be.visible');
      });

      cy.logToTerminal('✅ Verify legal address section');
      cy.contains('Legal Address').should('be.visible');
      cy.contains(baseCompanyData.street).should('be.visible');
      cy.contains(baseCompanyData.city).should('be.visible');
      cy.contains(baseCompanyData.postcode).should('be.visible');
      cy.contains(baseCompanyData.telephone).should('be.visible');

      cy.logToTerminal('✅ Verify contacts section');
      cy.contains('Contacts').should('be.visible');
      cy.contains('Company Administrator').should('be.visible');

      // --- TC-08: Optional fields (ALL fields) ---
      cy.logToTerminal('✅ Verify optional fields - Legal Name');
      cy.contains(baseCompanyData.legalName).should('be.visible');

      cy.logToTerminal('✅ Verify optional fields - VAT/Tax ID');
      cy.contains(baseCompanyData.vatTaxId).should('be.visible');

      cy.logToTerminal('✅ Verify optional fields - Reseller ID');
      cy.contains(baseCompanyData.resellerId).should('be.visible');

      cy.logToTerminal('✅ TC-07/TC-08: Company profile displays correctly with all fields');
    });
  });

  // ==========================================================================
  // TC-09 (P0): Company Profile displays correct data when created from Storefront
  // Note: Company needs to be activated via REST API after storefront registration
  // ==========================================================================

  it.skip('TC-09: Company created from Storefront displays correctly after activation', () => {
    // SKIPPED: Companies created via storefront have status 0 (Pending)
    // Activation requires PUT /V1/company/{id} which returns 404 on ACCS
    // This is the same platform limitation as TC-14
    
    cy.logToTerminal('========= 📋 TC-09: Verify company profile for storefront-created company =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ Verify registration form is accessible');
    cy.url().should('include', COMPANY_CREATE_PATH);
    assertCompanyRegistrationForm();

    cy.logToTerminal('📝 Fill company registration form');
    fillCompanyRegistrationForm(companyRegistrationData);

    cy.logToTerminal('🚀 Submit registration form');
    submitCompanyRegistrationForm();

    cy.logToTerminal('✅ Verify successful registration on UI');
    assertCompanyRegistrationSuccess(companyRegistrationData);

    cy.logToTerminal('🔍 Check company status via REST API');
    cy.then(async () => {
      // Get the emails that were generated during form fill
      const companyEmail = Cypress.env('currentTestCompanyEmail');
      const adminEmail = Cypress.env('currentTestAdminEmail');

      cy.logToTerminal(`📧 Company email: ${companyEmail}`);
      cy.logToTerminal(`📧 Admin email: ${adminEmail}`);

      // Find the company by email
      const company = await findCompanyByEmail(companyEmail);
      if (!company) {
        throw new Error(`Company not found with email: ${companyEmail}`);
      }

      cy.logToTerminal(`✅ Found company: ${company.company_name} (ID: ${company.id})`);
      cy.logToTerminal(`📊 Company status: ${company.status} (0=Pending, 1=Active, 2=Rejected)`);

      // Store for cleanup and later use
      Cypress.env('testCompanyId', company.id);
      Cypress.env('testCompanyName', company.company_name);
      Cypress.env('adminEmail', adminEmail);
      Cypress.env('adminPassword', 'Test123!'); // Default password from registration

      // Check if company needs activation
      if (company.status !== 1) {
        cy.logToTerminal(`⚠️ Company is not active (status: ${company.status})`);
        cy.logToTerminal('⚠️ PUT /V1/company/{id} endpoint returns 404 on ACCS - cannot activate via REST API');
        cy.logToTerminal('⚠️ TC-09: Company activation cannot be automated on ACCS platform');
      } else {
        cy.logToTerminal('✅ Company is already active, proceeding to login');
      }
    });

    cy.logToTerminal('⏳ Wait for activation to propagate');
    cy.wait(3000);

    cy.logToTerminal('🔐 Login as company admin');
    loginAsCompanyAdmin();

    cy.logToTerminal('📍 Navigate to My Company page');
    cy.visit('/customer/company');
    cy.wait(2000);

    cy.logToTerminal('✅ Verify company information sections exist');
    cy.get('.account-company-profile', { timeout: 10000 })
      .should('exist');

    cy.logToTerminal('✅ Verify company name from registration');
    cy.contains(companyRegistrationData.company.companyName, { timeout: 10000 })
      .should('be.visible');

    cy.logToTerminal('✅ Verify legal address from registration');
    cy.contains('Legal Address').should('be.visible');
    cy.contains(companyRegistrationData.legalAddress.street).should('be.visible');
    cy.contains(companyRegistrationData.legalAddress.city).should('be.visible');
    cy.contains(companyRegistrationData.legalAddress.postcode).should('be.visible');

    cy.logToTerminal('✅ Verify contacts section');
    cy.contains('Contacts').should('be.visible');
    cy.contains('Company Administrator').should('be.visible');

    // Verify optional fields if provided
    if (companyRegistrationData.company.legalName) {
      cy.logToTerminal('✅ Verify legal name from registration');
      cy.contains(companyRegistrationData.company.legalName).should('be.visible');
    }

    if (companyRegistrationData.company.vatTaxId) {
      cy.logToTerminal('✅ Verify VAT/Tax ID from registration');
      cy.contains(companyRegistrationData.company.vatTaxId).should('be.visible');
    }

    if (companyRegistrationData.company.resellerId) {
      cy.logToTerminal('✅ Verify Reseller ID from registration');
      cy.contains(companyRegistrationData.company.resellerId).should('be.visible');
    }

    cy.logToTerminal('✅ TC-09: Storefront-created company profile displays correctly after activation');
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
      cy.then(() => {
        cy.contains(Cypress.env('testCompany').name).should('be.visible');
      });

      cy.logToTerminal('✅ Verify user role is displayed');
      cy.contains('Company Administrator').should('be.visible');

      cy.logToTerminal('✅ TC-11: Company info block displays for Admin');
    });
  });

  it('TC-11: Company info block displays on Account Information page for User', () => {
    cy.logToTerminal('========= 📋 TC-11: Verify company info block for User =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as regular company user');
      loginAsRegularUser();

      // After login, user is already on /customer/account - no need to navigate

      cy.logToTerminal('✅ Verify company information block exists');
      cy.get('.customer-company-info-card', { timeout: 10000 })
        .should('exist');

      cy.logToTerminal('✅ Verify company name is displayed');
      cy.then(() => {
        cy.contains(Cypress.env('testCompany').name).should('be.visible');
      });

      cy.logToTerminal('✅ TC-11: Company info block displays for regular User');
    });
  });

  // ==========================================================================
  // TC-12 (P0): Company Admin can edit Account Information and Legal Address
  // ==========================================================================

  it('TC-12: Company Admin can edit Account Information and Legal Address', () => {
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

      // --- Validation: Required fields ---
      cy.logToTerminal('📝 Clear company name to test required field validation');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .blur();

      cy.logToTerminal('💾 Try to save with empty required field');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();
      cy.wait(1000);

      cy.logToTerminal('✅ Verify form did not submit (still on edit form)');
      cy.get('.account-edit-company-profile-form').should('exist');

      // --- Validation: Special characters ---
      cy.logToTerminal('📝 Test special characters validation');
      cy.get('input[name="name"]')
        .should('be.visible')
        .clear()
        .type(invalidData.specialCharsCompanyName);

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

      // --- Successful edit ---
      cy.logToTerminal('📝 Update company name with valid data');
      cy.then(() => {
        const updatedName = `Updated ${Cypress.env('testCompany').name}`;
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
          .type('999 Updated Street')
          .blur();

        cy.logToTerminal('💾 Click Save');
        cy.contains('button', 'Save', { timeout: 5000 })
          .should('be.visible')
          .click();

        cy.logToTerminal('⏳ Wait for edit form to close (indicates save completed)');
        cy.get('.account-edit-company-profile-form', { timeout: 15000 })
          .should('not.exist');

        cy.logToTerminal('✅ Verify updated data is displayed');
        cy.contains('999 Updated Street', { timeout: 15000 })
          .should('exist');
        // Search for partial match since full name with timestamp might be truncated in UI
        cy.contains(/Updated Test Company/i, { timeout: 10000 })
          .should('exist');

        cy.logToTerminal('✅ TC-12: Admin successfully edited company profile');
      });
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
      cy.then(() => {
        cy.contains(Cypress.env('testCompany').name).should('be.visible');
      });

      cy.logToTerminal('✅ TC-13: User cannot edit (controls hidden)');
    });
  });

  // ==========================================================================
  // TC-14 (P1): Changes via REST API reflect on Storefront
  // SKIPPED: PUT /V1/company/{companyId} returns 404 on ACCS platform
  // The endpoint is documented but not implemented in ACCS environment
  // See: https://adobe-commerce-saas.redoc.ly/tag/companycompanyId#operation/PutV1CompanyCompanyId
  // ==========================================================================

  it.skip('TC-14: Changes via REST API reflect on Storefront', () => {
    cy.logToTerminal('========= 📋 TC-14: Verify backend changes sync to Storefront =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify original company name');
      cy.then(() => {
        cy.contains(Cypress.env('testCompany').name, { timeout: 10000 })
          .should('be.visible');
      });

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
 * Uses baseCompanyData fixture for all company and admin data.
 */
const setupTestCompanyAndAdmin = () => {
  cy.logToTerminal('🏢 Setting up test company and admin...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
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
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Store for cleanup (NEW OBJECT STRUCTURE)
    Cypress.env('currentTestCompanyEmail', uniqueCompanyEmail);
    Cypress.env('currentTestAdminEmail', uniqueAdminEmail);
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail,
    });

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
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueRegularUserEmail = `regular.${timestamp}.${randomStr}@example.com`;

    cy.logToTerminal('📝 Creating test company via REST API...');
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
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
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    cy.logToTerminal('👤 Creating regular company user...');
    const regularUser = await createCompanyUser({
      email: uniqueRegularUserEmail,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email}`);

    // Store for cleanup (NEW OBJECT STRUCTURE)
    Cypress.env('currentTestCompanyEmail', uniqueCompanyEmail);
    Cypress.env('currentTestAdminEmail', uniqueAdminEmail);
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail,
    });
    Cypress.env('testUsers', {
      regular: {
        email: uniqueRegularUserEmail,
        password: companyUsers.regularUser.password,
      },
    });
  });
};

/**
 * Login as company admin using stored credentials - NOW USING CUSTOM COMMAND.
 */
const loginAsCompanyAdmin = () => {
  cy.loginAsCompanyAdmin();
};

/**
 * Login as regular company user using stored credentials - NOW USING CUSTOM COMMAND.
 */
const loginAsRegularUser = () => {
  cy.loginAsRegularUser();
};
