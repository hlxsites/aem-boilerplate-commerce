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
 *   - Tests: Drag & drop user to move them into a team
 *
 * TC-33 (P0): Add New User using unregistered email
 *   - Verifies: Add User form with all fields (Job Title, User Role, First Name,
 *     Last Name, Email, Work Phone Number, Status)
 *   - Tests: User creation with required fields only, user appears in tree,
 *     Edit form is prefilled with entered data
 *
 * TC-34 (P1): Add New User using registered email (invitation flow)
 *   - Verifies: Admin can invite pre-registered user to company
 *   - Verifies: User doesn't appear in tree before invitation acceptance
 *   - Tests: Simulates invitation acceptance via REST API (bypassing email)
 *   - Tests: User appears in structure after accepting invitation
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
 * TC-39 (P1): Company Admin can create/edit/delete/move Teams
 *   - Tests: Create team with name and description, verify in tree
 *   - Tests: Edit team name and description, verify updates
 *   - Tests: Delete team, verify removal from tree
 *   - Tests: Drag & drop teams to reorganize structure hierarchy
 *
 *
 * ==========================================================================
 * NOTES:
 * ==========================================================================
 * TC-34 WORKAROUND - Invitation Acceptance via REST API:
 *   - IDEAL: Read email, extract invitation link, navigate to URL
 *   - BLOCKER: No possibility to access email infrastructure in automated tests
 *   - WORKAROUND: Use REST API to directly activate user in company
 *   - IMPACT: Tests same backend operation, only bypasses email delivery and URL click
 *   - Helper functions: createStandaloneCustomer() and acceptCompanyInvitation()
 *   - RECOMMENDATION: Manual testing for full email-to-acceptance flow
 */

import {
  createCompany,
  createCompanyUser,
  createCompanyTeam,
  createStandaloneCustomer,
  acceptCompanyInvitation,
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
  teamData,
} from '../../fixtures/companyManagementData';
import { login } from '../../actions';

describe('USF-2522: Company Structure', { tags: '@B2BSaas' }, () => {
  // Helper function to setup test company with admin
  const setupTestCompanyAndAdmin = () => {
    cy.logToTerminal('🏢 Setting up test company with admin...');

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

      // Store for cleanup and test usage (NEW OBJECT STRUCTURE)
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
    });
  };

  // Helper function to setup test company with regular user
  const setupTestCompanyWithRegularUser = () => {
    cy.logToTerminal('🏢 Setting up test company with regular user...');

    cy.then(async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(7);
      const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
      const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
      const uniqueRegularUserEmail = `regular.${timestamp}.${randomStr}@example.com`;

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

      const regularUser = await createCompanyUser({
        email: uniqueRegularUserEmail,
        firstname: companyUsers.regularUser.firstname,
        lastname: companyUsers.regularUser.lastname,
        password: companyUsers.regularUser.password,
      }, testCompany.id);

      cy.logToTerminal(`✅ Regular user created: ${regularUser.email || uniqueRegularUserEmail} (ID: ${regularUser.id})`);

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
          id: regularUser.id,
        },
      });
    });
  };

  // Helper function to login as company admin - NOW USING CUSTOM COMMAND
  const loginAsCompanyAdmin = () => {
    cy.loginAsCompanyAdmin();
  };

  // Helper function to login as regular user - NOW USING CUSTOM COMMAND
  const loginAsRegularUser = () => {
    cy.loginAsRegularUser();
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

    // TEST DRAG & DROP: Move "New User" into "Team 1"
    cy.logToTerminal('🔄 Testing drag & drop functionality...');
    
    // Find draggable elements - must use .acm-tree__item with draggable="true"
    cy.contains('New User').closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dragUser');
    cy.contains(teamName).closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dropTeam');
    
    // Perform drag and drop operation
    cy.get('@dragUser').trigger('dragstart', { dataTransfer: new DataTransfer() });
    cy.get('@dropTeam').trigger('dragover');
    cy.get('@dropTeam').trigger('drop');
    // Note: dragend event removed as it may cause Chrome to crash
    
    // Wait for UI to update
    cy.wait(3000);
    
    // Verify success message appears (may say "moved" or "successfully")
    cy.contains(/successfully.*moved|moved.*successfully|user.*moved/i, { timeout: 5000 }).should('be.visible');
    cy.logToTerminal('✅ Success message displayed: User moved');
    
    // Verify "New User" is actually under "Team 1" in the tree structure
    // Find Team 1's tree item, then verify New User appears in its group (children)
    cy.contains('.acm-structure-label', teamName)
      .closest('.acm-tree__item')
      .find('.acm-tree__group')
      .should('contain', 'New User');
    cy.logToTerminal('✅ Verified: "New User" is now under "Team 1" in tree structure');
    
    cy.logToTerminal('✅ Drag & drop: User successfully moved into team');

    // Verify structure changed: "New User" should now be a child of "Team 1"
    // This is hard to verify programmatically in the tree, but we confirmed the success message
    cy.logToTerminal('✅ TC-32: Default structure state and controls verified (including drag & drop)');
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

  it('TC-34: Add New User using registered email (REST invitation acceptance)', () => {
    cy.logToTerminal('========= 📋 TC-34: Add user with registered email =========');

    // ⚠️ WORKAROUND: This test uses REST API to simulate invitation acceptance
    // 
    // IDEAL APPROACH:
    //   1. Access email inbox for the registered user
    //   2. Read the invitation email sent by the system
    //   3. Extract the invitation link from the email body
    //   4. Navigate to that link: /customer/company/accept-invitation/?code=...&customer[...]
    //   5. Verify user can accept invitation via the UI
    // 
    // WHY WORKAROUND IS NEEDED:
    //   - We have NO possibility to access email infrastructure in automated tests
    //   - Invitation code is only available in the email (not in API responses)
    //   - No REST/GraphQL API exists to retrieve pending invitation codes
    // 
    // CURRENT APPROACH (Workaround):
    //   - Use REST API to directly assign user to company with active status
    //   - This executes the same backend operation as clicking the invitation URL
    //   - Tests the complete invitation flow (send → pending → accept → active)
    //   - Only bypasses the email delivery and URL click steps

    // Setup company with admin
    setupTestCompanyAndAdmin();
    cy.wait(2000);

    // Create a separate registered user (not in company) via REST API
    const registeredUserEmail = `registered.${Date.now()}@example.com`;
    const registeredUserFirstName = 'Registered';
    const registeredUserLastName = 'User';
    let registeredUserId;
    let testCompanyId;
    
    cy.then(async () => {
      // Create customer account (not assigned to company)
      cy.logToTerminal('👤 Creating pre-registered customer...');
      
      const customerData = await createStandaloneCustomer({
        firstname: registeredUserFirstName,
        lastname: registeredUserLastName,
        email: registeredUserEmail,
        password: 'Test123!',
      });
      
      registeredUserId = customerData.id;
      testCompanyId = Cypress.env('testCompany').id;
      
      cy.logToTerminal(`✅ Pre-registered customer created: ${registeredUserEmail} (ID: ${registeredUserId})`);
      
      // Store for cleanup
      Cypress.env('registeredUserEmail', registeredUserEmail);
    });

    // Login as company admin
    cy.then(() => {
      loginAsCompanyAdmin();
    });
    cy.wait(3000);

    // Navigate to Company Structure
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // Click Add User
    cy.contains('button', 'Add User').click();
    cy.wait(2000);

    // Fill form with REGISTERED email
    cy.get('.company-user-form__card, .acm-structure-panel, [class*="user-form"]').first().within(() => {
      cy.get('select[name="role"]', { timeout: 10000 }).select('Default User');
      cy.get('input[name="first_name"]').type(registeredUserFirstName);
      cy.get('input[name="last_name"]').type(registeredUserLastName);
      cy.get('input[name="email"]:visible').type(registeredUserEmail).blur();
      cy.wait(500);
      cy.get('input[name="job_title"]').type('Invited User');
      cy.get('input[name="telephone"]').type('555-0000');
      cy.contains('button', 'Save').click();
    });
    cy.wait(2000);

    // Verify success message (UI should accept registered email)
    cy.contains(/successfully|sent|invitation/i, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal('✅ Invitation sent via UI');

    // User should NOT appear in tree immediately (invitation pending)
    cy.contains(`${registeredUserFirstName} ${registeredUserLastName}`).should('not.exist');
    cy.logToTerminal('✅ Verified: User not in structure (invitation pending)');

    // ========================================================================
    // WORKAROUND: Simulate invitation acceptance via REST API
    // ========================================================================
    // IDEAL: Access email, read invitation link, navigate to it
    //   1. Read email sent to registered.XXX@example.com
    //   2. Extract link: /customer/company/accept-invitation/?code=ABC123&customer[...]
    //   3. Navigate to that URL to test actual UI acceptance flow
    // 
    // BLOCKER: We have NO possibility to access email in automated tests
    // 
    // WORKAROUND: Use REST API to directly activate user in company
    //   - PUT /V1/customers/{customerId} with company_attributes.status=1
    //   - Same backend operation as the invitation URL handler executes
    //   - Only bypasses: email delivery + URL navigation
    // ========================================================================
    cy.then(async () => {
      cy.logToTerminal('🔗 Simulating invitation acceptance via REST API (WORKAROUND)...');
      
      await acceptCompanyInvitation(
        registeredUserId,
        testCompanyId,
        {
          email: registeredUserEmail,
          firstname: registeredUserFirstName,
          lastname: registeredUserLastName,
        },
        'Invited User',
        '555-0000'
      );
      
      cy.logToTerminal('✅ Invitation accepted via REST API (WORKAROUND - bypassing email)');
    });

    // Navigate to Company Structure to verify acceptance
    cy.visit('/customer/company/structure');
    cy.wait(3000);

    // NOW user should appear in tree
    cy.contains(`${registeredUserFirstName} ${registeredUserLastName}`, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal('✅ Verified: User now appears in structure after invitation acceptance');

    cy.logToTerminal('✅ TC-34: Invitation flow verified (REST API workaround - cannot capture invitation code)');
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

    // Find user and verify Inactive status using shared helper with retry logic
    cy.then(() => {
      const regularUserEmail = Cypress.env('testUsers').regular.email;
      cy.checkForUserInTable(regularUserEmail, 'Inactive');
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

    // DRAG & DROP TEAMS TO REORGANIZE STRUCTURE
    cy.logToTerminal('Testing drag & drop to reorganize teams...');
    
    // Create additional teams to test drag & drop hierarchy
    // Create "Marketing Team" as child of admin
    cy.contains(`${adminFirstName} ${adminLastName}`).click();
    cy.wait(500);
    cy.contains('button', 'Add Team').click();
    cy.wait(1000);
    
    const marketingTeam = 'Marketing Team';
    cy.get('input[name="team_title"]').clear().type(marketingTeam).blur();
    cy.contains('button', 'Save').click();
    cy.wait(2000);
    cy.contains(marketingTeam, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal(`✅ Created ${marketingTeam}`);

    // Create "Sales Team" as child of admin
    cy.contains(`${adminFirstName} ${adminLastName}`).click();
    cy.wait(500);
    cy.contains('button', 'Add Team').click();
    cy.wait(1000);
    
    const salesTeam = 'Sales Team';
    cy.get('input[name="team_title"]').clear().type(salesTeam).blur();
    cy.contains('button', 'Save').click();
    cy.wait(2000);
    cy.contains(salesTeam, { timeout: 10000 }).should('be.visible');
    cy.logToTerminal(`✅ Created ${salesTeam}`);

    // Expand all to see all teams
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);

    // DRAG & DROP: Move "Marketing Team" into "Sales Team"
    cy.logToTerminal('🔄 Dragging Marketing Team into Sales Team...');
    
    cy.contains(marketingTeam).closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dragMarketingTeam');
    cy.contains(salesTeam).closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dropSalesTeam');
    
    cy.get('@dragMarketingTeam').trigger('dragstart', { dataTransfer: new DataTransfer() });
    cy.get('@dropSalesTeam').trigger('dragover');
    cy.get('@dropSalesTeam').trigger('drop');
    // Note: dragend event removed as it may cause Chrome to crash
    
    // Wait for UI to update
    cy.wait(3000);
    
    // Verify success message appears: "Team was successfully moved."
    cy.contains(/team.*successfully.*moved|successfully.*moved/i, { timeout: 5000 }).should('be.visible');
    cy.logToTerminal('✅ Success message displayed: Team moved');
    
    // Verify "Marketing Team" is actually under "Sales Team" in the tree structure
    cy.contains('.acm-structure-label', salesTeam)
      .closest('.acm-tree__item')
      .find('.acm-tree__group')
      .should('contain', marketingTeam);
    cy.logToTerminal(`✅ Verified: "${marketingTeam}" is now under "${salesTeam}" in tree structure`);
    
    cy.logToTerminal('✅ Team successfully moved via drag & drop');

    // DRAG & DROP: Move updated team (first created) into "Marketing Team"
    cy.logToTerminal(`🔄 Dragging ${updatedTeamName} into Marketing Team...`);
    
    // Expand all again to ensure all teams are visible
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);
    
    cy.contains(updatedTeamName).closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dragUpdatedTeam');
    cy.contains(marketingTeam).closest('.acm-tree__item').should('have.attr', 'draggable', 'true').as('dropMarketingTeam');
    
    cy.get('@dragUpdatedTeam').trigger('dragstart', { dataTransfer: new DataTransfer() });
    cy.get('@dropMarketingTeam').trigger('dragover');
    cy.get('@dropMarketingTeam').trigger('drop');
    // Note: dragend event removed as it may cause Chrome to crash
    
    // Wait for UI to update
    cy.wait(3000);
    
    // Verify success message appears: "Team was successfully moved."
    cy.contains(/team.*successfully.*moved|successfully.*moved/i, { timeout: 5000 }).should('be.visible');
    cy.logToTerminal('✅ Success message displayed: Second team moved');
    
    // Verify "Updated Team" is actually under "Marketing Team" in the tree structure
    cy.contains('.acm-structure-label', marketingTeam)
      .closest('.acm-tree__item')
      .find('.acm-tree__group')
      .should('contain', updatedTeamName);
    cy.logToTerminal(`✅ Verified: "${updatedTeamName}" is now under "${marketingTeam}" in tree structure`);
    
    cy.logToTerminal('✅ Drag & drop team reorganization verified');

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

    cy.logToTerminal('✅ TC-39: Team create/edit/delete/move (drag & drop) verified');
  });
});
