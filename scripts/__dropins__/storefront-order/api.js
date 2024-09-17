import{Initializer as c}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as n,h as o,a as _}from"./chunks/fetch-graphql.js";import{g as A,r as C,s as S,b as F,c as M}from"./chunks/fetch-graphql.js";import{O as l,a as p,A as u,t as O,b as R}from"./chunks/getCustomer.js";import{c as x,g as L}from"./chunks/getCustomer.js";import{g as q}from"./chunks/getAttributesForm.js";import"@dropins/tools/fetch-graphql.js";const y=`
query ORDER_BY_NUMBER($orderNumber: String!) {
  customer {
    orders(
    filter: {number: {eq: $orderNumber}},
    ) {
      items {
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
    }
  }
}
${l}
${p}
${u}
`,b=async(e,r)=>await n(y,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?o(t.errors):O(r??"orderData",t)}).catch(_),E=`
query ORDER_BY_TOKEN($token: String!) {
  guestOrderByToken(input: { token: $token }) {
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
}
${l}
${p}
${u}
`,k=async e=>await n(E,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?o(r.errors):R(r)}).catch(_),D=async e=>{var m,i;let r=null;const t=e!=null&&e.orderRef&&typeof(e==null?void 0:e.orderRef)=="string"&&((m=e==null?void 0:e.orderRef)==null?void 0:m.length)>20?e==null?void 0:e.orderRef:null,a=e!=null&&e.orderRef&&typeof(e==null?void 0:e.orderRef)=="string"&&((i=e==null?void 0:e.orderRef)==null?void 0:i.length)<20?e==null?void 0:e.orderRef:null,d=(e==null?void 0:e.orderData)??null;if(d){s.emit("order/data",d);return}if(!a&&!t){console.error("Order Token or number not received.");return}a&&(r=await b(a)),t&&(r=await k(t)),r?s.emit("order/data",r):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},h=new c({init:async e=>{const r={};h.config.setConfig({...r,...e}),D(e).catch(console.error)},listeners:()=>[]}),$=h.config;export{$ as config,n as fetchGraphQl,q as getAttributesForm,A as getConfig,x as getCustomer,L as getGuestOrder,b as getOrderDetailsById,k as guestOrderByToken,h as initialize,C as removeFetchGraphQlHeader,S as setEndpoint,F as setFetchGraphQlHeader,M as setFetchGraphQlHeaders};
