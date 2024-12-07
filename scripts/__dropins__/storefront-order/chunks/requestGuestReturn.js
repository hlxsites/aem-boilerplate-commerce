/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as i,a as _}from"./network-error.js";import{f as s,h as o}from"./fetch-graphql.js";import{t as d}from"./transform-attributes-form.js";import{R as m}from"./RequestReturnOrderFragment.graphql.js";import{merge as l}from"@dropins/tools/lib.js";import{e as f}from"./initialize.js";const h=r=>{var u,n,E,c,R,T;if(!((n=(u=r==null?void 0:r.data)==null?void 0:u.requestReturn)!=null&&n.return))return{};const{created_at:e,...t}=r.data.requestReturn.return,a={...t,createdAt:e};return l(a,(T=(R=(c=(E=f.getConfig())==null?void 0:E.models)==null?void 0:c.RequestReturnModel)==null?void 0:R.transformer)==null?void 0:T.call(R,r.data.requestReturn.return))},U=`
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
`,g=async r=>await s(U,{method:"GET",cache:"force-cache",variables:{entityType:r}}).then(e=>{var t,a,u;return(t=e.errors)!=null&&t.length?o(e.errors):d((u=(a=e==null?void 0:e.data)==null?void 0:a.attributesList)==null?void 0:u.items)}).catch(i),q=`
  mutation REQUEST_RETURN_ORDER($input: RequestReturnInput!) {
    requestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${m}
`,O=async r=>{const e=_(r,"snakeCase",{});return await s(q,{method:"POST",variables:{input:e}}).then(t=>{var a;return(a=t.errors)!=null&&a.length?o(t.errors):h(t)}).catch(i)},S=`
  mutation REQUEST_RETURN_GUEST_ORDER($input: RequestGuestReturnInput!) {
    requestGuestReturn(input: $input) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
      }
    }
  }
  ${m}
`,v=async r=>{const e=_(r,"snakeCase",{});return await s(S,{method:"POST",variables:{input:e}}).then(t=>{var n;if((n=t.errors)!=null&&n.length)return o(t.errors);const{created_at:a,...u}=t.data.requestGuestReturn.return;return{...u,createdAt:a}}).catch(i)};export{v as a,g,O as r};
