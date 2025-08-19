/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as e}from"../fragments.js";import{g as d,h as l}from"./synchronizeCheckout.js";import{s as o,M as p,t as u,d as _,Q as f}from"./fetch-graphql.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const g=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${e}
`,M=async({address:a,customerAddressId:t,sameAsShipping:s=!1,useForShipping:n=!1})=>{const r=o.cartId;if(!r)throw new p;const i={cart_id:r,billing_address:{same_as_shipping:s,use_for_shipping:n}};if(!s&&t&&(i.billing_address.customer_address_id=t),!s&&!t){if(!a)throw new u;i.billing_address.address=d(a)}return await _({options:{variables:{input:i}},path:"setBillingAddressOnCart.cart",query:g,queueName:f.CartUpdate,transformer:l,type:"mutation"})};export{M as s};
//# sourceMappingURL=setBillingAddress.js.map
