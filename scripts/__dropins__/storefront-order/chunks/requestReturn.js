/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as E,a as c}from"./network-error.js";import{f as m,h as _}from"./fetch-graphql.js";import{t as T}from"./transform-attributes-form.js";import{merge as d}from"@dropins/tools/lib.js";import{e as l}from"./initialize.js";const f=`
  fragment REQUEST_RETURN_ORDER_FRAGMENT on Return {
    __typename
    uid
    status
    number
    created_at
  }
`,h=t=>{var u,i,R,o,n,s;if(!((i=(u=t==null?void 0:t.data)==null?void 0:u.requestReturn)!=null&&i.return))return{};const{created_at:e,...r}=t.data.requestReturn.return,a={...r,createdAt:e};return d(a,(s=(n=(o=(R=l.getConfig())==null?void 0:R.models)==null?void 0:o.RequestReturnModel)==null?void 0:n.transformer)==null?void 0:s.call(n,t.data.requestReturn.return))},y=`
  query GET_ATTRIBUTES_LIST($entityType: AttributeEntityTypeEnum!) {
    attributesList(entityType: $entityType) {
      items {
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
        ... on ReturnItemAttributeMetadata {
          sort_order
        }
        code
        label
        default_value
        frontend_input
        is_unique
        is_required
        options {
          is_default
          label
          value
        }
      }
      errors {
        type
        message
      }
    }
  }
`,N=async t=>await m(y,{method:"GET",cache:"force-cache",variables:{entityType:t}}).then(e=>{var r,a,u;return(r=e.errors)!=null&&r.length?_(e.errors):T((u=(a=e==null?void 0:e.data)==null?void 0:a.attributesList)==null?void 0:u.items)}).catch(E),b=`
  mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
    requestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${f}
`,p=async t=>{const e=c(t,"snakeCase",{});return await m(b,{method:"POST",variables:{input:e}}).then(r=>{var a;return(a=r.errors)!=null&&a.length?_(r.errors):h(r)}).catch(E)};export{N as g,p as r};
