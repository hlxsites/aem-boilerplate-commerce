import{f as w,h as o}from"./network-error.js";const d=`
  mutation RESET_PASSWORD($email: String!, $resetPasswordToken: String!, $newPassword: String!){
    resetPassword(email: $email,resetPasswordToken: $resetPasswordToken,newPassword: $newPassword)
  }
`,P=a=>{var r,s,e;let t="";return(r=a==null?void 0:a.errors)!=null&&r.length&&(t=(s=a==null?void 0:a.errors[0])==null?void 0:s.message),{message:t,success:!!((e=a==null?void 0:a.data)!=null&&e.resetPassword)}},m=async(a,t,r)=>await w(d,{method:"POST",variables:{email:a,resetPasswordToken:t,newPassword:r}}).then(s=>P(s)).catch(o);export{m as r};
//# sourceMappingURL=resetPassword.js.map
