/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as c}from"@dropins/tools/lib.js";import{events as t}from"@dropins/tools/event-bus.js";import{s as n}from"./state.js";import{h as f}from"./fetch-error.js";import{f as u}from"./fetch-graphql.js";const m=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
    requisition_list_sharing_enabled
    requisition_list_share_max_recipients
    requisition_list_share_storefront_path
  }
}
`,g=async()=>{try{const{errors:i,data:e}=await u(m,{cache:"force-cache"});if(i){if(i.some(s=>s.message&&s.message.includes('Cannot query field "is_requisition_list_active"')||s.message.includes('Cannot query field "company_enabled"')))return!1;const o=i.some(s=>s.message.includes('Cannot query field "requisition_list_sharing_enabled"')),a=i.some(s=>s.message.includes('Cannot query field "requisition_list_share_max_recipients"')),_=i.some(s=>s.message.includes('Cannot query field "requisition_list_share_storefront_path"'));return o||a||_?{...e==null?void 0:e.storeConfig,...o?{requisition_list_sharing_enabled:!1}:{},...a?{requisition_list_share_max_recipients:null}:{},..._?{requisition_list_share_storefront_path:null}:{}}:f(i)}return e==null?void 0:e.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null}}},l=new c({init:async i=>{const e={};n.config||(n.config=await g(),t.emit("requisitionList/initialized",n.config)),l.config.setConfig({...e,...i})},listeners:()=>[t.on("authenticated",i=>{n.authenticated=i,i||(n.isCompanyUser=!1)}),t.on("auth/permissions",i=>{n.isCompanyUser=i!=null&&typeof i=="object"&&Object.entries(i).some(([e,r])=>r===!0&&e!=="all")},{eager:!0})]}),y=l.config;export{y as c,g,l as i};
//# sourceMappingURL=initialize.js.map
