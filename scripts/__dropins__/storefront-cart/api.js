/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as f}from"@dropins/tools/event-bus.js";import{Initializer as ve,merge as Ae}from"@dropins/tools/lib.js";import{CART_FRAGMENT as R}from"./fragments.js";import{FetchGraphQL as be}from"@dropins/tools/fetch-graphql.js";function Se(e){const t=document.cookie.split(";");for(let n=0;n<t.length;n++){const r=t[n].trim();if(r.indexOf(`${e}=`)===0)return r.substring(e.length+1)}return null}const H="DROPIN__CART__CART__AUTHENTICATED";function Re(e){e?sessionStorage.setItem("DROPIN__CART__CART__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__CART__DATA")}function w(){const e=sessionStorage.getItem("DROPIN__CART__CART__DATA");return e?JSON.parse(e):null}function Fr(e){e?sessionStorage.setItem("DROPIN__CART__SHIPPING__DATA",JSON.stringify(e)):sessionStorage.removeItem("DROPIN__CART__SHIPPING__DATA")}function De(e){e?localStorage.setItem(H,"true"):localStorage.removeItem(H)}function Oe(){return localStorage.getItem(H)==="true"}const Ne={cartId:null,authenticated:Oe()},p=new Proxy(Ne,{set(e,t,n){var r;if(e[t]=n,t==="cartId"){if(n===p.cartId)return!0;if(n===null)return document.cookie="DROPIN__CART__CART-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const c=(r=p.config)==null?void 0:r.cartExpiresInDays;c||console.warn('Missing "expiresInDays" config. Cookie expiration will default to 30 days.');const o=new Date;o.setDate(o.getDate()+(c??30)),document.cookie=`DROPIN__CART__CART-ID=${n}; expires=${o.toUTCString()}; path=/`}return t==="authenticated"&&De(n),!0},get(e,t){return t==="cartId"?Se("DROPIN__CART__CART-ID"):e[t]}}),pe=new ve({init:async e=>{const t={disableGuestCart:!1,...e};pe.config.setConfig(t),V().catch(console.error)},listeners:()=>[f.on("authenticated",e=>{p.authenticated&&!e?f.emit("cart/reset",void 0):e&&!p.authenticated&&(p.authenticated=e,V().catch(console.error))},{eager:!0}),f.on("locale",async e=>{e!==p.locale&&(p.locale=e,V().catch(console.error))}),f.on("cart/reset",()=>{ye().catch(console.error),f.emit("cart/data",null)}),f.on("cart/data",e=>{Re(e)}),f.on("checkout/updated",e=>{!e||(e==null?void 0:e.type)==="quote"||_e().catch(console.error)}),f.on("requisitionList/alert",()=>{_e().catch(console.error)})]}),Y=pe.config,{setEndpoint:Mr,setFetchGraphQlHeader:kr,removeFetchGraphQlHeader:Lr,setFetchGraphQlHeaders:qr,fetchGraphQl:m,getConfig:wr}=new be().getMethods();function Pe(e){const t=[];for(const n of e??[]){const r=String((n==null?void 0:n.uid)??"");if(!r)continue;const c=((n==null?void 0:n.options)??[]).filter(Boolean).map(o=>{var i,u;return{uid:String(o.uid??""),label:String(o.label??((i=o.product)==null?void 0:i.name)??((u=o.product)==null?void 0:u.sku)??""),isDefault:!!o.is_default}}).filter(o=>o.uid.length>0);c.length&&t.push({uid:r,title:String(n.title??""),required:!!n.required,position:typeof n.position=="number"?n.position:void 0,values:c})}return t}function Ue(e){var r,c;const t=(r=e==null?void 0:e.configurable_options)!=null&&r.length?e.configurable_options.map(o=>({uid:o.uid,attributeUid:o.attribute_uid??o.uid??"",label:o.label??"",values:(o.values??[]).map(i=>({uid:i.uid??"",label:i.label??""}))})):void 0,n=(c=e==null?void 0:e.items)!=null&&c.length&&Array.isArray(e.items)?Pe(e.items):void 0;return{sku:(e==null?void 0:e.sku)??"",parentSku:(e==null?void 0:e.parent_sku)??(e==null?void 0:e.parentSku)??void 0,name:(e==null?void 0:e.name)??(e==null?void 0:e.sku)??"",typeName:e==null?void 0:e.__typename,thumbnail:e!=null&&e.thumbnail?{url:e.thumbnail.url,label:e.thumbnail.label}:null,configurableOptions:t,bundleItems:n!=null&&n.length?n:void 0}}function X(e){return e!=null&&e.length?e.map(t=>({ruleId:t.rule_id,ruleLabel:t.rule_label!=null&&String(t.rule_label).trim()!==""?String(t.rule_label).trim():void 0,giftQty:t.gift_qty??1,availableSkus:t.available_skus??[],products:(t.products??[]).map(Ue)})):[]}function j(e){return typeof e.is_salable=="boolean"?e.is_salable:typeof e.is_available=="boolean"?e.is_available:!0}function S(e){var n,r,c,o,i,u,l,_,s,a,d,T,E,y,v,P;if(!e)return null;const t={appliedGiftCards:((n=e==null?void 0:e.applied_gift_cards)==null?void 0:n.map(g=>{var $,F,M;const h={code:g.code??"",appliedBalance:{value:g.applied_balance.value??0,currency:g.applied_balance.currency??"USD"},currentBalance:{value:g.current_balance.value??0,currency:g.current_balance.currency??"USD"},expirationDate:g.expiration_date??""},D=($=h==null?void 0:h.currentBalance)==null?void 0:$.value,O=(F=h==null?void 0:h.appliedBalance)==null?void 0:F.value,U=(M=h==null?void 0:h.currentBalance)==null?void 0:M.currency,L=D-O>0?D-O:0;return{...h,giftCardBalance:{value:L,currency:U}}}))??[],id:e.id,totalQuantity:He(e),totalUniqueItems:e.itemsV2.items.length,totalGiftOptions:xe((r=e==null?void 0:e.prices)==null?void 0:r.gift_options),giftReceiptIncluded:(e==null?void 0:e.gift_receipt_included)??!1,printedCardIncluded:(e==null?void 0:e.printed_card_included)??!1,cartGiftWrapping:((c=e==null?void 0:e.available_gift_wrappings)==null?void 0:c.map(g=>{var h,D,O,U,G;return{design:g.design??"",uid:g.uid,selected:((h=e==null?void 0:e.gift_wrapping)==null?void 0:h.uid)===g.uid,image:{url:((D=g==null?void 0:g.image)==null?void 0:D.url)??"",label:((O=g.image)==null?void 0:O.label)??""},price:{currency:((U=g==null?void 0:g.price)==null?void 0:U.currency)??"USD",value:((G=g==null?void 0:g.price)==null?void 0:G.value)??0}}}))??[],giftMessage:{senderName:((o=e==null?void 0:e.gift_message)==null?void 0:o.from)??"",recipientName:((i=e==null?void 0:e.gift_message)==null?void 0:i.to)??"",message:((u=e==null?void 0:e.gift_message)==null?void 0:u.message)??""},errors:we(e==null?void 0:e.itemsV2),items:ue(e==null?void 0:e.itemsV2),miniCartMaxItems:ue(e==null?void 0:e.itemsV2).slice(0,((l=p.config)==null?void 0:l.miniCartMaxItemsDisplay)??10),total:{includingTax:{value:e.prices.grand_total.value,currency:e.prices.grand_total.currency},excludingTax:{value:e.prices.grand_total_excluding_tax.value,currency:e.prices.grand_total_excluding_tax.currency}},discount:ie(e.prices.discounts,e.prices.grand_total.currency),subtotal:{excludingTax:{value:(_=e.prices.subtotal_excluding_tax)==null?void 0:_.value,currency:(s=e.prices.subtotal_excluding_tax)==null?void 0:s.currency},includingTax:{value:(a=e.prices.subtotal_including_tax)==null?void 0:a.value,currency:(d=e.prices.subtotal_including_tax)==null?void 0:d.currency},includingDiscountOnly:{value:(T=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:T.value,currency:(E=e.prices.subtotal_with_discount_excluding_tax)==null?void 0:E.currency}},appliedTaxes:se(e.prices.applied_taxes),totalTax:ie(e.prices.applied_taxes,e.prices.grand_total.currency),appliedDiscounts:se(e.prices.discounts),isVirtual:e.is_virtual,addresses:{shipping:e.shipping_addresses&&We(e)},isGuestCart:!p.authenticated,hasOutOfStockItems:Ye(e),hasFullyOutOfStockItems:Ke(e),appliedCoupons:e.applied_coupons,hasAvailableFreeGifts:!!(e!=null&&e.has_available_free_gifts),availableFreeGifts:X(e==null?void 0:e.available_free_gifts)};return Ae(t,(P=(v=(y=Y.getConfig().models)==null?void 0:y.CartModel)==null?void 0:v.transformer)==null?void 0:P.call(v,e))}function xe(e){var t,n,r,c,o,i,u,l,_,s,a,d;return{giftWrappingForItems:{value:((t=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:t.value)??0,currency:((n=e==null?void 0:e.gift_wrapping_for_items)==null?void 0:n.currency)??"USD"},giftWrappingForItemsInclTax:{value:((r=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:r.value)??0,currency:((c=e==null?void 0:e.gift_wrapping_for_items_incl_tax)==null?void 0:c.currency)??"USD"},giftWrappingForOrder:{value:((o=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:o.value)??0,currency:((i=e==null?void 0:e.gift_wrapping_for_order)==null?void 0:i.currency)??"USD"},giftWrappingForOrderInclTax:{value:((u=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:u.value)??0,currency:((l=e==null?void 0:e.gift_wrapping_for_order_incl_tax)==null?void 0:l.currency)??"USD"},printedCard:{value:((_=e==null?void 0:e.printed_card)==null?void 0:_.value)??0,currency:((s=e==null?void 0:e.printed_card)==null?void 0:s.currency)??"USD"},printedCardInclTax:{value:((a=e==null?void 0:e.printed_card_incl_tax)==null?void 0:a.value)??0,currency:((d=e==null?void 0:e.printed_card_incl_tax)==null?void 0:d.currency)??"USD"}}}function ie(e,t){return e!=null&&e.length?e.reduce((n,r)=>({value:n.value+r.amount.value,currency:r.amount.currency}),{value:0,currency:t}):{value:0,currency:t}}function Ge(e,t){var n,r,c,o;return{src:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.url:((r=(n=t.configured_variant)==null?void 0:n.thumbnail)==null?void 0:r.url)||t.product.thumbnail.url,alt:e!=null&&e.useConfigurableParentThumbnail?t.product.thumbnail.label:((o=(c=t.configured_variant)==null?void 0:c.thumbnail)==null?void 0:o.label)||t.product.thumbnail.label}}function $e(e){var t,n,r,c;return e.__typename==="ConfigurableCartItem"?{value:(n=(t=e.configured_variant)==null?void 0:t.price_range)==null?void 0:n.maximum_price.regular_price.value,currency:(c=(r=e.configured_variant)==null?void 0:r.price_range)==null?void 0:c.maximum_price.regular_price.currency}:e.__typename==="GiftCardCartItem"?{value:e.prices.price.value,currency:e.prices.price.currency}:{value:e.prices.original_item_price.value,currency:e.prices.original_item_price.currency}}function de(e,t){return e!=null&&e.length&&[...e].sort((r,c)=>c.quantity-r.quantity).find(r=>t>=r.quantity)||null}function Fe(e){var i,u;const t=e.quantity,n=e.__typename==="ConfigurableCartItem",r=n?(i=e.configured_variant)==null?void 0:i.price_tiers:e.product.price_tiers,c=n?(u=e.configured_variant)==null?void 0:u.price_range:e.product.price_range,o=de(r,t);return o?o.discount.amount_off>0:(c==null?void 0:c.maximum_price.discount.amount_off)>0}function Me(e){var t,n,r;return{senderName:((t=e==null?void 0:e.gift_message)==null?void 0:t.from)??"",recipientName:((n=e==null?void 0:e.gift_message)==null?void 0:n.to)??"",message:((r=e==null?void 0:e.gift_message)==null?void 0:r.message)??""}}function ke(e){return{currency:(e==null?void 0:e.currency)??"USD",value:(e==null?void 0:e.value)??0}}function Le(e){var r,c;const t=(r=e==null?void 0:e.product)==null?void 0:r.discounts;if(Array.isArray(t)&&t.length>0)return t;const n=(c=e==null?void 0:e.prices)==null?void 0:c.discounts;if(Array.isArray(n)&&n.length>0)return n}function fe(e){if(!(e!=null&&e.is_free_gift))return!1;const t=Le(e);return Array.isArray(t)&&t.length>0}function q(e,t,n="unit"){var c,o;const r=t.currency??"USD";if(!(e!=null&&e.is_free_gift))return{value:t.value,currency:t.currency??"USD"};if(fe(e)){if(n==="unit")return{value:Number(t.value??0),currency:r};const i=Number(t.value??0),u=Number(((o=(c=e.prices)==null?void 0:c.original_row_total)==null?void 0:o.value)??NaN);return Number.isFinite(u)&&i===u?{value:0,currency:r}:{value:i,currency:r}}return{value:0,currency:r}}function ue(e){var n;if(!((n=e==null?void 0:e.items)!=null&&n.length))return[];const t=p.config;return e.items.map(r=>{var _,s,a,d,T,E,y,v,P,g,h,D,O,U,G,L,$,F,M,J,Z,ee;const c=!!(r!=null&&r.is_free_gift)&&fe(r)&&Number(((s=(_=r.prices)==null?void 0:_.row_total)==null?void 0:s.value)??NaN)===Number(((d=(a=r.prices)==null?void 0:a.original_row_total)==null?void 0:d.value)??NaN),o=q(r,r.prices.row_total,"line"),i=c?{value:0,currency:((T=r.prices.row_total_including_tax)==null?void 0:T.currency)??((E=r.prices.row_total)==null?void 0:E.currency)??"USD"}:q(r,r.prices.row_total_including_tax,"line"),u=j(r),l=!!((y=r.backorder_message)!=null&&y.trim());return{giftWrappingAvailable:((v=r==null?void 0:r.product)==null?void 0:v.gift_wrapping_available)??!1,giftWrappingPrice:ke((P=r==null?void 0:r.product)==null?void 0:P.gift_wrapping_price),giftMessage:Me(r),productGiftWrapping:((g=r==null?void 0:r.available_gift_wrapping)==null?void 0:g.map(C=>{var re,te,ne,oe,ce;return{design:C.design??"",uid:C.uid,selected:((re=r.gift_wrapping)==null?void 0:re.uid)===C.uid,image:{url:((te=C==null?void 0:C.image)==null?void 0:te.url)??"",label:((ne=C.image)==null?void 0:ne.label)??""},price:{currency:((oe=C==null?void 0:C.price)==null?void 0:oe.currency)??"USD",value:((ce=C==null?void 0:C.price)==null?void 0:ce.value)??0}}}))??[],itemType:r.__typename,uid:r.uid,giftMessageAvailable:qe(r.product.gift_message_available),url:{urlKey:r.product.url_key,categories:r.product.categories.map(C=>C.url_key)},canonicalUrl:r.product.canonical_url,categories:r.product.categories.map(C=>C.name),priceTiers:r.__typename==="ConfigurableCartItem"?((D=(h=r.configured_variant)==null?void 0:h.price_tiers)==null?void 0:D.map(C=>C))||[]:((O=r.product.price_tiers)==null?void 0:O.map(C=>C))||[],quantity:r.quantity,sku:Ze(r),topLevelSku:r.product.sku,name:r.product.name,image:Ge(t,r),price:q(r,r.prices.price,"unit"),taxedPrice:q(r,r.prices.price_including_tax,"unit"),fixedProductTaxes:r.prices.fixed_product_taxes,rowTotal:o,rowTotalIncludingTax:i,links:Xe(r.links),total:{value:(U=r.prices.original_row_total)==null?void 0:U.value,currency:(G=r.prices.original_row_total)==null?void 0:G.currency},discount:{value:r.prices.total_item_discount.value,currency:r.prices.total_item_discount.currency,label:(L=r.prices.discounts)==null?void 0:L.map(C=>C.label)},regularPrice:$e(r),originalItemPrice:{value:($=r.prices.original_item_price)==null?void 0:$.value,currency:(F=r.prices.original_item_price)==null?void 0:F.currency},discounted:Fe(r),isFreeGift:!!r.is_free_gift,bundleOptions:r.__typename==="BundleCartItem"?ze(r.bundle_options):null,bundleOptionsUIDs:r.__typename==="BundleCartItem"?Qe(r.bundle_options):null,selectedOptions:(M=le(r.configurable_options))==null?void 0:M.options,selectedOptionsUIDs:(J=le(r.configurable_options))==null?void 0:J.uids,customizableOptions:Ve(r.customizable_options),customizableOptionEntries:Be(r.customizable_options),sender:r.__typename==="GiftCardCartItem"?r.sender_name:null,senderEmail:r.__typename==="GiftCardCartItem"?r.sender_email:null,recipient:r.__typename==="GiftCardCartItem"?r.recipient_name:null,recipientEmail:r.__typename==="GiftCardCartItem"?r.recipient_email:null,message:r.__typename==="GiftCardCartItem"?r.message:null,discountedTotal:{value:o.value,currency:o.currency},onlyXLeftInStock:r.__typename==="ConfigurableCartItem"?(Z=r.configured_variant)==null?void 0:Z.only_x_left_in_stock:r.product.only_x_left_in_stock,lowInventory:u&&r.product.only_x_left_in_stock!=null,insufficientQuantity:!l&&(r.__typename==="ConfigurableCartItem"?r.configured_variant:r.product).stock_status==="IN_STOCK"&&!u,outOfStock:!l&&r.product.stock_status==="OUT_OF_STOCK"&&!u,...(ee=r.backorder_message)!=null&&ee.trim()?{backorderMessage:r.backorder_message.trim()}:{},stockLevel:je(r),discountPercentage:Je(r),savingsAmount:er(r),productAttributes:rr(r)}})}function qe(e){switch(+e){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}}function we(e){var n;const t=(n=e==null?void 0:e.items)==null?void 0:n.reduce((r,c)=>{var o;return(o=c.errors)==null||o.forEach(i=>{r.push({uid:c.uid,text:i.message})}),r},[]);return t!=null&&t.length?t:null}function se(e){return e!=null&&e.length?e.map(t=>({amount:{value:t.amount.value,currency:t.amount.currency},label:t.label,coupon:t.coupon})):[]}function ze(e){const t=e==null?void 0:e.map(r=>({uid:r.uid,label:r.label,value:r.values.map(c=>c.label).join(", ")})),n={};return t==null||t.forEach(r=>{n[r.label]=r.value}),Object.keys(n).length>0?n:null}function Qe(e){if(!(e!=null&&e.length))return null;const t=[];return e.forEach(n=>{var r;if((r=n.values)!=null&&r.length){const c=n.values.map(o=>o.uid);t.push(...c)}}),t.length>0?t:null}function le(e){const t=e==null?void 0:e.map(c=>({uid:c.configurable_product_option_uid,label:c.option_label,value:c.value_label,valueUid:c.configurable_product_option_value_uid})),n={},r={};return t==null||t.forEach(c=>{n[c.label]=c.value,r[c.label]=c.valueUid}),{options:Object.keys(n).length>0?n:null,uids:Object.keys(r).length>0?r:null}}function Be(e){if(e!=null&&e.length)return e.map(t=>({uid:t.customizable_option_uid,label:t.label,type:t.type,values:(t.values??[]).map(n=>({uid:n.customizable_option_value_uid,label:n.label,value:n.value}))}))}function Ve(e){const t=e==null?void 0:e.map(r=>({uid:r.customizable_option_uid,label:r.label,type:r.type,values:r.values.map(c=>({uid:c.customizable_option_value_uid,label:c.label,value:c.value}))})),n={};return t==null||t.forEach(r=>{var c;switch(r.type){case"field":case"area":case"date_time":n[r.label]=r.values[0].value;break;case"radio":case"drop_down":n[r.label]=r.values[0].label;break;case"multiple":case"checkbox":n[r.label]=r.values.reduce((o,i)=>o?`${o}, ${i.label}`:i.label,"");break;case"file":{const o=new DOMParser,i=r.values[0].value,l=((c=o.parseFromString(i,"text/html").querySelector("a"))==null?void 0:c.textContent)||"";n[r.label]=l;break}}}),n}function He(e){var t,n;return((t=p.config)==null?void 0:t.cartSummaryDisplayTotal)===0?e.itemsV2.items.length:((n=p.config)==null?void 0:n.cartSummaryDisplayTotal)===1?e.total_quantity:e.itemsV2.items.length}function Xe(e){return(e==null?void 0:e.length)>0?{count:e.length,result:e.map(t=>t.title).join(", ")}:null}function We(e){var t,n,r,c;return(t=e.shipping_addresses)!=null&&t.length?(n=e.shipping_addresses)==null?void 0:n.map(o=>({countryCode:o.country.code,zipCode:o.postcode,regionCode:o.region.code})):(r=e.addresses)!=null&&r.length?(c=e.addresses)==null?void 0:c.filter(o=>o.default_shipping).map(o=>{var i;return o.default_shipping&&{countryCode:o.country_code,zipCode:o.postcode,regionCode:(i=o.region)==null?void 0:i.region_code}}):null}function Ye(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c;return(c=r.backorder_message)!=null&&c.trim()?!1:!j(r)})}function je(e){return e.not_available_message?e.product.quantity!=null?e.product.quantity:"noNumber":null}function Ke(e){var t,n;return(n=(t=e==null?void 0:e.itemsV2)==null?void 0:t.items)==null?void 0:n.some(r=>{var c,o;return!((c=r.backorder_message)!=null&&c.trim())&&!j(r)&&((o=r==null?void 0:r.product)==null?void 0:o.stock_status)==="OUT_OF_STOCK"})}function Je(e){var c,o,i,u,l,_,s,a;const t=e.quantity,n=de(e.product.price_tiers,t);if(n)return Math.round(n.discount.percent_off);let r;if(e.__typename==="ConfigurableCartItem")r=(u=(i=(o=(c=e==null?void 0:e.configured_variant)==null?void 0:c.price_range)==null?void 0:o.maximum_price)==null?void 0:i.discount)==null?void 0:u.percent_off;else{if(e.__typename==="BundleCartItem")return;r=(a=(s=(_=(l=e==null?void 0:e.product)==null?void 0:l.price_range)==null?void 0:_.maximum_price)==null?void 0:s.discount)==null?void 0:a.percent_off}if(r!==0)return Math.round(r)}function Ze(e){var t;return e.__typename==="ConfigurableCartItem"?e.configured_variant.sku:((t=e.product)==null?void 0:t.variantSku)||e.product.sku}function er(e){var r,c,o,i,u,l;const t=((c=(r=e==null?void 0:e.prices)==null?void 0:r.original_row_total)==null?void 0:c.value)-((i=(o=e==null?void 0:e.prices)==null?void 0:o.row_total)==null?void 0:i.value),n=(l=(u=e==null?void 0:e.prices)==null?void 0:u.row_total)==null?void 0:l.currency;if(t!==0)return{value:t,currency:n}}function rr(e){var t,n,r;return(r=(n=(t=e==null?void 0:e.product)==null?void 0:t.custom_attributesV2)==null?void 0:n.items)==null?void 0:r.map(c=>{const o=c.code.split("_").map(i=>i.charAt(0).toUpperCase()+i.slice(1)).join(" ");return{...c,code:o}})}function tr(e){var r,c;if(!e)return null;const t=o=>{switch(o){case 1:return"EXCLUDING_TAX";case 2:return"INCLUDING_TAX";case 3:return"INCLUDING_EXCLUDING_TAX";default:return"EXCLUDING_TAX"}},n=o=>{switch(+o){case 0:return!1;case 1:return!0;case 2:return null;default:return!1}};return{displayMiniCart:e.minicart_display,miniCartMaxItemsDisplay:e.minicart_max_items,cartExpiresInDays:e.cart_expires_in_days,cartSummaryDisplayTotal:e.cart_summary_display_quantity,cartSummaryMaxItems:e.max_items_in_order_summary,defaultCountry:e.default_country,categoryFixedProductTaxDisplaySetting:e.category_fixed_product_tax_display_setting,productFixedProductTaxDisplaySetting:e.product_fixed_product_tax_display_setting,salesFixedProductTaxDisplaySetting:e.sales_fixed_product_tax_display_setting,shoppingCartDisplaySetting:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:t(e.shopping_cart_display_subtotal),price:t(e.shopping_cart_display_price),shipping:t(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total,taxGiftWrapping:e.shopping_cart_display_tax_gift_wrapping},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",allowGiftWrappingOnOrder:n(e==null?void 0:e.allow_gift_wrapping_on_order),allowGiftWrappingOnOrderItems:n(e==null?void 0:e.allow_gift_wrapping_on_order_items),allowGiftMessageOnOrder:n(e==null?void 0:e.allow_order),allowGiftMessageOnOrderItems:n(e==null?void 0:e.allow_items),allowGiftReceipt:!!+(e==null?void 0:e.allow_gift_receipt),allowPrintedCard:!!+(e==null?void 0:e.allow_printed_card),printedCardPrice:{currency:((r=e==null?void 0:e.printed_card_priceV2)==null?void 0:r.currency)??"",value:((c=e==null?void 0:e.printed_card_priceV2)==null?void 0:c.value)!=null?+e.printed_card_priceV2.value:0},cartGiftWrapping:t(+e.cart_gift_wrapping),cartPrintedCard:t(+e.cart_printed_card)}}const I=e=>{const t=e.findIndex(({extensions:o})=>(o==null?void 0:o.category)==="graphql-authorization")>-1,n=e.findIndex(({path:o,extensions:i})=>(i==null?void 0:i.category)==="graphql-no-such-entity"&&!(o!=null&&o.includes("applyCouponsToCart")))>-1,r=e.map(o=>o.message).join(" "),c=e.findIndex(({path:o,extensions:i})=>(i==null?void 0:i.category)==="graphql-input"&&(o==null?void 0:o.includes("cart")))>-1;if(t||n||c)return ye(),console.error(r),null;throw Error(r)},ge=`
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
    
  ${R}
`;function z(e){const{cart:t,locale:n="en-US"}=e;return{id:t.id,items:Ce(t.items,n),prices:{subtotalExcludingTax:t.subtotal.excludingTax,subtotalIncludingTax:t.subtotal.includingTax},totalQuantity:t.totalUniqueItems,possibleOnepageCheckout:void 0,giftMessageSelected:void 0,giftWrappingSelected:void 0,source:void 0}}function Ce(e,t){return e.map(n=>({canApplyMsrp:!1,formattedPrice:nr(t,n.price.currency,n.price.value),id:n.uid,prices:{price:n.price,discount:n.discount&&n.discount.value!==void 0?{value:n.discount.value,currency:n.discount.currency}:void 0},product:{productId:n.uid,name:n.name,sku:n.sku,topLevelSku:n.topLevelSku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:n.categories,productType:n.itemType,pricing:{regularPrice:n.regularPrice.value,minimalPrice:void 0,maximalPrice:void 0,specialPrice:or(n),tierPricing:void 0,currencyCode:n.regularPrice.currency},canonicalUrl:n.canonicalUrl,mainImageUrl:n.image.src,image:{src:n.image.src,alt:n.image.alt}},configurableOptions:n.selectedOptions?Object.entries(n.selectedOptions).map(([r,c],o)=>({id:o+1,optionLabel:r,valueId:o+1,valueLabel:c})):[],bundleOptions:n.bundleOptions?Object.entries(n.bundleOptions).map(([r,c],o)=>({id:(o+1).toString(),optionLabel:r,valueId:o+1,valueLabel:c})):[],customizableOptions:n.customizableOptions?Object.entries(n.customizableOptions).map(([r,c],o)=>({id:(o+1).toString(),optionLabel:r,valueId:o+1,valueLabel:c})):[],quantity:n.quantity,selectedOptions:(()=>{const r={...n.selectedOptions,...n.bundleOptions,...n.customizableOptions};return Object.keys(r).length>0?r:void 0})()}))}function nr(e,t,n){const r=e.replace("_","-");return new Intl.NumberFormat(r,{style:"currency",currency:t}).format(n)}function or(e){var t;if(e.discounted)return(t=e.price)==null?void 0:t.value}const A={SHOPPING_CART_CONTEXT:"shoppingCartContext",PRODUCT_CONTEXT:"productContext",CHANGED_PRODUCTS_CONTEXT:"changedProductsContext",CHANNEL_CONTEXT:"channelContext"},N={OPEN_CART:"open-cart",ADD_TO_CART:"add-to-cart",REMOVE_FROM_CART:"remove-from-cart",SHOPPING_CART_VIEW:"shopping-cart-view",INITIATE_CHECKOUT:"initiate-checkout"};function K(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function b(e,t){const n=K();n.push({[e]:null}),n.push({[e]:t})}function Q(e,t){K().push(r=>{const c=r.getState?r.getState():{};r.push({event:e,eventInfo:{...c,...t}})})}function cr(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function B(){b(A.CHANNEL_CONTEXT,cr())}function ir(e,t,n){const r=z({cart:e,locale:n});B(),b(A.SHOPPING_CART_CONTEXT,{...r});const c=Ce(t,n);b(A.CHANGED_PRODUCTS_CONTEXT,{items:c}),Q(N.OPEN_CART),c.forEach(o=>{b(A.PRODUCT_CONTEXT,o.product),k(r,[o],N.ADD_TO_CART)})}function ur(e,t){const n=z({cart:e,locale:t});B(),b(A.SHOPPING_CART_CONTEXT,{...n}),Q(N.SHOPPING_CART_VIEW)}function k(e,t,n){const r={items:t};B(),b(A.SHOPPING_CART_CONTEXT,{...e}),b(A.CHANGED_PRODUCTS_CONTEXT,{...r}),Q(n)}function x(e,t,n){const r=z({cart:e,locale:n}),c=r.items,o=K(),i=o.getState?o.getState():{},{shoppingCartContext:{items:u=[]}={}}=i;t.forEach(l=>{const _=u.find(a=>a.id===l.uid),s=c.find(a=>a.id===l.uid);!s&&!_||(!_&&s?(b(A.PRODUCT_CONTEXT,s.product),k(r,[s],N.ADD_TO_CART)):_&&!s?(b(A.PRODUCT_CONTEXT,_.product),k(r,[_],N.REMOVE_FROM_CART)):s.quantity>_.quantity?(b(A.PRODUCT_CONTEXT,s.product),k(r,[s],N.ADD_TO_CART)):(b(A.PRODUCT_CONTEXT,s.product),k(r,[s],N.REMOVE_FROM_CART)))})}function zr(e,t){const n=z({cart:e,locale:t});B(),b(A.SHOPPING_CART_CONTEXT,{...n}),Q(N.INITIATE_CHECKOUT)}const Qr=async e=>{const t=p.cartId||await he().then(n=>n);return m(ge,{variables:{cartId:t,cartItems:e.map(({sku:n,parentSku:r,quantity:c,optionsUIDs:o,enteredOptions:i,customFields:u})=>({sku:n,parent_sku:r,quantity:c,selected_options:o,entered_options:i,...u||{}}))}}).then(({errors:n,data:r})=>{var l;const c=[...((l=r==null?void 0:r.addProductsToCart)==null?void 0:l.user_errors)??[],...n??[]];if(c.length>0)return I(c);const o=S(r.addProductsToCart.cart),i=w(),u=(i==null?void 0:i.items)||[];if(f.emit("cart/updated",o),f.emit("cart/data",o),o){const _=o.items.filter(a=>!u.some(d=>d.sku===a.sku)),s=o.items.filter(a=>{const d=u.find(T=>T.sku===a.sku);return d&&a.quantity!==d.quantity});_.length>0&&f.emit("cart/product/added",_),s.length>0&&f.emit("cart/product/updated",s)}if(o){const _=o.items.filter(d=>e.some(({sku:T})=>T.toUpperCase()===d.topLevelSku.toUpperCase())),s=!i||(i.totalQuantity??0)===0,a=(o.totalQuantity??0)>0;s&&a?ir(o,_,p.locale??"en-US"):x(o,_,p.locale??"en-US")}return o})},sr=`
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
`,lr=`
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

  ${R}
`,ar=`
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

  ${sr}
  ${R}
`,W=async()=>{const e=p.authenticated,t=p.cartId;if(e)return m(ar,{method:"POST"}).then(({errors:n,data:r})=>{if(n)return I(n);const c={...r.cart,...r.customer};return S(c)});if(!t)throw new Error("No cart ID found");return m(lr,{method:"POST",cache:"no-cache",variables:{cartId:t}}).then(({errors:n,data:r})=>n?I(n):S(r.cart))},_r=`
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

  ${R}
`,V=async()=>{if(p.initializing)return null;p.initializing=!0,p.config||(p.config=await Tr());const e=p.authenticated?await Te():await me();return f.emit("cart/initialized",e),f.emit("cart/data",e),p.initializing=!1,e};async function Te(){const e=p.cartId,t=await W();return t?(p.cartId=t.id,!e||t.id===e?t:await m(_r,{variables:{guestCartId:e,customerCartId:t.id}}).then(()=>W()).then(n=>{const r={oldCartItems:t.items,newCart:n};return f.emit("cart/merged",r),n}).catch(()=>(console.error("Could not merge carts"),t))):null}async function me(){if(Y.getConfig().disableGuestCart===!0||!p.cartId)return null;try{return await W()}catch(e){return console.error(e),null}}const pr=`
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
      errors {
        code
        message
      }
    }
  }

  ${R}
`,Ie=(e,t)=>{const n=[];return e.filter(r=>r.errors&&t.some(c=>c===r.uid)).forEach(r=>{var c;(c=r.errors)==null||c.forEach(o=>{n.push({message:o.message,path:[r.uid],extensions:{category:o.code}})})}),n},dr=(e,t)=>{const n=[],r=[],c=[];return e.forEach(o=>{const i=t.find(u=>u.uid===o.uid);if(i)if(o.optionsUIDs){const u=Object.values((i==null?void 0:i.selectedOptionsUIDs)??{});if(o.optionsUIDs.every(_=>u.includes(_))&&o.optionsUIDs.length===u.length)c.push({uid:o.uid,quantity:o.quantity,giftOptions:o.giftOptions,customFields:o.customFields});else{const _=t.find(s=>{const a=Object.values((s==null?void 0:s.selectedOptionsUIDs)??{});return s.uid!==o.uid&&s.sku===i.sku&&o.optionsUIDs.every(d=>a.includes(d))&&o.optionsUIDs.length===a.length});if(_)c.push({uid:_.uid,quantity:_.quantity+o.quantity,giftOptions:o.giftOptions,customFields:o.customFields}),r.push(o.uid);else{const{sku:s,topLevelSku:a}=i,{optionsUIDs:d,enteredOptions:T,quantity:E,customFields:y}=o;n.push({sku:s,parentSku:a,quantity:E,optionsUIDs:d,enteredOptions:T,customFields:y}),r.push(o.uid)}}}else if(o.customFields){const{sku:u,topLevelSku:l}=i,{optionsUIDs:_,enteredOptions:s,quantity:a,customFields:d}=o;n.push({sku:u,parentSku:l,quantity:a,optionsUIDs:_,enteredOptions:s,customFields:d}),r.push(o.uid)}else c.push({uid:o.uid,quantity:o.quantity,giftOptions:o.giftOptions,customFields:o.customFields});else throw Error(`Invalid Cart Item UID: No matching cart entry found for ${o.uid}`)}),{itemsToAdd:n,itemsToRemove:r,itemsToUpdate:c}},fr=0,Br=async e=>{const t=p.cartId,n=w();if(!t)return Promise.reject(new Error("Cart ID is not set"));if(!n)return Promise.reject(new Error("Cart is not set"));const{itemsToAdd:r,itemsToRemove:c,itemsToUpdate:o}=dr(e,n.items),i=[];return r.length>0&&i.push(m(ge,{variables:{cartId:t,cartItems:r.map(({parentSku:u,quantity:l,optionsUIDs:_,enteredOptions:s,customFields:a})=>({sku:u,quantity:l,selected_options:_,entered_options:s,...a||{}}))}}).then(({errors:u,data:l})=>{var a,d,T,E;const _=Ie(((d=(a=l==null?void 0:l.addProductsToCart)==null?void 0:a.cart)==null?void 0:d.itemsV2.items)||[],e.map(y=>y.uid)),s=[...((T=l==null?void 0:l.addProductsToCart)==null?void 0:T.user_errors)??[],...u??[],..._];return s.length>0?I(s):c.length>0?ae(t,c.map(y=>({uid:y,quantity:fr}))).catch(y=>Promise.reject(new Error(`Failed to update products in cart: ${y}`))):Promise.resolve(S((E=l==null?void 0:l.addProductsToCart)==null?void 0:E.cart))}).then(u=>(f.emit("cart/updated",u),f.emit("cart/data",u),x(u,e,p.locale??"en-US"),Promise.resolve(u))).catch(u=>Promise.reject(new Error(`Failed to add products to cart: ${u}`)))),o.length>0&&i.push(ae(t,o).catch(u=>Promise.reject(new Error(u)))),Promise.all(i).then(u=>u[u.length-1])},ae=async(e,t)=>m(pr,{variables:{cartId:e,cartItems:t.map(({uid:n,quantity:r,giftOptions:c})=>({cart_item_uid:n,quantity:r,...c}))}}).then(({errors:n,data:r})=>{var u,l,_;const c=Ie(((l=(u=r==null?void 0:r.updateCartItems)==null?void 0:u.cart)==null?void 0:l.itemsV2.items)||[],t.map(s=>s.uid)),o=[...((_=r==null?void 0:r.updateCartItems)==null?void 0:_.errors)??[],...n??[],...c],i=(r==null?void 0:r.updateCartItems)&&S(r.updateCartItems.cart);if(i&&f.emit("cart/data",i),o.length>0)return I(o);if(f.emit("cart/updated",i),i){const s=i.items.filter(a=>t.some(d=>d.uid===a.uid));f.emit("cart/product/updated",s)}return i&&x(i,t,p.locale??"en-US"),i}),ye=()=>(p.cartId=null,p.authenticated=!1,Promise.resolve(null)),gr=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,he=async()=>{const{disableGuestCart:e}=Y.getConfig();if(e)throw new Error("Guest cart is disabled");return await m(gr).then(({data:t})=>{const n=t.createGuestCart.cart.id;return p.cartId=n,n})},Cr=`
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
`,Tr=async()=>m(Cr,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?I(e):tr(t.storeConfig)),mr=e=>{var t,n;return{countryCode:e.country_code||"US",postCode:e.postcode||"",region:((t=e.region)==null?void 0:t.region)||"",regionId:(n=e.region)==null?void 0:n.id}},Ir=e=>e?{carrierCode:e.carrier_code||"",methodCode:e.method_code||"",amount:e.amount,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}:null,yr=`
query COUNTRIES_QUERY {
  countries {
    label: full_name_locale
    id
  }
  storeConfig {
    defaultCountry: default_country
  }
}
`,hr=`
query REGIONS_QUERY($id: String) {
  country(id: $id) {
    available_regions {
      code
			name
    }
  }
}
`,Er=`
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
`,Vr=async e=>{const t=p.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:c}=e,o={country_code:n||"US",postcode:r||"",region:{region:(c==null?void 0:c.region)||"",region_id:c==null?void 0:c.id}};return m(Er,{variables:{cartId:t,address:o}}).then(({errors:i,data:u})=>{if(i)return I(i);const _=u.estimateShippingMethods.find(s=>!s.error_message)||null;return f.emit("shipping/estimate",{address:mr(o),shippingMethod:Ir(_)}),_})},Hr=async()=>m(yr,{method:"GET"}).then(({errors:e,data:t})=>{var c,o;if(e)return I(e);const n=((c=t==null?void 0:t.countries)==null?void 0:c.sort((i,u)=>i.label.localeCompare(u.label)))||[],r=((o=t==null?void 0:t.storeConfig)==null?void 0:o.defaultCountry)||"US";return n.forEach(i=>{i.isDefaultCountry=i.id===r}),n}),Xr=async e=>m(hr,{method:"GET",variables:{id:e}}).then(({errors:t,data:n})=>{var r;return t?I(t):((r=n==null?void 0:n.country)==null?void 0:r.available_regions)||[]}),vr=`
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

  ${R}
  `,Wr=async e=>{var u,l;const t=p.cartId;if(!t)throw new Error("No cart ID found");if(!e)throw new Error("No address parameter found");const{countryCode:n,postcode:r,region:c}=e,o=(u=e.shipping_method)==null?void 0:u.carrier_code,i=(l=e.shipping_method)==null?void 0:l.method_code;return m(vr,{variables:{cartId:t,address:{country_code:n||"US",postcode:r,region:(c==null?void 0:c.id)!==void 0?{region_id:c.id}:{region:(c==null?void 0:c.region)??""}},shipping_method:{carrier_code:o||"",method_code:i||""}}}).then(({errors:_,data:s})=>{if(_)return I(_);const a=s.estimateTotals;return a?S(a.cart):null})},_e=async()=>{const e=p.authenticated?await Te():await me();return f.emit("cart/data",e),e},Ar=`
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
${R}
`;var br=(e=>(e.APPEND="APPEND",e.REPLACE="REPLACE",e))(br||{});const Yr=async(e,t)=>{const n=p.cartId;if(!n)throw Error("Cart ID is not set");return m(Ar,{variables:{cartId:n,couponCodes:e,type:t}}).then(({errors:r,data:c})=>{var u;const o=[...((u=c==null?void 0:c.applyCouponsToCart)==null?void 0:u.user_errors)??[],...r??[]];if(o.length>0)return I(o);const i=S(c.applyCouponsToCart.cart);return f.emit("cart/updated",i),f.emit("cart/data",i),i})},jr=()=>{const e=p.locale??"en-US",t=w();t&&ur(t,e)},Sr=`
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
${R}
`,Kr=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");return m(Sr,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const c=[...((i=r==null?void 0:r.applyGiftCardToCart)==null?void 0:i.user_errors)??[],...n??[]];if(c.length>0)return I(c);const o=S(r.applyGiftCardToCart.cart);return f.emit("cart/updated",o),f.emit("cart/data",o),o&&x(o,[],p.locale??"en-US"),o})},Rr=`
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
${R}
`,Jr=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");return m(Rr,{variables:{cartId:t,giftCardCode:e}}).then(({errors:n,data:r})=>{var i;const c=[...((i=r==null?void 0:r.addProductsToCart)==null?void 0:i.user_errors)??[],...n??[]];if(c.length>0)return I(c);const o=S(r.removeGiftCardFromCart.cart);return f.emit("cart/updated",o),f.emit("cart/data",o),o&&x(o,[],p.locale??"en-US"),o})},Dr=`
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
${R}
`,Zr=async e=>{const t=p.cartId;if(!t)throw Error("Cart ID is not set");const{recipientName:n,senderName:r,message:c,giftReceiptIncluded:o,printedCardIncluded:i,giftWrappingId:u,isGiftWrappingSelected:l}=e;return m(Dr,{variables:{cartId:t,giftMessage:{from:r,to:n,message:c},giftWrappingId:l?u:null,giftReceiptIncluded:o,printedCardIncluded:i}}).then(({errors:_,data:s})=>{var T;const a=[...((T=s==null?void 0:s.addProductsToCart)==null?void 0:T.user_errors)??[],..._??[]];if(a.length>0)return I(a);const d=S(s.setGiftOptionsOnCart.cart);return f.emit("cart/updated",d),f.emit("cart/data",d),d&&x(d,[],p.locale??"en-US"),d})},Or=`
  mutation SELECT_FREE_GIFT_FOR_CART(
    $input: SelectFreeGiftForCartInput!
    $pageSize: Int! = 100
    $currentPage: Int! = 1
    $itemsSortInput: QuoteItemsSortInput! = { field: CREATED_AT, order: DESC }
  ) {
    selectFreeGiftForCart(input: $input) {
      cart {
        ...CART_FRAGMENT
      }
    }
  }

  ${R}
`,et=async({ruleId:e,sku:t,quantity:n,enteredOptions:r,selectedOptions:c})=>{const i={cart_id:p.cartId||await he().then(u=>u),rule_id:e,sku:t};return n!=null&&(i.quantity=n),r!=null&&r.length&&(i.entered_options=r.map(({uid:u,value:l})=>({uid:u,value:l}))),c!=null&&c.length&&(i.selected_options=c),m(Or,{variables:{input:i}}).then(({errors:u,data:l})=>{var E;const _=[...u??[]];if(_.length>0)return I(_);const s=(E=l==null?void 0:l.selectFreeGiftForCart)==null?void 0:E.cart;if(!s)throw new Error("selectFreeGiftForCart did not return a cart");const a=S(s),d=w(),T=(d==null?void 0:d.items)||[];if(f.emit("cart/updated",a),f.emit("cart/data",a),a){const y=a.items.filter(v=>!T.some(P=>P.uid===v.uid));y.length>0&&f.emit("cart/product/added",y),x(a,a.items.filter(v=>v.sku===t||v.topLevelSku===t),p.locale??"en-US")}return a})},Ee=`
  fragment AVAILABLE_FREE_GIFTS_FRAGMENT on Cart {
    available_free_gifts {
      rule_id
      rule_label
      gift_qty
      available_skus
      products {
        __typename
        sku
        name
        thumbnail {
          url
          label
        }
        ... on ConfigurableProduct {
          configurable_options {
            uid
            attribute_uid
            label
            values {
              uid
              label
            }
          }
        }
        ... on BundleProduct {
          items {
            uid
            title
            required
            type
            position
            sku
            price_range {
              minimum_price {
                final_price {
                  value
                  currency
                }
                regular_price {
                  value
                  currency
                }
              }
              maximum_price {
                final_price {
                  value
                  currency
                }
                regular_price {
                  value
                  currency
                }
              }
            }
            options {
              uid
              quantity
              position
              is_default
              label
              can_change_quantity
              product {
                uid
                name
                sku
                __typename
              }
            }
          }
        }
      }
    }
  }
`,Nr=`
  query GUEST_AVAILABLE_FREE_GIFTS_QUERY($cartId: String!) {
    cart(cart_id: $cartId) {
      ...AVAILABLE_FREE_GIFTS_FRAGMENT
    }
  }

  ${Ee}
`,Pr=`
  query CUSTOMER_AVAILABLE_FREE_GIFTS_QUERY {
    cart: customerCart {
      ...AVAILABLE_FREE_GIFTS_FRAGMENT
    }
  }

  ${Ee}
`,rt=async()=>{if(p.authenticated)return m(Pr,{method:"POST"}).then(({errors:t,data:n})=>{var r;return t?(I(t),[]):X((r=n==null?void 0:n.cart)==null?void 0:r.available_free_gifts)});const e=p.cartId;if(!e)throw new Error("No cart ID found");return m(Nr,{method:"POST",cache:"no-cache",variables:{cartId:e}}).then(({errors:t,data:n})=>{var r;return t?(I(t),[]):X((r=n==null?void 0:n.cart)==null?void 0:r.available_free_gifts)})};export{br as ApplyCouponsStrategy,Fr as a,Qr as addProductsToCart,Yr as applyCouponsToCart,Kr as applyGiftCardToCart,Y as config,he as createGuestCart,m as fetchGraphQl,rt as getAvailableFreeGiftsForCart,W as getCartData,w as getCartDataFromCache,wr as getConfig,Hr as getCountries,Te as getCustomerCartPayload,Vr as getEstimateShipping,Wr as getEstimatedTotals,me as getGuestCartPayload,Xr as getRegions,Tr as getStoreConfig,pe as initialize,V as initializeCart,zr as p,jr as publishShoppingCartViewEvent,_e as refreshCart,Lr as removeFetchGraphQlHeader,Jr as removeGiftCardFromCart,ye as resetCart,p as s,et as selectFreeGiftForCart,Mr as setEndpoint,kr as setFetchGraphQlHeader,qr as setFetchGraphQlHeaders,Zr as setGiftOptionsOnCart,Br as updateProductsFromCart};
//# sourceMappingURL=api.js.map
