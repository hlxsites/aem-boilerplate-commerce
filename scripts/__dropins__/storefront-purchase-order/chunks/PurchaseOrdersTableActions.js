/*! Copyright 2025 Adobe
All Rights Reserved. */
import{jsxs as e,jsx as a}from"@dropins/tools/preact-jsx-runtime.js";import{classes as t}from"@dropins/tools/lib.js";/* empty css                */import{Button as c}from"@dropins/tools/components.js";const h=({loading:s,selectedCount:r,className:i,handleRejectSelected:o,handleApproveSelected:d})=>e("div",{className:t(["b2b-purchase-order-purchase-orders-table-actions",i]),children:[e("div",{children:["Selected ",r]}),e("div",{className:"b2b-purchase-order-purchase-orders-table-actions__buttons",children:[a(c,{variant:"secondary",onClick:o,disabled:s||r===0,children:"Reject selected"}),a(c,{variant:"primary",onClick:d,disabled:s||r===0,children:"Approve selected"})]})]});export{h as P};
//# sourceMappingURL=PurchaseOrdersTableActions.js.map
