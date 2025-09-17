/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as n}from"@dropins/tools/lib.js";import{FetchGraphQL as o}from"@dropins/tools/fetch-graphql.js";const e=new n({init:async t=>{const i={};e.config.setConfig({...i,...t})},listeners:()=>[]}),s=e.config,{setEndpoint:a,setFetchGraphQlHeader:h,removeFetchGraphQlHeader:f,setFetchGraphQlHeaders:p,fetchGraphQl:g,getConfig:l}=new o().getMethods();export{s as config,g as fetchGraphQl,l as getConfig,e as initialize,f as removeFetchGraphQlHeader,a as setEndpoint,h as setFetchGraphQlHeader,p as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
