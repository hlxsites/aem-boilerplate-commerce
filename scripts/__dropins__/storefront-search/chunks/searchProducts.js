/*! Copyright 2025 Adobe
All Rights Reserved. */
import{a as p}from"./currency-symbol-map.js";import{FetchGraphQL as g}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:v,setFetchGraphQlHeader:x,removeFetchGraphQlHeader:I,setFetchGraphQlHeaders:F,fetchGraphQl:_,getConfig:b}=new g().getMethods(),i=e=>({current:(e==null?void 0:e.current_page)??0,size:(e==null?void 0:e.page_size)??0,total:(e==null?void 0:e.total_pages)??0}),h=e=>{var r,c,t;let a=null;return e.thumbnail?a=(r=e.thumbnail)==null?void 0:r.url:e.small_image?a=(c=e.small_image)==null?void 0:c.url:e.image&&(a=(t=e.image)==null?void 0:t.url),a??""},d=e=>{const r=new DOMParser().parseFromString(e,"text/html").documentElement.textContent;return r||""},f=(e,a,r)=>{let c=e.price_range.minimum_price.regular_price.currency;a?c=a:c=p(c)??"";const t=e.price_range.minimum_price.final_price.value??0,n=r?t*parseFloat(r):t;return!t===null?"":`${c}${n.toFixed(2)}`},y=(e,a,r="",c="1")=>{var t;return{uid:e.uid,sku:e.sku??"",image:h(e),name:d(e.name??""),price:f(e,r,c),url:e.canonical_url??"",imageUrl:((t=e.image)==null?void 0:t.url)??"",rank:a}},$=`
    query ProductSearch(
        $phrase: String!
        $size: Int = 20
        $current: Int = 1
        $filter: [SearchClauseInput!]
        $sort: [ProductSearchSortInput!]
    ) {
        productSearch(phrase: $phrase, page_size: $size, current_page: $current, filter: $filter, sort: $sort) {
            page_info {
                current_page
                page_size
                total_pages
            }
            items {
                product {
                    uid
                    sku
                    name
                    canonical_url
                    small_image {
                        url
                    }
                    image {
                        url
                    }
                    thumbnail {
                        url
                    }
                    price_range {
                        minimum_price {
                            fixed_product_taxes {
                                amount {
                                    value
                                    currency
                                }
                                label
                            }
                            regular_price {
                                value
                                currency
                            }
                            final_price {
                                value
                                currency
                            }
                            discount {
                                percent_off
                                amount_off
                            }
                        }
                        maximum_price {
                            fixed_product_taxes {
                                amount {
                                    value
                                    currency
                                }
                                label
                            }
                            regular_price {
                                value
                                currency
                            }
                            final_price {
                                value
                                currency
                            }
                            discount {
                                percent_off
                                amount_off
                            }
                        }
                    }
                }
                productView {
                    urlKey
                }
            }
        }
    }
`,w=async(e,a=4)=>{const r=[],c=i();try{const t=await _($,{variables:{phrase:e,size:a}});if(!t.data.productSearch.items)return{pageInfo:c,products:r};const{page_info:n,items:o}=t.data.productSearch;return o.forEach((u,m)=>{var l;if(!u)return;const s=y(u.product,m);s.urlKey=((l=u.productView)==null?void 0:l.urlKey)??"",r.push(s)}),{pageInfo:i(n),products:r}}catch(t){return console.error(t),{pageInfo:c,products:r}}};export{v as a,F as b,x as c,_ as f,b as g,I as r,w as s};
