/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as o}from"@dropins/tools/event-bus.js";const n=t=>{throw t instanceof DOMException&&t.name==="AbortError"||o.emit("auth/error",{source:"auth",type:"network",error:t}),t};export{n as h};
