/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as w,Config as M}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as C,h as v,a as L,r as G}from"./network-error.js";const c={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_lastname:"auth_dropin_lastname",auth_dropin_admin_session:"auth_dropin_admin_session"},oe=["localhost","127.0.0.1","::1"],g=3600,R=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,n]=o.trim().split("=");a===e&&(r=decodeURIComponent(n))}),r},f=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},ae=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await q();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||g}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${g}`}},E=new M(void 0),A=new w({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...e};A.config.setConfig(r);const o=R(c.auth_dropin_user_token),[a]=await Promise.all([F(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?I():Promise.resolve(),r.adobeCommerceOptimizer?k():Promise.resolve()]);E.setConfig(a)},listeners:()=>[s.on("authenticated",e=>{const t=E.getConfig();if(t!==void 0&&e!==t){E.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=A.config.getConfig();r&&I(),o&&k()}})]}),ne=A.config,x=e=>{var t,r,o,a,n,i,m,_,l,d,p,P,T,S,b,y;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((i=(n=e==null?void 0:e.data)==null?void 0:n.storeConfig)==null?void 0:i.required_character_classes_number)||0,createAccountConfirmation:((_=(m=e==null?void 0:e.data)==null?void 0:m.storeConfig)==null?void 0:_.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(l=e==null?void 0:e.data)==null?void 0:l.storeConfig)==null?void 0:d.customer_access_token_lifetime)*g||g,websiteName:((P=(p=e==null?void 0:e.data)==null?void 0:p.storeConfig)==null?void 0:P.website_name)||"",loginAsCustomerEnabled:!0,loginAsCustomerConsentLabel:((S=(T=e==null?void 0:e.data)==null?void 0:T.storeConfig)==null?void 0:S.login_as_customer_consent_label)||"",loginAsCustomerConsentTooltip:((y=(b=e==null?void 0:e.data)==null?void 0:b.storeConfig)==null?void 0:y.login_as_customer_consent_tooltip)||""}},U=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},z=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},N=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(i=>i.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},D="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",O=async e=>{const t=e?await N(e):D;s.emit("auth/group-uid",t)},H=`
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
      website_name
      # login_as_customer_enabled
      # login_as_customer_consent_label
      # login_as_customer_consent_tooltip
    }
  }
`,q=async()=>await C(H,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?z(e.errors):x(e)}).catch(v),B=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,F=async(e="Authorization",t="Bearer")=>{const r=R(c.auth_dropin_user_token);return r?(L(e,`${t} ${r}`),C(B).then(async o=>{var n,i,m,_;return!((n=o.errors)!=null&&n.find(l=>{var d;return((d=l.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await O((_=(m=(i=o.data)==null?void 0:i.customer)==null?void 0:m.group)==null?void 0:_.uid),s.emit("authenticated",!0),!0):(f(c.auth_dropin_user_token),f(c.auth_dropin_firstname),f(c.auth_dropin_lastname),f(c.auth_dropin_admin_session),G(e),await O(),s.emit("authenticated",!1),!1)})):(await O(),s.emit("authenticated",!1),!1)},$=`
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
`;let h=null,u=null;const K=e=>{const t={},r=o=>{o.forEach(a=>{var n;t[a.id]=!0,(n=a.children)!=null&&n.length&&r(a.children)})};return r(e),t},J=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],Q=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,V=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?K(e.permissions):{}},j=(e,t)=>{if(t===!0)return e;const r={...e};return J.forEach(o=>{r[o]=!1}),r},Z=(e,t)=>{const r=Q(e),o=V(e),a=j(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},W=async()=>{var e,t,r,o;try{const a=await C($,{method:"GET"}),n=Z((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return h=n,u=null,n}catch(a){throw u=null,a}},I=()=>h?(s.emit("auth/permissions",h),Promise.resolve(h)):(u||(u=W().then(e=>(s.emit("auth/permissions",e),e))),u),ie=()=>{h=null,u=null},X=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,k=async()=>{const e=await C(X,{method:"GET"}),t=U(e);return s.emit("auth/adobe-commerce-optimizer",t),t};export{c as C,oe as L,ie as _,I as a,k as b,ne as c,f as d,O as e,ae as f,q as g,z as h,A as i,F as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
