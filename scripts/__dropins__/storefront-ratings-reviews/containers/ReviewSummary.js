/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as a}from"@dropins/tools/preact-bundle.js";import{useState as s,useEffect as f}from"@dropins/tools/preact-bundle.js";import{events as n}from"@dropins/tools/event-bus.js";import{u}from"../chunks/useReviewStats.js";import{a as l}from"../chunks/components.js";import"@dropins/tools/lib.js";import"@dropins/tools/i18n.js";import"@dropins/tools/components.js";const p=({scope:e,...i})=>{const t=u(e),[m,o]=s(!1);return f(()=>{o(!1);const r=n.on("reviews/loading",o,{scope:e,eager:!0});return()=>{r==null||r.off()}},[e]),!t&&!m?null:a("div",{...i,children:a(l,{stats:t,loading:m})})};p.displayName="ReviewSummary";export{p as ReviewSummary,p as default};
//# sourceMappingURL=ReviewSummary.js.map
