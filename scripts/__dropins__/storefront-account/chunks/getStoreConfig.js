/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as e,h as g,a as f}from"./removeCustomerAddress.js";const u=a=>{var t,r,i,_,c,o,h,l,d,m;return{baseMediaUrl:(r=(t=a==null?void 0:a.data)==null?void 0:t.storeConfig)==null?void 0:r.base_media_url,minLength:+((_=(i=a==null?void 0:a.data)==null?void 0:i.storeConfig)==null?void 0:_.minimum_password_length)||3,requiredCharacterClasses:+((o=(c=a==null?void 0:a.data)==null?void 0:c.storeConfig)==null?void 0:o.required_character_classes_number)||0,storeCode:((l=(h=a==null?void 0:a.data)==null?void 0:h.storeConfig)==null?void 0:l.store_code)??"",allowRemoteShoppingAssistance:((m=(d=a==null?void 0:a.data)==null?void 0:d.storeConfig)==null?void 0:m.allow_remote_shopping_assistance)??!1}},C=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      allow_remote_shopping_assistance
    }
  }
`,w=async()=>await e(C,{method:"GET",cache:"force-cache"}).then(a=>{var t;return(t=a.errors)!=null&&t.length?g(a.errors):u(a)}).catch(f);export{w as g};
//# sourceMappingURL=getStoreConfig.js.map
