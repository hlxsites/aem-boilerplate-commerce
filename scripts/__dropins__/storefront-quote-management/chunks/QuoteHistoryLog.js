/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as o}from"@dropins/tools/preact-jsx-runtime.js";import{useState as i,useEffect as m}from"@dropins/tools/preact-compat.js";import{events as n}from"@dropins/tools/event-bus.js";import{i as f}from"./components.js";const g=({quoteData:r,...s})=>{const[e,a]=i(r);return m(()=>{const t=n.on("quote-management/quote-data",u=>{a(u.quote)},{eager:!0});return()=>t==null?void 0:t.off()},[]),e?o("div",{...s,children:o(f,{history:e.history,items:e.items,buyer:e.buyer,salesRepName:e.salesRepName})}):null};export{g as Q};
//# sourceMappingURL=QuoteHistoryLog.js.map
