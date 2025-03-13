/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as o}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import{a as c,d as f,C as n}from"./getStoreConfig.js";import"@dropins/tools/recaptcha.js";import{a as h,r as u,f as d,h as g}from"./network-error.js";async function C(t="Authorization",r="Bearer"){const e=c(n.auth_dropin_user_token);!e||(h(t,`${r} ${e}`),!await l())||(f(n.auth_dropin_user_token),u(t),s.emit("authenticated",!1))}const i=new o({init:async t=>{const e={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...t};i.config.setConfig(e),await C(e.authHeaderConfig.header,e.authHeaderConfig.tokenPrefix)},listeners:()=>[]}),A=i.config,m=`
  query VALIDATE_TOKEN {
    customerCart {
      id
    }
  }
`,l=async()=>await d(m).then(t=>{var r;return!!((r=t.errors)!=null&&r.find(e=>{var a;return((a=e.extensions)==null?void 0:a.category)==="graphql-authentication"}))}).catch(g);export{A as c,i,l as v};
