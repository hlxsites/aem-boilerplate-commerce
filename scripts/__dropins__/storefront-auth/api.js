/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as h}from"@dropins/tools/event-bus.js";import{verifyReCaptcha as Y}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as tt}from"@dropins/tools/fetch-graphql.js";import{Initializer as et,Config as rt,merge as z}from"@dropins/tools/lib.js";const R={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},ot=["localhost","127.0.0.1","::1"],b=3600,B=t=>{const e=document.cookie.split(";");let r;return e.forEach(o=>{const[a,i]=o.trim().split("=");a===t&&(r=decodeURIComponent(i))}),r},K=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},at=async()=>{try{const t=sessionStorage.getItem("storeConfig");let r=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!r){const o=await bt();sessionStorage.setItem("storeConfig",JSON.stringify(o)),r=(o==null?void 0:o.customerAccessTokenLifetime)||b}return`Max-Age=${r}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${b}`}},P=new rt(void 0),$=new et({init:async t=>{const r={...{authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"},customerPermissionRoles:!1,adobeCommerceOptimizer:!1},...t};$.config.setConfig(r);const o=B(R.auth_dropin_user_token),[a]=await Promise.all([Z(r.authHeaderConfig.header,r.authHeaderConfig.tokenPrefix),r.customerPermissionRoles&&o?q():Promise.resolve(),r.adobeCommerceOptimizer?H():Promise.resolve()]);P.setConfig(a)},listeners:()=>[h.on("authenticated",t=>{const e=P.getConfig();if(e!==void 0&&t!==e){P.setConfig(t);const{customerPermissionRoles:r,adobeCommerceOptimizer:o}=$.config.getConfig();r&&q(),o&&H()}})]}),S=$.config,{setEndpoint:Xt,setFetchGraphQlHeader:v,removeFetchGraphQlHeader:V,setFetchGraphQlHeaders:Zt,fetchGraphQl:d,getConfig:Yt}=new tt().getMethods(),D=`
  fragment CUSTOMER_INFORMATION_FRAGMENT on Customer {
    __typename
    firstname
    lastname
    email
    group {
      uid
    }
  }
`,nt=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${D}
`,it=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        ...CUSTOMER_INFORMATION_FRAGMENT
      }
    }
  }
  ${D}
`,E=t=>{throw t instanceof DOMException&&t.name==="AbortError"||h.emit("auth/error",{source:"auth",type:"network",error:t}),t},k=async()=>{const t=await Y();t&&v("X-ReCaptcha",t)},Q=t=>({firstName:t.firstName,lastName:t.lastName,emailAddress:(t==null?void 0:t.email)||"",accountId:(t==null?void 0:t.email)||""}),ct=t=>{var e,r,o,a,i,n,u,c,m,_;return{autocompleteOnStorefront:((r=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:r.autocomplete_on_storefront)||!1,minLength:((a=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((n=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:n.required_character_classes_number)||0,createAccountConfirmation:((c=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:c.create_account_confirmation)||!1,customerAccessTokenLifetime:((_=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:_.customer_access_token_lifetime)*b||b}},st=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(o=t==null?void 0:t.errors[0])==null?void 0:o.message),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.requestPasswordResetEmail)}},ut=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=((o=t==null?void 0:t.errors[0])==null?void 0:o.message)||"Unknown error"),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.revokeCustomerToken)}},mt=t=>{var r,o,a,i,n,u,c,m,_,f,l,g,O;const e={email:((o=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:o.email)??"",firstName:((i=(a=t==null?void 0:t.data)==null?void 0:a.customer)==null?void 0:i.firstname)??"",lastName:((u=(n=t==null?void 0:t.data)==null?void 0:n.customer)==null?void 0:u.lastname)??"",groupUid:((_=(m=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:m.group)==null?void 0:_.uid)??""};return z(e,(O=(g=(l=(f=S==null?void 0:S.getConfig())==null?void 0:f.models)==null?void 0:l.CustomerModel)==null?void 0:g.transformer)==null?void 0:O.call(g,t.data))},j=t=>t.replace(/_([a-z])/g,(e,r)=>r.toUpperCase()),_t=t=>t.replace(/([A-Z])/g,e=>`_${e.toLowerCase()}`),U=(t,e,r)=>{const o=["string","boolean","number"],a=e==="camelCase"?j:_t;return Array.isArray(t)?t.map(i=>o.includes(typeof i)||i===null?i:typeof i=="object"?U(i,e,r):i):t!==null&&typeof t=="object"?Object.entries(t).reduce((i,[n,u])=>{const c=r&&r[n]?r[n]:a(n);return i[c]=o.includes(typeof u)||u===null?u:U(u,e,r),i},{}):t},dt=t=>{let e=[];for(const r of t)if(!(r.frontend_input!=="MULTILINE"||r.multiline_count<2))for(let o=2;o<=r.multiline_count;o++){const a={...r,is_required:!1,name:`${r.code}_multiline_${o}`,code:`${r.code}_multiline_${o}`,id:`${r.code}_multiline_${o}`};e.push(a)}return e},lt=t=>{var i,n,u;const e=((n=(i=t==null?void 0:t.data)==null?void 0:i.attributesForm)==null?void 0:n.items)||[];if(!e.length)return[];const r=(u=e.filter(c=>{var m;return!((m=c.frontend_input)!=null&&m.includes("HIDDEN"))}))==null?void 0:u.map(({code:c,...m})=>{const _=c!=="country_id"?c:"country_code";return{...m,name:_,id:_,code:_}}),o=dt(r);return r.concat(o).map(c=>{var f;const m=c.code==="firstname"?"firstName":c.code==="lastname"?"lastName":j(c.code),_=(f=c.options)==null?void 0:f.map(l=>({isDefault:l.is_default,text:l.label,value:l.value}));return U({...c,options:_,customUpperCode:m},"camelCase",{frontend_input:"fieldType",frontend_class:"className",is_required:"required",sort_order:"orderNumber"})}).sort((c,m)=>c.orderNumber-m.orderNumber)},ft=(t,e)=>{var o,a,i,n,u,c,m,_,f,l,g,O,N,M,C,T;let r;if(e){const{data:s}=t;r={firstName:((a=(o=s==null?void 0:s.createCustomerV2)==null?void 0:o.customer)==null?void 0:a.firstname)??"",lastName:((n=(i=s==null?void 0:s.createCustomerV2)==null?void 0:i.customer)==null?void 0:n.lastname)??"",email:((c=(u=s==null?void 0:s.createCustomerV2)==null?void 0:u.customer)==null?void 0:c.email)??"",customAttributes:((m=s==null?void 0:s.createCustomerV2)==null?void 0:m.custom_attributes)??[],errors:(t==null?void 0:t.errors)??[]}}else{const{data:s}=t;r={firstName:((f=(_=s==null?void 0:s.createCustomer)==null?void 0:_.customer)==null?void 0:f.firstname)??"",lastName:((g=(l=s==null?void 0:s.createCustomer)==null?void 0:l.customer)==null?void 0:g.lastname)??"",email:((N=(O=s==null?void 0:s.createCustomer)==null?void 0:O.customer)==null?void 0:N.email)??"",errors:(t==null?void 0:t.errors)??[]}}return z(r,(T=(C=(M=S.getConfig().models)==null?void 0:M.CustomerModel)==null?void 0:C.transformer)==null?void 0:T.call(C,t))},ht=t=>{var e,r;return{priceBookId:((r=(e=t==null?void 0:t.data)==null?void 0:e.commerceOptimizer)==null?void 0:r.priceBookId)||""}},Et=t=>{if(!t.dob)return t;const{dob:e,...r}=t;return{...r,date_of_birth:e}},te=async(t,e)=>{await k();const r=await d(e?it:nt,{method:"POST",variables:{input:{...Et(t)}}}).catch(E);return ft(r,e)},gt=`
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
`,G=t=>{const e=t.map(r=>r.message).join(" ");throw Error(e)},ee=async t=>await d(gt,{method:"GET",cache:"force-cache",variables:{formCode:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?G(e.errors):lt(e)}).catch(E),Ct=`
  query GET_CUSTOMER_DATA {
    customer {
      ...CUSTOMER_INFORMATION_FRAGMENT
    }
  }
  ${D}
`,Tt=async t=>{if(t){const{authHeaderConfig:e}=S.getConfig();v(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await d(Ct,{method:"GET",cache:"force-cache"}).then(e=>mt(e)).catch(E)},Ot=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,J="accountContext",Rt="channelContext";var w=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(w||{});const F={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function W(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function x(t,e){const r=W();r.push({[t]:null}),r.push({[t]:e})}function St(){x(Rt,{_id:"https://ns.adobe.com/xdm/channels/web",_type:"https://ns.adobe.com/xdm/channel-types/web"})}function L(t,e){W().push(o=>{const a=o.getState?o.getState():{};o.push({event:t,eventInfo:{...a,...e}})})}function At(t){const e=Q(t);x(J,e),L(F.CREATE_ACCOUNT)}function Nt(t){const e=Q(t);x(J,e),L(F.SIGN_IN)}function Mt(){L(F.SIGN_OUT)}const X=(t,e)=>{const r=sessionStorage.getItem("storeConfig"),a={...r?JSON.parse(r):{},...e};switch(St(),t){case"create-account":At(a);break;case"sign-in":Nt(a);break;case"sign-out":Mt();break;default:return null}},wt=async t=>{if(!t||t.trim()==="")return"";try{const e=atob(t),r=new Uint8Array(e.length);for(let n=0;n<e.length;n++)r[n]=e.charCodeAt(n);const o=await crypto.subtle.digest("SHA-1",r);return Array.from(new Uint8Array(o)).map(n=>n.toString(16).padStart(2,"0")).join("")}catch(e){return console.error(`Failed to convert base64 to SHA1: ${e instanceof Error?e.message:"Unknown error"}`),""}},yt="b6589fc6ab0dc82cf12099d1c2d40ab994e8410c",y=async t=>{const e=t?await wt(t):yt;h.emit("auth/group-uid",e)},re=async({email:t,password:e,translations:r,onErrorCallback:o,handleSetInLineAlertProps:a,apiErrorMessageOverride:i})=>{var g,O,N,M;await k();const n=await d(Ot,{method:"POST",variables:{email:t,password:e}}).catch(E);if(!((O=(g=n==null?void 0:n.data)==null?void 0:g.generateCustomerToken)!=null&&O.token)){const C=r.customerTokenErrorMessage,T=n!=null&&n.errors?n.errors[0].message:C,s=i??T;return o==null||o(T),a==null||a({type:"error",text:s}),{errorMessage:T,displayErrorMessage:s,userName:"",userEmail:""}}const u=(M=(N=n==null?void 0:n.data)==null?void 0:N.generateCustomerToken)==null?void 0:M.token,c=await Tt(u),m=c==null?void 0:c.firstName,_=c==null?void 0:c.email;if(!m||!_){const C=r.customerTokenErrorMessage,T=i??C;return o==null||o(C),a==null||a({type:"error",text:T}),{errorMessage:C,displayErrorMessage:T,userName:"",userEmail:""}}const f=await at(),l=ot.includes(window.location.hostname)?"":"Secure";return document.cookie=`${R.auth_dropin_firstname}=${m}; path=/; ${f}; ${l};`,document.cookie=`${R.auth_dropin_user_token}=${u}; path=/; ${f}; ${l};`,await y(u?c==null?void 0:c.groupUid:void 0),h.emit("authenticated",!!u),X(w==null?void 0:w.SIGN_IN,{...c}),{errorMessage:"",displayErrorMessage:"",userName:m,userEmail:_}},It=`
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
    }
  }
`,bt=async()=>await d(It,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?G(t.errors):ct(t)}).catch(E),kt=`
  mutation REQUEST_PASSWORD_RESET_EMAIL($email: String!) {
    requestPasswordResetEmail(email: $email)
  }
`,oe=async t=>(await k(),await d(kt,{method:"POST",variables:{email:t}}).then(e=>st(e)).catch(E)),Pt=`
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
`,$t=t=>{var r,o,a;let e="";return(r=t==null?void 0:t.errors)!=null&&r.length&&(e=(o=t==null?void 0:t.errors[0])==null?void 0:o.message),{message:e,success:!!((a=t==null?void 0:t.data)!=null&&a.resetPassword)}},ae=async(t,e,r)=>(await k(),await d(Pt,{method:"POST",variables:{email:t,resetPasswordToken:e,newPassword:r}}).then(o=>$t(o)).catch(E)),Ut=`
  mutation REVOKE_CUSTOMER_TOKEN {
    revokeCustomerToken {
      result
    }
  }
`,vt=`
  query VALIDATE_TOKEN {
    customer {
      group {
        uid
      }
    }
  }
`,Z=async(t="Authorization",e="Bearer")=>{const r=B(R.auth_dropin_user_token);return r?(v(t,`${e} ${r}`),d(vt).then(async o=>{var i,n,u,c;return!((i=o.errors)!=null&&i.find(m=>{var _;return((_=m.extensions)==null?void 0:_.category)==="graphql-authentication"}))?(await y((c=(u=(n=o.data)==null?void 0:n.customer)==null?void 0:u.group)==null?void 0:c.uid),h.emit("authenticated",!0),!0):(K(R.auth_dropin_user_token),V(t),await y(),h.emit("authenticated",!1),!1)})):(await y(),h.emit("authenticated",!1),!1)},ne=async()=>{const{authHeaderConfig:t}=S.getConfig();return await d(Ut,{method:"POST"}).then(async e=>{const r=ut(e);if(r!=null&&r.success)[R.auth_dropin_user_token,R.auth_dropin_firstname].forEach(o=>{K(o)}),V(t.header),await y(),h.emit("authenticated",!1),X(w.SIGN_OUT,{});else{const o=`
          ERROR revokeCustomerToken: ${r.message}`;console.error(o),Z()}return r}).catch(E)},Dt=`
  mutation CONFIRM_EMAIL($email: String!, $confirmation_key: String!) {
    confirmEmail(
      input: { email: $email, confirmation_key: $confirmation_key }
    ) {
      customer {
        email
      }
    }
  }
`,ie=async({customerEmail:t,customerConfirmationKey:e})=>await d(Dt,{method:"POST",variables:{email:t,confirmation_key:e}}).catch(E),Gt=`
  mutation RESEND_CONFIRMATION_EMAIL($email: String!) {
    resendConfirmationEmail(email: $email)
  }
`,ce=async t=>await d(Gt,{method:"POST",variables:{email:t}}).catch(E),Ft=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input: $input) {
      firstname
    }
  }
`,se=async t=>await d(Ft,{method:"POST",variables:{input:t}}).then(e=>{var r;return(r=e.errors)!=null&&r.length?G(e.errors):e.data.createCustomerAddress.firstname||""}).catch(E),xt=`
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
`;let I=null,A=null;const Lt=t=>{const e={},r=o=>{o.forEach(a=>{var i;e[a.id]=!0,(i=a.children)!=null&&i.length&&r(a.children)})};return r(t),e},pt=["Magento_PurchaseOrder::all","Magento_PurchaseOrder::view_purchase_orders","Magento_PurchaseOrder::view_purchase_orders_for_subordinates","Magento_PurchaseOrder::view_purchase_orders_for_company","Magento_PurchaseOrder::autoapprove_purchase_order","Magento_PurchaseOrderRule::super_approve_purchase_order","Magento_PurchaseOrderRule::view_approval_rules","Magento_PurchaseOrderRule::manage_approval_rules"],p="Magento_Sales::place_order",qt=t=>(t==null?void 0:t.id)==="MA=="&&Array.isArray(t.permissions)&&t.permissions.length===0,Ht=t=>{var e;return(e=t==null?void 0:t.permissions)!=null&&e.length?Lt(t.permissions):{}},zt=(t,e)=>{if(e===!0)return t;const r={...t};return pt.forEach(o=>{r[o]=!1}),r},Bt=(t,e)=>{const r=qt(t),o=Ht(t),a=zt(o,e),n={...{all:!0,...r&&{admin:!0}},...a};return!r&&n[p]===void 0&&Object.keys(o).length===0&&(n[p]=!0),n},Kt=async()=>{var t,e,r,o;try{const a=await d(xt,{method:"GET"}),i=Bt((e=(t=a.data)==null?void 0:t.customer)==null?void 0:e.role,(o=(r=a.data)==null?void 0:r.customer)==null?void 0:o.purchase_orders_enabled);return I=i,A=null,i}catch(a){throw A=null,a}},q=()=>I?(h.emit("auth/permissions",I),Promise.resolve(I)):(A||(A=Kt().then(t=>(h.emit("auth/permissions",t),t))),A),ue=()=>{I=null,A=null},Vt=`
  query GET_ADOBE_COMMERCE_OPTIMIZER_DATA {
    commerceOptimizer {
      priceBookId
    }
  }
`,H=async()=>{const t=await d(Vt,{method:"GET"}),e=ht(t);return h.emit("auth/adobe-commerce-optimizer",e),e};export{D as C,w as E,ue as _resetCache,U as c,S as config,ie as confirmEmail,te as createCustomer,se as createCustomerAddress,d as fetchGraphQl,H as getAdobeCommerceOptimizerData,ee as getAttributesForm,Yt as getConfig,Tt as getCustomerData,q as getCustomerRolePermissions,re as getCustomerToken,bt as getStoreConfig,$ as initialize,X as p,V as removeFetchGraphQlHeader,oe as requestPasswordResetEmail,ce as resendConfirmationEmail,ae as resetPassword,ne as revokeCustomerToken,Xt as setEndpoint,v as setFetchGraphQlHeader,Zt as setFetchGraphQlHeaders,lt as t,Z as verifyToken};
//# sourceMappingURL=api.js.map
