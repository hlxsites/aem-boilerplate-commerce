/*! Copyright 2026 Adobe
All Rights Reserved. */
import{useState as i,useEffect as S}from"@dropins/tools/preact-hooks.js";import{e as f}from"../api.js";const u={request:null,loading:!1,error:null,accepted:null},m=(e,t)=>{const[n,a]=i(u);return S(()=>{a(u);const s=(r,l)=>f.on(`${e}/${r}`,c=>a(g=>({...g,[l]:c})),{eager:!0,scope:t}),o=[s("request","request"),s("loading","loading"),s("result","accepted"),s("error","error")];return()=>o.forEach(r=>r==null?void 0:r.off())},[e,t]),n},p=(e,t)=>e.sku===t.sku&&e.pageSize===t.pageSize&&e.currentPage===t.currentPage,q=e=>m("reviews",e);export{p as i,q as u};
//# sourceMappingURL=useReviewsEvents.js.map
