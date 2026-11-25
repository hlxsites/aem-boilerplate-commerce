/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as C, useMemo as q, useCallback as d, useEffect as M, jsx as k, useRef as de, jsxs as qe, Fragment as $e } from "@dropins/tools/preact-bundle.js";
import { A as Ve, B as Ge, E as We, d as Qe, e as Xe, L as Ke, f as Je, g as Ye, O as Ze, c as et, b as tt, h as nt, P as ot, s as rt, a as at, S as it, T as lt, M as ct } from "./chunks/components.js";
import { Price as _e, AlertBanner as st, Icon as ut, Checkbox as dt } from "@dropins/tools/components.js";
import { Slot as re, deepmerge as pt } from "@dropins/tools/lib.js";
import { k as mt, a as le, b as ye, d as he, setBillingAddress as Te, config as Ce, n as ue, e as W, s as J, T as we, f as fe, j as ht, isEmailAvailable as gt, setGuestEmailOnCart as ft, getCustomer as vt, getCompanyCredit as yt, v as Pe, setPaymentMethod as Oe, getStoredPaymentMethods as kt, m as _t, E as bt, c as xt, setShippingMethodsOnCart as Ct, i as Me, t as St, A as Et } from "./api.js";
import { events as A } from "@dropins/tools/event-bus.js";
import { useText as ae, Text as Tt, MarkupText as wt } from "@dropins/tools/i18n.js";
import "./fragments.js";
import "@dropins/tools/signals.js";
import "@dropins/tools/fetch-graphql.js";
import { i as Be } from "./chunks/ui.js";
import { r as Mt } from "./chunks/render.js";
import { i as It } from "./chunks/events.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const At = ({ suggestedAddress: e, handleSelectedAddress: t }) => {
  const [n, i] = C(null), [a, l] = C(void 0), [_, v] = C(!1), c = q(() => !e || !a ? null : { ...a, regionId: void 0, ...e }, [a, e]), r = d((p) => {
    var b;
    const s = (b = p == null ? void 0 : p.shippingAddresses) == null ? void 0 : b[0], f = mt(s);
    l(f);
  }, []);
  M(() => {
    const p = A.on("checkout/initialized", (b) => {
      r(b);
    }, { eager: !0 });
    return () => {
      p == null || p.off();
    };
  }, [r]), M(() => {
    const p = le();
    p && r(p);
    const b = A.on("checkout/updated", (s) => {
      r(s);
    }, { eager: !1 });
    return () => {
      b == null || b.off();
    };
  }, [r]);
  const S = d(async (p) => {
    i(p);
    const b = p === "suggested" ? c : a;
    v(!0);
    try {
      await (t == null ? void 0 : t({ selection: p, address: b }));
    } finally {
      v(!1);
    }
  }, [c, a, t]);
  return k(Ve, { busy: _, currentAddress: a, selection: n, suggestedAddress: c, onSelectionChange: S });
};
At.displayName = "AddressValidation";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Nt = ({ active: e = !0, autoSync: t = !0, onCartSyncError: n, onChange: i }) => {
  const [a, l] = C(null), [_, v] = C(!1), [c, r] = C(), S = de(!1), p = ye.value || Be.value, { cartSyncError: b } = ae({ cartSyncError: "Checkout.BillToShippingAddress.cartSyncError" }), s = d(() => {
    l(null);
  }, []), f = d((h) => {
    l(null), r(h), i == null || i(h), !(!t || !h || !he()) && Te({ sameAsShipping: !0 }).catch((x) => {
      r(!1), n == null || n({ error: x }), n || l(b);
    });
  }, [t, b, n, i]), u = d((h) => {
    var x;
    const O = !h || h.isEmpty, E = !!(h != null && h.isVirtual);
    if (O || E) {
      v(E), r(!1), S.current = !1;
      return;
    }
    if (S.current) return;
    const I = h, B = (x = I.shippingAddresses) == null ? void 0 : x[0], $ = !!I.billingAddress;
    let z;
    if (B) z = B.sameAsBilling ?? !$;
    else {
      const { defaults: Y } = Ce.getConfig();
      z = Y.isBillToShipping;
    }
    r(z), S.current = !0, t && z && B && !$ && Te({ sameAsShipping: !0 }).catch(() => {
    });
  }, []);
  return M(() => {
    !e || c === void 0 || ue({ isBillToShipping: c });
  }, [e, c]), M(() => {
    if (!e) return;
    const h = le();
    if (h) {
      const O = W("isBillToShipping");
      O != null && r(O), u(h);
      return;
    }
    const x = A.on("checkout/initialized", u, { eager: !0 });
    return () => {
      x == null || x.off();
    };
  }, [e, u]), M(() => {
    if (!e) return;
    const h = A.on("checkout/updated", u, { eager: !1 });
    return () => {
      h == null || h.off();
    };
  }, [e, u]), k(Ge, { checked: c, disabled: p, error: a, initialized: c !== void 0, visible: e && !_, onChange: f, onDismissError: s });
};
Nt.displayName = "BillToShippingAddress";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Pt = ({ active: e = !0 }) => {
  var t;
  const [n, i] = C(), a = (n == null ? void 0 : n.amount.value) === 0, l = (t = J.config) == null ? void 0 : t.shoppingCartDisplaySetting.shipping, _ = l === we.INCLUDING_EXCLUDING_TAX, v = l === we.INCLUDING_TAX, c = ae({ freeShipping: "Checkout.EstimateShipping.freeShipping", taxToBeDetermined: "Checkout.EstimateShipping.taxToBeDetermined", label: "Checkout.EstimateShipping.label", estimated: "Checkout.EstimateShipping.estimated" }), r = d((s) => {
    var f;
    const u = !s || s.isEmpty, h = !!(s != null && s.isVirtual);
    if (u || h) {
      i(null);
      return;
    }
    const x = (f = s.shippingAddresses) == null ? void 0 : f[0];
    if (!x) return;
    const O = x == null ? void 0 : x.selectedShippingMethod;
    if (!O) {
      i(null);
      return;
    }
    const { amount: E, amountExclTax: I, amountInclTax: B } = O;
    i({ estimated: !1, amount: E, amountExclTax: I, amountInclTax: B });
  }, []), S = d((s) => {
    let f = null;
    if (s.shippingMethod) {
      const u = s.shippingMethod;
      f = { estimated: !0, amount: u.amount, amountExclTax: u.amountExclTax, amountInclTax: u.amountInclTax };
    }
    i(f);
  }, []);
  M(() => {
    if (!e) return;
    const s = A.on("shipping/estimate", S, { eager: !0 });
    return () => {
      s == null || s.off();
    };
  }, [e, S]), M(() => {
    if (!e) return;
    const s = le();
    if (s) {
      r(s);
      return;
    }
    const f = A.on("checkout/initialized", r, { eager: !0 });
    return () => {
      f == null || f.off();
    };
  }, [e, r]), M(() => {
    if (!e) return;
    const s = A.on("checkout/updated", r, { eager: !1 });
    return () => {
      s == null || s.off();
    };
  }, [e, r]);
  const p = () => a ? k("span", { "data-testid": "free-shipping", children: c.freeShipping }) : v && n != null && n.amountInclTax ? k(_e, { amount: n.amountInclTax.value, currency: n.amountInclTax.currency, "data-testid": "shipping" }) : k(_e, { amount: n == null ? void 0 : n.amount.value, currency: n == null ? void 0 : n.amount.currency, "data-testid": "shipping" }), b = () => n != null && n.amountExclTax ? k(_e, { amount: n.amountExclTax.value, currency: n.amountExclTax.currency, "data-testid": "shipping-excluding-tax" }) : k("span", { children: c.taxToBeDetermined });
  return k(We, { initialized: n !== void 0, label: (() => {
    const s = n != null && n.estimated ? c.estimated : c.label;
    return k("span", { "data-testid": "estimate-shipping-label", children: s });
  })(), price: p(), priceExclTax: b(), taxExcluded: _ && !a, taxIncluded: v && !a, visible: e && n !== null });
};
Pt.displayName = "EstimateShipping";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ot = 1e3, Bt = ({ active: e = !0, autoSync: t = !0, displayHeadingContent: n = !0, displayTitle: i = !0, initialData: a, onCartSyncError: l, onSignInClick: _, onSignOutClick: v, onValidationError: c, slots: r, ...S }) => {
  const [p, b] = C(null), [s, f] = C(""), [u, h] = C(""), [x, O] = C(!1), [E, I] = C(!0), [B, $] = C(!1), z = de(null), { alreadyHaveAccountHint: Y, cartSyncError: U, defaultTitle: R, fasterCheckoutHint: j, invalidEmailError: Z, missingEmailError: D, signInLabel: ie } = ae({ alreadyHaveAccountHint: "Checkout.LoginForm.emailExists.alreadyHaveAccount", cartSyncError: "Checkout.LoginForm.cartSyncError", defaultTitle: "Checkout.LoginForm.title", fasterCheckoutHint: "Checkout.LoginForm.emailExists.forFasterCheckout", invalidEmailError: "Checkout.LoginForm.invalidEmailError", missingEmailError: "Checkout.LoginForm.missingEmailError", signInLabel: "Checkout.LoginForm.emailExists.signInButton" }), ee = d((y) => {
    !fe(y) || y === ht() || (gt(y).then((T) => {
      I(T);
    }).catch((T) => {
      console.error(T), I(!0);
    }), t && ft(y).catch((T) => {
      l == null || l({ email: y, error: T }), l || h(U);
    }));
  }, [t, l, U]), g = d((y) => {
    const T = y.target.value;
    f(T), I(!0), h(""), z.current && clearTimeout(z.current), z.current = setTimeout(() => {
      ee(T), ue({ email: T }), z.current = null;
    }, Ot);
  }, [ee]), w = d((y) => {
    const T = y.target, N = T.value.trim();
    if (fe(N)) {
      if (h(""), T.setCustomValidity(""), !z.current) return;
      clearTimeout(z.current), z.current = null, ee(N), ue({ email: N });
      return;
    }
    const X = N === "" ? "missing" : "invalid", me = X === "missing" ? D : Z;
    if (c) {
      c({ email: N, message: me, type: X });
      return;
    }
    h(me), T.setCustomValidity(me);
  }, [Z, D, c, ee]), H = d((y) => {
    const T = y.target, N = T.validity, X = N.valueMissing ? D : Z;
    if (!c) {
      h(X);
      return;
    }
    c({ email: T.value, message: X, type: N.valueMissing ? "missing" : "invalid" });
  }, [D, Z, c]), L = d(() => {
    const y = W("email") ?? "", T = fe(y);
    _ == null || _(T ? y : "");
  }, [_]), V = d(() => {
    v == null || v();
  }, [v]), Q = d((y) => {
    const T = W("email") ?? "", N = (y == null ? void 0 : y.email) ?? "";
    N !== T && (f(N), h(""), I(!0), ue({ email: N }));
  }, []);
  M(() => {
    if (!e) return;
    const y = A.on("authenticated", (T) => {
      O(T), vt().then((N) => {
        b(N);
      }).catch(console.error);
    }, { eager: !0 });
    return () => {
      y == null || y.off();
    };
  }, [e]), M(() => {
    if (!e) return;
    const y = le();
    if (y) {
      $(!0);
      const N = y.email ?? "";
      N && f(N), Q(y);
      return;
    }
    const T = A.on("checkout/initialized", (N) => {
      $(!0), Q(N);
    }, { eager: !0 });
    return () => {
      T == null || T.off();
    };
  }, [e, Q]), M(() => {
    if (!e) return;
    const y = A.on("checkout/updated", Q, { eager: !1 });
    return () => {
      y == null || y.off();
    };
  }, [e, Q]);
  const ce = q(() => {
    if (i) return k(re, { name: "checkout-login-form-title", slot: r == null ? void 0 : r.Title, children: k("h2", { children: R }) });
  }, [i, r, R]), te = q(() => {
    if (n) return k(re, { context: { authenticated: x }, name: "checkout-login-form-heading-label", slot: r == null ? void 0 : r.Heading, children: x ? k(Qe, { onClick: V }) : k(Xe, { onClick: L }) });
  }, [n, x, r, L, V]), G = q(() => E ? "" : qe($e, { children: [Y, " ", k("a", { href: "#", onClick: L, children: ie }), " ", j] }), [E, Y, ie, j, L]), K = q(() => k(re, { context: { email: s, isEmailValid: fe(s), isAuthenticated: x }, name: "checkout-login-form-preferences", slot: r == null ? void 0 : r.Preferences }), [s, x, r]);
  return k(Ke, { ...S, customer: p, email: s, error: u, headingContent: te, hint: G, initialized: B, preferences: K, title: ce, visible: e, onEmailBlur: w, onEmailChange: g, onEmailInvalid: H });
};
Bt.displayName = "LoginForm";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const zt = ({ className: e, initialData: t, active: n = !0, ...i }) => {
  const [a, l] = C(0), _ = ae({ mergedCartBannerItems: k(Tt, { fields: { count: a }, id: "Checkout.MergedCartBanner.items", plural: a }) }), v = () => {
    l(0);
  }, c = d((r) => {
    var S;
    const p = (S = r == null ? void 0 : r.oldCartItems) == null ? void 0 : S.reduce((b, s) => b + s.quantity, 0);
    p > 0 && l(p);
  }, []);
  return M(() => {
    if (!n) return;
    const r = A.on("cart/merged", c, { eager: !0 });
    return () => {
      r == null || r.off();
    };
  }, [n, c]), M(() => {
    if (!n) return;
    const r = A.on("cart/reset", () => {
      l(0);
    }, { eager: !1 });
    return () => {
      r == null || r.off();
    };
  }, [n]), !n || !a ? null : k(st, { ...i, "aria-label": _.mergedCartBannerItems, className: Je(["checkout__banner", e]), "data-testid": "merged-cart-banner", icon: k(ut, { source: Ye }), message: k("span", { children: _.mergedCartBannerItems }), variant: "neutral", onDismiss: v });
};
zt.displayName = "MergedCartBanner";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Rt = ({ onCartProductsUpdate: e, routeCart: t, active: n = !0 }) => {
  const [i, a] = C([]), l = d(() => {
    if (!e) return;
    const v = i.filter((c) => c.outOfStock).map((c) => ({ uid: c.uid, quantity: 0 }));
    e(v);
  }, [i, e]);
  if (M(() => {
    if (!n) return;
    const v = A.on("cart/data", (c) => {
      const r = (c == null ? void 0 : c.items) || [];
      a(r.filter((S) => S.outOfStock || S.insufficientQuantity));
    }, { eager: !0 });
    return () => {
      v == null || v.off();
    };
  }, [n]), !n || i.length === 0) return null;
  const _ = !i.some((v) => v.insufficientQuantity);
  return k(Ze, { items: i, routeCart: t == null ? void 0 : t(), onRemoveOutOfStock: _ ? l : void 0 });
};
Rt.displayName = "OutOfStock";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const ze = ({ initialReferenceNumber: e = "", onReferenceNumberChange: t, onReferenceNumberBlur: n, ...i }) => {
  const [a, l] = C(!1), [_, v] = C(null), [c, r] = C(null), [S, p] = C(e), b = J.authenticated, s = !!J.cartId, f = !!J.quoteId, u = d((E) => {
    var I;
    r(((I = E == null ? void 0 : E.total) == null ? void 0 : I.includingTax) || null);
  }, []), h = d((E) => {
    var I, B;
    r(((B = (I = E == null ? void 0 : E.quote) == null ? void 0 : I.prices) == null ? void 0 : B.grandTotal) || null);
  }, []), x = d((E) => {
    const I = E.target.value;
    p(I), t == null || t(I);
  }, [t]), O = d((E) => {
    const I = E.target.value;
    n == null || n(I);
  }, [n]);
  return M(() => {
    if (!s) return;
    const E = A.on("cart/data", u, { eager: !0 });
    return () => {
      E == null || E.off();
    };
  }, [s, u]), M(() => {
    if (!f) return;
    const E = A.on("quote-management/quote-data", h, { eager: !0 });
    return () => {
      E == null || E.off();
    };
  }, [f, h]), M(() => {
    b && yt().then((E) => {
      v(E);
    }).catch((E) => {
      console.error("Failed to fetch company credit:", E), v(null);
    }).finally(() => {
      l(!0);
    });
  }, [b]), k("div", { ...i, children: k(et, { companyCredit: _, initialized: a, referenceNumber: S, totalAmount: c, onReferenceNumberBlur: O, onReferenceNumberChange: x }) });
};
ze.displayName = "PaymentOnAccount";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Re = ({ initialReferenceNumber: e = "", onReferenceNumberChange: t, onReferenceNumberBlur: n, ...i }) => {
  const [a, l] = C(""), [_, v] = C(e), { missingRefNumberError: c } = ae({ missingRefNumberError: "Checkout.PurchaseOrder.missingReferenceNumberError" }), r = d((f) => {
    const u = Pe(f);
    l(u ? "" : c);
  }, [c]), S = d((f) => {
    l(f.valid ? "" : c);
  }, [c]), p = d((f) => {
    const u = f.target.value;
    v(u), r(u), t == null || t(u);
  }, [t, r]), b = d((f) => {
    const u = f.target.value;
    r(u), n == null || n(u);
  }, [n, r]), s = d((f) => {
    const u = f.target;
    S(u.validity);
  }, [S]);
  return k(tt, { ...i, error: a, referenceNumber: _, onInvalidReferenceNumber: s, onReferenceNumberBlur: b, onReferenceNumberChange: p });
};
Re.displayName = "PurchaseOrder";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Dt = (e, t) => {
  let n;
  const i = function(...a) {
    clearTimeout(n), n = setTimeout(() => e.apply(this, a), t);
  };
  return i.cancel = () => {
    clearTimeout(n);
  }, i;
};
var Ht = ((e) => (e.PaymentOnAccount = "companycredit", e.PurchaseOrder = "purchaseorder", e))(Ht || {});
const Ie = { companycredit: { Container: ze, autoSync: !0, formName: "payment-on-account", validateRefNumber: !1 }, purchaseorder: { Container: Re, autoSync: !1, formName: "purchase-order", validateRefNumber: !0 } }, ve = /* @__PURE__ */ new Map(), Lt = (e, t) => {
  const n = `${e}-${t}`;
  if (!ve.has(n)) {
    const i = Dt(async (a) => {
      if (!t || Pe(a)) try {
        await Oe({ code: e, purchase_order_number: a });
      } catch (l) {
        console.error(`Failed to set payment method for ${e}:`, l);
      }
    }, 1e3);
    ve.set(n, i);
  }
  return ve.get(n);
}, ge = {}, cn = () => {
  Object.keys(ge).forEach((e) => {
    delete ge[e];
  }), ve.clear();
}, Ae = (e) => {
  if (!(e in Ie)) throw new Error(`Invalid handler code: ${e}`);
  if (ge[e]) return ge[e];
  const t = Ie[e], { autoSync: n, Container: i, formName: a, validateRefNumber: l } = t, _ = { enabled: !0, autoSync: n, render: (v) => {
    var c;
    const r = String(((c = v.additionalData) == null ? void 0 : c.purchase_order_number) ?? ""), S = document.createElement("div");
    Mt.render(i, { name: a, initialReferenceNumber: r, onReferenceNumberChange: Lt(e, l) })(S), v.replaceHTML(S);
  } };
  return ge[e] = _, _;
}, jt = { companycredit: Ae("companycredit"), purchaseorder: Ae("purchaseorder") };
function pe(e) {
  var t;
  return (t = e.additionalData) == null ? void 0 : t.publicHash;
}
function se(e) {
  return e ? pe(e) !== void 0 : !1;
}
function be(e, t) {
  return e ? t.some((n) => De(n, e)) : !1;
}
function De(e, t) {
  return !e || !t ? !1 : e.code === t.code && pe(e) === pe(t);
}
function Ft(e) {
  return e ? !!e.code && !!e.title : !1;
}
function Ne(e) {
  return `${e.code}:${pe(e) ?? ""}`;
}
const Ut = ({ UIComponentType: e = "ToggleButton", active: t = !0, autoSync: n = !0, displayTitle: i = !0, slots: a, onCartSyncError: l, onSelectionChange: _ }) => {
  const [v, c] = C(null), [r, S] = C(!1), [p, b] = C(null), [s, f] = C([]), [u, h] = C([]), [x, O] = C(!1), [E, I] = C(/* @__PURE__ */ new Set()), B = J.authenticated, $ = ye.value, { cartSyncError: z, defaultTitle: Y } = ae({ cartSyncError: "Checkout.PaymentMethods.cartSyncError", defaultTitle: "Checkout.PaymentMethods.title" }), U = q(() => {
    const o = (a == null ? void 0 : a.Methods) ?? {};
    return pt(jt, o);
  }, [a == null ? void 0 : a.Methods]), R = d((o) => {
    var m;
    return (m = U[o.code]) == null ? void 0 : m.render;
  }, [U]), j = q(() => (a == null ? void 0 : a.StoredMethods) ?? {}, [a == null ? void 0 : a.StoredMethods]), Z = Object.keys(j).length > 0, D = d((o) => Object.entries(j).find(([m, P]) => (P.tokenCode ?? m) === o.code), [j]), ie = d((o) => {
    var m, P;
    return (P = (m = D(o)) == null ? void 0 : m[1]) == null ? void 0 : P.render;
  }, [D]), ee = d((o) => {
    const m = D(o);
    if (!m) return !1;
    const [P, F] = m;
    return F.enabled !== void 0 ? F.enabled : E.has(P);
  }, [D, E]), g = d((o) => {
    var m;
    return se(o) ? ((m = D(o)) == null ? void 0 : m[0]) ?? o.code : o.code;
  }, [D]), w = q(() => u.filter(ee), [u, ee]), H = de(/* @__PURE__ */ new Set()), L = de(null);
  L.current = p;
  const V = d((o, m) => [...o, ...m].find((P) => !H.current.has(Ne(P))) ?? null, []), Q = d((o) => {
    const m = U[o.code];
    return m ? m.autoSync !== !1 : n;
  }, [n, U]), ce = d((o) => {
    var m;
    return j[o.code] ? !1 : ((m = U[o.code]) == null ? void 0 : m.enabled) !== !1;
  }, [U, j]), te = d((o) => o.map((m) => {
    const P = U[m.code];
    return P ? { ...m, icon: P.icon } : m;
  }), [U]), G = d((o) => {
    b((m) => m && { ...m, additionalData: o });
  }, []), K = d(() => {
    c(null);
  }, []), y = d((o) => {
    c(null), L.current = o, b(o);
  }, []), T = d(async (o, m) => {
    if (!(It() || he()) || !Q(o)) return;
    const P = pe(o), F = P ? (() => {
      const ne = g(o);
      return { code: ne, [ne]: { public_hash: P } };
    })() : { code: o.code, ...o.additionalData };
    Oe(F).then(() => {
      H.current.clear();
    }).catch((ne) => {
      m === void 0 && H.current.add(Ne(o)), y(m ?? null), c(l ? null : z), l == null || l({ method: o, error: ne });
    });
  }, [z, g, Q, l, y]), N = d(async (o) => {
    const m = W("selectedPaymentMethod");
    y(o), _ == null || _(o), await T(o, m);
  }, [_, y, T]), X = d((o) => {
    if (!o || o.isEmpty) {
      y(null), f([]), I(/* @__PURE__ */ new Set());
      return;
    }
    const m = o.availablePaymentMethods ?? [], P = m.filter(ce);
    if (f(P), I(new Set(m.map((Ue) => Ue.code))), P.length === 0) {
      se(W("selectedPaymentMethod")) || y(null);
      return;
    }
    const F = o.selectedPaymentMethod ?? null, ne = Ft(F), oe = W("selectedPaymentMethod"), Ee = se(oe) || be(oe, P), Fe = !!oe && !!F && F.code === g(oe);
    if (oe && Ee && !Fe) {
      T(oe, F);
      return;
    }
    (!oe || !Ee) && ne && be(F, P) && y(F);
  }, [ce, g, y, T]);
  M(() => {
    if (!B || !Z) {
      O(!0);
      return;
    }
    O(!1), kt().then(h).catch((o) => {
      console.error("Failed to fetch stored payment methods:", o), h([]);
    }).finally(() => {
      O(!0);
    });
  }, [B, Z]), M(() => {
    if (!r || !x) return;
    const o = L.current;
    if (o && (se(o) || be(o, s))) return;
    const m = V(w, s);
    m && (y(m), T(m));
  }, [r, V, x, s, p, w, T, y]), M(() => {
    if (!t) return;
    const o = le();
    if (o) {
      S(!0);
      const P = W("selectedPaymentMethod");
      P && b(P), X(o);
      return;
    }
    const m = A.on("checkout/initialized", (P) => {
      S(!0), X(P);
    }, { eager: !0 });
    return () => {
      m == null || m.off();
    };
  }, [t, X]), M(() => {
    if (!t) return;
    const o = A.on("checkout/updated", X, { eager: !1 });
    return () => {
      o == null || o.off();
    };
  }, [t, X]), M(() => {
    ue({ selectedPaymentMethod: p, selectedPaymentMethodCartCode: p ? g(p) : null });
  }, [p, g]);
  const me = q(() => {
    if (i) return k(re, { name: "checkout-payment-methods-title", slot: a == null ? void 0 : a.Title, children: k("h2", { children: Y }) });
  }, [i, a == null ? void 0 : a.Title, Y]), He = q(() => {
    if (!p || se(p)) return;
    const o = R(p);
    if (o) return k(re, { context: { additionalData: p.additionalData, cartId: J.cartId ?? "", replaceHTML(m) {
      this.replaceWith(m);
    }, setAdditionalData: G }, name: "PaymentMethodContent", slot: o }, p.code);
  }, [R, p, G]), Le = q(() => w.map((o) => {
    var m;
    const P = ie(o), F = pe(o), ne = De(p, o);
    return { content: P ? k(re, { context: { cartId: J.cartId ?? "", details: (m = o.additionalData) == null ? void 0 : m.details, publicHash: F, selected: ne, replaceHTML(oe) {
      this.replaceWith(oe);
    } }, name: "StoredPaymentMethodOption", slot: P }, F) : null, method: o, selected: ne };
  }), [ie, p, w]), ke = w.length === 0 || !se(p), je = d(() => {
    ke || s[0] && N(s[0]);
  }, [ke, s, N]);
  return k(nt, { UIComponentType: e, busy: $, error: v, initialized: r, isExpanded: ke, options: te(s), paymentMethodContent: He, selection: p, storedOptions: Le, title: me, visible: t, onDismissError: K, onPayAnotherWay: je, onSelectionChange: N });
};
Ut.displayName = "PaymentMethods";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const qt = ({ disabled: e = !1, active: t = !0, handleValidation: n, handlePlaceOrder: i, slots: a, ...l }) => {
  const [_, v] = C(!1), [c, r] = C(!1), S = ye.value, p = ae({ CheckoutUnexpectedError: "Checkout.ServerError.unexpected", placeOrderButton: "Checkout.PlaceOrder.button" }), b = d((u) => {
    const h = _t(u), x = h === bt.UNKNOWN_ERROR ? p.CheckoutUnexpectedError : u.message;
    A.emit("checkout/error", { message: x, code: h });
  }, [p]), s = d(async () => {
    try {
      if (n && !await n()) return;
      await i({ cartId: J.cartId, quoteId: J.quoteId, code: W("selectedPaymentMethodCartCode") ?? "" });
    } catch (u) {
      b(u);
    }
  }, [n, i, b]), f = d((u) => {
    (!u || "isEmpty" in u && u.isEmpty) && r(!1);
  }, []);
  return M(() => {
    if (t === !1) return;
    const u = A.on("cart/initialized", (h) => {
      const x = (h == null ? void 0 : h.items) || [];
      r(x.some((O) => O.outOfStock || O.insufficientQuantity));
    }, { eager: !0 });
    return () => {
      u == null || u.off();
    };
  }, [t]), M(() => {
    if (!t) return;
    const u = le();
    if (u) {
      v(!0), f(u);
      return;
    }
    const h = A.on("checkout/initialized", (x) => {
      v(!0), f(x);
    }, { eager: !0 });
    return () => {
      h == null || h.off();
    };
  }, [t, f]), M(() => {
    if (!t) return;
    const u = A.on("checkout/updated", (h) => {
      f(h);
    }, { eager: !1 });
    return () => {
      u == null || u.off();
    };
  }, [t, f]), k(ot, { ...l, disabled: e || c || S || Be.value, initialized: _, visible: t, onClick: s, children: k(re, { context: { code: W("selectedPaymentMethodCartCode") ?? "" }, name: "Content", slot: a == null ? void 0 : a.Content, children: p.placeOrderButton }) });
};
qt.displayName = "PlaceOrder";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const $t = ({ active: e = !0, onRetry: t, onServerError: n, autoScroll: i = !1 }) => {
  const [a, l] = C(null), _ = de(null), v = async () => {
    t == null || t(a), l(null);
  };
  return M(() => {
    const c = A.on("checkout/error", (r) => {
      l(r || null), r && n && n(r.message);
    }, { eager: !0 });
    return () => {
      c == null || c.off();
    };
  }, [n]), M(() => {
    !i || !a || !_.current || rt(_.current);
  }, [a, i]), !e || !a ? null : k(at, { errorMessage: a.message, errorMessageRef: _, onClick: v });
};
$t.displayName = "ServerError";
/*! Copyright 2026 Adobe
All Rights Reserved. */
function xe(e, t) {
  return e ? t.some((n) => Se(n, e)) : !1;
}
function Se(e, t) {
  return !e || !t || e.amount.value !== t.amount.value ? !1 : e.code === t.code && e.carrier.code === t.carrier.code;
}
function Vt(e) {
  const t = A.lastPayload("shipping/estimate");
  t && A.emit("shipping/estimate", { ...t, shippingMethod: St(e) });
}
const Gt = ({ UIComponentType: e = "RadioButton", active: t = !0, autoSync: n = !0, displayTitle: i = !0, initialData: a, slots: l, onCartSyncError: _, onSelectionChange: v, ...c }) => {
  const [r, S] = C(null), [p, b] = C(!1), [s, f] = C(), [u, h] = C(null), x = de(null), O = ye.value, E = xt.value, { cartSyncError: I, defaultTitle: B } = ae({ cartSyncError: "Checkout.ShippingMethods.cartSyncError", defaultTitle: "Checkout.ShippingMethods.title" }), $ = d((g) => {
    if (!g || g.length === 0) return [];
    const { shipping: w } = Ce.getConfig();
    return w != null && w.filterOptions ? g.filter(w.filterOptions) : g;
  }, []), z = d((g) => {
    if (g.length === 0) return null;
    const { defaults: w } = Ce.getConfig();
    return w.selectedShippingMethod(g);
  }, []), Y = q(() => $(s), [s, $]), U = d(() => {
    S(null);
  }, []), R = d((g) => {
    S(null), h((w) => Se(w, g) ? w : (ue({ selectedShippingMethod: g }), g));
  }, []), j = d(async (g, w) => {
    if (!n || !he()) return;
    const H = { carrierCode: g.carrier.code, methodCode: g.code };
    Ct([H]).catch((L) => {
      R(w ?? null), _ == null || _({ method: g, error: L }), _ || S(I);
    });
  }, [n, R, _, I]), Z = d(async (g) => {
    const w = W("selectedShippingMethod");
    R(g), v == null || v(g), he() || Vt(g), await j(g, w);
  }, [v, R, j]), D = d((g) => {
    var w;
    const H = !g || g.isEmpty, L = !!(g != null && g.isVirtual);
    if (H || L) {
      b(L), R(null), f([]);
      return;
    }
    const V = (w = g.shippingAddresses) == null ? void 0 : w[0];
    if (!V) return;
    const Q = V.availableShippingMethods ?? [];
    Me() && !x.current && (x.current = Q);
    const ce = Me() && x.current ? x.current : Q;
    f(ce);
    const te = $(ce);
    if (te.length === 0) {
      R(null);
      return;
    }
    const G = V.selectedShippingMethod ?? null, K = W("selectedShippingMethod"), y = xe(K, te), T = Se(K, G);
    if (K && y && !T) {
      j(K, G);
      return;
    }
    if ((!K || !y) && G && xe(G, te)) {
      R(G);
      return;
    }
    if ((!K || !y) && (!G || !xe(G, te))) {
      const N = z(te);
      R(N), N && j(N);
    }
  }, [$, z, R, j]), ie = d((g) => {
    if (g === void 0) return;
    const { shippingMethod: w, availableShippingMethods: H } = g, L = (H == null ? void 0 : H.find((V) => V.code === (w == null ? void 0 : w.methodCode) && V.carrier.code === (w == null ? void 0 : w.carrierCode))) ?? null;
    f(H), R(L);
  }, [R]);
  M(() => {
    if (!t) return;
    const g = le();
    if (g) {
      const H = W("selectedShippingMethod");
      H && h(H), D(g);
      return;
    }
    const w = A.on("checkout/initialized", D, { eager: !0 });
    return () => {
      w == null || w.off();
    };
  }, [t, D]), M(() => {
    if (!t) return;
    const g = A.on("checkout/updated", D, { eager: !1 });
    return () => {
      g == null || g.off();
    };
  }, [t, D]), M(() => {
    if (!t || he()) return;
    const g = A.on("shipping/estimate", ie, { eager: !0 });
    return () => {
      g == null || g.off();
    };
  }, [t, ie]);
  const ee = q(() => {
    if (i) return k(re, { name: "checkout-shipping-methods-title", slot: l == null ? void 0 : l.Title, children: k("h3", { children: B }) });
  }, [i, l == null ? void 0 : l.Title, B]);
  return k(it, { ...c, UIComponentType: e, busy: O || E, error: r, initialized: s !== void 0, options: Y, selection: u, shippingMethodItemSlot: l == null ? void 0 : l.ShippingMethodItem, title: ee, visible: t && !p, onDismissError: U, onSelectionChange: Z });
};
Gt.displayName = "ShippingMethods";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Wt = ({ active: e = !0, slots: t, ...n }) => {
  var i;
  const [a, l] = C(!1), [_, v] = C(""), { errorMessage: c } = ae({ errorMessage: "Checkout.TermsAndConditions.error" }), r = ((i = J.config) == null ? void 0 : i.agreementsEnabled) === !1, S = () => {
    v("");
  }, p = () => {
    v(c);
  };
  return M(() => {
    if (!e || r) return;
    if (le()) {
      l(!0);
      return;
    }
    const b = A.on("checkout/initialized", () => {
      l(!0);
    }, { eager: !0 });
    return () => {
      b == null || b.off();
    };
  }, [e, r]), k(lt, { ...n, agreements: k(re, { context: { appendAgreement(b) {
    this._registerMethod((...s) => {
      const f = b(...s);
      if (!f) return;
      const { mode: u, name: h, text: x, translationId: O } = f;
      if (!x && !O) {
        console.warn(`The agreement ${h} is misconfigured. Please provide a text or a translationId.`);
        return;
      }
      const E = x ? k(ct, { html: x }) : k(wt, { id: O }), I = k(dt, { checked: u === Et.AUTO, label: E, name: h, required: !0, onChange: S, onInvalid: p });
      this._setProps((B) => ({ children: [...B.children || [], I] }));
    });
  } }, name: "Agreements", slot: t == null ? void 0 : t.Agreements }), error: _, initialized: a, visible: e && !r });
};
Wt.displayName = "TermsAndConditions";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, t) {
  try {
    if (typeof document < "u") {
      const n = t.styleId;
      if (document.querySelector(`style[data-dropin="${n}"]`)) return;
      const i = document.createElement("style");
      for (const l in t.attributes) i.setAttribute(l, t.attributes[l]);
      i.setAttribute("data-dropin", n), i.appendChild(document.createTextNode(e));
      const a = document.querySelector('style[data-dropin="sdk"]');
      if (a) a.after(i);
      else {
        const l = document.querySelector('link[rel="stylesheet"], style');
        l ? l.before(i) : document.head.append(i);
      }
    }
  } catch (n) {
    console.error("dropin-styles (injectCodeFunction)", n);
  }
})(`.checkout-address-validation{display:grid;gap:var(--spacing-medium)}.checkout-address-validation__options--busy{opacity:.4;pointer-events:none}.checkout-address-validation__title{margin-bottom:var(--spacing-small)}.checkout-address-validation__subtitle{color:var(--color-neutral-700);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.checkout-address-validation__options{display:grid;gap:var(--spacing-xbig);grid-template-columns:1fr 1fr}.checkout-address-validation__option{margin:0}.checkout-address-validation__option-title{margin-bottom:var(--spacing-xsmall)}.checkout-bill-to-shipping-address label{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);gap:0}.checkout-bill-to-shipping-address__error{margin-top:var(--spacing-medium)}.checkout-estimate-shipping{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-xxsmall);align-items:center;color:var(--color-neutral-800)}.checkout-estimate-shipping__label,.checkout-estimate-shipping__price{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.checkout-estimate-shipping__label--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-700)}.checkout-estimate-shipping__price--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.checkout-estimate-shipping__price{text-align:right}.checkout-estimate-shipping__label--bold,.checkout-estimate-shipping__price--bold{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.checkout-estimate-shipping__caption{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-neutral-700)}.cart-order-summary__shipping .dropin-skeleton{grid-template-columns:1fr}.checkout-login-form__heading{display:grid;grid-template-columns:1fr max-content;grid-auto-rows:max-content;margin:0 0 var(--spacing-medium) 0;align-items:center}.checkout-login-form__heading:empty{display:none}.checkout-login-form__content{grid-auto-rows:max-content}.checkout-login-form__content .dropin-field__hint a{font-weight:400}.checkout-login-form__customer-details{display:grid;grid-auto-flow:row;gap:var(--spacing-xxsmall)}.checkout-login-form__customer-name{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.checkout-login-form__customer-email{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-700)}.checkout-login-form__title,.checkout-login-form__title h2{grid-column-start:1;color:var(--color-neutral-800);font:var(--type-headline-2-default-font);letter-spacing:var(--type-headline-2-default-letter-spacing);margin:0}.checkout-login-form__heading-label,.checkout-login-form__sign-in,.checkout-login-form__sign-out{grid-column-start:2;color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);justify-self:flex-end}.checkout-login-form__heading-label a,a.checkout-login-form__link{font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-left:var(--spacing-xxsmall)}@media only screen and (min-width: 320px) and (max-width: 768px){.checkout-login-form__heading{grid-template-columns:1fr;grid-template-rows:1fr}.checkout-login-form__heading-label{grid-column-start:1;align-self:flex-start;justify-self:flex-start;margin-top:var(--spacing-medium)}}.checkout-out-of-stock.dropin-card{border-color:var(--color-warning-500)}.checkout-out-of-stock .dropin-card__content{gap:var(--spacing-small);padding:var(--spacing-small)}.checkout-out-of-stock__title{color:var(--color-neutral-900);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin:0;display:flex;gap:var(--spacing-xxsmall);align-items:center;justify-content:left;text-align:center}.checkout-out-of-stock__message{color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);margin:0}.checkout-out-of-stock__items{display:grid;grid-template-columns:repeat(5,100px);grid-gap:var(--spacing-small);list-style:none;padding:0;margin:0}.checkout-out-of-stock__item img{width:100%;height:auto}.checkout-out-of-stock__actions{display:flex;gap:var(--spacing-small);justify-content:flex-end}a.checkout-out-of-stock__action{color:var(--color-brand-500);font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.checkout-out-of-stock__action{color:var(--color-brand-500);font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);background:none;border:none;padding:0;cursor:pointer}.checkout-out-of-stock__action:hover{--textColor: var(--color-brand-700);text-decoration:solid underline var(--textColor);text-underline-offset:6px}@media only screen and (width >= 320px) and (width <= 768px){.checkout-out-of-stock__items{grid-template-columns:repeat(3,100px)}}.checkout-payment-methods__title,.checkout-payment-methods__title h2{color:var(--color-neutral-800);font:var(--type-headline-2-default-font);letter-spacing:var(--type-headline-2-default-letter-spacing);margin:0 0 var(--spacing-medium) 0}.checkout-payment-methods__wrapper{position:relative;display:grid}.checkout-payment-methods__wrapper--busy{opacity:.4;pointer-events:none}.checkout-payment-methods__methods{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-medium)}.checkout-payment-methods__content{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);margin-top:var(--spacing-xbig)}.checkout-payment-methods__content>div[data-slot=PaymentMethodSlot]:not(:empty){margin-top:var(--spacing-medium)}.checkout-payment-methods--full-width{grid-template-columns:1fr}.checkout-payment-methods__spinner{margin:0 auto;position:absolute;z-index:999;left:0;right:0;top:calc(50% - (var(--size) / 2));bottom:0}.checkout__content [data-slot=PaymentMethods]:empty{display:none}.checkout-payment-methods__error{margin-top:var(--spacing-medium)}.checkout-payment-methods__stored-methods{display:flex;flex-direction:column;align-items:stretch;min-width:0;margin-bottom:var(--spacing-medium)}.checkout-payment-methods__stored-method-wrapper{position:relative}.checkout-payment-methods__stored-method-input{position:absolute;clip:rect(0,0,0,0);width:1px;height:1px;margin:-1px;padding:0;border:0;overflow:hidden}.checkout-payment-methods__stored-method-input:focus+.checkout-payment-methods__stored-method{border:var(--shape-border-width-1) solid var(--color-neutral-900);outline:var(--spacing-xxsmall) solid var(--color-button-focus);position:relative;z-index:1}.checkout-payment-methods__stored-method{display:block;box-sizing:border-box;width:100%;min-width:0;overflow:hidden;border:var(--shape-border-width-2) solid var(--color-neutral-400);padding:var(--spacing-medium);cursor:pointer;background-color:var(--color-neutral-200);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);word-break:break-word}.checkout-payment-methods__stored-method--selected{border:var(--shape-border-width-1) solid var(--color-neutral-900);background-color:var(--color-neutral-50)}.checkout-payment-methods__methods-box{box-sizing:border-box;border:var(--shape-border-width-1) solid var(--color-neutral-900);background-color:var(--color-neutral-50);padding:var(--spacing-medium)}.checkout-payment-methods__methods-box-title{color:var(--color-neutral-800);font:var(--type-headline-2-default-font);letter-spacing:var(--type-headline-2-default-letter-spacing);margin:0 0 var(--spacing-medium) 0}.checkout-payment-methods__pay-another-way{width:100%;height:88px;display:flex;align-items:center;justify-content:space-between;border:var(--shape-border-width-2) solid var(--color-neutral-400);background-color:var(--color-neutral-200);padding:var(--spacing-xsmall) var(--spacing-medium);cursor:pointer}.checkout-payment-methods__pay-another-way-title{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);color:var(--color-neutral-800)}.checkout-payment-methods__pay-another-way svg{stroke:var(--shape-icon-stroke-4);color:var(--color-neutral-800)}@media only screen and (min-width: 320px) and (max-width: 768px){.checkout-payment-methods__methods{grid-template-columns:1fr}}.checkout-payment-on-account{margin-bottom:var(--spacing-medium)}.checkout-payment-on-account__form{width:100%}.checkout-payment-on-account__credit{display:flex;justify-content:space-between;align-items:center;padding:var(--spacing-small);margin-bottom:var(--spacing-medium);background-color:var(--color-neutral-100);border:1px solid var(--color-neutral-300);border-radius:4px;font-size:14px;line-height:1.4}.checkout-payment-on-account__credit-label{font-weight:500;color:var(--color-neutral-700)}.checkout-payment-on-account__credit-amount{font-weight:600;color:var(--color-success-600)}.checkout-payment-on-account__exceed-message{margin-top:var(--spacing-medium);margin-bottom:var(--spacing-medium)}.checkout-payment-on-account .dropin-field{margin-bottom:0}.checkout-place-order{display:grid;padding-bottom:var(--spacing-big)}.checkout-place-order__button{align-self:flex-end;justify-self:flex-end}@media only screen and (min-width: 320px) and (max-width: 768px){.checkout-place-order{background-color:var(--color-neutral-200);padding:var(--spacing-medium) var(--spacing-medium) var(--spacing-big) var(--spacing-medium)}.checkout-place-order__button{align-self:center;justify-self:stretch}}.checkout-purchase-order{margin-bottom:var(--spacing-medium)}.checkout-purchase-order__form{width:100%}.checkout-purchase-order .dropin-field{margin-bottom:0}.checkout-server-error{position:relative;text-align:center}.checkout-server-error__icon .error-icon{color:var(--color-alert-500)}.checkout-server-error a{font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing)}.checkout-shipping-methods__title,.checkout-shipping-methods__title h3{color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);margin:0 0 var(--spacing-medium) 0}.checkout-shipping-methods__content{position:relative;display:block}.checkout-shipping-methods__method{width:fit-content;cursor:pointer;font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.checkout-shipping-methods__options>[data-slot^=checkout-shipping-method-item]{margin-bottom:var(--spacing-medium)}.checkout-shipping-methods__options>[data-slot^=checkout-shipping-method-item]:last-child{margin-bottom:0}.dropin-radio-button__label .dropin-price{color:var(--color-neutral-800);font-weight:400}.checkout-shipping-methods__price--original{margin-right:var(--spacing-xxsmall)}.checkout-shipping-methods__price-wrapper{display:flex;gap:var(--spacing-xxsmall);align-items:center}.checkout-shipping-methods__options--busy{opacity:.4;pointer-events:none}.checkout-shipping-methods__spinner{margin:0 auto;position:absolute;z-index:999;left:0;right:0;top:calc(50% - (var(--size) / 2));bottom:0}.checkout-shipping-methods__options--toggleButton{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-medium)}.checkout-shipping-methods__options--toggleButton .dropin-toggle-button__content{justify-content:start;display:grid;grid-template-columns:1fr min-content}.checkout-shipping-methods__options--toggleButton .checkout-shipping-methods__method{width:auto}.checkout-shipping-methods__options--toggleButton>[data-slot^=checkout-shipping-method-item]{margin-bottom:0}.checkout-shipping-methods__error{margin-top:var(--spacing-medium)}.checkout-shipping-methods__sr-only{border:0;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;margin:0 -1px -1px 0;overflow:hidden;padding:0;position:absolute;width:1px}.checkout-terms-and-conditions{display:grid}.checkout-terms-and-conditions__error{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);color:var(--color-alert-800);text-align:left;margin-top:var(--spacing-xsmall)}.checkout-terms-and-conditions__error:empty{display:none}
.checkout__banner{margin-bottom:var(--spacing-xbig)}`, { styleId: "checkout" });
export {
  At as AddressValidation,
  Nt as BillToShippingAddress,
  Pt as EstimateShipping,
  Ht as HandlerCode,
  Bt as LoginForm,
  zt as MergedCartBanner,
  Rt as OutOfStock,
  Ut as PaymentMethods,
  ze as PaymentOnAccount,
  qt as PlaceOrder,
  Re as PurchaseOrder,
  $t as ServerError,
  Gt as ShippingMethods,
  Wt as TermsAndConditions,
  Ae as createHandler,
  jt as defaultHandlers,
  Vt as emitShippingEstimateEvent,
  Lt as handleRefNumberChange,
  cn as resetHandlersCache
};
//# sourceMappingURL=containers.js.map
