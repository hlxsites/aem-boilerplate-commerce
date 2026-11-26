/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as $, useRef as ee, jsx as n, useEffect as U, Fragment as G, jsxs as E } from "@dropins/tools/preact-bundle.js";
import { Slot as R } from "@dropins/tools/lib.js";
import { Button as J, Icon as te, Checkbox as re, RadioButton as le, PriceRange as q, Pagination as ne, ProductItemCard as K, Image as ae, StarRating as oe, Picker as ie } from "@dropins/tools/components.js";
import { F as ce, S as ue, a as se, P as Q, b as de } from "./chunks/components.js";
import { events as H } from "@dropins/tools/event-bus.js";
import { search as O, s as pe, S as me, P as ve, c as ge, a as he } from "./api.js";
import { useText as W } from "@dropins/tools/i18n.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const fe = "no", ye = "yes", be = (e) => {
  const t = e.buckets.find((r) => r.selected);
  return t ? { attribute: e.attribute, range: { from: t.from, to: t.to } } : null;
}, xe = (e) => {
  const t = e.buckets.reduce((r, o) => (o.selected && r.push(o.title), r), []);
  return t.length === 0 ? null : { attribute: e.attribute, in: t };
}, X = (e) => {
  var t;
  switch ((t = e.buckets[0]) == null ? void 0 : t.__typename) {
    case "RangeBucket":
      return be(e);
    case "ScalarBucket":
    case "CategoryView":
      return xe(e);
  }
}, _e = (e) => {
  var t, r, o, u, g, x, b, k, f, i, d;
  const s = e[0];
  return (o = (r = (t = s == null ? void 0 : s.price) == null ? void 0 : t.regular) == null ? void 0 : r.amount) != null && o.currency ? s.price.regular.amount.currency : (b = (x = (g = (u = s == null ? void 0 : s.priceRange) == null ? void 0 : u.minimum) == null ? void 0 : g.regular) == null ? void 0 : x.amount) != null && b.currency ? (d = (i = (f = (k = s == null ? void 0 : s.priceRange) == null ? void 0 : k.minimum) == null ? void 0 : f.regular) == null ? void 0 : i.amount) == null ? void 0 : d.currency : "USD";
}, Se = (e, t, r) => (t == null ? void 0 : t.attribute) === "price" ? e.from === 0 ? E("div", { style: "display:flex", children: [n(q, { amount: e.from, currency: r || "USD" }), n("span", { style: "padding: 0 2px", children: "-" }), n(q, { amount: e.to, currency: r || "USD" })] }) : n(q, { minimumAmount: e.from, maximumAmount: e.to, currency: r || "USD", display: "dash" }) : e.title, ke = (e, t) => e.title === fe ? `Not ${t.title}` : e.title === ye ? t.title : e.title, Y = (e, t, r) => {
  switch (e.__typename) {
    case "RangeBucket":
      return Se(e, t, r);
    case "ScalarBucket":
    case "CategoryView":
      return ke(e, t);
  }
}, we = ({ scope: e, slots: t }) => {
  const r = W({ clearAll: "Search.Facet.clearAll", clearAllFilters: "Search.Facet.clearAllFilters" }), [o, u] = $([]), [g, x] = $(null), [b, k] = $(), [f, i] = $(null), d = ee(null), s = (a) => {
    const y = new Set(o.map((v) => v.attribute)), _ = [...((b == null ? void 0 : b.filter) || []).filter((v) => !y.has(v.attribute)), ...a.filter || []];
    O({ ...a, filter: _ }, { scope: e });
  }, P = (a) => {
    if (!a || !a.result.facets && !a.result.items && !a.request.filter) {
      u([]);
      return;
    }
    k(a.request);
    const { facets: y, items: _ } = a.result;
    x(_e(_));
    const v = a.request.filter;
    if (y) {
      const p = y.map((S) => {
        const h = S.buckets.map((F) => {
          const l = v == null ? void 0 : v.find((m) => m.attribute === S.attribute);
          if (l) {
            const m = l.range;
            if (m && F.from === m.from && F.to === m.to) return { ...F, selected: !0 };
            if (l.in && l.in.includes(F.title)) return { ...F, selected: !0 };
          }
          return { ...F, selected: !1 };
        });
        return { ...S, buckets: h };
      });
      u(p);
    }
  }, C = (a) => {
    u((y) => {
      const _ = y.map((p) => a.find((h) => h.attribute === p.attribute) || p), v = _.reduce((p, S) => {
        const h = X(S);
        return h && p.push(h), p;
      }, []);
      return i(v), _;
    });
  }, L = (a, y) => {
    const _ = a.buckets.map((p) => p.title === y ? { ...p, selected: !1 } : p), v = { ...a, buckets: _ };
    C([v]);
  }, B = () => {
    const a = o.map((y) => {
      const _ = y.buckets.map((v) => ({ ...v, selected: !1 }));
      return { ...y, buckets: _ };
    });
    u(a), i([]);
  }, D = (a, y) => {
    const _ = a.target.value, v = a.target.checked;
    u((p) => {
      const S = p.find((c) => c.attribute === y);
      if (!S) return p;
      const h = S.buckets.map((c) => {
        var w;
        return ((w = S.buckets[0]) == null ? void 0 : w.__typename) === "RangeBucket" ? c.title === _ ? { ...c, selected: v } : { ...c, selected: !1 } : c.title === _ ? { ...c, selected: v } : { ...c };
      }), F = { ...S, buckets: h }, l = p.map((c) => c.attribute === y ? F : c), m = l.reduce((c, w) => {
        const A = X(w);
        return A && c.push(A), c;
      }, []);
      return i(m), l;
    });
  }, T = (a, y) => {
    var _;
    const v = n(R, { name: "FacetHeading", slot: t == null ? void 0 : t.FacetHeading, context: { data: a }, children: n("h3", { children: a.title }) }), p = a.buckets.map((h) => {
      var F;
      const l = Y(h, a, g), m = (c) => E(R, { name: "FacetBucketLabel", slot: t == null ? void 0 : t.FacetBucketLabel, context: { data: h }, children: [l, " ", c ? `(${c})` : ""] });
      switch ((F = a.buckets[0]) == null ? void 0 : F.__typename) {
        case "RangeBucket":
          return n(R, { name: "FacetBucket", slot: t == null ? void 0 : t.FacetBucket, context: { data: h }, children: n(le, { "data-testid": `${h.title}-radio`, label: m(), name: a.attribute, value: h.title, checked: h.selected, onChange: (c) => {
            D(c, a.attribute);
          } }) });
        case "ScalarBucket":
        case "CategoryView":
          return n(R, { name: "FacetBucket", slot: t == null ? void 0 : t.FacetBucket, context: { data: h }, children: n(re, { id: `${a.attribute}-${h.title.replace(/[^a-zA-Z0-9_-]/g, "")}`, "data-testid": `${h.title}-checkbox`, label: m(h.count), name: `${a.attribute}-${h.title.replace(/[^a-zA-Z0-9_-]/g, "")}`, value: h.title, checked: h.selected, onChange: (c) => {
            D(c, a.attribute);
          } }) });
        default:
          return null;
      }
    }).filter((h) => h !== null), S = ((_ = a.buckets[0]) == null ? void 0 : _.__typename) === "RangeBucket" ? "radiogroup" : "group";
    return n(se, { header: v, buckets: p, last: y === o.length - 1, groupRole: S });
  }, z = () => n(R, { name: "Facets", slot: t == null ? void 0 : t.Facets, context: { data: o }, children: o.map((a, y) => a.buckets.length > 0 ? n(G, { children: n(R, { name: "Facet", slot: t == null ? void 0 : t.Facet, context: { data: a }, children: T(a, y) }) }) : null) }), V = () => {
    const a = o.reduce((v, p) => (p.buckets.filter((S) => S.selected).length > 0 && v.push(p), v), []), y = a.map((v) => v.buckets.map((p) => {
      if (p.selected) {
        const S = Y(p, v, g);
        return n(J, { "data-testid": `${p.title}-selected-btn`, "aria-label": `Remove ${v.title} filter: ${p.title}`, variant: "secondary", children: E(G, { children: [n("span", { children: S }), n(te, { source: ue, size: "16" })] }), onClick: () => {
          L(v, p.title);
        } });
      }
      return null;
    })), _ = y.length > 0 ? n(J, { variant: "secondary", "aria-label": r.clearAllFilters, onClick: () => {
      B();
    }, children: n("span", { children: r.clearAll }) }) : null;
    return E(R, { name: "SelectedFacets", slot: t == null ? void 0 : t.SelectedFacets, context: { data: a }, children: [y, _] });
  };
  return U(() => {
    const a = H.on("search/result", P, { eager: !0, scope: e });
    return () => {
      a == null || a.off();
    };
  }, [e]), U(() => {
    if (f !== null) return d.current && clearTimeout(d.current), d.current = setTimeout(() => {
      b && s({ ...b, filter: f, currentPage: 1 }), i(null);
    }, 150), () => {
      d.current && clearTimeout(d.current);
    };
  }, [f, b]), n(ce, { selectedFacets: V(), facets: z() });
};
we.displayName = "Facets";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Pe = ({ scope: e, onPageChange: t }) => {
  const [r, o] = $(), [u, g] = $(), [x, b] = $({});
  return U(() => {
    const f = H.on("search/result", (i) => {
      var d, s, P, C;
      b(i.request), o((s = (d = i.result) == null ? void 0 : d.pageInfo) == null ? void 0 : s.currentPage), g((C = (P = i.result) == null ? void 0 : P.pageInfo) == null ? void 0 : C.totalPages);
    }, { eager: !0, scope: e });
    return () => {
      f == null || f.off();
    };
  }, [e]), !r || !u ? null : n(ne, { currentPage: r, totalPages: u, onChange: async (f) => {
    t == null || t(f), O({ ...x, currentPage: f }, { scope: e });
  } });
};
Pe.displayName = "Pagination";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Re = (e) => new DOMParser().parseFromString(e, "text/html").documentElement.textContent, j = (e, t = "") => e.name !== null ? Re(e.name) ?? t : t, $e = ({ product: e }) => {
  var t, r, o, u, g, x, b, k, f;
  let i = ((o = (r = (t = e.price) == null ? void 0 : t.regular) == null ? void 0 : r.amount) == null ? void 0 : o.currency) ?? "USD";
  Intl.supportedValuesOf("currency").includes(i) || (i = "USD");
  const d = (x = (g = (u = e.price) == null ? void 0 : u.final) == null ? void 0 : g.amount) == null ? void 0 : x.value, s = (f = (k = (b = e.price) == null ? void 0 : b.regular) == null ? void 0 : k.amount) == null ? void 0 : f.value;
  return d !== void 0 && s !== void 0 && d < s ? E("div", { class: "product-price", children: [n("span", { class: "regular-price-normal", children: n(q, { amount: d, currency: i }) }), n("span", { class: "special-price-crossed", children: n(q, { amount: s, currency: i }) })] }) : n(q, { amount: s, currency: i });
}, Fe = ({ product: e }) => {
  var t, r, o, u, g, x, b, k, f, i, d, s;
  let P = ((u = (o = (r = (t = e.priceRange) == null ? void 0 : t.minimum) == null ? void 0 : r.regular) == null ? void 0 : o.amount) == null ? void 0 : u.currency) ?? "USD";
  Intl.supportedValuesOf("currency").includes(P) || (P = "USD");
  const C = (x = (g = e.priceRange) == null ? void 0 : g.minimum) == null ? void 0 : x.final.amount.value, L = (k = (b = e.priceRange) == null ? void 0 : b.minimum) == null ? void 0 : k.regular.amount.value, B = (i = (f = e.priceRange) == null ? void 0 : f.maximum) == null ? void 0 : i.final.amount.value, D = (s = (d = e.priceRange) == null ? void 0 : d.maximum) == null ? void 0 : s.regular.amount.value;
  return C < L || B < D ? E("div", { class: "product-price", children: [n("span", { class: "regular-price-normal", children: n(q, { display: "from to", minimumAmount: C, maximumAmount: B, currency: P }) }), n("span", { class: "special-price-crossed", children: n(q, { display: "from to", minimumAmount: L, maximumAmount: D, currency: P }) })] }) : n(q, { display: "from to", minimumAmount: L, maximumAmount: D, currency: P });
}, Ce = ({ routeProduct: e, scope: t, slots: r, imageWidth: o = 400, imageHeight: u = 450, skeletonCount: g = 8, showRating: x = !1, onSearchResult: b }) => {
  const k = t === "popover" ? me : ve, f = W({ noResults: "Search.PLP.noResults", searchError: "Search.PLP.searchError" }), [i, d] = $(null), [s, P] = $([]), [C, L] = $(!1), [B, D] = $(null);
  U(() => {
    const l = H.on("search/loading", L, { eager: !0, scope: t }), m = H.on("search/error", () => {
      D(f.searchError);
    }, { eager: !0, scope: t }), c = H.on("search/result", (w) => {
      var A, I, N;
      D(((A = w.result) == null ? void 0 : A.items.length) < 1 ? f.noResults : null), d(w.request), P((I = w.result) == null ? void 0 : I.items), b == null || b((N = w.result) == null ? void 0 : N.items), w.request.phrase ? pe(k) : ge(k);
    }, { eager: !0, scope: t });
    return () => {
      l == null || l.off(), m == null || m.off(), c == null || c.off();
    };
  }, []);
  const T = (l, m) => {
    var c;
    const w = (c = l.target) == null ? void 0 : c.closest("a");
    if (!w || !e) return;
    const A = new URL(w.href), I = new URL(e(m), window.location.origin);
    A.pathname === I.pathname && A.hostname === I.hostname && he(m.sku, k);
  }, z = (l, m) => {
    var c, w, A, I;
    const N = { loading: m < 8 ? "eager" : "lazy", src: ((w = (c = l.images) == null ? void 0 : c[0]) == null ? void 0 : w.url) || "", alt: ((I = (A = l.images) == null ? void 0 : A[0]) == null ? void 0 : I.label) || "", width: o, height: u, params: { width: o } }, M = j(l, l.sku), Z = n(ae, { class: "product-discovery-product-item__image", ...N, "aria-label": M || "" });
    return n(R, { name: "ProductImage", slot: r == null ? void 0 : r.ProductImage, context: { product: l, defaultImageProps: N, variables: i }, children: e ? n("a", { href: e(l), "aria-label": M, children: Z }) : Z });
  }, V = (l) => {
    const m = j(l);
    return n(R, { name: "ProductName", slot: r == null ? void 0 : r.ProductName, context: { product: l, variables: i }, children: e ? n("a", { href: e(l), children: m }) : m });
  }, a = (l) => {
    if (!(!x || !l.rating && !(r != null && r.ProductRating))) return n(R, { name: "ProductRating", slot: r == null ? void 0 : r.ProductRating, context: { product: l, variables: i }, children: l.rating && n(oe, { rating: l.rating.value, reviewCount: l.rating.count, size: "small", showCount: !0, valueDisplay: "value", countDisplay: "parentheses" }) });
  }, y = (l) => E("div", { children: [a(l), V(l)] }), _ = (l) => {
    const m = j(l, l.sku), c = l.typename === "ComplexProductView" ? n(Fe, { product: l }) : n($e, { product: l });
    return n(R, { name: "ProductPrice", slot: r == null ? void 0 : r.ProductPrice, context: { product: l, variables: i }, children: e ? n("a", { href: e(l), "aria-label": m, children: c }) : c });
  }, v = (l) => n(R, { name: "ProductActions", slot: r == null ? void 0 : r.ProductActions, context: { product: l, variables: i } }), p = () => n(R, { name: "NoResults", slot: r == null ? void 0 : r.NoResults, context: { error: B, variables: i }, children: B && n(de, { alertMessage: B }) }), S = () => n(Q, { imageWidth: o, imageHeight: u, productList: Array.from({ length: g }).map((l, m) => n(K, { initialized: !1 }, m)) }), h = () => n(R, { name: "Header", slot: r == null ? void 0 : r.Header, context: { products: s, variables: i } }), F = () => n(R, { name: "Footer", slot: r == null ? void 0 : r.Footer, context: { products: s, variables: i } });
  return n("div", { children: C ? S() : B ? p() : n(Q, { header: h(), footer: F(), imageWidth: o, imageHeight: u, productList: s.map((l, m) => n(K, { image: z(l, m), titleNode: y(l), price: _(l), actionButton: r != null && r.ProductActions ? v(l) : void 0, onClick: (c) => T(c, l), initialized: !0 }, l.id || l.sku || m)) }) });
};
Ce.displayName = "SearchResults";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ae = ({ scope: e, onSortChange: t }) => {
  const r = W({ sortLabel: "Search.SortBy.title", lowToHigh: "Search.SortBy.lowToHigh", highToLow: "Search.SortBy.highToLow", relevance: "Search.SortBy.relevance", position: "Search.SortBy.position", name: "Search.SortBy.name", price: "Search.SortBy.price" }), [o, u] = $([]), [g, x] = $("relevance_DESC"), [b, k] = $({});
  U(() => {
    const i = H.on("search/result", (d) => {
      var s, P;
      if (k(d.request), (P = (s = d.result) == null ? void 0 : s.metadata) != null && P.sortableAttributes && (u([...d.result.metadata.sortableAttributes]), d.request.sort)) {
        const C = qe(d.request.sort);
        C && x(C);
      }
    }, { eager: !0, scope: e });
    return () => {
      i == null || i.off();
    };
  }, [e]);
  const f = async (i) => {
    t == null || t(i[0]), O({ ...b, sort: i, currentPage: 1 }, { scope: e });
  };
  return n(ie, { required: !0, "aria-label": r.sortLabel, floatingLabel: r.sortLabel, ...Be(o, r), value: g, handleSelect: (i) => {
    const { value: d } = i.target, s = De(d);
    f(s);
  } });
};
function Be(e, t) {
  const r = { relevance: t.relevance, position: t.position, name: t.name, price: t.price }, o = [];
  return e.forEach((u, g) => {
    const x = r[u.attribute] || u.label;
    u.bidirectional ? o.splice(g + o.length, 0, { text: `${x}: ${t.lowToHigh}`, value: `${u.attribute}_ASC` }, { text: `${x}: ${t.highToLow}`, value: `${u.attribute}_DESC` }) : o.splice(g + o.length, 0, { text: x, value: `${u.attribute}_DESC` });
  }), { options: o };
}
function De(e) {
  const t = e.lastIndexOf("_");
  return [{ attribute: e.substring(0, t), direction: e.substring(t + 1) === "ASC" ? "ASC" : "DESC" }];
}
function qe(e) {
  return e.length > 0 && e[0] ? `${e[0].attribute}_${e[0].direction}` : "";
}
Ae.displayName = "SortBy";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, t) {
  try {
    if (typeof document < "u") {
      const r = t.styleId;
      if (document.querySelector(`style[data-dropin="${r}"]`)) return;
      const o = document.createElement("style");
      for (const g in t.attributes) o.setAttribute(g, t.attributes[g]);
      o.setAttribute("data-dropin", r), o.appendChild(document.createTextNode(e));
      const u = document.querySelector('style[data-dropin="sdk"]');
      if (u) u.after(o);
      else {
        const g = document.querySelector('link[rel="stylesheet"], style');
        g ? g.before(o) : document.head.append(o);
      }
    }
  } catch (r) {
    console.error("dropin-styles (injectCodeFunction)", r);
  }
})(".product-discovery-facet-list{display:flex;flex-direction:column;width:100%}.product-discovery-facet-list__selected-filters{display:flex;flex-direction:row;flex-wrap:wrap;row-gap:var(--spacing-xxsmall);padding:0 0 var(--spacing-xxsmall) 0}.product-discovery-facet-list__selected-filters button{padding:0 var(--spacing-xxsmall);margin:0 var(--spacing-xxsmall);border-radius:var(--shape-border-radius-2)}.product-discovery-facet-list__selected-filters .dropin-price-range .dropin-price--small.dropin-price--bold{font:var(--type-button-2-font)}.product-discovery-facet-list__facet-options{text-align:left}.product-discovery-facet-list__facet-options button{padding:0}.product-discovery-facet-list__facet-options .dropin-radio-button{padding:var(--spacing-xxsmall) 0}.product-discovery-facet-list__facet-options--hidden{display:none}.product-discovery-facet-list .dropin-divider{margin:var(--spacing-xsmall) 0 var(--spacing-xsmall) 0}.product-discovery-product-list{container-type:inline-size;display:flex;flex-direction:column;width:100%}.product-discovery-product-list__container{display:flex;flex-direction:column;width:100%}.product-discovery-product-list__grid{display:grid;grid-template-columns:1fr;gap:var(--spacing-small)}.product-discovery-product-list__grid .dropin-product-item-card{margin:unset;width:100%}.product-discovery-product-list__grid .dropin-product-item-card img,.product-discovery-product-list__grid .dropin-product-item-card__skeleton__image{aspect-ratio:var(--imageWidth) / var(--imageHeight);max-height:unset;height:unset}.product-discovery-product-list [data-slot=ProductRating] .dropin-star-rating{margin-bottom:var(--spacing-xsmall)}.product-discovery-product-list .product-price{display:flex;gap:8px}.product-discovery-product-list .special-price-crossed{text-decoration:line-through;opacity:.5}@container (min-width: 600px){.product-discovery-product-list__grid{grid-template-columns:repeat(2,1fr)}}@container (min-width: 900px){.product-discovery-product-list__grid{grid-template-columns:repeat(3,1fr)}}@container (min-width: 1200px){.product-discovery-product-list__grid{grid-template-columns:repeat(4,1fr)}}.product-discovery-search-alert-message__wrapper{display:flex;flex-direction:column;justify-content:center;width:100%;min-height:300px}.product-discovery-search-alert-message__content{display:flex;justify-content:center}.product-discovery-facet{padding-block:var(--spacing-small)}.product-discovery-facet:not(.product-discovery-facet--last){border-bottom:1px solid var(--color-neutral-400)}.product-discovery-facet__header{display:block;margin-block-end:var(--spacing-xsmall)}.product-discovery-facet__header :where(h1,h2,h3,h4,h5,h6){margin:0;font:inherit;font-weight:inherit}.product-discovery-facet__bucket .dropin-price-range .dropin-price--small.dropin-price--bold{font:var(--type-body-2-default-font)}.product-discovery-facet__bucket .dropin-radio-button__label:before{margin-right:var(--spacing-xsmall)}", { styleId: "storefront-product-discovery" });
export {
  we as Facets,
  Pe as Pagination,
  Ce as SearchResults,
  Ae as SortBy
};
//# sourceMappingURL=containers.js.map
