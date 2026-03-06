/*! Copyright 2026 Adobe
All Rights Reserved. */
import{t as H,f as j,a as Y}from"./removeCustomerAddress.js";import{c as J}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as K}from"@dropins/tools/lib.js";import{ADDRESS_FRAGMENT as Q,ORDER_SUMMARY_FRAGMENT as B}from"../fragments.js";const V=(a,o="en-US",s={})=>{const d={...{day:"2-digit",month:"2-digit",year:"numeric"},...s},u=new Date(a);return isNaN(u.getTime())?"Invalid Date":new Intl.DateTimeFormat(o,d).format(u)},W=(a,o="en-US",s={})=>{const d={...{hour:"2-digit",minute:"2-digit"},...s},u=new Date(a);return isNaN(u.getTime())?"Invalid Time":new Intl.DateTimeFormat(o,d).format(u)},_={value:0,currency:"USD"},X=a=>{var o,s,c,d,u,g,n,i,f,l;return{subtotal:((o=a==null?void 0:a.total)==null?void 0:o.subtotal)??_,grandTotal:((s=a==null?void 0:a.total)==null?void 0:s.grand_total)??_,grandTotalExclTax:((c=a==null?void 0:a.total)==null?void 0:c.grand_total_excl_tax)??_,totalGiftcard:((d=a==null?void 0:a.total)==null?void 0:d.total_giftcard)??_,subtotalExclTax:((u=a==null?void 0:a.total)==null?void 0:u.subtotal_excl_tax)??_,subtotalInclTax:((g=a==null?void 0:a.total)==null?void 0:g.subtotal_incl_tax)??_,taxes:((n=a==null?void 0:a.total)==null?void 0:n.taxes)??[],totalTax:((i=a==null?void 0:a.total)==null?void 0:i.total_tax)??_,totalShipping:((f=a==null?void 0:a.total)==null?void 0:f.total_shipping)??_,discounts:((l=a==null?void 0:a.total)==null?void 0:l.discounts)??[]}},Z=a=>{var d,u,g,n,i,f,l,T,h,S,y,O,E,R,D,b,A,I,x,M,k,N,q,G,$,v,C,F,p,w;if(!((u=(d=a.data)==null?void 0:d.customer)!=null&&u.orders))return null;const o=((n=(g=a==null?void 0:a.data)==null?void 0:g.customer)==null?void 0:n.returns)??[],c={items:(((l=(f=(i=a==null?void 0:a.data)==null?void 0:i.customer)==null?void 0:f.orders)==null?void 0:l.items)??[]).map(r=>{var L;return{items:r==null?void 0:r.items.map(t=>{var U,z,P;return{status:(t==null?void 0:t.status)??"",productName:(t==null?void 0:t.product_name)??"",id:t==null?void 0:t.id,quantityOrdered:(t==null?void 0:t.quantity_ordered)??0,quantityShipped:(t==null?void 0:t.quantity_shipped)??0,quantityInvoiced:(t==null?void 0:t.quantity_invoiced)??0,sku:(t==null?void 0:t.product_sku)??"",urlKey:(t==null?void 0:t.product_url_key)??"",topLevelSku:((U=t==null?void 0:t.product)==null?void 0:U.sku)??"",product:{smallImage:{url:((P=(z=t==null?void 0:t.product)==null?void 0:z.small_image)==null?void 0:P.url)??""}}}}),token:r==null?void 0:r.token,email:r==null?void 0:r.email,shippingMethod:r==null?void 0:r.shipping_method,paymentMethods:(r==null?void 0:r.payment_methods)??[],shipments:(r==null?void 0:r.shipments)??[],id:r==null?void 0:r.id,carrier:r==null?void 0:r.carrier,status:r==null?void 0:r.status,number:r==null?void 0:r.number,returns:(L=o==null?void 0:o.items)==null?void 0:L.filter(t=>t.order.id===r.id),orderDate:V(r.order_date),orderTime:W(r.order_date),shippingAddress:H(r.shipping_address),billingAddress:H(r.billing_address),total:X(r)}}),pageInfo:{pageSize:((y=(S=(h=(T=a==null?void 0:a.data)==null?void 0:T.customer)==null?void 0:h.orders)==null?void 0:S.page_info)==null?void 0:y.page_size)??10,totalPages:((D=(R=(E=(O=a==null?void 0:a.data)==null?void 0:O.customer)==null?void 0:E.orders)==null?void 0:R.page_info)==null?void 0:D.total_pages)??1,currentPage:((x=(I=(A=(b=a==null?void 0:a.data)==null?void 0:b.customer)==null?void 0:A.orders)==null?void 0:I.page_info)==null?void 0:x.current_page)??1},totalCount:((N=(k=(M=a==null?void 0:a.data)==null?void 0:M.customer)==null?void 0:k.orders)==null?void 0:N.total_count)??0,dateOfFirstOrder:(($=(G=(q=a==null?void 0:a.data)==null?void 0:q.customer)==null?void 0:G.orders)==null?void 0:$.date_of_first_order)??""};return K(c,(w=(p=(F=(C=(v=J)==null?void 0:v.getConfig())==null?void 0:C.models)==null?void 0:F.OrderHistoryModel)==null?void 0:p.transformer)==null?void 0:w.call(p,a.data))},m=`
  query GET_CUSTOMER_ORDERS_LIST(
    $currentPage: Int
    $pageSize: Int
    $filter: CustomerOrdersFilterInput
    $sort: CustomerOrderSortInput
  ) {
    customer {
      returns {
        items {
          uid
          number
          order {
            id
          }
        }
      }
      orders(
        currentPage: $currentPage
        pageSize: $pageSize
        filter: $filter
        sort: $sort
      ) {
        page_info {
          page_size
          total_pages
          current_page
        }
        date_of_first_order
        total_count
        items {
          token
          email
          shipping_method
          payment_methods {
            name
            type
          }
          shipping_address {
            ...ADDRESS_FRAGMENT
          }
          billing_address {
            ...ADDRESS_FRAGMENT
          }
          shipments {
            id
            number
            tracking {
              title
              number
              carrier
            }
          }
          number
          id
          order_date
          carrier
          status
          items {
            status
            product_name
            id
            quantity_ordered
            quantity_shipped
            quantity_invoiced
            product_sku
            product_url_key
            product {
              sku
              small_image {
                url
              }
            }
          }
          total {
            ...ORDER_SUMMARY_FRAGMENT
          }
        }
      }
    }
  }
  ${Q}
  ${B}
`,e={sort_direction:"DESC",sort_field:"CREATED_AT"},ua=async(a,o,s)=>{const c=o.includes("viewAll")?{}:{order_date:JSON.parse(o)};return await j(m,{method:"GET",cache:"no-cache",variables:{pageSize:a,currentPage:s,filter:c,sort:e}}).then(d=>Z(d)).catch(Y)};export{ua as g};
//# sourceMappingURL=getOrderHistoryList.js.map
