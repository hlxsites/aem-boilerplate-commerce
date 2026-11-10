/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as An}from"@dropins/tools/recaptcha.js";import{PRODUCT_DETAILS_FRAGMENT as an,PRICE_DETAILS_FRAGMENT as _n,GIFT_CARD_DETAILS_FRAGMENT as on,ORDER_ITEM_DETAILS_FRAGMENT as sn,BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT as Sn,ORDER_SUMMARY_FRAGMENT as Cn,ADDRESS_FRAGMENT as Gn,ORDER_ITEM_FRAGMENT as Mn,GIFT_WRAPPING_FRAGMENT as En,GIFT_MESSAGE_FRAGMENT as pn,RETURNS_FRAGMENT as j,GUEST_ORDER_FRAGMENT as z,CUSTOMER_ORDER_FRAGMENT as Un,PLACE_ORDER_FRAGMENT as Rn,REQUEST_RETURN_ORDER_FRAGMENT as d,PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT as xn}from"./fragments.js";import{merge as K,Initializer as $n}from"@dropins/tools/lib.js";import{FetchGraphQL as wn}from"@dropins/tools/fetch-graphql.js";const qn=`
  mutation CANCEL_ORDER_MUTATION($orderId: ID!, $reason: String!) {
    cancelOrder(input: { order_id: $orderId, reason: $reason }) {
      error
      order {
        email
        available_actions
        status
        number
        id
        order_date
        carrier
        shipping_method
        is_virtual
        applied_coupons {
          code
        }
        shipments {
          id
          number
          tracking {
            title
            number
            carrier
          }
          comments {
            message
            timestamp
          }
          items {
            id
            product_sku
            product_name
            order_item {
              ...ORDER_ITEM_DETAILS_FRAGMENT
              ... on GiftCardOrderItem {
                ...GIFT_CARD_DETAILS_FRAGMENT
                product {
                  ...PRODUCT_DETAILS_FRAGMENT
                }
              }
            }
          }
        }
        payment_methods {
          name
          type
        }
        shipping_address {
          ...ADDRESS_FRAGMENT
        }
        billing_address {
          ...ADDRESS_FRAGMENT
        }
        items {
          ...ORDER_ITEM_FRAGMENT
        }
        total {
          ...ORDER_SUMMARY_FRAGMENT
        }
      }
    }
  }
  ${an}
  ${_n}
  ${on}
  ${sn}
  ${Sn}
  ${Cn}
  ${Gn}
  ${Mn}
  ${En}
  ${pn}
`,f=n=>{const t=n.map(e=>e.message).join(" ");throw Error(t)},D=(n,t)=>n+t.amount.value,Fn=(n,t)=>({id:n,totalQuantity:t.totalQuantity,possibleOnepageCheckout:!0,items:t.items.map(e=>{var u,i,c,r,l,a,_,o,E,s,g;return{canApplyMsrp:!0,formattedPrice:"",id:e.id,quantity:e.totalQuantity,product:{canonicalUrl:(u=e.product)==null?void 0:u.canonicalUrl,mainImageUrl:((i=e.product)==null?void 0:i.image)??"",name:((c=e.product)==null?void 0:c.name)??"",productId:0,productType:(r=e.product)==null?void 0:r.productType,sku:((l=e.product)==null?void 0:l.sku)??"",topLevelSku:(a=e.product)==null?void 0:a.sku},prices:{price:{value:e.price.value,currency:e.price.currency,regularPrice:((_=e.regularPrice)==null?void 0:_.value)??e.price.value}},configurableOptions:((o=e.selectedOptions)==null?void 0:o.map(R=>({optionLabel:R.label,valueLabel:R.value})))||[],discountAmount:((g=((E=e.itemPrices)==null?void 0:E.discounts)??((s=e.prices)==null?void 0:s.discounts))==null?void 0:g.reduce(D,0))??0}}),prices:{subtotalExcludingTax:{value:t.subtotalExclTax.value,currency:t.subtotalExclTax.currency},subtotalIncludingTax:{value:t.subtotalInclTax.value,currency:t.subtotalInclTax.currency}},discountAmount:t.discounts.reduce(D,0)}),Ln=n=>{var u,i,c;const t=n.coupons[0],e=(u=n.payments)==null?void 0:u[0];return{appliedCouponCode:(t==null?void 0:t.code)??"",email:n.email,grandTotal:n.grandTotal.value,orderId:n.number,orderType:"checkout",otherTax:0,salesTax:n.totalTax.value,shipping:{shippingMethod:((i=n.shipping)==null?void 0:i.code)??"",shippingAmount:((c=n.shipping)==null?void 0:c.amount)??0},subtotalExcludingTax:n.subtotalExclTax.value,subtotalIncludingTax:n.subtotalInclTax.value,payments:e?[{paymentMethodCode:(e==null?void 0:e.code)||"",paymentMethodName:(e==null?void 0:e.name)||"",total:n.grandTotal.value,orderId:n.number}]:[],discountAmount:n.discounts.reduce(D,0),taxAmount:n.totalTax.value,paymentAmount:n.grandTotal.value,priceTotal:n.grandTotal.value}},gn=n=>n.replace(/_([a-z])/g,(t,e)=>e.toUpperCase()),Pn=n=>n.replace(/([A-Z])/g,t=>`_${t.toLowerCase()}`),B=(n,t,e)=>{const u=["string","boolean","number"],i=t==="camelCase"?gn:Pn;return Array.isArray(n)?n.map(c=>u.includes(typeof c)||c===null?c:typeof c=="object"?B(c,t,e):c):n!==null&&typeof n=="object"?Object.entries(n).reduce((c,[r,l])=>{const a=e&&e[r]?e[r]:i(r);return c[a]=u.includes(typeof l)||l===null?l:B(l,t,e),c},{}):n},kn=n=>{const t=[];for(const e of n)if(!(e.frontend_input!=="MULTILINE"||e.multiline_count<2))for(let u=2;u<=e.multiline_count;u++){const i={...e,name:`${e.code}_${u}`,code:`${e.code}_${u}`,id:`${e.code}_${u}`};t.push(i)}return t},Tn=(n=[])=>{var i;if(!(n!=null&&n.length))return[];const t=(i=n.filter(c=>{var r;return!((r=c.frontend_input)!=null&&r.includes("HIDDEN"))}))==null?void 0:i.map(({code:c,...r})=>{const l=c!=="country_id"?c:"country_code";return{...r,name:l,id:l,code:l}}),e=kn(t);return[...t,...e].map(c=>{const r=gn(c.code);return B({...c,customUpperCode:r},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((c,r)=>c.orderNumber-r.orderNumber)},Qn=n=>{var t,e,u,i,c,r;return{email:((e=(t=n==null?void 0:n.data)==null?void 0:t.customer)==null?void 0:e.email)||"",firstname:((i=(u=n==null?void 0:n.data)==null?void 0:u.customer)==null?void 0:i.firstname)||"",lastname:((r=(c=n==null?void 0:n.data)==null?void 0:c.customer)==null?void 0:r.lastname)||""}};function Vt(n){var t;return{region:{region_id:n!=null&&n.regionId?Number(n==null?void 0:n.regionId):null,region:n==null?void 0:n.region},city:n==null?void 0:n.city,company:n==null?void 0:n.company,country_code:n==null?void 0:n.countryCode,firstname:n==null?void 0:n.firstName,lastname:n==null?void 0:n.lastName,middlename:n==null?void 0:n.middleName,postcode:n==null?void 0:n.postCode,street:n==null?void 0:n.street,telephone:n==null?void 0:n.telephone,custom_attributesV2:((t=n==null?void 0:n.customAttributes)==null?void 0:t.map(e=>({attribute_code:e.code,value:e.value})))||[]}}const Bn=n=>n||0,zn=n=>{var t,e,u,i,c,r,l,a,_;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((u=(e=(t=n==null?void 0:n.price_range)==null?void 0:t.maximum_price)==null?void 0:e.regular_price)==null?void 0:u.currency)??"",value:((r=(c=(i=n==null?void 0:n.price_range)==null?void 0:i.maximum_price)==null?void 0:c.regular_price)==null?void 0:r.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((l=n==null?void 0:n.image)==null?void 0:l.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((a=n==null?void 0:n.thumbnail)==null?void 0:a.label)||"",url:((_=n==null?void 0:n.thumbnail)==null?void 0:_.url)||""}}},Hn=n=>{if(!n||!("selected_options"in n))return;const t={};for(const e of n.selected_options)t[e.label]=e.value;return t},Vn=n=>{const t=n==null?void 0:n.map(u=>({uid:u.uid,label:u.label,values:u.values.map(i=>i.product_name).join(", ")})),e={};return t==null||t.forEach(u=>{e[u.label]=u.values}),Object.keys(e).length>0?e:null},Wn=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(t=>t.title).join(", ")}:null,Yn=n=>({quantityCanceled:(n==null?void 0:n.quantity_canceled)??0,quantityInvoiced:(n==null?void 0:n.quantity_invoiced)??0,quantityOrdered:(n==null?void 0:n.quantity_ordered)??0,quantityRefunded:(n==null?void 0:n.quantity_refunded)??0,quantityReturned:(n==null?void 0:n.quantity_returned)??0,quantityShipped:(n==null?void 0:n.quantity_shipped)??0,quantityReturnRequested:(n==null?void 0:n.quantity_return_requested)??0}),jn=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),un=n=>{const{firstName:t,lastName:e,middleName:u}=jn(n);return{firstName:t,lastName:e,middleName:u,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:(n==null?void 0:n.country)??"",countryCode:(n==null?void 0:n.country_code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:(n==null?void 0:n.region)??"",regionId:(n==null?void 0:n.region_id)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},Kn=n=>{const t={value:0,currency:"USD"};return{grandTotal:(n==null?void 0:n.grand_total)??t,grandTotalExclTax:(n==null?void 0:n.grand_total_excl_tax)??t,totalGiftCard:(n==null?void 0:n.total_giftcard)??t,subtotalExclTax:(n==null?void 0:n.subtotal_excl_tax)??t,subtotalInclTax:(n==null?void 0:n.subtotal_incl_tax)??t,taxes:(n==null?void 0:n.taxes)??[],totalTax:(n==null?void 0:n.total_tax)??t,totalShipping:(n==null?void 0:n.total_shipping)??t,discounts:(n==null?void 0:n.discounts)??[]}},cn=n=>{const t={value:0,currency:"USD"},e=(n==null?void 0:n.prices)??{};return{price:(e==null?void 0:e.price)??t,priceIncludingTax:(e==null?void 0:e.price_including_tax)??t,originalPrice:(e==null?void 0:e.original_price)??t,originalPriceIncludingTax:(e==null?void 0:e.original_price_including_tax)??t,discounts:(e==null?void 0:e.discounts)??[]}},Xn=(n,t,e)=>{const u=n==null?void 0:n.price,i=n==null?void 0:n.priceIncludingTax,c=n==null?void 0:n.originalPrice,r=e?c==null?void 0:c.value:i==null?void 0:i.value,l={originalPrice:c,baseOriginalPrice:{value:r,currency:c==null?void 0:c.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:i==null?void 0:i.currency},baseExcludingTax:{value:u==null?void 0:u.value,currency:u==null?void 0:u.currency}},a={originalPrice:c,baseOriginalPrice:{value:c==null?void 0:c.value,currency:i==null?void 0:i.currency},baseDiscountedPrice:{value:t==null?void 0:t.value,currency:u==null?void 0:u.currency},baseExcludingTax:{value:u==null?void 0:u.value,currency:u==null?void 0:u.currency}},_={singleItemPrice:{value:e?c.value:i.value,currency:i.currency},baseOriginalPrice:{value:r,currency:i.currency},baseDiscountedPrice:{value:i.value,currency:i.currency}};return{includeAndExcludeTax:l,excludeTax:a,includeTax:_}},Dn=n=>{var t,e,u,i,c;return{senderName:((t=n.gift_card)==null?void 0:t.sender_name)||"",senderEmail:((e=n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((u=n.gift_card)==null?void 0:u.recipient_email)||"",recipientName:((i=n.gift_card)==null?void 0:i.recipient_name)||"",message:((c=n.gift_card)==null?void 0:c.message)||""}},Zn=n=>{var t,e,u,i;return{label:((e=(t=n==null?void 0:n.product)==null?void 0:t.thumbnail)==null?void 0:e.label)||"",url:((i=(u=n==null?void 0:n.product)==null?void 0:u.thumbnail)==null?void 0:i.url)||""}};function Jn(n){return{currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}}function fn(n){var t,e,u;return{senderName:((t=n==null?void 0:n.gift_message)==null?void 0:t.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((u=n==null?void 0:n.gift_message)==null?void 0:u.message)??""}}function yn(n){var t,e,u,i,c,r,l,a,_,o,E;return{design:((t=n==null?void 0:n.gift_wrapping)==null?void 0:t.design)??"",uid:(e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid,selected:!!((u=n==null?void 0:n.gift_wrapping)!=null&&u.uid),image:{url:((c=(i=n==null?void 0:n.gift_wrapping)==null?void 0:i.image)==null?void 0:c.url)??"",label:((l=(r=n==null?void 0:n.gift_wrapping)==null?void 0:r.image)==null?void 0:l.label)??""},price:{currency:((_=(a=n==null?void 0:n.gift_wrapping)==null?void 0:a.price)==null?void 0:_.currency)??"USD",value:((E=(o=n==null?void 0:n.gift_wrapping)==null?void 0:o.price)==null?void 0:E.value)??0}}}const dn=(n,t)=>{if(!n)return n;const e=new Map((t??[]).map(u=>[u.id,u]));return n.map(u=>{var r;const i=e.get(u.id);if(!i)return u;const c=((r=u.regularPrice)==null?void 0:r.value)!=null&&u.regularPrice.value>0?u.regularPrice:i.regularPrice;return{...u,freeGiftLabel:u.freeGiftLabel??i.freeGiftLabel,isFreeGift:u.isFreeGift||i.isFreeGift,regularPrice:c}})},hn=n=>{var s,g,R,m,A,U,x,p,S,C,G,w,q,F,M,L,$,P,k,Q;const{quantityCanceled:t,quantityInvoiced:e,quantityOrdered:u,quantityRefunded:i,quantityReturned:c,quantityShipped:r,quantityReturnRequested:l}=Yn(n),a=cn(n),_=((s=n==null?void 0:n.prices)==null?void 0:s.original_price.value)*(n==null?void 0:n.quantity_ordered)>((g=n==null?void 0:n.prices)==null?void 0:g.price.value)*(n==null?void 0:n.quantity_ordered),o=Bn(n==null?void 0:n.quantity_ordered),E={value:((R=n==null?void 0:n.product_sale_price)==null?void 0:R.value)||0,currency:(m=n==null?void 0:n.product_sale_price)==null?void 0:m.currency};return{giftMessage:fn(n),giftWrappingAvailable:((A=n==null?void 0:n.product)==null?void 0:A.gift_wrapping_available)??!1,giftWrappingPrice:Jn((U=n==null?void 0:n.product)==null?void 0:U.gift_wrapping_price),productGiftWrapping:[yn(n)],freeGiftLabel:(n==null?void 0:n.free_gift_label)??null,isFreeGift:!!(n!=null&&n.free_gift_label),selectedOptions:(n==null?void 0:n.selected_options)??[],productSalePrice:n==null?void 0:n.product_sale_price,status:(n==null?void 0:n.status)??"",type:n==null?void 0:n.__typename,eligibleForReturn:(n==null?void 0:n.eligible_for_return)??!1,productSku:(n==null?void 0:n.product_sku)??"",productName:(n==null?void 0:n.product_name)??"",productUrlKey:(n==null?void 0:n.product_url_key)??"",quantityCanceled:t,quantityInvoiced:e,quantityOrdered:u,quantityRefunded:i,quantityReturned:c,quantityShipped:r,quantityReturnRequested:l,id:n==null?void 0:n.id,discounted:_,total:{value:((x=n==null?void 0:n.product_sale_price)==null?void 0:x.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((p=n==null?void 0:n.product_sale_price)==null?void 0:p.currency)||""},totalInclTax:{value:((S=n==null?void 0:n.product_sale_price)==null?void 0:S.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(C=n==null?void 0:n.product_sale_price)==null?void 0:C.currency},price:E,prices:cn(n),itemPrices:a,taxCalculations:Xn(a,E,_),priceInclTax:{value:((G=n==null?void 0:n.product_sale_price)==null?void 0:G.value)??0,currency:(w=n==null?void 0:n.product_sale_price)==null?void 0:w.currency},totalQuantity:o,regularPrice:{value:(L=(M=(F=(q=n==null?void 0:n.product)==null?void 0:q.price_range)==null?void 0:F.maximum_price)==null?void 0:M.regular_price)==null?void 0:L.value,currency:(Q=(k=(P=($=n==null?void 0:n.product)==null?void 0:$.price_range)==null?void 0:P.maximum_price)==null?void 0:k.regular_price)==null?void 0:Q.currency},product:zn(n==null?void 0:n.product),thumbnail:Zn(n),giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?Dn(n):void 0,configurableOptions:Hn(n),bundleOptions:n.__typename==="BundleOrderItem"?Vn(n.bundle_options):null,downloadableLinks:n.__typename==="DownloadableOrderItem"?Wn(n==null?void 0:n.downloadable_links):null}},Z=n=>n==null?void 0:n.filter(t=>t.__typename).map(t=>hn(t)),In=n=>{var t,e,u,i,c;return{token:(n==null?void 0:n.token)??"",email:(n==null?void 0:n.email)??"",status:(n==null?void 0:n.status)??"",number:(n==null?void 0:n.number)??"",id:(n==null?void 0:n.id)??"",carrier:n.carrier??"",coupons:(n==null?void 0:n.applied_coupons)??[],orderDate:(n==null?void 0:n.order_date)??"",isVirtual:(n==null?void 0:n.is_virtual)??!1,availableActions:(n==null?void 0:n.available_actions)??[],orderStatusChangeDate:(n==null?void 0:n.order_status_change_date)??"",shippingMethod:(n==null?void 0:n.shipping_method)??"",adminAssistedOrder:(n==null?void 0:n.admin_assisted_order)!=null,giftWrappingOrder:{price:{value:((e=(t=n==null?void 0:n.gift_wrapping)==null?void 0:t.price)==null?void 0:e.value)??0,currency:((i=(u=n==null?void 0:n.gift_wrapping)==null?void 0:u.price)==null?void 0:i.currency)??"USD"},uid:((c=n==null?void 0:n.gift_wrapping)==null?void 0:c.uid)??""}}},nt=n=>{var e,u,i,c,r,l,a,_,o,E,s,g,R;const t=(e=n==null?void 0:n.total)==null?void 0:e.gift_options;return{giftWrappingForItems:{value:((u=t==null?void 0:t.gift_wrapping_for_items)==null?void 0:u.value)??0,currency:((i=t==null?void 0:t.gift_wrapping_for_items)==null?void 0:i.currency)??"USD"},giftWrappingForItemsInclTax:{value:((c=t==null?void 0:t.gift_wrapping_for_items_incl_tax)==null?void 0:c.value)??0,currency:((r=t==null?void 0:t.gift_wrapping_for_items_incl_tax)==null?void 0:r.currency)??"USD"},giftWrappingForOrder:{value:((l=t==null?void 0:t.gift_wrapping_for_order)==null?void 0:l.value)??0,currency:((a=t==null?void 0:t.gift_wrapping_for_order)==null?void 0:a.currency)??"USD"},giftWrappingForOrderInclTax:{value:((_=t==null?void 0:t.gift_wrapping_for_order_incl_tax)==null?void 0:_.value)??0,currency:((o=t==null?void 0:t.gift_wrapping_for_order_incl_tax)==null?void 0:o.currency)??"USD"},printedCard:{value:((E=t==null?void 0:t.printed_card)==null?void 0:E.value)??0,currency:((s=t==null?void 0:t.printed_card)==null?void 0:s.currency)??"USD"},printedCardInclTax:{value:((g=t==null?void 0:t.printed_card_incl_tax)==null?void 0:g.value)??0,currency:((R=t==null?void 0:t.printed_card_incl_tax)==null?void 0:R.currency)??"USD"}}},tt=(n=[])=>n?n==null?void 0:n.map(t=>{var e,u;return{code:(t==null?void 0:t.code)??"",appliedBalance:{value:((e=t.applied_balance)==null?void 0:e.value)??0,currency:((u=t.applied_balance)==null?void 0:u.currency)??"USD"}}}):[],v=(n,t)=>{var M,L,$,P,k,Q,nn,tn,H,en;const e=In(n),u=un(n==null?void 0:n.billing_address),i=un(n==null?void 0:n.shipping_address),c=(M=n.shipments)==null?void 0:M.map(O=>({...O,items:O.items.map(N=>({id:N.id,productName:N.product_name,productSku:N.product_sku,quantityShipped:N.quantity_shipped,orderItem:hn(N.order_item)}))})),r=tt(n==null?void 0:n.applied_gift_cards),l=Z(n.items),a=((L=n==null?void 0:n.comments)==null?void 0:L.map(O=>({message:(O==null?void 0:O.message)??"",timestamp:(O==null?void 0:O.timestamp)??""})))??[],_=(($=On(n==null?void 0:n.returns))==null?void 0:$.ordersReturn)??[],o=t?_.filter(O=>O.returnNumber===t):_,E=dn(Z(n.items_eligible_for_return),l),s=Kn(n==null?void 0:n.total),g=(P=n==null?void 0:n.payment_methods)==null?void 0:P[0],R=n==null?void 0:n.shipping_method,m=l==null?void 0:l.reduce((O,N)=>O+(N==null?void 0:N.totalQuantity),0),A={amount:((k=s==null?void 0:s.totalShipping)==null?void 0:k.value)??0,currency:((Q=s==null?void 0:s.totalShipping)==null?void 0:Q.currency)||"",code:(e==null?void 0:e.shippingMethod)??""},U=[{code:(g==null?void 0:g.type)??"",name:(g==null?void 0:g.name)??""}],x=s==null?void 0:s.subtotalExclTax,p=s==null?void 0:s.subtotalInclTax,S=nt(n),C=fn(n),G=[yn(n)],w=(n==null?void 0:n.printed_card_included)??!1,q=(n==null?void 0:n.gift_receipt_included)??!1,F={...e,...s,giftMessage:C,cartGiftWrapping:G,printedCardIncluded:w,giftReceiptIncluded:q,appliedGiftCards:r,totalGiftOptions:S,subtotalExclTax:x,subtotalInclTax:p,billingAddress:u,shippingAddress:i,shipments:c,items:l,comments:a,returns:o,itemsEligibleForReturn:E,totalQuantity:m,shippingMethod:R,shipping:A,payments:U};return K(F,(en=(H=(tn=(nn=b==null?void 0:b.getConfig())==null?void 0:nn.models)==null?void 0:tn.OrderDataModel)==null?void 0:H.transformer)==null?void 0:en.call(H,n))},et=(n,t,e)=>{var u,i,c,r,l,a,_;if((r=(c=(i=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:i.orders)==null?void 0:c.items)!=null&&r.length&&n==="orderData"){const o=(_=(a=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:a.orders)==null?void 0:_.items[0];return v(o,e)}return null},On=n=>{var c,r,l,a,_;if(!((c=n==null?void 0:n.items)!=null&&c.length))return null;const t=n==null?void 0:n.items,e=n==null?void 0:n.page_info,i={ordersReturn:[...t].sort((o,E)=>+E.number-+o.number).map(o=>{var U,x;const{order:E,status:s,number:g,created_at:R}=o,m=((x=(U=o==null?void 0:o.shipping)==null?void 0:U.tracking)==null?void 0:x.map(p=>{const{status:S,carrier:C,tracking_number:G}=p;return{status:S,carrier:C,trackingNumber:G}}))??[],A=o.items.map(p=>{var M;const S=p==null?void 0:p.quantity,C=p==null?void 0:p.status,G=p==null?void 0:p.request_quantity,w=p==null?void 0:p.uid,q=p==null?void 0:p.order_item,F=((M=Z([q]))==null?void 0:M.reduce((L,$)=>$,{}))??{};return{uid:w,quantity:S,status:C,requestQuantity:G,...F}});return{createdReturnAt:R,returnStatus:s,token:E==null?void 0:E.token,orderNumber:E==null?void 0:E.number,returnNumber:g,items:A,tracking:m}}),...e?{pageInfo:{pageSize:e.page_size,totalPages:e.total_pages,currentPage:e.current_page}}:{}};return K(i,(_=(a=(l=(r=b==null?void 0:b.getConfig())==null?void 0:r.models)==null?void 0:l.CustomerOrdersReturnModel)==null?void 0:a.transformer)==null?void 0:_.call(a,{...t,...e}))},ut=(n,t)=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrder))return null;const e=(i=n==null?void 0:n.data)==null?void 0:i.guestOrder;return v(e,t)},it=(n,t)=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrderByToken))return null;const e=(i=n==null?void 0:n.data)==null?void 0:i.guestOrderByToken;return v(e,t)},X={value:0,currency:"USD"},ct=n=>{var u,i,c,r;if(!n)return null;const t=(n.invoices??[]).map(l=>{var a,_,o,E,s,g;return{id:l.id,number:l.number,status:l.status,comments:l.comments??[],items:(l.items??[]).map(R=>{var m;return{id:R.id,productSku:R.product_sku,productName:R.product_name,quantityInvoiced:R.quantity_invoiced,productSalePrice:R.product_sale_price,taxAmount:R.tax_amount,rowTotal:R.row_total??null,discounts:((m=R.discounts)==null?void 0:m.filter(A=>A!==null))??[]}}),total:{subtotal:((a=l.total)==null?void 0:a.subtotal)??X,grandTotal:((_=l.total)==null?void 0:_.grand_total)??X,baseGrandTotal:((o=l.total)==null?void 0:o.base_grand_total)??X,taxes:((E=l.total)==null?void 0:E.taxes)??[],shippingHandling:(s=l.total)!=null&&s.shipping_handling?{totalAmount:l.total.shipping_handling.total_amount}:void 0,discounts:((g=l.total)==null?void 0:g.discounts)??[]}}}),e={orderNumber:n.number,invoices:t};return K(e,(r=(c=(i=(u=b==null?void 0:b.getConfig())==null?void 0:u.models)==null?void 0:i.OrderInvoicesModel)==null?void 0:c.transformer)==null?void 0:r.call(c,n))},bn=n=>{var e,u;const t=(u=(e=n==null?void 0:n.data)==null?void 0:e.placeOrder)==null?void 0:u.orderV2;return t?v(t):null},rt=n=>{var e,u;const t=(u=(e=n==null?void 0:n.data)==null?void 0:e.placeNegotiableQuoteOrderV2)==null?void 0:u.order;return t?v(t):null};function lt(n){return n?{baseMediaUrl:n.base_media_url,orderCancellationEnabled:n.order_cancellation_enabled,orderCancellationReasons:n.order_cancellation_reasons,shoppingOrderDisplayPrice:n.orders_invoices_credit_memos_display_price,shoppingOrdersDisplaySubtotal:n.orders_invoices_credit_memos_display_subtotal,shoppingOrdersDisplayShipping:n.orders_invoices_credit_memos_display_shipping_amount,shoppingOrdersDisplayGrandTotal:n.orders_invoices_credit_memos_display_grandtotal,shoppingOrdersDisplayFullSummary:n.orders_invoices_credit_memos_display_full_summary,shoppingOrdersDisplayZeroTax:n.orders_invoices_credit_memos_display_zero_tax,salesPrintedCard:+n.sales_printed_card,salesGiftWrapping:+n.sales_gift_wrapping}:null}const at=n=>{var i,c,r,l,a,_;if(!((c=(i=n==null?void 0:n.data)==null?void 0:i.requestReturn)!=null&&c.return))return{};const{created_at:t,...e}=n.data.requestReturn.return,u={...e,createdAt:t};return K(u,(_=(a=(l=(r=b.getConfig())==null?void 0:r.models)==null?void 0:l.RequestReturnModel)==null?void 0:a.transformer)==null?void 0:_.call(a,n.data.requestReturn.return))},Wt=async(n,t,e,u)=>{if(!n)throw new Error("No order ID found");if(!t)throw new Error("No reason found");return T(qn,{variables:{orderId:n,reason:t}}).then(({errors:i,data:c})=>{if(i)return f(i);if(c.cancelOrder.error!=null){u();return}const r=v(c.cancelOrder.order);e(r)}).catch(()=>u())},{setEndpoint:Yt,setFetchGraphQlHeader:_t,removeFetchGraphQlHeader:jt,setFetchGraphQlHeaders:Kt,fetchGraphQl:T,getConfig:Xt}=new wn().getMethods(),ot=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,st=`
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`,y=n=>{const t=n instanceof DOMException&&n.name==="AbortError",e=n.name==="PlaceOrderError";throw!t&&!e&&h.emit("order/error",{source:"auth",type:"network",error:n.message}),n},Dt=async n=>await T(n!=="shortRequest"?ot:st,{method:"GET",cache:"force-cache",variables:{formCode:n}}).then(t=>{var e,u,i;return(e=t.errors)!=null&&e.length?f(t.errors):Tn((i=(u=t==null?void 0:t.data)==null?void 0:u.attributesForm)==null?void 0:i.items)}).catch(y),Et=`
  query GET_ATTRIBUTES_LIST($entityType: AttributeEntityTypeEnum!) {
    attributesList(entityType: $entityType) {
      items {
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
        ... on ReturnItemAttributeMetadata {
          sort_order
        }
        code
        label
        default_value
        frontend_input
        is_unique
        is_required
        options {
          is_default
          label
          value
        }
      }
      errors {
        type
        message
      }
    }
  }
`,Zt=async n=>await T(Et,{method:"GET",cache:"force-cache",variables:{entityType:n}}).then(t=>{var e,u,i;return(e=t.errors)!=null&&e.length?f(t.errors):Tn((i=(u=t==null?void 0:t.data)==null?void 0:u.attributesList)==null?void 0:i.items)}).catch(y),pt=`
  query GET_CUSTOMER {
    customer {
      firstname
      lastname
      email
    }
  }
`,Jt=async()=>await T(pt,{method:"GET",cache:"force-cache"}).then(n=>{var t;return(t=n.errors)!=null&&t.length?f(n.errors):Qn(n)}).catch(y),Rt=`
  query GET_CUSTOMER_ORDERS_RETURN($currentPage: Int, $pageSize: Int) {
    customer {
      returns(currentPage: $currentPage, pageSize: $pageSize) {
        page_info {
          page_size
          total_pages
          current_page
        }
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${j}
  ${an}
  ${_n}
  ${on}
  ${sn}
  ${pn}
  ${En}
`,dt=async(n=10,t=1)=>await T(Rt,{method:"GET",cache:"force-cache",variables:{pageSize:n,currentPage:t}}).then(e=>{var u;return On((u=e==null?void 0:e.data)==null?void 0:u.customer.returns)}).catch(y),gt=`
  query GET_GUEST_ORDER($input: GuestOrderInformationInput!) {
    guestOrder(input: $input) {
      ...GUEST_ORDER_FRAGMENT
      returns {
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${z}
  ${j}
`,It=async n=>await T(gt,{method:"GET",cache:"no-cache",variables:{input:n}}).then(t=>{var e;return(e=t.errors)!=null&&e.length&&t.errors[0].message==="Please login to view the order."?f(t.errors):ut(t)}).catch(y),Tt=`
  query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          ...CUSTOMER_ORDER_FRAGMENT
          returns(pageSize: $pageSize) {
            ...RETURNS_FRAGMENT
          }
          items_eligible_for_return {
            ...ORDER_ITEM_FRAGMENT
          }
        }
      }
    }
  }
  ${Un}
  ${j}
`,ft=async({orderId:n,returnRef:t,queryType:e,returnsPageSize:u=50})=>await T(Tt,{method:"GET",cache:"force-cache",variables:{orderNumber:n,pageSize:u}}).then(i=>et(e??"orderData",i,t)).catch(y),yt=`
  query GET_ORDER_INVOICES($orderNumber: String!) {
    customer {
      orders(
        filter: { number: { eq: $orderNumber } }
        currentPage: 1
        pageSize: 1
      ) {
        items {
          number

          invoices {
            __typename
            id
            number
            status

            comments {
              __typename
              timestamp
              message
            }

            items {
              __typename
              id
              product_name
              product_sku
              quantity_invoiced
              product_sale_price {
                value
                currency
              }
              tax_amount {
                value
                currency
              }
              row_total {
                value
                currency
              }
              discounts {
                amount {
                  value
                  currency
                }
                label
              }
            }

            total {
              __typename
              subtotal {
                value
                currency
              }
              grand_total {
                value
                currency
              }
              base_grand_total {
                value
                currency
              }
              taxes {
                amount {
                  value
                  currency
                }
                rate
                title
              }
              shipping_handling {
                total_amount {
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
          }
        }
      }
    }
  }
`,ne=async n=>await T(yt,{method:"GET",cache:"no-cache",variables:{orderNumber:n}}).then(t=>{var u,i,c,r;const e=((r=(c=(i=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:i.orders)==null?void 0:c.items)==null?void 0:r[0])??null;return ct(e)}).catch(y),ht=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      order_cancellation_enabled
      order_cancellation_reasons {
        description
      }
      base_media_url
      orders_invoices_credit_memos_display_price
      orders_invoices_credit_memos_display_shipping_amount
      orders_invoices_credit_memos_display_subtotal
      orders_invoices_credit_memos_display_grandtotal
      orders_invoices_credit_memos_display_full_summary
      orders_invoices_credit_memos_display_zero_tax
      sales_printed_card
      sales_gift_wrapping
    }
  }
`,te=async()=>T(ht,{method:"GET",cache:"force-cache"}).then(({errors:n,data:t})=>n?f(n):lt(t.storeConfig)),Ot=`
  query ORDER_BY_TOKEN($token: String!) {
    guestOrderByToken(input: { token: $token }) {
      ...GUEST_ORDER_FRAGMENT
      returns(pageSize: 50) {
        ...RETURNS_FRAGMENT
      }
    }
  }
  ${z}
  ${j}
`,bt=async(n,t)=>await T(Ot,{method:"GET",cache:"no-cache",variables:{token:n}}).then(e=>{var u;return(u=e.errors)!=null&&u.length&&e.errors[0].message==="Please login to view the order."?f(e.errors):it(e,t)}).catch(y),mt="orderData",rn=async n=>{var r;const t=typeof(n==null?void 0:n.orderRef)=="string"?n==null?void 0:n.orderRef:"",e=typeof(n==null?void 0:n.returnRef)=="string"?n==null?void 0:n.returnRef:"",u=t&&typeof(n==null?void 0:n.orderRef)=="string"&&((r=n==null?void 0:n.orderRef)==null?void 0:r.length)>20,i=(n==null?void 0:n.orderData)??null;if(i){h.emit("order/data",{...i,returnNumber:e});return}if(!t)return;const c=u?await bt(t,e):await ft({orderId:t,returnRef:e,queryType:mt});c?h.emit("order/data",{...c,returnNumber:e}):h.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},ln={setHref:n=>{window.location.href=n}},Nt=(n,t,e)=>{if(typeof n!="function")return;const u=n(e);if(!t||Object.keys(t).length===0){ln.setHref(u);return}const i=new URLSearchParams;Object.entries(t).forEach(([r,l])=>{i.append(r,String(l))});const c=u.includes("?")?"&":"?";ln.setHref(`${u}${c}${i.toString()}`)},J=new $n({init:async n=>{const t={};J.config.setConfig({...t,...n}),rn(n).catch(e=>console.error(e))},listeners:()=>[h.on("companyContext/changed",async()=>{const n=J.config.getConfig(),{orderRef:t,returnRef:e,routeOrdersList:u=()=>"/customer/orders"}=n;if(!t)return;const i=()=>{c==null||c.off(),r==null||r.off()},c=h.on("order/data",()=>{i()}),r=h.on("order/error",l=>{(l==null?void 0:l.type)==="network"&&Nt(u),i()});await rn({orderRef:t,returnRef:e,orderData:null})})]}),b=J.config,V={SHOPPING_CART_CONTEXT:"shoppingCartContext",ORDER_CONTEXT:"orderContext",CHANNEL_CONTEXT:"channelContext",PERSONAL_EMAIL_CONTEXT:"personalEmail"},vt={PLACE_ORDER:"place-order"};function mn(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function W(n,t){const e=mn();e.push({[n]:null}),e.push({[n]:t})}function At(n){mn().push(e=>{const u=e.getState?e.getState():{};e.push({event:n,eventInfo:{...u}})})}function St(){return{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"}}function Ct(){W(V.CHANNEL_CONTEXT,St())}function I(n,t){const e=Ln(t),u=Fn(n,t);W(V.ORDER_CONTEXT,{...e}),W(V.SHOPPING_CART_CONTEXT,{...u}),W(V.PERSONAL_EMAIL_CONTEXT,{address:t.email}),Ct(),At(vt.PLACE_ORDER)}class Gt extends Error{constructor(t){super(t),this.name="PlaceOrderError"}}const Y=n=>{const t=n.map(e=>e.message).join(" ");throw new Gt(t)},Nn=n=>{var e;const t=(e=h.lastPayload("cart/data"))==null?void 0:e.id;t&&t!==n||h.emit("cart/reset",void 0)},Mt=`
  mutation PLACE_ORDER_MUTATION($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${Rn}
`,vn=async()=>{const n=await An();n&&_t("X-ReCaptcha",n)},ee=async n=>{if(!n)throw new Error("No cart ID found");return await vn(),T(Mt,{method:"POST",variables:{cartId:n}}).then(t=>{var u,i,c,r,l,a;(u=t.errors)!=null&&u.length&&f(t.errors),(r=(c=(i=t.data)==null?void 0:i.placeOrder)==null?void 0:c.errors)!=null&&r.length&&Y((l=t.data.placeOrder)==null?void 0:l.errors),(a=t.data)!=null&&a.placeOrder||Y([{message:"An unexpected error occurred while placing the order. Please try again later."}]);const e=bn(t);return e&&(h.emit("order/placed",e),Nn(n),I(n,e)),e}).catch(y)},Ut=`
  mutation REORDER_ITEMS_MUTATION($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
      cart {
        itemsV2 {
          items {
            uid
          }
        }
      }
      userInputErrors {
        code
        message
        path
      }
    }
  }
`,ue=async n=>await T(Ut,{method:"POST",variables:{orderNumber:n}}).then(t=>{var i,c,r,l,a,_;if((i=t.errors)!=null&&i.length)return f(t.errors);const e=!!((l=(r=(c=t==null?void 0:t.data)==null?void 0:c.reorderItems)==null?void 0:r.cart)!=null&&l.itemsV2.items.length),u=((_=(a=t==null?void 0:t.data)==null?void 0:a.reorderItems)==null?void 0:_.userInputErrors)??[];return{success:e,userInputErrors:u}}).catch(y),xt=`
  mutation REQUEST_GUEST_ORDER_CANCEL_MUTATION(
    $token: String!
    $reason: String!
  ) {
    requestGuestOrderCancel(input: { token: $token, reason: $reason }) {
      error
      order {
        ...GUEST_ORDER_FRAGMENT
      }
    }
  }
  ${z}
`,ie=async(n,t,e,u)=>{if(!n)throw new Error("No order token found");if(!t)throw new Error("No reason found");return T(xt,{variables:{token:n,reason:t}}).then(({errors:i,data:c})=>{if(i)return f(i);c.requestGuestOrderCancel.error!=null&&u();const r=v(c.requestGuestOrderCancel.order);e(r)}).catch(()=>u())},$t=`
  mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
    requestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${d}
`,ce=async n=>{const t=B(n,"snakeCase",{});return await T($t,{method:"POST",variables:{input:t}}).then(e=>{var u;return(u=e.errors)!=null&&u.length?f(e.errors):at(e)}).catch(y)},wt=`
  mutation REQUEST_RETURN_GUEST_ORDER($input: RequestGuestReturnInput!) {
    requestGuestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${d}
`,re=async n=>{const t=B(n,"snakeCase",{});return await T(wt,{method:"POST",variables:{input:t}}).then(e=>{var c;if((c=e.errors)!=null&&c.length)return f(e.errors);const{created_at:u,...i}=e.data.requestGuestReturn.return;return{...i,createdAt:u}}).catch(y)},qt=`
  mutation CONFIRM_RETURN_GUEST_ORDER(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmReturn(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
        order {
          ...GUEST_ORDER_FRAGMENT
        }
      }
    }
  }
  ${d}
  ${z}
`,le=async(n,t)=>await T(qt,{method:"POST",variables:{orderId:n,confirmationKey:t}}).then(e=>{var u,i,c,r,l,a,_;if((u=e.errors)!=null&&u.length)return f(e.errors);if((r=(c=(i=e==null?void 0:e.data)==null?void 0:i.confirmReturn)==null?void 0:c.return)!=null&&r.order){const o=v((_=(a=(l=e==null?void 0:e.data)==null?void 0:l.confirmReturn)==null?void 0:a.return)==null?void 0:_.order);return h.emit("order/data",o),o}return null}).catch(y),Ft=`
  mutation CONFIRM_CANCEL_ORDER_MUTATION(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmCancelOrder(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      order {
        ...GUEST_ORDER_FRAGMENT
      }
      errorV2 {
        message
        code
      }
    }
  }
  ${z}
`,ae=async(n,t)=>T(Ft,{variables:{orderId:n,confirmationKey:t}}).then(async({errors:e,data:u})=>{var r,l,a,_;const i=[...(r=u==null?void 0:u.confirmCancelOrder)!=null&&r.errorV2?[(l=u==null?void 0:u.confirmCancelOrder)==null?void 0:l.errorV2]:[],...e??[]];let c=null;return(a=u==null?void 0:u.confirmCancelOrder)!=null&&a.order&&(c=v((_=u==null?void 0:u.confirmCancelOrder)==null?void 0:_.order),h.emit("order/data",c)),i.length>0?f(i):c}),Lt=`
  mutation setPaymentMethodAndPlaceOrder(
    $cartId: String!
    $paymentMethod: PaymentMethodInput!
  ) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: $paymentMethod }
    ) {
      cart {
        selected_payment_method {
          code
          title
        }
      }
    }
    placeOrder(input: { cart_id: $cartId }) {
      ...PLACE_ORDER_FRAGMENT
    }
  }

  ${Rn}
`,_e=async(n,t)=>{if(!n)throw new Error("No cart ID found");if(!t)throw new Error("No payment method found");return T(Lt,{variables:{cartId:n,paymentMethod:t}}).then(e=>{var i,c,r,l,a,_;(i=e.errors)!=null&&i.length&&f(e.errors),(l=(r=(c=e.data)==null?void 0:c.placeOrder)==null?void 0:r.errors)!=null&&l.length&&Y((a=e.data.placeOrder)==null?void 0:a.errors);const u=bn({data:{placeOrder:(_=e.data)==null?void 0:_.placeOrder}});return u&&(h.emit("order/placed",u),Nn(n),I(n,u)),u}).catch(y)},Pt=`
  mutation PLACE_NEGOTIABLE_QUOTE_ORDER_MUTATION($quoteUid: ID!) {
    placeNegotiableQuoteOrderV2(input: { quote_uid: $quoteUid }) {
      ...PLACE_NEGOTIABLE_QUOTE_ORDER_FRAGMENT
    }
  }

  ${xn}
`,oe=async n=>{if(!n)throw new Error("No quote UID found");return await vn(),T(Pt,{method:"POST",variables:{quoteUid:n}}).then(t=>{var u,i,c,r,l;(u=t.errors)!=null&&u.length&&f(t.errors),(r=(c=(i=t.data)==null?void 0:i.placeNegotiableQuoteOrderV2)==null?void 0:c.errors)!=null&&r.length&&Y((l=t.data.placeNegotiableQuoteOrderV2)==null?void 0:l.errors);const e=rt(t);return e&&(h.emit("order/placed",e),I(n,e)),e}).catch(y)};export{gn as c,Wt as cancelOrder,b as config,ae as confirmCancelOrder,le as confirmGuestReturn,T as fetchGraphQl,Dt as getAttributesForm,Zt as getAttributesList,Xt as getConfig,Jt as getCustomer,dt as getCustomerOrdersReturn,It as getGuestOrder,ft as getOrderDetailsById,ne as getOrderInvoices,te as getStoreConfig,bt as guestOrderByToken,J as initialize,oe as placeNegotiableQuoteOrder,ee as placeOrder,Nt as r,jt as removeFetchGraphQlHeader,ue as reorderItems,ie as requestGuestOrderCancel,re as requestGuestReturn,ce as requestReturn,Yt as setEndpoint,_t as setFetchGraphQlHeader,Kt as setFetchGraphQlHeaders,_e as setPaymentMethodAndPlaceOrder,Vt as t};
//# sourceMappingURL=api.js.map
