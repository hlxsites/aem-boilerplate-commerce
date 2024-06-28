import{g as T,b as I,t as O}from"./getCart.graphql.js";import{e as y,F as S,M as A,U as E}from"./transform-shipping-methods.js";import{f as k,o as v,P as d,i as q}from"./getStoreConfig.js";import{events as C}from"@dropins/tools/event-bus.js";import{I as L}from"./cart-item.js";const D=t=>t?"code"in t&&"value"in t:!1,N=t=>t.filter(D).map(e=>{const{code:o,value:r}=e;return{code:o,value:r}}),x=t=>{var n,a,u;const e=t.street.filter(Boolean),o=(n=t.region)==null?void 0:n.region_id,r=o&&o>0;return{id:String(t.id),firstName:t.firstname,lastName:t.lastname,company:t.company||void 0,city:t.city,street:e,postCode:t.postcode||void 0,vatId:t.vat_id||void 0,telephone:t.telephone||void 0,region:{id:r?o:void 0,code:(a=t.region)==null?void 0:a.region_code,name:(u=t.region)==null?void 0:u.region},country:{value:t.country_code,label:t.country_code},customAttributes:N(t.custom_attributesV2)}},Q=t=>t?t.filter(Boolean).map(x):[],b=(t,e)=>{if(!e)return;const o=e.find(r=>(r==null?void 0:r[t])===!0);if(o)return x(o)},V=t=>{if(!t)return;const e=t.addresses;return{firstName:t.firstname||"",lastName:t.lastname||"",email:t.email||"",addresses:Q(e),defaultBillingAddress:b("default_billing",e),defaultShippingAddress:b("default_shipping",e)}},st=async t=>await y({type:"query",query:t?T:I,options:{method:"POST",cache:"no-cache",...t?{variables:{cartId:t}}:{}},path:"cart",signalType:"cart",transformer:O}),$=`
  query getCustomer {
    customer {
      firstname
      lastname
      email
      addresses {
        id
        default_shipping
        default_billing
        city
        country_code
        firstname
        lastname
        company
        postcode
        vat_id
        region {
          region
          region_id
          region_code
        }
        street
        telephone
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
      }
    }
  }
`,ct=async()=>await y({type:"query",query:$,options:{method:"POST",cache:"no-cache"},path:"customer",signalType:"customer",transformer:V}),w=`
  fragment CartStockStatus on Cart {
    id
    items {
      __typename
      uid
      product {
        uid
        name
        sku
        stock_status
        only_x_left_in_stock
        ... on ConfigurableProduct {
          variants {
            attributes {
              uid
            }
            product {
              uid
              stock_status
            }
          }
        }
        ... on BundleProduct {
          items {
            uid
            options {
              uid
              product {
                uid
              }
            }
          }
        }
      }
      quantity
      ... on ConfigurableCartItem {
        configurable_options {
          configurable_product_option_uid
          option_label
          configurable_product_option_value_uid
          value_label
        }
      }
      ... on BundleCartItem {
        bundle_options {
          uid
          values {
            uid
          }
        }
      }
    }
  }
`,B=`
  query getCartStockStatus($cartId: String!) {
    cart(cart_id: $cartId) {
      ...CartStockStatus
    }
  }
  ${w}
`,M=`
  query getCustomerCartStockStatus {
    cart: customerCart {
      ...CartStockStatus
    }
  }
  ${w}
`,f=t=>t.stock_status===d.InStock,F=t=>f(t.product),U=t=>{const{configurable_options:e}=t,{variants:o}=t.product;if(!o||!e)return!1;const r=e.map(u=>u==null?void 0:u.configurable_product_option_value_uid),n=o.find(u=>!u||!u.attributes?!1:u.attributes.every(s=>s&&r.includes(s.uid)));if(!n)return!1;const{product:a}=n;return a?f(a):!1},G=t=>{const{product:e}=t;if(!f(e))return!1;const{bundle_options:o}=t,{items:r}=e;return(r==null?void 0:r.length)===(o==null?void 0:o.length)},P=t=>{switch(t){case"ConfigurableCartItem":return U;case"BundleCartItem":return G;default:return F}},R=t=>P(t.__typename)(t)===!1,it=async t=>{var a;const{data:e,errors:o}=await k(t?B:M,{method:"GET",cache:"no-cache",...t?{variables:{cartId:t}}:{}}).catch(v);if(o)throw new S(o);const r=(a=e==null?void 0:e.cart)==null?void 0:a.items;return!r||!r.length?d.InStock:r.filter(u=>u?R(u):!1).length>0?d.OutOfStock:d.InStock},K=`
  mutation placeOrder($cartId: String!) {
    placeOrder(input: { cart_id: $cartId }) {
      orderV2 {
        number
        token
      }
    }
  }
`;function j(t){const e=[];for(const o in t)t[o]!==null&&e.push({optionLabel:o,valueLabel:t[o]});return e}function z(t){return t.map(e=>{var c;const{uid:o,name:r,sku:n,price:a,quantity:u}=e;let s={canApplyMsrp:!0,formattedPrice:"",id:o,prices:{price:{value:a.value??0,currency:a.currency??""}},product:{productId:0,name:r,sku:n,productType:e.kind,canonicalUrl:e.url||"",mainImageUrl:((c=e==null?void 0:e.image)==null?void 0:c.src)||""},quantity:u};return e.kind===L.Configurable&&(s.configurableOptions=j(e.configurableOptions)),s},[])}function H(t){var s,c,i,l;const{id:e,items:o,prices:r,totalQty:n}=t,a=!!(o!=null&&o.length);let u={id:e,prices:{subtotalExcludingTax:{value:((s=r==null?void 0:r.subtotal_excluding_tax)==null?void 0:s.value)??0,currency:((c=r==null?void 0:r.subtotal_excluding_tax)==null?void 0:c.currency)??""},subtotalIncludingTax:{value:((i=r==null?void 0:r.subtotal_including_tax)==null?void 0:i.value)??0,currency:((l=r==null?void 0:r.subtotal_including_tax)==null?void 0:l.currency)??""}},totalQuantity:n,possibleOnepageCheckout:!0};return a&&(u.items=z(o)),u}function J(t){return t.reduce((o,r)=>o+r.amount.value,0)}function W(t){return{shippingMethod:`${t.carrier.code}_${t.code}`,shippingAmount:t.amount.value??0}}function X(t,e){var i,l,g,m,h;const{coupons:o,email:r,prices:n,selectedPaymentMethod:a,shippingAddresses:u}=e,s=!!(u!=null&&u.length);let c={appliedCouponCode:((i=o[0])==null?void 0:i.code)??"",email:r??"",grandTotal:((l=n==null?void 0:n.grand_total)==null?void 0:l.value)??0,orderId:t,orderType:"checkout",otherTax:0,paymentMethodCode:(a==null?void 0:a.code)??"",paymentMethodName:(a==null?void 0:a.title)??"",payments:[{paymentMethodCode:(a==null?void 0:a.code)??"",paymentMethodName:(a==null?void 0:a.title)??"",total:((g=n==null?void 0:n.grand_total)==null?void 0:g.value)??0}],salesTax:J((n==null?void 0:n.applied_taxes)??[]),subtotalExcludingTax:((m=n==null?void 0:n.subtotal_excluding_tax)==null?void 0:m.value)??0,subtotalIncludingTax:((h=n==null?void 0:n.subtotal_including_tax)==null?void 0:h.value)??0};if(s){const p=u[0],_=p==null?void 0:p.selectedShippingMethod;_&&(c.shipping=W(_))}return c}function Y(t){const{data:e}=q.value,o=H(e),r=X(t,e);window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer.push({shoppingCartContext:null},{orderContext:null}),window.adobeDataLayer.push({shoppingCartContext:o},{orderContext:r})}function Z(){window.adobeDataLayer=window.adobeDataLayer||[],window.adobeDataLayer.push(t=>{const e=t.getState()||{};t.push({event:"place-order",eventInfo:{...e}})})}function tt(t){Y(t),Z()}function et(t){throw t.every(o=>{var r;return(r=o.extensions)==null?void 0:r.category})?new S(t):new E(t[0].message)}const lt=async t=>{if(!t)throw new A;const{data:e,errors:o}=await k(K,{variables:{cartId:t}}).catch(v);o&&et(o);const r=e.placeOrder.orderV2;tt(r.number),C.emit("checkout/order",r),C.emit("cart/reset",void 0)};export{ct as a,it as b,st as g,lt as p};
//# sourceMappingURL=placeOrder2.js.map
