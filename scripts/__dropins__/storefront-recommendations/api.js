/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as k}from"@dropins/tools/event-bus.js";import{RECOMMENDATION_UNIT_FRAGMENT as T}from"./fragments.js";import{Initializer as q,merge as F}from"@dropins/tools/lib.js";import{FetchGraphQL as x}from"@dropins/tools/fetch-graphql.js";const M=new q({init:async t=>{const e={};M.config.setConfig({...e,...t})},listeners:()=>[]}),Q=M.config,{setEndpoint:ce,setFetchGraphQlHeader:ue,removeFetchGraphQlHeader:me,setFetchGraphQlHeaders:ae,fetchGraphQl:w,getConfig:ye}=new x().getMethods(),y=(t,e)=>{if(!t)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const r=t.items||[];return{unitId:t.unitId,unitName:t.unitName,typeId:t.typeId,unitType:t.typeId,totalProducts:t.totalProducts,primaryProducts:r.length,products:r.map((o,u)=>W(o,u)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},W=(t,e=0)=>{var n;return{productId:Number(e),sku:t.sku,name:t.name,url:t.urlKey,visibility:t.visibility,queryType:t.queryType,rank:Number(e),type:t.itemType,score:0,categories:[],weight:0,image:(n=t.images)==null?void 0:n[0]}};function A(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(t,e){const r=A();r.push({[t]:null}),r.push({[t]:e})}function a(t,e,r){A().push(o=>{const u=o.getState?o.getState(e):{};o.push({event:t,eventInfo:{...u,...r}})})}const I="recommendationsContext",Y="recs-unit-impression-render",K="recs-item-add-to-cart-click",z="recs-item-click",j="recs-unit-view",X="recs-api-request-sent",J="recs-api-response-received",le=t=>{const{productId:e,recommendationUnit:r,...n}=t,o=y(r,n);l(I,{units:[o]}),a(K,void 0,{unitId:o.unitId,productId:e})},v=t=>{const e=t.map(r=>r.message).join(" ");throw new Error(e)},Z=`
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
`,D=`
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
`;function B(t,e){var o,u,i,c;if(!t||!((o=t.results)!=null&&o.length))return[];const n=t.results.map(s=>({displayOrder:s.displayOrder??0,pageType:s.pageType,title:s.storefrontLabel??"",items:ee(s.productsView??[]),totalProducts:s.totalProducts??0,typeId:s.typeId??"",unitId:s.unitId??"",unitName:s.unitName??"",userError:s.userError??"",label:s.label??void 0}));return F(n,(c=(i=(u=Q.getConfig().models)==null?void 0:u.RecommendationUnitModel)==null?void 0:i.transformer)==null?void 0:c.call(i,t))}function ee(t){return t!=null&&t.length?t.map(e=>{var n,o,u,i,c,s,m,E,R,h,d,p,f,_,S,N,U,g,$,C,P,H,O,b;const r=(n=e.images)==null?void 0:n[0];return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:(r==null?void 0:r.label)||e.name||"",roles:(o=r==null?void 0:r.roles)!=null&&o.length?r.roles:["thumbnail"],url:((r==null?void 0:r.url)??"").replace("http://","//")}],price:{final:{amount:{value:(c=(i=(u=e.price)==null?void 0:u.final)==null?void 0:i.amount)==null?void 0:c.value,currency:(E=(m=(s=e.price)==null?void 0:s.final)==null?void 0:m.amount)==null?void 0:E.currency}}},priceRange:{minimum:{final:{amount:{value:(p=(d=(h=(R=e.priceRange)==null?void 0:R.minimum)==null?void 0:h.final)==null?void 0:d.amount)==null?void 0:p.value,currency:(N=(S=(_=(f=e.priceRange)==null?void 0:f.minimum)==null?void 0:_.final)==null?void 0:S.amount)==null?void 0:N.currency}}},maximum:{final:{amount:{value:(C=($=(g=(U=e.priceRange)==null?void 0:U.maximum)==null?void 0:g.final)==null?void 0:$.amount)==null?void 0:C.value,currency:(b=(O=(H=(P=e.priceRange)==null?void 0:P.maximum)==null?void 0:H.final)==null?void 0:O.amount)==null?void 0:b.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}const Ie=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(Y,void 0,{unitId:n.unitId})},Te=t=>{const{recommendationUnit:e,productId:r,...n}=t,o=y(e,n);l(I,{units:[o]}),a(z,void 0,{unitId:o.unitId,productId:r})},Ee=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(j,void 0,{unitId:n.unitId})},G=()=>{a(X)},V=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(J)},Re=async t=>{G();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return w(n?D:Z,{method:"GET",variables:n?t:r}).then(({errors:i,data:c})=>{if(i&&i.length>0)return v(i);const s=B(c==null?void 0:c.recommendationsByUnitIds);return s&&s.length>0&&s.forEach(m=>{V({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),k.emit("recommendations/data",s),s})},L=`
  fragment RECOMMENDATION_UNIT_WITH_LABEL_FRAGMENT on RecommendationUnit {
    ...RECOMMENDATION_UNIT_FRAGMENT
    label
  }

  ${T}
`,te=`
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

  ${L}
`,re=`
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

  ${L}
`,he=async t=>{G();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return w(n?re:te,{method:"GET",variables:n?t:r}).then(({errors:i,data:c})=>{if(i&&i.length>0)return v(i);const s=B(c==null?void 0:c.recommendationsByUnits);return s&&s.length>0&&s.forEach(m=>{V({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),k.emit("recommendations/data",s),s})};export{Ee as a,Te as b,Q as config,w as fetchGraphQl,ye as getConfig,Re as getRecommendationsByUnitIds,he as getRecommendationsByUnits,M as initialize,Ie as p,le as publishRecsItemAddToCartClick,me as removeFetchGraphQlHeader,ce as setEndpoint,ue as setFetchGraphQlHeader,ae as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
