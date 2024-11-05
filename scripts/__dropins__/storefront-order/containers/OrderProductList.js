import{jsx as s,jsxs as E,Fragment as w}from"@dropins/tools/preact-jsx-runtime.js";import{Card as X,Header as Y,Price as g,CartItem as D,Icon as T,Image as K}from"@dropins/tools/components.js";import"../chunks/OrderCancelReasonsForm.js";import{classes as C}from"@dropins/tools/lib.js";import{useState as N,useEffect as A,useMemo as I,useCallback as p}from"@dropins/tools/preact-hooks.js";import{events as ee}from"@dropins/tools/event-bus.js";import{s as te}from"../chunks/setTaxStatus.js";import{g as ne}from"../chunks/getStoreConfig.js";import*as c from"@dropins/tools/preact-compat.js";import{Fragment as le}from"@dropins/tools/preact.js";import{O as se}from"../chunks/OrderLoaders.js";import{useText as ae}from"@dropins/tools/i18n.js";import"../chunks/fetch-graphql.js";import"@dropins/tools/fetch-graphql.js";const ie=O=>c.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...O},c.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z",stroke:"currentColor"}),c.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M11.75 5.88423V4.75H12.25V5.88423L12.0485 13.0713H11.9515L11.75 5.88423ZM11.7994 18.25V16.9868H12.2253V18.25H11.7994Z",stroke:"currentColor"})),me=({orderData:O})=>{const[e,a]=N(!0),[k,o]=N(O),[d,r]=N({taxIncluded:!1,taxExcluded:!1});return A(()=>{ne().then(m=>{m&&r(te(m==null?void 0:m.shoppingCartDisplayPrice))}).finally(()=>{a(!1)})},[]),A(()=>{const m=ee.on("order/data",u=>{o(u)},{eager:!0});return()=>{m==null||m.off()}},[]),{loading:e,taxConfig:d,order:k}},re=({loading:O,taxConfig:e,order:a=null,withHeader:k=!0,showConfigurableOptions:o,routeProductDetails:d})=>{const r=!!(a!=null&&a.returnNumber),m=a==null?void 0:a.returnNumber,u=ae({cancelled:"Order.OrderProductListContent.cancelledTitle",allOrders:"Order.OrderProductListContent.allOrdersTitle",returned:"Order.OrderProductListContent.returnedTitle",refunded:"Order.OrderProductListContent.refundedTitle",sender:"Order.OrderProductListContent.GiftCard.sender",recipient:"Order.OrderProductListContent.GiftCard.recipient",message:"Order.OrderProductListContent.GiftCard.message",outOfStock:"Order.OrderProductListContent.stockStatus.outOfStock",downloadableCount:"Order.OrderProductListContent.downloadableCount"}),h=I(()=>{if(!a)return[];const i=r?a.returns.find(f=>f.returnNumber===m):a,v=(i==null?void 0:i.items)??[];return[{type:"returned",list:r?v:v.filter(f=>f.quantityReturned),title:u.returned},{type:"cancelled",list:v.filter(f=>f.quantityCanceled&&!r),title:u.cancelled},{type:"",list:v.filter(f=>!f.quantityCanceled&&!r),title:u.allOrders}]},[a,r,u]);return a?h.every(i=>i.list.length===0)?null:s(X,{variant:"secondary",className:"order-order-product-list-content",children:h.filter(i=>i.list.length).map((i,v)=>{var f;return E(le,{children:[k?s(Y,{title:`${i.title} (${i.list.length})`}):null,s("ul",{className:"order-order-product-list-content__items",children:(f=i.list)==null?void 0:f.map(t=>s("li",{"data-testid":"order-product-list-content-item",children:s(he,{loading:O,product:t,itemType:i.type,taxConfig:e,translations:u,showConfigurableOptions:o,routeProductDetails:d})},t.id))})]},v)})}):s(se,{})},he=({loading:O,product:e,itemType:a,taxConfig:k,translations:o,showConfigurableOptions:d,routeProductDetails:r})=>{var _,x,Q,H,V,$,q,M,P,F,G,R,Z,j,z,W,B;const{taxExcluded:m,taxIncluded:u}=k,h=p((b,J,U)=>s(g,{amount:b,currency:J,weight:"normal",...U}),[]);let i={};const v=a==="cancelled",f=(x=(_=e==null?void 0:e.product)==null?void 0:_.stockStatus)==null?void 0:x.includes("IN_STOCK"),t=(e==null?void 0:e.giftCard)||{},n=(Q=e==null?void 0:e.itemPrices)==null?void 0:Q.priceIncludingTax,l=(H=e==null?void 0:e.itemPrices)==null?void 0:H.originalPrice,y=(V=e==null?void 0:e.itemPrices)==null?void 0:V.price,L=e.discounted&&(($=e.price)==null?void 0:$.value)!==(l==null?void 0:l.value)*(e==null?void 0:e.totalQuantity),S={..."configurableOptions"in e?e.configurableOptions:{},..."bundleOptions"in e?e.bundleOptions:{},..."senderName"in t&&(t!=null&&t.senderName)?{[o.sender]:t==null?void 0:t.senderName}:{},..."senderEmail"in t&&(t!=null&&t.senderEmail)?{[o.sender]:t==null?void 0:t.senderEmail}:{},..."recipientName"in t&&(t!=null&&t.recipientName)?{[o.recipient]:t==null?void 0:t.recipientName}:{},..."recipientEmail"in t&&(t!=null&&t.recipientEmail)?{[o.recipient]:t==null?void 0:t.recipientEmail}:{},..."message"in t&&(t!=null&&t.message)?{[o.message]:t==null?void 0:t.message}:{},..."downloadableLinks"in e&&(e!=null&&e.downloadableLinks)?{[`${(q=e==null?void 0:e.downloadableLinks)==null?void 0:q.count} ${o.downloadableCount}`]:(M=e==null?void 0:e.downloadableLinks)==null?void 0:M.result}:{}};if(u&&m){const b=L?l==null?void 0:l.value:(n==null?void 0:n.value)*(e==null?void 0:e.totalQuantity);i={taxExcluded:!0,taxIncluded:void 0,price:h(l==null?void 0:l.value,l==null?void 0:l.currency),total:E(w,{children:[h(b,l==null?void 0:l.currency,{variant:e.discounted&&(n==null?void 0:n.value)!==b?"strikethrough":"default"}),e.discounted&&(n==null?void 0:n.value)!==b?h(n==null?void 0:n.value,n==null?void 0:n.currency,{sale:!0,weight:"bold"}):null]}),totalExcludingTax:h((y==null?void 0:y.value)*e.totalQuantity,y==null?void 0:y.currency)}}else if(!u&&m)i={taxExcluded:void 0,taxIncluded:void 0,price:h(l==null?void 0:l.value,l==null?void 0:l.currency),total:E(w,{children:[h((l==null?void 0:l.value)*(e==null?void 0:e.totalQuantity),n==null?void 0:n.currency,{variant:L?"strikethrough":"default"}),L?h((P=e.price)==null?void 0:P.value,(F=e.price)==null?void 0:F.currency,{sale:!0,weight:"bold"}):null]}),totalExcludingTax:h((y==null?void 0:y.value)*(e==null?void 0:e.totalQuantity),y==null?void 0:y.currency)};else if(u&&!m){const b=L?l.value:n.value*e.totalQuantity;i={taxExcluded:void 0,taxIncluded:!0,price:h(n==null?void 0:n.value,n==null?void 0:n.currency),total:E(w,{children:[h(b,n==null?void 0:n.currency,{variant:L?"strikethrough":"default",weight:"bold"}),L?h(n==null?void 0:n.value,n==null?void 0:n.currency,{sale:!0,weight:"bold"}):null]})}}return s(D,{loading:O,alert:v&&f?E("span",{children:[s(T,{source:ie}),o.outOfStock]}):s(w,{}),configurations:(d==null?void 0:d(S))??S,title:r?s("a",{"data-testid":"product-name",className:C(["cart-summary-item__title",["cart-summary-item__title--strikethrough",v]]),href:r(e),children:(G=e==null?void 0:e.product)==null?void 0:G.name}):s("div",{"data-testid":"product-name",className:C(["cart-summary-item__title",["cart-summary-item__title--strikethrough",v]]),children:(R=e==null?void 0:e.product)==null?void 0:R.name}),sku:s("div",{children:(Z=e==null?void 0:e.product)==null?void 0:Z.sku}),quantity:e.totalQuantity,image:r?s("a",{href:r(e),children:s(K,{src:(j=e==null?void 0:e.product)==null?void 0:j.thumbnail.url,alt:(z=e==null?void 0:e.product)==null?void 0:z.thumbnail.label,loading:"lazy",width:"90",height:"120"})}):s(K,{src:(W=e==null?void 0:e.product)==null?void 0:W.thumbnail.url,alt:(B=e==null?void 0:e.product)==null?void 0:B.thumbnail.label,loading:"lazy",width:"90",height:"120"}),...i})},ce=({className:O,orderData:e,withHeader:a,showConfigurableOptions:k,routeProductDetails:o})=>{const{loading:d,taxConfig:r,order:m}=me({orderData:e});return s("div",{className:C(["order-order-product-list",O]),children:s(re,{loading:d,taxConfig:r,order:m,withHeader:a,showConfigurableOptions:k,routeProductDetails:o})})};export{ce as OrderProductList,ce as default};