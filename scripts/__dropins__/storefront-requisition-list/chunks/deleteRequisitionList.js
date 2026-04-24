/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as L,t as T}from"./transform-requisition-list.js";import{h as m}from"./fetch-error.js";import{events as q}from"@dropins/tools/event-bus.js";import{f as R}from"./fetch-graphql.js";const f=`
  mutation DELETE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
    ) {
    deleteRequisitionList(
      requisitionListUid: $requisitionListUid
    ) {
      status
      requisition_lists {
        items {
          ...REQUISITION_LIST_FRAGMENT
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
${L}
`,N=async t=>R(f,{variables:{requisitionListUid:t}}).then(({errors:e,data:i})=>{var n,o,r,u,_,l;if(!t)return null;if(e)return m(e);if(!((n=i==null?void 0:i.deleteRequisitionList)!=null&&n.requisition_lists))return null;const s=((r=(o=i.deleteRequisitionList.requisition_lists)==null?void 0:o.items)==null?void 0:r.map(I=>T(I)))||[];return q.emit("requisitionLists/data",s),{items:s,page_info:(_=(u=i.deleteRequisitionList)==null?void 0:u.requisition_lists)==null?void 0:_.page_info,status:(l=i.deleteRequisitionList)==null?void 0:l.status}});export{N as d};
//# sourceMappingURL=deleteRequisitionList.js.map
