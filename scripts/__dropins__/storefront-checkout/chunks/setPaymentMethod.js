import{s as e,M as r,e as n,d as s}from"./fetch-graphql.js";import{C as o,b as i}from"./getCart.graphql.js";const d=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${o}
`,h=async t=>{const a=e.cartId;if(!a)throw new r;if(!t)throw new n;return await s({type:"mutation",query:d,options:{variables:{cartId:a,paymentMethod:t}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:i})};export{h as s};
