/*! Copyright 2026 Adobe
All Rights Reserved. */
import{jsx as c}from"@dropins/tools/preact-jsx-runtime.js";import{R as p}from"./RequisitionListForm.js";import{useState as R}from"@dropins/tools/preact-hooks.js";import{R as L,t as q}from"./transform-requisition-list.js";import{h as I}from"./fetch-error.js";import{events as l}from"@dropins/tools/event-bus.js";import{f as T}from"./fetch-graphql.js";import{u as f}from"./updateRequisitionList.js";const _=`
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
${L}
`,N=async(n,o)=>T(_,{variables:{requisitionListName:n,requisitionListDescription:o}}).then(({errors:t,data:i})=>{var e;if(t)return I(t);if(!((e=i==null?void 0:i.createRequisitionList)!=null&&e.requisition_list))return null;const u=q(i.createRequisitionList.requisition_list);return l.emit("requisitionList/data",u),u});function S(n,o,t,i){const[u,e]=R(null);return{error:u,submit:async m=>{e(null);try{const r=m.description??"",s=n==="update"&&o?await f(o,m.name,r):await N(m.name,r);return s&&(t==null||t(s)),s}catch(r){const s=(r==null?void 0:r.message)||"Unexpected error";return e(s),i==null||i(s),null}}}}const d=({mode:n,requisitionListUid:o,defaultValues:t={name:"",description:""},onSuccess:i,onError:u,onCancel:e})=>{const{error:a,submit:m}=S(n,o,i,u);return c(p,{mode:n,defaultValues:t,error:a,onSubmit:async s=>{await m(s)},onCancel:e})};export{d as R};
//# sourceMappingURL=RequisitionListForm2.js.map
