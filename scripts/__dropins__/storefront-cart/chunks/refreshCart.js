/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i,d as G,f as y,h as d}from"./resetCart.js";import{events as l}from"@dropins/tools/event-bus.js";import{Initializer as w,merge as U}from"@dropins/tools/lib.js";import{a as k}from"./persisted-data.js";import{CART_FRAGMENT as h}from"../fragments.js";const E=new w({init:async e=>{const t={disableGuestCart:!1,...e};E.config.setConfig(t),m().catch(console.error)},listeners:()=>[l.on("authenticated",e=>{i.authenticated&&!e?l.emit("cart/reset",void 0):e&&!i.authenticated&&(i.authenticated=e,m().catch(console.error))},{eager:!0}),l.on("locale",async e=>{e!==i.locale&&(i.locale=e,m().catch(console.error))}),l.on("cart/reset",()=>{G().catch(console.error),l.emit("cart/data",null)}),l.on("cart/data",e=>{k(e)}),l.on("checkout/updated",e=>{e&&ce().catch(console.error)})]}),O=E.config;function v(e){var n,r,c,u,s,a,o,_,g,f,x;if(!e)return null;const t={appliedGiftCards:((n=e==null?void 0:e.applied_gift_cards)==null?void 0:n.map(p=>({code:p.code??"",appliedBalance:{value:p.applied_balance.value??0,currency:p.applied_balance.currency??"USD"},currentBalance:{value:p.current_balance.value??0,currency:p.current_balance.currency??"USD"},expirationDate:p.expiration_date??""})))??[],id:e.id,totalQuantity:Q(e),totalUniqueItems:e.itemsV2.items.length,errors:P(e==null?void 0:e.itemsV2),items:I(e==null?void 0:e.itemsV2),miniCartMaxItems:I(e==null?void 0:e.itemsV2).slice(0,((r=i.config)==null?void 0:r.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},discount:T(e.prices.discounts,e.prices.grand_total.currency),subtotal:{excludingTax:{value:(c=e.prices.subtotal_excluding_tax)==null?void 0:c.value,currency:(u=e.prices.subtotal_excluding_tax)==null?void 0:u.currency},includingTax:{value:(s=e.prices.subtotal_including_tax)==null?void 0:s.value,currency:(a=e.prices.subtotal_including_tax)==null?void 0:a.currency},includingDiscountOnly:{value:(o=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:o.value,currency:(_=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:_.currency}},appliedTaxes:S(e.prices.applied_taxes),totalTax:T(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:S(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&L(e)},isGuestCart:!i.authenticated,hasOutOfStockItems:V(e),hasFullyOutOfStockItems:K(e),appliedCoupons:e.applied_coupons};return U(t,(x=(f=(g=O.getConfig().models)==null?void 0:g.CartModel)==null?void 0:f.transformer)==null?void 0:x.call(f,e))}function T(e,t){return e!=null&&e.length?e.reduce((n,r)=>({value:n.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function D(e,t){var n,r,c,u;return{src:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.url:((r=(n=t.configured_variant)==null?void 0:n.thumbnail)==null?void 0:r.url)||t.product.thumbnail.url,alt:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.label:((u=(c=t.configured_variant)==null?void 0:c.thumbnail)==null?void 0:u.label)||t.product.thumbnail.label}}function M(e){var t,n,r,c;return e.__typename==="ConfigurableCartItem"?{value:(n=(t=e.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.regular_price.value,currency:(c=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:c.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function N(e){var t,n,r;return e.__typename==="ConfigurableCartItem"?((n=(t=e.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.discount.amount_off)>0:((r=e.product.price_range)==null?void 0:r.maximum_price.discount.amount_off)>0}function I(e){var n;if(!((n=e==null?void 0:e.items)!=null&&n.length))return[];const t=i.config;return e.items.map(r=>{var c,u,s,a;return{itemType:r.__typename,uid:r.uid,url:{urlKey:r.product.url_key,categories:r.product.categories.map(o=>o.url_key)},canonicalUrl:r.product.canonical_url,categories:r.product.categories.map(o=>o.name),quantity:r.quantity,sku:j(r),topLevelSku:r.product.sku,name:r.product.name,image:D(t,r),price:{value:r.prices.price.value,currency:r.prices.price.currency},taxedPrice:{value:r.prices.price_including_tax.value,currency:r.prices.price_including_tax.currency},fixedProductTaxes:r.prices.fixed_product_taxes,rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},rowTotalIncludingTax:{value:r.prices.row_total_including_tax.value,currency:r.prices.row_total_including_tax.currency},links:q(r.links),total:{value:(c=r.prices.original_row_total)==null?void 0:c.value,currency:(u=r.prices.original_row_total)==null?void 0:u.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency,label:(s=r.prices.discounts)==null?void 0:s.map(o=>o.label)},regularPrice:M(r),discounted:N(r),bundleOptions:r.__typename==="BundleCartItem"?F(r.bundle_options):null,selectedOptions:z(r.configurable_options),customizableOptions:$(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(a=r.configured_variant)==null?void 0:a.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:r.is_available&&r.product.only_x_left_in_stock!==null,insufficientQuantity:(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!r.is_available,outOfStock:r.product.stock_status==="OUT_OF_STOCK",stockLevel:X(r),discountPercentage:Y(r),savingsAmount:B(r),productAttributes:H(r)}})}function P(e){var n;const t=(n=e==null?void 0:e.items)==null?void 0:n.reduce((r,c)=>{var u;return(u=c.errors)==null||u.forEach(s=>{r.push({uid:c.uid,text:s.message})}),r},[]);return t!=null&&t.length?t:null}function S(e){return e!=null&&e.length?e.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label,coupon:t.coupon})):[]}function F(e){const t=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(c=>c.label).join(", ")})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function z(e){const t=e==null?void 0:e.map(r=>({uid:r.configurable_product_option_uid,label:r.option_label,value:r.value_label})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function $(e){const t=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(c=>({uid:c.customizable_option_value_uid,label:c.label,value:c.value}))})),n={};return t==null||t.forEach(r=>{var c;switch(r.type){case"field":case"area":case"date_time":n[r.label]=r.values[0].value;break;case"radio":case"drop_down":n[r.label]=r.values[0].label;break;case"multiple":case"checkbox":n[r.label]=r.values.reduce((_,g)=>_?`${_}, ${g.label}`:g.label,"");break;case"file":const u=new DOMParser,s=r.values[0].value,o=((c=u.parseFromString(s,"text/html").querySelector("a"))==null?void 0:c.textContent)||"";n[r.label]=o;break}}),n}function Q(e){var t,n;return((t=i.config)==null?void 0:t.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((n=i.config)==null?void 0:n.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function q(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(t=>t.title).join(", ")}:null}function L(e){var t,n,r,c;return(t=e.shipping_addresses)!=null&&t.length?(n=e.shipping_addresses)==null?void 0:n.map(u=>({countryCode:u.country.code,zipCode:u.postcode,regionCode:u.region.code})):(r=e.addresses)!=null&&r.length?(c=e.addresses)==null?void 0:c.filter(u=>u.default_shipping).map(u=>{var s;return u.default_shipping&&{countryCode:u.country_code,zipCode:u.postcode,regionCode:(s=u.region)==null?void 0:s.region_code}}):null}function V(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c;return((c=r==null?void 0:r.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"||r.product.stock_status==="IN_STOCK"&&!r.is_available})}function X(e){if(!e.not_available_message)return null;const t=e.not_available_message.match(/-?\d+/);return t?parseInt(t[0]):"noNumber"}function K(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c;return((c=r==null?void 0:r.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"})}function Y(e){var n,r,c,u,s,a,o,_;let t;if(e.__typename==="ConfigurableCartItem")t=(u=(c=(r=(n=e==null?void 0:e.configured_variant)==null?void 0:n.price_range)==null?void 0:r.maximum_price)==null?void 0:c.discount)==null?void 0:u.percent_off;else{if(e.__typename==="BundleCartItem")return;t=(_=(o=(a=(s=e==null?void 0:e.product)==null?void 0:s.price_range)==null?void 0:a.maximum_price)==null?void 0:o.discount)==null?void 0:_.percent_off}if(t!==0)return Math.round(t)}function j(e){var t;return e.__typename==="ConfigurableCartItem"?e.configured_variant.sku:((t=e.product)==null?void 0:t.variantSku)||e.product.sku}function B(e){var r,c,u,s,a,o;let t,n;if(t=((c=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:c.value)-((s=(u=e==null?void 0:e.prices)==null?void 0:u.row_total)==null?void 0:s.value),n=(o=(a=e==null?void 0:e.prices)==null?void 0:a.row_total)==null?void 0:o.currency,t!==0)return{value:t,currency:n}}function H(e){var t,n,r;return(r=(n=(t=e==null?void 0:e.product)==null?void 0:t.custom_attributesV2)==null?void 0:n.items)==null?void 0:r.map(c=>{const u=c.code.split("_").map(s=>s.charAt(0).toUpperCase()+s.slice(1)).join(" ");return{...c,code:u}})}function W(e){if(!e)return null;const t=n=>{switch(n){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,cartSummaryMaxItems:e.max_items_in_order_summary,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:t(e.shopping_cart_display_subtotal),price:t(e.shopping_cart_display_price),shipping:t(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent"}}const b=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,J=`
  fragment CUSTOMER_FRAGMENT on Customer {
    addresses {
      default_shipping
      country_code
      postcode
      region {
        region
        region_code
        region_id
      }
    }
  }
`,Z=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${b}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${h}
`,ee=`
  query CUSTOMER_CART_QUERY(
      ${b}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${J}
  ${h}
`,C=async()=>{const e=i.authenticated,t=i.cartId;if(e)return y(ee,{method:"POST"}).then(({errors:n,data:r})=>{if(n)return d(n);const c={...r.cart,...r.customer};return v(c)});if(!t)throw new Error("No cart ID found");return y(Z,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:r})=>n?d(n):v(r.cart))},re=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${b}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CART_FRAGMENT 
    }
  }

  ${h}
`,m=async()=>{if(i.initializing)return null;i.initializing=!0,i.config||(i.config=await ne());const e=i.authenticated?await A():await R();return l.emit("cart/initialized",e),l.emit("cart/data",e),i.initializing=!1,e};async function A(){const e=i.cartId,t=await C();return t?(i.cartId=t.id,!e||t.id===e?t:await y(re,{variables:{guestCartId:e,customerCartId:t.id}}).then(()=>C()).then(n=>{const r={oldCartItems:t.items,newCart:n};return l.emit("cart/merged",r),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function R(){if(O.getConfig().disableGuestCart===!0||!i.cartId)return null;try{return await C()}catch(e){return console.error(e),null}}const te=`
query STORE_CONFIG_QUERY {
  storeConfig {
    minicart_display 
    minicart_max_items
    cart_expires_in_days 
    cart_summary_display_quantity
    max_items_in_order_summary
    default_country
    category_fixed_product_tax_display_setting
    product_fixed_product_tax_display_setting
    sales_fixed_product_tax_display_setting
    shopping_cart_display_full_summary
    shopping_cart_display_grand_total
    shopping_cart_display_price
    shopping_cart_display_shipping
    shopping_cart_display_subtotal
    shopping_cart_display_tax_gift_wrapping
    shopping_cart_display_zero_tax
    configurable_thumbnail_source
  }
}
`,ne=async()=>y(te,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?d(e):W(t.storeConfig)),ce=async()=>{const e=i.authenticated?await A():await R();return l.emit("cart/data",e),e};export{b as C,m as a,A as b,O as c,R as d,ne as e,C as g,E as i,ce as r,v as t};
