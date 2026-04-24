/*! Copyright 2026 Adobe
All Rights Reserved. */
const a=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;function c(t){var o,_;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:l((o=t.items)==null?void 0:o.items),page_info:(_=t.items)==null?void 0:_.page_info}:null}function l(t){return t!=null&&t.length?t.map(o=>{var r,n,i,s;const _={uid:o.uid,sku:(r=o.product)==null?void 0:r.sku,quantity:o.quantity,stock_status:((n=o.product)==null?void 0:n.stock_status)||"IN_STOCK",only_x_left_in_stock:((i=o.product)==null?void 0:i.only_x_left_in_stock)??null,customizable_options:o.customizable_options?o.customizable_options.map(u=>({uid:u.customizable_option_uid,is_required:u.is_required,label:u.label,sort_order:u.sort_order,type:u.type,values:u.values.map(e=>({uid:e.customizable_option_value_uid,label:e.label,price:e.price,value:e.value}))})):[],bundle_options:o.bundle_options||[],configurable_options:o.configurable_options?o.configurable_options.map(u=>({option_uid:u.configurable_product_option_uid,option_label:u.option_label,value_uid:u.configurable_product_option_value_uid,value_label:u.value_label})):[],samples:o.samples?o.samples.map(u=>({url:u.sample_url,sort_order:u.sort_order,title:u.title})):[],gift_card_options:o.gift_card_options||{}};return(s=o.configured_product)!=null&&s.name?{..._,configured_product:o.configured_product}:_}):[]}export{a as R,c as t};
//# sourceMappingURL=transform-requisition-list.js.map
