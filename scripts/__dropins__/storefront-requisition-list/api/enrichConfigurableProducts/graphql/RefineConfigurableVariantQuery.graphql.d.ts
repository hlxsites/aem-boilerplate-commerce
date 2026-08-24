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
export declare const REFINE_CONFIGURABLE_VARIANT_QUERY = "\nquery REFINE_CONFIGURABLE_VARIANT_QUERY($sku: String!, $optionIds: [String!]!) {\n  refineProduct(sku: $sku, optionIds: $optionIds) {\n    ...PRODUCT_VARIANT_FRAGMENT\n  }\n}\n\nfragment PRODUCT_VARIANT_FRAGMENT on ProductView {\n  sku\n  name\n  images(roles: []) {\n    url\n  }\n  ... on SimpleProductView {\n    price {\n      regular {\n        amount {\n          value\n          currency\n        }\n      }\n      final {\n        amount {\n          value\n          currency\n        }\n      }\n    }\n  }\n}\n";
