/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as S,h as b}from"./fetch-graphql.js";import{h as w}from"./fetch-error.js";import{t as D}from"./case-converter.js";const C=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
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
`,M=`
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
`,U=t=>{var n,s,_,a,E,R,o,l,P,y,f,A,g,m,$,q,H,I,F,T;return{typename:(t==null?void 0:t.__typename)??"",uid:(t==null?void 0:t.uid)??"",number:(t==null?void 0:t.number)??"",status:(t==null?void 0:t.status)??"",availableActions:(t==null?void 0:t.available_actions)??[],approvalFlow:t!=null&&t.approval_flow?{ruleName:((n=t==null?void 0:t.approval_flow)==null?void 0:n.rule_name)??"",events:((_=(s=t==null?void 0:t.approval_flow)==null?void 0:s.events)==null?void 0:_.map(i=>({message:(i==null?void 0:i.message)??"",name:(i==null?void 0:i.name)??"",role:(i==null?void 0:i.role)??"",status:(i==null?void 0:i.status)??"",updatedAt:(i==null?void 0:i.updated_at)??""})))??[]}:null,comments:((a=t==null?void 0:t.comments)==null?void 0:a.map(i=>{var G,N,z;return{createdAt:(i==null?void 0:i.created_at)??"",author:{firstname:((G=i==null?void 0:i.author)==null?void 0:G.firstname)??"",lastname:((N=i==null?void 0:i.author)==null?void 0:N.lastname)??"",email:((z=i==null?void 0:i.author)==null?void 0:z.email)??""},text:(i==null?void 0:i.text)??""}}))??[],createdAt:(t==null?void 0:t.created_at)??"",updatedAt:(t==null?void 0:t.updated_at)??"",createdBy:{firstname:((E=t==null?void 0:t.created_by)==null?void 0:E.firstname)??"",lastname:((R=t==null?void 0:t.created_by)==null?void 0:R.lastname)??"",email:((o=t==null?void 0:t.created_by)==null?void 0:o.email)??""},historyLog:((l=t==null?void 0:t.history_log)==null?void 0:l.map(i=>({activity:(i==null?void 0:i.activity)??"",createdAt:(i==null?void 0:i.created_at)??"",message:(i==null?void 0:i.message)??"",uid:(i==null?void 0:i.uid)??""})))??[],order:{orderNumber:((P=t==null?void 0:t.order)==null?void 0:P.number)??"",id:((y=t==null?void 0:t.order)==null?void 0:y.id)??""},quote:{id:((f=t==null?void 0:t.quote)==null?void 0:f.id)??"",prices:{grandTotal:{value:((m=(g=(A=t==null?void 0:t.quote)==null?void 0:A.prices)==null?void 0:g.grand_total)==null?void 0:m.value)??0,currency:((H=(q=($=t==null?void 0:t.quote)==null?void 0:$.prices)==null?void 0:q.grand_total)==null?void 0:H.currency)??""}},itemsV2:{items:((T=(F=(I=t==null?void 0:t.quote)==null?void 0:I.itemsV2)==null?void 0:F.items)==null?void 0:T.map(i=>({uid:(i==null?void 0:i.uid)??"",quantity:(i==null?void 0:i.quantity)??0})))??[]}}}},J=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return S(M,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var E,R,o;(E=_.errors)!=null&&E.length&&w(_.errors);const a=(R=_.data)==null?void 0:R.approvePurchaseOrders;if(!a)throw new Error("Failed to approve purchase orders");return{errors:((a==null?void 0:a.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((o=a==null?void 0:a.purchase_orders)==null?void 0:o.map(l=>U(l)))??[]}}).catch(b)},V=`
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
`,B=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return S(V,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var E,R;(E=_.errors)!=null&&E.length&&w(_.errors);const a=(R=_.data)==null?void 0:R.rejectPurchaseOrders;return{errors:((a==null?void 0:a.errors)??[]).map(o=>({message:(o==null?void 0:o.message)??"",type:(o==null?void 0:o.type)??""})),purchaseOrders:((a==null?void 0:a.purchase_orders)??[]).map(U)}}).catch(b)},x=`
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
`,L=async(t,n=20,s=1)=>S(x,{variables:{filter:D(t),pageSize:n,currentPage:s}}).then(_=>{var o,l,P,y,f,A,g,m;if((o=_.errors)!=null&&o.length&&w(_.errors),!((P=(l=_.data)==null?void 0:l.customer)!=null&&P.purchase_orders))throw new Error("Failed to get purchase orders");const a=(f=(y=_==null?void 0:_.data)==null?void 0:y.customer)==null?void 0:f.purchase_orders,E=(a==null?void 0:a.total_count)??0,R={currentPage:((A=a==null?void 0:a.page_info)==null?void 0:A.current_page)??1,pageSize:((g=a==null?void 0:a.page_info)==null?void 0:g.page_size)??20,totalPages:((m=a==null?void 0:a.page_info)==null?void 0:m.total_pages)??1};return{totalCount:E,pageInfo:R,purchaseOrderItems:((a==null?void 0:a.items)||[]).map(U)}}).catch(b);export{C as P,J as a,L as g,B as r,U as t};
//# sourceMappingURL=getPurchaseOrders.js.map
