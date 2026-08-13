import { IsCompanyRoleNameAvailableVariables } from '../../types/api/companyRoles.types';

/**
 * Validates whether a role name is available for use (not already taken).
 *
 * Used for real-time validation during role creation and editing to prevent
 * duplicate role names within a company. Role names are case-sensitive.
 *
 * **Note:** Role names must be unique within a company. Different companies
 * can have roles with the same name.
 *
 * @param variables - Validation parameters containing the role name to check
 * @returns Promise resolving to true if name is available, false if already in use
 * @throws Error if network request fails
 *
 * @example
 * ```typescript
 * const isAvailable = await isCompanyRoleNameAvailable({
 *   name: 'Sales Manager'
 * });
 *
 * if (isAvailable) {
 *   console.log('Name is available - can proceed with creation');
 * } else {
 *   console.error('Name already exists - choose a different name');
 * }
 * ```
 */
export declare const isCompanyRoleNameAvailable: (variables: IsCompanyRoleNameAvailableVariables) => Promise<boolean>;
//# sourceMappingURL=isCompanyRoleNameAvailable.d.ts.map