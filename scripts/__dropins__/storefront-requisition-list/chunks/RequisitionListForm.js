/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as R,jsx as a}from"@dropins/tools/preact-jsx-runtime.js";import{useState as L}from"@dropins/tools/preact-hooks.js";import{InLineAlert as O,Field as f,Input as C,TextArea as M,Button as h}from"@dropins/tools/components.js";import{classes as _}from"@dropins/tools/lib.js";import{useText as Q}from"@dropins/tools/i18n.js";import{R as b,f as S,h as N,t as g}from"./transform-requisition-list.js";const x=({className:n,mode:s,defaultValues:e={name:"",description:""},error:i=null,onSubmit:l,onCancel:u,...d})=>{const[t,r]=L(e),[c,F]=L(!1),[m,T]=L(!1),o=Q({actionCancel:"RequisitionList.RequisitionListForm.actionCancel",actionSave:"RequisitionList.RequisitionListForm.actionSave",requiredField:"RequisitionList.RequisitionListForm.requiredField",floatingLabel:"RequisitionList.RequisitionListForm.floatingLabel",placeholder:"RequisitionList.RequisitionListForm.placeholder",label:"RequisitionList.RequisitionListForm.label",editTitle:"RequisitionList.RequisitionListForm.editTitle",createTitle:"RequisitionList.RequisitionListForm.createTitle"}),I=p=>q=>{const A=q.target;r($=>({...$,[p]:A.value}))},U=async p=>{var q;if(p.preventDefault(),!(!t.name||m)){T(!0);try{await l({name:t.name.trim(),description:((q=t.description)==null?void 0:q.trim())||void 0})}finally{T(!1)}}},v=()=>F(!0),y=c&&!t.name.trim()?o.requiredField:"",E=s==="edit"?o.editTitle:o.createTitle;return R("div",{...d,className:_(["requisition-list-form",n]),children:[a("div",{className:"requisition-list-form__title",children:E}),i?a(O,{type:"error",className:"requisition-list-form__notification",variant:"secondary",heading:i,"data-testid":"requisition-list-alert"}):null,R("form",{className:_(["requisition-list-form__form",n]),onSubmit:U,children:[a(f,{error:y,disabled:m,children:a(C,{id:"requisition-list-form-name",name:"name",type:"text",floatingLabel:o.floatingLabel,placeholder:o.placeholder,required:!0,value:t.name,onChange:I("name"),onBlur:v})}),a(f,{disabled:m,children:a(M,{id:"requisition-list-form-description",name:"description",label:o.label,placeholder:o.label,value:t.description,onChange:I("description")})}),R("div",{className:"requisition-list-form__actions",children:[a(h,{type:"button",variant:"secondary",onClick:u,disabled:m,"data-testid":"requisition-list-form-cancel",children:o.actionCancel}),a(h,{type:"submit",disabled:m,"data-testid":"requisition-list-form-save",children:o.actionSave})]})]})]})},D=`
  mutation CREATE_REQUISITION_LIST_MUTATION(
      $requisitionListName: String!,
      $requisitionListDescription: String,
    ) {
    createRequisitionList(
      input: {
        name: $requisitionListName
        description: $requisitionListDescription
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${b}
`,B=async(n,s)=>S(D,{variables:{requisitionListName:n,requisitionListDescription:s}}).then(({errors:e,data:i})=>e?N(e):g(i.createRequisitionList.requisition_list)),w=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!, 
      $description: String,
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${b}
`,G=async(n,s,e)=>S(w,{variables:{requisitionListUid:n,name:s,description:e}}).then(({errors:i,data:l})=>i?N(i):g(l.updateRequisitionList.requisition_list));function j(n,s,e,i){const[l,u]=L(null);return{error:l,submit:async t=>{u(null);try{const r=n==="edit"&&s?await G(s,t.name,t.description):await B(t.name,t.description);return r&&(e==null||e(r)),r}catch(r){const c=(r==null?void 0:r.message)||"Unexpected error";return u(c),i==null||i(c),null}}}}const K=({mode:n,requisitionListUid:s,defaultValues:e={name:"",description:""},onSuccess:i,onError:l,onCancel:u})=>{const{error:d,submit:t}=j(n,s,i,l);return a(x,{mode:n,defaultValues:e,error:d,onSubmit:async c=>{await t(c)},onCancel:u})};export{K as R};
//# sourceMappingURL=RequisitionListForm.js.map
