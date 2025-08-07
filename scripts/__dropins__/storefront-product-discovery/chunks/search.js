/*! Copyright 2025 Adobe
All Rights Reserved. */
import{Initializer as ie,merge as ee}from"@dropins/tools/lib.js";import{events as p}from"@dropins/tools/event-bus.js";import{ProductView as oe,Facet as se}from"../fragments.js";import{S as ue,P as le,u as ce,b as me,d as te,e as pe}from"./acdlEvents.js";import{FetchGraphQL as ge}from"@dropins/tools/fetch-graphql.js";const re=new ie({init:async e=>{const r={};re.config.setConfig({...r,...e})},listeners:()=>[]}),ne=re.config,{setEndpoint:Ce,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:Se,setFetchGraphQlHeaders:ve,fetchGraphQl:fe,getConfig:$e}=new ge().getMethods(),he=e=>{var o,u,c,m,i,t,l,n,s,h,y,R,_,I,b,w,P,C,x,S,v,$,k,z,D,T,A,E,Q,U,F,G,K,q,H,M,O,V,L,N,Y,j,B,J,W,X,Z,g,a;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const r={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((o=e==null?void 0:e.images)==null?void 0:o.map(f=>{var d;return{label:f.label||"",roles:f.roles||[],url:((d=f.url)==null?void 0:d.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((m=(c=(u=e==null?void 0:e.price)==null?void 0:u.final)==null?void 0:c.amount)==null?void 0:m.value)||0,currency:((l=(t=(i=e==null?void 0:e.price)==null?void 0:i.final)==null?void 0:t.amount)==null?void 0:l.currency)||""}},regular:{amount:{value:((h=(s=(n=e==null?void 0:e.price)==null?void 0:n.regular)==null?void 0:s.amount)==null?void 0:h.value)||0,currency:((_=(R=(y=e==null?void 0:e.price)==null?void 0:y.regular)==null?void 0:R.amount)==null?void 0:_.currency)||""}},roles:((I=e==null?void 0:e.price)==null?void 0:I.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((C=(P=(w=(b=e==null?void 0:e.priceRange)==null?void 0:b.minimum)==null?void 0:w.final)==null?void 0:P.amount)==null?void 0:C.value)||0,currency:(($=(v=(S=(x=e==null?void 0:e.priceRange)==null?void 0:x.minimum)==null?void 0:S.final)==null?void 0:v.amount)==null?void 0:$.currency)||""}},regular:{amount:{value:((T=(D=(z=(k=e==null?void 0:e.priceRange)==null?void 0:k.minimum)==null?void 0:z.regular)==null?void 0:D.amount)==null?void 0:T.value)||0,currency:((U=(Q=(E=(A=e==null?void 0:e.priceRange)==null?void 0:A.minimum)==null?void 0:E.regular)==null?void 0:Q.amount)==null?void 0:U.currency)||""}}},maximum:{final:{amount:{value:((q=(K=(G=(F=e==null?void 0:e.priceRange)==null?void 0:F.maximum)==null?void 0:G.final)==null?void 0:K.amount)==null?void 0:q.value)||0,currency:((V=(O=(M=(H=e==null?void 0:e.priceRange)==null?void 0:H.maximum)==null?void 0:M.final)==null?void 0:O.amount)==null?void 0:V.currency)||""}},regular:{amount:{value:((j=(Y=(N=(L=e==null?void 0:e.priceRange)==null?void 0:L.maximum)==null?void 0:N.regular)==null?void 0:Y.amount)==null?void 0:j.value)||0,currency:((X=(W=(J=(B=e==null?void 0:e.priceRange)==null?void 0:B.maximum)==null?void 0:J.regular)==null?void 0:W.amount)==null?void 0:X.currency)||""}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ee(r,(a=(g=(Z=ne.getConfig().models)==null?void 0:Z.Product)==null?void 0:g.transformer)==null?void 0:a.call(g,e))};function ye(e){var u,c,m,i,t,l,n;const r=e==null?void 0:e.productSearch,o={facets:(r==null?void 0:r.facets)||[],items:(r==null?void 0:r.items.map(s=>he(s==null?void 0:s.productView)))||[],pageInfo:{currentPage:((u=r==null?void 0:r.page_info)==null?void 0:u.current_page)||1,totalPages:((c=r==null?void 0:r.page_info)==null?void 0:c.total_pages)||1,totalItems:((m=r==null?void 0:r.page_info)==null?void 0:m.total_items)||0,pageSize:((i=r==null?void 0:r.page_info)==null?void 0:i.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0};return ee(o,(n=(l=(t=ne.getConfig().models)==null?void 0:t.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:n.call(l,e))}const Re=`
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
`,ke=async(e,r={})=>{var c,m;const o=r.scope==="search"?void 0:r.scope,u={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[]},metadata:{filterableAttributes:[],sortableAttributes:[]}};if(e===null)return p.emit("search/result",u,{scope:o}),u.result;p.emit("search/loading",!0,{scope:o});try{const i=o==="popover"?ue:le,t=window.crypto.randomUUID();ce(i,t,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),me(i);const{errors:l,data:n}=await fe(Re,{method:"GET",variables:{...e}});if(l&&!n)throw new Error("Error fetching product search");const s=ye(n);return te(i,t,s),pe(i),p.emit("search/result",{request:e,result:s,metadata:{filterableAttributes:((c=n==null?void 0:n.attributeMetadata)==null?void 0:c.filterableInSearch)||[],sortableAttributes:((m=n==null?void 0:n.attributeMetadata)==null?void 0:m.sortable)||[]}},{scope:o}),s}catch(i){throw p.emit("search/error",i.message,{scope:o}),p.emit("search/result",u,{scope:o}),i}finally{p.emit("search/loading",!1,{scope:o})}};export{xe as a,ve as b,ne as c,ke as d,fe as f,$e as g,re as i,Se as r,Ce as s};
//# sourceMappingURL=search.js.map
