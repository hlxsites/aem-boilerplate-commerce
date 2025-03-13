/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as c}from"@dropins/tools/lib.js";import{events as h}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{a as u,d,C as n}from"./getStoreConfig.js";import{a as g,f as m,r as C}from"./network-error.js";const a=new c({init:async t=>{const e={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};a.config.setConfig(e),p(e.authHeaderConfig.header,e.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),T=a.config,l=`
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`,p=(t="Authorization",o="Bearer")=>{const e=u(n.auth_dropin_user_token);e&&(g(t,`${o} ${e}`),m(l).then(s=>{var r;(r=s.errors)!=null&&r.find(f=>{var i;return((i=f.extensions)==null?void 0:i.category)==="graphql-authentication"})&&(d(n.auth_dropin_user_token),C(t),h.emit("authenticated",!1))}))};export{T as c,a as i,p as v};
