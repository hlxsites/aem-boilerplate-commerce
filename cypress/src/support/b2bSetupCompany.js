/**
 * Cypress custom commands for B2B company setup.
 * Provides reusable setup functions for creating test companies with different configurations.
 *
 * These commands handle:
 * - Company creation with unique identifiers
 * - Admin and user account creation
 * - Credential storage in Cypress.env for use in tests
 *
 * @example
 * // Setup company with just admin
 * cy.setupCompanyWithAdmin();
 *
 * @example
 * // Setup company with admin + regular user
 * cy.setupCompanyWithUser();
 *
 * @example
 * // Setup company with admin + 2 additional users
 * cy.setupCompanyWith2Users();
 */

const {
  createCompany,
  createCompanyUser,
  createCompanyRole,
  assignRoleToUser,
  getCompanyCredit,
  updateCompanyCredit,
} = require('./b2bCompanyAPICalls');

const { baseCompanyData, companyUsers } = require('../fixtures/companyManagementData');

/**
 * Setup test company with admin only.
 * Creates a company with a single admin user.
 * Stores credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWithAdmin', () => {
  cy.logToTerminal('🏢 Setting up test company with admin...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Test company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Store for cleanup and login
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
  });
});

/**
 * Setup test company with admin + regular user.
 * Creates a company with admin and one additional user with default role.
 * Stores credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWithUser', () => {
  cy.logToTerminal('🏢 Setting up test company with regular user...');

  cy.then(async () => {
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;
    const uniqueRegularUserEmail = `regular.${timestamp}.${randomStr}@example.com`;

    // Create company with admin
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12, // California
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1, // Active
    });

    cy.logToTerminal(`✅ Company created: ${testCompany.name} (ID: ${testCompany.id})`);

    // Create regular user
    const regularUser = await createCompanyUser({
      email: uniqueRegularUserEmail,
      firstname: companyUsers.regularUser.firstname,
      lastname: companyUsers.regularUser.lastname,
      status: 1,
      password: companyUsers.regularUser.password,
    }, testCompany.id);

    cy.logToTerminal(`✅ Regular user created: ${regularUser.email} (ID: ${regularUser.id})`);

    // Store for cleanup and login
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail, // for cleanup
    });
    Cypress.env('testUsers', {
      regular: {
        email: uniqueRegularUserEmail,
        password: companyUsers.regularUser.password,
        id: regularUser.id,
      },
    });
  });
});

/**
 * Alias for setupCompanyWithUser.
 * Setup test company with admin + regular user.
 */
Cypress.Commands.add('setupCompanyWithRegularUser', () => {
  cy.setupCompanyWithUser();
});

/**
 * Setup test company with admin + company credit allocation.
 * Creates a company with Payment on Account permission enabled.
 * Stores credentials in Cypress.env for later use.
 */
Cypress.Commands.add('setupCompanyWithCredit', () => {
  cy.logToTerminal('🏢 Setting up test company with allocated credit and Payment on Account permission...');

  cy.then(async () => {
    // Dynamically import fixtures to handle ES6 modules
    const fixturesModule = await import('../fixtures/companyManagementData.js');
    const baseCompanyData = fixturesModule.baseCompanyData;
    const fullAdminPermissions = fixturesModule.fullAdminPermissions;

    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const uniqueCompanyEmail = `company.${timestamp}.${randomStr}@example.com`;
    const uniqueAdminEmail = `admin.${timestamp}.${randomStr}@example.com`;

    // Create company
    const testCompany = await createCompany({
      companyName: `${baseCompanyData.companyName} ${timestamp}`,
      companyEmail: uniqueCompanyEmail,
      legalName: baseCompanyData.legalName,
      vatTaxId: baseCompanyData.vatTaxId,
      resellerId: baseCompanyData.resellerId,
      street: baseCompanyData.street,
      city: baseCompanyData.city,
      countryCode: baseCompanyData.countryCode,
      regionId: 12,
      postcode: baseCompanyData.postcode,
      telephone: baseCompanyData.telephone,
      adminFirstName: baseCompanyData.adminFirstName,
      adminLastName: baseCompanyData.adminLastName,
      adminEmail: uniqueAdminEmail,
      adminPassword: 'Test123!',
      status: 1,
    });

    cy.logToTerminal(`✅ Company admin created with full permissions (including Payment on Account)`);

    // Get company credit (created automatically with company)
    const creditInfo = await getCompanyCredit(testCompany.id);
    const creditId = creditInfo.id;
    cy.logToTerminal(`✅ Company credit retrieved: ID=${creditId}`);

    // Allocate company credit limit
    const creditAmount = 500.00;
    const creditData = {
      company_id: testCompany.id,
      credit_limit: creditAmount,
      currency_code: 'USD',
    };

    const creditResult = await updateCompanyCredit(creditId, creditData);
    cy.logToTerminal(`✅ Company credit allocated: $${creditAmount.toFixed(2)}`);

    cy.logToTerminal(`✅ Company with credit created: ${testCompany.name}`);

    // Store for cleanup and login (with unique emails for this test)
    Cypress.env('currentTestCompanyEmail', uniqueCompanyEmail);
    Cypress.env('currentTestAdminEmail', uniqueAdminEmail);
    Cypress.env('testCompany', {
      id: testCompany.id,
      name: testCompany.name,
      email: uniqueCompanyEmail,
    });
    Cypress.env('testAdmin', {
      email: testCompany.company_admin.email,
      password: testCompany.company_admin.password,
      adminEmail: uniqueAdminEmail,
    });
    Cypress.env('testCredit', {
      id: creditResult.id,
      limit: creditAmount,
      balance: creditAmount,
    });
  });
});
