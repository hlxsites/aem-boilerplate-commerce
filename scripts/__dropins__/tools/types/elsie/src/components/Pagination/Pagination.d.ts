/********************************************************************
 *  Copyright 2024 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent } from 'preact';
export interface PaginationProps {
    className?: string;
    currentPage?: number;
    totalPages?: number;
    onChange?: (currentPage: number, e?: Event) => void;
    routePage?: (page: number) => string;
}
export type PaginationList = {
    page: number | string;
    isActive: boolean;
    label: number | string;
};
export declare const Pagination: FunctionComponent<PaginationProps>;
