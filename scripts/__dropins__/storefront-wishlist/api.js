/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as m}from"@dropins/tools/event-bus.js";import{FetchGraphQL as ct}from"@dropins/tools/fetch-graphql.js";import{Initializer as lt}from"@dropins/tools/lib.js";const N=9,k=1;function at(t){const e=document.cookie.split(";");for(const s of e)if(s.trim().startsWith(`${t}=`))return s.trim().substring(t.length+1);return null}const C={wishlistId:null,authenticated:!1,isLoading:!0},J=()=>C.storeCode&&C.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${C.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",o=new Proxy(C,{set(t,e,s){if(t[e]=s,e==="wishlistId"){const n=J();if(s===o.wishlistId)return!0;if(s===null)return document.cookie=`${n}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const i=new Date;i.setDate(i.getDate()+30),document.cookie=`${n}=${s}; expires=${i.toUTCString()}; path=/`}return Reflect.set(t,e,s)},get(t,e){return e==="wishlistId"?at(J()):t[e]}});function w(t,e){var i;if(t.product.sku!==e.sku)return!1;const s=((i=t.selectedOptions)==null?void 0:i.map(r=>r.uid).filter(r=>!!r).sort())||[],n=(e.optionUIDs||[]).filter(r=>!!r).sort();return JSON.stringify(s)===JSON.stringify(n)}const V="DROPIN__WISHLIST__WISHLIST__DATA",dt="DROPIN__WISHLIST__ALL_ITEMS__DATA",st=t=>o.storeCode&&o.storeCode!=="default"?`${t}__${o.storeCode}`:t,R=(t=!1)=>o.authenticated&&!t?sessionStorage:localStorage,z=t=>st(t?`${V}__${t}`:V),it=t=>{var s;if(!t)return 0;const e=(s=o.guestWishlistTtl)==null?void 0:s[t];return typeof e=="number"&&e>0?e*24*60*60*1e3:0};function q(t,e){const s=R(),n=z(e);if(t){const i=it(e)>0?{...t,savedAt:Date.now()}:t;try{s.setItem(n,JSON.stringify(i))}catch(r){nt(r)?console.error("Storage quota exceeded:",r):console.error("Error saving wishlist:",r)}}else s.removeItem(n)}const nt=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function A(t=!1,e){const s=R(t),n=z(e);try{const i=s.getItem(n);if(!i)return{id:"",items:[]};const r=JSON.parse(i),u=it(e);return u>0&&r.savedAt&&Date.now()-r.savedAt>u?(s.removeItem(n),{id:"",items:[]}):r}catch(i){return console.error("Error retrieving wishlist:",i),{id:"",items:[]}}}function Z(t){localStorage.removeItem(z(t))}function bt(t,e=[]){var u;const s=R(),n=z(),i=s.getItem(n),r=i?JSON.parse(i):{items:[]};return(u=r==null?void 0:r.items)==null?void 0:u.find(h=>w(h,{sku:t,optionUIDs:e}))}const B=()=>st(dt);let b=0;function j(){return b}function G(){try{const t=R().getItem(B());return t?JSON.parse(t):[]}catch{return[]}}function Q(t){try{R().setItem(B(),JSON.stringify(t))}catch(e){nt(e)&&console.error("Storage quota exceeded (all-items):",e)}}function Y(t){b++,Q(t)}function Ct(){return G()}function _t(){b++;const t=B();sessionStorage.removeItem(t),localStorage.removeItem(t)}function F(t){b++,Q([...G(),...t])}function L(t){b++;const e=G();Q(e.filter(s=>!t.some(n=>{var i;return w(s,{sku:n.product.sku,optionUIDs:(i=n.selectedOptions)==null?void 0:i.map(r=>r.uid)})})))}function kt(t,e){return G().find(s=>w(s,{sku:t,optionUIDs:e}))}const x=new lt({init:async t=>{const e={isGuestWishlistEnabled:!1,...t};x.config.setConfig(e),o.storeCode=t.storeCode||void 0,o.pageSize=t.pageSize,o.guestWishlistTtl=t.guestWishlistTtl,et({pageSize:t.pageSize}).catch(console.error)},listeners:()=>[m.on("wishlist/data",t=>{q(t)},{eager:!0}),m.on("authenticated",async t=>{var e;if(o.authenticated&&!t&&m.emit("wishlist/reset",void 0),t&&!o.authenticated){o.authenticated=t;const s=await et({pageSize:(e=x.config.getConfig())==null?void 0:e.pageSize}).catch(console.error);s&&Mt(s)}},{eager:!0}),m.on("wishlist/reset",()=>{_t(),$t().catch(console.error),m.emit("wishlist/data",null)})]}),zt=x.config,{setEndpoint:Gt,setFetchGraphQlHeader:Ht,removeFetchGraphQlHeader:Ft,setFetchGraphQlHeaders:xt,fetchGraphQl:E,getConfig:qt}=new ct().getMethods();function It(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function $(t,e){return t?{id:t.id,name:t.name,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:ht(t,e??[]),page_info:mt(t)}:null}function mt(t){var s;const e=(s=t==null?void 0:t.items_v2)==null?void 0:s.page_info;if(e)return{currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}}function ht(t,e){var s,n;return(n=(s=t==null?void 0:t.items_v2)==null?void 0:s.items)!=null&&n.length?t.items_v2.items.map(i=>{const r=pt(i);return{id:i.id,quantity:i.quantity,description:i.description,added_at:i.added_at,enteredOptions:e,selectedOptions:r,product:{sku:i.product.sku}}}):[]}function pt(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(e=>({uid:e.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(s=>s.values??[]).map(s=>({uid:s.uid})):[]}const O=t=>{const e=t.map(s=>s.message).join(" ");throw Error(e)},gt=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,ft=async()=>E(gt,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>t?O(t):It(e)),St=`
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
`,Tt=`
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
`,wt=`
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
`,Et=`
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
`,Wt=`
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
`,rt=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${Tt}
    ${wt}
    ${Et}
    ${Wt}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${St}
`,H=`
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

${rt}
`,ot=`
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

${rt}
`,Ot=async(t,e=N,s=k,n={})=>{const{scope:i}=n;if(!o.authenticated){const r=A(!0,t||void 0);return i&&m.emit("wishlist/data",r,{scope:i}),r}if(!t)throw Error("Wishlist ID is not set");return E(ot,{variables:{wishlistId:t,pageSize:e,currentPage:s}}).then(({errors:r,data:u})=>{var p;if(r)return O(r);if(!((p=u==null?void 0:u.customer)!=null&&p.wishlist_v2))return null;const h=$(u.customer.wishlist_v2);return m.emit("wishlist/data",h,{scope:i}),h})},Pt=`
  query GET_WISHLISTS_QUERY($pageSize: Int = 9, $currentPage: Int = 1) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${H}
`,Dt=async(t=N,e=k)=>o.authenticated?E(Pt,{variables:{pageSize:t,currentPage:e}}).then(({errors:s,data:n})=>{var i;return s?O(s):(i=n==null?void 0:n.customer)!=null&&i.wishlists?n.customer.wishlists.map(r=>$(r)):null}):A(),At=`
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
${H}
`,Bt=async(t,e="PRIVATE")=>{var u;if(!o.authenticated)return null;if(!(t!=null&&t.trim()))throw Error("Wishlist name is required");const s={name:t,visibility:e,pageSize:o.pageSize??N,currentPage:o.currentPage??k},{errors:n,data:i}=await E(At,{variables:s});if(n)return O(n);const r=(u=i==null?void 0:i.createWishlist)==null?void 0:u.wishlist;return r?$(r):null},X=`
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
${H}
`;async function ut(t,e,s){var f;const n=((f=e.page_info)==null?void 0:f.totalPages)??1,i=e.items??[];if(n<=1)return;const r=j(),u=Array.from({length:n-1},(c,l)=>l+2),h=await Promise.all(u.map(c=>E(ot,{variables:{wishlistId:t,pageSize:s,currentPage:c}}).then(({data:l})=>{var I;if(!((I=l==null?void 0:l.customer)!=null&&I.wishlist_v2))return[];const d=$(l.customer.wishlist_v2);return(d==null?void 0:d.items)??[]}).catch(()=>[])));if(j()!==r)return;const p=[...i,...h.flat()];Y(p),m.emit("wishlist/allItems",p)}const K=async(t,e)=>{var r,u,h,p,f,c,l,d,I,W;if(!t)return null;if(o.authenticated&&e){const a={wishlistId:e,wishlistItems:t.map(({sku:T,quantity:P,optionsUIDs:y,enteredOptions:D})=>({sku:T,quantity:P,selected_options:y,entered_options:D})),pageSize:o.pageSize,currentPage:o.currentPage??1},{errors:g,data:_}=await E(X,{variables:a}),S=[...((r=_==null?void 0:_.addProductsToWishlist)==null?void 0:r.user_errors)??[],...g??[]];return S.length>0?O(S):$(_.addProductsToWishlist.wishlist,((u=t[0])==null?void 0:u.enteredOptions)??[])}if(!o.authenticated&&e){const a=A(!0,e),g={id:(a==null?void 0:a.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(a==null?void 0:a.items)??[]};for(const _ of t){if((h=g.items)==null?void 0:h.some(P=>w(P,{sku:_.sku,optionUIDs:_.optionsUIDs})))continue;const T=_.optionsUIDs?(p=_.optionsUIDs)==null?void 0:p.map(P=>({uid:P})):[];g.items=[...g.items,{id:crypto.randomUUID(),quantity:_.quantity,selectedOptions:T,enteredOptions:_.enteredOptions??[],product:{sku:_.sku}}]}return g.items_count=(f=g.items)==null?void 0:f.length,q(g,e),g}const s=A(),n={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const a of t){if((c=n.items)==null?void 0:c.some(S=>w(S,{sku:a.sku,optionUIDs:a.optionsUIDs})))continue;const _=a.optionsUIDs?(l=a.optionsUIDs)==null?void 0:l.map(S=>({uid:S})):[];n.items=[...n.items,{id:crypto.randomUUID(),quantity:a.quantity,selectedOptions:_,enteredOptions:a.enteredOptions??[],product:{sku:a.sku}}]}const i=n.items.slice(((s==null?void 0:s.items)??[]).length);if(n.items_count=(d=n.items)==null?void 0:d.length,F(i),m.emit("wishlist/data",n),o.authenticated){if(!o.wishlistId)throw L(i),m.emit("wishlist/data",s),Error("Wishlist ID is not set");const a={wishlistId:o.wishlistId,wishlistItems:t.map(({sku:D,quantity:U,optionsUIDs:v,enteredOptions:M})=>({sku:D,quantity:U,selected_options:v,entered_options:M})),pageSize:o.pageSize,currentPage:o.currentPage??1},{errors:g,data:_}=await E(X,{variables:a}),S=[...((I=_==null?void 0:_.addProductsToWishlist)==null?void 0:I.user_errors)??[],...g??[]];if(S.length>0)return L(i),m.emit("wishlist/data",s),O(S);const T=$(_.addProductsToWishlist.wishlist,((W=t[0])==null?void 0:W.enteredOptions)??[]),P=(T==null?void 0:T.items)??[],y=i.filter(D=>P.some(U=>{var v;return w(U,{sku:D.product.sku,optionUIDs:(v=D.selectedOptions)==null?void 0:v.map(M=>M.uid)})}));y.length>0&&(L(y),F(P.filter(D=>y.some(U=>{var v;return w(D,{sku:U.product.sku,optionUIDs:(v=U.selectedOptions)==null?void 0:v.map(M=>M.uid)})})))),m.emit("wishlist/data",T),y.length<i.length&&T&&ut(o.wishlistId,T,o.pageSize??N).catch(console.error)}return null},tt=`
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
`,Qt=async(t,e)=>{var i,r,u,h,p,f;if(o.authenticated&&e){const c=t.map(W=>W.id),{errors:l,data:d}=await E(tt,{variables:{wishlistId:e,wishlistItemsIds:c}}),I=[...((i=d==null?void 0:d.removeProductsFromWishlist)==null?void 0:i.user_errors)??[],...l??[]];return I.length>0?O(I):null}if(!o.authenticated&&e){const c=A(!0,e),l={...c,items:(r=c.items)==null?void 0:r.filter(d=>!t.some(I=>{var W;return w(d,{sku:I.product.sku,optionUIDs:(W=I.selectedOptions)==null?void 0:W.map(a=>a.uid)})}))};return l.items_count=(u=l.items)==null?void 0:u.length,q(l,e),null}const s=A(),n={...s,items:(h=s.items)==null?void 0:h.filter(c=>!t.some(l=>{var d;return w(c,{sku:l.product.sku,optionUIDs:(d=l.selectedOptions)==null?void 0:d.map(I=>I.uid)})}))};if(o.authenticated){if(!o.wishlistId)throw Error("Wishlist ID is not set");L(t);const c=t.map(W=>W.id),{errors:l,data:d}=await E(tt,{variables:{wishlistId:o.wishlistId,wishlistItemsIds:c}}),I=[...((p=d==null?void 0:d.removeProductsFromWishlist)==null?void 0:p.user_errors)??[],...l??[]];return I.length>0?(F(t),m.emit("wishlist/data",s),O(I)):(await Ot(o.wishlistId,o.pageSize,o.currentPage),null)}return L(t),n.items_count=(f=n.items)==null?void 0:f.length,m.emit("wishlist/data",n),null},vt=`
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
  
   ${H} 
`,Yt=async t=>{const e=o.wishlistId;if(!e)throw Error("Wishlist ID is not set");return E(vt,{variables:{wishlistId:e,pageSize:o.pageSize,currentPage:o.currentPage,wishlistItems:t.map(({wishlistItemId:s,quantity:n,description:i,selectedOptions:r,enteredOptions:u})=>({wishlistItemId:s,quantity:n,description:i,selected_options:r,entered_options:u}))}}).then(({errors:s,data:n})=>{var r;const i=[...((r=n==null?void 0:n.updateProductsInWishlist)==null?void 0:r.user_errors)??[],...s??[]];return i.length>0?O(i):$(n.updateProductsInWishlist.wishlist)})},$t=()=>(o.wishlistId=null,o.authenticated=!1,Promise.resolve(null)),et=async(t={})=>{if(o.initializing)return null;o.initializing=!0,o.config||(o.config=await ft());const e=o.authenticated?await yt(t):await Ut();return m.emit("wishlist/initialized",e),m.emit("wishlist/data",e),o.initializing=!1,e};async function yt(t={}){const{pageSize:e=N,currentPage:s=k}=t,n=await Dt(e,s),i=n?n[0]:null;return i?(o.wishlistId=i.id,Y(i.items??[]),ut(i.id,i,e).catch(console.error),i):null}async function Ut(){try{const t=A();return t!=null&&t.items&&Y(t.items),t}catch(t){throw console.error(t),t}}const Mt=async(t,e)=>{var r;if(!t)return null;const s=A(!0,e),n=[];if((r=s==null?void 0:s.items)==null||r.forEach(u=>{var f;const h=((f=u.selectedOptions)==null?void 0:f.map(c=>c.uid))||[];if(!t.items.some(c=>w(c,{sku:u.product.sku,optionUIDs:h}))){const c={sku:u.product.sku,quantity:1,optionsUIDs:h,enteredOptions:u.enteredOptions||void 0};n.push(c)}}),n.length===0)return e&&Z(e),null;const i=e?await K(n,t.id):await K(n);return Z(e),i};export{k as DEFAULT_CURRENT_PAGE,N as DEFAULT_PAGE_SIZE,K as addProductsToWishlist,F as addToPersistedAllWishlistItems,_t as clearPersistedAllWishlistItems,Z as clearPersistedLocalStorage,zt as config,Bt as createWishlist,E as fetchGraphQl,kt as findInPersistedAllWishlistItems,j as getAllItemsCacheVersion,qt as getConfig,yt as getDefaultWishlist,Ut as getGuestWishlist,Ct as getPersistedAllWishlistItems,A as getPersistedWishlistData,ft as getStoreConfig,Ot as getWishlistById,bt as getWishlistItemFromStorage,Dt as getWishlists,x as initialize,et as initializeWishlist,Mt as mergeWishlists,Ft as removeFetchGraphQlHeader,L as removeFromPersistedAllWishlistItems,Qt as removeProductsFromWishlist,$t as resetWishlist,o as s,Gt as setEndpoint,Ht as setFetchGraphQlHeader,xt as setFetchGraphQlHeaders,Y as setPersistedAllWishlistItems,q as setPersistedWishlistData,Yt as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
