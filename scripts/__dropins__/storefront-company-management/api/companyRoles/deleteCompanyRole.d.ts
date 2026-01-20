import { DeleteCompanyRoleVariables } from '../../types/api/companyRoles.types';

/**
 * Permanently deletes a company role.
 *
 * ⚠️ **IMPORTANT RESTRICTIONS:**
 * - Cannot delete roles with assigned users - reassign users first
 * - Cannot delete default system roles (e.g., "Default User")
 * - This operation cannot be undone
 * - Role configuration and permission settings are permanently lost
 *
 * **Permissions Required:**
 * - `Magento_Company::roles_edit` - User must have role management permission
 *
 * @param variables - Delete operation parameters containing the role ID
 * @returns Promise resolving to true if deletion succeeded, false if failed (e.g., role has users)
 * @throws Error if network request fails or user lacks permission
 *
 * @example
 * ```typescript
 * try {
 *   const success = await deleteCompanyRole({ id: 'cm9sZS8xMjM=' });
 *   if (success) {
 *     console.log('Role deleted successfully');
 *   } else {
 *     console.error('Cannot delete: role has assigned users');
 *   }
 * } catch (error) {
 *   console.error('Delete failed:', error.message);
 * }
 * ```
 */
export declare const deleteCompanyRole: (variables: DeleteCompanyRoleVariables) => Promise<boolean>;
//# sourceMappingURL=deleteCompanyRole.d.ts.map