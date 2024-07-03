import{f as i,h as l}from"./network-error.js";const R=a=>{var r,E,m;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(E=a==null?void 0:a.errors[0])==null?void 0:E.message),{message:t,success:!!((m=a==null?void 0:a.data)!=null&&m.requestPasswordResetEmail)}},S=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,e=async a=>await i(S,{method:"POST",variables:{email:a}}).then(t=>R(t)).catch(l);export{e as r};
//# sourceMappingURL=requestPasswordResetEmail.js.map
