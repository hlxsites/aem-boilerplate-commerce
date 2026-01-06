/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as _}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as te,P as se,u as le,s as ue,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ve,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Fe,fetchGraphQl:fe,getConfig:Ue}=new pe().getMethods(),w=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,ge=e=>{var r,t,n,u,c,b,p,I,f,l,m,h,D,F,U,N,v,S,s,i,y,C,P,A,g,R,T,x,$,Q,G,O,H,K,M,k,L,B,j,Y,J,W,X,Z,V,q,a,E,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(z=>{var ee;return{label:z.label||"",roles:z.roles||[],url:((ee=z.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((u=(n=(t=e==null?void 0:e.price)==null?void 0:t.final)==null?void 0:n.amount)==null?void 0:u.value)||0,currency:w((p=(b=(c=e==null?void 0:e.price)==null?void 0:c.final)==null?void 0:b.amount)==null?void 0:p.currency)}},regular:{amount:{value:((l=(f=(I=e==null?void 0:e.price)==null?void 0:I.regular)==null?void 0:f.amount)==null?void 0:l.value)||0,currency:w((D=(h=(m=e==null?void 0:e.price)==null?void 0:m.regular)==null?void 0:h.amount)==null?void 0:D.currency)}},roles:((F=e==null?void 0:e.price)==null?void 0:F.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((S=(v=(N=(U=e==null?void 0:e.priceRange)==null?void 0:U.minimum)==null?void 0:N.final)==null?void 0:v.amount)==null?void 0:S.value)||0,currency:w((C=(y=(i=(s=e==null?void 0:e.priceRange)==null?void 0:s.minimum)==null?void 0:i.final)==null?void 0:y.amount)==null?void 0:C.currency)}},regular:{amount:{value:((R=(g=(A=(P=e==null?void 0:e.priceRange)==null?void 0:P.minimum)==null?void 0:A.regular)==null?void 0:g.amount)==null?void 0:R.value)||0,currency:w((Q=($=(x=(T=e==null?void 0:e.priceRange)==null?void 0:T.minimum)==null?void 0:x.regular)==null?void 0:$.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((K=(H=(O=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:O.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:w((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((W=(J=(Y=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:Y.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:w((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(o,(d=(E=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:E.transformer)==null?void 0:d.call(E,e))};function he(e,o){var n,u,c,b,p,I,f,l,m;const r=e==null?void 0:e.productSearch,t={facets:Ce((r==null?void 0:r.facets)||[],o),items:(r==null?void 0:r.items.map(h=>ge(h==null?void 0:h.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((u=r==null?void 0:r.page_info)==null?void 0:u.total_pages)||1,totalItems:((c=r==null?void 0:r.page_info)==null?void 0:c.total_items)||0,pageSize:((b=r==null?void 0:r.page_info)==null?void 0:b.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((p=e==null?void 0:e.attributeMetadata)==null?void 0:p.filterableInSearch)||[],sortableAttributes:ye(((I=e==null?void 0:e.attributeMetadata)==null?void 0:I.sortable)||[],o)}};return re(t,(m=(l=(f=ne.getConfig().models)==null?void 0:f.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:m.call(l,e))}function ye(e=[],o){return!e||e.length===0?[]:e.filter(r=>{var t;return r.attribute==="position"?(t=o==null?void 0:o.filter)==null?void 0:t.some(u=>u.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Ce(e=[],o){var t;return!e||e.length===0?[]:((t=o==null?void 0:o.filter)==null?void 0:t.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Pe=`
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
`,Ne=async(e,o={})=>{const r=o.scope==="search"?void 0:o.scope,t={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return _.emit("search/result",t,{scope:r}),t.result;_.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?te:se,u=window.crypto.randomUUID(),c=new URLSearchParams(window.location.search),b=Number(c.get("page"))||1,p=c.get("q"),I=p!==null&&p.trim().length>0?p:e==null?void 0:e.phrase,f=c.get("sort"),l=f&&f.trim().length>0?f.split(",").map(s=>{if(s=s.trim(),!s)return null;let i="",y="ASC";if(s.includes(":"))[i,y]=s.split(":");else if(s.includes("_")){const C=s.lastIndexOf("_");i=s.slice(0,C),y=s.slice(C+1).toUpperCase()==="DESC"?"DESC":"ASC"}else i=s;return i==="position"?null:{attribute:i,direction:y}}).filter(Boolean):[],m=c.get("filter"),h=m&&m.trim()?decodeURIComponent(m.replace(/\+/g,"%20")).split(";").reduce((i,y)=>{const C=y.trim();if(!C.includes(":"))return i;const[P,...A]=C.split(":"),g=A.join(":").trim();if(!P||!g)return i;if(P==="price"&&g.includes("-")){const[R,T]=g.split("-"),x=Number(R),$=Number(T);return!Number.isNaN(x)&&!Number.isNaN($)&&i.push({attribute:"price",range:{from:x,to:$}}),i}if(P==="visibility"){const R=g.indexOf(",");return i.push({attribute:P,in:R===-1?[g.trim()]:["Catalog, Search"]}),i}return i.push({attribute:P,in:g.split(/[|,]/).map(R=>R.trim()).filter(Boolean)}),i},[]):e==null?void 0:e.filter,D=I||e.phrase,F=l!=null&&l.length?l:e.sort,U=m!==null?h:e.filter;e={...e,phrase:D,sort:F,filter:U,currentPage:b},le(n,u,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ue(n);const{errors:N,data:v}=await fe(Pe,{method:"GET",variables:{...e}});if(N&&!v)throw new Error("Error fetching product search");const S=he(v,e);return ce(n,u,S),me(n),_.emit("search/result",{request:e,result:S},{scope:r}),S}catch(n){throw _.emit("search/error",n.message,{scope:r}),_.emit("search/result",t,{scope:r}),n}finally{_.emit("search/loading",!1,{scope:r})}};export{xe as a,De as b,Ue as c,Ne as d,fe as f,Fe as g,$e as r,ve as s};
//# sourceMappingURL=search.js.map
