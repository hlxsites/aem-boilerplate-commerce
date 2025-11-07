/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s,D as i,Q as d}from"./chunks/state.js";import{events as n}from"@dropins/tools/event-bus.js";import{f as c,t as h}from"./chunks/transform-quote.js";import{d as Y,r as B,s as V,b as K,c as J}from"./chunks/transform-quote.js";import{r as Z,u as ee}from"./chunks/uploadFile.js";import{N as E}from"./chunks/NegotiableQuoteFragment.js";import{F as oe,N as re,S as se,n as ne}from"./chunks/negotiableQuotes.js";import{d as ae,r as ue,s as de}from"./chunks/renameNegotiableQuote.js";import{Initializer as y}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const p=new y({init:async t=>{const e={};p.config.setConfig({...e,...t}),s.config||(s.config=await F())},listeners:()=>[n.on("authenticated",async t=>{s.authenticated=!!t,t?R().then(e=>{s.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},n.emit("quote-management/permissions",s.permissions)}).catch(e=>{console.error(e),s.permissions=i,n.emit("quote-management/permissions",i)}):(s.permissions=i,n.emit("quote-management/permissions",i))},{eager:!0}),n.on("quote-management/permissions",async t=>{const e=p.config.getConfig().quoteId;e&&t.editQuote&&O(e).then(o=>{n.emit("quote-management/quote-data/initialized",{quote:o,permissions:t},{})}).catch(o=>{n.emit("quote-management/quote-data/error",{error:o})})},{eager:!0})]}),k=p.config,T=`
    fragment CUSTOMER_FRAGMENT on Customer {
        role {
            permissions {
                text
                children {
                    text
                    children {
                        text
                        children {
                            text
                        }
                    }
                }
            }
        }
    }
`,q=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${T}
`,I="All/Quotes/View/Request, Edit, Delete",D="All/Quotes/View/Request, Edit, Delete",S="All/Quotes/View/Request, Edit, Delete",A="All/Quotes/View/Checkout with quote",C=t=>{const e=[],o=(r,m=[])=>{for(const a of r){const u=[...m,a.text];a.children&&a.children.length>0?o(a.children,u):e.push(u.join("/"))}};return o(t),e};function U(t){const{role:e}=t;if(!e)return{permissions:{canRequestQuote:i.requestQuote,canEditQuote:i.editQuote,canDeleteQuote:i.deleteQuote,canCheckoutQuote:i.checkoutQuote}};const{permissions:o}=e,r=C(o);return{permissions:{canRequestQuote:r.includes(I),canEditQuote:r.includes(D),canDeleteQuote:r.includes(S),canCheckoutQuote:r.includes(A)}}}function N(t){if(!t)return null;const e=o=>[d.TAX_EXCLUDED,d.TAX_INCLUDED,d.TAX_INCLUDED_AND_EXCLUDED].includes(o)?o:d.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:t.cart_summary_display_quantity,quoteSummaryMaxItems:t.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:t.shopping_cart_display_zero_tax,subtotal:e(t.shopping_cart_display_subtotal),price:e(t.shopping_cart_display_price),shipping:e(t.shopping_cart_display_shipping),fullSummary:t.shopping_cart_display_full_summary,grandTotal:t.shopping_cart_display_grand_total},useConfigurableParentThumbnail:t.configurable_thumbnail_source==="parent"}}const R=async()=>{var t;if(!s.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await c(q);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return U(e.data.customer)}catch(e){return Promise.reject(e)}},w=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${E}
`,O=async t=>{var e;if(!s.authenticated)return Promise.reject(new Error("Unauthorized"));if(!s.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await c(w,{variables:{quoteId:t}}),r=h((e=o==null?void 0:o.data)==null?void 0:e.negotiableQuote);if(!r)throw new Error("Failed to transform quote data");return n.emit("quote-management/quote-data",{quote:r,permissions:s.permissions}),r}catch(o){return Promise.reject(o)}},b=`
  query STORE_CONFIG_QUERY {
    storeConfig {
      cart_summary_display_quantity
      max_items_in_order_summary
      shopping_cart_display_full_summary
      shopping_cart_display_grand_total
      shopping_cart_display_price
      shopping_cart_display_shipping
      shopping_cart_display_subtotal
      shopping_cart_display_zero_tax
      configurable_thumbnail_source
    }
  }
`,F=async()=>c(b,{method:"GET",cache:"force-cache"}).then(({errors:t,data:e})=>{if(t){const o=t.map(r=>r.message).join(", ");throw new Error(`Failed to get store config: ${o}`)}return N(e.storeConfig)}).catch(t=>Promise.reject(t)),M=`
  mutation SET_NEGOTIABLE_QUOTE_SHIPPING_ADDRESS_MUTATION(
    $quoteUid: ID!
    $addressId: ID
    $addressData: NegotiableQuoteAddressInput
  ) {
    setNegotiableQuoteShippingAddress(
      input: {
        quote_uid: $quoteUid
        shipping_addresses: {
          customer_address_uid: $addressId
          address: $addressData
        }
      }
    ) {
      quote {
        ...NegotiableQuoteFragment
      }
    }
  }
  ${E}
`;function P(t){const{additionalInput:e,...o}=t,r={city:o.city,company:o.company,country_code:o.countryCode,firstname:o.firstname,lastname:o.lastname,postcode:o.postcode,region:o.region,region_id:o.regionId,save_in_address_book:o.saveInAddressBook,street:o.street,telephone:o.telephone};return{...e||{},...r}}const z=async t=>{const{quoteUid:e,addressId:o,addressData:r}=t;if(!e)throw new Error("Quote UID is required");if(o===void 0&&!r)throw new Error("Either addressId or addressData must be provided");if(o!==void 0&&r)throw new Error("Cannot provide both addressId and addressData");const m=r?P(r):null;return c(M,{variables:{quoteUid:e,addressId:o||null,addressData:m}}).then(a=>{var _,g;const{errors:u}=a;if(u){const f=u.map(Q=>Q.message).join("; ");throw new Error(`Failed to set shipping address: ${f}`)}const l=h((g=(_=a.data)==null?void 0:_.setNegotiableQuoteShippingAddress)==null?void 0:g.quote);if(!l)throw new Error("Failed to transform quote data: Invalid response structure");return n.emit("quote-management/shipping-address-set",{quote:l,input:{quoteUid:e,addressId:o,addressData:r}}),l})};export{oe as FilterMatchTypeEnum,re as NegotiableQuoteSortableField,se as SortEnum,k as config,ae as deleteQuote,c as fetchGraphQl,Y as getConfig,R as getCustomerData,O as getQuoteData,F as getStoreConfig,p as initialize,ne as negotiableQuotes,B as removeFetchGraphQlHeader,ue as renameNegotiableQuote,Z as requestNegotiableQuote,de as sendForReview,V as setEndpoint,K as setFetchGraphQlHeader,J as setFetchGraphQlHeaders,z as setShippingAddress,ee as uploadFile};
//# sourceMappingURL=api.js.map
