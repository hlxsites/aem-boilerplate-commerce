/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as L}from"@dropins/tools/event-bus.js";import{Initializer as N}from"@dropins/tools/lib.js";import{FetchGraphQL as $}from"@dropins/tools/fetch-graphql.js";const O={authenticated:!1,config:void 0,isCompanyUser:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},c=new Proxy(O,{set(i,t,s){return Reflect.set(i,t,s)},get(i,t){return i[t]}}),Z=i=>{c.requisitionLists=i,c.requisitionListsVersion++},J=i=>{c.requisitionLists.some(s=>s.uid===i.uid)?c.requisitionLists=c.requisitionLists.map(s=>s.uid===i.uid?i:s):c.requisitionLists=[...c.requisitionLists,i],c.requisitionListsVersion++},X=()=>c.requisitionLists,ii=i=>{c.requisitionListsLoading=i},M=`
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
    company_enabled
    requisition_list_sharing_enabled
    requisition_list_share_max_recipients
    requisition_list_share_storefront_path
  }
}
`,m=i=>{const t=i.map(s=>s.message).join(" ");throw Error(t)},A=async()=>{try{const{errors:i,data:t}=await l(M,{cache:"force-cache"});if(i){if(i.some(o=>o.message&&o.message.includes('Cannot query field "is_requisition_list_active"')||o.message.includes('Cannot query field "company_enabled"')))return!1;const n=i.some(o=>o.message.includes('Cannot query field "requisition_list_sharing_enabled"')),e=i.some(o=>o.message.includes('Cannot query field "requisition_list_share_max_recipients"')),u=i.some(o=>o.message.includes('Cannot query field "requisition_list_share_storefront_path"'));return n||e||u?{...t==null?void 0:t.storeConfig,...n?{requisition_list_sharing_enabled:!1}:{},...e?{requisition_list_share_max_recipients:null}:{},...u?{requisition_list_share_storefront_path:null}:{}}:m(i)}return t==null?void 0:t.storeConfig}catch{return{is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null}}},E=new N({init:async i=>{const t={};c.config||(c.config=await A(),L.emit("requisitionList/initialized",c.config)),E.config.setConfig({...t,...i})},listeners:()=>[L.on("authenticated",i=>{c.authenticated=i,i||(c.isCompanyUser=!1)}),L.on("auth/permissions",i=>{c.isCompanyUser=i!=null&&typeof i=="object"&&Object.entries(i).some(([t,s])=>s===!0&&(t==="admin"||t.startsWith("Magento_Company::")))},{eager:!0})]}),ti=E.config,{setEndpoint:ei,setFetchGraphQlHeader:si,removeFetchGraphQlHeader:ni,setFetchGraphQlHeaders:ri,fetchGraphQl:l,getConfig:oi}=new $().getMethods(),d=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
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
${g}
${d}
`,y=`
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
${d}
${g}
`;function q(i){var t,s;return i?{uid:i.uid,name:i.name,description:i.description,updated_at:i.updated_at,items_count:i.items_count,items:h((t=i.items)==null?void 0:t.items),page_info:(s=i.items)==null?void 0:s.page_info}:null}function h(i){return i!=null&&i.length?i.map(t=>{var n,e,u,o;const s={uid:t.uid,sku:(n=t.product)==null?void 0:n.sku,quantity:t.quantity,stock_status:((e=t.product)==null?void 0:e.stock_status)||"IN_STOCK",only_x_left_in_stock:((u=t.product)==null?void 0:u.only_x_left_in_stock)??null,customizable_options:t.customizable_options?t.customizable_options.map(r=>({uid:r.customizable_option_uid,is_required:r.is_required,label:r.label,sort_order:r.sort_order,type:r.type,values:r.values.map(a=>({uid:a.customizable_option_value_uid,label:a.label,price:a.price,value:a.value}))})):[],bundle_options:t.bundle_options||[],configurable_options:t.configurable_options?t.configurable_options.map(r=>({option_uid:r.configurable_product_option_uid,option_label:r.option_label,value_uid:r.configurable_product_option_value_uid,value_label:r.value_label})):[],samples:t.samples?t.samples.map(r=>({url:r.sample_url,sort_order:r.sort_order,title:r.title})):[],gift_card_options:t.gift_card_options||{}};return(o=t.configured_product)!=null&&o.name?{...s,configured_product:t.configured_product}:s}):[]}function f(i){return!i||typeof i!="string"||i.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(i)?!1:i.length%4===0}async function Q(i,t){var u,o,r,a;const s=i.page_info;if(!s||s.total_pages<=1||s.current_page>=s.total_pages)return i;const n=String(i.uid);if(!f(n))return i;const e=[...i.items??[]];for(let _=s.current_page+1;_<=s.total_pages;_+=1){const{errors:I,data:T}=await l(U,{variables:{requisitionListUid:n,currentPage:_,pageSize:t}});I&&m(I);const S=(r=(o=(u=T==null?void 0:T.customer)==null?void 0:u.requisition_lists)==null?void 0:o.items)==null?void 0:r[0];if(!S)break;const p=q(S);(a=p==null?void 0:p.items)!=null&&a.length&&e.push(...p.items)}return{...i,items:e,page_info:{current_page:1,total_pages:1,page_size:e.length}}}const ui=async(i,t,s=100)=>{var o,r,a,_,I;const{errors:n,data:e}=await l(y,{variables:{currentPage:i,pageSize:t,listItemsPageSize:s,listItemsCurrentPage:1}});if(n)return m(n);if(!((o=e==null?void 0:e.customer)!=null&&o.requisition_lists))return null;let u=e.customer.requisition_lists.items.map(T=>q(T));return u=await Promise.all(u.map(T=>T==null?Promise.resolve(T):Q(T,s))),L.emit("requisitionLists/data",u),{items:u,page_info:(a=(r=e.customer)==null?void 0:r.requisition_lists)==null?void 0:a.page_info,total_count:(I=(_=e.customer)==null?void 0:_.requisition_lists)==null?void 0:I.total_count}},ai=async(i,t,s,n)=>{var a,_,I,T;if(!f(i))return console.error("Invalid requisition list UID format:",i),null;const{errors:e,data:u}=await l(U,{variables:{requisitionListUid:i,currentPage:t,pageSize:s}});if(e)return m(e);if(!((I=(_=(a=u==null?void 0:u.customer)==null?void 0:a.requisition_lists)==null?void 0:_.items)!=null&&I[0]))return null;const o=u.customer.requisition_lists.items[0];let r=q(o);return(T=r==null?void 0:r.items)!=null&&T.length&&n&&(r={...r,items:await n(r.items)}),L.emit("requisitionList/data",r),r},b=`
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
${d}
${g}
`,_i=async(i,t,s,n,e,u)=>{var I,T;const{errors:o,data:r}=await l(b,{variables:{requisitionListUid:i,name:t,description:s,pageSize:n,currentPage:e}});if(o)return m(o);if(!((I=r==null?void 0:r.updateRequisitionList)!=null&&I.requisition_list))return null;const a=r.updateRequisitionList.requisition_list;let _=q(a);return(T=_==null?void 0:_.items)!=null&&T.length&&u&&(_={..._,items:await u(_.items)}),L.emit("requisitionList/data",_),_},P=`
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
${d}
`,Ii=async i=>l(P,{variables:{requisitionListUid:i}}).then(({errors:t,data:s})=>{var e,u,o,r,a,_;if(!i)return null;if(t)return m(t);if(!((e=s==null?void 0:s.deleteRequisitionList)!=null&&e.requisition_lists))return null;const n=((o=(u=s.deleteRequisitionList.requisition_lists)==null?void 0:u.items)==null?void 0:o.map(I=>q(I)))||[];return L.emit("requisitionLists/data",n),{items:n,page_info:(a=(r=s.deleteRequisitionList)==null?void 0:r.requisition_lists)==null?void 0:a.page_info,status:(_=s.deleteRequisitionList)==null?void 0:_.status}}),v=`
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
${d}
${g}
`,li=async(i,t,s,n,e)=>{var _,I;const{errors:u,data:o}=await l(v,{variables:{requisitionListUid:i,requisitionListItems:t,pageSize:s,currentPage:n}});if(u)return m(u);if(!((_=o==null?void 0:o.updateRequisitionListItems)!=null&&_.requisition_list))return null;const r=o.updateRequisitionListItems.requisition_list;let a=q(r);return(I=a==null?void 0:a.items)!=null&&I.length&&e&&(a={...a,items:await e(a.items)}),L.emit("requisitionList/data",a),a},z=`
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
${d}
${g}
`,ci=async(i,t,s,n,e)=>{var _,I;const{errors:u,data:o}=await l(z,{variables:{requisitionListUid:i,requisitionListItemUids:t,pageSize:s,currentPage:n}});if(u)return m(u);if(!((_=o==null?void 0:o.deleteRequisitionListItems)!=null&&_.requisition_list))return null;const r=o.deleteRequisitionListItems.requisition_list;let a=q(r);return(I=a==null?void 0:a.items)!=null&&I.length&&e&&(a={...a,items:await e(a.items)}),L.emit("requisitionList/data",a),a},w=`
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
`,mi=async(i,t)=>l(w,{variables:{requisitionListUid:i,requisitionListItemUids:t}}).then(({errors:s,data:n})=>{var e;return s?m(s):(e=n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&e.length?n.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(u=>({type:u.type,message:u.message||""})):null}),G=`
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
${d}
${g}
`,Ti=async(i,t,s,n,e)=>{const{errors:u,data:o}=await l(G,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:t,requisitionListItem:{requisitionListItemUids:s},pageSize:n,currentPage:e}});if(u)return m(u);if(!(o!=null&&o.moveItemsBetweenRequisitionLists))return null;const{source_requisition_list:r,destination_requisition_list:a}=o.moveItemsBetweenRequisitionLists,_=r?q(r):null,I=a?q(a):null;return _&&L.emit("requisitionList/data",_),{sourceList:_,destinationList:I}},D=`
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
${d}
`,qi=async(i,t,s)=>{var o;const{errors:n,data:e}=await l(D,{variables:{sourceRequisitionListUid:i,destinationRequisitionListUid:t,requisitionListItem:{requisitionListItemUids:s}}});return n?m(n):(o=e==null?void 0:e.copyItemsBetweenRequisitionLists)!=null&&o.requisition_list?{destinationList:q(e.copyItemsBetweenRequisitionLists.requisition_list)}:null},C=`
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
`,F=100,R=async i=>{var e,u,o;const{errors:t,data:s}=await l(C,{variables:{pageSize:F,currentPage:i}});if(t)return null;const n=(e=s==null?void 0:s.company)==null?void 0:e.users;return(u=n==null?void 0:n.items)!=null&&u.length?{items:n.items,totalPages:((o=n.page_info)==null?void 0:o.total_pages)??1}:null},Li=async()=>{const i=await R(1);if(!i)return[];const{items:t,totalPages:s}=i;if(s<=1)return t;const n=await Promise.all(Array.from({length:s-1},(e,u)=>R(u+2)));return[...t,...n.flatMap(e=>(e==null?void 0:e.items)??[])]},k=`
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
`,di=async(i,t)=>l(k,{variables:{requisitionListUid:i,customerUids:t}}).then(({errors:s,data:n})=>{var u;if(s)return m(s);const e=n==null?void 0:n.shareRequisitionListByEmail;return((e==null?void 0:e.sent_count)??0)>0?null:(u=e==null?void 0:e.user_errors)!=null&&u.length?e.user_errors.map(o=>({message:o.message,code:o.code})):[{code:"SHARE_FAILED",message:"Unable to share requisition list."}]}),B=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,gi=async i=>{var t,s;try{const{errors:n,data:e}=await l(B,{variables:{requisitionListUid:i}});return n!=null&&n.length?{token:null,errorMessage:((t=n[0])==null?void 0:t.message)??null}:{token:((s=e==null?void 0:e.shareRequisitionListByToken)==null?void 0:s.token)??null,errorMessage:null}}catch(n){return{token:null,errorMessage:n instanceof Error?n.message:"Unable to generate share link."}}},Y=`
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
${d}
`,pi=async(i,t,s,n)=>{var a;const{errors:e,data:u}=await l(Y,{variables:{token:i,currentPage:t,pageSize:s}});if(e)return m(e);const o=u==null?void 0:u.sharedRequisitionList;if(!(o!=null&&o.requisition_list))return null;let r=q(o.requisition_list);return r?((a=r.items)!=null&&a.length&&n&&(r={...r,items:await n(r.items)}),{senderName:o.sender_name,requisitionList:r}):null},x=`
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
${d}
`,Si=async i=>{const{errors:t,data:s}=await l(x,{variables:{token:i}});if(t)return m(t);const n=s==null?void 0:s.importSharedRequisitionList;return{requisitionList:n!=null&&n.requisition_list?q(n.requisition_list)??null:null,userErrors:((n==null?void 0:n.user_errors)??[]).map(e=>({message:e.message,code:e.code}))}},H=`
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
${d}
`,Ri=async(i,t)=>l(H,{variables:{requisitionListName:i,requisitionListDescription:t}}).then(({errors:s,data:n})=>{var u;if(s)return m(s);if(!((u=n==null?void 0:n.createRequisitionList)!=null&&u.requisition_list))return null;const e=q(n.createRequisitionList.requisition_list);return L.emit("requisitionList/data",e),e}),V=`
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
${d}
`,Ei=async(i,t)=>{var o;const s=t.map(r=>{const a={sku:r.sku,quantity:r.quantity};return r.parent_sku&&(a.parent_sku=r.parent_sku),r.selected_options&&r.selected_options.length>0&&(a.selected_options=r.selected_options),r.entered_options&&r.entered_options.length>0&&(a.entered_options=r.entered_options),a}),{errors:n,data:e}=await l(V,{variables:{requisitionListUid:i,requisitionListItems:s}});if(n)return m(n);if(!((o=e==null?void 0:e.addProductsToRequisitionList)!=null&&o.requisition_list))return null;const u=q(e.addProductsToRequisitionList.requisition_list);return L.emit("requisitionList/data",u),u};export{ii as a,mi as addRequisitionListItemsToCart,Z as b,Ri as c,ti as config,qi as copyItemsBetweenRequisitionLists,Ei as d,Ii as deleteRequisitionList,ci as deleteRequisitionListItems,l as fetchGraphQl,X as g,Li as getCompanyUsers,oi as getConfig,ai as getRequisitionList,ui as getRequisitionLists,pi as getSharedRequisitionList,A as getStoreConfig,f as i,Si as importSharedRequisitionList,E as initialize,Ti as moveItemsBetweenRequisitionLists,ni as removeFetchGraphQlHeader,c as s,ei as setEndpoint,si as setFetchGraphQlHeader,ri as setFetchGraphQlHeaders,di as shareRequisitionListByEmail,gi as shareRequisitionListByToken,J as u,_i as updateRequisitionList,li as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
