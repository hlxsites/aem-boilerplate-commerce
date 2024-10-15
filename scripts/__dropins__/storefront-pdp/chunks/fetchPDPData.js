import{events as te}from"@dropins/tools/event-bus.js";import{Initializer as ae}from"@dropins/tools/lib.js";import{FetchGraphQL as ue}from"@dropins/tools/fetch-graphql.js";import{s as oe,g as se}from"./getProductConfigurationValues.js";function Ue(e){const n=new URLSearchParams(window.location.search);Object.entries(e).forEach(([t,i])=>{i===null?n.delete(t):n.set(t,String(i))});let r=window.location.pathname;r+=`?${n.toString()}`,r+=window.location.hash,window.history.replaceState({},"",r)}function le(){const e=new URLSearchParams(window.location.search),n={};return e.forEach((r,t)=>{n[t]=r}),n}function me(e){var n,r,t,i,a,u,o,s,l,m,c,f;return{productId:Number(e==null?void 0:e.externalId),name:e==null?void 0:e.name,sku:(e==null?void 0:e.variantSku)||(e==null?void 0:e.sku),topLevelSku:e==null?void 0:e.sku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:void 0,pricing:{regularPrice:((r=(n=e==null?void 0:e.prices)==null?void 0:n.regular)==null?void 0:r.amount)||0,minimalPrice:(i=(t=e==null?void 0:e.prices)==null?void 0:t.final)==null?void 0:i.minimumAmount,maximalPrice:(u=(a=e==null?void 0:e.prices)==null?void 0:a.final)==null?void 0:u.maximumAmount,specialPrice:(s=(o=e==null?void 0:e.prices)==null?void 0:o.final)==null?void 0:s.amount,tierPricing:void 0,currencyCode:((m=(l=e==null?void 0:e.prices)==null?void 0:l.final)==null?void 0:m.currency)||"USD"},canonicalUrl:e==null?void 0:e.url,mainImageUrl:(f=(c=e==null?void 0:e.images)==null?void 0:c[0])==null?void 0:f.url}}const ce={PRODUCT_CONTEXT:"productContext"},fe={PRODUCT_PAGE_VIEW:"product-page-view"};function ne(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function de(e,n){const r=ne();r.push({[e]:null}),r.push({[e]:n})}function Pe(e,n){ne().push(t=>{const i=t.getState?t.getState():{};t.push({event:e,eventInfo:{...i,...n}})})}function we(e){const n=me(e);de(ce.PRODUCT_CONTEXT,n),Pe(fe.PRODUCT_PAGE_VIEW)}const Q=new ae({init:async e=>{var i,a,u,o;const t={...{defaultLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:((i=le().optionsUIDs)==null?void 0:i.split(","))||((o=(u=(a=e==null?void 0:e.models)==null?void 0:a.ProductDetails)==null?void 0:u.initialData)==null?void 0:o.optionsUIDs)},...e};if(Q.config.setConfig({...t}),t!=null&&t.sku){const s={sku:t.sku,quantity:1,optionsUIDs:t.optionsUIDs};oe(()=>({...s}));const l=await ee(t.sku);t.acdl&&l&&we(l)}},listeners:()=>[te.on("locale",()=>{const{sku:e}=Q.config.getConfig();e&&ee(e)})]}),P=Q.config,{setEndpoint:Le,setFetchGraphQlHeader:Ge,removeFetchGraphQlHeader:Me,setFetchGraphQlHeaders:Ne,fetchGraphQl:j,getConfig:Qe}=new ue().getMethods();function M(e,n){var i,a,u;const r=e?{name:e.name,sku:e.sku,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:ye(e),prices:be(e,!!n),attributes:ge(e),options:he(e),optionUIDs:Se(e),url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku}:null,t=(u=(a=(i=P.getConfig())==null?void 0:i.models)==null?void 0:a.ProductDetails)==null?void 0:u.transform;return t&&r?t(r):r}function ye(e){var n,r;return(r=(n=e.images)==null?void 0:n.filter(t=>{var i;return!((i=t.roles)!=null&&i.includes("hide_from_pdp"))}))==null?void 0:r.map(t=>(t.url=t.url.replace(/^https?:/,""),t))}function ge(e){var n,r;return(r=(n=e.attributes)==null?void 0:n.filter(({roles:t})=>(t==null?void 0:t.indexOf("visible_in_pdp"))!==-1))==null?void 0:r.map(({label:t,value:i,name:a})=>({id:a,label:t,value:i.toString().split(",").join(", ")}))}function he(e){const{options:n,optionUIDs:r}=e;return n==null?void 0:n.map(({id:t,title:i,required:a,multi:u,values:o})=>{var c,f;const s=(c=o==null?void 0:o[0])==null?void 0:c.__typename;let l=o==null?void 0:o[0].type;const m=((f=o==null?void 0:o[0])==null?void 0:f.__typename)==="ProductViewOptionValueProduct";return l?l=l.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):l="dropdown",{id:t,type:l,typename:s,label:i,required:a,multiple:u,items:m?De(o,r):xe(o,r,l)}})}function De(e,n){return e==null?void 0:e.map(({id:r,title:t,inStock:i,isDefault:a,product:u})=>({id:r,inStock:i,label:t,selected:(n==null?void 0:n.indexOf(r))>-1||a,value:r,product:u}))}function xe(e,n,r){return e==null?void 0:e.map(({id:t,title:i,inStock:a,value:u})=>({id:t,inStock:a,label:i,selected:(n==null?void 0:n.indexOf(t))>-1,value:(r==null?void 0:r.toLowerCase())==="dropdown"?t:u==null?void 0:u.replace(/^https?:/,"")}))}function be(e,n){var b,K,B,q,H;const{price:r,priceRange:t,options:i,optionUIDs:a}=e;let{__typename:u}=e;function o(){var h;const w=r.regular.amount.value,d=((h=r.final)==null?void 0:h.amount.value)??r.regular.amount.value,g=r.regular.amount.currency==="NONE"?"USD":r==null?void 0:r.regular.amount.currency;return[w,d,d,g]}function s(){var S,k,O,_,T,V,v,p,A,I,F,$;const w=(S=t==null?void 0:t.minimum)==null?void 0:S.final.amount.value,d=(k=t==null?void 0:t.maximum)==null?void 0:k.final.amount.value;let g;((_=(O=t==null?void 0:t.minimum)==null?void 0:O.regular)==null?void 0:_.amount.value)===((V=(T=t==null?void 0:t.maximum)==null?void 0:T.regular)==null?void 0:V.amount.value)&&(g=(p=(v=t==null?void 0:t.minimum)==null?void 0:v.regular)==null?void 0:p.amount.value);const h=((I=(A=t==null?void 0:t.minimum)==null?void 0:A.final)==null?void 0:I.amount.currency)==="NONE"?"USD":($=(F=t==null?void 0:t.minimum)==null?void 0:F.final)==null?void 0:$.amount.currency;return[g,w,d,h]}function l(){var O,_,T,V,v,p,A,I,F,$,X,z;let w=0,d=0;i==null||i.forEach(C=>{var W;const N=C==null?void 0:C.values;if(N&&Array.isArray(N)){const D=N.map(y=>{var U,L,Y,J;return(J=(Y=(L=(U=y==null?void 0:y.product)==null?void 0:U.price)==null?void 0:L.regular)==null?void 0:Y.amount)==null?void 0:J.value}).filter(y=>y!==void 0),G=D.length>0?Math.max(...D):0;w+=G}else w+=0;(W=C==null?void 0:C.values)==null||W.forEach(D=>{var G,y,U,L;a!=null&&a.includes(D.id)&&(d+=(L=(U=(y=(G=D==null?void 0:D.product)==null?void 0:G.price)==null?void 0:y.final)==null?void 0:U.amount)==null?void 0:L.value)})});const g=(O=t==null?void 0:t.minimum)==null?void 0:O.final.amount.value,h=(_=t==null?void 0:t.maximum)==null?void 0:_.final.amount.value;let S;((V=(T=t==null?void 0:t.minimum)==null?void 0:T.regular)==null?void 0:V.amount.value)===((p=(v=t==null?void 0:t.maximum)==null?void 0:v.regular)==null?void 0:p.amount.value)&&(S=(I=(A=t==null?void 0:t.minimum)==null?void 0:A.regular)==null?void 0:I.amount.value);const k=(($=(F=t==null?void 0:t.minimum)==null?void 0:F.final)==null?void 0:$.amount.currency)==="NONE"?"USD":(z=(X=t==null?void 0:t.minimum)==null?void 0:X.final)==null?void 0:z.amount.currency;return n&&!a?[S,g,h,k]:w===(t==null?void 0:t.maximum.regular.amount.value)?[d,d,d,k]:[S,g,h,k]}const[m,c,f,x]=u==="SimpleProductView"?o():n?l():s(),E=u==="SimpleProductView"?(b=r==null?void 0:r.roles)==null?void 0:b.includes("visible"):((B=(K=t==null?void 0:t.maximum)==null?void 0:K.roles)==null?void 0:B.includes("visible"))&&((H=(q=t==null?void 0:t.minimum)==null?void 0:q.roles)==null?void 0:H.includes("visible"));return f&&c===f?{regular:{amount:m,currency:x,variant:m&&c!==m?"strikethrough":"default"},final:{amount:f,currency:x,variant:"default"},visible:E}:{final:{minimumAmount:c,maximumAmount:f,currency:x},visible:E}}function Se(e){var r;let{optionUIDs:n}=e;return(r=e==null?void 0:e.options)==null||r.map(({values:t})=>{var a;((a=t==null?void 0:t[0])==null?void 0:a.__typename)==="ProductViewOptionValueProduct"&&!n&&(n=[],t==null||t.map(({id:u,isDefault:o})=>{o&&(n==null?void 0:n.indexOf(u))===-1&&n.push(u)}))}),n}const ke=`
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
`;function Z(e){return e.some(n=>(n==null?void 0:n.__typename)==="ProductViewOptionValueProduct")}const Ce=async e=>{var a,u,o,s,l,m;const n=(o=(u=(a=P==null?void 0:P.getConfig())==null?void 0:a.models)==null?void 0:u.ProductDetails)==null?void 0:o.initialData;let r=(s=n==null?void 0:n.options)==null?void 0:s.some(c=>Z(c.values));if(n)return M(n,!!r);const{data:t}=await j(ie,{method:"GET",variables:{skus:[e]}}),i=(l=t==null?void 0:t.products)==null?void 0:l[0];return r=(m=i==null?void 0:i.options)==null?void 0:m.some(c=>Z(c.values)),M(i,!!r)},Ee=`
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
`;async function R(e,n,r){var o;if(r)return{...(o=(await j(ie,{method:"GET",variables:{skus:[e]}})).data)==null?void 0:o.products[0],optionUIDs:n};const t=_e(n),i=Te(t,e),a=Ee.replace("# %extendedPlaceholder%",i),{data:u}=await j(a,{method:"GET",variables:{optionIds:n,sku:e}});return u}const Oe=async(e,n,r,t)=>{var f,x,E;let i;if(i=await R(e,n,t),!i)return null;if(t)return M({...i,optionUIDs:n},!0);let{products:a,refineProduct:u,...o}=i;const s=a==null?void 0:a[0],l=Ve(Object.values(o),s.options,r);if(r!=null&&r.length&&u===null){n=ve(l,n,r);const b=await R(e,n);u=b==null?void 0:b.refineProduct}const m=M({...u||s,sku:s.sku,name:s.name,externalParentId:s==null?void 0:s.externalId,options:l,optionUIDs:n,variantSku:(u==null?void 0:u.__typename)==="SimpleProductView"?u==null?void 0:u.sku:void 0}),c=(E=(x=(f=P==null?void 0:P.getConfig())==null?void 0:f.models)==null?void 0:x.ProductDetails)==null?void 0:E.fallbackData;return c?c(s,m):m};function _e(e){if(e.length<2)return[e];const n=[];return e.forEach(r=>{const t=[];e.forEach(i=>{r!==i&&t.push(i)}),n.push(t)}),n}function Te(e,n){return e.map((r,t)=>`
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
        `).join("")}function Ve(e,n,r){const t=Object.values(e).filter(a=>!!a).reduce((a,u)=>u.options?[...a,...u.options]:[...a],[]),i=new Map(n.map(a=>[a.id,a]));return t.forEach(a=>{r!=null&&r.includes(a.id)||i.set(a.id,a)}),[...i.values()]}function ve(e,n,r){const t=[];let i;return e.forEach(a=>{var u,o,s,l;r.includes(a.id)?i=((o=(u=a.values)==null?void 0:u.find(m=>n.includes(m==null?void 0:m.id)))==null?void 0:o.id)||((s=a.values[0])==null?void 0:s.id):i=(l=a.values[0])==null?void 0:l.id,t.push(i)}),t}const ee=async(e,n)=>{var s,l;const{models:r,anchors:t}=P.getConfig(),i=((s=se())==null?void 0:s.optionsUIDs)??P.getConfig().optionsUIDs,a=(l=r==null?void 0:r.ProductDetails)==null?void 0:l.initialData,u=pe(a),o=a??(i!=null&&i.length?await Oe(e,i,(n==null?void 0:n.anchors)??t,u):await Ce(e));return(n==null?void 0:n.skipDataEvent)!==!0&&te.emit("pdp/data",o),o};function pe(e){var n;return e?(n=e==null?void 0:e.options)==null?void 0:n.some(r=>{var t;return(t=r==null?void 0:r.values)==null?void 0:t.some(i=>i.__typename==="ProductViewOptionValueProduct")}):!1}export{Ge as a,Ne as b,P as c,Ce as d,Oe as e,j as f,Qe as g,ee as h,Q as i,Ue as j,we as p,Me as r,Le as s};
