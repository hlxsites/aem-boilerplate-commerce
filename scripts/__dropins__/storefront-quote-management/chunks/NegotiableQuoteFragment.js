/*! Copyright 2025 Adobe
All Rights Reserved. */
const l={requestQuote:!1,editQuote:!1,deleteQuote:!1},o={authenticated:!1,permissions:l},p=new Proxy(o,{get:(t,a)=>t[a],set:(t,a,n)=>(t[a]=n,!0)});function i(t){var a,n;return{uid:t.uid,name:t.name,createdAt:t.created_at,updatedAt:t.updated_at,status:t.status,buyer:{firstname:t.buyer.firstname,lastname:t.buyer.lastname},comments:(a=t.comments)==null?void 0:a.map(e=>({uid:e.uid,createdAt:e.created_at,author:{firstname:e.author.firstname,lastname:e.author.lastname}})),items:(n=t.items)==null?void 0:n.map(e=>({product:{uid:e.product.uid,sku:e.product.sku,name:e.product.name,templateId:e.product.template_id,templateName:e.product.template_name,priceRange:{maximumPrice:{regularPrice:{value:e.product.price_range.maximum_price.regular_price.value}}}},quantity:e.quantity,prices:{subtotalExcludingTax:{value:t.prices.subtotal_excluding_tax.value},subtotalIncludingTax:{value:t.prices.subtotal_including_tax.value},subtotalWithDiscountExcludingTax:{value:t.prices.subtotal_with_discount_excluding_tax.value},grandTotal:{value:t.prices.grand_total.value,currency:t.prices.grand_total.currency}}}))}}function g(t){if(!t||!t.data||!t.data.requestNegotiableQuote)return null;const a=t.data.requestNegotiableQuote.quote;return i(a)}function m(t){var e;if(!t)return null;const a={items:((e=t.items)==null?void 0:e.filter(r=>r==null?void 0:r.uid).map(i))||[],pageInfo:{currentPage:t.page_info.current_page,pageSize:t.page_info.page_size,totalPages:t.page_info.total_pages},totalCount:t.total_count,sortFields:t.sort_fields?{default:t.sort_fields.default,options:t.sort_fields.options}:void 0},n=c(a);return{...a,paginationInfo:n||void 0}}function c(t){if(!(t!=null&&t.pageInfo)||!t.totalCount)return null;const{currentPage:a,pageSize:n,totalPages:e}=t.pageInfo,{totalCount:r}=t,s=r>0?(a-1)*n+1:0,u=Math.min(a*n,r);return{currentPage:a,totalCount:r,pageSize:n,startItem:s,endItem:u,totalPages:e,pageSizeOptions:[20,30,50,100,200]}}const _=()=>[20,30,50,100,200],f=`
  fragment NegotiableQuoteFragment on NegotiableQuote {
    uid
    name
    created_at
    updated_at
    status
    buyer {
      firstname
      lastname
    }
    comments {
      uid
      created_at
      author {
        firstname
        lastname
      }
    }
    template_id
    template_name
    items {
      product {
        uid
        sku
        name
        price_range {
          maximum_price {
            regular_price {
              value
            }
          }
        }
      }
      quantity
    }
    prices {
      subtotal_excluding_tax {
        value
      }
      subtotal_including_tax {
        value
      }
      subtotal_with_discount_excluding_tax {
        value
      }
      grand_total {
        value
        currency
      }
    }
  }
`;export{l as D,f as N,m as a,_ as g,p as s,g as t};
//# sourceMappingURL=NegotiableQuoteFragment.js.map
