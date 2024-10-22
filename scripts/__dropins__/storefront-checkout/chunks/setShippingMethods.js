import{s,M as a,d as p}from"./fetch-graphql.js";import{C as r,b as n}from"./getCart.graphql.js";import"./store-config.js";import"@dropins/tools/event-bus.js";const o=`
  mutation setShippingMethods(
    $cartId: String!
    $shippingMethods: [ShippingMethodInput]!
  ) {
    setShippingMethodsOnCart(
      input: { cart_id: $cartId, shipping_methods: $shippingMethods }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${r}
`,g=async i=>{const t=s.cartId;if(!t)throw new a;return await p({type:"mutation",query:o,options:{variables:{cartId:t,shippingMethods:i}},path:"setShippingMethodsOnCart.cart",signalType:"cart",transformer:n})};export{g as s};
