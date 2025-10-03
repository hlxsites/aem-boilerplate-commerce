/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as A,a as O,g as v}from"./chunks/createCustomerAddress.js";import{g as M,a as U}from"./chunks/getCustomerToken.js";import{g as w,v as I}from"./chunks/verifyToken.js";import{r as b}from"./chunks/requestPasswordResetEmail.js";import{r as q}from"./chunks/resetPassword.js";import{r as N}from"./chunks/revokeCustomerToken.js";import{c as D}from"./chunks/confirmEmail.js";import{r as B}from"./chunks/resendConfirmationEmail.js";import{f as m}from"./chunks/network-error.js";import{g as K,r as V,a as W,s as X,b as Y}from"./chunks/network-error.js";import{c as $,i as ee}from"./chunks/initialize.js";import"./fragments.js";import"./chunks/setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"./chunks/transform-attributes-form.js";import"./chunks/acdl.js";import"@dropins/tools/fetch-graphql.js";const c=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children {
                  id
                  text
                  children {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;let i=null,o=null;const p=e=>{const t={},r=s=>{s.forEach(n=>{var a;t[n.text]=!0,(a=n.children)!=null&&a.length&&r(n.children)})};return r(e),t},l=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,d=e=>{var r;if(l(e))return{admin:!0};const t={all:!0};if((r=e==null?void 0:e.permissions)!=null&&r.length){const s=p(e.permissions);return{...t,...s}}return t},f=async()=>{var e,t;try{const r=await m(c,{method:"GET"}),s=d((t=(e=r.data)==null?void 0:e.customer)==null?void 0:t.role);return i=s,o=null,s}catch(r){throw o=null,r}},S=()=>i?Promise.resolve(i):(o||(o=f()),o),_=()=>{i=null,o=null};export{_ as __clearCacheForTesting,$ as config,D as confirmEmail,A as createCustomer,O as createCustomerAddress,m as fetchGraphQl,v as getAttributesForm,K as getConfig,M as getCustomerData,S as getCustomerRolePermissions,U as getCustomerToken,w as getStoreConfig,ee as initialize,V as removeFetchGraphQlHeader,b as requestPasswordResetEmail,B as resendConfirmationEmail,q as resetPassword,N as revokeCustomerToken,W as setEndpoint,X as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders,I as verifyToken};
//# sourceMappingURL=api.js.map
