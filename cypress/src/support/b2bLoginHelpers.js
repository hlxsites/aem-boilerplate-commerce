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

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.visit('/customer/login');

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.safeType('input[name="email"]', testAdmin.email);
      cy.safeType('input[name="password"]', testAdmin.password);
      cy.get('button[type="submit"]').click();
    });

    cy.wait('@loginMutation');
    cy.url({ timeout: 15000 }).should('include', '/customer/account');
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

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.visit('/customer/login');

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.safeType('input[name="email"]', testUsers.regular.email);
      cy.safeType('input[name="password"]', testUsers.regular.password);
      cy.get('button[type="submit"]').click();
    });

    cy.wait('@loginMutation');
    cy.url({ timeout: 15000 }).should('include', '/customer/account');
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

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.visit('/customer/login');
    
    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.safeType('input[name="email"]', testUsers.restricted.email);
      cy.safeType('input[name="password"]', testUsers.restricted.password);
      cy.get('button[type="submit"]').click();
    });
    
    cy.wait('@loginMutation');
    cy.url({ timeout: 15000 }).should('include', '/customer/account');
    cy.logToTerminal('✅ Restricted user logged in successfully');
  });
});
