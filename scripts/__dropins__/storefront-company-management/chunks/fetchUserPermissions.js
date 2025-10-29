/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as s,i as e,g as h}from"./company-permissions.js";import{f as m,c as o,h as E}from"./fetch-error.js";const f=`
  query GET_CUSTOMER_ROLE_PERMISSIONS {
    customer {
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
                }
              }
            }
          }
        }
      }
      status
    }
  }
`;async function I(){return await m(f,{method:"GET",cache:"no-cache"}).then(t=>{var a,c,d;if((a=t.errors)!=null&&a.length)return o(t.errors);const r=(d=(c=t==null?void 0:t.data)==null?void 0:c.customer)==null?void 0:d.role,i=s((r==null?void 0:r.permissions)||[]);return e(r)&&h().forEach(n=>i.add(n)),{allowedIds:i,roleResponse:t}}).catch(E)}export{I as f};
//# sourceMappingURL=fetchUserPermissions.js.map
