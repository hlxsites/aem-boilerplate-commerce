/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as a}from"@dropins/tools/event-bus.js";import{FetchGraphQL as K}from"@dropins/tools/fetch-graphql.js";import{Initializer as V}from"@dropins/tools/lib.js";const A=9,M=1;function Z(t){const e=document.cookie.split(";");for(const s of e)if(s.trim().startsWith(`${t}=`))return s.trim().substring(t.length+1);return null}const L={wishlistId:null,authenticated:!1,isLoading:!0},F=()=>L.storeCode&&L.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${L.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",r=new Proxy(L,{set(t,e,s){if(t[e]=s,e==="wishlistId"){const i=F();if(s===r.wishlistId)return!0;if(s===null)return document.cookie=`${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const n=new Date;n.setDate(n.getDate()+30),document.cookie=`${i}=${s}; expires=${n.toUTCString()}; path=/`}return Reflect.set(t,e,s)},get(t,e){return e==="wishlistId"?Z(F()):t[e]}});function m(t,e){var n;if(t.product.sku!==e.sku)return!1;const s=((n=t.selectedOptions)==null?void 0:n.map(o=>o.uid).filter(o=>!!o).sort())||[],i=(e.optionUIDs||[]).filter(o=>!!o).sort();return JSON.stringify(s)===JSON.stringify(i)}const j="DROPIN__WISHLIST__WISHLIST__DATA",X="DROPIN__WISHLIST__ALL_ITEMS__DATA",q=t=>r.storeCode&&r.storeCode!=="default"?`${t}__${r.storeCode}`:t,D=(t=!1)=>r.authenticated&&!t?sessionStorage:localStorage,N=()=>q(j);function tt(t){const e=D(),s=N();if(t)try{e.setItem(s,JSON.stringify(t))}catch(i){B(i)?console.error("Storage quota exceeded:",i):console.error("Error saving wishlist:",i)}else e.removeItem(s)}const B=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function E(t=!1){const e=D(t),s=N();try{const i=e.getItem(s);return i?JSON.parse(i):{id:"",items:[]}}catch(i){return console.error("Error retrieving wishlist:",i),{id:"",items:[]}}}function et(){localStorage.removeItem(N())}function $t(t,e=[]){var c;const s=D(),i=N(),n=s.getItem(i),o=n?JSON.parse(n):{items:[]};return(c=o==null?void 0:o.items)==null?void 0:c.find(_=>m(_,{sku:t,optionUIDs:e}))}const b=()=>q(X);let y=0;function k(){return y}function v(){try{const t=D().getItem(b());return t?JSON.parse(t):[]}catch{return[]}}function z(t){try{D().setItem(b(),JSON.stringify(t))}catch(e){B(e)&&console.error("Storage quota exceeded (all-items):",e)}}function G(t){y++,z(t)}function Lt(){return v()}function st(){y++;const t=b();sessionStorage.removeItem(t),localStorage.removeItem(t)}function U(t){y++,z([...v(),...t])}function P(t){y++;const e=v();z(e.filter(s=>!t.some(i=>{var n;return m(s,{sku:i.product.sku,optionUIDs:(n=i.selectedOptions)==null?void 0:n.map(o=>o.uid)})})))}function Mt(t,e){return v().find(s=>m(s,{sku:t,optionUIDs:e}))}const C=new V({init:async t=>{const e={isGuestWishlistEnabled:!1,...t};C.config.setConfig(e),r.storeCode=t.storeCode||void 0,r.pageSize=t.pageSize,x({pageSize:t.pageSize}).catch(console.error)},listeners:()=>[a.on("wishlist/data",t=>{tt(t)},{eager:!0}),a.on("authenticated",async t=>{var e;if(r.authenticated&&!t&&a.emit("wishlist/reset",void 0),t&&!r.authenticated){r.authenticated=t;const s=await x({pageSize:(e=C.config.getConfig())==null?void 0:e.pageSize}).catch(console.error);s&&Pt(s)}},{eager:!0}),a.on("wishlist/reset",()=>{st(),Et().catch(console.error),a.emit("wishlist/data",null)})]}),Nt=C.config,{setEndpoint:vt,setFetchGraphQlHeader:Rt,removeFetchGraphQlHeader:Ut,setFetchGraphQlHeaders:Ct,fetchGraphQl:g,getConfig:bt}=new K().getMethods();function it(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function W(t,e){return t?{id:t.id,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:rt(t,e??[]),page_info:nt(t)}:null}function nt(t){var s;const e=(s=t==null?void 0:t.items_v2)==null?void 0:s.page_info;if(e)return{currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}}function rt(t,e){var s,i;return(i=(s=t==null?void 0:t.items_v2)==null?void 0:s.items)!=null&&i.length?t.items_v2.items.map(n=>{const o=ot(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:e,selectedOptions:o,product:{sku:n.product.sku}}}):[]}function ot(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(e=>({uid:e.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(s=>s.values??[]).map(s=>({uid:s.uid})):[]}const S=t=>{const e=t.map(s=>s.message).join(" ");throw Error(e)},lt=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,ct=async()=>g(lt,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>t?S(t):it(e)),ut=`
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
`,at=`
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
`,It=`
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
`,_t=`
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
`,dt=`
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
`,Q=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${at}
    ${It}
    ${_t}
    ${dt}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${ut}
`,R=`
fragment WISHLIST_FRAGMENT on Wishlist {
    id
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

${Q}
`,Y=`
  query GET_WISHLIST_BY_ID_QUERY(
    $wishlistId: ID!,
    $pageSize: Int = 9,
    $currentPage: Int = 1,
  ) {
    customer {
      wishlist_v2(id: $wishlistId) {
        id
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

${Q}
`,ht=async(t,e=A,s=M)=>{if(!r.authenticated)return E();if(!t)throw Error("Wishlist ID is not set");return g(Y,{variables:{wishlistId:t,pageSize:e,currentPage:s}}).then(({errors:i,data:n})=>{var c;if(i)return S(i);if(!((c=n==null?void 0:n.customer)!=null&&c.wishlist_v2))return null;const o=W(n.customer.wishlist_v2);return a.emit("wishlist/data",o),o})},mt=`
  query GET_WISHLISTS_QUERY($pageSize: Int = 9, $currentPage: Int = 1) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${R}
`,gt=async(t=A,e=M)=>r.authenticated?g(mt,{variables:{pageSize:t,currentPage:e}}).then(({errors:s,data:i})=>{var n;return s?S(s):(n=i==null?void 0:i.customer)!=null&&n.wishlists?i.customer.wishlists.map(o=>W(o)):null}):E(),pt=`
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
${R}
`,zt=async(t,e="PRIVATE")=>{var c;if(!r.authenticated)return null;if(!(t!=null&&t.trim()))throw Error("Wishlist name is required");const s={name:t,visibility:e,pageSize:r.pageSize??A,currentPage:r.currentPage??M},{errors:i,data:n}=await g(pt,{variables:s});if(i)return S(i);const o=(c=n==null?void 0:n.createWishlist)==null?void 0:c.wishlist;return o?W(o):null},ft=`
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
${R}
`;async function J(t,e,s){var l;const i=((l=e.page_info)==null?void 0:l.totalPages)??1,n=e.items??[];if(i<=1)return;const o=k(),c=Array.from({length:i-1},(p,I)=>I+2),_=await Promise.all(c.map(p=>g(Y,{variables:{wishlistId:t,pageSize:s,currentPage:p}}).then(({data:I})=>{var h;if(!((h=I==null?void 0:I.customer)!=null&&h.wishlist_v2))return[];const d=W(I.customer.wishlist_v2);return(d==null?void 0:d.items)??[]}).catch(()=>[])));if(k()!==o)return;const u=[...n,..._.flat()];G(u),a.emit("wishlist/allItems",u)}const St=async t=>{var n,o,c,_,u;if(!t)return null;const e=E(),s={id:(e==null?void 0:e.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(e==null?void 0:e.items)??[]};for(const l of t){if((n=s.items)==null?void 0:n.some(d=>m(d,{sku:l.sku,optionUIDs:l.optionsUIDs})))continue;const I=l.optionsUIDs?(o=l.optionsUIDs)==null?void 0:o.map(d=>({uid:d})):[];s.items=[...s.items,{id:crypto.randomUUID(),quantity:l.quantity,selectedOptions:I,enteredOptions:l.enteredOptions??[],product:{sku:l.sku}}]}const i=s.items.slice(((e==null?void 0:e.items)??[]).length);if(s.items_count=(c=s.items)==null?void 0:c.length,U(i),a.emit("wishlist/data",s),r.authenticated){if(!r.wishlistId)throw P(i),a.emit("wishlist/data",e),Error("Wishlist ID is not set");const l={wishlistId:r.wishlistId,wishlistItems:t.map(({sku:T,quantity:w,optionsUIDs:f,enteredOptions:O})=>({sku:T,quantity:w,selected_options:f,entered_options:O})),pageSize:r.pageSize,currentPage:r.currentPage??1},{errors:p,data:I}=await g(ft,{variables:l}),d=[...((_=I==null?void 0:I.addProductsToWishlist)==null?void 0:_.user_errors)??[],...p??[]];if(d.length>0)return P(i),a.emit("wishlist/data",e),S(d);const h=W(I.addProductsToWishlist.wishlist,((u=t[0])==null?void 0:u.enteredOptions)??[]),H=(h==null?void 0:h.items)??[],$=i.filter(T=>H.some(w=>{var f;return m(w,{sku:T.product.sku,optionUIDs:(f=T.selectedOptions)==null?void 0:f.map(O=>O.uid)})}));$.length>0&&(P($),U(H.filter(T=>$.some(w=>{var f;return m(T,{sku:w.product.sku,optionUIDs:(f=w.selectedOptions)==null?void 0:f.map(O=>O.uid)})})))),a.emit("wishlist/data",h),$.length<i.length&&h&&J(r.wishlistId,h,r.pageSize??A).catch(console.error)}return null},Tt=`
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
`,Gt=async t=>{var i,n,o;const e=E(),s={...e,items:(i=e.items)==null?void 0:i.filter(c=>!t.some(_=>{var u;return m(c,{sku:_.product.sku,optionUIDs:(u=_.selectedOptions)==null?void 0:u.map(l=>l.uid)})}))};if(r.authenticated){if(!r.wishlistId)throw Error("Wishlist ID is not set");P(t);const c=t.map(p=>p.id),{errors:_,data:u}=await g(Tt,{variables:{wishlistId:r.wishlistId,wishlistItemsIds:c}}),l=[...((n=u==null?void 0:u.removeProductsFromWishlist)==null?void 0:n.user_errors)??[],..._??[]];return l.length>0?(U(t),a.emit("wishlist/data",e),S(l)):(await ht(r.wishlistId,r.pageSize,r.currentPage),null)}return P(t),s.items_count=(o=s.items)==null?void 0:o.length,a.emit("wishlist/data",s),null},wt=`
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
  
   ${R} 
`,Ht=async t=>{const e=r.wishlistId;if(!e)throw Error("Wishlist ID is not set");return g(wt,{variables:{wishlistId:e,pageSize:r.pageSize,currentPage:r.currentPage,wishlistItems:t.map(({wishlistItemId:s,quantity:i,description:n,selectedOptions:o,enteredOptions:c})=>({wishlistItemId:s,quantity:i,description:n,selected_options:o,entered_options:c}))}}).then(({errors:s,data:i})=>{var o;const n=[...((o=i==null?void 0:i.updateProductsInWishlist)==null?void 0:o.user_errors)??[],...s??[]];return n.length>0?S(n):W(i.updateProductsInWishlist.wishlist)})},Et=()=>(r.wishlistId=null,r.authenticated=!1,Promise.resolve(null)),x=async(t={})=>{if(r.initializing)return null;r.initializing=!0,r.config||(r.config=await ct());const e=r.authenticated?await Wt(t):await Ot();return a.emit("wishlist/initialized",e),a.emit("wishlist/data",e),r.initializing=!1,e};async function Wt(t={}){const{pageSize:e=A,currentPage:s=M}=t,i=await gt(e,s),n=i?i[0]:null;return n?(r.wishlistId=n.id,G(n.items??[]),J(n.id,n,e).catch(console.error),n):null}async function Ot(){try{const t=E();return t!=null&&t.items&&G(t.items),t}catch(t){throw console.error(t),t}}const Pt=async t=>{var n;if(!t)return null;const e=E(!0),s=[];if((n=e==null?void 0:e.items)==null||n.forEach(o=>{var u;const c=((u=o.selectedOptions)==null?void 0:u.map(l=>l.uid))||[];if(!t.items.some(l=>m(l,{sku:o.product.sku,optionUIDs:c}))){const l={sku:o.product.sku,quantity:1,optionsUIDs:c,enteredOptions:o.enteredOptions||void 0};s.push(l)}}),s.length===0)return null;const i=await St(s);return et(),i};export{M as DEFAULT_CURRENT_PAGE,A as DEFAULT_PAGE_SIZE,St as addProductsToWishlist,U as addToPersistedAllWishlistItems,st as clearPersistedAllWishlistItems,et as clearPersistedLocalStorage,Nt as config,zt as createWishlist,g as fetchGraphQl,Mt as findInPersistedAllWishlistItems,k as getAllItemsCacheVersion,bt as getConfig,Wt as getDefaultWishlist,Ot as getGuestWishlist,Lt as getPersistedAllWishlistItems,E as getPersistedWishlistData,ct as getStoreConfig,ht as getWishlistById,$t as getWishlistItemFromStorage,gt as getWishlists,C as initialize,x as initializeWishlist,Pt as mergeWishlists,Ut as removeFetchGraphQlHeader,P as removeFromPersistedAllWishlistItems,Gt as removeProductsFromWishlist,Et as resetWishlist,r as s,vt as setEndpoint,Rt as setFetchGraphQlHeader,Ct as setFetchGraphQlHeaders,G as setPersistedAllWishlistItems,tt as setPersistedWishlistData,Ht as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
