/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as u,Config as h}from"@dropins/tools/lib.js";import{events as c}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{v as l}from"./verifyToken.js";import{f as g}from"./network-error.js";const a=new h(void 0),m=new u({init:async e=>{const t={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}},...e};m.config.setConfig(t);const n=await l(t.authHeaderConfig.header,t.authHeaderConfig.tokenPrefix);a.setConfig(n),n&&await d()},listeners:()=>[c.on("authenticated",e=>{const i=a.getConfig();i!==void 0&&e!==i&&(a.setConfig(e),d())})]}),T=m.config,p=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          text
          children {
            id
            text
            children {
              id
              text
              children {
                id
                text
                children {
                  id
                  text
                  children {
                    id
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;let r=null,s=null;const C=e=>{const i={},t=n=>{n.forEach(o=>{var f;i[o.text]=!0,(f=o.children)!=null&&f.length&&t(o.children)})};return t(e),i},P=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,E=e=>{var t;if(P(e))return{admin:!0};const i={all:!0};if((t=e==null?void 0:e.permissions)!=null&&t.length){const n=C(e.permissions);return{...i,...n}}return i},x=async()=>{var e,i;try{const t=await g(p,{method:"GET"}),n=E((i=(e=t.data)==null?void 0:e.customer)==null?void 0:i.role);return r=n,s=null,n}catch(t){throw s=null,t}},d=()=>r?(c.emit("auth/permissions",r),Promise.resolve(r)):(s||(s=x().then(e=>(c.emit("auth/permissions",e),e))),s),w=()=>{r=null,s=null};export{w as _,T as c,d as g,m as i};
//# sourceMappingURL=getCustomerRolePermissions.js.map
