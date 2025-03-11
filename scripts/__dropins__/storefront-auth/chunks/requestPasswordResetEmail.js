/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as E}from"./network-error.js";import{s as l}from"./setReCaptchaToken.js";import{f as e}from"./fetch-graphql.js";const R=a=>{var r,m,i;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(m=a==null?void 0:a.errors[0])==null?void 0:m.message),{message:t,success:!!((i=a==null?void 0:a.data)!=null&&i.requestPasswordResetEmail)}},c=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,s=async a=>(await l(),await e(c,{method:"POST",variables:{email:a}}).then(t=>R(t)).catch(E));export{s as r};
