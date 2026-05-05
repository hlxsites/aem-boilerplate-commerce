/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as G,i as A}from"./chunks/initialize.js";import{f as c,h as d,a as u}from"./chunks/removeCustomerAddress.js";import{e as _,d as b,g as F,j as N,i as O,k as R,r as T,s as $,b as k,c as H,u as I}from"./chunks/removeCustomerAddress.js";import{g as w,u as P}from"./chunks/updateCustomer.js";import{g as j}from"./chunks/getAdminAssistanceActions.js";import{d as z,g as B}from"./chunks/deletePaymentToken.js";import{g as K}from"./chunks/getOrderHistoryList.js";import{a as M,u as U}from"./chunks/updateCustomerEmail.js";import{g as W}from"./chunks/getStoreConfig.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./fragments.js";const g=t=>{var r,a;const s=(a=(r=t==null?void 0:t.data)==null?void 0:r.country)==null?void 0:a.available_regions;return s?s.filter(e=>{if(!e)return!1;const{id:n,code:i,name:m}=e;return!!(n&&i&&m)}).map(e=>{const{id:n}=e;return{id:n,text:e.name,value:`${e.code},${e.id}`}}):[]},f=`
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
`,y=async t=>{const s=`_account_regions_${t}`,o=sessionStorage.getItem(s);return o?JSON.parse(o):await c(f,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return d(r.errors);const a=g(r);return sessionStorage.setItem(s,JSON.stringify(a)),a}).catch(u)};export{G as config,_ as createCustomerAddress,z as deletePaymentToken,c as fetchGraphQl,j as getAdminAssistanceActions,b as getAttributesForm,F as getConfig,N as getCountries,w as getCustomer,O as getCustomerAddress,B as getCustomerPaymentTokens,K as getOrderHistoryList,y as getRegions,W as getStoreConfig,A as initialize,R as removeCustomerAddress,T as removeFetchGraphQlHeader,$ as setEndpoint,k as setFetchGraphQlHeader,H as setFetchGraphQlHeaders,P as updateCustomer,I as updateCustomerAddress,M as updateCustomerEmail,U as updateCustomerPassword};
//# sourceMappingURL=api.js.map
