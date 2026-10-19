/*! Copyright 2026 Adobe
All Rights Reserved. */
import{p as u,PaymentLocation as o}from"../api.js";function c(r){const t=u.value;switch(r){case o.CHECKOUT:return t==null?void 0:t.checkout;case o.PRODUCT_DETAIL:return t==null?void 0:t.productDetail;case o.MINICART:return t==null?void 0:t.minicart;case o.CART:return t==null?void 0:t.cart;default:throw new Error(`Unsupported location: ${r}`)}}export{c as g};
//# sourceMappingURL=paymentSdk.js.map
