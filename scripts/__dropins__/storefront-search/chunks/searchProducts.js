/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as F}from"./currency-symbol-map.js";import{FetchGraphQL as v}from"@dropins/tools/fetch-graphql.js";const y=e=>new DOMParser().parseFromString(e,"text/html").documentElement.textContent||"",z=(e,s,r)=>{const{currency:a,value:t}=e,c=t??0,n=s||F(a)||"",u=r?c*parseFloat(r):c;return`${n}${u.toFixed(2)}`},{setEndpoint:b,setFetchGraphQlHeader:x,removeFetchGraphQlHeader:A,setFetchGraphQlHeaders:H,fetchGraphQl:C,getConfig:k}=new v().getMethods(),P=e=>{const s=(e==null?void 0:e.current_page)??0,r=(e==null?void 0:e.page_size)??0,a=(e==null?void 0:e.total_pages)??0;return{current:s,size:r,total:a}};function _(e,s,r="",a="1"){var g,h,i,d;const t=(e==null?void 0:e.uid)||"",c=e.sku||"",n=y(e.name||""),u=y(e.description||""),o=((h=(g=e.price)==null?void 0:g.regular)==null?void 0:h.amount)||{value:0,currency:""},m=z(o,r,a),p=e.url||"",l=e.urlKey||"",S=((d=(i=e.images)==null?void 0:i[0])==null?void 0:d.url)||"";return{uid:t,sku:c,name:n,description:u,price:m,urlKey:l,url:p,imageUrl:S,rank:s}}const $=`
    query productSearch($phrase: String!, $size: Int = 5) {
        productSearch(phrase: $phrase, page_size: $size, filter: [], sort: []) {
            items {
                productView {
                    sku
                    name
                    description
                    url
                    urlKey
                    images {
                        label
                        url
                        roles
                    }
                    ... on SimpleProductView {
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
                        }
                    }
                }
            }
        }
    }
`,D=async(e="",s=4)=>{let r=P(),a=[];try{const{data:t}=await C($,{variables:{phrase:e,size:s}}),{items:c=[],page_info:n}=(t==null?void 0:t.productSearch)||{};a=(c??[]).reduce((o,m,p)=>{const{productView:l}=m;return l&&o.push(_(l,p)),o},[]),n&&(r=P(n))}catch(t){console.error("searchProducts error:",t)}return{pageInfo:r,products:a}};export{b as a,x as b,H as c,C as f,k as g,A as r,D as s};
