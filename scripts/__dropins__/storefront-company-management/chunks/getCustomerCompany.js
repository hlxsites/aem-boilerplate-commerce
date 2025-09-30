/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as l,h as m,c as i}from"./fetch-error.js";import{v as y}from"./validateCompanyEmail.js";const h=async()=>{try{return await y("test@test.com"),{companyEnabled:!0}}catch{return{companyEnabled:!1,error:"Company functionality not available"}}},u=t=>{var o,e,c;const a=(o=t==null?void 0:t.data)==null?void 0:o.customer,n=(e=t==null?void 0:t.data)==null?void 0:e.company;if(!a||!n)return null;const r={companyName:(n==null?void 0:n.name)??"",jobTitle:(a==null?void 0:a.job_title)??"",workPhoneNumber:(a==null?void 0:a.telephone)??"",userRole:((c=a==null?void 0:a.role)==null?void 0:c.name)??""};return r.companyName?r:null},d=`
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
`;async function p(){var t;try{if(!(await h()).companyEnabled)return null;const n=await l(d,{method:"GET",cache:"no-cache"});return(t=n.errors)!=null&&t.length?m(n.errors):u(n)}catch(a){return i(a)}}export{h as c,p as g};
//# sourceMappingURL=getCustomerCompany.js.map
