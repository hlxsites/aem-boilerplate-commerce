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
import { baseCompanyData } from '../../fixtures/companyManagementData';
import { login } from '../../actions';

/**
 * Basic Company Profile test - single focused test for faster iteration
 * Tests: Company creation via REST API + Admin login + Profile display
 */
describe('Company Profile - Basic Test', { tags: '@B2BSaas' }, () => {
  let testCompany;
  let companyAdmin;

  before(() => {
    cy.logToTerminal('🏢 Setting up Company Profile test data...');

    cy.wrap(null).then(async () => {
      const localToken = Cypress.env('LOCAL_INTEGRATION_TOKEN');
      if (localToken) {
        cy.logToTerminal('🏠 Running in LOCAL mode with integration token');
      }

      try {
        const timestamp = Date.now();
        
        // Create company via REST API (active status, admin can login immediately)
        testCompany = await createCompanyViaREST({
          companyName: `Test Company ${timestamp}`,
          companyEmail: `company.${timestamp}@test.local`,
          legalName: `Test Company ${timestamp} LLC`,
          street: baseCompanyData.street,
          city: baseCompanyData.city,
          countryCode: baseCompanyData.countryCode,
          regionId: 12, // California
          postcode: baseCompanyData.postcode,
          telephone: baseCompanyData.telephone,
          adminFirstName: 'Company',
          adminLastName: 'Admin',
          adminEmail: `admin.${timestamp}@test.local`,
          adminPassword: 'Test123!',
          status: 1 // Active
        });

        cy.logToTerminal(`✅ Company created: ${testCompany.name} (ID: ${testCompany.id})`);
        
        companyAdmin = testCompany.company_admin;
        Cypress.env('testCompanyId', testCompany.id);
        Cypress.env('testCompanyName', testCompany.name);
        Cypress.env('adminEmail', companyAdmin.email);
        Cypress.env('adminPassword', companyAdmin.password);
        
        cy.logToTerminal(`✅ Admin: ${companyAdmin.email}`);

      } catch (error) {
        cy.logToTerminal(`❌ Setup error: ${error.message}`);
        throw error;
      }
    });
  });

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('graphql');
    
    // Ignore uncaught exceptions from dropin import errors
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to resolve module specifier')) {
        cy.logToTerminal(`⚠️ Ignoring dropin import error: ${err.message}`);
        return false; // Don't fail the test
      }
      return true;
    });
  });

  it('TC-07: Company Admin can login and view company profile', () => {
    cy.logToTerminal('📋 TC-07: Testing company admin login and profile view');

    const adminEmail = Cypress.env('adminEmail');
    const adminPassword = Cypress.env('adminPassword');
    const companyName = Cypress.env('testCompanyName');

    // Use existing login action (same as Purchase Orders tests)
    const urls = Cypress.env('poUrls');
    const user = { email: adminEmail, password: adminPassword };
    
    cy.logToTerminal(`🔐 Logging in as: ${adminEmail}`);
    login(user, urls);
    cy.logToTerminal('✅ User is logged in');

    // Navigate to company profile page (same pattern as other B2B tests)
    cy.visit('/customer/account/company');
    cy.wait(3000);
    
    // Check current URL
    cy.url().then((url) => {
      cy.logToTerminal(`📍 Current URL: ${url}`);
    });
    
    // Wait for page to load (check for company name)
    cy.contains(companyName, { timeout: 15000 }).should('be.visible');
    cy.logToTerminal(`✅ Company name "${companyName}" is visible on profile page`);
  });
});

