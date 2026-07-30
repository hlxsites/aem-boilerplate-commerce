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
import { Cart, NegotiableQuote } from '../data/models';
type DataModel = Cart | NegotiableQuote;
export declare function getInitialCheckoutData(): DataModel | null;
export declare function getLatestCheckoutUpdate(): DataModel | null;
export declare function getCheckoutData(): DataModel | null;
export declare function hasShippingAddress(): boolean;
export declare function getCartEmail(): string | null;
export {};
