import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCompanyRoles,
  unassignRoles,
} from '../../support/b2bPOAPICalls';
import * as actions from '../../actions';

describe.skip("B2B Company Hierarchy", { tags: ["@B2BSaas"] }, () => {
  const urls = Cypress.env("poUrls");
  const COMPANY_ID = 13; // Existing company
  
  // Test admin user data
  const hierarchyAdmin = {
    firstname: 'Hierarchy',
    lastname: 'Admin',
    email: `hierarchy_admin_${Date.now()}@example.com`,
    password: 'Test123!',
    companyId: COMPANY_ID,
  };

  // Admin role with full hierarchy view permissions
  const hierarchyAdminRole = {
    role_name: `Hierarchy Admin ${Date.now()}`,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: 'Magento_Company::index', permission: 'allow' },
      { resource_id: 'Magento_Company::view', permission: 'allow' },
      { resource_id: 'Magento_Company::view_account', permission: 'allow' },
      { resource_id: 'Magento_Company::user_management', permission: 'allow' },
      { resource_id: 'Magento_Company::users_view', permission: 'allow' },
    ],
  };

  before(() => {
    cy.logToTerminal("🏢 B2B Company Hierarchy test suite started");
  });

  beforeEach(() => {
    cy.logToTerminal("🧹 Cleanup before test");
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept("**/graphql").as("defaultGraphQL");
  });

  after(() => {
    cy.logToTerminal("🗑️ Cleaning up test data");
    const roleId = Cypress.env('hierarchyRoleId');
    
    if (roleId) {
      cy.wrap(null).then(() => {
        return deleteCompanyRoles([roleId]).then(() => {
          cy.logToTerminal(`✅ Deleted role ID: ${roleId}`);
        });
      });
    }
  });

  // Test 1: Create admin user for hierarchy
  it("Setup - Create admin user for hierarchy", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal("========= ⚙️ Setup: Creating hierarchy admin user =========");

    // Step 1: Create role
    cy.logToTerminal("⚙️ Creating hierarchy admin role...");
    cy.wrap(null)
      .then(() => {
        return manageCompanyRole(hierarchyAdminRole);
      })
      .then((result) => {
        const roleId = result?.role?.id;
        Cypress.env('hierarchyRoleId', roleId);
        cy.logToTerminal(`✅ Role created: ${hierarchyAdminRole.role_name} | ID: ${roleId}`);
        
        // Step 2: Create user and assign to company
        cy.logToTerminal("⚙️ Creating admin user and assigning to company...");
        cy.wait(3000);
        
        return createUserAssignCompanyAndRole(hierarchyAdmin, roleId);
      })
      .then(() => {
        Cypress.env('hierarchyAdmin', hierarchyAdmin);
        cy.logToTerminal(`✅ Admin user created: ${hierarchyAdmin.email}`);
        cy.logToTerminal("⏳ Waiting for user to be indexed...");
        cy.wait(5000);
        cy.logToTerminal("✅ Setup completed successfully");
      });
  });

  // Test 2: Admin can view company hierarchy
  it("Admin can view company hierarchy", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal("========= 📄 Test: Admin views company hierarchy =========");

    const admin = Cypress.env('hierarchyAdmin') || hierarchyAdmin;

    // Login
    cy.logToTerminal(`🔐 Login as admin: ${admin.email}`);
    actions.login(admin, urls);

    // Navigate to hierarchy page
    cy.logToTerminal("📄 Navigating to company hierarchy page...");
    cy.visit("/account/hierarchy");
    cy.wait(5000);

    // Check 1: Page loaded
    cy.logToTerminal("✅ Checking page loaded...");
    cy.url().should("include", "/account/hierarchy");

    // Check 2: Block container exists
    cy.logToTerminal("✅ Checking hierarchy container...");
    cy.get('.commerce-b2b-company-hierarchy', { timeout: 15000 })
      .should('exist');

    cy.logToTerminal("✅ Test completed successfully");
  });

  // Test 3: Unauthenticated user redirected to login
  it("Unauthenticated user redirected to login", { tags: ["@B2BSaas"] }, () => {
    cy.logToTerminal("========= 🔒 Test: Unauthenticated access =========");

    // Attempt access without login
    cy.logToTerminal("🔗 Attempting to access hierarchy without authentication...");
    cy.visit("/account/hierarchy");
    cy.wait(3000);

    // Should redirect to login
    cy.logToTerminal("✅ Checking redirect to login...");
    cy.url().should("include", "/customer/login");

    cy.logToTerminal("✅ Test completed successfully");
  });
});
