/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as o,h as i}from"./network-error.js";import{h as u}from"./fetch-error.js";import{a as d}from"./updateCompanyUser.js";const c=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function g(a){const n={name:a.name,description:a.description,target_id:a.targetId};return await o(c,{variables:{input:n}}).then(e=>{var r,m,p;if((r=e.errors)!=null&&r.length)return u(e.errors);const t=(p=(m=e==null?void 0:e.data)==null?void 0:m.createCompanyTeam)==null?void 0:p.team;return t?{id:t.id,structureId:t.structure_id,name:t.name}:null}).catch(i)}const y=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function A(a){return await o(y,{variables:{id:a}}).then(n=>{var e,t;return(e=n.errors)!=null&&e.length?u(n.errors):!!((t=n==null?void 0:n.data)!=null&&t.deleteCompanyTeam)}).catch(i)}function s(a){return a.items.map(t=>({structureId:t.entity.structure_id,parentStructureId:t.parent_id||null,label:t.entity.__typename==="CompanyTeam"?t.entity.name||"":`${t.entity.firstname||""} ${t.entity.lastname||""}`.trim(),type:t.entity.__typename==="CompanyTeam"?"team":"user",entityId:d((t.entity.__typename==="CompanyTeam"?t.entity.companyTeamId:t.entity.customerId)||""),description:t.entity.__typename==="CompanyTeam"&&t.entity.description||null})).map(t=>{const r=t.parentStructureId||null,m=!r||r==="MA=="?null:r;return{id:t.structureId,parentId:m,label:t.label,type:t.type,entityId:t.entityId,description:t.description}})}const T=a=>{if(!a)throw new Error("Invalid response: missing team data");return{id:a.id,name:a.name,description:a.description}},l=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { companyTeamId: id structure_id name description }
            ... on Customer { customerId: id structure_id firstname lastname }
          }
        }
      }
    }
  }
`;async function $(){return await o(l,{method:"GET",cache:"no-cache"}).then(a=>{var e;if((e=a.errors)!=null&&e.length)return u(a.errors);const n=a.data.company.structure;return s(n)}).catch(i)}const _=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function M(a){return await o(_,{variables:{id:a}}).then(n=>{var t,r,m;if((t=n.errors)!=null&&t.length)return u(n.errors);const e=(m=(r=n==null?void 0:n.data)==null?void 0:r.company)==null?void 0:m.team;return e?T(e):null}).catch(i)}const C=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function S(a){const n={treeId:a.id,parentTreeId:a.parentId};return await o(C,{variables:n}).then(e=>{var t,r;return(t=e.errors)!=null&&t.length?u(e.errors):!!((r=e==null?void 0:e.data)!=null&&r.updateCompanyStructure)}).catch(i)}const I=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function w(a){const n={id:a.id,name:a.name,description:a.description};return await o(I,{variables:{input:n}}).then(e=>{var t,r,m,p;return(t=e.errors)!=null&&t.length?u(e.errors):!!((p=(m=(r=e==null?void 0:e.data)==null?void 0:r.updateCompanyTeam)==null?void 0:m.team)!=null&&p.id)}).catch(i)}export{$ as a,S as b,g as c,A as d,M as g,w as u};
//# sourceMappingURL=updateCompanyTeam.js.map
