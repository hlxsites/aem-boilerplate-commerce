/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as e}from"./fetch-error.js";import{R as n,t as I}from"./transform-requisition-list.js";import"@dropins/tools/event-bus.js";import{f as a}from"./fetch-graphql.js";const _=`
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
${n}
`,u=async o=>{const{errors:s,data:r}=await a(_,{variables:{token:o}});if(s)return e(s);const i=r==null?void 0:r.importSharedRequisitionList;return{requisitionList:i!=null&&i.requisition_list?I(i.requisition_list)??null:null,userErrors:((i==null?void 0:i.user_errors)??[]).map(t=>({message:t.message,code:t.code}))}};export{u as i};
//# sourceMappingURL=importSharedRequisitionList.js.map
