/*! Copyright 2025 Adobe
All Rights Reserved. */
import{t as U,a as q,b as B,d as D,e as F,f as R,g as x,h as P}from"./chunks/synchronizeCheckout.js";import{i as qe,c as Qe,j as Te,k as Ce,l as we,r as $e,s as ve}from"./chunks/synchronizeCheckout.js";import{s as n,M as Q,b as k,d as r,Q as c,U as H,c as g,e as L,f as A,g as K}from"./chunks/fetch-graphql.js";import{D as Oe,S as Ue,m as Be,n as De,o as Fe,i as Re,r as xe,j as Pe,k as ke,l as He}from"./chunks/fetch-graphql.js";import{events as S}from"@dropins/tools/event-bus.js";import{g as T}from"./chunks/values.js";import"@dropins/tools/lib.js";import{t as z,a as E}from"./chunks/setShippingMethods.js";import{s as Ke}from"./chunks/setShippingMethods.js";import{A as V}from"./chunks/checkout.js";import{g as Ve,i as je,s as Ye}from"./chunks/setGuestEmailOnCart.js";import{NEGOTIABLE_QUOTE_FRAGMENT as l,CHECKOUT_DATA_FRAGMENT as C}from"./fragments.js";import{s as We}from"./chunks/setBillingAddress.js";import{s as Ze}from"./chunks/setPaymentMethod.js";import"@dropins/tools/signals.js";import"@dropins/tools/fetch-graphql.js";const j=`
  mutation estimateShippingMethods(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(input: { cart_id: $cartId, address: $address }) {
      carrier_title
      carrier_code
      method_title
      method_code
      available
      amount {
        currency
        value
      }
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
      error_message
    }
  }
`,w=e=>{const t=e.street.filter(Boolean);return{city:e.city,company:e.company||void 0,country:D(e.country),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:B(e.region),street:t,telephone:e.telephone||void 0}},Y=e=>{if(e)return w(e)},J=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:s,selected_shipping_method:i,...o}=t;return{...w(o),availableShippingMethods:q(s),selectedShippingMethod:U(i)}}),W=e=>e?e.filter(t=>!!t).map(t=>({id:t.agreement_id,name:t.name,mode:V[t.mode],text:t.checkbox_text,content:{value:t.content,html:t.is_html,height:t.content_height??null}})):[],m=e=>e?{availablePaymentMethods:R(e.available_payment_methods),billingAddress:Y(e.billing_address),email:e.email??"",isVirtual:e.is_virtual,name:e.name,selectedPaymentMethod:F(e.selected_payment_method),shippingAddresses:J(e.shipping_addresses),status:e.status,uid:e.uid}:null,_e=async e=>{var f,y,I,M;const t=n.cartId,s=((f=e==null?void 0:e.criteria)==null?void 0:f.country_code)??((y=n.config)==null?void 0:y.defaultCountry);if(!t)throw new Q;if(!s)throw new k;const{region_id:i,region_name:o,zip:a}=(e==null?void 0:e.criteria)??{},d=i||o?{region_id:typeof i=="string"?parseInt(i,10):i,region_code:o}:void 0,h={country_code:s,...a&&{postcode:a},...d&&{region:{...d.region_id&&{region_id:d.region_id},...d.region_code&&{region_code:d.region_code}}}},_={country_id:s,region:(I=h.region)==null?void 0:I.region_code,region_id:(M=h.region)==null?void 0:M.region_id,postcode:a},$=E(_);return r({options:{variables:{cartId:t,address:h}},path:"estimateShippingMethods",query:j,queueName:c.ShippingEstimate,transformer:q,type:"mutation"}).then(p=>{const v=p.length>0,G=E(_);let b=null;if(v){const u=T("selectedShippingMethod"),O=p.find(N=>N.code===(u==null?void 0:u.code)&&N.carrier.code===(u==null?void 0:u.carrier.code));b=z(O??p[0])}return S.emit("shipping/estimate",{address:G,availableShippingMethods:p,shippingMethod:b,success:!0}),p}).catch(p=>{throw S.emit("shipping/estimate",{address:$,shippingMethod:null,availableShippingMethods:[],success:!1}),p})},X=`
  query GET_CHECKOUT_AGREEMENTS {
    checkoutAgreements {
      agreement_id
      checkbox_text
      content
      content_height
      is_html
      mode
      name
    }
  }
`,Ae=async()=>await r({defaultValueOnFail:[],options:{method:"GET",cache:"no-cache"},path:"checkoutAgreements",query:X,transformer:W,type:"query"}),Z=`
  query getNegotiableQuote($quoteId: ID!) {
    negotiableQuote(uid: $quoteId) {
      ...NEGOTIABLE_QUOTE_FRAGMENT
    }
  }

  ${l}
`,fe=async(e={})=>{const t=e.uid??n.quoteId;if(n.authenticated===!1)throw new H;if(!t)throw new g;return await r({type:"query",query:Z,options:{method:"GET",cache:"no-cache",variables:{quoteId:t||""}},path:"negotiableQuote",transformer:m})},ee=`
  mutation setNegotiableQuoteBillingAddress(
    $quoteId: ID!
    $billingAddressInput: NegotiableQuoteBillingAddressInput!
  ) {
    setNegotiableQuoteBillingAddress(
      input: { quote_uid: $quoteId, billing_address: $billingAddressInput }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${l}
`,ye=async e=>{const t=n.quoteId;if(!t)throw new g;const{customer_address_uid:s,address:i}=e;if(!s&&!i)throw new L("Negotiable quote billing address");return await r({type:"mutation",query:ee,options:{variables:{quoteId:t,billingAddressInput:e}},path:"setNegotiableQuoteBillingAddress.quote",queueName:c.QuoteUpdates,transformer:m})},te=`
  mutation setNegotiableQuotePaymentMethod(
    $quoteId: ID!
    $paymentMethodInput: NegotiableQuotePaymentMethodInput!
  ) {
    setNegotiableQuotePaymentMethod(
      input: { quote_uid: $quoteId, payment_method: $paymentMethodInput }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${l}
`,Ie=async e=>{const t=n.quoteId;if(!t)throw new g;return await r({type:"mutation",query:te,queueName:c.QuoteUpdates,options:{variables:{quoteId:t,paymentMethodInput:e}},path:"setNegotiableQuotePaymentMethod.quote",transformer:m})},se=`
  mutation setNegotiableQuoteShippingAddress(
    $quoteId: ID!
    $shippingAddressInput: NegotiableQuoteShippingAddressInput!
  ) {
    setNegotiableQuoteShippingAddress(
      input: {
        quote_uid: $quoteId
        shipping_addresses: [$shippingAddressInput]
      }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${l}
`,Me=async e=>{const t=n.quoteId;if(!t)throw new g;if(!e||e.length===0)throw new A;const s=Array.isArray(e)?e[0]:e;if(!s)throw new A;const{customer_address_uid:i,address:o}=s;if(!i&&!o)throw new A;return await r({type:"mutation",query:se,options:{variables:{quoteId:t,shippingAddressInput:e}},path:"setNegotiableQuoteShippingAddress.quote",queueName:c.QuoteUpdates,transformer:m})},ie=`
  mutation setNegotiableQuoteShippingMethods(
    $quoteId: ID!
    $shippingMethodsInput: [ShippingMethodInput]!
  ) {
    setNegotiableQuoteShippingMethods(
      input: { quote_uid: $quoteId, shipping_methods: $shippingMethodsInput }
    ) {
      quote {
        ...NEGOTIABLE_QUOTE_FRAGMENT
      }
    }
  }

  ${l}
`,be=async e=>{const t=n.quoteId;if(!t)throw new g;if(!e||e.length===0)throw new K;return await r({type:"mutation",query:ie,queueName:c.QuoteUpdates,options:{variables:{quoteId:t,shippingMethodsInput:e}},path:"setNegotiableQuoteShippingMethods.quote",transformer:m})},oe=`
  mutation setShippingAddress(
    $cartId: String!
    $shippingAddressInput: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddressInput] }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${C}
`,ne=`
  mutation SET_SHIPPING_ADDRESS_ON_CART_AND_USE_AS_BILLING_MUTATION(
    $cartId: String!
    $shippingAddressInput: ShippingAddressInput!
  ) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [$shippingAddressInput] }
    ) {
      cart {
        id
      }
    }

    setBillingAddressOnCart(
      input: { cart_id: $cartId, billing_address: { same_as_shipping: true } }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${C}
`,Ne=async({address:e,customerAddressId:t,pickupLocationCode:s})=>{const i=n.cartId;if(!i)throw new Q;const o=()=>{if(t)return{customer_address_id:t};if(s)return{pickup_location_code:s};if(!e)throw new A;return{address:x(e)}},a=T("isBillToShipping"),d=a?ne:oe,h=a?"setBillingAddressOnCart.cart":"setShippingAddressesOnCart.cart",_={cartId:i,shippingAddressInput:o()};return await r({type:"mutation",query:d,options:{variables:_},path:h,queueName:c.CartUpdate,transformer:P})};export{Oe as DEFAULT_COUNTRY,Ue as STORE_CONFIG_DEFAULTS,qe as authenticateCustomer,Qe as config,_e as estimateShippingMethods,Be as fetchGraphQl,Te as getCart,Ae as getCheckoutAgreements,De as getConfig,Ve as getCustomer,fe as getNegotiableQuote,Fe as getStoreConfig,Re as getStoreConfigCache,Ce as initialize,we as initializeCheckout,je as isEmailAvailable,xe as removeFetchGraphQlHeader,$e as resetCheckout,We as setBillingAddress,Pe as setEndpoint,ke as setFetchGraphQlHeader,He as setFetchGraphQlHeaders,Ye as setGuestEmailOnCart,ye as setNegotiableQuoteBillingAddress,Ie as setNegotiableQuotePaymentMethod,Me as setNegotiableQuoteShippingAddress,be as setNegotiableQuoteShippingMethods,Ze as setPaymentMethod,Ne as setShippingAddress,Ke as setShippingMethodsOnCart,ve as synchronizeCheckout};
//# sourceMappingURL=api.js.map
