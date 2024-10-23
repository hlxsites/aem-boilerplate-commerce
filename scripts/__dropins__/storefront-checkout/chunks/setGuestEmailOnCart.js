import{c as r,j as s,m as e,s as l,M as n,d as o}from"./fetch-graphql.js";import"./store-config.js";import"@dropins/tools/event-bus.js";import{C as m,b as c}from"./getCart.graphql.js";const E=a=>!!(a!=null&&a.is_email_available),u=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,h=a=>{if(!(!a||a.length===0))throw Error(a.map(t=>t.message).join(" "))},C=async a=>{if(!a)throw new r;const{data:t,errors:i}=await s(u,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(e);return i&&h(i),E(t.isEmailAvailable)},p=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        id
        ...CheckoutData
      }
    }
  }
  ${m}
`,d=async a=>{const t=l.cartId;if(!t)throw new n;return await o({type:"mutation",query:p,options:{variables:{cartId:t,email:a}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:c})};export{C as i,d as s};
