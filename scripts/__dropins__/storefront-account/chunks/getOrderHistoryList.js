import{c as i,f as u,h as m,a as _}from"./convertCase.js";import{t as c}from"./transform-customer-address.js";const f=(t,e="en-US",o={})=>{const a={...{day:"2-digit",month:"2-digit",year:"numeric"},...o},s=new Date(t);return isNaN(s.getTime())?"Invalid Date":new Intl.DateTimeFormat(e,a).format(s)},p=t=>{var s,d;if(!((d=(s=t.data)==null?void 0:s.customer)!=null&&d.orders))return null;const{items:e,page_info:o,total_count:r,date_of_first_order:a}=t.data.customer.orders;return{items:e.map(n=>{const l={...n,order_date:f(n.order_date),shipping_address:c(n.shipping_address),billing_address:c(n.billing_address)};return i(l,"camelCase",{})}),pageInfo:i(o,"camelCase",{}),totalCount:i(r,"camelCase",{}),dateOfFirstOrder:i(a,"camelCase",{})}},g=`
  query GET_CUSTOMER_ORDERS_LIST($pageSize: Int, $filter: CustomerOrdersFilterInput, $sort: CustomerOrderSortInput) {
  customer {
    orders(pageSize: $pageSize, filter: $filter, sort: $sort) {
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
`,O=async(t,e)=>{const o=e?{order_date:JSON.parse(e)}:{};return await u(g,{method:"GET",cache:"no-cache",variables:{pageSize:t,filter:o,sort:{sort_direction:"DESC",sort_field:"CREATED_AT"}}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?m(r.errors):p(r)}).catch(_)};export{O as g};
