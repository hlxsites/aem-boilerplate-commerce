/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as r}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const d=(a,e)=>{const c=s({scope:e==null?void 0:e.scope}),u=a(c);r.emit("pdp/values",{...u},{scope:e==null?void 0:e.scope})},s=({scope:a}={})=>r.lastPayload("pdp/values",{scope:a})??null;export{s as g,d as s};
//# sourceMappingURL=getProductConfigurationValues.js.map
