/*! Copyright 2026 Adobe
All Rights Reserved. */
import{Initializer as x,Config as L}from"@dropins/tools/lib.js";import{events as s}from"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as C,h as G,a as N,r as U}from"./network-error.js";const c={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_lastname:"auth_dropin_lastname",auth_dropin_admin_session:"auth_dropin_admin_session"},ne=["localhost","127.0.0.1","::1"],g=3600,v=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,n]=o.trim().split("=");a===e&&(r=decodeURIComponent(n))}),r},f=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},se=async()=>{try{const e=sessionStorage.getItem("storeConfig");let t={};try{t=e?JSON.parse(e):{}}catch{t={}}let r=t.customerAccessTokenLifetime;if(!r){const o=await $();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||g}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${g}`}},p=new L(void 0),O=new x({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...e};O.config.setConfig(r);const o=v(c.auth_dropin_user_token),[a]=await Promise.all([j(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?M():Promise.resolve(),r.adobeCommerceOptimizer?w():Promise.resolve()]);p.setConfig(a)},listeners:()=>[s.on("authenticated",e=>{const t=p.getConfig();if(t!==void 0&&e!==t){p.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=O.config.getConfig();r&&M(),o&&w()}})]}),ce=O.config,z=e=>{var t,r,o,a,n,i,_,m,l,d,A,P,T,b,k,S,y,I;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((i=(n=e==null?void 0:e.data)==null?void 0:n.storeConfig)==null?void 0:i.required_character_classes_number)||0,createAccountConfirmation:((m=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:m.create_account_confirmation)||!1,customerAccessTokenLifetime:((d=(l=e==null?void 0:e.data)==null?void 0:l.storeConfig)==null?void 0:d.customer_access_token_lifetime)*g||g,websiteName:((P=(A=e==null?void 0:e.data)==null?void 0:A.storeConfig)==null?void 0:P.website_name)||"",shoppingAssistanceEnabled:((b=(T=e==null?void 0:e.data)==null?void 0:T.storeConfig)==null?void 0:b.shopping_assistance_enabled)||!1,shoppingAssistanceCheckboxTitle:((S=(k=e==null?void 0:e.data)==null?void 0:k.storeConfig)==null?void 0:S.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((I=(y=e==null?void 0:e.data)==null?void 0:y.storeConfig)==null?void 0:I.shopping_assistance_checkbox_tooltip)||""}},D=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},H=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},q=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(i=>i.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},B="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",E=async e=>{const t=e?await q(e):B;s.emit("auth/group-uid",t)},F=`
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
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,$=async()=>await C(F,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?H(e.errors):z(e)}).catch(G),K=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,j=async(e="Authorization",t="Bearer")=>{const r=v(c.auth_dropin_user_token);return r?(N(e,`${t} ${r}`),C(K).then(async o=>{var n,i,_,m;return!((n=o.errors)!=null&&n.find(l=>{var d;return((d=l.extensions)==null?void 0:d.category)==="graphql-authentication"}))?(await E((m=(_=(i=o.data)==null?void 0:i.customer)==null?void 0:_.group)==null?void 0:m.uid),s.emit("authenticated",!0),!0):(f(c.auth_dropin_user_token),f(c.auth_dropin_firstname),f(c.auth_dropin_lastname),f(c.auth_dropin_admin_session),U(e),await E(),s.emit("authenticated",!1),!1)})):(await E(),s.emit("authenticated",!1),!1)},J=`
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
`;let h=null,u=null;const Q=e=>{const t={},r=o=>{o.forEach(a=>{var n;t[a.id]=!0,(n=a.children)!=null&&n.length&&r(a.children)})};return r(e),t},V=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],R="Magento_Sales::place_order",Z=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,W=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?Q(e.permissions):{}},X=(e,t)=>{if(t===!0)return e;const r={...e};return V.forEach(o=>{r[o]=!1}),r},Y=(e,t)=>{const r=Z(e),o=W(e),a=X(o,t),i={...{all:!0,...r&&{admin:!0}},...a};return!r&&i[R]===void 0&&Object.keys(o).length===0&&(i[R]=!0),i},ee=async()=>{var e,t,r,o;try{const a=await C(J,{method:"GET"}),n=Y((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return h=n,u=null,n}catch(a){throw u=null,a}},M=()=>h?(s.emit("auth/permissions",h),Promise.resolve(h)):(u||(u=ee().then(e=>(s.emit("auth/permissions",e),e))),u),ue=()=>{h=null,u=null},te=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,w=async()=>{const e=await C(te,{method:"GET"}),t=D(e);return s.emit("auth/adobe-commerce-optimizer",t),t};export{c as C,ne as L,ue as _,M as a,w as b,ce as c,f as d,E as e,se as f,$ as g,H as h,O as i,j as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
