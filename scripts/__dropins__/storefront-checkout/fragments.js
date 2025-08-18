/*! Copyright 2025 Adobe
All Rights Reserved. */
const e=`
  fragment AVAILABLE_SHIPPING_METHOD_FRAGMENT on AvailableShippingMethod {
    amount {
      currency
      value
    }
    carrier_code
    carrier_title
    error_message
    method_code
    method_title
    price_excl_tax {
      value
      currency
    }
    price_incl_tax {
      value
      currency
    }
  }
`,_=`
  fragment SELECTED_SHIPPING_METHOD_FRAGMENT on SelectedShippingMethod {
    amount {
      currency
      value
    }
    carrier_code
    carrier_title
    method_code
    method_title
    price_excl_tax {
      value
      currency
    }
    price_incl_tax {
      value
      currency
    }
  }
`,a=`
  fragment BILLING_CART_ADDRESS_FRAGMENT on BillingCartAddress {
    id
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    street
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    prefix
    suffix
    middlename
    fax
  }
`,A=`
  fragment SHIPPING_CART_ADDRESS_FRAGMENT on ShippingCartAddress {
    id
    firstname
    lastname
    company
    street
    city
    postcode
    vat_id
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    custom_attributes {
      ... on AttributeValue {
        code
        value
      }
    }
    available_shipping_methods {
      ...AVAILABLE_SHIPPING_METHOD_FRAGMENT
    }
    selected_shipping_method {
      ...SELECTED_SHIPPING_METHOD_FRAGMENT
    }
    same_as_billing
    prefix
    suffix
    middlename
    fax
  }

  ${e}
  ${_}
`,t=`
  fragment AVAILABLE_PAYMENT_METHOD_FRAGMENT on AvailablePaymentMethod {
    code
    title
  }
`,E=`
  fragment SELECTED_PAYMENT_METHOD_FRAGMENT on SelectedPaymentMethod {
    code
    title
  }
`,o=`
  fragment CHECKOUT_DATA_FRAGMENT on Cart {
    id
    is_virtual
    email
    total_quantity
    billing_address {
      ...BILLING_CART_ADDRESS_FRAGMENT
    }
    shipping_addresses {
      ...SHIPPING_CART_ADDRESS_FRAGMENT
    }
    available_payment_methods {
      ...AVAILABLE_PAYMENT_METHOD_FRAGMENT
    }
    selected_payment_method {
      ...SELECTED_PAYMENT_METHOD_FRAGMENT
    }
  }

  ${a}
  ${A}
  ${t}
  ${E}
`,T=`
  fragment CUSTOMER_FRAGMENT on Customer {
    firstname
    lastname
    email
  }
`,i=`
  fragment NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT on NegotiableQuoteBillingAddress {
    city
    country {
      code
      label
    }
    firstname
    lastname
    company
    postcode
    region {
      region_id
      code
      label
    }
    street
    telephone
  }
`,n=`
  fragment NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT on NegotiableQuoteShippingAddress {
    firstname
    lastname
    company
    street
    city
    postcode
    region {
      region_id
      code
      label
    }
    country {
      code
      label
    }
    telephone
    available_shipping_methods {
      ...AVAILABLE_SHIPPING_METHOD_FRAGMENT
    }
    selected_shipping_method {
      ...SELECTED_SHIPPING_METHOD_FRAGMENT
    }
  }

  ${e}
  ${_}
`,l=`
  fragment NEGOTIABLE_QUOTE_FRAGMENT on NegotiableQuote {
    available_payment_methods {
      ...AVAILABLE_PAYMENT_METHOD_FRAGMENT
    }
    billing_address {
      ...NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT
    }
    email
    is_virtual
    name
    selected_payment_method {
      ...SELECTED_PAYMENT_METHOD_FRAGMENT
    }
    shipping_addresses {
      ...NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT
    }
    status
    total_quantity
    uid
  }

  ${i}
  ${n}
  ${t}
  ${E}
`;export{t as AVAILABLE_PAYMENT_METHOD_FRAGMENT,e as AVAILABLE_SHIPPING_METHOD_FRAGMENT,a as BILLING_CART_ADDRESS_FRAGMENT,o as CHECKOUT_DATA_FRAGMENT,T as CUSTOMER_FRAGMENT,i as NEGOTIABLE_QUOTE_BILLING_ADDRESS_FRAGMENT,l as NEGOTIABLE_QUOTE_FRAGMENT,n as NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_FRAGMENT,E as SELECTED_PAYMENT_METHOD_FRAGMENT,_ as SELECTED_SHIPPING_METHOD_FRAGMENT,A as SHIPPING_CART_ADDRESS_FRAGMENT};
//# sourceMappingURL=fragments.js.map
