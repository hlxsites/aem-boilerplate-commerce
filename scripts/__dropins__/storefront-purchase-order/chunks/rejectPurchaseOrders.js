/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as nn,h as ln}from"./fetch-graphql.js";import{h as an}from"./fetch-error.js";const _n=l=>{var A,c,g,o,S,v,m,I,N,T;return{typename:(l==null?void 0:l.__typename)??"",uid:(l==null?void 0:l.uid)??"",number:(l==null?void 0:l.number)??"",status:(l==null?void 0:l.status)??"",availableActions:(l==null?void 0:l.available_actions)??[],approvalFlow:l!=null&&l.approval_flow?{ruleName:((A=l==null?void 0:l.approval_flow)==null?void 0:A.rule_name)??"",events:((g=(c=l==null?void 0:l.approval_flow)==null?void 0:c.events)==null?void 0:g.map(y=>({message:(y==null?void 0:y.message)??"",name:(y==null?void 0:y.name)??"",role:(y==null?void 0:y.role)??"",status:(y==null?void 0:y.status)??"",updatedAt:(y==null?void 0:y.updated_at)??""})))??[]}:null,comments:((o=l==null?void 0:l.comments)==null?void 0:o.map(y=>{var G,F,k;return{createdAt:(y==null?void 0:y.created_at)??"",author:{firstname:((G=y==null?void 0:y.author)==null?void 0:G.firstname)??"",lastname:((F=y==null?void 0:y.author)==null?void 0:F.lastname)??"",email:((k=y==null?void 0:y.author)==null?void 0:k.email)??""},text:(y==null?void 0:y.text)??""}}))??[],createdAt:(l==null?void 0:l.created_at)??"",updatedAt:(l==null?void 0:l.updated_at)??"",createdBy:{firstname:((S=l==null?void 0:l.created_by)==null?void 0:S.firstname)??"",lastname:((v=l==null?void 0:l.created_by)==null?void 0:v.lastname)??"",email:((m=l==null?void 0:l.created_by)==null?void 0:m.email)??""},historyLog:((I=l==null?void 0:l.history_log)==null?void 0:I.map(y=>({activity:(y==null?void 0:y.activity)??"",createdAt:(y==null?void 0:y.created_at)??"",message:(y==null?void 0:y.message)??"",uid:(y==null?void 0:y.uid)??""})))??[],quote:cn(l==null?void 0:l.quote),order:{id:((N=l==null?void 0:l.order)==null?void 0:N.id)??"",orderNumber:((T=l==null?void 0:l.order)==null?void 0:T.number)??""}}};function cn(l){var W,H,$,j,V,B,L,J,K,z,X,Y,Z;if(!l)return null;const D=n=>n||0,A=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),c=n=>{var e,b,f,t;const{firstName:a,lastName:_,middleName:i}=A(n);return{firstName:a,lastName:_,middleName:i,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((e=n==null?void 0:n.country)==null?void 0:e.label)??"",countryCode:((b=n==null?void 0:n.country)==null?void 0:b.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((f=n==null?void 0:n.region)==null?void 0:f.label)??"",regionId:((t=n==null?void 0:n.region)==null?void 0:t.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},g=n=>{var a,_,i,e,b,f,t,U,E,R;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((i=(_=(a=n==null?void 0:n.price_range)==null?void 0:a.maximum_price)==null?void 0:_.regular_price)==null?void 0:i.currency)??"",value:((f=(b=(e=n==null?void 0:n.price_range)==null?void 0:e.maximum_price)==null?void 0:b.regular_price)==null?void 0:f.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((t=n==null?void 0:n.image)==null?void 0:t.url)||"",imageAlt:((U=n==null?void 0:n.image)==null?void 0:U.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((E=n==null?void 0:n.thumbnail)==null?void 0:E.label)||"",url:((R=n==null?void 0:n.thumbnail)==null?void 0:R.url)||""}}},o=n=>{if(!n||!("configurable_options"in n))return;const a={};for(const _ of n.configurable_options)a[_.option_label]=_.value_label;return a},S=n=>{const a=n==null?void 0:n.map(i=>({uid:i.uid,label:i.label,values:i.values.map(e=>e.product_name).join(", ")})),_={};return a==null||a.forEach(i=>{_[i.label]=i.values}),Object.keys(_).length>0?_:null},v=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,m=n=>{var a,_,i,e,b;return{senderName:((a=n==null?void 0:n.gift_card)==null?void 0:a.sender_name)||"",senderEmail:((_=n==null?void 0:n.gift_card)==null?void 0:_.sender_email)||"",recipientEmail:((i=n==null?void 0:n.gift_card)==null?void 0:i.recipient_email)||"",recipientName:((e=n==null?void 0:n.gift_card)==null?void 0:e.recipient_name)||"",message:((b=n==null?void 0:n.gift_card)==null?void 0:b.message)||""}},I=n=>{var a,_,i;return{senderName:((a=n==null?void 0:n.gift_message)==null?void 0:a.from)??"",recipientName:((_=n==null?void 0:n.gift_message)==null?void 0:_.to)??"",message:((i=n==null?void 0:n.gift_message)==null?void 0:i.message)??""}},N=n=>{var a,_,i,e,b,f,t,U,E,R,x;return{design:((a=n==null?void 0:n.gift_wrapping)==null?void 0:a.design)??"",uid:((_=n==null?void 0:n.gift_wrapping)==null?void 0:_.uid)??"",selected:!!((i=n==null?void 0:n.gift_wrapping)!=null&&i.uid),image:{url:((b=(e=n==null?void 0:n.gift_wrapping)==null?void 0:e.image)==null?void 0:b.url)??"",label:((t=(f=n==null?void 0:n.gift_wrapping)==null?void 0:f.image)==null?void 0:t.label)??""},price:{currency:((E=(U=n==null?void 0:n.gift_wrapping)==null?void 0:U.price)==null?void 0:E.currency)??"USD",value:((x=(R=n==null?void 0:n.gift_wrapping)==null?void 0:R.price)==null?void 0:x.value)??0}}},T=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),y=(n,a)=>{const _=n==null?void 0:n.price,i=n==null?void 0:n.priceIncludingTax,e=n==null?void 0:n.originalPrice,b=!1,f=b?e==null?void 0:e.value:i==null?void 0:i.value,t={originalPrice:e,baseOriginalPrice:{value:f,currency:e==null?void 0:e.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:i==null?void 0:i.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},U={originalPrice:e,baseOriginalPrice:{value:e==null?void 0:e.value,currency:i==null?void 0:i.currency},baseDiscountedPrice:{value:a==null?void 0:a.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},E={singleItemPrice:{value:b?e.value:i.value,currency:i.currency},baseOriginalPrice:{value:f,currency:i.currency},baseDiscountedPrice:{value:i.value,currency:i.currency}};return{includeAndExcludeTax:t,excludeTax:U,includeTax:E}},G=n=>{var t,U,E,R,x,M,h,p,q,O,d;const a=n==null?void 0:n.product,_=n==null?void 0:n.prices,i=D(n==null?void 0:n.quantity),e={price:(_==null?void 0:_.price)??{value:0,currency:"USD"},priceIncludingTax:(_==null?void 0:_.price_including_tax)??{value:0,currency:"USD"},originalPrice:(_==null?void 0:_.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(_==null?void 0:_.original_item_price)??{value:0,currency:"USD"},discounts:(_==null?void 0:_.discounts)??[]},b=(((t=_==null?void 0:_.original_item_price)==null?void 0:t.value)??0)>(((U=_==null?void 0:_.price)==null?void 0:U.value)??0),f=(_==null?void 0:_.price)??{value:0,currency:"USD"};return{giftMessage:I(n),giftWrappingPrice:T((E=n==null?void 0:n.gift_wrapping)==null?void 0:E.price),productGiftWrapping:[N(n)],taxCalculations:y(e,f),productSalePrice:f,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(a==null?void 0:a.sku)??"",type:(a==null?void 0:a.__typename)??"",discounted:b,id:(n==null?void 0:n.uid)??"",productName:(a==null?void 0:a.name)??"",productUrlKey:(a==null?void 0:a.url_key)??"",regularPrice:{value:((M=(x=(R=a==null?void 0:a.price_range)==null?void 0:R.maximum_price)==null?void 0:x.regular_price)==null?void 0:M.value)??0,currency:((q=(p=(h=a==null?void 0:a.price_range)==null?void 0:h.maximum_price)==null?void 0:p.regular_price)==null?void 0:q.currency)??"USD"},price:f,product:g(a),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((O=a==null?void 0:a.thumbnail)==null?void 0:O.label)||"",url:((d=a==null?void 0:a.thumbnail)==null?void 0:d.url)||""},downloadableLinks:(a==null?void 0:a.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?v(n.downloadable_links):null,prices:e,itemPrices:e,bundleOptions:(a==null?void 0:a.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?S(n.bundle_options):null,totalInclTax:(_==null?void 0:_.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(_==null?void 0:_.price_including_tax)??{value:0,currency:"USD"},total:(_==null?void 0:_.row_total)??{value:0,currency:"USD"},configurableOptions:(a==null?void 0:a.__typename)==="ConfigurableProduct"?o(n):void 0,giftCard:(a==null?void 0:a.__typename)==="GiftCardProduct"?m(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:i,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:i,returnableQuantity:0,quantityReturnRequested:0}},F=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),k=(n=[])=>!n||n.length===0?[]:n.map(a=>{var _,i;return{code:(a==null?void 0:a.code)??"",appliedBalance:{value:((_=a==null?void 0:a.applied_balance)==null?void 0:_.value)??0,currency:((i=a==null?void 0:a.applied_balance)==null?void 0:i.currency)??"USD"}}}),en=(n=[])=>!n||n.length===0?[]:n.map(a=>{var _,i;return{amount:{value:((_=a==null?void 0:a.amount)==null?void 0:_.value)??0,currency:((i=a==null?void 0:a.amount)==null?void 0:i.currency)??"USD"},rate:(a==null?void 0:a.rate)??0,title:(a==null?void 0:a.title)??(a==null?void 0:a.label)??""}}),P=(W=l==null?void 0:l.shipping_addresses)==null?void 0:W[0],s=l==null?void 0:l.billing_address,r=P==null?void 0:P.selected_shipping_method,w=l==null?void 0:l.selected_payment_method,u=l==null?void 0:l.prices,C=(($=(H=l==null?void 0:l.itemsV2)==null?void 0:H.items)==null?void 0:$.map(G))??[],un=C.reduce((n,a)=>n+a.totalQuantity,0),Q=r?`${r.carrier_title??""} - ${r.method_title??""}`.trim():"";return{giftReceiptIncluded:(l==null?void 0:l.gift_receipt_included)??!1,printedCardIncluded:(l==null?void 0:l.printed_card_included)??!1,giftWrappingOrder:{price:{value:((V=(j=l==null?void 0:l.gift_wrapping)==null?void 0:j.price)==null?void 0:V.value)??0,currency:((L=(B=l==null?void 0:l.gift_wrapping)==null?void 0:B.price)==null?void 0:L.currency)??"USD"},uid:((J=l==null?void 0:l.gift_wrapping)==null?void 0:J.uid)??""},placeholderImage:"",returnNumber:void 0,id:(l==null?void 0:l.id)??"",orderStatusChangeDate:void 0,number:"",email:(l==null?void 0:l.email)??"",token:void 0,status:"pending",isVirtual:(l==null?void 0:l.is_virtual)??!1,totalQuantity:un,shippingMethod:Q,carrier:(r==null?void 0:r.carrier_code)??"",orderDate:"",returns:[],discounts:(u==null?void 0:u.discounts)??[],coupons:(l==null?void 0:l.applied_coupons)??[],payments:[{code:(w==null?void 0:w.code)??"",name:(w==null?void 0:w.title)??""}],shipping:{code:Q,amount:((K=r==null?void 0:r.amount)==null?void 0:K.value)??0,currency:((z=r==null?void 0:r.amount)==null?void 0:z.currency)??"USD"},shipments:[],items:C,totalGiftCard:{value:0,currency:"USD"},grandTotal:(u==null?void 0:u.grand_total)??{value:0,currency:"USD"},totalShipping:(r==null?void 0:r.amount)??{value:0,currency:"USD"},subtotalExclTax:(u==null?void 0:u.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(u==null?void 0:u.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((X=u==null?void 0:u.grand_total)==null?void 0:X.value)??0)-(((Y=u==null?void 0:u.grand_total_excluding_tax)==null?void 0:Y.value)??0),currency:((Z=u==null?void 0:u.grand_total)==null?void 0:Z.currency)??"USD"},shippingAddress:P?c(P):null,totalGiftOptions:F(u==null?void 0:u.gift_options),billingAddress:s?c(s):null,availableActions:[],taxes:en(u==null?void 0:u.applied_taxes),appliedGiftCards:k(l==null?void 0:l.applied_gift_cards)}}const yn=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
    comments {
      created_at
      author {
        firstname
        lastname
        email
      }
      text
    }
    created_at
    updated_at
    created_by {
      firstname
      lastname
      email
    }
    history_log {
      activity
      created_at
      message
      uid
    }
    order {
      number
    }
    quote {
      id
      prices {
        grand_total {
          value
          currency
        }
      }
      itemsV2 {
        items {
          uid
          quantity
        }
      }
    }
  }
`,gn=`
  mutation APPROVE_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    approvePurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${yn}
`,vn=async l=>{const D=Array.isArray(l)?l:[l];if(!D||D.length===0)throw new Error("Purchase Order UID(s) are required");if(D.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return nn(gn,{variables:{input:{purchase_order_uids:D}}}).then(c=>{var o,S,v;(o=c.errors)!=null&&o.length&&an(c.errors);const g=(S=c.data)==null?void 0:S.approvePurchaseOrders;if(!g)throw new Error("Failed to approve purchase orders");return{errors:((g==null?void 0:g.errors)??[]).map(m=>({message:(m==null?void 0:m.message)??"",type:(m==null?void 0:m.type)??""})),purchaseOrders:((v=g==null?void 0:g.purchase_orders)==null?void 0:v.map(m=>_n(m)))??[]}}).catch(ln)},bn=`
  mutation REJECT_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    rejectPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${yn}
`,mn=async l=>{const D=Array.isArray(l)?l:[l];if(!D||D.length===0)throw new Error("Purchase Order UID(s) are required");if(D.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return nn(bn,{variables:{input:{purchase_order_uids:D}}}).then(c=>{var o,S;(o=c.errors)!=null&&o.length&&an(c.errors);const g=(S=c.data)==null?void 0:S.rejectPurchaseOrders;return{errors:((g==null?void 0:g.errors)??[]).map(v=>({message:(v==null?void 0:v.message)??"",type:(v==null?void 0:v.type)??""})),purchaseOrders:((g==null?void 0:g.purchase_orders)??[]).map(_n)}}).catch(ln)};export{yn as P,vn as a,mn as r,_n as t};
//# sourceMappingURL=rejectPurchaseOrders.js.map
