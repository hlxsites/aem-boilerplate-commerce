import{e as E,c as f,f as d,h as l,a as m}from"./convertCase.js";const T=`
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
`,C=`
  query GET_ATTRIBUTES_FORM_SHORT {
      attributesForm(formCode: customer_register_address) {
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
`,h=t=>{let e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let a=2;a<=r.multiline_count;a++){const n={...r,name:`${r.code}_${a}`,code:`${r.code}_${a}`,id:`${r.code}_${a}`};e.push(n)}return e},b=t=>{var o,u,s;const e=((u=(o=t==null?void 0:t.data)==null?void 0:o.attributesForm)==null?void 0:u.items)||[];if(!e.length)return[];const r=(s=e.filter(i=>{var c;return!((c=i.frontend_input)!=null&&c.includes("HIDDEN"))}))==null?void 0:s.map(({code:i,...c})=>{const _=i!=="country_id"?i:"country_code";return{...c,name:_,id:_,code:_}}),a=h(r);return r.concat(a).map(i=>{const c=E(i.code);return f({...i,customUpperCode:c},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((i,c)=>i.orderNumber-c.orderNumber)},R=t=>{var a,n;if(!((n=(a=t==null?void 0:t.data)==null?void 0:a.countries)!=null&&n.length))return[];const{countries:e}=t.data;return e.filter(({two_letter_abbreviation:o,full_name_locale:u})=>!!(o&&u)).map(o=>{const{two_letter_abbreviation:u,full_name_locale:s}=o;return{value:u,text:s}})},A=t=>{var r,a;return(a=(r=t==null?void 0:t.data)==null?void 0:r.country)!=null&&a.available_regions?t.data.country.available_regions.filter(n=>{if(!n)return!1;const{id:o,code:u,name:s}=n;return!!(o&&u&&s)}).map(n=>{const{id:o}=n;return{id:o,text:n.name,value:`${n.code},${n.id}`}}):[]},$=async t=>await d(t!=="shortRequest"?T:C,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?l(e.errors):b(e)}).catch(m),S=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input:$input) {
      firstname
    }
  }
`,O=async t=>await d(S,{method:"POST",variables:{input:f(t,"snakeCase",{customAttributesV2:"custom_attributesV2"})}}).then(e=>{var r,a,n;return(r=e.errors)!=null&&r.length?l(e.errors):((n=(a=e==null?void 0:e.data)==null?void 0:a.createCustomerAddress)==null?void 0:n.firstname)||""}).catch(m),y=`
  query GET_COUNTRIES_QUERY {
    countries {
      two_letter_abbreviation
      full_name_locale
    }
  }
`,U=async()=>await d(y,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?l(t.errors):R(t)}).catch(m),g=`
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
`,G=async t=>await d(g,{method:"GET",cache:"no-cache",variables:{countryCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?l(e.errors):A(e)}).catch(m),v=`
  mutation UPDATE_CUSTOMER_ADDRESS($id: Int!,
  $input: CustomerAddressInput) {
    updateCustomerAddress(id:$id, input:$input) {
      firstname
   }
  }
`,D=async t=>{const{addressId:e,...r}=t;return e?await d(v,{method:"POST",variables:{id:e,input:f(r,"snakeCase",{customAttributesV2:"custom_attributesV2"})}}).then(a=>{var n,o,u;return(n=a.errors)!=null&&n.length?l(a.errors):((u=(o=a==null?void 0:a.data)==null?void 0:o.updateCustomerAddress)==null?void 0:u.firstname)||""}).catch(m):""};export{U as a,G as b,O as c,$ as g,D as u};
