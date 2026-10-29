/********************************************************************
 *  Copyright 2025 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  Adobe permits you to use, modify, and distribute this
 * file in accordance with the terms of the Adobe license agreement
 * accompanying it.
 *******************************************************************/
export declare const NEGOTIABLE_QUOTES_QUERY = "\n  query negotiableQuotes(\n    $filter: NegotiableQuoteFilterInput\n    $pageSize: Int\n    $currentPage: Int\n    $sort: NegotiableQuoteSortInput\n  ) {\n    negotiableQuotes(\n      filter: $filter\n      pageSize: $pageSize\n      currentPage: $currentPage\n      sort: $sort\n    ) {\n      items {\n        ...NegotiableQuoteListFragment\n      }\n      page_info {\n        ...SearchResultPageInfoFragment\n      }\n      sort_fields {\n        ...SortFieldsFragment\n      }\n      total_count\n    }\n  }\n\n  \n  fragment NegotiableQuoteListFragment on NegotiableQuote {\n    uid\n    name\n    created_at\n    updated_at\n    status\n    buyer {\n      firstname\n      lastname\n    }\n    template_name\n    prices {\n      grand_total {\n        value\n        currency\n      }\n    }\n    history {\n      change_type\n      changes {\n        statuses {\n          changes {\n            new_status\n            old_status\n          }\n        }\n      }\n    }\n  }\n\n  \n  fragment SearchResultPageInfoFragment on SearchResultPageInfo {\n    current_page\n    page_size\n    total_pages\n  }\n\n  \n  fragment SortFieldsFragment on SortFields {\n    default\n    options {\n      label\n      value\n    }\n  }\n\n";
