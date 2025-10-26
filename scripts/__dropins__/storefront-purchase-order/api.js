/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as S}from"@dropins/tools/lib.js";import{f as p,h,t as y,b as d,P as R}from"./chunks/getPurchaseOrders.js";import{a as lr,i as or,g as pr,r as hr,d as dr,s as Er,c as fr,e as Or}from"./chunks/getPurchaseOrders.js";import{events as x}from"@dropins/tools/event-bus.js";import"@dropins/tools/fetch-graphql.js";const U=`
  fragment PURCHASE_ORDER_QUOTE_FRAGMENT on Cart {
    __typename
    id
    email
    is_virtual
    total_quantity
    applied_coupons {
      code
    }
    applied_gift_cards {
      code
      applied_balance {
        value
        currency
      }
      current_balance {
        value
        currency
      }
      expiration_date
    }
    applied_reward_points {
      money {
        value
        currency
      }
      points
    }
    applied_store_credit {
      applied_balance {
        value
        currency
      }
      current_balance {
        value
        currency
      }
    }
    available_gift_wrappings {
      uid
      design
      price {
        value
        currency
      }
      image {
        url
        label
      }
    }
    gift_message {
      from
      to
      message
    }
    gift_receipt_included
    gift_wrapping {
      uid
      design
      price {
        value
        currency
      }
      image {
        url
        label
      }
    }
    printed_card_included
    available_payment_methods {
      code
      title
      is_deferred
      oope_payment_method_config {
        custom_config {
          key
        }
      }
    }
    selected_payment_method {
      code
      title
    }
    billing_address {
      city
      company
      country {
        code
        label
      }
      firstname
      lastname
      postcode
      region {
        code
        label
      }
      street
      telephone
      custom_attributes {
        code
      }
      fax
      id
      middlename
      prefix
      suffix
      uid
      vat_id
    }
    shipping_addresses {
      city
      company
      country {
        code
        label
      }
      firstname
      lastname
      postcode
      region {
        code
        label
      }
      street
      telephone
      custom_attributes {
        code
      }
      fax
      id
      middlename
      prefix
      suffix
      uid
      vat_id
      available_shipping_methods {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
      selected_shipping_method {
        amount {
          value
          currency
        }
        carrier_code
        carrier_title
        method_code
        method_title
      }
    }
    custom_attributes {
      attribute_code
      value
    }
    rules {
      uid
    }
    itemsV2(pageSize: 100, currentPage: 1) {
      items {
        uid
        quantity
        product {
          __typename
          uid
          name
          sku
          url_key
          canonical_url
          stock_status
          only_x_left_in_stock
          image {
            url
            label
          }
          small_image {
            url
            label
          }
          thumbnail {
            url
            label
          }
          price_range {
            maximum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
          }
        }
        prices {
          price {
            value
            currency
          }
          price_including_tax {
            value
            currency
          }
          original_item_price {
            value
            currency
          }
          original_row_total {
            value
            currency
          }
          row_total {
            value
            currency
          }
          row_total_including_tax {
            value
            currency
          }
          total_item_discount {
            value
            currency
          }
          discounts {
            label
            amount {
              value
              currency
            }
          }
          fixed_product_taxes {
            label
            amount {
              value
              currency
            }
          }
        }
        ... on SimpleCartItem {
          customizable_options {
            label
            values {
              label
              value
            }
          }
        }
        ... on ConfigurableCartItem {
          configurable_options {
            option_label
            value_label
          }
        }
        ... on BundleCartItem {
          bundle_options {
            uid
            label
            type
            values {
              uid
              label
              quantity
            }
          }
        }
        ... on DownloadableCartItem {
          links {
            uid
            title
          }
        }
        ... on GiftCardCartItem {
          sender_name
          sender_email
          recipient_name
          recipient_email
          message
          amount {
            value
            currency
          }
        }
        custom_attributes {
          attribute_code
          value
        }
        errors {
          code
          message
        }
        is_available
        max_qty
        min_qty
        not_available_message
        note_from_buyer {
          note_uid
          note
          created_at
        }
        note_from_seller {
          note_uid
          note
          created_at
        }
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
    prices {
      grand_total {
        value
        currency
      }
      grand_total_excluding_tax {
        value
        currency
      }
      subtotal_excluding_tax {
        value
        currency
      }
      subtotal_including_tax {
        value
        currency
      }
      subtotal_with_discount_excluding_tax {
        value
        currency
      }
      applied_taxes {
        label
        amount {
          value
          currency
        }
      }
      discounts {
        label
        amount {
          value
          currency
        }
      }
      gift_options {
        gift_wrapping_for_items {
          value
          currency
        }
        gift_wrapping_for_items_incl_tax {
          value
          currency
        }
        gift_wrapping_for_order {
          value
          currency
        }
        gift_wrapping_for_order_incl_tax {
          value
          currency
        }
        printed_card {
          value
          currency
        }
        printed_card_incl_tax {
          value
          currency
        }
      }
    }
  }
`,T=`
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
          ...PURCHASE_ORDER_QUOTE_FRAGMENT
        }
      }
    }
  }
  ${U}
`,q=async e=>{if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");return p(T,{variables:{uid:e}}).then(u=>{var t,s,n;(t=u.errors)!=null&&t.length&&h(u.errors);const i=(n=(s=u.data)==null?void 0:s.customer)==null?void 0:n.purchase_order;if(!i)throw new Error("Failed to get purchase order");return{purchaseOrder:y(i)}}).catch(d)},D=new S({init:async e=>{var t,s,n;const u={};if(D.config.setConfig({...u,...e}),[typeof(e==null?void 0:e.poRef)=="string",((t=e==null?void 0:e.poRef)==null?void 0:t.trim())!==""].every(Boolean)){const c=await q((e==null?void 0:e.poRef)??"");(s=c==null?void 0:c.purchaseOrder)!=null&&s.quote&&x.emit("order/data",{...c.purchaseOrder.quote,poNumber:(n=c==null?void 0:c.purchaseOrder)==null?void 0:n.number})}},listeners:()=>[]}),Y=D.config,H=`
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
  ${R}
`,Z=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return p(H,{variables:{input:{purchase_order_uids:u}}}).then(t=>{var n,c,a;(n=t.errors)!=null&&n.length&&h(t.errors);const s=(c=t.data)==null?void 0:c.cancelPurchaseOrders;if(!s)throw new Error("Failed to cancel purchase orders");return{errors:((s==null?void 0:s.errors)??[]).map(_=>({message:(_==null?void 0:_.message)??"",type:(_==null?void 0:_.type)??""})),purchaseOrders:((a=s==null?void 0:s.purchase_orders)==null?void 0:a.map(_=>y(_)))??[]}}).catch(d)},I=`
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
  ${R}
`,m=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return p(I,{variables:{input:{purchase_order_uids:u}}}).then(t=>{var n,c;(n=t.errors)!=null&&n.length&&h(t.errors);const s=(c=t.data)==null?void 0:c.validatePurchaseOrders;return{errors:((s==null?void 0:s.errors)??[]).map(a=>({message:(a==null?void 0:a.message)??"",type:(a==null?void 0:a.type)??""})),purchaseOrders:((s==null?void 0:s.purchase_orders)||[]).map(y)}}).catch(d)},$=`
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
`,L=e=>{var i,t,s,n,c,a,_,o,f,O,A,g,P,E,b;const u=((t=(i=e==null?void 0:e.cart)==null?void 0:i.itemsV2)==null?void 0:t.items)??[];return{cart:{id:((s=e==null?void 0:e.cart)==null?void 0:s.id)??"",items:u.map(l=>{var r,v,C;return{uid:(l==null?void 0:l.uid)??"",quantity:(l==null?void 0:l.quantity)??0,product:{uid:((r=l==null?void 0:l.product)==null?void 0:r.uid)??"",name:((v=l==null?void 0:l.product)==null?void 0:v.name)??"",sku:((C=l==null?void 0:l.product)==null?void 0:C.sku)??""}}}),pagination:{currentPage:((a=(c=(n=e==null?void 0:e.cart)==null?void 0:n.itemsV2)==null?void 0:c.page_info)==null?void 0:a.current_page)??1,pageSize:((f=(o=(_=e==null?void 0:e.cart)==null?void 0:_.itemsV2)==null?void 0:o.page_info)==null?void 0:f.page_size)??20,totalPages:((g=(A=(O=e==null?void 0:e.cart)==null?void 0:O.itemsV2)==null?void 0:A.page_info)==null?void 0:g.total_pages)??0,totalCount:((E=(P=e==null?void 0:e.cart)==null?void 0:P.itemsV2)==null?void 0:E.total_count)??0}},userErrors:((b=e==null?void 0:e.user_errors)==null?void 0:b.map(l=>({message:(l==null?void 0:l.message)??""})))??[]}},F=e=>{var b,l;const u=(l=(b=e.data)==null?void 0:b.placeOrderForPurchaseOrder)==null?void 0:l.order,i=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),t=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),s=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:i(r==null?void 0:r.applied_balance),currentBalance:i(r==null?void 0:r.current_balance)}),n=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),c=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),a=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:i(r==null?void 0:r.price),total:i(r==null?void 0:r.total)}),_=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),o=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),f=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),O=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(_),comments:((r==null?void 0:r.comments)||[]).map(o),items:((r==null?void 0:r.items)||[]).map(f)}),A=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),g=r=>({label:(r==null?void 0:r.label)||"",amount:i(r==null?void 0:r.amount)}),P=r=>({baseGrandTotal:i(r==null?void 0:r.base_grand_total),grandTotal:i(r==null?void 0:r.grand_total),subtotal:i(r==null?void 0:r.subtotal),totalTax:i(r==null?void 0:r.total_tax),totalShipping:i(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(g)}),E=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(t),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(s),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?n(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customAttributes:(r==null?void 0:r.custom_attributes)||[],customerInfo:r!=null&&r.customer_info?A(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(a),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(c),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(O),shippingAddress:r!=null&&r.shipping_address?n(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?P(r.total):{baseGrandTotal:i(null),grandTotal:i(null),subtotal:i(null),totalTax:i(null),totalShipping:i(null),discounts:[]}});return E(u||null)},M=e=>{var c,a;const u=(a=(c=e==null?void 0:e.data)==null?void 0:c.customer)==null?void 0:a.purchase_order_approval_rule_metadata,i=_=>{var o;return{id:(_==null?void 0:_.id)||"",sortOrder:(_==null?void 0:_.sort_order)||0,text:(_==null?void 0:_.text)||"",children:((o=_==null?void 0:_.children)==null?void 0:o.map(i))||void 0}},t=_=>({id:(_==null?void 0:_.id)||"",name:(_==null?void 0:_.name)||"",usersCount:(_==null?void 0:_.users_count)||0,permissions:((_==null?void 0:_.permissions)||[]).map(i)}),s=((u==null?void 0:u.available_applies_to)||[]).map(t),n=((u==null?void 0:u.available_requires_approval_from)||[]).map(t);return{availableAppliesTo:s,availableRequiresApprovalFrom:n}},w=e=>{const u=t=>({id:(t==null?void 0:t.id)||"",name:(t==null?void 0:t.name)||"",usersCount:(t==null?void 0:t.users_count)||0,permissions:((t==null?void 0:t.permissions)||[]).map(s=>({id:(s==null?void 0:s.id)||"",sortOrder:(s==null?void 0:s.sort_order)||0,text:(s==null?void 0:s.text)||""}))}),i=t=>({attribute:t==null?void 0:t.attribute,operator:t==null?void 0:t.operator});return{uid:(e==null?void 0:e.uid)||"",name:(e==null?void 0:e.name)||"",description:(e==null?void 0:e.description)||"",status:e==null?void 0:e.status,createdAt:(e==null?void 0:e.created_at)||"",updatedAt:(e==null?void 0:e.updated_at)||"",createdBy:e==null?void 0:e.created_by,appliesToRoles:((e==null?void 0:e.applies_to_roles)||[]).map(u),approverRoles:((e==null?void 0:e.approver_roles)||[]).map(u),condition:i((e==null?void 0:e.condition)||{})}},V=e=>{var u,i,t,s,n,c,a,_,o,f,O,A,g,P,E;return{createdAt:(e==null?void 0:e.created_at)??"",text:(e==null?void 0:e.text)??"",uid:(e==null?void 0:e.uid)??"",author:{allowRemoteShoppingAssistance:((u=e==null?void 0:e.author)==null?void 0:u.allow_remote_shopping_assistance)??!1,confirmationStatus:((i=e==null?void 0:e.author)==null?void 0:i.confirmation_status)??"",createdAt:((t=e==null?void 0:e.author)==null?void 0:t.created_at)??"",dateOfBirth:((s=e==null?void 0:e.author)==null?void 0:s.date_of_birth)??"",email:((n=e==null?void 0:e.author)==null?void 0:n.email)??"",firstname:((c=e==null?void 0:e.author)==null?void 0:c.firstname)??"",gender:((a=e==null?void 0:e.author)==null?void 0:a.gender)??0,jobTitle:((_=e==null?void 0:e.author)==null?void 0:_.job_title)??"",lastname:((o=e==null?void 0:e.author)==null?void 0:o.lastname)??"",middlename:((f=e==null?void 0:e.author)==null?void 0:f.middlename)??"",prefix:((O=e==null?void 0:e.author)==null?void 0:O.prefix)??"",status:((A=e==null?void 0:e.author)==null?void 0:A.status)??"",structureId:((g=e==null?void 0:e.author)==null?void 0:g.structure_id)??"",suffix:((P=e==null?void 0:e.author)==null?void 0:P.suffix)??"",telephone:((E=e==null?void 0:e.author)==null?void 0:E.telephone)??""}}},rr=async(e,u)=>{if(!e)throw new Error("Purchase Order ID is required");if(!u)throw new Error("Comment text is required");return p($,{variables:{purchaseOrderUid:e,comment:u}}).then(t=>{var s,n,c;return(s=t.errors)!=null&&s.length&&h(t.errors),V((c=(n=t.data)==null?void 0:n.addPurchaseOrderComment)==null?void 0:c.comment)}).catch(d)},G=`
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
`,er=async(e,u,i=!1)=>{if(!e)throw new Error("Purchase Order UID is required");if(!u)throw new Error("Cart ID is required");return p(G,{variables:{purchaseOrderUid:e,cartId:u,replaceExistingCartItems:i}}).then(s=>{var c,a;(c=s.errors)!=null&&c.length&&h(s.errors);const n=(a=s.data)==null?void 0:a.addPurchaseOrderItemsToCart;if(!(n!=null&&n.cart))throw new Error("Failed to add purchase order items to cart");return L(n)}).catch(d)},N=`
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
`,tr=async e=>{if(!e.name||e.name.trim()==="")throw new Error("Rule name is required");return p(N,{variables:{input:e}}).then(u=>{var t,s;if((t=u.errors)!=null&&t.length&&h(u.errors),!((s=u.data)==null?void 0:s.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return w(u.data.createPurchaseOrderApprovalRule)}).catch(d)},z=`
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
`,ur=async e=>{const u=Array.isArray(e)?e:[e];if(!u||u.length===0)throw new Error("Approval Rule UID(s) are required");if(u.some(t=>!t||t.trim()===""))throw new Error("All Approval Rule UIDs must be valid");return p(z,{variables:{input:{approval_rule_uids:u}}}).then(t=>{var c,a,_;if((c=t.errors)!=null&&c.length&&h(t.errors),!((a=t.data)==null?void 0:a.deletePurchaseOrderApprovalRule))throw new Error("Failed to delete purchase order approval rule");const n=(_=t==null?void 0:t.data)==null?void 0:_.deletePurchaseOrderApprovalRule;return{deletePurchaseOrderApprovalRule:{errors:((n==null?void 0:n.errors)??[]).map(o=>({message:o==null?void 0:o.message,type:o==null?void 0:o.type}))}}}).catch(d)},B=`
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
`,sr=async e=>{if(!e.uid||e.uid.trim()==="")throw new Error("Approval Rule UID is required");return p(B,{variables:{input:e}}).then(u=>{var i,t;return(i=u.errors)!=null&&i.length&&h(u.errors),w(((t=u.data)==null?void 0:t.updatePurchaseOrderApprovalRule)||{})}).catch(d)},Q=`
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
`,ir=async e=>{var i;if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");const u={purchase_order_uid:e};try{const t=await p(Q,{variables:{input:u}});return(i=t.errors)!=null&&i.length&&h(t.errors),F(t)}catch(t){throw d(t)}},k=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${R}
`,_r=async e=>{if(!e||e.trim()==="")throw new Error("Cart ID is required");return p(k,{variables:{input:{cart_id:e}}}).then(i=>{var s,n,c;(s=i.errors)!=null&&s.length&&h(i.errors);const t=(c=(n=i.data)==null?void 0:n.placePurchaseOrder)==null?void 0:c.purchase_order;return{purchaseOrder:y(t)}}).catch(d)},j=`
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
`,nr=async()=>p(j,{variables:{}}).then(e=>{var u;return(u=e.errors)!=null&&u.length&&h(e.errors),M(e)}).catch(d);export{rr as addPurchaseOrderComment,er as addPurchaseOrderItemsToCart,lr as approvePurchaseOrders,Z as cancelPurchaseOrders,Y as config,tr as createPurchaseOrderApprovalRule,ur as deletePurchaseOrderApprovalRule,p as fetchGraphQl,or as getConfig,q as getPurchaseOrder,nr as getPurchaseOrderApprovalRuleMetadata,pr as getPurchaseOrders,D as initialize,ir as placeOrderForPurchaseOrder,_r as placePurchaseOrder,hr as rejectPurchaseOrders,dr as removeFetchGraphQlHeader,Er as setEndpoint,fr as setFetchGraphQlHeader,Or as setFetchGraphQlHeaders,sr as updatePurchaseOrderApprovalRule,m as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
