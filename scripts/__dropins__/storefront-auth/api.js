/*! Copyright 2025 Adobe
All Rights Reserved. */
import{c as O,a as v,g as A}from"./chunks/createCustomerAddress.js";import{g as Q,a as U}from"./chunks/getCustomerToken.js";import{g as w,v as I}from"./chunks/verifyToken.js";import{r as b}from"./chunks/requestPasswordResetEmail.js";import{r as L}from"./chunks/resetPassword.js";import{r as N}from"./chunks/revokeCustomerToken.js";import{c as D}from"./chunks/confirmEmail.js";import{r as B}from"./chunks/resendConfirmationEmail.js";import{f as m}from"./chunks/network-error.js";import{g as K,r as V,a as W,s as X,b as Y}from"./chunks/network-error.js";import{c as $,i as rr}from"./chunks/initialize.js";import"./fragments.js";import"./chunks/setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";import"./chunks/transform-attributes-form.js";import"./chunks/acdl.js";import"@dropins/tools/fetch-graphql.js";const c=`
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
`;let n=null,i=null;const p=r=>{const t={},s=e=>{e.forEach(o=>{var a;t[o.text]=!0,(a=o.children)!=null&&a.length&&s(o.children)})};return s(r),t},l=r=>(r==null?void 0:r.name)==="company administrator"&&Array.isArray(r.permissions)&&r.permissions.length===0,f=r=>{var s;if(l(r))return{admin:!0};const t={all:!0};if((s=r==null?void 0:r.permissions)!=null&&s.length){const e=p(r.permissions);return{...t,...e}}return t},d=async()=>{var r,t,s;try{const e=await m(c,{method:"GET"});(r=e.errors)!=null&&r.length&&console.error("GraphQL errors",e.errors);const o=f((s=(t=e.data)==null?void 0:t.customer)==null?void 0:s.role);return n=o,i=null,o}catch(e){throw i=null,e}},S=()=>n?Promise.resolve(n):(i||(i=d()),i),G=()=>{n=null,i=null};export{G as __clearCacheForTesting,$ as config,D as confirmEmail,O as createCustomer,v as createCustomerAddress,m as fetchGraphQl,A as getAttributesForm,K as getConfig,Q as getCustomerData,S as getCustomerRolePermissions,U as getCustomerToken,w as getStoreConfig,rr as initialize,V as removeFetchGraphQlHeader,b as requestPasswordResetEmail,B as resendConfirmationEmail,L as resetPassword,N as revokeCustomerToken,W as setEndpoint,X as setFetchGraphQlHeader,Y as setFetchGraphQlHeaders,I as verifyToken};
//# sourceMappingURL=api.js.map
