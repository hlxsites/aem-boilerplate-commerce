import{h as R}from"./network-error.js";import{R as E,P as T,a as _,G as o,O as c}from"./ReturnsFragment.graphql.js";import{t as s}from"./initialize.js";import{f as n}from"./fetch-graphql.js";const u=`
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
  ${o}
  ${c}
`,i=async(a=10,e=1)=>await n(u,{method:"GET",cache:"force-cache",variables:{pageSize:a,currentPage:e}}).then(r=>{var t;return s((t=r==null?void 0:r.data)==null?void 0:t.customer.returns)}).catch(R);export{i as g};
