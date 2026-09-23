import{u as a,a as e,M as r,U as l,k as c}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(t){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...a(),...t.components};return e(c,{children:[e(r,{title:"Utilities/getPathValue"}),`
`,e(l,{children:[e(n.h1,{id:"getpathvalueobj-key",children:"getPathValue(obj, key)"}),e(n.p,{children:"This function takes in an object and a key and returns the value of the key."}),e(n.h2,{id:"params",children:"Params"}),e(n.p,{children:[e(n.code,{children:"obj"})," : The object to get the value from"]}),e(n.p,{children:[e(n.code,{children:"key"})," : The key to get the value from (supports dot notation)"]}),e(n.h2,{id:"returns",children:"Returns"}),e(n.p,{children:"Returns the value of the key."}),e(n.h2,{id:"examples",children:"Examples"}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getPathValue } from '@adobe-commerce/elsie/lib';

const obj = {
  foo: {
    bar: 'baz',
  },
};

const result = getPathValue(obj, 'foo.bar');

console.log(result); // "baz"
`})})]})]})}function s(t={}){const{wrapper:n}={...a(),...t.components};return n?e(n,{...t,children:e(o,{...t})}):o(t)}export{s as default};
//# sourceMappingURL=getPathValue-bat0BwuS.js.map
