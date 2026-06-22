const ACCSApiClient = require('./accsClient');
const { createCompanyUser } = require('./b2bCompanyAPICalls');

async function findCustomerRestId(email, client) {
  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'email',
    'searchCriteria[filterGroups][0][filters][0][value]': email,
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  const result = await client.get('/V1/customers/search', queryParams);
  console.log('🔎 User search result:', result);

  if (!result.items || result.items.length === 0) {
    throw new Error(`Customer with email ${email} not found`);
  }

  return result.items[0].id;
}

async function assignRole(restCustomerId, roleId, client) {
  // Fetch full role — ACO requires permissions array in the payload.
  // Strip accsClient wrapper fields (items/total_count) that would confuse the API.
  const raw = await client.get(`/V1/company/role/${roleId}`);
  const { items: _i, total_count: _tc, error: _e, message: _m, ...roleData } = raw;
  const payload = { userId: restCustomerId, roles: [roleData] };
  console.log('📤 Assigning role, payload:', JSON.stringify(payload));
  return client.put('/V1/company/assignRoles', payload);
}

async function createUserAssignCompanyAndRole(userData, roleId) {
  const { companyId = 13 } = userData;

  console.group('🚀 User creation and role assignment');
  console.log('Creating user:', userData.email, '| companyId:', companyId, '| roleId:', roleId);

  try {
    const client = new ACCSApiClient();

    // Use the same createCompanyUser that all other B2B tests use — proven to work on ACO
    const userResult = await createCompanyUser(userData, companyId);
    const restCustomerId = userResult.id;
    console.log('✅ User created and assigned to company, ID:', restCustomerId);

    // Assign role
    const assignRolesResult = await assignRole(restCustomerId, roleId, client);
    console.log('✅ Role assigned:', assignRolesResult);
    console.groupEnd();

    return { success: true, restCustomerId, roleId, assignRolesResult };
  } catch (error) {
    console.error('❌ Error in createUserAssignCompanyAndRole:', error.message);
    console.groupEnd();
    return { success: false, error: error.message };
  }
}

async function manageCompanyRole(roleData, roleId = null) {
  const client = new ACCSApiClient();

  try {
    if (roleId) {
      console.log(`🗑️ Deleting role with ID: ${roleId}`);
      await client.delete(`/V1/company/role/${roleId}`);
      console.log(`✅ Role ${roleId} deleted successfully`);
      return { success: true, message: `Role ${roleId} deleted`, roleId };
    }

    console.log('📝 Creating new role:', roleData);
    const createResult = await client.post('/V1/company/role', { role: roleData });

    if (!createResult || !createResult.id) {
      throw new Error(`Role creation failed: ${JSON.stringify(createResult)}`);
    }

    console.log('✅ Role created:', createResult);
    return { success: true, role: createResult };
  } catch (error) {
    console.error('❌ Error managing role:', error.message);
    return { success: false, error: error.message };
  }
}

async function getCompanyRoles(companyId = 13) {
  const client = new ACCSApiClient();
  const queryParams = {
    'searchCriteria[filterGroups][0][filters][0][field]': 'company_id',
    'searchCriteria[filterGroups][0][filters][0][value]': String(companyId),
    'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
  };

  try {
    console.log(`📋 Fetching roles for company ID: ${companyId}`);
    const result = await client.get('/V1/company/role', queryParams);
    console.log(`✅ Found ${result.items?.length || 0} roles`);

    if (result.items?.length) {
      console.table(
        result.items.map((role) => ({
          ID: role.id,
          'Role Name': role.role_name,
          'Company ID': role.company_id,
          Permissions: role.permissions?.length || 0,
        })),
      );
    }

    return { success: true, roles: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function deleteCompanyRoles(roleNames = []) {
  if (!Array.isArray(roleNames) || roleNames.length === 0) {
    console.log('⚠️ No role names provided for deletion');
    return { success: true, deletedCount: 0, missing: [] };
  }

  console.log(`🔍 Looking for roles to delete: ${roleNames.join(', ')}`);

  const client = new ACCSApiClient();
  const searchResult = await client.get('/V1/company/role', {
    'searchCriteria[currentPage]': '1',
    'searchCriteria[pageSize]': '100',
  });

  const allRoles = searchResult?.items || [];
  console.log(`📋 Found ${allRoles.length} total company roles`);

  const nameToIdMap = new Map(
    allRoles.filter((r) => r?.role_name && r?.id).map((r) => [r.role_name, r.id]),
  );

  const rolesToDelete = [];
  const missingNames = [];

  roleNames.forEach((name) => {
    const id = nameToIdMap.get(name);
    if (id) {
      rolesToDelete.push({ name, id });
      console.log(`✓ Found role "${name}" with ID: ${id}`);
    } else {
      missingNames.push(name);
      console.log(`✗ Role "${name}" not found`);
    }
  });

  if (!rolesToDelete.length) {
    console.log('⚠️ No matching roles found for deletion');
    return { success: true, deletedCount: 0, missing: missingNames };
  }

  let deletedCount = 0;
  for (const { name, id } of rolesToDelete) {
    await client.delete(`/V1/company/role/${id}`);
    console.log(`✅ Deleted role "${name}" (ID: ${id})`);
    deletedCount += 1;
  }

  return {
    success: true,
    deletedCount,
    missing: missingNames,
    deletedRoles: rolesToDelete,
  };
}

async function unassignRoles(users = [], companyId = 13, fallbackRoleId = null) {
  const client = new ACCSApiClient();
  let reassignedCount = 0;

  // Resolve fallback role dynamically — look up the first role for this company
  // (the default "Default User" role). Avoids hardcoded IDs that differ per environment.
  let resolvedFallbackRoleId = fallbackRoleId;
  if (!resolvedFallbackRoleId) {
    try {
      const rolesResult = await client.get('/V1/company/role', {
        'searchCriteria[filterGroups][0][filters][0][field]': 'company_id',
        'searchCriteria[filterGroups][0][filters][0][value]': String(companyId),
        'searchCriteria[filterGroups][0][filters][0][conditionType]': 'eq',
      });
      const firstRole = rolesResult?.items?.[0];
      resolvedFallbackRoleId = firstRole?.id;
      console.log(`🔍 Resolved fallback role ID: ${resolvedFallbackRoleId} for company ${companyId}`);
    } catch (err) {
      console.error(`❌ Could not resolve fallback role for company ${companyId}: ${err.message}`);
    }
  }

  for (const email of users) {
    try {
      const restCustomerId = await findCustomerRestId(email, client);
      if (resolvedFallbackRoleId) {
        await assignRole(restCustomerId, resolvedFallbackRoleId, client);
      }
      reassignedCount += 1;
      console.log(
        `✅ Reassigned customer ${email} (ID: ${restCustomerId}) to role ${resolvedFallbackRoleId}`,
      );
    } catch (error) {
      console.error(`❌ Failed to reassign customer ${email}: ${error.message}`);
    }
  }

  return { success: true, reassignedCount };
}

module.exports = {
  createUserAssignCompanyAndRole,
  manageCompanyRole,
  getCompanyRoles,
  deleteCompanyRoles,
  unassignRoles,
};
