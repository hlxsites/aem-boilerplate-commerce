/*! Copyright 2025 Adobe
All Rights Reserved. */
import{fetchGraphQl as _}from"@dropins/tools/fetch-graphql.js";import{events as d}from"@dropins/tools/event-bus.js";import{t as p}from"./transform-quote.js";const g=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
    name
    created_at
    status
    sales_rep_name
    expiration_date
    updated_at
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
      text
    }
    template_id
    template_name
    items {
      product {
        name
        sku
        uid
        stock_status
        quantity
        price_range {
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
      prices {
        price {
          currency
          value
        }
        original_item_price {
          currency
          value
        }
        original_row_total {
          currency
          value
        }
        row_total {
          currency
          value
        }
        catalog_discount {
          amount_off
          percent_off
        }
        discounts {
          label
          value
          amount {
            currency
            value
          }
        }
      }
      quantity
      ... on ConfigurableCartItem {
				configurable_options {
					option_label
					value_label
				}
			}
			... on BundleCartItem {
				bundle_options {
					label
					values {
						label
						quantity
            original_price {
							currency
							value
						}
						priceV2 {
							currency
							value
						}
					}
				}
			}
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
      }
    }
    prices {
      subtotal_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      applied_taxes {
        amount {
          currency
          value
        }
        label
      }
      grand_total {
        currency
        value
      }
    }
  }
`,f=`
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
  ${g}
`,y=async c=>{const{cartId:e,quoteName:t,comment:a,isDraft:o}=c;if(!e)throw new Error("Cart ID is required");if(!t)throw new Error("Quote name is required");if(!a)throw new Error("Comment is required");return _(f,{variables:{cartId:e,quoteName:t,comment:{comment:a},isDraft:o}}).then(n=>{var i,s;const{errors:u}=n;if(u){const l=u.map(m=>m.message).join("; ");throw new Error(`Failed to request negotiable quote: ${l}`)}const r=p((s=(i=n.data)==null?void 0:i.requestNegotiableQuote)==null?void 0:s.quote);if(!r)throw new Error("Failed to transform quote data: Invalid response structure");return d.emit("quote-management/negotiable-quote-requested",{quote:r,input:{cartId:e,quoteName:t,comment:a,isDraft:o}}),r})};export{g as N,y as r};
//# sourceMappingURL=requestNegotiableQuote.js.map
