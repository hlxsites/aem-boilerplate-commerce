/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as e}from"@dropins/tools/fetch-graphql.js";import{c as A,i as h}from"./chunks/initialize.js";import"@dropins/tools/lib.js";const{setEndpoint:p,setFetchGraphQlHeader:_,removeFetchGraphQlHeader:d,setFetchGraphQlHeaders:l,fetchGraphQl:r,getConfig:u}=new e().getMethods();var s=(t=>(t.CREDIT_CARD="payment_services_paypal_hosted_fields",t.SMART_BUTTONS="payment_services_paypal_smart_buttons",t.APPLE_PAY="payment_services_paypal_apple_pay",t.GOOGLE_PAY="payment_services_paypal_google_pay",t.VAULT="payment_services_paypal_vault",t))(s||{});const c=`
  mutation setCartAsInactive(
    $cartId: String!
  ) {
    setCartAsInactive(cartId: $cartId) {
      success
      error
    }
  }
`,T=async t=>{const{data:a}=await r(c,{variables:{cartId:t}});if(a.error)throw Error(a.error);return!0},i=`
mutation ADD_PRODUCTS_TO_NEW_CART_MUTATION(
    $cartItems:  [CartItemInput!]!,
) {
    addProductsToNewCart(
        cartItems: $cartItems
    ) {
        cart {
          id
        }
    }
}
`,m=async t=>{const{data:a}=await r(i,{variables:{cartItems:t},method:"POST"});return a.addProductsToNewCart.cart.id};export{s as PaymentMethodCode,m as addProductsToNewCart,A as config,r as fetchGraphQl,u as getConfig,h as initialize,d as removeFetchGraphQlHeader,T as setCartAsInactive,p as setEndpoint,_ as setFetchGraphQlHeader,l as setFetchGraphQlHeaders};
