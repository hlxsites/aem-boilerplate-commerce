/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
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
export type RolePermissionNode = {
    id?: string;
    children?: RolePermissionNode[];
};
export type RoleLike = {
    id?: string | number;
    name?: string;
    permissions?: RolePermissionNode[];
} | null;
export interface CompanyRolePermissionsResponse {
    data?: {
        customer?: {
            role?: RoleLike;
            status?: string;
        };
    };
    errors?: Array<{
        message: string;
    }>;
}
export type ResolvedCompanyAddressPermissions = {
    canAccessAddressBook: boolean;
    canViewAddress: boolean;
    canCreateAddress: boolean;
    canEditAddress: boolean;
    canDeleteAddress: boolean;
    canSetDefaultAddress: boolean;
};
export declare const flattenPermissionIds: (permissions?: RolePermissionNode[]) => Set<string>;
export declare const hasCompatibilityAddressPermissions: (allowedIds: Set<string>) => boolean;
export declare const hasGranularAddressPermissions: (allowedIds: Set<string>) => boolean;
export declare const isCompanyAdminRole: (role?: RoleLike) => boolean;
export declare const resolveCompanyAddressPermissions: (role?: RoleLike) => ResolvedCompanyAddressPermissions;
export declare const resolveCompanyAddressPermissionsFromResponse: (response?: CompanyRolePermissionsResponse) => ResolvedCompanyAddressPermissions;
export declare const getDefaultCompanyAddressPermissions: () => ResolvedCompanyAddressPermissions;
