/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{f as E,a as q}from"./transform-quote.js";import{N as g}from"./NegotiableQuoteFragment.js";import{s as _}from"./state.js";import{a as Q}from"./transform-quote-template.js";import{N as U}from"./NegotiableQuoteTemplateFragment.js";const N=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${g}
`,S=async u=>{var r;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));if(!_.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await E(N,{variables:{quoteId:u}}),t=q((r=o==null?void 0:o.data)==null?void 0:r.negotiableQuote);if(!t)throw new Error("Failed to transform quote data");return p.emit("quote-management/quote-data",{quote:t,permissions:_.permissions}),t}catch(o){return Promise.reject(o)}},T=`
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
`,M=async u=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const r=Array.isArray(u)?u:[u];try{const t=await E(T,{variables:{quoteUids:r}}),{errors:c}=t||{};if(c&&c.length){const a=c.map(e=>e==null?void 0:e.message).filter(Boolean).join("; ");throw new Error(a||"Failed to delete negotiable quotes")}const i=(o=t==null?void 0:t.data)==null?void 0:o.deleteNegotiableQuotes;if(!i)throw new Error("No delete result returned");const n={resultStatus:i.result_status,operationResults:(i.operation_results||[]).map(a=>(a==null?void 0:a.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:a==null?void 0:a.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:a==null?void 0:a.quote_uid,errors:((a==null?void 0:a.errors)||[]).map(d=>({__typename:d==null?void 0:d.__typename,message:d==null?void 0:d.message,uid:d==null?void 0:d.uid}))})},s=n.operationResults.filter(a=>a.__typename==="NegotiableQuoteUidOperationSuccess").map(a=>a.quoteUid);return s.length>0&&p.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:s,resultStatus:n.resultStatus}),n}catch(t){return p.emit("quote-management/negotiable-quote-delete-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},f=`
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
  ${g}
`,R=async u=>{const{quoteUid:r,comment:o}=u;if(!r)throw new Error("Quote UID is required");return E(f,{variables:{quoteUid:r,comment:o?{comment:o}:null}}).then(c=>{var s,a;const{errors:i}=c;if(i){const e=i.map(m=>m.message).join("; ");throw new Error(`Failed to send quote for review: ${e}`)}const n=q((a=(s=c.data)==null?void 0:s.sendNegotiableQuoteForReview)==null?void 0:a.quote);if(!n)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-sent-for-review",{quote:n,input:{quoteUid:r,comment:o}}),n})},w=`
  mutation CLOSE_NEGOTIABLE_QUOTE_MUTATION(
    $quoteUids: [ID!]!
  ) {
    closeNegotiableQuotes(input: { quote_uids: $quoteUids }) {
      result_status
      operation_results {
        ... on NegotiableQuoteUidOperationSuccess {
          __typename
          quote_uid
        }
        ... on CloseNegotiableQuoteOperationFailure {
          __typename
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,v=async u=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:r}=u;if(!r||r.length===0)throw new Error("Quote UIDs are required");try{const t=await E(w,{variables:{quoteUids:r}}),{errors:c}=t||{};if(c&&c.length){const e=c.map(m=>m==null?void 0:m.message).filter(Boolean).join("; ");throw new Error(e||"Failed to close negotiable quotes")}const i=(o=t==null?void 0:t.data)==null?void 0:o.closeNegotiableQuotes;if(!i)throw new Error("No close result returned");const n={resultStatus:i.result_status,operationResults:(i.operation_results||[]).map(e=>(e==null?void 0:e.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:e==null?void 0:e.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:e==null?void 0:e.quote_uid,errors:((e==null?void 0:e.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},s=n.operationResults.filter(e=>e.__typename==="CloseNegotiableQuoteOperationFailure").map(e=>e);if(s.length>0){const e=s.map(m=>m.errors&&m.errors.length>0?m.errors.map(d=>d.message||`Failed to close quote ${m.quoteUid}`).join(", "):`Failed to close quote ${m.quoteUid}`).join("; ");throw new Error(e)}const a=n.operationResults.filter(e=>e.__typename==="NegotiableQuoteUidOperationSuccess").map(e=>e.quoteUid);return a.length>0&&p.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:a,resultStatus:n.resultStatus}),n}catch(t){return p.emit("quote-management/negotiable-quote-close-error",{error:t instanceof Error?t:new Error(String(t)),attemptedQuoteUids:r}),Promise.reject(t)}},b=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${U}
`,L=async u=>{var r;if(!_.authenticated)throw new Error("Unauthorized");if(!u)throw new Error("Cart ID is required");try{const o=await E(b,{variables:{cartId:u}});if(!((r=o==null?void 0:o.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const t=Q(o.data.requestNegotiableQuoteTemplateFromQuote);if(!t)throw new Error("Failed to transform quote template data");return p.emit("quote-management/quote-template-data",{quoteTemplate:t,permissions:_.permissions}),t}catch(o){return Promise.reject(o)}},I=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,j=async u=>{const{quoteUid:r,quoteName:o,quoteComment:t}=u;if(!r)throw new Error("Quote UID is required");if(!o)throw new Error("Quote name is required");return E(I,{variables:{input:{quote_uid:r,quote_name:o,quote_comment:t||""}}}).then(i=>{var a,e;const{errors:n}=i;if(n){const m=n.map(d=>d.message).join("; ");throw new Error(`Failed to rename quote: ${m}`)}const s=q((e=(a=i.data)==null?void 0:a.renameNegotiableQuote)==null?void 0:e.quote);if(!s)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-renamed",{quote:s,input:{quoteUid:r,quoteName:o,quoteComment:t}}),s})},h=`
  mutation DUPLICATE_NEGOTIABLE_QUOTE_MUTATION($quoteUid: ID!, $duplicatedQuoteUid: ID!) {
    duplicateNegotiableQuote(input: { quote_uid: $quoteUid, duplicated_quote_uid: $duplicatedQuoteUid }) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,P=async u=>{if(!_.authenticated)throw new Error("Unauthorized");const{quoteUid:r,duplicatedQuoteUid:o}=u;if(!r||!r.trim())throw new Error("Quote UID is required");if(!o||!o.trim())throw new Error("Duplicated Quote UID is required");return E(h,{variables:{quoteUid:r,duplicatedQuoteUid:o}}).then(t=>{var n,s;const{errors:c}=t;if(c){const a=c.map(e=>e.message).join("; ");throw new Error(`Failed to duplicate quote: ${a}`)}const i=q((s=(n=t.data)==null?void 0:n.duplicateNegotiableQuote)==null?void 0:s.quote);if(!i)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-duplicated",{quote:i,input:{quoteUid:r,duplicatedQuoteUid:o}}),i})};export{L as a,P as b,v as c,M as d,S as g,j as r,R as s};
//# sourceMappingURL=duplicateNegotiableQuote.js.map
