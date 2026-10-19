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
/**
 * See the CartItemInput type in the Adobe Commerce GraphQL API reference:
 * https://developer.adobe.com/commerce/webapi/reference/graphql/saas/types-c-e#cartiteminput/.
 */
export interface CartItem {
    sku: string;
    quantity: number;
    parentSku?: string;
    selectedOptions?: (string | number)[];
    enteredOptions?: {
        uid: string | number;
        value: string;
    }[];
}
/**
 * See the CartItemInput type in the Adobe Commerce GraphQL API reference:
 * https://developer.adobe.com/commerce/webapi/reference/graphql/saas/types-c-e#cartiteminput/.
 */
export interface CartItemInput {
    sku: string;
    quantity: number;
    parent_sku?: string;
    selected_options?: (string | number)[];
    entered_options?: {
        uid: string | number;
        value: string;
    }[];
}
//# sourceMappingURL=cartItem.d.ts.map