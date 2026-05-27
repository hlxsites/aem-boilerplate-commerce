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
`,c=`
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
    product {
      sku
      stock_status
      only_x_left_in_stock
    }
    customizable_options {
      customizable_option_uid
      is_required
      label
      sort_order
      type
      values {
        customizable_option_value_uid
        label
        value
        price {
          type
          units
          value
        }
      }
    }
    ... on ConfigurableRequisitionListItem {
      configurable_options {
        configurable_product_option_uid
        configurable_product_option_value_uid
        option_label
        value_label
      }
    }
    ... on DownloadableRequisitionListItem {
      links {
        price
        sample_url
        sort_order
        title
        uid
      }
      samples {
        sample_url
        sort_order
        title
      }
    }
    ... on BundleRequisitionListItem {
      bundle_options {
        uid
        type
        label
        values {
          uid
          label
          quantity
          priceV2 {
            value
            currency
          }
          original_price {
            value
            currency
          }
        }
      }
    }
    ... on GiftCardRequisitionListItem {
      gift_card_options {
        amount {
          currency
          value
        }
        custom_giftcard_amount {
          currency
          value
        }
        message
        recipient_email
        recipient_name
        sender_name
        sender_email
      }
    }
  }
  page_info {
    page_size
    current_page
    total_pages
  }
}
`;function p(o){var e,t;return o?{uid:o.uid,name:o.name,description:o.description,updated_at:o.updated_at,items_count:o.items_count,items:l((e=o.items)==null?void 0:e.items),page_info:(t=o.items)==null?void 0:t.page_info}:null}function l(o){return o!=null&&o.length?o.map(e=>{var _,n,r,s;const t={uid:e.uid,sku:(_=e.product)==null?void 0:_.sku,quantity:e.quantity,stock_status:((n=e.product)==null?void 0:n.stock_status)||"IN_STOCK",only_x_left_in_stock:((r=e.product)==null?void 0:r.only_x_left_in_stock)??null,customizable_options:e.customizable_options?e.customizable_options.map(i=>({uid:i.customizable_option_uid,is_required:i.is_required,label:i.label,sort_order:i.sort_order,type:i.type,values:i.values.map(u=>({uid:u.customizable_option_value_uid,label:u.label,price:u.price,value:u.value}))})):[],bundle_options:e.bundle_options||[],configurable_options:e.configurable_options?e.configurable_options.map(i=>({option_uid:i.configurable_product_option_uid,option_label:i.option_label,value_uid:i.configurable_product_option_value_uid,value_label:i.value_label})):[],samples:e.samples?e.samples.map(i=>({url:i.sample_url,sort_order:i.sort_order,title:i.title})):[],gift_card_options:e.gift_card_options||{}};return(s=e.configured_product)!=null&&s.name?{...t,configured_product:e.configured_product}:t}):[]}export{a as R,c as a,p as t};
//# sourceMappingURL=transform-requisition-list.js.map
