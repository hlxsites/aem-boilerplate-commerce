/**
 * ADOBE CONFIDENTIAL
 * __________________
 * Copyright 2023 Adobe
 * All Rights Reserved.
 * __________________
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 */
import { ProductModel } from '../data/models';
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/contexts.ts
 */
export declare const contexts: {
    PRODUCT_CONTEXT: string;
    CHANNEL_CONTEXT: string;
};
/**
 * See: https://github.com/adobe/commerce-events/blob/main/packages/storefront-events-sdk/src/events.ts
 */
export declare const events: {
    PRODUCT_PAGE_VIEW: string;
};
export declare function getAdobeDataLayer(): any;
export declare function getChannelContext(): {
    _id: string;
    _type: string;
};
export declare function setChannelContext(): void;
export declare function publishProductPageViewEvent(product: ProductModel): void;
