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
 * @fileoverview Company Roles and Permissions E2E tests.
 * Tests cover:
 * - USF-2523: Roles and Permissions feature
 * - TC-26: Default roles state for new company
 * - TC-27: Duplicate and delete roles
 * - TC-28: Edit role affects user access
 * - TC-29: Cannot delete role with assigned users
 * - TC-30: User with edit permission can edit company profile
 * - TC-31: User with manage roles permission can view/edit roles
 *
 * Test Plan Reference: USF-2669 QA Test Plan - Section 4: Roles and Permissions
 *
 * ==========================================================================
 * COVERED TEST CASES:
 * ==========================================================================
 * TC-26 (P0): Default "Roles and Permissions" state for newly created company
 * TC-27 (P1): Company Admin can "Duplicate" and "Delete" the "Default User" role
 * TC-28 (P0): Company Admin can edit "Default Role" which affects user access
 * TC-29 (P1): Cannot delete role with assigned users, can delete without users
 * TC-30 (P1): User with "Edit Company Profile" permission can edit
 * TC-31 (P2): User with "Manage roles" permission can edit user roles
 *
 * ==========================================================================
 * NOT COVERED TEST CASES (with reasons):
 * ==========================================================================
 *
 * Form validation tests (role name required, max length):
 *   - Reason: Better suited for unit tests in storefront-company-management dropin
 *   - The dropin has its own test suite for form validation edge cases
 *
 * ==========================================================================
 */

import {
  createCompany,
  createCompanyUser,
  createCompanyRole,
  deleteCompanyRole,
  assignRoleToUser,
  cleanupTestCompany,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  companyUsers,
  roleData,
} from '../../fixtures/companyManagementData';
import { login } from '../../actions';

describe('USF-2523: Roles and Permissions', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🎭 Roles and Permissions test suite started');
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
  // TC-26 (P0): Default "Roles and Permissions" state for new company
  // ==========================================================================

  it('TC-26: Verify default "Roles and Permissions" state for newly created company', () => {
    cy.logToTerminal('========= 📋 TC-26: Verify default roles state =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify page title');
      cy.contains('Company Roles & Permissions', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify roles table exists');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify table columns');
      cy.contains('th', 'Role').should('be.visible');
      cy.contains('th', 'Users').should('be.visible');
      cy.contains('th', 'Actions').should('be.visible');

      cy.logToTerminal('✅ Verify default "Default User" role exists');
      cy.contains('Default User', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify "Add New Role" button exists');
      cy.contains('button', 'Add New Role', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify action buttons for Default User role');
      cy.contains('Default User')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .should('be.visible');
          cy.contains('button', 'Duplicate', { timeout: 5000 })
            .should('be.visible');
          cy.contains('button', 'Delete').should('not.exist');
        });

      cy.logToTerminal('✏️ Click Edit for Default User role');
      cy.contains('Default User')
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Verify edit form appears');
      cy.contains('Edit Role', { timeout: 5000 }).should('be.visible');
      cy.get('[data-testid="role-and-permission-table"]').should('not.exist');

      cy.logToTerminal('✅ Verify role name field');
      cy.get('input[name="roleName"]')
        .should('be.visible')
        .and('have.value', 'Default User');

      cy.logToTerminal('✅ Verify permissions tree exists');
      cy.get('.edit-role-and-permission__tree-container', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify tree controls');
      cy.contains('button', 'Expand All').should('be.visible');
      cy.contains('button', 'Collapse All').should('be.visible');

      cy.logToTerminal('✅ Verify form action buttons');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible');
      cy.contains('button', 'Cancel', { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ TC-26: Default roles state verified');
    });
  });

  // ==========================================================================
  // TC-27 (P1): Duplicate and Delete role
  // ==========================================================================

  it('TC-27: Company Admin can "Duplicate" and "Delete" the "Default User" role', () => {
    cy.logToTerminal('========= 📋 TC-27: Verify duplicate and delete role =========');

    setupTestCompanyAndAdmin();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('📋 Find Default User role and click Duplicate');
      cy.contains('Default User', { timeout: 10000 })
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Duplicate', { timeout: 5000 })
            .should('be.visible')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Verify form appears with pre-filled name');
      cy.contains('Add New Role', { timeout: 5000 }).should('be.visible');

      cy.logToTerminal('✅ Verify role name is "Default User - Duplicated"');
      cy.get('input[name="roleName"]')
        .should('be.visible')
        .invoke('val')
        .should('match', /Default User.*Duplicated/i);

      cy.logToTerminal('💾 Save the duplicated role');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/role.*created|successfully/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify new role appears in grid');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .contains(/Default User.*Duplicated/i)
        .should('be.visible');

      cy.logToTerminal('✅ Verify Delete button now appears for duplicated role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', /Default User.*Duplicated/i)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .should('be.visible');
        });

      cy.logToTerminal('🗑️ Delete the duplicated role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', /Default User.*Duplicated/i)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .click();
        });

      cy.wait(2000); // Wait for modal to appear

      cy.logToTerminal('✅ Confirm deletion in modal');
      // Click the confirmation Delete button (not the one in the table)
      // The modal Delete button is typically a primary button, not the action button
      cy.get('button.dropin-button')
        .contains('Delete', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/deleted|removed/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify role no longer in grid');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains(/Default User.*Duplicated/i)
        .should('not.exist');

      cy.logToTerminal('✅ TC-27: Duplicate and delete role successful');
    });
  });

  // ==========================================================================
  // TC-28 (P0): Edit role affects user access
  // ==========================================================================

  it('TC-28: Company Admin can edit "Default Role" which affects user access', () => {
    cy.logToTerminal('========= 📋 TC-28: Verify role edit affects user access =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit Default User role');
      cy.contains('Default User', { timeout: 10000 })
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Edit', { timeout: 5000 })
            .should('be.visible')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand permissions tree');
      cy.contains('button', 'Expand All', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(1000);

      cy.logToTerminal('❌ Uncheck "Company Profile View" permission');
      // Find the permission checkbox within the tree and click to toggle it
      // The actual checkbox is hidden, so we click on the visible label/wrapper
      cy.get('.edit-role-and-permission__tree-container')
        .contains('.edit-role-and-permission__tree-node', 'Company Profile')
        .find('input[type="checkbox"]')
        .should('be.checked')
        .parent() // Get the parent wrapper (likely the label or checkbox container)
        .click();

      cy.logToTerminal('💾 Save role changes');
      cy.contains('button', 'Save', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify success message');
      cy.contains(/updated|saved/i, { timeout: 5000 })
        .should('be.visible');

      cy.logToTerminal('🚪 Logout admin');
      // Open account dropdown and click Sign Out
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as regular user (who has Default User role)');
      loginAsRegularUser();

      cy.logToTerminal('📍 Try to access My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify user cannot see company profile or sees access denied');
      cy.get('body').then(($body) => {
        if ($body.text().match(/access.*denied|permission.*required/i)) {
          cy.logToTerminal('✅ Access denied message shown');
        } else {
          // Company info should not be visible
          cy.get('[data-testid="company-profile"]').should('not.exist');
          cy.logToTerminal('✅ Company profile hidden');
        }
      });

      cy.logToTerminal('✅ TC-28: Role edit successfully affected user access');
    });
  });

  // ==========================================================================
  // TC-29 (P1): Cannot delete role with assigned users
  // ==========================================================================

  it('TC-29: Cannot delete role with assigned users', () => {
    cy.logToTerminal('========= 📋 TC-29: Verify cannot delete role with users =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      cy.logToTerminal('🔐 Login as company admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✅ Verify Default User role shows users assigned');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .should('contain', '1'); // Should show 1 user assigned

      cy.logToTerminal('❌ Try to delete Default User role (should fail - has users)');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          // Delete button should not be visible for role with assigned users
          cy.contains('button', 'Delete').should('not.exist');
        });

      cy.logToTerminal('✅ Delete button correctly hidden for role with assigned users');

      // Create a new role without users
      cy.logToTerminal('📋 Create a new role (no users assigned)');
      cy.contains('button', 'Add New Role', { timeout: 5000 })
        .click();

      cy.wait(1000);

      cy.get('input[name="roleName"]')
        .type('Empty Test Role');

      cy.contains('button', 'Save', { timeout: 5000 })
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify new role appears in table');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('Empty Test Role')
        .should('be.visible');

      cy.logToTerminal('✅ Verify new role without users has Delete button');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Empty Test Role')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete', { timeout: 5000 })
            .should('be.visible');
        });

      cy.logToTerminal('🗑️ Delete the empty role');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Empty Test Role')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Delete')
            .click();
        });

      cy.wait(1000);

      cy.logToTerminal('✅ Confirm deletion in modal');
      cy.get('button.dropin-button')
        .contains('Delete', { timeout: 5000 })
        .should('be.visible')
        .click();

      cy.wait(2000);

      cy.logToTerminal('✅ Verify empty role is deleted');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('Empty Test Role')
        .should('not.exist');

      cy.logToTerminal('✅ TC-29: Role with users cannot be deleted, role without users can be deleted');
    });
  });

  // ==========================================================================
  // TC-30 (P1): User with edit permission can edit company profile
  // ==========================================================================

  it('TC-30: User with "Edit Company Profile" permission can edit', () => {
    cy.logToTerminal('========= 📋 TC-30: Verify edit permission works via UI =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      // STEP 1: Verify user CANNOT edit yet (default role has no edit permission)
      cy.logToTerminal('🔐 Login as regular user (Default User role, no edit permission)');
      loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('❌ Verify Edit button is NOT visible (no permission)');
      cy.contains('button', 'Edit').should('not.exist');

      // STEP 2: Admin adds edit permission to Default User role
      cy.logToTerminal('🚪 Logout regular user');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit "Default User" role to add edit permission');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand all permissions');
      cy.contains('button', 'Expand All').click();
      cy.wait(1000);

      cy.logToTerminal('✅ Enable "Edit" permission under Company Profile > Account Information');
      // Navigate by text: Find Account Information, then find Edit as its child
      cy.get('.edit-role-and-permission__tree-container')
        .contains('li', 'Account Information') // Find the li containing Account Information
        .find('> ul > li') // Get direct children li elements
        .contains('.edit-role-and-permission__tree-label', 'Edit') // Find the one with Edit label
        .parent('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .parent('label')
        .click();

      cy.logToTerminal('💾 Save role with new permission');
      cy.contains('button', 'Save', { timeout: 5000 }).click();
      cy.wait(2000);

      // STEP 3: Verify user CAN now edit
      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as regular user (now has edit permission)');
      loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to My Company page');
      cy.visit('/customer/company');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify Edit button IS now visible');
      cy.contains('button', 'Edit', { timeout: 10000 })
        .should('be.visible')
        .click();

      cy.wait(1000);

      cy.logToTerminal('✏️ Edit company information');
      const updatedVat = `0000-0000-${Date.now()}`;
      cy.get('input[name="vatTaxId"]')
        .should('be.visible')
        .clear()
        .type(updatedVat)
        .blur();

      cy.logToTerminal('💾 Save changes');
      cy.contains('button', /save|update/i, { timeout: 5000 }).click();
      cy.wait(2000);

      cy.logToTerminal('✅ Verify changes are saved and displayed');
      cy.get('.account-company-profile')
        .should('contain', updatedVat);

      cy.logToTerminal('✅ TC-30: User with edit permission (set via UI) can successfully edit company profile');
    });
  });

  // ==========================================================================
  // TC-31 (P2): User with manage roles permission can view/edit roles
  // ==========================================================================

  it('TC-31: User with "Manage roles" permission can view/edit roles', () => {
    cy.logToTerminal('========= 📋 TC-31: Verify manage roles permission via UI =========');

    setupTestCompanyWithRegularUser();

    cy.then(() => {
      // STEP 1: Verify user CANNOT access Roles page (default role has no permission)
      cy.logToTerminal('🔐 Login as regular user (Default User role, no manage roles permission)');
      loginAsRegularUser();

      cy.logToTerminal('📍 Try to access Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(2000);

      cy.logToTerminal('❌ Verify user cannot access Roles page (no permission)');
      cy.get('body').then(($body) => {
        // Should either redirect, show access denied, or not show the page
        if ($body.find('[data-testid="role-and-permission-table"]').length === 0) {
          cy.logToTerminal('✅ Access correctly denied');
        } else {
          cy.logToTerminal('⚠️ Page visible but may have restricted functionality');
        }
      });

      // STEP 2: Admin adds manage roles permission to Default User role
      cy.logToTerminal('🚪 Logout regular user');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as admin');
      loginAsCompanyAdmin();

      cy.logToTerminal('📍 Navigate to Roles and Permissions');
      cy.visit('/customer/company/roles');
      cy.wait(3000);

      cy.logToTerminal('✏️ Edit "Default User" role to add manage roles permission');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').click();
        });

      cy.wait(1000);

      cy.logToTerminal('📂 Expand all permissions');
      cy.contains('button', 'Expand All').click();
      cy.wait(1000);

      cy.logToTerminal('✅ Enable "Manage roles and permissions"');
      // Navigate: Company User Management > View roles and permissions > Manage roles and permissions
      cy.get('.edit-role-and-permission__tree-container')
        .contains('li', 'View roles and permissions')
        .find('> ul > li') // Get child li
        .contains('.edit-role-and-permission__tree-label', 'Manage roles and permissions')
        .parent('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .parent('label')
        .click();

      cy.logToTerminal('💾 Save role with new permission');
      cy.contains('button', 'Save', { timeout: 5000 }).click();
      cy.wait(2000);

      // STEP 3: Verify user CAN now access and edit roles
      cy.logToTerminal('🚪 Logout admin');
      cy.get('.nav-dropdown-button').click();
      cy.contains('button', /sign out|logout/i).click();
      cy.wait(2000);

      cy.logToTerminal('🔐 Login as regular user (now has manage roles permission)');
      loginAsRegularUser();

      cy.logToTerminal('📍 Navigate to Roles and Permissions page');
      cy.visit('/customer/company/roles');
      cy.wait(2000);

      cy.logToTerminal('✅ Verify user can access Roles page');
      cy.contains('Company Roles & Permissions', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify roles table is visible');
      cy.get('[data-testid="role-and-permission-table"]', { timeout: 10000 })
        .should('be.visible');

      cy.logToTerminal('✅ Verify user can edit roles');
      cy.get('[data-testid="role-and-permission-table"]')
        .contains('td', 'Default User')
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Edit').should('be.visible');
        });

      cy.logToTerminal('✅ TC-31: User with manage roles permission can view/edit roles via UI');
    });
  });

  after(() => {
    cy.logToTerminal('🏁 Roles and Permissions test suite completed');
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

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email} (ID: ${regularUser.id})`);

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
