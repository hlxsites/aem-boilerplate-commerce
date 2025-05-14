/*! Copyright 2025 Adobe
All Rights Reserved. */
import{events as t}from"@dropins/tools/event-bus.js";const s={billingAddress:null,email:"",isBillToShipping:!0,selectedPaymentMethod:null,selectedShippingMethod:null,shippingAddress:null};function u(e){const n={...t.lastPayload("checkout/values")??s,...e};t.emit("checkout/values",n)}function a(e){const l=t.lastPayload("checkout/values");return l&&e in l?l[e]:null}export{a as g,u as n};
