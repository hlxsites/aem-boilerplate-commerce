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

import { createCompanyUser, cleanupTestCompany } from '../../support/b2bCompanyAPICalls';
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

// Exactly two accounts exist for this suite, both created via REST and both
// disposable: the company admin that comes with the company, and one regular
// user on the company's built-in "Default User" role. The permission matrix is
// driven by editing that role in the UI rather than by creating extra roles or
// users — POST /V1/company/role rejects every role carrying a
// Magento_CompanyAddressStorefrontCompatibility::* resource_id.
//
// The company is created with purchase orders enabled, so the final scenario
// can place a real purchase order using the company addresses.
const REGULAR_USER_PASSWORD = 'Test123!';

before(() => {
  cy.logToTerminal('🚀 B2B Address Book — creating company, admin and one regular user');
  cy.setupCompanyWithAdmin({ extensionAttributes: { is_purchase_order_enabled: 1 } });

  cy.then({ timeout: 45000 }, async () => {
    const company = Cypress.env('testCompany');
    const email = `addressbook.user.${Date.now()}@example.com`;

    const user = await createCompanyUser({
      email,
      firstname: 'AddressBook',
      lastname: 'RegularUser',
      password: REGULAR_USER_PASSWORD,
    }, company.id);

    Cypress.env('testUsers', {
      regular: { email, password: REGULAR_USER_PASSWORD, id: user.id },
    });
    cy.logToTerminal(`✅ Regular user created: ${email} (ID: ${user.id})`);
  });

  cy.wait(3000);
});

// Read lazily: `before` has not run yet when a describe body is evaluated.
const testCompanyName = () => Cypress.env('testCompany').name;
const adminCreds = () => Cypress.env('testAdmin');
const regularUserCreds = () => Cypress.env('testUsers').regular;

// Admin-only, idempotent, and assumes the caller is already signed in as admin.
// Must run BEFORE any permission is granted: the "Company Addresses" branch
// only appears in the role permission tree once the address book is enabled.
// Unlocks one-time address entry at checkout; while it is off the drop-in keeps
// address selection locked. Admin-only and idempotent, like the helper above.
const ensureCustomShippingAllowed = () => {
  const urls = Cypress.env('addressBookUrls');

  cy.visit(urls.companyProfile);
  cy.wait(2000);
  cy.waitForLoadingSkeletonToDisappear();

  cy.get('.account-company-profile-card__content', { timeout: 20000 }).then(($card) => {
    if ($card.text().includes('Allow Custom Company Address: Enabled')) {
      cy.logToTerminal('✅ Custom shipping address already allowed');
      return;
    }

    cy.logToTerminal('🔧 Allowing a custom shipping address at checkout');
    cy.contains('button', 'Edit').click();
    cy.wait(1000);
    cy.get(selectors.companyProfileCustomShippingEnabledCheckbox).then(($cb) => {
      if (!$cb.prop('checked')) {
        cy.wrap($cb).click({ force: true });
      }
    });
    cy.contains('button', 'Save Changes').click();
    cy.wait(2000);
  });

  cy.contains('Allow Custom Company Address: Enabled', { timeout: 20000 }).should('be.visible');
  cy.logToTerminal('✅ Custom shipping address confirmed allowed');
};

const ensureAddressBookEnabled = () => {
  const urls = Cypress.env('addressBookUrls');

  cy.visit(urls.companyProfile);
  cy.wait(2000);
  cy.waitForLoadingSkeletonToDisappear();

  cy.get('.account-company-profile-card__content', { timeout: 20000 }).then(($card) => {
    if ($card.text().includes('Enable Company Address Book: Enabled')) {
      cy.logToTerminal('✅ Address Book already enabled');
      return;
    }

    cy.logToTerminal('🔧 Address Book is off — enabling it');
    cy.contains('button', 'Edit').click();
    cy.wait(1000);
    cy.get(selectors.companyProfileAddressBookEnabledCheckbox).then(($cb) => {
      if (!$cb.prop('checked')) {
        cy.wrap($cb).click({ force: true });
      }
    });
    cy.contains('button', 'Save Changes').click();
    cy.wait(2000);
  });

  cy.contains('Enable Company Address Book: Enabled', { timeout: 20000 }).should('be.visible');
  cy.logToTerminal('✅ Address Book confirmed enabled');
};

describe('B2B Address Book - Admin Scenario', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const urls = Cypress.env('addressBookUrls');

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();

    const { email, password } = adminCreds();
    cy.logToTerminal(`🔐 Login as company admin (${email})`);
    // This platform sometimes doesn't redirect to /customer/account after submit.
    const submitLogin = () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit(urls.login);
      cy.get('main .auth-sign-in-form', { timeout: 15000 }).within(() => {
        cy.get('input[name="email"]').type(email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(password, { log: false });
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

    // Fresh company per run means one company and no switcher. The assertion is
    // the real guard — everything after it mutates persistent company data.
    cy.visit(urls.companyProfile);
    cy.wait(2000);
    cy.waitForLoadingSkeletonToDisappear();
    cy.get('.account-company-profile-card__content', { timeout: 20000 })
      .should('contain.text', testCompanyName());
    cy.logToTerminal(`🏢 Active company: ${testCompanyName()}`);
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

  it('Test 1a: page title reads "Addresses" while the Address Book is off', () => {
    // Runs as the company admin on purpose. The admin holds every company
    // address ACL, so if the title were derived from permissions alone it would
    // read "Company Addresses" here even though the page is listing personal
    // addresses. Only the company setting can tell the two datasets apart.
    cy.visit(urls.addresses);
    cy.wait(2000);
    cy.waitForLoadingSkeletonToDisappear();

    cy.get(selectors.addressesPageTitle, { timeout: 30000 })
      .should('be.visible')
      .and('have.text', addressBookLabels.addressesTitle);

    cy.logToTerminal('✅ Test 1a: heading confirms the personal address list is in use');
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
    // Does not rely on Test 4 having enabled it.
    ensureAddressBookEnabled();

    actions.openCompanyAddressBook(urls);
    // Same one-shot-snapshot pitfall as Test 2.
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

  // Granted through the roles-tree UI, not REST: POST /V1/company/role 500s on
  // Magento_CompanyAddressStorefrontCompatibility::* resource_ids.
  // Nodes are found by visible label text — checkbox `name` attributes are
  // regenerated per render (tree-checkbox-XXXXX) and cannot be selected on.
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
    // Click the native input with force:true; clicking its parent label does not
    // toggle it. Idempotent — a prior run may have left this checked.
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
    // Scoped to the "Company Addresses" <li>: Add/Edit/Delete are generic labels
    // shared by many permission categories. Expand first — collapsed children
    // are not in the DOM.
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

// Granular permission scenario driven by the single regular user created in
// the root `before`, who holds the company's built-in "Default User" role.
// Alternates admin (toggles individual Company Addresses child permissions via
// the roles tree) and that user (verifies what is/isn't possible at each
// permission level). Permissions move through the UI rather than REST because
// POST /V1/company/role rejects the address-book resource ids.
// The suite does its own cleanup, so its title stays in
// src/support/deleteCustomer.js's skipDeleteTests list to keep the global
// afterEach from deleting the user between tests.
describe('B2B Address Book - Regular User Permission Scenario', { tags: ['@B2BSaas', '@B2BAco'] }, () => {
  const urls = Cypress.env('addressBookUrls');

  const loginAs = (email, password) => {
    const submitLogin = () => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit(urls.login);
      cy.get('main .auth-sign-in-form', { timeout: 15000 }).within(() => {
        cy.get('input[name="email"]').type(email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(password, { log: false });
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
        cy.get('select[aria-label="Select company"]').select(testCompanyName());
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
      .should('contain.text', testCompanyName());
    cy.logToTerminal(`🏢 Confirmed active company: ${testCompanyName()}`);
  };

  const loginAsAdminAndSwitch = () => {
    const admin = adminCreds();
    cy.logToTerminal(`🔐 Login as company admin (${admin.email})`);
    loginAs(admin.email, admin.password);
    switchToTestCompany();
  };

  const loginAsRegularUserAndSwitch = () => {
    const user = regularUserCreds();
    cy.logToTerminal(`🔐 Login as regular user (${user.email})`);
    loginAs(user.email, user.password);
    switchToTestCompany();
  };

  // Sets one or more Company Addresses child permissions (Add/Edit/Delete/
  // Set Default Address) on the Default User role in a single edit+save pass.
  // Idempotent per child — only clicks if the current state differs.
  // Tree behaviour, confirmed by observation: clicking the PARENT toggles
  // every child at once (all on / all off), while clicking a CHILD affects
  // only that child and leaves the parent alone. So partial permission sets
  // are set purely by clicking children — never touch the parent here.
  // Opens the Default User role editor with the permission tree expanded.
  const openDefaultUserRoleTree = () => {
    cy.visit('/customer/company/roles');
    cy.wait(2000);
    cy.contains('Default User').closest('tr').within(() => {
      cy.contains('Edit').click();
    });
    cy.wait(1000);
    cy.get('.edit-role-and-permission__tree-container').should('be.visible');
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);
  };

  // Prints the role tree with checkbox states. Diagnostic: the per-run company
  // carries Magento's defaults, so this is how branch labels get confirmed
  // rather than guessed.
  const logRoleTree = () => {
    openDefaultUserRoleTree();
    // Not scoped to direct children: the tree renders its items nested a few
    // levels below the container, so a '> ul > li' scope matches nothing.
    cy.get('.edit-role-and-permission__tree-container')
      .find('li.acm-tree__item')
      .then(($items) => {
        const summary = [...$items].map((el) => {
          const label = el.querySelector('.edit-role-and-permission__tree-label')?.textContent.trim();
          const checked = el.querySelector('input[type="checkbox"]')?.checked;
          return `${label}=${checked}`;
        });
        cy.logToTerminal(`🌳 Default User role — tree: ${summary.join(' | ')}`);
      });
  };

  // Turns a whole top-level branch on by clicking its parent checkbox, which
  // toggles every child at once. Takes candidate labels because the branch
  // carrying Magento_Sales::place_order may be named differently across
  // versions; a miss is logged rather than failed — RU7 surfaces missing
  // ordering rights far more clearly.
  const enableTopLevelBranch = (candidateLabels) => {
    openDefaultUserRoleTree();

    cy.get('.edit-role-and-permission__tree-container').then(($tree) => {
      const match = candidateLabels.find((label) => [...$tree.find('.edit-role-and-permission__tree-label')]
        .some((el) => el.textContent.trim() === label));

      if (!match) {
        cy.logToTerminal(`⚠️ None of these branches found in the role tree: ${candidateLabels.join(', ')}`);
        return;
      }

      cy.contains('.edit-role-and-permission__tree-label', match)
        .closest('li.acm-tree__item')
        .children('.edit-role-and-permission__tree-node')
        .find('input[type="checkbox"]')
        .then(($cb) => {
          if ($cb.prop('checked')) {
            cy.logToTerminal(`✅ Branch "${match}" already enabled`);
          } else {
            cy.logToTerminal(`🔧 Enabling branch "${match}" (parent click enables all its children)`);
            cy.wrap($cb).click({ force: true });
            cy.wait(500);
          }
        });
    });

    cy.contains('button', 'Save Role').click();
    cy.wait(2000);
  };

  // Clicking the PARENT checkbox flips every child at once, which is the only
  // way to revoke view access — the children alone cannot express "no access".
  const setCompanyAddressesBranch = (checked) => {
    openDefaultUserRoleTree();

    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('li.acm-tree__item')
      .children('.edit-role-and-permission__tree-node')
      .find('input[type="checkbox"]')
      .then(($cb) => {
        if ($cb.prop('checked') === checked) {
          cy.logToTerminal(`✅ Company Addresses branch already ${checked}`);
        } else {
          cy.logToTerminal(`🔧 Setting the whole Company Addresses branch to ${checked}`);
          cy.wrap($cb).click({ force: true });
          cy.wait(500);
        }
      });

    cy.contains('button', 'Save Role').click();
    cy.wait(2000);
  };

  const setChildPermissions = (changes) => {
    cy.visit('/customer/company/roles');
    cy.wait(2000);
    cy.contains('Default User').closest('tr').within(() => {
      cy.contains('Edit').click();
    });
    cy.wait(1000);
    cy.get('.edit-role-and-permission__tree-container').should('be.visible');

    // Expand everything at once instead of clicking individual "+" expanders.
    cy.contains('button', 'Expand All').click();
    cy.wait(1000);

    cy.contains('.edit-role-and-permission__tree-label', 'Company Addresses')
      .closest('li.acm-tree__item')
      .as('companyAddressesNode');

    // Log the real checkbox state before touching anything.
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

    // Confirm the clicks landed before saving.
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

    // Must come first: the "Company Addresses" branch only exists in the role
    // permission tree while the address book is enabled, so granting rights
    // before this would silently find nothing to click.
    ensureAddressBookEnabled();

    // Ordering must be permitted — RU7 places a purchase order as this user.
    logRoleTree();
    // Confirmed via logRoleTree: the branch is "Sales" and already carries
    // "Allow Checkout", so this is normally a no-op and stays as a guard.
    enableTopLevelBranch(['Sales']);

    setChildPermissions([
      { label: 'Add', checked: true },
      { label: 'Edit', checked: true },
      { label: 'Delete', checked: true },
      { label: 'Set Default Address', checked: true },
    ]);
    logout();
    cy.logToTerminal('✅ RU0: baseline full permissions restored');
  });

  it('RU1a: page title reads "Company Addresses" for a user with company access', () => {
    // The block picks the heading from the customer's permissions, so for a
    // regular user it is a direct readout of whether the company address book
    // is the dataset on screen — no admin bypass muddying it.
    loginAsRegularUserAndSwitch();
    actions.openCompanyAddressBook(urls);
    cy.waitForLoadingSkeletonToDisappear();

    cy.get(selectors.addressesPageTitle, { timeout: 30000 })
      .should('be.visible')
      .and('have.text', addressBookLabels.companyAddressesTitle);

    cy.logToTerminal('✅ RU1a: heading confirms the company address book is in use');
    logout();
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
  // With "Allow Custom Company Address" off, checkout only offers saved company
  // addresses — an empty book shows "No saved addresses" and there is nothing to
  // fill in, so this test seeds a SHIPPING and a BILLING address first. RU8
  // covers the opposite case, where the setting is on and a one-time address can
  // be typed. Payment stays on Check / Money order: no Payment Services iframes.
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

  // Fills the one-time shipping form rendered by "Use a different address".
  // Targeted by id rather than by input name: the checkout page also renders a
  // billing address form whose inputs carry the same names, so name selectors
  // would match two elements. Ids come from the block's fieldIdPrefix.
  const fillCheckoutShippingForm = (address) => {
    // Every field is blurred after typing. The form commits on both input and
    // blur, and a real person blurs each field by moving to the next one —
    // cy.type() on its own never does, which left the last edit uncommitted and
    // the cart still holding the default company address it was loaded with.
    const typeAndBlur = (selector, value) => {
      cy.get(selector).clear().type(value).blur();
    };

    typeAndBlur(selectors.checkoutShippingFormFirstName, address.firstName);
    typeAndBlur(selectors.checkoutShippingFormLastName, address.lastName);
    typeAndBlur(selectors.checkoutShippingFormStreet, address.street);
    typeAndBlur(selectors.checkoutShippingFormStreet2, address.streetMultiline_2);
    cy.get(selectors.checkoutShippingFormCountry).select(address.countryCode).blur();

    // Picking a country reloads the region list asynchronously and can replace
    // the field node mid-command — same swap the company address form has.
    cy.wait(1500);
    cy.get('body').then(($body) => {
      if ($body.find(`select${selectors.checkoutShippingFormRegion}`).length) {
        cy.get(selectors.checkoutShippingFormRegion).select(address.region).blur();
      } else {
        typeAndBlur(selectors.checkoutShippingFormRegion, address.region);
      }
    });

    typeAndBlur(selectors.checkoutShippingFormCity, address.city);
    typeAndBlur(selectors.checkoutShippingFormPostcode, address.postcode);
    typeAndBlur(selectors.checkoutShippingFormTelephone, address.telephone);
    typeAndBlur(selectors.checkoutShippingFormVatId, address.vatId);
  };

  it('RU8: with custom addresses allowed, the user checks out on a one-time shipping address', () => {
    const oneTime = addressBookAddresses.oneTimeShipping;

    cy.logToTerminal('⚙️ Admin allows a custom shipping address at checkout');
    loginAsAdminAndSwitch();
    ensureAddressBookEnabled();
    ensureCustomShippingAllowed();
    logout();

    loginAsRegularUserAndSwitch();

    // Billing still has to come from the address book, so seed both types —
    // this keeps the test independent of what RU7 left behind.
    cy.logToTerminal('🧹 Starting from a clean address book');
    actions.openCompanyAddressBook(urls);
    removeAllCompanyAddresses();

    cy.logToTerminal('📝 Creating the SHIPPING and BILLING company addresses');
    createCompanyAddress(addressBookAddresses.shipping, selectors.addressBookTypeShippingCheckbox);
    createCompanyAddress(addressBookAddresses.billing, selectors.addressBookTypeBillingCheckbox);

    cy.logToTerminal('🛒 Adding a simple product to the cart');
    cy.visit('/products/youth-tee/adb150');
    cy.get('.product-details__buttons__add-to-cart button')
      .should('be.visible')
      .and('not.be.disabled')
      .click();

    cy.get('.minicart-wrapper').click();
    cy.get('.minicart-panel[data-loaded="true"]', { timeout: 20000 }).should('exist');
    cy.get('.minicart-panel').should('not.be.empty');

    cy.logToTerminal('💳 Proceeding to checkout');
    cy.visit('/checkout');
    cy.url().should('include', '/checkout');
    cy.waitForLoadingSkeletonToDisappear();

    // ORDER MATTERS, and not for cosmetic reasons. A one-time address is not a
    // saved address, so the cart stores it without an id and the block
    // recomputes defaultSelectAddressId as 0 (containers.js). Any later cart
    // update re-runs the selection effect, which cannot match id 0 against the
    // address book and falls back to the default company address — silently
    // replacing what was just typed. Selecting billing is such an update, so it
    // has to happen BEFORE the one-time shipping address is entered.
    cy.logToTerminal('🧾 Selecting the saved company billing address first');
    cy.get('input[type="radio"][name="selectedBillingAddress"]')
      .should('have.length.greaterThan', 0)
      .first()
      .then(($input) => {
        cy.get(`label[for="${$input.attr('id')}"]`).click();
      });
    cy.wait(3000);
    cy.get('input[type="radio"][name="selectedBillingAddress"]').first().should('be.checked');

    // Records every GraphQL call from here on. Asserting the radio stays checked
    // only proves the UI selection held — it says nothing about what reached the
    // cart, and the order kept coming back with the saved company address
    // regardless. This captures the operation names, whether the typed street
    // ever left the browser, and any errors sent back, which is the only way to
    // tell "the mutation was never sent" apart from "the backend refused it".
    // Collected into plain arrays: cy.* cannot be called inside an intercept.
    const sentOps = [];
    const oneTimeStreetSent = [];
    const gqlErrors = [];
    cy.intercept('POST', '**/graphql', (req) => {
      const body = JSON.stringify(req.body ?? {});
      const opName = req.body?.operationName
        || (body.match(/(?:mutation|query)\s+(\w+)/) || [])[1]
        || 'anonymous';
      sentOps.push(opName);
      if (body.includes(oneTime.street)) {
        oneTimeStreetSent.push(opName);
        // Alias only the call carrying the typed street, so the test can wait
        // on that exact request instead of on a fixed timer.
        req.alias = 'oneTimeShippingAddress';
      }
      req.continue((res) => {
        const errors = res.body?.errors;
        if (errors?.length) {
          errors.forEach((e) => gqlErrors.push(`${opName}: ${e.message}`));
        }
      });
    });

    // The entry point only exists because the company allows custom addresses —
    // asserting it is the actual subject of this test.
    cy.logToTerminal('📮 Choosing "Use a different address" for shipping');
    cy.get(selectors.checkoutShippingBlock, { timeout: 30000 })
      .find(selectors.checkoutUseDifferentShippingRadio)
      .should('exist')
      .then(($input) => {
        cy.get(`label[for="${$input.attr('id')}"]`).click();
      });
    cy.wait(2000);

    cy.logToTerminal('✍️ Filling the one-time shipping address');
    cy.get(selectors.checkoutShippingFormFirstName, { timeout: 20000 }).should('be.visible');
    fillCheckoutShippingForm(oneTime);

    // Synchronise on the address actually reaching the backend rather than on a
    // fixed pause. The form commits through a debounced call, so a timer only
    // ever encodes a guess about how slow the environment is that day — and if
    // the call never happens, this fails here with an obvious cause instead of
    // three steps later on the placed order.
    cy.wait('@oneTimeShippingAddress', { timeout: 30000 });

    // Fail here rather than three steps later on the placed order: if the
    // one-time entry lost its selection, everything below silently proceeds on
    // the default company address instead.
    cy.get(selectors.checkoutShippingBlock)
      .find(selectors.checkoutUseDifferentShippingRadio)
      .should('be.checked');

    // Report what actually went over the wire BEFORE placing the order, so the
    // diagnosis survives even if a later assertion fails the test.
    cy.then(() => {
      cy.logToTerminal(`📡 GraphQL operations so far: ${[...new Set(sentOps)].join(', ') || '(none)'}`);
      cy.logToTerminal(
        oneTimeStreetSent.length
          ? `📡 One-time street "${oneTime.street}" was sent in: ${[...new Set(oneTimeStreetSent)].join(', ')}`
          : `🔴 One-time street "${oneTime.street}" NEVER left the browser — the address was not applied to the cart`,
      );
      if (gqlErrors.length) {
        cy.logToTerminal(`🔴 GraphQL errors: ${JSON.stringify([...new Set(gqlErrors)])}`);
      } else {
        cy.logToTerminal('🔵 No GraphQL errors before order placement');
      }
    });

    cy.logToTerminal('✅ Accepting terms and placing the order');
    actions.checkTermsAndConditions();
    actions.placeOrder();
    cy.wait(15000);

    cy.then(() => {
      if (gqlErrors.length) {
        cy.logToTerminal(`🔴 GraphQL errors after placement: ${JSON.stringify([...new Set(gqlErrors)])}`);
      }
    });

    actions.verifyPOConfirmation();

    // The confirmation link must carry a poRef — that reference is what makes
    // the order openable, and a missing one has silently broken this flow before.
    cy.get(selectors.poConfirmationLink, { timeout: 60000 })
      .should('be.visible')
      .should('have.attr', 'href')
      .and('include', 'poRef=');

    cy.get(selectors.poConfirmationLink)
      .invoke('text')
      .then((text) => {
        cy.logToTerminal(`🧾 Purchase order placed: ${text.trim()}`);
      });

    cy.logToTerminal('📄 Opening the purchase order');
    cy.get(selectors.poConfirmationLink).click();
    cy.url().should('include', 'poRef');
    cy.waitForLoadingSkeletonToDisappear();

    // The point of the scenario: the order must carry the address typed at
    // checkout, not the saved company shipping address it was offered instead.
    cy.logToTerminal('🔍 Verifying the order shipped to the one-time address');
    cy.get(selectors.orderShippingAddress, { timeout: 30000 })
      .should('contain.text', oneTime.lastName)
      .and('contain.text', oneTime.street)
      .and('contain.text', oneTime.telephone)
      .and('not.contain.text', addressBookAddresses.shipping.street);

    cy.get(selectors.orderBillingAddress)
      .should('contain.text', addressBookAddresses.billing.lastName)
      .and('contain.text', addressBookAddresses.billing.street);

    cy.logToTerminal('✅ RU8: order placed on a one-time shipping address');
    logout();
  });

  // Runs as a test rather than an `after` hook so its result is visible in the
  // report — the same pattern verifyPurchaseOrders.spec.js uses. Its title is
  // in deleteCustomer.js's skipDeleteTests list so the global afterEach does
  // not race this teardown.
  it('RU9: without view access the account nav offers no address entry at all', () => {
    cy.logToTerminal('⚙️ Admin revokes the whole Company Addresses branch');
    loginAsAdminAndSwitch();
    setCompanyAddressesBranch(false);
    logout();

    loginAsRegularUserAndSwitch();
    cy.visit(urls.account);
    cy.wait(2000);
    cy.waitForLoadingSkeletonToDisappear();

    // Assert the nav actually rendered before asserting anything is missing —
    // otherwise an empty page would satisfy the checks below for the wrong reason.
    cy.contains(selectors.accountNavItemTitle, 'Orders', { timeout: 30000 })
      .should('be.visible');

    // Neither entry may appear: the company one because the customer cannot view
    // company addresses, the personal one because the address book supersedes it.
    cy.contains(selectors.accountNavItemTitle, addressBookLabels.companyAddressesTitle)
      .should('not.exist');
    cy.contains(selectors.accountNavItemTitle, addressBookLabels.addressesTitle)
      .should('not.exist');

    // The nav is only half the story — the page must not be reachable by URL
    // either, which is the obvious way around a hidden menu entry.
    cy.logToTerminal('🚧 Confirming the addresses page is not reachable directly');
    cy.visit(urls.addresses);
    cy.url({ timeout: 30000 }).should('not.include', urls.addresses);
    cy.url().should('include', urls.account);

    cy.logToTerminal('✅ RU9: no address entry in the nav, and the page redirects away');
    // Permissions are deliberately left revoked — the company is deleted next.
    logout();
  });

  it('Cleanup - Delete address book users and roles', () => {
    cy.logToTerminal('🧹 Removing the company, its admin and the regular user');
    cy.then({ timeout: 60000 }, async () => {
      const results = await cleanupTestCompany();
      cy.logToTerminal(`🧹 Cleanup result: ${JSON.stringify(results)}`);
    });
  });
});
