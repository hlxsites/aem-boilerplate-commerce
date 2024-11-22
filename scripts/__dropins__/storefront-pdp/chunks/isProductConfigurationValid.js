/*! Copyright 2024 Adobe
All Rights Reserved. */
import{events as n}from"@dropins/tools/event-bus.js";import"@dropins/tools/lib.js";const d=t=>{const o=a(),i=t(o);o!==i&&n.emit("pdp/valid",i)},a=()=>{var t;return((t=n._lastEvent["pdp/valid"])==null?void 0:t.payload)??null};export{a as i,d as s};
