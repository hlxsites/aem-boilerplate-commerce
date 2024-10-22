import{s as e,M as l,f as d,d as o}from"./fetch-graphql.js";import{C as p,a as f,b as g}from"./getCart.graphql.js";const c=`
  mutation setBillingAddress($input: SetBillingAddressOnCartInput!) {
    setBillingAddressOnCart(input: $input) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${p}
`,C=async({address:i,customerAddressId:s,sameAsShipping:t=!1,useForShipping:n=!1})=>{const r=e.cartId;if(!r)throw new l;const a={cart_id:r,billing_address:{same_as_shipping:t,use_for_shipping:n}};if(!t&&s&&(a.billing_address.customer_address_id=s),!t&&!s){if(!i)throw new d;a.billing_address.address=f(i)}return await o({type:"mutation",query:c,options:{variables:{input:a}},path:"setBillingAddressOnCart.cart",signalType:"cart",transformer:g})};export{c as a,C as s};
