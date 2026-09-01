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
import { AddressContextMode } from '../types';
type AddressPermissionsFlags = {
    canAccessAddressBook?: boolean;
    canViewAddress?: boolean;
    loading?: boolean;
};
export declare const resolveAddressesContextMode: (contextMode?: AddressContextMode, selectable?: boolean) => AddressContextMode;
export declare const resolveEnforceB2BPermissions: (resolvedContextMode: AddressContextMode) => boolean;
export declare const resolveIsCheckoutContext: (resolvedContextMode: AddressContextMode) => boolean;
export declare const resolveIsB2BCandidate: (b2bEnabled?: boolean, isB2BCustomer?: boolean) => boolean;
export declare const resolveHasB2BContainerAccess: (permissions?: AddressPermissionsFlags) => boolean;
export declare const resolveIsB2BWithoutViewAccess: ({ isB2BCandidate, isCompanyAddressBookEnabled, enforceB2BPermissions, permissions, hasB2BContainerAccess, }: {
    isB2BCandidate: boolean;
    isCompanyAddressBookEnabled: boolean;
    enforceB2BPermissions: boolean;
    permissions?: AddressPermissionsFlags;
    hasB2BContainerAccess: boolean;
}) => boolean;
export declare const resolveIsB2BFlow: ({ isB2BCandidate, isCompanyAddressBookEnabled, isB2BWithoutViewAccess, }: {
    isB2BCandidate: boolean;
    isCompanyAddressBookEnabled: boolean;
    isB2BWithoutViewAccess: boolean;
}) => boolean;
export declare const resolveIsAddressSelectionLocked: ({ isCheckoutContext, isB2BFlow, selectable, isCustomShippingAddressAllowed, selectShipping, selectBilling, }: {
    isCheckoutContext: boolean;
    isB2BFlow: boolean;
    selectable?: boolean;
    isCustomShippingAddressAllowed: boolean;
    selectShipping?: boolean;
    selectBilling?: boolean;
}) => boolean;
export declare const shouldSkipAddressFetchForCustomerType: ({ b2bEnabled, customerTypeLoading, }: {
    b2bEnabled?: boolean;
    customerTypeLoading: boolean;
}) => boolean;
export declare const shouldSkipAddressFetchForPermissions: ({ isB2BCandidate, enforceB2BPermissions, permissionsLoading, }: {
    isB2BCandidate: boolean;
    enforceB2BPermissions: boolean;
    permissionsLoading?: boolean;
}) => boolean;
export declare const shouldReturnEmptyForRestrictedB2B: ({ isB2BCandidate, enforceB2BPermissions, hasB2BContainerAccess, }: {
    isB2BCandidate: boolean;
    enforceB2BPermissions: boolean;
    hasB2BContainerAccess: boolean;
}) => boolean;
export declare const shouldApplyB2BAddressBookFlow: (isB2BCandidate: boolean) => boolean;
export declare const shouldReturnEmptyWithinAddressBook: ({ enforceB2BPermissions, hasB2BContainerAccess, }: {
    enforceB2BPermissions: boolean;
    hasB2BContainerAccess: boolean;
}) => boolean;
export {};
