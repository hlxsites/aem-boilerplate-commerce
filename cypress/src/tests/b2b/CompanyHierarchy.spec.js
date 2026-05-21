import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCompanyRoles,
} from '../../support/b2bPOAPICalls';
import * as actions from '../../actions';

describe("B2B Company Hierarchy", { tags: ["@B2BSaas"] }, () => {
  const urls = Cypress.env("poUrls");
  const COMPANY_ID = 13;

  const hierarchyAdmin = {
    firstname: "Hierarchy",
    lastname: "Admin",
    email: `hierarchy_admin_${Date.now()}@example.com`,
    password: "Test123!",
    companyId: COMPANY_ID,
  };

  const hierarchyAdminRole = {
    role_name: `Hierarchy Admin ${Date.now()}`,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: "Magento_Company::index", permission: "allow" },
      { resource_id: "Magento_Company::view", permission: "allow" },
      { resource_id: "Magento_Company::view_account", permission: "allow" },
    ],
  };

  before(() => {
    cy.logToTerminal("🏢 B2B Company Hierarchy test suite started");
  });

  beforeEach(() => {
    cy.logToTerminal("🧹 B2B Company Hierarchy test suite cleanup");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  after(() => {
    cy.logToTerminal("🗑️ Cleaning up test data");
    const roleId = Cypress.env("hierarchyRoleId");
    if (roleId) {
      cy.wrap(null).then(() => {
        return deleteCompanyRoles([roleId]).then(() => {
          cy.logToTerminal(`✅ Deleted role ID: ${roleId}`);
        });
      });
    }
  });

  // Test 1: Setup roles and users
  it("Setup - Create role and user", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal(
      "========= ⚙️ Test 1: Setup - Creating role and user =========",
    );

    // Create role
    cy.logToTerminal("⚙️ Creating hierarchy admin role");
    cy.wrap(null)
      .then(() => {
        cy.wait(1500);
        return manageCompanyRole(hierarchyAdminRole);
      })
      .then((result) => {
        const roleId = result?.role?.id;
        Cypress.env("hierarchyRoleId", roleId);
        cy.logToTerminal(
          `✅ Role created: ${hierarchyAdminRole.role_name} | ID: ${roleId}`,
        );
        cy.logToTerminal("⏳ Waiting for role to be indexed in the system...");
        cy.wait(5000);

        // Create user
        cy.logToTerminal("⚙️ Creating test user & assigning role");
        cy.wait(5000);
        return createUserAssignCompanyAndRole(hierarchyAdmin, roleId);
      })
      .then(() => {
        Cypress.env("hierarchyAdmin", hierarchyAdmin);
        cy.logToTerminal(`✅ User created: ${hierarchyAdmin.email}`);
        cy.logToTerminal(
          "⏳ Waiting for user and permissions to be fully applied in the system...",
        );
        cy.wait(5000);
        cy.logToTerminal("✅ Test 1: Setup completed successfully");
      });
  });

  // Test 2: Admin can view hierarchy page
  it("Admin - View company hierarchy", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal(
      "========= ⚙️ Test 2: Admin viewing company hierarchy =========",
    );

    const admin = Cypress.env("hierarchyAdmin") || hierarchyAdmin;
    cy.logToTerminal(`🔐 Login as Hierarchy Admin: ${admin.email}`);
    actions.login(admin, urls);

    cy.logToTerminal("📄 Navigating to hierarchy page...");
    cy.visit("/account/hierarchy");
    cy.wait(5000);

    cy.logToTerminal("✅ Checking page loaded");
    cy.url().should("include", "/account/hierarchy");

    cy.logToTerminal("✅ Checking hierarchy container exists");
    cy.get(".commerce-b2b-company-hierarchy", { timeout: 15000 }).should(
      "exist",
    );

    cy.logToTerminal("🚪 Logging out");
    cy.visit("/");
    cy.wait(3000);
    cy.logToTerminal("✅ Test 2: Hierarchy viewing completed");
  });

  // Test 3: Unauthenticated user redirect
  it("Unauthenticated - Redirect to login", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal(
      "========= ⚙️ Test 3: Unauthenticated user redirect =========",
    );

    cy.logToTerminal("🔗 Attempting to access hierarchy without auth...");
    cy.visit("/account/hierarchy");
    cy.wait(3000);

    cy.logToTerminal("✅ Checking redirect to login");
    cy.url().should("include", "/customer/login");

    cy.logToTerminal("✅ Test 3: Redirect test completed successfully");
  });
});
