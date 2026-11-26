/*! Copyright 2026 Adobe
All Rights Reserved. */
import { Slot as Rt, classes as O, VComponent as Gt } from "@dropins/tools/lib.js";
import { useText as Y, Text as St } from "@dropins/tools/i18n.js";
import * as u from "@dropins/tools/preact-bundle.js";
import { useState as D, useEffect as q, useCallback as Z, jsx as e, useMemo as J, jsxs as L, Fragment as V, useRef as Yt } from "@dropins/tools/preact-bundle.js";
import { Price as it, Button as Q, Icon as G, LiveRegion as Bt, Image as Kt, Pagination as Xt, Skeleton as Jt, IllustratedMessage as Qt, SkeletonRow as te, InLineAlert as ee } from "@dropins/tools/components.js";
import { events as B } from "@dropins/tools/event-bus.js";
import { removeProductsFromWishlist as jt, s as z, DEFAULT_PAGE_SIZE as st, getWishlistById as Dt, config as ie, findInPersistedAllWishlistItems as se, addProductsToWishlist as le } from "./api.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ut = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("g", { clipPath: "url(#clip0_102_196)" }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), u.createElement("defs", null, u.createElement("clipPath", { id: "clip0_102_196" }, u.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" })))), $t = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19.734 5.4175C17.8557 3.5275 14.7987 3.5275 12.9105 5.4175L11.9814 6.3475L11.0523 5.4175C9.15407 3.5475 6.09699 3.5775 4.22878 5.4875C2.39054 7.3675 2.39054 10.3675 4.22878 12.2475L5.15789 13.1775L11.9814 20.0075L18.8048 13.1775L19.734 12.2475C21.6221 10.3675 21.6221 7.3075 19.734 5.4175Z", stroke: "currentColor", strokeWidth: 1 })), Ft = (t) => u.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12,20.75h0c-.2,0-.39-.08-.53-.22L3.71,12.77c-2.12-2.16-2.12-5.66,0-7.82,1.04-1.06,2.44-1.66,3.93-1.67h.06c1.47,0,2.85,.57,3.9,1.6l.4,.4,.4-.4c1.05-1.05,2.45-1.63,3.94-1.63h0c1.49,0,2.89,.58,3.94,1.63,.02,.02,.03,.03,.05,.05,1.02,1.05,1.59,2.43,1.59,3.9s-.58,2.89-1.63,3.94l-7.76,7.76c-.14,.14-.33,.22-.53,.22Z", stroke: "currentColor" })), Zt = (t) => u.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...t }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1 5H23", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 })), Ht = (t) => u.createElement("svg", { id: "Icon_Warning_Base", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...t }, u.createElement("g", { clipPath: "url(#clip0_841_1324)" }, u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.9949 2.30237L0.802734 21.6977H23.1977L11.9949 2.30237Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), u.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12.4336 10.5504L12.3373 14.4766H11.6632L11.5669 10.5504V9.51273H12.4336V10.5504ZM11.5883 18.2636V17.2687H12.4229V18.2636H11.5883Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), u.createElement("defs", null, u.createElement("clipPath", { id: "clip0_841_1324" }, u.createElement("rect", { width: 24, height: 21, fill: "white", transform: "translate(0 1.5)", strokeWidth: 1 })))), oe = ({ className: t, children: i, ctaLinkURL: s, ...l }) => {
  const r = Y({ emptyWishlist: "Wishlist.EmptyWishlist.heading", message: "Wishlist.EmptyWishlist.message", cta: "Wishlist.EmptyWishlist.cta" });
  return e("div", { ...l, className: O(["wishlist-empty-wishlist", t]), children: e(Qt, { className: O(["wishlist-empty-wishlist__wrapper", t]), "data-testid": "wishlist-empty-wishlist", heading: r.emptyWishlist, icon: e(G, { className: "wishlist-empty-wishlist__icon", source: $t }), message: e("p", { children: r.message }), action: s ? e(Q, { "data-testid": "wishlist-empty-wishlist-button", size: "medium", variant: "primary", type: "submit", href: s, children: r.cta }, "routeHome") : void 0 }) });
}, lt = () => e(te, { children: `
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
    ` }), Ot = () => L(Jt, { "data-testid": "wishlist-loader", children: [e(lt, {}), e(lt, {}), e(lt, {})] }), ae = (t) => {
  window.location.href = t;
}, re = (t) => {
  window.location.replace(t);
}, ne = () => window.location.href, qt = ({ item: t, wishlistId: i, scope: s, getProductData: l, getRefinedProduct: r, moveProdToCart: m, routeProdDetailPage: v, imageNode: P, slots: A }) => {
  const [n, d] = D(null);
  q(() => {
    let p = !1;
    async function y() {
      var N;
      try {
        let _;
        r && ((N = t == null ? void 0 : t.selectedOptions) == null ? void 0 : N.length) > 0 ? _ = await r(t.product.sku, t.selectedOptions.map((h) => h.uid)) : _ = l ? await l(t == null ? void 0 : t.product.sku) : t == null ? void 0 : t.product, p || d(_);
      } catch (_) {
        p || console.error("Failed to fetch product data:", _);
      }
    }
    return y(), () => {
      p = !0;
    };
  }, [t, l, r]);
  const c = Z(async (p = !0) => {
    try {
      return await jt([t], i, { scope: s }), console.log(`Product ${n == null ? void 0 : n.sku} removed from wishlist!`), p && B.emit("wishlist/alert", { action: "remove", item: { ...t, product: n } }, { scope: s }), !0;
    } catch (y) {
      return console.error(`Product ${n.sku} could not be removed from wishlist`, y), !1;
    }
  }, [t, n, i, s]), f = Z(async () => {
    var p;
    try {
      await m([{ sku: n.sku, quantity: 1, optionsUIDs: (p = t.selectedOptions) == null ? void 0 : p.map((N) => N.uid), enteredOptions: t.enteredOptions }]), console.log(`Product ${n.sku} successfully moved to cart 🛒`);
      const y = await c(!1);
      return B.emit("wishlist/alert", { action: "move", item: { ...t, product: n } }, { scope: s }), y;
    } catch (y) {
      return console.error("Could not move product to cart: ", y), y.toString().includes("You need to choose options for your item.") && re(v(n)), !1;
    }
  }, [n, t, s, m, v, c]);
  return !n || !t ? null : e(ue, { item: { ...t, product: n }, onCartActionButtonClick: f, onTrashButtonClick: c, routeProdDetailPage: v, imageNode: P, slots: A });
};
qt.displayName = "WishlistItem";
const ce = ({ className: t, wishlistData: i, wishlistAlert: s, isLoggedIn: l, isLoading: r, moveProdToCart: m, getProductData: v, getRefinedProduct: P, routeEmptyWishlistCTA: A, onLoginClick: n, routeProdDetailPage: d, wishlistId: c, scope: f, pageInfo: p, activePage: y = 1, onPageChange: N, isLoadingPage: _ = !1, slots: h, ...S }) => {
  const [b, H] = D(s), W = Y({ wishlistHeading: "Wishlist.Wishlist.heading", wishlistLoadingHeading: "Wishlist.Wishlist.loading", alertMoveMessage: "Wishlist.Alert.moveToCart.message", alertRemoveMessage: "Wishlist.Alert.removeProduct.message" }), g = (() => {
    var C, I;
    if (!b) return "";
    const M = b.props, a = M == null ? void 0 : M.action;
    if (a === "move" || a === "remove") {
      const x = ((I = (C = M == null ? void 0 : M.item) == null ? void 0 : C.product) == null ? void 0 : I.name) || "";
      return (a === "move" ? W.alertMoveMessage : W.alertRemoveMessage).replace("{product}", x);
    }
    return "";
  })(), k = J(() => {
    var C;
    return ((C = i == null ? void 0 : i.items) == null ? void 0 : C.length) > 0 ? i.items.map((I) => e(qt, { item: I, wishlistId: c, scope: f, getProductData: v, getRefinedProduct: P, moveProdToCart: m, routeProdDetailPage: d, imageNode: h != null && h.image ? ({ defaultImageProps: M }) => e(Rt, { name: "image", slot: h.image, context: { defaultImageProps: M, item: I } }) : void 0, slots: { actions: h == null ? void 0 : h.actions } }, I.id)) : null;
  }, [i, c, f, m, v, P, d, h == null ? void 0 : h.image, h == null ? void 0 : h.actions]);
  q(() => {
    if (s) {
      H(s);
      const C = setTimeout(() => {
        H(null);
      }, 5e3);
      return () => clearTimeout(C);
    }
  }, [s]);
  const w = J(() => b ? e(Gt, { node: b, className: "wishlist-wishlist__alert" }) : null, [b]), U = () => L(V, { children: [e("div", { className: "wishlist-wishlist__heading", "data-testid": "wishlist-heading-wrapper", children: e("h1", { className: "wishlist-wishlist__heading-text", "data-testid": "loader-wishlist-heading", children: W.wishlistLoadingHeading }) }), e(Ot, {})] }), $ = () => k ? L(V, { children: [K, _ ? e(Ot, {}) : e("div", { className: "wishlist-wishlist__content", children: k }), p && (p.totalPages ?? 0) > 1 && e("div", { className: "wishlist-wishlist__pagination", children: e(Xt, { currentPage: y, totalPages: p.totalPages, onChange: N }) })] }) : e("div", { className: O(["wishlist-wishlist__content", "wishlist-wishlist__content--empty"]), children: L("div", { children: [e(oe, { "data-testid": "empty-wishlist", ctaLinkURL: A == null ? void 0 : A() }), !l && e(he, { onLoginClick: n })] }) }), K = J(() => {
    var C;
    return k ? e("div", { className: "wishlist-wishlist__heading", "data-testid": "wishlist-heading-wrapper", children: e("h1", { className: "wishlist-wishlist__heading-text", "data-testid": "default-wishlist-heading", children: (C = W.wishlistHeading) == null ? void 0 : C.split(" {count}").map((I, M) => {
      var a;
      return L(V, { children: [I, M === 0 && e("span", { className: "wishlist-wishlist__heading-count", "data-testid": "wishlist-heading-count", children: `${i == null ? void 0 : i.items_count} products` })] }, ((a = i == null ? void 0 : i.id) == null ? void 0 : a.toString()) + M);
    }) }) }) : null;
  }, [W, k, i]);
  return L("div", { ...S, className: O(["wishlist-wishlist", t]), children: [e(Bt, { message: g }), e("div", { className: "wishlist-wishlist__alert-region", children: w }), e(Bt, { message: _ ? W.wishlistLoadingHeading : "" }), r ? U() : $()] });
}, de = (t) => {
  var i;
  return (i = t == null ? void 0 : t.gallery) != null && i.length ? t.gallery.reduce((s, l) => {
    var r;
    return l.type === "video" ? (r = l.preview) != null && r.url && s.push({ url: l.preview.url, label: l.preview.label ?? l.title ?? "" }) : l.url && s.push({ url: l.url, label: l.label ?? "" }), s;
  }, []) : (t == null ? void 0 : t.images) ?? [];
}, ue = ({ className: t, item: i, onCartActionButtonClick: s, onTrashButtonClick: l, routeProdDetailPage: r, imageNode: m, slots: v, showStockStatus: P, ...A }) => {
  var n, d, c, f, p, y, N, _, h, S;
  const b = Y({ cartActionBtn: "ProductItem.CartActionButton", cartActionBtnAriaLabel: "ProductItem.CartActionButtonAriaLabel", trashActionBtn: "ProductItem.TrashActionButton", customizeActionBtn: "ProductItem.CustomizeActionButton", stockStatusInStock: "ProductItem.InStock", stockStatusOutOfStock: "ProductItem.OutOfStock", customizeActionBtnAriaLabel: "ProductItem.CustomizeActionButtonAriaLabel" }), H = ((n = i.product) == null ? void 0 : n.name) ?? "", W = b.trashActionBtn.replace("{productName}", H), g = b.cartActionBtnAriaLabel.replace("{productName}", H), k = b.customizeActionBtnAriaLabel.replace("{productName}", H), w = ((f = (c = (d = i.product) == null ? void 0 : d.prices) == null ? void 0 : c.final) == null ? void 0 : f.amount) < ((N = (y = (p = i.product) == null ? void 0 : p.prices) == null ? void 0 : y.regular) == null ? void 0 : N.amount), U = () => {
    var o;
    return e("a", { className: "wishlist-product-item-image", "data-testid": "wishlist-product-item-image", href: r(i.product), "aria-label": (o = i.product) == null ? void 0 : o.name, children: e(me, { images: de(i.product), imageNode: m }) });
  }, $ = () => {
    var o, T, j, et, ot, at, rt, nt, ct, dt, ut, mt, ht, pt, gt, vt, wt, ft, yt, _t, bt, kt, xt, Pt, Wt, Ct, Et, Lt, At, Nt, It, Mt, Tt;
    return ((j = (T = (o = i.product) == null ? void 0 : o.prices) == null ? void 0 : T.final) == null ? void 0 : j.amount) === void 0 && ((at = (ot = (et = i.product) == null ? void 0 : et.prices) == null ? void 0 : ot.final) == null ? void 0 : at.maximumAmount) !== void 0 && ((ct = (nt = (rt = i.product) == null ? void 0 : rt.prices) == null ? void 0 : nt.final) == null ? void 0 : ct.maximumAmount) > 0 ? L(V, { children: [e(it, { className: "wishlist-product-item-price", "data-testid": "wishlist-product-item-price", amount: (mt = (ut = (dt = i.product) == null ? void 0 : dt.prices) == null ? void 0 : ut.final) == null ? void 0 : mt.minimumAmount, currency: (gt = (pt = (ht = i.product) == null ? void 0 : ht.prices) == null ? void 0 : pt.final) == null ? void 0 : gt.currency }), "-", e(it, { className: "wishlist-product-item-price", "data-testid": "wishlist-product-item-price", amount: (ft = (wt = (vt = i.product) == null ? void 0 : vt.prices) == null ? void 0 : wt.final) == null ? void 0 : ft.maximumAmount, currency: (bt = (_t = (yt = i.product) == null ? void 0 : yt.prices) == null ? void 0 : _t.final) == null ? void 0 : bt.currency })] }) : L(V, { children: [e(it, { className: O(["wishlist-product-item-price", w ? "strikethrough" : ""]), "data-testid": "wishlist-product-item-price", amount: (Pt = (xt = (kt = i.product) == null ? void 0 : kt.prices) == null ? void 0 : xt.regular) == null ? void 0 : Pt.amount, currency: (Et = (Ct = (Wt = i.product) == null ? void 0 : Wt.prices) == null ? void 0 : Ct.regular) == null ? void 0 : Et.currency }), w && e(it, { className: "wishlist-product-item-discounted-price", "data-testid": "wishlist-product-item-discounted-price", amount: (Nt = (At = (Lt = i.product) == null ? void 0 : Lt.prices) == null ? void 0 : At.final) == null ? void 0 : Nt.amount, currency: (Tt = (Mt = (It = i.product) == null ? void 0 : It.prices) == null ? void 0 : Mt.final) == null ? void 0 : Tt.currency })] });
  }, K = () => {
    var o;
    return P ? e("span", { className: "wishlist-product-item-stock-status", "data-testid": "wishlist-product-item-stock-status", children: (o = i.product) != null && o.inStock ? b.stockStatusInStock : b.stockStatusOutOfStock }) : null;
  }, C = () => e(Q, { "data-testid": "wishlist-product-item-remove-button", className: "wishlist-product-item-button__remove", variant: "tertiary", onClick: () => l == null ? void 0 : l(), icon: e(G, { source: Zt, size: "24", stroke: "2", viewBox: "0 0 24 24", "aria-label": W }) }), I = () => a() ? X() : tt(), M = (h = (_ = i.product) == null ? void 0 : _.attributes) == null ? void 0 : h.some((o) => o.id === "ac_giftcard"), a = () => {
    var o;
    return M ? !1 : ((o = i.product) == null ? void 0 : o.productType) === "complex" ? F() : !0;
  }, x = J(() => {
    var o;
    return ((o = i.selectedOptions) == null ? void 0 : o.map((T) => T.uid)) || [];
  }, [i.selectedOptions]), E = J(() => {
    const o = i.product.options || [], T = o.filter((j) => j.required);
    return T.length === 0 ? o : T;
  }, [i.product.options]), F = () => E.every((o) => {
    var T;
    return (T = o.items) == null ? void 0 : T.some((j) => x.includes(j.id));
  }), R = () => x.length === 0 ? null : e("div", { className: "wishlist-product-item-options", children: E.map((o) => {
    var T;
    const j = (T = o.items) == null ? void 0 : T.find((et) => x.includes(et.id));
    return j ? L("div", { className: "wishlist-product-item-option", children: [L("span", { className: "wishlist-product-item-option__attribute", children: [o.label, ":"] }), " ", e("span", { className: "wishlist-product-item-option__label", children: j.label })] }, o.type) : null;
  }) }), X = () => {
    var o;
    return e(Q, { "data-testid": "wishlist-product-item-move-to-cart-button", size: "medium", type: "submit", icon: e(G, { source: Ut }), disabled: !((o = i.product) != null && o.inStock), "aria-label": g, onClick: () => s == null ? void 0 : s(), children: b.cartActionBtn });
  }, tt = () => e(Q, { "data-testid": "wishlist-product-item-customize-button", size: "medium", type: "submit", "aria-label": k, href: r(i.product), children: b.customizeActionBtn });
  return e("div", { ...A, className: O(["wishlist-product-item", t]), children: L("div", { className: "wishlist-product-item__content", children: [U(), L("div", { className: "wishlist-product-item__title", "data-testid": "wishlist-product-item-header", children: [e("a", { className: "wishlist-product-item-name", "data-testid": "wishlist-product-item-name", href: r(i.product), children: (S = i.product) == null ? void 0 : S.name }), C(), $()] }), K(), R(), e(Rt, { name: "actions", slot: v == null ? void 0 : v.actions, context: { item: i, onMoveToCart: s, onRemove: l }, children: I() })] }) });
}, me = ({ className: t, children: i, images: s, imageNode: l, ...r }) => {
  const [m, v] = D(0), P = Y({ slideLabel: "ImageCarousel.slideLabel" }), A = (s == null ? void 0 : s.length) ?? 0;
  return L(V, { children: [e("div", { ...r, className: O(["image-carousel", t]), children: e("div", { className: O(["overflow-hidden relative max-w-[200px]", t]), children: s == null ? void 0 : s.map((n, d) => {
    const c = { className: O(["image-carousel-image", t]), src: n.url, alt: n.label };
    return d !== m ? null : typeof l == "function" ? l({ defaultImageProps: c }) : l || e(Kt, { ...c });
  }) }) }), A > 1 && e("div", { className: O(["absolute", "image-switcher-area"]), role: "tablist", "aria-label": P.slideLabel, children: s == null ? void 0 : s.map((n, d) => {
    const c = m === d;
    return e("button", { type: "button", role: "tab", className: O(["image-switcher", c ? "image-switcher-active" : "image-switcher-inactive"]), "aria-label": `${n.label || `Image ${d + 1}`} (${d + 1}/${A})`, "aria-selected": c, tabIndex: c ? 0 : -1, onClick: (f) => {
      v(d), f.preventDefault(), f.stopPropagation();
    } }, d);
  }) })] });
}, he = ({ onLoginClick: t }) => L("div", { className: "wishlist-login__sign-in", children: [e("a", { "data-testid": "log-in-link", className: "wishlist-login__link", href: "", rel: "noreferrer", onClick: t, role: "button", children: e(St, { id: "Wishlist.Login.logIn" }) }), e(St, { id: "Wishlist.Login.sync" })] });
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Vt = ({ action: t, item: i, routeToWishlist: s }) => {
  const l = Y({ addHeading: "Wishlist.Alert.addProduct.heading", addMessage: "Wishlist.Alert.addProduct.message", removeHeading: "Wishlist.Alert.removeProduct.heading", removeMessage: "Wishlist.Alert.removeProduct.message", moveHeading: "Wishlist.Alert.moveToCart.heading", moveMessage: "Wishlist.Alert.moveToCart.message", viewWishlist: "Wishlist.Alert.viewWishlist", addErrorHeading: "Wishlist.Alert.addError.heading", addErrorMessage: "Wishlist.Alert.addError.message", removeErrorHeading: "Wishlist.Alert.removeError.heading", removeErrorMessage: "Wishlist.Alert.removeError.message" });
  if (!t) return null;
  const r = l[`${t}Heading`], m = l[`${t}Message`], v = { add: Ft, remove: Zt, move: Ut, addError: Ht, removeError: Ht }, P = s ? ne().includes(s) : !1;
  return e(ee, { "data-testid": "wishlist-alert", heading: r, description: i ? m.replace("{product}", i.product.name) : m, type: t === "addError" || t === "removeError" ? "warning" : "success", icon: e(G, { source: v[t], size: "16" }), actionButtonPosition: "top", additionalActions: !P && s ? [{ label: l.viewWishlist, onClick: () => {
    ae(s);
  } }] : void 0 });
};
Vt.displayName = "WishlistAlert";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const pe = ({ routeEmptyWishlistCTA: t, routeToWishlist: i, wishlistId: s, scope: l, moveProdToCart: r, routeProdDetailPage: m, getProductData: v, getRefinedProduct: P, slots: A, ...n }) => {
  const d = z.pageSize ?? st, [c, f] = D(null), [p, y] = D(z.authenticated), [N, _] = D(z.isLoading ?? !1), [h, S] = D(1), [b, H] = D(!1), W = Yt(!1), g = (a) => {
    W.current = a, H(a);
  }, k = (a) => y(a), w = Z((a) => s ? Dt(s, d, a, { scope: l }) : Dt(z.wishlistId, d, a), [s, l, d]), U = Z(async (a) => {
    if (!W.current && !(!s && !z.wishlistId)) {
      g(!0);
      try {
        await w(a);
      } finally {
        g(!1);
      }
    }
  }, [s, w]), [$, K] = D(null), C = Z((a) => {
    const { action: x, item: E } = a;
    K(e(Vt, { action: x, item: E, routeToWishlist: i })), s && z.authenticated && w(h);
  }, [i, s, h, w]), I = Z((a) => {
    var x, E, F;
    const R = a, X = ((x = R == null ? void 0 : R.page_info) == null ? void 0 : x.currentPage) ?? null, tt = ((E = R == null ? void 0 : R.page_info) == null ? void 0 : E.totalPages) ?? 0;
    if (!((((F = R == null ? void 0 : R.items) == null ? void 0 : F.length) ?? 0) > 0) && tt >= 1 && X != null && X > 1 && (s || z.wishlistId) && !W.current) {
      const o = Math.min(X - 1, tt);
      g(!0), w(o).finally(() => {
        g(!1);
      });
      return;
    }
    f(R), _(!1);
  }, [s, w]);
  q(() => {
    var a, x;
    if (!c) return;
    const E = ((a = c.page_info) == null ? void 0 : a.currentPage) ?? null;
    E != null && (S(E), s || (z.currentPage = E)), g(!1);
    const F = (x = c.page_info) == null ? void 0 : x.pageSize;
    d !== st && F != null && F !== d && !W.current && (s || z.wishlistId) && (g(!0), w(1).finally(() => g(!1)));
  }, [c, d, s, w]), q(() => {
    const a = B.on("authenticated", k), x = B.on("wishlist/alert", C, { scope: l }), E = B.on("wishlist/data", I, { eager: !0, scope: l });
    return () => {
      a == null || a.off(), E == null || E.off(), x == null || x.off();
    };
  }, [C, I, l]), q(() => {
    s && (_(!0), Promise.resolve(w(1)).catch(() => {
    }).finally(() => _(!1)));
  }, [s, w]);
  const M = d !== st ? c == null ? void 0 : c.page_info : void 0;
  return e(ce, { ...n, wishlistData: c, wishlistAlert: $, routeEmptyWishlistCTA: t, wishlistId: s, scope: l, moveProdToCart: r, getProductData: v, getRefinedProduct: P, isLoggedIn: p, isLoading: N, routeProdDetailPage: m, pageInfo: M, activePage: h, onPageChange: U, isLoadingPage: b, slots: A });
};
pe.displayName = "Wishlist";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const zt = (t) => t.optionUIDs ?? (t.selectedOptionsUIDs ? Object.values(t.selectedOptionsUIDs) : void 0) ?? (t.bundleOptionsUIDs ? Object.values(t.bundleOptionsUIDs) : void 0), ge = ({ product: t, iconWishlisted: i, iconToWishlist: s, size: l, variant: r, disabled: m, labelToWishlist: v, labelWishlisted: P, onClick: A, removeProdFromCart: n }) => {
  const [d, c] = D(z.authenticated), [f, p] = D(!1), [y, N] = D(null), { isGuestWishlistEnabled: _ } = ie.getConfig(), h = Y({ addToWishlist: "Wishlist.Wishlist.ariaLabelAddToWishlist", removeFromWishlist: "Wishlist.Wishlist.ariaLabelRemoveFromWishlist", ariaLabelWithVisibleLabel: "Wishlist.Wishlist.ariaLabelWithVisibleLabel" }), S = Z(() => {
    const g = se(t.topLevelSku ?? t.sku, zt(t));
    N(g ?? null), p(!!g);
  }, [t]);
  q(() => {
    S();
  }, [S]), q(() => {
    const g = ($) => c($), k = B.on("authenticated", g), w = B.on("wishlist/data", S), U = B.on("wishlist/allItems", S);
    return () => {
      k == null || k.off(), w == null || w.off(), U == null || U.off();
    };
  }, [S]);
  const b = async () => {
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
        await le([{ sku: t.topLevelSku ?? t.sku, quantity: 1, optionsUIDs: zt(t), enteredOptions: (g = t.options) != null && g.items ? t.options.items.filter((k) => k.selected).map((k) => ({ uid: k.uid, value: k.value })) : void 0 }]);
      } catch {
        return B.emit("wishlist/alert", { action: "addError", item: { product: t } }), null;
      }
      p(!0), B.emit("wishlist/alert", { action: "add", item: { product: t } }), n && await n([{ uid: t.uid, quantity: 0 }]);
    }
  };
  if (!d && !_) return null;
  const H = f ? P : v, W = H ? h.ariaLabelWithVisibleLabel.replace("{LABEL}", H).replace("{PRODUCT_NAME}", t == null ? void 0 : t.name) : (f ? h.removeFromWishlist : h.addToWishlist).replace("{PRODUCT_NAME}", t == null ? void 0 : t.name);
  return e(Q, { active: f, "aria-label": W, "data-testid": "wishlist-toggle", size: l ?? "medium", variant: r ?? "tertiary", disabled: m, icon: e(G, { source: s ?? $t }), activeIcon: e(G, { source: i ?? Ft }), onClick: A ?? b, children: v, activeChildren: P });
};
ge.displayName = "WishlistToggle";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(t, i) {
  try {
    if (typeof document < "u") {
      const s = i.styleId;
      if (document.querySelector(`style[data-dropin="${s}"]`)) return;
      const l = document.createElement("style");
      for (const m in i.attributes) l.setAttribute(m, i.attributes[m]);
      l.setAttribute("data-dropin", s), l.appendChild(document.createTextNode(t));
      const r = document.querySelector('style[data-dropin="sdk"]');
      if (r) r.after(l);
      else {
        const m = document.querySelector('link[rel="stylesheet"], style');
        m ? m.before(l) : document.head.append(l);
      }
    }
  } catch (s) {
    console.error("dropin-styles (injectCodeFunction)", s);
  }
})(".wishlist-empty-wishlist{container-type:inline-size;container-name:wishlist}.wishlist-empty-wishlist__wrapper .dropin-card--secondary{display:grid;grid-auto-rows:min-content;justify-content:center;text-align:center;border:unset}.wishlist-empty-wishlist .dropin-illustrated-message__heading{font:var(--type-headline-1-font)}.wishlist-empty-wishlist .dropin-illustrated-message__message{font:var(--type-body-1-default-font)}@container wishlist (width < 737px){.wishlist-empty-wishlist__wrapper .dropin-card{border:unset;border-style:hidden}}.wishlist-wishlist{container-type:inline-size;container-name:wishlist-grid;max-width:inherit}.wishlist-wishlist__content{display:grid;gap:var(--spacing-medium);margin:auto;padding:var(--spacing-medium) 0}.wishlist-wishlist__heading{color:var(--color-neutral-800);display:grid;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);padding:var(--spacing-small) 0;row-gap:var(--spacing-xsmall)}.wishlist-wishlist__heading-text{font-size:inherit;font-weight:inherit;margin:0;line-height:inherit}.wishlist-wishlist__heading-count{color:var(--color-neutral-700);margin-left:var(--spacing-xxsmall);letter-spacing:normal;font:var(--type-details-caption-2-font)}.wishlist-wishlist__content.wishlist-wishlist__content--empty{border:var(--shape-border-width-2) solid var(--color-neutral-400);border-radius:var(--shape-border-radius-2);grid-template-columns:repeat(1,1fr);padding:var(--spacing-xxbig);margin:var(--spacing-xxbig) auto}@media only screen and (max-width: 480px){.dropin-skeleton{grid-template-columns:repeat(1,1fr)}.dropin-skeleton-row:nth-child(n+2){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(1,1fr);min-height:320px}}@media only screen and (min-width: 480px) and (max-width: 600px){.dropin-skeleton{grid-template-columns:repeat(2,1fr)}.dropin-skeleton-row:nth-child(n+3){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(2,1fr);min-height:320px}}@media only screen and (min-width: 600px){.dropin-skeleton{grid-template-columns:repeat(2,1fr)}.dropin-skeleton-row:nth-child(n+3){display:none}.wishlist-wishlist__content{grid-template-columns:repeat(2,1fr);min-height:320px}}@media only screen and (min-width: 768px){.dropin-skeleton{grid-template-columns:repeat(3,1fr)}.dropin-skeleton-row:nth-child(n){display:block}.wishlist-wishlist__content{grid-template-columns:repeat(3,1fr);min-height:480px}}.wishlist-wishlist__pagination{display:flex;justify-content:center;padding:var(--spacing-small) 0}.wishlist-product-item{background-color:var(--color-neutral-50);margin-bottom:var(--spacing-small)}.wishlist-product-item__content{display:flex;flex-direction:column;gap:var(--spacing-small)}.wishlist-product-item__content .wishlist-product-item-image{background:var(--color-neutral-200);height:100%;padding:0;position:relative;width:100%}.wishlist-product-item__content .wishlist-product-item__title{color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin:0;position:relative}.wishlist-product-item-name{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:85%}a.wishlist-product-item-name:active,a.wishlist-product-item-name:hover,a.wishlist-product-item-name{color:var(--color-neutral-800);cursor:pointer;font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing)}.wishlist-product-item__content .wishlist-product-item-button__remove{position:absolute;right:0;top:-10px}.wishlist-product-item__content .wishlist-product-item-options{font:var(--type-body-2-default-font)}.wishlist-product-item__content .wishlist-product-item-option__attribute{text-transform:capitalize}.wishlist-product-item__content .wishlist-product-item-option__label{font:var(--type-body-2-strong-font)}.wishlist-product-item__content .wishlist-product-item-price{display:inline;font:var(--type-body-2-default-font)}.strikethrough{text-decoration:line-through}.wishlist-product-item__content .wishlist-product-item-discounted-price{display:inline;margin-left:var(--spacing-xsmall);color:var(--color-alert-800)}.wishlist-product-item-move-to-cart{display:grid;grid-area:product-add-to-cart;justify-content:end}.wishlist-product-item-tax{color:var(--color-neutral-500)}.wishlist-product-item-tax span{margin-right:var(--spacing-xsmall)}.wishlist-product-item-stock-status{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.wishlist-product-item__content [data-slot=actions]{display:contents}.image-carousel{display:flex;flex-direction:column;gap:var(--spacing-medium);padding:var(--spacing-medium)}.image-carousel .image-carousel-image{object-fit:contain;padding:var(--spacing-xxsmall) 0;width:100%}.image-switcher-area{bottom:var(--spacing-xxsmall);left:0;margin-top:var(--spacing-small);position:absolute;text-align:center;width:100%}.image-switcher-area .image-switcher{-webkit-appearance:none;-moz-appearance:none;appearance:none;cursor:pointer;border-radius:50%;display:inline-flex;height:var(--spacing-xsmall);margin:0 var(--spacing-xxsmall);min-height:var(--spacing-medium);min-width:var(--spacing-medium);padding:var(--spacing-xsmall);width:var(--spacing-xsmall);background-clip:content-box}.image-switcher-area .image-switcher:focus-visible{outline:var(--shape-border-width-3) solid var(--color-brand-700);outline-offset:2px}.image-switcher-area .image-switcher-active{background-color:var(--color-neutral-900);border:var(--shape-border-width-1) solid var(--color-brand-700)}.image-switcher-area .image-switcher-inactive{background-color:var(--color-neutral-700);border:var(--shape-border-width-1) solid var(--color-neutral-700)}@media only screen and (max-width: 480px){.image-carousel{gap:var(--spacing-xxsmall)}.image-carousel .image-carousel-image{height:250px}}@media only screen and (min-width: 480px) and (max-width: 600px){.image-carousel{gap:var(--spacing-xsmall)}.image-carousel .image-carousel-image{height:300px}}@media only screen and (min-width: 600px){.image-carousel{gap:var(--spacing-xsmall)}.image-carousel .image-carousel-image{height:300px}}@media only screen and (min-width: 768px){.image-carousel{gap:var(--spacing-small)}.image-carousel .image-carousel-image{height:350px}}@media only screen and (min-width: 1024px){.image-carousel{gap:var(--spacing-medium)}.image-carousel .image-carousel-image{height:400px}}.wishlist-login__sign-in{grid-column-start:2;color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin-top:var(--spacing-xxsmall);text-align:center}a.wishlist-login__link{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-left:var(--spacing-xxsmall);text-decoration:underline;text-decoration-thickness:auto;text-underline-offset:auto;color:var(--color-neutral-800)}a.wishlist-login__link:hover{color:var(--color-neutral-800);text-decoration:underline;text-decoration-thickness:auto;text-underline-offset:auto}", { styleId: "Wishlist" });
export {
  pe as Wishlist,
  Vt as WishlistAlert,
  qt as WishlistItem,
  ge as WishlistToggle
};
//# sourceMappingURL=containers.js.map
