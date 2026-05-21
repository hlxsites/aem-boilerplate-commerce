import {
  createCompany,
  createStandaloneCustomer,
  assignCustomerToCompany,
  createCompanyRole,
  assignRoleToUser,
} from '../../support/b2bCompanyAPICalls';
import { baseCompanyData } from '../../fixtures/companyManagementData';

describe("B2B Company Hierarchy", { tags: ["@B2BSaas"] }, () => {
  const urls = Cypress.env("poUrls");

  before(() => {
    cy.logToTerminal("🏢 B2B Company Hierarchy test suite started");
  });

  beforeEach(() => {
    cy.logToTerminal("🧹 Test cleanup");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  /**
   * Complete E2E test: Create companies, users, assign roles, test hierarchy access
   */
  it("E2E: Company hierarchy access with and without permissions", { tags: ["@B2BSaas"], defaultCommandTimeout: 30000 }, () => {
    cy.logToTerminal("========= 🚀 E2E: Company Hierarchy Access Test =========");

    // ========== STEP 1: Create Employee 1 ==========
    cy.logToTerminal("--- STEP 1: Creating Employee 1 (will be admin) ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("👤 Creating Employee 1...");
      const employee1 = await createStandaloneCustomer({
        firstname: "Employee",
        lastname: "One",
        email: `employee1_${timestamp}_${randomStr}@example.com`,
        password: "Test123!",
      });

      Cypress.env("employee1", {
        id: employee1.id,
        email: employee1.email,
        password: "Test123!",
      });
      cy.logToTerminal(`✅ Employee 1 created: ${employee1.email} (ID: ${employee1.id})`);
    });

    // ========== STEP 2: Create Employee 2 ==========
    cy.logToTerminal("--- STEP 2: Creating Employee 2 (no permissions) ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("👤 Creating Employee 2...");
      const employee2 = await createStandaloneCustomer({
        firstname: "Employee",
        lastname: "Two",
        email: `employee2_${timestamp}_${randomStr}@example.com`,
        password: "Test123!",
      });

      Cypress.env("employee2", {
        id: employee2.id,
        email: employee2.email,
        password: "Test123!",
      });
      cy.logToTerminal(`✅ Employee 2 created: ${employee2.email} (ID: ${employee2.id})`);
    });

    // ========== STEP 3: Create Company 1 ==========
    cy.logToTerminal("--- STEP 3: Creating Company 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("🏢 Creating Company 1...");
      const company1 = await createCompany({
        companyName: `HierarchyTest1 ${randomStr}`,
        companyEmail: `company1-${timestamp}@example.com`,
        legalName: `Hierarchy Test Company 1 Legal`,
        vatTaxId: `VAT-C1-${randomStr}`,
        resellerId: `RES-C1-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        adminFirstName: "Company1",
        adminLastName: "Admin",
        adminEmail: `admin1-${timestamp}@example.com`,
        adminPassword: "Test123!",
        status: 1, // Active
      });

      Cypress.env("company1", {
        id: company1.id,
        name: company1.name,
        email: company1.company_email,
      });
      cy.logToTerminal(`✅ Company 1 created: ${company1.name} (ID: ${company1.id})`);
    });

    // ========== STEP 4: Create Company 2 ==========
    cy.logToTerminal("--- STEP 4: Creating Company 2 ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("🏢 Creating Company 2...");
      const company2 = await createCompany({
        companyName: `HierarchyTest2 ${randomStr}`,
        companyEmail: `company2-${timestamp}@example.com`,
        legalName: `Hierarchy Test Company 2 Legal`,
        vatTaxId: `VAT-C2-${randomStr}`,
        resellerId: `RES-C2-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        adminFirstName: "Company2",
        adminLastName: "Admin",
        adminEmail: `admin2-${timestamp}@example.com`,
        adminPassword: "Test123!",
        status: 1, // Active
      });

      Cypress.env("company2", {
        id: company2.id,
        name: company2.name,
        email: company2.company_email,
      });
      cy.logToTerminal(`✅ Company 2 created: ${company2.name} (ID: ${company2.id})`);
    });

    // ========== STEP 5: Create Company 3 ==========
    cy.logToTerminal("--- STEP 5: Creating Company 3 ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("🏢 Creating Company 3...");
      const company3 = await createCompany({
        companyName: `HierarchyTest3 ${randomStr}`,
        companyEmail: `company3-${timestamp}@example.com`,
        legalName: `Hierarchy Test Company 3 Legal`,
        vatTaxId: `VAT-C3-${randomStr}`,
        resellerId: `RES-C3-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        adminFirstName: "Company3",
        adminLastName: "Admin",
        adminEmail: `admin3-${timestamp}@example.com`,
        adminPassword: "Test123!",
        status: 1, // Active
      });

      Cypress.env("company3", {
        id: company3.id,
        name: company3.name,
        email: company3.company_email,
      });
      cy.logToTerminal(`✅ Company 3 created: ${company3.name} (ID: ${company3.id})`);
    });

    cy.wait(3000); // Wait for companies to be indexed

    // ========== STEP 6: Assign Employee 1 to Company 1 ==========
    cy.logToTerminal("--- STEP 6: Assigning Employee 1 to Company 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee1 = Cypress.env("employee1");
      const company1 = Cypress.env("company1");

      cy.logToTerminal(`🔗 Assigning Employee 1 (ID: ${employee1.id}) to Company 1 (ID: ${company1.id})...`);
      await assignCustomerToCompany(employee1.id, company1.id);
      cy.logToTerminal("✅ Employee 1 assigned to Company 1");
    });

    // ========== STEP 7: Assign Employee 2 to Company 1 ==========
    cy.logToTerminal("--- STEP 7: Assigning Employee 2 to Company 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee2 = Cypress.env("employee2");
      const company1 = Cypress.env("company1");

      cy.logToTerminal(`🔗 Assigning Employee 2 (ID: ${employee2.id}) to Company 1 (ID: ${company1.id})...`);
      await assignCustomerToCompany(employee2.id, company1.id);
      cy.logToTerminal("✅ Employee 2 assigned to Company 1");
    });

    cy.wait(3000); // Wait for assignments to be indexed

    // ========== STEP 8: Create Director Role with Hierarchy Permissions ==========
    cy.logToTerminal("--- STEP 8: Creating Director role with hierarchy permissions ---");
    cy.then({ timeout: 60000 }, async () => {
      const company1 = Cypress.env("company1");

      cy.logToTerminal("⚙️ Creating Director role...");
      const directorRole = await createCompanyRole({
        company_id: company1.id,
        role_name: "Director",
        permissions: [
          { resource_id: "Magento_Company::index", permission: "allow" },
          { resource_id: "Magento_Company::view", permission: "allow" },
          { resource_id: "Magento_Company::view_account", permission: "allow" },
          { resource_id: "Magento_Company::user_management", permission: "allow" },
        ],
      });

      Cypress.env("directorRole", {
        id: directorRole.id,
        name: directorRole.role_name,
      });
      cy.logToTerminal(`✅ Director role created (ID: ${directorRole.id})`);
    });

    cy.wait(3000); // Wait for role to be indexed

    // ========== STEP 9: Assign Director Role to Employee 1 ==========
    cy.logToTerminal("--- STEP 9: Assigning Director role to Employee 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee1 = Cypress.env("employee1");
      const directorRole = Cypress.env("directorRole");

      cy.logToTerminal(`👔 Assigning Director role (ID: ${directorRole.id}) to Employee 1 (ID: ${employee1.id})...`);
      await assignRoleToUser(employee1.id, directorRole);
      cy.logToTerminal("✅ Employee 1 is now Director with hierarchy permissions");
    });

    cy.wait(5000); // Wait for permissions to propagate

    // ========== STEP 10: Login as Employee 1 (Director) ==========
    cy.logToTerminal("--- STEP 10: Login as Employee 1 (Director) ---");
    cy.then(() => {
      const employee1 = Cypress.env("employee1");

      cy.logToTerminal(`🔐 Logging in as Employee 1: ${employee1.email}`);
      cy.visit("/customer/login");
      cy.get("main .auth-sign-in-form", { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(employee1.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(employee1.password);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
      cy.logToTerminal("✅ Employee 1 logged in successfully");
    });

    // ========== STEP 11: Employee 1 Navigates to Hierarchy Page ==========
    cy.logToTerminal("--- STEP 11: Employee 1 navigates to hierarchy page ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to /customer/company/hierarchy...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.logToTerminal("✅ Checking page URL");
      cy.url().should("include", "/customer/company/hierarchy");

      cy.logToTerminal("✅ Checking hierarchy container exists");
      cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should("exist");
      cy.logToTerminal("✅ Employee 1 (Director) can view company hierarchy");
    });

    // ========== STEP 12: Logout Employee 1 ==========
    cy.logToTerminal("--- STEP 12: Logout Employee 1 ---");
    cy.then(() => {
      cy.logToTerminal("🚪 Logging out Employee 1...");
      cy.visit("/");
      cy.wait(2000);
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.wait(2000);
      cy.logToTerminal("✅ Employee 1 logged out");
    });

    // ========== STEP 13: Login as Employee 2 (No Permissions) ==========
    cy.logToTerminal("--- STEP 13: Login as Employee 2 (No Permissions) ---");
    cy.then(() => {
      const employee2 = Cypress.env("employee2");

      cy.logToTerminal(`🔐 Logging in as Employee 2: ${employee2.email}`);
      cy.visit("/customer/login");
      cy.get("main .auth-sign-in-form", { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(employee2.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(employee2.password);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
      cy.logToTerminal("✅ Employee 2 logged in successfully");
    });

    // ========== STEP 14: Employee 2 Sees Permission Denied ==========
    cy.logToTerminal("--- STEP 14: Employee 2 sees permission denied message ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to /customer/company/hierarchy...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.logToTerminal("✅ Checking page URL");
      cy.url().should("include", "/customer/company/hierarchy");

      cy.logToTerminal("✅ Checking permission denial message");
      cy.contains("You do not have permission to view company hierarchy", {
        timeout: 15000,
      }).should("be.visible");
      cy.logToTerminal("✅ Employee 2 (No Permissions) sees denial message correctly");
    });

    // ========== STEP 15: Logout Employee 2 ==========
    cy.logToTerminal("--- STEP 15: Logout Employee 2 ---");
    cy.then(() => {
      cy.logToTerminal("🚪 Logging out Employee 2...");
      cy.visit("/");
      cy.wait(2000);
      cy.logToTerminal("✅ Employee 2 logged out");
    });

    cy.logToTerminal("========= 🎉 E2E TEST COMPLETED: Company Hierarchy Access =========");
  });

  after(() => {
    cy.logToTerminal("🏁 Company Hierarchy test suite completed");
  });
});
