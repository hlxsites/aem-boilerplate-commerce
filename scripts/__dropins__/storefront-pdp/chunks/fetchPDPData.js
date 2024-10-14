import{events as te}from"@dropins/tools/event-bus.js";import{Initializer as ae}from"@dropins/tools/lib.js";import{FetchGraphQL as ue}from"@dropins/tools/fetch-graphql.js";import{s as oe,g as se}from"./getProductConfigurationValues.js";function Ue(e){const n=new URLSearchParams(window.location.search);Object.entries(e).forEach(([t,i])=>{i===null?n.delete(t):n.set(t,String(i))});let r=window.location.pathname;r+=`?${n.toString()}`,r+=window.location.hash,window.history.replaceState({},"",r)}function le(){const e=new URLSearchParams(window.location.search),n={};return e.forEach((r,t)=>{n[t]=r}),n}function me(e){var n,r,t,i,a,u,o,s,l,m,c,f;return{productId:Number(e==null?void 0:e.externalId),name:e==null?void 0:e.name,sku:(e==null?void 0:e.variantSku)||(e==null?void 0:e.sku),topLevelSku:e==null?void 0:e.sku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:void 0,pricing:{regularPrice:((r=(n=e==null?void 0:e.prices)==null?void 0:n.regular)==null?void 0:r.amount)||0,minimalPrice:(i=(t=e==null?void 0:e.prices)==null?void 0:t.final)==null?void 0:i.minimumAmount,maximalPrice:(u=(a=e==null?void 0:e.prices)==null?void 0:a.final)==null?void 0:u.maximumAmount,specialPrice:(s=(o=e==null?void 0:e.prices)==null?void 0:o.final)==null?void 0:s.amount,tierPricing:void 0,currencyCode:((m=(l=e==null?void 0:e.prices)==null?void 0:l.final)==null?void 0:m.currency)||"USD"},canonicalUrl:e==null?void 0:e.url,mainImageUrl:(f=(c=e==null?void 0:e.images)==null?void 0:c[0])==null?void 0:f.url}}const ce={PRODUCT_CONTEXT:"productContext"},fe={PRODUCT_PAGE_VIEW:"product-page-view"};function ne(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function de(e,n){const r=ne();r.push({[e]:null}),r.push({[e]:n})}function Pe(e,n){ne().push(t=>{const i=t.getState?t.getState():{};t.push({event:e,eventInfo:{...i,...n}})})}function we(e){const n=me(e);de(ce.PRODUCT_CONTEXT,n),Pe(fe.PRODUCT_PAGE_VIEW)}const Q=new ae({init:async e=>{var t,i,a,u;const r={defaultLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:((t=le().optionsUIDs)==null?void 0:t.split(","))||((u=(a=(i=e==null?void 0:e.models)==null?void 0:i.ProductDetails)==null?void 0:a.initialData)==null?void 0:u.optionsUIDs)};if(Q.config.setConfig({...r,...e}),e!=null&&e.sku){const o={sku:e.sku,quantity:1,optionsUIDs:e.optionsUIDs};oe(()=>({...o}));const s=await ee(e.sku);e.acdl&&s&&we(s)}},listeners:()=>[te.on("locale",()=>{const{sku:e}=Q.config.getConfig();e&&ee(e)})]}),P=Q.config,{setEndpoint:Le,setFetchGraphQlHeader:Ge,removeFetchGraphQlHeader:Me,setFetchGraphQlHeaders:Ne,fetchGraphQl:j,getConfig:Qe}=new ue().getMethods();function M(e,n){var i,a,u;const r=e?{name:e.name,sku:e.sku,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:ye(e),prices:xe(e,!!n),attributes:he(e),options:ge(e),optionUIDs:be(e),url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku}:null,t=(u=(a=(i=P.getConfig())==null?void 0:i.models)==null?void 0:a.ProductDetails)==null?void 0:u.transform;return t&&r?t(r):r}function ye(e){var n,r;return(r=(n=e.images)==null?void 0:n.filter(t=>{var i;return!((i=t.roles)!=null&&i.includes("hide_from_pdp"))}))==null?void 0:r.map(t=>(t.url=t.url.replace(/^https?:/,""),t))}function he(e){var n,r;return(r=(n=e.attributes)==null?void 0:n.filter(({roles:t})=>(t==null?void 0:t.indexOf("visible_in_pdp"))!==-1))==null?void 0:r.map(({label:t,value:i,name:a})=>({id:a,label:t,value:i.toString().split(",").join(", ")}))}function ge(e){const{options:n,optionUIDs:r}=e;return n==null?void 0:n.map(({id:t,title:i,required:a,multi:u,values:o})=>{var c,f;const s=(c=o==null?void 0:o[0])==null?void 0:c.__typename;let l=o==null?void 0:o[0].type;const m=((f=o==null?void 0:o[0])==null?void 0:f.__typename)==="ProductViewOptionValueProduct";return l?l=l.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):l="dropdown",{id:t,type:l,typename:s,label:i,required:a,multiple:u,items:m?De(o,r):_e(o,r,l)}})}function De(e,n){return e==null?void 0:e.map(({id:r,title:t,inStock:i,isDefault:a,product:u})=>({id:r,inStock:i,label:t,selected:(n==null?void 0:n.indexOf(r))>-1||a,value:r,product:u}))}function _e(e,n,r){return e==null?void 0:e.map(({id:t,title:i,inStock:a,value:u})=>({id:t,inStock:a,label:i,selected:(n==null?void 0:n.indexOf(t))>-1,value:(r==null?void 0:r.toLowerCase())==="dropdown"?t:u==null?void 0:u.replace(/^https?:/,"")}))}function xe(e,n){var x,K,B,q,H;const{price:r,priceRange:t,options:i,optionUIDs:a}=e;let{__typename:u}=e;function o(){var g;const w=r.regular.amount.value,d=((g=r.final)==null?void 0:g.amount.value)??r.regular.amount.value,h=r.regular.amount.currency==="NONE"?"USD":r==null?void 0:r.regular.amount.currency;return[w,d,d,h]}function s(){var b,S,O,C,T,V,v,p,A,I,F,$;const w=(b=t==null?void 0:t.minimum)==null?void 0:b.final.amount.value,d=(S=t==null?void 0:t.maximum)==null?void 0:S.final.amount.value;let h;((C=(O=t==null?void 0:t.minimum)==null?void 0:O.regular)==null?void 0:C.amount.value)===((V=(T=t==null?void 0:t.maximum)==null?void 0:T.regular)==null?void 0:V.amount.value)&&(h=(p=(v=t==null?void 0:t.minimum)==null?void 0:v.regular)==null?void 0:p.amount.value);const g=((I=(A=t==null?void 0:t.minimum)==null?void 0:A.final)==null?void 0:I.amount.currency)==="NONE"?"USD":($=(F=t==null?void 0:t.minimum)==null?void 0:F.final)==null?void 0:$.amount.currency;return[h,w,d,g]}function l(){var O,C,T,V,v,p,A,I,F,$,X,z;let w=0,d=0;i==null||i.forEach(k=>{var W;const N=k==null?void 0:k.values;if(N&&Array.isArray(N)){const D=N.map(y=>{var U,L,Y,J;return(J=(Y=(L=(U=y==null?void 0:y.product)==null?void 0:U.price)==null?void 0:L.regular)==null?void 0:Y.amount)==null?void 0:J.value}).filter(y=>y!==void 0),G=D.length>0?Math.max(...D):0;w+=G}else w+=0;(W=k==null?void 0:k.values)==null||W.forEach(D=>{var G,y,U,L;a!=null&&a.includes(D.id)&&(d+=(L=(U=(y=(G=D==null?void 0:D.product)==null?void 0:G.price)==null?void 0:y.final)==null?void 0:U.amount)==null?void 0:L.value)})});const h=(O=t==null?void 0:t.minimum)==null?void 0:O.final.amount.value,g=(C=t==null?void 0:t.maximum)==null?void 0:C.final.amount.value;let b;((V=(T=t==null?void 0:t.minimum)==null?void 0:T.regular)==null?void 0:V.amount.value)===((p=(v=t==null?void 0:t.maximum)==null?void 0:v.regular)==null?void 0:p.amount.value)&&(b=(I=(A=t==null?void 0:t.minimum)==null?void 0:A.regular)==null?void 0:I.amount.value);const S=(($=(F=t==null?void 0:t.minimum)==null?void 0:F.final)==null?void 0:$.amount.currency)==="NONE"?"USD":(z=(X=t==null?void 0:t.minimum)==null?void 0:X.final)==null?void 0:z.amount.currency;return n&&!a?[b,h,g,S]:w===(t==null?void 0:t.maximum.regular.amount.value)?[d,d,d,S]:[b,h,g,S]}const[m,c,f,_]=u==="SimpleProductView"?o():n?l():s(),E=u==="SimpleProductView"?(x=r==null?void 0:r.roles)==null?void 0:x.includes("visible"):((B=(K=t==null?void 0:t.maximum)==null?void 0:K.roles)==null?void 0:B.includes("visible"))&&((H=(q=t==null?void 0:t.minimum)==null?void 0:q.roles)==null?void 0:H.includes("visible"));return f&&c===f?{regular:{amount:m,currency:_,variant:m&&c!==m?"strikethrough":"default"},final:{amount:f,currency:_,variant:"default"},visible:E}:{final:{minimumAmount:c,maximumAmount:f,currency:_},visible:E}}function be(e){var r;let{optionUIDs:n}=e;return(r=e==null?void 0:e.options)==null||r.map(({values:t})=>{var a;((a=t==null?void 0:t[0])==null?void 0:a.__typename)==="ProductViewOptionValueProduct"&&!n&&(n=[],t==null||t.map(({id:u,isDefault:o})=>{o&&(n==null?void 0:n.indexOf(u))===-1&&n.push(u)}))}),n}const Se=`
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

${Se}
`,ie=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...ProductFragment
    }
}

${re}
`;function Z(e){return e.some(n=>(n==null?void 0:n.__typename)==="ProductViewOptionValueProduct")}const ke=async e=>{var a,u,o,s,l,m;const n=(o=(u=(a=P==null?void 0:P.getConfig())==null?void 0:a.models)==null?void 0:u.ProductDetails)==null?void 0:o.initialData;let r=(s=n==null?void 0:n.options)==null?void 0:s.some(c=>Z(c.values));if(n)return M(n,!!r);const{data:t}=await j(ie,{method:"GET",variables:{skus:[e]}}),i=(l=t==null?void 0:t.products)==null?void 0:l[0];return r=(m=i==null?void 0:i.options)==null?void 0:m.some(c=>Z(c.values)),M(i,!!r)},Ee=`
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
`;async function R(e,n,r){var o;if(r)return{...(o=(await j(ie,{method:"GET",variables:{skus:[e]}})).data)==null?void 0:o.products[0],optionUIDs:n};const t=Ce(n),i=Te(t,e),a=Ee.replace("# %extendedPlaceholder%",i),{data:u}=await j(a,{method:"GET",variables:{optionIds:n,sku:e}});return u}const Oe=async(e,n,r,t)=>{var f,_,E;let i;if(i=await R(e,n,t),!i)return null;if(t)return M({...i,optionUIDs:n},!0);let{products:a,refineProduct:u,...o}=i;const s=a==null?void 0:a[0],l=Ve(Object.values(o),s.options,r);if(r!=null&&r.length&&u===null){n=ve(l,n,r);const x=await R(e,n);u=x==null?void 0:x.refineProduct}const m=M({...u||s,sku:s.sku,name:s.name,externalParentId:s==null?void 0:s.externalId,options:l,optionUIDs:n,variantSku:(u==null?void 0:u.__typename)==="SimpleProductView"?u==null?void 0:u.sku:void 0}),c=(E=(_=(f=P==null?void 0:P.getConfig())==null?void 0:f.models)==null?void 0:_.ProductDetails)==null?void 0:E.fallbackData;return c?c(s,m):m};function Ce(e){if(e.length<2)return[e];const n=[];return e.forEach(r=>{const t=[];e.forEach(i=>{r!==i&&t.push(i)}),n.push(t)}),n}function Te(e,n){return e.map((r,t)=>`
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
        `).join("")}function Ve(e,n,r){const t=Object.values(e).filter(a=>!!a).reduce((a,u)=>u.options?[...a,...u.options]:[...a],[]),i=new Map(n.map(a=>[a.id,a]));return t.forEach(a=>{r!=null&&r.includes(a.id)||i.set(a.id,a)}),[...i.values()]}function ve(e,n,r){const t=[];let i;return e.forEach(a=>{var u,o,s,l;r.includes(a.id)?i=((o=(u=a.values)==null?void 0:u.find(m=>n.includes(m==null?void 0:m.id)))==null?void 0:o.id)||((s=a.values[0])==null?void 0:s.id):i=(l=a.values[0])==null?void 0:l.id,t.push(i)}),t}const ee=async(e,n)=>{var s,l;const{models:r,anchors:t}=P.getConfig(),i=((s=se())==null?void 0:s.optionsUIDs)??P.getConfig().optionsUIDs,a=(l=r==null?void 0:r.ProductDetails)==null?void 0:l.initialData,u=pe(a),o=a??(i!=null&&i.length?await Oe(e,i,(n==null?void 0:n.anchors)??t,u):await ke(e));return(n==null?void 0:n.skipDataEvent)!==!0&&te.emit("pdp/data",o),o};function pe(e){var n;return e?(n=e==null?void 0:e.options)==null?void 0:n.some(r=>{var t;return(t=r==null?void 0:r.values)==null?void 0:t.some(i=>i.__typename==="ProductViewOptionValueProduct")}):!1}export{Ge as a,Ne as b,P as c,ke as d,Oe as e,j as f,Qe as g,ee as h,Q as i,Ue as j,we as p,Me as r,Le as s};
