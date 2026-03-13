/**
 * Cypress custom commands for B2B login operations.
 * Provides reusable login functions for different user types.
 *
 * These commands handle:
 * - Credential retrieval from Cypress.env
 * - Navigation to login page
 * - Form filling and submission
 * - Login success verification with retry logic
 *
 * @example
 * // Login as company admin
 * cy.loginAsCompanyAdmin();
 *
 * @example
 * // Login as regular user
 * cy.loginAsRegularUser();
 */

const MAX_LOGIN_ATTEMPTS = 3;
const LOGIN_RETRY_DELAY = 5000;

/**
 * Attempt a single login via the sign-in form and verify success by
 * checking that the auth cookie is set and the URL navigated away from
 * the login page. Returns true if login succeeded, false otherwise.
 */
function attemptLogin(email, password) {
  cy.visit('/customer/login');
  cy.wait(1000);

  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.get('input[name="email"]').type(email);
    cy.wait(1000);
    cy.get('input[name="password"]').type(password);
    cy.wait(1000);
    cy.get('button[type="submit"]').click();
  });

  cy.wait(8000);
}

/**
 * Verify login succeeded by checking the auth cookie exists.
 * If verification fails, retry the entire login flow up to maxAttempts.
 */
function loginWithRetry(email, password, label, attempt = 1) {
  cy.logToTerminal(`🔐 Login attempt ${attempt}/${MAX_LOGIN_ATTEMPTS} for ${label}: ${email}`);

  attemptLogin(email, password);

  cy.getCookie('auth_dropin_user_token').then((cookie) => {
    if (cookie && cookie.value) {
      cy.logToTerminal(`✅ ${label} logged in successfully (attempt ${attempt})`);
      return;
    }

    if (attempt >= MAX_LOGIN_ATTEMPTS) {
      throw new Error(
        `Login failed for ${email} after ${MAX_LOGIN_ATTEMPTS} attempts. `
        + 'The auth cookie was never set — the account may not be indexed yet.',
      );
    }

    cy.logToTerminal(
      `⚠️ Login not confirmed (no auth cookie). Retrying in ${LOGIN_RETRY_DELAY / 1000}s...`,
    );
    cy.wait(LOGIN_RETRY_DELAY);
    loginWithRetry(email, password, label, attempt + 1);
  });
}

/**
 * Login as company admin.
 * Uses credentials stored in Cypress.env by setup commands.
 * Verifies login success via auth cookie with retry logic.
 */
Cypress.Commands.add('loginAsCompanyAdmin', () => {
  cy.then(() => {
    const testAdmin = Cypress.env('testAdmin');

    if (!testAdmin || !testAdmin.email || !testAdmin.password) {
      throw new Error(
        'Admin credentials not set. Did you forget to call cy.setupCompanyWithAdmin()?',
      );
    }

    loginWithRetry(testAdmin.email, testAdmin.password, 'Admin');
  });
});

/**
 * Login as regular user.
 * Uses credentials stored in Cypress.env by setup commands.
 * Verifies login success via auth cookie with retry logic.
 */
Cypress.Commands.add('loginAsRegularUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');

    if (!testUsers || !testUsers.regular || !testUsers.regular.email || !testUsers.regular.password) {
      throw new Error(
        'Regular user credentials not set. Did you forget to call cy.setupCompanyWithUser()?',
      );
    }

    loginWithRetry(testUsers.regular.email, testUsers.regular.password, 'Regular user');
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
 * Verifies login success via auth cookie with retry logic.
 */
Cypress.Commands.add('loginAsRestrictedUser', () => {
  cy.then(() => {
    const testUsers = Cypress.env('testUsers');

    if (!testUsers || !testUsers.restricted || !testUsers.restricted.email || !testUsers.restricted.password) {
      throw new Error(
        'Restricted user credentials not set. Did you forget to call cy.setupCompanyWithRestrictedUser()?',
      );
    }

    loginWithRetry(testUsers.restricted.email, testUsers.restricted.password, 'Restricted user');
  });
});
