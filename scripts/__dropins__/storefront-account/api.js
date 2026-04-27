/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as G,i as v}from"./chunks/initialize.js";import{f as m,h as c,a as u}from"./chunks/removeCustomerAddress.js";import{e as b,d as A,g as F,j as N,i as O,k as R,r as T,s as $,b as k,c as H,u as I}from"./chunks/removeCustomerAddress.js";import{g as w,u as P}from"./chunks/updateCustomer.js";import{d as j,g as q}from"./chunks/deletePaymentToken.js";import{g as B}from"./chunks/getOrderHistoryList.js";import{a as K,u as L}from"./chunks/updateCustomerEmail.js";import{g as U}from"./chunks/getStoreConfig.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./fragments.js";const g=t=>{var r,s;const a=(s=(r=t==null?void 0:t.data)==null?void 0:r.country)==null?void 0:s.available_regions;return a?a.filter(e=>{if(!e)return!1;const{id:n,code:i,name:d}=e;return!!(n&&i&&d)}).map(e=>{const{id:n}=e;return{id:n,text:e.name,value:`${e.code},${e.id}`}}):[]},f=`
  query GET_REGIONS($countryCode: String!) {
    country(id: $countryCode) {
      id
      available_regions {
        id
        code
        name
      }
    }
  }
`,S=async t=>{const a=`_account_regions_${t}`,o=sessionStorage.getItem(a);return o?JSON.parse(o):await m(f,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return c(r.errors);const s=g(r);return sessionStorage.setItem(a,JSON.stringify(s)),s}).catch(u)};export{G as config,b as createCustomerAddress,j as deletePaymentToken,m as fetchGraphQl,A as getAttributesForm,F as getConfig,N as getCountries,w as getCustomer,O as getCustomerAddress,q as getCustomerPaymentTokens,B as getOrderHistoryList,S as getRegions,U as getStoreConfig,v as initialize,R as removeCustomerAddress,T as removeFetchGraphQlHeader,$ as setEndpoint,k as setFetchGraphQlHeader,H as setFetchGraphQlHeaders,P as updateCustomer,I as updateCustomerAddress,K as updateCustomerEmail,L as updateCustomerPassword};
//# sourceMappingURL=api.js.map
