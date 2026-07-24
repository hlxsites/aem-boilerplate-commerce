/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuotesListModel } from '../../data/models/negotiable-quote-model';
export declare enum FilterMatchTypeEnum {
    FULL = "FULL",
    PARTIAL = "PARTIAL"
}
export interface FilterEqualTypeInput {
    eq?: string;
    in?: string[];
}
export interface FilterMatchTypeInput {
    match?: string;
    match_type?: FilterMatchTypeEnum;
}
export interface NegotiableQuoteFilterInput {
    ids?: FilterEqualTypeInput;
    name?: FilterMatchTypeInput;
}
export declare enum SortEnum {
    ASC = "ASC",
    DESC = "DESC"
}
export declare enum NegotiableQuoteSortableField {
    QUOTE_NAME = "QUOTE_NAME",
    CREATED_AT = "CREATED_AT",
    UPDATED_AT = "UPDATED_AT"
}
export interface NegotiableQuoteSortInput {
    sort_direction: SortEnum;
    sort_field: NegotiableQuoteSortableField;
}
export interface NegotiableQuotesParams {
    filter?: NegotiableQuoteFilterInput;
    pageSize?: number;
    currentPage?: number;
    sort?: NegotiableQuoteSortInput;
}
export declare const negotiableQuotes: (params?: NegotiableQuotesParams) => Promise<NegotiableQuotesListModel>;
