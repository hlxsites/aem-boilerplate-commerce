/*! Copyright 2026 Adobe
All Rights Reserved. */
import * as V from "@dropins/tools/preact-bundle.js";
import { jsxs as v, useId as He, useState as F, useRef as zt, useMemo as ne, useEffect as st, useCallback as wt, useLayoutEffect as Ta, jsx as t, Fragment as _t, forwardRef as ka, useImperativeHandle as Sa } from "@dropins/tools/preact-bundle.js";
import { classes as q, VComponent as J, getFormValues as ea, Slot as at, debounce as Oa } from "@dropins/tools/lib.js";
import { Modal as aa, ProgressSpinner as Qe, InLineAlert as be, ContentGrid as ia, Image as Pe, Button as kt, ProductItemCard as Na, IllustratedMessage as Ga, Icon as Et, Divider as Be, Skeleton as Ae, SkeletonRow as Me, Accordion as me, AccordionSection as pe, LiveRegion as Fe, Card as ra, Field as ue, Checkbox as Ve, Input as ge, TextArea as La, Price as X, ImageSwatch as Ea, Picker as Xe, CartList as ze, CartItem as Pa, Incrementer as Aa, Tag as na } from "@dropins/tools/components.js";
import { useText as It, Text as ae } from "@dropins/tools/i18n.js";
import { getAvailableFreeGiftsForCart as Ma, selectFreeGiftForCart as Fa, s as xt, a as Ke, getCountries as Da, getRegions as Wa, getEstimateShipping as $a, addProductsToCart as oa, getCartDataFromCache as ce, updateProductsFromCart as fe, p as la, getEstimatedTotals as Va, applyCouponsToCart as Ye, ApplyCouponsStrategy as Je, removeGiftCardFromCart as za, applyGiftCardToCart as Ua, setGiftOptionsOnCart as Ba } from "./api.js";
import { events as yt } from "@dropins/tools/event-bus.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
import { g as ca, a as sa, b as da } from "./chunks/getBackorderText.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const qa = (e) => V.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, V.createElement("g", { id: "Large" }, V.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), V.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, V.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), V.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" })))), Ra = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("g", { clipPath: "url(#clip0_102_196)" }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), V.createElement("defs", null, V.createElement("clipPath", { id: "clip0_102_196" }, V.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" })))), Ge = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M6.75 12.762L10.2385 15.75L17.25 9", stroke: "currentColor" })), Ce = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M7.74512 9.87701L12.0001 14.132L16.2551 9.87701", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), Ha = (e) => V.createElement("svg", { id: "Icon_Chevron_right_Base", "data-name": "Icon \\u2013 Chevron right \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, V.createElement("g", { id: "Large" }, V.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), V.createElement("g", { id: "Chevron_right_icon", "data-name": "Chevron right icon" }, V.createElement("path", { vectorEffect: "non-scaling-stroke", id: "chevron", d: "M199.75,367.5l4.255,-4.255-4.255,-4.255", transform: "translate(-189.25 -351.0)", fill: "none", stroke: "currentColor" })))), Le = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { d: "M7.74512 14.132L12.0001 9.87701L16.2551 14.132", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), ua = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3599 5.64001L5.62988 18.37", stroke: "currentColor" }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3599 18.37L5.62988 5.64001", stroke: "currentColor" })), ma = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M22 6.25H22.75C22.75 5.83579 22.4142 5.5 22 5.5V6.25ZM22 9.27L22.2514 9.97663C22.5503 9.87029 22.75 9.58731 22.75 9.27H22ZM20.26 12.92L19.5534 13.1714L19.5539 13.1728L20.26 12.92ZM22 14.66H22.75C22.75 14.3433 22.551 14.0607 22.2528 13.9539L22 14.66ZM22 17.68V18.43C22.4142 18.43 22.75 18.0942 22.75 17.68H22ZM2 17.68H1.25C1.25 18.0942 1.58579 18.43 2 18.43V17.68ZM2 14.66L1.74865 13.9534C1.44969 14.0597 1.25 14.3427 1.25 14.66H2ZM3.74 11.01L4.44663 10.7586L4.44611 10.7572L3.74 11.01ZM2 9.27H1.25C1.25 9.58675 1.44899 9.86934 1.7472 9.97611L2 9.27ZM2 6.25V5.5C1.58579 5.5 1.25 5.83579 1.25 6.25H2ZM21.25 6.25V9.27H22.75V6.25H21.25ZM21.7486 8.56337C19.8706 9.23141 18.8838 11.2889 19.5534 13.1714L20.9666 12.6686C20.5762 11.5711 21.1494 10.3686 22.2514 9.97663L21.7486 8.56337ZM19.5539 13.1728C19.9195 14.1941 20.7259 15.0005 21.7472 15.3661L22.2528 13.9539C21.6541 13.7395 21.1805 13.2659 20.9661 12.6672L19.5539 13.1728ZM21.25 14.66V17.68H22.75V14.66H21.25ZM22 16.93H2V18.43H22V16.93ZM2.75 17.68V14.66H1.25V17.68H2.75ZM2.25135 15.3666C4.12941 14.6986 5.11623 12.6411 4.44663 10.7586L3.03337 11.2614C3.42377 12.3589 2.85059 13.5614 1.74865 13.9534L2.25135 15.3666ZM4.44611 10.7572C4.08045 9.73588 3.27412 8.92955 2.2528 8.56389L1.7472 9.97611C2.34588 10.1905 2.81955 10.6641 3.03389 11.2628L4.44611 10.7572ZM2.75 9.27V6.25H1.25V9.27H2.75ZM2 7H22V5.5H2V7ZM7.31 6.74V18.17H8.81V6.74H7.31ZM17.0997 8.39967L11.0397 14.4597L12.1003 15.5203L18.1603 9.46033L17.0997 8.39967ZM12.57 9.67C12.57 9.87231 12.4159 10 12.27 10V11.5C13.2839 11.5 14.07 10.6606 14.07 9.67H12.57ZM12.27 10C12.1241 10 11.97 9.87231 11.97 9.67H10.47C10.47 10.6606 11.2561 11.5 12.27 11.5V10ZM11.97 9.67C11.97 9.46769 12.1241 9.34 12.27 9.34V7.84C11.2561 7.84 10.47 8.67938 10.47 9.67H11.97ZM12.27 9.34C12.4159 9.34 12.57 9.46769 12.57 9.67H14.07C14.07 8.67938 13.2839 7.84 12.27 7.84V9.34ZM17.22 14.32C17.22 14.5223 17.0659 14.65 16.92 14.65V16.15C17.9339 16.15 18.72 15.3106 18.72 14.32H17.22ZM16.92 14.65C16.7741 14.65 16.62 14.5223 16.62 14.32H15.12C15.12 15.3106 15.9061 16.15 16.92 16.15V14.65ZM16.62 14.32C16.62 14.1177 16.7741 13.99 16.92 13.99V12.49C15.9061 12.49 15.12 13.3294 15.12 14.32H16.62ZM16.92 13.99C17.0659 13.99 17.22 14.1177 17.22 14.32H18.72C18.72 13.3294 17.9339 12.49 16.92 12.49V13.99Z", fill: "currentColor" })), qe = (e) => V.createElement("svg", { width: 20, height: 23, viewBox: "0 0 20 23", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M10 6L10 21.5M10 6H12.25C13.4926 6 14.5 4.99264 14.5 3.75C14.5 2.50736 13.4926 1.5 12.25 1.5C11.0074 1.5 10 2.50736 10 3.75M10 6V3.75M10 6H7.75C6.50736 6 5.5 4.99264 5.5 3.75C5.5 2.50736 6.50736 1.5 7.75 1.5C8.99264 1.5 10 2.50736 10 3.75M3.25 10.75H16.75C17.9926 10.75 19 9.74264 19 8.5C19 7.25736 17.9926 6.25 16.75 6.25H3.25C2.00736 6.25 1 7.25736 1 8.5C1 9.74264 2.00736 10.75 3.25 10.75ZM4.75 21.5H15.25C16.4926 21.5 17.5 20.4926 17.5 19.25V13.25C17.5 12.0074 16.4926 11 15.25 11H4.75C3.50736 11 2.5 12.0074 2.5 13.25V19.25C2.5 20.4926 3.50736 21.5 4.75 21.5Z", stroke: "currentColor", strokeWidth: 1 })), pa = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M22 12.8571V6.75774C22 6.33761 21.5848 6 21.0884 6H2.91155C2.40614 6 2 6.34511 2 6.75774V12.8571M22 12.8571H2M22 12.8571V17.0049C22 17.5468 21.5939 18 21.0884 18H2.91155C2.41516 18 2 17.5567 2 17.0049V12.8571M5.18182 16.0886L8.64545 12.8229M8.64545 12.8229L12.1087 16.0886M8.64545 12.8229C8.64545 12.8229 8.09964 10.4743 7.56328 9.96857C7.02692 9.46286 6.15419 9.46286 5.61783 9.96857C5.08146 10.4743 5.08146 11.2971 5.61783 11.8029C6.15419 12.3086 8.64545 12.8229 8.64545 12.8229ZM8.64545 12.8229C8.64545 12.8229 11.1542 12.2914 11.6905 11.7857C12.2269 11.28 12.2269 10.4571 11.6905 9.95141C11.1542 9.4457 10.2814 9.4457 9.74507 9.95141C9.2087 10.4571 8.64545 12.8229 8.64545 12.8229ZM8.64506 17.2886V6.70286", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" })), Qa = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { d: "M17.3332 11.75H6.6665", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", fill: "none", stroke: "currentColor" })), Re = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("g", { clipPath: "url(#clip0_4797_15331)" }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M10.25 20.91L1.5 17.55V6.51996L10.25 9.92996V20.91Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M6.24023 4.64001L14.9902 8.06001V11.42", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), V.createElement("path", { className: "error-icon", vectorEffect: "non-scaling-stroke", d: "M19 13.31L15.5 19.37H22.5L19 13.31Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), V.createElement("path", { className: "error-icon", vectorEffect: "non-scaling-stroke", d: "M19.0202 17.11H18.9802L18.9502 15.56H19.0502L19.0202 17.11ZM18.9602 18.29V18.06H19.0502V18.29H18.9602Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19 12.16V6.51996L10.25 9.92996V20.91L14.27 19.37L14.4 19.32", stroke: "currentColor", strokeLinejoin: "round", strokeWidth: 1 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1.5 6.51999L10.25 3.04999L19 6.51999L10.25 9.92999L1.5 6.51999Z", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1 })), V.createElement("defs", null, V.createElement("clipPath", { id: "clip0_4797_15331" }, V.createElement("rect", { width: 22, height: 18.86, fill: "white", transform: "translate(1 2.54999)" })))), ga = (e) => V.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1 5H23", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 })), fa = (e) => V.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), V.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.75 5.88423V4.75H12.25V5.88423L12.0485 13.0713H11.9515L11.75 5.88423ZM11.7994 18.25V16.9868H12.2253V18.25H11.7994Z", stroke: "currentColor" })), Ze = ({ className: e, children: l, ctaLinkURL: r, ...i }) => {
  const o = It({ emptyCart: "Cart.EmptyCart.heading", cta: "Cart.EmptyCart.cta" });
  return t("div", { ...i, className: q(["cart-empty-cart", e]), children: t(Ga, { className: q(["cart-empty-cart__wrapper", e]), "data-testid": "cart-empty-cart", heading: o.emptyCart, icon: t(Et, { className: "cart-empty-cart__icon", source: Ra }), action: r ? t(kt, { "data-testid": "cart-empty-cart-button", size: "medium", variant: "primary", type: "submit", href: r, children: o.cta }, "routeHome") : void 0 }) });
}, Za = ({ countryField: e, destinationText: l, estimateButton: r, estimated: i, loading: o, onEstimate: u, price: m, priceExcludingTax: c, priceIncludingTax: g, stateField: y, taxExcluded: P, taxIncluded: d, zipField: x }) => {
  const h = zt(null), [p, _] = F(!0), [T, k] = F("zip"), a = It({ editZipAction: "Cart.EstimateShipping.editZipAction", destinationLinkAriaLabel: "Cart.EstimateShipping.destinationLinkAriaLabel", shippingLabel: "Cart.EstimateShipping.label", zipPlaceholder: "Cart.EstimateShipping.zipPlaceholder", loadingLabel: "Cart.EstimateShipping.loadingLabel" }), S = (b) => {
    b.preventDefault(), _((D) => !D);
  }, A = (b) => {
    b.preventDefault(), _(!0), k((D) => D === "zip" ? "state" : "zip");
  }, N = (b) => {
    b.preventDefault(), _(!1);
    const D = ea(h.current);
    u == null || u(D);
  }, M = a.destinationLinkAriaLabel.replace("{destination}", l);
  return v("div", { "data-testid": "estimate-shipping", className: q(["cart-estimate-shipping", ["cart-estimate-shipping--loading", o]]), children: [t(Fe, { message: o ? a.loadingLabel : "" }), t("span", { className: "cart-estimate-shipping__label", children: i ? l ? v(_t, { children: [t(ae, { id: "Cart.EstimateShipping.estimatedDestination" }), " ", t("a", { className: "cart-estimate-shippingLink", role: "button", href: "", onClick: S, onKeyDown: (b) => {
    (b.key === "Enter" || b.key === " ") && S(b);
  }, tabIndex: 0, "aria-label": M, "aria-expanded": p, "data-testid": "shipping-destination-link", children: l })] }) : t(ae, { id: "Cart.EstimateShipping.estimated" }) : t(ae, { id: "Cart.EstimateShipping.label" }) }), t(J, { node: m, className: "cart-estimate-shipping__price" }), i && v(_t, { children: [t("div", { className: q(["cart-estimate-shipping__caption"]), children: t("a", { href: "#", className: "cart-estimate-shipping__link", onClick: A, "data-testid": "shipping-alternate-field-link", children: T === "zip" ? t(ae, { id: "Cart.EstimateShipping.alternateField.state" }) : t(ae, { id: "Cart.EstimateShipping.alternateField.zip" }) }) }), v("form", { className: q(["cart-estimate-shipping--edit", ["cart-estimate-shipping--hide", !p]]), ref: h, "data-testid": "shipping-estimate-form", children: [e && t(J, { node: e, className: q(["cart-estimate-shipping--country"]) }), T === "state" ? y && t(J, { node: y, className: q(["cart-estimate-shipping--state"]) }) : x && t(J, { node: x, className: q(["cart-estimate-shipping--zip"]) }), r && t(J, { node: r, className: q(["cart-estimate-shipping--action"]), onClick: N, type: "submit" })] })] }), d && t("div", { "data-testid": "shipping-tax-included", className: q(["cart-estimate-shipping__caption"]), children: v("span", { children: [g, " ", t(ae, { id: "Cart.EstimateShipping.withTaxes" })] }) }), P ? t("div", { "data-testid": "shipping-tax-included-excluded", className: q(["cart-estimate-shipping__caption"]), children: v("span", { children: [c, " ", t(ae, { id: "Cart.EstimateShipping.withoutTaxes" })] }) }) : void 0] });
}, ja = ({ className: e, liveRegion: l, products: r, productListFooter: i, subtotal: o, subtotalExcludingTaxes: u, preCheckoutSection: m, ctas: c, ...g }) => {
  const y = It({ subtotal: "Cart.MiniCart.subtotal", subtotalExcludingTaxes: "Cart.MiniCart.subtotalExcludingTaxes" });
  return v("div", { ...g, className: q(["cart-mini-cart", e]), children: [l && t(J, { node: l }), r && v(_t, { children: [t("div", { className: "cart-mini-cart__products", "data-testid": "mini-cart-products-wrapper", children: r }), i && t("div", { className: q(["cart-mini-cart__productListFooter"]), "data-testid": "mini-cart-product-list-footer", children: t(J, { node: i }) }), v("div", { className: "cart-mini-cart__footer", "data-testid": "mini-cart-subtotals", children: [o && v("div", { className: "cart-mini-cart__footer__estimated-total", "data-testid": "mini-cart-subtotal", children: [y.subtotal, t(J, { node: o })] }), u && v("div", { className: "cart-mini-cart__footer__estimated-total-excluding-taxes", "data-testid": "mini-cart-subtotal-excluding-taxes", children: [y.subtotalExcludingTaxes, t(J, { node: u, className: q(["dropin-price-summary__price", "dropin-price-summary__price--muted"]) })] }), m && t("div", { className: q(["cart-mini-cart__preCheckoutSection"]), "data-testid": "mini-cart-pre-checkout-section", children: t(J, { node: m }) }), c && t(J, { node: c, className: "cart-mini-cart__footer__ctas" })] })] })] });
}, Xa = ({ className: e, children: l, emptyCart: r, products: i, ...o }) => t("div", { ...o, className: q(["cart-cart-summary-grid", e]), children: t(_t, { children: t("div", { className: q(["cart-cart-summary-grid__content", ["cart-cart-summary-grid__content--empty", !i]]), children: i || t(J, { node: r, className: "cart-cart-summary-grid__empty-cart" }) }) }) }), ta = ({ className: e, children: l, heading: r, footer: i, emptyCart: o, products: u, outOfStockMessage: m, variant: c = "primary", loading: g = !0, ...y }) => v("div", { ...y, className: q(["cart-cart-summary-list", e, `cart-cart-summary-list__background--${c}`]), children: [l, g ? t(Ka, {}) : v(_t, { children: [(r || m) && v("div", { "data-testid": "cart-summary-list-heading-wrapper", className: q(["cart-cart-summary-list__heading", ["cart-cart-summary-list__heading--full-width", !u]]), children: [r && v(_t, { children: [t(J, { node: r, className: "cart-cart-summary-list__heading-text" }), t(Be, { variant: "primary", className: q(["cart-cart-summary-list__heading-divider"]) })] }), m && t(J, { node: m, className: "cart-cart-summary-list__out-of-stock-message" })] }), t("div", { className: q(["cart-cart-summary-list__content", ["cart-cart-summary-list__content--empty", !u]]), children: u || t("div", { "aria-live": "assertive", "aria-relevant": "all", children: t(J, { node: o, className: "cart-cart-summary-list__empty-cart" }) }) }), i && v(_t, { children: [t(Be, { variant: "primary", className: q(["cart-cart-summary-list__footer-divider"]) }), t(J, { node: i, className: "cart-cart-summary-list__footer-text" })] })] })] }), Ka = () => t(Ae, { "data-testid": "cart-summary-list-skeleton", className: "cart-cart-summary-list__skeleton", rowGap: "medium", children: t(Me, { variant: "row", size: "xlarge", fullWidth: !0, lines: 3, multilineGap: "small" }) }), Ft = ({ label: e, price: l, classSuffixes: r = [], labelClassSuffix: i, testId: o, children: u, ...m }) => t(Ja, { ...m, label: e, price: l, classSuffixes: r, labelClassSuffix: i, testId: o, children: u }), Ya = ({ className: e, children: l, variant: r = "primary", heading: i, loading: o = !0, subTotal: u, shipping: m, discounts: c, taxTotal: g, taxesApplied: y, total: P, primaryAction: d, coupons: x, giftCards: h, totalSaved: p, appliedGiftCards: _, printedCard: T, itemsGiftWrapping: k, orderGiftWrapping: a, updateLineItems: S = (N) => N, ...A }) => {
  const [N, M] = F(!1), b = It({ checkout: "Cart.PriceSummary.checkout", loadingLabel: "Cart.PriceSummary.loadingLabel", discountedPrice: "Cart.CartItem.discountedPrice", download: "Cart.CartItem.download", heading: "Cart.Cart.heading", message: "Cart.CartItem.message", regularPrice: "Cart.CartItem.regularPrice", recipient: "Cart.CartItem.recipient", sender: "Cart.CartItem.sender", file: "Cart.CartItem.file", files: "Cart.CartItem.files", orderSummary: "Cart.PriceSummary.orderSummary", taxesBreakdownTitle: "Cart.PriceSummary.taxes.breakdown", taxTotal: "Cart.PriceSummary.taxes.total", taxEstimated: "Cart.PriceSummary.taxes.estimated", taxTotalOnly: "Cart.PriceSummary.taxes.totalOnly", showTaxBreakdown: "Cart.PriceSummary.taxes.showBreakdown", hideTaxBreakdown: "Cart.PriceSummary.taxes.hideBreakdown", taxToBeDetermined: "Cart.PriceSummary.taxToBeDetermined", subtotalLabel: "Cart.PriceSummary.subTotal.label", subtotalWithTaxes: "Cart.PriceSummary.subTotal.withTaxes", subtotalWithoutTaxes: "Cart.PriceSummary.subTotal.withoutTaxes", totalEstimated: "Cart.PriceSummary.total.estimated", totalLabel: "Cart.PriceSummary.total.label", totalWithoutTax: "Cart.PriceSummary.total.withoutTax", totalSaved: "Cart.PriceSummary.total.saved", shippingLabel: "Cart.PriceSummary.shipping.label", zipPlaceholder: "Cart.PriceSummary.shipping.zipPlaceholder", editZipAction: "Cart.PriceSummary.shipping.editZipAction", shippingWithTaxes: "Cart.PriceSummary.shipping.withTaxes", shippingWithoutTaxes: "Cart.PriceSummary.shipping.withoutTaxes", shippingEstimated: "Cart.PriceSummary.shipping.estimated", shippingEstimatedByState: "Cart.PriceSummary.shipping.alternateField.state", shippingEstimatedByZip: "Cart.PriceSummary.shipping.alternateField.zip", destinationLinkAriaLabel: "Cart.PriceSummary.shipping.destinationLinkAriaLabel", applyButton: "Cart.PriceSummary.estimatedShippingForm.apply.label", countryField: "Cart.PriceSummary.estimatedShippingForm.country.placeholder", freeShipping: "Cart.PriceSummary.freeShipping", stateField: "Cart.PriceSummary.estimatedShippingForm.state.placeholder", zipField: "Cart.PriceSummary.estimatedShippingForm.zip.placeholder", printedCardTitle: "Cart.PriceSummary.giftOptionsTax.printedCard.title", printedCardInclTax: "Cart.PriceSummary.giftOptionsTax.printedCard.inclTax", printedCardExclTax: "Cart.PriceSummary.giftOptionsTax.printedCard.exclTax", itemGiftWrappingTitle: "Cart.PriceSummary.giftOptionsTax.itemGiftWrapping.title", itemGiftWrappingInclTax: "Cart.PriceSummary.giftOptionsTax.itemGiftWrapping.inclTax", itemGiftWrappingExclTax: "Cart.PriceSummary.giftOptionsTax.itemGiftWrapping.exclTax", orderGiftWrappingTitle: "Cart.PriceSummary.giftOptionsTax.orderGiftWrapping.title", orderGiftWrappingInclTax: "Cart.PriceSummary.giftOptionsTax.orderGiftWrapping.inclTax", orderGiftWrappingExclTax: "Cart.PriceSummary.giftOptionsTax.orderGiftWrapping.exclTax" }), D = _ ? t(Ft, { label: _ == null ? void 0 : _.label, price: _ == null ? void 0 : _.price, classSuffixes: ["applied-gift-cards"], children: _ == null ? void 0 : _.content }, _ == null ? void 0 : _.label) : null, R = u && v(Ft, { label: b.subtotalLabel, price: u.price, classSuffixes: ["subTotal"], children: [u.taxIncluded && t("div", { "data-testid": "sub-total-tax-caption", className: "cart-order-summary__caption", children: t("span", { children: b.subtotalWithTaxes }) }), u.taxExcluded ? t("div", { "data-testid": "sub-total-tax-caption-excluded", className: "cart-order-summary__caption", children: v("span", { children: [u.priceExcludingTax, " ", b.subtotalWithoutTaxes] }) }) : void 0] }, b.subtotalLabel), B = c && c.length > 0 && t(_t, { children: c.map((K) => v(Ft, { label: K.label, price: K.price, classSuffixes: ["discount"], children: [K.coupon && t(J, { node: K.coupon, className: "cart-order-summary__coupon__code" }), K.caption && t(J, { node: K.caption, className: "cart-order-summary__caption" })] }, K.label)) }), H = y && y.length > 0 ? t(me, { "data-testid": "tax-breakdown", className: "cart-order-summary__taxes", iconOpen: Ce, iconClose: Le, children: v(pe, { title: b.taxesBreakdownTitle, secondaryText: !N && g ? t(J, { node: g.price, className: "cart-order-summary__price" }) : void 0, renderContentWhenClosed: !1, onStateChange: M, children: [t("div", { className: "cart-order-summary__appliedTaxes", children: y.map((K) => t(Ft, { label: K.label, price: K.price, classSuffixes: ["taxEntry"], labelClassSuffix: "muted" }, K.label)) }), g && t(Ft, { label: b.taxTotal, price: g.price, classSuffixes: ["taxTotal"], labelClassSuffix: "muted" })] }) }) : g && t(Ft, { label: g.estimated ? b.taxEstimated : b.taxTotalOnly, price: g.price, classSuffixes: ["taxTotal"], testId: "tax-total-only" }), Q = T != null && T.renderContent ? v(Ft, { label: b.printedCardTitle, price: T.taxInclAndExcl || T.taxIncluded ? T.priceInclTax : T.priceExclTax, classSuffixes: ["printedCardContent"], children: [T.taxIncluded && t("div", { "data-testid": "printed-card-incl", className: "cart-order-summary__caption", children: t("span", { children: b.printedCardInclTax }) }), T.taxInclAndExcl ? t("div", { "data-testid": "printed-card-incl-excl", className: "cart-order-summary__caption", children: v("span", { children: [T.priceExclTax, " ", b.printedCardExclTax] }) }) : void 0] }, b.printedCardTitle) : null, W = k != null && k.renderContent ? v(Ft, { label: b.itemGiftWrappingTitle, price: k.taxInclAndExcl || k.taxIncluded ? k.priceInclTax : k.priceExclTax, classSuffixes: ["itemsGiftWrappingContent"], children: [k.taxIncluded ? t("div", { "data-testid": "item-gift-wrapping-incl", className: "cart-order-summary__caption", children: t("span", { children: b.itemGiftWrappingInclTax }) }) : null, k.taxInclAndExcl ? t("div", { "data-testid": "item-gift-wrapping-incl-excl", className: "cart-order-summary__caption", children: v("span", { children: [k.priceExclTax, " ", b.itemGiftWrappingExclTax] }) }) : null] }, b.itemGiftWrappingTitle) : null, Z = a != null && a.renderContent ? v(Ft, { label: b.orderGiftWrappingTitle, price: a.taxInclAndExcl || a.taxIncluded ? a.priceInclTax : a.priceExclTax, classSuffixes: ["orderGiftWrappingContent"], children: [a.taxIncluded && t("div", { "data-testid": "order-gift-wrapping-incl", className: "cart-order-summary__caption", children: t("span", { children: b.orderGiftWrappingInclTax }) }), a.taxInclAndExcl ? t("div", { "data-testid": "order-gift-wrapping-incl-excl", className: "cart-order-summary__caption", children: v("span", { children: [a.priceExclTax, " ", b.orderGiftWrappingExclTax] }) }) : void 0] }, b.orderGiftWrappingTitle) : null, ut = [{ key: "subTotalContent", sortOrder: 100, content: R }, ...m ? [{ key: "shippingContent", sortOrder: 200, content: t(J, { node: m, className: "cart-order-summary__shipping" }) }] : [], { key: "printedCard", sortOrder: 300, content: Q }, { key: "itemsGiftWrappingContent", sortOrder: 400, content: W }, { key: "orderGiftWrappingContent", sortOrder: 500, content: Z }, { key: "discountsContent", sortOrder: 600, content: B }, { key: "appliedGiftCardsContent", sortOrder: 700, content: D }, { key: "taxContent", sortOrder: 800, content: H }, ...P ? [{ key: "taxContent", sortOrder: 900, content: t(Ft, { label: P.estimated ? b.totalEstimated : b.totalLabel, price: P.price, classSuffixes: ["total", "total--padded"], testId: "total-content", labelClassSuffix: "bold" }) }] : [], ...P != null && P.priceWithoutTax ? [{ key: "totalWithoutTaxContent", sortOrder: 1e3, content: t(Ft, { label: b.totalWithoutTax, price: P.priceWithoutTax, classSuffixes: ["totalWithoutTax"], testId: "total-without-tax", labelClassSuffix: "muted" }) }] : [], ...p ? [{ key: "totalSavedContent", sortOrder: 1100, content: t(Ft, { label: b.totalSaved, price: p, classSuffixes: ["saved"], testId: "total-saved", labelClassSuffix: "muted" }) }] : [], ...d ? [{ key: "primaryActionContent", sortOrder: 1200, content: t("div", { className: q(["cart-order-summary__entry", "cart-order-summary__primaryAction"]), children: d }) }] : [], ...x ? [{ key: "couponsContent", sortOrder: 1300, content: t(J, { node: x, className: "cart-order-summary__coupons" }) }] : [], ...h ? [{ key: "giftCardsContent", sortOrder: 1400, content: t(J, { node: h, className: "cart-order-summary__gift-cards" }) }] : []], tt = S(ut).sort((K, L) => K.sortOrder - L.sortOrder);
  return v("div", { ...A, className: q(["cart-order-summary", ["cart-order-summary--loading", o], [`cart-order-summary__${r}`, r], e]), children: [o && t(Qe, { className: "cart-order-summary__spinner" }), t(Fe, { message: o ? b.loadingLabel : "" }), v("div", { className: "cart-order-summary__heading", children: [i && t(J, { node: i, className: "cart-order-summary__heading-text" }), t(Be, { variant: "primary", className: "cart-order-summary__divider-primary" })] }), t("div", { className: "cart-order-summary__content", children: tt.map((K) => Array.isArray(K.content) ? t(me, { className: K.className, actionIconPosition: "right", iconOpen: Ce, iconClose: Le, children: t(pe, { defaultOpen: !1, title: K.title, renderContentWhenClosed: !1, children: K.content.map((L) => L.content) }) }, K.key) : K.content) })] });
}, va = ({ accordionSectionTitle: e, accordionSectionIcon: l, className: r, children: i, couponCodeField: o, applyCouponsButton: u, appliedCoupons: m, error: c, onApplyCoupon: g, ...y }) => {
  const P = zt(null), d = It({ couponTitle: "Cart.PriceSummary.coupon.title" }), x = (h) => {
    var p;
    h.preventDefault();
    const _ = ea(P.current);
    g == null || g(_);
    const T = (p = P == null ? void 0 : P.current) == null ? void 0 : p.querySelector("input");
    T && (T.value = "");
  };
  return t("div", { ...y, "data-testid": "cart-coupons", className: q(["cart-coupons", r]), children: t(me, { "data-testid": "coupon-code", className: q(["cart-coupons__accordion"]), actionIconPosition: "right", iconOpen: qa, iconClose: Qa, children: v(pe, { title: e ?? d.couponTitle, iconLeft: l ?? ma, showIconLeft: !0, renderContentWhenClosed: !1, "data-testid": "coupon-code-accordion-section", className: q(["cart-coupons__accordion-section"]), children: [t("form", { "data-testid": "coupon-code-form", className: q(["coupon-code-form--edit"]), ref: P, children: v("div", { className: q(["coupon-code-form__action"]), children: [o && t(J, { node: o, className: q(["coupon-code-form__codes"]) }), u && t(J, { node: u, className: q(["coupon-code-form--button"]), onClick: x, type: "submit" })] }) }), c && t(J, { node: c, className: q(["coupon-code-form__error"]) }), m && t(J, { node: m, className: q(["coupon-code-form__applied"]) })] }) }) });
}, Ja = ({ label: e, price: l, classSuffixes: r = [], labelClassSuffix: i, testId: o, children: u, ...m }) => {
  const c = "cart-order-summary__label", g = "cart-order-summary__price";
  return v("div", { ...m, ...o ? { "data-testid": o } : {}, className: q(["cart-order-summary__entry", ...r.map((y) => `cart-order-summary__${y}`)]), children: [t("span", { className: q([c, ...i ? [`${c}--${i}`] : []]), children: e }), t(J, { node: l, className: q([g, ...i ? [`${g}--${i}`] : []]) }), u] });
}, ti = ({ view: e, showModal: l, productName: r, giftWrappingConfig: i, imageSwatchImageNode: o, setShowModal: u, updateGiftOptions: m }) => {
  var c;
  const g = It({ modalTitle: "Cart.GiftOptions.modal.title", defaultTitle: "Cart.GiftOptions.modal.defaultTitle", modalWrappingText: "Cart.GiftOptions.modal.wrappingText", modalWrappingSubText: "Cart.GiftOptions.modal.wrappingSubText", modalConfirmButton: "Cart.GiftOptions.modal.modalConfirmButton", modalCancelButton: "Cart.GiftOptions.modal.modalCancelButton", ariaLabelWrapping: "Cart.GiftOptions.modal.ariaLabelWrapping" }), [y, P] = F();
  if (st(() => {
    const x = i.find((h) => h.selected) ?? i[0];
    P(x);
  }, [i]), !l || !i.length) return null;
  const d = r ? `${g.modalTitle} ${r}` : g.defaultTitle;
  return v(aa, { "data-testid": `gift-option-modal-${e}`, className: "cart-gift-options-view__modal", size: "medium", title: v(_t, { children: [t("h2", { children: d }), y && ((c = y == null ? void 0 : y.price) == null ? void 0 : c.value) > 0 ? t(X, { amount: y.price.value, currency: y.price.currency, weight: "normal" }) : null] }), centered: !0, onClose: u, children: [v("div", { className: "cart-gift-options-view__modal-content", children: [t("span", { className: "cart-gift-options-view__modal-text", children: g.modalWrappingText }), t(ia, { emptyGridContent: t(_t, {}), maxColumns: 6, columnWidth: "100px", className: "cart-gift-options-view__modal-grid", children: i.map((x) => t(Ea, { groupAriaLabel: g.ariaLabelWrapping, selected: (y == null ? void 0 : y.uid) === (x == null ? void 0 : x.uid), onValue: () => {
    P(x);
  }, imageNode: o, name: "giftWrappingId", value: x.uid, src: x.image.url, alt: x.design, label: x.design, "data-testid": `gift-option-modal-image-${x.uid}`, className: "cart-gift-options-view__modal-grid-item" }, x.uid)) }), t("span", { className: "cart-gift-options-view__modal-sub-text", children: y == null ? void 0 : y.design })] }), t(kt, { "data-testid": "gift-option-modal-confirm-button", type: "button", onClick: () => {
    m("giftWrappingId", y == null ? void 0 : y.uid, { isGiftWrappingSelected: !0 }), u();
  }, children: g.modalConfirmButton }), t(kt, { type: "button", variant: "secondary", onClick: u, "data-testid": "gift-option-modal-cancel-button", children: g.modalCancelButton })] });
}, ei = () => t(Ae, { children: t(Me, { variant: "row", size: "small", fullWidth: !0, lines: 1, multilineGap: "small" }) }), ai = (e, l, r = '[role="checkbox"], button, input') => {
  const i = zt(null);
  return st(() => {
    var o, u;
    if (e) return;
    const m = i.current;
    if (!m) return;
    i.current = null;
    const c = document.activeElement;
    c && c !== document.body || (m.isConnected ? m.focus() : (u = (o = l.current) == null ? void 0 : o.querySelector(r)) == null || u.focus());
  }, [e, l, r]), wt(() => {
    i.current = document.activeElement;
  }, []);
}, ii = ({ className: e, view: l, item: r, giftOptions: i, disabled: o, cartData: u, giftWrappingConfig: m, setShowModal: c, onInputChange: g, areGiftOptionsVisible: y }) => {
  var P, d, x, h;
  const p = He(), _ = It({ customize: `Cart.GiftOptions.${l}.customize`, giftReceiptIncludedTitle: `Cart.GiftOptions.${l}.giftReceiptIncluded.title`, giftReceiptIncludedText: `Cart.GiftOptions.${l}.giftReceiptIncluded.subtitle`, printedCardIncludedTitle: `Cart.GiftOptions.${l}.printedCardIncluded.title`, printedCardIncludedText: `Cart.GiftOptions.${l}.printedCardIncluded.subtitle`, giftOptionsWrapTitle: `Cart.GiftOptions.${l}.giftOptionsWrap.title`, giftOptionsWrapText: `Cart.GiftOptions.${l}.giftOptionsWrap.subtitle`, requiredFieldError: "Cart.GiftOptions.formText.requiredFieldError" }), T = zt(null), k = ai(o, T, '[role="checkbox"], button'), a = wt((W) => {
    k(), g(W);
  }, [k, g]), S = r == null ? void 0 : r.productGiftWrapping, A = u == null ? void 0 : u.cartGiftWrapping, N = l === "product" ? S : A, M = N == null ? void 0 : N.find((W) => W.uid === i.giftWrappingId), b = (M == null ? void 0 : M.design) ?? "", D = r == null ? void 0 : r.giftWrappingPrice, R = b ? `${_.giftOptionsWrapText} ${b}` : "", B = +(((d = (P = xt.config) == null ? void 0 : P.printedCardPrice) == null ? void 0 : d.value) ?? 0) > 0 ? (x = xt.config) == null ? void 0 : x.printedCardPrice : null;
  let H = null;
  D != null && D.value ? H = D : (h = M == null ? void 0 : M.price) != null && h.value && (H = M.price);
  const Q = (W) => W ? v("span", { children: [" (+", t(X, { amount: W.value, currency: W.currency, weight: "normal" }), ")"] }) : null;
  return v("div", { ref: T, className: q([e, [`${e}--hidden`, !y.isGiftOptionsVisible]]), children: [y.isGiftReceiptVisible ? t(ue, { disabled: o, className: "cart-gift-options-view__field-gift-receipt", children: t(Ve, { id: `giftReceiptIncluded-${p}`, disabled: o, name: "giftReceiptIncluded", checked: i.giftReceiptIncluded, placeholder: _.giftReceiptIncludedTitle, label: _.giftReceiptIncludedTitle, description: _.giftReceiptIncludedText, onChange: a }) }) : null, y.isPrintedCartVisible ? t(ue, { disabled: o, className: "cart-gift-options-view__field-printed-card", children: t(Ve, { id: `printedCardIncluded-${p}`, disabled: o, name: "printedCardIncluded", checked: i.printedCardIncluded, placeholder: _.printedCardIncludedTitle, label: v(_t, { children: [_.printedCardIncludedTitle, Q(B)] }), description: _.printedCardIncludedText, onChange: a }) }) : null, y.isGiftWrappingVisible ? v(_t, { children: [t(ue, { disabled: o, className: "cart-gift-options-view__field-gift-wrap", children: t(Ve, { id: `giftOptionsWrap-${p}`, disabled: o, name: "isGiftWrappingSelected", checked: i.isGiftWrappingSelected, placeholder: _.giftOptionsWrapTitle, label: v(_t, { children: [_.giftOptionsWrapTitle, Q(H)] }), description: R, onChange: a }) }), t(kt, { disabled: o || !m.length, type: "button", "data-testid": `gift-option-customize-${l}`, variant: "tertiary", onClick: () => c(!0), children: _.customize })] }) : null] });
}, ri = ({ view: e, giftOptions: l, disabled: r, errorMessage: i, onInputChange: o, onBlur: u, isGiftMessageVisible: m }) => {
  const c = He(), g = It({ formTitle: `Cart.GiftOptions.${e}.formContent.formTitle`, formTo: `Cart.GiftOptions.${e}.formContent.formTo`, formFrom: `Cart.GiftOptions.${e}.formContent.formFrom`, giftMessageTitle: `Cart.GiftOptions.${e}.formContent.giftMessageTitle`, formToPlaceholder: `Cart.GiftOptions.${e}.formContent.formToPlaceholder`, formFromPlaceholder: `Cart.GiftOptions.${e}.formContent.formFromPlaceholder`, formMessagePlaceholder: `Cart.GiftOptions.${e}.formContent.formMessagePlaceholder` });
  return m ? v(_t, { children: [t("span", { children: g.formTitle }), v("div", { children: [t("span", { children: g.formTo }), t(ue, { disabled: r, error: i.recipientName, children: t(ge, { id: `recipientName-${c}`, disabled: r, type: "text", name: "recipientName", value: l.recipientName, placeholder: g.formToPlaceholder, "aria-label": `${g.formTo} ${g.formToPlaceholder}`, onChange: o, onBlur: u }) })] }), v("div", { children: [t("span", { children: g.formFrom }), t(ue, { disabled: r, error: i.senderName, children: t(ge, { id: `senderName-${c}`, disabled: r, type: "text", name: "senderName", value: l.senderName, placeholder: g.formFromPlaceholder, "aria-label": `${g.formFrom} ${g.formFromPlaceholder}`, onChange: o, onBlur: u }) })] }), v("div", { children: [t("span", { children: g.giftMessageTitle }), t(ue, { disabled: r, children: t(La, { id: `message-${c}`, errorMessage: i.message, disabled: r, name: "message", value: l.message, label: g.formMessagePlaceholder, onChange: o, onBlur: u }) })] })] }) : null;
}, ni = ({ view: e, giftOptions: l, giftWrappingConfig: r, readOnlyFormOrderView: i }) => {
  const o = It({ readOnlyProductTitle: "Cart.GiftOptions.product.readOnlyFormView.title", wrapping: "Cart.GiftOptions.product.readOnlyFormView.wrapping", recipient: "Cart.GiftOptions.product.readOnlyFormView.recipient", sender: "Cart.GiftOptions.product.readOnlyFormView.sender", message: "Cart.GiftOptions.product.readOnlyFormView.message", readOnlyOrderTitle: "Cart.GiftOptions.order.readOnlyFormView.title", readOnlyOrderGiftReceiptTitle: "Cart.GiftOptions.order.readOnlyFormView.giftReceipt", readOnlyOrderGiftReceiptText: "Cart.GiftOptions.order.readOnlyFormView.giftReceiptText", readOnlyOrderGiftPrintCardTitle: "Cart.GiftOptions.order.readOnlyFormView.printCard", readOnlyOrderGiftPrintCardText: "Cart.GiftOptions.order.readOnlyFormView.printCardText", readOnlyOrderGiftWrapTitle: "Cart.GiftOptions.order.readOnlyFormView.giftWrap", readOnlyOrderGiftWrapOptionsText: "Cart.GiftOptions.order.readOnlyFormView.giftWrapOptions", readOnlyOrderFormTitle: "Cart.GiftOptions.order.readOnlyFormView.formTitle", readOnlyOrderFormTo: "Cart.GiftOptions.order.readOnlyFormView.formTo", readOnlyOrderFormFrom: "Cart.GiftOptions.order.readOnlyFormView.formFrom", readOnlyOrderFormMessageTitle: "Cart.GiftOptions.order.readOnlyFormView.formMessageTitle" }), { recipientName: u, senderName: m, message: c, giftReceiptIncluded: g, printedCardIncluded: y, isGiftWrappingSelected: P } = l, d = r == null ? void 0 : r.find(({ uid: k }) => k === (l == null ? void 0 : l.giftWrappingId)), x = !!u || !!m || !!c, h = d == null ? void 0 : d.design, p = g || y || (d == null ? void 0 : d.selected), _ = [{ id: 1, title: o.wrapping, message: P ? h : "" }, { id: 2, title: o.recipient, message: u }, { id: 3, title: o.sender, message: m }, { id: 4, title: o.message, message: c }], T = _.every(({ message: k }) => !k);
  if (e === "product" && !T) return t(me, { "data-testid": "gift-options-product", iconClose: Le, iconOpen: Ce, actionIconPosition: "right", children: t(pe, { title: o.readOnlyProductTitle, showIconLeft: !0, iconLeft: qe, defaultOpen: !1, renderContentWhenClosed: !1, children: t("div", { children: _.filter((k) => k.message).map((k) => v("p", { children: [k.title, " ", k.message] }, k.id)) }) }) });
  if (e === "order" && (x || p)) {
    const k = v("div", { className: "cart-gift-options-readonly__header", children: [t(Et, { source: qe, size: "24" }), t("span", { children: o.readOnlyOrderTitle })] }), a = v(_t, { children: [g ? v("div", { className: "cart-gift-options-readonly__checkboxes cart-gift-options-readonly__checkboxes--gift-receipt", children: [t(Et, { source: Ge, size: "16" }), t("p", { children: o.readOnlyOrderGiftReceiptTitle }), t("p", { children: o.readOnlyOrderGiftReceiptText })] }) : null, y ? v("div", { className: "cart-gift-options-readonly__checkboxes cart-gift-options-readonly__checkboxes--print-card", children: [t(Et, { source: Ge, size: "16" }), t("p", { children: o.readOnlyOrderGiftPrintCardTitle }), t("p", { children: o.readOnlyOrderGiftPrintCardText })] }) : null, d != null && d.selected ? v("div", { className: "cart-gift-options-readonly__checkboxes cart-gift-options-readonly__checkboxes--gift-wrap", children: [t(Et, { source: Ge, size: "16" }), v("p", { children: [o.readOnlyOrderGiftWrapTitle, " (+", t(X, { amount: d.price.value, currency: d.price.currency, weight: "normal" }), ")"] }), t("p", { children: `${o.readOnlyOrderGiftWrapOptionsText} ${d == null ? void 0 : d.design}` })] }) : null] }), S = x ? v("div", { className: "cart-gift-options-readonly__form", children: [t("div", { children: o.readOnlyOrderFormTitle }), v("div", { children: [v("p", { children: [t("span", { children: o.readOnlyOrderFormTo }), t("span", { children: u })] }), v("p", { children: [t("span", { children: o.readOnlyOrderFormFrom }), t("span", { children: m })] })] }), v("div", { children: [t("p", { children: o.readOnlyOrderFormMessageTitle }), t("p", { children: c })] })] }) : null;
    return v(ra, { variant: i, children: [k, a, S] });
  }
  return null;
}, re = (e) => new DOMParser().parseFromString(e, "text/html").body.textContent || "", oi = ({ item: e, view: l, loading: r, giftOptions: i, showModal: o, isEditable: u, errorsField: m, updateLoading: c, cartData: g, fieldsDisabled: y, isGiftOptionsApplied: P, giftWrappingConfig: d, readOnlyFormOrderView: x, isGiftMessageVisible: h, areGiftOptionsVisible: p, imageSwatchImageNode: _, onBlur: T, setShowModal: k, updateGiftOptions: a, onInputChange: S, handleFormMouseLeave: A }) => {
  const N = It({ accordionHeading: `Cart.GiftOptions.${l}.accordionHeading`, accordionAriaLabel: "Cart.GiftOptions.accordionAriaLabel", giftOptionsApplied: "Cart.GiftOptions.giftOptionsApplied" }), M = e && "name" in e ? re(e.name) : void 0, b = M ? N.accordionAriaLabel.replace("{title}", N.accordionHeading).replace("{product}", M) : N.accordionHeading, D = wt((R) => t(me, { "data-testid": "gift-options-product", iconClose: Le, iconOpen: Ce, actionIconPosition: "right", children: t(pe, { title: v("div", { className: "cart-gift-options-view__icon--success", children: [t("span", { children: N.accordionHeading }), P ? t(Et, { source: Ge, size: "16", role: "img", "aria-label": N.giftOptionsApplied }) : null] }), ariaLabelTitle: b, showIconLeft: !0, iconLeft: qe, defaultOpen: P || R, renderContentWhenClosed: !1, children: v(_t, { children: [t(ii, { className: "cart-gift-options-view__top", view: l, item: e, giftOptions: i, disabled: y, onInputChange: S, cartData: g, giftWrappingConfig: d, setShowModal: k, areGiftOptionsVisible: p }), t("form", { className: "cart-gift-options-view__footer", onMouseLeave: A, children: t(ri, { view: l, giftOptions: i, disabled: y, errorMessage: m, onInputChange: S, onBlur: T, isGiftMessageVisible: h }) })] }) }) }), [l, e, g, N, b, m, i, y, d, p, P, h, T, k, S, A]);
  return !p.isGiftOptionsVisible && !h ? null : v("div", { id: "cart-gift-options-view", className: q(["cart-gift-options-view", `cart-gift-options-view--${l}`, ["cart-gift-options-view--loading", c]]), children: [c ? t(Qe, { className: "cart-gift-options-view__spinner" }) : null, r ? t(ei, {}) : v(_t, { children: [u ? null : t("div", { className: "cart-gift-options-view--readonly", children: t(ni, { view: l, giftOptions: i, giftWrappingConfig: d, readOnlyFormOrderView: x }) }), o ? t(ti, { view: l, productName: e && "name" in e ? e == null ? void 0 : e.name : "", showModal: o, giftWrappingConfig: d, setShowModal: () => k(!1), updateGiftOptions: a, imageSwatchImageNode: _ }) : null, l === "product" && u ? D(!1) : null, l === "order" && u ? t(ra, { variant: "secondary", children: D(!0) }) : null] })] });
}, Ue = ({ entries: e, className: l, ...r }) => {
  const i = It({ itemLabel: "Cart.CartSummaryTable.item", priceLabel: "Cart.CartSummaryTable.price", qtyLabel: "Cart.CartSummaryTable.qty", subtotalLabel: "Cart.CartSummaryTable.subtotal", mobilePriceLabel: "Cart.CartSummaryTable.mobilePrice", mobileQtyLabel: "Cart.CartSummaryTable.mobileQty", mobileSubtotalLabel: "Cart.CartSummaryTable.mobileSubtotal" });
  return v("div", { ...r, className: q(["cart-cart-summary-table", l]), children: [v("div", { className: "cart-cart-summary-table__header", children: [t("div", { className: "cart-cart-summary-table__header-item", children: i.itemLabel }), t("div", { className: "cart-cart-summary-table__header-price", children: i.priceLabel }), t("div", { className: "cart-cart-summary-table__header-qty", children: i.qtyLabel }), t("div", { className: "cart-cart-summary-table__header-subtotal", children: i.subtotalLabel })] }), t("div", { className: "cart-cart-summary-table__body", children: e.map((o) => o.undoBanner ? t("div", { className: "cart-cart-summary-table__undo-banner", children: t(J, { node: o.undoBanner }) }, o.uid) : v("div", { className: q(["cart-cart-summary-table__row", ["cart-cart-summary-table__row--updating", o.updating], ["cart-cart-summary-table__row--error", o.hasError]]), children: [t("div", { className: "cart-cart-summary-table__cell-item", children: t(J, { node: o.item }) }), v("div", { className: "cart-cart-summary-table__cell-price", children: [t("span", { className: "cart-cart-summary-table__mobile-label", children: i.mobilePriceLabel }), t(J, { node: o.price })] }), v("div", { className: "cart-cart-summary-table__cell-qty", children: [t("span", { className: "cart-cart-summary-table__mobile-label", children: i.mobileQtyLabel }), t(J, { node: o.quantity })] }), v("div", { className: "cart-cart-summary-table__cell-subtotal", children: [t("span", { className: "cart-cart-summary-table__mobile-label", children: i.mobileSubtotalLabel }), t(J, { node: o.subtotal })] }), t("div", { className: "cart-cart-summary-table__item-footer", children: t(J, { className: "cart-cart-summary-table__item-actions", node: o.actions }) })] }, o.uid)) })] });
}, li = () => t(Ae, { className: "cart-free-gift-selection__loader", children: t(Me, { variant: "row", size: "small", fullWidth: !0, lines: 1, multilineGap: "small" }) });
function de(e) {
  if (e == null || typeof e != "object") return null;
  const l = e;
  return l.type && l.type !== "cart" ? null : l;
}
function _e(e, l) {
  return `${e}|${l}`;
}
function Ee(e) {
  return e.position ?? 0;
}
function ci(e, l) {
  var r;
  return (r = e.configurableOptions) != null && r.length ? e.configurableOptions.map((i) => l[i.attributeUid]).filter(Boolean) : [];
}
function si(e) {
  var l;
  return (l = e.configurableOptions) != null && l.length ? e.configurableOptions.reduce((r, i) => {
    var o, u;
    const m = (u = (o = i.values) == null ? void 0 : o[0]) == null ? void 0 : u.uid;
    return m && (r[i.attributeUid] = m), r;
  }, {}) : {};
}
function di(e) {
  var l;
  return (l = e.bundleItems) != null && l.length ? e.bundleItems.reduce((r, i) => {
    const o = i.values.find((u) => u.isDefault) ?? i.values[0];
    return o != null && o.uid && (r[i.uid] = o.uid), r;
  }, {}) : {};
}
function ui(e) {
  return { ...si(e), ...di(e) };
}
function mi(e, l) {
  var r;
  return (r = e.bundleItems) != null && r.length ? [...e.bundleItems].sort((i, o) => Ee(i) - Ee(o)).filter((i) => i.values.length > 0).map((i) => l[i.uid]).filter(Boolean) : [];
}
function pi(e) {
  var l, r;
  return !!((l = e.configurableOptions) != null && l.length || (r = e.bundleItems) != null && r.length);
}
function gi(e) {
  return JSON.stringify(e.map((l) => ({ ruleId: l.ruleId, skus: l.availableSkus, products: l.products.map((r) => r.sku) })));
}
const De = ({ showTrigger: e = !0, cartData: l, ...r }) => {
  var i, o;
  const u = He(), m = It({ title: "Cart.FreeGiftSelection.title", empty: "Cart.FreeGiftSelection.empty", error: "Cart.FreeGiftSelection.error", ariaModal: "Cart.FreeGiftSelection.ariaModal", openTrigger: "Cart.FreeGiftSelection.openTrigger", openTriggerHint: "Cart.FreeGiftSelection.openTriggerHint", addedMessagePrefix: "Cart.FreeGiftSelection.addedMessagePrefix", chooseOption: "Cart.FreeGiftSelection.chooseOption", configureRequired: "Cart.FreeGiftSelection.configureRequired", ruleLabelFallback: "Cart.FreeGiftSelection.ruleLabelFallback", selectProduct: "Cart.FreeGiftSelection.selectProduct", addToCart: "Cart.FreeGiftSelection.addToCart" }), [c, g] = F(null), [y, P] = F(!1), [d, x] = F(null), [h, p] = F(null), [_, T] = F(null), [k, a] = F({}), S = zt(null), A = zt(!1), N = zt(null), M = zt(null), b = ne(() => (c == null ? void 0 : c.availableFreeGifts) ?? [], [c == null ? void 0 : c.availableFreeGifts]), D = ne(() => b.filter((O) => {
    var E;
    return (E = O.products) == null ? void 0 : E.length;
  }), [b]), R = ne(() => gi(b), [b]);
  st(() => {
    if (l !== void 0) {
      g(l);
      return;
    }
    const O = [yt.on("cart/data", (E) => g(de(E)), { eager: !0 }), yt.on("cart/updated", (E) => g(de(E)), { eager: !0 }), yt.on("cart/initialized", (E) => g(de(E)), { eager: !0 }), yt.on("checkout/initialized", (E) => g(de(E)), { eager: !0 }), yt.on("checkout/updated", (E) => g(de(E)), { eager: !0 })];
    return () => {
      O.forEach((E) => E == null ? void 0 : E.off());
    };
  }, [l]), st(() => {
    c != null && c.hasAvailableFreeGifts || (A.current = !1, P(!1), p(null));
  }, [c == null ? void 0 : c.hasAvailableFreeGifts, c == null ? void 0 : c.id]);
  const B = zt(!1);
  st(() => {
    var O;
    if (!(c != null && c.id) || !(c != null && c.hasAvailableFreeGifts) || (O = c.availableFreeGifts) != null && O.length || B.current) return;
    const E = c.id;
    B.current = !0, Ma().then((et) => {
      g((G) => G && G.id === E ? { ...G, availableFreeGifts: et } : G);
    }).catch(() => {
      p("error");
    }).finally(() => {
      B.current = !1;
    });
  }, [c == null ? void 0 : c.id, c == null ? void 0 : c.hasAvailableFreeGifts, c == null ? void 0 : c.availableFreeGifts]), st(() => {
    _ && (b.some((O) => O.products.some((E) => _e(O.ruleId, E.sku) === _)) || T(null));
  }, [b, R, _]);
  const H = wt((O, E, et, G) => {
    const f = _e(O, E);
    a(($) => ({ ...$, [f]: { ...$[f] ?? {}, [et]: G } }));
  }, []), Q = wt((O) => {
    A.current = !0, p(O != null && O.suppressEmptyError || D.length ? null : "empty"), T(null), P(!0);
  }, [D.length]), W = wt(() => {
    P(!1), T(null);
  }, []);
  N.current = Q, M.current = W, st(() => {
    const O = (et) => {
      var G;
      if (A.current) return;
      const f = de(et), $ = f;
      if (!((f == null ? void 0 : f.hasAvailableFreeGifts) ?? ($ == null ? void 0 : $.has_available_free_gifts))) {
        A.current = !1;
        return;
      }
      (G = N.current) == null || G.call(N, { suppressEmptyError: !0 });
    }, E = [yt.on("checkout/initialized", O, { eager: !0 }), yt.on("checkout/updated", O, { eager: !0 })];
    return () => {
      E.forEach((et) => et == null ? void 0 : et.off());
    };
  }, []), st(() => {
    y && h === "empty" && D.length && p(null);
  }, [y, h, D.length]);
  const Z = wt((O, E) => {
    const et = _e(O.ruleId, E.sku);
    p(null), T(et), a((G) => {
      if (G[et] && Object.keys(G[et]).length) return G;
      const f = ui(E);
      return Object.keys(f).length ? { ...G, [et]: f } : G;
    });
  }, []), ut = wt(async (O, E) => {
    var et, G, f;
    if (!(c != null && c.id)) return;
    const $ = _e(O.ruleId, E.sku);
    x($), p(null);
    try {
      const Y = k[$] ?? {};
      let mt;
      if ((et = E.configurableOptions) != null && et.length) {
        if (mt = ci(E, Y), mt.length !== E.configurableOptions.length) {
          p("configureRequired");
          return;
        }
      } else if ((G = E.bundleItems) != null && G.length) {
        mt = mi(E, Y);
        const ht = [...E.bundleItems].sort((bt, St) => Ee(bt) - Ee(St)).filter((bt) => bt.values.length > 0);
        if (!mt.length || mt.length !== ht.length) {
          p("configureRequired");
          return;
        }
      }
      await Fa({ ruleId: O.ruleId, sku: E.sku, quantity: O.giftQty, ...mt != null && mt.length ? { selectedOptions: mt } : {} }), (f = M.current) == null || f.call(M);
    } catch (Y) {
      const mt = Y instanceof Error ? Y.message : String(Y);
      p(mt || "error");
    } finally {
      x(null);
    }
  }, [c == null ? void 0 : c.id, k]), tt = !!(c != null && c.hasAvailableFreeGifts && (i = c == null ? void 0 : c.availableFreeGifts) != null && i.length), K = ((o = c == null ? void 0 : c.items) == null ? void 0 : o.filter((O) => O.isFreeGift)) ?? [], L = K.length > 0, Lt = K.map((O) => O.name).join(", "), z = h === "empty" ? m.empty : h === "configureRequired" ? m.configureRequired : h === "error" ? m.error : h ?? null;
  return Ta(() => {
    var O;
    !y || !z || (O = S.current) == null || O.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  }, [y, z]), y ? v(aa, { ...r, "data-testid": "free-gift-selection-modal", "aria-label": m.ariaModal, className: "cart-free-gift-selection__modal", size: "medium", title: t("h2", { children: m.title }), centered: !0, onClose: W, children: [d ? t(Qe, {}) : null, z ? t("div", { ref: S, className: "cart-free-gift-selection__error-anchor", "data-testid": "free-gift-selection-error-alert", children: t(be, { type: "error", variant: "primary", heading: z }) }) : null, t("div", { className: "cart-free-gift-selection__rules", children: D.map((O) => {
    const E = `free-gift-rule-heading-${O.ruleId}`, et = O.ruleLabel && String(O.ruleLabel).trim() !== "" ? String(O.ruleLabel).trim() : `${m.ruleLabelFallback} (#${O.ruleId})`;
    return v("section", { className: "cart-free-gift-selection__rule", children: [t("div", { className: "cart-free-gift-selection__rule-header", children: t("h3", { id: E, className: "cart-free-gift-selection__rule-title", children: et }) }), t(ia, { emptyGridContent: t(_t, {}), maxColumns: 3, columnWidth: "minmax(220px, 1fr)", className: "cart-free-gift-selection__grid", role: "group", "aria-labelledby": E, children: O.products.map((G) => {
      var f, $, Y;
      const mt = _e(O.ruleId, G.sku), ht = pi(G), bt = _ === mt, St = d === mt, vt = d !== null, Pt = (f = G.thumbnail) != null && f.url ? t(Pe, { src: G.thumbnail.url, alt: G.thumbnail.label ?? G.name, width: 200, height: 200, loading: "lazy" }) : t("div", { className: "cart-free-gift-selection__image-placeholder", "aria-hidden": !0 }), it = ht && bt ? v("div", { className: "cart-free-gift-selection__config-wrap", children: [($ = G.configurableOptions) == null ? void 0 : $.map((j) => {
        var ct;
        return v("select", { className: "cart-free-gift-selection__config-select", "aria-label": j.label, value: ((ct = k[mt]) == null ? void 0 : ct[j.attributeUid]) ?? "", onChange: (pt) => H(O.ruleId, G.sku, j.attributeUid, pt.target.value), children: [t("option", { value: "", children: m.chooseOption }), j.values.map((pt) => t("option", { value: pt.uid, children: pt.label }, pt.uid))] }, j.uid ?? j.attributeUid);
      }), (Y = G.bundleItems) == null ? void 0 : Y.map((j) => {
        var ct;
        return v("div", { className: "cart-free-gift-selection__bundle-slot", children: [j.title ? t("span", { className: "cart-free-gift-selection__bundle-slot-title", children: j.title }) : null, v("select", { className: "cart-free-gift-selection__config-select", "aria-label": j.title || m.chooseOption, value: ((ct = k[mt]) == null ? void 0 : ct[j.uid]) ?? "", onChange: (pt) => H(O.ruleId, G.sku, j.uid, pt.target.value), children: [t("option", { value: "", children: m.chooseOption }), j.values.map((pt) => t("option", { value: pt.uid, children: pt.label }, pt.uid))] })] }, j.uid);
      })] }) : void 0, w = ht ? bt ? t(kt, { type: "button", variant: "primary", disabled: vt, "aria-busy": St, "data-testid": `free-gift-add-${O.ruleId}-${G.sku}`, onClick: () => void ut(O, G), children: m.addToCart }) : t(kt, { type: "button", variant: "secondary", disabled: vt, "data-testid": `free-gift-expand-${O.ruleId}-${G.sku}`, onClick: () => Z(O, G), children: m.selectProduct }) : t(kt, { type: "button", variant: "primary", disabled: vt, "aria-busy": St, "data-testid": `free-gift-add-${O.ruleId}-${G.sku}`, onClick: () => void ut(O, G), children: m.addToCart });
      return t("div", { className: "cart-free-gift-selection__card-wrap", children: t(Na, { initialized: !0, className: q(["cart-free-gift-selection__card", ["cart-free-gift-selection__card--selected", ht && bt]]), image: Pt, titleNode: t("span", { children: G.name }), sku: t("span", { children: G.sku }), swatches: it, actionButton: w }) }, G.sku);
    }) })] }, O.ruleId);
  }) })] }) : v("div", { ...r, "data-testid": "free-gift-selection-root", children: [c ? null : t("div", { className: "cart-free-gift-selection__loading", "aria-live": "polite", children: t(li, {}) }), c && L ? t("p", { className: "cart-free-gift-selection__added-message", "aria-live": "polite", children: m.addedMessagePrefix.replace("{names}", Lt) }) : null, e && c && tt ? v("div", { className: "cart-free-gift-selection__trigger", children: [t("p", { id: u, className: "cart-free-gift-selection__trigger-hint", children: m.openTriggerHint }), t(kt, { type: "button", variant: "secondary", "data-testid": "free-gift-selection-open", "aria-describedby": u, onClick: Q, children: m.openTrigger })] }) : null] });
};
De.displayName = "FreeGiftSelection";
const fi = ({ className: e, productTitle: l, sku: r, image: i, configurations: o, alert: u, warning: m, ...c }) => v("div", { ...c, className: q(["cart-cart-summary-table__item", e]), children: [i && t(J, { className: "cart-cart-summary-table__item-image-wrapper", node: i }), v("div", { className: "cart-cart-summary-table__item-details", children: [l && t(J, { className: "cart-cart-summary-table__item-name", node: l }), r && t(J, { className: "cart-cart-summary-table__sku", node: r }), u && t(J, { className: "cart-cart-summary-table__item-quantity-alert-text", node: u }), m && t(J, { className: "cart-cart-summary-table__item-quantity-warning-text", node: m }), o && t(J, { className: "cart-cart-summary-table__item-configurations", node: o })] })] });
/*! Copyright 2026 Adobe
All Rights Reserved. */
const vi = () => {
  const [e, l] = F(!1), [r, i] = F([]), [o, u] = F("US"), [m, c] = F(""), [g, y] = F(""), [P, d] = F([]), [x, h] = F(!1), [p, _] = F(), [T, k] = F(), [a, S] = F(""), [A, N] = F(!1), M = () => {
    u("US"), c(""), y(""), _(null), k(null), S(""), N(!1);
  }, b = async (R) => {
    const { shippingCountry: B, shippingState: H = "", shippingZip: Q = "" } = R, W = { countryCode: B, postcode: Q, region: { region: H } };
    return l(!0), $a(W).then((Z) => (Z && (_({ amount: Z.amount.value, currency: Z.amount.currency, priceIncludingtax: { amount: Z.price_incl_tax.value, currency: Z.price_incl_tax.currency }, priceExcludingtax: { amount: Z.price_excl_tax.value, currency: Z.price_excl_tax.currency } }), k({ carrier_code: Z.carrier_code, method_code: Z.method_code }), u(B), c(H), y(Q), S(H || Q || B), N(!0)), u(B), c(H), y(Q), S(H || Q || B), Z)).finally(() => {
      l(!1);
    });
  }, D = (R) => {
    R.preventDefault(), c(""), y("");
    const B = R.target.value;
    u(B);
  };
  return st(() => {
    Da().then((R) => {
      let B = "US";
      const H = R.map((Q) => (Q.isDefaultCountry && (B = Q.id), { text: Q.label, value: Q.id }));
      i(H), u(B);
    });
  }, []), st(() => {
    h(!0), Wa(o).then((R) => {
      const B = R.map((H) => ({ text: H.name, value: H.code }));
      d(B);
    }).finally(() => {
      h(!1);
    });
  }, [o, h]), { loading: e, regionsLoading: x, estimatedDestinationText: a, countries: r, selectedCountry: o, selectedRegion: m, selectedZip: g, regions: P, estimatedShippingPrice: p, estimatedShippingMethod: T, shippingEstimated: A, handleEstimateShipping: b, handleCountrySelected: D, resetValues: M, setPriceSummaryLoading: l };
}, yi = ({ showDefaultEstimatedShippingCost: e }) => {
  var l;
  const [r, i] = F(!1), { loading: o, countries: u, regions: m, selectedCountry: c, estimatedDestinationText: g, estimatedShippingPrice: y, handleCountrySelected: P, handleEstimateShipping: d, regionsLoading: x, selectedRegion: h, selectedZip: p, shippingEstimated: _, resetValues: T } = vi(), k = wt((A) => {
    d(A).then(() => {
      Ke(A);
    });
  }, [d]);
  st(() => {
    const A = yt.on("cart/data", (N) => {
      var M, b, D;
      i((N == null ? void 0 : N.isVirtual) || !1);
      const R = (b = (M = N == null ? void 0 : N.addresses) == null ? void 0 : M.shipping) == null ? void 0 : b[0];
      if (e && !R && d({ shippingCountry: ((D = xt.config) == null ? void 0 : D.defaultCountry) ?? "" }), !R) return;
      const { countryCode: B, regionCode: H, zipCode: Q } = R;
      k({ shippingCountry: B, shippingState: H, shippingZip: Q });
    }, { eager: !0 });
    return () => {
      A == null || A.off();
    };
  }, []), st(() => {
    const A = yt.on("cart/updated", () => {
      _ && d({ shippingCountry: c, shippingState: h, shippingZip: p });
    });
    return () => {
      A == null || A.off();
    };
  }, [_, c, h, p, d]), st(() => {
    const A = yt.on("cart/reset", () => {
      T(), Ke(null);
    });
    return () => {
      A == null || A.off();
    };
  }, [T]), st(() => {
    const A = yt.on("cart/merged", () => {
      _ && k({ shippingCountry: c, shippingState: h, shippingZip: p });
    });
    return () => {
      A == null || A.off();
    };
  }, [_, c, h, p, k]);
  const a = It({ applyButton: "Cart.PriceSummary.estimatedShippingForm.apply.label", applyButtonAriaLabel: "Cart.PriceSummary.estimatedShippingForm.apply.ariaLabel", countryField: "Cart.PriceSummary.estimatedShippingForm.country.placeholder", freeShipping: "Cart.PriceSummary.freeShipping", stateField: "Cart.PriceSummary.estimatedShippingForm.state.placeholder", taxToBeDetermined: "Cart.PriceSummary.taxToBeDetermined", zipField: "Cart.PriceSummary.estimatedShippingForm.zip.placeholder" });
  if (r) return null;
  const S = (l = xt.config) == null ? void 0 : l.shoppingCartDisplaySetting;
  return t(Za, { loading: o, taxIncluded: (S == null ? void 0 : S.shipping) === "INCLUDING_TAX", taxExcluded: (S == null ? void 0 : S.shipping) === "INCLUDING_EXCLUDING_TAX", price: (y == null ? void 0 : y.amount) == 0 ? t("span", { "data-testId": "free-shipping", children: a.freeShipping }) : (S == null ? void 0 : S.shipping) === "INCLUDING_TAX" && y ? t(X, { "data-testid": "shipping", ...y.priceIncludingtax }) : y ? t(X, { ...y }) : t("span", { children: a.taxToBeDetermined }), estimated: !0, priceExcludingTax: y != null && y.priceExcludingtax ? t(X, { "data-testid": "shipping-excluding-tax", ...y.priceExcludingtax }) : t("span", { children: a.taxToBeDetermined }), countryField: t(Xe, { autoComplete: "country-name", name: "shippingCountry", placeholder: a.countryField, value: c, variant: "primary", options: u, handleSelect: P, "data-testid": "estimate-shipping-country-selector" }), stateField: m.length > 0 ? t(Xe, { autoComplete: "address-level1", name: "shippingState", placeholder: a.stateField, variant: "primary", options: m, value: h, "data-testid": "estimate-shipping-state-selector", disabled: x }) : t(ge, { "aria-label": a.stateField, autoComplete: "address-level1", name: "shippingState", placeholder: a.stateField, variant: "primary", value: h, disabled: x, "data-testid": "estimate-shipping-state-input", maxLength: 50 }), zipField: t(ge, { "aria-label": a.zipField, autoComplete: "postal-code", name: "shippingZip", placeholder: a.zipField, floatingLabel: a.zipField, variant: "primary", "data-testid": "estimate-shipping-zip-input", value: p, maxLength: 12 }), estimateButton: t(kt, { variant: "secondary", "data-testid": "estimate-shipping-apply-button", "aria-label": a.applyButtonAriaLabel, children: a.applyButton }), destinationText: g || a.taxToBeDetermined, onEstimate: k });
};
yi.displayName = "EstimateShipping";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const hi = 1e3, je = ka(({ initialData: e = null, hideHeading: l, hideFooter: r, headingLevel: i = 1, itemTitleHeadingLevel: o, routeProduct: u, routeEmptyCartCTA: m, routeCart: c, onItemUpdate: g, onItemRemove: y, maxItems: P, slots: d, attributesToHide: x = [], enableRemoveItem: h, enableUpdateItemQuantity: p, onItemsErrorsChange: _, accordion: T = !1, variant: k = "primary", isLoading: a, showMaxItems: S, showDiscount: A, showSavings: N, quantityType: M, dropdownOptions: b, undo: D = !1, confirmBeforeDelete: R = !1, includeOutOfStockItems: B = !1, __testRecentlyRemovedItems: H, ...Q }, W) => {
  var Z, ut;
  const [tt, K] = F(!e), [L, Lt] = F(e), [z, O] = F(/* @__PURE__ */ new Set()), [E, et] = F(/* @__PURE__ */ new Map()), [G, f] = F(/* @__PURE__ */ new Set()), [$, Y] = F(H || []), [mt, ht] = F(""), bt = zt(void 0);
  st(() => {
  }, [H, $]);
  const St = typeof p == "object" ? p.removeOnZero ?? !1 : !1, vt = (Z = xt.config) == null ? void 0 : Z.shoppingCartDisplaySetting, [Pt, it] = F(S ? !0 : !P && !S), w = It({ file: "Cart.CartItem.file", files: "Cart.CartItem.files", heading: "Cart.Cart.heading", loadingLabel: "Cart.Cart.loadingLabel", message: "Cart.CartItem.message", recipient: "Cart.CartItem.recipient", regularPrice: "Cart.CartItem.regularPrice", discountedPrice: "Cart.CartItem.discountedPrice", sender: "Cart.CartItem.sender", lowInventory: "Cart.CartItem.lowInventory", insufficientQuantity: "Cart.CartItem.insufficientQuantity", insufficientQuantityGeneral: "Cart.CartItem.insufficientQuantityGeneral", outOfStockHeading: "Cart.OutOfStockMessage.heading", outOfStockDescription: "Cart.OutOfStockMessage.message", outOfStockAlert: "Cart.OutOfStockMessage.alert", removeAction: "Cart.OutOfStockMessage.action", notAvailableMessage: "Cart.CartItem.notAvailableMessage", viewMore: "Cart.Cart.viewMore", viewAll: "Cart.Cart.viewAll", discountPercent: "Cart.CartItem.discountPercentage", savingsAmount: "Cart.CartItem.savingsAmount", itemBeingRemoved: "Cart.CartItem.itemBeingRemoved", itemRemoved: "Cart.CartItem.itemRemoved", itemRemovedDescription: "Cart.CartItem.itemRemovedDescription", undoAction: "Cart.CartItem.undoAction", dismissAction: "Cart.CartItem.dismissAction", confirmDeleteHeading: "Cart.CartItem.confirmDeleteHeading", confirmAction: "Cart.CartItem.confirmAction", cancelAction: "Cart.CartItem.cancelAction", remove: "Dropin.CartItem.remove.label", removeDefault: "Dropin.CartItem.removeDefault.label", quantity: "Dropin.CartItem.quantity.label" }), j = (n, s) => {
    O((C) => (s ? C.add(n) : C.delete(n), new Set(C)));
  }, ct = (n, s) => {
    et((C) => (s ? C.set(n, s) : C.delete(n), new Map(C)));
  }, pt = (n) => {
    R ? f((s) => new Set(s).add(n.uid)) : ot(n, 0, !0);
  };
  function Ot(n) {
    const s = ce(), C = s == null ? void 0 : s.items.find((U) => U.uid === n);
    C && Y((U) => {
      const lt = s.items.findIndex((ft) => ft.uid === n);
      return lt !== -1 && !U.some((ft) => ft.item.uid === n) ? (yt.emit("cart/product/removed", { item: C, index: lt }), [...U, { item: C, index: lt, error: void 0, beingRemoved: !0 }]) : U;
    });
  }
  const ot = (n, s, C = !1) => {
    if (j(n.uid, !0), et(/* @__PURE__ */ new Map()), h && s === 0 && (St || C)) Ot(n.uid), fe([{ uid: n.uid, quantity: s }]).then(() => {
      y == null || y({ item: n });
    }).finally(() => {
      j(n.uid, !1), Y((U) => U.map((lt) => lt.item.uid === n.uid ? { ...lt, beingRemoved: !1 } : lt));
    }).catch((U) => {
      console.warn(U);
    });
    else {
      if (s === 0 && !St) {
        j(n.uid, !1);
        return;
      }
      p && fe([{ uid: n.uid, quantity: s }]).then(() => {
        g == null || g({ item: n });
      }).finally(() => {
        j(n.uid, !1);
      }).catch((U) => {
        ct(n.uid, U.message);
      });
    }
  }, Ct = (n) => {
    Y((s) => s.filter((C) => C.item.uid !== n));
  }, Qt = wt(() => {
    it((n) => !n);
  }, []);
  st(() => {
    const n = yt.on("cart/data", (s) => {
      Lt(s), K(!!a), a && ht("");
    }, { eager: !0 });
    return () => {
      n == null || n.off();
    };
  }, [a]), st(() => {
    var n;
    const s = L == null ? void 0 : L.totalQuantity;
    if (bt.current === void 0) {
      bt.current = s;
      return;
    }
    if (s !== bt.current && !tt) {
      const C = (n = w.heading) == null ? void 0 : n.replace("({count})", s ? `(${s})` : "");
      ht(C ?? ""), bt.current = s;
      const U = setTimeout(() => ht(""), hi);
      return () => clearTimeout(U);
    }
  }, [L == null ? void 0 : L.totalQuantity, tt]), st(() => {
    D || Y([]);
  }, [D]), st(() => {
    _ && _(E);
  }, [E, _]);
  const Zt = (n, s) => {
    if (x.includes("image")) return;
    const C = { loading: s < 4 ? "eager" : "lazy", src: n.image.src, alt: n.image.alt, width: "300", height: "300", params: { width: 300 } }, U = t(Pe, { "data-testid": "cart-list-item-image", ...C });
    return t(at, { name: "Thumbnail", slot: d == null ? void 0 : d.Thumbnail, context: { item: n, defaultImageProps: C }, children: u ? t("a", { href: u(n), children: U }) : U });
  }, jt = (n) => {
    if (x.includes("name")) return;
    const s = re(n.name), C = n.selectedOptions ? Object.values(n.selectedOptions).join(", ") : "", U = C ? `${s}, ${C}` : s, lt = u ? t("a", { href: u(n), "aria-label": U, children: s }) : s;
    if (o) {
      const ft = `h${o}`;
      return t(ft, { className: "cart-cart-summary-list__item-title", "data-testid": "cart-list-item-title", children: lt });
    }
    return t("span", { className: "cart-cart-summary-list__item-title", "data-testid": "cart-list-item-title", children: lt });
  }, Xt = (n) => {
    if (x.includes("configurations")) return;
    const s = { ...n.bundleOptions, ...n.selectedOptions, ...n.customizableOptions, ...n.recipient ? { [w.recipient]: n.recipient } : null, ...n.recipientEmail && n.recipient ? { [w.recipient]: `${n.recipient} (${n.recipientEmail})` } : null, ...n.sender ? { [w.sender]: n.sender } : null, ...n.senderEmail && n.sender ? { [w.sender]: `${n.sender} (${n.senderEmail})` } : {}, ...n.message ? { [w.message]: n.message } : null, ...n.links && n.links.count ? n.links.count > 1 ? { [w.files.replace("{count}", n.links.count.toString())]: n.links.result } : { [w.file.replace("{count}", n.links.count.toString())]: n.links.result } : null };
    if (Object.keys(s).length !== 0) return s;
  }, Kt = (n) => {
    var s, C, U, lt;
    return (vt == null ? void 0 : vt.price) === "INCLUDING_TAX" ? n.discounted ? { amount: n.regularPrice.value, currency: n.regularPrice.currency, style: { font: "inherit" }, "data-testid": "including-tax-item-price", "aria-label": w.regularPrice } : { amount: (s = n.taxedPrice) == null ? void 0 : s.value, currency: (C = n.taxedPrice) == null ? void 0 : C.currency, style: { font: "inherit" }, "data-testid": "including-tax-item-price", "aria-label": w.regularPrice } : { amount: (U = n.regularPrice) == null ? void 0 : U.value, currency: (lt = n.regularPrice) == null ? void 0 : lt.currency, style: { font: "inherit" }, "data-testid": "regular-item-price", "aria-label": w.regularPrice };
  }, Ut = (n) => {
    var s, C;
    return { amount: (s = n.savingsAmount) == null ? void 0 : s.value, currency: (C = n.savingsAmount) == null ? void 0 : C.currency, style: { font: "inherit" }, "data-testid": "item-savings-amount" };
  }, Yt = (n) => (vt == null ? void 0 : vt.price) === "INCLUDING_EXCLUDING_TAX" ? t(X, { amount: n.rowTotal.value, currency: n.rowTotal.currency, "data-testid": "excluding-tax-total", "aria-label": w.regularPrice }) : void 0, Jt = (n) => {
    var s, C, U, lt, ft, nt, Nt, Gt, Vt, At;
    const gt = { "aria-label": w.regularPrice };
    if (n.isFreeGift) {
      const he = sa(n), wa = ["INCLUDING_TAX", "INCLUDING_EXCLUDING_TAX"].includes(vt == null ? void 0 : vt.price);
      if (gt["data-testid"] = wa ? "including-tax-item-total" : "regular-item-total", he.value === 0) return gt.amount = 0, gt.currency = he.currency, gt.variant = "default", { totalProps: gt, discountProps: null };
      gt.amount = he.value, gt.currency = he.currency, gt.variant = "strikethrough";
      const Ia = { amount: 0, currency: he.currency, sale: !0, "aria-label": w.discountedPrice, "data-testid": "discount-total" };
      return { totalProps: gt, discountProps: Ia };
    }
    const Mt = n.discounted ? {} : null;
    return ["INCLUDING_TAX", "INCLUDING_EXCLUDING_TAX"].includes(vt == null ? void 0 : vt.price) ? (gt.amount = (s = n.rowTotalIncludingTax) == null ? void 0 : s.value, gt.currency = (C = n.rowTotalIncludingTax) == null ? void 0 : C.currency, gt.variant = n.discounted ? "strikethrough" : "default", gt["data-testid"] = "including-tax-item-total", Mt && (gt.amount = (U = n.total) == null ? void 0 : U.value, gt.currency = (lt = n.total) == null ? void 0 : lt.currency, Mt.amount = (ft = n.rowTotalIncludingTax) == null ? void 0 : ft.value, Mt.currency = (nt = n.rowTotalIncludingTax) == null ? void 0 : nt.currency, Mt.sale = !0, Mt["aria-label"] = w.discountedPrice, Mt["data-testid"] = "discount-total")) : (gt.amount = (Nt = n.total) == null ? void 0 : Nt.value, gt.currency = (Gt = n.total) == null ? void 0 : Gt.currency, gt.variant = n.discounted ? "strikethrough" : "default", gt["data-testid"] = "regular-item-total", Mt && (Mt.amount = (Vt = n.discountedTotal) == null ? void 0 : Vt.value, Mt.currency = (At = n.discountedTotal) == null ? void 0 : At.currency, Mt.sale = !0, Mt["aria-label"] = w.regularPrice, Mt["data-testid"] = "discount-total")), { totalProps: gt, discountProps: Mt };
  }, Bt = (n) => {
    var s, C, U;
    if (x.includes("warning")) return;
    const lt = E.get(n.uid), ft = (s = E.get(n.uid)) == null ? void 0 : s.includes("The requested qty is not available"), nt = z.has(n.uid), Nt = n.insufficientQuantity && n.stockLevel ? n.stockLevel === "noNumber" ? w.insufficientQuantityGeneral : w.insufficientQuantity.replace("{inventory}", (C = n.stockLevel) == null ? void 0 : C.toString()).replace("{count}", n.quantity.toString()) : "", Gt = n.lowInventory && n.onlyXLeftInStock && w.lowInventory.replace("{count}", (U = n.onlyXLeftInStock) == null ? void 0 : U.toString()), Vt = da(n), At = !n.outOfStock && lt && ft ? w.notAvailableMessage : lt;
    return !nt && (lt || n.insufficientQuantity || n.lowInventory || Vt) ? v("span", { "data-testid": "item-warning", children: [t(Et, { source: fa, size: "16" }), At || Nt || Gt || Vt] }) : void 0;
  }, qt = (n) => x != null && x.includes("alert") ? void 0 : !z.has(n.uid) && n.outOfStock ? v("span", { "data-testid": "item-alert", children: [t(Et, { source: Re, size: "16" }), w.outOfStockAlert] }) : void 0, Rt = (n) => t(at, { name: "ProductAttributes", slot: d == null ? void 0 : d.ProductAttributes, context: { item: n } }), I = (n) => {
    if (!x.includes("sku")) return t("span", { "data-testid": "cart-list-item-sku", children: n.sku });
  }, te = (n) => t(at, { name: "Footer", slot: d == null ? void 0 : d.Footer, context: { item: n, handleItemsLoading: j, handleItemsError: ct, onItemUpdate: g } }), ee = (n) => t(at, { name: "RowTotalFooter", slot: d == null ? void 0 : d.RowTotalFooter, context: { item: n } }), Tt = (n) => {
    var s;
    if (h) return t(at, { name: "ItemRemoveAction", slot: d == null ? void 0 : d.ItemRemoveAction, context: { item: n, enableRemoveItem: h, handleItemQuantityUpdate: ot, handleItemsError: ct, handleItemsLoading: j, onItemUpdate: g, itemsLoading: z }, children: t(kt, { "data-testid": "cart-item-remove-button", className: q(["dropin-cart-item__remove"]), variant: "tertiary", onClick: () => pt(n), disabled: z.has(n.uid), icon: t(Et, { "data-testid": "cart-item-remove-icon", source: ga, size: "24", stroke: "2", viewBox: "0 0 24 24", "aria-label": ((s = w.remove) == null ? void 0 : s.replace("{product}", re(n.name))) || w.removeDefault }) }) });
  }, Dt = (n) => {
    if (!x.includes("quantity") && p) return t(at, { name: "ItemQuantity", slot: d == null ? void 0 : d.ItemQuantity, context: { item: n, enableUpdateItemQuantity: p, handleItemQuantityUpdate: ot, itemsLoading: z, handleItemsError: ct, handleItemsLoading: j, onItemUpdate: g }, children: t(Aa, { value: n.quantity, min: St ? 0 : 1, onValue: (s) => ot(n, Number(s)), name: "quantity", disabled: z.has(n.uid) || !!n.isFreeGift, "aria-label": w.quantity }) });
  }, oe = (n) => L != null && L.totalQuantity ? L.items.filter(n).map((s, C) => {
    var U;
    const { totalProps: lt, discountProps: ft } = Jt(s), nt = h && !z.has(s.uid) ? () => ot(s, 0) : void 0, Nt = t(Pa, { updating: z == null ? void 0 : z.has(s.uid), loading: tt, "data-testid": `cart-list-item-entry-${s.uid}`, image: Zt(s, C), title: t(at, { name: "ItemTitle", slot: d == null ? void 0 : d.ItemTitle, context: { item: s }, children: jt(s) }), sku: x.includes("sku") ? void 0 : t(at, { name: "ItemSku", slot: d == null ? void 0 : d.ItemSku, context: { item: s }, children: I(s) }), price: x.includes("price") ? void 0 : t(at, { name: "ItemPrice", slot: d == null ? void 0 : d.ItemPrice, context: { item: s }, slotTag: "span", children: s.isFreeGift ? (() => {
      const Gt = ca(s);
      return t(X, { amount: Gt.value, currency: Gt.currency, style: { font: "inherit" }, "data-testid": "free-gift-unit-price" });
    })() : t(X, { ...Kt(s) }) }), quantity: x.includes("quantity") ? void 0 : s.quantity, quantityContent: Dt(s), total: v(_t, { children: [x.includes("total") ? void 0 : t(at, { name: "ItemTotal", slot: d == null ? void 0 : d.ItemTotal, context: { item: s }, children: t(X, { ...lt }) }), x.includes("totalDiscount") ? void 0 : ft && t(at, { name: "ItemTotal", slot: d == null ? void 0 : d.ItemTotal, context: { item: s }, children: t(X, { ...ft }) })] }), attributes: Rt(s), configurations: Xt(s), totalExcludingTax: x.includes("totalExcludingTax") ? void 0 : Yt(s), taxIncluded: (vt == null ? void 0 : vt.price) === "INCLUDING_TAX", taxExcluded: !x.includes("totalExcludingTax") && (vt == null ? void 0 : vt.price) === "INCLUDING_EXCLUDING_TAX", warning: Bt(s), alert: qt(s), quantityType: M, dropdownOptions: b, onQuantity: p && !z.has(s.uid) ? (Gt) => {
      ot(s, Gt);
    } : void 0, onRemove: nt, discount: A && s.discounted && s.discountPercentage ? t("div", { "data-testid": "item-discount-percent", children: w.discountPercent.replace("{discount}", ((U = s.discountPercentage) == null ? void 0 : U.toString()) ?? "") }) : void 0, savings: N && s.discounted && s.savingsAmount ? v("div", { children: [t("span", { children: t(X, { ...Ut(s) }) }), " ", w.savingsAmount] }) : void 0, rowTotalFooter: ee(s), footer: te(s), removeContent: Tt(s) }, s.uid);
    return t(at, { name: "CartItem", slot: d == null ? void 0 : d.CartItem, context: { item: s, index: C, enableUpdateItemQuantity: p, enableRemoveItem: h, itemsLoading: z, loading: tt, attributesToHide: x, cartTaxesConfig: vt, quantityType: M, dropdownOptions: b, showDiscount: A, showSavings: N, dictionary: w, getImage: Zt, getTitle: jt, getSku: I, getPriceProps: Kt, getTotalPriceProps: Jt, getProductAttributes: Rt, getConfiguration: Xt, getTotalExcludingTax: Yt, getWarning: Bt, getAlert: qt, getRowTotalFooter: ee, getFooter: te, getSavingsAmount: Ut }, children: Nt }, s.uid);
  }) : null, rt = `h${i}`, ve = t(at, { name: "Heading", slot: d == null ? void 0 : d.Heading, context: { count: L == null ? void 0 : L.totalQuantity }, children: t(rt, { "data-testid": "default-cart-heading", className: "cart-cart-summary-list__heading-text", children: w.heading.replace("({count})", L != null && L.totalQuantity ? `(${L == null ? void 0 : L.totalQuantity.toString()})` : "") }) }), We = ve.props.children.props.children, Wt = () => {
    const n = L == null ? void 0 : L.items.filter((s) => s.outOfStock);
    n == null || n.forEach((s) => {
      ot(s, 0, !0);
    });
  }, xe = oe((n) => n.outOfStock || n.insufficientQuantity || !1), ye = L != null && L.hasOutOfStockItems ? t(be, { "data-testid": "cart-out-of-stock-message", icon: t(Et, { source: Re, size: "16" }), itemList: t(ze, { className: "cart-cart-summary-list__out-of-stock-items", "data-testid": "out-of-stock-cart-items", "aria-hidden": B || void 0, children: xe }), type: "warning", heading: w.outOfStockHeading, description: w.outOfStockDescription, variant: "primary", actionButtonPosition: "bottom", additionalActions: L != null && L.hasFullyOutOfStockItems && h ? [{ label: w.removeAction, onClick: Wt }] : void 0 }) : void 0, Ht = oe(B ? () => !0 : (n) => !n.outOfStock && !n.insufficientQuantity), we = Pt ? Math.max(P || 5, 5) : Math.min((L == null ? void 0 : L.totalQuantity) || 5, 5), Ie = (L == null ? void 0 : L.totalQuantity) > we, se = Ie && !Pt && we != P, le = L != null && L.totalQuantity && Ht ? t(at, { name: "Footer", slot: d == null ? void 0 : d.CartSummaryFooter, context: { displayMaxItems: Pt, routeCart: c }, "data-testid": "cart-cart-summary-footer-slot", className: "cart-cart-summary-footer", children: Ie ? se ? t(kt, { className: "cart-cart-summary-list-footer__action", onClick: Qt, "data-testid": "view-more-items-button", variant: "tertiary", children: w.viewMore }) : c && t(kt, { className: "cart-cart-summary-list-footer__action", href: c(), variant: "tertiary", "data-testid": "view-cart-or-less-items-button", children: w.viewAll }) : c && t(kt, { className: "cart-cart-summary-list-footer__action", href: c(), variant: "tertiary", "data-testid": "view-cart-button", children: w.viewAll }) }) : null, dt = L && (L.hasAvailableFreeGifts || (ut = L.items) != null && ut.some((n) => n.isFreeGift)) ? t("div", { className: "cart-cart-summary-list__free-gift-footer", children: t(De, { cartData: L }) }) : null, Te = le || dt ? v(_t, { children: [le, dt] }) : null, ke = () => {
    var n;
    if (!(L != null && L.items)) return null;
    const s = [], C = L.items, U = d == null ? void 0 : d.UndoBanner, lt = Pt ? Math.max(P || (L == null ? void 0 : L.totalQuantity), 5) : Math.min(P ?? 5, 5);
    for (let ft = 0; ft <= lt; ft++) if (D && $.filter((nt) => nt.index === ft).forEach(({ item: nt, error: Nt, beingRemoved: Gt }) => {
      var Vt, At;
      const gt = t(be, { role: "alert", type: Nt ? "error" : "info", heading: Gt ? (Vt = w.itemBeingRemoved) == null ? void 0 : Vt.replace("{product}", re(nt.name)) : (At = w.itemRemoved) == null ? void 0 : At.replace("{product}", re(nt.name)), description: Nt || w.itemRemovedDescription, variant: "primary", actionButtonPosition: "bottom", additionalActions: Gt ? [] : [{ label: w.undoAction, onClick: () => $t(nt.uid), "aria-label": `${w.undoAction} remove ${re(nt.name)}` }, { label: w.dismissAction, onClick: () => Ct(nt.uid), "aria-label": `${w.dismissAction} undo for ${re(nt.name)}` }] }, `undo-banner-${nt.uid}`);
      s.push(U ? t(at, { name: "UndoBanner", slot: U, context: { item: nt, loading: tt, error: Nt, onUndo: () => $t(nt.uid), onDismiss: () => Ct(nt.uid) }, className: "cart-summary-list__banner cart-summary-list__banner--undo", children: gt }, `undo-banner-${nt.uid}`) : t("div", { className: "cart-summary-list__banner cart-summary-list__banner--undo", children: gt }, `undo-banner-${nt.uid}`));
    }), ft < lt && ft < C.length) {
      const nt = C[ft];
      if (R && G.has(nt.uid)) {
        const Nt = () => {
          f((At) => {
            const gt = new Set(At);
            return gt.delete(nt.uid), gt;
          }), ot(nt, 0, !0);
        }, Gt = () => {
          f((At) => {
            const gt = new Set(At);
            return gt.delete(nt.uid), gt;
          });
        }, Vt = t(be, { type: "warning", heading: (n = w.confirmDeleteHeading) == null ? void 0 : n.replace("{product}", re(nt.name)), variant: "primary", actionButtonPosition: "bottom", additionalActions: [{ label: w.confirmAction, onClick: Nt }, { label: w.cancelAction, onClick: Gt }] }, `confirm-delete-banner-${nt.uid}`);
        s.push(t(at, { name: "ConfirmDeleteBanner", slot: d == null ? void 0 : d.ConfirmDeleteBanner, context: { item: nt, loading: z.has(nt.uid), onConfirm: Nt, onCancel: Gt }, className: "cart-summary-list__banner cart-summary-list__banner--confirm-delete", children: Vt }, `confirm-delete-banner-${nt.uid}`));
      }
      s.push((Ht == null ? void 0 : Ht[ft]) || null);
    }
    return t(ze, { "data-testid": "cart-list", children: s });
  }, $t = wt(async (n) => {
    Y((C) => C.map((U) => U.item.uid === n ? { ...U, loading: !0, error: void 0 } : U));
    const s = $.find((C) => C.item.uid === n);
    if (s) try {
      await oa([{ sku: s.item.sku, parentSku: s.item.topLevelSku, quantity: s.item.quantity, optionsUIDs: s.item.bundleOptionsUIDs || (s.item.selectedOptionsUIDs ? Object.values(s.item.selectedOptionsUIDs) : void 0), enteredOptions: s.item.customizableOptions ? Object.entries(s.item.customizableOptions).map(([C, U]) => ({ uid: C, value: U })) : void 0 }]), Y((C) => C.filter((U) => U.item.uid !== n));
    } catch (C) {
      Y((U) => U.map((lt) => lt.item.uid === n ? { ...lt, error: (C == null ? void 0 : C.message) || "Failed to restore item." } : lt));
    }
  }, [$]);
  Sa(W, () => ({ handleUndo: $t }), [$t]);
  const ie = t(_t, { children: D && $.length > 0 ? ke() : t(at, { name: "EmptyCart", slot: d == null ? void 0 : d.EmptyCart, context: {}, children: t(Ze, { "data-testid": "empty-cart", ctaLinkURL: m == null ? void 0 : m() }) }) }), $e = t(ze, { "data-testid": "cart-list", children: Ht == null ? void 0 : Ht.slice(0, Pt ? Math.max(P || (L == null ? void 0 : L.totalQuantity), 5) : Math.min(P ?? 5, 5)) }), Se = L != null && L.totalQuantity || D && $.length > 0 ? (D || R) && ($.length > 0 || G.size > 0) ? ke() : $e : null, Oe = t(Fe, { message: tt ? w.loadingLabel : mt });
  return T ? v(me, { "data-testid": "cart-summary-list-accordion", className: q(["cart-cart-summary-list-accordion", `cart-cart-summary-list__background--${k}`]), iconOpen: Ha, iconClose: Ce, children: [Oe, t(pe, { title: We, "data-testid": "cart-summary-list-accordion__section", open: !0, renderContentWhenClosed: !0, children: t(ta, { ...Q, "aria-expanded": !0, className: q(["cart-cart-summary-list-accordion__list", ["cart-cart-summary-list--include-out-of-stock", B]]), loading: tt, footer: r ? void 0 : Te || (c ? le : void 0), emptyCart: ie, products: Se, outOfStockMessage: ye, variant: k }) })] }) : t(ta, { ...Q, className: q([["cart-cart-summary-list--include-out-of-stock", B]]), heading: l ? void 0 : ve, footer: r ? void 0 : Te || (c ? le : void 0), loading: tt, emptyCart: ie, products: Se, outOfStockMessage: ye, variant: k, children: Oe });
});
je.getInitialData = async function() {
  return ce();
};
je.displayName = "CartSummaryList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const _i = 100, bi = 1e3, ya = ({ initialData: e = null, hideFooter: l = !0, slots: r, routeProduct: i, routeCart: o, routeCheckout: u, routeEmptyCartCTA: m, showDiscount: c, showSavings: g, enableItemRemoval: y = !0, enableQuantityUpdate: P = !1, hideHeading: d = !1, undo: x = !1, confirmBeforeDelete: h = !1, ...p }) => {
  var _, T, k;
  const [a, S] = F(e), [A, N] = F(""), M = zt(void 0), b = (_ = xt.config) == null ? void 0 : _.shoppingCartDisplaySetting;
  st(() => {
    const z = yt.on("cart/data", (O) => {
      S(O);
    }, { eager: !0 });
    return () => {
      z == null || z.off();
    };
  }, []);
  const D = It({ cartLink: "Cart.MiniCart.cartLink", checkoutLink: "Cart.MiniCart.checkoutLink", cartUpdated: "Cart.MiniCart.cartUpdated" });
  st(() => {
    var z;
    const O = a == null ? void 0 : a.totalQuantity;
    if (M.current === void 0) {
      M.current = O;
      return;
    }
    if (O !== M.current) {
      const E = ((z = D.cartUpdated) == null ? void 0 : z.replace("{count}", String(O ?? 0))) ?? "";
      N(E), M.current = O;
      const et = setTimeout(() => N(""), bi);
      return () => clearTimeout(et);
    }
  }, [a == null ? void 0 : a.totalQuantity]);
  const R = (z, O) => fe([{ uid: z, quantity: O }]), B = (z) => R(z, 0), H = a == null ? void 0 : a.hasOutOfStockItems, Q = a != null && a.totalQuantity && u ? u() : void 0, W = zt(u);
  W.current = u;
  const Z = wt(() => {
    a && !H && (la(a, xt.locale), setTimeout(() => {
      var z;
      const O = (z = W.current) == null ? void 0 : z.call(W);
      O && (window.location.href = O);
    }, _i));
  }, [a, H]), ut = { data: a, isDisabled: !!H, checkoutUrl: Q, handleCheckout: Z }, tt = t(at, { name: "ProductList", slot: r == null ? void 0 : r.ProductList, context: { itemQuantityUpdateHandler: R, itemRemoveHandler: B, totalQuantity: a == null ? void 0 : a.totalQuantity }, children: t(je, { "data-testid": "default-cart-summary-list", routeProduct: i, routeEmptyCartCTA: m, initialData: a, maxItems: (T = xt.config) == null ? void 0 : T.miniCartMaxItemsDisplay, showMaxItems: !!((k = xt.config) != null && k.miniCartMaxItemsDisplay), hideHeading: d || !(a != null && a.totalQuantity), headingLevel: 2, itemTitleHeadingLevel: 3, hideFooter: l, enableRemoveItem: y, enableUpdateItemQuantity: P, showDiscount: c, showSavings: g, undo: x, confirmBeforeDelete: h, slots: { Thumbnail: r == null ? void 0 : r.Thumbnail, Heading: r == null ? void 0 : r.Heading, EmptyCart: r == null ? void 0 : r.EmptyCart, Footer: r == null ? void 0 : r.Footer, RowTotalFooter: r == null ? void 0 : r.RowTotalFooter, ProductAttributes: r == null ? void 0 : r.ProductAttributes, CartSummaryFooter: r == null ? void 0 : r.CartSummaryFooter, CartItem: r == null ? void 0 : r.CartItem, UndoBanner: r == null ? void 0 : r.UndoBanner, ConfirmDeleteBanner: r == null ? void 0 : r.ConfirmDeleteBanner, ItemTitle: r == null ? void 0 : r.ItemTitle, ItemPrice: r == null ? void 0 : r.ItemPrice, ItemQuantity: r == null ? void 0 : r.ItemQuantity, ItemTotal: r == null ? void 0 : r.ItemTotal, ItemSku: r == null ? void 0 : r.ItemSku, ItemRemoveAction: r == null ? void 0 : r.ItemRemoveAction } }) }), K = (z) => t(at, { name: "ProductListFooter", slot: r == null ? void 0 : r.ProductListFooter, context: { data: z } }), L = (z) => t(at, { name: "PreCheckoutSection", slot: r == null ? void 0 : r.PreCheckoutSection, context: { data: z } }), Lt = () => (b == null ? void 0 : b.subtotal) === "INCLUDING_TAX" || (b == null ? void 0 : b.subtotal) === "INCLUDING_EXCLUDING_TAX" ? { amount: a == null ? void 0 : a.subtotal.includingTax.value, currency: a == null ? void 0 : a.subtotal.includingTax.currency, "data-testid": "subtotal-including-tax", style: { font: "inherit" } } : { amount: a == null ? void 0 : a.subtotal.excludingTax.value, currency: a == null ? void 0 : a.subtotal.excludingTax.currency, "data-testid": "subtotal-excluding-tax", style: { font: "inherit" } };
  return t(ja, { ...p, productListFooter: K(a), subtotal: a != null && a.totalQuantity ? (a == null ? void 0 : a.subtotal) && t(X, { ...Lt() }) : void 0, subtotalExcludingTaxes: a != null && a.totalQuantity ? (a == null ? void 0 : a.subtotal) && ((b == null ? void 0 : b.subtotal) === "INCLUDING_EXCLUDING_TAX" ? t(X, { amount: a == null ? void 0 : a.subtotal.excludingTax.value, currency: a == null ? void 0 : a.subtotal.excludingTax.currency, "data-testid": "subtotal-including-excluding-tax", style: { font: "inherit" } }) : void 0) : void 0, preCheckoutSection: L(a), ctas: a != null && a.totalQuantity ? v("div", { children: [u && t(at, { name: "CheckoutAction", slot: r == null ? void 0 : r.CheckoutAction, context: ut, className: "cart-mini-cart__checkout-action", children: t(kt, { "data-testid": "route-checkout-button", variant: "primary", href: ut.isDisabled ? void 0 : ut.checkoutUrl, disabled: ut.isDisabled, "aria-disabled": ut.isDisabled, onClick: (z) => {
    z.preventDefault(), ut.handleCheckout();
  }, children: D.checkoutLink }) }), o && t(kt, { "data-testid": "route-cart-button", variant: "tertiary", href: o(), children: D.cartLink })] }) : void 0, products: tt, liveRegion: t(Fe, { message: A }) });
};
ya.getInitialData = async function() {
  return ce();
};
ya.displayName = "MiniCart";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ha = ({ children: e, initialData: l = null, routeProduct: r, routeEmptyCartCTA: i, slots: o, ...u }) => {
  var m;
  const [c, g] = F(l);
  st(() => {
    const d = yt.on("cart/data", (x) => {
      g(x);
    }, { eager: !0 });
    return () => {
      d == null || d.off();
    };
  }, []);
  const y = (d, x) => {
    const h = d.selectedOptions ? `${d.name}: ${Object.entries(d.selectedOptions).join("; ")}` : d.name, p = { loading: x < 4 ? "eager" : "lazy", src: d.image.src, alt: d.image.alt }, _ = t(Pe, { "data-testid": "cart-grid-item-image", "aria-label": h, width: "100%", ...p });
    return t("div", { className: "cart-cart-summary-grid__item-container", children: t(at, { name: "Thumbnail", slot: o == null ? void 0 : o.Thumbnail, context: { item: d, defaultImageProps: p }, children: r ? t("a", { href: r(d), children: _ }) : _ }) }, x);
  }, P = c && v(_t, { children: [c.items.map((d, x) => y(d, x)), c.hasAvailableFreeGifts || (m = c.items) != null && m.some((d) => d.isFreeGift) ? t("div", { className: "cart-cart-summary-grid__item-container", children: t(De, { cartData: c }) }) : null] });
  return t(Xa, { ...u, emptyCart: t(Ze, { ctaLinkURL: i ? i() : void 0 }), products: P });
};
ha.getInitialData = async function() {
  return ce();
};
ha.displayName = "CartSummaryGrid";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ci = () => {
  const [e, l] = F(!1), [r, i] = F();
  return { handleEstimateTotals: (o, u) => {
    l(!0);
    const { shippingCountry: m, shippingState: c = "", shippingStateId: g, shippingZip: y = "" } = o, P = { countryCode: m, postcode: y, region: { region: c, id: g }, shipping_method: { carrier_code: (u == null ? void 0 : u.carrier_code) || "", method_code: (u == null ? void 0 : u.method_code) || "" } };
    Va(P).then((d) => {
      var x, h, p, _, T, k, a, S, A, N, M, b, D, R, B, H, Q, W, Z, ut;
      d && i({ estimatedTaxTotal: { amount: (x = d.totalTax) == null ? void 0 : x.value, currency: (h = d.totalTax) == null ? void 0 : h.currency }, estimatedSubTotal: { excludingTax: { amount: (_ = (p = d.subtotal) == null ? void 0 : p.excludingTax) == null ? void 0 : _.value, currency: (k = (T = d.subtotal) == null ? void 0 : T.excludingTax) == null ? void 0 : k.currency }, includingTax: { amount: (S = (a = d.subtotal) == null ? void 0 : a.includingTax) == null ? void 0 : S.value, currency: (N = (A = d.subtotal) == null ? void 0 : A.includingTax) == null ? void 0 : N.currency }, includingDiscountOnly: { amount: (b = (M = d.subtotal) == null ? void 0 : M.includingDiscountOnly) == null ? void 0 : b.value, currency: (R = (D = d.subtotal) == null ? void 0 : D.includingDiscountOnly) == null ? void 0 : R.currency } }, estimatedGrandTotalPrice: { includingTax: { amount: (B = d.total) == null ? void 0 : B.includingTax.value, currency: (H = d.total) == null ? void 0 : H.includingTax.currency }, excludingTax: { amount: (Q = d.total) == null ? void 0 : Q.excludingTax.value, currency: (W = d.total) == null ? void 0 : W.excludingTax.currency } }, estimatedAppliedTaxes: { taxes: (Z = d.appliedTaxes) == null ? void 0 : Z.map((tt) => {
        var K, L;
        return { label: tt.label, amount: { value: (K = tt.amount) == null ? void 0 : K.value, currency: (L = tt.amount) == null ? void 0 : L.currency } };
      }) }, estimatedItems: { items: (ut = d.items) == null ? void 0 : ut.map((tt) => {
        var K, L, Lt, z, O, E, et, G, f, $;
        return { uid: tt.uid, price: { amount: (K = tt.price) == null ? void 0 : K.value, currency: (L = tt.price) == null ? void 0 : L.currency }, taxedPrice: { amount: (Lt = tt.taxedPrice) == null ? void 0 : Lt.value, currency: (z = tt.taxedPrice) == null ? void 0 : z.currency }, rowTotal: { amount: (O = tt.rowTotal) == null ? void 0 : O.value, currency: (E = tt.rowTotal) == null ? void 0 : E.currency }, rowTotalIncludingTax: { amount: (et = tt.rowTotalIncludingTax) == null ? void 0 : et.value, currency: (G = tt.rowTotalIncludingTax) == null ? void 0 : G.currency }, regularPrice: { amount: (f = tt.regularPrice) == null ? void 0 : f.value, currency: ($ = tt.regularPrice) == null ? void 0 : $.currency } };
      }) } });
    }).finally(() => {
      l(!1);
    });
  }, estimatedTotals: r, setEstimatedTotals: i, loading: e };
}, xi = 100, _a = ({ children: e, initialData: l = null, routeCheckout: r, slots: i, errors: o, showTotalSaved: u, enableCoupons: m, enableGiftCards: c, updateLineItems: g = (P) => P, ...y }) => {
  var P, d, x, h, p, _, T, k, a, S, A, N, M, b, D, R, B, H, Q, W, Z, ut, tt, K, L, Lt, z, O, E, et, G, f, $, Y, mt, ht, bt, St, vt, Pt, it, w, j, ct, pt, Ot, ot, Ct, Qt, Zt, jt, Xt, Kt, Ut, Yt, Jt, Bt, qt, Rt;
  const [I, te] = F(l), [ee, Tt] = F(!1), Dt = I == null ? void 0 : I.isVirtual;
  m = m ?? !0, c = c ?? !0;
  const { handleEstimateTotals: oe, estimatedTotals: rt, setEstimatedTotals: ve, loading: We } = Ci(), Wt = (P = xt.config) == null ? void 0 : P.shoppingCartDisplaySetting, xe = (Wt == null ? void 0 : Wt.subtotal) === "INCLUDING_TAX", ye = (Wt == null ? void 0 : Wt.subtotal) === "INCLUDING_EXCLUDING_TAX", Ht = Wt == null ? void 0 : Wt.zeroTax, we = () => (I == null ? void 0 : I.appliedGiftCards.reduce((s, C) => s + C.appliedBalance.value, 0)) ?? 0, Ie = (s) => s != null && s.code ? v(_t, { children: [v("span", { className: "cart-order-summary__coupon__code", children: [t(Et, { source: pa, size: "16" }), t("span", { children: s == null ? void 0 : s.code })] }), v("span", { className: "cart-order-summary__caption", children: [t(ae, { id: "Cart.PriceSummary.giftCard.appliedGiftCards.remainingBalance" }), t(X, { className: "cart-order-summary__caption", weight: "normal", size: "small", amount: s.giftCardBalance.value, currency: s.giftCardBalance.currency })] })] }, s.code) : null, se = (d = xt.config) == null ? void 0 : d.cartGiftWrapping, le = (x = xt.config) == null ? void 0 : x.cartPrintedCard, dt = I == null ? void 0 : I.totalGiftOptions;
  st(() => {
    const s = yt.on("cart/data", (C) => {
      var U, lt, ft;
      te(C);
      const nt = (U = C == null ? void 0 : C.addresses) == null ? void 0 : U.shipping, Nt = C == null ? void 0 : C.isVirtual;
      (nt || Nt) && ve(null), rt == null && ve({ estimatedTaxTotal: { amount: (lt = C == null ? void 0 : C.totalTax) == null ? void 0 : lt.value, currency: (ft = C == null ? void 0 : C.totalTax) == null ? void 0 : ft.currency } });
    }, { eager: !0 });
    return () => {
      s == null || s.off();
    };
  }, []), st(() => {
    Tt(o);
  }, [o]), st(() => {
    const s = yt.on("shipping/estimate", (C) => {
      var U, lt, ft, nt, Nt, Gt;
      const Vt = { shippingCountry: (U = C == null ? void 0 : C.address) == null ? void 0 : U.countryCode, shippingState: (lt = C == null ? void 0 : C.address) == null ? void 0 : lt.region, shippingStateId: (ft = C == null ? void 0 : C.address) == null ? void 0 : ft.regionId, shippingZip: (nt = C == null ? void 0 : C.address) == null ? void 0 : nt.postCode }, At = { carrier_code: ((Nt = C == null ? void 0 : C.shippingMethod) == null ? void 0 : Nt.carrierCode) || "", method_code: ((Gt = C == null ? void 0 : C.shippingMethod) == null ? void 0 : Gt.methodCode) || "" };
      oe(Vt, At);
    });
    return () => {
      s == null || s.off();
    };
  }, [oe]);
  const [Te, ke] = F(!1);
  st(() => {
    const s = yt.on("checkout/initialized", (C) => {
      !C || (C == null ? void 0 : C.type) === "quote" || ke(!0);
    });
    return () => {
      s == null || s.off();
    };
  }, []);
  const $t = It({ checkout: "Cart.PriceSummary.checkout", free: "Cart.PriceSummary.total.free", orderSummary: "Cart.PriceSummary.orderSummary", taxToBeDetermined: "Cart.PriceSummary.taxToBeDetermined" }), ie = (I == null ? void 0 : I.hasOutOfStockItems) || ee, $e = wt((s) => {
    !ie && I && (s.preventDefault(), la(I, xt.locale), setTimeout(() => {
      const C = r == null ? void 0 : r({ cartId: I.id });
      C && (window.location.href = C);
    }, xi));
  }, [ie, I, r]), Se = !Dt && i != null && i.EstimateShipping ? t(at, { name: "EstimateShipping", slot: i.EstimateShipping }, "estimateShippingId") : void 0;
  if (!Object.keys(I ?? {}).length || (I == null ? void 0 : I.totalQuantity) === 0) return null;
  const Oe = m && i != null && i.Coupons ? t(at, { name: "Coupons", slot: i.Coupons }, "couponsId") : void 0, n = c && i != null && i.GiftCards ? t(at, { name: "GiftCards", slot: i.GiftCards }, "giftCardId") : void 0;
  return t(Ya, { ...y, "data-testid": "cart-order-summary", heading: t("div", { children: $t.orderSummary }), shipping: Se, coupons: Oe, giftCards: n, loading: We, updateLineItems: g, appliedGiftCards: (h = I == null ? void 0 : I.appliedGiftCards) != null && h.length ? { label: t(ae, { id: "Cart.PriceSummary.giftCard.appliedGiftCards.label", plural: (p = I == null ? void 0 : I.appliedGiftCards) == null ? void 0 : p.length, fields: { count: (_ = I == null ? void 0 : I.appliedGiftCards) == null ? void 0 : _.length } }), price: t(X, { className: "cart-order-summary__price", amount: -we(), currency: (k = (T = I == null ? void 0 : I.appliedGiftCards) == null ? void 0 : T[0]) == null ? void 0 : k.appliedBalance.currency }), content: (a = I == null ? void 0 : I.appliedGiftCards) == null ? void 0 : a.map(Ie).filter(Boolean) } : void 0, printedCard: { renderContent: !!((S = dt == null ? void 0 : dt.printedCard) != null && S.value), taxIncluded: le === "INCLUDING_TAX", taxInclAndExcl: le === "INCLUDING_EXCLUDING_TAX", priceExclTax: t(X, { "data-testid": "printed-card", amount: (A = dt == null ? void 0 : dt.printedCard) == null ? void 0 : A.value, currency: (N = dt == null ? void 0 : dt.printedCard) == null ? void 0 : N.currency }), priceInclTax: t(X, { amount: (M = dt == null ? void 0 : dt.printedCardInclTax) == null ? void 0 : M.value, currency: (b = dt == null ? void 0 : dt.printedCardInclTax) == null ? void 0 : b.currency }) }, itemsGiftWrapping: { renderContent: !!((D = dt == null ? void 0 : dt.giftWrappingForItems) != null && D.value), taxIncluded: se === "INCLUDING_TAX", taxInclAndExcl: se === "INCLUDING_EXCLUDING_TAX", priceExclTax: t(X, { amount: (R = dt == null ? void 0 : dt.giftWrappingForItems) == null ? void 0 : R.value, currency: (B = dt == null ? void 0 : dt.giftWrappingForItems) == null ? void 0 : B.currency }), priceInclTax: t(X, { amount: (H = dt == null ? void 0 : dt.giftWrappingForItemsInclTax) == null ? void 0 : H.value, currency: (Q = dt == null ? void 0 : dt.giftWrappingForItemsInclTax) == null ? void 0 : Q.currency }) }, orderGiftWrapping: { renderContent: !!((W = dt == null ? void 0 : dt.giftWrappingForOrder) != null && W.value), taxIncluded: se === "INCLUDING_TAX", taxInclAndExcl: se === "INCLUDING_EXCLUDING_TAX", priceExclTax: t(X, { amount: (Z = dt == null ? void 0 : dt.giftWrappingForOrder) == null ? void 0 : Z.value, currency: (ut = dt == null ? void 0 : dt.giftWrappingForOrder) == null ? void 0 : ut.currency }), priceInclTax: t(X, { amount: (tt = dt == null ? void 0 : dt.giftWrappingForOrderInclTax) == null ? void 0 : tt.value, currency: (K = dt == null ? void 0 : dt.giftWrappingForOrderInclTax) == null ? void 0 : K.currency }) }, subTotal: { taxIncluded: xe && !Ht, taxExcluded: ye, zeroTaxSubtotal: Ht, priceExcludingTax: (L = rt == null ? void 0 : rt.estimatedSubTotal) != null && L.excludingTax ? t(X, { "data-testid": "subtotal", ...(Lt = rt == null ? void 0 : rt.estimatedSubTotal) == null ? void 0 : Lt.excludingTax }) : t(X, { "data-testid": "subtotal", amount: (O = (z = I == null ? void 0 : I.subtotal) == null ? void 0 : z.excludingTax) == null ? void 0 : O.value, currency: (et = (E = I == null ? void 0 : I.subtotal) == null ? void 0 : E.excludingTax) == null ? void 0 : et.currency }), price: !Ht && xe || !Ht && ye ? (G = rt == null ? void 0 : rt.estimatedSubTotal) != null && G.includingTax ? t(X, { "data-testid": "subtotal", ...(f = rt == null ? void 0 : rt.estimatedSubTotal) == null ? void 0 : f.includingTax }) : t(X, { "data-testid": "subtotal", amount: ($ = I == null ? void 0 : I.subtotal.includingTax) == null ? void 0 : $.value, currency: (Y = I == null ? void 0 : I.subtotal.includingTax) == null ? void 0 : Y.currency }) : t(X, { "data-testid": "subtotal", amount: (ht = (mt = I == null ? void 0 : I.subtotal) == null ? void 0 : mt.excludingTax) == null ? void 0 : ht.value, currency: (St = (bt = I == null ? void 0 : I.subtotal) == null ? void 0 : bt.excludingTax) == null ? void 0 : St.currency }) }, discounts: (vt = I == null ? void 0 : I.appliedDiscounts) == null ? void 0 : vt.map((s) => {
    var C;
    return { label: s.label, price: t(X, { "data-testid": "summary-discount-total", amount: -s.amount.value, currency: s.amount.currency, sale: !0 }), coupon: s != null && s.coupon ? v("span", { children: [t(Et, { source: ma, size: "16" }), (C = s == null ? void 0 : s.coupon) == null ? void 0 : C.code] }) : void 0 };
  }), taxTotal: Dt && !(I != null && I.appliedTaxes.length) && !Te || rt && rt.estimatedTaxTotal == null ? { price: t("span", { "data-testid": "tax-total-tbd", children: $t.taxToBeDetermined }) } : { price: rt != null && rt.estimatedTaxTotal ? t(X, { "data-testid": "tax-total-estimated", ...rt == null ? void 0 : rt.estimatedTaxTotal }) : t(X, { "data-testid": "tax-total-actual", amount: (Pt = I == null ? void 0 : I.totalTax) == null ? void 0 : Pt.value, currency: (it = I == null ? void 0 : I.totalTax) == null ? void 0 : it.currency }), estimated: (!rt || !rt.estimatedTaxTotal) && !((w = I == null ? void 0 : I.addresses) != null && w.shipping) }, taxesApplied: Dt ? void 0 : Wt != null && Wt.fullSummary ? (ct = ((j = rt == null ? void 0 : rt.estimatedAppliedTaxes) == null ? void 0 : j.taxes) || (I == null ? void 0 : I.appliedTaxes)) == null ? void 0 : ct.map((s) => ({ label: s.label, price: t(X, { "data-testid": "applied-taxes", amount: s.amount.value, currency: s.amount.currency }) })) : void 0, total: { price: rt != null && rt.estimatedGrandTotalPrice ? ((Ot = (pt = rt == null ? void 0 : rt.estimatedGrandTotalPrice) == null ? void 0 : pt.includingTax) == null ? void 0 : Ot.amount) === 0 ? t("span", { "data-testid": "total-including-tax", children: $t.free }) : t(X, { "data-testid": "total-including-tax-estimated", ...(ot = rt == null ? void 0 : rt.estimatedGrandTotalPrice) == null ? void 0 : ot.includingTax }) : ((Ct = I == null ? void 0 : I.total) == null ? void 0 : Ct.includingTax.value) === 0 ? t("span", { "data-testid": "total-including-tax", children: $t.free }) : t(X, { "data-testid": "total-including-tax-actual", amount: (Qt = I == null ? void 0 : I.total) == null ? void 0 : Qt.includingTax.value, currency: (Zt = I == null ? void 0 : I.total) == null ? void 0 : Zt.includingTax.currency }), estimated: (!rt || !!(rt != null && rt.estimatedTaxTotal)) && !((jt = I == null ? void 0 : I.addresses) != null && jt.shipping), priceWithoutTax: Wt != null && Wt.grandTotal ? rt != null && rt.estimatedAppliedTaxes ? ((Kt = (Xt = rt == null ? void 0 : rt.estimatedGrandTotalPrice) == null ? void 0 : Xt.excludingTax) == null ? void 0 : Kt.amount) === 0 ? t("span", { "data-testid": "total-excluding-tax", children: $t.free }) : t(X, { "data-testid": "total-excluding-tax", ...(Ut = rt == null ? void 0 : rt.estimatedGrandTotalPrice) == null ? void 0 : Ut.excludingTax }) : ((Yt = I == null ? void 0 : I.total) == null ? void 0 : Yt.excludingTax.value) === 0 ? t("span", { "data-testid": "total-excluding-tax", children: $t.free }) : t(X, { "data-testid": "total-excluding-tax", amount: (Jt = I == null ? void 0 : I.total) == null ? void 0 : Jt.excludingTax.value, currency: (Bt = I == null ? void 0 : I.total) == null ? void 0 : Bt.excludingTax.currency }) : void 0 }, primaryAction: r && t(kt, { "data-testid": "checkout-button", variant: "primary", disabled: ie, "aria-disabled": ie, href: ie ? void 0 : r({ cartId: I.id }), onClick: $e, children: $t.checkout }), totalSaved: u ? t(X, { amount: (qt = I == null ? void 0 : I.discount) == null ? void 0 : qt.value, currency: (Rt = I == null ? void 0 : I.total) == null ? void 0 : Rt.includingTax.currency }) : void 0 });
};
_a.getInitialData = async function() {
  return ce();
};
_a.displayName = "OrderSummary";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ba = ({ routeCTA: e }) => t(Ze, { ctaLinkURL: e == null ? void 0 : e() });
ba.displayName = "EmptyCart";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const wi = ({ children: e, ...l }) => {
  const [r, i] = F(/* @__PURE__ */ new Set()), [o, u] = F([]), [m, c] = F(/* @__PURE__ */ new Set()), g = It({ applyButton: "Cart.PriceSummary.coupon.applyAction", applyButtonAriaLabel: "Cart.PriceSummary.coupon.applyActionAriaLabel", placeholder: "Cart.PriceSummary.coupon.placeholder", ariaLabelRemove: "Cart.PriceSummary.coupon.ariaLabelRemove" }), y = async (h) => {
    const p = h.coupon, _ = new Set(r);
    _.add(p), c(/* @__PURE__ */ new Set());
    const T = Array.from(_);
    Ye(T, Je.REPLACE).then((k) => {
      if (k === null) throw new Error("Error adding coupon code");
      i(_);
    }).catch((k) => {
      console.warn(k), c(/* @__PURE__ */ new Set([k.message]));
    });
  }, P = (h) => {
    const p = new Set(r);
    p.delete(h), c(/* @__PURE__ */ new Set());
    const _ = Array.from(p);
    Ye(_, Je.REPLACE).then((T) => {
      if (T === null) throw new Error("Error removing coupon code");
      i(p);
    }).catch((T) => {
      console.warn(T), c(/* @__PURE__ */ new Set([T.message]));
    });
  };
  st(() => {
    const h = yt.on("cart/data", (p) => {
      const _ = p == null ? void 0 : p.appliedCoupons;
      if (!_) {
        u([]), c(/* @__PURE__ */ new Set());
        return;
      }
      const T = _.map((k) => k.code);
      u(T), c(/* @__PURE__ */ new Set());
    }, { eager: !0 });
    return () => {
      h == null || h.off();
    };
  }, []), st(() => {
    i(new Set(o));
  }, [o]), st(() => {
    const h = yt.on("shipping/estimate", () => {
      c(/* @__PURE__ */ new Set());
    }, { eager: !0 });
    return () => {
      h == null || h.off();
    };
  }, []);
  const d = o.map((h, p) => v(na, { className: "coupon-code-form__applied-item", children: [t("span", { children: h }), t("button", { "aria-label": `${g.ariaLabelRemove} ${h}`, onClick: () => P(h), "data-testid": `remove-coupon-${p + 1}`, children: t(Et, { source: ua, size: "16" }) })] }, h)), x = m.size > 0 ? t("div", { "data-testid": "coupon-code-error", role: "status", "aria-live": "polite", children: Array.from(m)[0] }) : void 0;
  return t(va, { ...l, couponCodeField: t(ge, { "aria-label": g.placeholder, type: "text", placeholder: g.placeholder, name: "coupon", variant: "primary", value: "", "data-testid": "coupon-code-input", maxLength: 50, error: m.size > 0 }), applyCouponsButton: t(kt, { variant: "secondary", "aria-label": g.applyButtonAriaLabel, children: g.applyButton }), error: x, appliedCoupons: t("div", { children: d }), onApplyCoupon: y });
};
wi.displayName = "Coupons";
/*! Copyright 2026 Adobe
All Rights Reserved. */
Ft.displayName = "OrderSummaryLine";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ii = ({ children: e, ...l }) => {
  const [r, i] = F(/* @__PURE__ */ new Set()), [o, u] = F([]), [m, c] = F(/* @__PURE__ */ new Set()), g = It({ giftCardTitle: "Cart.PriceSummary.giftCard.title", applyButton: "Cart.PriceSummary.giftCard.applyAction", applyButtonAriaLabel: "Cart.PriceSummary.giftCard.applyActionAriaLabel", placeholder: "Cart.PriceSummary.giftCard.placeholder", ariaLabel: "Cart.PriceSummary.giftCard.ariaLabel", ariaLabelRemove: "Cart.PriceSummary.giftCard.ariaLabelRemove", empty: "Cart.PriceSummary.giftCard.errors.empty" }), y = async (h) => {
    const p = h == null ? void 0 : h.giftCardCode;
    if (p === "") return c(/* @__PURE__ */ new Set([g.empty])), !0;
    const _ = new Set(r);
    _.add(p), c(/* @__PURE__ */ new Set()), Ua(p).then((T) => {
      if (T === null) throw new Error("Error adding gift card code");
      i(_);
    }).catch((T) => {
      console.warn(T), c(/* @__PURE__ */ new Set([T.message]));
    });
  }, P = (h) => {
    const p = new Set(r);
    p.delete(h), c(/* @__PURE__ */ new Set()), za(h).then((_) => {
      if (_ === null) throw new Error("Error removing gift card code");
      i(p);
    }).catch((_) => {
      console.warn(_), c(/* @__PURE__ */ new Set([_.message]));
    });
  };
  st(() => {
    const h = yt.on("cart/data", (p) => {
      const _ = p == null ? void 0 : p.appliedGiftCards;
      if (!_) {
        u([]), c(/* @__PURE__ */ new Set());
        return;
      }
      const T = _.map(({ code: k }) => k);
      u(T), c(/* @__PURE__ */ new Set());
    }, { eager: !0 });
    return () => {
      h == null || h.off();
    };
  }, []), st(() => {
    i(new Set(o));
  }, [o]);
  const d = o.map((h, p) => v(na, { className: "coupon-code-form__applied-item", children: [t("span", { children: h }), t("button", { "aria-label": `${g.ariaLabelRemove} ${h}`, onClick: () => P(h), "data-testid": `remove-giftcard-${p + 1}`, children: t(Et, { source: ua, size: "16" }) })] }, h)), x = m.size > 0 ? t("div", { "data-testid": "giftcard-code-error", role: "status", "aria-live": "polite", children: Array.from(m)[0] }) : void 0;
  return t(va, { ...l, className: "cart-gift-cards", accordionSectionTitle: g.giftCardTitle, accordionSectionIcon: pa, couponCodeField: t(ge, { "aria-label": g.ariaLabel, type: "text", placeholder: g.placeholder, name: "giftCardCode", variant: "primary", value: "", "data-testid": "giftcard-code-input", maxLength: 50, error: m.size > 0 }), applyCouponsButton: t(kt, { variant: "secondary", "aria-label": g.applyButtonAriaLabel, children: g.applyButton }), error: x, appliedCoupons: t("div", { children: d }), onApplyCoupon: y });
};
Ii.displayName = "GiftCards";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ne = { recipientName: "", senderName: "", message: "" }, Ti = { giftReceiptIncluded: !1, printedCardIncluded: !1, isGiftWrappingSelected: !1 }, Ca = (e, l) => {
  var r, i;
  if (!l) return !!((r = xt.config) != null && r.allowGiftMessageOnOrder);
  const o = ((i = xt.config) == null ? void 0 : i.allowGiftMessageOnOrderItems) ?? !1;
  return typeof (e == null ? void 0 : e.giftMessageAvailable) == "boolean" ? e == null ? void 0 : e.giftMessageAvailable : o;
}, ki = (e, l) => {
  const { allowGiftWrappingOnOrder: r, allowGiftWrappingOnOrderItems: i, allowGiftMessageOnOrder: o, allowGiftMessageOnOrderItems: u, allowGiftReceipt: m, allowPrintedCard: c } = xt.config || {}, g = !u && !i && !Ca(l, !0);
  return !!(e === "product" && g || e === "order" && (!r && !o && !m && !c));
}, Si = ({ item: e, view: l, dataSource: r, initialLoading: i, handleItemsLoading: o, handleItemsError: u, onItemUpdate: m, onGiftOptionsChange: c }) => {
  var g, y, P, d, x, h;
  const p = l === "product", _ = It({ requiredFieldError: "Cart.GiftOptions.formText.requiredFieldError" }), [T, k] = F(() => i), [a, S] = F({ isGiftReceiptVisible: !0, isPrintedCartVisible: !0, isGiftWrappingVisible: !0, isGiftOptionsVisible: !0 }), [A, N] = F(!0), [M, b] = F(!1), [D, R] = F(!1), [B, H] = F(!1), [Q, W] = F(!1), [Z, ut] = F(!1), [tt, K] = F([]), [L, Lt] = F(null), [z, O] = F(Ne), [E, et] = F(() => ({ giftWrappingId: "", ...Ne, ...Ti })), G = ((g = E.recipientName) == null ? void 0 : g.trim()) && ((y = E.senderName) == null ? void 0 : y.trim()) && ((P = E.message) == null ? void 0 : P.trim()), f = !((d = E.recipientName) != null && d.trim()) && !((x = E.senderName) != null && x.trim()) && !((h = E.message) != null && h.trim()), $ = wt(async (it) => {
    switch (b(l === "order"), R(!0), l) {
      case "product":
        {
          "uid" in e && (o == null || o(e.uid, !0), u == null || u(e.uid));
          const { recipientName: w, senderName: j, message: ct, giftWrappingId: pt, isGiftWrappingSelected: Ot } = it, ot = { gift_message: { to: w ?? "", from: j ?? "", message: ct ?? "" }, gift_wrapping_id: Ot ? pt : "" };
          "uid" in e && "quantity" in e && await fe([{ uid: e.uid, quantity: e.quantity, giftOptions: ot }]).then(() => {
            m == null || m({ item: e });
          }).finally(() => {
            o == null || o(e.uid, !1), R(!1), H(!1), b(!1);
          }).catch((Ct) => {
            console.warn(Ct);
          });
        }
        break;
      case "order":
        await Ba(it).finally(() => {
          R(!1), H(!1), b(!1);
        });
        break;
      default:
        console.error('Incorrect "view" prop value provided for GiftOptions container (storefront-cart)');
        break;
    }
  }, [u, o, e, m, l]), Y = wt((it, w, j = {}) => {
    et((ct) => {
      const pt = (Ct) => Ct in ct, Ot = (Ct) => pt(Ct) ? ct[Ct] : void 0;
      if (!(Ot(it) !== w || Object.keys(j).some((Ct) => Ot(Ct) !== j[Ct]))) return c == null || c(ct), ct;
      const ot = { ...ct, [it]: w, ...j };
      return !ot.recipientName && !ot.senderName && !ot.message && W(!0), (typeof w == "boolean" || ["giftWrappingId", "giftReceiptIncluded", "printedCardIncluded"].includes(it)) && (W(!1), typeof c == "function" ? c(ot) : $(ot)), H(!0), c == null || c(ot), ot;
    });
  }, [$, c]), mt = wt(async () => {
    D || typeof c != "function" && (f && Q && (O(Ne), W(!1), await $(E)), B && G && (W(!0), await $(E)));
  }, [$, E, B, f, Q, D, c, G]), ht = wt(async (it) => {
    if (D || typeof c == "function") return;
    const { name: w, value: j } = it.target;
    O((ct) => ({ ...ct, [w]: j.trim() ? "" : _.requiredFieldError })), f && Q && (O(Ne), W(!1), await $(E)), B && G && await $(E);
  }, [D, f, Q, B, G, _, $, E, c]), bt = wt((it) => {
    const w = it.target, j = w.name, ct = w.type === "checkbox" ? w.checked : w.value;
    Y(j, ct);
  }, [Y]);
  st(() => {
    if (p) return;
    const it = yt.on(r === "cart" ? "cart/data" : "order/data", (w) => {
      var j, ct;
      Lt(w);
      const pt = (j = w == null ? void 0 : w.items) == null ? void 0 : j.some(({ giftWrappingAvailable: ot }) => ot), Ot = (ct = w == null ? void 0 : w.cartGiftWrapping) == null ? void 0 : ct.some((ot) => ot.selected);
      !pt && Ot && $({ ...E, giftWrappingId: "", isGiftWrappingSelected: !1 });
    }, { eager: !0 });
    return () => {
      it == null || it.off();
    };
  }, [Lt, $, r, E, p]);
  const St = ne(() => {
    var it, w, j, ct, pt, Ot;
    if (!L && !e) return null;
    const ot = p ? (it = e == null ? void 0 : e.productGiftWrapping) == null ? void 0 : it.map((Tt) => {
      var Dt;
      return { ...Tt, price: e != null && e.giftWrappingPrice && ((Dt = e == null ? void 0 : e.giftWrappingPrice) == null ? void 0 : Dt.value) > 0 ? e.giftWrappingPrice : Tt.price };
    }) : (L == null ? void 0 : L.cartGiftWrapping) || [], Ct = ot == null ? void 0 : ot.find((Tt) => Tt.selected), Qt = (Ct == null ? void 0 : Ct.uid) ?? ((w = ot == null ? void 0 : ot[0]) == null ? void 0 : w.uid), Zt = !!Ct, jt = p ? e.giftMessage : L == null ? void 0 : L.giftMessage, Xt = L == null ? void 0 : L.printedCardIncluded, Kt = L == null ? void 0 : L.giftReceiptIncluded, Ut = Ca(e, p), Yt = (j = xt.config) == null ? void 0 : j.allowGiftWrappingOnOrder, Jt = (ct = xt.config) == null ? void 0 : ct.allowGiftReceipt, Bt = (pt = xt.config) == null ? void 0 : pt.allowPrintedCard, qt = (Ot = L == null ? void 0 : L.items) == null ? void 0 : Ot.some((Tt) => Tt.giftWrappingAvailable), Rt = e == null ? void 0 : e.giftWrappingAvailable, I = p ? !1 : !!Jt, te = p ? !1 : !!Bt, ee = p ? !!Rt && !!ot.length : !!Yt && !!ot.length && !!qt;
    return S({ isGiftReceiptVisible: I, isPrintedCartVisible: te, isGiftWrappingVisible: ee, isGiftOptionsVisible: !(!I && !te && !ee) }), N(Ut), { ...e && "uid" in e ? { itemId: e.uid } : {}, ...p ? {} : { printedCardIncluded: Xt, giftReceiptIncluded: Kt }, ...jt, giftWrappingId: Qt, isGiftWrappingSelected: Zt, giftWrappingOptions: ot };
  }, [L, e, p]);
  st(() => {
    if (!St) return;
    const { giftWrappingOptions: it, ...w } = St;
    et(w), it != null && it.length && K(it), k(!1);
  }, [St]);
  const vt = ne(() => Object.entries(E).filter(([it]) => it !== "itemId" && it !== "giftWrappingId").some(([, it]) => !!it), [E]), Pt = ne(() => {
    var it;
    return !T && !!((it = xt) != null && it.config) && ki(l, e);
  }, [e, T, l]);
  return { loading: T, giftOptions: E, showModal: Z, errorsField: z, updateLoading: M, cartData: L, fieldsDisabled: D, isGiftOptionsApplied: vt, giftWrappingConfig: tt, setFieldsDisabled: R, handleFormMouseLeave: mt, onInputChange: bt, updateGiftOptions: Y, setShowModal: ut, handleBlur: ht, isGiftMessageVisible: A, areGiftOptionsVisible: a, isGiftOptionsHidden: Pt };
}, Oi = ({ item: e, view: l = "order", readOnlyFormOrderView: r = "primary", dataSource: i = "cart", isEditable: o = !0, initialLoading: u = !0, slots: m, handleItemsLoading: c, handleItemsError: g, onItemUpdate: y, onGiftOptionsChange: P }) => {
  const { isGiftMessageVisible: d, areGiftOptionsVisible: x, loading: h, giftOptions: p, showModal: _, errorsField: T, updateLoading: k, cartData: a, isGiftOptionsApplied: S, fieldsDisabled: A, giftWrappingConfig: N, handleFormMouseLeave: M, updateGiftOptions: b, setShowModal: D, onInputChange: R, handleBlur: B, isGiftOptionsHidden: H } = Si({ item: e, view: l, dataSource: i, initialLoading: u, handleItemsLoading: c, handleItemsError: g, onItemUpdate: y, onGiftOptionsChange: P });
  return H ? null : t(oi, { item: e, view: l, loading: h, onBlur: B, giftOptions: p, showModal: _, isEditable: o, errorsField: T, setShowModal: D, updateLoading: k, updateGiftOptions: b, cartData: a, isGiftOptionsApplied: S, fieldsDisabled: A, giftWrappingConfig: N, handleFormMouseLeave: M, readOnlyFormOrderView: r, onInputChange: R, isGiftMessageVisible: d, areGiftOptionsVisible: x, imageSwatchImageNode: m != null && m.SwatchImage ? ({ imageSwatchContext: Q, ...W }) => t(at, { name: "SwatchImage", slotTag: "span", contentTag: "span", slot: m.SwatchImage, context: { item: e, imageSwatchContext: Q, defaultImageProps: W } }) : void 0 });
};
Oi.displayName = "GiftOptions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ni = ({ dictionary: e, onQuantityUpdate: l, onItemRemove: r }) => {
  var i, o;
  const [u, m] = F(/* @__PURE__ */ new Map()), [c, g] = F(/* @__PURE__ */ new Map()), y = (o = (i = xt) == null ? void 0 : i.config) == null ? void 0 : o.shoppingCartDisplaySetting, P = (y == null ? void 0 : y.price) === "INCLUDING_TAX", d = (y == null ? void 0 : y.price) === "INCLUDING_EXCLUDING_TAX", x = ({ item: a }) => {
    const S = { ...a.bundleOptions, ...a.selectedOptions, ...a.customizableOptions, ...a.recipient ? { [e.recipient]: a.recipient } : null, ...a.recipientEmail && a.recipient ? { [e.recipient]: `${a.recipient} (${a.recipientEmail})` } : null, ...a.sender ? { [e.sender]: a.sender } : null, ...a.senderEmail && a.sender ? { [e.sender]: `${a.sender} (${a.senderEmail})` } : {}, ...a.message ? { [e.message]: a.message } : null, ...a.links && a.links.count ? a.links.count > 1 ? { [e.files.replace("{count}", a.links.count.toString())]: a.links.result } : { [e.file.replace("{count}", a.links.count.toString())]: a.links.result } : null };
    if (Object.keys(S).length !== 0) return S;
  }, h = (a) => {
    var S, A, N, M;
    return P ? a.discounted ? { amount: a.regularPrice.value, currency: a.regularPrice.currency, "data-testid": "discounted-regular-item-price" } : { amount: (S = a.taxedPrice) == null ? void 0 : S.value, currency: (A = a.taxedPrice) == null ? void 0 : A.currency, "data-testid": "taxed-item-price" } : { amount: (N = a.regularPrice) == null ? void 0 : N.value, currency: (M = a.regularPrice) == null ? void 0 : M.currency, "data-testid": "regular-item-price" };
  }, p = (a) => {
    var S, A, N, M, b, D, R, B, H, Q;
    const W = { "aria-label": e.regularPrice };
    if (a.isFreeGift) {
      const ut = sa(a), tt = ["INCLUDING_TAX", "INCLUDING_EXCLUDING_TAX"].includes(y == null ? void 0 : y.price);
      if (W["data-testid"] = tt ? "including-tax-item-total" : "regular-item-total", ut.value === 0) return W.amount = 0, W.currency = ut.currency, W.variant = "default", { subtotalProps: W, subtotalDiscountProps: null };
      W.amount = ut.value, W.currency = ut.currency, W.variant = "strikethrough";
      const K = { amount: 0, currency: ut.currency, sale: !0, "aria-label": e.discountedPrice, "data-testid": "discount-total" };
      return { subtotalProps: W, subtotalDiscountProps: K };
    }
    const Z = a.discounted ? {} : null;
    return ["INCLUDING_TAX", "INCLUDING_EXCLUDING_TAX"].includes(y == null ? void 0 : y.price) ? (W.amount = (S = a.rowTotalIncludingTax) == null ? void 0 : S.value, W.currency = (A = a.rowTotalIncludingTax) == null ? void 0 : A.currency, W.variant = a.discounted ? "strikethrough" : "default", W["data-testid"] = "including-tax-item-total", Z && (W.amount = (N = a.total) == null ? void 0 : N.value, W.currency = (M = a.total) == null ? void 0 : M.currency, Z.amount = (b = a.rowTotalIncludingTax) == null ? void 0 : b.value, Z.currency = (D = a.rowTotalIncludingTax) == null ? void 0 : D.currency, Z.sale = !0, Z["aria-label"] = e.discountedPrice, Z["data-testid"] = "discount-total")) : (W.amount = (R = a.total) == null ? void 0 : R.value, W.currency = (B = a.total) == null ? void 0 : B.currency, W.variant = a.discounted ? "strikethrough" : "default", W["data-testid"] = "regular-item-total", Z && (Z.amount = (H = a.discountedTotal) == null ? void 0 : H.value, Z.currency = (Q = a.discountedTotal) == null ? void 0 : Q.currency, Z.sale = !0, Z["aria-label"] = e.regularPrice, Z["data-testid"] = "discount-total")), { subtotalProps: W, subtotalDiscountProps: Z };
  }, _ = (a) => {
    var S, A;
    const N = c.get(a.uid), M = a.insufficientQuantity && a.stockLevel ? a.stockLevel === "noNumber" ? e.insufficientQuantityGeneral : e.insufficientQuantity.replace("{inventory}", (S = a.stockLevel) == null ? void 0 : S.toString()).replace("{count}", a.quantity.toString()) : void 0, b = da(a), D = a.lowInventory && a.onlyXLeftInStock && e.lowInventory.replace("{count}", (A = a.onlyXLeftInStock) == null ? void 0 : A.toString());
    return N || M || b || D || void 0;
  }, T = wt(async (a, S) => {
    const A = (N, M) => fe([{ uid: N.uid, quantity: M }]);
    if (!(isNaN(S) || a.quantity === S)) {
      g(/* @__PURE__ */ new Map());
      try {
        m((N) => {
          const M = new Map(N);
          return M.set(a.uid, { isUpdating: !0, updatedValue: S }), M;
        }), await A(a, S), S === 0 ? r == null || r(a) : l == null || l(a, S);
      } catch (N) {
        m((M) => {
          const b = new Map(M);
          return b.delete(a.uid), b;
        }), g((M) => {
          const b = new Map(M);
          return b.set(a.uid, N.message), b;
        });
      }
    }
  }, [r, l]), k = ne(() => Oa(T, 500), [T]);
  return { showIncludedTaxPrice: P, showExcludingTaxPrice: d, itemsUpdating: u, itemUpdateErrors: c, getConfiguration: x, getPriceProps: h, getSubtotalProps: p, processQuantityChange: T, debouncedQuantityChange: k, setItemsUpdating: m, getWarningMessage: _, setItemUpdateError: (a, S) => {
    g((A) => {
      const N = new Map(A);
      return S ? N.set(a, S) : N.delete(a), N;
    });
  }, handleRemoveItem: (a) => (m((S) => {
    const A = new Map(S);
    return A.set(a.uid, { isUpdating: !0, updatedValue: 0 }), A;
  }), fe([{ uid: a.uid, quantity: 0 }]).then((S) => (r == null || r(a), Promise.resolve(S)))), setItemUpdating: (a, S) => {
    m((A) => {
      const N = new Map(A);
      return N.set(a, { isUpdating: S, updatedValue: S }), N;
    });
  } };
}, Gi = () => t(Ae, { "data-testid": "cart-summary-table-skeleton", className: "cart-cart-summary-table__skeleton", rowGap: "medium", children: t(Me, { variant: "row", size: "xlarge", fullWidth: !0, lines: 4, multilineGap: "small" }) }), xa = ({ initialData: e = null, routeProduct: l, routeEmptyCartCTA: r, slots: i, className: o, allowQuantityUpdates: u = !0, allowRemoveItems: m = !0, onQuantityUpdate: c, onItemRemove: g, undo: y = !1, ...P }) => {
  var d;
  const [x, h] = F(!e), [p, _] = F(e), [T, k] = F([]), a = It({ file: "Cart.CartItem.file", files: "Cart.CartItem.files", heading: "Cart.Cart.heading", message: "Cart.CartItem.message", recipient: "Cart.CartItem.recipient", regularPrice: "Cart.CartItem.regularPrice", discountedPrice: "Cart.CartItem.discountedPrice", sender: "Cart.CartItem.sender", lowInventory: "Cart.CartItem.lowInventory", insufficientQuantity: "Cart.CartItem.insufficientQuantity", insufficientQuantityGeneral: "Cart.CartItem.insufficientQuantityGeneral", outOfStockHeading: "Cart.OutOfStockMessage.heading", outOfStockDescription: "Cart.OutOfStockMessage.message", outOfStockAlert: "Cart.OutOfStockMessage.alert", removeAction: "Cart.OutOfStockMessage.action", notAvailableMessage: "Cart.CartItem.notAvailableMessage", viewMore: "Cart.Cart.viewMore", viewAll: "Cart.Cart.viewAll", discountPercent: "Cart.CartItem.discountPercentage", savingsAmount: "Cart.CartItem.savingsAmount", includingTax: "Cart.CartItem.includingTax", excludingTax: "Cart.CartItem.excludingTax", remove: "Dropin.CartItem.remove.label", removeDefault: "Dropin.CartItem.removeDefault.label", quantity: "Dropin.CartItem.quantity.label", itemBeingRemoved: "Cart.CartItem.itemBeingRemoved", itemRemoved: "Cart.CartItem.itemRemoved", itemRemovedDescription: "Cart.CartItem.itemRemovedDescription", undoAction: "Cart.CartItem.undoAction", dismissAction: "Cart.CartItem.dismissAction" }), { showIncludedTaxPrice: S, showExcludingTaxPrice: A, itemsUpdating: N, itemUpdateErrors: M, getConfiguration: b, getPriceProps: D, getSubtotalProps: R, debouncedQuantityChange: B, setItemsUpdating: H, getWarningMessage: Q, handleRemoveItem: W, setItemUpdating: Z, setItemUpdateError: ut } = Ni({ dictionary: a, onQuantityUpdate: c, onItemRemove: g });
  function tt(G) {
    const f = ce(), $ = f == null ? void 0 : f.items.find((Y) => Y.uid === G);
    $ && k((Y) => {
      const mt = f.items.findIndex((ht) => ht.uid === G);
      return mt !== -1 && !Y.some((ht) => ht.item.uid === G) ? (yt.emit("cart/product/removed", { item: $, index: mt }), [...Y, { item: $, index: mt, loading: !1, error: void 0 }]) : Y;
    });
  }
  const K = Li(T, k), L = Ei(k), Lt = wt((G) => {
    y && tt(G.uid), W(G);
  }, [y, W]);
  st(() => {
    const G = yt.on("cart/data", (f) => {
      h(!0), _(f), H(/* @__PURE__ */ new Map()), h(!1);
    }, { eager: !0 });
    return () => {
      G == null || G.off();
    };
  }, [h, _, H]);
  const z = ne(() => {
    var G;
    return ((G = p == null ? void 0 : p.items) == null ? void 0 : G.sort((f, $) => M.has(f.uid) && !M.has($.uid) ? -1 : !M.has(f.uid) && M.has($.uid) ? 1 : f.outOfStock && !$.outOfStock ? -1 : !f.outOfStock && $.outOfStock ? 1 : 0).map((f, $) => {
      var Y, mt, ht, bt, St, vt, Pt, it, w, j, ct;
      const pt = N.has(f.uid), Ot = Q(f), ot = t(at, { name: "ProductTitle", slot: i == null ? void 0 : i.ProductTitle, context: { item: f }, children: l ? t("a", { href: l(f), children: f.name }) : f.name }), Ct = { src: f.image.src, alt: f.image.alt, width: "300", height: "300", params: { width: 300 } }, Qt = t(Pe, { "data-testid": `cart-table-item-image-${f.sku}`, loading: $ < 4 ? "eager" : "lazy", ...Ct }), Zt = t(at, { name: "Thumbnail", slot: i == null ? void 0 : i.Thumbnail, className: "cart-cart-summary-table__item-image-wrapper", context: { item: f, defaultImageProps: { ...Ct, loading: $ < 4 ? "eager" : "lazy" }, index: $ }, children: l ? t("a", { href: l(f), children: Qt }) : Qt }), jt = t(at, { name: "Sku", slot: i == null ? void 0 : i.Sku, context: { item: f }, children: f.sku }), Xt = f.outOfStock || i != null && i.ItemAlert ? t(at, { name: "ItemAlert", slot: i == null ? void 0 : i.ItemAlert, context: { item: f }, children: f.outOfStock && v("div", { className: "cart-cart-summary-table__item-quantity-alert-wrapper", "data-testid": `cart-table-item-quantity-alert-${f.uid}`, children: [t(Et, { className: "cart-cart-summary-table__item-quantity-alert-icon", source: Re, size: "16" }), t("span", { className: "cart-cart-summary-table__item-quantity-alert-text", children: a.outOfStockAlert })] }) }) : void 0, Kt = Ot || i != null && i.ItemWarning ? t(at, { name: "ItemWarning", slot: i == null ? void 0 : i.ItemWarning, context: { item: f }, children: Ot && v("div", { className: "cart-cart-summary-table__item-quantity-warning-wrapper", "data-testid": `cart-table-item-quantity-warning-${f.uid}`, children: [t(Et, { className: "cart-cart-summary-table__item-quantity-warning-icon", source: fa, size: "16" }), t("span", { className: "cart-cart-summary-table__item-quantity-warning-text", children: Ot })] }) }) : void 0, Ut = b({ item: f }), Yt = Ut || i != null && i.Configurations ? t(at, { name: "Configurations", slot: i == null ? void 0 : i.Configurations, context: { item: f }, children: Ut && t("ul", { className: "cart-cart-summary-table__item-configurations", "data-testid": `cart-table-item-configurations-${f.sku}`, children: Object.entries(Ut).map(([Tt, Dt]) => v("li", { className: "cart-cart-summary-table__item-configuration", "data-testid": `cart-table-item-configuration-${Tt}`, children: [v("span", { className: "cart-cart-summary-table__item-configuration-label", children: [Tt, ":"] }), t("span", { className: "cart-cart-summary-table__item-configuration-value", children: Dt })] }, Tt)) }) }) : void 0, { subtotalProps: Jt, subtotalDiscountProps: Bt } = R(f), qt = (Y = N.get(f.uid)) == null ? void 0 : Y.updatedValue, Rt = pt && !isNaN(qt) ? qt : f.quantity, I = (Tt) => {
        const Dt = Tt.target, oe = parseInt(Dt.value, 10);
        B(f, oe);
      }, te = N.has(f.uid) && ((mt = N.get(f.uid)) == null ? void 0 : mt.updatedValue) === 0, ee = t(at, { name: "Actions", slot: i == null ? void 0 : i.Actions, context: { item: f, itemsUpdating: N, setItemUpdating: Z, setItemUpdateError: ut }, children: m && !te && t(kt, { variant: "tertiary", size: "medium", className: "cart-cart-summary-table__item-remove-button", "data-testid": `cart-table-item-remove-${f.uid}`, icon: t(Et, { source: ga, size: "32" }), onClick: () => Lt(f), "aria-label": ((ht = a.remove) == null ? void 0 : ht.replace("{product}", f.name)) || a.removeDefault }) });
      return { key: f.uid, uid: f.uid, updating: pt, hasError: f.outOfStock || M.has(f.uid), item: t(at, { name: "Item", slot: i == null ? void 0 : i.Item, context: { item: f }, children: t(fi, { productTitle: ot, image: Zt, sku: jt, configurations: Yt, alert: Xt, warning: Kt }) }), price: v(at, { name: "Price", className: "cart-cart-summary-table__item-price", slot: i == null ? void 0 : i.Price, context: { item: f }, children: [f.isFreeGift ? (() => {
        const Tt = ca(f);
        return t(X, { amount: Tt.value, currency: Tt.currency, style: { font: "inherit" }, "data-testid": "free-gift-unit-price" });
      })() : t(X, { ...D(f) }), S && v("span", { className: "cart-cart-summary-table__item-price-tax-label", children: [a.includingTax, ": ", t(X, { amount: (bt = f.taxedPrice) == null ? void 0 : bt.value, currency: (St = f.taxedPrice) == null ? void 0 : St.currency })] }), A && v("span", { className: "cart-cart-summary-table__item-price-tax-label", children: [a.excludingTax, ": ", t(X, { amount: (vt = f.regularPrice) == null ? void 0 : vt.value, currency: (Pt = f.regularPrice) == null ? void 0 : Pt.currency })] })] }), quantity: t(at, { name: "Quantity", className: "cart-cart-summary-table__item-qty", slot: i == null ? void 0 : i.Quantity, context: { item: f, isUpdating: pt, quantityInputValue: Rt, handleInputChange: I, itemUpdateErrors: M }, children: u && !f.isFreeGift ? t("input", { id: `cart-table-item-quantity-${f.uid}`, "data-testid": `cart-table-item-quantity-${f.uid}`, type: "number", min: "1", value: Rt, disabled: pt, "aria-label": a.quantity, className: q(["cart-cart-summary-table__cell-qty-input", "cart-cart-summary-table__cell-qty-updater", ["cart-cart-summary-table__cell-qty-updater--disabled", pt], ["cart-cart-summary-table__cell-qty-updater--error", M.has(f.uid)]]), onChange: I }) : t("span", { children: f.quantity }) }), subtotal: v(at, { name: "Subtotal", className: "cart-cart-summary-table__item-subtotal", slot: i == null ? void 0 : i.Subtotal, context: { item: f }, children: [t(X, { ...Jt }), Bt && t(X, { ...Bt }), S && v("span", { className: "cart-cart-summary-table__item-subtotal-tax-label", children: [a.includingTax, ": ", t(X, { amount: (it = f.rowTotalIncludingTax) == null ? void 0 : it.value, currency: (w = f.rowTotalIncludingTax) == null ? void 0 : w.currency })] }), A && v("span", { className: "cart-cart-summary-table__item-subtotal-tax-label", children: [a.excludingTax, ": ", t(X, { amount: (j = f.rowTotal) == null ? void 0 : j.value, currency: (ct = f.rowTotal) == null ? void 0 : ct.currency })] })] }), actions: ee };
    })) || [];
  }, [p, N, u, l, i, M, a, b, m, B, Q, D, R, Z, ut, S, A, Lt]);
  if (x) return t(Gi, {});
  const O = () => {
    if (!(p != null && p.items)) return null;
    const G = [], f = p.items;
    for (let $ = 0; $ <= z.length; $++) y && T.filter((Y) => Y.index === $).forEach(({ item: Y, error: mt }) => {
      const ht = Pi(Y.uid, N), bt = Di({ item: Y, error: mt }, Y, ht, a, K, L, i);
      G.push({ uid: `undo-banner-${Y.uid}`, updating: !1, hasError: !1, item: t("div", {}), price: t("div", {}), quantity: t("div", {}), subtotal: t("div", {}), actions: t("div", {}), undoBanner: bt });
    }), $ < z.length && $ < f.length && G.push(z[$]);
    return et && G.push(et), t(Ue, { entries: G, className: o, ...P });
  }, E = t(at, { name: "EmptyCart", slot: i == null ? void 0 : i.EmptyCart, context: {}, children: t(ba, { ctaLinkURL: r == null ? void 0 : r() }) }), et = p && (p.hasAvailableFreeGifts || (d = p.items) != null && d.some((G) => G.isFreeGift)) ? { uid: "free-gift-selection-banner", updating: !1, hasError: !1, item: t("div", {}), price: t("div", {}), quantity: t("div", {}), subtotal: t("div", {}), actions: t("div", {}), undoBanner: t("div", { className: "cart-cart-summary-table__free-gift-footer", children: t(De, { cartData: p }) }) } : null;
  return p != null && p.totalQuantity || y && T.length > 0 ? y ? T.length > 0 ? O() : t(Ue, { entries: et ? [...z, et] : z, className: o, ...P }) : t(Ue, { entries: et ? [...z, et] : z, className: o, ...P }) : E;
};
xa.getInitialData = async function() {
  return ce();
};
const Li = (e, l) => async (r) => {
  l((o) => o.map((u) => u.item.uid === r ? { ...u, error: void 0 } : u));
  const i = e.find((o) => o.item.uid === r);
  if (i) try {
    await oa([{ sku: i.item.sku, parentSku: i.item.topLevelSku, quantity: i.item.quantity, optionsUIDs: i.item.bundleOptionsUIDs || (i.item.selectedOptionsUIDs ? Object.values(i.item.selectedOptionsUIDs) : void 0), enteredOptions: i.item.customizableOptions ? Object.entries(i.item.customizableOptions).map(([o, u]) => ({ uid: o, value: u })) : void 0 }]), l((o) => o.filter((u) => u.item.uid !== r));
  } catch (o) {
    l((u) => u.map((m) => m.item.uid === r ? { ...m, error: (o == null ? void 0 : o.message) || "Failed to restore item." } : m));
  }
}, Ei = (e) => (l) => {
  e((r) => r.filter((i) => i.item.uid !== l));
}, Pi = (e, l) => {
  var r;
  return l.has(e) && ((r = l.get(e)) == null ? void 0 : r.updatedValue) === 0;
}, Ai = (e, l, r, i, o, u) => e ? [] : [{ label: l.undoAction, onClick: () => {
  r(o);
}, "aria-label": `${l.undoAction} remove ${u}` }, { label: l.dismissAction, onClick: () => {
  i(o);
}, "aria-label": `${l.dismissAction} undo for ${u}` }], Mi = (e, l) => () => e(l), Fi = (e, l) => () => e(l), Di = (e, l, r, i, o, u, m) => {
  var c, g;
  const y = Ai(r, i, o, u, e.item.uid, e.item.name), P = Mi(o, e.item.uid), d = Fi(u, e.item.uid);
  return t(at, { name: "UndoBanner", slot: m == null ? void 0 : m.UndoBanner, context: { item: e.item, loading: r, error: e.error, onUndo: P, onDismiss: d }, children: t(be, { type: e.error ? "error" : "info", heading: r ? (c = i.itemBeingRemoved) == null ? void 0 : c.replace("{product}", l.name) : (g = i.itemRemoved) == null ? void 0 : g.replace("{product}", e.item.name), description: e.error || i.itemRemovedDescription, variant: "primary", actionButtonPosition: "bottom", additionalActions: y }, `undo-banner-${e.item.uid}`) }, `undo-banner-${e.item.uid}`);
};
xa.displayName = "CartSummaryTable";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, l) {
  try {
    if (typeof document < "u") {
      const r = l.styleId;
      if (document.querySelector(`style[data-dropin="${r}"]`)) return;
      const i = document.createElement("style");
      for (const u in l.attributes) i.setAttribute(u, l.attributes[u]);
      i.setAttribute("data-dropin", r), i.appendChild(document.createTextNode(e));
      const o = document.querySelector('style[data-dropin="sdk"]');
      if (o) o.after(i);
      else {
        const u = document.querySelector('link[rel="stylesheet"], style');
        u ? u.before(i) : document.head.append(i);
      }
    }
  } catch (r) {
    console.error("dropin-styles (injectCodeFunction)", r);
  }
})('.cart-empty-cart{container-type:inline-size;container-name:cart}.cart-empty-cart__wrapper .dropin-card--secondary{display:grid;grid-auto-rows:min-content;justify-content:center;text-align:center}@container cart (width < 737px){.cart-empty-cart__wrapper .dropin-card{border:unset;border-style:hidden}}.cart-estimate-shipping{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-xsmall);align-items:flex-end;color:var(--color-neutral-800)}.cart-estimate-shipping__label,.cart-estimate-shipping__price{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.cart-estimate-shipping__label--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-700)}.cart-estimate-shipping__price--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.cart-estimate-shipping__price{text-align:right}a.cart-estimate-shippingLink{text-decoration:underline}.cart-estimate-shipping__label--bold,.cart-estimate-shipping__price--bold{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.cart-estimate-shipping__caption{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);grid-column:span 2;color:var(--color-neutral-700)}.cart-estimate-shipping--zip,.cart-estimate-shipping--state{background-color:var(--color-neutral-50)}.cart-estimate-shipping--edit{display:grid;grid-column:1 / span 2;gap:var(--spacing-small);padding-top:var(--spacing-small)}a.cart-estimate-shipping__link{text-decoration:underline}.cart-estimate-shipping--hide{display:none!important}.cart-estimate-shipping--edit button{width:var(--spacing-huge);justify-self:end}.cart-estimate-shipping--edit :is(button,input,select):focus-visible{scroll-margin:var(--spacing-medium)}.cart-estimate-shipping--loading{opacity:.4;pointer-events:none}.cart-mini-cart{display:flex;flex-direction:column;height:100%;padding:var(--spacing-small) var(--spacing-small) var(--spacing-medium);box-sizing:border-box}.cart-mini-cart__empty-cart{width:100%;max-width:800px;height:100%;display:flex;flex-direction:column;justify-content:center;align-self:center}.cart-mini-cart__heading{display:grid;row-gap:var(--spacing-xsmall);font:var(--type-headline-2-default-font);letter-spacing:var(--type-headline-2-default-letter-spacing)}.cart-mini-cart__heading-divider{width:100%;margin:var(--spacing-xxsmall) 0 0 0}.cart-mini-cart__products{flex:1;min-height:0;overflow-y:auto;max-height:100%;padding-bottom:var(--spacing-medium)}.cart-mini-cart__products .cart-cart-summary-list__heading{padding:0}.cart-mini-cart__products .dropin-cart-item__configurations li{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.cart-mini-cart__footer{display:grid;grid-auto-flow:row;gap:var(--spacing-small);padding-top:var(--spacing-small);row-gap:var(--spacing-xsmall)}.cart-mini-cart__footer__estimated-total{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing);display:grid;grid-template:max-content / 1fr auto;gap:var(--spacing-xsmall)}.cart-mini-cart__footer__estimated-total-excluding-taxes{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);display:grid;grid-template:max-content / 1fr auto;gap:var(--spacing-xsmall);color:var(--color-neutral-700)}.cart-mini-cart__productListFooter,.cart-mini-cart__preCheckoutSection{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-800)}.cart-mini-cart__footer__ctas{display:grid;grid-auto-flow:row;gap:var(--spacing-xsmall);padding-top:var(--spacing-small)}.cart-mini-cart__checkout-action{display:grid;gap:var(--spacing-xsmall)}.cart-cart-summary-grid{container-type:inline-size;container-name:cart-summary-grid;max-width:inherit}.cart-cart-summary-grid__content{display:grid;flex-wrap:wrap;gap:var(--spacing-small);grid-template-columns:repeat(6,1fr);margin:auto}.cart-cart-summary-grid__item-container{aspect-ratio:auto 3/4;display:inline-block}.cart-cart-summary-grid__item-container img{height:auto;max-width:100%}.cart-cart-summary-grid__item-container a:focus{display:block}.cart-cart-summary-grid__content--empty{grid-template-columns:repeat(1,1fr)}.cart-cart-summary-grid__empty-cart{align-self:center;justify-self:center;max-width:800px;width:100%}@container cart-summary-grid (width < 360px){.cart-cart-summary-grid__content{grid-template-columns:repeat(4,1fr);gap:var(--spacing-xsmall)}.cart-cart-summary-grid__content--empty{grid-template-columns:repeat(1,1fr)}}.cart-cart-summary-list{container-type:inline-size;container-name:cart-summary-list}.cart-cart-summary-list__background--secondary{background-color:var(--color-neutral-200)}.cart-cart-summary-list__heading{display:grid;row-gap:var(--spacing-xsmall);padding:var(--spacing-medium) 0 0 0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800)}.cart-cart-summary-list__heading--full-width{width:100%}.cart-cart-summary-list__heading-text{margin:0;font:inherit;font-weight:inherit}.dropin-cart-item__title{margin:0}.cart-cart-summary-list__item-title{margin:0;font:inherit;font-weight:inherit}.cart-cart-summary-list__heading-divider{width:100%;margin:var(--spacing-xxsmall) 0 var(--spacing-medium) 0}.cart-cart-summary-list__content{display:grid;grid-template-columns:1fr;padding:0}.cart-cart-summary-list__out-of-stock-message{margin:calc(-1 * var(--spacing-xsmall)) 0 var(--spacing-medium) 0}.cart-cart-summary-list--include-out-of-stock .cart-cart-summary-list__out-of-stock-items{display:none}.cart-cart-summary-list__empty-cart{justify-self:center;align-self:center;width:100%;max-width:800px}.cart-cart-summary-list-footer__action,.cart-cart-summary-list-footer__action:focus .cart-cart-summary-list-footer__action:active,.cart-cart-summary-list-footer__action:link{font:var(--type-body-2-strong-font);margin:0 auto;width:auto;margin-top:var(--spacing-medium);margin-bottom:var(--spacing-medium)}.cart-cart-summary-list-footer__action:hover{text-decoration:underline;text-underline-offset:var(--spacing-xxsmall);background:transparent;color:var(--color-brand-700)}.cart-cart-summary-list-footer__action:visited{background-color:none}.cart-cart-summary-list-accordion{border-left:var(--shape-border-width-2) solid var(--color-neutral-400);border-right:var(--shape-border-width-2) solid var(--color-neutral-400)}.cart-cart-summary-list-accordion__section{margin:var(--spacing-medium)}.dropin-cart-item__quantity{width:fit-content}.cart-cart-summary-list .dropin-cart-list__item:has(.cart-summary-list__banner):after{border:unset}@container cart-summary-list (width >= 768px){.cart-cart-summary-list__out-of-stock-message{margin:calc(-1 * var(--spacing-small)) 0 var(--spacing-xxbig) 0}}@container cart-summary-list (width >= 1024px){.cart-cart-summary-list__content,.cart-cart-summary-list__heading{grid-column:1 / span 8}.cart-cart-summary-list__heading--full-width,.cart-cart-summary-list__content--empty{grid-column:1 / span 12}.cart-cart-summary-list__content{padding:0}}.cart-order-summary{display:grid;position:relative;grid-auto-flow:row;padding:var(--spacing-medium)}.cart-order-summary__primary{background-color:var(--color-neutral-200)}.cart-order-summary__secondary{background-color:var(--color-neutral-50)}.cart-order-summary__content{display:grid;gap:var(--spacing-xsmall);margin-top:var(--spacing-small)}.cart-order-summary__heading{display:grid;font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);color:var(--color-neutral-800);gap:var(--spacing-small)}.cart-order-summary__discount .cart-order-summary__label,.cart-order-summary__discount .cart-order-summary__price,.cart-order-summary__applied-gift-cards .cart-order-summary__price{color:var(--color-warning-800)}.cart-order-summary__coupon__code{display:flex;align-items:center;font:var(--type-details-overline-font);letter-spacing:var(--type-details-overline-letter-spacing);color:var(--color-neutral-700);gap:var(--spacing-xsmall);grid-column:span 2}.cart-order-summary__taxes .dropin-divider:last-child{margin-bottom:0}.cart-order-summary__total{margin-top:var(--spacing-medium)}.cart-order-summary__divider-primary,.cart-order-summary__divider-secondary{width:100%;margin:0}.cart-order-summary__divider-secondary{margin:0}.cart-order-summary__taxEntry.cart-order-summary__entry{margin-top:0}.cart-order-summary__entry,.cart-order-summary__taxEntry{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-xxsmall);align-items:center;color:var(--color-neutral-800)}.cart-order-summary__caption{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);grid-column:span 2;color:var(--color-neutral-700)}.cart-order-summary__primaryAction{margin-top:var(--spacing-small);grid-template-columns:1fr}.cart-order-summary__shipping--edit{display:grid;grid-column:1 / span 2;gap:var(--spacing-small);padding-top:var(--spacing-small);padding-left:var(--spacing-small)}a.cart-order-summary__shippingLink{text-decoration:underline}.cart-order-summary__shipping--hide{display:none!important}.cart-order-summary__shipping--edit button{width:var(--spacing-huge);justify-self:end}.cart-order-summary__shipping--zip,.cart-order-summary__shipping--state{background-color:var(--color-neutral-50)}.cart-order-summary__taxes .dropin-accordion-section__content-container{gap:var(--spacing-small);margin:var(--spacing-small) 0}.cart-order-summary--loading{opacity:.4;pointer-events:none}.cart-order-summary__spinner{margin:0 auto;position:absolute;z-index:999;left:0;right:0;top:calc(50% - (var(--size) / 2));bottom:0}.cart-order-summary__content:has(.cart-order-summary__coupons .dropin-accordion):has(.cart-order-summary__gift-cards .dropin-accordion):has(.cart-order-summary__coupons+.cart-order-summary__gift-cards) .cart-order-summary__coupons .dropin-accordion hr:last-child{opacity:0;margin-bottom:0}.cart-order-summary__content:has(.cart-order-summary__coupons .dropin-accordion):has(.cart-order-summary__gift-cards .dropin-accordion):has(.cart-order-summary__coupons+.cart-order-summary__gift-cards) .cart-order-summary__gift-cards .dropin-accordion hr:first-child{margin-top:calc(var(--spacing-xsmall) * -1)}.cart-order-summary__applied-gift-cards .cart-order-summary__coupon__code,.cart-order-summary__applied-gift-cards .cart-order-summary__caption{display:flex;justify-content:flex-start;align-items:end;gap:0 var(--spacing-xsmall)}.coupon-code-form__action{display:flex}.coupon-code-form__action .dropin-input-container{flex-grow:1;margin-right:var(--spacing-small)}.cart-coupons__accordion-section .dropin-accordion-section__content-container{gap:var(--spacing-small)}.coupon-code-form__codes{background-color:var(--color-neutral-50)}.coupon-code-form__error{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-alert-800);margin-top:calc(var(--spacing-xsmall) * -1)}.coupon-code-form__applied{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;gap:var(--spacing-small)}.coupon-code-form__applied-item{box-sizing:border-box;display:grid;grid-template-columns:1fr auto;gap:0 var(--spacing-small)}.coupon-code-form__applied-item button{all:unset;margin:0;padding:0;display:flex;justify-content:center;align-items:center;background-color:transparent;border-color:transparent;cursor:pointer}.coupon-code-form__applied .dropin-tag-container{background-color:var(--color-neutral-400);color:var(--color-neutral-800);font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing)}.cart-gift-cards .dropin-accordion-section__title-container svg:first-of-type path{transform-box:fill-box;transform-origin:center;transform:translateY(4px)}.cart-order-summary__label,.cart-order-summary__price{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.cart-order-summary__price{text-align:right;text-transform:uppercase}.cart-order-summary__label--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-700)}.cart-order-summary__price--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.cart-order-summary__label--bold,.cart-order-summary__price--bold{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.cart-gift-options-view{position:relative}.cart-gift-options-view textarea{border:var(--shape-border-width-1) solid var(--color-neutral-600)}.cart-gift-options-view.cart-gift-options-view--product .dropin-accordion-section__heading{grid-template-columns:auto 1fr}.cart-gift-options-view.cart-gift-options-view--product .dropin-accordion-section__flex,.cart-gift-options-view.cart-gift-options-view--product .dropin-accordion-section__heading,.cart-gift-options-view.cart-gift-options-view--product .dropin-accordion-section__title-container,.cart-gift-options-view.cart-gift-options-view--product .cart-gift-options-view__icon--success{margin-top:0}.cart-gift-options-view.cart-gift-options-view--order .dropin-accordion-section__title-container,.cart-gift-options-view.cart-gift-options-view--order .dropin-accordion-section__title-container .dropin-accordion-section__title{width:100%}.cart-gift-options-view.cart-gift-options-view--order .dropin-accordion-section__title-container svg{min-width:24px}#cart-gift-options-view.cart-gift-options-view .dropin-accordion-section__content-container{display:block!important;margin-bottom:0;gap:0}.cart-gift-options-view .dropin-accordion-section__heading{align-items:flex-end}.cart-gift-options-view .cart-gift-options-view__top{display:grid;grid-template-columns:1fr;gap:var(--grid-1-gutters) 0;width:100%;align-items:start;margin-top:var(--spacing-small);margin-bottom:var(--spacing-medium)}.cart-gift-options-view .cart-gift-options-view__top.cart-gift-options-view__top--hidden{display:none}.cart-gift-options-view .cart-gift-options-view__field-gift-wrap{margin-top:0;grid-column:1 / -1}.cart-gift-options-view .cart-gift-options-view__top .dropin-field:nth-child(3){grid-column:1 / -1}.cart-gift-options-view .cart-gift-options-view__top .dropin-checkbox__label.dropin-checkbox__label--medium{margin-right:var(--spacing-xsmall)}@media (max-width: 768px){.cart-gift-options-view .cart-gift-options-view__top{display:flex;flex-direction:column}}.cart-gift-options-view .cart-gift-options-view__top .dropin-field:nth-child(2){grid-column:1;margin-top:0}.cart-gift-options-view .cart-gift-options-view__top .dropin-field div{margin-top:0}.cart-gift-options-view .cart-gift-options-view__top button{font:var(--type-body-2-strong-font);padding:0;margin:0;text-decoration:underline;grid-column:2;align-self:start}.cart-gift-options-view .cart-gift-options-view__footer{display:grid;grid-template-columns:1fr 1fr;gap:var(--grid-1-gutters);margin-top:var(--spacing-xsmall)}.cart-gift-options-view .cart-gift-options-view__footer>:first-child{grid-column:span 2;font:var(--type-body-2-strong-font);color:var(--color-neutral-800)}.cart-gift-options-view .cart-gift-options-view__footer>:nth-child(4){grid-column:span 2}.cart-gift-options-view .cart-gift-options-view__footer div>span{font:var(--type-details-caption-1-font);color:var(--color-neutral-800);display:inline-block;margin-bottom:var(--spacing-xsmall)}.cart-gift-options-view .cart-gift-options-view__footer .dropin-textarea__label--floating.dropin-textarea__label--floating--error{padding-top:0;color:var(--color-neutral-700);font:var(--type-body-2-default-font)}.cart-gift-options-view .dropin-textarea__label--floating--text.dropin-textarea__label--floating--error{color:var(--color-alert-800);font:var(--type-details-caption-2-font)}.cart-gift-options-view .dropin-textarea.dropin-textarea--error{border:var(--shape-border-width-2) solid var(--color-alert-500)}.cart-gift-options-view .cart-gift-options-view__modal{width:100%;max-width:735px;margin:auto}.cart-gift-options-view.cart-gift-options-view--product .dropin-modal.dropin-modal--dim{margin:0}.cart-gift-options-view.cart-gift-options-view--product .dropin-modal.dropin-modal--dim .cart-gift-options-view__modal{margin-top:var(--spacing-huge)}.cart-gift-options-view.cart-gift-options-view--product .dropin-modal__header.dropin-modal__header-title{display:grid;grid-template-columns:1fr auto}.cart-gift-options-view__modal .dropin-modal__header-title-content{display:block}.cart-gift-options-view__modal .dropin-modal__header-title-content span,.cart-gift-options-view__modal .dropin-modal__header-title-content h2{display:block;word-wrap:break-word;overflow-wrap:break-word}.cart-gift-options-view__modal .dropin-modal__header-title-content h2:first-child{margin:0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing)}.cart-gift-options-view__modal .dropin-modal__header-title-content .dropin-price{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.cart-gift-options-view__modal .dropin-iconButton{text-align:right}.cart-gift-options-view__modal .dropin-modal__content.dropin-modal__body--centered{margin:0}.cart-gift-options-view__modal .cart-gift-options-view__modal-content span{display:block;text-align:left;font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.cart-gift-options-view__modal .cart-gift-options-view__modal-content span:last-child{margin-top:var(--spacing-xsmall);font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.cart-gift-options-view__modal .dropin-content-grid.cart-gift-options-view__modal-grid{margin-top:0;overflow:auto}.cart-gift-options-view__modal .dropin-content-grid__content{margin-top:0;padding:var(--spacing-xsmall);gap:var(--spacing-xsmall)}.cart-gift-options-view__modal .cart-gift-options-view__modal-content{margin-bottom:var(--spacing-big)}.cart-gift-options-view__modal .dropin-button{width:100%;text-align:center}.cart-gift-options-view__modal button:nth-child(2){margin-bottom:var(--spacing-xsmall)}.cart-gift-options-view .dropin-divider{display:none}.cart-gift-options-view .cart-gift-options-view__footer div{margin:0}.cart-gift-options-view .cart-gift-options-view__icon--success{display:grid;grid-template-columns:auto 1fr;gap:0 var(--spacing-xsmall);align-items:center}.cart-gift-options-view .cart-gift-options-view__icon--success svg{fill:var(--color-informational-800);margin-left:auto}.cart-gift-options-view .cart-gift-options-view__icon--success svg path:first-of-type{stroke:var(--color-informational-800)}.cart-gift-options-view .cart-gift-options-view__icon--success svg path:last-of-type{stroke:var(--color-neutral-50)}.cart-gift-options-view .dropin-textarea{padding:var(--spacing-xxsmall) var(--spacing-small);min-height:40px;height:40px}.cart-gift-options-view textarea:focus::placeholder{color:transparent}.cart-gift-options-view .dropin-textarea:not(:placeholder-shown)+.dropin-textarea__label--floating,.cart-gift-options-view .dropin-textarea:focus+.dropin-textarea__label--floating{display:none;opacity:0;z-index:-1}.cart-gift-options-view .dropin-textarea__label--floating{top:10px}.cart-gift-options-view__spinner{position:absolute;margin:0 auto;z-index:999;left:0;right:0;top:calc(50% - (var(--size) / 2));bottom:0}.cart-gift-options-view--loading{opacity:.4;pointer-events:none}.cart-gift-options-view .cart-gift-options-view--readonly .dropin-card.dropin-card--primary{border-radius:0}.cart-gift-options-view .cart-gift-options-view--readonly .cart-gift-options-readonly__header>span{color:var(--color-neutral-800);font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);cursor:pointer}.cart-gift-options-view.cart-gift-options-view--product .cart-gift-options-view--readonly p{margin:var(--spacing-xxsmall) 0;font:var(--type-body-2-strong-font);color:var(--color-neutral-800)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .dropin-card__content{gap:var(--spacing-small)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__header{display:flex;align-items:center;gap:var(--spacing-xsmall)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__checkboxes{display:grid;grid-template-columns:auto 1fr;gap:0 var(--spacing-xsmall);align-items:center}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly p{margin:0;padding:0}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__checkboxes svg{grid-column:1;grid-row:1;fill:var(--color-positive-800);color:var(--color-neutral-50)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__checkboxes svg>path:first-of-type{stroke:var(--color-positive-800)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__checkboxes p{grid-column:2;grid-row:1;color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__checkboxes p:last-child{grid-column:2;grid-row:2;color:var(--color-neutral-700);font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__form{display:flex;flex-direction:column;gap:var(--spacing-small) 0;font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);color:var(--color-neutral-800)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__form div:nth-child(2){display:grid;grid-template-columns:repeat(2,1fr);gap:var(--grid-1-gutters);justify-content:start}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__form div:nth-child(2) p span{display:block;margin-bottom:var(--spacing-xsmall)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__form div:nth-child(2) p span:first-child{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.cart-gift-options-view.cart-gift-options-view--order .cart-gift-options-view--readonly .cart-gift-options-readonly__form div:last-child p:first-child{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);margin-bottom:var(--spacing-xsmall)}.cart-cart-summary-table{container-type:inline-size;container-name:cart-summary-table;width:100%}.cart-cart-summary-table__header{display:grid;grid-template-columns:3fr 1fr 1fr 1fr;gap:var(--spacing-small);padding:var(--spacing-small);border-bottom:var(--shape-border-width-1) solid var(--color-neutral-300);font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing);color:var(--color-neutral-800)}.cart-cart-summary-table__header-price,.cart-cart-summary-table__header-qty,.cart-cart-summary-table__header-subtotal{text-align:right}.cart-cart-summary-table__body{display:grid}.cart-cart-summary-table__row{display:grid;grid-template-columns:3fr 1fr 1fr 1fr;gap:var(--spacing-small);padding:var(--spacing-small);align-items:start;border-top:solid 1px var(--color-neutral-500)}.cart-cart-summary-table__row--updating{opacity:.4;pointer-events:none;position:relative}.cart-cart-summary-table__row--updating .cart-cart-summary-table__cell-qty-updater input{pointer-events:none}.cart-cart-summary-table__row--error{background-color:var(--color-alert-200)}.cart-cart-summary-table__cell-price,.cart-cart-summary-table__cell-qty,.cart-cart-summary-table__cell-subtotal{text-align:right;justify-self:end}.cart-cart-summary-table__cell-item{container-type:inline-size;container-name:cart-summary-table-item}.cart-cart-summary-table__mobile-label{display:none;font:var(--type-body-2-emphasized-font);margin-right:var(--spacing-small)}.cart-cart-summary-table__item-price{display:flex;flex-direction:column}.cart-cart-summary-table__item-price-tax-label{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);display:inline-block;color:var(--color-neutral-800)}.cart-cart-summary-table__item-subtotal{display:flex;flex-direction:column}.cart-cart-summary-table__item-subtotal-tax-label{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);display:inline-block;color:var(--color-neutral-800)}.cart-cart-summary-table__item-footer{display:grid;grid-template-columns:repeat(12,1fr);grid-column:1 / -1;align-items:start}.cart-cart-summary-table__item-actions{grid-column:11 / -1;justify-self:end}@container cart-summary-table (width < 768px){.cart-cart-summary-table__header{display:none}.cart-cart-summary-table__row{grid-template-columns:repeat(3,1fr);grid-template-areas:"item item item" "price qty subtotal";border-bottom:var(--shape-border-width-1) solid var(--color-neutral-300)}.cart-cart-summary-table__cell-item{grid-area:item}.cart-cart-summary-table__cell-price{grid-area:price;display:grid;text-align:left}.cart-cart-summary-table__cell-qty{grid-area:qty;display:grid;text-align:left}.cart-cart-summary-table__cell-subtotal{grid-area:subtotal;display:grid;text-align:left}.cart-cart-summary-table__mobile-label{display:inline}.cart-cart-summary-table__cell-price,.cart-cart-summary-table__cell-qty,.cart-cart-summary-table__cell-subtotal{justify-self:start;grid-template-rows:auto 1fr;gap:var(--spacing-xsmall);align-items:start}}.cart-cart-summary-table__skeleton{padding:var(--spacing-small)}.cart-cart-summary-table__skeleton .elsie-skeleton-row{margin-bottom:var(--spacing-small)}.cart-cart-summary-table__cell-qty-input{width:60px;padding:8px;border:1px solid var(--color-border, #ccc);border-radius:4px;text-align:center;font-size:var(--font-size-base, 14px);-webkit-appearance:textfield;-moz-appearance:textfield;appearance:textfield}.cart-cart-summary-table__cell-qty-input::-webkit-outer-spin-button,.cart-cart-summary-table__cell-qty-input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.cart-cart-summary-table__cell-qty-updater--disabled{opacity:.5;cursor:not-allowed;background-color:var(--color-disabled-background, #f5f5f5)}.cart-cart-summary-table__cell-qty-updater--error{border:1px solid var(--color-alert-800)}.cart-free-gift-selection__modal{width:min(960px,calc(100vw - 2rem));max-height:90vh;border-radius:12px;background:#fff}.cart-free-gift-selection__modal .dropin-modal__header{padding:1rem 1.5rem;border-bottom:1px solid #eee;font-size:2rem;font-weight:600}.cart-free-gift-selection__error-anchor{scroll-margin-top:.75rem;scroll-margin-bottom:.5rem}.cart-free-gift-selection__modal .dropin-modal__content{padding:1.25rem 1.5rem;max-height:calc(90vh - 120px);overflow-y:auto;overflow-x:hidden}.cart-free-gift-selection__rule{margin-bottom:1.5rem;border:1px solid #e5e7eb;border-radius:10px;padding:.875rem;background:#fcfcfd}.cart-free-gift-selection__rule:last-child{margin-bottom:0}.cart-free-gift-selection__rule-title{font:var( --type-body-1-strong-font, 600 1.125rem/1.4 var(--type-base-font-family, system-ui, sans-serif) );letter-spacing:var(--type-body-1-strong-letter-spacing, .04em);margin:0;color:var(--color-neutral-800, #1a1a1a)}.cart-free-gift-selection__rule-header{margin-bottom:.75rem;display:flex;flex-direction:column;gap:.25rem}.cart-free-gift-selection__rule-meta{margin:0;font-size:.8rem;color:#4b5563}.cart-free-gift-selection__rule-skus{margin:0;font-size:.75rem;color:#6b7280;word-break:break-word}.cart-free-gift-selection__grid{max-width:100%}.cart-free-gift-selection__grid.dropin-content-grid{overflow:visible}.cart-free-gift-selection__grid .dropin-content-grid__content{gap:var(--spacing-small, .75rem)}.cart-free-gift-selection__card-wrap{box-sizing:border-box;min-width:0;width:100%}.cart-free-gift-selection__card.dropin-product-item-card{height:100%;width:100%;min-width:0;border:1px solid #e5e7eb;border-radius:10px;padding:.75rem;background:#fafafa;transition:border-color .2s ease,box-shadow .2s ease;box-sizing:border-box;overflow:hidden}.cart-free-gift-selection__card.dropin-product-item-card:hover{border-color:#93c5fd}.cart-free-gift-selection__card--selected.dropin-product-item-card{border-color:#2563eb;background:#f0f7ff;box-shadow:0 0 0 1px #2563eb}.cart-free-gift-selection__card .dropin-product-item-card__image img{max-width:100%;height:auto}.cart-free-gift-selection__card .dropin-product-item-card__title,.cart-free-gift-selection__card .dropin-product-item-card__sku{min-width:0}.cart-free-gift-selection__card .dropin-product-item-card__action button{width:100%;min-width:0;box-sizing:border-box}.cart-free-gift-selection__image-placeholder{width:100%;aspect-ratio:1;max-width:200px;margin:auto;border-radius:8px;background:linear-gradient(135deg,#f3f4f6,#e5e7eb)}.cart-free-gift-selection__config-wrap{display:flex;flex-direction:column;gap:.5rem;width:100%}.cart-free-gift-selection__config-select{width:100%;border:1px solid #d1d5db;border-radius:6px;padding:.4rem .6rem;font-size:1.5rem;background:#fff}.cart-free-gift-selection__bundle-slot{display:flex;flex-direction:column;gap:.25rem;width:100%}.cart-free-gift-selection__bundle-slot-title{font-size:.8rem;font-weight:600;color:#374151}.cart-free-gift-selection__actions{display:flex;justify-content:flex-end;gap:.75rem;padding:1rem 1.5rem;border-top:1px solid #eee}.cart-free-gift-selection__actions--footer-only{justify-content:flex-end}.cart-free-gift-selection__actions button{background:transparent;border:1px solid #ccc;padding:.6rem 1.2rem;border-radius:999px}@media (max-width: 768px){.cart-free-gift-selection__modal{width:100vw;max-width:100vw;max-height:100vh;border-radius:0}.cart-free-gift-selection__modal .dropin-modal__header{padding:.875rem 1rem}.cart-free-gift-selection__modal .dropin-modal__content{padding:1rem;padding-bottom:max(5rem,calc(env(safe-area-inset-bottom,0px) + 3rem));max-height:calc(100vh - 104px);box-sizing:border-box;overscroll-behavior-y:contain}.cart-free-gift-selection__rules{padding-bottom:.5rem}.cart-free-gift-selection__grid .dropin-content-grid__content{grid-template-columns:1fr!important}.cart-free-gift-selection__card.dropin-product-item-card{padding:.625rem}}.cart-free-gift-selection__trigger{display:flex;flex-direction:column;align-items:flex-start;gap:.5rem}.cart-free-gift-selection__trigger-hint{margin:0;max-width:28rem;color:var(--color-neutral-700, #4a4a4a);font:var( --type-body-2-default-font, 400 .875rem/1.4 var(--type-base-font-family, system-ui, sans-serif) )}.cart-free-gift-selection__added-message{margin-bottom:.75rem;padding:.6rem .75rem;border-radius:6px;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0}@keyframes fadeInScale{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}.cart-cart-summary-table__item{display:grid;grid-template-columns:repeat(3,1fr);align-items:start;gap:var(--spacing-small)}.cart-cart-summary-table__item-details{display:flex;flex-direction:column;gap:var(--spacing-xsmall);grid-column:2 / span 2}.cart-cart-summary-table__item-image-wrapper{grid-column:1 / span 1}.cart-cart-summary-table__item-image-wrapper img{width:100%;height:auto;object-fit:cover}.cart-cart-summary-table__item-name{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.cart-cart-summary-table__item-name a{text-decoration:none;color:inherit}.cart-cart-summary-table__item-name a:hover{text-decoration:underline}.cart-cart-summary-table__sku{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-neutral-700)}.cart-cart-summary-table__item-configurations{padding:0;margin:0;list-style:none;font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing)}.cart-cart-summary-table__item-configuration{display:flex;gap:var(--spacing-xsmall)}.cart-cart-summary-table__item-configuration-label{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-neutral-700)}.cart-cart-summary-table__item-configuration-value{font:var(--type-details-caption-2-font);font-weight:var(--type-details-caption-2-font-weight);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-neutral-800)}.cart-cart-summary-table__item-quantity-alert-text,.cart-cart-summary-table__item-quantity-warning-text{text-align:left;color:var(--color-alert-800);font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.cart-cart-summary-table__item-qty{display:flex;flex-direction:column;gap:var(--spacing-xsmall);align-items:end}@container cart-summary-table (width < 768px){.cart-cart-summary-table__item-qty{align-items:start}}.cart-cart-summary-table__item-quantity-alert-wrapper,.cart-cart-summary-table__item-quantity-warning-wrapper{display:flex;align-items:center;gap:var(--spacing-xsmall);color:var(--color-alert-800)}.cart-cart-summary-table__item-quantity-alert-icon,.cart-cart-summary-table__item-quantity-warning-icon{fill:var(--color-warning-800);color:var(--color-neutral-50);flex-basis:16px}.cart-cart-summary-table__item-remove-button{display:flex;align-items:center;justify-content:center}', { styleId: "Cart" });
export {
  ha as CartSummaryGrid,
  je as CartSummaryList,
  xa as CartSummaryTable,
  wi as Coupons,
  ba as EmptyCart,
  yi as EstimateShipping,
  De as FreeGiftSelection,
  li as FreeGiftSelectionLoader,
  Ii as GiftCards,
  Oi as GiftOptions,
  ya as MiniCart,
  _a as OrderSummary,
  Ft as OrderSummaryLine,
  Fi as createDismissCallback,
  Ei as createDismissHandler,
  Di as createUndoBanner,
  Ai as createUndoBannerActions,
  Mi as createUndoCallback,
  Li as createUndoHandler,
  Pi as getIsUndoBeingRemoved
};
//# sourceMappingURL=containers.js.map
