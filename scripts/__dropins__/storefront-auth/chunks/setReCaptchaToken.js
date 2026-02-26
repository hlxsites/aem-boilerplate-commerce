/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as e}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as a}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as r}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:p,setFetchGraphQlHeader:o,removeFetchGraphQlHeader:i,setFetchGraphQlHeaders:f,fetchGraphQl:m,getConfig:d}=new r().getMethods(),E=t=>{throw t instanceof DOMException&&t.name==="AbortError"||e.emit("auth/error",{source:"auth",type:"network",error:t}),t},l=async()=>{const t=await a();t&&o("X-ReCaptcha",t)};export{o as a,f as b,l as c,m as f,d as g,E as h,i as r,p as s};
//# sourceMappingURL=setReCaptchaToken.js.map
