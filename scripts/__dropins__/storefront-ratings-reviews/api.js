/*! Copyright 2026 Adobe
All Rights Reserved. */
import{FetchGraphQL as C}from"@dropins/tools/fetch-graphql.js";import{merge as b,Initializer as k}from"@dropins/tools/lib.js";import{events as $}from"@dropins/tools/event-bus.js";function y(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function A(e){return{isProductReviewsEnabled:y(e.product_reviews_enabled),allowGuestsToWriteProductReviews:y(e.allow_guests_to_write_product_reviews)}}function d(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function w(e){if(!d(e))throw new Error("Invalid product reviews response.");return e}function F(e,t){var c,o,a;if(!d(e))return null;const r=e;if(typeof r.nickname!="string"||typeof r.summary!="string"||typeof r.text!="string"||typeof r.created_at!="string"||typeof r.average_rating!="number"||!Number.isFinite(r.average_rating)||r.average_rating<0||r.average_rating>100)return null;const s=Array.isArray(r.ratings_breakdown)?r.ratings_breakdown:[];Array.isArray(r.ratings_breakdown)||(t.count+=1);let n=0;s.forEach(u=>{if(!d(u)||typeof u.name!="string"||typeof u.value!="string"){t.count+=1;return}n+=1});const i={nickname:r.nickname,summary:r.summary,text:r.text,createdAt:r.created_at,rating:r.average_rating===0&&n===0?null:r.average_rating/20};return b(i,(a=(o=(c=R.getConfig().models)==null?void 0:c.ProductReviewModel)==null?void 0:o.transformer)==null?void 0:a.call(o,e))}function G(e){const t=w(e),r=n=>typeof n=="number"&&Number.isSafeInteger(n)&&n>=0;if(!r(t.review_count)||!r(t.rating_votes_count)||typeof t.rating_summary!="number"||!Number.isFinite(t.rating_summary)||!Array.isArray(t.ratings_distribution))throw new Error("Invalid product reviews statistics.");const s=t.ratings_distribution.map(n=>{const i=w(n);if(typeof i.value!="number"||!Number.isFinite(i.value)||!r(i.count))throw new Error("Invalid product reviews rating distribution.");return{value:i.value,count:i.count}});return{reviewCount:t.review_count,ratingVotesCount:t.rating_votes_count,ratingSummary:t.rating_summary,ratingsDistribution:s}}function N(e){var p,f,_;const t=w(e);if(!Array.isArray(t.items))throw new Error("Invalid product reviews items.");const r=w(t.page_info),s=r.current_page,n=r.page_size,i=r.total_pages;if(!Number.isSafeInteger(s)||s<1||!Number.isSafeInteger(n)||n<1||!Number.isSafeInteger(i)||i<0||t.items.length>n||t.items.length>0&&s>i)throw new Error("Invalid product reviews page information.");let c=0;const o={count:0},a=t.items.flatMap(S=>{const h=F(S,o);return h?[h]:(c+=1,[])});(c||o.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${c} review(s) skipped, ${o.count} rating breakdown value(s) ignored.`);const u={items:a,pageInfo:{currentPage:s,pageSize:n,totalPages:i},...t.stats===void 0?{}:{stats:t.stats===null?null:G(t.stats)}};return b(u,(_=(f=(p=R.getConfig().models)==null?void 0:p.ProductReviewsModel)==null?void 0:f.transformer)==null?void 0:_.call(f,e))}const E=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},P=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,Q=async()=>I(P,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>{if(e!=null&&e.length)return E(e);if(!(t!=null&&t.storeConfig))throw new Error("Unable to load product reviews store configuration.");return A(t.storeConfig)}),v={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let l;const g=new k({init:async e=>{g.config.setConfig({...v,...e}),l||(l=Q().catch(t=>{throw l=void 0,t}));try{const t=await l;g.config.setConfig({...e,...t})}catch(t){g.config.setConfig({...e,...v}),console.error("[Ratings Reviews] Failed to fetch store config:",t)}},listeners:()=>[]});g.config.setConfig(v);const R=g.config,{setEndpoint:W,setFetchGraphQlHeader:Y,removeFetchGraphQlHeader:B,setFetchGraphQlHeaders:H,fetchGraphQl:I,getConfig:V}=new C().getMethods(),q=$,m=new Map;async function z(e,t,r,s){const n=`${e}:${r??""}`,i=(m.get(n)??0)+1;m.set(n,i);const c=()=>m.get(n)===i,o=(a,u)=>q.emit(`${e}/${a}`,u,{scope:r});o("request",t),o("error",null),o("loading",!0);try{const a=await s();return c()&&o("result",{request:t,result:a}),a}catch(a){throw c()&&o("error",a.message),a}finally{c()&&o("loading",!1)}}const U=`
query REVIEWS_QUERY($sku: String!, $pageSize: Int, $currentPage: Int, $withStats: Boolean! = false) {
  reviews(sku: $sku, pageSize: $pageSize, currentPage: $currentPage) {
    items {
      nickname
      summary
      text
      average_rating
      created_at
      ratings_breakdown { name value }
    }
    page_info { current_page page_size total_pages }
    stats @include(if: $withStats) {
      review_count
      rating_votes_count
      rating_summary
      ratings_distribution { value count }
    }
  }
}
`,M=async({sku:e,pageSize:t,currentPage:r,withStats:s})=>{const{errors:n,data:i}=await I(U,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:t,currentPage:r,withStats:s}});if(n!=null&&n.length)return E(n);if(!i||!("reviews"in i))throw new Error("Unable to load product reviews.");return i.reviews===null?null:N(i.reviews)};async function j(e,{pageSize:t=20,currentPage:r=1,scope:s,withStats:n=!1}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(t)||t<1||!Number.isSafeInteger(r)||r<1)throw new Error("Review page size and current page must be positive integers.");const i={sku:e,pageSize:t,currentPage:r,withStats:n};return z("reviews",i,s,()=>M(i))}export{R as config,q as e,I as fetchGraphQl,V as getConfig,j as getProductReviews,Q as getStoreConfig,g as initialize,B as removeFetchGraphQlHeader,W as setEndpoint,Y as setFetchGraphQlHeader,H as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
