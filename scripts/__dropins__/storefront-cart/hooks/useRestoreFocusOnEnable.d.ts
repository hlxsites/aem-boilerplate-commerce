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
import { RefObject } from 'preact';
/**
 * Disabling the currently focused field while an async update runs (e.g. via
 * a shared `fieldsDisabled` flag) makes the browser blur it to the body, and
 * it isn't refocused once re-enabled. This hook restores focus to whatever
 * was focused when `captureFocus` was called, once `disabled` turns false
 * again, falling back to `fallbackSelector` within `containerRef` if the
 * original element is no longer in the document. Focus is only restored if
 * it is still lost (on the body).
 */
export declare const useRestoreFocusOnEnable: (disabled: boolean, containerRef: RefObject<HTMLElement>, fallbackSelector?: string) => () => void;
