const a=e=>e==null,m=(e,t)=>e.amount.value-t.amount.value,n=e=>!(!e||!e.method_code||!e.method_title||a(e.amount.value)||!e.amount.currency),o=e=>({amount:{value:e.amount.value,currency:e.amount.currency},title:e.method_title,code:e.method_code,carrier:{code:e.carrier_code,title:e.carrier_title},value:`${e.carrier_code} - ${e.method_code}`,...e.price_excl_tax&&{amountExclTax:{value:e.price_excl_tax.value,currency:e.price_excl_tax.currency}},...e.price_incl_tax&&{amountInclTax:{value:e.price_incl_tax.value,currency:e.price_incl_tax.currency}}}),_=e=>{if(n(e))return o(e)},d=e=>{if(e)return e.filter(n).map(t=>o(t)).sort(m)},p=e=>e?!!e.code&&!!e.label:!1,y=e=>{if(!p(e))return;const{code:t,label:r,region_id:i}=e;return i?{code:t,name:r,id:i}:{code:t,name:r}},v=e=>{const{code:t,label:r}=e;return{value:t,label:r}},h=e=>e?"code"in e&&"value"in e:!1,f=e=>e.filter(h).map(t=>{const{code:r,value:i}=t;return{code:r,value:i}}),c=e=>{const t=e.street.filter(Boolean);return{id:(e==null?void 0:e.id)||void 0,city:e.city,company:e.company||void 0,country:v(e.country),customAttributes:f(e.custom_attributes),firstName:e.firstname,lastName:e.lastname,postCode:e.postcode||void 0,region:y(e.region),street:t,telephone:e.telephone||void 0,vatId:e.vat_id||void 0}},g=e=>{if(e)return c(e)},b=e=>e.filter(t=>!!t).map(t=>{const{available_shipping_methods:r,selected_shipping_method:i,same_as_billing:l,...u}=t;return{...c(u),availableShippingMethods:d(r),selectedShippingMethod:_(i),sameAsBilling:l}}),x=e=>({city:e.city,company:e.company,country_code:e.countryCode,custom_attributes:e.customAttributes.map(t=>({attribute_code:t.code,value:t.value})),firstname:e.firstName,lastname:e.lastName,postcode:e.postcode,region:e.region,region_id:e.regionId,save_in_address_book:e.saveInAddressBook??!0,street:e.street,telephone:e.telephone,vat_id:e.vatId}),A=e=>{if(e)return{code:e.code,title:e.title}},C=e=>{if(e)return e.filter(t=>!!t).map(t=>{const{code:r,title:i}=t;return{code:r,title:i}})},M=e=>({availablePaymentMethods:C(e.available_payment_methods),billingAddress:g(e.billing_address),email:e.email??void 0,id:e.id,isEmpty:e.total_quantity===0,isVirtual:e.is_virtual,selectedPaymentMethod:A(e.selected_payment_method),shippingAddresses:b(e.shipping_addresses)}),s=`
  fragment CheckoutData on Cart {
    is_virtual
    email
    total_quantity
    billing_address {
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
    }
    shipping_addresses {
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
        amount {
          currency
          value
        }
        available
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
      selected_shipping_method {
        amount {
          value
          currency
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
      same_as_billing
    }
    available_payment_methods {
      code
      title
    }
    selected_payment_method {
      code
      title
    }
  }
`,S=`
  query getCart($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...CheckoutData
    }
  }
  ${s}
`,I=`
  query getCustomerCart {
    cart: customerCart {
      id
      ...CheckoutData
    }
  }
  ${s}
`;export{s as C,x as a,M as b,I as c,S as g,d as t};
