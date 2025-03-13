/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as i,f as g,h}from"./chunks/resetCart.js";import{g as q,r as z,d as V,a as J,b as L,c as j}from"./chunks/resetCart.js";import{C as A,t as _,c as E}from"./chunks/refreshCart.js";import{g as K,b as W,d as X,e as Y,i as Z,a as tt,r as rt}from"./chunks/refreshCart.js";import{events as C}from"@dropins/tools/event-bus.js";import{g as I}from"./chunks/persisted-data.js";import{CART_FRAGMENT as G}from"./fragments.js";import{b as S,a as R,c as O}from"./chunks/acdl.js";import{u as at}from"./chunks/updateProductsFromCart.js";import{g as ot,b as it,a as nt}from"./chunks/getEstimateShipping.js";import{g as pt}from"./chunks/getEstimatedTotals.js";import{A as ut,a as mt}from"./chunks/applyCouponsToCart.js";import{a as lt,r as ft}from"./chunks/removeGiftCardFromCart.js";import{s as gt}from"./chunks/setGiftOptionsOnCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const U=`
  mutation ADD_PRODUCTS_TO_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemInput!]!,
      ${A}
    ) {
    addProductsToCart(
      cartId: $cartId
      cartItems: $cartItems
    ) {
      cart {
        ...CART_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
    
  ${G}
`,$=async r=>{console.log("💚addProductsToCart input items:",JSON.stringify(r,null,2));let e=!1;const n=i.cartId||await y().then(o=>(e=!0,o));return g(U,{variables:{cartId:n,cartItems:r.map(({sku:o,parentSku:a,quantity:c,optionsUIDs:t,enteredOptions:p})=>({sku:o,parent_sku:a,quantity:c,selected_options:t,entered_options:p}))}}).then(({errors:o,data:a})=>{var p;const c=[...((p=a==null?void 0:a.addProductsToCart)==null?void 0:p.user_errors)??[],...o??[]];if(c.length>0)return h(c);const t=_(a.addProductsToCart.cart);if(C.emit("cart/updated",t),C.emit("cart/data",t),t){const s=I(),d=(s==null?void 0:s.items)||[],u=t.items.filter(m=>!d.find(f=>f.sku===m.sku)),T=t.items.filter(m=>{const l=d.find(f=>f.sku===m.sku);return l&&m.quantity>l.quantity});u.length>0&&C.emit("cart/product/added",u),T.length>0&&C.emit("cart/product/updated",T)}if(t){const s=t.items.filter(d=>r.some(({sku:u})=>u===d.topLevelSku));e?S(t,s,i.locale??"en-US"):R(t,s,i.locale??"en-US")}return t})},v=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,y=async()=>{const{disableGuestCart:r}=E.getConfig();if(r)throw new Error("Guest cart is disabled");return await g(v).then(({data:e})=>{const n=e.createGuestCart.cart.id;return i.cartId=n,n})},k=()=>{const r=i.locale??"en-US",e=I();e&&O(e,r)};export{ut as ApplyCouponsStrategy,$ as addProductsToCart,mt as applyCouponsToCart,lt as applyGiftCardToCart,E as config,y as createGuestCart,g as fetchGraphQl,K as getCartData,I as getCartDataFromCache,q as getConfig,ot as getCountries,W as getCustomerCartPayload,it as getEstimateShipping,pt as getEstimatedTotals,X as getGuestCartPayload,nt as getRegions,Y as getStoreConfig,Z as initialize,tt as initializeCart,k as publishShoppingCartViewEvent,rt as refreshCart,z as removeFetchGraphQlHeader,ft as removeGiftCardFromCart,V as resetCart,J as setEndpoint,L as setFetchGraphQlHeader,j as setFetchGraphQlHeaders,gt as setGiftOptionsOnCart,at as updateProductsFromCart};
