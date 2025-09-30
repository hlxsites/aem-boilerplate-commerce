/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as f,jsx as n}from"@dropins/tools/preact-jsx-runtime.js";import*as a from"@dropins/tools/preact-compat.js";import{useState as p,useEffect as R}from"@dropins/tools/preact-compat.js";import{Picker as q,Icon as g,Card as L}from"@dropins/tools/components.js";import{R as E,f as h,h as v,t as S}from"../chunks/transform-requisition-list.js";import{g as b}from"../chunks/getRequisitionLists.js";import{R as N}from"../chunks/RequisitionListForm.js";import"@dropins/tools/lib.js";import"@dropins/tools/preact-hooks.js";/* empty css                            */import{useText as y}from"@dropins/tools/i18n.js";import"@dropins/tools/fetch-graphql.js";const U=`
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
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
    ... on BundleRequisitionListItem {
      bundle_options {
        uid
        label
        type
        values {
          uid
          label
          original_price {
            value
            currency
          }
          priceV2 {
            value
            currency
          }
          quantity
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
`,O=`
  mutation ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [RequisitionListItemsInput!]!
    ) {
    addProductsToRequisitionList(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${U}
${E}
`,M=async(s,r)=>{const{errors:t,data:u}=await h(O,{variables:{requisitionListUid:s,requisitionListItems:r}});return t?v(t):S(u.addProductsToRequisitionList.requisition_list)},A=s=>a.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...s},a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 12H21",stroke:"currentColor"}),a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 6H21",stroke:"currentColor"}),a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M3 18H21",stroke:"currentColor"})),B=({items:s=[],canCreate:r=!0,sku:t,quantity:u=1,...I})=>{const[o,l]=p(s),[_,c]=p(!1),d=y({createTitle:"RequisitionList.RequisitionListForm.createTitle",addToReqList:"RequisitionList.RequisitionListForm.addToRequisitionList"});R(()=>{(!o||o.length===0)&&b().then(i=>{i&&i.items&&l(i.items)}).catch(i=>{console.error("Error fetching requisition lists:",i)})},[o]);const T=[...(o==null?void 0:o.map(i=>({value:i.uid,text:i.name})))??[],...r?[{value:"__create__",text:d.createTitle}]:[]],m=async i=>{try{await M(i,[{sku:t,quantity:u}])}catch(e){console.error("Error adding product to list:",e)}};return f("div",{...I,className:"requisition-list-names",children:[n(q,{id:`requisition-list-names__picker__${t}`,className:"requisition-list-names__picker",name:`requisition-list-names__picker__${t}`,icon:n(g,{source:A}),variant:"secondary",placeholder:d.addToReqList,disabled:_,size:"medium",options:T,handleSelect:i=>{const e=i.currentTarget.value;if(e==="__create__"){c(!0);return}e&&m(e).then(()=>{i.target.value=""})}}),r&&_&&n(L,{variant:"secondary",children:n(N,{mode:"create",onSuccess:async i=>{m(i.uid).then(()=>{c(!1),l(e=>e?[...e,i]:[i])})},onCancel:()=>c(!1)})})]})};export{B as RequisitionListNames,B as default};
//# sourceMappingURL=RequisitionListNames.js.map
