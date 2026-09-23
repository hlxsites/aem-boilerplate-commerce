import{u as r,a as e,M as o,U as a,k as d}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function t(i){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...r(),...i.components};return e(d,{children:[e(o,{title:"Build Tools/GraphQL API"}),`
`,e(a,{children:[e(n.h1,{id:"graphql-extensibility-api",children:"GraphQL Extensibility API"}),e(n.p,{children:`The GraphQL Extensibility API allows developers to extend existing GraphQL
operations used by a Drop-in to meet additional data requirements without
increasing code complexity or negatively impacting performance. This API
provides a flexible and efficient way to customize GraphQL Fragments by
integrating build-time modifications into the storefront's development pipeline.`}),e(n.h2,{id:"extend-your-drop-in-graphql-fragments",children:"Extend your Drop-in GraphQL Fragments"}),e(n.p,{children:`To enable GraphQL Fragments to be extensible in your Drop-in, follow these
steps:`}),e(n.h3,{id:"step-1-define-your-fragments",children:"Step 1: Define Your Fragments"}),e(n.p,{children:"Create the content for the fragments you are exporting."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// ./src/api/fragments/MyFragment.ts

export const MY_FRAGMENT = \`
  fragment MY_FRAGMENT on FragmentInterface {
    firstname
    lastname
    
    favorites {
      uid
      name
    }
  }
\`;
`})}),e(n.h3,{id:"step-2-create-fragments-manifest-file",children:"Step 2: Create Fragments Manifest File"}),e(n.p,{children:`Next, create a new file for your project to list all the fragments you want to
expose.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// ./src/api/fragments.ts

export { MY_FRAGMENT } from '@/my-dropin/api/graphql/MyFragment';
`})}),e(n.h2,{id:"step-3-update-the-api-configuration",children:"Step 3: Update the API Configuration"}),e(n.p,{children:["Finally, add the new file reference to the API configuration in ",e(n.code,{children:"./.elsie.cjs"}),"."]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// ./.elsie.cjs

module.exports = {
  name: 'MyDropin',
  api: {
    root: './src/api',
    importAliasRoot: '@/my-dropin/api',
    fragments: './fragments.ts', // 👈 add this line
  },
  components: [
    {
      id: 'Components',
      root: './src/components',
      importAliasRoot: '@/my-dropin/components',
      cssPrefix: 'my-dropin',
      default: true,
    },
  ],
  containers: {
    root: './src/containers',
    importAliasRoot: '@/my-dropin/containers',
  },
  schema: {
    endpoint: process.env.ENDPOINT,
    headers: {},
  },
};
`})}),e(n.h2,{id:"extend-the-data-module",children:"Extend the Data module"}),e(n.p,{children:`Now that we have made our fragments extensible, we must extend the data model
used in our Drop-ins.`}),e(n.h3,{id:"step-1-define-typing-to-the-initializer-api",children:"Step 1: Define Typing to the Initializer API"}),e(n.p,{children:[`First, add the typing to your initializer API in
`,e(n.code,{children:"./src/api/initialize/initialize.ts"}),"."]}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// ./src/api/initialize/initialize.ts

import { Initializer, Model } from '@adobe-commerce/elsie/lib';
import { Lang } from '@adobe-commerce/elsie/i18n';
import { MyModel } from '@/my-dropin/data/models';

type ConfigProps = {
  langDefinitions?: Lang;

  // 👇 add your models configuration
  models?: {
    MyModel?: Model<MyModel>;
  };
};

export const initialize = new Initializer<ConfigProps>({
  init: async (config) => {
    const defaultConfig = {};
    initialize.config.setConfig({ ...defaultConfig, ...config });
  },

  listeners: () => [],
});

export const config = initialize.config;
`})}),e(n.h3,{id:"step-2-extend-the-data-transformer",children:"Step 2: Extend the Data Transformer"}),e(n.p,{children:`Then, use the configuration to extend the data transformer the model uses by
deep merging the existing data transformation with the new configuration.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// ./src/data/transforms/transform-my-model.ts
import { merge } from '@adobe-commerce/elsie/lib';
import { MyModel } from '@/my-dropin/data/models';

export function transformMyModel(data: any): MyModel {
  const model = {
    name: \`\${data.firstname} \${data.lastname}\`,
    favorites: data.favorites,
  };

  // Merge custom transformer, if provided
  return merge(
    model, // default transformer
    config.getConfig().models?.MyModel?.transformer?.(data), // custom transformer
  );
}
`})}),e(n.hr,{}),e(n.h1,{id:"using-the-graphql-extensibility-feature-in-your-storefront",children:"Using the GraphQL Extensibility Feature in Your Storefront"}),e(n.p,{children:`By extending the GraphQL Fragments and Models of drop-ins, you can leverage the
drop-in's existing GraphQL operations and add extra fields needed to meet your
specific business requirements. This approach enhances the user experience while
maintaining code simplicity and performance efficiency since all modifications
are integrated into the storefront's development build-time pipeline.`}),e(n.h2,{id:"extend-drop-ins-fragments-and-models",children:"Extend Drop-in's Fragments and Models"}),e(n.p,{children:"Follow these steps to extend the GraphQL Fragment and Model in your Drop-in:"}),e(n.h3,{id:"step-1-extend-the-graphql-fragment",children:"Step 1: Extend the GraphQL Fragment"}),e(n.p,{children:["Use the ",e(n.code,{children:"overrideGQLOperations"}),` function to extend the existing GraphQL
Fragment, allowing you to add fields to the fragment as needed.`]}),e(n.p,{children:["The ",e(n.code,{children:"overrideGQLOperations"}),` functions accept an array of configuration objects
where you must specify:`]}),e(n.h4,{id:"npm-string",children:"npm: string"}),e(n.p,{children:'The node module name of the drop-in. i.e. "@dropins/my-dropin".'}),e(n.h4,{id:"operations-string",children:"operations: string[]"}),e(n.p,{children:"An array of string or template literal with operations."}),e(n.ul,{children:[`
`,e(n.li,{children:"Only one definition can be provided in the operation."}),`
`,e(n.li,{children:[`These must match the operation name as provided by the drop-in. i.e.
`,e(n.code,{children:"MY_FRAGMENT"}),"."]}),`
`,e(n.li,{children:[`The operations must be valid GraphQL operations, such as Fragment. i.e.
`,e(n.code,{children:"fragment MY_FRAGMENT on FragmentInterface { ... }"}),"."]}),`
`,e(n.li,{children:[`In the case of a Fragment, the fragment name must match the same interface as
the drop-in. i.e. `,e(n.code,{children:"FragmentInterface"}),"."]}),`
`,e(n.li,{children:["If an existing field that has variables is used:",`
`,e(n.ul,{children:[`
`,e(n.li,{children:[`If not variables are provided, the existing variables will be used. i.e.
`,e(n.code,{children:"favorites(page: 1) { ... }"}),"."]}),`
`,e(n.li,{children:[`If new variables are provided, the new variable will be added. i.e.
`,e(n.code,{children:"favorites(page: 1, offset: 5) { ... }"}),"."]}),`
`,e(n.li,{children:[`If the existing variables are changed, the new variables will be used. i.e.
`,e(n.code,{children:"favorites(page: 2) { ... }"}),"."]}),`
`]}),`
`]}),`
`]}),e(n.h4,{id:"skipfragments-string",children:"skipFragments: string[]"}),e(n.p,{children:[`An array of fragment names to remove from the drop-in's exported fragments file.
When a fragment name is listed in `,e(n.code,{children:"skipFragments"}),":"]}),e(n.ul,{children:[`
`,e(n.li,{children:"The fragment definition is removed from its exported variable."}),`
`,e(n.li,{children:`All references (fragment spreads) to the skipped fragment are also removed
from other operations in the same file.`}),`
`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  {
    npm: '@dropins/my-dropin',
    skipFragments: ['MY_FRAGMENT'],
  },
]);
`})}),e(n.h4,{id:"using-skipfragments-and-operations-together",children:["Using ",e(n.code,{children:"skipFragments"})," and ",e(n.code,{children:"operations"})," together"]}),e(n.p,{children:["When both ",e(n.code,{children:"skipFragments"})," and ",e(n.code,{children:"operations"}),` are provided for the same fragment
name, the fragment is `,e(n.strong,{children:"fully replaced"})," rather than merged:"]}),e(n.ol,{children:[`
`,e(n.li,{children:[e(n.code,{children:"skipFragments"})," removes the original fragment definition entirely."]}),`
`,e(n.li,{children:[e(n.code,{children:"operations"}),` writes the new fragment definition directly, without merging it
with the (now-removed) original.`]}),`
`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import { overrideGQLOperations } from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  {
    npm: '@dropins/my-dropin',
    skipFragments: ['MY_FRAGMENT'],
    operations: [
      \`
      fragment MY_FRAGMENT on FragmentInterface {
        fragmentName
      }
    \`,
    ],
  },
]);
`})}),e(n.p,{children:["In the example above, the original ",e(n.code,{children:"MY_FRAGMENT"}),` is fully removed by
`,e(n.code,{children:"skipFragments"}),` and then replaced by the new definition containing only
`,e(n.code,{children:"fragmentName"}),"."]}),e(n.blockquote,{children:[`
`,e(n.p,{children:[e(n.strong,{children:"Note:"})," If ",e(n.code,{children:"skipFragments"})," is used without a matching ",e(n.code,{children:"operations"}),` entry,
the fragment is simply removed (emptied). If `,e(n.code,{children:"operations"}),` is used without
`,e(n.code,{children:"skipFragments"}),", the new fields are ",e(n.strong,{children:"merged"}),` into the existing fragment
definition.`]}),`
`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import overrideGQLOperations from '@dropins/build-tools/gql-extend.js';

overrideGQLOperations([
  {
    npm: '@dropins/my-dropin',
    operations: [
      \`
      fragment MY_FRAGMENT on FragmentInterface {
        age
        
        favorites {
          quantity
        }
      }
    \`,
    ],
  },
]);
`})}),e(n.h3,{id:"step-2-extend-the-data-model",children:"Step 2: Extend the Data Model"}),e(n.p,{children:`Next, update the data models to include the new fields added to the fragment,
ensuring that the additional data is correctly processed and available for use
in the drop-in. i.e., Slots, Event Bus, etc.`}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import * as api from '@dropins/storefront-cart/api.js';

initializers.register(api.initialize, {
  models: {
    MyModel: {
      transformer: (data) => ({
        age: data?.age,
        favorites: data.favorites.map((favorite) => ({
          quantity: favorite.quantity,
        })),
      }),
    },
  },
});
`})})]})]})}function c(i={}){const{wrapper:n}={...r(),...i.components};return n?e(n,{...i,children:e(t,{...i})}):t(i)}export{c as default};
//# sourceMappingURL=graphql-DDDryMgF.js.map
