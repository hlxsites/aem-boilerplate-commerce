/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as o,h as l,a as m}from"./fetch-error.js";import{i as u}from"./company-permissions.js";const c=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function f(a){const t={email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status,target_id:a.targetId};return await o(c,{variables:{input:t}}).then(e=>{var n,i,s;if((n=e.errors)!=null&&n.length)return l(e.errors);const r=(s=(i=e==null?void 0:e.data)==null?void 0:i.createCompanyUser)==null?void 0:s.user;return r?{id:r.id,structureId:r.structure_id}:null}).catch(m)}const d=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,E=async a=>{var r,n;const{id:t}=a;if(!t)throw new Error("User ID is required to delete a company user");const e=await o(d,{method:"POST",cache:"no-cache",variables:{id:t}}).catch(m);return(r=e.errors)!=null&&r.length&&l(e.errors),(n=e.data)!=null&&n.deleteCompanyUserV2?{success:e.data.deleteCompanyUserV2.success}:{success:!1}},p=a=>{if(!a)throw new Error("Invalid response: missing user data");return{id:a.id,email:a.email,firstName:a.firstname,lastName:a.lastname,jobTitle:a.job_title,telephone:a.telephone,status:a.status,role:a.role,isCompanyAdmin:u(a.role)}},y=`
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
`;async function A(a){return await o(y,{variables:{id:a}}).then(t=>{var r,n,i;if((r=t.errors)!=null&&r.length)return l(t.errors);const e=(i=(n=t==null?void 0:t.data)==null?void 0:n.company)==null?void 0:i.user;return e?p(e):null}).catch(m)}const h=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function b(a){return await o(h,{variables:{email:a}}).then(t=>{var e,r,n;return(e=t.errors)!=null&&e.length?l(t.errors):((n=(r=t==null?void 0:t.data)==null?void 0:r.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(m)}const _=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function I(a){const t={id:a.id,email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status};return await o(_,{variables:{input:t}}).then(e=>{var r,n,i,s;return(r=e.errors)!=null&&r.length?l(e.errors):!!((s=(i=(n=e==null?void 0:e.data)==null?void 0:n.updateCompanyUser)==null?void 0:i.user)!=null&&s.id)}).catch(m)}export{f as c,E as d,A as g,b as i,I as u};
//# sourceMappingURL=updateCompanyUser.js.map
