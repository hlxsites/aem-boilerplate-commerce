/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as u,h as i,a as d}from"./removeCustomerAddress.js";const n=`
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
`,l=async({currentPassword:o,newPassword:s})=>await u(n,{method:"POST",variables:{currentPassword:o,newPassword:s}}).then(a=>{var r,t,e;return(r=a.errors)!=null&&r.length?i(a.errors):((e=(t=a==null?void 0:a.data)==null?void 0:t.changeCustomerPassword)==null?void 0:e.email)||""}).catch(d),c=`
  mutation UPDATE_CUSTOMER_EMAIL($email: String!, $password: String!) {
    updateCustomerEmail(email: $email, password: $password) {
      customer {
        email
      }
    }
  }
`,h=async({email:o,password:s})=>await u(c,{method:"POST",variables:{email:o,password:s}}).then(a=>{var r,t,e,m;return(r=a.errors)!=null&&r.length?i(a.errors):((m=(e=(t=a==null?void 0:a.data)==null?void 0:t.updateCustomerEmail)==null?void 0:e.customer)==null?void 0:m.email)||""}).catch(d);export{l as a,h as u};
//# sourceMappingURL=updateCustomerEmail.js.map
