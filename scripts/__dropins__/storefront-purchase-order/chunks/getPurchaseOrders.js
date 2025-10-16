/*! Copyright 2025 Adobe
All Rights Reserved. */
import{FetchGraphQL as N}from"@dropins/tools/fetch-graphql.js";import{events as D}from"@dropins/tools/event-bus.js";const S=t=>{const n=t.map(l=>l.message).join(" ");throw Error(n)},w=t=>{const n=t instanceof DOMException&&t.name==="AbortError",l=t.name==="PlaceOrderError";throw!n&&!l&&D.emit("purchase-order/error",{source:"purchase-order",type:"network",error:t.message}),t},e=t=>{if(t==null||typeof t!="object")return t;if(Array.isArray(t))return t.map(e);const n={};for(const[l,o]of Object.entries(t)){const i=l.replace(/[A-Z]/g,E=>`_${E.toLowerCase()}`);n[i]=e(o)}return n},{setEndpoint:V,setFetchGraphQlHeader:L,removeFetchGraphQlHeader:J,setFetchGraphQlHeaders:B,fetchGraphQl:b,getConfig:K}=new N().getMethods(),C=`
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
`,v=`
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
`,U=t=>{var n,l,o,i,E,f,s,_,y,R,A,P,m,g,u,F,H,$,q,G;return{typename:(t==null?void 0:t.__typename)??"",uid:(t==null?void 0:t.uid)??"",number:(t==null?void 0:t.number)??"",status:(t==null?void 0:t.status)??"",availableActions:(t==null?void 0:t.available_actions)??[],approvalFlow:t!=null&&t.approval_flow?{ruleName:((n=t==null?void 0:t.approval_flow)==null?void 0:n.rule_name)??"",events:((o=(l=t==null?void 0:t.approval_flow)==null?void 0:l.events)==null?void 0:o.map(a=>({message:(a==null?void 0:a.message)??"",name:(a==null?void 0:a.name)??"",role:(a==null?void 0:a.role)??"",status:(a==null?void 0:a.status)??"",updatedAt:(a==null?void 0:a.updated_at)??""})))??[]}:null,comments:((i=t==null?void 0:t.comments)==null?void 0:i.map(a=>{var I,T,M;return{createdAt:(a==null?void 0:a.created_at)??"",author:{firstname:((I=a==null?void 0:a.author)==null?void 0:I.firstname)??"",lastname:((T=a==null?void 0:a.author)==null?void 0:T.lastname)??"",email:((M=a==null?void 0:a.author)==null?void 0:M.email)??""},text:(a==null?void 0:a.text)??""}}))??[],createdAt:(t==null?void 0:t.created_at)??"",updatedAt:(t==null?void 0:t.updated_at)??"",createdBy:{firstname:((E=t==null?void 0:t.created_by)==null?void 0:E.firstname)??"",lastname:((f=t==null?void 0:t.created_by)==null?void 0:f.lastname)??"",email:((s=t==null?void 0:t.created_by)==null?void 0:s.email)??""},historyLog:((_=t==null?void 0:t.history_log)==null?void 0:_.map(a=>({activity:(a==null?void 0:a.activity)??"",createdAt:(a==null?void 0:a.created_at)??"",message:(a==null?void 0:a.message)??"",uid:(a==null?void 0:a.uid)??""})))??[],order:{orderNumber:((y=t==null?void 0:t.order)==null?void 0:y.number)??"",id:((R=t==null?void 0:t.order)==null?void 0:R.id)??""},quote:{id:((A=t==null?void 0:t.quote)==null?void 0:A.id)??"",prices:{grandTotal:{value:((g=(m=(P=t==null?void 0:t.quote)==null?void 0:P.prices)==null?void 0:m.grand_total)==null?void 0:g.value)??0,currency:((H=(F=(u=t==null?void 0:t.quote)==null?void 0:u.prices)==null?void 0:F.grand_total)==null?void 0:H.currency)??""}},itemsV2:{items:((G=(q=($=t==null?void 0:t.quote)==null?void 0:$.itemsV2)==null?void 0:q.items)==null?void 0:G.map(a=>({uid:(a==null?void 0:a.uid)??"",quantity:(a==null?void 0:a.quantity)??0})))??[]}}}},Z=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(o=>!o||o.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return b(v,{variables:{input:{purchase_order_uids:n}}}).then(o=>{var E,f,s;(E=o.errors)!=null&&E.length&&S(o.errors);const i=(f=o.data)==null?void 0:f.approvePurchaseOrders;if(!i)throw new Error("Failed to approve purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(_=>({message:(_==null?void 0:_.message)??"",type:(_==null?void 0:_.type)??""})),purchaseOrders:((s=i==null?void 0:i.purchase_orders)==null?void 0:s.map(_=>U(_)))??[]}}).catch(w)},z=`
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
`,j=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(o=>!o||o.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return b(z,{variables:{input:{purchase_order_uids:n}}}).then(o=>{var E,f;(E=o.errors)!=null&&E.length&&S(o.errors);const i=(f=o.data)==null?void 0:f.rejectPurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(s=>({message:(s==null?void 0:s.message)??"",type:(s==null?void 0:s.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)??[]).map(U)}}).catch(w)},k=`
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
`,W=async(t,n=20,l=1)=>b(k,{variables:{filter:e(t),pageSize:n,currentPage:l}}).then(o=>{var s,_,y,R,A,P,m,g;if((s=o.errors)!=null&&s.length&&S(o.errors),!((y=(_=o.data)==null?void 0:_.customer)!=null&&y.purchase_orders))throw new Error("Failed to get purchase orders");const i=(A=(R=o==null?void 0:o.data)==null?void 0:R.customer)==null?void 0:A.purchase_orders,E=(i==null?void 0:i.total_count)??0,f={currentPage:((P=i==null?void 0:i.page_info)==null?void 0:P.current_page)??1,pageSize:((m=i==null?void 0:i.page_info)==null?void 0:m.page_size)??20,totalPages:((g=i==null?void 0:i.page_info)==null?void 0:g.total_pages)??1};return{totalCount:E,pageInfo:f,purchaseOrderItems:((i==null?void 0:i.items)||[]).map(U)}}).catch(w);export{C as P,Z as a,w as b,L as c,J as d,B as e,b as f,W as g,S as h,K as i,j as r,V as s,U as t};
//# sourceMappingURL=getPurchaseOrders.js.map
