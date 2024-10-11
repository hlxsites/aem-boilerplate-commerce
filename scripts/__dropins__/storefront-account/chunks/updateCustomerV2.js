import{n as M,f as d,l,m as h,k as $}from"./removeCustomerAddress.js";const y=t=>{var r,m,u,c,i,_,C,f,e,E,o,g,T,w,S,n,O,P,b,U,A,R;const a=(m=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:m.custom_attributes.reduce((G,N)=>(G[M(N.code)]=N.value??"",G),{});return{email:((c=(u=t==null?void 0:t.data)==null?void 0:u.customer)==null?void 0:c.email)||"",firstName:((_=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:_.firstname)||"",lastName:((f=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:f.lastname)||"",middleName:((E=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:E.middlename)||"",gender:(g=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:g.gender,dob:((w=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:w.dob)||"",dateOfBirth:((n=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:n.date_of_birth)||"",prefix:((P=(O=t==null?void 0:t.data)==null?void 0:O.customer)==null?void 0:P.prefix)||"",suffix:((U=(b=t==null?void 0:t.data)==null?void 0:b.customer)==null?void 0:U.suffix)||"",createdAt:((R=(A=t==null?void 0:t.data)==null?void 0:A.customer)==null?void 0:R.created_at)||"",...a}},v=t=>{var a,r,m,u;return{minLength:((r=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:r.minimum_password_length)||3,requiredCharacterClasses:+((u=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:u.required_character_classes_number)||0}},x=`
  query GET_CUSTOMER {
  customer {
    custom_attributes {
    ... on AttributeValue {
        code
        value
      }
      code
    }
    date_of_birth
    dob
    email
    firstname
    gender
    lastname
    middlename
    prefix
    suffix
    created_at
    }
  }
`,k=async()=>await d(x,{method:"GET",cache:"no-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?l(t.errors):y(t)}).catch(h),D=`
  mutation CHANGE_CUSTOMER_PASSWORD($currentPassword: String!, $newPassword: String!) {
    changeCustomerPassword(currentPassword: $currentPassword, newPassword: $newPassword) {
      email
    }
  }
`,F=async({currentPassword:t,newPassword:a})=>await d(D,{method:"POST",variables:{currentPassword:t,newPassword:a}}).then(r=>{var m,u,c;return(m=r.errors)!=null&&m.length?l(r.errors):((c=(u=r==null?void 0:r.data)==null?void 0:u.changeCustomerPassword)==null?void 0:c.email)||""}).catch(h),V=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
    }
  }
`,H=async()=>await d(V,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?l(t.errors):v(t)}).catch(h),q=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String! $password: String!) {
    updateCustomerEmail(email:$email password:$password) {
      customer {
       email
      }
    }
  }
`,W=async({email:t,password:a})=>await d(q,{method:"POST",variables:{email:t,password:a}}).then(r=>{var m,u,c,i;return(m=r.errors)!=null&&m.length?l(r.errors):((i=(c=(u=r==null?void 0:r.data)==null?void 0:u.updateCustomerEmail)==null?void 0:c.customer)==null?void 0:i.email)||""}).catch(h),I=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input:$input) {
      customer {
       email
      }
    }
  }
`,B=async t=>await d(I,{method:"POST",variables:{input:$(t,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",custom_attributesV2:"custom_attributes"})}}).then(a=>{var r,m,u,c;return(r=a.errors)!=null&&r.length?l(a.errors):((c=(u=(m=a==null?void 0:a.data)==null?void 0:m.updateCustomerV2)==null?void 0:u.customer)==null?void 0:c.email)||""}).catch(h);export{H as a,B as b,F as c,k as g,W as u};
