/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as u,h as b,a as e}from"./removeCustomerAddress.js";const E=t=>{var a,i,c,_,h,o,r,g,d,l,f,n,C,m;return{baseMediaUrl:(i=(a=t==null?void 0:t.data)==null?void 0:a.storeConfig)==null?void 0:i.base_media_url,minLength:+((_=(c=t==null?void 0:t.data)==null?void 0:c.storeConfig)==null?void 0:_.minimum_password_length)||3,requiredCharacterClasses:+((o=(h=t==null?void 0:t.data)==null?void 0:h.storeConfig)==null?void 0:o.required_character_classes_number)||0,storeCode:((g=(r=t==null?void 0:t.data)==null?void 0:r.storeConfig)==null?void 0:g.store_code)??"",shoppingAssistanceEnabled:((l=(d=t==null?void 0:t.data)==null?void 0:d.storeConfig)==null?void 0:l.shopping_assistance_enabled)??!1,shoppingAssistanceCheckboxTitle:((n=(f=t==null?void 0:t.data)==null?void 0:f.storeConfig)==null?void 0:n.shopping_assistance_checkbox_title)||"",shoppingAssistanceCheckboxTooltip:((m=(C=t==null?void 0:t.data)==null?void 0:C.storeConfig)==null?void 0:m.shopping_assistance_checkbox_tooltip)||""}},k=`
  query GET_STORE_CONFIG {
    storeConfig {
      base_media_url
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      shopping_assistance_enabled
      shopping_assistance_checkbox_title
      shopping_assistance_checkbox_tooltip
    }
  }
`,T=async()=>await u(k,{method:"GET",cache:"force-cache"}).then(t=>{var a;return(a=t.errors)!=null&&a.length?b(t.errors):E(t)}).catch(e);export{T as g};
//# sourceMappingURL=getStoreConfig.js.map
