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
export declare const RECOMMENDATION_UNIT_FRAGMENT = "\n  fragment RECOMMENDATION_UNIT_FRAGMENT on RecommendationUnit {\n    displayOrder\n    productsView {\n      ...PRODUCTS_VIEW_FRAGMENT\n    }\n    storefrontLabel\n    totalProducts\n    typeId\n    unitId\n    unitName\n    userError\n  }\n\n  \n  fragment PRODUCTS_VIEW_FRAGMENT on ProductView {\n    __typename\n    name\n    sku\n    queryType\n    visibility\n    inStock\n    images {\n      url\n    }\n    urlKey\n    ... on SimpleProductView {\n      price {\n        final {\n          amount {\n            currency\n            value\n          }\n        }\n      }\n    }\n    ... on ComplexProductView {\n      priceRange {\n        maximum {\n          final {\n            amount {\n              currency\n              value\n            }\n          }\n        }\n        minimum {\n          final {\n            amount {\n              currency\n              value\n            }\n          }\n        }\n      }\n    }\n  }\n\n";
