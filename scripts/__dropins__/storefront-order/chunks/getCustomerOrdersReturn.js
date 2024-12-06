/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as R}from"./network-error.js";import{R as E,P as T,a as _,G as c,O as s,t as o}from"./initialize.js";import{f as n}from"./fetch-graphql.js";const u=`
  query GET_CUSTOMER_ORDERS_RETURN($currentPage: Int, $pageSize: Int) {
    customer {
      returns(currentPage: $currentPage, pageSize: $pageSize) {
        page_info {
          page_size
          total_pages
          current_page
        }
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${E}
  ${T}
  ${_}
  ${c}
  ${s}
`,G=async(e=10,t=1)=>await n(u,{method:"GET",cache:"force-cache",variables:{pageSize:e,currentPage:t}}).then(r=>{var a;return o((a=r==null?void 0:r.data)==null?void 0:a.customer.returns)}).catch(R);export{G as g};
