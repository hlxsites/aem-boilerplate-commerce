import{u as t,a as e,M as i,U as a,k as m}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(n){const r={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...t(),...n.components};return e(m,{children:[e(i,{title:"Utilities/getFormErrors"}),`
`,e(a,{children:[e(r.h1,{id:"getformerrorsform",children:"getFormErrors(form)"}),e(r.p,{children:"Returns every form error in an HTML form element."}),e(r.h2,{id:"params",children:"Params"}),e(r.p,{children:[e(r.code,{children:"form"})," : An HTMLFormElement"]}),e(r.h2,{id:"returns",children:"Returns"}),e(r.p,{children:"A JavaScript object containing the form errors"}),e(r.h2,{id:"examples",children:"Examples"}),e(r.pre,{children:e(r.code,{className:"language-html",children:`<form>
  <input name="foo" required value="Foo" />
  <input name="bar" required />
  <input name="age" type="number" value="uno" />
  <input name="website" type="url" value="url" />
  <input name="e-mail" type="email" value="email@" />
</form>
`})}),e(r.pre,{children:e(r.code,{className:"language-ts",children:`import { getFormErrors } from '@adobe-commerce/elsie/ore/lib';

const formElement = container.querySelector('form') as HTMLFormElement;

const errors = getFormErrors(formElement);

console.log(errors); // { bar: 'Constraints not satisfied', website: 'Constraints not satisfied', 'e-mail': 'Constraints not satisfied', }
`})})]})]})}function c(n={}){const{wrapper:r}={...t(),...n.components};return r?e(r,{...n,children:e(o,{...n})}):o(n)}export{c as default};
//# sourceMappingURL=getFormErrors-B6FkkgX2.js.map
