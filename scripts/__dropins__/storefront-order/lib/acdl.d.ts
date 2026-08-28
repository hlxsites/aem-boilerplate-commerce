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
import { OrderDataModel } from '../data/models';
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts
 */
export declare const contexts: {
    SHOPPING_CART_CONTEXT: string;
    ORDER_CONTEXT: string;
    CHANNEL_CONTEXT: string;
    PERSONAL_EMAIL_CONTEXT: string;
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    PLACE_ORDER: string;
};
export declare function getAdobeDataLayer(): any;
export declare function setChannelContext(): void;
export declare function publishPlaceOrderEvent(cartId: string, data: OrderDataModel): void;
