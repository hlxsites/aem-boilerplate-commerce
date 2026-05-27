/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as _,a as m,t as p}from"./transform-requisition-list.js";import{h as L}from"./fetch-error.js";import{events as R}from"@dropins/tools/event-bus.js";import{f as E}from"./fetch-graphql.js";const U=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!,
      $description: String,
      $pageSize: Int,
      $currentPage: Int
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${_}
${m}
`,d=async(I,a,o,u,T,e)=>{var r,n;const{errors:s,data:t}=await E(U,{variables:{requisitionListUid:I,name:a,description:o,pageSize:u,currentPage:T}});if(s)return L(s);if(!((r=t==null?void 0:t.updateRequisitionList)!=null&&r.requisition_list))return null;const S=t.updateRequisitionList.requisition_list;let i=p(S);return(n=i==null?void 0:i.items)!=null&&n.length&&e&&(i={...i,items:await e(i.items)}),R.emit("requisitionList/data",i),i};export{d as u};
//# sourceMappingURL=updateRequisitionList.js.map
