/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,r as i,h as m}from"./network-error.js";import{c,C as n,d as u,e as h,v as E}from"./getAdobeCommerceOptimizerData.js";import{events as k}from"@dropins/tools/event-bus.js";import{d,p as f,E as l}from"./decodeJwtToken.js";const C=e=>{var t,o,a;let r="";return(t=e==null?void 0:e.errors)!=null&&t.length&&(r=((o=e==null?void 0:e.errors[0])==null?void 0:o.message)||"Unknown error"),{message:r,success:!!((a=e==null?void 0:e.data)!=null&&a.revokeCustomerToken)}},v=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,R=async()=>{const{authHeaderConfig:e}=c.getConfig();return await s(v,{method:"POST"}).then(async r=>{const t=C(r);if(t!=null&&t.success)[n.auth_dropin_user_token,n.auth_dropin_firstname].forEach(o=>{u(o)}),d(),i(e.header),await h(),k.emit("authenticated",!1),f(l.SIGN_OUT,{});else{const o=`
          ERROR revokeCustomerToken: ${t.message}`;console.error(o),E()}return t}).catch(m)};export{R as r};
//# sourceMappingURL=revokeCustomerToken.js.map
