import{jsx as $,Fragment as M,jsxs as _}from"@dropins/tools/preact-jsx-runtime.js";import{useRef as y,useState as C,useCallback as q,useEffect as D}from"@dropins/tools/preact-hooks.js";import{useText as A}from"@dropins/tools/i18n.js";import*as T from"@dropins/tools/preact-compat.js";import{memo as V,useCallback as w}from"@dropins/tools/preact-compat.js";import{classes as k}from"@dropins/tools/lib.js";import{Field as v,Picker as I,Input as R,InputDate as O,Checkbox as N,TextArea as S}from"@dropins/tools/components.js";const j=t=>T.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t},T.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M11.8052 14.4968C10.8552 14.4968 9.9752 14.0268 9.4452 13.2368L9.4152 13.1868L9.3852 13.1268C8.1352 11.2268 7.5352 8.96681 7.6852 6.68681C7.7552 4.42681 9.6052 2.61681 11.8652 2.60681H12.0052C14.2752 2.47681 16.2152 4.21681 16.3452 6.47681C16.3452 6.55681 16.3452 6.62681 16.3452 6.70681C16.4852 8.94681 15.9052 11.1768 14.6852 13.0568L14.6052 13.1768C14.0552 13.9868 13.1352 14.4668 12.1652 14.4768H12.0052C11.9352 14.4768 11.8652 14.4868 11.7952 14.4868L11.8052 14.4968Z",stroke:"currentColor"}),T.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M4.3252 21.5469C4.3552 20.4169 4.4752 19.2869 4.6752 18.1769C4.8952 17.1669 6.4752 16.0269 8.9052 15.1569C9.2352 15.0369 9.4852 14.7869 9.5952 14.4569L9.8052 14.0269",stroke:"currentColor"}),T.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M14.425 14.4069L14.165 14.1569C14.375 14.5969 14.725 14.9569 15.155 15.1869C16.945 15.7969 19.125 16.9569 19.375 18.2069C19.585 19.3069 19.685 20.4269 19.675 21.5369",stroke:"currentColor"})),H=t=>t.reduce((h,{code:i,required:o,defaultValue:d})=>(o&&(h[i]=d),h),{}),P=({fieldsConfig:t,onSubmit:h})=>{const{requiredFieldError:i}=A({requiredFieldError:"Order.Form.notifications.requiredFieldError"}),o=y(null),[d,c]=C({}),[u,l]=C({}),f=q(()=>{c({})},[]);D(()=>{const e=()=>{o.current&&o.current.reset()};return window.addEventListener("popstate",e),()=>{window.removeEventListener("popstate",e)}},[]),D(()=>{if(f(),!t||!t.length)return;const e=H(t);c(e)},[t==null?void 0:t.length]);const p=q((e,r)=>{const a=t.find(n=>n.code===e);return a!=null&&a.required&&!r?i:""},[t,i]),x=q(e=>{const{name:r,value:a,type:s,checked:n}=e==null?void 0:e.target,E=s==="checkbox"?n:a;c(b=>({...b,[r]:E}))},[]),F=q(e=>{const{name:r,value:a,type:s,checked:n}=e==null?void 0:e.target,E=s==="checkbox"?n:a;l(b=>({...b,[r]:p(r,E)}))},[p]),L=q(e=>{e.preventDefault();let r=!0,a={},s=null;for(const[n,E]of Object.entries(d)){const b=p(n,E);b&&(a[n]=b,r=!1,s||(s=n))}if(l(a),s&&o.current){const n=o.current.elements.namedItem(s);n==null||n.focus()}h==null||h(e,r,f)},[d,p,f,h]);return{formData:d,errors:u,formRef:o,handleChange:x,handleBlur:F,handleSubmit:L}},U=V(({loading:t,values:h,fields:i=[],errors:o,className:d="",onChange:c,onBlur:u})=>{const l=`${d}__item`,f=w((e,r,a)=>{const s=e.options.map(n=>({text:n.label,value:n.value}));return $(v,{error:a,className:k([l,`${l}--${e.id}`,[`${l}--${e.id}-hidden`,e.is_hidden],e.className]),"data-testid":`${d}--${e.id}`,disabled:t,children:$(I,{name:e.id,floatingLabel:`${e.label} ${e.required?"*":""}`,placeholder:e.label,"aria-label":e.label,options:s,onBlur:u,handleSelect:c,value:r||e.defaultValue})},e.id)},[d,t,l,u,c]),p=w((e,r,a)=>{const s=e.id==="email",n=s?$(j,{}):void 0,E=s?"username":"";return $(v,{error:a,className:k([l,`${l}--${e.id}`,[`${l}--${e.id}-hidden`,e==null?void 0:e.is_hidden],e.className]),"data-testid":`${d}--${e.id}`,disabled:t,children:$(R,{"aria-label":e.label,"aria-required":e.required,autoComplete:E,icon:n,type:"text",name:e.id,value:r||e.defaultValue,placeholder:e.label,floatingLabel:`${e.label} ${e.required?"*":""}`,onBlur:u,onChange:c})},e.id)},[d,t,l,u,c]),x=w((e,r,a)=>$(v,{error:a,className:k([l,`${l}--${e.id}`,[`${l}--${e.id}-hidden`,e.is_hidden],e.className]),"data-testid":`${d}--${e.id}`,disabled:t,children:$(O,{type:"text",name:e.id,value:r||e.defaultValue,placeholder:e.label,floatingLabel:`${e.label} ${e.required?"*":""}`,onBlur:u,onChange:c})},e.id),[d,t,l,u,c]),F=w((e,r,a)=>$(v,{error:a,className:k([l,`${l}--${e.id}`,[`${l}--${e.id}-hidden`,e.is_hidden],e.className]),"data-testid":`${d}--${e.id}`,disabled:t,children:$(N,{name:e.id,checked:r||e.defaultValue,placeholder:e.label,label:`${e.label} ${e.required?"*":""}`,onBlur:u,onChange:c})},e.id),[d,t,l,u,c]),L=w((e,r,a)=>$(v,{error:a,className:k([l,`${l}--${e.id}`,[`${l}--${e.id}-hidden`,e.is_hidden],e.className]),"data-testid":`${d}--${e.id}`,disabled:t,children:$(S,{type:"text",name:e.id,value:r===void 0?e.defaultValue:r,label:`${e.label} ${e.required?"*":""}`,onBlur:u,onChange:c})},e.id),[d,t,l,u,c]);return i.length?$(M,{children:i.map(e=>{var s;const r=(o==null?void 0:o[e.id])??"",a=(h==null?void 0:h[e.id])??"";switch(e.fieldType){case"TEXT":return(s=e==null?void 0:e.options)!=null&&s.length?f(e,a,r):p(e,a,r);case"MULTILINE":return p(e,a,r);case"SELECT":return f(e,a,r);case"DATE":return x(e,a,r);case"BOOLEAN":return F(e,a,r);case"TEXTAREA":return L(e,a,r);default:return null}})}):null}),Q=V(({name:t,loading:h,children:i,className:o="defaultForm",fieldsConfig:d,key:c,onSubmit:u})=>{const{formData:l,errors:f,formRef:p,handleChange:x,handleBlur:F,handleSubmit:L}=P({fieldsConfig:d,onSubmit:u});return _("form",{className:k(["dropin-form",o]),onSubmit:L,name:t,ref:p,children:[$(U,{className:o,loading:h,fields:d,onChange:x,onBlur:F,errors:f,values:l}),i]},c)});export{Q as F};