/*! Copyright 2025 Adobe
All Rights Reserved. */
import{h as o}from"./fetch-error.js";import{f as u,h as l}from"./network-error.js";import{i as m}from"./company-permissions.js";const d=`
  mutation createCompanyUser($input: CompanyUserCreateInput!) {
    createCompanyUser(input: $input) { __typename user { id structure_id email firstname lastname } }
  }
`;async function A(a){const e={email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status,target_id:a.targetId};return await u(d,{variables:{input:e}}).then(t=>{var n,s,i;if((n=t.errors)!=null&&n.length)return o(t.errors);const r=(i=(s=t==null?void 0:t.data)==null?void 0:s.createCompanyUser)==null?void 0:i.user;return r?{id:r.id,structureId:r.structure_id}:null}).catch(l)}const c=a=>{if(!a)throw new Error("Invalid response: missing user data");return{id:a.id,email:a.email,firstName:a.firstname,lastName:a.lastname,jobTitle:a.job_title,telephone:a.telephone,status:a.status,role:a.role,isCompanyAdmin:m(a.role)}},p=`
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
`;async function E(a){return await u(p,{variables:{id:a}}).then(e=>{var r,n,s;if((r=e.errors)!=null&&r.length)return o(e.errors);const t=(s=(n=e==null?void 0:e.data)==null?void 0:n.company)==null?void 0:s.user;return t?c(t):null}).catch(l)}const y=`
  query isCompanyUserEmailAvailable($email: String!) {
    isCompanyUserEmailAvailable(email: $email) { is_email_available }
  }
`;async function I(a){return await u(y,{variables:{email:a}}).then(e=>{var t,r,n;return(t=e.errors)!=null&&t.length?o(e.errors):((n=(r=e==null?void 0:e.data)==null?void 0:r.isCompanyUserEmailAvailable)==null?void 0:n.is_email_available)??null}).catch(l)}const U=`
  mutation updateCompanyUser($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) { __typename user { id } }
  }
`;async function T(a){const e={id:a.id,email:a.email,firstname:a.firstName,lastname:a.lastName,job_title:a.jobTitle,telephone:a.telephone,role_id:a.roleId,status:a.status};return await u(U,{variables:{input:e}}).then(t=>{var r,n,s,i;return(r=t.errors)!=null&&r.length?o(t.errors):!!((i=(s=(n=t==null?void 0:t.data)==null?void 0:n.updateCompanyUser)==null?void 0:s.user)!=null&&i.id)}).catch(l)}const C=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,b=async a=>{var n,s,i;const{id:e,status:t}=a;if(!e)throw new Error("User ID is required to update company user status");if(!t||t!=="ACTIVE"&&t!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const r=await u(C,{method:"POST",cache:"no-cache",variables:{input:{id:e,status:t}}}).catch(l);return(n=r.errors)!=null&&n.length&&o(r.errors),(i=(s=r.data)==null?void 0:s.updateCompanyUser)!=null&&i.user?{success:!0,user:{id:r.data.updateCompanyUser.user.id,status:r.data.updateCompanyUser.user.status}}:{success:!1}};export{T as a,A as c,E as g,I as i,b as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
