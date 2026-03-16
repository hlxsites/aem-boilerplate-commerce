/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as S,a as T,t as c}from"./updateRequisitionList.js";import{f as m,h as E}from"./fetch-graphql.js";import{events as g}from"@dropins/tools/event-bus.js";const p=`
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: 100, currentPage: 1) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
${S}
${T}
`,q=async(I,u)=>m(p,{variables:{currentPage:I,pageSize:u}}).then(({errors:e,data:t})=>{var s,r,n,o,_;if(e)return E(e);if(!((s=t==null?void 0:t.customer)!=null&&s.requisition_lists))return null;const i=t.customer.requisition_lists.items.map(a=>c(a));return g.emit("requisitionLists/data",i),{items:i,page_info:(n=(r=t.customer)==null?void 0:r.requisition_lists)==null?void 0:n.page_info,total_count:(_=(o=t.customer)==null?void 0:o.requisition_lists)==null?void 0:_.total_count}});export{q as g};
//# sourceMappingURL=getRequisitionLists.js.map
