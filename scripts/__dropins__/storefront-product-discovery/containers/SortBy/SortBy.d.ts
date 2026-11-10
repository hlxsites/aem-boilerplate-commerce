/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { HTMLAttributes } from 'preact/compat';
import { Container } from '@dropins/tools/lib';
import { Scope, SortOrder } from '../../data/models/index.js';
export interface SortByProps extends HTMLAttributes<HTMLDivElement> {
    scope?: Scope;
    onSortChange?: (value: SortOrder | null) => void;
}
export declare const SortBy: Container<SortByProps>;
