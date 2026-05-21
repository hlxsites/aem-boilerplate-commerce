import {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  deleteCompanyRoles,
} from '../../support/b2bPOAPICalls';
import * as actions from '../../actions';

describe.skip('B2B Company Hierarchy', { tags: ['@B2BSaas'] }, () => {
  const urls = Cypress.env('poUrls');
  const COMPANY_ID = 13;

  const hierarchyAdmin = {
    firstname: 'Hierarchy',
    lastname: 'Admin',
    email: `hierarchy_admin_${Date.now()}@example.com`,
    password: 'Test123!',
    companyId: COMPANY_ID,
  };

  const hierarchyAdminRole = {
    role_name: `Hierarchy Admin ${Date.now()}`,
    company_id: COMPANY_ID,
    permissions: [
      { resource_id: 'Magento_Company::index', permission: 'allow' },
      { resource_id: 'Magento_Company::view', permission: 'allow' },
      { resource_id: 'Magento_Company::view_account', permission: 'allow' },
    ],
  };

  before(() => {
    cy.logToTerminal('🏢 B2B Company Hierarchy test suite started');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Cleanup before test');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  after(() => {
    cy.logToTerminal('🗑️ Cleaning up test data');
    const roleId = Cypress.env('hierarchyRoleId');
    if (roleId) {
      cy.wrap(null).then(() => {
        return deleteCompanyRoles([roleId]);
      });
    }
  });

  it('Setup - Create admin user', { tags: ['@B2BSaas'] }, () => {
    cy.logToTerminal('⚙️ Creating hierarchy admin user');

    cy.wrap(null)
      .then(() => {
        return manageCompanyRole(hierarchyAdminRole);
      })
      .then((result) => {
        const roleId = result?.role?.id;
        Cypress.env('hierarchyRoleId', roleId);
        cy.logToTerminal(`✅ Role created: ID ${roleId}`);
        cy.wait(3000);
        return createUserAssignCompanyAndRole(hierarchyAdmin, roleId);
      })
      .then(() => {
        Cypress.env('hierarchyAdmin', hierarchyAdmin);
        cy.logToTerminal(`✅ User created: ${hierarchyAdmin.email}`);
        cy.wait(5000);
      });
  });

  it('Admin can view hierarchy page', { tags: ['@B2BSaas'] }, () => {
    cy.logToTerminal('📄 Testing hierarchy page access');

    const admin = Cypress.env('hierarchyAdmin') || hierarchyAdmin;
    actions.login(admin, urls);

    cy.visit('/account/hierarchy');
    cy.wait(5000);

    cy.url().should('include', '/account/hierarchy');
    cy.get('.commerce-b2b-company-hierarchy', { timeout: 15000 }).should('exist');

    cy.logToTerminal('✅ Test completed');
  });

  it('Unauthenticated redirect', { tags: ['@B2BSaas'] }, () => {
    cy.visit('/account/hierarchy');
    cy.wait(3000);
    cy.url().should('include', '/customer/login');
  });
});
