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
export interface StoreConfigModel {
    baseMediaUrl: string;
    orderCancellationEnabled: boolean;
    orderCancellationReasons: OrderCancellationReason[];
    shoppingCartDisplayPrice: 1 | 2 | 3;
    shoppingOrdersDisplayShipping: 1 | 2 | 3;
    shoppingOrdersDisplaySubtotal: 1 | 2 | 3;
    shoppingOrdersDisplayFullSummary: boolean;
    shoppingOrdersDisplayGrandTotal: boolean;
    shoppingOrdersDisplayZeroTax: boolean;
}
export interface OrderCancellationReason {
    description: string;
}
//# sourceMappingURL=store-config.d.ts.map