/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{f as E,t as q}from"./transform-quote.js";import{N as g}from"./NegotiableQuoteFragment.js";import{s as _}from"./state.js";import{a as Q}from"./transform-quote-template.js";import{N as U}from"./NegotiableQuoteTemplateFragment.js";const T=`
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
`,S=async i=>{var r;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));if(!_.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await E(T,{variables:{quoteId:i}}),e=q((r=o==null?void 0:o.data)==null?void 0:r.negotiableQuote);if(!e)throw new Error("Failed to transform quote data");return p.emit("quote-management/quote-data",{quote:e,permissions:_.permissions}),e}catch(o){return Promise.reject(o)}},N=`
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
`,M=async i=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const r=Array.isArray(i)?i:[i];try{const e=await E(N,{variables:{quoteUids:r}}),{errors:c}=e||{};if(c&&c.length){const a=c.map(t=>t==null?void 0:t.message).filter(Boolean).join("; ");throw new Error(a||"Failed to delete negotiable quotes")}const n=(o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuotes;if(!n)throw new Error("No delete result returned");const u={resultStatus:n.result_status,operationResults:(n.operation_results||[]).map(a=>(a==null?void 0:a.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:a==null?void 0:a.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:a==null?void 0:a.quote_uid,errors:((a==null?void 0:a.errors)||[]).map(s=>({__typename:s==null?void 0:s.__typename,message:s==null?void 0:s.message,uid:s==null?void 0:s.uid}))})},m=u.operationResults.filter(a=>a.__typename==="NegotiableQuoteUidOperationSuccess").map(a=>a.quoteUid);return m.length>0&&p.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:m,resultStatus:u.resultStatus}),u}catch(e){return p.emit("quote-management/negotiable-quote-delete-error",{error:e instanceof Error?e:new Error(String(e)),attemptedQuoteUids:r}),Promise.reject(e)}},f=`
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
`,R=async i=>{const{quoteUid:r,comment:o,attachments:e}=i;if(!r)throw new Error("Quote UID is required");const c=e!=null&&e.length?{comment:o||"",attachments:e}:o?{comment:o}:null;return E(f,{variables:{quoteUid:r,comment:c}}).then(n=>{var a,t;const{errors:u}=n;if(u){const d=u.map(s=>s.message).join("; ");throw new Error(`Failed to send quote for review: ${d}`)}const m=q((t=(a=n.data)==null?void 0:a.sendNegotiableQuoteForReview)==null?void 0:t.quote);if(!m)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-sent-for-review",{quote:m,input:{quoteUid:r,comment:o,attachments:e}}),m})},w=`
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
`,v=async i=>{var o;if(!_.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:r}=i;if(!r||r.length===0)throw new Error("Quote UIDs are required");try{const e=await E(w,{variables:{quoteUids:r}}),{errors:c}=e||{};if(c&&c.length){const t=c.map(d=>d==null?void 0:d.message).filter(Boolean).join("; ");throw new Error(t||"Failed to close negotiable quotes")}const n=(o=e==null?void 0:e.data)==null?void 0:o.closeNegotiableQuotes;if(!n)throw new Error("No close result returned");const u={resultStatus:n.result_status,operationResults:(n.operation_results||[]).map(t=>(t==null?void 0:t.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:t==null?void 0:t.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:t==null?void 0:t.quote_uid,errors:((t==null?void 0:t.errors)||[]).map(l=>({__typename:l==null?void 0:l.__typename,message:l==null?void 0:l.message,uid:l==null?void 0:l.uid}))})},m=u.operationResults.filter(t=>t.__typename==="CloseNegotiableQuoteOperationFailure").map(t=>t);if(m.length>0){const t=m.map(d=>d.errors&&d.errors.length>0?d.errors.map(s=>s.message||`Failed to close quote ${d.quoteUid}`).join(", "):`Failed to close quote ${d.quoteUid}`).join("; ");throw new Error(t)}const a=u.operationResults.filter(t=>t.__typename==="NegotiableQuoteUidOperationSuccess").map(t=>t.quoteUid);return a.length>0&&p.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:a,resultStatus:u.resultStatus}),u}catch(e){return p.emit("quote-management/negotiable-quote-close-error",{error:e instanceof Error?e:new Error(String(e)),attemptedQuoteUids:r}),Promise.reject(e)}},b=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${U}
`,L=async i=>{var r;if(!_.authenticated)throw new Error("Unauthorized");if(!i)throw new Error("Cart ID is required");try{const o=await E(b,{variables:{cartId:i}});if(!((r=o==null?void 0:o.data)!=null&&r.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const e=Q(o.data.requestNegotiableQuoteTemplateFromQuote);if(!e)throw new Error("Failed to transform quote template data");return p.emit("quote-management/quote-template-data",{quoteTemplate:e,permissions:_.permissions}),p.emit("quote-management/quote-template-created",{quoteTemplate:e,input:{quoteUid:i}}),e}catch(o){return Promise.reject(o)}},h=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,j=async i=>{const{quoteUid:r,quoteName:o,quoteComment:e}=i;if(!r)throw new Error("Quote UID is required");if(!o)throw new Error("Quote name is required");return E(h,{variables:{input:{quote_uid:r,quote_name:o,quote_comment:e||""}}}).then(n=>{var a,t;const{errors:u}=n;if(u){const d=u.map(s=>s.message).join("; ");throw new Error(`Failed to rename quote: ${d}`)}const m=q((t=(a=n.data)==null?void 0:a.renameNegotiableQuote)==null?void 0:t.quote);if(!m)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-renamed",{quote:m,input:{quoteUid:r,quoteName:o,quoteComment:e}}),m})},I=`
  mutation DUPLICATE_NEGOTIABLE_QUOTE_MUTATION($quoteUid: ID!, $duplicatedQuoteUid: ID!) {
    duplicateNegotiableQuote(input: { quote_uid: $quoteUid, duplicated_quote_uid: $duplicatedQuoteUid }) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${g}
`,P=async i=>{if(!_.authenticated)throw new Error("Unauthorized");const{quoteUid:r,duplicatedQuoteUid:o}=i;if(!r||!r.trim())throw new Error("Quote UID is required");if(!o||!o.trim())throw new Error("Duplicated Quote UID is required");return E(I,{variables:{quoteUid:r,duplicatedQuoteUid:o}}).then(e=>{var u,m;const{errors:c}=e;if(c){const a=c.map(t=>t.message).join("; ");throw new Error(`Failed to duplicate quote: ${a}`)}const n=q((m=(u=e.data)==null?void 0:u.duplicateNegotiableQuote)==null?void 0:m.quote);if(!n)throw new Error("Failed to transform quote data: Invalid response structure");return p.emit("quote-management/quote-duplicated",{quote:n,input:{quoteUid:r,duplicatedQuoteUid:o}}),n})};export{L as a,P as b,v as c,M as d,S as g,j as r,R as s};
//# sourceMappingURL=duplicateNegotiableQuote.js.map
