/*! Copyright 2024 Adobe
All Rights Reserved. */
import{P as _,a as e,G as E,O as R,B as t,b as r,A as T,R as a}from"./initialize.js";const d=`
  fragment GUEST_ORDER_FRAGMENT on CustomerOrder {
    email
    id
    number
    order_date
    order_status_change_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
    items_eligible_for_return {
      ...ORDER_ITEM_DETAILS_FRAGMENT
    }
    returns {
      ...RETURNS_FRAGMENT
    }
    payment_methods {
      name
      type
    }
    applied_coupons {
      code
    }
    shipments {
      id
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
        __typename
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
  ${_}
  ${e}
  ${E}
  ${R}
  ${t}
  ${r}
  ${T}
  ${a}
`;export{d as G};
