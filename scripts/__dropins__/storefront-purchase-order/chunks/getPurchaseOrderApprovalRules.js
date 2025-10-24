/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as E,h as a,a as m}from"./fetch-graphql.js";const O=e=>{const _=t=>({id:(t==null?void 0:t.id)||"",name:(t==null?void 0:t.name)||"",usersCount:(t==null?void 0:t.users_count)||0,permissions:((t==null?void 0:t.permissions)||[]).map(r=>({id:(r==null?void 0:r.id)||"",sortOrder:(r==null?void 0:r.sort_order)||0,text:(r==null?void 0:r.text)||""}))}),d=t=>({attribute:t==null?void 0:t.attribute,operator:t==null?void 0:t.operator});return{uid:(e==null?void 0:e.uid)||"",name:(e==null?void 0:e.name)||"",description:(e==null?void 0:e.description)||"",status:e==null?void 0:e.status,createdAt:(e==null?void 0:e.created_at)||"",updatedAt:(e==null?void 0:e.updated_at)||"",createdBy:e==null?void 0:e.created_by,appliesToRoles:((e==null?void 0:e.applies_to_roles)||[]).map(_),approverRoles:((e==null?void 0:e.approver_roles)||[]).map(_),condition:d((e==null?void 0:e.condition)||{})}},u=`
  mutation DELETE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: DeletePurchaseOrderApprovalRuleInput!
  ) {
    deletePurchaseOrderApprovalRule(input: $input) {
      errors {
        message
        type
      }
    }
  }
`,S=async e=>{const _=Array.isArray(e)?e:[e];if(!_||_.length===0)throw new Error("Approval Rule UID(s) are required");if(_.some(t=>!t||t.trim()===""))throw new Error("All Approval Rule UIDs must be valid");return E(u,{variables:{input:{approval_rule_uids:_}}}).then(t=>{var n,g,i;if((n=t.errors)!=null&&n.length&&a(t.errors),!((g=t.data)==null?void 0:g.deletePurchaseOrderApprovalRule))throw new Error("Failed to delete purchase order approval rule");const s=(i=t==null?void 0:t.data)==null?void 0:i.deletePurchaseOrderApprovalRule;return{deletePurchaseOrderApprovalRule:{errors:((s==null?void 0:s.errors)??[]).map(c=>({message:c==null?void 0:c.message,type:c==null?void 0:c.type}))}}}).catch(m)},f=`
  query GET_PURCHASE_ORDER_APPROVAL_RULES($currentPage: Int!, $pageSize: Int!) {
    customer {
      email
      purchase_order_approval_rules(
        currentPage: $currentPage
        pageSize: $pageSize
      ) {
        items {
          applies_to_roles {
            id
            name
            users_count
            permissions {
              id
              sort_order
              text
              children {
                id
                sort_order
                text
              }
            }
          }
          approver_roles {
            id
            name
            users_count
            permissions {
              id
              sort_order
              text
              children {
                id
                sort_order
                text
              }
            }
          }
          condition {
            attribute
            operator
          }
          created_at
          created_by
          description
          name
          status
          uid
          updated_at
        }
        total_count
        page_info {
          page_size
          current_page
          total_pages
        }
      }
    }
  }
`,P={currentPage:1,pageSize:20,totalPages:1},L=async(e=P.currentPage,_=P.pageSize)=>E(f,{variables:{currentPage:e,pageSize:_}}).then(d=>{var n,g,i,c,A,h;(n=d.errors)!=null&&n.length&&a(d.errors);const t=(i=(g=d==null?void 0:d.data)==null?void 0:g.customer)==null?void 0:i.purchase_order_approval_rules,r=(t==null?void 0:t.total_count)??0,s={currentPage:((c=t==null?void 0:t.page_info)==null?void 0:c.current_page)??P.currentPage,pageSize:((A=t==null?void 0:t.page_info)==null?void 0:A.page_size)??P.pageSize,totalPages:((h=t==null?void 0:t.page_info)==null?void 0:h.total_pages)??P.totalPages};return{totalCount:r,pageInfo:s,items:((t==null?void 0:t.items)||[]).map(O)}}).catch(m);export{S as d,L as g,O as t};
//# sourceMappingURL=getPurchaseOrderApprovalRules.js.map
