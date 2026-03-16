/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as e,h as C,a as h}from"./removeCustomerAddress.js";const f=t=>{var a,o,_,r,i,c,l,m,u,g,n,d;return{baseMediaUrl:(o=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:o.base_media_url,minLength:+((r=(_=t==null?void 0:t.data)==null?void 0:_.storeConfig)==null?void 0:r.minimum_password_length)||3,requiredCharacterClasses:+((c=(i=t==null?void 0:t.data)==null?void 0:i.storeConfig)==null?void 0:c.required_character_classes_number)||0,storeCode:((m=(l=t==null?void 0:t.data)==null?void 0:l.storeConfig)==null?void 0:m.store_code)??"",loginAsCustomerEnabled:!0,loginAsCustomerConsentLabel:((g=(u=t==null?void 0:t.data)==null?void 0:u.storeConfig)==null?void 0:g.login_as_customer_consent_label)??"",loginAsCustomerConsentTooltip:((d=(n=t==null?void 0:t.data)==null?void 0:n.storeConfig)==null?void 0:d.login_as_customer_consent_tooltip)??""}},b=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      # login_as_customer_enabled
      # login_as_customer_consent_label
      # login_as_customer_consent_tooltip
    }
  }
`,G=async()=>await e(b,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?C(t.errors):f(t)}).catch(h);export{G as g};
//# sourceMappingURL=getStoreConfig.js.map
