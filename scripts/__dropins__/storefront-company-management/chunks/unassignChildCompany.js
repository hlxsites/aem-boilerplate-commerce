/*! Copyright 2026 Adobe
All Rights Reserved. */
import{f as s,h as m}from"./network-error.js";import{h as p}from"./fetch-error.js";function c(n,i){return{id:n.id,name:n.name,is_admin:n.is_admin,parent_company:i?{id:i.id,name:i.name}:null,child_companies:[]}}function h(n){const i=[];if(n.parent){const r=c(n.parent);r.child_companies=n.children.map(a=>c(a,n.parent)),i.push(r)}else i.push(...n.children.map(r=>c(r)));return i}function C(n,i){const r=[],a=new Set;return n.forEach(e=>{h(e).forEach(t=>{var d;a.add(t.id),(d=t.child_companies)==null||d.forEach(u=>{a.add(u.id)}),r.push(t)})}),i.forEach(e=>{a.has(e.id)||r.push({id:e.id,name:e.name,is_admin:e.is_admin,parent_company:null,child_companies:[]})}),r}const _=`
  fragment COMPANY_HIERARCHY_ITEM_FRAGMENT on CompanyBasicInfo {
    id
    is_admin
    legal_name
    name
    status
    __typename
  }
`,y=`
  mutation assignChildCompany($input: AssignChildCompanyInput!) {
    assignChildCompany(input: $input) {
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${_}
`;async function R(n,i){return await s(y,{variables:{input:{parent_company_id:n,child_company_id:i}}}).then(a=>{var o;if((o=a.errors)!=null&&o.length)return p(a.errors);const e=a.data.assignChildCompany.company_hierarchy;return h(e)}).catch(m)}const l=`
  query getCompanyHierarchy {
    customer {
      companies(input: {}) {
        items {
          id
          name
          status
          is_admin
        }
      }
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${_}
`;async function I(){return await s(l,{method:"GET",cache:"no-cache"}).then(n=>{var a;if((a=n.errors)!=null&&a.length)return p(n.errors);const i=n.data.customer.company_hierarchy,r=n.data.customer.companies.items;return C(i,r)}).catch(m)}const E=`
  query GET_CUSTOMER_COMPANIES_WITH_ROLES {
    customer {
      companies(input: {}) {
        items {
          id
          name
        }
      }
      role {
        id
        name
      }
    }
  }
`,H=async()=>{var n,i,r;try{const a=await s(E,{method:"POST"});if((n=a.errors)!=null&&n.length)return!1;const e=(i=a.data)==null?void 0:i.customer;if(!e)return!1;const o=((r=e.companies)==null?void 0:r.items)??[];if(!Array.isArray(o)||o.length===0)return!1;const t=e.role;return t?t.id==="0"||typeof t.id=="number"&&t.id===0||t.name==="Company Administrator":!1}catch(a){return console.error("Error checking if customer is company admin:",a),!1}},A=`
  mutation unassignChildCompany($input: UnassignChildCompanyInput!) {
    unassignChildCompany(input: $input) {
      company_hierarchy {
        parent {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
        children {
          ...COMPANY_HIERARCHY_ITEM_FRAGMENT
        }
      }
    }
  }
  ${_}
`;async function N(n){return await s(A,{variables:{input:{child_company_id:n}}}).then(r=>{var e;if((e=r.errors)!=null&&e.length)return p(r.errors);const a=r.data.unassignChildCompany.company_hierarchy;return h(a)}).catch(m)}export{R as a,I as g,H as i,N as u};
//# sourceMappingURL=unassignChildCompany.js.map
