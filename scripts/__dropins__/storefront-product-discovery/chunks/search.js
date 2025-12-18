/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as _}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as se,P as te,u as le,s as ue,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:be,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Fe,fetchGraphQl:ge,getConfig:Ae}=new pe().getMethods(),C=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,fe=e=>{var r,s,n,l,u,f,h,p,y,c,P,g,I,R,i,m,t,v,w,x,$,D,F,A,T,U,E,k,z,Q,G,H,K,O,M,L,N,j,Y,B,J,W,X,Z,V,q,a,S,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(b=>{var ee;return{label:b.label||"",roles:b.roles||[],url:((ee=b.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((l=(n=(s=e==null?void 0:e.price)==null?void 0:s.final)==null?void 0:n.amount)==null?void 0:l.value)||0,currency:C((h=(f=(u=e==null?void 0:e.price)==null?void 0:u.final)==null?void 0:f.amount)==null?void 0:h.currency)}},regular:{amount:{value:((c=(y=(p=e==null?void 0:e.price)==null?void 0:p.regular)==null?void 0:y.amount)==null?void 0:c.value)||0,currency:C((I=(g=(P=e==null?void 0:e.price)==null?void 0:P.regular)==null?void 0:g.amount)==null?void 0:I.currency)}},roles:((R=e==null?void 0:e.price)==null?void 0:R.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((v=(t=(m=(i=e==null?void 0:e.priceRange)==null?void 0:i.minimum)==null?void 0:m.final)==null?void 0:t.amount)==null?void 0:v.value)||0,currency:C((D=($=(x=(w=e==null?void 0:e.priceRange)==null?void 0:w.minimum)==null?void 0:x.final)==null?void 0:$.amount)==null?void 0:D.currency)}},regular:{amount:{value:((U=(T=(A=(F=e==null?void 0:e.priceRange)==null?void 0:F.minimum)==null?void 0:A.regular)==null?void 0:T.amount)==null?void 0:U.value)||0,currency:C((Q=(z=(k=(E=e==null?void 0:e.priceRange)==null?void 0:E.minimum)==null?void 0:k.regular)==null?void 0:z.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((O=(K=(H=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:H.final)==null?void 0:K.amount)==null?void 0:O.value)||0,currency:C((j=(N=(L=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:L.final)==null?void 0:N.amount)==null?void 0:j.currency)}},regular:{amount:{value:((W=(J=(B=(Y=e==null?void 0:e.priceRange)==null?void 0:Y.maximum)==null?void 0:B.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:C((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(o,(d=(S=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:S.transformer)==null?void 0:d.call(S,e))};function he(e,o){var n,l,u,f,h,p,y,c,P;const r=e==null?void 0:e.productSearch,s={facets:Pe((r==null?void 0:r.facets)||[],o),items:(r==null?void 0:r.items.map(g=>fe(g==null?void 0:g.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((l=r==null?void 0:r.page_info)==null?void 0:l.total_pages)||1,totalItems:((u=r==null?void 0:r.page_info)==null?void 0:u.total_items)||0,pageSize:((f=r==null?void 0:r.page_info)==null?void 0:f.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((h=e==null?void 0:e.attributeMetadata)==null?void 0:h.filterableInSearch)||[],sortableAttributes:ye(((p=e==null?void 0:e.attributeMetadata)==null?void 0:p.sortable)||[],o)}};return re(s,(P=(c=(y=ne.getConfig().models)==null?void 0:y.ProductSearchResult)==null?void 0:c.transformer)==null?void 0:P.call(c,e))}function ye(e=[],o){return!e||e.length===0?[]:e.filter(r=>{var s;return r.attribute==="position"?(s=o==null?void 0:o.filter)==null?void 0:s.some(l=>l.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],o){var s;return!e||e.length===0?[]:((s=o==null?void 0:o.filter)==null?void 0:s.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const ve=`
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
  }
  ${ie}
  ${oe}
`,Te=async(e,o={})=>{const r=o.scope==="search"?void 0:o.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return _.emit("search/result",s,{scope:r}),s.result;_.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?se:te,l=window.crypto.randomUUID(),u=new URLSearchParams(window.location.search),f=Number(u.get("page"))||1,h=u.get("q")??void 0,p=u.get("sort"),y=p?p.split(",").map(i=>{let m=i,t="ASC";if(i.includes(":"))[m,t]=i.split(":");else if(i.includes("_")){const[v,w]=i.split("_");m=v,t=w==="DESC"?"DESC":"ASC"}return{attribute:m,direction:t}}):void 0,c=u.get("filter"),P=c?Object.entries(decodeURIComponent(c).split(",").reduce((i,m)=>{const[t,v]=m.split(":");return t&&(i[t]??(i[t]=[]),v&&i[t].push(v.trim())),i},{})).map(([i,m])=>({attribute:i,eq:m.join(",")})):void 0;e={...e,sort:y??e.sort,filter:P??e.filter,phrase:h??e.phrase,currentPage:f},le(n,l,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ue(n);const{errors:g,data:I}=await ge(ve,{method:"GET",variables:{...e}});if(g&&!I)throw new Error("Error fetching product search");const R=he(I,e);return ce(n,l,R),me(n),_.emit("search/result",{request:e,result:R},{scope:r}),R}catch(n){throw _.emit("search/error",n.message,{scope:r}),_.emit("search/result",s,{scope:r}),n}finally{_.emit("search/loading",!1,{scope:r})}};export{xe as a,De as b,Ae as c,Te as d,ge as f,Fe as g,$e as r,be as s};
//# sourceMappingURL=search.js.map
