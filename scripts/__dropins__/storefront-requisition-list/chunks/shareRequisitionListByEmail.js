/*! Copyright 2026 Adobe
All Rights Reserved. */
import{h as u}from"./fetch-error.js";import"@dropins/tools/event-bus.js";import{f as m}from"./fetch-graphql.js";const _=`
  mutation SHARE_REQUISITION_LIST_BY_EMAIL_MUTATION(
    $requisitionListUid: ID!
    $customerUids: [ID!]!
  ) {
    shareRequisitionListByEmail(
      input: {
        requisitionListUid: $requisitionListUid
        customerUids: $customerUids
      }
    ) {
      sent_count
      user_errors {
        message
        code
      }
    }
  }
`,a=async(o,n)=>m(_,{variables:{requisitionListUid:o,customerUids:n}}).then(({errors:e,data:s})=>{var r;if(e)return u(e);const i=s==null?void 0:s.shareRequisitionListByEmail;return((i==null?void 0:i.sent_count)??0)>0?null:(r=i==null?void 0:i.user_errors)!=null&&r.length?i.user_errors.map(t=>({message:t.message,code:t.code})):[{code:"SHARE_FAILED",message:"Unable to share requisition list."}]});export{a as s};
//# sourceMappingURL=shareRequisitionListByEmail.js.map
