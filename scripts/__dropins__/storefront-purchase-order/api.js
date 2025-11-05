/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as w}from"@dropins/tools/lib.js";import{f as O,h as E}from"./chunks/fetch-graphql.js";import{g as rr,r as er,s as ar,a as tr,b as ur}from"./chunks/fetch-graphql.js";import{h as R}from"./chunks/fetch-error.js";import{t as v,P as C}from"./chunks/rejectPurchaseOrders.js";import{a as ir,r as lr}from"./chunks/rejectPurchaseOrders.js";import{events as S}from"@dropins/tools/event-bus.js";import{c as or,p as cr}from"./chunks/placeOrderForPurchaseOrder.js";import{a as dr,c as pr,g as hr,u as gr}from"./chunks/currencyInfo.js";import{d as Or,g as Er}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as vr}from"./chunks/getPurchaseOrders.js";import{g as yr}from"./chunks/getPurchaseOrderApprovalRule.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const D=`
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
`,I=`
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
  ${D}
`,U=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return O(I,{variables:{uid:r}}).then(u=>{var t,a,e;(t=u.errors)!=null&&t.length&&R(u.errors);const i=(e=(a=u.data)==null?void 0:a.customer)==null?void 0:e.purchase_order;if(!i)throw new Error("Failed to get purchase order");return{purchaseOrder:v(i)}}).catch(E)},x=new w({init:async r=>{var t,a;const u={};if(x.config.setConfig({...u,...r}),typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""){const e=await U(r.poRef);(t=e==null?void 0:e.purchaseOrder)!=null&&t.quote&&S.emit("order/data",{...e.purchaseOrder.quote,poNumber:(a=e==null?void 0:e.purchaseOrder)==null?void 0:a.number})}},listeners:()=>[]}),B=x.config,T=`
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
`,W=async r=>{const u=Array.isArray(r)?r:[r];if(!u||u.length===0)throw new Error("Purchase Order UID(s) are required");if(u.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return O(T,{variables:{input:{purchase_order_uids:u}}}).then(t=>{var e,l;(e=t.errors)!=null&&e.length&&R(t.errors);const a=(l=t.data)==null?void 0:l.validatePurchaseOrders;return{errors:((a==null?void 0:a.errors)??[]).map(_=>({message:(_==null?void 0:_.message)??"",type:(_==null?void 0:_.type)??""})),purchaseOrders:((a==null?void 0:a.purchase_orders)||[]).map(v)}}).catch(E)},M=`
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
`,q=r=>{var i,t,a,e,l,_,o,c,n,d,p,h,g,f,P;const u=((t=(i=r==null?void 0:r.cart)==null?void 0:i.itemsV2)==null?void 0:t.items)??[];return{cart:{id:((a=r==null?void 0:r.cart)==null?void 0:a.id)??"",items:u.map(s=>{var y,b,A;return{uid:(s==null?void 0:s.uid)??"",quantity:(s==null?void 0:s.quantity)??0,product:{uid:((y=s==null?void 0:s.product)==null?void 0:y.uid)??"",name:((b=s==null?void 0:s.product)==null?void 0:b.name)??"",sku:((A=s==null?void 0:s.product)==null?void 0:A.sku)??""}}}),pagination:{currentPage:((_=(l=(e=r==null?void 0:r.cart)==null?void 0:e.itemsV2)==null?void 0:l.page_info)==null?void 0:_.current_page)??1,pageSize:((n=(c=(o=r==null?void 0:r.cart)==null?void 0:o.itemsV2)==null?void 0:c.page_info)==null?void 0:n.page_size)??20,totalPages:((h=(p=(d=r==null?void 0:r.cart)==null?void 0:d.itemsV2)==null?void 0:p.page_info)==null?void 0:h.total_pages)??0,totalCount:((f=(g=r==null?void 0:r.cart)==null?void 0:g.itemsV2)==null?void 0:f.total_count)??0}},userErrors:((P=r==null?void 0:r.user_errors)==null?void 0:P.map(s=>({message:(s==null?void 0:s.message)??""})))??[]}},H=r=>{var u,i,t,a,e,l,_,o,c,n,d,p,h,g,f;return{createdAt:(r==null?void 0:r.created_at)??"",text:(r==null?void 0:r.text)??"",uid:(r==null?void 0:r.uid)??"",author:{allowRemoteShoppingAssistance:((u=r==null?void 0:r.author)==null?void 0:u.allow_remote_shopping_assistance)??!1,confirmationStatus:((i=r==null?void 0:r.author)==null?void 0:i.confirmation_status)??"",createdAt:((t=r==null?void 0:r.author)==null?void 0:t.created_at)??"",dateOfBirth:((a=r==null?void 0:r.author)==null?void 0:a.date_of_birth)??"",email:((e=r==null?void 0:r.author)==null?void 0:e.email)??"",firstname:((l=r==null?void 0:r.author)==null?void 0:l.firstname)??"",gender:((_=r==null?void 0:r.author)==null?void 0:_.gender)??0,jobTitle:((o=r==null?void 0:r.author)==null?void 0:o.job_title)??"",lastname:((c=r==null?void 0:r.author)==null?void 0:c.lastname)??"",middlename:((n=r==null?void 0:r.author)==null?void 0:n.middlename)??"",prefix:((d=r==null?void 0:r.author)==null?void 0:d.prefix)??"",status:((p=r==null?void 0:r.author)==null?void 0:p.status)??"",structureId:((h=r==null?void 0:r.author)==null?void 0:h.structure_id)??"",suffix:((g=r==null?void 0:r.author)==null?void 0:g.suffix)??"",telephone:((f=r==null?void 0:r.author)==null?void 0:f.telephone)??""}}},Y=async(r,u)=>{if(!r)throw new Error("Purchase Order ID is required");if(!u)throw new Error("Comment text is required");return O(M,{variables:{purchaseOrderUid:r,comment:u}}).then(t=>{var a,e,l;return(a=t.errors)!=null&&a.length&&R(t.errors),H((l=(e=t.data)==null?void 0:e.addPurchaseOrderComment)==null?void 0:l.comment)}).catch(E)},$=`
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
`,J=async(r,u,i=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!u)throw new Error("Cart ID is required");return O($,{variables:{purchaseOrderUid:r,cartId:u,replaceExistingCartItems:i}}).then(a=>{var l,_;(l=a.errors)!=null&&l.length&&R(a.errors);const e=(_=a.data)==null?void 0:_.addPurchaseOrderItemsToCart;if(!(e!=null&&e.cart))throw new Error("Failed to add purchase order items to cart");return q(e)}).catch(E)},V=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${C}
`,K=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return O(V,{variables:{input:{cart_id:r}}}).then(i=>{var a,e,l;(a=i.errors)!=null&&a.length&&R(i.errors);const t=(l=(e=i.data)==null?void 0:e.placePurchaseOrder)==null?void 0:l.purchase_order;return{purchaseOrder:v(t)}}).catch(E)},X={PO_ALL:"Magento_PurchaseOrder::all",VIEW_CUSTOMER:"Magento_PurchaseOrder::view_purchase_orders",VIEW_SUBORDINATES:"Magento_PurchaseOrder::view_purchase_orders_for_subordinates",VIEW_COMPANY:"Magento_PurchaseOrder::view_purchase_orders_for_company",AUTO_APPROVE:"Magento_PurchaseOrder::autoapprove_purchase_order",SUPER_APPROVE:"Magento_PurchaseOrderRule::super_approve_purchase_order",VIEW_RULES:"Magento_PurchaseOrderRule::view_approval_rules",MANAGE_RULES:"Magento_PurchaseOrderRule::manage_approval_rules"};export{X as PO_PERMISSIONS,Y as addPurchaseOrderComment,J as addPurchaseOrderItemsToCart,ir as approvePurchaseOrders,or as cancelPurchaseOrders,B as config,dr as createPurchaseOrderApprovalRule,pr as currencyInfo,Or as deletePurchaseOrderApprovalRule,O as fetchGraphQl,rr as getConfig,U as getPurchaseOrder,yr as getPurchaseOrderApprovalRule,hr as getPurchaseOrderApprovalRuleMetadata,Er as getPurchaseOrderApprovalRules,vr as getPurchaseOrders,x as initialize,cr as placeOrderForPurchaseOrder,K as placePurchaseOrder,lr as rejectPurchaseOrders,er as removeFetchGraphQlHeader,ar as setEndpoint,tr as setFetchGraphQlHeader,ur as setFetchGraphQlHeaders,gr as updatePurchaseOrderApprovalRule,W as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
