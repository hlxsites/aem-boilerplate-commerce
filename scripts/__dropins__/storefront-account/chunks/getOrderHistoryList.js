import{c as i,f as l,h as u,a as m}from"./convertCase.js";import{t as d}from"./transform-customer-address.js";const _=(e,r="en-US",o={})=>{const t={...{day:"2-digit",month:"2-digit",year:"numeric"},...o},s=new Date(e);return isNaN(s.getTime())?"Invalid Date":new Intl.DateTimeFormat(r,t).format(s)},p=e=>{var t,s;if(!((s=(t=e.data)==null?void 0:t.customer)!=null&&s.orders))return null;const{items:r,page_info:o,total_count:a}=e.data.customer.orders;return{items:r.map(n=>{const c={...n,order_date:_(n.order_date),shipping_address:d(n.shipping_address),billing_address:d(n.billing_address)};return i(c,"camelCase",{})}),pageInfo:i(o,"camelCase",{}),totalCount:i(a,"camelCase",{})}},g=`
  query GET_CUSTOMER_ORDERS_LIST($pageSize: Int, $filter: CustomerOrdersFilterInput, $sort: CustomerOrderSortInput) {
  customer {
    orders(pageSize: $pageSize, filter: $filter, sort: $sort) {
      page_info {
        page_size
        total_pages
        current_page
      }
      total_count
      items {
        token
        email
        shipping_method
        shipping_address {
          firstname
          lastname
          postcode
          street
          region
          city
          country_code
          region_id
        }
        billing_address {
          firstname
          lastname
          postcode
          street
          region
          city
          country_code
          region_id
        }
        payment_methods {
          name
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
          product {
          small_image {
              url
            }
          }
        }
        total {
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
      }
    }
  }
}
`,y=async(e,r)=>{const o=r?{order_date:JSON.parse(r)}:{};return await l(g,{method:"GET",cache:"no-cache",variables:{pageSize:e,filter:o,sort:{sort_direction:"DESC",sort_field:"CREATED_AT"}}}).then(a=>{var t;return(t=a.errors)!=null&&t.length?u(a.errors):p(a)}).catch(m)};export{y as g};
