/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as g,h as _,a as u}from"./removeCustomerAddress.js";function l(e){var t,n,i,c,o,s;const a=(n=(t=e==null?void 0:e.data)==null?void 0:t.customer)==null?void 0:n.admin_assistance_actions;return a?{totalCount:a.total_count||0,items:((i=a.items)==null?void 0:i.map(r=>({action:r.action||"",date:r.date||"",details:r.details||""})))||[],pageInfo:{currentPage:((c=a.page_info)==null?void 0:c.current_page)||1,pageSize:((o=a.page_info)==null?void 0:o.page_size)||10,totalPages:((s=a.page_info)==null?void 0:s.total_pages)||1}}:null}const A=`
  query GET_ADMIN_ASSISTANCE_ACTIONS($currentPage: Int, $pageSize: Int) {
    customer {
      admin_assistance_actions(
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        items {
          action
          date
          details
        }
        page_info {
          current_page
          page_size
          total_pages
        }
      }
    }
  }
`,m=async(e,a)=>await g(A,{method:"GET",cache:"no-cache",variables:{pageSize:e,currentPage:a}}).then(t=>{var n;return(n=t.errors)!=null&&n.length?_(t.errors):l(t)}).catch(u);export{m as g};
//# sourceMappingURL=getAdminAssistanceActions.js.map
