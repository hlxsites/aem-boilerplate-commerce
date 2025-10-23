/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as U}from"@dropins/tools/lib.js";import{P as D,f as a,h as p,t as b,b as E}from"./chunks/getPurchaseOrders.js";import{a as cr,i as hr,g as or,r as lr,d as ar,s as pr,c as Er,e as Ar}from"./chunks/getPurchaseOrders.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";const S=new U({init:async e=>{const u={};S.config.setConfig({...u,...e})},listeners:()=>[]}),J=S.config,T=`
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
  ${D}
`,K=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(s=>!s||s.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return a(T,{variables:{input:{purchase_order_uids:u}}}).then(s=>{var n,c,h;(n=s.errors)!=null&&n.length&&p(s.errors);const t=(c=s.data)==null?void 0:c.cancelPurchaseOrders;if(!t)throw new Error("Failed to cancel purchase orders");return{errors:((t==null?void 0:t.errors)??[]).map(_=>({message:(_==null?void 0:_.message)??"",type:(_==null?void 0:_.type)??""})),purchaseOrders:((h=t==null?void 0:t.purchase_orders)==null?void 0:h.map(_=>b(_)))??[]}}).catch(E)},q=`
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
  ${D}
`,X=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(s=>!s||s.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return a(q,{variables:{input:{purchase_order_uids:u}}}).then(s=>{var n,c;(n=s.errors)!=null&&n.length&&p(s.errors);const t=(c=s.data)==null?void 0:c.validatePurchaseOrders;return{errors:((t==null?void 0:t.errors)??[]).map(h=>({message:(h==null?void 0:h.message)??"",type:(h==null?void 0:h.type)??""})),purchaseOrders:((t==null?void 0:t.purchase_orders)||[]).map(b)}}).catch(E)},x=`
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
`,H=e=>{var i,s,t,n,c,h,_,l,O,P,f,R,d,A,g;const u=((s=(i=e==null?void 0:e.cart)==null?void 0:i.itemsV2)==null?void 0:s.items)??[];return{cart:{id:((t=e==null?void 0:e.cart)==null?void 0:t.id)??"",items:u.map(o=>{var r,C,y;return{uid:(o==null?void 0:o.uid)??"",quantity:(o==null?void 0:o.quantity)??0,product:{uid:((r=o==null?void 0:o.product)==null?void 0:r.uid)??"",name:((C=o==null?void 0:o.product)==null?void 0:C.name)??"",sku:((y=o==null?void 0:o.product)==null?void 0:y.sku)??""}}}),pagination:{currentPage:((h=(c=(n=e==null?void 0:e.cart)==null?void 0:n.itemsV2)==null?void 0:c.page_info)==null?void 0:h.current_page)??1,pageSize:((O=(l=(_=e==null?void 0:e.cart)==null?void 0:_.itemsV2)==null?void 0:l.page_info)==null?void 0:O.page_size)??20,totalPages:((R=(f=(P=e==null?void 0:e.cart)==null?void 0:P.itemsV2)==null?void 0:f.page_info)==null?void 0:R.total_pages)??0,totalCount:((A=(d=e==null?void 0:e.cart)==null?void 0:d.itemsV2)==null?void 0:A.total_count)??0}},userErrors:((g=e==null?void 0:e.user_errors)==null?void 0:g.map(o=>({message:(o==null?void 0:o.message)??""})))??[]}},$=e=>{var g,o;const u=(o=(g=e.data)==null?void 0:g.placeOrderForPurchaseOrder)==null?void 0:o.order,i=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),s=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),t=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:i(r==null?void 0:r.applied_balance),currentBalance:i(r==null?void 0:r.current_balance)}),n=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),c=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),h=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:i(r==null?void 0:r.price),total:i(r==null?void 0:r.total)}),_=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),l=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),O=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),P=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(_),comments:((r==null?void 0:r.comments)||[]).map(l),items:((r==null?void 0:r.items)||[]).map(O)}),f=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),R=r=>({label:(r==null?void 0:r.label)||"",amount:i(r==null?void 0:r.amount)}),d=r=>({baseGrandTotal:i(r==null?void 0:r.base_grand_total),grandTotal:i(r==null?void 0:r.grand_total),subtotal:i(r==null?void 0:r.subtotal),totalTax:i(r==null?void 0:r.total_tax),totalShipping:i(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(R)}),A=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(s),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(t),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?n(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customAttributes:(r==null?void 0:r.custom_attributes)||[],customerInfo:r!=null&&r.customer_info?f(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(h),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(c),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(P),shippingAddress:r!=null&&r.shipping_address?n(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?d(r.total):{baseGrandTotal:i(null),grandTotal:i(null),subtotal:i(null),totalTax:i(null),totalShipping:i(null),discounts:[]}});return A(u||null)},I=e=>{var c,h;const u=(h=(c=e==null?void 0:e.data)==null?void 0:c.customer)==null?void 0:h.purchase_order_approval_rule_metadata,i=_=>{var l;return{id:(_==null?void 0:_.id)||"",sortOrder:(_==null?void 0:_.sort_order)||0,text:(_==null?void 0:_.text)||"",children:((l=_==null?void 0:_.children)==null?void 0:l.map(i))||void 0}},s=_=>({id:(_==null?void 0:_.id)||"",name:(_==null?void 0:_.name)||"",usersCount:(_==null?void 0:_.users_count)||0,permissions:((_==null?void 0:_.permissions)||[]).map(i)}),t=((u==null?void 0:u.available_applies_to)||[]).map(s),n=((u==null?void 0:u.available_requires_approval_from)||[]).map(s);return{availableAppliesTo:t,availableRequiresApprovalFrom:n}},w=e=>{const u=s=>({id:(s==null?void 0:s.id)||"",name:(s==null?void 0:s.name)||"",usersCount:(s==null?void 0:s.users_count)||0,permissions:((s==null?void 0:s.permissions)||[]).map(t=>({id:(t==null?void 0:t.id)||"",sortOrder:(t==null?void 0:t.sort_order)||0,text:(t==null?void 0:t.text)||""}))}),i=s=>({attribute:s==null?void 0:s.attribute,operator:s==null?void 0:s.operator});return{uid:(e==null?void 0:e.uid)||"",name:(e==null?void 0:e.name)||"",description:(e==null?void 0:e.description)||"",status:e==null?void 0:e.status,createdAt:(e==null?void 0:e.created_at)||"",updatedAt:(e==null?void 0:e.updated_at)||"",createdBy:e==null?void 0:e.created_by,appliesToRoles:((e==null?void 0:e.applies_to_roles)||[]).map(u),approverRoles:((e==null?void 0:e.approver_roles)||[]).map(u),condition:i((e==null?void 0:e.condition)||{})}},v=e=>{var u,i,s,t,n,c,h,_,l,O,P,f,R,d,A;return{createdAt:(e==null?void 0:e.created_at)??"",text:(e==null?void 0:e.text)??"",uid:(e==null?void 0:e.uid)??"",author:{allowRemoteShoppingAssistance:((u=e==null?void 0:e.author)==null?void 0:u.allow_remote_shopping_assistance)??!1,confirmationStatus:((i=e==null?void 0:e.author)==null?void 0:i.confirmation_status)??"",createdAt:((s=e==null?void 0:e.author)==null?void 0:s.created_at)??"",dateOfBirth:((t=e==null?void 0:e.author)==null?void 0:t.date_of_birth)??"",email:((n=e==null?void 0:e.author)==null?void 0:n.email)??"",firstname:((c=e==null?void 0:e.author)==null?void 0:c.firstname)??"",gender:((h=e==null?void 0:e.author)==null?void 0:h.gender)??0,jobTitle:((_=e==null?void 0:e.author)==null?void 0:_.job_title)??"",lastname:((l=e==null?void 0:e.author)==null?void 0:l.lastname)??"",middlename:((O=e==null?void 0:e.author)==null?void 0:O.middlename)??"",prefix:((P=e==null?void 0:e.author)==null?void 0:P.prefix)??"",status:((f=e==null?void 0:e.author)==null?void 0:f.status)??"",structureId:((R=e==null?void 0:e.author)==null?void 0:R.structure_id)??"",suffix:((d=e==null?void 0:e.author)==null?void 0:d.suffix)??"",telephone:((A=e==null?void 0:e.author)==null?void 0:A.telephone)??""}}},Y=async(e,u)=>{if(!e)throw new Error("Purchase Order ID is required");if(!u)throw new Error("Comment text is required");return a(x,{variables:{purchaseOrderUid:e,comment:u}}).then(s=>{var t,n,c;return(t=s.errors)!=null&&t.length&&p(s.errors),v((c=(n=s.data)==null?void 0:n.addPurchaseOrderComment)==null?void 0:c.comment)}).catch(E)},L=`
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
`,Z=async(e,u,i=!1)=>{if(!e)throw new Error("Purchase Order UID is required");if(!u)throw new Error("Cart ID is required");return a(L,{variables:{purchaseOrderUid:e,cartId:u,replaceExistingCartItems:i}}).then(t=>{var c,h;(c=t.errors)!=null&&c.length&&p(t.errors);const n=(h=t.data)==null?void 0:h.addPurchaseOrderItemsToCart;if(!(n!=null&&n.cart))throw new Error("Failed to add purchase order items to cart");return H(n)}).catch(E)},F=`
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
`,m=async e=>{if(!e.name||e.name.trim()==="")throw new Error("Rule name is required");return a(F,{variables:{input:e}}).then(u=>{var s,t;if((s=u.errors)!=null&&s.length&&p(u.errors),!((t=u.data)==null?void 0:t.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return w(u.data.createPurchaseOrderApprovalRule)}).catch(E)},M=`
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
`,rr=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Approval Rule UID(s) are required");if(u.some(s=>!s||s.trim()===""))throw new Error("All Approval Rule UIDs must be valid");return a(M,{variables:{input:{approval_rule_uids:u}}}).then(s=>{var c,h,_;if((c=s.errors)!=null&&c.length&&p(s.errors),!((h=s.data)==null?void 0:h.deletePurchaseOrderApprovalRule))throw new Error("Failed to delete purchase order approval rule");const n=(_=s==null?void 0:s.data)==null?void 0:_.deletePurchaseOrderApprovalRule;return{deletePurchaseOrderApprovalRule:{errors:((n==null?void 0:n.errors)??[]).map(l=>({message:l==null?void 0:l.message,type:l==null?void 0:l.type}))}}}).catch(E)},V=`
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
`,er=async e=>{if(!e.uid||e.uid.trim()==="")throw new Error("Approval Rule UID is required");return a(V,{variables:{input:e}}).then(u=>{var i,s;return(i=u.errors)!=null&&i.length&&p(u.errors),w(((s=u.data)==null?void 0:s.updatePurchaseOrderApprovalRule)||{})}).catch(E)},G=`
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
`,sr=async e=>{if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");return a(G,{variables:{uid:e}}).then(u=>{var s,t,n;(s=u.errors)!=null&&s.length&&p(u.errors);const i=(n=(t=u.data)==null?void 0:t.customer)==null?void 0:n.purchase_order;if(!i)throw new Error("Failed to get purchase order");return{purchaseOrder:b(i)}}).catch(E)},N=`
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
`,ur=async e=>{var i;if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");const u={purchase_order_uid:e};try{const s=await a(N,{variables:{input:u}});return(i=s.errors)!=null&&i.length&&p(s.errors),$(s)}catch(s){throw E(s)}},z=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${D}
`,tr=async e=>{if(!e||e.trim()==="")throw new Error("Cart ID is required");return a(z,{variables:{input:{cart_id:e}}}).then(i=>{var t,n,c;(t=i.errors)!=null&&t.length&&p(i.errors);const s=(c=(n=i.data)==null?void 0:n.placePurchaseOrder)==null?void 0:c.purchase_order;return{purchaseOrder:b(s)}}).catch(E)},B=`
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
`,ir=async()=>a(B,{variables:{}}).then(e=>{var u;return(u=e.errors)!=null&&u.length&&p(e.errors),I(e)}).catch(E);export{Y as addPurchaseOrderComment,Z as addPurchaseOrderItemsToCart,cr as approvePurchaseOrders,K as cancelPurchaseOrders,J as config,m as createPurchaseOrderApprovalRule,rr as deletePurchaseOrderApprovalRule,a as fetchGraphQl,hr as getConfig,sr as getPurchaseOrder,ir as getPurchaseOrderApprovalRuleMetadata,or as getPurchaseOrders,S as initialize,ur as placeOrderForPurchaseOrder,tr as placePurchaseOrder,lr as rejectPurchaseOrders,ar as removeFetchGraphQlHeader,pr as setEndpoint,Er as setFetchGraphQlHeader,Ar as setFetchGraphQlHeaders,er as updatePurchaseOrderApprovalRule,X as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
