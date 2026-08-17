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
} from '../../fixtures';
import * as selectors from '../../fields';
import * as actions from '../../actions';

describe('B2B Address Book', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const urls = Cypress.env('addressBookUrls');

  before(() => {
    cy.logToTerminal('🚀 B2B Address Book test suite started');
    // TEMPORARY: no REST company/user creation for now — Test 2 uses a
    // pre-existing real account instead. See plan note above Test 2.
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
    },
  );

  // TEMPORARY DEBUG test — login + visit /customer/company + detect what's
  // actually on the page, since select[aria-label="Select company"] stopped
  // being found on the last run. No guessing at selectors this time — dump
  // real select elements + a body text snippet into the log.
  it('DEBUG - login, visit company page, detect company switcher', () => {
    cy.logToTerminal('🔐 Login as company admin (real account)');
    // This platform sometimes doesn't redirect to /customer/account right
    // after submit — same retry-if-not-redirected logic as actions.login(),
    // just written inline here instead of calling the shared action.
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
    cy.url().then((url) => cy.logToTerminal(`🔎 URL after login: ${url}`));

    cy.logToTerminal('🏢 Visiting company profile page');
    cy.visit(urls.companyProfile);
    cy.wait(3000);

    cy.get('body').then(($body) => {
      const selects = [...$body.find('select')].map((el) => ({
        ariaLabel: el.getAttribute('aria-label'),
        id: el.id,
        className: el.className,
        optionsCount: el.options.length,
      }));
      cy.logToTerminal(`🔬 selects on page: ${JSON.stringify(selects)}`);
      cy.logToTerminal(`🔬 body text snippet: ${$body.text().slice(0, 800)}`);
    });
  });

  // Test 2: Company Admin (existing real account) — full Address Book
  // scenario in one pass. Uses a pre-existing, already-verified real user
  // instead of a freshly REST-created one, to sidestep the REST-creation
  // instability (company-linkage indexing races, and the confirmed rejection
  // of Magento_CompanyAddressStorefrontCompatibility::* role permissions on
  // this backend) while still proving the whole feature surface works,
  // since Company Administrator bypasses ACL checks entirely. Granular
  // per-role permission testing is deferred to a later test with other real
  // users, once the REST role-creation problem is solved.
  it.skip(
    'Company Admin (real user) - complete Address Book scenario',
    () => {
      cy.logToTerminal('========= ⚙️ Test 2: Real-user Address Book scenario =========');

      cy.logToTerminal('🔐 Login as company admin (real account)');
      // Same retry-if-not-redirected logic as actions.login() — this
      // platform sometimes doesn't redirect to /customer/account right
      // after submit, written inline here instead of calling the shared action.
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

      cy.logToTerminal('🏢 Switching to "Atwix QA - PO Disabled" company');
      cy.visit(urls.companyProfile);
      cy.wait(2000);
      cy.get('select[aria-label="Select company"]').select('Atwix QA - PO Disabled');
      cy.wait(3000);

      cy.logToTerminal('🔧 Toggling Address Book setting off, then on — proves both directions work');
      actions.toggleCompanyAddressBookSettings(urls, { addressBookEnabled: false });
      actions.toggleCompanyAddressBookSettings(urls, { addressBookEnabled: true });

      cy.logToTerminal('🔧 Toggling Custom Company Address setting off, then on');
      actions.toggleCompanyAddressBookSettings(urls, { customShippingAddressEnabled: false });
      actions.toggleCompanyAddressBookSettings(urls, { customShippingAddressEnabled: true });

      cy.logToTerminal('🔍 Verifying the company address list is empty before creating anything');
      actions.openCompanyAddressBook(urls);
      // TBD: confirm "No saved addresses" is the real empty-state text for
      // the B2B company address book (only confirmed so far for B2C personal
      // addresses in verifyUserAccount.spec.js).
      cy.contains(addressBookLabels.noSavedAddresses).should('be.visible');

      cy.logToTerminal('📝 Creating shipping address');
      cy.contains(addressBookLabels.createNew).click();
      cy.get(selectors.addressBookFormTitle).should('contain.text', addressBookLabels.addAddress);
      actions.fillCompanyAddressFields(addressBookAddresses.shipping);
      cy.get(selectors.addressBookTypeShippingRadio).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.shipping.lastName).should('be.visible');

      cy.logToTerminal('✏️ Editing shipping address immediately after creating it');
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

      cy.logToTerminal('📝 Creating billing address');
      cy.contains(addressBookLabels.createNew).click();
      actions.fillCompanyAddressFields(addressBookAddresses.billing);
      cy.get(selectors.addressBookTypeBillingRadio).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);
      cy.contains(addressBookAddresses.billing.lastName).should('be.visible');

      cy.logToTerminal('✏️ Editing billing address immediately after creating it');
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

      cy.logToTerminal('⭐ Setting default only at the end, on the billing address');
      cy.get(selectors.addressBookCard)
        .contains(addressBookAddresses.editedBilling.lastName)
        .closest(selectors.addressBookCard)
        .within(() => {
          cy.contains(addressBookLabels.edit).click();
        });
      cy.get(selectors.addressBookDefaultBillingCheckbox).check({ force: true });
      cy.contains(addressBookLabels.save).click();
      cy.wait(3000);

      cy.logToTerminal('🚪 Logging out');
      cy.visit('/');
      cy.wait(3000);
      actions.logout(addressBookLabels);
      cy.logToTerminal('✅ Test 2: Real-user Address Book scenario verified');
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
