/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as o}from"./fetch-error.js";import{f as l,h as m}from"./network-error.js";import{i as u}from"./company-permissions.js";const c=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname job_title } }
  }
`;async function E(e){const t={email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status,target_id:e.targetId};return await l(c,{variables:{input:t}}).then(a=>{var n,i,s;if((n=a.errors)!=null&&n.length)return o(a.errors);const r=(s=(i=a==null?void 0:a.data)==null?void 0:i.createCompanyUser)==null?void 0:s.user;return r?{id:r.id,structureId:r.structure_id,jobTitle:r.job_title}:null}).catch(m)}const d=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,b=async e=>{var r,n;const{id:t}=e;if(!t)throw new Error("User ID is required to delete a company user");const a=await l(d,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(m);return(r=a.errors)!=null&&r.length&&o(a.errors),(n=a.data)!=null&&n.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}},p=e=>{if(!e)throw new Error("Invalid response: missing user data");return{id:e.id,email:e.email,firstName:e.firstname,lastName:e.lastname,jobTitle:e.job_title,telephone:e.telephone,status:e.status,role:e.role,isCompanyAdmin:u(e.role)}},y=`
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
`;async function A(e){return await l(y,{variables:{id:e}}).then(t=>{var r,n,i;if((r=t.errors)!=null&&r.length)return o(t.errors);const a=(i=(n=t==null?void 0:t.data)==null?void 0:n.company)==null?void 0:i.user;return a?p(a):null}).catch(m)}const _=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function I(e){return await l(_,{variables:{email:e}}).then(t=>{var a,r,n;return(a=t.errors)!=null&&a.length?o(t.errors):((n=(r=t==null?void 0:t.data)==null?void 0:r.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(m)}const h=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function N(e){const t={id:e.id,email:e.email,firstname:e.firstName,lastname:e.lastName,job_title:e.jobTitle,telephone:e.telephone,role_id:e.roleId,status:e.status};return await l(h,{variables:{input:t}}).then(a=>{var r,n,i,s;return(r=a.errors)!=null&&r.length?o(a.errors):!!((s=(i=(n=a==null?void 0:a.data)==null?void 0:n.updateCompanyUser)==null?void 0:i.user)!=null&&s.id)}).catch(m)}export{E as c,b as d,A as g,I as i,N as u};
//# sourceMappingURL=updateCompanyUser.js.map
