/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{FetchGraphQL as m}from"@dropins/tools/fetch-graphql.js";function S(e){const s=document.cookie.split(";");for(const t of s)if(t.trim().startsWith(`${e}=`))return t.trim().substring(e.length+1);return null}const g={wishlistId:null,authenticated:!1,isLoading:!0},i=new Proxy(g,{set(e,s,t){if(e[s]=t,s==="wishlistId"){if(t===i.wishlistId)return!0;if(t===null)return document.cookie="DROPIN__WISHLIST__WISHLIST-ID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/",!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`DROPIN__WISHLIST__WISHLIST-ID=${t}; expires=${r.toUTCString()}; path=/`}return Reflect.set(e,s,t)},get(e,s){return s==="wishlistId"?S("DROPIN__WISHLIST__WISHLIST-ID"):e[s]}}),o="DROPIN__WISHLIST__WISHLIST__DATA";function E(e){const s=i.authenticated?sessionStorage:localStorage;if(e)try{s.setItem(o,JSON.stringify(e))}catch(t){_(t)?console.error("Storage quota exceeded:",t):console.error("Error saving wishlist:",t)}else s.removeItem(o)}const _=e=>e instanceof DOMException&&e.name==="QuotaExceededError";function f(e=!1){const s=i.authenticated&&!e?sessionStorage:localStorage;try{const t=s.getItem(o);return t?JSON.parse(t):{id:"",items:[]}}catch(t){return console.error("Error retrieving wishlist:",t),{id:"",items:[]}}}function O(){localStorage.removeItem(o)}function H(e){var r;const s=i.authenticated?sessionStorage:localStorage,t=s.getItem(o)?JSON.parse(s.getItem(o)):{items:[]};return(r=t==null?void 0:t.items)==null?void 0:r.find(a=>{var n;return((n=a.product)==null?void 0:n.sku)===e})}const{setEndpoint:L,setFetchGraphQlHeader:P,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:R,fetchGraphQl:p,getConfig:$}=new m().getMethods(),w=e=>{const s=e.map(t=>t.message).join(" ");throw Error(s)},T=`
  mutation REMOVE_PRODUCTS_FROM_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItemsIds: [ID!]!,
    ) {
    removeProductsFromWishlist(
      wishlistId: $wishlistId
      wishlistItemsIds: $wishlistItemsIds
    ) {
      user_errors {
        code
        message
      }
    }
  }
`,x=async e=>{var r,a,n;const s=f(),t={...s,items:(r=s.items)==null?void 0:r.filter(c=>!e.map(l=>l.product.sku).includes(c.product.sku))};if(t.items_count=(a=t.items)==null?void 0:a.length,d.emit("wishlist/data",t),i.authenticated){if(!i.wishlistId)throw Error("Wishlist ID is not set");const c=e.map(u=>u.id),{errors:l,data:I}=await p(T,{variables:{wishlistId:i.wishlistId,wishlistItemsIds:c}}),h=[...((n=I==null?void 0:I.removeProductsFromWishlist)==null?void 0:n.user_errors)??[],...l??[]];return h.length>0?(d.emit("wishlist/data",s),w(h)):null}return null};export{L as a,P as b,F as c,R as d,$ as e,p as f,f as g,w as h,E as i,O as j,H as k,x as r,i as s};
