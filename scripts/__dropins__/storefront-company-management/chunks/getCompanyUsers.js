/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as p,c as d,h as m}from"./fetch-error.js";const f=e=>{try{return btoa(e)}catch(t){throw new Error(`Failed to encode base64: ${t}`)}},g=e=>{try{return atob(e)}catch{return e}},l=e=>{if(!e||typeof e!="string")throw new Error("User ID must be a non-empty string");return f(e)},y=e=>!e||typeof e!="string"?e:g(e),h=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,S=async e=>{var r,u;const{id:t}=e;if(!t)throw new Error("User ID is required to delete a company user");try{const n=l(t),a=await p(h,{method:"POST",cache:"no-cache",variables:{id:n}}).catch(d);return(r=a.errors)!=null&&r.length&&m(a.errors),(u=a.data)!=null&&u.deleteCompanyUserV2?{success:a.data.deleteCompanyUserV2.success}:{success:!1}}catch{return{success:!1}}},U=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,T=async e=>{var u,n,a;const{id:t,status:r}=e;if(!t)throw new Error("User ID is required to update company user status");if(!r||r!=="ACTIVE"&&r!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");try{const i=l(t),o=await p(U,{method:"POST",cache:"no-cache",variables:{input:{id:i,status:r}}}).catch(d);return(u=o.errors)!=null&&u.length&&m(o.errors),(a=(n=o.data)==null?void 0:n.updateCompanyUser)!=null&&a.user?{success:!0,user:{id:o.data.updateCompanyUser.user.id,status:o.data.updateCompanyUser.user.status}}:{success:!1}}catch{return{success:!1}}},E=`
  query COMPANY_USERS($pageSize: Int!, $currentPage: Int!, $filter: CompanyUsersFilterInput) {
    company {
      users(pageSize: $pageSize, currentPage: $currentPage, filter: $filter) {
        items {
          id
          firstname
          lastname
          email
          role {
            name
          }
          status
          team {
            name
          }
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
`,I=async(e={})=>{var n,a,i,o;const{pageSize:t=20,currentPage:r=1,filter:u}=e;try{const s=await p(E,{method:"GET",cache:"no-cache",variables:{pageSize:t,currentPage:r,filter:u}}).catch(d);return(n=s.errors)!=null&&n.length&&m(s.errors),(o=(i=(a=s.data)==null?void 0:a.company)==null?void 0:i.users)!=null&&o.items?{users:s.data.company.users.items.map(c=>({id:y(c.id),firstName:c.firstname,lastName:c.lastname,email:c.email,role:c.role.name,status:c.status,...c.team&&{team:c.team.name}})),pageInfo:{pageSize:s.data.company.users.page_info.page_size,currentPage:s.data.company.users.page_info.current_page,totalPages:s.data.company.users.page_info.total_pages},totalCount:s.data.company.users.total_count}:{users:[],pageInfo:{pageSize:t,currentPage:r,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:t,currentPage:r,totalPages:1}}}};export{S as d,I as g,T as u};
//# sourceMappingURL=getCompanyUsers.js.map
