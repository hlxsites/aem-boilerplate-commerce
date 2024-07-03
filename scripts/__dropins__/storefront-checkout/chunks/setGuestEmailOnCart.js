import{a as r,M as s,e}from"./transform-shipping-methods.js";import{f as l,o as m,p as n}from"./getStoreConfig.js";import"@dropins/tools/event-bus.js";import{C as o,a as c,t as E}from"./getCart.graphql.js";const u=a=>!!(a!=null&&a.is_email_available),p=`
  query isEmailAvailable($email: String!) {
    isEmailAvailable(email: $email) {
      is_email_available
    }
  }
`,v=async a=>{if(!a)throw new r;const{data:i,errors:t}=await l(p,{method:"GET",cache:"no-cache",variables:{email:a}}).catch(m);return t&&n(t),u(i.isEmailAvailable)},A=`
  mutation setGuestEmail($cartId: String!, $email: String!) {
    setGuestEmailOnCart(input: { cart_id: $cartId, email: $email }) {
      cart {
        id
        ...CartData
        ...CartSummaryItems
      }
    }
  }
  ${o}
  ${c}
`,y=async({cartId:a,email:i})=>{if(!a)throw new s;return await e({type:"mutation",query:A,options:{variables:{cartId:a,email:i}},path:"setGuestEmailOnCart.cart",signalType:"cart",transformer:E})};export{v as i,y as s};
//# sourceMappingURL=setGuestEmailOnCart.js.map
