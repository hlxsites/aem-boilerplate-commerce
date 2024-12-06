/*! Copyright 2024 Adobe
All Rights Reserved. */
import{P as d,a as T,G as i,O as A,B as D,b as c,A as u,c as E}from"./initialize.js";import{f as s,h as R}from"./fetch-graphql.js";import{G as O}from"./GurestOrderFragment.graphql.js";const G=`
  mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
    cancelOrder(input: { order_id: $orderId, reason: $reason }) {
      error
      order {
        email
        available_actions
        status
        number
        id
        order_date
        carrier
        shipping_method
        is_virtual
        applied_coupons {
          code
        }
        shipments {
          id
          number
          tracking {
            title
            number
            carrier
          }
          comments {
            message
            timestamp
          }
          items {
            id
            product_sku
            product_name
            order_item {
              ...ORDER_ITEM_DETAILS_FRAGMENT
              ... on GiftCardOrderItem {
                ...GIFT_CARD_DETAILS_FRAGMENT
                product {
                  ...PRODUCT_DETAILS_FRAGMENT
                }
              }
            }
          }
        }
        payment_methods {
          name
          type
        }
        shipping_address {
          ...ADDRESS_FRAGMENT
        }
        billing_address {
          ...ADDRESS_FRAGMENT
        }
        items {
          ...ORDER_ITEM_DETAILS_FRAGMENT
          ... on BundleOrderItem {
            ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
          }
          ... on GiftCardOrderItem {
            ...GIFT_CARD_DETAILS_FRAGMENT
            product {
              ...PRODUCT_DETAILS_FRAGMENT
            }
          }
          ... on DownloadableOrderItem {
            product_name
            downloadable_links {
              sort_order
              title
            }
          }
        }
        total {
          ...ORDER_SUMMARY_FRAGMENT
        }
      }
    }
  }
  ${d}
  ${T}
  ${i}
  ${A}
  ${D}
  ${c}
  ${u}
`,M=async(r,e,n,t)=>{if(!r)throw new Error("No order ID found");if(!e)throw new Error("No reason found");return s(G,{variables:{orderId:r,reason:e}}).then(({errors:o,data:a})=>{if(o)return R(o);if(a.cancelOrder.error!=null){t();return}const _=E(a.cancelOrder.order);n(_)}).catch(()=>t())},l=`
  mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION(
    $token: String!
    $reason: String!
  ) {
    requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
      error
      order {
        ...guestOrderData
      }
    }
  }
  ${O}
`,S=async(r,e,n,t)=>{if(!r)throw new Error("No order token found");if(!e)throw new Error("No reason found");return s(l,{variables:{token:r,reason:e}}).then(({errors:o,data:a})=>{if(o)return R(o);a.requestGuestOrderCancel.error!=null&&t();const _=E(a.requestGuestOrderCancel.order);n(_)}).catch(()=>t())};export{M as c,S as r};
