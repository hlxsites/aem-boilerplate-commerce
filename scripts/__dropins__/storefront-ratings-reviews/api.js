/*! Copyright 2026 Adobe
All Rights Reserved. */
import{verifyReCaptcha as S}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as k}from"@dropins/tools/fetch-graphql.js";import{merge as A,Initializer as P}from"@dropins/tools/lib.js";import{events as N}from"@dropins/tools/event-bus.js";function E(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function T(e){return{isProductReviewsEnabled:E(e.product_reviews_enabled),allowGuestsToWriteProductReviews:E(e.allow_guests_to_write_product_reviews)}}function g(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function d(e){if(!g(e))throw new Error("Invalid product reviews response.");return e}function M(e,t){var c,s,a;if(!g(e))return null;const r=e;if(typeof r.nickname!="string"||typeof r.summary!="string"||typeof r.text!="string"||typeof r.created_at!="string"||typeof r.average_rating!="number"||!Number.isFinite(r.average_rating)||r.average_rating<0||r.average_rating>100)return null;const o=Array.isArray(r.ratings_breakdown)?r.ratings_breakdown:[];Array.isArray(r.ratings_breakdown)||(t.count+=1);let i=0;o.forEach(u=>{if(!g(u)||typeof u.name!="string"||typeof u.value!="string"){t.count+=1;return}i+=1});const n={nickname:r.nickname,summary:r.summary,text:r.text,createdAt:r.created_at,rating:r.average_rating===0&&i===0?null:r.average_rating/20};return A(n,(a=(s=(c=C.getConfig().models)==null?void 0:c.ProductReviewModel)==null?void 0:s.transformer)==null?void 0:a.call(s,e))}function $(e){const t=d(e),r=i=>typeof i=="number"&&Number.isSafeInteger(i)&&i>=0;if(!r(t.review_count)||!r(t.rating_votes_count)||typeof t.rating_summary!="number"||!Number.isFinite(t.rating_summary)||!Array.isArray(t.ratings_distribution))throw new Error("Invalid product reviews statistics.");const o=t.ratings_distribution.map(i=>{const n=d(i);if(typeof n.value!="number"||!Number.isFinite(n.value)||!r(n.count))throw new Error("Invalid product reviews rating distribution.");return{value:n.value,count:n.count}});return{reviewCount:t.review_count,ratingVotesCount:t.rating_votes_count,ratingSummary:t.rating_summary,ratingsDistribution:o}}function G(e){var y,l,R;const t=d(e);if(!Array.isArray(t.items))throw new Error("Invalid product reviews items.");const r=d(t.page_info),o=r.current_page,i=r.page_size,n=r.total_pages;if(!Number.isSafeInteger(o)||o<1||!Number.isSafeInteger(i)||i<1||!Number.isSafeInteger(n)||n<0||t.items.length>i||t.items.length>0&&o>n)throw new Error("Invalid product reviews page information.");let c=0;const s={count:0},a=t.items.flatMap(I=>{const b=M(I,s);return b?[b]:(c+=1,[])});(c||s.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${c} review(s) skipped, ${s.count} rating breakdown value(s) ignored.`);const u={items:a,pageInfo:{currentPage:o,pageSize:i,totalPages:n},...t.stats===void 0?{}:{stats:t.stats===null?null:$(t.stats)}};return A(u,(R=(l=(y=C.getConfig().models)==null?void 0:y.ProductReviewsModel)==null?void 0:l.transformer)==null?void 0:R.call(l,e))}function F(e){if(!g(e))return null;const t=Number(e.value);return typeof e.value_id!="string"||!e.value_id||typeof e.value!="string"||!Number.isInteger(t)||t<1?null:{valueId:e.value_id,value:t}}function U(e){const t=g(e)?e.items:void 0;if(!Array.isArray(t))throw new Error("Invalid product review ratings metadata response.");return t.flatMap(r=>{if(!g(r)||typeof r.id!="string"||!r.id||typeof r.name!="string"||!Array.isArray(r.values))return[];const o=r.values.map(F).filter(i=>i!==null).sort((i,n)=>i.value-n.value);return o.length?[{id:r.id,name:r.name,values:o}]:[]})}function re(e,t){return e.map(r=>{var o;return{id:r.id,valueId:(o=r.values.find(({value:i})=>i===t[r.id]))==null?void 0:o.valueId}})}function q(e){if(!g(e)||typeof e.nickname!="string"||typeof e.summary!="string"||typeof e.text!="string")throw new Error("Invalid create product review response.");const r=(Array.isArray(e.ratings_breakdown)?e.ratings_breakdown:[]).flatMap(n=>{if(!g(n)||typeof n.name!="string")return[];const c=Number(n.value);return Number.isFinite(c)?[{name:n.name,value:c}]:[]}),o=e.average_rating,i=typeof o=="number"&&Number.isFinite(o)&&o>=0&&o<=100&&(o>0||r.length>0)?o/20:null;return{nickname:e.nickname,summary:e.summary,text:e.text,rating:i,ratingsBreakdown:r}}const m=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},Q=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,z=async()=>v(Q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>{if(e!=null&&e.length)return m(e);if(!(t!=null&&t.storeConfig))throw new Error("Unable to load product reviews store configuration.");return T(t.storeConfig)}),h={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let w;const f=new P({init:async e=>{f.config.setConfig({...h,...e}),w||(w=z().catch(t=>{throw w=void 0,t}));try{const t=await w;f.config.setConfig({...e,...t})}catch(t){f.config.setConfig({...e,...h}),console.error("[Ratings Reviews] Failed to fetch store config:",t)}},listeners:()=>[]});f.config.setConfig(h);const C=f.config,{setEndpoint:ne,setFetchGraphQlHeader:O,removeFetchGraphQlHeader:x,setFetchGraphQlHeaders:ie,fetchGraphQl:v,getConfig:V}=new k().getMethods(),W=N,p=new Map;async function Y(e,t,r,o){const i=`${e}:${r??""}`,n=(p.get(i)??0)+1;p.set(i,n);const c=()=>p.get(i)===n,s=(a,u)=>W.emit(`${e}/${a}`,u,{scope:r});s("request",t),s("error",null),s("loading",!0);try{const a=await o();return c()&&s("result",{request:t,result:a}),a}catch(a){throw c()&&s("error",a.message),a}finally{c()&&s("loading",!1)}}const D=`
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
`,B=async({sku:e,pageSize:t,currentPage:r,withStats:o})=>{const{errors:i,data:n}=await v(D,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:t,currentPage:r,withStats:o}});if(i!=null&&i.length)return m(i);if(!n||!("reviews"in n))throw new Error("Unable to load product reviews.");return n.reviews===null?null:G(n.reviews)};async function oe(e,{pageSize:t=20,currentPage:r=1,scope:o,withStats:i=!1}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(t)||t<1||!Number.isSafeInteger(r)||r<1)throw new Error("Review page size and current page must be positive integers.");const n={sku:e,pageSize:t,currentPage:r,withStats:i};return Y("reviews",n,o,()=>B(n))}const H=`
query RATINGS_METADATA_QUERY {
  productReviewRatingsMetadata {
    items {
      id
      name
      values {
        value_id
        value
      }
    }
  }
}
`,j=async()=>{const{errors:e,data:t}=await v(H,{method:"GET",cache:"force-cache"});if(e!=null&&e.length)return m(e);if(!(t!=null&&t.productReviewRatingsMetadata))throw new Error("Unable to load product review ratings.");return U(t.productReviewRatingsMetadata)},_=new Map,K=()=>{const{endpoint:e,fetchGraphQlHeaders:t}=V(),r=Object.entries(t).filter(([o])=>o.toLowerCase()!=="authorization").sort(([o],[i])=>o.localeCompare(i));return JSON.stringify([e,r])},ae=()=>{const e=K(),t=_.get(e);if(t)return t;const r=j().catch(o=>{throw _.delete(e),o});return _.set(e,r),r};async function L(){const e=()=>x("X-ReCaptcha");e();const t=await S();return t&&O("X-ReCaptcha",t),e}const X=`
mutation CREATE_PRODUCT_REVIEW($input: CreateProductReviewInput!) {
  createProductReview(input: $input) {
    review {
      summary
      text
      nickname
      average_rating
      ratings_breakdown {
        name
        value
      }
    }
  }
}
`,se=async({sku:e,nickname:t,summary:r,text:o,ratings:i})=>{var s;const n={sku:e==null?void 0:e.trim(),nickname:t==null?void 0:t.trim(),summary:r==null?void 0:r.trim(),text:o==null?void 0:o.trim(),ratings:i==null?void 0:i.map(({id:a,valueId:u})=>({id:a,value_id:u}))};if(!n.sku||!n.nickname||!n.summary||!n.text)throw new Error("A SKU, nickname, summary and text are required to create a product review.");if(!Array.isArray(n.ratings)||!n.ratings.length||n.ratings.some(({id:a,value_id:u})=>!a||!u))throw new Error("At least one rating is required to create a product review.");const c=await L();try{const{errors:a,data:u}=await v(X,{method:"POST",variables:{input:n}});if(a!=null&&a.length)return m(a);if(!((s=u==null?void 0:u.createProductReview)!=null&&s.review))throw new Error("Unable to create the product review.");return q(u.createProductReview.review)}finally{c()}};export{C as config,se as createProductReview,W as e,v as fetchGraphQl,V as getConfig,oe as getProductReviews,ae as getRatingsMetadata,z as getStoreConfig,f as initialize,x as removeFetchGraphQlHeader,ne as setEndpoint,O as setFetchGraphQlHeader,ie as setFetchGraphQlHeaders,re as t};
//# sourceMappingURL=api.js.map
