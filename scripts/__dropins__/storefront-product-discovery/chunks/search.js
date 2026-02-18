/*! Copyright 2026 Adobe
All Rights Reserved. */
import{merge as re}from"@dropins/tools/lib.js";import{c as ne}from"./initialize.js";import{events as v}from"@dropins/tools/event-bus.js";import{ProductView as ie,Facet as oe}from"../fragments.js";import{S as te,P as se,u as le,s as ce,a as ue,b as me}from"./acdlEvents.js";import{FetchGraphQL as pe}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:Fe,setFetchGraphQlHeader:$e,removeFetchGraphQlHeader:Ae,setFetchGraphQlHeaders:De,getFetchGraphQlHeader:Ne,fetchGraphQl:fe,getConfig:Ue}=new pe().getMethods(),ge="search",x=e=>!e||!Intl.supportedValuesOf("currency").includes(e)?"USD":e,he=e=>{var r,l,s,t,y,m,R,g,w,c,p,u,F,S,_,N,U,E,T,$,I,o,n,f,C,P,z,h,b,H,A,D,O,K,M,k,L,B,j,Y,J,W,X,Z,V,q,a,Q,d;if(!e)return{id:"",name:"",sku:"",shortDescription:"",url:"",urlKey:"",metaTitle:"",metaKeywords:"",metaDescription:"",lowStock:!1,links:[],images:[],description:"",externalId:"",inputOptions:[],addToCartAllowed:!1,price:void 0,priceRange:void 0,inStock:!1,typename:""};const i={id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||"",sku:(e==null?void 0:e.sku)||"",shortDescription:(e==null?void 0:e.shortDescription)||"",url:(e==null?void 0:e.url)||"",urlKey:(e==null?void 0:e.urlKey)||"",metaTitle:(e==null?void 0:e.metaTitle)||"",metaKeywords:(e==null?void 0:e.metaKeywords)||"",metaDescription:(e==null?void 0:e.metaDescription)||"",lowStock:(e==null?void 0:e.lowStock)||!1,links:(e==null?void 0:e.links)||[],images:((r=e==null?void 0:e.images)==null?void 0:r.map(G=>{var ee;return{label:G.label||"",roles:G.roles||[],url:((ee=G.url)==null?void 0:ee.replace(/^https?:\/\//,"//"))||""}}))||[],description:(e==null?void 0:e.description)||"",externalId:(e==null?void 0:e.externalId)||"",inputOptions:(e==null?void 0:e.inputOptions)||[],addToCartAllowed:(e==null?void 0:e.addToCartAllowed)||!1,price:e.price?{final:{amount:{value:((t=(s=(l=e==null?void 0:e.price)==null?void 0:l.final)==null?void 0:s.amount)==null?void 0:t.value)||0,currency:x((R=(m=(y=e==null?void 0:e.price)==null?void 0:y.final)==null?void 0:m.amount)==null?void 0:R.currency)}},regular:{amount:{value:((c=(w=(g=e==null?void 0:e.price)==null?void 0:g.regular)==null?void 0:w.amount)==null?void 0:c.value)||0,currency:x((F=(u=(p=e==null?void 0:e.price)==null?void 0:p.regular)==null?void 0:u.amount)==null?void 0:F.currency)}},roles:((S=e==null?void 0:e.price)==null?void 0:S.roles)||[]}:void 0,priceRange:e!=null&&e.priceRange?{minimum:{final:{amount:{value:((E=(U=(N=(_=e==null?void 0:e.priceRange)==null?void 0:_.minimum)==null?void 0:N.final)==null?void 0:U.amount)==null?void 0:E.value)||0,currency:x((o=(I=($=(T=e==null?void 0:e.priceRange)==null?void 0:T.minimum)==null?void 0:$.final)==null?void 0:I.amount)==null?void 0:o.currency)}},regular:{amount:{value:((P=(C=(f=(n=e==null?void 0:e.priceRange)==null?void 0:n.minimum)==null?void 0:f.regular)==null?void 0:C.amount)==null?void 0:P.value)||0,currency:x((H=(b=(h=(z=e==null?void 0:e.priceRange)==null?void 0:z.minimum)==null?void 0:h.regular)==null?void 0:b.amount)==null?void 0:H.currency)}}},maximum:{final:{amount:{value:((K=(O=(D=(A=e==null?void 0:e.priceRange)==null?void 0:A.maximum)==null?void 0:D.final)==null?void 0:O.amount)==null?void 0:K.value)||0,currency:x((B=(L=(k=(M=e==null?void 0:e.priceRange)==null?void 0:M.maximum)==null?void 0:k.final)==null?void 0:L.amount)==null?void 0:B.currency)}},regular:{amount:{value:((W=(J=(Y=(j=e==null?void 0:e.priceRange)==null?void 0:j.maximum)==null?void 0:Y.regular)==null?void 0:J.amount)==null?void 0:W.value)||0,currency:x((q=(V=(Z=(X=e==null?void 0:e.priceRange)==null?void 0:X.maximum)==null?void 0:Z.regular)==null?void 0:V.amount)==null?void 0:q.currency)}}}}:void 0,inStock:(e==null?void 0:e.inStock)||!1,typename:(e==null?void 0:e.__typename)||""};return re(i,(d=(Q=(a=ne.getConfig().models)==null?void 0:a.Product)==null?void 0:Q.transformer)==null?void 0:d.call(Q,e))};function ye(e,i){var s,t,y,m,R,g,w,c,p;const r=e==null?void 0:e.productSearch,l={facets:Pe((r==null?void 0:r.facets)||[],i),items:(r==null?void 0:r.items.map(u=>he(u==null?void 0:u.productView)))||[],pageInfo:{currentPage:((s=r==null?void 0:r.page_info)==null?void 0:s.current_page)||1,totalPages:((t=r==null?void 0:r.page_info)==null?void 0:t.total_pages)||1,totalItems:((y=r==null?void 0:r.page_info)==null?void 0:y.total_items)||0,pageSize:((m=r==null?void 0:r.page_info)==null?void 0:m.page_size)||10},totalCount:(r==null?void 0:r.total_count)||0,metadata:{filterableAttributes:((R=e==null?void 0:e.attributeMetadata)==null?void 0:R.filterableInSearch)||[],sortableAttributes:Ce(((g=e==null?void 0:e.attributeMetadata)==null?void 0:g.sortable)||[],i)}};return re(l,(p=(c=(w=ne.getConfig().models)==null?void 0:w.ProductSearchResult)==null?void 0:c.transformer)==null?void 0:p.call(c,e))}function Ce(e=[],i){return!e||e.length===0?[]:e.filter(r=>{var l;return r.attribute==="position"?(l=i==null?void 0:i.filter)==null?void 0:l.some(t=>t.attribute==="categories"):!0}).map(r=>({...r,bidirectional:r.attribute==="price"}))}function Pe(e=[],i){var l;return!e||e.length===0?[]:((l=i==null?void 0:i.filter)==null?void 0:l.some(s=>s.attribute==="categories"))?e.filter(s=>s.attribute!=="categoryPath"):e}const be=`
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
`,Re=(e,i)=>{const r=window.location.pathname.replace(/^\/|\/$/g,"");return!e&&r&&r.split("/").pop()!==i?r.split("/").pop():null},Ee=async(e,i={})=>{const r=i.scope==="search"?void 0:i.scope,l=i.searchPathname??ge,s={request:e||{},result:{facets:[],pageInfo:{currentPage:0,totalPages:0,totalItems:0,pageSize:0},items:[],totalCount:0,suggestions:[],metadata:{filterableAttributes:[],sortableAttributes:[]}}};if(e===null)return v.emit("search/result",s,{scope:r}),s.result;v.emit("search/loading",!0,{scope:r});try{const t=r==="popover"?te:se,y=window.crypto.randomUUID(),m=new URLSearchParams(window.location.search),R=Number(m.get("page"))||1,g=m.get("q"),w=(e==null?void 0:e.phrase)||g!==null&&g.trim().length>0&&g||"",c=r!=="undefined"?null:m.get("sort"),p=c&&c.trim().length>0?c.split(",").map(o=>{if(o=o.trim(),!o)return null;let n="",f="ASC";if(o.includes(":"))[n,f]=o.split(":");else if(o.includes("_")){const C=o.lastIndexOf("_");n=o.slice(0,C),f=o.slice(C+1).toUpperCase()==="DESC"?"DESC":"ASC"}else n=o;return n==="position"?null:{attribute:n,direction:f}}).filter(Boolean):[],u=r!=="undefined"?null:m.get("filter"),F=u&&u.trim()?decodeURIComponent(u.replace(/\+/g,"%20")).split(/\||;/).reduce((n,f)=>{const C=f.trim();if(!C.includes(":"))return n;const[P,...z]=C.split(":"),h=z.join(":").trim();if(!P||!h)return n;if(P==="price"&&h.includes("-")){const[b,H]=h.split("-"),A=Number(b),D=Number(H);return!Number.isNaN(A)&&!Number.isNaN(D)&&n.push({attribute:"price",range:{from:A,to:D}}),n}if(P==="visibility"){const b=h.indexOf(",");return n.push({attribute:P,in:b===-1?[h.trim()]:["Catalog, Search"]}),n}return n.push({attribute:P,in:h.split(/[|,]/).map(b=>b.trim()).filter(Boolean)}),n},[]):e==null?void 0:e.filter,S=F?[...F]:[],_=Re(r,l);if(_){let o=S.find(f=>f.attribute==="categories");const n={attribute:"categories",in:[_]};o?o=n:S.unshift(n)}const N=w||e.phrase,U=p!=null&&p.length?p:e.sort,E=u!==null||_?S:e.filter;e={...e,phrase:N,sort:U,filter:E,currentPage:R},le(t,y,e.phrase||"",e.filter||[],e.pageSize||0,e.currentPage||0,e.sort||[]),ce(t);const{errors:T,data:$}=await fe(be,{method:"GET",variables:{...e}});if(T&&!$)throw new Error("Error fetching product search");const I=ye($,e);return ue(t,y,I),me(t),v.emit("search/result",{request:e,result:I},{scope:r}),I}catch(t){throw v.emit("search/error",t.message,{scope:r}),v.emit("search/result",s,{scope:r}),t}finally{v.emit("search/loading",!1,{scope:r})}};export{$e as a,De as b,Ue as c,Re as d,Ee as e,fe as f,Ne as g,Ae as r,Fe as s};
//# sourceMappingURL=search.js.map
