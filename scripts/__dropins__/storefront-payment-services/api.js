/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as _,a as o,f as l,P as T}from"./chunks/initialize.js";import{g as G,i as R,r as U,b as L,d as Q,e as z}from"./chunks/initialize.js";import{events as P}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const b=`
  query GET_CUSTOMER_PAYMENT_TOKENS {
    customerPaymentTokens {
      items {
        details
        public_hash
        payment_method_code
        type
      }
    }
  }
`;function d(){var t;const e=(t=_.getConfig())==null?void 0:t.getCustomerToken;if(!e)return{};const r=e();return r?{Authorization:`Bearer ${r}`}:{}}const m=e=>{const r=e.map(t=>t.message).join(" ");throw Error(r)},p=e=>{throw e instanceof DOMException&&e.name==="AbortError"||P.emit("error",{source:"payment-services",type:"network",error:e}),e};function C(e){if(!e)return{};if(typeof e=="object"&&e!==null)return e;try{return JSON.parse(String(e))}catch{return{}}}function E(e){const r=C(e==null?void 0:e.details),t=(e==null?void 0:e.payment_method_code)||"";return{publicHash:e==null?void 0:e.public_hash,methodCode:t,type:(e==null?void 0:e.type)||"",brand:r.brand||r.type||"",masked:r.maskedCC||r.maskedNumber||r.last4||"",expiry:r.expirationDate||r.expiryDate||"",holder:r.holderName||r.cardHolder||""}}function g(e){const r=(e.methodCode||"").toLowerCase();return r===o.VAULT||r===o.CREDIT_CARD||r.includes("payment_services")&&r.includes("vault")?!0:e.type==="card"&&r.includes("payment_services")}function v(e){var t;return(((t=e==null?void 0:e.customerPaymentTokens)==null?void 0:t.items)??[]).map(a=>E(a)).filter(a=>!!a.publicHash&&g(a))}function S(e){return{publicHash:e.publicHash,brand:e.brand,maskedNumber:e.masked,expiry:e.expiry,holderName:e.holder}}async function I(){const{data:e,errors:r}=await l(b,{method:"GET",headers:d()}).catch(p);return r!=null&&r.length&&m(r),v(e)}const h=`
  mutation CreatePaymentOrderForVault($input: CreatePaymentOrderInput!) {
    createPaymentOrder(input: $input) {
      id
      mp_order_id
      status
    }
  }
`;function A(e,r){const t=e==null?void 0:e.publicHash;if(!t)return{};const a={public_hash:t,payment_source:"vault"};return r!=null&&r.paypal_order_id&&(r!=null&&r.payments_order_id)&&(a.paypal_order_id=r.paypal_order_id,a.payments_order_id=r.payments_order_id),{[o.VAULT]:a}}function y(e){return{cartId:e,methodCode:o.VAULT,paymentSource:"vault",location:T.CHECKOUT,vaultIntent:!1}}function f(e){const r=e==null?void 0:e.id,t=e==null?void 0:e.mp_order_id;return!r||!t?null:{paypalOrderId:r,paymentsOrderId:t}}async function M(e){const{data:r,errors:t}=await l(h,{variables:{input:y(e)},headers:d()}).catch(p);t!=null&&t.length&&m(t);const a=r,n=f(a==null?void 0:a.createPaymentOrder);if(!n)throw new Error("createPaymentOrderForVault returned no PayPal / MP order ids");return n}async function x(e,r,t){if(!r||!(e==null?void 0:e.publicHash))return null;try{const{data:n,errors:i}=await t.fetchGraphQl(h,{variables:{input:y(r)}});if(i!=null&&i.length)return console.error("createPaymentOrder (vault) failed",i),null;const u=n==null?void 0:n.createPaymentOrder,s=f(u);if(!s)return console.error("createPaymentOrder (vault) returned no order ids",u),null;const c=A(e,{paypal_order_id:s.paypalOrderId,payments_order_id:s.paymentsOrderId});return await t.setPaymentMethod({code:o.VAULT,...c}),c}catch{return console.error("Vault payment method sync failed"),null}}export{h as CREATE_PAYMENT_ORDER_FOR_VAULT,b as GET_CUSTOMER_PAYMENT_TOKENS,T as PaymentLocation,o as PaymentMethodCode,y as buildVaultCreatePaymentOrderInput,_ as config,M as createPaymentOrderForVault,A as createVaultAdditionalData,f as extractVaultPaymentOrderIds,l as fetchGraphQl,G as getConfig,I as getCustomerPaymentTokens,v as getVaultEligibleTokensFromCustomerPaymentTokensData,R as initialize,g as isPaymentServicesStoredCardToken,E as normalizeVaultToken,S as normalizedVaultTokenToStoredCardProps,C as parseTokenDetails,U as removeFetchGraphQlHeader,L as setEndpoint,Q as setFetchGraphQlHeader,z as setFetchGraphQlHeaders,x as syncVaultToCart};
//# sourceMappingURL=api.js.map
