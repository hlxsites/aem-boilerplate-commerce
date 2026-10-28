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
 * Split out of CART_FRAGMENT: the free-gift catalog payload (products,
 * configurable options, bundle items) is heavy and only needed when the
 * gift picker is shown, so it is fetched lazily via its own query instead
 * of on every cart operation (add to cart, apply coupon, etc.).
 */
export declare const AVAILABLE_FREE_GIFTS_FRAGMENT = "\n  fragment AVAILABLE_FREE_GIFTS_FRAGMENT on Cart {\n    available_free_gifts {\n      rule_id\n      rule_label\n      gift_qty\n      available_skus\n      products {\n        __typename\n        sku\n        name\n        thumbnail {\n          url\n          label\n        }\n        ... on ConfigurableProduct {\n          configurable_options {\n            uid\n            attribute_uid\n            label\n            values {\n              uid\n              label\n            }\n          }\n        }\n        ... on BundleProduct {\n          items {\n            uid\n            title\n            required\n            type\n            position\n            sku\n            price_range {\n              minimum_price {\n                final_price {\n                  value\n                  currency\n                }\n                regular_price {\n                  value\n                  currency\n                }\n              }\n              maximum_price {\n                final_price {\n                  value\n                  currency\n                }\n                regular_price {\n                  value\n                  currency\n                }\n              }\n            }\n            options {\n              uid\n              quantity\n              position\n              is_default\n              label\n              can_change_quantity\n              product {\n                uid\n                name\n                sku\n                __typename\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n";
