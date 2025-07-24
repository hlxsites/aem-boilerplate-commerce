/*! Copyright 2025 Adobe
All Rights Reserved. */
import{UNIT_FRAGMENT as O}from"../fragments.js";import{events as $}from"@dropins/tools/event-bus.js";import{merge as L}from"@dropins/tools/lib.js";import{c as H}from"./initialize.js";import{FetchGraphQL as M}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:ee,setFetchGraphQlHeader:ne,removeFetchGraphQlHeader:te,setFetchGraphQlHeaders:se,fetchGraphQl:d,getConfig:re}=new M().getMethods(),A=n=>{const e=n.map(t=>t.message).join(" ");throw new Error(e)},G=`
  query GetRecommendations(
    $pageType: PageType!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendations(
      cartSkus: $cartSkus
      currentSku: $currentSku
      pageType: $pageType
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        ...UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${O}
`;function x(n,e){var o,i,m,c;if(!n||!((o=n.results)!=null&&o.length))return[];const t=e?n.results.filter(r=>r.unitId===e):n.results;e&&t.length===0&&console.warn(`ProductList: recId "${e}" does not match any recommendation units. Available unitIds: ${n.results.map(r=>r.unitId).join(", ")}`);const s=t.map(r=>({displayOrder:r.displayOrder??0,pageType:r.pageType,title:r.storefrontLabel??"",items:V(r.productsView??[]),totalProducts:r.totalProducts??0,typeId:r.typeId??"",unitId:r.unitId??"",unitName:r.unitName??""}));return L(s,(c=(m=(i=H.getConfig().models)==null?void 0:i.RecommendationUnitModel)==null?void 0:m.transformer)==null?void 0:c.call(m,n))}function V(n){return n!=null&&n.length?n.map(e=>{var t,s,o,i,m,c,r,p,f,h,g,R,T,E,I,b,C,S,_,P,U,v,N,k;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((s=(t=e.images)==null?void 0:t[0])==null?void 0:s.url)??"").replace("http://","//")}],price:{final:{amount:{value:((m=(i=(o=e.price)==null?void 0:o.final)==null?void 0:i.amount)==null?void 0:m.value)??null,currency:((p=(r=(c=e.price)==null?void 0:c.final)==null?void 0:r.amount)==null?void 0:p.currency)??null}}},priceRange:{minimum:{final:{amount:{value:((R=(g=(h=(f=e.priceRange)==null?void 0:f.minimum)==null?void 0:h.final)==null?void 0:g.amount)==null?void 0:R.value)??null,currency:((b=(I=(E=(T=e.priceRange)==null?void 0:T.minimum)==null?void 0:E.final)==null?void 0:I.amount)==null?void 0:b.currency)??null}}},maximum:{final:{amount:{value:((P=(_=(S=(C=e.priceRange)==null?void 0:C.maximum)==null?void 0:S.final)==null?void 0:_.amount)==null?void 0:P.value)??null,currency:((k=(N=(v=(U=e.priceRange)==null?void 0:U.maximum)==null?void 0:v.final)==null?void 0:N.amount)==null?void 0:k.currency)??null}}}},visibility:e.visibility??"",queryType:e.queryType??""}}):[]}const l=(n,e)=>({unitId:n.unitId,unitName:n.unitName,typeId:n.typeId,unitType:n.typeId,totalProducts:n.totalProducts,primaryProducts:n.items.length,products:n.items.map(q),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}),q=(n,e)=>{var s;return{productId:Number(e),sku:n.sku,name:n.name,url:n.urlKey,visibility:n.visibility,queryType:n.queryType,rank:Number(e),type:n.itemType,score:0,categories:[],weight:0,image:(s=n.images)==null?void 0:s[0]}};function w(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function a(n,e){const t=w();t.push({[n]:null}),t.push({[n]:e})}function u(n,e,t){w().push(o=>{const i=o.getState?o.getState(e):{};o.push({event:n,eventInfo:{...i,...t}})})}const y="recommendationsContext",F="recs-unit-impression-render",oe="recs-item-add-to-cart-click",Q="recs-item-click",K="recs-unit-view",j="recs-api-request-sent",B="recs-api-response-received",ie=n=>{const{recommendationUnit:e,...t}=n,s=l(e,t);a(y,{units:[s]}),u(F)},me=n=>{const{recommendationUnit:e,productId:t,...s}=n,o=l(e,s);a(y,{units:[o]}),u(Q,void 0,{unitId:o.unitId,productId:t})},ce=n=>{const{recommendationUnit:e,...t}=n,s=l(e,t);a(y,{units:[s]}),u(K)},W=()=>{u(j)},X=n=>{const{recommendationUnit:e,...t}=n,s=l(e,t);a(y,{units:[s]}),u(B)},ue=async n=>(W(),d(G,{method:"GET",variables:n}).then(({errors:e,data:t})=>{if(e&&e.length>0)return A(e);const s=x(t==null?void 0:t.recommendations,n.recId);return s&&s.length>0&&s.forEach(o=>{X({recommendationUnit:o,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),$.emit("recommendations/data",s),s}));export{y as R,ce as a,me as b,u as c,oe as d,ee as e,ne as f,ue as g,se as h,d as i,re as j,ie as p,te as r,a as s,l as t};
//# sourceMappingURL=getRecommendations.js.map
