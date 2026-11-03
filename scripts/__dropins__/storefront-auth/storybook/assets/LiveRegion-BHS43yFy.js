import{u as r,a as e,M as s,U as a,C as d,d as t,k as c}from"./iframe-S6tzT0R4.js";import{L as l,a as h,P as g,A as m,b as u,E as p}from"./LiveRegion.stories-DVUChICA.js";import"./preload-helper-C1FmrZbK.js";import"./LiveRegion-CdHCrWBu.js";import"./classes-DJBjVfEy.js";function o(i){const n={code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...r(),...i.components};return e(c,{children:[e(s,{of:l}),`
`,e(a,{children:[e(n.h1,{id:"liveregion",children:"LiveRegion"}),e(n.p,{children:["Use ",e(n.code,{children:"LiveRegion"}),` to announce dynamic content changes to screen readers without
moving focus. It satisfies `,e(n.strong,{children:"WCAG 4.1.3 Status Messages (Level AA)"}),"."]}),e(n.h2,{id:"usage",children:"Usage"}),e(n.pre,{children:e(n.code,{className:"language-jsx",children:`import { LiveRegion } from '@adobe-commerce/elsie/components';
`})}),e(n.h2,{id:"the-always-mounted-rule",children:"The always-mounted rule"}),e(n.p,{children:["The most important constraint: ",e(n.strong,{children:[e(n.code,{children:"LiveRegion"}),` must always be rendered — never
conditionally mounted.`]})]}),e(n.p,{children:[`Browsers and assistive technology only fire live region announcements when the
`,e(n.em,{children:"content"}),` of an already-mounted region changes. Mounting a region with content
already inside it produces no announcement.`]}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`// ✅ Correct — LiveRegion is always in the DOM; only its message toggles.
<LiveRegion message={loading ? 'Loading order summary' : ''} />;
{
  loading && <ProgressSpinner />;
}

// ❌ Wrong — mounting the region with content triggers no announcement.
{
  loading && <LiveRegion message="Loading…" />;
}
`})}),e(n.h2,{id:"all-props",children:"All props"}),e(d,{of:h}),e(n.h2,{id:"polite-default",children:"Polite (default)"}),e(n.p,{children:`Screen readers finish the current sentence before reading the status message.
Use this for non-urgent updates like result counts, loading states, and
confirmations.`}),e(t,{of:g}),e(n.h2,{id:"assertive",children:"Assertive"}),e(n.p,{children:`Interrupts the screen reader immediately. Reserve for time-sensitive errors or
failures that require immediate user attention.`}),e(t,{of:m}),e(n.h2,{id:"loading-pattern",children:"Loading pattern"}),e(n.p,{children:["Pair ",e(n.code,{children:"LiveRegion"}),` with a visual loading indicator. The region stays mounted;
only its `,e(n.code,{children:"message"})," prop changes."]}),e(t,{of:u}),e(n.h2,{id:"empty-silent",children:"Empty (silent)"}),e(n.p,{children:["When ",e(n.code,{children:"message"}),` is an empty string the region is present in the DOM but announces
nothing. Use this to silence a previous announcement once the operation
completes and the result is already visible on screen.`]}),e(t,{of:p})]})]})}function R(i={}){const{wrapper:n}={...r(),...i.components};return n?e(n,{...i,children:e(o,{...i})}):o(i)}export{R as default};
//# sourceMappingURL=LiveRegion-BHS43yFy.js.map
