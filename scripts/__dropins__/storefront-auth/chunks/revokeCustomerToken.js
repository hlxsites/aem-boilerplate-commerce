/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,r as i,h as c}from"./setReCaptchaToken.js";import{c as m,C as a,f as u,h,p as E,E as f,v as k}from"./getAdobeCommerceOptimizerData.js";import{events as _}from"@dropins/tools/event-bus.js";const d=e=>{var t,r,n;let o="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(o=((r=e==null?void 0:e.errors[0])==null?void 0:r.message)||"Unknown error"),{message:o,success:!!((n=e==null?void 0:e.data)!=null&&n.revokeCustomerToken)}},l=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,O=async()=>{const{authHeaderConfig:e}=m.getConfig();return await s(l,{method:"POST"}).then(async o=>{const t=d(o);if(t!=null&&t.success)[a.auth_dropin_user_token,a.auth_dropin_firstname,a.auth_dropin_admin_session].forEach(r=>{u(r)}),i(e.header),await h(),_.emit("authenticated",!1),E(f.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(r),k()}return t}).catch(c)};export{O as r};
//# sourceMappingURL=revokeCustomerToken.js.map
