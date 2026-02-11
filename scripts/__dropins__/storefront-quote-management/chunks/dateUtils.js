/*! Copyright 2026 Adobe
All Rights Reserved. */
import{getGlobalLocale as c}from"@dropins/tools/lib.js";function l(){try{return Intl.DateTimeFormat().resolvedOptions().timeZone}catch(e){return console.warn("Failed to detect user timezone, falling back to UTC:",e),"UTC"}}function m(e){const r=new Date(e);return!isNaN(r.getTime())}function s(e,r="short"){if(!m(e))return"–";const n=c()||"en-US";let t;if(/^\d{4}-\d{2}-\d{2}$/.test(e)){const[o,a,i]=e.split("-").map(Number);t=new Date(o,a-1,i)}else t=new Date(e);return r==="short"?t.toLocaleDateString(n,{year:"numeric",month:"numeric",day:"numeric"}):t.toLocaleDateString(n,{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}export{s as f,l as g};
//# sourceMappingURL=dateUtils.js.map
