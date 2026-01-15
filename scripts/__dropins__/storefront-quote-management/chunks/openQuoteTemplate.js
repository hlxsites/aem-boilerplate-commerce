/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as l}from"@dropins/tools/event-bus.js";import{a as p}from"./transform-quote-template.js";import{s as r}from"./state.js";import{N as u}from"./NegotiableQuoteTemplateFragment.js";import{f as d}from"./transform-quote.js";const s=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
    $referenceDocumentLinks: [NegotiableQuoteTemplateReferenceDocumentLinkInput]
    $attachments: [NegotiableQuoteCommentAttachmentInput]
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment, reference_document_links: $referenceDocumentLinks, attachments: $attachments }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${u}
`,q=async t=>{var o,e,a;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const n=(o=t.referenceDocumentLinks)==null?void 0:o.map(m=>({link_id:m.uid,document_name:m.name,document_identifier:m.identifier,reference_document_url:m.url})),i=(e=t.attachments)!=null&&e.length?t.attachments.map(m=>({key:m.key})):void 0,c=await d(s,{variables:{templateId:t.templateId,name:t.name,comment:t.comment||void 0,referenceDocumentLinks:n,attachments:i}});if(!((a=c==null?void 0:c.data)!=null&&a.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const T=p(c.data.submitNegotiableQuoteTemplateForReview);if(!T)throw new Error("Failed to transform quote template data");return l.emit("quote-management/quote-template-data",{quoteTemplate:T,permissions:r.permissions}),T}catch(n){return Promise.reject(n)}},E=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${u}
`,b=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await d(E,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.acceptNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return l.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},I=`
  mutation CANCEL_QUOTE_TEMPLATE_MUTATION(
    $templateId: ID!
    $comment: String
  ) {
    cancelNegotiableQuoteTemplate(
      input: {
        template_id: $templateId
        cancellation_comment: $comment
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${u}
`,A=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await d(I,{variables:{templateId:t.templateId,comment:t.comment}});if(!((o=e==null?void 0:e.data)!=null&&o.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.cancelNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return l.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}},_=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,O=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await d(_,{variables:{templateId:t.templateId}});if(e!=null&&e.errors&&e.errors.length>0){const n=e.errors.map(i=>i==null?void 0:i.message).filter(Boolean).join("; ");throw new Error(n||"Failed to delete quote template")}if(!((o=e==null?void 0:e.data)==null?void 0:o.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return l.emit("quote-management/quote-template-deleted",{templateId:t.templateId}),{templateId:t.templateId}}catch(e){return Promise.reject(e)}},w=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${u}
`,U=async t=>{var o;if(!t.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const e=await d(w,{variables:{templateId:t.templateId}});if(!((o=e==null?void 0:e.data)!=null&&o.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const a=p(e.data.openNegotiableQuoteTemplate);if(!a)throw new Error("Failed to transform quote template data");return l.emit("quote-management/quote-template-data",{quoteTemplate:a,permissions:r.permissions}),a}catch(e){return Promise.reject(e)}};export{b as a,A as c,O as d,U as o,q as s};
//# sourceMappingURL=openQuoteTemplate.js.map
