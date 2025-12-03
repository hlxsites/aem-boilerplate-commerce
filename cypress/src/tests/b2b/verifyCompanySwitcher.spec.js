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
  createCompanyViaGraphQL,
  createUserAndAssignToCompany,
  createCompanyRole,
} from '../../support/b2bCompanyManagementAPICalls';
import {
  baseCompanyData,
  companyUsers,
  roleData,
} from '../../fixtures/companyManagementData';
import { signInUser } from '../../actions';

describe('USF-2524: Company Switcher Context', { tags: '@B2BSaas' }, () => {
  let companyA;
  let companyB;
  let sharedUser;

  before(() => {
    cy.logToTerminal('🔄 Setting up Company Switcher test data...');

    cy.wrap(null).then(async () => {
      try {
        // Create Company A
        companyA = await createCompanyViaGraphQL({
          ...baseCompanyData,
          companyName: `Company A ${Date.now()}`,
          companyEmail: `companya.${Date.now()}@example.com`,
          adminEmail: `admincompanya.${Date.now()}@example.com`,
        });

        cy.logToTerminal(`✅ Company A created: ${companyA.name}`);
        Cypress.env('companyAId', companyA.id);
        Cypress.env('companyAName', companyA.name);
        Cypress.env('companyAAdminEmail', companyA.company_admin.email);

        // Create Company B
        companyB = await createCompanyViaGraphQL({
          ...baseCompanyData,
          companyName: `Company B ${Date.now()}`,
          companyEmail: `companyb.${Date.now()}@example.com`,
          adminEmail: `admincompanyb.${Date.now()}@example.com`,
          street: '456 Company B Street',
          city: 'Company B City',
        });

        cy.logToTerminal(`✅ Company B created: ${companyB.name}`);
        Cypress.env('companyBId', companyB.id);
        Cypress.env('companyBName', companyB.name);
        Cypress.env('companyBAdminEmail', companyB.company_admin.email);

        // Create shared user (Admin in Company A, Regular User in Company B)
        const sharedUserEmail = `shareduser.${Date.now()}@example.com`;

        // Add to Company A first (will be admin role by default for first company)
        const resultA = await createUserAndAssignToCompany(
          {
            firstname: 'Shared',
            lastname: 'User',
            email: sharedUserEmail,
            password: 'Test123!',
          },
          companyA.id
        );

        sharedUser = resultA.customer;
        Cypress.env('sharedUserEmail', sharedUserEmail);

        cy.logToTerminal(`✅ Shared user created: ${sharedUserEmail}`);

        // Add same user to Company B
        await createUserAndAssignToCompany(
          {
            firstname: 'Shared',
            lastname: 'User',
            email: sharedUserEmail,
            password: 'Test123!',
          },
          companyB.id
        );

        cy.logToTerminal('✅ User assigned to both companies');

        // Wait for indexing
        cy.wait(5000);
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

  it('TC-40: Switch company - My Company page updates', () => {
    cy.logToTerminal('📋 TC-40: Verify My Company page switches context');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company
    cy.visit('/customer/account/company');
    cy.wait(3000);

    // Verify company switcher exists
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .should('exist')
      .and('be.visible');

    // Select Company A
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyAName'));
    cy.wait(2000);

    // Verify Company A data is displayed
    cy.contains(Cypress.env('companyAName'), { timeout: 10000 })
      .should('be.visible');
    cy.contains(companyA.email).should('be.visible');
    cy.contains('123 Test Street').should('be.visible');

    // Switch to Company B
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyBName'));
    cy.wait(2000);

    // Verify Company B data is displayed
    cy.contains(Cypress.env('companyBName'), { timeout: 10000 })
      .should('be.visible');
    cy.contains(companyB.email).should('be.visible');
    cy.contains('456 Company B Street').should('be.visible');

    cy.logToTerminal('✅ TC-40: My Company page switches context correctly');
  });

  it('TC-40: Switch company - Company Users grid updates', () => {
    cy.logToTerminal('📋 TC-40: Verify Company Users grid switches context');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Verify company switcher exists
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .should('exist');

    // Select Company A
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyAName'));
    cy.wait(2000);

    // Verify Company A admin appears in grid
    cy.contains(companyA.company_admin.email, { timeout: 10000 })
      .should('be.visible');

    // Switch to Company B
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyBName'));
    cy.wait(2000);

    // Verify Company B admin appears in grid
    cy.contains(companyB.company_admin.email, { timeout: 10000 })
      .should('be.visible');

    // Company A admin should not be visible
    cy.contains(companyA.company_admin.email).should('not.exist');

    cy.logToTerminal('✅ TC-40: Company Users grid switches context correctly');
  });

  it('TC-40: Switch company - Company Structure updates', () => {
    cy.logToTerminal('📋 TC-40: Verify Company Structure switches context');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/account/company/structure');
    cy.wait(3000);

    // Verify company switcher exists
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .should('exist');

    // Select Company A
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyAName'));
    cy.wait(2000);

    // Verify Company A admin is root
    cy.get('[data-testid="structure-node"]', { timeout: 10000 })
      .first()
      .should('contain', companyA.company_admin.firstname);

    // Switch to Company B
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyBName'));
    cy.wait(2000);

    // Verify Company B admin is root
    cy.get('[data-testid="structure-node"]', { timeout: 10000 })
      .first()
      .should('contain', companyB.company_admin.firstname);

    // Company A admin should not be in structure
    cy.get('[data-testid="structure-node"]')
      .should('not.contain', companyA.company_admin.firstname);

    cy.logToTerminal('✅ TC-40: Company Structure switches context correctly');
  });

  it('TC-41: Admin in Company A sees edit controls', () => {
    cy.logToTerminal('📋 TC-41: Verify admin permissions in Company A');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company
    cy.visit('/customer/account/company');
    cy.wait(3000);

    // Select Company A (user is admin here)
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .select(Cypress.env('companyAName'));

    cy.wait(2000);

    // Verify Edit button is visible (admin can edit)
    cy.contains('button', 'Edit', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled');

    // Navigate to Company Users
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Verify Add User button is visible
    cy.contains('button', 'Add User', { timeout: 10000 })
      .should('be.visible')
      .and('not.be.disabled');

    // Verify Edit actions are available in grid
    cy.get('button:contains("Edit")', { timeout: 5000 })
      .should('exist')
      .and('be.visible');

    cy.logToTerminal('✅ TC-41: Admin controls visible in Company A');
  });

  it('TC-41: Switch to Company B (regular user) - Edit controls hidden', () => {
    cy.logToTerminal('📋 TC-41: Verify user permissions in Company B');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to My Company
    cy.visit('/customer/account/company');
    cy.wait(3000);

    // Select Company B (user is regular user here)
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .select(Cypress.env('companyBName'));

    cy.wait(2000);

    // Verify Edit button is NOT visible (regular user cannot edit)
    cy.contains('button', 'Edit').should('not.exist');

    // Navigate to Company Users
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Verify Add User button is disabled or hidden
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Add User")').length > 0) {
        cy.contains('button', 'Add User').should('be.disabled');
        cy.logToTerminal('✅ Add User button disabled');
      } else {
        cy.logToTerminal('✅ Add User button hidden');
      }
    });

    // Verify no Edit actions in grid for regular users
    cy.get('button:contains("Edit")').should('not.exist');

    cy.logToTerminal('✅ TC-41: User controls hidden/disabled in Company B');
  });

  it('TC-41: Roles & Permissions respect company context', () => {
    cy.logToTerminal('📋 TC-41: Verify Roles page switches context');

    // Login as shared user
    cy.visit('/customer/login');
    signInUser(Cypress.env('sharedUserEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Roles and Permissions
    cy.visit('/customer/account/company/roles');
    cy.wait(3000);

    // Verify company switcher exists
    cy.get('[data-testid="company-switcher"]', { timeout: 10000 })
      .should('exist');

    // Select Company A (user is admin - should see roles)
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyAName'));
    cy.wait(2000);

    // Verify roles grid is visible
    cy.contains('Company Roles & Permissions', { timeout: 10000 })
      .should('be.visible');

    cy.get('[data-testid="roles-grid"]', { timeout: 5000 })
      .should('exist');

    // Verify Add New Role button is visible
    cy.contains('button', 'Add New Role')
      .should('be.visible')
      .and('not.be.disabled');

    // Switch to Company B (user is regular user - limited/no access)
    cy.get('[data-testid="company-switcher"]').select(Cypress.env('companyBName'));
    cy.wait(2000);

    // User should have restricted access to roles
    cy.get('body').then(($body) => {
      if ($body.text().match(/access.*denied|permission/i)) {
        cy.logToTerminal('✅ Access denied message shown');
      } else {
        // Add button should be disabled
        cy.contains('button', 'Add New Role').should('be.disabled');
        cy.logToTerminal('✅ Add role button disabled');
      }
    });

    cy.logToTerminal('✅ TC-41: Roles page respects company context');
  });
});
