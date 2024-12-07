/*! Copyright 2024 Adobe
All Rights Reserved. */
import{h as d}from"./network-error.js";import{f as u,h as _}from"./fetch-graphql.js";import{R as I}from"./RequestReturnOrderFragment.graphql.js";import{G as a}from"./GurestOrderFragment.graphql.js";import{c as O}from"./initialize.js";import{events as T}from"@dropins/tools/event-bus.js";const N=`
  mutation REORDER_ITEMS_MUTATION($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
      cart {
        itemsV2 {
          items {
            uid
          }
        }
      }
      userInputErrors {
        code
        message
        path
      }
    }
  }
`,$=async E=>await u(N,{method:"POST",variables:{orderNumber:E}}).then(t=>{var n,o,i,c,m,R;if((n=t.errors)!=null&&n.length)return _(t.errors);const e=!!((c=(i=(o=t==null?void 0:t.data)==null?void 0:o.reorderItems)==null?void 0:i.cart)!=null&&c.itemsV2.items.length),r=((R=(m=t==null?void 0:t.data)==null?void 0:m.reorderItems)==null?void 0:R.userInputErrors)??[];return{success:e,userInputErrors:r}}).catch(d),l=`
  mutation CONFIRM_RETURN_GUEST_ORDER(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmReturn(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      return {
        ...REQUEST_RETURN_ORDER_FRAGMENT
        order {
          ...GUEST_ORDER_FRAGMENT
        }
      }
    }
  }
  ${I}
  ${a}
`,s=async(E,t)=>await u(l,{method:"POST",variables:{orderId:E,confirmationKey:t}}).then(e=>{var r,n,o,i,c,m,R;if((r=e.errors)!=null&&r.length)return _(e.errors);if((i=(o=(n=e==null?void 0:e.data)==null?void 0:n.confirmReturn)==null?void 0:o.return)!=null&&i.order){const f=O((R=(m=(c=e==null?void 0:e.data)==null?void 0:c.confirmReturn)==null?void 0:m.return)==null?void 0:R.order);return T.emit("order/data",f),f}return null}).catch(d),h=`
  mutation CONFIRM_CANCEL_ORDER_MUTATION(
    $orderId: ID!
    $confirmationKey: String!
  ) {
    confirmCancelOrder(
      input: { order_id: $orderId, confirmation_key: $confirmationKey }
    ) {
      order {
        ...GUEST_ORDER_FRAGMENT
      }
      errorV2 {
        message
        code
      }
    }
  }
  ${a}
`,y=async(E,t)=>u(h,{variables:{orderId:E,confirmationKey:t}}).then(async({errors:e,data:r})=>{var i,c,m,R;const n=[...(i=r==null?void 0:r.confirmCancelOrder)!=null&&i.errorV2?[(c=r==null?void 0:r.confirmCancelOrder)==null?void 0:c.errorV2]:[],...e??[]];let o=null;return(m=r==null?void 0:r.confirmCancelOrder)!=null&&m.order&&(o=O((R=r==null?void 0:r.confirmCancelOrder)==null?void 0:R.order),T.emit("order/data",o)),n.length>0?_(n):o});export{y as a,s as c,$ as r};
