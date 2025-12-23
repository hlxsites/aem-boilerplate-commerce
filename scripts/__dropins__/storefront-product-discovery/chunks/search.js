/*! Copyright 2025 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as b}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as se,P as te,u as le,s as ue,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:we,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Fe,fetchGraphQl:ge,getConfig:Ue}=new pe().getMethods(),v=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,fe=e=>{var r,s,n,c,m,R,p,S,g,l,f,u,$,D,F,U,w,_,t,i,P,I,h,A,y,C,x,E,z,Q,G,O,H,K,M,k,L,B,j,Y,J,W,X,Z,V,q,a,N,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const o={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(T=>{var ee;return{label:T.label||"",roles:T.roles||[],url:((ee=T.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((c=(n=(s=e==null?void 0:e.price)==null?void 0:s.final)==null?void 0:n.amount)==null?void 0:c.value)||0,currency:v((p=(R=(m=e==null?void 0:e.price)==null?void 0:m.final)==null?void 0:R.amount)==null?void 0:p.currency)}},regular:{amount:{value:((l=(g=(S=e==null?void 0:e.price)==null?void 0:S.regular)==null?void 0:g.amount)==null?void 0:l.value)||0,currency:v(($=(u=(f=e==null?void 0:e.price)==null?void 0:f.regular)==null?void 0:u.amount)==null?void 0:$.currency)}},roles:((D=e==null?void 0:e.price)==null?void 0:D.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((_=(w=(U=(F=e==null?void 0:e.priceRange)==null?void 0:F.minimum)==null?void 0:U.final)==null?void 0:w.amount)==null?void 0:_.value)||0,currency:v((I=(P=(i=(t=e==null?void 0:e.priceRange)==null?void 0:t.minimum)==null?void 0:i.final)==null?void 0:P.amount)==null?void 0:I.currency)}},regular:{amount:{value:((C=(y=(A=(h=e==null?void 0:e.priceRange)==null?void 0:h.minimum)==null?void 0:A.regular)==null?void 0:y.amount)==null?void 0:C.value)||0,currency:v((Q=(z=(E=(x=e==null?void 0:e.priceRange)==null?void 0:x.minimum)==null?void 0:E.regular)==null?void 0:z.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((K=(H=(O=(G=e==null?void 0:e.priceRange)==null?void 0:G.maximum)==null?void 0:O.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:v((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((W=(J=(Y=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:Y.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:v((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(o,(d=(N=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:N.transformer)==null?void 0:d.call(N,e))};function he(e,o){var n,c,m,R,p,S,g,l,f;const r=e==null?void 0:e.productSearch,s={facets:Ce((r==null?void 0:r.facets)||[],o),items:(r==null?void 0:r.items.map(u=>fe(u==null?void 0:u.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((c=r==null?void 0:r.page_info)==null?void 0:c.total_pages)||1,totalItems:((m=r==null?void 0:r.page_info)==null?void 0:m.total_items)||0,pageSize:((R=r==null?void 0:r.page_info)==null?void 0:R.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((p=e==null?void 0:e.attributeMetadata)==null?void 0:p.filterableInSearch)||[],sortableAttributes:ye(((S=e==null?void 0:e.attributeMetadata)==null?void 0:S.sortable)||[],o)}};return re(s,(f=(l=(g=ne.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:f.call(l,e))}function ye(e=[],o){return!e||e.length===0?[]:e.filter(r=>{var s;return r.attribute==="position"?(s=o==null?void 0:o.filter)==null?void 0:s.some(c=>c.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Ce(e=[],o){var s;return!e||e.length===0?[]:((s=o==null?void 0:o.filter)==null?void 0:s.some(n=>n.attribute==="categoryPath"))?e.filter(n=>n.attribute!=="categories"):e}const Pe=`
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
`,Ae=async(e,o={})=>{const r=o.scope==="search"?void 0:o.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return b.emit("search/result",s,{scope:r}),s.result;b.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?se:te,c=window.crypto.randomUUID(),m=new URLSearchParams(window.location.search),R=Number(m.get("page"))||1,p=m.get("q"),S=p!==null&&p.trim().length>0?p:e==null?void 0:e.phrase,g=m.get("sort"),l=g&&g.trim().length>0?g.split(",").map(t=>{if(t=t.trim(),!t)return null;let i="",P="ASC";if(t.includes(":"))[i,P]=t.split(":");else if(t.includes("_")){const I=t.lastIndexOf("_");i=t.slice(0,I),P=t.slice(I+1).toUpperCase()==="DESC"?"DESC":"ASC"}else i=t;return{attribute:i,direction:P}}).filter(Boolean):[],f=m.get("filter"),u=f&&f.trim()?decodeURIComponent(f.replace(/\+/g,"%20")).split(";").reduce((i,P)=>{const I=P.trim();if(!I.includes(":"))return i;const[h,...A]=I.split(":"),y=A.join(":").trim();if(!h||!y)return i;if(h==="price"&&y.includes("-")){const[C,x]=y.split("-").map(Number);return i.push({attribute:h,range:{...Number.isNaN(C)?{}:{from:C},...Number.isNaN(x)?{}:{to:x}}}),i}if(h==="visibility"){const C=y.indexOf(",");return i.push({attribute:h,in:C===-1?[y.trim()]:["Catalog, Search"]}),i}return i.push({attribute:h,in:y.split("|").map(C=>C.trim()).filter(Boolean)}),i},[]):e==null?void 0:e.filter,$=S||e.phrase,D=l!=null&&l.length?l:e.sort,F=u!=null&&u.length?u:e.filter;e={...e,phrase:$,sort:D,filter:F,currentPage:R},le(n,c,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ue(n);const{errors:U,data:w}=await ge(Pe,{method:"GET",variables:{...e}});if(U&&!w)throw new Error("Error fetching product search");const _=he(w,e);return ce(n,c,_),me(n),b.emit("search/result",{request:e,result:_},{scope:r}),_}catch(n){throw b.emit("search/error",n.message,{scope:r}),b.emit("search/result",s,{scope:r}),n}finally{b.emit("search/loading",!1,{scope:r})}};export{xe as a,De as b,Ue as c,Ae as d,ge as f,Fe as g,$e as r,we as s};
//# sourceMappingURL=search.js.map
