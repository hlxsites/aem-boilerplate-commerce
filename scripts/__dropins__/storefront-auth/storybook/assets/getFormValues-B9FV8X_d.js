import{u as t,a as e,M as a,U as l,k as m}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...t(),...r.components};return e(m,{children:[e(a,{title:"Utilities/getFormValues"}),`
`,e(l,{children:[e(n.h1,{id:"getformvaluesform",children:"getFormValues(form)"}),e(n.p,{children:"Transforms the data in an HTML form element into a JavaScript object."}),e(n.h2,{id:"params",children:"Params"}),e(n.p,{children:[e(n.code,{children:"form"})," : An HTMLFormElement"]}),e(n.h2,{id:"returns",children:"Returns"}),e(n.p,{children:"A JavaScript object containing the form data"}),e(n.h2,{id:"examples",children:"Examples"}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<form>
  <input name="foo" required value="Foo" />
  <input name="bar" required value="Bar" />
</form>
`})}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { getFormValues } from '@adobe-commerce/elsie/ore/lib';

const formElement = container.querySelector('form') as HTMLFormElement;

const values = getFormValues(formElement);

console.log(values); // { bar: 'Bar', foo: 'Foo' }
`})})]})]})}function s(r={}){const{wrapper:n}={...t(),...r.components};return n?e(n,{...r,children:e(o,{...r})}):o(r)}export{s as default};
//# sourceMappingURL=getFormValues-B9FV8X_d.js.map
