import{a as F}from"./convertCase.js";const H=`
  fragment ProductDetails on ProductInterface {
    __typename
    canonical_url
    uid
    name
    sku
    only_x_left_in_stock
    stock_status
    thumbnail {
      label
      url
    }
    price_range {
      maximum_price {
        regular_price {
          currency
          value
        }
      }
    }
  }
`,J=`
  fragment PriceDetails on OrderItemInterface {
    prices {
      price_including_tax {
        value
        currency
      }
      original_price {
        value
        currency
      }
      original_price_including_tax {
        value
        currency
      }
      price {
        value
        currency
      }
    }
  }
`,V=`
  fragment GiftCardDetails on GiftCardOrderItem {
    ...PriceDetails
    gift_message {
      message
    }
    gift_card {
      recipient_name
      recipient_email
      sender_name
      sender_email
      message
    }
  }
`,W=`
  fragment OrderItemDetails on OrderItemInterface {
    __typename
    status
    product_name
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_returned
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...ProductDetails
    }
    ...PriceDetails
  }
`,X=`
  fragment BundleOrderItemDetails on BundleOrderItem {
    ...PriceDetails
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,j=n=>n||0,k=n=>{var a,l,i;return{...n,canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((l=n==null?void 0:n.thumbnail)==null?void 0:l.label)||"",url:((i=n==null?void 0:n.thumbnail)==null?void 0:i.url)||""}}},w=n=>{if(!n||!("selected_options"in n))return;const a={};for(const l of n.selected_options)a[l.label]=l.value;return a},Q=n=>{const a=n==null?void 0:n.map(i=>({uid:i.uid,label:i.label,values:i.values.map(c=>c.product_name).join(", ")})),l={};return a==null||a.forEach(i=>{l[i.label]=i.values}),Object.keys(l).length>0?l:null},U=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(a=>a.title).join(", ")}:null,e=n=>n==null?void 0:n.filter(a=>a.__typename).map(a=>{var l,i,c,u,_,s,p,y,g,f,b,v,O,t,q,h,E,D,T,N,R,C,P,A,x,G,L,S,M,B;return{type:a==null?void 0:a.__typename,productName:a.product_name,quantityCanceled:(a==null?void 0:a.quantity_canceled)||0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)||0,quantityOrdered:(a==null?void 0:a.quantity_ordered)||0,quantityRefunded:(a==null?void 0:a.quantity_refunded)||0,quantityReturned:(a==null?void 0:a.quantity_returned)||0,quantityShipped:(a==null?void 0:a.quantity_shipped)||0,id:a==null?void 0:a.id,discounted:((u=(c=(i=(l=a==null?void 0:a.product)==null?void 0:l.price_range)==null?void 0:i.maximum_price)==null?void 0:c.regular_price)==null?void 0:u.value)*(a==null?void 0:a.quantity_ordered)!==((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered),total:{value:((s=a==null?void 0:a.product_sale_price)==null?void 0:s.value)*(a==null?void 0:a.quantity_ordered)||0,currency:((p=a==null?void 0:a.product_sale_price)==null?void 0:p.currency)||""},totalInclTax:{value:((y=a==null?void 0:a.product_sale_price)==null?void 0:y.value)*(a==null?void 0:a.quantity_ordered)||0,currency:(g=a==null?void 0:a.product_sale_price)==null?void 0:g.currency},price:{value:((f=a==null?void 0:a.product_sale_price)==null?void 0:f.value)||0,currency:(b=a==null?void 0:a.product_sale_price)==null?void 0:b.currency},priceInclTax:{value:((v=a==null?void 0:a.product_sale_price)==null?void 0:v.value)||0,currency:(O=a==null?void 0:a.product_sale_price)==null?void 0:O.currency},totalQuantity:j(a==null?void 0:a.quantity_ordered),regularPrice:{value:(E=(h=(q=(t=a==null?void 0:a.product)==null?void 0:t.price_range)==null?void 0:q.maximum_price)==null?void 0:h.regular_price)==null?void 0:E.value,currency:(R=(N=(T=(D=a==null?void 0:a.product)==null?void 0:D.price_range)==null?void 0:T.maximum_price)==null?void 0:N.regular_price)==null?void 0:R.currency},product:k(a==null?void 0:a.product),thumbnail:{label:((P=(C=a==null?void 0:a.product)==null?void 0:C.thumbnail)==null?void 0:P.label)||"",url:((x=(A=a==null?void 0:a.product)==null?void 0:A.thumbnail)==null?void 0:x.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((G=a.gift_card)==null?void 0:G.sender_name)||"",senderEmail:((L=a.gift_card)==null?void 0:L.sender_email)||"",recipientEmail:((S=a.gift_card)==null?void 0:S.recipient_email)||"",recipientName:((M=a.gift_card)==null?void 0:M.recipient_name)||"",message:((B=a.gift_card)==null?void 0:B.message)||""}:void 0,configurableOptions:w(a),bundleOptions:a.__typename==="BundleOrderItem"?Q(a.bundle_options):null,itemPrices:a.prices,downloadableLinks:a.__typename==="DownloadableOrderItem"?U(a==null?void 0:a.downloadable_links):null}}),K=n=>{var y,g,f,b,v;const a=e(n.items),{total:l,...i}=F({...n,items:a},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),c=(y=n==null?void 0:n.payment_methods)==null?void 0:y[0],u=(c==null?void 0:c.type)||"",_=(c==null?void 0:c.name)||"",s=(g=i==null?void 0:i.items)==null?void 0:g.reduce((O,t)=>O+(t==null?void 0:t.totalQuantity),0);return{...l,...i,totalQuantity:s,shipping:{amount:((f=i==null?void 0:i.total)==null?void 0:f.totalShipping.value)??0,currency:((v=(b=i.total)==null?void 0:b.totalShipping)==null?void 0:v.currency)||"",code:i.shippingMethod??""},payments:[{code:u,name:_}]}},Y=(n,a)=>{var l,i,c,u,_,s,p;if((u=(c=(i=(l=a==null?void 0:a.data)==null?void 0:l.customer)==null?void 0:i.orders)==null?void 0:c.items)!=null&&u.length&&n==="orderData"){const y=(p=(s=(_=a==null?void 0:a.data)==null?void 0:_.customer)==null?void 0:s.orders)==null?void 0:p.items[0];return K(y)}return null};export{X as B,V as G,W as O,H as P,J as a,Y as b,e as c,K as t};
