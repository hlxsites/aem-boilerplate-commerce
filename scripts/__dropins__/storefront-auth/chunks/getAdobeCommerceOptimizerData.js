/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as T,Config as I}from"@dropins/tools/lib.js";import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as l,h as R,a as y,r as k}from"./network-error.js";const E={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},X=["localhost","127.0.0.1","::1"],f=3600,S=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,s]=o.trim().split("=");a===e&&(r=decodeURIComponent(s))}),r},M=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},Y=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await U();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},g=new I(void 0),O=new T({init:async e=>{console.log("🎇 from source");const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...e};O.config.setConfig(r);const o=S(E.auth_dropin_user_token),[a]=await Promise.all([D(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?A():Promise.resolve(),r.adobeCommerceOptimizer?P():Promise.resolve()]);g.setConfig(a)},listeners:()=>[i.on("authenticated",e=>{const t=g.getConfig();if(t!==void 0&&e!==t){g.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=O.config.getConfig();r&&A(),o&&P()}})]}),ee=O.config,w=e=>{var t,r,o,a,s,n,u,m,_,d;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:d.customer_access_token_lifetime)*f||f}},b=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},v=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},L=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},G="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",C=async e=>{const t=e?await L(e):G;i.emit("auth/group-uid",t)},x=`
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
`,U=async()=>await l(x,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?v(e.errors):w(e)}).catch(R),z=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,D=async(e="Authorization",t="Bearer")=>{const r=S(E.auth_dropin_user_token);return r?(y(e,`${t} ${r}`),l(z).then(async o=>{var s,n,u,m;return!((s=o.errors)!=null&&s.find(_=>{var d;return((d=_.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await C((m=(u=(n=o.data)==null?void 0:n.customer)==null?void 0:u.group)==null?void 0:m.uid),i.emit("authenticated",!0),!0):(M(E.auth_dropin_user_token),k(e),await C(),i.emit("authenticated",!1),!1)})):(await C(),i.emit("authenticated",!1),!1)},N=`
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
`;let h=null,c=null;const H=e=>{const t={},r=o=>{o.forEach(a=>{var s;t[a.id]=!0,(s=a.children)!=null&&s.length&&r(a.children)})};return r(e),t},q=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],p="Magento_Sales::place_order",B=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,F=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?H(e.permissions):{}},$=(e,t)=>{if(t===!0)return e;const r={...e};return q.forEach(o=>{r[o]=!1}),r},K=(e,t)=>{const r=B(e),o=F(e),a=$(o,t),n={...{all:!0,...r&&{admin:!0}},...a};return!r&&n[p]===void 0&&Object.keys(o).length===0&&(n[p]=!0),n},j=async()=>{var e,t,r,o;try{const a=await l(N,{method:"GET"}),s=K((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return h=s,c=null,s}catch(a){throw c=null,a}},A=()=>h?(i.emit("auth/permissions",h),Promise.resolve(h)):(c||(c=j().then(e=>(i.emit("auth/permissions",e),e))),c),te=()=>{h=null,c=null},J=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,P=async()=>{const e=await l(J,{method:"GET"}),t=b(e);return i.emit("auth/adobe-commerce-optimizer",t),t};export{E as C,X as L,te as _,A as a,U as b,ee as c,M as d,C as e,Y as f,P as g,v as h,O as i,D as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
