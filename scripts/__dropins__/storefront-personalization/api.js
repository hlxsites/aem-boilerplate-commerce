/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as l}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as g,h as f,a as m,s as I,b as d}from"./chunks/type-registry.js";import{j as P,g as T,k as y,e as z,c as Q,d as U,i as C}from"./chunks/type-registry.js";import"@dropins/tools/fetch-graphql.js";const a="DROPIN__PERSONALIZATION__REQUIRE_UPDATE__DATA",n="DROPIN__PERSONALIZATION__AUTH",o=async e=>{const t=await _(e);t!==null&&c(t)},u=new l({init:async e=>{const t={};u.config.setConfig({...t,...e})},listeners:()=>[s.on("authenticated",e=>{const t=sessionStorage.getItem(n);t!==null&&t==="true"===e||(e?(localStorage.setItem(a,"true"),sessionStorage.setItem(n,"true")):(sessionStorage.setItem(n,"false"),c({segments:[],groups:[],cartRules:[]})))},{eager:!0}),s.on("cart/updated",async e=>{e!==null&&o(e.id)},{eager:!0}),s.on("cart/initialized",e=>{if(e===null)return;const t=localStorage.getItem(a);(t!==null?t==="true":!1)&&(o(e.id),localStorage.setItem(a,JSON.stringify(!1)))},{eager:!0})]}),R=u.config;function p(e){return e?{groups:[e.customerGroup.uid],segments:i(e.customerSegments),cartRules:i(e.cart.rules)}:{groups:[],segments:[],cartRules:[]}}function i(e){return e.length?e.map(t=>t.uid):[]}const A=`
query PERSONALIZATION_DATA(
      $cartId: String!
    ) {
      customerGroup {
        uid
      }
      customerSegments(cartId: $cartId) {
        uid
      }
      cart(cart_id: $cartId) {
        rules {
          uid
        }
      }
    }
`,_=async e=>g(A,{variables:{cartId:e}}).then(({errors:t,data:r})=>t?f(t):p(r)),c=async e=>{d();const t=m(),r=JSON.stringify(e);t!==r&&(await I(r),s.emit("personalization/updated",e))};export{R as config,g as fetchGraphQl,_ as fetchPersonalizationData,P as getConfig,T as getPersonalizationData,y as getStoreConfig,u as initialize,z as removeFetchGraphQlHeader,c as savePersonalizationData,Q as setEndpoint,U as setFetchGraphQlHeader,C as setFetchGraphQlHeaders};
