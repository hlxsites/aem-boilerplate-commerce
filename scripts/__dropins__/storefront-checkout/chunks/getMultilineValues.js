import{M as _,d as y,e as g,t as h,r as l}from"./transform-shipping-methods.js";import"./getStoreConfig.js";import"@dropins/tools/event-bus.js";const m=`
mutation estimateShippingMethods(
	$cartId: String!
  $address: EstimateAddressInput!
) {
	estimateShippingMethods(
		input: {
			cart_id: $cartId
			address: $address
		}
	) {
		carrier_title
		carrier_code
		method_title
		method_code
		available
		amount {
			currency
			value
		}
		price_excl_tax {
			currency
			value
		}
		price_incl_tax {
			currency
			value
		}
		error_message
	}
}
`;var I=(t=>(t.SHIPPING="shipping_addresses",t.BILLING="billing_address",t))(I||{}),M=(t=>(t.City="city",t.Company="company",t.Country="country_id",t.FirstName="firstname",t.LastName="lastname",t.PostCode="postcode",t.Region="region",t.RegionId="region_id",t.SaveInAddressBook="save_in_address_book",t.Street="street",t.Telephone="telephone",t.Vat="vat_id",t))(M||{});const S=t=>t?!!t.id&&!!t.code&&!!t.name:!1,v=t=>{if(t)return t.filter(S).map(e=>{const{id:a,code:n,name:i}=e;return{id:a,code:n,name:i}})},b=async t=>{const{cartId:e,criteria:a}=t||{},{country_code:n,region_id:i,region_name:r,zip:s}=a||{};if(!e)throw new _;if(!n)throw new y;const o=typeof i=="string"?parseInt(i,10):i,c=i||r?{...o&&{region_id:o},...r&&{region_code:r}}:void 0,u={country_code:n,...s&&{postcode:s},...c&&{region:c}};return await g({type:"mutation",query:m,options:{variables:{cartId:e,address:u}},path:"estimateShippingMethods",signalType:"estimateShippingMethods",transformer:h})},f=`
query getRegions($countryCode: String!) {
    country(id: $countryCode) {
        id
        available_regions {
            id
            code
            name
        }
    }
}`,L=async(t,e)=>(l.value.addressType=e,g({type:"query",query:f,options:{variables:{countryCode:t}},path:"country.available_regions",signalType:"regions",transformer:v})),p="-",N=`
`,R=2e3,E=(t,e)=>Object.keys(e).filter(a=>a.startsWith(t)).sort((a,n)=>parseInt(a.replace(`${t}${p}`,""),10)-parseInt(n.replace(`${t}${p}`,""),10)).map(a=>e[a]);export{I as A,R as D,p as M,M as a,E as b,N as c,b as e,L as g};
//# sourceMappingURL=getMultilineValues.js.map
