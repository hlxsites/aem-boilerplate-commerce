/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as o}from"./chunks/transform-requisition-list.js";import{g as d,r as m,s as u,a as _,b as E}from"./chunks/transform-requisition-list.js";import{g as G}from"./chunks/getRequisitionLists.js";import{d as q}from"./chunks/deleteRequisitionList.js";import{Initializer as r}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const i=new r({init:async e=>{const t={};i.config.setConfig({...t,...e})},listeners:()=>[]}),h=i.config,n=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
  }
}
`,l=async()=>s(n,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?o(e):t.storeConfig.is_requisition_list_active==="1");export{h as config,q as deleteRequisitionList,s as fetchGraphQl,d as getConfig,G as getRequisitionLists,i as initialize,l as isRequisitionListEnabled,m as removeFetchGraphQlHeader,u as setEndpoint,_ as setFetchGraphQlHeader,E as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
