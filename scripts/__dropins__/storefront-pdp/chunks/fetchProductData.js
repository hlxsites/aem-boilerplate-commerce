/*! Copyright 2024 Adobe
All Rights Reserved. */
import{Initializer as ue,merge as oe}from"@dropins/tools/lib.js";import{events as K}from"@dropins/tools/event-bus.js";import{FetchGraphQL as se}from"@dropins/tools/fetch-graphql.js";import{s as le}from"./getProductConfigurationValues.js";function Le(e){const r=new URLSearchParams(window.location.search);Object.entries(e).forEach(([n,t])=>{t===null?r.delete(n):r.set(n,String(t))});let i=window.location.pathname;i+=`?${r.toString()}`,i+=window.location.hash,window.history.replaceState({},"",i)}function me(){const e=new URLSearchParams(window.location.search),r={};return e.forEach((i,n)=>{r[n]=i}),r}function ce(e){var r,i,n,t,a,u,o,s,l,m,c,f;return{productId:Number(e==null?void 0:e.externalId),name:e==null?void 0:e.name,sku:(e==null?void 0:e.variantSku)||(e==null?void 0:e.sku),topLevelSku:e==null?void 0:e.sku,specialToDate:void 0,specialFromDate:void 0,newToDate:void 0,newFromDate:void 0,createdAt:void 0,updatedAt:void 0,manufacturer:void 0,countryOfManufacture:void 0,categories:void 0,productType:e==null?void 0:e.productType,pricing:{regularPrice:((i=(r=e==null?void 0:e.prices)==null?void 0:r.regular)==null?void 0:i.amount)||0,minimalPrice:(t=(n=e==null?void 0:e.prices)==null?void 0:n.final)==null?void 0:t.minimumAmount,maximalPrice:(u=(a=e==null?void 0:e.prices)==null?void 0:a.final)==null?void 0:u.maximumAmount,specialPrice:(s=(o=e==null?void 0:e.prices)==null?void 0:o.final)==null?void 0:s.amount,tierPricing:void 0,currencyCode:((m=(l=e==null?void 0:e.prices)==null?void 0:l.final)==null?void 0:m.currency)||"USD"},canonicalUrl:e==null?void 0:e.url,mainImageUrl:(f=(c=e==null?void 0:e.images)==null?void 0:c[0])==null?void 0:f.url}}const fe={PRODUCT_CONTEXT:"productContext"},de={PRODUCT_PAGE_VIEW:"product-page-view"};function ne(){return window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer}function Pe(e,r){const i=ne();i.push({[e]:null}),i.push({[e]:r})}function we(e,r){ne().push(n=>{const t=n.getState?n.getState():{};n.push({event:e,eventInfo:{...t,...r}})})}function ye(e){const r=ce(e);Pe(fe.PRODUCT_CONTEXT,r),we(de.PRODUCT_PAGE_VIEW)}const q=new ue({init:async e=>{var t,a,u,o,s;const n={...{defaultLocale:"en-US",persistURLParams:!1,acdl:!1,optionsUIDs:((t=me().optionsUIDs)==null?void 0:t.split(","))||((o=(u=(a=e==null?void 0:e.models)==null?void 0:a.ProductDetails)==null?void 0:u.initialData)==null?void 0:o.optionsUIDs)},...e};if(q.config.setConfig({...n}),n!=null&&n.sku){const l=await te(n.sku,{preselectFirstOption:n.preselectFirstOption,initialData:(s=n.models)==null?void 0:s.ProductDetails.initialData});K.emit("pdp/data",l);const m={sku:n.sku,quantity:1,optionsUIDs:l==null?void 0:l.optionUIDs};le(()=>({...m})),n.acdl&&l&&ye(l)}},listeners:()=>[K.on("locale",async()=>{const{sku:e}=q.config.getConfig();if(e){const r=await te(e);K.emit("pdp/data",r)}})]}),y=q.config,{setEndpoint:Ge,setFetchGraphQlHeader:Me,removeFetchGraphQlHeader:Ne,setFetchGraphQlHeaders:Qe,fetchGraphQl:re,getConfig:je}=new se().getMethods();var H=(e=>(e.ComplexProduct="complex",e.SimpleProduct="simple",e))(H||{}),ie=(e=>(e.ComplexProductView="ComplexProductView",e.SimpleProductView="SimpleProductView",e))(ie||{});function Q(e,r){var u,o,s,l,m,c,f,d,P,k,h,v;const i=((l=(s=(o=(u=e==null?void 0:e.options)==null?void 0:u[0])==null?void 0:o.values)==null?void 0:s[0])==null?void 0:l.__typename)==="ProductViewOptionValueProduct",n=Ce(e,i,r==null?void 0:r.preselectFirstOption),t=(e==null?void 0:e.__typename)===ie.SimpleProductView?H.SimpleProduct:H.ComplexProduct,a=e?{name:e.name,sku:e.sku,isBundle:i,addToCartAllowed:e.addToCartAllowed,inStock:e.inStock,shortDescription:e.shortDescription,metaDescription:e.metaDescription,metaKeyword:e.metaKeyword,metaTitle:e.metaTitle,description:e.description,images:ge(e),prices:Se(e,i,n),attributes:he(e),options:De(e,i),optionUIDs:n,url:e.url,urlKey:e.urlKey,externalId:e.externalId,externalParentId:e.externalParentId,variantSku:e.variantSku,productType:t}:null;return oe(a,((d=(f=(c=(m=y.getConfig())==null?void 0:m.models)==null?void 0:c.ProductDetails)==null?void 0:f.transformer)==null?void 0:d.call(f,e))??((v=(h=(k=(P=y.getConfig())==null?void 0:P.models)==null?void 0:k.ProductDetails)==null?void 0:h.transform)==null?void 0:v.call(h,e)))}function ge(e){var r,i;return(i=(r=e.images)==null?void 0:r.filter(n=>{var t;return!((t=n.roles)!=null&&t.includes("hide_from_pdp"))}))==null?void 0:i.map(n=>(n.url=n.url.replace(/^https?:/,""),n))}function he(e){var r,i;return(i=(r=e.attributes)==null?void 0:r.filter(({roles:n})=>(n==null?void 0:n.indexOf("visible_in_pdp"))!==-1))==null?void 0:i.map(({label:n,value:t,name:a})=>({id:a,label:n,value:t.toString().split(",").join(", ")}))}function De(e,r){const{options:i,optionUIDs:n}=e;return i==null?void 0:i.map(({id:t,title:a,required:u,multi:o,values:s})=>{var c;const l=(c=s==null?void 0:s[0])==null?void 0:c.__typename;let m=s==null?void 0:s[0].type;return m?m=m.replace("COLOR_HEX","color").replace("TEXT","text").replace("IMAGE","image"):m="dropdown",{id:t,type:m,typename:l,label:a,required:u,multiple:o,items:r?pe(s,n):xe(s,n,m)}})}function pe(e,r){return e==null?void 0:e.map(({id:i,title:n,inStock:t,isDefault:a,product:u})=>({id:i,inStock:t,label:n,selected:(r==null?void 0:r.indexOf(i))>-1||a,value:i,product:u}))}function xe(e,r,i){return e==null?void 0:e.map(({id:n,title:t,inStock:a,value:u})=>({id:n,inStock:a,label:t,selected:(r==null?void 0:r.indexOf(n))>-1,value:(i==null?void 0:i.toLowerCase())==="dropdown"?n:u==null?void 0:u.replace(/^https?:/,"")}))}function Se(e,r,i){var h,v,X,B,z;const{price:n,priceRange:t,options:a,optionUIDs:u=i}=e;let{__typename:o}=e;function s(){var x;const D=n.regular.amount.value,w=((x=n.final)==null?void 0:x.amount.value)??n.regular.amount.value,p=n.regular.amount.currency==="NONE"?"USD":n==null?void 0:n.regular.amount.currency;return[D,w,w,p]}function l(){var C,O,E,T,_,V,I,F,A,U,$,L;const D=(C=t==null?void 0:t.minimum)==null?void 0:C.final.amount.value,w=(O=t==null?void 0:t.maximum)==null?void 0:O.final.amount.value;let p;((T=(E=t==null?void 0:t.minimum)==null?void 0:E.regular)==null?void 0:T.amount.value)===((V=(_=t==null?void 0:t.maximum)==null?void 0:_.regular)==null?void 0:V.amount.value)&&(p=(F=(I=t==null?void 0:t.minimum)==null?void 0:I.regular)==null?void 0:F.amount.value);const x=((U=(A=t==null?void 0:t.minimum)==null?void 0:A.final)==null?void 0:U.amount.currency)==="NONE"?"USD":(L=($=t==null?void 0:t.minimum)==null?void 0:$.final)==null?void 0:L.amount.currency;return[p,D,w,x]}function m(){var E,T,_,V,I,F,A,U,$,L,W,Y;let D=0,w=0;a==null||a.forEach(b=>{var J;const j=b==null?void 0:b.values;if(j&&Array.isArray(j)){const S=j.map(g=>{var G,M,Z,R;return(R=(Z=(M=(G=g==null?void 0:g.product)==null?void 0:G.price)==null?void 0:M.regular)==null?void 0:Z.amount)==null?void 0:R.value}).filter(g=>g!==void 0),N=S.length>0?Math.max(...S):0;D+=N}(J=b==null?void 0:b.values)==null||J.forEach(S=>{var N,g,G,M;u!=null&&u.includes(S.id)&&(w+=(M=(G=(g=(N=S==null?void 0:S.product)==null?void 0:N.price)==null?void 0:g.final)==null?void 0:G.amount)==null?void 0:M.value)})});const p=(E=t==null?void 0:t.minimum)==null?void 0:E.final.amount.value,x=(T=t==null?void 0:t.maximum)==null?void 0:T.final.amount.value;let C;((V=(_=t==null?void 0:t.minimum)==null?void 0:_.regular)==null?void 0:V.amount.value)===((F=(I=t==null?void 0:t.maximum)==null?void 0:I.regular)==null?void 0:F.amount.value)&&(C=(U=(A=t==null?void 0:t.minimum)==null?void 0:A.regular)==null?void 0:U.amount.value);const O=((L=($=t==null?void 0:t.minimum)==null?void 0:$.final)==null?void 0:L.amount.currency)==="NONE"?"USD":(Y=(W=t==null?void 0:t.minimum)==null?void 0:W.final)==null?void 0:Y.amount.currency;return r&&(u==null?void 0:u.length)<1?[C,p,x,O]:D===(t==null?void 0:t.maximum.regular.amount.value)?[w,w,w,O]:[C,p,x,O]}const[c,f,d,P]=o==="SimpleProductView"?s():r?m():l(),k=o==="SimpleProductView"?(h=n==null?void 0:n.roles)==null?void 0:h.includes("visible"):((X=(v=t==null?void 0:t.maximum)==null?void 0:v.roles)==null?void 0:X.includes("visible"))&&((z=(B=t==null?void 0:t.minimum)==null?void 0:B.roles)==null?void 0:z.includes("visible"));return d&&f===d?{regular:{amount:c,currency:P,variant:c&&f!==c?"strikethrough":"default"},final:{amount:d,currency:P,variant:"default"},visible:k}:{final:{minimumAmount:f,maximumAmount:d,currency:P},visible:k}}function Ce(e,r,i){var n;return r?((n=e==null?void 0:e.options)==null?void 0:n.map(({values:a})=>{var s;const u=((s=a==null?void 0:a.find(({isDefault:l})=>l))==null?void 0:s.id)??null,o=i?a[0].id:null;return u||o})).filter(a=>a!==null):e==null?void 0:e.optionUIDs}const Oe=`
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
`,ae=`
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

${Oe}
`,be=`
query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
        ...ProductFragment
    }
}

${ae}
`,ke=async(e,r)=>{var a,u,o,s;const i=(o=(u=(a=y==null?void 0:y.getConfig())==null?void 0:a.models)==null?void 0:u.ProductDetails)==null?void 0:o.initialData;if(i)return Q(i);const{data:n}=await re(be,{method:"GET",variables:{skus:[e]}}),t=(s=n==null?void 0:n.products)==null?void 0:s[0];return r!=null&&r.optionsUIDs&&(t.optionUIDs=r.optionsUIDs),Q(t,{preselectFirstOption:r==null?void 0:r.preselectFirstOption})},ve=`
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

${ae}
`;async function ee(e,r){const i=Te(r),n=_e(i,e),t=ve.replace("# %extendedPlaceholder%",n),{data:a}=await re(t,{method:"GET",variables:{optionIds:r,sku:e}});return a}const Ee=async(e,r,i)=>{var c,f,d;const n=await ee(e,r);if(!n)return null;let{products:t,refineProduct:a,...u}=n;const o=t==null?void 0:t[0],s=Ve(Object.values(u),o.options,i);if(i!=null&&i.length&&a===null){r=Ie(s,r,i);const P=await ee(e,r);a=P==null?void 0:P.refineProduct}const l=Q({...a||o,sku:o.sku,name:o.name,externalParentId:o==null?void 0:o.externalId,options:s,optionUIDs:r,variantSku:(a==null?void 0:a.__typename)==="SimpleProductView"?a==null?void 0:a.sku:void 0}),m=(d=(f=(c=y==null?void 0:y.getConfig())==null?void 0:c.models)==null?void 0:f.ProductDetails)==null?void 0:d.fallbackData;return m?m(o,l):l};function Te(e){if(e.length<2)return[e];const r=[];return e.forEach(i=>{const n=[];e.forEach(t=>{i!==t&&n.push(t)}),r.push(n)}),r}function _e(e,r){return e.map((i,n)=>`
          ProductOption${n}: refineProduct(
            optionIds: [
              ${i.map(t=>`"${t}"`).join(", ")}
            ]
            sku: "${r}"
          ) {
            ... on ComplexProductView {
              options {
                ...ProductOptionFragment
              }
            }
          }
        `).join("")}function Ve(e,r=[],i){const n=Object.values(e).filter(a=>!!a).reduce((a,u)=>u.options?[...a,...u.options]:[...a],[]),t=new Map(r.map(a=>[a.id,a]));return n.forEach(a=>{i!=null&&i.includes(a.id)||t.set(a.id,a)}),[...t.values()]}function Ie(e,r,i){const n=[];let t;return e.forEach(a=>{var u,o,s,l;i.includes(a.id)?t=((o=(u=a.values)==null?void 0:u.find(m=>r.includes(m==null?void 0:m.id)))==null?void 0:o.id)||((s=a.values[0])==null?void 0:s.id):t=(l=a.values[0])==null?void 0:l.id,n.push(t)}),n}const te=async(e,r)=>{const{anchors:i,optionsUIDs:n}=y.getConfig(),{optionsUIDs:t=n,anchors:a=i,preselectFirstOption:u,initialData:o,isBundle:s}=r??{};return o?Q(o):!s&&t?await Ee(e,t,a):await ke(e,{preselectFirstOption:u,optionsUIDs:t})};export{Me as a,Qe as b,y as c,ke as d,Ee as e,re as f,je as g,te as h,q as i,Le as j,ye as p,Ne as r,Ge as s};
