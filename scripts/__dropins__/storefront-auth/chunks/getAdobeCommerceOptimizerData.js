/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as P,Config as T}from"@dropins/tools/lib.js";import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as l,h as S,a as y,r as I}from"./network-error.js";const E={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},W=["localhost","127.0.0.1","::1"],f=3600,A=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,n]=o.trim().split("=");a===e&&(r=decodeURIComponent(n))}),r},k=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},X=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await G();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},g=new T(void 0),O=new P({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...e};O.config.setConfig(r);const o=A(E.auth_dropin_user_token),[a]=await Promise.all([U(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?p():Promise.resolve(),r.adobeCommerceOptimizer?J():Promise.resolve()]);g.setConfig(a)},listeners:()=>[i.on("authenticated",e=>{const t=g.getConfig();if(t!==void 0&&e!==t){g.setConfig(e);const{customerPermissionRoles:r}=O.config.getConfig();r&&p()}})]}),Y=O.config,R=e=>{var t,r,o,a,n,s,u,m,_,d;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((s=(n=e==null?void 0:e.data)==null?void 0:n.storeConfig)==null?void 0:s.required_character_classes_number)||0,createAccountConfirmation:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:d.customer_access_token_lifetime)*f||f}},M=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},w=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},v=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},b="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",C=async e=>{const t=e?await v(e):b;i.emit("auth/group-uid",t)},L=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
    }
  }
`,G=async()=>await l(L,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?w(e.errors):R(e)}).catch(S),x=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,U=async(e="Authorization",t="Bearer")=>{const r=A(E.auth_dropin_user_token);return r?(y(e,`${t} ${r}`),l(x).then(async o=>{var n,s,u,m;return!((n=o.errors)!=null&&n.find(_=>{var d;return((d=_.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await C((m=(u=(s=o.data)==null?void 0:s.customer)==null?void 0:u.group)==null?void 0:m.uid),i.emit("authenticated",!0),!0):(k(E.auth_dropin_user_token),I(e),await C(),i.emit("authenticated",!1),!1)})):(await C(),i.emit("authenticated",!1),!1)},z=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      purchase_orders_enabled
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
`;let h=null,c=null;const D=e=>{const t={},r=o=>{o.forEach(a=>{var n;t[a.id]=!0,(n=a.children)!=null&&n.length&&r(a.children)})};return r(e),t},H=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],N=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,q=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?D(e.permissions):{}},B=(e,t)=>{if(t===!0)return e;const r={...e};return H.forEach(o=>{r[o]=!1}),r},F=(e,t)=>{const r=N(e),o=q(e),a=B(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},$=async()=>{var e,t,r,o;try{const a=await l(z,{method:"GET"}),n=F((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return h=n,c=null,n}catch(a){throw c=null,a}},p=()=>h?(i.emit("auth/permissions",h),Promise.resolve(h)):(c||(c=$().then(e=>(i.emit("auth/permissions",e),e))),c),ee=()=>{h=null,c=null},K=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,J=async()=>{const e=await l(K,{method:"GET"}),t=M(e);return i.emit("auth/adobe-commerce-optimizer",t),t};export{E as C,W as L,ee as _,p as a,J as b,Y as c,k as d,C as e,X as f,G as g,w as h,O as i,U as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
