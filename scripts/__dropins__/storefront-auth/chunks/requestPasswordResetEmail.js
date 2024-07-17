import{c as m,f as l,h as e}from"./setReCaptchaToken.js";const c=a=>{var r,E,i;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(E=a==null?void 0:a.errors[0])==null?void 0:E.message),{message:t,success:!!((i=a==null?void 0:a.data)!=null&&i.requestPasswordResetEmail)}},R=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,h=async a=>(await m(),await l(R,{method:"POST",variables:{email:a}}).then(t=>c(t)).catch(e));export{h as r};
