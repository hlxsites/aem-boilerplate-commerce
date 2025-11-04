/*! Copyright 2025 Adobe
All Rights Reserved. */
import{f as T,h as I}from"./fetch-graphql.js";import{h as $}from"./fetch-error.js";const G=`
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
`,g=`
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
  ${G}
`,V=t=>{var n,E,_,a,y,s,l,o,R,A,P,f,m,b,S,w,D,U,q,C;return{typename:(t==null?void 0:t.__typename)??"",uid:(t==null?void 0:t.uid)??"",number:(t==null?void 0:t.number)??"",status:(t==null?void 0:t.status)??"",availableActions:(t==null?void 0:t.available_actions)??[],approvalFlow:t!=null&&t.approval_flow?{ruleName:((n=t==null?void 0:t.approval_flow)==null?void 0:n.rule_name)??"",events:((_=(E=t==null?void 0:t.approval_flow)==null?void 0:E.events)==null?void 0:_.map(i=>({message:(i==null?void 0:i.message)??"",name:(i==null?void 0:i.name)??"",role:(i==null?void 0:i.role)??"",status:(i==null?void 0:i.status)??"",updatedAt:(i==null?void 0:i.updated_at)??""})))??[]}:null,comments:((a=t==null?void 0:t.comments)==null?void 0:a.map(i=>{var H,F,N;return{createdAt:(i==null?void 0:i.created_at)??"",author:{firstname:((H=i==null?void 0:i.author)==null?void 0:H.firstname)??"",lastname:((F=i==null?void 0:i.author)==null?void 0:F.lastname)??"",email:((N=i==null?void 0:i.author)==null?void 0:N.email)??""},text:(i==null?void 0:i.text)??""}}))??[],createdAt:(t==null?void 0:t.created_at)??"",updatedAt:(t==null?void 0:t.updated_at)??"",createdBy:{firstname:((y=t==null?void 0:t.created_by)==null?void 0:y.firstname)??"",lastname:((s=t==null?void 0:t.created_by)==null?void 0:s.lastname)??"",email:((l=t==null?void 0:t.created_by)==null?void 0:l.email)??""},historyLog:((o=t==null?void 0:t.history_log)==null?void 0:o.map(i=>({activity:(i==null?void 0:i.activity)??"",createdAt:(i==null?void 0:i.created_at)??"",message:(i==null?void 0:i.message)??"",uid:(i==null?void 0:i.uid)??""})))??[],order:{orderNumber:((R=t==null?void 0:t.order)==null?void 0:R.number)??"",id:((A=t==null?void 0:t.order)==null?void 0:A.id)??""},quote:{id:((P=t==null?void 0:t.quote)==null?void 0:P.id)??"",prices:{grandTotal:{value:((b=(m=(f=t==null?void 0:t.quote)==null?void 0:f.prices)==null?void 0:m.grand_total)==null?void 0:b.value)??0,currency:((D=(w=(S=t==null?void 0:t.quote)==null?void 0:S.prices)==null?void 0:w.grand_total)==null?void 0:D.currency)??""}},itemsV2:{items:((C=(q=(U=t==null?void 0:t.quote)==null?void 0:U.itemsV2)==null?void 0:q.items)==null?void 0:C.map(i=>({uid:(i==null?void 0:i.uid)??"",quantity:(i==null?void 0:i.quantity)??0})))??[]}}}},J=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return T(g,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var y,s,l;(y=_.errors)!=null&&y.length&&$(_.errors);const a=(s=_.data)==null?void 0:s.approvePurchaseOrders;if(!a)throw new Error("Failed to approve purchase orders");return{errors:((a==null?void 0:a.errors)??[]).map(o=>({message:(o==null?void 0:o.message)??"",type:(o==null?void 0:o.type)??""})),purchaseOrders:((l=a==null?void 0:a.purchase_orders)==null?void 0:l.map(o=>V(o)))??[]}}).catch(I)},x=`
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
  ${G}
`,k=async t=>{const n=Array.isArray(t)?t:[t];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(_=>!_||_.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return T(x,{variables:{input:{purchase_order_uids:n}}}).then(_=>{var y,s;(y=_.errors)!=null&&y.length&&$(_.errors);const a=(s=_.data)==null?void 0:s.rejectPurchaseOrders;return{errors:((a==null?void 0:a.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((a==null?void 0:a.purchase_orders)??[]).map(V)}}).catch(I)};export{G as P,J as a,k as r,V as t};
//# sourceMappingURL=rejectPurchaseOrders.js.map
