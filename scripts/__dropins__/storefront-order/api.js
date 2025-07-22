/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as ne,r as se}from"./chunks/requestGuestOrderCancel.js";import{s as M,f as m,h as T}from"./chunks/fetch-graphql.js";import{g as ie,r as ue,a as de,b as le}from"./chunks/fetch-graphql.js";import{g as Ee}from"./chunks/getAttributesForm.js";import{g as me,a as Te,r as Re}from"./chunks/requestGuestReturn.js";import{g as ge,a as he}from"./chunks/getGuestOrder.js";import{g as De}from"./chunks/getCustomerOrdersReturn.js";import{a as G}from"./chunks/initialize.js";import{c as Me,g as Ge,d as Ce,i as Ne}from"./chunks/initialize.js";import{g as xe}from"./chunks/getStoreConfig.js";import{h as R}from"./chunks/network-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{ADDRESS_FRAGMENT as C,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as N,GIFT_CARD_DETAILS_FRAGMENT as y,ORDER_ITEM_DETAILS_FRAGMENT as x,ORDER_SUMMARY_FRAGMENT as F,PRICE_DETAILS_FRAGMENT as P,PRODUCT_DETAILS_FRAGMENT as I,ORDER_ITEM_FRAGMENT as b,GIFT_WRAPPING_FRAGMENT as S,GIFT_MESSAGE_FRAGMENT as v,APPLIED_GIFT_CARDS_FRAGMENT as L}from"./fragments.js";import{verifyReCaptcha as $}from"@dropins/tools/recaptcha.js";import{c as Pe,a as Ie,r as be}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const A=(t,r)=>t+r.amount.value,w=(t,r)=>({id:t,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(e=>{var a,o,n,s,c,i,u,l;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(a=e.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=e.product)==null?void 0:o.image)??"",name:((n=e.product)==null?void 0:n.name)??"",productId:0,productType:(s=e.product)==null?void 0:s.productType,sku:((c=e.product)==null?void 0:c.sku)??"",topLevelSku:(i=e.product)==null?void 0:i.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((u=e.regularPrice)==null?void 0:u.value)??e.price.value}},configurableOptions:((l=e.selectedOptions)==null?void 0:l.map(p=>({optionLabel:p.label,valueLabel:p.value})))||[]}}),prices:{subtotalExcludingTax:{value:r.subtotalExclTax.value,currency:r.subtotalExclTax.currency},subtotalIncludingTax:{value:r.subtotalInclTax.value,currency:r.subtotalInclTax.currency}},discountAmount:r.discounts.reduce(A,0)}),k=t=>{var a,o,n;const r=t.coupons[0],e=(a=t.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:t.email,grandTotal:t.grandTotal.value,orderId:t.number,orderType:"checkout",otherTax:0,salesTax:t.totalTax.value,shipping:{shippingMethod:((o=t.shipping)==null?void 0:o.code)??"",shippingAmount:((n=t.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:t.subtotalExclTax.value,subtotalIncludingTax:t.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:t.grandTotal.value,orderId:t.number}]:[],discountAmount:t.discounts.reduce(A,0),taxAmount:t.totalTax.value}},g=t=>{var e,a;const r=(a=(e=t==null?void 0:t.data)==null?void 0:e.placeOrder)==null?void 0:a.orderV2;return r?G(r):null},E={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext"},U={PLACE_ORDER:"place-order"};function h(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function _(t,r){const e=h();e.push({[t]:null}),e.push({[t]:r})}function Q(t){h().push(e=>{const a=e.getState?e.getState():{};e.push({event:t,eventInfo:{...a}})})}function O(t,r){const e=k(r),a=w(t,r);_(E.ORDER_CONTEXT,{...e}),_(E.SHOPPING_CART_CONTEXT,{...a}),Q(U.PLACE_ORDER)}class H extends Error{constructor(r){super(r),this.name="PlaceOrderError"}}const D=t=>{const r=t.map(e=>e.message).join(" ");throw new H(r)},f=`
  fragment PLACE_ORDER_FRAGMENT on CustomerOrder {
    printed_card_included
    gift_receipt_included
    gift_wrapping {
      ...GIFT_WRAPPING_FRAGMENT
    }
    gift_message {
      ...GIFT_MESSAGE_FRAGMENT
    }
    applied_gift_cards {
      ...APPLIED_GIFT_CARDS_FRAGMENT
    }
    email
    available_actions
    status
    number
    token
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
      ...ORDER_ITEM_FRAGMENT
    }
    total {
      ...ORDER_SUMMARY_FRAGMENT
    }
  }

  ${C}
  ${N}
  ${y}
  ${x}
  ${F}
  ${P}
  ${I}
  ${b}
  ${S}
  ${v}
  ${L}
`,X=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        ...PLACE_ORDER_FRAGMENT
      }
    }
  }

  ${f}
`,q=async()=>{const t=await $();t&&M("X-ReCaptcha",t)},te=async t=>{if(!t)throw new Error("No cart ID found");return await q(),m(X,{method:"POST",variables:{cartId:t}}).then(r=>{var a,o,n,s,c;(a=r.errors)!=null&&a.length&&T(r.errors),(s=(n=(o=r.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&s.length&&D((c=r.data.placeOrder)==null?void 0:c.errors);const e=g(r);return e&&(d.emit("order/placed",e),d.emit("cart/reset",void 0),O(t,e)),e}).catch(R)},B=`
  mutation setPaymentMethodAndPlaceOrder($cartId: String!, $paymentMethod: PaymentMethodInput!) {
    setPaymentMethodOnCart(
      input: {
        cart_id: $cartId
        payment_method: $paymentMethod
      }
    ) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
    placeOrder(input: { cart_id: $cartId }) {
      errors {
        code
        message
      }
      orderV2 {
        ...PLACE_ORDER_FRAGMENT
      }
    }
  }

  ${f}
`,re=async(t,r)=>{if(!t)throw new Error("No cart ID found");if(!r)throw new Error("No payment method found");return m(B,{variables:{cartId:t,paymentMethod:r}}).then(e=>{var o,n,s,c,i,u;(o=e.errors)!=null&&o.length&&T(e.errors),(c=(s=(n=e.data)==null?void 0:n.placeOrder)==null?void 0:s.errors)!=null&&c.length&&D((i=e.data.placeOrder)==null?void 0:i.errors);const a=g({data:{placeOrder:(u=e.data)==null?void 0:u.placeOrder}});return a&&(d.emit("order/placed",a),d.emit("cart/reset",void 0),O(t,a)),a}).catch(R)};export{ne as cancelOrder,Me as config,Pe as confirmCancelOrder,Ie as confirmGuestReturn,m as fetchGraphQl,Ee as getAttributesForm,me as getAttributesList,ie as getConfig,ge as getCustomer,De as getCustomerOrdersReturn,he as getGuestOrder,Ge as getOrderDetailsById,xe as getStoreConfig,Ce as guestOrderByToken,Ne as initialize,te as placeOrder,ue as removeFetchGraphQlHeader,be as reorderItems,se as requestGuestOrderCancel,Te as requestGuestReturn,Re as requestReturn,de as setEndpoint,M as setFetchGraphQlHeader,le as setFetchGraphQlHeaders,re as setPaymentMethodAndPlaceOrder};
