import{C,a as T,s as n,f as m,h as u,t as f}from"./chunks/resetCart.js";import{g as D,r as b,e as F,b as x,c as y,d as $}from"./chunks/resetCart.js";import{events as d}from"@dropins/tools/event-bus.js";import{p as l,a as I}from"./chunks/updateProductsFromCart.js";import{u as w}from"./chunks/updateProductsFromCart.js";import{c as g}from"./chunks/initializeCart.js";import{g as H,i as k,a as z}from"./chunks/initializeCart.js";import{g as j}from"./chunks/getStoreConfig.js";import{a as B,g as J,c as K,b as L}from"./chunks/getEstimatedTotals.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const E=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${C}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CartFragment
      }
      user_errors {
        code
        message
      }
    }
  }
  ${T}
`,M=async r=>{let e=!1;const s=n.cartId||await h().then(a=>(e=!0,a));return m(E,{variables:{cartId:s,cartItems:r.map(({sku:a,parentSku:i,quantity:t,optionsUIDs:o,enteredOptions:c})=>({sku:a,parent_sku:i,quantity:t,selected_options:o,entered_options:c}))}}).then(({errors:a,data:i})=>{if(a)return u(a);const t=f(i.addProductsToCart.cart);if(d.emit("cart/updated",t),d.emit("cart/data",t),t){const o=t.items.filter(c=>r.some(({sku:p})=>p===c.sku));e?l(t,o,n.locale||"en-US"):I(t,o,n.locale||"en-US")}return t})},_=`
    mutation CREATE_EMPTY_CART_MUTATION {
        createEmptyCart
    }
`,h=async()=>{const{disableGuestCart:r}=g.getConfig();if(r)throw new Error("Guest cart is disabled");return await m(_).then(({data:e})=>{const s=e.createEmptyCart;return n.cartId=s,s})};export{M as addProductsToCart,g as config,h as createEmptyCart,m as fetchGraphQl,H as getCartData,D as getConfig,B as getCountries,J as getEstimateShipping,K as getEstimatedTotals,L as getRegions,j as getStoreConfig,k as initialize,z as initializeCart,b as removeFetchGraphQlHeader,F as resetCart,x as setEndpoint,y as setFetchGraphQlHeader,$ as setFetchGraphQlHeaders,w as updateProductsFromCart};
//# sourceMappingURL=api.js.map
