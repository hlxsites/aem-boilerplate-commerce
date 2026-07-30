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
 * Minimal token validation query. Compatible with ACCS and ACO backends.
 * Does not request group.uid — use VALIDATE_CUSTOMER_TOKEN_WITH_GROUP for ACO.
 */
export declare const VALIDATE_CUSTOMER_TOKEN = "\n  query VALIDATE_TOKEN {\n    customer {\n      firstname\n    }\n  }\n";
/**
 * Token validation query that also fetches customer group UID for ACO price book resolution.
 * Only use when adobeCommerceOptimizer is enabled — requires ACO backend with group.uid support.
 */
export declare const VALIDATE_CUSTOMER_TOKEN_WITH_GROUP = "\n  query VALIDATE_TOKEN_WITH_GROUP {\n    customer {\n      firstname\n      group {\n        uid\n      }\n    }\n  }\n";
