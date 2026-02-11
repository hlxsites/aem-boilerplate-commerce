/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ie}from"./initialize.js";import{events as x}from"@dropins/tools/event-bus.js";import{ProductView as ne,Facet as oe}from"../fragments.js";import{S as te,P as se,u as le,s as ue,a as ce,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ve,setFetchGraphQlHeader:xe,removeFetchGraphQlHeader:Fe,setFetchGraphQlHeaders:$e,getFetchGraphQlHeader:De,fetchGraphQl:fe,getConfig:Ue}=new pe().getMethods(),F=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,ge=e=>{var r,s,n,u,c,R,f,I,g,l,m,h,P,S,_,N,A,T,E,$,v,o,i,p,C,b,z,y,w,Q,D,U,H,K,M,k,L,B,j,W,Y,J,X,Z,V,q,a,G,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const t={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(O=>{var ee;return{label:O.label||"",roles:O.roles||[],url:((ee=O.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((u=(n=(s=e==null?void 0:e.price)==null?void 0:s.final)==null?void 0:n.amount)==null?void 0:u.value)||0,currency:F((f=(R=(c=e==null?void 0:e.price)==null?void 0:c.final)==null?void 0:R.amount)==null?void 0:f.currency)}},regular:{amount:{value:((l=(g=(I=e==null?void 0:e.price)==null?void 0:I.regular)==null?void 0:g.amount)==null?void 0:l.value)||0,currency:F((P=(h=(m=e==null?void 0:e.price)==null?void 0:m.regular)==null?void 0:h.amount)==null?void 0:P.currency)}},roles:((S=e==null?void 0:e.price)==null?void 0:S.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((T=(A=(N=(_=e==null?void 0:e.priceRange)==null?void 0:_.minimum)==null?void 0:N.final)==null?void 0:A.amount)==null?void 0:T.value)||0,currency:F((o=(v=($=(E=e==null?void 0:e.priceRange)==null?void 0:E.minimum)==null?void 0:$.final)==null?void 0:v.amount)==null?void 0:o.currency)}},regular:{amount:{value:((b=(C=(p=(i=e==null?void 0:e.priceRange)==null?void 0:i.minimum)==null?void 0:p.regular)==null?void 0:C.amount)==null?void 0:b.value)||0,currency:F((Q=(w=(y=(z=e==null?void 0:e.priceRange)==null?void 0:z.minimum)==null?void 0:y.regular)==null?void 0:w.amount)==null?void 0:Q.currency)}}},maximum:{final:{amount:{value:((K=(H=(U=(D=e==null?void 0:e.priceRange)==null?void 0:D.maximum)==null?void 0:U.final)==null?void 0:H.amount)==null?void 0:K.value)||0,currency:F((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((J=(Y=(W=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:W.regular)==null?void 0:Y.amount)==null?void 0:J.value)||0,currency:F((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(t,(d=(G=(a=ie.getConfig().models)==null?void 0:a.Product)==null?void 0:G.transformer)==null?void 0:d.call(G,e))};function he(e,t){var n,u,c,R,f,I,g,l,m;const r=e==null?void 0:e.productSearch,s={facets:Ce((r==null?void 0:r.facets)||[],t),items:(r==null?void 0:r.items.map(h=>ge(h==null?void 0:h.productView)))||[],pageInfo:{currentPage:((n=r==null?void 0:r.page_info)==null?void 0:n.current_page)||1,totalPages:((u=r==null?void 0:r.page_info)==null?void 0:u.total_pages)||1,totalItems:((c=r==null?void 0:r.page_info)==null?void 0:c.total_items)||0,pageSize:((R=r==null?void 0:r.page_info)==null?void 0:R.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((f=e==null?void 0:e.attributeMetadata)==null?void 0:f.filterableInSearch)||[],sortableAttributes:ye(((I=e==null?void 0:e.attributeMetadata)==null?void 0:I.sortable)||[],t)}};return re(s,(m=(l=(g=ie.getConfig().models)==null?void 0:g.ProductSearchResult)==null?void 0:l.transformer)==null?void 0:m.call(l,e))}function ye(e=[],t){return!e||e.length===0?[]:e.filter(r=>{var s;return r.attribute==="position"?(s=t==null?void 0:t.filter)==null?void 0:s.some(u=>u.attribute==="categories"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Ce(e=[],t){var s;return!e||e.length===0?[]:((s=t==null?void 0:t.filter)==null?void 0:s.some(n=>n.attribute==="categories"))?e.filter(n=>n.attribute!=="categoryPath"):e}const be=`
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
  ${ne}
  ${oe}
`,Ne=async(e,t={})=>{const r=t.scope==="search"?void 0:t.scope,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return x.emit("search/result",s,{scope:r}),s.result;x.emit("search/loading",!0,{scope:r});try{const n=r==="popover"?te:se,u=window.crypto.randomUUID(),c=new URLSearchParams(window.location.search),R=Number(c.get("page"))||1,f=c.get("q"),I=(e==null?void 0:e.phrase)||f!==null&&f.trim().length>0&&f||"",g=r!=="undefined"?null:c.get("sort"),l=g&&g.trim().length>0?g.split(",").map(o=>{if(o=o.trim(),!o)return null;let i="",p="ASC";if(o.includes(":"))[i,p]=o.split(":");else if(o.includes("_")){const C=o.lastIndexOf("_");i=o.slice(0,C),p=o.slice(C+1).toUpperCase()==="DESC"?"DESC":"ASC"}else i=o;return i==="position"?null:{attribute:i,direction:p}}).filter(Boolean):[],m=r!=="undefined"?null:c.get("filter"),h=m&&m.trim()?decodeURIComponent(m.replace(/\+/g,"%20")).split(/\||;/).reduce((i,p)=>{const C=p.trim();if(!C.includes(":"))return i;const[b,...z]=C.split(":"),y=z.join(":").trim();if(!b||!y)return i;if(b==="price"&&y.includes("-")){const[w,Q]=y.split("-"),D=Number(w),U=Number(Q);return!Number.isNaN(D)&&!Number.isNaN(U)&&i.push({attribute:"price",range:{from:D,to:U}}),i}if(b==="visibility"){const w=y.indexOf(",");return i.push({attribute:b,in:w===-1?[y.trim()]:["Catalog, Search"]}),i}return i.push({attribute:b,in:y.split(/[|,]/).map(w=>w.trim()).filter(Boolean)}),i},[]):e==null?void 0:e.filter,P=h?[...h]:[],S=window.location.pathname.replace(/^\/|\/$/g,""),_=!r&&S&&!S.startsWith("search")?S.split("/").pop():null;if(_){let o=P.find(p=>p.attribute==="categories");const i={attribute:"categories",in:[_]};o?o=i:P.unshift(i)}const N=I||e.phrase,A=l!=null&&l.length?l:e.sort,T=m!==null||_?P:e.filter;e={...e,phrase:N,sort:A,filter:T,currentPage:R},le(n,u,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ue(n);const{errors:E,data:$}=await fe(be,{method:"GET",variables:{...e}});if(E&&!$)throw new Error("Error fetching product search");const v=he($,e);return ce(n,u,v),me(n),x.emit("search/result",{request:e,result:v},{scope:r}),v}catch(n){throw x.emit("search/error",n.message,{scope:r}),x.emit("search/result",s,{scope:r}),n}finally{x.emit("search/loading",!1,{scope:r})}};export{xe as a,$e as b,Ue as c,Ne as d,fe as f,De as g,Fe as r,ve as s};
//# sourceMappingURL=search.js.map
