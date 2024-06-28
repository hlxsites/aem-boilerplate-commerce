import{FetchGraphQL as A}from"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";function D(r){const n=document.cookie.split(";");for(let u=0;u<n.length;u++){const e=n[u].trim();if(e.indexOf(`${r}=`)===0)return e.substring(r.length+1)}return null}function q(r){r?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(r)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function w(){const r=sessionStorage.getItem("DROPIN__CART__CART__DATA");return r?JSON.parse(r):null}const R=(()=>{const r=w();return{cartId:null,authenticated:r?!r.isGuestCart:!1}})(),c=new Proxy(R,{set(r,n,u){var e;if(r[n]=u,n==="cartId"){if(u===c.cartId)return!0;if(u===null)return document.cookie="DROPIN__CART__CART-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const t=(e=c.config)==null?void 0:e.cartExpiresInDays;t||console.warn('Missing "expiresInDays" config. Cookie expiration will default to 30 days.');const l=new Date;l.setDate(l.getDate()+(t??30)),document.cookie=`DROPIN__CART__CART-ID=${u}; expires=${l.toUTCString()}; path=/`}return!0},get(r,n){return n==="cartId"?D("DROPIN__CART__CART-ID"):r[n]}}),{setEndpoint:Q,setFetchGraphQlHeader:B,removeFetchGraphQlHeader:V,setFetchGraphQlHeaders:j,fetchGraphQl:U,getConfig:H}=new A().getMethods();function J(r){var n,u,e,t,l,a,i;return r?{id:r.id,totalQuantity:k(r),errors:O(r==null?void 0:r.itemsV2),items:C(r==null?void 0:r.itemsV2),miniCartMaxItems:C(r==null?void 0:r.itemsV2).slice(0,((n=c.config)==null?void 0:n.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},subtotal:{excludingTax:{value:(u=r.prices.subtotal_excluding_tax)==null?void 0:u.value,currency:(e=r.prices.subtotal_excluding_tax)==null?void 0:e.currency},includingTax:{value:(t=r.prices.subtotal_including_tax)==null?void 0:t.value,currency:(l=r.prices.subtotal_including_tax)==null?void 0:l.currency},includingDiscountOnly:{value:(a=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:a.value,currency:(i=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:i.currency}},appliedTaxes:x(r.prices.applied_taxes),totalTax:S(r.prices.applied_taxes),appliedDiscounts:x(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&$(r.shipping_addresses)},isGuestCart:!c.authenticated}:null}function S(r){return r!=null&&r.length?r.reduce((n,u)=>({value:n.value+u.amount.value,currency:u.amount.currency}),{value:0,currency:""}):null}function C(r){var u;if(!((u=r==null?void 0:r.items)!=null&&u.length))return[];const n=c.config;return r.items.map(e=>{var t,l,a,i,s,_,p,g,m,d,y,f,b,v,h;return{itemType:e.__typename,uid:e.uid,url:{urlKey:e.product.url_key,categories:e.product.categories.map(T=>T.url_key)},quantity:e.quantity,sku:e.product.sku,name:e.product.name,image:{src:n!=null&&n.useConfigurableParentThumbnail?e.product.thumbnail.url:((l=(t=e.configured_variant)==null?void 0:t.thumbnail)==null?void 0:l.url)||e.product.thumbnail.url,alt:n!=null&&n.useConfigurableParentThumbnail?e.product.thumbnail.label:((i=(a=e.configured_variant)==null?void 0:a.thumbnail)==null?void 0:i.label)||e.product.thumbnail.label},price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:z(e.links),total:e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.row_total.value,currency:e.prices.row_total.currency}:{value:(s=e.prices.original_row_total)==null?void 0:s.value,currency:(_=e.prices.original_row_total)==null?void 0:_.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency},regularPrice:e.__typename==="ConfigurableCartItem"?{value:(g=(p=e.configured_variant)==null?void 0:p.price_range)==null?void 0:g.maximum_price.regular_price.value,currency:(d=(m=e.configured_variant)==null?void 0:m.price_range)==null?void 0:d.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0||e.__typename==="BundleCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:(y=e.product.price_range)==null?void 0:y.maximum_price.regular_price.value,currency:(f=e.product.price_range)==null?void 0:f.maximum_price.regular_price.currency},discounted:e.__typename==="BundleCartItem"||e.__typename==="SimpleCartItem"&&e.customizable_options.length!==0?!1:e.__typename==="ConfigurableCartItem"?((v=(b=e.configured_variant)==null?void 0:b.price_range)==null?void 0:v.maximum_price.discount.amount_off)>0:((h=e.product.price_range)==null?void 0:h.maximum_price.discount.amount_off)>0,bundleOptions:e.__typename==="BundleCartItem"?E(e.bundle_options):null,selectedOptions:P(e.configurable_options),customizableOptions:G(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency}}})}function O(r){var u;const n=(u=r==null?void 0:r.items)==null?void 0:u.reduce((e,t)=>{var l;return(l=t.errors)==null||l.forEach(a=>{e.push({uid:t.uid,text:a.message})}),e},[]);return n!=null&&n.length?n:null}function x(r){return r!=null&&r.length?r.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label})):[]}function E(r){const n=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(t=>t.label).join(", ")})),u={};return n==null||n.forEach(e=>{u[e.label]=e.value}),Object.keys(u).length>0?u:null}function P(r){const n=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),u={};return n==null||n.forEach(e=>{u[e.label]=e.value}),Object.keys(u).length>0?u:null}function G(r){const n=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(t=>({uid:t.customizable_option_value_uid,label:t.label,value:t.value}))})),u={};return n==null||n.forEach(e=>{switch(e.type){case"field":case"area":case"date_time":u[e.label]=e.values[0].value;break;case"radio":case"drop_down":u[e.label]=e.values[0].label;break;case"multiple":case"checkbox":u[e.label]=e.values.reduce((t,l)=>t?`${t}, ${l.label}`:l.label,"");break}}),u}function k(r){var n,u;return((n=c.config)==null?void 0:n.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((u=c.config)==null?void 0:u.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function z(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(n=>n.title).join(", ")}:null}function $(r){return r!=null&&r.length?r.map(n=>{var u,e;return{countryCode:(u=n.country)==null?void 0:u.code,zipCode:n.postcode,regionCode:(e=n.region)==null?void 0:e.code}}):null}const L=r=>{const n=r.findIndex(({extensions:t})=>(t==null?void 0:t.category)==="graphql-authorization")>-1,u=r.findIndex(({extensions:t})=>(t==null?void 0:t.category)==="graphql-no-such-entity")>-1,e=r.map(t=>t.message).join(" ");if(n||u)return N(),console.error(e),null;throw Error(e)},o=`
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
`,I=`
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
`,K=`
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
        ${I}
      }
      ...on SimpleCartItem {
        ${o}
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
          thumbnail {
            label
            url
          }
          ${I}
        }
        ${o}
      }
      ... on DownloadableCartItem {
        links {
          sort_order
          title
        }
        ${o}
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
`,Z=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,N=()=>(c.cartId=null,c.authenticated=!1,Promise.resolve(null));export{Z as C,K as a,Q as b,B as c,j as d,N as e,U as f,H as g,L as h,q as i,w as j,V as r,c as s,J as t};
//# sourceMappingURL=resetCart.js.map
