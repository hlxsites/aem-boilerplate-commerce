/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as w,h as C,a as U}from"./fetch-graphql.js";const S=t=>{if(t==null||typeof t!="object")return t;if(Array.isArray(t))return t.map(S);const n={};for(const[R,_]of Object.entries(t)){const i=R.replace(/[A-Z]/g,s=>`_${s.toLowerCase()}`);n[i]=S(_)}return n},b=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
    approval_flow {
      rule_name
      events {
        message
        name
        role
        status
        updated_at
      }
    }
    comments {
      created_at
      author {
        firstname
        lastname
        email
      }
      text
    }
    created_at
    updated_at
    created_by {
      firstname
      lastname
      email
    }
    history_log {
      activity
      created_at
      message
      uid
    }
    order {
      number
    }
    quote {
      id
      prices {
        grand_total {
          value
          currency
        }
      }
      itemsV2 {
        items {
          uid
          quantity
        }
      }
    }
  }
`,D=`
  mutation APPROVE_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    approvePurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${b}
`,$=t=>{var n,R,_,i,s,E,o,l,y,f,A,P,g,m,q,u,H,I,F,T;return{typename:(t==null?void 0:t.__typename)??"",uid:(t==null?void 0:t.uid)??"",number:(t==null?void 0:t.number)??"",status:(t==null?void 0:t.status)??"",availableActions:(t==null?void 0:t.available_actions)??[],approvalFlow:t!=null&&t.approval_flow?{ruleName:((n=t==null?void 0:t.approval_flow)==null?void 0:n.rule_name)??"",events:((_=(R=t==null?void 0:t.approval_flow)==null?void 0:R.events)==null?void 0:_.map(a=>({message:(a==null?void 0:a.message)??"",name:(a==null?void 0:a.name)??"",role:(a==null?void 0:a.role)??"",status:(a==null?void 0:a.status)??"",updatedAt:(a==null?void 0:a.updated_at)??""})))??[]}:null,comments:((i=t==null?void 0:t.comments)==null?void 0:i.map(a=>{var G,N,z;return{createdAt:(a==null?void 0:a.created_at)??"",author:{firstname:((G=a==null?void 0:a.author)==null?void 0:G.firstname)??"",lastname:((N=a==null?void 0:a.author)==null?void 0:N.lastname)??"",email:((z=a==null?void 0:a.author)==null?void 0:z.email)??""},text:(a==null?void 0:a.text)??""}}))??[],createdAt:(t==null?void 0:t.created_at)??"",updatedAt:(t==null?void 0:t.updated_at)??"",createdBy:{firstname:((s=t==null?void 0:t.created_by)==null?void 0:s.firstname)??"",lastname:((E=t==null?void 0:t.created_by)==null?void 0:E.lastname)??"",email:((o=t==null?void 0:t.created_by)==null?void 0:o.email)??""},historyLog:((l=t==null?void 0:t.history_log)==null?void 0:l.map(a=>({activity:(a==null?void 0:a.activity)??"",createdAt:(a==null?void 0:a.created_at)??"",message:(a==null?void 0:a.message)??"",uid:(a==null?void 0:a.uid)??""})))??[],order:{orderNumber:((y=t==null?void 0:t.order)==null?void 0:y.number)??"",id:((f=t==null?void 0:t.order)==null?void 0:f.id)??""},quote:{id:((A=t==null?void 0:t.quote)==null?void 0:A.id)??"",prices:{grandTotal:{value:((m=(g=(P=t==null?void 0:t.quote)==null?void 0:P.prices)==null?void 0:g.grand_total)==null?void 0:m.value)??0,currency:((H=(u=(q=t==null?void 0:t.quote)==null?void 0:q.prices)==null?void 0:u.grand_total)==null?void 0:H.currency)??""}},itemsV2:{items:((T=(F=(I=t==null?void 0:t.quote)==null?void 0:I.itemsV2)==null?void 0:F.items)==null?void 0:T.map(a=>({uid:(a==null?void 0:a.uid)??"",quantity:(a==null?void 0:a.quantity)??0})))??[]}}}},v=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return w(D,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var s,E,o;(s=_.errors)!=null&&s.length&&C(_.errors);const i=(E=_.data)==null?void 0:E.approvePurchaseOrders;if(!i)throw new Error("Failed to approve purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((o=i==null?void 0:i.purchase_orders)==null?void 0:o.map(l=>$(l)))??[]}}).catch(U)},M=`
  mutation REJECT_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    rejectPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${b}
`,x=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return w(M,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var s,E;(s=_.errors)!=null&&s.length&&C(_.errors);const i=(E=_.data)==null?void 0:E.rejectPurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(o=>({message:(o==null?void 0:o.message)??"",type:(o==null?void 0:o.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)??[]).map($)}}).catch(U)},V=`
  query GET_PURCHASE_ORDERS(
    $filter: PurchaseOrdersFilterInput
    $pageSize: Int
    $currentPage: Int
  ) {
    customer {
      purchase_orders(
        filter: $filter
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        total_count
        page_info {
          current_page
          page_size
          total_pages
        }
        items {
          ...PURCHASE_ORDERS_FRAGMENT
        }
      }
    }
  }
  ${b}
`,J=async(t,n=20,R=1)=>w(V,{variables:{filter:S(t),pageSize:n,currentPage:R}}).then(_=>{var o,l,y,f,A,P,g,m;if((o=_.errors)!=null&&o.length&&C(_.errors),!((y=(l=_.data)==null?void 0:l.customer)!=null&&y.purchase_orders))throw new Error("Failed to get purchase orders");const i=(A=(f=_==null?void 0:_.data)==null?void 0:f.customer)==null?void 0:A.purchase_orders,s=(i==null?void 0:i.total_count)??0,E={currentPage:((P=i==null?void 0:i.page_info)==null?void 0:P.current_page)??1,pageSize:((g=i==null?void 0:i.page_info)==null?void 0:g.page_size)??20,totalPages:((m=i==null?void 0:i.page_info)==null?void 0:m.total_pages)??1};return{totalCount:s,pageInfo:E,purchaseOrderItems:((i==null?void 0:i.items)||[]).map($)}}).catch(U);export{b as P,v as a,J as g,x as r,$ as t};
//# sourceMappingURL=getPurchaseOrders.js.map
