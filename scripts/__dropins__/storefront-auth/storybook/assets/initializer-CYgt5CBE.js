import{u as t,a as e,M as l,U as r,k as o}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function a(i){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...i.components};return e(o,{children:[e(l,{title:"API/Initializer"}),`
`,e(r,{children:[e(n.h1,{id:"initializer",children:"Initializer"}),e(n.pre,{children:e(n.code,{className:"language-typescript",children:`// my-dropin/initializer.ts

import { Initializer } from '@adobe-commerce/elsie/lib';
// import { events } from '@adobe-commerce/event-bus';

type ConfigProps = {};

export const initialize = new Initializer<ConfigProps>({
  init: async (config) => {
    const defaultConfig = {};
    initialize.config.setConfig({ ...defaultConfig, ...config });
  },

  listeners: () => [
    // events.on('authenticated', (authenticated) => {
    //   console.log('authenticated', authenticated);
    // }),
  ],
});

export const config = initialize.config;
`})}),e(n.pre,{children:e(n.code,{className:"language-typescript",children:`// Host Site
import { initializers } from '@dropins/tools/initializer.js';
import { initialize as pkg } from 'my-dropin/initializer.js';

// Register Packages
initializers.register(pkg, { ...config });

// Mount Initializers
window.addEventListener('load', initializers.mount);
`})})]}),`
`,e(n.h2,{id:"setimageparamkeysparams",children:e(n.code,{children:"setImageParamKeys(params)"})}),`
`,e(n.p,{children:["The ",e(n.code,{children:"setImageParamKeys"}),` method is part of the initializers module in the
`,e(n.code,{children:"@dropins/tools"}),` package. It allows you to set image parameters globally for all
drop-ins that use the Image component.`]}),`
`,e(n.h3,{id:"default-behavior",children:"Default Behavior"}),`
`,e(n.p,{children:["By default, Fastly parameters are used if ",e(n.code,{children:"setImageParamKeys"}),` is not called or
if no parameters are provided.`]}),`
`,e(n.h3,{id:"parameters",children:"Parameters"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"params"})," - ",e(n.code,{children:"{ [key: string]: string | ((data: any) => [string, string]) }"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:`An object of key-value pairs to map image parameters to their respective
keys in the URL.`}),`
`,e(n.li,{children:`The value can be a string or a function that takes the parameter value as an
argument and returns a tuple of the new key and transformed value.`}),`
`]}),`
`]}),`
`]}),`
`,e(n.h3,{id:"functionality",children:"Functionality"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:["If a parameter key is provided via ",e(n.code,{children:"setImageParamKeys"}),`, it is used in
generating image URLs instead of the default Fastly parameters.`]}),`
`,e(n.li,{children:["If a parameter key is not provided via ",e(n.code,{children:"setImageParamKeys"}),`, it is omitted from
the generated image URLs.`]}),`
`,e(n.li,{children:[`If a mapped key is a function and it is not specified as a parameter in the
Image component, it is called with `,e(n.code,{children:"null"}),`. It should return a tuple of the key
and value.`]}),`
`,e(n.li,{children:`If a mapping callback is provided, the callback is called with the parameter
value (if it exists) and should return a tuple of the new key and transformed
value.`}),`
`,e(n.li,{children:["If a mapping callback returns ",e(n.code,{children:"null"}),`, the parameter is omitted from the
generated image URLs.`]}),`
`]}),`
`,e(n.h3,{id:"usage",children:"Usage"}),`
`,e(n.p,{children:`Call the setImageParamKeys() function before the register() and mount()
functions in the application layer.`}),`
`,e(n.pre,{children:e(n.code,{className:"language-javascript",children:`// Set global image parameters
initializers.setImageParamKeys({
  // Re-map the width parameter to imgWidth
  width: 'imgWidth',
  // Transform the quality parameter
  quality: (value) => ['imgQuality', value * 100],
  // Add an additional parameter to the image URL
  extraParam: () => ['extraParam', 'extraValue'],
});

initializers.mountImmediately(pkg.initialize, {
  langDefinitions,
});
`})}),`
`,e(n.p,{children:`Now, when a dropin uses the Image component to render an image with a width of
300 pixels and quality value of 0.8:`}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Image
  loading={'lazy'}
  src={'https://example.com/image.jpg'}
  alt={'Example Image'}
  width="300"
  height="300"
  params={{ width: 300, quality: 0.8 }}
/>
`})}),`
`,e(n.p,{children:"It renders the following image element:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-html",children:`<img
  loading="lazy"
  src="https://example.com/image.jpg"
  srcset="
    https://example.com/image.jpg?imgWidth=300&imgQuality=80&extraParam=extraValue  768w,
    https://example.com/image.jpg?imgWidth=300&imgQuality=80&extraParam=extraValue 1024w,
    https://example.com/image.jpg?imgWidth=300&imgQuality=80&extraParam=extraValue 1366w,
    https://example.com/image.jpg?imgWidth=300&imgQuality=80&extraParam=extraValue 1920w
  "
  alt="Example Image"
  width="300"
  height="300"
/>
`})}),`
`,e(n.p,{children:`In this example, the width parameter is mapped to imgWidth and the value of the
quality parameter is modified and mapped to imgQuality.`}),`
`,e(n.h2,{id:"setgloballocalelocale",children:e(n.code,{children:"setGlobalLocale(locale)"})}),`
`,e(n.p,{children:["The ",e(n.code,{children:"setGlobalLocale"}),` method is part of the initializers module in the
`,e(n.code,{children:"@dropins/tools"}),` package. It allows you to set a global locale for all drop-ins
that use locale-sensitive components like the Price component.`]}),`
`,e(n.h3,{id:"default-behavior-1",children:"Default Behavior"}),`
`,e(n.p,{children:`By default, components use the browser's locale or fallback to 'en-US' if no
global locale is set.`}),`
`,e(n.h3,{id:"parameters-1",children:"Parameters"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"locale"})," - ",e(n.code,{children:"string"}),` - The locale string (e.g., 'en-US', 'es-MX', 'fr-FR',
'de-DE').`]}),`
`]}),`
`,e(n.h3,{id:"functionality-1",children:"Functionality"}),`
`,e(n.ul,{children:[`
`,e(n.li,{children:["If a global locale is set via ",e(n.code,{children:"setGlobalLocale"}),`, it will be used by components
that support locale configuration.`]}),`
`,e(n.li,{children:"Component-specific locale props will take precedence over the global locale."}),`
`,e(n.li,{children:`If no global locale is set, components will fall back to the browser's locale
or a default locale.`}),`
`]}),`
`,e(n.h3,{id:"usage-1",children:"Usage"}),`
`,e(n.p,{children:["Call the ",e(n.code,{children:"setGlobalLocale()"})," function before the ",e(n.code,{children:"mountImmediately()"}),` function
in the application layer.`]}),`
`,e(n.pre,{children:e(n.code,{className:"language-javascript",children:`// Set global locale for consistent formatting across all drop-ins
initializers.setGlobalLocale('fr-FR');

// Register and Mount Initializers immediately
initializers.mountImmediately(pkg.initialize, {});
`})}),`
`,e(n.p,{children:"Now, when a dropin uses the Price component without specifying a locale prop:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Price amount={100} currency="EUR" />
`})}),`
`,e(n.p,{children:"It will render with the global locale (fr-FR) formatting:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-html",children:`<span
  class="dropin-price dropin-price--default dropin-price--small dropin-price--bold"
>
  100,00 €
</span>
`})}),`
`,e(n.p,{children:`If the same component is used with a specific locale prop, that will take
precedence:`}),`
`,e(n.pre,{children:e(n.code,{className:"language-jsx",children:`<Price amount={100} currency="EUR" locale="en-US" />
`})}),`
`,e(n.p,{children:"It will render with the specified locale (en-US) formatting:"}),`
`,e(n.pre,{children:e(n.code,{className:"language-html",children:`<span
  class="dropin-price dropin-price--default dropin-price--small dropin-price--bold"
>
  €100.00
</span>
`})})]})}function s(i={}){const{wrapper:n}={...t(),...i.components};return n?e(n,{...i,children:e(a,{...i})}):a(i)}export{s as default};
//# sourceMappingURL=initializer-CYgt5CBE.js.map
