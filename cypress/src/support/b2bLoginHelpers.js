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
    cy.visit('/customer/login');

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').should('be.visible').type(testAdmin.email, { delay: 100 });
      cy.get('input[name="email"]').should('have.value', testAdmin.email);
      cy.get('input[name="password"]').should('be.visible').type(testAdmin.password, { delay: 100 });
      cy.get('input[name="password"]').should('have.value', testAdmin.password);
    });

    // Wait for React/Preact to finalize state from last keystroke before submit
    cy.wait(500);
    cy.get('main .auth-sign-in-form button[type="submit"]').should('be.visible').click({ force: true });
    cy.wait('@loginMutation', { timeout: 15000 });

    cy.url({ timeout: 30000 }).should('include', '/customer/account');
    cy.get('.commerce-account-nav', { timeout: 15000 }).should('exist');
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
    cy.visit('/customer/login');

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').should('be.visible').type(testUsers.regular.email, { delay: 100 });
      cy.get('input[name="email"]').should('have.value', testUsers.regular.email);
      cy.get('input[name="password"]').should('be.visible').type(testUsers.regular.password, { delay: 100 });
      cy.get('input[name="password"]').should('have.value', testUsers.regular.password);
    });

    // Wait for React/Preact to finalize state from last keystroke before submit
    cy.wait(500);
    cy.get('main .auth-sign-in-form button[type="submit"]').should('be.visible').click({ force: true });
    cy.wait('@loginMutation', { timeout: 15000 });

    cy.url({ timeout: 30000 }).should('include', '/customer/account');
    cy.get('.commerce-account-nav', { timeout: 15000 }).should('exist');
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
    cy.visit('/customer/login');

    cy.intercept('POST', '**/graphql', (req) => {
      const body = req.body || {};
      if (body.query && body.query.includes('generateCustomerToken')) {
        req.alias = 'loginMutation';
      }
    });

    cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
      cy.get('input[name="email"]').should('be.visible').type(testUsers.restricted.email, { delay: 100 });
      cy.get('input[name="email"]').should('have.value', testUsers.restricted.email);
      cy.get('input[name="password"]').should('be.visible').type(testUsers.restricted.password, { delay: 100 });
      cy.get('input[name="password"]').should('have.value', testUsers.restricted.password);
    });

    // Wait for React/Preact to finalize state from last keystroke before submit
    cy.wait(500);
    cy.get('main .auth-sign-in-form button[type="submit"]').should('be.visible').click({ force: true });
    cy.wait('@loginMutation', { timeout: 15000 });

    cy.url({ timeout: 30000 }).should('include', '/customer/account');
    cy.get('.commerce-account-nav', { timeout: 15000 }).should('exist');
    cy.logToTerminal('✅ Restricted user logged in successfully');
  });
});
