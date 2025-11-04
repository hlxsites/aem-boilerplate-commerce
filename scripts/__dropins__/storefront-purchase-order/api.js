/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as v}from"@dropins/tools/lib.js";import{f as g,h as E}from"./chunks/fetch-graphql.js";import{g as Y,r as Z,s as m,a as rr,b as er}from"./chunks/fetch-graphql.js";import{P as S,t as R}from"./chunks/rejectPurchaseOrders.js";import{a as sr,r as tr}from"./chunks/rejectPurchaseOrders.js";import{c as ir,p as hr}from"./chunks/placeOrderForPurchaseOrder.js";import{h as P}from"./chunks/fetch-error.js";import{a as pr,c as or,g as lr,u as _r}from"./chunks/currencyInfo.js";import{d as nr,g as fr}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as gr}from"./chunks/getPurchaseOrders.js";import{g as Pr}from"./chunks/getPurchaseOrderApprovalRule.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const I=new v({init:async r=>{const a={};I.config.setConfig({...a,...r})},listeners:()=>[]}),k=I.config,x=`
  mutation VALIDATE_PURCHASE_ORDERS($input: ValidatePurchaseOrdersInput!) {
    validatePurchaseOrders(input: $input) {
      errors {
        message
        type
      }
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${S}
`,L=async r=>{const a=Array.isArray(r)?r:[r];if(!a||a.length===0)throw new Error("Purchase Order UID(s) are required");if(a.some(s=>!s||s.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return g(x,{variables:{input:{purchase_order_uids:a}}}).then(s=>{var t,i;(t=s.errors)!=null&&t.length&&P(s.errors);const e=(i=s.data)==null?void 0:i.validatePurchaseOrders;return{errors:((e==null?void 0:e.errors)??[]).map(d=>({message:(d==null?void 0:d.message)??"",type:(d==null?void 0:d.type)??""})),purchaseOrders:((e==null?void 0:e.purchase_orders)||[]).map(R)}}).catch(E)},U=`
  mutation ADD_PURCHASE_ORDER_COMMENT(
    $purchaseOrderUid: ID!
    $comment: String!
  ) {
    addPurchaseOrderComment(
      input: { purchase_order_uid: $purchaseOrderUid, comment: $comment }
    ) {
      comment {
        created_at
        text
        uid
        author {
          allow_remote_shopping_assistance
          confirmation_status
          created_at
          date_of_birth
          email
          firstname
          gender
          job_title
          lastname
          middlename
          prefix
          status
          structure_id
          suffix
          telephone
        }
      }
    }
  }
`,y=r=>{var h,s,e,t,i,d,p,o,l,_,c,n,f,O,A;const a=((s=(h=r==null?void 0:r.cart)==null?void 0:h.itemsV2)==null?void 0:s.items)??[];return{cart:{id:((e=r==null?void 0:r.cart)==null?void 0:e.id)??"",items:a.map(u=>{var C,D,w;return{uid:(u==null?void 0:u.uid)??"",quantity:(u==null?void 0:u.quantity)??0,product:{uid:((C=u==null?void 0:u.product)==null?void 0:C.uid)??"",name:((D=u==null?void 0:u.product)==null?void 0:D.name)??"",sku:((w=u==null?void 0:u.product)==null?void 0:w.sku)??""}}}),pagination:{currentPage:((d=(i=(t=r==null?void 0:r.cart)==null?void 0:t.itemsV2)==null?void 0:i.page_info)==null?void 0:d.current_page)??1,pageSize:((l=(o=(p=r==null?void 0:r.cart)==null?void 0:p.itemsV2)==null?void 0:o.page_info)==null?void 0:l.page_size)??20,totalPages:((n=(c=(_=r==null?void 0:r.cart)==null?void 0:_.itemsV2)==null?void 0:c.page_info)==null?void 0:n.total_pages)??0,totalCount:((O=(f=r==null?void 0:r.cart)==null?void 0:f.itemsV2)==null?void 0:O.total_count)??0}},userErrors:((A=r==null?void 0:r.user_errors)==null?void 0:A.map(u=>({message:(u==null?void 0:u.message)??""})))??[]}},T=r=>{var a,h,s,e,t,i,d,p,o,l,_,c,n,f,O;return{createdAt:(r==null?void 0:r.created_at)??"",text:(r==null?void 0:r.text)??"",uid:(r==null?void 0:r.uid)??"",author:{allowRemoteShoppingAssistance:((a=r==null?void 0:r.author)==null?void 0:a.allow_remote_shopping_assistance)??!1,confirmationStatus:((h=r==null?void 0:r.author)==null?void 0:h.confirmation_status)??"",createdAt:((s=r==null?void 0:r.author)==null?void 0:s.created_at)??"",dateOfBirth:((e=r==null?void 0:r.author)==null?void 0:e.date_of_birth)??"",email:((t=r==null?void 0:r.author)==null?void 0:t.email)??"",firstname:((i=r==null?void 0:r.author)==null?void 0:i.firstname)??"",gender:((d=r==null?void 0:r.author)==null?void 0:d.gender)??0,jobTitle:((p=r==null?void 0:r.author)==null?void 0:p.job_title)??"",lastname:((o=r==null?void 0:r.author)==null?void 0:o.lastname)??"",middlename:((l=r==null?void 0:r.author)==null?void 0:l.middlename)??"",prefix:((_=r==null?void 0:r.author)==null?void 0:_.prefix)??"",status:((c=r==null?void 0:r.author)==null?void 0:c.status)??"",structureId:((n=r==null?void 0:r.author)==null?void 0:n.structure_id)??"",suffix:((f=r==null?void 0:r.author)==null?void 0:f.suffix)??"",telephone:((O=r==null?void 0:r.author)==null?void 0:O.telephone)??""}}},Q=async(r,a)=>{if(!r)throw new Error("Purchase Order ID is required");if(!a)throw new Error("Comment text is required");return g(U,{variables:{purchaseOrderUid:r,comment:a}}).then(s=>{var e,t,i;return(e=s.errors)!=null&&e.length&&P(s.errors),T((i=(t=s.data)==null?void 0:t.addPurchaseOrderComment)==null?void 0:i.comment)}).catch(E)},b=`
  mutation ADD_PURCHASE_ORDER_ITEMS_TO_CART(
    $purchaseOrderUid: ID!
    $cartId: String!
    $replaceExistingCartItems: Boolean!
  ) {
    addPurchaseOrderItemsToCart(
      input: {
        purchase_order_uid: $purchaseOrderUid
        cart_id: $cartId
        replace_existing_cart_items: $replaceExistingCartItems
      }
    ) {
      cart {
        id
        itemsV2 {
          items {
            uid
            quantity
            product {
              uid
              name
              sku
            }
          }
          page_info {
            current_page
            page_size
            total_pages
          }
          total_count
        }
      }
    }
  }
`,B=async(r,a,h=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!a)throw new Error("Cart ID is required");return g(b,{variables:{purchaseOrderUid:r,cartId:a,replaceExistingCartItems:h}}).then(e=>{var i,d;(i=e.errors)!=null&&i.length&&P(e.errors);const t=(d=e.data)==null?void 0:d.addPurchaseOrderItemsToCart;if(!(t!=null&&t.cart))throw new Error("Failed to add purchase order items to cart");return y(t)}).catch(E)},$=`
  query GET_PURCHASE_ORDER($uid: ID!) {
    customer {
      purchase_order(uid: $uid) {
        uid
        number
        created_at
        updated_at
        status
        available_actions
        created_by {
          firstname
          lastname
          email
        }
        order {
          id
          number
          total {
            grand_total {
              value
              currency
            }
          }
        }
        quote {
          prices {
            grand_total {
              value
              currency
            }
          }
        }
      }
    }
  }
`,J=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return g($,{variables:{uid:r}}).then(a=>{var s,e,t;(s=a.errors)!=null&&s.length&&P(a.errors);const h=(t=(e=a.data)==null?void 0:e.customer)==null?void 0:t.purchase_order;if(!h)throw new Error("Failed to get purchase order");return{purchaseOrder:R(h)}}).catch(E)},H=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${S}
`,K=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return g(H,{variables:{input:{cart_id:r}}}).then(h=>{var e,t,i;(e=h.errors)!=null&&e.length&&P(h.errors);const s=(i=(t=h.data)==null?void 0:t.placePurchaseOrder)==null?void 0:i.purchase_order;return{purchaseOrder:R(s)}}).catch(E)};export{Q as addPurchaseOrderComment,B as addPurchaseOrderItemsToCart,sr as approvePurchaseOrders,ir as cancelPurchaseOrders,k as config,pr as createPurchaseOrderApprovalRule,or as currencyInfo,nr as deletePurchaseOrderApprovalRule,g as fetchGraphQl,Y as getConfig,J as getPurchaseOrder,Pr as getPurchaseOrderApprovalRule,lr as getPurchaseOrderApprovalRuleMetadata,fr as getPurchaseOrderApprovalRules,gr as getPurchaseOrders,I as initialize,hr as placeOrderForPurchaseOrder,K as placePurchaseOrder,tr as rejectPurchaseOrders,Z as removeFetchGraphQlHeader,m as setEndpoint,rr as setFetchGraphQlHeader,er as setFetchGraphQlHeaders,_r as updatePurchaseOrderApprovalRule,L as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
