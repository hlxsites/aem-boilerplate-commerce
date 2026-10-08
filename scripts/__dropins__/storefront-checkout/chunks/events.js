/*! Copyright 2026 Adobe
All Rights Reserved. */
import{signal as i}from"@dropins/tools/signals.js";import{g as t}from"../api.js";const l=i(!1);function p(n){var s;return n===void 0?!!((s=t())!=null&&s.isVirtual):!!(n!=null&&n.isVirtual)}function g(n){return!n||n.isEmpty}function f(n){var e;if(!n)return null;const s=n.shippingAddresses||[];return s.length===0?null:(e=s[0])==null?void 0:e.selectedShippingMethod}function c(n,s="shipping"){var r;return n?(s==="shipping"?(r=n.shippingAddresses)==null?void 0:r[0]:n.billingAddress)??null:null}function d(n){if(!n)return null;const{selectedPaymentMethod:s}=n;return!s||!(s!=null&&s.code)?null:n.selectedPaymentMethod}export{p as a,g as b,c,d,f as g,l as i};
//# sourceMappingURL=events.js.map
