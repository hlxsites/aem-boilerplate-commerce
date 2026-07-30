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
