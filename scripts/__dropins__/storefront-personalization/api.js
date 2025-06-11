/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as u}from"@dropins/tools/lib.js";import{events as a}from"@dropins/tools/event-bus.js";import{f as l,h as f,a as g,s as m,b as p}from"./chunks/type-registry.js";import{j as O,g as y,k as P,e as T,c as z,d as Q,i as C}from"./chunks/type-registry.js";import"@dropins/tools/fetch-graphql.js";const n="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",s=async t=>{const e=await h(t);e!==null&&c(e)},o=new u({init:async t=>{const e={};o.config.setConfig({...e,...t})},listeners:()=>[a.on("authenticated",t=>{t?localStorage.setItem(n,JSON.stringify(!0)):c({segments:[],groups:[],cartRules:[]})}),a.on("cart/updated",async t=>{t!==null&&s(t.id)}),a.on("cart/initialized",t=>{if(t===null)return;const e=localStorage.getItem(n);(e!==null?JSON.parse(e):!1)===!0&&(s(t.id),localStorage.setItem(n,JSON.stringify(!1)))})]}),E=o.config;function d(t){return t?{groups:[t.customerGroup.uid],segments:i(t.customerSegments),cartRules:i(t.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function i(t){return t.length?t.map(e=>e.uid):[]}const I=`
query PERSONALIZATION_DATA(
      $cartId: String!
    ) {
      customerGroup {
        uid
      }
      customerSegments(cart_id: $cartId) {
        uid
      }
      cart(cart_id: $cartId) {
        rules {
          uid
        }
      }
    }
`,h=async t=>l(I,{variables:{cartId:t}}).then(({errors:e,data:r})=>e?f(e):d(r)),c=async t=>{p();const e=g(),r=JSON.stringify(t);e!==r&&(await m(r),a.emit("personalization/updated",t))};export{E as config,l as fetchGraphQl,h as fetchPersonalizationData,O as getConfig,y as getPersonalizationData,P as getStoreConfig,o as initialize,T as removeFetchGraphQlHeader,c as savePersonalizationData,z as setEndpoint,Q as setFetchGraphQlHeader,C as setFetchGraphQlHeaders};
