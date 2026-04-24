/**
 * Cypress custom commands for B2B login operations.
 * Provides reusable login functions for different user types.
 *
 * These commands handle:
 * - Credential retrieval from Cypress.env
 * - Navigation to login page
 * - Form filling and submission
 * - Wait for login completion
 *
 * @example
 * // Login as company admin
 * cy.loginAsCompanyAdmin();
 *
 * @example
 * // Login as regular user
 * cy.loginAsRegularUser();
 */

/**
 * Shared login implementation. Navigates to login page, fills credentials,
 * submits the form, and waits for redirect to /customer/account.
 *
 * @param {string} email - User email address
 * @param {string} password - User password
 */
function performLogin(email, password) {
  cy.visit('/customer/login');

  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.fillField('input[name="email"]', email);
    cy.fillField('input[name="password"]', password);
    cy.get('button[type="submit"]').click();
  });

  // Wait for login redirect instead of static wait
  cy.url({ timeout: 30000 }).should('include', '/customer/account');
}

/**
 * Login as company admin.
 * Uses credentials stored in Cypress.env by setup commands.
 * Throws error if credentials are not set.
 */
Cypress.Commands.add('loginAsCompanyAdmin', () => {
  cy.then(() => {
    const testAdmin = Cypress.env('testAdmin');

    if (!testAdmin || !testAdmin.email || !testAdmin.password) {
      throw new Error(
        'Admin credentials not set. Did you forget to call cy.setupCompanyWithAdmin()?',
      );
    }

    cy.logToTerminal(`🔐 Logging in as admin: ${testAdmin.email}`);
    performLogin(testAdmin.email, testAdmin.password);
    cy.logToTerminal('✅ Admin logged in successfully');
  });
});

/**
 * Login as regular user.
 * Uses credentials stored in Cypress.env by setup commands.
 * Throws error if credentials are not set.
 */
Cypress.Commands.add('loginAsRegularUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');

    if (!testUsers || !testUsers.regular || !testUsers.regular.email || !testUsers.regular.password) {
      throw new Error(
        'Regular user credentials not set. Did you forget to call cy.setupCompanyWithUser()?',
      );
    }

    cy.logToTerminal(`🔐 Logging in as regular user: ${testUsers.regular.email}`);
    performLogin(testUsers.regular.email, testUsers.regular.password);
    cy.logToTerminal('✅ Regular user logged in successfully');
  });
});

/**
 * Combined command: Setup company with admin and login immediately.
 * Convenience method for common pattern in tests.
 */
Cypress.Commands.add('setupAndLoginAsAdmin', () => {
  cy.setupCompanyWithAdmin();
  cy.loginAsCompanyAdmin();
});

/**
 * Combined command: Setup company with user and login as regular user immediately.
 * Convenience method for common pattern in tests.
 */
Cypress.Commands.add('setupAndLoginAsUser', () => {
  cy.setupCompanyWithUser();
  cy.loginAsRegularUser();
});

/**
 * Login as restricted company user (for Company Credit tests).
 * Uses credentials stored in Cypress.env during setup.
 */
Cypress.Commands.add('loginAsRestrictedUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');
    
    if (!testUsers || !testUsers.restricted || !testUsers.restricted.email || !testUsers.restricted.password) {
      throw new Error(
        `Restricted user credentials not set. Did you forget to call cy.setupCompanyWithRestrictedUser()?`
      );
    }
    
    cy.logToTerminal(`🔐 Logging in as restricted user: ${testUsers.restricted.email}`);
    performLogin(testUsers.restricted.email, testUsers.restricted.password);
    cy.logToTerminal('✅ Restricted user logged in successfully');
  });
});
