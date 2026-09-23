import{a as e,u as p,M as b,U as x,k as C}from"./iframe-S6tzT0R4.js";import{T as k,B as S,g as T}from"./getTokenData-C4Vcj5Fa.js";import"./preload-helper-C1FmrZbK.js";const _={1:{columns:{value:"4"},margins:{value:"0"},gutters:{value:"16px"}},2:{columns:{value:"12"},margins:{value:"0"},gutters:{value:"16px"}},3:{columns:{value:"12"},margins:{value:"0"},gutters:{value:"24px"}},4:{columns:{value:"12"},margins:{value:"0"},gutters:{value:"24px"}},5:{columns:{value:"12"},margins:{value:"0"},gutters:{value:"24px"}}},N={grid:_},L="_optionsTable_10st1_10",D="_table_10st1_32",I="_tableHeader_10st1_39",X="_headerRow_10st1_46",M="_headerCell_10st1_53",H="_body_10st1_60",B="_cell_10st1_69",W="_codeCell_10st1_76",A="_compactCell_10st1_87",G="_compactCodeCell_10st1_95",d={optionsTable:L,table:D,tableHeader:I,headerRow:X,headerCell:M,body:H,cell:B,codeCell:W,compactCell:A,compactCodeCell:G};function m({options:r,compact:n=!1}){const[a,...v]=r,f=n?d.compactCell:d.cell,w=a.map(i=>{const s=i.endsWith("(code)")?i.replace("(code)",""):i,l=s.match(/\d+px/),o=l?l[0]:null;return{text:o?s.replace(o,""):s,minWidth:o}}),y=v.map(i=>i.length===0?[" "," "," "," "]:i);return e("div",{className:d.optionsTable,children:e("table",{className:d.table,children:[e("thead",{className:d.tableHeader,children:e("tr",{className:d.headerRow,children:w.map((i,t)=>{a[t].endsWith("(code)");let s=d.headerCell;return i.minWidth&&(s+=` ${d.minWidth}`),e("th",{className:s,style:{minWidth:i.minWidth},children:i.text},a[t])})})}),e("tbody",{className:d.body,children:y.map((i,t)=>e("tr",{children:i.map((s,l)=>{let g=a[l].endsWith("(code)")?n?d.compactCodeCell:d.codeCell:f;return e("td",{className:g,children:s},l)})},t))})]})})}const u=T(N),E=u.map(r=>r.name),F=()=>e("div",{style:{background:"var(--color-informational-200)",padding:"200px 0"}}),c=({prefix:r,columnNumber:n})=>e("div",{children:[e(k,{tokenData:u.filter(a=>a.name.startsWith(r))}),e(S,{style:{display:"grid",gridTemplateColumns:`repeat(var(${r}-columns), 1fr)`,gridColumnGap:`var(${r}-gutters)`,margin:`0 var(${r}-margins)`},children:Array.from(Array(parseInt(n)).keys()).map(a=>e(F,{},a))})]});function h(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...p(),...r.components};return e(C,{children:[e(b,{title:"Design/Grid System"}),`
`,e(x,{children:[e(n.h1,{id:"grid-system",children:"Grid System"}),e(n.p,{children:["The grid system is based on a ",e(n.strong,{children:"12-column responsive grid"}),`, meaning that the
number of columns can change depending on the screen width. Let's look first at
the breakpoints and tokens we defined for our grid system. Then we'll look at
how to use them in your drop-ins.`]}),e(n.h2,{id:"grid-breakpoints",children:"Grid Breakpoints"}),e(n.p,{children:`Breakpoints are the specific widths (in pixels) that define how the drop-in grid
changes when displayed on different screen widths. These changes include the
number of columns, column widths, column gaps, and grid margins.`}),e(n.p,{children:"These are the breakpoints we defined for the drop-in grid:"}),e(m,{options:[["Name","Breakpoint (code)","Description","Devices"],["Small (default)","n/a","Screens up to 767px","Phones"],["Medium","min-width: 768px","Screens that are 768px or larger","Tablets portrait"],["Large","min-width: 1024px","Screens that are 1024px or larger","Tablets landscape"],["XLarge","min-width: 1366px","Screens that are 1366px or larger","Desktops, laptops"],["XXLarge","min-width: 1920px","Screens that are 1920px or larger","Desktops, laptops"]]}),e(n.h2,{id:"grid-tokens",children:"Grid tokens"}),e(n.p,{children:["The drop-in grid system provides ",e(n.strong,{children:"five sets of grid tokens"}),` (CSS variables) to
lay out your components: `,e(n.code,{children:"--grid-[1-5]-columns"}),", ",e(n.code,{children:"--grid-[1-5]-gutters"}),`, and
`,e(n.code,{children:"--grid-[1-5]-margins"}),`. Each set of tokens can provide a different number of
columns, column widths, column-gutter widths, or grid margins. These token sets,
values, suggested breakpoints, and the CSS properties they are applied to, are
listed below.`]}),e(m,{compact:!0,options:[["Breakpoint","Grid token (code)","Value 100px (code)","CSS property (code)"],["Small (default) screens","var(--grid-1-columns)","4","grid-template-columns"],["Small (default)","var(--grid-1-gutters)","16px","grid-column-gap"],["Small (default)","var(--grid-1-margins)","0","margin"],[],["Medium screens","var(--grid-2-columns)","12","grid-template-columns"],["Medium","var(--grid-2-gutters)","16px","grid-column-gap"],["Medium","var(--grid-2-margins)","0","margin"],[],["Large screens","var(--grid-3-columns)","12","grid-template-columns"],["Large","var(--grid-3-gutters)","24px","grid-column-gap"],["Large","var(--grid-3-margins)","0","margin"],[],["XLarge screens","var(--grid-4-columns)","12","grid-template-columns"],["XLarge","var(--grid-4-gutters)","24px","grid-column-gap"],["XLarge","var(--grid-4-margins)","0","margin"],[],["XXLarge screens","var(--grid-5-columns)","12","grid-template-columns"],["XXLarge","var(--grid-5-gutters)","24px","grid-column-gap"],["XXLarge","var(--grid-5-margins)","0","margin"]],compact:!0}),e(n.h2,{id:"how-to-use-the-grid-system",children:"How to use the grid system"}),e(n.p,{children:"To use the grid system in your drop-ins, you need to:"}),e(n.ul,{children:[`
`,e(n.li,{children:["Define your ",e(n.strong,{children:"grid-container"}),` CSS class(es) using the drop-in grid token
sets.`]}),`
`,e(n.li,{children:["Define your ",e(n.strong,{children:"grid-item"}),` CSS classes to specify the columns and spans for
your drop-in components.`]}),`
`]}),e(n.p,{children:[`You can name your grid-container and grid-item classes whatever you want. For
these examples, we will use `,e(n.code,{children:"grid-container-[size]"})," and ",e(n.code,{children:"grid-item-a"}),`,
`,e(n.code,{children:"grid-item-b"}),", and so on."]}),e(n.p,{children:`The grid-container class defines the grid itself, and the grid-item classes
define where and how to put your components on the grid. The following example
shows a simple usage of these classes:`}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-small">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
</div>
`})}),e(n.h2,{id:"define-a-grid-container",children:"Define a grid container"}),e(n.p,{children:["The first step is to define your ",e(n.code,{children:"grid-container"}),` classes. Use the grid token
sets to define values for grid-column CSS properties as shown here:`]}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-small {
  display: grid;
  grid-template-columns: repeat(var(--grid-1-columns), 1fr);
  grid-column-gap: var(--grid-1-gutters);
  margin: 0 var(--grid-1-margins);
}
`})}),e(n.p,{children:e(n.strong,{children:"CSS properties"})}),e(n.p,{children:`As shown in the previous example, every grid container needs the following CSS
properties:`}),e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"display: grid"})," — Creates a grid layout."]}),`
`,e(n.li,{children:[e(n.code,{children:"grid-template-columns:"}),` — Defines the number and width of columns in the
grid.`]}),`
`,e(n.li,{children:[e(n.code,{children:"grid-column-gap:"})," — Defines the space between columns."]}),`
`,e(n.li,{children:[e(n.code,{children:"margin:"}),` — Defines the space between the grid container and the edge of the
screen.`]}),`
`]}),e(n.h2,{id:"define-grid-items",children:"Define grid items"}),e(n.p,{children:[`Grid item CSS classes define where (which column) and how (columns span) you
want to put the components that make up your drop-in UI. To create grid-item
classes, add a `,e(n.code,{children:"grid-item-x"}),` class to the UI components within your drop-in. You
can then use the `,e(n.code,{children:"grid-column"}),` CSS property to define which column a component
starts in and the number of columns it spans.`]}),e(n.p,{children:["In this example, the ",e(n.code,{children:"grid-item-a"})," class starts at column 1 and spans 5 columns:"]}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-item-a {
  grid-column: 1 / span 5;
}
`})}),e(n.h2,{id:"example-grids",children:"Example grids"}),e(n.p,{children:`The following examples show which grid token sets we recommend when using the
defined breakpoints.`}),e(n.h3,{id:"small-default-layouts-up-to-767px",children:"Small (default) layouts (up to 767px)"}),e(n.p,{children:["For this breakpoint, we recommend the ",e(n.code,{children:"grid-1"})," token set:"]}),e(c,{prefix:"--grid-1",columnNumber:"4"}),e(n.p,{children:e(n.strong,{children:"CSS classes"})}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-small {
  display: grid;
  grid-template-columns: repeat(var(--grid-1-columns), 1fr);
  grid-column-gap: var(--grid-1-gutters);
  margin: 0 var(--grid-1-margins);
}
.grid-item-a {
  grid-column: 1 / span 4;
}
.grid-item-b {
  grid-column: 3 / span 2;
}
`})}),e(n.p,{children:e(n.strong,{children:"HTML additions"})}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-small">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
</div>
`})}),e(n.h3,{id:"medium-layouts-768px-and-wider",children:"Medium layouts (768px and wider)"}),e(n.p,{children:["For this breakpoint, we recommend the ",e(n.code,{children:"grid-2"})," token set:"]}),e(c,{prefix:"--grid-2",columnNumber:"12"}),e(n.p,{children:e(n.strong,{children:"CSS classes"})}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-medium {
  display: grid;
  grid-template-columns: repeat(var(--grid-2-columns), 1fr);
  grid-column-gap: var(--grid-2-gutters);
  margin: 0 var(--grid-2-margins);
}
.grid-item-a {
  grid-column: 1 / span 4;
}
.grid-item-b {
  grid-column: 5 / span 4;
}
.grid-item-c {
  grid-column: 9 / span 4;
}
`})}),e(n.p,{children:e(n.strong,{children:"HTML additions"})}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-medium">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
  <div class="grid-item-c">Item C</div>
</div>
`})}),e(n.h3,{id:"large-layouts-1024px-and-wider",children:"Large layouts (1024px and wider)"}),e(n.p,{children:["For this breakpoint, we recommend the ",e(n.code,{children:"grid-3"})," token set:"]}),e(c,{prefix:"--grid-3",columnNumber:"12"}),e(n.p,{children:e(n.strong,{children:"CSS classes"})}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-large {
  display: grid;
  grid-template-columns: repeat(var(--grid-3-columns), 1fr);
  grid-column-gap: var(--grid-3-gutters);
  margin: 0 var(--grid-3-margins);
}
.grid-item-a {
  grid-column: 1 / span 12;
}
.grid-item-b {
  grid-column: 1 / span 6;
}
.grid-item-c {
  grid-column: 7 / span 6;
}
`})}),e(n.p,{children:e(n.strong,{children:"HTML additions"})}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-large">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
  <div class="grid-item-c">Item C</div>
</div>
`})}),e(n.h3,{id:"xlarge-layouts-1366px-and-wider",children:"XLarge layouts (1366px and wider)"}),e(n.p,{children:["For this breakpoint, we recommend the ",e(n.code,{children:"grid-4"})," token set:"]}),e(c,{prefix:"--grid-4",columnNumber:"12"}),e(n.p,{children:e(n.strong,{children:"CSS classes"})}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-x-large {
  display: grid;
  grid-template-columns: repeat(var(--grid-4-columns), 1fr);
  grid-column-gap: var(--grid-4-gutters);
  margin: 0 var(--grid-4-margins);
}
.grid-item-a {
  grid-column: 1 / span 5;
}
.grid-item-b {
  grid-column: 6 / span 7;
}
.grid-item-c {
  grid-column: 1 / span 12;
}
`})}),e(n.p,{children:e(n.strong,{children:"HTML additions"})}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-x-large">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
  <div class="grid-item-c">Item C</div>
</div>
`})}),e(n.h3,{id:"xxlarge-layouts-1920px-and-wider",children:"XXLarge layouts (1920px and wider)"}),e(n.p,{children:["For this breakpoint, we recommend the ",e(n.code,{children:"grid-5"})," token set:"]}),e(c,{prefix:"--grid-5",columnNumber:"12"}),e(n.p,{children:[e(n.strong,{children:"NOTE:"})," The ",e(n.code,{children:"grid-3"}),", ",e(n.code,{children:"grid-4"}),", and ",e(n.code,{children:"grid-5"}),`token sets are the same. We
provide these tokens to make it easier to customize this token set for different
layouts or breakpoints.`]}),e(n.p,{children:e(n.strong,{children:"CSS classes"})}),e(n.pre,{children:e(n.code,{className:"language-css",children:`.grid-container-xx-large {
  display: grid;
  grid-template-columns: repeat(var(--grid-5-columns), 1fr);
  grid-column-gap: var(--grid-5-gutters);
  margin: 0 var(--grid-5-margins);
}
.grid-item-a {
  grid-column: 1 / span 5;
}
.grid-item-b {
  grid-column: 6 / span 7;
}
.grid-item-c {
  grid-column: 1 / span 12;
}
`})}),e(n.p,{children:e(n.strong,{children:"HTML additions"})}),e(n.pre,{children:e(n.code,{className:"language-html",children:`<div class="grid-container-xx-large">
  <div class="grid-item-a">Item A</div>
  <div class="grid-item-b">Item B</div>
  <div class="grid-item-c">Item C</div>
</div>
`})})]})]})}function O(r={}){const{wrapper:n}={...p(),...r.components};return n?e(n,{...r,children:e(h,{...r})}):h(r)}export{F as SampleColumn,c as SampleGrid,O as default,u as tokenData,E as tokenNames};
//# sourceMappingURL=grid-v24zgYXe.js.map
