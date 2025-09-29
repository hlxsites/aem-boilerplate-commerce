/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as n}from"@dropins/tools/fetch-graphql.js";import{N as s,s as i,a as g}from"./NegotiableQuoteFragment.js";const u=`
  fragment SearchResultPageInfoFragment on SearchResultPageInfo {
    current_page
    page_size
    total_pages
  }
`,l=`
  fragment SortFieldsFragment on SortFields {
    default
    options {
      label
      value
    }
  }
`,E=`
  query negotiableQuotes(
    $filter: NegotiableQuoteFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteSortInput
  ) {
    negotiableQuotes(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        ...NegotiableQuoteFragment
      }
      page_info {
        ...SearchResultPageInfoFragment
      }
      sort_fields {
        ...SortFieldsFragment
      }
      total_count
    }
  }

  ${s}
  ${u}
  ${l}
`;var c=(e=>(e.FULL="FULL",e.PARTIAL="PARTIAL",e))(c||{}),A=(e=>(e.ASC="ASC",e.DESC="DESC",e))(A||{}),f=(e=>(e.QUOTE_NAME="QUOTE_NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(f||{});const S=async(e={})=>{var r;if(!i.authenticated)return Promise.reject(new Error("Unauthorized"));const o={filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null};try{const t=await n(E,{variables:o});if(!((r=t==null?void 0:t.data)!=null&&r.negotiableQuotes))throw new Error("No quotes data received");const a=g(t.data.negotiableQuotes);if(!a)throw new Error("Failed to transform quotes data");return a}catch(t){return Promise.reject(t)}};export{c as F,f as N,A as S,S as n};
//# sourceMappingURL=negotiableQuotes.js.map
