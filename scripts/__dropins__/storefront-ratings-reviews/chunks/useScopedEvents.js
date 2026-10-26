/*! Copyright 2026 Adobe
All Rights Reserved. */
import{useState as d,useEffect as g}from"@dropins/tools/preact-hooks.js";import{e as m}from"../api.js";const s={request:null,loading:!1,error:null,accepted:null},q=(r,o)=>{const[n,a]=d(s);return g(()=>{a(s);const t=(e,u)=>m.on(`${r}/${e}`,f=>a(c=>({...c,[u]:f})),{eager:!0,scope:o}),l=[t("request","request"),t("loading","loading"),t("result","accepted"),t("error","error")];return()=>l.forEach(e=>e==null?void 0:e.off())},[r,o]),n};export{q as u};
//# sourceMappingURL=useScopedEvents.js.map
