/*! Copyright 2024 Adobe
All Rights Reserved. */
import{merge as z,Initializer as na}from"@dropins/tools/lib.js";import{events as q}from"@dropins/tools/event-bus.js";import{a as ta,h as Y}from"./network-error.js";import{f as Q}from"./fetch-graphql.js";const K=`
  fragment ADDRESS_FRAGMENT on OrderAddress {
    city
    company
    country_code
    fax
    firstname
    lastname
    middlename
    postcode
    prefix
    region
    region_id
    street
    suffix
    telephone
    vat_id
  }
`,j=`
  fragment PRODUCT_DETAILS_FRAGMENT on ProductInterface {
    __typename
    canonical_url
    url_key
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
`,H=`
  fragment PRICE_DETAILS_FRAGMENT on OrderItemInterface {
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
`,J=`
  fragment GIFT_CARD_DETAILS_FRAGMENT on GiftCardOrderItem {
    ...PRICE_DETAILS_FRAGMENT
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
`,V=`
  fragment ORDER_ITEM_DETAILS_FRAGMENT on OrderItemInterface {
    __typename
    status
    product_sku
    eligible_for_return
    product_name
    product_url_key
    id
    quantity_ordered
    quantity_shipped
    quantity_canceled
    quantity_invoiced
    quantity_refunded
    quantity_return_requested
    product_sale_price {
      value
      currency
    }
    selected_options {
      label
      value
    }
    product {
      ...PRODUCT_DETAILS_FRAGMENT
    }
    ...PRICE_DETAILS_FRAGMENT
  }
`,W=`
  fragment BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT on BundleOrderItem {
    ...PRICE_DETAILS_FRAGMENT
    bundle_options {
      uid
      label
      values {
        uid
        product_name
      }
    }
  }
`,X=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    total_giftcard {
      currency
      value
    }
    subtotal_excl_tax {
      currency
      value
    }
    subtotal_incl_tax {
      currency
      value
    }
    taxes {
      amount {
        currency
        value
      }
      rate
      title
    }
    total_tax {
      currency
      value
    }
    total_shipping {
      currency
      value
    }
    discounts {
      amount {
        currency
        value
      }
      label
    }
  }
`,Z=`
  fragment RETURNS_FRAGMENT on Returns {
    __typename
    items {
      number
      status
      created_at
      shipping {
        tracking {
          status {
            text
            type
          }
          carrier {
            uid
            label
          }
          tracking_number
        }
      }
      order {
        number
        token
      }
      items {
        uid
        quantity
        status
        request_quantity
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
  }
`,_a=a=>a||0,ua=a=>{var n,t,_;return{...a,canonicalUrl:(a==null?void 0:a.canonical_url)||"",urlKey:(a==null?void 0:a.url_key)||"",id:(a==null?void 0:a.uid)||"",name:(a==null?void 0:a.name)||"",sku:(a==null?void 0:a.sku)||"",image:((n=a==null?void 0:a.image)==null?void 0:n.url)||"",productType:(a==null?void 0:a.__typename)||"",thumbnail:{label:((t=a==null?void 0:a.thumbnail)==null?void 0:t.label)||"",url:((_=a==null?void 0:a.thumbnail)==null?void 0:_.url)||""}}},ea=a=>{if(!a||!("selected_options"in a))return;const n={};for(const t of a.selected_options)n[t.label]=t.value;return n},ia=a=>{const n=a==null?void 0:a.map(_=>({uid:_.uid,label:_.label,values:_.values.map(e=>e.product_name).join(", ")})),t={};return n==null||n.forEach(_=>{t[_.label]=_.values}),Object.keys(t).length>0?t:null},sa=a=>(a==null?void 0:a.length)>0?{count:a.length,result:a.map(n=>n.title).join(", ")}:null,la=a=>({quantityCanceled:(a==null?void 0:a.quantity_canceled)??0,quantityInvoiced:(a==null?void 0:a.quantity_invoiced)??0,quantityOrdered:(a==null?void 0:a.quantity_ordered)??0,quantityRefunded:(a==null?void 0:a.quantity_refunded)??0,quantityReturned:(a==null?void 0:a.quantity_returned)??0,quantityShipped:(a==null?void 0:a.quantity_shipped)??0,quantityReturnRequested:(a==null?void 0:a.quantity_return_requested)??0}),I=a=>a==null?void 0:a.filter(n=>n.__typename).map(n=>{var E,c,r,O,d,g,N,M,A,D,u,y,T,p,S,o,f,G,h,F,C,L,k,U,B,$,P,x,m,w;const{quantityCanceled:t,quantityInvoiced:_,quantityOrdered:e,quantityRefunded:i,quantityReturned:s,quantityShipped:l,quantityReturnRequested:R}=la(n);return{type:n==null?void 0:n.__typename,eligibleForReturn:n==null?void 0:n.eligible_for_return,productSku:n==null?void 0:n.product_sku,productName:n.product_name,productUrlKey:n.product_url_key,quantityCanceled:t,quantityInvoiced:_,quantityOrdered:e,quantityRefunded:i,quantityReturned:s,quantityShipped:l,quantityReturnRequested:R,id:n==null?void 0:n.id,discounted:((O=(r=(c=(E=n==null?void 0:n.product)==null?void 0:E.price_range)==null?void 0:c.maximum_price)==null?void 0:r.regular_price)==null?void 0:O.value)*(n==null?void 0:n.quantity_ordered)!==((d=n==null?void 0:n.product_sale_price)==null?void 0:d.value)*(n==null?void 0:n.quantity_ordered),total:{value:((g=n==null?void 0:n.product_sale_price)==null?void 0:g.value)*(n==null?void 0:n.quantity_ordered)||0,currency:((N=n==null?void 0:n.product_sale_price)==null?void 0:N.currency)||""},totalInclTax:{value:((M=n==null?void 0:n.product_sale_price)==null?void 0:M.value)*(n==null?void 0:n.quantity_ordered)||0,currency:(A=n==null?void 0:n.product_sale_price)==null?void 0:A.currency},price:{value:((D=n==null?void 0:n.product_sale_price)==null?void 0:D.value)||0,currency:(u=n==null?void 0:n.product_sale_price)==null?void 0:u.currency},priceInclTax:{value:((y=n==null?void 0:n.product_sale_price)==null?void 0:y.value)||0,currency:(T=n==null?void 0:n.product_sale_price)==null?void 0:T.currency},totalQuantity:_a(n==null?void 0:n.quantity_ordered),regularPrice:{value:(f=(o=(S=(p=n==null?void 0:n.product)==null?void 0:p.price_range)==null?void 0:S.maximum_price)==null?void 0:o.regular_price)==null?void 0:f.value,currency:(C=(F=(h=(G=n==null?void 0:n.product)==null?void 0:G.price_range)==null?void 0:h.maximum_price)==null?void 0:F.regular_price)==null?void 0:C.currency},product:ua(n==null?void 0:n.product),thumbnail:{label:((k=(L=n==null?void 0:n.product)==null?void 0:L.thumbnail)==null?void 0:k.label)||"",url:((B=(U=n==null?void 0:n.product)==null?void 0:U.thumbnail)==null?void 0:B.url)||""},giftCard:(n==null?void 0:n.__typename)==="GiftCardOrderItem"?{senderName:(($=n.gift_card)==null?void 0:$.sender_name)||"",senderEmail:((P=n.gift_card)==null?void 0:P.sender_email)||"",recipientEmail:((x=n.gift_card)==null?void 0:x.recipient_email)||"",recipientName:((m=n.gift_card)==null?void 0:m.recipient_name)||"",message:((w=n.gift_card)==null?void 0:w.message)||""}:void 0,configurableOptions:ea(n),bundleOptions:n.__typename==="BundleOrderItem"?ia(n.bundle_options):null,itemPrices:n.prices,downloadableLinks:n.__typename==="DownloadableOrderItem"?sa(n==null?void 0:n.downloadable_links):null}}),v=(a,n)=>{var O,d,g,N,M,A,D,u,y;const t=I(a.items),_=((O=ra(a==null?void 0:a.returns))==null?void 0:O.ordersReturn)??[],e=n?_.filter(T=>T.returnNumber===n):_,{total:i,...s}=ta({...a,items:t,returns:e},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),l=(d=a==null?void 0:a.payment_methods)==null?void 0:d[0],R=(l==null?void 0:l.type)||"",E=(l==null?void 0:l.name)||"",c=(g=s==null?void 0:s.items)==null?void 0:g.reduce((T,p)=>T+(p==null?void 0:p.totalQuantity),0),r={...i,...s,totalQuantity:c,shipping:{amount:((N=i==null?void 0:i.totalShipping)==null?void 0:N.value)??0,currency:((M=i==null?void 0:i.totalShipping)==null?void 0:M.currency)||"",code:s.shippingMethod??""},payments:[{code:R,name:E}]};return z(r,(y=(u=(D=(A=b==null?void 0:b.getConfig())==null?void 0:A.models)==null?void 0:D.OrderDataModel)==null?void 0:u.transformer)==null?void 0:y.call(u,a))},ca=(a,n,t)=>{var _,e,i,s,l,R,E;if((s=(i=(e=(_=n==null?void 0:n.data)==null?void 0:_.customer)==null?void 0:e.orders)==null?void 0:i.items)!=null&&s.length&&a==="orderData"){const c=(E=(R=(l=n==null?void 0:n.data)==null?void 0:l.customer)==null?void 0:R.orders)==null?void 0:E.items[0];return v(c,t)}return null},ra=a=>{var i,s,l,R,E;if(!((i=a==null?void 0:a.items)!=null&&i.length))return null;const n=a==null?void 0:a.items,t=a==null?void 0:a.page_info,e={ordersReturn:[...n].sort((c,r)=>+r.number-+c.number).map(c=>{var A,D;const{order:r,status:O,number:d,created_at:g}=c,N=((D=(A=c==null?void 0:c.shipping)==null?void 0:A.tracking)==null?void 0:D.map(u=>{const{status:y,carrier:T,tracking_number:p}=u;return{status:y,carrier:T,trackingNumber:p}}))??[],M=c.items.map(u=>{var G;const y=u==null?void 0:u.quantity,T=u==null?void 0:u.status,p=u==null?void 0:u.request_quantity,S=u==null?void 0:u.uid,o=u==null?void 0:u.order_item,f=((G=I([o]))==null?void 0:G.reduce((h,F)=>F,{}))??{};return{uid:S,quantity:y,status:T,requestQuantity:p,...f}});return{createdReturnAt:g,returnStatus:O,token:r==null?void 0:r.token,orderNumber:r==null?void 0:r.number,returnNumber:d,items:M,tracking:N}}),...t?{pageInfo:{pageSize:t.page_size,totalPages:t.total_pages,currentPage:t.current_page}}:{}};return z(e,(E=(R=(l=(s=b==null?void 0:b.getConfig())==null?void 0:s.models)==null?void 0:l.CustomerOrdersReturnModel)==null?void 0:R.transformer)==null?void 0:E.call(R,{...n,...t}))},Ma=(a,n)=>{var _,e;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrder))return null;const t=(e=a==null?void 0:a.data)==null?void 0:e.guestOrder;return v(t,n)},Ra=(a,n)=>{var _,e;if(!((_=a==null?void 0:a.data)!=null&&_.guestOrderByToken))return null;const t=(e=a==null?void 0:a.data)==null?void 0:e.guestOrderByToken;return v(t,n)},Ea=`
  query ORDER_BY_NUMBER($orderNumber: String!, $pageSize: Int) {
    customer {
      orders(filter: { number: { eq: $orderNumber } }) {
        items {
          email
          available_actions
          status
          number
          id
          order_date
          order_status_change_date
          carrier
          shipping_method
          is_virtual
          returns(pageSize: $pageSize) {
            ...RETURNS_FRAGMENT
          }
          items_eligible_for_return {
            ...ORDER_ITEM_DETAILS_FRAGMENT
            ... on BundleOrderItem {
              ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
            }
            ... on GiftCardOrderItem {
              ...GIFT_CARD_DETAILS_FRAGMENT
              product {
                ...PRODUCT_DETAILS_FRAGMENT
              }
            }
            ... on DownloadableOrderItem {
              product_name
              downloadable_links {
                sort_order
                title
              }
            }
          }
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
              quantity_shipped
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
            ...ORDER_ITEM_DETAILS_FRAGMENT
            ... on BundleOrderItem {
              ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
            }
            ... on GiftCardOrderItem {
              ...GIFT_CARD_DETAILS_FRAGMENT
              product {
                ...PRODUCT_DETAILS_FRAGMENT
              }
            }
            ... on DownloadableOrderItem {
              product_name
              downloadable_links {
                sort_order
                title
              }
            }
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
  ${j}
  ${H}
  ${J}
  ${V}
  ${W}
  ${X}
  ${K}
  ${Z}
`,Ta=async({orderId:a,returnRef:n,queryType:t,returnsPageSize:_=50})=>await Q(Ea,{method:"GET",cache:"force-cache",variables:{orderNumber:a,pageSize:_}}).then(e=>ca(t??"orderData",e,n)).catch(Y),pa=`
  query ORDER_BY_TOKEN($token: String!) {
    guestOrderByToken(input: { token: $token }) {
      email
      id
      number
      order_date
      order_status_change_date
      status
      token
      carrier
      shipping_method
      printed_card_included
      gift_receipt_included
      available_actions
      is_virtual
      items_eligible_for_return {
        ...ORDER_ITEM_DETAILS_FRAGMENT
      }
      returns(pageSize: 50) {
        ...RETURNS_FRAGMENT
      }
      payment_methods {
        name
        type
      }
      applied_coupons {
        code
      }
      shipments {
        id
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
        ...ORDER_ITEM_DETAILS_FRAGMENT
        ... on BundleOrderItem {
          ...BUNDLE_ORDER_ITEM_DETAILS_FRAGMENT
        }
        ... on GiftCardOrderItem {
          ...GIFT_CARD_DETAILS_FRAGMENT
          product {
            ...PRODUCT_DETAILS_FRAGMENT
          }
        }
        ... on DownloadableOrderItem {
          product_name
          downloadable_links {
            sort_order
            title
          }
        }
      }
      total {
        ...ORDER_SUMMARY_FRAGMENT
      }
    }
  }
  ${j}
  ${H}
  ${J}
  ${V}
  ${W}
  ${X}
  ${K}
  ${Z}
`,ya=async(a,n)=>await Q(pa,{method:"GET",cache:"no-cache",variables:{token:a}}).then(t=>Ra(t,n)).catch(Y),Aa="orderData",Da=async a=>{var s;const n=typeof(a==null?void 0:a.orderRef)=="string"?a==null?void 0:a.orderRef:"",t=typeof(a==null?void 0:a.returnRef)=="string"?a==null?void 0:a.returnRef:"",_=n&&typeof(a==null?void 0:a.orderRef)=="string"&&((s=a==null?void 0:a.orderRef)==null?void 0:s.length)>20,e=(a==null?void 0:a.orderData)??null;if(e){q.emit("order/data",{...e,returnNumber:t});return}if(!n)return;const i=_?await ya(n,t):await Ta({orderId:n,returnRef:t,queryType:Aa});i?q.emit("order/data",{...i,returnNumber:t}):q.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},aa=new na({init:async a=>{const n={};aa.config.setConfig({...n,...a}),Da(a).catch(console.error)},listeners:()=>[]}),b=aa.config;export{K as A,W as B,J as G,V as O,j as P,Z as R,H as a,X as b,v as c,ya as d,b as e,Ma as f,Ta as g,aa as i,ra as t};
