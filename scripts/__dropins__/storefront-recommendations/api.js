/*! Copyright 2026 Adobe
All Rights Reserved. */
import{events as M}from"@dropins/tools/event-bus.js";import{Initializer as $,merge as A}from"@dropins/tools/lib.js";import{FetchGraphQL as H}from"@dropins/tools/fetch-graphql.js";const k=new $({init:async n=>{const e={};k.config.setConfig({...e,...n})},listeners:()=>[]}),V=k.config,{setEndpoint:re,setFetchGraphQlHeader:se,removeFetchGraphQlHeader:ie,setFetchGraphQlHeaders:oe,fetchGraphQl:G,getConfig:ce}=new H().getMethods(),a=(n,e)=>{if(!n)throw console.error("transformRecommendationUnit: unitData is null or undefined"),new Error("Recommendation unit data is required but was not provided");const t=n.items||[];return{unitId:n.unitId,unitName:n.unitName,typeId:n.typeId,unitType:n.typeId,totalProducts:n.totalProducts,primaryProducts:t.length,products:t.map((s,c)=>q(s,c)),searchTime:(e==null?void 0:e.searchTime)||0,backupProducts:(e==null?void 0:e.backupProducts)||0,pagePlacement:(e==null?void 0:e.pagePlacement)||"",yOffsetTop:(e==null?void 0:e.yOffsetTop)||null,yOffsetBottom:(e==null?void 0:e.yOffsetBottom)||null}},q=(n,e=0)=>{var r;return{productId:Number(e),sku:n.sku,name:n.name,url:n.urlKey,visibility:n.visibility,queryType:n.queryType,rank:Number(e),type:n.itemType,score:0,categories:[],weight:0,image:(r=n.images)==null?void 0:r[0]}};function w(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function y(n,e){const t=w();t.push({[n]:null}),t.push({[n]:e})}function m(n,e,t){w().push(s=>{const c=s.getState?s.getState(e):{};s.push({event:n,eventInfo:{...c,...t}})})}const l="recommendationsContext",x="recs-unit-impression-render",F="recs-item-add-to-cart-click",L="recs-item-click",B="recs-unit-view",Q="recs-api-request-sent",K="recs-api-response-received",ue=n=>{const{productId:e,recommendationUnit:t,...r}=n,s=a(t,r);y(l,{units:[s]}),m(F,void 0,{unitId:s.unitId,productId:e})},W=n=>{const e=n.map(t=>t.message).join(" ");throw new Error(e)},Y=`
  fragment PRODUCTS_VIEW_FRAGMENT on ProductView {
    __typename
    name
    sku
    queryType
    visibility
    inStock
    images {
      url
    }
    urlKey
    ... on SimpleProductView {
      price {
        final {
          amount {
            currency
            value
          }
        }
      }
    }
    ... on ComplexProductView {
      priceRange {
        maximum {
          final {
            amount {
              currency
              value
            }
          }
        }
        minimum {
          final {
            amount {
              currency
              value
            }
          }
        }
      }
    }
  }
`,v=`
  fragment RECOMMENDATION_UNIT_FRAGMENT on RecommendationUnit {
    displayOrder
    productsView {
      ...PRODUCTS_VIEW_FRAGMENT
    }
    storefrontLabel
    totalProducts
    typeId
    unitId
    unitName
    userError
  }

  ${Y}
`,z=`
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

  ${v}
`,j=`
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

  ${v}
`;function X(n,e){var s,c,o,u;if(!n||!((s=n.results)!=null&&s.length))return[];const r=n.results.map(i=>({displayOrder:i.displayOrder??0,pageType:i.pageType,title:i.storefrontLabel??"",items:J(i.productsView??[]),totalProducts:i.totalProducts??0,typeId:i.typeId??"",unitId:i.unitId??"",unitName:i.unitName??"",userError:i.userError??""}));return A(r,(u=(o=(c=V.getConfig().models)==null?void 0:c.RecommendationUnitModel)==null?void 0:o.transformer)==null?void 0:u.call(o,n))}function J(n){return n!=null&&n.length?n.map(e=>{var t,r,s,c,o,u,i,I,p,d,f,R,T,E,h,g,_,S,C,N,U,P,b,O;return{itemType:e.__typename??"",uid:e.sku,sku:e.sku,name:e.name??"",urlKey:e.urlKey??"",images:[{label:e.name??"",roles:["thumbnail"],url:(((r=(t=e.images)==null?void 0:t[0])==null?void 0:r.url)??"").replace("http://","//")}],price:{final:{amount:{value:(o=(c=(s=e.price)==null?void 0:s.final)==null?void 0:c.amount)==null?void 0:o.value,currency:(I=(i=(u=e.price)==null?void 0:u.final)==null?void 0:i.amount)==null?void 0:I.currency}}},priceRange:{minimum:{final:{amount:{value:(R=(f=(d=(p=e.priceRange)==null?void 0:p.minimum)==null?void 0:d.final)==null?void 0:f.amount)==null?void 0:R.value,currency:(g=(h=(E=(T=e.priceRange)==null?void 0:T.minimum)==null?void 0:E.final)==null?void 0:h.amount)==null?void 0:g.currency}}},maximum:{final:{amount:{value:(N=(C=(S=(_=e.priceRange)==null?void 0:_.maximum)==null?void 0:S.final)==null?void 0:C.amount)==null?void 0:N.value,currency:(O=(b=(P=(U=e.priceRange)==null?void 0:U.maximum)==null?void 0:P.final)==null?void 0:b.amount)==null?void 0:O.currency}}}},visibility:e.visibility??"",queryType:e.queryType??"",inStock:e.inStock??!0}}):[]}const me=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(x,void 0,{unitId:r.unitId})},ae=n=>{const{recommendationUnit:e,productId:t,...r}=n,s=a(e,r);y(l,{units:[s]}),m(L,void 0,{unitId:s.unitId,productId:t})},ye=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(B,void 0,{unitId:r.unitId})},Z=()=>{m(Q)},D=n=>{const{recommendationUnit:e,...t}=n,r=a(e,t);y(l,{units:[r]}),m(K)},le=async n=>{Z();const{currentProduct:e,...t}=n,r=(e==null?void 0:e.price)!=null;return G(r?j:z,{method:"GET",variables:r?n:t}).then(({errors:o,data:u})=>{if(o&&o.length>0)return W(o);const i=X(u==null?void 0:u.recommendationsByUnitIds);return i&&i.length>0&&i.forEach(I=>{D({recommendationUnit:I,pagePlacement:"api-response",yOffsetTop:0,yOffsetBottom:0,backupProducts:0,searchTime:0})}),M.emit("recommendations/data",i),i})};export{Y as P,v as R,ye as a,ae as b,V as config,G as fetchGraphQl,ce as getConfig,le as getRecommendationsByUnitIds,k as initialize,me as p,ue as publishRecsItemAddToCartClick,ie as removeFetchGraphQlHeader,re as setEndpoint,se as setFetchGraphQlHeader,oe as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
