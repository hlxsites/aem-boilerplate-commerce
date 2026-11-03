import{u as a,a as e,M as o,k as s}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function r(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...t.components};return e(s,{children:[e(o,{title:"API/createCustomerAddress"}),`
`,e(n.h1,{id:"createcustomeraddress",children:"createCustomerAddress"}),`
`,e(n.p,{children:"A function that create customer address."}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { createCustomerAddress } from '@/auth/api/createCustomerAddress';
`})}),`
`,e(n.h2,{id:"additional-information",children:"Additional information"}),`
`,e(n.p,{children:[e(n.a,{href:"https://developer.adobe.com/commerce/webapi/graphql-api/index.html#definition-CustomerAddressInput",rel:"nofollow",children:"Types"}),`
`,e(n.a,{href:"https://developer.adobe.com/commerce/webapi/graphql/schema/customer/mutations/create-address/",rel:"nofollow",children:"Example of Mutation Method"})]}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`createCustomerAddress(forms: {
  "city": "xyz789",
  "company": "abc123",
  "country_code": "AF",
  "country_id": "AF",
  "custom_attributes": [CustomerAddressAttributeInput],
  "custom_attributesV2": [AttributeValueInput],
  "default_billing": true,
  "default_shipping": false,
  "fax": "xyz789",
  "firstname": "xyz789",
  "lastname": "abc123",
  "middlename": "abc123",
  "postcode": "xyz789",
  "prefix": "xyz789",
  "region": CustomerAddressRegionInput,
  "street": ["abc123"],
  "suffix": "xyz789",
  "telephone": "xyz789",
  "vat_id": "abc123"
});
`})})]})}function i(t={}){const{wrapper:n}={...a(),...t.components};return n?e(n,{...t,children:e(r,{...t})}):r(t)}export{i as default};
//# sourceMappingURL=createCustomerAddress-KZgpS0Pb.js.map
