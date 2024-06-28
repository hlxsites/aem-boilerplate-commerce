import{C as P,a as A,s as f,f as I,h as v,t as D}from"./resetCart.js";import{events as g}from"@dropins/tools/event-bus.js";function T(r){const{cart:e,locale:t="en-US"}=r;return{id:e.id,items:m(e.items,t),prices:{subtotalExcludingTax:e.subtotal.excludingTax,subtotalIncludingTax:e.subtotal.includingTax},totalQuantity:e.totalQuantity,possibleOnepageCheckout:void 0,giftMessageSelected:void 0,giftWrappingSelected:void 0,source:void 0}}function m(r,e){return r.map(t=>{var a;return{canApplyMsrp:!1,formattedPrice:h(e,t.price.currency,t.price.value),id:t.uid,prices:{price:t.price},product:{productId:t.uid,name:t.name,sku:t.sku,topLevelSku:void 0,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:t.url.categories,productType:void 0,pricing:{regularPrice:t.regularPrice.value,minimalPrice:void 0,maximalPrice:void 0,specialPrice:(a=t.discount)==null?void 0:a.value,tierPricing:void 0,currencyCode:t.regularPrice.currency},canonicalUrl:t.url.urlKey,mainImageUrl:t.image.src,image:{src:t.image.src,alt:t.image.alt}},configurableOptions:void 0,quantity:t.quantity}})}function h(r,e,t){const a=r.replace("_","-");return new Intl.NumberFormat(a,{style:"currency",currency:e}).format(t)}const c={SHOPPING_CART_CONTEXT:"shoppingCartContext",PRODUCT_CONTEXT:"productContext",CHANGED_PRODUCTS_CONTEXT:"changedProductsContext"},s={OPEN_CART:"open-cart",ADD_TO_CART:"add-to-cart",REMOVE_FROM_CART:"remove-from-cart",SHOPPING_CART_VIEW:"shopping-cart-view"};function _(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function i(r,e){const t=_();t.push({[r]:null}),t.push({[r]:e})}function l(r,e){_().push(a=>{const n=a.getState?a.getState():{};a.push({event:r,eventInfo:{...n,...e}})})}function b(r,e,t){const a=T({cart:r,locale:t});i(c.SHOPPING_CART_CONTEXT,{...a}),l(s.OPEN_CART),m(e,t).forEach(d=>{i(c.PRODUCT_CONTEXT,d.product),p(a,[d],s.ADD_TO_CART)})}function x(r,e){const t=T({cart:r,locale:e});i(c.SHOPPING_CART_CONTEXT,{...t}),l(s.SHOPPING_CART_VIEW)}function p(r,e,t){const a={items:e};i(c.SHOPPING_CART_CONTEXT,{...r}),i(c.CHANGED_PRODUCTS_CONTEXT,{...a}),l(t)}function N(r,e,t){const a=T({cart:r,locale:t}),n=a.items,d=_(),E=d.getState?d.getState():{},{shoppingCartContext:{items:R=[]}={}}=E;e.forEach(O=>{const u=R.find(C=>C.id===O.uid),o=n.find(C=>C.id===O.uid);!o&&!u||(!u&&o?(i(c.PRODUCT_CONTEXT,o.product),p(a,[o],s.ADD_TO_CART)):u&&!o?(i(c.PRODUCT_CONTEXT,u.product),p(a,[u],s.REMOVE_FROM_CART)):o.quantity>u.quantity?(i(c.PRODUCT_CONTEXT,o.product),p(a,[o],s.ADD_TO_CART)):(i(c.PRODUCT_CONTEXT,o.product),p(a,[o],s.REMOVE_FROM_CART)))})}const y=`
  mutation UPDATE_PRODUCTS_FROM_CART_MUTATION(
      $cartId: String!, 
      $cartItems: [CartItemUpdateInput!]!,
      ${P}
    ) {
    updateCartItems(
      input: {
        cart_id: $cartId
        cart_items: $cartItems  
      }
    ) {
      cart {
        ...CartFragment
      }

    }
  }
  ${A}
`,M=async r=>{const e=f.cartId;if(!e)throw Error("Cart ID is not set");return I(y,{variables:{cartId:e,cartItems:r.map(({uid:t,quantity:a})=>({cart_item_uid:t,quantity:a}))}}).then(({errors:t,data:a})=>{if(t)return v(t);const n=D(a.updateCartItems.cart);return g.emit("cart/updated",n),g.emit("cart/data",n),n&&N(n,r,f.locale||"en-US"),n})};export{N as a,x as b,b as p,M as u};
//# sourceMappingURL=updateProductsFromCart.js.map
