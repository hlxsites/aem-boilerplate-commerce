/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as $,f as g,h as U,c as J,r as V}from"./setReCaptchaToken.js";import"@dropins/tools/recaptcha.js";import{events as d}from"@dropins/tools/event-bus.js";import{Initializer as j,Config as Q,merge as X}from"@dropins/tools/lib.js";import{CUSTOMER_INFORMATION_FRAGMENT as Z}from"../fragments.js";const _={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_admin_session:"auth_dropin_admin_session"},L=["localhost","127.0.0.1","::1"],M=3600,z=e=>{const t=document.cookie.split(";");let r;return t.forEach(o=>{const[a,s]=o.trim().split("=");a===e&&(r=decodeURIComponent(s))}),r},x=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},B=async()=>{try{const e=sessionStorage.getItem("storeConfig");let r=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!r){const o=await K();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||M}return`Max-Age=${r}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${M}`}},W="login-as-customer",Y=e=>{if(!(e!=null&&e.enabled))return!1;const t=e.triggerUrl||W;return new URL(window.location.href).pathname.includes(t)},ee=()=>{const e=new URLSearchParams(window.location.search),t=e.get("email"),r=e.get("password");return!t||!r?null:{email:t,password:r}},te=async()=>{const e=await B(),t=L.includes(window.location.hostname)?"":"Secure";document.cookie=`${_.auth_dropin_admin_session}=true; path=/; ${e}; SameSite=Lax; ${t};`},re=async e=>{if(!Y(e))return!1;const t=ee();if(!t||!t.email||!t.password)return!1;try{const r=await K();if(!((r==null?void 0:r.loginAsCustomerEnabled)??!1))return!1;const a=await Ee({email:t.email,password:t.password,handleSetInLineAlertProps:s=>{console.error("[SellerAssistedBuying] Login as customer inline alert props:",s)},translations:{customerTokenErrorMessage:"Unable to log in as customer"},onErrorCallback:s=>{console.error("[SellerAssistedBuying] Login as customer error:",s)}});return a!=null&&a.userName?(await te(),!0):!1}catch{return!1}},y=new Q(void 0),b=new j({init:async e=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1,sellerAssistedBuying:{enabled:!1,triggerUrl:"login-as-customer"}},...e};if(b.config.setConfig(r),await re(r.sellerAssistedBuying)){y.setConfig(!0),r.customerPermissionRoles&&await k(),r.adobeCommerceOptimizer&&await I();return}const a=z(_.auth_dropin_user_token),[s]=await Promise.all([we(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&a?k():Promise.resolve(),r.adobeCommerceOptimizer?I():Promise.resolve()]);y.setConfig(s)},listeners:()=>[d.on("authenticated",e=>{const t=y.getConfig();if(t!==void 0&&e!==t){y.setConfig(e);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=b.config.getConfig();r&&k(),o&&I()}})]}),N=b.config,F=e=>({firstName:e.firstName,lastName:e.lastName,emailAddress:(e==null?void 0:e.email)||"",accountId:(e==null?void 0:e.email)||""}),oe=e=>{var t,r,o,a,s,n,c,i,u,m;return{autocompleteOnStorefront:((r=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=e==null?void 0:e.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(s=e==null?void 0:e.data)==null?void 0:s.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((i=(c=e==null?void 0:e.data)==null?void 0:c.storeConfig)==null?void 0:i.create_account_confirmation)||!1,customerAccessTokenLifetime:((m=(u=e==null?void 0:e.data)==null?void 0:u.storeConfig)==null?void 0:m.customer_access_token_lifetime)*M||M,loginAsCustomerEnabled:!0}},ae=e=>{var r,o,a,s,n,c,i,u,m,C,E,T,O,l,w;const t={email:((o=(r=e==null?void 0:e.data)==null?void 0:r.customer)==null?void 0:o.email)??"",firstName:((s=(a=e==null?void 0:e.data)==null?void 0:a.customer)==null?void 0:s.firstname)??"",lastName:((c=(n=e==null?void 0:e.data)==null?void 0:n.customer)==null?void 0:c.lastname)??"",groupUid:((m=(u=(i=e==null?void 0:e.data)==null?void 0:i.customer)==null?void 0:u.group)==null?void 0:m.uid)??"",allowRemoteShoppingAssistance:(E=(C=e==null?void 0:e.data)==null?void 0:C.customer)==null?void 0:E.allow_remote_shopping_assistance};return X(t,(w=(l=(O=(T=N==null?void 0:N.getConfig())==null?void 0:T.models)==null?void 0:O.CustomerModel)==null?void 0:l.transformer)==null?void 0:w.call(l,e.data))},se=e=>{var t,r;return{priceBookId:((r=(t=e==null?void 0:e.data)==null?void 0:t.commerceOptimizer)==null?void 0:r.priceBookId)||""}},ne=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},ie=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${Z}
`,ce=async e=>{if(e){const{authHeaderConfig:t}=N.getConfig();$(t.header,t.tokenPrefix?`${t.tokenPrefix} ${e}`:e)}return await g(ie,{method:"GET",cache:"force-cache"}).then(t=>ae(t)).catch(U)},ue=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,H="accountContext",me="channelContext";var R=(e=>(e.CREATE_ACCOUNT_EVENT="create-account",e.SIGN_IN="sign-in",e.SIGN_OUT="sign-out",e))(R||{});const P={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function q(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function G(e,t){const r=q();r.push({[e]:null}),r.push({[e]:t})}function de(){G(me,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function v(e,t){q().push(o=>{const a=o.getState?o.getState():{};o.push({event:e,eventInfo:{...a,...t}})})}function le(e){const t=F(e);G(H,t),v(P.CREATE_ACCOUNT)}function _e(e){const t=F(e);G(H,t),v(P.SIGN_IN)}function he(){v(P.SIGN_OUT)}const fe=(e,t)=>{const r=sessionStorage.getItem("storeConfig"),a={...r?JSON.parse(r):{},...t};switch(de(),e){case"create-account":le(a);break;case"sign-in":_e(a);break;case"sign-out":he();break;default:return null}},ge=async e=>{if(!e||e.trim()==="")return"";try{const t=atob(e),r=new Uint8Array(t.length);for(let n=0;n<t.length;n++)r[n]=t.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(t){return console.error(`Failed to convert base64 to SHA1: ${t instanceof Error?t.message:"Unknown error"}`),""}},Ce="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",p=async e=>{const t=e?await ge(e):Ce;d.emit("auth/group-uid",t)},Ee=async({email:e,password:t,translations:r,onErrorCallback:o,handleSetInLineAlertProps:a,apiErrorMessageOverride:s})=>{var T,O,l,w;await J();const n=await g(ue,{method:"POST",variables:{email:e,password:t}}).catch(U);if(!((O=(T=n==null?void 0:n.data)==null?void 0:T.generateCustomerToken)!=null&&O.token)){const A=r.customerTokenErrorMessage,h=n!=null&&n.errors?n.errors[0].message:A,D=s??h;return o==null||o(h),a==null||a({type:"error",text:D}),{errorMessage:h,displayErrorMessage:D,userName:"",userEmail:""}}const c=(w=(l=n==null?void 0:n.data)==null?void 0:l.generateCustomerToken)==null?void 0:w.token,i=await ce(c),u=i==null?void 0:i.firstName,m=i==null?void 0:i.email;if(!u||!m){const A=r.customerTokenErrorMessage,h=s??A;return o==null||o(A),a==null||a({type:"error",text:h}),{errorMessage:A,displayErrorMessage:h,userName:"",userEmail:""}}const C=await B(),E=L.includes(window.location.hostname)?"":"Secure";return document.cookie=`${_.auth_dropin_firstname}=${u}; path=/; ${C}; ${E};`,document.cookie=`${_.auth_dropin_user_token}=${c}; path=/; ${C}; ${E};`,await p(c?i==null?void 0:i.groupUid:void 0),d.emit("authenticated",!!c),fe(R==null?void 0:R.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:u,userEmail:m}},Te=`
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
`,K=async()=>await g(Te,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?ne(e.errors):oe(e)}).catch(U),Oe=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,we=async(e="Authorization",t="Bearer")=>{const r=z(_.auth_dropin_user_token);return r?($(e,`${t} ${r}`),g(Oe).then(async o=>{var s,n,c,i;return!((s=o.errors)!=null&&s.find(u=>{var m;return((m=u.extensions)==null?void 0:m.category)==="graphql-authentication"}))?(await p((i=(c=(n=o.data)==null?void 0:n.customer)==null?void 0:c.group)==null?void 0:i.uid),d.emit("authenticated",!0),!0):(x(_.auth_dropin_user_token),x(_.auth_dropin_admin_session),V(e),await p(),d.emit("authenticated",!1),!1)})):(await p(),d.emit("authenticated",!1),!1)},Ae=`
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
`;let S=null,f=null;const Se=e=>{const t={},r=o=>{o.forEach(a=>{var s;t[a.id]=!0,(s=a.children)!=null&&s.length&&r(a.children)})};return r(e),t},ye=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],Ne=e=>(e==null?void 0:e.id)==="MA=="&&Array.isArray(e.permissions)&&e.permissions.length===0,Re=e=>{var t;return(t=e==null?void 0:e.permissions)!=null&&t.length?Se(e.permissions):{}},pe=(e,t)=>{if(t===!0)return e;const r={...e};return ye.forEach(o=>{r[o]=!1}),r},Me=(e,t)=>{const r=Ne(e),o=Re(e),a=pe(o,t);return{...{all:!0,...r&&{admin:!0}},...a}},ke=async()=>{var e,t,r,o;try{const a=await g(Ae,{method:"GET"}),s=Me((t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return S=s,f=null,s}catch(a){throw f=null,a}},k=()=>S?(d.emit("auth/permissions",S),Promise.resolve(S)):(f||(f=ke().then(e=>(d.emit("auth/permissions",e),e))),f),De=()=>{S=null,f=null},Ie=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,I=async()=>{const e=await g(Ie,{method:"GET"}),t=se(e);return d.emit("auth/adobe-commerce-optimizer",t),t};export{_ as C,R as E,De as _,ce as a,k as b,N as c,Ee as d,K as e,x as f,I as g,p as h,b as i,ne as j,fe as p,we as v};
//# sourceMappingURL=getAdobeCommerceOptimizerData.js.map
