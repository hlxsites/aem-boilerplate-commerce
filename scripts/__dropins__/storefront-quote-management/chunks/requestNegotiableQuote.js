/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as E}from"@dropins/tools/fetch-graphql.js";import{events as c}from"@dropins/tools/event-bus.js";import{N as q,t as f}from"./NegotiableQuoteFragment.js";const N=`
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
  ${q}
`,I=async m=>{const{cartId:e,quoteName:t,comment:r,isDraft:a}=m;if(!e)throw new Error("Cart ID is required");if(!t)throw new Error("Quote name is required");if(!r)throw new Error("Comment is required");return E(N,{variables:{cartId:e,quoteName:t,comment:{comment:r},isDraft:a}}).then(n=>{const{errors:i}=n;if(i){const s=i.map(u=>u.message).join("; ");throw new Error(`Failed to request negotiable quote: ${s}`)}const o=f(n);if(!o)throw new Error("Failed to transform quote data: Invalid response structure");return c.emit("quote-management/negotiable-quote-requested",{quote:o,input:{cartId:e,quoteName:t,comment:r,isDraft:a}}),o})};export{I as r};
//# sourceMappingURL=requestNegotiableQuote.js.map
