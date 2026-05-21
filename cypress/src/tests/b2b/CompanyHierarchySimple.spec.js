import { createCompany } from '../../support/b2bCompanyAPICalls';
import { baseCompanyData } from '../../fixtures/companyManagementData';

describe("B2B Company Hierarchy - Simple", { tags: ["@B2BSaas"] }, () => {
  before(() => {
    cy.logToTerminal("🏢 B2B Company Hierarchy (Simple) test suite started");
  });

  beforeEach(() => {
    cy.logToTerminal("🧹 Test cleanup");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  it("Company admin can access hierarchy page", { tags: ["@B2BSaas"], defaultCommandTimeout: 30000 }, () => {
    cy.logToTerminal("========= 🚀 Company Admin Hierarchy Access =========");

    // STEP 1: Create Company with Admin
    cy.logToTerminal("--- STEP 1: Creating Company with Admin ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("🏢 Creating Company...");
      const company = await createCompany({
        companyName: `HierarchyTest ${randomStr}`,
        companyEmail: `company-${timestamp}@example.com`,
        legalName: `Hierarchy Test Company Legal`,
        vatTaxId: `VAT-${randomStr}`,
        resellerId: `RES-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12, // California
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        adminFirstName: "Admin",
        adminLastName: "User",
        adminEmail: `admin-${timestamp}@example.com`,
        adminPassword: "Test123!",
        status: 1, // Active
      });

      Cypress.env("testCompany", {
        id: company.id,
        name: company.company_name,
        adminEmail: company.company_admin.email,
        adminPassword: company.company_admin.password,
      });

      cy.logToTerminal(`✅ Company created: ${company.company_name} (ID: ${company.id})`);
      cy.logToTerminal(`✅ Admin created: ${company.company_admin.email}`);
    });

    cy.wait(5000); // Wait for company to be fully indexed

    // STEP 2: Login as Company Admin
    cy.logToTerminal("--- STEP 2: Login as Company Admin ---");
    cy.then(() => {
      const company = Cypress.env("testCompany");

      cy.logToTerminal(`🔐 Logging in as: ${company.adminEmail}`);
      cy.visit("/customer/login");
      cy.get("main .auth-sign-in-form", { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(company.adminEmail);
        cy.wait(1500);
        cy.get('input[name="password"]').type(company.adminPassword);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000); // Wait for login
      cy.logToTerminal("✅ Admin logged in");
    });

    // STEP 3: Check Hierarchy Page Access
    cy.logToTerminal("--- STEP 3: Check Hierarchy Page Access ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to hierarchy page...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.logToTerminal("✅ Checking URL");
      cy.url().should("include", "/customer/company/hierarchy");

      cy.logToTerminal("✅ Checking container exists");
      cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should("exist");

      // Check for permission denied
      cy.get("body").then(($body) => {
        const bodyText = $body.text();
        
        if (bodyText.includes("You do not have permission")) {
          cy.logToTerminal("❌ FAIL: Permission denied found!");
          throw new Error("Company admin should have access but got permission denied");
        }
        
        cy.logToTerminal("✅ SUCCESS: No permission denied - admin has access!");
      });
    });

    cy.logToTerminal("========= 🎉 TEST PASSED =========");
  });

  after(() => {
    cy.logToTerminal("🏁 Test suite completed");
  });
});
