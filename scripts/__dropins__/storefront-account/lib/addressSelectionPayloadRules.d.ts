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
export declare const isEmpty: (obj: any) => boolean;
export declare const sanitizeB2BCheckoutAddressPayload: (payloadData: Record<string, any>) => Record<string, any>;
export declare const resolveAddressSelectionPayloadData: ({ item, isCheckoutContext, selectable, isB2BFlow, }: {
    item?: CustomerAddressesModel;
    isCheckoutContext: boolean;
    selectable?: boolean;
    isB2BFlow: boolean;
}) => {
    selectedItem: CustomerAddressesModel | undefined;
    data: Record<string, any>;
};
