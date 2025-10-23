/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as d,c as l}from"./network-error.js";import{t as g}from"./validateCompanyEmail.js";const m=`
  query GET_ALLOW_COMPANY_REGISTRATION {
    storeConfig {
      allow_company_registration
    }
  }
`,I=async()=>{var o,t,i;const e=await s(m,{method:"POST"});if((o=e==null?void 0:e.errors)!=null&&o.length)throw new Error(((t=e.errors[0])==null?void 0:t.message)||"Failed to load store configuration");const r=(i=e==null?void 0:e.data)==null?void 0:i.storeConfig;if(!r)throw new Error("Invalid response: missing storeConfig");return!!r.allow_company_registration},u=`
  mutation CreateCompany($input: CompanyCreateInput!) {
    createCompany(input: $input) {
      company {
        id
        name
        email
        legal_name
        vat_tax_id
        reseller_id
        legal_address {
          street
          city
          region {
            region_code
            region
            region_id
          }
          postcode
          country_code
          telephone
        }
        company_admin {
          id
          firstname
          lastname
          email
          job_title
          telephone
        }
      }
    }
  }
`,_=e=>{var o,t,i;const r={};if(e.regionCode&&e.regionCode.trim())r.region_code=e.regionCode.trim(),e.regionId&&(r.region_id=typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId);else if(e.region&&typeof e.region=="string"&&e.region.includes(",")){const[n,c]=e.region.split(",");r.region_code=n.trim(),r.region_id=parseInt(c.trim(),10)}else if(e.region&&e.region.trim()){const n=e.region.trim();if(/^\d+$/.test(n))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");r.region=n,r.region_code=n}if(!r.region_code)throw new Error("Region code is required. Please select a state/province or enter a region name.");return{company_name:e.companyName,company_email:e.companyEmail,legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(n=>n&&n.trim()!==""):[e.street].filter(n=>n&&n.trim()!==""),city:e.city,region:r,postcode:e.postcode,country_id:e.countryCode,telephone:e.addressTelephone},company_admin:{email:e.adminEmail,firstname:((o=e.adminFirstname)==null?void 0:o.trim())||"",lastname:((t=e.adminLastname)==null?void 0:t.trim())||"",job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((i=e.adminCustomAttributes)==null?void 0:i.map(n=>({attribute_code:n.attribute_code,value:n.value})))||[]}}},O=async e=>{var r;try{const o=_(e),t=await s(u,{method:"POST",variables:{input:o}});return(r=t.errors)!=null&&r.length?{success:!1,errors:t.errors.map(n=>n.message)}:{success:!0,company:g(t)}}catch(o){return console.error("Failed to create company:",o),{success:!1,errors:["Failed to create company. Please try again."]}}},y=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,p="US",a={defaultCountry:p,storeCode:""},A=async()=>await s(y,{method:"GET"}).then(e=>{var r;return(r=e.errors)!=null&&r.length?d(e.errors):C(e)}).catch(l),C=e=>{var t;if(!((t=e==null?void 0:e.data)!=null&&t.storeConfig))return a;const{default_country:r,store_code:o}=e.data.storeConfig;return{defaultCountry:r||a.defaultCountry,storeCode:o||a.storeCode}},h=`
  query GET_CUSTOMER_COMPANIES {
    customer {
      companies(input: {}) {
        items {
          id
          name
        }
      }
    }
  }
`,S=async()=>{var e,r,o,t;try{const i=await s(h,{method:"POST"});if((e=i.errors)!=null&&e.length)return!1;const n=((t=(o=(r=i==null?void 0:i.data)==null?void 0:r.customer)==null?void 0:o.companies)==null?void 0:t.items)??[];return Array.isArray(n)&&n.length>0}catch{return!1}};export{p as D,a as S,I as a,O as c,A as g,S as i};
//# sourceMappingURL=isCompanyUser.js.map
