/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 * Copyright 2026 Adobe
 * All Rights Reserved.
 *
 * NOTICE: All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 *******************************************************************/
import { Wishlist } from '../../data/models/wishlist';
/**
 * Fetches ALL wishlist items across all pages and stores them in the
 * in-memory all-items store. Called non-blocking after initialization
 * so WishlistToggle can accurately determine heart icon state for
 * products on any page.
 *
 * Uses a generation check to abort if the store was reset or re-seeded
 * (e.g. logout, auth change, or mutation) while fetches were in flight.
 */
export declare function populateAllWishlistItems(wishlistId: string, firstPageWishlist: Wishlist, pageSize: number): Promise<void>;
