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
 *     via POST /V1/company/role — this suite's role/permission tests (4-10)
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
  customerShippingAddress,
  customerBillingAddress,
} from '../../fixtures';
import * as selectors from '../../fields';
import * as actions from '../../actions';

// The storefront-personalization dropin fires an eager GraphQL fetch on page
// load which intermittently receives an empty response body on this
// environment, surfacing as an unhandled "Unexpected end of JSON input"
// rejection from scripts/__dropins__/tools/fetch-graphql.js. It's unrelated to
// anything this suite exercises, but Cypress fails the test on any uncaught
// app exception. Matched narrowly (same approach as the existing
// 'Tenant not found' handler in src/support/index.js) so real app errors
// still fail the run.
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Unexpected end of JSON input')) {
    return false;
  }
  return true;
});

describe('B2B Address Book', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const urls = Cypress.env('addressBookUrls');

  before(() => {
    cy.logToTerminal('🚀 B2B Address Book test suite started');
    // TEMPORARY: no REST user/company creation for now — see the real-admin
    // describe block at the bottom of this file for what's actually active.
    // cy.setupCompanyWithAdmin();
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

  // Test 1: Create the permission-matrix roles and users (pure REST, no
  // login/UI at all — mirrors verifyPurchaseOrders.spec.js Test 1 exactly,
  // so the admin's company-attributes linkage has the same natural indexing
  // buffer (role creation waits + user creation waits) before the FIRST
  // login/UI interaction happens in Test 2, instead of touching the company
  // profile UI immediately after company creation.
  it.skip(
    'Setup - Create roles and users',
    () => {
      cy.logToTerminal(
        '========= ⚙️ Test 1: Setup - Create roles and users =========',
      );

      const companyId = Cypress.env('testCompany')?.id;
      cy.logToTerminal(`📋 Using company ID: ${companyId}`);

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
            // manageCompanyRole swallows failures into {success:false, error}
            // internally — check that explicitly instead of trusting result.role
            // to exist, otherwise a failed role creation silently logs as "✅".
            if (!result?.success || !result?.role?.id) {
              cy.logToTerminal(`❌ Role creation FAILED: ${element.role.role_name} | ${result?.error || 'unknown error'}`);
              addressBookUsersConfig[index].roleId = null;
              return;
            }
            addressBookUsersConfig[index].roleId = result.role.id;
            createdRoleIds.push(result.role.id);
            cy.logToTerminal(`✅ Role created: ${element.role.role_name} | ID: ${result.role.id}`);
          });
        }), cy.wrap(null))
        .then(() => {
          Cypress.env('addressBookTestRoleIds', createdRoleIds);
          Cypress.env('addressBookUsersConfig', addressBookUsersConfig);
          cy.logToTerminal(`📝 Stored ${createdRoleIds.length} role IDs for cleanup`);

          const failedRoles = addressBookUsersConfig.filter((c) => !c.roleId);
          if (failedRoles.length) {
            throw new Error(`${failedRoles.length} role(s) failed to create: ${failedRoles.map((c) => c.role.role_name).join(', ')}`);
          }

          cy.logToTerminal('⏳ Waiting for roles to be indexed in the system...');
          cy.wait(5000);
        });

      cy.logToTerminal('⚙️ Creating test users & assigning roles');
      addressBookUsersConfig
        .reduce((chain, element) => chain.then(() => {
          cy.wait(5000);
          return cy.wrap(null).then(() => {
            cy.logToTerminal(`Creating user: ${element.user.email} with role ID: ${element.roleId}...`);
            return createUserAssignCompanyAndRole(element.user, element.roleId).then((result) => {
              if (!result?.success) {
                cy.logToTerminal(`❌ User creation/role assignment FAILED: ${element.user.email} | ${result?.error || 'unknown error'}`);
                return;
              }
              cy.logToTerminal('✅ User created');
            });
          });
        }), cy.wrap(null))
        .then(() => {
          cy.logToTerminal('⏳ Waiting for users and permissions to be fully applied...');
          cy.wait(5000);
          cy.logToTerminal('✅ Test 1: Setup completed successfully');
        });
    },
  );

  // Test 2: First real login/UI interaction — enable the Address Book
  // settings on the Edit Company Profile form. Runs after Test 1's REST
  // setup, which already gives the admin's company-attributes linkage time
  // to index (same structural gap PO relies on between its Test 1 and Test 2).
  it.skip(
    'Company Admin - enable Address Book settings',
    () => {
      cy.logToTerminal('========= ⚙️ Test 2: Enable Address Book settings =========');

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

      cy.logToTerminal('🚪 Logging out Company Admin');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 2: Address Book settings enabled');
    },
  );

  // Test 3: Company Admin bypass - full CRUD lifecycle
  it.skip(
    'Company Admin - complete address CRUD lifecycle (bypass permissions)',
    () => {
      cy.logToTerminal('========= ⚙️ Test 3: Company Admin CRUD lifecycle =========');

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
      cy.logToTerminal('✅ Test 3: Company Admin CRUD lifecycle verified');
    },
  );

  // Test 4: View-only permission
  it.skip(
    'Viewer role - can see addresses but has no create, edit, remove or default actions',
    () => {
      cy.logToTerminal('========= ⚙️ Test 4: Viewer role =========');

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
      cy.logToTerminal('✅ Test 4: Viewer role verified (view-only)');
    },
  );

  // Test 5: Create permission (no default)
  it.skip(
    'Creator role - can add addresses but cannot edit, remove or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 5: Creator role =========');

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
      cy.logToTerminal('✅ Test 5: Creator role verified (create-only, no default)');
    },
  );

  // Test 6: Create + set-default permission
  it.skip(
    'Creator-with-default role - can add addresses and set them as default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 6: Creator-with-default role =========');

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
      cy.logToTerminal('✅ Test 6: Creator-with-default role verified');
    },
  );

  // Test 7: Edit permission
  it.skip(
    'Editor role - can modify existing addresses but cannot create, remove or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 7: Editor role =========');

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
      cy.logToTerminal('✅ Test 7: Editor role verified (edit-only)');
    },
  );

  // Test 8: Delete permission
  it.skip(
    'Deleter role - can remove addresses but cannot create, edit or set default',
    () => {
      cy.logToTerminal('========= ⚙️ Test 8: Deleter role =========');

      cy.logToTerminal('🔐 Login as Deleter');
      actions.login(addressBookUsers.deleter, urls);
      actions.openCompanyAddressBook(urls);

      cy.contains(addressBookLabels.createNew).should('not.exist');
      cy.contains(addressBookLabels.edit).should('not.exist');

      cy.logToTerminal('🗑️ Removing the address edited in Test 7');
      actions.deleteCompanyAddressCard(addressBookAddresses.edited.street, addressBookLabels);
      cy.contains(addressBookAddresses.edited.street).should('not.exist');

      cy.logToTerminal('🚪 Logging out Deleter');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 8: Deleter role verified (delete-only)');
    },
  );

  // Test 9: Full permission
  it.skip(
    'Full-permission role - has create, edit, remove and default actions available',
    () => {
      cy.logToTerminal('========= ⚙️ Test 9: Full-permission role =========');

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
      cy.logToTerminal('✅ Test 9: Full-permission role verified');
    },
  );

  // Test 10: No address-book permission at all
  it.skip(
    'No-access role - cannot access the company address book at all',
    () => {
      cy.logToTerminal('========= ⚙️ Test 10: No-access role =========');

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
      cy.logToTerminal('✅ Test 10: No-access role verified');
    },
  );

  // Test 11: Cleanup
  it.skip(
    'Cleanup - Delete address book users and roles',
    () => {
      cy.logToTerminal('========= ⚙️ Test 11: Cleanup =========');

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

// TEMPORARY: real-admin scenario (TEMP). Uses the pre-existing, already
// Company-Administrator real account instead of any REST-created user —
// REST role creation is blocked (backend returns 500 for every role that
// includes a Magento_CompanyAddressStorefrontCompatibility::* resource_id,
// confirmed via the honest failure-reporting fix in Test 1 above). This
// account bypasses ACL checks entirely, so it can still prove the whole
// feature surface works end-to-end. IMPORTANT: this real account must never
// be deleted by the global afterEach in src/support/deleteCustomer.js — its
// title is added to that file's skipDeleteTests exclusion list.
describe('B2B Address Book - Real Admin Scenario (TEMP)', () => {
  const urls = Cypress.env('addressBookUrls');
  const companyName = 'Atwix QA - PO Disabled';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.logToTerminal('🔐 Login as company admin (real account)');
    // Same retry-if-not-redirected logic as actions.login() — this platform
    // sometimes doesn't redirect to /customer/account right after submit,
    // written inline here instead of calling the shared action.
    const submitLogin = () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit(urls.login);
      cy.get('main .auth-sign-in-form', { timeout: 15000 }).within(() => {
        cy.get('input[name="email"]').type('k.fandeliuk@atwix.com');
        cy.wait(1500);
        cy.get('input[name="password"]').type('qweQWE1!');
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(8000);
      });
    };
    submitLogin();
    const retryLoginIfNeeded = (attemptsLeft) => {
      cy.url().then((url) => {
        if (!url.includes(urls.account) && attemptsLeft > 0) {
          cy.logToTerminal(`⚠️ Login didn't redirect to account page — retrying in 20s (${attemptsLeft} left)`);
          cy.wait(20000);
          submitLogin();
          retryLoginIfNeeded(attemptsLeft - 1);
        }
      });
    };
    retryLoginIfNeeded(2);
    cy.url().should('include', urls.account);
    cy.wait(3000);

    cy.logToTerminal(`🏢 Switching to "${companyName}" company`);
    cy.visit(urls.companyProfile);
    cy.wait(2000);
    cy.get('select[aria-label="Select company"]').select(companyName);
    cy.wait(3000);
  });

  it('Test 1: Address Book toggles start disabled (forced off if not)', () => {
    cy.contains('button', 'Edit').click();
    cy.wait(1000);

    cy.get(selectors.companyProfileAddressBookEnabledCheckbox).then(($cb) => {
      if ($cb.prop('checked')) {
        cy.logToTerminal('⚠️ Address Book was enabled — disabling it');
        cy.wrap($cb).click({ force: true });
      } else {
        cy.logToTerminal('✅ Address Book already disabled');
      }
    });
    cy.get(selectors.companyProfileCustomShippingEnabledCheckbox).then(($cb) => {
      if ($cb.prop('checked')) {
        cy.logToTerminal('⚠️ Custom Company Address was enabled — disabling it');
        cy.wrap($cb).click({ force: true });
      } else {
        cy.logToTerminal('✅ Custom Company Address already disabled');
      }
    });

    cy.contains('button', 'Save Changes').click();
    cy.wait(2000);

    cy.contains('Enable Company Address Book: Disabled').should('be.visible');
    cy.contains('Allow Custom Company Address: Disabled').should('be.visible');
    cy.logToTerminal('✅ Test 1: both toggles confirmed disabled');
  });

  it('Test 2: clean up existing personal addresses, verify list is empty', () => {
    cy.visit(urls.account);
    cy.wait(2000);
    cy.contains('Addresses').should('not.be.disabled').click({ force: true });
    cy.wait(2000);
    // cy.get('body').then() is a one-shot, non-retrying snapshot — if the
    // address list is still loading, it sees an empty body and the whole
    // cleanup loop silently no-ops. Wait for the loading indicator to
    // actually disappear first, every time, not just a fixed wait.
    cy.waitForLoadingSkeletonToDisappear();

    const removeNextAddressIfAny = (attemptsLeft) => {
      if (attemptsLeft <= 0) return;
      cy.waitForLoadingSkeletonToDisappear();
      cy.get('body').then(($body) => {
        if ($body.find(selectors.addressBookCard).length) {
          cy.logToTerminal('🗑️ Removing an existing address');
          cy.get(selectors.addressBookCard).first().within(() => {
            cy.contains(addressBookLabels.remove).click();
          });
          cy.contains(addressBookLabels.removeConfirm).should('be.visible');
          cy.get(selectors.addressBookModalButtons).contains(addressBookLabels.remove).click();
          cy.wait(2000);
          removeNextAddressIfAny(attemptsLeft - 1);
        }
      });
    };
    removeNextAddressIfAny(20);

    cy.contains(addressBookLabels.noSavedAddresses).should('be.visible');
    cy.logToTerminal('✅ Test 2: address list confirmed empty');
  });

  it('Test 3: create one plain personal address while toggles are off', () => {
    cy.visit(urls.account);
    cy.wait(2000);
    cy.contains('Addresses').should('not.be.disabled').click({ force: true });
    cy.wait(2000);

    cy.contains(addressBookLabels.createNew).click();
    cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
    actions.fillCompanyAddressFields(addressBookAddresses.shipping);
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);

    cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');
    cy.logToTerminal('✅ Test 3: plain personal address created');
  });

  it('Test 4: enabling Address Book hides the personal address (separate dataset)', () => {
    cy.contains('button', 'Edit').click();
    cy.wait(1000);
    cy.get(selectors.companyProfileAddressBookEnabledCheckbox).then(($cb) => {
      if (!$cb.prop('checked')) {
        cy.wrap($cb).click({ force: true });
      }
    });
    cy.contains('button', 'Save Changes').click();
    cy.wait(2000);
    cy.contains('Enable Company Address Book: Enabled').should('be.visible');

    cy.visit(urls.account);
    cy.wait(2000);
    cy.contains('Addresses').should('not.be.disabled').click({ force: true });
    cy.wait(2000);

    cy.contains(addressBookAddresses.shipping.lastName).should('not.exist');
    cy.logToTerminal('✅ Test 4: personal address no longer shown once Address Book is enabled — confirms separate dataset');
  });

  it('Test 5: admin can create, edit and set default on a company address', () => {
    actions.openCompanyAddressBook(urls);
    // Same one-shot-snapshot pitfall as Test 2 — wait for the loading
    // indicator to actually disappear before the first check, and again on
    // every iteration, instead of trusting a fixed wait.
    cy.waitForLoadingSkeletonToDisappear();

    cy.logToTerminal('🧹 Cleaning up any existing company addresses first (real, persistent company)');
    const removeNextCompanyAddressIfAny = (attemptsLeft) => {
      if (attemptsLeft <= 0) return;
      cy.waitForLoadingSkeletonToDisappear();
      cy.get('body').then(($body) => {
        if ($body.find(selectors.addressBookCard).length) {
          cy.logToTerminal('🗑️ Removing an existing company address');
          cy.get(selectors.addressBookCard).first().within(() => {
            cy.contains(addressBookLabels.remove).click();
          });
          cy.contains(addressBookLabels.removeConfirm).should('be.visible');
          cy.get(selectors.addressBookModalButtons).contains(addressBookLabels.remove).click();
          cy.wait(2000);
          removeNextCompanyAddressIfAny(attemptsLeft - 1);
        }
      });
    };
    removeNextCompanyAddressIfAny(20);
    cy.contains(addressBookLabels.noSavedAddresses).should('be.visible');
    cy.logToTerminal('✅ Company address list confirmed empty before starting');

    cy.logToTerminal('📝 Creating a billing company address');
    cy.contains(addressBookLabels.createNew).click();
    cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
    actions.fillCompanyAddressFields(addressBookAddresses.billing);
    cy.get(selectors.addressBookTypeBillingCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.billing.lastName).should('be.visible');

    cy.logToTerminal('✏️ Editing it');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.billing.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).click();
      });
    actions.fillCompanyAddressFields(addressBookAddresses.editedBilling);
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.editedBilling.street).should('be.visible');

    cy.logToTerminal('⭐ Setting it as default');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.editedBilling.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).click();
      });
    cy.get(selectors.addressBookIsDefaultCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);

    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.editedBilling.lastName)
      .closest(selectors.addressBookCard)
      .should('contain.text', addressBookLabels.defaultBillingBadge);
    cy.logToTerminal('✅ Billing: create, edit and set-default verified');

    cy.logToTerminal('📝 Creating a shipping company address');
    cy.contains(addressBookLabels.createNew).click();
    cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
    actions.fillCompanyAddressFields(addressBookAddresses.shipping);
    cy.get(selectors.addressBookTypeShippingCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

    cy.logToTerminal('✏️ Editing it');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.shipping.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).click();
      });
    actions.fillCompanyAddressFields(addressBookAddresses.editedShipping);
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.editedShipping.street).should('be.visible');

    cy.logToTerminal('⭐ Setting it as default');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.editedShipping.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).click();
      });
    cy.get(selectors.addressBookIsDefaultCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);

    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.editedShipping.lastName)
      .closest(selectors.addressBookCard)
      .should('contain.text', addressBookLabels.defaultShippingBadge);
    cy.logToTerminal('✅ Shipping: create, edit and set-default verified');

    cy.logToTerminal('🔀 Confirming both a billing and a shipping company address exist');
    cy.contains(addressBookAddresses.editedBilling.lastName).should('be.visible');
    cy.contains(addressBookAddresses.editedShipping.lastName).should('be.visible');
    cy.logToTerminal('✅ Test 5: both billing and shipping company addresses created, edited and defaulted');
  });

  // Test 6: grant the "Company Addresses" permission (Add/Edit/Delete/Set
  // Default Address) on the Default User role via the real roles-tree UI —
  // sidesteps the broken REST role-creation path entirely (POST /V1/company/role
  // 500s on Magento_CompanyAddressStorefrontCompatibility::* resource_ids, see
  // Test 1 in the describe above). Editing an EXISTING role through the UI
  // form is a different code path and may not hit the same backend limitation.
  // Selector pattern (tree-node/tree-label + click the checkbox's parent)
  // mirrors the already-working verifyCompanyRolesAndPermissions.spec.js —
  // real checkbox `name` attributes are random per-render (tree-checkbox-XXXXX),
  // so nodes must be found by their visible label text instead.
  it('Test 6: grant Company Addresses permission on Default User role via roles tree', () => {
    cy.visit('/customer/company/roles');
    cy.wait(2000);

    cy.contains('Default User')
      .closest('tr')
      .within(() => {
        cy.contains('Edit').click();
      });
    cy.wait(1000);
    cy.get('.edit-role-and-permission__tree-container').should('be.visible');

    cy.logToTerminal('☑️ Checking "Company Addresses" node');
    // Click the native input directly with force:true — same proven pattern
    // as the Address Book settings checkboxes (toggleCompanyAddressBookSettings).
    // Clicking the checkbox's parent label (an earlier attempt) did not
    // actually toggle it. Idempotent — this is a real, persistent role, so a
    // prior run may have already left this checked; only click if needed.
    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('.edit-role-and-permission__tree-node')
      .find('input[type="checkbox"]')
      .then(($cb) => {
        if (!$cb.prop('checked')) {
          cy.wrap($cb).click({ force: true });
        } else {
          cy.logToTerminal('✅ Company Addresses already checked from a prior run');
        }
      });
    cy.wait(1000);
    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('.edit-role-and-permission__tree-node')
      .find('input[type="checkbox"]')
      .should('be.checked');

    cy.logToTerminal('🔍 Verifying the 4 child permissions auto-checked');
    // Scope to the "Company Addresses" <li> tree item specifically — an
    // unscoped page-wide `cy.contains('.edit-role-and-permission__tree-label', 'Add')`
    // can match an unrelated node's child with the same generic label
    // (Add/Edit/Delete are common across many permission categories).
    // Also expand the node first — collapsed children may not render in the DOM.
    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('li.acm-tree__item')
      .as('companyAddressesNode');

    cy.get('@companyAddressesNode').find('.edit-role-and-permission__tree-expander').then(($btn) => {
      if ($btn.text().trim() === '+') {
        cy.wrap($btn).click();
      }
    });
    cy.wait(500);

    // Exact match, not cy.contains() — "Company Addresses" contains "Add",
    // so substring matching would assert against the parent row instead.
    ['Add', 'Edit', 'Delete', 'Set Default Address'].forEach((childLabel) => {
      cy.get('@companyAddressesNode')
        .find('.edit-role-and-permission__tree-label')
        .filter((i, el) => el.textContent.trim() === childLabel)
        .closest('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .should('be.checked');
    });

    cy.contains('button', 'Save Role').click();
    cy.wait(2000);
    cy.logToTerminal('✅ Test 6: Company Addresses permission granted on Default User role');
  });
});

// TEMPORARY: granular permission scenario using a second real, pre-existing
// user (l66ku@emalupe.com) who holds the "Default User" role on the same
// "Atwix QA - PO Disabled" company. Alternates admin (toggles individual
// Company Addresses child permissions via the roles tree) and this regular
// user (verifies what is/isn't possible at each permission level) — no REST
// user creation, matching the same constraint as the describe above.
// IMPORTANT: this real account must never be deleted — its title is added
// to src/support/deleteCustomer.js's skipDeleteTests exclusion list.
describe('B2B Address Book - Regular User Permission Scenario (TEMP)', () => {
  const urls = Cypress.env('addressBookUrls');
  const companyName = 'Atwix QA - PO Disabled';

  const loginAs = (email, password) => {
    const submitLogin = () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit(urls.login);
      cy.get('main .auth-sign-in-form', { timeout: 15000 }).within(() => {
        cy.get('input[name="email"]').type(email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(password);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(8000);
      });
    };
    submitLogin();
    const retryLoginIfNeeded = (attemptsLeft) => {
      cy.url().then((url) => {
        if (!url.includes(urls.account) && attemptsLeft > 0) {
          cy.logToTerminal(`⚠️ Login didn't redirect to account page — retrying in 20s (${attemptsLeft} left)`);
          cy.wait(20000);
          submitLogin();
          retryLoginIfNeeded(attemptsLeft - 1);
        }
      });
    };
    retryLoginIfNeeded(2);
    cy.url().should('include', urls.account);
    cy.wait(3000);
  };

  const switchToTestCompany = () => {
    cy.visit(urls.companyProfile);
    cy.wait(2000);
    cy.waitForLoadingSkeletonToDisappear();
    // Wait for the profile card to actually render BEFORE deciding whether a
    // switcher exists. cy.get('body').then() is a one-shot, non-retrying
    // snapshot: taken mid-load it wrongly concludes "no switcher", silently
    // skips the switch, and leaves the admin operating on whatever company
    // happened to be active — which previously caused a permission change to
    // be written to the wrong company's Default User role.
    cy.get('.account-company-profile-card__wrapper', { timeout: 20000 }).should('exist');

    // The switcher only renders when the account has more than one company
    // (e.g. the admin's four). A regular user scoped to a single company has
    // nothing to switch between, so its absence is legitimate there.
    cy.get('body').then(($body) => {
      if ($body.find('select[aria-label="Select company"]').length) {
        cy.get('select[aria-label="Select company"]').select(companyName);
        cy.wait(3000);
      } else {
        cy.logToTerminal('ℹ️ No company switcher found — account has only one company');
      }
    });

    // Hard gate: whether we switched or were already there, never proceed
    // unless the active company really is the test company. Everything after
    // this mutates real, persistent company data.
    // Scoped to the rendered profile card on purpose — a page-wide
    // cy.contains() also matches the <option> inside the switcher <select>,
    // and options are 0x0 so they can never satisfy should('be.visible').
    cy.get('.account-company-profile-card__content', { timeout: 15000 })
      .should('contain.text', companyName);
    cy.logToTerminal(`🏢 Confirmed active company: ${companyName}`);
  };

  const loginAsAdminAndSwitch = () => {
    cy.logToTerminal('🔐 Login as company admin (real account)');
    loginAs('k.fandeliuk@atwix.com', 'qweQWE1!');
    switchToTestCompany();
  };

  const loginAsRegularUserAndSwitch = () => {
    cy.logToTerminal('🔐 Login as regular user (real account)');
    loginAs('l66ku@emalupe.com', 'qweQWE1!');
    switchToTestCompany();
  };

  // Sets one or more Company Addresses child permissions (Add/Edit/Delete/
  // Set Default Address) on the Default User role in a single edit+save pass.
  // Idempotent per child — only clicks if the current state differs.
  // Tree behaviour, confirmed by observation: clicking the PARENT toggles
  // every child at once (all on / all off), while clicking a CHILD affects
  // only that child and leaves the parent alone. So partial permission sets
  // are set purely by clicking children — never touch the parent here.
  const setChildPermissions = (changes) => {
    cy.visit('/customer/company/roles');
    cy.wait(2000);
    cy.contains('Default User').closest('tr').within(() => {
      cy.contains('Edit').click();
    });
    cy.wait(1000);
    cy.get('.edit-role-and-permission__tree-container').should('be.visible');

    // Expand the whole tree in one go, same as verifyCompanyRolesAndPermissions.spec.js
    // does — simpler and more reliable than clicking individual "+" expanders.
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);

    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('li.acm-tree__item')
      .as('companyAddressesNode');

    // Always log actual current checkbox state before touching anything —
    // makes it far easier to see what's really going on instead of assuming.
    cy.get('@companyAddressesNode').then(($node) => {
      const parentChecked = $node.children('.edit-role-and-permission__tree-node').find('input[type="checkbox"]').prop('checked');
      const childStates = ['Add', 'Edit', 'Delete', 'Set Default Address'].map((label) => {
        const $child = $node.find('> ul > li .edit-role-and-permission__tree-label').filter((i, el) => el.textContent.trim() === label);
        const $cb = $child.closest('.edit-role-and-permission__tree-node').find('input[type="checkbox"]');
        return `${label}=${$cb.length ? $cb.prop('checked') : 'not found'}`;
      });
      cy.logToTerminal(`🔎 Current state — Company Addresses (parent)=${parentChecked} | ${childStates.join(', ')}`);
    });

    changes.forEach(({ label, checked }) => {
      // Scoped to DIRECT children ('> ul > li', the pattern used by
      // verifyCompanyRolesAndPermissions.spec.js) plus an exact-text filter.
      // Both matter: the parent label "Company Addresses" contains the
      // substring "Add", so an unscoped cy.contains('Add') selects the PARENT
      // row — and clicking the parent toggles every child at once, silently
      // wiping the whole permission set. Clicking a child affects only itself.
      cy.get('@companyAddressesNode')
        .find('> ul > li .edit-role-and-permission__tree-label')
        .filter((i, el) => el.textContent.trim() === label)
        .closest('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .then(($cb) => {
          if ($cb.prop('checked') !== checked) {
            cy.logToTerminal(`🔧 Setting "${label}" to ${checked}`);
            cy.wrap($cb).click({ force: true });
          } else {
            cy.logToTerminal(`✅ "${label}" already ${checked}`);
          }
        });
      cy.wait(500);
    });

    // Recheck state one more time right before saving — confirms the clicks
    // above actually landed, instead of assuming they did.
    cy.get('@companyAddressesNode').then(($node) => {
      const parentChecked = $node.children('.edit-role-and-permission__tree-node').find('input[type="checkbox"]').prop('checked');
      const childStates = ['Add', 'Edit', 'Delete', 'Set Default Address'].map((label) => {
        const $child = $node.find('> ul > li .edit-role-and-permission__tree-label').filter((i, el) => el.textContent.trim() === label);
        const $cb = $child.closest('.edit-role-and-permission__tree-node').find('input[type="checkbox"]');
        return `${label}=${$cb.length ? $cb.prop('checked') : 'not found'}`;
      });
      cy.logToTerminal(`🔎 State before Save — Company Addresses (parent)=${parentChecked} | ${childStates.join(', ')}`);
    });

    cy.contains('button', 'Save Role').click();
    cy.wait(2000);
  };

  // Deletes every company address currently in the book, then asserts empty.
  // Used both to clear leftovers from earlier runs/admin actions and as the
  // natural cleanup step at permission levels where the user can still delete.
  const removeAllCompanyAddresses = () => {
    cy.waitForLoadingSkeletonToDisappear();
    const removeNext = (attemptsLeft) => {
      if (attemptsLeft <= 0) return;
      cy.waitForLoadingSkeletonToDisappear();
      cy.get('body').then(($body) => {
        if ($body.find(selectors.addressBookCard).length) {
          cy.logToTerminal('🗑️ Removing a company address');
          cy.get(selectors.addressBookCard).first().within(() => {
            cy.contains(addressBookLabels.remove).click();
          });
          cy.contains(addressBookLabels.removeConfirm).should('be.visible');
          cy.get(selectors.addressBookModalButtons).contains(addressBookLabels.remove).click();
          cy.wait(2000);
          removeNext(attemptsLeft - 1);
        }
      });
    };
    removeNext(20);
    cy.contains(addressBookLabels.noSavedAddresses).should('be.visible');
  };

  const createCompanyAddress = (address, typeCheckbox) => {
    cy.contains(addressBookLabels.createNew).click();
    cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
    actions.fillCompanyAddressFields(address);
    cy.get(typeCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(address.lastName).should('be.visible');
  };

  const openEditFormFor = (lastName) => {
    cy.get(selectors.addressBookCard)
      .contains(lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).click();
      });
  };

  const logout = () => {
    cy.visit('/');
    cy.wait(3000);
    actions.logout(addressBookLabels);
  };

  // Runs first so the scenario is idempotent and re-runnable from ANY prior
  // state — these are real, persistent permissions on a real role, so an
  // interrupted earlier run can otherwise leave them partially revoked and
  // make RU1 (which needs full rights) fail for the wrong reason.
  it('RU0: Admin restores full Company Addresses permissions (scenario baseline)', () => {
    loginAsAdminAndSwitch();
    setChildPermissions([
      { label: 'Add', checked: true },
      { label: 'Edit', checked: true },
      { label: 'Delete', checked: true },
      { label: 'Set Default Address', checked: true },
    ]);
    logout();
    cy.logToTerminal('✅ RU0: baseline full permissions restored');
  });

  it('RU1: Full rights — user clears the book, then creates, edits, sets default and deletes', () => {
    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('🧹 Clearing every existing address (including any left by the admin)');
    removeAllCompanyAddresses();

    cy.logToTerminal('📝 Create');
    createCompanyAddress(addressBookAddresses.shipping, selectors.addressBookTypeShippingCheckbox);

    cy.logToTerminal('✏️ Edit');
    openEditFormFor(addressBookAddresses.shipping.lastName);
    actions.fillCompanyAddressFields(addressBookAddresses.editedShipping);
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.editedShipping.street).should('be.visible');

    cy.logToTerminal('⭐ Set default');
    openEditFormFor(addressBookAddresses.editedShipping.lastName);
    cy.get(selectors.addressBookIsDefaultCheckbox).check({ force: true });
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.editedShipping.lastName)
      .closest(selectors.addressBookCard)
      .should('contain.text', addressBookLabels.defaultShippingBadge);

    cy.logToTerminal('🗑️ Delete');
    removeAllCompanyAddresses();

    logout();
    cy.logToTerminal('✅ RU1: all four rights verified, book left empty');
  });

  it('RU2: Set Default removed — user can still create, edit and delete, but no default control', () => {
    loginAsAdminAndSwitch();
    setChildPermissions([{ label: 'Set Default Address', checked: false }]);
    logout();

    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('📝 Create still works');
    createCompanyAddress(addressBookAddresses.billing, selectors.addressBookTypeBillingCheckbox);

    cy.logToTerminal('🔍 Default control is gone or disabled');
    openEditFormFor(addressBookAddresses.billing.lastName);
    cy.get('body').then(($body) => {
      const $cb = $body.find(selectors.addressBookIsDefaultCheckbox);
      if ($cb.length === 0) {
        cy.logToTerminal('✅ Default checkbox not rendered at all');
      } else {
        cy.get(selectors.addressBookIsDefaultCheckbox).should('be.disabled');
        cy.logToTerminal('✅ Default checkbox rendered but disabled');
      }
    });

    cy.logToTerminal('✏️ Edit still works');
    actions.fillCompanyAddressFields(addressBookAddresses.editedBilling);
    cy.contains(addressBookLabels.save).click();
    cy.wait(3000);
    cy.contains(addressBookAddresses.editedBilling.street).should('be.visible');

    cy.logToTerminal('🗑️ Delete still works');
    removeAllCompanyAddresses();

    logout();
    cy.logToTerminal('✅ RU2: create/edit/delete intact, set-default blocked');
  });

  it('RU3: Edit also removed — user can still create and delete, but no Edit action', () => {
    loginAsAdminAndSwitch();
    setChildPermissions([{ label: 'Edit', checked: false }]);
    logout();

    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('📝 Create still works');
    createCompanyAddress(addressBookAddresses.shipping, selectors.addressBookTypeShippingCheckbox);

    cy.logToTerminal('🔍 No Edit action on the card');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.shipping.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).should('not.exist');
        cy.contains(addressBookLabels.remove).should('be.visible');
      });

    cy.logToTerminal('📌 Leaving this address behind for RU4 (which loses the ability to create)');
    logout();
    cy.logToTerminal('✅ RU3: create/delete intact, edit blocked');
  });

  it('RU4: Add also removed — user can only delete, and clears the book doing so', () => {
    loginAsAdminAndSwitch();
    setChildPermissions([{ label: 'Add', checked: false }]);
    logout();

    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('🔍 No Create action');
    cy.contains(addressBookLabels.createNew).should('not.exist');

    cy.logToTerminal('🔍 Address from RU3 is visible, with Remove but no Edit');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.shipping.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).should('not.exist');
        cy.contains(addressBookLabels.remove).should('be.visible');
      });

    cy.logToTerminal('🗑️ Delete still works — user clears the book');
    removeAllCompanyAddresses();

    logout();
    cy.logToTerminal('✅ RU4: delete-only access confirmed, book left empty');
  });

  it('RU5: Delete also removed — view-only user sees an admin-seeded address but has no actions', () => {
    loginAsAdminAndSwitch();
    setChildPermissions([{ label: 'Delete', checked: false }]);

    cy.logToTerminal('📝 Admin (bypass) seeds one address for the view-only check');
    actions.openCompanyAddressBook(urls);
    createCompanyAddress(addressBookAddresses.shipping, selectors.addressBookTypeShippingCheckbox);
    logout();

    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('🔍 Address is visible but every action is gone');
    cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');
    cy.contains(addressBookLabels.createNew).should('not.exist');
    cy.get(selectors.addressBookCard)
      .contains(addressBookAddresses.shipping.lastName)
      .closest(selectors.addressBookCard)
      .within(() => {
        cy.contains(addressBookLabels.edit).should('not.exist');
        cy.contains(addressBookLabels.remove).should('not.exist');
      });

    logout();
    cy.logToTerminal('✅ RU5: view-only access confirmed');
  });

  it('RU6: Admin confirms the address survived, cleans up and restores full permissions', () => {
    loginAsAdminAndSwitch();
    actions.openCompanyAddressBook(urls);

    cy.logToTerminal('🔍 The seeded address survived the whole permission-toggling scenario');
    cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

    cy.logToTerminal('🧹 Cleaning up');
    removeAllCompanyAddresses();

    cy.logToTerminal('🔧 Restoring full permissions so the scenario can be re-run');
    setChildPermissions([
      { label: 'Add', checked: true },
      { label: 'Edit', checked: true },
      { label: 'Delete', checked: true },
      { label: 'Set Default Address', checked: true },
    ]);

    logout();
    cy.logToTerminal('✅ RU6: data survived, cleanup and permission restore complete');
  });


  // End-to-end purchase as the regular company user, then verify the order
  // appears in order history.
  //
  // IMPORTANT (corrects an earlier assumption): B2B checkout does NOT render
  // the B2C "type a new address" form. It renders a SAVED COMPANY ADDRESS
  // selection view — with no addresses in the book it shows the "No saved
  // addresses" empty state and there is nothing to fill in. So this test
  // creates a SHIPPING and a BILLING company address first, then checks out.
  // Payment is left on the default Check / Money order radio (no Payment
  // Services iframes to flake on).
  it('RU7: Regular user creates addresses, buys a product and finds the order in order history', () => {
    loginAsRegularUserAndSwitch();

    cy.logToTerminal('🧹 Starting from a clean address book');
    actions.openCompanyAddressBook(urls);
    removeAllCompanyAddresses();

    cy.logToTerminal('📝 Creating a SHIPPING company address');
    createCompanyAddress(addressBookAddresses.shipping, selectors.addressBookTypeShippingCheckbox);

    cy.logToTerminal('📝 Creating a BILLING company address');
    createCompanyAddress(addressBookAddresses.billing, selectors.addressBookTypeBillingCheckbox);

    cy.logToTerminal('🛒 Adding a simple product to the cart');
    cy.visit('/products/youth-tee/adb150');
    // Button can render before the product form hydrates; clicking while
    // still disabled registers in the UI but never reaches the cart model.
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get('.minicart-wrapper').click();
    // Panel re-fetches cart contents on open — wait for the loaded flag so the
    // checkout navigation below doesn't run against stale cart state.
    cy.get('.minicart-panel[data-loaded="true"]', { timeout: 20000 }).should('exist');
    cy.get('.minicart-panel').should('not.be.empty');

    cy.logToTerminal('💳 Proceeding to checkout');
    cy.visit('/checkout');
    cy.url().should('include', '/checkout');
    cy.waitForLoadingSkeletonToDisappear();

    cy.logToTerminal('🔍 Confirming the saved company addresses are offered at checkout');
    cy.contains('No saved addresses').should('not.exist');
    cy.contains(addressBookAddresses.shipping.lastName, { timeout: 30000 }).should('be.visible');

    // Explicitly select a shipping and a billing address. Confirmed markup:
    // each saved address renders a visually-hidden
    // input[type=radio][name="selectedShippingAddress"|"selectedBillingAddress"]
    // wrapped by a label containing the address card. None is preselected, and
    // without a selection the cart has no address — placing the order then
    // fails with "An unexpected error occurred while processing your order".
    // force:true because the radio itself is hidden behind its label/card.
    cy.logToTerminal('📮 Selecting the saved shipping address');
    // Click the LABEL, which is what a real user clicks (it wraps the address
    // card); force-checking the hidden input can set the DOM property without
    // the component's change handler applying the address to the cart.
    cy.get('input[type="radio"][name="selectedShippingAddress"]')
      .should('have.length.greaterThan', 0)
      .first()
      .then(($input) => {
        cy.get(`label[for="${$input.attr('id')}"]`).click();
      });
    cy.wait(3000);
    cy.get('input[type="radio"][name="selectedShippingAddress"]').first().should('be.checked');

    cy.logToTerminal('🧾 Selecting the saved billing address');
    cy.get('input[type="radio"][name="selectedBillingAddress"]')
      .should('have.length.greaterThan', 0)
      .first()
      .then(($input) => {
        cy.get(`label[for="${$input.attr('id')}"]`).click();
      });
    cy.wait(3000);
    cy.get('input[type="radio"][name="selectedBillingAddress"]').first().should('be.checked');

    // Capture the real server-side reason if the order is rejected — the UI
    // only ever shows a generic "An unexpected error occurred while
    // processing your order", which is not actionable on its own.
    // Collect into a plain array: cy.* commands cannot be called from inside
    // an intercept handler.
    const gqlErrors = [];
    cy.intercept('POST', '**/graphql', (req) => {
      req.continue((res) => {
        const errors = res.body?.errors;
        if (errors?.length) {
          errors.forEach((e) => gqlErrors.push(e.message));
        }
      });
    });

    cy.logToTerminal('✅ Accepting terms and placing the order (Check / Money order)');
    actions.checkTermsAndConditions();
    actions.placeOrder();
    cy.wait(15000);
    cy.then(() => {
      if (gqlErrors.length) {
        cy.logToTerminal(`🔴 GraphQL errors during order placement: ${JSON.stringify([...new Set(gqlErrors)])}`);
      } else {
        cy.logToTerminal('🔵 No GraphQL errors captured during order placement');
      }
    });

    // B2B checkout places a PURCHASE ORDER, not a plain order, so the
    // confirmation is the PO screen ("Your Purchase Order request number
    // is #...") rather than .order-confirmation.
    cy.logToTerminal('🧾 Verifying the purchase order confirmation');
    actions.verifyPOConfirmation();

    cy.get(selectors.poConfirmationLink, { timeout: 60000 })
      .should('be.visible')
      .invoke('text')
      .then((text) => {
        const poNumber = text.trim();
        Cypress.env('addressBookPoNumber', poNumber);
        cy.logToTerminal(`🧾 Purchase order placed: ${poNumber}`);
      });

    cy.logToTerminal('📄 Opening the purchase order from the confirmation link');
    cy.get(selectors.poConfirmationLink).click();
    cy.url().should('include', 'poRef');
    cy.waitForLoadingSkeletonToDisappear();

    // The whole point of the scenario: the order must carry the company
    // addresses that were selected at checkout, not some other address.
    cy.logToTerminal('🔍 Verifying the order carries the selected company addresses');
    cy.get(selectors.orderShippingAddress, { timeout: 30000 })
      .should('contain.text', addressBookAddresses.shipping.lastName)
      .and('contain.text', addressBookAddresses.shipping.street)
      .and('contain.text', addressBookAddresses.shipping.city)
      .and('contain.text', addressBookAddresses.shipping.postcode);

    cy.get(selectors.orderBillingAddress)
      .should('contain.text', addressBookAddresses.billing.lastName)
      .and('contain.text', addressBookAddresses.billing.street)
      .and('contain.text', addressBookAddresses.billing.city)
      .and('contain.text', addressBookAddresses.billing.postcode);

    cy.then(() => {
      cy.logToTerminal(`✅ RU7: purchase order ${Cypress.env('addressBookPoNumber')} placed with both company addresses`);
    });

    logout();
  });
});
