/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as g}from"@dropins/tools/fetch-graphql.js";import{events as h}from"@dropins/tools/event-bus.js";const f={requestQuote:!1,editQuote:!1,deleteQuote:!1},w={authenticated:!1,permissions:f},x=new Proxy(w,{get:(a,t)=>a[t],set:(a,t,e)=>(a[t]=e,!0)});function N(a){if(!a||!a.data||!a.data.requestNegotiableQuote)return null;const t=a.data.requestNegotiableQuote.quote;return{uid:t.uid,createdAt:t.created_at,status:t.status,buyer:t.buyer,comments:t.comments.map(e=>{const o={uid:e.uid,createdAt:e.created_at,author:e.author};return Array.isArray(e.attachments)&&e.attachments.length>0&&(o.attachments=e.attachments.map(u=>({name:u.name,url:u.url}))),o}),items:t.items.map(e=>({product:{uid:e.product.uid,sku:e.product.sku,name:e.product.name,priceRange:{maximumPrice:{regularPrice:{value:e.product.price_range.maximum_price.regular_price.value}}}},quantity:e.quantity,prices:{subtotalExcludingTax:{value:t.prices.subtotal_excluding_tax.value},subtotalIncludingTax:{value:t.prices.subtotal_including_tax.value},subtotalWithDiscountExcludingTax:{value:t.prices.subtotal_with_discount_excluding_tax.value},grandTotal:{value:t.prices.grand_total.value}}}))}}const q=`
  fragment NegotiableQuoteFragment on RequestNegotiableQuoteOutput {
    quote {
      uid
      created_at
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
        }
      }
    }
  }
`,b=`
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
      ...NegotiableQuoteFragment
    }
  }
  ${q}
`,y=async a=>{const{cartId:t,quoteName:e,comment:o,attachments:u,isDraft:i}=a;if(!t)throw new Error("Cart ID is required");if(!e)throw new Error("Quote name is required");if(!o)throw new Error("Comment is required");return g(b,{variables:{cartId:t,quoteName:e,comment:u!=null&&u.length?{comment:o,attachments:u}:{comment:o},isDraft:i}}).then(l=>{const{errors:r}=l;if(r){const c=r.map(d=>d.message).join("; ");throw new Error(`Failed to request negotiable quote: ${c}`)}const n=N(l);if(!n)throw new Error("Failed to transform quote data: Invalid response structure");return h.emit("quote-management/negotiable-quote-requested",{quote:n,input:{cartId:t,quoteName:e,comment:o,attachments:u,isDraft:i}}),n})},v=async a=>{var i,l;const t=a==null?void 0:a.name;if(!a||!t)throw new Error("Invalid file");const e="NEGOTIABLE_QUOTE_ATTACHMENT",o=`
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
  `,u=`
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
  `;try{const{data:r,errors:n}=await g(o,{variables:{input:{key:t,media_resource_type:e}}});if(n!=null&&n.length)throw new Error(n.map(s=>s==null?void 0:s.message).join("; "));const{upload_url:c,key:d}=(r==null?void 0:r.initiateUpload)||{};if(!c||!d)throw new Error("Failed to initiate upload");const p=await fetch(c,{method:"PUT",body:a});if(!p.ok)throw new Error(`Upload failed: ${p.status} ${p.statusText}`);const{data:_,errors:m}=await g(u,{variables:{input:{key:d,media_resource_type:e}}});if(m!=null&&m.length)throw new Error(m.map(s=>s==null?void 0:s.message).join("; "));const{success:E,key:T,message:I}=(_==null?void 0:_.finishUpload)||{};if(!E||!T)throw new Error(I||"Failed to finish upload");return{key:T}}catch(r){try{(l=(i=h)==null?void 0:i.emit)==null||l.call(i,"quote-management/file-upload-error",{error:(r==null?void 0:r.message)||"File upload failed",fileName:a==null?void 0:a.name})}catch{}throw r instanceof Error?r:new Error("File upload failed")}};export{f as D,y as r,x as s,v as u};
//# sourceMappingURL=requestNegotiableQuote.js.map
