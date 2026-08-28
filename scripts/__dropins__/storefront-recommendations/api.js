/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as k}from"@dropins/tools/event-bus.js";import{RECOMMENDATION_UNIT_FRAGMENT as T}from"./fragments.js";import{Initializer as L,merge as q}from"@dropins/tools/lib.js";import{FetchGraphQL as F}from"@dropins/tools/fetch-graphql.js";const b=new L({init:async t=>{const e={};b.config.setConfig({...e,...t})},listeners:()=>[]}),x=b.config,{setEndpoint:ie,setFetchGraphQlHeader:ce,removeFetchGraphQlHeader:ue,setFetchGraphQlHeaders:me,fetchGraphQl:M,getConfig:ae}=new F().getMethods(),y=(t,e)=>{if(!t)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const r=t.items||[];return{unitId:t.unitId,unitName:t.unitName,typeId:t.typeId,unitType:t.typeId,totalProducts:t.totalProducts,primaryProducts:r.length,products:r.map((o,u)=>Q(o,u)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},Q=(t,e=0)=>{var n;return{productId:Number(e),sku:t.sku,name:t.name,url:t.urlKey,visibility:t.visibility,queryType:t.queryType,rank:Number(e),type:t.itemType,score:0,categories:[],weight:0,image:(n=t.images)==null?void 0:n[0]}};function w(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(t,e){const r=w();r.push({[t]:null}),r.push({[t]:e})}function a(t,e,r){w().push(o=>{const u=o.getState?o.getState(e):{};o.push({event:t,eventInfo:{...u,...r}})})}const I="recommendationsContext",W="recs-unit-impression-render",Y="recs-item-add-to-cart-click",K="recs-item-click",z="recs-unit-view",j="recs-api-request-sent",X="recs-api-response-received",ye=t=>{const{productId:e,recommendationUnit:r,...n}=t,o=y(r,n);l(I,{units:[o]}),a(Y,void 0,{unitId:o.unitId,productId:e})},A=t=>{const e=t.map(r=>r.message).join(" ");throw new Error(e)},J=`
  query GetRecommendationsByUnitIds(
    $unitIds: [String!]!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendationsByUnitIds(
      unitIds: $unitIds
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        ...RECOMMENDATION_UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${T}
`,Z=`
  query GetRecommendationsByUnitIdsWithCurrentProduct(
    $unitIds: [String!]!
    $currentSku: String!
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
    $currentProduct: CurrentProductInput
  ) {
    recommendationsByUnitIds(
      unitIds: $unitIds
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
      currentProduct: $currentProduct
    ) {
      results {
        ...RECOMMENDATION_UNIT_FRAGMENT
      }
      totalResults
    }
  }

  ${T}
`;function v(t,e){var o,u,i,c;if(!t||!((o=t.results)!=null&&o.length))return[];const n=t.results.map(s=>({displayOrder:s.displayOrder??0,pageType:s.pageType,title:s.storefrontLabel??"",items:D(s.productsView??[]),totalProducts:s.totalProducts??0,typeId:s.typeId??"",unitId:s.unitId??"",unitName:s.unitName??"",userError:s.userError??"",label:s.label??void 0}));return q(n,(c=(i=(u=x.getConfig().models)==null?void 0:u.RecommendationUnitModel)==null?void 0:i.transformer)==null?void 0:c.call(i,t))}function D(t){return t!=null&&t.length?t.map(e=>{var r,n,o,u,i,c,s,m,E,R,d,h,p,f,_,S,N,U,g,$,C,P,H,O;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((n=(r=e.images)==null?void 0:r[0])==null?void 0:n.url)??"").replace("http://","//")}],price:{final:{amount:{value:(i=(u=(o=e.price)==null?void 0:o.final)==null?void 0:u.amount)==null?void 0:i.value,currency:(m=(s=(c=e.price)==null?void 0:c.final)==null?void 0:s.amount)==null?void 0:m.currency}}},priceRange:{minimum:{final:{amount:{value:(h=(d=(R=(E=e.priceRange)==null?void 0:E.minimum)==null?void 0:R.final)==null?void 0:d.amount)==null?void 0:h.value,currency:(S=(_=(f=(p=e.priceRange)==null?void 0:p.minimum)==null?void 0:f.final)==null?void 0:_.amount)==null?void 0:S.currency}}},maximum:{final:{amount:{value:($=(g=(U=(N=e.priceRange)==null?void 0:N.maximum)==null?void 0:U.final)==null?void 0:g.amount)==null?void 0:$.value,currency:(O=(H=(P=(C=e.priceRange)==null?void 0:C.maximum)==null?void 0:P.final)==null?void 0:H.amount)==null?void 0:O.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}const le=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(W,void 0,{unitId:n.unitId})},Ie=t=>{const{recommendationUnit:e,productId:r,...n}=t,o=y(e,n);l(I,{units:[o]}),a(K,void 0,{unitId:o.unitId,productId:r})},Te=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(z,void 0,{unitId:n.unitId})},B=()=>{a(j)},G=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(X)},Ee=async t=>{B();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return M(n?Z:J,{method:"GET",variables:n?t:r}).then(({errors:i,data:c})=>{if(i&&i.length>0)return A(i);const s=v(c==null?void 0:c.recommendationsByUnitIds);return s&&s.length>0&&s.forEach(m=>{G({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),k.emit("recommendations/data",s),s})},V=`
  fragment RECOMMENDATION_UNIT_WITH_LABEL_FRAGMENT on RecommendationUnit {
    ...RECOMMENDATION_UNIT_FRAGMENT
    label
  }

  ${T}
`,ee=`
  query GetRecommendationsByUnits(
    $selector: UnitSelector!
    $currentSku: String
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
  ) {
    recommendationsByUnits(
      selector: $selector
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
    ) {
      results {
        ...RECOMMENDATION_UNIT_WITH_LABEL_FRAGMENT
      }
      totalResults
    }
  }

  ${V}
`,te=`
  query GetRecommendationsByUnitsWithCurrentProduct(
    $selector: UnitSelector!
    $currentSku: String
    $cartSkus: [String]
    $userPurchaseHistory: [PurchaseHistory]
    $userViewHistory: [ViewHistory]
    $currentProduct: CurrentProductInput
  ) {
    recommendationsByUnits(
      selector: $selector
      cartSkus: $cartSkus
      currentSku: $currentSku
      userPurchaseHistory: $userPurchaseHistory
      userViewHistory: $userViewHistory
      currentProduct: $currentProduct
    ) {
      results {
        ...RECOMMENDATION_UNIT_WITH_LABEL_FRAGMENT
      }
      totalResults
    }
  }

  ${V}
`,Re=async t=>{B();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return M(n?te:ee,{method:"GET",variables:n?t:r}).then(({errors:i,data:c})=>{if(i&&i.length>0)return A(i);const s=v(c==null?void 0:c.recommendationsByUnits);return s&&s.length>0&&s.forEach(m=>{G({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),k.emit("recommendations/data",s),s})};export{Te as a,Ie as b,x as config,M as fetchGraphQl,ae as getConfig,Ee as getRecommendationsByUnitIds,Re as getRecommendationsByUnits,b as initialize,le as p,ye as publishRecsItemAddToCartClick,ue as removeFetchGraphQlHeader,ie as setEndpoint,ce as setFetchGraphQlHeader,me as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
