/*! Copyright 2025 Adobe
All Rights Reserved. */
import{D as i,s as n,t as l}from"./chunks/transform-quote.js";import{FetchGraphQL as Q}from"@dropins/tools/fetch-graphql.js";import{events as s}from"@dropins/tools/event-bus.js";import{N as E}from"./chunks/requestNegotiableQuote.js";import{r as k}from"./chunks/requestNegotiableQuote.js";import{F as v,N as H,S as L,n as V}from"./chunks/negotiableQuotes.js";import{Initializer as h}from"@dropins/tools/lib.js";const f=`
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
`,p=`
    query CUSTOMER_QUERY {
        customer {
            ...CUSTOMER_FRAGMENT
        }
    }

    ${f}
`,g="All/Quotes/View/Request, Edit, Delete",q="All/Quotes/View/Request, Edit, Delete",R="All/Quotes/View/Request, Edit, Delete",T="All/Quotes/View/Checkout with quote",_=t=>{const e=[],o=(r,d=[])=>{for(const a of r){const c=[...d,a.text];a.children&&a.children.length>0?o(a.children,c):e.push(c.join("/"))}};return o(t),e};function C(t){const{role:e}=t;if(!e)return{permissions:{canRequestQuote:i.requestQuote,canEditQuote:i.editQuote,canDeleteQuote:i.deleteQuote,canCheckoutQuote:i.checkoutQuote}};const{permissions:o}=e,r=_(o);return{permissions:{canRequestQuote:r.includes(g),canEditQuote:r.includes(q),canDeleteQuote:r.includes(R),canCheckoutQuote:r.includes(T)}}}const U=async()=>{var t;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));try{const e=await m(p);if(!((t=e==null?void 0:e.data)!=null&&t.customer))throw new Error("No customer data received");return C(e.data.customer)}catch(e){return Promise.reject(e)}},N=`
    query QUOTE_DATA_QUERY(
        $quoteId: ID!
    ) {
        negotiableQuote(
            uid: $quoteId
        ) {
            ...NegotiableQuoteFragment
        }
    }

    ${E}
`,S=async t=>{var e;if(!n.authenticated)return Promise.reject(new Error("Unauthorized"));if(!n.permissions.editQuote)return Promise.reject(new Error("Unauthorized"));try{const o=await m(N,{variables:{quoteId:t}}),r=l((e=o==null?void 0:o.data)==null?void 0:e.negotiableQuote);if(!r)throw new Error("Failed to transform quote data");return s.emit("quote-management/quote-data",{quote:r,permissions:n.permissions}),r}catch(o){return Promise.reject(o)}},u=new h({init:async t=>{const e={};u.config.setConfig({...e,...t})},listeners:()=>[s.on("authenticated",async t=>{n.authenticated=!!t,t?U().then(e=>{n.permissions={requestQuote:e.permissions.canRequestQuote,editQuote:e.permissions.canEditQuote,deleteQuote:e.permissions.canDeleteQuote,checkoutQuote:e.permissions.canCheckoutQuote},s.emit("quote-management/permissions",n.permissions)}).catch(e=>{console.error(e),n.permissions=i,s.emit("quote-management/permissions",i)}):(n.permissions=i,s.emit("quote-management/permissions",i))},{eager:!0}),s.on("quote-management/permissions",async t=>{const e=u.config.getConfig().quoteId;e&&t.editQuote&&S(e).then(o=>{s.emit("quote-management/quote-data/initialized",{quote:o,permissions:t},{})}).catch(o=>{s.emit("quote-management/quote-data/error",{error:o})})},{eager:!0})]}),F=u.config,{setEndpoint:P,setFetchGraphQlHeader:D,removeFetchGraphQlHeader:y,setFetchGraphQlHeaders:G,fetchGraphQl:m,getConfig:b}=new Q().getMethods();export{v as FilterMatchTypeEnum,H as NegotiableQuoteSortableField,L as SortEnum,F as config,m as fetchGraphQl,b as getConfig,U as getCustomerData,S as getQuoteData,u as initialize,V as negotiableQuotes,y as removeFetchGraphQlHeader,k as requestNegotiableQuote,P as setEndpoint,D as setFetchGraphQlHeader,G as setFetchGraphQlHeaders};
//# sourceMappingURL=api.js.map
