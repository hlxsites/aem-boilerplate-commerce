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
import { HTMLAttributes } from 'preact/compat';
import { OrderDataModel, StoreConfigModel } from '../data/models';
type TaxTypes = {
    taxIncluded: boolean;
    taxExcluded: boolean;
};
export interface StoreConfigProps extends Omit<StoreConfigModel, 'orderCancellationEnabled' | 'orderCancellationReasons' | 'shoppingOrderDisplayPrice' | 'shoppingOrdersDisplayShipping' | 'shoppingOrdersDisplaySubtotal'> {
    shoppingOrderDisplayPrice: TaxTypes;
    shoppingOrdersDisplayShipping: TaxTypes;
    shoppingOrdersDisplaySubtotal: TaxTypes;
    salesPrintedCard: TaxTypes;
    salesGiftWrapping: TaxTypes;
}
export interface OrderCostSummaryProps extends HTMLAttributes<HTMLDivElement> {
    orderData?: OrderDataModel;
    withHeader?: boolean;
}
export interface OrderCostSummaryContentProps {
    order?: OrderDataModel;
    withHeader?: boolean;
    loading?: boolean;
    storeConfig: StoreConfigProps | null;
    translations: Record<string, string>;
}
export interface UseOrderCostSummaryProps {
    orderData?: OrderDataModel;
    config: StoreConfigModel | null;
}
export {};
