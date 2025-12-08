/**
 * Cypress custom commands for B2B user login.
 * Provides reusable login functions that use credentials stored in Cypress.env.
 *
 * These commands handle:
 * - Admin login
 * - Regular user login
 * - Login with specific credentials
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
 * Uses credentials stored in Cypress.env('testAdmin').
 */
Cypress.Commands.add('loginAsCompanyAdmin', () => {
  const adminEmail = Cypress.env('testAdmin').email;
  const adminPassword = Cypress.env('testAdmin').password;

  cy.logToTerminal(`🔐 Logging in as company admin: ${adminEmail}`);
  
  // Use inline login logic to avoid import issues
  cy.visit('/customer/login');
  cy.wait(1000); // Wait for page to load
  
  // Login form should be in main container
  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.get('input[name="email"]').type(adminEmail);
    cy.wait(1500);
    cy.get('input[name="password"]').type(adminPassword);
    cy.wait(1500);
    cy.get('button[type="submit"]').click();
  });
  cy.wait(8000); // Wait for login to complete
  
  cy.logToTerminal(`✅ Logged in as admin`);
});

/**
 * Login as regular user.
 * Uses credentials stored in Cypress.env('testUsers').regular.
 */
Cypress.Commands.add('loginAsRegularUser', () => {
  const regularEmail = Cypress.env('testUsers').regular.email;
  const regularPassword = Cypress.env('testUsers').regular.password;

  cy.logToTerminal(`🔐 Logging in as regular user: ${regularEmail}`);
  
  // Use inline login logic to avoid import issues
  cy.visit('/customer/login');
  cy.wait(1000); // Wait for page to load
  
  // Login form should be in main container
  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.get('input[name="email"]').type(regularEmail);
    cy.wait(1500);
    cy.get('input[name="password"]').type(regularPassword);
    cy.wait(1500);
    cy.get('button[type="submit"]').click();
  });
  cy.wait(8000); // Wait for login to complete
  
  cy.logToTerminal(`✅ Logged in as regular user`);
});

/**
 * Login as restricted user.
 * Uses credentials stored in Cypress.env('testUsers').restricted.
 */
Cypress.Commands.add('loginAsRestrictedUser', () => {
  const restrictedEmail = Cypress.env('testUsers').restricted.email;
  const restrictedPassword = Cypress.env('testUsers').restricted.password;

  cy.logToTerminal(`🔐 Logging in as restricted user: ${restrictedEmail}`);
  
  // Use inline login logic to avoid import issues
  cy.visit('/customer/login');
  cy.wait(1000); // Wait for page to load
  
  // Login form should be in main container
  cy.get('main .auth-sign-in-form', { timeout: 10000 }).within(() => {
    cy.get('input[name="email"]').type(restrictedEmail);
    cy.wait(1500);
    cy.get('input[name="password"]').type(restrictedPassword);
    cy.wait(1500);
    cy.get('button[type="submit"]').click();
  });
  cy.wait(8000); // Wait for login to complete
  
  cy.logToTerminal(`✅ Logged in as restricted user`);
});
