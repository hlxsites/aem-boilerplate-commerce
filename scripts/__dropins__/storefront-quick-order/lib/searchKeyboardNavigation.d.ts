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
export interface KeyboardNavigationResult {
    nextIndex: number;
    shouldFocusElement?: HTMLElement | null;
    shouldPreventDefault: boolean;
}
/**
 * Calculates next active index when ArrowDown is pressed
 */
export declare const handleArrowDown: (currentIndex: number, itemsLength: number, itemRefs: (HTMLElement | null)[]) => KeyboardNavigationResult;
/**
 * Calculates next active index when ArrowUp is pressed
 */
export declare const handleArrowUp: (currentIndex: number, inputRef: HTMLElement | null, itemRefs: (HTMLElement | null)[]) => KeyboardNavigationResult;
/**
 * Handles Enter key press on active item
 */
export declare const handleEnterKey: <T>(activeIndex: number, items: T[], onItemSelect: (item: T) => void) => boolean;
/**
 * Handles Escape key press
 */
export declare const handleEscapeKey: (initialValue: string, inputRef: HTMLElement | null, onValueRestore: (value: string) => void, onClose: () => void) => void;
/**
 * Focuses an element if it exists and has focus method
 */
export declare const focusElement: (element: HTMLElement | null) => void;
//# sourceMappingURL=searchKeyboardNavigation.d.ts.map