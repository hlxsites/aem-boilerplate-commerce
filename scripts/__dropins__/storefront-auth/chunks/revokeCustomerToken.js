/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,r as i,h as m}from"./network-error.js";import{c as u,C as a,d as c,e as h,v as E}from"./getAdobeCommerceOptimizerData.js";import{events as _}from"@dropins/tools/event-bus.js";import{p as d,E as f}from"./acdl.js";const k=e=>{var t,r,n;let o="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(o=((r=e==null?void 0:e.errors[0])==null?void 0:r.message)||"Unknown error"),{message:o,success:!!((n=e==null?void 0:e.data)!=null&&n.revokeCustomerToken)}},l=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,g=async()=>{const{authHeaderConfig:e}=u.getConfig();return await s(l,{method:"POST"}).then(async o=>{const t=k(o);if(t!=null&&t.success)[a.auth_dropin_user_token,a.auth_dropin_firstname,a.auth_dropin_lastname,a.auth_dropin_admin_session].forEach(r=>{c(r)}),i(e.header),await h(),_.emit("authenticated",!1),d(f.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(r),E()}return t}).catch(m)};export{g as r};
//# sourceMappingURL=revokeCustomerToken.js.map
