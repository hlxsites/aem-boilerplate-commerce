/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as N,h as T}from"./network-error.js";import{events as S}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";const h=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),C={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},n=3600,O=t=>{var o,a,e,r,s,u,f,_,m,g;return{autocompleteOnStorefront:((a=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:a.autocomplete_on_storefront)||!1,minLength:((r=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:r.minimum_password_length)||3,requiredCharacterClasses:+((u=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:u.required_character_classes_number)||0,createAccountConfirmation:((_=(f=t==null?void 0:t.data)==null?void 0:f.storeConfig)==null?void 0:_.create_account_confirmation)||!1,customerAccessTokenLifetime:((g=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:g.customer_access_token_lifetime)*n||n}},I=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},R=async()=>{try{const t=sessionStorage.getItem("storeConfig");let a=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!a){const e=await G();sessionStorage.setItem("storeConfig",JSON.stringify(e)),a=(e==null?void 0:e.customerAccessTokenLifetime)||n}return`Max-Age=${a}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${n}`}},k=t=>{const o=t.map(e=>e.message).join(" ");if(t.some(({extensions:e})=>(e==null?void 0:e.category)==="graphql-authorization")){for(let e of Object.keys(C))I(C[e]);S.emit("authenticated",!1)}throw Error(o)},l="accountContext";var A=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(A||{});const c={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function d(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function E(t,o){const a=d();a.push({[t]:null}),a.push({[t]:o})}function i(t,o){d().push(e=>{const r=e.getState?e.getState():{};e.push({event:t,eventInfo:{...r,...o}})})}function y(t){const o=h(t);E(l,o),i(c.CREATE_ACCOUNT)}function b(t){const o=h(t);E(l,o),i(c.SIGN_IN)}function w(){i(c.SIGN_OUT)}const q=(t,o)=>{const a=sessionStorage.getItem("storeConfig"),r={...a?JSON.parse(a):{},...o};switch(t){case"create-account":y(r);break;case"sign-in":b(r);break;case"sign-out":w();break;default:return null}},L=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
    }
  }
`,G=async()=>await N(L,{method:"GET",cache:"force-cache"}).then(t=>{var o;return(o=t.errors)!=null&&o.length?k(t.errors):O(t)}).catch(T);export{C,A as E,R as a,I as d,G as g,k as h,q as p};
