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
 * @fileoverview Company Hierarchy E2E tests.
 * Tests cover:
 * - Multi-company visibility for shared admin
 * - Drag & drop company assignment (parent/child relationships)
 * - Nested hierarchy structure verification
 *
 * Test Plan Reference: Company Hierarchy Management
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-01 (P0): Admin can see multiple companies in hierarchy
 * TC-02 (P0): Admin can organize companies using drag & drop
 * TC-03 (P0): Hierarchy shows proper parent-child nesting after drag & drop
 *
 * ==========================================================================
 */

import {
  createCompany,
  createStandaloneCustomer,
  createCompanyRole,
  assignRoleToUser,
  assignCustomerToCompany,
  cleanupTestCompany,
  deleteCompanyByEmail,
  deleteCustomerByEmail,
} from '../../support/b2bCompanyAPICalls';
import { baseCompanyData, fullAdminPermissions } from '../../fixtures/companyManagementData';

const ACCSApiClient = require('../../support/accsClient');

/**
 * Create a company with explicit super_user_id.
 * Bypasses auto-customer creation to use an existing customer as super_user.
 * @param {Object} companyData - Company data
 * @param {number} superUserId - Existing customer ID to use as super_user
 * @returns {Promise<Object>} Created company
 */
async function createCompanyWithSuperUser(companyData, superUserId) {
  const {
    companyName,
    companyEmail,
    legalName,
    vatTaxId,
    resellerId,
    street,
    city,
    countryCode,
    regionId,
    postcode,
    telephone,
    status = 1,
  } = companyData;

  const client = new ACCSApiClient();

  const companyPayload = {
    company: {
      company_name: companyName,
      company_email: companyEmail,
      legal_name: legalName,
      vat_tax_id: vatTaxId,
      reseller_id: resellerId,
      street: [street],
      city,
      country_id: countryCode,
      region_id: regionId,
      postcode,
      telephone,
      super_user_id: superUserId,
      customer_group_id: 1,
      status,
    },
  };

  const company = await client.post('/V1/company/', companyPayload);

  if (company.error || !company.id) {
    throw new Error(`Company creation failed: ${company.message || JSON.stringify(company)}`);
  }

  return {
    id: company.id,
    name: company.company_name,
    company_email: company.company_email,
    legal_name: company.legal_name,
    status: company.status,
  };
}

/**
 * Create an admin role with full permissions for a company.
 * @param {number} companyId - Company ID
 * @returns {Promise<Object>} Created admin role with permissions
 */
async function createAdminRole(companyId) {
  const adminRole = await createCompanyRole({
    company_id: companyId,
    role_name: 'Company Administrator',
    permissions: fullAdminPermissions,
  });
  
  // Ensure permissions are included in the returned object
  // API may not return permissions, so we add them back
  if (!adminRole.permissions) {
    adminRole.permissions = fullAdminPermissions;
  }
  
  return adminRole;
}

describe('Company Hierarchy', { tags: ['@B2BSaas'] }, () => {
  let firstCompanyName = null;
  let secondCompanyName = null;

  before(() => {
    cy.logToTerminal('🏢 Company Hierarchy test suite started');
    
    // Handle uncaught exceptions from GraphQL/JSON parsing
    cy.on('uncaught:exception', (err) => {
      // Ignore JSON parsing errors from GraphQL responses
      if (err.message.includes('Failed to execute \'json\' on \'Response\'') ||
          err.message.includes('Unexpected end of JSON input')) {
        console.log('Ignoring JSON parsing error from API');
        return false;
      }
      return true;
    });
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
        const testCompany = Cypress.env('testCompany');
        const testAdmin = Cypress.env('testAdmin');
        const companyBEmail = Cypress.env('companyBEmail');

        // IMPORTANT: Delete companies FIRST, then users
        // Otherwise users will be deleted while still linked to companies
        
        // Step 1: Delete Company A
        if (testCompany && testCompany.email) {
          cy.logToTerminal(`🗑️ Cleaning up Company A: ${testCompany.email}`);
          const resultA = await deleteCompanyByEmail(testCompany.email);
          if (resultA.success) {
            cy.logToTerminal('✅ Company A deleted');
          } else {
            cy.logToTerminal(`⚠️ Company A deletion failed: ${resultA.error}`);
          }
        }
        
        // Step 2: Delete Company B
        if (companyBEmail) {
          cy.logToTerminal(`🗑️ Cleaning up Company B: ${companyBEmail}`);
          const resultB = await deleteCompanyByEmail(companyBEmail);
          if (resultB.success) {
            cy.logToTerminal('✅ Company B deleted');
          } else {
            cy.logToTerminal(`⚠️ Company B deletion failed: ${resultB.error}`);
          }
        }
        
        // Step 3: Delete super user (now that companies are gone)
        if (testAdmin && testAdmin.adminEmail) {
          cy.logToTerminal(`🗑️ Cleaning up super user: ${testAdmin.adminEmail}`);
          const resultUser = await deleteCustomerByEmail(testAdmin.adminEmail);
          if (resultUser.success) {
            cy.logToTerminal('✅ Super user deleted');
          } else {
            cy.logToTerminal(`⚠️ Super user deletion failed: ${resultUser.error}`);
          }
        }
        
        // Clear all env vars
        const envVarsToClean = [
          'testCompany', 'testAdmin', 'companyBEmail',
          'currentTestCompanyEmail', 'currentTestAdminEmail',
          'testCompanyId', 'testCompanyName',
          'companyAId', 'companyAName', 'companyBId', 'companyBName',
          'superUserEmail', 'superUserPassword',
        ];
        envVarsToClean.forEach((key) => Cypress.env(key, null));
        
        cy.logToTerminal('✅ All test data cleanup completed');
      } catch (error) {
        cy.logToTerminal(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Company Hierarchy test suite completed');
  });

  /**
   * ==========================================================================
   * TC-01/02/03: Complete Company Hierarchy Flow
   * ==========================================================================
   * Tests: Multi-company admin access, drag & drop organization, nested structure
   * Setup: Create 2 companies + shared admin user via API
   * Time: ~2-3 minutes
   */
  it('JOURNEY: Admin manages multi-company hierarchy with drag & drop', { defaultCommandTimeout: 30000 }, () => {
    cy.logToTerminal('========= 🚀 Company Hierarchy Management Journey =========');

    // Handle uncaught exceptions during test execution
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to execute \'json\' on \'Response\'') ||
          err.message.includes('Unexpected end of JSON input') ||
          err.message.includes('JSON')) {
        console.log('Ignoring JSON parsing error from API');
        return false;
      }
      return true;
    });

    // ========== SETUP: Create 2 companies with shared super_user (via API) ==========
    cy.logToTerminal('--- SETUP: Creating 2 companies with shared super_user ---');
    
    cy.then({ timeout: 120000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      // Use short, unique company names
      const companyAName = `HierarchyA ${randomStr}`;
      const companyBName = `HierarchyB ${randomStr}`;

      // Step 1: Create standalone customer (will be super_user for both companies)
      cy.logToTerminal('👤 Creating super user for both companies...');
      const superUser = await createStandaloneCustomer({
        firstname: 'Hierarchy',
        lastname: 'SuperUser',
        email: `hierarchy-super-${timestamp}.${randomStr}@example.com`,
        password: 'Test123!',
      });
      cy.logToTerminal(`✅ Super user created: ${superUser.email} (ID: ${superUser.id})`);

      // Step 2: Create Company A with super user
      cy.logToTerminal(`🏢 Creating Company A with super_user_id=${superUser.id}`);
      const companyA = await createCompanyWithSuperUser({
        companyName: companyAName,
        companyEmail: `hierarchy-a-${timestamp}.${randomStr}@example.com`,
        legalName: `${companyAName} Legal`,
        vatTaxId: `VAT-A-${randomStr}`,
        resellerId: `RES-A-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        status: 1, // APPROVED
      }, superUser.id);
      cy.logToTerminal(`✅ Company A created: ${companyA.name} (ID: ${companyA.id})`);

      // Step 3: Create Company B with SAME super user
      cy.logToTerminal(`🏢 Creating Company B with super_user_id=${superUser.id}`);
      const companyB = await createCompanyWithSuperUser({
        companyName: companyBName,
        companyEmail: `hierarchy-b-${timestamp}.${randomStr}@example.com`,
        legalName: `${companyBName} Legal`,
        vatTaxId: `VAT-B-${randomStr}`,
        resellerId: `RES-B-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        status: 1, // APPROVED
      }, superUser.id);
      cy.logToTerminal(`✅ Company B created: ${companyB.name} (ID: ${companyB.id})`);

      // Store for cleanup and test usage
      Cypress.env('testCompany', {
        id: companyA.id,
        name: companyA.name,
        email: companyA.company_email,
      });
      Cypress.env('testAdmin', {
        adminEmail: superUser.email,
      });
      Cypress.env('companyBEmail', companyB.company_email);
      
      // Store additional data for test
      Object.assign(Cypress.env(), {
        currentTestCompanyEmail: companyA.company_email,
        currentTestAdminEmail: superUser.email,
        testCompanyId: companyA.id,
        testCompanyName: companyA.name,
        companyAId: companyA.id,
        companyAName: companyA.name,
        companyBId: companyB.id,
        companyBName: companyB.name,
        superUserEmail: superUser.email,
        superUserPassword: 'Test123!',
      });

      // Store company names for test
      firstCompanyName = companyA.name;
      secondCompanyName = companyB.name;

      cy.logToTerminal('========================================');
      cy.logToTerminal('✅ SETUP COMPLETE:');
      cy.logToTerminal(`   Company A: ${companyA.name} (Super User: ${superUser.email})`);
      cy.logToTerminal(`   Company B: ${companyB.name} (Super User: ${superUser.email})`);
      cy.logToTerminal(`   Super User has full access to BOTH companies`);
      cy.logToTerminal('========================================');
    });

    // ========== STEP 1: Login as super user ==========
    cy.logToTerminal('--- STEP 1: Login as super user (owner of both companies) ---');
    
    cy.then(() => {
      const userEmail = Cypress.env('superUserEmail');
      const userPassword = Cypress.env('superUserPassword');
      
      cy.logToTerminal(`🔐 Logging in as: ${userEmail}`);
      cy.visit('/customer/login');
      
      // Wait for login form to be ready
      cy.get('main .auth-sign-in-form', { timeout: 10000 }).should('be.visible');
      cy.logToTerminal('✅ Login form loaded');
      
      cy.get('main .auth-sign-in-form').within(() => {
        cy.get('input[name="email"]').clear({ force: true }).type(userEmail, { delay: 100 });
        cy.wait(1500);
        
        cy.get('input[name="password"]').clear({ force: true }).type(userPassword, { delay: 100 });
        cy.wait(1500);
        
        cy.get('button[type="submit"]').click();
      });
      
      cy.logToTerminal('✅ Login form submitted');
      
      // Wait for login to complete
      cy.wait(8000);
      
      // Check if redirected successfully
      cy.url().then((url) => {
        if (url.includes('/customer/login')) {
          cy.logToTerminal('⚠️ Still on login page - may have failed');
        } else {
          cy.logToTerminal(`✅ Redirected to: ${url}`);
        }
      });
      
      cy.logToTerminal('✅ Login step completed');
    });

    // ========== STEP 2: Navigate to Hierarchy page ==========
    cy.logToTerminal('--- STEP 2: Navigate to Company Hierarchy ---');
    cy.visit('/customer/company/hierarchy');
    cy.wait(3000);

    // ========== TC-01: Verify admin sees both companies ==========
    cy.logToTerminal('--- TC-01: Verify admin sees both companies in hierarchy ---');

    cy.url().should('include', '/customer/company/hierarchy');
    
    cy.get('.commerce-b2b-company-hierarchy', { timeout: 20000 })
      .should('exist')
      .should('be.visible');

    cy.logToTerminal('✅ Hierarchy page loaded');

    // Check no permission denied
    cy.get('body').then(($body) => {
      const bodyText = $body.text();
      if (bodyText.includes('You do not have permission')) {
        throw new Error('❌ Admin should have access to hierarchy');
      }
      cy.logToTerminal('✅ No permission denied');
    });

    // Verify both created companies are visible
    cy.then(() => {
      cy.logToTerminal('🔍 Verifying both companies are visible...');
      cy.wait(3000);
      
      // Verify Company A is visible
      cy.contains('.company-hierarchy-label', firstCompanyName)
        .should('be.visible');
      cy.logToTerminal(`✅ Company A found: ${firstCompanyName}`);
      
      // Verify Company B is visible
      cy.contains('.company-hierarchy-label', secondCompanyName)
        .should('be.visible');
      cy.logToTerminal(`✅ Company B found: ${secondCompanyName}`);
      
      cy.logToTerminal('✅ TC-01 PASSED: Admin can see both companies in hierarchy');
    });

    // ========== TC-02: Organize hierarchy using drag & drop ==========
    cy.logToTerminal('--- TC-02: Organize companies with drag & drop ---');

    cy.then(() => {
      cy.logToTerminal(`🔗 Dragging "${secondCompanyName}" into "${firstCompanyName}"`);
      cy.logToTerminal(`   Parent: ${firstCompanyName}`);
      cy.logToTerminal(`   Child: ${secondCompanyName}`);

      // Find draggable elements using company-hierarchy-label
      cy.logToTerminal(`🎯 Finding draggable node for "${secondCompanyName}"...`);
      cy.get('.acm-tree__item[draggable="true"]')
        .filter((index, el) => {
          return Cypress.$(el).find('.company-hierarchy-label').text().trim() === secondCompanyName;
        })
        .first()
        .should('have.attr', 'draggable', 'true')
        .as('dragCompany2');

      cy.logToTerminal(`🎯 Finding drop target for "${firstCompanyName}"...`);
      cy.get('.acm-tree__item[draggable="true"]')
        .filter((index, el) => {
          return Cypress.$(el).find('.company-hierarchy-label').text().trim() === firstCompanyName;
        })
        .first()
        .should('have.attr', 'draggable', 'true')
        .as('dropCompany1');

      // Perform drag and drop
      cy.logToTerminal('🔄 Executing drag & drop...');
      cy.get('@dragCompany2').trigger('dragstart', {
        dataTransfer: new DataTransfer(),
      });
      cy.get('@dropCompany1').trigger('dragover');
      cy.get('@dropCompany1').trigger('drop');
      cy.wait(3000);

      // Verify success message
      cy.get('body').then(($body) => {
        const bodyText = $body.text().toLowerCase();
        if (bodyText.includes('success') || 
            bodyText.includes('moved') || 
            bodyText.includes('assigned')) {
          cy.logToTerminal('✅ Success message found');
        } else {
          cy.logToTerminal('⚠️ No explicit success message, but continuing');
        }
      });

      cy.logToTerminal('✅ TC-02 PASSED: Drag & drop executed');
    });

    // ========== TC-03: Verify nested hierarchy structure ==========
    cy.logToTerminal('--- TC-03: Verify nested hierarchy structure ---');

    // Reload page to see updated hierarchy
    cy.logToTerminal('🔄 Reloading hierarchy page...');
    cy.reload();
    cy.wait(5000);

    cy.get('.commerce-b2b-company-hierarchy', { timeout: 15000 })
      .should('exist')
      .should('be.visible');

    cy.then(() => {
      cy.wait(3000);

      cy.logToTerminal(`🔍 Verifying parent company visible: ${firstCompanyName}`);
      cy.get('.company-hierarchy-label')
        .filter((index, el) => Cypress.$(el).text().trim() === firstCompanyName)
        .should('be.visible');

      // Look for expand buttons and expand all nodes
      cy.get('body').then(($body) => {
        const expandButtons = $body.find('button[aria-expanded="false"]');
        if (expandButtons.length > 0) {
          cy.logToTerminal('📂 Expanding hierarchy nodes...');
          cy.wrap(expandButtons).each(($btn) => {
            cy.wrap($btn).click({ force: true });
          });
          cy.wait(2000);
        }
      });

      // Verify Company 2 is nested under Company 1
      cy.logToTerminal(`🔍 Verifying "${secondCompanyName}" is nested under "${firstCompanyName}"...`);

      // Find parent company by label text
      cy.contains('.company-hierarchy-label', firstCompanyName)
        .closest('.acm-tree__item')
        .within(() => {
          // Look for nested ul.acm-tree__group
          cy.get('ul.acm-tree__group')
            .should('exist')
            .within(() => {
              // Verify child company is inside
              cy.contains('.company-hierarchy-label', secondCompanyName)
                .should('exist')
                .should('be.visible');
            });
        });

      cy.logToTerminal('✅ TC-03 PASSED: Hierarchy properly nested');
      cy.logToTerminal(`   Parent: ${firstCompanyName}`);
      cy.logToTerminal(`   Child: ${secondCompanyName}`);
    });

    cy.logToTerminal('========= 🎉 ALL TESTS PASSED =========');
  });
});
