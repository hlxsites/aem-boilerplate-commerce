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
import { Wishlist, Item } from '../data/models';
export declare function setPersistedWishlistData(data: Wishlist | null): void;
export declare function getPersistedWishlistData(guest?: boolean): Wishlist | {};
export declare function clearPersistedLocalStorage(): void;
export declare function getWishlistItemFromStorage(productSku: string, optionUIDs?: string[]): any;
export declare function getAllItemsCacheVersion(): number;
export declare function setPersistedAllWishlistItems(items: Item[]): void;
export declare function getPersistedAllWishlistItems(): Item[];
export declare function clearPersistedAllWishlistItems(): void;
export declare function addToPersistedAllWishlistItems(items: Item[]): void;
export declare function removeFromPersistedAllWishlistItems(items: Item[]): void;
export declare function findInPersistedAllWishlistItems(sku: string, optionUIDs?: string[]): Item | undefined;
