/*! Copyright 2026 Adobe
All Rights Reserved. */
const e=`
  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {
    date_of_birth
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
    allow_remote_shopping_assistance
    admin_assistance_actions(pageSize: 10, currentPage: 1) {
      total_count
      items {
        action
        date
        details
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }
`,t=`
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
`,a=`
  fragment ORDER_SUMMARY_FRAGMENT on OrderTotal {
    grand_total {
      value
      currency
    }
    grand_total_excl_tax {
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
`,r=`
  fragment CUSTOMER_ORDER_FRAGMENT on CustomerOrder {
    admin_assisted_order
    token
    email
    shipping_method
    payment_methods {
      name
      type
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
      product_sku
      product_url_key
      product {
        sku
        small_image {
          url
        }
      }
    }
  }
`;export{t as ADDRESS_FRAGMENT,e as BASIC_CUSTOMER_INFO_FRAGMENT,r as CUSTOMER_ORDER_FRAGMENT,a as ORDER_SUMMARY_FRAGMENT};
//# sourceMappingURL=fragments.js.map
