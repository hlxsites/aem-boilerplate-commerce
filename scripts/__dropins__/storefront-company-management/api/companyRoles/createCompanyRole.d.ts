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
