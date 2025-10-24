/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as s}from"@dropins/tools/event-bus.js";import{FetchGraphQL as t}from"@dropins/tools/fetch-graphql.js";const n=r=>{const e=r.map(o=>o.message).join(" ");throw Error(e)},h=r=>{const e=r instanceof DOMException&&r.name==="AbortError",o=r.name==="PlaceOrderError";throw!e&&!o&&s.emit("purchase-order/error",{source:"purchase-order",type:"network",error:r.message}),r},{setEndpoint:p,setFetchGraphQlHeader:d,removeFetchGraphQlHeader:i,setFetchGraphQlHeaders:m,fetchGraphQl:E,getConfig:l}=new t().getMethods();export{h as a,d as b,m as c,E as f,l as g,n as h,i as r,p as s};
//# sourceMappingURL=fetch-graphql.js.map
