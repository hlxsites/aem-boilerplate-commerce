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
import { CartModel } from '../data/models';
export declare function setPersistedCartData(data: CartModel | null): void;
export declare function getPersistedCartData(): CartModel | null;
export declare function setEstimatedShippingLocation(data: {
    [key: string]: string;
} | null): void;
export declare function getEstimatedShippingLocation(): {
    [key: string]: string;
} | null;
export declare function setAuthenticatedCart(isAuthenticated: boolean): void;
export declare function getAuthenticatedCart(): boolean;
