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

describe('USF-2528: Company Registration', { tags: ['@B2BSaas'] }, () => {
  before(() => {
    cy.logToTerminal('🚀 Company Registration test suite started');
  });

  beforeEach(() => {
    cy.logToTerminal('🧹 Company Registration test cleanup');
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.intercept('**/graphql').as('defaultGraphQL');
  });

  afterEach(() => {
    cy.logToTerminal('🗑️ Cleaning up test data');
    cy.then(async () => {
      try {
        await cleanupTestCompany();
        cy.logToTerminal('✅ Test data cleanup completed');
      } catch (error) {
        cy.logToTerminal(`⚠️ Cleanup failed: ${error.message}`);
      }
    });
  });

  it('USF-2789: Verify company registration via navigation menu', () => {
    cy.logToTerminal('========= 📝 Test 1: Company registration via navigation menu =========');

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('✅ Assert homepage loaded');
    assertHomePageLoaded();
    assertAccountSectionAccessible();

    cy.logToTerminal('🔗 Navigate to company registration via menu');
    navigateToCompanyRegistration();

    testCompanyRegistrationFlow(companyRegistrationData);
    cy.logToTerminal('✅ Test 1: Company registration via navigation menu completed');
  });

  it('USF-2789: Verify company registration via direct URL', () => {
    cy.logToTerminal('========= 📝 Test 2: Company registration via direct URL =========');

    cy.logToTerminal('📍 Navigate directly to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    testCompanyRegistrationFlow(companyRegistrationData);
    cy.logToTerminal('✅ Test 2: Company registration via direct URL completed');
  });

  it('USF-2789: Verify company registration for authenticated non-company user', () => {
    cy.logToTerminal('========= 📝 Test 3: Registration for authenticated non-company user =========');

    cy.logToTerminal('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.logToTerminal('✅ Verify page loaded without errors');
    cy.get('body').should('not.contain', 'Page Not Found');
    cy.get('body').should('not.contain', '404');

    cy.logToTerminal('✅ Verify registration form is accessible');
    cy.url().should('include', COMPANY_CREATE_PATH);
    assertCompanyRegistrationForm();
    cy.logToTerminal('✅ Test 3: Authenticated non-company user can access registration');
  });

  it('USF-2790: Verify redirect to login from navigation menu for unauthenticated users when configuration disabled', () => {
    cy.logToTerminal('========= 🔒 Test 4: Redirect to login (nav menu, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('✅ Verify redirect to login');
    testCompanyRegistrationRedirect('login');
    cy.logToTerminal('✅ Test 4: Redirect to login verified');
  });

  it('USF-2790: Verify redirect to login from direct url for unauthenticated users when configuration disabled', () => {
    cy.logToTerminal('========= 🔒 Test 5: Redirect to login (direct URL, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration');
    mockDisabledConfiguration();

    cy.logToTerminal('📍 Navigate directly to company registration');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('✅ Verify redirect to login');
    cy.url().should('include', '/customer/login');
    cy.logToTerminal('✅ Test 5: Redirect to login verified');
  });

  it('USF-2790: Verify redirect to account for authenticated users when configuration disabled', () => {
    cy.logToTerminal('========= 🔒 Test 6: Redirect to account (authenticated, config disabled) =========');

    cy.logToTerminal('🔧 Mock disabled configuration (allow real auth)');
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

    cy.logToTerminal('👤 Create and authenticate user');
    createAuthenticatedUser();

    cy.logToTerminal('📍 Navigate to homepage');
    cy.visit('/');

    cy.logToTerminal('🔗 Navigate to company registration');
    navigateToCompanyRegistration();

    cy.logToTerminal('✅ Verify redirect to account');
    cy.url().should('include', '/customer/account');
    cy.logToTerminal('✅ Test 6: Redirect to account verified');
  });

  // USF-3439: Tests for countries without required regions
  it('USF-3439: Verify company registration for UK with empty region', () => {
    cy.logToTerminal('========= 🇬🇧 Test 7: UK company registration with empty region =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('🇬🇧 Test UK company with empty region');
    testCompanyRegistrationFlow(companyRegistrationDataUKNoRegion);
    cy.logToTerminal('✅ Test 7: UK company with empty region registered successfully');
  });

  it('USF-3439: Verify company registration for UK with optional region name', () => {
    cy.logToTerminal('========= 🇬🇧 Test 8: UK company registration with optional region =========');

    cy.logToTerminal('📍 Navigate to company registration page');
    cy.visit(COMPANY_CREATE_PATH);

    cy.logToTerminal('🇬🇧 Test UK company with optional region');
    testCompanyRegistrationFlow(companyRegistrationDataUKWithRegion);
    cy.logToTerminal('✅ Test 8: UK company with optional region registered successfully');
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
  cy.logToTerminal('✅ Verify page URL and title');
  cy.url().should('include', COMPANY_CREATE_PATH);
  cy.title().should('not.be.empty');

  cy.logToTerminal('✅ Verify page loaded without errors');
  cy.get('body').should('not.contain', 'Page Not Found');
  cy.get('body').should('not.contain', '404');

  cy.logToTerminal('✅ Verify form containers exist');
  cy.get('.commerce-company-create-container', { timeout: 8000 }).should('exist');
  cy.get('.company-registration-container', { timeout: 8000 }).should('exist');
  cy.get('.company-form', { timeout: 8000 }).should('exist');

  cy.logToTerminal('📝 Verify form fields are present');
  assertCompanyRegistrationForm();

  cy.logToTerminal(`📝 Fill company registration form: ${testData.company.companyName}`);
  fillCompanyRegistrationForm(testData);

  cy.logToTerminal('🚀 Submit registration form');
  submitCompanyRegistrationForm();

  cy.logToTerminal('✅ Verify successful registration on UI');
  assertCompanyRegistrationSuccess(testData);

  cy.logToTerminal('🔍 Verify company in backend via REST API');
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
    cy.logToTerminal(`🔍 Verifying company in backend: ${companyEmail}`);
    
    const result = await verifyCompanyCreated(companyEmail, {
      companyName: testData.company.companyName,
    });

    if (result.success) {
      cy.logToTerminal(`✅ Backend verified: ID=${result.company.id}, Status=${result.company.status}`);
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
  cy.logToTerminal('📍 Navigate to company registration page');
  cy.visit(COMPANY_CREATE_PATH);

  cy.url({ timeout: 3000 });

  cy.logToTerminal(`✅ Verify redirect to: ${expectedDestination}`);
  switch (expectedDestination) {
    case 'form':
      cy.logToTerminal('📝 Expecting registration form');
      cy.url().should('include', COMPANY_CREATE_PATH);
      cy.get('.company-registration-container', { timeout: 5000 }).should('exist');
      cy.get('.company-form', { timeout: 5000 }).should('exist');
      break;

    case 'login':
      cy.logToTerminal('🔐 Expecting login page');
      cy.url().should('include', '/customer/login');
      break;

    case 'account':
      cy.logToTerminal('👤 Expecting account page');
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
  cy.logToTerminal('📍 Navigate to customer create page');
  cy.visit('/customer/create');
  cy.fixture('userInfo').then(({ sign_up }) => {
    cy.logToTerminal('📝 Fill sign up form');
    signUpUser(sign_up);
    cy.logToTerminal('✅ Verify successful authentication');
    cy.url().should('include', '/customer/account');
  });
};

/**
 * Mock disabled company registration configuration.
 * Sets up intercepts to return allow_company_registration: false.
 */
const mockDisabledConfiguration = () => {
  cy.logToTerminal('🔧 Setting up mocks for disabled company registration');

  cy.logToTerminal('📡 Mock POST GraphQL requests');
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

  cy.logToTerminal('📡 Mock GET GraphQL requests');
  cy.intercept('GET', '**/graphql*', {
    statusCode: 200,
    body: {
      data: {},
    },
  }).as('graphqlGetMocks');
};
