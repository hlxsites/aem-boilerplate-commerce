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
export declare const CUSTOMER_REVIEW_FRAGMENT = "\n  fragment CUSTOMER_REVIEW_FRAGMENT on ProductReview {\n    nickname\n    summary\n    text\n    average_rating\n    created_at\n    product {\n      sku\n      name\n      url_key\n      thumbnail {\n        url\n        label\n      }\n    }\n    ratings_breakdown {\n      name\n      value\n    }\n  }\n";
