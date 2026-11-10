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
import { SearchProps, SearchItem } from '../../types/search.types.js';
declare const SearchComponent: <T extends SearchItem = SearchItem>({ t, value, onChange, items, shouldShowResults, className, onItemClick, slots, }: SearchProps<T>) => import("preact").JSX.Element;
export declare const Search: typeof SearchComponent;
export {};
