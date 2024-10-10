import{events as te}from"@dropins/tools/event-bus.js";import{Initializer as ae}from"@dropins/tools/lib.js";import{FetchGraphQL as ue}from"@dropins/tools/fetch-graphql.js";import{s as se,g as oe}from"./getProductConfigurationValues.js";function Le(e){const n=new URLSearchParams(window.location.search);Object.entries(e).forEach(([t,i])=>{i===null?n.delete(t):n.set(t,String(i))});let r=window.location.pathname;r+=`?${n.toString()}`,r+=window.location.hash,window.history.replaceState({},"",r)}function le(){const e=new URLSearchParams(window.location.search),n={};return e.forEach((r,t)=>{n[t]=r}),n}function me(e){var n,r,t,i,a,u,s,o,l,m,c,f;return{productId:Number(e==null?void 0:e.externalId),name:e==null?void 0:e.name,sku:(e==null?void 0:e.variantSku)||(e==null?void 0:e.sku),topLevelSku:e==null?void 0:e.sku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:void 0,pricing:{regularPrice:((r=(n=e==null?void 0:e.prices)==null?void 0:n.regular)==null?void 0:r.amount)||0,minimalPrice:(i=(t=e==null?void 0:e.prices)==null?void 0:t.final)==null?void 0:i.minimumAmount,maximalPrice:(u=(a=e==null?void 0:e.prices)==null?void 0:a.final)==null?void 0:u.maximumAmount,specialPrice:(o=(s=e==null?void 0:e.prices)==null?void 0:s.final)==null?void 0:o.amount,tierPricing:void 0,currencyCode:((m=(l=e==null?void 0:e.prices)==null?void 0:l.final)==null?void 0:m.currency)||"USD"},canonicalUrl:e==null?void 0:e.url,mainImageUrl:(f=(c=e==null?void 0:e.images)==null?void 0:c[0])==null?void 0:f.url}}const ce={PRODUCT_CONTEXT:"productContext"},fe={PRODUCT_PAGE_VIEW:"product-page-view"};function ne(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function de(e,n){const r=ne();r.push({[e]:null}),r.push({[e]:n})}function Pe(e,n){ne().push(t=>{const i=t.getState?t.getState():{};t.push({event:e,eventInfo:{...i,...n}})})}function we(e){const n=me(e);de(ce.PRODUCT_CONTEXT,n),Pe(fe.PRODUCT_PAGE_VIEW)}const Q=new ae({init:async e=>{var r,t,i,a;const n={defaultLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:((r=le().optionsUIDs)==null?void 0:r.split(","))||((a=(i=(t=e==null?void 0:e.models)==null?void 0:t.ProductDetails)==null?void 0:i.initialData)==null?void 0:a.optionsUIDs)};if(e!=null&&e.sku){const u={sku:e.sku,quantity:1,optionsUIDs:n.optionsUIDs};se(()=>({...u}))}if(Q.config.setConfig({...n,...e}),e!=null&&e.sku){const u=await ee(e.sku);e.acdl&&u&&we(u)}},listeners:()=>[te.on("locale",()=>{const{sku:e}=Q.config.getConfig();e&&ee(e)})]}),P=Q.config,{setEndpoint:Ue,setFetchGraphQlHeader:Ge,removeFetchGraphQlHeader:Me,setFetchGraphQlHeaders:Ne,fetchGraphQl:j,getConfig:Qe}=new ue().getMethods();function M(e,n){var i,a,u;const r=e?{name:e.name,sku:e.sku,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:ye(e),prices:be(e,!!n),attributes:he(e),options:De(e),optionUIDs:_e(e),url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku}:null,t=(u=(a=(i=P.getConfig())==null?void 0:i.models)==null?void 0:a.ProductDetails)==null?void 0:u.transform;return t&&r?t(r):r}function ye(e){var n;return(n=e.images)==null?void 0:n.map(r=>(r.url=r.url.replace(/^https?:/,""),r))}function he(e){var n,r;return(r=(n=e.attributes)==null?void 0:n.filter(({roles:t})=>(t==null?void 0:t.indexOf("visible_in_pdp"))!==-1))==null?void 0:r.map(({label:t,value:i,name:a})=>({id:a,label:t,value:i.toString().split(",").join(", ")}))}function De(e){const{options:n,optionUIDs:r}=e;return n==null?void 0:n.map(({id:t,title:i,required:a,multi:u,values:s})=>{var c,f;const o=(c=s==null?void 0:s[0])==null?void 0:c.__typename;let l=s==null?void 0:s[0].type;const m=((f=s==null?void 0:s[0])==null?void 0:f.__typename)==="ProductViewOptionValueProduct";return l?l=l.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):l="dropdown",{id:t,type:l,typename:o,label:i,required:a,multiple:u,items:m?ge(s,r):xe(s,r,l)}})}function ge(e,n){return e==null?void 0:e.map(({id:r,title:t,inStock:i,isDefault:a,product:u})=>({id:r,inStock:i,label:t,selected:(n==null?void 0:n.indexOf(r))>-1||a,value:r,product:u}))}function xe(e,n,r){return e==null?void 0:e.map(({id:t,title:i,inStock:a,value:u})=>({id:t,inStock:a,label:i,selected:(n==null?void 0:n.indexOf(t))>-1,value:(r==null?void 0:r.toLowerCase())==="dropdown"?t:u==null?void 0:u.replace(/^https?:/,"")}))}function be(e,n){var b,K,B,q,H;const{price:r,priceRange:t,options:i,optionUIDs:a}=e;let{__typename:u}=e;function s(){var D;const w=r.regular.amount.value,d=((D=r.final)==null?void 0:D.amount.value)??r.regular.amount.value,h=r.regular.amount.currency==="NONE"?"USD":r==null?void 0:r.regular.amount.currency;return[w,d,d,h]}function o(){var _,k,O,C,T,V,v,A,p,F,I,$;const w=(_=t==null?void 0:t.minimum)==null?void 0:_.final.amount.value,d=(k=t==null?void 0:t.maximum)==null?void 0:k.final.amount.value;let h;((C=(O=t==null?void 0:t.minimum)==null?void 0:O.regular)==null?void 0:C.amount.value)===((V=(T=t==null?void 0:t.maximum)==null?void 0:T.regular)==null?void 0:V.amount.value)&&(h=(A=(v=t==null?void 0:t.minimum)==null?void 0:v.regular)==null?void 0:A.amount.value);const D=((F=(p=t==null?void 0:t.minimum)==null?void 0:p.final)==null?void 0:F.amount.currency)==="NONE"?"USD":($=(I=t==null?void 0:t.minimum)==null?void 0:I.final)==null?void 0:$.amount.currency;return[h,w,d,D]}function l(){var O,C,T,V,v,A,p,F,I,$,X,z;let w=0,d=0;i==null||i.forEach(S=>{var W;const N=S==null?void 0:S.values;if(N&&Array.isArray(N)){const g=N.map(y=>{var L,U,Y,J;return(J=(Y=(U=(L=y==null?void 0:y.product)==null?void 0:L.price)==null?void 0:U.regular)==null?void 0:Y.amount)==null?void 0:J.value}).filter(y=>y!==void 0),G=g.length>0?Math.max(...g):0;w+=G}else w+=0;(W=S==null?void 0:S.values)==null||W.forEach(g=>{var G,y,L,U;a!=null&&a.includes(g.id)&&(d+=(U=(L=(y=(G=g==null?void 0:g.product)==null?void 0:G.price)==null?void 0:y.final)==null?void 0:L.amount)==null?void 0:U.value)})});const h=(O=t==null?void 0:t.minimum)==null?void 0:O.final.amount.value,D=(C=t==null?void 0:t.maximum)==null?void 0:C.final.amount.value;let _;((V=(T=t==null?void 0:t.minimum)==null?void 0:T.regular)==null?void 0:V.amount.value)===((A=(v=t==null?void 0:t.maximum)==null?void 0:v.regular)==null?void 0:A.amount.value)&&(_=(F=(p=t==null?void 0:t.minimum)==null?void 0:p.regular)==null?void 0:F.amount.value);const k=(($=(I=t==null?void 0:t.minimum)==null?void 0:I.final)==null?void 0:$.amount.currency)==="NONE"?"USD":(z=(X=t==null?void 0:t.minimum)==null?void 0:X.final)==null?void 0:z.amount.currency;return n&&!a?[_,h,D,k]:w===(t==null?void 0:t.maximum.regular.amount.value)?[d,d,d,k]:[_,h,D,k]}const[m,c,f,x]=u==="SimpleProductView"?s():n?l():o(),E=u==="SimpleProductView"?(b=r==null?void 0:r.roles)==null?void 0:b.includes("visible"):((B=(K=t==null?void 0:t.maximum)==null?void 0:K.roles)==null?void 0:B.includes("visible"))&&((H=(q=t==null?void 0:t.minimum)==null?void 0:q.roles)==null?void 0:H.includes("visible"));return f&&c===f?{regular:{amount:m,currency:x,variant:m&&c!==m?"strikethrough":"default"},final:{amount:f,currency:x,variant:"default"},visible:E}:{final:{minimumAmount:c,maximumAmount:f,currency:x},visible:E}}function _e(e){var r;let{optionUIDs:n}=e;return(r=e==null?void 0:e.options)==null||r.map(({values:t})=>{var a;((a=t==null?void 0:t[0])==null?void 0:a.__typename)==="ProductViewOptionValueProduct"&&!n&&(n=[],t==null||t.map(({id:u,isDefault:s})=>{s&&(n==null?void 0:n.indexOf(u))===-1&&n.push(u)}))}),n}const ke=`
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

${ke}
`,ie=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...ProductFragment
    }
}

${re}
`;function Z(e){return e.some(n=>(n==null?void 0:n.__typename)==="ProductViewOptionValueProduct")}const Se=async e=>{var a,u,s,o,l,m;const n=(s=(u=(a=P==null?void 0:P.getConfig())==null?void 0:a.models)==null?void 0:u.ProductDetails)==null?void 0:s.initialData;let r=(o=n==null?void 0:n.options)==null?void 0:o.some(c=>Z(c.values));if(n)return M(n,!!r);const{data:t}=await j(ie,{method:"GET",variables:{skus:[e]}}),i=(l=t==null?void 0:t.products)==null?void 0:l[0];return r=(m=i==null?void 0:i.options)==null?void 0:m.some(c=>Z(c.values)),M(i,!!r)},Ee=`
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
`;async function R(e,n,r){var s;if(r)return{...(s=(await j(ie,{method:"GET",variables:{skus:[e]}})).data)==null?void 0:s.products[0],optionUIDs:n};const t=Ce(n),i=Te(t,e),a=Ee.replace("# %extendedPlaceholder%",i),{data:u}=await j(a,{method:"GET",variables:{optionIds:n,sku:e}});return u}const Oe=async(e,n,r,t)=>{var f,x,E;let i;if(i=await R(e,n,t),!i)return null;if(t)return M({...i,optionUIDs:n},!0);let{products:a,refineProduct:u,...s}=i;const o=a==null?void 0:a[0],l=Ve(Object.values(s),o.options,r);if(r!=null&&r.length&&u===null){n=ve(l,n,r);const b=await R(e,n);u=b==null?void 0:b.refineProduct}const m=M({...u||o,sku:o.sku,name:o.name,externalParentId:o==null?void 0:o.externalId,options:l,optionUIDs:n,variantSku:(u==null?void 0:u.__typename)==="SimpleProductView"?u==null?void 0:u.sku:void 0}),c=(E=(x=(f=P==null?void 0:P.getConfig())==null?void 0:f.models)==null?void 0:x.ProductDetails)==null?void 0:E.fallbackData;return c?c(o,m):m};function Ce(e){if(e.length<2)return[e];const n=[];return e.forEach(r=>{const t=[];e.forEach(i=>{r!==i&&t.push(i)}),n.push(t)}),n}function Te(e,n){return e.map((r,t)=>`
          ProductOption${t}: refineProduct(
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
        `).join("")}function Ve(e,n,r){const t=Object.values(e).filter(a=>!!a).reduce((a,u)=>u.options?[...a,...u.options]:[...a],[]),i=new Map(n.map(a=>[a.id,a]));return t.forEach(a=>{r!=null&&r.includes(a.id)||i.set(a.id,a)}),[...i.values()]}function ve(e,n,r){const t=[];let i;return e.forEach(a=>{var u,s,o,l;r.includes(a.id)?i=((s=(u=a.values)==null?void 0:u.find(m=>n.includes(m==null?void 0:m.id)))==null?void 0:s.id)||((o=a.values[0])==null?void 0:o.id):i=(l=a.values[0])==null?void 0:l.id,t.push(i)}),t}const ee=async(e,n)=>{var o,l;const{models:r,anchors:t}=P.getConfig(),i=((o=oe())==null?void 0:o.optionsUIDs)??P.getConfig().optionsUIDs,a=(l=r==null?void 0:r.ProductDetails)==null?void 0:l.initialData,u=Ae(a),s=i!=null&&i.length?await Oe(e,i,(n==null?void 0:n.anchors)??t,u):await Se(e);return(n==null?void 0:n.skipDataEvent)!==!0&&te.emit("pdp/data",s),s};function Ae(e){var n;return e?(n=e==null?void 0:e.options)==null?void 0:n.some(r=>{var t;return(t=r==null?void 0:r.values)==null?void 0:t.some(i=>i.__typename==="ProductViewOptionValueProduct")}):!1}export{Ge as a,Ne as b,P as c,Se as d,Oe as e,j as f,Qe as g,ee as h,Q as i,Le as j,we as p,Me as r,Ue as s};
