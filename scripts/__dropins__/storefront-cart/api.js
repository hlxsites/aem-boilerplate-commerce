/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as c,f as T,h as I}from"./chunks/resetCart.js";import{g as q,r as z,d as V,a as L,b as j,c as B}from"./chunks/resetCart.js";import{C as A,t as _,c as E}from"./chunks/refreshCart.js";import{g as K,b as W,d as X,e as Y,i as Z,a as tt,r as rt}from"./chunks/refreshCart.js";import{events as C}from"@dropins/tools/event-bus.js";import{g}from"./chunks/persisted-data.js";import{CART_FRAGMENT as G}from"./fragments.js";import{b as S,a as R,c as U}from"./chunks/acdl.js";import{u as at}from"./chunks/updateProductsFromCart.js";import{g as ot,b as it,a as nt}from"./chunks/getEstimateShipping.js";import{g as pt}from"./chunks/getEstimatedTotals.js";import{A as mt,a as ut}from"./chunks/applyCouponsToCart.js";import{a as lt,r as ft}from"./chunks/removeGiftCardFromCart.js";import{s as gt}from"./chunks/setGiftOptionsOnCart.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/lib.js";const O=`
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
`,$=async e=>{let r=!1;const p=c.cartId||await y().then(o=>(r=!0,o));return T(O,{variables:{cartId:p,cartItems:e.map(({sku:o,parentSku:a,quantity:d,optionsUIDs:t,enteredOptions:i})=>({sku:o,parent_sku:a,quantity:d,selected_options:t,entered_options:i}))}}).then(({errors:o,data:a})=>{var f;const d=[...((f=a==null?void 0:a.addProductsToCart)==null?void 0:f.user_errors)??[],...o??[]];if(d.length>0)return I(d);const t=_(a.addProductsToCart.cart),i=g(),l=(i==null?void 0:i.items)||[];if(C.emit("cart/updated",t),C.emit("cart/data",t),t){const n=t.items.filter(s=>!l.some(u=>u.sku===s.sku)),m=t.items.filter(s=>{const u=l.find(h=>h.sku===s.sku);return u&&s.quantity!==u.quantity});n.length>0&&C.emit("cart/product/added",n),m.length>0&&C.emit("cart/product/updated",m)}if(t){const n=t.items.filter(m=>e.some(({sku:s})=>s===m.topLevelSku));r?S(t,n,c.locale??"en-US"):R(t,n,c.locale??"en-US")}return t})},b=`
    mutation CREATE_GUEST_CART_MUTATION {
        createGuestCart {
          cart {
            id
          }
        }
    }
`,y=async()=>{const{disableGuestCart:e}=E.getConfig();if(e)throw new Error("Guest cart is disabled");return await T(b).then(({data:r})=>{const p=r.createGuestCart.cart.id;return c.cartId=p,p})},k=()=>{const e=c.locale??"en-US",r=g();r&&U(r,e)};export{mt as ApplyCouponsStrategy,$ as addProductsToCart,ut as applyCouponsToCart,lt as applyGiftCardToCart,E as config,y as createGuestCart,T as fetchGraphQl,K as getCartData,g as getCartDataFromCache,q as getConfig,ot as getCountries,W as getCustomerCartPayload,it as getEstimateShipping,pt as getEstimatedTotals,X as getGuestCartPayload,nt as getRegions,Y as getStoreConfig,Z as initialize,tt as initializeCart,k as publishShoppingCartViewEvent,rt as refreshCart,z as removeFetchGraphQlHeader,ft as removeGiftCardFromCart,V as resetCart,L as setEndpoint,j as setFetchGraphQlHeader,B as setFetchGraphQlHeaders,gt as setGiftOptionsOnCart,at as updateProductsFromCart};
