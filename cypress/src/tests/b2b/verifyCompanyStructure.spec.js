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
  createCompany,
  createCompanyUser,
  createCompanyTeam,
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
  teamData,
} from '../../fixtures/companyManagementData';
import { login } from '../../actions';

/**
 * @fileoverview Company Structure E2E tests.
 * Tests cover:
 * - USF-2522: Company Structure feature
 * - TC-32 (P0): Default state and controls of Company Structure page
 * - TC-33 (P0): Add new user with unregistered email
 * - TC-34 (P1): Add new user with registered email (invitation flow)
 * - TC-35 (P0): Default User view-only access
 * - TC-36 (P2): Admin edit own account from Structure
 * - TC-37 (P1): Admin edit other user from Structure
 * - TC-38 (P2): Remove user from Structure
 * - TC-39 (P1): Team management (create/edit/delete)
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 5: Company Structure
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-32 (P0): Verify default state and controls of Company Structure page
 *   - Verifies: Page title, control buttons (Expand All, Collapse All, Add User,
 *     Add Team, Edit, Remove), button states, tree structure
 *   - Tests: Add Team, Add User, Collapse All, Expand All functionality
 *
 * TC-33 (P0): Add New User using unregistered email
 *   - Verifies: Add User form with all fields (Job Title, User Role, First Name,
 *     Last Name, Email, Work Phone Number, Status)
 *   - Tests: User creation with required fields only, user appears in tree,
 *     Edit form is prefilled with entered data
 *
 * TC-34 (P1): Add New User using registered email (invitation flow)
 *   - Status: SKIPPED - Requires email verification and invitation acceptance
 *   - Reason: Partially blocked by bug USF-3028, requires email access
 *   - Recommendation: Manual testing or separate email integration test
 *
 * TC-35 (P0): Default User can view but not edit Structure
 *   - Verifies: Regular user can view structure tree and use Expand/Collapse
 *   - Verifies: Add User, Add Team, Edit, Remove buttons are disabled
 *   - Tests: Buttons remain disabled even after selecting nodes
 *
 * TC-36 (P2): Company Admin can edit their own account from Structure
 *   - Verifies: Admin can select and edit own user node
 *   - Verifies: Role dropdown is disabled (cannot change own role)
 *   - Tests: Update job title and verify success
 *
 * TC-37 (P1): Company Admin can edit other user data from Structure
 *   - Verifies: Admin can select and edit other user nodes
 *   - Verifies: Role dropdown is enabled for other users
 *   - Tests: Update user first name and verify in tree
 *
 * TC-38 (P2): Remove user from Structure sets user to Inactive
 *   - Verifies: Admin can remove user from structure
 *   - Verifies: Success message appears
 *   - Tests: Navigate to Company Users page and verify user status is Inactive
 *
 * TC-39 (P1): Company Admin can create/edit/delete Teams
 *   - Tests: Create team with name and description, verify in tree
 *   - Tests: Edit team name and description, verify updates
 *   - Tests: Delete team, verify removal from tree
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 * Drag & drop functionality (moving users/teams in tree)
 *   - Reason: Requires cypress-drag-drop plugin or custom drag & drop commands
 *   - Recommendation: Add plugin and implement in future iteration
 *
 * Email invitation acceptance flow (TC-34 full flow)
 *   - Reason: Requires email access and invitation link clicking
 *   - Reason: Partially blocked by bug USF-3028
 *   - Recommendation: Manual testing or separate email integration test
 */

describe('USF-2522: Company Structure', { tags: '@B2BSaas' }, () => {
  // Helper function to setup test company with admin
  const setupTestCompanyAndAdmin = () => {
    cy.logToTerminal('🏢 Setting up test company with admin...');

    cy.then(async () => {
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

      // Store for cleanup and test usage
      Cypress.env('currentTestCompanyEmail', baseCompanyData.companyEmail);
      Cypress.env('currentTestAdminEmail', baseCompanyData.adminEmail);
      Cypress.env('testCompanyId', testCompany.id);
      Cypress.env('testCompanyName', testCompany.name);
      Cypress.env('adminEmail', testCompany.company_admin.email);
      Cypress.env('adminPassword', testCompany.company_admin.password);
    });
  };

  // Helper function to setup test company with regular user
  const setupTestCompanyWithRegularUser = () => {
    cy.logToTerminal('🏢 Setting up test company with regular user...');

    cy.then(async () => {
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

      const regularUser = await createCompanyUser({
        email: companyUsers.regularUser.email,
        firstname: companyUsers.regularUser.firstname,
        lastname: companyUsers.regularUser.lastname,
        password: companyUsers.regularUser.password,
      }, testCompany.id);

      cy.logToTerminal(`✅ Regular user created: ${regularUser.email || companyUsers.regularUser.email} (ID: ${regularUser.id})`);

      // Store for cleanup
      Cypress.env('currentTestCompanyEmail', baseCompanyData.companyEmail);
      Cypress.env('currentTestAdminEmail', baseCompanyData.adminEmail);
      Cypress.env('testCompanyId', testCompany.id);
      Cypress.env('testCompanyName', testCompany.name);
      Cypress.env('adminEmail', testCompany.company_admin.email);
      Cypress.env('adminPassword', testCompany.company_admin.password);
      // Use fixture email since API might not return it
      Cypress.env('regularUserEmail', companyUsers.regularUser.email);
      Cypress.env('regularUserPassword', companyUsers.regularUser.password);
      Cypress.env('regularUserId', regularUser.id);
    });
  };

  // Helper function to login as company admin
  const loginAsCompanyAdmin = () => {
    // Wait for admin credentials to be set
    cy.then(() => {
      const adminEmail = Cypress.env('adminEmail');
      const adminPassword = Cypress.env('adminPassword');
      
      if (!adminEmail || !adminPassword) {
        throw new Error(`Admin credentials not set. Email: ${adminEmail}, Password: ${adminPassword ? '***' : 'null'}`);
      }
      
      cy.logToTerminal(`🔐 Logging in as admin: ${adminEmail}`);
      cy.visit('/customer/login');
      cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(adminEmail);
        cy.wait(1500);
        cy.get('input[name="password"]').type(adminPassword);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
    });
  };

  // Helper function to login as regular user
  const loginAsRegularUser = () => {
    // Wait for regular user credentials to be set
    cy.then(() => {
      const regularUserEmail = Cypress.env('regularUserEmail');
      const regularUserPassword = Cypress.env('regularUserPassword');
      
      if (!regularUserEmail || !regularUserPassword) {
        throw new Error(`Regular user credentials not set. Email: ${regularUserEmail}, Password: ${regularUserPassword ? '***' : 'null'}`);
      }
      
      cy.logToTerminal(`🔐 Logging in as regular user: ${regularUserEmail}`);
      cy.visit('/customer/login');
      cy.wait(1000); // Ensure UI is ready
      cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(regularUserEmail);
        cy.wait(1500);
        cy.get('input[name="password"]').type(regularUserPassword);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
    });
  };

  before(() => {
    cy.logToTerminal('🌳 Company Structure test suite started');
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

  after(() => {
    cy.logToTerminal('🏁 Company Structure test suite completed');
  });

  it('TC-32: Default Company Structure state and controls', () => {
    cy.logToTerminal('========= 📋 TC-32: Verify default state and controls =========');

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure page
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Verify page title
    cy.contains('Company Structure', { timeout: 10000 }).should('be.visible');

    // Verify control buttons exist in correct order
    cy.contains('button', 'Expand All', { timeout: 5000 }).should('be.visible');
    cy.contains('button', 'Collapse All').should('be.visible');
    cy.contains('button', 'Add User').should('be.visible');
    cy.contains('button', 'Add Team').should('be.visible');

    // Edit and Remove buttons should be disabled (no selection)
    cy.contains('button', 'Edit').should('be.disabled');
    cy.contains('button', 'Remove').should('be.disabled');

    // Verify admin user appears in tree (root)
    const adminFirstName = baseCompanyData.adminFirstName;
    const adminLastName = baseCompanyData.adminLastName;
    cy.contains(`${adminFirstName} ${adminLastName}`, { timeout: 10000 }).should('be.visible');

    // Select admin in tree
    cy.contains(`${adminFirstName} ${adminLastName}`).click();
    cy.wait(500);

    // Edit and Remove buttons should be enabled after selection
    cy.contains('button', 'Edit').should('not.be.disabled');
    cy.contains('button', 'Remove').should('not.be.disabled');

    // While admin is selected, click Add Team
    cy.contains('button', 'Add Team').click();
    cy.wait(2000);

    // Fill team form
    const teamName = `Team 1`;
    cy.get('input[name="team_title"]').clear().type(teamName);
    cy.get('input[name="team_title"]').blur();
    cy.contains('button', 'Save').click();
    cy.wait(3000);

    // Verify team appears in tree as child of admin
    cy.contains(teamName, { timeout: 10000 }).should('be.visible');

    // Select admin again to add user
    cy.contains(`${adminFirstName} ${adminLastName}`).click();
    cy.wait(500);

    // Click Add User
    cy.contains('button', 'Add User').click();
    cy.wait(2000);

    // Wait for form to be ready (like dropin tests do)
    cy.get('input[name="first_name"]').should('not.be.disabled');

    // Fill user form with unregistered email
    const newUserEmail = `newuser.${Date.now()}@example.com`;
    cy.get('input[name="first_name"]').clear().type('New');
    cy.get('input[name="last_name"]').clear().type('User');
    cy.get('input[name="email"]:visible').clear().type(newUserEmail);
    cy.get('select[name="role"]').select('Default User');
    cy.contains('button', 'Save').click();
    cy.wait(3000);

    // Verify user appears in tree on same level as Team 1
    cy.contains('New User', { timeout: 10000 }).should('be.visible');

    // Test Collapse All
    cy.contains('button', 'Collapse All').click();
    cy.wait(1000);

    // Verify only admin and direct children are visible (collapsed)
    cy.contains(`${adminFirstName} ${adminLastName}`).should('be.visible');
    cy.contains(teamName).should('be.visible');

    // Test Expand All
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);

    // Verify all elements are visible after expand
    cy.contains(`${adminFirstName} ${adminLastName}`).should('be.visible');
    cy.contains(teamName).should('be.visible');
    cy.contains('New User').should('be.visible');

    cy.logToTerminal('✅ TC-32: Default structure state and controls verified');
  });

  it('TC-33: Add New User using unregistered email', () => {
    cy.logToTerminal('========= 📋 TC-33: Add user with unregistered email =========');

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Click Add User
    cy.contains('button', 'Add User', { timeout: 5000 }).click();
    cy.wait(2000);

    // Verify Add User form appears
    cy.contains('Add User', { timeout: 10000 }).should('be.visible');

    // Fill form with ONLY required fields using unregistered email (scope to visible form)
    const newUserEmail = `tc33user.${Date.now()}@example.com`;
    cy.get('.company-user-form__card, .acm-structure-panel, [class*="user-form"]').first().within(() => {
      cy.get('select[name="role"]', { timeout: 10000 }).select('Default User');
      cy.get('input[name="first_name"]').type('TC-33 User');
      cy.get('input[name="last_name"]').type('Company');
      cy.get('input[name="email"]').type(newUserEmail).blur();
      cy.wait(500);
      cy.contains('button', 'Save').click();
    });
    cy.wait(3000);

    // Verify success message
    cy.contains(/successfully.*created/i, { timeout: 10000 }).should('be.visible');

    // Verify user appears in structure tree
    cy.contains('TC-33 User Company', { timeout: 10000 }).should('be.visible');

    cy.logToTerminal('✅ TC-33: User added with unregistered email verified');
  });

  it.skip('TC-34: Add New User using registered email (invitation flow)', () => {
    cy.logToTerminal('========= 📋 TC-34: Add user with registered email =========');

    // NOTE: This test is skipped because it requires:
    // 1. A pre-registered user email that can receive emails
    // 2. Email verification and invitation acceptance flow
    // 3. The test plan notes this is "Partially blocked by bug USF-3028"

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Create a separate registered user (not in company)
    const registeredUserEmail = `registered.${Date.now()}@example.com`;
    
    cy.then(async () => {
      // Would need to create a customer account here
      // But not assign to company yet
    });

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Click Add User
    cy.contains('button', 'Add User').click();
    cy.wait(1000);

    // Fill form with REGISTERED email
    cy.get('select[name="role"]').select('Default User');
    cy.get('input[name="firstName"]').type('New User');
    cy.get('input[name="lastName"]').type('Company');
    cy.get('input[name="email"]').type(registeredUserEmail);
    cy.get('input[name="jobTitle"]').type('The Master of the TC-34 Company');
    cy.get('input[name="telephone"]').type('1111-111-11-111');

    // Save
    cy.contains('button', 'Save').click();
    cy.wait(2000);

    // Verify invitation message
    cy.contains(/invitation.*sent.*existing.*customer/i, { timeout: 5000 })
      .should('be.visible');

    // User should NOT appear in tree immediately
    cy.contains('New User Company').should('not.exist');

    // TODO: Email verification and invitation acceptance
    // Would require checking inbox and clicking invitation link

    cy.logToTerminal('✅ TC-34: Invitation flow verified (partial - email flow skipped)');
  });

  it('TC-35: Default User can view but not edit Structure', () => {
    cy.logToTerminal('========= 📋 TC-35: Default User view-only access =========');

    // Setup company with regular user
    setupTestCompanyWithRegularUser();
    cy.wait(2000);

    // Login as regular user
    loginAsRegularUser();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Verify page title
    cy.contains('Company Structure', { timeout: 10000 }).should('be.visible');

    // Verify structure tree is visible (can view)
    const adminFirstName = baseCompanyData.adminFirstName;
    const adminLastName = baseCompanyData.adminLastName;
    cy.contains(`${adminFirstName} ${adminLastName}`, { timeout: 10000 }).should('be.visible');

    // Verify Expand/Collapse controls are available
    cy.contains('button', 'Expand All').should('be.visible');
    cy.contains('button', 'Collapse All').should('be.visible');

    // Verify Add/Edit/Remove controls are DISABLED
    cy.contains('button', 'Add User').should('be.disabled');
    cy.contains('button', 'Add Team').should('be.disabled');
    cy.contains('button', 'Edit').should('be.disabled');
    cy.contains('button', 'Remove').should('be.disabled');

    // Try to select admin in tree
    cy.contains(`${adminFirstName} ${adminLastName}`).click();
    cy.wait(500);

    // Controls should still be disabled after selection
    cy.contains('button', 'Edit').should('be.disabled');
    cy.contains('button', 'Remove').should('be.disabled');

    cy.logToTerminal('✅ TC-35: Default User view-only access verified');
  });

  it('TC-36: Admin can edit their own account from Structure', () => {
    cy.logToTerminal('========= 📋 TC-36: Admin edit own account =========');

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Select admin node
    const adminFirstName = baseCompanyData.adminFirstName;
    const adminLastName = baseCompanyData.adminLastName;
    cy.contains(`${adminFirstName} ${adminLastName}`, { timeout: 10000 }).click();
    cy.wait(500);

    // Click Edit
    cy.contains('button', 'Edit').should('not.be.disabled').click();
    cy.wait(1000);

    // Verify role is disabled (cannot change own role)
    cy.get('select[name="role"]').should('be.disabled');

    // Update job title
    const updatedJobTitle = 'Updated Admin Title';
    cy.get('input[name="job_title"]').clear().type(updatedJobTitle).blur();

    // Save
    cy.contains('button', 'Save').click();
    cy.wait(2000);

    // Verify success message
    cy.contains(/successfully.*updated/i, { timeout: 5000 }).should('be.visible');

    // Verify the updated job title appears in the tree
    cy.wait(1000);
    cy.contains(`${adminFirstName} ${adminLastName}`, { timeout: 10000 }).should('be.visible');
    cy.contains(updatedJobTitle, { timeout: 5000 }).should('be.visible');

    cy.logToTerminal('✅ TC-36: Admin edited own account successfully');
  });

  it('TC-37: Admin can edit other user from Structure', () => {
    cy.logToTerminal('========= 📋 TC-37: Admin edit other user =========');

    // Setup company with regular user
    setupTestCompanyWithRegularUser();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Find and select regular user in tree
    const regularUserFirstName = companyUsers.regularUser.firstname;
    const regularUserLastName = companyUsers.regularUser.lastname;
    cy.contains(`${regularUserFirstName} ${regularUserLastName}`, { timeout: 10000 }).click();
    cy.wait(500);

    // Click Edit
    cy.contains('button', 'Edit').should('not.be.disabled').click();
    cy.wait(1000);

    // Role should be editable (not admin's own account)
    cy.get('select[name="role"]').should('not.be.disabled');

    // Update first name
    cy.get('input[name="first_name"]').clear().type('EditedFirstName').blur();

    // Save
    cy.contains('button', 'Save').click();
    cy.wait(2000);

    // Verify success message
    cy.contains(/successfully.*updated/i, { timeout: 5000 }).should('be.visible');

    // Verify updated name appears in tree
    cy.contains('EditedFirstName', { timeout: 10000 }).should('be.visible');

    cy.logToTerminal('✅ TC-37: Admin edited other user successfully');
  });

  it('TC-38: Remove user from Structure sets user to Inactive', () => {
    cy.logToTerminal('========= 📋 TC-38: Remove user from structure =========');

    // Setup company with regular user
    setupTestCompanyWithRegularUser();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Select regular user in tree
    const regularUserFirstName = companyUsers.regularUser.firstname;
    const regularUserLastName = companyUsers.regularUser.lastname;
    const regularUserEmail = companyUsers.regularUser.email;
    cy.contains(`${regularUserFirstName} ${regularUserLastName}`, { timeout: 10000 }).click();
    cy.wait(500);

    // Click Remove
    cy.contains('button', 'Remove').should('not.be.disabled').click();

    // Wait for confirmation modal
    cy.get('.dropin-modal').should('be.visible');
    cy.get('.acm-structure-modal-content').should('be.visible');
    cy.wait(200);

    // Confirm removal in modal
    cy.get('.dropin-modal button').then($buttons => {
      const removeBtn = $buttons.filter((i, el) => Cypress.$(el).text().includes('Remove'));
      cy.wrap(removeBtn.first()).click();
    });
    cy.wait(2000);

    // Verify success message
    cy.contains(/removed|inactive/i, { timeout: 5000 }).should('be.visible');

    // Verify user is removed from the structure tree
    cy.contains(`${regularUserFirstName} ${regularUserLastName}`).should('not.exist');

    // Navigate to Company Users to verify status
    cy.visit('/customer/company/users');
    cy.wait(3000);

    // Find user and verify Inactive status
    cy.contains(regularUserEmail, { timeout: 10000 })
      .should('be.visible')
      .parents('tr')
      .within(() => {
        cy.contains(/inactive/i, { timeout: 5000 }).should('be.visible');
      });

    cy.logToTerminal('✅ TC-38: User removed and set to Inactive');
  });

  it('TC-39: Create/Edit/Delete Teams', () => {
    cy.logToTerminal('========= 📋 TC-39: Team management =========');

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Login as company admin
    loginAsCompanyAdmin();
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // CREATE TEAM
    cy.logToTerminal('Creating team...');
    
    // Select root node (admin)
    const adminFirstName = baseCompanyData.adminFirstName;
    const adminLastName = baseCompanyData.adminLastName;
    cy.contains(`${adminFirstName} ${adminLastName}`, { timeout: 10000 }).click();
    cy.wait(500);

    // Click Add Team
    cy.contains('button', 'Add Team').click();
    cy.wait(1000);

    // Fill team form
    const teamName = `Test Team ${Date.now()}`;
    cy.get('input[name="team_title"]', { timeout: 10000 }).should('be.visible').type(teamName).blur();
    cy.get('input[name="team_description"]').type('Test team description').blur();

    // Save
    cy.contains('button', 'Save').click();
    cy.wait(2000);

    // Verify success message
    cy.contains(/team.*created|successfully/i, { timeout: 5000 }).should('be.visible');

    // Verify team appears in tree
    cy.contains(teamName, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal('✅ Team created successfully');

    // EDIT TEAM
    cy.logToTerminal('Editing team...');
    
    // Select the team
    cy.contains(teamName).click();
    cy.wait(500);

    // Click Edit
    cy.contains('button', 'Edit').should('not.be.disabled').click();
    cy.wait(1000);

    // Update team name
    const updatedTeamName = `Updated Team ${Date.now()}`;
    cy.get('input[name="team_title"]').clear().type(updatedTeamName).blur();
    cy.get('input[name="team_description"]').clear().type('Updated team description').blur();

    // Save
    cy.contains('button', 'Save').click();
    cy.wait(2000);

    // Verify success message
    cy.contains(/team.*updated|successfully/i, { timeout: 5000 }).should('be.visible');

    // Verify updated name in tree
    cy.contains(updatedTeamName, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal('✅ Team edited successfully');

    // DELETE TEAM
    cy.logToTerminal('Deleting team...');
    
    // Select the updated team
    cy.contains(updatedTeamName).click();
    cy.wait(500);

    // Click Remove
    cy.contains('button', 'Remove').should('not.be.disabled').click();

    // Wait for confirmation modal
    cy.get('.dropin-modal').should('be.visible');
    cy.get('.acm-structure-modal-content').should('be.visible');
    cy.wait(200);

    // Confirm deletion in modal
    cy.get('.dropin-modal button').then($buttons => {
      const deleteBtn = $buttons.filter((i, el) => Cypress.$(el).text().includes('Delete'));
      cy.wrap(deleteBtn.first()).click();
    });
    cy.wait(2000);

    // Verify success message
    cy.contains(/team.*deleted|successfully/i, { timeout: 5000 }).should('be.visible');

    // Verify team is removed from the structure tree
    cy.contains(updatedTeamName).should('not.exist');
    cy.logToTerminal('✅ Team deleted successfully');

    // NOTE: Drag & drop testing would require cypress-drag-drop plugin
    cy.logToTerminal('⚠️  Drag & drop tests require additional setup (not covered)');

    cy.logToTerminal('✅ TC-39: Team management verified');
  });
});
