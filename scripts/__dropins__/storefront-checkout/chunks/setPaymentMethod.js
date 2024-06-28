import{M as e,b as r,e as n}from"./transform-shipping-methods.js";import{C as s,a as o,t as i}from"./getCart.graphql.js";import"./getStoreConfig.js";const m=`
  mutation setPaymentMethod($cartId: String!, $paymentMethod: String!) {
    setPaymentMethodOnCart(
      input: { cart_id: $cartId, payment_method: { code: $paymentMethod } }
    ) {
      cart {
        id
        ...CartData
        ...CartSummaryItems
      }
    }
  }
  ${s}
  ${o}
`,y=async({cartId:t,paymentMethod:a})=>{if(!t)throw new e;if(!a)throw new r;return await n({type:"mutation",query:m,options:{variables:{cartId:t,paymentMethod:a}},path:"setPaymentMethodOnCart.cart",signalType:"cart",transformer:i})};export{y as s};
//# sourceMappingURL=setPaymentMethod.js.map
