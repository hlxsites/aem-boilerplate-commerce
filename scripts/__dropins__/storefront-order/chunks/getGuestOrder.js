import{d as B,f as M,h as Q,a as L}from"./fetch-graphql.js";const w=`
fragment OrderSummary on OrderTotal {
  grand_total {
    value
    currency
  }
  subtotal {
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
}`,F=`
fragment AddressesList on OrderAddress {
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
}`,K=`
fragment OrderItems on OrderItem {
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
    __typename
    canonical_url
    uid
    name
    sku
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
}`,P=n=>n||0,Y=n=>{var a,u,i;return{canonicalUrl:(n==null?void 0:n.canonical_url)||"",id:(n==null?void 0:n.uid)||"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((a=n==null?void 0:n.image)==null?void 0:a.url)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((u=n==null?void 0:n.thumbnail)==null?void 0:u.label)||"",url:((i=n==null?void 0:n.thumbnail)==null?void 0:i.url)||""}}},j=n=>{if(!n||!("selected_options"in n))return;const a={};for(const u of n.selected_options)a[u.label]=u.value;return a},z=n=>n==null?void 0:n.map(a=>{var u,i,c,l,t,_,y,s,p,g,e,f,O,h,b,q,E,T,R,G,x,S,k,C,N,A,D,$,U;return{type:a==null?void 0:a.__typename,productName:a.product_name,quantityCanceled:a==null?void 0:a.quantity_canceled,quantityInvoiced:a==null?void 0:a.quantity_invoiced,quantityOrdered:a==null?void 0:a.quantity_ordered,quantityRefunded:a==null?void 0:a.quantity_refunded,quantityReturned:a==null?void 0:a.quantity_returned,quantityShipped:a==null?void 0:a.quantity_shipped,id:a==null?void 0:a.id,discounted:((l=(c=(i=(u=a==null?void 0:a.product)==null?void 0:u.price_range)==null?void 0:i.maximum_price)==null?void 0:c.regular_price)==null?void 0:l.value)*(a==null?void 0:a.quantity_ordered)!==((t=a==null?void 0:a.product_sale_price)==null?void 0:t.value)*(a==null?void 0:a.quantity_ordered),total:{value:((_=a==null?void 0:a.product_sale_price)==null?void 0:_.value)*(a==null?void 0:a.quantity_ordered),currency:(y=a==null?void 0:a.product_sale_price)==null?void 0:y.currency},totalInclTax:{value:((s=a==null?void 0:a.product_sale_price)==null?void 0:s.value)*(a==null?void 0:a.quantity_ordered),currency:(p=a==null?void 0:a.product_sale_price)==null?void 0:p.currency},price:{value:(g=a==null?void 0:a.product_sale_price)==null?void 0:g.value,currency:(e=a==null?void 0:a.product_sale_price)==null?void 0:e.currency},priceInclTax:{value:(f=a==null?void 0:a.product_sale_price)==null?void 0:f.value,currency:(O=a==null?void 0:a.product_sale_price)==null?void 0:O.currency},totalQuantity:P(a==null?void 0:a.quantity_ordered),regularPrice:{value:(E=(q=(b=(h=a==null?void 0:a.product)==null?void 0:h.price_range)==null?void 0:b.maximum_price)==null?void 0:q.regular_price)==null?void 0:E.value,currency:(x=(G=(R=(T=a==null?void 0:a.product)==null?void 0:T.price_range)==null?void 0:R.maximum_price)==null?void 0:G.regular_price)==null?void 0:x.currency},product:Y(a==null?void 0:a.product),thumbnail:{label:((k=(S=a==null?void 0:a.product)==null?void 0:S.thumbnail)==null?void 0:k.label)||"",url:((N=(C=a==null?void 0:a.product)==null?void 0:C.thumbnail)==null?void 0:N.url)||""},giftCard:(a==null?void 0:a.__typename)==="GiftCardOrderItem"?{senderName:((A=a.gift_card)==null?void 0:A.sender_name)||"",senderEmail:((D=a.gift_card)==null?void 0:D.sender_email)||"",recipientEmail:(($=a.gift_card)==null?void 0:$.recipient_email)||"",recipientName:((U=a.gift_card)==null?void 0:U.recipient_name)||""}:void 0,configurableOptions:j(a)}}),v=n=>{var s,p,g,e,f;const a=z(n.items),{total:u,...i}=B({...n,items:a},"camelCase",{applied_coupons:"coupons",__typename:"__typename",firstname:"firstName",middlename:"middleName",lastname:"lastName",postcode:"postCode",payment_methods:"payments"}),c=(s=n==null?void 0:n.payment_methods)==null?void 0:s[0],l=(c==null?void 0:c.type)||"",t=(c==null?void 0:c.name)||"",_=(p=i==null?void 0:i.items)==null?void 0:p.reduce((O,h)=>O+h.totalQuantity,0);return{...u,...i,totalQuantity:_,shipping:{amount:((g=i==null?void 0:i.total)==null?void 0:g.totalShipping.value)??0,currency:((f=(e=i.total)==null?void 0:e.totalShipping)==null?void 0:f.currency)||"",code:i.shippingMethod??""},payments:[{code:l,name:t}]}},X=(n,a)=>{var u,i,c,l,t,_,y;if((l=(c=(i=(u=a==null?void 0:a.data)==null?void 0:u.customer)==null?void 0:i.orders)==null?void 0:c.items)!=null&&l.length&&n==="orderData"){const s=(y=(_=(t=a==null?void 0:a.data)==null?void 0:t.customer)==null?void 0:_.orders)==null?void 0:y.items[0];return v(s)}return null},H=n=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrder))return null;const a=(i=n==null?void 0:n.data)==null?void 0:i.guestOrder;return v(a)},Z=n=>{var u,i;if(!((u=n==null?void 0:n.data)!=null&&u.guestOrderByToken))return null;const a=(i=n==null?void 0:n.data)==null?void 0:i.guestOrderByToken;return v(a)},J=`
  fragment guestOrderData on CustomerOrder {
    email
    id
    number
    order_date
    status
    token
    carrier
    shipping_method
    printed_card_included
    gift_receipt_included
    available_actions
    is_virtual
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
      ...OrderItems
      ... on GiftCardOrderItem {
        gift_card {
          recipient_name
          recipient_email
          sender_name
          sender_email
          message
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
  ...AddressesList
  }
  billing_address {
  ...AddressesList
  }
  items {
    ...OrderItems
    ... on GiftCardOrderItem {
      __typename
      gift_card {
        recipient_name
        recipient_email
        sender_name
        sender_email
        message
      }
    }
  }
  total {
  ...OrderSummary
    }
  }
${w}
${F}
${K}
`,V=`
  query GET_GUEST_ORDER($input: OrderInformationInput!) {
  guestOrder(input:$input) {
    ...guestOrderData
    }
  }
${J}
`,d=async n=>await M(V,{method:"GET",cache:"no-cache",variables:{input:n}}).then(a=>{var u;return(u=a.errors)!=null&&u.length?Q(a.errors):H(a)}).catch(L);export{F as A,w as O,K as a,Z as b,d as g,X as t};
