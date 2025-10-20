/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as l}from"./network-error.js";import{h as m}from"./fetch-error.js";import{f as i}from"./fetch-graphql.js";const d=o=>{var a,e,c;const r=(a=o==null?void 0:o.data)==null?void 0:a.customer,n=(e=o==null?void 0:o.data)==null?void 0:e.company;if(!r||!n)return null;const t={companyName:(n==null?void 0:n.name)??"",jobTitle:(r==null?void 0:r.job_title)??"",workPhoneNumber:(r==null?void 0:r.telephone)??"",userRole:((c=r==null?void 0:r.role)==null?void 0:c.name)??""};return t.companyName?t:null},h=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,f=async()=>{var n,t,a;const o=await i(h,{method:"POST"});if((n=o==null?void 0:o.errors)!=null&&n.length)throw new Error(((t=o.errors[0])==null?void 0:t.message)||"Failed to load store configuration");const r=(a=o==null?void 0:o.data)==null?void 0:a.storeConfig;if(!r)throw new Error("Invalid response: missing storeConfig");return!!r.company_enabled},E=`
  query GET_CUSTOMER_COMPANY_INFO {
    customer {
      id
      job_title
      telephone
      role {
        id
        name
      }
    }
    company {
      id
      name
    }
  }
`,C=async()=>{var o;try{if(!await f())return null;const n=await i(E,{method:"GET",cache:"no-cache"});return(o=n.errors)!=null&&o.length?m(n.errors):d(n)}catch(r){return console.error("Failed to fetch customer company info:",r),l(r)}};export{f as c,C as g};
//# sourceMappingURL=getCustomerCompany.js.map
