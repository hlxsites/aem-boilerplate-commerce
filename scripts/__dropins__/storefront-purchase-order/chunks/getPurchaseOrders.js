/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as S,h as b}from"./fetch-graphql.js";import{h as w}from"./fetch-error.js";import{t as D}from"./case-converter.js";const C=`
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
`,u=`
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
  ${C}
`,U=t=>{var n,R,_,i,E,s,o,l,P,y,f,A,m,g,$,q,H,I,F,T;return{typename:(t==null?void 0:t.__typename)??"",uid:(t==null?void 0:t.uid)??"",number:(t==null?void 0:t.number)??"",status:(t==null?void 0:t.status)??"",availableActions:(t==null?void 0:t.available_actions)??[],approvalFlow:t!=null&&t.approval_flow?{ruleName:((n=t==null?void 0:t.approval_flow)==null?void 0:n.rule_name)??"",events:((_=(R=t==null?void 0:t.approval_flow)==null?void 0:R.events)==null?void 0:_.map(a=>({message:(a==null?void 0:a.message)??"",name:(a==null?void 0:a.name)??"",role:(a==null?void 0:a.role)??"",status:(a==null?void 0:a.status)??"",updatedAt:(a==null?void 0:a.updated_at)??""})))??[]}:null,comments:((i=t==null?void 0:t.comments)==null?void 0:i.map(a=>{var G,N,z;return{createdAt:(a==null?void 0:a.created_at)??"",author:{firstname:((G=a==null?void 0:a.author)==null?void 0:G.firstname)??"",lastname:((N=a==null?void 0:a.author)==null?void 0:N.lastname)??"",email:((z=a==null?void 0:a.author)==null?void 0:z.email)??""},text:(a==null?void 0:a.text)??""}}))??[],createdAt:(t==null?void 0:t.created_at)??"",updatedAt:(t==null?void 0:t.updated_at)??"",createdBy:{firstname:((E=t==null?void 0:t.created_by)==null?void 0:E.firstname)??"",lastname:((s=t==null?void 0:t.created_by)==null?void 0:s.lastname)??"",email:((o=t==null?void 0:t.created_by)==null?void 0:o.email)??""},historyLog:((l=t==null?void 0:t.history_log)==null?void 0:l.map(a=>({activity:(a==null?void 0:a.activity)??"",createdAt:(a==null?void 0:a.created_at)??"",message:(a==null?void 0:a.message)??"",uid:(a==null?void 0:a.uid)??""})))??[],order:{orderNumber:((P=t==null?void 0:t.order)==null?void 0:P.number)??"",id:((y=t==null?void 0:t.order)==null?void 0:y.id)??""},quote:{id:((f=t==null?void 0:t.quote)==null?void 0:f.id)??"",prices:{grandTotal:{value:((g=(m=(A=t==null?void 0:t.quote)==null?void 0:A.prices)==null?void 0:m.grand_total)==null?void 0:g.value)??0,currency:((H=(q=($=t==null?void 0:t.quote)==null?void 0:$.prices)==null?void 0:q.grand_total)==null?void 0:H.currency)??""}},itemsV2:{items:((T=(F=(I=t==null?void 0:t.quote)==null?void 0:I.itemsV2)==null?void 0:F.items)==null?void 0:T.map(a=>({uid:(a==null?void 0:a.uid)??"",quantity:(a==null?void 0:a.quantity)??0})))??[]}}}},v=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return S(u,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var E,s,o;(E=_.errors)!=null&&E.length&&w(_.errors);const i=(s=_.data)==null?void 0:s.approvePurchaseOrders;if(!i)throw new Error("Failed to approve purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((o=i==null?void 0:i.purchase_orders)==null?void 0:o.map(l=>U(l)))??[]}}).catch(b)},M=`
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
  ${C}
`,J=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return S(M,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var E,s;(E=_.errors)!=null&&E.length&&w(_.errors);const i=(s=_.data)==null?void 0:s.rejectPurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(o=>({message:(o==null?void 0:o.message)??"",type:(o==null?void 0:o.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)??[]).map(U)}}).catch(b)},V=`
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
  ${C}
`,B=async(t,n=20,R=1)=>S(V,{variables:{filter:D(t),pageSize:n,currentPage:R}}).then(_=>{var o,l,P,y,f,A,m,g;if((o=_.errors)!=null&&o.length&&w(_.errors),!((P=(l=_.data)==null?void 0:l.customer)!=null&&P.purchase_orders))throw new Error("Failed to get purchase orders");const i=(f=(y=_==null?void 0:_.data)==null?void 0:y.customer)==null?void 0:f.purchase_orders,E=(i==null?void 0:i.total_count)??0,s={currentPage:((A=i==null?void 0:i.page_info)==null?void 0:A.current_page)??1,pageSize:((m=i==null?void 0:i.page_info)==null?void 0:m.page_size)??20,totalPages:((g=i==null?void 0:i.page_info)==null?void 0:g.total_pages)??1};return{totalCount:E,pageInfo:s,purchaseOrderItems:((i==null?void 0:i.items)||[]).map(U)}}).catch(b);export{C as P,v as a,B as g,J as r,U as t};
//# sourceMappingURL=getPurchaseOrders.js.map
