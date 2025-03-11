/*! Copyright 2025 Adobe
All Rights Reserved. */
import{CUSTOMER_INFORMATION_FRAGMENT as N}from"../fragments.js";import{h as m}from"./network-error.js";import{s as I}from"./setReCaptchaToken.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{merge as U}from"@dropins/tools/lib.js";import{c as g}from"./initialize.js";import{f as u}from"./fetch-graphql.js";import{t as $}from"./transform-attributes-form.js";import{h as F}from"./getStoreConfig.js";const v=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${N}
`,y=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${N}
`,G=(r,e)=>{var i,a,c,n,C,l,f,_,E,T,R,A,b,h,d,S,M,O,s,p;let o;if(e){const{data:t}=r;o={firstName:((a=(i=t==null?void 0:t.createCustomerV2)==null?void 0:i.customer)==null?void 0:a.firstname)??"",lastName:((n=(c=t==null?void 0:t.createCustomerV2)==null?void 0:c.customer)==null?void 0:n.lastname)??"",email:((l=(C=t==null?void 0:t.createCustomerV2)==null?void 0:C.customer)==null?void 0:l.email)??"",isSubscribed:((_=(f=t==null?void 0:t.createCustomerV2)==null?void 0:f.customer)==null?void 0:_.is_subscribed)??!1,customAttributes:((E=t==null?void 0:t.createCustomerV2)==null?void 0:E.custom_attributes)??[],errors:(r==null?void 0:r.errors)??[]}}else{const{data:t}=r;o={firstName:((R=(T=t==null?void 0:t.createCustomer)==null?void 0:T.customer)==null?void 0:R.firstname)??"",lastName:((b=(A=t==null?void 0:t.createCustomer)==null?void 0:A.customer)==null?void 0:b.lastname)??"",email:((d=(h=t==null?void 0:t.createCustomer)==null?void 0:h.customer)==null?void 0:d.email)??"",isSubscribed:((M=(S=t==null?void 0:t.createCustomer)==null?void 0:S.customer)==null?void 0:M.is_subscribed)??!1,errors:(r==null?void 0:r.errors)??[]}}return U(o,(p=(s=(O=g.getConfig().models)==null?void 0:O.CustomerModel)==null?void 0:s.transformer)==null?void 0:p.call(s,r))},V=r=>{if(!r.dob)return r;const{dob:e,...o}=r;return{...o,date_of_birth:e}},K=async(r,e)=>{await I();const o=await u(e?y:v,{method:"POST",variables:{input:{...V(r)}}}).catch(m);return G(o,e)},w=`
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
`,L=async r=>await u(w,{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?F(e.errors):$(e)}).catch(m),D=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,W=async r=>await u(D,{method:"POST",variables:{input:r}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?F(e.errors):e.data.createCustomerAddress.firstname||""}).catch(m);export{W as a,K as c,L as g};
