/********************************************************************
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface LiveRegionProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * The message announced to screen readers. Pass an empty string to clear
     * a previous announcement without removing the element from the DOM.
     *
     * The element must always remain mounted — never conditionally render it.
     * Browsers and assistive technology only observe live region updates when
     * the *content* of an already-mounted region changes.
     */
    message?: string;
    /** Controls the announcement urgency. Defaults to "polite". */
    politeness?: 'polite' | 'assertive';
}
/**
 * Renders a visually-hidden, always-mounted live region element.
 *
 * Uses `aria-live` and `aria-atomic` exclusively — setting both a semantic
 * `role` (e.g. "alert"/"status") and an explicit `aria-live` attribute on the
 * same element is redundant and can cause screen readers to double-announce
 * updates. `aria-live="polite"` is the standard equivalent of `role="status"`;
 * `aria-live="assertive"` is the equivalent of `role="alert"`.
 *
 * Use this component alongside loading indicators (Skeleton, ProgressSpinner)
 * or whenever content changes without a focus move, to satisfy WCAG 4.1.3
 * (Status Messages).
 *
 * @example
 * ```tsx
 * // Correct: LiveRegion is always mounted; only its message toggles.
 * <LiveRegion message={loading ? 'Loading order summary' : ''} />
 * {loading && <ProgressSpinner />}
 * ```
 *
 * @example
 * ```tsx
 * // Incorrect: do NOT conditionally render LiveRegion.
 * {loading && <LiveRegion message="Loading…" />}
 * ```
 */
export declare const LiveRegion: FunctionComponent<LiveRegionProps>;
