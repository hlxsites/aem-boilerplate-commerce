/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as C,f as k,h as G}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as y}from"@dropins/tools/event-bus.js";import{merge as U}from"@dropins/tools/lib.js";import{c as R,f as n,C as w,e as S,L as F}from"./getAdobeCommerceOptimizerData.js";import{CUSTOMER_INFORMATION_FRAGMENT as v}from"../fragments.js";import{i as x,s as A,d as D,p as H,E as K}from"./decodeJwtToken.js";import{s as Q}from"./setReCaptchaToken.js";const q=t=>{var d,m,o,f,a,c,i,s,T,g,E,M,r,N;const e={email:((m=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:m.email)??"",firstName:((f=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:f.firstname)??"",lastName:((c=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:c.lastname)??"",groupUid:((T=(s=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:s.group)==null?void 0:T.uid)??""};return U(e,(N=(r=(M=(E=(g=R)==null?void 0:g.getConfig())==null?void 0:E.models)==null?void 0:M.CustomerModel)==null?void 0:r.transformer)==null?void 0:N.call(r,t.data))},j=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${v}
`,z=async t=>{if(t){const{authHeaderConfig:e}=R.getConfig();C(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await k(j,{method:"GET",cache:"force-cache"}).then(e=>q(e)).catch(G)},B=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,P=async({email:t,password:e,translations:d,onErrorCallback:m,handleSetInLineAlertProps:o,apiErrorMessageOverride:f})=>{var M,r,N,O,h;await Q();const a=await k(B,{method:"POST",variables:{email:t,password:e}}).catch(G);if(!((r=(M=a==null?void 0:a.data)==null?void 0:M.generateCustomerToken)!=null&&r.token)){const _=d.customerTokenErrorMessage,u=a!=null&&a.errors?a.errors[0].message:_,$=f??u;return m==null||m(u),o==null||o({type:"error",text:$}),{errorMessage:u,displayErrorMessage:$,userName:"",userEmail:""}}const c=(O=(N=a==null?void 0:a.data)==null?void 0:N.generateCustomerToken)==null?void 0:O.token,i=await z(c),s=i==null?void 0:i.firstName,T=i==null?void 0:i.email;if(!s||!T){const _=d.customerTokenErrorMessage,u=f??_;return m==null||m(_),o==null||o({type:"error",text:u}),{errorMessage:_,displayErrorMessage:u,userName:"",userEmail:""}}const g=await n(),E=F.includes(window.location.hostname)?"":"Secure";return document.cookie=`${w.auth_dropin_firstname}=${s}; path=/; ${g}; ${E};`,document.cookie=`${w.auth_dropin_user_token}=${c}; path=/; ${g}; ${E};`,x(c)?await A():D(),await S(c?i==null?void 0:i.groupUid:void 0),y.emit("authenticated",!!c),H((h=K)==null?void 0:h.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:s,userEmail:T}};export{P as a,z as g};
//# sourceMappingURL=getCustomerToken.js.map
