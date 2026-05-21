import {
  createCompany,
  createStandaloneCustomer,
  assignCustomerToCompany,
  createCompanyRole,
  assignRoleToUser,
} from '../../support/b2bCompanyAPICalls';
import {
  baseCompanyData,
  fullAdminPermissions,
} from "../../fixtures/companyManagementData";

describe.skip("B2B Company Hierarchy", { tags: ["@B2BSaas"] }, () => {
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
   * Simple test: Company admin can access hierarchy page
   */
  it("E2E: Company admin can view company hierarchy", { tags: ["@B2BSaas"], defaultCommandTimeout: 30000 }, () => {
    cy.logToTerminal("========= 🚀 E2E: Company Admin Hierarchy Access =========");

    // ========== STEP 1: Create Employee 1 ==========
    cy.logToTerminal("--- STEP 1: Creating Employee 1 ---");
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
    cy.logToTerminal("--- STEP 2: Creating Employee 2 ---");
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
        adminEmail: `admin1-${timestamp}@example.com`,
        adminPassword: "Test123!",
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

    cy.wait(3000); // Wait for companies to be indexed

    // ========== STEP 5: Assign Employee 1 only to Company 1 ==========
    cy.logToTerminal("--- STEP 5: Assigning Employee 1 to Company 1 only ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee1 = Cypress.env("employee1");
      const company1 = Cypress.env("company1");

      cy.logToTerminal(`🔗 Assigning Employee 1 (ID: ${employee1.id}) to Company 1 (ID: ${company1.id})...`);
      await assignCustomerToCompany(employee1.id, company1.id);
      cy.logToTerminal("✅ Employee 1 assigned to Company 1 only");
    });

    cy.wait(3000); // Wait for assignment to be indexed

    // ========== STEP 6: Create Director Role in Company 1 ==========
    cy.logToTerminal("--- STEP 6: Creating Director role in Company 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const company1 = Cypress.env("company1");

      cy.logToTerminal("⚙️ Creating Director role for Company 1...");
      const directorRole1 = await createCompanyRole({
        company_id: company1.id,
        role_name: "Director",
        permissions: fullAdminPermissions,
      });

      Cypress.env("directorRole1", {
        id: directorRole1.id,
        name: directorRole1.role_name,
      });
      cy.logToTerminal(`✅ Director role created for Company 1 (ID: ${directorRole1.id})`);
    });

    cy.wait(3000); // Wait for role to be indexed

    // ========== STEP 7: Assign Director Role to Employee 1 in Company 1 ==========
    cy.logToTerminal("--- STEP 7: Assigning Director role to Employee 1 in Company 1 ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee1 = Cypress.env("employee1");
      const directorRole1 = Cypress.env("directorRole1");

      cy.logToTerminal(`👔 Assigning Director role (ID: ${directorRole1.id}) to Employee 1...`);
      await assignRoleToUser(employee1.id, directorRole1);
      cy.logToTerminal("✅ Employee 1 is now Director in Company 1");
      cy.logToTerminal("📝 Employee 1 is assigned only to Company 1");
    });

    cy.wait(5000); // Wait for permissions to propagate

    // ========== STEP 8: Login as Company 1 Admin (first time) ==========
    cy.logToTerminal("--- STEP 8: Login as Company 1 Admin (should see hierarchy) ---");
    cy.then(() => {
      const company1 = Cypress.env("company1");

      cy.logToTerminal(`🔐 Logging in as Company 1 Admin: ${company1.adminEmail}`);
      cy.visit("/customer/login");
      cy.get("main .auth-sign-in-form", { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(company1.adminEmail);
        cy.wait(1500);
        cy.get('input[name="password"]').type(company1.adminPassword);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
      cy.logToTerminal("✅ Company 1 Admin logged in successfully");
    });

    // ========== STEP 9: Company 1 Admin sees hierarchy ==========
    cy.logToTerminal("--- STEP 9: Company 1 Admin sees hierarchy ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to /customer/company/hierarchy...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.logToTerminal("🔄 Reloading page to ensure fresh data...");
      cy.reload();
      cy.wait(3000);

      cy.logToTerminal("✅ Checking page URL");
      cy.url().should("include", "/customer/company/hierarchy");

      cy.logToTerminal("✅ Checking hierarchy container exists");
      cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should(
        "exist",
      );

      // Wait for either: permission denial, empty state, or hierarchy to load
      cy.logToTerminal(
        "⏳ Waiting for page state to settle (permission/empty/hierarchy)...",
      );
      cy.wait(5000);

      // Debug: check what's actually on the page
      cy.get("body").then(($body) => {
        const bodyText = $body.text();
        cy.logToTerminal(
          `🔍 Page content preview: ${bodyText.substring(0, 500)}`,
        );

        // Check if permission denied message exists
        if (bodyText.includes("You do not have permission")) {
          cy.logToTerminal(
            "❌ Permission denied message found - user doesn't have access!",
          );
          throw new Error("User should have access but permission denied");
        }

        // Check if tree exists
        const hasTree = $body.find(".acm-tree").length > 0;
        cy.logToTerminal(`🌲 Tree exists: ${hasTree}`);

        // Check label count
        const labelCount = $body.find(".company-hierarchy-label").length;
        cy.logToTerminal(`📊 Found ${labelCount} company labels in hierarchy`);

        if (labelCount === 0) {
          cy.logToTerminal(
            "⚠️ No companies found in hierarchy - might be empty or still loading",
          );
        }
      });

      const company1 = Cypress.env("company1");
      const company2 = Cypress.env("company2");

      cy.logToTerminal(`✅ Checking Company 1 is displayed: ${company1.name}`);

      // Check if any labels exist first
      cy.get("body").then(($body) => {
        if ($body.find(".company-hierarchy-label").length === 0) {
          cy.logToTerminal(
            "⚠️ Hierarchy appears empty - waiting longer and retrying...",
          );
          cy.wait(5000);
          cy.reload();
          cy.wait(5000);
        }
      });

      cy.get(".company-hierarchy-label", { timeout: 20000 }).should(
        "have.length.at.least",
        1,
      );
      cy.get(".company-hierarchy-label")
        .contains(company1.name, { timeout: 10000 })
        .should("be.visible");

      cy.logToTerminal(
        `✅ Checking Company 2 is NOT displayed: ${company2.name}`,
      );
      cy.get(".company-hierarchy-label").then(($labels) => {
        const labelTexts = $labels.map((i, el) => Cypress.$(el).text()).get();
        cy.logToTerminal(
          `📋 All companies in hierarchy: ${labelTexts.join(", ")}`,
        );
        expect(labelTexts).to.not.include(company2.name);
      });

      cy.logToTerminal(
        "✅ Employee 1 sees only Company 1 (not assigned to Company 2 yet)",
      );
    });

    // ========== STEP 10: Logout Employee 1 ==========
    cy.logToTerminal("--- STEP 10: Logout Employee 1 ---");
    cy.then(() => {
      cy.logToTerminal("🚪 Logging out Employee 1...");
      cy.visit("/");
      cy.wait(2000);
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.wait(2000);
      cy.logToTerminal("✅ Employee 1 logged out");
    });

    // ========== STEP 11: Assign Employee 1 to Company 2 ==========
    cy.logToTerminal("--- STEP 11: Assigning Employee 1 to Company 2 (adding second company) ---");
    cy.then({ timeout: 60000 }, async () => {
      const employee1 = Cypress.env("employee1");
      const company2 = Cypress.env("company2");

      cy.logToTerminal(`🔗 Assigning Employee 1 (ID: ${employee1.id}) to Company 2 (ID: ${company2.id})...`);
      await assignCustomerToCompany(employee1.id, company2.id);
      cy.logToTerminal("✅ Employee 1 now assigned to Company 2 as well");
      cy.logToTerminal("📝 Employee 1 is now in both Company 1 (admin) and Company 2 (regular employee)");
    });

    cy.wait(3000); // Wait for assignment to be indexed

    // ========== STEP 12: Login as Employee 1 again ==========
    cy.logToTerminal("--- STEP 12: Login as Employee 1 again (should see 2 companies now) ---");
    cy.then(() => {
      const employee1 = Cypress.env("employee1");

      cy.logToTerminal(`🔐 Logging in as Employee 1 again: ${employee1.email}`);
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

    // ========== STEP 13: Employee 1 sees both companies now ==========
    cy.logToTerminal("--- STEP 13: Employee 1 sees both companies in hierarchy ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to /customer/company/hierarchy...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.logToTerminal("✅ Checking page URL");
      cy.url().should("include", "/customer/company/hierarchy");

      cy.logToTerminal("✅ Checking hierarchy container exists");
      cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should("exist");

      const company1 = Cypress.env("company1");
      const company2 = Cypress.env("company2");

      cy.logToTerminal(`✅ Checking Company 1 is displayed: ${company1.name}`);
      cy.get(".company-hierarchy-label").contains(company1.name, { timeout: 10000 }).should("be.visible");

      cy.logToTerminal(`✅ Checking Company 2 is NOW displayed: ${company2.name}`);
      cy.get(".company-hierarchy-label").contains(company2.name, { timeout: 10000 }).should("be.visible");

      cy.logToTerminal("✅ Employee 1 now sees BOTH companies (after being assigned to Company 2)");
    });

    // ========== STEP 14: Logout Employee 1 ==========
    cy.logToTerminal("--- STEP 14: Logout Employee 1 ---");
    cy.then(() => {
      cy.logToTerminal("🚪 Logging out Employee 1...");
      cy.visit("/");
      cy.wait(2000);
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.wait(2000);
      cy.logToTerminal("✅ Employee 1 logged out");
    });

    cy.logToTerminal("========= 🎉 E2E TEST COMPLETED: Dynamic Company Hierarchy Access =========");
  });

  after(() => {
    cy.logToTerminal("🏁 Company Hierarchy test suite completed");
  });
});
