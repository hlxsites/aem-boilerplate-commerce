/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as N}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import{s as u,i as R,f as b,h as E,g as x,j as O}from"./removeProductsFromWishlist.js";const S=new N({init:async e=>{const t={isGuestWishlistEnabled:!1,...e};S.config.setConfig(t),w().catch(console.error)},listeners:()=>[c.on("authenticated",async e=>{if(u.authenticated&&!e&&c.emit("wishlist/reset",void 0),e&&!u.authenticated){u.authenticated=e;const t=await w().catch(console.error);t&&J(t)}},{eager:!0}),c.on("wishlist/data",e=>{R(e)}),c.on("wishlist/reset",()=>{j().catch(console.error),c.emit("wishlist/data",null)})]}),se=S.config;function G(e){if(!e)return null;const t=i=>{switch(i){case 1:return"INCLUDING_FPT_AND_DESCRIPTION";case 2:return"EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";case 3:return"EXCLUDING_FPT";default:return"INCLUDING_FPT_ONLY"}};return{wishlistIsEnabled:e.storeConfig.magento_wishlist_general_is_enabled,wishlistMultipleListIsEnabled:e.storeConfig.enable_multiple_wishlists,wishlistMaxNumber:e.storeConfig.maximum_number_of_wishlists,fixedProductTaxesEnabled:e.storeConfig.fixed_product_taxes_enable,fixedProductTaxesApply:e.storeConfig.fixed_product_taxes_apply_tax_to_fpt,fixedProductTaxesEnabledDisplayInProductLists:t(e.storeConfig.fixed_product_taxes_display_prices_in_product_lists),fixedProductTaxesEnabledDisplayInSalesModules:t(e.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),fixedProductTaxesEnabledDisplayInProductView:t(e.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)}}function P(e){var t,i;return e?{type:e.__typename,name:e.name,sku:e.sku,uid:e.uid,image:A(e),stockStatus:e.stock_status,canonicalUrl:e.canonical_url,urlKey:e.url_key,categories:(t=e.categories)==null?void 0:t.map(s=>s.name),prices:W(e),productAttributes:D(e),options:e.gift_card_options?(i=e.gift_card_options)==null?void 0:i.map(s=>({uid:s.uid,required:s.required,title:s.title})):[]}:null}function A(e){var t,i;return{src:(t=e.thumbnail)==null?void 0:t.url,alt:(i=e.thumbnail)==null?void 0:i.label}}function W(e){var t,i,s,r,n,l,d,m,o,p,_,a,f,h,g,I,T,y;return{regularPrice:{currency:((s=(i=(t=e.price_range)==null?void 0:t.minimum_price)==null?void 0:i.regular_price)==null?void 0:s.currency)??"USD",value:((l=(n=(r=e.price_range)==null?void 0:r.minimum_price)==null?void 0:n.regular_price)==null?void 0:l.value)??0},finalPrice:{currency:((o=(m=(d=e.price_range)==null?void 0:d.minimum_price)==null?void 0:m.final_price)==null?void 0:o.currency)??"USD",value:((a=(_=(p=e.price_range)==null?void 0:p.minimum_price)==null?void 0:_.final_price)==null?void 0:a.value)??0},discount:{amountOff:((g=(h=(f=e.price_range)==null?void 0:f.minimum_price)==null?void 0:h.discount)==null?void 0:g.amount_off)??0,percentOff:((y=(T=(I=e.price_range)==null?void 0:I.minimum_price)==null?void 0:T.discount)==null?void 0:y.percent_off)??0},fixedProductTaxes:U(e)}}function D(e){var t,i;return(i=(t=e.custom_attributesV2)==null?void 0:t.items)==null?void 0:i.map(s=>{const r=s.code.split("_").map(n=>n.charAt(0).toUpperCase()+n.slice(1)).join(" ");return{...s,code:r}})}function U(e){var t,i,s,r,n;return(i=(t=e.price_range)==null?void 0:t.minimum_price)!=null&&i.fixed_product_taxes?(n=(r=(s=e.price_range)==null?void 0:s.minimum_price)==null?void 0:r.fixed_product_taxes)==null?void 0:n.map(l=>({money:{value:l.amount.value,currency:l.amount.currency},label:l.label})):[]}function v(e,t){return e?{id:e.id,updated_at:e.updated_at,sharing_code:e.sharing_code,items_count:e.items_count,items:M(e,t??[])}:null}function M(e,t){var i,s;return(s=(i=e==null?void 0:e.items_v2)==null?void 0:i.items)!=null&&s.length?e.items_v2.items.map(r=>({id:r.id,quantity:r.quantity,description:r.description,added_at:r.added_at,enteredOptions:t,selectedOptions:r.configurable_options?r.configurable_options.map(n=>({value:n.value_label,label:n.option_label,uid:n.configurable_product_option_uid})):[],product:P(r.product)})):[]}const F=`
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
    fixed_product_taxes_enable
    fixed_product_taxes_apply_tax_to_fpt
    fixed_product_taxes_display_prices_in_product_lists
    fixed_product_taxes_display_prices_in_sales_modules
    fixed_product_taxes_display_prices_on_product_view_page    
  }
}
`,k=async()=>b(F,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>e?E(e):G(t)),L=`
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
        items {
          __typename
          sku
          name
          thumbnail {
            label
            url
          }
          price_range {
            minimum_price {
              regular_price {
                currency
                value
              }
              final_price {
                currency
                value
              }
              discount {
                amount_off
                percent_off
              }
            }
          }
          stock_status
          ... on SimpleProduct {
            stock_status
            options {
              uid
            }
          }
          ... on ConfigurableProduct {
            configurable_options {
              uid
              attribute_uid
              attribute_code
              values {
                uid
              }
            }
            variants {
              product {
                sku
                stock_status
              }
            }
          }
          ... on GiftCardProduct {
            giftcard_type
            giftcard_amounts {
              uid
              website_id
              value
              attribute_id
              website_value
            }
            gift_card_options {
              title
              required
              uid
              ... on CustomizableFieldOption {
                value: value {
                  uid
                }
              }
            }
          }
          ... on BundleProduct {
            items {
              uid
              title
              options {
                uid
                label
                quantity
              }
            }
          }
        }
      }
    }
`,q=async e=>{if(!e)throw Error("Product SKU is not set");return b(L,{variables:{sku:e}}).then(({errors:t,data:i})=>{var s;return t?E(t):(s=i==null?void 0:i.products)!=null&&s.items?P(i.products.items[0]):null})},$=`
  fragment PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
  }
`,z=`
  fragment PRODUCT_FRAGMENT on ProductInterface {
    name
    sku
    uid
    thumbnail {
      url
      label
    }
    url_key
    categories {
      url_path
      url_key
      name
    }
    stock_status
    canonical_url
    custom_attributesV2(filters: {is_visible_on_front: true}){
      items {
        code
        ...on AttributeValue {
          value
        }
        ...on AttributeSelectedOptions {
          selected_options {
            value
            label
          }
        }
      }
    }
    price_range {
        ...PRICE_RANGE_FRAGMENT
    }
  }

${$}
`,H=`
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
`,B=`
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    ... on ConfigurableWishlistItem {
      configurable_options {
        option_label
        value_label
        configurable_product_option_uid
      }
      configured_variant {
        canonical_url
      }
    }
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
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${z}
  ${H}
`,C=`
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

${B}
`,Y=`
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${C}
`,Q=async()=>u.authenticated?b(Y).then(({errors:e,data:t})=>{var i;return e?E(e):(i=t==null?void 0:t.customer)!=null&&i.wishlists?t.customer.wishlists.map(s=>v(s)):null}):x(),K=`
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
${C}
`,V=async e=>{var s,r,n,l,d,m;if(!e)return null;const t=x();let i={id:(t==null?void 0:t.id)??"",updated_at:"",sharing_code:"",items_count:0,items:(t==null?void 0:t.items)??[]};for(const o of e){if((s=t.items)==null?void 0:s.some(a=>a.product.sku===o.sku))continue;const _=await q(o.sku);_&&(i.items=[...i.items,{quantity:o.quantity,selectedOptions:o.optionsUIDs?(r=o.optionsUIDs)==null?void 0:r.map(a=>({uid:a})):[],enteredOptions:o.enteredOptions?(n=o.enteredOptions)==null?void 0:n.map(a=>({uid:a.uid,value:a.value})):[],product:_}])}if(i.items_count=(l=i.items)==null?void 0:l.length,c.emit("wishlist/data",i),u.authenticated){if(!u.wishlistId)throw c.emit("wishlist/data",t),Error("Wishlist ID is not set");const o={wishlistId:u.wishlistId,wishlistItems:e.map(({sku:h,parentSku:g,quantity:I,optionsUIDs:T,enteredOptions:y})=>({sku:h,parent_sku:g,quantity:I,selected_options:T,entered_options:y}))},{errors:p,data:_}=await b(K,{variables:o}),a=[...((d=_==null?void 0:_.addProductsToWishlist)==null?void 0:d.user_errors)??[],...p??[]];if(a.length>0)return c.emit("wishlist/data",t),E(a);const f=v(_.addProductsToWishlist.wishlist,((m=e[0])==null?void 0:m.enteredOptions)??[]);c.emit("wishlist/data",f)}return null},j=()=>(u.wishlistId=null,u.authenticated=!1,Promise.resolve(null)),w=async()=>{if(u.initializing)return null;u.initializing=!0,u.config||(u.config=await k());const e=u.authenticated?await Z():await X();return c.emit("wishlist/initialized",e),c.emit("wishlist/data",e),u.initializing=!1,e};async function Z(){const e=await Q(),t=e?e[0]:null;return t?(u.wishlistId=t.id,t):null}async function X(){try{return await x()}catch(e){throw console.error(e),e}}const J=async e=>{var r;if(!e)return null;const t=x(!0),i=[];if((r=t==null?void 0:t.items)==null||r.forEach(n=>{e.items.some(d=>d.product.sku===n.product.sku)||(n.product.quantity=1,i.push(n.product))}),i.length===0)return null;const s=await V(i);return O(),s};export{B as W,V as a,C as b,se as c,q as d,Q as e,w as f,k as g,Z as h,S as i,X as j,J as m,j as r,v as t};
