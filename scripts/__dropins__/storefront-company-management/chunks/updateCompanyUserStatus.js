/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as i,a as m,h as d}from"./fetch-error.js";const l=`
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
`,y=async(p={})=>{var n,o,u,c;const{pageSize:r=20,currentPage:a=1,filter:s}=p;try{const e=await i(l,{method:"GET",cache:"no-cache",variables:{pageSize:r,currentPage:a,filter:s}}).catch(m);return(n=e.errors)!=null&&n.length&&d(e.errors),(c=(u=(o=e.data)==null?void 0:o.company)==null?void 0:u.users)!=null&&c.items?{users:e.data.company.users.items.map(t=>({id:t.id,firstName:t.firstname,lastName:t.lastname,email:t.email,role:t.role.name,status:t.status,...t.team&&{team:t.team.name}})),pageInfo:{pageSize:e.data.company.users.page_info.page_size,currentPage:e.data.company.users.page_info.current_page,totalPages:e.data.company.users.page_info.total_pages},totalCount:e.data.company.users.total_count}:{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}},g=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,U=async p=>{var n,o,u;const{id:r,status:a}=p;if(!r)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");const s=await i(g,{method:"POST",cache:"no-cache",variables:{input:{id:r,status:a}}}).catch(m);return(n=s.errors)!=null&&n.length&&d(s.errors),(u=(o=s.data)==null?void 0:o.updateCompanyUser)!=null&&u.user?{success:!0,user:{id:s.data.updateCompanyUser.user.id,status:s.data.updateCompanyUser.user.status}}:{success:!1}};export{y as g,U as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
