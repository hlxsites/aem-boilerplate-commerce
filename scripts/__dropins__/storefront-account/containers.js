/*! Copyright 2026 Adobe
All Rights Reserved. */
import { Slot as Le, classes as U, debounce as lt } from "@dropins/tools/lib.js";
import { useText as Y, Text as La } from "@dropins/tools/i18n.js";
import * as R from "@dropins/tools/preact-bundle.js";
import { memo as va, useMemo as ve, jsx as n, Fragment as ue, forwardRef as ct, useImperativeHandle as ut, jsxs as S, useRef as ke, useState as A, useCallback as T, useEffect as W, useId as Qe } from "@dropins/tools/preact-bundle.js";
import { Checkbox as wa, Card as _e, Header as Ne, LiveRegion as za, Field as Pe, TextArea as pt, InputDate as mt, Picker as ba, Input as Ua, Skeleton as Me, SkeletonRow as se, Icon as ze, Button as pe, Tag as $e, Modal as qa, ProgressSpinner as ja, IllustratedMessage as Ze, InLineAlert as Ie, InputPassword as Ge, Pagination as ya, Table as gt, ToggleButton as ht, Image as xa, Price as ft, ContentGrid as vt, StarRating as oa } from "@dropins/tools/components.js";
import { events as da } from "@dropins/tools/event-bus.js";
import { c as Ga, b as wt, getCompanyAddressBook as bt, getAttributesForm as Je, getCustomerAddress as yt, deleteCompanyAddress as _t, removeCustomerAddress as At, a as Wa, getCustomerCompanyContext as Ct, g as ta, getCustomerRolePermissions as Bt, updateCustomerAddress as la, getCountries as Lt, setDefaultCompanyAddress as ra, updateCompanyAddress as xt, createCompanyAddress as St, createCustomerAddress as Pt, getStoreConfig as Ja, updateCustomerPassword as kt, getOrderHistoryList as Nt, O as It, getCustomerPaymentTokens as Et, deletePaymentToken as Vt, d as Dt, getCustomerReviews as Tt, getCustomer as Ya, updateCustomer as ca, updateCustomerEmail as Mt, t as Ft, getAdminAssistanceActions as Ot } from "./api.js";
import { Fragment as Sa } from "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
import "./fragments.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const $t = (e) => e.reduce((t, a) => ({ ...t, [a.name]: a.value }), {}), Rt = (e) => /^\d+$/.test(e), Ht = (e) => /^[a-zA-Z0-9\s]+$/.test(e), Zt = (e) => /^[a-zA-Z0-9]+$/.test(e), zt = (e) => /^[a-zA-Z]+$/.test(e), Ut = (e) => /^[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+(\.[a-z0-9,!\#\$%&'\*\+\/=\?\^_`\{\|\}~-]+)*@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(e), qt = (e) => /^\d{4}-\d{2}-\d{2}$/.test(e) && !isNaN(Date.parse(e)), jt = (e, t, a) => {
  const r = new Date(e).getTime() / 1e3;
  return !(isNaN(r) || r < 0 || t !== void 0 && r < t || a !== void 0 && r > a);
}, Pa = (e) => !e || isNaN(Number(e)) ? "" : new Date(parseInt(e, 10) * 1e3).toISOString().split("T")[0], Gt = (e) => /^(https?|ftp):\/\/(([A-Z0-9]([A-Z0-9_-]*[A-Z0-9]|))(\.[A-Z0-9]([A-Z0-9_-]*[A-Z0-9]|))*)(:(\d+))?(\/[A-Z0-9~](([A-Z0-9_~-]|\.)*[A-Z0-9~]|))*\/?(.*)?$/i.test(e), Wt = (e, t, a) => {
  const r = e.length;
  return r >= t && r <= a;
}, na = (e, t, a, r) => {
  var i, s;
  const { requiredFieldError: l, lengthTextError: o, numericError: u, alphaNumWithSpacesError: m, alphaNumericError: c, alphaError: p, emailError: y, dateError: _, urlError: f, dateLengthError: w } = a, h = t == null ? void 0 : t.customUpperCode, v = { [h]: "" };
  if (r[h] && delete r[h], t != null && t.required && (!e || e === "false")) return { [h]: l };
  if (!(t != null && t.required) && !e || !((i = t == null ? void 0 : t.validateRules) != null && i.length)) return v;
  const C = $t(t == null ? void 0 : t.validateRules), B = C.MIN_TEXT_LENGTH ?? 1, b = C.MAX_TEXT_LENGTH ?? 255, D = C.DATE_RANGE_MIN, d = C.DATE_RANGE_MAX;
  if (!Wt(e, +B, +b) && !(D || d)) return { [h]: o.replace("{min}", B).replace("{max}", b) };
  if (!jt(e, +D, +d) && (D || d)) return { [h]: w.replace("{min}", Pa(D)).replace("{max}", Pa(d)) };
  const L = { numeric: { validate: Rt, error: u }, "alphanum-with-spaces": { validate: Ht, error: m }, alphanumeric: { validate: Zt, error: c }, alpha: { validate: zt, error: p }, email: { validate: Ut, error: y }, date: { validate: qt, error: _ }, url: { validate: Gt, error: f } }[C.INPUT_VALIDATION];
  return L && !L.validate(e) && !((s = r[h]) != null && s.length) ? { [h]: L.error } : v;
}, Ka = (e) => {
  switch (e) {
    case "on":
    case "true":
    case 1:
    case "1":
      return !0;
    case "0":
    case "off":
    case "false":
    case 0:
      return !1;
    default:
      return !1;
  }
}, Jt = ["true", "false", "yes", "on", "off"], Yt = { firstName: "", lastName: "", nickname: "", city: "", company: "", countryCode: "", addressType: "", addressTypeShipping: "", addressTypeBilling: "", isDefault: "", region: "", regionCode: "", regionId: "", id: "", telephone: "", vatId: "", postcode: "", defaultShipping: "", defaultBilling: "", street: "", saveAddressBook: "", prefix: "", middleName: "", fax: "", suffix: "", uid: "" }, Kt = (e) => {
  const t = {}, a = {};
  for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
    const i = e[r], s = r.match(/^(.*)Multiline_(\d+)$/);
    if (s) {
      const l = s[1], o = parseInt(s[2], 10);
      a[l] || (a[l] = []), a[l].push({ index: o, value: i });
    } else Object.keys(e).filter((l) => l.startsWith(`${r}Multiline_`)).length > 0 ? a[r] = [{ index: 1, value: i }] : t[r] = i;
  }
  for (const r in a) if (Object.prototype.hasOwnProperty.call(a, r)) {
    const i = a[r];
    i.sort((s, l) => s.index - l.index), t[r] = i.map((s) => s.value);
  }
  return t;
}, Xt = (e) => {
  const t = {}, a = [];
  for (const r in e) {
    const i = Jt.includes(e[r]) ? Ka(e[r]) : e[r];
    Object.prototype.hasOwnProperty.call(e, r) && (Object.prototype.hasOwnProperty.call(Yt, r) ? t[r] = i : a.push({ code: Wa(r), value: i }));
  }
  return { ...t, customAttributes: a };
}, Ye = (e, t = !1) => {
  const a = Ga(e, "camelCase", { firstname: "firstName", lastname: "lastName", middlename: "middleName" }), r = Xt(Kt(a));
  if (!t) return r;
  const [i, s] = r.region ? r.region.split(",") : [];
  return { ...r, region: { regionCode: i, ...s && { regionId: +s } } };
}, We = (e) => {
  if (!e.current) return {};
  const t = e.current.elements;
  return Array.from(t).reduce((a, r) => (r.name && (a[r.name] = r.type === "checkbox" ? r.checked : r.value), a), {});
}, ka = (e, t) => Object.keys(e).length ? Object.keys(e).every((a) => a in t && t[a] !== "") : !1, ea = (e) => typeof e == "function", Qt = (e) => e.reduce((t, { customUpperCode: a, required: r, defaultValue: i }) => (r && a && (t.initialData[a] = i || "", t.errorList[a] = ""), t), { initialData: {}, errorList: {} }), Na = (e) => Object.keys(e).length > 0, er = ({ fieldsConfig: e, onSubmit: t, onChange: a, setInputChange: r, formName: i }) => {
  const s = Y({ requiredFieldError: "Account.FormText.requiredFieldError", lengthTextError: "Account.FormText.lengthTextError", numericError: "Account.FormText.numericError", alphaNumWithSpacesError: "Account.FormText.alphaNumWithSpacesError", alphaNumericError: "Account.FormText.alphaNumericError", alphaError: "Account.FormText.alphaError", emailError: "Account.FormText.emailError", dateError: "Account.FormText.dateError", dateLengthError: "Account.FormText.dateLengthError", urlError: "Account.FormText.urlError" }), l = ke(null), [o, u] = A({}), [m, c] = A({}), [p, y] = A({}), [_, f] = A(!0), [w, h] = A(!1), [v, C] = A(!1), [B, b] = A(!0), [D, d] = A(!1), L = T((k = !1) => {
    let P = !0;
    const g = { ...m };
    let I = null;
    for (const [O, Z] of Object.entries(o)) {
      const J = e == null ? void 0 : e.find((te) => te.customUpperCode.includes(O)), oe = na(Z.toString(), J, s, g);
      oe[O] && (Object.assign(g, oe), P = !1), I || (I = Object.keys(g).find((te) => g[te]) || null);
    }
    if (k || c(g), I && l.current && !k) {
      const O = l.current.elements.namedItem(I);
      O == null || O.focus();
    }
    return P;
  }, [m, e, o, s]), x = T((k, P, g, I, O) => {
    const Z = { ...We(l), ...O || {}, [P]: k, ...P.includes("countryCode") ? { region: "" } : {} }, J = { data: Ye(Z, !0), isDataValid: ka(g, Z) };
    d(J.isDataValid), L(!0), ["selectedShippingAddress", "selectedBillingAddress"].includes(i) && sessionStorage.setItem(`${i}_addressData`, JSON.stringify(J)), a == null || a(J, {}, I);
  }, [L, i, a]);
  W(() => {
    if (e != null && e.length) {
      const { initialData: k, errorList: P } = Qt(e);
      u((g) => ({ ...k, ...g })), c(P), y(P);
    }
  }, [JSON.stringify(e)]), W(() => {
    if (v) return;
    const k = We(l), P = sessionStorage.getItem(`${i}_addressData`);
    if (Na(o) && Na(p)) {
      let g = {};
      const I = ka(p, o);
      P ? g = JSON.parse(P).data : g = Ye(k, !0) ?? {}, a == null || a({ data: g, isDataValid: I }, {}, null), d(I), C(!0);
    }
  }, [o, p]), W(() => {
    var k;
    if (!B) return;
    const P = We(l), g = !!(P != null && P.countryCode), I = !!((k = P == null ? void 0 : P.region) != null && k.length);
    P && g && !I && ea(a) && x(P == null ? void 0 : P.region, "region", p, null);
  }, [B, _, e, l, a, x, p, w]);
  const M = T((k, P) => {
    const { name: g, value: I, type: O, checked: Z } = k == null ? void 0 : k.target, J = O === "checkbox" ? Z : I, oe = O === "checkbox" && g === "addressTypeShipping" && Z ? { addressTypeBilling: !1 } : O === "checkbox" && g === "addressTypeBilling" && Z ? { addressTypeShipping: !1 } : {};
    u((z) => {
      const q = { ...z, ...oe, [g]: J };
      return g === "countryCode" && (q.region = "", f(!0), h(!1)), q;
    }), r == null || r({ ...oe, [g]: J }), C(!0);
    const te = e == null ? void 0 : e.find((z) => z.customUpperCode.includes(g)), E = P ? { ...P } : { ...m };
    if (te) {
      const z = na(J.toString(), te, s, E);
      z && Object.assign(E, z), c(E);
    }
    x(J, g, p, k, oe);
  }, [r, e, m, s, x, p, _]), F = T((k) => {
    const { name: P } = k == null ? void 0 : k.target, g = e == null ? void 0 : e.find((I) => I.customUpperCode === P);
    P === "region" && g != null && g.options.length && b(!1), b(P === "countryCode");
  }, []), N = T((k, P) => {
    const { name: g, value: I, type: O, checked: Z } = k == null ? void 0 : k.target, J = O === "checkbox" ? Z : I, oe = e == null ? void 0 : e.find((te) => te.customUpperCode === g);
    if (oe) {
      const te = P ? { ...P } : { ...m }, E = na(J.toString(), oe, s, te);
      E && Object.assign(te, E), c(te);
    }
  }, [m, e, s]), $ = T((k) => {
    k.preventDefault();
    const P = L();
    t == null || t(k, P);
  }, [L, t]);
  return { isDataValid: D, formData: o, errors: m, formRef: l, handleInputChange: M, onFocus: F, handleBlur: N, handleSubmit: $, handleValidationSubmit: L };
};
var xe = ((e) => (e.BOOLEAN = "BOOLEAN", e.DATE = "DATE", e.DATETIME = "DATETIME", e.DROPDOWN = "DROPDOWN", e.FILE = "FILE", e.GALLERY = "GALLERY", e.HIDDEN = "HIDDEN", e.IMAGE = "IMAGE", e.MEDIA_IMAGE = "MEDIA_IMAGE", e.MULTILINE = "MULTILINE", e.MULTISELECT = "MULTISELECT", e.PRICE = "PRICE", e.SELECT = "SELECT", e.TEXT = "TEXT", e.TEXTAREA = "TEXTAREA", e.UNDEFINED = "UNDEFINED", e.VISUAL = "VISUAL", e.WEIGHT = "WEIGHT", e.EMPTY = "", e))(xe || {});
const ar = { firstname: "given-name", middlename: "additional-name", lastname: "family-name", email: "email" }, tr = (e) => ar[e], rr = va(({ loading: e, values: t, fields: a = [], errors: r, className: i = "", onChange: s, onBlur: l, onFocus: o, slots: u, fieldIdPrefix: m }) => {
  const c = `${i}__field`, p = ve(() => Object.fromEntries(a.flatMap((d) => [[`${d.code}.label`, `Account.AddressForm.fields.${d.code}.label`], [`${d.code}.placeholder`, `Account.AddressForm.fields.${d.code}.placeholder`]])), [a]), y = Y(p), _ = (d) => d.forceLabel ? d.label : y[`${d.code}.label`] || d.label, f = (d) => `${_(d)} ${d.required ? "*" : ""}`, w = (d) => y[`${d.code}.placeholder`] || d.label, h = (d, L) => {
    if (!(u != null && u[`AddressFormInput_${d.code}`])) return;
    const x = { inputName: d.customUpperCode, handleOnChange: s, handleOnBlur: l, handleOnFocus: o, errorMessage: L, errors: r, config: d };
    return n(Le, { "data-testid": `addressFormInput_${d.code}`, name: `AddressFormInput_${d.code}`, slot: u[`AddressFormInput_${d.code}`], context: x }, d.id);
  }, v = (d, L, x) => {
    var M;
    const F = d.defaultValue ?? ((M = d.options.find((N) => N.isDefault)) == null ? void 0 : M.value) ?? L ?? d.defaultValue;
    return n(ue, { children: h(d, x) ?? n(Pe, { error: x, className: U([c, `${c}--${d.id}`, [`${c}--${d.id}-hidden`, d.isHidden], d.className]), "data-testid": `${i}--${d.id}`, disabled: e || d.disabled, children: n(ba, { "aria-label": _(d), "aria-required": d.required ? "true" : "false", id: m ? `${m}_${d.code}` : d.code, required: d == null ? void 0 : d.required, name: d.customUpperCode, floatingLabel: f(d), placeholder: w(d), options: d.options, onBlur: l, onFocus: o, handleSelect: s, defaultValue: F, value: F, disabled: e || d.disabled }) }, d.id) });
  }, C = (d, L, x) => n(ue, { children: h(d, x) ?? n(Pe, { error: x, className: U([c, `${c}--${d.id}`, [`${c}--${d.id}-hidden`, d.isHidden], d.className]), "data-testid": `${i}--${d.id}`, disabled: e || d.disabled, children: n(Ua, { "aria-label": _(d), "aria-required": d.required ? "true" : "false", id: m ? `${m}_${d.code}` : d.code, type: "text", name: d.customUpperCode, autoComplete: tr(d.code), value: L ?? d.defaultValue, placeholder: w(d), floatingLabel: f(d), onBlur: l, onFocus: o, onChange: s, disabled: e || d.disabled }) }, d.id) }), B = (d, L, x) => n(ue, { children: h(d, x) ?? n(Pe, { error: x, className: U([c, `${c}--${d.id}`, [`${c}--${d.id}-hidden`, d.isHidden], d.className]), "data-testid": `${i}--${d.id}`, disabled: e || d.disabled, children: n(mt, { "aria-label": _(d), "aria-required": d.required ? "true" : "false", id: m ? `${m}_${d.code}` : d.code, type: "text", name: d.customUpperCode, value: L || d.defaultValue, placeholder: w(d), floatingLabel: f(d), onBlur: l, onChange: s, disabled: e || d.disabled }) }, d.id) }), b = (d, L, x) => n(ue, { children: h(d, x) ?? n(Pe, { error: x, className: U([c, `${c}--${d.id}`, [`${c}--${d.id}-hidden`, d.isHidden], d.className]), "data-testid": `${i}--${d.id}`, disabled: e || d.disabled || (d == null ? void 0 : d.isHidden), children: n(wa, { "aria-label": _(d), "aria-required": d.required ? "true" : "false", "aria-hidden": d.isHidden, tabindex: d != null && d.isHidden ? -1 : 0, id: m ? `${m}_${d.code}` : d.code, name: d.customUpperCode, checked: typeof L == "boolean" ? L : !!d.defaultValue, placeholder: w(d), label: f(d), onBlur: l, onChange: s, disabled: e || d.disabled || (d == null ? void 0 : d.isHidden) }) }, d.id) }), D = (d, L, x) => n(ue, { children: h(d, x) ?? n(Pe, { error: x, className: U([c, `${c}--${d.id}`, [`${c}--${d.id}-hidden`, d.isHidden], d.className]), "data-testid": `${i}--${d.id}`, disabled: e || d.disabled, children: n(pt, { "aria-label": _(d), "aria-required": d.required ? "true" : "false", id: m ? `${m}_${d.code}` : d.code, type: "text", name: d.customUpperCode, value: L ?? d.defaultValue, label: f(d), onBlur: l, onChange: s, disabled: e || d.disabled }) }, d.id) });
  return a.length ? n(ue, { children: a.map((d) => {
    const L = r == null ? void 0 : r[d.customUpperCode], x = t == null ? void 0 : t[d.customUpperCode];
    switch (d.fieldType) {
      case xe.TEXT:
        return d.options.length ? v(d, x, L) : C(d, x, L);
      case xe.MULTILINE:
        return C(d, x, L);
      case xe.SELECT:
        return v(d, x, L);
      case xe.DATE:
        return B(d, x, L);
      case xe.BOOLEAN:
        return b(d, x, L);
      case xe.TEXTAREA:
        return D(d, x, L);
      default:
        return null;
    }
  }) }) : null;
}), Ue = ({ testId: e, withCard: t = !0 }) => {
  const a = S(Me, { "data-testid": e || "skeletonLoader", children: [n(se, { variant: "heading", size: "xlarge", fullWidth: !1, lines: 1 }), n(se, { variant: "heading", size: "xlarge", fullWidth: !0, lines: 1 }), n(se, { variant: "heading", size: "xlarge", fullWidth: !0, lines: 1 })] });
  return t ? a : n(_e, { variant: "secondary", className: U(["account-account-loaders", "account-account-loaders--card-loader"]), children: a });
}, nr = () => S(Me, { "data-testid": "addressFormLoader", children: [n(se, { variant: "heading", size: "medium" }), n(se, { variant: "empty", size: "medium" }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large", fullWidth: !0 }), n(se, { size: "large", fullWidth: !0, lines: 3 }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large" }), n(se, { size: "large", fullWidth: !0 })] }), ir = () => n(Me, { "data-testid": "addressActionsLoader", className: "account-account-loaders--address-actions-loader", children: n(se, { size: "medium" }) }), Xa = va(ct(({ setInputChange: e, showFormLoader: t, slots: a, name: r, loading: i, children: s, className: l = "defaultForm", fieldsConfig: o, onSubmit: u, onChange: m, forwardFormRef: c, regionOptions: p, showSaveCheckBox: y, handleSaveCheckBoxAddress: _, saveCheckBoxAddress: f, fieldIdPrefix: w }) => {
  const h = Y({ saveAddressBook: "Account.AddressForm.formText.saveAddressBook" }), { isDataValid: v, formData: C, errors: B, formRef: b, handleInputChange: D, handleBlur: d, handleSubmit: L, handleValidationSubmit: x, onFocus: M } = er({ fieldsConfig: o, onSubmit: u, onChange: m, setInputChange: e, formName: r });
  return ut(c, () => {
    const F = We(b);
    return { handleValidationSubmit: x, requestSubmit: () => {
      var N;
      (N = b.current) == null || N.requestSubmit();
    }, formData: Ye(F, !0), isDataValid: v };
  }), t || !(o != null && o.length) ? n(nr, {}) : S("form", { className: U(["account-form", l]), onSubmit: L, name: r, ref: b, children: [n(rr, { className: l, loading: i, fields: o, onChange: D, onBlur: d, errors: B, values: C, onFocus: M, slots: a, fieldIdPrefix: w }), a != null && a.AddressFormInputs ? n(Le, { "data-testid": "addressFormInputs", name: "AddressFormInputs", slot: a.AddressFormInputs, context: { formActions: { handleChange: D } } }) : null, y ? n("div", { className: "account-address-form--saveAddressBook", children: n(wa, { "data-testid": "testSaveAddressBook", name: "saveAddressBook", label: h.saveAddressBook, checked: f, onChange: (F) => {
    D(F), _ == null || _(F);
  } }) }) : null, s] });
})), Ia = (e, t, a = {}, r = "editButton") => {
  const i = r === "removeButton", s = { shippingAndBilling: { edit: a.editAddressAriaLabelShippingAndBilling, remove: a.removeAddressAriaLabelShippingAndBilling }, shipping: { edit: a.editAddressAriaLabelShipping, remove: a.removeAddressAriaLabelShipping }, billing: { edit: a.editAddressAriaLabelBilling, remove: a.removeAddressAriaLabelBilling }, default: { edit: a.editAddressAriaLabelDefault, remove: a.removeAddressAriaLabelDefault } };
  let l = "default";
  return e && t ? l = "shippingAndBilling" : e ? l = "shipping" : t && (l = "billing"), i ? s[l].remove : s[l].edit;
}, ua = ({ slots: e, selectable: t, selectShipping: a, selectBilling: r, variant: i = "secondary", minifiedView: s, keysSortOrder: l, addressData: o, loading: u, setAddressId: m, handleRenderModal: c, handleRenderForm: p, isB2BFlow: y, permissions: _ }) => {
  const f = Qe(), w = s ? "minifiedView" : "fullSizeView", h = Y({ actionRemove: `Account.${w}.Addresses.addressCard.actionRemove`, actionEdit: `Account.${w}.Addresses.addressCard.actionEdit`, cardLabelShipping: `Account.${w}.Addresses.addressCard.cardLabelShipping`, cardLabelBilling: `Account.${w}.Addresses.addressCard.cardLabelBilling`, cardLabelDefaultShipping: `Account.${w}.Addresses.addressCard.cardLabelDefaultShipping`, cardLabelDefaultBilling: `Account.${w}.Addresses.addressCard.cardLabelDefaultBilling`, defaultLabelText: `Account.${w}.Addresses.addressCard.defaultLabelText`, editAddressAriaLabelDefault: `Account.${w}.Addresses.addressCard.ariaLabel.editButton.default`, editAddressAriaLabelShipping: `Account.${w}.Addresses.addressCard.ariaLabel.editButton.shipping`, editAddressAriaLabelBilling: `Account.${w}.Addresses.addressCard.ariaLabel.editButton.billing`, editAddressAriaLabelShippingAndBilling: `Account.${w}.Addresses.addressCard.ariaLabel.editButton.shippingAndBilling`, removeAddressAriaLabelDefault: `Account.${w}.Addresses.addressCard.ariaLabel.removeButton.default`, removeAddressAriaLabelShipping: `Account.${w}.Addresses.addressCard.ariaLabel.removeButton.shipping`, removeAddressAriaLabelBilling: `Account.${w}.Addresses.addressCard.ariaLabel.removeButton.billing`, removeAddressAriaLabelShippingAndBilling: `Account.${w}.Addresses.addressCard.ariaLabel.removeButton.shippingAndBilling` }), v = h.cardLabelBilling.toLocaleUpperCase(), C = h.cardLabelShipping.toLocaleUpperCase(), B = h.defaultLabelText.toLocaleUpperCase(), b = y ? h.cardLabelDefaultShipping.toLocaleUpperCase() : C, D = y ? h.cardLabelDefaultBilling.toLocaleUpperCase() : v, d = ve(() => {
    const P = { shippingLabel: C, billingLabel: v, hideShipping: !1, hideBilling: !1 };
    return t ? a && !r ? { shippingLabel: B, billingLabel: B, hideShipping: !1, hideBilling: !0 } : r && !a ? { shippingLabel: B, billingLabel: B, hideShipping: !0, hideBilling: !1 } : P : P;
  }, [v, B, C, r, a, t]), L = T(() => {
    m == null || m(o == null ? void 0 : o.id), c == null || c();
  }, [c, o == null ? void 0 : o.id, m]), x = T(() => {
    m == null || m(o == null ? void 0 : o.id), p == null || p();
  }, [p, o == null ? void 0 : o.id, m]), M = ve(() => {
    if (!l || !o) return [];
    const { region: P, ...g } = o, I = { ...g, ...P || {} }, O = l.filter(({ name: Z }) => I[Z]).map((Z) => ({ name: Z.name, orderNumber: Z.orderNumber, value: I[Z.name], label: Z.label }));
    return I.nickname && !O.some(({ name: Z }) => Z === "nickname") && O.push({ name: "nickname", orderNumber: Number.MAX_SAFE_INTEGER, value: I.nickname, label: null }), O;
  }, [o, l]), { shippingLabel: F, billingLabel: N, hideShipping: $, hideBilling: k } = d;
  return n(_e, { variant: i, className: "account-address-card", "data-testid": "addressCard", children: u ? n(Ue, {}) : S(ue, { children: [S("div", { className: "account-address-card__action", children: [c && (!y || _ != null && _.canDeleteAddress) ? n(pe, { type: "button", variant: "tertiary", onClick: L, "data-testid": "removeButton", "aria-label": Ia(o == null ? void 0 : o.defaultShipping, o == null ? void 0 : o.defaultBilling, h, "removeButton"), "aria-describedby": f, children: h.actionRemove }) : null, p && (!y || _ != null && _.canEditAddress || _ != null && _.canSetDefaultAddress) ? n(pe, { type: "button", variant: "tertiary", onClick: x, className: "account-address-card__action--editbutton", "data-testid": "editButton", "aria-label": Ia(o == null ? void 0 : o.defaultShipping, o == null ? void 0 : o.defaultBilling, h, "editButton"), "aria-describedby": f, children: h.actionEdit }) : null] }), n("div", { className: "account-address-card__description", id: f, children: e != null && e.AddressCard ? n(Le, { name: "AddressCard", slot: e == null ? void 0 : e.AddressCard, context: { addressData: M } }) : n(ue, { children: M.map((P, g) => {
    const I = P.label ? `${P.label}: ${P == null ? void 0 : P.value}` : P == null ? void 0 : P.value;
    return n("p", { "data-testid": `${P.name}_${g}`, children: I }, g);
  }) }) }), (o != null && o.defaultShipping || o != null && o.defaultBilling) && !t ? S("div", { className: "account-address-card__labels", children: [o != null && o.defaultShipping ? n($e, { label: b }) : null, o != null && o.defaultBilling ? n($e, { label: D }) : null] }) : null, t ? S("div", { className: "account-address-card__labels", children: [!$ && o != null && o.defaultShipping ? n($e, { label: F }) : null, !k && o != null && o.defaultBilling ? n($e, { label: N }) : null] }) : null] }) });
}, sr = (e) => R.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, R.createElement("g", { id: "Large" }, R.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), R.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, R.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), R.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" })))), or = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { d: "M3.375 7.38672C3.09886 7.38672 2.875 7.61058 2.875 7.88672C2.875 8.16286 3.09886 8.38672 3.375 8.38672V7.38672ZM5.88409 8.38672C6.16023 8.38672 6.38409 8.16286 6.38409 7.88672C6.38409 7.61058 6.16023 7.38672 5.88409 7.38672V8.38672ZM3.375 11.1836C3.09886 11.1836 2.875 11.4075 2.875 11.6836C2.875 11.9597 3.09886 12.1836 3.375 12.1836V11.1836ZM5.88409 12.1836C6.16023 12.1836 6.38409 11.9597 6.38409 11.6836C6.38409 11.4075 6.16023 11.1836 5.88409 11.1836V12.1836ZM3.375 15.6133C3.09886 15.6133 2.875 15.8371 2.875 16.1133C2.875 16.3894 3.09886 16.6133 3.375 16.6133V15.6133ZM5.88409 16.6133C6.16023 16.6133 6.38409 16.3894 6.38409 16.1133C6.38409 15.8371 6.16023 15.6133 5.88409 15.6133V16.6133ZM8.52059 16.4182C8.51422 16.6942 8.73286 16.9232 9.00893 16.9296C9.285 16.9359 9.51396 16.7173 9.52032 16.4412L8.52059 16.4182ZM9.19302 14.8261L8.70612 14.7124C8.70434 14.72 8.70274 14.7277 8.70132 14.7354L9.19302 14.8261ZM11.2762 13.3887L11.4404 13.8611L11.4499 13.8576L11.2762 13.3887ZM12.3195 13.1013C12.4035 12.8382 12.2583 12.5569 11.9953 12.4729C11.7322 12.3889 11.4509 12.5341 11.3669 12.7971L12.3195 13.1013ZM15.7342 16.4412C15.7406 16.7173 15.9695 16.9359 16.2456 16.9296C16.5217 16.9232 16.7403 16.6942 16.734 16.4182L15.7342 16.4412ZM16.0615 14.8261L16.5532 14.7354C16.5518 14.7277 16.5502 14.72 16.5484 14.7124L16.0615 14.8261ZM13.9784 13.3887L13.8046 13.8577L13.8142 13.861L13.9784 13.3887ZM13.8877 12.7971C13.8037 12.5341 13.5223 12.3889 13.2593 12.4729C12.9962 12.5569 12.8511 12.8382 12.9351 13.1013L13.8877 12.7971ZM10.9023 10.418L11.4023 10.418V10.418H10.9023ZM11.2309 8.60993L11.6861 8.81678L11.6861 8.81678L11.2309 8.60993ZM12.0518 12.7684L11.7218 13.1441L11.7682 13.1848L11.823 13.213L12.0518 12.7684ZM13.202 12.7684L13.4308 13.213L13.4787 13.1884L13.5203 13.1541L13.202 12.7684ZM3.375 8.38672H5.88409V7.38672H3.375V8.38672ZM3.375 12.1836H5.88409V11.1836H3.375V12.1836ZM3.375 16.6133H5.88409V15.6133H3.375V16.6133ZM6.41058 2.375H18.844V1.375H6.41058V2.375ZM18.844 2.375C19.4866 2.375 20.125 2.99614 20.125 3.9225H21.125C21.125 2.57636 20.1627 1.375 18.844 1.375V2.375ZM20.125 3.9225V20.0775H21.125V3.9225H20.125ZM20.125 20.0775C20.125 20.9945 19.485 21.625 18.844 21.625V22.625C20.1643 22.625 21.125 21.4105 21.125 20.0775H20.125ZM18.844 21.625H6.41058V22.625H18.844V21.625ZM6.41058 21.625C5.76792 21.625 5.12955 21.0039 5.12955 20.0775H4.12955C4.12955 21.4236 5.09185 22.625 6.41058 22.625V21.625ZM5.12955 20.0775V3.9225H4.12955V20.0775H5.12955ZM5.12955 3.9225C5.12955 3.0055 5.76956 2.375 6.41058 2.375V1.375C5.0902 1.375 4.12955 2.5895 4.12955 3.9225H5.12955ZM9.52032 16.4412C9.53194 15.9373 9.59014 15.4295 9.68473 14.9168L8.70132 14.7354C8.59869 15.2917 8.53362 15.853 8.52059 16.4182L9.52032 16.4412ZM9.67993 14.9397C9.69157 14.8899 9.78099 14.7261 10.1128 14.496C10.4223 14.2813 10.8711 14.0589 11.4404 13.861L11.112 12.9165C10.4856 13.1343 9.94827 13.3931 9.54284 13.6743C9.15974 13.94 8.80542 14.2871 8.70612 14.7124L9.67993 14.9397ZM11.4499 13.8576C11.5852 13.8074 11.7547 13.7102 11.8933 13.6105C11.9656 13.5584 12.0441 13.4954 12.1133 13.4247C12.1723 13.3646 12.2709 13.2534 12.3195 13.1013L11.3669 12.7971C11.3809 12.7532 11.3985 12.7277 11.4022 12.7225C11.407 12.7157 11.4073 12.7164 11.3993 12.7246C11.3827 12.7416 11.3525 12.7676 11.3092 12.7988C11.2674 12.8288 11.222 12.8575 11.1805 12.8808C11.1363 12.9057 11.1089 12.9175 11.1024 12.9199L11.4499 13.8576ZM16.734 16.4182C16.7209 15.853 16.6559 15.2917 16.5532 14.7354L15.5698 14.9168C15.6644 15.4295 15.7226 15.9373 15.7342 16.4412L16.734 16.4182ZM16.5484 14.7124C16.4491 14.2871 16.0948 13.94 15.7117 13.6743C15.3063 13.3931 14.769 13.1343 14.1426 12.9165L13.8142 13.861C14.3834 14.0589 14.8322 14.2813 15.1417 14.496C15.4736 14.7261 15.563 14.8899 15.5746 14.9397L16.5484 14.7124ZM14.1521 12.9199C14.1456 12.9175 14.1183 12.9057 14.074 12.8808C14.0325 12.8575 13.9871 12.8288 13.9453 12.7988C13.9021 12.7676 13.8719 12.7416 13.8552 12.7246C13.8472 12.7164 13.8476 12.7157 13.8524 12.7225C13.856 12.7277 13.8736 12.7532 13.8877 12.7971L12.9351 13.1013C12.9836 13.2534 13.0823 13.3646 13.1412 13.4247C13.2105 13.4954 13.2889 13.5584 13.3612 13.6105C13.4999 13.7102 13.6694 13.8074 13.8046 13.8576L14.1521 12.9199ZM11.4023 10.418C11.4023 9.83385 11.4811 9.26803 11.6861 8.81678L10.7757 8.40309C10.4878 9.03666 10.4023 9.76284 10.4023 10.418H11.4023ZM11.6861 8.81678C11.8053 8.55448 12.0796 8.38672 12.5813 8.38672V7.38672C11.8704 7.38672 11.1213 7.6426 10.7757 8.40309L11.6861 8.81678ZM12.5813 8.38672C13.087 8.38672 13.4614 8.60522 13.5777 8.83539L14.4703 8.38448C14.1169 7.685 13.2884 7.38672 12.5813 7.38672V8.38672ZM13.5777 8.83539C13.7606 9.19738 13.8523 9.72518 13.8523 10.418H14.8523C14.8523 9.66433 14.757 8.95213 14.4703 8.38448L13.5777 8.83539ZM12.5813 12.4492C12.5364 12.4492 12.5158 12.4464 12.5087 12.4451C12.5046 12.4444 12.5042 12.4442 12.5008 12.4428C12.4922 12.4391 12.4782 12.4321 12.438 12.4096C12.4018 12.3893 12.3471 12.358 12.2805 12.3238L11.823 13.213C11.8698 13.2371 11.9055 13.2576 11.9494 13.2821C11.9893 13.3045 12.0449 13.3354 12.1079 13.3623C12.2569 13.426 12.403 13.4492 12.5813 13.4492V12.4492ZM12.3817 12.3927C11.8273 11.9058 11.4022 11.3083 11.4023 10.418L10.4023 10.4179C10.4022 11.6973 11.0412 12.5462 11.7218 13.1441L12.3817 12.3927ZM13.8523 10.418C13.8523 11.3319 13.4575 11.9093 12.8838 12.3828L13.5203 13.1541C14.2611 12.5427 14.8523 11.7035 14.8523 10.418H13.8523ZM12.9733 12.3238C12.7638 12.4316 12.717 12.4492 12.5813 12.4492V13.4492C12.9639 13.4492 13.1869 13.3385 13.4308 13.213L12.9733 12.3238Z", fill: "currentColor" })), dr = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M2.00718 5H22.1507C22.7047 5 23.1579 5.45323 23.1579 6.00718V7.51794C23.1579 7.51794 1.01007 7.58844 1 7.55823V6.00718C1 5.45323 1.45323 5 2.00718 5Z", stroke: "currentColor", strokeWidth: 1 }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M23.1579 9.78409V18.3451C23.1579 18.899 22.7047 19.3523 22.1507 19.3523H2.00718C1.45323 19.3523 1 18.899 1 18.3451V9.78409H23.1579Z", stroke: "currentColor", strokeWidth: 1 }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M3.01465 15.9682H8.40305", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.6192 17.5897C18.4535 17.5897 19.1299 16.9133 19.1299 16.0789C19.1299 15.2446 18.4535 14.5682 17.6192 14.5682C16.7848 14.5682 16.1084 15.2446 16.1084 16.0789C16.1084 16.9133 16.7848 17.5897 17.6192 17.5897Z", stroke: "currentColor", strokeWidth: 1 }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M19.8848 17.5897C20.7192 17.5897 21.3956 16.9133 21.3956 16.0789C21.3956 15.2446 20.7192 14.5682 19.8848 14.5682C19.0504 14.5682 18.374 15.2446 18.374 16.0789C18.374 16.9133 19.0504 17.5897 19.8848 17.5897Z", stroke: "currentColor", strokeWidth: 1 })), lr = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M6.75 12.762L10.2385 15.75L17.25 9", stroke: "currentColor" })), Ke = (e) => R.createElement("svg", { id: "Icon_Chevron_right_Base", "data-name": "Icon \\u2013 Chevron right \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, R.createElement("g", { id: "Large" }, R.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), R.createElement("g", { id: "Chevron_right_icon", "data-name": "Chevron right icon" }, R.createElement("path", { vectorEffect: "non-scaling-stroke", id: "chevron", d: "M199.75,367.5l4.255,-4.255-4.255,-4.255", transform: "translate(-189.25 -351.0)", fill: "none", stroke: "currentColor" })))), cr = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3599 5.64001L5.62988 18.37", stroke: "currentColor" }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3599 18.37L5.62988 5.64001", stroke: "currentColor" })), ur = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { d: "M12.002 21L11.8275 21.4686C11.981 21.5257 12.1528 21.5041 12.2873 21.4106C12.4218 21.3172 12.502 21.1638 12.502 21H12.002ZM3.89502 17.9823H3.39502C3.39502 18.1912 3.52485 18.378 3.72059 18.4509L3.89502 17.9823ZM3.89502 8.06421L4.07193 7.59655C3.91831 7.53844 3.74595 7.55948 3.61082 7.65284C3.47568 7.74619 3.39502 7.89997 3.39502 8.06421H3.89502ZM12.0007 21H11.5007C11.5007 21.1638 11.5809 21.3172 11.7154 21.4106C11.8499 21.5041 12.0216 21.5257 12.1751 21.4686L12.0007 21ZM20.1076 17.9823L20.282 18.4509C20.4778 18.378 20.6076 18.1912 20.6076 17.9823H20.1076ZM20.1076 8.06421H20.6076C20.6076 7.89997 20.527 7.74619 20.3918 7.65284C20.2567 7.55948 20.0843 7.53844 19.9307 7.59655L20.1076 8.06421ZM12.0007 11.1311L11.8238 10.6634C11.6293 10.737 11.5007 10.9232 11.5007 11.1311H12.0007ZM20.2858 8.53191C20.5441 8.43421 20.6743 8.14562 20.5766 7.88734C20.4789 7.62906 20.1903 7.49889 19.932 7.5966L20.2858 8.53191ZM12.002 4.94826L12.1775 4.48008C12.0605 4.43623 11.9314 4.43775 11.8154 4.48436L12.002 4.94826ZM5.87955 6.87106C5.62334 6.97407 5.49915 7.26528 5.60217 7.52149C5.70518 7.77769 5.99639 7.90188 6.2526 7.79887L5.87955 6.87106ZM18.1932 7.80315C18.4518 7.90008 18.74 7.76904 18.8369 7.51047C18.9338 7.2519 18.8028 6.96371 18.5442 6.86678L18.1932 7.80315ZM12 4.94827L11.5879 5.23148C11.6812 5.36719 11.8353 5.44827 12 5.44827C12.1647 5.44827 12.3188 5.36719 12.4121 5.23148L12 4.94827ZM14.0263 2L14.2028 1.53218C13.9875 1.45097 13.7446 1.52717 13.6143 1.71679L14.0263 2ZM21.8421 4.94827L22.2673 5.2113C22.3459 5.08422 22.3636 4.92863 22.3154 4.78717C22.2673 4.64571 22.1584 4.53319 22.0186 4.48045L21.8421 4.94827ZM9.97368 2L10.3857 1.71679C10.2554 1.52717 10.0125 1.45097 9.79721 1.53218L9.97368 2ZM2.15789 4.94827L1.98142 4.48045C1.84161 4.53319 1.73271 4.64571 1.68456 4.78717C1.63641 4.92863 1.65406 5.08422 1.73267 5.2113L2.15789 4.94827ZM12 11.1256L11.6702 11.5014C11.8589 11.667 12.1411 11.667 12.3298 11.5014L12 11.1256ZM15.0395 8.45812L14.8732 7.98659C14.8131 8.00779 14.7576 8.04028 14.7097 8.08232L15.0395 8.45812ZM23 5.65024L23.3288 6.0269C23.5095 5.86916 23.5527 5.60532 23.4318 5.39817C23.3109 5.19102 23.0599 5.09893 22.8337 5.17871L23 5.65024ZM8.96053 8.45812L9.29034 8.08232C9.24244 8.04028 9.18695 8.00779 9.12685 7.98659L8.96053 8.45812ZM1 5.65024L1.16632 5.17871C0.940115 5.09893 0.689119 5.19102 0.568192 5.39817C0.447264 5.60532 0.49048 5.86916 0.671176 6.0269L1 5.65024ZM12.1764 20.5314L4.06945 17.5137L3.72059 18.4509L11.8275 21.4686L12.1764 20.5314ZM4.39502 17.9823V8.06421H3.39502V17.9823H4.39502ZM3.71811 8.53187L11.8251 11.5987L12.1789 10.6634L4.07193 7.59655L3.71811 8.53187ZM11.502 11.1311V21H12.502V11.1311H11.502ZM12.1751 21.4686L20.282 18.4509L19.9332 17.5137L11.8262 20.5314L12.1751 21.4686ZM20.6076 17.9823V8.06421H19.6076V17.9823H20.6076ZM19.9307 7.59655L11.8238 10.6634L12.1776 11.5987L20.2845 8.53187L19.9307 7.59655ZM11.5007 11.1311V21H12.5007V11.1311H11.5007ZM19.932 7.5966L11.8251 10.6634L12.1789 11.5987L20.2858 8.53191L19.932 7.5966ZM11.8154 4.48436L5.87955 6.87106L6.2526 7.79887L12.1885 5.41217L11.8154 4.48436ZM11.8265 5.41645L18.1932 7.80315L18.5442 6.86678L12.1775 4.48008L11.8265 5.41645ZM11.502 4.94826V11.1311H12.502V4.94826H11.502ZM12.4121 5.23148L14.4384 2.28321L13.6143 1.71679L11.5879 4.66507L12.4121 5.23148ZM13.8498 2.46782L21.6656 5.4161L22.0186 4.48045L14.2028 1.53218L13.8498 2.46782ZM21.4169 4.68525L20.5485 6.08919L21.3989 6.61524L22.2673 5.2113L21.4169 4.68525ZM12.4121 4.66507L10.3857 1.71679L9.56162 2.28321L11.5879 5.23148L12.4121 4.66507ZM9.79721 1.53218L1.98142 4.48045L2.33437 5.4161L10.1502 2.46782L9.79721 1.53218ZM1.73267 5.2113L2.60109 6.61524L3.45154 6.08919L2.58312 4.68525L1.73267 5.2113ZM12.3298 11.5014L15.3693 8.83392L14.7097 8.08232L11.6702 10.7498L12.3298 11.5014ZM15.2058 8.92965L23.1663 6.12177L22.8337 5.17871L14.8732 7.98659L15.2058 8.92965ZM22.6712 5.27358L19.7764 7.80067L20.4341 8.554L23.3288 6.0269L22.6712 5.27358ZM12.3298 10.7498L9.29034 8.08232L8.63072 8.83392L11.6702 11.5014L12.3298 10.7498ZM9.12685 7.98659L1.16632 5.17871L0.83368 6.12177L8.79421 8.92965L9.12685 7.98659ZM0.671176 6.0269L3.56591 8.554L4.22356 7.80067L1.32882 5.27358L0.671176 6.0269Z", fill: "currentColor" })), pr = (e) => R.createElement("svg", { id: "Icon_Search_Base", "data-name": "Icon \\u2013 Search \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, fill: "none", viewBox: "0 0 24 24", ...e }, R.createElement("g", { id: "Large" }, R.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), R.createElement("g", { id: "Search_icon", "data-name": "Search icon", transform: "translate(3.75 3.75)" }, R.createElement("circle", { vectorEffect: "non-scaling-stroke", id: "Ellipse_186", "data-name": "Ellipse 186", cx: 6, cy: 6, r: 6, fill: "none", stroke: "currentColor" }), R.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_556", "data-name": "Line 556", x2: 6, y2: 6, transform: "translate(10.5 10.5)", fill: "none", stroke: "currentColor" })))), mr = (e) => R.createElement("svg", { id: "Icon_Warning_Base", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("g", { clipPath: "url(#clip0_841_1324)" }, R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.9949 2.30237L0.802734 21.6977H23.1977L11.9949 2.30237Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M12.4336 10.5504L12.3373 14.4766H11.6632L11.5669 10.5504V9.51273H12.4336V10.5504ZM11.5883 18.2636V17.2687H12.4229V18.2636H11.5883Z", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" })), R.createElement("defs", null, R.createElement("clipPath", { id: "clip0_841_1324" }, R.createElement("rect", { width: 24, height: 21, fill: "white", transform: "translate(0 1.5)", strokeWidth: 1 })))), pa = (e) => R.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M0.75 12C0.75 5.78421 5.78421 0.75 12 0.75C18.2158 0.75 23.25 5.78421 23.25 12C23.25 18.2158 18.2158 23.25 12 23.25C5.78421 23.25 0.75 18.2158 0.75 12Z", stroke: "currentColor" }), R.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M11.75 5.88423V4.75H12.25V5.88423L12.0485 13.0713H11.9515L11.75 5.88423ZM11.7994 18.25V16.9868H12.2253V18.25H11.7994Z", stroke: "currentColor" })), Ea = ({ selectable: e, className: t, addNewAddress: a, minifiedView: r, routeAddressesPage: i, isB2BFlow: s, permissions: l, loading: o }) => {
  const u = r ? "minifiedView" : "fullSizeView", m = Y({ viewAllAddressesButton: `Account.${u}.Addresses.viewAllAddressesButton`, addNewAddressButton: `Account.${u}.Addresses.addNewAddressButton`, differentAddressButton: `Account.${u}.Addresses.differentAddressButton`, noPermissionCreateAddresses: "Account.AddressForm.notifications.noPermissionCreateAddresses" }), c = e ? "span" : "button", p = e ? {} : { AriaRole: "button", type: "button" }, y = r && !a ? m.viewAllAddressesButton : m.addNewAddressButton, _ = e ? m.differentAddressButton : y;
  return o ? n("div", { className: U(["account-actions-address", "account-actions-address--loading", t]), "data-testid": "addressActionsLoaderWrapper", children: n(ir, {}) }) : s && !(l != null && l.canCreateAddress) ? n("div", { className: U(["account-actions-address", "account-actions-address--no-permission", t]), "data-testid": "noPermissionMessage", children: n("span", { className: "account-actions-address__title", children: m.noPermissionCreateAddresses }) }) : S(c, { ...p, className: U(["account-actions-address", ["account-actions-address--viewall", r], ["account-actions-address--address", !r], ["account-actions-address--selectable", e], t]), "data-testid": "showRouteFullAddress", onClick: i, children: [n("span", { className: "account-actions-address__title", "data-testid": "addressActionsText", children: _ }), n(ze, { source: r && !a ? Ke : sr, size: "32" })] });
}, gr = ({ minifiedView: e, keysSortOrder: t, addressData: a, open: r, submitLoading: i, onRemoveAddress: s, closeModal: l, isB2BFlow: o, permissions: u }) => {
  const m = e ? "minifiedView" : "fullSizeView", c = Y({ title: `Account.${m}.Addresses.removeAddressModal.title`, description: `Account.${m}.Addresses.removeAddressModal.description`, actionCancel: `Account.${m}.Addresses.removeAddressModal.actionCancel`, actionConfirm: `Account.${m}.Addresses.removeAddressModal.actionConfirm` });
  if (!r) return null;
  const p = i || o && !(u != null && u.canDeleteAddress);
  return n(qa, { className: "account-address-modal--overlay", title: n("h3", { children: c.title }), size: "full", "data-testid": "addressModal", showCloseButton: !0, onClose: l, children: S("div", { className: "account-address-modal", children: [i ? n("div", { className: "account-address-modal__spinner", "data-testid": "progressSpinner", children: n(ja, { stroke: "4", size: "large" }) }) : null, n("p", { children: c.description }), a ? n(ua, { minifiedView: e, addressData: a, keysSortOrder: t }) : null, S("div", { className: "account-address-modal__buttons", children: [n(pe, { type: "button", onClick: l, variant: "secondary", disabled: i, children: c.actionCancel }), n(pe, { disabled: p, onClick: s, children: c.actionConfirm })] })] }) });
}, Xe = ({ typeList: e, isEmpty: t, minifiedView: a, className: r }) => {
  const i = a ? "minifiedView" : "fullSizeView", s = Y({ addressesMessage: `Account.${i}.EmptyList.Addresses.message`, ordersListMessage: `Account.${i}.EmptyList.OrdersList.message`, paymentsMessage: `Account.${i}.EmptyList.Payments.message` }), l = ve(() => {
    switch (e) {
      case "address":
        return { icon: or, text: n("p", { children: s.addressesMessage }) };
      case "orders":
        return { icon: ur, text: n("p", { children: s.ordersListMessage }) };
      case "payments":
        return { icon: dr, text: n("p", { children: s.paymentsMessage }) };
      default:
        return { icon: "", text: "" };
    }
  }, [e, s]);
  return !t || !e || !l.text ? null : n(Ze, { className: U(["account-empty-list", a ? "account-empty-list--minified" : "", r]), message: l.text, icon: n(ze, { source: l.icon }), "data-testid": "emptyList" });
}, Va = { size: "32", stroke: "2" }, Da = ({ minifiedView: e, orderNumber: t, orderToken: a, routeOrdersList: r, routeOrderDetails: i }) => {
  const s = e ? "minifiedView" : "fullSizeView", l = Y({ viewAllOrdersButton: `Account.${s}.OrdersList.viewAllOrdersButton`, ariaLabelLink: `Account.${s}.OrdersList.ariaLabelLink` });
  return r ? n("a", { className: U(["account-orders-list-action", ["account-orders-list-action--minifiedView", e]]), "data-testid": "ordersListActionButtonMinifiedView", href: r(), children: n(_e, { "data-testid": "ordersListActionMinifiedView", variant: "secondary", children: S("div", { className: "account-orders-list-action__card-wrapper", children: [n("p", { children: l.viewAllOrdersButton }), n(ze, { source: Ke, ...Va })] }) }) }) : n("a", { "aria-label": `${l.ariaLabelLink} ${t ?? a}`, href: ea(i) ? i(t, a) : "#", className: "account-orders-list-action", "data-testid": "ordersListActionButton", children: n(ze, { source: Ke, ...Va }) });
}, hr = () => {
  const [e, t] = A(window.innerWidth < 768);
  return W(() => {
    const a = () => {
      t(window.innerWidth < 768);
    };
    return window.addEventListener("resize", a), () => {
      window.removeEventListener("resize", a);
    };
  }, []), e;
}, fr = ({ placeholderImage: e, minifiedView: t, item: a, withThumbnails: r, children: i, slots: s, routeTracking: l, routeOrderProduct: o, routeReturnDetails: u, ...m }) => {
  var c, p, y, _, f, w, h, v, C, B, b, D;
  const d = t ? "minifiedView" : "fullSizeView", L = Y({ orderNumber: `Account.${d}.OrdersList.OrdersListCard.orderNumber`, itemsAmount: `Account.${d}.OrdersList.OrdersListCard.itemsAmount`, carrier: `Account.${d}.OrdersList.OrdersListCard.carrier`, returnsText: `Account.${d}.OrdersList.OrdersListCard.returns`, deliveryDateText: `Account.${d}.OrdersList.OrdersListCard.orderDate`, placedByAdministrator: `Account.${d}.OrdersList.OrdersListCard.placedByAdministrator` }), x = hr(), M = ea(o), F = ve(() => ((a == null ? void 0 : a.items) ?? []).map((N, $) => {
    var k, P;
    const g = { title: (N == null ? void 0 : N.productName) ?? "", src: ((P = (k = N == null ? void 0 : N.product) == null ? void 0 : k.smallImage) == null ? void 0 : P.url) || e, alt: (N == null ? void 0 : N.productName) ?? "", width: 65, height: 65, loading: "eager" };
    return n(Le, { name: "OrderItemImage", slot: s == null ? void 0 : s.OrderItemImage, context: { data: N, defaultImageProps: g }, children: M ? n("a", { href: (o == null ? void 0 : o(N)) ?? "", target: "_blank", rel: "noreferrer", children: n(xa, { ...g }) }) : n(xa, { ...g }) }, `${$}_${N.id}`);
  }), [M, a.items, e, o, s == null ? void 0 : s.OrderItemImage]);
  return S(_e, { variant: "secondary", ...m, className: U(["account-orders-list-card", ["account-orders-list-card--full", ((c = a == null ? void 0 : a.items) == null ? void 0 : c.length) > 6]]), children: [n("div", { className: "account-orders-list-card__content", children: s != null && s.OrdersListCard ? n(Le, { "data-testid": `ordersListCard${a.id}`, name: "OrdersListCard", slot: s == null ? void 0 : s.OrdersListCard, context: { orderHistoryListItem: a } }) : S(ue, { children: [n("div", { children: a == null ? void 0 : a.status }), (a == null ? void 0 : a.adminAssistedOrder) > 0 && n("div", { children: L.placedByAdministrator }), s != null && s.OrdersListOrderTime ? n(Le, { "data-testid": `ordersListOrderTime${a.id}`, name: "OrdersListOrderTime", slot: s == null ? void 0 : s.OrdersListOrderTime, context: { deliveryDateText: L.deliveryDateText, orderDate: a == null ? void 0 : a.orderDate, orderTime: a == null ? void 0 : a.orderTime } }) : S("p", { children: [L.deliveryDateText, " ", a == null ? void 0 : a.orderDate] }), S("p", { children: [L.orderNumber, " ", a.number] }), (p = a == null ? void 0 : a.shipments) == null ? void 0 : p.map((N) => {
    var $;
    return ($ = N == null ? void 0 : N.tracking) == null ? void 0 : $.map((k) => {
      const P = l == null ? void 0 : l(k);
      return S("p", { "data-testid": k.number, children: [n("span", { children: `${L.carrier} ${k.carrier.toLocaleUpperCase()} ` }), P ? n("a", { href: P, target: "_blank", className: "account-orders-list-card__content--track_number", rel: "noreferrer", children: k.number }) : n("span", { className: "account-orders-list-card__content--track_number", children: k.number })] }, N.id);
    });
  }), a != null && a.returns && (y = a.returns) != null && y.length ? S("p", { "data-testid": a.number, children: [S("span", { children: [L.returnsText, " "] }), (_ = a == null ? void 0 : a.returns) == null ? void 0 : _.map((N) => n("span", { "data-testid": N.number, children: S("a", { href: (u == null ? void 0 : u({ orderNumber: a.number, orderToken: a.token, returnNumber: N.number })) ?? "#", className: "account-orders-list-card__content--return_number", children: [N.number, " "] }) }, N.uid))] }, a.id) : null, n("p", { children: n(ft, { amount: ((w = (f = a == null ? void 0 : a.total) == null ? void 0 : f.grandTotal) == null ? void 0 : w.value) ?? 0, currency: (v = (h = a == null ? void 0 : a.total) == null ? void 0 : h.grandTotal) == null ? void 0 : v.currency, weight: "normal", size: "medium" }) }), S("p", { "data-testid": "itemsAmount", children: [(C = a == null ? void 0 : a.items) != null && C.length ? (B = a == null ? void 0 : a.items) == null ? void 0 : B.reduce((N, $) => {
    const k = ($ == null ? void 0 : $.quantityOrdered) || 0;
    return N + k;
  }, 0) : 0, " ", L.itemsAmount] }), (b = a == null ? void 0 : a.items) != null && b.length ? n("ul", { className: "account-orders-list-card__product-list", children: a.items.map((N, $) => {
    if ($ >= 0 && $ < 10) return S("li", { className: "account-orders-list-card__content--product-name", children: [S("span", { className: "account-orders-list-card__content--quantity", children: [(N == null ? void 0 : N.quantityOrdered) > 1 ? N == null ? void 0 : N.quantityOrdered : null, " "] }), N == null ? void 0 : N.productName.replaceAll("-", " ")] }, `${$}_${N.id}`);
    if ($ === 11) return n("li", { children: "..." }, "ellipsis");
  }) }) : null] }) }), r && (D = a == null ? void 0 : a.items) != null && D.length ? n(vt, { maxColumns: x ? 3 : 9, emptyGridContent: n(ue, {}), className: U(["account-orders-list-card__images", ["account-orders-list-card__images-3", x]]), "data-testid": "ordersListCardImages", children: F }) : null, n("div", { className: "account-orders-list-card__actions", children: i })] });
}, vr = (e, t) => e || (t ? "checkout" : "addressBook"), wr = (e) => e === "addressBook", br = (e) => e === "checkout", yr = (e, t) => !!e && !!t, _r = (e) => !!(e != null && e.canAccessAddressBook) && !!(e != null && e.canViewAddress), Ar = ({ isB2BCandidate: e, isCompanyAddressBookEnabled: t, enforceB2BPermissions: a, permissions: r, hasB2BContainerAccess: i }) => !!e && !!t && a && !(r != null && r.loading) && !i, Cr = ({ isB2BCandidate: e, isCompanyAddressBookEnabled: t, isB2BWithoutViewAccess: a }) => !!e && (t || a), Br = ({ isCheckoutContext: e, isB2BFlow: t, selectable: a, isCustomShippingAddressAllowed: r, selectShipping: i, selectBilling: s }) => e && !!t && !!a && (!!s && !i || !r), Lr = ({ b2bEnabled: e, customerTypeLoading: t }) => !!e && t, xr = ({ isB2BCandidate: e, enforceB2BPermissions: t, permissionsLoading: a }) => e && t && !!a, Sr = (e) => e, Pr = ({ enforceB2BPermissions: e, hasB2BContainerAccess: t }) => e && !t, kr = async (e, t) => {
  if (t.length === 1) {
    const s = t[0], l = Object.values(s.region).every((o) => !!o) ? {} : { region: { ...s.region, regionId: 0 } };
    return !!await la({ addressId: Number(s == null ? void 0 : s.id), defaultShipping: !1, defaultBilling: !1, ...l });
  }
  const a = t.filter((s) => s.id !== e && (s.defaultBilling || s.defaultShipping) || s.id !== e), r = t[t.length - 1], i = a[0] || ((r == null ? void 0 : r.id) !== e ? r : null);
  return !i || !i.id ? !1 : !!await la({ addressId: +i.id, defaultShipping: !0, defaultBilling: !0 });
}, Nr = ["firstname", "lastname", "city", "company", "country_code", "region", "region_code", "region_id", "telephone", "id", "vat_id", "postcode", "street", "street_multiline_2", "default_shipping", "default_billing", "fax", "prefix", "suffix", "middlename"], Ir = ["email", "firstname", "lastname", "middlename", "gender", "dob", "prefix", "suffix", "fax"], Qa = (e, t, a) => {
  if (t && a || !t && !a) return e;
  const r = e.slice();
  return t ? r.sort((i, s) => Number(s.defaultShipping) - Number(i.defaultShipping)) : r.sort((i, s) => Number(s.defaultBilling) - Number(i.defaultBilling));
};
var De = ((e) => (e.SHIPPING = "SHIPPING", e.BILLING = "BILLING", e))(De || {});
const Er = (e) => {
  if ((e == null ? void 0 : e.addressType) === De.SHIPPING || (e == null ? void 0 : e.addressType) === De.BILLING) return e.addressType;
  const t = !!(e != null && e.defaultShipping), a = !!(e != null && e.defaultBilling);
  if (t !== a) return t ? De.SHIPPING : De.BILLING;
}, Vr = ({ addresses: e, isCheckoutContext: t, selectable: a, selectShipping: r, selectBilling: i }) => {
  if (!t || !a) return e;
  const s = !!(r && !i);
  if (!s && !(i && !r)) return e;
  const l = s ? De.SHIPPING : De.BILLING;
  return e.filter((o) => Er(o) === l);
}, Dr = (e = !0) => {
  const [t, a] = A(e), [r, i] = A(!1);
  return W(() => {
    if (!e) {
      i(!1), a(!1);
      return;
    }
    let s = !0;
    return a(!0), Ct().then((l) => {
      s && i(l);
    }).catch((l) => {
      console.error("[Account][useCustomerType] Failed to resolve company context", l), s && i(!1);
    }).finally(() => {
      s && a(!1);
    }), () => {
      s = !1;
    };
  }, [e]), { isB2BCustomer: r, loading: t };
}, Tr = (e = !0) => {
  const [t, a] = A(e), [r, i] = A(ta());
  return W(() => {
    if (!e) {
      i(ta()), a(!1);
      return;
    }
    let s = !0;
    return a(!0), Bt().then((l) => {
      s && i(l);
    }).catch((l) => {
      console.error("[Account][useCompanyAddressPermissions] Failed to resolve role permissions", l), s && i(ta());
    }).finally(() => {
      s && a(!1);
    }), () => {
      s = !1;
    };
  }, [e]), { ...r, loading: t };
}, ma = (e) => e == null ? !0 : typeof e != "object" ? !1 : Object.keys(e).length === 0 || Object.values(e).every(ma), Mr = (e) => {
  const t = e == null ? void 0 : e.region;
  if (!t || typeof t != "object") return e;
  const a = { ...t }, r = a.regionId;
  if (r === "" || r === null || r === void 0) delete a.regionId;
  else if (typeof r == "string") {
    const i = r.trim();
    !i || !/^\d+$/.test(i) ? delete a.regionId : a.regionId = Number(i);
  } else typeof r == "number" && !Number.isFinite(r) && delete a.regionId;
  return { ...e, region: a };
}, Ta = ({ item: e, isCheckoutContext: t, selectable: a, isB2BFlow: r }) => {
  const i = Ye(e);
  if (t && a && r) {
    const s = { ...i };
    s.id && (s.companyAddressId = s.id), delete s.id;
    const l = Mr(s);
    return { selectedItem: e, data: l };
  }
  return { selectedItem: e, data: i };
}, Fr = ({ b2bEnabled: e, selectShipping: t, selectBilling: a, selectable: r, contextMode: i, defaultSelectAddressId: s, onAddressData: l, minifiedView: o, routeAddressesPage: u, onSuccess: m }) => {
  const { isB2BCustomer: c, loading: p } = Dr(!!e), y = Tr(!!e), _ = yr(e, c), f = vr(i, r), w = wr(f), h = br(f), [v, C] = A(""), [B, b] = A(!1), [D, d] = A(!1), [L, x] = A(!1), [M, F] = A(!1), [N, $] = A(!1), [k, P] = A(""), [g, I] = A([]), [O, Z] = A([]), [J, oe] = A(!1), [te, E] = A(!0), z = _r(y), q = Ar({ isB2BCandidate: _, isCompanyAddressBookEnabled: J, enforceB2BPermissions: w, permissions: y, hasB2BContainerAccess: z }), Q = Cr({ isB2BCandidate: _, isCompanyAddressBookEnabled: J, isB2BWithoutViewAccess: q }), de = Br({ isCheckoutContext: h, isB2BFlow: Q, selectable: r, isCustomShippingAddressAllowed: te, selectShipping: t, selectBilling: a }), we = T((ne) => {
    if (!ne) return;
    const V = ne.map(({ name: H, orderNumber: j, label: re }) => ({ name: wt(H), orderNumber: j, label: Nr.includes(H) ? null : re }));
    Z(V);
  }, []), fe = T(async () => {
    var ne;
    const V = Lr({ b2bEnabled: e, customerTypeLoading: p }), H = xr({ isB2BCandidate: _, enforceB2BPermissions: w, permissionsLoading: y == null ? void 0 : y.loading });
    if (V || H) {
      x(!0);
      return;
    }
    x(!0);
    try {
      if (Sr(_)) try {
        const ie = await bt(), G = !!(ie != null && ie.addressBookEnabled), K = !!(ie != null && ie.addressBookCustomShippingAddressEnabled);
        if (oe(G), E(K), G) {
          if (Pr({ enforceB2BPermissions: w, hasB2BContainerAccess: z })) {
            I([]);
            return;
          }
          const ee = await Je("shortRequest");
          we(ee);
          const ce = ((ne = ie == null ? void 0 : ie.addresses) == null ? void 0 : ne.items) ?? [], ae = Vr({ addresses: ce, isCheckoutContext: h, selectable: r, selectShipping: t, selectBilling: a });
          if (o) {
            const X = ae.filter((he) => !!he.defaultShipping || !!he.defaultBilling), ge = X.length ? X : ae.slice(-1);
            I(ge);
          } else I(ae);
          return;
        }
      } catch {
        oe(!1), E(!0);
      }
      oe(!1), E(!0);
      const [j, re] = await Promise.all([Je("shortRequest"), yt()]);
      if (we(j), re) if (o) {
        const ie = re.filter((K) => !!K.defaultShipping || !!K.defaultBilling), G = ie.length ? ie : re.slice(-1);
        I(G);
      } else I(re);
    } catch {
    } finally {
      x(!1);
    }
  }, [e, p, o, _, h, r, t, a, w, z, y == null ? void 0 : y.loading, we]);
  W(() => {
    fe();
  }, [fe]), W(() => {
    var ne;
    const V = () => {
      C(""), $(!1), l == null || l({ data: {}, isDataValid: !1 });
    };
    if (!g.length) {
      de && V();
      return;
    }
    if (s === 0) {
      if (de) {
        V();
        return;
      }
      $(!0), C("0");
      return;
    }
    const H = g.find((K) => {
      var ee;
      return typeof s == "string" ? K.uid === s || ((ee = K.id) == null ? void 0 : ee.toString()) === s : +K.id === s;
    }) || Qa(g, t, a)[0], { selectedItem: j, data: re } = Ta({ item: H, isCheckoutContext: h, selectable: r, isB2BFlow: Q }), ie = { data: re, isDataValid: !ma(j) }, G = ((ne = H == null ? void 0 : H.id) == null ? void 0 : ne.toString()) || (H == null ? void 0 : H.uid) || "";
    C(G), l == null || l(ie);
  }, [g, s, l, a, t, de, h, r, Q]);
  const le = T((ne) => {
    P(ne), $(!1);
  }, []), me = T((ne, V) => {
    const H = (ne == null ? void 0 : ne.target).value;
    if (de && H === "0") return;
    const j = (ne == null ? void 0 : ne.target).nextSibling;
    C(H);
    const { data: re } = Ta({ item: V, isCheckoutContext: h, selectable: r, isB2BFlow: Q }), ie = { data: re, isDataValid: !ma(re) };
    l == null || l(ie), $(H === "0"), j && (j.focus(), window.scrollBy(0, 100));
  }, [l, de, h, r, Q]), Ve = T(() => {
    d(!0);
  }, []), be = T(() => {
    P(""), d(!1), b(!1);
  }, []), ye = T(() => {
    b(!0);
  }, []), Se = T(async () => {
    F(!0);
    try {
      if (Q) {
        if (!(y != null && y.canDeleteAddress)) return;
        await _t(k);
      } else await kr(k, g), await At(+k);
      be(), await fe();
    } catch {
    } finally {
      F(!1);
    }
  }, [g, k, be, fe, Q, y == null ? void 0 : y.canDeleteAddress]), Ee = T(() => {
    $(!1);
  }, []), Ae = T(() => {
    de || (ea(u) && o && !N ? window.location.href = u() : ($(!0), P("")));
  }, [N, u, o, de]), Ce = T(async () => {
    await fe(), await (m == null ? void 0 : m());
  }, [fe, m]);
  return { keysSortOrder: O, submitLoading: M, isModalRendered: B, isFormRendered: D, loading: L, addNewAddress: N, addressesList: g, addressId: k, handleRenderForm: Ve, handleRenderModal: ye, removeAddress: Se, onCloseBtnClick: be, setEditingAddressId: le, closeNewAddressForm: Ee, redirectToAddressesRoute: Ae, handleOnSuccess: Ce, handleSelectAddressOption: me, selectedAddressOption: v, permissions: y, isB2BFlow: Q, enforceB2BPermissions: w, isAddressSelectionLocked: de };
}, Or = va(({ minifiedViewKey: e, hideActionFormButtons: t = !1, inputName: a, b2bEnabled: r, slots: i, title: s = "", headerLevel: l, addressFormTitle: o = "", defaultSelectAddressId: u = "", showFormLoader: m = !1, onAddressData: c, forwardFormRef: p, className: y, showSaveCheckBox: _ = !1, saveCheckBoxValue: f = !1, selectShipping: w = !1, selectBilling: h = !1, selectable: v = !1, withHeader: C = !0, minifiedView: B = !1, withActionsInMinifiedView: b = !1, withActionsInFullSizeView: D = !0, inputsDefaultValueSet: d, showShippingCheckBox: L = !0, showBillingCheckBox: x = !0, shippingCheckBoxValue: M = !0, billingCheckBoxValue: F = !0, routeAddressesPage: N, onSubmit: $, onSuccess: k, onError: P, fieldIdPrefix: g, contextMode: I }) => {
  const O = Y({ containerTitle: `Account.${e}.Addresses.containerTitle`, differentAddressButton: `Account.${e}.Addresses.differentAddressButton`, differentAddressFormTitle: `Account.${e}.Addresses.differentAddressFormTitle`, editAddressFormTitle: `Account.${e}.Addresses.editAddressFormTitle`, viewAllAddressesButton: `Account.${e}.Addresses.viewAllAddressesButton`, newAddressFormTitle: `Account.${e}.Addresses.newAddressFormTitle`, loading: "Account.Addresses.loading", loaded: "Account.Addresses.loaded" }), { keysSortOrder: Z, submitLoading: J, isModalRendered: oe, isFormRendered: te, loading: E, addNewAddress: z, addressesList: q, addressId: Q, handleRenderForm: de, handleRenderModal: we, removeAddress: fe, onCloseBtnClick: le, handleOnSuccess: me, setEditingAddressId: Ve, closeNewAddressForm: be, redirectToAddressesRoute: ye, handleSelectAddressOption: Se, selectedAddressOption: Ee, isAddressSelectionLocked: Ae, permissions: Ce, isB2BFlow: ne, enforceB2BPermissions: V } = Fr({ b2bEnabled: r, defaultSelectAddressId: u, minifiedView: B, routeAddressesPage: N, onSuccess: k, onAddressData: c, selectShipping: w, selectBilling: h, selectable: v, contextMode: I }), H = V !== !1, j = !!ne && H, re = s || O.containerTitle, ie = q.some((ee) => !!ee.defaultShipping), G = q.some((ee) => !!ee.defaultBilling);
  let K = null;
  if (v) {
    const ee = Qa(q, w, h) || [];
    let ce;
    z && !Ae ? ce = n("div", { className: U(["account-addresses-form__footer__wrapper", ["account-addresses-form__footer__wrapper-show", z]]), children: n(Re, { slots: i, hideActionFormButtons: t, fieldIdPrefix: g, formName: a, showFormLoader: m, isOpen: z, forwardFormRef: p, showSaveCheckBox: _, saveCheckBoxValue: f, shippingCheckBoxValue: M, billingCheckBoxValue: F, addressesFormTitle: o || O.differentAddressFormTitle, inputsDefaultValueSet: d, showShippingCheckBox: L, showBillingCheckBox: x, hasDefaultShippingAddress: ie, hasDefaultBillingAddress: G, onCloseBtnClick: be, onChange: c, onError: P, onSubmit: $, onSuccess: me, isB2BFlow: ne, enforceB2BPermissions: H, permissions: Ce }) }) : ee.length && !Ae ? ce = n(Ea, { selectable: v, minifiedView: B, addNewAddress: z, routeAddressesPage: ye, isB2BFlow: j, permissions: Ce, loading: E }) : ce = null;
    const ae = `generalLabel_${re.replace(/\s+/g, "")}`;
    K = S("div", { className: "account-addresses-wrapper--select-view", role: "radiogroup", "aria-labelledby": ae, children: [n("span", { id: ae, style: "display: none;", children: re }), ee.map((X, ge) => {
      var he;
      const Te = ((he = X.id) == null ? void 0 : he.toString()) || X.uid, Fe = `${a}_${Te}`, je = `${Fe}_label`;
      return S(Sa, { children: [n("input", { "data-testid": `radio-${ge + 1}`, type: "radio", name: a, id: Fe, value: Te, checked: Ee === Te, onChange: (aa) => Se(aa, X), "aria-labelledby": `${ae} ${je}` }), n("label", { id: je, htmlFor: Fe, className: "account-addresses-wrapper__label", children: n(ua, { slots: i, selectable: v, selectShipping: w, selectBilling: h, minifiedView: B, addressData: X, keysSortOrder: Z, loading: E }) })] }, Te);
    }), ce && S("div", { className: "account-addresses-wrapper__footer-section", children: [n("input", { "aria-label": O.differentAddressButton, "data-testid": "radio-0", type: "radio", name: a, id: `${a}_addressActions`, value: "0", checked: Ee === "0", onChange: (X) => Se(X, {}), tabindex: ce ? 0 : -1 }), n("label", { htmlFor: `${a}_addressActions`, className: "account-addresses-wrapper__label", children: ce })] })] });
  } else K = S(ue, { children: [q.map((ee) => n(Sa, { children: Q === ee.id && te ? n(_e, { variant: "secondary", style: { marginBottom: 20 }, children: n(Re, { slots: i, fieldIdPrefix: g, isOpen: Q === ee.id && te, addressFormId: Q, inputsDefaultValueSet: ee, addressesFormTitle: O.editAddressFormTitle, showShippingCheckBox: L, showBillingCheckBox: x, hasDefaultShippingAddress: ie, hasDefaultBillingAddress: G, shippingCheckBoxValue: M, billingCheckBoxValue: F, forwardFormRef: p, onCloseBtnClick: le, onChange: c, onError: P, onSubmit: $, onSuccess: me, isB2BFlow: ne, enforceB2BPermissions: H, permissions: Ce }) }) : n(ua, { slots: i, minifiedView: B, addressData: ee, keysSortOrder: Z, loading: E, setAddressId: Ve, handleRenderModal: B && b || !B && D ? we : void 0, handleRenderForm: B && b || !B && D ? de : void 0, isB2BFlow: j, permissions: Ce }, ee.id) }, ee.id)), n("div", { className: "account-addresses__footer", children: z ? n(_e, { variant: "secondary", children: n(Re, { slots: i, fieldIdPrefix: g, isOpen: z, addressesFormTitle: O.newAddressFormTitle, inputsDefaultValueSet: d, showShippingCheckBox: !!(q != null && q.length), showBillingCheckBox: !!(q != null && q.length), hasDefaultShippingAddress: ie, hasDefaultBillingAddress: G, shippingCheckBoxValue: M, billingCheckBoxValue: F, forwardFormRef: p, onChange: c, onCloseBtnClick: be, onError: P, onSubmit: $, onSuccess: me, isB2BFlow: ne, enforceB2BPermissions: H, permissions: Ce }) }) : n(Ea, { minifiedView: B, addNewAddress: z, routeAddressesPage: ye, isB2BFlow: j, permissions: Ce, loading: E }) })] });
  return S("div", { children: [C ? n(Ne, { title: re, divider: !B, className: U(["account-addresses-header-title", ["account-addresses-header", B]]), level: l ?? (B ? 2 : 1) }) : null, S("div", { className: U(["account-addresses-wrapper", y]), "data-testid": "addressesIdWrapper", children: [n(gr, { minifiedView: B, addressData: q == null ? void 0 : q.find((ee) => ee.id === Q), keysSortOrder: Z, submitLoading: J, open: oe, closeModal: le, onRemoveAddress: fe, isB2BFlow: j, permissions: Ce }), n(za, { message: E ? O.loading : O.loaded }), E ? n(Ue, { testId: "addressSkeletonLoader", withCard: !1 }) : v ? Ae ? n(Xe, { isEmpty: !(q != null && q.length), typeList: "address", minifiedView: B }) : n(Re, { slots: i, hideActionFormButtons: t, fieldIdPrefix: g, formName: a, isOpen: !(q != null && q.length), forwardFormRef: p, showSaveCheckBox: _, saveCheckBoxValue: f, shippingCheckBoxValue: M, billingCheckBoxValue: F, inputsDefaultValueSet: d, showShippingCheckBox: L, showBillingCheckBox: x, hasDefaultShippingAddress: ie, hasDefaultBillingAddress: G, onChange: c, onCloseBtnClick: be, onError: P, onSubmit: $, onSuccess: me, isB2BFlow: ne, enforceB2BPermissions: H, permissions: Ce }) : n(Xe, { isEmpty: !(q != null && q.length), typeList: "address", minifiedView: B }), K] })] });
}), qe = { entityType: "CUSTOMER_ADDRESS", isUnique: !1, options: [], multilineCount: 0, validateRules: [], defaultValue: !1, fieldType: xe.BOOLEAN, className: "", required: !1, orderNumber: 90, isHidden: !1 }, $r = { entityType: "CUSTOMER_ADDRESS", isUnique: !1, options: [], multilineCount: 0, validateRules: [], defaultValue: "", fieldType: xe.TEXT, className: "", required: !1, orderNumber: 50, isHidden: !1 }, Rr = { ...qe, label: "Set as default shipping address", name: "default_shipping", id: "default_shipping", code: "default_shipping", customUpperCode: "defaultShipping" }, Hr = { ...qe, label: "Set as default billing address", name: "default_billing", id: "default_billing", code: "default_billing", customUpperCode: "defaultBilling" }, Zr = { ...qe, label: "Shipping Address", name: "address_type_shipping", id: "address_type_shipping", code: "address_type_shipping", customUpperCode: "addressTypeShipping", orderNumber: 90 }, zr = { ...qe, label: "Billing Address", name: "address_type_billing", id: "address_type_billing", code: "address_type_billing", customUpperCode: "addressTypeBilling", orderNumber: 91 }, Ur = { ...qe, label: "Set as default address", name: "is_default", id: "is_default", code: "is_default", customUpperCode: "isDefault", orderNumber: 92 }, qr = { ...$r, label: "Nickname", name: "nickname", id: "nickname", code: "nickname", customUpperCode: "nickname" }, jr = (e, t) => t == null ? void 0 : t.map((a) => {
  const r = { ...e, firstName: e.firstname ?? e.firstName, lastName: e.lastname ?? e.lastName, middleName: e.middlename ?? e.middleName }, i = JSON.parse(JSON.stringify(a));
  if (Object.hasOwn(r, a.customUpperCode)) {
    const s = r[a.customUpperCode];
    a.customUpperCode === "region" && typeof s == "object" ? i.defaultValue = s.regionCode && s.regionId ? `${s.regionCode},${s.regionId}` : s.region ?? s.regionCode : i.defaultValue = s;
  }
  return i;
}), ga = (e) => {
  if (!e) return null;
  const t = new FormData(e);
  if (e.querySelectorAll('input[type="checkbox"]').forEach((a) => {
    t.has(a.name) || t.set(a.name, "false"), a.checked && t.set(a.name, "true");
  }), t && typeof t.entries == "function") {
    const a = t.entries();
    if (a && typeof a[Symbol.iterator] == "function") return JSON.parse(JSON.stringify(Object.fromEntries(a))) || {};
  }
  return {};
}, Gr = ({ fields: e, addressId: t, countryOptions: a, disableField: r, regionOptions: i, isRequiredRegion: s, isRequiredPostCode: l, keepDefaultCheckBoxesOnEdit: o }) => e.filter((u) => !(t && !o && (u.customUpperCode === "defaultShipping" || u.customUpperCode === "defaultBilling") && u.defaultValue)).map((u) => u.customUpperCode === "countryCode" ? { ...u, options: a, disabled: r } : u.customUpperCode === "postcode" ? { ...u, required: l } : u.customUpperCode === "region" ? { ...u, options: i, required: s, disabled: r } : u), ha = (e, t = "address") => {
  const a = t === "address" ? ["region", "city", "company", "countryCode", "countryId", "addressType", "addressTypeShipping", "addressTypeBilling", "isDefault", "defaultBilling", "defaultShipping", "fax", "firstName", "lastName", "nickname", "middleName", "postcode", "prefix", "street", "suffix", "telephone", "vatId", "addressId"] : ["email", "firstName", "lastName", "middleName", "gender", "dob", "prefix", "suffix", "fax"], r = {}, i = [];
  return Object.keys(e).forEach((s) => {
    a.includes(s) ? r[s] = e[s] : i.push({ attribute_code: Wa(s), value: e[s] });
  }), i.length > 0 && (r.custom_attributesV2 = i), r;
}, Ma = (e) => {
  const t = ["street", "streetMultiline_1", "streetMultiline_2"], a = ["on", "off", "true", "false"], r = [], i = {};
  for (const _ in e) {
    const f = e[_];
    a.includes(f) && (i[_] = Ka(f)), t.includes(_) && r.push(f);
  }
  const { street: s, streetMultiline_2: l, streetMultiline_1: o, region: u, ...m } = e, [c, p] = u ? u.split(",") : [void 0, void 0], y = p && c ? { regionId: +p, regionCode: c } : { region: c };
  return ha({ ...m, ...i, region: { ...y }, street: r });
}, Wr = (e, t) => {
  const a = {};
  for (const r in e) if (Object.prototype.hasOwnProperty.call(e, r)) {
    const i = e[r];
    if (r === "region" && i.regionId) {
      const s = t.find((l) => (l == null ? void 0 : l.id) === i.regionId);
      s ? a[r] = { ...i, text: s.text } : a[r] = i;
    } else Array.isArray(i) ? (a[r] = i[0] || "", i.slice(1).forEach((s, l) => {
      a[`${r}Multiline_${l + 2}`] = s;
    })) : a[r] = i;
  }
  return a;
}, Jr = (e, t) => !!e && t !== !1, Yr = ({ isB2BFlow: e, shouldEnforceB2BPermissions: t, permissions: a }) => !!e && !t && (a == null ? void 0 : a.loading) === !1 && (a == null ? void 0 : a.canCreateAddress) === !1, et = (e, t) => {
  const a = !!t.addressTypeShipping && !!t.addressTypeBilling;
  return !!e && (a || !!t.defaultShipping && !!t.defaultBilling);
}, Kr = (e, t) => e && !t, Fa = ({ requestPayload: e, shouldEnforceB2BPermissions: t, canSetDefaultAddress: a }) => (typeof e.isDefault == "boolean" ? e.isDefault : !!e.defaultShipping || !!e.defaultBilling) && (!t || !!a), Xr = ({ isTemporaryCheckoutAddressMode: e, shouldEnforceB2BPermissions: t, canSetDefaultAddress: a }) => !e && (!t || !!a), Oa = ({ requestPayload: e, shouldEnforceB2BPermissions: t, canSetDefaultAddress: a }) => {
  if (!Kr(t, a)) return e;
  const r = { ...e };
  return delete r.defaultShipping, delete r.defaultBilling, delete r.isDefault, r;
}, Qr = ({ shouldEnforceB2BPermissions: e, canEditAddress: t, isB2BFlow: a, requestPayload: r }) => {
  if (e && !t) return "noPermissionEditAddresses";
  if (et(a, r)) return "companyAddressSingleDefaultType";
}, en = ({ shouldEnforceB2BPermissions: e, canCreateAddress: t, isB2BFlow: a, requestPayload: r }) => {
  if (e && !t) return "noPermissionCreateAddresses";
  if (et(a, r)) return "companyAddressSingleDefaultType";
}, ia = (e) => e instanceof Error && e.message ? e.message : typeof e == "string" && e.trim() ? e : "Unknown error", an = ({ showShippingCheckBox: e, showBillingCheckBox: t, shippingCheckBoxValue: a, billingCheckBoxValue: r }) => ({ showShipping: !!e, showBilling: !!t, shippingDefaultValue: a ?? !1, billingDefaultValue: r ?? !1 }), tn = { none: { showShipping: !0, showBilling: !0, shippingDefaultValue: !1, billingDefaultValue: !1 }, shippingOnly: { showShipping: !1, showBilling: !0, shippingDefaultValue: !1, billingDefaultValue: !0 }, billingOnly: { showShipping: !0, showBilling: !1, shippingDefaultValue: !0, billingDefaultValue: !1 }, both: { showShipping: !1, showBilling: !1, shippingDefaultValue: !1, billingDefaultValue: !1 } }, rn = ({ hasDefaultShippingAddress: e, hasDefaultBillingAddress: t }) => {
  const a = !!e, r = !!t;
  let i = "none";
  return a && r ? i = "both" : a ? i = "shippingOnly" : r && (i = "billingOnly"), tn[i];
}, nn = ({ isB2BFlow: e, showShippingCheckBox: t, showBillingCheckBox: a, shippingCheckBoxValue: r, billingCheckBoxValue: i, addressId: s, hasDefaultShippingAddress: l, hasDefaultBillingAddress: o }) => {
  const u = an({ showShippingCheckBox: t, showBillingCheckBox: a, shippingCheckBoxValue: r, billingCheckBoxValue: i });
  return !e || !!s ? u : rn({ hasDefaultShippingAddress: l, hasDefaultBillingAddress: o });
}, sn = (e, t) => e && Object.keys(e).length > 0 ? e : t && Object.keys(t).length > 0 ? t : {}, $a = (e) => (e == null ? void 0 : e.name) === "nickname" || (e == null ? void 0 : e.code) === "nickname" || (e == null ? void 0 : e.customUpperCode) === "nickname", on = ({ showFormLoader: e, showSaveCheckBox: t, saveCheckBoxValue: a, addressFormId: r, billingCheckBoxValue: i, shippingCheckBoxValue: s, showShippingCheckBox: l, showBillingCheckBox: o, hasDefaultShippingAddress: u, hasDefaultBillingAddress: m, inputsDefaultValueSet: c, onCloseBtnClick: p, onSuccess: y, onError: _, formName: f, isB2BFlow: w, enforceB2BPermissions: h, permissions: v }) => {
  const C = Y({ noPermissionEditAddresses: "Account.AddressForm.notifications.noPermissionEditAddresses", noPermissionCreateAddresses: "Account.AddressForm.notifications.noPermissionCreateAddresses", companyAddressSingleDefaultType: "Account.AddressForm.notifications.companyAddressSingleDefaultType", b2bShippingTypeLabel: "Account.AddressForm.formText.b2bShippingTypeLabel", b2bBillingTypeLabel: "Account.AddressForm.formText.b2bBillingTypeLabel", b2bIsDefaultLabel: "Account.AddressForm.formText.b2bIsDefaultLabel", b2bIsDefaultShippingLabel: "Account.AddressForm.formText.b2bIsDefaultShippingLabel", b2bIsDefaultBillingLabel: "Account.AddressForm.formText.b2bIsDefaultBillingLabel" }), B = Jr(w, h), b = Yr({ isB2BFlow: w, shouldEnforceB2BPermissions: B, permissions: v }), [D, d] = A({ text: "", type: "success" }), [L, x] = A(e ?? !1), [M, F] = A(r || ""), [N, $] = A([]), [k, P] = A(null), [g, I] = A(() => {
    var V, H;
    const j = sessionStorage.getItem(`${f}_addressData`);
    try {
      return j ? { countryCode: (H = (V = JSON.parse(j)) == null ? void 0 : V.data) == null ? void 0 : H.countryCode } : c;
    } catch {
      return sessionStorage.removeItem(`${f}_addressData`), c;
    }
  }), [O, Z] = A(!1), [J, oe] = A(() => {
    var V, H;
    const j = sessionStorage.getItem(`${f}_addressData`);
    return j ? (H = (V = JSON.parse(j)) == null ? void 0 : V.data) == null ? void 0 : H.saveAddressBook : a;
  }), te = !B || !!(v != null && v.canEditAddress), E = !B || !!(v != null && v.canSetDefaultAddress), z = !!(w && M), q = z && B && !te && E, Q = z && B && te && !E, de = T((V) => {
    oe(V.target.checked);
  }, []);
  W(() => {
    typeof e > "u" || x(e);
  }, [e]), W(() => {
    Je(M ? "customer_address_edit" : "customer_register_address").then((V) => {
      $(V);
    });
  }, [M]), W(() => {
    Z(!0), Lt().then(({ availableCountries: V, countriesWithRequiredRegion: H, optionalZipCountries: j }) => {
      P({ availableCountries: V, countriesWithRequiredRegion: H, optionalZipCountries: j }), Z(!1);
    });
  }, []);
  const we = ve(() => (k == null ? void 0 : k.availableCountries) || [], [k]), fe = ve(() => !(g != null && g.countryCode) || !k ? !1 : k.countriesWithRequiredRegion.includes(g.countryCode), [g == null ? void 0 : g.countryCode, k]), le = ve(() => !(g != null && g.countryCode) || !k ? !0 : !k.optionalZipCountries.includes(g.countryCode), [g == null ? void 0 : g.countryCode, k]), me = ve(() => {
    var V;
    if (!(g != null && g.countryCode) || !k) return [];
    const H = k.availableCountries.find((j) => j.value === g.countryCode);
    return ((V = H == null ? void 0 : H.availableRegions) == null ? void 0 : V.map((j) => ({ text: j.name, value: `${j.code},${j.id}` }))) || [];
  }, [g == null ? void 0 : g.countryCode, k]), Ve = T(() => {
    d({ text: "", type: "success" }), p == null || p();
  }, [p]), be = T((V) => V.addressType === "BILLING" ? "BILLING" : V.addressType === "SHIPPING" ? "SHIPPING" : V.addressTypeBilling && !V.addressTypeShipping ? "BILLING" : V.addressTypeShipping && !V.addressTypeBilling ? "SHIPPING" : V.defaultBilling && !V.defaultShipping ? "BILLING" : V.defaultShipping && !V.defaultBilling ? "SHIPPING" : (c == null ? void 0 : c.addressType) ?? "SHIPPING", [c == null ? void 0 : c.addressType]), ye = T((V) => typeof V.isDefault == "boolean" ? V.isDefault : typeof V.defaultShipping == "boolean" || typeof V.defaultBilling == "boolean" ? !!(V.defaultShipping || V.defaultBilling) : !!(c != null && c.defaultShipping || c != null && c.defaultBilling), [c == null ? void 0 : c.defaultBilling, c == null ? void 0 : c.defaultShipping]), Se = T(async (V, H) => {
    var j, re;
    if (!H) return null;
    const ie = ga(V.target), G = { ...Ma(ie) }, K = c == null ? void 0 : c.addressType;
    if (w) {
      const X = be(G), ge = ye(G), he = z && K ? K : X;
      G.addressType = he, G.addressTypeShipping = he === "SHIPPING", G.addressTypeBilling = he === "BILLING", G.isDefault = ge, G.defaultShipping = he === "SHIPPING" ? ge : !1, G.defaultBilling = he === "BILLING" ? ge : !1;
    }
    if (w && q) {
      x(!0);
      try {
        G.isDefault && await ra(M), y == null || y(), p == null || p(), (j = V == null ? void 0 : V.target) == null || j.reset();
      } catch (X) {
        const ge = ia(X);
        d((he) => ({ ...he, text: ge, type: "error" })), _ == null || _(ge);
      } finally {
        x(!1);
      }
      return null;
    }
    const ee = Qr({ shouldEnforceB2BPermissions: B, canEditAddress: v == null ? void 0 : v.canEditAddress, isB2BFlow: w, requestPayload: G });
    if (ee) return d((X) => ({ ...X, text: C[ee], type: "warning" })), null;
    x(!0);
    const ce = Oa({ requestPayload: G, shouldEnforceB2BPermissions: B, canSetDefaultAddress: v == null ? void 0 : v.canSetDefaultAddress }), ae = w ? { ...ce, isDefault: ye(G) } : ce;
    try {
      if (w) {
        const X = Fa({ requestPayload: G, shouldEnforceB2BPermissions: B, canSetDefaultAddress: v == null ? void 0 : v.canSetDefaultAddress });
        await xt(M, ae), X && await ra(M);
      } else {
        const X = { ...ce, addressId: Number(M) };
        await la(X);
      }
      y == null || y(), p == null || p(), (re = V == null ? void 0 : V.target) == null || re.reset();
    } catch (X) {
      const ge = ia(X);
      d((he) => ({ ...he, text: ge, type: "error" })), _ == null || _(ge);
    } finally {
      x(!1);
    }
  }, [p, _, y, w, B, C, M, c, v == null ? void 0 : v.canEditAddress, v == null ? void 0 : v.canSetDefaultAddress, be, ye, z, q]), Ee = T(async (V, H) => {
    var j, re;
    if (!H) return;
    const { saveAddressBook: ie, ...G } = ga(V.target), K = { ...Ma(G) };
    if (w) {
      const ae = be(K), X = ye(K);
      K.addressType = ae, K.addressTypeShipping = ae === "SHIPPING", K.addressTypeBilling = ae === "BILLING", K.isDefault = X, K.defaultShipping = ae === "SHIPPING" ? X : !1, K.defaultBilling = ae === "BILLING" ? X : !1;
    }
    if (x(!0), b) return y == null || y(), p == null || p(), (j = V == null ? void 0 : V.target) == null || j.reset(), F(""), x(!1), null;
    const ee = en({ shouldEnforceB2BPermissions: B, canCreateAddress: v == null ? void 0 : v.canCreateAddress, isB2BFlow: w, requestPayload: K });
    if (ee) return d((ae) => ({ ...ae, text: C[ee], type: "warning" })), x(!1), null;
    const ce = Oa({ requestPayload: K, shouldEnforceB2BPermissions: B, canSetDefaultAddress: v == null ? void 0 : v.canSetDefaultAddress });
    try {
      if (w) {
        const ae = await St(ce);
        Fa({ requestPayload: ce, shouldEnforceB2BPermissions: B, canSetDefaultAddress: v == null ? void 0 : v.canSetDefaultAddress }) && await ra(String((ae == null ? void 0 : ae.id) ?? ""));
      } else await Pt(ce);
      y == null || y(), p == null || p(), (re = V == null ? void 0 : V.target) == null || re.reset();
    } catch (ae) {
      const X = ia(ae);
      d((ge) => ({ ...ge, text: X, type: "error" })), _ == null || _(X);
    } finally {
      F(""), x(!1);
    }
  }, [p, _, y, w, B, b, C, v == null ? void 0 : v.canCreateAddress, v == null ? void 0 : v.canSetDefaultAddress, be, ye]), Ae = ve(() => nn({ isB2BFlow: w, showShippingCheckBox: l, showBillingCheckBox: o, shippingCheckBoxValue: s, billingCheckBoxValue: i, addressId: M, hasDefaultShippingAddress: u, hasDefaultBillingAddress: m }), [w, l, o, s, i, M, u, m]), Ce = ve(() => {
    if (!N.length) return [];
    const V = N.some((Be) => $a(Be) && Be.fieldType === xe.TEXT && !Be.isHidden), H = w && !V ? [...N.filter((Be) => !$a(Be)), qr] : N, j = Xr({ isTemporaryCheckoutAddressMode: b, shouldEnforceB2BPermissions: B, canSetDefaultAddress: v == null ? void 0 : v.canSetDefaultAddress }), re = g == null ? void 0 : g.addressTypeBilling, ie = g == null ? void 0 : g.addressTypeShipping, G = typeof re == "boolean" || typeof ie == "boolean" ? re ? "BILLING" : "SHIPPING" : (c == null ? void 0 : c.addressType) ?? "SHIPPING", K = !!(c != null && c.defaultShipping || c != null && c.defaultBilling), ee = !!(w && M), ce = !j || Q || q && K, ae = !!(!B || b || t && !J), X = { ...Rr, defaultValue: Ae.shippingDefaultValue, isHidden: !!(t && !J || !Ae.showShipping || !j) }, ge = { ...Hr, defaultValue: Ae.billingDefaultValue, isHidden: !!(t && !J || !Ae.showBilling || !j) }, he = { ...Zr, label: C.b2bShippingTypeLabel, forceLabel: !0, defaultValue: G === "SHIPPING", isHidden: ae, disabled: ee }, Te = { ...zr, label: C.b2bBillingTypeLabel, forceLabel: !0, defaultValue: G === "BILLING", isHidden: ae, disabled: ee }, Fe = G === "BILLING" ? C.b2bIsDefaultBillingLabel : C.b2bIsDefaultShippingLabel, je = { ...Ur, label: Fe, forceLabel: !0, defaultValue: K, isHidden: ae, disabled: ce }, aa = w ? [...H, he, Te, je] : [...H, X, ge], Aa = sessionStorage.getItem(`${f}_addressData`), st = Aa ? Wr(JSON.parse(Aa).data, me) : {}, Ca = sn(st, c), ot = w ? { ...Ca, addressTypeShipping: G === "SHIPPING", addressTypeBilling: G === "BILLING", isDefault: K } : Ca, dt = jr(ot, aa), Ba = Gr({ fields: dt, addressId: M, countryOptions: we, disableField: O, regionOptions: me, isRequiredRegion: fe, isRequiredPostCode: le, keepDefaultCheckBoxesOnEdit: !!(w && M) });
    return q ? Ba.map((Be) => Be.customUpperCode === "addressTypeShipping" || Be.customUpperCode === "addressTypeBilling" || Be.customUpperCode === "isDefault" ? { ...Be, disabled: Be.customUpperCode === "isDefault" ? ce : !0 } : { ...Be, disabled: !0 }) : Ba;
  }, [N, w, t, J, Ae, b, B, v == null ? void 0 : v.canSetDefaultAddress, f, me, c, M, we, O, fe, le, q, Q, g == null ? void 0 : g.addressTypeShipping, g == null ? void 0 : g.addressTypeBilling, C.b2bShippingTypeLabel, C.b2bBillingTypeLabel, C.b2bIsDefaultShippingLabel, C.b2bIsDefaultBillingLabel]), ne = T((V) => {
    I((H) => ({ ...H, ...V }));
  }, []);
  return { regionOptions: me, saveCheckBoxAddress: J, inLineAlert: D, addressId: M, submitLoading: L, normalizeFieldsConfig: Ce, handleSaveCheckBoxAddress: de, handleUpdateAddress: Se, handleCreateAddress: Ee, handleOnCloseForm: Ve, handleInputChange: ne };
}, dn = (e) => {
  var t;
  if (!e || !Array.isArray(e.customAttributes)) return e ?? {};
  const a = {};
  (t = e == null ? void 0 : e.customAttributes) == null || t.forEach((s) => {
    s.code && Object.hasOwn(s, "value") && (a[s.code] = s.value);
  });
  const { customAttributes: r, ...i } = e;
  return { ...i, ...Ga(a, "camelCase", {}) };
}, ln = ({ hideActionFormButtons: e, formName: t = "", showFormLoader: a = !1, showSaveCheckBox: r = !1, saveCheckBoxValue: i = !1, forwardFormRef: s, slots: l, addressesFormTitle: o, className: u, addressFormId: m, inputsDefaultValueSet: c, showShippingCheckBox: p = !0, showBillingCheckBox: y = !0, hasDefaultShippingAddress: _ = !1, hasDefaultBillingAddress: f = !1, shippingCheckBoxValue: w = !0, billingCheckBoxValue: h = !0, isOpen: v, fieldIdPrefix: C, onSubmit: B, onCloseBtnClick: b, onSuccess: D, onError: d, onChange: L, isB2BFlow: x, enforceB2BPermissions: M, permissions: F }) => {
  const N = Y({ secondaryButton: "Account.AddressForm.formText.secondaryButton", primaryButton: "Account.AddressForm.formText.primaryButton", saveAddressBook: "Account.AddressForm.formText.saveAddressBook", noPermissionEditAddresses: "Account.AddressForm.notifications.noPermissionEditAddresses", noPermissionCreateAddresses: "Account.AddressForm.notifications.noPermissionCreateAddresses" }), $ = !!x && M !== !1, k = !!r && !(x && !$), { inLineAlert: P, addressId: g, submitLoading: I, normalizeFieldsConfig: O, handleUpdateAddress: Z, handleCreateAddress: J, handleOnCloseForm: oe, handleSaveCheckBoxAddress: te, saveCheckBoxAddress: E, handleInputChange: z, regionOptions: q } = on({ showFormLoader: a, addressFormId: m, inputsDefaultValueSet: dn(c), shippingCheckBoxValue: w, billingCheckBoxValue: h, showShippingCheckBox: p, showBillingCheckBox: y, hasDefaultShippingAddress: _, hasDefaultBillingAddress: f, saveCheckBoxValue: i, showSaveCheckBox: k, onSuccess: D, onError: d, onCloseBtnClick: b, formName: t, isB2BFlow: x, enforceB2BPermissions: M, permissions: F }), Q = !!m, de = !$ || !!(F != null && F.canEditAddress), we = !$ || !!(F != null && F.canSetDefaultAddress), fe = !$ || !!(F != null && F.canCreateAddress), le = Q ? !de && !we : !fe, me = Q ? N.noPermissionEditAddresses : N.noPermissionCreateAddresses, [Ve, be] = A(0), ye = ke(null);
  return W(() => {
    const Se = JSON.stringify(c ?? null);
    if (ye.current === Se) return;
    const Ee = ye.current === null;
    ye.current = Se, !Ee && be((Ae) => Ae + 1);
  }, [c]), v ? le ? S("div", { className: U(["account-address-form-wrapper", u]), children: [o ? n("div", { className: "account-address-form-wrapper__title", "data-testid": "addressesFormTitle", children: o }) : null, n(Ie, { "data-testid": "noPermissionAlert", className: "account-address-form-wrapper__notification", type: "warning", variant: "secondary", heading: me })] }) : S("div", { className: U(["account-address-form-wrapper", u]), children: [o ? n("div", { className: "account-address-form-wrapper__title", "data-testid": "addressesFormTitle", children: o }) : null, P.text ? n(Ie, { "data-testid": "inLineAlert", className: "account-address-form-wrapper__notification", type: P.type, variant: "secondary", heading: P.text, icon: P.icon }) : null, S(Xa, { regionOptions: q, forwardFormRef: s, slots: l, className: "account-address-form", name: t || "addressesForm", fieldsConfig: O, onSubmit: B || (g ? Z : J), setInputChange: z, loading: I, showFormLoader: a, showSaveCheckBox: k, handleSaveCheckBoxAddress: te, saveCheckBoxAddress: E, onChange: L, fieldIdPrefix: C, children: [g ? n("input", { type: "hidden", name: "addressId", value: g, "data-testid": "hidden_test_id" }) : null, e ? null : n("div", { className: U(["dropin-field account-address-form-wrapper__buttons", ["account-address-form-wrapper__buttons--empty", k]]), children: l != null && l.AddressFormActions ? n(Le, { "data-testid": "addressFormActions", name: "AddressFormActions", slot: l.AddressFormActions, context: { handleUpdateAddress: Z, handleCreateAddress: J, addressId: g } }) : n(ue, { children: k ? null : S(ue, { children: [n(pe, { type: "button", onClick: oe, variant: "secondary", disabled: I || le, children: N.secondaryButton }), n(pe, { disabled: I || le, children: N.primaryButton })] }) }) })] }, Ve)] }) : null;
}, cn = () => {
  const e = sessionStorage.getItem("accountStoreConfig");
  if (!e) return null;
  try {
    return JSON.parse(e);
  } catch (t) {
    return console.error("Failed to parse cached store config:", t), sessionStorage.removeItem("accountStoreConfig"), null;
  }
}, _a = () => {
  const [e, t] = A(!0), [a, r] = A(null), [i, s] = A(null), l = (o) => {
    const { minLength: u, requiredCharacterClasses: m, shoppingAssistanceEnabled: c, shoppingAssistanceCheckboxTitle: p, shoppingAssistanceCheckboxTooltip: y } = o;
    r({ minLength: u, requiredCharacterClasses: m }), s({ shoppingAssistanceEnabled: c, shoppingAssistanceCheckboxTitle: p, shoppingAssistanceCheckboxTooltip: y });
  };
  return W(() => {
    const o = cn();
    if (o) {
      l(o), t(!1);
      return;
    }
    Ja().then((u) => {
      u && (sessionStorage.setItem("accountStoreConfig", JSON.stringify(u)), l(u));
    }).catch((u) => {
      console.error("Failed to load store config:", u);
    }).finally(() => {
      t(!1);
    });
  }, []), { loading: e, passwordConfigs: a, remoteShoppingAssistanceConfigs: i };
}, un = ({ currentPassword: e, newPassword: t, confirmPassword: a, translations: r }) => {
  let i = { ...fa };
  const s = !e.length && !t.length && !a.length, l = e.length && t !== a;
  return s ? (i = { ...i, currentPassword: r.requiredFieldError, newPassword: r.requiredFieldError, confirmPassword: r.requiredFieldError }, { isValid: !1, errors: i }) : e.length ? t.length ? a.length ? l ? (i = { ...i, currentPassword: "", newPassword: "", confirmPassword: r.passwordMismatch }, { isValid: !1, errors: i }) : { isValid: !0, errors: i } : (i = { ...i, confirmPassword: r.requiredFieldError }, { isValid: !1, errors: i }) : (i = { ...i, newPassword: r.requiredFieldError }, { isValid: !1, errors: i }) : (i = { ...i, currentPassword: r.requiredFieldError }, { isValid: !1, errors: i });
}, at = (e, t) => {
  if (t <= 1) return !0;
  const a = /[0-9]/.test(e) ? 1 : 0, r = /[a-z]/.test(e) ? 1 : 0, i = /[A-Z]/.test(e) ? 1 : 0, s = /[^a-zA-Z0-9\s]/.test(e) ? 1 : 0;
  return a + r + i + s >= t;
}, fa = { currentPassword: "", newPassword: "", confirmPassword: "" }, pn = ({ passwordConfigs: e, handleSetInLineAlert: t, handleHideChangePassword: a }) => {
  const r = Y({ requiredFieldError: "Account.FormText.requiredFieldError", passwordMismatch: "Account.minifiedView.CustomerInformation.changePassword.passwordValidationMessage.passwordMismatch", incorrectCurrentPassword: "Account.minifiedView.CustomerInformation.changePassword.passwordValidationMessage.incorrectCurrentPassword", passwordUpdateMessage: "Account.minifiedView.CustomerInformation.changePassword.passwordValidationMessage.passwordUpdateMessage" }), [i, s] = A(!1), [l, o] = A(!1), [u, m] = A(""), [c, p] = A(""), [y, _] = A(""), [f, w] = A({ currentPassword: "", newPassword: "", confirmPassword: "" }), h = T(() => {
    a(() => {
      t({}), w(fa);
    });
  }, [a, t]), v = T((L) => {
    m(L), w((x) => ({ ...x, currentPassword: L ? "" : r.requiredFieldError }));
  }, [r]), C = T((L) => {
    p(L), w((x) => ({ ...x, newPassword: L ? "" : r.requiredFieldError }));
  }, [r]), B = T((L) => {
    _(L), w((x) => ({ ...x, confirmPassword: L ? "" : r.requiredFieldError }));
  }, [r]), b = T((L) => {
    const { name: x, value: M } = L == null ? void 0 : L.target;
    w((F) => ({ ...F, [x]: M ? "" : r.requiredFieldError }));
  }, [r]), D = T(() => {
    const { isValid: L, errors: x } = un({ currentPassword: u, newPassword: c, confirmPassword: y, translations: r });
    return w(x), L;
  }, [u, c, y, r]), d = T((L) => {
    L.preventDefault(), o(!0);
    const x = (e == null ? void 0 : e.requiredCharacterClasses) ?? 0, M = (e == null ? void 0 : e.minLength) ?? 1;
    if (!D()) {
      s(!0), o(!1);
      return;
    }
    if (!at(c, x) || M > (c == null ? void 0 : c.length)) {
      s(!0), o(!1);
      return;
    }
    kt({ currentPassword: u, newPassword: c }).then((F) => {
      if (!(F != null && F.length)) {
        o(!1);
        return;
      }
      m(""), p(""), _(""), w(fa), s(!1), t({ type: "success", text: r.passwordUpdateMessage });
    }).catch((F) => {
      F.message === "Invalid login or password." && t({ type: "error", text: r.incorrectCurrentPassword }), F.message === "The account is locked." && t({ type: "error", text: F.message });
    }), o(!1);
  }, [e, D, c, u, t, r]);
  return { hideChangePassword: h, handleOnBlurPassword: b, handleConfirmPasswordChange: B, handleNewPasswordChange: C, handleCurrentPasswordChange: v, mutationChangePassword: d, currentPassword: u, newPassword: c, confirmPassword: y, passwordErrors: f, submitLoading: l, isClickSubmit: i };
}, mn = ({ passwordConfigs: e, isClickSubmit: t, password: a }) => {
  const r = Y({ messageLengthPassword: "Account.minifiedView.CustomerInformation.changePassword.passwordValidationMessage.messageLengthPassword" }), [i, s] = A("pending");
  W(() => {
    if (!e) return;
    const o = at(a, e.requiredCharacterClasses);
    t && a.length > 0 ? s(o ? "success" : "error") : t && a.length === 0 ? s("pending") : s(o ? "success" : "pending");
  }, [t, e, a]);
  const l = ve(() => {
    var o;
    if (!e) return;
    const u = { status: "pending", icon: "pending", message: (o = r.messageLengthPassword) == null ? void 0 : o.replace("{minLength}", `${e.minLength}`) };
    return a.length && a.length >= e.minLength ? { ...u, icon: "success", status: "success" } : a.length && a.length < e.minLength ? t ? { ...u, icon: "error", status: "error" } : { ...u, icon: "pending", status: "pending" } : u;
  }, [e, r.messageLengthPassword, a == null ? void 0 : a.length, t]);
  return { isValidUniqueSymbols: i, defaultLengthMessage: l };
}, gn = (e, t, a, r, i) => e === "error" || (t == null ? void 0 : t.status) === "error" || a && r.trim().length === 0 ? i.newPassword : void 0, hn = ({ handleHideChangePassword: e, handleSetInLineAlert: t, inLineAlertProps: a }) => {
  const { passwordConfigs: r } = _a(), { hideChangePassword: i, handleOnBlurPassword: s, handleConfirmPasswordChange: l, handleNewPasswordChange: o, handleCurrentPasswordChange: u, mutationChangePassword: m, currentPassword: c, newPassword: p, confirmPassword: y, passwordErrors: _, submitLoading: f, isClickSubmit: w } = pn({ passwordConfigs: r, handleSetInLineAlert: t, handleHideChangePassword: e }), { isValidUniqueSymbols: h, defaultLengthMessage: v } = mn({ password: p, isClickSubmit: w, passwordConfigs: r }), C = Y({ containerTitle: "Account.minifiedView.CustomerInformation.changePassword.containerTitle", currentPasswordPlaceholder: "Account.minifiedView.CustomerInformation.changePassword.currentPassword.placeholder", currentPasswordFloatingLabel: "Account.minifiedView.CustomerInformation.changePassword.currentPassword.floatingLabel", newPasswordPlaceholder: "Account.minifiedView.CustomerInformation.changePassword.newPassword.placeholder", newPasswordFloatingLabel: "Account.minifiedView.CustomerInformation.changePassword.newPassword.floatingLabel", confirmPasswordPlaceholder: "Account.minifiedView.CustomerInformation.changePassword.confirmPassword.placeholder", confirmPasswordFloatingLabel: "Account.minifiedView.CustomerInformation.changePassword.confirmPassword.floatingLabel", buttonSecondary: "Account.minifiedView.CustomerInformation.changePassword.buttonSecondary", buttonPrimary: "Account.minifiedView.CustomerInformation.changePassword.buttonPrimary" });
  return S(_e, { className: "account-change-password", variant: "secondary", children: [n(Ne, { title: C.containerTitle, divider: !1, className: "account-change-password__title", level: 3 }), a.text ? n(Ie, { className: "account-change-password__notification", type: a.type, variant: "secondary", heading: a.text, icon: a.icon, "data-testid": "changePasswordInLineAlert" }) : null, S("div", { className: "account-change-password__fields", children: [n(Ge, { className: "account-change-password__fields-item", autoComplete: "current-password", name: "currentPassword", placeholder: C.currentPasswordPlaceholder, floatingLabel: C.currentPasswordFloatingLabel, errorMessage: _.currentPassword, defaultValue: c, onValue: u, onBlur: s }), n(Ge, { className: "account-change-password__fields-item", autoComplete: "new-password", name: "newPassword", placeholder: C.newPasswordPlaceholder, floatingLabel: C.newPasswordFloatingLabel, minLength: r == null ? void 0 : r.minLength, validateLengthConfig: v, uniqueSymbolsStatus: h, requiredCharacterClasses: r == null ? void 0 : r.requiredCharacterClasses, errorMessage: gn(h, v, w, p, _), defaultValue: p, onValue: o, onBlur: s }), n(Ge, { className: "account-change-password__fields-item", autoComplete: "new-password", name: "confirmPassword", placeholder: C.confirmPasswordPlaceholder, floatingLabel: C.confirmPasswordFloatingLabel, errorMessage: _.confirmPassword, defaultValue: y, onValue: l, onBlur: s })] }), S("div", { className: "account-change-password__actions", children: [n(pe, { type: "button", disabled: f, onClick: i, variant: "secondary", children: C.buttonSecondary }), n(pe, { variant: "primary", type: "button", disabled: f, onClick: m, children: C.buttonPrimary })] })] });
}, fn = ({ inLineAlertProps: e, errorPasswordEmpty: t, passwordValue: a, showPasswordOnEmailChange: r, submitLoading: i, formFieldsList: s, handleHideEditForm: l, handleUpdateCustomerInformation: o, handleInputChange: u, handleSetPassword: m, handleOnBlurPassword: c }) => {
  const p = Y({ buttonSecondary: "Account.minifiedView.CustomerInformation.editCustomerInformation.buttonSecondary", buttonPrimary: "Account.minifiedView.CustomerInformation.editCustomerInformation.buttonPrimary", placeholder: "Account.minifiedView.CustomerInformation.editCustomerInformation.passwordField.placeholder", floatingLabel: "Account.minifiedView.CustomerInformation.editCustomerInformation.passwordField.floatingLabel", containerTitle: "Account.minifiedView.CustomerInformation.editCustomerInformation.containerTitle", requiredFieldError: "Account.FormText.requiredFieldError" });
  return S(_e, { variant: "secondary", className: "account-edit-customer-information", children: [n(Ne, { title: p.containerTitle, divider: !1, className: "account-edit-customer-information__title", level: 3 }), e.text ? n(Ie, { className: "account-edit-customer-information__notification", type: e.type, variant: "secondary", heading: e.text, icon: e.icon, "data-testid": "editCustomerInLineAlert" }) : null, S(Xa, { loading: i, fieldsConfig: s || [], name: "editCustomerInformation", className: "account-edit-customer-information-form", onSubmit: o, setInputChange: u, children: [r ? n("div", { className: "account-edit-customer-information__password", children: n(Ge, { autoComplete: "current-password", name: "password", placeholder: p.placeholder, floatingLabel: p.floatingLabel, errorMessage: t ? p.requiredFieldError : void 0, defaultValue: a, onValue: m, onBlur: c }) }) : null, S("div", { className: "account-edit-customer-information__actions", children: [n(pe, { disabled: i, type: "button", variant: "secondary", onClick: () => l(), children: p.buttonSecondary }), n(pe, { disabled: i, type: "submit", variant: "primary", children: p.buttonPrimary })] })] })] });
}, vn = ({ createdAt: e, slots: t, orderedCustomerData: a, showEditForm: r, showChangePassword: i, handleShowChangePassword: s, handleShowEditForm: l }) => {
  const o = Y({ buttonSecondary: "Account.minifiedView.CustomerInformation.customerInformationCard.buttonSecondary", buttonSecondaryAriaLabel: "Account.minifiedView.CustomerInformation.customerInformationCard.buttonSecondaryAriaLabel", buttonPrimary: "Account.minifiedView.CustomerInformation.customerInformationCard.buttonPrimary", buttonPrimaryAriaLabel: "Account.minifiedView.CustomerInformation.customerInformationCard.buttonPrimaryAriaLabel", accountCreation: "Account.minifiedView.CustomerInformation.customerInformationCard.accountCreation" });
  return n(_e, { variant: "secondary", className: U(["account-customer-information-card", ["account-customer-information-card-short", i || r]]), children: S("div", { className: "account-customer-information-card__wrapper", children: [S("div", { className: "account-customer-information-card__actions", children: [n(pe, { type: "button", variant: "tertiary", "aria-label": o.buttonSecondaryAriaLabel, onClick: s, children: o.buttonSecondary }), n(pe, { type: "button", variant: "tertiary", "aria-label": o.buttonPrimaryAriaLabel, onClick: l, children: o.buttonPrimary })] }), n("div", { className: "account-customer-information-card__content", children: t != null && t.CustomerData ? n(Le, { name: "CustomerData", slot: t == null ? void 0 : t.CustomerData, context: { customerData: a } }) : S(ue, { children: [a == null ? void 0 : a.map((u, m) => {
    const c = u != null && u.label ? `${u.label}: ${u == null ? void 0 : u.value}` : u == null ? void 0 : u.value;
    return n("p", { "data-testid": `${u.name}_${m}`, children: c }, `${u.name}_${m}`);
  }), S("p", { children: [o.accountCreation, ": ", e] })] }) })] }) });
};
function wn(e) {
  if (!e) return [];
  const t = `${e.firstName} ${e.lastName}`.trim(), a = e.street ?? "", r = e.city ?? "", i = e.region || void 0, s = e.postcode ?? "", l = e.countryCode ?? "";
  let o = "";
  r && i ? o = `${r}, ${(i == null ? void 0 : i.regionCode) ?? ""}`.trim() : r ? o = r : i && (o = (i == null ? void 0 : i.regionCode) ?? "");
  let u = o;
  s && (u = o ? `${o} ${s}` : s);
  let m = u;
  return l && (m = u ? `${u}, ${l}` : l), [t, a, m];
}
const Ra = ({ title: e, address: t, selected: a, busy: r, onChange: i }) => {
  const [s, l, o] = wn(t);
  return n("div", { className: "account-address-validation__option", children: n(ht, { busy: r, className: "account-address-validation__radio", label: S("div", { children: [n("div", { className: "account-address-validation__option-title", children: n("strong", { children: e }) }), s && n("div", { children: s }), l && n("div", { children: l }), o && n("div", { children: o })] }), name: "address-validation-choice", selected: a, value: e, onChange: i }) });
}, bn = ({ busy: e = !1, className: t, originalAddress: a, onSelectionChange: r, selection: i, suggestedAddress: s }) => {
  const l = !!s, o = Y({ title: "Account.AddressValidation.title", subtitle: "Account.AddressValidation.subtitle", suggestedAddress: "Account.AddressValidation.suggestedAddress", originalAddress: "Account.AddressValidation.originalAddress" });
  return S("div", { className: U(["account-address-validation", t]), children: [n(Ne, { className: "account-address-validation__title", divider: !1, title: o.title, level: 1 }), n("div", { className: "account-address-validation__subtitle", children: o.subtitle }), S("div", { className: U(["account-address-validation__options", e && "account-address-validation__options--busy"]), children: [l && n(Ra, { address: s, busy: e, selected: i === "suggested", title: o.suggestedAddress, onChange: () => r("suggested") }), n(Ra, { address: a, busy: e, selected: i === "original", title: o.originalAddress, onChange: () => r("original") })] })] });
}, yn = ({ loading: e, isRemoteShoppingAssistanceAvailable: t, isRemoteShoppingAssistanceEnabled: a, showAlert: r, checkboxLabel: i, checkboxTooltip: s, alertMessage: l, featureDisabledMessage: o, handleCheckboxChange: u, handleDismissAlert: m }) => {
  const [c, p] = A(!1);
  return e ? n(Me, { children: n(se, { variant: "row" }) }) : !e && !t ? n("div", { className: "account-seller-assisted-buying-settings-control__alert", children: n(Ze, { heading: o }) }) : S("div", { className: "account-seller-assisted-buying-settings-control", children: [!a && r && n("div", { className: "account-seller-assisted-buying-settings-control__alert", children: n(Ie, { variant: "secondary", type: "warning", heading: l, onDismiss: m }) }), S("div", { className: "account-seller-assisted-buying-settings-control__checkbox-row", children: [n(Pe, { children: n(wa, { name: "allowRemoteShoppingAssistance", value: "true", placeholder: i, label: i, checked: a, onChange: (y) => u(y.currentTarget.checked) }) }), s ? S("div", { className: "account-seller-assisted-buying-settings-control__info-container", children: [n("button", { type: "button", className: "account-seller-assisted-buying-settings-control__info-icon", onMouseEnter: () => p(!0), onMouseLeave: () => p(!1), onFocusCapture: () => p(!0), onBlurCapture: () => p(!1), "aria-label": s, children: "?" }), c ? S("span", { className: "account-seller-assisted-buying-settings-control__tooltip", role: "tooltip", children: [s, n("span", { className: "account-seller-assisted-buying-settings-control__tooltip-arrow" })] }) : null] }) : null] })] });
}, _n = ({ loading: e, adminAssistanceActions: t, tableHeaders: a, actionTypesMap: r, emptyStateMessage: i, featureDisabledMessage: s, isRemoteShoppingAssistanceAvailable: l = !0, errorMessage: o, currentPage: u, onPageChange: m, withWrapper: c = !0 }) => {
  var p;
  if (e) return S(Me, { children: [n(se, { variant: "row", fullWidth: !0 }), n(se, { variant: "row", fullWidth: !0 }), n(se, { variant: "row", fullWidth: !0 })] });
  if (!l) return n("div", { className: "account-seller-assisted-buying-activity-table__alert", children: n(Ze, { heading: s }) });
  if (o) return n("div", { className: "account-seller-assisted-buying-activity-table__error", children: n(Ze, { heading: o }) });
  if (!((p = t == null ? void 0 : t.items) != null && p.length)) return n("div", { className: "account-seller-assisted-buying-activity-table__empty", children: n(Ze, { heading: i }) });
  const y = [{ label: a.action, key: "action", ariaLabel: a.action }, { label: a.date, key: "date", ariaLabel: a.date }, { label: a.details, key: "details", ariaLabel: a.details }], _ = t.items.map((v) => ({ action: r[v.action] || v.action, date: v.date, details: v.details })), f = t.pageInfo.totalPages, w = f > 1, h = n("div", { className: "account-seller-assisted-buying-activity-table", children: n("div", { className: "account-seller-assisted-buying-activity-table__table-wrapper", children: n(gt, { columns: y, rowData: _, mobileLayout: "stacked", className: "account-seller-assisted-buying-activity-table__table" }) }) });
  return S(ue, { children: [c ? n(_e, { variant: "secondary", className: U(["account-seller-assisted-buying-activity-table-card"]), children: h }) : h, w && n("div", { className: "account-seller-assisted-buying-activity-table__pagination", children: n(ya, { currentPage: u, totalPages: f, onChange: m }) })] });
}, tt = ({ cardBrand: e, lastFourDigits: t, expired: a = !1, onRemove: r, variant: i = "secondary", minifiedView: s = !1 }) => {
  const l = Qe(), o = Y({ actionRemove: "Account.Payments.paymentCard.actionRemove", cardEndingIn: "Account.Payments.paymentCard.cardEndingIn", expiredLabel: "Account.Payments.paymentCard.expiredLabel" }), u = T(() => {
    r == null || r();
  }, [r]), m = `•••• ${t}`, c = `${o.cardEndingIn} ${m}`;
  return S(_e, { variant: i, className: U(["account-payment-card", s && "account-payment-card--minified"]), "data-testid": "paymentCard", children: [n("div", { className: "account-payment-card__action", children: r ? n(pe, { type: "button", variant: "tertiary", onClick: u, "data-testid": "removeButton", "aria-label": `${o.actionRemove} ${e} ${c}`, "aria-describedby": l, children: o.actionRemove }) : null }), S("div", { className: "account-payment-card__description", id: l, children: [n("p", { className: "account-payment-card__card-brand", "data-testid": "cardBrand", children: e }), n("p", { className: "account-payment-card__card-number", "data-testid": "cardNumber", children: c })] }), a ? n("div", { className: "account-payment-card__labels", "data-testid": "expiredTag", children: n($e, { label: (o.expiredLabel ?? "Expired").toLocaleUpperCase() }) }) : null] });
}, Ha = "account/customerPaymentTokens", rt = "__REMOVE_FAILED__", An = (e) => {
  const t = ke("api"), a = ke(void 0), [r, i] = A([]), [s, l] = A(!0), [o, u] = A(null), [m, c] = A(null), [p, y] = A(null), _ = T(async () => {
    l(!0), u(null), c(null);
    try {
      const v = await Et(e);
      t.current = "api", i(v);
    } catch (v) {
      i([]), u(v instanceof Error ? v.message : String(v));
    } finally {
      l(!1);
    }
  }, [e]);
  W(() => {
    let v = !1, C = !1;
    const B = da.on(Ha, (b) => {
      v || (C = !0, t.current = "event", i(Array.isArray(b) ? b : []), u(null), l(!1));
    }, { eager: !0 });
    return (!B || !C) && _(), () => {
      v = !0, B == null || B.off();
    };
  }, [_]);
  const f = (e == null ? void 0 : e.join(",")) ?? "";
  W(() => {
    if (t.current === "api") {
      if (a.current === void 0) {
        a.current = f;
        return;
      }
      a.current !== f && (a.current = f, _());
    }
  }, [f, _]);
  const w = T(async (v) => {
    c(null), y(v);
    try {
      await Vt(v) ? i((C) => C.filter((B) => B.publicHash !== v)) : c(rt);
    } catch (C) {
      c(C instanceof Error ? C.message : String(C));
    } finally {
      y(null);
    }
  }, []), h = T(async () => {
    if (t.current === "event") {
      const v = da.lastPayload(Ha);
      if (v === void 0) return;
      i(Array.isArray(v) ? v : []), u(null), c(null);
      return;
    }
    await _();
  }, [_]);
  return { items: r, loading: s, loadError: o, actionError: m, removingHash: p, removeToken: w, refetch: h };
}, Cn = ({ className: e, withHeader: t = !0, minifiedView: a = !1, filterPaymentMethodCodes: r }) => {
  const i = Y({ containerTitle: "Account.Payments.containerTitle", loadError: "Account.Payments.loadError", removeError: "Account.Payments.removeError" }), { items: s, loading: l, loadError: o, actionError: u, removingHash: m, removeToken: c } = An(r), [p, y] = A(null), _ = T(() => {
    y(null);
  }, []), f = T(async () => {
    p && (await c(p.publicHash), y(null));
  }, [p, c]), w = u === rt ? i.removeError : u ?? "", h = s.length > 0 ? s.map((C) => {
    const { publicHash: B, ...b } = C;
    return n(tt, { ...b, minifiedView: a, onRemove: m !== null ? void 0 : () => y(C) }, B);
  }) : null, v = s.length === 0 && !o ? n("div", { className: "account-payment-methods__empty", "data-testid": "paymentMethodsEmpty", children: n(Xe, { isEmpty: !0, typeList: "payments", minifiedView: a }) }) : null;
  return S("div", { className: U(["account-payment-methods", e]), "data-testid": "paymentMethods", children: [t ? n(Ne, { "aria-label": i.containerTitle, role: "region", title: i.containerTitle, divider: !a, className: U(["account-payment-methods-header-title", ["account-payment-methods-header", a]]), level: a ? 2 : 1 }) : null, o ? n(Ie, { className: "account-payment-methods__alert", type: "error", variant: "secondary", heading: i.loadError, description: o, icon: n(pa, {}), "data-testid": "paymentMethodsLoadError" }) : null, u && !o ? n(Ie, { className: "account-payment-methods__alert", type: "error", variant: "secondary", heading: w, icon: n(pa, {}), "data-testid": "paymentMethodsActionError" }) : null, n(Bn, { open: p !== null, submitLoading: p !== null && m === p.publicHash, onRemoveToken: () => {
    f();
  }, closeModal: _, cardBrand: p == null ? void 0 : p.cardBrand, lastFourDigits: p == null ? void 0 : p.lastFourDigits, expired: p == null ? void 0 : p.expired, variant: p == null ? void 0 : p.variant, minifiedView: a }), l ? n(Ue, { testId: "paymentMethodsLoader" }) : n("div", { className: "account-payment-methods__list", children: h ?? v })] });
}, Bn = ({ open: e, submitLoading: t, onRemoveToken: a, closeModal: r, cardBrand: i, lastFourDigits: s, expired: l, variant: o, minifiedView: u }) => {
  const m = Y({ title: "Account.Payments.removePaymentModal.title", description: "Account.Payments.removePaymentModal.description", actionCancel: "Account.Payments.removePaymentModal.actionCancel", actionConfirm: "Account.Payments.removePaymentModal.actionConfirm" });
  return e ? n(qa, { className: "account-payment-modal--overlay", title: n("h3", { children: m.title }), size: "full", "data-testid": "paymentModal", showCloseButton: !0, onClose: r, children: S("div", { className: "account-payment-modal", children: [t ? n("div", { className: "account-payment-modal__spinner", "data-testid": "progressSpinner", children: n(ja, { stroke: "4", size: "large" }) }) : null, n("p", { children: m.description }), i && s ? n(tt, { cardBrand: i, lastFourDigits: s, expired: l, variant: o, minifiedView: u }) : null, S("div", { className: "account-payment-modal__buttons", children: [n(pe, { type: "button", onClick: r, variant: "secondary", disabled: t, children: m.actionCancel }), n(pe, { disabled: t, onClick: a, children: m.actionConfirm })] })] }) }) : null;
}, Ln = ({ review: e, productUrl: t, formattedDate: a, headingLevel: r = 2 }) => {
  var i, s;
  const l = Y({ productUnavailable: "Account.ProductReviews.productUnavailable", unrated: "Account.ProductReviews.unrated", averageRating: "Account.ProductReviews.averageRating" }), o = r === 2 ? "h2" : "h3";
  return n("article", { className: "account-product-review-details", children: S(_e, { variant: "secondary", children: [S("div", { className: "account-product-review-details__product", children: [((i = e.product) == null ? void 0 : i.thumbnail) && n("img", { src: e.product.thumbnail.url, alt: e.product.thumbnail.label, width: 180, height: 180, loading: "lazy" }), e.product && t ? n("a", { href: t, children: e.product.name }) : n("p", { children: ((s = e.product) == null ? void 0 : s.name) ?? l.productUnavailable })] }), S("div", { className: "account-product-review-details__content", children: [n(o, { className: "account-product-review-details__summary", children: e.summary }), S("div", { className: "account-product-review-details__average-rating", role: "group", "aria-label": l.averageRating, children: [n("span", { children: l.averageRating }), e.rating === null ? n("span", { children: l.unrated }) : n(oa, { rating: e.rating, valueDisplay: "value" })] }), n("p", { className: "account-product-review-details__text", children: e.text }), n("time", { dateTime: e.createdAt.slice(0, 10), children: n(La, { id: "Account.ProductReviews.submittedOn", fields: { date: a } }) }), e.ratingsBreakdown.length > 0 && n("dl", { className: "account-product-review-details__criteria", children: e.ratingsBreakdown.map((u, m) => S("div", { children: [n("dt", { children: n(La, { id: "Account.ProductReviews.criterionRating", fields: { name: u.name } }) }), n("dd", { children: n(oa, { rating: u.value, valueDisplay: "value" }) })] }, m)) })] })] }) });
}, xn = { ProductReviews: { title: "My Product Reviews", detailsTitle: "Review Details", error: "Unable to load your reviews.", retry: "Try again", dateUnavailable: "Date unavailable" } }, Oe = { Account: xn }, Sn = ({ initialPageSize: e, page: t, pageSize: a, currentPage: r, selected: i, loading: s, failed: l, changePage: o, selectReview: u, clearSelection: m, retry: c, enabled: p = !0, authenticated: y = !0, withHeader: _ = !0, minifiedView: f = !1, routeReviewsList: w, routeProduct: h, slots: v, className: C, ...B }) => {
  const b = Y({ title: "Account.ProductReviews.title", minifiedTitle: "Account.ProductReviews.minifiedTitle", viewAll: "Account.ProductReviews.viewAll", detailsTitle: "Account.ProductReviews.detailsTitle", created: "Account.ProductReviews.created", product: "Account.ProductReviews.product", productUnavailable: "Account.ProductReviews.productUnavailable", rating: "Account.ProductReviews.rating", review: "Account.ProductReviews.review", seeDetails: "Account.ProductReviews.seeDetails", back: "Account.ProductReviews.back", loading: "Account.ProductReviews.loading", empty: "Account.ProductReviews.empty", error: "Account.ProductReviews.error", retry: "Account.ProductReviews.retry", disabled: "Account.ProductReviews.disabled", signIn: "Account.ProductReviews.signIn", dateUnavailable: "Account.ProductReviews.dateUnavailable", pageSize: "Account.ProductReviews.pageSize", pagination: "Account.ProductReviews.pagination", firstPage: "Account.ProductReviews.firstPage", selectionUnavailable: "Account.ProductReviews.selectionUnavailable", unrated: "Account.ProductReviews.unrated" }), D = ke(null), d = ke(/* @__PURE__ */ new Map()), L = `account-reviews-${Qe()}`, x = `${L}-details`, M = f ? b.minifiedTitle : b.title, F = b.dateUnavailable ?? Oe.Account.ProductReviews.dateUnavailable;
  W(() => {
    var g;
    i && ((g = D.current) == null || g.focus());
  }, [i]);
  const N = () => {
    const g = i == null ? void 0 : i.index;
    m(), requestAnimationFrame(() => {
      var I;
      g !== void 0 && ((I = d.current.get(g)) == null || I.focus());
    });
  }, $ = !i && window.location.hash.endsWith("-details"), k = (g) => {
    if (!g.product) return b.productUnavailable;
    const I = h == null ? void 0 : h(g.product);
    return I ? n("a", { href: I, children: g.product.name }) : g.product.name;
  }, P = (g) => {
    const I = g.rating === null ? b.unrated : n(oa, { rating: g.rating });
    return v != null && v.Rating ? n(Le, { name: "Rating", slot: v.Rating, context: { review: g }, children: I }) : I;
  };
  return n("div", { ...B, className: U(["account-product-reviews", ["account-product-reviews--minified", f], C]), "aria-busy": p && y && s, children: p ? y ? i ? S("section", { id: x, "aria-labelledby": `${x}-heading`, children: [n("div", { ref: D, id: `${x}-heading`, tabIndex: -1, children: n(Ne, { className: "account-product-reviews__header", title: b.detailsTitle ?? Oe.Account.ProductReviews.detailsTitle, level: _ ? 1 : 2 }) }), v != null && v.ReviewDetails ? n(Le, { name: "ReviewDetails", slot: v.ReviewDetails, context: { review: i.review, productUrl: i.review.product ? h == null ? void 0 : h(i.review.product) : void 0 } }) : n(Ln, { review: i.review, productUrl: i.review.product ? h == null ? void 0 : h(i.review.product) : void 0, formattedDate: i.review.createdDate ?? F, headingLevel: _ ? 2 : 3 }), n("a", { className: "account-product-reviews__back", href: `#${L}`, onClick: (g) => {
    g.preventDefault(), N();
  }, children: b.back })] }) : S("section", { id: L, children: [_ && n(Ne, { className: "account-product-reviews__header", title: M ?? Oe.Account.ProductReviews.title, level: f ? 2 : 1, divider: !f }), $ && n("p", { role: "status", children: b.selectionUnavailable }), s ? S(ue, { children: [n("p", { role: "status", children: b.loading }), n(Me, { "aria-hidden": "true", children: n(se, { variant: "row", size: "xsmall", fullWidth: !0, lines: 3 }) })] }) : l ? n(Ie, { type: "error", variant: "secondary", heading: b.error ?? Oe.Account.ProductReviews.error, additionalActions: [{ label: b.retry ?? Oe.Account.ProductReviews.retry, onClick: c }] }) : t && !t.items.length ? n("p", { role: "status", children: b.empty }) : null, f && t && t.items.length > 0 && n("ul", { className: "account-product-reviews__summary", "aria-label": M, children: t.items.map((g, I) => n("li", { children: S(_e, { variant: "secondary", children: [n("div", { className: "account-product-reviews__summary-product", children: k(g) }), n("div", { className: "account-product-reviews__rating", children: P(g) }), n("p", { className: "account-product-reviews__summary-text", children: g.summary }), n("span", { className: "account-product-reviews__summary-date", children: g.createdDate ?? F })] }) }, I)) }), !f && t && t.items.length > 0 && n("div", { className: "account-product-reviews__table", role: "region", "aria-label": M, tabIndex: 0, children: S("table", { children: [n("thead", { children: S("tr", { children: [n("th", { scope: "col", children: b.created }), n("th", { scope: "col", children: b.product }), n("th", { scope: "col", children: b.rating }), n("th", { scope: "col", children: b.review }), n("th", { scope: "col", children: n("span", { className: "account-product-reviews__sr-only", children: b.seeDetails }) })] }) }), n("tbody", { children: t.items.map((g, I) => S("tr", { children: [n("td", { className: "account-product-reviews__date", children: g.createdDate ?? F }), n("td", { children: k(g) }), n("td", { className: "account-product-reviews__rating", children: P(g) }), n("td", { children: g.summary }), n("td", { className: "account-product-reviews__action", children: n("a", { href: `#${x}`, ref: (O) => {
    O ? d.current.set(I, O) : d.current.delete(I);
  }, onClick: (O) => {
    O.preventDefault(), u(g, I);
  }, children: b.seeDetails }) })] }, I)) })] }) }), f && w && n("a", { className: "account-product-reviews__view-all", href: w(), children: S(_e, { variant: "secondary", children: [n("span", { children: b.viewAll }), n(ze, { source: Ke, size: "32", stroke: "2" })] }) }), t && !f && S("div", { className: "account-product-reviews__paging", children: [t.pageInfo.currentPage > t.pageInfo.totalPages && t.pageInfo.currentPage > 1 ? n(pe, { onClick: () => o(1), children: b.firstPage }) : null, t.pageInfo.totalPages > 1 && n("nav", { "aria-label": b.pagination, children: n(ya, { currentPage: r, totalPages: t.pageInfo.totalPages, onChange: (g) => o(g) }) }), n(Pe, { className: "account-product-reviews__page-size", label: b.pageSize, disabled: s, children: n(ba, { id: `${L}-page-size`, name: "reviewPageSize", "aria-label": b.pageSize, value: String(a), disabled: s, options: Array.from(/* @__PURE__ */ new Set([e, 10, 20, 50])).sort((g, I) => g - I).map((g) => ({ value: String(g), text: String(g) })), handleSelect: (g) => {
    if (!(g.target instanceof HTMLSelectElement)) throw new TypeError("Expected a review page-size selection.");
    o(1, Number(g.target.value));
  } }) })] })] }) : n("p", { role: "status", children: b.signIn }) : n("p", { role: "status", children: b.disabled }) });
}, Re = ({ hideActionFormButtons: e, formName: t, showFormLoader: a, showSaveCheckBox: r, saveCheckBoxValue: i, forwardFormRef: s, slots: l, addressesFormTitle: o, className: u, addressFormId: m, inputsDefaultValueSet: c, billingCheckBoxValue: p, shippingCheckBoxValue: y, showBillingCheckBox: _, showShippingCheckBox: f, hasDefaultShippingAddress: w, hasDefaultBillingAddress: h, isOpen: v, fieldIdPrefix: C, onSubmit: B, onCloseBtnClick: b, onSuccess: D, onError: d, onChange: L, isB2BFlow: x, enforceB2BPermissions: M, permissions: F }) => n("div", { className: U(["account-address-form"]), children: n(ln, { hideActionFormButtons: e, formName: t, showFormLoader: a, slots: l, addressesFormTitle: o, className: u, addressFormId: m, inputsDefaultValueSet: c, shippingCheckBoxValue: y, billingCheckBoxValue: p, showShippingCheckBox: f, showBillingCheckBox: _, hasDefaultShippingAddress: w, hasDefaultBillingAddress: h, isOpen: v, fieldIdPrefix: C, onSubmit: B, onCloseBtnClick: b, onSuccess: D, onError: d, onChange: L, forwardFormRef: s, showSaveCheckBox: r, saveCheckBoxValue: i, isB2BFlow: x, enforceB2BPermissions: M, permissions: F }) });
Re.displayName = "AddressForm";
const Pn = { success: n(lr, {}), warning: n(mr, {}), error: n(pa, {}) }, nt = () => {
  const [e, t] = A({}), a = T((r) => {
    if (!(r != null && r.type)) {
      t({});
      return;
    }
    const i = Pn[r.type];
    t({ ...r, icon: i });
  }, []);
  return { inLineAlertProps: e, handleSetInLineAlert: a };
}, kn = ({ ordersInMinifiedView: e, minifiedView: t, pageSize: a, selectedDate: r, selectedPage: i, searchText: s, handleSetFirstOrderDate: l, handleSetInLineAlert: o }) => {
  const u = Y({ searchError: "Account.fullSizeView.OrdersList.OrdersListSearch.error" }), [m, c] = A([]), [p, y] = A({ totalPages: 1, currentPage: 1, pageSize: 1 }), [_, f] = A(!1), [w, h] = A(""), [v, C] = A(0), B = T(() => {
    C((b) => b + 1);
  }, []);
  return W(() => {
    Ja().then((b) => {
      h(b.baseMediaUrl);
    });
  }, []), W(() => {
    const b = da.on("companyContext/changed", B);
    return () => {
      b == null || b.off();
    };
  }, [B]), W(() => {
    const b = new AbortController();
    return f(!0), o == null || o(), Nt(t ? e : a, r, i, s, b.signal).then((D) => {
      if (!b.signal.aborted) {
        if (!(D != null && D.items)) {
          c([]), o == null || o({ type: "error", text: u.searchError });
          return;
        }
        y(D.pageInfo), c(D.items), l == null || l(D.dateOfFirstOrder);
      }
    }).catch(() => {
      b.signal.aborted || (c([]), o == null || o({ type: "error", text: u.searchError }));
    }).finally(() => {
      b.signal.aborted || f(!1);
    }), () => {
      b.abort();
    };
  }, [l, o, t, e, a, r, i, s, v, u.searchError]), { loading: _, orderHistoryListItems: m, pageInfo: p, placeholderImage: w, refetchOrders: B };
}, sa = (e, t = 1) => {
  const a = /* @__PURE__ */ new Date(), r = new Date(a);
  switch (e) {
    case "sixMonthsAgo": {
      r.setMonth(r.getMonth() - t);
      break;
    }
    case "oneYearAgo": {
      r.setFullYear(r.getFullYear() - t);
      break;
    }
    default:
      return "";
  }
  return { from: r == null ? void 0 : r.toISOString().split("T")[0], to: `${a == null ? void 0 : a.toISOString().split("T")[0]} 23:59:59` };
}, Nn = (e) => {
  const t = [], a = (/* @__PURE__ */ new Date()).getFullYear();
  for (let r = e; r <= a - 1; r++) t.push({ value: `{"from":"${r}-01-01","to":"${r + 1}-01-01 23:59:59"}`, text: r.toString() });
  return t;
}, In = (e = "selectedDate") => {
  const t = Y({ pastSixMonths: "Account.fullSizeView.OrdersList.OrdersListSelectDate.pastSixMonths", currentYear: "Account.fullSizeView.OrdersList.OrdersListSelectDate.currentYear", viewAll: "Account.fullSizeView.OrdersList.OrdersListSelectDate.viewAll" }), [a, r] = A(), [i, s] = A(JSON.stringify(sa("sixMonthsAgo", 6))), [l, o] = A(1), [u, m] = A("");
  W(() => {
    window == null || window.scrollTo({ top: 100, behavior: "smooth" });
  }, [l]);
  const c = ve(() => {
    const f = [{ value: JSON.stringify(sa("sixMonthsAgo", 6)), text: t.pastSixMonths }, { value: JSON.stringify(sa("oneYearAgo", 1)), text: t.currentYear }, { value: "viewAll", text: t.viewAll }];
    if (a) {
      const w = new Date(a).getFullYear();
      f == null || f.splice(2, 0, ...Nn(w));
    }
    return f;
  }, [t, a]), p = T((f) => {
    r(f);
  }, []), y = T((f) => {
    const w = f.target.value;
    s(w), o(1);
  }, []), _ = T((f) => {
    m(f), f && e === "allOrders" && s("viewAll"), o(1);
  }, [e]);
  return { selectableDateList: c, selectedDate: i, selectedPage: l, searchText: u, handleSelectDate: y, handleSearch: _, setSelectedPage: o, handleSetFirstOrderDate: p };
}, En = ({ actionLabel: e, actionDisabled: t, clearLabel: a, onClear: r, error: i, ...s }) => S("div", { className: U(["account-orders-list__search-input", ["account-orders-list__search-input--has-clear", !t], ["account-orders-list__search-input--error", !!i]]), children: [n(Ua, { ...s, error: i, "aria-invalid": !!i }), S("div", { className: "account-orders-list__search-actions", children: [t ? null : n(pe, { className: "account-orders-list__search-clear", type: "button", variant: "tertiary", icon: n(cr, {}), "aria-label": a, onClick: r }), n(pe, { className: "account-orders-list__search-submit", type: "submit", variant: "tertiary", icon: n(pr, {}), "aria-label": e, disabled: t })] })] }), Vn = ({ handleSearch: e, refetchOrders: t, searchText: a }) => {
  const r = Y({ action: "Account.fullSizeView.OrdersList.OrdersListSearch.action", clear: "Account.fullSizeView.OrdersList.OrdersListSearch.clear", label: "Account.fullSizeView.OrdersList.OrdersListSearch.label", minimumLength: "Account.fullSizeView.OrdersList.OrdersListSearch.minimumLength", placeholder: "Account.fullSizeView.OrdersList.OrdersListSearch.placeholder" }), [i, s] = A(a), [l, o] = A(""), u = ke(null), m = `${Qe()}-order-search`, c = !!(i.trim() || a), p = (f) => {
    o(""), s(f), f !== a ? e(f) : f && t();
  }, y = () => {
    const f = i.trim();
    if (f.length > 0 && f.length < Dt) {
      o(r.minimumLength);
      return;
    }
    p(f);
  }, _ = () => {
    var f;
    p("");
    const w = (f = u.current) == null ? void 0 : f.elements.namedItem("orderSearch");
    w instanceof HTMLInputElement && w.focus();
  };
  return n("form", { ref: u, className: "account-orders-list__search", role: "search", "aria-label": r.action, onSubmit: (f) => {
    f.preventDefault(), y();
  }, children: n(Pe, { label: r.label, error: l || void 0, children: n(En, { id: m, name: "orderSearch", value: i, maxLength: It, placeholder: r.placeholder, actionLabel: r.action, actionDisabled: !c, clearLabel: r.clear, onClear: _, onInput: (f) => {
    s(f.currentTarget.value), o("");
  } }) }) });
}, Dn = ({ className: e, withHeader: t = !0, minifiedView: a = !1, withThumbnails: r = !0, withFilter: i = !0, withSearch: s = !1, searchScope: l = "selectedDate", ordersInMinifiedView: o = 1, pageSize: u = 10, routeOrdersList: m, routeOrderDetails: c, routeReturnDetails: p, routeTracking: y, routeOrderProduct: _, slots: f }) => {
  const w = a ? "minifiedView" : "fullSizeView", h = Y({ containerTitle: `Account.${w}.OrdersList.containerTitle`, dateOrderPlaced: `Account.${w}.OrdersList.dateOrderPlaced`, loading: "Account.OrdersList.loading", loaded: "Account.OrdersList.loaded" }), { selectableDateList: v, selectedDate: C, handleSelectDate: B, selectedPage: b, searchText: D, handleSearch: d, setSelectedPage: L, handleSetFirstOrderDate: x } = In(l), { inLineAlertProps: M, handleSetInLineAlert: F } = nt(), { pageInfo: N, loading: $, orderHistoryListItems: k, placeholderImage: P, refetchOrders: g } = kn({ minifiedView: a, pageSize: u, ordersInMinifiedView: o, selectedDate: C, selectedPage: b, searchText: D, handleSetFirstOrderDate: x, handleSetInLineAlert: F });
  return S("div", { children: [t ? n(Ne, { "aria-label": h.containerTitle, role: "region", title: h.containerTitle, divider: !a, className: U(["account-orders-list-header-title", ["account-orders-list-header", a]]), level: a ? 2 : 1 }) : null, S("div", { className: U(["account-orders-list", e]), children: [n(za, { message: $ ? h.loading : h.loaded }), !a && (s || i) ? S("div", { className: "account-orders-list__controls", children: [i ? n(Pe, { className: "account-orders-list__date-select", label: h.dateOrderPlaced, children: n(ba, { id: "orderDatePicker", value: C, name: "orderDatePicker", "aria-label": h.dateOrderPlaced, options: v, handleSelect: B }) }) : null, s ? n(Vn, { handleSearch: d, refetchOrders: g, searchText: D }) : null] }) : null, M.text ? n(Ie, { "data-testid": "ordersListInLineAlert", className: "account-orders-list__notification", type: M.type, variant: "secondary", heading: M.text, icon: M.icon }) : null, $ ? n(ue, { children: Array.from(Array(N == null ? void 0 : N.pageSize).keys()).map((I) => n(Ue, { testId: "orderSkeletonLoader", withCard: !1 }, I)) }) : n(ue, { children: k.length ? n(ue, { children: k.map((I, O) => n(fr, { placeholderImage: P, routeTracking: y, routeOrderProduct: _, routeReturnDetails: p, minifiedView: a, item: I, withThumbnails: r, slots: f, children: f != null && f.OrdersListAction ? n(Le, { "data-testid": `ordersListActionSlot_${O}`, name: "OrdersListAction", slot: f == null ? void 0 : f.OrdersListAction, context: { orderHistoryListItem: I } }) : n(Da, { minifiedView: a, orderNumber: I.number, orderToken: I.token, routeOrderDetails: c }) }, O)) }) : n(Xe, { isEmpty: !k.length, typeList: "orders", minifiedView: a }) }), !a && (N == null ? void 0 : N.totalPages) > 1 ? n(ya, { totalPages: N == null ? void 0 : N.totalPages, currentPage: b, onChange: L }) : null, a ? n(Da, { minifiedView: a, routeOrdersList: m }) : null] })] });
};
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Tn = ({ selectedAddress: e = null, suggestedAddress: t, originalAddress: a, handleSelectedAddress: r }) => {
  const [i, s] = A(e), [l, o] = A(!1), u = ve(() => !t || !a ? null : { ...a, ...t }, [a, t]), m = T(async (c) => {
    s(c);
    const p = c === "suggested" ? u : a;
    o(!0);
    try {
      await (r == null ? void 0 : r({ selection: c, address: p }));
    } finally {
      o(!1);
    }
  }, [u, a, r]);
  return W(() => {
    i && m(i);
  }, [i, m]), n(bn, { busy: l, originalAddress: a, selection: i, suggestedAddress: u, onSelectionChange: m });
};
Tn.displayName = "AddressValidation";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Mn = (e, t) => e && t ? "selectedAddress" : e ? "selectedShippingAddress" : t ? "selectedBillingAddress" : "default", Fn = ({ hideActionFormButtons: e, fieldIdPrefix: t, b2bEnabled: a, formName: r, slots: i, title: s, headerLevel: l, addressFormTitle: o, defaultSelectAddressId: u, showFormLoader: m, forwardFormRef: c, showSaveCheckBox: p, saveCheckBoxValue: y, selectShipping: _, selectBilling: f, selectable: w, className: h, withHeader: v, minifiedView: C, withActionsInMinifiedView: B, withActionsInFullSizeView: b, inputsDefaultValueSet: D, showShippingCheckBox: d, showBillingCheckBox: L, shippingCheckBoxValue: x, billingCheckBoxValue: M, onAddressData: F, routeAddressesPage: N, onSubmit: $, onSuccess: k, onError: P, contextMode: g }) => {
  const I = C ? "minifiedView" : "fullSizeView", O = r ?? Mn(_, f), Z = g || (w ? "checkout" : "addressBook");
  return n("div", { className: U(["account-addresses", h]), "data-testid": "addressesid", children: n(Or, { inputName: O, minifiedViewKey: I, hideActionFormButtons: e, fieldIdPrefix: t, b2bEnabled: a, slots: i, title: s, headerLevel: l, addressFormTitle: o, defaultSelectAddressId: u, showFormLoader: m, onAddressData: F, forwardFormRef: c, selectShipping: _, selectBilling: f, showSaveCheckBox: p, saveCheckBoxValue: y, selectable: w, className: h, withHeader: v, minifiedView: C, withActionsInMinifiedView: B, withActionsInFullSizeView: b, inputsDefaultValueSet: D, billingCheckBoxValue: M, shippingCheckBoxValue: x, showBillingCheckBox: L, showShippingCheckBox: d, routeAddressesPage: N, onSubmit: $, onSuccess: k, onError: P, contextMode: Z }) });
};
Fn.displayName = "Addresses";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const On = ({ className: e, withHeader: t, minifiedView: a, withThumbnails: r, withFilter: i, withSearch: s, searchScope: l, ordersInMinifiedView: o, pageSize: u, routeOrdersList: m, routeOrderDetails: c, routeReturnDetails: p, routeTracking: y, routeOrderProduct: _, slots: f }) => n("div", { className: U(["account-orders-list", e]), "data-testid": "ordersListId", children: n(Dn, { className: e, withHeader: t, minifiedView: a, withThumbnails: r, withFilter: i, withSearch: s, searchScope: l, ordersInMinifiedView: o, pageSize: u, routeOrdersList: m, routeOrderDetails: c, routeReturnDetails: p, routeTracking: y, routeOrderProduct: _, slots: f }) });
On.displayName = "OrdersList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const $n = ({ pageSize: e = 10, enabled: t = !0, authenticated: a = !0, contextKey: r = "" } = {}) => {
  if (!Number.isSafeInteger(e) || e < 1) throw new RangeError("Customer review page size must be a positive integer.");
  const [i, s] = A({ contextKey: r, initialPageSize: e, pageSize: e, currentPage: 1 }), l = i.contextKey === r && i.initialPageSize === e, o = l ? i.pageSize : e, u = l ? i.currentPage : 1, m = JSON.stringify([r, o, u, t, a]), [c, p] = A({ key: "", page: null, error: !1, loading: !0 }), [y, _] = A(0), [f, w] = A(null), h = (f == null ? void 0 : f.key) === m ? f : null, v = c.key === m ? c.page : null, C = c.key !== m || c.loading, B = c.key === m && c.error;
  return W(() => {
    const b = new AbortController();
    return w(null), p({ key: m, page: null, error: !1, loading: !0 }), t && a && Tt({ pageSize: o, currentPage: u, signal: b.signal }).then((D) => {
      b.signal.aborted || p({ key: m, page: D, error: !1, loading: !1 });
    }).catch((D) => {
      b.signal.aborted || (console.error("[Account Reviews] Failed to load customer reviews.", D), p({ key: m, page: null, error: !0, loading: !1 }));
    }), () => b.abort();
  }, [m, y, t, a, o, u]), { page: v, pageSize: o, currentPage: u, selected: h, loading: C, failed: B, changePage: (b, D = o) => {
    !Number.isSafeInteger(b) || b < 1 || C || D === o && v && b > Math.max(1, v.pageInfo.totalPages) || s({ contextKey: r, initialPageSize: e, pageSize: D, currentPage: b });
  }, selectReview: (b, D) => {
    w({ key: m, review: b, index: D });
  }, clearSelection: () => w(null), retry: () => _((b) => b + 1) };
}, Rn = ({ minifiedView: e = !1, pageSize: t = e ? 3 : 10, enabled: a = !0, authenticated: r = !0, contextKey: i = "", ...s }) => {
  const l = $n({ pageSize: t, enabled: a, authenticated: r, contextKey: i });
  return n(Sn, { ...s, ...l, initialPageSize: t, minifiedView: e, enabled: a, authenticated: r });
};
Rn.displayName = "ProductReviews";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Hn = (e) => {
  if (!(e != null && e.dateOfBirth)) return e;
  const { dateOfBirth: t, ...a } = e;
  return { ...a, dob: t };
}, Zn = "accountContext";
var He = ((e) => (e.EDIT_ACCOUNT_EVENT = "edit-account", e))(He || {});
const zn = { EDIT_ACCOUNT_EVENT: "edit-account" };
function it() {
  return window.adobeDataLayer = window.adobeDataLayer || [], window.adobeDataLayer;
}
function Un(e, t) {
  const a = it();
  a.push({ [e]: null }), a.push({ [e]: t });
}
function qn(e, t) {
  it().push((a) => {
    const r = a.getState ? a.getState() : {};
    a.push({ event: e, eventInfo: { ...r, ...t } });
  });
}
function jn(e) {
  const t = Ft(e);
  Un(Zn, t), qn(zn.EDIT_ACCOUNT_EVENT);
}
const Za = (e, t) => {
  const a = sessionStorage.getItem("accountStoreConfig"), r = { ...a ? JSON.parse(a) : {}, ...t };
  switch (e) {
    case "edit-account":
      jn(r);
      break;
    default:
      return null;
  }
}, Gn = ({ handleSetInLineAlert: e }) => {
  const t = Y({ accountSuccess: "Account.minifiedView.CustomerInformation.editCustomerInformation.accountSuccess", accountError: "Account.minifiedView.CustomerInformation.editCustomerInformation.accountError", genderMale: "Account.minifiedView.CustomerInformation.genderMale", genderFemale: "Account.minifiedView.CustomerInformation.genderFemale" }), [a, r] = A(!0), [i, s] = A(!1), [l, o] = A(!1), [u, m] = A(!1), [c, p] = A(!1), [y, _] = A(!1), [f, w] = A([]), [h, v] = A(null), [C, B] = A([]), [b, D] = A({}), [d, L] = A(""), [x, M] = A(""), F = T((E) => {
    const { value: z } = E == null ? void 0 : E.target;
    z.length && p(!1), z.length || p(!0);
  }, []), N = T((E) => {
    L(E);
  }, []), $ = T((E) => {
    D(E);
  }, []), k = T(() => {
    o(!0), m(!1), e(), N("");
  }, [e, N]), P = T((E) => {
    E == null || E(), o(!1);
  }, []), g = T(() => {
    m(!0), o(!1), e(), N("");
  }, [e, N]), I = T((E) => {
    E == null || E(), m(!1);
  }, []), O = T((E, z) => {
    E === "success" ? e({ type: "success", text: z ?? t.accountSuccess }) : E === "error" ? e({ type: "error", text: z ?? t.accountError }) : e(), s(!1);
  }, [e, t]), Z = T(() => {
    Ya().then((E) => {
      var z;
      const q = (z = E == null ? void 0 : E.createdAt) == null ? void 0 : z.split(" ")[0], Q = Hn({ ...E, gender: E.gender === 1 ? t.genderMale : t.genderFemale });
      v(Q), M(q);
    });
  }, [t.genderFemale, t.genderMale]);
  W(() => {
    Z();
  }, []), W(() => {
    Je("customer_account_edit").then((E) => {
      B(E);
      const z = E.map(({ name: q, customUpperCode: Q, orderNumber: de, label: we }) => ({ name: Q, orderNumber: de, label: Ir.includes(q) ? null : we }));
      w(z);
    });
  }, []), W(() => {
    b.email && b.email !== (h == null ? void 0 : h.email) ? _(!0) : b.email && b.email === (h == null ? void 0 : h.email) && _(!1);
  }, [h == null ? void 0 : h.email, b]);
  const J = ve(() => !f || !h ? [] : f.filter(({ name: E }) => E !== void 0 && h[E]).map((E) => ({ name: E.name, orderNumber: E.orderNumber, value: h[E.name], label: E.label })), [h, f]);
  W(() => {
    J != null && J.length && r(!1);
  }, [J]);
  const oe = ve(() => C == null ? void 0 : C.map((E) => ({ ...E, defaultValue: E != null && E.customUpperCode && h ? h[E.customUpperCode] ?? "" : "" })).map((E) => E.customUpperCode === "gender" ? { ...E, defaultValue: E.defaultValue === "Male" ? 1 : 2 } : E), [C, h]), te = T(async (E, z) => {
    const q = ga(E.target), { email: Q, password: de, ...we } = q, fe = Q !== (h == null ? void 0 : h.email) && de.length === 0;
    if (!z) {
      fe && p(!0);
      return;
    }
    if (p(!1), s(!0), Q === (h == null ? void 0 : h.email)) {
      N(""), ca(ha(we, "account")).then((le) => {
        le && (Z(), O("success"), Za(He == null ? void 0 : He.EDIT_ACCOUNT_EVENT, { ...q }));
      }).catch((le) => {
        O("error", le.message);
      });
      return;
    }
    if (fe) {
      p(!0), s(!1);
      return;
    }
    Q != null && Q.length && de != null && de.length && Mt({ email: Q, password: de }).then((le) => {
      le && ca(ha(we, "account")).then((me) => {
        me && (Z(), O("success"), Za(He == null ? void 0 : He.EDIT_ACCOUNT_EVENT, { ...q }));
      }).catch((me) => {
        O("error", me.message);
      });
    }).catch((le) => {
      O("error", le.message);
    });
  }, [h, N, Z, O]);
  return { createdAt: x, errorPasswordEmpty: c, passwordValue: d, showPasswordOnEmailChange: y, orderedCustomerData: J, loading: a, normalizeFieldsConfig: oe, submitLoading: i, showEditForm: u, showChangePassword: l, handleShowChangePassword: k, handleHideChangePassword: P, handleShowEditForm: g, handleHideEditForm: I, handleUpdateCustomerInformation: te, handleInputChange: $, handleSetPassword: N, handleOnBlurPassword: F, renderAlertMessage: O };
}, Wn = ({ className: e, withHeader: t = !0, slots: a }) => {
  const r = Y({ containerTitle: "Account.minifiedView.CustomerInformation.containerTitle" }), { inLineAlertProps: i, handleSetInLineAlert: s } = nt(), { createdAt: l, errorPasswordEmpty: o, passwordValue: u, showPasswordOnEmailChange: m, orderedCustomerData: c, loading: p, normalizeFieldsConfig: y, submitLoading: _, showEditForm: f, showChangePassword: w, handleShowChangePassword: h, handleHideChangePassword: v, handleShowEditForm: C, handleHideEditForm: B, handleUpdateCustomerInformation: b, handleInputChange: D, handleSetPassword: d, handleOnBlurPassword: L } = Gn({ handleSetInLineAlert: s });
  return p ? n("div", { "data-testid": "customerInformationLoader", children: n(Ue, { withCard: !0 }) }) : S("div", { className: U(["account-customer-information", e]), children: [t ? n(Ne, { title: r.containerTitle, divider: !1, className: "customer-information__title", level: 2 }) : null, n(vn, { createdAt: l, slots: a, orderedCustomerData: c, showEditForm: f, showChangePassword: w, handleShowChangePassword: h, handleShowEditForm: C }), w ? n(hn, { inLineAlertProps: i, handleSetInLineAlert: s, handleHideChangePassword: v }) : null, f ? n(fn, { inLineAlertProps: i, submitLoading: _, formFieldsList: y, errorPasswordEmpty: o, passwordValue: u, showPasswordOnEmailChange: m, handleSetPassword: d, handleOnBlurPassword: L, handleUpdateCustomerInformation: b, handleHideEditForm: B, handleInputChange: D }) : null] });
};
Wn.displayName = "CustomerInformation";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Jn = (e) => {
  const [t, a] = A(!0), [r, i] = A(!1), [s, l] = A(!1), [o, u] = A(!1), [m, c] = A(!1), p = ke(!1), y = ke(lt((h) => {
    ca({ allowRemoteShoppingAssistance: h }).catch((v) => {
      console.error("Failed to update remote shopping assistance:", v), l(!h), u(!1);
    });
  }, 500)).current;
  W(() => () => {
    var h;
    (h = y.cancel) == null || h.call(y);
  }, [y]), W(() => {
    const h = (e == null ? void 0 : e.shoppingAssistanceEnabled) ?? !1;
    i(h);
  }, [e]), W(() => {
    if (!e) {
      a(!1), c(!1);
      return;
    }
    a(!0), Ya().then((h) => {
      const v = h.allowRemoteShoppingAssistance ?? !1;
      p.current || (l(v), u(!1)), c(!0);
    }).catch((h) => {
      console.error("Failed to load remote shopping assistance:", h);
    }).finally(() => {
      a(!1);
    });
  }, [e]);
  const _ = T((h) => {
    p.current = !0, c(!0), l(h), u(!1), y(h);
  }, [y]), f = T(() => {
    u(!0);
  }, []), w = (!t || p.current) && m && r && !s && !o;
  return { loading: t, isRemoteShoppingAssistanceAvailable: r, isRemoteShoppingAssistanceEnabled: s, showAlert: w, handleCheckboxChange: _, handleDismissAlert: f };
}, Yn = ({ className: e }) => {
  const t = Y({ checkboxLabel: "Account.sellerAssistedBuyingSettings.checkboxLabel", checkboxTooltip: "Account.sellerAssistedBuyingSettings.checkboxTooltip", alertMessage: "Account.sellerAssistedBuyingSettings.alertMessage", featureDisabledMessage: "Account.sellerAssistedBuyingSettings.featureDisabledMessage" }), { loading: a, remoteShoppingAssistanceConfigs: r } = _a(), { loading: i, isRemoteShoppingAssistanceAvailable: s, isRemoteShoppingAssistanceEnabled: l, showAlert: o, handleCheckboxChange: u, handleDismissAlert: m } = Jn(r);
  return n("div", { className: U(["account-seller-assisted-buying-settings", e]), "data-testid": "sellerAssistedBuyingSettingsId", children: n(yn, { loading: a || i, isRemoteShoppingAssistanceEnabled: l, showAlert: o, checkboxLabel: (r == null ? void 0 : r.shoppingAssistanceCheckboxTitle) || t.checkboxLabel, checkboxTooltip: (r == null ? void 0 : r.shoppingAssistanceCheckboxTooltip) ?? t.checkboxTooltip, alertMessage: t.alertMessage, featureDisabledMessage: t.featureDisabledMessage, handleCheckboxChange: u, handleDismissAlert: m, isRemoteShoppingAssistanceAvailable: s }) });
};
Yn.displayName = "SellerAssistedBuyingSettings";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Kn = (e = {}) => {
  const { pageSize: t = 10 } = e, [a, r] = A(!0), [i, s] = A(null), [l, o] = A(null), [u, m] = A(1);
  W(() => {
    m(1);
  }, [t]), W(() => {
    r(!0), o(null), Ot(t, u).then((p) => {
      s(p);
    }).catch((p) => {
      console.error("Failed to fetch admin assistance actions:", p), o(p instanceof Error ? p.message : String(p));
    }).finally(() => {
      r(!1);
    });
  }, [u, t]);
  const c = T((p) => {
    m(p);
  }, []);
  return { loading: a, adminAssistanceActions: i, error: l, currentPage: u, handlePageChange: c };
}, Xn = ({ className: e, pageSize: t = 10, withWrapper: a = !0 }) => {
  const r = Y({ actionHeader: "Account.sellerAssistedBuyingActivity.tableHeaders.action", dateHeader: "Account.sellerAssistedBuyingActivity.tableHeaders.date", detailsHeader: "Account.sellerAssistedBuyingActivity.tableHeaders.details", emptyStateMessage: "Account.sellerAssistedBuyingActivity.emptyStateMessage", errorMessage: "Account.sellerAssistedBuyingActivity.errorMessage", featureDisabledMessage: "Account.sellerAssistedBuyingActivity.featureDisabledMessage", placeOrder: "Account.sellerAssistedBuyingActivity.actionTypes.place_order", addToCart: "Account.sellerAssistedBuyingActivity.actionTypes.add_to_cart", removeFromCart: "Account.sellerAssistedBuyingActivity.actionTypes.remove_from_cart", removeCartItem: "Account.sellerAssistedBuyingActivity.actionTypes.remove_cart_item", updateQty: "Account.sellerAssistedBuyingActivity.actionTypes.update_qty", applyCoupon: "Account.sellerAssistedBuyingActivity.actionTypes.apply_coupon", removeCoupon: "Account.sellerAssistedBuyingActivity.actionTypes.remove_coupon", updateAddress: "Account.sellerAssistedBuyingActivity.actionTypes.update_address", updatePayment: "Account.sellerAssistedBuyingActivity.actionTypes.update_payment", updateShipping: "Account.sellerAssistedBuyingActivity.actionTypes.update_shipping", addProductNote: "Account.sellerAssistedBuyingActivity.actionTypes.add_product_note", updateCustomerInfo: "Account.sellerAssistedBuyingActivity.actionTypes.update_customer_info", save: "Account.sellerAssistedBuyingActivity.actionTypes.save" }), { loading: i, adminAssistanceActions: s, error: l, currentPage: o, handlePageChange: u } = Kn({ pageSize: t }), { loading: m, remoteShoppingAssistanceConfigs: c } = _a(), p = { action: r.actionHeader, date: r.dateHeader, details: r.detailsHeader }, y = { place_order: r.placeOrder, add_to_cart: r.addToCart, remove_from_cart: r.removeFromCart, remove_cart_item: r.removeCartItem, update_qty: r.updateQty, apply_coupon: r.applyCoupon, remove_coupon: r.removeCoupon, update_address: r.updateAddress, update_payment: r.updatePayment, update_shipping: r.updateShipping, add_product_note: r.addProductNote, update_customer_info: r.updateCustomerInfo, save: r.save };
  return n("div", { className: U(["account-seller-assisted-buying-activity", e]), "data-testid": "sellerAssistedBuyingActivityId", children: n(_n, { loading: m || i, adminAssistanceActions: s, tableHeaders: p, actionTypesMap: y, emptyStateMessage: r.emptyStateMessage, featureDisabledMessage: r.featureDisabledMessage, isRemoteShoppingAssistanceAvailable: (c == null ? void 0 : c.shoppingAssistanceEnabled) ?? !1, errorMessage: l ? r.errorMessage : void 0, currentPage: o, onPageChange: u, withWrapper: a }) });
};
Xn.displayName = "SellerAssistedBuyingActivity";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Qn = ({ className: e, ...t }) => n("div", { className: U(["account-payment-methods-root", e]), "data-testid": "paymentMethodsRoot", children: n(Cn, { ...t }) });
Qn.displayName = "PaymentMethods";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, t) {
  try {
    if (typeof document < "u") {
      const a = t.styleId;
      if (document.querySelector(`style[data-dropin="${a}"]`)) return;
      const r = document.createElement("style");
      for (const s in t.attributes) r.setAttribute(s, t.attributes[s]);
      r.setAttribute("data-dropin", a), r.appendChild(document.createTextNode(e));
      const i = document.querySelector('style[data-dropin="sdk"]');
      if (i) i.after(r);
      else {
        const s = document.querySelector('link[rel="stylesheet"], style');
        s ? s.before(r) : document.head.append(r);
      }
    }
  } catch (a) {
    console.error("dropin-styles (injectCodeFunction)", a);
  }
})('.account-form{display:grid;flex-direction:column;gap:var(--spacing-medium)}@media (min-width: 768px){.account-form{display:grid;grid-template-columns:repeat(2,1fr)}.account-form>.dropin-field:nth-child(1),.account-form>.dropin-field:nth-child(2){grid-column:span 1}.account-form>.dropin-field:nth-child(3),.account-form>.dropin-field:nth-child(4),.account-form>.dropin-field:nth-child(5){grid-column:span 2}.account-form>.dropin-field:nth-child(6),.account-form>.dropin-field:nth-child(7){grid-column:span 1}.account-form>.dropin-field:nth-child(8),.account-form>.dropin-field:nth-child(9){grid-column:span 1}.account-form>.dropin-field:nth-child(n+10){grid-column:span 2}.account-form>.account-address-form--saveAddressBook{grid-column:span 2}}.account-form [class$=-hidden]{position:absolute;opacity:0;height:0;width:0;overflow:hidden;clip:rect(0,0,0,0);display:none}.account-form .dropin-input:focus-visible,.account-form .dropin-picker__select:focus-visible,.account-form button:focus-visible{scroll-margin:var(--spacing-medium)}.account-account-loaders--card-loader{margin-bottom:var(--spacing-small)}.account-account-loaders--picker-loader div:first-child{max-width:200px}.account-account-loaders--picker-loader div:nth-child(3){max-width:400px}.account-account-loaders--address-actions-loader{display:block;width:168px}.account-address-card{margin-bottom:var(--spacing-small)}.account-address-card .dropin-card__content{display:grid;grid-template-columns:1fr auto;gap:var(--spacing-small) 0px;grid-template-areas:"description action" "labels action"}.account-address-card .account-address-card__action{display:flex;justify-content:flex-end;align-items:baseline;cursor:pointer;grid-area:action}.account-address-card .account-address-card__action--editbutton{margin-left:var(--spacing-small)}.account-address-card .account-address-card__action button{padding:0}.account-address-card .account-address-card__action button:hover{text-decoration:underline}.account-address-card .account-address-card__description{grid-area:description;margin:0;padding:0}.account-address-card .account-address-card__labels{display:flex;gap:0 var(--spacing-xsmall);grid-area:labels}.account-address-card .account-address-card__description p{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);line-height:var(--spacing-xbig);color:var(--color-neutral-800);padding:0;margin:0 var(--spacing-xsmall) 0 0}.account-address-card .account-address-card__description p:nth-child(1),.account-address-card .account-address-card__description p:nth-child(2){margin:0 var(--spacing-xsmall) var(--spacing-xsmall) 0;color:var(--color-neutral-800);font:var(--type-button-2-font);font-weight:500;cursor:default}.account-address-card .account-address-card__description p:nth-child(1),.account-address-card .account-address-card__description p:nth-child(3),.account-address-card .account-address-card__description p:nth-child(4),.account-address-card .account-address-card__description p:nth-child(6){float:left}.account-actions-address{cursor:pointer;padding:var(--spacing-xsmall) var(--spacing-medium);border-radius:var(--shape-border-radius-2);border:var(--shape-border-width-2) solid var(--color-neutral-400);background-color:var(--color-neutral-50);width:100%;height:88px;display:flex;align-items:center;justify-content:space-between}.account-actions-address--selectable{max-width:100%;width:auto}.account-actions-address--no-permission,.account-actions-address--loading{box-sizing:border-box;width:100%;cursor:default;pointer-events:none}.account-actions-address__title{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);-moz-appearance:none;appearance:none;-webkit-appearance:none;color:var(--color-neutral-800)}.account-actions-address svg{stroke:var(--shape-icon-stroke-4);color:var(--color-neutral-800)}.account-actions-address:focus-visible{scroll-margin:var(--spacing-medium)}@supports (height: 100dvh){.account-address-modal .dropin-modal{height:100dvh}}.account-address-modal--overlay{position:relative;padding:var(--spacing-small) var(--spacing-small) var(--spacing-small) var(--spacing-small);width:100%;margin:auto;max-width:340px}@media (min-width: 768px){.account-address-modal--overlay{position:relative;padding:var(--spacing-xbig) var(--spacing-xxbig) var(--spacing-xxbig) var(--spacing-xxbig);width:100%;margin:auto;max-width:721px}.account-address-card .dropin-card__content{padding:var(--spacing-small)}}.dropin-modal__body--medium>.dropin-modal__header-title,.dropin-modal__body--full>.dropin-modal__header-title,.account-address-modal .dropin-modal__content{margin:0;align-items:center}.account-address-modal .dropin-modal__header-title-content h3{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0;padding:0}.account-address-modal .account-address-modal__spinner{position:absolute;top:0;left:0;background-color:var(--color-neutral-200);opacity:.8;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:1}.account-address-modal p{margin:var(--spacing-small) 0}@media (min-width: 768px){.account-address-modal p{color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}}.account-address-modal .account-address-modal__buttons{display:flex;align-items:center;justify-content:right;gap:0 var(--spacing-small)}.account-empty-list{margin-bottom:var(--spacing-small)}.account-empty-list.account-empty-list--minified,.account-empty-list .dropin-card{border:none}.account-empty-list .dropin-card__content{gap:0;padding:var(--spacing-xxbig)}.account-empty-list.account-empty-list--minified .dropin-card__content{flex-direction:row;align-items:center;padding:var(--spacing-big) var(--spacing-small)}.account-empty-list .dropin-card__content svg{width:64px;height:64px;margin-bottom:var(--spacing-medium);color:var(--color-neutral-800)}.account-empty-list.account-empty-list--minified .dropin-card__content svg{margin:0 var(--spacing-small) 0 0;width:32px;height:32px;color:var(--color-neutral-500)}.account-empty-list .dropin-card__content p{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800)}.account-empty-list.account-empty-list--minified .dropin-card__content p{font:var(--type-body-1-strong-font);color:var(--color-neutral-800)}.account-orders-list-action{margin:0;padding:0;border:none;background-color:transparent;cursor:pointer;text-decoration:none}a.account-orders-list-action:focus-visible{display:inline-block;scroll-margin:var(--spacing-medium)}.account-orders-list-action--minifiedView{width:100%;text-align:left;font:var(--type-body-1-default-font)}.account-orders-list-action.account-orders-list-action--minifiedView:hover{text-decoration:none}.account-orders-list-action--minifiedView .account-orders-list-action__card-wrapper{display:flex;justify-content:space-between;align-items:center;color:var(--color-neutral-800);height:calc(88px - var(--spacing-small) * 2)}.account-orders-list-action__card-wrapper>p{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing)}.account-orders-list-action__card-wrapper svg,.account-orders-list-action svg{color:var(--color-neutral-800)}.account-orders-list-action--minifiedView .dropin-card__content{padding:var(--spacing-small) var(--spacing-medium)}.account-orders-list-action--minifiedView p{font:var(--type-body-1-strong-font)}.account-orders-list-card{height:100%;margin-bottom:var(--spacing-small);scroll-margin:var(--spacing-medium)}.account-orders-list-card .dropin-card__content{padding:var(--spacing-medium);display:grid;grid-template-areas:"content actions" "imageList actions";gap:0;max-height:100%}.account-orders-list-card .account-orders-list-card__content{grid-area:content;margin-bottom:var(--spacing-small)}.account-orders-list-card__content--quantity{font-weight:500;color:var(--color-neutral-800)}.account-orders-list-card__content--track_number,.account-orders-list-card__content--return_number{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-orders-list-card .account-orders-list-card__content>div:first-child{font-weight:500}.account-orders-list-card .account-orders-list-card__content p,.account-orders-list-card .account-orders-list-card__content div{padding:0;text-align:left;font:var(--type-body-1-default-font);margin:0 0 var(--spacing-small) 0;color:var(--color-neutral-800)}.account-orders-list-card p.account-orders-list-card__content--product-name{margin:0}.account-orders-list-card .account-orders-list-card__product-list{list-style:none;margin:0;padding:0}.account-orders-list-card .account-orders-list-card__product-list .account-orders-list-card__content--product-name{padding:0;text-align:left;font:var(--type-body-1-default-font);margin:0;color:var(--color-neutral-800)}.account-orders-list-card .account-orders-list-card__content p:last-child{margin:0}.account-orders-list-card .account-orders-list-card__content div{font:var(--type-button-2-font);margin-bottom:var(--spacing-small)}.account-orders-list-card .account-orders-list-card__actions{grid-area:actions}.account-orders-list-card .account-orders-list-card__images{overflow:auto}.account-orders-list-card .account-orders-list-card__images .dropin-content-grid__content{grid-template-columns:repeat(6,max-content)!important}.account-orders-list-card .account-orders-list-card__images-3 .dropin-content-grid__content{grid-template-columns:repeat(3,max-content)!important}.account-orders-list-card .account-orders-list-card__images img{object-fit:contain;width:65px;height:65px}.account-orders-list-card .account-orders-list-card__actions{position:relative;align-self:center;margin-left:auto}.account-orders-list-card .account-orders-list-card__actions a:focus-visible{scroll-margin:var(--spacing-medium)}@media (min-width: 768px){.account-orders-list-card.account-orders-list-card--full .dropin-card__content{max-height:100%}}.account-addresses-header{margin-bottom:var(--spacing-medium)}.account-addresses-header-title .dropin-header-container__title{margin:0}.account-addresses-wrapper{box-sizing:border-box;position:relative}.account-addresses-wrapper--select-view{position:relative;margin:0;padding:0;border:none}.account-addresses-wrapper--select-view input[type=radio]{position:absolute;clip:rect(0,0,0,0);width:1px;height:1px;padding:0;margin:-1px;border:0;overflow:hidden}.account-addresses-wrapper--select-view .account-addresses-wrapper__label{cursor:pointer;display:block;border-radius:0}.account-addresses-wrapper--select-view .account-addresses-wrapper__label .account-address-card{border-radius:0}.account-addresses-wrapper--select-view .account-addresses-wrapper__label:nth-child(2){border-radius:var(--shape-border-radius-1) var(--shape-border-radius-1) 0 0}.account-addresses-wrapper--select-view>.account-addresses-wrapper__label:nth-child(2)>.account-address-card{border-radius:var(--shape-border-radius-1) var(--shape-border-radius-1) 0 0}.account-addresses-wrapper--select-view>.account-addresses-wrapper__footer-section>.account-addresses-wrapper__label:last-child,.account-addresses-wrapper--select-view>.account-addresses-wrapper__footer-section>.account-addresses-wrapper__label:last-child>.account-actions-address.account-actions-address--address{border-radius:0 0 var(--shape-border-radius-1) var(--shape-border-radius-1)}.account-addresses-wrapper--select-view .account-addresses-wrapper__label .account-address-card,.account-addresses-wrapper--select-view .account-addresses-wrapper__label .account-actions-address.account-actions-address--address{background-color:var(--color-neutral-200)}.account-addresses-wrapper--select-view input[type=radio]:checked+.account-addresses-wrapper__label>.account-address-card{border:var(--shape-border-width-1) solid var(--color-neutral-900);position:relative}.account-addresses-wrapper--select-view input[type=radio]:focus+.account-addresses-wrapper__label>.account-address-card,.account-addresses-wrapper--select-view input[type=radio]:focus+.account-addresses-wrapper__label>.account-actions-address.account-actions-address--address{border:var(--shape-border-width-1) solid var(--color-neutral-900);outline:var(--spacing-xxsmall) solid var(--color-button-focus);position:relative}.account-addresses-wrapper--select-view input[type=radio]:checked+.account-addresses-wrapper__label>.account-addresses-form__footer__wrapper{border:var(--shape-border-width-1) solid var(--color-neutral-900);position:relative}.account-addresses-wrapper--select-view input[type=radio]:checked+.account-addresses-wrapper__label .account-address-card,.account-addresses-wrapper--select-view input[type=radio]:checked+.account-addresses-wrapper__label .account-actions-address.account-actions-address--address{background-color:var(--color-neutral-50)}.account-addresses-wrapper--select-view .account-address-card{margin:0}.account-addresses-wrapper--select-view .account-addresses-form__footer__wrapper{padding:var(--spacing-medium)}.account-address-form-wrapper{box-sizing:border-box;background-color:var(--color-neutral-50)}.account-address-form-wrapper__notification{margin-bottom:var(--spacing-medium)}.account-address-form-wrapper__title{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}.account-address-form-wrapper__buttons{display:flex;align-items:center;justify-content:end;gap:0 var(--spacing-medium);margin-top:var(--spacing-medium)}.account-address-form-wrapper__buttons--empty{gap:0;margin:0;padding:0;display:inline-block}.account-address-form-wrapper__buttons button{min-width:142px}.account-change-password .dropin-card__content{gap:0}.account-change-password__title{margin-bottom:var(--spacing-medium)}.account-change-password__title .dropin-header-container__title{margin:0}.account-change-password .account-change-password__notification,.account-change-password .account-change-password__fields .account-change-password__fields-item{margin-bottom:var(--spacing-medium)}.account-change-password .account-change-password__fields .account-change-password__fields-item:last-child{margin-bottom:0}.account-change-password .account-change-password__actions{display:flex;justify-content:right;align-items:center;gap:0 var(--grid-3-gutters)}.account-change-password .account-change-password__actions button{min-width:144px}.account-change-password .dropin-input-password__eye-icon:focus-visible,.account-change-password .dropin-input:focus-visible,.account-change-password .account-change-password__actions button:focus-visible{scroll-margin:var(--spacing-medium)}.account-edit-customer-information__title{margin-bottom:var(--spacing-medium)}.account-edit-customer-information__title .dropin-header-container__title{margin:0}.account-edit-customer-information .dropin-card__content{gap:0}.account-edit-customer-information .account-edit-customer-information__notification{margin-bottom:var(--spacing-medium)}.account-edit-customer-information .account-edit-customer-information-form__field:nth-child(n+3),.account-edit-customer-information .account-edit-customer-information__password{grid-column:span 2}.account-edit-customer-information .account-edit-customer-information__actions{display:flex;justify-content:end;align-items:center;gap:0 var(--grid-2-gutters);grid-column:span 2}.account-edit-customer-information .account-edit-customer-information__actions button{min-width:144px}.customer-information__title{margin-bottom:var(--spacing-medium)}.customer-information__title .dropin-header-container__title{margin:0}.account-customer-information-card-short{margin-bottom:var(--spacing-small)}.account-customer-information-card .dropin-card__content{gap:0}.account-customer-information-card__wrapper{display:grid;grid-template-columns:1fr;align-items:start;gap:var(--grid-1-gutters) 0}.account-customer-information-card .account-customer-information-card__actions{margin-left:auto;display:flex;justify-content:space-between;align-items:center;gap:0 var(--grid-2-gutters)}@media (max-width: 300px){.account-customer-information-card .account-customer-information-card__actions{align-items:self-end;flex-direction:column-reverse}}.account-customer-information-card .account-customer-information-card__actions button{cursor:pointer;margin:0;padding:0}.account-customer-information-card__content p{font:var(--type-body-1-default-font);margin:0 var(--spacing-xsmall) 0 0;line-height:var(--spacing-xbig);padding:0}.account-customer-information-card__content p:nth-child(1),.account-customer-information-card__content p:nth-child(2){font:var(--type-body-1-strong-font);font-weight:500;margin:0 var(--spacing-xsmall) var(--spacing-xsmall) 0}.account-customer-information-card__content p:nth-child(1){float:left}.account-address-validation{display:grid;gap:var(--spacing-medium)}.account-address-validation__options--busy{opacity:.4;pointer-events:none}.account-address-validation__title{margin-bottom:var(--spacing-small)}.account-address-validation__title .dropin-header-container__title{margin:0}.account-address-validation__subtitle{color:var(--color-neutral-700);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.account-address-validation__options{display:grid;gap:var(--spacing-xbig);grid-template-columns:1fr 1fr}.account-address-validation__option{margin:0}.account-address-validation__option-title{margin-bottom:var(--spacing-xsmall)}.account-seller-assisted-buying-settings-control{display:flex;flex-direction:column;gap:var(--spacing-small)}.account-seller-assisted-buying-settings-control__checkbox-row{display:flex;align-items:center}.account-seller-assisted-buying-settings-control__info-container{position:relative;display:inline-flex;margin-left:var(--spacing-xsmall)}.account-seller-assisted-buying-settings-control__info-icon{display:inline-flex;align-items:center;justify-content:center;width:14px;height:14px;padding:0;border-radius:50%;border:1px solid var(--color-neutral-700);background:transparent;font-size:10px;font-weight:700;color:var(--color-neutral-700);cursor:help}.account-seller-assisted-buying-settings-control__tooltip{visibility:visible;opacity:1;background-color:var(--color-neutral-800);color:var(--color-neutral-50);text-align:left;width:300px;word-wrap:break-word;border-radius:4px;padding:var(--spacing-xsmall);position:absolute;z-index:2;bottom:125%;left:50%;transform:translate(-50%);white-space:normal;font:var(--type-details-caption-2-font);line-height:1.4;transition:opacity .3s,visibility .3s;pointer-events:none;box-shadow:0 2px 8px #00000026}.account-seller-assisted-buying-settings-control__tooltip-arrow{content:"";position:absolute;top:100%;left:50%;margin-left:-4px;border-width:4px;border-style:solid;border-color:var(--color-neutral-800) transparent transparent transparent}.account-seller-assisted-buying-activity-table{display:flex;flex-direction:column;gap:var(--spacing-medium);width:100%}.account-seller-assisted-buying-activity-table__table-wrapper{overflow-x:auto;width:100%}.account-seller-assisted-buying-activity-table__table{width:100%;min-width:600px}.account-seller-assisted-buying-activity-table__pagination{display:flex;justify-content:center;padding:var(--spacing-medium) 0}@media (max-width: 768px){.account-seller-assisted-buying-activity-table__table{min-width:unset}}.account-payment-card .dropin-card__content{display:grid;grid-template-columns:1fr auto;gap:var(--spacing-small) 0;grid-template-areas:"description action" "labels action"}.account-payment-card .account-payment-card__action{display:flex;justify-content:flex-end;align-items:baseline;cursor:pointer;grid-area:action}.account-payment-card .account-payment-card__action button{padding:0}.account-payment-card .account-payment-card__action button:hover{text-decoration:underline}.account-payment-card .account-payment-card__description{grid-area:description;margin:0;padding:0}.account-payment-card .account-payment-card__description p{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);line-height:var(--spacing-xbig);color:var(--color-neutral-800);padding:0;margin:0 var(--spacing-xsmall) 0 0}.account-payment-card .account-payment-card__description p:nth-child(1){margin:0 var(--spacing-xsmall) var(--spacing-xsmall) 0;color:var(--color-neutral-800);font:var(--type-button-2-font);font-weight:500;cursor:default}.account-payment-card .account-payment-card__card-brand{font:var(--type-button-2-font);font-weight:500;color:var(--color-neutral-800);margin:0 0 var(--spacing-xsmall) 0;padding:0}.account-payment-card .account-payment-card__card-number{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);line-height:var(--spacing-xbig);color:var(--color-neutral-800);margin:0;padding:0}.account-payment-card .account-payment-card__labels{display:flex;gap:0 var(--spacing-xsmall);grid-area:labels}.account-payment-card--minified .dropin-card__content{display:flex;flex-flow:row nowrap;align-items:center;gap:var(--spacing-small);grid-template-columns:unset;grid-template-areas:unset}.account-payment-card--minified .account-payment-card__description{display:flex;flex-flow:row nowrap;align-items:baseline;gap:var(--spacing-xsmall);flex:1 1 auto;min-width:0;order:1}.account-payment-card--minified .account-payment-card__description p{margin:0}.account-payment-card--minified .account-payment-card__card-brand{margin:0;flex-shrink:0}.account-payment-card--minified .account-payment-card__card-number{margin:0;white-space:nowrap}.account-payment-card--minified .account-payment-card__labels{grid-area:unset;flex-shrink:0;order:2}.account-payment-card--minified .account-payment-card__action{grid-area:unset;margin-left:auto;flex-shrink:0;order:3}.account-payment-methods-header{margin-bottom:var(--spacing-medium)}.account-payment-methods-header-title .dropin-header-container__title{margin:0}.account-payment-methods__list{display:flex;flex-direction:column;gap:var(--spacing-small, .75rem)}.account-payment-methods__empty{width:100%}.account-payment-methods__alert{margin-bottom:var(--spacing-medium, 1rem)}@supports (height: 100dvh){.dropin-modal:has(.account-payment-modal--overlay){height:100dvh}}.account-payment-modal--overlay{position:relative;box-sizing:border-box;justify-self:center;min-width:0;width:min(340px,calc(100% - 2 * var(--spacing-medium)));margin-inline:auto;padding:var(--spacing-small) var(--spacing-small) var(--spacing-small) var(--spacing-small)}@media (min-width: 768px){.account-payment-modal--overlay{width:min(721px,calc(100% - 2 * var(--spacing-xxbig)));padding:var(--spacing-xbig) var(--spacing-xxbig) var(--spacing-xxbig) var(--spacing-xxbig)}.account-payment-card .dropin-card__content{padding:var(--spacing-small)}}.dropin-modal__body--medium>.dropin-modal__header-title,.dropin-modal__body--full>.dropin-modal__header-title,.account-payment-modal--overlay .dropin-modal__content{margin:0;align-items:center}.account-payment-modal--overlay .dropin-modal__header-title-content h3{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0;padding:0}.account-payment-modal .account-payment-modal__spinner{position:absolute;top:0;left:0;background-color:var(--color-neutral-200);opacity:.8;width:100%;height:100%;display:flex;justify-content:center;align-items:center;z-index:1}.account-payment-modal p{margin:var(--spacing-small) 0;color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing)}@media (min-width: 768px){.account-payment-modal p{margin-bottom:var(--spacing-medium)}}.account-payment-modal .account-payment-modal__buttons{display:flex;flex-direction:column;align-items:stretch;gap:var(--spacing-small);margin-top:var(--spacing-medium)}.account-payment-modal .account-payment-modal__buttons>.dropin-button{width:100%;justify-content:center}@media (min-width: 768px){.account-payment-modal .account-payment-modal__buttons{flex-direction:row;align-items:center;justify-content:flex-end;gap:0 var(--spacing-small);margin-top:var(--spacing-xbig)}.account-payment-modal .account-payment-modal__buttons>.dropin-button{width:auto;justify-content:center}}.account-product-review-details{color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.account-product-review-details .dropin-card__content{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--spacing-medium);padding:var(--spacing-medium)}.account-product-review-details__product{display:flex;flex-direction:column;gap:var(--spacing-small);align-items:flex-start;min-width:0;overflow-wrap:anywhere;font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-review-details__product p{margin:0}.account-product-review-details__product img{width:180px;height:180px;max-width:100%;object-fit:contain}.account-product-review-details__content{display:flex;flex-direction:column;align-items:flex-start;gap:var(--spacing-small);min-width:0;overflow-wrap:anywhere}.account-product-review-details__summary{margin:0;font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-review-details__text{margin:0;white-space:pre-wrap}.account-product-review-details time{color:var(--color-neutral-700);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.account-product-review-details__criteria{display:grid;gap:var(--spacing-small);width:100%;margin:var(--spacing-small) 0 0}.account-product-review-details__average-rating,.account-product-review-details__criteria>div{display:flex;align-items:center;gap:var(--spacing-small);width:100%;min-width:0}.account-product-review-details__average-rating>span:first-child,.account-product-review-details__criteria dt{min-width:0;font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-review-details__average-rating>:last-child,.account-product-review-details__criteria dd{flex-shrink:0;margin:0}@media (min-width: 600px){.account-product-review-details .dropin-card__content{grid-template-columns:180px minmax(0,1fr);gap:var(--spacing-big)}}.account-product-reviews{color:var(--color-neutral-800);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);min-width:0}.account-product-reviews__header .dropin-header-container__title{margin:0}.account-product-reviews--minified .account-product-reviews__header{margin-bottom:var(--spacing-medium)}.account-product-reviews__table{position:relative;overflow-x:auto}.account-product-reviews table{border-collapse:collapse;width:100%;min-width:640px}.account-product-reviews th,.account-product-reviews td{padding:var(--spacing-medium) var(--spacing-small);text-align:start;vertical-align:top;border-bottom:var(--shape-border-width-1) solid var(--color-neutral-400);overflow-wrap:anywhere}.account-product-reviews th{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-reviews__date,.account-product-reviews__rating,.account-product-reviews__action{white-space:nowrap}.account-product-reviews__summary{display:grid;gap:var(--spacing-small);list-style:none;margin:0;padding:0}.account-product-reviews__summary .dropin-card__content{display:grid;grid-template-columns:minmax(0,1fr);gap:var(--spacing-small);padding:var(--spacing-medium)}.account-product-reviews__summary-product{overflow-wrap:anywhere;font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-reviews__summary-text{margin:0;overflow-wrap:anywhere}.account-product-reviews__summary-date{color:var(--color-neutral-700);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.account-product-reviews__back{display:inline-block;margin-top:var(--spacing-medium);font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing)}.account-product-reviews__view-all{display:block;margin-top:var(--spacing-small);color:inherit;text-decoration:none}.account-product-reviews__view-all:hover{text-decoration:none}.account-product-reviews__view-all .dropin-card__content{display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:var(--spacing-small);padding:var(--spacing-medium);font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.account-product-reviews__paging{display:flex;flex-direction:column;gap:var(--spacing-medium);margin-block:var(--spacing-medium)}.account-product-reviews__page-size{min-width:160px}.account-product-reviews__sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}@media (min-width: 600px){.account-product-reviews__summary .dropin-card__content{grid-template-columns:minmax(0,1fr) auto}.account-product-reviews__summary-text,.account-product-reviews__summary-date{grid-column:1 / -1}.account-product-reviews__paging{flex-direction:row;align-items:start;justify-content:space-between}}.account-orders-list-header{margin-bottom:var(--spacing-medium)}.account-orders-list-header-title .dropin-header-container__title{margin:0}.account-orders-list ul{list-style:none;margin:0;padding:0}.account-orders-list__notification{margin-bottom:var(--spacing-medium)}.account-orders-list__controls{display:flex;align-items:flex-start;gap:var(--spacing-medium);flex-wrap:wrap;margin-bottom:var(--spacing-xbig)}.account-orders-list__date-select{flex:0 1 224px;min-width:0}.account-orders-list__date-select .dropin-picker{width:100%;max-width:100%}.account-orders-list__search{flex:1 1 100%;max-width:100%;min-width:0;margin:0}.account-orders-list__search-input{--search-actions-width: var(--spacing-xbig);position:relative}.account-orders-list__search-input--has-clear{--search-actions-width: calc(var(--spacing-xbig) * 2)}.account-orders-list__search-input .dropin-input{padding-inline-end:calc(var(--search-actions-width) + var(--spacing-xsmall))}.account-orders-list__search-input--error .dropin-input{padding-inline-end:calc(var(--search-actions-width) + (var(--spacing-small) * 2))}.account-orders-list__search-input--error .dropin-input__field-icon--right{right:auto;inset-inline-end:calc(var(--search-actions-width) + var(--spacing-xsmall))}.account-orders-list__search-actions{position:absolute;inset-block-start:50%;inset-inline-end:0;transform:translateY(-50%);display:flex;align-items:center;z-index:2}@media (min-width: 768px){.account-orders-list__search{flex-basis:320px;max-width:400px;margin-inline-start:auto}}', { styleId: "account" });
export {
  Re as AddressForm,
  Tn as AddressValidation,
  Fn as Addresses,
  Wn as CustomerInformation,
  On as OrdersList,
  Qn as PaymentMethods,
  Rn as ProductReviews,
  Xn as SellerAssistedBuyingActivity,
  Yn as SellerAssistedBuyingSettings
};
//# sourceMappingURL=containers.js.map
