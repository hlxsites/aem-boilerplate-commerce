/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

/**
 * @fileoverview Company Management API helper for B2B E2E tests.
 * Provides functions to create, update, verify, and delete companies,
 * users, roles, teams, and credit via REST API.
 *
 * Used by Cypress tests for:
 * - Company registration verification and cleanup
 * - Company profile management
 * - User management and assignment
 * - Role and permission management
 * - Team/structure management
 * - Company credit operations
 */

const ACCSApiClient = require('./accsClient');

// ==========================================================================
// Logging Utilities
// ==========================================================================

/**
 * Safe logging function that handles missing TTY.
 * @param {...*} args - Arguments to log
 */
function safeLog(...args) {
  try {
    if (typeof console !== 'undefined' && console.log
      && typeof process !== 'undefined' && process && process.stdout) {
      console.log(...args);
    }
  } catch (error) {
    // Silently ignore logging errors
  }
}

/**
 * Safe error logging function that handles missing TTY.
 * @param {...*} args - Arguments to log as error
 */
function safeError(...args) {
  try {
    if (typeof console !== 'undefined' && console.error
      && typeof process !== 'undefined' && process && process.stderr) {
      console.error(...args);
    }
  } catch (error) {
    // Silently ignore logging errors
  }
}

/**
 * Validate API response and throw if it indicates an error.
 * ACCSApiClient returns error:true for 5xx errors, but 4xx errors
 * may return with message field or without expected data.
 * @param {Object} response - API response object
 * @param {string} operation - Description of the operation for error message
 * @param {string} [expectedField] - Optional field that should exist in success response
 * @throws {Error} If response indicates an error
 */
function validateApiResponse(response, operation, expectedField = null) {
  // Check for explicit error flag
  if (response.error) {
    throw new Error(`${operation} failed: ${response.message || JSON.stringify(response)}`);
  }

  // Check for error message without error flag (4xx responses)
  if (response.message && !response.id && !response.items) {
    throw new Error(`${operation} failed: ${response.message}`);
  }

  // Check for expected field if specified
  if (expectedField && !response[expectedField]) {
    throw new Error(`${operation} failed: Invalid response - missing ${expectedField}`);
  }
}

// ==========================================================================
// Company Creation
// ==========================================================================

/**
 * Create a company via REST API with active status.
 * Creates a fully active company with admin that can log in immediately.
 * @param {Object} companyData - Company data object
 * @returns {Promise<Object>} Created company data with admin info
 */
async function createCompany(companyData) {
  const {
    companyName,
    companyEmail,
    legalName = companyName,
    vatTaxId = '',
    resellerId = '',
    street,
    city,
    countryCode,
    regionId,
    postcode,
    telephone,
    adminFirstName,
    adminLastName,
    adminEmail,
    adminPassword = 'Test123!',
    status = 1, // 1 = Active, 0 = Pending
  } = companyData;

  const client = new ACCSApiClient();

  // Step 1: Create the company admin customer first
  safeLog('👤 Creating company admin customer:', adminEmail);

  const customerPayload = {
    customer: {
      email: adminEmail,
      firstname: adminFirstName,
      lastname: adminLastName,
      website_id: 1,
      store_id: 1,
      group_id: 1,
    },
    password: adminPassword,
  };

  const customerData = await client.post('/V1/customers', customerPayload);
  validateApiResponse(customerData, 'Customer creation', 'id');

  const customerId = customerData.id;
  safeLog('✅ Customer created with ID:', customerId);

  // Step 2: Create the company with the customer as super_user_id
  safeLog('🏢 Creating company:', companyName);

  const companyPayload = {
    company: {
      company_name: companyName,
      company_email: companyEmail,
      legal_name: legalName,
      vat_tax_id: vatTaxId,
      reseller_id: resellerId,
      street: [street],
      city,
      country_id: countryCode,
      region_id: regionId,
      postcode,
      telephone,
      super_user_id: customerId,
      customer_group_id: 1,
      status,
    },
  };

  const company = await client.post('/V1/company/', companyPayload);
  validateApiResponse(company, 'Company creation', 'id');

  safeLog('✅ Company created with ID:', company.id);

  return {
    id: company.id,
    name: company.company_name,
    email: company.company_email,
    legal_name: company.legal_name,
    status: company.status,
    company_admin: {
      id: customerId,
      email: adminEmail,
      firstname: adminFirstName,
      lastname: adminLastName,
      password: adminPassword,
    },
  };
}

// ==========================================================================
// Company Search & Verification
// ==========================================================================

/**
 * Find a company by email using REST API.
 * @param {string} companyEmail - The company email to search for
 * @returns {Promise<Object|null>} The company object if found, null otherwise
 */
async function findCompanyByEmail(companyEmail) {
  const client = new ACCSApiClient();

  safeLog(`🔍 Searching for company with email: ${companyEmail}`);

  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'company_email',
    'searchCriteria[filterGroups][0][filters][0][value]': companyEmail,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  const response = await client.get('/V1/company', queryParams);

  // Check for API error response
  if (response.error || response.message) {
    safeError('❌ Company search API failed:', response.message || response);
    throw new Error(`Company search failed: ${response.message || JSON.stringify(response)}`);
  }

  if (response.items && response.items.length > 0) {
    safeLog(`✅ Found company: ${response.items[0].company_name} (ID: ${response.items[0].id})`);
    return response.items[0];
  }

  safeLog('ℹ️ Company not found');
  return null;
}

/**
 * Find companies by name using REST API (partial match).
 * @param {string} companyName - The company name to search for
 * @returns {Promise<Array<Object>>} Array of matching companies
 */
async function findCompanyByName(companyName) {
  const client = new ACCSApiClient();

  safeLog(`🔍 Searching for company with name: ${companyName}`);

  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'company_name',
    'searchCriteria[filterGroups][0][filters][0][value]': `%${companyName}%`,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'like',
  };

  const response = await client.get('/V1/company', queryParams);

  // Check for API error response
  if (response.error || response.message) {
    safeError('❌ Company search API failed:', response.message || response);
    throw new Error(`Company search failed: ${response.message || JSON.stringify(response)}`);
  }

  if (response.items && response.items.length > 0) {
    safeLog(`✅ Found ${response.items.length} company(ies)`);
    return response.items;
  }

  safeLog('ℹ️ No companies found');
  return [];
}

/**
 * Verify a company was created with expected data.
 * @param {string} companyEmail - The company email to verify
 * @param {Object} [expectedData={}] - Expected data to validate
 * @returns {Promise<Object>} Verification result with success flag
 */
async function verifyCompanyCreated(companyEmail, expectedData = {}) {
  safeLog(`🔍 Verifying company creation: ${companyEmail}`);

  const company = await findCompanyByEmail(companyEmail);

  if (!company) {
    safeLog('❌ Verification failed: Company not found');
    return {
      success: false,
      error: `Company with email ${companyEmail} not found in backend`,
    };
  }

  const result = {
    success: true,
    company: {
      id: company.id,
      name: company.company_name,
      email: company.company_email,
      status: company.status,
      legalName: company.legal_name,
      vatTaxId: company.vat_tax_id,
      resellerId: company.reseller_id,
    },
  };

  if (expectedData.companyName && company.company_name !== expectedData.companyName) {
    result.success = false;
    result.error = `Company name mismatch: expected "${expectedData.companyName}", got "${company.company_name}"`;
    safeLog(`❌ Verification failed: ${result.error}`);
    return result;
  }

  safeLog(`✅ Company verified: ID=${result.company.id}, Status=${result.company.status}`);
  return result;
}

// ==========================================================================
// Company Profile Management
// ==========================================================================

/**
 * Update company profile via REST API.
 * Uses PUT /V1/company/:companyId as documented in Adobe REST API reference.
 * The company ID must be included in the payload as well.
 *
 * @param {number} companyId - Company ID
 * @param {Object} updates - Fields to update (company_name, legal_name, etc.)
 * @returns {Promise<Object>} Updated company data
 */
async function updateCompanyProfile(companyId, updates) {
  const client = new ACCSApiClient();

  safeLog('📝 Updating company:', companyId, updates);

  // Include id in the company payload as required by the API
  const payload = {
    company: {
      id: companyId,
      ...updates,
    },
  };

  // PUT /V1/company/:companyId per Adobe REST API documentation
  const result = await client.put(`/V1/company/${companyId}`, payload);
  validateApiResponse(result, 'Company profile update', 'id');

  safeLog('✅ Company updated');
  return result;
}

// ==========================================================================
// Company Deletion
// ==========================================================================

/**
 * Delete a company by ID using REST API.
 * @param {number} companyId - The company ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyById(companyId) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🗑️ Deleting company with ID: ${companyId}`);
    await client.delete(`/V1/company/${companyId}`);
    safeLog(`✅ Company ${companyId} deleted successfully`);
    return { success: true };
  } catch (error) {
    safeError('❌ Company deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a company by email using REST API.
 * @param {string} companyEmail - The company email to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyByEmail(companyEmail) {
  safeLog(`🗑️ Deleting company by email: ${companyEmail}`);

  try {
    const company = await findCompanyByEmail(companyEmail);

    if (!company) {
      safeLog(`⚠️ Company with email ${companyEmail} not found, nothing to delete`);
      return { success: true, message: 'Company not found' };
    }

    return deleteCompanyById(company.id);
  } catch (error) {
    safeError('❌ Company deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

// ==========================================================================
// User Management
// ==========================================================================

/**
 * Create a customer via REST API and assign to company.
 * Uses PUT /V1/customers/:customerId with extension_attributes.company_attributes
 * to assign the customer to a company.
 *
 * @param {Object} userData - User data
 * @param {number} companyId - Company ID to assign to
 * @returns {Promise<Object>} Created user data
 */
async function createCompanyUser(userData, companyId) {
  const {
    firstname,
    lastname,
    email,
    password = 'Test123!',
    jobTitle = 'Team Member',
    telephone = '555-1234',
  } = userData;

  const client = new ACCSApiClient();

  // Step 1: Create the customer
  safeLog('👤 Creating user:', email);

  const customerPayload = {
    customer: {
      email,
      firstname,
      lastname,
      website_id: 1,
      store_id: 1,
      group_id: 1,
    },
    password,
  };

  const customerData = await client.post('/V1/customers', customerPayload);
  validateApiResponse(customerData, 'Customer creation', 'id');

  const customerId = customerData.id;
  safeLog('✅ Customer created with ID:', customerId);

  // Step 2: Assign customer to company using PUT /V1/customers/:customerId
  // with extension_attributes.company_attributes
  safeLog('🔗 Assigning user to company:', companyId);

  const updatePayload = {
    customer: {
      id: customerId,
      email,
      firstname,
      lastname,
      website_id: 1,
      extension_attributes: {
        company_attributes: {
          company_id: companyId,
          status: 1, // Active
          job_title: jobTitle,
          telephone,
        },
      },
    },
  };

  const assignResult = await client.put(`/V1/customers/${customerId}`, updatePayload);
  validateApiResponse(assignResult, 'Company assignment', 'id');

  safeLog('✅ User assigned to company');

  return {
    id: customerId,
    email,
    firstname,
    lastname,
    password,
    companyId,
  };
}

/**
 * Find a customer by email using REST API.
 * @param {string} customerEmail - The customer email to search for
 * @returns {Promise<Object|null>} The customer object if found, null otherwise
 */
async function findCustomerByEmail(customerEmail) {
  const client = new ACCSApiClient();

  safeLog(`🔍 Searching for customer with email: ${customerEmail}`);

  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'email',
    'searchCriteria[filterGroups][0][filters][0][value]': customerEmail,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  const response = await client.get('/V1/customers/search', queryParams);

  // Check for API error response
  if (response.error || response.message) {
    safeError('❌ Customer search API failed:', response.message || response);
    throw new Error(`Customer search failed: ${response.message || JSON.stringify(response)}`);
  }

  if (response.items && response.items.length > 0) {
    safeLog(`✅ Found customer: ${response.items[0].firstname} ${response.items[0].lastname} (ID: ${response.items[0].id})`);
    return response.items[0];
  }

  safeLog('ℹ️ Customer not found');
  return null;
}

/**
 * Delete a customer by ID using REST API.
 * @param {number} customerId - The customer ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCustomerById(customerId) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🗑️ Deleting customer with ID: ${customerId}`);
    await client.delete(`/V1/customers/${customerId}`);
    safeLog(`✅ Customer ${customerId} deleted successfully`);
    return { success: true };
  } catch (error) {
    safeError('❌ Customer deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a customer by email using REST API.
 * @param {string} customerEmail - The customer email to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCustomerByEmail(customerEmail) {
  safeLog(`🗑️ Deleting customer by email: ${customerEmail}`);

  try {
    const customer = await findCustomerByEmail(customerEmail);

    if (!customer) {
      safeLog(`⚠️ Customer with email ${customerEmail} not found, nothing to delete`);
      return { success: true, message: 'Customer not found' };
    }

    return deleteCustomerById(customer.id);
  } catch (error) {
    safeError('❌ Customer deletion failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Update company user status (active/inactive).
 * @param {number} customerId - Customer ID
 * @param {number} status - Status (0=inactive, 1=active)
 * @returns {Promise<Object>} Update result
 */
async function updateCompanyUserStatus(customerId, status) {
  const client = new ACCSApiClient();

  safeLog(`🔄 Setting user ${customerId} status to:`, status === 0 ? 'Inactive' : 'Active');

  const result = await client.put(`/V1/customers/${customerId}`, {
    customer: {
      id: customerId,
      extension_attributes: {
        company_attributes: {
          status,
        },
      },
    },
  });

  validateApiResponse(result, 'User status update', 'id');

  safeLog('✅ User status updated');
  return result;
}

/**
 * Assign a role to a company user.
 * Uses PUT /V1/company/assignRoles per Adobe SaaS REST API documentation.
 * @see https://developer.adobe.com/commerce/webapi/reference/rest/saas/
 * @param {number} userId - Customer/User ID
 * @param {Object} role - Role object with at least id and permissions
 * @returns {Promise<boolean>} true on success
 */
async function assignRoleToUser(userId, role) {
  const client = new ACCSApiClient();

  // Build minimal role object with required fields
  const rolePayload = {
    id: role.id,
    permissions: role.permissions || [],
  };

  safeLog(`🎭 Assigning role ${role.id} to user ${userId}`);
  safeLog('📦 Role payload:', JSON.stringify(rolePayload));

  const result = await client.put('/V1/company/assignRoles', {
    userId,
    roles: [rolePayload],
  });

  // This endpoint returns boolean true on success
  // Check for error conditions
  if (result.error || result.message) {
    safeError('❌ Role assignment failed:', result);
    throw new Error(`Role assignment failed: ${result.message || JSON.stringify(result)}`);
  }

  if (result !== true) {
    safeError('❌ Role assignment returned unexpected result:', result);
    throw new Error(`Role assignment failed: unexpected response ${JSON.stringify(result)}`);
  }

  safeLog('✅ Role assigned to user');
  return result;
}

// ==========================================================================
// Role Management
// ==========================================================================

/**
 * Create a custom company role.
 * @param {Object} roleData - Role data with permissions
 * @returns {Promise<Object>} Created role
 */
async function createCompanyRole(roleData) {
  const client = new ACCSApiClient();

  safeLog('🎭 Creating role:', roleData.role_name);

  const result = await client.post('/V1/company/role', { role: roleData });
  validateApiResponse(result, 'Role creation', 'id');

  safeLog('✅ Role created:', result);
  return result;
}

/**
 * Delete a company role.
 * @param {number} roleId - Role ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyRole(roleId) {
  const client = new ACCSApiClient();

  safeLog('🗑️ Deleting role:', roleId);

  const result = await client.delete(`/V1/company/role/${roleId}`);
  // DELETE returns true on success
  if (result.error || (result.message && result !== true)) {
    safeError('❌ Role deletion failed:', result);
    throw new Error(`Role deletion failed: ${result.message || JSON.stringify(result)}`);
  }

  safeLog('✅ Role deleted');
  return { success: true, roleId };
}

// ==========================================================================
// Team Management
// ==========================================================================

/**
 * Create a team in company structure.
 * @param {number} companyId - Company ID
 * @param {Object} teamData - Team data (name, description, etc.)
 * @returns {Promise<Object>} Created team
 */
async function createCompanyTeam(companyId, teamData) {
  const client = new ACCSApiClient();

  safeLog('👥 Creating team:', teamData.name, 'for company:', companyId);

  const result = await client.post(`/V1/team/${companyId}`, { team: teamData });
  validateApiResponse(result, 'Team creation', 'id');

  safeLog('✅ Team created:', result);
  return result;
}

/**
 * Update a team in company structure.
 * @param {number} teamId - Team ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated team data
 */
async function updateCompanyTeam(teamId, updates) {
  const client = new ACCSApiClient();

  safeLog('📝 Updating team:', teamId, updates);

  const result = await client.put(`/V1/team/${teamId}`, { team: updates });
  validateApiResponse(result, 'Team update', 'id');

  safeLog('✅ Team updated');
  return result;
}

/**
 * Delete a team from company structure.
 * @param {number} teamId - Team ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyTeam(teamId) {
  const client = new ACCSApiClient();

  safeLog('🗑️ Deleting team:', teamId);

  const result = await client.delete(`/V1/team/${teamId}`);
  // DELETE returns true on success
  if (result.error || (result.message && result !== true)) {
    safeError('❌ Team deletion failed:', result);
    throw new Error(`Team deletion failed: ${result.message || JSON.stringify(result)}`);
  }

  safeLog('✅ Team deleted');
  return { success: true, teamId };
}

// ==========================================================================
// Company Credit
// ==========================================================================

/**
 * Get company credit information by company ID.
 * Uses /V1/companyCredits/company/{companyId} endpoint.
 * @param {number} companyId - Company ID
 * @returns {Promise<Object>} Company credit data
 */
async function getCompanyCredit(companyId) {
  const client = new ACCSApiClient();

  safeLog('💳 Getting company credit for company:', companyId);

  const result = await client.get(`/V1/companyCredits/company/${companyId}`);
  validateApiResponse(result, 'Get company credit', 'id');

  safeLog('✅ Company credit retrieved:', result);
  return result;
}

/**
 * Get company credit history.
 * @param {Object} searchCriteria - Optional search criteria
 * @returns {Promise<Object>} Credit history data
 */
async function getCompanyCreditHistory(searchCriteria = {}) {
  const client = new ACCSApiClient();

  safeLog('📜 Getting company credit history');

  const params = new URLSearchParams();
  // Add search criteria if provided
  if (searchCriteria.companyId) {
    params.append('searchCriteria[filterGroups][0][filters][0][field]', 'company_credit_id');
    params.append('searchCriteria[filterGroups][0][filters][0][value]', searchCriteria.companyId);
    params.append('searchCriteria[filterGroups][0][filters][0][conditionType]', 'eq');
  }

  const url = `/V1/companyCredits/history${params.toString() ? `?${params.toString()}` : ''}`;
  const result = await client.get(url);
  validateApiResponse(result, 'Get credit history');

  safeLog('✅ Credit history retrieved');
  return result;
}

/**
 * Update company credit limit.
 * Uses PUT /V1/companyCredits/{id} endpoint.
 * @param {number} creditId - Credit ID (from getCompanyCredit)
 * @param {Object} creditData - Credit data (credit_limit, currency_code, etc.)
 * @returns {Promise<Object>} Updated credit data
 */
async function updateCompanyCredit(creditId, creditData) {
  const client = new ACCSApiClient();

  safeLog('💰 Updating company credit for credit ID:', creditId, creditData);

  // Per Adobe REST API docs, payload should be { creditLimit: { id, company_id, credit_limit, currency_code } }
  const payload = {
    creditLimit: {
      id: creditId,
      ...creditData,
    },
  };

  const result = await client.put(`/V1/companyCredits/${creditId}`, payload);
  
  // Log the actual response for debugging
  safeLog('💰 Update credit API response:', result);
  
  // Validate response has id field
  validateApiResponse(result, 'Company credit update', 'id');

  safeLog('✅ Company credit updated');
  return result;
}

/**
 * Operation types for company credit transactions.
 * Used in increaseBalance and decreaseBalance endpoints.
 */
const CREDIT_OPERATION_TYPES = {
  ALLOCATED: 1,    // Credit limit allocation
  UPDATED: 2,      // General update
  PURCHASED: 3,    // Purchase using company credit
  REIMBURSED: 4,   // Reimbursement (add funds)
  REFUNDED: 5,     // Refund from credit memo
  REVERTED: 6,     // Reverted (order cancellation)
};

/**
 * Increase company credit balance (reimburse).
 * Creates a "Reimbursed" record in the credit history.
 * @param {number} creditId - Credit ID (get from getCompanyCredit)
 * @param {number} amount - Amount to add to balance
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} comment - Optional comment for the operation
 * @param {number} operationType - Operation type (default: 4 = REIMBURSED)
 * @returns {Promise<Object>} Result of the operation
 */
async function increaseCompanyCreditBalance(
  creditId,
  amount,
  currency = 'USD',
  comment = '',
  operationType = CREDIT_OPERATION_TYPES.REIMBURSED
) {
  const client = new ACCSApiClient();

  safeLog('💵 Increasing company credit balance:', creditId, amount, currency);

  const payload = {
    value: amount,
    currency,
    operationType,
    comment,
  };

  const result = await client.post(`/V1/companyCredits/${creditId}/increaseBalance`, payload);
  // increaseBalance returns true on success, not an object with id
  if (result.error || (result.message && result !== true)) {
    safeError('❌ Increase credit balance failed:', result);
    throw new Error(`Increase credit balance failed: ${result.message || JSON.stringify(result)}`);
  }

  safeLog('✅ Company credit balance increased by:', amount);
  return result;
}

/**
 * Decrease company credit balance.
 * @param {number} creditId - Credit ID (usually same as company ID)
 * @param {number} amount - Amount to subtract from balance
 * @param {string} currency - Currency code (default: 'USD')
 * @param {string} comment - Optional comment for the operation
 * @returns {Promise<Object>} Result of the operation
 */
async function decreaseCompanyCreditBalance(creditId, amount, currency = 'USD', comment = '') {
  const client = new ACCSApiClient();

  safeLog('💸 Decreasing company credit balance:', creditId, amount, currency);

  const payload = {
    value: amount,
    currency,
    operationType: 2,
    comment,
  };

  const result = await client.post(`/V1/companyCredits/${creditId}/decreaseBalance`, payload);
  // decreaseBalance returns true on success, not an object with id
  if (result.error || (result.message && result !== true)) {
    safeError('❌ Decrease credit balance failed:', result);
    throw new Error(`Decrease credit balance failed: ${result.message || JSON.stringify(result)}`);
  }

  safeLog('✅ Company credit balance decreased by:', amount);
  return result;
}

// ==========================================================================
// Test Cleanup
// ==========================================================================

/**
 * Cleanup test data: Delete company and admin created during test.
 * Uses emails stored in Cypress environment variables.
 * @returns {Promise<Object>} Cleanup results
 */
async function cleanupTestCompany() {
  safeLog('🧹 Starting test cleanup');

  const companyEmail = Cypress.env('currentTestCompanyEmail');
  const adminEmail = Cypress.env('currentTestAdminEmail');
  const regularUserEmail = Cypress.env('regularUserEmail');
  const noCreditRoleId = Cypress.env('noCreditRoleId');

  const results = {
    company: { success: true, message: 'No company to clean up' },
    admin: { success: true, message: 'No admin to clean up' },
    regularUser: { success: true, message: 'No regular user to clean up' },
    role: { success: true, message: 'No custom role to clean up' },
  };

  if (companyEmail) {
    safeLog(`🧹 Cleaning up test company: ${companyEmail}`);
    results.company = await deleteCompanyByEmail(companyEmail);
    Cypress.env('currentTestCompanyEmail', null);
  } else {
    safeLog('⚠️ No company email found, skipping company cleanup');
  }

  if (adminEmail) {
    safeLog(`🧹 Cleaning up test admin: ${adminEmail}`);
    results.admin = await deleteCustomerByEmail(adminEmail);
    Cypress.env('currentTestAdminEmail', null);
  } else {
    safeLog('⚠️ No admin email found, skipping admin cleanup');
  }

  if (regularUserEmail) {
    safeLog(`🧹 Cleaning up regular user: ${regularUserEmail}`);
    results.regularUser = await deleteCustomerByEmail(regularUserEmail);
    Cypress.env('regularUserEmail', null);
  }

  if (noCreditRoleId) {
    safeLog(`🧹 Cleaning up custom role: ${noCreditRoleId}`);
    try {
      await deleteCompanyRole(noCreditRoleId);
      results.role = { success: true, message: 'Custom role deleted' };
    } catch (error) {
      safeLog(`⚠️ Role cleanup failed: ${error.message}`);
      results.role = { success: false, error: error.message };
    }
    Cypress.env('noCreditRoleId', null);
  }

  safeLog('✅ Test cleanup completed');
  return results;
}

// ==========================================================================
// Invitation Flow (for TC-34)
// ==========================================================================

/**
 * Create a standalone customer account (not assigned to any company).
 * This is used to simulate a pre-registered user who will receive an invitation.
 * 
 * @param {Object} userData - User data
 * @returns {Promise<Object>} Created customer data with ID
 */
async function createStandaloneCustomer(userData) {
  const {
    firstname,
    lastname,
    email,
    password = 'Test123!',
  } = userData;

  const client = new ACCSApiClient();

  safeLog('👤 Creating standalone customer:', email);

  const customerPayload = {
    customer: {
      email,
      firstname,
      lastname,
      website_id: 1,
      store_id: 1,
      group_id: 1,
    },
    password,
  };

  const customerData = await client.post('/V1/customers', customerPayload);
  validateApiResponse(customerData, 'Standalone customer creation', 'id');

  safeLog('✅ Standalone customer created with ID:', customerData.id);

  return {
    id: customerData.id,
    email,
    firstname,
    lastname,
    password,
  };
}

/**
 * Accept a company invitation by assigning a customer to a company with active status.
 * This simulates the invitation acceptance flow without requiring email verification.
 * 
 * @param {number} customerId - Customer ID
 * @param {number} companyId - Company ID to assign to
 * @param {Object} userData - User data (email, firstname, lastname)
 * @param {string} jobTitle - Job title (optional)
 * @param {string} telephone - Phone number (optional)
 * @returns {Promise<Object>} Assignment result
 */
async function acceptCompanyInvitation(customerId, companyId, userData, jobTitle = 'Team Member', telephone = '555-0000') {
  const { email, firstname, lastname } = userData;

  const client = new ACCSApiClient();

  safeLog(`🔗 Accepting invitation for customer ${customerId} to company ${companyId}`);

  const updatePayload = {
    customer: {
      id: customerId,
      email,
      firstname,
      lastname,
      website_id: 1,
      extension_attributes: {
        company_attributes: {
          company_id: companyId,
          status: 1, // Active - this simulates accepting the invitation!
          job_title: jobTitle,
          telephone,
        },
      },
    },
  };

  const assignResult = await client.put(`/V1/customers/${customerId}`, updatePayload);
  validateApiResponse(assignResult, 'Invitation acceptance', 'id');

  safeLog('✅ Invitation accepted - user assigned to company');

  return {
    id: customerId,
    email,
    companyId,
    status: 'active',
  };
}

// ==========================================================================
// Order Management (for Company Credit tests)
// ==========================================================================

/**
 * Cancel an order via REST API.
 * Used to trigger "Reverted" credit transactions for Payment on Account orders.
 * 
 * @param {string} orderId - Order increment ID (e.g., "000000123")
 * @returns {Promise<boolean>} True if cancellation successful
 * @throws {Error} If API request fails
 */
async function cancelOrder(orderId) {
  const client = new ACCSApiClient();

  safeLog(`📦 Canceling order: ${orderId}`);

  const cancelResult = await client.post(`/V1/orders/${orderId}/cancel`);
  
  // Cancel endpoint returns boolean true on success
  if (cancelResult === true) {
    safeLog(`✅ Order ${orderId} cancelled successfully`);
    return true;
  }
  
  // If not true, treat as error
  throw new Error(`Order cancellation failed: ${JSON.stringify(cancelResult)}`);
}

/**
 * Create an invoice for an order via REST API.
 * Required before creating a credit memo for refunds.
 * 
 * @param {string} orderId - Order increment ID (e.g., "000000123")
 * @returns {Promise<number>} Invoice entity ID
 * @throws {Error} If API request fails
 */
async function createInvoice(orderId) {
  const client = new ACCSApiClient();

  safeLog(`📄 Creating invoice for order ID: ${orderId}`);

  // POST /V1/invoices/
  const payload = {
    entity: {
      order_id: orderId,
    },
  };

  const result = await client.post('/V1/invoices/', payload);

  // Validate response - handles both objects with errors and successful responses
  validateApiResponse(result, 'Invoice creation');

  // According to swagger, POST /V1/invoices/ returns sales-data-invoice-interface object with entity_id
  if (typeof result === 'object' && result !== null && result.entity_id) {
    safeLog(`✅ Invoice created successfully for order ${orderId}, invoice ID: ${result.entity_id}`);
    return result.entity_id;
  }

  throw new Error(`Invoice creation failed: Invalid response - expected invoice object with entity_id, got ${typeof result}: ${JSON.stringify(result)}`);
}

/**
 * Create a credit memo (refund) for an order via REST API.
 * For Payment on Account orders, this triggers automatic company credit restoration.
 * 
 * @param {string} orderId - Order increment ID (e.g., "000000123")
 * @param {number} invoiceId - Invoice entity ID
 * @param {Object} creditMemoData - Credit memo data (items, adjustment, shipping, etc.)
 * @returns {Promise<number>} Credit memo entity ID
 * @throws {Error} If API request fails
 */
async function createCreditMemo(orderId, invoiceId, creditMemoData = {}) {
  const client = new ACCSApiClient();

  safeLog(`💰 Creating credit memo for order ID: ${orderId} with invoice ID: ${invoiceId}`);

  // First, get the order details to populate required fields
  const order = await client.get(`/V1/orders/${orderId}`);
  validateApiResponse(order, 'Order fetch');

  // POST /V1/creditmemo/refund
  // This triggers RefundCommand which calls CreditBalance::refund() for Payment on Account
  // Must provide invoice_id for online refund processing
  const payload = {
    creditmemo: {
      order_id: orderId,
      invoice_id: invoiceId, // CRITICAL: Required for $creditmemo->getInvoice() to work
      base_currency_code: order.base_currency_code,
      global_currency_code: order.global_currency_code || order.base_currency_code,
      order_currency_code: order.order_currency_code,
      store_currency_code: order.store_currency_code || order.order_currency_code,
      adjustment_positive: creditMemoData.adjustment_positive || 0,
      adjustment_negative: creditMemoData.adjustment_negative || 0,
      shipping_amount: creditMemoData.shipping_amount || 0,
      ...creditMemoData,
    },
    offlineRequested: false, // false triggers RefundCommand when invoice is present
  };

  const result = await client.post('/V1/creditmemo/refund', payload);

  // Validate response - handles both objects with errors and successful responses
  validateApiResponse(result, 'Credit memo creation');

  // According to swagger, POST /V1/creditmemo/refund returns sales-data-creditmemo-interface object with entity_id
  if (typeof result === 'object' && result !== null && result.entity_id) {
    safeLog(`✅ Credit memo created successfully for order ${orderId}, credit memo ID: ${result.entity_id}`);
    return result.entity_id;
  }

  throw new Error(`Credit memo creation failed: Invalid response - expected credit memo object with entity_id, got ${typeof result}: ${JSON.stringify(result)}`);
}

/**
 * Get order details by increment ID (e.g., "000000123").
 * 
 * @param {string} incrementId - Order increment ID from storefront
 * @returns {Promise<Object>} - Order object with entity_id
 */
async function getOrderByIncrementId(incrementId) {
  const client = new ACCSApiClient();
  
  safeLog(`🔍 Looking up order by increment ID: ${incrementId}`);
  
  // GET /V1/orders?searchCriteria[filter_groups][0][filters][0][field]=increment_id&searchCriteria[filter_groups][0][filters][0][value]=000000123
  const searchParams = new URLSearchParams({
    'searchCriteria[filter_groups][0][filters][0][field]': 'increment_id',
    'searchCriteria[filter_groups][0][filters][0][value]': incrementId,
  });
  
  const result = await client.get(`/V1/orders?${searchParams.toString()}`);
  
  validateApiResponse(result, 'Order lookup');
  
  if (result.items && result.items.length > 0) {
    const order = result.items[0];
    safeLog(`✅ Found order: entity_id=${order.entity_id}, increment_id=${order.increment_id}`);
    return order;
  }
  
  throw new Error(`Order not found with increment ID: ${incrementId}`);
}

// ==========================================================================
// Exports
// ==========================================================================

module.exports = {
  // Company Creation
  createCompany,

  // Company Search & Verification
  findCompanyByEmail,
  findCompanyByName,
  verifyCompanyCreated,

  // Company Profile
  updateCompanyProfile,

  // Company Deletion
  deleteCompanyById,
  deleteCompanyByEmail,

  // User Management
  createCompanyUser,
  findCustomerByEmail,
  deleteCustomerById,
  deleteCustomerByEmail,
  updateCompanyUserStatus,
  assignRoleToUser,

  // Role Management
  createCompanyRole,
  deleteCompanyRole,

  // Team Management
  createCompanyTeam,
  updateCompanyTeam,
  deleteCompanyTeam,

  // Company Credit
  getCompanyCredit,
  getCompanyCreditHistory,
  updateCompanyCredit,
  increaseCompanyCreditBalance,
  decreaseCompanyCreditBalance,
  CREDIT_OPERATION_TYPES,

  // Order Management
  getOrderByIncrementId,
  cancelOrder,
  createInvoice,
  createCreditMemo,

  // Invitation Flow
  createStandaloneCustomer,
  acceptCompanyInvitation,
  assignCustomerToCompany,

  // Test Cleanup
  cleanupTestCompany,
};

/**
 * Assigns a customer to a company using REST API.
 * Used for multi-company scenarios where a user needs to be assigned to multiple companies.
 * 
 * @param {number} customerId - Customer ID
 * @param {number} companyId - Company ID to assign to
 * @returns {Promise<Object>} Assignment result
 * @throws {Error} If API request fails
 */
async function assignCustomerToCompany(customerId, companyId) {
  const client = new ACCSApiClient();

  safeLog(`🔗 Assigning customer ${customerId} to company ${companyId}...`);

  const result = await client.put(`/V1/customers/${customerId}/companies/${companyId}`);

  // Validate response
  if (result.error || result.message) {
    throw new Error(`Failed to assign customer ${customerId} to company ${companyId}: ${result.message || JSON.stringify(result)}`);
  }

  safeLog(`✅ Customer ${customerId} assigned to company ${companyId}`);

  return result;
}
