import{u as t,a as e,M as i,U as a,k as d}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",p:"p",pre:"pre",...t(),...r.components};return e(d,{children:[e(i,{title:"API/Render"}),`
`,e(a,{children:[e(n.h1,{id:"render",children:"Render"}),e(n.h2,{id:"implementing-a-new-render-in-your-dropin",children:"Implementing a new render in your dropin"}),e(n.p,{children:[`To implement a new render in your dropin, you must create an instance of the
`,e(n.code,{children:"Render"})," class from the ",e(n.code,{children:"@adobe-commerce/elsie/lib"}),` library, passing in a
`,e(n.code,{children:"Provider"}),` component. This setup initializes the rendering context with the
specified provider, which can manage state, context, or other dependencies
required by your components. By exporting this `,e(n.code,{children:"render"}),` instance, you enable
different parts of your application to render components within the defined
context, ensuring consistent behavior and integration across your application.`]}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Dropin

import { Render } from '@adobe-commerce/elsie/lib';
import { Provider } from './Provider';

export const render = new Render(<Provider />);
`})}),e(n.h2,{id:"rendering-a-dropins-container-in-a-storefront",children:"Rendering a dropin's container in a storefront"}),e(n.p,{children:`The render function mounts a drop-in container or component into the DOM and
manages its lifecycle. It returns a Promise that resolves to an object
containing methods for updating and removing the component instance.`}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// Storefront
import { render as provider } from 'my-domain-pkg/render.js';
import { MyContainer } from 'my-domain-pkg/containers/MyContainer.js';

const wrapper = document.getElementById('my-container-root');

provider.render(MyContainer, { ...props })(wrapper);
`})}),e(n.h3,{id:"using-vnode-as-a-property",children:"Using VNode as a property"}),e(n.p,{children:`Some components may require VNodes as properties. If you are using another
component from the library, provide the VNode by executing the component as a
function.`}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// Storefront

import { Button, Icon, provider } from '@dropins/tools/components.js';

const wrapper = document.getElementById('my-container-root');

provider.render(Button, {
  children: 'My Button',
  icon: Icon({ source: 'Heart' }),
})(wrapper);
`})}),e(n.p,{children:["You may also create your VNode using the ",e(n.code,{children:"h"})," function from the Preact library."]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// Storefront

import { Button, provider } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

const wrapper = document.getElementById('my-container-root');

provider.render(Button, { icon: h('div', { id: 'my-vnode' }) })(wrapper);
`})}),e(n.h3,{id:"update-properties-of-a-rendered-component",children:"Update properties of a rendered component"}),e(n.p,{children:["The ",e(n.code,{children:"setProps"})," method is provided by the instance returned from the ",e(n.code,{children:"render"}),`
function. It allows for dynamic updates to the properties of a rendered
component. By accepting an updater function, `,e(n.code,{children:"setProps"}),` lets you modify the
component's props based on its previous state. This method is particularly
useful for making incremental changes or responding to user interactions without
re-rendering the entire component. It ensures that the component's state remains
consistent and up-to-date with the latest data or user inputs.`]}),e(n.h4,{id:"example",children:"Example"}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// Storefront

import { render as provider } from 'my-domain-pkg/render.js';
import { MyContainer } from 'my-domain-pkg/containers/MyContainer.js';

const wrapper = document.getElementById('my-container-root');
const myContainer = await provider.render(MyContainer, { ...props })(wrapper);

const button = document.getElementById('my-button');

button.addEventListener('click', () => {
  // Update the component's props
  myContainer.setProps((prevProps) => ({
    ...prevProps,
    newProp: 'new value',
  }));
});
`})}),e(n.h3,{id:"remove-a-rendered-component-from-the-dom",children:"Remove a rendered component from the DOM"}),e(n.p,{children:["The ",e(n.code,{children:"remove"})," method is provided by the instance returned from the ",e(n.code,{children:"render"}),`
function. It allows for the complete removal of a rendered component from the
DOM. When invoked, `,e(n.code,{children:"remove"}),` ensures that the component and its associated
resources are properly cleaned up, preventing memory leaks and maintaining the
application's overall performance. This method is essential for managing the
lifecycle of dynamic components, especially in applications where components
need to be frequently added and removed based on user interactions or other
events.`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import { render as provider } from 'my-domain-pkg/render.js';
import { MyContainer } from 'my-domain-pkg/containers/MyContainer.js';

const wrapper = document.getElementById('my-container-root');
const myContainer = await provider.render(MyContainer, { ...props })(wrapper);

const button = document.getElementById('my-button');

button.addEventListener('click', () => {
  // Remove the component from the DOM
  myContainer.remove();
});
`})}),e(n.h3,{id:"unmounting-components-without-instance-access",children:"Unmounting components without instance access"}),e(n.p,{children:["The ",e(n.code,{children:"Render.unmount"}),` static method provides a way to unmount components from the
DOM when you don't have direct access to the component instance. This is
particularly useful in scenarios where components are rendered inside modals,
dialogs, or other temporary containers that need to be cleaned up.`]}),e(n.h4,{id:"example-1",children:"Example"}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// Close the dialog
dialog.close();

// Unmount any dropin containers rendered in the modal
dialog.querySelectorAll('[data-dropin-container]').forEach(Render.unmount);
`})}),e(n.p,{children:`This approach ensures that all dropin components are properly cleaned up when
their container elements are removed from the DOM, preventing memory leaks and
maintaining application performance.`})]})]})}function p(r={}){const{wrapper:n}={...t(),...r.components};return n?e(n,{...r,children:e(o,{...r})}):o(r)}export{p as default};
//# sourceMappingURL=render-B2zRiXrq.js.map
