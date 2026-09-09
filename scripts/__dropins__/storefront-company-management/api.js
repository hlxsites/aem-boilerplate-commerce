/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as V}from"@dropins/tools/lib.js";import{FetchGraphQL as H}from"@dropins/tools/fetch-graphql.js";import{events as z}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as k}from"@dropins/tools/recaptcha.js";const x=new V({init:async e=>{const t={};x.config.setConfig({...t,...e})},listeners:()=>[]}),At=x.config,{setEndpoint:It,setFetchGraphQlHeader:j,removeFetchGraphQlHeader:B,setFetchGraphQlHeaders:Tt,fetchGraphQl:l,getConfig:Q}=new H().getMethods();var W=(e=>(e.EDIT_COMPANY_EVENT="edit-company",e.EDIT_COMPANY_STRUCTURE_EVENT="edit-company-structure",e))(W||{});const X={EDIT_COMPANY_EVENT:"edit-company",EDIT_COMPANY_STRUCTURE_EVENT:"edit-company-structure"},K=()=>(window.adobeDataLayer||(window.adobeDataLayer=[]),window.adobeDataLayer),q=e=>{K().push(a=>{const n=a.getState?a.getState():{};a.push({event:e,context:n})})},bt=(e,t)=>{if(!X[e])return null;switch(e){case"edit-company":q({type:"company",eventType:"edit",companyData:t});break;case"edit-company-structure":q({type:"company-structure",eventType:"edit",structureData:t});break;default:return null}},U=(e=[])=>{const t=new Set,a=[...e];for(;a.length;){const n=a.pop();if(n&&(typeof n.id=="string"&&t.add(n.id),Array.isArray(n.children)&&n.children.length))for(const r of n.children)a.push(r)}return t},J=(e=[])=>Array.from(U(e)),C=e=>(e==null?void 0:e.id)==="0"||typeof(e==null?void 0:e.id)=="number"&&(e==null?void 0:e.id)===0||(e==null?void 0:e.id)==="MA=="||(e==null?void 0:e.name)==="Company Administrator",Z=()=>["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::users_view","Magento_Company::users_edit","Magento_Company::roles_view","Magento_Company::roles_edit"],ee=e=>{const t=U((e==null?void 0:e.permissions)||[]),a=C(e);return{canViewAccount:a||t.has("Magento_Company::view_account"),canEditAccount:a||t.has("Magento_Company::edit_account"),canViewAddress:a||t.has("Magento_Company::view_address"),canEditAddress:a||t.has("Magento_Company::edit_address"),canViewContacts:a||t.has("Magento_Company::contacts"),canViewPaymentInformation:a||t.has("Magento_Company::payment_information"),canViewShippingInformation:a||t.has("Magento_Company::shipping_information"),canViewUsers:a||t.has("Magento_Company::users_view"),canEditUsers:a||t.has("Magento_Company::users_edit"),canViewRoles:a||t.has("Magento_Company::roles_view"),canManageRoles:a||t.has("Magento_Company::roles_edit")}},te=e=>{try{return atob(e)}catch{return e}},Mt=e=>!e||typeof e!="string"?e:te(e),p=e=>{const t=e.map(a=>a.message).join(" ");throw Error(t)},u=e=>{throw e instanceof DOMException&&e.name==="AbortError"||z.emit("error",{source:"company",type:"network",error:e}),e},ae=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,ne=async()=>{var a,n,r;const e=await l(ae,{method:"POST"});if((a=e==null?void 0:e.errors)!=null&&a.length)throw new Error(((n=e.errors[0])==null?void 0:n.message)||"Failed to load store configuration");const t=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig;if(!t)throw new Error("Invalid response: missing storeConfig");return!!t.company_enabled},Y=e=>{var c,i,m,_;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const t="updateCompanyConfig"in e.data?(c=e.data.updateCompanyConfig)==null?void 0:c.company:"updateCompany"in e.data?(i=e.data.updateCompany)==null?void 0:i.company:e.data.company;if(!t)throw new Error("Invalid response: missing company data");const a="customer"in e.data?e.data.customer:void 0,n=t.legal_address?{street:Array.isArray(t.legal_address.street)?t.legal_address.street.filter(d=>d&&d.trim()!==""):[],city:(t.legal_address.city||"").trim(),region:t.legal_address.region?{region:(t.legal_address.region.region||"").trim(),regionCode:(t.legal_address.region.region_code||"").trim(),regionId:t.legal_address.region.region_id?Number(t.legal_address.region.region_id):0}:void 0,countryCode:(t.legal_address.country_code||"").toUpperCase().trim(),postcode:(t.legal_address.postcode||"").trim(),telephone:t.legal_address.telephone?t.legal_address.telephone.trim():void 0}:void 0,r=a==null?void 0:a.role,o=ee(r),s={id:(t.id||"").toString(),name:(t.name||"").trim(),email:(t.email||"").trim().toLowerCase(),legalName:t.legal_name?t.legal_name.trim():void 0,vatTaxId:t.vat_tax_id?t.vat_tax_id.trim():void 0,resellerId:t.reseller_id?t.reseller_id.trim():void 0,legalAddress:n,companyAdmin:t.company_admin?{id:(t.company_admin.id||"").toString(),firstname:(t.company_admin.firstname||"").trim(),lastname:(t.company_admin.lastname||"").trim(),email:(t.company_admin.email||"").trim().toLowerCase(),jobTitle:t.company_admin.job_title?t.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:t.sales_representative?{firstname:(t.sales_representative.firstname||"").trim(),lastname:(t.sales_representative.lastname||"").trim(),email:(t.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(t.available_payment_methods)?t.available_payment_methods.filter(d=>d&&typeof d.code=="string"&&typeof d.title=="string").map(d=>({code:d.code.trim(),title:d.title.trim()})).filter(d=>d.code.length>0&&d.title.length>0):void 0,availableShippingMethods:Array.isArray(t.available_shipping_methods)?t.available_shipping_methods.filter(d=>d&&typeof d.code=="string"&&typeof d.title=="string").map(d=>({code:d.code.trim(),title:d.title.trim()})).filter(d=>d.code.length>0&&d.title.length>0):void 0,addressBookEnabled:typeof((m=t.config)==null?void 0:m.address_book_enabled)=="boolean"?t.config.address_book_enabled:void 0,customShippingAddressEnabled:typeof((_=t.config)==null?void 0:_.address_book_custom_shipping_address_enabled)=="boolean"?t.config.address_book_custom_shipping_address_enabled:void 0,canEditAccount:o.canEditAccount,canEditAddress:o.canEditAddress,permissionsFlags:o,customerRole:r,customerStatus:a==null?void 0:a.status};if(o.canViewAccount){if(!s.id)throw new Error("Company ID is required");if(!s.name)throw new Error("Company name is required");if(!s.email)throw new Error("Company email is required")}return s},re=e=>{var n,r,o,s,c;if(!((r=(n=e==null?void 0:e.data)==null?void 0:n.createCompany)!=null&&r.company))throw new Error("Invalid createCompany response: missing company data");const t=e.data.createCompany.company;if(!t.legal_address)throw new Error("Legal address is required for company registration");if(!t.company_admin)throw new Error("Company admin is required for company registration");return{id:t.id,name:t.name,email:t.email,legalName:t.legal_name,vatTaxId:t.vat_tax_id,resellerId:t.reseller_id,legalAddress:{street:t.legal_address.street||[],city:t.legal_address.city||"",region:{regionCode:((o=t.legal_address.region)==null?void 0:o.region_code)||"",region:(s=t.legal_address.region)==null?void 0:s.region,regionId:(c=t.legal_address.region)==null?void 0:c.region_id},countryCode:t.legal_address.country_code||"",postcode:t.legal_address.postcode||"",telephone:t.legal_address.telephone},companyAdmin:{id:t.company_admin.id,firstname:t.company_admin.firstname,lastname:t.company_admin.lastname,email:t.company_admin.email,jobTitle:t.company_admin.job_title,telephone:t.company_admin.telephone}}};function O(e,t){return{id:e.id,name:e.name,is_admin:e.is_admin,parent_company:t?{id:t.id,name:t.name}:null,child_companies:[]}}function G(e){const t=[];if(e.parent){const a=O(e.parent);a.child_companies=e.children.map(n=>O(n,e.parent)),t.push(a)}else t.push(...e.children.map(a=>O(a)));return t}function oe(e,t){const a=[],n=new Set;return e.forEach(r=>{G(r).forEach(s=>{var c;n.add(s.id),(c=s.child_companies)==null||c.forEach(i=>{n.add(i.id)}),a.push(s)})}),t.forEach(r=>{n.has(r.id)||a.push({id:r.id,name:r.name,is_admin:r.is_admin,parent_company:null,child_companies:[]})}),a}const $=e=>{var t;return{id:e.id,text:e.text,sortOrder:e.sort_order,children:(t=e.children)==null?void 0:t.map($)}},w=e=>({id:e.id,name:e.name,usersCount:e.users_count,permissions:e.permissions.map($)}),ie=e=>({currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}),se=e=>({items:e.items.map(w),totalCount:e.total_count,pageInfo:ie(e.page_info)}),ce=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.roles))throw new Error("Invalid response: missing company roles data");return se(e.data.company.roles)},de=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.role))throw new Error("Invalid response: missing company role data");return w(e.data.company.role)},le=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.acl_resources))throw new Error("Invalid response: missing ACL resources data");return e.data.company.acl_resources.map($)},me=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.createCompanyRole)!=null&&n.role))throw new Error("Invalid response: missing created role data");return w(e.data.createCompanyRole.role)},ue=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.updateCompanyRole)!=null&&n.role))throw new Error("Invalid response: missing updated role data");return w(e.data.updateCompanyRole.role)},_e=e=>({name:e.name,permissions:e.permissions}),pe=e=>({id:e.id,name:e.name,permissions:e.permissions});function ye(e){return e.items.filter(n=>n.entity.__typename==="Customer"&&"status"in n.entity?n.entity.status==="ACTIVE":!0).map(n=>({structureId:n.entity.structure_id,parentStructureId:n.parent_id||null,label:n.entity.__typename==="CompanyTeam"?n.entity.name||"":`${n.entity.firstname||""} ${n.entity.lastname||""}`.trim(),type:n.entity.__typename==="CompanyTeam"?"team":"user",entityId:(n.entity.__typename==="CompanyTeam"?n.entity.companyTeamId:n.entity.customerId)||"",description:n.entity.__typename==="CompanyTeam"?n.entity.description||null:n.entity.job_title||null})).map(n=>{const r=n.parentStructureId||null,o=!r||r==="MA=="?null:r;return{id:n.structureId,parentId:o,label:n.label,type:n.type,entityId:n.entityId,description:n.description}})}const ge=e=>{if(!e)throw new Error("Invalid response: missing team data");return{id:e.id,name:e.name,description:e.description}},Ce=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:C(e.role)}},he=e=>{var s,c;if(!((c=(s=e==null?void 0:e.data)==null?void 0:s.countries)!=null&&c.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:t,storeConfig:a}=e.data,n=a==null?void 0:a.countries_with_required_region.split(","),r=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:t.filter(({two_letter_abbreviation:i,full_name_locale:m})=>!!(i&&m)).map(i=>{const{two_letter_abbreviation:m,full_name_locale:_,available_regions:d}=i,g=Array.isArray(d)&&d.length>0;return{value:m,text:_,availableRegions:g?d:void 0}}).sort((i,m)=>i.text.localeCompare(m.text)),countriesWithRequiredRegion:n,optionalZipCountries:r}},fe=e=>{var r,o,s;const t=(r=e==null?void 0:e.data)==null?void 0:r.customer,a=(o=e==null?void 0:e.data)==null?void 0:o.company;if(!t||!a)return null;const n={customerId:t==null?void 0:t.id,companyName:(a==null?void 0:a.name)??"",jobTitle:(t==null?void 0:t.job_title)??"",workPhoneNumber:(t==null?void 0:t.telephone)??"",userRole:((s=t==null?void 0:t.role)==null?void 0:s.name)??""};return n.companyName?n:null},Ee=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,Ae="US",P={defaultCountry:Ae,storeCode:""},Nt=async()=>await l(Ee,{method:"GET"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?p(e.errors):Ie(e)}).catch(u),Ie=e=>{var n;if(!((n=e==null?void 0:e.data)!=null&&n.storeConfig))return P;const{default_country:t,store_code:a}=e.data.storeConfig;return{defaultCountry:t||P.defaultCountry,storeCode:a||P.storeCode}},Te=e=>{var t,a,n,r,o,s,c,i,m,_,d,g,y,h,f,E,A,I,T,b,M,N,v,R;return{credit:{available_credit:{currency:((r=(n=(a=(t=e==null?void 0:e.data)==null?void 0:t.company)==null?void 0:a.credit)==null?void 0:n.available_credit)==null?void 0:r.currency)||"",value:((i=(c=(s=(o=e==null?void 0:e.data)==null?void 0:o.company)==null?void 0:s.credit)==null?void 0:c.available_credit)==null?void 0:i.value)||0},credit_limit:{currency:((g=(d=(_=(m=e==null?void 0:e.data)==null?void 0:m.company)==null?void 0:_.credit)==null?void 0:d.credit_limit)==null?void 0:g.currency)||"",value:((E=(f=(h=(y=e==null?void 0:e.data)==null?void 0:y.company)==null?void 0:h.credit)==null?void 0:f.credit_limit)==null?void 0:E.value)||0},outstanding_balance:{currency:((b=(T=(I=(A=e==null?void 0:e.data)==null?void 0:A.company)==null?void 0:I.credit)==null?void 0:T.outstanding_balance)==null?void 0:b.currency)||"",value:((R=(v=(N=(M=e==null?void 0:e.data)==null?void 0:M.company)==null?void 0:N.credit)==null?void 0:v.outstanding_balance)==null?void 0:R.value)||0}}}},be=e=>{var a,n,r,o,s,c;const t=(n=(a=e==null?void 0:e.data)==null?void 0:a.company)==null?void 0:n.credit_history;return{items:((r=t==null?void 0:t.items)==null?void 0:r.map(i=>{var m,_,d,g,y,h,f,E,A,I,T,b,M,N,v,R;return{amount:{currency:((m=i==null?void 0:i.amount)==null?void 0:m.currency)||"",value:((_=i==null?void 0:i.amount)==null?void 0:_.value)||0},balance:{availableCredit:{currency:((g=(d=i==null?void 0:i.balance)==null?void 0:d.available_credit)==null?void 0:g.currency)||"",value:((h=(y=i==null?void 0:i.balance)==null?void 0:y.available_credit)==null?void 0:h.value)||0},creditLimit:{currency:((E=(f=i==null?void 0:i.balance)==null?void 0:f.credit_limit)==null?void 0:E.currency)||"",value:((I=(A=i==null?void 0:i.balance)==null?void 0:A.credit_limit)==null?void 0:I.value)||0},outstandingBalance:{currency:((b=(T=i==null?void 0:i.balance)==null?void 0:T.outstanding_balance)==null?void 0:b.currency)||"",value:((N=(M=i==null?void 0:i.balance)==null?void 0:M.outstanding_balance)==null?void 0:N.value)||0}},customReferenceNumber:(i==null?void 0:i.custom_reference_number)||void 0,date:(i==null?void 0:i.date)||"",type:(i==null?void 0:i.type)||"",updatedBy:{name:((v=i==null?void 0:i.updated_by)==null?void 0:v.name)||"",type:((R=i==null?void 0:i.updated_by)==null?void 0:R.type)||""}}}))||[],pageInfo:{currentPage:((o=t==null?void 0:t.page_info)==null?void 0:o.current_page)||1,pageSize:((s=t==null?void 0:t.page_info)==null?void 0:s.page_size)||20,totalPages:((c=t==null?void 0:t.page_info)==null?void 0:c.total_pages)||0},totalCount:(t==null?void 0:t.total_count)||0}},Me=`
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
`;async function Ne(){var e;try{if(!await ne())return null;const a=await l(Me,{method:"GET",cache:"no-cache"});return(e=a.errors)!=null&&e.length?p(a.errors):fe(a)}catch(t){return u(t)}}async function vt(e,t){const a="DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT",n="DROPIN__COMPANYSWITCHER__GROUP__CONTEXT";if(!sessionStorage.getItem(a))try{const o=await Ne();if(!(o!=null&&o.customerId)||o.customerId!==t)return;sessionStorage.setItem(a,e),sessionStorage.removeItem(n)}catch(o){console.error("Failed to switch company context:",o)}}const Rt=(e,t)=>!e||typeof e!="string"?"":e==="ACTIVE"&&t.statusActive?t.statusActive:e==="INACTIVE"&&t.statusInactive?t.statusInactive:e.charAt(0).toUpperCase()+e.slice(1).toLowerCase(),wt=(e,t)=>{const a=(e==null?void 0:e.trim())||"",n=(t==null?void 0:t.trim())||"";return`${a} ${n}`.trim()},ve=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children { 
                  id 
                  text 
                }
              }
            }
          }
        }
      }
      status
    }
  }
`;async function L(){return await l(ve,{method:"GET",cache:"no-cache"}).then(e=>{var r,o,s;if((r=e.errors)!=null&&r.length)return p(e.errors);const t=(s=(o=e==null?void 0:e.data)==null?void 0:o.customer)==null?void 0:s.role,a=U((t==null?void 0:t.permissions)||[]);return C(t)&&Z().forEach(c=>a.add(c)),{allowedIds:a,roleResponse:e}}).catch(u)}const Re=`
  mutation acceptCompanyInvitation($input: CompanyInvitationInput!) {
    acceptCompanyInvitation(input: $input) {
      success
    }
  }
`;async function St(e){const t=Q().fetchGraphQlHeaders["X-Adobe-Company"];B("X-Adobe-Company");try{const a={code:e.code,user:{customer_id:btoa(e.user.customerId),company_id:btoa(e.user.companyId),job_title:e.user.jobTitle,telephone:e.user.telephone,status:e.user.status},role_id:e.roleId?btoa(e.roleId):null};return await l(Re,{variables:{input:a}}).then(n=>{var o,s;if((o=n.errors)!=null&&o.length)return p(n.errors);const r=(s=n==null?void 0:n.data)==null?void 0:s.acceptCompanyInvitation;return r?{success:r.success}:null}).catch(u)}finally{t!=null&&j("X-Adobe-Company",t)}}const we=`
  query GET_ALLOW_COMPANY_REGISTRATION {
    storeConfig {
      allow_company_registration
    }
  }
`,Ot=async()=>{var a,n,r;const e=await l(we,{method:"POST"});if((a=e==null?void 0:e.errors)!=null&&a.length)throw new Error(((n=e.errors[0])==null?void 0:n.message)||"Failed to load store configuration");const t=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig;if(!t)throw new Error("Invalid response: missing storeConfig");return!!t.allow_company_registration},F=`
  fragment COMPANY_HIERARCHY_ITEM_FRAGMENT on CompanyBasicInfo {
    id
    is_admin
    legal_name
    name
    status
    __typename
  }
`,Se=`
  mutation assignChildCompany($input: AssignChildCompanyInput!) {
    assignChildCompany(input: $input) {
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${F}
`;async function Pt(e,t){return await l(Se,{variables:{input:{parent_company_id:e,child_company_id:t}}}).then(n=>{var o;if((o=n.errors)!=null&&o.length)return p(n.errors);const r=n.data.assignChildCompany.company_hierarchy;return G(r)}).catch(u)}const Oe=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,Ut=async()=>{var e,t,a;try{const n=await l(Oe,{method:"GET",cache:"no-cache"});return(e=n.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((a=(t=n.data)==null?void 0:t.storeConfig)==null?void 0:a.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}},Pe=async()=>{const e=await k();e&&j("X-ReCaptcha",e)},Ue=`
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
`,Ye=e=>{var r,o,s,c,i;const t=(r=e.regionCode)==null?void 0:r.trim(),a=(o=e.region)==null?void 0:o.trim();let n;if(t)n={region_code:t,...e.regionId&&{region_id:typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId}};else if(a!=null&&a.includes(",")){const[m,_]=a.split(",");n={region_code:m.trim(),region_id:parseInt(_.trim(),10)}}else{if(a&&/^\d+$/.test(a))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");a?n={region:a,region_code:a}:n={region:"",region_code:"",region_id:0}}return{company_name:e.companyName||"",company_email:e.companyEmail||"",legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(m=>typeof m=="string"&&m.trim()!==""):[e.street].filter(m=>typeof m=="string"&&m.trim()!==""),city:e.city||"",region:n,postcode:e.postcode||"",country_id:e.countryCode||"",telephone:e.addressTelephone},company_admin:{email:e.adminEmail||"",firstname:((s=e.adminFirstname)==null?void 0:s.trim())||"",lastname:((c=e.adminLastname)==null?void 0:c.trim())||"",job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((i=e.adminCustomAttributes)==null?void 0:i.map(m=>({attribute_code:m.attribute_code,value:m.value})))||[]}}},Yt=async e=>{var t;try{await Pe();const a=Ye(e),n=await l(Ue,{method:"POST",variables:{input:a}});return(t=n.errors)!=null&&t.length?{success:!1,errors:n.errors.map(o=>o.message)}:{success:!0,company:re(n)}}catch(a){return console.error("Failed to create company:",a),{success:!1,errors:["Failed to create company. Please try again."]}}},Ge=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function Gt(e){const t={name:e.name,description:e.description,target_id:e.targetId};return await l(Ge,{variables:{input:t}}).then(a=>{var r,o,s;if((r=a.errors)!=null&&r.length)return p(a.errors);const n=(s=(o=a==null?void 0:a.data)==null?void 0:o.createCompanyTeam)==null?void 0:s.team;return n?{id:n.id,structureId:n.structure_id,name:n.name}:null}).catch(u)}const $e=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname job_title } }
  }
`;async function $t(e){const t={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await l($e,{variables:{input:t}}).then(a=>{var r,o,s;if((r=a.errors)!=null&&r.length)return p(a.errors);const n=(s=(o=a==null?void 0:a.data)==null?void 0:o.createCompanyUser)==null?void 0:s.user;return n?{id:n.id,structureId:n.structure_id,jobTitle:n.job_title}:null}).catch(u)}const Le=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function Lt(e){return await l(Le,{variables:{id:e}}).then(t=>{var a,n;return(a=t.errors)!=null&&a.length?p(t.errors):!!((n=t==null?void 0:t.data)!=null&&n.deleteCompanyTeam)}).catch(u)}const Fe=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,Ft=async e=>{var n,r;const{id:t}=e;if(!t)throw new Error("User ID is required to delete a company user");const a=await l(Fe,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(u);return(n=a.errors)!=null&&n.length&&p(a.errors),(r=a.data)!=null&&r.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}},De=`
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
`,qe=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,xe=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,je=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,D=(e,t=!1)=>{const a=e.has("Magento_Company::view_account"),n=e.has("Magento_Company::view_address"),r=e.has("Magento_Company::contacts"),o=e.has("Magento_Company::payment_information"),s=e.has("Magento_Company::shipping_information"),c=[],i=[];return a&&(c.push("...COMPANY_BASIC_INFO_FRAGMENT"),i.push(qe)),n&&(c.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),i.push(De)),r&&(c.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),c.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),i.push(je),i.push(xe)),o&&c.push("available_payment_methods { code title }"),s&&c.push("available_shipping_methods { code title }"),t&&c.push("config { address_book_enabled address_book_custom_shipping_address_enabled }"),{fields:c,usedFragments:i}},Ve=(e,t=!1)=>{const{fields:a,usedFragments:n}=D(e,t);return a.length===0?`
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
${n.join(`
`)}`},He=(e,t=!1)=>{const{fields:a,usedFragments:n}=D(e,t);return a.length===0?`
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
${n.join(`
`)}`},ze=(e,t=!1)=>{const{fields:a,usedFragments:n}=D(e,t);return a.length===0?`
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
${n.join(`
`)}`};async function Dt(){return await L().then(async({allowedIds:e,roleResponse:t})=>{var c,i,m,_,d;const a=C((i=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:i.role),n=Ve(e,a),r=await l(n,{method:"GET",cache:"no-cache"});if((m=r.errors)!=null&&m.length)return p(r.errors);const o=(_=r==null?void 0:r.data)==null?void 0:_.company;return o&&Object.keys(o).some(g=>g!=="__typename")?(r!=null&&r.data&&((d=t==null?void 0:t.data)!=null&&d.customer)&&(r.data.customer=t.data.customer),Y(r)):null}).catch(u)}const ke=`
  query GET_COMPANY_CREDIT 
    {
        company {
            credit {
                available_credit {
                    currency
                    value
                }
                credit_limit {
                    currency
                    value
                }
                outstanding_balance {
                    currency
                    value
                }
            }
        }
    }
`,qt=async()=>await l(ke,{method:"GET",cache:"no-cache"}).then(e=>{var a;return(a=e.errors)!=null&&a.length?null:Te(e)}).catch(u),Be=`
  query GET_COMPANY_CREDIT_HISTORY($filter: CompanyCreditHistoryFilterInput, $pageSize: Int, $currentPage: Int) {
    company {
      credit_history(
        filter: $filter
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          amount {
            currency
            value
          }
          balance {
            available_credit {
              currency
              value
            }
            credit_limit {
              currency
              value
            }
            outstanding_balance {
              currency
              value
            }
          }
          custom_reference_number
          date
          type
          updated_by {
            name
            type
          }
        }
        page_info {
          current_page
          page_size
          total_pages
        }
        total_count
      }
    }
  }
`,xt=async(e={})=>{const{filter:t,pageSize:a=20,currentPage:n=1}=e,r=t?{custom_reference_number:t.customReferenceNumber,operation_type:t.operationType,updated_by:t.updatedBy}:null;return await l(Be,{method:"GET",cache:"no-cache",variables:{filter:r,pageSize:a,currentPage:n}}).then(o=>{var c;return(c=o.errors)!=null&&c.length?null:be(o)}).catch(u)};var Qe=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(Qe||{});const We=`
  query getCompanyHierarchy {
    customer {
      companies(input: {}) {
        items {
          id
          name
          status
          is_admin
        }
      }
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${F}
`;async function jt(){return await l(We,{method:"GET",cache:"no-cache"}).then(e=>{var n;if((n=e.errors)!=null&&n.length)return p(e.errors);const t=e.data.customer.company_hierarchy,a=e.data.customer.companies.items;return oe(t,a)}).catch(u)}const Xe=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { companyTeamId: id structure_id name description }
            ... on Customer { customerId: id structure_id firstname lastname status job_title }
          }
        }
      }
    }
  }
`;async function Vt(){return await l(Xe,{method:"GET",cache:"no-cache"}).then(e=>{var a;if((a=e.errors)!=null&&a.length)return p(e.errors);const t=e.data.company.structure;return ye(t)}).catch(u)}const Ke=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function Ht(e){return await l(Ke,{variables:{id:e}}).then(t=>{var n,r,o;if((n=t.errors)!=null&&n.length)return p(t.errors);const a=(o=(r=t==null?void 0:t.data)==null?void 0:r.company)==null?void 0:o.team;return a?ge(a):null}).catch(u)}const Je=`
  query getCompanyUser($id: ID!) {
    company {
      user(id: $id) {
        id
        email
        firstname
        lastname
        job_title
        telephone
        status
        role { id name }
      }
    }
  }
`;async function zt(e){return await l(Je,{variables:{id:e}}).then(t=>{var n,r,o;if((n=t.errors)!=null&&n.length)return p(t.errors);const a=(o=(r=t==null?void 0:t.data)==null?void 0:r.company)==null?void 0:o.user;return a?Ce(a):null}).catch(u)}const Ze=`
  query COMPANY_USERS($pageSize: Int!, $currentPage: Int!, $filter: CompanyUsersFilterInput) {
    company {
      users(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {
        items {
          id
          firstname
          lastname
          email
          role {
            name
          }
          status
          team {
            name
          }
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
`,kt=async(e={})=>{var r,o,s,c;const{pageSize:t=20,currentPage:a=1,filter:n}=e;try{const i=await l(Ze,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:n}}).catch(u);return(r=i.errors)!=null&&r.length&&p(i.errors),(c=(s=(o=i.data)==null?void 0:o.company)==null?void 0:s.users)!=null&&c.items?{users:i.data.company.users.items.map(_=>({id:_.id,firstName:_.firstname,lastName:_.lastname,email:_.email,role:_.role.name,status:_.status,..._.team&&{team:_.team.name}})),pageInfo:{pageSize:i.data.company.users.page_info.page_size,currentPage:i.data.company.users.page_info.current_page,totalPages:i.data.company.users.page_info.total_pages},totalCount:i.data.company.users.total_count}:{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}},et=`
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
`,Bt=async()=>{const e="_company_countries",t=sessionStorage.getItem(e);return t?JSON.parse(t):await l(et,{method:"GET"}).then(a=>{var r;if((r=a.errors)!=null&&r.length)return p(a.errors);const n=he(a);return sessionStorage.setItem(e,JSON.stringify(n)),n}).catch(u)},tt=`
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
`,Qt=async()=>{var e,t,a;try{const n=await l(tt,{method:"POST"});if((e=n.errors)!=null&&e.length)return!1;const r=(t=n.data)==null?void 0:t.customer;if(!r)return!1;const o=((a=r.companies)==null?void 0:a.items)??[];if(!Array.isArray(o)||o.length===0)return!1;const s=r.role;return s?s.id==="0"||typeof s.id=="number"&&s.id===0||s.name==="Company Administrator":!1}catch(n){return console.error("Error checking if customer is company admin:",n),!1}},at=`
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
`,Wt=async()=>{var e,t,a,n;try{const r=await l(at,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const o=((n=(a=(t=r==null?void 0:r.data)==null?void 0:t.customer)==null?void 0:a.companies)==null?void 0:n.items)??[];return Array.isArray(o)&&o.length>0}catch{return!1}},nt=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function Xt(e){return await l(nt,{variables:{email:e}}).then(t=>{var a,n,r;return(a=t.errors)!=null&&a.length?p(t.errors):((r=(n=t==null?void 0:t.data)==null?void 0:n.isCompanyUserEmailAvailable)==null?void 0:r.is_email_available)??null}).catch(u)}const Kt=async e=>await L().then(async({allowedIds:t,roleResponse:a})=>{var c,i,m,_;const n=C((i=(c=a==null?void 0:a.data)==null?void 0:c.customer)==null?void 0:i.role),r=He(t,n),o={};if(e.name!==void 0&&(o.company_name=e.name),e.email!==void 0&&(o.company_email=e.email),e.legalName!==void 0&&(o.legal_name=e.legalName),e.vatTaxId!==void 0&&(o.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(o.reseller_id=e.resellerId),e.legalAddress!==void 0&&t.has("Magento_Company::edit_address")){let d;Array.isArray(e.legalAddress.street)?(d=[...e.legalAddress.street],e.legalAddress.street2&&d.push(e.legalAddress.street2)):d=[e.legalAddress.street,e.legalAddress.street2].filter(y=>typeof y=="string"&&y.trim().length>0),d=d.filter(y=>y&&typeof y=="string"&&y.trim().length>0);let g;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const y=e.legalAddress.region;y.region===y.regionCode?g={region:y.region,region_code:y.regionCode,region_id:0}:g={region:y.region,region_code:y.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?g={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(g={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});o.legal_address={street:d,city:e.legalAddress.city,region:g,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const s=await l(r,{method:"POST",variables:{input:o}});return(m=s.errors)!=null&&m.length?p(s.errors):(s.data.customer=(_=a==null?void 0:a.data)==null?void 0:_.customer,Y(s))}).catch(u),Jt=async e=>await L().then(async({allowedIds:t,roleResponse:a})=>{var i,m,_,d;const n=(m=(i=a==null?void 0:a.data)==null?void 0:i.customer)==null?void 0:m.role,r=C(n),o=ze(t,r),s={};e.addressBookEnabled!==void 0&&(s.address_book_enabled=e.addressBookEnabled),e.customShippingAddressEnabled!==void 0&&(s.custom_shipping_address_enabled=e.customShippingAddressEnabled);const c=await l(o,{method:"POST",variables:{input:s}});return(_=c.errors)!=null&&_.length?p(c.errors):(c.data.customer=(d=a==null?void 0:a.data)==null?void 0:d.customer,Y(c))}).catch(u),rt=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function Zt(e){const t={treeId:e.id,parentTreeId:e.parentId};return await l(rt,{variables:t}).then(a=>{var n,r;return(n=a.errors)!=null&&n.length?p(a.errors):!!((r=a==null?void 0:a.data)!=null&&r.updateCompanyStructure)}).catch(u)}const ot=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function ea(e){const t={id:e.id,name:e.name,description:e.description};return await l(ot,{variables:{input:t}}).then(a=>{var n,r,o,s;return(n=a.errors)!=null&&n.length?p(a.errors):!!((s=(o=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyTeam)==null?void 0:o.team)!=null&&s.id)}).catch(u)}const it=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function ta(e){const t={id:e.id,email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await l(it,{variables:{input:t}}).then(a=>{var n,r,o,s;return(n=a.errors)!=null&&n.length?p(a.errors):!!((s=(o=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyUser)==null?void 0:o.user)!=null&&s.id)}).catch(u)}const st=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,aa=async e=>{var r,o,s;const{id:t,status:a}=e;if(!t)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const n=await l(st,{method:"POST",cache:"no-cache",variables:{input:{id:t,status:a}}}).catch(u);return(r=n.errors)!=null&&r.length&&p(n.errors),(s=(o=n.data)==null?void 0:o.updateCompanyUser)!=null&&s.user?{success:!0,user:{id:n.data.updateCompanyUser.user.id,status:n.data.updateCompanyUser.user.status}}:{success:!1}},ct=`
  mutation unassignChildCompany($input: UnassignChildCompanyInput!) {
    unassignChildCompany(input: $input) {
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${F}
`;async function na(e){return await l(ct,{variables:{input:{child_company_id:e}}}).then(a=>{var r;if((r=a.errors)!=null&&r.length)return p(a.errors);const n=a.data.unassignChildCompany.company_hierarchy;return G(n)}).catch(u)}const dt=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,ra=async e=>{try{const t=await l(dt,{variables:{email:e}});return t.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:t.data.isCompanyEmailAvailable.is_email_available,error:t.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},S=`
  fragment CompanyRoleFragment on CompanyRole {
    id
    name
    users_count
    permissions {
      id
      text
      sort_order
      children {
        id
        text
        sort_order
        children {
          id
          text
          sort_order
          children {
            id
            text
            sort_order
            children {
              id
              text
              sort_order
            }
          }
        }
      }
    }
  }
`,lt=`
  query GetCompanyRoles($pageSize: Int, $currentPage: Int) {
    company {
      roles(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...CompanyRoleFragment
        }
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
  ${S}
`,mt=`
  query GetCompanyRole($id: ID!) {
    company {
      role(id: $id) {
        ...CompanyRoleFragment
      }
    }
  }
  ${S}
`,ut=`
  query GetCompanyAclResources {
    company {
      acl_resources {
        id
        text
        sort_order
        children {
          id
          text
          sort_order
          children {
            id
            text
            sort_order
            children {
              id
              text
              sort_order
              children {
                id
                text
                sort_order
              }
            }
          }
        }
      }
    }
  }
`,_t=`
  query IsCompanyRoleNameAvailable($name: String!) {
    isCompanyRoleNameAvailable(name: $name) {
      is_role_name_available
    }
  }
`,oa=async(e={})=>{try{const t=await l(lt,{variables:e,method:"GET",cache:"no-cache"});return ce(t)}catch(t){return u(t)}},ia=async e=>{try{const t=await l(mt,{variables:e,method:"GET",cache:"no-cache"});return de(t)}catch(t){return u(t)}},sa=async()=>{try{const e=await l(ut,{method:"GET",cache:"force-cache"});return le(e)}catch(e){return u(e)}},pt=`
  mutation CreateCompanyRole($input: CompanyRoleCreateInput!) {
    createCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${S}
`,yt=`
  mutation UpdateCompanyRole($input: CompanyRoleUpdateInput!) {
    updateCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${S}
`,gt=`
  mutation DeleteCompanyRole($id: ID!) {
    deleteCompanyRole(id: $id) {
      success
    }
  }
`,ca=async e=>{try{const t={input:_e(e)},a=await l(pt,{variables:t,method:"POST"});return me(a)}catch(t){return u(t)}},da=async e=>{try{const t={input:pe(e)},a=await l(yt,{variables:t,method:"POST"});return ue(a)}catch(t){return u(t)}},la=async e=>{var t;try{const a=await l(gt,{variables:e,method:"POST"});return(t=a.errors)!=null&&t.length?p(a.errors):a.data.deleteCompanyRole.success}catch(a){return u(a)}},ma=async e=>{var t;try{const a=await l(_t,{variables:e,method:"GET",cache:"no-cache"});return(t=a.errors)!=null&&t.length?p(a.errors):a.data.isCompanyRoleNameAvailable.is_role_name_available}catch(a){return u(a)}},ua=e=>J(e),_a=(e,t)=>{const a=new Set(t),n=r=>{var s;const o=((s=r.children)==null?void 0:s.map(n).filter(c=>c!==null))||[];return a.has(r.id)||o.length>0?{...r,children:o}:null};return e.map(n).filter(r=>r!==null)};export{Qe as CompanyCreditOperationType,Ae as DEFAULT_COUNTRY,W as E,P as STORE_CONFIG_DEFAULTS,wt as a,St as acceptCompanyInvitation,Ot as allowCompanyRegistration,Pt as assignChildCompany,ee as b,_a as buildPermissionTree,Rt as c,Ut as checkCompanyCreditEnabled,ne as companyEnabled,At as config,Yt as createCompany,ca as createCompanyRole,Gt as createCompanyTeam,$t as createCompanyUser,Mt as d,la as deleteCompanyRole,Lt as deleteCompanyTeam,Ft as deleteCompanyUser,J as f,l as fetchGraphQl,L as fetchUserPermissions,ua as flattenPermissionIds,Dt as getCompany,sa as getCompanyAclResources,qt as getCompanyCredit,xt as getCompanyCreditHistory,jt as getCompanyHierarchy,ia as getCompanyRole,oa as getCompanyRoles,Vt as getCompanyStructure,Ht as getCompanyTeam,zt as getCompanyUser,kt as getCompanyUsers,Q as getConfig,Bt as getCountries,Ne as getCustomerCompany,Nt as getStoreConfig,C as i,x as initialize,Qt as isCompanyAdmin,ma as isCompanyRoleNameAvailable,Wt as isCompanyUser,Xt as isCompanyUserEmailAvailable,bt as p,B as removeFetchGraphQlHeader,vt as s,It as setEndpoint,j as setFetchGraphQlHeader,Tt as setFetchGraphQlHeaders,na as unassignChildCompany,Kt as updateCompany,Jt as updateCompanyConfig,da as updateCompanyRole,Zt as updateCompanyStructure,ea as updateCompanyTeam,ta as updateCompanyUser,aa as updateCompanyUserStatus,ra as validateCompanyEmail};
//# sourceMappingURL=api.js.map
