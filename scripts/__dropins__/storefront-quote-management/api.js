/*! Copyright 2025 Adobe
All Rights Reserved. */
import{r as ie,u as se}from"./chunks/uploadFile.js";import{g as A}from"./chunks/duplicateNegotiableQuote.js";import{c as de,a as ue,d as me,b as pe,r as le,s as ce}from"./chunks/duplicateNegotiableQuote.js";import{F as ge,N as _e,S as Ee,n as he}from"./chunks/negotiableQuotes.js";import{events as i}from"@dropins/tools/event-bus.js";import{s as r,D as h,a as f,Q as p}from"./chunks/state.js";import{f as d,a as N}from"./chunks/transform-quote.js";import{e as Ie,r as Qe,s as Ae,c as Ne,d as qe}from"./chunks/transform-quote.js";import{N as q}from"./chunks/NegotiableQuoteFragment.js";import{a as u}from"./chunks/transform-quote-template.js";import{N as m}from"./chunks/NegotiableQuoteTemplateFragment.js";import{Q as De,a as be,S as ye,g as Ue}from"./chunks/getQuoteTemplates.js";import{a as Se,o as Le,s as Me}from"./chunks/openQuoteTemplate.js";import{g as ve}from"./chunks/generateQuoteFromTemplate.js";import{r as $e,s as Ce,u as Ge}from"./chunks/setLineItemNote.js";import{Initializer as w}from"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";function D(e){if(!e||typeof e!="object")return{requestQuote:!1,editQuote:!1,deleteQuote:!1,checkoutQuote:!1,viewQuoteTemplates:!1,manageQuoteTemplates:!1,generateQuoteFromTemplate:!1};if(e.all===!0)return{requestQuote:!0,editQuote:!0,deleteQuote:!0,checkoutQuote:!0,viewQuoteTemplates:!0,manageQuoteTemplates:!0,generateQuoteFromTemplate:!0};const a=e["Magento_NegotiableQuote::all"]===!0,t=e["Magento_NegotiableQuoteTemplate::all"]===!0,o=a||e["Magento_NegotiableQuote::manage"]===!0;return{requestQuote:o,editQuote:o,deleteQuote:o,checkoutQuote:a||e["Magento_NegotiableQuote::checkout"]===!0,viewQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::view_template"]===!0,manageQuoteTemplates:t||e["Magento_NegotiableQuoteTemplate::manage"]===!0,generateQuoteFromTemplate:t||e["Magento_NegotiableQuoteTemplate::generate_quote"]===!0}}function c(e){if(r.quoteDataLoaded)return;const a=T.config.getConfig(),{quoteId:t,quoteTemplateId:o}=a;!e.editQuote||!t&&!o||(r.quoteDataLoaded=!0,t&&A(t).then(s=>{r.quoteDataInitialized||i.emit("quote-management/quote-data/initialized",{quote:s,permissions:e}),r.quoteDataInitialized=!0}).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-data/error",{error:s})}),o&&M(o).catch(s=>{r.quoteDataLoaded=!1,i.emit("quote-management/quote-template-data/error",{error:s})}))}const T=new w({init:async e=>{const a={};T.config.setConfig({...a,...e}),await U().then(t=>{r.config=t}).catch(t=>{console.error("Failed to fetch store config: ",t),r.config=f}),r.initialized=!0,i.emit("quote-management/initialized",{})},listeners:()=>[i.on("authenticated",async e=>{r.authenticated=!!e,e||(r.permissions=h,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",h))},{eager:!0}),i.on("auth/permissions",async e=>{const a=D(e);r.permissions=a,r.quoteDataLoaded=!1,i.emit("quote-management/permissions",r.permissions)},{eager:!0}),i.on("quote-management/permissions",async e=>{r.initialized&&c(e)},{eager:!0}),i.on("quote-management/initialized",async()=>{c(r.permissions)},{eager:!0}),i.on("checkout/updated",async e=>{r.initialized&&(e==null?void 0:e.type)==="quote"&&(r.quoteDataLoaded=!1,c(r.permissions))},{eager:!0})]}),V=T.config;function b(e){if(!e)return f;const a=t=>[p.TAX_EXCLUDED,p.TAX_INCLUDED,p.TAX_INCLUDED_AND_EXCLUDED].includes(t)?t:p.TAX_EXCLUDED;return{quoteSummaryDisplayTotal:e.cart_summary_display_quantity,quoteSummaryMaxItems:e.max_items_in_order_summary,quoteDisplaySettings:{zeroTax:e.shopping_cart_display_zero_tax,subtotal:a(e.shopping_cart_display_subtotal),price:a(e.shopping_cart_display_price),shipping:a(e.shopping_cart_display_shipping),fullSummary:e.shopping_cart_display_full_summary,grandTotal:e.shopping_cart_display_grand_total},useConfigurableParentThumbnail:e.configurable_thumbnail_source==="parent"}}const y=`
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
`,U=async()=>d(y,{method:"GET",cache:"force-cache"}).then(({errors:e,data:a})=>{if(e){const t=e.map(o=>o.message).join(", ");throw new Error(`Failed to get store config: ${t}`)}return b(a.storeConfig)}),O=`
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
  ${q}
`;function S(e){const{additionalInput:a,...t}=e,o={city:t.city,company:t.company,country_code:t.countryCode,firstname:t.firstname,lastname:t.lastname,postcode:t.postcode,region:t.region,region_id:t.regionId,save_in_address_book:t.saveInAddressBook,street:t.street,telephone:t.telephone};return{...a||{},...o}}const J=async e=>{const{quoteUid:a,addressId:t,addressData:o}=e;if(!a)throw new Error("Quote UID is required");if(t===void 0&&!o)throw new Error("Either addressId or addressData must be provided");if(t!==void 0&&o)throw new Error("Cannot provide both addressId and addressData");const s=o?S(o):null;return d(O,{variables:{quoteUid:a,addressId:t||null,addressData:s}}).then(n=>{var _,E;const{errors:g}=n;if(g){const I=g.map(Q=>Q.message).join("; ");throw new Error(`Failed to set shipping address: ${I}`)}const l=N((E=(_=n.data)==null?void 0:_.setNegotiableQuoteShippingAddress)==null?void 0:E.quote);if(!l)throw new Error("Failed to transform quote data: Invalid response structure");return i.emit("quote-management/shipping-address-set",{quote:l,input:{quoteUid:a,addressId:t,addressData:o}}),l})},L=`
  query QUOTE_TEMPLATE_DATA_QUERY($templateId: ID!) {
    negotiableQuoteTemplate(templateId: $templateId) {
      ...NegotiableQuoteTemplateFragment
    }
  }

  ${m}
`,M=async e=>{var a;if(!r.authenticated)throw new Error("Unauthorized");if(!e)throw new Error("Template ID is required");try{const t=await d(L,{variables:{templateId:e}});if(!((a=t==null?void 0:t.data)!=null&&a.negotiableQuoteTemplate))throw new Error("Quote template not found");const o=u(t.data.negotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},F=`
  mutation CANCEL_QUOTE_TEMPLATE_MUTATION(
    $templateId: ID!
    $comment: String
  ) {
    cancelNegotiableQuoteTemplate(
      input: {
        template_id: $templateId
        cancellation_comment: $comment
      }
    ) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,K=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(F,{variables:{templateId:e.templateId,comment:e.comment}});if(!((a=t==null?void 0:t.data)!=null&&a.cancelNegotiableQuoteTemplate))throw new Error("No quote template data received");const o=u(t.data.cancelNegotiableQuoteTemplate);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},v=`
  mutation DELETE_QUOTE_TEMPLATE_MUTATION($templateId: ID!) {
    deleteNegotiableQuoteTemplate(input: { template_id: $templateId })
  }
`,W=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(v,{variables:{templateId:e.templateId}});if(t!=null&&t.errors&&t.errors.length>0){const s=t.errors.map(n=>n==null?void 0:n.message).filter(Boolean).join("; ");throw new Error(s||"Failed to delete quote template")}if(!((a=t==null?void 0:t.data)==null?void 0:a.deleteNegotiableQuoteTemplate))throw new Error("Failed to delete quote template");return i.emit("quote-management/quote-template-deleted",{templateId:e.templateId}),{templateId:e.templateId}}catch(t){return Promise.reject(t)}},P=`
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
  
  ${m}
`,Z=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.shippingAddress)throw new Error("Shipping address is required");if(!r.authenticated)throw new Error("Unauthorized");if(!e.shippingAddress.address&&!e.shippingAddress.customerAddressUid)throw new Error("Either address or customerAddressUid must be provided");try{const t=await d(P,{variables:{templateId:e.templateId,shippingAddress:{address:e.shippingAddress.address?{city:e.shippingAddress.address.city,company:e.shippingAddress.address.company,country_code:e.shippingAddress.address.countryCode,fax:e.shippingAddress.address.fax,firstname:e.shippingAddress.address.firstname,lastname:e.shippingAddress.address.lastname,middlename:e.shippingAddress.address.middlename,postcode:e.shippingAddress.address.postcode,prefix:e.shippingAddress.address.prefix,region:e.shippingAddress.address.region,region_id:e.shippingAddress.address.regionId,save_in_address_book:e.shippingAddress.address.saveInAddressBook,street:e.shippingAddress.address.street,suffix:e.shippingAddress.address.suffix,telephone:e.shippingAddress.address.telephone,vat_id:e.shippingAddress.address.vatId}:void 0,customer_address_uid:e.shippingAddress.customerAddressUid,customer_notes:e.shippingAddress.customerNotes}}});if(!((a=t==null?void 0:t.data)!=null&&a.setNegotiableQuoteTemplateShippingAddress))throw new Error("No quote template data received");const o=u(t.data.setNegotiableQuoteTemplateShippingAddress);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},$=`
  mutation UPDATE_NEGOTIABLE_QUOTE_TEMPLATE_QUANTITIES_MUTATION(
    $input: UpdateNegotiableQuoteTemplateQuantitiesInput!
  ) {
    updateNegotiableQuoteTemplateQuantities(input: $input) {
      quote_template {
        ...NegotiableQuoteTemplateFragment
      }
    }
  }
  ${m}
`,ee=async e=>{var a,t;if(!e.templateId)throw new Error("Template ID is required");if(!e.items||e.items.length===0)throw new Error("Items array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const o=await d($,{variables:{input:{template_id:e.templateId,items:e.items.map(n=>({item_id:n.itemId,quantity:n.quantity,min_qty:n.minQty,max_qty:n.maxQty}))}}});if(!((t=(a=o==null?void 0:o.data)==null?void 0:a.updateNegotiableQuoteTemplateQuantities)!=null&&t.quote_template))throw new Error("No quote template data received");const s=u(o.data.updateNegotiableQuoteTemplateQuantities.quote_template);if(!s)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:s,permissions:r.permissions}),s}catch(o){return Promise.reject(o)}},C=`
  mutation REMOVE_NEGOTIABLE_QUOTE_TEMPLATE_ITEMS_MUTATION(
    $input: RemoveNegotiableQuoteTemplateItemsInput!
  ) {
    removeNegotiableQuoteTemplateItems(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,te=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemUids||e.itemUids.length===0)throw new Error("Item UIDs array is required and must not be empty");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(C,{variables:{input:{template_id:e.templateId,item_uids:e.itemUids}}});if(!((a=t==null?void 0:t.data)!=null&&a.removeNegotiableQuoteTemplateItems))throw new Error("No quote template data received");const o=u(t.data.removeNegotiableQuoteTemplateItems);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}},G=`
  mutation SET_QUOTE_TEMPLATE_LINE_ITEM_NOTE_MUTATION(
    $input: QuoteTemplateLineItemNoteInput!
  ) {
    setQuoteTemplateLineItemNote(input: $input) {
      ...NegotiableQuoteTemplateFragment
    }
  }
  ${m}
`,oe=async e=>{var a;if(!e.templateId)throw new Error("Template ID is required");if(!e.itemId)throw new Error("Item ID is required");if(!r.authenticated)throw new Error("Unauthorized");try{const t=await d(G,{variables:{input:{templateId:e.templateId,item_id:e.itemId,note:e.note}}});if(!((a=t==null?void 0:t.data)!=null&&a.setQuoteTemplateLineItemNote))throw new Error("No quote template data received");const o=u(t.data.setQuoteTemplateLineItemNote);if(!o)throw new Error("Failed to transform quote template data");return i.emit("quote-management/quote-template-data",{quoteTemplate:o,permissions:r.permissions}),o}catch(t){return Promise.reject(t)}};export{ge as FilterMatchTypeEnum,_e as NegotiableQuoteSortableField,De as QuoteTemplateFilterStatus,be as QuoteTemplateSortField,ye as SortDirection,Ee as SortEnum,Se as acceptQuoteTemplate,oe as addQuoteTemplateLineItemNote,Z as addQuoteTemplateShippingAddress,K as cancelQuoteTemplate,de as closeNegotiableQuote,V as config,ue as createQuoteTemplate,me as deleteQuote,W as deleteQuoteTemplate,pe as duplicateQuote,d as fetchGraphQl,ve as generateQuoteFromTemplate,Ie as getConfig,A as getQuoteData,M as getQuoteTemplateData,Ue as getQuoteTemplates,U as getStoreConfig,T as initialize,he as negotiableQuotes,Le as openQuoteTemplate,Qe as removeFetchGraphQlHeader,$e as removeNegotiableQuoteItems,te as removeQuoteTemplateItems,le as renameNegotiableQuote,ie as requestNegotiableQuote,ce as sendForReview,Me as sendQuoteTemplateForReview,Ae as setEndpoint,Ne as setFetchGraphQlHeader,qe as setFetchGraphQlHeaders,Ce as setLineItemNote,J as setShippingAddress,Ge as updateQuantities,ee as updateQuoteTemplateItemQuantities,se as uploadFile};
//# sourceMappingURL=api.js.map
