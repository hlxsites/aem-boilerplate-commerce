/*! Copyright 2025 Adobe
All Rights Reserved. */
var i=Object.defineProperty;var h=(s,t,e)=>t in s?i(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var o=(s,t,e)=>h(s,typeof t!="symbol"?t+"":t,e);import{FetchGraphQL as p}from"@dropins/tools/fetch-graphql.js";const{setEndpoint:E,setFetchGraphQlHeader:O,removeFetchGraphQlHeader:f,setFetchGraphQlHeaders:l,fetchGraphQl:u,getConfig:m}=new p().getMethods(),d=`
  query GET_CUSTOMER_COMPANIES {
    customer {
      companies {
        items {
          name
          id
        }
      }
    }
    company {
      name
      id
    }
    customerGroup {
      uid
    }
  }
`,C=`
  query GET_CUSTOMER_GROUP {
    customerGroup {
      uid
    }
  }
`,r=class r{constructor(){o(this,"EMPTY_CUSTOMER_COMPANY_CONTEXT",{currentCompany:{id:"",name:""},customerCompanies:[],customerGroupId:""});o(this,"cache",null);o(this,"transformCompanyToOption",t=>({text:t.name,value:t.id}))}static getInstance(){return r.instance??(r.instance=new r)}async processCustomerGroupId(t){const e=Uint8Array.from(atob(t),a=>a.charCodeAt(0)),n=await crypto.subtle.digest("SHA-1",e);return Array.from(new Uint8Array(n)).map(a=>a.toString(16).padStart(2,"0")).join("")}isUserAuthenticated(){var t;return!!((t=m().fetchGraphQlHeaders)!=null&&t.Authorization)}resetCache(){this.cache=null}async updateCustomerGroup(){if(!this.isUserAuthenticated())return null;try{const t=await u(C);if(t.errors)return null;const e=await this.processCustomerGroupId(t.data.customerGroup.uid);return this.cache&&(this.cache.customerGroupId=e),e}catch(t){return console.error(t),null}}async getCustomerCompanyInfo(){if(this.cache)return this.cache;if(!this.isUserAuthenticated())return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;try{const t=await u(d);if(t.errors)return this.EMPTY_CUSTOMER_COMPANY_CONTEXT;const e=t.data,n=await this.processCustomerGroupId(t.data.customerGroup.uid),a=e.customer.companies.items.map(this.transformCompanyToOption);return this.cache={currentCompany:e.company,customerCompanies:a,customerGroupId:n},this.cache}catch{return this.EMPTY_CUSTOMER_COMPANY_CONTEXT}}};o(r,"instance");let c=r;const M=()=>c.getInstance().getCustomerCompanyInfo(),_=()=>c.getInstance().updateCustomerGroup();export{c as C,O as a,l as b,m as c,u as f,M as g,f as r,E as s,_ as u};
//# sourceMappingURL=customerCompanyContext.js.map
