/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as y}from"@dropins/tools/lib.js";import{f as a,h,a as R}from"./chunks/fetch-graphql.js";import{g as or,r as lr,s as cr,b as pr,c as ar}from"./chunks/fetch-graphql.js";import{P as d,t as v}from"./chunks/getPurchaseOrders.js";import{a as Rr,g as Er,r as Or}from"./chunks/getPurchaseOrders.js";import{t as S}from"./chunks/getPurchaseOrderApprovalRules.js";import{d as Pr,g as fr}from"./chunks/getPurchaseOrderApprovalRules.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const w=new y({init:async e=>{const s={};w.config.setConfig({...s,...e})},listeners:()=>[]}),K=w.config,U=`
  mutation CANCEL_PURCHASE_ORDERS($input: PurchaseOrdersActionInput!) {
    cancelPurchaseOrders(input: $input) {
      purchase_orders {
        ...PURCHASE_ORDERS_FRAGMENT
      }
      errors {
        message
        type
      }
    }
  }
  ${d}
`,X=async e=>{const s=Array.isArray(e)?e:[e];if(!s||s.length===0)throw new Error("Purchase Order UID(s) are required");if(s.some(u=>!u||u.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return a(U,{variables:{input:{purchase_order_uids:s}}}).then(u=>{var t,o,l;(t=u.errors)!=null&&t.length&&h(u.errors);const _=(o=u.data)==null?void 0:o.cancelPurchaseOrders;if(!_)throw new Error("Failed to cancel purchase orders");return{errors:((_==null?void 0:_.errors)??[]).map(n=>({message:(n==null?void 0:n.message)??"",type:(n==null?void 0:n.type)??""})),purchaseOrders:((l=_==null?void 0:_.purchase_orders)==null?void 0:l.map(n=>v(n)))??[]}}).catch(R)},T=`
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
  ${d}
`,Y=async e=>{const s=Array.isArray(e)?e:[e];if(!s||s.length===0)throw new Error("Purchase Order UID(s) are required");if(s.some(u=>!u||u.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return a(T,{variables:{input:{purchase_order_uids:s}}}).then(u=>{var t,o;(t=u.errors)!=null&&t.length&&h(u.errors);const _=(o=u.data)==null?void 0:o.validatePurchaseOrders;return{errors:((_==null?void 0:_.errors)??[]).map(l=>({message:(l==null?void 0:l.message)??"",type:(l==null?void 0:l.type)??""})),purchaseOrders:((_==null?void 0:_.purchase_orders)||[]).map(v)}}).catch(R)},q=`
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
`,x=e=>{var i,u,_,t,o,l,n,p,O,A,P,f,g,E,b;const s=((u=(i=e==null?void 0:e.cart)==null?void 0:i.itemsV2)==null?void 0:u.items)??[];return{cart:{id:((_=e==null?void 0:e.cart)==null?void 0:_.id)??"",items:s.map(c=>{var r,D,C;return{uid:(c==null?void 0:c.uid)??"",quantity:(c==null?void 0:c.quantity)??0,product:{uid:((r=c==null?void 0:c.product)==null?void 0:r.uid)??"",name:((D=c==null?void 0:c.product)==null?void 0:D.name)??"",sku:((C=c==null?void 0:c.product)==null?void 0:C.sku)??""}}}),pagination:{currentPage:((l=(o=(t=e==null?void 0:e.cart)==null?void 0:t.itemsV2)==null?void 0:o.page_info)==null?void 0:l.current_page)??1,pageSize:((O=(p=(n=e==null?void 0:e.cart)==null?void 0:n.itemsV2)==null?void 0:p.page_info)==null?void 0:O.page_size)??20,totalPages:((f=(P=(A=e==null?void 0:e.cart)==null?void 0:A.itemsV2)==null?void 0:P.page_info)==null?void 0:f.total_pages)??0,totalCount:((E=(g=e==null?void 0:e.cart)==null?void 0:g.itemsV2)==null?void 0:E.total_count)??0}},userErrors:((b=e==null?void 0:e.user_errors)==null?void 0:b.map(c=>({message:(c==null?void 0:c.message)??""})))??[]}},H=e=>{var b,c;const s=(c=(b=e.data)==null?void 0:b.placeOrderForPurchaseOrder)==null?void 0:c.order,i=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),u=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),_=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:i(r==null?void 0:r.applied_balance),currentBalance:i(r==null?void 0:r.current_balance)}),t=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),o=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),l=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:i(r==null?void 0:r.price),total:i(r==null?void 0:r.total)}),n=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),p=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),O=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),A=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(n),comments:((r==null?void 0:r.comments)||[]).map(p),items:((r==null?void 0:r.items)||[]).map(O)}),P=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),f=r=>({label:(r==null?void 0:r.label)||"",amount:i(r==null?void 0:r.amount)}),g=r=>({baseGrandTotal:i(r==null?void 0:r.base_grand_total),grandTotal:i(r==null?void 0:r.grand_total),subtotal:i(r==null?void 0:r.subtotal),totalTax:i(r==null?void 0:r.total_tax),totalShipping:i(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(f)}),E=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(u),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(_),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?t(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customAttributes:(r==null?void 0:r.custom_attributes)||[],customerInfo:r!=null&&r.customer_info?P(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(l),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(o),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(A),shippingAddress:r!=null&&r.shipping_address?t(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?g(r.total):{baseGrandTotal:i(null),grandTotal:i(null),subtotal:i(null),totalTax:i(null),totalShipping:i(null),discounts:[]}});return E(s||null)},$=e=>{var o,l;const s=(l=(o=e==null?void 0:e.data)==null?void 0:o.customer)==null?void 0:l.purchase_order_approval_rule_metadata,i=n=>{var p;return{id:(n==null?void 0:n.id)||"",sortOrder:(n==null?void 0:n.sort_order)||0,text:(n==null?void 0:n.text)||"",children:((p=n==null?void 0:n.children)==null?void 0:p.map(i))||void 0}},u=n=>({id:(n==null?void 0:n.id)||"",name:(n==null?void 0:n.name)||"",usersCount:(n==null?void 0:n.users_count)||0,permissions:((n==null?void 0:n.permissions)||[]).map(i)}),_=((s==null?void 0:s.available_applies_to)||[]).map(u),t=((s==null?void 0:s.available_requires_approval_from)||[]).map(u);return{availableAppliesTo:_,availableRequiresApprovalFrom:t}},I=e=>{var s,i,u,_,t,o,l,n,p,O,A,P,f,g,E;return{createdAt:(e==null?void 0:e.created_at)??"",text:(e==null?void 0:e.text)??"",uid:(e==null?void 0:e.uid)??"",author:{allowRemoteShoppingAssistance:((s=e==null?void 0:e.author)==null?void 0:s.allow_remote_shopping_assistance)??!1,confirmationStatus:((i=e==null?void 0:e.author)==null?void 0:i.confirmation_status)??"",createdAt:((u=e==null?void 0:e.author)==null?void 0:u.created_at)??"",dateOfBirth:((_=e==null?void 0:e.author)==null?void 0:_.date_of_birth)??"",email:((t=e==null?void 0:e.author)==null?void 0:t.email)??"",firstname:((o=e==null?void 0:e.author)==null?void 0:o.firstname)??"",gender:((l=e==null?void 0:e.author)==null?void 0:l.gender)??0,jobTitle:((n=e==null?void 0:e.author)==null?void 0:n.job_title)??"",lastname:((p=e==null?void 0:e.author)==null?void 0:p.lastname)??"",middlename:((O=e==null?void 0:e.author)==null?void 0:O.middlename)??"",prefix:((A=e==null?void 0:e.author)==null?void 0:A.prefix)??"",status:((P=e==null?void 0:e.author)==null?void 0:P.status)??"",structureId:((f=e==null?void 0:e.author)==null?void 0:f.structure_id)??"",suffix:((g=e==null?void 0:e.author)==null?void 0:g.suffix)??"",telephone:((E=e==null?void 0:e.author)==null?void 0:E.telephone)??""}}},Z=async(e,s)=>{if(!e)throw new Error("Purchase Order ID is required");if(!s)throw new Error("Comment text is required");return a(q,{variables:{purchaseOrderUid:e,comment:s}}).then(u=>{var _,t,o;return(_=u.errors)!=null&&_.length&&h(u.errors),I((o=(t=u.data)==null?void 0:t.addPurchaseOrderComment)==null?void 0:o.comment)}).catch(R)},F=`
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
`,m=async(e,s,i=!1)=>{if(!e)throw new Error("Purchase Order UID is required");if(!s)throw new Error("Cart ID is required");return a(F,{variables:{purchaseOrderUid:e,cartId:s,replaceExistingCartItems:i}}).then(_=>{var o,l;(o=_.errors)!=null&&o.length&&h(_.errors);const t=(l=_.data)==null?void 0:l.addPurchaseOrderItemsToCart;if(!(t!=null&&t.cart))throw new Error("Failed to add purchase order items to cart");return x(t)}).catch(R)},L=`
  mutation CREATE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: PurchaseOrderApprovalRuleInput!
  ) {
    createPurchaseOrderApprovalRule(input: $input) {
      created_at
      created_by
      description
      name
      status
      uid
      updated_at
      applies_to_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
      condition {
        attribute
        operator
      }
      approver_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
    }
  }
`,rr=async e=>{if(!e.name||e.name.trim()==="")throw new Error("Rule name is required");return a(L,{variables:{input:e}}).then(s=>{var u,_;if((u=s.errors)!=null&&u.length&&h(s.errors),!((_=s.data)==null?void 0:_.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return S(s.data.createPurchaseOrderApprovalRule)}).catch(R)},M=`
  mutation UPDATE_PURCHASE_ORDER_APPROVAL_RULE(
    $input: UpdatePurchaseOrderApprovalRuleInput!
  ) {
    updatePurchaseOrderApprovalRule(input: $input) {
      created_at
      created_by
      description
      name
      status
      uid
      updated_at
      applies_to_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
      condition {
        attribute
        operator
      }
      approver_roles {
        id
        name
        users_count
        permissions {
          id
          sort_order
          text
        }
      }
    }
  }
`,er=async e=>{if(!e.uid||e.uid.trim()==="")throw new Error("Approval Rule UID is required");return a(M,{variables:{input:e}}).then(s=>{var i,u;return(i=s.errors)!=null&&i.length&&h(s.errors),S(((u=s.data)==null?void 0:u.updatePurchaseOrderApprovalRule)||{})}).catch(R)},G=`
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
`,sr=async e=>{if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");return a(G,{variables:{uid:e}}).then(s=>{var u,_,t;(u=s.errors)!=null&&u.length&&h(s.errors);const i=(t=(_=s.data)==null?void 0:_.customer)==null?void 0:t.purchase_order;if(!i)throw new Error("Failed to get purchase order");return{purchaseOrder:v(i)}}).catch(R)},V=`
  mutation PLACE_ORDER_FOR_PURCHASE_ORDER(
    $input: PlaceOrderForPurchaseOrderInput!
  ) {
    placeOrderForPurchaseOrder(input: $input) {
      order {
        available_actions
        carrier
        email
        gift_receipt_included
        id
        is_virtual
        number
        order_date
        order_status_change_date
        printed_card_included
        shipping_method
        status
        token
      }
    }
  }
`,ur=async e=>{var i;if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");const s={purchase_order_uid:e};try{const u=await a(V,{variables:{input:s}});return(i=u.errors)!=null&&i.length&&h(u.errors),H(u)}catch(u){throw R(u)}},N=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${d}
`,ir=async e=>{if(!e||e.trim()==="")throw new Error("Cart ID is required");return a(N,{variables:{input:{cart_id:e}}}).then(i=>{var _,t,o;(_=i.errors)!=null&&_.length&&h(i.errors);const u=(o=(t=i.data)==null?void 0:t.placePurchaseOrder)==null?void 0:o.purchase_order;return{purchaseOrder:v(u)}}).catch(R)},z=`
  query GET_PURCHASE_ORDER_APPROVAL_RULE_METADATA {
    customer {
      purchase_order_approval_rule_metadata {
        available_applies_to {
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
        available_requires_approval_from {
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
      }
    }
  }
`,nr=async()=>a(z,{variables:{}}).then(e=>{var s;return(s=e.errors)!=null&&s.length&&h(e.errors),$(e)}).catch(R);export{Z as addPurchaseOrderComment,m as addPurchaseOrderItemsToCart,Rr as approvePurchaseOrders,X as cancelPurchaseOrders,K as config,rr as createPurchaseOrderApprovalRule,Pr as deletePurchaseOrderApprovalRule,a as fetchGraphQl,or as getConfig,sr as getPurchaseOrder,nr as getPurchaseOrderApprovalRuleMetadata,fr as getPurchaseOrderApprovalRules,Er as getPurchaseOrders,w as initialize,ur as placeOrderForPurchaseOrder,ir as placePurchaseOrder,Or as rejectPurchaseOrders,lr as removeFetchGraphQlHeader,cr as setEndpoint,pr as setFetchGraphQlHeader,ar as setFetchGraphQlHeaders,er as updatePurchaseOrderApprovalRule,Y as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
