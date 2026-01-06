/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as _}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as te,P as se,u as le,s as ue,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ve,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Ae,fetchGraphQl:fe,getConfig:Fe}=new pe().getMethods(),w=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,ge=e=>{var r,t,n,c,m,P,f,R,g,l,p,y,D,A,F,U,v,I,s,i,b,S,u,N,h,C,z,x,$,Q,G,O,H,K,M,k,L,B,j,Y,J,W,X,Z,V,q,a,T,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(E=>{var ee;return{label:E.label||"",roles:E.roles||[],url:((ee=E.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((c=(n=(t=e==null?void 0:e.price)==null?void 0:t.final)==null?void 0:n.amount)==null?void 0:c.value)||0,currency:w((f=(P=(m=e==null?void 0:e.price)==null?void 0:m.final)==null?void 0:P.amount)==null?void 0:f.currency)}},regular:{amount:{value:((l=(g=(R=e==null?void 0:e.price)==null?void 0:R.regular)==null?void 0:g.amount)==null?void 0:l.value)||0,currency:w((D=(y=(p=e==null?void 0:e.price)==null?void 0:p.regular)==null?void 0:y.amount)==null?void 0:D.currency)}},roles:((A=e==null?void 0:e.price)==null?void 0:A.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((I=(v=(U=(F=e==null?void 0:e.priceRange)==null?void 0:F.minimum)==null?void 0:U.final)==null?void 0:v.amount)==null?void 0:I.value)||0,currency:w((S=(b=(i=(s=e==null?void 0:e.priceRange)==null?void 0:s.minimum)==null?void 0:i.final)==null?void 0:b.amount)==null?void 0:S.currency)}},regular:{amount:{value:((C=(h=(N=(u=e==null?void 0:e.priceRange)==null?void 0:u.minimum)==null?void 0:N.regular)==null?void 0:h.amount)==null?void 0:C.value)||0,currency:w((Q=($=(x=(z=e==null?void 0:e.priceRange)==null?void 0:z.minimum)==null?void 0:x.regular)==null?void 0:$.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((K=(H=(O=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:O.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:w((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((W=(J=(Y=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:Y.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:w((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(o,(d=(T=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:T.transformer)==null?void 0:d.call(T,e))};function he(e,o){var n,c,m,P,f,R,g,l,p;const r=e==null?void 0:e.productSearch,t={facets:be((r==null?void 0:r.facets)||[],o),items:(r==null?void 0:r.items.map(y=>ge(y==null?void 0:y.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((c=r==null?void 0:r.page_info)==null?void 0:c.total_pages)||1,totalItems:((m=r==null?void 0:r.page_info)==null?void 0:m.total_items)||0,pageSize:((P=r==null?void 0:r.page_info)==null?void 0:P.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((f=e==null?void 0:e.attributeMetadata)==null?void 0:f.filterableInSearch)||[],sortableAttributes:ye(((R=e==null?void 0:e.attributeMetadata)==null?void 0:R.sortable)||[],o)}};return re(t,(p=(l=(g=ne.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:p.call(l,e))}function ye(e=[],o){return!e||e.length===0?[]:e.filter(r=>{var t;return r.attribute==="position"?(t=o==null?void 0:o.filter)==null?void 0:t.some(c=>c.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function be(e=[],o){var t;return!e||e.length===0?[]:((t=o==null?void 0:o.filter)==null?void 0:t.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Ce=`
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
`,Ue=async(e,o={})=>{const r=o.scope==="search"?void 0:o.scope,t={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return _.emit("search/result",t,{scope:r}),t.result;_.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?te:se,c=window.crypto.randomUUID(),m=new URLSearchParams(window.location.search),P=Number(m.get("page"))||1,f=m.get("q"),R=f!==null&&f.trim().length>0?f:e==null?void 0:e.phrase,g=m.get("sort"),l=g&&g.trim().length>0?g.split(",").map(s=>{if(s=s.trim(),!s)return null;let i="",b="ASC";if(s.includes(":"))[i,b]=s.split(":");else if(s.includes("_")){const u=s.lastIndexOf("_");i=s.slice(0,u),b=s.slice(u+1).toUpperCase()==="DESC"?"DESC":"ASC"}else i=s;return{attribute:i==="position"?"relevance":i,direction:b}}).filter(Boolean):[],p=m.get("filter"),y=p&&p.trim()?decodeURIComponent(p.replace(/\+/g,"%20")).split(";").reduce((i,b)=>{const S=b.trim();if(!S.includes(":"))return i;const[u,...N]=S.split(":"),h=N.join(":").trim();if(!u||!h)return i;if(u==="price"&&h.includes("-")){const[C,z]=h.split("-"),x=Number(C),$=Number(z);return!Number.isNaN(x)&&!Number.isNaN($)&&i.push({attribute:"price",range:{from:x,to:$}}),i}if(u==="visibility"){const C=h.indexOf(",");return i.push({attribute:u,in:C===-1?[h.trim()]:["Catalog, Search"]}),i}return i.push({attribute:u,in:h.split(/[|,]/).map(C=>C.trim()).filter(Boolean)}),i},[]):e==null?void 0:e.filter,D=R||e.phrase,A=l!=null&&l.length?l:e.sort,F=p!==null?y:e.filter;e={...e,phrase:D,sort:A,filter:F,currentPage:P},le(n,c,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ue(n);const{errors:U,data:v}=await fe(Ce,{method:"GET",variables:{...e}});if(U&&!v)throw new Error("Error fetching product search");const I=he(v,e);return ce(n,c,I),me(n),_.emit("search/result",{request:e,result:I},{scope:r}),I}catch(n){throw _.emit("search/error",n.message,{scope:r}),_.emit("search/result",t,{scope:r}),n}finally{_.emit("search/loading",!1,{scope:r})}};export{xe as a,De as b,Fe as c,Ue as d,fe as f,Ae as g,$e as r,ve as s};
//# sourceMappingURL=search.js.map
