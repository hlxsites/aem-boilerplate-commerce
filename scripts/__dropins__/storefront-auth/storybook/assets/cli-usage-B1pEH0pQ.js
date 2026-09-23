import{u as o,a as e,M as c,U as i,k as s}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function r(a){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",p:"p",pre:"pre",strong:"strong",...o(),...a.components};return e(s,{children:[e(c,{title:"CLI usage"}),`
`,e(i,{children:[e(n.h1,{id:"cli-usage",children:"CLI usage"}),e(n.p,{children:["To see all the available CLI commands in the terminal, use the ",e(n.code,{children:"--help"})," flag:"]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie --help
`})}),e(n.h2,{id:"gql",children:e(n.code,{children:"gql"})}),e(n.p,{children:["The ",e(n.code,{children:"gql"}),` command can generate types and mocks for your GraphQL API and
Operations. Files will be generated in
`,e(n.code,{children:"<domain package root>/src/__generated__/"}),"."]}),e(n.p,{children:["To use it, you must first configure your ",e(n.code,{children:".elsie.cjs"})," with the necessary values:"]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// For Adobe Commerce Catalog Service
schema: {
    endpoint: "https://catalog-service-sandbox.adobe.io/graphql",
    headers: {
        "MAGENTO-ENVIRONMENT-ID": "..."
        "MAGENTO-STORE-VIEW-CODE": "..."
        "MAGENTO-WEBSITE-CODE": "..."
        "MAGENTO-STORE-CODE": "..."
        "MAGENTO-CUSTOMER-GROUP": "..."
        "API-KEY": "..."
    }
}
`})}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// For Adobe Mesh API
schema: {
    endpoint: "https://graph.adobe.io/api/.../graphql?api_key=...",
    headers: {
        "some-mesh-specific-header": "mesh-header-value"
    }
}
`})}),e(n.pre,{children:e(n.code,{className:"language-js",children:`// For Adobe Commerce (non-Mesh)
schema: {
    endpoint: "https://commerce-backend-url.test.graphql",
    headers: {}
}
`})}),e(n.p,{children:["Then the following commands will generate to ",e(n.code,{children:"src/__generated__/"}),":"]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie gql types
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie gql mocks
`})}),e(n.p,{children:[e(n.strong,{children:"Note"}),": In order to generate types for your ",e(n.em,{children:"client"})," operations you ",e(n.strong,{children:"must"}),`
have your operations in files using the *.graphql.ts extension, and you
`,e(n.strong,{children:"must"})," prepend the query string with ",e(n.code,{children:"/\\* graphql \\*/"}),` (the
`,e(n.a,{href:"https://the-guild.dev/graphql/codegen/docs/config-reference/documents-field#graphql-tag-pluck",rel:"nofollow",children:"magic comment"}),`
is case insensitive).`]}),e(n.p,{children:"Example:"}),e(n.pre,{children:e(n.code,{children:`export const CREATE_CART = /* graphql */ \`
  mutation createCart {
    cartId: createEmptyCart
  }
\`;
`})}),e(n.h2,{id:"generate",children:e(n.code,{children:"generate"})}),e(n.p,{children:"Summary list of commands for quick copy/paste."}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate config --name <Domain>
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate component --pathname <MyUIComponent>
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate container --pathname <MyContainer>
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate api --pathname <myApiFunction>
`})}),e(n.h2,{id:"add-config",children:"Add Config"}),e(n.p,{children:["Generate a new ",e(n.code,{children:".elsie.cjs"})," configuration file for the project."]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate config --name <Domain>
`})}),e(n.pre,{children:e(n.code,{className:"language-javascript",children:`module.exports = {
  name: '<Domain>',
  api: {
    root: './src/api',
    importAliasRoot: '@/<Domain>/api',
  },
  components: [
    {
      id: 'Components',
      root: './src/components',
      importAliasRoot: '@/<Domain>/components',
      cssPrefix: 'dropin',
      default: true,
    },
  ],
  containers: {
    root: './src/containers',
    importAliasRoot: '@/<Domain>/containers',
  },
  schema: {
    endpoint: process.env.ENDPOINT,
    // Add necessary headers
    headers: {},
  },
};
`})}),e(n.h2,{id:"add-component",children:"Add Component"}),e(n.p,{children:"Generate a new UI Component for the project."}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate component --pathname <MyUIComponent>
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`🆕 src/components/LoginForm/LoginForm.css created
🆕 src/components/LoginForm/LoginForm.stories.tsx created
🆕 src/components/LoginForm/LoginForm.test.tsx created
🆕 src/components/LoginForm/LoginForm.tsx created
🆕 src/components/LoginForm/index.ts created
✍️ src/components/index.ts updated
`})}),e(n.h2,{id:"add-container",children:"Add Container"}),e(n.p,{children:"Generate a new Frontend Container for the project."}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate container --pathname <MyContainer>
`})}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`🆕 src/containers/Login/Login.stories.tsx created
🆕 src/containers/Login/Login.test.tsx created
🆕 src/containers/Login/Login.tsx created
🆕 src/containers/Login/index.ts created
✍️ src/containers/index.ts updated
`})}),e(n.h2,{id:"add-function",children:"Add Function"}),e(n.p,{children:"Generate a new API function for the project."}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate api --pathname <myApiFunction>
`})}),e(n.pre,{children:e(n.code,{className:"language-console",children:`🆕 src/api/login/login.mdx created
🆕 src/api/login/login.test.ts created
🆕 src/api/login/login.ts created
🆕 src/api/login/index.ts created
✍️ src/api/index.ts updated
`})})]})]})}function l(a={}){const{wrapper:n}={...o(),...a.components};return n?e(n,{...a,children:e(r,{...a})}):r(a)}export{l as default};
//# sourceMappingURL=cli-usage-B1pEH0pQ.js.map
