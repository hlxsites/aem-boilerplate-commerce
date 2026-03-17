/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as $,f as B,h as D,a as P,m as k}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as q}from"../fragments.js";import{c as K}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as L}from"@dropins/tools/lib.js";const Q=t=>{var m,u,i,l,_,f,h,C,o,E,T,g,N,S,b,O,A,M,R,U,w,G,v,x,F,I,d,V;const a=(i=(u=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:u.custom_attributes)==null?void 0:i.filter(r=>r).reduce((r,y)=>(r[$(y.code)]=y.value??"",r),{}),c={email:((_=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:_.email)||"",firstName:((h=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:h.firstname)||"",lastName:((o=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:o.lastname)||"",middleName:((T=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:T.middlename)||"",gender:((N=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:N.gender)||"1",dateOfBirth:((b=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:b.date_of_birth)||"",prefix:((A=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:A.prefix)||"",suffix:((R=(M=t==null?void 0:t.data)==null?void 0:M.customer)==null?void 0:R.suffix)||"",createdAt:((w=(U=t==null?void 0:t.data)==null?void 0:U.customer)==null?void 0:w.created_at)||"",allowRemoteShoppingAssistance:(v=(G=t==null?void 0:t.data)==null?void 0:G.customer)==null?void 0:v.allow_remote_shopping_assistance,...a};return L(c,(V=(d=(I=(F=(x=K)==null?void 0:x.getConfig())==null?void 0:F.models)==null?void 0:I.CustomerDataModelShort)==null?void 0:d.transformer)==null?void 0:V.call(d,t.data))},j=`
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
  ${q}
`,Z=async()=>await B(j,{method:"GET",cache:"no-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?D(t.errors):Q(t)}).catch(P),z=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,e=async t=>await B(z,{method:"POST",variables:{input:k(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(a=>{var c,m,u,i;return(c=a.errors)!=null&&c.length?D(a.errors):((i=(u=(m=a==null?void 0:a.data)==null?void 0:m.updateCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)||""}).catch(P);export{Z as g,e as u};
//# sourceMappingURL=updateCustomer.js.map
