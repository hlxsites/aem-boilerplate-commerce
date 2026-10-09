import * as fields from "../../fields";
import { products } from "../../fixtures";
import { createStandaloneCustomer } from "../../support/b2bCompanyAPICalls";

// Matches the `requisition_list_public_share_storefront_path` store config
// default; update if the target environment configures a different path.
const PUBLIC_SHARING_PATH = '/customer/requisition-list-public-share';

describe(
  "Verify B2B Requisition List Public Sharing feature",
  { tags: ['@B2BSaas', '@B2BAco'] },
  () => {
    let validPublicToken;

    // Clear browser session before each test so guest visits are truly
    // unauthenticated and login helpers land on the login form.
    beforeEach(() => {
      cy.clearAllCookies();
      cy.clearLocalStorage();
    });

    /**
     * Setup: sign in as the sender, create a requisition list, add a product,
     * mark the list public, then share it to build a public share token via
     * the UI (the same way a real user would).
     */
    it('Setup: create company, mark list public, build public share token', () => {
      cy.setupCompanyWithAdmin();
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Cypress Public Share Test List');
      cy.get(fields.requisitionListFormDescription).type('Created for public share token tests');
      cy.contains('Save').click();

      cy.visit(products.simple.urlPath);
      cy.get(fields.requisitionListSelector).first().should('be.visible').click();
      cy.get(fields.requisitionListPickerAvailableLists)
        .should('contain', 'Cypress Public Share Test List')
        .contains('Cypress Public Share Test List')
        .click();
      cy.get(fields.requisitionListPickerActionsButton).should('not.be.disabled').click();
      cy.get(fields.requisitionListAlert).should('be.visible');

      cy.visit('/customer/requisition-lists');
      cy.contains('Cypress Public Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      // Make the list public before sharing it
      cy.get(fields.requisitionListViewTogglePublicButton)
        .should('exist')
        .and('have.attr', 'aria-pressed', 'false')
        .click();
      cy.get(fields.requisitionListViewTogglePublicButton).should('have.attr', 'aria-pressed', 'true');
      cy.get(fields.requisitionListPublicStatusTag).should('be.visible');

      // Share: with a public list, the modal submits via the public email
      // field / token, and the link uses the public storefront path
      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true')
        .click();

      cy.get('[data-testid="share-link-field"]')
        .should('be.visible')
        .invoke('val')
        .should('include', 'requisition_id=')
        .then((shareUrl) => {
          validPublicToken = new URL(shareUrl).searchParams.get('requisition_id');
        });
    });

    // -----------------------------------------------------------------------
    // 1. Guest (not logged in) can preview a public shared list, no sign-in
    //    form and no import action offered
    // -----------------------------------------------------------------------
    it('Guest can preview a public shared list without signing in', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=${validPublicToken}`);

      cy.get(fields.requisitionListSharingSignInForm).should('not.exist');
      cy.get(fields.requisitionListSharingLoading).should('not.exist');
      cy.get(fields.requisitionListSharingPreview).should('be.visible');
      cy.get(fields.requisitionListSharingItemsTable).should('be.visible');
      cy.get(fields.requisitionListSharingImportButton).should('not.exist');
    });

    // -----------------------------------------------------------------------
    // 1b. The `token` param (used by the share email) works the same as
    //     `requisition_id` (used by the in-app copy-link field)
    // -----------------------------------------------------------------------
    it('Guest can preview a public shared list via the `token` param', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?token=${validPublicToken}`);

      cy.get(fields.requisitionListSharingLoading).should('not.exist');
      cy.get(fields.requisitionListSharingPreview).should('be.visible');
      cy.get(fields.requisitionListSharingItemsTable).should('be.visible');
    });

    // -----------------------------------------------------------------------
    // 2. Guest can select items and add them to their own (guest) cart
    // -----------------------------------------------------------------------
    it('Guest can add selected items from the public preview to their cart', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=${validPublicToken}`);
      cy.get(fields.requisitionListSharingPreview).should('be.visible');

      cy.get(fields.requisitionListSharingItemsTable)
        .find('input[type="checkbox"]')
        .first()
        .check({ force: true });

      cy.get(fields.requisitionListSharingAddSelectedToCartButton)
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.get(fields.miniCartButton).should('be.visible').click();
      cy.get(fields.miniCartContainer).should('be.visible');
      cy.get(fields.miniCartItems).should('have.length.gte', 1);
    });

    // -----------------------------------------------------------------------
    // 2b. Guest can add every item via "Add All to Cart" without selecting any
    // -----------------------------------------------------------------------
    it('Guest can add all items from the public preview to their cart', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=${validPublicToken}`);
      cy.get(fields.requisitionListSharingPreview).should('be.visible');

      cy.get(fields.requisitionListSharingAddToCartButton)
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.get(fields.miniCartButton).should('be.visible').click();
      cy.get(fields.miniCartContainer).should('be.visible');
      cy.get(fields.miniCartItems).should('have.length.gte', 1);
    });

    // -----------------------------------------------------------------------
    // 3. Product name/image in the preview link to the PDP
    // -----------------------------------------------------------------------
    it('Product name links to the PDP from the public preview', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=${validPublicToken}`);
      cy.get(fields.requisitionListSharingPreview).should('be.visible');

      cy.get(fields.requisitionListSharingProductLink)
        .first()
        .should('have.attr', 'href')
        .and('include', '/products/');
    });

    // -----------------------------------------------------------------------
    // 4. A user from a different company can still view the public list and
    //    add items to their own account cart (unlike private shares, company
    //    membership is not required). This also exercises the authenticated
    //    branch of getCartId, not the guest-cart-creation branch covered by
    //    the guest add-to-cart tests above — done in the same test/session
    //    rather than a separate one, since re-logging in as the same user in
    //    back-to-back tests is unreliable against this backend.
    // -----------------------------------------------------------------------
    it('A user outside the owning company can view and add items from a public shared list', () => {
      cy.setupCompanyWithUser();
      cy.loginAsRegularUser();
      cy.url().should('include', '/customer/account');

      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=${validPublicToken}`);
      cy.get(fields.requisitionListSharingSignInForm).should('not.exist');
      cy.get(fields.requisitionListSharingPreview).should('be.visible');
      cy.get(fields.requisitionListSharingItemsTable).should('be.visible');

      cy.get(fields.requisitionListSharingAddToCartButton)
        .should('be.visible')
        .and('not.be.disabled')
        .click();

      cy.get(fields.miniCartButton).should('be.visible').click();
      cy.get(fields.miniCartContainer).should('be.visible');
      cy.get(fields.miniCartItems).should('have.length.gte', 1);
    });

    // -----------------------------------------------------------------------
    // 5. Invalid / expired public token shows an error message
    // -----------------------------------------------------------------------
    it('Invalid public share token shows an error message', () => {
      cy.visit(`${PUBLIC_SHARING_PATH}?requisition_id=invalid-token-xyz`);
      cy.get(fields.requisitionListSharingError)
        .should('be.visible')
        .and('contain', 'invalid or has expired');
    });

    // -----------------------------------------------------------------------
    // 6. Visiting the public sharing page without a token redirects home
    // -----------------------------------------------------------------------
    it('Visiting the public sharing page without a token redirects to the home page', () => {
      cy.visit(PUBLIC_SHARING_PATH);
      cy.location('pathname').should('eq', '/');
    });

    // -----------------------------------------------------------------------
    // 7. Creating a list with "Make Public" checked marks it public immediately
    // -----------------------------------------------------------------------
    it('Creating a requisition list with "Make Public" checked marks it public immediately', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Cypress Create Public List');
      cy.get(fields.requisitionListFormIsPublicCheckbox).check({ force: true });
      cy.contains('Save').click();

      cy.contains('Cypress Create Public List')
        .parents(fields.requisitionListItemRow)
        .find(fields.requisitionListPublicStatusTag)
        .should('be.visible');

      cy.contains('Cypress Create Public List').click();
      cy.url().should('include', 'requisitionListUid=');
      cy.get(fields.requisitionListViewTogglePublicButton).should('have.attr', 'aria-pressed', 'true');
    });

    // -----------------------------------------------------------------------
    // 8. Renaming a private list and checking "Make Public" marks it public
    // -----------------------------------------------------------------------
    it('Updating a list via the rename form can mark it public', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Cypress Rename To Public List');
      cy.contains('Save').click();

      cy.contains('Cypress Rename To Public List')
        .parents(fields.requisitionListItemRow)
        .find(fields.requisitionListPublicStatusTag)
        .should('not.exist');

      cy.contains('Cypress Rename To Public List')
        .parents(fields.requisitionListItemRow)
        .find(fields.requisitionListItemActionsRenameButton)
        .click();
      cy.get(fields.requisitionListFormIsPublicCheckbox).check({ force: true });
      cy.contains('Save').click();

      cy.contains('Cypress Rename To Public List')
        .parents(fields.requisitionListItemRow)
        .find(fields.requisitionListPublicStatusTag)
        .should('be.visible');
    });

    // -----------------------------------------------------------------------
    // 9. Toggling a public list back to private removes the public status
    // -----------------------------------------------------------------------
    it('Toggling a public list back to private removes the public status', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Cypress Toggle Private List');
      cy.get(fields.requisitionListFormIsPublicCheckbox).check({ force: true });
      cy.contains('Save').click();

      cy.contains('Cypress Toggle Private List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewTogglePublicButton)
        .should('have.attr', 'aria-pressed', 'true')
        .click();
      cy.get(fields.requisitionListViewTogglePublicButton).should('have.attr', 'aria-pressed', 'false');
      cy.get(fields.requisitionListPublicStatusTag).should('not.exist');

      cy.visit('/customer/requisition-lists');
      cy.contains('Cypress Toggle Private List')
        .parents(fields.requisitionListItemRow)
        .find(fields.requisitionListPublicStatusTag)
        .should('not.exist');
    });
    // -----------------------------------------------------------------------
    // 9b. A non-company (standalone) customer CAN share a list once it's
    //     public, unlike private sharing which requires company membership
    //     (dropin's shareDisabled = itemsCount<=0 || (!is_public && !isCompanyUser))
    // -----------------------------------------------------------------------
    it('A non-company customer can share a list once it is marked public', () => {
      cy.then(async () => {
        const timestamp = Date.now();
        const email = `standalone-public.${timestamp}@example.com`;
        const customer = await createStandaloneCustomer({
          firstname: 'Standalone',
          lastname: 'Public',
          email,
          password: 'Test123!',
        });
        Cypress.env('testStandaloneCustomer', { email: customer.email, password: customer.password });
      });

      cy.loginAsStandaloneCustomer();
      cy.url().should('include', '/customer/account');

      cy.visit('/customer/requisition-lists');
      cy.contains('Add new Requisition List').click();
      cy.get(fields.requisitionListFormName).type('Standalone Public Share Test List');
      cy.get(fields.requisitionListFormIsPublicCheckbox).check({ force: true });
      cy.contains('Save').click();

      cy.visit(products.simple.urlPath);
      cy.get(fields.requisitionListSelector).first().should('be.visible').click();
      cy.get(fields.requisitionListPickerAvailableLists)
        .should('contain', 'Standalone Public Share Test List')
        .contains('Standalone Public Share Test List')
        .click();
      cy.get(fields.requisitionListPickerActionsButton).should('not.be.disabled').click();
      cy.get(fields.requisitionListAlert).should('be.visible');

      cy.visit('/customer/requisition-lists');
      cy.contains('Standalone Public Share Test List').click();
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true');
    });
  },
);
