/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as m,h as c}from"./chunks/network-error.js";import{g as I,r as P,a as G,s as L,b as M}from"./chunks/network-error.js";import{f as D}from"./chunks/fetchUserPermissions.js";import{a as w}from"./chunks/acceptCompanyInvitation.js";import{a as k,i as B}from"./chunks/isCompanyUser.js";import{c as Y,g as q}from"./chunks/getCustomerCompany.js";import{D as W,S as z,c as j,g as J}from"./chunks/createCompany.js";import{c as X,d as Z,g as $,a as ee,u as ae,b as re}from"./chunks/updateCompanyTeam.js";import{c as oe,a as ne,g as se,i as me,u as ie}from"./chunks/updateCompanyUser.js";import{g as pe,u as le}from"./chunks/updateCompany.js";import{a as Ce,g as ue}from"./chunks/getCompanyCreditHistory.js";import{g as fe,u as Ee}from"./chunks/updateCompanyUserStatus.js";import{g as he,v as Re}from"./chunks/validateCompanyEmail.js";import{G as p,t as l}from"./chunks/isCompanyRoleNameAvailable.js";import{c as Ae,d as _e,a as Ue,g as Se,i as be,u as Ne}from"./chunks/isCompanyRoleNameAvailable.js";import{a as d}from"./chunks/company-permissions.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/fetch-error.js";const A=async e=>{try{const a=await m(p,{variables:e,method:"GET",cache:"no-cache"});return l(a)}catch(a){return c(a)}},_=e=>d(e),U=(e,a)=>{const n=new Set(a),r=t=>{var o;const s=((o=t.children)==null?void 0:o.map(r).filter(i=>i!==null))||[];return n.has(t.id)||s.length>0?{...t,children:s}:null};return e.map(r).filter(t=>t!==null)},S=async(e={})=>({success:!0,config:e}),C=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,b=async()=>{var e,a,n;try{const r=await m(C,{method:"GET",cache:"no-cache"});return(e=r.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((n=(a=r.data)==null?void 0:a.storeConfig)==null?void 0:n.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};var u=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(u||{});const y=`
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
`,N=async()=>{var e,a,n;try{const r=await m(y,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const t=(a=r.data)==null?void 0:a.customer;if(!t)return!1;const s=((n=t.companies)==null?void 0:n.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=t.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};export{u as CompanyCreditOperationType,W as DEFAULT_COUNTRY,z as STORE_CONFIG_DEFAULTS,w as acceptCompanyInvitation,k as allowCompanyRegistration,U as buildPermissionTree,b as checkCompanyCreditEnabled,Y as companyEnabled,j as createCompany,Ae as createCompanyRole,X as createCompanyTeam,oe as createCompanyUser,_e as deleteCompanyRole,Z as deleteCompanyTeam,ne as deleteCompanyUser,m as fetchGraphQl,D as fetchUserPermissions,_ as flattenPermissionIds,pe as getCompany,Ue as getCompanyAclResources,Ce as getCompanyCredit,ue as getCompanyCreditHistory,A as getCompanyRole,Se as getCompanyRoles,$ as getCompanyStructure,ee as getCompanyTeam,se as getCompanyUser,fe as getCompanyUsers,I as getConfig,he as getCountries,q as getCustomerCompany,J as getStoreConfig,S as initialize,N as isCompanyAdmin,be as isCompanyRoleNameAvailable,B as isCompanyUser,me as isCompanyUserEmailAvailable,P as removeFetchGraphQlHeader,G as setEndpoint,L as setFetchGraphQlHeader,M as setFetchGraphQlHeaders,le as updateCompany,Ne as updateCompanyRole,ae as updateCompanyStructure,re as updateCompanyTeam,ie as updateCompanyUser,Ee as updateCompanyUserStatus,Re as validateCompanyEmail};
//# sourceMappingURL=api.js.map
