/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as $}from"@dropins/tools/event-bus.js";import{Initializer as Pe,getGlobalLocale as ve}from"@dropins/tools/lib.js";import{FetchGraphQL as Se}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:lr,setFetchGraphQlHeader:_r,removeFetchGraphQlHeader:cr,setFetchGraphQlHeaders:sr,fetchGraphQl:v,getConfig:or}=new Se().getMethods(),S=e=>{const a=e instanceof DOMException&&(e==null?void 0:e.name)==="AbortError",u=(e==null?void 0:e.name)==="PlaceOrderError";throw!a&&!u&&$.emit("purchase-order/error",{source:"purchase-order",type:"network",error:e.message}),e},T=e=>{var t,i;if(e.length===1&&((i=(t=e[0])==null?void 0:t.path)==null?void 0:i.length)>0){const s=e[0].path[e[0].path.length-1];if(["applied_coupons","applied_gift_cards","available_payment_methods"].includes(s))return}const u=e.map(s=>s.message).join(" ");throw Error(u)},Te=`
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
`,F=`
  fragment PURCHASE_ORDERS_FRAGMENT on PurchaseOrder {
    __typename
    uid
    number
    status
    available_actions
    approval_flow {
      events {
        name
        role
        message
        status
        updated_at
      }
      rule_name
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
      message
      created_at
      activity
      __typename
      uid
    }
    order {
      number
    }
    quote {
      ...PURCHASE_ORDER_QUOTE_FRAGMENT
    }
  }
  ${Te}
`,Oe=`
  query GET_PURCHASE_ORDER($uid: ID!) {
    customer {
      purchase_order(uid: $uid) {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${F}
`,M=e=>{var u,t,i,s,E,p,c,y;return{typename:(e==null?void 0:e.__typename)??"",uid:(e==null?void 0:e.uid)??"",number:(e==null?void 0:e.number)??"",status:(e==null?void 0:e.status)??"",availableActions:(e==null?void 0:e.available_actions)??[],approvalFlow:(u=e==null?void 0:e.approval_flow)!=null&&u.length?e.approval_flow.map(o=>{var h;return{ruleName:(o==null?void 0:o.rule_name)??"",events:((h=o==null?void 0:o.events)==null?void 0:h.map(f=>({message:(f==null?void 0:f.message)??"",name:(f==null?void 0:f.name)??"",role:(f==null?void 0:f.role)??"",status:(f==null?void 0:f.status)??"",updatedAt:(f==null?void 0:f.updated_at)??""})))??[]}}):[],comments:((t=e==null?void 0:e.comments)==null?void 0:t.map(o=>{var h,f,U;return{uid:(o==null?void 0:o.uid)??"",createdAt:(o==null?void 0:o.created_at)??"",author:{firstname:((h=o==null?void 0:o.author)==null?void 0:h.firstname)??"",lastname:((f=o==null?void 0:o.author)==null?void 0:f.lastname)??"",email:((U=o==null?void 0:o.author)==null?void 0:U.email)??""},text:(o==null?void 0:o.text)??""}}))??[],createdAt:(e==null?void 0:e.created_at)??"",updatedAt:(e==null?void 0:e.updated_at)??"",createdBy:{firstname:((i=e==null?void 0:e.created_by)==null?void 0:i.firstname)??"",lastname:((s=e==null?void 0:e.created_by)==null?void 0:s.lastname)??"",email:((E=e==null?void 0:e.created_by)==null?void 0:E.email)??""},historyLog:((p=e==null?void 0:e.history_log)==null?void 0:p.map(o=>({activity:(o==null?void 0:o.activity)??"",createdAt:(o==null?void 0:o.created_at)??"",message:(o==null?void 0:o.message)??"",uid:(o==null?void 0:o.uid)??""})))??[],quote:Ue(e==null?void 0:e.quote),order:{id:((c=e==null?void 0:e.order)==null?void 0:c.id)??"",orderNumber:((y=e==null?void 0:e.order)==null?void 0:y.number)??""}}};function Ue(e){var X,J,Z,q,ee,re,ne,te,ae,ie,ue,le,_e,ce,se;if(!e)return null;const a=n=>n||0,u=n=>({firstName:(n==null?void 0:n.firstname)??"",lastName:(n==null?void 0:n.lastname)??"",middleName:(n==null?void 0:n.middlename)??""}),t=n=>{var R,O,d,D;const{firstName:l,lastName:_,middleName:g}=u(n);return{firstName:l,lastName:_,middleName:g,city:(n==null?void 0:n.city)??"",company:(n==null?void 0:n.company)??"",country:((R=n==null?void 0:n.country)==null?void 0:R.label)??"",countryCode:((O=n==null?void 0:n.country)==null?void 0:O.code)??"",fax:(n==null?void 0:n.fax)??"",postCode:(n==null?void 0:n.postcode)??"",prefix:(n==null?void 0:n.prefix)??"",region:((d=n==null?void 0:n.region)==null?void 0:d.label)??"",regionId:((D=n==null?void 0:n.region)==null?void 0:D.code)??"",street:(n==null?void 0:n.street)??[],suffix:(n==null?void 0:n.suffix)??"",telephone:(n==null?void 0:n.telephone)??"",vatId:(n==null?void 0:n.vat_id)??"",customAttributes:(n==null?void 0:n.custom_attributes)??[]}},i=n=>{var l,_,g,R,O,d,D,m,I,x;return{__typename:(n==null?void 0:n.__typename)||"",uid:(n==null?void 0:n.uid)||"",onlyXLeftInStock:(n==null?void 0:n.only_x_left_in_stock)??0,stockStatus:(n==null?void 0:n.stock_status)??"",priceRange:{maximumPrice:{regularPrice:{currency:((g=(_=(l=n==null?void 0:n.price_range)==null?void 0:l.maximum_price)==null?void 0:_.regular_price)==null?void 0:g.currency)??"",value:((d=(O=(R=n==null?void 0:n.price_range)==null?void 0:R.maximum_price)==null?void 0:O.regular_price)==null?void 0:d.value)??0}}},canonicalUrl:(n==null?void 0:n.canonical_url)??"",urlKey:(n==null?void 0:n.url_key)||"",id:(n==null?void 0:n.uid)??"",name:(n==null?void 0:n.name)||"",sku:(n==null?void 0:n.sku)||"",image:((D=n==null?void 0:n.image)==null?void 0:D.url)||"",imageAlt:((m=n==null?void 0:n.image)==null?void 0:m.label)||"",productType:(n==null?void 0:n.__typename)||"",thumbnail:{label:((I=n==null?void 0:n.thumbnail)==null?void 0:I.label)||"",url:((x=n==null?void 0:n.thumbnail)==null?void 0:x.url)||""}}},s=n=>{if(!n||!("configurable_options"in n))return;const l={};for(const _ of n.configurable_options)l[_.option_label]=_.value_label;return l},E=n=>{const l=n==null?void 0:n.map(g=>({uid:g.uid,label:g.label,values:g.values.map(R=>R.product_name).join(", ")})),_={};return l==null||l.forEach(g=>{_[g.label]=g.values}),Object.keys(_).length>0?_:null},p=n=>(n==null?void 0:n.length)>0?{count:n.length,result:n.map(l=>l.title).join(", ")}:null,c=n=>{var l,_,g,R,O;return{senderName:((l=n==null?void 0:n.gift_card)==null?void 0:l.sender_name)||"",senderEmail:((_=n==null?void 0:n.gift_card)==null?void 0:_.sender_email)||"",recipientEmail:((g=n==null?void 0:n.gift_card)==null?void 0:g.recipient_email)||"",recipientName:((R=n==null?void 0:n.gift_card)==null?void 0:R.recipient_name)||"",message:((O=n==null?void 0:n.gift_card)==null?void 0:O.message)||""}},y=n=>{var l,_,g;return{senderName:((l=n==null?void 0:n.gift_message)==null?void 0:l.from)??"",recipientName:((_=n==null?void 0:n.gift_message)==null?void 0:_.to)??"",message:((g=n==null?void 0:n.gift_message)==null?void 0:g.message)??""}},o=n=>{var l,_,g,R,O,d,D,m,I,x,H;return{design:((l=n==null?void 0:n.gift_wrapping)==null?void 0:l.design)??"",uid:((_=n==null?void 0:n.gift_wrapping)==null?void 0:_.uid)??"",selected:!!((g=n==null?void 0:n.gift_wrapping)!=null&&g.uid),image:{url:((O=(R=n==null?void 0:n.gift_wrapping)==null?void 0:R.image)==null?void 0:O.url)??"",label:((D=(d=n==null?void 0:n.gift_wrapping)==null?void 0:d.image)==null?void 0:D.label)??""},price:{currency:((I=(m=n==null?void 0:n.gift_wrapping)==null?void 0:m.price)==null?void 0:I.currency)??"USD",value:((H=(x=n==null?void 0:n.gift_wrapping)==null?void 0:x.price)==null?void 0:H.value)??0}}},h=n=>({currency:(n==null?void 0:n.currency)??"USD",value:(n==null?void 0:n.value)??0}),f=(n,l)=>{const _=n==null?void 0:n.price,g=n==null?void 0:n.priceIncludingTax,R=n==null?void 0:n.originalPrice,O=!1,d=O?R==null?void 0:R.value:g==null?void 0:g.value,D={originalPrice:R,baseOriginalPrice:{value:d,currency:R==null?void 0:R.currency},baseDiscountedPrice:{value:g==null?void 0:g.value,currency:g==null?void 0:g.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},m={originalPrice:R,baseOriginalPrice:{value:R==null?void 0:R.value,currency:g==null?void 0:g.currency},baseDiscountedPrice:{value:l==null?void 0:l.value,currency:_==null?void 0:_.currency},baseExcludingTax:{value:_==null?void 0:_.value,currency:_==null?void 0:_.currency}},I={singleItemPrice:{value:O?R.value:g.value,currency:g.currency},baseOriginalPrice:{value:d,currency:g.currency},baseDiscountedPrice:{value:g.value,currency:g.currency}};return{includeAndExcludeTax:D,excludeTax:m,includeTax:I}},U=n=>{var D,m,I,x,H,oe,pe,Ee,ge,ye,fe;const l=n==null?void 0:n.product,_=n==null?void 0:n.prices,g=a(n==null?void 0:n.quantity),R={price:(_==null?void 0:_.price)??{value:0,currency:"USD"},priceIncludingTax:(_==null?void 0:_.price_including_tax)??{value:0,currency:"USD"},originalPrice:(_==null?void 0:_.original_item_price)??{value:0,currency:"USD"},originalPriceIncludingTax:(_==null?void 0:_.original_item_price)??{value:0,currency:"USD"},discounts:(_==null?void 0:_.discounts)??[]},O=(((D=_==null?void 0:_.original_item_price)==null?void 0:D.value)??0)>(((m=_==null?void 0:_.price)==null?void 0:m.value)??0),d=(_==null?void 0:_.price)??{value:0,currency:"USD"};return{giftMessage:y(n),giftWrappingPrice:h((I=n==null?void 0:n.gift_wrapping)==null?void 0:I.price),productGiftWrapping:[o(n)],taxCalculations:f(R,d),productSalePrice:d,status:n!=null&&n.is_available?"available":"unavailable",currentReturnOrderQuantity:0,eligibleForReturn:!1,productSku:(l==null?void 0:l.sku)??"",type:(l==null?void 0:l.__typename)??"",discounted:O,id:(n==null?void 0:n.uid)??"",productName:(l==null?void 0:l.name)??"",productUrlKey:(l==null?void 0:l.url_key)??"",regularPrice:{value:((oe=(H=(x=l==null?void 0:l.price_range)==null?void 0:x.maximum_price)==null?void 0:H.regular_price)==null?void 0:oe.value)??0,currency:((ge=(Ee=(pe=l==null?void 0:l.price_range)==null?void 0:pe.maximum_price)==null?void 0:Ee.regular_price)==null?void 0:ge.currency)??"USD"},price:d,product:i(l),selectedOptions:(n==null?void 0:n.customizable_options)??[],thumbnail:{label:((ye=l==null?void 0:l.thumbnail)==null?void 0:ye.label)||"",url:((fe=l==null?void 0:l.thumbnail)==null?void 0:fe.url)||""},downloadableLinks:(l==null?void 0:l.__typename)==="DownloadableProduct"&&(n!=null&&n.downloadable_links)?p(n.downloadable_links):null,prices:R,itemPrices:R,bundleOptions:(l==null?void 0:l.__typename)==="BundleProduct"&&(n!=null&&n.bundle_options)?E(n.bundle_options):null,totalInclTax:(_==null?void 0:_.row_total_including_tax)??{value:0,currency:"USD"},priceInclTax:(_==null?void 0:_.price_including_tax)??{value:0,currency:"USD"},total:(_==null?void 0:_.row_total)??{value:0,currency:"USD"},configurableOptions:(l==null?void 0:l.__typename)==="ConfigurableProduct"?s(n):void 0,giftCard:(l==null?void 0:l.__typename)==="GiftCardProduct"?c(n):void 0,quantityCanceled:0,quantityInvoiced:0,quantityOrdered:g,quantityRefunded:0,quantityReturned:0,quantityShipped:0,requestQuantity:0,totalQuantity:g,returnableQuantity:0,quantityReturnRequested:0}},C=n=>({giftWrappingForItems:(n==null?void 0:n.gift_wrapping_for_items)??{value:0,currency:"USD"},giftWrappingForItemsInclTax:(n==null?void 0:n.gift_wrapping_for_items_incl_tax)??{value:0,currency:"USD"},giftWrappingForOrder:(n==null?void 0:n.gift_wrapping_for_order)??{value:0,currency:"USD"},giftWrappingForOrderInclTax:(n==null?void 0:n.gift_wrapping_for_order_incl_tax)??{value:0,currency:"USD"},printedCard:(n==null?void 0:n.printed_card)??{value:0,currency:"USD"},printedCardInclTax:(n==null?void 0:n.printed_card_incl_tax)??{value:0,currency:"USD"}}),L=(n=[])=>!n||n.length===0?[]:n.map(l=>{var _,g;return{code:(l==null?void 0:l.code)??"",appliedBalance:{value:((_=l==null?void 0:l.applied_balance)==null?void 0:_.value)??0,currency:((g=l==null?void 0:l.applied_balance)==null?void 0:g.currency)??"USD"}}}),N=(n=[])=>!n||n.length===0?[]:n.map(l=>{var _,g;return{amount:{value:((_=l==null?void 0:l.amount)==null?void 0:_.value)??0,currency:((g=l==null?void 0:l.amount)==null?void 0:g.currency)??"USD"},rate:(l==null?void 0:l.rate)??0,title:(l==null?void 0:l.title)??(l==null?void 0:l.label)??""}}),b=(X=e==null?void 0:e.shipping_addresses)==null?void 0:X[0],r=e==null?void 0:e.billing_address,P=b==null?void 0:b.selected_shipping_method,w=e==null?void 0:e.selected_payment_method,A=e==null?void 0:e.prices,j=((Z=(J=e==null?void 0:e.itemsV2)==null?void 0:J.items)==null?void 0:Z.map(U))??[],be=j.reduce((n,l)=>n+l.totalQuantity,0),K=P?`${P.carrier_title??""} - ${P.method_title??""}`.trim():"",k=L(e==null?void 0:e.applied_gift_cards);return{giftReceiptIncluded:(e==null?void 0:e.gift_receipt_included)??!1,printedCardIncluded:(e==null?void 0:e.printed_card_included)??!1,giftWrappingOrder:{price:{value:((ee=(q=e==null?void 0:e.gift_wrapping)==null?void 0:q.price)==null?void 0:ee.value)??0,currency:((ne=(re=e==null?void 0:e.gift_wrapping)==null?void 0:re.price)==null?void 0:ne.currency)??"USD"},uid:((te=e==null?void 0:e.gift_wrapping)==null?void 0:te.uid)??""},placeholderImage:"",returnNumber:void 0,id:(e==null?void 0:e.id)??"",orderStatusChangeDate:void 0,number:"",email:(e==null?void 0:e.email)??"",token:void 0,status:"pending",isVirtual:(e==null?void 0:e.is_virtual)??!1,totalQuantity:be,shippingMethod:K,carrier:(P==null?void 0:P.carrier_code)??"",orderDate:"",returns:[],discounts:(A==null?void 0:A.discounts)??[],coupons:(e==null?void 0:e.applied_coupons)??[],payments:[{code:(w==null?void 0:w.code)??"",name:(w==null?void 0:w.title)??""}],shipping:{code:K,amount:((ae=P==null?void 0:P.amount)==null?void 0:ae.value)??0,currency:((ie=P==null?void 0:P.amount)==null?void 0:ie.currency)??"USD"},shipments:[],items:j,totalGiftCard:k.length?k.reduce((n,l)=>{var _,g;return{value:n.value+(((_=l==null?void 0:l.appliedBalance)==null?void 0:_.value)??0),currency:((g=l==null?void 0:l.appliedBalance)==null?void 0:g.currency)??n.currency}},{value:0,currency:((le=(ue=k[0])==null?void 0:ue.appliedBalance)==null?void 0:le.currency)??"USD"}):{value:0,currency:"USD"},grandTotal:(A==null?void 0:A.grand_total)??{value:0,currency:"USD"},grandTotalExclTax:(A==null?void 0:A.grand_total_excluding_tax)??{value:0,currency:"USD"},totalShipping:(P==null?void 0:P.amount)??{value:0,currency:"USD"},subtotalExclTax:(A==null?void 0:A.subtotal_excluding_tax)??{value:0,currency:"USD"},subtotalInclTax:(A==null?void 0:A.subtotal_including_tax)??{value:0,currency:"USD"},totalTax:{value:(((_e=A==null?void 0:A.grand_total)==null?void 0:_e.value)??0)-(((ce=A==null?void 0:A.grand_total_excluding_tax)==null?void 0:ce.value)??0),currency:((se=A==null?void 0:A.grand_total)==null?void 0:se.currency)??"USD"},shippingAddress:b?t(b):null,totalGiftOptions:C(A==null?void 0:A.gift_options),billingAddress:r?t(r):null,availableActions:[],taxes:N(A==null?void 0:A.applied_taxes),appliedGiftCards:k}}const de=async e=>{if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");return v(Oe,{variables:{uid:e}}).then(a=>{var t,i,s;(t=a.errors)!=null&&t.length&&T(a.errors);const u=(s=(i=a.data)==null?void 0:i.customer)==null?void 0:s.purchase_order;if(!u)throw new Error("Failed to get purchase order");return{purchaseOrder:M(u)}}).catch(S)},Ae=async e=>{var u;const a=await de(e);(u=a==null?void 0:a.purchaseOrder)!=null&&u.quote?($.emit("order/data",{...a.purchaseOrder.quote}),$.emit("purchase-order/data",{...a.purchaseOrder})):console.error("Failed to fetch purchase order data.")},Y=new Pe({init:async e=>{const a={};Y.config.setConfig({...a,...e}),typeof(e==null?void 0:e.poRef)=="string"&&e.poRef.trim()!==""&&await Ae(e.poRef)},listeners:()=>[$.on("purchase-order/refresh",async()=>{const e=Y.config.getConfig();typeof(e==null?void 0:e.poRef)=="string"&&e.poRef.trim()!==""&&await Ae(e.poRef)})]}),pr=Y.config,De=`
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
  ${F}
`,Er=async e=>{const a=Array.isArray(e)?e:[e];if(!a||a.length===0)throw new Error("Purchase Order UID(s) are required");if(a.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return v(De,{variables:{input:{purchase_order_uids:a}}}).then(t=>{var s,E,p;(s=t.errors)!=null&&s.length&&T(t.errors);const i=(E=t.data)==null?void 0:E.approvePurchaseOrders;if(!i)throw new Error("Failed to approve purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(c=>({message:(c==null?void 0:c.message)??"",type:(c==null?void 0:c.type)??""})),purchaseOrders:((p=i==null?void 0:i.purchase_orders)==null?void 0:p.map(c=>M(c)))??[]}}).catch(S)},Ce=`
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
  ${F}
`,gr=async e=>{const a=Array.isArray(e)?e:[e];if(!a||a.length===0)throw new Error("Purchase Order UID(s) are required");if(a.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return v(Ce,{variables:{input:{purchase_order_uids:a}}}).then(t=>{var s,E,p;(s=t.errors)!=null&&s.length&&T(t.errors);const i=(E=t.data)==null?void 0:E.cancelPurchaseOrders;if(!i)throw new Error("Failed to cancel purchase orders");return{errors:((i==null?void 0:i.errors)??[]).map(c=>({message:(c==null?void 0:c.message)??"",type:(c==null?void 0:c.type)??""})),purchaseOrders:((p=i==null?void 0:i.purchase_orders)==null?void 0:p.map(c=>M(c)))??[]}}).catch(S)},Le=`
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
  ${F}
`,yr=async e=>{const a=Array.isArray(e)?e:[e];if(!a||a.length===0)throw new Error("Purchase Order UID(s) are required");if(a.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return v(Le,{variables:{input:{purchase_order_uids:a}}}).then(t=>{var s,E;(s=t.errors)!=null&&s.length&&T(t.errors);const i=(E=t.data)==null?void 0:E.rejectPurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(p=>({message:(p==null?void 0:p.message)??"",type:(p==null?void 0:p.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)??[]).map(M)}}).catch(S)},me=`
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
  ${F}
`,fr=async e=>{const a=Array.isArray(e)?e:[e];if(!a||a.length===0)throw new Error("Purchase Order UID(s) are required");if(a.some(t=>!t||t.trim()===""))throw new Error("All Purchase Order UIDs must be valid");return v(me,{variables:{input:{purchase_order_uids:a}}}).then(t=>{var s,E;(s=t.errors)!=null&&s.length&&T(t.errors);const i=(E=t.data)==null?void 0:E.validatePurchaseOrders;return{errors:((i==null?void 0:i.errors)??[]).map(p=>({message:(p==null?void 0:p.message)??"",type:(p==null?void 0:p.type)??""})),purchaseOrders:((i==null?void 0:i.purchase_orders)||[]).map(M)}}).catch(S)},Ie=`
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
`,we=e=>{var u,t,i,s,E,p,c,y,o,h,f,U,C,L,N;const a=((t=(u=e==null?void 0:e.cart)==null?void 0:u.itemsV2)==null?void 0:t.items)??[];return{cart:{id:((i=e==null?void 0:e.cart)==null?void 0:i.id)??"",items:a.map(b=>{var r,P,w;return{uid:(b==null?void 0:b.uid)??"",quantity:(b==null?void 0:b.quantity)??0,product:{uid:((r=b==null?void 0:b.product)==null?void 0:r.uid)??"",name:((P=b==null?void 0:b.product)==null?void 0:P.name)??"",sku:((w=b==null?void 0:b.product)==null?void 0:w.sku)??""}}}),pagination:{currentPage:((p=(E=(s=e==null?void 0:e.cart)==null?void 0:s.itemsV2)==null?void 0:E.page_info)==null?void 0:p.current_page)??1,pageSize:((o=(y=(c=e==null?void 0:e.cart)==null?void 0:c.itemsV2)==null?void 0:y.page_info)==null?void 0:o.page_size)??20,totalPages:((U=(f=(h=e==null?void 0:e.cart)==null?void 0:h.itemsV2)==null?void 0:f.page_info)==null?void 0:U.total_pages)??0,totalCount:((L=(C=e==null?void 0:e.cart)==null?void 0:C.itemsV2)==null?void 0:L.total_count)??0}},userErrors:((N=e==null?void 0:e.user_errors)==null?void 0:N.map(b=>({message:(b==null?void 0:b.message)??""})))??[]}},xe=e=>{var N,b;const a=(b=(N=e.data)==null?void 0:N.placeOrderForPurchaseOrder)==null?void 0:b.order,u=r=>({value:(r==null?void 0:r.value)||0,currency:(r==null?void 0:r.currency)||""}),t=r=>({code:(r==null?void 0:r.code)||"",label:(r==null?void 0:r.label)||""}),i=r=>({code:(r==null?void 0:r.code)||"",appliedBalance:u(r==null?void 0:r.applied_balance),currentBalance:u(r==null?void 0:r.current_balance)}),s=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",street:(r==null?void 0:r.street)||[],city:(r==null?void 0:r.city)||"",region:(r==null?void 0:r.region)||"",postcode:(r==null?void 0:r.postcode)||"",countryCode:(r==null?void 0:r.country_code)||"",telephone:(r==null?void 0:r.telephone)||"",company:(r==null?void 0:r.company)||""}),E=r=>({name:(r==null?void 0:r.name)||"",type:(r==null?void 0:r.type)||"",additionalData:(r==null?void 0:r.additional_data)||{}}),p=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityOrdered:(r==null?void 0:r.quantity_ordered)||0,quantityShipped:(r==null?void 0:r.quantity_shipped)||0,quantityInvoiced:(r==null?void 0:r.quantity_invoiced)||0,quantityRefunded:(r==null?void 0:r.quantity_refunded)||0,price:u(r==null?void 0:r.price),total:u(r==null?void 0:r.total)}),c=r=>({number:(r==null?void 0:r.number)||"",carrier:(r==null?void 0:r.carrier)||"",title:(r==null?void 0:r.title)||""}),y=r=>({message:(r==null?void 0:r.message)||"",timestamp:(r==null?void 0:r.timestamp)||""}),o=r=>({id:(r==null?void 0:r.id)||"",productName:(r==null?void 0:r.product_name)||"",productSku:(r==null?void 0:r.product_sku)||"",quantityShipped:(r==null?void 0:r.quantity_shipped)||0}),h=r=>({id:(r==null?void 0:r.id)||"",number:(r==null?void 0:r.number)||"",tracking:((r==null?void 0:r.tracking)||[]).map(c),comments:((r==null?void 0:r.comments)||[]).map(y),items:((r==null?void 0:r.items)||[]).map(o)}),f=r=>({firstname:(r==null?void 0:r.firstname)||"",lastname:(r==null?void 0:r.lastname)||"",email:(r==null?void 0:r.email)||""}),U=r=>({label:(r==null?void 0:r.label)||"",amount:u(r==null?void 0:r.amount)}),C=r=>({baseGrandTotal:u(r==null?void 0:r.base_grand_total),grandTotal:u(r==null?void 0:r.grand_total),subtotal:u(r==null?void 0:r.subtotal),totalTax:u(r==null?void 0:r.total_tax),totalShipping:u(r==null?void 0:r.total_shipping),discounts:((r==null?void 0:r.discounts)||[]).map(U)}),L=r=>({appliedCoupons:((r==null?void 0:r.applied_coupons)||[]).map(t),appliedGiftCards:((r==null?void 0:r.applied_gift_cards)||[]).map(i),availableActions:(r==null?void 0:r.available_actions)||[],billingAddress:r!=null&&r.billing_address?s(r.billing_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},carrier:(r==null?void 0:r.carrier)||"",comments:(r==null?void 0:r.comments)||[],creditMemos:(r==null?void 0:r.credit_memos)||[],customerInfo:r!=null&&r.customer_info?f(r.customer_info):{firstname:"",lastname:"",email:""},email:(r==null?void 0:r.email)||"",giftMessage:(r==null?void 0:r.gift_message)||"",giftReceiptIncluded:(r==null?void 0:r.gift_receipt_included)||!1,giftWrapping:(r==null?void 0:r.gift_wrapping)||null,id:(r==null?void 0:r.id)||"",invoices:(r==null?void 0:r.invoices)||[],isVirtual:(r==null?void 0:r.is_virtual)||!1,items:((r==null?void 0:r.items)||[]).map(p),itemsEligibleForReturn:(r==null?void 0:r.items_eligible_for_return)||[],number:(r==null?void 0:r.number)||"",orderDate:(r==null?void 0:r.order_date)||"",orderStatusChangeDate:(r==null?void 0:r.order_status_change_date)||"",paymentMethods:((r==null?void 0:r.payment_methods)||[]).map(E),printedCardIncluded:(r==null?void 0:r.printed_card_included)||!1,returns:(r==null?void 0:r.returns)||null,shipments:((r==null?void 0:r.shipments)||[]).map(h),shippingAddress:r!=null&&r.shipping_address?s(r.shipping_address):{firstname:"",lastname:"",street:[],city:"",region:"",postcode:"",countryCode:"",telephone:"",company:""},shippingMethod:(r==null?void 0:r.shipping_method)||"",status:(r==null?void 0:r.status)||"",token:(r==null?void 0:r.token)||"",total:r!=null&&r.total?C(r.total):{baseGrandTotal:u(null),grandTotal:u(null),subtotal:u(null),totalTax:u(null),totalShipping:u(null),discounts:[]}});return L(a||null)},Ne=e=>{var E,p;const a=(p=(E=e==null?void 0:e.data)==null?void 0:E.customer)==null?void 0:p.purchase_order_approval_rule_metadata,u=c=>{var y;return{id:(c==null?void 0:c.id)||"",sortOrder:(c==null?void 0:c.sort_order)||0,text:(c==null?void 0:c.text)||"",children:((y=c==null?void 0:c.children)==null?void 0:y.map(u))||void 0}},t=c=>({id:(c==null?void 0:c.id)||"",name:(c==null?void 0:c.name)||"",usersCount:(c==null?void 0:c.users_count)||0,permissions:((c==null?void 0:c.permissions)||[]).map(u)}),i=((a==null?void 0:a.available_applies_to)||[]).map(t),s=((a==null?void 0:a.available_requires_approval_from)||[]).map(t);return{availableAppliesTo:i,availableRequiresApprovalFrom:s}},z=e=>{const a=t=>({id:(t==null?void 0:t.id)||"",name:(t==null?void 0:t.name)||"",usersCount:(t==null?void 0:t.users_count)||0,permissions:((t==null?void 0:t.permissions)||[]).map(i=>({id:(i==null?void 0:i.id)||"",sortOrder:(i==null?void 0:i.sort_order)||0,text:(i==null?void 0:i.text)||""}))}),u=t=>{var i,s;return{attribute:t==null?void 0:t.attribute,operator:t==null?void 0:t.operator,quantity:(t==null?void 0:t.quantity)||0,amount:{currency:((i=t==null?void 0:t.amount)==null?void 0:i.currency)||"USD",value:((s=t==null?void 0:t.amount)==null?void 0:s.value)||0}}};return{uid:(e==null?void 0:e.uid)||"",name:(e==null?void 0:e.name)||"",description:(e==null?void 0:e.description)||"",status:e==null?void 0:e.status,createdAt:(e==null?void 0:e.created_at)||"",updatedAt:(e==null?void 0:e.updated_at)||"",createdBy:e==null?void 0:e.created_by,appliesToRoles:((e==null?void 0:e.applies_to_roles)||[]).map(a),approverRoles:((e==null?void 0:e.approver_roles)||[]).map(a),condition:u((e==null?void 0:e.condition)||{})}},Fe=e=>{var a,u,t,i,s,E,p,c,y,o,h,f,U,C,L;return{createdAt:(e==null?void 0:e.created_at)??"",text:(e==null?void 0:e.text)??"",uid:(e==null?void 0:e.uid)??"",author:{allowRemoteShoppingAssistance:((a=e==null?void 0:e.author)==null?void 0:a.allow_remote_shopping_assistance)??!1,confirmationStatus:((u=e==null?void 0:e.author)==null?void 0:u.confirmation_status)??"",createdAt:((t=e==null?void 0:e.author)==null?void 0:t.created_at)??"",dateOfBirth:((i=e==null?void 0:e.author)==null?void 0:i.date_of_birth)??"",email:((s=e==null?void 0:e.author)==null?void 0:s.email)??"",firstname:((E=e==null?void 0:e.author)==null?void 0:E.firstname)??"",gender:((p=e==null?void 0:e.author)==null?void 0:p.gender)??0,jobTitle:((c=e==null?void 0:e.author)==null?void 0:c.job_title)??"",lastname:((y=e==null?void 0:e.author)==null?void 0:y.lastname)??"",middlename:((o=e==null?void 0:e.author)==null?void 0:o.middlename)??"",prefix:((h=e==null?void 0:e.author)==null?void 0:h.prefix)??"",status:((f=e==null?void 0:e.author)==null?void 0:f.status)??"",structureId:((U=e==null?void 0:e.author)==null?void 0:U.structure_id)??"",suffix:((C=e==null?void 0:e.author)==null?void 0:C.suffix)??"",telephone:((L=e==null?void 0:e.author)==null?void 0:L.telephone)??""}}},Ar=async(e,a)=>{if(!e)throw new Error("Purchase Order ID is required");if(!a)throw new Error("Comment text is required");return v(Ie,{variables:{purchaseOrderUid:e,comment:a}}).then(t=>{var i,s,E;return(i=t.errors)!=null&&i.length&&T(t.errors),Fe((E=(s=t.data)==null?void 0:s.addPurchaseOrderComment)==null?void 0:E.comment)}).catch(S)},Me=`
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
`,Rr=async(e,a,u=!1)=>{if(!e)throw new Error("Purchase Order UID is required");if(!a)throw new Error("Cart ID is required");return v(Me,{variables:{purchaseOrderUid:e,cartId:a,replaceExistingCartItems:u}}).then(i=>{var E,p;(E=i.errors)!=null&&E.length&&T(i.errors);const s=(p=i.data)==null?void 0:p.addPurchaseOrderItemsToCart;if(!(s!=null&&s.cart))throw new Error("Failed to add purchase order items to cart");return we(s)}).catch(S)},He=`
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
`,hr=async e=>{if(!e.name||e.name.trim()==="")throw new Error("Rule name is required");return v(He,{variables:{input:e}}).then(a=>{var t,i;if((t=a.errors)!=null&&t.length&&T(a.errors),!((i=a.data)==null?void 0:i.createPurchaseOrderApprovalRule))throw new Error("Failed to create purchase order approval rule");return z(a.data.createPurchaseOrderApprovalRule)}).catch(S)},Ve=`
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
`,br=async e=>{const a=Array.isArray(e)?e:[e];if(!a||a.length===0)throw new Error("Approval Rule UID(s) are required");if(a.some(t=>!t||t.trim()===""))throw new Error("All Approval Rule UIDs must be valid");return v(Ve,{variables:{input:{approval_rule_uids:a}}}).then(t=>{var E,p,c;if((E=t.errors)!=null&&E.length&&T(t.errors),!((p=t.data)==null?void 0:p.deletePurchaseOrderApprovalRule))throw new Error("Failed to delete purchase order approval rule");const s=(c=t==null?void 0:t.data)==null?void 0:c.deletePurchaseOrderApprovalRule;return{deletePurchaseOrderApprovalRule:{errors:((s==null?void 0:s.errors)??[]).map(y=>({message:y==null?void 0:y.message,type:y==null?void 0:y.type}))}}}).catch(S)},Ge=`
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
`,Pr=async e=>{if(!e.uid||e.uid.trim()==="")throw new Error("Approval Rule UID is required");return v(Ge,{variables:{input:e}}).then(a=>{var u,t;return(u=a.errors)!=null&&u.length&&T(a.errors),z(((t=a.data)==null?void 0:t.updatePurchaseOrderApprovalRule)||{})}).catch(S)},$e=`
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
  ${F}
`,vr=e=>{try{return new URL(e,window.location.origin).origin===window.location.origin}catch{return e.startsWith("/")||e.startsWith("./")||e.startsWith("../")}};var W={};function ke(e){if(e)return e;const a=ve();return a||(W.LOCALE&&W.LOCALE!=="undefined"?W.LOCALE:"en-US")}const Sr=(e,a="en-US")=>{try{const u=new Date(e);if(isNaN(u.getTime()))return e;const t=ke(a);return u.toLocaleString(t,{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit",hour12:!0})}catch{return e}},Q=e=>{if(e==null||typeof e!="object")return e;if(Array.isArray(e))return e.map(Q);const a={};for(const[u,t]of Object.entries(e)){const i=u.replace(/[A-Z]/g,s=>`_${s.toLowerCase()}`);a[i]=Q(t)}return a},Tr=(e,a,u)=>{if(u<=0)return{from:0,to:0,total:0};const t=Math.max(1,Math.ceil(u/a)),i=Math.min(Math.max(e,1),t),s=(i-1)*a+1,E=Math.min(i*a,u);return{from:s,to:E,total:u}},Or=(e,a,u)=>{const t={...e};switch(a){case"status":t.status=u?"ENABLED":"DISABLED";break;case"name":t.name=u;break;case"description":t.description=u;break;case"ruleType":t.condition.attribute=u;break;case"ruleCondition":t.condition.operator=u;break;case"ruleValue":{let i=typeof u=="string"?u.replace(/[^\d]/g,""):String(u);i===""?t.condition.attribute==="NUMBER_OF_SKUS"?t.condition.quantity="":t.condition.amount.value="":t.condition.attribute==="NUMBER_OF_SKUS"?t.condition.quantity=+i:t.condition.amount.value=+i;break}case"ruleConditionCurrency":t.condition.amount.currency=u;break;case"approvers":t.approvers=u;break;case"roleType":t.roleType=u;break;case"appliesTo":t.appliesTo=u;break}return t},Ur=e=>{const a={};return(!e.name||e.name.trim()==="")&&(a.name="PurchaseOrders.approvalRuleForm.errorsMessages.required"),e.roleType==="specific_roles"&&(!e.appliesTo||e.appliesTo.length===0)&&(a.appliesTo="PurchaseOrders.approvalRuleForm.errorsMessages.approvers"),e.condition.attribute==="NUMBER_OF_SKUS"?e.condition.quantity===""&&(a.ruleValue="PurchaseOrders.approvalRuleForm.errorsMessages.required"):e.condition.amount.value===""&&(a.ruleValue="PurchaseOrders.approvalRuleForm.errorsMessages.required"),(!e.approvers||e.approvers.length===0)&&(a.approvers="PurchaseOrders.approvalRuleForm.errorsMessages.approvers"),a},dr=(e,a,u)=>{const t={...a};return Object.keys(e).forEach(i=>{u[i]&&(t[i]=e[i])}),Object.keys(t).forEach(i=>{u[i]&&!e[i]&&delete t[i]}),t},B={GRAND_TOTAL:"ruleTypeGrandTotal",SHIPPING_INCL_TAX:"ruleTypeShippingInclTax",NUMBER_OF_SKUS:"ruleTypeNumberOfSkus"},G={MORE_THAN:"conditionOperatorMoreThan",LESS_THAN:"conditionOperatorLessThan",MORE_THAN_OR_EQUAL_TO:"conditionOperatorMoreThanOrEqualTo",LESS_THAN_OR_EQUAL_TO:"conditionOperatorLessThanOrEqualTo"},Re={ALL_USERS:"appliesToAllUsers",SPECIFIC_ROLES:"appliesToSpecificRoles"},Be={status:"ENABLED",name:"",description:"",roleType:"all_users",appliesTo:[],condition:{quantity:"",amount:{currency:"USD",value:""},attribute:"GRAND_TOTAL",operator:"MORE_THAN"},approvers:[]},Dr={formValues:Be,isLoading:!1,submitError:null,availableAppliesTo:[],availableRequiresApprovalFrom:[],errors:{},touched:{},currencyCodesList:[{text:"USD",value:"USD"}]},Cr={name:!0,appliesTo:!0,ruleValue:!0,approvers:!0},Lr={REQUIRED:"PurchaseOrders.approvalRuleForm.errorsMessages.required",APPROVERS:"PurchaseOrders.approvalRuleForm.errorsMessages.approvers",FAILED_TO_LOAD:"Failed to load metadata. Please try again.",FAILED_TO_CREATE:"Failed to create approval rule. Please try again."},mr=e=>[{text:e[B.GRAND_TOTAL],value:"GRAND_TOTAL"},{text:e[B.SHIPPING_INCL_TAX],value:"SHIPPING_INCL_TAX"},{text:e[B.NUMBER_OF_SKUS],value:"NUMBER_OF_SKUS"}],Ir=e=>[{text:e[G.MORE_THAN],value:"MORE_THAN"},{text:e[G.LESS_THAN],value:"LESS_THAN"},{text:e[G.MORE_THAN_OR_EQUAL_TO],value:"MORE_THAN_OR_EQUAL_TO"},{text:e[G.LESS_THAN_OR_EQUAL_TO],value:"LESS_THAN_OR_EQUAL_TO"}],wr=e=>[{text:e[Re.ALL_USERS],value:"all_users"},{text:e[Re.SPECIFIC_ROLES],value:"specific_roles"}],Qe="ENABLED",ze="GRAND_TOTAL",We="MORE_THAN",Ye="USD",je=0,Ke=0,Xe=e=>Object.keys(B).includes(e),Je=e=>Object.keys(G).includes(e),xr=e=>{var a,u,t,i,s,E,p,c,y,o;return{status:e.status||Qe,name:e.name||"",description:e.description||"",roleType:((a=e.appliesToRoles)==null?void 0:a.length)>0?"specific_roles":"all_users",appliesTo:((u=e.appliesToRoles)==null?void 0:u.map(h=>h.id))||[],condition:{quantity:((t=e.condition)==null?void 0:t.quantity)??je,amount:{currency:((s=(i=e.condition)==null?void 0:i.amount)==null?void 0:s.currency)||Ye,value:((p=(E=e.condition)==null?void 0:E.amount)==null?void 0:p.value)??Ke},attribute:Xe((c=e.condition)==null?void 0:c.attribute)?e.condition.attribute:ze,operator:Je((y=e.condition)==null?void 0:y.operator)?e.condition.operator:We},approvers:((o=e.approverRoles)==null?void 0:o.map(h=>h.id))||[]}},he=e=>e!=null&&e!==""&&e!==0;function Nr(e){const{roleType:a,appliesTo:u,condition:t,...i}=e,s=a==="all_users"?{appliesTo:[]}:{appliesTo:u};let E={};if(t){const{amount:c,quantity:y,...o}=t,h={...o};he(c==null?void 0:c.value)&&(h.amount=c),he(y)&&(h.quantity=y),E=h}return Q({...i,...s,condition:E})}const Fr=e=>{const a=e.toUpperCase();return["APPROVED","ORDER_PLACED","APPROVED_PENDING_PAYMENT","ENABLED"].includes(a)?"positive":["REJECTED","CANCELED","ORDER_FAILED","DISABLED"].includes(a)?"negative":"waiting"},Mr=async(e,a=20,u=1)=>v($e,{variables:{filter:Q(e),pageSize:a,currentPage:u}}).then(t=>{var p,c,y,o,h,f,U,C;if((p=t.errors)!=null&&p.length&&T(t.errors),!((y=(c=t.data)==null?void 0:c.customer)!=null&&y.purchase_orders))throw new Error("Failed to get purchase orders");const i=(h=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:h.purchase_orders,s=(i==null?void 0:i.total_count)??0,E={currentPage:((f=i==null?void 0:i.page_info)==null?void 0:f.current_page)??1,pageSize:((U=i==null?void 0:i.page_info)==null?void 0:U.page_size)??20,totalPages:((C=i==null?void 0:i.page_info)==null?void 0:C.total_pages)??1};return{totalCount:s,pageInfo:E,purchaseOrderItems:((i==null?void 0:i.items)||[]).map(M)}}).catch(S),Ze=`
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
`,Hr=async e=>{var u;if(!e||e.trim()==="")throw new Error("Purchase Order UID is required");const a={purchase_order_uid:e};try{const t=await v(Ze,{variables:{input:a}});return(u=t.errors)!=null&&u.length&&T(t.errors),xe(t)}catch(t){throw S(t)}},qe=`
  mutation PLACE_PURCHASE_ORDER($input: PlacePurchaseOrderInput!) {
    placePurchaseOrder(input: $input) {
      purchase_order {
        ...PURCHASE_ORDERS_FRAGMENT
      }
    }
  }
  ${F}
`,Vr=async e=>{if(!e||e.trim()==="")throw new Error("Cart ID is required");return v(qe,{variables:{input:{cart_id:e}}}).then(u=>{var s,E,p;(s=u.errors)!=null&&s.length&&T(u.errors);const t=(p=(E=u.data)==null?void 0:E.placePurchaseOrder)==null?void 0:p.purchase_order,i=M(t);return $.emit("purchase-order/placed",i),{purchaseOrder:i}}).catch(S)},er=`
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
`,Gr=async()=>v(er,{variables:{}}).then(e=>{var a;return(a=e.errors)!=null&&a.length&&T(e.errors),Ne(e)}).catch(S),rr=`
  query GET_CURRENCY_INFO {
    currency {
      base_currency_code
      available_currency_codes
    }
  }
`,$r=async()=>v(rr,{}).then(e=>{var t,i,s,E,p;if(!e)return{baseCurrencyCode:"USD",availableCurrencyCodes:[]};(t=e.errors)!=null&&t.length&&T(e.errors);const a=((s=(i=e==null?void 0:e.data)==null?void 0:i.currency)==null?void 0:s.available_currency_codes)??[];return{baseCurrencyCode:((p=(E=e==null?void 0:e.data)==null?void 0:E.currency)==null?void 0:p.base_currency_code)||"USD",availableCurrencyCodes:a.length?a.map(c=>({text:String(c),value:String(c)})):[]}}).catch(S),nr=`
  query GET_PURCHASE_ORDER_APPROVAL_RULE($uid: ID!) {
    customer {
      purchase_order_approval_rule(uid: $uid) {
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
        }
        approver_roles {
          id
          name
          users_count
        }
        condition {
          attribute
          operator
          ... on PurchaseOrderApprovalRuleConditionAmount {
            attribute
            operator
            amount {
              currency
              value
            }
          }
          ... on PurchaseOrderApprovalRuleConditionQuantity {
            attribute
            operator
            quantity
          }
        }
      }
    }
  }
`,kr=async e=>v(nr,{variables:{uid:e}}).then(a=>{var t,i,s;(t=a.errors)!=null&&t.length&&T(a.errors);const u=(s=(i=a==null?void 0:a.data)==null?void 0:i.customer)==null?void 0:s.purchase_order_approval_rule;return z(u)}).catch(S),tr=`
  query GET_PURCHASE_ORDER_APPROVAL_RULES($currentPage: Int!, $pageSize: Int!) {
    customer {
      email
      purchase_order_approval_rules(
        currentPage: $currentPage
        pageSize: $pageSize
      ) {
        items {
          applies_to_roles {
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
          approver_roles {
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
          condition {
            attribute
            operator
          }
          created_at
          created_by
          description
          name
          status
          uid
          updated_at
        }
        total_count
        page_info {
          page_size
          current_page
          total_pages
        }
      }
    }
  }
`,V={currentPage:1,pageSize:20,totalPages:1},Br=async(e=V.currentPage,a=V.pageSize)=>v(tr,{variables:{currentPage:e,pageSize:a}}).then(u=>{var E,p,c,y,o,h;(E=u.errors)!=null&&E.length&&T(u.errors);const t=(c=(p=u==null?void 0:u.data)==null?void 0:p.customer)==null?void 0:c.purchase_order_approval_rules,i=(t==null?void 0:t.total_count)??0,s={currentPage:((y=t==null?void 0:t.page_info)==null?void 0:y.current_page)??V.currentPage,pageSize:((o=t==null?void 0:t.page_info)==null?void 0:o.page_size)??V.pageSize,totalPages:((h=t==null?void 0:t.page_info)==null?void 0:h.total_pages)??V.totalPages};return{totalCount:i,pageInfo:s,items:((t==null?void 0:t.items)||[]).map(z)}}).catch(S),Qr={PO_ALL:"Magento_PurchaseOrder::all",VIEW_CUSTOMER:"Magento_PurchaseOrder::view_purchase_orders",VIEW_SUBORDINATES:"Magento_PurchaseOrder::view_purchase_orders_for_subordinates",VIEW_COMPANY:"Magento_PurchaseOrder::view_purchase_orders_for_company",AUTO_APPROVE:"Magento_PurchaseOrder::autoapprove_purchase_order",SUPER_APPROVE:"Magento_PurchaseOrderRule::super_approve_purchase_order",VIEW_RULES:"Magento_PurchaseOrderRule::view_approval_rules",MANAGE_RULES:"Magento_PurchaseOrderRule::manage_approval_rules"};export{Dr as I,Qr as PO_PERMISSIONS,Cr as R,Lr as V,Fr as a,Ar as addPurchaseOrderComment,Rr as addPurchaseOrderItemsToCart,Er as approvePurchaseOrders,Ir as b,mr as c,gr as cancelPurchaseOrders,pr as config,hr as createPurchaseOrderApprovalRule,$r as currencyInfo,wr as d,br as deletePurchaseOrderApprovalRule,Nr as e,Sr as f,v as fetchGraphQl,Tr as g,or as getConfig,de as getPurchaseOrder,kr as getPurchaseOrderApprovalRule,Gr as getPurchaseOrderApprovalRuleMetadata,Br as getPurchaseOrderApprovalRules,Mr as getPurchaseOrders,Or as h,vr as i,Y as initialize,Hr as placeOrderForPurchaseOrder,Vr as placePurchaseOrder,yr as rejectPurchaseOrders,cr as removeFetchGraphQlHeader,lr as setEndpoint,_r as setFetchGraphQlHeader,sr as setFetchGraphQlHeaders,xr as t,dr as u,Pr as updatePurchaseOrderApprovalRule,Ur as v,fr as validatePurchaseOrders};
//# sourceMappingURL=api.js.map
