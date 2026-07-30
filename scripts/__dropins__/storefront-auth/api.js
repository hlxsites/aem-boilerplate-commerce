/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as R}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as et}from"@dropins/tools/recaptcha.js";import{CUSTOMER_INFORMATION_FRAGMENT as v}from"./fragments.js";import{FetchGraphQL as rt}from"@dropins/tools/fetch-graphql.js";import{Initializer as at,Config as ot,merge as K}from"@dropins/tools/lib.js";const f={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname",auth_dropin_lastname:"auth_dropin_lastname",auth_dropin_admin_session:"auth_dropin_admin_session"},nt=["localhost","127.0.0.1","::1"],k=3600,V=t=>{const e=document.cookie.split(";");let r;return e.forEach(a=>{const[o,i]=a.trim().split("=");o===t&&(r=decodeURIComponent(i))}),r},w=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},it=async()=>{try{const t=sessionStorage.getItem("storeConfig");let e={};try{e=t?JSON.parse(t):{}}catch{e={}}let r=e.customerAccessTokenLifetime;if(!r){const a=await pt();sessionStorage.setItem("storeConfig",JSON.stringify(a)),r=(a==null?void 0:a.customerAccessTokenLifetime)||k}return`Max-Age=${r}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${k}`}},P=new ot(void 0),p=new at({init:async t=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...t};p.config.setConfig(r);const a=V(f.auth_dropin_user_token),[o]=await Promise.all([tt(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix,r.adobeCommerceOptimizer),r.customerPermissionRoles&&a?z():Promise.resolve(),r.adobeCommerceOptimizer?B():Promise.resolve()]);P.setConfig(o)},listeners:()=>[R.on("authenticated",t=>{const e=P.getConfig();if(e!==void 0&&t!==e){P.setConfig(t);const{customerPermissionRoles:r,adobeCommerceOptimizer:a}=p.config.getConfig();r&&z(),a&&B()}})]}),N=p.config,{setEndpoint:ae,setFetchGraphQlHeader:D,removeFetchGraphQlHeader:J,setFetchGraphQlHeaders:oe,fetchGraphQl:h,getConfig:ne}=new rt().getMethods(),ct=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${v}
`,st=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${v}
`,S=t=>{throw t instanceof DOMException&&t.name==="AbortError"||R.emit("auth/error",{source:"auth",type:"network",error:t}),t},$=async()=>{const t=await et();t&&D("X-ReCaptcha",t)},W=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),ut=t=>{var e,r,a,o,i,c,u,n,m,_,l,d,g,T,E,O,A,C;return{autocompleteOnStorefront:((r=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((o=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:o.minimum_password_length)||3,requiredCharacterClasses:+((c=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:c.required_character_classes_number)||0,createAccountConfirmation:((n=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:n.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:_.customer_access_token_lifetime)*k||k,websiteName:((d=(l=t==null?void 0:t.data)==null?void 0:l.storeConfig)==null?void 0:d.website_name)||"",shoppingAssistanceEnabled:((T=(g=t==null?void 0:t.data)==null?void 0:g.storeConfig)==null?void 0:T.shopping_assistance_enabled)||!1,shoppingAssistanceCheckboxTitle:((O=(E=t==null?void 0:t.data)==null?void 0:E.storeConfig)==null?void 0:O.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((C=(A=t==null?void 0:t.data)==null?void 0:A.storeConfig)==null?void 0:C.shopping_assistance_checkbox_tooltip)||""}},mt=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(a=t==null?void 0:t.errors[0])==null?void 0:a.message),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.requestPasswordResetEmail)}},dt=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((a=t==null?void 0:t.errors[0])==null?void 0:a.message)||"Unknown error"),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.revokeCustomerToken)}},_t=t=>{var r,a,o,i,c,u,n,m,_,l,d,g,T,E,O;const e={email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)??"",firstName:((i=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:i.firstname)??"",lastName:((u=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:u.lastname)??"",groupUid:((_=(m=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:m.group)==null?void 0:_.uid)??"",allowRemoteShoppingAssistance:(d=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:d.allow_remote_shopping_assistance};return K(e,(O=(E=(T=(g=N==null?void 0:N.getConfig())==null?void 0:g.models)==null?void 0:T.CustomerModel)==null?void 0:E.transformer)==null?void 0:O.call(E,t.data))},j=t=>t.replace(/_([a-z])/g,(e,r)=>r.toUpperCase()),lt=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),U=(t,e,r)=>{const a=["string","boolean","number"],o=e==="camelCase"?j:lt;return Array.isArray(t)?t.map(i=>a.includes(typeof i)||i===null?i:typeof i=="object"?U(i,e,r):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[c,u])=>{const n=r&&r[c]?r[c]:o(c);return i[n]=a.includes(typeof u)||u===null?u:U(u,e,r),i},{}):t},ft=t=>{const e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let a=2;a<=r.multiline_count;a++){const o={...r,is_required:!1,name:`${r.code}_multiline_${a}`,code:`${r.code}_multiline_${a}`,id:`${r.code}_multiline_${a}`};e.push(o)}return e},ht=t=>{var i,c,u;const e=((c=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:c.items)||[];if(!e.length)return[];const r=(u=e.filter(n=>{var m;return!((m=n.frontend_input)!=null&&m.includes("HIDDEN"))}))==null?void 0:u.map(({code:n,...m})=>{const _=n!=="country_id"?n:"country_code";return{...m,name:_,id:_,code:_}}),a=ft(r);return r.concat(a).map(n=>{var l;const m=n.code==="firstname"?"firstName":n.code==="lastname"?"lastName":j(n.code),_=(l=n.options)==null?void 0:l.map(d=>({isDefault:d.is_default,text:d.label,value:d.value}));return U({...n,options:_,customUpperCode:m},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((n,m)=>n.orderNumber-m.orderNumber)},gt=(t,e)=>{var a,o,i,c,u,n,m,_,l,d,g,T,E,O,A,C;let r;if(e){const{data:s}=t;r={firstName:((o=(a=s==null?void 0:s.createCustomerV2)==null?void 0:a.customer)==null?void 0:o.firstname)??"",lastName:((c=(i=s==null?void 0:s.createCustomerV2)==null?void 0:i.customer)==null?void 0:c.lastname)??"",email:((n=(u=s==null?void 0:s.createCustomerV2)==null?void 0:u.customer)==null?void 0:n.email)??"",customAttributes:((m=s==null?void 0:s.createCustomerV2)==null?void 0:m.custom_attributes)??[],errors:(t==null?void 0:t.errors)??[]}}else{const{data:s}=t;r={firstName:((l=(_=s==null?void 0:s.createCustomer)==null?void 0:_.customer)==null?void 0:l.firstname)??"",lastName:((g=(d=s==null?void 0:s.createCustomer)==null?void 0:d.customer)==null?void 0:g.lastname)??"",email:((E=(T=s==null?void 0:s.createCustomer)==null?void 0:T.customer)==null?void 0:E.email)??"",errors:(t==null?void 0:t.errors)??[]}}return K(r,(C=(A=(O=N.getConfig().models)==null?void 0:O.CustomerModel)==null?void 0:A.transformer)==null?void 0:C.call(A,t))},Et=t=>{var e,r;return{priceBookId:((r=(e=t==null?void 0:t.data)==null?void 0:e.commerceOptimizer)==null?void 0:r.priceBookId)||""}},Ct=t=>{if(!t.dob)return t;const{dob:e,...r}=t;return{...r,date_of_birth:e}},ie=async(t,e)=>{await $();const r=await h(e?st:ct,{method:"POST",variables:{input:{...Ct(t)}}}).catch(S);return gt(r,e)},Tt=`
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
`,x=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},ce=async t=>await h(Tt,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?x(e.errors):ht(e)}).catch(S),Ot=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${v}
`,Rt=async t=>{if(t){const{authHeaderConfig:e}=N.getConfig();D(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(Ot,{method:"GET",cache:"force-cache"}).then(e=>_t(e)).catch(S)},St=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,Q="accountContext",At="channelContext";var M=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(M||{});const G={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function X(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function L(t,e){const r=X();r.push({[t]:null}),r.push({[t]:e})}function wt(){L(At,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function F(t,e){X().push(a=>{const o=a.getState?a.getState():{};a.push({event:t,eventInfo:{...o,...e}})})}function Nt(t){const e=W(t);L(Q,e),F(G.CREATE_ACCOUNT)}function yt(t){const e=W(t);L(Q,e),F(G.SIGN_IN)}function Mt(){F(G.SIGN_OUT)}const Z=(t,e)=>{const r=sessionStorage.getItem("storeConfig");let a={};try{a=r?JSON.parse(r):{}}catch{a={}}const o={...a,...e};switch(wt(),t){case"create-account":Nt(o);break;case"sign-in":yt(o);break;case"sign-out":Mt();break;default:return null}},bt=async t=>{if(!t||t.trim()==="")return"";try{const e=atob(t),r=new Uint8Array(e.length);for(let c=0;c<e.length;c++)r[c]=e.charCodeAt(c);const a=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(a)).map(c=>c.toString(16).padStart(2,"0")).join("")}catch(e){return console.error(`Failed to convert base64 to SHA1: ${e instanceof Error?e.message:"Unknown error"}`),""}},It="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",b=async t=>{const e=t?await bt(t):It;R.emit("auth/group-uid",e)},Y=t=>{if(!t||typeof t!="string")return null;try{const e=t.split(".");if(e.length!==3)return console.error("[decodeJwtToken] Invalid JWT format: expected 3 parts"),null;const a=e[1].replace(/-/g,"+").replace(/_/g,"/"),o=a.padEnd(a.length+(4-a.length%4)%4,"="),i=atob(o);return JSON.parse(i)}catch(e){return console.error("[decodeJwtToken] Failed to decode JWT:",e),null}},kt=t=>{const e=Y(t);return e?typeof e.admin_id=="number"&&e.admin_id>0:!1},$t=(t,e)=>{const r=Y(t);if(r&&typeof r.exp=="number"&&r.exp>0){const a=Math.floor(Date.now()/1e3);return`Max-Age=${Math.max(0,r.exp-a)}`}return e},se=async({email:t,password:e,translations:r,onErrorCallback:a,handleSetInLineAlertProps:o,apiErrorMessageOverride:i})=>{var T,E,O,A;await $();const c=await h(St,{method:"POST",variables:{email:t,password:e}}).catch(S);if(!((E=(T=c==null?void 0:c.data)==null?void 0:T.generateCustomerToken)!=null&&E.token)){const C=r.customerTokenErrorMessage,s=c!=null&&c.errors?c.errors[0].message:C,q=i??s;return a==null||a(s),o==null||o({type:"error",text:q}),{errorMessage:s,displayErrorMessage:q,userName:"",userEmail:""}}const u=(A=(O=c==null?void 0:c.data)==null?void 0:O.generateCustomerToken)==null?void 0:A.token,n=await Rt(u),m=n==null?void 0:n.firstName,_=(n==null?void 0:n.lastName)??"",l=n==null?void 0:n.email;if(!m||!l){const C=r.customerTokenErrorMessage,s=i??C;return a==null||a(C),o==null||o({type:"error",text:s}),{errorMessage:C,displayErrorMessage:s,userName:"",userEmail:""}}const d=await it(),g=nt.includes(window.location.hostname)?"":"Secure";if(document.cookie=`${f.auth_dropin_firstname}=${encodeURIComponent(m)}; path=/; ${d}; SameSite=Lax; ${g};`,document.cookie=`${f.auth_dropin_lastname}=${encodeURIComponent(_)}; path=/; ${d}; SameSite=Lax; ${g};`,document.cookie=`${f.auth_dropin_user_token}=${encodeURIComponent(u)}; path=/; ${d}; SameSite=Lax; ${g};`,kt(u)){const C=$t(u,d);document.cookie=`${f.auth_dropin_admin_session}=true; path=/; ${C}; SameSite=Lax; ${g};`}else w(f.auth_dropin_admin_session);return await b(u?n==null?void 0:n.groupUid:void 0),R.emit("authenticated",!!u),Z(M==null?void 0:M.SIGN_IN,{...n}),{errorMessage:"",displayErrorMessage:"",userName:m,userEmail:l}},Pt=`
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
`,pt=async()=>await h(Pt,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?x(t.errors):ut(t)}).catch(S),Ut=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,ue=async t=>(await $(),await h(Ut,{method:"POST",variables:{email:t}}).then(e=>mt(e)).catch(S)),vt=`
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
`,Dt=t=>{var r,a,o;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(a=t==null?void 0:t.errors[0])==null?void 0:a.message),{message:e,success:!!((o=t==null?void 0:t.data)!=null&&o.resetPassword)}},me=async(t,e,r)=>(await $(),await h(vt,{method:"POST",variables:{email:t,resetPasswordToken:e,newPassword:r}}).then(a=>Dt(a)).catch(S)),xt=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,Gt=`
  query VALIDATE_TOKEN {
    customer {
      firstname
    }
  }
`,Lt=`
  query VALIDATE_TOKEN_WITH_GROUP {
    customer {
      firstname
      group {
        uid
      }
    }
  }
`,tt=async(t="Authorization",e="Bearer",r=!1)=>{const a=V(f.auth_dropin_user_token);return a?(D(t,`${e} ${a}`),h(r?Lt:Gt).then(async i=>{var u,n,m,_;if(!!!((u=i.errors)!=null&&u.find(l=>{var d;return((d=l.extensions)==null?void 0:d.category)==="graphql-authentication"}))){const l=r?(_=(m=(n=i.data)==null?void 0:n.customer)==null?void 0:m.group)==null?void 0:_.uid:void 0;return await b(l),R.emit("authenticated",!0),!0}return w(f.auth_dropin_user_token),w(f.auth_dropin_firstname),w(f.auth_dropin_lastname),w(f.auth_dropin_admin_session),J(t),await b(),R.emit("authenticated",!1),!1})):(await b(),R.emit("authenticated",!1),!1)},de=async()=>{const{authHeaderConfig:t}=N.getConfig();return await h(xt,{method:"POST"}).then(async e=>{const r=dt(e);if(r!=null&&r.success)[f.auth_dropin_user_token,f.auth_dropin_firstname,f.auth_dropin_lastname,f.auth_dropin_admin_session].forEach(a=>{w(a)}),J(t.header),await b(),R.emit("authenticated",!1),Z(M.SIGN_OUT,{});else{const a=`
          ERROR revokeCustomerToken: ${r.message}`;console.error(a),tt()}return r}).catch(S)},Ft=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,_e=async({customerEmail:t,customerConfirmationKey:e})=>await h(Ft,{method:"POST",variables:{email:t,confirmation_key:e}}).catch(S),qt=`
  mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
    resendConfirmationEmail(email: $email)
  }
`,le=async t=>await h(qt,{method:"POST",variables:{email:t}}).catch(S),Ht=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,fe=async t=>await h(Ht,{method:"POST",variables:{input:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?x(e.errors):e.data.createCustomerAddress.firstname||""}).catch(S),zt=`
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
`;let I=null,y=null;const Bt=t=>{const e={},r=a=>{a.forEach(o=>{var i;e[o.id]=!0,(i=o.children)!=null&&i.length&&r(o.children)})};return r(t),e},Kt=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],H="Magento_Sales::place_order",Vt=t=>(t==null?void 0:t.id)==="MA=="&&Array.isArray(t.permissions)&&t.permissions.length===0,Jt=t=>{var e;return(e=t==null?void 0:t.permissions)!=null&&e.length?Bt(t.permissions):{}},Wt=(t,e)=>{if(e===!0)return t;const r={...t};return Kt.forEach(a=>{r[a]=!1}),r},jt=(t,e)=>{const r=Vt(t),a=Jt(t),o=Wt(a,e),c={...{all:!0,...r&&{admin:!0}},...o};return!r&&c[H]===void 0&&Object.keys(a).length===0&&(c[H]=!0),c},Qt=async()=>{var t,e,r,a;try{const o=await h(zt,{method:"GET"}),i=jt((e=(t=o.data)==null?void 0:t.customer)==null?void 0:e.role,(a=(r=o.data)==null?void 0:r.customer)==null?void 0:a.purchase_orders_enabled);return I=i,y=null,i}catch(o){throw y=null,o}},z=()=>I?(R.emit("auth/permissions",I),Promise.resolve(I)):(y||(y=Qt().then(t=>(R.emit("auth/permissions",t),t))),y),he=()=>{I=null,y=null},Xt=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,B=async()=>{const t=await h(Xt,{method:"GET"}),e=Et(t);return R.emit("auth/adobe-commerce-optimizer",e),e};export{M as E,he as _resetCache,U as c,N as config,_e as confirmEmail,ie as createCustomer,fe as createCustomerAddress,h as fetchGraphQl,B as getAdobeCommerceOptimizerData,ce as getAttributesForm,ne as getConfig,Rt as getCustomerData,z as getCustomerRolePermissions,se as getCustomerToken,pt as getStoreConfig,p as initialize,Z as p,J as removeFetchGraphQlHeader,ue as requestPasswordResetEmail,le as resendConfirmationEmail,me as resetPassword,de as revokeCustomerToken,ae as setEndpoint,D as setFetchGraphQlHeader,oe as setFetchGraphQlHeaders,ht as t,tt as verifyToken};
//# sourceMappingURL=api.js.map
