/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as r}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const u=(a,e)=>{const c=l({scope:e==null?void 0:e.scope}),d=a(c);r.emit("pdp/valid",d,{scope:e==null?void 0:e.scope})},l=({scope:a}={})=>r.lastPayload("pdp/valid",{scope:a})??null;export{l as i,u as s};
//# sourceMappingURL=isProductConfigurationValid.js.map
