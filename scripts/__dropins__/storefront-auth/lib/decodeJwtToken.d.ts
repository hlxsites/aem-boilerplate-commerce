/********************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2024 Adobe
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
export interface JwtPayload {
    [key: string]: unknown;
    exp?: number;
    iat?: number;
    sub?: string;
    isAdmin?: boolean;
    admin?: boolean;
    role?: string;
}
/**
 * Decodes JWT token payload without verification
 * JWT format: header.payload.signature
 * We only decode the payload part (base64url encoded)
 *
 * @param token - JWT token string
 * @returns Decoded payload object or null if invalid
 */
export declare const decodeJwtToken: (token: string) => JwtPayload | null;
/**
 * Sets the admin session cookie with the same lifetime as the auth token
 */
export declare const setAdminSessionCookie: () => Promise<void>;
/**
 * Deletes the admin session cookie
 */
export declare const deleteAdminSessionCookie: () => void;
/**
 * Checks if JWT token belongs to an admin user
 * Checks multiple possible admin indicators in token payload
 *
 * @param token - JWT token string
 * @returns true if token indicates admin user, false otherwise
 */
export declare const isAdminToken: (token: string) => boolean;
//# sourceMappingURL=decodeJwtToken.d.ts.map