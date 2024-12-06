/*! Copyright 2024 Adobe
All Rights Reserved. */
import{t as T,m as s,f as A,l as M}from"./removeCustomerAddress.js";import{c as C}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as v}from"@dropins/tools/lib.js";const I=(t,r="en-US",a={})=>{const e={...{day:"2-digit",month:"2-digit",year:"numeric"},...a},d=new Date(t);return isNaN(d.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,e).format(d)},N=t=>{var m,u,l,_,f,g,p,R,E,S,n,y;if(!((u=(m=t.data)==null?void 0:m.customer)!=null&&u.orders))return null;const{page_info:r,total_count:a,date_of_first_order:i}=t.data.customer.orders,e=((_=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:_.returns)??[],c={items:(((p=(g=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:g.orders)==null?void 0:p.items)??[]).map(o=>{var O;const D={...o,returns:(O=e==null?void 0:e.items)==null?void 0:O.filter(h=>h.order.id===o.id),order_date:I(o.order_date),shipping_address:T(o.shipping_address),billing_address:T(o.billing_address)};return s(D,"camelCase",{})}),pageInfo:s(r,"camelCase",{}),totalCount:s(a,"camelCase",{}),dateOfFirstOrder:s(i,"camelCase",{})};return v(c,(y=(n=(S=(E=(R=C)==null?void 0:R.getConfig())==null?void 0:E.models)==null?void 0:S.OrderHistoryModel)==null?void 0:n.transformer)==null?void 0:y.call(n,t.data))},b=`
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
`,G=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    __typename
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
  }
`,F=`
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order {
            id
          }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          token
          email
          shipping_method
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
          shipments {
            id
            number
            tracking {
              title
              number
              carrier
            }
          }
          number
          id
          order_date
          carrier
          status
          items {
            status
            product_name
            id
            quantity_ordered
            quantity_shipped
            quantity_invoiced
            product {
              sku
              url_key
              small_image {
                url
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
  ${b}
  ${G}
`,$={sort_direction:"DESC",sort_field:"CREATED_AT"},L=async(t,r,a)=>{const i=r.includes("viewAll")?{}:{order_date:JSON.parse(r)};return await A(F,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:i,sort:$}}).then(e=>N(e)).catch(M)};export{L as g};
