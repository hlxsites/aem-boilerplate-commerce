/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as P,f as y,h as B,a as D,m as $}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as k}from"../fragments.js";import{c as q}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as K}from"@dropins/tools/lib.js";const L=t=>{var i,a,u,c,d,r,o,h,C,g,E,T,S,N,b,A,O,R,M,U,w,v,F,G,e,x,l,I;const m=(u=(a=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:a.custom_attributes)==null?void 0:u.filter(_=>_).reduce((_,V)=>(_[P(V.code)]=V.value??"",_),{}),f={email:((d=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:d.email)||"",firstName:((o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.firstname)||"",lastName:((C=(h=t==null?void 0:t.data)==null?void 0:h.customer)==null?void 0:C.lastname)||"",middleName:((E=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:E.middlename)||"",gender:((S=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:S.gender)||"1",dateOfBirth:((b=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:b.date_of_birth)||"",prefix:((O=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:O.prefix)||"",suffix:((M=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:M.suffix)||"",createdAt:((w=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:w.created_at)||"",allowRemoteShoppingAssistance:(F=(v=t==null?void 0:t.data)==null?void 0:v.customer)==null?void 0:F.allow_remote_shopping_assistance,...m};return K(f,(I=(l=(x=(e=(G=q)==null?void 0:G.getConfig())==null?void 0:e.models)==null?void 0:x.CustomerDataModelShort)==null?void 0:l.transformer)==null?void 0:I.call(l,t.data))},Q=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        code
      }
    }
  }
  ${k}
`,Y=async()=>await y(Q,{method:"GET",cache:"no-cache"}).then(t=>{var m;return(m=t.errors)!=null&&m.length?B(t.errors):L(t)}).catch(D),j=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,Z=async t=>{const{allowRemoteShoppingAssistance:m,...f}=t,i=$(f,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"});return m!==void 0&&(i.allow_remote_shopping_assistance=m),await y(j,{method:"POST",variables:{input:i}}).then(a=>{var u,c,d,r;return(u=a.errors)!=null&&u.length?B(a.errors):((r=(d=(c=a==null?void 0:a.data)==null?void 0:c.updateCustomerV2)==null?void 0:d.customer)==null?void 0:r.email)||""}).catch(D)};export{Y as g,Z as u};
//# sourceMappingURL=updateCustomer.js.map
