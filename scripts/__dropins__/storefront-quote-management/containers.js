/*! Copyright 2026 Adobe
All Rights Reserved. */
import { useState as l, useEffect as oe, useCallback as g, jsx as e, jsxs as ae, Fragment as We, useRef as St, useMemo as X, createPortal as Qe } from "@dropins/tools/preact-bundle.js";
import { Slot as b, getFormErrors as ga, getFormValues as Va, classes as Ga } from "@dropins/tools/lib.js";
import { TextArea as ia, Field as Ja, Input as Ya, InputFile as la, Button as Se, InLineAlert as K, Price as be, Icon as Ze, CartList as Za, Accordion as Ka, AccordionSection as $a, CartItem as en, Image as tn, IllustratedMessage as wa, Picker as Da, Pagination as Ca } from "@dropins/tools/components.js";
import { v as ra, f as sa, a as ma, b as da, A as ca, R as an, c as Ne, d as Me, j as Sa, I as Et, o as Ea, P as ka, C as Ee, L as Fa, e as Ae, k as Ia, l as na, m as Ra, T as La, M as nn, n as Ha, h as on, i as ln, O as rn, s as sn, t as mn, u as pa, Q as dn, p as cn, q as un, r as gn, E as pn, g as fn } from "./chunks/components.js";
import { O as fo } from "./chunks/components.js";
import { events as ge } from "@dropins/tools/event-bus.js";
import { uploadFile as ua, requestNegotiableQuote as Ct, updateQuantities as fa, setLineItemNote as vn, removeNegotiableQuoteItems as bn, getQuoteData as yn, renameNegotiableQuote as hn, closeNegotiableQuote as qn, createQuoteTemplate as _n, sendForReview as xn, deleteQuote as Mn, duplicateQuote as Tn, s as za, Q as Be, g as oa, negotiableQuotes as va, addQuoteTemplateLineItemNote as Qn, removeQuoteTemplateItems as Nn, updateQuoteTemplateItemQuantities as wn, N as ba, openQuoteTemplate as Dn, deleteQuoteTemplate as Cn, cancelQuoteTemplate as Sn, sendQuoteTemplateForReview as En, generateQuoteFromTemplate as Pa, acceptQuoteTemplate as kn, setQuoteTemplateExpirationDate as Fn, getQuoteTemplates as In } from "./api.js";
import "@dropins/tools/preact.js";
import { useText as Xe } from "@dropins/tools/i18n.js";
import "@dropins/tools/fetch-graphql.js";
import { S as Ba } from "./chunks/ShippingAddressDisplay.js";
import { S as bo } from "./chunks/ShippingAddressDisplay.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Rn = ({ cartId: o, slots: a, onRequestNegotiableQuote: i, onSaveNegotiableQuote: r, onAttachFiles: p, onSubmitErrors: m, onError: f, className: v, maxFiles: n, maxFileSize: t, acceptedFileTypes: c }) => {
  const [h, N] = l(void 0), [$, T] = l(void 0), [q, z] = l([]), [G, E] = l(void 0), [I, F] = l({}), [O, te] = l(void 0), [S, V] = l(!1), B = Xe({ title: "NegotiableQuote.Request.title", comment: "NegotiableQuote.Request.comment", commentError: "NegotiableQuote.Request.commentError", quoteName: "NegotiableQuote.Request.quoteName", quoteNameError: "NegotiableQuote.Request.quoteNameError", attachmentsError: "NegotiableQuote.Request.attachmentsError", maxFilesExceeded: "NegotiableQuote.Request.maxFilesExceeded", maxFileSizeExceeded: "NegotiableQuote.Request.maxFileSizeExceeded", invalidFileType: "NegotiableQuote.Request.invalidFileType", requestCta: "NegotiableQuote.Request.requestCta", saveDraftCta: "NegotiableQuote.Request.saveDraftCta", errorHeader: "NegotiableQuote.Request.error.header", unauthenticated: "NegotiableQuote.Request.error.unauthenticated", unauthorized: "NegotiableQuote.Request.error.unauthorized", missingCart: "NegotiableQuote.Request.error.missingCart", successHeader: "NegotiableQuote.Request.success.header", submitSuccess: "NegotiableQuote.Request.success.submitted", draftSuccess: "NegotiableQuote.Request.success.draftSaved" });
  oe(() => {
    const Q = ge.on("quote-management/permissions", (Y) => {
      E(void 0), Y.requestQuote ? V(!1) : (E(B.unauthorized), V(!0));
    }, { eager: !0 });
    return () => Q == null ? void 0 : Q.off();
  }, [B.unauthorized]), oe(() => {
    const Q = ge.on("authenticated", (Y) => {
      E(void 0), Y ? V(!1) : (E(B.unauthenticated), V(!0));
    }, { eager: !0 });
    return () => Q == null ? void 0 : Q.off();
  }, [B.unauthenticated]), oe(() => {
    o || (E(B.missingCart), V(!0));
  }, [o, B.missingCart]), oe(() => {
    G && (f == null || f({ error: G, isFormDisabled: S, setIsFormDisabled: V }));
  }, [G, f, S]);
  const de = g(async (Q) => {
    var Y;
    if (!(Q != null && Q.length)) return;
    if (n && q.length + Q.length > n) {
      F((U) => ({ ...U, attachments: B.maxFilesExceeded.replace("{maxFiles}", String(n)) }));
      return;
    }
    for (const U of Q) {
      if (t && !ra(U.size, t)) {
        F((pe) => ({ ...pe, attachments: B.maxFileSizeExceeded.replace("{maxSize}", sa(t)) }));
        return;
      }
      if (c && !ma(U.type, c)) {
        F((pe) => ({ ...pe, attachments: B.invalidFileType }));
        return;
      }
    }
    if (F((U) => {
      const { attachments: pe, ...re } = U;
      return re;
    }), p) {
      (Y = p(Q)) == null || Y.catch(() => {
        F((U) => ({ ...U, attachments: B.attachmentsError }));
      });
      return;
    }
    const ie = Q.map((U) => ({ key: `temp-${Date.now()}-${Math.random()}-${U.name}`, name: U.name, size: U.size, status: "uploading" }));
    z((U) => [...U, ...ie]);
    for (let U = 0; U < Q.length; U++) {
      const pe = Q[U], re = ie[U].key;
      try {
        const le = await ua(pe);
        z((j) => j.map((x) => x.key === re ? { ...x, key: le.key, status: "success" } : x));
      } catch (le) {
        F((j) => ({ ...j, attachments: le.message })), z((j) => j.map((x) => x.key === re ? { ...x, status: "error", error: le.message } : x));
      }
    }
  }, [p, B, n, t, c, q]), ee = g((Q) => {
    z((Y) => Y.filter((ie) => ie.key !== Q));
  }, []), ne = () => {
    let Q, Y;
    if (O ? (Y = { name: "SuccessBanner", slot: a == null ? void 0 : a.SuccessBanner, context: { message: O }, "data-testid": "form-success-banner" }, Q = { type: "success", variant: "primary", icon: e(Ne, {}), heading: B.successHeader, description: O, className: "request-negotiable-quote-form__success-banner" }) : G && (Y = { name: "ErrorBanner", slot: a == null ? void 0 : a.ErrorBanner, context: { message: G }, "data-testid": "form-error-banner" }, Q = { type: "error", variant: "primary", icon: e(Me, {}), heading: B.errorHeader, description: G, className: "request-negotiable-quote-form__error-banner" }), Y && Q) return e(b, { ...Y, children: e(K, { ...Q }) });
  }, R = (Q) => {
    F({});
    const Y = Q.target.closest("form"), ie = ga(Y);
    Object.keys(ie).length > 0 && (F(ie), m == null || m(ie));
  }, k = (Q) => {
    var Y;
    Q.preventDefault(), V(!0);
    const ie = Q.target, U = { ...ga(ie), ...I };
    if (Object.keys(U).length > 0) {
      m == null || m(U);
      return;
    }
    const pe = Q.submitter, re = Va(ie);
    N(re.comment), T(re.quoteName);
    const le = ((Y = pe == null ? void 0 : pe.dataset) == null ? void 0 : Y.draft) === "true" || !1, j = q.filter((ue) => ue.status === "success").map((ue) => ({ key: ue.key })), x = { cartId: o, quoteName: re.quoteName, comment: re.comment, attachments: j, isDraft: le };
    let A, H;
    le ? (A = r ?? Ct, H = B.draftSuccess) : (A = i ?? Ct, H = B.submitSuccess), A(x).then(() => {
      te(H);
    }).catch((ue) => {
      E(ue.message);
    });
  }, J = e(b, { name: "Title", slot: a == null ? void 0 : a.Title, context: { text: B.title }, children: e("span", { "data-testid": "form-title", children: B.title }) }), y = e(b, { name: "CommentField", slot: a == null ? void 0 : a.CommentField, context: { value: h, required: !0, errorMessage: I.comment, setFormErrors: F, isFormDisabled: S }, children: e(ia, { name: "comment", value: h, label: B.comment, required: !0, autoComplete: "off", "data-testid": "form-comment-field", errorMessage: I.comment, disabled: S }) }), L = e(b, { name: "QuoteNameField", slot: a == null ? void 0 : a.QuoteNameField, context: { value: $, required: !0, errorMessage: I.quoteName, setFormErrors: F, isFormDisabled: S }, children: e(Ja, { error: I.quoteName, disabled: S, children: e(Ya, { value: $, name: "quoteName", floatingLabel: B.quoteName, required: !0, autoComplete: "off", "data-testid": "form-quote-name-field" }) }) }), ve = e(b, { name: "AttachFileField", slot: a == null ? void 0 : a.AttachFileField, context: { onChange: de, formErrors: I, isFormDisabled: S, attachedFiles: q }, children: e(la, { multiple: !0, onChange: (Q) => {
    const Y = Q.target, ie = Y == null ? void 0 : Y.files, U = ie ? Array.from(ie) : [];
    U.length > 0 && de(U);
  }, icon: e(da, {}), disabled: S, "data-testid": "form-attach-file-field", accept: c == null ? void 0 : c.join(",") }) }), ce = q.length > 0 ? e(b, { name: "AttachedFilesList", slot: a == null ? void 0 : a.AttachedFilesList, context: { files: q, onRemove: ee, disabled: S }, children: e(ca, { files: q, onRemove: ee, disabled: S }) }) : void 0, se = e(b, { name: "RequestButton", slot: a == null ? void 0 : a.RequestButton, context: { requestNegotiableQuote: Ct, formErrors: I, isFormDisabled: S, setIsFormDisabled: V }, children: e(Se, { type: "submit", "data-testid": "form-request-button", onClick: R, disabled: S, children: B.requestCta }) }), qe = e(b, { name: "SaveDraftButton", slot: a == null ? void 0 : a.SaveDraftButton, context: { requestNegotiableQuote: Ct, formErrors: I, isFormDisabled: S, setIsFormDisabled: V }, children: e(Se, { type: "submit", "data-draft": "true", variant: "secondary", "data-testid": "form-save-draft-button", onClick: R, disabled: S, children: B.saveDraftCta }) });
  return e(an, { title: J, banner: ne(), commentField: y, quoteNameField: L, attachFile: ve, attachedFilesList: ce, requestButton: se, saveButton: qe, onSubmit: k, className: v, disabled: S, "data-testid": "form-container" });
};
Rn.displayName = "RequestNegotiableQuoteForm";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Aa = ({ quoteData: o, ...a }) => {
  const [i, r] = l(o);
  return oe(() => {
    const p = ge.on("quote-management/quote-data", (m) => {
      r(m.quote);
    }, { eager: !0 });
    return () => p == null ? void 0 : p.off();
  }, []), i ? e("div", { ...a, children: e(Sa, { history: i.history, items: i.items, buyer: i.buyer, salesRepName: i.salesRepName }) }) : null;
};
Aa.displayName = "QuoteHistoryLog";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ln = 3e3, Oa = ({ quoteData: o, onItemCheckboxChange: a, onItemDropdownChange: i, onRemoveItemsRef: r, onRemoveModalStateChange: p, slots: m, ...f }) => {
  const [v, n] = l(o), [t, c] = l({}), [h, N] = l(null), [$, T] = l(!1), [q, z] = l(!1), [G, E] = l(""), [I, F] = l({ type: null, message: "" }), [O, te] = l(!1), [S, V] = l([]), [B, de] = l(!1), [ee, ne] = l({ type: null, message: "" }), [R, k] = l({}), [J, y] = l(!1), L = Xe({ subtotal: "NegotiableQuote.Manage.quotePricesSummary.subtotal.excludingTax", grandTotal: "NegotiableQuote.Manage.quotePricesSummary.grandTotal.includingTax", appliedTaxes: "NegotiableQuote.Manage.quotePricesSummary.appliedTaxes", modalTitle: "NegotiableQuote.Manage.updateQuantitiesModal.title", modalDescription: "NegotiableQuote.Manage.updateQuantitiesModal.description", modalCancelButton: "NegotiableQuote.Manage.updateQuantitiesModal.cancelButton", modalUpdateButton: "NegotiableQuote.Manage.updateQuantitiesModal.updateButton", successHeading: "NegotiableQuote.Manage.updateQuantitiesModal.successHeading", successMessage: "NegotiableQuote.Manage.updateQuantitiesModal.successMessage", errorHeading: "NegotiableQuote.Manage.updateQuantitiesModal.errorHeading", errorMessage: "NegotiableQuote.Manage.updateQuantitiesModal.errorMessage", removeModalTitle: "NegotiableQuote.Manage.removeItemsModal.title", removeModalDescription: "NegotiableQuote.Manage.removeItemsModal.description", removeModalCancelButton: "NegotiableQuote.Manage.removeItemsModal.cancelButton", removeModalConfirmButton: "NegotiableQuote.Manage.removeItemsModal.confirmButton", removeModalConfirmButtonRemoving: "NegotiableQuote.Manage.removeItemsModal.confirmButtonRemoving", removeSuccessHeading: "NegotiableQuote.Manage.removeItemsModal.successHeading", removeSuccessMessage: "NegotiableQuote.Manage.removeItemsModal.successMessage", removeErrorHeading: "NegotiableQuote.Manage.removeItemsModal.errorHeading", removeErrorMessage: "NegotiableQuote.Manage.removeItemsModal.errorMessage" });
  oe(() => {
    const W = ge.on("quote-management/quote-data", (D) => {
      n(D.quote), c({}), F({ type: null, message: "" }), k({});
    }, { eager: !0 });
    return () => W == null ? void 0 : W.off();
  }, []), oe(() => {
    const W = ge.on("quote-management/quantities-updated", (D) => {
      n(D.quote), c({}), F({ type: "success", message: L.successMessage }), setTimeout(() => {
        T(!1), F({ type: null, message: "" });
      }, 3e3);
    });
    return () => W == null ? void 0 : W.off();
  }, [L.successMessage]), oe(() => {
    const W = ge.on("quote-management/quote-items-removed", (D) => {
      n(D.quote), V([]), de(!1), ne({ type: "success", message: L.removeSuccessMessage }), setTimeout(() => {
        te(!1), ne({ type: null, message: "" }), p == null || p(!1);
      }, Ln);
    });
    return () => W == null ? void 0 : W.off();
  }, [L.removeSuccessMessage, p]);
  const ve = g((W) => {
    !W || W.length === 0 || (V(W), ne({ type: null, message: "" }), te(!0));
  }, []);
  oe(() => {
    r == null || r(ve);
  }, [ve, r]);
  const ce = () => {
    ne({ type: null, message: "" });
  }, se = (W, D) => {
    const Z = W;
    if (D === "edit") {
      N(Z), z(!0), k((_) => ({ ..._, [Z.uid]: "" }));
      return;
    }
    if (D === "remove") {
      k((_) => ({ ..._, [Z.uid]: D })), ve([Z]), i == null || i(Z, D), k((_) => ({ ..._, [Z.uid]: "" }));
      return;
    }
    D && (i == null || i(Z, D)), k((_) => {
      if (!(Z.uid in _)) return _;
      const _e = { ..._ };
      return delete _e[Z.uid], _e;
    });
  }, qe = async () => {
    if (!v || S.length === 0) return;
    const W = S.map((D) => D.uid);
    de(!0), ne({ type: null, message: "" });
    try {
      await bn({ quoteUid: v.uid, quoteItemUids: W });
    } catch (D) {
      const Z = D instanceof Error ? D.message : L.removeErrorMessage;
      if (ne({ type: "error", message: Z }), S.length === 1) {
        const _ = S[0];
        k((_e) => {
          if (!(_.uid in _e)) return _e;
          const Fe = { ..._e };
          return delete Fe[_.uid], Fe;
        });
      }
      de(!1);
    }
  }, Q = () => {
    if (te(!1), ne({ type: null, message: "" }), p == null || p(!1), S.length === 1) {
      const W = S[0];
      k((D) => {
        if (!(W.uid in D)) return D;
        const Z = { ...D };
        return delete Z[W.uid], Z;
      });
    }
    V([]);
  }, Y = g(() => {
    h && k((W) => {
      const D = { ...W };
      return delete D[h.uid], D;
    }), z(!1), N(null), y(!1), E("");
  }, [h]), ie = g(async (W, D) => {
    if (!(!h || !v)) {
      y(!0);
      try {
        D !== h.quantity && await fa({ quoteUid: v.uid, items: [{ quoteItemUid: h.uid, quantity: D }] }), await vn({ quoteUid: v.uid, itemUid: h.uid, note: W, quantity: D }), Y();
      } catch (Z) {
        console.error("Failed to set line item note:", Z);
        const _ = Z instanceof Error ? Z.message : "Unable to update the item. Please try again.";
        E(_), y(!1);
      }
    }
  }, [h, v, Y]);
  if (!v) return e(Et, { loading: !0 });
  const U = !!v.canUpdateQuote, pe = (W, D) => {
    c((Z) => ({ ...Z, [W.uid]: D }));
  }, re = (W) => {
    W.preventDefault(), F({ type: null, message: "" }), T(!0);
  }, le = async () => {
    if (!v) return;
    if (Object.keys(t).length === 0) {
      T(!1);
      return;
    }
    F({ type: null, message: "" });
    const W = Object.entries(t).map(([D, Z]) => ({ quoteItemUid: D, quantity: Z }));
    try {
      await fa({ quoteUid: v.uid, items: W });
    } catch (D) {
      const Z = D instanceof Error ? D.message : L.errorMessage;
      F({ type: "error", message: Z }), console.error("Failed to update quantities:", D);
    }
  }, j = () => {
    T(!1), F({ type: null, message: "" });
  }, x = () => {
    F({ type: null, message: "" });
  }, A = [];
  v.prices.subtotalExcludingTax && A.push({ label: L.subtotal, id: "subtotal", value: e(be, { amount: v.prices.subtotalExcludingTax.value, currency: v.prices.subtotalExcludingTax.currency, weight: "normal" }) }), v.prices.grandTotal && A.push({ label: L.grandTotal, id: "total", value: e(be, { amount: v.prices.grandTotal.value, currency: v.prices.grandTotal.currency }), strong: !0 });
  const H = I.type === "success" ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: L.successHeading, description: I.message, onDismiss: x, "data-testid": "update-quantities-success-banner" }) : I.type === "error" ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: L.errorHeading, description: I.message, onDismiss: x, "data-testid": "update-quantities-error-banner" }) : null, ue = a ? (W, D) => {
    a(W, D);
  } : void 0, ke = ee.type === "success" ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: L.removeSuccessHeading, description: ee.message, onDismiss: ce, "data-testid": "remove-items-success-banner" }) : ee.type === "error" ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: L.removeErrorHeading, description: ee.message, onDismiss: ce, "data-testid": "remove-items-error-banner" }) : null, we = G ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: L.errorHeading, description: G, onDismiss: () => E(""), "data-testid": "line-item-note-error-banner" }) : null;
  return ae(We, { children: [e(Et, { "data-testid": "items-quoted-container", ...f, loading: !1, table: e(b, { name: "ProductListTable", slot: m == null ? void 0 : m.ProductListTable, context: { items: v.items, canEdit: U, readOnly: v.readOnly, onItemCheckboxChange: a, onItemDropdownChange: se, onQuantityChange: pe, onUpdate: re, dropdownSelections: R }, children: e(ka, { items: v.items, canEdit: U, onItemCheckboxChange: ue, readOnly: v.readOnly, onItemDropdownChange: se, onQuantityChange: pe, onUpdate: re, dropdownSelections: R }) }), pricesSummary: e(b, { name: "QuotePricesSummary", slot: m == null ? void 0 : m.QuotePricesSummary, context: { items: v.items, prices: v.prices }, children: e(Ea, { entries: A }) }) }), e(Ee, { open: $, title: L.modalTitle, message: L.modalDescription, cancelLabel: L.modalCancelButton, confirmLabel: L.modalUpdateButton, onCancel: j, onConfirm: le, confirmationBanner: H, "data-testid": "update-quantities-modal" }), e(Ee, { open: O, title: L.removeModalTitle, message: L.removeModalDescription, cancelLabel: L.removeModalCancelButton, confirmLabel: B ? L.removeModalConfirmButtonRemoving : L.removeModalConfirmButton, onCancel: Q, onConfirm: qe, confirmationBanner: ke, "data-testid": "remove-items-modal" }), h && e(Fa, { open: q, item: h, onClose: Y, onConfirm: ie, isSubmitting: J, errorBanner: we || void 0 })] });
};
Oa.displayName = "ItemsQuoted";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Ua = ({ quoteData: o, ...a }) => {
  var i;
  const [r, p] = l(o);
  if (oe(() => {
    const f = ge.on("quote-management/quote-data", (v) => {
      p(v.quote);
    }, { eager: !0 });
    return () => f == null ? void 0 : f.off();
  }, []), !r) return null;
  const m = (i = r == null ? void 0 : r.comments) == null ? void 0 : i.map((f) => ({ uid: f.uid, createdAt: e("span", { children: Ae(f.createdAt, "long") }), author: ae("span", { children: [f.author.firstname, " ", f.author.lastname] }), text: e("p", { children: f.text }), attachments: f.attachments }));
  return e(Ia, { "data-testid": "quote-comments-list-container", ...a, comments: m || [] });
};
Ua.displayName = "QuoteCommentsList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Hn = ({ onActionsDropdownChange: o, slots: a, onActionsButtonClick: i, onSendForReview: r, maxFiles: p, maxFileSize: m, acceptedFileTypes: f, onDuplicateQuote: v, ...n }) => {
  const [t, c] = l(void 0), [h, N] = l(!0), [$, T] = l(!1), [q, z] = l(null), [G, E] = l(!1), [I, F] = l(!1), [O, te] = l(null), [S, V] = l(!1), [B, de] = l(!1), [ee, ne] = l(""), [R, k] = l(!1), [J, y] = l(!1), [L, ve] = l(!1), [ce, se] = l(""), [qe, Q] = l(""), [Y, ie] = l(!1), [U, pe] = l(!1), [re, le] = l(""), [j, x] = l(""), [A, H] = l(!1), [ue, ke] = l(""), [we, W] = l(""), [D, Z] = l(""), [_, _e] = l(""), [Fe, ye] = l(""), [s, De] = l([]), [xe, Ce] = l(void 0), [ze, Oe] = l(/* @__PURE__ */ new Set()), he = St(ze), Ie = St(null), [Ue, nt] = l(""), Ke = St(Ue), [pt, ot] = l(!1);
  oe(() => {
    he.current = ze;
  }, [ze]), oe(() => {
    Ke.current = Ue;
  }, [Ue]);
  const u = Xe({ createdLabel: "NegotiableQuote.Manage.createdLabel", salesRepLabel: "NegotiableQuote.Manage.salesRepLabel", expiresLabel: "NegotiableQuote.Manage.expiresLabel", actionsLabel: "NegotiableQuote.Manage.actionsLabel", remove: "NegotiableQuote.Manage.actions.remove", close: "NegotiableQuote.Manage.actionButtons.close", delete: "NegotiableQuote.Manage.actionButtons.delete", print: "NegotiableQuote.Manage.actionButtons.print", createTemplate: "NegotiableQuote.Manage.actionButtons.createTemplate", createCopy: "NegotiableQuote.Manage.actionButtons.createCopy", shippingInformationTitle: "NegotiableQuote.Manage.shippingInformation.title", quoteCommentsTitle: "NegotiableQuote.Manage.quoteComments.title", quoteCommentsPlaceholder: "NegotiableQuote.Manage.quoteComments.placeholder", sendForReview: "NegotiableQuote.Manage.actionButtons.sendForReview", bannerTitle: "NegotiableQuote.Manage.bannerTitle", statusSubmitted: "NegotiableQuote.Manage.bannerStatusMessages.submitted", statusPending: "NegotiableQuote.Manage.bannerStatusMessages.pending", statusExpired: "NegotiableQuote.Manage.bannerStatusMessages.expired", errorFallback: "NegotiableQuote.Manage.confirmationModal.delete.errorFallback", closeSuccessMessage: "NegotiableQuote.Manage.confirmationModal.close.successDescription", closeModalTitle: "NegotiableQuote.Manage.actionButtons.close", closeModalMessage: "NegotiableQuote.Manage.confirmationModal.close.message", closeModalCancel: "NegotiableQuote.Manage.confirmationModal.cancel", closeModalConfirm: "NegotiableQuote.Manage.confirmationModal.close.confirm", closeModalConfirmLoading: "NegotiableQuote.Manage.confirmationModal.close.confirmLoading", closeModalSuccessHeading: "NegotiableQuote.Manage.confirmationModal.close.successHeading", createTemplateModalTitle: "NegotiableQuote.Manage.actionButtons.createTemplate", createTemplateModalMessage: "NegotiableQuote.Manage.confirmationModal.createTemplate.message", createTemplateModalCancel: "NegotiableQuote.Manage.confirmationModal.cancel", createTemplateModalConfirm: "NegotiableQuote.Manage.confirmationModal.createTemplate.confirm", createTemplateModalConfirmLoading: "NegotiableQuote.Manage.confirmationModal.createTemplate.confirmLoading", createTemplateModalSuccessHeading: "NegotiableQuote.Manage.confirmationModal.createTemplate.successHeading", createTemplateSuccessMessage: "NegotiableQuote.Manage.confirmationModal.createTemplate.successDescription", createTemplateModalErrorHeading: "NegotiableQuote.Manage.confirmationModal.createTemplate.errorHeading", createTemplateErrorFallback: "NegotiableQuote.Manage.confirmationModal.createTemplate.errorFallback", renameErrorHeading: "NegotiableQuote.Manage.rename.errorHeading", renameQuoteNameRequired: "NegotiableQuote.Manage.rename.quoteNameRequired", renameErrorDefault: "NegotiableQuote.Manage.rename.errorDefault", renameSuccessHeading: "NegotiableQuote.Manage.rename.successHeading", renameSuccessMessage: "NegotiableQuote.Manage.rename.successMessage", confirmationModalCancel: "NegotiableQuote.Manage.confirmationModal.cancel", confirmationModalDeleteTitle: "NegotiableQuote.Manage.confirmationModal.delete.title", confirmationModalDeleteMessage: "NegotiableQuote.Manage.confirmationModal.delete.message", confirmationModalDeleteConfirm: "NegotiableQuote.Manage.confirmationModal.delete.confirm", confirmationModalDeleteErrorHeading: "NegotiableQuote.Manage.confirmationModal.delete.errorHeading", confirmationModalDeleteErrorFallback: "NegotiableQuote.Manage.confirmationModal.delete.errorFallback", confirmationModalDeleteSuccessHeading: "NegotiableQuote.Manage.confirmationModal.delete.successHeading", confirmationModalDeleteSuccessDescription: "NegotiableQuote.Manage.confirmationModal.delete.successDescription", confirmationModalDuplicateTitle: "NegotiableQuote.Manage.confirmationModal.duplicate.title", confirmationModalDuplicateMessage: "NegotiableQuote.Manage.confirmationModal.duplicate.message", confirmationModalDuplicateConfirm: "NegotiableQuote.Manage.confirmationModal.duplicate.confirm", confirmationModalDuplicateErrorHeading: "NegotiableQuote.Manage.confirmationModal.duplicate.errorHeading", confirmationModalDuplicateErrorFallback: "NegotiableQuote.Manage.confirmationModal.duplicate.errorFallback", confirmationModalDuplicateSuccessHeading: "NegotiableQuote.Manage.confirmationModal.duplicate.successHeading", confirmationModalDuplicateSuccessDescription: "NegotiableQuote.Manage.confirmationModal.duplicate.successDescription", duplicateOutOfStockWarningHeading: "NegotiableQuote.Manage.confirmationModal.duplicate.outOfStockWarningHeading", duplicateOutOfStockWarningMessage: "NegotiableQuote.Manage.confirmationModal.duplicate.outOfStockWarningMessage", noItemsSelectedModalTitle: "NegotiableQuote.Manage.confirmationModal.noItemsSelected.title", noItemsSelectedModalMessage: "NegotiableQuote.Manage.confirmationModal.noItemsSelected.message", noItemsSelectedModalConfirm: "NegotiableQuote.Manage.confirmationModal.noItemsSelected.confirm", attachFiles: "NegotiableQuote.Manage.attachFiles", fileUploadError: "NegotiableQuote.Manage.fileUploadError", maxFilesExceeded: "NegotiableQuote.Manage.maxFilesExceeded", maxFileSizeExceeded: "NegotiableQuote.Manage.maxFileSizeExceeded", invalidFileType: "NegotiableQuote.Manage.invalidFileType" });
  oe(() => {
    const d = ge.on("quote-management/quote-data", (w) => {
      const { quote: C } = w;
      if (C) {
        c(C), N(!1);
        const fe = `duplicate-outOfStock-warning-${C.uid}`;
        sessionStorage.getItem(fe) === "true" && (de(!0), sessionStorage.removeItem(fe));
      }
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, []), oe(() => {
    const d = ge.on("quote-management/shipping-address-set", (w) => {
      const { quote: C } = w;
      C && c(C);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, []), oe(() => {
    const d = ge.on("quote-management/quote-sent-for-review", (w) => {
      const { quote: C } = w;
      c(C), ne(""), De([]), k(!1);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, []), oe(() => {
    const d = ge.on("quote-management/quote-items-removed", (w) => {
      const { quote: C, removedItemUids: fe } = w;
      C && c(C), fe && Oe((Te) => {
        const Pe = new Set(Te);
        return fe.forEach((Re) => Pe.delete(Re)), Pe;
      });
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, []);
  const ft = g((d, w) => {
    Oe((C) => {
      const fe = new Set(C);
      return w ? fe.add(d.uid) : fe.delete(d.uid), fe;
    });
  }, []), $e = g((d) => {
    const w = d.target.value, C = he.current;
    if (w === "remove") {
      if (nt(w), Ke.current = w, C.size === 0) ot(!0);
      else if (t && Ie.current) {
        const fe = t.items.filter((Te) => C.has(Te.uid));
        Ie.current(fe);
      }
    }
    o == null || o(d);
  }, [o, t]), vt = g(() => {
    ot(!1), nt(""), Ke.current = "";
  }, []);
  oe(() => {
    const d = ge.on("quote-management/negotiable-quote-closed", async (w) => {
      ve(!1), Q(""), se(u.closeSuccessMessage), c((C) => {
        var fe;
        return C != null && C.uid && (fe = w.closedQuoteUids) != null && fe.includes(C.uid) && yn(C.uid).then((Te) => {
          c(Te);
        }).catch((Te) => {
          console.warn("Failed to refresh quote data after closure:", Te);
        }), C;
      }), setTimeout(() => {
        y(!1), se("");
      }, 2e3);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, [u.closeSuccessMessage]), oe(() => {
    const d = ge.on("quote-management/negotiable-quote-close-error", (w) => {
      console.log("Close error event received:", w), ve(!1), se("");
      const C = w.error.message || u.errorFallback;
      Q(C);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, [u.errorFallback]), oe(() => {
    const d = ge.on("quote-management/quote-renamed", (w) => {
      const { quote: C } = w;
      c(C), Z(""), _e(""), ye(u.renameSuccessMessage), setTimeout(() => {
        H(!1), ke(""), W(""), ye("");
      }, 2e3);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, [u.renameSuccessMessage]), oe(() => {
    const d = ge.on("quote-management/quote-duplicated", (w) => {
      const { quote: C } = w;
      t && v && v({ quoteData: t, newQuote: C }), V(!0), te(null), setTimeout(() => {
        F(!1), V(!1), te(null);
      }, 2e3);
    }, { eager: !0 });
    return () => d == null ? void 0 : d.off();
  }, [t, v]);
  const Ve = g(async (d) => {
    if (p && s.length + d.length > p) {
      Ce(u.maxFilesExceeded.replace("{maxFiles}", String(p)));
      return;
    }
    for (const C of d) {
      if (m && !ra(C.size, m)) {
        Ce(u.maxFileSizeExceeded.replace("{maxSize}", sa(m)));
        return;
      }
      if (f && !ma(C.type, f)) {
        Ce(u.invalidFileType);
        return;
      }
    }
    Ce(void 0);
    const w = d.map((C) => ({ key: `temp-${Date.now()}-${Math.random()}-${C.name}`, name: C.name, size: C.size, status: "uploading" }));
    De((C) => [...C, ...w]);
    for (let C = 0; C < d.length; C++) {
      const fe = d[C], Te = w[C].key;
      try {
        const Pe = await ua(fe);
        De((Re) => Re.map((Le) => Le.key === Te ? { ...Le, key: Pe.key, status: "success" } : Le));
      } catch (Pe) {
        De((Re) => Re.map((Le) => Le.key === Te ? { ...Le, status: "error", error: Pe.message } : Le));
      }
    }
  }, [p, m, f, s, u]), et = g((d) => {
    De((w) => w.filter((C) => C.key !== d));
  }, []), bt = g(() => {
    ke((t == null ? void 0 : t.name) || ""), W(""), Z(""), _e(""), ye(""), H(!0);
  }, [t]), kt = g(() => {
    H(!1), ke(""), W(""), Z(""), _e(""), ye("");
  }, []), Ft = g((d) => {
    ke(d), d.trim() && _e("");
  }, []), it = g(() => {
    F(!0), te(null), V(!1);
  }, []), yt = g(async () => {
    if (!ue.trim()) {
      _e(u.renameQuoteNameRequired);
      return;
    }
    try {
      Z(""), _e(""), await hn({ quoteUid: t.uid, quoteName: ue, quoteComment: we.trim() || void 0 });
    } catch (d) {
      Z(d.message || u.renameErrorDefault);
    }
  }, [t, ue, we, u.renameQuoteNameRequired, u.renameErrorDefault]), Ge = X(() => {
    const d = t && (t.lockedForEditing === !0 || t.lockedForEditing === void 0 && (t.status === "SUBMITTED" || t.status === "PENDING" || t.status === "ORDERED" || t.status === "CLOSED"));
    return e(b, { name: "QuoteName", slot: a == null ? void 0 : a.QuoteName, context: { quoteName: t == null ? void 0 : t.name, quoteData: t }, children: ae("div", { className: "quote-management-manage-negotiable-quote__quote-name-wrapper", children: [e("h1", { "data-testid": "quote-name", className: "quote-management-manage-negotiable-quote__quote-name-title", children: t == null ? void 0 : t.name }), e("button", { onClick: bt, disabled: d, "data-testid": "rename-quote-button", className: "quote-management-manage-negotiable-quote__rename-button", "aria-label": "Rename quote", children: e(na, {}) })] }) });
  }, [a == null ? void 0 : a.QuoteName, t, bt]), lt = X(() => e(b, { name: "QuoteStatus", slot: a == null ? void 0 : a.QuoteStatus, context: { quoteStatus: t == null ? void 0 : t.status, quoteData: t }, children: e("div", { "data-testid": "quote-status", children: t == null ? void 0 : t.status }) }), [a == null ? void 0 : a.QuoteStatus, t]), tt = g((d) => {
    switch (d) {
      case "SUBMITTED":
        return u.statusSubmitted;
      case "PENDING":
        return u.statusPending;
      case "EXPIRED":
        return u.statusExpired;
      default:
        return null;
    }
  }, [u])(t == null ? void 0 : t.status), ht = tt && e(K, { type: "warning", variant: "secondary", icon: e(Me, {}), heading: u.bannerTitle, description: tt }), qt = ht && e(b, { name: "Banner", "data-testid": "banner", slot: a == null ? void 0 : a.Banner, context: { quoteData: t }, children: ht }), It = g(() => {
    de(!1);
  }, []), _t = B && e(b, { name: "DuplicateQuoteWarningBanner", "data-testid": "duplicate-outOfStock-warning-banner", slot: a == null ? void 0 : a.DuplicateQuoteWarningBanner, context: { outOfStockWarning: B }, children: e(K, { type: "warning", variant: "primary", icon: e(Me, {}), heading: u.duplicateOutOfStockWarningHeading, description: u.duplicateOutOfStockWarningMessage, onDismiss: It, "data-testid": "duplicate-outOfStock-warning-alert" }) }), Rt = X(() => {
    if (!t) return;
    const d = t.expirationDate ? Ae(t.expirationDate, "short") : void 0;
    return ae(b, { name: "Details", slot: a == null ? void 0 : a.Details, context: { quoteData: t }, children: [ae("div", { className: "quote-management-manage-negotiable-quote__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote__detail-title", "data-testid": "created-label", children: u.createdLabel }), ae("span", { className: "quote-management-manage-negotiable-quote__detail-content", "data-testid": "created-value", children: [Ae(t.createdAt, "short"), " (", t.buyer.firstname, " ", t.buyer.lastname, ")"] })] }), ae("div", { className: "quote-management-manage-negotiable-quote__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote__detail-title", "data-testid": "sales-rep-label", children: u.salesRepLabel }), e("span", { className: "quote-management-manage-negotiable-quote__detail-content", "data-testid": "sales-rep-value", children: t.salesRepName })] }), ae("div", { className: "quote-management-manage-negotiable-quote__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote__detail-title", "data-testid": "expires-label", children: u.expiresLabel }), e("span", { className: "quote-management-manage-negotiable-quote__detail-content", "data-testid": "expires-value", children: d })] })] });
  }, [a == null ? void 0 : a.Details, u, t]), xt = X(() => [{ label: u.close, value: "close", disabled: !(t != null && t.canClose) }, { label: u.delete, value: "delete", disabled: !(t != null && t.canDelete) }, { label: u.print, value: "print" }, { label: u.createTemplate, value: "createTemplate", disabled: !!(t != null && t.templateName) }, { label: u.createCopy, value: "createCopy", disabled: !!(t != null && t.templateName) }], [u, t == null ? void 0 : t.canDelete, t == null ? void 0 : t.canClose, t == null ? void 0 : t.templateName]), Lt = X(() => {
    const d = (w) => {
      switch (w) {
        case "close":
          y(!0), Q(""), se(""), i == null || i(w);
          break;
        case "delete":
          T(!0), i == null || i(w);
          break;
        case "print":
          i == null || i(w);
          break;
        case "createTemplate":
          ie(!0), x(""), le(""), i == null || i(w);
          break;
        case "createCopy":
          it(), i == null || i(w);
          break;
      }
    };
    return e(b, { name: "ActionBar", slot: a == null ? void 0 : a.ActionBar, context: { quoteData: t, actionsBarDropdownValue: Ue }, children: e(Ra, { dropdownPlaceholder: u.actionsLabel, dropdownOptions: [{ label: u.remove, value: "remove" }], dropdownValue: Ue, handleDropdownChange: $e, buttons: xt.map((w) => e(Se, { variant: "tertiary", onClick: () => d(w.value), "data-testid": `actions-bar-${w.value}-button`, "data-action": w.value, disabled: w.disabled, children: w.label }, w.value)) }) });
  }, [xt, u, a == null ? void 0 : a.ActionBar, t, $e, i, it, Ue]), Ht = X(() => e(b, { name: "QuoteContent", slot: a == null ? void 0 : a.QuoteContent, context: { quoteData: t }, children: e(La, { tabs: /* @__PURE__ */ new Map([["items-quoted", "Items Quoted"], ["comments", "Comments"], ["history-log", "History Log"]]), tabsContent: /* @__PURE__ */ new Map([["items-quoted", e(b, { name: "ItemsQuotedTab", slot: a == null ? void 0 : a.ItemsQuotedTab, context: { quoteData: t }, children: e(Oa, { quoteData: t, onItemCheckboxChange: ft, onRemoveItemsRef: (d) => {
    Ie.current = d;
  }, onRemoveModalStateChange: (d) => {
    !d && Ke.current === "remove" && nt("");
  } }) }, "items-quoted")], ["comments", e(b, { name: "CommentsTab", slot: a == null ? void 0 : a.CommentsTab, context: { quoteData: t }, children: e(Ua, { quoteData: t }) }, "comments")], ["history-log", e(b, { name: "HistoryLogTab", slot: a == null ? void 0 : a.HistoryLogTab, context: { quoteData: t }, children: e(Aa, { quoteData: t }) }, "history-log")]]) }) }), [a == null ? void 0 : a.QuoteContent, a == null ? void 0 : a.HistoryLogTab, a == null ? void 0 : a.CommentsTab, a == null ? void 0 : a.ItemsQuotedTab, t, ft]), rt = X(() => e(b, { name: "ShippingInformationTitle", slot: a == null ? void 0 : a.ShippingInformationTitle, context: { quoteData: t }, children: e("h2", { children: u.shippingInformationTitle }) }), [a == null ? void 0 : a.ShippingInformationTitle, t, u]), st = X(() => {
    var d;
    return e(b, { name: "ShippingInformation", slot: a == null ? void 0 : a.ShippingInformation, context: { quoteData: t, loading: h, setLoading: N }, children: e(Ba, { shippingAddress: (d = t == null ? void 0 : t.shippingAddresses) == null ? void 0 : d[0], loading: h, "data-testid": "manage-quote-shipping-address" }) });
  }, [a == null ? void 0 : a.ShippingInformation, t, h, N]), mt = X(() => e(b, { name: "QuoteCommentsTitle", slot: a == null ? void 0 : a.QuoteCommentsTitle, context: { quoteData: t }, children: e("h2", { children: u.quoteCommentsTitle }) }), [a == null ? void 0 : a.QuoteCommentsTitle, u, t]), dt = X(() => e(b, { name: "QuoteComments", slot: a == null ? void 0 : a.QuoteComments, context: { quoteData: t }, children: e(ia, { name: "quoteComments", placeholder: u.quoteCommentsPlaceholder, rows: 3, value: ee, onInput: (d) => {
    ne(d.target.value);
  }, disabled: !(t != null && t.canSendForReview) || R }) }), [a == null ? void 0 : a.QuoteComments, u, t, ee, R]), Mt = X(() => !(t != null && t.canSendForReview), [t]), zt = X(() => {
    const d = R || Mt;
    return e(b, { name: "AttachFilesField", slot: a == null ? void 0 : a.AttachFilesField, context: { onFileChange: Ve, attachedFiles: s, fileUploadError: xe, disabled: d }, children: ae("div", { className: "quote-management-manage-negotiable-quote__attach-files", ...d ? { "data-disabled": !0 } : {}, "aria-disabled": d, children: [e(la, { id: "manage-quote-attach-files", multiple: !0, onChange: (w) => {
      const C = w.target, fe = C == null ? void 0 : C.files, Te = fe ? Array.from(fe) : [];
      Te.length > 0 && Ve(Te);
    }, icon: e(da, {}), disabled: d, "data-testid": "manage-quote-attach-files", accept: f == null ? void 0 : f.join(","), children: u.attachFiles }), xe && e("div", { className: "quote-management-manage-negotiable-quote__file-error", "data-testid": "file-upload-error", children: xe })] }) });
  }, [a == null ? void 0 : a.AttachFilesField, Ve, R, Mt, f, xe, u, s]), Pt = X(() => {
    if (s.length) return e(b, { name: "AttachedFilesList", slot: a == null ? void 0 : a.AttachedFilesList, context: { files: s, onRemove: et, disabled: R }, children: e(ca, { files: s, onRemove: et, disabled: R }) });
  }, [s, et, R, a == null ? void 0 : a.AttachedFilesList]), Bt = g(async () => {
    if (t != null && t.uid) {
      ve(!0), Q(""), se("");
      try {
        await qn({ quoteUids: [t.uid] });
      } catch (d) {
        console.error("Failed to close quote:", d);
      }
    }
  }, [t]), At = g(() => {
    y(!1), Q(""), se("");
  }, []), Ot = g(async () => {
    if (t != null && t.uid) {
      pe(!0), x(""), le("");
      try {
        await _n(t.uid), le(u.createTemplateSuccessMessage), setTimeout(() => {
          ie(!1), le("");
        }, 2e3);
      } catch (d) {
        console.error("Failed to create quote template:", d);
        const w = d instanceof Error ? d.message : u.createTemplateErrorFallback;
        x(w);
      } finally {
        pe(!1);
      }
    }
  }, [t, u.createTemplateSuccessMessage, u.createTemplateErrorFallback]), Ut = g(() => {
    ie(!1), x(""), le("");
  }, []), ct = g(async () => {
    const d = s.filter((w) => w.status === "success");
    if (r) {
      r({ quoteData: t, comment: ee.trim() || void 0, attachments: d.length ? d : void 0 });
      return;
    }
    k(!0);
    try {
      await xn({ quoteUid: t.uid, comment: ee.trim() || void 0, attachments: d.length ? d.map((w) => ({ key: w.key })) : void 0 });
    } catch (w) {
      console.error("Failed to send quote for review:", w), k(!1);
    }
  }, [t, r, ee, s]), jt = X(() => e(b, { name: "Footer", slot: a == null ? void 0 : a.Footer, context: { quoteData: t, comment: ee, isSubmitting: R, attachments: s, handleSendForReview: ct }, children: e(Se, { variant: "primary", onClick: ct, "data-testid": "send-for-review-button", disabled: !(t != null && t.canSendForReview) || R, children: u.sendForReview }) }), [a == null ? void 0 : a.Footer, u, t, ee, R, s, ct]), Tt = X(() => D ? e(K, { type: "error", variant: "primary", icon: e(Me, { color: "var(--color-error)" }), heading: u.renameErrorHeading, description: D }) : void 0, [D, u.renameErrorHeading]), Wt = X(() => Fe ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: u.renameSuccessHeading, description: Fe }) : void 0, [Fe, u.renameSuccessHeading]), je = g((d) => d.errors && Array.isArray(d.errors) && d.errors.length > 0 ? d.errors[0].message || u.confirmationModalDeleteErrorFallback : (d == null ? void 0 : d.message) || u.confirmationModalDeleteErrorFallback, [u.confirmationModalDeleteErrorFallback]), Xt = g(() => {
    T(!1), z(null), E(!1);
  }, []), Vt = g(async () => {
    if (t != null && t.uid) {
      z(null), E(!1);
      try {
        const { operationResults: d } = await Mn(t.uid), w = d.find((C) => C.__typename === "DeleteNegotiableQuoteOperationFailure");
        if (w) {
          const C = je(w);
          z(C);
          return;
        }
        E(!0);
      } catch (d) {
        const w = je(d);
        z(w);
      }
    }
  }, [t, je]), Gt = g(() => {
    z(null);
  }, []), Jt = g(() => {
    E(!1);
  }, []), Qt = g((d) => (d == null ? void 0 : d.message) || u.confirmationModalDuplicateErrorFallback, [u.confirmationModalDuplicateErrorFallback]), Yt = g(() => {
    F(!1), te(null), V(!1);
  }, []), Nt = g(async () => {
    var d;
    if (t != null && t.uid) {
      te(null), V(!1);
      try {
        const w = ((d = t.items) == null ? void 0 : d.filter((Te) => Te.outOfStock)) || [], C = ((Te) => {
          const Pe = Te.slice(0, -8), Re = crypto.randomUUID().slice(0, 8);
          return Pe + Re;
        })(t.uid), fe = w.length > 0;
        fe && sessionStorage.setItem(`duplicate-outOfStock-warning-${C}`, "true"), await Tn({ quoteUid: t.uid, duplicatedQuoteUid: C, hasOutOfStockItems: fe });
      } catch (w) {
        const C = Qt(w);
        te(C);
      }
    }
  }, [t, Qt]), Zt = g(() => {
    te(null);
  }, []), Kt = g(() => {
    V(!1);
  }, []), wt = q ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: u.confirmationModalDeleteErrorHeading, description: q, onDismiss: Gt, "data-testid": "confirmation-modal-error-banner" }) : null, ut = (G ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: u.confirmationModalDeleteSuccessHeading, description: u.confirmationModalDeleteSuccessDescription, onDismiss: Jt, "data-testid": "confirmation-modal-success-banner" }) : null) || wt, $t = O ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: u.confirmationModalDuplicateErrorHeading, description: O, onDismiss: Zt, "data-testid": "confirmation-modal-duplicate-error-banner" }) : null, Dt = (S ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: u.confirmationModalDuplicateSuccessHeading, description: u.confirmationModalDuplicateSuccessDescription, onDismiss: Kt, "data-testid": "confirmation-modal-duplicate-success-banner" }) : null) || $t, ea = { ...n, loading: h, quoteName: Ge, quoteStatus: lt, banner: _t || qt ? ae(We, { children: [_t, qt] }) : void 0, details: Rt, actionBar: Lt, quoteContent: Ht, shippingInformationTitle: rt, shippingInformation: st, quoteCommentsTitle: mt, quoteComments: dt, attachFilesField: zt, attachedFilesList: Pt, footer: jt };
  let at = null;
  ce ? at = e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: u.closeModalSuccessHeading, description: ce, "data-testid": "close-quote-success-banner" }) : qe && (at = e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: u.confirmationModalDeleteErrorHeading, description: qe, "data-testid": "close-quote-error-banner" }));
  let gt = null;
  return re ? gt = e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: u.createTemplateModalSuccessHeading, description: re, "data-testid": "create-template-success-banner" }) : j && (gt = e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: u.createTemplateModalErrorHeading, description: j, "data-testid": "create-template-error-banner" })), ae(We, { children: [e(nn, { ...ea }), A && Qe(e(Ha, { open: A, quoteName: ue, renameReason: we, quoteNameError: _, errorBanner: Tt, successBanner: Wt, onQuoteNameChange: Ft, onRenameReasonChange: W, onSave: yt, onClose: kt }), document.body), $ && Qe(e(Ee, { open: $, title: u.confirmationModalDeleteTitle, message: u.confirmationModalDeleteMessage, cancelLabel: u.confirmationModalCancel, confirmLabel: u.confirmationModalDeleteConfirm, onCancel: Xt, onConfirm: Vt, showCloseButton: !ut, confirmationBanner: ut }), document.body), I && Qe(e(Ee, { open: I, title: u.confirmationModalDuplicateTitle, message: u.confirmationModalDuplicateMessage, cancelLabel: u.confirmationModalCancel, confirmLabel: u.confirmationModalDuplicateConfirm, onCancel: Yt, onConfirm: Nt, showCloseButton: !Dt, confirmationBanner: Dt }), document.body), J && Qe(e(Ee, { open: J, title: u.closeModalTitle, message: u.closeModalMessage, cancelLabel: u.closeModalCancel, confirmLabel: L ? u.closeModalConfirmLoading : u.closeModalConfirm, onCancel: At, onConfirm: L ? void 0 : Bt, showCloseButton: !0, confirmationBanner: at, "data-testid": "close-quote-confirmation-modal" }), document.body), Y && Qe(e(Ee, { open: Y, title: u.createTemplateModalTitle, message: u.createTemplateModalMessage, cancelLabel: u.createTemplateModalCancel, confirmLabel: U ? u.createTemplateModalConfirmLoading : u.createTemplateModalConfirm, onCancel: Ut, onConfirm: U ? void 0 : Ot, showCloseButton: !0, confirmationBanner: gt, "data-testid": "create-template-confirmation-modal" }), document.body), pt && Qe(e(Ee, { open: pt, title: u.noItemsSelectedModalTitle, message: u.noItemsSelectedModalMessage, confirmLabel: u.noItemsSelectedModalConfirm, onConfirm: vt, onClose: vt, showCloseButton: !0, "data-testid": "no-items-selected-modal" }), document.body)] });
};
Hn.displayName = "ManageNegotiableQuote";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const zn = ({ children: o, initialData: a = null, showTotalSaved: i, updateLineItems: r = (m) => m, ...p }) => {
  var m, f, v, n, t, c, h, N, $, T, q, z, G, E, I, F, O, te, S, V, B, de, ee, ne, R, k, J, y, L, ve, ce, se, qe, Q, Y, ie, U, pe, re, le, j, x, A, H, ue, ke, we, W, D, Z;
  const [_, _e] = l(a), Fe = _ == null ? void 0 : _.isVirtual, { quoteDisplaySettings: ye } = za.config, s = !!(ye != null && ye.zeroTax), De = (ye == null ? void 0 : ye.subtotal) === Be.TAX_INCLUDED, xe = (ye == null ? void 0 : ye.subtotal) === Be.TAX_INCLUDED_AND_EXCLUDED, Ce = (ye == null ? void 0 : ye.shipping) === Be.TAX_INCLUDED, ze = (ye == null ? void 0 : ye.shipping) === Be.TAX_INCLUDED_AND_EXCLUDED;
  oe(() => {
    const he = ge.on("quote-management/quote-data", (Ie) => {
      _e(Ie.quote);
    }, { eager: !0 });
    return () => {
      he == null || he.off();
    };
  }, []);
  const Oe = Xe({ free: "NegotiableQuote.PriceSummary.total.free", orderSummary: "NegotiableQuote.PriceSummary.orderSummary", taxToBeDetermined: "NegotiableQuote.PriceSummary.taxToBeDetermined" });
  return Object.keys(_ ?? {}).length ? e(on, { ...p, "data-testid": "quote-order-summary", heading: e("div", { children: Oe.orderSummary }), updateLineItems: r, subTotal: { taxIncluded: De && !s, taxExcluded: xe, priceExcludingTax: e(be, { "data-testid": "subtotal", amount: (f = (m = _ == null ? void 0 : _.prices) == null ? void 0 : m.subtotalExcludingTax) == null ? void 0 : f.value, currency: (n = (v = _ == null ? void 0 : _.prices) == null ? void 0 : v.subtotalExcludingTax) == null ? void 0 : n.currency }), price: !s && De || !s && xe ? e(be, { "data-testid": "subtotal", amount: (c = (t = _ == null ? void 0 : _.prices) == null ? void 0 : t.subtotalIncludingTax) == null ? void 0 : c.value, currency: (N = (h = _ == null ? void 0 : _.prices) == null ? void 0 : h.subtotalIncludingTax) == null ? void 0 : N.currency }) : e(be, { "data-testid": "subtotal", amount: (T = ($ = _ == null ? void 0 : _.prices) == null ? void 0 : $.subtotalExcludingTax) == null ? void 0 : T.value, currency: (z = (q = _ == null ? void 0 : _.prices) == null ? void 0 : q.subtotalExcludingTax) == null ? void 0 : z.currency }) }, shipping: { taxIncluded: Ce && !s, taxExcluded: ze, priceExcludingTax: e(be, { "data-testid": "shipping", amount: (E = (G = _ == null ? void 0 : _.prices) == null ? void 0 : G.shippingExcludingTax) == null ? void 0 : E.value, currency: (F = (I = _ == null ? void 0 : _.prices) == null ? void 0 : I.shippingExcludingTax) == null ? void 0 : F.currency }), price: !s && Ce || !s && ze ? e(be, { "data-testid": "shipping", amount: (te = (O = _ == null ? void 0 : _.prices) == null ? void 0 : O.shippingIncludingTax) == null ? void 0 : te.value, currency: (V = (S = _ == null ? void 0 : _.prices) == null ? void 0 : S.shippingIncludingTax) == null ? void 0 : V.currency }) : e(be, { "data-testid": "shipping", amount: (de = (B = _ == null ? void 0 : _.prices) == null ? void 0 : B.shippingExcludingTax) == null ? void 0 : de.value, currency: (ne = (ee = _ == null ? void 0 : _.prices) == null ? void 0 : ee.shippingExcludingTax) == null ? void 0 : ne.currency }) }, discounts: (k = (R = _ == null ? void 0 : _.prices) == null ? void 0 : R.appliedDiscounts) == null ? void 0 : k.map((he) => {
    var Ie;
    return { label: he.label, price: e(be, { "data-testid": "summary-discount-total", amount: -he.amount.value, currency: he.amount.currency, sale: !0 }), coupon: he != null && he.coupon ? ae("span", { children: [e(Ze, { source: ln, size: "16" }), (Ie = he == null ? void 0 : he.coupon) == null ? void 0 : Ie.code] }) : void 0 };
  }), taxTotal: Fe && !((y = (J = _ == null ? void 0 : _.prices) == null ? void 0 : J.appliedTaxes) != null && y.length) ? { price: e("span", { "data-testid": "tax-total-tbd", children: Oe.taxToBeDetermined }) } : { price: e(be, { "data-testid": "tax-total-actual", amount: (ve = (L = _ == null ? void 0 : _.prices) == null ? void 0 : L.totalTax) == null ? void 0 : ve.value, currency: (se = (ce = _ == null ? void 0 : _.prices) == null ? void 0 : ce.totalTax) == null ? void 0 : se.currency }) }, taxesApplied: Fe ? void 0 : ye != null && ye.fullSummary ? (Q = (qe = _ == null ? void 0 : _.prices) == null ? void 0 : qe.appliedTaxes) == null ? void 0 : Q.map((he) => ({ label: he.label, price: e(be, { "data-testid": "applied-taxes", amount: he.amount.value, currency: he.amount.currency }) })) : void 0, total: { price: ((ie = (Y = _ == null ? void 0 : _.prices) == null ? void 0 : Y.grandTotal) == null ? void 0 : ie.value) === 0 ? e("span", { "data-testid": "total-including-tax", children: Oe.free }) : e(be, { "data-testid": "total-including-tax-actual", amount: (pe = (U = _ == null ? void 0 : _.prices) == null ? void 0 : U.grandTotal) == null ? void 0 : pe.value, currency: (le = (re = _ == null ? void 0 : _.prices) == null ? void 0 : re.grandTotal) == null ? void 0 : le.currency }), priceWithoutTax: ye != null && ye.grandTotal ? ((x = (j = _ == null ? void 0 : _.prices) == null ? void 0 : j.grandTotalExcludingTax) == null ? void 0 : x.value) === 0 ? e("span", { "data-testid": "total-excluding-tax", children: Oe.free }) : e(be, { "data-testid": "total-excluding-tax", amount: (H = (A = _ == null ? void 0 : _.prices) == null ? void 0 : A.grandTotalExcludingTax) == null ? void 0 : H.value, currency: (ke = (ue = _ == null ? void 0 : _.prices) == null ? void 0 : ue.grandTotalExcludingTax) == null ? void 0 : ke.currency }) : void 0 }, totalSaved: i ? e(be, { amount: (W = (we = _ == null ? void 0 : _.prices) == null ? void 0 : we.discount) == null ? void 0 : W.value, currency: (Z = (D = _ == null ? void 0 : _.prices) == null ? void 0 : D.grandTotal) == null ? void 0 : Z.currency }) : void 0 }) : null;
};
zn.displayName = "OrderSummary";
/*! Copyright 2026 Adobe
All Rights Reserved. */
rn.displayName = "OrderSummaryLine";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Pn = () => {
  const [o, a] = l(void 0), [i, r] = l(!0);
  return oe(() => {
    const p = ge.on("quote-management/quote-data", (m) => {
      const { quote: f } = m;
      f && (a(f), r(!1));
    }, { eager: !0 });
    return () => p == null ? void 0 : p.off();
  }, []), { quoteData: o, loading: i };
}, ya = (o, a) => {
  var i;
  return ((i = a.quoteDisplaySettings) == null ? void 0 : i.price) === Be.TAX_INCLUDED ? o.discounted ? { amount: o.prices.regularPrice.value, currency: o.prices.regularPrice.currency, style: { font: "inherit" }, "data-testid": "including-tax-item-price" } : { amount: o.prices.priceIncludingTax.value, currency: o.prices.priceIncludingTax.currency, style: { font: "inherit" }, "data-testid": "including-tax-item-price" } : { amount: o.prices.regularPrice.value, currency: o.prices.regularPrice.currency, style: { font: "inherit" }, "data-testid": "regular-item-price" };
}, ha = (o) => {
  var a, i;
  return { amount: (a = o.savingsAmount) == null ? void 0 : a.value, currency: (i = o.savingsAmount) == null ? void 0 : i.currency, style: { font: "inherit" }, "data-testid": "item-savings-amount" };
}, qa = (o, a) => {
  var i, r, p, m, f, v, n, t, c, h, N, $;
  const T = { "aria-label": a.dictionary.regularPrice }, q = o.discounted ? {} : null;
  return ((i = a.quoteDisplaySettings) == null ? void 0 : i.price) === Be.TAX_INCLUDED || ((r = a.quoteDisplaySettings) == null ? void 0 : r.price) === Be.TAX_INCLUDED_AND_EXCLUDED ? (T.amount = (p = o.prices.rowTotalIncludingTax) == null ? void 0 : p.value, T.currency = (m = o.prices.rowTotalIncludingTax) == null ? void 0 : m.currency, T.variant = o.discounted ? "strikethrough" : "default", T["data-testid"] = "including-tax-item-total", q && (T.amount = (f = o.prices.originalRowTotal) == null ? void 0 : f.value, T.currency = (v = o.prices.originalRowTotal) == null ? void 0 : v.currency, q.amount = (n = o.prices.rowTotalIncludingTax) == null ? void 0 : n.value, q.currency = (t = o.prices.rowTotalIncludingTax) == null ? void 0 : t.currency, q.sale = !0, q["aria-label"] = a.dictionary.discountedPrice, q["data-testid"] = "discount-total")) : (T.amount = (c = o.prices.originalRowTotal) == null ? void 0 : c.value, T.currency = (h = o.prices.originalRowTotal) == null ? void 0 : h.currency, T.variant = o.discounted ? "strikethrough" : "default", T["data-testid"] = "regular-item-total", q && (q.amount = (N = o.discountedTotal) == null ? void 0 : N.value, q.currency = ($ = o.discountedTotal) == null ? void 0 : $.currency, q.sale = !0, q["aria-label"] = a.dictionary.discountedPrice, q["data-testid"] = "discount-total")), { totalProps: T, discountProps: q };
}, Bn = (o) => {
  const a = o == null ? void 0 : o.map((r) => ({ label: r.label, value: r.values.map((p) => p.label).join(", ") })), i = {};
  return a == null || a.forEach((r) => {
    i[r.label] = r.value;
  }), Object.keys(i).length > 0 ? i : null;
}, An = (o) => {
  const a = o == null ? void 0 : o.map((r) => ({ label: r.optionLabel, value: r.valueLabel })), i = {};
  return a == null || a.forEach((r) => {
    i[r.label] = r.value;
  }), Object.keys(i).length > 0 ? i : null;
}, On = (o) => {
  const a = o == null ? void 0 : o.map((r) => ({ label: r.label, type: r.type, values: r.values.map((p) => ({ label: p.label, value: p.value })) })), i = {};
  return a == null || a.forEach((r) => {
    var p;
    switch (r.type) {
      case "field":
      case "area":
      case "date_time":
        i[r.label] = r.values[0].value;
        break;
      case "radio":
      case "drop_down":
        i[r.label] = r.values[0].label;
        break;
      case "multiple":
      case "checkbox":
        i[r.label] = r.values.reduce((m, f) => m ? `${m}, ${f.label}` : f.label, "");
        break;
      case "file": {
        const m = new DOMParser(), f = r.values[0].value, v = ((p = m.parseFromString(f, "text/html").querySelector("a")) == null ? void 0 : p.textContent) || "";
        i[r.label] = v;
        break;
      }
    }
  }), i;
}, Un = 4, _a = (o, a, i) => {
  var r;
  if (i.attributesToHide.includes("image")) return;
  const p = { loading: a < Un ? "eager" : "lazy", src: o.image.src, alt: o.image.alt, width: "300", height: "300", params: { width: 300 } }, m = e(tn, { "data-testid": "quote-summary-list-item-image", ...p });
  return e(b, { name: "Thumbnail", slot: (r = i.slots) == null ? void 0 : r.Thumbnail, context: { item: o, defaultImageProps: p }, children: i.routeProduct ? e("a", { href: i.routeProduct(o), children: m }) : m });
}, xa = (o, a) => {
  if (!a.attributesToHide.includes("name")) return e("span", { "data-testid": "quote-summary-list-item-title", children: a.routeProduct ? e("a", { href: a.routeProduct(o), children: o.product.name }) : o.product.name });
}, Ma = (o) => e("span", { "data-testid": "quote-summary-list-item-sku", children: o.product.sku }), Ta = (o, a) => {
  var i;
  return e(b, { name: "ProductAttributes", slot: (i = a.slots) == null ? void 0 : i.ProductAttributes, context: { item: o } });
}, Qa = (o, a) => {
  if (a.attributesToHide.includes("configurations")) return;
  const i = { ...Bn(o.bundleOptions), ...An(o.configurableOptions), ...On(o.customizableOptions), ...o.links && o.links.count ? o.links.count > 1 ? { [a.dictionary.files.replace("{count}", o.links.count.toString())]: o.links.result } : { [a.dictionary.file.replace("{count}", o.links.count.toString())]: o.links.result } : null };
  if (Object.keys(i).length !== 0) return i;
}, Na = (o, a) => {
  var i;
  return ((i = a.quoteDisplaySettings) == null ? void 0 : i.price) === Be.TAX_INCLUDED_AND_EXCLUDED ? e(be, { amount: o.prices.rowTotal.value, currency: o.prices.rowTotal.currency, "data-testid": "excluding-tax-total", "aria-label": a.dictionary.regularPrice }) : void 0;
}, jn = ({ hideHeading: o, hideFooter: a, routeProduct: i, showMaxItems: r = !0, attributesToHide: p = [], slots: m, accordion: f = !1, variant: v = "primary", showDiscount: n, showSavings: t, ...c }) => {
  const { quoteData: h, loading: N } = Pn(), [$, T] = l(r), { quoteDisplaySettings: q, quoteSummaryMaxItems: z } = za.config, G = z || 5, E = Xe({ discountedPrice: "NegotiableQuote.QuoteSummaryList.discountedPrice", discountPercentage: "NegotiableQuote.QuoteSummaryList.discountPercentage", editQuote: "NegotiableQuote.QuoteSummaryList.editQuote", file: "NegotiableQuote.QuoteSummaryList.file", files: "NegotiableQuote.QuoteSummaryList.files", heading: "NegotiableQuote.QuoteSummaryList.heading", listOfQuoteItems: "NegotiableQuote.QuoteSummaryList.listOfQuoteItems", regularPrice: "NegotiableQuote.QuoteSummaryList.regularPrice", savingsAmount: "NegotiableQuote.QuoteSummaryList.savingsAmount", viewMore: "NegotiableQuote.QuoteSummaryList.viewMore" }), I = g(() => {
    T((y) => !y);
  }, []), F = { attributesToHide: p, routeProduct: i, slots: m, dictionary: E, quoteDisplaySettings: q }, O = { dictionary: E, quoteDisplaySettings: q }, te = (y) => e(b, { name: "Footer", slot: m == null ? void 0 : m.Footer, context: { item: y } }), S = () => h != null && h.totalQuantity ? h.items.map((y, L) => {
    const { totalProps: ve, discountProps: ce } = qa(y, O), se = e(en, { loading: N, "data-testid": `quote-summary-list-item-entry-${y.uid}`, image: _a(y, L, F), title: e(b, { name: "ItemTitle", slot: m == null ? void 0 : m.ItemTitle, context: { item: y }, children: xa(y, F) }), sku: p.includes("sku") ? void 0 : e(b, { name: "ItemSku", slot: m == null ? void 0 : m.ItemSku, context: { item: y }, children: Ma(y) }), price: p.includes("price") ? void 0 : e(b, { name: "ItemPrice", slot: m == null ? void 0 : m.ItemPrice, context: { item: y }, slotTag: "span", children: e(be, { ...ya(y, O) }) }), quantity: p.includes("quantity") ? void 0 : y.quantity, total: ae(We, { children: [p.includes("total") ? void 0 : e(b, { name: "ItemTotal", slot: m == null ? void 0 : m.ItemTotal, context: { item: y }, children: e(be, { ...ve }) }), p.includes("totalDiscount") ? void 0 : ce && e(b, { name: "ItemTotal", slot: m == null ? void 0 : m.ItemTotal, context: { item: y }, children: e(be, { ...ce }) })] }), attributes: Ta(y, F), configurations: Qa(y, F), totalExcludingTax: p.includes("totalExcludingTax") ? void 0 : Na(y, F), taxIncluded: (q == null ? void 0 : q.price) === Be.TAX_INCLUDED, taxExcluded: !p.includes("totalExcludingTax") && (q == null ? void 0 : q.price) === Be.TAX_INCLUDED_AND_EXCLUDED, discount: n && y.discounted && y.discountPercentage !== void 0 ? e("div", { "data-testid": "item-discount-percentage", children: E.discountPercentage.replace("{discount}", y.discountPercentage.toString()) }) : void 0, savings: t && y.discounted && y.savingsAmount !== void 0 ? ae("div", { children: [e("span", { children: e(be, { ...ha(y) }) }), " ", E.savingsAmount] }) : void 0, footer: te(y) }, y.uid);
    return e(b, { name: "CartItem", slot: m == null ? void 0 : m.QuoteItem, context: { item: y, index: L, loading: N, attributesToHide: p, quoteDisplaySettings: q, showDiscount: n, showSavings: t, dictionary: E, getImage: _a, getTitle: xa, getSku: Ma, getPriceProps: ya, getTotalPriceProps: qa, getProductAttributes: Ta, getConfigurations: Qa, getTotalExcludingTax: Na, getFooter: te, getSavingsAmount: ha }, children: se }, y.uid);
  }) : null, V = e(b, { name: "Heading", slot: m == null ? void 0 : m.Heading, context: { count: (h == null ? void 0 : h.totalQuantity) ?? 0, quoteId: (h == null ? void 0 : h.uid) ?? "" }, children: e("div", { "data-testid": "default-quote-summary-list-heading", children: E.heading.replace("({count})", h != null && h.totalQuantity ? `(${h == null ? void 0 : h.totalQuantity.toString()})` : "") }) }), B = V.props.children.props.children, de = S(), ee = (h == null ? void 0 : h.items.length) || 0, ne = $ ? Math.min(ee, G) : ee, R = ee > ne, k = h != null && h.totalQuantity && de ? e(b, { name: "Footer", slot: m == null ? void 0 : m.QuoteSummaryFooter, context: { displayMaxItems: $ }, "data-testid": "quote-summary-list-footer-slot", className: "quote-management-quote-summary-list-footer", children: R ? e(Se, { className: "quote-management-quote-summary-list-footer__action", onClick: I, "data-testid": "view-more-items-button", variant: "tertiary", children: E.viewMore }) : null }) : null, J = h != null && h.totalQuantity ? e(Za, { "data-testid": "quote-summary-list", children: de == null ? void 0 : de.slice(0, $ ? Math.min(ee, G) : ee) }) : null;
  return f ? e(Ka, { "data-testid": "quote-summary-list-accordion", className: Ga(["quote-management-quote-summary-list-accordion", `quote-management-quote-summary-list__background--${v}`]), iconOpen: mn, iconClose: sn, children: e($a, { title: B, ariaLabelTitle: B, "data-testid": "quote-summary-list-accordion__section", open: !0, renderContentWhenClosed: !0, children: e(pa, { ...c, "aria-expanded": !0, "aria-label": E.listOfQuoteItems, className: "quote-management-quote-summary-list-accordion__list", footer: a ? void 0 : k, products: J, outOfStockMessage: void 0, loading: N, variant: v }) }) }) : e(pa, { ...c, heading: o ? void 0 : V, footer: a ? void 0 : k, products: J, outOfStockMessage: void 0, loading: N, variant: v });
};
jn.displayName = "QuoteSummaryList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Wn = ({ pageSize: o, showItemRange: a = !0, showPageSizePicker: i = !0, showPagination: r = !0, onViewQuote: p, onPageSizeChange: m, onPageChange: f, slots: v, ...n }) => {
  const [t, c] = l(null), [h, N] = l(!0), $ = oa()[0], [T, q] = l(o || $), [z, G] = l(1);
  oe(() => {
    const R = async () => {
      try {
        N(!0);
        const J = await va({ pageSize: T, currentPage: z });
        c(J);
      } catch (J) {
        console.error("Failed to fetch quotes:", J);
      } finally {
        N(!1);
      }
    }, k = ge.on("authenticated", (J) => {
      J ? R() : (c(null), N(!1));
    }, { eager: !0 });
    return () => {
      k == null || k.off();
    };
  }, [T, z]), oe(() => {
    const R = async () => {
      try {
        const J = await va({ pageSize: T, currentPage: z });
        c(J);
      } catch (J) {
        console.error("Failed to fetch quotes:", J);
      }
    }, k = ge.on("quote-management/quote-renamed", () => {
      R();
    }, { eager: !0 });
    return () => {
      k == null || k.off();
    };
  }, [T, z]);
  const E = (R) => {
    q(R), G(1), m == null || m(R);
  }, I = (R) => {
    G(R), f == null || f(R);
  }, F = (R) => {
    const k = R.target, J = k == null ? void 0 : k.value;
    J && E(Number(J));
  }, O = (R, k, J) => R.filter((y) => y == null ? void 0 : y.uid).map((y) => {
    var L, ve, ce, se;
    const qe = `${y.buyer.firstname} ${y.buyer.lastname}`;
    return { id: y.uid, quoteName: e(b, { name: "QuoteName", slot: k == null ? void 0 : k.QuoteName, context: { quote: y }, children: e("span", { children: y.name }) }), created: e(b, { name: "Created", slot: k == null ? void 0 : k.Created, context: { quote: y }, children: e("span", { children: y.createdAt ? Ae(y.createdAt, "short") : "N/A" }) }), createdBy: e(b, { name: "CreatedBy", slot: k == null ? void 0 : k.CreatedBy, context: { quote: y }, children: e("span", { children: qe }) }), status: e(b, { name: "Status", slot: k == null ? void 0 : k.Status, context: { quote: y }, children: e("span", { children: y.status }) }), lastUpdated: e(b, { name: "LastUpdated", slot: k == null ? void 0 : k.LastUpdated, context: { quote: y }, children: e("span", { children: y.updatedAt ? Ae(y.updatedAt, "short") : "N/A" }) }), quoteTemplate: e(b, { name: "QuoteTemplate", slot: k == null ? void 0 : k.QuoteTemplate, context: { quote: y }, children: e("span", { children: y.templateName }) }), quoteTotal: e(b, { name: "QuoteTotal", slot: k == null ? void 0 : k.QuoteTotal, context: { quote: y }, children: e(be, { amount: (ve = (L = y.prices) == null ? void 0 : L.grandTotal) == null ? void 0 : ve.value, currency: (se = (ce = y.prices) == null ? void 0 : ce.grandTotal) == null ? void 0 : se.currency }) }), actions: e(b, { name: "Actions", slot: k == null ? void 0 : k.Actions, context: { quote: y, onViewQuote: J }, children: e(Se, { variant: "tertiary", size: "medium", onClick: () => J == null ? void 0 : J(y.uid, y.name, y.status), children: "View" }) }) };
  }), te = t != null && t.items ? O(t.items, v, p) : [], S = t == null ? void 0 : t.paginationInfo, V = !!S, B = e(b, { name: "EmptyQuotes", slot: v == null ? void 0 : v.EmptyQuotes, context: { quotesData: t }, children: e(wa, { heading: "No Quotes Found" }) }), de = S ? e(b, { name: "ItemRange", slot: v == null ? void 0 : v.ItemRange, context: S, children: ae("span", { children: ["Items ", S.startItem, " to ", S.endItem, " of", " ", S.totalCount, " total"] }) }) : void 0, ee = S && S.pageSizeOptions ? ae(b, { name: "PageSizePicker", slot: v == null ? void 0 : v.PageSizePicker, context: { pageSize: S.pageSize, pageSizeOptions: S.pageSizeOptions, onPageSizeChange: E }, children: [e("span", { children: "Show " }), e(Da, { variant: "primary", size: "medium", value: String(S.pageSize), options: S.pageSizeOptions.map((R) => ({ value: String(R), text: String(R) })), handleSelect: F }), e("span", { children: " per page" })] }) : void 0, ne = S ? e(b, { name: "Pagination", slot: v == null ? void 0 : v.Pagination, context: { currentPage: S.currentPage, totalPages: S.totalPages, onChange: I }, children: e(Ca, { currentPage: S.currentPage, totalPages: S.totalPages, onChange: I }) }) : void 0;
  return e(dn, { rowData: te, loading: h, className: n.className, emptyStateMessage: B, showItemRange: a && V, itemRangeMessage: de, showPageSizePicker: i && V, pageSizePickerMessage: ee, showPagination: r && V, paginationMessage: ne });
};
Wn.displayName = "QuotesListTable";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Xn = 3e3, Vn = (o) => {
  const { templateId: a, onRemoveModalStateChange: i, removeSuccessMessage: r, removeErrorMessage: p } = o, [m, f] = l(!1), [v, n] = l([]), [t, c] = l(!1), [h, N] = l({ type: null, message: "" });
  oe(() => {
    const z = ge.on("quote-management/quote-template-data", () => {
      n([]), c(!1), N({ type: "success", message: r }), setTimeout(() => {
        f(!1), N({ type: null, message: "" }), i == null || i(!1);
      }, Xn);
    });
    return () => z == null ? void 0 : z.off();
  }, [r, i]);
  const $ = g((z) => {
    !z || z.length === 0 || (n(z), N({ type: null, message: "" }), f(!0));
  }, []), T = g(async () => {
    if (!a || v.length === 0) return;
    const z = v.map((G) => G.uid).filter(Boolean);
    if (z.length !== 0) {
      c(!0), N({ type: null, message: "" });
      try {
        await Nn({ templateId: a, itemUids: z });
      } catch (G) {
        const E = G instanceof Error ? G.message : p;
        N({ type: "error", message: E }), c(!1);
      }
    }
  }, [a, v, p]), q = g(() => {
    f(!1), N({ type: null, message: "" }), i == null || i(!1), n([]);
  }, [i]);
  return { handleRemoveItems: $, handleConfirmRemove: T, handleCancelRemove: q, isRemoveModalOpen: m, itemsToRemove: v, isRemoving: t, removeNotificationState: h };
}, Gn = (o) => {
  const { handleRemoveItems: a } = o, [i, r] = l({}), p = g(() => {
  }, []), m = g((v) => {
    const n = v.uid || "";
    r((t) => {
      if (!(n in t)) return t;
      const c = { ...t };
      return delete c[n], c;
    });
  }, []), f = g((v, n) => {
    const t = v;
    if (n === "remove") {
      r((c) => ({ ...c, [t.uid || ""]: n })), a([t]);
      return;
    }
    r((c) => {
      if (!t.uid || !(t.uid in c)) return c;
      const h = { ...c };
      return delete h[t.uid], h;
    });
  }, [a]);
  return { dropdownSelections: i, handleItemDropdownChange: f, handleDismissRemoveBanner: p, clearDropdownSelection: m };
}, Jn = 3e3, Yn = (o) => {
  const { templateId: a, onUpdateModalStateChange: i, updateSuccessMessage: r, updateErrorMessage: p } = o, [m, f] = l({}), [v, n] = l(!1), [t, c] = l(!1), [h, N] = l({ type: null, message: "" });
  oe(() => {
    const E = ge.on("quote-management/quote-template-data", () => {
      f({}), c(!1), N({ type: "success", message: r }), setTimeout(() => {
        n(!1), N({ type: null, message: "" }), i == null || i(!1);
      }, Jn);
    });
    return () => E == null ? void 0 : E.off();
  }, [r, i]);
  const $ = g((E, I) => {
    const F = E;
    if (!F.uid) return;
    const O = F.uid;
    f((te) => ({ ...te, [O]: I }));
  }, []), T = g((E) => {
    E.preventDefault(), N({ type: null, message: "" }), n(!0);
  }, []), q = g(async () => {
    if (!a || Object.keys(m).length === 0) {
      n(!1);
      return;
    }
    c(!0), N({ type: null, message: "" });
    const E = Object.entries(m).map(([I, F]) => ({ itemId: I, quantity: F }));
    try {
      await wn({ templateId: a, items: E });
    } catch (I) {
      const F = I instanceof Error ? I.message : p;
      N({ type: "error", message: F }), c(!1);
    }
  }, [a, m, p]), z = g(() => {
    n(!1), N({ type: null, message: "" }), i == null || i(!1), f({});
  }, [i]), G = g(() => {
    N({ type: null, message: "" });
  }, []);
  return { quantityChanges: m, handleQuantityChange: $, handleUpdate: T, handleConfirmUpdate: q, handleCancelUpdate: z, handleDismissBanner: G, isUpdateModalOpen: v, isUpdating: t, updateNotificationState: h };
}, ja = ({ templateData: o, slots: a, ...i }) => {
  const [r, p] = l(o), [m, f] = l(null), [v, n] = l(!1), [t, c] = l(!1), [h, N] = l(""), [$, T] = l({}), q = Xe({ subtotal: "NegotiableQuoteTemplate.Manage.quotePricesSummary.subtotal.excludingTax", grandTotal: "NegotiableQuoteTemplate.Manage.quotePricesSummary.grandTotal.includingTax", appliedTaxes: "NegotiableQuoteTemplate.Manage.quotePricesSummary.appliedTaxes", removeModalTitle: "NegotiableQuoteTemplate.Manage.removeItemsModal.title", removeModalDescription: "NegotiableQuoteTemplate.Manage.removeItemsModal.description", removeModalCancelButton: "NegotiableQuoteTemplate.Manage.removeItemsModal.cancelButton", removeModalConfirmButton: "NegotiableQuoteTemplate.Manage.removeItemsModal.confirmButton", removeModalConfirmButtonRemoving: "NegotiableQuoteTemplate.Manage.removeItemsModal.confirmButtonRemoving", removeSuccessHeading: "NegotiableQuoteTemplate.Manage.removeItemsModal.successHeading", removeSuccessMessage: "NegotiableQuoteTemplate.Manage.removeItemsModal.successMessage", removeErrorHeading: "NegotiableQuoteTemplate.Manage.removeItemsModal.errorHeading", removeErrorMessage: "NegotiableQuoteTemplate.Manage.removeItemsModal.errorMessage", updateModalTitle: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.title", updateModalDescription: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.description", updateModalCancelButton: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.cancelButton", updateModalUpdateButton: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.updateButton", updateSuccessHeading: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.successHeading", updateSuccessMessage: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.successMessage", updateErrorHeading: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.errorHeading", updateErrorMessage: "NegotiableQuoteTemplate.Manage.updateQuantitiesModal.errorMessage", errorHeading: "NegotiableQuoteTemplate.Manage.lineItemNoteModal.errorHeading" }), { handleRemoveItems: z, handleConfirmRemove: G, handleCancelRemove: E, isRemoveModalOpen: I, isRemoving: F, removeNotificationState: O, itemsToRemove: te } = Vn({ templateId: r == null ? void 0 : r.id, removeSuccessMessage: q.removeSuccessMessage, removeErrorMessage: q.removeErrorMessage }), { dropdownSelections: S, handleItemDropdownChange: V, handleDismissRemoveBanner: B, clearDropdownSelection: de } = Gn({ handleRemoveItems: z }), { handleQuantityChange: ee, handleUpdate: ne, handleConfirmUpdate: R, handleCancelUpdate: k, handleDismissBanner: J, isUpdateModalOpen: y, updateNotificationState: L } = Yn({ templateId: r == null ? void 0 : r.id, updateSuccessMessage: q.updateSuccessMessage, updateErrorMessage: q.updateErrorMessage });
  oe(() => {
    const x = ge.on("quote-management/quote-template-data", (A) => {
      p(A.quoteTemplate), T({});
    }, { eager: !0 });
    return () => x == null ? void 0 : x.off();
  }, []);
  const ve = g(() => {
    te.forEach((x) => {
      de(x);
    }), E();
  }, [te, de, E]), ce = g((x, A) => {
    const H = x;
    if (A === "edit") {
      f(H), n(!0), T((ue) => ({ ...ue, [H.uid]: A }));
      return;
    }
    V(x, A);
  }, [V]), se = { ...S, ...$ }, qe = g(() => {
    m && T((x) => {
      const A = { ...x };
      return delete A[m.uid], A;
    }), n(!1), f(null), c(!1), N("");
  }, [m]), Q = g(async (x) => {
    if (!(!m || !r)) {
      c(!0), N("");
      try {
        await Qn({ templateId: r.id, itemId: m.uid, note: x }), qe();
      } catch (A) {
        console.error("Failed to set template line item note:", A);
        const H = A instanceof Error ? A.message : "Unable to update the item. Please try again.";
        N(H), c(!1);
      }
    }
  }, [m, r, qe]), Y = O.type === "success" ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: q.removeSuccessHeading, description: O.message, onDismiss: B, "data-testid": "remove-items-success-banner" }) : O.type === "error" ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: q.removeErrorHeading, description: O.message, onDismiss: B, "data-testid": "remove-items-error-banner" }) : null, ie = L.type === "success" ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: q.updateSuccessHeading, description: L.message, onDismiss: J, "data-testid": "update-quantities-success-banner" }) : L.type === "error" ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: q.updateErrorHeading, description: L.message, onDismiss: J, "data-testid": "update-quantities-error-banner" }) : null;
  if (!r) return e(Et, { loading: !0 });
  const U = I ? { open: !0, title: q.removeModalTitle, message: q.removeModalDescription, cancelLabel: q.removeModalCancelButton, confirmLabel: F ? q.removeModalConfirmButtonRemoving : q.removeModalConfirmButton, onCancel: ve, onConfirm: G, confirmationBanner: Y } : null, pe = y ? { open: !0, title: q.updateModalTitle, message: q.updateModalDescription, cancelLabel: q.updateModalCancelButton, confirmLabel: q.updateModalUpdateButton, onCancel: k, onConfirm: R, confirmationBanner: ie } : null, re = U || pe, le = [];
  r.prices.subtotalExcludingTax && le.push({ label: q.subtotal, id: "subtotal", value: e(be, { amount: r.prices.subtotalExcludingTax.value, currency: r.prices.subtotalExcludingTax.currency, weight: "normal" }) }), r.prices.grandTotal && le.push({ label: q.grandTotal, id: "total", value: e(be, { amount: r.prices.grandTotal.value, currency: r.prices.grandTotal.currency }), strong: !0 });
  const j = h ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: q.errorHeading, description: h, onDismiss: () => N(""), "data-testid": "line-item-note-error-banner" }) : null;
  return ae(We, { children: [e(Et, { "data-testid": "items-quoted-template-container", ...i, loading: !1, table: e(b, { name: "ProductListTable", slot: a == null ? void 0 : a.ProductListTable, context: { items: r.items, canEdit: r.canSendForReview, dropdownSelections: se, handleItemDropdownChange: ce, handleQuantityChange: ee, handleUpdate: ne }, children: e(ka, { items: r.items, canEdit: r.canSendForReview, showActions: r.canEditTemplateItems, onItemDropdownChange: ce, onQuantityChange: ee, onUpdate: ne, dropdownSelections: se }) }), pricesSummary: e(b, { name: "QuotePricesSummary", slot: a == null ? void 0 : a.QuotePricesSummary, context: { items: r.items, prices: r.prices }, children: e(Ea, { entries: le }) }) }), re && e(Ee, { ...re }), m && e(Fa, { open: v, item: m, onClose: qe, onConfirm: Q, isSubmitting: t, readOnlyQuantity: !0, errorBanner: j || void 0 })] });
};
ja.displayName = "ItemsQuotedTemplate";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Wa = ({ templateData: o, ...a }) => {
  var i;
  const [r, p] = l(o);
  if (oe(() => {
    const f = ge.on("quote-management/quote-template-data", (v) => {
      p(v.quoteTemplate);
    }, { eager: !0 });
    return () => f == null ? void 0 : f.off();
  }, []), !r) return null;
  const m = (i = r == null ? void 0 : r.comments) == null ? void 0 : i.map((f) => ({ uid: f.uid, createdAt: e("span", { children: Ae(f.createdAt, "long") }), author: ae("span", { children: [f.author.firstname, " ", f.author.lastname] }), text: e("p", { children: f.text }), attachments: f.attachments }));
  return e(Ia, { "data-testid": "quote-template-comments-list-container", ...a, comments: m || [] });
};
Wa.displayName = "QuoteTemplateCommentsList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Xa = ({ templateData: o, ...a }) => {
  const [i, r] = l(o);
  return oe(() => {
    const p = ge.on("quote-management/quote-template-data", (m) => {
      r(m.quoteTemplate);
    }, { eager: !0 });
    return () => p == null ? void 0 : p.off();
  }, []), i ? e("div", { ...a, children: e(Sa, { history: i.history, items: i.items, buyer: i.buyer, salesRepName: i.salesRepName }) }) : null;
};
Xa.displayName = "QuoteTemplateHistoryLog";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const Zn = (o) => {
  const { templateReferenceDocuments: a, localReferenceDocuments: i } = o, r = g((t) => {
    if (a) return a.find((c) => t.uid && c.uid ? c.uid === t.uid : c.url === t.url);
  }, [a]), p = g((t) => r(t) !== void 0, [r]), m = g((t, c) => t.name !== c.name || t.identifier !== c.identifier || t.url !== c.url, []), f = g(() => a ? i.filter((t) => !a.some((c) => t.uid && c.uid ? c.uid === t.uid : c.url === t.url)) : i, [a, i]), v = g(() => i.map((t) => ({ uid: t.uid, name: t.name, identifier: t.identifier, url: t.url })), [i]), n = X(() => a ? i.some((t) => r(t) === void 0) || a.some((t) => !i.some((c) => c.uid && t.uid ? c.uid === t.uid : c.url === t.url)) ? !0 : i.some((t) => {
    const c = r(t);
    return c ? m(t, c) : !1;
  }) : i.length > 0, [a, i, r, m]);
  return { isDocumentInTemplateData: p, getNewDocuments: f, getReferenceDocumentLinks: v, hasUnsavedChanges: n };
}, Kn = (o = {}) => {
  const { initialTemplateName: a, templateNameRequiredErrorMessage: i = "Template name is required" } = o, [r, p] = l(!1), [m, f] = l(""), [v, n] = l(""), [t, c] = l(""), [h, N] = l(""), [$, T] = l(""), q = g((O) => {
    f(O || a || ""), n(""), c(""), N(""), T(""), p(!0);
  }, [a]), z = g(() => {
    p(!1), f(""), n(""), c(""), N(""), T("");
  }, []), G = g((O) => {
    f(O), O.trim() && N("");
  }, []), E = g((O) => {
    n(O);
  }, []), I = g(() => m.trim() ? (c(""), N(""), p(!1), !0) : (N(i), !1), [m, i]), F = g(() => {
    f(""), n(""), c(""), N(""), T("");
  }, []);
  return { isRenameModalOpen: r, renameTemplateName: m, renameReason: v, renameError: t, renameTemplateNameError: h, renameSuccess: $, handleRenameClick: q, handleRenameClose: z, handleRenameTemplateNameChange: G, handleRenameReasonChange: E, handleRenameSave: I, resetRenameState: F };
}, $n = (o = {}) => {
  const { templateId: a, initialExpirationDate: i, expirationDateRequiredErrorMessage: r = "Expiration date is required" } = o, [p, m] = l(!1), [f, v] = l(""), [n, t] = l(""), [c, h] = l(""), [N, $] = l(""), T = g((I) => {
    v(I || i || ""), t(""), h(""), $(""), m(!0);
  }, [i]), q = g(() => {
    m(!1), v(""), t(""), h(""), $("");
  }, []), z = g((I) => {
    v(I), I.trim() && h("");
  }, []), G = g(async () => {
    if (!f.trim()) return h(r), !1;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f)) return h("Please enter a valid date"), !1;
    const I = new Date(f), F = /* @__PURE__ */ new Date();
    if (F.setHours(0, 0, 0, 0), I < F) return h("Expiration date must be in the future"), !1;
    if (!a) return t("Template ID is required"), !1;
    t(""), h("");
    try {
      return await Fn({ templateId: a, expirationDate: f }), m(!1), $("Expiration date saved successfully"), !0;
    } catch (O) {
      console.error("Failed to set expiration date:", O);
      const te = O instanceof Error ? O.message : "Failed to set expiration date. Please try again.";
      return t(te), !1;
    }
  }, [f, r, a]), E = g(() => {
    v(""), t(""), h(""), $("");
  }, []);
  return { isExpirationModalOpen: p, expirationDate: f, expirationError: n, expirationDateError: c, expirationSuccess: N, handleExpirationClick: T, handleExpirationClose: q, handleExpirationDateChange: z, handleExpirationSave: G, resetExpirationState: E };
}, eo = ({ slots: o, onActionsButtonClick: a, onSendForReview: i, maxFiles: r, maxFileSize: p, acceptedFileTypes: m, ...f }) => {
  var v;
  const [n, t] = l(void 0), [c, h] = l(!0), [N, $] = l(""), [T, q] = l(!1), [z, G] = l(!1), [E, I] = l(null), [F, O] = l(!1), [te, S] = l(!1), [V, B] = l(null), [de, ee] = l(!1), [ne, R] = l([]), [k, J] = l(!1), [y, L] = l(void 0), [ve, ce] = l(null), [se, qe] = l(!1), [Q, Y] = l(!1), [ie, U] = l(""), [pe, re] = l(""), [le, j] = l(!1), [x, A] = l(!1), [H, ue] = l(""), [ke, we] = l(""), W = St(!1), [D, Z] = l([]), [_, _e] = l(void 0), { getReferenceDocumentLinks: Fe, hasUnsavedChanges: ye } = Zn({ templateReferenceDocuments: n == null ? void 0 : n.referenceDocuments, localReferenceDocuments: ne }), s = Xe({ createdLabel: "NegotiableQuoteTemplate.Manage.createdLabel", salesRepLabel: "NegotiableQuoteTemplate.Manage.salesRepLabel", expiresLabel: "NegotiableQuoteTemplate.Manage.expiresLabel", templateIdLabel: "NegotiableQuoteTemplate.Manage.templateIdLabel", actionsLabel: "NegotiableQuoteTemplate.Manage.actionsLabel", referenceDocumentsTitle: "NegotiableQuoteTemplate.Manage.referenceDocuments.title", commentsTitle: "NegotiableQuoteTemplate.Manage.comments.title", historyLogTitle: "NegotiableQuoteTemplate.Manage.historyLog.title", itemsQuotedTab: "NegotiableQuoteTemplate.Manage.tabs.itemsQuoted", commentsTab: "NegotiableQuoteTemplate.Manage.tabs.comments", historyLogTab: "NegotiableQuoteTemplate.Manage.tabs.historyLog", templateCommentsPlaceholder: "NegotiableQuoteTemplate.Manage.templateComments.placeholder", sendForReview: "NegotiableQuoteTemplate.Manage.actionButtons.sendForReview", delete: "NegotiableQuoteTemplate.Manage.actionButtons.delete", cancel: "NegotiableQuoteTemplate.Manage.actionButtons.cancel", attachFiles: "NegotiableQuote.Manage.attachFiles", fileUploadError: "NegotiableQuote.Manage.fileUploadError", maxFilesExceeded: "NegotiableQuote.Manage.maxFilesExceeded", maxFileSizeExceeded: "NegotiableQuote.Manage.maxFileSizeExceeded", invalidFileType: "NegotiableQuote.Manage.invalidFileType", confirmationModalDeleteTitle: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.title", confirmationModalDeleteMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.message", confirmationModalDeleteConfirm: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.confirm", confirmationModalDeleteErrorHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.errorHeading", confirmationModalDeleteErrorFallback: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.errorFallback", confirmationModalDeleteSuccessHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.successHeading", confirmationModalDeleteSuccessDescription: "NegotiableQuoteTemplate.Manage.confirmationModal.delete.successDescription", confirmationModalCancelTitle: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.title", confirmationModalCancelMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.message", confirmationModalCancelConfirm: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.confirm", confirmationModalCancelErrorHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.errorHeading", confirmationModalCancelErrorFallback: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.errorFallback", confirmationModalCancelSuccessHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.successHeading", confirmationModalCancelSuccessDescription: "NegotiableQuoteTemplate.Manage.confirmationModal.cancelTemplate.successDescription", confirmationModalCancel: "NegotiableQuoteTemplate.Manage.confirmationModal.cancel", accept: "NegotiableQuoteTemplate.Manage.actionButtons.accept", generateQuote: "NegotiableQuoteTemplate.Manage.actionButtons.generateQuote", generateQuoteModalTitle: "NegotiableQuoteTemplate.Manage.actionButtons.generateQuote", generateQuoteModalMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.message", generateQuoteModalCancel: "NegotiableQuoteTemplate.Manage.confirmationModal.cancel", generateQuoteModalConfirm: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.confirm", generateQuoteModalConfirmLoading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.confirmLoading", generateQuoteModalSuccessHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.successHeading", generateQuoteSuccessMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.successDescription", generateQuoteModalErrorHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.errorHeading", generateQuoteErrorFallback: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.errorFallback", acceptModalTitle: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.title", acceptModalMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.message", acceptModalCancel: "NegotiableQuoteTemplate.Manage.confirmationModal.cancel", acceptModalConfirm: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.confirm", acceptModalConfirmLoading: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.confirmLoading", acceptModalSuccessHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.successHeading", acceptSuccessMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.successDescription", acceptModalErrorHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.errorHeading", acceptErrorFallback: "NegotiableQuoteTemplate.Manage.confirmationModal.accept.errorFallback", documentDuplicateUidError: "NegotiableQuoteTemplate.Manage.referenceDocuments.form.duplicateUidError", renameTitle: "NegotiableQuoteTemplate.Manage.rename.title", renameTemplateNameLabel: "NegotiableQuoteTemplate.Manage.rename.templateNameLabel", renameReasonLabel: "NegotiableQuoteTemplate.Manage.rename.reasonLabel", renameButton: "NegotiableQuoteTemplate.Manage.rename.renameButton", renameCancelButton: "NegotiableQuoteTemplate.Manage.rename.cancelButton", renameErrorHeading: "NegotiableQuoteTemplate.Manage.rename.errorHeading", renameTemplateNameRequired: "NegotiableQuoteTemplate.Manage.rename.templateNameRequired", renameErrorDefault: "NegotiableQuoteTemplate.Manage.rename.errorDefault", renameSuccessHeading: "NegotiableQuoteTemplate.Manage.rename.successHeading", renameSuccessMessage: "NegotiableQuoteTemplate.Manage.rename.successMessage", expirationDateRequired: "NegotiableQuoteTemplate.Manage.expirationDate.expirationDateRequired", expirationDateErrorHeading: "NegotiableQuoteTemplate.Manage.expirationDate.errorHeading", expirationDateSuccessHeading: "NegotiableQuoteTemplate.Manage.expirationDate.successHeading", shippingInformationTitle: "NegotiableQuoteTemplate.Manage.shippingInformation.title", unsavedChangesWarningHeading: "NegotiableQuoteTemplate.Manage.unsavedChangesWarningHeading", unsavedChangesWarningMessage: "NegotiableQuoteTemplate.Manage.unsavedChangesWarningMessage", shippingAddressWarningHeading: "NegotiableQuoteTemplate.Manage.shippingAddressWarningHeading", shippingAddressWarningMessage: "NegotiableQuoteTemplate.Manage.shippingAddressWarningMessage" }), { isRenameModalOpen: De, renameTemplateName: xe, renameReason: Ce, renameError: ze, renameTemplateNameError: Oe, renameSuccess: he, handleRenameClick: Ie, handleRenameClose: Ue, handleRenameTemplateNameChange: nt, handleRenameReasonChange: Ke, handleRenameSave: pt, resetRenameState: ot } = Kn({ initialTemplateName: n == null ? void 0 : n.name, templateNameRequiredErrorMessage: s.renameTemplateNameRequired }), { isExpirationModalOpen: u, expirationDate: ft, expirationError: $e, expirationDateError: vt, expirationSuccess: Ve, handleExpirationClick: et, handleExpirationClose: bt, handleExpirationDateChange: kt, handleExpirationSave: Ft, resetExpirationState: it } = $n({ templateId: n == null ? void 0 : n.id, initialExpirationDate: n == null ? void 0 : n.expirationDate, expirationDateRequiredErrorMessage: s.expirationDateRequired }), yt = X(() => De ? !1 : xe !== "" && xe !== (n == null ? void 0 : n.name), [xe, n == null ? void 0 : n.name, De]), Ge = X(() => ye || yt, [ye, yt]), lt = g(async (M) => {
    if (r && D.length + M.length > r) {
      _e(s.maxFilesExceeded.replace("{maxFiles}", String(r)));
      return;
    }
    for (const me of M) {
      if (p && !ra(me.size, p)) {
        _e(s.maxFileSizeExceeded.replace("{maxSize}", sa(p)));
        return;
      }
      if (m && !ma(me.type, m)) {
        _e(s.invalidFileType);
        return;
      }
    }
    _e(void 0);
    const P = M.map((me) => ({ key: `temp-${Date.now()}-${Math.random()}-${me.name}`, name: me.name, size: me.size, status: "uploading" }));
    Z((me) => [...me, ...P]);
    for (let me = 0; me < M.length; me++) {
      const Je = M[me], He = P[me].key;
      try {
        const ta = await ua(Je);
        Z((aa) => aa.map((Ye) => Ye.key === He ? { ...Ye, key: ta.key, status: "success" } : Ye));
      } catch (ta) {
        Z((aa) => aa.map((Ye) => Ye.key === He ? { ...Ye, status: "error", error: ta.message } : Ye));
      }
    }
  }, [r, p, m, D, s]), tt = g((M) => {
    Z((P) => P.filter((me) => me.key !== M));
  }, []);
  oe(() => {
    const M = ge.on("quote-management/quote-template-data", (P) => {
      P.quoteTemplate && (t(P.quoteTemplate), h(!1), $(""), q(!1), Z([]), R(P.quoteTemplate.referenceDocuments || []), ot(), it());
    }, { eager: !0 });
    return () => M == null ? void 0 : M.off();
  }, [ot, it]), oe(() => {
    n != null && n.referenceDocuments && R(n.referenceDocuments);
  }, [n == null ? void 0 : n.referenceDocuments]), oe(() => {
    n && n.status === ba.UPDATED && !W.current && (W.current = !0, (async () => {
      try {
        await Dn({ templateId: n.id });
      } catch (M) {
        console.error("Failed to auto-open quote template:", M);
      }
    })());
  }, [n]);
  const ht = g(() => {
    G(!1), I(null), O(!1);
  }, []), qt = g(async () => {
    if (n != null && n.id) {
      I(null), O(!1);
      try {
        await Cn({ templateId: n.id }), O(!0), setTimeout(() => {
          G(!1), O(!1);
        }, 2e3);
      } catch (M) {
        const P = M.message || s.confirmationModalDeleteErrorFallback;
        I(P);
      }
    }
  }, [n, s.confirmationModalDeleteErrorFallback]), It = g(() => {
    I(null);
  }, []), _t = g(() => {
    O(!1);
  }, []), Rt = g(() => {
    S(!1), B(null), ee(!1);
  }, []), xt = g(async () => {
    if (n != null && n.id) {
      B(null), ee(!1);
      try {
        await Sn({ templateId: n.id }), ee(!0), setTimeout(() => {
          S(!1), ee(!1);
        }, 2e3);
      } catch (M) {
        const P = M.message || s.confirmationModalCancelErrorFallback;
        B(P);
      }
    }
  }, [n, s.confirmationModalCancelErrorFallback]), Lt = g(() => {
    B(null);
  }, []), Ht = g(() => {
    ee(!1);
  }, []), rt = g(async () => {
    const M = Fe(), P = D.filter((He) => He.status === "success"), me = [Ce.trim(), N.trim()].filter(Boolean).join(`

`).trim() || void 0, Je = xe && xe !== (n == null ? void 0 : n.name) ? xe : void 0;
    if (i) {
      i({ templateData: n, name: Je, comment: me, referenceDocumentLinks: M, attachments: P.length ? P : void 0 });
      return;
    }
    q(!0);
    try {
      await En({ templateId: n.id, name: Je, comment: me, referenceDocumentLinks: M.length > 0 ? M : void 0, attachments: P.length ? P.map((He) => ({ key: He.key })) : void 0 });
    } catch (He) {
      console.error("Failed to send quote template for review:", He), q(!1);
    }
  }, [n, i, N, Ce, xe, Fe, D]), st = g(() => {
    L(void 0), ce(null), J(!0);
  }, []), mt = g((M) => {
    L(M), ce(null), J(!0);
  }, []), dt = g((M) => {
    R((P) => P.filter((me) => me.uid !== M.uid || me.url !== M.url));
  }, []), Mt = g((M) => {
    ce(null), R(y ? (P) => P.map((me) => me.identifier === y.identifier ? M : me) : (P) => [...P, M]), J(!1), L(void 0);
  }, [y]), zt = g(() => {
    J(!1), L(void 0), ce(null);
  }, []), Pt = g(async () => {
    Y(!0), re(""), U("");
    try {
      await Pa({ templateId: n.id }), U(s.generateQuoteSuccessMessage);
    } catch (M) {
      console.error("Failed to generate quote from template:", M);
      const P = M instanceof Error ? M.message : s.generateQuoteErrorFallback;
      re(P);
    } finally {
      Y(!1);
    }
  }, [n, s.generateQuoteSuccessMessage, s.generateQuoteErrorFallback]), Bt = g(() => {
    qe(!1), re(""), U("");
  }, []), At = g(async () => {
    A(!0), we(""), ue("");
    try {
      await kn({ templateId: n.id }), ue(s.acceptSuccessMessage), setTimeout(() => {
        j(!1), ue("");
      }, 2e3);
    } catch (M) {
      console.error("Failed to accept quote template:", M);
      const P = M instanceof Error ? M.message : s.acceptErrorFallback;
      we(P);
    } finally {
      A(!1);
    }
  }, [n, s.acceptSuccessMessage, s.acceptErrorFallback]), Ot = g(() => {
    j(!1), we(""), ue("");
  }, []), Ut = X(() => {
    const M = !(n != null && n.canSendForReview), P = xe || (n == null ? void 0 : n.name);
    return e(b, { name: "TemplateName", slot: o == null ? void 0 : o.TemplateName, context: { templateName: n == null ? void 0 : n.name, templateData: n, templateDisplayName: P, isRenameDisabled: M }, children: ae("div", { className: "quote-management-manage-negotiable-quote-template__template-name-wrapper", children: [e("h1", { "data-testid": "template-name", className: "quote-management-manage-negotiable-quote-template__template-name-title", children: P }), e("button", { onClick: () => Ie(P), disabled: M, "data-testid": "rename-template-button", className: "quote-management-manage-negotiable-quote-template__rename-button", "aria-label": "Rename template", children: e(na, {}) })] }) });
  }, [o == null ? void 0 : o.TemplateName, n, Ie, xe]), ct = X(() => e(b, { name: "TemplateStatus", slot: o == null ? void 0 : o.TemplateStatus, context: { templateStatus: n == null ? void 0 : n.status, templateData: n }, children: e("div", { "data-testid": "template-status", children: n == null ? void 0 : n.status }) }), [o == null ? void 0 : o.TemplateStatus, n]), jt = X(() => {
    if (!n) return;
    const M = !["Active", "Expired", "Closed", "Canceled", "Inactive"].includes(n.status), P = n.expirationDate ? Ae(n.expirationDate, "short") : void 0;
    return ae(b, { name: "Details", slot: o == null ? void 0 : o.Details, context: { templateData: n }, children: [ae("div", { className: "quote-management-manage-negotiable-quote-template__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote-template__detail-title", "data-testid": "template-id-label", children: s.templateIdLabel }), e("span", { className: "quote-management-manage-negotiable-quote-template__detail-content", "data-testid": "template-id-value", children: n.id })] }), ae("div", { className: "quote-management-manage-negotiable-quote-template__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote-template__detail-title", "data-testid": "created-label", children: s.createdLabel }), ae("span", { className: "quote-management-manage-negotiable-quote-template__detail-content", "data-testid": "created-value", children: [Ae(n.createdAt, "short"), " (", n.buyer.firstname, " ", n.buyer.lastname, ")"] })] }), ae("div", { className: "quote-management-manage-negotiable-quote-template__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote-template__detail-title", "data-testid": "sales-rep-label", children: s.salesRepLabel }), e("span", { className: "quote-management-manage-negotiable-quote-template__detail-content", "data-testid": "sales-rep-value", children: n.salesRepName })] }), ae("div", { className: "quote-management-manage-negotiable-quote-template__detail", children: [e("span", { className: "quote-management-manage-negotiable-quote-template__detail-title", "data-testid": "expires-label", children: s.expiresLabel }), ae("div", { className: "quote-management-manage-negotiable-quote-template__expiration-wrapper", children: [e("span", { className: "quote-management-manage-negotiable-quote-template__detail-content", "data-testid": "expires-value", children: P }), M && e("button", { onClick: () => et(n.expirationDate), className: "quote-management-manage-negotiable-quote-template__edit-expiration-button", "data-testid": "edit-expiration-button", "aria-label": "Edit expiration date", children: e(na, {}) })] })] })] });
  }, [o == null ? void 0 : o.Details, s, n, et]), Tt = X(() => [{ label: s.generateQuote, value: "generateQuote", disabled: !(n != null && n.canGenerateQuoteFromTemplate) }], [s, n == null ? void 0 : n.canGenerateQuoteFromTemplate]), Wt = X(() => {
    const M = (P) => {
      switch (P) {
        case "generateQuote":
          qe(!0), re(""), U(""), a == null || a(P);
          break;
      }
    };
    return e(b, { name: "ActionBar", slot: o == null ? void 0 : o.ActionBar, context: { templateData: n }, children: e(Ra, { dropdownPlaceholder: s.actionsLabel, dropdownOptions: [], buttons: Tt.map((P) => e(Se, { variant: "tertiary", onClick: () => M(P.value), "data-testid": `actions-bar-${P.value}-button`, "data-action": P.value, disabled: P.disabled, children: P.label }, P.value)) }) });
  }, [Tt, s, o == null ? void 0 : o.ActionBar, n, a]), je = X(() => {
    const M = n == null ? void 0 : n.status;
    return M === "Draft" || M === "Open";
  }, [n == null ? void 0 : n.status]), Xt = X(() => {
    const M = ne.length > 0 || je, P = M ? s.referenceDocumentsTitle : void 0;
    return e(b, { name: "ReferenceDocuments", slot: o == null ? void 0 : o.ReferenceDocuments, context: { templateData: n, referenceDocuments: ne, isEditable: je, onAddDocument: st, onEditDocument: mt, onRemoveDocument: dt, referenceDocumentsTitle: s.referenceDocumentsTitle }, children: ae("div", { "data-testid": "reference-documents", children: [M && e("h2", { children: P }), e(cn, { documents: ne, isEditable: je, onAdd: st, onEdit: mt, onRemove: dt })] }) });
  }, [o == null ? void 0 : o.ReferenceDocuments, s, n, ne, je, st, mt, dt]), Vt = X(() => e(b, { name: "ShippingInformationTitle", slot: o == null ? void 0 : o.ShippingInformationTitle, context: { templateData: n }, children: e("h2", { children: s.shippingInformationTitle }) }), [o == null ? void 0 : o.ShippingInformationTitle, n, s]), Gt = X(() => {
    var M;
    return e(b, { name: "ShippingInformation", slot: o == null ? void 0 : o.ShippingInformation, context: { templateData: n, loading: c, setLoading: h }, children: e(Ba, { shippingAddress: (M = n == null ? void 0 : n.shippingAddresses) == null ? void 0 : M[0], loading: c, "data-testid": "manage-template-shipping-address" }) });
  }, [o == null ? void 0 : o.ShippingInformation, n, c, h]), Jt = X(() => e(b, { name: "ItemsTable", slot: o == null ? void 0 : o.ItemsTable, context: { templateData: n }, children: e(La, { tabs: /* @__PURE__ */ new Map([["items-quoted", s.itemsQuotedTab], ["comments", s.commentsTab], ["history-log", s.historyLogTab]]), tabsContent: /* @__PURE__ */ new Map([["items-quoted", e(b, { name: "ItemsQuotedTab", slot: o == null ? void 0 : o.ItemsQuotedTab, context: { templateData: n }, children: e(ja, { templateData: n }) }, "items-quoted")], ["comments", e(b, { name: "CommentsTab", slot: o == null ? void 0 : o.CommentsTab, context: { templateData: n }, children: e(Wa, { templateData: n }) }, "comments")], ["history-log", e(b, { name: "HistoryLogTab", slot: o == null ? void 0 : o.HistoryLogTab, context: { templateData: n }, children: e(Xa, { templateData: n }) }, "history-log")]]) }) }), [o == null ? void 0 : o.ItemsTable, o == null ? void 0 : o.ItemsQuotedTab, o == null ? void 0 : o.CommentsTab, o == null ? void 0 : o.HistoryLogTab, s, n]), Qt = X(() => e(b, { name: "CommentsTitle", slot: o == null ? void 0 : o.CommentsTitle, context: { templateData: n }, children: e("h2", { children: s.commentsTitle }) }), [o == null ? void 0 : o.CommentsTitle, s, n]), Yt = X(() => e(b, { name: "Comments", slot: o == null ? void 0 : o.Comments, context: { templateData: n }, children: e(ia, { name: "templateComments", placeholder: s.templateCommentsPlaceholder, rows: 3, value: N, onInput: (M) => {
    $(M.target.value);
  }, disabled: !(n != null && n.canSendForReview) || T }) }), [o == null ? void 0 : o.Comments, s, n, N, T]), Nt = X(() => !(n != null && n.canSendForReview), [n]), Zt = X(() => {
    const M = T || Nt;
    return e(b, { name: "AttachFilesField", slot: o == null ? void 0 : o.AttachFilesField, context: { templateData: n, onFileChange: lt, attachedFiles: D, fileUploadError: _, disabled: M }, children: ae("div", { className: "quote-management-manage-negotiable-quote-template__attach-files", ...M ? { "data-disabled": !0 } : {}, "aria-disabled": M, children: [e(la, { id: "manage-template-attach-files", multiple: !0, onChange: (P) => {
      const me = P.target, Je = me == null ? void 0 : me.files, He = Je ? Array.from(Je) : [];
      He.length > 0 && lt(He);
    }, icon: e(da, {}), disabled: M, "data-testid": "manage-template-attach-files", accept: m == null ? void 0 : m.join(","), children: s.attachFiles }), _ && e("div", { className: "quote-management-manage-negotiable-quote-template__file-error", "data-testid": "file-upload-error", children: _ })] }) });
  }, [o == null ? void 0 : o.AttachFilesField, n, lt, T, Nt, m, _, s, D]), Kt = X(() => {
    if (D.length) return e(b, { name: "AttachedFilesList", slot: o == null ? void 0 : o.AttachedFilesList, context: { templateData: n, files: D, onRemove: tt, disabled: T }, children: e(ca, { files: D, onRemove: tt, disabled: T }) });
  }, [D, tt, T, o == null ? void 0 : o.AttachedFilesList, n]), wt = X(() => Ge ? e(K, { type: "warning", variant: "primary", icon: e(Me, {}), heading: s.unsavedChangesWarningHeading, description: s.unsavedChangesWarningMessage, "data-testid": "unsaved-changes-warning-alert" }) : void 0, [Ge, s.unsavedChangesWarningHeading, s.unsavedChangesWarningMessage]), ut = X(() => {
    var M;
    return (M = n == null ? void 0 : n.shippingAddresses) != null && M.length ? void 0 : e(K, { type: "warning", variant: "primary", icon: e(Me, {}), heading: s.shippingAddressWarningHeading, description: s.shippingAddressWarningMessage, "data-testid": "shipping-address-warning-alert" });
  }, [(v = n == null ? void 0 : n.shippingAddresses) == null ? void 0 : v.length, s.shippingAddressWarningHeading, s.shippingAddressWarningMessage]), $t = X(() => ae(We, { children: [wt, ut] }), [wt, ut]), Dt = X(() => {
    const M = (n == null ? void 0 : n.status) === ba.OPEN && (n == null ? void 0 : n.canAccept);
    return ae(b, { name: "Footer", slot: o == null ? void 0 : o.Footer, context: { templateData: n, comment: N, isSubmitting: T, attachedFiles: D, referenceDocuments: ne, hasUnsavedChanges: Ge, handleSendForReview: rt, showAcceptButton: M, renameTemplateName: xe, renameReason: Ce }, children: [M && e(Se, { variant: "primary", onClick: () => {
      j(!0), we(""), ue("");
    }, "data-testid": "accept-button", disabled: T || Ge, children: s.accept }), (n == null ? void 0 : n.canSendForReview) && e(Se, { variant: "primary", onClick: rt, "data-testid": "send-for-review-button", disabled: !(n != null && n.canSendForReview) || T, children: s.sendForReview }), (n == null ? void 0 : n.canCancel) && e(Se, { variant: "tertiary", onClick: () => S(!0), "data-testid": "cancel-template-button", disabled: T, children: s.cancel }), (n == null ? void 0 : n.canDelete) && e(Se, { variant: "tertiary", onClick: () => G(!0), "data-testid": "delete-template-button", disabled: T, children: s.delete })] });
  }, [o == null ? void 0 : o.Footer, s, n, N, T, D, rt, ne, Ge, xe, Ce]), ea = E ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: s.confirmationModalDeleteErrorHeading, description: E, onDismiss: It, "data-testid": "confirmation-modal-error-banner" }) : null, at = (F ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: s.confirmationModalDeleteSuccessHeading, description: s.confirmationModalDeleteSuccessDescription, onDismiss: _t, "data-testid": "confirmation-modal-success-banner" }) : null) || ea, gt = V ? e(K, { type: "error", variant: "primary", icon: e(Me, {}), heading: s.confirmationModalCancelErrorHeading, description: V, onDismiss: Lt, "data-testid": "confirmation-modal-cancel-error-banner" }) : null, d = (de ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: s.confirmationModalCancelSuccessHeading, description: s.confirmationModalCancelSuccessDescription, onDismiss: Ht, "data-testid": "confirmation-modal-cancel-success-banner" }) : null) || gt, w = X(() => ze ? e(K, { type: "error", variant: "primary", icon: e(Me, { color: "var(--color-error)" }), heading: s.renameErrorHeading, description: ze }) : void 0, [ze, s.renameErrorHeading]), C = X(() => he ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: s.renameSuccessHeading, description: he }) : void 0, [he, s.renameSuccessHeading]), fe = X(() => $e ? e(K, { type: "error", variant: "primary", icon: e(Me, { color: "var(--color-error)" }), heading: s.expirationDateErrorHeading, description: $e }) : void 0, [$e, s.expirationDateErrorHeading]), Te = X(() => Ve ? e(K, { type: "success", variant: "primary", icon: e(Ne, {}), heading: s.expirationDateSuccessHeading, description: Ve }) : void 0, [Ve, s.expirationDateSuccessHeading]), Pe = { ...f, loading: c, templateName: Ut, templateStatus: ct, banner: $t, details: jt, actionBar: Wt, referenceDocuments: Xt, itemsTable: Jt, shippingInformationTitle: Vt, shippingInformation: Gt, commentsTitle: Qt, comments: Yt, attachFilesField: Zt, attachedFilesList: Kt, footer: Dt };
  let Re = null;
  ie ? Re = e(K, { type: "success", variant: "primary", icon: e(Ze, { source: "CheckWithCircle" }), heading: s.generateQuoteModalSuccessHeading, description: ie, "data-testid": "generate-quote-success-banner" }) : pe && (Re = e(K, { type: "error", variant: "primary", icon: e(Ze, { source: "WarningFilled" }), heading: s.generateQuoteModalErrorHeading, description: pe, "data-testid": "generate-quote-error-banner" }));
  let Le = null;
  return H ? Le = e(K, { type: "success", variant: "primary", icon: e(Ze, { source: "CheckWithCircle" }), heading: s.acceptModalSuccessHeading, description: H, "data-testid": "accept-success-banner" }) : ke && (Le = e(K, { type: "error", variant: "primary", icon: e(Ze, { source: "WarningFilled" }), heading: s.acceptModalErrorHeading, description: ke, "data-testid": "accept-error-banner" })), ae(We, { children: [e(un, { ...Pe }), z && Qe(e(Ee, { open: z, title: s.confirmationModalDeleteTitle, message: s.confirmationModalDeleteMessage, cancelLabel: s.confirmationModalCancel, confirmLabel: s.confirmationModalDeleteConfirm, onCancel: ht, onConfirm: qt, showCloseButton: !at, confirmationBanner: at }), document.body), te && Qe(e(Ee, { open: te, title: s.confirmationModalCancelTitle, message: s.confirmationModalCancelMessage, cancelLabel: s.confirmationModalCancel, confirmLabel: s.confirmationModalCancelConfirm, onCancel: Rt, onConfirm: xt, showCloseButton: !d, confirmationBanner: d }), document.body), k && Qe(e(gn, { open: k, document: y, errorMessage: ve || void 0, onSave: Mt, onClose: zt, isSubmitting: T }), document.body), se && Qe(e(Ee, { open: se, title: s.generateQuoteModalTitle, message: s.generateQuoteModalMessage, cancelLabel: s.generateQuoteModalCancel, confirmLabel: Q ? s.generateQuoteModalConfirmLoading : s.generateQuoteModalConfirm, onCancel: Bt, onConfirm: Q ? void 0 : Pt, showCloseButton: !0, confirmationBanner: Re, "data-testid": "generate-quote-confirmation-modal" }), document.body), le && Qe(e(Ee, { open: le, title: s.acceptModalTitle, message: s.acceptModalMessage, cancelLabel: s.acceptModalCancel, confirmLabel: x ? s.acceptModalConfirmLoading : s.acceptModalConfirm, onCancel: Ot, onConfirm: x ? void 0 : At, showCloseButton: !0, confirmationBanner: Le, "data-testid": "accept-confirmation-modal" }), document.body), De && Qe(e(Ha, { open: De, quoteName: xe, renameReason: Ce, quoteNameError: Oe, errorBanner: w, successBanner: C, onQuoteNameChange: nt, onRenameReasonChange: Ke, onSave: pt, onClose: Ue }), document.body), u && Qe(e(pn, { open: u, expirationDate: ft, expirationDateError: vt, errorBanner: fe, successBanner: Te, onExpirationDateChange: kt, onSave: Ft, onClose: bt }), document.body)] });
};
eo.displayName = "ManageNegotiableQuoteTemplate";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const to = ({ pageSize: o, showItemRange: a = !0, showPageSizePicker: i = !0, showPagination: r = !0, onViewQuoteTemplate: p, onGenerateQuoteFromTemplate: m, onPageSizeChange: f, onPageChange: v, slots: n, ...t }) => {
  const c = Xe({ view: "QuoteManagement.QuoteTemplatesListTable.view", generateQuote: "NegotiableQuoteTemplate.Manage.actionButtons.generateQuote", generateQuoteModalMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.message", generateQuoteModalCancel: "NegotiableQuoteTemplate.Manage.confirmationModal.cancel", generateQuoteModalConfirm: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.confirm", generateQuoteModalConfirmLoading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.confirmLoading", generateQuoteModalSuccessHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.successHeading", generateQuoteSuccessMessage: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.successDescription", generateQuoteModalErrorHeading: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.errorHeading", generateQuoteErrorFallback: "NegotiableQuoteTemplate.Manage.confirmationModal.generateQuote.errorFallback" }), [h, N] = l(null), [$, T] = l(!0), [q, z] = l(!1), [G, E] = l(!1), [I, F] = l(null), [O, te] = l(""), [S, V] = l(""), B = oa()[0], [de, ee] = l(o || B), [ne, R] = l(1);
  oe(() => {
    const j = async () => {
      try {
        T(!0);
        const A = await In({ pageSize: de, currentPage: ne });
        N(A);
      } catch (A) {
        console.error("Failed to fetch quote templates:", A);
      } finally {
        T(!1);
      }
    }, x = ge.on("authenticated", (A) => {
      A ? j() : (N(null), T(!1));
    }, { eager: !0 });
    return () => {
      x == null || x.off();
    };
  }, [de, ne]);
  const k = (j) => {
    ee(j), R(1), f == null || f(j);
  }, J = (j) => {
    R(j), v == null || v(j);
  }, y = (j) => {
    const x = j.target, A = x == null ? void 0 : x.value;
    A && k(Number(A));
  }, L = (j, x) => {
    F({ id: j, name: x }), te(""), V(""), z(!0);
  }, ve = async (j) => {
    E(!0), te(""), V("");
    try {
      const x = await Pa({ templateId: j.id });
      te(c.generateQuoteSuccessMessage), m == null || m(j.id, j.name, x.quoteId);
    } catch (x) {
      console.error("Failed to generate quote from template:", x);
      const A = x instanceof Error ? x.message : c.generateQuoteErrorFallback;
      V(A);
    } finally {
      E(!1);
    }
  }, ce = () => {
    z(!1), F(null), te(""), V("");
  }, se = (j, x, A) => j.filter((H) => H == null ? void 0 : H.uid).map((H) => {
    var ue;
    return { id: H.id, name: e(b, { name: "Name", slot: x == null ? void 0 : x.Name, context: { template: H }, children: e("span", { children: H.name }) }), state: e(b, { name: "State", slot: x == null ? void 0 : x.State, context: { template: H }, children: e("span", { style: { textTransform: "capitalize" }, children: ((ue = H.state) == null ? void 0 : ue.replace(/_/g, " ")) || "-" }) }), status: e(b, { name: "Status", slot: x == null ? void 0 : x.Status, context: { template: H }, children: e("span", { children: H.status }) }), validUntil: e(b, { name: "ValidUntil", slot: x == null ? void 0 : x.ValidUntil, context: { template: H }, children: e("span", { children: Ae(H.expirationDate, "short") }) }), minQuoteTotal: e(b, { name: "MinQuoteTotal", slot: x == null ? void 0 : x.MinQuoteTotal, context: { template: H }, children: e(be, { amount: H.prices.minNegotiatedGrandTotal.value, currency: H.prices.minNegotiatedGrandTotal.currency }) }), ordersPlaced: e(b, { name: "OrdersPlaced", slot: x == null ? void 0 : x.OrdersPlaced, context: { template: H }, children: e("span", { children: H.ordersPlaced }) }), lastOrdered: e(b, { name: "LastOrdered", slot: x == null ? void 0 : x.LastOrdered, context: { template: H }, children: e("span", { children: Ae(H.lastOrderedAt, "short") }) }), actions: ae(b, { name: "Actions", slot: x == null ? void 0 : x.Actions, context: { template: H, onViewQuoteTemplate: A }, className: "quote-management-quote-templates-list-table__actions-cell", children: [e(Se, { variant: "tertiary", size: "medium", onClick: () => A == null ? void 0 : A(H.id, H.name, H.status), children: c.view }), H.canGenerateQuoteFromTemplate && e(Se, { variant: "primary", size: "medium", onClick: () => L(H.id, H.name), "data-testid": `generate-quote-button-${H.id}`, children: c.generateQuote })] }) };
  }), qe = h != null && h.items ? se(h.items, n, p) : [], Q = h != null && h.paginationInfo ? { ...h.paginationInfo, pageSizeOptions: oa() } : void 0, Y = !!Q, ie = e(b, { name: "EmptyTemplates", slot: n == null ? void 0 : n.EmptyTemplates, context: { templatesData: h }, children: e(wa, { heading: "No Quote Templates Found" }) }), U = Q ? e(b, { name: "ItemRange", slot: n == null ? void 0 : n.ItemRange, context: Q, children: ae("span", { children: ["Items ", Q.startItem, " to ", Q.endItem, " of", " ", Q.totalCount, " total"] }) }) : void 0, pe = Q && Q.pageSizeOptions ? ae(b, { name: "PageSizePicker", slot: n == null ? void 0 : n.PageSizePicker, context: { pageSize: Q.pageSize, pageSizeOptions: Q.pageSizeOptions, onPageSizeChange: k }, children: [e("span", { children: "Show " }), e(Da, { variant: "primary", size: "medium", value: String(Q.pageSize), options: Q.pageSizeOptions.map((j) => ({ value: String(j), text: String(j) })), handleSelect: y }), e("span", { children: " per page" })] }) : void 0, re = Q ? e(b, { name: "Pagination", slot: n == null ? void 0 : n.Pagination, context: { currentPage: Q.currentPage, totalPages: Q.totalPages, onChange: J }, children: e(Ca, { currentPage: Q.currentPage, totalPages: Q.totalPages, onChange: J }) }) : void 0;
  let le = null;
  return O ? le = e(K, { type: "success", variant: "primary", icon: e(Ze, { source: "CheckWithCircle" }), heading: c.generateQuoteModalSuccessHeading, description: O, "data-testid": "generate-quote-success-banner" }) : S && (le = e(K, { type: "error", variant: "primary", icon: e(Ze, { source: "WarningFilled" }), heading: c.generateQuoteModalErrorHeading, description: S, "data-testid": "generate-quote-error-banner" })), ae(We, { children: [e(fn, { rowData: qe, loading: $, className: t.className, emptyStateMessage: ie, showItemRange: a && Y, itemRangeMessage: U, showPageSizePicker: i && Y, pageSizePickerMessage: pe, showPagination: r && Y, paginationMessage: re }), q && Qe(e(Ee, { open: q, title: c.generateQuote, message: c.generateQuoteModalMessage, cancelLabel: c.generateQuoteModalCancel, confirmLabel: G ? c.generateQuoteModalConfirmLoading : c.generateQuoteModalConfirm, onCancel: ce, onConfirm: G || !I ? void 0 : () => ve(I), showCloseButton: !le, confirmationBanner: le, "data-testid": "generate-quote-confirmation-modal" }), document.body)] });
};
to.displayName = "QuoteTemplatesListTable";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(o, a) {
  try {
    if (typeof document < "u") {
      const i = a.styleId;
      if (document.querySelector(`style[data-dropin="${i}"]`)) return;
      const r = document.createElement("style");
      for (const m in a.attributes) r.setAttribute(m, a.attributes[m]);
      r.setAttribute("data-dropin", i), r.appendChild(document.createTextNode(o));
      const p = document.querySelector('style[data-dropin="sdk"]');
      if (p) p.after(r);
      else {
        const m = document.querySelector('link[rel="stylesheet"], style');
        m ? m.before(r) : document.head.append(r);
      }
    }
  } catch (i) {
    console.error("dropin-styles (injectCodeFunction)", i);
  }
})(".request-negotiable-quote-form{display:grid;gap:var(--spacing-small);align-items:flex-end;color:var(--color-neutral-800);width:100%}.request-negotiable-quote-form input:user-invalid,.request-negotiable-quote-form textarea:user-invalid{border-color:var(--color-alert-800)}.request-negotiable-quote-form__title{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.request-negotiable-quote-form__actions,.request-negotiable-quote-form [data-slot=AttachFileField]{display:flex;gap:var(--spacing-small)}.request-negotiable-quote-form__actions{justify-content:flex-start}.request-negotiable-quote-form__attach-file-field{justify-content:end}.request-negotiable-quote-form__attach-file-field label{background:none;color:var(--color-brand-500);font:var(--type-body-1-strong-font)}.request-negotiable-quote-form__attach-file-field label:hover{background:none}.request-negotiable-quote-form__error-banner svg{color:var(--color-alert-800)}.quote-management-actions-bar__container{container-type:inline-size;container-name:actions-bar-container}.quote-management-actions-bar{background:var(--color-neutral-200);padding:var(--spacing-xsmall);display:flex;gap:var(--spacing-small);justify-content:space-between;align-items:center}.quote-management-actions-bar__dropdown{width:max-content}.quote-management-actions-bar__buttons{display:flex}.quote-management-actions-bar__button>span{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}@container actions-bar-container (max-width: 768px){.quote-management-actions-bar{flex-direction:column;align-items:flex-start;gap:var(--spacing-xsmall)}.quote-management-actions-bar__dropdown{width:100%}.quote-management-actions-bar__buttons{flex-direction:column;align-items:flex-start;gap:var(--spacing-xsmall);width:100%}.quote-management-actions-bar__button{width:100%}}.attached-files-list{display:flex;flex-direction:column;gap:var(--spacing-small, 8px);margin:var(--spacing-medium, 16px) 0}.attached-files-list__item{border:1px solid var(--color-neutral-300, #d1d5db);border-radius:var(--border-radius, 4px);padding:var(--spacing-small, 8px) var(--spacing-medium, 12px);background-color:var(--color-neutral-50, #f9fafb);transition:all .2s ease-in-out}.attached-files-list__item--error{border-color:var(--color-error, #ef4444);background-color:var(--color-error-light, #fef2f2)}.attached-files-list__item--success{border-color:var(--color-success, #10b981)}.attached-files-list__item--uploading{opacity:.8}.attached-files-list__item-main{display:flex;align-items:center;gap:var(--spacing-small, 8px)}.attached-files-list__item-icon{display:flex;align-items:center;justify-content:center;width:24px;height:24px;flex-shrink:0}.attached-files-list__spinner{width:20px;height:20px;border:2px solid var(--color-neutral-200, #e5e7eb);border-top-color:var(--color-primary, #3b82f6);border-radius:50%;animation:attached-files-list__spin .8s linear infinite}@keyframes attached-files-list__spin{to{transform:rotate(360deg)}}.attached-files-list__success-icon{color:var(--color-success, #10b981)}.attached-files-list__error-icon{color:var(--color-error, #ef4444)}.attached-files-list__item-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:var(--spacing-xsmall, 4px)}.attached-files-list__item-name{font-weight:var(--font-weight-medium, 500);font-size:var(--font-size-base, 14px);line-height:1.4;color:var(--color-text-primary, #111827);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.attached-files-list__item-size{font-size:var(--font-size-small, 12px);line-height:1.4;color:var(--color-text-secondary, #6b7280)}.attached-files-list__remove-button{flex-shrink:0;padding:var(--spacing-xsmall, 4px);min-width:auto}.attached-files-list__remove-button:disabled{opacity:.5;cursor:not-allowed}.attached-files-list__item-error{margin-top:var(--spacing-small, 8px);padding-left:32px;font-size:var(--font-size-small, 12px);color:var(--color-error, #ef4444);line-height:1.4}@media (max-width: 640px){.attached-files-list__item-name{font-size:var(--font-size-small, 12px)}.attached-files-list__item-size{font-size:var(--font-size-xsmall, 11px)}}.quote-management-items-quoted{display:flex;flex-direction:column;gap:var(--spacing-big)}.quote-management-manage-negotiable-quote{display:grid;gap:var(--spacing-small);color:var(--color-neutral-800);width:100%;container-type:inline-size}.quote-management-manage-negotiable-quote__header{display:flex;gap:var(--spacing-big);align-items:center}.quote-management-manage-negotiable-quote__quote-name>*{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0}.quote-management-manage-negotiable-quote__quote-name-wrapper{display:flex;align-items:center;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote__quote-name-title{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0}.quote-management-manage-negotiable-quote__rename-button{background:none;border:none;padding:var(--spacing-xsmall);cursor:pointer;display:inline-flex;align-items:center}.quote-management-manage-negotiable-quote__rename-button:disabled{cursor:not-allowed;opacity:.5}.quote-management-manage-negotiable-quote__quote-status>*{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);border:2px solid var(--color-neutral-300);padding:var(--spacing-xxsmall)}.quote-management-manage-negotiable-quote__banner{width:100%}.quote-management-manage-negotiable-quote__details{display:flex;flex-direction:row;gap:var(--spacing-xsmall);justify-content:space-between;align-items:center;flex-wrap:wrap}.quote-management-manage-negotiable-quote__detail{display:flex;flex-wrap:wrap;gap:var(--spacing-xxsmall);align-items:baseline}.quote-management-manage-negotiable-quote__detail-title{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing)}.quote-management-manage-negotiable-quote__detail-content{font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing)}.quote-management-manage-negotiable-quote__item-actions{justify-content:flex-start}.quote-management-manage-negotiable-quote__quote-actions{display:flex;justify-content:flex-end;flex-wrap:wrap;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote__shipping-information-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote__shipping-information-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote__quote-comments-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote__quote-comments-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote__attach-files[data-disabled]{opacity:.5;pointer-events:none}.quote-management-manage-negotiable-quote__footer{display:flex;gap:var(--spacing-small);justify-content:flex-start}@container (max-width: 768px){.quote-management-manage-negotiable-quote__header{flex-direction:column}.quote-management-manage-negotiable-quote__action-bar{flex-direction:column;align-items:flex-start}.quote-management-manage-negotiable-quote__quote-actions{justify-content:flex-start}}.quote-order-summary{display:grid;position:relative;grid-auto-flow:row;padding:var(--spacing-medium)}.quote-order-summary__primary{background-color:var(--color-neutral-200)}.quote-order-summary__secondary{background-color:var(--color-neutral-50)}.quote-order-summary__content{display:grid;gap:var(--spacing-xsmall);margin-top:var(--spacing-small)}.quote-order-summary__heading{display:grid;font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);color:var(--color-neutral-800);gap:var(--spacing-small)}.quote-order-summary__discount .quote-order-summary__label,.quote-order-summary__discount .quote-order-summary__price{color:var(--color-warning-800)}.quote-order-summary__taxes .dropin-divider:last-child{margin-bottom:0}.quote-order-summary__total{margin-top:var(--spacing-medium)}.quote-order-summary__heading .quote-order-summary__divider-primary,.quote-order-summary__heading .quote-order-summary__divider-secondary{width:100%;margin:0}.quote-order-summary__divider-secondary{margin:0}.quote-order-summary__taxEntry.quote-order-summary__entry{margin-top:0}.quote-order-summary__entry,.quote-order-summary__taxEntry{display:grid;grid-template-columns:1fr 1fr;gap:var(--spacing-xxsmall);align-items:center;color:var(--color-neutral-800)}.quote-order-summary__caption{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing);grid-column:span 2;color:var(--color-neutral-700)}.quote-order-summary__shipping--edit{display:grid;grid-column:1 / span 2;gap:var(--spacing-small);padding-top:var(--spacing-small);padding-left:var(--spacing-small)}a.quote-order-summary__shippingLink{text-decoration:underline}.quote-order-summary__shipping--hide{display:none!important}.quote-order-summary__shipping--edit button{width:var(--spacing-huge);justify-self:end}.quote-order-summary__shipping--zip,.quote-order-summary__shipping--state{background-color:var(--color-neutral-50)}.quote-order-summary__taxes .dropin-accordion-section__content-container{gap:var(--spacing-small);margin:var(--spacing-small) 0}.quote-order-summary__spinner{margin:0 auto;position:absolute;z-index:999;left:0;right:0;top:calc(50% - (var(--size) / 2));bottom:0}.quote-order-summary__label,.quote-order-summary__price{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.quote-order-summary__price{text-align:right;text-transform:uppercase}.quote-order-summary__label--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-700)}.quote-order-summary__price--muted{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.quote-order-summary__label--bold,.quote-order-summary__price--bold{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing)}.quote-management-product-list-table-container{display:flex;flex-direction:column;gap:var(--spacing-small)}.quote-management-product-list-table__checkbox{align-self:center;justify-self:center}.quote-management-product-list-table__product-name-container{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-product-list-table__product-name{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing)}.quote-management-product-list-table__configurable-option{display:flex;flex-direction:row;gap:var(--spacing-xxsmall)}.quote-management-product-list-table__configurable-option-label{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.quote-management-product-list-table__configurable-option-value{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.quote-management-product-list-table__bundle-option{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-product-list-table__bundle-option-label{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.quote-management-product-list-table__bundle-option-values{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-product-list-table__bundle-option-value{display:flex;flex-direction:row;align-items:center;gap:var(--spacing-xxsmall);font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.quote-management-product-list-table__bundle-option-value-original-price{font:var(--type-details-caption-2-font);letter-spacing:var(--type-details-caption-2-letter-spacing)}.quote-management-product-list-table__sku{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.quote-management-product-list-table__quantity{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);display:block;justify-self:center}.quote-management-product-list-table__quantity-input{width:80px}@media only screen and (max-width: 767px){.quote-management-product-list-table__quantity-input{width:100%;max-width:200px}}.quote-management-product-list-table__discount-container{display:flex;flex-direction:row;flex-wrap:wrap;gap:var(--spacing-xxsmall);align-items:baseline}.quote-management-product-list-table-container__submit-container{display:flex;justify-content:flex-end}td:has(.quote-management-product-list-table__notes-row-wrapper)~td{display:none}.quote-management-product-list-table__notes-row-wrapper{margin-left:calc(var(--spacing-medium) * -1);margin-right:calc(var(--spacing-medium) * -1);margin-top:calc(var(--spacing-small) * -1);margin-bottom:calc(var(--spacing-small) * -1);background-color:var(--color-neutral-100);box-shadow:100vw 0 0 0 var(--color-neutral-100),-100vw 0 0 0 var(--color-neutral-100)}.quote-management-product-list-table__notes-container{padding:var(--spacing-medium)}.quote-management-product-list-table__notes-header{font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-letter-spacing);color:var(--color-neutral-600);margin-bottom:var(--spacing-small);text-transform:uppercase}.quote-management-product-list-table__notes-list{display:flex;flex-direction:column;gap:var(--spacing-small)}.quote-management-product-list-table__note-item{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-product-list-table__note-content{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-800)}.quote-management-product-list-table__note-meta{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);color:var(--color-neutral-800)}.quote-management-product-list-table__note-text{font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-800);padding-left:0}.quote-management-product-list-table__note-edit-icon{cursor:pointer;opacity:.6}.quote-management-product-list-table__note-edit-icon:hover{opacity:1}.quote-management-quote-prices-summary{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing)}.quote-management-quote-prices-summary__entry{display:flex;flex-direction:row;justify-content:space-between;gap:10px;width:100%}.quote-management-quote-prices-summary__accordion,.quote-management-quote-prices-summary__label{flex-grow:1}.quote-management-quote-prices-summary__label--strong{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing)}.quote-management-quote-prices-summary__value{flex-grow:1;text-align:right}.quote-management-quote-summary-list{container-type:inline-size;container-name:quote-summary-list}.quote-management-quote-summary-list__background--secondary{background-color:var(--color-neutral-200)}.quote-management-quote-summary-list__heading{display:grid;row-gap:var(--spacing-xsmall);padding:var(--spacing-medium) 0 0 0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800)}.quote-management-quote-summary-list__heading--full-width{width:100%}.quote-management-quote-summary-list__heading-divider{width:100%;margin:var(--spacing-xxsmall) 0 var(--spacing-medium) 0}.quote-management-quote-summary-list__content{display:grid;grid-template-columns:1fr;padding:0}.quote-management-quote-summary-list__out-of-stock-message{margin:calc(-1 * var(--spacing-xsmall)) 0 var(--spacing-medium) 0}.quote-management-quote-summary-list-footer__action,.quote-management-quote-summary-list-footer__action:focus .quote-management-quote-summary-list-footer__action:active,.quote-management-quote-summary-list-footer__action:link{font:var(--type-body-2-strong-font);margin:0 auto;width:auto;margin-top:var(--spacing-medium);margin-bottom:var(--spacing-medium)}.quote-management-quote-summary-list-footer__action:hover{text-decoration:underline;text-underline-offset:var(--spacing-xxsmall);background:transparent;color:var(--color-brand-700)}.quote-management-quote-summary-list-footer__action:visited{background-color:transparent}.quote-management-quote-summary-list-accordion{border-left:var(--shape-border-width-2) solid var(--color-neutral-400);border-right:var(--shape-border-width-2) solid var(--color-neutral-400)}.quote-management-quote-summary-list-accordion__section{margin:var(--spacing-medium)}.dropin-cart-item__quantity{width:fit-content}@container quote-summary-list (width >= 768px){.quote-management-quote-summary-list__out-of-stock-message{margin:calc(-1 * var(--spacing-small)) 0 var(--spacing-xxbig) 0}}@container quote-summary-list (width >= 1024px){.quote-management-quote-summary-list__content,.quote-management-quote-summary-list__heading{grid-column:1 / span 8}.quote-management-quote-summary-list__heading--full-width{grid-column:1 / span 12}.quote-management-quote-summary-list__content{padding:0}}.quotes-list-table__empty-state{padding:var(--spacing-large);text-align:center;color:var(--color-neutral-600)}.quotes-list-table__footer{display:flex;justify-content:space-between;align-items:center;padding:var(--spacing-medium);border-top:var(--shape-border-width-1) solid var(--color-neutral-200);gap:var(--spacing-medium)}.quotes-list-table__item-range{flex:1;color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.quotes-list-table__pagination{flex:0 0 auto;display:flex;justify-content:center}.quotes-list-table__page-size-picker{flex:1;display:flex;justify-content:flex-end;align-items:center;gap:var(--spacing-small);color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing)}.quotes-list-table__page-size-picker>span{display:inline-flex;align-items:baseline}.quotes-list-table__page-size-picker .dropin-picker{display:inline-flex;align-items:center;margin:0 var(--spacing-xsmall);vertical-align:center}.quotes-list-table__page-size-picker .dropin-picker__select{height:auto;min-height:var(--sizing-medium);line-height:1.2;vertical-align:baseline}.quote-management-quote-templates-list-table,.quote-management-quote-templates-list-table__table{width:100%}.quote-templates-list-table__empty-state{padding:var(--spacing-large);text-align:center}.quote-templates-list-table__footer{display:flex;justify-content:space-between;align-items:center;padding:var(--spacing-medium) 0;gap:var(--spacing-medium);flex-wrap:wrap}.quote-templates-list-table__item-range{display:flex;align-items:center;color:var(--color-neutral-700);font-size:var(--type-body-2-font-size)}.quote-templates-list-table__pagination{display:flex;justify-content:center;flex:1}.quote-templates-list-table__page-size-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);color:var(--color-neutral-700);font-size:var(--type-body-2-font-size)}.quote-management-quote-templates-list-table__actions-cell{display:flex;gap:var(--spacing-xsmall)}.quote-management-quote-templates-list-table__actions-cell>*{white-space:nowrap}.dropin-modal__body.dropin-modal__body--medium{padding:var(--spacing-small)}.confirmation-modal__content{display:flex;flex-direction:column}.confirmation-modal__banner{margin-left:calc(-1 * var(--spacing-small));margin-right:calc(-1 * var(--spacing-small));margin-top:calc(-1 * var(--spacing-small));margin-bottom:var(--spacing-medium)}.confirmation-modal__title{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800);margin-bottom:var(--spacing-medium);padding-bottom:var(--spacing-medium)}.confirmation-modal__message{margin-bottom:var(--spacing-medium);text-align:left;color:var(--color-neutral-800)}.confirmation-modal__actions{display:flex;justify-content:flex-end;gap:var(--spacing-medium);margin-top:var(--spacing-big);margin-right:var(--spacing-small);padding-bottom:var(--spacing-small)}div.dropin-modal__body.dropin-modal__body--medium>div.dropin-modal__content{margin:var(--spacing-small) var(--spacing-small) var(--spacing-small) var(--spacing-small)!important}.dropin-modal:has(.confirmation-modal__banner) .dropin-modal__header,.dropin-modal__body:has(.confirmation-modal__banner) .dropin-modal__header{display:none!important;height:0!important;padding:0!important;margin:0!important}@media only screen and (max-width: 768px){.confirmation-modal__banner .dropin-in-line-alert{padding:var(--spacing-xsmall) var(--spacing-small)!important;gap:var(--spacing-xsmall)!important}.confirmation-modal__actions{flex-direction:column-reverse;gap:var(--spacing-small)}.confirmation-modal__actions button{width:100%}}.quote-management-quote-history-log{padding:var(--spacing-small)}.quote-management-quote-history-log__entries{display:flex;flex-direction:column;gap:var(--spacing-small)}.quote-management-quote-history-log__entry{border:1px solid var(--color-neutral-400);padding:var(--spacing-small);background-color:var(--color-neutral-50)}.quote-management-quote-history-log__entry-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:var(--spacing-xsmall);flex-wrap:wrap;gap:var(--spacing-xsmall)}.quote-management-quote-history-log__entry-meta{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-quote-history-log__entry-date,.quote-management-quote-history-log__entry-author{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing);color:var(--color-neutral-800)}.quote-management-quote-history-log__entry-type{background-color:var(--color-neutral-200);color:var(--color-neutral-800);padding:var(--spacing-xxsmall) var(--spacing-xsmall);font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);white-space:nowrap;border:1px solid var(--color-neutral-300)}.quote-management-quote-history-log__entry-changes{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-quote-history-log__entry-change{font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing);color:var(--color-neutral-700);padding-left:var(--spacing-small);position:relative}.quote-management-quote-history-log__entry-change:before{position:absolute;left:0;color:var(--color-neutral-600);font-weight:700}.quote-management-quote-history-log__empty{text-align:center;color:var(--color-neutral-700);font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);font-style:italic;padding:var(--spacing-big)}@media only screen and (min-width: 768px){.quote-management-quote-history-log__entry-header{flex-wrap:nowrap}.quote-management-quote-history-log__entry-meta{flex-direction:row;gap:var(--spacing-xsmall);align-items:center}}.quote-management-shipping-address-display{display:flex;flex-direction:column;gap:var(--spacing-xsmall);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);color:var(--color-neutral-800)}.quote-management-shipping-address-display__field{margin:0;word-wrap:break-word;overflow-wrap:break-word}.quote-management-shipping-address-display__name{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing)}.quote-management-shipping-address-display--empty{padding:var(--spacing-medium);background-color:var(--color-neutral-50)}.quote-management-shipping-address-display__no-address{margin:0;color:var(--color-neutral-700);font-style:italic}.quote-management-tabbed-content{width:100%}.quote-management-tabbed-content__tabs{display:flex;margin-bottom:-1px}.quote-management-tabbed-content__tab{background:var(--color-neutral-100);color:var(--color-neutral-700);border:solid 1px var(--color-neutral-400);padding:var(--spacing-xsmall) var(--spacing-medium);margin-left:-1px;cursor:pointer;font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing)}.quote-management-tabbed-content__tab:first-child{margin-left:unset}.quote-management-tabbed-content__tab:hover{background:var(--color-neutral-300);color:var(--color-neutral-700)}.quote-management-tabbed-content__tab--active{background:var(--color-neutral-50);color:var(--color-neutral-800);border-bottom:none}.quote-management-tabbed-content__tab--active:hover{background:var(--color-neutral-50);color:var(--color-neutral-800)}.quote-management-tabbed-content__active-tab-content{background:var(--color-neutral-50);padding:var(--spacing-small);border:solid 1px var(--color-neutral-400)}.quote-management-quote-comments-list{list-style:none;padding:0;margin:0}.quote-management-quote-comments-list__empty-state{color:var(--color-neutral-800);font:var(--type-body-2-default-font);letter-spacing:var(--type-body-2-default-letter-spacing);padding:var(--spacing-small) 0;margin:0;list-style:none}.quote-management-quote-comments-list__item{padding:var(--spacing-small) 0;border-bottom:1px solid var(--color-neutral-300)}.quote-management-quote-comments-list__item:last-child{border-bottom:none}.quote-management-quote-comments-list__header{display:flex;align-items:baseline;margin-bottom:var(--spacing-xxsmall);gap:var(--spacing-xxsmall)}.quote-management-quote-comments-list__date,.quote-management-quote-comments-list__by,.quote-management-quote-comments-list__author{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);color:var(--color-neutral-800)}.quote-management-quote-comments-list__date{white-space:nowrap}.quote-management-quote-comments-list__text{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800);margin:0;word-wrap:break-word}.quote-management-quote-comments-list__attachments{margin-top:var(--spacing-xsmall);display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-quote-comments-list__attachments-label{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);color:var(--color-neutral-800);margin-bottom:var(--spacing-xxsmall)}.quote-management-quote-comments-list__attachment-link{font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing);color:var(--color-brand-600);text-decoration:underline;transition:color .2s ease;display:block;padding-left:var(--spacing-small);position:relative}.quote-management-quote-comments-list__attachment-link:hover{color:var(--color-brand-700);text-decoration:underline}.quote-management-quote-comments-list__attachment-link:focus{outline:2px solid var(--color-brand-600);outline-offset:2px}@media only screen and (min-width: 768px){.quote-management-quote-comments-list__item{padding:var(--spacing-medium) 0}}.quote-management-rename-quote-modal__error-banner,.quote-management-rename-quote-modal__success-banner{margin-bottom:var(--spacing-medium)}.quote-management-rename-quote-modal__content{display:flex;flex-direction:column;gap:var(--spacing-medium);margin-bottom:var(--spacing-medium);width:100%}.quote-management-rename-quote-modal__error-text{color:var(--color-alert-800);font:var(--type-body-2-default-font);margin-top:var(--spacing-xsmall)}.quote-management-rename-quote-modal__actions{display:flex;justify-content:flex-start;gap:var(--spacing-small);margin-top:var(--spacing-medium);width:100%}.quote-management-rename-quote-modal__cancel-button{order:1}.quote-management-rename-quote-modal__save-button{order:2}@media only screen and (min-width: 768px) and (max-width: 1023px){.quote-management-rename-quote-modal .dropin-modal__close-button{top:var(--spacing-small);right:var(--spacing-small)}.quote-management-rename-quote-modal__actions{gap:var(--spacing-medium)}}@media only screen and (min-width: 1024px){.quote-management-rename-quote-modal__actions{gap:var(--spacing-medium)}}@media only screen and (max-width: 767px){.quote-management-rename-quote-modal .dropin-modal__close-button{margin:var(--spacing-small)}.quote-management-rename-quote-modal__error-banner .dropin-in-line-alert{padding:var(--spacing-xsmall) var(--spacing-small)!important;gap:var(--spacing-xsmall)!important}.quote-management-rename-quote-modal__content{gap:var(--spacing-small)}.quote-management-rename-quote-modal__actions{flex-direction:column-reverse;gap:var(--spacing-small);margin-top:var(--spacing-small)}.quote-management-rename-quote-modal__actions button{width:100%}.quote-management-rename-quote-modal__cancel-button{order:2}.quote-management-rename-quote-modal__save-button{order:1}}.quote-management-expiration-date-modal__error-banner,.quote-management-expiration-date-modal__success-banner{margin-bottom:var(--spacing-medium)}.dropin-modal__header-title-content{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-800);margin-top:var(--spacing-small);margin-left:var(--spacing-small)}.quote-management-expiration-date-modal__content{display:flex;flex-direction:column;gap:var(--spacing-medium);margin-bottom:var(--spacing-medium);width:100%}.quote-management-expiration-date-modal__actions{display:flex;justify-content:flex-start;gap:var(--spacing-small);margin-top:var(--spacing-medium);width:100%}.quote-management-expiration-date-modal__cancel-button{order:1}.quote-management-expiration-date-modal__save-button{order:2}@media only screen and (min-width: 768px) and (max-width: 1023px){.quote-management-expiration-date-modal .dropin-modal__close-button{top:var(--spacing-small);right:var(--spacing-small)}.quote-management-expiration-date-modal__actions{gap:var(--spacing-medium)}}@media only screen and (min-width: 1024px){.quote-management-expiration-date-modal__actions{gap:var(--spacing-medium)}}@media only screen and (max-width: 767px){.quote-management-expiration-date-modal .dropin-modal__close-button{margin:var(--spacing-small)}.quote-management-expiration-date-modal__error-banner .dropin-in-line-alert{padding:var(--spacing-xsmall) var(--spacing-small)!important;gap:var(--spacing-xsmall)!important}.quote-management-expiration-date-modal__content{gap:var(--spacing-small)}.quote-management-expiration-date-modal__actions{flex-direction:column-reverse;gap:var(--spacing-small);margin-top:var(--spacing-small)}.quote-management-expiration-date-modal__actions button{width:100%}.quote-management-expiration-date-modal__cancel-button{order:2}.quote-management-expiration-date-modal__save-button{order:1}}.quote-management-manage-negotiable-quote-template{display:grid;gap:var(--spacing-small);color:var(--color-neutral-800);width:100%;container-type:inline-size}.quote-management-manage-negotiable-quote-template__header{display:flex;gap:var(--spacing-big);align-items:center}.quote-management-manage-negotiable-quote-template__template-name-wrapper{display:flex;align-items:center;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__template-name-title{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__rename-button{background:none;border:none;padding:var(--spacing-xsmall);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--color-neutral-700)}.quote-management-manage-negotiable-quote-template__rename-button:hover:not(:disabled){color:var(--color-neutral-900)}.quote-management-manage-negotiable-quote-template__rename-button:disabled{cursor:not-allowed;opacity:.5}.quote-management-manage-negotiable-quote-template__expiration-wrapper{display:flex;align-items:center;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__edit-expiration-button{background:none;border:none;padding-left:0;padding-bottom:var(--spacing-xsmall);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:var(--color-neutral-700)}.quote-management-manage-negotiable-quote-template__edit-expiration-button:hover:not(:disabled){color:var(--color-neutral-900)}.quote-management-manage-negotiable-quote-template__edit-expiration-button:disabled{cursor:not-allowed;opacity:.5}.quote-management-manage-negotiable-quote-template__template-status>*{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);border:2px solid var(--color-neutral-300);padding:var(--spacing-xxsmall)}.quote-management-manage-negotiable-quote-template__banner{display:flex;flex-direction:row}.quote-management-manage-negotiable-quote-template__reference-documents h2{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__details{display:flex;flex-direction:row;gap:var(--spacing-xsmall);justify-content:space-between;align-items:center;flex-wrap:wrap}.quote-management-manage-negotiable-quote-template__detail{display:flex;flex-wrap:wrap;gap:var(--spacing-xxsmall);align-items:baseline}.quote-management-manage-negotiable-quote-template__detail-title{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing)}.quote-management-manage-negotiable-quote-template__detail-content{font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing)}.quote-management-manage-negotiable-quote-template__reference-documents-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__reference-documents-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__reference-documents{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-manage-negotiable-quote-template__items-table{width:100%}.quote-management-manage-negotiable-quote-template__comments-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__comments-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__attach-files[data-disabled]{opacity:.5;pointer-events:none}.quote-management-manage-negotiable-quote-template__file-error{color:var(--color-error);font:var(--type-body-2-font);letter-spacing:var(--type-body-2-letter-spacing);margin-top:var(--spacing-xxsmall)}.quote-management-manage-negotiable-quote-template__history-log-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__history-log-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__shipping-information-container{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.quote-management-manage-negotiable-quote-template__shipping-information-title>*{font:var(--type-body-2-emphasized-font);letter-spacing:var(--type-body-2-emphasized-letter-spacing);margin:0}.quote-management-manage-negotiable-quote-template__footer{display:flex;flex-wrap:wrap;gap:var(--spacing-small);justify-content:flex-start}@container (max-width: 768px){.quote-management-manage-negotiable-quote-template__header{flex-direction:column}}.quote-management-line-item-note-modal .dropin-modal__header-title-content{font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);color:var(--color-neutral-800);margin-top:var(--spacing-small);margin-left:var(--spacing-small)}.quote-management-line-item-note-modal__error-banner,.quote-management-line-item-note-modal__success-banner{margin-bottom:var(--spacing-medium)}.quote-management-line-item-note-modal__content{display:flex;flex-direction:column;gap:var(--spacing-medium);margin-bottom:var(--spacing-medium);width:100%}.quote-management-line-item-note-modal__details{width:100%;overflow-x:auto;margin-bottom:var(--spacing-small)}.quote-management-line-item-note-modal__details-table{width:100%}.quote-management-line-item-note-modal__product-info{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.quote-management-line-item-note-modal__product-name,.quote-management-line-item-note-modal__stock,.quote-management-line-item-note-modal__discount{font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);color:var(--color-neutral-800)}.quote-management-line-item-note-modal__product-sku{font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);color:var(--color-neutral-600)}.quote-management-line-item-note-modal__quantity-input{width:100px;min-width:100px;margin:0}.quote-management-line-item-note-modal__quantity-input input{padding:var(--spacing-xsmall) var(--spacing-small);font:var(--type-body-2-default-font);width:100%}.quote-management-line-item-note-modal__table-error{color:var(--color-alert-800);font:var(--type-body-2-default-font);margin-top:var(--spacing-xsmall);padding:var(--spacing-xsmall) var(--spacing-small)}.quote-management-line-item-note-modal__form-field{display:flex;flex-direction:column;gap:var(--spacing-xxsmall);width:100%}.quote-management-line-item-note-modal__error-text{color:var(--color-alert-800);font:var(--type-body-2-default-font);margin-top:var(--spacing-xxsmall)}.quote-management-line-item-note-modal__helper-text{color:var(--color-neutral-600);font:var(--type-body-3-default-font);margin-top:var(--spacing-xxsmall)}.quote-management-line-item-note-modal__actions{display:flex;justify-content:flex-start;gap:var(--spacing-small);margin-top:var(--spacing-medium);width:100%}.quote-management-line-item-note-modal__cancel-button{order:1}.quote-management-line-item-note-modal__confirm-button{order:2}@media only screen and (min-width: 768px) and (max-width: 1023px){.quote-management-line-item-note-modal .dropin-modal__close-button{top:var(--spacing-small);right:var(--spacing-small)}.quote-management-line-item-note-modal__actions{gap:var(--spacing-medium)}}@media only screen and (min-width: 1024px){.quote-management-line-item-note-modal__actions{gap:var(--spacing-medium)}}@media only screen and (max-width: 767px){.quote-management-line-item-note-modal .dropin-modal__close-button{margin:var(--spacing-small)}.quote-management-line-item-note-modal__error-banner .dropin-in-line-alert{padding:var(--spacing-xsmall) var(--spacing-small);gap:var(--spacing-xsmall)}.quote-management-line-item-note-modal__content{gap:var(--spacing-small)}.quote-management-line-item-note-modal__details{overflow-x:auto;-webkit-overflow-scrolling:touch}.quote-management-line-item-note-modal__actions{flex-direction:column-reverse;gap:var(--spacing-small);margin-top:var(--spacing-small)}.quote-management-line-item-note-modal__actions button{width:100%}.quote-management-line-item-note-modal__cancel-button{order:2}.quote-management-line-item-note-modal__confirm-button{order:1}}.quote-management-reference-document-form-modal__error-banner,.quote-management-reference-document-form-modal__success-banner{margin-bottom:var(--spacing-medium)}.quote-management-reference-document-form-modal__content{display:flex;flex-direction:column;gap:var(--spacing-medium);margin-bottom:var(--spacing-medium);width:100%}.quote-management-reference-document-form-modal__error-text{color:var(--color-alert-800);font:var(--type-body-2-default-font);margin-top:var(--spacing-xsmall)}.quote-management-reference-document-form-modal__actions{display:flex;justify-content:flex-start;gap:var(--spacing-small);margin-top:var(--spacing-medium);width:100%}.quote-management-reference-document-form-modal__cancel-button{order:1}.quote-management-reference-document-form-modal__save-button{order:2}@media only screen and (min-width: 768px) and (max-width: 1023px){.quote-management-reference-document-form-modal .dropin-modal__close-button{top:var(--spacing-small);right:var(--spacing-small)}.quote-management-reference-document-form-modal__actions{gap:var(--spacing-medium)}}@media only screen and (min-width: 1024px){.quote-management-reference-document-form-modal__actions{gap:var(--spacing-medium)}}@media only screen and (max-width: 767px){.quote-management-reference-document-form-modal .dropin-modal__close-button{margin:var(--spacing-small)}.quote-management-reference-document-form-modal__error-banner .dropin-in-line-alert{padding:var(--spacing-xsmall) var(--spacing-small)!important;gap:var(--spacing-xsmall)!important}.quote-management-reference-document-form-modal__content{gap:var(--spacing-small)}.quote-management-reference-document-form-modal__actions{flex-direction:column-reverse;gap:var(--spacing-small);margin-top:var(--spacing-small)}.quote-management-reference-document-form-modal__actions button{width:100%}.quote-management-reference-document-form-modal__cancel-button{order:2}.quote-management-reference-document-form-modal__save-button{order:1}}.quote-management-reference-documents-list{margin-bottom:var(--spacing-medium)}.quote-management-reference-documents-list__header{display:flex;align-items:center;gap:var(--spacing-xsmall);margin-bottom:var(--spacing-small)}.quote-management-reference-documents-list__title{font:var(--type-body-1-emphasized-font);letter-spacing:var(--type-body-1-emphasized-letter-spacing);color:var(--color-neutral-800);margin:0}.quote-management-reference-documents-list__info-icon{width:16px;height:16px;color:var(--color-neutral-600)}.quote-management-reference-documents-list__empty{color:var(--color-neutral-600);font:var(--type-body-2-default-font);padding:var(--spacing-small) 0}.quote-management-reference-documents-list__content{display:flex;flex-wrap:wrap;gap:var(--spacing-small)}.quote-management-reference-documents-list__document{display:flex;align-items:center;gap:var(--spacing-small);background-color:var(--color-neutral-100);border-radius:var(--border-radius-medium);border:1px solid var(--color-neutral-200)}.quote-management-reference-documents-list__document-link{color:var(--color-primary-700);text-decoration:none;font:var(--type-body-2-default-font);word-break:break-word}.quote-management-reference-documents-list__document-link:hover{text-decoration:underline}.quote-management-reference-documents-list__document-actions{display:flex;align-items:center;gap:var(--spacing-xsmall);margin-left:auto}.quote-management-reference-documents-list__separator{color:var(--color-neutral-400);font:var(--type-body-2-default-font)}.quote-management-reference-documents-list__edit-button,.quote-management-reference-documents-list__remove-button{padding:var(--spacing-xsmall) var(--spacing-small);font-size:var(--type-body-2-default-font-size)}.quote-management-reference-documents-list__add-button{background-color:var(--color-neutral-100);border:1px solid var(--color-neutral-200);border-radius:var(--border-radius-medium)}@media only screen and (max-width: 767px){.quote-management-reference-documents-list__content{flex-direction:column}.quote-management-reference-documents-list__document{flex-direction:column;align-items:flex-start;width:100%}.quote-management-reference-documents-list__document-actions{margin-left:0;width:100%;justify-content:flex-start}.quote-management-reference-documents-list__add-button{width:100%}}", { styleId: "quote-management" });
export {
  Oa as ItemsQuoted,
  ja as ItemsQuotedTemplate,
  Hn as ManageNegotiableQuote,
  eo as ManageNegotiableQuoteTemplate,
  zn as OrderSummary,
  fo as OrderSummaryLine,
  Ua as QuoteCommentsList,
  Aa as QuoteHistoryLog,
  jn as QuoteSummaryList,
  Wa as QuoteTemplateCommentsList,
  Xa as QuoteTemplateHistoryLog,
  to as QuoteTemplatesListTable,
  Wn as QuotesListTable,
  Rn as RequestNegotiableQuoteForm,
  bo as ShippingAddressDisplay
};
//# sourceMappingURL=containers.js.map
