import{a as y,f as h,h as C}from"./network-error.js";import{events as M}from"@dropins/tools/event-bus.js";import{c as A}from"./initialize.js";const v=t=>({personalEmail:{address:(t==null?void 0:t.email)||""},userAccount:{login:!0},commerce:{commerceScope:{storeCode:(t==null?void 0:t.store_code)||""}}}),D=t=>({userAccount:{logout:!0},commerce:{commerceScope:{storeCode:(t==null?void 0:t.store_code)||""}}}),U=t=>({personalEmail:{address:(t==null?void 0:t.email)||""},userAccount:{updateProfile:t==null?void 0:t.updateProfile},commerce:{commerceScope:{storeCode:(t==null?void 0:t.store_code)||""}}}),I={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},g=3600,R=t=>{var e,a,o,r,c,i,n,u,m,s;return{autocompleteOnStorefront:((a=(e=t==null?void 0:t.data)==null?void 0:e.storeConfig)==null?void 0:a.autocomplete_on_storefront)||!1,minLength:((r=(o=t==null?void 0:t.data)==null?void 0:o.storeConfig)==null?void 0:r.minimum_password_length)||3,requiredCharacterClasses:+((i=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:i.required_character_classes_number)||0,createAccountConfirmation:((u=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:u.create_account_confirmation)||!1,customerAccessTokenLifetime:((s=(m=t==null?void 0:t.data)==null?void 0:m.storeConfig)==null?void 0:s.customer_access_token_lifetime)*g||g}},q=t=>{var e,a,o,r,c,i;return{email:((a=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:a.email)||"",firstname:((r=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:r.firstname)||"",lastname:((i=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:i.lastname)||""}},$=t=>{const e=t.map(a=>a.message).join(" ");throw Error(e)},F=`
  query GET_CUSTOMER_DATA {
    customer {
      firstname
      lastname
      email
    }
  }
`,b=async t=>{if(t){const{authHeaderConfig:e}=A.getConfig();y(e.header,e.tokenPrefix?`${e.tokenPrefix} ${t}`:t)}return await h(F,{method:"GET",cache:"force-cache"}).then(e=>{var a;return(a=e.errors)!=null&&a.length?$(e.errors):q(e)}).catch(C)},J=`
  mutation GET_CUSTOMER_TOKEN($email: String!, $password: String!) {
    generateCustomerToken(email: $email, password: $password) {
      token
    }
  }
`,W=t=>{document.cookie=`${t}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},K=async()=>{try{const t=sessionStorage.getItem("storeConfig");let a=(t?JSON.parse(t):{}).customerAccessTokenLifetime;if(!a){const o=await V();sessionStorage.setItem("storeConfig",JSON.stringify(o)),a=(o==null?void 0:o.customerAccessTokenLifetime)||g}return`Max-Age=${a}`}catch(t){return console.error("getCookiesLifetime() Error:",t),`Max-Age=${g}`}};var _=(t=>(t.CREATE_ACCOUNT_EVENT="create-account",t.SIGN_IN="sign-in",t.SIGN_OUT="sign-out",t))(_||{});const E="authContext",N={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function S(t,e){const a=window.adobeDataLayer||[];a.push({[t]:null}),a.push({[t]:e})}function O(t){(window.adobeDataLayer||[]).push(a=>{const o=a.getState?a.getState():{};a.push({event:t,eventInfo:{...o}})})}function H(t){const e=U(t);S(E,e),O(N.CREATE_ACCOUNT)}function L(t){const e=v(t);S(E,e),O(N.SIGN_IN)}function Q(t){const e=D(t);S(E,e),O(N.SIGN_OUT)}const T=(t,e)=>{const a=sessionStorage.getItem("storeConfig"),r={...a?JSON.parse(a):{},...e};switch(t){case"create-account":H(r);break;case"sign-in":L(r);break;case"sign-out":Q(r);break;default:return null}},Y=async({email:t,password:e,translations:a,onErrorCallback:o,handleSetInLineAlertProps:r})=>{var k,G,l,w;const c=await h(J,{method:"POST",variables:{email:t,password:e}}).catch(C);if(!((G=(k=c==null?void 0:c.data)==null?void 0:k.generateCustomerToken)!=null&&G.token)){const f=a.customerTokenErrorMessage,d=c!=null&&c.errors?c.errors[0].message:f;return o==null||o(d),r==null||r({type:"error",text:d}),T(_.SIGN_IN,{}),{errorMessage:d,userName:""}}const i=(w=(l=c==null?void 0:c.data)==null?void 0:l.generateCustomerToken)==null?void 0:w.token,n=await b(i);if(!(n!=null&&n.firstname)||!(n!=null&&n.email)){const f=a.customerTokenErrorMessage;return o==null||o(f),r==null||r({type:"error",text:f}),T(_.SIGN_IN,{}),{errorMessage:f,userName:""}}const u=n==null?void 0:n.firstname,m=n==null?void 0:n.email,s=await K();return document.cookie=`${I.auth_dropin_firstname}=${u}; path=/; ${s}; `,document.cookie=`${I.auth_dropin_user_token}=${i}; path=/; ${s}; `,M.emit("authenticated",!!i),T(_.SIGN_IN,m?{email:m}:{}),{errorMessage:"",userName:u}},j=`
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
`,V=async()=>await h(j,{method:"GET",cache:"force-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?$(t.errors):R(t)}).catch(C);export{I as C,_ as E,Y as a,V as b,W as d,b as g,$ as h,T as p};
//# sourceMappingURL=getStoreConfig.js.map
