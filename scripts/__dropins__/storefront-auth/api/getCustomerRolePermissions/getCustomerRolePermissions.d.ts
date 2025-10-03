/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
interface FlattenedPermissions {
    all?: boolean;
    admin?: boolean;
    [key: string]: boolean | undefined;
}
/**
 * Gets user role permissions with caching
 */
export declare const getCustomerRolePermissions: () => Promise<FlattenedPermissions>;
/**
 * Clears the permissions cache - for testing purposes
 * @internal
 */
export declare const __clearCacheForTesting: () => void;
export {};
//# sourceMappingURL=getCustomerRolePermissions.d.ts.map