/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as L}from"@dropins/tools/event-bus.js";import{Initializer as O}from"@dropins/tools/lib.js";import{FetchGraphQL as $}from"@dropins/tools/fetch-graphql.js";const A={authenticated:!1,config:void 0,isCompanyUser:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},c=new Proxy(A,{set(i,e,n){return Reflect.set(i,e,n)},get(i,e){return i[e]}}),ei=i=>{c.requisitionLists=i,c.requisitionListsVersion++},si=i=>{c.requisitionLists.some(n=>n.uid===i.uid)?c.requisitionLists=c.requisitionLists.map(n=>n.uid===i.uid?i:n):c.requisitionLists=[...c.requisitionLists,i],c.requisitionListsVersion++},ni=()=>c.requisitionLists,ri=i=>{c.requisitionListsLoading=i},y=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
    requisition_list_sharing_enabled
    requisition_list_share_max_recipients
    requisition_list_share_storefront_path
    configurable_thumbnail_source
  }
}
`,m=i=>{const e=i.map(n=>n.message).join(" ");throw Error(e)},M=async()=>{try{const{errors:i,data:e}=await I(y,{cache:"force-cache"});if(i){if(i.some(t=>t.message&&t.message.includes('Cannot query field "is_requisition_list_active"')||t.message.includes('Cannot query field "company_enabled"')))return!1;const r=i.some(t=>t.message.includes('Cannot query field "requisition_list_sharing_enabled"')),s=i.some(t=>t.message.includes('Cannot query field "requisition_list_share_max_recipients"')),u=i.some(t=>t.message.includes('Cannot query field "requisition_list_share_storefront_path"')),a=i.some(t=>t.message.includes('Cannot query field "configurable_thumbnail_source"'));return r||s||u||a?{...e==null?void 0:e.storeConfig,...r?{requisition_list_sharing_enabled:!1}:{},...s?{requisition_list_share_max_recipients:null}:{},...u?{requisition_list_share_storefront_path:null}:{},...a?{configurable_thumbnail_source:null}:{}}:m(i)}return e==null?void 0:e.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null,configurable_thumbnail_source:null}}},E=new O({init:async i=>{const e={};c.config||(c.config=await M(),L.emit("requisitionList/initialized",c.config)),E.config.setConfig({...e,...i})},listeners:()=>[L.on("authenticated",i=>{c.authenticated=i,i||(c.isCompanyUser=!1)}),L.on("auth/permissions",i=>{c.isCompanyUser=i!=null&&typeof i=="object"&&Object.entries(i).some(([e,n])=>n===!0&&(e==="admin"||e.startsWith("Magento_Company::")))},{eager:!0})]}),oi=E.config,{setEndpoint:ui,setFetchGraphQlHeader:ai,removeFetchGraphQlHeader:_i,setFetchGraphQlHeaders:li,fetchGraphQl:I,getConfig:Ii}=new $().getMethods(),h=`
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
`,b=`
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
`,Q=(i,e)=>{const n=[];for(const r of i.configurable_options){const s=e.find(a=>a.title===r.option_label),u=s==null?void 0:s.values.find(a=>a.title===r.value_label);if(!u)return null;n.push(u.id)}return n},P=i=>{var e,n,r,s,u,a;return{name:i.name,sku:i.sku,images:(e=i.images)!=null&&e.length?[{url:i.images[0].url}]:void 0,price:{regular:(n=i.price)!=null&&n.regular?{amount:{value:i.price.regular.amount.value,currency:i.price.regular.amount.currency}}:void 0,final:{amount:{value:((s=(r=i.price)==null?void 0:r.final)==null?void 0:s.amount.value)||0,currency:((a=(u=i.price)==null?void 0:u.final)==null?void 0:a.amount.currency)||""}}}}},p=async i=>{const e=i.filter(t=>{var o;return t.sku&&((o=t.configurable_options)==null?void 0:o.length)});if(!e.length)return i;const n=Array.from(new Set(e.map(t=>t.sku)));let r;try{const{errors:t,data:o}=await I(h,{variables:{skus:n}});if(t||!(o!=null&&o.products))return i;r=o.products.reduce((_,l)=>(l&&(_[l.sku]=l.options||[]),_),{})}catch{return i}const s=new Map;for(const t of e){const o=r[t.sku];if(!(o!=null&&o.length))continue;const _=Q(t,o);_&&s.set(t,_)}if(!s.size)return i;const u=await Promise.all(Array.from(s.entries()).map(async([t,o])=>{try{const{errors:_,data:l}=await I(b,{variables:{sku:t.sku,optionIds:o}});return _||!(l!=null&&l.refineProduct)?null:{item:t,product:l.refineProduct}}catch{return null}})),a=new Map;return u.forEach(t=>{t&&a.set(t.item,P(t.product))}),a.size?i.map(t=>{const o=a.get(t);return o?{...t,configured_product:o}:t}):i},g=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`,d=`
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
`,U=`
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
${d}
${g}
`,v=`
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
${g}
${d}
`;function q(i){var e,n;return i?{uid:i.uid,name:i.name,description:i.description,updated_at:i.updated_at,items_count:i.items_count,items:w((e=i.items)==null?void 0:e.items),page_info:(n=i.items)==null?void 0:n.page_info}:null}function w(i){return i!=null&&i.length?i.map(e=>{var r,s,u,a;const n={uid:e.uid,sku:(r=e.product)==null?void 0:r.sku,quantity:e.quantity,stock_status:((s=e.product)==null?void 0:s.stock_status)||"IN_STOCK",only_x_left_in_stock:((u=e.product)==null?void 0:u.only_x_left_in_stock)??null,customizable_options:e.customizable_options?e.customizable_options.map(t=>({uid:t.customizable_option_uid,is_required:t.is_required,label:t.label,sort_order:t.sort_order,type:t.type,values:t.values.map(o=>({uid:o.customizable_option_value_uid,label:o.label,price:o.price,value:o.value}))})):[],bundle_options:e.bundle_options||[],configurable_options:e.configurable_options?e.configurable_options.map(t=>({option_uid:t.configurable_product_option_uid,option_label:t.option_label,value_uid:t.configurable_product_option_value_uid,value_label:t.value_label})):[],samples:e.samples?e.samples.map(t=>({url:t.sample_url,sort_order:t.sort_order,title:t.title})):[],gift_card_options:e.gift_card_options||{}};return(a=e.configured_product)!=null&&a.name?{...n,configured_product:e.configured_product}:n}):[]}function N(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}async function C(i,e){var u,a,t,o;const n=i.page_info;if(!n||n.total_pages<=1||n.current_page>=n.total_pages)return i;const r=String(i.uid);if(!N(r))return i;const s=[...i.items??[]];for(let _=n.current_page+1;_<=n.total_pages;_+=1){const{errors:l,data:T}=await I(U,{variables:{requisitionListUid:r,currentPage:_,pageSize:e}});l&&m(l);const R=(t=(a=(u=T==null?void 0:T.customer)==null?void 0:u.requisition_lists)==null?void 0:a.items)==null?void 0:t[0];if(!R)break;const S=q(R);(o=S==null?void 0:S.items)!=null&&o.length&&s.push(...S.items)}return{...i,items:s,page_info:{current_page:1,total_pages:1,page_size:s.length}}}const ci=async(i,e,n=100)=>{var a,t,o,_,l;const{errors:r,data:s}=await I(v,{variables:{currentPage:i,pageSize:e,listItemsPageSize:n,listItemsCurrentPage:1}});if(r)return m(r);if(!((a=s==null?void 0:s.customer)!=null&&a.requisition_lists))return null;let u=s.customer.requisition_lists.items.map(T=>q(T));return u=await Promise.all(u.map(T=>T==null?Promise.resolve(T):C(T,n))),L.emit("requisitionLists/data",u),{items:u,page_info:(o=(t=s.customer)==null?void 0:t.requisition_lists)==null?void 0:o.page_info,total_count:(l=(_=s.customer)==null?void 0:_.requisition_lists)==null?void 0:l.total_count}},mi=async(i,e,n,r=p)=>{var o,_,l,T;if(!N(i))return console.error("Invalid requisition list UID format:",i),null;const{errors:s,data:u}=await I(U,{variables:{requisitionListUid:i,currentPage:e,pageSize:n}});if(s)return m(s);if(!((l=(_=(o=u==null?void 0:u.customer)==null?void 0:o.requisition_lists)==null?void 0:_.items)!=null&&l[0]))return null;const a=u.customer.requisition_lists.items[0];let t=q(a);return(T=t==null?void 0:t.items)!=null&&T.length&&r&&(t={...t,items:await r(t.items)}),L.emit("requisitionList/data",t),t},k=`
  mutation UPDATE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
      $name: String!,
      $description: String,
      $pageSize: Int,
      $currentPage: Int
    ) {
    updateRequisitionList(
      requisitionListUid: $requisitionListUid
      input: {
        name: $name
        description: $description
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
${g}
${d}
`,Ti=async(i,e,n,r,s,u=p)=>{var l,T;const{errors:a,data:t}=await I(k,{variables:{requisitionListUid:i,name:e,description:n,pageSize:r,currentPage:s}});if(a)return m(a);if(!((l=t==null?void 0:t.updateRequisitionList)!=null&&l.requisition_list))return null;const o=t.updateRequisitionList.requisition_list;let _=q(o);return(T=_==null?void 0:_.items)!=null&&T.length&&u&&(_={..._,items:await u(_.items)}),L.emit("requisitionList/data",_),_},G=`
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
${g}
`,qi=async i=>I(G,{variables:{requisitionListUid:i}}).then(({errors:e,data:n})=>{var s,u,a,t,o,_;if(!i)return null;if(e)return m(e);if(!((s=n==null?void 0:n.deleteRequisitionList)!=null&&s.requisition_lists))return null;const r=((a=(u=n.deleteRequisitionList.requisition_lists)==null?void 0:u.items)==null?void 0:a.map(l=>q(l)))||[];return L.emit("requisitionLists/data",r),{items:r,page_info:(o=(t=n.deleteRequisitionList)==null?void 0:t.requisition_lists)==null?void 0:o.page_info,status:(_=n.deleteRequisitionList)==null?void 0:_.status}}),z=`
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
${g}
${d}
`,Li=async(i,e,n,r,s=p)=>{var _,l;const{errors:u,data:a}=await I(z,{variables:{requisitionListUid:i,requisitionListItems:e,pageSize:n,currentPage:r}});if(u)return m(u);if(!((_=a==null?void 0:a.updateRequisitionListItems)!=null&&_.requisition_list))return null;const t=a.updateRequisitionListItems.requisition_list;let o=q(t);return(l=o==null?void 0:o.items)!=null&&l.length&&s&&(o={...o,items:await s(o.items)}),L.emit("requisitionList/data",o),o},F=`
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
${g}
${d}
`,gi=async(i,e,n,r,s=p)=>{var _,l;const{errors:u,data:a}=await I(F,{variables:{requisitionListUid:i,requisitionListItemUids:e,pageSize:n,currentPage:r}});if(u)return m(u);if(!((_=a==null?void 0:a.deleteRequisitionListItems)!=null&&_.requisition_list))return null;const t=a.deleteRequisitionListItems.requisition_list;let o=q(t);return(l=o==null?void 0:o.items)!=null&&l.length&&s&&(o={...o,items:await s(o.items)}),L.emit("requisitionList/data",o),o},D=`
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
`,di=async(i,e)=>I(D,{variables:{requisitionListUid:i,requisitionListItemUids:e}}).then(({errors:n,data:r})=>{var s;return n?m(n):(s=r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(u=>({type:u.type,message:u.message||""})):null}),B=`
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
${g}
${d}
`,pi=async(i,e,n,r,s)=>{const{errors:u,data:a}=await I(B,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:e,requisitionListItem:{requisitionListItemUids:n},pageSize:r,currentPage:s}});if(u)return m(u);if(!(a!=null&&a.moveItemsBetweenRequisitionLists))return null;const{source_requisition_list:t,destination_requisition_list:o}=a.moveItemsBetweenRequisitionLists,_=t?q(t):null,l=o?q(o):null;return _&&L.emit("requisitionList/data",_),{sourceList:_,destinationList:l}},Y=`
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
${g}
`,Si=async(i,e,n)=>{var a;const{errors:r,data:s}=await I(Y,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:e,requisitionListItem:{requisitionListItemUids:n}}});return r?m(r):(a=s==null?void 0:s.copyItemsBetweenRequisitionLists)!=null&&a.requisition_list?{destinationList:q(s.copyItemsBetweenRequisitionLists.requisition_list)}:null},V=`
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
`,x=100,f=async i=>{var s,u,a;const{errors:e,data:n}=await I(V,{variables:{pageSize:x,currentPage:i}});if(e)return null;const r=(s=n==null?void 0:n.company)==null?void 0:s.users;return(u=r==null?void 0:r.items)!=null&&u.length?{items:r.items,totalPages:((a=r.page_info)==null?void 0:a.total_pages)??1}:null},Ri=async()=>{const i=await f(1);if(!i)return[];const{items:e,totalPages:n}=i;if(n<=1)return e;const r=await Promise.all(Array.from({length:n-1},(s,u)=>f(u+2)));return[...e,...r.flatMap(s=>(s==null?void 0:s.items)??[])]},H=`
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
`,fi=async(i,e)=>I(H,{variables:{requisitionListUid:i,customerUids:e}}).then(({errors:n,data:r})=>{var u;if(n)return m(n);const s=r==null?void 0:r.shareRequisitionListByEmail;return((s==null?void 0:s.sent_count)??0)>0?null:(u=s==null?void 0:s.user_errors)!=null&&u.length?s.user_errors.map(a=>({message:a.message,code:a.code})):[{code:"SHARE_FAILED",message:"Unable to share requisition list."}]}),W=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,Ei=async i=>{var e,n;try{const{errors:r,data:s}=await I(W,{variables:{requisitionListUid:i}});return r!=null&&r.length?{token:null,errorMessage:((e=r[0])==null?void 0:e.message)??null}:{token:((n=s==null?void 0:s.shareRequisitionListByToken)==null?void 0:n.token)??null,errorMessage:null}}catch(r){return{token:null,errorMessage:r instanceof Error?r.message:"Unable to generate share link."}}},j=`
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
${d}
${g}
`,Ui=async(i,e,n,r=p)=>{var o;const{errors:s,data:u}=await I(j,{variables:{token:i,currentPage:e,pageSize:n}});if(s)return m(s);const a=u==null?void 0:u.sharedRequisitionList;if(!(a!=null&&a.requisition_list))return null;let t=q(a.requisition_list);return t?((o=t.items)!=null&&o.length&&r&&(t={...t,items:await r(t.items)}),{senderName:a.sender_name,requisitionList:t}):null},K=`
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
${g}
`,Ni=async i=>{const{errors:e,data:n}=await I(K,{variables:{token:i}});if(e)return m(e);const r=n==null?void 0:n.importSharedRequisitionList;return{requisitionList:r!=null&&r.requisition_list?q(r.requisition_list)??null:null,userErrors:((r==null?void 0:r.user_errors)??[]).map(s=>({message:s.message,code:s.code}))}},Z=`
  mutation CREATE_REQUISITION_LIST_MUTATION(
      $requisitionListName: String!,
      $requisitionListDescription: String,
    ) {
    createRequisitionList(
      input: {
        name: $requisitionListName
        description: $requisitionListDescription
      }
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
      }
    }
  }
${g}
`,Oi=async(i,e)=>I(Z,{variables:{requisitionListName:i,requisitionListDescription:e}}).then(({errors:n,data:r})=>{var u;if(n)return m(n);if(!((u=r==null?void 0:r.createRequisitionList)!=null&&u.requisition_list))return null;const s=q(r.createRequisitionList.requisition_list);return L.emit("requisitionList/data",s),s}),J=`
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
${d}
${g}
`,$i=async(i,e)=>{var a;const n=e.map(t=>{const o={sku:t.sku,quantity:t.quantity};return t.parent_sku&&(o.parent_sku=t.parent_sku),t.selected_options&&t.selected_options.length>0&&(o.selected_options=t.selected_options),t.entered_options&&t.entered_options.length>0&&(o.entered_options=t.entered_options),o}),{errors:r,data:s}=await I(J,{variables:{requisitionListUid:i,requisitionListItems:n}});if(r)return m(r);if(!((a=s==null?void 0:s.addProductsToRequisitionList)!=null&&a.requisition_list))return null;const u=q(s.addProductsToRequisitionList.requisition_list);return L.emit("requisitionList/data",u),u};export{ri as a,di as addRequisitionListItemsToCart,ei as b,Oi as c,oi as config,Si as copyItemsBetweenRequisitionLists,$i as d,qi as deleteRequisitionList,gi as deleteRequisitionListItems,p as enrichConfigurableProducts,I as fetchGraphQl,ni as g,Ri as getCompanyUsers,Ii as getConfig,mi as getRequisitionList,ci as getRequisitionLists,Ui as getSharedRequisitionList,M as getStoreConfig,N as i,Ni as importSharedRequisitionList,E as initialize,pi as moveItemsBetweenRequisitionLists,_i as removeFetchGraphQlHeader,c as s,ui as setEndpoint,ai as setFetchGraphQlHeader,li as setFetchGraphQlHeaders,fi as shareRequisitionListByEmail,Ei as shareRequisitionListByToken,si as u,Ti as updateRequisitionList,Li as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
