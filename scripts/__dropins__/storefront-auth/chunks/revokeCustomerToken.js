/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as n}from"./network-error.js";import{C as m,d as s,p as u,E as c}from"./getStoreConfig.js";import{events as i}from"@dropins/tools/event-bus.js";import{f as E}from"./fetch-graphql.js";const k=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},h=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,_=async()=>await E(h,{method:"POST"}).then(t=>{const e=k(t);if(e!=null&&e.success)[m.auth_dropin_user_token,m.auth_dropin_firstname].forEach(r=>{s(r)}),i.emit("authenticated",!1),u(c.SIGN_OUT,{});else{const r=`
          ERROR revokeCustomerToken: ${e.message}`;console.error(r)}return e}).catch(n);export{_ as r};
