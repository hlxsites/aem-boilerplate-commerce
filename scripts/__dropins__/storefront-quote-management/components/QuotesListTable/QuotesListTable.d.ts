/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { FunctionComponent, VNode } from 'preact';
import { HTMLAttributes } from 'preact/compat';
export interface QuotesListTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading' | 'children'> {
    rowData: QuoteRowData[];
    loading?: boolean;
    className?: string;
    emptyStateMessage?: VNode;
    showItemRange?: boolean;
    itemRangeMessage?: VNode;
    showPageSizePicker?: boolean;
    pageSizePickerMessage?: VNode;
    showPagination?: boolean;
    paginationMessage?: VNode;
}
export type QuoteRowData = {
    id: string;
    quoteName: VNode;
    created: VNode;
    createdBy: VNode;
    status: VNode;
    lastUpdated: VNode;
    quoteTemplate: VNode;
    quoteTotal: VNode;
    actions: VNode;
    [key: string]: VNode | string | number | undefined;
};
export declare const QuotesListTable: FunctionComponent<QuotesListTableProps>;
