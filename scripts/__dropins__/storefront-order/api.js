/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as J,r as K}from"./chunks/requestGuestOrderCancel.js";import{s as _,f as g,h as O}from"./chunks/fetch-graphql.js";import{g as Z,r as tt,a as et,b as rt}from"./chunks/fetch-graphql.js";import{g as ot}from"./chunks/getAttributesForm.js";import{g as ct,a as st,r as ut}from"./chunks/requestGuestReturn.js";import{g as lt,a as pt}from"./chunks/getGuestOrder.js";import{g as mt}from"./chunks/getCustomerOrdersReturn.js";import{a as R}from"./chunks/initialize.js";import{c as gt,g as Ot,d as ft,i as Et}from"./chunks/initialize.js";import{g as Ct}from"./chunks/getStoreConfig.js";import{h as f}from"./chunks/network-error.js";import{events as l}from"@dropins/tools/event-bus.js";import{PLACE_ORDER_FRAGMENT as E}from"./fragments.js";import{verifyReCaptcha as v}from"@dropins/tools/recaptcha.js";import{c as yt,a as bt,r as _t}from"./chunks/confirmCancelOrder.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-attributes-form.js";import"@dropins/tools/lib.js";const T=(e,r)=>e+r.amount.value,A=(e,r)=>({id:e,totalQuantity:r.totalQuantity,possibleOnepageCheckout:!0,items:r.items.map(t=>{var a,o,n,c,s,u,i,m;return{canApplyMsrp:!0,formattedPrice:"",id:t.id,quantity:t.totalQuantity,product:{canonicalUrl:(a=t.product)==null?void 0:a.canonicalUrl,mainImageUrl:((o=t.product)==null?void 0:o.image)??"",name:((n=t.product)==null?void 0:n.name)??"",productId:0,productType:(c=t.product)==null?void 0:c.productType,sku:((s=t.product)==null?void 0:s.sku)??"",topLevelSku:(u=t.product)==null?void 0:u.sku},prices:{price:{value:t.price.value,currency:t.price.currency,regularPrice:((i=t.regularPrice)==null?void 0:i.value)??t.price.value}},configurableOptions:((m=t.selectedOptions)==null?void 0:m.map(h=>({optionLabel:h.label,valueLabel:h.value})))||[]}}),prices:{subtotalExcludingTax:{value:r.subtotalExclTax.value,currency:r.subtotalExclTax.currency},subtotalIncludingTax:{value:r.subtotalInclTax.value,currency:r.subtotalInclTax.currency}},discountAmount:r.discounts.reduce(T,0)}),D=e=>{var a,o,n;const r=e.coupons[0],t=(a=e.payments)==null?void 0:a[0];return{appliedCouponCode:(r==null?void 0:r.code)??"",email:e.email,grandTotal:e.grandTotal.value,orderId:e.number,orderType:"checkout",otherTax:0,salesTax:e.totalTax.value,shipping:{shippingMethod:((o=e.shipping)==null?void 0:o.code)??"",shippingAmount:((n=e.shipping)==null?void 0:n.amount)??0},subtotalExcludingTax:e.subtotalExclTax.value,subtotalIncludingTax:e.subtotalInclTax.value,payments:t?[{paymentMethodCode:(t==null?void 0:t.code)||"",paymentMethodName:(t==null?void 0:t.name)||"",total:e.grandTotal.value,orderId:e.number}]:[],discountAmount:e.discounts.reduce(T,0),taxAmount:e.totalTax.value}},C=e=>{var t,a;const r=(a=(t=e==null?void 0:e.data)==null?void 0:t.placeOrder)==null?void 0:a.orderV2;return r?R(r):null},p={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext",CHANNEL_CONTEXT:"channelContext"},N={PLACE_ORDER:"place-order"};function x(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function d(e,r){const t=x();t.push({[e]:null}),t.push({[e]:r})}function P(e){x().push(t=>{const a=t.getState?t.getState():{};t.push({event:e,eventInfo:{...a}})})}function L(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function w(){d(p.CHANNEL_CONTEXT,L())}function y(e,r){const t=D(r),a=A(e,r);d(p.ORDER_CONTEXT,{...t}),d(p.SHOPPING_CART_CONTEXT,{...a}),w(),P(N.PLACE_ORDER)}class M extends Error{constructor(r){super(r),this.name="PlaceOrderError"}}const b=e=>{const r=e.map(t=>t.message).join(" ");throw new M(r)},G=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${E}
`,S=async()=>{const e=await v();e&&_("X-ReCaptcha",e)},j=async e=>{if(!e)throw new Error("No cart ID found");return await S(),g(G,{method:"POST",variables:{cartId:e}}).then(r=>{var a,o,n,c,s;(a=r.errors)!=null&&a.length&&O(r.errors),(c=(n=(o=r.data)==null?void 0:o.placeOrder)==null?void 0:n.errors)!=null&&c.length&&b((s=r.data.placeOrder)==null?void 0:s.errors);const t=C(r);return t&&(l.emit("order/placed",t),l.emit("cart/reset",void 0),y(e,t)),t}).catch(f)},k=`
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
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${E}
`,z=async(e,r)=>{if(!e)throw new Error("No cart ID found");if(!r)throw new Error("No payment method found");return g(k,{variables:{cartId:e,paymentMethod:r}}).then(t=>{var o,n,c,s,u,i;(o=t.errors)!=null&&o.length&&O(t.errors),(s=(c=(n=t.data)==null?void 0:n.placeOrder)==null?void 0:c.errors)!=null&&s.length&&b((u=t.data.placeOrder)==null?void 0:u.errors);const a=C({data:{placeOrder:(i=t.data)==null?void 0:i.placeOrder}});return a&&(l.emit("order/placed",a),l.emit("cart/reset",void 0),y(e,a)),a}).catch(f)};export{J as cancelOrder,gt as config,yt as confirmCancelOrder,bt as confirmGuestReturn,g as fetchGraphQl,ot as getAttributesForm,ct as getAttributesList,Z as getConfig,lt as getCustomer,mt as getCustomerOrdersReturn,pt as getGuestOrder,Ot as getOrderDetailsById,Ct as getStoreConfig,ft as guestOrderByToken,Et as initialize,j as placeOrder,tt as removeFetchGraphQlHeader,_t as reorderItems,K as requestGuestOrderCancel,st as requestGuestReturn,ut as requestReturn,et as setEndpoint,_ as setFetchGraphQlHeader,rt as setFetchGraphQlHeaders,z as setPaymentMethodAndPlaceOrder};
//# sourceMappingURL=api.js.map
