/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as y}from"@dropins/tools/lib.js";import{f as P,h as A}from"./chunks/fetch-graphql.js";import{g as sr,r as ur,s as ir,a as nr,b as lr}from"./chunks/fetch-graphql.js";import{P as C,t as D}from"./chunks/getPurchaseOrders.js";import{a as pr,g as _r,r as cr}from"./chunks/getPurchaseOrders.js";import{h as a}from"./chunks/fetch-error.js";import{a as tr,c as Or,g as fr,u as Er}from"./chunks/currencyInfo.js";import{d as Rr,g as Pr}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as ar}from"./chunks/getPurchaseOrderApprovalRule.js";import"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/case-converter.js";import"./chunks/transform-purchase-order-approval-rule.js";const v=new y({init:async e=>{const n={};v.config.setConfig({...n,...e})},listeners:()=>[]}),k=v.config,T=`
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
  ${C}
`,J=async e=>{const n=Array.isArray(e)?e:[e];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(s=>!s||s.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return P(T,{variables:{input:{purchase_order_uids:n}}}).then(s=>{var l,o,_;(l=s.errors)!=null&&l.length&&a(s.errors);const i=(o=s.data)==null?void 0:o.cancelPurchaseOrders;if(!i)throw new Error("Failed to cancel purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(c=>({message:(c==null?void 0:c.message)??"",type:(c==null?void 0:c.type)??""})),purchaseOrders:((_=i==null?void 0:i.purchase_orders)==null?void 0:_.map(c=>D(c)))??[]}}).catch(A)},U=`
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
  ${C}
`,K=async e=>{const n=Array.isArray(e)?e:[e];if(!n||n.length===0)throw new Error("Purchase Order UID(s) are required");if(n.some(s=>!s||s.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return P(U,{variables:{input:{purchase_order_uids:n}}}).then(s=>{var l,o;(l=s.errors)!=null&&l.length&&a(s.errors);const i=(o=s.data)==null?void 0:o.validatePurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(_=>({message:(_==null?void 0:_.message)??"",type:(_==null?void 0:_.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)||[]).map(D)}}).catch(A)},q=`
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
`,$=e=>{var u,s,i,l,o,_,c,t,O,f,E,g,R,h,b;const n=((s=(u=e==null?void 0:e.cart)==null?void 0:u.itemsV2)==null?void 0:s.items)??[];return{cart:{id:((i=e==null?void 0:e.cart)==null?void 0:i.id)??"",items:n.map(p=>{var r,S,w;return{uid:(p==null?void 0:p.uid)??"",quantity:(p==null?void 0:p.quantity)??0,product:{uid:((r=p==null?void 0:p.product)==null?void 0:r.uid)??"",name:((S=p==null?void 0:p.product)==null?void 0:S.name)??"",sku:((w=p==null?void 0:p.product)==null?void 0:w.sku)??""}}}),pagination:{currentPage:((_=(o=(l=e==null?void 0:e.cart)==null?void 0:l.itemsV2)==null?void 0:o.page_info)==null?void 0:_.current_page)??1,pageSize:((O=(t=(c=e==null?void 0:e.cart)==null?void 0:c.itemsV2)==null?void 0:t.page_info)==null?void 0:O.page_size)??20,totalPages:((g=(E=(f=e==null?void 0:e.cart)==null?void 0:f.itemsV2)==null?void 0:E.page_info)==null?void 0:g.total_pages)??0,totalCount:((h=(R=e==null?void 0:e.cart)==null?void 0:R.itemsV2)==null?void 0:h.total_count)??0}},userErrors:((b=e==null?void 0:e.user_errors)==null?void 0:b.map(p=>({message:(p==null?void 0:p.message)??""})))??[]}},x=e=>{var b,p;const n=(p=(b=e.data)==null?void 0:b.placeOrderForPurchaseOrder)==null?void 0:p.order,u=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),s=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),i=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:u(r==null?void 0:r.applied_balance),currentBalance:u(r==null?void 0:r.current_balance)}),l=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),o=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),_=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:u(r==null?void 0:r.price),total:u(r==null?void 0:r.total)}),c=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),t=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),O=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),f=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(c),comments:((r==null?void 0:r.comments)||[]).map(t),items:((r==null?void 0:r.items)||[]).map(O)}),E=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),g=r=>({label:(r==null?void 0:r.label)||"",amount:u(r==null?void 0:r.amount)}),R=r=>({baseGrandTotal:u(r==null?void 0:r.base_grand_total),grandTotal:u(r==null?void 0:r.grand_total),subtotal:u(r==null?void 0:r.subtotal),totalTax:u(r==null?void 0:r.total_tax),totalShipping:u(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(g)}),h=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(s),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(i),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?l(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customAttributes:(r==null?void 0:r.custom_attributes)||[],customerInfo:r!=null&&r.customer_info?E(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(_),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(o),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(f),shippingAddress:r!=null&&r.shipping_address?l(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?R(r.total):{baseGrandTotal:u(null),grandTotal:u(null),subtotal:u(null),totalTax:u(null),totalShipping:u(null),discounts:[]}});return h(n||null)},I=e=>{var n,u,s,i,l,o,_,c,t,O,f,E,g,R,h;return{createdAt:(e==null?void 0:e.created_at)??"",text:(e==null?void 0:e.text)??"",uid:(e==null?void 0:e.uid)??"",author:{allowRemoteShoppingAssistance:((n=e==null?void 0:e.author)==null?void 0:n.allow_remote_shopping_assistance)??!1,confirmationStatus:((u=e==null?void 0:e.author)==null?void 0:u.confirmation_status)??"",createdAt:((s=e==null?void 0:e.author)==null?void 0:s.created_at)??"",dateOfBirth:((i=e==null?void 0:e.author)==null?void 0:i.date_of_birth)??"",email:((l=e==null?void 0:e.author)==null?void 0:l.email)??"",firstname:((o=e==null?void 0:e.author)==null?void 0:o.firstname)??"",gender:((_=e==null?void 0:e.author)==null?void 0:_.gender)??0,jobTitle:((c=e==null?void 0:e.author)==null?void 0:c.job_title)??"",lastname:((t=e==null?void 0:e.author)==null?void 0:t.lastname)??"",middlename:((O=e==null?void 0:e.author)==null?void 0:O.middlename)??"",prefix:((f=e==null?void 0:e.author)==null?void 0:f.prefix)??"",status:((E=e==null?void 0:e.author)==null?void 0:E.status)??"",structureId:((g=e==null?void 0:e.author)==null?void 0:g.structure_id)??"",suffix:((R=e==null?void 0:e.author)==null?void 0:R.suffix)??"",telephone:((h=e==null?void 0:e.author)==null?void 0:h.telephone)??""}}},X=async(e,n)=>{if(!e)throw new Error("Purchase Order ID is required");if(!n)throw new Error("Comment text is required");return P(q,{variables:{purchaseOrderUid:e,comment:n}}).then(s=>{var i,l,o;return(i=s.errors)!=null&&i.length&&a(s.errors),I((o=(l=s.data)==null?void 0:l.addPurchaseOrderComment)==null?void 0:o.comment)}).catch(A)},H=`
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
`,Y=async(e,n,u=!1)=>{if(!e)throw new Error("Purchase Order UID is required");if(!n)throw new Error("Cart ID is required");return P(H,{variables:{purchaseOrderUid:e,cartId:n,replaceExistingCartItems:u}}).then(i=>{var o,_;(o=i.errors)!=null&&o.length&&a(i.errors);const l=(_=i.data)==null?void 0:_.addPurchaseOrderItemsToCart;if(!(l!=null&&l.cart))throw new Error("Failed to add purchase order items to cart");return $(l)}).catch(A)},F=`
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
`,Z=async e=>{if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");return P(F,{variables:{uid:e}}).then(n=>{var s,i,l;(s=n.errors)!=null&&s.length&&a(n.errors);const u=(l=(i=n.data)==null?void 0:i.customer)==null?void 0:l.purchase_order;if(!u)throw new Error("Failed to get purchase order");return{purchaseOrder:D(u)}}).catch(A)},M=`
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
`,d=async e=>{var u;if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");const n={purchase_order_uid:e};try{const s=await P(M,{variables:{input:n}});return(u=s.errors)!=null&&u.length&&a(s.errors),x(s)}catch(s){throw A(s)}},G=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${C}
`,m=async e=>{if(!e||e.trim()==="")throw new Error("Cart ID is required");return P(G,{variables:{input:{cart_id:e}}}).then(u=>{var i,l,o;(i=u.errors)!=null&&i.length&&a(u.errors);const s=(o=(l=u.data)==null?void 0:l.placePurchaseOrder)==null?void 0:o.purchase_order;return{purchaseOrder:D(s)}}).catch(A)};export{X as addPurchaseOrderComment,Y as addPurchaseOrderItemsToCart,pr as approvePurchaseOrders,J as cancelPurchaseOrders,k as config,tr as createPurchaseOrderApprovalRule,Or as currencyInfo,Rr as deletePurchaseOrderApprovalRule,P as fetchGraphQl,sr as getConfig,Z as getPurchaseOrder,ar as getPurchaseOrderApprovalRule,fr as getPurchaseOrderApprovalRuleMetadata,Pr as getPurchaseOrderApprovalRules,_r as getPurchaseOrders,v as initialize,d as placeOrderForPurchaseOrder,m as placePurchaseOrder,cr as rejectPurchaseOrders,ur as removeFetchGraphQlHeader,ir as setEndpoint,nr as setFetchGraphQlHeader,lr as setFetchGraphQlHeaders,Er as updatePurchaseOrderApprovalRule,K as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
