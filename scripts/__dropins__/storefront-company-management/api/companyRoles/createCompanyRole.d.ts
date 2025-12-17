import { CompanyRoleModel, CompanyRoleCreateInputModel } from '../../data/models/company-role';

/**
 * Creates a new company role with specified name and permissions.
 *
 * The role name must be unique within the company. Use `isCompanyRoleNameAvailable`
 * to validate name uniqueness before calling this function.
 *
 * **Permissions Required:**
 * - `Magento_Company::roles_edit` - User must have role management permission
 *
 * @param input - Role creation data including name and permission IDs
 * @returns Promise resolving to the newly created role with complete details
 * @throws Error if network request fails, user lacks permission, or name is duplicate
 *
 * @example
 * ```typescript
 * const newRole = await createCompanyRole({
 *   name: 'Sales Manager',
 *   permissions: [
 *     'Magento_Company::index',
 *     'Magento_Company::view',
 *     'Magento_Sales::all',
 *     'Magento_Sales::place_order'
 *   ]
 * });
 *
 * console.log(`Created role: ${newRole.name} (ID: ${newRole.id})`);
 * ```
 */
export declare const createCompanyRole: (input: CompanyRoleCreateInputModel) => Promise<CompanyRoleModel>;
//# sourceMappingURL=createCompanyRole.d.ts.map