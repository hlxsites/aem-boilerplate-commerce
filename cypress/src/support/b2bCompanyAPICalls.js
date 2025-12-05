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
  if (customerData.error) {
    safeError('❌ Customer creation failed:', customerData.message);
    throw new Error(`Customer creation failed: ${customerData.message}`);
  }

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
  if (company.error) {
    safeError('❌ Company creation failed:', company.message);
    throw new Error(`Company creation failed: ${company.message}`);
  }

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

  try {
    safeLog(`🔍 Searching for company with email: ${companyEmail}`);

    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'company_email',
      'searchCriteria[filterGroups][0][filters][0][value]': companyEmail,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    };

    const response = await client.get('/V1/company', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found company: ${response.items[0].company_name} (ID: ${response.items[0].id})`);
      return response.items[0];
    }

    safeLog('❌ Company not found');
    return null;
  } catch (error) {
    safeError('❌ Company search failed:', error.message);
    return null;
  }
}

/**
 * Find companies by name using REST API (partial match).
 * @param {string} companyName - The company name to search for
 * @returns {Promise<Array<Object>>} Array of matching companies
 */
async function findCompanyByName(companyName) {
  const client = new ACCSApiClient();

  try {
    safeLog(`🔍 Searching for company with name: ${companyName}`);

    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'company_name',
      'searchCriteria[filterGroups][0][filters][0][value]': `%${companyName}%`,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'like',
    };

    const response = await client.get('/V1/company', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found ${response.items.length} company(ies)`);
      return response.items;
    }

    safeLog('❌ No companies found');
    return [];
  } catch (error) {
    safeError('❌ Company search failed:', error.message);
    return [];
  }
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
 *
 * @param {number} companyId - Company ID
 * @param {Object} updates - Fields to update (company_name, legal_name, etc.)
 * @returns {Promise<Object>} Updated company data
 */
async function updateCompanyProfile(companyId, updates) {
  const client = new ACCSApiClient();

  safeLog('📝 Updating company:', companyId, updates);

  // PUT /V1/company/:companyId per Adobe REST API documentation
  const result = await client.put(`/V1/company/${companyId}`, { company: updates });

  if (result.error) {
    safeError('❌ Company update failed:', result);
    throw new Error(result.message || 'Update error');
  }

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

  const company = await findCompanyByEmail(companyEmail);

  if (!company) {
    safeLog(`⚠️ Company with email ${companyEmail} not found, nothing to delete`);
    return { success: true, message: 'Company not found' };
  }

  return deleteCompanyById(company.id);
}

// ==========================================================================
// User Management
// ==========================================================================

/**
 * Create a customer via REST API and assign to company.
 * Uses PUT /V1/customers/:customerId with extension_attributes.company_attributes
 * to assign the customer to a company.
 *
 * NOTE: According to Adobe documentation, this REST endpoint is NOT supported
 * in Adobe Commerce as a Cloud Service (ACCS). For ACCS, GraphQL mutations
 * (createCustomerV2, updateCustomerV2) should be used instead.
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

  if (customerData.error) {
    safeError('❌ Customer creation failed:', customerData.message);
    throw new Error(`Customer creation failed: ${customerData.message}`);
  }

  const customerId = customerData.id;
  safeLog('✅ Customer created with ID:', customerId);

  // Step 2: Assign customer to company using PUT /V1/customers/:customerId
  // with extension_attributes.company_attributes (per Adobe REST API docs)
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

  if (assignResult.error) {
    safeError('❌ Company assignment failed:', assignResult.message);
    throw new Error(`Company assignment failed: ${assignResult.message}`);
  }

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

  try {
    safeLog(`🔍 Searching for customer with email: ${customerEmail}`);

    const queryParams = {
      'searchCriteria[filterGroups][0][filters][0][field]': 'email',
      'searchCriteria[filterGroups][0][filters][0][value]': customerEmail,
      'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
    };

    const response = await client.get('/V1/customers/search', queryParams);

    if (response.items && response.items.length > 0) {
      safeLog(`✅ Found customer: ${response.items[0].firstname} ${response.items[0].lastname} (ID: ${response.items[0].id})`);
      return response.items[0];
    }

    safeLog('❌ Customer not found');
    return null;
  } catch (error) {
    safeError('❌ Customer search failed:', error.message);
    return null;
  }
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

  const customer = await findCustomerByEmail(customerEmail);

  if (!customer) {
    safeLog(`⚠️ Customer with email ${customerEmail} not found, nothing to delete`);
    return { success: true, message: 'Customer not found' };
  }

  return deleteCustomerById(customer.id);
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

  if (result.error) {
    safeError('❌ User status update failed:', result);
    throw new Error(result.message || 'Status update error');
  }

  safeLog('✅ User status updated');
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

  if (result.error) {
    safeError('❌ Role creation failed:', result);
    throw new Error(result.message || 'Role creation error');
  }

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

  if (result.error) {
    safeError('❌ Role deletion failed:', result);
    throw new Error(result.message || 'Deletion error');
  }

  safeLog('✅ Role deleted');
  return { success: true, roleId };
}

// ==========================================================================
// Team Management
// ==========================================================================

/**
 * Create a team in company structure.
 * @param {Object} teamData - Team data
 * @returns {Promise<Object>} Created team
 */
async function createCompanyTeam(teamData) {
  const client = new ACCSApiClient();

  safeLog('👥 Creating team:', teamData.name);

  const result = await client.post('/V1/team', { team: teamData });

  if (result.error) {
    safeError('❌ Team creation failed:', result);
    throw new Error(result.message || 'Team creation error');
  }

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

  if (result.error) {
    safeError('❌ Team update failed:', result);
    throw new Error(result.message || 'Team update error');
  }

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

  if (result.error) {
    safeError('❌ Team deletion failed:', result);
    throw new Error(result.message || 'Team deletion error');
  }

  safeLog('✅ Team deleted');
  return { success: true, teamId };
}

// ==========================================================================
// Company Credit
// ==========================================================================

/**
 * Get company credit information.
 * @param {number} companyId - Company ID
 * @returns {Promise<Object>} Company credit data
 */
async function getCompanyCredit(companyId) {
  const client = new ACCSApiClient();

  safeLog('💳 Getting company credit for:', companyId);

  const result = await client.get(`/V1/companyCredits/${companyId}`);

  if (result.error) {
    safeError('❌ Failed to get company credit:', result);
    throw new Error(result.message || 'Get credit error');
  }

  safeLog('✅ Company credit retrieved:', result);
  return result;
}

/**
 * Update company credit limit.
 * @param {number} companyId - Company ID
 * @param {Object} creditData - Credit data (credit_limit, balance, etc.)
 * @returns {Promise<Object>} Updated credit data
 */
async function updateCompanyCredit(companyId, creditData) {
  const client = new ACCSApiClient();

  safeLog('💰 Updating company credit for:', companyId, creditData);

  const result = await client.put(`/V1/companyCredits/${companyId}`, { companyCredit: creditData });

  if (result.error) {
    safeError('❌ Company credit update failed:', result);
    throw new Error(result.message || 'Credit update error');
  }

  safeLog('✅ Company credit updated');
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

  const results = {
    company: { success: true, message: 'No company to clean up' },
    admin: { success: true, message: 'No admin to clean up' },
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

  safeLog('✅ Test cleanup completed');
  return results;
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

  // Role Management
  createCompanyRole,
  deleteCompanyRole,

  // Team Management
  createCompanyTeam,
  updateCompanyTeam,
  deleteCompanyTeam,

  // Company Credit
  getCompanyCredit,
  updateCompanyCredit,

  // Test Cleanup
  cleanupTestCompany,
};
