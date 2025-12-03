/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as u,h as i}from"./network-error.js";import{h as o}from"./fetch-error.js";const d=`
  mutation createCompanyTeam($input: CompanyTeamCreateInput!) {
    createCompanyTeam(input: $input) { __typename team { id structure_id name } }
  }
`;async function h(a){const n={name:a.name,description:a.description,target_id:a.targetId};return await u(d,{variables:{input:n}}).then(e=>{var r,m,p;if((r=e.errors)!=null&&r.length)return o(e.errors);const t=(p=(m=e==null?void 0:e.data)==null?void 0:m.createCompanyTeam)==null?void 0:p.team;return t?{id:t.id,structureId:t.structure_id,name:t.name}:null}).catch(i)}const c=`
  mutation deleteCompanyTeam($id: ID!) {
    deleteCompanyTeam(id: $id) { __typename }
  }
`;async function E(a){return await u(c,{variables:{id:a}}).then(n=>{var e,t;return(e=n.errors)!=null&&e.length?o(n.errors):!!((t=n==null?void 0:n.data)!=null&&t.deleteCompanyTeam)}).catch(i)}function y(a){return a.items.filter(t=>t.entity.__typename==="Customer"&&"status"in t.entity?t.entity.status==="ACTIVE":!0).map(t=>({structureId:t.entity.structure_id,parentStructureId:t.parent_id||null,label:t.entity.__typename==="CompanyTeam"?t.entity.name||"":`${t.entity.firstname||""} ${t.entity.lastname||""}`.trim(),type:t.entity.__typename==="CompanyTeam"?"team":"user",entityId:(t.entity.__typename==="CompanyTeam"?t.entity.companyTeamId:t.entity.customerId)||"",description:t.entity.__typename==="CompanyTeam"&&t.entity.description||null})).map(t=>{const r=t.parentStructureId||null,m=!r||r==="MA=="?null:r;return{id:t.structureId,parentId:m,label:t.label,type:t.type,entityId:t.entityId,description:t.description}})}const s=a=>{if(!a)throw new Error("Invalid response: missing team data");return{id:a.id,name:a.name,description:a.description}},T=`
  query getCompanyStructure {
    company {
      structure {
        items {
          id
          parent_id
          entity {
            __typename
            ... on CompanyTeam { companyTeamId: id structure_id name description }
            ... on Customer { customerId: id structure_id firstname lastname status }
          }
        }
      }
    }
  }
`;async function A(){return await u(T,{method:"GET",cache:"no-cache"}).then(a=>{var e;if((e=a.errors)!=null&&e.length)return o(a.errors);const n=a.data.company.structure;return y(n)}).catch(i)}const _=`
  query getCompanyTeam($id: ID!) {
    company { team(id: $id) { id name description } }
  }
`;async function g(a){return await u(_,{variables:{id:a}}).then(n=>{var t,r,m;if((t=n.errors)!=null&&t.length)return o(n.errors);const e=(m=(r=n==null?void 0:n.data)==null?void 0:r.company)==null?void 0:m.team;return e?s(e):null}).catch(i)}const l=`
  mutation updateCompanyStructure($treeId: ID!, $parentTreeId: ID!) {
    updateCompanyStructure(input: { tree_id: $treeId, parent_tree_id: $parentTreeId }) {
      __typename
    }
  }
`;async function $(a){const n={treeId:a.id,parentTreeId:a.parentId};return await u(l,{variables:n}).then(e=>{var t,r;return(t=e.errors)!=null&&t.length?o(e.errors):!!((r=e==null?void 0:e.data)!=null&&r.updateCompanyStructure)}).catch(i)}const C=`
  mutation updateCompanyTeam($input: CompanyTeamUpdateInput!) {
    updateCompanyTeam(input: $input) { __typename team { id name } }
  }
`;async function M(a){const n={id:a.id,name:a.name,description:a.description};return await u(C,{variables:{input:n}}).then(e=>{var t,r,m,p;return(t=e.errors)!=null&&t.length?o(e.errors):!!((p=(m=(r=e==null?void 0:e.data)==null?void 0:r.updateCompanyTeam)==null?void 0:m.team)!=null&&p.id)}).catch(i)}export{A as a,$ as b,h as c,E as d,g,M as u};
//# sourceMappingURL=updateCompanyTeam.js.map
