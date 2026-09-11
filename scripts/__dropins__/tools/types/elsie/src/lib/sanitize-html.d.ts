/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { type Config } from 'dompurify';
/**
 * Configuration accepted by {@link sanitizeHtml} and
 * {@link createSanitizedHtml}. It mirrors DOMPurify's options while
 * excluding the ones that make it return something other than an HTML
 * string, so the result is always safe to feed into
 * `dangerouslySetInnerHTML`.
 */
export type SanitizeHtmlConfig = Omit<Config, 'RETURN_DOM' | 'RETURN_DOM_FRAGMENT' | 'RETURN_TRUSTED_TYPE'>;
/**
 * The default set of tags allowed by {@link sanitizeHtml} and
 * {@link createSanitizedHtml}: basic inline text formatting only.
 *
 * This is intentionally restrictive (least privilege) since the helpers
 * are meant for small rich-text snippets. Callers that need more can
 * spread this list and extend it, e.g.
 * `sanitizeHtml(html, { ALLOWED_TAGS: [...DEFAULT_ALLOWED_TAGS, 'a'] })`.
 */
export declare const DEFAULT_ALLOWED_TAGS: readonly ["b", "strong", "i", "em", "u", "s", "br", "span"];
/**
 * Sanitizes an untrusted HTML string, stripping any markup that could
 * lead to XSS (scripts, event handlers, dangerous URLs, etc.).
 *
 * By default only basic inline formatting tags are kept (see
 * {@link DEFAULT_ALLOWED_TAGS}). Pass a custom `ALLOWED_TAGS` to override.
 *
 * @param {string} dirty - The untrusted HTML string to sanitize.
 * @param {SanitizeHtmlConfig} [config] - Optional DOMPurify configuration.
 * @returns {string} - The sanitized HTML string.
 */
export declare function sanitizeHtml(dirty: string, config?: SanitizeHtmlConfig): string;
/**
 * Sanitizes an untrusted HTML string and wraps it in the shape expected
 * by Preact's/React's `dangerouslySetInnerHTML` prop.
 *
 * @example
 * <div dangerouslySetInnerHTML={createSanitizedHtml(userContent)} />
 *
 * @param {string} dirty - The untrusted HTML string to sanitize.
 * @param {SanitizeHtmlConfig} [config] - Optional DOMPurify configuration.
 * @returns {{ __html: string }} - Object ready for `dangerouslySetInnerHTML`.
 */
export declare function createSanitizedHtml(dirty: string, config?: SanitizeHtmlConfig): {
    __html: string;
};
