import{u as o,a as e,M as i,k as c}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function r(t){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...o(),...t.components};return e(c,{children:[e(i,{title:"API/verifyToken"}),`
`,e(n.h1,{id:"verifytoken",children:"verifyToken"}),`
`,e(n.p,{children:["The ",e(n.code,{children:"verifyToken"})," function checks the validity of the provided token and returns the authentication result."]}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { verifyToken } from '@/auth/api/verifyToken';
`})}),`
`,e(n.h2,{id:"usage",children:"Usage"}),`
`,e(n.pre,{children:e(n.code,{className:"language-ts",children:`const authType: string = 'Authorizaton';
const type: string = 'Bearer'

verifyToken(authType: string, type: string);
`})})]})}function s(t={}){const{wrapper:n}={...o(),...t.components};return n?e(n,{...t,children:e(r,{...t})}):r(t)}export{s as default};
//# sourceMappingURL=verifyToken-CV4DSazK.js.map
