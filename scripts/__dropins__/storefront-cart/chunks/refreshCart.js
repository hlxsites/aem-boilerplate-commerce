/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s,d as $,f as h,h as x}from"./resetCart.js";import{events as f}from"@dropins/tools/event-bus.js";import{Initializer as V,merge as W}from"@dropins/tools/lib.js";import{a as Q}from"./persisted-data.js";import{CART_FRAGMENT as S}from"../fragments.js";const k=new V({init:async r=>{const n={disableGuestCart:!1,...r};k.config.setConfig(n),b().catch(console.error)},listeners:()=>[f.on("authenticated",r=>{s.authenticated&&!r?f.emit("cart/reset",void 0):r&&!s.authenticated&&(s.authenticated=r,b().catch(console.error))},{eager:!0}),f.on("locale",async r=>{r!==s.locale&&(s.locale=r,b().catch(console.error))}),f.on("cart/reset",()=>{$().catch(console.error),f.emit("cart/data",null)}),f.on("cart/data",r=>{Q(r)}),f.on("checkout/updated",r=>{r&&dr().catch(console.error)})]}),P=k.config;function w(r){var c,e,u,l,t,_,o,a,g,i,y,d,C,m,v;if(!r)return null;const n={id:r.id,totalQuantity:rr(r),totalUniqueItems:r.itemsV2.items.length,totalGiftOptions:q((c=r==null?void 0:r.prices)==null?void 0:c.gift_options),giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)??!1,printedCardIncluded:(r==null?void 0:r.printed_card_included)??!1,cartGiftWrapping:((e=r==null?void 0:r.available_gift_wrappings)==null?void 0:e.map(p=>{var G,I,A,R,U;return{design:p.design??"",uid:p.uid,selected:((G=r==null?void 0:r.gift_wrapping)==null?void 0:G.uid)===p.uid,image:{url:((I=p==null?void 0:p.image)==null?void 0:I.url)??"",label:((A=p.image)==null?void 0:A.label)??""},price:{currency:((R=p==null?void 0:p.price)==null?void 0:R.currency)??"USD",value:((U=p==null?void 0:p.price)==null?void 0:U.value)??0}}}))??[],giftMessage:{senderName:((u=r==null?void 0:r.gift_message)==null?void 0:u.from)??"",recipientName:((l=r==null?void 0:r.gift_message)==null?void 0:l.to)??"",message:((t=r==null?void 0:r.gift_message)==null?void 0:t.message)??""},errors:H(r==null?void 0:r.itemsV2),items:M(r==null?void 0:r.itemsV2),miniCartMaxItems:M(r==null?void 0:r.itemsV2).slice(0,((_=s.config)==null?void 0:_.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:r.prices.grand_total.value,currency:r.prices.grand_total.currency},excludingTax:{value:r.prices.grand_total_excluding_tax.value,currency:r.prices.grand_total_excluding_tax.currency}},discount:D(r.prices.discounts,r.prices.grand_total.currency),subtotal:{excludingTax:{value:(o=r.prices.subtotal_excluding_tax)==null?void 0:o.value,currency:(a=r.prices.subtotal_excluding_tax)==null?void 0:a.currency},includingTax:{value:(g=r.prices.subtotal_including_tax)==null?void 0:g.value,currency:(i=r.prices.subtotal_including_tax)==null?void 0:i.currency},includingDiscountOnly:{value:(y=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:y.value,currency:(d=r.prices.subtotal_with_discount_excluding_tax)==null?void 0:d.currency}},appliedTaxes:N(r.prices.applied_taxes),totalTax:D(r.prices.applied_taxes,r.prices.grand_total.currency),appliedDiscounts:N(r.prices.discounts),isVirtual:r.is_virtual,addresses:{shipping:r.shipping_addresses&&nr(r)},isGuestCart:!s.authenticated,hasOutOfStockItems:cr(r),hasFullyOutOfStockItems:lr(r),appliedCoupons:r.applied_coupons};return W(n,(v=(m=(C=P.getConfig().models)==null?void 0:C.CartModel)==null?void 0:m.transformer)==null?void 0:v.call(m,r))}function q(r){var n,c,e,u,l,t,_,o,a,g,i,y;return{giftWrappingForItems:{value:((n=r==null?void 0:r.gift_wrapping_for_items)==null?void 0:n.value)??0,currency:((c=r==null?void 0:r.gift_wrapping_for_items)==null?void 0:c.currency)??"USD"},giftWrappingForItemsInclTax:{value:((e=r==null?void 0:r.gift_wrapping_for_items_incl_tax)==null?void 0:e.value)??0,currency:((u=r==null?void 0:r.gift_wrapping_for_items_incl_tax)==null?void 0:u.currency)??"USD"},giftWrappingForOrder:{value:((l=r==null?void 0:r.gift_wrapping_for_order)==null?void 0:l.value)??0,currency:((t=r==null?void 0:r.gift_wrapping_for_order)==null?void 0:t.currency)??"USD"},giftWrappingForOrderInclTax:{value:((_=r==null?void 0:r.gift_wrapping_for_order_incl_tax)==null?void 0:_.value)??0,currency:((o=r==null?void 0:r.gift_wrapping_for_order_incl_tax)==null?void 0:o.currency)??"USD"},printedCard:{value:((a=r==null?void 0:r.printed_card)==null?void 0:a.value)??0,currency:((g=r==null?void 0:r.printed_card)==null?void 0:g.currency)??"USD"},printedCardInclTax:{value:((i=r==null?void 0:r.printed_card_incl_tax)==null?void 0:i.value)??0,currency:((y=r==null?void 0:r.printed_card_incl_tax)==null?void 0:y.currency)??"USD"}}}function D(r,n){return r!=null&&r.length?r.reduce((c,e)=>({value:c.value+e.amount.value,currency:e.amount.currency}),{value:0,currency:n}):{value:0,currency:n}}function L(r,n){var c,e,u,l;return{src:r!=null&&r.useConfigurableParentThumbnail?n.product.thumbnail.url:((e=(c=n.configured_variant)==null?void 0:c.thumbnail)==null?void 0:e.url)||n.product.thumbnail.url,alt:r!=null&&r.useConfigurableParentThumbnail?n.product.thumbnail.label:((l=(u=n.configured_variant)==null?void 0:u.thumbnail)==null?void 0:l.label)||n.product.thumbnail.label}}function X(r){var n,c,e,u;return r.__typename==="ConfigurableCartItem"?{value:(c=(n=r.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.regular_price.value,currency:(u=(e=r.configured_variant)==null?void 0:e.price_range)==null?void 0:u.maximum_price.regular_price.currency}:r.__typename==="GiftCardCartItem"?{value:r.prices.price.value,currency:r.prices.price.currency}:{value:r.prices.original_item_price.value,currency:r.prices.original_item_price.currency}}function K(r){var n,c,e;return r.__typename==="ConfigurableCartItem"?((c=(n=r.configured_variant)==null?void 0:n.price_range)==null?void 0:c.maximum_price.discount.amount_off)>0:((e=r.product.price_range)==null?void 0:e.maximum_price.discount.amount_off)>0}function Y(r){var n,c,e;return{senderName:((n=r==null?void 0:r.gift_message)==null?void 0:n.from)??"",recipientName:((c=r==null?void 0:r.gift_message)==null?void 0:c.to)??"",message:((e=r==null?void 0:r.gift_message)==null?void 0:e.message)??""}}function j(r){return{currency:(r==null?void 0:r.currency)??"USD",value:(r==null?void 0:r.value)??0}}function M(r){var c;if(!((c=r==null?void 0:r.items)!=null&&c.length))return[];const n=s.config;return r.items.map(e=>{var u,l,t,_,o,a,g;return{giftWrappingAvailable:((u=e==null?void 0:e.product)==null?void 0:u.gift_wrapping_available)??!1,giftWrappingPrice:j((l=e==null?void 0:e.product)==null?void 0:l.gift_wrapping_price),giftMessage:Y(e),productGiftWrapping:((t=e==null?void 0:e.available_gift_wrapping)==null?void 0:t.map(i=>{var y,d,C,m,v;return{design:i.design??"",uid:i.uid,selected:((y=e.gift_wrapping)==null?void 0:y.uid)===i.uid,image:{url:((d=i==null?void 0:i.image)==null?void 0:d.url)??"",label:((C=i.image)==null?void 0:C.label)??""},price:{currency:((m=i==null?void 0:i.price)==null?void 0:m.currency)??"USD",value:((v=i==null?void 0:i.price)==null?void 0:v.value)??0}}}))??[],itemType:e.__typename,uid:e.uid,giftMessageAvailable:B(e.product.gift_message_available),url:{urlKey:e.product.url_key,categories:e.product.categories.map(i=>i.url_key)},canonicalUrl:e.product.canonical_url,categories:e.product.categories.map(i=>i.name),quantity:e.quantity,sku:tr(e),topLevelSku:e.product.sku,name:e.product.name,image:L(n,e),price:{value:e.prices.price.value,currency:e.prices.price.currency},taxedPrice:{value:e.prices.price_including_tax.value,currency:e.prices.price_including_tax.currency},fixedProductTaxes:e.prices.fixed_product_taxes,rowTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},rowTotalIncludingTax:{value:e.prices.row_total_including_tax.value,currency:e.prices.row_total_including_tax.currency},links:er(e.links),total:{value:(_=e.prices.original_row_total)==null?void 0:_.value,currency:(o=e.prices.original_row_total)==null?void 0:o.currency},discount:{value:e.prices.total_item_discount.value,currency:e.prices.total_item_discount.currency,label:(a=e.prices.discounts)==null?void 0:a.map(i=>i.label)},regularPrice:X(e),discounted:K(e),bundleOptions:e.__typename==="BundleCartItem"?O(e.bundle_options):null,selectedOptions:J(e.configurable_options),customizableOptions:Z(e.customizable_options),sender:e.__typename==="GiftCardCartItem"?e.sender_name:null,senderEmail:e.__typename==="GiftCardCartItem"?e.sender_email:null,recipient:e.__typename==="GiftCardCartItem"?e.recipient_name:null,recipientEmail:e.__typename==="GiftCardCartItem"?e.recipient_email:null,message:e.__typename==="GiftCardCartItem"?e.message:null,discountedTotal:{value:e.prices.row_total.value,currency:e.prices.row_total.currency},onlyXLeftInStock:e.__typename==="ConfigurableCartItem"?(g=e.configured_variant)==null?void 0:g.only_x_left_in_stock:e.product.only_x_left_in_stock,lowInventory:e.is_available&&e.product.only_x_left_in_stock!==null,insufficientQuantity:(e.__typename==="ConfigurableCartItem"?e.configured_variant:e.product).stock_status==="IN_STOCK"&&!e.is_available,outOfStock:e.product.stock_status==="OUT_OF_STOCK",stockLevel:ur(e),discountPercentage:ir(e),savingsAmount:sr(e),productAttributes:or(e)}})}function B(r){switch(+r){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function H(r){var c;const n=(c=r==null?void 0:r.items)==null?void 0:c.reduce((e,u)=>{var l;return(l=u.errors)==null||l.forEach(t=>{e.push({uid:u.uid,text:t.message})}),e},[]);return n!=null&&n.length?n:null}function N(r){return r!=null&&r.length?r.map(n=>({amount:{value:n.amount.value,currency:n.amount.currency},label:n.label,coupon:n.coupon})):[]}function O(r){const n=r==null?void 0:r.map(e=>({uid:e.uid,label:e.label,value:e.values.map(u=>u.label).join(", ")})),c={};return n==null||n.forEach(e=>{c[e.label]=e.value}),Object.keys(c).length>0?c:null}function J(r){const n=r==null?void 0:r.map(e=>({uid:e.configurable_product_option_uid,label:e.option_label,value:e.value_label})),c={};return n==null||n.forEach(e=>{c[e.label]=e.value}),Object.keys(c).length>0?c:null}function Z(r){const n=r==null?void 0:r.map(e=>({uid:e.customizable_option_uid,label:e.label,type:e.type,values:e.values.map(u=>({uid:u.customizable_option_value_uid,label:u.label,value:u.value}))})),c={};return n==null||n.forEach(e=>{var u;switch(e.type){case"field":case"area":case"date_time":c[e.label]=e.values[0].value;break;case"radio":case"drop_down":c[e.label]=e.values[0].label;break;case"multiple":case"checkbox":c[e.label]=e.values.reduce((a,g)=>a?`${a}, ${g.label}`:g.label,"");break;case"file":const l=new DOMParser,t=e.values[0].value,o=((u=l.parseFromString(t,"text/html").querySelector("a"))==null?void 0:u.textContent)||"";c[e.label]=o;break}}),c}function rr(r){var n,c;return((n=s.config)==null?void 0:n.cartSummaryDisplayTotal)===0?r.itemsV2.items.length:((c=s.config)==null?void 0:c.cartSummaryDisplayTotal)===1?r.total_quantity:r.itemsV2.items.length}function er(r){return(r==null?void 0:r.length)>0?{count:r.length,result:r.map(n=>n.title).join(", ")}:null}function nr(r){var n,c,e,u;return(n=r.shipping_addresses)!=null&&n.length?(c=r.shipping_addresses)==null?void 0:c.map(l=>({countryCode:l.country.code,zipCode:l.postcode,regionCode:l.region.code})):(e=r.addresses)!=null&&e.length?(u=r.addresses)==null?void 0:u.filter(l=>l.default_shipping).map(l=>{var t;return l.default_shipping&&{countryCode:l.country_code,zipCode:l.postcode,regionCode:(t=l.region)==null?void 0:t.region_code}}):null}function cr(r){var n,c;return(c=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:c.some(e=>{var u;return((u=e==null?void 0:e.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"||e.product.stock_status==="IN_STOCK"&&!e.is_available})}function ur(r){if(!r.not_available_message)return null;const n=r.not_available_message.match(/-?\d+/);return n?parseInt(n[0]):"noNumber"}function lr(r){var n,c;return(c=(n=r==null?void 0:r.itemsV2)==null?void 0:n.items)==null?void 0:c.some(e=>{var u;return((u=e==null?void 0:e.product)==null?void 0:u.stock_status)==="OUT_OF_STOCK"})}function ir(r){var c,e,u,l,t,_,o,a;let n;if(r.__typename==="ConfigurableCartItem")n=(l=(u=(e=(c=r==null?void 0:r.configured_variant)==null?void 0:c.price_range)==null?void 0:e.maximum_price)==null?void 0:u.discount)==null?void 0:l.percent_off;else{if(r.__typename==="BundleCartItem")return;n=(a=(o=(_=(t=r==null?void 0:r.product)==null?void 0:t.price_range)==null?void 0:_.maximum_price)==null?void 0:o.discount)==null?void 0:a.percent_off}if(n!==0)return Math.round(n)}function tr(r){var n;return r.__typename==="ConfigurableCartItem"?r.configured_variant.sku:((n=r.product)==null?void 0:n.variantSku)||r.product.sku}function sr(r){var e,u,l,t,_,o;let n,c;if(n=((u=(e=r==null?void 0:r.prices)==null?void 0:e.original_row_total)==null?void 0:u.value)-((t=(l=r==null?void 0:r.prices)==null?void 0:l.row_total)==null?void 0:t.value),c=(o=(_=r==null?void 0:r.prices)==null?void 0:_.row_total)==null?void 0:o.currency,n!==0)return{value:n,currency:c}}function or(r){var n,c,e;return(e=(c=(n=r==null?void 0:r.product)==null?void 0:n.custom_attributesV2)==null?void 0:c.items)==null?void 0:e.map(u=>{const l=u.code.split("_").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ");return{...u,code:l}})}function _r(r){var e,u;if(!r)return null;const n=l=>{switch(l){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},c=l=>{switch(+l){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:r.minicart_display,miniCartMaxItemsDisplay:r.minicart_max_items,cartExpiresInDays:r.cart_expires_in_days,cartSummaryDisplayTotal:r.cart_summary_display_quantity,cartSummaryMaxItems:r.max_items_in_order_summary,defaultCountry:r.default_country,categoryFixedProductTaxDisplaySetting:r.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:r.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:r.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:r.shopping_cart_display_zero_tax,subtotal:n(r.shopping_cart_display_subtotal),price:n(r.shopping_cart_display_price),shipping:n(r.shopping_cart_display_shipping),fullSummary:r.shopping_cart_display_full_summary,grandTotal:r.shopping_cart_display_grand_total,taxGiftWrapping:r.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:r.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:c(r==null?void 0:r.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:c(r==null?void 0:r.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:c(r==null?void 0:r.allow_order),allowGiftMessageOnOrderItems:c(r==null?void 0:r.allow_items),allowGiftReceipt:!!+(r==null?void 0:r.allow_gift_receipt),allowPrintedCard:!!+(r==null?void 0:r.allow_printed_card),printedCardPrice:{currency:((e=r==null?void 0:r.printed_card_priceV2)==null?void 0:e.currency)??"",value:((u=r==null?void 0:r.printed_card_priceV2)==null?void 0:u.value)!=null?+r.printed_card_priceV2.value:0},cartGiftWrapping:n(+r.cart_gift_wrapping),cartPrintedCard:n(+r.cart_printed_card)}}const E=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,ar=`
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
`,pr=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${E}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${S}
`,gr=`
  query CUSTOMER_CART_QUERY(
      ${E}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${ar}
  ${S}
`,T=async()=>{const r=s.authenticated,n=s.cartId;if(r)return h(gr,{method:"POST"}).then(({errors:c,data:e})=>{if(c)return x(c);const u={...e.cart,...e.customer};return w(u)});if(!n)throw new Error("No cart ID found");return h(pr,{method:"POST",cache:"no-cache",variables:{cartId:n}}).then(({errors:c,data:e})=>c?x(c):w(e.cart))},fr=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${E}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CART_FRAGMENT 
    }
  }

  ${S}
`,b=async()=>{if(s.initializing)return null;s.initializing=!0,s.config||(s.config=await mr());const r=s.authenticated?await F():await z();return f.emit("cart/initialized",r),f.emit("cart/data",r),s.initializing=!1,r};async function F(){const r=s.cartId,n=await T();return n?(s.cartId=n.id,!r||n.id===r?n:await h(fr,{variables:{guestCartId:r,customerCartId:n.id}}).then(()=>T()).then(c=>{const e={oldCartItems:n.items,newCart:c};return f.emit("cart/merged",e),c}).catch(()=>(console.error("Could not merge carts"),n))):null}async function z(){if(P.getConfig().disableGuestCart===!0||!s.cartId)return null;try{return await T()}catch(r){return console.error(r),null}}const yr=`
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
    allow_gift_wrapping_on_order
    allow_gift_wrapping_on_order_items
    allow_order
    allow_items
    allow_gift_receipt
    allow_printed_card
    printed_card_priceV2 {
      currency
      value
    }
    cart_gift_wrapping
    cart_printed_card
  }
}
`,mr=async()=>h(yr,{method:"GET",cache:"force-cache"}).then(({errors:r,data:n})=>r?x(r):_r(n.storeConfig)),dr=async()=>{const r=s.authenticated?await F():await z();return f.emit("cart/data",r),r};export{E as C,b as a,F as b,P as c,z as d,mr as e,T as g,k as i,dr as r,w as t};
