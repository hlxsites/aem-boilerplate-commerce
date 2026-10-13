/*! Copyright 2026 Adobe
All Rights Reserved. */
import{p as u,PaymentLocation as r}from"../api.js";function n(o){const t=u.value;switch(o){case r.CHECKOUT:return t==null?void 0:t.checkout;case r.PRODUCT_DETAIL:return t==null?void 0:t.productDetail;default:throw new Error(`Unsupported location: ${o}`)}}export{n as g};
//# sourceMappingURL=paymentSdk.js.map
