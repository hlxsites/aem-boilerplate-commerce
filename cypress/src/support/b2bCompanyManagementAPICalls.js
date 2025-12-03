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

const ACCSApiClient = require('./accsClient');

// Direct HTTP request to GraphQL endpoint (no auth needed for mutations)
const BASE_URL = Cypress.env('API_ENDPOINT') || 'https://na1-sandbox.api.commerce.adobe.com/LwndYQs37CvkUQk9WEmNkz';
const GRAPHQL_URL = Cypress.env('graphqlEndPoint') || `${BASE_URL}/graphql`;
const IMS_CLIENT_ID = process.env.IMS_CLIENT_ID;
const IMS_ORG_ID = process.env.IMS_ORG_ID;

/**
 * Create a company via GraphQL mutation
 * @param {Object} companyData - Company data object
 * @returns {Promise<Object>} Created company data
 */
async function createCompanyViaGraphQL(companyData) {
  const {
    companyName,
    companyEmail,
    legalName = '',
    vatTaxId = '',
    resellerId = '',
    street,
    city,
    countryCode,
    region,
    postcode,
    telephone,
    adminFirstName,
    adminLastName,
    adminEmail,
    adminJobTitle = '',
    adminWorkPhone = ''
  } = companyData;

  const mutation = `
    mutation {
      createCompany(
        input: {
          company_name: "${companyName}"
          company_email: "${companyEmail}"
          ${legalName ? `legal_name: "${legalName}"` : ''}
          ${vatTaxId ? `vat_tax_id: "${vatTaxId}"` : ''}
          ${resellerId ? `reseller_id: "${resellerId}"` : ''}
          legal_address: {
            street: ["${street}"]
            city: "${city}"
            country_id: ${countryCode}
            region: {
              region: "${region}"
            }
            postcode: "${postcode}"
            telephone: "${telephone}"
          }
          company_admin: {
            email: "${adminEmail}"
            firstname: "${adminFirstName}"
            lastname: "${adminLastName}"
            ${adminJobTitle ? `job_title: "${adminJobTitle}"` : ''}
            ${adminWorkPhone ? `telephone: "${adminWorkPhone}"` : ''}
          }
        }
      ) {
        company {
          id
          name
          email
          legal_name
          vat_tax_id
          reseller_id
          legal_address {
            street
            city
            country_code
            region {
              region
              region_code
            }
            postcode
            telephone
          }
          company_admin {
            id
            email
            firstname
            lastname
            job_title
          }
        }
      }
    }
  `;

  console.log('🏢 Creating company:', companyName);

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: mutation }),
  });

  const responseData = await response.json();

  if (!response.ok || responseData.errors) {
    console.error('❌ Company creation failed:', responseData.errors);
    throw new Error(
      responseData.errors
        ? responseData.errors[0].message
        : `HTTP Error: ${response.status}`
    );
  }

  console.log('✅ Company created:', responseData.data.createCompany.company);
  return responseData.data.createCompany.company;
}

/**
 * Create a company via REST API with active status
 * This creates a fully active company with a company admin that can log in immediately
 * @param {Object} companyData - Company data object
 * @returns {Promise<Object>} Created company data with admin info
 */
async function createCompanyViaREST(companyData) {
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
    status = 1 // 1 = Active, 0 = Pending
  } = companyData;

  // Get the REST API base URL (for local, it's the same as graphqlEndPoint without /graphql)
  const graphqlUrl = Cypress.env('graphqlEndPoint') || GRAPHQL_URL;
  const restBaseUrl = graphqlUrl.replace('/graphql', '');
  
  // Get the token - either local integration token or from TokenManager
  const localToken = Cypress.env('LOCAL_INTEGRATION_TOKEN');
  let token;
  
  if (localToken) {
    token = localToken;
  } else {
    const TokenManager = require('./tokenManager');
    const tokenManager = new TokenManager();
    token = await tokenManager.getValidToken();
  }

  // Step 1: Create the company admin customer first
  console.log('👤 Creating company admin customer:', adminEmail);
  
  const customerPayload = {
    customer: {
      email: adminEmail,
      firstname: adminFirstName,
      lastname: adminLastName,
      website_id: 1,
      store_id: 1,
      group_id: 1
    },
    password: adminPassword
  };

  const customerResponse = await fetch(`${restBaseUrl}/rest/V1/customers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerPayload)
  });

  if (!customerResponse.ok) {
    const errorText = await customerResponse.text();
    console.error('❌ Customer creation failed:', errorText);
    throw new Error(`Customer creation failed: ${errorText}`);
  }

  const customerData = await customerResponse.json();
  const customerId = customerData.id;
  console.log('✅ Customer created with ID:', customerId);

  // Step 2: Create the company with the customer as super_user_id
  console.log('🏢 Creating company:', companyName);
  
  const companyPayload = {
    company: {
      company_name: companyName,
      company_email: companyEmail,
      legal_name: legalName,
      vat_tax_id: vatTaxId,
      reseller_id: resellerId,
      street: [street],
      city: city,
      country_id: countryCode,
      region_id: regionId,
      postcode: postcode,
      telephone: telephone,
      super_user_id: customerId,
      customer_group_id: 1,
      status: status // 1 = Active
    }
  };

  const companyResponse = await fetch(`${restBaseUrl}/rest/V1/company/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(companyPayload)
  });

  if (!companyResponse.ok) {
    const errorText = await companyResponse.text();
    console.error('❌ Company creation failed:', errorText);
    throw new Error(`Company creation failed: ${errorText}`);
  }

  const company = await companyResponse.json();
  console.log('✅ Company created with ID:', company.id);

  // Return company data with admin info
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
      password: adminPassword
    }
  };
}

/**
 * Create a customer via REST API and assign to company
 * @param {Object} userData - User data
 * @param {number} companyId - Company ID to assign to
 * @returns {Promise<Object>} Created user data
 */
async function createUserAndAssignToCompanyViaREST(userData, companyId) {
  const {
    firstname,
    lastname,
    email,
    password = 'Test123!'
  } = userData;

  // Get the REST API base URL
  const graphqlUrl = Cypress.env('graphqlEndPoint') || GRAPHQL_URL;
  const restBaseUrl = graphqlUrl.replace('/graphql', '');
  
  // Get the token
  const localToken = Cypress.env('LOCAL_INTEGRATION_TOKEN');
  let token;
  
  if (localToken) {
    token = localToken;
  } else {
    const TokenManager = require('./tokenManager');
    const tokenManager = new TokenManager();
    token = await tokenManager.getValidToken();
  }

  // Step 1: Create the customer
  console.log('👤 Creating user:', email);
  
  const customerPayload = {
    customer: {
      email: email,
      firstname: firstname,
      lastname: lastname,
      website_id: 1,
      store_id: 1,
      group_id: 1
    },
    password: password
  };

  const customerResponse = await fetch(`${restBaseUrl}/rest/V1/customers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerPayload)
  });

  if (!customerResponse.ok) {
    const errorText = await customerResponse.text();
    console.error('❌ Customer creation failed:', errorText);
    throw new Error(`Customer creation failed: ${errorText}`);
  }

  const customerData = await customerResponse.json();
  const customerId = customerData.id;
  console.log('✅ Customer created with ID:', customerId);

  // Step 2: Assign customer to company
  console.log('🔗 Assigning user to company:', companyId);
  
  const assignResponse = await fetch(`${restBaseUrl}/rest/V1/customers/${customerId}/companies/${companyId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!assignResponse.ok) {
    const errorText = await assignResponse.text();
    console.error('❌ Company assignment failed:', errorText);
    throw new Error(`Company assignment failed: ${errorText}`);
  }

  console.log('✅ User assigned to company');

  return {
    id: customerId,
    email: email,
    firstname: firstname,
    lastname: lastname,
    password: password,
    companyId: companyId
  };
}

/**
 * Create a customer via GraphQL and assign to company
 * @param {Object} userData - User data
 * @param {number} companyId - Company ID to assign to
 * @returns {Promise<Object>} Created user and assignment result
 */
async function createUserAndAssignToCompany(userData, companyId) {
  const {
    firstname,
    lastname,
    email,
    password = 'Test123!',
    isSubscribed = false,
  } = userData;

  // Step 1: Create customer
  const createMutation = `
    mutation {
      createCustomerV2(
        input: {
          firstname: "${firstname}"
          lastname: "${lastname}"
          email: "${email}"
          password: "${password}"
          is_subscribed: ${isSubscribed}
        }
      ) {
        customer {
          id
          firstname
          lastname
          email
        }
      }
    }
  `;

  console.log('👤 Creating user:', email);

  const createResponse = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: createMutation }),
  });

  const createData = await createResponse.json();

  if (!createResponse.ok || createData.errors) {
    console.error('❌ User creation failed:', createData.errors);
    throw new Error(
      createData.errors
        ? createData.errors[0].message
        : `HTTP Error: ${createResponse.status}`
    );
  }

  const customer = createData.data.createCustomerV2.customer;
  console.log('✅ User created via GraphQL:', customer);

  // Step 2: Get REST customer ID and assign to company
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  // Try to use GraphQL ID directly first (works for some Magento versions)
  let restCustomerId = customer.id;
  console.log('🔍 Trying GraphQL customer ID:', restCustomerId);

  // Verify the customer exists via REST API (with retry for indexing delay)
  const searchParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'email',
    'searchCriteria[filterGroups][0][filters][0][value]': email,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  let customerSearchResponse;
  let retries = 10; // 10 retries = 20 seconds max wait (for slow local indexing)
  let found = false;
  
  while (retries > 0 && !found) {
    customerSearchResponse = await client.get('/V1/customers/search', searchParams);
    
    if (customerSearchResponse.items && customerSearchResponse.items.length > 0) {
      restCustomerId = customerSearchResponse.items[0].id;
      found = true;
      console.log('✅ Found REST customer ID:', restCustomerId);
      break;
    }
    
    console.log(`⏳ Waiting for customer indexing... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    retries--;
  }

  if (!found) {
    console.warn('⚠️ Customer not found via search, using GraphQL ID directly');
    // Continue anyway with GraphQL ID - might work for local Magento
  }

  // Step 3: Assign to company
  // Note: Standard Adobe Commerce uses /V1/customers/:customerId/companies/:companyId
  // ACCS uses /V1/company/:companyId/customer/:customerId
  const isLocalMagento = !IMS_CLIENT_ID || IMS_CLIENT_ID === 'undefined';
  const assignUrl = isLocalMagento
    ? `${BASE_URL}/rest/V1/customers/${restCustomerId}/companies/${companyId}`
    : `${BASE_URL}/V1/company/${companyId}/customer/${restCustomerId}`;

  console.log(`🔗 Using assignment URL: ${assignUrl}`);

  const assignResponse = await fetch(assignUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}), // Empty body for PUT
  });

  if (!assignResponse.ok) {
    const errorText = await assignResponse.text();
    console.error('❌ Company assignment failed:', assignResponse.status, errorText.substring(0, 500));
    throw new Error(`Assignment error: ${assignResponse.status} - ${errorText.substring(0, 200)}`);
  }

  console.log('✅ User assigned to company:', companyId);

  return {
    customer,
    restCustomerId,
    companyId,
  };
}

/**
 * Create a custom company role
 * @param {Object} roleData - Role data with permissions
 * @returns {Promise<Object>} Created role
 */
async function createCompanyRole(roleData) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'x-api-key': IMS_CLIENT_ID,
    'x-gw-ims-org-id': IMS_ORG_ID,
    'Content-Type': 'application/json',
  };

  console.log('🎭 Creating role:', roleData.role_name);

  const response = await fetch(`${BASE_URL}/V1/company/role`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ role: roleData }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Role creation failed:', result);
    throw new Error(result.message || `Role creation error: ${response.status}`);
  }

  console.log('✅ Role created:', result);
  return result;
}

/**
 * Update company profile via REST API
 * @param {number} companyId - Company ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated company data
 */
async function updateCompanyProfile(companyId, updates) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('📝 Updating company:', companyId, updates);

  const response = await fetch(`${BASE_URL}/V1/company/${companyId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ company: updates }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Company update failed:', result);
    throw new Error(result.message || `Update error: ${response.status}`);
  }

  console.log('✅ Company updated');
  return result;
}

/**
 * Delete a company role
 * @param {number} roleId - Role ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyRole(roleId) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('🗑️ Deleting role:', roleId);

  const response = await fetch(`${BASE_URL}/V1/company/role/${roleId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Role deletion failed:', errorData);
    throw new Error(errorData.message || `Deletion error: ${response.status}`);
  }

  console.log('✅ Role deleted');
  return { success: true, roleId };
}

/**
 * Create a team in company structure
 * @param {Object} teamData - Team data
 * @returns {Promise<Object>} Created team
 */
async function createCompanyTeam(teamData) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('👥 Creating team:', teamData.name);

  const response = await fetch(`${BASE_URL}/V1/team`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ team: teamData }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Team creation failed:', result);
    throw new Error(result.message || `Team creation error: ${response.status}`);
  }

  console.log('✅ Team created:', result);
  return result;
}

/**
 * Update a team in company structure
 * @param {number} teamId - Team ID
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object>} Updated team data
 */
async function updateCompanyTeam(teamId, updates) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('📝 Updating team:', teamId, updates);

  const response = await fetch(`${BASE_URL}/V1/team/${teamId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ team: updates }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Team update failed:', result);
    throw new Error(result.message || `Team update error: ${response.status}`);
  }

  console.log('✅ Team updated');
  return result;
}

/**
 * Delete a team from company structure
 * @param {number} teamId - Team ID to delete
 * @returns {Promise<Object>} Deletion result
 */
async function deleteCompanyTeam(teamId) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('🗑️ Deleting team:', teamId);

  const response = await fetch(`${BASE_URL}/V1/team/${teamId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('❌ Team deletion failed:', errorData);
    throw new Error(errorData.message || `Team deletion error: ${response.status}`);
  }

  console.log('✅ Team deleted');
  return { success: true, teamId };
}

/**
 * Update company user status (set active/inactive)
 * @param {number} customerId - Customer ID
 * @param {number} status - Status (0=inactive, 1=active)
 * @returns {Promise<Object>} Update result
 */
async function updateCompanyUserStatus(customerId, status) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log(`🔄 Setting user ${customerId} status to:`, status === 0 ? 'Inactive' : 'Active');

  const response = await fetch(`${BASE_URL}/V1/customers/${customerId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer: {
        id: customerId,
        extension_attributes: {
          company_attributes: {
            status: status,
          },
        },
      },
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ User status update failed:', result);
    throw new Error(result.message || `Status update error: ${response.status}`);
  }

  console.log('✅ User status updated');
  return result;
}

/**
 * Get company credit information
 * @param {number} companyId - Company ID
 * @returns {Promise<Object>} Company credit data
 */
async function getCompanyCredit(companyId) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('💳 Getting company credit for:', companyId);

  const response = await fetch(`${BASE_URL}/V1/companyCredits/${companyId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Failed to get company credit:', result);
    throw new Error(result.message || `Get credit error: ${response.status}`);
  }

  console.log('✅ Company credit retrieved:', result);
  return result;
}

/**
 * Update company credit limit
 * @param {number} companyId - Company ID
 * @param {Object} creditData - Credit data (credit_limit, balance, etc.)
 * @returns {Promise<Object>} Updated credit data
 */
async function updateCompanyCredit(companyId, creditData) {
  const client = new ACCSApiClient();
  const accessToken = await client.tokenManager.getValidToken();

  console.log('💰 Updating company credit for:', companyId, creditData);

  const response = await fetch(`${BASE_URL}/V1/companyCredits/${companyId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-api-key': IMS_CLIENT_ID,
      'x-gw-ims-org-id': IMS_ORG_ID,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ companyCredit: creditData }),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error('❌ Company credit update failed:', result);
    throw new Error(result.message || `Credit update error: ${response.status}`);
  }

  console.log('✅ Company credit updated');
  return result;
}

module.exports = {
  createCompanyViaGraphQL,
  createCompanyViaREST,
  createUserAndAssignToCompany,
  createUserAndAssignToCompanyViaREST,
  createCompanyRole,
  updateCompanyProfile,
  deleteCompanyRole,
  createCompanyTeam,
  updateCompanyTeam,
  deleteCompanyTeam,
  updateCompanyUserStatus,
  getCompanyCredit,
  updateCompanyCredit,
};
