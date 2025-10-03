/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as A,a as O,g as v}from"./chunks/createCustomerAddress.js";import{g as M,a as Q}from"./chunks/getCustomerToken.js";import{g as k,v as w}from"./chunks/verifyToken.js";import{r as b}from"./chunks/requestPasswordResetEmail.js";import{r as L}from"./chunks/resetPassword.js";import{r as N}from"./chunks/revokeCustomerToken.js";import{c as D}from"./chunks/confirmEmail.js";import{r as B}from"./chunks/resendConfirmationEmail.js";import{f as m}from"./chunks/network-error.js";import{g as K,r as V,a as W,s as X,b as Y}from"./chunks/network-error.js";import{c as $,i as ee}from"./chunks/initialize.js";import"./fragments.js";import"./chunks/setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"./chunks/transform-attributes-form.js";import"./chunks/acdl.js";import"@dropins/tools/fetch-graphql.js";const c=`
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
`;let n=null,i=null;const p=e=>{const s={},t=r=>{r.forEach(o=>{var a;s[o.text]=!0,(a=o.children)!=null&&a.length&&t(o.children)})};return t(e),s},l=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,f=e=>{var t;if(l(e))return{admin:!0};const s={all:!0};if((t=e==null?void 0:e.permissions)!=null&&t.length){const r=p(e.permissions);return{...s,...r}}return s},d=async()=>{var e,s,t;try{const r=await m(c,{method:"GET"});(e=r.errors)!=null&&e.length&&console.error("GraphQL errors",r.errors);const o=f((t=(s=r.data)==null?void 0:s.customer)==null?void 0:t.role);return n=o,i=null,o}catch(r){throw i=null,r}},S=()=>n?Promise.resolve(n):(i||(i=d()),i),G=()=>{n=null,i=null};export{G as __clearCacheForTesting,$ as config,D as confirmEmail,A as createCustomer,O as createCustomerAddress,m as fetchGraphQl,v as getAttributesForm,K as getConfig,M as getCustomerData,S as getCustomerRolePermissions,Q as getCustomerToken,k as getStoreConfig,ee as initialize,V as removeFetchGraphQlHeader,b as requestPasswordResetEmail,B as resendConfirmationEmail,L as resetPassword,N as revokeCustomerToken,W as setEndpoint,X as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders,w as verifyToken};
//# sourceMappingURL=api.js.map
