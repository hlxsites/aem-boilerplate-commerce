/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as n,D as r}from"./chunks/requestNegotiableQuote.js";import{r as F}from"./chunks/requestNegotiableQuote.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";import{events as i}from"@dropins/tools/event-bus.js";import{Initializer as E}from"@dropins/tools/lib.js";const d=`
    fragment CUSTOMER_FRAGMENT on Customer {
        role {
            permissions {
                text
                children {
                    text
                    children {
                        text
                        children {
                            text
                        }
                    }
                }
            }
        }
    }
`,h=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${d}
`,p="All/Quotes/View/Request, Edit, Delete",f="All/Quotes/View/Request, Edit, Delete",Q="All/Quotes/View/Request, Edit, Delete",R=t=>{const e=[],s=(u,m=[])=>{for(const o of u){const c=[...m,o.text];o.children&&o.children.length>0?s(o.children,c):e.push(c.join("/"))}};return s(t),e};function g(t){const{role:{permissions:e}}=t,s=R(e);return{permissions:{canRequestQuote:s.includes(p),canEditQuote:s.includes(f),canDeleteQuote:s.includes(Q)}}}const S=async()=>{var t;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await T(h);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return g(e.data.customer)}catch(e){return Promise.reject(e)}},a=new E({init:async t=>{const e={};a.config.setConfig({...e,...t})},listeners:()=>[i.on("authenticated",async t=>{n.authenticated=!!t,t?S().then(e=>{n.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote},i.emit("quote-management/permissions",n.permissions)}).catch(e=>{console.error(e),n.permissions=r,i.emit("quote-management/permissions",r)}):(n.permissions=r,i.emit("quote-management/permissions",r))},{eager:!0})]}),N=a.config,{setEndpoint:O,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:A,setFetchGraphQlHeaders:I,fetchGraphQl:T,getConfig:w}=new l().getMethods();export{N as config,T as fetchGraphQl,w as getConfig,S as getCustomerData,a as initialize,A as removeFetchGraphQlHeader,F as requestNegotiableQuote,O as setEndpoint,q as setFetchGraphQlHeader,I as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
