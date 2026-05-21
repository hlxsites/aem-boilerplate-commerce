import { createCompany } from '../../support/b2bCompanyAPICalls';
import { baseCompanyData } from '../../fixtures/companyManagementData';

describe("B2B Company Hierarchy", { tags: ["@B2BSaas"] }, () => {
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
   * Test: Admin sees both companies in hierarchy
   */
  it("Admin sees all companies where they are super_user", { tags: ["@B2BSaas"], defaultCommandTimeout: 30000 }, () => {
    cy.logToTerminal("========= 🚀 E2E: Multi-Company Admin Hierarchy =========");

    let sharedAdmin = null;

    // STEP 1: Create Company 1 with Admin
    cy.logToTerminal("--- STEP 1: Creating Company 1 with Admin ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);

      cy.logToTerminal("🏢 Creating Company 1...");
      const company1 = await createCompany({
        companyName: `Company1 ${randomStr}`,
        companyEmail: `company1-${timestamp}@example.com`,
        legalName: `Company 1 Legal`,
        vatTaxId: `VAT-1-${randomStr}`,
        resellerId: `RES-1-${randomStr}`,
        street: baseCompanyData.street,
        city: baseCompanyData.city,
        countryCode: baseCompanyData.countryCode,
        regionId: 12,
        postcode: baseCompanyData.postcode,
        telephone: baseCompanyData.telephone,
        adminFirstName: "Shared",
        adminLastName: "Admin",
        adminEmail: `shared.admin-${timestamp}@example.com`,
        adminPassword: "Test123!",
        status: 1,
      });

      sharedAdmin = {
        id: company1.company_admin.id,
        email: company1.company_admin.email,
        password: company1.company_admin.password,
      };

      Cypress.env("company1", {
        id: company1.id,
        name: company1.company_name,
      });

      Cypress.env("sharedAdmin", sharedAdmin);

      cy.logToTerminal(`✅ Company 1: ${company1.company_name} (ID: ${company1.id})`);
      cy.logToTerminal(`✅ Admin: ${sharedAdmin.email} (ID: ${sharedAdmin.id})`);
    });

    // STEP 2: Create Company 2 with SAME Admin
    cy.logToTerminal("--- STEP 2: Creating Company 2 with SAME Admin ---");
    cy.then({ timeout: 60000 }, async () => {
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const admin = Cypress.env("sharedAdmin");

      cy.logToTerminal(`🏢 Creating Company 2 with admin ID: ${admin.id}...`);

      // Manually create company with existing admin
      const ACCSApiClient = require('../../support/accsClient');
      const client = new ACCSApiClient();

      const companyPayload = {
        company: {
          company_name: `Company2 ${randomStr}`,
          company_email: `company2-${timestamp}@example.com`,
          legal_name: `Company 2 Legal`,
          vat_tax_id: `VAT-2-${randomStr}`,
          reseller_id: `RES-2-${randomStr}`,
          street: [baseCompanyData.street],
          city: baseCompanyData.city,
          country_id: baseCompanyData.countryCode,
          region_id: 12,
          postcode: baseCompanyData.postcode,
          telephone: baseCompanyData.telephone,
          super_user_id: admin.id,
          customer_group_id: 1,
          status: 1,
        },
      };

      const company2 = await client.post('/V1/company/', companyPayload);

      Cypress.env("company2", {
        id: company2.id,
        name: company2.company_name,
      });

      cy.logToTerminal(`✅ Company 2: ${company2.company_name} (ID: ${company2.id})`);
      cy.logToTerminal(`✅ Same admin is super_user for both companies`);
    });

    cy.wait(5000); // Wait for indexing

    // STEP 3: Login as Admin
    cy.logToTerminal("--- STEP 3: Login as Shared Admin ---");
    cy.then(() => {
      const admin = Cypress.env("sharedAdmin");

      cy.logToTerminal(`🔐 Logging in as: ${admin.email}`);
      cy.visit("/customer/login");
      cy.get("main .auth-sign-in-form", { timeout: 10000 }).within(() => {
        cy.get('input[name="email"]').type(admin.email);
        cy.wait(1500);
        cy.get('input[name="password"]').type(admin.password);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
      });
      cy.wait(8000);
      cy.logToTerminal("✅ Admin logged in");
    });

    // STEP 4: Check Hierarchy Shows Both Companies
    cy.logToTerminal("--- STEP 4: Verify Hierarchy Shows Both Companies ---");
    cy.then(() => {
      cy.logToTerminal("📄 Navigating to hierarchy...");
      cy.visit("/customer/company/hierarchy");
      cy.wait(5000);

      cy.url().should("include", "/customer/company/hierarchy");
      cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should("exist");

      // Check no permission denied
      cy.get("body").then(($body) => {
        const bodyText = $body.text();
        if (bodyText.includes("You do not have permission")) {
          throw new Error("Admin should have access to hierarchy");
        }
        cy.logToTerminal("✅ No permission denied");
      });

      const company1 = Cypress.env("company1");
      const company2 = Cypress.env("company2");

      // Check Company 1 name visible in hierarchy (root level)
      cy.logToTerminal(`✅ Checking Company 1 visible: ${company1.name}`);
      cy.get(".commerce-b2b-company-hierarchy")
        .contains(company1.name, { timeout: 15000 })
        .should("be.visible");

      // Check Company 2 name visible in hierarchy (root level)
      cy.logToTerminal(`✅ Checking Company 2 visible: ${company2.name}`);
      cy.get(".commerce-b2b-company-hierarchy")
        .contains(company2.name, { timeout: 15000 })
        .should("be.visible");

      cy.logToTerminal("✅ SUCCESS: Admin sees both companies in hierarchy!");
    });

    cy.logToTerminal("========= 🎉 TEST PASSED =========");
  });

  after(() => {
    cy.logToTerminal("🏁 Company Hierarchy test suite completed");
  });
});

