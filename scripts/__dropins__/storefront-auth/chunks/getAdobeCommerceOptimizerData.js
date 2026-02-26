/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as L,f as E,h as I,c as V,r as Q}from"./setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import{events as l}from"@dropins/tools/event-bus.js";import{Initializer as W,Config as X,merge as Z}from"@dropins/tools/lib.js";import{CUSTOMER_INFORMATION_FRAGMENT as Y}from"../fragments.js";const h={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},z=["localhost","127.0.0.1","::1"],U=3600,B=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,s]=o.trim().split("=");a===e&&(r=decodeURIComponent(s))}),r},$=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},F=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await j();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||U}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${U}`}},ee="login-as-customer",te=e=>{if(!(e!=null&&e.enabled))return!1;const t=e.triggerUrl||ee;return new URL(window.location.href).pathname.includes(t)},re=()=>{const e=new URLSearchParams(window.location.search),t=e.get("email"),r=e.get("password");return!t||!r?null:{email:t,password:r}},oe=async()=>{const e=await F(),t=z.includes(window.location.hostname)?"":"Secure";document.cookie=`${h.auth_dropin_admin_session}=true; path=/; ${e}; SameSite=Lax; ${t};`},ae=async e=>{if(!te(e))return!1;const t=re();if(!t||!t.email||!t.password)return!1;try{const r=await j();if(!((r==null?void 0:r.loginAsCustomerEnabled)??!1))return!1;const a=await Oe({email:t.email,password:t.password,handleSetInLineAlertProps:s=>{console.error("[SellerAssistedBuying] Login as customer inline alert props:",s)},translations:{customerTokenErrorMessage:"Unable to log in as customer"},onErrorCallback:s=>{console.error("[SellerAssistedBuying] Login as customer error:",s)}});return a!=null&&a.userName?(await oe(),e!=null&&e.successRedirectUrl&&(window.location.href=e.successRedirectUrl),!0):(e!=null&&e.errorRedirectUrl&&(window.location.href=e.errorRedirectUrl),!1)}catch{return e!=null&&e.errorRedirectUrl&&(window.location.href=e.errorRedirectUrl),!1}},se=e=>{if(!e||typeof e!="string")return null;try{const t=e.split(".");if(t.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const o=t[1].replace(/-/g,"+").replace(/_/g,"/"),a=o.padEnd(o.length+(4-o.length%4)%4,"="),s=atob(a);return JSON.parse(s)}catch(t){return console.error("[decodeJwtToken] Failed to decode JWT:",t),null}},H=e=>!!se(e),y=new X(void 0),b=new W({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1,sellerAssistedBuying:{enabled:!1,triggerUrl:"login-as-customer",errorRedirectUrl:"",successRedirectUrl:""}},...e};if(b.config.setConfig(r),await ae(r.sellerAssistedBuying)){y.setConfig(!0),r.customerPermissionRoles&&await p(),r.adobeCommerceOptimizer&&await R();return}const a=B(h.auth_dropin_user_token);if(a&&H(a)){y.setConfig(!0),r.customerPermissionRoles&&await p(),r.adobeCommerceOptimizer&&await R();return}const[s]=await Promise.all([Se(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&a?p():Promise.resolve(),r.adobeCommerceOptimizer?R():Promise.resolve()]);y.setConfig(s)},listeners:()=>[l.on("authenticated",e=>{const t=y.getConfig();if(t!==void 0&&e!==t){y.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=b.config.getConfig();r&&p(),o&&R()}})]}),N=b.config,J=e=>({firstName:e.firstName,lastName:e.lastName,emailAddress:(e==null?void 0:e.email)||"",accountId:(e==null?void 0:e.email)||""}),ne=e=>{var t,r,o,a,s,n,c,m,i,u,_,d;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((m=(c=e==null?void 0:e.data)==null?void 0:c.storeConfig)==null?void 0:m.create_account_confirmation)||!1,customerAccessTokenLifetime:((u=(i=e==null?void 0:e.data)==null?void 0:i.storeConfig)==null?void 0:u.customer_access_token_lifetime)*U||U,loginAsCustomerEnabled:((d=(_=e==null?void 0:e.data)==null?void 0:_.storeConfig)==null?void 0:d.login_as_customer_enabled)??!0}},ie=e=>{var r,o,a,s,n,c,m,i,u,_,d,g,w,f,O;const t={email:((o=(r=e==null?void 0:e.data)==null?void 0:r.customer)==null?void 0:o.email)??"",firstName:((s=(a=e==null?void 0:e.data)==null?void 0:a.customer)==null?void 0:s.firstname)??"",lastName:((c=(n=e==null?void 0:e.data)==null?void 0:n.customer)==null?void 0:c.lastname)??"",groupUid:((u=(i=(m=e==null?void 0:e.data)==null?void 0:m.customer)==null?void 0:i.group)==null?void 0:u.uid)??"",allowRemoteShoppingAssistance:(d=(_=e==null?void 0:e.data)==null?void 0:_.customer)==null?void 0:d.allow_remote_shopping_assistance};return Z(t,(O=(f=(w=(g=N==null?void 0:N.getConfig())==null?void 0:g.models)==null?void 0:w.CustomerModel)==null?void 0:f.transformer)==null?void 0:O.call(f,e.data))},ce=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},ue=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},me=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${Y}
`,de=async e=>{if(e){const{authHeaderConfig:t}=N.getConfig();L(t.header,t.tokenPrefix?`${t.tokenPrefix} ${e}`:e)}return await E(me,{method:"GET",cache:"force-cache"}).then(t=>ie(t)).catch(I)},le=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,q="accountContext",_e="channelContext";var k=(e=>(e.CREATE_ACCOUNT_EVENT="create-account",e.SIGN_IN="sign-in",e.SIGN_OUT="sign-out",e))(k||{});const P={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function K(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function G(e,t){const r=K();r.push({[e]:null}),r.push({[e]:t})}function he(){G(_e,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function v(e,t){K().push(o=>{const a=o.getState?o.getState():{};o.push({event:e,eventInfo:{...a,...t}})})}function fe(e){const t=J(e);G(q,t),v(P.CREATE_ACCOUNT)}function ge(e){const t=J(e);G(q,t),v(P.SIGN_IN)}function Ce(){v(P.SIGN_OUT)}const Te=(e,t)=>{const r=sessionStorage.getItem("storeConfig"),a={...r?JSON.parse(r):{},...t};switch(he(),e){case"create-account":fe(a);break;case"sign-in":ge(a);break;case"sign-out":Ce();break;default:return null}},Ee=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},we="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",M=async e=>{const t=e?await Ee(e):we;l.emit("auth/group-uid",t)},Oe=async({email:e,password:t,translations:r,onErrorCallback:o,handleSetInLineAlertProps:a,apiErrorMessageOverride:s})=>{var w,f,O,D;await V();const n=await E(le,{method:"POST",variables:{email:e,password:t}}).catch(I);if(!((f=(w=n==null?void 0:n.data)==null?void 0:w.generateCustomerToken)!=null&&f.token)){const A=r.customerTokenErrorMessage,C=n!=null&&n.errors?n.errors[0].message:A,x=s??C;return o==null||o(C),a==null||a({type:"error",text:x}),{errorMessage:C,displayErrorMessage:x,userName:"",userEmail:""}}const c=(D=(O=n==null?void 0:n.data)==null?void 0:O.generateCustomerToken)==null?void 0:D.token,m=H(c),i=await de(c),u=i==null?void 0:i.firstName,_=i==null?void 0:i.email;if(!u||!_){const A=r.customerTokenErrorMessage,C=s??A;return o==null||o(A),a==null||a({type:"error",text:C}),{errorMessage:A,displayErrorMessage:C,userName:"",userEmail:""}}const d=await F(),g=z.includes(window.location.hostname)?"":"Secure";return document.cookie=`${h.auth_dropin_firstname}=${u}; path=/; ${d}; ${g};`,document.cookie=`${h.auth_dropin_user_token}=${c}; path=/; ${d}; ${g};`,m&&(document.cookie=`${h.auth_dropin_admin_session}=true; path=/; ${d}; SameSite=Lax; ${g};`),await M(c?i==null?void 0:i.groupUid:void 0),l.emit("authenticated",!!c),Te(k==null?void 0:k.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:u,userEmail:_}},Ae=`
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
      login_as_customer_enabled
    }
  }
`,j=async()=>await E(Ae,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?ue(e.errors):ne(e)}).catch(I),ye=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,Se=async(e="Authorization",t="Bearer")=>{const r=B(h.auth_dropin_user_token);return r?(L(e,`${t} ${r}`),E(ye).then(async o=>{var s,n,c,m;return!((s=o.errors)!=null&&s.find(i=>{var u;return((u=i.extensions)==null?void 0:u.category)==="graphql-authentication"}))?(await M((m=(c=(n=o.data)==null?void 0:n.customer)==null?void 0:c.group)==null?void 0:m.uid),l.emit("authenticated",!0),!0):($(h.auth_dropin_user_token),$(h.auth_dropin_admin_session),Q(e),await M(),l.emit("authenticated",!1),!1)})):(await M(),l.emit("authenticated",!1),!1)},pe=`
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
`;let S=null,T=null;const Re=e=>{const t={},r=o=>{o.forEach(a=>{var s;t[a.id]=!0,(s=a.children)!=null&&s.length&&r(a.children)})};return r(e),t},Ne=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],ke=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,Me=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?Re(e.permissions):{}},Ue=(e,t)=>{if(t===!0)return e;const r={...e};return Ne.forEach(o=>{r[o]=!1}),r},be=(e,t)=>{const r=ke(e),o=Me(e),a=Ue(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},Ie=async()=>{var e,t,r,o;try{const a=await E(pe,{method:"GET"}),s=be((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return S=s,T=null,s}catch(a){throw T=null,a}},p=()=>S?(l.emit("auth/permissions",S),Promise.resolve(S)):(T||(T=Ie().then(e=>(l.emit("auth/permissions",e),e))),T),Le=()=>{S=null,T=null},Pe=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,R=async()=>{const e=await E(Pe,{method:"GET"}),t=ce(e);return l.emit("auth/adobe-commerce-optimizer",t),t};export{h as C,k as E,Le as _,de as a,p as b,N as c,Oe as d,j as e,$ as f,R as g,M as h,b as i,ue as j,Te as p,Se as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
