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
import { CustomerAddressesModel } from '../data/models';
type AddressPermissionFlags = {
    canCreateAddress?: boolean;
    canSetDefaultAddress?: boolean;
    loading?: boolean;
};
export type B2BDefaultCheckBoxRules = {
    showShipping: boolean;
    showBilling: boolean;
    shippingDefaultValue: boolean;
    billingDefaultValue: boolean;
};
export type AddressValidationAlertKey = 'noPermissionEditAddresses' | 'noPermissionCreateAddresses' | 'companyAddressSingleDefaultType';
export declare const resolveShouldEnforceB2BPermissions: (isB2BFlow?: boolean, enforceB2BPermissions?: boolean) => boolean;
export declare const resolveTemporaryCheckoutAddressMode: ({ isB2BFlow, shouldEnforceB2BPermissions, permissions, }: {
    isB2BFlow?: boolean;
    shouldEnforceB2BPermissions: boolean;
    permissions?: AddressPermissionFlags;
}) => boolean;
export declare const hasSingleDefaultTypeViolation: (isB2BFlow: boolean | undefined, requestPayload: CustomerAddressesModel) => boolean;
export declare const shouldOmitDefaultFlagsFromPayload: (shouldEnforceB2BPermissions: boolean, canSetDefaultAddress?: boolean) => boolean;
export declare const canSetAddressAsDefault: ({ requestPayload, shouldEnforceB2BPermissions, canSetDefaultAddress, }: {
    requestPayload: CustomerAddressesModel;
    shouldEnforceB2BPermissions: boolean;
    canSetDefaultAddress?: boolean;
}) => boolean;
export declare const canSetDefaultAddressInForm: ({ isTemporaryCheckoutAddressMode, shouldEnforceB2BPermissions, canSetDefaultAddress, }: {
    isTemporaryCheckoutAddressMode: boolean;
    shouldEnforceB2BPermissions: boolean;
    canSetDefaultAddress?: boolean;
}) => boolean;
export declare const getSanitizedAddressPayload: ({ requestPayload, shouldEnforceB2BPermissions, canSetDefaultAddress, }: {
    requestPayload: CustomerAddressesModel;
    shouldEnforceB2BPermissions: boolean;
    canSetDefaultAddress?: boolean;
}) => CustomerAddressesModel;
export declare const resolveUpdateAddressAlertKey: ({ shouldEnforceB2BPermissions, canEditAddress, isB2BFlow, requestPayload, }: {
    shouldEnforceB2BPermissions: boolean;
    canEditAddress?: boolean;
    isB2BFlow?: boolean;
    requestPayload: CustomerAddressesModel;
}) => AddressValidationAlertKey | undefined;
export declare const resolveCreateAddressAlertKey: ({ shouldEnforceB2BPermissions, canCreateAddress, isB2BFlow, requestPayload, }: {
    shouldEnforceB2BPermissions: boolean;
    canCreateAddress?: boolean;
    isB2BFlow?: boolean;
    requestPayload: CustomerAddressesModel;
}) => AddressValidationAlertKey | undefined;
export declare const resolveAddressFormErrorMessage: (error: unknown) => string;
type ResolveB2BDefaultCheckBoxRulesArgs = {
    isB2BFlow?: boolean;
    showShippingCheckBox?: boolean;
    showBillingCheckBox?: boolean;
    shippingCheckBoxValue?: boolean;
    billingCheckBoxValue?: boolean;
    addressId?: string;
    hasDefaultShippingAddress?: boolean;
    hasDefaultBillingAddress?: boolean;
};
export declare const resolveB2BDefaultCheckBoxRules: ({ isB2BFlow, showShippingCheckBox, showBillingCheckBox, shippingCheckBoxValue, billingCheckBoxValue, addressId, hasDefaultShippingAddress, hasDefaultBillingAddress, }: ResolveB2BDefaultCheckBoxRulesArgs) => B2BDefaultCheckBoxRules;
export {};
