/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as c,a as d}from"./network-error.js";import{a as l}from"./getCountries.js";const g=`
  query GET_ALLOW_COMPANY_REGISTRATION {
    storeConfig {
      allow_company_registration
    }
  }
`,E=async()=>{var t,r,o;const e=await s(g,{method:"POST"});if((t=e==null?void 0:e.errors)!=null&&t.length)throw new Error(((r=e.errors[0])==null?void 0:r.message)||"Failed to load store configuration");const n=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig;if(!n)throw new Error("Invalid response: missing storeConfig");return!!n.allow_company_registration},u=`
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
`,m=e=>{var t;const n={};if(e.regionCode&&e.regionCode.trim())n.region_code=e.regionCode.trim(),e.regionId&&(n.region_id=typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId);else if(e.region&&typeof e.region=="string"&&e.region.includes(",")){const[r,o]=e.region.split(",");n.region_code=r.trim(),n.region_id=parseInt(o.trim(),10)}else if(e.region&&e.region.trim()){const r=e.region.trim();if(/^\d+$/.test(r))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");n.region=r,n.region_code=r}if(!n.region_code)throw new Error("Region code is required. Please select a state/province or enter a region name.");return{company_name:e.companyName,company_email:e.companyEmail,legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(r=>r&&r.trim()!==""):[e.street].filter(r=>r&&r.trim()!==""),city:e.city,region:n,postcode:e.postcode,country_id:e.countryCode,telephone:e.addressTelephone},company_admin:{email:e.adminEmail,firstname:e.adminFirstname,lastname:e.adminLastname,job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((t=e.adminCustomAttributes)==null?void 0:t.map(r=>({attribute_code:r.attribute_code,value:r.value})))||[]}}},I=async e=>{var n;try{const t=m(e),r=await s(u,{method:"POST",variables:{input:t}});return(n=r.errors)!=null&&n.length?{success:!1,errors:r.errors.map(i=>i.message)}:{success:!0,company:l(r)}}catch(t){return console.error("Failed to create company:",t),{success:!1,errors:["Failed to create company. Please try again."]}}},_=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,y="US",a={defaultCountry:y,storeCode:""},O=async()=>await s(_,{method:"GET"}).then(e=>{var n;return(n=e.errors)!=null&&n.length?c(e.errors):p(e)}).catch(d),p=e=>{var r;if(!((r=e==null?void 0:e.data)!=null&&r.storeConfig))return a;const{default_country:n,store_code:t}=e.data.storeConfig;return{defaultCountry:n||a.defaultCountry,storeCode:t||a.storeCode}},C=`
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
`,A=async()=>{var e,n,t,r;try{const o=await s(C,{method:"POST"});if((e=o.errors)!=null&&e.length)return!1;const i=((r=(t=(n=o==null?void 0:o.data)==null?void 0:n.customer)==null?void 0:t.companies)==null?void 0:r.items)??[];return Array.isArray(i)&&i.length>0}catch{return!1}};export{y as D,a as S,E as a,I as c,O as g,A as i};
//# sourceMappingURL=isCompanyUser.js.map
