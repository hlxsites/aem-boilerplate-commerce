/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as e}from"./network-error.js";import{s as w}from"./setReCaptchaToken.js";import{f as i}from"./fetch-graphql.js";const m=`
  mutation RESET_PASSWORD(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }
`,d=a=>{var r,s,o;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(s=a==null?void 0:a.errors[0])==null?void 0:s.message),{message:t,success:!!((o=a==null?void 0:a.data)!=null&&o.resetPassword)}},h=async(a,t,r)=>(await w(),await i(m,{method:"POST",variables:{email:a,resetPasswordToken:t,newPassword:r}}).then(s=>d(s)).catch(e));export{h as r};
