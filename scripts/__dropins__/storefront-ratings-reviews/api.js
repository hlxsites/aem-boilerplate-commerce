/*! Copyright 2026 Adobe
All Rights Reserved. */
import{FetchGraphQL as S}from"@dropins/tools/fetch-graphql.js";import{merge as m,Initializer as k}from"@dropins/tools/lib.js";import{events as P}from"@dropins/tools/event-bus.js";function R(e){if(e==="1"||e===1||e===!0)return!0;if(e==="0"||e===0||e===!1)return!1;throw new Error("Invalid product reviews store configuration.")}function G(e){return{isProductReviewsEnabled:R(e.product_reviews_enabled),allowGuestsToWriteProductReviews:R(e.allow_guests_to_write_product_reviews)}}function $(e){if(Array.isArray(e)&&e.length!==1)throw new Error("Invalid product rating attribute.");const r=Array.isArray(e)?e[0]:e;if(typeof r!="number"&&(typeof r!="string"||r.trim()===""))throw new Error("Invalid product rating attribute.");const t=Number(r);if(!Number.isFinite(t))throw new Error("Invalid product rating attribute.");return t}function N(e){var c,a,s;if(!Array.isArray(e))throw new Error("Invalid product rating attributes.");const r=new Map;e.forEach(i=>{if(!i||typeof i!="object"||!("name"in i)||typeof i.name!="string")throw new Error("Invalid product rating attributes.");if(!(i.name!=="ac_rating_summary"&&i.name!=="ac_review_count")){if(r.has(i.name)||!("value"in i))throw new Error("Invalid product rating attribute.");r.set(i.name,$(i.value))}});const t=r.get("ac_rating_summary")??0,o=r.get("ac_review_count")??0;if(t<0||t>100||!Number.isSafeInteger(o)||o<0||t>0&&o===0)throw new Error("Invalid product rating aggregate.");const n={rating:t/20,reviewCount:o};return m(n,(s=(a=(c=h.getConfig().models)==null?void 0:c.ProductRatingModel)==null?void 0:a.transformer)==null?void 0:s.call(a,e))}function w(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function b(e){if(!w(e))throw new Error("Invalid product reviews response.");return e}function U(e,r){var a,s,i;if(!w(e))return null;const t=e;if(typeof t.nickname!="string"||typeof t.summary!="string"||typeof t.text!="string"||typeof t.created_at!="string"||typeof t.average_rating!="number"||!Number.isFinite(t.average_rating)||t.average_rating<0||t.average_rating>100)return null;const o=Array.isArray(t.ratings_breakdown)?t.ratings_breakdown:[];Array.isArray(t.ratings_breakdown)||(r.count+=1);let n=0;o.forEach(g=>{if(!w(g)||typeof g.name!="string"||typeof g.value!="string"){r.count+=1;return}n+=1});const c={nickname:t.nickname,summary:t.summary,text:t.text,createdAt:t.created_at,rating:t.average_rating===0&&n===0?null:t.average_rating/20};return m(c,(i=(s=(a=h.getConfig().models)==null?void 0:a.ProductReviewModel)==null?void 0:s.transformer)==null?void 0:i.call(s,e))}function F(e){var v,u,y;const r=b(e);if(!Array.isArray(r.items))throw new Error("Invalid product reviews items.");const t=b(r.page_info),o=t.current_page,n=t.page_size,c=t.total_pages;if(!Number.isSafeInteger(o)||o<1||!Number.isSafeInteger(n)||n<1||!Number.isSafeInteger(c)||c<0||r.items.length>n||r.items.length>0&&o>c)throw new Error("Invalid product reviews page information.");let a=0;const s={count:0},i=r.items.flatMap(C=>{const E=U(C,s);return E?[E]:(a+=1,[])});return(a||s.count)&&console.warn(`[Ratings Reviews] Ignored malformed review data: ${a} review(s) skipped, ${s.count} rating breakdown value(s) ignored.`),m({items:i,pageInfo:{currentPage:o,pageSize:n,totalPages:c}},(y=(u=(v=h.getConfig().models)==null?void 0:v.ProductReviewsModel)==null?void 0:u.transformer)==null?void 0:y.call(u,e))}const p=e=>{const r=e.map(t=>t.message).join(" ");throw Error(r)},Q=`
query STORE_CONFIG_QUERY {
  storeConfig {
    product_reviews_enabled
    allow_guests_to_write_product_reviews
  }
}
`,T=async()=>_(Q,{method:"GET",cache:"force-cache"}).then(({errors:e,data:r})=>{if(e!=null&&e.length)return p(e);if(!(r!=null&&r.storeConfig))throw new Error("Unable to load product reviews store configuration.");return G(r.storeConfig)}),I={isProductReviewsEnabled:!1,allowGuestsToWriteProductReviews:!1};let f;const d=new k({init:async e=>{d.config.setConfig({...e,...I}),f||(f=T().catch(r=>{throw f=void 0,r}));try{const r=await f;d.config.setConfig({...e,...r})}catch(r){console.error("[Ratings Reviews] Failed to fetch store config:",r)}},listeners:()=>[]});d.config.setConfig(I);const h=d.config,{setEndpoint:H,setFetchGraphQlHeader:V,removeFetchGraphQlHeader:B,setFetchGraphQlHeaders:D,fetchGraphQl:_,getConfig:K}=new S().getMethods(),q=P,l=new Map;async function A(e,r,t,o){const n=`${e}:${t??""}`,c=(l.get(n)??0)+1;l.set(n,c);const a=()=>l.get(n)===c,s=(i,g)=>q.emit(`${e}/${i}`,g,{scope:t});s("request",r),s("error",null),s("loading",!0);try{const i=await o();return a()&&s("result",{request:r,result:i}),i}catch(i){throw a()&&s("error",i.message),i}finally{a()&&s("loading",!1)}}const z=`
query PRODUCT_RATING_QUERY($skus: [String!]!) {
  products(skus: $skus) {
    sku
    attributes(roles: ["visible_in_pdp"]) {
      name
      label
      value
      roles
    }
  }
}
`,M=async e=>{const{errors:r,data:t}=await _(z,{method:"GET",cache:"no-store",variables:{skus:[e]}});if(r!=null&&r.length)return p(r);if(!Array.isArray(t==null?void 0:t.products))throw new Error("Unable to load product rating.");const o=t.products.find(n=>(n==null?void 0:n.sku)===e);return o?N(o.attributes):null},L=async(e,{scope:r}={})=>{if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its rating.");return A("rating",{sku:e},r,()=>M(e))},O=`
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
`,Y=async({sku:e,pageSize:r,currentPage:t})=>{const{errors:o,data:n}=await _(O,{method:"GET",cache:"no-store",variables:{sku:e,pageSize:r,currentPage:t}});if(o!=null&&o.length)return p(o);if(!n||!("reviews"in n))throw new Error("Unable to load product reviews.");return n.reviews===null?null:F(n.reviews)};async function J(e,{pageSize:r=20,currentPage:t=1,scope:o}={}){if(typeof e!="string"||!e.trim())throw new Error("A product SKU is required to load its reviews.");if(!Number.isSafeInteger(r)||r<1||!Number.isSafeInteger(t)||t<1)throw new Error("Review page size and current page must be positive integers.");const n={sku:e,pageSize:r,currentPage:t};return A("reviews",n,o,()=>Y(n))}export{h as config,q as e,_ as fetchGraphQl,K as getConfig,L as getProductRating,J as getProductReviews,T as getStoreConfig,d as initialize,B as removeFetchGraphQlHeader,H as setEndpoint,V as setFetchGraphQlHeader,D as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
