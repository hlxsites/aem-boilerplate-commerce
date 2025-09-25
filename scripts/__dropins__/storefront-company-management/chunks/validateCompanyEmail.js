/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as e}from"./fetch-error.js";const l=`
  query validateCompanyEmail($email: String!) {
    isCompanyEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,s=async i=>{try{const a=await e(l,{variables:{email:i}});return a.errors?{isValid:!1,error:"Unable to validate email"}:{isValid:a.data.isCompanyEmailAvailable.is_email_available,error:a.data.isCompanyEmailAvailable.is_email_available?void 0:"This email is already used by another company"}}catch{return{isValid:!1,error:"Unable to validate email"}}};export{s as v};
//# sourceMappingURL=validateCompanyEmail.js.map
