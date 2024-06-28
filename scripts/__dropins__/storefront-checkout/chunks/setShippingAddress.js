import{a as s,b as p,M as u,c as _}from"./getMultilineValues.js";import"./getStoreConfig.js";import{e as A}from"./transform-shipping-methods.js";import{C as m,a as I,t as g}from"./getCart.graphql.js";import"@dropins/tools/event-bus.js";const C=/^\d+$/,T=t=>{if(C.test(t))return parseInt(t,10)},y=`
  mutation setShippingAddress($cartId: String!, $address: CartAddressInput!) {
    setShippingAddressesOnCart(
      input: { cart_id: $cartId, shipping_addresses: [{ address: $address }] }
    ) {
      cart {
        id
        ...CartData
        ...CartSummaryItems
      }
    }
  }
  ${m}
  ${I}
`,S=["city","company","country_code","firstname","lastname","postcode","region","region_id","save_in_address_book","street","telephone","vat_id"],N=t=>{const a={city:t[s.City],company:t[s.Company],country_code:t[s.Country],firstname:t[s.FirstName],lastname:t[s.LastName],postcode:t[s.PostCode],save_in_address_book:!0,street:p(s.Street,t),telephone:t[s.Telephone],vat_id:t[s.Vat]},n=t[s.Region],d=T(n);d?a.region_id=d:a.region=n;const c=Object.keys(t).filter(e=>!e.startsWith("street")).filter(e=>!S.includes(e)).filter(e=>e!=="country_id").map(e=>{const[r,i]=e.split(u);if(!i)return{attribute_code:r,value:t[e]};const o=p(r,t).join(_);return{attribute_code:r,value:o}}).filter((e,r,i)=>r===i.findIndex(o=>o.attribute_code===e.attribute_code));return c.length>0&&(a.custom_attributes=c),a},v=async({signal:t,cartId:a,address:n})=>await A({type:"mutation",query:y,options:{signal:t,variables:{cartId:a,address:n}},path:"setShippingAddressesOnCart.cart",signalType:"cart",transformer:g});export{S,N as p,v as s};
//# sourceMappingURL=setShippingAddress.js.map
