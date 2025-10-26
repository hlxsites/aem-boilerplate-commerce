/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as yn}from"@dropins/tools/fetch-graphql.js";import{events as un}from"@dropins/tools/event-bus.js";const $=l=>{const u=l.map(v=>v.message).join(" ");throw Error(u)},k=l=>{const u=l instanceof DOMException&&l.name==="AbortError",v=l.name==="PlaceOrderError";throw!u&&!v&&un.emit("purchase-order/error",{source:"purchase-order",type:"network",error:l.message}),l},C=l=>{if(l==null||typeof l!="object")return l;if(Array.isArray(l))return l.map(C);const u={};for(const[v,c]of Object.entries(l)){const r=v.replace(/[A-Z]/g,s=>`_${s.toLowerCase()}`);u[r]=C(c)}return u},{setEndpoint:sn,setFetchGraphQlHeader:En,removeFetchGraphQlHeader:Sn,setFetchGraphQlHeaders:Rn,fetchGraphQl:H,getConfig:An}=new yn().getMethods(),Q=l=>{var v,c,r,s,S,g,o,w,D,P;return{typename:(l==null?void 0:l.__typename)??"",uid:(l==null?void 0:l.uid)??"",number:(l==null?void 0:l.number)??"",status:(l==null?void 0:l.status)??"",availableActions:(l==null?void 0:l.available_actions)??[],approvalFlow:l!=null&&l.approval_flow?{ruleName:((v=l==null?void 0:l.approval_flow)==null?void 0:v.rule_name)??"",events:((r=(c=l==null?void 0:l.approval_flow)==null?void 0:c.events)==null?void 0:r.map(_=>({message:(_==null?void 0:_.message)??"",name:(_==null?void 0:_.name)??"",role:(_==null?void 0:_.role)??"",status:(_==null?void 0:_.status)??"",updatedAt:(_==null?void 0:_.updated_at)??""})))??[]}:null,comments:((s=l==null?void 0:l.comments)==null?void 0:s.map(_=>{var I,x,F;return{createdAt:(_==null?void 0:_.created_at)??"",author:{firstname:((I=_==null?void 0:_.author)==null?void 0:I.firstname)??"",lastname:((x=_==null?void 0:_.author)==null?void 0:x.lastname)??"",email:((F=_==null?void 0:_.author)==null?void 0:F.email)??""},text:(_==null?void 0:_.text)??""}}))??[],createdAt:(l==null?void 0:l.created_at)??"",updatedAt:(l==null?void 0:l.updated_at)??"",createdBy:{firstname:((S=l==null?void 0:l.created_by)==null?void 0:S.firstname)??"",lastname:((g=l==null?void 0:l.created_by)==null?void 0:g.lastname)??"",email:((o=l==null?void 0:l.created_by)==null?void 0:o.email)??""},historyLog:((w=l==null?void 0:l.history_log)==null?void 0:w.map(_=>({activity:(_==null?void 0:_.activity)??"",createdAt:(_==null?void 0:_.created_at)??"",message:(_==null?void 0:_.message)??"",uid:(_==null?void 0:_.uid)??""})))??[],quote:gn(l==null?void 0:l.quote),order:{id:((D=l==null?void 0:l.order)==null?void 0:D.id)??"",orderNumber:((P=l==null?void 0:l.order)==null?void 0:P.number)??""}}};function gn(l){var B,j,K,J,M,X,Z,Y,h,p,q,O,d;if(!l)return null;const u=n=>n||0,v=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),c=n=>{var t,f,m,E;const{firstName:a,lastName:e,middleName:i}=v(n);return{firstName:a,lastName:e,middleName:i,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((t=n==null?void 0:n.country)==null?void 0:t.label)??"",countryCode:((f=n==null?void 0:n.country)==null?void 0:f.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((m=n==null?void 0:n.region)==null?void 0:m.label)??"",regionId:((E=n==null?void 0:n.region)==null?void 0:E.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},r=n=>{var a,e,i,t,f,m,E,R,A,U;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((i=(e=(a=n==null?void 0:n.price_range)==null?void 0:a.maximum_price)==null?void 0:e.regular_price)==null?void 0:i.currency)??"",value:((m=(f=(t=n==null?void 0:n.price_range)==null?void 0:t.maximum_price)==null?void 0:f.regular_price)==null?void 0:m.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((E=n==null?void 0:n.image)==null?void 0:E.url)||"",imageAlt:((R=n==null?void 0:n.image)==null?void 0:R.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((A=n==null?void 0:n.thumbnail)==null?void 0:A.label)||"",url:((U=n==null?void 0:n.thumbnail)==null?void 0:U.url)||""}}},s=n=>{if(!n||!("configurable_options"in n))return;const a={};for(const e of n.configurable_options)a[e.option_label]=e.value_label;return a},S=n=>{const a=n==null?void 0:n.map(i=>({uid:i.uid,label:i.label,values:i.values.map(t=>t.product_name).join(", ")})),e={};return a==null||a.forEach(i=>{e[i.label]=i.values}),Object.keys(e).length>0?e:null},g=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,o=n=>{var a,e,i,t,f;return{senderName:((a=n==null?void 0:n.gift_card)==null?void 0:a.sender_name)||"",senderEmail:((e=n==null?void 0:n.gift_card)==null?void 0:e.sender_email)||"",recipientEmail:((i=n==null?void 0:n.gift_card)==null?void 0:i.recipient_email)||"",recipientName:((t=n==null?void 0:n.gift_card)==null?void 0:t.recipient_name)||"",message:((f=n==null?void 0:n.gift_card)==null?void 0:f.message)||""}},w=n=>{var a,e,i;return{senderName:((a=n==null?void 0:n.gift_message)==null?void 0:a.from)??"",recipientName:((e=n==null?void 0:n.gift_message)==null?void 0:e.to)??"",message:((i=n==null?void 0:n.gift_message)==null?void 0:i.message)??""}},D=n=>{var a,e,i,t,f,m,E,R,A,U,G;return{design:((a=n==null?void 0:n.gift_wrapping)==null?void 0:a.design)??"",uid:((e=n==null?void 0:n.gift_wrapping)==null?void 0:e.uid)??"",selected:!!((i=n==null?void 0:n.gift_wrapping)!=null&&i.uid),image:{url:((f=(t=n==null?void 0:n.gift_wrapping)==null?void 0:t.image)==null?void 0:f.url)??"",label:((E=(m=n==null?void 0:n.gift_wrapping)==null?void 0:m.image)==null?void 0:E.label)??""},price:{currency:((A=(R=n==null?void 0:n.gift_wrapping)==null?void 0:R.price)==null?void 0:A.currency)??"USD",value:((G=(U=n==null?void 0:n.gift_wrapping)==null?void 0:U.price)==null?void 0:G.value)??0}}},P=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),_=(n,a)=>{const e=n==null?void 0:n.price,i=n==null?void 0:n.priceIncludingTax,t=n==null?void 0:n.originalPrice,f=!1,m=f?t==null?void 0:t.value:i==null?void 0:i.value,E={originalPrice:t,baseOriginalPrice:{value:m,currency:t==null?void 0:t.currency},baseDiscountedPrice:{value:i==null?void 0:i.value,currency:i==null?void 0:i.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},R={originalPrice:t,baseOriginalPrice:{value:t==null?void 0:t.value,currency:i==null?void 0:i.currency},baseDiscountedPrice:{value:a==null?void 0:a.value,currency:e==null?void 0:e.currency},baseExcludingTax:{value:e==null?void 0:e.value,currency:e==null?void 0:e.currency}},A={singleItemPrice:{value:f?t.value:i.value,currency:i.currency},baseOriginalPrice:{value:m,currency:i.currency},baseDiscountedPrice:{value:i.value,currency:i.currency}};return{includeAndExcludeTax:E,excludeTax:R,includeTax:A}},I=n=>{var E,R,A,U,G,nn,ln,an,en,_n,rn;const a=n==null?void 0:n.product,e=n==null?void 0:n.prices,i=u(n==null?void 0:n.quantity),t={price:(e==null?void 0:e.price)??{value:0,currency:"USD"},priceIncludingTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},originalPrice:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(e==null?void 0:e.original_item_price)??{value:0,currency:"USD"},discounts:(e==null?void 0:e.discounts)??[]},f=(((E=e==null?void 0:e.original_item_price)==null?void 0:E.value)??0)>(((R=e==null?void 0:e.price)==null?void 0:R.value)??0),m=(e==null?void 0:e.price)??{value:0,currency:"USD"};return{giftMessage:w(n),giftWrappingPrice:P((A=n==null?void 0:n.gift_wrapping)==null?void 0:A.price),productGiftWrapping:[D(n)],taxCalculations:_(t,m),productSalePrice:m,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(a==null?void 0:a.sku)??"",type:(a==null?void 0:a.__typename)??"",discounted:f,id:(n==null?void 0:n.uid)??"",productName:(a==null?void 0:a.name)??"",productUrlKey:(a==null?void 0:a.url_key)??"",regularPrice:{value:((nn=(G=(U=a==null?void 0:a.price_range)==null?void 0:U.maximum_price)==null?void 0:G.regular_price)==null?void 0:nn.value)??0,currency:((en=(an=(ln=a==null?void 0:a.price_range)==null?void 0:ln.maximum_price)==null?void 0:an.regular_price)==null?void 0:en.currency)??"USD"},price:m,product:r(a),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((_n=a==null?void 0:a.thumbnail)==null?void 0:_n.label)||"",url:((rn=a==null?void 0:a.thumbnail)==null?void 0:rn.url)||""},downloadableLinks:(a==null?void 0:a.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?g(n.downloadable_links):null,prices:t,itemPrices:t,bundleOptions:(a==null?void 0:a.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?S(n.bundle_options):null,totalInclTax:(e==null?void 0:e.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(e==null?void 0:e.price_including_tax)??{value:0,currency:"USD"},total:(e==null?void 0:e.row_total)??{value:0,currency:"USD"},configurableOptions:(a==null?void 0:a.__typename)==="ConfigurableProduct"?s(n):void 0,giftCard:(a==null?void 0:a.__typename)==="GiftCardProduct"?o(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:i,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:i,returnableQuantity:0,quantityReturnRequested:0}},x=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),F=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,i;return{code:(a==null?void 0:a.code)??"",appliedBalance:{value:((e=a==null?void 0:a.applied_balance)==null?void 0:e.value)??0,currency:((i=a==null?void 0:a.applied_balance)==null?void 0:i.currency)??"USD"}}}),tn=(n=[])=>!n||n.length===0?[]:n.map(a=>{var e,i;return{amount:{value:((e=a==null?void 0:a.amount)==null?void 0:e.value)??0,currency:((i=a==null?void 0:a.amount)==null?void 0:i.currency)??"USD"},rate:(a==null?void 0:a.rate)??0,title:(a==null?void 0:a.title)??(a==null?void 0:a.label)??""}}),T=(B=l==null?void 0:l.shipping_addresses)==null?void 0:B[0],z=l==null?void 0:l.billing_address,b=T==null?void 0:T.selected_shipping_method,N=l==null?void 0:l.selected_payment_method,y=l==null?void 0:l.prices,L=((K=(j=l==null?void 0:l.itemsV2)==null?void 0:j.items)==null?void 0:K.map(I))??[],cn=L.reduce((n,a)=>n+a.totalQuantity,0),V=b?`${b.carrier_title??""} - ${b.method_title??""}`.trim():"";return{giftReceiptIncluded:(l==null?void 0:l.gift_receipt_included)??!1,printedCardIncluded:(l==null?void 0:l.printed_card_included)??!1,giftWrappingOrder:{price:{value:((M=(J=l==null?void 0:l.gift_wrapping)==null?void 0:J.price)==null?void 0:M.value)??0,currency:((Z=(X=l==null?void 0:l.gift_wrapping)==null?void 0:X.price)==null?void 0:Z.currency)??"USD"},uid:((Y=l==null?void 0:l.gift_wrapping)==null?void 0:Y.uid)??""},placeholderImage:"",returnNumber:void 0,id:(l==null?void 0:l.id)??"",orderStatusChangeDate:void 0,number:"",email:(l==null?void 0:l.email)??"",token:void 0,status:"pending",isVirtual:(l==null?void 0:l.is_virtual)??!1,totalQuantity:cn,shippingMethod:V,carrier:(b==null?void 0:b.carrier_code)??"",orderDate:"",returns:[],discounts:(y==null?void 0:y.discounts)??[],coupons:(l==null?void 0:l.applied_coupons)??[],payments:[{code:(N==null?void 0:N.code)??"",name:(N==null?void 0:N.title)??""}],shipping:{code:V,amount:((h=b==null?void 0:b.amount)==null?void 0:h.value)??0,currency:((p=b==null?void 0:b.amount)==null?void 0:p.currency)??"USD"},shipments:[],items:L,totalGiftCard:{value:0,currency:"USD"},grandTotal:(y==null?void 0:y.grand_total)??{value:0,currency:"USD"},totalShipping:(b==null?void 0:b.amount)??{value:0,currency:"USD"},subtotalExclTax:(y==null?void 0:y.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(y==null?void 0:y.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((q=y==null?void 0:y.grand_total)==null?void 0:q.value)??0)-(((O=y==null?void 0:y.grand_total_excluding_tax)==null?void 0:O.value)??0),currency:((d=y==null?void 0:y.grand_total)==null?void 0:d.currency)??"USD"},shippingAddress:T?c(T):null,totalGiftOptions:x(y==null?void 0:y.gift_options),billingAddress:z?c(z):null,availableActions:[],taxes:tn(y==null?void 0:y.applied_taxes),appliedGiftCards:F(l==null?void 0:l.applied_gift_cards)}}const W=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
    approval_flow {
      rule_name
      events {
        message
        name
        role
        status
        updated_at
      }
    }
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
`,on=`
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
  ${W}
`,Un=async l=>{const u=Array.isArray(l)?l:[l];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return H(on,{variables:{input:{purchase_order_uids:u}}}).then(c=>{var s,S,g;(s=c.errors)!=null&&s.length&&$(c.errors);const r=(S=c.data)==null?void 0:S.approvePurchaseOrders;if(!r)throw new Error("Failed to approve purchase orders");return{errors:((r==null?void 0:r.errors)??[]).map(o=>({message:(o==null?void 0:o.message)??"",type:(o==null?void 0:o.type)??""})),purchaseOrders:((g=r==null?void 0:r.purchase_orders)==null?void 0:g.map(o=>Q(o)))??[]}}).catch(k)},fn=`
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
  ${W}
`,wn=async l=>{const u=Array.isArray(l)?l:[l];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(c=>!c||c.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return H(fn,{variables:{input:{purchase_order_uids:u}}}).then(c=>{var s,S;(s=c.errors)!=null&&s.length&&$(c.errors);const r=(S=c.data)==null?void 0:S.rejectPurchaseOrders;return{errors:((r==null?void 0:r.errors)??[]).map(g=>({message:(g==null?void 0:g.message)??"",type:(g==null?void 0:g.type)??""})),purchaseOrders:((r==null?void 0:r.purchase_orders)??[]).map(Q)}}).catch(k)},bn=`
  query GET_PURCHASE_ORDERS(
    $filter: PurchaseOrdersFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    customer {
      purchase_orders(
        filter: $filter
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
        items {
          ...PURCHASE_ORDERS_FRAGMENT
        }
      }
    }
  }
  ${W}
`,Dn=async(l,u=20,v=1)=>H(bn,{variables:{filter:C(l),pageSize:u,currentPage:v}}).then(c=>{var g,o,w,D,P,_,I,x;if((g=c.errors)!=null&&g.length&&$(c.errors),!((w=(o=c.data)==null?void 0:o.customer)!=null&&w.purchase_orders))throw new Error("Failed to get purchase orders");const r=(P=(D=c==null?void 0:c.data)==null?void 0:D.customer)==null?void 0:P.purchase_orders,s=(r==null?void 0:r.total_count)??0,S={currentPage:((_=r==null?void 0:r.page_info)==null?void 0:_.current_page)??1,pageSize:((I=r==null?void 0:r.page_info)==null?void 0:I.page_size)??20,totalPages:((x=r==null?void 0:r.page_info)==null?void 0:x.total_pages)??1};return{totalCount:s,pageInfo:S,purchaseOrderItems:((r==null?void 0:r.items)||[]).map(Q)}}).catch(k);export{W as P,Un as a,k as b,En as c,Sn as d,Rn as e,H as f,Dn as g,$ as h,An as i,wn as r,sn as s,Q as t};
//# sourceMappingURL=getPurchaseOrders.js.map
