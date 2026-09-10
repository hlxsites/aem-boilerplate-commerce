/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
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
import { StoreConfig } from '../data/models';
type State = {
    authenticated: boolean;
    cartId?: string | null;
    config: StoreConfig | null;
    initialized: boolean;
    quoteId?: string | null;
};
export declare const state: State;
export declare function isQuoteCheckout(): boolean;
export declare function isCartCheckout(): boolean;
export {};
