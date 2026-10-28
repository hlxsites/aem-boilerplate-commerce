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
import { Scope } from '../../data/models/index.js';
export interface PaginationProps extends HTMLAttributes<HTMLDivElement> {
    scope?: Scope;
    onPageChange?: (page: number) => void;
}
export declare const Pagination: Container<PaginationProps>;
