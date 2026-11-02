/*! Copyright 2026 Adobe
All Rights Reserved. */
import{verifyReCaptcha as P}from"@dropins/tools/recaptcha.js";import{FetchGraphQL as S}from"@dropins/tools/fetch-graphql.js";import{merge as I,Initializer as T}from"@dropins/tools/lib.js";import{events as $}from"@dropins/tools/event-bus.js";function E(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function M(e){return{isProductReviewsEnabled:E(e.product_reviews_enabled),allowGuestsToWriteProductReviews:E(e.allow_guests_to_write_product_reviews)}}function p(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function b(e){if(!p(e))throw new Error("Invalid product reviews response.");return e}function N(e,r){var c,s,a;if(!p(e))return null;const t=e;if(typeof t.nickname!="string"||typeof t.summary!="string"||typeof t.text!="string"||typeof t.created_at!="string"||typeof t.average_rating!="number"||!Number.isFinite(t.average_rating)||t.average_rating<0||t.average_rating>100)return null;const n=Array.isArray(t.ratings_breakdown)?t.ratings_breakdown:[];Array.isArray(t.ratings_breakdown)||(r.count+=1);let i=0;n.forEach(u=>{if(!p(u)||typeof u.name!="string"||typeof u.value!="string"){r.count+=1;return}i+=1});const o={nickname:t.nickname,summary:t.summary,text:t.text,createdAt:t.created_at,rating:t.average_rating===0&&i===0?null:t.average_rating/20};return I(o,(a=(s=(c=C.getConfig().models)==null?void 0:c.ProductReviewModel)==null?void 0:s.transformer)==null?void 0:a.call(s,e))}function G(e){var h,g,_;const r=b(e);if(!Array.isArray(r.items))throw new Error("Invalid product reviews items.");const t=b(r.page_info),n=t.current_page,i=t.page_size,o=t.total_pages;if(!Number.isSafeInteger(n)||n<1||!Number.isSafeInteger(i)||i<1||!Number.isSafeInteger(o)||o<0||r.items.length>i||r.items.length>0&&n>o)throw new Error("Invalid product reviews page information.");let c=0;const s={count:0},a=r.items.flatMap(k=>{const R=N(k,s);return R?[R]:(c+=1,[])});return(c||s.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${c} review(s) skipped, ${s.count} rating breakdown value(s) ignored.`),I({items:a,pageInfo:{currentPage:n,pageSize:i,totalPages:o}},(_=(g=(h=C.getConfig().models)==null?void 0:h.ProductReviewsModel)==null?void 0:g.transformer)==null?void 0:_.call(g,e))}function v(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function U(e){if(!v(e))return null;const r=Number(e.value);return typeof e.value_id!="string"||!e.value_id||typeof e.value!="string"||!Number.isInteger(r)||r<1?null:{valueId:e.value_id,value:r}}function F(e){const r=v(e)?e.items:void 0;if(!Array.isArray(r))throw new Error("Invalid product review ratings metadata response.");return r.flatMap(t=>{if(!v(t)||typeof t.id!="string"||!t.id||typeof t.name!="string"||!Array.isArray(t.values))return[];const n=t.values.map(U).filter(i=>i!==null).sort((i,o)=>i.value-o.value);return n.length?[{id:t.id,name:t.name,values:n}]:[]})}function A(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function q(e){if(!A(e)||typeof e.nickname!="string"||typeof e.summary!="string"||typeof e.text!="string")throw new Error("Invalid create product review response.");const t=(Array.isArray(e.ratings_breakdown)?e.ratings_breakdown:[]).flatMap(o=>{if(!A(o)||typeof o.name!="string")return[];const c=Number(o.value);return Number.isFinite(c)?[{name:o.name,value:c}]:[]}),n=e.average_rating,i=typeof n=="number"&&Number.isFinite(n)&&n>=0&&n<=100&&(n>0||t.length>0)?n/20:null;return{nickname:e.nickname,summary:e.summary,text:e.text,rating:i,ratingsBreakdown:t}}const l=e=>{const r=e.map(t=>t.message).join(" ");throw Error(r)},Q=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,x=async()=>d(Q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:r})=>{if(e!=null&&e.length)return l(e);if(!(r!=null&&r.storeConfig))throw new Error("Unable to load product reviews store configuration.");return M(r.storeConfig)}),y={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let w;const f=new T({init:async e=>{f.config.setConfig({...y,...e}),w||(w=x().catch(r=>{throw w=void 0,r}));try{const r=await w;f.config.setConfig({...e,...r})}catch(r){f.config.setConfig({...e,...y}),console.error("[Ratings Reviews] Failed to fetch store config:",r)}},listeners:()=>[]});f.config.setConfig(y);const C=f.config,{setEndpoint:Z,setFetchGraphQlHeader:z,removeFetchGraphQlHeader:O,setFetchGraphQlHeaders:ee,fetchGraphQl:d,getConfig:re}=new S().getMethods(),V=$,m=new Map;async function W(e,r,t,n){const i=`${e}:${t??""}`,o=(m.get(i)??0)+1;m.set(i,o);const c=()=>m.get(i)===o,s=(a,u)=>V.emit(`${e}/${a}`,u,{scope:t});s("request",r),s("error",null),s("loading",!0);try{const a=await n();return c()&&s("result",{request:r,result:a}),a}catch(a){throw c()&&s("error",a.message),a}finally{c()&&s("loading",!1)}}const Y=`
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
`,j=async({sku:e,pageSize:r,currentPage:t})=>{const{errors:n,data:i}=await d(Y,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:r,currentPage:t}});if(n!=null&&n.length)return l(n);if(!i||!("reviews"in i))throw new Error("Unable to load product reviews.");return i.reviews===null?null:G(i.reviews)};async function te(e,{pageSize:r=20,currentPage:t=1,scope:n}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(r)||r<1||!Number.isSafeInteger(t)||t<1)throw new Error("Review page size and current page must be positive integers.");const i={sku:e,pageSize:r,currentPage:t};return W("reviews",i,n,()=>j(i))}const D=`
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
`,ne=async()=>{const{errors:e,data:r}=await d(D,{method:"GET",cache:"force-cache"});if(e!=null&&e.length)return l(e);if(!(r!=null&&r.productReviewRatingsMetadata))throw new Error("Unable to load product review ratings.");return F(r.productReviewRatingsMetadata)};async function B(){const e=()=>O("X-ReCaptcha");e();const r=await P();return r&&z("X-ReCaptcha",r),e}const H=`
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
`,ie=async({sku:e,nickname:r,summary:t,text:n,ratings:i})=>{var s;const o={sku:e==null?void 0:e.trim(),nickname:r==null?void 0:r.trim(),summary:t==null?void 0:t.trim(),text:n==null?void 0:n.trim(),ratings:i==null?void 0:i.map(({id:a,valueId:u})=>({id:a,value_id:u}))};if(!o.sku||!o.nickname||!o.summary||!o.text)throw new Error("A SKU, nickname, summary and text are required to create a product review.");if(!Array.isArray(o.ratings)||!o.ratings.length||o.ratings.some(({id:a,value_id:u})=>!a||!u))throw new Error("At least one rating is required to create a product review.");const c=await B();try{const{errors:a,data:u}=await d(H,{method:"POST",variables:{input:o}});if(a!=null&&a.length)return l(a);if(!((s=u==null?void 0:u.createProductReview)!=null&&s.review))throw new Error("Unable to create the product review.");return q(u.createProductReview.review)}finally{c()}};export{C as config,ie as createProductReview,V as e,d as fetchGraphQl,re as getConfig,te as getProductReviews,ne as getRatingsMetadata,x as getStoreConfig,f as initialize,O as removeFetchGraphQlHeader,Z as setEndpoint,z as setFetchGraphQlHeader,ee as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
