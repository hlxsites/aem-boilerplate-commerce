/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as l}from"@dropins/tools/lib.js";import{events as a}from"@dropins/tools/event-bus.js";import{s as n}from"./state.js";import{h as c}from"./fetch-error.js";import{f}from"./fetch-graphql.js";const u=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
    requisition_list_sharing_enabled
    requisition_list_share_max_recipients
    requisition_list_share_storefront_path
  }
}
`,m=async()=>{try{const{errors:i,data:s}=await f(u,{cache:"force-cache"});if(i){if(i.some(e=>e.message&&e.message.includes('Cannot query field "is_requisition_list_active"')||e.message.includes('Cannot query field "company_enabled"')))return!1;const t=i.some(e=>e.message.includes('Cannot query field "requisition_list_sharing_enabled"')),r=i.some(e=>e.message.includes('Cannot query field "requisition_list_share_max_recipients"')),o=i.some(e=>e.message.includes('Cannot query field "requisition_list_share_storefront_path"'));return t||r||o?{...s==null?void 0:s.storeConfig,...t?{requisition_list_sharing_enabled:!1}:{},...r?{requisition_list_share_max_recipients:null}:{},...o?{requisition_list_share_storefront_path:null}:{}}:c(i)}return s==null?void 0:s.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null}}},_=new l({init:async i=>{const s={};n.config||(n.config=await m(),a.emit("requisitionList/initialized",n.config)),_.config.setConfig({...s,...i})},listeners:()=>[a.on("authenticated",i=>{n.authenticated=i})]}),y=_.config;export{y as c,m as g,_ as i};
//# sourceMappingURL=initialize.js.map
