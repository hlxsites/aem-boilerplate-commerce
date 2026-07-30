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
 * Helper function to flatten ACL resources into a list of permission IDs
 */
export declare const flattenPermissionIds: (resources: CompanyAclResourceModel[]) => string[];
/**
 * Helper function to build a permission tree from flat permission IDs
 */
export declare const buildPermissionTree: (allResources: CompanyAclResourceModel[], selectedIds: string[]) => CompanyAclResourceModel[];
