/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2025 Adobe
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
export interface PurchaseOrderModel {
    typename: string;
    uid: string;
    number: string;
    status: string;
    availableActions: string[];
    approvalFlow: {
        ruleName: string;
        events: Array<{
            message: string;
            name: string;
            role: string;
            status: string;
            updatedAt: string;
        }>;
    } | null;
    comments?: Array<{
        createdAt: string;
        author: {
            firstname: string;
            lastname: string;
            email: string;
        };
        text: string;
    }>;
    createdAt: string;
    updatedAt: string;
    createdBy: {
        firstname: string;
        lastname: string;
        email: string;
    };
    historyLog?: Array<{
        activity: string;
        createdAt: string;
        message: string;
        uid: string;
    }>;
    order: {
        orderNumber: string;
        id: string;
    };
    quote: {
        id: string;
        prices: {
            grandTotal: {
                value: number;
                currency: string;
            };
        };
        itemsV2: {
            items?: Array<{
                uid: string;
                quantity: number;
            }>;
        };
    } | null;
}
//# sourceMappingURL=purchase-order-model.d.ts.map