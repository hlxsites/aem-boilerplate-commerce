/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{FetchGraphQL as lt}from"@dropins/tools/fetch-graphql.js";import{Initializer as dt}from"@dropins/tools/lib.js";const b=9,G=1;function _t(t){const e=document.cookie.split(";");for(const i of e)if(i.trim().startsWith(`${t}=`))return i.trim().substring(t.length+1);return null}const z={wishlistId:null,authenticated:!1,isLoading:!0},Z=()=>z.storeCode&&z.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${z.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",o=new Proxy(z,{set(t,e,i){if(t[e]=i,e==="wishlistId"){const r=Z();if(i===o.wishlistId)return!0;if(i===null)return document.cookie=`${r}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const s=new Date;s.setDate(s.getDate()+30),document.cookie=`${r}=${i}; expires=${s.toUTCString()}; path=/`}return Reflect.set(t,e,i)},get(t,e){return e==="wishlistId"?_t(Z()):t[e]}});function W(t,e){var s;if(t.product.sku!==e.sku)return!1;const i=((s=t.selectedOptions)==null?void 0:s.map(n=>n.uid).filter(n=>!!n).sort())||[],r=(e.optionUIDs||[]).filter(n=>!!n).sort();return JSON.stringify(i)===JSON.stringify(r)}const j="DROPIN__WISHLIST__WISHLIST__DATA",It="DROPIN__WISHLIST__ALL_ITEMS__DATA",nt=t=>o.storeCode&&o.storeCode!=="default"?`${t}__${o.storeCode}`:t,C=(t=!1)=>o.authenticated&&!t?sessionStorage:localStorage,H=t=>nt(t?`${j}__${t}`:j),rt=t=>{var i;if(!t)return 0;const e=(i=o.guestWishlistTtl)==null?void 0:i[t];return typeof e=="number"&&e>0?e*24*60*60*1e3:0};function Q(t,e){const i=C(),r=H(e);if(t){const s=rt(e)>0?{...t,savedAt:Date.now()}:t;try{i.setItem(r,JSON.stringify(s))}catch(n){ot(n)?console.error("Storage quota exceeded:",n):console.error("Error saving wishlist:",n)}}else i.removeItem(r)}const ot=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function $(t=!1,e){const i=C(t),r=H(e);try{const s=i.getItem(r);if(!s)return{id:"",items:[]};const n=JSON.parse(s),u=rt(e);return u>0&&n.savedAt&&Date.now()-n.savedAt>u?(i.removeItem(r),{id:"",items:[]}):n}catch(s){return console.error("Error retrieving wishlist:",s),{id:"",items:[]}}}function X(t){localStorage.removeItem(H(t))}function kt(t,e=[]){var u;const i=C(),r=H(),s=i.getItem(r),n=s?JSON.parse(s):{items:[]};return(u=n==null?void 0:n.items)==null?void 0:u.find(_=>W(_,{sku:t,optionUIDs:e}))}const Y=()=>nt(It);let k=0;function K(){return k}function F(){try{const t=C().getItem(Y());return t?JSON.parse(t):[]}catch{return[]}}function J(t){try{C().setItem(Y(),JSON.stringify(t))}catch(e){ot(e)&&console.error("Storage quota exceeded (all-items):",e)}}function V(t){k++,J(t)}function zt(){return F()}function mt(){k++;const t=Y();sessionStorage.removeItem(t),localStorage.removeItem(t)}function q(t){k++,J([...F(),...t])}function R(t){k++;const e=F();J(e.filter(i=>!t.some(r=>{var s;return W(i,{sku:r.product.sku,optionUIDs:(s=r.selectedOptions)==null?void 0:s.map(n=>n.uid)})})))}function Gt(t,e){return F().find(i=>W(i,{sku:t,optionUIDs:e}))}const B=new dt({init:async t=>{const e={isGuestWishlistEnabled:!1,...t};B.config.setConfig(e),o.storeCode=t.storeCode||void 0,o.pageSize=t.pageSize,o.guestWishlistTtl=t.guestWishlistTtl,it({pageSize:t.pageSize}).catch(console.error)},listeners:()=>[d.on("wishlist/data",t=>{Q(t)},{eager:!0}),d.on("authenticated",async t=>{var e;if(o.authenticated&&!t&&d.emit("wishlist/reset",void 0),t&&!o.authenticated){o.authenticated=t;const i=await it({pageSize:(e=B.config.getConfig())==null?void 0:e.pageSize}).catch(console.error);i&&Nt(i)}},{eager:!0}),d.on("wishlist/reset",()=>{mt(),Ut().catch(console.error),d.emit("wishlist/data",null)})]}),Ht=B.config,{setEndpoint:Ft,setFetchGraphQlHeader:xt,removeFetchGraphQlHeader:qt,setFetchGraphQlHeaders:Bt,fetchGraphQl:O,getConfig:Qt}=new lt().getMethods();function ht(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function U(t,e){return t?{id:t.id,name:t.name,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:gt(t,e??[]),page_info:pt(t)}:null}function pt(t){var i;const e=(i=t==null?void 0:t.items_v2)==null?void 0:i.page_info;if(e)return{currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}}function gt(t,e){var i,r;return(r=(i=t==null?void 0:t.items_v2)==null?void 0:i.items)!=null&&r.length?t.items_v2.items.map(s=>{const n=ft(s);return{id:s.id,quantity:s.quantity,description:s.description,added_at:s.added_at,enteredOptions:e,selectedOptions:n,product:{sku:s.product.sku}}}):[]}function ft(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(e=>({uid:e.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(i=>i.values??[]).map(i=>({uid:i.uid})):[]}const D=t=>{const e=t.map(i=>i.message).join(" ");throw Error(e)},St=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,Tt=async()=>O(St,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>t?D(t):ht(e)),wt=`
  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price{
        type
        units
        value
      }
    }
  }
`,Et=`
  ... on ConfigurableWishlistItem {
    configurable_options {
      option_label
      value_label
      configurable_product_option_value_uid
      configurable_product_option_uid
    }
    configured_variant {
      canonical_url
    }
  }
`,Wt=`
  ... on DownloadableWishlistItem {
    added_at
    description
    links_v2 {
      sample_url
      sort_order
      title
      uid
    }
    quantity
  }
`,Ot=`
  ... on GiftCardWishlistItem {
    added_at
    description
    gift_card_options {
      amount {
        value
        currency
      }
      custom_giftcard_amount {
        value
        currency
      }
      message
      recipient_email
      recipient_name
      sender_email
      sender_name
    }
  }
`,Pt=`
  ... on BundleWishlistItem {
    bundle_options {
      label
      type
      uid
      values {
        uid
        label
        quantity
      }
    }
  }
`,ut=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${Et}
    ${Wt}
    ${Ot}
    ${Pt}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${wt}
`,x=`
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    name
    updated_at
    sharing_code
    items_count
    items_v2(pageSize: $pageSize, currentPage: $currentPage) {
      items {
        ...WISHLIST_ITEM_FRAGMENT
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
  }

${ut}
`,ct=`
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
    $pageSize: Int = 9,
    $currentPage: Int = 1,
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
        name
        updated_at
        sharing_code
        items_count
        items_v2(pageSize: $pageSize, currentPage: $currentPage) {
          items {
            ...WISHLIST_ITEM_FRAGMENT
          }
          page_info {
            current_page
            page_size
            total_pages
          }
        }
      }
    }
  }

${ut}
`,Dt=async(t,e=b,i=G,r={})=>{const{scope:s}=r;if(!o.authenticated){const n=$(!0,t||void 0);return s&&d.emit("wishlist/data",n,{scope:s}),n}if(!t)throw Error("Wishlist ID is not set");return O(ct,{variables:{wishlistId:t,pageSize:e,currentPage:i}}).then(({errors:n,data:u})=>{var f;if(n)return D(n);if(!((f=u==null?void 0:u.customer)!=null&&f.wishlist_v2))return null;const _=U(u.customer.wishlist_v2);return d.emit("wishlist/data",_,{scope:s}),_})},At=`
  query GET_WISHLISTS_QUERY($pageSize: Int = 9, $currentPage: Int = 1) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${x}
`,vt=async(t=b,e=G)=>o.authenticated?O(At,{variables:{pageSize:t,currentPage:e}}).then(({errors:i,data:r})=>{var s;return i?D(i):(s=r==null?void 0:r.customer)!=null&&s.wishlists?r.customer.wishlists.map(n=>U(n)):null}):$(),$t=`
  mutation CREATE_WISHLIST_MUTATION(
    $name: String!,
    $visibility: WishlistVisibilityEnum!,
    $pageSize: Int = 9,
    $currentPage: Int = 1,
  ) {
    createWishlist(
      input: { name: $name, visibility: $visibility }
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
    }
  }
${x}
`,Yt=async(t,e="PRIVATE")=>{var u;if(!o.authenticated)return null;if(!(t!=null&&t.trim()))throw Error("Wishlist name is required");const i={name:t,visibility:e,pageSize:o.pageSize??b,currentPage:o.currentPage??G},{errors:r,data:s}=await O($t,{variables:i});if(r)return D(r);const n=(u=s==null?void 0:s.createWishlist)==null?void 0:u.wishlist;return n?U(n):null},tt=`
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
      $pageSize: Int = 9,
      $currentPage: Int = 1,
    ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
${x}
`;async function at(t,e,i){var T;const r=((T=e.page_info)==null?void 0:T.totalPages)??1,s=e.items??[];if(r<=1)return;const n=K(),u=Array.from({length:r-1},(h,S)=>S+2),_=await Promise.all(u.map(h=>O(ct,{variables:{wishlistId:t,pageSize:i,currentPage:h}}).then(({data:S})=>{var l;if(!((l=S==null?void 0:S.customer)!=null&&l.wishlist_v2))return[];const I=U(S.customer.wishlist_v2);return(I==null?void 0:I.items)??[]}).catch(()=>[])));if(K()!==n)return;const f=[...s,..._.flat()];V(f),d.emit("wishlist/allItems",f)}const et=async(t,e,i={})=>{var _,f,T,h,S,I,l,m,p,P;if(!t)return null;const{scope:r}=i;if(o.authenticated&&e){const c={wishlistId:e,wishlistItems:t.map(({sku:E,quantity:A,optionsUIDs:M,enteredOptions:v})=>({sku:E,quantity:A,selected_options:M,entered_options:v})),pageSize:o.pageSize,currentPage:o.currentPage??1},{errors:g,data:a}=await O(tt,{variables:c}),w=[...((_=a==null?void 0:a.addProductsToWishlist)==null?void 0:_.user_errors)??[],...g??[]];return w.length>0?D(w):U(a.addProductsToWishlist.wishlist,((f=t[0])==null?void 0:f.enteredOptions)??[])}if(!o.authenticated&&e){const c=$(!0,e),g={id:(c==null?void 0:c.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(c==null?void 0:c.items)??[]};for(const a of t){if((T=g.items)==null?void 0:T.some(A=>W(A,{sku:a.sku,optionUIDs:a.optionsUIDs})))continue;const E=a.optionsUIDs?(h=a.optionsUIDs)==null?void 0:h.map(A=>({uid:A})):[];g.items=[...g.items,{id:crypto.randomUUID(),quantity:a.quantity,selectedOptions:E,enteredOptions:a.enteredOptions??[],product:{sku:a.sku}}]}return g.items_count=(S=g.items)==null?void 0:S.length,Q(g,e),r&&d.emit("wishlist/data",g,{scope:r}),g}const s=$(),n={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const c of t){if((I=n.items)==null?void 0:I.some(w=>W(w,{sku:c.sku,optionUIDs:c.optionsUIDs})))continue;const a=c.optionsUIDs?(l=c.optionsUIDs)==null?void 0:l.map(w=>({uid:w})):[];n.items=[...n.items,{id:crypto.randomUUID(),quantity:c.quantity,selectedOptions:a,enteredOptions:c.enteredOptions??[],product:{sku:c.sku}}]}const u=n.items.slice(((s==null?void 0:s.items)??[]).length);if(n.items_count=(m=n.items)==null?void 0:m.length,q(u),d.emit("wishlist/data",n),o.authenticated){if(!o.wishlistId)throw R(u),d.emit("wishlist/data",s),Error("Wishlist ID is not set");const c={wishlistId:o.wishlistId,wishlistItems:t.map(({sku:v,quantity:L,optionsUIDs:y,enteredOptions:N})=>({sku:v,quantity:L,selected_options:y,entered_options:N})),pageSize:o.pageSize,currentPage:o.currentPage??1},{errors:g,data:a}=await O(tt,{variables:c}),w=[...((p=a==null?void 0:a.addProductsToWishlist)==null?void 0:p.user_errors)??[],...g??[]];if(w.length>0)return R(u),d.emit("wishlist/data",s),D(w);const E=U(a.addProductsToWishlist.wishlist,((P=t[0])==null?void 0:P.enteredOptions)??[]),A=(E==null?void 0:E.items)??[],M=u.filter(v=>A.some(L=>{var y;return W(L,{sku:v.product.sku,optionUIDs:(y=v.selectedOptions)==null?void 0:y.map(N=>N.uid)})}));M.length>0&&(R(M),q(A.filter(v=>M.some(L=>{var y;return W(v,{sku:L.product.sku,optionUIDs:(y=L.selectedOptions)==null?void 0:y.map(N=>N.uid)})})))),d.emit("wishlist/data",E),M.length<u.length&&E&&at(o.wishlistId,E,o.pageSize??b).catch(console.error)}return null},st=`
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
`,Jt=async(t,e,i={})=>{var u,_,f,T,h,S;const{scope:r}=i;if(o.authenticated&&e){const I=t.map(P=>P.id),{errors:l,data:m}=await O(st,{variables:{wishlistId:e,wishlistItemsIds:I}}),p=[...((u=m==null?void 0:m.removeProductsFromWishlist)==null?void 0:u.user_errors)??[],...l??[]];return p.length>0?D(p):null}if(!o.authenticated&&e){const I=$(!0,e),l={...I,items:(_=I.items)==null?void 0:_.filter(m=>!t.some(p=>{var P;return W(m,{sku:p.product.sku,optionUIDs:(P=p.selectedOptions)==null?void 0:P.map(c=>c.uid)})}))};return l.items_count=(f=l.items)==null?void 0:f.length,Q(l,e),r&&d.emit("wishlist/data",l,{scope:r}),l}const s=$(),n={...s,items:(T=s.items)==null?void 0:T.filter(I=>!t.some(l=>{var m;return W(I,{sku:l.product.sku,optionUIDs:(m=l.selectedOptions)==null?void 0:m.map(p=>p.uid)})}))};if(o.authenticated){if(!o.wishlistId)throw Error("Wishlist ID is not set");R(t);const I=t.map(P=>P.id),{errors:l,data:m}=await O(st,{variables:{wishlistId:o.wishlistId,wishlistItemsIds:I}}),p=[...((h=m==null?void 0:m.removeProductsFromWishlist)==null?void 0:h.user_errors)??[],...l??[]];return p.length>0?(q(t),d.emit("wishlist/data",s),D(p)):(await Dt(o.wishlistId,o.pageSize,o.currentPage),null)}return R(t),n.items_count=(S=n.items)==null?void 0:S.length,d.emit("wishlist/data",n),null},yt=`
  mutation UPDATE_PRODUCTS_IN_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemUpdateInput!]!,
      $pageSize: Int = 9,
      $currentPage: Int = 1,
    ) {
    updateProductsInWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
  
   ${x} 
`,Vt=async t=>{const e=o.wishlistId;if(!e)throw Error("Wishlist ID is not set");return O(yt,{variables:{wishlistId:e,pageSize:o.pageSize,currentPage:o.currentPage,wishlistItems:t.map(({wishlistItemId:i,quantity:r,description:s,selectedOptions:n,enteredOptions:u})=>({wishlistItemId:i,quantity:r,description:s,selected_options:n,entered_options:u}))}}).then(({errors:i,data:r})=>{var n;const s=[...((n=r==null?void 0:r.updateProductsInWishlist)==null?void 0:n.user_errors)??[],...i??[]];return s.length>0?D(s):U(r.updateProductsInWishlist.wishlist)})},Ut=()=>(o.wishlistId=null,o.authenticated=!1,Promise.resolve(null)),it=async(t={})=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await Tt());const e=o.authenticated?await Mt(t):await Lt();return d.emit("wishlist/initialized",e),d.emit("wishlist/data",e),o.initializing=!1,e};async function Mt(t={}){const{pageSize:e=b,currentPage:i=G}=t,r=await vt(e,i),s=r?r[0]:null;return s?(o.wishlistId=s.id,V(s.items??[]),at(s.id,s,e).catch(console.error),s):null}async function Lt(){try{const t=$();return t!=null&&t.items&&V(t.items),t}catch(t){throw console.error(t),t}}const Nt=async(t,e)=>{var n;if(!t)return null;const i=$(!0,e),r=[];if((n=i==null?void 0:i.items)==null||n.forEach(u=>{var T;const _=((T=u.selectedOptions)==null?void 0:T.map(h=>h.uid))||[];if(!t.items.some(h=>W(h,{sku:u.product.sku,optionUIDs:_}))){const h={sku:u.product.sku,quantity:1,optionsUIDs:_,enteredOptions:u.enteredOptions||void 0};r.push(h)}}),r.length===0)return e&&X(e),null;const s=e?await et(r,t.id):await et(r);return X(e),s};export{G as DEFAULT_CURRENT_PAGE,b as DEFAULT_PAGE_SIZE,et as addProductsToWishlist,q as addToPersistedAllWishlistItems,mt as clearPersistedAllWishlistItems,X as clearPersistedLocalStorage,Ht as config,Yt as createWishlist,O as fetchGraphQl,Gt as findInPersistedAllWishlistItems,K as getAllItemsCacheVersion,Qt as getConfig,Mt as getDefaultWishlist,Lt as getGuestWishlist,zt as getPersistedAllWishlistItems,$ as getPersistedWishlistData,Tt as getStoreConfig,Dt as getWishlistById,kt as getWishlistItemFromStorage,vt as getWishlists,B as initialize,it as initializeWishlist,Nt as mergeWishlists,qt as removeFetchGraphQlHeader,R as removeFromPersistedAllWishlistItems,Jt as removeProductsFromWishlist,Ut as resetWishlist,o as s,Ft as setEndpoint,xt as setFetchGraphQlHeader,Bt as setFetchGraphQlHeaders,V as setPersistedAllWishlistItems,Q as setPersistedWishlistData,Vt as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
