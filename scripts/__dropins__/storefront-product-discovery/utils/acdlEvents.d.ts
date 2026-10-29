/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
import { ProductSearchResponse } from '../data/models/api.js';
import { SearchFilter, SearchSort } from '../data/models/acdl.js';
declare const PLP_UNIT_ID = "livesearch-plp";
declare const SEARCH_UNIT_ID = "livesearch-popover";
declare const searchRequestSent: (searchUnitId: string) => void;
declare const searchResponseReceived: (searchUnitId: string) => void;
declare const categoryResultsView: (searchUnitId: string) => void;
declare const searchResultsView: (searchUnitId: string) => void;
declare const searchProductClick: (sku: string, searchUnitId: string) => void;
declare const updateSearchInputCtx: (searchUnitId: string, searchRequestId: string, phrase: string, filters: Array<SearchFilter>, pageSize: number, currentPage: number, sort: Array<SearchSort>) => void;
declare const updateSearchResultsCtx: (searchUnitId: string, searchRequestId: string, results: ProductSearchResponse["productSearch"]) => void;
export { searchRequestSent, searchResponseReceived, categoryResultsView, searchResultsView, searchProductClick, updateSearchInputCtx, updateSearchResultsCtx, PLP_UNIT_ID, SEARCH_UNIT_ID, };
