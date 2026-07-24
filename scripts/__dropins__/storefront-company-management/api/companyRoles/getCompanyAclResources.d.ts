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
import { CompanyAclResourceModel } from '../../data/models/company-role';
/**
 * Retrieves the complete hierarchical tree of ACL (Access Control List) resources.
 *
 * Returns all permission categories and individual permissions available for
 * company role assignment. The structure is hierarchical, with parent permissions
 * containing child permissions.
 *
 * Used by the Roles & Permissions UI to display the permission tree with
 * checkboxes for role creation and editing.
 *
 * @returns Promise resolving to array of top-level ACL resources with nested children
 * @throws Error if network request fails
 *
 * @example
 * ```typescript
 * const resources = await getCompanyAclResources();
 *
 * resources.forEach(category => {
 *   console.log(`Category: ${category.text}`);
 *   category.children?.forEach(permission => {
 *     console.log(`  - ${permission.text} (${permission.id})`);
 *   });
 * });
 * ```
 */
export declare const getCompanyAclResources: () => Promise<CompanyAclResourceModel[]>;
