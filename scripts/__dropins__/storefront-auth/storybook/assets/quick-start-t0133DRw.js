import{a as e,U as h,$ as u,h as D,q as I,k as m,I as S,G as L,u as g,M as A}from"./iframe-S6tzT0R4.js";import{S as M}from"./Screenshot-BR-EB9oD.js";import"./preload-helper-C1FmrZbK.js";const P="_stepsContainer_1qotp_10",N="_steps_1qotp_10",d={stepsContainer:P,steps:N};function T({children:o}){return e(h,{children:e("div",{className:`${d.stepsContainer} ${d.steps}`,children:o})})}const f=L(0);function y(){return S(f)}const R=({children:o})=>e("div",{style:{marginTop:"0.5rem",userSelect:"none",fontSize:"14px",color:"#333333"},children:e("div",{style:{display:"inline-flex",flexDirection:"column",borderRadius:"0.375rem",border:"1px solid",padding:"0.5rem 1rem 0.5rem .25rem",borderColor:"rgb(229, 231, 235)"},children:o})});function w(){const o=y();return e(m,{children:[...Array(o)].map((n,r)=>e("span",{style:{display:"inline-block",width:"0"}},r))})}const b=u(({label:o,name:n,description:r=null,open:s,children:x,defaultOpen:v=!1,onToggle:i})=>{const k=y(),[a,j]=D(v),C=I(()=>{i==null||i(!a),j(!a)},[a,i]),c=s===void 0?a:s;return e("li",{style:{display:"flex",listStyleType:"none",flexDirection:"column"},children:[e("a",{onClick:C,title:n,style:{display:"inline-flex",cursor:"pointer",alignItems:"center",padding:"0",fontSize:"0.875rem",color:"#333333",textDecoration:"none",backgroundColor:"transparent",border:"none",outline:"none",transition:"opacity 0.2s ease-in-out"},children:[e(w,{}),e("svg",{width:"1.5em",height:"1.5em",viewBox:"0 0 24 24",style:{marginLeft:"0.25rem",marginRight:"0",fill:"none",stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1},children:e("path",{d:c?"M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2Z":"M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z"})}),e("span",{style:{marginLeft:"0.25rem",fontSize:"14px"},children:[o??n," ",r]})]}),c&&e("ul",{style:{paddingLeft:"1.25rem",marginTop:"auto",marginBottom:"auto"},children:e(f.Provider,{value:k+1,children:x})})]})});b.displayName="Folder";const F=u(({label:o,name:n,description:r})=>e("li",{style:{display:"flex",listStyleType:"none",flexDirection:"column"},children:e("a",{style:{display:"inline-flex",cursor:"default",alignItems:"center",padding:"0 0 0 .25rem",fontSize:"0.875rem",color:"#333333",textDecoration:"none",backgroundColor:"transparent",border:"none",outline:"none"},children:[e(w,{}),e("svg",{width:"1.3em",height:"1.3em",viewBox:"0 0 24 24",style:{marginLeft:"0",marginRight:"0",fill:"none",stroke:"currentcolor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:1},children:e("path",{d:"M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"})}),e("span",{style:{marginLeft:"0.25rem",marginBottom:"-1px",fontSize:"14px"},children:[o??n," ",r]})]})}));F.displayName="File";const t=Object.assign(R,{Folder:b,File:F}),U=""+new URL("dropin-DO-XiDoS.png",import.meta.url).href;function p(o){const n={a:"a",code:"code",h1:"h1",h3:"h3",p:"p",pre:"pre",strong:"strong",...g(),...o.components};return t||l("FileTree",!1),t.File||l("FileTree.File",!0),t.Folder||l("FileTree.Folder",!0),e(m,{children:[e(A,{title:"Quick start"}),`
`,e(h,{children:[e(n.h1,{id:"quick-start",children:"Quick start"}),e(n.p,{children:"Use the steps below to build your first composable drop-in using this SDK."}),e(T,{children:[e(n.h3,{id:"create-your-composable-drop-in-project",children:"Create your composable drop-in project"}),e(n.p,{children:[`The first step is visiting our GitHub Enterprise drop-in project template. You
must be logged into Adobe's VPN for this link to work:
`,e(n.a,{href:"https://git.corp.adobe.com/Commerce-Storefront/my-dropin",rel:"nofollow",children:"Commerce-Storefront/my-dropin"}),"."]}),e(n.p,{children:["From the GitHub page, click the ",e(n.strong,{children:"Use this template"}),` button. You can name your
new drop-in repo whatever you want, but we recommend naming it to reflect the
drop-in you want to build. For example, if you want to build a drop-in to show a
customer's purchase history, naming your drop-in project/repo `,e(n.code,{children:"purchase-history"}),`
would be reasonable.`]}),e(n.h3,{id:"clone-your-new-project",children:"Clone your new project"}),e(n.p,{children:["Follow the standard process: Click your repo's ",e(n.strong,{children:"Code"}),` button, copy the SSH
link, open your terminal, change directories to where you want it on your
workstation, and run:`]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`git clone <your-repository-ssh-url>
`})}),e(n.h3,{id:"install-the-project-dependencies",children:"Install the project dependencies"}),e(n.p,{children:"Open your project and install dependencies with your choice of package managers."}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`yarn
npm install
pnpm install
`})}),e(n.h3,{id:"generate-the-project-config-file",children:"Generate the project config file"}),e(n.p,{children:["Before you can start developing, you need to generate the ",e(n.code,{children:".elsie.cjs"}),` config
file. The elsie CLI uses this file to generate new components, containers, and
API functions to specified directories within your projects. Run the following
command, replacing `,e(n.code,{children:"<your-dropin-name>"}),` with the name of your drop-in component.
For example, `,e(n.code,{children:"npx elsie generate config --name purchase-history"}),"."]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate config --name <your-dropin-name>
`})}),e(n.p,{children:["After generating the ",e(n.code,{children:".elsie.cjs"}),` config, open it and take a look. Below is an
annotated version describing the main properties:`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`module.exports = {
  name: 'purchase-history', // The name of your drop-in. This name can be changed at any time.
  api: {
    root: './src/api', // Directory where the CLI will add all your generated API functions.
    importAliasRoot: '@/purchase-history/api',
  },
  components: [
    {
      id: 'Components',
      root: './src/components', // Directory where the CLI will add all your generated components.
      importAliasRoot: '@/purchase-history/components',
      cssPrefix: 'dropin',
      default: true,
    },
  ],
  containers: {
    root: './src/containers', // Directory where the CLI will add all your generated containers.
    importAliasRoot: '@/purchase-history/containers',
  },
};
`})}),e(n.h3,{id:"explore-the-project-structure",children:"Explore the project structure"}),e(n.p,{children:`In future versions of the docs, we will provide a detailed explanation of each
folder and file in the project structure. For now, these are the highlights:`}),e(t,{children:[e(t.Folder,{name:".storybook",description:"— Best-practice Storybook configurations right out of the box"}),e(t.Folder,{name:"examples",defaultOpen:!0,children:e(t.Folder,{name:"html-host",defaultOpen:!0,description:"— Preconfigured HTML UI for testing your composable drop-in",children:[e(t.File,{name:"example.css"}),e(t.File,{name:"favicon.ico"}),e(t.File,{name:"index.html"}),e(t.File,{name:"styles.css"})]})}),e(t.Folder,{name:"src",defaultOpen:!0,children:[e(t.Folder,{name:"api",description:"— By default, the elsie CLI adds your API functions here"}),e(t.Folder,{name:"docs",description:"— Provides an MDX template to document your drop-in"}),e(t.Folder,{name:"i18n",description:"— Internationalization setup with starter en_US.json file"}),e(t.Folder,{name:"render"})]}),e(t.File,{name:".elsie.cjs",description:"— Configuration file for creating components, containers and functions"}),e(t.File,{name:".env.local",description:"— Preconfigured settings for a development-only mesh endpoint"}),e(t.File,{name:".eslintrc.js",description:"— Preconfigured linting"}),e(t.File,{name:".gitignore"}),e(t.File,{name:".jest.config.js",description:"— Preconfigured unit testing"}),e(t.File,{name:"package.json",description:"— Preconfigured dependencies"}),e(t.File,{name:"prettier.config.js",description:"— Preconfigured formatting"}),e(t.File,{name:"README.md",description:"— Quick instructional overview of drop-in development tasks"}),e(t.File,{name:"storybook-stories.js",description:"— A few more storybook settings"}),e(t.File,{name:"tsconfig.js",description:"— Preconfigured for TypeScript!"}),e(t.File,{name:"vite.config.mjs"})]}),e(n.h3,{id:"update-the-mesh-endpoint",children:"Update the mesh endpoint"}),e(n.p,{children:`By default, the drop-in project is configured to use a development-only mesh
endpoint. This endpoint is only available when running the project locally. To
use a different mesh endpoint, update the following file:`}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`.env.local
`})}),e(n.h3,{id:"launch-development-environment",children:"Launch development environment"}),e(n.p,{children:`Let's take it for a spin! Run the following command to launch your project's
development environment in its default state:`}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`yarn dev
npm run dev
pnpm run dev
`})}),e(n.p,{children:[`Congrats! You just launched your first composable drop-in! Actually, no... What
you're seeing is our drop-in development environment. It's a preconfigured HTML
page (`,e(n.code,{children:"examples > html-host > index.html"}),`) that loads your drop-in for testing
during development.`]}),e(M,{src:U,alt:"Drop-in development environment"}),e(n.p,{children:[`Now we're ready to start building a composable drop-in. Stop the server with
`,e(n.code,{children:"ctrl + c"})," and let's get started."]}),e(n.h3,{id:"generate-a-new-ui-component",children:"Generate a new UI Component"}),e(n.p,{children:["Start by executing the following command, replacing ",e(n.code,{children:"<MyUiComponent>"}),` with the
name of the component you want to add. For example, if you were building a
drop-in for a customer's purchase history, you might want a part of the drop-in
to show a list of date ranges to filter their product purchases. In that case,
you might generate something like this:
`,e(n.code,{children:"npx elsie generate component --pathname DateFilter"}),` to create the scaffolding
for a component called `,e(n.code,{children:"DateFilter"}),`, in which you would implement the UI
component as a list of buttons representing data-range filters that would filter
a customer's product purchases when clicked: last month, last three months, last
year, and so on.`]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate component --pathname <MyUiComponent>
`})}),e(n.p,{children:"After running this command, the drop-in CLI generates the following files:"}),e(n.pre,{children:e(n.code,{className:"language-console",children:`🆕 src/components/DateFilter/DateFilter.css created
🆕 src/components/DateFilter/DateFilter.stories.tsx created
🆕 src/components/DateFilter/DateFilter.test.tsx created
🆕 src/components/DateFilter/DateFilter.tsx created
🆕 src/components/DateFilter/index.ts created
🆕 src/components/index.ts created
~/purchase-history [main] »
`})}),e(n.p,{children:[`These files are not only generated with the appropriate names, but they are
completely preconfigured to work together as a unit. For example, the
`,e(n.code,{children:"DateFilter"})," component is automatically imported into ",e(n.code,{children:"src/components/index.ts"}),`
so you can start referencing the component throughout your project.`]}),e(n.p,{children:["And if you run ",e(n.code,{children:"npm run dev"}),` again, you'll see your new component in the
Storybook UI, configured with an example and best practices to help you get
started with Storybook.`]}),e(n.h3,{id:"generate-a-new-api-function",children:"Generate a new API Function"}),e(n.p,{children:["Start by executing the following command, replacing ",e(n.code,{children:"<myApiFunction>"}),` with the
name of the API function you want to add:`]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate api --pathname <myApiFunction>
`})}),e(n.p,{children:["For the ",e(n.code,{children:"purchase-history"}),` example drop-in, you might want to add a filter
function that handles filtering the purchase history by date-ranges, such as
`,e(n.code,{children:"filterByDateRange"}),". In this case, you would run the following command:"]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate api --pathname filterByDateRange
`})}),e(n.p,{children:["This generates a new API function in the ",e(n.code,{children:"src/api"}),` directory, preconfigured with
a test file and a default implementation. Full details about API function
development will be documented as soon as possible.`]}),e(n.h3,{id:"generate-a-drop-in-container",children:"Generate a drop-in Container"}),e(n.p,{children:["Start by executing the following command, replacing ",e(n.code,{children:"<MyDropinContainer>"}),` with
the name of the container you want to add:`]}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`npx elsie generate container --pathname <MyDropinContainer>
`})}),e(n.p,{children:["For the ",e(n.code,{children:"purchase-history"}),` example drop-in, the command used to generate its
container could be:
`,e(n.code,{children:"npx elsie generate container --pathname PurchaseHistoryContainer"}),"."]}),e(n.p,{children:["This generates a new Container in the ",e(n.code,{children:"src/containers"}),` directory, preconfigured
with a test file and a default implementation. Full details about container
development will be documented as soon as possible.`]}),e(n.h3,{id:"run-unit-tests",children:"Run unit tests"}),e(n.p,{children:`Unit tests are also preconfigured for you. Run the following command to execute
the basic default tests, and add to them as you build your frontend.`}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`yarn test
npm run test
pnpm run test
`})}),e(n.h3,{id:"build-production-bundles",children:"Build production bundles"}),e(n.p,{children:`When you're ready to deploy your frontend, run the following command to build
production bundles. Like everything else in the SDK, the basic process is
configured for you, but you can customize it as you develop.`}),e(n.pre,{children:e(n.code,{className:"language-bash",children:`yarn build
npm run build
pnpm run build
`})})]})]})]})}function O(o={}){const{wrapper:n}={...g(),...o.components};return n?e(n,{...o,children:e(p,{...o})}):p(o)}function l(o,n){throw new Error("Expected "+(n?"component":"object")+" `"+o+"` to be defined: you likely forgot to import, pass, or provide it.")}export{O as default};
//# sourceMappingURL=quick-start-t0133DRw.js.map
