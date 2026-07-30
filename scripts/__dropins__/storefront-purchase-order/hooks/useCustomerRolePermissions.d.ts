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
import { CustomerRolePermissionsModel } from '../data/models';
/**
 * Hook to consume customer role permissions from the auth/permissions event
 *
 * Initializes with last payload and subscribes to real-time updates.
 * Transforms permissions data where:
 * - true: Permission granted
 * - false: Permission disabled (overrides admin - PO feature disabled)
 * - Default: Admins get access, regular users don't
 *
 * @returns {permissions: CustomerRolePermissionsModel, loadingPermissions: boolean}
 */
export declare const useCustomerRolePermissions: () => {
    permissions: CustomerRolePermissionsModel;
    loadingPermissions: boolean;
};
