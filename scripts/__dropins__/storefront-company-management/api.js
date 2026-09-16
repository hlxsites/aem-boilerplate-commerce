/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as V}from"@dropins/tools/lib.js";import{FetchGraphQL as H}from"@dropins/tools/fetch-graphql.js";import{events as j}from"@dropins/tools/event-bus.js";const F=new V({init:async e=>{const t={};F.config.setConfig({...t,...e})},listeners:()=>[]}),Ct=F.config,{setEndpoint:ht,setFetchGraphQlHeader:z,removeFetchGraphQlHeader:B,setFetchGraphQlHeaders:ft,fetchGraphQl:d,getConfig:k}=new H().getMethods();var Q=(e=>(e.EDIT_COMPANY_EVENT="edit-company",e.EDIT_COMPANY_STRUCTURE_EVENT="edit-company-structure",e))(Q||{});const W={EDIT_COMPANY_EVENT:"edit-company",EDIT_COMPANY_STRUCTURE_EVENT:"edit-company-structure"},K=()=>(window.adobeDataLayer||(window.adobeDataLayer=[]),window.adobeDataLayer),L=e=>{K().push(a=>{const n=a.getState?a.getState():{};a.push({event:e,context:n})})},Et=(e,t)=>{if(!W[e])return null;switch(e){case"edit-company":L({type:"company",eventType:"edit",companyData:t});break;case"edit-company-structure":L({type:"company-structure",eventType:"edit",structureData:t});break;default:return null}},P=(e=[])=>{const t=new Set,a=[...e];for(;a.length;){const n=a.pop();if(n&&(typeof n.id=="string"&&t.add(n.id),Array.isArray(n.children)&&n.children.length))for(const r of n.children)a.push(r)}return t},X=(e=[])=>Array.from(P(e)),U=e=>(e==null?void 0:e.id)==="0"||typeof(e==null?void 0:e.id)=="number"&&(e==null?void 0:e.id)===0||(e==null?void 0:e.id)==="MA=="||(e==null?void 0:e.name)==="Company Administrator",J=()=>["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::users_view","Magento_Company::users_edit","Magento_Company::roles_view","Magento_Company::roles_edit"],Z=e=>{const t=P((e==null?void 0:e.permissions)||[]),a=U(e);return{canViewAccount:a||t.has("Magento_Company::view_account"),canEditAccount:a||t.has("Magento_Company::edit_account"),canViewAddress:a||t.has("Magento_Company::view_address"),canEditAddress:a||t.has("Magento_Company::edit_address"),canViewContacts:a||t.has("Magento_Company::contacts"),canViewPaymentInformation:a||t.has("Magento_Company::payment_information"),canViewShippingInformation:a||t.has("Magento_Company::shipping_information"),canViewUsers:a||t.has("Magento_Company::users_view"),canEditUsers:a||t.has("Magento_Company::users_edit"),canViewRoles:a||t.has("Magento_Company::roles_view"),canManageRoles:a||t.has("Magento_Company::roles_edit")}},ee=e=>{try{return atob(e)}catch{return e}},At=e=>!e||typeof e!="string"?e:ee(e),_=e=>{const t=e.map(a=>a.message).join(" ");throw Error(t)},m=e=>{throw e instanceof DOMException&&e.name==="AbortError"||j.emit("error",{source:"company",type:"network",error:e}),e},te=`
  query GET_COMPANY_ENABLED {
    storeConfig {
      company_enabled
    }
  }
`,ae=async()=>{var a,n,r;const e=await d(te,{method:"POST"});if((a=e==null?void 0:e.errors)!=null&&a.length)throw new Error(((n=e.errors[0])==null?void 0:n.message)||"Failed to load store configuration");const t=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig;if(!t)throw new Error("Invalid response: missing storeConfig");return!!t.company_enabled},D=e=>{var c;if(!(e!=null&&e.data))throw new Error("Invalid response: missing data");const t="updateCompany"in e.data?(c=e.data.updateCompany)==null?void 0:c.company:e.data.company;if(!t)throw new Error("Invalid response: missing company data");const a="customer"in e.data?e.data.customer:void 0,n=t.legal_address?{street:Array.isArray(t.legal_address.street)?t.legal_address.street.filter(o=>o&&o.trim()!==""):[],city:(t.legal_address.city||"").trim(),region:t.legal_address.region?{region:(t.legal_address.region.region||"").trim(),regionCode:(t.legal_address.region.region_code||"").trim(),regionId:t.legal_address.region.region_id?Number(t.legal_address.region.region_id):0}:void 0,countryCode:(t.legal_address.country_code||"").toUpperCase().trim(),postcode:(t.legal_address.postcode||"").trim(),telephone:t.legal_address.telephone?t.legal_address.telephone.trim():void 0}:void 0,r=a==null?void 0:a.role,i=Z(r),s={id:(t.id||"").toString(),name:(t.name||"").trim(),email:(t.email||"").trim().toLowerCase(),legalName:t.legal_name?t.legal_name.trim():void 0,vatTaxId:t.vat_tax_id?t.vat_tax_id.trim():void 0,resellerId:t.reseller_id?t.reseller_id.trim():void 0,legalAddress:n,companyAdmin:t.company_admin?{id:(t.company_admin.id||"").toString(),firstname:(t.company_admin.firstname||"").trim(),lastname:(t.company_admin.lastname||"").trim(),email:(t.company_admin.email||"").trim().toLowerCase(),jobTitle:t.company_admin.job_title?t.company_admin.job_title.trim():void 0}:void 0,salesRepresentative:t.sales_representative?{firstname:(t.sales_representative.firstname||"").trim(),lastname:(t.sales_representative.lastname||"").trim(),email:(t.sales_representative.email||"").trim().toLowerCase()}:void 0,availablePaymentMethods:Array.isArray(t.available_payment_methods)?t.available_payment_methods.filter(o=>o&&typeof o.code=="string"&&typeof o.title=="string").map(o=>({code:o.code.trim(),title:o.title.trim()})).filter(o=>o.code.length>0&&o.title.length>0):void 0,availableShippingMethods:Array.isArray(t.available_shipping_methods)?t.available_shipping_methods.filter(o=>o&&typeof o.code=="string"&&typeof o.title=="string").map(o=>({code:o.code.trim(),title:o.title.trim()})).filter(o=>o.code.length>0&&o.title.length>0):void 0,canEditAccount:i.canEditAccount,canEditAddress:i.canEditAddress,permissionsFlags:i,customerRole:r,customerStatus:a==null?void 0:a.status};if(i.canViewAccount){if(!s.id)throw new Error("Company ID is required");if(!s.name)throw new Error("Company name is required");if(!s.email)throw new Error("Company email is required")}return s},ne=e=>{var n,r,i,s,c;if(!((r=(n=e==null?void 0:e.data)==null?void 0:n.createCompany)!=null&&r.company))throw new Error("Invalid createCompany response: missing company data");const t=e.data.createCompany.company;if(!t.legal_address)throw new Error("Legal address is required for company registration");if(!t.company_admin)throw new Error("Company admin is required for company registration");return{id:t.id,name:t.name,email:t.email,legalName:t.legal_name,vatTaxId:t.vat_tax_id,resellerId:t.reseller_id,legalAddress:{street:t.legal_address.street||[],city:t.legal_address.city||"",region:{regionCode:((i=t.legal_address.region)==null?void 0:i.region_code)||"",region:(s=t.legal_address.region)==null?void 0:s.region,regionId:(c=t.legal_address.region)==null?void 0:c.region_id},countryCode:t.legal_address.country_code||"",postcode:t.legal_address.postcode||"",telephone:t.legal_address.telephone},companyAdmin:{id:t.company_admin.id,firstname:t.company_admin.firstname,lastname:t.company_admin.lastname,email:t.company_admin.email,jobTitle:t.company_admin.job_title,telephone:t.company_admin.telephone}}};function S(e,t){return{id:e.id,name:e.name,is_admin:e.is_admin,parent_company:t?{id:t.id,name:t.name}:null,child_companies:[]}}function Y(e){const t=[];if(e.parent){const a=S(e.parent);a.child_companies=e.children.map(n=>S(n,e.parent)),t.push(a)}else t.push(...e.children.map(a=>S(a)));return t}function re(e,t){const a=[],n=new Set;return e.forEach(r=>{Y(r).forEach(s=>{var c;n.add(s.id),(c=s.child_companies)==null||c.forEach(o=>{n.add(o.id)}),a.push(s)})}),t.forEach(r=>{n.has(r.id)||a.push({id:r.id,name:r.name,is_admin:r.is_admin,parent_company:null,child_companies:[]})}),a}const G=e=>{var t;return{id:e.id,text:e.text,sortOrder:e.sort_order,children:(t=e.children)==null?void 0:t.map(G)}},R=e=>({id:e.id,name:e.name,usersCount:e.users_count,permissions:e.permissions.map(G)}),oe=e=>({currentPage:e.current_page,pageSize:e.page_size,totalPages:e.total_pages}),ie=e=>({items:e.items.map(R),totalCount:e.total_count,pageInfo:oe(e.page_info)}),se=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.roles))throw new Error("Invalid response: missing company roles data");return ie(e.data.company.roles)},ce=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.role))throw new Error("Invalid response: missing company role data");return R(e.data.company.role)},de=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.company)!=null&&n.acl_resources))throw new Error("Invalid response: missing ACL resources data");return e.data.company.acl_resources.map(G)},le=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.createCompanyRole)!=null&&n.role))throw new Error("Invalid response: missing created role data");return R(e.data.createCompanyRole.role)},me=e=>{var t,a,n;if((t=e.errors)!=null&&t.length)throw new Error(e.errors[0].message);if(!((n=(a=e.data)==null?void 0:a.updateCompanyRole)!=null&&n.role))throw new Error("Invalid response: missing updated role data");return R(e.data.updateCompanyRole.role)},ue=e=>({name:e.name,permissions:e.permissions}),_e=e=>({id:e.id,name:e.name,permissions:e.permissions});function pe(e){return e.items.filter(n=>n.entity.__typename==="Customer"&&"status"in n.entity?n.entity.status==="ACTIVE":!0).map(n=>({structureId:n.entity.structure_id,parentStructureId:n.parent_id||null,label:n.entity.__typename==="CompanyTeam"?n.entity.name||"":`${n.entity.firstname||""} ${n.entity.lastname||""}`.trim(),type:n.entity.__typename==="CompanyTeam"?"team":"user",entityId:(n.entity.__typename==="CompanyTeam"?n.entity.companyTeamId:n.entity.customerId)||"",description:n.entity.__typename==="CompanyTeam"?n.entity.description||null:n.entity.job_title||null})).map(n=>{const r=n.parentStructureId||null,i=!r||r==="MA=="?null:r;return{id:n.structureId,parentId:i,label:n.label,type:n.type,entityId:n.entityId,description:n.description}})}const ye=e=>{if(!e)throw new Error("Invalid response: missing team data");return{id:e.id,name:e.name,description:e.description}},ge=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:U(e.role)}},Ce=e=>{var s,c;if(!((c=(s=e==null?void 0:e.data)==null?void 0:s.countries)!=null&&c.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:t,storeConfig:a}=e.data,n=a==null?void 0:a.countries_with_required_region.split(","),r=a==null?void 0:a.optional_zip_countries.split(",");return{availableCountries:t.filter(({two_letter_abbreviation:o,full_name_locale:u})=>!!(o&&u)).map(o=>{const{two_letter_abbreviation:u,full_name_locale:l,available_regions:p}=o,y=Array.isArray(p)&&p.length>0;return{value:u,text:l,availableRegions:y?p:void 0}}).sort((o,u)=>o.text.localeCompare(u.text)),countriesWithRequiredRegion:n,optionalZipCountries:r}},he=e=>{var r,i,s;const t=(r=e==null?void 0:e.data)==null?void 0:r.customer,a=(i=e==null?void 0:e.data)==null?void 0:i.company;if(!t||!a)return null;const n={customerId:t==null?void 0:t.id,companyName:(a==null?void 0:a.name)??"",jobTitle:(t==null?void 0:t.job_title)??"",workPhoneNumber:(t==null?void 0:t.telephone)??"",userRole:((s=t==null?void 0:t.role)==null?void 0:s.name)??""};return n.companyName?n:null},fe=`
    query getStoreConfig {
        storeConfig {
            default_country
            store_code
        }
    }
`,Ee="US",O={defaultCountry:Ee,storeCode:""},It=async()=>await d(fe,{method:"GET"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?_(e.errors):Ae(e)}).catch(m),Ae=e=>{var n;if(!((n=e==null?void 0:e.data)!=null&&n.storeConfig))return O;const{default_country:t,store_code:a}=e.data.storeConfig;return{defaultCountry:t||O.defaultCountry,storeCode:a||O.storeCode}},Ie=e=>{var t,a,n,r,i,s,c,o,u,l,p,y,g,C,h,f,E,A,I,T,M,b,N,v;return{credit:{available_credit:{currency:((r=(n=(a=(t=e==null?void 0:e.data)==null?void 0:t.company)==null?void 0:a.credit)==null?void 0:n.available_credit)==null?void 0:r.currency)||"",value:((o=(c=(s=(i=e==null?void 0:e.data)==null?void 0:i.company)==null?void 0:s.credit)==null?void 0:c.available_credit)==null?void 0:o.value)||0},credit_limit:{currency:((y=(p=(l=(u=e==null?void 0:e.data)==null?void 0:u.company)==null?void 0:l.credit)==null?void 0:p.credit_limit)==null?void 0:y.currency)||"",value:((f=(h=(C=(g=e==null?void 0:e.data)==null?void 0:g.company)==null?void 0:C.credit)==null?void 0:h.credit_limit)==null?void 0:f.value)||0},outstanding_balance:{currency:((T=(I=(A=(E=e==null?void 0:e.data)==null?void 0:E.company)==null?void 0:A.credit)==null?void 0:I.outstanding_balance)==null?void 0:T.currency)||"",value:((v=(N=(b=(M=e==null?void 0:e.data)==null?void 0:M.company)==null?void 0:b.credit)==null?void 0:N.outstanding_balance)==null?void 0:v.value)||0}}}},Te=e=>{var a,n,r,i,s,c;const t=(n=(a=e==null?void 0:e.data)==null?void 0:a.company)==null?void 0:n.credit_history;return{items:((r=t==null?void 0:t.items)==null?void 0:r.map(o=>{var u,l,p,y,g,C,h,f,E,A,I,T,M,b,N,v;return{amount:{currency:((u=o==null?void 0:o.amount)==null?void 0:u.currency)||"",value:((l=o==null?void 0:o.amount)==null?void 0:l.value)||0},balance:{availableCredit:{currency:((y=(p=o==null?void 0:o.balance)==null?void 0:p.available_credit)==null?void 0:y.currency)||"",value:((C=(g=o==null?void 0:o.balance)==null?void 0:g.available_credit)==null?void 0:C.value)||0},creditLimit:{currency:((f=(h=o==null?void 0:o.balance)==null?void 0:h.credit_limit)==null?void 0:f.currency)||"",value:((A=(E=o==null?void 0:o.balance)==null?void 0:E.credit_limit)==null?void 0:A.value)||0},outstandingBalance:{currency:((T=(I=o==null?void 0:o.balance)==null?void 0:I.outstanding_balance)==null?void 0:T.currency)||"",value:((b=(M=o==null?void 0:o.balance)==null?void 0:M.outstanding_balance)==null?void 0:b.value)||0}},customReferenceNumber:(o==null?void 0:o.custom_reference_number)||void 0,date:(o==null?void 0:o.date)||"",type:(o==null?void 0:o.type)||"",updatedBy:{name:((N=o==null?void 0:o.updated_by)==null?void 0:N.name)||"",type:((v=o==null?void 0:o.updated_by)==null?void 0:v.type)||""}}}))||[],pageInfo:{currentPage:((i=t==null?void 0:t.page_info)==null?void 0:i.current_page)||1,pageSize:((s=t==null?void 0:t.page_info)==null?void 0:s.page_size)||20,totalPages:((c=t==null?void 0:t.page_info)==null?void 0:c.total_pages)||0},totalCount:(t==null?void 0:t.total_count)||0}},Me=`
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
`;async function be(){var e;try{if(!await ae())return null;const a=await d(Me,{method:"GET",cache:"no-cache"});return(e=a.errors)!=null&&e.length?_(a.errors):he(a)}catch(t){return m(t)}}async function Tt(e,t){const a="DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT",n="DROPIN__COMPANYSWITCHER__GROUP__CONTEXT";if(!sessionStorage.getItem(a))try{const i=await be();if(!(i!=null&&i.customerId)||i.customerId!==t)return;sessionStorage.setItem(a,e),sessionStorage.removeItem(n)}catch(i){console.error("Failed to switch company context:",i)}}const Mt=(e,t)=>!e||typeof e!="string"?"":e==="ACTIVE"&&t.statusActive?t.statusActive:e==="INACTIVE"&&t.statusInactive?t.statusInactive:e.charAt(0).toUpperCase()+e.slice(1).toLowerCase(),bt=(e,t)=>{const a=(e==null?void 0:e.trim())||"",n=(t==null?void 0:t.trim())||"";return`${a} ${n}`.trim()},Ne=`
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
`;async function q(){return await d(Ne,{method:"GET",cache:"no-cache"}).then(e=>{var r,i,s;if((r=e.errors)!=null&&r.length)return _(e.errors);const t=(s=(i=e==null?void 0:e.data)==null?void 0:i.customer)==null?void 0:s.role,a=P((t==null?void 0:t.permissions)||[]);return U(t)&&J().forEach(c=>a.add(c)),{allowedIds:a,roleResponse:e}}).catch(m)}const ve=`
  mutation acceptCompanyInvitation($input: CompanyInvitationInput!) {
    acceptCompanyInvitation(input: $input) {
      success
    }
  }
`;async function Nt(e){const t=k().fetchGraphQlHeaders["X-Adobe-Company"];B("X-Adobe-Company");try{const a={code:e.code,user:{customer_id:btoa(e.user.customerId),company_id:btoa(e.user.companyId),job_title:e.user.jobTitle,telephone:e.user.telephone,status:e.user.status},role_id:e.roleId?btoa(e.roleId):null};return await d(ve,{variables:{input:a}}).then(n=>{var i,s;if((i=n.errors)!=null&&i.length)return _(n.errors);const r=(s=n==null?void 0:n.data)==null?void 0:s.acceptCompanyInvitation;return r?{success:r.success}:null}).catch(m)}finally{t!=null&&z("X-Adobe-Company",t)}}const Re=`
  query GET_ALLOW_COMPANY_REGISTRATION {
    storeConfig {
      allow_company_registration
    }
  }
`,vt=async()=>{var a,n,r;const e=await d(Re,{method:"POST"});if((a=e==null?void 0:e.errors)!=null&&a.length)throw new Error(((n=e.errors[0])==null?void 0:n.message)||"Failed to load store configuration");const t=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig;if(!t)throw new Error("Invalid response: missing storeConfig");return!!t.allow_company_registration},$=`
  fragment COMPANY_HIERARCHY_ITEM_FRAGMENT on CompanyBasicInfo {
    id
    is_admin
    legal_name
    name
    status
    __typename
  }
`,we=`
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
  ${$}
`;async function Rt(e,t){return await d(we,{variables:{input:{parent_company_id:e,child_company_id:t}}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return _(n.errors);const r=n.data.assignChildCompany.company_hierarchy;return Y(r)}).catch(m)}const Se=`
 query CHECK_COMPANY_CREDIT_ENABLED {
   storeConfig{
     company_credit_enabled
   }
  }
`,wt=async()=>{var e,t,a;try{const n=await d(Se,{method:"GET",cache:"no-cache"});return(e=n.errors)!=null&&e.length?{creditEnabled:!1,error:"Unable to check company credit configuration"}:((a=(t=n.data)==null?void 0:t.storeConfig)==null?void 0:a.company_credit_enabled)===!0?{creditEnabled:!0}:{creditEnabled:!1,error:"Company credit is not enabled in store configuration"}}catch{return{creditEnabled:!1,error:"Company credit functionality not available"}}},Oe=`
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
`,Pe=e=>{var r,i,s,c,o;const t=(r=e.regionCode)==null?void 0:r.trim(),a=(i=e.region)==null?void 0:i.trim();let n;if(t)n={region_code:t,...e.regionId&&{region_id:typeof e.regionId=="string"?parseInt(e.regionId,10):e.regionId}};else if(a!=null&&a.includes(",")){const[u,l]=a.split(",");n={region_code:u.trim(),region_id:parseInt(l.trim(),10)}}else{if(a&&/^\d+$/.test(a))throw new Error("Region selection error: Missing region code. Please ensure regions are properly loaded.");a?n={region:a,region_code:a}:n={region:"",region_code:"",region_id:0}}return{company_name:e.companyName||"",company_email:e.companyEmail||"",legal_name:e.legalName,vat_tax_id:e.vatTaxId,reseller_id:e.resellerId,legal_address:{street:Array.isArray(e.street)?e.street.filter(u=>typeof u=="string"&&u.trim()!==""):[e.street].filter(u=>typeof u=="string"&&u.trim()!==""),city:e.city||"",region:n,postcode:e.postcode||"",country_id:e.countryCode||"",telephone:e.addressTelephone},company_admin:{email:e.adminEmail||"",firstname:((s=e.adminFirstname)==null?void 0:s.trim())||"",lastname:((c=e.adminLastname)==null?void 0:c.trim())||"",job_title:e.adminJobTitle,telephone:e.adminWorkTelephone,gender:e.adminGender?typeof e.adminGender=="string"?parseInt(e.adminGender,10):e.adminGender:void 0,custom_attributes:((o=e.adminCustomAttributes)==null?void 0:o.map(u=>({attribute_code:u.attribute_code,value:u.value})))||[]}}},St=async e=>{var t;try{const a=Pe(e),n=await d(Oe,{method:"POST",variables:{input:a}});return(t=n.errors)!=null&&t.length?{success:!1,errors:n.errors.map(i=>i.message)}:{success:!0,company:ne(n)}}catch(a){return console.error("Failed to create company:",a),{success:!1,errors:["Failed to create company. Please try again."]}}},Ue=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function Ot(e){const t={name:e.name,description:e.description,target_id:e.targetId};return await d(Ue,{variables:{input:t}}).then(a=>{var r,i,s;if((r=a.errors)!=null&&r.length)return _(a.errors);const n=(s=(i=a==null?void 0:a.data)==null?void 0:i.createCompanyTeam)==null?void 0:s.team;return n?{id:n.id,structureId:n.structure_id,name:n.name}:null}).catch(m)}const Ye=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname job_title } }
  }
`;async function Pt(e){const t={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await d(Ye,{variables:{input:t}}).then(a=>{var r,i,s;if((r=a.errors)!=null&&r.length)return _(a.errors);const n=(s=(i=a==null?void 0:a.data)==null?void 0:i.createCompanyUser)==null?void 0:s.user;return n?{id:n.id,structureId:n.structure_id,jobTitle:n.job_title}:null}).catch(m)}const Ge=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function Ut(e){return await d(Ge,{variables:{id:e}}).then(t=>{var a,n;return(a=t.errors)!=null&&a.length?_(t.errors):!!((n=t==null?void 0:t.data)!=null&&n.deleteCompanyTeam)}).catch(m)}const $e=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,Yt=async e=>{var n,r;const{id:t}=e;if(!t)throw new Error("User ID is required to delete a company user");const a=await d($e,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(m);return(n=a.errors)!=null&&n.length&&_(a.errors),(r=a.data)!=null&&r.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}},Le=`
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
`,Fe=`
  fragment COMPANY_BASIC_INFO_FRAGMENT on Company {
    id
    name
    email
    legal_name
    vat_tax_id
    reseller_id
  }
`,De=`
  fragment COMPANY_SALES_REPRESENTATIVE_FRAGMENT on CompanySalesRepresentative {
    firstname
    lastname
    email
  }
`,qe=`
  fragment COMPANY_ADMIN_FRAGMENT on Customer {
    id
    firstname
    lastname
    email
    job_title
  }
`,x=e=>{const t=e.has("Magento_Company::view_account"),a=e.has("Magento_Company::view_address"),n=e.has("Magento_Company::contacts"),r=e.has("Magento_Company::payment_information"),i=e.has("Magento_Company::shipping_information"),s=[],c=[];return t&&(s.push("...COMPANY_BASIC_INFO_FRAGMENT"),c.push(Fe)),a&&(s.push("legal_address { ...COMPANY_LEGAL_ADDRESS_FRAGMENT }"),c.push(Le)),n&&(s.push("company_admin { ...COMPANY_ADMIN_FRAGMENT }"),s.push("sales_representative { ...COMPANY_SALES_REPRESENTATIVE_FRAGMENT }"),c.push(qe),c.push(De)),r&&s.push("available_payment_methods { code title }"),i&&s.push("available_shipping_methods { code title }"),{fields:s,usedFragments:c}},xe=e=>{const{fields:t,usedFragments:a}=x(e);return t.length===0?`
      query GET_COMPANY_DYNAMIC {
        company { __typename }
      }
    `:`${`
    query GET_COMPANY_DYNAMIC {
      company {
        ${t.join(`
        `)}
      }
    }
  `}
${a.join(`
`)}`},Ve=e=>{const{fields:t,usedFragments:a}=x(e);return t.length===0?`
      mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
        updateCompany(input: $input) {
          company { __typename }
        }
      }
    `:`${`
    mutation UPDATE_COMPANY_DYNAMIC($input: CompanyUpdateInput!) {
      updateCompany(input: $input) {
        company {
          ${t.join(`
          `)}
        }
      }
    }
  `}
${a.join(`
`)}`};async function Gt(){return await q().then(async({allowedIds:e,roleResponse:t})=>{var s,c,o;const a=xe(e),n=await d(a,{method:"GET",cache:"no-cache"});if((s=n.errors)!=null&&s.length)return _(n.errors);const r=(c=n==null?void 0:n.data)==null?void 0:c.company;return r&&Object.keys(r).some(u=>u!=="__typename")?(n!=null&&n.data&&((o=t==null?void 0:t.data)!=null&&o.customer)&&(n.data.customer=t.data.customer),D(n)):null}).catch(m)}const He=`
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
`,$t=async()=>await d(He,{method:"GET",cache:"no-cache"}).then(e=>{var a;return(a=e.errors)!=null&&a.length?null:Ie(e)}).catch(m),je=`
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
`,Lt=async(e={})=>{const{filter:t,pageSize:a=20,currentPage:n=1}=e,r=t?{custom_reference_number:t.customReferenceNumber,operation_type:t.operationType,updated_by:t.updatedBy}:null;return await d(je,{method:"GET",cache:"no-cache",variables:{filter:r,pageSize:a,currentPage:n}}).then(i=>{var c;return(c=i.errors)!=null&&c.length?null:Te(i)}).catch(m)};var ze=(e=>(e.ALLOCATION="ALLOCATION",e.UPDATE="UPDATE",e.PURCHASE="PURCHASE",e.REIMBURSEMENT="REIMBURSEMENT",e))(ze||{});const Be=`
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
  ${$}
`;async function Ft(){return await d(Be,{method:"GET",cache:"no-cache"}).then(e=>{var n;if((n=e.errors)!=null&&n.length)return _(e.errors);const t=e.data.customer.company_hierarchy,a=e.data.customer.companies.items;return re(t,a)}).catch(m)}const ke=`
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
`;async function Dt(){return await d(ke,{method:"GET",cache:"no-cache"}).then(e=>{var a;if((a=e.errors)!=null&&a.length)return _(e.errors);const t=e.data.company.structure;return pe(t)}).catch(m)}const Qe=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function qt(e){return await d(Qe,{variables:{id:e}}).then(t=>{var n,r,i;if((n=t.errors)!=null&&n.length)return _(t.errors);const a=(i=(r=t==null?void 0:t.data)==null?void 0:r.company)==null?void 0:i.team;return a?ye(a):null}).catch(m)}const We=`
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
`;async function xt(e){return await d(We,{variables:{id:e}}).then(t=>{var n,r,i;if((n=t.errors)!=null&&n.length)return _(t.errors);const a=(i=(r=t==null?void 0:t.data)==null?void 0:r.company)==null?void 0:i.user;return a?ge(a):null}).catch(m)}const Ke=`
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
`,Vt=async(e={})=>{var r,i,s,c;const{pageSize:t=20,currentPage:a=1,filter:n}=e;try{const o=await d(Ke,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:a,filter:n}}).catch(m);return(r=o.errors)!=null&&r.length&&_(o.errors),(c=(s=(i=o.data)==null?void 0:i.company)==null?void 0:s.users)!=null&&c.items?{users:o.data.company.users.items.map(l=>({id:l.id,firstName:l.firstname,lastName:l.lastname,email:l.email,role:l.role.name,status:l.status,...l.team&&{team:l.team.name}})),pageInfo:{pageSize:o.data.company.users.page_info.page_size,currentPage:o.data.company.users.page_info.current_page,totalPages:o.data.company.users.page_info.total_pages},totalCount:o.data.company.users.total_count}:{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:t,currentPage:a,totalPages:1}}}},Xe=`
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
`,Ht=async()=>{const e="_company_countries",t=sessionStorage.getItem(e);return t?JSON.parse(t):await d(Xe,{method:"GET"}).then(a=>{var r;if((r=a.errors)!=null&&r.length)return _(a.errors);const n=Ce(a);return sessionStorage.setItem(e,JSON.stringify(n)),n}).catch(m)},Je=`
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
`,jt=async()=>{var e,t,a;try{const n=await d(Je,{method:"POST"});if((e=n.errors)!=null&&e.length)return!1;const r=(t=n.data)==null?void 0:t.customer;if(!r)return!1;const i=((a=r.companies)==null?void 0:a.items)??[];if(!Array.isArray(i)||i.length===0)return!1;const s=r.role;return s?s.id==="0"||typeof s.id=="number"&&s.id===0||s.name==="Company Administrator":!1}catch(n){return console.error("Error checking if customer is company admin:",n),!1}},Ze=`
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
`,zt=async()=>{var e,t,a,n;try{const r=await d(Ze,{method:"POST"});if((e=r.errors)!=null&&e.length)return!1;const i=((n=(a=(t=r==null?void 0:r.data)==null?void 0:t.customer)==null?void 0:a.companies)==null?void 0:n.items)??[];return Array.isArray(i)&&i.length>0}catch{return!1}},et=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function Bt(e){return await d(et,{variables:{email:e}}).then(t=>{var a,n,r;return(a=t.errors)!=null&&a.length?_(t.errors):((r=(n=t==null?void 0:t.data)==null?void 0:n.isCompanyUserEmailAvailable)==null?void 0:r.is_email_available)??null}).catch(m)}const kt=async e=>await q().then(async({allowedIds:t,roleResponse:a})=>{var s,c;const n=Ve(t),r={};if(e.name!==void 0&&(r.company_name=e.name),e.email!==void 0&&(r.company_email=e.email),e.legalName!==void 0&&(r.legal_name=e.legalName),e.vatTaxId!==void 0&&(r.vat_tax_id=e.vatTaxId),e.resellerId!==void 0&&(r.reseller_id=e.resellerId),e.legalAddress!==void 0&&t.has("Magento_Company::edit_address")){let o;Array.isArray(e.legalAddress.street)?(o=[...e.legalAddress.street],e.legalAddress.street2&&o.push(e.legalAddress.street2)):o=[e.legalAddress.street,e.legalAddress.street2].filter(l=>typeof l=="string"&&l.trim().length>0),o=o.filter(l=>l&&typeof l=="string"&&l.trim().length>0);let u;if(e.legalAddress.region&&typeof e.legalAddress.region=="object"){const l=e.legalAddress.region;l.region===l.regionCode?u={region:l.region,region_code:l.regionCode,region_id:0}:u={region:l.region,region_code:l.regionCode}}else e.legalAddress.regionCode&&e.legalAddress.region!==e.legalAddress.regionCode?u={region:e.legalAddress.region||e.legalAddress.regionCode,region_code:e.legalAddress.regionCode}:e.legalAddress.region&&(u={region:e.legalAddress.region,region_code:e.legalAddress.region,region_id:0});r.legal_address={street:o,city:e.legalAddress.city,region:u,country_id:e.legalAddress.countryCode,postcode:e.legalAddress.postcode,telephone:e.legalAddress.telephone}}const i=await d(n,{method:"POST",variables:{input:r}});return(s=i.errors)!=null&&s.length?_(i.errors):(i.data.customer=(c=a==null?void 0:a.data)==null?void 0:c.customer,D(i))}).catch(m),tt=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function Qt(e){const t={treeId:e.id,parentTreeId:e.parentId};return await d(tt,{variables:t}).then(a=>{var n,r;return(n=a.errors)!=null&&n.length?_(a.errors):!!((r=a==null?void 0:a.data)!=null&&r.updateCompanyStructure)}).catch(m)}const at=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function Wt(e){const t={id:e.id,name:e.name,description:e.description};return await d(at,{variables:{input:t}}).then(a=>{var n,r,i,s;return(n=a.errors)!=null&&n.length?_(a.errors):!!((s=(i=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyTeam)==null?void 0:i.team)!=null&&s.id)}).catch(m)}const nt=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function Kt(e){const t={id:e.id,email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await d(nt,{variables:{input:t}}).then(a=>{var n,r,i,s;return(n=a.errors)!=null&&n.length?_(a.errors):!!((s=(i=(r=a==null?void 0:a.data)==null?void 0:r.updateCompanyUser)==null?void 0:i.user)!=null&&s.id)}).catch(m)}const rt=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,Xt=async e=>{var r,i,s;const{id:t,status:a}=e;if(!t)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const n=await d(rt,{method:"POST",cache:"no-cache",variables:{input:{id:t,status:a}}}).catch(m);return(r=n.errors)!=null&&r.length&&_(n.errors),(s=(i=n.data)==null?void 0:i.updateCompanyUser)!=null&&s.user?{success:!0,user:{id:n.data.updateCompanyUser.user.id,status:n.data.updateCompanyUser.user.status}}:{success:!1}},ot=`
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
  ${$}
`;async function Jt(e){return await d(ot,{variables:{input:{child_company_id:e}}}).then(a=>{var r;if((r=a.errors)!=null&&r.length)return _(a.errors);const n=a.data.unassignChildCompany.company_hierarchy;return Y(n)}).catch(m)}const it=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,Zt=async e=>{try{const t=await d(it,{variables:{email:e}});return t.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:t.data.isCompanyEmailAvailable.is_email_available,error:t.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}},w=`
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
`,st=`
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
  ${w}
`,ct=`
  query GetCompanyRole($id: ID!) {
    company {
      role(id: $id) {
        ...CompanyRoleFragment
      }
    }
  }
  ${w}
`,dt=`
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
`,lt=`
  query IsCompanyRoleNameAvailable($name: String!) {
    isCompanyRoleNameAvailable(name: $name) {
      is_role_name_available
    }
  }
`,ea=async(e={})=>{try{const t=await d(st,{variables:e,method:"GET",cache:"no-cache"});return se(t)}catch(t){return m(t)}},ta=async e=>{try{const t=await d(ct,{variables:e,method:"GET",cache:"no-cache"});return ce(t)}catch(t){return m(t)}},aa=async()=>{try{const e=await d(dt,{method:"GET",cache:"force-cache"});return de(e)}catch(e){return m(e)}},mt=`
  mutation CreateCompanyRole($input: CompanyRoleCreateInput!) {
    createCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${w}
`,ut=`
  mutation UpdateCompanyRole($input: CompanyRoleUpdateInput!) {
    updateCompanyRole(input: $input) {
      role {
        ...CompanyRoleFragment
      }
    }
  }
  ${w}
`,_t=`
  mutation DeleteCompanyRole($id: ID!) {
    deleteCompanyRole(id: $id) {
      success
    }
  }
`,na=async e=>{try{const t={input:ue(e)},a=await d(mt,{variables:t,method:"POST"});return le(a)}catch(t){return m(t)}},ra=async e=>{try{const t={input:_e(e)},a=await d(ut,{variables:t,method:"POST"});return me(a)}catch(t){return m(t)}},oa=async e=>{var t;try{const a=await d(_t,{variables:e,method:"POST"});return(t=a.errors)!=null&&t.length?_(a.errors):a.data.deleteCompanyRole.success}catch(a){return m(a)}},ia=async e=>{var t;try{const a=await d(lt,{variables:e,method:"GET",cache:"no-cache"});return(t=a.errors)!=null&&t.length?_(a.errors):a.data.isCompanyRoleNameAvailable.is_role_name_available}catch(a){return m(a)}},sa=e=>X(e),ca=(e,t)=>{const a=new Set(t),n=r=>{var s;const i=((s=r.children)==null?void 0:s.map(n).filter(c=>c!==null))||[];return a.has(r.id)||i.length>0?{...r,children:i}:null};return e.map(n).filter(r=>r!==null)};export{ze as CompanyCreditOperationType,Ee as DEFAULT_COUNTRY,Q as E,O as STORE_CONFIG_DEFAULTS,bt as a,Nt as acceptCompanyInvitation,vt as allowCompanyRegistration,Rt as assignChildCompany,Z as b,ca as buildPermissionTree,Mt as c,wt as checkCompanyCreditEnabled,ae as companyEnabled,Ct as config,St as createCompany,na as createCompanyRole,Ot as createCompanyTeam,Pt as createCompanyUser,At as d,oa as deleteCompanyRole,Ut as deleteCompanyTeam,Yt as deleteCompanyUser,X as f,d as fetchGraphQl,q as fetchUserPermissions,sa as flattenPermissionIds,Gt as getCompany,aa as getCompanyAclResources,$t as getCompanyCredit,Lt as getCompanyCreditHistory,Ft as getCompanyHierarchy,ta as getCompanyRole,ea as getCompanyRoles,Dt as getCompanyStructure,qt as getCompanyTeam,xt as getCompanyUser,Vt as getCompanyUsers,k as getConfig,Ht as getCountries,be as getCustomerCompany,It as getStoreConfig,U as i,F as initialize,jt as isCompanyAdmin,ia as isCompanyRoleNameAvailable,zt as isCompanyUser,Bt as isCompanyUserEmailAvailable,Et as p,B as removeFetchGraphQlHeader,Tt as s,ht as setEndpoint,z as setFetchGraphQlHeader,ft as setFetchGraphQlHeaders,Jt as unassignChildCompany,kt as updateCompany,ra as updateCompanyRole,Qt as updateCompanyStructure,Wt as updateCompanyTeam,Kt as updateCompanyUser,Xt as updateCompanyUserStatus,Zt as validateCompanyEmail};
//# sourceMappingURL=api.js.map
