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
type FilterB2BCheckoutAddressesByTypeArgs = {
    addresses: CustomerAddressesModel[];
    isCheckoutContext: boolean;
    selectable?: boolean;
    selectShipping?: boolean;
    selectBilling?: boolean;
};
export declare const filterB2BCheckoutAddressesByType: ({ addresses, isCheckoutContext, selectable, selectShipping, selectBilling, }: FilterB2BCheckoutAddressesByTypeArgs) => CustomerAddressesModel[];
export {};
