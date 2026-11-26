/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useCallback as q, useState as A, useRef as rt, useEffect as S, jsx as e, Fragment as ot, jsxs as it } from "@dropins/tools/preact-bundle.js";
import { P as lt } from "./chunks/components.js";
import { Slot as y } from "@dropins/tools/lib.js";
import { ProductItemCard as at, Image as dt, Button as ct, StarRating as ut, PriceRange as st, Price as mt } from "@dropins/tools/components.js";
import { events as pt } from "@dropins/tools/event-bus.js";
import { p as vt, getRecommendationsByUnits as gt, getRecommendationsByUnitIds as ft, a as ht, b as yt } from "./api.js";
import { useText as xt } from "@dropins/tools/i18n.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Pt = ({ label: p, recId: c, initialData: g = null, hideHeading: f, showRatings: P = !1, routeProduct: u, currentSku: D, currentProduct: x, cartSkus: w, userPurchaseHistory: _, userViewHistory: k, pagePlacement: M, slots: s, ...W }) => {
  var B, H;
  const R = (x == null ? void 0 : x.sku) ?? D ?? "", C = q((t) => {
    const r = p ? t.filter((n) => n.label === p) : [];
    return r.length > 0 ? r : c ? t.filter((n) => n.unitId === c) : [];
  }, [c, p]), [X, b] = A(!g), [a, E] = A(() => {
    var t;
    const r = (t = g == null ? void 0 : g.recommendations) == null ? void 0 : t.results;
    return r ? C(r) : [];
  }), v = rt(null), I = xt({ addToCartText: "Recommendations.ProductList.addToCart", optionsText: "Recommendations.ProductList.selectOptions", viewProductText: "Recommendations.ProductList.viewProduct" }), T = q(() => !!c || !!p, [c, p]);
  if (S(() => {
    const t = pt.on("recommendations/data", (r) => {
      const n = r ? C(r) : [];
      n.length > 0 && E((o) => {
        const l = o || [];
        n.forEach((i) => {
          i.userError && console.error(`${i.userError}`);
        });
        const m = n.filter((i) => {
          var d;
          return ((d = i == null ? void 0 : i.items) == null ? void 0 : d.length) && !l.some((h) => h.unitId === i.unitId);
        });
        return m.forEach((i) => {
          var d, h;
          vt({ recommendationUnit: i, pagePlacement: "product-list", yOffsetTop: ((d = v.current) == null ? void 0 : d.getBoundingClientRect().top) ?? 0, yOffsetBottom: ((h = v.current) == null ? void 0 : h.getBoundingClientRect().bottom) ?? 0, backupProducts: 0, searchTime: 0 });
        }), [...l, ...m];
      }), b(!1);
    });
    return () => {
      t == null || t.off();
    };
  }, [C]), S(() => {
    if (!(a != null && a.length) || !v.current) return;
    const t = { root: null, rootMargin: "0px", threshold: 0.5 }, r = (o) => {
      o.forEach((l) => {
        l.intersectionRatio > 0.5 && a.forEach((m) => {
          var i, d;
          ht({ recommendationUnit: m, pagePlacement: "product-list", yOffsetTop: ((i = v.current) == null ? void 0 : i.getBoundingClientRect().top) ?? 0, yOffsetBottom: ((d = v.current) == null ? void 0 : d.getBoundingClientRect().bottom) ?? 0 });
        });
      });
    }, n = new IntersectionObserver(r, t);
    return n.observe(v.current), () => n.disconnect();
  }, [a]), S(() => {
    if (!T()) {
      b(!1);
      return;
    }
    b(!0), (p ? gt({ selector: { unitIds: c ? [c] : [], labels: p ? [p] : [] }, currentSku: R, cartSkus: w, userPurchaseHistory: _, userViewHistory: k, currentProduct: x }) : ft({ currentSku: R, cartSkus: w, userPurchaseHistory: _, userViewHistory: k, unitIds: [c], currentProduct: x })).catch((t) => {
      console.error("Recommendations error:", t), E([]), b(!1);
    });
  }, [R, w, _, k, T, c, p, x]), !T()) return c || console.warn("ProductList: recId is missing. Please provide a valid recId to display product recommendations."), p || console.warn("ProductList: reference key is missing. Please provide a valid reference key to display product recommendations."), null;
  const Y = (t, r) => {
    var n, o, l, m;
    const i = { loading: r < 4 ? "eager" : "lazy", src: ((o = (n = t.images) == null ? void 0 : n[0]) == null ? void 0 : o.url) || "", alt: ((m = (l = t.images) == null ? void 0 : l[0]) == null ? void 0 : m.label) || t.name || "", width: "300", height: "300", params: { width: 300 } }, d = e(dt, { "data-testid": "product-list-item-image", ...i });
    return e(y, { name: "Thumbnail", slot: s == null ? void 0 : s.Thumbnail, context: { item: t, defaultImageProps: i }, children: u ? e("a", { href: u(t), children: d }) : d });
  }, Z = e(y, { name: "Heading", slot: s == null ? void 0 : s.Heading, context: { recommendations: a }, children: e("h2", { "data-testid": "default-product-list-heading", children: ((B = a == null ? void 0 : a[0]) == null ? void 0 : B.title) || I.heading }) }), G = (t, r) => e(y, { name: "Footer", slot: s == null ? void 0 : s.Footer, context: { item: t, index: r }, children: e("div", { "data-testid": "default-product-list-footer", children: u && e("a", { href: u(t), children: e(ct, { "data-testid": "default-product-list-footer-button", children: I.viewProductText, "aria-label": I.viewProductText, variant: "primary" }) }) }) }), J = (t) => e(y, { name: "Title", slot: s == null ? void 0 : s.Title, context: { item: t, productUrl: u ? u(t) : "" }, children: u ? e("a", { href: u(t), children: t.name }) : e("span", { children: t.name }) }), K = (t) => e(y, { name: "Sku", slot: s == null ? void 0 : s.Sku, context: { item: t }, children: e("span", { children: t.sku }) }), Q = (t) => !P || t.rating == null || t.reviewCount == null || t.reviewCount <= 0 ? null : e(y, { name: "Rating", slot: s == null ? void 0 : s.Rating, context: { item: t }, children: e(ut, { rating: t.rating, reviewCount: t.reviewCount, showCount: !0 }) }), tt = (t) => {
    var r, n, o, l, m, i, d, h, $, L, N, z, U, F, V, j;
    return e(y, { name: "Price", slot: s == null ? void 0 : s.Price, context: { item: t }, children: e("div", { "data-testid": "default-product-price", children: t.itemType === "ComplexProductView" ? e(st, { display: "from to", minimumAmount: (l = (o = (n = (r = t.priceRange) == null ? void 0 : r.minimum) == null ? void 0 : n.final) == null ? void 0 : o.amount) == null ? void 0 : l.value, maximumAmount: (h = (d = (i = (m = t.priceRange) == null ? void 0 : m.maximum) == null ? void 0 : i.final) == null ? void 0 : d.amount) == null ? void 0 : h.value, currency: (z = (N = (L = ($ = t.priceRange) == null ? void 0 : $.minimum) == null ? void 0 : L.final) == null ? void 0 : N.amount) == null ? void 0 : z.currency }) : e(mt, { amount: (F = (U = t.price.final) == null ? void 0 : U.amount) == null ? void 0 : F.value, currency: (j = (V = t.price.final) == null ? void 0 : V.amount) == null ? void 0 : j.currency }) }) });
  }, et = (t, r) => {
    var n, o;
    const l = a == null ? void 0 : a.find((m) => {
      var i;
      return (i = m.items) == null ? void 0 : i.some((d) => d.sku === t.sku);
    });
    l && yt({ recommendationUnit: l, pagePlacement: M || "", yOffsetTop: ((n = v.current) == null ? void 0 : n.getBoundingClientRect().top) ?? 0, yOffsetBottom: ((o = v.current) == null ? void 0 : o.getBoundingClientRect().bottom) ?? 0, productId: r });
  }, nt = (H = a == null ? void 0 : a[0]) != null && H.totalProducts ? e(ot, { children: a == null ? void 0 : a.map(({ items: t, totalProducts: r }, n) => r > 0 ? t.map((o, l) => {
    const { sku: m } = o;
    return e("span", { role: "group", "aria-label": `Product ${n * t.length + l + 1} of ${r}`, onClick: () => et(o, n * t.length + l), children: e(at, { "data-testid": "recommendations-product-item-card", initialized: !0, sku: K(o), image: Y(o, n * t.length + l), titleNode: it("div", { className: "recommendations-product-list__product-summary", children: [Q(o), J(o)] }), price: tt(o), actionButton: G(o, n * t.length + l) }) }, m);
  }) : null) }) : null, O = !a || a.length === 0 || a.every((t) => !t.items || t.items.length === 0);
  return e("div", { ref: v, children: e(lt, { ...W, className: O ? "recommendations-product-list--empty" : "", heading: f ? void 0 : Z, loading: X, products: O ? null : e("div", { className: "recommendations-carousel__content", children: nt }) }) });
};
Pt.displayName = "ProductList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(p, c) {
  try {
    if (typeof document < "u") {
      const g = c.styleId;
      if (document.querySelector(`style[data-dropin="${g}"]`)) return;
      const f = document.createElement("style");
      for (const u in c.attributes) f.setAttribute(u, c.attributes[u]);
      f.setAttribute("data-dropin", g), f.appendChild(document.createTextNode(p));
      const P = document.querySelector('style[data-dropin="sdk"]');
      if (P) P.after(f);
      else {
        const u = document.querySelector('link[rel="stylesheet"], style');
        u ? u.before(f) : document.head.append(f);
      }
    }
  } catch (g) {
    console.error("dropin-styles (injectCodeFunction)", g);
  }
})(".recommendations-product-list a{display:block}.recommendations-product-list{display:flex;flex-direction:column;gap:var(--spacing-size-6);padding-bottom:var(--spacing-size-8);font-weight:400}.recommendations-product-list--empty{display:none}.recommendations-product-list__heading{margin:0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800);padding:var(--spacing-medium) 0 var(--spacing-small) 0}.recommendations-product-list .dropin-product-item-card{border:none}.recommendations-product-list__product-summary{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.dropin-product-item-card__sku,.dropin-product-item-card__price .dropin-price--default{font-size:var(--font-size-base);font-weight:var(--font-weight-regular);line-height:var(--line-height-base);color:var(--color-neutral-700);letter-spacing:var(--letter-spacing-tight)}.recommendations-product-list a:hover{text-decoration:none;color:var(--color-brand-500)}.recommendations-product-list a.dropin-button--primary:hover{color:var(--color-neutral-50)}.recommendations-carousel__content{overflow-x:auto;display:flex;gap:1rem;scroll-snap-type:x mandatory;padding-bottom:1rem}.recommendations-carousel__content>*{flex:0 0 auto;scroll-snap-align:start}.recommendations-product-list__heading{margin-bottom:1rem}@media only screen and (max-width: 767px){.recommendations-carousel__content{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:var(--spacing-small);margin-left:calc(-1 * (var(--spacing-fallback, 18px)))}.recommendations-carousel__content>*{flex:0 0 auto;scroll-snap-align:start;width:80vw;max-width:300px}.recommendations-carousel__content>*:last-child{margin-right:var(--spacing-small)}.recommendations-carousel__content .dropin-product-item-card{margin:0}}", { styleId: "Recommendations" });
export {
  Pt as ProductList
};
//# sourceMappingURL=containers.js.map
