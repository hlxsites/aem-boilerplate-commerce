/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as U}from"@dropins/tools/event-bus.js";import{Initializer as H}from"@dropins/tools/lib.js";import{FetchGraphQL as W}from"@dropins/tools/fetch-graphql.js";const wi=t=>(t==null?void 0:t.requisition_list_sharing_enabled)===!0,$i=t=>(t==null?void 0:t.requisition_list_public_sharing_enabled)===!0,K={authenticated:!1,config:void 0,isCompanyUser:!1,requisitionLists:[],requisitionListsLoading:!1,requisitionListsVersion:0},R=new Proxy(K,{set(t,e,i){return Reflect.set(t,e,i)},get(t,e){return t[e]}}),yi=t=>{R.requisitionLists=t,R.requisitionListsVersion++},Mi=t=>{R.requisitionLists.some(i=>i.uid===t.uid)?R.requisitionLists=R.requisitionLists.map(i=>i.uid===t.uid?t:i):R.requisitionLists=[...R.requisitionLists,t],R.requisitionListsVersion++},ki=()=>R.requisitionLists,vi=t=>{R.requisitionListsLoading=t},j=`
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
`;function g(t){var e,i;return t?{uid:t.uid,name:t.name,description:t.description,updated_at:t.updated_at,items_count:t.items_count,items:Z((e=t.items)==null?void 0:e.items),page_info:(i=t.items)==null?void 0:i.page_info,is_public:t.is_public??!1}:null}function Z(t){return t!=null&&t.length?t.map(e=>{var r,s,n,o,u,_,l;const i={uid:e.uid,sku:(r=e.product)==null?void 0:r.sku,name:(s=e.product)==null?void 0:s.name,image:(n=e.product)==null?void 0:n.small_image,urlKey:(o=e.product)==null?void 0:o.url_key,quantity:e.quantity,stock_status:((u=e.product)==null?void 0:u.stock_status)||"IN_STOCK",only_x_left_in_stock:((_=e.product)==null?void 0:_.only_x_left_in_stock)??null,customizable_options:e.customizable_options?e.customizable_options.map(a=>({uid:a.customizable_option_uid,is_required:a.is_required,label:a.label,sort_order:a.sort_order,type:a.type,values:a.values.map(c=>({uid:c.customizable_option_value_uid,label:c.label,price:c.price,value:c.value}))})):[],bundle_options:e.bundle_options||[],configurable_options:e.configurable_options?e.configurable_options.map(a=>({option_uid:a.configurable_product_option_uid,option_label:a.option_label,value_uid:a.configurable_product_option_value_uid,value_label:a.value_label})):[],samples:e.samples?e.samples.map(a=>({url:a.sample_url,sort_order:a.sort_order,title:a.title})):[],gift_card_options:e.gift_card_options||{}};return(l=e.configured_product)!=null&&l.name?{...i,configured_product:e.configured_product}:i}):[]}function J(t){return{...t,requisition_list_sharing_enabled:!!+(t==null?void 0:t.requisition_list_sharing_enabled),requisition_list_share_max_recipients:(t==null?void 0:t.requisition_list_share_max_recipients)!=null?+t.requisition_list_share_max_recipients:null,requisition_list_public_sharing_enabled:!!+(t==null?void 0:t.requisition_list_public_sharing_enabled),requisition_list_public_share_link_validity_days:(t==null?void 0:t.requisition_list_public_share_link_validity_days)!=null?+t.requisition_list_public_share_link_validity_days:null,requisition_list_public_share_max_recipients:(t==null?void 0:t.requisition_list_public_share_max_recipients)!=null?+t.requisition_list_public_share_max_recipients:null}}const P={is_requisition_list_active:"0",company_enabled:!1,requisition_list_sharing_enabled:!1,requisition_list_share_max_recipients:null,requisition_list_share_storefront_path:null,configurable_thumbnail_source:null,requisition_list_public_sharing_enabled:!1,requisition_list_public_share_link_validity_days:null,requisition_list_public_share_max_recipients:null,requisition_list_public_share_storefront_path:null},X=async()=>{try{const{errors:t,data:e}=await m(j,{cache:"force-cache"});return(t==null?void 0:t.some(r=>{var s,n;return((s=r.message)==null?void 0:s.includes('Cannot query field "is_requisition_list_active"'))||((n=r.message)==null?void 0:n.includes('Cannot query field "company_enabled"'))}))?!1:t!=null&&t.length||!(e!=null&&e.storeConfig)?P:J(e.storeConfig)}catch{return P}},F=new H({init:async t=>{const e={};R.config||(R.config=await X(),U.emit("requisitionList/initialized",R.config)),F.config.setConfig({...e,...t})},listeners:()=>[U.on("authenticated",t=>{R.authenticated=t,t||(R.isCompanyUser=!1)}),U.on("auth/permissions",t=>{R.isCompanyUser=t!=null&&typeof t=="object"&&Object.entries(t).some(([e,i])=>i===!0&&(e==="admin"||e.startsWith("Magento_Company::")))},{eager:!0})]}),Qi=F.config,{setEndpoint:Pi,setFetchGraphQlHeader:Ci,removeFetchGraphQlHeader:Di,setFetchGraphQlHeaders:Gi,fetchGraphQl:m,getConfig:zi}=new W().getMethods(),x=`
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
`,ii=`
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
`;function $(t){return typeof t=="string"&&t.trim().length>0}function S(t,e,i,r){var n;(n=t.signal)==null||n.throwIfAborted();const s={stage:e,code:i,itemUids:r.map(o=>o.uid),skus:[...new Set(r.map(o=>o.sku).filter($))]};t.onWarning?t.onWarning(s):console.warn("Requisition list supplemental data warning:",s)}const C=50,D=4,ti=(t,e)=>{const i=[];for(const r of t.configurable_options){const s=e.find(o=>o.title===r.option_label),n=s==null?void 0:s.values.find(o=>o.title===r.value_label);if(!n)return null;i.push(n.id)}return i},ei=t=>{var e;return{name:t.name,sku:t.sku,images:(e=t.images)!=null&&e[0]?[{url:t.images[0].url}]:void 0,price:t.price}},A=async(t,e={})=>{var c,d,f;const{signal:i,onProgress:r}=e;i==null||i.throwIfAborted();const s=t.filter(I=>{var p;return!$(I.sku)&&((p=I.configurable_options)==null?void 0:p.length)});s.length&&S(e,"configurables","data-unavailable",s);const n=t.filter(I=>{var p;return $(I.sku)&&((p=I.configurable_options)==null?void 0:p.length)});if(!n.length)return t;const o=Array.from(new Set(n.map(I=>I.sku)));let u=0;const _=()=>{i==null||i.throwIfAborted(),r==null||r({stage:"configurables",completed:u,total:n.length,unit:"lines"})};_();const l=new Map;for(let I=0;I<o.length;I+=C){i==null||i.throwIfAborted();const p=o.slice(I,I+C);let b;try{b=await m(x,{variables:{skus:p},...i?{signal:i}:{}})}catch(T){if(i==null||i.throwIfAborted(),T instanceof Error&&T.name==="AbortError")throw T;S(e,"configurables","request-failed",n.filter(q=>p.includes(q.sku)));continue}i==null||i.throwIfAborted(),(b.errors||!((c=b.data)!=null&&c.products))&&S(e,"configurables","data-unavailable",n.filter(T=>p.includes(T.sku))),(f=(d=b.data)==null?void 0:d.products)==null||f.forEach(T=>{T&&l.set(T.sku,T.options||[])})}const a=new Map;for(let I=0;I<n.length;I+=D)i==null||i.throwIfAborted(),await Promise.all(n.slice(I,I+D).map(async p=>{var q,w,y;i==null||i.throwIfAborted();const b=l.get(p.sku),T=b!=null&&b.length?ti(p,b):null;if(!T)S(e,"configurables","data-unavailable",[p]);else{let h;try{h=await m(ii,{variables:{sku:p.sku,optionIds:T},...i?{signal:i}:{}})}catch(N){if(i==null||i.throwIfAborted(),N instanceof Error&&N.name==="AbortError")throw N;S(e,"configurables","request-failed",[p])}if(i==null||i.throwIfAborted(),h&&((h.errors||!((q=h.data)!=null&&q.refineProduct))&&S(e,"configurables","data-unavailable",[p]),(w=h.data)!=null&&w.refineProduct)){const N=ei(h.data.refineProduct);a.set(p,N),(y=N.price)!=null&&y.final||S(e,"configurables","price-unavailable",[p])}}u+=1,_()}));return i==null||i.throwIfAborted(),a.size?t.map(I=>{const p=a.get(I);return p?{...I,configured_product:p}:I}):t},E=`
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
    is_public
  }
`,O=`
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
`,B=`
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
${O}
${E}
`,si=`
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
${E}
${O}
`,L=t=>{const e=t.map(i=>i.message).join(" ");throw Error(e)};function k(t){return!t||typeof t!="string"||t.length<2||!/^[A-Za-z0-9+/]+(==|=)?$/.test(t)?!1:t.length%4===0}async function ri(t,e){var n,o,u,_;const i=t.page_info;if(!i||i.total_pages<=1||i.current_page>=i.total_pages)return t;const r=String(t.uid);if(!k(r))return t;const s=[...t.items??[]];for(let l=i.current_page+1;l<=i.total_pages;l+=1){const{errors:a,data:c}=await m(B,{variables:{requisitionListUid:r,currentPage:l,pageSize:e}});a&&L(a);const d=(u=(o=(n=c==null?void 0:c.customer)==null?void 0:n.requisition_lists)==null?void 0:o.items)==null?void 0:u[0];if(!d)break;const f=g(d);(_=f==null?void 0:f.items)!=null&&_.length&&s.push(...f.items)}return{...t,items:s,page_info:{current_page:1,total_pages:1,page_size:s.length}}}const Fi=async(t,e,i=100)=>{var o,u,_,l,a;const{errors:r,data:s}=await m(si,{variables:{currentPage:t,pageSize:e,listItemsPageSize:i,listItemsCurrentPage:1}});if(r)return L(r);if(!((o=s==null?void 0:s.customer)!=null&&o.requisition_lists))return null;let n=s.customer.requisition_lists.items.map(c=>g(c));return n=await Promise.all(n.map(c=>c==null?Promise.resolve(c):ri(c,i))),U.emit("requisitionLists/data",n),{items:n,page_info:(_=(u=s.customer)==null?void 0:u.requisition_lists)==null?void 0:_.page_info,total_count:(a=(l=s.customer)==null?void 0:l.requisition_lists)==null?void 0:a.total_count}};async function Y(t,e,i,r){var o,u,_;const{errors:s,data:n}=await m(B,{variables:{requisitionListUid:t,currentPage:e,pageSize:i},...r?{signal:r}:{}});return s?L(s):((_=(u=(o=n==null?void 0:n.customer)==null?void 0:o.requisition_lists)==null?void 0:u.items)==null?void 0:_[0])??null}const ni=async(t,e,i,r=A,s={})=>{var u,_,l,a,c,d;if((u=s.signal)==null||u.throwIfAborted(),(_=s.onProgress)==null||_.call(s,{stage:"list",completed:0,total:1,unit:"pages"}),!k(t))return console.error("Invalid requisition list UID format:",t),null;const n=await Y(t,e,i,s.signal);if(!n)return null;(l=s.signal)==null||l.throwIfAborted(),(a=s.onProgress)==null||a.call(s,{stage:"list",completed:1,total:1,unit:"pages"});let o=g(n);return(c=o==null?void 0:o.items)!=null&&c.length&&r&&(o={...o,items:await(Object.keys(s).length?r(o.items,s):r(o.items))}),(d=s.signal)==null||d.throwIfAborted(),U.emit("requisitionList/data",o),o};async function oi(t,e,i){if(!k(t))throw new Error("Invalid requisition list UID format.");const r=async _=>{var c,d;e==null||e.throwIfAborted();const l=await Y(t,_,100,e);e==null||e.throwIfAborted();const a=(c=l==null?void 0:l.items)==null?void 0:c.page_info;if(!l||l.uid!==t||!Array.isArray((d=l.items)==null?void 0:d.items)||!a||a.current_page!==_||a.page_size!==100||!Number.isInteger(a.total_pages)||a.total_pages<0||a.total_pages===0&&l.items_count!==0)throw new Error("Unable to load complete requisition list items.");return{raw:l,info:a}};e==null||e.throwIfAborted(),i==null||i({stage:"list",completed:0,total:null,unit:"pages"});const s=await r(1),n=g(s.raw),o=[...n.items],u=s.info.total_pages;i==null||i({stage:"list",completed:u===0?0:1,total:u,unit:"pages"});for(let _=2;_<=u;_+=1){const{raw:l,info:a}=await r(_);if(a.total_pages!==u)throw new Error("Requisition list pagination changed during loading.");if(l.items_count!==n.items_count)throw new Error("Requisition list item count changed during loading.");const c=g(l);o.push(...c.items),i==null||i({stage:"list",completed:_,total:u,unit:"pages"})}if(o.length!==n.items_count)throw new Error("Unable to load complete requisition list items.");return e==null||e.throwIfAborted(),{...n,items:o}}const M=50;function ui(t){return{...t,product:t.product?{...t.product,price:void 0}:void 0,configured_product:t.configured_product?{...t.configured_product,price:void 0}:void 0}}async function V(t,e){const{signal:i,onProgress:r,getProductData:s}=e;i==null||i.throwIfAborted();const n=[],o={...e,onProgress:a=>{i!=null&&i.aborted||r==null||r(a)},onWarning:a=>{var c;i==null||i.throwIfAborted(),n.push(a),(c=e.onWarning)==null||c.call(e,a)}};let u=t.map(a=>{if(!s)return e.skipConfigurables||!a.configured_product?a:{...a,configured_product:{...a.configured_product,price:void 0}};const c=ui(a);return e.skipConfigurables?{...c,configured_product:a.configured_product}:c});const _=u.filter(a=>$(a.sku)),l=u.filter(a=>!$(a.sku));if(l.length&&(s||!e.skipConfigurables)&&S(o,s?"products":"configurables","data-unavailable",l),!e.skipConfigurables&&_.length){const a=e.enrichConfigurableProducts||A,c=()=>{i==null||i.throwIfAborted(),r==null||r({stage:"configurables",completed:_.length,total:_.length,unit:"lines"})};a!==A&&(r==null||r({stage:"configurables",completed:0,total:_.length,unit:"lines"})),i==null||i.throwIfAborted();let d;try{d=await a(_.map(f=>({...f})),o)}catch(f){if(i==null||i.throwIfAborted(),f instanceof Error&&f.name==="AbortError")throw f;S(o,"configurables","request-failed",_)}if(i==null||i.throwIfAborted(),a!==A&&c(),d){const f=new Map(d.map(I=>[I.uid,I]));(d.length!==_.length||f.size!==_.length||_.some(I=>!f.has(I.uid)))&&S(o,"configurables","invalid-enrichment",_),u=u.map(I=>{var p;return $(I.sku)?{...I,configured_product:((p=f.get(I.uid))==null?void 0:p.configured_product)??I.configured_product}:I})}}if(s&&u.length){const a=[...new Set(_.map(d=>d.sku))],c=Math.ceil(a.length/M);r==null||r({stage:"products",completed:0,total:c,unit:"batches"});for(let d=0;d<a.length;d+=M){i==null||i.throwIfAborted();const f=a.slice(d,d+M),I=u.filter(T=>f.includes(T.sku));let p,b="data-unavailable";try{p=await s(f,o)}catch(T){if(i==null||i.throwIfAborted(),T instanceof Error&&T.name==="AbortError")throw T;b="request-failed"}if(i==null||i.throwIfAborted(),p){const T=new Map(p.map(q=>[q.sku,q]));u=u.map(q=>{var h,N,v,Q;if(!f.includes(q.sku))return q;const w=T.get(q.sku);if(!w)return S(o,"products","data-unavailable",[q]),q;const y=(h=q.configurable_options)!=null&&h.length?{...w,price:void 0}:w;return!((N=y.price)!=null&&N.final)&&!((Q=(v=q.configured_product)==null?void 0:v.price)!=null&&Q.final)&&S(o,"products","price-unavailable",[q]),{...q,product:y,stock_status:q.stock_status||w.stock_status||"IN_STOCK",only_x_left_in_stock:q.only_x_left_in_stock??w.only_x_left_in_stock??null}})}else S(o,"products",b,I);i==null||i.throwIfAborted(),r==null||r({stage:"products",completed:d/M+1,total:c,unit:"batches"})}}return i==null||i.throwIfAborted(),{items:u,warnings:n}}async function G(t,e){const{items:i,warnings:r}=await V(t.items||[],e);return{list:{...t,items:i},warnings:r}}async function Bi(t,e){var o,u;if((o=e.signal)==null||o.throwIfAborted(),e.mode==="all"){const _=await oi(t,e.signal,e.onProgress);return G(_,e)}const i=[],r={...e,onWarning:_=>{var l;i.push(_),(l=e.onWarning)==null||l.call(e,_)}},s=await ni(t,e.currentPage,e.pageSize,async _=>(await V(_,{...r,getProductData:void 0})).items,r);return(u=e.signal)==null||u.throwIfAborted(),s?{list:(await G(s,{...r,skipConfigurables:!0})).list,warnings:i}:null}const ai=`
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
${E}
${O}
`,Yi=async(t,e,i,r,s,n=A,o)=>{var c,d;const{errors:u,data:_}=await m(ai,{variables:{requisitionListUid:t,name:e,description:i,isPublic:o,pageSize:r,currentPage:s}});if(u)return L(u);if(!((c=_==null?void 0:_.updateRequisitionList)!=null&&c.requisition_list))return null;const l=_.updateRequisitionList.requisition_list;let a=g(l);return(d=a==null?void 0:a.items)!=null&&d.length&&n&&(a={...a,items:await n(a.items)}),U.emit("requisitionList/data",a),a},_i=`
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
${E}
`,Vi=async t=>m(_i,{variables:{requisitionListUid:t}}).then(({errors:e,data:i})=>{var s,n,o,u,_,l;if(!t)return null;if(e)return L(e);if(!((s=i==null?void 0:i.deleteRequisitionList)!=null&&s.requisition_lists))return null;const r=((o=(n=i.deleteRequisitionList.requisition_lists)==null?void 0:n.items)==null?void 0:o.map(a=>g(a)))||[];return U.emit("requisitionLists/data",r),{items:r,page_info:(_=(u=i.deleteRequisitionList)==null?void 0:u.requisition_lists)==null?void 0:_.page_info,status:(l=i.deleteRequisitionList)==null?void 0:l.status}}),li=`
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
${E}
${O}
`,Hi=async(t,e,i,r,s=A,n={})=>{var a,c,d,f,I;(a=n.signal)==null||a.throwIfAborted();const{errors:o,data:u}=await m(li,{...n.signal?{signal:n.signal}:{},variables:{requisitionListUid:t,requisitionListItems:e,pageSize:i,currentPage:r}});if((c=n.signal)==null||c.throwIfAborted(),o)return L(o);if(!((d=u==null?void 0:u.updateRequisitionListItems)!=null&&d.requisition_list))return null;const _=u.updateRequisitionListItems.requisition_list;let l=g(_);return(f=l==null?void 0:l.items)!=null&&f.length&&s&&(l={...l,items:await(n.signal?s(l.items,n):s(l.items))}),(I=n.signal)==null||I.throwIfAborted(),U.emit("requisitionList/data",l),l},ci=`
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
${E}
${O}
`,Wi=async(t,e,i,r,s=A,n={})=>{var a,c,d,f,I;(a=n.signal)==null||a.throwIfAborted();const{errors:o,data:u}=await m(ci,{...n.signal?{signal:n.signal}:{},variables:{requisitionListUid:t,requisitionListItemUids:e,pageSize:i,currentPage:r}});if((c=n.signal)==null||c.throwIfAborted(),o)return L(o);if(!((d=u==null?void 0:u.deleteRequisitionListItems)!=null&&d.requisition_list))return null;const _=u.deleteRequisitionListItems.requisition_list;let l=g(_);return(f=l==null?void 0:l.items)!=null&&f.length&&s&&(l={...l,items:await(n.signal?s(l.items,n):s(l.items))}),(I=n.signal)==null||I.throwIfAborted(),U.emit("requisitionList/data",l),l},Ii=`
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
`,Ki=async(t,e)=>m(Ii,{variables:{requisitionListUid:t,requisitionListItemUids:e}}).then(({errors:i,data:r})=>{var s;return i?L(i):(s=r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors)!=null&&s.length?r.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map(n=>({type:n.type,message:n.message||""})):null}),di=`
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
${E}
${O}
`,ji=async(t,e,i,r,s,n)=>{n==null||n.throwIfAborted();const{errors:o,data:u}=await m(di,{...n?{signal:n}:{},variables:{sourceRequisitionListUid:t,destinationRequisitionListUid:e,requisitionListItem:{requisitionListItemUids:i},pageSize:r,currentPage:s}});if(n==null||n.throwIfAborted(),o)return L(o);if(!(u!=null&&u.moveItemsBetweenRequisitionLists))return null;const{source_requisition_list:_,destination_requisition_list:l}=u.moveItemsBetweenRequisitionLists,a=_?g(_):null,c=l?g(l):null;return a&&U.emit("requisitionList/data",a),{sourceList:a,destinationList:c}},pi=`
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
${E}
`,Zi=async(t,e,i)=>{var o;const{errors:r,data:s}=await m(pi,{variables:{sourceRequisitionListUid:t,destinationRequisitionListUid:e,requisitionListItem:{requisitionListItemUids:i}}});return r?L(r):(o=s==null?void 0:s.copyItemsBetweenRequisitionLists)!=null&&o.requisition_list?{destinationList:g(s.copyItemsBetweenRequisitionLists.requisition_list)}:null},fi=`
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
`,mi=100,z=async t=>{var s,n,o;const{errors:e,data:i}=await m(fi,{variables:{pageSize:mi,currentPage:t}});if(e)return null;const r=(s=i==null?void 0:i.company)==null?void 0:s.users;return(n=r==null?void 0:r.items)!=null&&n.length?{items:r.items,totalPages:((o=r.page_info)==null?void 0:o.total_pages)??1}:null},Ji=async()=>{const t=await z(1);if(!t)return[];const{items:e,totalPages:i}=t;if(i<=1)return e;const r=await Promise.all(Array.from({length:i-1},(s,n)=>z(n+2)));return[...e,...r.flatMap(s=>(s==null?void 0:s.items)??[])]},Ti=`
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
`,Xi=async(t,e)=>m(Ti,{variables:{requisitionListUid:t,customerUids:e}}).then(({errors:i,data:r})=>{var n;if(i)return L(i);const s=r==null?void 0:r.shareRequisitionListByEmail;return((s==null?void 0:s.sent_count)??0)>0?null:(n=s==null?void 0:s.user_errors)!=null&&n.length?s.user_errors.map(o=>({message:o.message,code:o.code})):[{code:"SHARE_FAILED",message:"Unable to share requisition list."}]}),qi=`
  mutation SHARE_REQUISITION_LIST_BY_TOKEN_MUTATION(
    $requisitionListUid: ID!
  ) {
    shareRequisitionListByToken(
      requisitionListUid: $requisitionListUid
    ) {
      token
    }
  }
`,xi=async t=>{var e,i;try{const{errors:r,data:s}=await m(qi,{variables:{requisitionListUid:t}});return r!=null&&r.length?{token:null,errorMessage:((e=r[0])==null?void 0:e.message)??null}:{token:((i=s==null?void 0:s.shareRequisitionListByToken)==null?void 0:i.token)??null,errorMessage:null}}catch(r){return{token:null,errorMessage:r instanceof Error?r.message:"Unable to generate share link."}}},Li=`
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
${O}
${E}
`,it=async(t,e,i,r=A)=>{var _;const{errors:s,data:n}=await m(Li,{variables:{token:t,currentPage:e,pageSize:i}});if(s)return L(s);const o=n==null?void 0:n.sharedRequisitionList;if(!(o!=null&&o.requisition_list))return null;let u=g(o.requisition_list);return u?((_=u.items)!=null&&_.length&&r&&(u={...u,items:await r(u.items)}),{senderName:o.sender_name,requisitionList:u}):null},gi=`
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
${E}
`,tt=async t=>{const{errors:e,data:i}=await m(gi,{variables:{token:t}});if(e)return L(e);const r=i==null?void 0:i.importSharedRequisitionList;return{requisitionList:r!=null&&r.requisition_list?g(r.requisition_list)??null:null,userErrors:((r==null?void 0:r.user_errors)??[]).map(s=>({message:s.message,code:s.code}))}},Ri=`
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
${O}
${E}
`,et=async(t,e,i,r=A)=>{var _;const{errors:s,data:n}=await m(Ri,{variables:{token:t,currentPage:e,pageSize:i}});if(s)return L(s);const o=n==null?void 0:n.publicRequisitionList,u=o!=null&&o.requisition_list?g(o.requisition_list):null;return u?((_=u.items)!=null&&_.length&&(u.items=await r(u.items)),{senderName:o.sender_name,requisitionList:u}):null},Si=`
  mutation ADD_PUBLIC_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(
    $input: AddPublicRequisitionListItemsToCartInput!
  ) {
    addPublicRequisitionListItemsToCart(input: $input) {
      cart { id }
      user_errors { code message }
    }
  }
`,st=async(t,e,i)=>{const{errors:r,data:s}=await m(Si,{variables:{input:{token:t,cart_id:e,item_uids:i}}});if(r)return L(r);const n=s==null?void 0:s.addPublicRequisitionListItemsToCart;return n?{cart:n.cart,userErrors:n.user_errors??[]}:{cart:null,userErrors:[{code:"UNKNOWN_ERROR",message:"Unable to add items to cart."}]}},Ei=`
  mutation SHARE_PUBLIC_REQUISITION_LIST_MUTATION($input: SharePublicRequisitionListInput!) {
    sharePublicRequisitionList(input: $input) {
      sent_count
      user_errors { code message }
    }
  }
`,rt=async(t,e)=>{var n;const{errors:i,data:r}=await m(Ei,{variables:{input:{requisition_list_uid:t,emails:e}}});if(i)return L(i);const s=r==null?void 0:r.sharePublicRequisitionList;return(n=s==null?void 0:s.user_errors)!=null&&n.length?s.user_errors:((s==null?void 0:s.sent_count)??0)>0?null:[{code:"UNKNOWN_ERROR",message:"Unable to share requisition list."}]},bi=`
  query GET_PUBLIC_REQUISITION_LIST_TOKEN_QUERY($requisitionListUid: String!) {
    customer {
      requisition_lists(filter: { uids: { eq: $requisitionListUid } }) {
        items { token }
      }
    }
  }
`,nt=async t=>{var e,i,r,s,n;try{const{errors:o,data:u}=await m(bi,{variables:{requisitionListUid:t}});return o!=null&&o.length?{token:null,errorMessage:((e=o[0])==null?void 0:e.message)??null}:{token:((n=(s=(r=(i=u==null?void 0:u.customer)==null?void 0:i.requisition_lists)==null?void 0:r.items)==null?void 0:s[0])==null?void 0:n.token)??null,errorMessage:null}}catch(o){return{token:null,errorMessage:o instanceof Error?o.message:"Unable to retrieve the public share link."}}},Ui=`
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
${E}
`,ot=async(t,e,i)=>m(Ui,{variables:{requisitionListName:t,requisitionListDescription:e,isPublic:i}}).then(({errors:r,data:s})=>{var o;if(r)return L(r);if(!((o=s==null?void 0:s.createRequisitionList)!=null&&o.requisition_list))return null;const n=g(s.createRequisitionList.requisition_list);return U.emit("requisitionList/data",n),n}),hi=`
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
${O}
${E}
`,ut=async(t,e)=>{var o;const i=e.map(u=>{const _={sku:u.sku,quantity:u.quantity};return u.parent_sku&&(_.parent_sku=u.parent_sku),u.selected_options&&u.selected_options.length>0&&(_.selected_options=u.selected_options),u.entered_options&&u.entered_options.length>0&&(_.entered_options=u.entered_options),_}),{errors:r,data:s}=await m(hi,{variables:{requisitionListUid:t,requisitionListItems:i}});if(r)return L(r);if(!((o=s==null?void 0:s.addProductsToRequisitionList)!=null&&o.requisition_list))return null;const n=g(s.addProductsToRequisitionList.requisition_list);return U.emit("requisitionList/data",n),n};export{M as PRODUCT_DATA_BATCH_SIZE,vi as a,st as addPublicRequisitionListItemsToCart,Ki as addRequisitionListItemsToCart,yi as b,ot as c,Qi as config,Zi as copyItemsBetweenRequisitionLists,wi as d,Vi as deleteRequisitionList,Wi as deleteRequisitionListItems,V as e,A as enrichConfigurableProducts,G as enrichRequisitionList,k as f,m as fetchGraphQl,ut as g,oi as getAllRequisitionListItems,Ji as getCompanyUsers,zi as getConfig,et as getPublicRequisitionList,nt as getPublicRequisitionListToken,ni as getRequisitionList,Fi as getRequisitionLists,it as getSharedRequisitionList,X as getStoreConfig,ki as h,$i as i,tt as importSharedRequisitionList,F as initialize,Bi as loadRequisitionListData,ji as moveItemsBetweenRequisitionLists,Di as removeFetchGraphQlHeader,R as s,Pi as setEndpoint,Ci as setFetchGraphQlHeader,Gi as setFetchGraphQlHeaders,rt as sharePublicRequisitionList,Xi as shareRequisitionListByEmail,xi as shareRequisitionListByToken,Mi as u,Yi as updateRequisitionList,Hi as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
