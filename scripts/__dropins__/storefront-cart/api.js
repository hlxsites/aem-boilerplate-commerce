/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as g}from"@dropins/tools/event-bus.js";import{Initializer as ae,merge as le}from"@dropins/tools/lib.js";import{CART_FRAGMENT as b}from"./fragments.js";import{FetchGraphQL as _e}from"@dropins/tools/fetch-graphql.js";function pe(e){const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].trim();if(r.indexOf(`${e}=`)===0)return r.substring(e.length+1)}return null}const L="DROPIN__CART__CART__AUTHENTICATED";function de(e){e?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function V(){const e=sessionStorage.getItem("DROPIN__CART__CART__DATA");return e?JSON.parse(e):null}function Cr(e){e?sessionStorage.setItem("DROPIN__CART__SHIPPING__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__SHIPPING__DATA")}function ge(e){e?localStorage.setItem(L,"true"):localStorage.removeItem(L)}function fe(){return localStorage.getItem(L)==="true"}const Ce={cartId:null,authenticated:fe()},_=new Proxy(Ce,{set(e,t,n){var r;if(e[t]=n,t==="cartId"){if(n===_.cartId)return!0;if(n===null)return document.cookie="DROPIN__CART__CART-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const o=(r=_.config)==null?void 0:r.cartExpiresInDays;o||console.warn('Missing "expiresInDays" config. Cookie expiration will default to 30 days.');const c=new Date;c.setDate(c.getDate()+(o??30)),document.cookie=`DROPIN__CART__CART-ID=${n}; expires=${c.toUTCString()}; path=/`}return t==="authenticated"&&ge(n),!0},get(e,t){return t==="cartId"?pe("DROPIN__CART__CART-ID"):e[t]}}),re=new ae({init:async e=>{const t={disableGuestCart:!1,...e};re.config.setConfig(t),q().catch(console.error)},listeners:()=>[g.on("authenticated",e=>{_.authenticated&&!e?g.emit("cart/reset",void 0):e&&!_.authenticated&&(_.authenticated=e,q().catch(console.error))},{eager:!0}),g.on("locale",async e=>{e!==_.locale&&(_.locale=e,q().catch(console.error))}),g.on("cart/reset",()=>{ue().catch(console.error),g.emit("cart/data",null)}),g.on("cart/data",e=>{de(e)}),g.on("checkout/updated",e=>{!e||(e==null?void 0:e.type)==="quote"||Q().catch(console.error)}),g.on("requisitionList/alert",()=>{Q().catch(console.error)})]}),H=re.config,{setEndpoint:Tr,setFetchGraphQlHeader:mr,removeFetchGraphQlHeader:yr,setFetchGraphQlHeaders:Ir,fetchGraphQl:y,getConfig:hr}=new _e().getMethods();function X(e){return typeof e.is_salable=="boolean"?e.is_salable:typeof e.is_available=="boolean"?e.is_available:!0}function A(e){var n,r,o,c,i,s,l,a,u,p,d,T,S,h,O,N;if(!e)return null;const t={appliedGiftCards:((n=e==null?void 0:e.applied_gift_cards)==null?void 0:n.map(C=>{var $,B,j;const m={code:C.code??"",appliedBalance:{value:C.applied_balance.value??0,currency:C.applied_balance.currency??"USD"},currentBalance:{value:C.current_balance.value??0,currency:C.current_balance.currency??"USD"},expirationDate:C.expiration_date??""},f=($=m==null?void 0:m.currentBalance)==null?void 0:$.value,D=(B=m==null?void 0:m.appliedBalance)==null?void 0:B.value,P=(j=m==null?void 0:m.currentBalance)==null?void 0:j.currency,M=f-D>0?f-D:0;return{...m,giftCardBalance:{value:M,currency:P}}}))??[],id:e.id,totalQuantity:Re(e),totalUniqueItems:e.itemsV2.items.length,totalGiftOptions:Te((r=e==null?void 0:e.prices)==null?void 0:r.gift_options),giftReceiptIncluded:(e==null?void 0:e.gift_receipt_included)??!1,printedCardIncluded:(e==null?void 0:e.printed_card_included)??!1,cartGiftWrapping:((o=e==null?void 0:e.available_gift_wrappings)==null?void 0:o.map(C=>{var m,f,D,P,x;return{design:C.design??"",uid:C.uid,selected:((m=e==null?void 0:e.gift_wrapping)==null?void 0:m.uid)===C.uid,image:{url:((f=C==null?void 0:C.image)==null?void 0:f.url)??"",label:((D=C.image)==null?void 0:D.label)??""},price:{currency:((P=C==null?void 0:C.price)==null?void 0:P.currency)??"USD",value:((x=C==null?void 0:C.price)==null?void 0:x.value)??0}}}))??[],giftMessage:{senderName:((c=e==null?void 0:e.gift_message)==null?void 0:c.from)??"",recipientName:((i=e==null?void 0:e.gift_message)==null?void 0:i.to)??"",message:((s=e==null?void 0:e.gift_message)==null?void 0:s.message)??""},errors:Se(e==null?void 0:e.itemsV2),items:K(e==null?void 0:e.itemsV2),miniCartMaxItems:K(e==null?void 0:e.itemsV2).slice(0,((l=_.config)==null?void 0:l.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},discount:Y(e.prices.discounts,e.prices.grand_total.currency),subtotal:{excludingTax:{value:(a=e.prices.subtotal_excluding_tax)==null?void 0:a.value,currency:(u=e.prices.subtotal_excluding_tax)==null?void 0:u.currency},includingTax:{value:(p=e.prices.subtotal_including_tax)==null?void 0:p.value,currency:(d=e.prices.subtotal_including_tax)==null?void 0:d.currency},includingDiscountOnly:{value:(T=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:T.value,currency:(S=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:S.currency}},appliedTaxes:J(e.prices.applied_taxes),totalTax:Y(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:J(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&Pe(e)},isGuestCart:!_.authenticated,hasOutOfStockItems:xe(e),hasFullyOutOfStockItems:Ne(e),appliedCoupons:e.applied_coupons};return le(t,(N=(O=(h=H.getConfig().models)==null?void 0:h.CartModel)==null?void 0:O.transformer)==null?void 0:N.call(O,e))}function Te(e){var t,n,r,o,c,i,s,l,a,u,p,d;return{giftWrappingForItems:{value:((t=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:t.value)??0,currency:((n=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:n.currency)??"USD"},giftWrappingForItemsInclTax:{value:((r=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:r.value)??0,currency:((o=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:o.currency)??"USD"},giftWrappingForOrder:{value:((c=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:c.value)??0,currency:((i=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:i.currency)??"USD"},giftWrappingForOrderInclTax:{value:((s=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:s.value)??0,currency:((l=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:l.currency)??"USD"},printedCard:{value:((a=e==null?void 0:e.printed_card)==null?void 0:a.value)??0,currency:((u=e==null?void 0:e.printed_card)==null?void 0:u.currency)??"USD"},printedCardInclTax:{value:((p=e==null?void 0:e.printed_card_incl_tax)==null?void 0:p.value)??0,currency:((d=e==null?void 0:e.printed_card_incl_tax)==null?void 0:d.currency)??"USD"}}}function Y(e,t){return e!=null&&e.length?e.reduce((n,r)=>({value:n.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function me(e,t){var n,r,o,c;return{src:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.url:((r=(n=t.configured_variant)==null?void 0:n.thumbnail)==null?void 0:r.url)||t.product.thumbnail.url,alt:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.label:((c=(o=t.configured_variant)==null?void 0:o.thumbnail)==null?void 0:c.label)||t.product.thumbnail.label}}function ye(e){var t,n,r,o;return e.__typename==="ConfigurableCartItem"?{value:(n=(t=e.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.regular_price.value,currency:(o=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:o.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function te(e,t){return e!=null&&e.length&&[...e].sort((r,o)=>o.quantity-r.quantity).find(r=>t>=r.quantity)||null}function Ie(e){var i,s;const t=e.quantity,n=e.__typename==="ConfigurableCartItem",r=n?(i=e.configured_variant)==null?void 0:i.price_tiers:e.product.price_tiers,o=n?(s=e.configured_variant)==null?void 0:s.price_range:e.product.price_range,c=te(r,t);return c?c.discount.amount_off>0:(o==null?void 0:o.maximum_price.discount.amount_off)>0}function he(e){var t,n,r;return{senderName:((t=e==null?void 0:e.gift_message)==null?void 0:t.from)??"",recipientName:((n=e==null?void 0:e.gift_message)==null?void 0:n.to)??"",message:((r=e==null?void 0:e.gift_message)==null?void 0:r.message)??""}}function Ee(e){return{currency:(e==null?void 0:e.currency)??"USD",value:(e==null?void 0:e.value)??0}}function K(e){var n;if(!((n=e==null?void 0:e.items)!=null&&n.length))return[];const t=_.config;return e.items.map(r=>{var i,s,l,a,u,p,d,T,S,h,O,N,C,m;const o=X(r),c=!!((i=r.backorder_message)!=null&&i.trim());return{giftWrappingAvailable:((s=r==null?void 0:r.product)==null?void 0:s.gift_wrapping_available)??!1,giftWrappingPrice:Ee((l=r==null?void 0:r.product)==null?void 0:l.gift_wrapping_price),giftMessage:he(r),productGiftWrapping:((a=r==null?void 0:r.available_gift_wrapping)==null?void 0:a.map(f=>{var D,P,x,M,$;return{design:f.design??"",uid:f.uid,selected:((D=r.gift_wrapping)==null?void 0:D.uid)===f.uid,image:{url:((P=f==null?void 0:f.image)==null?void 0:P.url)??"",label:((x=f.image)==null?void 0:x.label)??""},price:{currency:((M=f==null?void 0:f.price)==null?void 0:M.currency)??"USD",value:(($=f==null?void 0:f.price)==null?void 0:$.value)??0}}}))??[],itemType:r.__typename,uid:r.uid,giftMessageAvailable:ve(r.product.gift_message_available),url:{urlKey:r.product.url_key,categories:r.product.categories.map(f=>f.url_key)},canonicalUrl:r.product.canonical_url,categories:r.product.categories.map(f=>f.name),priceTiers:r.__typename==="ConfigurableCartItem"?((p=(u=r.configured_variant)==null?void 0:u.price_tiers)==null?void 0:p.map(f=>f))||[]:((d=r.product.price_tiers)==null?void 0:d.map(f=>f))||[],quantity:r.quantity,sku:Ge(r),topLevelSku:r.product.sku,name:r.product.name,image:me(t,r),price:{value:r.prices.price.value,currency:r.prices.price.currency},taxedPrice:{value:r.prices.price_including_tax.value,currency:r.prices.price_including_tax.currency},fixedProductTaxes:r.prices.fixed_product_taxes,rowTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},rowTotalIncludingTax:{value:r.prices.row_total_including_tax.value,currency:r.prices.row_total_including_tax.currency},links:Oe(r.links),total:{value:(T=r.prices.original_row_total)==null?void 0:T.value,currency:(S=r.prices.original_row_total)==null?void 0:S.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency,label:(h=r.prices.discounts)==null?void 0:h.map(f=>f.label)},regularPrice:ye(r),discounted:Ie(r),bundleOptions:r.__typename==="BundleCartItem"?Ae(r.bundle_options):null,bundleOptionsUIDs:r.__typename==="BundleCartItem"?be(r.bundle_options):null,selectedOptions:(O=Z(r.configurable_options))==null?void 0:O.options,selectedOptionsUIDs:(N=Z(r.configurable_options))==null?void 0:N.uids,customizableOptions:De(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:r.prices.row_total.value,currency:r.prices.row_total.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(C=r.configured_variant)==null?void 0:C.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:o&&r.product.only_x_left_in_stock!=null,insufficientQuantity:!c&&(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!o,outOfStock:!c&&r.product.stock_status==="OUT_OF_STOCK"&&!o,...(m=r.backorder_message)!=null&&m.trim()?{backorderMessage:r.backorder_message.trim()}:{},stockLevel:Ue(r),discountPercentage:$e(r),savingsAmount:Me(r),productAttributes:we(r)}})}function ve(e){switch(+e){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function Se(e){var n;const t=(n=e==null?void 0:e.items)==null?void 0:n.reduce((r,o)=>{var c;return(c=o.errors)==null||c.forEach(i=>{r.push({uid:o.uid,text:i.message})}),r},[]);return t!=null&&t.length?t:null}function J(e){return e!=null&&e.length?e.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label,coupon:t.coupon})):[]}function Ae(e){const t=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(o=>o.label).join(", ")})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function be(e){if(!(e!=null&&e.length))return null;const t=[];return e.forEach(n=>{var r;if((r=n.values)!=null&&r.length){const o=n.values.map(c=>c.uid);t.push(...o)}}),t.length>0?t:null}function Z(e){const t=e==null?void 0:e.map(o=>({uid:o.configurable_product_option_uid,label:o.option_label,value:o.value_label,valueUid:o.configurable_product_option_value_uid})),n={},r={};return t==null||t.forEach(o=>{n[o.label]=o.value,r[o.label]=o.valueUid}),{options:Object.keys(n).length>0?n:null,uids:Object.keys(r).length>0?r:null}}function De(e){const t=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(o=>({uid:o.customizable_option_value_uid,label:o.label,value:o.value}))})),n={};return t==null||t.forEach(r=>{var o;switch(r.type){case"field":case"area":case"date_time":n[r.label]=r.values[0].value;break;case"radio":case"drop_down":n[r.label]=r.values[0].label;break;case"multiple":case"checkbox":n[r.label]=r.values.reduce((c,i)=>c?`${c}, ${i.label}`:i.label,"");break;case"file":{const c=new DOMParser,i=r.values[0].value,l=((o=c.parseFromString(i,"text/html").querySelector("a"))==null?void 0:o.textContent)||"";n[r.label]=l;break}}}),n}function Re(e){var t,n;return((t=_.config)==null?void 0:t.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((n=_.config)==null?void 0:n.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function Oe(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(t=>t.title).join(", ")}:null}function Pe(e){var t,n,r,o;return(t=e.shipping_addresses)!=null&&t.length?(n=e.shipping_addresses)==null?void 0:n.map(c=>({countryCode:c.country.code,zipCode:c.postcode,regionCode:c.region.code})):(r=e.addresses)!=null&&r.length?(o=e.addresses)==null?void 0:o.filter(c=>c.default_shipping).map(c=>{var i;return c.default_shipping&&{countryCode:c.country_code,zipCode:c.postcode,regionCode:(i=c.region)==null?void 0:i.region_code}}):null}function xe(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var o;return(o=r.backorder_message)!=null&&o.trim()?!1:!X(r)})}function Ue(e){return e.not_available_message?e.product.quantity!=null?e.product.quantity:"noNumber":null}function Ne(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var o,c;return!((o=r.backorder_message)!=null&&o.trim())&&!X(r)&&((c=r==null?void 0:r.product)==null?void 0:c.stock_status)==="OUT_OF_STOCK"})}function $e(e){var o,c,i,s,l,a,u,p;const t=e.quantity,n=te(e.product.price_tiers,t);if(n)return Math.round(n.discount.percent_off);let r;if(e.__typename==="ConfigurableCartItem")r=(s=(i=(c=(o=e==null?void 0:e.configured_variant)==null?void 0:o.price_range)==null?void 0:c.maximum_price)==null?void 0:i.discount)==null?void 0:s.percent_off;else{if(e.__typename==="BundleCartItem")return;r=(p=(u=(a=(l=e==null?void 0:e.product)==null?void 0:l.price_range)==null?void 0:a.maximum_price)==null?void 0:u.discount)==null?void 0:p.percent_off}if(r!==0)return Math.round(r)}function Ge(e){var t;return e.__typename==="ConfigurableCartItem"?e.configured_variant.sku:((t=e.product)==null?void 0:t.variantSku)||e.product.sku}function Me(e){var r,o,c,i,s,l;const t=((o=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:o.value)-((i=(c=e==null?void 0:e.prices)==null?void 0:c.row_total)==null?void 0:i.value),n=(l=(s=e==null?void 0:e.prices)==null?void 0:s.row_total)==null?void 0:l.currency;if(t!==0)return{value:t,currency:n}}function we(e){var t,n,r;return(r=(n=(t=e==null?void 0:e.product)==null?void 0:t.custom_attributesV2)==null?void 0:n.items)==null?void 0:r.map(o=>{const c=o.code.split("_").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ");return{...o,code:c}})}function ke(e){var r,o;if(!e)return null;const t=c=>{switch(c){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},n=c=>{switch(+c){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,cartSummaryMaxItems:e.max_items_in_order_summary,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:t(e.shopping_cart_display_subtotal),price:t(e.shopping_cart_display_price),shipping:t(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:n(e==null?void 0:e.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:n(e==null?void 0:e.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:n(e==null?void 0:e.allow_order),allowGiftMessageOnOrderItems:n(e==null?void 0:e.allow_items),allowGiftReceipt:!!+(e==null?void 0:e.allow_gift_receipt),allowPrintedCard:!!+(e==null?void 0:e.allow_printed_card),printedCardPrice:{currency:((r=e==null?void 0:e.printed_card_priceV2)==null?void 0:r.currency)??"",value:((o=e==null?void 0:e.printed_card_priceV2)==null?void 0:o.value)!=null?+e.printed_card_priceV2.value:0},cartGiftWrapping:t(+e.cart_gift_wrapping),cartPrintedCard:t(+e.cart_printed_card)}}const I=e=>{const t=e.findIndex(({extensions:c})=>(c==null?void 0:c.category)==="graphql-authorization")>-1,n=e.findIndex(({path:c,extensions:i})=>(i==null?void 0:i.category)==="graphql-no-such-entity"&&!(c!=null&&c.includes("applyCouponsToCart")))>-1,r=e.map(c=>c.message).join(" "),o=e.findIndex(({path:c,extensions:i})=>(i==null?void 0:i.category)==="graphql-input"&&(c==null?void 0:c.includes("cart")))>-1;if(t||n||o)return ue(),console.error(r),null;throw Error(r)},ne=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
    
  ${b}
`;function w(e){const{cart:t,locale:n="en-US"}=e;return{id:t.id,items:ce(t.items,n),prices:{subtotalExcludingTax:t.subtotal.excludingTax,subtotalIncludingTax:t.subtotal.includingTax},totalQuantity:t.totalUniqueItems,possibleOnepageCheckout:void 0,giftMessageSelected:void 0,giftWrappingSelected:void 0,source:void 0}}function ce(e,t){return e.map(n=>({canApplyMsrp:!1,formattedPrice:Fe(t,n.price.currency,n.price.value),id:n.uid,prices:{price:n.price,discount:n.discount&&n.discount.value!==void 0?{value:n.discount.value,currency:n.discount.currency}:void 0},product:{productId:n.uid,name:n.name,sku:n.sku,topLevelSku:n.topLevelSku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:n.categories,productType:n.itemType,pricing:{regularPrice:n.regularPrice.value,minimalPrice:void 0,maximalPrice:void 0,specialPrice:qe(n),tierPricing:void 0,currencyCode:n.regularPrice.currency},canonicalUrl:n.canonicalUrl,mainImageUrl:n.image.src,image:{src:n.image.src,alt:n.image.alt}},configurableOptions:n.selectedOptions?Object.entries(n.selectedOptions).map(([r,o],c)=>({id:c+1,optionLabel:r,valueId:c+1,valueLabel:o})):[],bundleOptions:n.bundleOptions?Object.entries(n.bundleOptions).map(([r,o],c)=>({id:(c+1).toString(),optionLabel:r,valueId:c+1,valueLabel:o})):[],customizableOptions:n.customizableOptions?Object.entries(n.customizableOptions).map(([r,o],c)=>({id:(c+1).toString(),optionLabel:r,valueId:c+1,valueLabel:o})):[],quantity:n.quantity,selectedOptions:(()=>{const r={...n.selectedOptions,...n.bundleOptions,...n.customizableOptions};return Object.keys(r).length>0?r:void 0})()}))}function Fe(e,t,n){const r=e.replace("_","-");return new Intl.NumberFormat(r,{style:"currency",currency:t}).format(n)}function qe(e){var t;if(e.discounted)return(t=e.price)==null?void 0:t.value}const E={SHOPPING_CART_CONTEXT:"shoppingCartContext",PRODUCT_CONTEXT:"productContext",CHANGED_PRODUCTS_CONTEXT:"changedProductsContext",CHANNEL_CONTEXT:"channelContext"},R={OPEN_CART:"open-cart",ADD_TO_CART:"add-to-cart",REMOVE_FROM_CART:"remove-from-cart",SHOPPING_CART_VIEW:"shopping-cart-view",INITIATE_CHECKOUT:"initiate-checkout"};function W(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function v(e,t){const n=W();n.push({[e]:null}),n.push({[e]:t})}function k(e,t){W().push(r=>{const o=r.getState?r.getState():{};r.push({event:e,eventInfo:{...o,...t}})})}function Le(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function F(){v(E.CHANNEL_CONTEXT,Le())}function ze(e,t,n){const r=w({cart:e,locale:n});F(),v(E.SHOPPING_CART_CONTEXT,{...r});const o=ce(t,n);v(E.CHANGED_PRODUCTS_CONTEXT,{items:o}),k(R.OPEN_CART),o.forEach(c=>{v(E.PRODUCT_CONTEXT,c.product),G(r,[c],R.ADD_TO_CART)})}function Qe(e,t){const n=w({cart:e,locale:t});F(),v(E.SHOPPING_CART_CONTEXT,{...n}),k(R.SHOPPING_CART_VIEW)}function G(e,t,n){const r={items:t};F(),v(E.SHOPPING_CART_CONTEXT,{...e}),v(E.CHANGED_PRODUCTS_CONTEXT,{...r}),k(n)}function U(e,t,n){const r=w({cart:e,locale:n}),o=r.items,c=W(),i=c.getState?c.getState():{},{shoppingCartContext:{items:s=[]}={}}=i;t.forEach(l=>{const a=s.find(p=>p.id===l.uid),u=o.find(p=>p.id===l.uid);!u&&!a||(!a&&u?(v(E.PRODUCT_CONTEXT,u.product),G(r,[u],R.ADD_TO_CART)):a&&!u?(v(E.PRODUCT_CONTEXT,a.product),G(r,[a],R.REMOVE_FROM_CART)):u.quantity>a.quantity?(v(E.PRODUCT_CONTEXT,u.product),G(r,[u],R.ADD_TO_CART)):(v(E.PRODUCT_CONTEXT,u.product),G(r,[u],R.REMOVE_FROM_CART)))})}function Er(e,t){const n=w({cart:e,locale:t});F(),v(E.SHOPPING_CART_CONTEXT,{...n}),k(R.INITIATE_CHECKOUT)}const vr=async e=>{const t=_.cartId||await Je().then(n=>n);return y(ne,{variables:{cartId:t,cartItems:e.map(({sku:n,parentSku:r,quantity:o,optionsUIDs:c,enteredOptions:i,customFields:s})=>({sku:n,parent_sku:r,quantity:o,selected_options:c,entered_options:i,...s||{}}))}}).then(({errors:n,data:r})=>{var l;const o=[...((l=r==null?void 0:r.addProductsToCart)==null?void 0:l.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.addProductsToCart.cart),i=V(),s=(i==null?void 0:i.items)||[];if(g.emit("cart/updated",c),g.emit("cart/data",c),c){const a=c.items.filter(p=>!s.some(d=>d.sku===p.sku)),u=c.items.filter(p=>{const d=s.find(T=>T.sku===p.sku);return d&&p.quantity!==d.quantity});a.length>0&&g.emit("cart/product/added",a),u.length>0&&g.emit("cart/product/updated",u)}if(c){const a=c.items.filter(d=>e.some(({sku:T})=>T.toUpperCase()===d.topLevelSku.toUpperCase())),u=!i||(i.totalQuantity??0)===0,p=(c.totalQuantity??0)>0;u&&p?ze(c,a,_.locale??"en-US"):U(c,a,_.locale??"en-US")}return c})},Ve=`
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
`,He=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {

    cart(cart_id: $cartId){
      ...CART_FRAGMENT
    }
  }

  ${b}
`,Xe=`
  query CUSTOMER_CART_QUERY(
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
     
    customer {
      ...CUSTOMER_FRAGMENT
    }

    cart: customerCart {
      ...CART_FRAGMENT
    }
  }

  ${Ve}
  ${b}
`,z=async()=>{const e=_.authenticated,t=_.cartId;if(e)return y(Xe,{method:"POST"}).then(({errors:n,data:r})=>{if(n)return I(n);const o={...r.cart,...r.customer};return A(o)});if(!t)throw new Error("No cart ID found");return y(He,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:r})=>n?I(n):A(r.cart))},We=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
      mergeCarts(
        source_cart_id: $guestCartId,
        destination_cart_id: $customerCartId
      ) {
        ...CART_FRAGMENT 
      }
  }

  ${b}
`,q=async()=>{if(_.initializing)return null;_.initializing=!0,_.config||(_.config=await er());const e=_.authenticated?await oe():await ie();return g.emit("cart/initialized",e),g.emit("cart/data",e),_.initializing=!1,e};async function oe(){const e=_.cartId,t=await z();return t?(_.cartId=t.id,!e||t.id===e?t:await y(We,{variables:{guestCartId:e,customerCartId:t.id}}).then(()=>z()).then(n=>{const r={oldCartItems:t.items,newCart:n};return g.emit("cart/merged",r),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function ie(){if(H.getConfig().disableGuestCart===!0||!_.cartId)return null;try{return await z()}catch(e){return console.error(e),null}}const Be=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CART_FRAGMENT
      }

    }
  }

  ${b}
`,se=(e,t)=>{const n=[];return e.filter(r=>r.errors&&t.some(o=>o===r.uid)).forEach(r=>{var o;(o=r.errors)==null||o.forEach(c=>{n.push({message:c.message,path:[r.uid],extensions:{category:c.code}})})}),n},je=(e,t)=>{const n=[],r=[],o=[];return e.forEach(c=>{const i=t.find(s=>s.uid===c.uid);if(i)if(c.optionsUIDs){const s=Object.values((i==null?void 0:i.selectedOptionsUIDs)??{});if(c.optionsUIDs.every(a=>s.includes(a))&&c.optionsUIDs.length===s.length)o.push({uid:c.uid,quantity:c.quantity,giftOptions:c.giftOptions,customFields:c.customFields});else{const a=t.find(u=>{const p=Object.values((u==null?void 0:u.selectedOptionsUIDs)??{});return u.uid!==c.uid&&u.sku===i.sku&&c.optionsUIDs.every(d=>p.includes(d))&&c.optionsUIDs.length===p.length});if(a)o.push({uid:a.uid,quantity:a.quantity+c.quantity,giftOptions:c.giftOptions,customFields:c.customFields}),r.push(c.uid);else{const{sku:u,topLevelSku:p}=i,{optionsUIDs:d,enteredOptions:T,quantity:S,customFields:h}=c;n.push({sku:u,parentSku:p,quantity:S,optionsUIDs:d,enteredOptions:T,customFields:h}),r.push(c.uid)}}}else if(c.customFields){const{sku:s,topLevelSku:l}=i,{optionsUIDs:a,enteredOptions:u,quantity:p,customFields:d}=c;n.push({sku:s,parentSku:l,quantity:p,optionsUIDs:a,enteredOptions:u,customFields:d}),r.push(c.uid)}else o.push({uid:c.uid,quantity:c.quantity,giftOptions:c.giftOptions,customFields:c.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${c.uid}`)}),{itemsToAdd:n,itemsToRemove:r,itemsToUpdate:o}},Ye=0,Sr=async e=>{const t=_.cartId,n=V();if(!t)return Promise.reject(new Error("Cart ID is not set"));if(!n)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:r,itemsToRemove:o,itemsToUpdate:c}=je(e,n.items),i=[];return r.length>0&&i.push(y(ne,{variables:{cartId:t,cartItems:r.map(({parentSku:s,quantity:l,optionsUIDs:a,enteredOptions:u,customFields:p})=>({sku:s,quantity:l,selected_options:a,entered_options:u,...p||{}}))}}).then(({errors:s,data:l})=>{var p,d,T,S;const a=se(((d=(p=l==null?void 0:l.addProductsToCart)==null?void 0:p.cart)==null?void 0:d.itemsV2.items)||[],e.map(h=>h.uid)),u=[...((T=l==null?void 0:l.addProductsToCart)==null?void 0:T.user_errors)??[],...s??[],...a];return u.length>0?I(u):o.length>0?ee(t,o.map(h=>({uid:h,quantity:Ye}))).catch(h=>Promise.reject(new Error(`Failed to update products in cart: ${h}`))):Promise.resolve(A((S=l==null?void 0:l.addProductsToCart)==null?void 0:S.cart))}).then(s=>(g.emit("cart/updated",s),g.emit("cart/data",s),U(s,e,_.locale??"en-US"),Promise.resolve(s))).catch(s=>Promise.reject(new Error(`Failed to add products to cart: ${s}`)))),c.length>0&&i.push(ee(t,c).catch(s=>Promise.reject(new Error(s)))),Promise.all(i).then(s=>s[s.length-1])},ee=async(e,t)=>y(Be,{variables:{cartId:e,cartItems:t.map(({uid:n,quantity:r,giftOptions:o})=>({cart_item_uid:n,quantity:r,...o}))}}).then(({errors:n,data:r})=>{var s,l,a;const o=se(((l=(s=r==null?void 0:r.updateCartItems)==null?void 0:s.cart)==null?void 0:l.itemsV2.items)||[],t.map(u=>u.uid)),c=[...((a=r==null?void 0:r.updateCartItems)==null?void 0:a.user_errors)??[],...n??[],...o],i=(r==null?void 0:r.updateCartItems)&&A(r.updateCartItems.cart);if(i&&g.emit("cart/data",i),c.length>0)return I(c);if(g.emit("cart/updated",i),i){const u=i.items.filter(p=>t.some(d=>d.uid===p.uid));g.emit("cart/product/updated",u)}return i&&U(i,t,_.locale??"en-US"),i}),ue=()=>(_.cartId=null,_.authenticated=!1,Promise.resolve(null)),Q=async()=>{const e=_.authenticated?await oe():await ie();return g.emit("cart/data",e),e},Ar=async e=>(_.authenticated=!1,_.cartId=e,Q()),Ke=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,Je=async()=>{const{disableGuestCart:e}=H.getConfig();if(e)throw new Error("Guest cart is disabled");return await y(Ke).then(({data:t})=>{const n=t.createGuestCart.cart.id;return _.cartId=n,n})},Ze=`
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
`,er=async()=>y(Ze,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?I(e):ke(t.storeConfig)),rr=e=>{var t,n;return{countryCode:e.country_code||"US",postCode:e.postcode||"",region:((t=e.region)==null?void 0:t.region)||"",regionId:(n=e.region)==null?void 0:n.id}},tr=e=>e?{carrierCode:e.carrier_code||"",methodCode:e.method_code||"",amount:e.amount,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}:null,nr=`
query COUNTRIES_QUERY {
  countries {
    label: full_name_locale
    id
  }
  storeConfig {
    defaultCountry: default_country
  }
}
`,cr=`
query REGIONS_QUERY($id: String) {
  country(id: $id) {
    available_regions {
      code
			name
    }
  }
}
`,or=`
  mutation ESTIMATE_SHIPPING_METHODS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!
  ) {
    estimateShippingMethods(
      input: {
        cart_id: $cartId
        address: $address
      }
    ) {
      amount {
        currency
        value
      }
      carrier_code
      method_code
      error_message
      price_excl_tax {
        currency
        value
      }
      price_incl_tax {
        currency
        value
      }
    }
  }
`,br=async e=>{const t=_.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:o}=e,c={country_code:n||"US",postcode:r||"",region:{region:(o==null?void 0:o.region)||"",region_id:o==null?void 0:o.id}};return y(or,{variables:{cartId:t,address:c}}).then(({errors:i,data:s})=>{if(i)return I(i);const a=s.estimateShippingMethods.find(u=>!u.error_message)||null;return g.emit("shipping/estimate",{address:rr(c),shippingMethod:tr(a)}),a})},Dr=async()=>y(nr,{method:"GET"}).then(({errors:e,data:t})=>{var o,c;if(e)return I(e);const n=((o=t==null?void 0:t.countries)==null?void 0:o.sort((i,s)=>i.label.localeCompare(s.label)))||[],r=((c=t==null?void 0:t.storeConfig)==null?void 0:c.defaultCountry)||"US";return n.forEach(i=>{i.isDefaultCountry=i.id===r}),n}),Rr=async e=>y(cr,{method:"GET",variables:{id:e}}).then(({errors:t,data:n})=>{var r;return t?I(t):((r=n==null?void 0:n.country)==null?void 0:r.available_regions)||[]}),ir=`
  mutation GET_ESTIMATED_TOTALS_MUTATION(
    $cartId: String!
    $address: EstimateAddressInput!,
    $shipping_method: ShippingMethodInput,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
    estimateTotals(
      input: {
        cart_id: $cartId
        address: $address
        shipping_method: $shipping_method
      }
    )  {
      cart {
       ...CART_FRAGMENT
      }
    }
    }

  ${b}
  `,Or=async e=>{var s,l;const t=_.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:o}=e,c=(s=e.shipping_method)==null?void 0:s.carrier_code,i=(l=e.shipping_method)==null?void 0:l.method_code;return y(ir,{variables:{cartId:t,address:{country_code:n||"US",postcode:r,region:(o==null?void 0:o.id)!==void 0?{region_id:o.id}:{region:(o==null?void 0:o.region)??""}},shipping_method:{carrier_code:c||"",method_code:i||""}}}).then(({errors:a,data:u})=>{if(a)return I(a);const p=u.estimateTotals;return p?A(p.cart):null})},sr=`
mutation APPLY_COUPONS_TO_CART_MUTATION(
    $cartId: String!, 
    $couponCodes: [String!]!, 
    $type: ApplyCouponsStrategy!,
    $pageSize: Int! = 100,
    $currentPage: Int! = 1,
    $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
   applyCouponsToCart(
    input: {
      cart_id: $cartId
      coupon_codes: $couponCodes 
      type: $type
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }

  }
}
${b}
`;var ur=(e=>(e.APPEND="APPEND",e.REPLACE="REPLACE",e))(ur||{});const Pr=async(e,t)=>{const n=_.cartId;if(!n)throw Error("Cart ID is not set");return y(sr,{variables:{cartId:n,couponCodes:e,type:t}}).then(({errors:r,data:o})=>{var s;const c=[...((s=o==null?void 0:o.applyCouponsToCart)==null?void 0:s.user_errors)??[],...r??[]];if(c.length>0)return I(c);const i=A(o.applyCouponsToCart.cart);return g.emit("cart/updated",i),g.emit("cart/data",i),i})},xr=()=>{const e=_.locale??"en-US",t=V();t&&Qe(t,e)},ar=`
  mutation APPLY_GIFT_CARD_ON_CART_MUTATION(
      $cartId: String!, 
      $giftCardCode: String!,
      $pageSize: Int! = 100,
      $currentPage: Int! = 1,
      $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
 applyGiftCardToCart(
    input: {
     cart_id: $cartId
     gift_card_code: $giftCardCode
    }
  ) {
    cart {
      ...CART_FRAGMENT
    }
  }
}
${b}
`,Ur=async e=>{const t=_.cartId;if(!t)throw Error("Cart ID is not set");return y(ar,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const o=[...((i=r==null?void 0:r.applyGiftCardToCart)==null?void 0:i.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.applyGiftCardToCart.cart);return g.emit("cart/updated",c),g.emit("cart/data",c),c&&U(c,[],_.locale??"en-US"),c})},lr=`
  mutation REMOVE_GIFT_CARD_ON_CART_MUTATION(
  $cartId: String!, 
  $giftCardCode: String!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
     removeGiftCardFromCart(
        input: {
         cart_id: $cartId
         gift_card_code: $giftCardCode
        }
      ) {
        cart {
          ...CART_FRAGMENT
        }
      }
}
${b}
`,Nr=async e=>{const t=_.cartId;if(!t)throw Error("Cart ID is not set");return y(lr,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const o=[...((i=r==null?void 0:r.addProductsToCart)==null?void 0:i.user_errors)??[],...n??[]];if(o.length>0)return I(o);const c=A(r.removeGiftCardFromCart.cart);return g.emit("cart/updated",c),g.emit("cart/data",c),c&&U(c,[],_.locale??"en-US"),c})},_r=`
  mutation SET_GIFT_OPTIONS_ON_CART_MUTATION(
  $cartId: String!, 
  $giftMessage: GiftMessageInput, 
  $giftWrappingId: ID, 
  $giftReceiptIncluded: Boolean!, 
  $printedCardIncluded: Boolean!,   
  $pageSize: Int! = 100,
  $currentPage: Int! = 1,
  $itemsSortInput: QuoteItemsSortInput! = {field: CREATED_AT, order: DESC}
  ) {
     setGiftOptionsOnCart(
        input: {
         cart_id: $cartId
         gift_message: $giftMessage
         gift_wrapping_id: $giftWrappingId
         gift_receipt_included: $giftReceiptIncluded
         printed_card_included: $printedCardIncluded
        }
      ) {
        cart {
          ...CART_FRAGMENT
        }
      }
}
${b}
`,$r=async e=>{const t=_.cartId;if(!t)throw Error("Cart ID is not set");const{recipientName:n,senderName:r,message:o,giftReceiptIncluded:c,printedCardIncluded:i,giftWrappingId:s,isGiftWrappingSelected:l}=e;return y(_r,{variables:{cartId:t,giftMessage:{from:r,to:n,message:o},giftWrappingId:l?s:null,giftReceiptIncluded:c,printedCardIncluded:i}}).then(({errors:a,data:u})=>{var T;const p=[...((T=u==null?void 0:u.addProductsToCart)==null?void 0:T.user_errors)??[],...a??[]];if(p.length>0)return I(p);const d=A(u.setGiftOptionsOnCart.cart);return g.emit("cart/updated",d),g.emit("cart/data",d),d&&U(d,[],_.locale??"en-US"),d})};export{ur as ApplyCouponsStrategy,Cr as a,vr as addProductsToCart,Pr as applyCouponsToCart,Ur as applyGiftCardToCart,H as config,Je as createGuestCart,y as fetchGraphQl,z as getCartData,V as getCartDataFromCache,hr as getConfig,Dr as getCountries,oe as getCustomerCartPayload,br as getEstimateShipping,Or as getEstimatedTotals,ie as getGuestCartPayload,Rr as getRegions,er as getStoreConfig,re as initialize,q as initializeCart,Er as p,xr as publishShoppingCartViewEvent,Q as refreshCart,yr as removeFetchGraphQlHeader,Nr as removeGiftCardFromCart,ue as resetCart,_ as s,Ar as setCartId,Tr as setEndpoint,mr as setFetchGraphQlHeader,Ir as setFetchGraphQlHeaders,$r as setGiftOptionsOnCart,Sr as updateProductsFromCart};
//# sourceMappingURL=api.js.map
