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
export declare const STORE_CONFIG_SESSION_KEY = "storeConfig";
export declare const getCookie: (cookieName: string) => undefined;
export declare const deleteCookie: (cookieName: string) => void;
/**
 * Shared attribute string for every auth cookie, so the token and its metadata
 * cannot end up with different scopes or lifetimes.
 *
 * The `Secure` flag is omitted on localhost (fix for Safari).
 *
 * @param lifetime - `Max-Age=<seconds>` string for the cookie
 */
export declare const getAuthCookieAttributes: (lifetime: string) => string;
export interface AuthCookieContext {
    /** `Max-Age=<seconds>` derived from `customerAccessTokenLifetime`. */
    lifetime: string;
    /** Website the token is being issued for. */
    websiteCode: string;
}
/**
 * Resolves the store config needed to persist a freshly issued token.
 *
 * Bypasses both caches on purpose. The `storeConfig` in `sessionStorage` is a
 * UI cache that any component can populate for any website on the same origin,
 * and the HTTP cache is keyed by an endpoint URL that is identical across
 * websites, so neither can be trusted to describe the website the token
 * belongs to.
 *
 * Refreshes the `sessionStorage` cache as a side effect, so UI consumers stay
 * aligned with the website the user just logged into.
 */
export declare const getAuthCookieContext: () => Promise<AuthCookieContext>;
