import{u as r,a as e,M as o,k as a}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function t(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e(a,{children:[e(o,{title:"API/getAdobeCommerceOptimizerData"}),`
`,e(n.h1,{id:"getadobecommerceoptimizerdata",children:"getAdobeCommerceOptimizerData"}),`
`,e(n.p,{children:"This function fetches Adobe Commerce Optimizer data."}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getAdobeCommerceOptimizerData } from '@/auth/api/getAdobeCommerceOptimizerData';
`})}),`
`,e(n.h2,{id:"function-signature",children:"Function Signature"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`getAdobeCommerceOptimizerData(): Promise<AdobeCommerceOptimizerModel>
`})}),`
`,e(n.h2,{id:"return-type",children:"Return Type"}),`
`,e(n.h3,{id:"adobecommerceoptimizermodel",children:"AdobeCommerceOptimizerModel"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`{
  priceBookId: string;
}
`})}),`
`,e(n.h2,{id:"behavior",children:"Behavior"}),`
`,e(n.h3,{id:"authentication",children:"Authentication"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"No authentication required"}),": This function works for both authenticated and non-authenticated users"]}),`
`,e(n.li,{children:[e(n.strong,{children:"No token dependency"}),": Unlike some other API functions, this does not require a user token to be present"]}),`
`]}),`
`,e(n.h3,{id:"event-emission",children:"Event Emission"}),`
`,e(n.p,{children:["This function emits the ",e(n.code,{children:"auth/adobe-commerce-optimizer"})," event with the Adobe Commerce Optimizer data:"]}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`events.emit('auth/adobe-commerce-optimizer', {
  priceBookId: 'PB123456',
});
`})}),`
`,e(n.h3,{id:"error-handling",children:"Error Handling"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:"Throws errors from the GraphQL API if the request fails"}),`
`,e(n.li,{children:["Returns empty string for ",e(n.code,{children:"priceBookId"})," if data is missing or undefined"]}),`
`]}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.h3,{id:"basic-usage",children:"Basic Usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getAdobeCommerceOptimizerData } from '@/auth/api';

const adobeCommerceOptimizerData = await getAdobeCommerceOptimizerData();
console.log(adobeCommerceOptimizerData.priceBookId); // "PB123456"
`})}),`
`,e(n.h3,{id:"with-event-listener",children:"With Event Listener"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getAdobeCommerceOptimizerData } from '@/auth/api';
import { events } from '@adobe-commerce/event-bus';

// Listen for the event
events.on('auth/adobe-commerce-optimizer', (data) => {
  console.log('Price Book ID:', data.priceBookId);
});

// Fetch the data
await getAdobeCommerceOptimizerData();
`})})]})}function m(i={}){const{wrapper:n}={...r(),...i.components};return n?e(n,{...i,children:e(t,{...i})}):t(i)}export{m as default};
//# sourceMappingURL=getAdobeCommerceOptimizerData-B5XAmExk.js.map
