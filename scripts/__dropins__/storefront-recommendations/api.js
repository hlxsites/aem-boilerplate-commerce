/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as w}from"@dropins/tools/event-bus.js";import{RECOMMENDATION_UNIT_FRAGMENT as f}from"./fragments.js";import{Initializer as F,merge as x}from"@dropins/tools/lib.js";import{FetchGraphQL as Q}from"@dropins/tools/fetch-graphql.js";const M=new F({init:async t=>{const e={};M.config.setConfig({...e,...t})},listeners:()=>[]}),W=M.config,{setEndpoint:me,setFetchGraphQlHeader:ae,removeFetchGraphQlHeader:ye,setFetchGraphQlHeaders:le,fetchGraphQl:v,getConfig:Ie}=new Q().getMethods(),y=(t,e)=>{if(!t)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const r=t.items||[];return{unitId:t.unitId,unitName:t.unitName,typeId:t.typeId,unitType:t.typeId,totalProducts:t.totalProducts,primaryProducts:r.length,products:r.map((s,i)=>Y(s,i)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},Y=(t,e=0)=>{var n;return{productId:Number(e),sku:t.sku,name:t.name,url:t.urlKey,visibility:t.visibility,queryType:t.queryType,rank:Number(e),type:t.itemType,score:0,categories:[],weight:0,image:(n=t.images)==null?void 0:n[0]}};function A(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function l(t,e){const r=A();r.push({[t]:null}),r.push({[t]:e})}function a(t,e,r){A().push(s=>{const i=s.getState?s.getState(e):{};s.push({event:t,eventInfo:{...i,...r}})})}const I="recommendationsContext",K="recs-unit-impression-render",z="recs-item-add-to-cart-click",j="recs-item-click",J="recs-unit-view",X="recs-api-request-sent",Z="recs-api-response-received",fe=t=>{const{productId:e,recommendationUnit:r,...n}=t,s=y(r,n);l(I,{units:[s]}),a(z,void 0,{unitId:s.unitId,productId:e})},B=t=>{const e=t.map(r=>r.message).join(" ");throw new Error(e)},D=`
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

  ${f}
`,ee=`
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

  ${f}
`;function G(t,e){var s,i,c,u;if(!t||!((s=t.results)!=null&&s.length))return[];const n=t.results.map(o=>({displayOrder:o.displayOrder??0,pageType:o.pageType,title:o.storefrontLabel??"",items:te(o.productsView??[]),totalProducts:o.totalProducts??0,typeId:o.typeId??"",unitId:o.unitId??"",unitName:o.unitName??"",userError:o.userError??"",label:o.label??void 0}));return x(n,(u=(c=(i=W.getConfig().models)==null?void 0:i.RecommendationUnitModel)==null?void 0:c.transformer)==null?void 0:u.call(c,t))}function te(t){return t!=null&&t.length?t.map(e=>{var n,s,i,c,u,o,m,T,E,d,R,h,_,p,N,S,g,U,C,$,P,b,O,H;const r=(n=e.images)==null?void 0:n[0];return{itemType:e.__typename??"",...e.attributes!=null?{attributes:e.attributes}:{},...re(e.attributes),uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:(r==null?void 0:r.label)||e.name||"",roles:(s=r==null?void 0:r.roles)!=null&&s.length?r.roles:["thumbnail"],url:((r==null?void 0:r.url)??"").replace("http://","//")}],price:{final:{amount:{value:(u=(c=(i=e.price)==null?void 0:i.final)==null?void 0:c.amount)==null?void 0:u.value,currency:(T=(m=(o=e.price)==null?void 0:o.final)==null?void 0:m.amount)==null?void 0:T.currency}}},priceRange:{minimum:{final:{amount:{value:(h=(R=(d=(E=e.priceRange)==null?void 0:E.minimum)==null?void 0:d.final)==null?void 0:R.amount)==null?void 0:h.value,currency:(S=(N=(p=(_=e.priceRange)==null?void 0:_.minimum)==null?void 0:p.final)==null?void 0:N.amount)==null?void 0:S.currency}}},maximum:{final:{amount:{value:($=(C=(U=(g=e.priceRange)==null?void 0:g.maximum)==null?void 0:U.final)==null?void 0:C.amount)==null?void 0:$.value,currency:(H=(O=(b=(P=e.priceRange)==null?void 0:P.maximum)==null?void 0:b.final)==null?void 0:O.amount)==null?void 0:H.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}function k(t){let e=t;if(typeof e=="string")try{e=JSON.parse(e)}catch(n){if(!(n instanceof SyntaxError))throw n}const r=Array.isArray(e)&&e.length===1?e[0]:e;if(typeof r=="number")return Number.isFinite(r)?r:void 0;if(typeof r=="string"&&r.trim()!==""){const n=Number(r);return Number.isFinite(n)?n:void 0}}function re(t){const e=t==null?void 0:t.find(({name:i})=>i==="ac_rating_summary"),r=t==null?void 0:t.find(({name:i})=>i==="ac_review_count");if(!e||!r)return null;const n=k(e.value),s=k(r.value);return n===void 0||n<0||n>100||s===void 0||!Number.isSafeInteger(s)||s<0?(console.warn("[transformRecommendations] Invalid review summary attributes."),null):s===0?null:{rating:n/20,reviewCount:s}}const Te=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(K,void 0,{unitId:n.unitId})},Ee=t=>{const{recommendationUnit:e,productId:r,...n}=t,s=y(e,n);l(I,{units:[s]}),a(j,void 0,{unitId:s.unitId,productId:r})},de=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(J,void 0,{unitId:n.unitId})},V=()=>{a(X)},L=t=>{const{recommendationUnit:e,...r}=t,n=y(e,r);l(I,{units:[n]}),a(Z)},Re=async t=>{V();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return v(n?ee:D,{method:"GET",variables:n?t:r}).then(({errors:c,data:u})=>{if(c&&c.length>0)return B(c);const o=G(u==null?void 0:u.recommendationsByUnitIds);return o&&o.length>0&&o.forEach(m=>{L({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),w.emit("recommendations/data",o),o})},q=`
  fragment RECOMMENDATION_UNIT_WITH_LABEL_FRAGMENT on RecommendationUnit {
    ...RECOMMENDATION_UNIT_FRAGMENT
    label
  }

  ${f}
`,ne=`
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

  ${q}
`,se=`
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

  ${q}
`,he=async t=>{V();const{currentProduct:e,...r}=t,n=(e==null?void 0:e.price)!=null;return v(n?se:ne,{method:"GET",variables:n?t:r}).then(({errors:c,data:u})=>{if(c&&c.length>0)return B(c);const o=G(u==null?void 0:u.recommendationsByUnits);return o&&o.length>0&&o.forEach(m=>{L({recommendationUnit:m,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),w.emit("recommendations/data",o),o})};export{de as a,Ee as b,W as config,v as fetchGraphQl,Ie as getConfig,Re as getRecommendationsByUnitIds,he as getRecommendationsByUnits,M as initialize,Te as p,fe as publishRecsItemAddToCartClick,ye as removeFetchGraphQlHeader,me as setEndpoint,ae as setFetchGraphQlHeader,le as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
