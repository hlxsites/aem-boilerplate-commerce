import {
  createCompany,
  deleteCompanyById,
  deleteCustomerById,
} from "../../support/b2bCompanyAPICalls";
import { baseCompanyData } from "../../fixtures/companyManagementData";

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
  it(
    "Admin sees all companies where they are super_user",
    { tags: ["@B2BSaas"], defaultCommandTimeout: 30000 },
    () => {
      cy.logToTerminal(
        "========= 🚀 E2E: Multi-Company Admin Hierarchy =========",
      );

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
          name: company1.name,
        });

        Cypress.env("sharedAdmin", sharedAdmin);

        cy.logToTerminal(`✅ Company 1: ${company1.name} (ID: ${company1.id})`);
        cy.logToTerminal(
          `✅ Admin: ${sharedAdmin.email} (ID: ${sharedAdmin.id})`,
        );
      });

      // STEP 2: Create Company 2 with SAME Admin
      cy.logToTerminal("--- STEP 2: Creating Company 2 with SAME Admin ---");
      cy.then({ timeout: 60000 }, async () => {
        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        const admin = Cypress.env("sharedAdmin");

        cy.logToTerminal(`🏢 Creating Company 2 with admin ID: ${admin.id}...`);

        // Manually create company with existing admin
        const ACCSApiClient = require("../../support/accsClient");
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

        const company2 = await client.post("/V1/company/", companyPayload);

        Cypress.env("company2", {
          id: company2.id,
          name: company2.company_name,
        });

        cy.logToTerminal(
          `✅ Company 2: ${company2.company_name} (ID: ${company2.id})`,
        );
        cy.logToTerminal(`✅ Same admin is super_user for both companies`);
      });

      cy.wait(15000); // Wait for indexing and company data propagation

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

      // Wait for company data to be available via GraphQL
      cy.wait(10000);

      // STEP 4: Verify companies are accessible via GraphQL first
      cy.logToTerminal("--- STEP 4: Check companies are accessible via GraphQL ---");
      cy.then(() => {
        const company1 = Cypress.env("company1");
        const company2 = Cypress.env("company2");

        cy.getUserTokenCookie().then((token) => {
          // Retry GraphQL query until companies appear (max 30 seconds)
          const checkCompanies = (attempt = 1, maxAttempts = 6) => {
            cy.logToTerminal(`🔍 GraphQL check attempt ${attempt}/${maxAttempts}...`);
            
            cy.request({
              method: "POST",
              url: Cypress.env("graphqlEndPoint"),
              auth: { bearer: token },
              headers: { "content-type": "application/json" },
              body: {
                query: `
                  query {
                    customer {
                      companies(input: {}) {
                        items { id name }
                      }
                    }
                  }
                `,
              },
            }).then((response) => {
           Debug: log page content if companies not found
        cy.get(".commerce-b2b-company-hierarchy").then(($block) => {
          const blockText = $block.text();
          cy.logToTerminal(`📄 Hierarchy block content length: ${blockText.length} chars`);
          if (blockText.length < 50) {
            cy.logToTerminal(`⚠️ Block appears empty: "${blockText.trim()}"`);
          }
        });

        // First, check if companies appear at all (more lenient check with retry)
        cy.logToTerminal(`🔍 Checking Company 1 visible: ${company1.name}`);
        cy.get(".commerce-b2b-company-hierarchy", { timeout: 3
              if (companies.length >= 2) {
                cy.logToTerminal("✅ Both companies accessible via GraphQL");
                companies.forEach(c => cy.logToTerminal(`  - ${c.name} (ID: ${c.id})`));
              } else if (attempt < maxAttempts) {
                cy.logToTerminal(`⏳ Only ${companies.length} companies, retrying in 5s...`);
                cy.wait(5000);
                checkCompanies(attempt + 1, maxAttempts);
              } else {
                cy.logToTerminal("⚠️ Companies not fully indexed after 30s, proceeding anyway...");
              }
            });
          };
          
          checkCompanies();
        });
      });

      cy.wait(2000);

      // STEP 5: Check Hierarchy Shows Both Companies
      cy.logToTerminal("--- STEP 5: Verify Hierarchy Shows Both Companies ---");
      cy.then(() => {
        cy.logToTerminal("📄 Navigating to hierarchy...");
        cy.visit("/customer/company/hierarchy");
        cy.wait(5000);

        cy.url().should("include", "/customer/company/hierarchy");
        cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should(
          "exist",
        );

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

        // Wait for hierarchy to load data (GraphQL request + rendering)
        cy.wait("@defaultGraphQL");
        cy.wait(3000);

        // First, check if companies appear at all (more lenient check)
        cy.logToTerminal(`🔍 Checking Company 1 visible: ${company1.name}`);
        cy.get(".commerce-b2b-company-hierarchy", { timeout: 20000 })
          .should("contain.text", company1.name);
        
        cy.logToTerminal(`🔍 Checking Company 2 visible: ${company2.name}`);
        cy.get(".commerce-b2b-company-hierarchy", { timeout: 20000 })
          .should("contain.text", company2.name);

        cy.logToTerminal("✅ Both companies are visible in hierarchy!");

        // Now verify they are also draggable (for drag & drop functionality)
        cy.get(".commerce-b2b-company-hierarchy [draggable='true']", {
          timeout: 10000,
        }).should("have.length.at.least", 2);
        cy.logToTerminal("✅ Hierarchy loaded with draggable items");

        cy.logToTerminal("✅ SUCCESS: Admin sees both companies in hierarchy!");
      });

      // STEP 6: Assign Company2 as child of Company1 via Drag & Drop UI
      cy.logToTerminal("--- STEP 6: Assign Child Company via Drag & Drop ---");
      cy.then(() => {
        const company1 = Cypress.env("company1");
        const company2 = Cypress.env("company2");

        cy.logToTerminal(
          `🔗 Dragging ${company2.name} into ${company1.name}`,
        );
        cy.logToTerminal(`   Parent: ${company1.name} (ID: ${company1.id})`);
        cy.logToTerminal(`   Child: ${company2.name} (ID: ${company2.id})`);

        // Ensure hierarchy is expanded
        cy.get('.commerce-b2b-company-hierarchy').then(($hierarchy) => {
          const expandButtons = $hierarchy.find('button[aria-expanded="false"]');
          if (expandButtons.length > 0) {
            cy.logToTerminal('📂 Expanding hierarchy nodes...');
            expandButtons.each((idx, btn) => cy.wrap(btn).click());
            cy.wait(1000);
          }
        });

        // Find and prepare draggable company nodes
        cy.logToTerminal(`🎯 Finding draggable node for ${company2.name}...`);
        cy.get(".commerce-b2b-company-hierarchy")
          .contains(company2.name)
          .closest('[draggable="true"]')
          .should('have.attr', 'draggable', 'true')
          .as('dragCompany2');

        cy.logToTerminal(`🎯 Finding drop target for ${company1.name}...`);
        cy.get(".commerce-b2b-company-hierarchy")
          .contains(company1.name)
          .closest('[draggable="true"]')
          .should('have.attr', 'draggable', 'true')
          .as('dropCompany1');

        // Perform drag and drop
        cy.logToTerminal('🔄 Executing drag & drop...');
        cy.get('@dragCompany2').trigger('dragstart', { dataTransfer: new DataTransfer() });
        cy.get('@dropCompany1').trigger('dragover');
        cy.get('@dropCompany1').trigger('drop');
        cy.wait(3000);

        // Verify success message
        cy.contains(/successfully.*moved|moved.*successfully|company.*assigned/i, { timeout: 5000 })
          .should('be.visible');

        cy.logToTerminal("✅ Drag & drop assignment successful!");
      });

      // STEP 7: Refresh page to see updated hierarchy
      cy.logToTerminal("--- STEP 7: Refresh Page to See Updated Hierarchy ---");
      cy.then(() => {
        cy.logToTerminal("🔄 Reloading hierarchy page...");
        cy.reload();
        cy.wait(5000);

        cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should(
          "exist",
        );
        cy.logToTerminal("✅ Page reloaded");
      });

      // STEP 8: Verify nested structure in DOM (Company2 is child of Company1)
      cy.logToTerminal("--- STEP 8: Verify Nested Hierarchy Structure in DOM ---");
      cy.then(() => {
        const company1 = Cypress.env("company1");
        const company2 = Cypress.env("company2");

        // Wait for hierarchy to fully load
        cy.wait("@defaultGraphQL");
        cy.wait(3000);

        cy.logToTerminal(`🔍 Verifying parent company visible: ${company1.name}`);
        cy.get(".commerce-b2b-company-hierarchy")
          .contains(company1.name, { timeout: 20000 })
          .should("be.visible");

        // Expand all nodes to ensure nested structure is visible
        cy.get(".commerce-b2b-company-hierarchy").then(($hierarchy) => {
          const expandButtons = $hierarchy.find('button[aria-expanded="false"]');
          if (expandButtons.length > 0) {
            cy.logToTerminal("📂 Expanding all hierarchy nodes...");
            expandButtons.each((idx, btn) => cy.wrap(btn).click());
            cy.wait(2000);
          }
        });

        // Verify Company2 is nested inside Company1's hierarchy node
        // Similar to Structure test: find parent, then find child within parent's group
        cy.logToTerminal(
          `🔍 Verifying ${company2.name} is nested under ${company1.name}...`,
        );
        
        cy.get(".commerce-b2b-company-hierarchy")
          .contains(company1.name)
          .parents('[draggable="true"]')
          .first()
          .within(() => {
            // Look for nested children container (might be different class than .acm-tree__group)
            cy.get('[class*="child"], [class*="group"], [class*="nested"], ul, ol')
              .should('contain.text', company2.name);
          });

        cy.logToTerminal(
          `✅ SUCCESS: ${company2.name} is properly nested under ${company1.name}!`,
        );
        cy.logToTerminal(`   Parent: ${company1.name}`);
        cy.logToTerminal(`   Child: ${company2.name}`);
      });

      cy.logToTerminal("========= 🎉 TEST PASSED =========");
    },
  );

  after(() => {
    cy.logToTerminal("🧹 Cleanup: Deleting test companies and users...");

    cy.then({ timeout: 60000 }, async () => {
      const company1 = Cypress.env("company1");
      const company2 = Cypress.env("company2");
      const admin = Cypress.env("sharedAdmin");

      try {
        if (company1?.id) {
          cy.logToTerminal(`🗑️ Deleting Company 1 (ID: ${company1.id})...`);
          await deleteCompanyById(company1.id);
          cy.logToTerminal("✅ Company 1 deleted");
        }
      } catch (error) {
        cy.logToTerminal(`⚠️ Could not delete Company 1: ${error.message}`);
      }

      try {
        if (company2?.id) {
          cy.logToTerminal(`🗑️ Deleting Company 2 (ID: ${company2.id})...`);
          await deleteCompanyById(company2.id);
          cy.logToTerminal("✅ Company 2 deleted");
        }
      } catch (error) {
        cy.logToTerminal(`⚠️ Could not delete Company 2: ${error.message}`);
      }

      try {
        if (admin?.id) {
          cy.logToTerminal(`🗑️ Deleting Admin user (ID: ${admin.id})...`);
          await deleteCustomerById(admin.id);
          cy.logToTerminal("✅ Admin user deleted");
        }
      } catch (error) {
        cy.logToTerminal(`⚠️ Could not delete Admin user: ${error.message}`);
      }

      cy.logToTerminal("🏁 Company Hierarchy test suite completed");
    });
  });
});
