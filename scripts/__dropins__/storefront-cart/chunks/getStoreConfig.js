import{events as s}from"@dropins/tools/event-bus.js";import{s as i,d as U,f as y,h as d}from"./resetCart.js";import{Initializer as k,merge as D}from"@dropins/tools/lib.js";import{CART_FRAGMENT as C}from"../fragments.js";import{a as z}from"./persisted-data.js";const w=new k({init:async e=>{const t={disableGuestCart:!1,...e};w.config.setConfig(t),f().catch(console.error)},listeners:()=>[s.on("authenticated",e=>{i.authenticated&&!e?s.emit("cart/reset",void 0):e&&!i.authenticated&&(i.authenticated=e,f().catch(console.error))},{eager:!0}),s.on("locale",async e=>{e!==i.locale&&(i.locale=e,f().catch(console.error))}),s.on("cart/reset",()=>{U().catch(console.error),s.emit("cart/data",null)}),s.on("cart/data",e=>{z(e)})]}),N=w.config;function R(e){var n,r,c,a,u,p,_,o,l,g;if(!e)return null;const t={id:e.id,totalQuantity:L(e),errors:$(e==null?void 0:e.itemsV2),items:G(e==null?void 0:e.itemsV2),miniCartMaxItems:G(e==null?void 0:e.itemsV2).slice(0,((n=i.config)==null?void 0:n.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},subtotal:{excludingTax:{value:(r=e.prices.subtotal_excluding_tax)==null?void 0:r.value,currency:(c=e.prices.subtotal_excluding_tax)==null?void 0:c.currency},includingTax:{value:(a=e.prices.subtotal_including_tax)==null?void 0:a.value,currency:(u=e.prices.subtotal_including_tax)==null?void 0:u.currency},includingDiscountOnly:{value:(p=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:p.value,currency:(_=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:_.currency}},appliedTaxes:A(e.prices.applied_taxes),totalTax:F(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:A(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&X(e)},isGuestCart:!i.authenticated,hasOutOfStockItems:K(e),hasFullyOutOfStockItems:B(e)};return D(t,(g=(l=(o=N.getConfig().models)==null?void 0:o.CartModel)==null?void 0:l.transformer)==null?void 0:g.call(l,e))}function F(e,t){return e!=null&&e.length?e.reduce((n,r)=>({value:n.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function G(e){var n;if(!((n=e==null?void 0:e.items)!=null&&n.length))return[];const t=i.config;return e.items.map(r=>{var c,a,u,p,_,o,l,g,b,x,T,v,I,S,E,O;return{itemType:r.__typename,uid:r.uid,url:{urlKey:r.product.url_key,categories:r.product.categories.map(M=>M.url_key)},quantity:r.quantity,sku:r.product.sku,name:r.product.name,image:{src:t!=null&&t.useConfigurableParentThumbnail?r.product.thumbnail.url:((a=(c=r.configured_variant)==null?void 0:c.thumbnail)==null?void 0:a.url)||r.product.thumbnail.url,alt:t!=null&&t.useConfigurableParentThumbnail?r.product.thumbnail.label:((p=(u=r.configured_variant)==null?void 0:u.thumbnail)==null?void 0:p.label)||r.product.thumbnail.label},price:{value:r.prices.price.value,currency:r.prices.price.currency},taxedPrice:{value:r.prices.price_including_tax.value,currency:r.prices.price_including_tax.currency},rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},rowTotalIncludingTax:{value:r.prices.row_total_including_tax.value,currency:r.prices.row_total_including_tax.currency},links:V(r.links),total:r.__typename==="SimpleCartItem"&&r.customizable_options.length!==0||r.__typename==="BundleCartItem"?{value:r.prices.row_total.value,currency:r.prices.row_total.currency}:{value:(_=r.prices.original_row_total)==null?void 0:_.value,currency:(o=r.prices.original_row_total)==null?void 0:o.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency},regularPrice:r.__typename==="ConfigurableCartItem"?{value:(g=(l=r.configured_variant)==null?void 0:l.price_range)==null?void 0:g.maximum_price.regular_price.value,currency:(x=(b=r.configured_variant)==null?void 0:b.price_range)==null?void 0:x.maximum_price.regular_price.currency}:r.__typename==="GiftCardCartItem"||r.__typename==="SimpleCartItem"&&r.customizable_options.length!==0||r.__typename==="BundleCartItem"?{value:r.prices.price.value,currency:r.prices.price.currency}:{value:(T=r.product.price_range)==null?void 0:T.maximum_price.regular_price.value,currency:(v=r.product.price_range)==null?void 0:v.maximum_price.regular_price.currency},discounted:r.__typename==="BundleCartItem"||r.__typename==="SimpleCartItem"&&r.customizable_options.length!==0?!1:r.__typename==="ConfigurableCartItem"?((S=(I=r.configured_variant)==null?void 0:I.price_range)==null?void 0:S.maximum_price.discount.amount_off)>0:((E=r.product.price_range)==null?void 0:E.maximum_price.discount.amount_off)>0,bundleOptions:r.__typename==="BundleCartItem"?P(r.bundle_options):null,selectedOptions:Q(r.configurable_options),customizableOptions:q(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(O=r.configured_variant)==null?void 0:O.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:r.is_available&&r.product.only_x_left_in_stock!==null,insufficientQuantity:(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!r.is_available,outOfStock:r.product.stock_status==="OUT_OF_STOCK",stockLevel:Y(r)}})}function $(e){var n;const t=(n=e==null?void 0:e.items)==null?void 0:n.reduce((r,c)=>{var a;return(a=c.errors)==null||a.forEach(u=>{r.push({uid:c.uid,text:u.message})}),r},[]);return t!=null&&t.length?t:null}function A(e){return e!=null&&e.length?e.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label})):[]}function P(e){const t=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(c=>c.label).join(", ")})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function Q(e){const t=e==null?void 0:e.map(r=>({uid:r.configurable_product_option_uid,label:r.option_label,value:r.value_label})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function q(e){const t=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(c=>({uid:c.customizable_option_value_uid,label:c.label,value:c.value}))})),n={};return t==null||t.forEach(r=>{var c;switch(r.type){case"field":case"area":case"date_time":n[r.label]=r.values[0].value;break;case"radio":case"drop_down":n[r.label]=r.values[0].label;break;case"multiple":case"checkbox":n[r.label]=r.values.reduce((o,l)=>o?`${o}, ${l.label}`:l.label,"");break;case"file":const a=new DOMParser,u=r.values[0].value,_=((c=a.parseFromString(u,"text/html").querySelector("a"))==null?void 0:c.textContent)||"";n[r.label]=_;break}}),n}function L(e){var t,n;return((t=i.config)==null?void 0:t.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((n=i.config)==null?void 0:n.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function V(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(t=>t.title).join(", ")}:null}function X(e){var t,n,r,c;return(t=e.shipping_addresses)!=null&&t.length?(n=e.shipping_addresses)==null?void 0:n.map(a=>({countryCode:a.country.code,zipCode:a.postcode,regionCode:a.region.code})):(r=e.addresses)!=null&&r.length?(c=e.addresses)==null?void 0:c.filter(a=>a.default_shipping).map(a=>{var u;return a.default_shipping&&{countryCode:a.country_id,zipCode:a.postcode,regionCode:(u=a.region)==null?void 0:u.region_code}}):null}function K(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c;return((c=r==null?void 0:r.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"||r.product.stock_status==="IN_STOCK"&&!r.is_available})}function Y(e){if(!e.not_available_message)return null;const t=e.not_available_message.match(/-?\d+/);return t?parseInt(t[0]):"noNumber"}function B(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c;return((c=r==null?void 0:r.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"})}function j(e){if(!e)return null;const t=n=>{switch(n){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:t(e.shopping_cart_display_subtotal),price:t(e.shopping_cart_display_price),shipping:t(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent"}}const h=`
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
`,H=`
fragment CUSTOMER_FRAGMENT on Customer {
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
}`,W=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${h}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${C}
`,J=`
  query CUSTOMER_CART_QUERY(
      ${h}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${H}
  ${C}
`,m=async()=>{const e=i.authenticated,t=i.cartId;if(e)return y(J,{method:"POST"}).then(({errors:n,data:r})=>{if(n)return d(n);const c={...r.cart,...r.customer};return R(c)});if(!t)throw new Error("No cart ID found");return y(W,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:r})=>n?d(n):R(r.cart))},Z=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${h}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CART_FRAGMENT 
    }
  }

  ${C}
`,f=async()=>{if(i.initializing)return null;i.initializing=!0,i.config||(i.config=await ne());const e=i.authenticated?await ee():await re();return s.emit("cart/initialized",e),s.emit("cart/data",e),i.initializing=!1,e};async function ee(){const e=i.cartId,t=await m();return t?(i.cartId=t.id,!e||t.id===e?t:await y(Z,{variables:{guestCartId:e,customerCartId:t.id}}).then(()=>m()).then(n=>{const r={oldCartItems:t.items,newCart:n};return s.emit("cart/merged",r),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function re(){if(N.getConfig().disableGuestCart===!0||!i.cartId)return null;try{return await m()}catch(e){return console.error(e),null}}const te=`
query STORE_CONFIG_QUERY {
  storeConfig {
    minicart_display 
    minicart_max_items
    cart_expires_in_days 
    cart_summary_display_quantity
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
`,ne=async()=>y(te,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?d(e):j(t.storeConfig));export{h as C,re as a,m as b,N as c,f as d,ne as e,ee as g,w as i,R as t};
