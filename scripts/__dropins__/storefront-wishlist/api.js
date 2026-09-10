/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as a}from"@dropins/tools/event-bus.js";import{FetchGraphQL as K}from"@dropins/tools/fetch-graphql.js";import{Initializer as Z}from"@dropins/tools/lib.js";const M=9,R=1;function V(t){const e=document.cookie.split(";");for(const s of e)if(s.trim().startsWith(`${t}=`))return s.trim().substring(t.length+1);return null}const L={wishlistId:null,authenticated:!1,isLoading:!0},H=()=>L.storeCode&&L.storeCode!=="default"?`DROPIN__WISHLIST__WISHLIST-ID__${L.storeCode}`:"DROPIN__WISHLIST__WISHLIST-ID",r=new Proxy(L,{set(t,e,s){if(t[e]=s,e==="wishlistId"){const i=H();if(s===r.wishlistId)return!0;if(s===null)return document.cookie=`${i}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`,!0;const n=new Date;n.setDate(n.getDate()+30),document.cookie=`${i}=${s}; expires=${n.toUTCString()}; path=/`}return Reflect.set(t,e,s)},get(t,e){return e==="wishlistId"?V(H()):t[e]}});function m(t,e){var n;if(t.product.sku!==e.sku)return!1;const s=((n=t.selectedOptions)==null?void 0:n.map(o=>o.uid).filter(o=>!!o).sort())||[],i=(e.optionUIDs||[]).filter(o=>!!o).sort();return JSON.stringify(s)===JSON.stringify(i)}const j="DROPIN__WISHLIST__WISHLIST__DATA",X="DROPIN__WISHLIST__ALL_ITEMS__DATA",q=t=>r.storeCode&&r.storeCode!=="default"?`${t}__${r.storeCode}`:t,P=(t=!1)=>r.authenticated&&!t?sessionStorage:localStorage,N=()=>q(j);function tt(t){const e=P(),s=N();if(t)try{e.setItem(s,JSON.stringify(t))}catch(i){B(i)?console.error("Storage quota exceeded:",i):console.error("Error saving wishlist:",i)}else e.removeItem(s)}const B=t=>t instanceof DOMException&&t.name==="QuotaExceededError";function w(t=!1){const e=P(t),s=N();try{const i=e.getItem(s);return i?JSON.parse(i):{id:"",items:[]}}catch(i){return console.error("Error retrieving wishlist:",i),{id:"",items:[]}}}function et(){localStorage.removeItem(N())}function yt(t,e=[]){var c;const s=P(),i=N(),n=s.getItem(i),o=n?JSON.parse(n):{items:[]};return(c=o==null?void 0:o.items)==null?void 0:c.find(_=>m(_,{sku:t,optionUIDs:e}))}const C=()=>q(X);let D=0;function k(){return D}function $(){try{const t=P().getItem(C());return t?JSON.parse(t):[]}catch{return[]}}function G(t){try{P().setItem(C(),JSON.stringify(t))}catch(e){B(e)&&console.error("Storage quota exceeded (all-items):",e)}}function b(t){D++,G(t)}function Lt(){return $()}function st(){D++;const t=C();sessionStorage.removeItem(t),localStorage.removeItem(t)}function U(t){D++,G([...$(),...t])}function O(t){D++;const e=$();G(e.filter(s=>!t.some(i=>{var n;return m(s,{sku:i.product.sku,optionUIDs:(n=i.selectedOptions)==null?void 0:n.map(o=>o.uid)})})))}function Mt(t,e){return $().find(s=>m(s,{sku:t,optionUIDs:e}))}const v=new Z({init:async t=>{const e={isGuestWishlistEnabled:!1,...t};v.config.setConfig(e),r.storeCode=t.storeCode||void 0,r.pageSize=t.pageSize,x({pageSize:t.pageSize}).catch(console.error)},listeners:()=>[a.on("wishlist/data",t=>{tt(t)},{eager:!0}),a.on("authenticated",async t=>{var e;if(r.authenticated&&!t&&a.emit("wishlist/reset",void 0),t&&!r.authenticated){r.authenticated=t;const s=await x({pageSize:(e=v.config.getConfig())==null?void 0:e.pageSize}).catch(console.error);s&&Ot(s)}},{eager:!0}),a.on("wishlist/reset",()=>{st(),wt().catch(console.error),a.emit("wishlist/data",null)})]}),Nt=v.config,{setEndpoint:$t,setFetchGraphQlHeader:Ut,removeFetchGraphQlHeader:vt,setFetchGraphQlHeaders:Rt,fetchGraphQl:f,getConfig:Ct}=new K().getMethods();function it(t){return t?{wishlistIsEnabled:t.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:t.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:t.storeConfig.maximum_number_of_wishlists}:null}function A(t,e){return t?{id:t.id,updated_at:t.updated_at,sharing_code:t.sharing_code,items_count:t.items_count,items:rt(t,e??[]),page_info:nt(t)}:null}function nt(t){var s;const e=(s=t==null?void 0:t.items_v2)==null?void 0:s.page_info;if(e)return{currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}}function rt(t,e){var s,i;return(i=(s=t==null?void 0:t.items_v2)==null?void 0:s.items)!=null&&i.length?t.items_v2.items.map(n=>{const o=ot(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:e,selectedOptions:o,product:{sku:n.product.sku}}}):[]}function ot(t){return t.__typename==="ConfigurableWishlistItem"?t.configurable_options?t.configurable_options.map(e=>({uid:e.configurable_product_option_value_uid})):[]:t.__typename==="BundleWishlistItem"?(t.bundle_options??[]).flatMap(s=>s.values??[]).map(s=>({uid:s.uid})):[]}const E=t=>{const e=t.map(s=>s.message).join(" ");throw Error(e)},lt=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,ct=async()=>f(lt,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>t?E(t):it(e)),ut=`
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
`,z=`
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
`,ht=async(t,e=M,s=R)=>{if(!r.authenticated)return w();if(!t)throw Error("Wishlist ID is not set");return f(Y,{variables:{wishlistId:t,pageSize:e,currentPage:s}}).then(({errors:i,data:n})=>{var c;if(i)return E(i);if(!((c=n==null?void 0:n.customer)!=null&&c.wishlist_v2))return null;const o=A(n.customer.wishlist_v2);return a.emit("wishlist/data",o),o})},mt=`
  query GET_WISHLISTS_QUERY($pageSize: Int = 9, $currentPage: Int = 1) {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${z}
`,gt=async(t=M,e=R)=>r.authenticated?f(mt,{variables:{pageSize:t,currentPage:e}}).then(({errors:s,data:i})=>{var n;return s?E(s):(n=i==null?void 0:i.customer)!=null&&n.wishlists?i.customer.wishlists.map(o=>A(o)):null}):w(),pt=`
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
`;async function J(t,e,s){var l;const i=((l=e.page_info)==null?void 0:l.totalPages)??1,n=e.items??[];if(i<=1)return;const o=k(),c=Array.from({length:i-1},(g,I)=>I+2),_=await Promise.all(c.map(g=>f(Y,{variables:{wishlistId:t,pageSize:s,currentPage:g}}).then(({data:I})=>{var h;if(!((h=I==null?void 0:I.customer)!=null&&h.wishlist_v2))return[];const d=A(I.customer.wishlist_v2);return(d==null?void 0:d.items)??[]}).catch(()=>[])));if(k()!==o)return;const u=[...n,..._.flat()];b(u),a.emit("wishlist/allItems",u)}const ft=async t=>{var n,o,c,_,u;if(!t)return null;const e=w(),s={id:(e==null?void 0:e.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(e==null?void 0:e.items)??[]};for(const l of t){if((n=s.items)==null?void 0:n.some(d=>m(d,{sku:l.sku,optionUIDs:l.optionsUIDs})))continue;const I=l.optionsUIDs?(o=l.optionsUIDs)==null?void 0:o.map(d=>({uid:d})):[];s.items=[...s.items,{id:crypto.randomUUID(),quantity:l.quantity,selectedOptions:I,enteredOptions:l.enteredOptions??[],product:{sku:l.sku}}]}const i=s.items.slice(((e==null?void 0:e.items)??[]).length);if(s.items_count=(c=s.items)==null?void 0:c.length,U(i),a.emit("wishlist/data",s),r.authenticated){if(!r.wishlistId)throw O(i),a.emit("wishlist/data",e),Error("Wishlist ID is not set");const l={wishlistId:r.wishlistId,wishlistItems:t.map(({sku:S,quantity:T,optionsUIDs:p,enteredOptions:W})=>({sku:S,quantity:T,selected_options:p,entered_options:W})),pageSize:r.pageSize,currentPage:r.currentPage??1},{errors:g,data:I}=await f(pt,{variables:l}),d=[...((_=I==null?void 0:I.addProductsToWishlist)==null?void 0:_.user_errors)??[],...g??[]];if(d.length>0)return O(i),a.emit("wishlist/data",e),E(d);const h=A(I.addProductsToWishlist.wishlist,((u=t[0])==null?void 0:u.enteredOptions)??[]),F=(h==null?void 0:h.items)??[],y=i.filter(S=>F.some(T=>{var p;return m(T,{sku:S.product.sku,optionUIDs:(p=S.selectedOptions)==null?void 0:p.map(W=>W.uid)})}));y.length>0&&(O(y),U(F.filter(S=>y.some(T=>{var p;return m(S,{sku:T.product.sku,optionUIDs:(p=T.selectedOptions)==null?void 0:p.map(W=>W.uid)})})))),a.emit("wishlist/data",h),y.length<i.length&&h&&J(r.wishlistId,h,r.pageSize??M).catch(console.error)}return null},St=`
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
`,Gt=async t=>{var i,n,o;const e=w(),s={...e,items:(i=e.items)==null?void 0:i.filter(c=>!t.some(_=>{var u;return m(c,{sku:_.product.sku,optionUIDs:(u=_.selectedOptions)==null?void 0:u.map(l=>l.uid)})}))};if(r.authenticated){if(!r.wishlistId)throw Error("Wishlist ID is not set");O(t);const c=t.map(g=>g.id),{errors:_,data:u}=await f(St,{variables:{wishlistId:r.wishlistId,wishlistItemsIds:c}}),l=[...((n=u==null?void 0:u.removeProductsFromWishlist)==null?void 0:n.user_errors)??[],..._??[]];return l.length>0?(U(t),a.emit("wishlist/data",e),E(l)):(await ht(r.wishlistId,r.pageSize,r.currentPage),null)}return O(t),s.items_count=(o=s.items)==null?void 0:o.length,a.emit("wishlist/data",s),null},Tt=`
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
`,bt=async t=>{const e=r.wishlistId;if(!e)throw Error("Wishlist ID is not set");return f(Tt,{variables:{wishlistId:e,pageSize:r.pageSize,currentPage:r.currentPage,wishlistItems:t.map(({wishlistItemId:s,quantity:i,description:n,selectedOptions:o,enteredOptions:c})=>({wishlistItemId:s,quantity:i,description:n,selected_options:o,entered_options:c}))}}).then(({errors:s,data:i})=>{var o;const n=[...((o=i==null?void 0:i.updateProductsInWishlist)==null?void 0:o.user_errors)??[],...s??[]];return n.length>0?E(n):A(i.updateProductsInWishlist.wishlist)})},wt=()=>(r.wishlistId=null,r.authenticated=!1,Promise.resolve(null)),x=async(t={})=>{if(r.initializing)return null;r.initializing=!0,r.config||(r.config=await ct());const e=r.authenticated?await Et(t):await Wt();return a.emit("wishlist/initialized",e),a.emit("wishlist/data",e),r.initializing=!1,e};async function Et(t={}){const{pageSize:e=M,currentPage:s=R}=t,i=await gt(e,s),n=i?i[0]:null;return n?(r.wishlistId=n.id,b(n.items??[]),J(n.id,n,e).catch(console.error),n):null}async function Wt(){try{const t=w();return t!=null&&t.items&&b(t.items),t}catch(t){throw console.error(t),t}}const Ot=async t=>{var n;if(!t)return null;const e=w(!0),s=[];if((n=e==null?void 0:e.items)==null||n.forEach(o=>{var u;const c=((u=o.selectedOptions)==null?void 0:u.map(l=>l.uid))||[];if(!t.items.some(l=>m(l,{sku:o.product.sku,optionUIDs:c}))){const l={sku:o.product.sku,quantity:1,optionsUIDs:c,enteredOptions:o.enteredOptions||void 0};s.push(l)}}),s.length===0)return null;const i=await ft(s);return et(),i};export{R as DEFAULT_CURRENT_PAGE,M as DEFAULT_PAGE_SIZE,ft as addProductsToWishlist,U as addToPersistedAllWishlistItems,st as clearPersistedAllWishlistItems,et as clearPersistedLocalStorage,Nt as config,f as fetchGraphQl,Mt as findInPersistedAllWishlistItems,k as getAllItemsCacheVersion,Ct as getConfig,Et as getDefaultWishlist,Wt as getGuestWishlist,Lt as getPersistedAllWishlistItems,w as getPersistedWishlistData,ct as getStoreConfig,ht as getWishlistById,yt as getWishlistItemFromStorage,gt as getWishlists,v as initialize,x as initializeWishlist,Ot as mergeWishlists,vt as removeFetchGraphQlHeader,O as removeFromPersistedAllWishlistItems,Gt as removeProductsFromWishlist,wt as resetWishlist,r as s,$t as setEndpoint,Ut as setFetchGraphQlHeader,Rt as setFetchGraphQlHeaders,b as setPersistedAllWishlistItems,tt as setPersistedWishlistData,bt as updateProductsInWishlist};
//# sourceMappingURL=api.js.map
