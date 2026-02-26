/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as B,f as E,h as U,c as W,r as X}from"./setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import{events as _}from"@dropins/tools/event-bus.js";import{Initializer as Z,Config as Y,merge as ee}from"@dropins/tools/lib.js";import{CUSTOMER_INFORMATION_FRAGMENT as te}from"../fragments.js";const f={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},F=["localhost","127.0.0.1","::1"],b=3600,H=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,s]=o.trim().split("=");a===e&&(r=decodeURIComponent(s))}),r},z=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},J=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await Q();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||b}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${b}`}},re="login-as-customer",oe=e=>{if(!(e!=null&&e.enabled))return!1;const t=e.triggerUrl||re;return new URL(window.location.href).pathname.includes(t)},ae=()=>{const e=new URLSearchParams(window.location.search),t=e.get("email"),r=e.get("password");return!t||!r?null:{email:t,password:r}},se=async()=>{const e=await J(),t=F.includes(window.location.hostname)?"":"Secure";document.cookie=`${f.auth_dropin_admin_session}=true; path=/; ${e}; SameSite=Lax; ${t};`},ne=async e=>{if(!oe(e))return!1;const t=ae();if(!t||!t.email||!t.password)return!1;try{const r=await Q();if(!((r==null?void 0:r.loginAsCustomerEnabled)??!1))return!1;const a=await ye({email:t.email,password:t.password,handleSetInLineAlertProps:s=>{console.error("[SellerAssistedBuying] Login as customer inline alert props:",s)},translations:{customerTokenErrorMessage:"Unable to log in as customer"},onErrorCallback:s=>{console.error("[SellerAssistedBuying] Login as customer error:",s)},errorRedirectUrl:e==null?void 0:e.errorRedirectUrl,successRedirectUrl:e==null?void 0:e.successRedirectUrl});return a!=null&&a.userName?(await se(),!0):!1}catch{return!1}},ie=e=>{if(!e||typeof e!="string")return null;try{const t=e.split(".");if(t.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),a=o.padEnd(o.length+(4-o.length%4)%4,"="),s=atob(a);return JSON.parse(s)}catch(t){return console.error("[decodeJwtToken] Failed to decode JWT:",t),null}},q=e=>!!ie(e),y=new Y(void 0),I=new Z({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1,sellerAssistedBuying:{enabled:!1,triggerUrl:"login-as-customer",errorRedirectUrl:"",successRedirectUrl:""}},...e};if(I.config.setConfig(r),await ne(r.sellerAssistedBuying)){y.setConfig(!0),r.customerPermissionRoles&&await p(),r.adobeCommerceOptimizer&&await R();return}const a=H(f.auth_dropin_user_token);if(a&&q(a)){y.setConfig(!0),r.customerPermissionRoles&&await p(),r.adobeCommerceOptimizer&&await R();return}const[s]=await Promise.all([Re(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&a?p():Promise.resolve(),r.adobeCommerceOptimizer?R():Promise.resolve()]);y.setConfig(s)},listeners:()=>[_.on("authenticated",e=>{const t=y.getConfig();if(t!==void 0&&e!==t){y.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=I.config.getConfig();r&&p(),o&&R()}})]}),N=I.config,K=e=>({firstName:e.firstName,lastName:e.lastName,emailAddress:(e==null?void 0:e.email)||"",accountId:(e==null?void 0:e.email)||""}),ce=e=>{var t,r,o,a,s,n,d,i,u,m,c,l;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((i=(d=e==null?void 0:e.data)==null?void 0:d.storeConfig)==null?void 0:i.create_account_confirmation)||!1,customerAccessTokenLifetime:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.customer_access_token_lifetime)*b||b,loginAsCustomerEnabled:((l=(c=e==null?void 0:e.data)==null?void 0:c.storeConfig)==null?void 0:l.login_as_customer_enabled)??!0}},ue=e=>{var r,o,a,s,n,d,i,u,m,c,l,w,g,h,O;const t={email:((o=(r=e==null?void 0:e.data)==null?void 0:r.customer)==null?void 0:o.email)??"",firstName:((s=(a=e==null?void 0:e.data)==null?void 0:a.customer)==null?void 0:s.firstname)??"",lastName:((d=(n=e==null?void 0:e.data)==null?void 0:n.customer)==null?void 0:d.lastname)??"",groupUid:((m=(u=(i=e==null?void 0:e.data)==null?void 0:i.customer)==null?void 0:u.group)==null?void 0:m.uid)??"",allowRemoteShoppingAssistance:(l=(c=e==null?void 0:e.data)==null?void 0:c.customer)==null?void 0:l.allow_remote_shopping_assistance};return ee(t,(O=(h=(g=(w=N==null?void 0:N.getConfig())==null?void 0:w.models)==null?void 0:g.CustomerModel)==null?void 0:h.transformer)==null?void 0:O.call(h,e.data))},me=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},de=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},le=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${te}
`,_e=async e=>{if(e){const{authHeaderConfig:t}=N.getConfig();B(t.header,t.tokenPrefix?`${t.tokenPrefix} ${e}`:e)}return await E(le,{method:"GET",cache:"force-cache"}).then(t=>ue(t)).catch(U)},he=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,j="accountContext",fe="channelContext";var k=(e=>(e.CREATE_ACCOUNT_EVENT="create-account",e.SIGN_IN="sign-in",e.SIGN_OUT="sign-out",e))(k||{});const P={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function V(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function G(e,t){const r=V();r.push({[e]:null}),r.push({[e]:t})}function ge(){G(fe,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function v(e,t){V().push(o=>{const a=o.getState?o.getState():{};o.push({event:e,eventInfo:{...a,...t}})})}function Ce(e){const t=K(e);G(j,t),v(P.CREATE_ACCOUNT)}function Te(e){const t=K(e);G(j,t),v(P.SIGN_IN)}function Ee(){v(P.SIGN_OUT)}const we=(e,t)=>{const r=sessionStorage.getItem("storeConfig"),a={...r?JSON.parse(r):{},...t};switch(ge(),e){case"create-account":Ce(a);break;case"sign-in":Te(a);break;case"sign-out":Ee();break;default:return null}},Oe=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},Ae="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",M=async e=>{const t=e?await Oe(e):Ae;_.emit("auth/group-uid",t)},ye=async({email:e,password:t,translations:r,onErrorCallback:o,handleSetInLineAlertProps:a,apiErrorMessageOverride:s,errorRedirectUrl:n,successRedirectUrl:d})=>{var O,D,x,$;await W();const i=await E(he,{method:"POST",variables:{email:e,password:t}}).catch(U);if(!((D=(O=i==null?void 0:i.data)==null?void 0:O.generateCustomerToken)!=null&&D.token)){const A=r.customerTokenErrorMessage,C=i!=null&&i.errors?i.errors[0].message:A,L=s??C;return o==null||o(C),a==null||a({type:"error",text:L}),{errorMessage:C,displayErrorMessage:L,userName:"",userEmail:""}}const u=($=(x=i==null?void 0:i.data)==null?void 0:x.generateCustomerToken)==null?void 0:$.token,m=q(u),c=await _e(u),l=c==null?void 0:c.firstName,w=c==null?void 0:c.email;if(!l||!w){const A=r.customerTokenErrorMessage,C=s??A;return o==null||o(A),a==null||a({type:"error",text:C}),m&&n&&(window.location.href=n),{errorMessage:A,displayErrorMessage:C,userName:"",userEmail:""}}const g=await J(),h=F.includes(window.location.hostname)?"":"Secure";return document.cookie=`${f.auth_dropin_firstname}=${l}; path=/; ${g}; ${h};`,document.cookie=`${f.auth_dropin_user_token}=${u}; path=/; ${g}; ${h};`,m&&(document.cookie=`${f.auth_dropin_admin_session}=true; path=/; ${g}; SameSite=Lax; ${h};`),await M(u?c==null?void 0:c.groupUid:void 0),_.emit("authenticated",!!u),we(k==null?void 0:k.SIGN_IN,{...c}),m&&d&&(window.location.href=d),{errorMessage:"",displayErrorMessage:"",userName:l,userEmail:w}},Se=`
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
`,Q=async()=>await E(Se,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?de(e.errors):ce(e)}).catch(U),pe=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,Re=async(e="Authorization",t="Bearer")=>{const r=H(f.auth_dropin_user_token);return r?(B(e,`${t} ${r}`),E(pe).then(async o=>{var s,n,d,i;return!((s=o.errors)!=null&&s.find(u=>{var m;return((m=u.extensions)==null?void 0:m.category)==="graphql-authentication"}))?(await M((i=(d=(n=o.data)==null?void 0:n.customer)==null?void 0:d.group)==null?void 0:i.uid),_.emit("authenticated",!0),!0):(z(f.auth_dropin_user_token),z(f.auth_dropin_admin_session),X(e),await M(),_.emit("authenticated",!1),!1)})):(await M(),_.emit("authenticated",!1),!1)},Ne=`
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
`;let S=null,T=null;const ke=e=>{const t={},r=o=>{o.forEach(a=>{var s;t[a.id]=!0,(s=a.children)!=null&&s.length&&r(a.children)})};return r(e),t},Me=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],be=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,Ie=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?ke(e.permissions):{}},Ue=(e,t)=>{if(t===!0)return e;const r={...e};return Me.forEach(o=>{r[o]=!1}),r},Pe=(e,t)=>{const r=be(e),o=Ie(e),a=Ue(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},Ge=async()=>{var e,t,r,o;try{const a=await E(Ne,{method:"GET"}),s=Pe((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return S=s,T=null,s}catch(a){throw T=null,a}},p=()=>S?(_.emit("auth/permissions",S),Promise.resolve(S)):(T||(T=Ge().then(e=>(_.emit("auth/permissions",e),e))),T),Be=()=>{S=null,T=null},ve=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,R=async()=>{const e=await E(ve,{method:"GET"}),t=me(e);return _.emit("auth/adobe-commerce-optimizer",t),t};export{f as C,k as E,Be as _,_e as a,p as b,N as c,ye as d,Q as e,z as f,R as g,M as h,I as i,de as j,we as p,Re as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
