/*! Copyright 2026 Adobe
All Rights Reserved. */
import{useState as g,useEffect as i}from"@dropins/tools/preact-bundle.js";import{e as f}from"../api.js";const u={request:null,loading:!1,error:null,accepted:null},m=(e,t)=>{const[n,s]=g(u);return i(()=>{s(u);const r=(a,l)=>f.on(`${e}/${a}`,S=>s(c=>({...c,[l]:S})),{eager:!0,scope:t}),o=[r("request","request"),r("loading","loading"),r("result","accepted"),r("error","error")];return()=>o.forEach(a=>a==null?void 0:a.off())},[e,t]),n},q=(e,t)=>e.sku===t.sku&&e.pageSize===t.pageSize&&e.currentPage===t.currentPage&&(e.withStats??!1)===(t.withStats??!1),w=e=>m("reviews",e);export{q as i,w as u};
//# sourceMappingURL=useReviewsEvents.js.map
