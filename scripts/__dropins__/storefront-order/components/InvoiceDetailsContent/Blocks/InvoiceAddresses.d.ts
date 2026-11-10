/********************************************************************
 * ADOBE CONFIDENTIAL
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
import { OrderAddressModel } from '../../../data/models/index.js';
type TranslationsType = Record<string, string>;
export declare const InvoiceAddresses: ({ translations, billingAddress, shippingAddress, }: {
    translations: TranslationsType;
    billingAddress?: OrderAddressModel;
    shippingAddress?: OrderAddressModel;
}) => import("preact").JSX.Element;
export {};
