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
import { CustomerRolePermissionsModel } from '../models/customer-role-permissions-model';
type PermissionsPayload = {
    admin?: boolean;
    [key: string]: boolean | undefined;
};
/**
 * Transforms flat permissions object from auth/permissions event into CustomerRolePermissionsModel
 *
 * Permission Logic:
 * - true: Permission granted
 * - false: Permission disabled (overrides admin privileges - indicates PO feature is disabled)
 * - Default: Admins get access, regular users don't
 *
 * @param permissionsData - Flat object with permission keys and admin flag
 * @returns CustomerRolePermissionsModel
 */
export declare const transformPermissions: (permissionsData: PermissionsPayload | null | undefined) => CustomerRolePermissionsModel;
export {};
