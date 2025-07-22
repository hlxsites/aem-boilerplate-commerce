/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as D}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import{j as v,s as l,f as h,h as b,g as E,i as C,k as G}from"./removeProductsFromWishlist.js";const R=new D({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};R.config.setConfig(t),S().catch(console.error)},listeners:()=>[c.on("wishlist/data",e=>{v(e)},{eager:!0}),c.on("authenticated",async e=>{if(l.authenticated&&!e&&c.emit("wishlist/reset",void 0),e&&!l.authenticated){l.authenticated=e;const t=await S().catch(console.error);t&&ce(t)}},{eager:!0}),c.on("wishlist/reset",()=>{ae().catch(console.error),c.emit("wishlist/data",null)})]}),pe=R.config;function O(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function N(e,t=[]){var i;return e?{type:e.__typename,name:e.name,sku:e.sku,uid:e.uid,image:M(e,t),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(i=e.categories)==null?void 0:i.map(s=>s.name),prices:W(e),productAttributes:F(e),options:U(e)}:null}function U(e){var t,i;return e.__typename==="ConfigurableProduct"?e.configurable_options?(t=e.configurable_options)==null?void 0:t.map(s=>{var n;return{uid:s.uid,attributeUid:s.attribute_uid,attributeCode:s.attribute_code,values:(n=s.values)==null?void 0:n.map(r=>({uid:r.uid,label:r.label})),required:!0}}):[]:e.__typename==="GiftCardProduct"?e.gift_card_options?(i=e.gift_card_options)==null?void 0:i.map(s=>({uid:s.uid,required:s.required,title:s.title})):[]:[]}function M(e,t=[]){var s;let i=e.thumbnail;if(e.__typename==="ConfigurableProduct"&&e.variants&&(t==null?void 0:t.length)>0){const n=t.map(o=>o.uid);let r=e.variants.find(o=>{var u;const _=((u=o.attributes)==null?void 0:u.map(a=>a.uid))||[];return n.every(a=>_.includes(a))});r||(r=e.variants.find(o=>{var _;return(_=o.attributes)==null?void 0:_.some(u=>t.some(a=>a.uid===u.uid))})),(s=r==null?void 0:r.product)!=null&&s.image&&(i=r.product.image)}return{src:i==null?void 0:i.url,alt:i==null?void 0:i.label}}function W(e){var t,i,s,n,r,o,_,u,a,d,m,f,p,I,g,T,y,P;return{regularPrice:{currency:((s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency)??"USD",value:((o=(r=(n=e.price_range)==null?void 0:n.minimum_price)==null?void 0:r.regular_price)==null?void 0:o.value)??0},finalPrice:{currency:((a=(u=(_=e.price_range)==null?void 0:_.minimum_price)==null?void 0:u.final_price)==null?void 0:a.currency)??"USD",value:((f=(m=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:m.final_price)==null?void 0:f.value)??0},discount:{amountOff:((g=(I=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:I.discount)==null?void 0:g.amount_off)??0,percentOff:((P=(y=(T=e.price_range)==null?void 0:T.minimum_price)==null?void 0:y.discount)==null?void 0:P.percent_off)??0},fixedProductTaxes:L(e)}}function F(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const n=s.code.split("_").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");return{...s,code:n}})}function L(e){var t,i,s,n,r;return(i=(t=e.price_range)==null?void 0:t.minimum_price)!=null&&i.fixed_product_taxes?(r=(n=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:n.fixed_product_taxes)==null?void 0:r.map(o=>({money:{value:o.amount.value,currency:o.amount.currency},label:o.label})):[]}function w(e,t){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:k(e,t??[])}:null}function k(e,t){var i,s;return(s=(i=e==null?void 0:e.items_v2)==null?void 0:i.items)!=null&&s.length?e.items_v2.items.map(n=>{const r=$(n);return{id:n.id,quantity:n.quantity,description:n.description,added_at:n.added_at,enteredOptions:t,selectedOptions:r,product:N(n.product,r)}}):[]}function $(e){return e.product.__typename==="ConfigurableProduct"?e.configurable_options?e.configurable_options.map(t=>({value:t.value_label,label:t.option_label,uid:t.configurable_product_option_value_uid})):[]:[]}const q=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
  }
}
`,C=async()=>I(D,{method:"GET",cache:"force-cache"}).then(({errors:t,data:s})=>t?f(t):N(s)),U=`
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
`,v=`
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
`,F=`
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
`,k=`
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
`,H=`
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
`,P=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      sku
    }
    ${v}
    ${F}
    ${k}
    ${H}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${U}
`,S=`
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2 {
      items {
        ...WISHLIST_ITEM_FRAGMENT
      }
    }
  }

${P}
`,$=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${S}
`,q=async()=>e.authenticated?I($).then(({errors:t,data:s})=>{var i;return t?f(t):(i=s==null?void 0:s.customer)!=null&&i.wishlists?s.customer.wishlists.map(a=>w(a)):null}):h(),z=`
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
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
${S}
`,x=async t=>{var a,n,l,d,m;if(!t)return null;const s=h();let i={id:(s==null?void 0:s.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(s==null?void 0:s.items)??[]};for(const o of t){if((a=i.items)==null?void 0:a.some(_=>T(_,{sku:o.sku,optionUIDs:o.optionsUIDs})))continue;const c=o.optionsUIDs?(n=o.optionsUIDs)==null?void 0:n.map(_=>({uid:_})):[];i.items=[...i.items,{id:crypto.randomUUID(),quantity:o.quantity,selectedOptions:c,enteredOptions:o.enteredOptions??[],product:{sku:o.sku}}]}if(i.items_count=(l=i.items)==null?void 0:l.length,r.emit("wishlist/data",i),e.authenticated){if(!e.wishlistId)throw r.emit("wishlist/data",s),Error("Wishlist ID is not set");const o={wishlistId:e.wishlistId,wishlistItems:t.map(({sku:W,quantity:O,optionsUIDs:b,enteredOptions:M})=>({sku:W,quantity:O,selected_options:b,entered_options:M}))},{errors:u,data:c}=await I(z,{variables:o}),_=[...((d=c==null?void 0:c.addProductsToWishlist)==null?void 0:d.user_errors)??[],...u??[]];if(_.length>0)return r.emit("wishlist/data",s),f(_);const E=w(c.addProductsToWishlist.wishlist,((m=t[0])==null?void 0:m.enteredOptions)??[]);r.emit("wishlist/data",E)}return null},B=()=>(e.wishlistId=null,e.authenticated=!1,Promise.resolve(null)),p=async()=>{if(e.initializing)return null;e.initializing=!0,e.config||(e.config=await C());const t=e.authenticated?await Q():await Y();return r.emit("wishlist/initialized",t),r.emit("wishlist/data",t),e.initializing=!1,t};async function Q(){const t=await q(),s=t?t[0]:null;return s?(e.wishlistId=s.id,s):null}async function Y(){try{return await h()}catch(t){throw console.error(t),t}}const Z=async t=>{var n;if(!t)return null;const s=h(!0),i=[];if((n=s==null?void 0:s.items)==null||n.forEach(l=>{var o;const d=((o=l.selectedOptions)==null?void 0:o.map(u=>u.uid))||[];if(!t.items.some(u=>T(u,{sku:l.product.sku,optionUIDs:d}))){const u={sku:l.product.sku,quantity:1,optionsUIDs:d,enteredOptions:l.enteredOptions||void 0};i.push(u)}}),i.length===0)return null;const a=await x(i);return G(),a};export{P as W,x as a,S as b,V as c,q as d,p as e,Q as f,C as g,Y as h,g as i,Z as m,B as r,w as t};
//# sourceMappingURL=mergeWishlists.js.map
