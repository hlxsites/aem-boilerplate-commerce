import{events as e}from"@dropins/tools/event-bus.js";import{s as a,e as g,i as h,C as u,a as d,f as i,h as C,t as s}from"./resetCart.js";import{g as I}from"./getStoreConfig.js";import{Initializer as T}from"@dropins/tools/lib.js";const l=new T({init:async t=>{const r={disableGuestCart:!1,...t};l.config.setConfig(r),o().catch(console.error)},listeners:()=>[e.on("authenticated",async t=>{a.authenticated&&!t?e.emit("cart/reset",void 0):t&&!a.authenticated&&(a.authenticated=t,o().catch(console.error))},{eager:!0}),e.on("locale",async t=>{t!==a.locale&&(a.locale=t,o().catch(console.error))}),e.on("cart/reset",()=>{g().catch(console.error),e.emit("cart/data",null)}),e.on("cart/data",t=>{h(t)})]}),_=l.config,R=`
  query GUEST_CART_QUERY(
      $cartId: String!,
      ${u}
    ) {

    cart(cart_id: $cartId){
      ...CartFragment
    }
  }

  ${d}
`,E=`
  query CUSTOMER_CART_QUERY(
      ${u}
    ) {

    cart: customerCart {
      ...CartFragment
    }
  }

  ${d}
`,m=async()=>{const t=a.authenticated,r=a.cartId;if(t)return i(E,{method:"POST"}).then(({errors:n,data:c})=>n?C(n):s(c.cart));if(!r)throw new Error("No cart ID found");return i(R,{method:"POST",cache:"no-cache",variables:{cartId:r}}).then(({errors:n,data:c})=>n?C(n):s(c.cart))},y=`
  mutation MERGE_CARTS_MUTATION(
      $guestCartId: String!, 
      $customerCartId: String!,
      ${u}
    ) {
    mergeCarts(
      source_cart_id: $guestCartId,
      destination_cart_id: $customerCartId
    ) {
      ...CartFragment 
    }
  }

  ${d}
`,o=async()=>{a.config=await I();const t=a.authenticated?await A():await S();return e.emit("cart/initialized",t),e.emit("cart/data",t),t};async function A(){const t=a.cartId,r=await m();return r?(a.cartId=r.id,!t||r.id===t?r:await i(y,{variables:{guestCartId:t,customerCartId:r.id}}).then(({data:n})=>{const c=s(n.mergeCarts),f={oldCartItems:r.items,newCart:c};return e.emit("cart/merged",f),c}).catch(()=>(console.error("Could not merge carts"),r))):null}async function S(){if(_.getConfig().disableGuestCart===!0||!a.cartId)return null;try{return await m()}catch(t){return console.error(t),null}}export{o as a,_ as c,m as g,l as i};
//# sourceMappingURL=initializeCart.js.map
