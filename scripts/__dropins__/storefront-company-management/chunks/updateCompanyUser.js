/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as l,a as m}from"./network-error.js";import{i as u}from"./company-permissions.js";const d=e=>{try{return btoa(e)}catch(a){throw new Error(`Failed to encode base64: ${a}`)}},y=e=>{try{return atob(e)}catch{return e}},c=e=>{if(!e||typeof e!="string")throw new Error("User ID must be a non-empty string");return d(e)},w=e=>!e||typeof e!="string"?e:y(e),p=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function I(e){const a={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await s(p,{variables:{input:a}}).then(t=>{var n,o,i;if((n=t.errors)!=null&&n.length)return l(t.errors);const r=(i=(o=t==null?void 0:t.data)==null?void 0:o.createCompanyUser)==null?void 0:i.user;return r?{id:r.id,structureId:r.structure_id}:null}).catch(m)}const f=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,N=async e=>{var t,r;const{id:a}=e;if(!a)throw new Error("User ID is required to delete a company user");try{const n=c(a),o=await s(f,{method:"POST",cache:"no-cache",variables:{id:n}}).catch(m);return(t=o.errors)!=null&&t.length&&l(o.errors),(r=o.data)!=null&&r.deleteCompanyUserV2?{success:o.data.deleteCompanyUserV2.success}:{success:!1}}catch{return{success:!1}}},h=e=>{if(!Array.isArray(e))throw new Error("Invalid response: expected array of roles");return e.map(a=>{if(!a||typeof a.id!="string"||typeof a.name!="string")throw new Error("Invalid response: missing required role data");return{id:a.id,name:a.name}})},C=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:u(e.role)}},_=`
  query getCompanyRoles {
    company {
      roles {
        items { id name }
      }
    }
  }
`;async function v(){return await s(_,{method:"GET"}).then(e=>{var t,r,n,o;if((t=e.errors)!=null&&t.length)return l(e.errors);const a=((o=(n=(r=e==null?void 0:e.data)==null?void 0:r.company)==null?void 0:n.roles)==null?void 0:o.items)??[];return h(a)}).catch(m)}const E=`
  query getCompanyUser($id: ID!) {
    company {
      user(id: $id) {
        id
        email
        firstname
        lastname
        job_title
        telephone
        status
        role { id name }
      }
    }
  }
`;async function T(e){const a=c(e);return await s(E,{variables:{id:a}}).then(t=>{var n,o,i;if((n=t.errors)!=null&&n.length)return l(t.errors);const r=(i=(o=t==null?void 0:t.data)==null?void 0:o.company)==null?void 0:i.user;return r?C(r):null}).catch(m)}const U=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function R(e){return await s(U,{variables:{email:e}}).then(a=>{var t,r,n;return(t=a.errors)!=null&&t.length?l(a.errors):((n=(r=a==null?void 0:a.data)==null?void 0:r.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(m)}const b=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function $(e){const a={id:c(e.id),email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await s(b,{variables:{input:a}}).then(t=>{var r,n,o,i;return(r=t.errors)!=null&&r.length?l(t.errors):!!((i=(o=(n=t==null?void 0:t.data)==null?void 0:n.updateCompanyUser)==null?void 0:o.user)!=null&&i.id)}).catch(m)}export{v as a,w as b,I as c,N as d,c as e,T as g,R as i,$ as u};
//# sourceMappingURL=updateCompanyUser.js.map
