/********************************************************************
 * ADOBE CONFIDENTIAL
 *
 *  Copyright 2024 Adobe
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
import { OrderDataModel } from '../../../data/models';
import { TaxTypes } from '../../../types';
type translationsTypes = Record<string, string>;
export declare const Subtotal: ({ translations, order, subtotalInclTax, subtotalExclTax, shoppingOrdersDisplaySubtotal, }: {
    translations: translationsTypes;
    order?: OrderDataModel;
    subtotalInclTax: number;
    subtotalExclTax: number;
    shoppingOrdersDisplaySubtotal: TaxTypes;
}) => import("preact").JSX.Element;
export {};
