/*! Copyright 2026 Adobe
All Rights Reserved. */
import { Slot as Rt, classes as O, VComponent as Gt } from "@dropins/tools/lib.js";
import { useText as Y, Text as St } from "@dropins/tools/i18n.js";
import * as u from "@dropins/tools/preact-bundle.js";
import { useState as D, useEffect as q, useCallback as Z, jsx as e, useMemo as J, jsxs as A, Fragment as V, useRef as Yt } from "@dropins/tools/preact-bundle.js";
import { Price as it, Button as Q, Icon as G, LiveRegion as Bt, Image as Kt, Pagination as Xt, Skeleton as Jt, IllustratedMessage as Qt, SkeletonRow as te, InLineAlert as ee } from "@dropins/tools/components.js";
import { events as B } from "@dropins/tools/event-bus.js";
import { removeProductsFromWishlist as jt, s as z, DEFAULT_PAGE_SIZE as st, getWishlistById as Dt, config as ie, findInPersistedAllWishlistItems as se, addProductsToWishlist as oe } from "./api.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ut = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("g", { clipPath: "url(#clip0_102_196)" }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), u.createElement("defs", null, u.createElement("clipPath", { id: "clip0_102_196" }, u.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" })))), $t = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19.734 5.4175C17.8557 3.5275 14.7987 3.5275 12.9105 5.4175L11.9814 6.3475L11.0523 5.4175C9.15407 3.5475 6.09699 3.5775 4.22878 5.4875C2.39054 7.3675 2.39054 10.3675 4.22878 12.2475L5.15789 13.1775L11.9814 20.0075L18.8048 13.1775L19.734 12.2475C21.6221 10.3675 21.6221 7.3075 19.734 5.4175Z", stroke: "currentColor", strokeWidth: 1 })), Ft = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12,20.75h0c-.2,0-.39-.08-.53-.22L3.71,12.77c-2.12-2.16-2.12-5.66,0-7.82,1.04-1.06,2.44-1.66,3.93-1.67h.06c1.47,0,2.85,.57,3.9,1.6l.4,.4,.4-.4c1.05-1.05,2.45-1.63,3.94-1.63h0c1.49,0,2.89,.58,3.94,1.63,.02,.02,.03,.03,.05,.05,1.02,1.05,1.59,2.43,1.59,3.9s-.58,2.89-1.63,3.94l-7.76,7.76c-.14,.14-.33,.22-.53,.22Z", stroke: "currentColor" })), Zt = (t) => u.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1 5H23", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 })), Ht = (t) => u.createElement("svg", { id: "Icon_Warning_Base", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("g", { clipPath: "url(#clip0_841_1324)" }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.9949 2.30237L0.802734 21.6977H23.1977L11.9949 2.30237Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12.4336 10.5504L12.3373 14.4766H11.6632L11.5669 10.5504V9.51273H12.4336V10.5504ZM11.5883 18.2636V17.2687H12.4229V18.2636H11.5883Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), u.createElement("defs", null, u.createElement("clipPath", { id: "clip0_841_1324" }, u.createElement("rect", { width: 24, height: 21, fill: "white", transform: "translate(0 1.5)", strokeWidth: 1 })))), le = ({ className: t, children: i, ctaLinkURL: s, ...o }) => {
  const d = Y({ emptyWishlist: "Wishlist.EmptyWishlist.heading", message: "Wishlist.EmptyWishlist.message", cta: "Wishlist.EmptyWishlist.cta" });
  return e("div", { ...o, className: O(["wishlist-empty-wishlist", t]), children: e(Qt, { className: O(["wishlist-empty-wishlist__wrapper", t]), "data-testid": "wishlist-empty-wishlist", heading: d.emptyWishlist, icon: e(G, { className: "wishlist-empty-wishlist__icon", source: $t }), message: e("p", { children: d.message }), action: s ? e(Q, { "data-testid": "wishlist-empty-wishlist-button", size: "medium", variant: "primary", type: "submit", href: s, children: d.cta }, "routeHome") : void 0 }) });
}, ot = () => e(te, { children: `
      <svg
          width="100%"
          height="100%"
          viewBox="0 0 288 658"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
        >
        <rect x="6" y="24" width="282px" height="480" rx="8" fill="#E8E8E8" />
        <rect x="6" y="522" width="280" height="22" rx="4" fill="#E8E8E8" />
        <rect x="6" y="556" width="132" height="22" rx="4" fill="#E8E8E8" />
        <rect x="6" y="592" width="280" height="48" rx="24" fill="#D9D9D9" />
      </svg>
    ` }), Ot = () => A(Jt, { "data-testid": "wishlist-loader", children: [e(ot, {}), e(ot, {}), e(ot, {})] }), ae = (t) => {
  window.location.href = t;
}, re = (t) => {
  window.location.replace(t);
}, ne = () => window.location.href, qt = ({ item: t, wishlistId: i, scope: s, getProductData: o, getRefinedProduct: d, moveProdToCart: m, routeProdDetailPage: v, imageNode: W, slots: N }) => {
  const [r, c] = D(null);
  q(() => {
    let p = !1;
    async function y() {
      var I;
      try {
        let _;
        d && ((I = t == null ? void 0 : t.selectedOptions) == null ? void 0 : I.length) > 0 ? _ = await d(t.product.sku, t.selectedOptions.map((h) => h.uid)) : _ = o ? await o(t == null ? void 0 : t.product.sku) : t == null ? void 0 : t.product, p || c(_);
      } catch (_) {
        p || console.error("Failed to fetch product data:", _);
      }
    }
    return y(), () => {
      p = !0;
    };
  }, [t, o, d]);
  const n = Z(async (p = !0) => {
    try {
      return await jt([t], i, { scope: s }), console.log(`Product ${r == null ? void 0 : r.sku} removed from wishlist!`), p && B.emit("wishlist/alert", { action: "remove", item: { ...t, product: r } }, { scope: s }), !0;
    } catch (y) {
      return console.error(`Product ${r.sku} could not be removed from wishlist`, y), !1;
    }
  }, [t, r, i, s]), f = Z(async () => {
    var p;
    try {
      await m([{ sku: r.sku, quantity: 1, optionsUIDs: (p = t.selectedOptions) == null ? void 0 : p.map((I) => I.uid), enteredOptions: t.enteredOptions }]), console.log(`Product ${r.sku} successfully moved to cart 🛒`);
      const y = await n(!1);
      return B.emit("wishlist/alert", { action: "move", item: { ...t, product: r } }, { scope: s }), y;
    } catch (y) {
      return console.error("Could not move product to cart: ", y), y.toString().includes("You need to choose options for your item.") && re(v(r)), !1;
    }
  }, [r, t, s, m, v, n]);
  return !r || !t ? null : e(de, { item: { ...t, product: r }, onCartActionButtonClick: f, onTrashButtonClick: n, routeProdDetailPage: v, imageNode: W, slots: N });
};
qt.displayName = "WishlistItem";
const ce = ({ className: t, wishlistData: i, wishlistAlert: s, isLoggedIn: o, isLoading: d, moveProdToCart: m, getProductData: v, getRefinedProduct: W, routeEmptyWishlistCTA: N, onLoginClick: r, routeProdDetailPage: c, wishlistId: n, scope: f, pageInfo: p, activePage: y = 1, onPageChange: I, isLoadingPage: _ = !1, slots: h, ...S }) => {
  const [k, H] = D(s), C = Y({ wishlistHeading: "Wishlist.Wishlist.heading", wishlistLoadingHeading: "Wishlist.Wishlist.loading", alertMoveMessage: "Wishlist.Alert.moveToCart.message", alertRemoveMessage: "Wishlist.Alert.removeProduct.message" }), g = (() => {
    var E, M;
    if (!k) return "";
    const T = k.props, a = T == null ? void 0 : T.action;
    if (a === "move" || a === "remove") {
      const b = ((M = (E = T == null ? void 0 : T.item) == null ? void 0 : E.product) == null ? void 0 : M.name) || "";
      return (a === "move" ? C.alertMoveMessage : C.alertRemoveMessage).replace("{product}", b);
    }
    return "";
  })(), x = J(() => {
    var E;
    return ((E = i == null ? void 0 : i.items) == null ? void 0 : E.length) > 0 ? i.items.map((M) => e(qt, { item: M, wishlistId: n, scope: f, getProductData: v, getRefinedProduct: W, moveProdToCart: m, routeProdDetailPage: c, imageNode: h != null && h.image ? ({ defaultImageProps: T }) => e(Rt, { name: "image", slot: h.image, context: { defaultImageProps: T, item: M } }) : void 0, slots: { actions: h == null ? void 0 : h.actions } }, M.id)) : null;
  }, [i, n, f, m, v, W, c, h == null ? void 0 : h.image, h == null ? void 0 : h.actions]);
  q(() => {
    if (s) {
      H(s);
      const E = setTimeout(() => {
        H(null);
      }, 5e3);
      return () => clearTimeout(E);
    }
  }, [s]);
  const w = J(() => k ? e(Gt, { node: k, className: "wishlist-wishlist__alert" }) : null, [k]), U = () => A(V, { children: [e("div", { className: "wishlist-wishlist__heading", "data-testid": "wishlist-heading-wrapper", children: e("h1", { className: "wishlist-wishlist__heading-text", "data-testid": "loader-wishlist-heading", children: C.wishlistLoadingHeading }) }), e(Ot, {})] }), $ = () => x ? A(V, { children: [K, _ ? e(Ot, {}) : e("div", { className: "wishlist-wishlist__content", children: x }), p && (p.totalPages ?? 0) > 1 && e("div", { className: "wishlist-wishlist__pagination", children: e(Xt, { currentPage: y, totalPages: p.totalPages, onChange: I }) })] }) : e("div", { className: O(["wishlist-wishlist__content", "wishlist-wishlist__content--empty"]), children: A("div", { children: [e(le, { "data-testid": "empty-wishlist", ctaLinkURL: N == null ? void 0 : N() }), !o && e(me, { onLoginClick: r })] }) }), K = J(() => {
    var E;
    return x ? e("div", { className: "wishlist-wishlist__heading", "data-testid": "wishlist-heading-wrapper", children: e("h1", { className: "wishlist-wishlist__heading-text", "data-testid": "default-wishlist-heading", children: (E = C.wishlistHeading) == null ? void 0 : E.split(" {count}").map((M, T) => {
      var a;
      return A(V, { children: [M, T === 0 && e("span", { className: "wishlist-wishlist__heading-count", "data-testid": "wishlist-heading-count", children: `${i == null ? void 0 : i.items_count} products` })] }, ((a = i == null ? void 0 : i.id) == null ? void 0 : a.toString()) + T);
    }) }) }) : null;
  }, [C, x, i]);
  return A("div", { ...S, className: O(["wishlist-wishlist", t]), children: [e(Bt, { message: g }), e("div", { className: "wishlist-wishlist__alert-region", children: w }), e(Bt, { message: _ ? C.wishlistLoadingHeading : "" }), d ? U() : $()] });
}, de = ({ className: t, item: i, onCartActionButtonClick: s, onTrashButtonClick: o, routeProdDetailPage: d, imageNode: m, slots: v, showStockStatus: W, ...N }) => {
  var r, c, n, f, p, y, I, _, h, S;
  const k = Y({ cartActionBtn: "ProductItem.CartActionButton", cartActionBtnAriaLabel: "ProductItem.CartActionButtonAriaLabel", trashActionBtn: "ProductItem.TrashActionButton", customizeActionBtn: "ProductItem.CustomizeActionButton", stockStatusInStock: "ProductItem.InStock", stockStatusOutOfStock: "ProductItem.OutOfStock", customizeActionBtnAriaLabel: "ProductItem.CustomizeActionButtonAriaLabel" }), H = ((r = i.product) == null ? void 0 : r.name) ?? "", C = k.trashActionBtn.replace("{productName}", H), g = k.cartActionBtnAriaLabel.replace("{productName}", H), x = k.customizeActionBtnAriaLabel.replace("{productName}", H), w = ((f = (n = (c = i.product) == null ? void 0 : c.prices) == null ? void 0 : n.final) == null ? void 0 : f.amount) < ((I = (y = (p = i.product) == null ? void 0 : p.prices) == null ? void 0 : y.regular) == null ? void 0 : I.amount), U = () => {
    var l, P;
    return e("a", { className: "wishlist-product-item-image", "data-testid": "wishlist-product-item-image", href: d(i.product), "aria-label": (l = i.product) == null ? void 0 : l.name, children: e(ue, { images: ((P = i.product) == null ? void 0 : P.images) ?? [], imageNode: m }) });
  }, $ = () => {
    var l, P, j, et, lt, at, rt, nt, ct, dt, ut, mt, ht, pt, gt, vt, wt, ft, yt, _t, kt, xt, bt, Pt, Wt, Ct, Et, Lt, At, Nt, It, Mt, Tt;
    return ((j = (P = (l = i.product) == null ? void 0 : l.prices) == null ? void 0 : P.final) == null ? void 0 : j.amount) === void 0 && ((at = (lt = (et = i.product) == null ? void 0 : et.prices) == null ? void 0 : lt.final) == null ? void 0 : at.maximumAmount) !== void 0 && ((ct = (nt = (rt = i.product) == null ? void 0 : rt.prices) == null ? void 0 : nt.final) == null ? void 0 : ct.maximumAmount) > 0 ? A(V, { children: [e(it, { className: "wishlist-product-item-price", "data-testid": "wishlist-product-item-price", amount: (mt = (ut = (dt = i.product) == null ? void 0 : dt.prices) == null ? void 0 : ut.final) == null ? void 0 : mt.minimumAmount, currency: (gt = (pt = (ht = i.product) == null ? void 0 : ht.prices) == null ? void 0 : pt.final) == null ? void 0 : gt.currency }), "-", e(it, { className: "wishlist-product-item-price", "data-testid": "wishlist-product-item-price", amount: (ft = (wt = (vt = i.product) == null ? void 0 : vt.prices) == null ? void 0 : wt.final) == null ? void 0 : ft.maximumAmount, currency: (kt = (_t = (yt = i.product) == null ? void 0 : yt.prices) == null ? void 0 : _t.final) == null ? void 0 : kt.currency })] }) : A(V, { children: [e(it, { className: O(["wishlist-product-item-price", w ? "strikethrough" : ""]), "data-testid": "wishlist-product-item-price", amount: (Pt = (bt = (xt = i.product) == null ? void 0 : xt.prices) == null ? void 0 : bt.regular) == null ? void 0 : Pt.amount, currency: (Et = (Ct = (Wt = i.product) == null ? void 0 : Wt.prices) == null ? void 0 : Ct.regular) == null ? void 0 : Et.currency }), w && e(it, { className: "wishlist-product-item-discounted-price", "data-testid": "wishlist-product-item-discounted-price", amount: (Nt = (At = (Lt = i.product) == null ? void 0 : Lt.prices) == null ? void 0 : At.final) == null ? void 0 : Nt.amount, currency: (Tt = (Mt = (It = i.product) == null ? void 0 : It.prices) == null ? void 0 : Mt.final) == null ? void 0 : Tt.currency })] });
  }, K = () => {
    var l;
    return W ? e("span", { className: "wishlist-product-item-stock-status", "data-testid": "wishlist-product-item-stock-status", children: (l = i.product) != null && l.inStock ? k.stockStatusInStock : k.stockStatusOutOfStock }) : null;
  }, E = () => e(Q, { "data-testid": "wishlist-product-item-remove-button", className: "wishlist-product-item-button__remove", variant: "tertiary", onClick: () => o == null ? void 0 : o(), icon: e(G, { source: Zt, size: "24", stroke: "2", viewBox: "0 0 24 24", "aria-label": C }) }), M = () => a() ? X() : tt(), T = (h = (_ = i.product) == null ? void 0 : _.attributes) == null ? void 0 : h.some((l) => l.id === "ac_giftcard"), a = () => {
    var l;
    return T ? !1 : ((l = i.product) == null ? void 0 : l.productType) === "complex" ? F() : !0;
  }, b = J(() => {
    var l;
    return ((l = i.selectedOptions) == null ? void 0 : l.map((P) => P.uid)) || [];
  }, [i.selectedOptions]), L = J(() => {
    const l = i.product.options || [], P = l.filter((j) => j.required);
    return P.length === 0 ? l : P;
  }, [i.product.options]), F = () => L.every((l) => {
    var P;
    return (P = l.items) == null ? void 0 : P.some((j) => b.includes(j.id));
  }), R = () => b.length === 0 ? null : e("div", { className: "wishlist-product-item-options", children: L.map((l) => {
    var P;
    const j = (P = l.items) == null ? void 0 : P.find((et) => b.includes(et.id));
    return j ? A("div", { className: "wishlist-product-item-option", children: [A("span", { className: "wishlist-product-item-option__attribute", children: [l.label, ":"] }), " ", e("span", { className: "wishlist-product-item-option__label", children: j.label })] }, l.type) : null;
  }) }), X = () => {
    var l;
    return e(Q, { "data-testid": "wishlist-product-item-move-to-cart-button", size: "medium", type: "submit", icon: e(G, { source: Ut }), disabled: !((l = i.product) != null && l.inStock), "aria-label": g, onClick: () => s == null ? void 0 : s(), children: k.cartActionBtn });
  }, tt = () => e(Q, { "data-testid": "wishlist-product-item-customize-button", size: "medium", type: "submit", "aria-label": x, href: d(i.product), children: k.customizeActionBtn });
  return e("div", { ...N, className: O(["wishlist-product-item", t]), children: A("div", { className: "wishlist-product-item__content", children: [U(), A("div", { className: "wishlist-product-item__title", "data-testid": "wishlist-product-item-header", children: [e("a", { className: "wishlist-product-item-name", "data-testid": "wishlist-product-item-name", href: d(i.product), children: (S = i.product) == null ? void 0 : S.name }), E(), $()] }), K(), R(), e(Rt, { name: "actions", slot: v == null ? void 0 : v.actions, context: { item: i, onMoveToCart: s, onRemove: o }, children: M() })] }) });
}, ue = ({ className: t, children: i, images: s, imageNode: o, ...d }) => {
  const [m, v] = D(0), W = Y({ slideLabel: "ImageCarousel.slideLabel" }), N = (s == null ? void 0 : s.length) ?? 0;
  return A(V, { children: [e("div", { ...d, className: O(["image-carousel", t]), children: e("div", { className: O(["overflow-hidden relative max-w-[200px]", t]), children: s == null ? void 0 : s.map((r, c) => {
    const n = { className: O(["image-carousel-image", t]), src: r.url, alt: r.label };
    return c !== m ? null : typeof o == "function" ? o({ defaultImageProps: n }) : o || e(Kt, { ...n });
  }) }) }), N > 1 && e("div", { className: O(["absolute", "image-switcher-area"]), role: "tablist", "aria-label": W.slideLabel, children: s == null ? void 0 : s.map((r, c) => {
    const n = m === c;
    return e("button", { type: "button", role: "tab", className: O(["image-switcher", n ? "image-switcher-active" : "image-switcher-inactive"]), "aria-label": `${r.label || `Image ${c + 1}`} (${c + 1}/${N})`, "aria-selected": n, tabIndex: n ? 0 : -1, onClick: (f) => {
      v(c), f.preventDefault(), f.stopPropagation();
    } }, c);
  }) })] });
}, me = ({ onLoginClick: t }) => A("div", { className: "wishlist-login__sign-in", children: [e("a", { "data-testid": "log-in-link", className: "wishlist-login__link", href: "", rel: "noreferrer", onClick: t, role: "button", children: e(St, { id: "Wishlist.Login.logIn" }) }), e(St, { id: "Wishlist.Login.sync" })] });
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Vt = ({ action: t, item: i, routeToWishlist: s }) => {
  const o = Y({ addHeading: "Wishlist.Alert.addProduct.heading", addMessage: "Wishlist.Alert.addProduct.message", removeHeading: "Wishlist.Alert.removeProduct.heading", removeMessage: "Wishlist.Alert.removeProduct.message", moveHeading: "Wishlist.Alert.moveToCart.heading", moveMessage: "Wishlist.Alert.moveToCart.message", viewWishlist: "Wishlist.Alert.viewWishlist", addErrorHeading: "Wishlist.Alert.addError.heading", addErrorMessage: "Wishlist.Alert.addError.message", removeErrorHeading: "Wishlist.Alert.removeError.heading", removeErrorMessage: "Wishlist.Alert.removeError.message" });
  if (!t) return null;
  const d = o[`${t}Heading`], m = o[`${t}Message`], v = { add: Ft, remove: Zt, move: Ut, addError: Ht, removeError: Ht }, W = s ? ne().includes(s) : !1;
  return e(ee, { "data-testid": "wishlist-alert", heading: d, description: i ? m.replace("{product}", i.product.name) : m, type: t === "addError" || t === "removeError" ? "warning" : "success", icon: e(G, { source: v[t], size: "16" }), actionButtonPosition: "top", additionalActions: !W && s ? [{ label: o.viewWishlist, onClick: () => {
    ae(s);
  } }] : void 0 });
};
Vt.displayName = "WishlistAlert";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const he = ({ routeEmptyWishlistCTA: t, routeToWishlist: i, wishlistId: s, scope: o, moveProdToCart: d, routeProdDetailPage: m, getProductData: v, getRefinedProduct: W, slots: N, ...r }) => {
  const c = z.pageSize ?? st, [n, f] = D(null), [p, y] = D(z.authenticated), [I, _] = D(z.isLoading ?? !1), [h, S] = D(1), [k, H] = D(!1), C = Yt(!1), g = (a) => {
    C.current = a, H(a);
  }, x = (a) => y(a), w = Z((a) => s ? Dt(s, c, a, { scope: o }) : Dt(z.wishlistId, c, a), [s, o, c]), U = Z(async (a) => {
    if (!C.current && !(!s && !z.wishlistId)) {
      g(!0);
      try {
        await w(a);
      } finally {
        g(!1);
      }
    }
  }, [s, w]), [$, K] = D(null), E = Z((a) => {
    const { action: b, item: L } = a;
    K(e(Vt, { action: b, item: L, routeToWishlist: i })), s && z.authenticated && w(h);
  }, [i, s, h, w]), M = Z((a) => {
    var b, L, F;
    const R = a, X = ((b = R == null ? void 0 : R.page_info) == null ? void 0 : b.currentPage) ?? null, tt = ((L = R == null ? void 0 : R.page_info) == null ? void 0 : L.totalPages) ?? 0;
    if (!((((F = R == null ? void 0 : R.items) == null ? void 0 : F.length) ?? 0) > 0) && tt >= 1 && X != null && X > 1 && (s || z.wishlistId) && !C.current) {
      const l = Math.min(X - 1, tt);
      g(!0), w(l).finally(() => {
        g(!1);
      });
      return;
    }
    f(R), _(!1);
  }, [s, w]);
  q(() => {
    var a, b;
    if (!n) return;
    const L = ((a = n.page_info) == null ? void 0 : a.currentPage) ?? null;
    L != null && (S(L), s || (z.currentPage = L)), g(!1);
    const F = (b = n.page_info) == null ? void 0 : b.pageSize;
    c !== st && F != null && F !== c && !C.current && (s || z.wishlistId) && (g(!0), w(1).finally(() => g(!1)));
  }, [n, c, s, w]), q(() => {
    const a = B.on("authenticated", x), b = B.on("wishlist/alert", E, { scope: o }), L = B.on("wishlist/data", M, { eager: !0, scope: o });
    return () => {
      a == null || a.off(), L == null || L.off(), b == null || b.off();
    };
  }, [E, M, o]), q(() => {
    s && (_(!0), Promise.resolve(w(1)).catch(() => {
    }).finally(() => _(!1)));
  }, [s, w]);
  const T = c !== st ? n == null ? void 0 : n.page_info : void 0;
  return e(ce, { ...r, wishlistData: n, wishlistAlert: $, routeEmptyWishlistCTA: t, wishlistId: s, scope: o, moveProdToCart: d, getProductData: v, getRefinedProduct: W, isLoggedIn: p, isLoading: I, routeProdDetailPage: m, pageInfo: T, activePage: h, onPageChange: U, isLoadingPage: k, slots: N });
};
he.displayName = "Wishlist";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const zt = (t) => t.optionUIDs ?? (t.selectedOptionsUIDs ? Object.values(t.selectedOptionsUIDs) : void 0) ?? (t.bundleOptionsUIDs ? Object.values(t.bundleOptionsUIDs) : void 0), pe = ({ product: t, iconWishlisted: i, iconToWishlist: s, size: o, variant: d, disabled: m, labelToWishlist: v, labelWishlisted: W, onClick: N, removeProdFromCart: r }) => {
  const [c, n] = D(z.authenticated), [f, p] = D(!1), [y, I] = D(null), { isGuestWishlistEnabled: _ } = ie.getConfig(), h = Y({ addToWishlist: "Wishlist.Wishlist.ariaLabelAddToWishlist", removeFromWishlist: "Wishlist.Wishlist.ariaLabelRemoveFromWishlist", ariaLabelWithVisibleLabel: "Wishlist.Wishlist.ariaLabelWithVisibleLabel" }), S = Z(() => {
    const g = se(t.topLevelSku ?? t.sku, zt(t));
    I(g ?? null), p(!!g);
  }, [t]);
  q(() => {
    S();
  }, [S]), q(() => {
    const g = ($) => n($), x = B.on("authenticated", g), w = B.on("wishlist/data", S), U = B.on("wishlist/allItems", S);
    return () => {
      x == null || x.off(), w == null || w.off(), U == null || U.off();
    };
  }, [S]);
  const k = async () => {
    var g;
    if (f) {
      try {
        await jt([y]);
      } catch {
        return B.emit("wishlist/alert", { action: "removeError", item: { product: t } }), null;
      }
      p(!1), B.emit("wishlist/alert", { action: "remove", item: { product: t } });
    } else {
      try {
        await oe([{ sku: t.topLevelSku ?? t.sku, quantity: 1, optionsUIDs: zt(t), enteredOptions: (g = t.options) != null && g.items ? t.options.items.filter((x) => x.selected).map((x) => ({ uid: x.uid, value: x.value })) : void 0 }]);
      } catch {
        return B.emit("wishlist/alert", { action: "addError", item: { product: t } }), null;
      }
      p(!0), B.emit("wishlist/alert", { action: "add", item: { product: t } }), r && await r([{ uid: t.uid, quantity: 0 }]);
    }
  };
  if (!c && !_) return null;
  const H = f ? W : v, C = H ? h.ariaLabelWithVisibleLabel.replace("{LABEL}", H).replace("{PRODUCT_NAME}", t == null ? void 0 : t.name) : (f ? h.removeFromWishlist : h.addToWishlist).replace("{PRODUCT_NAME}", t == null ? void 0 : t.name);
  return e(Q, { active: f, "aria-label": C, "data-testid": "wishlist-toggle", size: o ?? "medium", variant: d ?? "tertiary", disabled: m, icon: e(G, { source: s ?? $t }), activeIcon: e(G, { source: i ?? Ft }), onClick: N ?? k, children: v, activeChildren: W });
};
pe.displayName = "WishlistToggle";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(t, i) {
  try {
    if (typeof document < "u") {
      const s = i.styleId;
      if (document.querySelector(`style[data-dropin="${s}"]`)) return;
      const o = document.createElement("style");
      for (const m in i.attributes) o.setAttribute(m, i.attributes[m]);
      o.setAttribute("data-dropin", s), o.appendChild(document.createTextNode(t));
      const d = document.querySelector('style[data-dropin="sdk"]');
      if (d) d.after(o);
      else {
        const m = document.querySelector('link[rel="stylesheet"], style');
        m ? m.before(o) : document.head.append(o);
      }
    }
  } catch (s) {
    console.error("dropin-styles (injectCodeFunction)", s);
  }
})(".wishlist-empty-wishlist{container-type:inline-size;container-name:wishlist}.wishlist-empty-wishlist__wrapper .dropin-card--secondary{display:grid;grid-auto-rows:min-content;justify-content:center;text-align:center;border:unset}.wishlist-empty-wishlist .dropin-illustrated-message__heading{font:var(--type-headline-1-font)}.wishlist-empty-wishlist .dropin-illustrated-message__message{font:var(--type-body-1-default-font)}@container wishlist (width < 737px){.wishlist-empty-wishlist__wrapper .dropin-card{border:unset;border-style:hidden}}.wishlist-wishlist{container-type:inline-size;container-name:wishlist-grid;max-width:inherit}.wishlist-wishlist__content{display:grid;gap:var(--spacing-medium);margin:auto;padding:var(--spacing-medium) 0}.wishlist-wishlist__heading{color:var(--color-neutral-800);display:grid;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);padding:var(--spacing-small) 0;row-gap:var(--spacing-xsmall)}.wishlist-wishlist__heading-text{font-size:inherit;font-weight:inherit;margin:0;line-height:inherit}.wishlist-wishlist__heading-count{color:var(--color-neutral-700);margin-left:var(--spacing-xxsmall);letter-spacing:normal;font:var(--type-details-caption-2-font)}.wishlist-wishlist__content.wishlist-wishlist__content--empty{border:var(--shape-border-width-2) solid var(--color-neutral-400);border-radius:var(--shape-border-radius-2);grid-template-columns:repeat(1,1fr);padding:var(--spacing-xxbig);margin:var(--spacing-xxbig) auto}@media only screen and (max-width: 480px){.dropin-skeleton{grid-template-columns:repeat(1,1fr)}.dropin-skeleton-row:nth-child(n+2){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(1,1fr);min-height:320px}}@media only screen and (min-width: 480px) and (max-width: 600px){.dropin-skeleton{grid-template-columns:repeat(2,1fr)}.dropin-skeleton-row:nth-child(n+3){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(2,1fr);min-height:320px}}@media only screen and (min-width: 600px){.dropin-skeleton{grid-template-columns:repeat(2,1fr)}.dropin-skeleton-row:nth-child(n+3){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(2,1fr);min-height:320px}}@media only screen and (min-width: 768px){.dropin-skeleton{grid-template-columns:repeat(3,1fr)}.dropin-skeleton-row:nth-child(n){display:block}.wishlist-wishlist__content{grid-template-columns:repeat(3,1fr);min-height:480px}}.wishlist-wishlist__pagination{display:flex;justify-content:center;padding:var(--spacing-small) 0}.wishlist-product-item{background-color:var(--color-neutral-50);margin-bottom:var(--spacing-small)}.wishlist-product-item__content{display:flex;flex-direction:column;gap:var(--spacing-small)}.wishlist-product-item__content .wishlist-product-item-image{background:var(--color-neutral-200);height:100%;padding:0;position:relative;width:100%}.wishlist-product-item__content .wishlist-product-item__title{color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin:0;position:relative}.wishlist-product-item-name{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:85%}a.wishlist-product-item-name:active,a.wishlist-product-item-name:hover,a.wishlist-product-item-name{color:var(--color-neutral-800);cursor:pointer;font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing)}.wishlist-product-item__content .wishlist-product-item-button__remove{position:absolute;right:0;top:-10px}.wishlist-product-item__content .wishlist-product-item-options{font:var(--type-body-2-default-font)}.wishlist-product-item__content .wishlist-product-item-option__attribute{text-transform:capitalize}.wishlist-product-item__content .wishlist-product-item-option__label{font:var(--type-body-2-strong-font)}.wishlist-product-item__content .wishlist-product-item-price{display:inline;font:var(--type-body-2-default-font)}.strikethrough{text-decoration:line-through}.wishlist-product-item__content .wishlist-product-item-discounted-price{display:inline;margin-left:var(--spacing-xsmall);color:var(--color-alert-800)}.wishlist-product-item-move-to-cart{display:grid;grid-area:product-add-to-cart;justify-content:end}.wishlist-product-item-tax{color:var(--color-neutral-500)}.wishlist-product-item-tax span{margin-right:var(--spacing-xsmall)}.wishlist-product-item-stock-status{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.wishlist-product-item__content [data-slot=actions]{display:contents}.image-carousel{display:flex;flex-direction:column;gap:var(--spacing-medium);padding:var(--spacing-medium)}.image-carousel .image-carousel-image{object-fit:contain;padding:var(--spacing-xxsmall) 0;width:100%}.image-switcher-area{bottom:var(--spacing-xxsmall);left:0;margin-top:var(--spacing-small);position:absolute;text-align:center;width:100%}.image-switcher-area .image-switcher{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;border-radius:50%;display:inline-flex;height:var(--spacing-xsmall);margin:0 var(--spacing-xxsmall);min-height:var(--spacing-medium);min-width:var(--spacing-medium);padding:var(--spacing-xsmall);width:var(--spacing-xsmall);background-clip:content-box}.image-switcher-area .image-switcher:focus-visible{outline:var(--shape-border-width-3) solid var(--color-brand-700);outline-offset:2px}.image-switcher-area .image-switcher-active{background-color:var(--color-neutral-900);border:var(--shape-border-width-1) solid var(--color-brand-700)}.image-switcher-area .image-switcher-inactive{background-color:var(--color-neutral-700);border:var(--shape-border-width-1) solid var(--color-neutral-700)}@media only screen and (max-width: 480px){.image-carousel{gap:var(--spacing-xxsmall)}.image-carousel .image-carousel-image{height:250px}}@media only screen and (min-width: 480px) and (max-width: 600px){.image-carousel{gap:var(--spacing-xsmall)}.image-carousel .image-carousel-image{height:300px}}@media only screen and (min-width: 600px){.image-carousel{gap:var(--spacing-xsmall)}.image-carousel .image-carousel-image{height:300px}}@media only screen and (min-width: 768px){.image-carousel{gap:var(--spacing-small)}.image-carousel .image-carousel-image{height:350px}}@media only screen and (min-width: 1024px){.image-carousel{gap:var(--spacing-medium)}.image-carousel .image-carousel-image{height:400px}}.wishlist-login__sign-in{grid-column-start:2;color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin-top:var(--spacing-xxsmall);text-align:center}a.wishlist-login__link{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-left:var(--spacing-xxsmall);text-decoration:underline;text-decoration-thickness:auto;text-underline-offset:auto;color:var(--color-neutral-800)}a.wishlist-login__link:hover{color:var(--color-neutral-800);text-decoration:underline;text-decoration-thickness:auto;text-underline-offset:auto}", { styleId: "Wishlist" });
export {
  he as Wishlist,
  Vt as WishlistAlert,
  qt as WishlistItem,
  pe as WishlistToggle
};
//# sourceMappingURL=containers.js.map
