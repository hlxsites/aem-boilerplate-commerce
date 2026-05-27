/*! Copyright 2026 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import{f as l}from"./fetch-graphql.js";const u=`
  query GET_COMPANY_USERS_QUERY(
    $pageSize: Int = 100
    $currentPage: Int = 1
  ) {
    company {
      users(
        filter: { status: ACTIVE }
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          id
          firstname
          lastname
          email
        }
        page_info {
          total_pages
          current_page
        }
      }
    }
  }
`,c=100,o=async r=>{var t,i,a;const{errors:s,data:n}=await l(u,{variables:{pageSize:c,currentPage:r}});if(s)return null;const e=(t=n==null?void 0:n.company)==null?void 0:t.users;return(i=e==null?void 0:e.items)!=null&&i.length?{items:e.items,totalPages:((a=e.page_info)==null?void 0:a.total_pages)??1}:null},f=async()=>{const r=await o(1);if(!r)return[];const{items:s,totalPages:n}=r;if(n<=1)return s;const e=await Promise.all(Array.from({length:n-1},(t,i)=>o(i+2)));return[...s,...e.flatMap(t=>(t==null?void 0:t.items)??[])]},g=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,E=async r=>{var s,n;try{const{errors:e,data:t}=await l(g,{variables:{requisitionListUid:r}});return e!=null&&e.length?{token:null,errorMessage:((s=e[0])==null?void 0:s.message)??null}:{token:((n=t==null?void 0:t.shareRequisitionListByToken)==null?void 0:n.token)??null,errorMessage:null}}catch(e){return{token:null,errorMessage:e instanceof Error?e.message:"Unable to generate share link."}}};export{f as g,E as s};
//# sourceMappingURL=shareRequisitionListByToken.js.map
