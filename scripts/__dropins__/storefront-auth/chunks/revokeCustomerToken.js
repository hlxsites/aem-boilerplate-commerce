/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,r as i,h as m}from"./setReCaptchaToken.js";import{c,C as a,f as u,h,j as E,p as k,E as d,v as f}from"./getAdobeCommerceOptimizerData.js";import{events as _}from"@dropins/tools/event-bus.js";const l=e=>{var t,o,n;let r="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(r=((o=e==null?void 0:e.errors[0])==null?void 0:o.message)||"Unknown error"),{message:r,success:!!((n=e==null?void 0:e.data)!=null&&n.revokeCustomerToken)}},C=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,g=async()=>{const{authHeaderConfig:e}=c.getConfig();return await s(C,{method:"POST"}).then(async r=>{const t=l(r);if(t!=null&&t.success)[a.auth_dropin_user_token,a.auth_dropin_firstname,a.auth_dropin_admin_session].forEach(o=>{u(o)}),h(),i(e.header),await E(),_.emit("authenticated",!1),k(d.SIGN_OUT,{});else{const o=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(o),f()}return t}).catch(m)};export{g as r};
//# sourceMappingURL=revokeCustomerToken.js.map
