/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as r,h,c as _}from"./fetch-error.js";const p=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
          children {
            id
            children {
              id
              children {
                id
                children { id }
              }
            }
          }
        }
      }
      status
    }
  }
`,d=(n=[])=>{const a=new Set,t=[...n];for(;t.length;){const i=t.pop();if(i&&(typeof i.id=="string"&&a.add(i.id),Array.isArray(i.children)&&i.children.length))for(const s of i.children)t.push(s)}return a},e=n=>(n==null?void 0:n.id)==="0"||typeof(n==null?void 0:n.id)=="number"&&(n==null?void 0:n.id)===0||(n==null?void 0:n.name)==="Company Administrator",g=n=>{const a=d((n==null?void 0:n.permissions)||[]),t=e(n);return{canViewAccount:t||a.has("Magento_Company::view_account"),canEditAccount:t||a.has("Magento_Company::edit_account"),canViewAddress:t||a.has("Magento_Company::view_address"),canEditAddress:t||a.has("Magento_Company::edit_address"),canViewContacts:t||a.has("Magento_Company::contacts"),canViewPaymentInformation:t||a.has("Magento_Company::payment_information"),canViewShippingInformation:t||a.has("Magento_Company::shipping_information")}},f=async()=>await r(p,{method:"GET",cache:"no-cache"}).then(n=>{var s,c,o;if((s=n.errors)!=null&&s.length)return h(n.errors);const a=(o=(c=n==null?void 0:n.data)==null?void 0:c.customer)==null?void 0:o.role,t=d((a==null?void 0:a.permissions)||[]);return e(a)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::users_view","Magento_Company::users_edit"].forEach(m=>t.add(m)),{allowedIds:t,roleResponse:n}}).catch(_);export{g as b,f};
//# sourceMappingURL=fetchUserPermissions.js.map
