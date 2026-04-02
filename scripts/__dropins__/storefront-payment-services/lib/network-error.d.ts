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
 * A function which can be attached to fetchGraphQL to handle thrown errors in
 * a generic way (same pattern as storefront-account). Uses `source: payment-services`
 * so listeners can attribute failures to this drop-in.
 */
export declare const handleNetworkError: (error: Error) => never;
//# sourceMappingURL=network-error.d.ts.map