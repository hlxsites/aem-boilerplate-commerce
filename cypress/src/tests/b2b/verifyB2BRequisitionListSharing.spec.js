import * as fields from "../../fields";

const SHARING_PATH = '/customer/requisition-list-sharing';

describe(
  "Verify B2B Requisition List Sharing feature",
  { tags: "@B2BSaas" },
  () => {
    let validShareToken;

    /**
     * Before all sharing tests: sign in as the sender via GraphQL, create a
     * requisition list (or reuse an existing one), and generate a fresh share token.
     * Stored in `validShareToken` for use across all test cases.
     */
    before(() => {
      const isLocal = Cypress.env('graphqlEndPoint')?.includes('functional.local')
        || Cypress.env('graphqlEndPoint')?.includes('localhost');

      if (isLocal) {
        // On local environment skip ACCS company setup (needs SaaS).
        // Set pre-existing local credentials via cypress.env.json or --env flag:
        //   CYPRESS_testAdmin='{"email":"admin@example.com","password":"..."}'
        //   CYPRESS_testUsers='[{"email":"user@example.com","password":"..."}]'
        cy.log('Running against local backend — skipping ACCS company setup');
      } else {
        cy.setupCompanyWith2Users();
      }

      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      const preExistingUid = Cypress.env('shareTestRequisitionListUid');
      const admin = Cypress.env('testAdmin');

      if (preExistingUid) {
        // Use a pre-existing list that already has items (useful for local runs).
        // Set via cypress.env.json: "shareTestRequisitionListUid": "<base64-uid>"
        cy.generateRequisitionListShareToken({
          email: admin.email,
          password: admin.password,
          requisitionListUid: preExistingUid,
        }).then((token) => {
          validShareToken = token;
        });
      } else {
        // Create a test requisition list to share
        cy.visit('/customer/requisition-lists');
        cy.contains('Add new Requisition List').click();
        cy.get(fields.requisitionListFormName).type('Cypress Share Test List');
        cy.get(fields.requisitionListFormDescription).type('Created for share token tests');
        cy.contains('Save').click();

        // Add a product so sharing is enabled (share button is disabled on empty lists)
        // Configure the product URL via cypress.env.json: "shareTestProductUrl": "/products/slug/SKU"
        cy.visit(Cypress.env('shareTestProductUrl'));
        cy.get(fields.addToRequisitionListButton).should('exist').click();
        cy.get(fields.requisitionListPickerAvailableLists)
          .should('contain', 'Cypress Share Test List')
          .contains('Cypress Share Test List')
          .click();
        cy.get(fields.requisitionListPickerActionsButton).should('not.be.disabled').click();
        cy.get(fields.requisitionListAlert).should('be.visible');

        // Navigate back to the grid and open the list to grab its UID from the URL
        cy.visit('/customer/requisition-lists');
        cy.contains('Cypress Share Test List').click();
        cy.url().should('include', 'requisitionListUid=').then((url) => {
          const uid = new URL(url).searchParams.get('requisitionListUid');

          cy.generateRequisitionListShareToken({
            email: admin.email,
            password: admin.password,
            requisitionListUid: uid,
          }).then((token) => {
            validShareToken = token;
          });
        });
      }
    });
    // Clear browser session before each test so cy.loginAsCompanyAdmin() / cy.loginAsRegularUser()
    // always land on the login form (not an already-authenticated account page).
    beforeEach(() => {
      cy.clearAllCookies();
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
    // 2. Guest opens shared link → sign-in form appears on the sharing page
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
      const recipient = Cypress.env('testUsers')?.[0];
      cy.visit(`${SHARING_PATH}?requisition_id=invalid-token-xyz`);
      cy.get(fields.requisitionListSharingSignInForm).within(() => {
        cy.get('input[name="email"]').type(recipient.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(recipient.password);
        cy.wait(1500);
        cy.get('.auth-sign-in-form__button--submit').click();
      });
      cy.get(fields.requisitionListSharingError)
        .should('be.visible')
        .and('contain', 'invalid or has expired');
    });

    // -----------------------------------------------------------------------
    // 5. Authenticated recipient imports the list and is redirected to detail view
    // -----------------------------------------------------------------------
    it('Authenticated recipient auto-imports list and lands on its detail page', () => {
      const recipient = Cypress.env('testUsers')?.[0];
      cy.visit('/customer/login');
      cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(recipient.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(recipient.password);
        cy.wait(1500);
        cy.get('.auth-sign-in-form__button--submit').click();
      });
      cy.url().should('include', '/customer/account');

      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);
      cy.url().should('include', '/customer/requisition-list');
      cy.url().should('include', 'requisitionListUid=');
      cy.get(fields.requisitionListItemRow).should('have.length.gte', 1);
    });

    // -----------------------------------------------------------------------
    // 6. Unauthenticated user signs in via inline form and is then auto-imported
    // -----------------------------------------------------------------------
    it('Guest signs in via inline form and list is automatically imported', () => {
      const recipient = Cypress.env('testUsers')?.[0];
      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);

      cy.get(fields.requisitionListSharingSignInForm).should('be.visible');

      cy.get(fields.requisitionListSharingSignInForm).within(() => {
        cy.get('input[name="email"]').type(recipient.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(recipient.password);
        cy.wait(1500);
        cy.get('.auth-sign-in-form__button--submit').click();
      });

      cy.url().should('include', '/customer/requisition-list');
      cy.url().should('include', 'requisitionListUid=');
      cy.get(fields.requisitionListItemRow).should('have.length.gte', 1);
    });

    // -----------------------------------------------------------------------
    // 7. Sender's own email is excluded from the share-with recipient dropdown
    // -----------------------------------------------------------------------
    it("Sender's email is not listed as a recipient option in the share modal", () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      const admin = Cypress.env('testAdmin');
      const preExistingUid = Cypress.env('shareTestRequisitionListUid');

      if (preExistingUid) {
        cy.visit(`/customer/requisition-list-view?requisitionListUid=${preExistingUid}`);
      } else {
        cy.visit('/customer/requisition-lists');
        cy.contains('Cypress Share Test List').click();
      }
      cy.url().should('include', 'requisitionListUid=');

      cy.get(fields.requisitionListViewShareButton)
        .should('exist')
        .and('not.have.attr', 'aria-disabled', 'true')
        .click();

      // Wait for the user list to finish loading inside the share modal
      cy.get('.share-requisition-list-content__loading').should('not.exist');

      // Open the recipient dropdown and assert the sender's email is absent
      cy.get('.share-requisition-list-content__multi-select').click();
      cy.get('.share-requisition-list-content')
        .should('not.contain', admin.email);
    });

    // -----------------------------------------------------------------------
    // 8. Success alert is shown on the detail page after import
    // -----------------------------------------------------------------------
    it('Success alert is visible on the detail page after importing a shared list', () => {
      const recipient = Cypress.env('testUsers')?.[0];
      cy.visit('/customer/login');
      cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(recipient.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(recipient.password);
        cy.wait(1500);
        cy.get('.auth-sign-in-form__button--submit').click();
      });
      cy.url().should('include', '/customer/account');

      cy.visit(`${SHARING_PATH}?requisition_id=${validShareToken}`);
      cy.url().should('include', '/customer/requisition-list');
      cy.url().should('include', 'requisitionListUid=');

      // Pending alert written to localStorage by the sharing block is picked up
      // by the view block and emitted after the dropin mounts
      cy.get('.requisition-list__alert-wrapper .dropin-in-line-alert__title', { timeout: 5000 })
        .should('be.visible');
    });

    // -----------------------------------------------------------------------
    // 9. Share button opens the share modal with a shareable link
    // -----------------------------------------------------------------------
    it('Share button opens modal displaying a shareable link', () => {
      cy.loginAsCompanyAdmin();
      cy.url().should('include', '/customer/account');

      const preExistingUid = Cypress.env('shareTestRequisitionListUid');
      if (preExistingUid) {
        cy.visit(`/customer/requisition-list-view?requisitionListUid=${preExistingUid}`);
      } else {
        cy.visit('/customer/requisition-lists');
        cy.contains('Cypress Share Test List').click();
      }
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
  }
);
