import{u as i,a as e,M as c,U as s,k as d}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function t(o){const n={code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...i(),...o.components};return e(d,{children:[e(c,{title:"Utilities/debounce"}),`
`,e(s,{children:[e(n.h1,{id:"debouncefn-ms",children:"debounce(fn, ms)"}),e(n.p,{children:`This function provides a way to delay callback execution or prevent overcalling
a function until certain conditions are met.`}),e(n.h2,{id:"params",children:"Params"}),e(n.p,{children:[e(n.code,{children:"fn"})," : The callback function to be executed"]}),e(n.p,{children:[e(n.code,{children:"ms"})," : Time(in milliseconds) to delay callback execution"]}),e(n.h2,{id:"returns",children:"Returns"}),e(n.p,{children:`A debounce version of the original callback function. This function can be
treated like the original callback, except when called, the delay timer resets.`}),e(n.h2,{id:"examples",children:"Examples"}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { debounce } from '@adobe-commerce/elsie/ore/lib';

const debouncedLog = debounce(console.log, 500);

debouncedLog('Do not log this string');

// Wait 250ms

debouncedLog('Do not log this string'); // Resets delay timer

// Wait 250ms

debouncedLog('Do not log this string'); // Resets delay timer

// Wait 250ms

debouncedLog('Log this string'); // Resets delay timer

// Wait 500ms

// 'Log this string' is logged to the console and no other messages have been logged
`})})]})]})}function r(o={}){const{wrapper:n}={...i(),...o.components};return n?e(n,{...o,children:e(t,{...o})}):t(o)}export{r as default};
//# sourceMappingURL=debounce-Dnsltfgp.js.map
