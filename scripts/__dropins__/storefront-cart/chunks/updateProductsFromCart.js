/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as n,f as d,h as I}from"./resetCart.js";import{C as _,t as T}from"./refreshCart.js";import{events as o}from"@dropins/tools/event-bus.js";import{a as C}from"./acdl.js";import{CART_FRAGMENT as f}from"../fragments.js";const A=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${_}
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

  ${f}
`,M=async e=>{const c=n.cartId;if(!c)throw Error("Cart ID is not set");return d(A,{variables:{cartId:c,cartItems:e.map(({uid:s,quantity:r,giftOptions:a})=>({cart_item_uid:s,quantity:r,...a}))}}).then(({errors:s,data:r})=>{var m;const a=[...((m=r==null?void 0:r.updateCartItems)==null?void 0:m.user_errors)??[],...s??[]];if(a.length>0)return I(a);const t=T(r.updateCartItems.cart);if(o.emit("cart/updated",t),o.emit("cart/data",t),t){const i=t.items.filter(p=>e.some(u=>u.uid===p.uid));i.length>0&&o.emit("cart/product/updated",i)}return t&&C(t,e,n.locale??"en-US"),t})};export{M as u};
