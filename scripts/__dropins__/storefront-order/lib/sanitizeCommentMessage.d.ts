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
 * Sanitizes an order-comment string down to a fixed allowlist of inline
 * formatting tags (`<br>`, `<b>`, `<i>`) with no attributes. Everything
 * else — any other tag, any attribute (href, src, onerror, etc.) — is
 * stripped. Safe to use with dangerouslySetInnerHTML because DOMPurify
 * guarantees only this allowlisted markup can survive sanitize().
 */
export declare function sanitizeCommentMessage(message: string): string;
