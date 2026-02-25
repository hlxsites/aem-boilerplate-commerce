/*! Copyright 2026 Adobe
All Rights Reserved. */
import{r as J}from"./chunks/requestNegotiableQuote.js";import{g as I}from"./chunks/duplicateNegotiableQuote.js";import{c as V,a as W,d as Z,b as ee,r as te,s as se}from"./chunks/duplicateNegotiableQuote.js";import{F as ae,N as re,S as ie,n as ne}from"./chunks/negotiableQuotes.js";import{events as r}from"@dropins/tools/event-bus.js";import{s as a,D as f,a as h,Q as n}from"./chunks/state.js";import{f as d,t as q}from"./chunks/transform-quote.js";import{i as ue,r as me,s as pe,e as le,h as ge}from"./chunks/transform-quote.js";import{N as D}from"./chunks/NegotiableQuoteFragment.js";import{u as _e}from"./chunks/uploadFile.js";import{a as T}from"./chunks/transform-quote-template.js";import{N as Q}from"./chunks/NegotiableQuoteTemplateFragment.js";import{Q as he,a as Te,S as Qe,g as Ee}from"./chunks/getQuoteTemplates.js";import{b as Ie,c as qe,d as De,o as Ne,a as ye,s as be}from"./chunks/openQuoteTemplate.js";import{a as we,r as Fe,u as Ue}from"./chunks/addQuoteTemplateLineItemNote.js";import{g as Le}from"./chunks/generateQuoteFromTemplate.js";import{r as xe,s as Oe,u as Ce}from"./chunks/setLineItemNote.js";import{Initializer as N}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";function y(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const s=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,o=s||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:o,editQuote:o,deleteQuote:o,checkoutQuote:s||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function m(e){if(a.quoteDataLoaded)return;const s=p.config.getConfig(),{quoteId:t,quoteTemplateId:o}=s;!e.editQuote||!t&&!o||(a.quoteDataLoaded=!0,t&&I(t).then(i=>{a.quoteDataInitialized||r.emit("quote-management/quote-data/initialized",{quote:i,permissions:e}),a.quoteDataInitialized=!0}).catch(i=>{a.quoteDataLoaded=!1,r.emit("quote-management/quote-data/error",{error:i})}),o&&L(o).catch(i=>{a.quoteDataLoaded=!1,r.emit("quote-management/quote-template-data/error",{error:i})}))}const p=new N({init:async e=>{const s={};p.config.setConfig({...s,...e}),await w().then(t=>{a.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),a.config=h}),a.initialized=!0,r.emit("quote-management/initialized",{config:a.config})},listeners:()=>[r.on("authenticated",async e=>{a.authenticated=!!e,e||(a.permissions=f,a.quoteDataLoaded=!1,r.emit("quote-management/permissions",f))},{eager:!0}),r.on("auth/permissions",async e=>{const s=y(e);a.permissions=s,a.quoteDataLoaded=!1,r.emit("quote-management/permissions",a.permissions)},{eager:!0}),r.on("quote-management/permissions",async e=>{a.initialized&&m(e)},{eager:!0}),r.on("quote-management/initialized",async()=>{m(a.permissions)},{eager:!0}),r.on("checkout/updated",async e=>{a.initialized&&(e==null?void 0:e.type)==="quote"&&(a.quoteDataLoaded=!1,m(a.permissions))},{eager:!0})]}),B=p.config;function b(e){if(!e)return h;const s=t=>[n.TAX_EXCLUDED,n.TAX_INCLUDED,n.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:n.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:s(e.shopping_cart_display_subtotal),price:s(e.shopping_cart_display_price),shipping:s(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent",quoteMinimumAmount:e.quote_minimum_amount??null,quoteMinimumAmountMessage:e.quote_minimum_amount_message??null}}const S=`
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
      quote_minimum_amount
      quote_minimum_amount_message
    }
  }
`,w=async()=>d(S,{method:"GET",cache:"force-cache"}).then(({errors:e,data:s})=>{if(e){const t=e.map(o=>o.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return b(s.storeConfig)}),F=`
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
  ${D}
`;function U(e){const{additionalInput:s,...t}=e,o={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...s||{},...o}}const H=async e=>{const{quoteUid:s,addressId:t,addressData:o}=e;if(!s)throw new Error("Quote UID is required");if(t===void 0&&!o)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&o)throw new Error("Cannot provide both addressId and addressData");const i=o?U(o):null;return d(F,{variables:{quoteUid:s,addressId:t||null,addressData:i}}).then(l=>{var c,_;const{errors:g}=l;if(g){const E=g.map(A=>A.message).join("; ");throw new Error(`Failed to set shipping address: ${E}`)}const u=q((_=(c=l.data)==null?void 0:c.setNegotiableQuoteShippingAddress)==null?void 0:_.quote);if(!u)throw new Error("Failed to transform quote data: Invalid response structure");return r.emit("quote-management/shipping-address-set",{quote:u,input:{quoteUid:s,addressId:t,addressData:o}}),u})},v=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${Q}
`,L=async e=>{var s;if(!a.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await d(v,{variables:{templateId:e}});if(!((s=t==null?void 0:t.data)!=null&&s.negotiableQuoteTemplate))throw new Error("Quote template not found");const o=T(t.data.negotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return r.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(t){return Promise.reject(t)}},M=`
  mutation SET_NEGOTIABLE_QUOTE_TEMPLATE_SHIPPING_ADDRESS_MUTATION(
    $templateId: ID!
    $shippingAddress: NegotiableQuoteTemplateShippingAddressInput!
  ) {
    setNegotiableQuoteTemplateShippingAddress(
      input: {
        template_id: $templateId
        shipping_address: $shippingAddress
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  
  ${Q}
`,X=async e=>{var s;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!a.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await d(M,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((s=t==null?void 0:t.data)!=null&&s.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const o=T(t.data.setNegotiableQuoteTemplateShippingAddress);if(!o)throw new Error("Failed to transform quote template data");return r.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:a.permissions}),o}catch(t){return Promise.reject(t)}};export{ae as FilterMatchTypeEnum,re as NegotiableQuoteSortableField,he as QuoteTemplateFilterStatus,Te as QuoteTemplateSortField,Qe as SortDirection,ie as SortEnum,Ie as acceptQuoteTemplate,we as addQuoteTemplateLineItemNote,X as addQuoteTemplateShippingAddress,qe as cancelQuoteTemplate,V as closeNegotiableQuote,B as config,W as createQuoteTemplate,Z as deleteQuote,De as deleteQuoteTemplate,ee as duplicateQuote,d as fetchGraphQl,Le as generateQuoteFromTemplate,ue as getConfig,I as getQuoteData,L as getQuoteTemplateData,Ee as getQuoteTemplates,w as getStoreConfig,p as initialize,ne as negotiableQuotes,Ne as openQuoteTemplate,me as removeFetchGraphQlHeader,xe as removeNegotiableQuoteItems,Fe as removeQuoteTemplateItems,te as renameNegotiableQuote,J as requestNegotiableQuote,se as sendForReview,ye as sendQuoteTemplateForReview,pe as setEndpoint,le as setFetchGraphQlHeader,ge as setFetchGraphQlHeaders,Oe as setLineItemNote,be as setQuoteTemplateExpirationDate,H as setShippingAddress,Ce as updateQuantities,Ue as updateQuoteTemplateItemQuantities,_e as uploadFile};
//# sourceMappingURL=api.js.map
