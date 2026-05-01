/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,c as i,h as o,a as n}from"./removeCustomerAddress.js";const c=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,l=async u=>await s(c,{method:"POST",variables:{input:i(u,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"})}}).then(t=>{var a,e,r,m;return(a=t.errors)!=null&&a.length?o(t.errors):((m=(r=(e=t==null?void 0:t.data)==null?void 0:e.updateCustomerV2)==null?void 0:r.customer)==null?void 0:m.email)||""}).catch(n);export{l as u};
//# sourceMappingURL=updateCustomer.js.map
