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

import {
  createCompanyViaREST,
  createUserAndAssignToCompanyViaREST,
} from '../../support/b2bCompanyManagementAPICalls';
import {
  baseCompanyData,
  companyUsers,
  invalidData,
} from '../../fixtures/companyManagementData';
import { signInUser } from '../../actions';

describe('USF-2525: Company Profile', { tags: '@B2BSaas' }, () => {
  let testCompany;
  let companyAdmin;
  let regularUser;

  before(() => {
    cy.logToTerminal('🏢 Setting up Company Profile test data...');

    // Create test company via REST API (creates active company with admin who can log in)
    cy.wrap(null).then(async () => {
      const localToken = Cypress.env('LOCAL_INTEGRATION_TOKEN');
      if (localToken) {
        cy.logToTerminal('🏠 Running in LOCAL mode');
      }
      try {
        const timestamp = Date.now();
        testCompany = await createCompanyViaREST({
          companyName: `Profile Test Company ${timestamp}`,
          companyEmail: `company.${timestamp}@test.local`,
          legalName: `Profile Test Company ${timestamp} LLC`,
          street: baseCompanyData.street,
          city: baseCompanyData.city,
          countryCode: baseCompanyData.countryCode,
          regionId: 12, // California region ID
          postcode: baseCompanyData.postcode,
          telephone: baseCompanyData.telephone,
          adminFirstName: 'Company',
          adminLastName: 'Admin',
          adminEmail: `admin.${timestamp}@test.local`,
          adminPassword: 'Test123!',
          status: 1 // Active
        });

        cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);
        Cypress.env('testCompanyId', testCompany.id);
        Cypress.env('testCompanyName', testCompany.name);
        
        // Store the admin credentials
        companyAdmin = testCompany.company_admin;
        Cypress.env('adminEmail', companyAdmin.email);
        Cypress.env('adminPassword', companyAdmin.password);
        cy.logToTerminal(`✅ Admin email: ${companyAdmin.email}`);

        // Create and assign regular user to the company via REST
        cy.logToTerminal('👤 Creating regular company user...');
        regularUser = await createUserAndAssignToCompanyViaREST({
          email: `user.${timestamp}@test.local`,
          firstname: 'Regular',
          lastname: 'User',
          password: 'Test123!'
        }, testCompany.id);
        Cypress.env('regularUserEmail', regularUser.email);
        cy.logToTerminal(`✅ Regular user created: ${regularUser.email}`);
      } catch (error) {
        cy.logToTerminal(`❌ Setup error: ${error.message}`);
        throw error;
      }
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  it('TC-07: Company created in Admin Panel displays correctly on My Company page', () => {
    cy.logToTerminal('📋 TC-07: Verify company profile display');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Verify company information sections exist
    cy.get('[data-testid="company-profile"]', { timeout: 10000 })
      .should('exist');

    // Verify company name
    cy.contains(Cypress.env('testCompanyName')).should('be.visible');

    // Verify company email
    cy.contains(baseCompanyData.companyEmail).should('be.visible');

    // Verify legal address section
    cy.contains('Legal Address').should('be.visible');
    cy.contains(baseCompanyData.street).should('be.visible');
    cy.contains(baseCompanyData.city).should('be.visible');

    // Verify contacts section
    cy.contains('Contacts').should('be.visible');
    cy.contains('Company Administrator').should('be.visible');

    cy.logToTerminal('✅ TC-07: Company profile displays correctly');
  });

  it('TC-11: Company info block displays on Account Information page for Admin', () => {
    cy.logToTerminal('📋 TC-11: Verify company info block for Admin');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Account page
    cy.visit('/customer/account');
    cy.wait(2000);

    // Verify company information block in Account Settings
    cy.get('[data-testid="account-information"]', { timeout: 10000 })
      .should('exist');

    // Verify company name is displayed
    cy.contains(Cypress.env('testCompanyName')).should('be.visible');

    // Verify user role is displayed
    cy.contains('Company Administrator').should('be.visible');

    // Verify job title if present
    if (baseCompanyData.adminJobTitle) {
      cy.contains(baseCompanyData.adminJobTitle).should('be.visible');
    }

    cy.logToTerminal('✅ TC-11: Company info block displays for Admin');
  });

  it('TC-11: Company info block displays on Account Information page for User', () => {
    cy.logToTerminal('📋 TC-11: Verify company info block for User');

    // Login as regular user
    cy.visit('/customer/login');
    signInUser(Cypress.env('regularUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Account page
    cy.visit('/customer/account');
    cy.wait(2000);

    // Verify company information block exists
    cy.get('[data-testid="account-information"]', { timeout: 10000 })
      .should('exist');

    // Verify company name is displayed
    cy.contains(Cypress.env('testCompanyName')).should('be.visible');

    // Verify user role is displayed (should be Default User)
    cy.contains('Default User').should('be.visible');

    // Verify job title is NOT displayed for regular users
    if (baseCompanyData.adminJobTitle) {
      cy.contains(baseCompanyData.adminJobTitle).should('not.exist');
    }

    cy.logToTerminal('✅ TC-11: Company info block displays for User');
  });

  it('TC-12: Company Admin can edit Account Information and Legal Address', () => {
    cy.logToTerminal('📋 TC-12: Verify admin can edit company profile');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Click Edit button
    cy.contains('button', 'Edit', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Edit form should appear
    cy.get('[data-testid="company-edit-form"]', { timeout: 5000 })
      .should('be.visible');

    // Update company name
    const updatedName = `Updated ${Cypress.env('testCompanyName')}`;
    cy.get('input[name="companyName"]')
      .should('be.visible')
      .clear()
      .type(updatedName);

    // Update legal name
    cy.get('input[name="legalName"]')
      .should('be.visible')
      .clear()
      .type('Updated Legal Name LLC');

    // Update street address
    cy.get('input[name="street"]')
      .should('be.visible')
      .clear()
      .type('999 Updated Street');

    // Click Save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success message or updated data
    cy.contains(updatedName, { timeout: 10000 }).should('be.visible');
    cy.contains('999 Updated Street').should('be.visible');

    cy.logToTerminal('✅ TC-12: Admin successfully edited company profile');
  });

  it('TC-13: Company User with Default User role can view but not edit profile', () => {
    cy.logToTerminal('📋 TC-13: Verify user cannot edit company profile');

    // Login as regular user
    cy.visit('/customer/login');
    signInUser(Cypress.env('regularUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Verify company profile is visible
    cy.get('[data-testid="company-profile"]', { timeout: 10000 })
      .should('exist');

    // Verify Edit button is NOT visible
    cy.contains('button', 'Edit').should('not.exist');

    // Verify company information is displayed (read-only)
    cy.contains(Cypress.env('testCompanyName')).should('be.visible');

    cy.logToTerminal('✅ TC-13: User cannot edit (controls hidden)');
  });

  it('Edit form validates required fields', () => {
    cy.logToTerminal('📋 Validating required fields on edit form');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Click Edit button
    cy.contains('button', 'Edit', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Clear company name (required field)
    cy.get('input[name="companyName"]')
      .should('be.visible')
      .clear();

    // Try to save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Verify validation error appears
    cy.contains(/company name.*required/i, { timeout: 5000 })
      .should('be.visible');

    // Test whitespace only
    cy.get('input[name="companyName"]')
      .clear()
      .type('     '); // Only spaces

    cy.contains('button', 'Save').click();

    cy.wait(1000);

    // Should show validation error
    cy.contains(/company name.*required|cannot.*empty|invalid/i, { timeout: 5000 })
      .should('be.visible');

    cy.logToTerminal('✅ Required field validation works');
  });

  it('Edit form validates special characters', () => {
    cy.logToTerminal('📋 Validating special characters on edit form');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Click Edit button
    cy.contains('button', 'Edit', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Try to enter special characters that should be blocked or sanitized
    cy.get('input[name="companyName"]')
      .should('be.visible')
      .clear()
      .type(invalidData.specialCharsCompanyName);

    // Try to save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Either validation error should appear OR value should be sanitized
    // Check if error message appears
    cy.get('body').then(($body) => {
      if ($body.text().match(/invalid.*character|not.*allowed/i)) {
        cy.logToTerminal('✅ Special characters blocked by validation');
      } else {
        // Value might have been sanitized - check that script tags aren't in DOM
        cy.get('body').should('not.contain', '<script>');
        cy.logToTerminal('✅ Special characters sanitized');
      }
    });

    cy.logToTerminal('✅ Special character validation works');
  });

  it('TC-14: Changes via REST API reflect on Storefront', () => {
    cy.logToTerminal('📋 TC-14: Verify backend changes sync to Storefront');

    // Login as company admin first to get current state
    cy.visit('/customer/login');
    signInUser(Cypress.env('adminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company page
    cy.visit('/customer/account/company');
    cy.wait(2000);

    // Verify original company name
    cy.contains(Cypress.env('testCompanyName'), { timeout: 10000 })
      .should('be.visible');

    // Update company via REST API (simulating Admin Panel change)
    cy.wrap(null).then(async () => {
      try {
        const { updateCompanyProfile } = require('../../support/b2bCompanyManagementAPICalls');
        
        const updatedName = `Backend Updated ${Date.now()}`;
        const updatedLegalName = `Backend Legal ${Date.now()}`;
        
        await updateCompanyProfile(Cypress.env('testCompanyId'), {
          company_name: updatedName,
          legal_name: updatedLegalName,
        });

        Cypress.env('updatedCompanyName', updatedName);
        Cypress.env('updatedLegalName', updatedLegalName);
        
        cy.logToTerminal(`✅ Company updated via REST API: ${updatedName}`);
      } catch (error) {
        cy.logToTerminal(`❌ REST API update error: ${error.message}`);
        throw error;
      }
    });

    cy.wait(3000); // Wait for indexing

    // Reload page to see changes
    cy.reload();
    cy.wait(3000);

    // Verify updated company name appears
    cy.contains(Cypress.env('updatedCompanyName'), { timeout: 15000 })
      .should('be.visible');

    // Verify updated legal name appears
    cy.contains(Cypress.env('updatedLegalName'), { timeout: 10000 })
      .should('be.visible');

    cy.logToTerminal('✅ TC-14: Backend changes successfully reflected on Storefront');
  });

  after(() => {
    // Token manager will be restored automatically on next test run
    // No cleanup needed for inline mock
  });
});
