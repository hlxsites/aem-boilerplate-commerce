import{s}from"./resetCart.js";function R(r){var u,n,e,l,t,c,a;return r?{id:r.id,totalQuantity:z(r),errors:k(r==null?void 0:r.itemsV2),items:h(r==null?void 0:r.itemsV2),miniCartMaxItems:h(r==null?void 0:r.itemsV2).slice(0,((u=s.config)==null?void 0:u.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},subtotal:{excludingTax:{value:(n=r.prices.subtotal_excluding_tax)==null?void 0:n.value,currency:(e=r.prices.subtotal_excluding_tax)==null?void 0:e.currency},includingTax:{value:(l=r.prices.subtotal_including_tax)==null?void 0:l.value,currency:(t=r.prices.subtotal_including_tax)==null?void 0:t.currency},includingDiscountOnly:{value:(c=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:c.value,currency:(a=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:a.currency}},appliedTaxes:I(r.prices.applied_taxes),totalTax:S(r.prices.applied_taxes,r.prices.grand_total.currency),appliedDiscounts:I(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&N(r)},isGuestCart:!s.authenticated,hasOutOfStockItems:P(r),hasFullyOutOfStockItems:M(r)}:null}function S(r,u){return r!=null&&r.length?r.reduce((n,e)=>({value:n.value+e.amount.value,currency:e.amount.currency}),{value:0,currency:u}):{value:0,currency:u}}function h(r){var n;if(!((n=r==null?void 0:r.items)!=null&&n.length))return[];const u=s.config;return r.items.map(e=>{var l,t,c,a,_,o,i,g,y,f,m,d,b,v,C,x;return{itemType:e.__typename,uid:e.uid,url:{urlKey:e.product.url_key,categories:e.product.categories.map(O=>O.url_key)},quantity:e.quantity,sku:e.product.sku,name:e.product.name,image:{src:u!=null&&u.useConfigurableParentThumbnail?e.product.thumbnail.url:((t=(l=e.configured_variant)==null?void 0:l.thumbnail)==null?void 0:t.url)||e.product.thumbnail.url,alt:u!=null&&u.useConfigurableParentThumbnail?e.product.thumbnail.label:((a=(c=e.configured_variant)==null?void 0:c.thumbnail)==null?void 0:a.label)||e.product.thumbnail.label},price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:G(e.links),total:e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.row_total.value,currency:e.prices.row_total.currency}:{value:(_=e.prices.original_row_total)==null?void 0:_.value,currency:(o=e.prices.original_row_total)==null?void 0:o.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency},regularPrice:e.__typename==="ConfigurableCartItem"?{value:(g=(i=e.configured_variant)==null?void 0:i.price_range)==null?void 0:g.maximum_price.regular_price.value,currency:(f=(y=e.configured_variant)==null?void 0:y.price_range)==null?void 0:f.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:(m=e.product.price_range)==null?void 0:m.maximum_price.regular_price.value,currency:(d=e.product.price_range)==null?void 0:d.maximum_price.regular_price.currency},discounted:e.__typename==="BundleCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0?!1:e.__typename==="ConfigurableCartItem"?((v=(b=e.configured_variant)==null?void 0:b.price_range)==null?void 0:v.maximum_price.discount.amount_off)>0:((C=e.product.price_range)==null?void 0:C.maximum_price.discount.amount_off)>0,bundleOptions:e.__typename==="BundleCartItem"?w(e.bundle_options):null,selectedOptions:A(e.configurable_options),customizableOptions:E(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},onlyXLeftInStock:e.__typename==="ConfigurableCartItem"?(x=e.configured_variant)==null?void 0:x.only_x_left_in_stock:e.product.only_x_left_in_stock,lowInventory:e.is_available&&e.product.only_x_left_in_stock!==null,insufficientQuantity:(e.__typename==="ConfigurableCartItem"?e.configured_variant:e.product).stock_status==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockLevel:$(e),productAttributes:V(e)}})}function k(r){var n;const u=(n=r==null?void 0:r.items)==null?void 0:n.reduce((e,l)=>{var t;return(t=l.errors)==null||t.forEach(c=>{e.push({uid:l.uid,text:c.message})}),e},[]);return u!=null&&u.length?u:null}function I(r){return r!=null&&r.length?r.map(u=>({amount:{value:u.amount.value,currency:u.amount.currency},label:u.label})):[]}function w(r){const u=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(l=>l.label).join(", ")})),n={};return u==null||u.forEach(e=>{n[e.label]=e.value}),Object.keys(n).length>0?n:null}function A(r){const u=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),n={};return u==null||u.forEach(e=>{n[e.label]=e.value}),Object.keys(n).length>0?n:null}function E(r){const u=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(l=>({uid:l.customizable_option_value_uid,label:l.label,value:l.value}))})),n={};return u==null||u.forEach(e=>{var l;switch(e.type){case"field":case"area":case"date_time":n[e.label]=e.values[0].value;break;case"radio":case"drop_down":n[e.label]=e.values[0].label;break;case"multiple":case"checkbox":n[e.label]=e.values.reduce((o,i)=>o?`${o}, ${i.label}`:i.label,"");break;case"file":const t=new DOMParser,c=e.values[0].value,_=((l=t.parseFromString(c,"text/html").querySelector("a"))==null?void 0:l.textContent)||"";n[e.label]=_;break}}),n}function z(r){var u,n;return((u=s.config)==null?void 0:u.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((n=s.config)==null?void 0:n.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function G(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(u=>u.title).join(", ")}:null}function N(r){var u,n,e,l;return(u=r.shipping_addresses)!=null&&u.length?(n=r.shipping_addresses)==null?void 0:n.map(t=>({countryCode:t.country.code,zipCode:t.postcode,regionCode:t.region.code})):(e=r.addresses)!=null&&e.length?(l=r.addresses)==null?void 0:l.filter(t=>t.default_shipping).map(t=>{var c;return t.default_shipping&&{countryCode:t.country_id,zipCode:t.postcode,regionCode:(c=t.region)==null?void 0:c.region_code}}):null}function P(r){var u,n;return(n=(u=r==null?void 0:r.itemsV2)==null?void 0:u.items)==null?void 0:n.some(e=>{var l;return((l=e==null?void 0:e.product)==null?void 0:l.stock_status)==="OUT_OF_STOCK"||e.product.stock_status==="IN_STOCK"&&!e.is_available})}function $(r){if(!r.not_available_message)return null;const u=r.not_available_message.match(/-?\d+/);return u?parseInt(u[0]):"noNumber"}function M(r){var u,n;return(n=(u=r==null?void 0:r.itemsV2)==null?void 0:u.items)==null?void 0:n.some(e=>{var l;return((l=e==null?void 0:e.product)==null?void 0:l.stock_status)==="OUT_OF_STOCK"})}function V(r){var u,n,e;return(e=(n=(u=r==null?void 0:r.product)==null?void 0:u.custom_attributesV2)==null?void 0:n.items)==null?void 0:e.map(l=>{const t=l.code.split("_").map(c=>c.charAt(0).toUpperCase()+c.slice(1)).join(" ");return{...l,code:t}})}const p=`
  customizable_options {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price{
        type
        units
        value
      }
    }
  }
`,T=`
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
`,D=`
fragment CartFragment on Cart {
  id
  total_quantity
  is_virtual
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
      label,
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
    }
  }
  itemsV2 (
      pageSize:$pageSize,
      currentPage:$currentPage,
      sort: $itemsSortInput
    ) {
    items {
      __typename
      uid
      quantity
      is_available
      not_available_message
      errors {
        code
        message
      }
      
      prices {
        price {
          value
          currency
        }
        total_item_discount {
          value
          currency
        }
        row_total {
          value
          currency
        }
        row_total_including_tax {
          value
          currency
        }
        price_including_tax {
          value
          currency
        }
        fixed_product_taxes {
          amount {
            value
            currency
          }
          label
        }
        original_row_total{
          value
          currency
        }
      }
  
      product {
        name
        sku
        thumbnail {
          url
          label
        }
        url_key
        url_suffix
        categories {
          url_path
          url_key
        }
        custom_attributesV2(filters: {is_visible_on_front: true}){
          items{
            code
            ...on AttributeValue{
              value
            }
            ...on AttributeSelectedOptions{
              selected_options {
                value
                label
              }
              
            }
          }
        }
        only_x_left_in_stock
        stock_status                  
        ${T}
      }
      ...on SimpleCartItem {
        ${p}
      }
      ... on ConfigurableCartItem {
        configurable_options {
          configurable_product_option_uid
          option_label
          value_label
        }
        configured_variant {
          uid
          sku
          only_x_left_in_stock
          stock_status
          thumbnail {
            label
            url
          }
          ${T}
        }
        ${p}
      }
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        ${p}
      }
      ... on BundleCartItem {
        bundle_options {
          uid
          label
          values {
            uid
            label
          }
        }
      }
      ... on GiftCardCartItem {
        message
        recipient_email
        recipient_name
        sender_email
        sender_name
        amount{
          currency
          value
        }
        is_available
      }
    }
  }
  shipping_addresses {
    country {
      code
    }
    region {
      code
    }
    postcode
  }
}
`,U=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,q=`
customer {
  addresses {
    default_shipping
    country_id
    postcode
    region {
      region
      region_code
      region_id
    }
  }
}`;export{U as C,D as a,q as b,R as t};
