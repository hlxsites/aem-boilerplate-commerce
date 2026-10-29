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
import React from 'preact/compat';
import { SearchItem } from '../types/search.types.js';
export interface UseSearchOptions<T extends SearchItem> {
    value: string;
    onChange?: (e: any) => void;
    items: T[];
    shouldShowResults?: boolean;
    onItemClick?: (item: T) => void;
}
export interface UseSearchReturn<T extends SearchItem> {
    activeIndex: number;
    showResults: boolean;
    showEmptyState: boolean;
    resultsId: React.MutableRefObject<string>;
    inputRef: React.RefObject<HTMLInputElement>;
    itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
    containerRef: React.RefObject<HTMLDivElement>;
    handleChange: (e: any) => void;
    handleFocus: () => void;
    handleBlur: () => void;
    handleKeyDown: (e: KeyboardEvent) => void;
    createItemClickHandler: (item: T) => () => void;
    getActiveDescendant: () => string | undefined;
}
export declare const useSearch: <T extends SearchItem = SearchItem>({ value, onChange, items, shouldShowResults, onItemClick, }: UseSearchOptions<T>) => UseSearchReturn<T>;
