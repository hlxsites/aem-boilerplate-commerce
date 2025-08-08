/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as ie,merge as ee}from"@dropins/tools/lib.js";import{events as p}from"@dropins/tools/event-bus.js";import{ProductView as oe,Facet as se}from"../fragments.js";import{S as le,P as ue,u as ce,b as me,d as te,e as pe}from"./acdlEvents.js";import{FetchGraphQL as ge}from"@dropins/tools/fetch-graphql.js";const re=new ie({init:async e=>{const i={};re.config.setConfig({...i,...e})},listeners:()=>[]}),ne=re.config,{setEndpoint:Ce,setFetchGraphQlHeader:Se,removeFetchGraphQlHeader:xe,setFetchGraphQlHeaders:$e,fetchGraphQl:fe,getConfig:ke}=new ge().getMethods(),he=e=>{var r,o,n,s,c,u,l,g,f,m,h,t,_,b,I,v,w,P,C,S,x,$,k,z,D,T,A,F,E,Q,U,G,K,H,M,O,L,N,Y,j,B,J,W,X,Z,V,q,y,a;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const i={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(R=>{var d;return{label:R.label||"",roles:R.roles||[],url:((d=R.url)==null?void 0:d.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((s=(n=(o=e==null?void 0:e.price)==null?void 0:o.final)==null?void 0:n.amount)==null?void 0:s.value)||0,currency:((l=(u=(c=e==null?void 0:e.price)==null?void 0:c.final)==null?void 0:u.amount)==null?void 0:l.currency)||""}},regular:{amount:{value:((m=(f=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:f.amount)==null?void 0:m.value)||0,currency:((_=(t=(h=e==null?void 0:e.price)==null?void 0:h.regular)==null?void 0:t.amount)==null?void 0:_.currency)||""}},roles:((b=e==null?void 0:e.price)==null?void 0:b.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((P=(w=(v=(I=e==null?void 0:e.priceRange)==null?void 0:I.minimum)==null?void 0:v.final)==null?void 0:w.amount)==null?void 0:P.value)||0,currency:(($=(x=(S=(C=e==null?void 0:e.priceRange)==null?void 0:C.minimum)==null?void 0:S.final)==null?void 0:x.amount)==null?void 0:$.currency)||""}},regular:{amount:{value:((T=(D=(z=(k=e==null?void 0:e.priceRange)==null?void 0:k.minimum)==null?void 0:z.regular)==null?void 0:D.amount)==null?void 0:T.value)||0,currency:((Q=(E=(F=(A=e==null?void 0:e.priceRange)==null?void 0:A.minimum)==null?void 0:F.regular)==null?void 0:E.amount)==null?void 0:Q.currency)||""}}},maximum:{final:{amount:{value:((H=(K=(G=(U=e==null?void 0:e.priceRange)==null?void 0:U.maximum)==null?void 0:G.final)==null?void 0:K.amount)==null?void 0:H.value)||0,currency:((N=(L=(O=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:O.final)==null?void 0:L.amount)==null?void 0:N.currency)||""}},regular:{amount:{value:((J=(B=(j=(Y=e==null?void 0:e.priceRange)==null?void 0:Y.maximum)==null?void 0:j.regular)==null?void 0:B.amount)==null?void 0:J.value)||0,currency:((V=(Z=(X=(W=e==null?void 0:e.priceRange)==null?void 0:W.maximum)==null?void 0:X.regular)==null?void 0:Z.amount)==null?void 0:V.currency)||""}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ee(i,(a=(y=(q=ne.getConfig().models)==null?void 0:q.Product)==null?void 0:y.transformer)==null?void 0:a.call(y,e))};function ye(e,i){var n,s,c,u,l,g,f,m,h;const r=e==null?void 0:e.productSearch,o={facets:(r==null?void 0:r.facets)||[],items:(r==null?void 0:r.items.map(t=>he(t==null?void 0:t.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((s=r==null?void 0:r.page_info)==null?void 0:s.total_pages)||1,totalItems:((c=r==null?void 0:r.page_info)==null?void 0:c.total_items)||0,pageSize:((u=r==null?void 0:r.page_info)==null?void 0:u.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((l=e==null?void 0:e.attributeMetadata)==null?void 0:l.filterableInSearch)||[],sortableAttributes:Re(((g=e==null?void 0:e.attributeMetadata)==null?void 0:g.sortable)||[],i)}};return ee(o,(h=(m=(f=ne.getConfig().models)==null?void 0:f.ProductSearchResult)==null?void 0:m.transformer)==null?void 0:h.call(m,e))}function Re(e=[],i){return!e||e.length===0?[]:e.filter(r=>{var o;return r.attribute==="position"?(o=i==null?void 0:i.filter)==null?void 0:o.some(s=>s.attribute==="categoryPath"):!0})}const _e=`
  query productSearch(
    $phrase: String!
    $pageSize: Int
    $currentPage: Int = 1
    $filter: [SearchClauseInput!]
    $sort: [ProductSearchSortInput!]
    $context: QueryContextInput
  ) {
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
      filterableInSearch {
        label
        attribute
        numeric
      }
    }

    productSearch(
      phrase: $phrase
      page_size: $pageSize
      current_page: $currentPage
      filter: $filter
      sort: $sort
      context: $context
    ) {
      total_count
      items {
        ...ProductView
      }
      facets {
        ...Facet
      }
      page_info {
        current_page
        page_size
        total_pages
      }
    }
    attributeMetadata {
      sortable {
        label
        attribute
        numeric
      }
    }
  }
  ${oe}
  ${se}
`,ze=async(e,i={})=>{const r=i.scope==="search"?void 0:i.scope,o={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return p.emit("search/result",o,{scope:r}),o.result;p.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?le:ue,s=window.crypto.randomUUID();ce(n,s,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),me(n);const{errors:c,data:u}=await fe(_e,{method:"GET",variables:{...e}});if(c&&!u)throw new Error("Error fetching product search");const l=ye(u,e);return te(n,s,l),pe(n),p.emit("search/result",{request:e,result:l},{scope:r}),l}catch(n){throw p.emit("search/error",n.message,{scope:r}),p.emit("search/result",o,{scope:r}),n}finally{p.emit("search/loading",!1,{scope:r})}};export{Se as a,$e as b,ne as c,ze as d,fe as f,ke as g,re as i,xe as r,Ce as s};
//# sourceMappingURL=search.js.map
