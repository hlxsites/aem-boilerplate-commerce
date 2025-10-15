/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m}from"./chunks/network-error.js";import{g as T,r as S,s as U,b as _,c as x}from"./chunks/network-error.js";import{f as b}from"./chunks/fetchUserPermissions.js";import{D as R,S as G,a as F,c as I,g as v,i as H}from"./chunks/isCompanyUser.js";import{v as p}from"./chunks/getCountries.js";import{g as M}from"./chunks/getCountries.js";import{c as P,g as Q}from"./chunks/getCustomerCompany.js";import{c as D,d as k,g as W,a as q,u as z,b as Y}from"./chunks/updateCompanyTeam.js";import{c as B,d as J,a as K,g as V,i as X,u as Z}from"./chunks/updateCompanyUser.js";import{g as ee,u as ae}from"./chunks/updateCompany.js";import{g as te,u as oe}from"./chunks/updateCompanyUserStatus.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/company-permissions.js";const f=async(e={})=>({success:!0,config:e}),d=async()=>{try{return await p("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}},i=`
  query GET_CUSTOMER_COMPANIES_WITH_ROLES {
    customer {
      companies(input: {}) {
        items {
          id
          name
        }
      }
      role {
        id
        name
      }
    }
  }
`,g=async()=>{var e,o,s;try{const r=await m(i,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const t=(o=r.data)==null?void 0:o.customer;if(!t)return!1;const n=((s=t.companies)==null?void 0:s.items)??[];if(!Array.isArray(n)||n.length===0)return!1;const a=t.role;return a?a.id==="0"||typeof a.id=="number"&&a.id===0||a.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{R as DEFAULT_COUNTRY,G as STORE_CONFIG_DEFAULTS,F as allowCompanyRegistration,d as checkIsCompanyEnabled,P as companyEnabled,I as createCompany,D as createCompanyTeam,B as createCompanyUser,k as deleteCompanyTeam,J as deleteCompanyUser,m as fetchGraphQl,b as fetchUserPermissions,ee as getCompany,K as getCompanyRoles,W as getCompanyStructure,q as getCompanyTeam,V as getCompanyUser,te as getCompanyUsers,T as getConfig,M as getCountries,Q as getCustomerCompany,v as getStoreConfig,f as initialize,g as isCompanyAdmin,H as isCompanyUser,X as isCompanyUserEmailAvailable,S as removeFetchGraphQlHeader,U as setEndpoint,_ as setFetchGraphQlHeader,x as setFetchGraphQlHeaders,ae as updateCompany,z as updateCompanyStructure,Y as updateCompanyTeam,Z as updateCompanyUser,oe as updateCompanyUserStatus,p as validateCompanyEmail};
//# sourceMappingURL=api.js.map
