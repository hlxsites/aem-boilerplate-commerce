/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as l}from"./fetchUserPermissions.js";import{f as C,h as f}from"./network-error.js";import{h as y}from"./fetch-error.js";import{i as u}from"./company-permissions.js";import{a as h}from"./validateCompanyEmail.js";const p=`
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
`,M=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,E=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,P=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,N=(e,t=!1)=>{const a=e.has("Magento_Company::view_account"),d=e.has("Magento_Company::view_address"),r=e.has("Magento_Company::contacts"),o=e.has("Magento_Company::payment_information"),_=e.has("Magento_Company::shipping_information"),n=[],s=[];return a&&(n.push("...COMPANY_BASIC_INFO_FRAGMENT"),s.push(M)),d&&(n.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),s.push(p)),r&&(n.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),n.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),s.push(P),s.push(E)),o&&n.push("available_payment_methods { code title }"),_&&n.push("available_shipping_methods { code title }"),t&&(n.push("address_book_enabled"),n.push("custom_shipping_address_enabled")),{fields:n,usedFragments:s}},I=(e,t=!1)=>{const{fields:a,usedFragments:d}=N(e,t);return a.length===0?`
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
${d.join(`
`)}`},T=(e,t=!1)=>{const{fields:a,usedFragments:d}=N(e,t);return a.length===0?`
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
${d.join(`
`)}`},O=(e,t=!1)=>{const{fields:a,usedFragments:d}=N(e,t);return a.length===0?`
      mutation UPDATE_COMPANY_CONFIG_DYNAMIC($input: UpdateCompanyConfigInput!) {
        updateCompanyConfig(input: $input) {
          company { __typename }
        }
      }
    `:`${`
    mutation UPDATE_COMPANY_CONFIG_DYNAMIC($input: UpdateCompanyConfigInput!) {
      updateCompanyConfig(input: $input) {
        company {
          ${a.join(`
          `)}
        }
      }
    }
  `}
${d.join(`
`)}`};async function b(){return await l().then(async({allowedIds:e,roleResponse:t})=>{var n,s,c,g,m;const a=u((s=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:s.role),d=I(e,a),r=await C(d,{method:"GET",cache:"no-cache"});if((c=r.errors)!=null&&c.length)return y(r.errors);const o=(g=r==null?void 0:r.data)==null?void 0:g.company;return o&&Object.keys(o).some(A=>A!=="__typename")?(r!=null&&r.data&&((m=t==null?void 0:t.data)!=null&&m.customer)&&(r.data.customer=t.data.customer),h(r)):null}).catch(f)}const v=async e=>await l().then(async({allowedIds:t,roleResponse:a})=>{var n,s,c,g;const d=u((s=(n=a==null?void 0:a.data)==null?void 0:n.customer)==null?void 0:s.role),r=T(t,d),o={};if(e.name!==void 0&&(o.company_name=e.name),e.email!==void 0&&(o.company_email=e.email),e.legalName!==void 0&&(o.legal_name=e.legalName),e.vatTaxId!==void 0&&(o.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(o.reseller_id=e.resellerId),e.legalAddress!==void 0&&t.has("Magento_Company::edit_address")){let m;Array.isArray(e.legalAddress.street)?(m=[...e.legalAddress.street],e.legalAddress.street2&&m.push(e.legalAddress.street2)):m=[e.legalAddress.street,e.legalAddress.street2].filter(i=>typeof i=="string"&&i.trim().length>0),m=m.filter(i=>i&&typeof i=="string"&&i.trim().length>0);let A;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const i=e.legalAddress.region;i.region===i.regionCode?A={region:i.region,region_code:i.regionCode,region_id:0}:A={region:i.region,region_code:i.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?A={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(A={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});o.legal_address={street:m,city:e.legalAddress.city,region:A,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const _=await C(r,{method:"POST",variables:{input:o}});return(c=_.errors)!=null&&c.length?y(_.errors):(_.data.customer=(g=a==null?void 0:a.data)==null?void 0:g.customer,h(_))}).catch(f),$=async e=>await l().then(async({allowedIds:t,roleResponse:a})=>{var s,c,g,m;const d=(c=(s=a==null?void 0:a.data)==null?void 0:s.customer)==null?void 0:c.role,r=u(d),o=O(t,r),_={};e.addressBookEnabled!==void 0&&(_.address_book_enabled=e.addressBookEnabled),e.customShippingAddressEnabled!==void 0&&(_.custom_shipping_address_enabled=e.customShippingAddressEnabled);const n=await C(o,{method:"POST",variables:{input:_}});return(g=n.errors)!=null&&g.length?y(n.errors):(n.data.customer=(m=a==null?void 0:a.data)==null?void 0:m.customer,h(n))}).catch(f);export{$ as a,b as g,v as u};
//# sourceMappingURL=updateCompanyConfig.js.map
