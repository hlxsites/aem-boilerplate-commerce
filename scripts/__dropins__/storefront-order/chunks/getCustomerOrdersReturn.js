import{h as C}from"./network-error.js";import{f as N,h as S}from"./fetch-graphql.js";import{c as b,P as m,a as M,G as F,O as P}from"./transform-order-details.js";const L=t=>{var _,d,g,i,R,E,T,f,h,I;if(!((i=(g=(d=(_=t==null?void 0:t.data)==null?void 0:_.customer)==null?void 0:d.returns)==null?void 0:g.items)!=null&&i.length))return null;const n=(T=(E=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:E.returns)==null?void 0:T.items,c=(I=(h=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:h.returns)==null?void 0:I.page_info;return{ordersReturn:n.map(u=>{var D,G;const{order:a}=u,q=((G=(D=u==null?void 0:u.shipping)==null?void 0:D.tracking)==null?void 0:G.map(r=>{const{status:s,carrier:o,tracking_number:e}=r;return{status:s,carrier:o,trackingNumber:e}}))??[],k=u.items.map(r=>{var O;const s=r==null?void 0:r.quantity,o=r==null?void 0:r.status,e=r==null?void 0:r.request_quantity,y=r==null?void 0:r.uid,l=r==null?void 0:r.order_item,p=((O=b([l]))==null?void 0:O.reduce((z,A)=>A,{}))??{};return{uid:y,quantity:s,status:o,requestQuantity:e,orderItem:p}});return{token:a==null?void 0:a.token,orderNumber:a==null?void 0:a.number,items:k,tracking:q}}),pageInfo:{pageSize:c.page_size,totalPages:c.total_pages,currentPage:c.current_page}}},U=`
query GET_CUSTOMER_ORDERS_RETURN {
 customer {
  returns {
  page_info {
    page_size
    total_pages
    current_page
  }
   items {
    number
    shipping {
      tracking {
        status {
          text
          type
        }
        carrier {
          uid
          label
        }
        tracking_number
      }
    }
    order {
      number
      token
    }
    items {
     uid
     quantity
     status
     request_quantity
      order_item {
        ...OrderItemDetails
        ... on GiftCardOrderItem {
          ...GiftCardDetails
          product {
            ...ProductDetails
          }
        }
      }
    }
   }
  }
 }
}
${m}
${M}
${F}
${P}
`,j=async()=>await N(U,{method:"GET",cache:"force-cache"}).then(t=>{var n;return(n=t.errors)!=null&&n.length?S(t.errors):L(t)}).catch(C);export{j as g};
