/*! Copyright 2026 Adobe
All Rights Reserved. */
import{R as c,t as I}from"./transform-requisition-list.js";import{h as m}from"./fetch-error.js";import{events as d}from"@dropins/tools/event-bus.js";import{f as T}from"./fetch-graphql.js";const R=`
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
`,L=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!,
      $description: String,
      $pageSize: Int,
      $currentPage: Int
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${c}
${R}
`,E=async(r,a,u,_,l,t)=>{var n,o;const{errors:s,data:e}=await T(L,{variables:{requisitionListUid:r,name:a,description:u,pageSize:_,currentPage:l}});if(s)return m(s);if(!((n=e==null?void 0:e.updateRequisitionList)!=null&&n.requisition_list))return null;const p=e.updateRequisitionList.requisition_list;let i=I(p);return(o=i==null?void 0:i.items)!=null&&o.length&&t&&(i={...i,items:await t(i.items)}),d.emit("requisitionList/data",i),i};export{R,E as u};
//# sourceMappingURL=updateRequisitionList.js.map
