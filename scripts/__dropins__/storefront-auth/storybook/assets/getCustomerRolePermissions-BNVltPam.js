import{u as s,a as e,M as l,k as o}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function i(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...r.components};return e(o,{children:[e(l,{title:"API/getCustomerRolePermissions"}),`
`,e(n.h1,{id:"getcustomerrolepermissions",children:"getCustomerRolePermissions"}),`
`,e(n.p,{children:"Retrieves customer role permissions. This function provides efficient caching to minimize API calls and returns either cached data immediately or a promise for fresh data."}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getCustomerRolePermissions } from '@/auth/api/getCustomerRolePermissions';
`})}),`
`,e(n.h2,{id:"function-signature",children:"Function Signature"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`getCustomerRolePermissions(): Promise<PermissionsModel>
`})}),`
`,e(n.h2,{id:"return-types",children:"Return Types"}),`
`,e(n.h3,{id:"permissionsmodel",children:"PermissionsModel"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`{
  all?: boolean;
  admin?: boolean;
  [key: string]: boolean | undefined;
}
`})}),`
`,e(n.h2,{id:"behavior",children:"Behavior"}),`
`,e(n.h3,{id:"caching-strategy",children:"Caching Strategy"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"First call"}),": Makes GraphQL API request and caches the result"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Subsequent calls"}),": Returns cached data as resolved Promise (still async but immediate)"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Cache lifetime"}),": Persists for the module lifetime (until page reload)"]}),`
`]}),`
`,e(n.h3,{id:"permission-processing",children:"Permission Processing"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"All users"}),": Base response includes ",e(n.code,{children:"{ all: true }"})]}),`
`,e(n.li,{children:[e(n.strong,{children:"Admin users"}),": Identified by role ID ",e(n.code,{children:"'MA=='"})," with empty permissions array",`
`,e(n.ul,{children:[`
`,e(n.li,{children:["Response includes ",e(n.code,{children:"{ all: true, admin: true }"})]}),`
`,e(n.li,{children:"Backend returns empty permissions array for admins"}),`
`]}),`
`]}),`
`,e(n.li,{children:[e(n.strong,{children:"Regular users"}),": Response includes ",e(n.code,{children:"{ all: true, ...specificPermissions }"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:"Permissions from backend are flattened from tree structure to flat key-value pairs"}),`
`,e(n.li,{children:["All permissions are set to ",e(n.code,{children:"true"})," by default"]}),`
`]}),`
`]}),`
`]}),`
`,e(n.h3,{id:"purchase-order-permission-handling",children:"Purchase Order Permission Handling"}),`
`,e(n.p,{children:["When purchase orders are ",e(n.strong,{children:"disabled"})," (",e(n.code,{children:"purchase_orders_enabled"})," is ",e(n.code,{children:"false"}),"), the following 8 permissions are explicitly set to ",e(n.code,{children:"false"})," in the response, regardless of user role:"]}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrder::all"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrder::view_purchase_orders"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrder::view_purchase_orders_for_subordinates"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrder::view_purchase_orders_for_company"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrder::autoapprove_purchase_order"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrderRule::super_approve_purchase_order"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrderRule::view_approval_rules"})}),`
`,e(n.li,{children:e(n.code,{children:"Magento_PurchaseOrderRule::manage_approval_rules"})}),`
`]}),`
`,e(n.p,{children:[e(n.strong,{children:"Important"}),": The ",e(n.code,{children:"purchase_orders_enabled"})," flag is consumed internally but NOT included in the response. Consumers should check PO permission values directly."]}),`
`,e(n.p,{children:"This approach ensures consumers can distinguish between:"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"Permission granted"})," (",e(n.code,{children:"permission: true"}),"): User has the permission and PO is enabled"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Permission denied"})," (",e(n.code,{children:"permission: false"}),"): Permission explicitly disabled (PO disabled or user lacks permission)"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Permission unavailable"})," (key not present): Feature not configured/available"]}),`
`]}),`
`,e(n.h3,{id:"event-emission",children:"Event Emission"}),`
`,e(n.p,{children:["The function automatically emits an ",e(n.code,{children:"'auth/permissions'"})," event with the permissions data:"]}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"On cache hit"}),": Event is emitted immediately with cached permissions"]}),`
`,e(n.li,{children:[e(n.strong,{children:"On fresh fetch"}),": Event is emitted after successful API response"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Event payload"}),": The complete ",e(n.code,{children:"PermissionsModel"})," object"]}),`
`]}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Example: Listening to the permissions event
import { events } from '@adobe-commerce/event-bus';

events.on('auth/permissions', (permissions) => {
  console.log('Permissions loaded:', permissions);
  // Handle permissions update in your application
});
`})}),`
`,e(n.h2,{id:"usage-examples",children:"Usage Examples"}),`
`,e(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`const permissions = await getCustomerRolePermissions();

// Example responses:
// Admin with PO enabled:
// { all: true, admin: true }

// Admin with PO disabled:
// {
//   all: true,
//   admin: true,
//   'Magento_PurchaseOrder::all': false,
//   'Magento_PurchaseOrder::view_purchase_orders': false,
//   // ... all 8 PO permissions set to false
// }

// Regular user with PO enabled:
// {
//   all: true,
//   'Magento_Company::index': true,
//   'Magento_PurchaseOrder::view_purchase_orders': true,
//   // ... other permissions
// }

// Regular user with PO disabled:
// {
//   all: true,
//   'Magento_Company::index': true,
//   'Magento_PurchaseOrder::view_purchase_orders': false,
//   // ... PO permissions overridden to false
// }
`})}),`
`,e(n.h3,{id:"checking-specific-permissions",children:"Checking Specific Permissions"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`const permissions = await getCustomerRolePermissions();

// Check if user is admin
if (permissions.admin) {
  console.log('User is a company administrator');
}

// Check specific permission
if (permissions['Magento_PurchaseOrder::view_purchase_orders'] === true) {
  console.log('User can view purchase orders');
} else if (
  permissions['Magento_PurchaseOrder::view_purchase_orders'] === false
) {
  console.log('Purchase orders are explicitly disabled');
} else {
  console.log('Purchase order feature not available');
}
`})})]})}function c(r={}){const{wrapper:n}={...s(),...r.components};return n?e(n,{...r,children:e(i,{...r})}):i(r)}export{c as default};
//# sourceMappingURL=getCustomerRolePermissions-BNVltPam.js.map
