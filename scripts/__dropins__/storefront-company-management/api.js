/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i}from"./chunks/fetch-graphql.js";import{g as A,r as T,s as R,a as b,b as S}from"./chunks/fetch-graphql.js";import{f as O,g as N,u as I}from"./chunks/updateCompany.js";import{g as L,v as M}from"./chunks/validateCompanyEmail.js";import{D,S as x,c as G,g as F}from"./chunks/createCompany.js";import{c as B,g as Q}from"./chunks/getCustomerCompany.js";import{a as w,i as Y}from"./chunks/isCompanyUser.js";import{g as K,a as W}from"./chunks/getCompanyCreditHistory.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/network-error.js";import"@dropins/tools/event-bus.js";import"./chunks/fetch-error.js";const u=async(e={})=>({success:!0,config:e}),c=`
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
`,y=async()=>{var e,t,a;try{const r=await i(c,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const n=(t=r.data)==null?void 0:t.customer;if(!n)return!1;const s=((a=n.companies)==null?void 0:a.items)??[];if(!Array.isArray(s)||s.length===0)return!1;const o=n.role;return o?o.id==="0"||typeof o.id=="number"&&o.id===0||o.name==="Company Administrator":!1}catch(r){return console.error("Error checking if customer is company admin:",r),!1}};var m=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(m||{});const E=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,g=async()=>{var e,t,a;try{const r=await i(E,{method:"GET",cache:"no-cache"});return(e=r.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((a=(t=r.data)==null?void 0:t.storeConfig)==null?void 0:a.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}};export{m as CompanyCreditOperationType,D as DEFAULT_COUNTRY,x as STORE_CONFIG_DEFAULTS,w as allowCompanyRegistration,g as checkCompanyCreditEnabled,B as companyEnabled,G as createCompany,i as fetchGraphQl,O as fetchUserPermissions,N as getCompany,K as getCompanyCredit,W as getCompanyCreditHistory,A as getConfig,L as getCountries,Q as getCustomerCompany,F as getStoreConfig,u as initialize,y as isCompanyAdmin,Y as isCompanyUser,T as removeFetchGraphQlHeader,R as setEndpoint,b as setFetchGraphQlHeader,S as setFetchGraphQlHeaders,I as updateCompany,M as validateCompanyEmail};
//# sourceMappingURL=api.js.map
