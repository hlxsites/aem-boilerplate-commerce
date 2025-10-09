/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as _}from"@dropins/tools/fetch-graphql.js";import{events as I}from"@dropins/tools/event-bus.js";import{t as N}from"./transform-quote.js";const U=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
    name
    created_at
    updated_at
    status
    buyer {
      firstname
      lastname
    }
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
      attachments {
          name
          url
      }
    }
    template_id
    template_name
    items {
      product {
        uid
        sku
        name
        price_range {
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
      quantity
    }
    prices {
      subtotal_excluding_tax {
        value
      }
      subtotal_including_tax {
        value
      }
      subtotal_with_discount_excluding_tax {
        value
      }
      grand_total {
        value
        currency
      }
    }
  }
`,q=`
  mutation REQUEST_NEGOTIABLE_QUOTE_MUTATION(
    $cartId: ID!
    $quoteName: String!
    $comment: NegotiableQuoteCommentInput!
    $isDraft: Boolean
  ) {
    requestNegotiableQuote(
      input: {
        cart_id: $cartId
        quote_name: $quoteName
        comment: $comment
        is_draft: $isDraft
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${U}
`,y=async e=>{const{cartId:n,quoteName:i,comment:s,attachments:r,isDraft:a}=e;if(!n)throw new Error("Cart ID is required");if(!i)throw new Error("Quote name is required");if(!s)throw new Error("Comment is required");return _(q,{variables:{cartId:n,quoteName:i,comment:r!=null&&r.length?{comment:s,attachments:r}:{comment:s},isDraft:a}}).then(u=>{const{errors:t}=u;if(t){const m=t.map(l=>l.message).join("; ");throw new Error(`Failed to request negotiable quote: ${m}`)}const o=N(u);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return I.emit("quote-management/negotiable-quote-requested",{quote:o,input:{cartId:n,quoteName:i,comment:s,attachments:r,isDraft:a}}),o})},Q=async e=>{var a,u;const n=e==null?void 0:e.name;if(!e||!n)throw new Error("Invalid file");const i="NEGOTIABLE_QUOTE_ATTACHMENT",s=`
    mutation INITIATE_UPLOAD_MUTATION(
     $input: initiateUploadInput!
    ){
     initiateUpload(
      input: $input
     ){
        upload_url
        key
        expires_at
      }
     }
  `,r=`
    mutation FINISH_UPLOAD_MUTATION(
     $input: finishUploadInput!
    ){
     finishUpload(
      input: $input
     ){
        success
        key
        message
      }
    }
  `;try{const t=f=>f.map(w=>w.message).join("; "),{data:o,errors:m}=await _(s,{variables:{input:{key:n,media_resource_type:i}}});if(m&&m.length)throw new Error(t(m));const{upload_url:l,key:E}=(o==null?void 0:o.initiateUpload)||{};if(!l||!E)throw new Error("Failed to initiate upload");const c=await fetch(l,{method:"PUT",body:e});if(!c.ok)throw new Error(`Upload failed: ${c.status} ${c.statusText}`);const{data:d,errors:p}=await _(r,{variables:{input:{key:E,media_resource_type:i}}});if(p&&p.length)throw new Error(t(p));const{success:g,key:T,message:h}=(d==null?void 0:d.finishUpload)||{};if(!g||!T)throw new Error(h||"Failed to finish upload");return{key:T}}catch(t){try{(u=(a=I)==null?void 0:a.emit)==null||u.call(a,"quote-management/file-upload-error",{error:(t==null?void 0:t.message)||"File upload failed",fileName:e==null?void 0:e.name})}catch{}throw t instanceof Error?t:new Error("File upload failed")}};export{y as r,Q as u};
//# sourceMappingURL=requestNegotiableQuote.js.map
