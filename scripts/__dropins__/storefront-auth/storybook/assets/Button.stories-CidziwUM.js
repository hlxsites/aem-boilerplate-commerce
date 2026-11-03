import{a as h}from"./iframe-S6tzT0R4.js";import{B as f}from"./index-CeP4GC78.js";import x from"./ChevronDown-CbWtHwZj.js";import"./preload-helper-C1FmrZbK.js";import"./classes-DJBjVfEy.js";import"./Button-BEcg8EHN.js";import"./vcomponent-CPGLK6kD.js";import"./LiveRegion-CdHCrWBu.js";const w={title:"Components/UI/Button",component:f,args:{buttonText:"Click Me",variant:"primary",enableLoader:!1},argTypes:{buttonText:{control:"text",description:"Text displayed on the button."},variant:{description:"Change the button style.",table:{type:{summary:"string"},defaultValue:{summary:"primary"}},options:["primary","secondary","tertiary"],control:"radio"},enableLoader:{control:"boolean",description:"Shows loader on button if true."},onClick:{action:"clicked",defaultValue:()=>{console.info("onClick event triggered")},description:"Function called when the component is clicked. This handler can be used for executing any action upon user interaction with the clickable element."}}},n={render:T=>h(f,{...T})},e={...n,args:{buttonText:"Click Me",variant:"primary"}},r={...n,args:{...e.args,enableLoader:!0,buttonText:"Loading..."}},t={...n,args:{...e.args,variant:"secondary"}},a={...n,args:{...e.args,icon:h(x,{}),buttonText:"With Icon",variant:"secondary"}},B=["Default","WithLoader","SecondaryVariant","WithIcon"];var o,s,i;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  ...Template,
  args: {
    buttonText: 'Click Me',
    variant: 'primary'
  }
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var c,p,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    enableLoader: true,
    buttonText: 'Loading...'
  }
}`,...(d=(p=r.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var l,u,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    variant: 'secondary'
  }
}`,...(m=(u=t.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var g,y,b;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  ...Template,
  args: {
    ...Default.args,
    icon: <ChevronLeft />,
    buttonText: 'With Icon',
    variant: 'secondary'
  }
}`,...(b=(y=a.parameters)==null?void 0:y.docs)==null?void 0:b.source}}};export{e as Default,t as SecondaryVariant,a as WithIcon,r as WithLoader,B as __namedExportsOrder,w as default};
//# sourceMappingURL=Button.stories-CidziwUM.js.map
