import * as fields from "../../fields";
import { products } from "../../fixtures";
import { createStandaloneCustomer } from "../../support/b2bCompanyAPICalls";

const SHARING_PATH = '/customer/requisition-list-sharing';

describe(
  "Verify B2B Requisition List Sharing feature",
  { tags: "@B2BSaas" },
  () => {
    let validShareToken;

    const assertAdminEmailAbsentFromShareModal = () => {
      const admin = Cypress.env('testAdmin');
      cy.get('.share-requisition-list-content__loading').should('not.exist');
      cy.get('.share-requisition-list-content__multi-select').click();
      cy.get('.share-requisition-list-content').should('not.contain', admin.email);
    };

    // Clear browser session before each test so cy.loginAsCompanyAdmin() /
    // cy.loginAsRegularUser() always land on the login form (not an already-
    // authenticated account page). Running cleanup here (not in before()) ensures
    // cookies are always cleared before any login attempt, matching the pattern
    // used by other B2B specs in this suite.
    beforeEach(() => {
      cy.clearAllCookies();
      cy.clearLocalStorage();
    });

    /**
     * Setup: sign in as the sender, create a requisition list, add a product,
     * then click Share to let the dropin generate the token via the UI (the same
     * way a real user would). The share link is read from the link field and the
     * token stored in `validShareToken` for use across all subsequent test cases.
     *
     * Running this as an it() instead of before() ensures beforeEach() clears
     * any stale session from previous specs before the login is attempted.
     */
    it('Setup: create company, build share token for use in subsequent tests', () => {
      cy.setupCompanyWithAdmin();
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      // Create a test requisition list to share
      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Cypress Share Test List');
      cy.get(fields.requisitionListFormDescription).type('Created for share token tests');
      cy.contains('Save').click();

      // Add a product so sharing is enabled (share button is disabled on empty lists)
      cy.visit(products.simple.urlPath);
      cy.get(fields.requisitionListSelector)
        .first()
        .should('be.visible')
        .click();
      cy.get(fields.requisitionListPickerAvailableLists)
        .should('contain', 'Cypress Share Test List')
        .contains('Cypress Share Test List')
        .click();
      cy.get(fields.requisitionListPickerActionsButton).should('not.be.disabled').click();
      cy.get(fields.requisitionListAlert).should('be.visible');

      // Open the list, click Share, and read the generated token directly from the share link field
      // — the dropin calls shareRequisitionListByToken exactly as a real user would
      cy.visit('/customer/requisition-lists');
      cy.contains('Cypress Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true')
        .click();

      cy.get('[data-testid="share-link-field"]')
        .should('be.visible')
        .invoke('val')
        .should('include', 'requisition_id=')
        .then((shareUrl) => {
          validShareToken = new URL(shareUrl).searchParams.get('requisition_id');
        });
    });
    // -----------------------------------------------------------------------
    // 1. Share button is aria-disabled when the list has no items
    // -----------------------------------------------------------------------
    it('Share button is disabled when requisition list has no items', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Empty Share Test List');
      cy.get(fields.requisitionListFormDescription).type('Empty list for share disabled test');
      cy.contains('Save').click();

      cy.contains('Empty Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('have.attr', 'aria-disabled', 'true');
    });

    // -----------------------------------------------------------------------
    // 2. Guest opens shared link → inline sign-in form appears on the sharing page
    // -----------------------------------------------------------------------
    it('Guest visiting a valid share link sees the sign-in form', () => {
      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);
      cy.get(fields.requisitionListSharingSignInForm).should('be.visible');
      cy.url().should('include', SHARING_PATH);
      cy.url().should('include', 'requisition_id=');
    });

    // -----------------------------------------------------------------------
    // 3. Guest opens sharing page without a token → redirected to grid
    // -----------------------------------------------------------------------
    it('Visiting the sharing page without a token redirects to requisition list grid', () => {
      cy.visit(SHARING_PATH);
      cy.url().should('include', '/customer/requisition-lists');
    });

    // -----------------------------------------------------------------------
    // 4. Invalid / expired token shows error message
    // -----------------------------------------------------------------------
    it('Invalid share token shows an error message', () => {
      cy.loginAsCompanyAdmin();
      cy.visit(`${SHARING_PATH}?requisition_id=invalid-token-xyz`);
      cy.get(fields.requisitionListSharingError)
        .should('be.visible')
        .and('contain', 'invalid or has expired');
    });

    // -----------------------------------------------------------------------
    // 5. Authenticated recipient previews the shared list, imports it,
    //    and sees the success alert on the detail page
    // -----------------------------------------------------------------------
    it('Authenticated recipient can preview the shared list, import it, and see the success alert', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);

      // Wait for preview to load
      cy.get(fields.requisitionListSharingLoading).should('not.exist');
      cy.get(fields.requisitionListSharingPreview).should('be.visible');

      // Verify preview content: sender name, list name, and items table are present
      cy.get(fields.requisitionListSharingPreviewValue).first().should('not.be.empty');
      cy.get(fields.requisitionListSharingItemsTable).should('be.visible');

      // Click the Import List button
      cy.get(fields.requisitionListSharingImportButton)
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      // After import, should be redirected to the detail page with items
      cy.url().should('include', '/customer/requisition-list');
      cy.url().should('include', 'requisitionListUid=');
      cy.get(fields.requisitionListItemRow).should('have.length.gte', 1);

      // Pending alert written to localStorage by the sharing block is picked up
      // by the view block and emitted after the dropin mounts
      cy.get('.requisition-list__alert-wrapper .dropin-in-line-alert__title', { timeout: 5000 })
        .should('be.visible');
    });

    // -----------------------------------------------------------------------
    // 6. Unauthenticated user is shown the sign-in form, then after sign-in
    //    is redirected back to the sharing page with the token preserved
    // -----------------------------------------------------------------------
    it('Guest visiting a share link sees the sign-in form and is redirected back after signing in', () => {
      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);
      cy.get(fields.requisitionListSharingSignInForm).should('be.visible');
      cy.url().should('include', 'requisition_id=');

      // Sign in via the standard login page — after auth the block redirects back
      cy.loginAsCompanyAdmin();

      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);
      cy.get(fields.requisitionListSharingLoading).should('not.exist');
      cy.get(fields.requisitionListSharingPreview).should('be.visible');
      cy.get(fields.requisitionListSharingItemsTable).should('be.visible');
    });

    // -----------------------------------------------------------------------
    // 7. Sender's own email is excluded from the share-with recipient dropdown
    // -----------------------------------------------------------------------
    it("Sender's email is not listed as a recipient option in the share modal", () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Cypress Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true')
        .click();

      // Open the recipient dropdown and assert the sender's email is absent
      assertAdminEmailAbsentFromShareModal();
    });

    // -----------------------------------------------------------------------
    // 8. Share button opens the share modal with a shareable link
    // -----------------------------------------------------------------------
    it('Share button opens modal displaying a shareable link', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Cypress Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true')
        .click();

      cy.get('[data-testid="share-link-field"]')
        .should('be.visible')
        .invoke('val')
        .should('include', SHARING_PATH)
        .and('include', 'requisition_id=');
    });

    // -----------------------------------------------------------------------
    // 9. Non-company user's share button is disabled
    // -----------------------------------------------------------------------
    it('Share button is disabled with a company-required message for non-B2B customers', () => {
      cy.then(async () => {
        const timestamp = Date.now();
        const email = `standalone.${timestamp}@example.com`;
        const customer = await createStandaloneCustomer({
          firstname: 'Standalone',
          lastname: 'Customer',
          email,
          password: 'Test123!',
        });
        Cypress.env('testStandaloneCustomer', { email: customer.email, password: customer.password });
      });

      cy.loginAsStandaloneCustomer();
      cy.url().should('include', '/customer/account');

      // Create a list and add an item so the share button's disabled state is
      // due to "not a company user" — not an empty list
      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Standalone Share Test List');
      cy.contains('Save').click();

      cy.visit(products.simple.urlPath);
      cy.get(fields.requisitionListSelector).first().should('be.visible').click();
      cy.get(fields.requisitionListPickerAvailableLists)
        .should('contain', 'Standalone Share Test List')
        .contains('Standalone Share Test List')
        .click();
      cy.get(fields.requisitionListPickerActionsButton).should('not.be.disabled').click();
      cy.get(fields.requisitionListAlert).should('be.visible');

      cy.visit('/customer/requisition-lists');
      cy.contains('Standalone Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('have.attr', 'aria-disabled', 'true')
        .invoke('attr', 'data-disabled-reason')
        .should('include', 'company');
    });

    // -----------------------------------------------------------------------
    // 10. User from a different company gets a preview error on the shared list
    // -----------------------------------------------------------------------
    it('User from a different company sees a preview error on the shared list', () => {
      // Set up a second independent company — the regular user from this company
      // has no access to lists shared within the original company
      cy.setupCompanyWithUser();
      cy.loginAsRegularUser();
      cy.url().should('include', '/customer/account');

      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);

      // A user outside the originating company cannot load the shared list preview
      cy.get(fields.requisitionListSharingError).should('be.visible');
    });
  }
);
