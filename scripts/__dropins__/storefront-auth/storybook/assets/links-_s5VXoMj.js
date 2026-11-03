import{u as t,a as e,M as i,U as c,k as d}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function o(r){const n={code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...t(),...r.components};return e(d,{children:[e(i,{title:"Utilities/Links"}),`
`,e(c,{children:[e(n.h1,{id:"adding-links-using-the-route-pattern",children:"Adding Links using the route pattern"}),e(n.p,{children:["Whenever possible, avoid placing ",e(n.code,{children:"onClick"}),` handlers directly on anchor elements
(`,e(n.code,{children:"<a>"}),`) in drop-in components, such as product or category pages, as this
results in accessibility issues and broken browser behavior. Problems include:`]}),e(n.ul,{children:[`
`,e(n.li,{children:"Right-click > Open in New Tab results in blank pages."}),`
`,e(n.li,{children:"Middle-click (open in background tab) won't work as expected."}),`
`,e(n.li,{children:"Keyboard navigation and screen readers may not trigger the link correctly."}),`
`]}),e(n.p,{children:`Instead, follow the route pattern to provide composable and accessible
navigation.`}),e(n.h2,{id:"how-it-works",children:"How it works"}),e(n.p,{children:["Components accept a ",e(n.code,{children:"routeX"}),` function as a prop. The function receives a data
model (a product, for example) and returns a URL. Internally, it's used like
this:`]}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`<a href={routeProduct?.(product) ?? '#'}>...</a>
`})}),e(n.p,{children:`This lets developers customize routing logic per storefront while preserving
link semantics.`}),e(n.h2,{id:"example--component-side",children:"Example — Component-Side"}),e(n.p,{children:"In your component (a PLP item, for example):"}),e(n.p,{children:["The ",e(n.code,{children:"routeProduct"}),` prop must be optional and default to a # or an non-functional
element like a `,e(n.code,{children:"div"})," if not provided."]}),e(n.pre,{children:e(n.code,{className:"language-tsx",children:`type Props = {
  routeProduct?: (product: ProductModel) => string;
};

function ProductCard({ product, routeProduct }: Props) {
  return (
    <a href={routeProduct?.(product) ?? '#'}>
      <div>{product.name}</div>
    </a>
  );
}
`})}),e(n.h2,{id:"example--storefront-side",children:"Example — Storefront-Side"}),e(n.p,{children:["In the storefront integration (",e(n.code,{children:"commerce-cart.js"})," or ",e(n.code,{children:"commerce-plp.js"}),`, for
example):`]}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import { rootLink } from '@adobe/commerce-url-utils';

provider.render(ProductList, {
  routeProduct: (product) =>
    rootLink(\`/products/\${product.url.urlKey}/\${product.topLevelSku}\`),
});
`})})]})]})}function s(r={}){const{wrapper:n}={...t(),...r.components};return n?e(n,{...r,children:e(o,{...r})}):o(r)}export{s as default};
//# sourceMappingURL=links-_s5VXoMj.js.map
