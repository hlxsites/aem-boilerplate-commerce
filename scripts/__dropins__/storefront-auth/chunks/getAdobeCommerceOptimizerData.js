/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as B,f as g,h as P,c as j,r as V}from"./setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import{events as d}from"@dropins/tools/event-bus.js";import{Initializer as Q,Config as W,merge as X}from"@dropins/tools/lib.js";import{CUSTOMER_INFORMATION_FRAGMENT as Z}from"../fragments.js";const l={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},G=["localhost","127.0.0.1","::1"],U=3600,F=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,s]=o.trim().split("=");a===e&&(r=decodeURIComponent(s))}),r},z=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},v=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await K();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||U}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${U}`}},Y="login-as-customer",ee=e=>{if(!(e!=null&&e.enabled))return!1;const t=e.triggerUrl||Y;return new URL(window.location.href).pathname.includes(t)},te=()=>{const e=new URLSearchParams(window.location.search),t=e.get("email"),r=e.get("password");return!t||!r?null:{email:t,password:r}},re=async()=>{const e=await v(),t=G.includes(window.location.hostname)?"":"Secure";document.cookie=`${l.auth_dropin_admin_session}=true; path=/; ${e}; SameSite=Lax; ${t};`},oe=async e=>{if(!ee(e))return!1;const t=te();if(!t||!t.email||!t.password)return!1;try{const r=await K();if(!((r==null?void 0:r.loginAsCustomerEnabled)??!1))return!1;const a=await Ae({email:t.email,password:t.password,handleSetInLineAlertProps:s=>{console.error("[SellerAssistedBuying] Login as customer inline alert props:",s)},translations:{customerTokenErrorMessage:"Unable to log in as customer"},onErrorCallback:s=>{console.error("[SellerAssistedBuying] Login as customer error:",s)}});return a!=null&&a.userName?(await re(),e!=null&&e.successRedirectUrl&&(window.location.href=e.successRedirectUrl),!0):(e!=null&&e.errorRedirectUrl&&(window.location.href=e.errorRedirectUrl),!1)}catch{return e!=null&&e.errorRedirectUrl&&(window.location.href=e.errorRedirectUrl),!1}},ae=e=>{if(!e||typeof e!="string")return null;try{const t=e.split(".");if(t.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),a=o.padEnd(o.length+(4-o.length%4)%4,"="),s=atob(a);return JSON.parse(s)}catch(t){return console.error("[decodeJwtToken] Failed to decode JWT:",t),null}},se=async()=>{const e=await v(),t=G.includes(window.location.hostname)?"":"Secure";document.cookie=`${l.auth_dropin_admin_session}=true; path=/; ${e}; SameSite=Lax; ${t};`},ne=()=>{document.cookie=`${l.auth_dropin_admin_session}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`},I=e=>!!ae(e),p=new W(void 0),b=new Q({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1,sellerAssistedBuying:{enabled:!1,triggerUrl:"login-as-customer",errorRedirectUrl:"",successRedirectUrl:""}},...e};if(b.config.setConfig(r),await oe(r.sellerAssistedBuying)){p.setConfig(!0),r.customerPermissionRoles&&await S(),r.adobeCommerceOptimizer&&await R();return}const a=F(l.auth_dropin_user_token);if(a&&I(a)){p.setConfig(!0),r.customerPermissionRoles&&await S(),r.adobeCommerceOptimizer&&await R();return}const[s]=await Promise.all([Se(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&a?S():Promise.resolve(),r.adobeCommerceOptimizer?R():Promise.resolve()]);p.setConfig(s)},listeners:()=>[d.on("authenticated",e=>{const t=p.getConfig();if(t!==void 0&&e!==t){p.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=b.config.getConfig();r&&S(),o&&R()}})]}),k=b.config,H=e=>({firstName:e.firstName,lastName:e.lastName,emailAddress:(e==null?void 0:e.email)||"",accountId:(e==null?void 0:e.email)||""}),ie=e=>{var t,r,o,a,s,n,c,i,u,m;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((i=(c=e==null?void 0:e.data)==null?void 0:c.storeConfig)==null?void 0:i.create_account_confirmation)||!1,customerAccessTokenLifetime:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.customer_access_token_lifetime)*U||U,loginAsCustomerEnabled:!0}},ce=e=>{var r,o,a,s,n,c,i,u,m,C,T,E,w,_,O;const t={email:((o=(r=e==null?void 0:e.data)==null?void 0:r.customer)==null?void 0:o.email)??"",firstName:((s=(a=e==null?void 0:e.data)==null?void 0:a.customer)==null?void 0:s.firstname)??"",lastName:((c=(n=e==null?void 0:e.data)==null?void 0:n.customer)==null?void 0:c.lastname)??"",groupUid:((m=(u=(i=e==null?void 0:e.data)==null?void 0:i.customer)==null?void 0:u.group)==null?void 0:m.uid)??"",allowRemoteShoppingAssistance:(T=(C=e==null?void 0:e.data)==null?void 0:C.customer)==null?void 0:T.allow_remote_shopping_assistance};return X(t,(O=(_=(w=(E=k==null?void 0:k.getConfig())==null?void 0:E.models)==null?void 0:w.CustomerModel)==null?void 0:_.transformer)==null?void 0:O.call(_,e.data))},ue=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},me=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},de=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${Z}
`,le=async e=>{if(e){const{authHeaderConfig:t}=k.getConfig();B(t.header,t.tokenPrefix?`${t.tokenPrefix} ${e}`:e)}return await g(de,{method:"GET",cache:"force-cache"}).then(t=>ce(t)).catch(P)},_e=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,J="accountContext",he="channelContext";var N=(e=>(e.CREATE_ACCOUNT_EVENT="create-account",e.SIGN_IN="sign-in",e.SIGN_OUT="sign-out",e))(N||{});const $={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function q(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function x(e,t){const r=q();r.push({[e]:null}),r.push({[e]:t})}function fe(){x(he,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function D(e,t){q().push(o=>{const a=o.getState?o.getState():{};o.push({event:e,eventInfo:{...a,...t}})})}function ge(e){const t=H(e);x(J,t),D($.CREATE_ACCOUNT)}function Ce(e){const t=H(e);x(J,t),D($.SIGN_IN)}function Te(){D($.SIGN_OUT)}const Ee=(e,t)=>{const r=sessionStorage.getItem("storeConfig"),a={...r?JSON.parse(r):{},...t};switch(fe(),e){case"create-account":ge(a);break;case"sign-in":Ce(a);break;case"sign-out":Te();break;default:return null}},we=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},Oe="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",M=async e=>{const t=e?await we(e):Oe;d.emit("auth/group-uid",t)},Ae=async({email:e,password:t,translations:r,onErrorCallback:o,handleSetInLineAlertProps:a,apiErrorMessageOverride:s})=>{var E,w,_,O;await j();const n=await g(_e,{method:"POST",variables:{email:e,password:t}}).catch(P);if(!((w=(E=n==null?void 0:n.data)==null?void 0:E.generateCustomerToken)!=null&&w.token)){const A=r.customerTokenErrorMessage,h=n!=null&&n.errors?n.errors[0].message:A,L=s??h;return o==null||o(h),a==null||a({type:"error",text:L}),{errorMessage:h,displayErrorMessage:L,userName:"",userEmail:""}}const c=(O=(_=n==null?void 0:n.data)==null?void 0:_.generateCustomerToken)==null?void 0:O.token;I(c);const i=await le(c),u=i==null?void 0:i.firstName,m=i==null?void 0:i.email;if(!u||!m){const A=r.customerTokenErrorMessage,h=s??A;return o==null||o(A),a==null||a({type:"error",text:h}),{errorMessage:A,displayErrorMessage:h,userName:"",userEmail:""}}const C=await v(),T=G.includes(window.location.hostname)?"":"Secure";return document.cookie=`${l.auth_dropin_firstname}=${u}; path=/; ${C}; ${T};`,document.cookie=`${l.auth_dropin_user_token}=${c}; path=/; ${C}; ${T};`,I(c)?await se():ne(),await M(c?i==null?void 0:i.groupUid:void 0),d.emit("authenticated",!!c),Ee(N==null?void 0:N.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:u,userEmail:m}},pe=`
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
    }
  }
`,K=async()=>await g(pe,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?me(e.errors):ie(e)}).catch(P),ye=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,Se=async(e="Authorization",t="Bearer")=>{const r=F(l.auth_dropin_user_token);return r?(B(e,`${t} ${r}`),g(ye).then(async o=>{var s,n,c,i;return!((s=o.errors)!=null&&s.find(u=>{var m;return((m=u.extensions)==null?void 0:m.category)==="graphql-authentication"}))?(await M((i=(c=(n=o.data)==null?void 0:n.customer)==null?void 0:c.group)==null?void 0:i.uid),d.emit("authenticated",!0),!0):(z(l.auth_dropin_user_token),z(l.auth_dropin_admin_session),V(e),await M(),d.emit("authenticated",!1),!1)})):(await M(),d.emit("authenticated",!1),!1)},Re=`
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
`;let y=null,f=null;const ke=e=>{const t={},r=o=>{o.forEach(a=>{var s;t[a.id]=!0,(s=a.children)!=null&&s.length&&r(a.children)})};return r(e),t},Ne=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],Me=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,Ue=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?ke(e.permissions):{}},Ie=(e,t)=>{if(t===!0)return e;const r={...e};return Ne.forEach(o=>{r[o]=!1}),r},be=(e,t)=>{const r=Me(e),o=Ue(e),a=Ie(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},Pe=async()=>{var e,t,r,o;try{const a=await g(Re,{method:"GET"}),s=be((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return y=s,f=null,s}catch(a){throw f=null,a}},S=()=>y?(d.emit("auth/permissions",y),Promise.resolve(y)):(f||(f=Pe().then(e=>(d.emit("auth/permissions",e),e))),f),ze=()=>{y=null,f=null},Ge=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,R=async()=>{const e=await g(Ge,{method:"GET"}),t=ue(e);return d.emit("auth/adobe-commerce-optimizer",t),t};export{l as C,N as E,ze as _,le as a,S as b,k as c,Ae as d,K as e,z as f,R as g,ne as h,b as i,M as j,me as k,Ee as p,Se as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
