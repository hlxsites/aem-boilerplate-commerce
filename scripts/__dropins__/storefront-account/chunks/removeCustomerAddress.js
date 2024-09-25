import{f as a,h as o,a as s}from"./convertCase.js";import{a as d}from"./transform-customer-address.js";const n=`
  query GET_CUSTOMER_ADDRESS {
    customer {
      addresses {
        firstname
        lastname
        city
        company
        country_code
        region {
          region
          region_code
          region_id
        }
        custom_attributesV2 {
          ... on AttributeValue {
            code
            value
          }
        }
        telephone
        id
        vat_id
        postcode
        street
        default_shipping
        default_billing
      }
    }
  }
`,h=async()=>await a(n,{method:"GET",cache:"force-cache"}).then(r=>{var e;return(e=r.errors)!=null&&e.length?o(r.errors):d(r)}).catch(s),i=`
  mutation REMOVE_CUSTOMER_ADDRESS($id: Int!) {
    deleteCustomerAddress(id:$id)
  }
`,l=async r=>await a(i,{method:"POST",variables:{id:r}}).then(e=>{var t;return(t=e.errors)!=null&&t.length?o(e.errors):e.data.deleteCustomerAddress}).catch(s);export{h as g,l as r};
