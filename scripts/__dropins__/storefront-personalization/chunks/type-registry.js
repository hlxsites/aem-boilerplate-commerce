/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as i}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:d,setFetchGraphQlHeader:C,removeFetchGraphQlHeader:E,setFetchGraphQlHeaders:k,fetchGraphQl:u,getConfig:S}=new i().getMethods();function l(e){return e?{shareActiveSegments:e.share_active_segments,shareCustomerGroup:e.graphql_share_customer_group,shareAppliedCartRule:e.share_applied_cart_rule,customerAccessTokenLifetime:e.customer_access_token_lifetime}:null}const m=e=>{const t=e.map(s=>s.message).join(" ");throw Error(t)},h=`
query STORE_CONFIG_QUERY {
  storeConfig {
    share_active_segments
    graphql_share_customer_group
    share_applied_cart_rule
    customer_access_token_lifetime
  }
}
`,g=async()=>{const e=sessionStorage.getItem("personalizationStoreConfig");return e!==null?JSON.parse(e):u(h,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>{if(t)return m(t);const r=l(s.storeConfig);return sessionStorage.setItem("personalizationStoreConfig",JSON.stringify(r)),r})},a=3600,n="personalization_dropin_data",T=async e=>{const t=await f();document.cookie=`${n}=${e}; path=/; ${t}; `},p=()=>{const e=document.cookie.split(";");let t;return e.forEach(s=>{const[r,c]=s.trim().split("=");r===n&&(t=decodeURIComponent(c))}),t},f=async()=>{try{const e=await g();return`Max-Age=${(e==null?void 0:e.customerAccessTokenLifetime)||a}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${a}`}},O=()=>{const e=p();if(e===void 0)return{segments:[],groups:[],cartRules:[]};const t=JSON.parse(e);return t||{segments:[],groups:[],cartRules:[]}},o=[],I=e=>e===void 0?!0:o.includes(e)?!1:(o.push(e),!0),F=()=>{o.length=0};export{p as a,F as b,d as c,C as d,E as e,u as f,O as g,m as h,k as i,S as j,g as k,I as r,T as s};
