/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as n}from"./chunks/network-error.js";import{g,r as E,s as T,a as h,b as S}from"./chunks/network-error.js";import{f as _}from"./chunks/fetchUserPermissions.js";import{D as O,S as A,a as R,c as G,g as F,i as b}from"./chunks/isCompanyUser.js";import{c as I,g as v}from"./chunks/getCustomerCompany.js";import{c as M,d as N,a as P,g as Q,b as D,u as w}from"./chunks/updateCompanyTeam.js";import{c as k,d as q,a as z,g as Y,i as j,u as B}from"./chunks/updateCompanyUser.js";import{g as K,u as V}from"./chunks/updateCompany.js";import{g as Z,u as $}from"./chunks/updateCompanyUserStatus.js";import{g as ae,v as re}from"./chunks/validateCompanyEmail.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/company-permissions.js";const y=async(a={})=>({success:!0,config:a}),p=`
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
`,f=async()=>{var a,t,o;try{const r=await n(p,{method:"POST"});if((a=r.errors)!=null&&a.length)return!1;const s=(t=r.data)==null?void 0:t.customer;if(!s)return!1;const m=((o=s.companies)==null?void 0:o.items)??[];if(!Array.isArray(m)||m.length===0)return!1;const e=s.role;return e?e.id==="0"||typeof e.id=="number"&&e.id===0||e.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{O as DEFAULT_COUNTRY,A as STORE_CONFIG_DEFAULTS,R as allowCompanyRegistration,I as companyEnabled,G as createCompany,M as createCompanyTeam,k as createCompanyUser,N as deleteCompanyTeam,q as deleteCompanyUser,n as fetchGraphQl,_ as fetchUserPermissions,K as getCompany,z as getCompanyRoles,P as getCompanyStructure,Q as getCompanyTeam,Y as getCompanyUser,Z as getCompanyUsers,g as getConfig,ae as getCountries,v as getCustomerCompany,F as getStoreConfig,y as initialize,f as isCompanyAdmin,b as isCompanyUser,j as isCompanyUserEmailAvailable,E as removeFetchGraphQlHeader,T as setEndpoint,h as setFetchGraphQlHeader,S as setFetchGraphQlHeaders,V as updateCompany,D as updateCompanyStructure,w as updateCompanyTeam,B as updateCompanyUser,$ as updateCompanyUserStatus,re as validateCompanyEmail};
//# sourceMappingURL=api.js.map
