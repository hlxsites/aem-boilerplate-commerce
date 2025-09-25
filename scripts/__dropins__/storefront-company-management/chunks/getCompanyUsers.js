/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i,h as d,c as m}from"./fetch-error.js";const l=`
  mutation DELETE_COMPANY_USER($id: ID!) {
    deleteCompanyUserV2(id: $id) {
      success
    }
  }
`,f=e=>btoa(e),C=async e=>{var a,u;const{id:s}=e;if(!s)throw new Error("User ID is required to delete a company user");try{const n=f(s),t=await i(l,{method:"POST",cache:"no-cache",variables:{id:n}}).catch(d);return(a=t.errors)!=null&&a.length&&m(t.errors),(u=t.data)!=null&&u.deleteCompanyUserV2?{success:t.data.deleteCompanyUserV2.success}:{success:!1}}catch{return{success:!1}}},y=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,g=e=>btoa(e),I=async e=>{var u,n,t;const{id:s,status:a}=e;if(!s)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");try{const p=g(s),o=await i(y,{method:"POST",cache:"no-cache",variables:{input:{id:p,status:a}}}).catch(d);return(u=o.errors)!=null&&u.length&&m(o.errors),(t=(n=o.data)==null?void 0:n.updateCompanyUser)!=null&&t.user?{success:!0,user:{id:o.data.updateCompanyUser.user.id,status:o.data.updateCompanyUser.user.status}}:{success:!1}}catch{return{success:!1}}},h=`
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
`,U=e=>{try{return atob(e)}catch{return e}},S=async(e={})=>{var n,t,p,o;const{pageSize:s=20,currentPage:a=1,filter:u}=e;try{const r=await i(h,{method:"GET",cache:"no-cache",variables:{pageSize:s,currentPage:a,filter:u}}).catch(d);return(n=r.errors)!=null&&n.length&&m(r.errors),(o=(p=(t=r.data)==null?void 0:t.company)==null?void 0:p.users)!=null&&o.items?{users:r.data.company.users.items.map(c=>({id:U(c.id),firstName:c.firstname,lastName:c.lastname,email:c.email,role:c.role.name,status:c.status,...c.team&&{team:c.team.name}})),pageInfo:{pageSize:r.data.company.users.page_info.page_size,currentPage:r.data.company.users.page_info.current_page,totalPages:r.data.company.users.page_info.total_pages},totalCount:r.data.company.users.total_count}:{users:[],pageInfo:{pageSize:s,currentPage:a}}}catch{return{users:[],pageInfo:{pageSize:s,currentPage:a}}}};export{C as d,S as g,I as u};
//# sourceMappingURL=getCompanyUsers.js.map
