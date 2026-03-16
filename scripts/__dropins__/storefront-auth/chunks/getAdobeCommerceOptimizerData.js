/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as R,Config as b}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as g,h as M,a as w,r as v}from"./network-error.js";const l={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},te=["localhost","127.0.0.1","::1"],f=3600,k=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,n]=o.trim().split("=");a===e&&(r=decodeURIComponent(n))}),r},S=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},re=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await H();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||f}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${f}`}},C=new b(void 0),O=new R({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...e};O.config.setConfig(r);const o=k(l.auth_dropin_user_token),[a]=await Promise.all([q(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?y():Promise.resolve(),r.adobeCommerceOptimizer?I():Promise.resolve()]);C.setConfig(a)},listeners:()=>[s.on("authenticated",e=>{const t=C.getConfig();if(t!==void 0&&e!==t){C.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=O.config.getConfig();r&&y(),o&&I()}})]}),oe=O.config,L=e=>{var t,r,o,a,n,i,u,m,h,_,A,p,P,T;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((i=(n=e==null?void 0:e.data)==null?void 0:n.storeConfig)==null?void 0:i.required_character_classes_number)||0,createAccountConfirmation:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(h=e==null?void 0:e.data)==null?void 0:h.storeConfig)==null?void 0:_.customer_access_token_lifetime)*f||f,loginAsCustomerEnabled:!0,loginAsCustomerConsentLabel:((p=(A=e==null?void 0:e.data)==null?void 0:A.storeConfig)==null?void 0:p.login_as_customer_consent_label)||"",loginAsCustomerConsentTooltip:((T=(P=e==null?void 0:e.data)==null?void 0:P.storeConfig)==null?void 0:T.login_as_customer_consent_tooltip)||""}},G=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},x=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},U=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(i=>i.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},z="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",E=async e=>{const t=e?await U(e):z;s.emit("auth/group-uid",t)},D=`
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
`,H=async()=>await g(D,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?x(e.errors):L(e)}).catch(M),N=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,q=async(e="Authorization",t="Bearer")=>{const r=k(l.auth_dropin_user_token);return r?(w(e,`${t} ${r}`),g(N).then(async o=>{var n,i,u,m;return!((n=o.errors)!=null&&n.find(h=>{var _;return((_=h.extensions)==null?void 0:_.category)==="graphql-authentication"}))?(await E((m=(u=(i=o.data)==null?void 0:i.customer)==null?void 0:u.group)==null?void 0:m.uid),s.emit("authenticated",!0),!0):(S(l.auth_dropin_user_token),S(l.auth_dropin_admin_session),v(e),await E(),s.emit("authenticated",!1),!1)})):(await E(),s.emit("authenticated",!1),!1)},B=`
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
`;let d=null,c=null;const F=e=>{const t={},r=o=>{o.forEach(a=>{var n;t[a.id]=!0,(n=a.children)!=null&&n.length&&r(a.children)})};return r(e),t},$=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],K=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,J=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?F(e.permissions):{}},Q=(e,t)=>{if(t===!0)return e;const r={...e};return $.forEach(o=>{r[o]=!1}),r},V=(e,t)=>{const r=K(e),o=J(e),a=Q(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},j=async()=>{var e,t,r,o;try{const a=await g(B,{method:"GET"}),n=V((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return d=n,c=null,n}catch(a){throw c=null,a}},y=()=>d?(s.emit("auth/permissions",d),Promise.resolve(d)):(c||(c=j().then(e=>(s.emit("auth/permissions",e),e))),c),ae=()=>{d=null,c=null},Z=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,I=async()=>{const e=await g(Z,{method:"GET"}),t=G(e);return s.emit("auth/adobe-commerce-optimizer",t),t};export{l as C,te as L,ae as _,y as a,I as b,oe as c,S as d,E as e,re as f,H as g,x as h,O as i,q as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
