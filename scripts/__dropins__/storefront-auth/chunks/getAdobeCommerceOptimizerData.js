/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as k,Config as I}from"@dropins/tools/lib.js";import{events as i}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as C,h as w,a as M,r as v}from"./network-error.js";const f={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},oe=["localhost","127.0.0.1","::1"],g=3600,R=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,n]=o.trim().split("=");a===e&&(r=decodeURIComponent(n))}),r},b=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},ae=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await B();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||g}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${g}`}},L=e=>{if(!e||typeof e!="string")return null;try{const t=e.split(".");if(t.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),a=o.padEnd(o.length+(4-o.length%4)%4,"="),n=atob(a);return JSON.parse(n)}catch(t){return console.error("[decodeJwtToken] Failed to decode JWT:",t),null}},U=e=>!!L(e),h=new I(void 0),A=new k({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1,sellerAssistedBuying:{enabled:!1,triggerUrl:"login-as-customer",errorRedirectUrl:"",successRedirectUrl:""}},...e};A.config.setConfig(r);const o=R(f.auth_dropin_user_token);if(o&&U(o)){h.setConfig(!0),r.customerPermissionRoles&&await E(),r.adobeCommerceOptimizer&&await O();return}const[a]=await Promise.all([J(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?E():Promise.resolve(),r.adobeCommerceOptimizer?O():Promise.resolve()]);h.setConfig(a)},listeners:()=>[i.on("authenticated",e=>{const t=h.getConfig();if(t!==void 0&&e!==t){h.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=A.config.getConfig();r&&E(),o&&O()}})]}),ne=A.config,G=e=>{var t,r,o,a,n,s,u,d,_,m,T,P,y,S;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((s=(n=e==null?void 0:e.data)==null?void 0:n.storeConfig)==null?void 0:s.required_character_classes_number)||0,createAccountConfirmation:((d=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:d.create_account_confirmation)||!1,customerAccessTokenLifetime:((m=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:m.customer_access_token_lifetime)*g||g,loginAsCustomerEnabled:!0,loginAsCustomerConsentLabel:((P=(T=e==null?void 0:e.data)==null?void 0:T.storeConfig)==null?void 0:P.login_as_customer_consent_label)||"",loginAsCustomerConsentTooltip:((S=(y=e==null?void 0:e.data)==null?void 0:y.storeConfig)==null?void 0:S.login_as_customer_consent_tooltip)||""}},x=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},z=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},N=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(s=>s.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},D="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",p=async e=>{const t=e?await N(e):D;i.emit("auth/group-uid",t)},H=`
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
      # login_as_customer_enabled
      # login_as_customer_consent_label
      # login_as_customer_consent_tooltip
    }
  }
`,B=async()=>await C(H,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?z(e.errors):G(e)}).catch(w),F=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,J=async(e="Authorization",t="Bearer")=>{const r=R(f.auth_dropin_user_token);return r?(M(e,`${t} ${r}`),C(F).then(async o=>{var n,s,u,d;return!((n=o.errors)!=null&&n.find(_=>{var m;return((m=_.extensions)==null?void 0:m.category)==="graphql-authentication"}))?(await p((d=(u=(s=o.data)==null?void 0:s.customer)==null?void 0:u.group)==null?void 0:d.uid),i.emit("authenticated",!0),!0):(b(f.auth_dropin_user_token),b(f.auth_dropin_admin_session),v(e),await p(),i.emit("authenticated",!1),!1)})):(await p(),i.emit("authenticated",!1),!1)},q=`
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
`;let l=null,c=null;const $=e=>{const t={},r=o=>{o.forEach(a=>{var n;t[a.id]=!0,(n=a.children)!=null&&n.length&&r(a.children)})};return r(e),t},j=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],K=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,Q=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?$(e.permissions):{}},V=(e,t)=>{if(t===!0)return e;const r={...e};return j.forEach(o=>{r[o]=!1}),r},W=(e,t)=>{const r=K(e),o=Q(e),a=V(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},Z=async()=>{var e,t,r,o;try{const a=await C(q,{method:"GET"}),n=W((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return l=n,c=null,n}catch(a){throw c=null,a}},E=()=>l?(i.emit("auth/permissions",l),Promise.resolve(l)):(c||(c=Z().then(e=>(i.emit("auth/permissions",e),e))),c),se=()=>{l=null,c=null},X=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,O=async()=>{const e=await C(X,{method:"GET"}),t=x(e);return i.emit("auth/adobe-commerce-optimizer",t),t};export{f as C,oe as L,se as _,E as a,O as b,ne as c,b as d,p as e,U as f,B as g,ae as h,A as i,z as j,J as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
