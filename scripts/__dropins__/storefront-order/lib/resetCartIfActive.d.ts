/********************************************************************
 * ADOBE CONFIDENTIAL
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
 * Emits `cart/reset` after an order is placed, unless the order was placed
 * from a cart other than the shopper's active cart (e.g. a separate cart
 * created by an express payment button on a product page). When the active
 * cart is unknown, the reset is emitted to preserve the previous behavior.
 *
 * `cart/data` is owned/typed by `@dropins/storefront-cart`, not this package,
 * so we read it via an untyped key and narrow it locally instead of
 * redeclaring it in this package's event-bus module augmentation (which would
 * conflict with storefront-cart's own, richer type for the same key).
 */
export declare const resetCartIfActive: (placedCartId: string) => void;
