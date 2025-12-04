/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * @fileoverview Company Registration E2E tests.
 * Tests cover:
 * - USF-2528: Company Registration feature
 * - USF-2789: Registration via navigation menu and direct URL
 * - USF-2790: Redirect behavior when registration is disabled
 * - USF-3439: Region handling for countries without required regions (UK)
 */

import {
  assertCompanyRegistrationForm,
  assertCompanyRegistrationSuccess,
  assertHomePageLoaded,
  assertAccountSectionAccessible,
} from '../../assertions';
import { COMPANY_CREATE_PATH } from '../../fields';
import {
  fillCompanyRegistrationForm,
  submitCompanyRegistrationForm,
  navigateToCompanyRegistration,
  signUpUser,
} from '../../actions';
import {
  companyRegistrationData,
  companyRegistrationDataUKNoRegion,
  companyRegistrationDataUKWithRegion,
} from '../../fixtures/companyData';
import {
  verifyCompanyCreated,
  cleanupTestCompany,
} from '../../support/companyApiHelper';

describe('USF-2528: Company Registration', () => {
  before(() => {
    cy.log('🚀 Company Registration test suite started');
    // Debug: Log environment variables
    cy.log(`📋 API_ENDPOINT: ${Cypress.env('API_ENDPOINT') || 'NOT SET'}`);
    cy.log(`📋 IMS_CLIENT_ID: ${Cypress.env('IMS_CLIENT_ID') ? 'SET' : 'NOT SET'}`);
    cy.log(`📋 IMS_CLIENT_SECRET: ${Cypress.env('IMS_CLIENT_SECRET') ? 'SET' : 'NOT SET'}`);
    cy.log(`📋 IMS_ORG_ID: ${Cypress.env('IMS_ORG_ID') ? 'SET' : 'NOT SET'}`);
  });

  beforeEach(() => {
    cy.log('🧹 Clearing cookies and local storage');
    cy.clearCookies();
    cy.clearLocalStorage();

    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  afterEach(() => {
    cy.log('🗑️ Cleaning up test data');
    cy.then(async () => {
      try {
        await cleanupTestCompany();
      } catch (error) {
        cy.log(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  it('USF-2789: Verify company registration via navigation menu', () => {
    cy.log('📍 Navigate to homepage');
    cy.visit('/');

    cy.log('✅ Assert homepage loaded');
    assertHomePageLoaded();
    assertAccountSectionAccessible();

    cy.log('🔗 Navigate to company registration via menu');
    navigateToCompanyRegistration();

    testCompanyRegistrationFlow(companyRegistrationData);
  });

  it('USF-2789: Verify company registration via direct URL', () => {
    cy.log('📍 Navigate directly to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    testCompanyRegistrationFlow(companyRegistrationData);
  });

  it('USF-2789: Verify company registration for authenticated non-company user', () => {
    cy.log('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.log('📍 Navigate to homepage');
    cy.visit('/');

    cy.log('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.log('✅ Verify page loaded without errors');
    cy.get('body').should('not.contain', 'Page Not Found');
    cy.get('body').should('not.contain', '404');

    cy.log('✅ Verify registration form is accessible');
    cy.url().should('include', COMPANY_CREATE_PATH);
    assertCompanyRegistrationForm();
  });

  it('USF-2790: Verify redirect to login from navigation menu for unauthenticated users when configuration disabled', () => {
    cy.log('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.log('📍 Navigate to homepage');
    cy.visit('/');

    cy.log('✅ Verify redirect to login');
    testCompanyRegistrationRedirect('login');
  });

  it('USF-2790: Verify redirect to login from direct url for unauthenticated users when configuration disabled', () => {
    cy.log('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.log('📍 Navigate directly to company registration');
    cy.visit(COMPANY_CREATE_PATH);

    cy.log('✅ Verify redirect to login');
    cy.url().should('include', '/customer/login');
  });

  it('USF-2790: Verify redirect to account for authenticated users when configuration disabled', () => {
    cy.log('🔧 Mock disabled configuration (allow real auth)');
    cy.intercept('POST', '**/graphql', (req) => {
      if (req.body.query && req.body.query.includes('allow_company_registration')) {
        req.reply({
          statusCode: 200,
          body: {
            data: {
              storeConfig: {
                allow_company_registration: false,
              },
            },
          },
        });
      } else {
        req.continue();
      }
    }).as('configDisabledWithRealAuth');

    cy.log('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.log('📍 Navigate to homepage');
    cy.visit('/');

    cy.log('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.log('✅ Verify redirect to account');
    cy.url().should('include', '/customer/account');
  });

  // USF-3439: Tests for countries without required regions
  it('USF-3439: Verify company registration for UK with empty region', () => {
    cy.log('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.log('🇬🇧 Test UK company with empty region');
    testCompanyRegistrationFlow(companyRegistrationDataUKNoRegion);
  });

  it('USF-3439: Verify company registration for UK with optional region name', () => {
    cy.log('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.log('🇬🇧 Test UK company with optional region');
    testCompanyRegistrationFlow(companyRegistrationDataUKWithRegion);
  });
});

/**
 * Execute the company registration flow.
 * Verifies page state, fills form, submits, and validates success.
 * @param {Object} testData - Company registration test data
 * @param {Object} testData.company - Company information
 * @param {Object} testData.legalAddress - Legal address information
 * @param {Object} testData.companyAdmin - Admin information
 */
const testCompanyRegistrationFlow = (testData) => {
  cy.log('✅ Verify page URL and title');
  cy.url().should('include', COMPANY_CREATE_PATH);
  cy.title().should('not.be.empty');

  cy.log('✅ Verify page loaded without errors');
  cy.get('body').should('not.contain', 'Page Not Found');
  cy.get('body').should('not.contain', '404');

  cy.log('✅ Verify form containers exist');
  cy.get('.commerce-company-create-container', { timeout: 8000 }).should('exist');
  cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
  cy.get('.company-form', { timeout: 8000 }).should('exist');

  cy.log('📝 Verify form fields are present');
  assertCompanyRegistrationForm();

  cy.log(`📝 Fill company registration form: ${testData.company.companyName}`);
  fillCompanyRegistrationForm(testData);

  cy.log('🚀 Submit registration form');
  submitCompanyRegistrationForm();

  cy.log('✅ Verify successful registration on UI');
  assertCompanyRegistrationSuccess(testData);

  cy.log('🔍 Verify company in backend via REST API');
  verifyCompanyInBackend(testData);
};

/**
 * Verify company was created in backend via REST API.
 * Uses the company email stored in Cypress environment.
 * This function will FAIL the test if backend verification fails.
 * @param {Object} testData - Company registration test data
 * @param {Object} testData.company - Company information
 * @param {string} testData.company.companyName - Expected company name
 */
const verifyCompanyInBackend = (testData) => {
  const companyEmail = Cypress.env('currentTestCompanyEmail');
  
  if (!companyEmail) {
    throw new Error('No company email found - cannot verify backend. Test data may not have been set correctly.');
  }

  cy.then(async () => {
    cy.log(`🔍 Verifying company in backend: ${companyEmail}`);
    
    const result = await verifyCompanyCreated(companyEmail, {
      companyName: testData.company.companyName,
    });

    if (result.success) {
      cy.log(`✅ Backend verified: ID=${result.company.id}, Status=${result.company.status}`);
    } else {
      // Fail the test - backend verification is required
      throw new Error(`Backend verification failed: ${result.error}`);
    }
  });
};

/**
 * Test redirect behavior based on configuration and authentication state.
 * @param {string} expectedDestination - Expected redirect destination ('form', 'login', 'account')
 * @throws {Error} If unknown destination is provided
 */
const testCompanyRegistrationRedirect = (expectedDestination) => {
  cy.log('📍 Navigate to company registration page');
  cy.visit(COMPANY_CREATE_PATH);

  cy.url({ timeout: 3000 });

  cy.log(`✅ Verify redirect to: ${expectedDestination}`);
  switch (expectedDestination) {
    case 'form':
      cy.log('📝 Expecting registration form');
      cy.url().should('include', COMPANY_CREATE_PATH);
      cy.get('.company-registration-container', { timeout: 5000 }).should('exist');
      cy.get('.company-form', { timeout: 5000 }).should('exist');
      break;

    case 'login':
      cy.log('🔐 Expecting login page');
      cy.url().should('include', '/customer/login');
      break;

    case 'account':
      cy.log('👤 Expecting account page');
      cy.url().should('include', '/customer/account');
      break;

    default:
      throw new Error(`Unknown expected destination: ${expectedDestination}`);
  }
};

/**
 * Create and authenticate a customer for testing.
 * Navigates to customer create page, fills form, and verifies authentication.
 */
const createAuthenticatedUser = () => {
  cy.log('📍 Navigate to customer create page');
  cy.visit('/customer/create');
  cy.fixture('userInfo').then(({ sign_up }) => {
    cy.log('📝 Fill sign up form');
    signUpUser(sign_up);
    cy.log('✅ Verify successful authentication');
    cy.url().should('include', '/customer/account');
  });
};

/**
 * Mock disabled company registration configuration.
 * Sets up intercepts to return allow_company_registration: false.
 */
const mockDisabledConfiguration = () => {
  cy.log('🔧 Setting up mocks for disabled company registration');

  cy.log('📡 Mock POST GraphQL requests');
  cy.intercept('POST', '**/graphql', (req) => {
    if (req.body.query && req.body.query.includes('allow_company_registration')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              allow_company_registration: false,
            },
          },
        },
      });
    } else if (req.body.query && req.body.query.includes('storeConfig')) {
      req.reply({
        statusCode: 200,
        body: {
          data: {
            storeConfig: {
              store_code: 'default',
            },
          },
        },
      });
    } else {
      req.reply({
        statusCode: 200,
        body: {
          data: {},
        },
      });
    }
  }).as('disabledConfigMock');

  cy.log('📡 Mock GET GraphQL requests');
  cy.intercept('GET', '**/graphql*', {
    statusCode: 200,
    body: {
      data: {},
    },
  }).as('graphqlGetMocks');
};
