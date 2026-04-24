/*! Copyright 2026 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import{f as i}from"./fetch-graphql.js";const o=`
  query GET_COMPANY_USERS_QUERY {
    company {
      users(filter: { status: ACTIVE }) {
        items {
          id
          firstname
          lastname
          email
        }
      }
    }
  }
`,c=async()=>{var t,s;try{const{errors:r,data:e}=await i(o);return r?[]:((s=(t=e==null?void 0:e.company)==null?void 0:t.users)==null?void 0:s.items)??[]}catch{return[]}},a=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,T=async t=>{var s,r;try{const{errors:e,data:n}=await i(a,{variables:{requisitionListUid:t}});return e!=null&&e.length?{token:null,errorMessage:((s=e[0])==null?void 0:s.message)??null}:{token:((r=n==null?void 0:n.shareRequisitionListByToken)==null?void 0:r.token)??null,errorMessage:null}}catch(e){return{token:null,errorMessage:e instanceof Error?e.message:"Unable to generate share link."}}};export{c as g,T as s};
//# sourceMappingURL=shareRequisitionListByToken.js.map
