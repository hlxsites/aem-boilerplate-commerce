/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as r}from"@dropins/tools/event-bus.js";const n=o=>{throw o instanceof DOMException&&o.name==="AbortError"||r.emit("error",{source:"company",type:"network",error:o}),o};export{n as h};
//# sourceMappingURL=network-error.js.map
