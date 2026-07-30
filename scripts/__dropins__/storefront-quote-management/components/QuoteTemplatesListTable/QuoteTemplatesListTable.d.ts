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
export interface QuoteTemplatesListTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'loading' | 'children'> {
    rowData: QuoteTemplateRowData[];
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
export type QuoteTemplateRowData = {
    id: string;
    name: VNode;
    state: VNode;
    status: VNode;
    validUntil: VNode;
    minQuoteTotal: VNode;
    ordersPlaced: VNode;
    lastOrdered: VNode;
    actions: VNode;
    [key: string]: VNode | string | number | undefined;
};
export declare const QuoteTemplatesListTable: FunctionComponent<QuoteTemplatesListTableProps>;
