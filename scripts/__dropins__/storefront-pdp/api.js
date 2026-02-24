/*! Copyright 2026 Adobe
All Rights Reserved. */
import{a as u,t as c}from"./chunks/fetchProductData.js";import{c as G,f as C,j as F,h as k,k as R,l as U,i as A,r as E,b as _,d as x,e as Q}from"./chunks/fetchProductData.js";import{PRODUCT_FRAGMENT as p}from"./fragments.js";import"@dropins/tools/event-bus.js";import{g as V,s as I}from"./chunks/getProductConfigurationValues.js";import{i as O,s as S}from"./chunks/isProductConfigurationValid.js";import{g as b}from"./chunks/getFetchedProductData.js";import"@dropins/tools/lib.js";import"@dropins/tools/fetch-graphql.js";const d=`
query GET_PRODUCTS_DATA($skus: [String]) {
    products(skus: $skus) {
        ...PRODUCT_FRAGMENT
    }
}

${p}
`,P=async(a,e)=>{const n=a.map(r=>r.sku),{data:o}=await u(d,{method:"GET",variables:{skus:n}}),s=o==null?void 0:o.products;if(!s||s.length===0)return null;const i=a.reduce((r,t)=>(r[t.sku]=t,r),{});return e?s:s.map(r=>{const t=i[r.sku];return t!=null&&t.optionsUIDs&&(r.optionUIDs=t.optionsUIDs),c(r,{preselectFirstOption:t==null?void 0:t.preselectFirstOption})})};export{G as config,u as fetchGraphQl,C as fetchProductData,F as getConfig,k as getFetchGraphQlHeader,b as getFetchedProductData,V as getProductConfigurationValues,R as getProductData,P as getProductsData,U as getRefinedProduct,A as initialize,O as isProductConfigurationValid,E as removeFetchGraphQlHeader,_ as setEndpoint,x as setFetchGraphQlHeader,Q as setFetchGraphQlHeaders,S as setProductConfigurationValid,I as setProductConfigurationValues};
//# sourceMappingURL=api.js.map
