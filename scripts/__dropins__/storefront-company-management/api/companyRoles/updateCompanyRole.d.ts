import { CompanyRoleModel, CompanyRoleUpdateInputModel } from '../../data/models/company-role';

/**
 * Updates an existing company role's name and/or permissions.
 *
 * The role name must be unique within the company (excluding the current role).
 * Use `isCompanyRoleNameAvailable` to validate name uniqueness if changing the name.
 *
 * **Permissions Required:**
 * - `Magento_Company::roles_edit` - User must have role management permission
 *
 * @param input - Role update data including ID, new name, and/or new permission IDs
 * @returns Promise resolving to the updated role with complete details
 * @throws Error if network request fails, user lacks permission, or name is duplicate
 *
 * @example
 * ```typescript
 * const updatedRole = await updateCompanyRole({
 *   id: 'cm9sZS8xMjM=',
 *   name: 'Senior Sales Manager',
 *   permissions: [
 *     'Magento_Company::index',
 *     'Magento_Company::view',
 *     'Magento_Company::edit_account',
 *     'Magento_Sales::all',
 *     'Magento_Sales::place_order',
 *     'Magento_Sales::view_orders'
 *   ]
 * });
 *
 * console.log(`Updated role: ${updatedRole.name}`);
 * ```
 */
export declare const updateCompanyRole: (input: CompanyRoleUpdateInputModel) => Promise<CompanyRoleModel>;
//# sourceMappingURL=updateCompanyRole.d.ts.map