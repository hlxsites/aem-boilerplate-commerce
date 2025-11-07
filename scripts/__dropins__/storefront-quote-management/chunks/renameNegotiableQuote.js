/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as q}from"./state.js";import{events as _}from"@dropins/tools/event-bus.js";import{f as l,t as p}from"./transform-quote.js";import{N as E}from"./NegotiableQuoteFragment.js";const g=`
  mutation DELETE_QUOTE_MUTATION($quoteUids: [ID!]!) {
    deleteNegotiableQuotes(
      input: {
        quote_uids: $quoteUids
      }
    ) {
      result_status
      operation_results {
        __typename
        ... on NegotiableQuoteUidOperationSuccess {
          quote_uid
        }
        ... on DeleteNegotiableQuoteOperationFailure {
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
              message
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,I=async m=>{var a;if(!q.authenticated)return Promise.reject(new Error("Unauthorized"));const n=Array.isArray(m)?m:[m];try{const t=await l(g,{variables:{quoteUids:n}}),{errors:d}=t||{};if(d&&d.length){const e=d.map(s=>s==null?void 0:s.message).filter(Boolean).join("; ");throw new Error(e||"Failed to delete negotiable quotes")}const i=(a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuotes;if(!i)throw new Error("No delete result returned");const r={resultStatus:i.result_status,operationResults:(i.operation_results||[]).map(e=>(e==null?void 0:e.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:e==null?void 0:e.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:e==null?void 0:e.quote_uid,errors:((e==null?void 0:e.errors)||[]).map(o=>({__typename:o==null?void 0:o.__typename,message:o==null?void 0:o.message,uid:o==null?void 0:o.uid}))})},u=r.operationResults.filter(e=>e.__typename==="NegotiableQuoteUidOperationSuccess").map(e=>e.quoteUid);return u.length>0&&_.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:u,resultStatus:r.resultStatus}),r}catch(t){return _.emit("quote-management/negotiable-quote-delete-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:n}),Promise.reject(t)}},N=`
  mutation SEND_NEGOTIABLE_QUOTE_FOR_REVIEW_MUTATION(
    $quoteUid: ID!
    $comment: NegotiableQuoteCommentInput
  ) {
    sendNegotiableQuoteForReview(
      input: {
        quote_uid: $quoteUid
        comment: $comment
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${E}
`,O=async m=>{const{quoteUid:n,comment:a}=m;if(!n)throw new Error("Quote UID is required");return l(N,{variables:{quoteUid:n,comment:a?{comment:a}:null}}).then(d=>{var u,e;const{errors:i}=d;if(i){const s=i.map(c=>c.message).join("; ");throw new Error(`Failed to send quote for review: ${s}`)}const r=p((e=(u=d.data)==null?void 0:u.sendNegotiableQuoteForReview)==null?void 0:e.quote);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-sent-for-review",{quote:r,input:{quoteUid:n,comment:a}}),r})},Q=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${E}
`,T=async m=>{const{quoteUid:n,quoteName:a,quoteComment:t}=m;if(!n)throw new Error("Quote UID is required");if(!a)throw new Error("Quote name is required");return l(Q,{variables:{input:{quote_uid:n,quote_name:a,quote_comment:t||""}}}).then(i=>{var e,s;const{errors:r}=i;if(r){const c=r.map(o=>o.message).join("; ");throw new Error(`Failed to rename quote: ${c}`)}const u=p((s=(e=i.data)==null?void 0:e.renameNegotiableQuote)==null?void 0:s.quote);if(!u)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-renamed",{quote:u,input:{quoteUid:n,quoteName:a,quoteComment:t}}),u})};export{I as d,T as r,O as s};
//# sourceMappingURL=renameNegotiableQuote.js.map
