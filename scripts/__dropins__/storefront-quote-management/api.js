/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as s,s as o}from"./chunks/transform-quote.js";import{FetchGraphQL as m}from"@dropins/tools/fetch-graphql.js";import{events as a}from"@dropins/tools/event-bus.js";import{r as P,u as x}from"./chunks/requestNegotiableQuote.js";import{F as y,N as b,S as v,n as j}from"./chunks/negotiableQuotes.js";import{Initializer as d}from"@dropins/tools/lib.js";const E=`
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
`,Q=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${E}
`,p="All/Quotes/View/Request, Edit, Delete",h="All/Quotes/View/Request, Edit, Delete",f="All/Quotes/View/Request, Edit, Delete",R=t=>{const e=[],r=(n,l=[])=>{for(const i of n){const c=[...l,i.text];i.children&&i.children.length>0?r(i.children,c):e.push(c.join("/"))}};return r(t),e};function g(t){const{role:e}=t;if(!e)return{permissions:{canRequestQuote:s.requestQuote,canEditQuote:s.editQuote,canDeleteQuote:s.deleteQuote}};const{permissions:r}=e,n=R(r);return{permissions:{canRequestQuote:n.includes(p),canEditQuote:n.includes(h),canDeleteQuote:n.includes(f)}}}const S=async()=>{var t;if(!o.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await T(Q);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return g(e.data.customer)}catch(e){return Promise.reject(e)}},u=new d({init:async t=>{const e={};u.config.setConfig({...e,...t})},listeners:()=>[a.on("authenticated",async t=>{o.authenticated=!!t,t?S().then(e=>{o.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote},a.emit("quote-management/permissions",o.permissions)}).catch(e=>{console.error(e),o.permissions=s,a.emit("quote-management/permissions",s)}):(o.permissions=s,a.emit("quote-management/permissions",s))},{eager:!0})]}),q=u.config,{setEndpoint:U,setFetchGraphQlHeader:F,removeFetchGraphQlHeader:O,setFetchGraphQlHeaders:A,fetchGraphQl:T,getConfig:I}=new m().getMethods();export{y as FilterMatchTypeEnum,b as NegotiableQuoteSortableField,v as SortEnum,q as config,T as fetchGraphQl,I as getConfig,S as getCustomerData,u as initialize,j as negotiableQuotes,O as removeFetchGraphQlHeader,P as requestNegotiableQuote,U as setEndpoint,F as setFetchGraphQlHeader,A as setFetchGraphQlHeaders,x as uploadFile};
//# sourceMappingURL=api.js.map
