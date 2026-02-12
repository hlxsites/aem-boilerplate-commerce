/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as ne}from"@dropins/tools/lib.js";import{c as ie}from"./initialize.js";import{events as F}from"@dropins/tools/event-bus.js";import{ProductView as oe,Facet as te}from"../fragments.js";import{S as se,P as le,u as ue,s as ce,a as me,b as pe}from"./acdlEvents.js";import{FetchGraphQL as fe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:xe,setFetchGraphQlHeader:Fe,removeFetchGraphQlHeader:$e,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Ue,fetchGraphQl:ge,getConfig:Ne}=new fe().getMethods(),$=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,he=e=>{var r,s,i,u,c,R,f,I,g,l,m,h,S,_,v,A,T,E,z,D,x,o,n,p,b,P,Q,y,C,G,U,N,H,K,M,k,L,B,j,W,Y,J,X,Z,V,q,a,d,O,ee;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],attributes:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const t={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],attributes:((r=e==null?void 0:e.attributes)==null?void 0:r.map(w=>({label:w.label||"",name:w.name||"",roles:w.roles||[],value:w.value??null})))||[],images:((s=e==null?void 0:e.images)==null?void 0:s.map(w=>{var re;return{label:w.label||"",roles:w.roles||[],url:((re=w.url)==null?void 0:re.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((c=(u=(i=e==null?void 0:e.price)==null?void 0:i.final)==null?void 0:u.amount)==null?void 0:c.value)||0,currency:$((I=(f=(R=e==null?void 0:e.price)==null?void 0:R.final)==null?void 0:f.amount)==null?void 0:I.currency)}},regular:{amount:{value:((m=(l=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:l.amount)==null?void 0:m.value)||0,currency:$((_=(S=(h=e==null?void 0:e.price)==null?void 0:h.regular)==null?void 0:S.amount)==null?void 0:_.currency)}},roles:((v=e==null?void 0:e.price)==null?void 0:v.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((z=(E=(T=(A=e==null?void 0:e.priceRange)==null?void 0:A.minimum)==null?void 0:T.final)==null?void 0:E.amount)==null?void 0:z.value)||0,currency:$((n=(o=(x=(D=e==null?void 0:e.priceRange)==null?void 0:D.minimum)==null?void 0:x.final)==null?void 0:o.amount)==null?void 0:n.currency)}},regular:{amount:{value:((Q=(P=(b=(p=e==null?void 0:e.priceRange)==null?void 0:p.minimum)==null?void 0:b.regular)==null?void 0:P.amount)==null?void 0:Q.value)||0,currency:$((U=(G=(C=(y=e==null?void 0:e.priceRange)==null?void 0:y.minimum)==null?void 0:C.regular)==null?void 0:G.amount)==null?void 0:U.currency)}}},maximum:{final:{amount:{value:((M=(K=(H=(N=e==null?void 0:e.priceRange)==null?void 0:N.maximum)==null?void 0:H.final)==null?void 0:K.amount)==null?void 0:M.value)||0,currency:$((j=(B=(L=(k=e==null?void 0:e.priceRange)==null?void 0:k.maximum)==null?void 0:L.final)==null?void 0:B.amount)==null?void 0:j.currency)}},regular:{amount:{value:((X=(J=(Y=(W=e==null?void 0:e.priceRange)==null?void 0:W.maximum)==null?void 0:Y.regular)==null?void 0:J.amount)==null?void 0:X.value)||0,currency:$((a=(q=(V=(Z=e==null?void 0:e.priceRange)==null?void 0:Z.maximum)==null?void 0:V.regular)==null?void 0:q.amount)==null?void 0:a.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return ne(t,(ee=(O=(d=ie.getConfig().models)==null?void 0:d.Product)==null?void 0:O.transformer)==null?void 0:ee.call(O,e))};function ye(e,t){var i,u,c,R,f,I,g,l,m;const r=e==null?void 0:e.productSearch,s={facets:Pe((r==null?void 0:r.facets)||[],t),items:(r==null?void 0:r.items.map(h=>he(h==null?void 0:h.productView)))||[],pageInfo:{currentPage:((i=r==null?void 0:r.page_info)==null?void 0:i.current_page)||1,totalPages:((u=r==null?void 0:r.page_info)==null?void 0:u.total_pages)||1,totalItems:((c=r==null?void 0:r.page_info)==null?void 0:c.total_items)||0,pageSize:((R=r==null?void 0:r.page_info)==null?void 0:R.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((f=e==null?void 0:e.attributeMetadata)==null?void 0:f.filterableInSearch)||[],sortableAttributes:be(((I=e==null?void 0:e.attributeMetadata)==null?void 0:I.sortable)||[],t)}};return ne(s,(m=(l=(g=ie.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:m.call(l,e))}function be(e=[],t){return!e||e.length===0?[]:e.filter(r=>{var s;return r.attribute==="position"?(s=t==null?void 0:t.filter)==null?void 0:s.some(u=>u.attribute==="categoryPath"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],t){var s;return!e||e.length===0?[]:((s=t==null?void 0:t.filter)==null?void 0:s.some(i=>i.attribute==="categoryPath"))?e.filter(i=>i.attribute!=="categories"):e}const Ce=`
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
  ${oe}
  ${te}
`,Ae=async(e,t={})=>{const r=t.scope==="search"?void 0:t.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return F.emit("search/result",s,{scope:r}),s.result;F.emit("search/loading",!0,{scope:r});try{const i=r==="popover"?se:le,u=window.crypto.randomUUID(),c=new URLSearchParams(window.location.search),R=Number(c.get("page"))||1,f=c.get("q"),I=(e==null?void 0:e.phrase)||f!==null&&f.trim().length>0&&f||"",g=r!=="undefined"?null:c.get("sort"),l=g&&g.trim().length>0?g.split(",").map(o=>{if(o=o.trim(),!o)return null;let n="",p="ASC";if(o.includes(":"))[n,p]=o.split(":");else if(o.includes("_")){const b=o.lastIndexOf("_");n=o.slice(0,b),p=o.slice(b+1).toUpperCase()==="DESC"?"DESC":"ASC"}else n=o;return n==="position"?null:{attribute:n,direction:p}}).filter(Boolean):[],m=r!=="undefined"?null:c.get("filter"),h=m&&m.trim()?decodeURIComponent(m.replace(/\+/g,"%20")).split(/\||;/).reduce((n,p)=>{const b=p.trim();if(!b.includes(":"))return n;const[P,...Q]=b.split(":"),y=Q.join(":").trim();if(!P||!y)return n;if(P==="price"&&y.includes("-")){const[C,G]=y.split("-"),U=Number(C),N=Number(G);return!Number.isNaN(U)&&!Number.isNaN(N)&&n.push({attribute:"price",range:{from:U,to:N}}),n}if(P==="visibility"){const C=y.indexOf(",");return n.push({attribute:P,in:C===-1?[y.trim()]:["Catalog, Search"]}),n}return n.push({attribute:P,in:y.split(/[|,]/).map(C=>C.trim()).filter(Boolean)}),n},[]):e==null?void 0:e.filter,S=h?[...h]:[],_=window.location.pathname.replace(/^\/|\/$/g,""),v=!r&&_&&!_.startsWith("search")?_.split("/").pop():null;if(v){let o=S.find(p=>p.attribute==="categoryPath");const n={attribute:"categoryPath",in:[v]};o?o=n:S.unshift(n)}const A=I||e.phrase,T=l!=null&&l.length?l:e.sort,E=m!==null||v?S:e.filter;e={...e,phrase:A,sort:T,filter:E,currentPage:R},ue(i,u,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ce(i);const{errors:z,data:D}=await ge(Ce,{method:"GET",variables:{...e}});if(z&&!D)throw new Error("Error fetching product search");const x=ye(D,e);return me(i,u,x),pe(i),F.emit("search/result",{request:e,result:x},{scope:r}),x}catch(i){throw F.emit("search/error",i.message,{scope:r}),F.emit("search/result",s,{scope:r}),i}finally{F.emit("search/loading",!1,{scope:r})}};export{Fe as a,De as b,Ne as c,Ae as d,ge as f,Ue as g,$e as r,xe as s};
//# sourceMappingURL=search.js.map
