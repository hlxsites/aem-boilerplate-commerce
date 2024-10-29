import{Initializer as E}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{f as i,h as n}from"./chunks/fetch-graphql.js";import{g as L,r as x,s as P,a as U,b as Y}from"./chunks/fetch-graphql.js";import{h as m}from"./chunks/network-error.js";import{P as l,a as u,G as c,O as _,B as p,b as R}from"./chunks/transform-order-details.js";import{O as h,A as D}from"./chunks/getGuestOrder.graphql.js";import{t as f}from"./chunks/getCustomer.js";import{g as Q,a as z}from"./chunks/getCustomer.js";import{g as K}from"./chunks/getAttributesForm.js";import{g as J}from"./chunks/getStoreConfig.js";import{g as W}from"./chunks/getCustomerOrdersReturn.js";import{c as Z,r as ee}from"./chunks/requestGuestOrderCancel.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/convertCase.js";const I=`
query ORDER_BY_NUMBER($orderNumber: String!) {
 customer {
    orders(
      filter: { number: { eq: $orderNumber } }
    ) {
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
              ...OrderItemDetails
              ... on GiftCardOrderItem {
                ...GiftCardDetails
                product {
                  ...ProductDetails
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
          ...OrderItemDetails
          ... on BundleOrderItem {
            ...BundleOrderItemDetails
          }
          ... on GiftCardOrderItem {
            ...GiftCardDetails
            product {
              ...ProductDetails
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
          ...OrderSummary
        }
      }
    }
  }
}
${l}
${u}
${c}
${_}
${p}
${h}
${D}
`,G=async(e,r)=>await i(I,{method:"GET",cache:"force-cache",variables:{orderNumber:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?n(t.errors):R(r??"orderData",t)}).catch(m),T=`
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
          ...OrderItemDetails
          ... on GiftCardOrderItem {
            ...GiftCardDetails
            product {
              ...ProductDetails
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
      ...OrderItemDetails
      ... on BundleOrderItem {
        ...BundleOrderItemDetails
      }
      ... on GiftCardOrderItem {
        ...GiftCardDetails
        product {
          ...ProductDetails
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
      ...OrderSummary
    }
  }
}
${l}
${u}
${c}
${_}
${p}
${h}
${D}
`,b=async e=>await i(T,{method:"GET",cache:"no-cache",variables:{token:e}}).then(r=>{var t;return(t=r.errors)!=null&&t.length?n(r.errors):f(r)}).catch(m),g=async e=>{var d;const r=(e==null?void 0:e.orderRef)??"",t=r&&typeof(e==null?void 0:e.orderRef)=="string"&&((d=e==null?void 0:e.orderRef)==null?void 0:d.length)>20,a=(e==null?void 0:e.orderData)??null;if(a){s.emit("order/data",a);return}if(!r){console.error("Order Token or number not received.");return}const o=t?await b(r):await G(r);o?s.emit("order/data",o):s.emit("order/error",{source:"order",type:"network",error:"The data was not received."})},O=new E({init:async e=>{const r={};O.config.setConfig({...r,...e}),g(e).catch(console.error)},listeners:()=>[]}),F=O.config;export{Z as cancelOrder,F as config,i as fetchGraphQl,K as getAttributesForm,L as getConfig,Q as getCustomer,W as getCustomerOrdersReturn,z as getGuestOrder,G as getOrderDetailsById,J as getStoreConfig,b as guestOrderByToken,O as initialize,x as removeFetchGraphQlHeader,ee as requestGuestOrderCancel,P as setEndpoint,U as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders};
