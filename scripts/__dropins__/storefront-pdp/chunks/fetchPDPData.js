import{events as Z}from"@dropins/tools/event-bus.js";import{Initializer as ae}from"@dropins/tools/lib.js";import{FetchGraphQL as ue}from"@dropins/tools/fetch-graphql.js";import{s as oe,g as se}from"./getProductConfigurationValues.js";function $e(t){const n=new URLSearchParams(window.location.search);Object.entries(t).forEach(([e,i])=>{i===null?n.delete(e):n.set(e,String(i))});let r=window.location.pathname;r+=`?${n.toString()}`,r+=window.location.hash,window.history.replaceState({},"",r)}function le(){const t=new URLSearchParams(window.location.search),n={};return t.forEach((r,e)=>{n[e]=r}),n}function me(t){var n,r,e,i,a,u,o,s,l,m,c,f;return{productId:Number(t==null?void 0:t.externalId),name:t==null?void 0:t.name,sku:(t==null?void 0:t.variantSku)||(t==null?void 0:t.sku),topLevelSku:t==null?void 0:t.sku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:void 0,pricing:{regularPrice:((r=(n=t==null?void 0:t.prices)==null?void 0:n.regular)==null?void 0:r.amount)||0,minimalPrice:(i=(e=t==null?void 0:t.prices)==null?void 0:e.final)==null?void 0:i.minimumAmount,maximalPrice:(u=(a=t==null?void 0:t.prices)==null?void 0:a.final)==null?void 0:u.maximumAmount,specialPrice:(s=(o=t==null?void 0:t.prices)==null?void 0:o.final)==null?void 0:s.amount,tierPricing:void 0,currencyCode:((m=(l=t==null?void 0:t.prices)==null?void 0:l.final)==null?void 0:m.currency)||"USD"},canonicalUrl:t==null?void 0:t.url,mainImageUrl:(f=(c=t==null?void 0:t.images)==null?void 0:c[0])==null?void 0:f.url}}const ce={PRODUCT_CONTEXT:"productContext"},fe={PRODUCT_PAGE_VIEW:"product-page-view"};function ne(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function de(t,n){const r=ne();r.push({[t]:null}),r.push({[t]:n})}function Pe(t,n){ne().push(e=>{const i=e.getState?e.getState():{};e.push({event:t,eventInfo:{...i,...n}})})}function we(t){const n=me(t);de(ce.PRODUCT_CONTEXT,n),Pe(fe.PRODUCT_PAGE_VIEW)}const Q=new ae({init:async t=>{var i,a,u,o,s,l;const e={...{defaultLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:((i=le().optionsUIDs)==null?void 0:i.split(","))||((o=(u=(a=t==null?void 0:t.models)==null?void 0:a.ProductDetails)==null?void 0:u.initialData)==null?void 0:o.optionsUIDs)},...t};if(Q.config.setConfig({...e}),e!=null&&e.sku){const m={sku:e.sku,quantity:1,optionsUIDs:e.optionsUIDs};oe(()=>({...m}));const c=((l=(s=e==null?void 0:e.models)==null?void 0:s.ProductDetails)==null?void 0:l.initialData)??await te(e.sku);Z.emit("pdp/data",c),e.acdl&&c&&we(c)}},listeners:()=>[Z.on("locale",()=>{const{sku:t}=Q.config.getConfig();t&&te(t)})]}),P=Q.config,{setEndpoint:Le,setFetchGraphQlHeader:Ge,removeFetchGraphQlHeader:Me,setFetchGraphQlHeaders:Ne,fetchGraphQl:j,getConfig:Qe}=new ue().getMethods();function M(t,n){var i,a,u;const r=t?{name:t.name,sku:t.sku,addToCartAllowed:t.addToCartAllowed,inStock:t.inStock,shortDescription:t.shortDescription,metaDescription:t.metaDescription,metaKeyword:t.metaKeyword,metaTitle:t.metaTitle,description:t.description,images:ye(t),prices:be(t,!!n),attributes:ge(t),options:he(t),optionUIDs:Se(t),url:t.url,urlKey:t.urlKey,externalId:t.externalId,externalParentId:t.externalParentId,variantSku:t.variantSku}:null,e=(u=(a=(i=P.getConfig())==null?void 0:i.models)==null?void 0:a.ProductDetails)==null?void 0:u.transform;return e&&r?e(r):r}function ye(t){var n,r;return(r=(n=t.images)==null?void 0:n.filter(e=>{var i;return!((i=e.roles)!=null&&i.includes("hide_from_pdp"))}))==null?void 0:r.map(e=>(e.url=e.url.replace(/^https?:/,""),e))}function ge(t){var n,r;return(r=(n=t.attributes)==null?void 0:n.filter(({roles:e})=>(e==null?void 0:e.indexOf("visible_in_pdp"))!==-1))==null?void 0:r.map(({label:e,value:i,name:a})=>({id:a,label:e,value:i.toString().split(",").join(", ")}))}function he(t){const{options:n,optionUIDs:r}=t;return n==null?void 0:n.map(({id:e,title:i,required:a,multi:u,values:o})=>{var c,f;const s=(c=o==null?void 0:o[0])==null?void 0:c.__typename;let l=o==null?void 0:o[0].type;const m=((f=o==null?void 0:o[0])==null?void 0:f.__typename)==="ProductViewOptionValueProduct";return l?l=l.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):l="dropdown",{id:e,type:l,typename:s,label:i,required:a,multiple:u,items:m?De(o,r):xe(o,r,l)}})}function De(t,n){return t==null?void 0:t.map(({id:r,title:e,inStock:i,isDefault:a,product:u})=>({id:r,inStock:i,label:e,selected:(n==null?void 0:n.indexOf(r))>-1||a,value:r,product:u}))}function xe(t,n,r){return t==null?void 0:t.map(({id:e,title:i,inStock:a,value:u})=>({id:e,inStock:a,label:i,selected:(n==null?void 0:n.indexOf(e))>-1,value:(r==null?void 0:r.toLowerCase())==="dropdown"?e:u==null?void 0:u.replace(/^https?:/,"")}))}function be(t,n){var b,K,B,q,H;const{price:r,priceRange:e,options:i,optionUIDs:a}=t;let{__typename:u}=t;function o(){var h;const w=r.regular.amount.value,d=((h=r.final)==null?void 0:h.amount.value)??r.regular.amount.value,g=r.regular.amount.currency==="NONE"?"USD":r==null?void 0:r.regular.amount.currency;return[w,d,d,g]}function s(){var S,C,E,_,T,V,v,p,A,I,F,U;const w=(S=e==null?void 0:e.minimum)==null?void 0:S.final.amount.value,d=(C=e==null?void 0:e.maximum)==null?void 0:C.final.amount.value;let g;((_=(E=e==null?void 0:e.minimum)==null?void 0:E.regular)==null?void 0:_.amount.value)===((V=(T=e==null?void 0:e.maximum)==null?void 0:T.regular)==null?void 0:V.amount.value)&&(g=(p=(v=e==null?void 0:e.minimum)==null?void 0:v.regular)==null?void 0:p.amount.value);const h=((I=(A=e==null?void 0:e.minimum)==null?void 0:A.final)==null?void 0:I.amount.currency)==="NONE"?"USD":(U=(F=e==null?void 0:e.minimum)==null?void 0:F.final)==null?void 0:U.amount.currency;return[g,w,d,h]}function l(){var E,_,T,V,v,p,A,I,F,U,X,z;let w=0,d=0;i==null||i.forEach(O=>{var W;const N=O==null?void 0:O.values;if(N&&Array.isArray(N)){const D=N.map(y=>{var $,L,Y,J;return(J=(Y=(L=($=y==null?void 0:y.product)==null?void 0:$.price)==null?void 0:L.regular)==null?void 0:Y.amount)==null?void 0:J.value}).filter(y=>y!==void 0),G=D.length>0?Math.max(...D):0;w+=G}else w+=0;(W=O==null?void 0:O.values)==null||W.forEach(D=>{var G,y,$,L;a!=null&&a.includes(D.id)&&(d+=(L=($=(y=(G=D==null?void 0:D.product)==null?void 0:G.price)==null?void 0:y.final)==null?void 0:$.amount)==null?void 0:L.value)})});const g=(E=e==null?void 0:e.minimum)==null?void 0:E.final.amount.value,h=(_=e==null?void 0:e.maximum)==null?void 0:_.final.amount.value;let S;((V=(T=e==null?void 0:e.minimum)==null?void 0:T.regular)==null?void 0:V.amount.value)===((p=(v=e==null?void 0:e.maximum)==null?void 0:v.regular)==null?void 0:p.amount.value)&&(S=(I=(A=e==null?void 0:e.minimum)==null?void 0:A.regular)==null?void 0:I.amount.value);const C=((U=(F=e==null?void 0:e.minimum)==null?void 0:F.final)==null?void 0:U.amount.currency)==="NONE"?"USD":(z=(X=e==null?void 0:e.minimum)==null?void 0:X.final)==null?void 0:z.amount.currency;return n&&!a?[S,g,h,C]:w===(e==null?void 0:e.maximum.regular.amount.value)?[d,d,d,C]:[S,g,h,C]}const[m,c,f,x]=u==="SimpleProductView"?o():n?l():s(),k=u==="SimpleProductView"?(b=r==null?void 0:r.roles)==null?void 0:b.includes("visible"):((B=(K=e==null?void 0:e.maximum)==null?void 0:K.roles)==null?void 0:B.includes("visible"))&&((H=(q=e==null?void 0:e.minimum)==null?void 0:q.roles)==null?void 0:H.includes("visible"));return f&&c===f?{regular:{amount:m,currency:x,variant:m&&c!==m?"strikethrough":"default"},final:{amount:f,currency:x,variant:"default"},visible:k}:{final:{minimumAmount:c,maximumAmount:f,currency:x},visible:k}}function Se(t){var r;let{optionUIDs:n}=t;return(r=t==null?void 0:t.options)==null||r.map(({values:e})=>{var a;((a=e==null?void 0:e[0])==null?void 0:a.__typename)==="ProductViewOptionValueProduct"&&!n&&(n=[],e==null||e.map(({id:u,isDefault:o})=>{o&&(n==null?void 0:n.indexOf(u))===-1&&n.push(u)}))}),n}const Ce=`
fragment ProductOptionFragment on ProductViewOption {
    id
    title
    required
    multi
    values {
      id
      title
      inStock
      __typename
      ... on ProductViewOptionValueProduct {
        title
        quantity
        isDefault
        __typename
        product {
          sku
          shortDescription
          metaDescription
          metaKeyword
          metaTitle
          name
          price {
            final {
              amount {
                value
                currency
              }
            }
            regular {
              amount {
                value
                currency
              }
            }
            roles
          }
        }
      }
      ... on ProductViewOptionValueSwatch {
        id
        title
        type
        value
        inStock
      }
    }
  }
`,re=`
fragment ProductFragment on ProductView {
  __typename
  id
  sku
  name
  shortDescription
  metaDescription
  metaKeyword
  metaTitle
  description
  inStock
  addToCartAllowed
  url
  urlKey
  externalId

  images(roles: []) {
    url
    label
    roles
  }

  attributes(roles: []) {
    name
    label
    value
    roles
  }

... on SimpleProductView {
    price {
        roles

        regular {
            amount {
                value
                currency
            }
        }

        final {
            amount {
                value
                currency
            }
        }
    }
}


  ... on ComplexProductView {
    options {
      ...ProductOptionFragment
    }

    priceRange {
      maximum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
        roles
      }
      minimum {
        final {
          amount {
            value
            currency
          }
        }
        regular {
          amount {
            value
            currency
          }
        }
        roles
      }
    }
  }
}

${Ce}
`,ie=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...ProductFragment
    }
}

${re}
`;function R(t){return t.some(n=>(n==null?void 0:n.__typename)==="ProductViewOptionValueProduct")}const Oe=async t=>{var a,u,o,s,l,m;const n=(o=(u=(a=P==null?void 0:P.getConfig())==null?void 0:a.models)==null?void 0:u.ProductDetails)==null?void 0:o.initialData;let r=(s=n==null?void 0:n.options)==null?void 0:s.some(c=>R(c.values));if(n)return M(n,!!r);const{data:e}=await j(ie,{method:"GET",variables:{skus:[t]}}),i=(l=e==null?void 0:e.products)==null?void 0:l[0];return r=(m=i==null?void 0:i.options)==null?void 0:m.some(c=>R(c.values)),M(i,!!r)},ke=`
query REFINE_PRODUCT_QUERY(
    $optionIds: [String!]!
    $sku: String!
) {
    # Refined Product
    refineProduct(
        optionIds: $optionIds 
        sku: $sku
    ) {
        ...ProductFragment
    }

    # Parent Product
    products(skus: [$sku]) {
        ...ProductFragment
    }

    # %extendedPlaceholder%
}

${re}
`;async function ee(t,n,r){var o;if(r)return{...(o=(await j(ie,{method:"GET",variables:{skus:[t]}})).data)==null?void 0:o.products[0],optionUIDs:n};const e=_e(n),i=Te(e,t),a=ke.replace("# %extendedPlaceholder%",i),{data:u}=await j(a,{method:"GET",variables:{optionIds:n,sku:t}});return u}const Ee=async(t,n,r,e)=>{var f,x,k;let i;if(i=await ee(t,n,e),!i)return null;if(e)return M({...i,optionUIDs:n},!0);let{products:a,refineProduct:u,...o}=i;const s=a==null?void 0:a[0],l=Ve(Object.values(o),s.options,r);if(r!=null&&r.length&&u===null){n=ve(l,n,r);const b=await ee(t,n);u=b==null?void 0:b.refineProduct}const m=M({...u||s,sku:s.sku,name:s.name,externalParentId:s==null?void 0:s.externalId,options:l,optionUIDs:n,variantSku:(u==null?void 0:u.__typename)==="SimpleProductView"?u==null?void 0:u.sku:void 0}),c=(k=(x=(f=P==null?void 0:P.getConfig())==null?void 0:f.models)==null?void 0:x.ProductDetails)==null?void 0:k.fallbackData;return c?c(s,m):m};function _e(t){if(t.length<2)return[t];const n=[];return t.forEach(r=>{const e=[];t.forEach(i=>{r!==i&&e.push(i)}),n.push(e)}),n}function Te(t,n){return t.map((r,e)=>`
          ProductOption${e}: refineProduct(
            optionIds: [
              ${r.map(i=>`"${i}"`).join(", ")}
            ]
            sku: "${n}"
          ) {
            ... on ComplexProductView {
              options {
                ...ProductOptionFragment
              }
            }
          }
        `).join("")}function Ve(t,n,r){const e=Object.values(t).filter(a=>!!a).reduce((a,u)=>u.options?[...a,...u.options]:[...a],[]),i=new Map(n.map(a=>[a.id,a]));return e.forEach(a=>{r!=null&&r.includes(a.id)||i.set(a.id,a)}),[...i.values()]}function ve(t,n,r){const e=[];let i;return t.forEach(a=>{var u,o,s,l;r.includes(a.id)?i=((o=(u=a.values)==null?void 0:u.find(m=>n.includes(m==null?void 0:m.id)))==null?void 0:o.id)||((s=a.values[0])==null?void 0:s.id):i=(l=a.values[0])==null?void 0:l.id,e.push(i)}),e}const te=async(t,n)=>{var s,l;const{models:r,anchors:e}=P.getConfig(),i=(n==null?void 0:n.optionsUIDs)??((s=se())==null?void 0:s.optionsUIDs)??P.getConfig().optionsUIDs,a=(l=r==null?void 0:r.ProductDetails)==null?void 0:l.initialData,u=pe(a);return i!=null&&i.length?await Ee(t,i,(n==null?void 0:n.anchors)??e,u):await Oe(t)};function pe(t){var n;return t?(n=t==null?void 0:t.options)==null?void 0:n.some(r=>{var e;return(e=r==null?void 0:r.values)==null?void 0:e.some(i=>i.__typename==="ProductViewOptionValueProduct")}):!1}export{Ge as a,Ne as b,P as c,Oe as d,Ee as e,j as f,Qe as g,te as h,Q as i,$e as j,we as p,Me as r,Le as s};
