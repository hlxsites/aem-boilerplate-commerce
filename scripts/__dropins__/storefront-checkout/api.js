import{s as l,M as m,a as _,d as o,b as f}from"./chunks/fetch-graphql.js";import{D as Q,F as q,I as z,f as N,c as R,e as P,S as j,U as K,j as L,k as Y,l as J,r as V,g as W,h as X,i as Z}from"./chunks/fetch-graphql.js";import{t as C,C as S,a as y,b as h}from"./chunks/getCart.graphql.js";import{a as A,i as M}from"./chunks/store-config.js";import"@dropins/tools/event-bus.js";import{a as st,g as et,b as it}from"./chunks/getCustomer.js";import{c as rt,i as nt,a as ot,r as pt,b as dt}from"./chunks/resetCustomer.js";import{i as gt,s as ht}from"./chunks/setGuestEmailOnCart.js";import{p as mt}from"./chunks/placeOrder2.js";import{a as I}from"./chunks/setBillingAddress.js";import{s as _t}from"./chunks/setBillingAddress.js";import{s as Ct}from"./chunks/setPaymentMethod.js";import{s as yt}from"./chunks/setShippingMethods.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/signals.js";import"@dropins/tools/lib.js";const v=`
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
`,$=async e=>{var g;const s=l.cartId,{criteria:r}=e||{},{country_code:i,region_id:t,region_name:a,zip:n}=r||{},p=i||((g=A.value.data)==null?void 0:g.defaultCountry);if(!s)throw new m;if(!p)throw new _;const d=typeof t=="string"?parseInt(t,10):t,c=t||a?{...d&&{region_id:d},...a&&{region_code:a}}:void 0,u={country_code:p,...n&&{postcode:n},...c&&{region:c}};return await o({type:"mutation",query:v,options:{variables:{cartId:s,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:C})},D=e=>{var s;(s=window==null?void 0:window.location)==null||s.assign(e)},w=`
  mutation setShippingAddress($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${S}
`,U=async({address:e,customerAddressId:s,pickupLocationCode:r})=>{const i=l.cartId;if(!i)throw new m;const t={cart_id:i,shipping_addresses:[]};if(s)t.shipping_addresses.push({customer_address_id:s});else if(r)t.shipping_addresses.push({pickup_location_code:r});else{if(!e)throw new f;t.shipping_addresses.push({address:y(e)})}const a=await o({type:"mutation",query:w,options:{variables:{input:t}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:h});return M.value?await o({type:"mutation",query:I,options:{variables:{input:{cart_id:i,billing_address:{same_as_shipping:!0}}}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:h}):a};export{Q as DEFAULT_COUNTRY,q as FetchError,z as InvalidArgument,N as MissingBillingAddress,m as MissingCart,_ as MissingCountry,R as MissingEmail,P as MissingPaymentMethod,f as MissingShippinghAddress,j as STORE_CONFIG_DEFAULTS,K as UnexpectedError,rt as config,$ as estimateShippingMethods,L as fetchGraphQl,st as getCart,et as getCheckoutData,Y as getConfig,it as getCustomer,J as getStoreConfig,nt as initialize,ot as initializeCheckout,gt as isEmailAvailable,mt as placeOrder,D as redirect,V as removeFetchGraphQlHeader,pt as resetCheckout,dt as resetCustomer,_t as setBillingAddress,W as setEndpoint,X as setFetchGraphQlHeader,Z as setFetchGraphQlHeaders,ht as setGuestEmailOnCart,Ct as setPaymentMethod,U as setShippingAddress,yt as setShippingMethodsOnCart};
