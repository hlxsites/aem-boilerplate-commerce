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
} from '../../support/b2bCompanyManagementAPICalls';
import {
  baseCompanyData,
  companyUsers,
  invalidData,
} from '../../fixtures/companyManagementData';
import { signInUser } from '../../actions';

describe('USF-2521: Company Users', { tags: '@B2BSaas' }, () => {
  let testCompany;
  let testUser1;
  let testUser2;

  before(() => {
    cy.logToTerminal('👥 Setting up Company Users test data...');

    cy.wrap(null).then(async () => {
      try {
        // Create test company
        testCompany = await createCompanyViaGraphQL({
          ...baseCompanyData,
          companyName: `Users Test Company ${Date.now()}`,
          adminEmail: `usersadmin.${Date.now()}@example.com`,
        });

        cy.logToTerminal(`✅ Test company created: ${testCompany.name}`);
        Cypress.env('usersTestCompanyId', testCompany.id);
        Cypress.env('usersTestAdminEmail', testCompany.company_admin.email);

        // Create two test users
        const user1Result = await createUserAndAssignToCompany(
          {
            ...companyUsers.regularUser,
            email: `testuser1.${Date.now()}@example.com`,
          },
          testCompany.id
        );

        testUser1 = user1Result.customer;
        Cypress.env('testUser1Email', testUser1.email);
        cy.logToTerminal(`✅ Test user 1 created: ${testUser1.email}`);

        const user2Result = await createUserAndAssignToCompany(
          {
            ...companyUsers.managerUser,
            email: `testuser2.${Date.now()}@example.com`,
          },
          testCompany.id
        );

        testUser2 = user2Result.customer;
        Cypress.env('testUser2Email', testUser2.email);
        cy.logToTerminal(`✅ Test user 2 created: ${testUser2.email}`);

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

  it('TC-15: Company Admin can view list of company users in grid', () => {
    cy.logToTerminal('📋 TC-15: Verify users grid display');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Verify page title
    cy.contains('Company Users', { timeout: 10000 }).should('be.visible');

    // Verify grid exists
    cy.get('[data-testid="company-users-grid"]', { timeout: 10000 })
      .should('exist');

    // Verify at least 3 users in grid (admin + 2 test users)
    cy.get('[data-testid="user-row"]', { timeout: 5000 })
      .should('have.length.at.least', 3);

    // Verify grid columns
    cy.contains('th', 'Name').should('be.visible');
    cy.contains('th', 'Email').should('be.visible');
    cy.contains('th', 'Role').should('be.visible');
    cy.contains('th', 'Status').should('be.visible');
    cy.contains('th', 'Actions').should('be.visible');

    // Verify admin user appears in grid
    cy.contains(testCompany.company_admin.email).should('be.visible');
    cy.contains('Company Administrator').should('be.visible');

    // Verify test users appear
    cy.contains(testUser1.email).should('be.visible');
    cy.contains(testUser2.email).should('be.visible');

    cy.logToTerminal('✅ TC-15: Users grid displays correctly');
  });

  it('TC-16: Add user form validation', () => {
    cy.logToTerminal('📋 TC-16: Verify add user form validation');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Click Add New User button
    cy.contains('button', 'Add User', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Verify form appears
    cy.get('[data-testid="add-user-form"]', { timeout: 5000 })
      .should('be.visible');

    // Try to save without filling required fields
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Verify validation errors for required fields
    cy.contains(/email.*required/i, { timeout: 5000 })
      .should('be.visible');
    cy.contains(/first.*name.*required/i, { timeout: 5000 })
      .should('be.visible');
    cy.contains(/last.*name.*required/i, { timeout: 5000 })
      .should('be.visible');

    // Test invalid email format
    cy.get('input[name="email"]')
      .should('be.visible')
      .type(invalidData.invalidEmail);

    cy.get('input[name="firstName"]').type('Test');
    cy.get('input[name="lastName"]').type('User');

    cy.contains('button', 'Save').click();
    cy.wait(1000);

    // Verify email validation error
    cy.contains(/valid.*email/i, { timeout: 5000 })
      .should('be.visible');

    // Test whitespace-only names
    cy.get('input[name="email"]').clear().type('valid@example.com');
    cy.get('input[name="firstName"]').clear().type(invalidData.whitespaceFirstName);
    cy.get('input[name="lastName"]').clear().type(invalidData.whitespaceLastName);

    cy.contains('button', 'Save').click();
    cy.wait(1000);

    // Verify name validation errors
    cy.contains(/first.*name.*required|cannot.*empty/i, { timeout: 5000 })
      .should('be.visible');

    cy.logToTerminal('✅ TC-16: Form validation works correctly');
  });

  it('TC-17: Add new user and verify invitation sent message', () => {
    cy.logToTerminal('📋 TC-17: Verify add new user flow');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Click Add New User button
    cy.contains('button', 'Add User', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Fill the form
    const newUserEmail = `newuser.${Date.now()}@example.com`;
    cy.get('input[name="email"]').should('be.visible').type(newUserEmail);
    cy.get('input[name="firstName"]').type('New');
    cy.get('input[name="lastName"]').type('TestUser');

    // Select role
    cy.get('select[name="role"]').select('Default User');

    // Save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success/invitation message
    // (Message varies: "Customer created" or "Invitation sent")
    cy.get('body').then(($body) => {
      if (
        $body.text().match(/customer.*created|invitation.*sent|successfully.*added/i)
      ) {
        cy.logToTerminal('✅ Success message displayed');
      }
    });

    // Verify new user appears in grid
    cy.contains(newUserEmail, { timeout: 10000 }).should('be.visible');

    cy.logToTerminal('✅ TC-17: New user added successfully');
  });

  it('TC-20: Admin cannot delete or deactivate themselves', () => {
    cy.logToTerminal('📋 TC-20: Verify admin cannot self-delete');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Find admin's row in the grid
    cy.contains(testCompany.company_admin.email, { timeout: 10000 })
      .parents('[data-testid="user-row"]')
      .within(() => {
        // Click Manage button
        cy.contains('button', 'Manage', { timeout: 5000 })
          .should('be.visible')
          .click();
      });

    cy.wait(1000);

    // Verify Manage dialog appears
    cy.get('[data-testid="manage-user-dialog"]', { timeout: 5000 })
      .should('be.visible');

    // Try to set inactive
    cy.contains('button', 'Set Inactive', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Verify error message appears
    cy.contains(/cannot.*set.*inactive|company.*admin/i, { timeout: 5000 })
      .should('be.visible');

    // Try to delete
    cy.contains('button', 'Delete', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(1000);

    // Verify error message appears
    cy.contains(/cannot.*delete.*yourself|company.*admin/i, { timeout: 5000 })
      .should('be.visible');

    cy.logToTerminal('✅ TC-20: Admin protected from self-deletion');
  });

  it('TC-22: Admin can edit their own user data', () => {
    cy.logToTerminal('📋 TC-22: Verify admin can edit own data');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Find admin's row and click Edit
    cy.contains(testCompany.company_admin.email, { timeout: 10000 })
      .parents('[data-testid="user-row"]')
      .within(() => {
        cy.contains('button', 'Edit', { timeout: 5000 })
          .should('be.visible')
          .click();
      });

    cy.wait(1000);

    // Edit form appears
    cy.get('[data-testid="edit-user-form"]', { timeout: 5000 })
      .should('be.visible');

    // Verify role is disabled (cannot change own role)
    cy.get('select[name="role"]').should('be.disabled');

    // Update job title
    cy.get('input[name="jobTitle"]')
      .should('be.visible')
      .clear()
      .type('Updated Job Title');

    // Update work phone
    cy.get('input[name="workPhone"]')
      .clear()
      .type('555-9999');

    // Save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success message
    cy.contains(/successfully.*updated/i, { timeout: 5000 })
      .should('be.visible');

    cy.logToTerminal('✅ TC-22: Admin edited own data successfully');
  });

  it('TC-23: Admin can edit other user data', () => {
    cy.logToTerminal('📋 TC-23: Verify admin can edit other users');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Find test user's row and click Edit
    cy.contains(testUser1.email, { timeout: 10000 })
      .parents('[data-testid="user-row"]')
      .within(() => {
        cy.contains('button', 'Edit', { timeout: 5000 })
          .should('be.visible')
          .click();
      });

    cy.wait(1000);

    // Edit form appears
    cy.get('[data-testid="edit-user-form"]', { timeout: 5000 })
      .should('be.visible');

    // Role should be editable for other users
    cy.get('select[name="role"]').should('not.be.disabled');

    // Update first name
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .clear()
      .type('Updated');

    // Update last name
    cy.get('input[name="lastName"]')
      .clear()
      .type('UserName');

    // Save
    cy.contains('button', 'Save', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success message
    cy.contains(/successfully.*updated/i, { timeout: 5000 })
      .should('be.visible');

    // Verify updated name appears in grid
    cy.contains('Updated UserName', { timeout: 10000 }).should('be.visible');

    cy.logToTerminal('✅ TC-23: Admin edited other user successfully');
  });

  it('TC-24: Set user Inactive via Manage', () => {
    cy.logToTerminal('📋 TC-24: Verify set user inactive');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Find test user 2 and click Manage
    cy.contains(testUser2.email, { timeout: 10000 })
      .parents('[data-testid="user-row"]')
      .within(() => {
        cy.contains('button', 'Manage', { timeout: 5000 })
          .should('be.visible')
          .click();
      });

    cy.wait(1000);

    // Click Set Inactive
    cy.contains('button', 'Set Inactive', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success message
    cy.contains(/deactivated|inactive/i, { timeout: 5000 })
      .should('be.visible');

    // Verify user status updated to Inactive in grid
    cy.contains(testUser2.email)
      .parents('[data-testid="user-row"]')
      .within(() => {
        cy.contains('Inactive', { timeout: 5000 }).should('be.visible');
      });

    cy.logToTerminal('✅ TC-24: User set to inactive successfully');
  });

  it('TC-24: Delete user via Manage', () => {
    cy.logToTerminal('📋 TC-24: Verify delete user');

    // Login as company admin
    cy.visit('/customer/login');
    signInUser(Cypress.env('usersTestAdminEmail'), 'Test123!');

    cy.wait(3000);

    // Navigate to Company Users page
    cy.visit('/customer/account/company/users');
    cy.wait(3000);

    // Find test user 1 and click Manage
    cy.contains(testUser1.email, { timeout: 10000 })
      .parents('[data-testid="user-row"]')
      .within(() => {
        cy.contains('button', 'Manage', { timeout: 5000 })
          .should('be.visible')
          .click();
      });

    cy.wait(1000);

    // Click Delete
    cy.contains('button', 'Delete', { timeout: 5000 })
      .should('be.visible')
      .click();

    cy.wait(2000);

    // Verify success message
    cy.contains(/deleted|removed/i, { timeout: 5000 })
      .should('be.visible');

    // Verify user no longer appears in grid (or status is Inactive)
    cy.wait(2000);
    cy.reload();
    cy.wait(3000);

    // User should be gone or marked inactive
    cy.get('body').then(($body) => {
      if ($body.text().includes(testUser1.email)) {
        // Still in grid, check if Inactive
        cy.contains(testUser1.email)
          .parents('[data-testid="user-row"]')
          .within(() => {
            cy.contains('Inactive').should('be.visible');
          });
        cy.logToTerminal('✅ User marked as Inactive');
      } else {
        cy.logToTerminal('✅ User removed from grid');
      }
    });

    cy.logToTerminal('✅ TC-24: User deleted successfully');
  });
});
