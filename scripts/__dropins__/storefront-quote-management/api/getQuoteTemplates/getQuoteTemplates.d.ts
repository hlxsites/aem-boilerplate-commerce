/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { NegotiableQuoteTemplatesListModel } from '../../data/models/negotiable-quote-template-model';
export declare enum QuoteTemplateFilterStatus {
    ACTIVE = "ACTIVE",
    IN_REVIEW = "IN_REVIEW",
    INACTIVE = "INACTIVE"
}
export interface QuoteTemplateFilterInput {
    status?: QuoteTemplateFilterStatus[];
    name?: {
        match?: string;
    };
}
export declare enum QuoteTemplateSortField {
    NAME = "NAME",
    CREATED_AT = "CREATED_AT",
    UPDATED_AT = "UPDATED_AT"
}
export declare enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}
export interface QuoteTemplateSortInput {
    sortField: QuoteTemplateSortField;
    sortDirection: SortDirection;
}
export interface GetQuoteTemplatesParams {
    filter?: QuoteTemplateFilterInput;
    pageSize?: number;
    currentPage?: number;
    sort?: QuoteTemplateSortInput;
}
export declare const getQuoteTemplates: (params?: GetQuoteTemplatesParams) => Promise<NegotiableQuoteTemplatesListModel>;
