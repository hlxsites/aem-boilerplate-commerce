/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as s}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:u,setFetchGraphQlHeader:n,removeFetchGraphQlHeader:_,setFetchGraphQlHeaders:l,fetchGraphQl:p,getConfig:d}=new s().getMethods(),c=o=>{const r=o.map(e=>e.message).join(" ");throw Error(r)},b=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function f(o){var r;return{uid:o.uid,name:o.name,description:o.description,updated_at:o.updated_at,items_count:o.items_count,items:a((r=o.items)==null?void 0:r.items)}}function a(o){return o!=null&&o.length?o.map(r=>({uid:r.uid,quantity:r.quantity,customizable_options:r.customizable_options?r.customizable_options.map(e=>({uid:e.customizable_option_uid,is_required:e.is_required,label:e.label,sort_order:e.sort_order,type:e.type,values:e.values.map(t=>({uid:t.customizable_option_value_uid,label:t.label,price:t.price,value:t.value}))})):[],bundle_options:r.bundle_options||[],configurable_options:r.configurable_options?r.configurable_options.map(e=>({option_uid:e.configurable_product_option_uid,option_label:e.option_label,value_uid:e.configurable_product_option_value_uid,value_label:e.value_label})):[],samples:r.samples?r.samples.map(e=>({url:e.sample_url,sort_order:e.sort_order,title:e.title})):[],gift_card_options:r.gift_card_options||{}})):[]}export{b as R,n as a,l as b,p as f,d as g,c as h,_ as r,u as s,f as t};
//# sourceMappingURL=transform-requisition-list.js.map
