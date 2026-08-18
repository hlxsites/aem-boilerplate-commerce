/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as d}from"@dropins/tools/event-bus.js";import{FetchGraphQL as tt}from"@dropins/tools/fetch-graphql.js";import{Initializer as et}from"@dropins/tools/lib.js";const v=9,U=1;function st(t){const e=document.cookie.split(";");for(const s of e)if(s.trim().startsWith(`${t}=`))return s.trim().substring(t.length+1);return null}const R={wishlistId:null,authenticated:!1,isLoading:!0},q=()=>R.storeCode&&R.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${R.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",n=new Proxy(R,{set(t,e,s){if(t[e]=s,e==="wishlistId"){const i=q();if(s===n.wishlistId)return!0;if(s===null)return document.cookie=`${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const r=new Date;r.setDate(r.getDate()+30),document.cookie=`${i}=${s}; expires=${r.toUTCString()}; path=/`}return Reflect.set(t,e,s)},get(t,e){return e==="wishlistId"?st(q()):t[e]}});function w(t,e){var r;if(t.product.sku!==e.sku)return!1;const s=((r=t.selectedOptions)==null?void 0:r.map(o=>o.uid).filter(o=>!!o).sort())||[],i=(e.optionUIDs||[]).filter(o=>!!o).sort();return JSON.stringify(s)===JSON.stringify(i)}const it="DROPIN__WISHLIST__WISHLIST__DATA",rt="DROPIN__WISHLIST__ALL_ITEMS__DATA",K=t=>n.storeCode&&n.storeCode!=="default"?`${t}__${n.storeCode}`:t,L=(t=!1)=>n.authenticated&&!t?sessionStorage:localStorage,C=()=>K(it);function nt(t){const e=L(),s=C();if(t)try{e.setItem(s,JSON.stringify(t))}catch(i){V(i)?console.error("Storage quota exceeded:",i):console.error("Error saving wishlist:",i)}else e.removeItem(s)}const V=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function D(t=!1){const e=L(t),s=C();try{const i=e.getItem(s);return i?JSON.parse(i):{id:"",items:[]}}catch(i){return console.error("Error retrieving wishlist:",i),{id:"",items:[]}}}function ot(){localStorage.removeItem(C())}function Mt(t,e=[]){var l;const s=L(),i=C(),r=s.getItem(i),o=r?JSON.parse(r):{items:[]};return(l=o==null?void 0:o.items)==null?void 0:l.find(h=>w(h,{sku:t,optionUIDs:e}))}const F=()=>K(rt);let M=0;function B(){return M}function b(){try{const t=L().getItem(F());return t?JSON.parse(t):[]}catch{return[]}}function k(t){try{L().setItem(F(),JSON.stringify(t))}catch(e){V(e)&&console.error("Storage quota exceeded (all-items):",e)}}function x(t){M++,k(t)}function Nt(){return b()}function lt(){M++;const t=F();sessionStorage.removeItem(t),localStorage.removeItem(t)}function G(t){M++,k([...b(),...t])}function $(t){M++;const e=b();k(e.filter(s=>!t.some(i=>{var r;return w(s,{sku:i.product.sku,optionUIDs:(r=i.selectedOptions)==null?void 0:r.map(o=>o.uid)})})))}function Rt(t,e){return b().find(s=>w(s,{sku:t,optionUIDs:e}))}const H=new et({init:async t=>{const e={isGuestWishlistEnabled:!1,...t};H.config.setConfig(e),n.storeCode=t.storeCode||void 0,n.pageSize=t.pageSize,J({pageSize:t.pageSize}).catch(console.error)},listeners:()=>[d.on("wishlist/data",t=>{nt(t)},{eager:!0}),d.on("authenticated",async t=>{var e;if(n.authenticated&&!t&&d.emit("wishlist/reset",void 0),t&&!n.authenticated){n.authenticated=t;const s=await J({pageSize:(e=H.config.getConfig())==null?void 0:e.pageSize}).catch(console.error);s&&yt(s)}},{eager:!0}),d.on("wishlist/reset",()=>{lt(),Ot().catch(console.error),d.emit("wishlist/data",null)})]}),Ut=H.config,{setEndpoint:Ct,setFetchGraphQlHeader:bt,removeFetchGraphQlHeader:zt,setFetchGraphQlHeaders:Gt,fetchGraphQl:g,getConfig:Ht}=new tt().getMethods();function ct(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function P(t,e){return t?{id:t.id,name:t.name,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:at(t,e??[]),page_info:ut(t)}:null}function ut(t){var s;const e=(s=t==null?void 0:t.items_v2)==null?void 0:s.page_info;if(e)return{currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}}function at(t,e){var s,i;return(i=(s=t==null?void 0:t.items_v2)==null?void 0:s.items)!=null&&i.length?t.items_v2.items.map(r=>{const o=It(r);return{id:r.id,quantity:r.quantity,description:r.description,added_at:r.added_at,enteredOptions:e,selectedOptions:o,product:{sku:r.product.sku}}}):[]}function It(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(e=>({uid:e.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(s=>s.values??[]).map(s=>({uid:s.uid})):[]}const f=t=>{const e=t.map(s=>s.message).join(" ");throw Error(e)},_t=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,dt=async()=>g(_t,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>t?f(t):ct(e)),ht=`
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
`,mt=`
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
`,gt=`
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
`,pt=`
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
`,ft=`
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
`,Z=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${mt}
    ${gt}
    ${pt}
    ${ft}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${ht}
`,z=`
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

${Z}
`,j=`
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

${Z}
`,St=async(t,e=v,s=U,i={})=>{const{emit:r=!0}=i;if(!n.authenticated)return D();if(!t)throw Error("Wishlist ID is not set");return g(j,{variables:{wishlistId:t,pageSize:e,currentPage:s}}).then(({errors:o,data:l})=>{var a;if(o)return f(o);if(!((a=l==null?void 0:l.customer)!=null&&a.wishlist_v2))return null;const h=P(l.customer.wishlist_v2);return r&&d.emit("wishlist/data",h),h})},Tt=`
  query GET_WISHLISTS_QUERY($pageSize: Int = 9, $currentPage: Int = 1) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${z}
`,wt=async(t=v,e=U)=>n.authenticated?g(Tt,{variables:{pageSize:t,currentPage:e}}).then(({errors:s,data:i})=>{var r;return s?f(s):(r=i==null?void 0:i.customer)!=null&&r.wishlists?i.customer.wishlists.map(o=>P(o)):null}):D(),Wt=`
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
${z}
`,Ft=async(t,e="PRIVATE")=>{var l;if(!n.authenticated)return null;if(!(t!=null&&t.trim()))throw Error("Wishlist name is required");const s={name:t,visibility:e,pageSize:n.pageSize??v,currentPage:n.currentPage??U},{errors:i,data:r}=await g(Wt,{variables:s});if(i)return f(i);const o=(l=r==null?void 0:r.createWishlist)==null?void 0:l.wishlist;return o?P(o):null},Q=`
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
${z}
`;async function X(t,e,s){var u;const i=((u=e.page_info)==null?void 0:u.totalPages)??1,r=e.items??[];if(i<=1)return;const o=B(),l=Array.from({length:i-1},(_,I)=>I+2),h=await Promise.all(l.map(_=>g(j,{variables:{wishlistId:t,pageSize:s,currentPage:_}}).then(({data:I})=>{var W;if(!((W=I==null?void 0:I.customer)!=null&&W.wishlist_v2))return[];const c=P(I.customer.wishlist_v2);return(c==null?void 0:c.items)??[]}).catch(()=>[])));if(B()!==o)return;const a=[...r,...h.flat()];x(a),d.emit("wishlist/allItems",a)}const Et=async(t,e)=>{var o,l,h,a,u,_,I;if(!t)return null;if(n.authenticated&&e){const c={wishlistId:e,wishlistItems:t.map(({sku:S,quantity:N,optionsUIDs:O,enteredOptions:T})=>({sku:S,quantity:N,selected_options:O,entered_options:T})),pageSize:n.pageSize,currentPage:n.currentPage??1},{errors:W,data:m}=await g(Q,{variables:c}),p=[...((o=m==null?void 0:m.addProductsToWishlist)==null?void 0:o.user_errors)??[],...W??[]];return p.length>0?f(p):P(m.addProductsToWishlist.wishlist,((l=t[0])==null?void 0:l.enteredOptions)??[])}const s=D(),i={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const c of t){if((h=i.items)==null?void 0:h.some(p=>w(p,{sku:c.sku,optionUIDs:c.optionsUIDs})))continue;const m=c.optionsUIDs?(a=c.optionsUIDs)==null?void 0:a.map(p=>({uid:p})):[];i.items=[...i.items,{id:crypto.randomUUID(),quantity:c.quantity,selectedOptions:m,enteredOptions:c.enteredOptions??[],product:{sku:c.sku}}]}const r=i.items.slice(((s==null?void 0:s.items)??[]).length);if(i.items_count=(u=i.items)==null?void 0:u.length,G(r),d.emit("wishlist/data",i),n.authenticated){if(!n.wishlistId)throw $(r),d.emit("wishlist/data",s),Error("Wishlist ID is not set");const c={wishlistId:n.wishlistId,wishlistItems:t.map(({sku:T,quantity:A,optionsUIDs:E,enteredOptions:y})=>({sku:T,quantity:A,selected_options:E,entered_options:y})),pageSize:n.pageSize,currentPage:n.currentPage??1},{errors:W,data:m}=await g(Q,{variables:c}),p=[...((_=m==null?void 0:m.addProductsToWishlist)==null?void 0:_.user_errors)??[],...W??[]];if(p.length>0)return $(r),d.emit("wishlist/data",s),f(p);const S=P(m.addProductsToWishlist.wishlist,((I=t[0])==null?void 0:I.enteredOptions)??[]),N=(S==null?void 0:S.items)??[],O=r.filter(T=>N.some(A=>{var E;return w(A,{sku:T.product.sku,optionUIDs:(E=T.selectedOptions)==null?void 0:E.map(y=>y.uid)})}));O.length>0&&($(O),G(N.filter(T=>O.some(A=>{var E;return w(T,{sku:A.product.sku,optionUIDs:(E=A.selectedOptions)==null?void 0:E.map(y=>y.uid)})})))),d.emit("wishlist/data",S),O.length<r.length&&S&&X(n.wishlistId,S,n.pageSize??v).catch(console.error)}return null},Y=`
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
`,kt=async(t,e)=>{var r,o,l,h;if(n.authenticated&&e){const a=t.map(c=>c.id),{errors:u,data:_}=await g(Y,{variables:{wishlistId:e,wishlistItemsIds:a}}),I=[...((r=_==null?void 0:_.removeProductsFromWishlist)==null?void 0:r.user_errors)??[],...u??[]];return I.length>0?f(I):null}const s=D(),i={...s,items:(o=s.items)==null?void 0:o.filter(a=>!t.some(u=>{var _;return w(a,{sku:u.product.sku,optionUIDs:(_=u.selectedOptions)==null?void 0:_.map(I=>I.uid)})}))};if(n.authenticated){if(!n.wishlistId)throw Error("Wishlist ID is not set");$(t);const a=t.map(c=>c.id),{errors:u,data:_}=await g(Y,{variables:{wishlistId:n.wishlistId,wishlistItemsIds:a}}),I=[...((l=_==null?void 0:_.removeProductsFromWishlist)==null?void 0:l.user_errors)??[],...u??[]];return I.length>0?(G(t),d.emit("wishlist/data",s),f(I)):(await St(n.wishlistId,n.pageSize,n.currentPage),null)}return $(t),i.items_count=(h=i.items)==null?void 0:h.length,d.emit("wishlist/data",i),null},Pt=`
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
  
   ${z} 
`,xt=async t=>{const e=n.wishlistId;if(!e)throw Error("Wishlist ID is not set");return g(Pt,{variables:{wishlistId:e,pageSize:n.pageSize,currentPage:n.currentPage,wishlistItems:t.map(({wishlistItemId:s,quantity:i,description:r,selectedOptions:o,enteredOptions:l})=>({wishlistItemId:s,quantity:i,description:r,selected_options:o,entered_options:l}))}}).then(({errors:s,data:i})=>{var o;const r=[...((o=i==null?void 0:i.updateProductsInWishlist)==null?void 0:o.user_errors)??[],...s??[]];return r.length>0?f(r):P(i.updateProductsInWishlist.wishlist)})},Ot=()=>(n.wishlistId=null,n.authenticated=!1,Promise.resolve(null)),J=async(t={})=>{if(n.initializing)return null;n.initializing=!0,n.config||(n.config=await dt());const e=n.authenticated?await At(t):await Dt();return d.emit("wishlist/initialized",e),d.emit("wishlist/data",e),n.initializing=!1,e};async function At(t={}){const{pageSize:e=v,currentPage:s=U}=t,i=await wt(e,s),r=i?i[0]:null;return r?(n.wishlistId=r.id,x(r.items??[]),X(r.id,r,e).catch(console.error),r):null}async function Dt(){try{const t=D();return t!=null&&t.items&&x(t.items),t}catch(t){throw console.error(t),t}}const yt=async t=>{var r;if(!t)return null;const e=D(!0),s=[];if((r=e==null?void 0:e.items)==null||r.forEach(o=>{var a;const l=((a=o.selectedOptions)==null?void 0:a.map(u=>u.uid))||[];if(!t.items.some(u=>w(u,{sku:o.product.sku,optionUIDs:l}))){const u={sku:o.product.sku,quantity:1,optionsUIDs:l,enteredOptions:o.enteredOptions||void 0};s.push(u)}}),s.length===0)return null;const i=await Et(s);return ot(),i};export{U as DEFAULT_CURRENT_PAGE,v as DEFAULT_PAGE_SIZE,Et as addProductsToWishlist,G as addToPersistedAllWishlistItems,lt as clearPersistedAllWishlistItems,ot as clearPersistedLocalStorage,Ut as config,Ft as createWishlist,g as fetchGraphQl,Rt as findInPersistedAllWishlistItems,B as getAllItemsCacheVersion,Ht as getConfig,At as getDefaultWishlist,Dt as getGuestWishlist,Nt as getPersistedAllWishlistItems,D as getPersistedWishlistData,dt as getStoreConfig,St as getWishlistById,Mt as getWishlistItemFromStorage,wt as getWishlists,H as initialize,J as initializeWishlist,yt as mergeWishlists,zt as removeFetchGraphQlHeader,$ as removeFromPersistedAllWishlistItems,kt as removeProductsFromWishlist,Ot as resetWishlist,n as s,Ct as setEndpoint,bt as setFetchGraphQlHeader,Gt as setFetchGraphQlHeaders,x as setPersistedAllWishlistItems,nt as setPersistedWishlistData,xt as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
