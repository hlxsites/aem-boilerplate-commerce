/*! Copyright 2024 Adobe
All Rights Reserved. */
import{c as q,r as X}from"./chunks/requestGuestOrderCancel.js";import{f as E,h as _}from"./chunks/fetch-graphql.js";import{g as Y,r as z,s as j,a as J,b as K}from"./chunks/fetch-graphql.js";import{g as Z}from"./chunks/getAttributesForm.js";import{g as te,a as re,r as ae}from"./chunks/requestGuestReturn.js";import{g as ne,a as se}from"./chunks/getGuestOrder.js";import{g as pe}from"./chunks/getCustomerOrdersReturn.js";import{c as T,P as R,a as A,G as D,O as g,B as O,b as h,A as C}from"./chunks/initialize.js";import{e as ue,g as de,d as le,i as me}from"./chunks/initialize.js";import{g as _e}from"./chunks/getStoreConfig.js";import{h as f}from"./chunks/network-error.js";import{events as u}from"@dropins/tools/event-bus.js";import{a as Re,c as Ae,r as De}from"./chunks/confirmCancelOrder.js";import"./chunks/GurestOrderFragment.graphql.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"./chunks/RequestReturnOrderFragment.graphql.js";import"@dropins/tools/lib.js";const G=(t,r)=>({id:t,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(e=>{var a,o,n,s,i,p;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:((a=e.product)==null?void 0:a.canonicalUrl)??"",mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((i=e.product)==null?void 0:i.sku)??""},prices:{price:{value:e.price.value,currency:e.price.currency}},configurableOptions:((p=e.selectedOptions)==null?void 0:p.map(c=>({optionLabel:c.label,valueLabel:c.value})))||[]}})}),M=t=>{var a,o,n;const r=t.coupons[0],e=(a=t.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:t.email,grandTotal:t.grandTotal.value,orderId:t.number,orderType:"checkout",otherTax:0,salesTax:t.totalTax.value,shipping:{shippingMethod:((o=t.shipping)==null?void 0:o.code)??"",shippingAmount:((n=t.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:t.subtotal.value,subtotalIncludingTax:0,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:t.grandTotal.value}]:[]}},N=t=>{var e,a;const r=(a=(e=t==null?void 0:t.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return r?T(r):null},d={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},b={PLACE_ORDER:"place-order"};function m(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(t,r){const e=m();e.push({[t]:null}),e.push({[t]:r})}function I(t,r){m().push(a=>{const o=a.getState?a.getState():{};a.push({event:t,eventInfo:{...o,...r}})})}function L(t,r){const e=M(r),a=G(t,r);l(d.ORDER_CONTEXT,{...e}),l(d.SHOPPING_CART_CONTEXT,{...a}),I(b.PLACE_ORDER)}const S=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
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
  ${R}
  ${A}
  ${D}
  ${g}
  ${O}
  ${h}
  ${C}
`,Q=async t=>{if(!t)throw new Error("No cart ID found");return E(S,{variables:{cartId:t}}).then(r=>{var a;(a=r.errors)!=null&&a.length&&_(r.errors);const e=N(r);return e&&(u.emit("order/placed",e),u.emit("cart/reset",void 0),L(t,e)),e}).catch(f)};export{q as cancelOrder,ue as config,Re as confirmCancelOrder,Ae as confirmGuestReturn,E as fetchGraphQl,Z as getAttributesForm,te as getAttributesList,Y as getConfig,ne as getCustomer,pe as getCustomerOrdersReturn,se as getGuestOrder,de as getOrderDetailsById,_e as getStoreConfig,le as guestOrderByToken,me as initialize,Q as placeOrder,z as removeFetchGraphQlHeader,De as reorderItems,X as requestGuestOrderCancel,re as requestGuestReturn,ae as requestReturn,j as setEndpoint,J as setFetchGraphQlHeader,K as setFetchGraphQlHeaders};
