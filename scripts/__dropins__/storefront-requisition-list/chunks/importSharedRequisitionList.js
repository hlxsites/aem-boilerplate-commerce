/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as a}from"./fetch-error.js";import{a as u,R as S,t as T}from"./transform-requisition-list.js";import"@dropins/tools/event-bus.js";import{f as R}from"./fetch-graphql.js";const E=`
  query GET_SHARED_REQUISITION_LIST_QUERY(
    $token: String!
    $currentPage: Int = 1
    $pageSize: Int = 10
  ) {
    sharedRequisitionList(token: $token) {
      sender_name
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${u}
${S}
`,q=async(o,n,t,i)=>{var _;const{errors:s,data:I}=await R(E,{variables:{token:o,currentPage:n,pageSize:t}});if(s)return a(s);const r=I==null?void 0:I.sharedRequisitionList;if(!(r!=null&&r.requisition_list))return null;let e=T(r.requisition_list);return e?((_=e.items)!=null&&_.length&&i&&(e={...e,items:await i(e.items)}),{senderName:r.sender_name,requisitionList:e}):null},m=`
  mutation IMPORT_SHARED_REQUISITION_LIST_MUTATION($token: String!) {
    importSharedRequisitionList(token: $token) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
      user_errors {
        message
        code
      }
    }
  }
${S}
`,g=async o=>{const{errors:n,data:t}=await R(m,{variables:{token:o}});if(n)return a(n);const i=t==null?void 0:t.importSharedRequisitionList;return{requisitionList:i!=null&&i.requisition_list?T(i.requisition_list)??null:null,userErrors:((i==null?void 0:i.user_errors)??[]).map(s=>({message:s.message,code:s.code}))}};export{q as g,g as i};
//# sourceMappingURL=importSharedRequisitionList.js.map
