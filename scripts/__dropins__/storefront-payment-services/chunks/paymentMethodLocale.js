/*! Copyright 2026 Adobe
All Rights Reserved. */
import{p as e,PaymentLocation as a}from"../api.js";import{D as r}from"./localizedError.js";function s(o){const t=e.value;switch(o){case a.CHECKOUT:return t==null?void 0:t.checkout;case a.PRODUCT_DETAIL:return t==null?void 0:t.productDetail;default:throw new Error(`Unsupported location: ${o}`)}}function c(o){const t=o.split("_");if(t.length<2){const n=c(r);return console.warn(`Cannot map elsie locale "${o}" to the payment method buttons' locale. Falling back to "${n}".`),n}return`${t[0]}-${t[1]}`}export{s as g,c as t};
//# sourceMappingURL=paymentMethodLocale.js.map
