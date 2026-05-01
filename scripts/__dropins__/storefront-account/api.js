/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as G,i as v}from"./chunks/initialize.js";import{f as d,h as c,a as u}from"./chunks/removeCustomerAddress.js";import{i as b,e as A,g as F,k as N,j as O,l as R,r as T,s as $,b as k,d as H,u as I}from"./chunks/removeCustomerAddress.js";import{g as w}from"./chunks/getCustomer.js";import{d as J,g as j}from"./chunks/deletePaymentToken.js";import{g as z}from"./chunks/getOrderHistoryList.js";import{a as D,u as K}from"./chunks/updateCustomerEmail.js";import{g as M}from"./chunks/getStoreConfig.js";import{u as V}from"./chunks/updateCustomer.js";import"@dropins/tools/lib.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./fragments.js";const g=t=>{var r,o;const a=(o=(r=t==null?void 0:t.data)==null?void 0:r.country)==null?void 0:o.available_regions;return a?a.filter(e=>{if(!e)return!1;const{id:n,code:i,name:m}=e;return!!(n&&i&&m)}).map(e=>{const{id:n}=e;return{id:n,text:e.name,value:`${e.code},${e.id}`}}):[]},f=`
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
`,y=async t=>{const a=`_account_regions_${t}`,s=sessionStorage.getItem(a);return s?JSON.parse(s):await d(f,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return c(r.errors);const o=g(r);return sessionStorage.setItem(a,JSON.stringify(o)),o}).catch(u)};export{G as config,b as createCustomerAddress,J as deletePaymentToken,d as fetchGraphQl,A as getAttributesForm,F as getConfig,N as getCountries,w as getCustomer,O as getCustomerAddress,j as getCustomerPaymentTokens,z as getOrderHistoryList,y as getRegions,M as getStoreConfig,v as initialize,R as removeCustomerAddress,T as removeFetchGraphQlHeader,$ as setEndpoint,k as setFetchGraphQlHeader,H as setFetchGraphQlHeaders,V as updateCustomer,I as updateCustomerAddress,D as updateCustomerEmail,K as updateCustomerPassword};
//# sourceMappingURL=api.js.map
