/*! Copyright 2026 Adobe
All Rights Reserved. */
const n={authenticated:!1,config:void 0,isCompanyUser:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},s=new Proxy(n,{set(i,e,t){return Reflect.set(i,e,t)},get(i,e){return i[e]}}),o=i=>{s.requisitionLists=i,s.requisitionListsVersion++},r=i=>{s.requisitionLists.some(t=>t.uid===i.uid)?s.requisitionLists=s.requisitionLists.map(t=>t.uid===i.uid?i:t):s.requisitionLists=[...s.requisitionLists,i],s.requisitionListsVersion++},u=()=>s.requisitionLists,a=i=>{s.requisitionListsLoading=i};export{a,o as b,u as g,s,r as u};
//# sourceMappingURL=state.js.map
