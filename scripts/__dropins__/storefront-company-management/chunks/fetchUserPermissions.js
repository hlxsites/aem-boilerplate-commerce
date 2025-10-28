/*! Copyright 2025 Adobe
All Rights Reserved. */
<<<<<<< HEAD
import{f as s,i as e,g as h}from"./company-permissions.js";import{f as m,h as o,c as f}from"./network-error.js";const E=`
=======
import{h as d,a as m}from"./fetch-error.js";import{f as c,i as s}from"./company-permissions.js";import{f as _}from"./fetch-graphql.js";const h=`
>>>>>>> mainline/b2b
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
      role {
        id
        name
        permissions {
          id
<<<<<<< HEAD
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
=======
          children {
            id
            children {
              id
              children {
                id
                children { id }
>>>>>>> mainline/b2b
              }
            }
          }
        }
      }
      status
    }
  }
<<<<<<< HEAD
`;async function I(){return await m(E,{method:"GET",cache:"no-cache"}).then(t=>{var a,c,d;if((a=t.errors)!=null&&a.length)return o(t.errors);const r=(d=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:d.role,i=s((r==null?void 0:r.permissions)||[]);return e(r)&&h().forEach(n=>i.add(n)),{allowedIds:i,roleResponse:t}}).catch(f)}export{I as f};
=======
`,C=async()=>await _(h,{method:"GET",cache:"no-cache"}).then(a=>{var i,o,r;if((i=a.errors)!=null&&i.length)return d(a.errors);const t=(r=(o=a==null?void 0:a.data)==null?void 0:o.customer)==null?void 0:r.role,n=c((t==null?void 0:t.permissions)||[]);return s(t)&&["Magento_Company::view_account","Magento_Company::edit_account","Magento_Company::view_address","Magento_Company::edit_address","Magento_Company::contacts","Magento_Company::payment_information","Magento_Company::shipping_information","Magento_Company::roles_view","Magento_Company::roles_edit"].forEach(e=>n.add(e)),{allowedIds:n,roleResponse:a}}).catch(m);export{C as f};
>>>>>>> mainline/b2b
//# sourceMappingURL=fetchUserPermissions.js.map
