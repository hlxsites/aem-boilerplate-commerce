import{a as o}from"./iframe-S6tzT0R4.js";import{F as n,a as s}from"./index-C0CfCy4U.js";import{B as m}from"./Button-BEcg8EHN.js";import"./preload-helper-C1FmrZbK.js";import"./TextArea-_rUVe4Co.js";import"./classes-DJBjVfEy.js";import"./Field-BPKI_3I6.js";import"./vcomponent-CPGLK6kD.js";import"./Checkbox-DUhty9gS.js";import"./Check-uca-M4pd.js";import"./Icon-B6ZLXBks.js";import"./InputDate-CcrMb2sj.js";import"./Date-MQK329_v.js";import"./Input-B22QWPd2.js";import"./CheckWithCircle-DkKrhwoL.js";import"./WarningWithCircle-C5Bz53cj.js";import"./debounce-jJhiP1Vj.js";import"./Picker-DkSO39j8.js";import"./ChevronDown-CbWtHwZj.js";import"./LiveRegion-CdHCrWBu.js";const X={title:"Components/Form",component:s,parameters:{layout:"fullscreen"},args:{name:"formName",loading:!1,className:"defaultForm",fieldsConfig:[],forwardFormRef:null,formSlot:{name:"Form",dataTestId:"form"}},argTypes:{forwardFormRef:{control:"object",description:"It allows retrieving data from the form and triggering validation."},name:{control:"text",description:"Unique name for the form."},loading:{control:"boolean",description:"Indicates if the form is loading."},className:{control:"text",description:"CSS class for form styling."},fieldsConfig:{control:"array",description:"Configuration for form fields."},onSubmit:{action:"clicked",defaultValue:()=>{console.info("onSubmit")},description:"Function called when the form is submitted. Use this to handle form submission events, such as sending data to a server."}}},l=[{id:"firstName",default_value:"",entity_type:"CUSTOMER",className:"",fieldType:"TEXT",label:"First Name",options:[]},{id:"lastName",default_value:"",entity_type:"CUSTOMER",className:"",fieldType:"TEXT",label:"Last Name",options:[]},{fieldType:"BOOLEAN",id:"acceptTerms",label:"Accept Terms"},{fieldType:"TEXTAREA",id:"bio",label:"Biography",className:""}],d={render:t=>o("div",{style:{margin:"40px auto",maxWidth:"1200px"},children:o(s,{...t,fieldsConfig:l,children:o(m,{type:"submit",variant:"primary",style:{marginRight:"auto"},disabled:t.loading,children:"Create account"})})})},e={...d,args:{fieldsConfig:[{id:"company",className:"",fieldType:n.TEXT,label:"Company",options:[],orderNumber:30,customUpperCode:"TEST",validateRules:[]}]}},w=["DefaultForm"];var i,r,a;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  ...Template,
  args: {
    fieldsConfig: [{
      id: 'company',
      className: '',
      fieldType: FieldEnumList.TEXT,
      label: 'Company',
      options: [],
      orderNumber: 30,
      customUpperCode: 'TEST',
      validateRules: []
    }]
  }
}`,...(a=(r=e.parameters)==null?void 0:r.docs)==null?void 0:a.source}}};export{e as DefaultForm,w as __namedExportsOrder,X as default};
//# sourceMappingURL=Form.stories-k1E6CLs7.js.map
