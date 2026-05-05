/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as $,f as D,h as P,a as V,m as q}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as K}from"../fragments.js";import{c as L}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as Q}from"@dropins/tools/lib.js";const j=t=>{var m,i,c,_,f,o,h,C,E,T,e,g,S,b,N,O,A,M,R,U,v,w,G,x,y,F,l,I;const a=(c=(i=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:i.custom_attributes)==null?void 0:c.filter(d=>d).reduce((d,r)=>{var B;const k=$(r.code);return(B=r.selected_options)!=null&&B.length?d[k]=r.selected_options[0].value??"":d[k]=r.value??"",d},{}),u={email:((f=(_=t==null?void 0:t.data)==null?void 0:_.customer)==null?void 0:f.email)||"",firstName:((h=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:h.firstname)||"",lastName:((E=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:E.lastname)||"",middleName:((e=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:e.middlename)||"",gender:((S=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:S.gender)||"1",dateOfBirth:((N=(b=t==null?void 0:t.data)==null?void 0:b.customer)==null?void 0:N.date_of_birth)||"",prefix:((A=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:A.prefix)||"",suffix:((R=(M=t==null?void 0:t.data)==null?void 0:M.customer)==null?void 0:R.suffix)||"",createdAt:((v=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:v.created_at)||"",allowRemoteShoppingAssistance:(G=(w=t==null?void 0:t.data)==null?void 0:w.customer)==null?void 0:G.allow_remote_shopping_assistance,...a};return Q(u,(I=(l=(F=(y=(x=L)==null?void 0:x.getConfig())==null?void 0:y.models)==null?void 0:F.CustomerDataModelShort)==null?void 0:l.transformer)==null?void 0:I.call(l,t.data))},z=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        ... on AttributeSelectedOptions {
          code
          selected_options {
            value
          }
        }
        code
      }
    }
  }
  ${K}
`,n=async()=>await D(z,{method:"GET",cache:"no-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?P(t.errors):j(t)}).catch(V),H=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,p=async t=>await D(H,{method:"POST",variables:{input:q(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(a=>{var u,m,i,c;return(u=a.errors)!=null&&u.length?P(a.errors):((c=(i=(m=a==null?void 0:a.data)==null?void 0:m.updateCustomerV2)==null?void 0:i.customer)==null?void 0:c.email)||""}).catch(V);export{n as g,p as u};
//# sourceMappingURL=updateCustomer.js.map
