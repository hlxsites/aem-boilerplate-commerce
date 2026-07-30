/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { PermissionsModel } from '../../data/models';
/**
 * Gets user role permissions with caching
 */
export declare const getCustomerRolePermissions: () => Promise<PermissionsModel>;
/**
 * Resets the permissions cache
 * @internal
 */
export declare const _resetCache: () => void;
