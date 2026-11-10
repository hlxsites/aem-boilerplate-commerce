/*! Copyright 2026 Adobe
All Rights Reserved. */
import{useState as r,useEffect as d}from"@dropins/tools/preact-bundle.js";import{events as m}from"@dropins/tools/event-bus.js";const S=f=>{const[l,a]=r(null);return d(()=>{a(null);let k;const e=m.on("reviews/request",n=>{k=n.sku,a(t=>(t==null?void 0:t.sku)===n.sku?t:null)},{scope:f,eager:!0}),s=m.on("reviews/result",({request:n,result:t})=>{k!==void 0&&n.sku!==k||(k=n.sku,a(u=>t===null||t.stats===null?null:t.stats===void 0?(u==null?void 0:u.sku)===n.sku?u:null:{scope:f,sku:n.sku,stats:t.stats}))},{scope:f,eager:!0});return()=>{e==null||e.off(),s==null||s.off()}},[f]),(l==null?void 0:l.scope)===f?l==null?void 0:l.stats:void 0};export{S as u};
//# sourceMappingURL=useReviewStats.js.map
