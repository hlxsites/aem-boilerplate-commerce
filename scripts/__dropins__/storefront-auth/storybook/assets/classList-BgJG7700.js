import{u as l,a as s,M as c,U as t,k as r}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function a(n){const e={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...l(),...n.components};return s(r,{children:[s(c,{title:"Utilities/classList"}),`
`,s(t,{children:[s(e.h1,{id:"classesclasslist",children:"classes(classList)"}),s(e.p,{children:`This function takes in an array of classes and returns a string of space
separated entries that can be used for CSS classname assignments.`}),s(e.h2,{id:"params",children:"Params"}),s(e.p,{children:[s(e.code,{children:"classList"})," : An array containing strings or ",s(e.code,{children:"<string,boolean>"})," arrays"]}),s(e.h2,{id:"returns",children:"Returns"}),s(e.p,{children:`Returns a string of space separated entries that can be used for CSS classname
assignments.`}),s(e.h2,{id:"examples",children:"Examples"}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`import { classes } from '@adobe-commerce/elsie/lib';

type ClassList = Array<string | [string, boolean] | undefined>;

const classList: ClassList = ['class-1', 'class-2', 'class-3'];

const result = classes(classList);

console.log(result); // "class-1 class-2 class-3"
`})}),s(e.p,{children:["You can use a ",s(e.code,{children:"<string,boolean>"}),` array to control whether a class should be
included or omitted from the final classes list.`]}),s(e.pre,{children:s(e.code,{className:"language-ts",children:`import { classes } from '@adobe-commerce/elsie/lib';

type ClassList = Array<string | [string, boolean] | undefined>;

const classList: ClassList = [
  'class-1',
  ['class-2', true],
  ['class-3', false],
  'class-4',
];

const result = classes(classList);

console.log(result); // "class-1 class-2 class-4"
`})})]})]})}function d(n={}){const{wrapper:e}={...l(),...n.components};return e?s(e,{...n,children:s(a,{...n})}):a(n)}export{d as default};
//# sourceMappingURL=classList-BgJG7700.js.map
