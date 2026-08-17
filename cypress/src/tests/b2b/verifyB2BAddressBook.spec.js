/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
 * @fileoverview B2B Company Address Book E2E tests.
 *
 * Mirrors the verifyPurchaseOrders.spec.js pattern: REST-created company,
 * roles and users against a live backend, real UI login, real assertions —
 * NOT GraphQL mocking (see _____EXAMPLES_____/cypress for the mocked-GraphQL
 * component-test equivalent, used only as a source of scenario ideas).
 *
 * Permission model verified against production code (NOT guessed):
 * scripts/__dropins__/storefront-account/api.js resolves company address
 * book access from these ACL resource IDs:
 *   Magento_CompanyAddressStorefrontCompatibility::company_address (view)
 *   Magento_CompanyAddressStorefrontCompatibility::add
 *   Magento_CompanyAddressStorefrontCompatibility::edit
 *   Magento_CompanyAddressStorefrontCompatibility::delete
 *   Magento_CompanyAddressStorefrontCompatibility::default
 * A Company Administrator role bypasses these checks entirely.
 *
 * EXPLICITLY OUT OF SCOPE for this pass (see plan): selecting a company
 * address as shipping/billing during checkout. That flow is gated behind a
 * temporary DEBUG block in blocks/commerce-checkout/commerce-checkout.js
 * (commit 3f0a0668, comment: "Remove this whole block ... once this ships
 * for real") and is not ready to test yet. This suite only verifies that the
 * "Allow custom shipping address at checkout" company setting exists and
 * persists — not checkout behavior driven by it.
 *
 * KNOWN UNKNOWNS requiring calibration against the live app on first run
 * (cannot be confirmed from static/minified source — see plan for detail):
 *   - Exact nav link text/route for the company address book page
 *     (actions.openCompanyAddressBook uses a best-effort /address/i match).
 *   - Exact input names for the two Address Book settings checkboxes on the
 *     Edit Company Profile form (fields.companyProfileAddressBookEnabledCheckbox
 *     / companyProfileCustomShippingEnabledCheckbox).
 *   - Exact data-testid/class names for the "no permission" message and the
 *     address-actions loading spinner.
 *   - Whether the live backend actually enforces the
 *     Magento_CompanyAddressStorefrontCompatibility::* ACL end-to-end when set
 *     via POST /V1/company/role — this suite's role/permission tests (3-9)
 *     are the first real verification of that "alpha" ACL.
 */

import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCompanyRoles,
  unassignRoles,
} from '../../support/b2bPOAPICalls';
import {
  addressBookLabels,
  addressBookUsers,
  addressBookRolesConfig,
  addressBookAddresses,
} from '../../fixtures';
import * as selectors from '../../fields';
import * as actions from '../../actions';

describe('B2B Address Book', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const urls = Cypress.env('addressBookUrls');

  before(() => {
    cy.logToTerminal('🚀 B2B Address Book test suite started');
    cy.setupCompanyWithAdmin();
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 B2B Address Book test suite cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    // Also clear cookies for the ACO backend domain to avoid stale session conflicts
    if (Cypress.env('API_ENDPOINT')) {
      try {
        const acoDomain = new URL(Cypress.env('API_ENDPOINT')).hostname;
        cy.clearCookies({ domain: acoDomain });
      } catch (e) { /* ignore */ }
    }
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  // Test 1: Enable Address Book settings, create the permission-matrix roles and users
  it(
    'Setup - Enable Address Book settings and create roles and users',
    () => {
      cy.logToTerminal(
        '========= ⚙️ Test 1: Setup - Address Book settings + roles/users =========',
      );

      const companyId = Cypress.env('testCompany')?.id;
      cy.logToTerminal(`📋 Using company ID: ${companyId}`);

      cy.logToTerminal('🔐 Login as company admin');
      actions.login(Cypress.env('testAdmin'), urls);

      // Force the Address Book setting to a known OFF state first, so the
      // "hidden while disabled" check below doesn't depend on an unconfirmed
      // default value for a newly-created company.
      cy.logToTerminal('🔧 Ensuring Address Book setting starts disabled');
      actions.toggleCompanyAddressBookSettings(urls, { addressBookEnabled: false });

      cy.logToTerminal('🔍 Verifying Address Book is not offered while disabled');
      // Soft check — convert to a hard `.should('not.exist')` once the real
      // nav-link selector/text is confirmed against the live app.
      cy.get('body').then(($body) => {
        if (/address\s*book/i.test($body.text())) {
          cy.logToTerminal('⚠️ "Address Book" text found while disabled — verify gating/selector');
        } else {
          cy.logToTerminal('✅ Address Book not offered while disabled, as expected');
        }
      });

      cy.logToTerminal('🔧 Enabling Address Book + custom shipping address setting');
      actions.toggleCompanyAddressBookSettings(urls, {
        addressBookEnabled: true,
        customShippingAddressEnabled: true,
      });

      cy.logToTerminal('🔄 Reloading to verify settings persisted');
      cy.visit(urls.companyProfile);
      cy.wait(2000);
      cy.contains('button', 'Edit').click();
      cy.get(selectors.companyProfileAddressBookEnabledCheckbox).should('be.checked');
      cy.get(selectors.companyProfileCustomShippingEnabledCheckbox).should('be.checked');
      cy.contains('button', 'Cancel').click();

      // Build the 7-role permission matrix, mirroring PO Test 1's pattern.
      const addressBookUsersConfig = [
        { user: { ...addressBookUsers.viewer, companyId }, role: { ...addressBookRolesConfig.viewOnly, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.creator, companyId }, role: { ...addressBookRolesConfig.create, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.creatorWithDefault, companyId }, role: { ...addressBookRolesConfig.createWithDefault, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.editor, companyId }, role: { ...addressBookRolesConfig.edit, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.deleter, companyId }, role: { ...addressBookRolesConfig.delete, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.full, companyId }, role: { ...addressBookRolesConfig.full, company_id: companyId }, roleId: null },
        { user: { ...addressBookUsers.noAccess, companyId }, role: { ...addressBookRolesConfig.noAccess, company_id: companyId }, roleId: null },
      ];

      cy.logToTerminal('⚙️ Creating address book roles');
      const createdRoleIds = [];
      addressBookUsersConfig
        .reduce((chain, element, index) => chain.then(() => {
          cy.logToTerminal(`Creating role: ${element.role.role_name}...`);
          cy.wait(1500);

          return manageCompanyRole(element.role).then((result) => {
            addressBookUsersConfig[index].roleId = result?.role?.id;
            createdRoleIds.push(result?.role?.id);
            cy.logToTerminal(`✅ Role created: ${element.role.role_name} | ID: ${result?.role?.id}`);
          });
        }), cy.wrap(null))
        .then(() => {
          Cypress.env('addressBookTestRoleIds', createdRoleIds);
          Cypress.env('addressBookUsersConfig', addressBookUsersConfig);
          cy.logToTerminal(`📝 Stored ${createdRoleIds.length} role IDs for cleanup`);
          cy.logToTerminal('⏳ Waiting for roles to be indexed in the system...');
          cy.wait(5000);
        });

      cy.logToTerminal('⚙️ Creating test users & assigning roles');
      addressBookUsersConfig
        .reduce((chain, element) => chain.then(() => {
          cy.wait(5000);
          return cy.wrap(null).then(() => {
            cy.logToTerminal(`Creating user: ${element.user.email} with role ID: ${element.roleId}...`);
            return createUserAssignCompanyAndRole(element.user, element.roleId).then(() => {
              cy.logToTerminal('✅ User created');
            });
          });
        }), cy.wrap(null))
        .then(() => {
          cy.logToTerminal('⏳ Waiting for users and permissions to be fully applied...');
          cy.wait(5000);
          cy.logToTerminal('✅ Test 1: Setup completed successfully');
        });

      actions.logout(addressBookLabels);
    },
  );

  // Test 2: Company Admin bypass - full CRUD lifecycle
  it(
    'Company Admin - complete address CRUD lifecycle (bypass permissions)',
    () => {
      cy.logToTerminal('========= ⚙️ Test 2: Company Admin CRUD lifecycle =========');

      cy.logToTerminal('🔐 Login as company admin');
      actions.login(Cypress.env('testAdmin'), urls);
      actions.openCompanyAddressBook(urls);

      cy.logToTerminal('📝 Creating shipping address');
      cy.contains(addressBookLabels.createNew).click();
      cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
      actions.fillCompanyAddressFields(addressBookAddresses.shipping);
      cy.get(selectors.addressBookTypeShippingRadio).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

      cy.logToTerminal('📝 Creating billing address');
      cy.contains(addressBookLabels.createNew).click();
      actions.fillCompanyAddressFields(addressBookAddresses.billing);
      cy.get(selectors.addressBookTypeBillingRadio).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.billing.lastName).should('be.visible');

      cy.logToTerminal('✏️ Editing shipping address');
      cy.get(selectors.addressBookCard)
        .contains(addressBookAddresses.shipping.lastName)
        .closest(selectors.addressBookCard)
        .within(() => {
          cy.contains(addressBookLabels.edit).click();
        });
      actions.fillCompanyAddressFields(addressBookAddresses.edited);
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.edited.street).should('be.visible');

      cy.logToTerminal('⭐ Marking billing address as default');
      cy.get(selectors.addressBookCard)
        .contains(addressBookAddresses.billing.lastName)
        .closest(selectors.addressBookCard)
        .within(() => {
          cy.contains(addressBookLabels.edit).click();
        });
      cy.get(selectors.addressBookDefaultBillingCheckbox).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);

      cy.logToTerminal('🔀 Verifying the default address sorts first in the list');
      cy.get(selectors.addressBookCard).first().should('contain.text', addressBookAddresses.billing.lastName);

      cy.logToTerminal('🗑️ Deleting the (edited) shipping address');
      actions.deleteCompanyAddressCard(addressBookAddresses.edited.street, addressBookLabels);
      cy.contains(addressBookAddresses.edited.street).should('not.exist');

      cy.logToTerminal('🚪 Logging out Company Admin');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 2: Company Admin CRUD lifecycle verified');
    },
  );

  // Test 3: View-only permission
  it(
    'Viewer role - can see addresses but has no create, edit, remove or default actions',
    () => {
      cy.logToTerminal('========= ⚙️ Test 3: Viewer role =========');

      cy.logToTerminal('🔐 Login as Viewer');
      actions.login(addressBookUsers.viewer, urls);
      actions.openCompanyAddressBook(urls);

      cy.contains(addressBookAddresses.billing.lastName).should('be.visible');
      cy.contains(addressBookLabels.createNew).should('not.exist');
      cy.contains(addressBookLabels.edit).should('not.exist');
      cy.contains(addressBookLabels.remove).should('not.exist');

      cy.logToTerminal('🚪 Logging out Viewer');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 3: Viewer role verified (view-only)');
    },
  );

  // Test 4: Create permission (no default)
  it(
    'Creator role - can add addresses but cannot edit, remove or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 4: Creator role =========');

      cy.logToTerminal('🔐 Login as Creator');
      actions.login(addressBookUsers.creator, urls);
      actions.openCompanyAddressBook(urls);

      cy.contains(addressBookLabels.edit).should('not.exist');
      cy.contains(addressBookLabels.remove).should('not.exist');

      cy.logToTerminal('📝 Creating an address without default permission');
      cy.contains(addressBookLabels.createNew).should('be.visible').click();
      actions.fillCompanyAddressFields(addressBookAddresses.shipping);
      cy.get(selectors.addressBookTypeShippingRadio).check({ force: true });

      cy.logToTerminal('🔍 Verifying default checkbox is present but disabled');
      cy.get(selectors.addressBookDefaultShippingCheckbox).should('be.disabled');

      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

      cy.logToTerminal('🚪 Logging out Creator');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 4: Creator role verified (create-only, no default)');
    },
  );

  // Test 5: Create + set-default permission
  it(
    'Creator-with-default role - can add addresses and set them as default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 5: Creator-with-default role =========');

      cy.logToTerminal('🔐 Login as Creator-with-default');
      actions.login(addressBookUsers.creatorWithDefault, urls);
      actions.openCompanyAddressBook(urls);

      cy.logToTerminal('📝 Creating an address and marking it default');
      cy.contains(addressBookLabels.createNew).should('be.visible').click();
      actions.fillCompanyAddressFields(addressBookAddresses.billing);
      cy.get(selectors.addressBookTypeBillingRadio).check({ force: true });

      cy.logToTerminal('🔍 Verifying default checkbox is present and enabled');
      cy.get(selectors.addressBookDefaultBillingCheckbox).should('not.be.disabled').check({ force: true });

      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);

      cy.logToTerminal('🔀 Verifying the newly created default address sorts first');
      cy.get(selectors.addressBookCard).first().should('contain.text', addressBookAddresses.billing.lastName);

      cy.logToTerminal('🚪 Logging out Creator-with-default');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 5: Creator-with-default role verified');
    },
  );

  // Test 6: Edit permission
  it(
    'Editor role - can modify existing addresses but cannot create, remove or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 6: Editor role =========');

      cy.logToTerminal('🔐 Login as Editor');
      actions.login(addressBookUsers.editor, urls);
      actions.openCompanyAddressBook(urls);

      cy.contains(addressBookLabels.createNew).should('not.exist');
      cy.contains(addressBookLabels.remove).should('not.exist');

      cy.logToTerminal('✏️ Editing an existing address');
      cy.get(selectors.addressBookCard)
        .contains(addressBookAddresses.shipping.lastName)
        .closest(selectors.addressBookCard)
        .within(() => {
          cy.contains(addressBookLabels.edit).should('be.visible').click();
        });
      actions.fillCompanyAddressFields(addressBookAddresses.edited);
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.edited.street).should('be.visible');

      cy.logToTerminal('🚪 Logging out Editor');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 6: Editor role verified (edit-only)');
    },
  );

  // Test 7: Delete permission
  it(
    'Deleter role - can remove addresses but cannot create, edit or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 7: Deleter role =========');

      cy.logToTerminal('🔐 Login as Deleter');
      actions.login(addressBookUsers.deleter, urls);
      actions.openCompanyAddressBook(urls);

      cy.contains(addressBookLabels.createNew).should('not.exist');
      cy.contains(addressBookLabels.edit).should('not.exist');

      cy.logToTerminal('🗑️ Removing the address edited in Test 6');
      actions.deleteCompanyAddressCard(addressBookAddresses.edited.street, addressBookLabels);
      cy.contains(addressBookAddresses.edited.street).should('not.exist');

      cy.logToTerminal('🚪 Logging out Deleter');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 7: Deleter role verified (delete-only)');
    },
  );

  // Test 8: Full permission
  it(
    'Full-permission role - has create, edit, remove and default actions available',
    () => {
      cy.logToTerminal('========= ⚙️ Test 8: Full-permission role =========');

      cy.logToTerminal('🔐 Login as Full-permission user');
      actions.login(addressBookUsers.full, urls);
      actions.openCompanyAddressBook(urls);

      cy.logToTerminal('📝 Creating an address with full permissions');
      cy.contains(addressBookLabels.createNew).should('be.visible').click();
      actions.fillCompanyAddressFields(addressBookAddresses.shipping);
      cy.get(selectors.addressBookTypeShippingRadio).check({ force: true });
      cy.get(selectors.addressBookDefaultShippingCheckbox).should('not.be.disabled').check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

      cy.logToTerminal('✏️ Editing it');
      cy.get(selectors.addressBookCard)
        .contains(addressBookAddresses.shipping.lastName)
        .closest(selectors.addressBookCard)
        .within(() => {
          cy.contains(addressBookLabels.edit).should('be.visible').click();
        });
      actions.fillCompanyAddressFields(addressBookAddresses.edited);
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);

      cy.logToTerminal('🗑️ Removing it');
      actions.deleteCompanyAddressCard(addressBookAddresses.edited.street, addressBookLabels);
      cy.contains(addressBookAddresses.edited.street).should('not.exist');

      cy.logToTerminal('🚪 Logging out Full-permission user');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 8: Full-permission role verified');
    },
  );

  // Test 9: No address-book permission at all
  it(
    'No-access role - cannot access the company address book at all',
    () => {
      cy.logToTerminal('========= ⚙️ Test 9: No-access role =========');

      cy.logToTerminal('🔐 Login as No-access user');
      actions.login(addressBookUsers.noAccess, urls);

      cy.visit(urls.companyProfile);
      cy.wait(3000);

      cy.logToTerminal('🔍 Verifying the address book is not offered / shows no-permission state');
      cy.get('body').then(($body) => {
        if (/address\s*book/i.test($body.text())) {
          cy.contains(/address\s*book/i).click({ force: true });
          cy.contains(addressBookLabels.noPermissionCreate).should('be.visible');
          cy.contains(addressBookLabels.createNew).should('not.exist');
        } else {
          cy.logToTerminal('✅ Address Book link not offered for no-access role, as expected');
        }
      });

      cy.logToTerminal('🚪 Logging out No-access user');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 9: No-access role verified');
    },
  );

  // Test 10: Cleanup
  it(
    'Cleanup - Delete address book users and roles',
    () => {
      cy.logToTerminal('========= ⚙️ Test 10: Cleanup =========');

      const addressBookUsersConfig = Cypress.env('addressBookUsersConfig') || [];

      cy.logToTerminal('🗑️ Deleting address book test users');
      addressBookUsersConfig
        .reduce((chain, element) => chain.then(() => {
          actions.login(element.user, urls);
          cy.visit('/');
          cy.wait(3000);
          cy.deleteCustomer();
        }), cy.wrap(null));

      cy.logToTerminal('🔐 Login as company admin to clean up roles');
      cy.then(() => {
        actions.login(Cypress.env('testAdmin'), urls);
        cy.wait(3000);

        const roleNamesToDelete = addressBookUsersConfig
          .map((config) => config.role?.role_name)
          .filter(Boolean);
        const userEmailsToUnassign = addressBookUsersConfig.map((config) => config.user.email);
        const cleanupCompanyId = Cypress.env('testCompany')?.id;

        cy.wrap(unassignRoles(userEmailsToUnassign, cleanupCompanyId), { timeout: 60000 }).then(() => {
          if (!roleNamesToDelete.length) {
            cy.logToTerminal('⚠️ No role names found. Skipping deleting address book roles.');
            return;
          }

          cy.wrap(deleteCompanyRoles(roleNamesToDelete), { timeout: 60000 }).then(() => {
            cy.logToTerminal('✅ All address book test roles deleted successfully');
          });
        });
      });

      cy.wait(1000);
      cy.logToTerminal('✅ B2B Address Book test suite completed');
    },
  );
});
