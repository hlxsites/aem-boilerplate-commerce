/*! Copyright 2025 Adobe
All Rights Reserved. */
import{s as o,D as r}from"./chunks/NegotiableQuoteFragment.js";import{FetchGraphQL as l}from"@dropins/tools/fetch-graphql.js";import{events as i}from"@dropins/tools/event-bus.js";import{r as x}from"./chunks/requestNegotiableQuote.js";import{F as G,N as y,S as b,n as v}from"./chunks/negotiableQuotes.js";import{Initializer as E}from"@dropins/tools/lib.js";const d=`
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
`,p="All/Quotes/View/Request, Edit, Delete",Q="All/Quotes/View/Request, Edit, Delete",f="All/Quotes/View/Request, Edit, Delete",R=t=>{const e=[],s=(u,m=[])=>{for(const n of u){const a=[...m,n.text];n.children&&n.children.length>0?s(n.children,a):e.push(a.join("/"))}};return s(t),e};function g(t){const{role:{permissions:e}}=t,s=R(e);return{permissions:{canRequestQuote:s.includes(p),canEditQuote:s.includes(Q),canDeleteQuote:s.includes(f)}}}const S=async()=>{var t;if(!o.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await T(h);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return g(e.data.customer)}catch(e){return Promise.reject(e)}},c=new E({init:async t=>{const e={};c.config.setConfig({...e,...t})},listeners:()=>[i.on("authenticated",async t=>{o.authenticated=!!t,t?S().then(e=>{o.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote},i.emit("quote-management/permissions",o.permissions)}).catch(e=>{console.error(e),o.permissions=r,i.emit("quote-management/permissions",r)}):(o.permissions=r,i.emit("quote-management/permissions",r))},{eager:!0})]}),U=c.config,{setEndpoint:O,setFetchGraphQlHeader:q,removeFetchGraphQlHeader:F,setFetchGraphQlHeaders:A,fetchGraphQl:T,getConfig:I}=new l().getMethods();export{G as FilterMatchTypeEnum,y as NegotiableQuoteSortableField,b as SortEnum,U as config,T as fetchGraphQl,I as getConfig,S as getCustomerData,c as initialize,v as negotiableQuotes,F as removeFetchGraphQlHeader,x as requestNegotiableQuote,O as setEndpoint,q as setFetchGraphQlHeader,A as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
