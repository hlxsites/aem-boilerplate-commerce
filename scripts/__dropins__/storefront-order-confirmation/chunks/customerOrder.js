import{FetchGraphQL as m}from"@dropins/tools/fetch-graphql.js";class o extends Error{constructor(e){super(e.map(r=>r.message).join(" ")),this.name="FetchError"}}class y extends Error{constructor(e){super(`Missing argument: ${e}`)}}class a extends Error{constructor(){super("Order not found")}}const{setEndpoint:_,setFetchGraphQlHeader:O,removeFetchGraphQlHeader:f,setFetchGraphQlHeaders:b,fetchGraphQl:c,getConfig:w}=new m().getMethods(),i=`
  fragment guestOrderData on CustomerOrder {
    number
    status
    email
    shipping_method
    is_virtual
    payment_methods {
      name
      type
    }
    total {
      subtotal {
        currency
        value
      }
      total_tax {
        currency
        value
      }
      total_shipping {
        currency
        value
      }
      grand_total {
        currency
        value
      }
    }
    billing_address {
      firstname
      middlename
      lastname
      street
      city
      postcode
      telephone
      country_code
      region
      region_id
      company
    }
    shipping_address {
      firstname
      middlename
      lastname
      street
      city
      postcode
      telephone
      country_code
      region
      region_id
      company
    }
    items {
      __typename
      id
      quantity_ordered
      product_sale_price {
        value
        currency
      }
      product {
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
      selected_options {
        label
        value
      }

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
`,l=`
  query guestOrder($number: String!, $email: String!, $postcode: String!) {
    guestOrder(input: { number: $number, email: $email, postcode: $postcode }) {
      ...guestOrderData
    }
  }
  ${i}
`,$=async t=>{const{data:e,errors:r}=await c(l,{variables:{...t}});if(r)throw new o(r);const s=e==null?void 0:e.guestOrder;if(!s)throw new a;return s},g=`
  query guestOrderByToken($token: String!) {
    guestOrderByToken(input: {token: $token}) {
      ...guestOrderData
    }
  }
  ${i}
`,v=async t=>{const{data:e,errors:r}=await c(g,{variables:{token:t}});if(r)throw new o(r);const s=e==null?void 0:e.guestOrderByToken;if(!!!s)throw new a;return s},p=`
  query customerOrder($number: String!) {
    customer {
      orders(filter: { number: { eq: $number } }) {
        total_count
        items {
          ...guestOrderData
        }
      }
    }
  }
  ${i}
`,k=async t=>{var n,u,d;const{data:e,errors:r}=await c(p,{variables:{number:t}});if(r)throw new o(r);const s=(d=(u=(n=e==null?void 0:e.customer)==null?void 0:n.orders)==null?void 0:u.items)==null?void 0:d[0];if(!s)throw new a;return s};export{o as F,y as M,a as O,O as a,b,$ as c,v as d,k as e,c as f,w as g,f as r,_ as s};
//# sourceMappingURL=customerOrder.js.map
