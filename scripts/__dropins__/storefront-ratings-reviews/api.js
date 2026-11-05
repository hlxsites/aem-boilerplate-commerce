/*! Copyright 2026 Adobe
All Rights Reserved. */
import{verifyReCaptcha as C}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as k}from"@dropins/tools/fetch-graphql.js";import{merge as b,Initializer as P}from"@dropins/tools/lib.js";import{events as S}from"@dropins/tools/event-bus.js";function y(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function T(e){return{isProductReviewsEnabled:y(e.product_reviews_enabled),allowGuestsToWriteProductReviews:y(e.allow_guests_to_write_product_reviews)}}function f(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function E(e){if(!f(e))throw new Error("Invalid product reviews response.");return e}function M(e,r){var c,s,a;if(!f(e))return null;const t=e;if(typeof t.nickname!="string"||typeof t.summary!="string"||typeof t.text!="string"||typeof t.created_at!="string"||typeof t.average_rating!="number"||!Number.isFinite(t.average_rating)||t.average_rating<0||t.average_rating>100)return null;const n=Array.isArray(t.ratings_breakdown)?t.ratings_breakdown:[];Array.isArray(t.ratings_breakdown)||(r.count+=1);let i=0;n.forEach(u=>{if(!f(u)||typeof u.name!="string"||typeof u.value!="string"){r.count+=1;return}i+=1});const o={nickname:t.nickname,summary:t.summary,text:t.text,createdAt:t.created_at,rating:t.average_rating===0&&i===0?null:t.average_rating/20};return b(o,(a=(s=(c=A.getConfig().models)==null?void 0:c.ProductReviewModel)==null?void 0:s.transformer)==null?void 0:a.call(s,e))}function N(e){var h,l,_;const r=E(e);if(!Array.isArray(r.items))throw new Error("Invalid product reviews items.");const t=E(r.page_info),n=t.current_page,i=t.page_size,o=t.total_pages;if(!Number.isSafeInteger(n)||n<1||!Number.isSafeInteger(i)||i<1||!Number.isSafeInteger(o)||o<0||r.items.length>i||r.items.length>0&&n>o)throw new Error("Invalid product reviews page information.");let c=0;const s={count:0},a=r.items.flatMap(I=>{const R=M(I,s);return R?[R]:(c+=1,[])});return(c||s.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${c} review(s) skipped, ${s.count} rating breakdown value(s) ignored.`),b({items:a,pageInfo:{currentPage:n,pageSize:i,totalPages:o}},(_=(l=(h=A.getConfig().models)==null?void 0:h.ProductReviewsModel)==null?void 0:l.transformer)==null?void 0:_.call(l,e))}function G(e){if(!f(e))return null;const r=Number(e.value);return typeof e.value_id!="string"||!e.value_id||typeof e.value!="string"||!Number.isInteger(r)||r<1?null:{valueId:e.value_id,value:r}}function U(e){const r=f(e)?e.items:void 0;if(!Array.isArray(r))throw new Error("Invalid product review ratings metadata response.");return r.flatMap(t=>{if(!f(t)||typeof t.id!="string"||!t.id||typeof t.name!="string"||!Array.isArray(t.values))return[];const n=t.values.map(G).filter(i=>i!==null).sort((i,o)=>i.value-o.value);return n.length?[{id:t.id,name:t.name,values:n}]:[]})}function X(e,r){return e.map(t=>{var n;return{id:t.id,valueId:(n=t.values.find(({value:i})=>i===r[t.id]))==null?void 0:n.valueId}})}function $(e){if(!f(e)||typeof e.nickname!="string"||typeof e.summary!="string"||typeof e.text!="string")throw new Error("Invalid create product review response.");const t=(Array.isArray(e.ratings_breakdown)?e.ratings_breakdown:[]).flatMap(o=>{if(!f(o)||typeof o.name!="string")return[];const c=Number(o.value);return Number.isFinite(c)?[{name:o.name,value:c}]:[]}),n=e.average_rating,i=typeof n=="number"&&Number.isFinite(n)&&n>=0&&n<=100&&(n>0||t.length>0)?n/20:null;return{nickname:e.nickname,summary:e.summary,text:e.text,rating:i,ratingsBreakdown:t}}const d=e=>{const r=e.map(t=>t.message).join(" ");throw Error(r)},F=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,q=async()=>m(F,{method:"GET",cache:"force-cache"}).then(({errors:e,data:r})=>{if(e!=null&&e.length)return d(e);if(!(r!=null&&r.storeConfig))throw new Error("Unable to load product reviews store configuration.");return T(r.storeConfig)}),v={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let w;const g=new P({init:async e=>{g.config.setConfig({...v,...e}),w||(w=q().catch(r=>{throw w=void 0,r}));try{const r=await w;g.config.setConfig({...e,...r})}catch(r){g.config.setConfig({...e,...v}),console.error("[Ratings Reviews] Failed to fetch store config:",r)}},listeners:()=>[]});g.config.setConfig(v);const A=g.config,{setEndpoint:J,setFetchGraphQlHeader:Q,removeFetchGraphQlHeader:x,setFetchGraphQlHeaders:Z,fetchGraphQl:m,getConfig:ee}=new k().getMethods(),z=S,p=new Map;async function O(e,r,t,n){const i=`${e}:${t??""}`,o=(p.get(i)??0)+1;p.set(i,o);const c=()=>p.get(i)===o,s=(a,u)=>z.emit(`${e}/${a}`,u,{scope:t});s("request",r),s("error",null),s("loading",!0);try{const a=await n();return c()&&s("result",{request:r,result:a}),a}catch(a){throw c()&&s("error",a.message),a}finally{c()&&s("loading",!1)}}const V=`
query REVIEWS_QUERY($sku: String!, $pageSize: Int, $currentPage: Int) {
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
  }
}
`,W=async({sku:e,pageSize:r,currentPage:t})=>{const{errors:n,data:i}=await m(V,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:r,currentPage:t}});if(n!=null&&n.length)return d(n);if(!i||!("reviews"in i))throw new Error("Unable to load product reviews.");return i.reviews===null?null:N(i.reviews)};async function re(e,{pageSize:r=20,currentPage:t=1,scope:n}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(r)||r<1||!Number.isSafeInteger(t)||t<1)throw new Error("Review page size and current page must be positive integers.");const i={sku:e,pageSize:r,currentPage:t};return O("reviews",i,n,()=>W(i))}const Y=`
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
`,te=async()=>{const{errors:e,data:r}=await m(Y,{method:"GET",cache:"force-cache"});if(e!=null&&e.length)return d(e);if(!(r!=null&&r.productReviewRatingsMetadata))throw new Error("Unable to load product review ratings.");return U(r.productReviewRatingsMetadata)};async function D(){const e=()=>x("X-ReCaptcha");e();const r=await C();return r&&Q("X-ReCaptcha",r),e}const B=`
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
`,ne=async({sku:e,nickname:r,summary:t,text:n,ratings:i})=>{var s;const o={sku:e==null?void 0:e.trim(),nickname:r==null?void 0:r.trim(),summary:t==null?void 0:t.trim(),text:n==null?void 0:n.trim(),ratings:i==null?void 0:i.map(({id:a,valueId:u})=>({id:a,value_id:u}))};if(!o.sku||!o.nickname||!o.summary||!o.text)throw new Error("A SKU, nickname, summary and text are required to create a product review.");if(!Array.isArray(o.ratings)||!o.ratings.length||o.ratings.some(({id:a,value_id:u})=>!a||!u))throw new Error("At least one rating is required to create a product review.");const c=await D();try{const{errors:a,data:u}=await m(B,{method:"POST",variables:{input:o}});if(a!=null&&a.length)return d(a);if(!((s=u==null?void 0:u.createProductReview)!=null&&s.review))throw new Error("Unable to create the product review.");return $(u.createProductReview.review)}finally{c()}};export{A as config,ne as createProductReview,z as e,m as fetchGraphQl,ee as getConfig,re as getProductReviews,te as getRatingsMetadata,q as getStoreConfig,g as initialize,x as removeFetchGraphQlHeader,J as setEndpoint,Q as setFetchGraphQlHeader,Z as setFetchGraphQlHeaders,X as t};
//# sourceMappingURL=api.js.map
