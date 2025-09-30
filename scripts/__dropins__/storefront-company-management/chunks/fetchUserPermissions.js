/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as _,h,c as p}from"./fetch-error.js";const d=(n=[])=>{const a=new Set,t=[...n];for(;t.length;){const i=t.pop();if(i&&(typeof i.id=="string"&&a.add(i.id),Array.isArray(i.children)&&i.children.length))for(const s of i.children)t.push(s)}return a},m=n=>(n==null?void 0:n.id)==="0"||typeof(n==null?void 0:n.id)=="number"&&(n==null?void 0:n.id)===0||(n==null?void 0:n.id)==="MA=="||(n==null?void 0:n.name)==="Company Administrator",y=()=>["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::users_view","Magento_Company::users_edit"],f=n=>{const a=d((n==null?void 0:n.permissions)||[]),t=m(n);return{canViewAccount:t||a.has("Magento_Company::view_account"),canEditAccount:t||a.has("Magento_Company::edit_account"),canViewAddress:t||a.has("Magento_Company::view_address"),canEditAddress:t||a.has("Magento_Company::edit_address"),canViewContacts:t||a.has("Magento_Company::contacts"),canViewPaymentInformation:t||a.has("Magento_Company::payment_information"),canViewShippingInformation:t||a.has("Magento_Company::shipping_information"),canViewUsers:t||a.has("Magento_Company::users_view"),canEditUsers:t||a.has("Magento_Company::users_edit")}},g=`
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
`;async function C(){return await _(g,{method:"GET",cache:"no-cache"}).then(n=>{var o,e,c;const a=n;if((o=a.errors)!=null&&o.length)return h(a.errors);const t=(c=(e=a==null?void 0:a.data)==null?void 0:e.customer)==null?void 0:c.role,i=d((t==null?void 0:t.permissions)||[]);return m(t)&&y().forEach(r=>i.add(r)),{allowedIds:i,roleResponse:n}}).catch(p)}export{f as b,C as f,m as i};
//# sourceMappingURL=fetchUserPermissions.js.map
