/**
 * TEMPORARY TEST FILE - For local backend testing only
 * Delete this file after testing
 */

import { createCompanyViaGraphQL } from '../../support/b2bCompanyManagementAPICalls';
import { baseCompanyData } from '../../fixtures/companyManagementData';

describe('🏠 LOCAL Backend Test', () => {
  let companyId;
  let adminEmail;

  before(() => {
    // Mock TokenManager with your local integration token
    cy.mockTokenManagerForLocal('7h5dmcddkjf0uiaawwapc2oot8jqjj2c');
    
    cy.logToTerminal('✅ Testing against http://mage2.local/');
    
    // Create test company
    cy.wrap(null).then(async () => {
      try {
        const company = await createCompanyViaGraphQL(baseCompanyData);
        companyId = company.id;
        adminEmail = company.company_admin.email;
        cy.logToTerminal(`✅ Created company: ${companyId}`);
        cy.logToTerminal(`   Admin email: ${adminEmail}`);
      } catch (error) {
        cy.logToTerminal(`❌ Failed to create company: ${error.message}`);
        throw error;
      }
    });
  });

  after(() => {
    cy.restoreTokenManager();
    
    cy.logToTerminal('⚠️ MANUAL CLEANUP REQUIRED:');
    cy.logToTerminal(`   Company ID: ${companyId}`);
    cy.logToTerminal(`   Company Name: ${baseCompanyData.companyName}`);
    cy.logToTerminal(`   Admin Email: ${adminEmail}`);
    cy.logToTerminal('   Magento B2B does not provide API to delete companies.');
    cy.logToTerminal('   Please delete manually via Admin Panel:');
    cy.logToTerminal('   Admin > Customers > Companies > Select and Delete');
  });

  it('Should create a company via GraphQL using local token', () => {
    expect(companyId).to.exist;
    cy.logToTerminal('🎉 Success! Local Magento integration works!');
    cy.logToTerminal(`   Company ID: ${companyId}`);
    cy.logToTerminal('   You can now use cy.mockTokenManagerForLocal() in your tests');
  });
});
