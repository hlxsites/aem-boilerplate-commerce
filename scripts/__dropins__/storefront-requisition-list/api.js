/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as p}from"@dropins/tools/event-bus.js";import{Initializer as b}from"@dropins/tools/lib.js";import{FetchGraphQL as $}from"@dropins/tools/fetch-graphql.js";const _i=i=>(i==null?void 0:i.requisition_list_sharing_enabled)===!0,ai=i=>(i==null?void 0:i.requisition_list_public_sharing_enabled)===!0,A={authenticated:!1,config:void 0,isCompanyUser:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},m=new Proxy(A,{set(i,t,s){return Reflect.set(i,t,s)},get(i,t){return i[t]}}),li=i=>{m.requisitionLists=i,m.requisitionListsVersion++},ci=i=>{m.requisitionLists.some(s=>s.uid===i.uid)?m.requisitionLists=m.requisitionLists.map(s=>s.uid===i.uid?i:s):m.requisitionLists=[...m.requisitionLists,i],m.requisitionListsVersion++},Ii=()=>m.requisitionLists,Ti=i=>{m.requisitionListsLoading=i},h=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
    requisition_list_sharing_enabled
    requisition_list_share_max_recipients
    requisition_list_share_storefront_path
    configurable_thumbnail_source
    requisition_list_public_sharing_enabled
    requisition_list_public_share_link_validity_days
    requisition_list_public_share_max_recipients
    requisition_list_public_share_storefront_path
  }
}
`;function q(i){var t,s;return i?{uid:i.uid,name:i.name,description:i.description,updated_at:i.updated_at,items_count:i.items_count,items:y((t=i.items)==null?void 0:t.items),page_info:(s=i.items)==null?void 0:s.page_info,is_public:i.is_public??!1}:null}function y(i){return i!=null&&i.length?i.map(t=>{var n,e,o,u,r,_,l;const s={uid:t.uid,sku:(n=t.product)==null?void 0:n.sku,name:(e=t.product)==null?void 0:e.name,image:(o=t.product)==null?void 0:o.small_image,urlKey:(u=t.product)==null?void 0:u.url_key,quantity:t.quantity,stock_status:((r=t.product)==null?void 0:r.stock_status)||"IN_STOCK",only_x_left_in_stock:((_=t.product)==null?void 0:_.only_x_left_in_stock)??null,customizable_options:t.customizable_options?t.customizable_options.map(a=>({uid:a.customizable_option_uid,is_required:a.is_required,label:a.label,sort_order:a.sort_order,type:a.type,values:a.values.map(I=>({uid:I.customizable_option_value_uid,label:I.label,price:I.price,value:I.value}))})):[],bundle_options:t.bundle_options||[],configurable_options:t.configurable_options?t.configurable_options.map(a=>({option_uid:a.configurable_product_option_uid,option_label:a.option_label,value_uid:a.configurable_product_option_value_uid,value_label:a.value_label})):[],samples:t.samples?t.samples.map(a=>({url:a.sample_url,sort_order:a.sort_order,title:a.title})):[],gift_card_options:t.gift_card_options||{}};return(l=t.configured_product)!=null&&l.name?{...s,configured_product:t.configured_product}:s}):[]}function M(i){return{...i,requisition_list_sharing_enabled:!!+(i==null?void 0:i.requisition_list_sharing_enabled),requisition_list_share_max_recipients:(i==null?void 0:i.requisition_list_share_max_recipients)!=null?+i.requisition_list_share_max_recipients:null,requisition_list_public_sharing_enabled:!!+(i==null?void 0:i.requisition_list_public_sharing_enabled),requisition_list_public_share_link_validity_days:(i==null?void 0:i.requisition_list_public_share_link_validity_days)!=null?+i.requisition_list_public_share_link_validity_days:null,requisition_list_public_share_max_recipients:(i==null?void 0:i.requisition_list_public_share_max_recipients)!=null?+i.requisition_list_public_share_max_recipients:null}}const E={is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null,configurable_thumbnail_source:null,requisition_list_public_sharing_enabled:!1,requisition_list_public_share_link_validity_days:null,requisition_list_public_share_max_recipients:null,requisition_list_public_share_storefront_path:null},P=async()=>{try{const{errors:i,data:t}=await c(h,{cache:"force-cache"});return(i==null?void 0:i.some(n=>{var e,o;return((e=n.message)==null?void 0:e.includes('Cannot query field "is_requisition_list_active"'))||((o=n.message)==null?void 0:o.includes('Cannot query field "company_enabled"'))}))?!1:i!=null&&i.length||!(t!=null&&t.storeConfig)?E:M(t.storeConfig)}catch{return E}},f=new b({init:async i=>{const t={};m.config||(m.config=await P(),p.emit("requisitionList/initialized",m.config)),f.config.setConfig({...t,...i})},listeners:()=>[p.on("authenticated",i=>{m.authenticated=i,i||(m.isCompanyUser=!1)}),p.on("auth/permissions",i=>{m.isCompanyUser=i!=null&&typeof i=="object"&&Object.entries(i).some(([t,s])=>s===!0&&(t==="admin"||t.startsWith("Magento_Company::")))},{eager:!0})]}),mi=f.config,{setEndpoint:qi,setFetchGraphQlHeader:Li,removeFetchGraphQlHeader:pi,setFetchGraphQlHeaders:gi,fetchGraphQl:c,getConfig:Ri}=new $().getMethods(),Q=`
query CONFIGURABLE_OPTIONS_QUERY($skus: [String]) {
  products(skus: $skus) {
    sku
    ... on ComplexProductView {
      options {
        title
        values {
          id
          title
        }
      }
    }
  }
}
`,v=`
query REFINE_CONFIGURABLE_VARIANT_QUERY($sku: String!, $optionIds: [String!]!) {
  refineProduct(sku: $sku, optionIds: $optionIds) {
    ...PRODUCT_VARIANT_FRAGMENT
  }
}

fragment PRODUCT_VARIANT_FRAGMENT on ProductView {
  sku
  name
  images(roles: []) {
    url
  }
  ... on SimpleProductView {
    price {
      regular {
        amount {
          value
          currency
        }
      }
      final {
        amount {
          value
          currency
        }
      }
    }
  }
}
`,k=(i,t)=>{const s=[];for(const n of i.configurable_options){const e=t.find(u=>u.title===n.option_label),o=e==null?void 0:e.values.find(u=>u.title===n.value_label);if(!o)return null;s.push(o.id)}return s},C=i=>{var t,s,n,e,o,u;return{name:i.name,sku:i.sku,images:(t=i.images)!=null&&t.length?[{url:i.images[0].url}]:void 0,price:{regular:(s=i.price)!=null&&s.regular?{amount:{value:i.price.regular.amount.value,currency:i.price.regular.amount.currency}}:void 0,final:{amount:{value:((e=(n=i.price)==null?void 0:n.final)==null?void 0:e.amount.value)||0,currency:((u=(o=i.price)==null?void 0:o.final)==null?void 0:u.amount.currency)||""}}}}},R=async i=>{const t=i.filter(r=>{var _;return r.sku&&((_=r.configurable_options)==null?void 0:_.length)});if(!t.length)return i;const s=Array.from(new Set(t.map(r=>r.sku)));let n;try{const{errors:r,data:_}=await c(Q,{variables:{skus:s}});if(r||!(_!=null&&_.products))return i;n=_.products.reduce((l,a)=>(a&&(l[a.sku]=a.options||[]),l),{})}catch{return i}const e=new Map;for(const r of t){const _=n[r.sku];if(!(_!=null&&_.length))continue;const l=k(r,_);l&&e.set(r,l)}if(!e.size)return i;const o=await Promise.all(Array.from(e.entries()).map(async([r,_])=>{try{const{errors:l,data:a}=await c(v,{variables:{sku:r.sku,optionIds:_}});return l||!(a!=null&&a.refineProduct)?null:{item:r,product:a.refineProduct}}catch{return null}})),u=new Map;return o.forEach(r=>{r&&u.set(r.item,C(r.product))}),u.size?i.map(r=>{const _=u.get(r);return _?{...r,configured_product:_}:r}):i},L=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
    is_public
  }
`,g=`
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
    product {
      sku
      stock_status
      only_x_left_in_stock
    }
    customizable_options {
      customizable_option_uid
      is_required
      label
      sort_order
      type
      values {
        customizable_option_value_uid
        label
        value
        price {
          type
          units
          value
        }
      }
    }
    ... on ConfigurableRequisitionListItem {
      configurable_options {
        configurable_product_option_uid
        configurable_product_option_value_uid
        option_label
        value_label
      }
    }
    ... on DownloadableRequisitionListItem {
      links {
        price
        sample_url
        sort_order
        title
        uid
      }
      samples {
        sample_url
        sort_order
        title
      }
    }
    ... on BundleRequisitionListItem {
      bundle_options {
        uid
        type
        label
        values {
          uid
          label
          quantity
          priceV2 {
            value
            currency
          }
          original_price {
            value
            currency
          }
        }
      }
    }
    ... on GiftCardRequisitionListItem {
      gift_card_options {
        amount {
          currency
          value
        }
        custom_giftcard_amount {
          currency
          value
        }
        message
        recipient_email
        recipient_name
        sender_name
        sender_email
      }
    }
  }
  page_info {
    page_size
    current_page
    total_pages
  }
}
`,N=`
  query GET_REQUISITION_LIST_QUERY(
    $requisitionListUid: String,
    $currentPage: Int = 1,
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists (
        filter: {
          uids: {
            eq: $requisitionListUid
          }
        }
      ){
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $pageSize, currentPage: $currentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
      }
    }
  }
${g}
${L}
`,w=`
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 10,
    $listItemsPageSize: Int = 100,
    $listItemsCurrentPage: Int = 1,
  ) {
    customer {
      requisition_lists(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $listItemsPageSize, currentPage: $listItemsCurrentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
${L}
${g}
`,T=i=>{const t=i.map(s=>s.message).join(" ");throw Error(t)};function O(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}async function G(i,t){var o,u,r,_;const s=i.page_info;if(!s||s.total_pages<=1||s.current_page>=s.total_pages)return i;const n=String(i.uid);if(!O(n))return i;const e=[...i.items??[]];for(let l=s.current_page+1;l<=s.total_pages;l+=1){const{errors:a,data:I}=await c(N,{variables:{requisitionListUid:n,currentPage:l,pageSize:t}});a&&T(a);const d=(r=(u=(o=I==null?void 0:I.customer)==null?void 0:o.requisition_lists)==null?void 0:u.items)==null?void 0:r[0];if(!d)break;const S=q(d);(_=S==null?void 0:S.items)!=null&&_.length&&e.push(...S.items)}return{...i,items:e,page_info:{current_page:1,total_pages:1,page_size:e.length}}}const di=async(i,t,s=100)=>{var u,r,_,l,a;const{errors:n,data:e}=await c(w,{variables:{currentPage:i,pageSize:t,listItemsPageSize:s,listItemsCurrentPage:1}});if(n)return T(n);if(!((u=e==null?void 0:e.customer)!=null&&u.requisition_lists))return null;let o=e.customer.requisition_lists.items.map(I=>q(I));return o=await Promise.all(o.map(I=>I==null?Promise.resolve(I):G(I,s))),p.emit("requisitionLists/data",o),{items:o,page_info:(_=(r=e.customer)==null?void 0:r.requisition_lists)==null?void 0:_.page_info,total_count:(a=(l=e.customer)==null?void 0:l.requisition_lists)==null?void 0:a.total_count}},Si=async(i,t,s,n=R)=>{var _,l,a,I;if(!O(i))return console.error("Invalid requisition list UID format:",i),null;const{errors:e,data:o}=await c(N,{variables:{requisitionListUid:i,currentPage:t,pageSize:s}});if(e)return T(e);if(!((a=(l=(_=o==null?void 0:o.customer)==null?void 0:_.requisition_lists)==null?void 0:l.items)!=null&&a[0]))return null;const u=o.customer.requisition_lists.items[0];let r=q(u);return(I=r==null?void 0:r.items)!=null&&I.length&&n&&(r={...r,items:await n(r.items)}),p.emit("requisitionList/data",r),r},z=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!,
      $description: String,
      $isPublic: Boolean,
      $pageSize: Int,
      $currentPage: Int
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
        is_public: $isPublic
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${L}
${g}
`,Ei=async(i,t,s,n,e,o=R,u)=>{var I,d;const{errors:r,data:_}=await c(z,{variables:{requisitionListUid:i,name:t,description:s,isPublic:u,pageSize:n,currentPage:e}});if(r)return T(r);if(!((I=_==null?void 0:_.updateRequisitionList)!=null&&I.requisition_list))return null;const l=_.updateRequisitionList.requisition_list;let a=q(l);return(d=a==null?void 0:a.items)!=null&&d.length&&o&&(a={...a,items:await o(a.items)}),p.emit("requisitionList/data",a),a},D=`
  mutation DELETE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
    ) {
    deleteRequisitionList(
      requisitionListUid: $requisitionListUid
    ) {
      status
      requisition_lists {
        items {
          ...REQUISITION_LIST_FRAGMENT
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
${L}
`,Ui=async i=>c(D,{variables:{requisitionListUid:i}}).then(({errors:t,data:s})=>{var e,o,u,r,_,l;if(!i)return null;if(t)return T(t);if(!((e=s==null?void 0:s.deleteRequisitionList)!=null&&e.requisition_lists))return null;const n=((u=(o=s.deleteRequisitionList.requisition_lists)==null?void 0:o.items)==null?void 0:u.map(a=>q(a)))||[];return p.emit("requisitionLists/data",n),{items:n,page_info:(_=(r=s.deleteRequisitionList)==null?void 0:r.requisition_lists)==null?void 0:_.page_info,status:(l=s.deleteRequisitionList)==null?void 0:l.status}}),F=`
  mutation UPDATE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [UpdateRequisitionListItemsInput!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    updateRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
      ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${L}
${g}
`,fi=async(i,t,s,n,e=R)=>{var l,a;const{errors:o,data:u}=await c(F,{variables:{requisitionListUid:i,requisitionListItems:t,pageSize:s,currentPage:n}});if(o)return T(o);if(!((l=u==null?void 0:u.updateRequisitionListItems)!=null&&l.requisition_list))return null;const r=u.updateRequisitionListItems.requisition_list;let _=q(r);return(a=_==null?void 0:_.items)!=null&&a.length&&e&&(_={..._,items:await e(_.items)}),p.emit("requisitionList/data",_),_},B=`
  mutation DELETE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    deleteRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${L}
${g}
`,Ni=async(i,t,s,n,e=R)=>{var l,a;const{errors:o,data:u}=await c(B,{variables:{requisitionListUid:i,requisitionListItemUids:t,pageSize:s,currentPage:n}});if(o)return T(o);if(!((l=u==null?void 0:u.deleteRequisitionListItems)!=null&&l.requisition_list))return null;const r=u.deleteRequisitionListItems.requisition_list;let _=q(r);return(a=_==null?void 0:_.items)!=null&&a.length&&e&&(_={..._,items:await e(_.items)}),p.emit("requisitionList/data",_),_},Y=`
  mutation ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!
    ) {
    addRequisitionListItemsToCart(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      status
      add_requisition_list_items_to_cart_user_errors {
        message
        type
      }
      cart {
        id
        itemsV2 {
          items {
            uid
            quantity
            is_available
          }
          total_count
        }
        email
        total_quantity
        is_virtual
      }
    }
  }
`,Oi=async(i,t)=>c(Y,{variables:{requisitionListUid:i,requisitionListItemUids:t}}).then(({errors:s,data:n})=>{var e;return s?T(s):(e=n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&e.length?n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(o=>({type:o.type,message:o.message||""})):null}),x=`
  mutation MOVE_ITEMS_BETWEEN_REQUISITION_LISTS_MUTATION(
      $sourceRequisitionListUid: ID!,
      $destinationRequisitionListUid: ID!,
      $requisitionListItem: MoveItemsBetweenRequisitionListsInput,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    moveItemsBetweenRequisitionLists(
      sourceRequisitionListUid: $sourceRequisitionListUid
      destinationRequisitionListUid: $destinationRequisitionListUid
      requisitionListItem: $requisitionListItem
    ) {
      source_requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
      destination_requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${L}
${g}
`,bi=async(i,t,s,n,e)=>{const{errors:o,data:u}=await c(x,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:t,requisitionListItem:{requisitionListItemUids:s},pageSize:n,currentPage:e}});if(o)return T(o);if(!(u!=null&&u.moveItemsBetweenRequisitionLists))return null;const{source_requisition_list:r,destination_requisition_list:_}=u.moveItemsBetweenRequisitionLists,l=r?q(r):null,a=_?q(_):null;return l&&p.emit("requisitionList/data",l),{sourceList:l,destinationList:a}},V=`
  mutation COPY_ITEMS_BETWEEN_REQUISITION_LISTS_MUTATION(
      $sourceRequisitionListUid: ID!,
      $destinationRequisitionListUid: ID!,
      $requisitionListItem: CopyItemsBetweenRequisitionListsInput
    ) {
    copyItemsBetweenRequisitionLists(
      sourceRequisitionListUid: $sourceRequisitionListUid
      destinationRequisitionListUid: $destinationRequisitionListUid
      requisitionListItem: $requisitionListItem
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${L}
`,$i=async(i,t,s)=>{var u;const{errors:n,data:e}=await c(V,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:t,requisitionListItem:{requisitionListItemUids:s}}});return n?T(n):(u=e==null?void 0:e.copyItemsBetweenRequisitionLists)!=null&&u.requisition_list?{destinationList:q(e.copyItemsBetweenRequisitionLists.requisition_list)}:null},H=`
  query GET_COMPANY_USERS_QUERY(
    $pageSize: Int = 100
    $currentPage: Int = 1
  ) {
    company {
      users(
        filter: { status: ACTIVE }
        pageSize: $pageSize
        currentPage: $currentPage
      ) {
        items {
          id
          firstname
          lastname
          email
        }
        page_info {
          total_pages
          current_page
        }
      }
    }
  }
`,K=100,U=async i=>{var e,o,u;const{errors:t,data:s}=await c(H,{variables:{pageSize:K,currentPage:i}});if(t)return null;const n=(e=s==null?void 0:s.company)==null?void 0:e.users;return(o=n==null?void 0:n.items)!=null&&o.length?{items:n.items,totalPages:((u=n.page_info)==null?void 0:u.total_pages)??1}:null},Ai=async()=>{const i=await U(1);if(!i)return[];const{items:t,totalPages:s}=i;if(s<=1)return t;const n=await Promise.all(Array.from({length:s-1},(e,o)=>U(o+2)));return[...t,...n.flatMap(e=>(e==null?void 0:e.items)??[])]},W=`
  mutation SHARE_REQUISITION_LIST_BY_EMAIL_MUTATION(
    $requisitionListUid: ID!
    $customerUids: [ID!]!
  ) {
    shareRequisitionListByEmail(
      input: {
        requisitionListUid: $requisitionListUid
        customerUids: $customerUids
      }
    ) {
      sent_count
      user_errors {
        message
        code
      }
    }
  }
`,hi=async(i,t)=>c(W,{variables:{requisitionListUid:i,customerUids:t}}).then(({errors:s,data:n})=>{var o;if(s)return T(s);const e=n==null?void 0:n.shareRequisitionListByEmail;return((e==null?void 0:e.sent_count)??0)>0?null:(o=e==null?void 0:e.user_errors)!=null&&o.length?e.user_errors.map(u=>({message:u.message,code:u.code})):[{code:"SHARE_FAILED",message:"Unable to share requisition list."}]}),j=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,yi=async i=>{var t,s;try{const{errors:n,data:e}=await c(j,{variables:{requisitionListUid:i}});return n!=null&&n.length?{token:null,errorMessage:((t=n[0])==null?void 0:t.message)??null}:{token:((s=e==null?void 0:e.shareRequisitionListByToken)==null?void 0:s.token)??null,errorMessage:null}}catch(n){return{token:null,errorMessage:n instanceof Error?n.message:"Unable to generate share link."}}},Z=`
  query GET_SHARED_REQUISITION_LIST_QUERY(
    $token: String!
    $currentPage: Int = 1
    $pageSize: Int = 10
  ) {
    sharedRequisitionList(token: $token) {
      sender_name
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${g}
${L}
`,Mi=async(i,t,s,n=R)=>{var _;const{errors:e,data:o}=await c(Z,{variables:{token:i,currentPage:t,pageSize:s}});if(e)return T(e);const u=o==null?void 0:o.sharedRequisitionList;if(!(u!=null&&u.requisition_list))return null;let r=q(u.requisition_list);return r?((_=r.items)!=null&&_.length&&n&&(r={...r,items:await n(r.items)}),{senderName:u.sender_name,requisitionList:r}):null},J=`
  mutation IMPORT_SHARED_REQUISITION_LIST_MUTATION($token: String!) {
    importSharedRequisitionList(token: $token) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
      user_errors {
        message
        code
      }
    }
  }
${L}
`,Pi=async i=>{const{errors:t,data:s}=await c(J,{variables:{token:i}});if(t)return T(t);const n=s==null?void 0:s.importSharedRequisitionList;return{requisitionList:n!=null&&n.requisition_list?q(n.requisition_list)??null:null,userErrors:((n==null?void 0:n.user_errors)??[]).map(e=>({message:e.message,code:e.code}))}},X=`
  query GET_PUBLIC_REQUISITION_LIST_QUERY(
    $token: ID!
    $currentPage: Int = 1
    $pageSize: Int = 10
  ) {
    publicRequisitionList(token: $token) {
      sender_name
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
          items {
            uid
            product { name small_image { url label } url_key }
          }
        }
      }
    }
  }
${g}
${L}
`,Qi=async(i,t,s,n=R)=>{var _;const{errors:e,data:o}=await c(X,{variables:{token:i,currentPage:t,pageSize:s}});if(e)return T(e);const u=o==null?void 0:o.publicRequisitionList,r=u!=null&&u.requisition_list?q(u.requisition_list):null;return r?((_=r.items)!=null&&_.length&&(r.items=await n(r.items)),{senderName:u.sender_name,requisitionList:r}):null},ii=`
  mutation ADD_PUBLIC_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(
    $input: AddPublicRequisitionListItemsToCartInput!
  ) {
    addPublicRequisitionListItemsToCart(input: $input) {
      cart { id }
      user_errors { code message }
    }
  }
`,vi=async(i,t,s)=>{const{errors:n,data:e}=await c(ii,{variables:{input:{token:i,cart_id:t,item_uids:s}}});if(n)return T(n);const o=e==null?void 0:e.addPublicRequisitionListItemsToCart;return o?{cart:o.cart,userErrors:o.user_errors??[]}:{cart:null,userErrors:[{code:"UNKNOWN_ERROR",message:"Unable to add items to cart."}]}},ei=`
  mutation SHARE_PUBLIC_REQUISITION_LIST_MUTATION($input: SharePublicRequisitionListInput!) {
    sharePublicRequisitionList(input: $input) {
      sent_count
      user_errors { code message }
    }
  }
`,ki=async(i,t)=>{var o;const{errors:s,data:n}=await c(ei,{variables:{input:{requisition_list_uid:i,emails:t}}});if(s)return T(s);const e=n==null?void 0:n.sharePublicRequisitionList;return(o=e==null?void 0:e.user_errors)!=null&&o.length?e.user_errors:((e==null?void 0:e.sent_count)??0)>0?null:[{code:"UNKNOWN_ERROR",message:"Unable to share requisition list."}]},ti=`
  query GET_PUBLIC_REQUISITION_LIST_TOKEN_QUERY($requisitionListUid: String!) {
    customer {
      requisition_lists(filter: { uids: { eq: $requisitionListUid } }) {
        items { token }
      }
    }
  }
`,Ci=async i=>{var t,s,n,e,o;try{const{errors:u,data:r}=await c(ti,{variables:{requisitionListUid:i}});return u!=null&&u.length?{token:null,errorMessage:((t=u[0])==null?void 0:t.message)??null}:{token:((o=(e=(n=(s=r==null?void 0:r.customer)==null?void 0:s.requisition_lists)==null?void 0:n.items)==null?void 0:e[0])==null?void 0:o.token)??null,errorMessage:null}}catch(u){return{token:null,errorMessage:u instanceof Error?u.message:"Unable to retrieve the public share link."}}},si=`
  mutation CREATE_REQUISITION_LIST_MUTATION(
      $requisitionListName: String!,
      $requisitionListDescription: String,
      $isPublic: Boolean
    ) {
    createRequisitionList(
      input: {
        name: $requisitionListName
        description: $requisitionListDescription
        is_public: $isPublic
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${L}
`,wi=async(i,t,s)=>c(si,{variables:{requisitionListName:i,requisitionListDescription:t,isPublic:s}}).then(({errors:n,data:e})=>{var u;if(n)return T(n);if(!((u=e==null?void 0:e.createRequisitionList)!=null&&u.requisition_list))return null;const o=q(e.createRequisitionList.requisition_list);return p.emit("requisitionList/data",o),o}),ni=`
  mutation ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [RequisitionListItemsInput!]!
    ) {
    addProductsToRequisitionList(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${g}
${L}
`,Gi=async(i,t)=>{var u;const s=t.map(r=>{const _={sku:r.sku,quantity:r.quantity};return r.parent_sku&&(_.parent_sku=r.parent_sku),r.selected_options&&r.selected_options.length>0&&(_.selected_options=r.selected_options),r.entered_options&&r.entered_options.length>0&&(_.entered_options=r.entered_options),_}),{errors:n,data:e}=await c(ni,{variables:{requisitionListUid:i,requisitionListItems:s}});if(n)return T(n);if(!((u=e==null?void 0:e.addProductsToRequisitionList)!=null&&u.requisition_list))return null;const o=q(e.addProductsToRequisitionList.requisition_list);return p.emit("requisitionList/data",o),o};export{Ti as a,vi as addPublicRequisitionListItemsToCart,Oi as addRequisitionListItemsToCart,li as b,wi as c,mi as config,$i as copyItemsBetweenRequisitionLists,Gi as d,Ui as deleteRequisitionList,Ni as deleteRequisitionListItems,_i as e,R as enrichConfigurableProducts,O as f,c as fetchGraphQl,Ii as g,Ai as getCompanyUsers,Ri as getConfig,Qi as getPublicRequisitionList,Ci as getPublicRequisitionListToken,Si as getRequisitionList,di as getRequisitionLists,Mi as getSharedRequisitionList,P as getStoreConfig,ai as i,Pi as importSharedRequisitionList,f as initialize,bi as moveItemsBetweenRequisitionLists,pi as removeFetchGraphQlHeader,m as s,qi as setEndpoint,Li as setFetchGraphQlHeader,gi as setFetchGraphQlHeaders,ki as sharePublicRequisitionList,hi as shareRequisitionListByEmail,yi as shareRequisitionListByToken,ci as u,Ei as updateRequisitionList,fi as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
