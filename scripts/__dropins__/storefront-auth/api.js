/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as O}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as ct}from"@dropins/tools/recaptcha.js";import{CUSTOMER_INFORMATION_FRAGMENT as x}from"./fragments.js";import{FetchGraphQL as st}from"@dropins/tools/fetch-graphql.js";import{merge as Q,Initializer as ut,Config as mt}from"@dropins/tools/lib.js";const f={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_lastname:"auth_dropin_lastname",auth_dropin_admin_session:"auth_dropin_admin_session",auth_dropin_website_code:"auth_dropin_website_code"},_t=["localhost","127.0.0.1","::1"],D=3600,dt="storeConfig",L=t=>{const e=document.cookie.split(";");let o;return e.forEach(r=>{const[a,n]=r.trim().split("=");a===t&&(o=decodeURIComponent(n))}),o},I=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},K=t=>{const e=_t.includes(window.location.hostname)?"":"Secure";return`path=/; ${t}; SameSite=Lax; ${e};`},lt=async()=>{try{const t=await nt({cache:"no-store"});return t&&sessionStorage.setItem(dt,JSON.stringify(t)),{lifetime:`Max-Age=${(t==null?void 0:t.customerAccessTokenLifetime)||D}`,websiteCode:(t==null?void 0:t.websiteCode)||""}}catch(t){return console.error("getAuthCookieContext() Error:",t),{lifetime:`Max-Age=${D}`,websiteCode:""}}},U={GLOBAL:0,PER_WEBSITE:1};var ft=(t=>(t.BOOLEAN="BOOLEAN",t.DATE="DATE",t.DATETIME="DATETIME",t.DROPDOWN="DROPDOWN",t.FILE="FILE",t.GALLERY="GALLERY",t.HIDDEN="HIDDEN",t.IMAGE="IMAGE",t.MEDIA_IMAGE="MEDIA_IMAGE",t.MULTILINE="MULTILINE",t.MULTISELECT="MULTISELECT",t.PRICE="PRICE",t.SELECT="SELECT",t.TEXT="TEXT",t.TEXTAREA="TEXTAREA",t.UNDEFINED="UNDEFINED",t.VISUAL="VISUAL",t.WEIGHT="WEIGHT",t.EMPTY="",t))(ft||{});const{setEndpoint:_e,setFetchGraphQlHeader:H,removeFetchGraphQlHeader:X,setFetchGraphQlHeaders:de,fetchGraphQl:h,getConfig:le}=new st().getMethods(),ht=async t=>{if(!t||t.trim()==="")return"";try{const e=atob(t),o=new Uint8Array(e.length);for(let c=0;c<e.length;c++)o[c]=e.charCodeAt(c);const r=await crypto.subtle.digest("SHA-1",o);return Array.from(new Uint8Array(r)).map(c=>c.toString(16).padStart(2,"0")).join("")}catch(e){return console.error(`Failed to convert base64 to SHA1: ${e instanceof Error?e.message:"Unknown error"}`),""}},Et="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",y=async t=>{const e=t?await ht(t):Et;O.emit("auth/group-uid",e)},Y=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),Tt=t=>{var e,o,r,a,n,c,u,i,m,_,d,l,C,E,T,g,R,w,s,S,M,V;return{autocompleteOnStorefront:((o=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:o.autocomplete_on_storefront)||!1,minLength:((a=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((c=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:c.required_character_classes_number)||0,createAccountConfirmation:((i=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:i.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:_.customer_access_token_lifetime)*D||D,websiteName:((l=(d=t==null?void 0:t.data)==null?void 0:d.storeConfig)==null?void 0:l.website_name)||"",shoppingAssistanceEnabled:((E=(C=t==null?void 0:t.data)==null?void 0:C.storeConfig)==null?void 0:E.shopping_assistance_enabled)||!1,shoppingAssistanceCheckboxTitle:((g=(T=t==null?void 0:t.data)==null?void 0:T.storeConfig)==null?void 0:g.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((w=(R=t==null?void 0:t.data)==null?void 0:R.storeConfig)==null?void 0:w.shopping_assistance_checkbox_tooltip)||"",websiteCode:((S=(s=t==null?void 0:t.data)==null?void 0:s.storeConfig)==null?void 0:S.website_code)||"",shareCustomerAccountsScope:((V=(M=t==null?void 0:t.data)==null?void 0:M.storeConfig)==null?void 0:V.share_customer_accounts_scope)===U.PER_WEBSITE?U.PER_WEBSITE:U.GLOBAL}},Ct=t=>{var o,r,a;let e="";return(o=t==null?void 0:t.errors)!=null&&o.length&&(e=(r=t==null?void 0:t.errors[0])==null?void 0:r.message),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.requestPasswordResetEmail)}},gt=t=>{var o,r,a;let e="";return(o=t==null?void 0:t.errors)!=null&&o.length&&(e=((r=t==null?void 0:t.errors[0])==null?void 0:r.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},Ot=t=>{var o,r,a,n,c,u,i,m,_,d,l,C,E,T,g;const e={email:((r=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:r.email)??"",firstName:((n=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:n.firstname)??"",lastName:((u=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:u.lastname)??"",groupUid:((_=(m=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:m.group)==null?void 0:_.uid)??"",allowRemoteShoppingAssistance:(l=(d=t==null?void 0:t.data)==null?void 0:d.customer)==null?void 0:l.allow_remote_shopping_assistance};return Q(e,(g=(T=(E=(C=N==null?void 0:N.getConfig())==null?void 0:C.models)==null?void 0:E.CustomerModel)==null?void 0:T.transformer)==null?void 0:g.call(T,t.data))},Z=t=>t.replace(/_([a-z])/g,(e,o)=>o.toUpperCase()),At=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),G=(t,e,o)=>{const r=["string","boolean","number"],a=e==="camelCase"?Z:At;return Array.isArray(t)?t.map(n=>r.includes(typeof n)||n===null?n:typeof n=="object"?G(n,e,o):n):t!==null&&typeof t=="object"?Object.entries(t).reduce((n,[c,u])=>{const i=o&&o[c]?o[c]:a(c);return n[i]=r.includes(typeof u)||u===null?u:G(u,e,o),n},{}):t},Rt=t=>{const e=[];for(const o of t)if(!(o.frontend_input!=="MULTILINE"||o.multiline_count<2))for(let r=2;r<=o.multiline_count;r++){const a={...o,is_required:!1,name:`${o.code}_multiline_${r}`,code:`${o.code}_multiline_${r}`,id:`${o.code}_multiline_${r}`};e.push(a)}return e},St=t=>{var n,c,u;const e=((c=(n=t==null?void 0:t.data)==null?void 0:n.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const o=(u=e.filter(i=>{var m;return!((m=i.frontend_input)!=null&&m.includes("HIDDEN"))}))==null?void 0:u.map(({code:i,...m})=>{const _=i!=="country_id"?i:"country_code";return{...m,name:_,id:_,code:_}}),r=Rt(o);return o.concat(r).map(i=>{var d;const m=i.code==="firstname"?"firstName":i.code==="lastname"?"lastName":Z(i.code),_=(d=i.options)==null?void 0:d.map(l=>({isDefault:l.is_default,text:l.label,value:l.value}));return G({...i,options:_,customUpperCode:m},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((i,m)=>i.orderNumber-m.orderNumber)},wt=(t,e)=>{var r,a,n,c,u,i,m,_,d,l,C,E,T,g,R,w;let o;if(e){const{data:s}=t;o={firstName:((a=(r=s==null?void 0:s.createCustomerV2)==null?void 0:r.customer)==null?void 0:a.firstname)??"",lastName:((c=(n=s==null?void 0:s.createCustomerV2)==null?void 0:n.customer)==null?void 0:c.lastname)??"",email:((i=(u=s==null?void 0:s.createCustomerV2)==null?void 0:u.customer)==null?void 0:i.email)??"",customAttributes:((m=s==null?void 0:s.createCustomerV2)==null?void 0:m.custom_attributes)??[],errors:(t==null?void 0:t.errors)??[]}}else{const{data:s}=t;o={firstName:((d=(_=s==null?void 0:s.createCustomer)==null?void 0:_.customer)==null?void 0:d.firstname)??"",lastName:((C=(l=s==null?void 0:s.createCustomer)==null?void 0:l.customer)==null?void 0:C.lastname)??"",email:((T=(E=s==null?void 0:s.createCustomer)==null?void 0:E.customer)==null?void 0:T.email)??"",errors:(t==null?void 0:t.errors)??[]}}return Q(o,(w=(R=(g=N.getConfig().models)==null?void 0:g.CustomerModel)==null?void 0:R.transformer)==null?void 0:w.call(R,t))},It=t=>{var e,o;return{priceBookId:((o=(e=t==null?void 0:t.data)==null?void 0:e.commerceOptimizer)==null?void 0:o.priceBookId)||""}},tt="accountContext",Nt="channelContext";var k=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(k||{});const q={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function et(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function B(t,e){const o=et();o.push({[t]:null}),o.push({[t]:e})}function bt(){B(Nt,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function F(t,e){et().push(r=>{const a=r.getState?r.getState():{};r.push({event:t,eventInfo:{...a,...e}})})}function Mt(t){const e=Y(t);B(tt,e),F(q.CREATE_ACCOUNT)}function yt(t){const e=Y(t);B(tt,e),F(q.SIGN_IN)}function kt(){F(q.SIGN_OUT)}const ot=(t,e)=>{const o=sessionStorage.getItem("storeConfig");let r={};try{r=o?JSON.parse(o):{}}catch{r={}}const a={...r,...e};switch(bt(),t){case"create-account":Mt(a);break;case"sign-in":yt(a);break;case"sign-out":kt();break;default:return null}},rt=async t=>{Object.values(f).forEach(e=>I(e)),X(t),await y(),O.emit("authenticated",!1),ot(k.SIGN_OUT,{})},v=new mt(void 0),Pt=async t=>{try{const e=L(f.auth_dropin_website_code);if(!e)return!1;const o=await nt({cache:"no-store"});if((o==null?void 0:o.shareCustomerAccountsScope)!==U.PER_WEBSITE||!o.websiteCode)return!1;if(o.websiteCode!==e)return await rt(t),!0}catch{}return!1},p=new ut({init:async t=>{const o={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...t};p.config.setConfig(o);const r=L(f.auth_dropin_user_token),a=r?await Pt(o.authHeaderConfig.header):!1,[n]=await Promise.all([a?Promise.resolve(!1):it(o.authHeaderConfig.header,o.authHeaderConfig.tokenPrefix,o.adobeCommerceOptimizer),o.customerPermissionRoles&&r&&!a?J():Promise.resolve(),o.adobeCommerceOptimizer?j():Promise.resolve()]);v.setConfig(n)},listeners:()=>[O.on("authenticated",t=>{const e=v.getConfig();if(e!==void 0&&t!==e){v.setConfig(t);const{customerPermissionRoles:o,adobeCommerceOptimizer:r}=p.config.getConfig();o&&J(),r&&j()}})]}),N=p.config,Ut=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${x}
`,Dt=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${x}
`,A=t=>{throw t instanceof DOMException&&t.name==="AbortError"||O.emit("auth/error",{source:"auth",type:"network",error:t}),t},$=async()=>{const t=await ct();t&&H("X-ReCaptcha",t)},$t=t=>{if(!t.dob)return t;const{dob:e,...o}=t;return{...o,date_of_birth:e}},fe=async(t,e)=>{await $();const o=await h(e?Dt:Ut,{method:"POST",variables:{input:{...$t(t)}}}).catch(A);return wt(o,e)},vt=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
        ... on CustomerAttributeMetadata {
          multiline_count
          sort_order
          validate_rules {
            name
            value
          }
        }
      }
      errors {
        type
        message
      }
    }
  }
`,W=t=>{const e=t.map(o=>o.message).join(" ");throw Error(e)},he=async t=>await h(vt,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?W(e.errors):St(e)}).catch(A),Gt=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${x}
`,pt=async t=>{if(t){const{authHeaderConfig:e}=N.getConfig();H(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(Gt,{method:"GET",cache:"force-cache"}).then(e=>Ot(e)).catch(A)},xt=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,at=t=>{if(!t||typeof t!="string")return null;try{const e=t.split(".");if(e.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const r=e[1].replace(/-/g,"+").replace(/_/g,"/"),a=r.padEnd(r.length+(4-r.length%4)%4,"="),n=atob(a);return JSON.parse(n)}catch(e){return console.error("[decodeJwtToken] Failed to decode JWT:",e),null}},Lt=t=>{const e=at(t);return e?typeof e.admin_id=="number"&&e.admin_id>0:!1},Ht=(t,e)=>{const o=at(t);if(o&&typeof o.exp=="number"&&o.exp>0){const r=Math.floor(Date.now()/1e3);return`Max-Age=${Math.max(0,o.exp-r)}`}return e},Ee=async({email:t,password:e,translations:o,onErrorCallback:r,handleSetInLineAlertProps:a,apiErrorMessageOverride:n})=>{var T,g,R,w;await $();const c=await h(xt,{method:"POST",variables:{email:t,password:e}}).catch(A);if(!((g=(T=c==null?void 0:c.data)==null?void 0:T.generateCustomerToken)!=null&&g.token)){const s=o.customerTokenErrorMessage,S=c!=null&&c.errors?c.errors[0].message:s,M=n??S;return r==null||r(S),a==null||a({type:"error",text:M}),{errorMessage:S,displayErrorMessage:M,userName:"",userEmail:""}}const u=(w=(R=c==null?void 0:c.data)==null?void 0:R.generateCustomerToken)==null?void 0:w.token,i=await pt(u),m=i==null?void 0:i.firstName,_=(i==null?void 0:i.lastName)??"",d=i==null?void 0:i.email;if(!m||!d){const s=o.customerTokenErrorMessage,S=n??s;return r==null||r(s),a==null||a({type:"error",text:S}),{errorMessage:s,displayErrorMessage:S,userName:"",userEmail:""}}const{lifetime:l,websiteCode:C}=await lt(),E=K(l);if(document.cookie=`${f.auth_dropin_firstname}=${encodeURIComponent(m)}; ${E}`,document.cookie=`${f.auth_dropin_lastname}=${encodeURIComponent(_)}; ${E}`,document.cookie=`${f.auth_dropin_user_token}=${encodeURIComponent(u)}; ${E}`,C?document.cookie=`${f.auth_dropin_website_code}=${encodeURIComponent(C)}; ${E}`:I(f.auth_dropin_website_code),Lt(u)){const s=Ht(u,l);document.cookie=`${f.auth_dropin_admin_session}=true; ${K(s)}`}else I(f.auth_dropin_admin_session);return await y(u?i==null?void 0:i.groupUid:void 0),O.emit("authenticated",!!u),ot(k==null?void 0:k.SIGN_IN,{...i}),{errorMessage:"",displayErrorMessage:"",userName:m,userEmail:d}},qt=`
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
      website_code
      website_name
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
      share_customer_accounts_scope
    }
  }
`,nt=async({cache:t="force-cache"}={})=>await h(qt,{method:"GET",cache:t}).then(e=>{var o;return(o=e.errors)!=null&&o.length?W(e.errors):Tt(e)}).catch(A),Bt=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,Te=async t=>(await $(),await h(Bt,{method:"POST",variables:{email:t}}).then(e=>Ct(e)).catch(A)),Ft=`
  mutation RESET_PASSWORD(
    $email: String!
    $resetPasswordToken: String!
    $newPassword: String!
  ) {
    resetPassword(
      email: $email
      resetPasswordToken: $resetPasswordToken
      newPassword: $newPassword
    )
  }
`,Wt=t=>{var o,r,a;let e="";return(o=t==null?void 0:t.errors)!=null&&o.length&&(e=(r=t==null?void 0:t.errors[0])==null?void 0:r.message),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.resetPassword)}},Ce=async(t,e,o)=>(await $(),await h(Ft,{method:"POST",variables:{email:t,resetPasswordToken:e,newPassword:o}}).then(r=>Wt(r)).catch(A)),Vt=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,Kt=`
  query VALIDATE_TOKEN {
    customer {
      firstname
    }
  }
`,zt=`
  query VALIDATE_TOKEN_WITH_GROUP {
    customer {
      firstname
      group {
        uid
      }
    }
  }
`,it=async(t="Authorization",e="Bearer",o=!1)=>{const r=L(f.auth_dropin_user_token);return r?(H(t,`${e} ${r}`),h(o?zt:Kt).then(async n=>{var u,i,m,_;if(!!!((u=n.errors)!=null&&u.find(d=>{var l;return((l=d.extensions)==null?void 0:l.category)==="graphql-authentication"}))){const d=o?(_=(m=(i=n.data)==null?void 0:i.customer)==null?void 0:m.group)==null?void 0:_.uid:void 0;return await y(d),O.emit("authenticated",!0),!0}return I(f.auth_dropin_user_token),I(f.auth_dropin_firstname),I(f.auth_dropin_lastname),I(f.auth_dropin_admin_session),X(t),await y(),O.emit("authenticated",!1),!1})):(await y(),O.emit("authenticated",!1),!1)},ge=async()=>{const{authHeaderConfig:t}=N.getConfig();return await h(Vt,{method:"POST"}).then(async e=>{const o=gt(e);if(o!=null&&o.success)await rt(t.header);else{const r=`
          ERROR revokeCustomerToken: ${o.message}`;console.error(r),it()}return o}).catch(A)},Jt=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,Oe=async({customerEmail:t,customerConfirmationKey:e})=>await h(Jt,{method:"POST",variables:{email:t,confirmation_key:e}}).catch(A),jt=`
  mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
    resendConfirmationEmail(email: $email)
  }
`,Ae=async t=>await h(jt,{method:"POST",variables:{email:t}}).catch(A),Qt=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,Re=async t=>await h(Qt,{method:"POST",variables:{input:t}}).then(e=>{var o;return(o=e.errors)!=null&&o.length?W(e.errors):e.data.createCustomerAddress.firstname||""}).catch(A),Xt=`
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
`;let P=null,b=null;const Yt=t=>{const e={},o=r=>{r.forEach(a=>{var n;e[a.id]=!0,(n=a.children)!=null&&n.length&&o(a.children)})};return o(t),e},Zt=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],z="Magento_Sales::place_order",te=t=>(t==null?void 0:t.id)==="MA=="&&Array.isArray(t.permissions)&&t.permissions.length===0,ee=t=>{var e;return(e=t==null?void 0:t.permissions)!=null&&e.length?Yt(t.permissions):{}},oe=(t,e)=>{if(e===!0)return t;const o={...t};return Zt.forEach(r=>{o[r]=!1}),o},re=(t,e)=>{const o=te(t),r=ee(t),a=oe(r,e),c={...{all:!0,...o&&{admin:!0}},...a};return!o&&c[z]===void 0&&Object.keys(r).length===0&&(c[z]=!0),c},ae=async()=>{var t,e,o,r;try{const a=await h(Xt,{method:"GET"}),n=re((e=(t=a.data)==null?void 0:t.customer)==null?void 0:e.role,(r=(o=a.data)==null?void 0:o.customer)==null?void 0:r.purchase_orders_enabled);return P=n,b=null,n}catch(a){throw b=null,a}},J=()=>P?(O.emit("auth/permissions",P),Promise.resolve(P)):(b||(b=ae().then(t=>(O.emit("auth/permissions",t),t))),b),Se=()=>{P=null,b=null},ne=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,j=async()=>{const t=await h(ne,{method:"GET"}),e=It(t);return O.emit("auth/adobe-commerce-optimizer",e),e};export{k as E,ft as F,Se as _resetCache,G as c,N as config,Oe as confirmEmail,fe as createCustomer,Re as createCustomerAddress,h as fetchGraphQl,j as getAdobeCommerceOptimizerData,he as getAttributesForm,le as getConfig,pt as getCustomerData,J as getCustomerRolePermissions,Ee as getCustomerToken,nt as getStoreConfig,p as initialize,ot as p,X as removeFetchGraphQlHeader,Te as requestPasswordResetEmail,Ae as resendConfirmationEmail,Ce as resetPassword,ge as revokeCustomerToken,_e as setEndpoint,H as setFetchGraphQlHeader,de as setFetchGraphQlHeaders,St as t,it as verifyToken};
//# sourceMappingURL=api.js.map
