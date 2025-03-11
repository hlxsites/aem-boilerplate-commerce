/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as E}from"@dropins/tools/event-bus.js";import{FetchGraphQL as p}from"@dropins/tools/fetch-graphql.js";const b=t=>t.replace(/_([a-z])/g,(o,e)=>e.toUpperCase()),C=t=>t.replace(/([A-Z])/g,o=>`_${o.toLowerCase()}`),g=(t,o,e)=>{const n=["string","boolean","number"],u=o==="camelCase"?b:C;return Array.isArray(t)?t.map(i=>n.includes(typeof i)||i===null?i:typeof i=="object"?g(i,o,e):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,a])=>{const r=e&&e[c]?e[c]:u(c);return i[r]=n.includes(typeof a)||a===null?a:g(a,o,e),i},{}):t},{setEndpoint:J,setFetchGraphQlHeader:Q,removeFetchGraphQlHeader:z,setFetchGraphQlHeaders:K,fetchGraphQl:s,getConfig:L}=new p().getMethods(),S=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,T=`
  query GET_ATTRIBUTES_FORM_SHORT {
    attributesForm(formCode: "customer_register_address") {
      items {
        frontend_input
        label
        code
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
        }
      }
    }
  }
`,_=t=>{throw t instanceof DOMException&&t.name==="AbortError"||E.emit("error",{source:"auth",type:"network",error:t}),t},m={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},y=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},f=t=>{const o=t.map(n=>n.message).join(" ");console.log("ACCOUNT errors :>handleFetchError> ",t);const e=t.some(({extensions:n})=>(console.log("extensions :>> ",n),(n==null?void 0:n.category)==="graphql-authentication"));if(console.log("ACCOUNT unauthorized :>> ",e),e){console.log("unauthorized :>> ",11);for(let n of Object.keys(m))console.log("key :>> ",n),y(m[n]);E.emit("authenticated",!1)}throw Error(o)},A=t=>{let o=[];for(const e of t)if(!(e.frontend_input!=="MULTILINE"||e.multiline_count<2))for(let n=2;n<=e.multiline_count;n++){const u={...e,is_required:!1,name:`${e.code}_multiline_${n}`,code:`${e.code}_multiline_${n}`,id:`${e.code}_multiline_${n}`};o.push(u)}return o},R=t=>{switch(t){case"middlename":return"middleName";case"firstname":return"firstName";case"lastname":return"lastName";default:return b(t)}},N=t=>{var o;return t!=null&&t.options?(o=t==null?void 0:t.options)==null?void 0:o.map(e=>({isDefault:(e==null?void 0:e.is_default)??!1,text:(e==null?void 0:e.label)??"",value:(e==null?void 0:e.value)??""})):[]},O=t=>{var i,c,a;const o=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!o.length)return[];const e=(a=o.filter(r=>{var l;return!((l=r.frontend_input)!=null&&l.includes("HIDDEN"))}))==null?void 0:a.map(({code:r,...l})=>{const h=r!=="country_id"?r:"country_code";return{...l,name:h,id:h,code:h}}),n=A(e);return e.concat(n).map(r=>({code:r==null?void 0:r.code,name:r==null?void 0:r.name,id:r==null?void 0:r.id,label:(r==null?void 0:r.label)??"",entityType:r==null?void 0:r.entity_type,className:(r==null?void 0:r.frontend_class)??"",defaultValue:(r==null?void 0:r.default_value)??"",fieldType:r==null?void 0:r.frontend_input,multilineCount:(r==null?void 0:r.multiline_count)??0,orderNumber:Number(r==null?void 0:r.sort_order)||0,isHidden:!1,isUnique:(r==null?void 0:r.is_unique)??!1,required:(r==null?void 0:r.is_required)??!1,validateRules:(r==null?void 0:r.validate_rules)??[],options:N(r),customUpperCode:R(r==null?void 0:r.code)})).sort((r,l)=>Number(r.orderNumber)-Number(l.orderNumber))},v=t=>{const o={};for(const e in t){const n=t[e];!Array.isArray(n)||n.length===0||(e==="custom_attributesV2"?n.forEach(u=>{typeof u=="object"&&"value"in u&&(o[u==null?void 0:u.code]=u==null?void 0:u.value)}):n.length>1?n.forEach((u,i)=>{i===0?o[e]=u:o[`${e}_multiline_${i+1}`]=u}):o[e]=n[0])}return o},I=t=>({prefix:(t==null?void 0:t.prefix)??"",suffix:(t==null?void 0:t.suffix)??"",firstname:(t==null?void 0:t.firstname)??"",lastname:(t==null?void 0:t.lastname)??"",middlename:(t==null?void 0:t.middlename)??""}),U=t=>({id:(t==null?void 0:t.id)??"",vat_id:(t==null?void 0:t.vat_id)??"",postcode:(t==null?void 0:t.postcode)??"",country_code:(t==null?void 0:t.country_code)??""}),$=t=>({company:(t==null?void 0:t.company)??"",telephone:(t==null?void 0:t.telephone)??"",fax:(t==null?void 0:t.fax)??""}),d=t=>{var e,n,u;return g({...I(t),...U(t),...$(t),city:(t==null?void 0:t.city)??"",region:{region:((e=t==null?void 0:t.region)==null?void 0:e.region)??"",region_code:((n=t==null?void 0:t.region)==null?void 0:n.region_code)??"",region_id:((u=t==null?void 0:t.region)==null?void 0:u.region_id)??""},default_shipping:(t==null?void 0:t.default_shipping)||!1,default_billing:(t==null?void 0:t.default_billing)||!1,...v(t)},"camelCase",{})},M=t=>{var n,u;const o=((u=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:u.addresses)||[];return o.length?o.map(d).sort((i,c)=>(Number(c.defaultBilling)||Number(c.defaultShipping))-(Number(i.defaultBilling)||Number(i.defaultShipping))):[]},G=t=>{var c,a;if(!((a=(c=t==null?void 0:t.data)==null?void 0:c.countries)!=null&&a.length))return{availableCountries:[],countriesWithRequiredRegion:[],optionalZipCountries:[]};const{countries:o,storeConfig:e}=t.data,n=e==null?void 0:e.countries_with_required_region.split(","),u=e==null?void 0:e.optional_zip_countries.split(",");return{availableCountries:o.filter(({two_letter_abbreviation:r,full_name_locale:l})=>!!(r&&l)).map(r=>{const{two_letter_abbreviation:l,full_name_locale:h}=r;return{value:l,text:h}}).sort((r,l)=>r.text.localeCompare(l.text)),countriesWithRequiredRegion:n,optionalZipCountries:u}},w=t=>{var e,n;return(n=(e=t==null?void 0:t.data)==null?void 0:e.country)!=null&&n.available_regions?t.data.country.available_regions.filter(u=>{if(!u)return!1;const{id:i,code:c,name:a}=u;return!!(i&&c&&a)}).map(u=>{const{id:i}=u;return{id:i,text:u.name,value:`${u.code},${u.id}`}}):[]},P=async t=>{const o=`_account_attributesForm_${t}`,e=sessionStorage.getItem(o);return e?JSON.parse(e):await s(t!=="shortRequest"?S:T,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return f(n.errors);const u=O(n);return sessionStorage.setItem(o,JSON.stringify(u)),u}).catch(_)},q=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,Z=async t=>await s(q,{method:"POST",variables:{input:g(t,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(o=>{var e,n,u;return(e=o.errors)!=null&&e.length?f(o.errors):((u=(n=o==null?void 0:o.data)==null?void 0:n.createCustomerAddress)==null?void 0:u.firstname)||""}).catch(_),F=`
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
        middlename
        fax
        prefix
        suffix
        city
        company
        country_code
        region {
          region
          region_code
          region_id
        }
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
        telephone
        id
        vat_id
        postcode
        street
        default_shipping
        default_billing
      }
    }
  }
`,W=async()=>await s(F,{method:"GET",cache:"no-cache"}).then(t=>{var o;return(o=t.errors)!=null&&o.length?f(t.errors):M(t)}).catch(_),x=`
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
    }
    storeConfig {
      countries_with_required_region
      optional_zip_countries
    }
  }
`,Y=async()=>{const t="_account_countries",o=sessionStorage.getItem(t);return o?JSON.parse(o):await s(x,{method:"GET",cache:"no-cache"}).then(e=>{var u;if((u=e.errors)!=null&&u.length)return f(e.errors);const n=G(e);return sessionStorage.setItem(t,JSON.stringify(n)),n}).catch(_)},k=`
  query GET_REGIONS($countryCode: String!) {
    country(id: $countryCode) {
      id
      available_regions {
        id
        code
        name
      }
    }
  }
`,X=async t=>{const o=`_account_regions_${t}`,e=sessionStorage.getItem(o);return e?JSON.parse(e):await s(k,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(n=>{var i;if((i=n.errors)!=null&&i.length)return f(n.errors);const u=w(n);return sessionStorage.setItem(o,JSON.stringify(u)),u}).catch(_)},V=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!, $input: CustomerAddressInput) {
    updateCustomerAddress(id: $id, input: $input) {
      firstname
    }
  }
`,D=async t=>{const{addressId:o,...e}=t;return o?await s(V,{method:"POST",variables:{id:o,input:g(e,"snakeCase",{custom_attributesV2:"custom_attributesV2",firstName:"firstname",lastName:"lastname",middleName:"middlename"})}}).then(n=>{var u,i,c;return(u=n.errors)!=null&&u.length?f(n.errors):((c=(i=n==null?void 0:n.data)==null?void 0:i.updateCustomerAddress)==null?void 0:c.firstname)||""}).catch(_):""},B=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id: $id)
  }
`,tt=async t=>await s(B,{method:"POST",variables:{id:t}}).then(o=>{var e;return(e=o.errors)!=null&&e.length?f(o.errors):o.data.deleteCustomerAddress}).catch(_);export{Q as a,K as b,P as c,Z as d,W as e,s as f,L as g,Y as h,X as i,tt as j,_ as k,f as l,b as m,g as n,C as o,z as r,J as s,d as t,D as u};
