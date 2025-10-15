/*! Copyright 2025 Adobe
All Rights Reserved. */
import{b as l,e as g}from"./updateCompanyUser.js";import{f as i,a as d,h as m}from"./network-error.js";const f=`
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
`,I=async(p={})=>{var n,o,u,t;const{pageSize:r=20,currentPage:a=1,filter:c}=p;try{const e=await i(f,{method:"GET",cache:"no-cache",variables:{pageSize:r,currentPage:a,filter:c}}).catch(d);return(n=e.errors)!=null&&n.length&&m(e.errors),(t=(u=(o=e.data)==null?void 0:o.company)==null?void 0:u.users)!=null&&t.items?{users:e.data.company.users.items.map(s=>({id:l(s.id),firstName:s.firstname,lastName:s.lastname,email:s.email,role:s.role.name,status:s.status,...s.team&&{team:s.team.name}})),pageInfo:{pageSize:e.data.company.users.page_info.page_size,currentPage:e.data.company.users.page_info.current_page,totalPages:e.data.company.users.page_info.total_pages},totalCount:e.data.company.users.total_count}:{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}catch{return{users:[],pageInfo:{pageSize:r,currentPage:a,totalPages:1}}}},y=`
  mutation UPDATE_COMPANY_USER_STATUS($input: CompanyUserUpdateInput!) {
    updateCompanyUser(input: $input) {
      user {
        id
        status
      }
    }
  }
`,C=async p=>{var c,n,o;const{id:r,status:a}=p;if(!r)throw new Error("User ID is required to update company user status");if(!a||a!=="ACTIVE"&&a!=="INACTIVE")throw new Error("Valid status (ACTIVE or INACTIVE) is required to update company user status");try{const u=g(r),t=await i(y,{method:"POST",cache:"no-cache",variables:{input:{id:u,status:a}}}).catch(d);return(c=t.errors)!=null&&c.length&&m(t.errors),(o=(n=t.data)==null?void 0:n.updateCompanyUser)!=null&&o.user?{success:!0,user:{id:t.data.updateCompanyUser.user.id,status:t.data.updateCompanyUser.user.status}}:{success:!1}}catch{return{success:!1}}};export{I as g,C as u};
//# sourceMappingURL=updateCompanyUserStatus.js.map
