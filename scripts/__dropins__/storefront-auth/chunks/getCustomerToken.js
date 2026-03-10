/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as y,f as R,h as G}from"./network-error.js";import"@dropins/tools/recaptcha.js";import{events as C}from"@dropins/tools/event-bus.js";import{merge as S}from"@dropins/tools/lib.js";import{c as n,f as k,h as U,C as O,d as x,e as F,L as v}from"./getAdobeCommerceOptimizerData.js";import{CUSTOMER_INFORMATION_FRAGMENT as A}from"../fragments.js";import{p as D,E as H}from"./acdl.js";import{s as K}from"./setReCaptchaToken.js";const Q=t=>{var f,o,e,T,a,c,i,r,_,s,d,h,E,M,u,N;const m={email:((o=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:o.email)??"",firstName:((T=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:T.firstname)??"",lastName:((c=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:c.lastname)??"",groupUid:((_=(r=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:r.group)==null?void 0:_.uid)??"",allowRemoteShoppingAssistance:(d=(s=t==null?void 0:t.data)==null?void 0:s.customer)==null?void 0:d.allow_remote_shopping_assistance};return S(m,(N=(u=(M=(E=(h=n)==null?void 0:h.getConfig())==null?void 0:E.models)==null?void 0:M.CustomerModel)==null?void 0:u.transformer)==null?void 0:N.call(u,t.data))},q=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${A}
`,j=async t=>{if(t){const{authHeaderConfig:m}=n.getConfig();y(m.header,m.tokenPrefix?`${m.tokenPrefix} ${t}`:t)}return await R(q,{method:"GET",cache:"force-cache"}).then(m=>Q(m)).catch(G)},z=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,L=async({email:t,password:m,translations:f,onErrorCallback:o,handleSetInLineAlertProps:e,apiErrorMessageOverride:T})=>{var h,E,M,u,N;await K();const a=await R(z,{method:"POST",variables:{email:t,password:m}}).catch(G);if(!((E=(h=a==null?void 0:a.data)==null?void 0:h.generateCustomerToken)!=null&&E.token)){const $=f.customerTokenErrorMessage,g=a!=null&&a.errors?a.errors[0].message:$,w=T??g;return o==null||o(g),e==null||e({type:"error",text:w}),{errorMessage:g,displayErrorMessage:w,userName:"",userEmail:""}}const c=(u=(M=a==null?void 0:a.data)==null?void 0:M.generateCustomerToken)==null?void 0:u.token;k(c);const i=await j(c),r=i==null?void 0:i.firstName,_=i==null?void 0:i.email;if(!r||!_){const $=f.customerTokenErrorMessage,g=T??$;return o==null||o($),e==null||e({type:"error",text:g}),{errorMessage:$,displayErrorMessage:g,userName:"",userEmail:""}}const s=await U(),d=v.includes(window.location.hostname)?"":"Secure";return document.cookie=`${O.auth_dropin_firstname}=${r}; path=/; ${s}; ${d};`,document.cookie=`${O.auth_dropin_user_token}=${c}; path=/; ${s}; ${d};`,k(c)?document.cookie=`${O.auth_dropin_admin_session}=true; path=/; ${s}; SameSite=Lax; ${d};`:x(O.auth_dropin_admin_session),await F(c?i==null?void 0:i.groupUid:void 0),C.emit("authenticated",!!c),D((N=H)==null?void 0:N.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:r,userEmail:_}};export{L as a,j as g};
//# sourceMappingURL=getCustomerToken.js.map
