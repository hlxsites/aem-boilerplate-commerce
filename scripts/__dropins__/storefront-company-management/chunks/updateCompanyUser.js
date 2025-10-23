/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as s,h as l,c as m}from"./network-error.js";import{i as p}from"./company-permissions.js";const y=e=>{try{return btoa(e)}catch(t){throw new Error(`Failed to encode base64: ${t}`)}},f=e=>{try{return atob(e)}catch{return e}},c=e=>{if(!e||typeof e!="string")throw new Error("User ID must be a non-empty string");return y(e)},v=e=>!e||typeof e!="string"?e:f(e),h=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function N(e){const t={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await s(h,{variables:{input:t}}).then(a=>{var n,o,i;if((n=a.errors)!=null&&n.length)return l(a.errors);const r=(i=(o=a==null?void 0:a.data)==null?void 0:o.createCompanyUser)==null?void 0:i.user;return r?{id:r.id,structureId:r.structure_id}:null}).catch(m)}const _=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,$=async e=>{var n,o;const{id:t}=e;if(!t)throw new Error("User ID is required to delete a company user");const a=c(t),r=await s(_,{method:"POST",cache:"no-cache",variables:{id:a}}).catch(m);return(n=r.errors)!=null&&n.length&&l(r.errors),(o=r.data)!=null&&o.deleteCompanyUserV2?{success:r.data.deleteCompanyUserV2.success}:{success:!1}},C=e=>{if(!Array.isArray(e))throw new Error("Invalid response: expected array of roles");return e.map(t=>{if(!t||typeof t.id!="string"||typeof t.name!="string")throw new Error("Invalid response: missing required role data");return{id:t.id,name:t.name}})},g=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:p(e.role)}},E=`
  query getCompanyRoles($pageSize: Int, $currentPage: Int) {
    company {
      roles(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          id
          name
        }
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
`;async function S(e={}){const{pageSize:t=20,currentPage:a=1}=e;return await s(E,{method:"GET",variables:{pageSize:t,currentPage:a}}).then(r=>{var o,i,u,d;if((o=r.errors)!=null&&o.length)return l(r.errors);const n=((d=(u=(i=r==null?void 0:r.data)==null?void 0:i.company)==null?void 0:u.roles)==null?void 0:d.items)??[];return C(n)}).catch(m)}const U=`
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
`;async function P(e){const t=c(e);return await s(U,{variables:{id:t}}).then(a=>{var n,o,i;if((n=a.errors)!=null&&n.length)return l(a.errors);const r=(i=(o=a==null?void 0:a.data)==null?void 0:o.company)==null?void 0:i.user;return r?g(r):null}).catch(m)}const b=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function T(e){return await s(b,{variables:{email:e}}).then(t=>{var a,r,n;return(a=t.errors)!=null&&a.length?l(t.errors):((n=(r=t==null?void 0:t.data)==null?void 0:r.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(m)}const A=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function R(e){const t={id:c(e.id),email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await s(A,{variables:{input:t}}).then(a=>{var r,n,o,i;return(r=a.errors)!=null&&r.length?l(a.errors):!!((i=(o=(n=a==null?void 0:a.data)==null?void 0:n.updateCompanyUser)==null?void 0:o.user)!=null&&i.id)}).catch(m)}export{S as a,v as b,N as c,$ as d,c as e,P as g,T as i,R as u};
//# sourceMappingURL=updateCompanyUser.js.map
