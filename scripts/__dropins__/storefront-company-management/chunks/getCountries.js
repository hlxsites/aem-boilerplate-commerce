/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as c,c as _,h as g}from"./fetch-error.js";const E=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          children {
            id
            children {
              id
              children {
                id
                children { id }
              }
            }
          }
        }
      }
      status
    }
  }
`,A=(e=[])=>{const a=new Set,t=[...e];for(;t.length;){const n=t.pop();if(n&&(typeof n.id=="string"&&a.add(n.id),Array.isArray(n.children)&&n.children.length))for(const r of n.children)t.push(r)}return a},p=e=>(e==null?void 0:e.id)==="0"||typeof(e==null?void 0:e.id)=="number"&&(e==null?void 0:e.id)===0||(e==null?void 0:e.name)==="Company Administrator",v=e=>{const a=A((e==null?void 0:e.permissions)||[]),t=p(e);return{canViewAccount:t||a.has("Magento_Company::view_account"),canEditAccount:t||a.has("Magento_Company::edit_account"),canViewAddress:t||a.has("Magento_Company::view_address"),canEditAddress:t||a.has("Magento_Company::edit_address"),canViewContacts:t||a.has("Magento_Company::contacts"),canViewPaymentInformation:t||a.has("Magento_Company::payment_information"),canViewShippingInformation:t||a.has("Magento_Company::shipping_information")}},h=async()=>await c(E,{method:"GET",cache:"no-cache"}).then(e=>{var r,d,o;if((r=e.errors)!=null&&r.length)return _(e.errors);const a=(o=(d=e==null?void 0:e.data)==null?void 0:d.customer)==null?void 0:o.role,t=A((a==null?void 0:a.permissions)||[]);return p(a)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information"].forEach(s=>t.add(s)),{allowedIds:t,roleResponse:e}}).catch(g),M=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,G=async e=>{try{const a=await c(M,{variables:{email:e}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},u=e=>{var s;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const a="updateCompany"in e.data?(s=e.data.updateCompany)==null?void 0:s.company:e.data.company;if(!a)throw new Error("Invalid response: missing company data");const t="customer"in e.data?e.data.customer:void 0,n=a.legal_address?{street:Array.isArray(a.legal_address.street)?a.legal_address.street.filter(i=>i&&i.trim()!==""):[],city:(a.legal_address.city||"").trim(),region:a.legal_address.region?{region:(a.legal_address.region.region||"").trim(),regionCode:(a.legal_address.region.region_code||"").trim(),regionId:a.legal_address.region.region_id?Number(a.legal_address.region.region_id):0}:void 0,countryCode:(a.legal_address.country_code||"").toUpperCase().trim(),postcode:(a.legal_address.postcode||"").trim(),telephone:a.legal_address.telephone?a.legal_address.telephone.trim():void 0}:void 0,r=t==null?void 0:t.role,d=v(r),o={id:(a.id||"").toString(),name:(a.name||"").trim(),email:(a.email||"").trim().toLowerCase(),legalName:a.legal_name?a.legal_name.trim():void 0,vatTaxId:a.vat_tax_id?a.vat_tax_id.trim():void 0,resellerId:a.reseller_id?a.reseller_id.trim():void 0,legalAddress:n,companyAdmin:a.company_admin?{id:(a.company_admin.id||"").toString(),firstname:(a.company_admin.firstname||"").trim(),lastname:(a.company_admin.lastname||"").trim(),email:(a.company_admin.email||"").trim().toLowerCase(),jobTitle:a.company_admin.job_title?a.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:a.sales_representative?{firstname:(a.sales_representative.firstname||"").trim(),lastname:(a.sales_representative.lastname||"").trim(),email:(a.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(a.available_payment_methods)?a.available_payment_methods.filter(i=>i&&typeof i.code=="string"&&typeof i.title=="string").map(i=>({code:i.code.trim(),title:i.title.trim()})).filter(i=>i.code.length>0&&i.title.length>0):void 0,availableShippingMethods:Array.isArray(a.available_shipping_methods)?a.available_shipping_methods.filter(i=>i&&typeof i.code=="string"&&typeof i.title=="string").map(i=>({code:i.code.trim(),title:i.title.trim()})).filter(i=>i.code.length>0&&i.title.length>0):void 0,canEditAccount:d.canEditAccount,canEditAddress:d.canEditAddress,permissionsFlags:d,customerRole:r,customerStatus:t==null?void 0:t.status};if(d.canViewAccount){if(!o.id)throw new Error("Company ID is required");if(!o.name)throw new Error("Company name is required");if(!o.email)throw new Error("Company email is required")}return o},N=e=>{var o,s;if(!((s=(o=e==null?void 0:e.data)==null?void 0:o.countries)!=null&&s.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:a,storeConfig:t}=e.data,n=t==null?void 0:t.countries_with_required_region.split(","),r=t==null?void 0:t.optional_zip_countries.split(",");return{availableCountries:a.filter(({two_letter_abbreviation:i,full_name_locale:m})=>!!(i&&m)).map(i=>{const{two_letter_abbreviation:m,full_name_locale:l,available_regions:y}=i,f=Array.isArray(y)&&y.length>0;return{value:m,text:l,availableRegions:f?y:void 0}}).sort((i,m)=>i.text.localeCompare(m.text)),countriesWithRequiredRegion:n,optionalZipCountries:r}},b=`
  fragment COMPANY_LEGAL_ADDRESS_FRAGMENT on CompanyLegalAddress {
    street
    city
    region {
      region
      region_code
      region_id
    }
    country_code
    postcode
    telephone
  }
`,I=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,S=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,w=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    firstname
    lastname
    email
    job_title
  }
`,C=e=>{const a=e.has("Magento_Company::view_account"),t=e.has("Magento_Company::view_address"),n=e.has("Magento_Company::contacts"),r=e.has("Magento_Company::payment_information"),d=e.has("Magento_Company::shipping_information"),o=[],s=[];return a&&(o.push("...COMPANY_BASIC_INFO_FRAGMENT"),s.push(I)),t&&(o.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),s.push(b)),n&&(o.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),o.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),s.push(w),s.push(S)),r&&o.push("available_payment_methods { code title }"),d&&o.push("available_shipping_methods { code title }"),{fields:o,usedFragments:s}},T=e=>{const{fields:a,usedFragments:t}=C(e);return a.length===0?`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `:`${`
    query GET_COMPANY_DYNAMIC {
      company {
        ${a.join(`
        `)}
      }
    }
  `}
${t.join(`
`)}`},O=e=>{const{fields:a,usedFragments:t}=C(e);return a.length===0?`
      mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
        updateCompany(input: $input) {
          company { __typename }
        }
      }
    `:`${`
    mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
      updateCompany(input: $input) {
        company {
          ${a.join(`
          `)}
        }
      }
    }
  `}
${t.join(`
`)}`},F=async()=>await h().then(async({allowedIds:e,roleResponse:a})=>{var o,s,i;const t=T(e),n=await c(t,{method:"GET",cache:"no-cache"});if((o=n.errors)!=null&&o.length)return _(n.errors);const r=(s=n==null?void 0:n.data)==null?void 0:s.company;return r&&Object.keys(r).some(m=>m!=="__typename")?(n.data.customer=(i=a==null?void 0:a.data)==null?void 0:i.customer,u(n)):null}).catch(g),R=async e=>await h().then(async({allowedIds:a,roleResponse:t})=>{var o,s;const n=O(a),r={};if(e.name!==void 0&&(r.company_name=e.name),e.email!==void 0&&(r.company_email=e.email),e.legalName!==void 0&&(r.legal_name=e.legalName),e.vatTaxId!==void 0&&(r.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(r.reseller_id=e.resellerId),e.legalAddress!==void 0&&a.has("Magento_Company::edit_address")){let i;Array.isArray(e.legalAddress.street)?(i=[...e.legalAddress.street],e.legalAddress.street2&&i.push(e.legalAddress.street2)):i=[e.legalAddress.street,e.legalAddress.street2].filter(l=>typeof l=="string"&&l.trim().length>0),i=i.filter(l=>l&&typeof l=="string"&&l.trim().length>0);let m;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const l=e.legalAddress.region;l.region===l.regionCode?m={region:l.region,region_code:l.regionCode,region_id:0}:m={region:l.region,region_code:l.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?m={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(m={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});r.legal_address={street:i,city:e.legalAddress.city,region:m,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const d=await c(n,{method:"POST",variables:{input:r}});return(o=d.errors)!=null&&o.length?_(d.errors):(d.data.customer=(s=t==null?void 0:t.data)==null?void 0:s.customer,u(d))}).catch(g),P=`
  query getCountries {
    countries {
      id
      two_letter_abbreviation
      three_letter_abbreviation
      full_name_locale
      full_name_english
      available_regions {
        id
        code
        name
      }
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`,D=async()=>{const e="_company_countries",a=sessionStorage.getItem(e);return a?JSON.parse(a):await c(P,{method:"GET"}).then(t=>{var r;if((r=t.errors)!=null&&r.length)return _(t.errors);const n=N(t);return sessionStorage.setItem(e,JSON.stringify(n)),n}).catch(g)};export{F as a,h as f,D as g,R as u,G as v};
//# sourceMappingURL=getCountries.js.map
