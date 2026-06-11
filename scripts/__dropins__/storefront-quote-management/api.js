/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as _}from"@dropins/tools/event-bus.js";import{FetchGraphQL as F}from"@dropins/tools/fetch-graphql.js";import{Initializer as $}from"@dropins/tools/lib.js";var N=(e=>(e.NEW="NEW",e.SUBMITTED="SUBMITTED",e.PENDING="PENDING",e.UPDATED="UPDATED",e.OPEN="OPEN",e.ORDERED="ORDERED",e.CLOSED="CLOSED",e.DECLINED="DECLINED",e.EXPIRED="EXPIRED",e.DRAFT="DRAFT",e))(N||{}),g=(e=>(e.ACTIVE="Active",e.IN_REVIEW="In Review",e.INACTIVE="Inactive",e.SUBMITTED="Submitted",e.PENDING="Pending",e.CLOSED="Closed",e.OPEN="Open",e.UPDATED="Updated",e.EDITED="Edited",e.NEW="New",e.DRAFT="Draft",e.DECLINED="Declined",e.CANCELED="Canceled",e.EXPIRED="Expired",e))(g||{}),y=(e=>(e[e.TAX_EXCLUDED=1]="TAX_EXCLUDED",e[e.TAX_INCLUDED=2]="TAX_INCLUDED",e[e.TAX_INCLUDED_AND_EXCLUDED=3]="TAX_INCLUDED_AND_EXCLUDED",e))(y||{});const b={requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1},A={quoteSummaryDisplayTotal:1,quoteSummaryMaxItems:10,quoteDisplaySettings:{zeroTax:!1,subtotal:y.TAX_INCLUDED,price:y.TAX_INCLUDED,shipping:y.TAX_INCLUDED,fullSummary:!1,grandTotal:!0},useConfigurableParentThumbnail:!0,quoteMinimumAmount:null,quoteMinimumAmountMessage:null},C={authenticated:!1,permissions:b,config:A,initialized:!1,quoteDataLoaded:!1,quoteDataInitialized:!1},l=new Proxy(C,{get:(e,a)=>e[a],set:(e,a,t)=>(e[a]=t,!0)});function R(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const a=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,r=a||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:r,editQuote:r,deleteQuote:r,checkoutQuote:a||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function w(e){if(l.quoteDataLoaded)return;const a=v.config.getConfig(),{quoteId:t,quoteTemplateId:r}=a;!e.editQuote||!t&&!r||(l.quoteDataLoaded=!0,t&&ue(t).then(o=>{l.quoteDataInitialized||_.emit("quote-management/quote-data/initialized",{quote:o,permissions:e}),l.quoteDataInitialized=!0}).catch(o=>{l.quoteDataLoaded=!1,_.emit("quote-management/quote-data/error",{error:o})}),r&&Ae(r).catch(o=>{l.quoteDataLoaded=!1,_.emit("quote-management/quote-template-data/error",{error:o})}))}const v=new $({init:async e=>{const a={};v.config.setConfig({...a,...e}),await Ee().then(t=>{l.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),l.config=A}),l.initialized=!0,_.emit("quote-management/initialized",{config:l.config})},listeners:()=>[_.on("authenticated",async e=>{l.authenticated=!!e,e||(l.permissions=b,l.quoteDataLoaded=!1,_.emit("quote-management/permissions",b))},{eager:!0}),_.on("auth/permissions",async e=>{const a=R(e);l.permissions=a,l.quoteDataLoaded=!1,_.emit("quote-management/permissions",l.permissions)},{eager:!0}),_.on("quote-management/permissions",async e=>{l.initialized&&w(e)},{eager:!0}),_.on("quote-management/initialized",async()=>{w(l.permissions)},{eager:!0}),_.on("checkout/updated",async e=>{l.initialized&&(e==null?void 0:e.type)==="quote"&&(l.quoteDataLoaded=!1,w(l.permissions))},{eager:!0})]}),Ye=v.config,{setEndpoint:Ke,setFetchGraphQlHeader:Je,removeFetchGraphQlHeader:Ze,setFetchGraphQlHeaders:et,fetchGraphQl:p,getConfig:tt}=new F().getMethods(),G=`
  fragment SELECTED_SHIPPING_METHOD_FRAGMENT on SelectedShippingMethod {
    amount {
      currency
      value
    }
    carrier_code
    carrier_title
    method_code
    method_title
    price_excl_tax {
      value
      currency
    }
    price_incl_tax {
      value
      currency
    }
  }
`,z=`
  fragment NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT on NegotiableQuoteShippingAddress {
    uid
    firstname
    lastname
    company
    street
    city
    region {
      code
      label
      region_id
    }
    postcode
    country {
      code
      label
    }
    telephone

    selected_shipping_method {
      ...SELECTED_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${G}
`,I=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
    name
    created_at
    is_virtual
    status
    sales_rep_name
    expiration_date
    updated_at
    buyer {
      firstname
      lastname
    }
    email
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
      text
      attachments {
        name
        url
      }
    }
    template_id
    template_name
    total_quantity
    items {
      __typename
      uid
      product {
        name
        sku
        uid
        stock_status
        quantity
        thumbnail {
          label
          url
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              percent_off
              amount_off
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              percent_off
              amount_off
            }
          }
        }
        price_tiers {
          quantity
          final_price {
            value
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      prices {
        price {
          currency
          value
        }
        price_including_tax {
          value
          currency
        }
        original_item_price {
          currency
          value
        }
        original_row_total {
          currency
          value
        }
        row_total {
          currency
          value
        }
        row_total_including_tax {
          value
          currency
        }
        catalog_discount {
          amount_off
          percent_off
        }
        row_catalog_discount {
          amount_off
          percent_off
        }
        discounts {
          label
          value
          amount {
            currency
            value
          }
        }
      }
      quantity
      is_available
      note_from_buyer {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      note_from_seller {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      ... on SimpleCartItem {
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
        configured_variant {
          uid
          sku
          stock_status
          thumbnail {
            label
            url
          }
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                percent_off
                amount_off
              }
            }
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                percent_off
                amount_off
              }
            }
          }
          price_tiers {
            quantity
            final_price {
              value
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
      ... on BundleCartItem {
        bundle_options {
          label
          values {
            label
            quantity
            original_price {
              currency
              value
            }
            priceV2 {
              currency
              value
            }
          }
        }
      }
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        custom_changes {
          new_value
          old_value
          title
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
        total {
          new_price {
            currency
            value
          }
          old_price {
            currency
            value
          }
        }
        products_removed {
          products_removed_from_catalog
          products_removed_from_quote {
            uid
            name
            sku
            quantity
          }
        }
      }
    }
    prices {
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_excluding_tax {
        currency
        value
      }
      grand_total {
        currency
        value
      }
      grand_total_excluding_tax {
        currency
        value
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        amount {
          value
          currency
        }
        label
        coupon {
          code
        }
        applied_to
      }
    }

    shipping_addresses {
      ...NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT
    }
  }

  ${z}
`,k=`
  mutation REQUEST_NEGOTIABLE_QUOTE_MUTATION(
    $cartId: ID!
    $quoteName: String!
    $comment: NegotiableQuoteCommentInput!
    $isDraft: Boolean
  ) {
    requestNegotiableQuote(
      input: {
        cart_id: $cartId
        quote_name: $quoteName
        comment: $comment
        is_draft: $isDraft
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`;function B(e){if(!e)return A;const a=t=>[y.TAX_EXCLUDED,y.TAX_INCLUDED,y.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:y.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:a(e.shopping_cart_display_subtotal),price:a(e.shopping_cart_display_price),shipping:a(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",quoteMinimumAmount:e.quote_minimum_amount??null,quoteMinimumAmountMessage:e.quote_minimum_amount_message??null}}function j(e){var a,t,r,o,n,c,d;return{uid:e.uid,createdAt:e.created_at,author:{firstname:e.author.firstname,lastname:e.author.lastname},changeType:e.change_type,changes:{commentAdded:((a=e.changes)==null?void 0:a.comment_added)&&{comment:e.changes.comment_added.comment},customChanges:((t=e.changes)==null?void 0:t.custom_changes)&&{new_value:e.changes.custom_changes.new_value,old_value:e.changes.custom_changes.old_value,title:e.changes.custom_changes.title},expiration:((r=e.changes)==null?void 0:r.expiration)&&{newExpiration:e.changes.expiration.new_expiration,oldExpiration:e.changes.expiration.old_expiration},productsRemoved:((o=e.changes)==null?void 0:o.products_removed)&&{productsRemovedFromCatalog:e.changes.products_removed.products_removed_from_catalog||[],productsRemovedFromQuote:e.changes.products_removed.products_removed_from_quote||[]},statuses:((n=e.changes)==null?void 0:n.statuses)&&{changes:((c=e.changes.statuses.changes)==null?void 0:c.map(u=>({newStatus:u==null?void 0:u.new_status,oldStatus:u==null?void 0:u.old_status})))||[]},total:((d=e.changes)==null?void 0:d.total)&&e.changes.total.new_price&&e.changes.total.old_price&&{newPrice:{value:e.changes.total.new_price.value,currency:e.changes.total.new_price.currency},oldPrice:{value:e.changes.total.old_price.value,currency:e.changes.total.old_price.currency}}}}}function q(e){if(e)return e.map(j)}function D(e,a){return e!=null&&e.length&&[...e].sort((r,o)=>o.quantity-r.quantity).find(r=>a>=r.quantity)||null}function X(e){var t,r,o,n;const a=l.config;return{src:a!=null&&a.useConfigurableParentThumbnail?e.product.thumbnail.url:((r=(t=e.configured_variant)==null?void 0:t.thumbnail)==null?void 0:r.url)||e.product.thumbnail.url,alt:a!=null&&a.useConfigurableParentThumbnail?e.product.thumbnail.label:((n=(o=e.configured_variant)==null?void 0:o.thumbnail)==null?void 0:n.label)||e.product.thumbnail.label}}function V(e){var a;return((a=e.links)==null?void 0:a.length)>0?{count:e.links.length,result:e.links.map(t=>t.title).join(", ")}:null}function H(e){var c,d,u,i;const a=e.quantity,t=e.__typename==="ConfigurableCartItem",r=t?(c=e.configured_variant)==null?void 0:c.price_tiers:e.product.price_tiers,o=t?(d=e.configured_variant)==null?void 0:d.price_range:e.product.price_range,n=D(r,a);return n?n.discount.amount_off>0:(((i=(u=o==null?void 0:o.maximum_price)==null?void 0:u.discount)==null?void 0:i.amount_off)??0)>0}function W(e){var o,n,c,d,u,i,s,m;const a=e.quantity,t=D(e.product.price_tiers,a);if(t)return Math.round(t.discount.percent_off);let r;if(e.__typename==="ConfigurableCartItem")r=(d=(c=(n=(o=e==null?void 0:e.configured_variant)==null?void 0:o.price_range)==null?void 0:n.maximum_price)==null?void 0:c.discount)==null?void 0:d.percent_off;else{if(e.__typename==="BundleCartItem")return;r=(m=(s=(i=(u=e==null?void 0:e.product)==null?void 0:u.price_range)==null?void 0:i.maximum_price)==null?void 0:s.discount)==null?void 0:m.percent_off}if(r!==0)return Math.round(r)}function Y(e){var a,t,r,o;return e.__typename==="ConfigurableCartItem"?{value:(t=(a=e.configured_variant)==null?void 0:a.price_range)==null?void 0:t.maximum_price.regular_price.value,currency:(o=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:o.maximum_price.regular_price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function K(e){var r,o,n,c,d,u;let a,t;if(a=((o=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:o.value)-((c=(n=e==null?void 0:e.prices)==null?void 0:n.row_total)==null?void 0:c.value),t=(u=(d=e==null?void 0:e.prices)==null?void 0:d.row_total)==null?void 0:u.currency,a!==0)return{value:a,currency:t}}function J(e){var a,t,r,o,n,c,d,u;return{itemType:e.__typename,uid:e.uid,product:{uid:e.product.uid,sku:e.product.sku,name:e.product.name,priceRange:{maximumPrice:{regularPrice:{value:e.product.price_range.maximum_price.regular_price.value,currency:e.product.price_range.maximum_price.regular_price.currency}}}},image:X(e),links:V(e),discounted:H(e),discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},catalogDiscount:{amountOff:e.prices.catalog_discount.amount_off,percentOff:e.prices.catalog_discount.percent_off},rowCatalogDiscount:{amountOff:e.prices.row_catalog_discount.amount_off,percentOff:e.prices.row_catalog_discount.percent_off},discounts:((t=(a=e.prices)==null?void 0:a.discounts)==null?void 0:t.map(i=>({label:i.label,value:i.value,amount:{value:i.amount.value,currency:i.amount.currency}})))??[],discountPercentage:W(e),insufficientQuantity:(e.__typename==="ConfigurableCartItem"?((r=e.configured_variant)==null?void 0:r.stock_status)??e.product.stock_status:e.product.stock_status)==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockStatus:e.product.stock_status,quantity:e.quantity,prices:{regularPrice:Y(e),priceIncludingTax:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},originalItemPrice:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency},originalRowTotal:{value:e.prices.original_row_total.value,currency:e.prices.original_row_total.currency},rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency}},savingsAmount:K(e),noteFromBuyer:(o=e.note_from_buyer)==null?void 0:o.map(i=>({createdAt:i.created_at,creatorId:i.creator_id,creatorType:i.creator_type,negotiableQuoteItemUid:i.negotiable_quote_item_uid,note:i.note,noteUid:i.note_uid})),noteFromSeller:(n=e.note_from_seller)==null?void 0:n.map(i=>({createdAt:i.created_at,creatorId:i.creator_id,creatorType:i.creator_type,negotiableQuoteItemUid:i.negotiable_quote_item_uid,note:i.note,noteUid:i.note_uid})),configurableOptions:(c=e.configurable_options)==null?void 0:c.map(i=>({optionLabel:i.option_label,valueLabel:i.value_label})),bundleOptions:(d=e.bundle_options)==null?void 0:d.map(i=>({label:i.label,values:i.values.map(s=>({label:s.label,quantity:s.quantity,originalPrice:{value:s.original_price.value,currency:s.original_price.currency},price:{value:s.priceV2.value,currency:s.priceV2.currency}}))})),customizableOptions:(u=e.customizable_options)==null?void 0:u.map(i=>({type:i.type,label:i.label,values:i.values.map(s=>({label:s.label,value:s.value}))}))}}function O(e){return e?e.map(J):[]}const Q=["DRAFT","UPDATED","DECLINED","EXPIRED","NEW","OPEN"];function Z(e){if(!e.items)return 0;const a=l.config;return(a==null?void 0:a.quoteSummaryDisplayTotal)===0?e.items.length:(a==null?void 0:a.quoteSummaryDisplayTotal)===1?e.total_quantity:e.items.length}function ee(e){return e.every(a=>!a.outOfStock&&!a.insufficientQuantity)}function te(e){var o,n,c,d,u,i;const a=P(e),t=!!((o=e.template_name)!=null&&o.trim()),r=O(e.items);return{uid:e.uid,name:e.name,createdAt:e.created_at,updatedAt:e.updated_at,expirationDate:e.expiration_date,status:a?N.NEW:e.status,isVirtual:!!e.is_virtual,salesRepName:e.sales_rep_name,buyer:{firstname:e.buyer.firstname,lastname:e.buyer.lastname},email:e.email,templateName:e.template_name,totalQuantity:Z(e),comments:(n=e.comments)==null?void 0:n.map(s=>{const m={uid:s.uid,createdAt:s.created_at,author:{firstname:s.author.firstname,lastname:s.author.lastname},text:s.text};return Array.isArray(s.attachments)&&s.attachments.length>0&&(m.attachments=s.attachments.map(E=>({name:E.name,url:E.url}))),m}),prices:e.prices&&{appliedDiscounts:(c=e.prices.discounts)==null?void 0:c.map(s=>({amount:{value:s.amount.value,currency:s.amount.currency},label:s.label,coupon:s.coupon})),appliedTaxes:(d=e.prices.applied_taxes)==null?void 0:d.map(s=>({amount:{value:s.amount.value,currency:s.amount.currency},label:s.label})),discount:e.prices.discounts&&e.prices.grand_total&&U(e.prices.discounts,e.prices.grand_total.currency),grandTotal:e.prices.grand_total&&{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},grandTotalExcludingTax:e.prices.grand_total_excluding_tax&&{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency},subtotalExcludingTax:e.prices.subtotal_excluding_tax&&{value:e.prices.subtotal_excluding_tax.value,currency:e.prices.subtotal_excluding_tax.currency},subtotalIncludingTax:e.prices.subtotal_including_tax&&{value:e.prices.subtotal_including_tax.value,currency:e.prices.subtotal_including_tax.currency},subtotalWithDiscountExcludingTax:e.prices.subtotal_with_discount_excluding_tax&&{value:e.prices.subtotal_with_discount_excluding_tax.value,currency:e.prices.subtotal_with_discount_excluding_tax.currency},...oe(e),totalTax:e.prices.applied_taxes&&e.prices.grand_total&&U(e.prices.applied_taxes,e.prices.grand_total.currency)},history:q(e.history),items:r,shippingAddresses:(u=e.shipping_addresses)==null?void 0:u.map(s=>{const m={uid:s.uid,firstname:s.firstname,lastname:s.lastname,company:s.company,street:s.street,city:s.city,postcode:s.postcode,country:{code:s.country.code,label:s.country.label},telephone:s.telephone};return s.region&&(m.region={code:s.region.code,label:s.region.label,regionId:s.region.region_id}),m}),canCheckout:["UPDATED","DECLINED"].includes(e.status)&&l.permissions.checkoutQuote&&((i=e.shipping_addresses)==null?void 0:i.length)>0&&ee(r),canSendForReview:!t&&(a||Q.includes(e.status))&&l.permissions.editQuote,canUpdateQuote:!t&&(a||Q.includes(e.status))&&l.permissions.editQuote,canDelete:!t&&!["PENDING","SUBMITTED","ORDERED"].includes(e.status)&&l.permissions.deleteQuote,canClose:e.status?!t&&!["DRAFT","CLOSED","ORDERED","OPEN"].includes(e.status):!1,readOnly:t||!a&&["ORDERED","SUBMITTED","CLOSED","PENDING"].includes(e.status)||!l.permissions.editQuote}}function h(e){return e?te(e):null}function P(e){return e.status==="SUBMITTED"&&!(e.history??[]).some(a=>{var t,r;return a.change_type==="UPDATED"&&(((r=(t=a.changes)==null?void 0:t.statuses)==null?void 0:r.changes)??[]).length>0})}function re(e){const a=P(e);return{uid:e.uid,name:e.name,createdAt:e.created_at,updatedAt:e.updated_at,status:a?N.NEW:e.status,buyer:{firstname:e.buyer.firstname,lastname:e.buyer.lastname},templateName:e.template_name,prices:{grandTotal:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency}}}}function ae(e){var r;if(!e)return null;const a={items:((r=e.items)==null?void 0:r.filter(o=>o==null?void 0:o.uid).map(re))||[],pageInfo:{currentPage:e.page_info.current_page,pageSize:e.page_info.page_size,totalPages:e.page_info.total_pages},totalCount:e.total_count,sortFields:e.sort_fields?{default:e.sort_fields.default,options:e.sort_fields.options}:void 0},t=x(a);return{...a,paginationInfo:t||void 0}}function x(e){if(!(e!=null&&e.pageInfo)||!e.totalCount)return null;const{currentPage:a,pageSize:t,totalPages:r}=e.pageInfo,{totalCount:o}=e,n=o>0?(a-1)*t+1:0,c=Math.min(a*t,o);return{currentPage:a,totalCount:o,pageSize:t,startItem:n,endItem:c,totalPages:r,pageSizeOptions:[20,30,50,100,200]}}const rt=()=>[20,30,50,100,200];function U(e,a){return e!=null&&e.length?e.reduce((t,r)=>({value:t.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:a}):{value:0,currency:a}}function oe(e){var r;if(!e||!((r=e.shipping_addresses)!=null&&r.length))return{};const t=e.shipping_addresses[0].selected_shipping_method;return t?{shippingIncludingTax:t.price_incl_tax&&{value:t.price_incl_tax.value,currency:t.price_incl_tax.currency},shippingExcludingTax:t.price_excl_tax&&{value:t.price_excl_tax.value,currency:t.price_excl_tax.currency}}:{}}function f(e){var a,t,r,o;return e?{id:e.template_id,uid:e.uid,name:e.name,createdAt:e.created_at,updatedAt:e.updated_at,expirationDate:e.expiration_date,status:e.status,salesRepName:e.sales_rep_name,buyer:{firstname:e.buyer.firstname,lastname:e.buyer.lastname},comments:(a=e.comments)==null?void 0:a.map(n=>{var c;return{uid:n.uid,createdAt:n.created_at,author:{firstname:n.author.firstname,lastname:n.author.lastname},text:n.text,attachments:(c=n.attachments)==null?void 0:c.map(d=>({name:d.name,url:d.url}))}}),prices:e.prices&&{subtotalExcludingTax:e.prices.subtotal_excluding_tax&&{value:e.prices.subtotal_excluding_tax.value,currency:e.prices.subtotal_excluding_tax.currency},subtotalIncludingTax:e.prices.subtotal_including_tax&&{value:e.prices.subtotal_including_tax.value,currency:e.prices.subtotal_including_tax.currency},subtotalWithDiscountExcludingTax:e.prices.subtotal_with_discount_excluding_tax&&{value:e.prices.subtotal_with_discount_excluding_tax.value,currency:e.prices.subtotal_with_discount_excluding_tax.currency},appliedTaxes:(t=e.prices.applied_taxes)==null?void 0:t.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label})),grandTotal:e.prices.grand_total&&{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency}},history:q(e.history),items:O(e.items),shippingAddresses:(r=e.shipping_addresses)==null?void 0:r.map(n=>({uid:n.uid,firstname:n.firstname,lastname:n.lastname,company:n.company,street:n.street,city:n.city,postcode:n.postcode,country:{code:n.country.code,label:n.country.label},telephone:n.telephone,region:n.region?{code:n.region.code,label:n.region.label,regionId:n.region.region_id}:void 0})),referenceDocuments:(o=e.reference_document_links)==null?void 0:o.map(n=>({uid:n.link_id,name:n.document_name,identifier:n.document_identifier,url:n.reference_document_url})),canAccept:[g.SUBMITTED,g.PENDING,g.OPEN].includes(e.status),canDelete:e.status===g.DRAFT,canReopen:[g.DECLINED,g.CANCELED,g.EXPIRED].includes(e.status),canCancel:[g.SUBMITTED,g.PENDING,g.OPEN,g.ACTIVE,g.EDITED].includes(e.status),canSendForReview:[g.OPEN,g.DRAFT,g.NEW,g.EDITED].includes(e.status),canGenerateQuoteFromTemplate:[g.ACTIVE].includes(e.status),canEditTemplateItems:[g.SUBMITTED,g.DRAFT,g.OPEN,g.EDITED].includes(e.status)}:null}function ne(e){var r;if(!e)return null;const a={items:((r=e.items)==null?void 0:r.map(o=>{var n,c,d;return{id:o.template_id,uid:o.uid,name:o.name,createdAt:o.created_at,updatedAt:o.updated_at,status:o.status,state:o.state,prices:{grandTotal:(n=o.prices)!=null&&n.grand_total?{value:o.prices.grand_total.value,currency:o.prices.grand_total.currency}:{value:0,currency:"USD"},minNegotiatedGrandTotal:{value:o.min_negotiated_grand_total,currency:((d=(c=o.prices)==null?void 0:c.grand_total)==null?void 0:d.currency)||"USD"}},lastSharedAt:o.last_shared_at,lastOrderedAt:o.last_ordered_at,expirationDate:o.expiration_date,ordersPlaced:o.orders_placed,canGenerateQuoteFromTemplate:[g.ACTIVE].includes(o.status)}}))||[],pageInfo:{currentPage:e.page_info.current_page,pageSize:e.page_info.page_size,totalPages:e.page_info.total_pages},totalCount:e.total_count,sortFields:e.sort_fields?{default:e.sort_fields.default,options:e.sort_fields.options}:void 0},t=x(a);return{...a,paginationInfo:t||void 0}}const at=async e=>{const{cartId:a,quoteName:t,comment:r,attachments:o,isDraft:n}=e;if(!a)throw new Error("Cart ID is required");if(!t)throw new Error("Quote name is required");if(!r)throw new Error("Comment is required");return p(k,{variables:{cartId:a,quoteName:t,comment:o!=null&&o.length?{comment:r,attachments:o}:{comment:r},isDraft:n}}).then(c=>{var i,s;const{errors:d}=c;if(d){const m=d.map(E=>E.message).join("; ");throw new Error(`Failed to request negotiable quote: ${m}`)}const u=h((s=(i=c.data)==null?void 0:i.requestNegotiableQuote)==null?void 0:s.quote);if(!u)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/negotiable-quote-requested",{quote:u,input:{cartId:a,quoteName:t,comment:r,attachments:o,isDraft:n}}),u})},ie=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${I}
`,ue=async e=>{var a;if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));if(!l.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const t=await p(ie,{variables:{quoteId:e}}),r=h((a=t==null?void 0:t.data)==null?void 0:a.negotiableQuote);if(!r)throw new Error("Failed to transform quote data");return _.emit("quote-management/quote-data",{quote:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},se=`
  fragment NegotiableQuoteListFragment on NegotiableQuote {
    uid
    name
    created_at
    updated_at
    status
    buyer {
      firstname
      lastname
    }
    template_name
    prices {
      grand_total {
        value
        currency
      }
    }
    history {
      change_type
      changes {
        statuses {
          changes {
            new_status
            old_status
          }
        }
      }
    }
  }
`,ce=`
  fragment SearchResultPageInfoFragment on SearchResultPageInfo {
    current_page
    page_size
    total_pages
  }
`,le=`
  fragment SortFieldsFragment on SortFields {
    default
    options {
      label
      value
    }
  }
`,de=`
  query negotiableQuotes(
    $filter: NegotiableQuoteFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteSortInput
  ) {
    negotiableQuotes(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        ...NegotiableQuoteListFragment
      }
      page_info {
        ...SearchResultPageInfoFragment
      }
      sort_fields {
        ...SortFieldsFragment
      }
      total_count
    }
  }

  ${se}
  ${ce}
  ${le}
`;var _e=(e=>(e.FULL="FULL",e.PARTIAL="PARTIAL",e))(_e||{}),me=(e=>(e.ASC="ASC",e.DESC="DESC",e))(me||{}),pe=(e=>(e.QUOTE_NAME="QUOTE_NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(pe||{});const ot=async(e={})=>{var t;if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));const a={filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null};try{const r=await p(de,{variables:a});if(!((t=r==null?void 0:r.data)!=null&&t.negotiableQuotes))throw new Error("No quotes data received");const o=ae(r.data.negotiableQuotes);if(!o)throw new Error("Failed to transform quotes data");return o}catch(r){return Promise.reject(r)}},ge=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      cart_summary_display_quantity
      max_items_in_order_summary
      shopping_cart_display_full_summary
      shopping_cart_display_grand_total
      shopping_cart_display_price
      shopping_cart_display_shipping
      shopping_cart_display_subtotal
      shopping_cart_display_zero_tax
      configurable_thumbnail_source
      quote_minimum_amount
      quote_minimum_amount_message
    }
  }
`,Ee=async()=>p(ge,{method:"GET",cache:"force-cache"}).then(({errors:e,data:a})=>{if(e){const t=e.map(r=>r.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return B(a.storeConfig)}),fe=`
  mutation DELETE_QUOTE_MUTATION($quoteUids: [ID!]!) {
    deleteNegotiableQuotes(
      input: {
        quote_uids: $quoteUids
      }
    ) {
      result_status
      operation_results {
        __typename
        ... on NegotiableQuoteUidOperationSuccess {
          quote_uid
        }
        ... on DeleteNegotiableQuoteOperationFailure {
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
              message
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,nt=async e=>{var t;if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));const a=Array.isArray(e)?e:[e];try{const r=await p(fe,{variables:{quoteUids:a}}),{errors:o}=r||{};if(o&&o.length){const u=o.map(i=>i==null?void 0:i.message).filter(Boolean).join("; ");throw new Error(u||"Failed to delete negotiable quotes")}const n=(t=r==null?void 0:r.data)==null?void 0:t.deleteNegotiableQuotes;if(!n)throw new Error("No delete result returned");const c={resultStatus:n.result_status,operationResults:(n.operation_results||[]).map(u=>(u==null?void 0:u.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:u==null?void 0:u.quote_uid}:{__typename:"DeleteNegotiableQuoteOperationFailure",quoteUid:u==null?void 0:u.quote_uid,errors:((u==null?void 0:u.errors)||[]).map(m=>({__typename:m==null?void 0:m.__typename,message:m==null?void 0:m.message,uid:m==null?void 0:m.uid}))})},d=c.operationResults.filter(u=>u.__typename==="NegotiableQuoteUidOperationSuccess").map(u=>u.quoteUid);return d.length>0&&_.emit("quote-management/negotiable-quote-deleted",{deletedQuoteUids:d,resultStatus:c.resultStatus}),c}catch(r){return _.emit("quote-management/negotiable-quote-delete-error",{error:r instanceof Error?r:new Error(String(r)),attemptedQuoteUids:a}),Promise.reject(r)}},Te=`
  mutation SET_NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_MUTATION(
    $quoteUid: ID!
    $addressId: ID
    $addressData: NegotiableQuoteAddressInput
  ) {
    setNegotiableQuoteShippingAddress(
      input: {
        quote_uid: $quoteUid
        shipping_addresses: {
          customer_address_uid: $addressId
          address: $addressData
        }
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`;function Ie(e){const{additionalInput:a,...t}=e,r={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...a||{},...r}}const it=async e=>{const{quoteUid:a,addressId:t,addressData:r}=e;if(!a)throw new Error("Quote UID is required");if(t===void 0&&!r)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&r)throw new Error("Cannot provide both addressId and addressData");const o=r?Ie(r):null;return p(Te,{variables:{quoteUid:a,addressId:t||null,addressData:o}}).then(n=>{var u,i;const{errors:c}=n;if(c){const s=c.map(m=>m.message).join("; ");throw new Error(`Failed to set shipping address: ${s}`)}const d=h((i=(u=n.data)==null?void 0:u.setNegotiableQuoteShippingAddress)==null?void 0:i.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/shipping-address-set",{quote:d,input:{quoteUid:a,addressId:t,addressData:r}}),d})},he=`
  mutation SEND_NEGOTIABLE_QUOTE_FOR_REVIEW_MUTATION(
    $quoteUid: ID!
    $comment: NegotiableQuoteCommentInput
  ) {
    sendNegotiableQuoteForReview(
      input: {
        quote_uid: $quoteUid
        comment: $comment
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,ut=async e=>{const{quoteUid:a,comment:t,attachments:r}=e;if(!a)throw new Error("Quote UID is required");const o=r!=null&&r.length?{comment:t||"",attachments:r}:t?{comment:t}:null;return p(he,{variables:{quoteUid:a,comment:o}}).then(n=>{var u,i;const{errors:c}=n;if(c){const s=c.map(m=>m.message).join("; ");throw new Error(`Failed to send quote for review: ${s}`)}const d=h((i=(u=n.data)==null?void 0:u.sendNegotiableQuoteForReview)==null?void 0:i.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-sent-for-review",{quote:d,input:{quoteUid:a,comment:t,attachments:r}}),d})},ye=`
  mutation INITIATE_UPLOAD_MUTATION($input: initiateUploadInput!) {
    initiateUpload(input: $input) {
      upload_url
      key
      expires_at
    }
  }
`,we=`
  mutation FINISH_UPLOAD_MUTATION($input: finishUploadInput!) {
    finishUpload(input: $input) {
      success
      key
      message
    }
  }
`,st=async e=>{const a="NEGOTIABLE_QUOTE_ATTACHMENT";try{const t=e==null?void 0:e.name;if(!e||!t)throw new Error("Invalid file");const r=M=>M.map(L=>L.message).join("; "),{data:o,errors:n}=await p(ye,{variables:{input:{key:t,media_resource_type:a}}});if(n&&n.length)throw new Error(r(n));const{upload_url:c,key:d}=(o==null?void 0:o.initiateUpload)||{};if(!c||!d)throw new Error("Failed to initiate upload");const u=await fetch(c,{method:"PUT",body:e});if(!u.ok)throw new Error(`Upload failed: ${u.status} ${u.statusText}`);const{data:i,errors:s}=await p(we,{variables:{input:{key:d,media_resource_type:a}}});if(s&&s.length)throw new Error(r(s));const{success:m,key:E,message:S}=(i==null?void 0:i.finishUpload)||{};if(!m||!E)throw new Error(S||"Failed to finish upload");return{key:E}}catch(t){throw _.emit("quote-management/file-upload-error",{error:(t==null?void 0:t.message)||"File upload failed",fileName:e==null?void 0:e.name}),t instanceof Error?t:new Error("File upload failed")}},be=`
  mutation CLOSE_NEGOTIABLE_QUOTE_MUTATION(
    $quoteUids: [ID!]!
  ) {
    closeNegotiableQuotes(input: { quote_uids: $quoteUids }) {
      result_status
      operation_results {
        ... on NegotiableQuoteUidOperationSuccess {
          __typename
          quote_uid
        }
        ... on CloseNegotiableQuoteOperationFailure {
          __typename
          quote_uid
          errors {
            __typename
            ... on ErrorInterface {
              message
            }
            ... on NoSuchEntityUidError {
              uid
            }
            ... on NegotiableQuoteInvalidStateError {
              message
            }
          }
        }
      }
    }
  }
`,ct=async e=>{var t;if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUids:a}=e;if(!a||a.length===0)throw new Error("Quote UIDs are required");try{const r=await p(be,{variables:{quoteUids:a}}),{errors:o}=r||{};if(o&&o.length){const i=o.map(s=>s==null?void 0:s.message).filter(Boolean).join("; ");throw new Error(i||"Failed to close negotiable quotes")}const n=(t=r==null?void 0:r.data)==null?void 0:t.closeNegotiableQuotes;if(!n)throw new Error("No close result returned");const c={resultStatus:n.result_status,operationResults:(n.operation_results||[]).map(i=>(i==null?void 0:i.__typename)==="NegotiableQuoteUidOperationSuccess"?{__typename:"NegotiableQuoteUidOperationSuccess",quoteUid:i==null?void 0:i.quote_uid}:{__typename:"CloseNegotiableQuoteOperationFailure",quoteUid:i==null?void 0:i.quote_uid,errors:((i==null?void 0:i.errors)||[]).map(E=>({__typename:E==null?void 0:E.__typename,message:E==null?void 0:E.message,uid:E==null?void 0:E.uid}))})},d=c.operationResults.filter(i=>i.__typename==="CloseNegotiableQuoteOperationFailure").map(i=>i);if(d.length>0){const i=d.map(s=>s.errors&&s.errors.length>0?s.errors.map(m=>m.message||`Failed to close quote ${s.quoteUid}`).join(", "):`Failed to close quote ${s.quoteUid}`).join("; ");throw new Error(i)}const u=c.operationResults.filter(i=>i.__typename==="NegotiableQuoteUidOperationSuccess").map(i=>i.quoteUid);return u.length>0&&_.emit("quote-management/negotiable-quote-closed",{closedQuoteUids:u,resultStatus:c.resultStatus}),c}catch(r){return _.emit("quote-management/negotiable-quote-close-error",{error:r instanceof Error?r:new Error(String(r)),attemptedQuoteUids:a}),Promise.reject(r)}},T=`
  fragment NegotiableQuoteTemplateFragment on NegotiableQuoteTemplate {
    uid
    template_id
    name
    created_at
    updated_at
    status
    sales_rep_name
    expiration_date
    buyer {
      firstname
      lastname
    }
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
      text
      attachments {
        name
        url
      }
    }
    items {
      __typename
      uid
      product {
        name
        sku
        uid
        stock_status
        quantity
        thumbnail {
          label
          url
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              percent_off
              amount_off
            }
          }
          maximum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
            discount {
              percent_off
              amount_off
            }
          }
        }
        price_tiers {
          quantity
          final_price {
            value
          }
          discount {
            amount_off
            percent_off
          }
        }
      }
      prices {
        price {
          currency
          value
        }
        price_including_tax {
          value
          currency
        }
        original_item_price {
          currency
          value
        }
        original_row_total {
          currency
          value
        }
        row_total {
          currency
          value
        }
        row_total_including_tax {
          value
          currency
        }
        catalog_discount {
          amount_off
          percent_off
        }
        row_catalog_discount {
          amount_off
          percent_off
        }
        discounts {
          label
          value
          amount {
            currency
            value
          }
        }
      }
      quantity
      is_available
      note_from_buyer {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      note_from_seller {
        created_at
        creator_id
        creator_type
        negotiable_quote_item_uid
        note
        note_uid
        __typename
      }
      ... on SimpleCartItem {
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
      ... on ConfigurableCartItem {
        configurable_options {
          option_label
          value_label
        }
        configured_variant {
          uid
          sku
          stock_status
          thumbnail {
            label
            url
          }
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                percent_off
                amount_off
              }
            }
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
              discount {
                percent_off
                amount_off
              }
            }
          }
          price_tiers {
            quantity
            final_price {
              value
            }
            discount {
              amount_off
              percent_off
            }
          }
        }
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
      ... on BundleCartItem {
        bundle_options {
          label
          values {
            label
            quantity
            original_price {
              currency
              value
            }
            priceV2 {
              currency
              value
            }
          }
        }
      }
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        customizable_options {
          type
          label
          values {
            label
            value
          }
        }
      }
    }
    history {
      uid
      created_at
      author {
        firstname
        lastname
      }
      change_type
      changes {
        comment_added {
          comment
        }
        custom_changes {
          new_value
          old_value
          title
        }
        statuses {
          changes {
            new_status
            old_status
          }
        }
        expiration {
          new_expiration
          old_expiration
        }
        total {
          new_price {
            currency
            value
          }
          old_price {
            currency
            value
          }
        }
      }
    }
    prices {
      subtotal_excluding_tax {
        currency
        value
      }
      subtotal_including_tax {
        currency
        value
      }
      subtotal_with_discount_excluding_tax {
        currency
        value
      }
      applied_taxes {
        amount {
          currency
          value
        }
        label
      }
      grand_total {
        currency
        value
      }
    }
    shipping_addresses {
      uid
      firstname
      lastname
      company
      street
      city
      region {
        code
        label
        region_id
      }
      postcode
      country {
        code
        label
      }
      telephone
    }
    reference_document_links {
      link_id
      document_name
      document_identifier
      reference_document_url
    }
  }
`,Ne=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${T}
`,Ae=async e=>{var a;if(!l.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await p(Ne,{variables:{templateId:e}});if(!((a=t==null?void 0:t.data)!=null&&a.negotiableQuoteTemplate))throw new Error("Quote template not found");const r=f(t.data.negotiableQuoteTemplate);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},ve=`
  mutation CREATE_QUOTE_TEMPLATE_MUTATION($cartId: ID!) {
    requestNegotiableQuoteTemplateFromQuote(input: { cart_id: $cartId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${T}
`,lt=async e=>{var a;if(!l.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Cart ID is required");try{const t=await p(ve,{variables:{cartId:e}});if(!((a=t==null?void 0:t.data)!=null&&a.requestNegotiableQuoteTemplateFromQuote))throw new Error("Failed to create quote template");const r=f(t.data.requestNegotiableQuoteTemplateFromQuote);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Qe=`
  query QUOTE_TEMPLATES_QUERY(
    $filter: NegotiableQuoteTemplateFilterInput
    $pageSize: Int
    $currentPage: Int
    $sort: NegotiableQuoteTemplateSortInput
  ) {
    negotiableQuoteTemplates(
      filter: $filter
      pageSize: $pageSize
      currentPage: $currentPage
      sort: $sort
    ) {
      items {
        uid
        template_id
        name
        created_at
        updated_at
        last_ordered_at
        status
        state
        min_negotiated_grand_total
        last_shared_at
        expiration_date
        orders_placed
        prices {
          grand_total {
            currency
            value
          }
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
      sort_fields {
        default
        options {
          label
          value
        }
      }
    }
  }
`;var Ue=(e=>(e.ACTIVE="ACTIVE",e.IN_REVIEW="IN_REVIEW",e.INACTIVE="INACTIVE",e))(Ue||{}),qe=(e=>(e.NAME="NAME",e.CREATED_AT="CREATED_AT",e.UPDATED_AT="UPDATED_AT",e))(qe||{}),De=(e=>(e.ASC="ASC",e.DESC="DESC",e))(De||{});const dt=async(e={})=>{var a;if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Qe,{variables:{filter:e.filter||null,pageSize:e.pageSize||20,currentPage:e.currentPage||1,sort:e.sort||null}});if(!((a=t==null?void 0:t.data)!=null&&a.negotiableQuoteTemplates))throw new Error("No quote templates data received");const r=ne(t.data.negotiableQuoteTemplates);if(!r)throw new Error("Failed to transform quote templates data");return _.emit("quote-management/quote-templates-data",{quoteTemplates:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Oe=`
  mutation SEND_QUOTE_TEMPLATE_FOR_REVIEW_MUTATION(
    $templateId: ID!
    $comment: String
    $name: String
    $referenceDocumentLinks: [NegotiableQuoteTemplateReferenceDocumentLinkInput]
    $attachments: [NegotiableQuoteCommentAttachmentInput]
  ) {
    submitNegotiableQuoteTemplateForReview(input: { template_id: $templateId, name: $name, comment: $comment, reference_document_links: $referenceDocumentLinks, attachments: $attachments }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,_t=async e=>{var a,t,r;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const o=(a=e.referenceDocumentLinks)==null?void 0:a.map(u=>({link_id:u.uid,document_name:u.name,document_identifier:u.identifier,reference_document_url:u.url})),n=(t=e.attachments)!=null&&t.length?e.attachments.map(u=>({key:u.key})):void 0,c=await p(Oe,{variables:{templateId:e.templateId,name:e.name,comment:e.comment||void 0,referenceDocumentLinks:o,attachments:n}});if(!((r=c==null?void 0:c.data)!=null&&r.submitNegotiableQuoteTemplateForReview))throw new Error("No quote template data received");const d=f(c.data.submitNegotiableQuoteTemplateForReview);if(!d)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:d,permissions:l.permissions}),d}catch(o){return Promise.reject(o)}},Pe=`
  mutation SET_QUOTE_TEMPLATE_EXPIRATION_DATE_MUTATION(
    $templateId: ID!
    $expirationDate: String!
  ) {
    setQuoteTemplateExpirationDate(input: { template_id: $templateId, expiration_date: $expirationDate }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,mt=async e=>{var a;if(!l.authenticated)throw new Error("Unauthorized");if(!e.templateId)throw new Error("Template ID is required");if(!e.expirationDate)throw new Error("Expiration date is required");try{const t=await p(Pe,{variables:{templateId:e.templateId,expirationDate:e.expirationDate}});if(!((a=t==null?void 0:t.data)!=null&&a.setQuoteTemplateExpirationDate))throw new Error("Failed to set expiration date");const r=f(t.data.setQuoteTemplateExpirationDate);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},xe=`
  mutation ACCEPT_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    acceptNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${T}
`,pt=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(xe,{variables:{templateId:e.templateId}});if(!((a=t==null?void 0:t.data)!=null&&a.acceptNegotiableQuoteTemplate))throw new Error("No quote template data received");const r=f(t.data.acceptNegotiableQuoteTemplate);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Se=`
  mutation CANCEL_QUOTE_TEMPLATE_MUTATION(
    $templateId: ID!
    $comment: String
  ) {
    cancelNegotiableQuoteTemplate(
      input: {
        template_id: $templateId
        cancellation_comment: $comment
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,gt=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Se,{variables:{templateId:e.templateId,comment:e.comment}});if(!((a=t==null?void 0:t.data)!=null&&a.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const r=f(t.data.cancelNegotiableQuoteTemplate);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Me=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,Et=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Me,{variables:{templateId:e.templateId}});if(t!=null&&t.errors&&t.errors.length>0){const o=t.errors.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(o||"Failed to delete quote template")}if(!((a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return _.emit("quote-management/quote-template-deleted",{templateId:e.templateId}),{templateId:e.templateId}}catch(t){return Promise.reject(t)}},Le=`
  mutation OPEN_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    openNegotiableQuoteTemplate(input: { template_id: $templateId }) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${T}
`,ft=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Le,{variables:{templateId:e.templateId}});if(!((a=t==null?void 0:t.data)!=null&&a.openNegotiableQuoteTemplate))throw new Error("No quote template data received");const r=f(t.data.openNegotiableQuoteTemplate);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Fe=`
  mutation SET_NEGOTIABLE_QUOTE_TEMPLATE_SHIPPING_ADDRESS_MUTATION(
    $templateId: ID!
    $shippingAddress: NegotiableQuoteTemplateShippingAddressInput!
  ) {
    setNegotiableQuoteTemplateShippingAddress(
      input: {
        template_id: $templateId
        shipping_address: $shippingAddress
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${T}
`,Tt=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!l.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await p(Fe,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((a=t==null?void 0:t.data)!=null&&a.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const r=f(t.data.setNegotiableQuoteTemplateShippingAddress);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},$e=`
  mutation UPDATE_NEGOTIABLE_QUOTE_TEMPLATE_QUANTITIES_MUTATION(
    $input: UpdateNegotiableQuoteTemplateQuantitiesInput!
  ) {
    updateNegotiableQuoteTemplateQuantities(input: $input) {
      quote_template {
        ...NegotiableQuoteTemplateFragment
      }
    }
  }
  ${T}
`,It=async e=>{var a,t;if(!e.templateId)throw new Error("Template ID is required");if(!e.items||e.items.length===0)throw new Error("Items array is required and must not be empty");if(!l.authenticated)throw new Error("Unauthorized");try{const r=await p($e,{variables:{input:{template_id:e.templateId,items:e.items.map(n=>({item_id:n.itemId,quantity:n.quantity,min_qty:n.minQty,max_qty:n.maxQty}))}}});if(!((t=(a=r==null?void 0:r.data)==null?void 0:a.updateNegotiableQuoteTemplateQuantities)!=null&&t.quote_template))throw new Error("No quote template data received");const o=f(r.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!o)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:l.permissions}),o}catch(r){return Promise.reject(r)}},Ce=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,ht=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemUids||e.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Ce,{variables:{input:{template_id:e.templateId,item_uids:e.itemUids}}});if(!((a=t==null?void 0:t.data)!=null&&a.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const r=f(t.data.removeNegotiableQuoteTemplateItems);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Re=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${T}
`,yt=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemId)throw new Error("Item ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const t=await p(Re,{variables:{input:{templateId:e.templateId,item_uid:e.itemId,note:e.note}}});if(!((a=t==null?void 0:t.data)!=null&&a.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const r=f(t.data.setQuoteTemplateLineItemNote);if(!r)throw new Error("Failed to transform quote template data");return _.emit("quote-management/quote-template-data",{quoteTemplate:r,permissions:l.permissions}),r}catch(t){return Promise.reject(t)}},Ge=`
  mutation GENERATE_NEGOTIABLE_QUOTE_FROM_TEMPLATE_MUTATION(
    $input: GenerateNegotiableQuoteFromTemplateInput!
  ) {
    generateNegotiableQuoteFromTemplate(input: $input) {
      negotiable_quote_uid
    }
  }
`,wt=async e=>{var a,t;if(!e.templateId)throw new Error("Template ID is required");if(!l.authenticated)throw new Error("Unauthorized");try{const r=await p(Ge,{variables:{input:{template_id:e.templateId}}});if(!((t=(a=r==null?void 0:r.data)==null?void 0:a.generateNegotiableQuoteFromTemplate)!=null&&t.negotiable_quote_uid))throw new Error("No quote UID received");const o=r.data.generateNegotiableQuoteFromTemplate.negotiable_quote_uid;return _.emit("quote-management/quote-template-generated",{quoteId:o}),{quoteId:o}}catch(r){return Promise.reject(r)}},ze=`
  mutation renameNegotiableQuote($input: RenameNegotiableQuoteInput!) {
    renameNegotiableQuote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,bt=async e=>{const{quoteUid:a,quoteName:t,quoteComment:r}=e;if(!a)throw new Error("Quote UID is required");if(!t)throw new Error("Quote name is required");return p(ze,{variables:{input:{quote_uid:a,quote_name:t,quote_comment:r||""}}}).then(n=>{var u,i;const{errors:c}=n;if(c){const s=c.map(m=>m.message).join("; ");throw new Error(`Failed to rename quote: ${s}`)}const d=h((i=(u=n.data)==null?void 0:u.renameNegotiableQuote)==null?void 0:i.quote);if(!d)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-renamed",{quote:d,input:{quoteUid:a,quoteName:t,quoteComment:r}}),d})},ke=`
  mutation DUPLICATE_NEGOTIABLE_QUOTE_MUTATION($quoteUid: ID!, $duplicatedQuoteUid: ID!) {
    duplicateNegotiableQuote(input: { quote_uid: $quoteUid, duplicated_quote_uid: $duplicatedQuoteUid }) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,Nt=async e=>{if(!l.authenticated)throw new Error("Unauthorized");const{quoteUid:a,duplicatedQuoteUid:t,hasOutOfStockItems:r}=e;if(!a||!a.trim())throw new Error("Quote UID is required");if(!t||!t.trim())throw new Error("Duplicated Quote UID is required");return p(ke,{variables:{quoteUid:a,duplicatedQuoteUid:t}}).then(o=>{var d,u;const{errors:n}=o;if(n){const i=n.map(s=>s.message).join("; ");throw new Error(`Failed to duplicate quote: ${i}`)}const c=h((u=(d=o.data)==null?void 0:d.duplicateNegotiableQuote)==null?void 0:u.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-duplicated",{quote:c,input:{quoteUid:a,duplicatedQuoteUid:t},hasOutOfStockItems:r}),c})},Be=`
  mutation UPDATE_NEGOTIABLE_QUOTE_QUANTITIES_MUTATION(
    $quoteUid: ID!
    $items: [NegotiableQuoteItemQuantityInput!]!
  ) {
    updateNegotiableQuoteQuantities(
      input: {
        quote_uid: $quoteUid
        items: $items
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,At=async e=>{if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:a,items:t}=e;if(!a)throw new Error("Quote UID is required");if(!t||!Array.isArray(t)||t.length===0)throw new Error("Items array is required and must not be empty");for(const o of t){if(!o.quoteItemUid)throw new Error("Each item must have a quoteItemUid");if(typeof o.quantity!="number"||o.quantity<=0)throw new Error(`Invalid quantity for item ${o.quoteItemUid}: quantity must be a positive number`);if(!Number.isInteger(o.quantity))throw new Error(`Invalid quantity for item ${o.quoteItemUid}: quantity must be an integer`)}const r=t.map(o=>({quote_item_uid:o.quoteItemUid,quantity:o.quantity}));return p(Be,{variables:{quoteUid:a,items:r}}).then(o=>{var d,u;const{errors:n}=o;if(n){const i=n.map(s=>s.message).join("; ");throw new Error(`Failed to update quote quantities: ${i}`)}const c=h((u=(d=o.data)==null?void 0:d.updateNegotiableQuoteQuantities)==null?void 0:u.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quantities-updated",{quote:c,input:{quoteUid:a,items:t}}),c})},je=`
  mutation REMOVE_NEGOTIABLE_QUOTE_ITEMS_MUTATION(
    $quoteUid: ID!
    $quoteItemUids: [ID!]!
  ) {
    removeNegotiableQuoteItems(
      input: {
        quote_uid: $quoteUid
        quote_item_uids: $quoteItemUids
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,vt=async e=>{var d;if(!l.authenticated)return Promise.reject(new Error("Unauthorized"));const{quoteUid:a,quoteItemUids:t}=e;if(!a)throw new Error("Quote UID is required");if(!Array.isArray(t)||t.length===0)throw new Error("At least one quote item UID is required");const r=await p(je,{variables:{quoteUid:a,quoteItemUids:t}}),{errors:o,data:n}=r;if(o!=null&&o.length){const u=o.map(i=>i.message).join("; ");throw new Error(`Failed to remove negotiable quote items: ${u}`)}const c=h((d=n==null?void 0:n.removeNegotiableQuoteItems)==null?void 0:d.quote);if(!c)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/quote-items-removed",{quote:c,removedItemUids:t,input:e}),c},Xe=`
  mutation SET_LINE_ITEM_NOTE_MUTATION($input: LineItemNoteInput!) {
    setLineItemNote(input: $input) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${I}
`,Qt=async e=>{if(!l.authenticated)throw new Error("Unauthorized");const{quoteUid:a,itemUid:t,note:r,quantity:o}=e;if(!a)throw new Error("Quote UID is required");if(!t)throw new Error("Item UID is required");if(!r)throw new Error("Note is required");const n={quote_uid:a,quote_item_uid:t,note:r.trim()};return p(Xe,{variables:{input:n}}).then(c=>{var i,s;const{errors:d}=c;if(d){const m=d.map(E=>E.message).join("; ");throw new Error(`Failed to set line item note: ${m}`)}const u=h((s=(i=c.data)==null?void 0:i.setLineItemNote)==null?void 0:s.quote);if(!u)throw new Error("Failed to transform quote data: Invalid response structure");return _.emit("quote-management/line-item-note-set",{quote:u,input:{quoteUid:a,itemUid:t,note:r,quantity:o}}),_.emit("quote-management/quote-data",{quote:u,permissions:l.permissions}),u})};export{_e as FilterMatchTypeEnum,g as N,pe as NegotiableQuoteSortableField,y as Q,Ue as QuoteTemplateFilterStatus,qe as QuoteTemplateSortField,De as SortDirection,me as SortEnum,pt as acceptQuoteTemplate,yt as addQuoteTemplateLineItemNote,Tt as addQuoteTemplateShippingAddress,gt as cancelQuoteTemplate,ct as closeNegotiableQuote,Ye as config,lt as createQuoteTemplate,nt as deleteQuote,Et as deleteQuoteTemplate,Nt as duplicateQuote,p as fetchGraphQl,rt as g,wt as generateQuoteFromTemplate,tt as getConfig,ue as getQuoteData,Ae as getQuoteTemplateData,dt as getQuoteTemplates,Ee as getStoreConfig,v as initialize,ot as negotiableQuotes,ft as openQuoteTemplate,Ze as removeFetchGraphQlHeader,vt as removeNegotiableQuoteItems,ht as removeQuoteTemplateItems,bt as renameNegotiableQuote,at as requestNegotiableQuote,l as s,ut as sendForReview,_t as sendQuoteTemplateForReview,Ke as setEndpoint,Je as setFetchGraphQlHeader,et as setFetchGraphQlHeaders,Qt as setLineItemNote,mt as setQuoteTemplateExpirationDate,it as setShippingAddress,At as updateQuantities,It as updateQuoteTemplateItemQuantities,st as uploadFile};
//# sourceMappingURL=api.js.map
