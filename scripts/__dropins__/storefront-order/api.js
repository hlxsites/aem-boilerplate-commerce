import{Initializer as p}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as n,h as d,a as o}from"./chunks/fetch-graphql.js";import{g as B,r as N,s as $,b as w,c as A}from"./chunks/fetch-graphql.js";import{O as m,a as c,A as _,t as u,b as h}from"./chunks/getGuestOrder.js";import{g as C}from"./chunks/getGuestOrder.js";import{g as F}from"./chunks/getAttributesForm.js";import"@dropins/tools/fetch-graphql.js";const O=`
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
${m}
${c}
${_}
`,g=async(e,r)=>await n(O,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?d(t.errors):u(r??"orderData",t)}).catch(o),b=`
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
${m}
${c}
${_}
`,f=async e=>await n(b,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?d(r.errors):h(r)}).catch(o),y=async e=>{let r=null;const t=(e==null?void 0:e.orderNumber)??"",a=(e==null?void 0:e.orderToken)??"",i=(e==null?void 0:e.orderData)??null;if(i){s.emit("order/data",i);return}if(!t&&!a){console.error("Order Token or number not received.");return}if(t&&a){console.error("Error: You cannot pass both number and token together. You should pass only one identifier.");return}t&&(r=await g(t)),a&&(r=await f(a)),r?s.emit("order/data",r):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},l=new p({init:async e=>{const r={};l.config.setConfig({...r,...e}),y(e).catch(console.error)},listeners:()=>[]}),T=l.config;export{T as config,n as fetchGraphQl,F as getAttributesForm,B as getConfig,C as getGuestOrder,g as getOrderDetailsById,f as guestOrderByToken,l as initialize,N as removeFetchGraphQlHeader,$ as setEndpoint,w as setFetchGraphQlHeader,A as setFetchGraphQlHeaders};
