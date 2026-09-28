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
 * Tears down all client-side authentication state.
 *
 * Every logout path must go through here so the sequences cannot drift apart —
 * see `revokeCustomerToken` (user-initiated) and the website-switch check in
 * `initialize` (forced).
 *
 * @param authHeader - Name of the authorization header to remove
 */
export declare const clearAuthState: (authHeader: string) => Promise<void>;
