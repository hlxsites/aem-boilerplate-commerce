/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as m,f as i,h as p}from"./resetCart.js";import{C as I,t as _}from"./refreshCart.js";import{events as n}from"@dropins/tools/event-bus.js";import{a as T}from"./acdl.js";import{CART_FRAGMENT as u}from"../fragments.js";const C=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${I}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems
      }
    ) {
      cart {
        ...CART_FRAGMENT
      }

    }
  }

  ${u}
`,U=async e=>{const o=m.cartId;if(!o)throw Error("Cart ID is not set");return console.log("items :>> ",e),console.log("cartId :>> ",o),i(C,{variables:{cartId:o,cartItems:e.map(({uid:s,quantity:t,giftOptions:a})=>({cart_item_uid:s,quantity:t,...a}))}}).then(({errors:s,data:t})=>{var c;const a=[...((c=t==null?void 0:t.updateCartItems)==null?void 0:c.user_errors)??[],...s??[]];if(a.length>0)return p(a);const r=_(t.updateCartItems.cart);return n.emit("cart/updated",r),n.emit("cart/data",r),r&&T(r,e,m.locale??"en-US"),r})};export{U as u};
