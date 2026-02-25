/*! Copyright 2026 Adobe
All Rights Reserved. */
import{D as I,S as P,c as G,g as L}from"./chunks/createCompany.js";import{a as H}from"./chunks/acceptCompanyInvitation.js";import{a as v,i as w}from"./chunks/isCompanyUser.js";import{f as c}from"./chunks/company-permissions.js";import{f as m,h as p}from"./chunks/network-error.js";import{g as k,r as B,s as Q,a as Y,b as q}from"./chunks/network-error.js";import{c as W,g as z}from"./chunks/getCustomerCompany.js";import{G as l,t as d}from"./chunks/isCompanyRoleNameAvailable.js";import{c as J,d as V,a as X,g as Z,i as $,u as ee}from"./chunks/isCompanyRoleNameAvailable.js";import{c as re,d as te,a as oe,g as ne,b as se,u as me}from"./chunks/updateCompanyTeam.js";import{c as ce,g as pe,i as le,a as de,u as Ce}from"./chunks/updateCompanyUserStatus.js";import{d as fe,g as ye}from"./chunks/getCompanyUsers.js";import{f as ge}from"./chunks/fetchUserPermissions.js";import{g as Re,u as Te}from"./chunks/updateCompany.js";import{a as _e,g as Ue}from"./chunks/getCompanyCreditHistory.js";import{g as be,v as Ne}from"./chunks/validateCompanyEmail.js";import"./chunks/fetch-error.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const A=async e=>{try{const a=await m(l,{variables:e,method:"GET",cache:"no-cache"});return d(a)}catch(a){return p(a)}},_=e=>c(e),U=(e,a)=>{const n=new Set(a),r=t=>{var o;const s=((o=t.children)==null?void 0:o.map(r).filter(i=>i!==null))||[];return n.has(t.id)||s.length>0?{...t,children:s}:null};return e.map(r).filter(t=>t!==null)},S=async(e={})=>({success:!0,config:e}),C=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,b=async()=>{var e,a,n;try{const r=await m(C,{method:"GET",cache:"no-cache"});return(e=r.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((n=(a=r.data)==null?void 0:a.storeConfig)==null?void 0:n.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};var u=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(u||{});const f=`
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
`,N=async()=>{var e,a,n;try{const r=await m(f,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const t=(a=r.data)==null?void 0:a.customer;if(!t)return!1;const s=((n=t.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=t.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{u as CompanyCreditOperationType,I as DEFAULT_COUNTRY,P as STORE_CONFIG_DEFAULTS,H as acceptCompanyInvitation,v as allowCompanyRegistration,U as buildPermissionTree,b as checkCompanyCreditEnabled,W as companyEnabled,G as createCompany,J as createCompanyRole,re as createCompanyTeam,ce as createCompanyUser,V as deleteCompanyRole,te as deleteCompanyTeam,fe as deleteCompanyUser,m as fetchGraphQl,ge as fetchUserPermissions,_ as flattenPermissionIds,Re as getCompany,X as getCompanyAclResources,_e as getCompanyCredit,Ue as getCompanyCreditHistory,A as getCompanyRole,Z as getCompanyRoles,oe as getCompanyStructure,ne as getCompanyTeam,pe as getCompanyUser,ye as getCompanyUsers,k as getConfig,be as getCountries,z as getCustomerCompany,L as getStoreConfig,S as initialize,N as isCompanyAdmin,$ as isCompanyRoleNameAvailable,w as isCompanyUser,le as isCompanyUserEmailAvailable,B as removeFetchGraphQlHeader,Q as setEndpoint,Y as setFetchGraphQlHeader,q as setFetchGraphQlHeaders,Te as updateCompany,ee as updateCompanyRole,se as updateCompanyStructure,me as updateCompanyTeam,de as updateCompanyUser,Ce as updateCompanyUserStatus,Ne as validateCompanyEmail};
//# sourceMappingURL=api.js.map
