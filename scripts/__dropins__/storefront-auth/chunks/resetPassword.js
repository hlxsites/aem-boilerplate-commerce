import{c as w,f as o,h as d}from"./setReCaptchaToken.js";const P=`
  mutation RESET_PASSWORD($email: String!, $resetPasswordToken: String!, $newPassword: String!){
    resetPassword(email: $email,resetPasswordToken: $resetPasswordToken,newPassword: $newPassword)
  }
`,i=a=>{var r,s,e;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(s=a==null?void 0:a.errors[0])==null?void 0:s.message),{message:t,success:!!((e=a==null?void 0:a.data)!=null&&e.resetPassword)}},m=async(a,t,r)=>(await w(),await o(P,{method:"POST",variables:{email:a,resetPasswordToken:t,newPassword:r}}).then(s=>i(s)).catch(d));export{m as r};
