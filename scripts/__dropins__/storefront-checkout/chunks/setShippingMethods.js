/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CHECKOUT_DATA_FRAGMENT as r}from"../fragments.js";import{h as i}from"./synchronizeCheckout.js";import{s as n,M as e,d as s,Q as p}from"./fetch-graphql.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const g=t=>({countryCode:t.country_id,postCode:t.postcode||"",...t.region_id?{regionId:Number(t.region_id)}:{...t.region?{region:t.region}:{}}}),C=t=>({carrierCode:t.carrier.code||"",methodCode:t.code||"",amount:t.amount,amountExclTax:t.amountExclTax,amountInclTax:t.amountInclTax}),a=`
  mutation setShippingMethods(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        ...CHECKOUT_DATA_FRAGMENT
      }
    }
  }

  ${r}
`,M=async t=>{const o=n.cartId;if(!o)throw new e;return await s({type:"mutation",query:a,queueName:p.CartUpdate,options:{variables:{cartId:o,shippingMethods:t}},path:"setShippingMethodsOnCart.cart",transformer:i})};export{g as a,M as s,C as t};
//# sourceMappingURL=setShippingMethods.js.map
