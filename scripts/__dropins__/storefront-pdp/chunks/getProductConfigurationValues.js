import{events as e}from"@dropins/tools/event-bus.js";const r=t=>{const o=n(),s=t(o);e.emit("pdp/values",{...s})},n=()=>{var t;return((t=e._lastEvent["pdp/values"])==null?void 0:t.payload)??null};export{n as g,r as s};