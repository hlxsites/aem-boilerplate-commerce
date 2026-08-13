import { GetCompanyRolesVariables } from '../../types/api/companyRoles.types';
import { CompanyRolesResponseModel } from '../../data/models/company-role';

/**
 * Retrieves a paginated list of all company roles with basic information.
 *
 * Returns roles with their names, assigned user counts, and IDs. Supports
 * server-side pagination and filtering by role name.
 *
 * **Permissions Required:**
 * - `Magento_Company::roles_view` - User must have permission to view company roles
 *
 * @param variables - Optional query parameters for pagination and filtering
 * @returns Promise resolving to paginated roles list with metadata
 * @throws Error if network request fails or user lacks permission
 *
 * @example
 * ```typescript
 * const response = await getCompanyRoles({
 *   pageSize: 20,
 *   currentPage: 1,
 *   filter: { name: 'Manager' }
 * });
 *
 * console.log(`Total roles: ${response.totalCount}`);
 * response.items.forEach(role => {
 *   console.log(`${role.name}: ${role.usersCount} users`);
 * });
 * ```
 */
export declare const getCompanyRoles: (variables?: GetCompanyRolesVariables) => Promise<CompanyRolesResponseModel>;
//# sourceMappingURL=getCompanyRoles.d.ts.map