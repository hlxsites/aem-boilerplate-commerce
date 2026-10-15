/*! Copyright 2026 Adobe
All Rights Reserved. */
import{D as n}from"./localizedError.js";function a(o){const t=o.split("_");if(t.length<2){const e=a(n);return console.warn(`Cannot map elsie locale "${o}" to the payment method buttons' locale. Falling back to "${e}".`),e}return`${t[0]}-${t[1]}`}export{a as t};
//# sourceMappingURL=paymentMethodLocale.js.map
