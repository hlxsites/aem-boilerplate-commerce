/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as S,a as T,f as c,h as E,t as g}from"./updateRequisitionList.js";import{events as m}from"@dropins/tools/event-bus.js";const p=`
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
`,f=async(I,u)=>c(p,{variables:{currentPage:I,pageSize:u}}).then(({errors:t,data:e})=>{var s,r,n,o,_;if(t)return E(t);if(!((s=e==null?void 0:e.customer)!=null&&s.requisition_lists))return null;const i=e.customer.requisition_lists.items.map(a=>g(a));return m.emit("requisitionLists/data",i),{items:i,page_info:(n=(r=e.customer)==null?void 0:r.requisition_lists)==null?void 0:n.page_info,total_count:(_=(o=e.customer)==null?void 0:o.requisition_lists)==null?void 0:_.total_count}});export{f as g};
//# sourceMappingURL=getRequisitionLists.js.map
