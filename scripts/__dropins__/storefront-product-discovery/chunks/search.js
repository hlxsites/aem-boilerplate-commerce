/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as ie,merge as ee}from"@dropins/tools/lib.js";import{events as p}from"@dropins/tools/event-bus.js";import{ProductView as oe,Facet as se}from"../fragments.js";import{S as ue,P as ce,u as le,b as me,d as te,e as pe}from"./acdlEvents.js";import{FetchGraphQL as ge}from"@dropins/tools/fetch-graphql.js";const re=new ie({init:async e=>{const r={};re.config.setConfig({...r,...e})},listeners:()=>[]}),ne=re.config,{setEndpoint:Ce,setFetchGraphQlHeader:ve,removeFetchGraphQlHeader:xe,setFetchGraphQlHeaders:Se,fetchGraphQl:fe,getConfig:$e}=new ge().getMethods(),he=e=>{var o,u,c,i,l,m,n,s,t,h,y,_,I,R,b,w,P,C,v,x,S,$,k,z,D,T,A,E,Q,U,F,G,K,q,H,M,O,V,L,N,Y,j,B,J,W,X,Z,g,a;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const r={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((o=e==null?void 0:e.images)==null?void 0:o.map(f=>{var d;return{label:f.label||"",roles:f.roles||[],url:((d=f.url)==null?void 0:d.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((i=(c=(u=e==null?void 0:e.price)==null?void 0:u.final)==null?void 0:c.amount)==null?void 0:i.value)||0,currency:((n=(m=(l=e==null?void 0:e.price)==null?void 0:l.final)==null?void 0:m.amount)==null?void 0:n.currency)||""}},regular:{amount:{value:((h=(t=(s=e==null?void 0:e.price)==null?void 0:s.regular)==null?void 0:t.amount)==null?void 0:h.value)||0,currency:((I=(_=(y=e==null?void 0:e.price)==null?void 0:y.regular)==null?void 0:_.amount)==null?void 0:I.currency)||""}},roles:((R=e==null?void 0:e.price)==null?void 0:R.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((C=(P=(w=(b=e==null?void 0:e.priceRange)==null?void 0:b.minimum)==null?void 0:w.final)==null?void 0:P.amount)==null?void 0:C.value)||0,currency:(($=(S=(x=(v=e==null?void 0:e.priceRange)==null?void 0:v.minimum)==null?void 0:x.final)==null?void 0:S.amount)==null?void 0:$.currency)||""}},regular:{amount:{value:((T=(D=(z=(k=e==null?void 0:e.priceRange)==null?void 0:k.minimum)==null?void 0:z.regular)==null?void 0:D.amount)==null?void 0:T.value)||0,currency:((U=(Q=(E=(A=e==null?void 0:e.priceRange)==null?void 0:A.minimum)==null?void 0:E.regular)==null?void 0:Q.amount)==null?void 0:U.currency)||""}}},maximum:{final:{amount:{value:((q=(K=(G=(F=e==null?void 0:e.priceRange)==null?void 0:F.maximum)==null?void 0:G.final)==null?void 0:K.amount)==null?void 0:q.value)||0,currency:((V=(O=(M=(H=e==null?void 0:e.priceRange)==null?void 0:H.maximum)==null?void 0:M.final)==null?void 0:O.amount)==null?void 0:V.currency)||""}},regular:{amount:{value:((j=(Y=(N=(L=e==null?void 0:e.priceRange)==null?void 0:L.maximum)==null?void 0:N.regular)==null?void 0:Y.amount)==null?void 0:j.value)||0,currency:((X=(W=(J=(B=e==null?void 0:e.priceRange)==null?void 0:B.maximum)==null?void 0:J.regular)==null?void 0:W.amount)==null?void 0:X.currency)||""}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ee(r,(a=(g=(Z=ne.getConfig().models)==null?void 0:Z.Product)==null?void 0:g.transformer)==null?void 0:a.call(g,e))};function ye(e){var u,c,i,l,m,n,s;const r=e==null?void 0:e.productSearch,o={facets:(r==null?void 0:r.facets)||[],items:(r==null?void 0:r.items.map(t=>he(t==null?void 0:t.productView)))||[],pageInfo:{currentPage:((u=r==null?void 0:r.page_info)==null?void 0:u.current_page)||1,totalPages:((c=r==null?void 0:r.page_info)==null?void 0:c.total_pages)||1,totalItems:((i=r==null?void 0:r.page_info)==null?void 0:i.total_items)||0,pageSize:((l=r==null?void 0:r.page_info)==null?void 0:l.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0};return ee(o,(s=(n=(m=ne.getConfig().models)==null?void 0:m.ProductSearchResult)==null?void 0:n.transformer)==null?void 0:s.call(n,e))}const _e=`
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
`,ke=async(e,r={})=>{var u,c;const o=r.scope==="search"?void 0:r.scope;p.emit("search/loading",!0,{scope:o});try{const i=o==="popover"?ue:ce,l=window.crypto.randomUUID();le(i,l,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),me(i);const{errors:m,data:n}=await fe(_e,{method:"GET",variables:{...e}});if(m&&!n)throw new Error("Error fetching product search");const s=ye(n);return te(i,l,s),pe(i),p.emit("search/result",{request:e,result:s,metadata:{filterableAttributes:((u=n==null?void 0:n.attributeMetadata)==null?void 0:u.filterableInSearch)||[],sortableAttributes:((c=n==null?void 0:n.attributeMetadata)==null?void 0:c.sortable)||[]}},{scope:o}),s}catch(i){throw p.emit("search/error",i.message,{scope:o}),p.emit("search/result",{request:e,result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[]},metadata:{filterableAttributes:[],sortableAttributes:[]}},{scope:o}),i}finally{p.emit("search/loading",!1,{scope:o})}};export{ve as a,Se as b,ne as c,ke as d,fe as f,$e as g,re as i,xe as r,Ce as s};
//# sourceMappingURL=search.js.map
