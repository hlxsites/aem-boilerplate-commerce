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
import { Wishlist } from '../../data/models/wishlist';
export type WishlistVisibility = 'PUBLIC' | 'PRIVATE';
/**
 * Creates a new, additional wishlist for the logged-in customer.
 *
 * Creating a wishlist is a server-side, customer-scoped operation and
 * requires the store to have multiple wishlists enabled. Guests have a
 * single local list and cannot create additional lists, so the call is a
 * no-op for them. The default wishlist and guest behavior are unchanged.
 *
 * @param name The name of the wishlist to create.
 * @param visibility Whether the wishlist is PRIVATE (default) or PUBLIC.
 * @returns The created wishlist, or null.
 */
export declare const createWishlist: (name: string, visibility?: WishlistVisibility) => Promise<Wishlist | null>;
