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
import { PaymentMethodConfig } from '..';
export declare enum HandlerCode {
    PaymentOnAccount = "companycredit",
    PurchaseOrder = "purchaseorder"
}
export declare const handleRefNumberChange: (code: string, isRequired: boolean) => {
    (this: any, ...args: any[]): void;
    cancel(): void;
};
export declare const resetHandlersCache: () => void;
export declare const createHandler: (code: HandlerCode) => PaymentMethodConfig;
export declare const defaultHandlers: {
    companycredit: PaymentMethodConfig;
    purchaseorder: PaymentMethodConfig;
};
