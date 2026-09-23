import{u as r,a as e,M as t,U as a,k as d}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function i(o){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...o.components};return e(d,{children:[e(t,{title:"Utilities/VComponent"}),`
`,e(a,{children:[e(n.h1,{id:"vcomponent-a-vnode-wrapper-for-dynamic-rendering",children:"VComponent: A VNode wrapper for dynamic rendering"}),e(n.p,{children:[`In modern Preact-based architectures, composability and flexibility are
essential for building reusable UI components. `,e(n.code,{children:"VComponent"}),` is a utility
provided by the SDK that enables rendering of virtual nodes (`,e(n.code,{children:"VNode"}),`) passed as
props—empowering consumers to inject arbitrary content while maintaining a clean
separation of concerns.`]}),e(n.h2,{id:"why-use-vcomponent",children:"Why use VComponent?"}),e(n.p,{children:`By default, Preact allows children to be passed as virtual nodes, enabling
dynamic rendering:`}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<MyComponent>
  <h1>Hello</h1>
</MyComponent>
`})}),e(n.p,{children:[`However, flexibility increases when we extend this pattern to named props like
`,e(n.code,{children:"header"}),", ",e(n.code,{children:"footer"}),", or ",e(n.code,{children:"image"}),`. Instead of hardcoding internal markup, we
delegate the responsibility of rendering to the consumer.`]}),e(n.h2,{id:"traditional-approach-tightly-coupled",children:"Traditional approach (tightly coupled)"}),e(n.p,{children:`The standard approach to rendering a component is to pass values as props
directly to the component.`}),e(n.p,{children:e(n.strong,{children:"Implementation:"})}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`const Card = ({ imageProps }) => {
  return <img {...imageProps} />;
};
`})}),e(n.p,{children:e(n.strong,{children:"Usage:"})}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<Card imageProps={{ src: 'logo.png', alt: 'Logo' }} />
`})}),e(n.p,{children:[`This implementation tightly couples the component to a specific HTML element
(`,e(n.code,{children:"<img>"}),"), which limits its flexibility and reuse."]}),e(n.h2,{id:"composable-approach-with-vcomponent",children:"Composable approach with VComponent"}),e(n.p,{children:["The composable approach with ",e(n.code,{children:"VComponent"}),` allows consumers to pass arbitrary DOM
nodes through props.`]}),e(n.p,{children:e(n.strong,{children:"Implementation:"})}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`import { VComponent } from '@adobe-commerce/elsie/lib';

interface Props {
  image: VNode;
}

const Card = ({ image }: Props) => {
  return <VComponent node={image} className="dropin-header-image" />;
};
`})}),e(n.p,{children:e(n.strong,{children:"Usage:"})}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<Card image={<img src="logo.png" alt="Logo" />} />
// or with a custom slot/component
<Card image={<Slot name="brand-image" />} />
`})}),e(n.p,{children:`This decouples the component from a specific element. Instead, it renders
whatever VNode is passed in. Consumers now have full control over what gets
displayed.`}),e(n.h2,{id:"how-it-works",children:"How it works"}),e(n.p,{children:[e(n.code,{children:"VComponent"})," is a thin wrapper around a virtual node (",e(n.code,{children:"VNode"}),`). It renders the
node it receives as-is, while optionally applying extra props like `,e(n.code,{children:"className"}),"."]}),e(n.p,{children:`This makes it ideal for rendering content passed through slots or injected from
a higher-order component.`}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<VComponent node={header} className="my-header" />
`})}),e(n.h2,{id:"when-to-use-it",children:"When to use it"}),e(n.p,{children:["Use ",e(n.code,{children:"VComponent"})," when:"]}),e(n.ul,{children:[`
`,e(n.li,{children:"You want to allow injected custom DOM nodes (icons, slots, rich content)"}),`
`,e(n.li,{children:`You're designing reusable components meant to be extended or implemented by
different consumers (Containers, Slots, etc.)`}),`
`]}),e(n.h2,{id:"benefits",children:"Benefits"}),e(n.ul,{children:[`
`,e(n.li,{children:"Promotes reusability and composability"}),`
`,e(n.li,{children:"Supports custom rendering logic with no assumptions"}),`
`,e(n.li,{children:"Reduces internal complexity by offloading rendering decisions"}),`
`,e(n.li,{children:"Ideal for BYO-UI and dynamic layout strategies"}),`
`]})]})]})}function s(o={}){const{wrapper:n}={...r(),...o.components};return n?e(n,{...o,children:e(i,{...o})}):i(o)}export{s as default};
//# sourceMappingURL=VComponent-BBA7dFeG.js.map
