import{Initializer as u}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as n,h as m,a as o}from"./chunks/fetch-graphql.js";import{g as $,r as w,s as A,b as C,c as N}from"./chunks/fetch-graphql.js";import{O as _,a as c,A as l,t as h,b as O}from"./chunks/getCustomer.js";import{c as F,g as M}from"./chunks/getCustomer.js";import{g as x}from"./chunks/getAttributesForm.js";import"@dropins/tools/fetch-graphql.js";const y=`
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
${_}
${c}
${l}
`,f=async(e,r)=>await n(y,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?m(t.errors):h(r??"orderData",t)}).catch(o),g=`
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
${_}
${c}
${l}
`,R=async e=>await n(g,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?m(r.errors):O(r)}).catch(o),b=async e=>{var d;let r=null;const t=(e==null?void 0:e.orderRef)??"",a=t&&typeof(e==null?void 0:e.orderRef)=="string"&&((d=e==null?void 0:e.orderRef)==null?void 0:d.length)>20,i=(e==null?void 0:e.orderData)??null;if(i){s.emit("order/data",i);return}if(!t){console.error("Order Token or number not received.");return}a||(r=await f(t)),a&&(r=await R(t)),r?s.emit("order/data",r):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},p=new u({init:async e=>{const r={};p.config.setConfig({...r,...e}),b(e).catch(console.error)},listeners:()=>[]}),T=p.config;export{T as config,n as fetchGraphQl,x as getAttributesForm,$ as getConfig,F as getCustomer,M as getGuestOrder,f as getOrderDetailsById,R as guestOrderByToken,p as initialize,w as removeFetchGraphQlHeader,A as setEndpoint,C as setFetchGraphQlHeader,N as setFetchGraphQlHeaders};
