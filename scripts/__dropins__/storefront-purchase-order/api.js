/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as D}from"@dropins/tools/lib.js";import{f as y,h as O}from"./chunks/fetch-graphql.js";import{g as m,r as rr,s as er,a as ar,b as tr}from"./chunks/fetch-graphql.js";import{h as R}from"./chunks/fetch-error.js";import{t as v,P as A}from"./chunks/rejectPurchaseOrders.js";import{a as ur,r as sr}from"./chunks/rejectPurchaseOrders.js";import{events as C}from"@dropins/tools/event-bus.js";import{c as _r,p as cr}from"./chunks/placeOrderForPurchaseOrder.js";import{a as nr,c as dr,g as pr,u as hr}from"./chunks/currencyInfo.js";import{d as gr,g as yr}from"./chunks/getPurchaseOrderApprovalRules.js";import{g as Rr}from"./chunks/getPurchaseOrders.js";import{g as Er}from"./chunks/getPurchaseOrderApprovalRule.js";import{P as br}from"./chunks/permissions.js";import"@dropins/tools/fetch-graphql.js";import"./chunks/transform-purchase-order-approval-rule.js";import"./chunks/case-converter.js";const S=`
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
  ${S}
`,U=async r=>{if(!r||r.trim()==="")throw new Error("Purchase Order UID is required");return y(I,{variables:{uid:r}}).then(i=>{var t,a,e;(t=i.errors)!=null&&t.length&&R(i.errors);const l=(e=(a=i.data)==null?void 0:a.customer)==null?void 0:e.purchase_order;if(!l)throw new Error("Failed to get purchase order");return{purchaseOrder:v(l)}}).catch(O)},w=new D({init:async r=>{var t,a;const i={};if(w.config.setConfig({...i,...r}),typeof(r==null?void 0:r.poRef)=="string"&&r.poRef.trim()!==""){const e=await U(r.poRef);(t=e==null?void 0:e.purchaseOrder)!=null&&t.quote&&C.emit("order/data",{...e.purchaseOrder.quote,poNumber:(a=e==null?void 0:e.purchaseOrder)==null?void 0:a.number})}},listeners:()=>[]}),B=w.config,T=`
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
  ${A}
`,J=async r=>{const i=Array.isArray(r)?r:[r];if(!i||i.length===0)throw new Error("Purchase Order UID(s) are required");if(i.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return y(T,{variables:{input:{purchase_order_uids:i}}}).then(t=>{var e,_;(e=t.errors)!=null&&e.length&&R(t.errors);const a=(_=t.data)==null?void 0:_.validatePurchaseOrders;return{errors:((a==null?void 0:a.errors)??[]).map(s=>({message:(s==null?void 0:s.message)??"",type:(s==null?void 0:s.type)??""})),purchaseOrders:((a==null?void 0:a.purchase_orders)||[]).map(v)}}).catch(O)},q=`
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
`,H=r=>{var l,t,a,e,_,s,c,o,n,d,p,h,f,g,E;const i=((t=(l=r==null?void 0:r.cart)==null?void 0:l.itemsV2)==null?void 0:t.items)??[];return{cart:{id:((a=r==null?void 0:r.cart)==null?void 0:a.id)??"",items:i.map(u=>{var P,b,x;return{uid:(u==null?void 0:u.uid)??"",quantity:(u==null?void 0:u.quantity)??0,product:{uid:((P=u==null?void 0:u.product)==null?void 0:P.uid)??"",name:((b=u==null?void 0:u.product)==null?void 0:b.name)??"",sku:((x=u==null?void 0:u.product)==null?void 0:x.sku)??""}}}),pagination:{currentPage:((s=(_=(e=r==null?void 0:r.cart)==null?void 0:e.itemsV2)==null?void 0:_.page_info)==null?void 0:s.current_page)??1,pageSize:((n=(o=(c=r==null?void 0:r.cart)==null?void 0:c.itemsV2)==null?void 0:o.page_info)==null?void 0:n.page_size)??20,totalPages:((h=(p=(d=r==null?void 0:r.cart)==null?void 0:d.itemsV2)==null?void 0:p.page_info)==null?void 0:h.total_pages)??0,totalCount:((g=(f=r==null?void 0:r.cart)==null?void 0:f.itemsV2)==null?void 0:g.total_count)??0}},userErrors:((E=r==null?void 0:r.user_errors)==null?void 0:E.map(u=>({message:(u==null?void 0:u.message)??""})))??[]}},$=r=>{var i,l,t,a,e,_,s,c,o,n,d,p,h,f,g;return{createdAt:(r==null?void 0:r.created_at)??"",text:(r==null?void 0:r.text)??"",uid:(r==null?void 0:r.uid)??"",author:{allowRemoteShoppingAssistance:((i=r==null?void 0:r.author)==null?void 0:i.allow_remote_shopping_assistance)??!1,confirmationStatus:((l=r==null?void 0:r.author)==null?void 0:l.confirmation_status)??"",createdAt:((t=r==null?void 0:r.author)==null?void 0:t.created_at)??"",dateOfBirth:((a=r==null?void 0:r.author)==null?void 0:a.date_of_birth)??"",email:((e=r==null?void 0:r.author)==null?void 0:e.email)??"",firstname:((_=r==null?void 0:r.author)==null?void 0:_.firstname)??"",gender:((s=r==null?void 0:r.author)==null?void 0:s.gender)??0,jobTitle:((c=r==null?void 0:r.author)==null?void 0:c.job_title)??"",lastname:((o=r==null?void 0:r.author)==null?void 0:o.lastname)??"",middlename:((n=r==null?void 0:r.author)==null?void 0:n.middlename)??"",prefix:((d=r==null?void 0:r.author)==null?void 0:d.prefix)??"",status:((p=r==null?void 0:r.author)==null?void 0:p.status)??"",structureId:((h=r==null?void 0:r.author)==null?void 0:h.structure_id)??"",suffix:((f=r==null?void 0:r.author)==null?void 0:f.suffix)??"",telephone:((g=r==null?void 0:r.author)==null?void 0:g.telephone)??""}}},K=async(r,i)=>{if(!r)throw new Error("Purchase Order ID is required");if(!i)throw new Error("Comment text is required");return y(q,{variables:{purchaseOrderUid:r,comment:i}}).then(t=>{var a,e,_;return(a=t.errors)!=null&&a.length&&R(t.errors),$((_=(e=t.data)==null?void 0:e.addPurchaseOrderComment)==null?void 0:_.comment)}).catch(O)},M=`
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
`,W=async(r,i,l=!1)=>{if(!r)throw new Error("Purchase Order UID is required");if(!i)throw new Error("Cart ID is required");return y(M,{variables:{purchaseOrderUid:r,cartId:i,replaceExistingCartItems:l}}).then(a=>{var _,s;(_=a.errors)!=null&&_.length&&R(a.errors);const e=(s=a.data)==null?void 0:s.addPurchaseOrderItemsToCart;if(!(e!=null&&e.cart))throw new Error("Failed to add purchase order items to cart");return H(e)}).catch(O)},F=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${A}
`,X=async r=>{if(!r||r.trim()==="")throw new Error("Cart ID is required");return y(F,{variables:{input:{cart_id:r}}}).then(l=>{var e,_,s;(e=l.errors)!=null&&e.length&&R(l.errors);const t=(s=(_=l.data)==null?void 0:_.placePurchaseOrder)==null?void 0:s.purchase_order,a=v(t);return C.emit("purchase-order/placed",a),{purchaseOrder:a}}).catch(O)};export{br as PO_PERMISSIONS,K as addPurchaseOrderComment,W as addPurchaseOrderItemsToCart,ur as approvePurchaseOrders,_r as cancelPurchaseOrders,B as config,nr as createPurchaseOrderApprovalRule,dr as currencyInfo,gr as deletePurchaseOrderApprovalRule,y as fetchGraphQl,m as getConfig,U as getPurchaseOrder,Er as getPurchaseOrderApprovalRule,pr as getPurchaseOrderApprovalRuleMetadata,yr as getPurchaseOrderApprovalRules,Rr as getPurchaseOrders,w as initialize,cr as placeOrderForPurchaseOrder,X as placePurchaseOrder,sr as rejectPurchaseOrders,rr as removeFetchGraphQlHeader,er as setEndpoint,ar as setFetchGraphQlHeader,tr as setFetchGraphQlHeaders,hr as updatePurchaseOrderApprovalRule,J as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
