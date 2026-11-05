/*! Copyright 2026 Adobe
All Rights Reserved. */
import{FetchGraphQL as k}from"@dropins/tools/fetch-graphql.js";import{merge as R,Initializer as S}from"@dropins/tools/lib.js";import{events as $}from"@dropins/tools/event-bus.js";function h(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function G(e){return{isProductReviewsEnabled:h(e.product_reviews_enabled),allowGuestsToWriteProductReviews:h(e.allow_guests_to_write_product_reviews)}}function d(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function y(e){if(!d(e))throw new Error("Invalid product reviews response.");return e}function P(e,t){var a,i,s;if(!d(e))return null;const r=e;if(typeof r.nickname!="string"||typeof r.summary!="string"||typeof r.text!="string"||typeof r.created_at!="string"||typeof r.average_rating!="number"||!Number.isFinite(r.average_rating)||r.average_rating<0||r.average_rating>100)return null;const o=Array.isArray(r.ratings_breakdown)?r.ratings_breakdown:[];Array.isArray(r.ratings_breakdown)||(t.count+=1);let n=0;o.forEach(g=>{if(!d(g)||typeof g.name!="string"||typeof g.value!="string"){t.count+=1;return}n+=1});const c={nickname:r.nickname,summary:r.summary,text:r.text,createdAt:r.created_at,rating:r.average_rating===0&&n===0?null:r.average_rating/20};return R(c,(s=(i=(a=b.getConfig().models)==null?void 0:a.ProductReviewModel)==null?void 0:i.transformer)==null?void 0:s.call(i,e))}function A(e){var p,u,v;const t=y(e);if(!Array.isArray(t.items))throw new Error("Invalid product reviews items.");const r=y(t.page_info),o=r.current_page,n=r.page_size,c=r.total_pages;if(!Number.isSafeInteger(o)||o<1||!Number.isSafeInteger(n)||n<1||!Number.isSafeInteger(c)||c<0||t.items.length>n||t.items.length>0&&o>c)throw new Error("Invalid product reviews page information.");let a=0;const i={count:0},s=t.items.flatMap(C=>{const _=P(C,i);return _?[_]:(a+=1,[])});return(a||i.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${a} review(s) skipped, ${i.count} rating breakdown value(s) ignored.`),R({items:s,pageInfo:{currentPage:o,pageSize:n,totalPages:c}},(v=(u=(p=b.getConfig().models)==null?void 0:p.ProductReviewsModel)==null?void 0:u.transformer)==null?void 0:v.call(u,e))}const E=e=>{const t=e.map(r=>r.message).join(" ");throw Error(t)},F=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,Q=async()=>I(F,{method:"GET",cache:"force-cache"}).then(({errors:e,data:t})=>{if(e!=null&&e.length)return E(e);if(!(t!=null&&t.storeConfig))throw new Error("Unable to load product reviews store configuration.");return G(t.storeConfig)}),m={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let l;const f=new S({init:async e=>{f.config.setConfig({...m,...e}),l||(l=Q().catch(t=>{throw l=void 0,t}));try{const t=await l;f.config.setConfig({...e,...t})}catch(t){f.config.setConfig({...e,...m}),console.error("[Ratings Reviews] Failed to fetch store config:",t)}},listeners:()=>[]});f.config.setConfig(m);const b=f.config,{setEndpoint:O,setFetchGraphQlHeader:W,removeFetchGraphQlHeader:Y,setFetchGraphQlHeaders:H,fetchGraphQl:I,getConfig:j}=new k().getMethods(),q=$,w=new Map;async function z(e,t,r,o){const n=`${e}:${r??""}`,c=(w.get(n)??0)+1;w.set(n,c);const a=()=>w.get(n)===c,i=(s,g)=>q.emit(`${e}/${s}`,g,{scope:r});i("request",t),i("error",null),i("loading",!0);try{const s=await o();return a()&&i("result",{request:t,result:s}),s}catch(s){throw a()&&i("error",s.message),s}finally{a()&&i("loading",!1)}}const N=`
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
`,U=async({sku:e,pageSize:t,currentPage:r})=>{const{errors:o,data:n}=await I(N,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:t,currentPage:r}});if(o!=null&&o.length)return E(o);if(!n||!("reviews"in n))throw new Error("Unable to load product reviews.");return n.reviews===null?null:A(n.reviews)};async function B(e,{pageSize:t=20,currentPage:r=1,scope:o}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(t)||t<1||!Number.isSafeInteger(r)||r<1)throw new Error("Review page size and current page must be positive integers.");const n={sku:e,pageSize:t,currentPage:r};return z("reviews",n,o,()=>U(n))}export{b as config,q as e,I as fetchGraphQl,j as getConfig,B as getProductReviews,Q as getStoreConfig,f as initialize,Y as removeFetchGraphQlHeader,O as setEndpoint,W as setFetchGraphQlHeader,H as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
