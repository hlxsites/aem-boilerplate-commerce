/*! Copyright 2024 Adobe
All Rights Reserved. */
import{n as D,f as l,k as C,l as _,m as F}from"./removeCustomerAddress.js";import{c as y}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{merge as V}from"@dropins/tools/lib.js";const B=t=>{var r,u,i,d,f,o,e,E,h,S,T,g,w,O,A,P,M,R,U,N,n,b,$,G,c,I;const m=(i=(u=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:u.custom_attributes)==null?void 0:i.reduce((v,x)=>(v[D(x.code)]=x.value??"",v),{}),a={email:((f=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:f.email)||"",firstName:((e=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:e.firstname)||"",lastName:((h=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:h.lastname)||"",middleName:((T=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:T.middlename)||"",gender:((w=(g=t==null?void 0:t.data)==null?void 0:g.customer)==null?void 0:w.gender)||"1",dateOfBirth:((A=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:A.date_of_birth)||"",prefix:((M=(P=t==null?void 0:t.data)==null?void 0:P.customer)==null?void 0:M.prefix)||"",suffix:((U=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:U.suffix)||"",createdAt:((n=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:n.created_at)||"",...m};return V(a,(I=(c=(G=($=(b=y)==null?void 0:b.getConfig())==null?void 0:$.models)==null?void 0:G.CustomerDataModelShort)==null?void 0:c.transformer)==null?void 0:I.call(c,t.data))},k=`
  fragment BASIC_CUSTOMER_INFO_FRAGMENT on Customer {
    date_of_birth
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
  }
`,L=`
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
`,J=async()=>await l(L,{method:"GET",cache:"no-cache"}).then(t=>{var m;return(m=t.errors)!=null&&m.length?C(t.errors):B(t)}).catch(_),H=`
  mutation CHANGE_CUSTOMER_PASSWORD(
    $currentPassword: String!
    $newPassword: String!
  ) {
    changeCustomerPassword(
      currentPassword: $currentPassword
      newPassword: $newPassword
    ) {
      email
    }
  }
`,X=async({currentPassword:t,newPassword:m})=>await l(H,{method:"POST",variables:{currentPassword:t,newPassword:m}}).then(a=>{var r,u,i;return(r=a.errors)!=null&&r.length?C(a.errors):((i=(u=a==null?void 0:a.data)==null?void 0:u.changeCustomerPassword)==null?void 0:i.email)||""}).catch(_),W=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,Y=async({email:t,password:m})=>await l(W,{method:"POST",variables:{email:t,password:m}}).then(a=>{var r,u,i,d;return(r=a.errors)!=null&&r.length?C(a.errors):((d=(i=(u=a==null?void 0:a.data)==null?void 0:u.updateCustomerEmail)==null?void 0:i.customer)==null?void 0:d.email)||""}).catch(_),q=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
      }
    }
  }
`,Z=async t=>await l(q,{method:"POST",variables:{input:F(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",custom_attributesV2:"custom_attributes"})}}).then(m=>{var a,r,u,i;return(a=m.errors)!=null&&a.length?C(m.errors):((i=(u=(r=m==null?void 0:m.data)==null?void 0:r.updateCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)||""}).catch(_);export{Y as a,Z as b,J as g,X as u};
