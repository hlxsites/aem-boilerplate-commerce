/*! Copyright 2024 Adobe
All Rights Reserved. */
import{c as H,r as X}from"./chunks/requestGuestOrderCancel.js";import{f as _,h as T}from"./chunks/fetch-graphql.js";import{g as V,r as Y,s as z,a as j,b as J}from"./chunks/fetch-graphql.js";import{g as W}from"./chunks/getAttributesForm.js";import{g as tt,r as et}from"./chunks/requestReturn.js";import{g as at,a as ot}from"./chunks/getGuestOrder.js";import{g as st}from"./chunks/getCustomerOrdersReturn.js";import{c as m,P as R,a as A,G as D,O as g,B as O,b as h,A as C}from"./chunks/initialize.js";import{e as pt,g as ct,d as ut,i as dt}from"./chunks/initialize.js";import{g as Et}from"./chunks/getStoreConfig.js";import{h as f}from"./chunks/network-error.js";import{events as u}from"@dropins/tools/event-bus.js";import{r as Tt}from"./chunks/reorderItems.js";import"./chunks/GurestOrderFragment.graphql.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const M=(e,r)=>({id:e,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(t=>{var a,o,n,s,i,p;return{canApplyMsrp:!0,formattedPrice:"",id:t.id,quantity:t.totalQuantity,product:{canonicalUrl:((a=t.product)==null?void 0:a.canonicalUrl)??"",mainImageUrl:((o=t.product)==null?void 0:o.image)??"",name:((n=t.product)==null?void 0:n.name)??"",productId:0,productType:(s=t.product)==null?void 0:s.productType,sku:((i=t.product)==null?void 0:i.sku)??""},prices:{price:{value:t.price.value,currency:t.price.currency}},configurableOptions:((p=t.selectedOptions)==null?void 0:p.map(c=>({optionLabel:c.label,valueLabel:c.value})))||[]}})}),G=e=>{var a,o,n;const r=e.coupons[0],t=(a=e.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:e.email,grandTotal:e.grandTotal.value,orderId:e.number,orderType:"checkout",otherTax:0,salesTax:e.totalTax.value,shipping:{shippingMethod:((o=e.shipping)==null?void 0:o.code)??"",shippingAmount:((n=e.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:e.subtotal.value,subtotalIncludingTax:0,payments:t?[{paymentMethodCode:(t==null?void 0:t.code)||"",paymentMethodName:(t==null?void 0:t.name)||"",total:e.grandTotal.value}]:[]}},N=e=>{var t,a;const r=(a=(t=e==null?void 0:e.data)==null?void 0:t.placeOrder)==null?void 0:a.orderV2;return r?m(r):null},d={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},b={PLACE_ORDER:"place-order"};function E(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(e,r){const t=E();t.push({[e]:null}),t.push({[e]:r})}function I(e,r){E().push(a=>{const o=a.getState?a.getState():{};a.push({event:e,eventInfo:{...o,...r}})})}function L(e,r){const t=G(r),a=M(e,r);l(d.ORDER_CONTEXT,{...t}),l(d.SHOPPING_CART_CONTEXT,{...a}),I(b.PLACE_ORDER)}const S=`
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
`,k=async e=>{if(!e)throw new Error("No cart ID found");return _(S,{variables:{cartId:e}}).then(r=>{var a;(a=r.errors)!=null&&a.length&&T(r.errors);const t=N(r);return t&&(u.emit("order/placed",t),u.emit("cart/reset",void 0),L(e,t)),t}).catch(f)};export{H as cancelOrder,pt as config,_ as fetchGraphQl,W as getAttributesForm,tt as getAttributesList,V as getConfig,at as getCustomer,st as getCustomerOrdersReturn,ot as getGuestOrder,ct as getOrderDetailsById,Et as getStoreConfig,ut as guestOrderByToken,dt as initialize,k as placeOrder,Y as removeFetchGraphQlHeader,Tt as reorderItems,X as requestGuestOrderCancel,et as requestReturn,z as setEndpoint,j as setFetchGraphQlHeader,J as setFetchGraphQlHeaders};
