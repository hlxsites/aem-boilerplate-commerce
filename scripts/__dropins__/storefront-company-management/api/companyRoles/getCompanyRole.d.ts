/********************************************************************
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
 *******************************************************************/
import { GetCompanyRoleVariables } from '../../types/api/companyRoles.types';
import { CompanyRoleModel } from '../../data/models/company-role';
/**
 * Retrieves complete details for a specific company role by ID.
 *
 * Returns role name, assigned user count, and the complete permission tree
 * structure with this role's granted permissions. Used when editing an
 * existing role or viewing role details.
 *
 * **Permissions Required:**
 * - `Magento_Company::roles_view` (minimum) - To view role details
 * - `Magento_Company::roles_edit` - To modify the role (additional permission)
 *
 * @param variables - Query parameters containing the role ID
 * @returns Promise resolving to complete role details including permissions
 * @throws Error if network request fails, user lacks permission, or role not found
 *
 * @example
 * ```typescript
 * const role = await getCompanyRole({ id: 'cm9sZS8xMjM=' });
 * console.log(`Role: ${role.name}`);
 * console.log(`Users: ${role.usersCount}`);
 * console.log(`Permissions: ${role.permissions.length} categories`);
 * ```
 */
export declare const getCompanyRole: (variables: GetCompanyRoleVariables) => Promise<CompanyRoleModel>;
