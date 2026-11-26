/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as O, useEffect as B, useCallback as dt, useMemo as nt, jsxs as it, jsx as o, Fragment as bt, useRef as Tt } from "@dropins/tools/preact-bundle.js";
import { Slot as U, toLanguageTag as ft, classes as mt } from "@dropins/tools/lib.js";
import { Incrementer as Jt, Button as Mt, Icon as Nt, Breadcrumbs as Ut, Image as xt, StarRating as Ne } from "@dropins/tools/components.js";
import { i as Yt, t as Kt, c as Ue, b as kt, S as Wt, G as Zt, D as Xt, C as te, P as ze, a as Te, d as zt, O as Be, Z as $e, H as je } from "./chunks/components.js";
import "@dropins/tools/preact.js";
import { config as gt, g as ee, c as Ve, d as Re, i as yt, m as oe, e as Et, fetchProductData as It, b as ae, a as le, s as Dt, t as Qe, p as Le, getFetchedProductData as H, getProductConfigurationValues as ne, setProductConfigurationValues as tt, setProductConfigurationValid as Bt, R as qe, f as Me } from "./api.js";
import { events as T } from "@dropins/tools/event-bus.js";
import { p as ut, u as $t, g as Pt, a as Gt } from "./chunks/useProductData.js";
import { g as vt, i as ie, a as re, b as se } from "./chunks/videoUtils.js";
import { useText as pt } from "@dropins/tools/i18n.js";
import "./fragments.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
function Ee(s, e) {
  const n = !!(e && Object.keys(e).length > 0);
  return (s ?? []).map((t) => {
    var r, c, h, w, l, u, d;
    if (t.type === "image") return { type: "image", node: o(xt, { title: t.label, alt: t.label, src: t.url, width: ((r = e == null ? void 0 : e.imageParams) == null ? void 0 : r.width) ?? 960, height: ((c = e == null ? void 0 : e.imageParams) == null ? void 0 : c.height) ?? 1191, params: (e == null ? void 0 : e.imageParams) ?? { width: 960 } }, t.url), ...n && { thumbnail: o(xt, { title: t.label, alt: t.label, src: t.url, width: ((h = e == null ? void 0 : e.thumbnailParams) == null ? void 0 : h.width) ?? 200, height: ((w = e == null ? void 0 : e.thumbnailParams) == null ? void 0 : w.height) ?? 248, params: (e == null ? void 0 : e.thumbnailParams) ?? { width: 200 } }, t.url) } };
    const b = vt(t.url, (l = t.preview) == null ? void 0 : l.url), i = ((u = e == null ? void 0 : e.imageParams) == null ? void 0 : u.width) ?? 960, _ = ((d = e == null ? void 0 : e.imageParams) == null ? void 0 : d.height) ?? 1191, y = t.title || "Product video";
    return { type: "video", node: ie(t.url) ? it("video", { className: "pdp-product-gallery__video", controls: !0, preload: "metadata", poster: b, width: i, height: _, children: [o("source", { src: t.url, type: re(t.url) }), "Your browser does not support the video tag."] }, t.url) : o("iframe", { className: "pdp-product-gallery__video-iframe", src: se(t.url), title: y, width: i, height: _, loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: !0 }), ...n && { thumbnail: it("span", { className: "pdp-product-gallery__video-thumbnail", role: "img", "aria-label": `Play video: ${y}`, children: [b ? o("img", { src: b, alt: "", loading: "lazy", "aria-hidden": "true" }) : o("span", { className: "pdp-product-gallery__video-thumbnail-placeholder", "aria-hidden": "true" }), o("span", { className: "pdp-product-gallery__video-icon", "aria-hidden": "true", children: "▶" })] }) } };
  });
}
const de = ({ sku: s, hideSku: e, hideQuantity: n, hideShortDescription: t, hideDescription: r, hideAttributes: c, hideURLParams: h, hideSelectedOptionValue: w, slots: l, children: u, initialData: d, carousel: b, optionsConfig: i, useACDL: _, onAddToCart: y, zoomType: I, closeButton: g = !0, disableDropdownPreselection: S, ...P }) => {
  var C, et, L, rt, N, V, q, z, ot;
  const F = pt("PDP.Product.AddToCart.label").label, G = pt("PDP.Product.Incrementer.label").label, ct = pt("PDP.Product.Details.label").label, D = pt("PDP.Swatches.ChooseOption.label").label, [Y, st] = O(gt.getConfig().defaultLocale || "en-US"), [K, A] = O(), [a = null, ht] = O(d), [M, at] = O(() => {
    const m = ee(1), v = { sku: s, quantity: m };
    if (a != null && a.optionUIDs && (v.optionsUIDs = a.optionUIDs), a != null && a.isBundle && a != null && a.options) {
      const p = Ve(a.options, a.optionUIDs ?? []);
      v.bundleOptionQuantities = p, v.enteredOptions = Re(p);
    }
    return v;
  }), [jt, wt] = O(() => {
    var m;
    return (m = a == null ? void 0 : a.options) != null && m.length ? yt(a.options, a.optionUIDs, a.isBundle) : !0;
  }), R = { data: a, values: M, valid: jt };
  function Vt(m) {
    return m == null ? void 0 : m.some((v) => (v == null ? void 0 : v.typename) === "ProductViewOptionValueProduct");
  }
  B(() => {
    const m = T.on("pdp/data", (p) => {
      p && (ht(p), at((x) => {
        const f = { ...x, sku: p.sku, enteredOptions: x.sku === p.sku ? x.enteredOptions : void 0, optionsUIDs: ut(p, x.optionsUIDs, p.optionUIDs) };
        if (p.isBundle && p.options) {
          const k = oe(x.sku === p.sku ? x.bundleOptionQuantities : void 0, p.options, p.optionUIDs ?? []);
          f.bundleOptionQuantities = k, f.enteredOptions = Et(f.enteredOptions, x.sku === p.sku ? x.bundleOptionQuantities : void 0, k);
        } else x.sku !== p.sku && (f.bundleOptionQuantities = void 0);
        return f;
      }));
    }), v = T.on("pdp/setValues", (p) => {
      at((x) => ({ ...x, ...p }));
    });
    return () => {
      v == null || v.off(), m == null || m.off();
    };
  }, []), B(() => {
    const m = T.on("locale", (v) => {
      v !== Y && (st(v), It(s, { preselectFirstOption: !S, anchors: i == null ? void 0 : i.anchorOptions }).then(ht));
    });
    return () => {
      m == null || m.off();
    };
  }, [S, Y, i == null ? void 0 : i.anchorOptions, s]), B(() => {
    _ && d && Object.keys(d).length > 0 && ae(d);
  }, [d]);
  const Rt = dt((m) => {
    at((v) => ({ ...v, ...m }));
  }, []), xe = dt((m, v) => {
    var p;
    const x = (p = a == null ? void 0 : a.options) == null ? void 0 : p.flatMap((f) => f.items).find((f) => f.id === m);
    x != null && x.canEditQuantity && at((f) => {
      const k = { ...f.bundleOptionQuantities ?? {}, [m]: v };
      return { ...f, bundleOptionQuantities: k, enteredOptions: Et(f.enteredOptions, f.bundleOptionQuantities, k) };
    });
  }, [a == null ? void 0 : a.options]);
  B(() => {
    T.emit("pdp/values", M);
  }, [JSON.stringify(M)]);
  const ke = dt(async (m) => {
    var v;
    const p = Object.fromEntries(Object.entries(m).filter(([, k]) => k.label !== D)), x = le(p, a == null ? void 0 : a.options);
    !h && a != null && a.options && !Vt(a.options) && Dt({ optionsUIDs: x.join(",") }), at((k) => ({ ...k, optionsUIDs: ut(a, k.optionsUIDs, x) }));
    const f = await It(s, { anchors: i == null ? void 0 : i.anchorOptions, isBundle: a == null ? void 0 : a.isBundle, optionsUIDs: x, preselectFirstOption: !S });
    ht(f), wt(yt(f == null ? void 0 : f.options, (f == null ? void 0 : f.optionUIDs) ?? x, f == null ? void 0 : f.isBundle)), (v = i == null ? void 0 : i.anchorOptions) != null && v.length && Ie(f, x);
  }, [s]), Ie = dt((m, v) => {
    const p = (m == null ? void 0 : m.optionUIDs) ?? [];
    v.every((x) => p.includes(x)) || (A(m == null ? void 0 : m.options), at((x) => ({ ...x, optionsUIDs: ut(a, x.optionsUIDs, p) })), wt(yt(m == null ? void 0 : m.options, p, m == null ? void 0 : m.isBundle)));
  }, [s]), Qt = dt((m) => {
    Object.keys(m).length !== 0 && wt(!1);
  }, []), St = nt(() => {
    var m;
    return (m = a == null ? void 0 : a.attributes) == null ? void 0 : m.map(({ label: v, value: p, id: x }, f) => {
      if (x === "ac_giftcard" || x === "ac_customizable_options") return "";
      const k = Yt(p) ? Kt(p, Y) : p.toString();
      return it("li", { children: [v, ": ", o("span", { dangerouslySetInnerHTML: { __html: k } })] }, f);
    });
  }, [a == null ? void 0 : a.attributes, Y]), De = !n && a != null && a.inStock ? o(U, { name: "Quantity", slot: l == null ? void 0 : l.Quantity, context: { ...R }, children: o(Jt, { name: "quantity", defaultValue: M.quantity.toString(), value: M.quantity.toString(), min: 1, "aria-label": G, className: "pdp-product__quantity", onValue: (m) => {
    const v = Number(m);
    Rt({ quantity: v }), !h && a != null && a.options && (Vt(a.options) || Dt({ quantity: v }));
  } }, "quantity") }) : void 0, Pe = () => {
    if (a != null && a.options) return o(U, { name: "Options", slot: l == null ? void 0 : l.Options, context: { ...R }, children: o(Wt, { selectedUIDs: M.optionsUIDs, options: a.options, defaultOptions: M.optionsUIDs, selectionsToUpdate: K, hideSelectedValue: w, disablePreselections: S, onValues: ke, onErrors: Qt, bundleOptionQuantities: M.bundleOptionQuantities, onBundleOptionQuantityChange: xe }) });
  }, Oe = () => {
    if (a != null && a.attributes) {
      const m = a.attributes.filter((v) => v.id === "ac_giftcard");
      if (m.length > 0) {
        const v = m.map((p, x) => {
          var f;
          try {
            const k = JSON.parse(p.value), E = M.enteredOptions || [], W = ((f = k.options) == null ? void 0 : f.map(($) => {
              const Q = E.find((j) => j.uid === $.uid);
              return { id: $.uid, value: (Q == null ? void 0 : Q.value) || "" };
            })) || [];
            return o(Zt, { options: k.options || [], optionValues: W, onOptionChange: ($, Q) => {
              var j;
              const Z = M.enteredOptions || [], lt = Z.findIndex((J) => J.uid === $);
              let X;
              if (lt !== -1 ? X = Z.map((J) => J.uid === $ ? { ...J, value: Q } : J) : X = [...Z, { uid: $, value: Q }], Rt({ enteredOptions: X }), a) {
                const J = { ...a }, Ct = ((j = J.attributes) == null ? void 0 : j.map((_t) => {
                  var Lt;
                  if (_t.id === "ac_giftcard") try {
                    const qt = JSON.parse(_t.value), Ae = ((Lt = qt.options) == null ? void 0 : Lt.map((At) => At.uid === $ ? { ...At, value: Q } : At)) || [];
                    return { ..._t, value: JSON.stringify({ ...qt, options: Ae }) };
                  } catch {
                    return _t;
                  }
                  return _t;
                })) || [];
                J.attributes = Ct, ht(J);
              }
            }, onValidationChange: ($) => {
              $ || Qt({ giftCard: "Invalid gift card data" }), wt($);
            }, className: "pdp-product__gift-card-options" }, `giftcard-${x}`);
          } catch (k) {
            return console.warn("Invalid gift card data format:", k), null;
          }
        }).filter((p) => p !== null);
        return v.length > 0 ? o("div", { className: "pdp-product__gift-card-options-container", children: v }) : void 0;
      }
    }
  }, Se = () => {
    if (a != null && a.attributes) {
      const m = a.attributes.filter((v) => {
        var p;
        return v.id === "ac_downloadable" && ((p = v.roles) == null ? void 0 : p.includes("visible_in_pdp"));
      });
      if (m.length > 0) {
        const v = m.map((p, x) => {
          var f, k;
          try {
            const E = typeof p.value == "string" ? JSON.parse(p.value) : p.value;
            return o(Xt, { label: p.label, value: E, onLinkChange: (W, $) => {
              at((Q) => {
                const j = Q.optionsUIDs || [], Z = $ ? j.includes(W) ? j : [...j, W] : j.filter((lt) => lt !== W);
                return { ...Q, optionsUIDs: Z };
              });
            }, currency: (k = (f = a.prices) == null ? void 0 : f.final) == null ? void 0 : k.currency, className: "pdp-product__downloadable-options" }, `downloadable-${x}`);
          } catch (E) {
            return console.warn("Invalid downloadable data format:", E), null;
          }
        }).filter((p) => p !== null);
        return v.length > 0 ? o("div", { className: "pdp-product__downloadable-options-container", children: v }) : void 0;
      }
    }
  }, Ce = () => {
    if (a != null && a.attributes) {
      const m = a.attributes.filter((v) => v.id === "ac_customizable_options");
      if (m.length > 0) {
        const v = m.map((p, x) => {
          var f, k, E, W;
          try {
            const $ = typeof p.value == "string" ? JSON.parse(p.value) : p.value, Q = Le($);
            return !((f = Q.selectable) != null && f.length) && !((k = Q.shopperInput) != null && k.length) ? null : o(te, { options: Q.selectable, selectedUIDs: M.optionsUIDs || [], currency: (W = (E = a.prices) == null ? void 0 : E.final) == null ? void 0 : W.currency, shopperInput: Q.shopperInput, enteredOptions: M.enteredOptions, onEnteredValueChange: (j, Z) => {
              at((lt) => ({ ...lt, enteredOptions: [...(lt.enteredOptions || []).filter((X) => X.uid !== j), ...Z === "" ? [] : [{ uid: j, value: Z }]] }));
            }, onValueToggle: (j, Z) => {
              at((lt) => {
                const X = lt.optionsUIDs || [], J = Z ? X.includes(j) ? X : [...X, j] : X.filter((Ct) => Ct !== j);
                return { ...lt, optionsUIDs: J };
              });
            }, className: "pdp-product__customizable-options" }, `customizable-options-${x}`);
          } catch ($) {
            return console.warn("Invalid customizable options data format:", $), null;
          }
        }).filter((p) => p !== null);
        return v.length > 0 ? o("div", { className: "pdp-product__customizable-options-container", children: v }) : void 0;
      }
    }
  };
  return o("div", { ...P, children: o(Ue, { title: o(U, { name: "Title", slot: l == null ? void 0 : l.Title, context: { ...R }, children: a == null ? void 0 : a.name }), sku: e ? void 0 : o(U, { name: "SKU", slot: l == null ? void 0 : l.SKU, context: { ...R }, children: a == null ? void 0 : a.sku }), options: Pe(), giftCardOptions: Oe(), downloadableOptions: Se(), customizableOptions: Ce(), breadcrumbs: (l == null ? void 0 : l.Breadcrumbs) && o(U, { name: "Breadcrumbs", slot: l == null ? void 0 : l.Breadcrumbs, context: { ...R, setSeparator(m) {
    this._registerMethod((...v) => {
      const p = m(...v), x = p && o(Nt, { source: p });
      this._setProps((f) => ({ ...f, separator: x, children: [o(Ut, { separator: x, categories: f.categories })] }));
    });
  }, appendLink(m) {
    this._registerMethod((...v) => {
      const { text: p, ...x } = m(...v), f = o("a", { ...x, children: p });
      this._setProps((k) => {
        const E = [...k.categories || [], f];
        return { ...k, categories: E, children: [o(Ut, { separator: k.separator, categories: E })] };
      });
    });
  }, appendHTMLElement(m) {
    this._registerMethod((...v) => {
      const p = m(...v), x = this._htmlElementToVNode(p);
      this._setProps((f) => {
        const k = [...f.categories || [], x];
        return { ...f, categories: k, children: [o(Ut, { separator: f.separator, categories: k })] };
      });
    });
  } } }), quantity: De, actions: o(U, { name: "Actions", slot: l == null ? void 0 : l.Actions, context: { ...R, appendButton(m) {
    this._registerMethod((...v) => {
      const p = m(...v);
      if (!p) return;
      const { text: x, icon: f, ...k } = p, E = o(Mt, { type: "button", ...k, icon: f && o(Nt, { source: f }), children: x });
      this._setProps((W) => ({ children: [...W.children || [], E] }));
    });
  } }, children: !(l != null && l.Actions) && o(Mt, { size: "medium", type: "submit", icon: o(Nt, { source: "Cart" }), disabled: !(a != null && a.inStock) || !jt, "aria-label": F, onClick: () => y == null ? void 0 : y(M), children: F }) }), shortDescription: t ? void 0 : o(U, { name: "ShortDescription", slot: l == null ? void 0 : l.ShortDescription, context: { ...R }, children: o("div", { dangerouslySetInnerHTML: { __html: (a == null ? void 0 : a.shortDescription) ?? "" } }) }), description: r ? void 0 : o(U, { name: "Description", slot: l == null ? void 0 : l.Description, context: { ...R }, children: o("div", { dangerouslySetInnerHTML: { __html: (a == null ? void 0 : a.description) ?? "" } }) }), media: Ee(a == null ? void 0 : a.gallery, b), specialPrice: (C = a == null ? void 0 : a.prices) != null && C.visible ? o(U, { name: "SpecialPrice", slot: l == null ? void 0 : l.SpecialPrice, context: { ...R }, children: o(kt, { ...(et = a.prices) == null ? void 0 : et.final, locale: ft(Y) }) }) : void 0, price: (L = a == null ? void 0 : a.prices) != null && L.visible && (rt = a == null ? void 0 : a.prices) != null && rt.regular && ((V = (N = a == null ? void 0 : a.prices) == null ? void 0 : N.final) == null ? void 0 : V.amount) !== ((z = (q = a == null ? void 0 : a.prices) == null ? void 0 : q.regular) == null ? void 0 : z.amount) ? o(U, { name: "RegularPrice", slot: l == null ? void 0 : l.RegularPrice, context: { ...R }, children: o(kt, { ...(ot = a.prices) == null ? void 0 : ot.regular, locale: ft(Y) }) }) : void 0, zoomType: I, closeButton: g, carouselConfig: { ...b }, outOfStock: !(a != null && a.inStock), attributes: c ? void 0 : o(U, { name: "Attributes", slot: l == null ? void 0 : l.Attributes, context: { ...R }, children: St != null && St.length ? it(bt, { children: [ct, o("ul", { children: St })] }) : null }), galleryContent: (l == null ? void 0 : l.GalleryContent) && o(U, { name: "GalleryContent", slot: l.GalleryContent, context: { ...R } }), infoContent: (l == null ? void 0 : l.InfoContent) && o(U, { name: "InfoContent", slot: l.InfoContent, context: { ...R } }), productContent: (l == null ? void 0 : l.Content) && o(U, { name: "Content", slot: l.Content, context: { ...R } }) }) });
};
de.getInitialData = async function({ sku: s, disableDropdownPreselection: e = !1, optionsConfig: n }) {
  var t, r;
  const c = (r = (t = gt.getConfig().models) == null ? void 0 : t.ProductDetails) == null ? void 0 : r.initialData;
  return c ? Qe(c) : It(s, { preselectFirstOption: !e, anchors: n == null ? void 0 : n.anchorOptions });
};
de.displayName = "ProductDetails";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const pe = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  var r, c, h, w, l, u, d, b, i, _, y;
  const { globalLocale: I = "en-US" } = gt.getConfig(), [g, S] = O(s), [P, C] = O(I);
  return B(() => {
    const et = T.on("pdp/data", S, { scope: e }), L = T.on("locale", C);
    return () => {
      et == null || et.off(), L == null || L.off();
    };
  }, [e]), !g || !g.prices ? null : o(ze, { ...t, specialPrice: (r = g.prices) != null && r.visible ? o(kt, { ...(c = g.prices) == null ? void 0 : c.final, locale: ft(P) }) : void 0, price: (h = g.prices) != null && h.visible && (w = g.prices) != null && w.regular && ((l = g.prices) == null ? void 0 : l.final.amount) !== ((u = g.prices) == null ? void 0 : u.regular.amount) ? o(kt, { ...(d = g.prices) == null ? void 0 : d.regular, locale: ft(P) }) : void 0, tiers: (b = g.prices) != null && b.visible && ((_ = (i = g.prices) == null ? void 0 : i.tiers) == null ? void 0 : _.length) > 0 ? o(Te, { tiers: g.prices.tiers, locale: ft(P), regularPrice: (y = g.prices.regular) == null ? void 0 : y.amount }) : void 0 });
};
pe.getInitialData = H;
pe.displayName = "ProductPrice";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ce = ({ initialData: s = { data: null, optionsUIDs: [] }, scope: e, hideSelectedValue: n = !1, transformer: t, slots: r, onValues: c, onErrors: h, children: w, ...l }) => {
  var u;
  const [d, b] = O(s.data), [i, _] = O(s.optionsUIDs), [y, I] = O({}), [g, S] = O(), P = pt("PDP.Swatches.ChooseOption.label").label, C = nt(() => {
    if (d != null && d.options) {
      if (!t) return d.options;
      try {
        return t(d.options) ?? d.options;
      } catch (N) {
        return console.error("ProductOptions: transformer threw an error, using original options", N), d.options;
      }
    }
  }, [d == null ? void 0 : d.options, t]);
  B(() => {
    const N = T.on("pdp/data", b, { scope: e }), V = T.on("pdp/values", ({ optionsUIDs: q, bundleOptionQuantities: z }) => {
      q && _(q), z && I(z);
    }, { scope: e });
    return () => {
      N == null || N.off(), V == null || V.off();
    };
  }, []);
  const et = dt(async (N) => {
    var V;
    if (!(d != null && d.sku)) return;
    const { persistURLParams: q, anchors: z, acdl: ot } = gt.getConfig() ?? {}, F = Object.fromEntries(Object.entries(N).filter(([, A]) => A.label !== P)), G = le(F, C);
    q && !(d != null && d.isBundle) && Dt({ optionsUIDs: G.join(",") });
    const ct = ((V = ne({ scope: e })) == null ? void 0 : V.optionsUIDs) ?? [];
    ct.join("|") !== (ut(d, ct, G) ?? []).join("|") && !(d != null && d.isBundle) && tt((A) => ({ ...A, optionsUIDs: ut(d, A.optionsUIDs, G) }), { scope: e }), c == null || c(G);
    const D = await It(d.sku, { optionsUIDs: G ?? [], isBundle: d == null ? void 0 : d.isBundle, anchors: z });
    T.emit("pdp/data", D, { scope: e });
    const Y = (A) => {
      !(d != null && d.isBundle) || !(D != null && D.options) || tt((a) => {
        const ht = oe(a.bundleOptionQuantities, D.options, A);
        return { ...a, optionsUIDs: ut(d, a.optionsUIDs, A), bundleOptionQuantities: ht };
      }, { scope: e });
    };
    let st = (D == null ? void 0 : D.optionUIDs) ?? G, K = yt(D == null ? void 0 : D.options, st, D == null ? void 0 : D.isBundle);
    if (z != null && z.length) {
      const A = (D == null ? void 0 : D.optionUIDs) ?? [];
      G.every((a) => A.includes(a)) || (S(D == null ? void 0 : D.options), st = A, d != null && d.isBundle || tt((a) => ({ ...a, optionsUIDs: ut(d, a.optionsUIDs, A) }), { scope: e }), K = yt(D == null ? void 0 : D.options, A, D == null ? void 0 : D.isBundle));
    }
    ct.join("|") !== st.join("|") && Y(st), Bt(() => K, { scope: e }), ot && D && (D == null ? void 0 : D.variantSku) !== d.sku && ae(D);
  }, [P, d, c, e, C]), L = dt((N, V) => {
    const q = C == null ? void 0 : C.flatMap((z) => z.items).find((z) => z.id === N);
    q != null && q.canEditQuantity && tt((z) => {
      const ot = { ...z.bundleOptionQuantities ?? {}, [N]: V };
      return { ...z, bundleOptionQuantities: ot };
    }, { scope: e });
  }, [e, C]), rt = dt((N) => {
    Object.keys(N).length !== 0 && (Bt(() => !1, { scope: e }), h == null || h(N));
  }, [h, e]);
  return !d || !C ? null : o(U, { name: "Swatches", slot: r == null ? void 0 : r.Swatches, context: { data: d, optionsUIDs: i }, children: o(Wt, { ...l, options: C, selectedUIDs: i, defaultOptions: i, selectionsToUpdate: g, hideSelectedValue: n, disablePreselections: !((u = gt.getConfig()) != null && u.preselectFirstOption), onValues: et, onErrors: rt, bundleOptionQuantities: y, onBundleOptionQuantityChange: L, imageSwatchNode: r != null && r.SwatchImage ? ({ imageSwatchContext: N, ...V }) => o(U, { name: "SwatchImage", slot: r == null ? void 0 : r.SwatchImage, slotTag: "span", contentTag: "span", context: { data: d, optionsUIDs: i, defaultImageProps: V, imageSwatchContext: N } }) : void 0 }) });
};
ce.getInitialData = async function(s) {
  var e;
  const n = await H({ scope: s == null ? void 0 : s.scope }), t = ((e = ne({ scope: s == null ? void 0 : s.scope })) == null ? void 0 : e.optionsUIDs) ?? [];
  return { data: n, optionsUIDs: t };
};
ce.displayName = "ProductOptions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ue = ({ initialData: s = null, scope: e, onValue: n, children: t, ...r }) => {
  const c = pt("PDP.Product.Incrementer.label").label, [h, w] = O(s), [l, u] = O(() => ee(1));
  B(() => {
    const b = T.on("pdp/data", w, { scope: e }), i = T.on("pdp/values", ({ quantity: _ }) => {
      u(_);
    }, { eager: !0, scope: e });
    return () => {
      b == null || b.off(), i == null || i.off();
    };
  }, [e]);
  const d = (b) => {
    const i = parseInt(b, 10);
    tt((y) => ({ ...y, quantity: i }), { scope: e });
    const { persistURLParams: _ } = gt.getConfig() ?? {};
    _ && Dt({ quantity: i }), n == null || n(i);
  };
  return h ? o(Jt, { name: "quantity", defaultValue: String(l), value: String(l), min: 1, "aria-label": c, onValue: d, ...r, className: mt(["pdp-quantity", r.className]) }, "quantity") : null;
};
ue.getInitialData = H;
ue.displayName = "ProductQuantity";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ge = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  const [r, c] = O(s);
  return B(() => {
    const h = T.on("pdp/data", c, { scope: e });
    return () => {
      h == null || h.off();
    };
  }, [e]), r ? o("div", { dangerouslySetInnerHTML: { __html: (r == null ? void 0 : r.shortDescription) ?? "" }, ...t, className: mt(["pdp-short-description", t.className]) }) : null;
};
ge.getInitialData = H;
ge.displayName = "ProductShortDescription";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const me = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  const [r, c] = O(s);
  return B(() => {
    const h = T.on("pdp/data", c, { scope: e });
    return () => {
      h == null || h.off();
    };
  }, [e]), r ? o("div", { dangerouslySetInnerHTML: { __html: (r == null ? void 0 : r.description) ?? "" }, ...t, className: mt(["pdp-description", t.className]) }) : null;
};
me.getInitialData = H;
me.displayName = "ProductDescription";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const he = ({ initialData: s = null, scope: e, children: n, slots: t, formatValue: r, ...c }) => {
  var h;
  const w = pt("PDP.Product.Details.label").label, { globalLocale: l = "en-US" } = gt.getConfig(), [u, d] = O(l), [b, i] = O(s), _ = nt(() => ({ data: b }), [b]);
  return B(() => {
    const y = T.on("pdp/data", i, { scope: e }), I = T.on("locale", d);
    return () => {
      y == null || y.off(), I == null || I.off();
    };
  }, [e]), b ? it("div", { ...c, className: mt(["pdp-attributes", c.className]), children: [o("h2", { className: "pdp-attributes__title", children: w }), t != null && t.Attributes ? o(U, { name: "Attributes", slot: t == null ? void 0 : t.Attributes, context: { ..._ } }) : o("ul", { children: (h = b == null ? void 0 : b.attributes) == null ? void 0 : h.map(({ id: y, label: I, value: g }, S) => {
    if (y != null && y.startsWith("ac_") || !g) return null;
    const P = Yt(g) ? Kt(g, u) : g.toString(), C = r ? r(P, y, I) : P;
    return it("li", { children: [I, ": ", o("span", { dangerouslySetInnerHTML: { __html: C } })] }, `attribute-${S}`);
  }) })] }) : null;
};
he.getInitialData = H;
he.displayName = "ProductAttributes";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ve = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  const { data: r, values: c } = $t({ scope: e, initialData: s, initialValues: { enteredOptions: [] } }), h = (u, d) => {
    const b = c.enteredOptions || [], i = b.findIndex((_) => _.uid === u) !== -1 ? b.map((_) => _.uid === u ? { ..._, value: d } : _) : [...b, { uid: u, value: d }];
    tt((_) => ({ ..._, enteredOptions: i }));
  }, w = (u) => {
    Bt(() => u);
  };
  if (!r) return null;
  const l = Pt(r, "ac_giftcard");
  return l.length === 0 ? null : o("div", { ...t, className: mt(["pdp-gift-card-options", t.className]), children: l.map((u, d) => {
    var b, i, _;
    return o(Zt, { options: ((b = u.value) == null ? void 0 : b.options) || [], className: t.className, optionValues: (c.enteredOptions || []).map((y) => ({ id: y.uid, value: y.value })), currency: (_ = (i = r.prices) == null ? void 0 : i.final) == null ? void 0 : _.currency, onOptionChange: h, onValidationChange: w }, `giftcard-${d}`);
  }) });
};
ve.getInitialData = H;
ve.displayName = "ProductGiftCardOptions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const _e = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  const { data: r, values: c } = $t({ scope: e, initialData: s, initialValues: { optionsUIDs: [] } }), h = (l, u) => {
    const d = c.optionsUIDs || [];
    let b;
    u ? d.includes(l) ? b = d : b = [...d, l] : b = d.filter((i) => i !== l), tt((i) => ({ ...i, optionsUIDs: b }));
  }, w = Pt(r, "ac_downloadable");
  return !r || w.length === 0 ? null : o("div", { ...t, className: mt(["pdp-downloadable-options", t.className]), children: w.map((l, u) => {
    var d, b;
    return o(Xt, { label: l.label, value: l.value, onLinkChange: h, currency: (b = (d = r.prices) == null ? void 0 : d.final) == null ? void 0 : b.currency, className: t.className }, `downloadable-${u}`);
  }) });
};
_e.getInitialData = H;
_e.displayName = "ProductDownloadableOptions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const be = ({ initialData: s = null, scope: e, children: n, ...t }) => {
  var r, c, h, w;
  const { data: l, values: u } = $t({ scope: e, initialData: s, initialValues: { optionsUIDs: [] } }), d = Tt(l);
  B(() => {
    var _;
    const y = d.current;
    if (y && l && y.sku !== l.sku) {
      const I = new Set((_ = Gt(y)) == null ? void 0 : _.shopperInput.map((g) => g.id));
      tt((g) => {
        var S;
        return { ...g, enteredOptions: (S = g.enteredOptions) == null ? void 0 : S.filter((P) => !I.has(P.uid)) };
      }, { scope: e });
    }
    d.current = l;
  }, [l, e]);
  const b = (_, y) => {
    tt((I) => {
      const g = I.optionsUIDs || [], S = y ? g.includes(_) ? g : [...g, _] : g.filter((P) => P !== _);
      return { ...I, optionsUIDs: S };
    }, { scope: e });
  };
  if (!l) return null;
  const i = Gt(l);
  return !((r = i == null ? void 0 : i.selectable) != null && r.length) && !((c = i == null ? void 0 : i.shopperInput) != null && c.length) ? null : o("div", { ...t, className: mt(["pdp-product-customizable-options", t.className]), children: o(te, { options: i.selectable, selectedUIDs: u.optionsUIDs || [], currency: (w = (h = l.prices) == null ? void 0 : h.final) == null ? void 0 : w.currency, onValueToggle: b, shopperInput: i.shopperInput, enteredOptions: u.enteredOptions, onEnteredValueChange: (_, y) => {
    tt((I) => ({ ...I, enteredOptions: [...(I.enteredOptions || []).filter((g) => g.uid !== _), ...y === "" ? [] : [{ uid: _, value: y }]] }), { scope: e });
  }, className: t.className }) });
};
be.getInitialData = H;
be.displayName = "ProductCustomizableOptions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ge = 3e3;
function He(s, { enabled: e = !0, timeoutMs: n = Ge } = {}) {
  const t = s.join("\0"), r = !e || s.length === 0, [c, h] = O(null), [w, l] = O(null);
  return B(() => {
    if (r) {
      h(t), l(null);
      return;
    }
    let u = !1, d = s.length, b = !1;
    const i = () => {
      u || (u = !0, b && l(t), h(t));
    }, _ = window.setTimeout(() => {
      b = !0, i();
    }, n), y = (I) => {
      u || (I && (b = !0), d -= 1, d <= 0 && (window.clearTimeout(_), i()));
    };
    return s.forEach((I) => {
      const g = new Image();
      g.src = I, typeof g.decode == "function" ? g.decode().then(() => y(!1)).catch(() => y(!0)) : (g.onload = () => y(!1), g.onerror = () => y(!0));
    }), () => {
      u = !0, window.clearTimeout(_);
    };
  }, [t, e, n, r]), { ready: r || c === t, error: w === t };
}
const Fe = 200, Ot = (s, e) => ((s == null ? void 0 : s.gallery) ?? []).filter((n) => e || n.type === "image").map((n) => n.type === "image" ? { type: "image", url: n.url, label: n.label } : { type: "video", url: n.url, label: n.title ?? "", preview: n.preview }), Je = (s, e) => Ot(s, e).flatMap((n) => {
  var t;
  const r = n.type === "image" ? n.url : vt(n.url, (t = n.preview) == null ? void 0 : t.url);
  return r ? [r] : [];
}), Ye = (s, e, n) => {
  if (s === e) return !0;
  if (!s || !e) return !1;
  const t = Ot(s, n), r = Ot(e, n);
  return t.length === r.length && t.every((c, h) => {
    var w, l;
    const u = r[h];
    return u ? c.type === u.type && c.url === u.url && (c.type !== "video" || u.type !== "video" || vt(c.url, (w = c.preview) == null ? void 0 : w.url) === vt(u.url, (l = u.preview) == null ? void 0 : l.url)) : !1;
  });
}, Ke = () => typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches, Ht = ({ data: s, videos: e, imageParams: n, thumbnailParams: t, zoom: r, slots: c, ImagesLabel: h, onZoom: w }) => {
  const l = nt(() => ({ data: s }), [s]), u = nt(() => Ot(s, e), [s, e]), d = nt(() => u.length > 0 ? u.map((i, _) => {
    const y = ({ ...g }) => {
      var S;
      const P = { title: i.label, src: i.url, alt: h == null ? void 0 : h.replace("{product}", i.label).replace("{key}", String(_ + 1)).replace("{total}", String(u.length)), width: (n == null ? void 0 : n.width) ?? 960, height: (n == null ? void 0 : n.height) ?? 1191, params: n ?? { width: 960 }, loading: _ === 0 ? "eager" : "lazy", ...g }, C = i.type === "video" ? vt(i.url, (S = i.preview) == null ? void 0 : S.url) : void 0;
      return o(U, { name: "CarouselMainImage", slot: c == null ? void 0 : c.CarouselMainImage, context: { ...l, defaultImageProps: P, mediaType: i.type, previewUrl: C }, children: i.type === "video" ? ie(i.url) ? it("video", { className: "pdp-product-gallery__video", controls: !0, preload: "metadata", poster: C, width: (n == null ? void 0 : n.width) ?? 960, height: (n == null ? void 0 : n.height) ?? 1191, children: [o("source", { src: i.url, type: re(i.url) }), "Your browser does not support the video tag."] }) : o("iframe", { className: "pdp-product-gallery__video-iframe", src: se(i.url), title: i.label || "Product video", width: (n == null ? void 0 : n.width) ?? 960, height: (n == null ? void 0 : n.height) ?? 1191, loading: "lazy", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture", allowFullScreen: !0 }) : o(xt, { ...P }) });
    }, I = w ? { onClick: () => w(_), onKeyDown: (g) => {
      (g.key === "Enter" || g.key === " ") && (g.preventDefault(), w(_));
    }, role: "button", tabIndex: 0 } : {};
    return r && i.type === "image" ? o($e, { closeButton: typeof r == "object" ? r.closeButton : !1, children: o(y, {}) }, i.url) : o(y, { ...I }, i.url);
  }) : o("img", { src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", className: "pdp-product-gallery__images__placeholder", width: (n == null ? void 0 : n.width) ?? 960, height: (n == null ? void 0 : n.height) ?? 1191, "aria-hidden": !0 }, "pleaceholder"), [h, u, n, r, l, c == null ? void 0 : c.CarouselMainImage, w]), b = nt(() => u.length > 0 ? u.map((i, _) => {
    var y;
    const I = { title: i.label, src: i.url, alt: h == null ? void 0 : h.replace("{product}", i.label).replace("{key}", String(_ + 1)).replace("{total}", String(u.length)), width: (t == null ? void 0 : t.width) ?? 200, height: (t == null ? void 0 : t.height) ?? 248, params: t ?? { width: 200 }, loading: "lazy" }, g = i.type === "video" ? vt(i.url, (y = i.preview) == null ? void 0 : y.url) : void 0;
    return o(U, { name: "CarouselThumbnail", slotTag: "span", contentTag: "span", slot: c == null ? void 0 : c.CarouselThumbnail, context: { ...l, defaultImageProps: I, mediaType: i.type, previewUrl: g }, children: i.type === "video" ? it("span", { className: "pdp-product-gallery__video-thumbnail", role: "img", "aria-label": `Play video: ${i.label || "Product video"}`, children: [g ? o("img", { src: g, alt: "", width: (t == null ? void 0 : t.width) ?? 200, height: (t == null ? void 0 : t.height) ?? 248, loading: "lazy", "aria-hidden": "true" }) : o("span", { className: "pdp-product-gallery__video-thumbnail-placeholder", style: { width: (t == null ? void 0 : t.width) ?? 200, height: (t == null ? void 0 : t.height) ?? 248 }, "aria-hidden": "true" }), o("span", { className: "pdp-product-gallery__video-icon", "aria-hidden": "true", children: "▶" })] }) : o(xt, { ...I }) }, i.url);
  }) : o("img", { src: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", className: "pdp-product-gallery__thumbnail__placeholder", width: (t == null ? void 0 : t.width) ?? 200, height: (t == null ? void 0 : t.height) ?? 248, "aria-hidden": !0 }, "pleaceholder"), [h, u, t, l, c == null ? void 0 : c.CarouselThumbnail]);
  return { mediaItems: u, galleryItems: d, thumbnails: b };
}, fe = ({ initialData: s = null, scope: e, controls: n = "dots", loop: t = !0, peak: r = !1, gap: c = null, arrows: h = !0, arrowsOnMainImage: w = !1, zoom: l = !1, videos: u = !1, imageParams: d, thumbnailParams: b, children: i, slots: _, ...y }) => {
  const I = pt("PDP.Product.Image.label").label, [g, S] = O(s), [P, C] = O(null), [et, L] = O(!1), [rt, N] = O(null), V = Tt(s);
  B(() => {
    V.current = g;
  }, [g]);
  const q = Tt(u);
  q.current = u, B(() => {
    const K = T.on("pdp/data", (A) => {
      if (!A) {
        S(null), C(null), L(!1);
        return;
      }
      if (Ye(V.current, A, q.current)) {
        S(A), C(null), L(!1);
        return;
      }
      C(A), L(!1);
    }, { scope: e });
    return () => {
      K == null || K.off();
    };
  }, [e]);
  const z = nt(() => Je(P, u), [P, u]), { ready: ot } = He(z, { enabled: !!P });
  B(() => {
    if (!P || !ot) return;
    const K = () => {
      S(P), C(null), L(!1);
    };
    if (Ke()) {
      K();
      return;
    }
    const A = window.requestAnimationFrame(() => L(!0)), a = window.setTimeout(K, Fe + 50);
    return () => {
      window.cancelAnimationFrame(A), window.clearTimeout(a);
    };
  }, [ot, P]);
  const { mediaItems: F, galleryItems: G, thumbnails: ct } = Ht({ data: g, videos: u, imageParams: d, thumbnailParams: b, zoom: l, slots: _, ImagesLabel: I, onZoom: N }), D = Ht({ data: P, videos: u, imageParams: d, thumbnailParams: b, zoom: l, slots: _, ImagesLabel: I });
  if (!g) return null;
  const Y = ["pdp-product-gallery__stack", y.className].filter(Boolean).join(" "), st = ["pdp-product-gallery__layer", "pdp-product-gallery__layer--pending", et ? "pdp-product-gallery__layer--entering" : ""].filter(Boolean).join(" ");
  return it("div", { ...y, className: Y, children: [o("div", { className: "pdp-product-gallery__layer", children: o(zt, { arrows: !!F.length && h, arrowsOnMainImage: w, controls: F.length ? n : void 0, loop: t && !!F.length, peak: !!F.length && r, gap: c, defaultIndex: rt || 0, thumbnails: ct, children: G }) }), P ? o("div", { className: st, "aria-hidden": "true", children: o(zt, { arrows: !!D.mediaItems.length && h, arrowsOnMainImage: w, controls: D.mediaItems.length ? n : void 0, loop: t && !!D.mediaItems.length, peak: !!D.mediaItems.length && r, gap: c, defaultIndex: 0, thumbnails: D.thumbnails, children: D.galleryItems }) }) : null, rt === null ? null : o(Be, { onClose: () => N(null), centered: !0, children: o(zt, { arrows: !!F.length, width: "100%", height: "100%", defaultIndex: rt, loop: t && !!F.length, controls: "dots", isZoomed: !0, children: G }) })] });
};
fe.getInitialData = H;
fe.displayName = "ProductGallery";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ye = ({ initialData: s = null, scope: e, hideSku: n = !1, showVariantSku: t = !1, showVariantName: r = !1, children: c, ...h }) => {
  const [w, l] = O(s);
  return B(() => {
    const u = T.on("pdp/data", l, { scope: e });
    return () => {
      u == null || u.off();
    };
  }, [e]), w ? o(je, { ...h, title: o(bt, { children: w.name }), sku: o(bt, { children: w.sku }), hideSku: n, variantName: r && w.variantName ? o(bt, { children: w.variantName }) : void 0, variantSku: t && w.variantSku ? o(bt, { children: w.variantSku }) : void 0 }) : null;
};
ye.getInitialData = H;
ye.displayName = "ProductHeader";
/*! Copyright 2026 Adobe
All Rights Reserved. */
function Ft(s) {
  const e = Array.isArray(s) && s.length === 1 ? s[0] : s;
  if (typeof e == "number") return Number.isFinite(e) ? e : void 0;
  if (typeof e == "string" && e.trim() !== "") {
    const n = Number(e);
    return Number.isFinite(n) ? n : void 0;
  }
}
function We(s) {
  const [e] = Pt(s, qe), [n] = Pt(s, Me), t = Ft(e == null ? void 0 : e.value), r = Ft(n == null ? void 0 : n.value);
  return t === void 0 || r === void 0 || t < 0 || t > 100 || !Number.isSafeInteger(r) || r < 1 ? null : { rating: t / 20, reviewCount: r };
}
const we = ({ initialData: s = null, scope: e, showCount: n = !0, ...t }) => {
  const [r, c] = O(s);
  B(() => {
    const w = T.on("pdp/data", c, { scope: e });
    return () => {
      w == null || w.off();
    };
  }, [e]);
  const h = nt(() => We(r), [r]);
  return h ? o(Ne, { ...t, rating: h.rating, reviewCount: h.reviewCount, showCount: n }) : null;
};
we.getInitialData = H;
we.displayName = "ProductRating";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(s, e) {
  try {
    if (typeof document < "u") {
      const n = e.styleId;
      if (document.querySelector(`style[data-dropin="${n}"]`)) return;
      const t = document.createElement("style");
      for (const c in e.attributes) t.setAttribute(c, e.attributes[c]);
      t.setAttribute("data-dropin", n), t.appendChild(document.createTextNode(s));
      const r = document.querySelector('style[data-dropin="sdk"]');
      if (r) r.after(t);
      else {
        const c = document.querySelector('link[rel="stylesheet"], style');
        c ? c.before(t) : document.head.append(t);
      }
    }
  } catch (n) {
    console.error("dropin-styles (injectCodeFunction)", n);
  }
})(`.pdp-carousel{--icon-size: 32px;--icon-extra-padding: 8px;--thumb-peak: 32px;--thumbnails-col-width: 18.6%;position:relative;display:flex;flex-direction:var(--flex-carousel);align-items:center;gap:var(--gap);width:var(--width)}.pdp-carousel .dropin-button--tertiary--disabled:hover{color:var(--color-neutral-500)}.pdp-carousel--thumbnailsColumn{justify-content:flex-end;align-items:start}.pdp-carousel--thumbnailsRow{align-items:center}.pdp-carousel--arrows{padding-left:calc(var(--icon-size) + var(--icon-extra-padding));padding-right:calc(var(--icon-size) + var(--icon-extra-padding));width:calc(var(--width) - 2 * var(--icon-size) - 2 * var(--icon-extra-padding))}.pdp-carousel__button{position:absolute;top:50%;transform:translateY(-50%);padding:0}.pdp-carousel__button--prev{left:0}[dir=rtl] .pdp-carousel__button--prev{left:auto;right:0}[dir=rtl] .pdp-carousel__button--next{right:auto;left:0}.pdp-carousel__button__icon--next{transform:rotate(-90deg)}.pdp-carousel__button--next{right:0}.pdp-carousel__button__icon--prev{transform:rotate(90deg)}[dir=rtl] .pdp-carousel__button__icon--prev{transform:rotate(-90deg)}[dir=rtl] .pdp-carousel__button__icon--next{transform:rotate(90deg)}.pdp-carousel--main-image-controls.pdp-carousel--thumbnailsColumn .pdp-carousel__button--prev{left:var(--thumbnails-col-width)}.pdp-carousel--main-image-controls.pdp-carousel--thumbnailsRow .pdp-carousel__button--prev,.pdp-carousel--main-image-controls.pdp-carousel--thumbnailsRow .pdp-carousel__button--next{top:calc(var(--height) / 2)}.pdp-carousel__button--thumbnailsColumn{margin:auto;padding:0}.pdp-carousel__button--thumbnailsRow{padding:0}.pdp-carousel__button__icon--thumbnailsColumn--prev{transform:rotate(180deg)}.pdp-carousel__button__icon--thumbnailsRow--prev{transform:rotate(90deg)}[dir=rtl] .pdp-carousel__button__icon--thumbnailsRow--prev,.pdp-carousel__button__icon--thumbnailsRow--next{transform:rotate(-90deg)}[dir=rtl] .pdp-carousel__button__icon--thumbnailsRow--next{transform:rotate(90deg)}.pdp-carousel__wrapper{--peak: 0px;scroll-padding:var(--peak);width:var(--total-width);height:var(--height);display:flex;flex-wrap:nowrap;gap:var(--gap);-webkit-overflow-scrolling:touch}.pdp-carousel__wrapper--horizontal{overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory}.pdp-carousel__slide{display:grid;grid-gap:var(--gap);grid-auto-columns:1fr;grid-auto-rows:100%;scroll-snap-align:end;scroll-snap-stop:always;flex-shrink:0}.pdp-carousel__slide--horizontal{grid-auto-flow:column;width:calc(100% - var(--peak))}.pdp-carousel__slide--horizontal.pdp-carousel__slide--orphan{width:calc((100% / var(--per-page) * var(--length)) - var(--peak) / var(--per-page) * var(--length) - var(--gap) / var(--per-page) * (var(--per-page) - var(--length)))}.pdp-carousel__slide *{vertical-align:middle;max-width:100%;max-height:100%;width:100%;height:100%}.pdp-carousel__slide img{object-fit:contain;width:100%;height:100%}.pdp-carousel__wrapper--peak{--peak: calc(var(--spacing-medium) + var(--gap))}.pdp-carousel__wrapper--scrollbar{--scroll-foreground: var(--color-neutral-600);--scroll-background: var(--color-neutral-400);scrollbar-color:var(--scroll-foreground) var(--scroll-background);scrollbar-width:thin}.pdp-carousel__wrapper:not(.pdp-carousel__wrapper--scrollbar){scrollbar-width:none}.pdp-carousel__wrapper:not(.pdp-carousel__wrapper--scrollbar)::-webkit-scrollbar{display:none}.pdp-carousel__wrapper--scrollbar::-webkit-scrollbar{width:4px;height:4px}.pdp-carousel__slide--hidden{opacity:0;pointer-events:none}.pdp-carousel__wrapper--scrollbar::-webkit-scrollbar-thumb{background:var(--scroll-foreground)}.pdp-carousel__wrapper--scrollbar::-webkit-scrollbar-track{background:var(--scroll-background)}.pdp-carousel__controls__container--thumbnailsRow{--thumbnails-spacing: var(--spacing-small);--thumbnails-box-width: var(--spacing-xxsmall);--thumbnails-rest: calc( var(--thumbnails-spacing) - var(--thumbnails-box-width) );--thumbnails-width: calc( ( var(--width) - 2 * var(--icon-size) - 4 * var(--thumbnails-spacing) - var(--thumb-peak) - 2 * var(--thumbnails-box-width) ) / 4 );margin-top:var(--thumbnails-rest);width:var(--width);display:flex}.pdp-carousel__controls__container--thumbnailsColumn{--thumbnails-spacing: var(--spacing-small);--thumbnails-box-width: var(--spacing-xxsmall);--thumbnails-rest: calc( var(--thumbnails-spacing) - var(--thumbnails-box-width) );--thumbnails-width: 100%;margin-right:var(--thumbnails-rest);width:calc(var(--thumbnails-col-width) - var(--thumbnails-rest))}.pdp-carousel__controls__container--thumbnailsColumn:not(.pdp-carousel__controls__container--no-arrows){height:calc(max(var(--height),4 * var(--thumbnails-spacing)) - 4 * var(--thumbnails-spacing))}.pdp-carousel__controls__container--thumbnailsColumn.pdp-carousel__controls__container--no-arrows{height:var(--height)}.pdp-carousel__controls__wrapper--thumbnailsColumn{max-height:100%;overflow-y:scroll}.pdp-carousel__controls__wrapper--thumbnailsRow{max-width:100%;overflow-x:scroll}.pdp-carousel__controls--thumbnailsRow>label>span:nth-last-child(1){margin-left:0;margin-right:var(--thumbnails-box-width)}[dir=rtl] .pdp-carousel__controls--thumbnailsRow>label>span:nth-last-child(1){margin-left:var(--thumbnails-box-width);margin-right:0}.pdp-carousel__controls__wrapper::-webkit-scrollbar{display:none}.pdp-carousel__controls__wrapper{-ms-overflow-style:none;scrollbar-width:none}.pdp-carousel__controls{display:flex;flex-direction:row;gap:var(--spacing-xsmall)}.pdp-carousel__controls--thumbnailsColumn{display:grid;grid-template-columns:repeat(1,1fr);grid-auto-rows:1fr;grid-row-gap:var(--thumbnails-spacing);padding:var(--thumbnails-box-width)}.pdp-carousel__controls--thumbnailsRow{grid-column-gap:var(--thumbnails-spacing);padding:var(--thumbnails-box-width)}.pdp-carousel__controls__button{box-sizing:border-box;border-radius:50%;width:10px;height:10px;padding:0;border:var(--shape-border-width-1) solid var(--color-neutral-600);background:var(--color-neutral-400);cursor:pointer}.pdp-carousel__controls__button:hover{background:var(--color-neutral-500)}.pdp-carousel__controls__button:active,.pdp-carousel__controls__button--active{background:var(--color-neutral-800);border-color:var(--color-neutral-800);box-shadow:0 0 0 var(--shape-border-width-1) var(--color-neutral-50),0 0 0 var(--shape-border-width-3) var(--color-neutral-800)}.pdp-carousel__slide--last{width:100%}.pdp-carousel__thumbnail__container input[type=radio]{opacity:0;position:absolute;width:0;height:0}.pdp-carousel__thumbnail__container .pdp-carousel__thumbnail__span{--bg-color: var(--color-neutral-300);display:inline-block;box-shadow:0 0 0 var(--shape-border-width-1) var(--color-neutral-400);position:relative;cursor:pointer;background-color:var(--bg-color);background-image:var(--background-image);background-repeat:no-repeat;background-size:cover;height:100%;width:100%;overflow:hidden}.pdp-carousel__thumbnail__content{width:inherit;position:absolute;top:-9999px;bottom:-9999px;left:-9999px;right:-9999px;margin:auto;overflow:hidden}.pdp-carousel__thumbnail__span:hover{box-shadow:0 0 0 var(--shape-border-width-3) var(--color-neutral-50),0 0 0 var(--shape-border-width-4) var(--color-neutral-500);outline:none}.pdp-carousel__controls__wrapper--thumbnailsRow .pdp-carousel__thumbnail__container{min-width:100px}.pdp-carousel__thumbnail__container input[type=radio]:not(:checked):active~.pdp-carousel-thumbnail__span{box-shadow:0 0 0 var(--shape-border-width-1) var(--color-neutral-500);outline:none}.pdp-carousel__thumbnail__container input[type=radio]:checked~.pdp-carousel__thumbnail__span,.pdp-carousel__thumbnail--selected{box-shadow:0 0 0 var(--shape-border-width-3) var(--color-neutral-50),0 0 0 var(--shape-border-width-4) var(--color-neutral-800)}.pdp-carousel__thumbnail__container input[type=radio]:checked:active~.pdp-carousel__thumbnail__span{box-shadow:0 0 0 var(--shape-border-width-3) var(--color-neutral-50),0 0 0 var(--shape-border-width-4) var(--color-neutral-600)}.pdp-carousel__thumbnail__container input[type=radio]:focus-visible+.pdp-carousel__thumbnail__span{box-shadow:0 0 0 var(--shape-border-width-3) var(--color-neutral-900),0 0 0 6px var(--color-neutral-400)}.pdp-carousel__thumbnail__span img{object-fit:cover;width:100%;height:100%}.pdp-product-gallery__video,.pdp-product-gallery__video-iframe{width:100%;height:100%;object-fit:contain}.pdp-product-gallery__video-iframe{border:none}.pdp-product-gallery__video-thumbnail{position:relative;display:inline-block;width:100%;height:100%}.pdp-product-gallery__video-thumbnail-placeholder{display:block;background-color:var(--color-neutral-300)}.pdp-product-gallery__video-icon{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:flex;align-items:center;justify-content:center;width:40px;height:40px;background-color:#0009;border-radius:50%;color:var(--color-neutral-50);font-size:16px;pointer-events:none;transition:background-color .2s ease}.pdp-product-gallery__video-thumbnail:hover .pdp-product-gallery__video-icon,.pdp-product-gallery__video-thumbnail:focus-visible .pdp-product-gallery__video-icon{background-color:#000c}.pdp-product-gallery__video-thumbnail img{width:100%;height:100%;object-fit:cover}.pdp-product{display:grid;grid-template-columns:repeat(var(--grid-1-columns),1fr);grid-column-gap:var(--grid-1-gutters);margin:0 var(--grid-1-margins)}.pdp-product__gallery-column{display:none}.pdp-product__content-column{grid-column:1 / span 4;color:var(--color-neutral-800)}.pdp-product__header{display:grid;grid-auto-rows:max-content;margin-bottom:var(--spacing-medium)}.pdp-product__breadcrumbs{grid-column:1 / -1;padding:var(--spacing-medium) 0 var(--spacing-xxbig)}.pdp-product__title{font:var(--type-display-3-font);letter-spacing:var(--type-display-3-letter-spacing);margin:0}.pdp-product__sku{font:var(--type-body-1-default-font);max-width:600px}.pdp-product__prices{display:flex;gap:var(--spacing-xsmall);margin-top:var(--spacing-medium)}.pdp-product__out-of-stock__text{font:var(--type-headline-2-strong-font)}.pdp-product__options{grid-column:1 / span 4}.pdp-product__price,.pdp-product__price-special{font:var(--type-headline-2-strong-font)}.pdp-product__price,.pdp-product__sku,.pdp-product__price-special,.pdp-product__out-of-stock__text{letter-spacing:var(--type-headline-2-strong-letter-spacing)}.pdp-product__price--grey{color:var(--color-neutral-700)}.pdp-product__actions,.pdp-product__actions--out-of-stock{display:grid;grid-auto-flow:row;gap:var(--grid-1-gutters);grid-auto-rows:max-content;margin-bottom:var(--spacing-xxbig);margin-top:var(--spacing-big)}.pdp-product__short_description,.pdp-product__attributes{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);margin-bottom:var(--spacing-small)}.pdp-product__description,.pdp-product__attributes li{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.pdp-product__attributes{margin-top:var(--spacing-xsmall)}.pdp-product__short_description p,.pdp-product__description p,.pdp-product__attributes li p{margin:0}.pdp-product__short_description figure,.pdp-product__description figure{margin:0}.pdp-product__short_description img,.pdp-product__description img{max-width:100%}.pdp-product__images--carousel{max-height:60vh}.pdp-product__images--carousel--thumbnails{max-height:90vh}.pdp-product__images__placeholder{background-color:var(--color-neutral-200)}.pdp-product__buttons{display:grid;grid-auto-rows:max-content;grid-gap:var(--grid-1-gutters)}.pdp-product__buttons a{text-align:center}.pdp-product__buttons a:hover{text-decoration:none}.pdp-product__overlay .pdp-overlay__content{width:100%;height:100%}.pdp-product__overlay__carousel{width:100%;height:100%;box-sizing:border-box}.pdp-product__overlay__carousel img{width:100%;height:100%;object-fit:contain}.pdp-carousel__controls__container--thumbnailsRow img,.pdp-carousel__controls__container--thumbnailsColumn img{object-fit:cover}.pdp-product__quantity,.pdp-product__buttons{grid-column:1 / span 4}@media only screen and (min-width: 1024px){.pdp-product__breadcrumbs{grid-column:2 / -2}.pdp-product{grid-template-columns:repeat(var(--grid-3-columns),1fr);grid-column-gap:var(--grid-3-gutters);margin:0 var(--grid-3-margins);position:relative}.pdp-product__column-container{position:relative;display:flex;flex-direction:column}.pdp-product__column-body{position:sticky;bottom:30%;align-self:flex-end}.pdp-product__gallery-column{display:block;grid-column:2 / span 6}.pdp-product__content-column{grid-column:8 / span 4;padding-top:var(--spacing-medium)}.pdp-product__images--carousel{display:none}.pdp-product__header{margin-bottom:var(--spacing-small)}.pdp-product__actions{grid-template-columns:repeat(var(--grid-1-columns),1fr);grid-column-gap:var(--grid-1-gutters);grid-row-gap:var(--spacing-xxbig);margin-top:var(--spacing-xxbig)}.pdp-product__quantity{grid-column:1 / span 2;width:fit-content}.pdp-product__actions--out-of-stock{grid-template-columns:repeat(var(--grid-1-columns),1fr);grid-column-gap:var(--grid-1-gutters);grid-row-gap:var(--spacing-xxbig);margin-top:var(--spacing-small)}.pdp-product__buttons{grid-column:1 / span 4}.pdp-product__out-of-stock__text{grid-column:1 / span 2}.pdp-product__gallery-content,.pdp-product__content{grid-column:2 / span 6}}.pdp-gallery-grid{display:grid;grid-gap:var(--gap);grid-template-columns:repeat(1,1fr);grid-auto-rows:max-content}.pdp-gallery-grid__item>*{height:100%;max-width:100%;min-width:100%;vertical-align:middle;width:100%;object-fit:contain}.pdp-gallery-grid__item:only-child{grid-column:1 / span 2}.pdp-gallery-grid__item:first-child:nth-last-child(2){grid-column:1 / span 2;grid-row:1}.pdp-gallery-grid__item:nth-child(2):last-child{grid-column:1 / 3;grid-row:2}@media only screen and (min-width: 1024px){.pdp-gallery-grid{grid-template-columns:repeat(2,1fr)}}.pdp-price-range .dropin-price{letter-spacing:var(--type-headline-2-strong-letter-spacing);font:var(--type-headline-2-strong-font)}.pdp-price-range__label{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);margin-left:5px;margin-right:5px}.pdp-overlay{position:fixed;top:0;left:0;z-index:1000;right:0;bottom:0;background-color:var(--color-neutral-50);display:flex;padding:var(--spacing-medium)}.pdp-overlay--centered{align-items:center;justify-content:center}.pdp-overlay__content{display:flex;height:100%;width:100%}.pdp-overlay__close-button{position:absolute;top:var(--spacing-medium);right:var(--spacing-medium);z-index:1001}.pdp-swatches{display:grid;grid-auto-flow:row;grid-gap:var(--grid-1-gutters);grid-auto-rows:max-content;position:relative;z-index:0}.pdp-swatches__field{display:grid;font:var(--type-body-2-strong-font);grid-auto-rows:max-content;gap:var(--spacing-xsmall)}.pdp-swatches__field__label{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-neutral-800)}.pdp-swatches__options{display:flex;flex-wrap:wrap;gap:var(--spacing-xsmall)}.pdp-swatches__options--checkboxes{flex-direction:column;align-items:flex-start;gap:var(--spacing-small)}.pdp-swatches__options--bundle{flex-direction:column;align-items:flex-start}.pdp-swatches__bundle-option{display:flex;flex-direction:column;align-items:flex-start;gap:var(--spacing-xsmall);width:100%}.pdp-swatches__bundle-option__quantity{align-self:flex-start;width:fit-content;max-width:100%}.pdp-zoom{cursor:zoom-in;overflow:hidden;margin:0;position:relative}.pdp-zoom img{height:100%;max-width:100%;min-width:100%;object-fit:contain;position:relative;transition:transform .2s ease-out;transform:var(--transform);vertical-align:middle;width:100%;will-change:transform;backface-visibility:hidden;transform-style:preserve-3d}.pdp-zoom .pdp-zoom__close-button{background-color:var(--color-neutral-50);border-radius:50%;position:absolute;right:var(--spacing-small);top:var(--spacing-small);width:10px;height:10px}.pdp-zoom.pdp-zoom--zoomed{cursor:zoom-out}.pdp-zoom.pdp-zoom--no-effects{cursor:default}@media only screen and (max-width: 768px){.pdp-zoom img{display:block;width:100%;height:100%;transition:transform .2s ease-out;transform:var(--transform);will-change:transform;backface-visibility:hidden}}.pdp-header{display:grid;grid-auto-rows:max-content}.pdp-header__title{font:var(--type-display-3-font);letter-spacing:var(--type-display-3-letter-spacing);margin:0}.pdp-header__sku,.pdp-header__variant{font:var(--type-body-1-default-font);max-width:600px}.pdp-header__variant-separator{margin-inline:.25em}.pdp-header__variant-sku{font:var(--type-body-1-default-font)}.pdp-price{display:flex;flex-wrap:wrap;gap:var(--spacing-xsmall);margin-top:var(--spacing-medium)}.pdp-price__amount,.pdp-price__amount-special{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing)}.pdp-price__amount--grey{color:var(--color-neutral-700)}.pdp-price__tiers{flex:0 0 100%}.pdp-price-tiers{display:flex;flex-direction:column;gap:8px;margin-top:8px}.pdp-price-tiers__tier{font:var(--type-body-2-font);color:var(--color-text-primary);line-height:1.4}.pdp-price-tiers__text{display:inline}.pdp-price-tiers__price{font-weight:600;color:var(--color-text-primary)}.pdp-price-tiers__savings{font-weight:600;color:var(--color-success)}.pdp-gift-card-options{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.pdp-gift-card-options__grid{display:flex;flex-direction:column;gap:var(--spacing-small)}.pdp-gift-card-options__row{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--spacing-small)}.pdp-product__gift-card-options-container{grid-column:1 / -1}.pdp-gift-card-options__option-field{min-width:0;box-sizing:border-box}.pdp-gift-card-options__option-field--full-width{grid-column:1 / -1}.pdp-gift-card-options__label{font-weight:700;margin-bottom:var(--spacing-xsmall)}.pdp-downloadable-options{display:grid;grid-auto-flow:row;grid-gap:var(--grid-1-gutters);grid-auto-rows:max-content;position:relative;z-index:0}.pdp-downloadable-options__field{display:grid;font:var(--type-body-2-strong-font);grid-auto-rows:max-content;gap:var(--spacing-small)}.pdp-downloadable-options__field__label{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-neutral-800);margin-bottom:var(--spacing-xxsmall)}.pdp-downloadable-options__list{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--spacing-small)}.pdp-downloadable-options__item{position:relative;min-width:0;display:flex;flex-direction:row;align-items:stretch}.pdp-downloadable-options__item--disabled{cursor:not-allowed;opacity:.6}.pdp-downloadable-options__item--disabled .pdp-downloadable-options__clickable{cursor:not-allowed}.pdp-downloadable-options__item--disabled:hover{border-color:var(--color-neutral-300);background-color:var(--color-neutral-50)}.pdp-downloadable-options__item--sample{cursor:default}.pdp-downloadable-options__item--sample:hover{border-color:var(--color-neutral-300);background-color:var(--color-neutral-50)}.pdp-downloadable-options__item--sample .pdp-downloadable-options__clickable{cursor:default;pointer-events:none}.pdp-downloadable-options__clickable{padding:var(--spacing-xsmall);outline:none;border-radius:var(--shape-border-radius-2) 0 0 var(--shape-border-radius-2);border:2px solid var(--color-neutral-300);background-color:var(--color-neutral-50);font:inherit;color:inherit;text-align:left;width:100%;cursor:pointer;display:flex;flex-direction:column;flex:1;transition:all .15s ease}.pdp-downloadable-options__clickable:hover:not(:disabled){border-color:var(--color-neutral-500);background-color:var(--color-neutral-100)}.pdp-downloadable-options__item--selected .pdp-downloadable-options__clickable{border-color:var(--color-brand-500);background-color:var(--color-brand-50)}.pdp-downloadable-options__item--selected .pdp-downloadable-options__clickable:hover:not(:disabled){border-color:var(--color-brand-600);background-color:var(--color-brand-100)}.pdp-downloadable-options__clickable:focus-visible{outline:2px solid var(--color-brand-500);outline-offset:2px}.pdp-downloadable-options__item:has(.pdp-downloadable-options__clickable:focus-visible){outline:2px solid var(--color-brand-500);outline-offset:2px}.pdp-downloadable-options__content{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.pdp-downloadable-options__header{width:100%;display:flex;justify-content:space-between;align-items:baseline;gap:var(--spacing-small)}.pdp-downloadable-options__title{font:var(--type-body-2-font);color:var(--color-neutral-900);line-height:1.4;flex:1;min-width:0}.pdp-downloadable-options__sample-button{padding:var(--spacing-xsmall);font:var(--type-details-caption-2-font);color:var(--color-brand-600);background-color:var(--color-neutral-50);border:2px solid var(--color-neutral-300);border-left:none;border-radius:0 var(--shape-border-radius-2) var(--shape-border-radius-2) 0;cursor:pointer;flex-shrink:0;white-space:nowrap;text-decoration:none;display:flex;align-items:center}.pdp-downloadable-options__price{font:var(--type-body-2-strong-font);color:var(--color-neutral-900);white-space:nowrap;flex-shrink:0}.pdp-downloadable-options__sample{display:inline-block;padding:0 var(--spacing-xsmall) var(--spacing-xsmall) var(--spacing-xsmall);font:var(--type-details-caption-2-font);color:var(--color-brand-600);text-decoration:underline;text-underline-offset:2px;transition:color .15s ease;cursor:pointer}.pdp-downloadable-options__sample:hover{color:var(--color-brand-700);text-decoration-thickness:2px}.pdp-customizable-options{display:flex;flex-direction:column;gap:var(--spacing-small)}.pdp-customizable-options__group{border:0;margin:0;padding:0;min-width:0}.pdp-customizable-options__group>legend{padding:0}.pdp-product__customizable-options-container{grid-column:1 / -1}.pdp-customizable-options__value-list{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.pdp-customizable-options__value-list .dropin-radio-button__label:before{margin-right:var(--spacing-xsmall)}.pdp-customizable-options__value-label{display:inline-flex;align-items:baseline;gap:var(--spacing-xxsmall)}.pdp-customizable-options__value-price{color:var(--color-neutral-700)}.pdp-customizable-options .pdp-customizable-options__shopper-input{min-width:0}.pdp-customizable-options .pdp-customizable-options__unsupported{color:var(--color-neutral-700);font:var(--type-body-2-default-font)}
.pdp-attributes__title{margin:0;font:inherit;font-weight:inherit}
.pdp-product-gallery__stack{position:relative}.pdp-product-gallery__layer{transition:opacity .18s ease-out}.pdp-product-gallery__layer--pending{position:absolute;top:0;right:0;bottom:0;left:0;opacity:0;pointer-events:none}.pdp-product-gallery__layer--pending.pdp-product-gallery__layer--entering{opacity:1}@media (prefers-reduced-motion: reduce){.pdp-product-gallery__layer{transition:none}}`, { styleId: "PDP" });
export {
  he as ProductAttributes,
  be as ProductCustomizableOptions,
  me as ProductDescription,
  de as ProductDetails,
  _e as ProductDownloadableOptions,
  fe as ProductGallery,
  ve as ProductGiftCardOptions,
  ye as ProductHeader,
  ce as ProductOptions,
  pe as ProductPrice,
  ue as ProductQuantity,
  we as ProductRating,
  ge as ProductShortDescription
};
//# sourceMappingURL=containers.js.map
