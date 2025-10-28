/*! Copyright 2025 Adobe
All Rights Reserved. */
<<<<<<< HEAD
import{f as n}from"./chunks/network-error.js";import{g,r as E,s as T,a as h,b as S}from"./chunks/network-error.js";import{f as _}from"./chunks/fetchUserPermissions.js";import{D as O,S as A,a as R,c as G,g as F,i as b}from"./chunks/isCompanyUser.js";import{c as I,g as v}from"./chunks/getCustomerCompany.js";import{c as M,d as N,a as P,g as Q,b as D,u as w}from"./chunks/updateCompanyTeam.js";import{c as k,d as q,a as z,g as Y,i as j,u as B}from"./chunks/updateCompanyUser.js";import{g as K,u as V}from"./chunks/updateCompany.js";import{g as Z,u as $}from"./chunks/updateCompanyUserStatus.js";import{g as ae,v as re}from"./chunks/validateCompanyEmail.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/company-permissions.js";const y=async(a={})=>({success:!0,config:a}),p=`
=======
import{f as m}from"./chunks/fetch-graphql.js";import{g as x,r as I,s as N,a as P,b as U}from"./chunks/fetch-graphql.js";import{f as b}from"./chunks/fetchUserPermissions.js";import{g as H,u as L}from"./chunks/updateCompany.js";import{g as v,v as Q}from"./chunks/validateCompanyEmail.js";import{D as k,S as W,c as Y,g as q}from"./chunks/createCompany.js";import{c as j,g as B}from"./chunks/getCustomerCompany.js";import{a as K,i as V}from"./chunks/isCompanyUser.js";import{G as c,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Z,d as $,a as ee,g as re,i as ae,u as te}from"./chunks/isCompanyRoleNameAvailable.js";import{a as p}from"./chunks/fetch-error.js";import{a as f}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const R=async e=>{try{const a=await m(c,{variables:e,method:"GET",cache:"no-cache"});return l(a)}catch(a){return p(a)}},T=e=>f(e),S=(e,a)=>{const n=new Set(a),o=r=>{var t;const s=((t=r.children)==null?void 0:t.map(o).filter(i=>i!==null))||[];return n.has(r.id)||s.length>0?{...r,children:s}:null};return e.map(o).filter(r=>r!==null)},_=async(e={})=>({success:!0,config:e}),u=`
>>>>>>> mainline/b2b
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
<<<<<<< HEAD
`,f=async()=>{var a,t,o;try{const r=await n(p,{method:"POST"});if((a=r.errors)!=null&&a.length)return!1;const s=(t=r.data)==null?void 0:t.customer;if(!s)return!1;const m=((o=s.companies)==null?void 0:o.items)??[];if(!Array.isArray(m)||m.length===0)return!1;const e=s.role;return e?e.id==="0"||typeof e.id=="number"&&e.id===0||e.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{O as DEFAULT_COUNTRY,A as STORE_CONFIG_DEFAULTS,R as allowCompanyRegistration,I as companyEnabled,G as createCompany,M as createCompanyTeam,k as createCompanyUser,N as deleteCompanyTeam,q as deleteCompanyUser,n as fetchGraphQl,_ as fetchUserPermissions,K as getCompany,z as getCompanyRoles,P as getCompanyStructure,Q as getCompanyTeam,Y as getCompanyUser,Z as getCompanyUsers,g as getConfig,ae as getCountries,v as getCustomerCompany,F as getStoreConfig,y as initialize,f as isCompanyAdmin,b as isCompanyUser,j as isCompanyUserEmailAvailable,E as removeFetchGraphQlHeader,T as setEndpoint,h as setFetchGraphQlHeader,S as setFetchGraphQlHeaders,V as updateCompany,D as updateCompanyStructure,w as updateCompanyTeam,B as updateCompanyUser,$ as updateCompanyUserStatus,re as validateCompanyEmail};
=======
`,A=async()=>{var e,a,n;try{const o=await m(u,{method:"POST"});if((e=o.errors)!=null&&e.length)return!1;const r=(a=o.data)==null?void 0:a.customer;if(!r)return!1;const s=((n=r.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const t=r.role;return t?t.id==="0"||typeof t.id=="number"&&t.id===0||t.name==="Company Administrator":!1}catch(o){return console.error("Error checking if customer is company admin:",o),!1}};export{k as DEFAULT_COUNTRY,W as STORE_CONFIG_DEFAULTS,K as allowCompanyRegistration,S as buildPermissionTree,j as companyEnabled,Y as createCompany,Z as createCompanyRole,$ as deleteCompanyRole,m as fetchGraphQl,b as fetchUserPermissions,T as flattenPermissionIds,H as getCompany,ee as getCompanyAclResources,R as getCompanyRole,re as getCompanyRoles,x as getConfig,v as getCountries,B as getCustomerCompany,q as getStoreConfig,_ as initialize,A as isCompanyAdmin,ae as isCompanyRoleNameAvailable,V as isCompanyUser,I as removeFetchGraphQlHeader,N as setEndpoint,P as setFetchGraphQlHeader,U as setFetchGraphQlHeaders,L as updateCompany,te as updateCompanyRole,Q as validateCompanyEmail};
>>>>>>> mainline/b2b
//# sourceMappingURL=api.js.map
