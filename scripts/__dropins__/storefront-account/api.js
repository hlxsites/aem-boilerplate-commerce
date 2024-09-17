import{Initializer as c}from"@dropins/tools/lib.js";import{f as n,h as d,a as f}from"./chunks/convertCase.js";import{g as T,r as y,s as Q,b,d as w}from"./chunks/convertCase.js";import{c as O,g as R,a as k,b as v,u as M}from"./chunks/updateCustomerAddress.js";import{g as U,r as _}from"./chunks/removeCustomerAddress.js";import{g as B}from"./chunks/getOrderHistoryList.js";import"@dropins/tools/fetch-graphql.js";import"@dropins/tools/event-bus.js";import"./chunks/transform-customer-address.js";const s=new c({init:async t=>{const r={authHeaderConfig:{header:"Authorization",tokenPrefix:"Bearer"}};s.config.setConfig({...r,...t})},listeners:()=>[]}),x=s.config,u=t=>{var r,a,e,o,i,m;return{email:((a=(r=t==null?void 0:t.data)==null?void 0:r.customer)==null?void 0:a.email)||"",firstname:((o=(e=t==null?void 0:t.data)==null?void 0:e.customer)==null?void 0:o.firstname)||"",lastname:((m=(i=t==null?void 0:t.data)==null?void 0:i.customer)==null?void 0:m.lastname)||""}},h=`
  query GET_CUSTOMER {
    customer {
     firstname
     lastname
     email
    }
  }
`,A=async()=>await n(h,{method:"GET",cache:"force-cache"}).then(t=>{var r;return(r=t.errors)!=null&&r.length?d(t.errors):u(t)}).catch(f);export{x as config,O as createCustomerAddress,n as fetchGraphQl,R as getAttributesForm,T as getConfig,k as getCountries,A as getCustomer,U as getCustomerAddress,B as getOrderHistoryList,v as getRegions,s as initialize,_ as removeCustomerAddress,y as removeFetchGraphQlHeader,Q as setEndpoint,b as setFetchGraphQlHeader,w as setFetchGraphQlHeaders,M as updateCustomerAddress};
