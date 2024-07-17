import{c as o,f as a,h as s}from"./setReCaptchaToken.js";import{t as i}from"./transform-attributes-form.js";import{h as n}from"./getStoreConfig.js";const u=`
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
`,m=`
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
`,p=async(r,t)=>(await o(),await a(t?m:u,{method:"POST",variables:{input:{...r}}}).catch(s)),c=`
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
`,_=async r=>await a(c.replace(/\s+/g," ").trim(),{method:"GET",cache:"force-cache",variables:{formCode:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?n(t.errors):i(t)}).catch(s),E=`
  mutation CREATE_CUSTOMER_ADDRESS($input: CustomerAddressInput!) {
    createCustomerAddress(input:$input) {
      firstname
   }
  }
`,l=async r=>await a(E,{method:"POST",variables:{input:r}}).then(t=>{var e;return(e=t.errors)!=null&&e.length?n(t.errors):t.data.createCustomerAddress.firstname||""}).catch(s);export{l as a,p as c,_ as g};
