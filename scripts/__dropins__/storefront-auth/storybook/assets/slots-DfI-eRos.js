import{u as i,a as e,M as l,U as r,k as s}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(t){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e(s,{children:[e(l,{title:"Utilities/Slots"}),`
`,e(r,{children:[e(n.h1,{id:"slots",children:"Slots"}),e(n.p,{children:`A Slot is a high-level interface for developers to define and manage dynamic
content insertion within drop-in components.`}),e(n.h2,{id:"context",children:"Context"}),e(n.p,{children:`The context is defined during implementation of a drop-in and can be used to
pass data and functions to the slot.`}),e(n.h3,{id:"pre-built-methods",children:"Pre-built Methods"}),e(n.ul,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"dictionary"}),": The dictionary of the selected language."]}),`
`,e(n.li,{children:[e(n.strong,{children:"replaceWith"}),`: A function to replace the slot's content with a new HTML
element.`]}),`
`,e(n.li,{children:[e(n.strong,{children:"appendChild"}),`: A function to append a new HTML element to the slot's
content.`]}),`
`,e(n.li,{children:[e(n.strong,{children:"prependChild"}),`: A function to prepend a new HTML element to the slot's
content.`]}),`
`,e(n.li,{children:[e(n.strong,{children:"appendSibling"}),`: A function to append a new HTML element after the slot's
content.`]}),`
`,e(n.li,{children:[e(n.strong,{children:"prependSibling"}),": A function to prepend a new HTML element ",e(n.strong,{children:"before"}),` the
slot's content.`]}),`
`,e(n.li,{children:[e(n.strong,{children:"remove"}),": A function to remove the slot element from the DOM."]}),`
`,e(n.li,{children:[e(n.strong,{children:"getSlotElement"}),": A function to get a slot element."]}),`
`,e(n.li,{children:[e(n.strong,{children:"onChange"}),": A function to listen to changes in the slot's context."]}),`
`]}),e(n.hr,{}),e(n.h2,{id:"implementing-a-new-slot",children:"Implementing a new slot"}),e(n.p,{children:["The ",e(n.code,{children:"<Slot />"}),` component is used to define a slot in a container. It receives a
name and a slot object with the following properties:`]}),e(n.h3,{id:"name",children:"name"}),e(n.p,{children:["The name of the slot in ",e(n.em,{children:"PascalCase"}),". ",e(n.code,{children:"string"})," (required)."]}),e(n.h3,{id:"lazy",children:"lazy"}),e(n.p,{children:[`Controls whether the slot should be loaded immediately or deferred for later
initialization. `,e(n.code,{children:"boolean"})," (optional)."]}),e(n.p,{children:["When ",e(n.code,{children:"lazy={false}"}),`, the slot is initialized as soon as the container mounts.
When `,e(n.code,{children:"lazy={true}"}),`, the slot can be initialized later on when it is needed. This
is useful for performance optimization, especially when the slot's content is
not immediately required.`]}),e(n.h3,{id:"slottag",children:"slotTag"}),e(n.p,{children:[`The HTML tag to use for the slot's wrapper element. This allows you to change
the wrapper element from the default `,e(n.code,{children:"div"}),` to any valid HTML tag (e.g., 'span',
'p', 'a', etc.). When using specific tags like 'a', you can also provide their
respective HTML attributes (e.g., 'href', 'target', etc.).`]}),e(n.p,{children:"Example:"}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`// Render with a span wrapper
<Slot name="MySlot" slotTag="span">
  Inline content
</Slot>

// Render with an anchor wrapper
<Slot name="MySlot" slotTag="a" href="https://example.com" target="_blank">
  Link content
</Slot>
`})}),e(n.h3,{id:"contenttag",children:"contentTag"}),e(n.p,{children:`The HTML tag to use for wrapping dynamically inserted content within the slot.
This is separate from the slot's wrapper tag and allows you to control how
dynamic content is structured. Defaults to 'div'.`}),e(n.p,{children:"Example:"}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<Slot
  name="MySlot"
  slotTag="article" // The outer wrapper will be an article
  contentTag="section" // Dynamic content will be wrapped in sections
  slot={(ctx) => {
    const elem = document.createElement('div');
    elem.innerHTML = 'Dynamic content';
    ctx.appendChild(elem); // This will be wrapped in a section tag
  }}
/>
`})}),e(n.h3,{id:"slot-required",children:"slot (required)"}),e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"ctx"}),`: An object representing the context of the slot, including methods for
manipulating the slot's content.`]}),`
`]}),e(n.p,{children:`The slot property, which is implemented as a promise function, provides
developers with the flexibility to dynamically generate and manipulate content
within slots. However, it's important to note that this promise is
render-blocking, meaning that the component will not render until the promise is
resolved.`}),e(n.h3,{id:"context-1",children:"context"}),e(n.p,{children:`The context property in the Slot component lets developers pass extra
information or functionality to customize how the slot behaves or interacts with
the application. This information is accessible within the slot's rendering
logic, allowing for tailored slot behavior based on specific needs or
application states.`}),e(n.h3,{id:"render",children:"render"}),e(n.p,{children:`The render property in the Slot component lets developers define how the content
within the slot should be displayed and should be used when developers need
fine-grained control over what content appears within the slot. It's
particularly useful when using custom slot methods (see Privates below) in
scenarios where the content to be displayed within the slot is dynamic and may
depend on properties passed to another component.`}),e(n.h3,{id:"children",children:"children"}),e(n.p,{children:`The children property in the Slot component represents the content that is
passed directly within the opening and closing tags of the Slot component. It
allows developers to include static content directly within the slot, which will
be rendered as part of the slot's contents. This property is useful for cases
where the content within the slot is static or does not need to be dynamically
generated by the slot.`}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`// MyContainer.tsx (Drop-in)

import { HTMLAttributes } from 'preact/compat';
import { Container, Slot, SlotProps } from '@adobe-commerce/elsie/lib';

export interface MyContainerProps extends HTMLAttributes<HTMLDivElement> {
  slots?: {
    MyOpenSlot?: SlotProps<{
      // MyOpenSlot Context
      data: MyContainerData;
    }>;
  };
}

export const MyContainer: Container<MyContainerProps> = ({
  slots,
  children,
  ...props
}) => {
  // ...

  return (
    <div {...props}>
      <Slot name="MyOpenSlot" slot={slots?.MyOpenSlot} context={{ data }} />
    </div>
  );
};
`})}),e(n.p,{children:" "}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// blocks/my-block.js (storefront)

provider.render(MyContainer, {
  slots: {
    MyOpenSlot: async (ctx) => {
      // create a new HTML element
      const element = document.createElement('div');
      // set the innerHTML of the new element to the text from the context's data
      element.innerHTML = ctx.data.text;

      // append the new element to the slot's content
      ctx.appendChild(element);

      // ...or you could also use any of the other slot methods to manipulate the slot's content
      // ctx.replaceWith(element);
      // ctx.prependChild(element);
      // ctx.appendSibling(element);
      // ctx.prependSibling(element);
      // ctx.remove();

      // to listen and react to changes in the slot's context (lifecycle)
      ctx.onChange((next) => {
        // update the innerHTML of the new element to the new text from the context's data
        element.innerHTML = ctx.data.text;
      });
    },
  },
});
`})}),e(n.h2,{id:"privates",children:"Privates"}),e(n.p,{children:["The ",e(n.code,{children:"<Slot />"}),` component has a private interface that serves as a mechanism for
managing internal complexity and promoting clean, modular design within the Slot
component or related components.`]}),e(n.h3,{id:"_registermethod",children:"_registerMethod"}),e(n.p,{children:["The ",e(n.code,{children:"_registerMethod"}),` private function is used to register a method in the
slot's context which is particularly helpful in scenarios where dynamic behavior
or interactions need to be incorporated into the Slot component.`]}),e(n.p,{children:`Slot Methods also include the ability to modify the slot's state or content
based on external interactions or changes in application state.`}),e(n.h3,{id:"_setprops",children:"_setProps"}),e(n.p,{children:["The ",e(n.code,{children:"_setProps"}),` private function within the Slot component is responsible for
dynamically updating the properties of the slot. It allows developers to modify
the slot's state or content based on external interactions or changes in
application state, triggering re-renders of the slot component with updated
properties.`]}),e(n.h3,{id:"_htmlelementtovnode",children:"_htmlElementToVNode"}),e(n.p,{children:["The ",e(n.code,{children:"_htmlElementToVNode"}),` private function in the Slot component converts HTML
elements into virtual DOM nodes (VNodes), enabling their integration into Preact
components. This conversion facilitates the dynamic insertion of HTML content
into slots while benefiting from Preact's virtual DOM reconciliation and
rendering.`]}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`// MyContainer.tsx (Drop-in)

<Slot
  name="MyOpenSlot"
  slot={slots?.MyOpenSlot}
  context={{
    // custom slot method
    appendButton(callback) {
      // use _registerMethod to register a method in the slot's context
      this._registerMethod((...attrs) => {
        // callback return the values provided by the storefront developer
        const { text, ...buttonProps } = callback(...attrs);

        const button = (
          <Button type="button" {...buttonProps}>
            {text}
          </Button>
        );

        // use _setProps to update the slot's properties
        this._setProps((prev: any) => ({
          children: [...(prev.children || []), button],
        }));
      });
    },
  }}
  render={(props) => {
    // render the slot's content using props mutated by the slot's methods
    return <Buttons>{props.children}</Buttons>;
  }}
/>
`})}),e(n.p,{children:" "}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// blocks/my-block.js (storefront)

provider.render(MyContainer, {
  slots: {
    // Available Slots
    MyOpenSlot: (ctx) => {
      ctx.appendButton: (next, state) => {
        // use state to get the current state of the slot
        const loading = state.get('loading');

        return {
          text: loading ? 'Loading' : 'Click me!',
          onClick: async () => {
            // use state to update the state of the slot
            state.set('loading', true);

            await doSomething().finally(() => {
              state.set('loading', false);
            });
          },
        };
      },
    },
  },
});
`})})]})]})}function d(t={}){const{wrapper:n}={...i(),...t.components};return n?e(n,{...t,children:e(o,{...t})}):o(t)}export{d as default};
//# sourceMappingURL=slots-DfI-eRos.js.map
