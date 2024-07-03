import{f as s,h as a}from"./network-error.js";import{t as o}from"./transform-attributes-form.js";import{h as n}from"./getStoreConfig.js";const i=`
  mutation CREATE_CUSTOMER($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`,u=`
  mutation CREATE_CUSTOMER_V2($input: CustomerCreateInput!) {
    createCustomerV2(input: $input) {
      customer {
        firstname
        lastname
        email
        is_subscribed
      }
    }
  }
`,T=async(r,t)=>await s(t?u:i,{method:"POST",variables:{input:{...r}}}).catch(a),m=`
  query GET_ATTRIBUTES_FORM($formCode: String!) {
    attributesForm(formCode: $formCode) {
      items {
        code
        default_value
        entity_type
        frontend_class
        frontend_input
        is_required
        is_unique
        label
        options {
          is_default
          label
          value
        }
      }
      errors {
        type
        message
      }
    }
  }
`,_=async r=>await s(m.replace(/\s+/g," ").trim(),{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?n(t.errors):o(t)}).catch(a),c=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input:$input) {
      firstname
   }
  }
`,l=async r=>await s(c,{method:"POST",variables:{input:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?n(t.errors):t.data.createCustomerAddress.firstname||""}).catch(a);export{l as a,T as c,_ as g};
//# sourceMappingURL=createCustomerAddress.js.map
