/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as o}from"@dropins/tools/fetch-graphql.js";import{events as s}from"@dropins/tools/event-bus.js";const{setEndpoint:h,setFetchGraphQlHeader:c,removeFetchGraphQlHeader:p,setFetchGraphQlHeaders:i,fetchGraphQl:m,getConfig:E}=new o().getMethods(),d=r=>{const e=r.map(t=>t.message).join(" ");throw Error(e)},f=r=>{throw r instanceof DOMException&&r.name==="AbortError"||s.emit("error",{source:"company",type:"network",error:r}),r};export{f as a,c as b,i as c,m as f,E as g,d as h,p as r,h as s};
//# sourceMappingURL=network-error.js.map
