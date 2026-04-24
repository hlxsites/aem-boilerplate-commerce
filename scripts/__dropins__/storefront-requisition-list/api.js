/*! Copyright 2026 Adobe
All Rights Reserved. */
import{c as N,g as x,i as G}from"./chunks/initialize.js";import{g as F}from"./chunks/getRequisitionLists.js";import{a as y,c as A,d as M,g as O,m as H,u as k}from"./chunks/copyItemsBetweenRequisitionLists.js";import{R as I}from"./chunks/updateRequisitionList.js";import{u as B}from"./chunks/updateRequisitionList.js";import{d as w}from"./chunks/deleteRequisitionList.js";import{g as D,s as P}from"./chunks/shareRequisitionListByToken.js";import{s as b}from"./chunks/shareRequisitionListByEmail.js";import{h as u}from"./chunks/fetch-error.js";import{R,t as p}from"./chunks/transform-requisition-list.js";import"@dropins/tools/event-bus.js";import{f as L}from"./chunks/fetch-graphql.js";import{g as J,r as K,s as V,a as W,b as X}from"./chunks/fetch-graphql.js";import{i as ee}from"./chunks/importSharedRequisitionList.js";import"@dropins/tools/lib.js";import"./chunks/state.js";import"@dropins/tools/fetch-graphql.js";const S=`
  query GET_SHARED_REQUISITION_LIST_QUERY(
    $token: String!
    $currentPage: Int = 1
    $pageSize: Int = 10
  ) {
    sharedRequisitionList(token: $token) {
      sender_name
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${I}
${R}
`,h=async(a,n,m,s)=>{var o;const{errors:r,data:t}=await L(S,{variables:{token:a,currentPage:n,pageSize:m}});if(r)return u(r);const i=t==null?void 0:t.sharedRequisitionList;if(!(i!=null&&i.requisition_list))return null;let e=p(i.requisition_list);return e?((o=e.items)!=null&&o.length&&s&&(e={...e,items:await s(e.items)}),{senderName:i.sender_name,requisitionList:e}):null};export{y as addRequisitionListItemsToCart,N as config,A as copyItemsBetweenRequisitionLists,w as deleteRequisitionList,M as deleteRequisitionListItems,L as fetchGraphQl,D as getCompanyUsers,J as getConfig,O as getRequisitionList,F as getRequisitionLists,h as getSharedRequisitionList,x as getStoreConfig,ee as importSharedRequisitionList,G as initialize,H as moveItemsBetweenRequisitionLists,K as removeFetchGraphQlHeader,V as setEndpoint,W as setFetchGraphQlHeader,X as setFetchGraphQlHeaders,b as shareRequisitionListByEmail,P as shareRequisitionListByToken,B as updateRequisitionList,k as updateRequisitionListItems};
//# sourceMappingURL=api.js.map
