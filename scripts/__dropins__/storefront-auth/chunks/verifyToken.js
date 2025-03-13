/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as c}from"@dropins/tools/lib.js";import{events as u}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{a as h,d,C as i}from"./getStoreConfig.js";import{a as g,f as m,r as C}from"./network-error.js";const a=new c({init:async t=>{const e={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};a.config.setConfig(e),p(e.authHeaderConfig.header,e.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),T=a.config,l=`
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`,p=async(t="Authorization",r="Bearer")=>{const e=h(i.auth_dropin_user_token);if(e)return g(t,`${r} ${e}`),m(l).then(s=>{var n;(n=s.errors)!=null&&n.find(f=>{var o;return((o=f.extensions)==null?void 0:o.category)==="graphql-authentication"})&&(d(i.auth_dropin_user_token),C(t),u.emit("authenticated",!1))})};export{T as c,a as i,p as v};
