/*! Copyright 2026 Adobe
All Rights Reserved. */
import{l as P,f as x,h as I,a as V,m as B}from"./removeCustomerAddress.js";import{BASIC_CUSTOMER_INFO_FRAGMENT as D}from"../fragments.js";import{c as $}from"./initialize.js";import"@dropins/tools/event-bus.js";import{merge as k}from"@dropins/tools/lib.js";const q=t=>{var o,u,a,m,i,l,c,f,n,C,h,_,s,S,y,T,w,E,A,R,b,N,O,v,M,U,d,p;const e=(a=(u=(o=t==null?void 0:t.data)==null?void 0:o.customer)==null?void 0:u.custom_attributes)==null?void 0:a.filter(g=>g).reduce((g,F)=>(g[P(F.code)]=F.value??"",g),{}),r={email:((i=(m=t==null?void 0:t.data)==null?void 0:m.customer)==null?void 0:i.email)||"",firstName:((c=(l=t==null?void 0:t.data)==null?void 0:l.customer)==null?void 0:c.firstname)||"",lastName:((n=(f=t==null?void 0:t.data)==null?void 0:f.customer)==null?void 0:n.lastname)||"",middleName:((h=(C=t==null?void 0:t.data)==null?void 0:C.customer)==null?void 0:h.middlename)||"",gender:((s=(_=t==null?void 0:t.data)==null?void 0:_.customer)==null?void 0:s.gender)||"1",dateOfBirth:((y=(S=t==null?void 0:t.data)==null?void 0:S.customer)==null?void 0:y.date_of_birth)||"",prefix:((w=(T=t==null?void 0:t.data)==null?void 0:T.customer)==null?void 0:w.prefix)||"",suffix:((A=(E=t==null?void 0:t.data)==null?void 0:E.customer)==null?void 0:A.suffix)||"",createdAt:((b=(R=t==null?void 0:t.data)==null?void 0:R.customer)==null?void 0:b.created_at)||"",allowRemoteShoppingAssistance:(O=(N=t==null?void 0:t.data)==null?void 0:N.customer)==null?void 0:O.allow_remote_shopping_assistance,...e};return k(r,(p=(d=(U=(M=(v=$)==null?void 0:v.getConfig())==null?void 0:M.models)==null?void 0:U.CustomerDataModelShort)==null?void 0:d.transformer)==null?void 0:p.call(d,t.data))},J=`
  query GET_CUSTOMER {
    customer {
      ...BASIC_CUSTOMER_INFO_FRAGMENT
      custom_attributes {
        ... on AttributeValue {
          code
          value
        }
        code
      }
    }
  }
  ${D}
`,H=async()=>await x(J,{method:"GET",cache:"no-cache"}).then(t=>{var e;return(e=t.errors)!=null&&e.length?I(t.errors):q(t)}).catch(V),G=`
  mutation UPDATE_CUSTOMER_V2($input: CustomerUpdateInput!) {
    updateCustomerV2(input: $input) {
      customer {
        email
        allow_remote_shopping_assistance
      }
    }
  }
`,W=async t=>{console.log("updateCustomer - form received:",t),console.log("updateCustomer - form type:",typeof t),console.log("updateCustomer - allowRemoteShoppingAssistance type:",typeof t.allowRemoteShoppingAssistance);const{allowRemoteShoppingAssistance:e,...r}=t;console.log("updateCustomer - allowRemoteShoppingAssistance:",e),console.log("updateCustomer - allowRemoteShoppingAssistance type:",typeof e),console.log("updateCustomer - restForm:",r);const o=B(r,"snakeCase",{firstName:"firstname",lastName:"lastname",middleName:"middlename",dob:"date_of_birth",custom_attributesV2:"custom_attributes"});console.log("updateCustomer - input after convertKeysCase:",o),console.log("updateCustomer - input type:",typeof o),e!==void 0&&(o.allow_remote_shopping_assistance=e),console.log("updateCustomer - final input:",o),console.log("updateCustomer - final input stringified:",JSON.stringify(o,null,2)),console.log("updateCustomer - allow_remote_shopping_assistance type:",typeof o.allow_remote_shopping_assistance);const u={input:o};return console.log("updateCustomer - variables object:",u),console.log("updateCustomer - variables stringified:",JSON.stringify(u,null,2)),console.log("updateCustomer - calling fetchGraphQl with:",{query:G,method:"POST",variables:u}),await x(G,{method:"POST",variables:u}).then(a=>{var m,i,l,c;return console.log("updateCustomer - response received:",a),(m=a.errors)!=null&&m.length?(console.error("updateCustomer - errors:",a.errors),I(a.errors)):((c=(l=(i=a==null?void 0:a.data)==null?void 0:i.updateCustomerV2)==null?void 0:l.customer)==null?void 0:c.email)||""}).catch(a=>(console.error("updateCustomer - catch error:",a),V(a)))};export{H as g,W as u};
//# sourceMappingURL=updateCustomer.js.map
