/*! Copyright 2026 Adobe
All Rights Reserved. */
import { Slot as Ne, classes as ui, VComponent as ce } from "@dropins/tools/lib.js";
import { useText as ni } from "@dropins/tools/i18n.js";
import * as z from "@dropins/tools/preact-bundle.js";
import { jsx as i, useState as b, useCallback as P, jsxs as v, Fragment as pi, useEffect as si, useRef as fi, useMemo as ki } from "@dropins/tools/preact-bundle.js";
import { updateRequisitionList as Pi, s as Q, getCompanyUsers as Ae, getPublicRequisitionListToken as Pe, shareRequisitionListByToken as Ee, i as Si, d as Ie, getAllRequisitionListItems as Me, deleteRequisitionList as ue, sharePublicRequisitionList as De, shareRequisitionListByEmail as ze, enrichRequisitionList as ne, enrichConfigurableProducts as Ve, e as Oe, loadRequisitionListData as Oi, addRequisitionListItemsToCart as Ue, deleteRequisitionListItems as Be, updateRequisitionListItems as Fe, f as je, g as He, getPublicRequisitionList as We, getSharedRequisitionList as $e, importSharedRequisitionList as Qe, h as Ze, addPublicRequisitionListItemsToCart as Ge, c as Je, getRequisitionLists as Bi, moveItemsBetweenRequisitionLists as Ke, copyItemsBetweenRequisitionLists as Ye, a as oe, b as Ui, u as Xe } from "./api.js";
import { events as ei } from "@dropins/tools/event-bus.js";
import { Header as de, ProgressSpinner as _i, InLineAlert as qi, Pagination as pe, Icon as di, Card as Ti, Button as Z, Field as Ri, Input as Ni, TextArea as it, Checkbox as me, Tag as ge, Table as Hi, Modal as et, MultiSelect as tt, Divider as st, Price as xi, Image as nt, Picker as ot } from "@dropins/tools/components.js";
import { h as at } from "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const yi = 10, ae = 3, rt = 40, lt = 255, ct = /^[a-zA-Z0-9\s.,\-_!?'"()&]+$/, Wi = ({ className: e, mode: n, defaultValues: l = { name: "", description: "" }, error: r = null, onSubmit: t, onCancel: o, ...s }) => {
  const [c, u] = b(l), [L, w] = b({ name: !1 }), [k, I] = b(!1), h = ni({ actionCancel: "RequisitionList.RequisitionListForm.actionCancel", actionSave: "RequisitionList.RequisitionListForm.actionSave", requiredField: "RequisitionList.RequisitionListForm.requiredField", nameMinLength: "RequisitionList.RequisitionListForm.nameMinLength", nameInvalidCharacters: "RequisitionList.RequisitionListForm.nameInvalidCharacters", floatingLabel: "RequisitionList.RequisitionListForm.floatingLabel", placeholder: "RequisitionList.RequisitionListForm.placeholder", label: "RequisitionList.RequisitionListForm.label", updateTitle: "RequisitionList.RequisitionListForm.updateTitle", createTitle: "RequisitionList.RequisitionListForm.createTitle", markPublicLabel: "RequisitionList.RequisitionListForm.markPublicLabel" }), y = Si(Q.config), T = (d) => {
    const C = d.trim();
    return C ? C.length < ae ? h.nameMinLength.replace("{min}", ae.toString()) : ct.test(C) ? "" : h.nameInvalidCharacters : h.requiredField;
  }, N = (d) => (C) => {
    const V = C.target;
    u((M) => ({ ...M, [d]: V.value }));
  }, m = (d) => () => {
    w((C) => ({ ...C, [d]: !0 }));
  }, S = (d) => {
    const C = d.target;
    u((V) => ({ ...V, is_public: C.checked }));
  }, q = async (d) => {
    var C;
    if (d.preventDefault(), w({ name: !0, description: !0 }), !(T(c.name) || k)) {
      I(!0);
      try {
        await t({ name: c.name.trim(), description: ((C = c.description) == null ? void 0 : C.trim()) ?? "", ...y ? { is_public: !!c.is_public } : {} });
      } catch {
        I(!1);
      }
    }
  }, R = L.name ? T(c.name) : "", g = n === "update" ? h.updateTitle : h.createTitle;
  return v("div", { ...s, className: ui(["requisition-list-form", e]), children: [v("div", { className: "requisition-list-form__title", children: [g, k ? i("div", { className: ui(["requisition-list-form_progress-spinner", e]), "data-testid": "requisition-list-form-progress-spinner", children: i(_i, { stroke: "4", size: "small" }) }) : null] }), r ? i(qi, { type: "error", className: "requisition-list-form__notification", variant: "secondary", heading: r, "data-testid": "requisition-list-alert" }) : null, v("form", { className: ui(["requisition-list-form__form", e]), onSubmit: q, children: [i(Ri, { error: R, disabled: k, children: i(Ni, { id: "requisition-list-form-name", name: "name", type: "text", floatingLabel: h.floatingLabel, placeholder: h.placeholder, maxLength: rt, value: c.name, onChange: N("name"), onBlur: m("name") }) }), i(Ri, { disabled: k, children: i(it, { id: "requisition-list-form-description", name: "description", label: h.label, placeholder: h.label, maxLength: lt, value: c.description, onChange: N("description"), onBlur: m("description") }) }), y ? i(Ri, { disabled: k, children: i(me, { id: "requisition-list-form-is-public", name: "is_public", label: h.markPublicLabel, "data-testid": "requisition-list-form-is-public", checked: !!c.is_public, onChange: S }) }) : null, v("div", { className: "requisition-list-form__actions", children: [i(Z, { type: "button", variant: "secondary", onClick: o, disabled: k, "data-testid": "requisition-list-form-cancel", children: h.actionCancel }), i(Z, { type: "submit", disabled: k, "data-testid": "requisition-list-form-save", children: h.actionSave })] })] })] });
};
function ut(e, n, l, r) {
  const [t, o] = b(null);
  return { error: t, submit: async (s) => {
    o(null);
    try {
      const c = s.description ?? "", u = e === "update" && n ? await Pi(n, s.name, c, void 0, void 0, void 0, s.is_public) : await Je(s.name, c, s.is_public);
      return u && (l == null || l(u)), u;
    } catch (c) {
      const u = (c == null ? void 0 : c.message) || "Unexpected error";
      return o(u), r == null || r(u), null;
    }
  } };
}
const $i = ({ mode: e, requisitionListUid: n, defaultValues: l = { name: "", description: "" }, onSuccess: r, onError: t, onCancel: o }) => {
  const { error: s, submit: c } = ut(e, n, r, t);
  return i(Wi, { mode: e, defaultValues: l, error: s, onSubmit: async (u) => {
    await c(u);
  }, onCancel: o });
};
$i.displayName = "RequisitionListForm";
let gi = 0;
const he = () => {
  const [e, n] = b(Q.requisitionLists), [l, r] = b(Q.requisitionListsLoading), [t, o] = b(gi);
  return si(() => {
    Q.requisitionLists.length === 0 && !Q.requisitionListsLoading && (oe(!0), Bi(1, 100).then((s) => {
      const c = (s == null ? void 0 : s.items) || [];
      Ui(c), gi++;
    }).catch((s) => {
      console.error("Error fetching requisition lists:", s), Ui([]), gi++;
    }).finally(() => {
      oe(!1);
    }));
  }, []), si(() => {
    const s = ei.on("requisitionLists/data", (u) => {
      u && (Ui(u), gi++, o(gi), n(Q.requisitionLists), r(Q.requisitionListsLoading));
    }), c = ei.on("requisitionList/data", (u) => {
      u && (Xe(u), gi++, o(gi), n([...Q.requisitionLists]), r(Q.requisitionListsLoading));
    });
    return () => {
      s == null || s.off(), c == null || c.off();
    };
  }, []), si(() => {
    t !== gi && (n(Q.requisitionLists), r(Q.requisitionListsLoading), o(gi));
  }, [t]), { lists: e, loading: l };
};
function Qi(e) {
  const [n, l] = b(null), r = ni({ errorCreate: "RequisitionList.RequisitionListAlert.errorCreate", successCreate: "RequisitionList.RequisitionListAlert.successCreate", errorDeleteItem: "RequisitionList.RequisitionListAlert.errorDeleteItem", successDeleteItem: "RequisitionList.RequisitionListAlert.successDeleteItem", errorDeleteReqList: "RequisitionList.RequisitionListAlert.errorDeleteReqList", successDeleteReqList: "RequisitionList.RequisitionListAlert.successDeleteReqList", errorAddToCart: "RequisitionList.RequisitionListAlert.errorAddToCart", successAddToCart: "RequisitionList.RequisitionListAlert.successAddToCart", errorUpdateQuantity: "RequisitionList.RequisitionListAlert.errorUpdateQuantity", successUpdateQuantity: "RequisitionList.RequisitionListAlert.successUpdateQuantity", errorUpdate: "RequisitionList.RequisitionListAlert.errorUpdate", successUpdate: "RequisitionList.RequisitionListAlert.successUpdate", errorMove: "RequisitionList.RequisitionListAlert.errorMove", successMove: "RequisitionList.RequisitionListAlert.successMove", errorAddToRequisitionList: "RequisitionList.RequisitionListAlert.errorAddToRequisitionList", successAddToRequisitionList: "RequisitionList.RequisitionListAlert.successAddToRequisitionList", errorMoveToList: "RequisitionList.RequisitionListAlert.errorMoveToList", successMoveToList: "RequisitionList.RequisitionListAlert.successMoveToList", errorCopyToList: "RequisitionList.RequisitionListAlert.errorCopyToList", successCopyToList: "RequisitionList.RequisitionListAlert.successCopyToList", errorImport: "RequisitionList.RequisitionListAlert.errorImport", errorExport: "RequisitionList.RequisitionListAlert.errorExport", successImport: "RequisitionList.RequisitionListAlert.successImport" }), t = ki(() => ({ ...r, ...e }), [r, e]), o = ki(() => ({ create: { requisitionList: { success: t.successCreate, error: t.errorCreate } }, add: { product: { success: t.successAddToRequisitionList, error: t.errorAddToRequisitionList } }, update: { product: { success: t.successUpdateQuantity, error: t.errorUpdateQuantity }, requisitionList: { success: t.successUpdate, error: t.errorUpdate } }, delete: { product: { success: t.successDeleteItem, error: t.errorDeleteItem }, requisitionList: { success: t.successDeleteReqList, error: t.errorDeleteReqList } }, move: { product: { success: t.successMove, error: t.errorMove } }, moveToList: { product: { success: t.successMoveToList, error: t.errorMoveToList } }, copyToList: { product: { success: t.successCopyToList, error: t.errorCopyToList } }, import: { requisitionList: { success: t.successImport, error: t.errorImport } }, export: { requisitionList: { error: t.errorExport } } }), [t]), s = P((c) => {
    const { type: u, action: L, context: w, skus: k, message: I, listName: h } = c;
    let y = I && I.length > 0 ? I.join(". ") : o[L][w][u];
    h && (y = y.replace("{listName}", h)), l({ type: u, description: y, sku: k == null ? void 0 : k[0] });
    const T = setTimeout(() => {
      l(null);
    }, 5e3);
    return () => clearTimeout(T);
  }, [o]);
  return { alert: n, setAlert: l, handleRequisitionListAlert: s };
}
const wi = (e) => {
  window.location.href = e;
};
function dt(e, n, l) {
  const r = ni({ actionRename: "RequisitionList.RequisitionListView.actionRename", actionDeleteList: "RequisitionList.RequisitionListView.actionDeleteList", statusPublic: "RequisitionList.RequisitionListView.statusPublic" }), t = Si(Q.config), [o, s] = b(null), [c, u] = b(!1), [L, w] = b(!1), k = P(() => {
    l && l(), u(!0);
  }, [l]), I = P(() => u(!1), []), h = ki(() => {
    if (e) return { handleOpenRenameModal: (m) => {
      u((S) => S && !1), e.handleOpenRenameModal(m);
    }, handleOpenDeleteModal: (m) => {
      u((S) => S && !1), e.handleOpenDeleteModal(m);
    } };
  }, [e]), y = P(async (m, S) => {
    var q, R, g;
    w(!0);
    try {
      const d = await Bi(m, S), C = ((q = d == null ? void 0 : d.page_info) == null ? void 0 : q.current_page) ?? 1, V = ((R = d == null ? void 0 : d.page_info) == null ? void 0 : R.total_pages) ?? 0;
      if (!((((g = d == null ? void 0 : d.items) == null ? void 0 : g.length) ?? 0) > 0) && C > 1 && V >= C - 1) {
        const M = C - 1, K = await Bi(M, S);
        s(K);
      } else s(d);
    } finally {
      w(!1);
    }
  }, []);
  si(() => {
    const m = ei.on("requisitionLists/data", (S) => {
      S && S.items && s(S);
    }, { eager: !0 });
    return () => {
      m == null || m.off();
    };
  }, []), si(() => {
    o || y(1, yi);
  }, [o, y]);
  const T = P((m) => {
    var S, q;
    const R = m ?? ((S = o == null ? void 0 : o.page_info) == null ? void 0 : S.current_page) ?? 1, g = ((q = o == null ? void 0 : o.page_info) == null ? void 0 : q.page_size) ?? yi;
    return y(R, g);
  }, [y, o]), N = P(async (m) => {
    await y(1, m);
  }, [y]);
  return { rows: ki(() => ((o == null ? void 0 : o.items) ?? []).map((m) => ({ name: v("div", { className: "requisition-list-grid-wrapper__name", children: [v("div", { className: "requisition-list-grid-wrapper__name__title", children: [i("a", { href: "#", onClick: (S) => {
    if (S.preventDefault(), n) {
      const q = n(m.uid);
      typeof q == "string" && wi(q);
    }
  }, children: m.name }), t && m.is_public && i("span", { "data-testid": "public-status-tag", children: i(ge, { label: r.statusPublic }) })] }), m.description && i("div", { className: "requisition-list-grid-wrapper__name__description", children: m.description })] }), items_count: m.items_count, last_updated: new Date(m.updated_at).toLocaleString(), actions: v("div", { className: "requisition-list-grid-wrapper__actions", children: [i(Z, { variant: "tertiary", type: "button", "data-testid": "rename-button", onClick: () => h == null ? void 0 : h.handleOpenRenameModal(m), children: r.actionRename }), i(Z, { variant: "tertiary", type: "button", "data-testid": "delete-button", onClick: () => h == null ? void 0 : h.handleOpenDeleteModal(m), children: r.actionDeleteList })] }) })), [o == null ? void 0 : o.items, r.actionRename, r.actionDeleteList, r.statusPublic, t, h, n]), isLoading: L || !o, pageInfo: o == null ? void 0 : o.page_info, totalCount: o == null ? void 0 : o.total_count, handlePageChange: T, handlePageSizeChange: N, isAdding: c, handleAddNew: k, handleCancelCreate: I };
}
function pt() {
  const [e, n] = b(null), [l, r] = b(/* @__PURE__ */ new Set()), t = P((c, u) => {
    r((L) => {
      const w = new Set(L);
      return u ? w.add(c) : w.delete(c), w;
    });
  }, []), o = P(() => {
    var c;
    const u = (c = e == null ? void 0 : e.items) == null ? void 0 : c.map((L) => L.uid);
    r(new Set(u));
  }, [e]), s = P(() => {
    r(/* @__PURE__ */ new Set());
  }, []);
  return { currentRequisitionList: e, setCurrentRequisitionList: n, selectedItems: l, setSelectedItems: r, handleItemSelection: t, handleSelectAll: o, handleSelectNone: s };
}
function re() {
  const e = Q.config;
  return e ? e.is_requisition_list_active === "1" && e.company_enabled === !0 : !1;
}
const Zi = () => {
  const [e, n] = b(re);
  return si(() => {
    const l = ei.on("requisitionList/initialized", () => {
      const r = re();
      n((t) => Q.config != null ? r : t);
    });
    return () => l == null ? void 0 : l.off();
  }, []), { isEnabled: e };
};
function mt({ sourceListUid: e, selectedItems: n, currentPageSize: l, currentPage: r, enrichConfigurableProductsInList: t, fetchAndMergeProducts: o, setCurrentRequisitionList: s, setSelectedItems: c, handleRequisitionListAlert: u, beginLoad: L }) {
  const [w, k] = b(!1), [I, h] = b(!1), y = fi(null), [T, N] = b(!1), [m, S] = b(!1), q = ni({ successMoveToList: "RequisitionList.RequisitionListAlert.successMoveToList", successCopyToList: "RequisitionList.RequisitionListAlert.successCopyToList" }), R = P(async (d) => {
    var C;
    if (n.size === 0) return;
    const V = L();
    y.current = V, h(!0);
    try {
      const M = await Ke(e, d, Array.from(n), l, r, V.signal);
      if (V.signal.throwIfAborted(), M != null && M.sourceList) {
        const K = await t(M.sourceList, V.signal), Y = await o(K, V.signal);
        V.signal.throwIfAborted(), s(Y), c(/* @__PURE__ */ new Set());
        const B = ((C = M.destinationList) == null ? void 0 : C.name) || "";
        u({ action: "moveToList", type: "success", context: "product", message: [q.successMoveToList.replace("{listName}", B)] });
      } else u({ action: "moveToList", type: "error", context: "product" });
    } catch {
      if (V.signal.aborted) return;
      u({ action: "moveToList", type: "error", context: "product" });
    } finally {
      y.current === V && (h(!1), k(!1));
    }
  }, [n, e, l, r, t, o, s, c, u, q.successMoveToList, L]), g = P(async (d) => {
    if (n.size !== 0) {
      S(!0);
      try {
        const C = await Ye(e, d, Array.from(n));
        if (C != null && C.destinationList) {
          c(/* @__PURE__ */ new Set());
          const V = C.destinationList.name || "";
          u({ action: "copyToList", type: "success", context: "product", message: [q.successCopyToList.replace("{listName}", V)] });
        } else u({ action: "copyToList", type: "error", context: "product" });
      } catch {
        u({ action: "copyToList", type: "error", context: "product" });
      } finally {
        S(!1), N(!1);
      }
    }
  }, [n, e, c, u, q.successCopyToList]);
  return { showMoveToListModal: w, setShowMoveToListModal: k, movingToList: I, showCopyToListModal: T, setShowCopyToListModal: N, copyingToList: m, handleMoveToList: R, handleCopyToList: g };
}
function gt(e, n, l) {
  return P(async (r) => {
    var t, o;
    try {
      const s = await Pi(r.uid, r.name, r.description, (t = r.page_info) == null ? void 0 : t.page_size, (o = r.page_info) == null ? void 0 : o.current_page, l, !r.is_public);
      s ? e(s) : n();
    } catch {
      n();
    }
  }, [e, n, l]);
}
const ht = ({ className: e, isLoading: n = !1, header: l, rows: r = [], skeletonRowCount: t = 10, pageInfo: o, totalCount: s = 0, handlePageChange: c, handlePageSizeChange: u, defaultPageSize: L = 10, isAdding: w, handleAddNew: k, handleCancelCreate: I, ...h }) => {
  const y = ni({ name: "RequisitionList.RequisitionListWrapper.name", itemsCount: "RequisitionList.RequisitionListWrapper.itemsCount", lastUpdated: "RequisitionList.RequisitionListWrapper.lastUpdated", actions: "RequisitionList.RequisitionListWrapper.actions", emptyList: "RequisitionList.RequisitionListWrapper.emptyList", show: "RequisitionList.PageSizePicker.show" }), T = ((o == null ? void 0 : o.total_pages) ?? 0) > 0, N = !n && r.length === 0 && !T, { alert: m, setAlert: S, handleRequisitionListAlert: q } = Qi();
  return si(() => {
    const R = ei.on("requisitionList/alert", q);
    try {
      const g = localStorage.getItem("requisitionListPendingAlert");
      if (g) {
        const d = JSON.parse(g);
        q(d), localStorage.removeItem("requisitionListPendingAlert");
      }
    } catch {
    }
    return () => {
      R == null || R.off();
    };
  }, [q]), v("div", { ...h, className: ui(["requisition-list-grid-wrapper", e]), "data-testid": "requisition-list-grid-wrapper", children: [l && i("div", { className: ui(["requisition-list-grid-wrapper__header", e]), "data-testid": "requisition-list-grid-wrapper-header", children: i(ce, { node: l }) }), m && i("div", { className: "requisition-list__alert-wrapper", children: i(qi, { heading: m.description, type: m.type, variant: "primary", onDismiss: () => S(null) }) }), N ? i(Gi, { textContent: y.emptyList }) : v(pi, { children: [i(Hi, { columns: [{ key: "name", label: y.name }, { key: "items_count", label: y.itemsCount }, { key: "last_updated", label: y.lastUpdated }, { key: "actions", label: y.actions }], rowData: r, loading: n, skeletonRowCount: t }), o && v("div", { className: ui(["requisition-list-grid-wrapper__pagination", e]), children: [i(Le, { pageInfo: o, totalCount: s }), (o.total_pages || 0) > 1 && i(pe, { totalPages: o.total_pages, currentPage: o.current_page || 1, onChange: c, disabled: n }), v("div", { className: "requisition-list-grid-wrapper__pagination-picker", children: [i("span", { children: y.show }), i(ve, { currentPageSize: o.page_size || L, onPageSizeChange: u || (() => Promise.resolve()), disabled: n })] })] })] }), i("div", { className: ui(["requisition-list-grid-wrapper__add-new", e]), children: w ? i(Ti, { variant: "secondary", children: i($i, { mode: "create", onSuccess: async () => {
    await c(), I(), q({ type: "success", action: "create", context: "requisitionList" });
  }, onError: () => {
    q({ type: "error", action: "create", context: "requisitionList" });
  }, onCancel: I }) }) : i(be, { onAddNew: k }) })] });
}, qt = (e) => z.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, z.createElement("g", { id: "Large" }, z.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), z.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, z.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), z.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" })))), bt = (e) => z.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, z.createElement("g", { clipPath: "url(#clip0_102_196)" }, z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), z.createElement("defs", null, z.createElement("clipPath", { id: "clip0_102_196" }, z.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" })))), vt = (e) => z.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M7.74512 9.87701L12.0001 14.132L16.2551 9.87701", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), Ai = (e) => z.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, z.createElement("rect", { x: 4.89282, y: 2.75, width: 14.2143, height: 18.5, rx: 2.25, stroke: "currentColor", strokeWidth: 1 }), z.createElement("line", { x1: 9.85718, y1: 7.67871, x2: 16.2857, y2: 7.67871, stroke: "currentColor", strokeWidth: 1 }), z.createElement("line", { x1: 9.85718, y1: 11.9644, x2: 16.2857, y2: 11.9644, stroke: "currentColor", strokeWidth: 1 }), z.createElement("line", { x1: 9.85718, y1: 16.25, x2: 16.2857, y2: 16.25, stroke: "currentColor", strokeWidth: 1 }), z.createElement("circle", { cx: 7.71429, cy: 7.71429, r: 0.714286, fill: "currentColor" }), z.createElement("circle", { cx: 7.71429, cy: 11.9999, r: 0.714286, fill: "currentColor" }), z.createElement("circle", { cx: 7.71429, cy: 16.2856, r: 0.714286, fill: "currentColor" })), Lt = (e) => z.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, z.createElement("path", { d: "M17.3332 11.75H6.6665", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", fill: "none", stroke: "currentColor" })), ft = (e) => z.createElement("svg", { id: "Icon_Search_Base", "data-name": "Icon \\u2013 Search \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, fill: "none", viewBox: "0 0 24 24", ...e }, z.createElement("g", { id: "Large" }, z.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), z.createElement("g", { id: "Search_icon", "data-name": "Search icon", transform: "translate(3.75 3.75)" }, z.createElement("circle", { vectorEffect: "non-scaling-stroke", id: "Ellipse_186", "data-name": "Ellipse 186", cx: 6, cy: 6, r: 6, fill: "none", stroke: "currentColor" }), z.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_556", "data-name": "Line 556", x2: 6, y2: 6, transform: "translate(10.5 10.5)", fill: "none", stroke: "currentColor" })))), qe = (e) => z.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...e }, z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1 5H23", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), z.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 })), be = ({ selectable: e, className: n, onAddNew: l }) => {
  const r = ni({ addNewReqListBtn: "RequisitionList.AddNewReqList.addNewReqListBtn" });
  return v("button", { type: "button", "aria-label": r.addNewReqListBtn, role: "button", className: ui(["requisition-list-actions", ["requisition-list-actions--selectable", e], n]), "data-testid": "requisition-list-actions-button", onClick: l, children: [i("span", { className: "requisition-list-actions__title", "data-testid": "requisition-list-actions-button-text", children: r.addNewReqListBtn }), i(di, { source: qt, size: "32" })] });
}, hi = ({ isOpen: e, isLoading: n, title: l, modalContent: r, closeBtnCaption: t, confirmBtnCaption: o, handleModalOnClose: s, handleModalOnConfirm: c }) => e ? i(et, { className: "requisition-list-modal--overlay", "data-testid": "requisition-list-modal", size: "medium", centered: !1, title: l, onClose: s, backgroundDim: !0, clickToDismiss: !0, escapeToDismiss: !0, role: "dialog", "aria-label": l, children: v("div", { className: "requisition-list-modal", children: [n ? i("div", { className: "requisition-list-modal__spinner", "data-testid": "progress-spinner", children: i(_i, { stroke: "4", size: "large" }) }) : null, i("p", { children: r }), v("div", { className: "requisition-list-modal__buttons", children: [s && t && i(Z, { "data-testid": "rl-modal-close-button", type: "button", onClick: s, variant: "secondary", disabled: n, children: t }), c && o && i(Z, { "data-testid": "rl-modal-confirm-button", type: "button", onClick: c, disabled: n, children: o })] })] }) }) : null, _t = ({ name: e, description: n, showPublicTag: l, publicTagLabel: r, exportAction: t, backLink: o, actions: s, className: c, ...u }) => v("div", { ...u, className: `requisition-list-header ${c || ""}`, children: [o && i("div", { className: "requisition-list-header__back", children: v("a", { href: o.url, className: "requisition-list-header__back-link", onClick: o.onClick, children: [i("span", { className: "requisition-list-header__back-arrow", children: "<" }), o.label] }) }), v("div", { className: "requisition-list-header__main", children: [v("div", { className: "requisition-list-header__title-section", children: [i("h1", { className: "requisition-list-header__title", children: e }), n && i("p", { className: "requisition-list-header__description", children: n }), l && i("span", { "data-testid": "public-status-tag", children: i(ge, { label: r, className: "requisition-list-header__public-tag" }) })] }), ((s == null ? void 0 : s.onRename) || (s == null ? void 0 : s.onDelete) || (s == null ? void 0 : s.onShare) || (s == null ? void 0 : s.onTogglePublic) || (s == null ? void 0 : s.shareDisabled) || t) && v("div", { className: "requisition-list-header__actions", children: [t && i("a", { href: "#", className: `requisition-list-header__action-link${t.loading ? " requisition-list-header__action-link--disabled" : ""}`, "data-testid": "export-list-btn", "aria-disabled": t.loading, "aria-busy": t.loading, onClick: (L) => {
  L.preventDefault(), t.loading || t.onClick();
}, children: t.loading ? t.loadingLabel : t.label }), ((s == null ? void 0 : s.onShare) || (s == null ? void 0 : s.shareDisabled)) && i("a", { href: "#", onClick: (L) => {
  var w;
  L.preventDefault(), !s.shareDisabled && ((w = s.onShare) == null || w.call(s));
}, className: `requisition-list-header__action-link ${s.shareDisabled ? "requisition-list-header__action-link--disabled" : ""}`, "data-testid": "share-list-btn", "aria-disabled": s.shareDisabled ? "true" : "false", "aria-label": s.shareDisabled && s.shareDisabledReason ? `${s.shareLabel} – ${s.shareDisabledReason}` : void 0, "data-disabled-reason": s.shareDisabled ? s.shareDisabledReason : void 0, children: s.shareLabel }), (s == null ? void 0 : s.onRename) && i("a", { href: "#", onClick: (L) => {
  var w;
  L.preventDefault(), (w = s.onRename) == null || w.call(s);
}, className: "requisition-list-header__action-link", "data-testid": "rename-list-btn", children: s.renameLabel }), (s == null ? void 0 : s.onDelete) && i("a", { href: "#", onClick: (L) => {
  var w;
  L.preventDefault(), (w = s.onDelete) == null || w.call(s);
}, className: "requisition-list-header__action-link", "data-testid": "delete-list-btn", children: s.deleteLabel }), (s == null ? void 0 : s.onTogglePublic) && i("a", { href: "#", onClick: (L) => {
  var w;
  L.preventDefault(), (w = s.onTogglePublic) == null || w.call(s);
}, className: "requisition-list-header__action-link", "data-testid": "toggle-public-list-btn", "aria-pressed": !!s.isPublic, children: s.isPublic ? s.makePrivateLabel : s.makePublicLabel })] })] })] }), Gi = ({ className: e, textContent: n, ...l }) => v("div", { className: ui(["empty-list", e]), "data-testid": "empty-list", ...l, children: [i(di, { source: Ai, size: "64", stroke: "2" }), n && i("h4", { children: n })] }), Fi = ({ className: e, title: n = "404 - Not Found", message: l = "The requisition list you are looking for does not exist.", actionLabel: r, onAction: t, ...o }) => v("div", { className: ui(["not-found", e]), "data-testid": "not-found", ...o, children: [i(di, { source: ft, size: "64", stroke: "2" }), i("h2", { children: n }), l && i("p", { children: l }), r && t && i(Z, { variant: "primary", onClick: t, children: r })] }), yt = ({ className: e, items: n, selectedItems: l, currentPage: r, pageSize: t, canEdit: o = !0, handleItemSelection: s, handleUpdateQuantity: c, onAddToCart: u, onDeleteItem: L, useParentConfigurableThumbnail: w = !1, ...k }) => {
  const [I, h] = b({}), [y, T] = b({}), N = ni({ productNameHeader: "RequisitionList.RequisitionListView.productListTable.headers.productName", skuHeader: "RequisitionList.RequisitionListView.productListTable.headers.sku", priceHeader: "RequisitionList.RequisitionListView.productListTable.headers.price", quantityHeader: "RequisitionList.RequisitionListView.productListTable.headers.quantity", subtotalHeader: "RequisitionList.RequisitionListView.productListTable.headers.subtotal", actionsHeader: "RequisitionList.RequisitionListView.productListTable.headers.actions", actionAddToCart: "RequisitionList.RequisitionListView.actionAddToCart", actionDelete: "RequisitionList.RequisitionListView.actionDelete", actionSelect: "RequisitionList.RequisitionListView.actionSelect", itemQuantity: "RequisitionList.RequisitionListView.productListTable.itemQuantity", outOfStock: "RequisitionList.RequisitionListView.productListTable.outOfStock", onlyXLeftInStock: "RequisitionList.RequisitionListView.productListTable.onlyXLeftInStock" }), m = [{ label: "#", key: "index" }, { label: "item", key: "item" }, { label: N.priceHeader, key: "price" }, { label: N.quantityHeader, key: "quantity" }, { label: N.subtotalHeader, key: "subtotal" }];
  o && (m.unshift({ label: N.actionSelect, key: "selector" }), m.push({ label: N.actionsHeader, key: "actions" }));
  const S = (a, _) => {
    const E = a.target.checked;
    s(_.uid, E);
  }, q = (a) => (r - 1) * t + a + 1, R = (a) => {
    var _, E;
    return ((_ = a.configured_product) == null ? void 0 : _.name) || ((E = a.product) == null ? void 0 : E.name) || a.sku;
  }, g = (a) => {
    var _, E, H, W, x, p;
    return !w && (E = (_ = a.configured_product) == null ? void 0 : _.images) != null && E.length ? ((H = a.configured_product.images[0]) == null ? void 0 : H.url) || "" : (x = (W = a.product) == null ? void 0 : W.images) != null && x.length && ((p = a.product.images[0]) == null ? void 0 : p.url) || "";
  }, d = (a) => {
    var _;
    return ((_ = a.product) == null ? void 0 : _.name) || a.sku;
  }, C = (a) => {
    var _;
    return (_ = a.configurable_options) != null && _.length ? a.configurable_options.map((E) => `${E.option_label}: ${E.value_label}`).join(", ") : "";
  }, V = (a) => a.bundle_options ? a.bundle_options.map((_, E) => v("span", { className: "requisition-list-view-product-list-table__product-configurable-name", children: [_.values[0].label, " x ", _.values[0].quantity] }, _.values[0].label || E)) : void 0, M = (a) => {
    var _;
    return ((_ = a.configured_product) == null ? void 0 : _.sku) || a.sku;
  }, K = (a) => {
    var _, E, H, W, x, p, O, $;
    return Array.isArray(a.bundle_options) && a.bundle_options.length > 0 ? a.bundle_options.reduce((ci, mi) => {
      var bi, vi, U;
      return ci + (((vi = (bi = mi.values[0]) == null ? void 0 : bi.priceV2) == null ? void 0 : vi.value) || 0) * (((U = mi.values[0]) == null ? void 0 : U.quantity) || 0);
    }, 0) : ((W = (H = (E = (_ = a.configured_product) == null ? void 0 : _.price) == null ? void 0 : E.final) == null ? void 0 : H.amount) == null ? void 0 : W.value) || (($ = (O = (p = (x = a.product) == null ? void 0 : x.price) == null ? void 0 : p.final) == null ? void 0 : O.amount) == null ? void 0 : $.value) || 0;
  }, Y = (a) => {
    var _, E, H, W, x, p, O, $;
    return ((W = (H = (E = (_ = a.configured_product) == null ? void 0 : _.price) == null ? void 0 : E.final) == null ? void 0 : H.amount) == null ? void 0 : W.currency) || (($ = (O = (p = (x = a.product) == null ? void 0 : x.price) == null ? void 0 : p.final) == null ? void 0 : O.amount) == null ? void 0 : $.currency);
  }, B = (a) => {
    var _, E, H, W, x, p, O, $;
    return Array.isArray(a.bundle_options) && a.bundle_options.length > 0 ? a.bundle_options.reduce((ci, mi) => {
      var bi, vi, U;
      return ci + (((vi = (bi = mi.values[0]) == null ? void 0 : bi.original_price) == null ? void 0 : vi.value) || 0) * (((U = mi.values[0]) == null ? void 0 : U.quantity) || 0);
    }, 0) : ((W = (H = (E = (_ = a.configured_product) == null ? void 0 : _.price) == null ? void 0 : E.regular) == null ? void 0 : H.amount) == null ? void 0 : W.value) || (($ = (O = (p = (x = a.product) == null ? void 0 : x.price) == null ? void 0 : p.regular) == null ? void 0 : O.amount) == null ? void 0 : $.value) || 0;
  }, G = (a) => {
    const _ = B(a);
    return _ > 0 && K(a) < _;
  }, li = (a) => K(a) * a.quantity, ri = (a) => B(a) * a.quantity, oi = (a, _) => {
    const E = +a.target.value;
    E > 0 && !Number.isNaN(a.target.value) && T((H) => ({ ...H, [_.uid]: E }));
  }, ai = async (a, _) => {
    const E = +a.target.value;
    if (!(E > 0 && E !== _.quantity)) {
      T((H) => ({ ...H, [_.uid]: _.quantity }));
      return;
    }
    h((H) => ({ ...H, [_.uid]: !0 }));
    try {
      await c(_.uid, E);
    } finally {
      h((H) => ({ ...H, [_.uid]: !1 }));
    }
  }, D = n.map((a, _) => ({ selector: i("label", { id: `item-selector-${a.sku}-label`, children: i(me, { className: "requisition-list-view-product-list-table__checkbox", name: `item-selector-${a.sku}`, "aria-label": `${N.actionSelect} ${d(a)}`, "data-testid": `item-checkbox-${a.sku}`, onChange: (E) => S(E, a), value: a.sku, checked: l.has(a.uid) }) }), index: i("div", { className: "requisition-list-view-product-list-table__index-container", children: q(_) }), item: v("div", { className: "requisition-list-view-product-list-table__item-container", children: [i(nt, { className: "requisition-list-view-product-list-table__thumbnail", alt: R(a), src: g(a) }), v("div", { className: "requisition-list-view-product-list-table__item-details", children: [i("div", { className: "requisition-list-view-product-list-table__product-name", children: d(a) }), C(a) && i("div", { className: "requisition-list-view-product-list-table__options", children: C(a) }), a.stock_status === "OUT_OF_STOCK" && i("div", { className: "requisition-list-view-product-list-table__out-of-stock", children: N.outOfStock }), a.stock_status !== "OUT_OF_STOCK" && a.only_x_left_in_stock !== null && a.only_x_left_in_stock < a.quantity && i("div", { className: "requisition-list-view-product-list-table__low-stock", children: N.onlyXLeftInStock.replace("{count}", String(a.only_x_left_in_stock)) }), V(a), i("div", { className: "requisition-list-view-product-list-table__sku", children: M(a) })] })] }), price: v("span", { className: "requisition-list-view-product-list-table__discount-container", children: [i(xi, { className: ui(["requisition-list-view-product-list-table__price", G(a) ? "strikethrough" : ""]), amount: B(a) || K(a), currency: Y(a) }), G(a) && i(xi, { className: "requisition-list-view-product-list-table__discounted-price", amount: K(a), currency: Y(a) })] }), quantity: i("span", { className: "requisition-list-view-product-list-table__quantity", children: i(Ri, { disabled: !!I[a.uid], children: i(Ni, { id: `requisition-list-item-quantity-${a.sku}`, "data-testid": `requisition-list-item-quantity-${a.sku}`, name: "quantity", type: "text", "aria-label": `${N.itemQuantity} - ${d(a)}`, value: y[a.uid] ?? a.quantity, onChange: (E) => oi(E, a), onBlur: (E) => ai(E, a) }) }) }), subtotal: v("span", { className: "requisition-list-view-product-list-table__discount-container", children: [i(xi, { className: ui(["requisition-list-view-product-list-table__price", G(a) ? "strikethrough" : ""]), amount: ri(a) || li(a), currency: Y(a) }), G(a) && i(xi, { className: "requisition-list-view-product-list-table__discounted-price", amount: li(a), currency: Y(a) })] }), actions: v("div", { className: "requisition-list-view__bulk-actions", children: [i(Z, { type: "button", onClick: () => u([a.uid]), icon: i(di, { source: bt }), "aria-label": `${N.actionAddToCart} - ${d(a)}`, "data-testid": "product-list-table-add-to-cart-button" }), i(Z, { type: "button", variant: "secondary", icon: i(di, { source: qe }), onClick: () => L([a.uid]), "aria-label": `${N.actionDelete} - ${d(a)}`, "data-testid": "product-list-table-delete-button" })] }) })), j = i(Hi, { columns: m, rowData: D, "data-testid": "product-list-table", mobileLayout: "stacked" });
  return i(ce, { node: at("div", {}), className: ui(["requisition-list-view-product-list-table-container", e]), "data-testid": "product-list-table-container", ...k, children: j });
}, wt = ({ selectedItems: e, deletingItemId: n, addingToCartItemId: l, bulkAddingToCart: r, updatingQuantityItemId: t, bulkMovingToList: o = !1, bulkCopyingToList: s = !1, onSelectAll: c, onSelectNone: u, onBulkAddToCart: L, onBulkDelete: w, onBulkMoveToList: k, onBulkCopyToList: I }) => {
  const h = ni({ statusDeleting: "RequisitionList.RequisitionListView.statusDeleting", actionSelectAll: "RequisitionList.RequisitionListView.actionSelectAll", actionSelectNone: "RequisitionList.RequisitionListView.actionSelectNone", actionAddToCart: "RequisitionList.RequisitionListView.actionAddToCart", actionDeleteSelectedItems: "RequisitionList.RequisitionListView.actionDeleteSelectedItems", statusBulkAddingToCart: "RequisitionList.RequisitionListView.statusBulkAddingToCart", actionMoveToList: "RequisitionList.RequisitionListView.actionMoveToList", actionCopyToList: "RequisitionList.RequisitionListView.actionCopyToList" }), y = n !== null || l !== null || r || t !== null || o || s, T = e.size > 0;
  return v("div", { className: "requisition-list-view__batch-actions", children: [v("div", { className: "requisition-list-view__batch-actions-left", children: [i("button", { "data-testid": "bulk-actions-select-toggle-btn", type: "button", className: `requisition-list-view__batch-actions-select-toggle ${T ? "requisition-list-view__batch-actions-select-toggle--active" : ""}`, onClick: T ? u : c, disabled: y, "aria-label": T ? h.actionSelectNone : h.actionSelectAll, children: i(di, { source: Lt }) }), i("button", { type: "button", className: "requisition-list-view__batch-actions-select-label", onClick: T ? u : c, disabled: y, children: h.actionSelectAll })] }), T && v("div", { className: "requisition-list-view__batch-actions-buttons", children: [i("span", { className: "requisition-list-view__batch-actions-count-badge", "aria-label": `${e.size} items selected`, children: e.size }), k && i(Z, { "data-testid": "bulk-actions-move-to-list-btn", type: "button", variant: "secondary", onClick: k, disabled: y, children: h.actionMoveToList }), I && i(Z, { "data-testid": "bulk-actions-copy-to-list-btn", type: "button", variant: "secondary", onClick: I, disabled: y, children: h.actionCopyToList }), i(Z, { "data-testid": "bulk-actions-add-to-cart-btn", type: "button", variant: "secondary", onClick: L, disabled: y, children: r ? h.statusBulkAddingToCart : h.actionAddToCart }), i("button", { "data-testid": "bulk-actions-delete-btn", type: "button", className: "requisition-list-view__batch-actions-delete-icon", onClick: w, disabled: y, "aria-label": h.actionDeleteSelectedItems, children: i(di, { source: qe }) })] })] });
}, ve = ({ currentPageSize: e, onPageSizeChange: n, disabled: l = !1, pageSizeOptions: r = [10, 25, 50, 100] }) => {
  const t = ni({ itemsPerPage: "RequisitionList.PageSizePicker.itemsPerPage" }), o = (c) => {
    const u = c.target, L = parseInt(u.value, 10);
    n(L);
  }, s = r.map((c) => ({ value: c.toString(), text: c.toString() }));
  return i(ot, { disabled: l, "data-testid": "page-size-picker", variant: "primary", size: "medium", value: e.toString(), options: s, handleSelect: o, "aria-label": t.itemsPerPage });
}, Le = ({ pageInfo: e, totalCount: n, className: l = "" }) => {
  const r = ni({ itemsCounter: "RequisitionList.PaginationItemsCounter.itemsCounter" });
  if (!e || !n) return null;
  const t = e.page_size ?? yi, o = e.current_page ?? 1, s = t * o, c = n, u = s - t + 1, L = s > c ? c : s;
  return i("span", { className: `pagination-items-counter ${l}`.trim(), children: r.itemsCounter.replace("{from}", u.toString()).replace("{to}", L.toString()).replace("{total}", c.toString()) });
}, ji = ({ excludeUid: e, confirmLabel: n, disabled: l = !1, onConfirm: r }) => {
  const { lists: t } = he(), [o, s] = b(null), c = e ? t.filter((u) => u.uid !== e) : t;
  return i(Ti, { variant: "secondary", children: v("form", { onSubmit: (u) => {
    u.preventDefault(), o && r(o);
  }, className: "requisition-list-picker__form", children: [i("div", { className: "requisition-list-picker__available-lists", children: c.map((u) => v(Ti, { variant: o === u.uid ? "primary" : "secondary", onClick: () => s(u.uid), children: [i(di, { source: Ai }), i("span", { children: u.name })] }, u.uid)) }), i("div", { className: "requisition-list-picker__actions", children: i(Z, { type: "submit", disabled: !o || l, children: n }) })] }) });
}, Rt = ({ loadingUsers: e, usersErrorMessage: n, loadingLink: l, selectedUserValues: r, multiSelectOptions: t, shareLink: o, linkErrorMessage: s, linkCopied: c, isSubmitting: u, canSubmit: L, onSubmitClick: w, onCopyLinkClick: k, onSelectedUsersChange: I, onUsersFieldInteract: h, selectionError: y, submitErrorMessage: T, isShareSuccess: N, sharedRecipientEmails: m, isPublic: S = !1, recipientEmails: q = "", onRecipientEmailsChange: R }) => {
  const g = ni({ emailInstruction: "RequisitionList.ShareRequisitionListContent.emailInstruction", emailLabel: "RequisitionList.ShareRequisitionListContent.emailLabel", emailPlaceholder: "RequisitionList.ShareRequisitionListContent.emailPlaceholder", submitLabel: "RequisitionList.ShareRequisitionListContent.submitLabel", linkInstruction: "RequisitionList.ShareRequisitionListContent.linkInstruction", copyLink: "RequisitionList.ShareRequisitionListContent.copyLink", linkCopied: "RequisitionList.ShareRequisitionListContent.linkCopied", loadingUsers: "RequisitionList.ShareRequisitionListContent.loadingUsers", loadingLink: "RequisitionList.ShareRequisitionListContent.loadingLink", sharingInProgress: "RequisitionList.ShareRequisitionListContent.sharingInProgress", noUsersAvailable: "RequisitionList.ShareRequisitionListContent.noUsersAvailable", maxRecipientsValidation: "RequisitionList.ShareRequisitionListContent.maxRecipientsValidation", shareSuccessMessage: "RequisitionList.ShareRequisitionListContent.shareSuccessMessage", publicEmailPlaceholder: "RequisitionList.ShareRequisitionListContent.publicEmailPlaceholder", publicEmailInstruction: "RequisitionList.ShareRequisitionListContent.publicEmailInstruction", publicLinkInstruction: "RequisitionList.ShareRequisitionListContent.publicLinkInstruction" });
  return v("div", { className: "share-requisition-list-content", children: [N ? v("div", { className: "share-requisition-list-content__success", children: [i("p", { className: "share-requisition-list-content__instruction", children: g.shareSuccessMessage }), i("div", { className: "share-requisition-list-content__recipient-list", children: m.map((d) => i("p", { className: "share-requisition-list-content__recipient", children: d }, d)) })] }) : v(pi, { children: [i("p", { className: "share-requisition-list-content__instruction", children: S ? g.publicEmailInstruction : g.emailInstruction }), i("div", { className: "share-requisition-list-content__field", children: !S && e ? v("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: g.loadingUsers })] }) : !S && n ? i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: n }) : u ? v("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: g.sharingInProgress })] }) : i(Ri, { label: g.emailLabel, error: y ?? void 0, disabled: u, onMouseDown: h, onKeyDown: h, children: S ? i(Ni, { type: "email", multiple: !0, value: q, onInput: (d) => R == null ? void 0 : R(d.currentTarget.value), placeholder: g.publicEmailPlaceholder, disabled: u, "aria-label": g.emailLabel, "data-testid": "public-share-emails" }) : i(tt, { options: t, value: r, onChange: I, placeholder: g.emailPlaceholder, noResultsText: g.noUsersAvailable, disabled: u, error: !!y, className: "share-requisition-list-content__multi-select" }) }) }), !u && i("div", { className: "share-requisition-list-content__actions", children: i(Z, { variant: "primary", onClick: w, disabled: !L, type: "button", "data-testid": "share-submit-btn", children: g.submitLabel }) }), !u && T && i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: T })] }), i(st, { variant: "secondary", className: "share-requisition-list-content__divider-secondary" }), i("p", { className: "share-requisition-list-content__instruction", children: S ? g.publicLinkInstruction : g.linkInstruction }), l ? v("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: g.loadingLink })] }) : o ? v(pi, { children: [i("div", { className: "share-requisition-list-content__link-row", children: i(Ni, { readOnly: !0, value: o, "data-testid": "share-link-field" }) }), i("div", { className: "share-requisition-list-content__actions", children: i(Z, { variant: "secondary", onClick: k, type: "button", "data-testid": "copy-link-btn", children: c ? g.linkCopied : g.copyLink }) })] }) : s ? i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: s }) : null] });
}, kt = (e) => {
  var n, l;
  return (n = e.configurable_options) != null && n.length ? e.configurable_options.map((r) => `${r.option_label}: ${r.value_label}`).join(", ") : (l = e.bundle_options) != null && l.length ? e.bundle_options.map((r) => r.label).join(", ") : "";
}, Ct = ({ status: e, previewData: n, errorMessage: l, onImport: r, translations: t, isPublic: o = !1, onAddToCart: s, selectedItemUids: c = [], onSelectedItemsChange: u, onPageChange: L, canAddToCart: w = !1, routeProduct: k }) => {
  var I;
  if (e === "preview_loading") return v("div", { className: "shared-requisition-list__loading", children: [i(_i, {}), i("span", { children: t.loading })] });
  if (e === "preview_error") return i("div", { className: "shared-requisition-list__container", children: i(qi, { heading: l, type: "error", variant: "primary" }) });
  if (!n) return null;
  const h = n.requisitionList.name, y = n.requisitionList.items ?? [], T = e === "importing", N = e === "import_success", m = [{ label: t.skuHeader, key: "sku" }, { label: t.qtyHeader, key: "qty" }, { label: t.optionsHeader, key: "options" }], S = y.map((q) => {
    var R, g;
    const d = ((R = q.configured_product) == null ? void 0 : R.sku) || q.sku, C = v(pi, { children: [((g = q.image) == null ? void 0 : g.url) && i("img", { src: q.image.url, alt: q.image.label || q.name || q.sku, width: "48", height: "48" }), i("span", { children: q.name || q.sku })] });
    return { ...o ? { product: i("div", { className: "shared-requisition-list__product", children: k && q.urlKey ? i("a", { href: k(q.urlKey, d), children: C }) : C }), selection: i("input", { type: "checkbox", "aria-label": `${t.selectItem} ${q.sku}`, checked: c.includes(q.uid), disabled: e === "cart_adding", onChange: (V) => u == null ? void 0 : u(V.currentTarget.checked ? [...c, q.uid] : c.filter((M) => M !== q.uid)) }) } : {}, sku: d, qty: q.quantity, options: kt(q) };
  });
  return v("div", { className: "shared-requisition-list__preview", children: [i(de, { title: t.previewTitle, "aria-label": t.previewTitle }), e === "import_success" && i("div", { className: "shared-requisition-list__alert-wrapper", children: i(qi, { heading: t.successImport.replace("{listName}", h), type: "success", variant: "primary" }) }), e === "import_error" && i("div", { className: "shared-requisition-list__alert-wrapper", children: i(qi, { heading: l, type: "error", variant: "primary" }) }), (e === "cart_success" || e === "cart_error") && i(qi, { heading: e === "cart_success" ? t.cartSuccess ?? "" : l, type: e === "cart_success" ? "success" : "error", variant: "primary" }), v("div", { className: "shared-requisition-list__preview-details", children: [v("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.senderLabel }), i("span", { className: "shared-requisition-list__preview-value", children: n.senderName })] }), v("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.listNameLabel }), i("span", { className: "shared-requisition-list__preview-value", children: h })] }), n.requisitionList.description && v("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.descriptionLabel }), i("span", { className: "shared-requisition-list__preview-value", children: n.requisitionList.description })] })] }), y.length > 0 && i("div", { className: "shared-requisition-list__table-wrapper", children: i(Hi, { columns: o ? [{ label: t.selectItem ?? "", key: "selection" }, { label: t.productHeader ?? "", key: "product" }, ...m] : m, rowData: S, "data-testid": "shared-list-items-table" }) }), i("div", { className: "shared-requisition-list__actions", children: o ? v(pi, { children: [i(Z, { type: "button", variant: "primary", onClick: () => s == null ? void 0 : s(), disabled: !w || e === "cart_adding" || !y.length, "data-testid": "add-public-list-to-cart-btn", children: e === "cart_adding" ? t.addingToCart : t.addToCart }), i(Z, { type: "button", variant: "secondary", onClick: () => s == null ? void 0 : s(c), disabled: !w || e === "cart_adding" || !c.length, "data-testid": "add-selected-public-items-to-cart-btn", children: t.addSelectedToCart })] }) : i(Z, { type: "button", variant: "primary", onClick: r, disabled: T || N, "data-testid": "import-shared-list-btn", children: T ? t.importingButton : t.importButton }) }), o && (((I = n.requisitionList.page_info) == null ? void 0 : I.total_pages) ?? 1) > 1 && v("div", { className: "shared-requisition-list__actions", children: [i(Z, { type: "button", variant: "secondary", disabled: e === "cart_adding" || n.requisitionList.page_info.current_page <= 1, onClick: () => L == null ? void 0 : L(n.requisitionList.page_info.current_page - 1), children: t.previousPage }), i(Z, { type: "button", variant: "secondary", disabled: e === "cart_adding" || n.requisitionList.page_info.current_page >= n.requisitionList.page_info.total_pages, onClick: () => L == null ? void 0 : L(n.requisitionList.page_info.current_page + 1), children: t.nextPage })] })] });
}, xt = ({ routeRequisitionListDetails: e, fallbackRoute: n = "/customer/account", slots: l }) => {
  const { isEnabled: r } = Zi(), [t, o] = b({ type: null, isOpen: !1, isLoading: !1, requisitionList: null }), s = P(() => {
    o({ type: null, isOpen: !1, isLoading: !1, requisitionList: null });
  }, []), c = P((d) => {
    o({ type: "rename", isOpen: !0, isLoading: !1, requisitionList: d });
  }, []), u = P((d) => {
    o({ type: "delete", isOpen: !0, isLoading: !1, requisitionList: d });
  }, []), { rows: L, isLoading: w, pageInfo: k, totalCount: I, handlePageChange: h, handlePageSizeChange: y, isAdding: T, handleAddNew: N, handleCancelCreate: m } = dt({ handleOpenRenameModal: c, handleOpenDeleteModal: u }, e, s), S = P(async (d) => {
    if (t.requisitionList) try {
      await Pi(t.requisitionList.uid, d.name, d.description, void 0, void 0, void 0, d.is_public), ei.emit("requisitionList/alert", { action: "update", type: "success", context: "requisitionList" }), await h(), s();
    } catch {
      ei.emit("requisitionList/alert", { action: "update", type: "error", context: "requisitionList" });
    }
  }, [t.requisitionList, h, s]), q = async () => {
    t.requisitionList && (o({ ...t, isLoading: !0 }), await ue(t.requisitionList.uid).then(async () => {
      ei.emit("requisitionList/alert", { type: "success", action: "delete", context: "requisitionList" });
    }).catch(() => {
      ei.emit("requisitionList/alert", { type: "error", action: "delete", context: "requisitionList" });
    }).finally(async () => {
      await h(), s();
    }));
  }, R = ni({ containerTitle: "RequisitionList.containerTitle", updateTitle: "RequisitionList.RequisitionListForm.updateTitle", deleteRequisitionListTitle: "RequisitionList.RequisitionListWrapper.deleteRequisitionListTitle", deleteRequisitionListMessage: "RequisitionList.RequisitionListWrapper.deleteRequisitionListMessage", cancelAction: "RequisitionList.RequisitionListWrapper.cancelAction", confirmAction: "RequisitionList.RequisitionListWrapper.confirmAction", notEnabledTitle: "RequisitionList.RequisitionListsNotEnabled.title", notEnabledMessage: "RequisitionList.RequisitionListsNotEnabled.message", notEnabledActionLabel: "RequisitionList.RequisitionListsNotEnabled.actionLabel" }), g = P(() => l != null && l.Header ? i(Ne, { name: "Header", "aria-label": R.containerTitle, title: R.containerTitle, slot: l.Header }) : i(de, { "aria-label": R.containerTitle, role: "region", title: R.containerTitle }), [l, R.containerTitle]);
  return r === !1 ? i(Fi, { title: R.notEnabledTitle, message: R.notEnabledMessage, actionLabel: R.notEnabledActionLabel, onAction: () => {
    wi(n);
  } }) : v(pi, { children: [i(ht, { header: g(), rows: L, skeletonRowCount: 10, isLoading: w, pageInfo: k, totalCount: I, handlePageChange: h, handlePageSizeChange: y, defaultPageSize: 10, isAdding: T, handleAddNew: N, handleCancelCreate: m }), t.type === "rename" && t.isOpen && t.requisitionList && i(hi, { isOpen: t.isOpen, isLoading: t.isLoading, title: R.updateTitle, modalContent: i(Wi, { mode: "update", defaultValues: { name: t.requisitionList.name, description: t.requisitionList.description || "", is_public: t.requisitionList.is_public }, onSubmit: S, onCancel: s }), handleModalOnClose: s }), t.type === "delete" && t.isOpen && i(hi, { isOpen: t.isOpen, isLoading: t.isLoading, title: R.deleteRequisitionListTitle, modalContent: R.deleteRequisitionListMessage, confirmBtnCaption: R.confirmAction, closeBtnCaption: R.cancelAction, handleModalOnClose: s, handleModalOnConfirm: q })] });
};
xt.displayName = "RequisitionListGrid";
const fe = ({ requisitionListUid: e, isSubmitting: n, onSubmit: l, currentCustomerEmail: r, routeSharedRequisitionList: t, isPublic: o = !1 }) => {
  const s = ni({ emailInstruction: "RequisitionList.ShareRequisitionListContent.emailInstruction", emailLabel: "RequisitionList.ShareRequisitionListContent.emailLabel", emailPlaceholder: "RequisitionList.ShareRequisitionListContent.emailPlaceholder", submitLabel: "RequisitionList.ShareRequisitionListContent.submitLabel", linkInstruction: "RequisitionList.ShareRequisitionListContent.linkInstruction", copyLink: "RequisitionList.ShareRequisitionListContent.copyLink", linkCopied: "RequisitionList.ShareRequisitionListContent.linkCopied", loadingUsers: "RequisitionList.ShareRequisitionListContent.loadingUsers", loadingLink: "RequisitionList.ShareRequisitionListContent.loadingLink", noUsersAvailable: "RequisitionList.ShareRequisitionListContent.noUsersAvailable", usersLoadError: "RequisitionList.ShareRequisitionListContent.usersLoadError", maxRecipientsValidation: "RequisitionList.ShareRequisitionListContent.maxRecipientsValidation", shareSuccessMessage: "RequisitionList.ShareRequisitionListContent.shareSuccessMessage", invalidEmail: "RequisitionList.ShareRequisitionListContent.invalidEmail" }), [c, u] = b([]), [L, w] = b(""), [k, I] = b(!o), [h, y] = b(!1), [T, N] = b(/* @__PURE__ */ new Set()), [m, S] = b(null), [q, R] = b(!0), [g, d] = b(null), [C, V] = b(!1), [M, K] = b(null), [Y, B] = b(null), [G, li] = b(!1), [ri, oi] = b([]), ai = (() => {
    var x, p;
    const O = o ? (x = Q.config) == null ? void 0 : x.requisition_list_public_share_max_recipients : (p = Q.config) == null ? void 0 : p.requisition_list_share_max_recipients, $ = Number(O);
    return Number.isFinite($) && $ > 0 ? $ : null;
  })();
  si(() => {
    if (o) {
      I(!1);
      return;
    }
    Ae().then((x) => {
      const p = x.filter((O) => !(r && O.email.toLowerCase() === r.toLowerCase()));
      u(p);
    }).catch(() => {
      y(!0);
    }).finally(() => I(!1));
  }, [r, o]), si(() => {
    let x = !0;
    return R(!0), S(null), (o ? Pe(e) : Ee(e)).then((p) => {
      var O, $;
      if (x) {
        if (p.token) {
          const ci = `/${((o ? (O = Q.config) == null ? void 0 : O.requisition_list_public_share_storefront_path : ($ = Q.config) == null ? void 0 : $.requisition_list_share_storefront_path) ?? "").replace(/^\/+|\/+$/g, "")}?requisition_id=${encodeURIComponent(p.token)}`, mi = t ? t(ci) : ci;
          S(mi);
        } else S(null);
        d(p.errorMessage);
      }
    }).catch((p) => {
      x && d(p instanceof Error ? p.message : s.usersLoadError);
    }).finally(() => {
      x && R(!1);
    }), () => {
      x = !1;
    };
  }, [e, t, o, s.usersLoadError]);
  const D = Array.from(new Set(L.split(/[\s,;]+/).filter(Boolean))), j = ai && D.length > ai ? s.maxRecipientsValidation.replace("{max}", String(ai)) : D.some((x) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x)) ? s.invalidEmail : null, a = P(async () => {
    var x;
    const p = o ? D : Array.from(T), O = o ? D : c.filter((ci) => p.includes(String(ci.id))).map((ci) => ci.email), $ = await l(p);
    $ ? B(((x = $[0]) == null ? void 0 : x.message) || null) : (li(!0), oi(O), B(null));
  }, [T, c, l, o, D]), _ = P(() => {
    navigator.clipboard.writeText(m).then(() => {
      V(!0), setTimeout(() => V(!1), 3e3);
    }, (x) => {
      console.error("Failed to copy share link to clipboard:", x);
    });
  }, [m]), E = c.map((x) => ({ label: `${x.firstname} ${x.lastname} (${x.email})`, value: x.id })), H = h ? s.usersLoadError : null, W = !n && (o ? D.length > 0 && !j : T.size > 0 && !M);
  return i(Rt, { isPublic: o, recipientEmails: L, onRecipientEmailsChange: w, loadingUsers: k, usersErrorMessage: H, loadingLink: q, selectedUserValues: Array.from(T), multiSelectOptions: E, shareLink: m, linkErrorMessage: g, linkCopied: C, isSubmitting: n, canSubmit: W, onSubmitClick: a, onCopyLinkClick: _, onUsersFieldInteract: () => {
    M && K(null), Y && B(null);
  }, onSelectedUsersChange: (x) => {
    const p = x.map(String);
    if (ai && p.length > ai) {
      K(s.maxRecipientsValidation.replace("{max}", String(ai)));
      return;
    }
    K(null), N(new Set(p));
  }, selectionError: o ? j : M, submitErrorMessage: Y, isShareSuccess: G, sharedRecipientEmails: ri });
};
fe.displayName = "ShareRequisitionListContent";
function le(e) {
  const n = /^[=+-]/.test(e) ? ` ${e}` : e;
  return /[",\r\n\t ]/.test(n) ? `"${n.replace(/"/g, '""')}"` : n;
}
function St(e) {
  return ["sku,qty", ...e.map(({ sku: n, quantity: l }) => {
    if (typeof n != "string" || n.length === 0 || !Number.isFinite(l)) throw new Error("Unable to export an invalid requisition list line.");
    return `${le(n)},${le(String(l))}`;
  })].join(`\r
`) + `\r
`;
}
function Tt(e) {
  const n = e.replace(/[<>:"/\\|?*]/g, "_").replace(new RegExp("\\p{Cc}", "gu"), "_").trim().replace(/[. ]+$/g, "");
  return `${(/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(n) ? `_${n}` : n) || "requisition-list"}.csv`;
}
function Nt(e, n) {
  const l = St(n), r = URL.createObjectURL(new Blob([l], { type: "text/csv;charset=utf-8" })), t = document.createElement("a");
  try {
    t.href = r, t.download = Tt(e), t.hidden = !0, document.body.appendChild(t), t.click();
  } finally {
    t.remove(), setTimeout(() => URL.revokeObjectURL(r), 0);
  }
}
const At = ({ requisitionList: e, routeRequisitionListGrid: n, onUpdate: l, onAlert: r, enrichConfigurableProducts: t, currentCustomerEmail: o, routeSharedRequisitionList: s }) => {
  var c;
  const [u, L] = b(!1), [w, k] = b(!1), [I, h] = b(!1), [y, T] = b(!1), [N, m] = b(!1), [S, q] = b(!1), R = fi(null);
  si(() => (q(!1), () => {
    var D;
    (D = R.current) == null || D.abort(), R.current = null;
  }), [e.uid]);
  const g = e.is_public ? Si(Q.config) : Ie(Q.config), d = Si(Q.config), C = Number(e.items_count ?? ((c = e.items) == null ? void 0 : c.length) ?? 0), V = C <= 0 || !e.is_public && !Q.isCompanyUser, M = ni({ actionBackToRequisitionLists: "RequisitionList.RequisitionListView.actionBackToRequisitionLists", actionRename: "RequisitionList.RequisitionListView.actionRename", actionExport: "RequisitionList.RequisitionListView.actionExport", statusExporting: "RequisitionList.RequisitionListView.statusExporting", actionDeleteList: "RequisitionList.RequisitionListView.actionDeleteList", actionShare: "RequisitionList.RequisitionListView.actionShare", actionMakePublic: "RequisitionList.RequisitionListView.actionMakePublic", actionMakePrivate: "RequisitionList.RequisitionListView.actionMakePrivate", statusPublic: "RequisitionList.RequisitionListView.statusPublic", shareDisabledReason: "RequisitionList.RequisitionListView.shareDisabledReason", shareDisabledNoCompany: "RequisitionList.RequisitionListView.shareDisabledNoCompany", shareListTitle: "RequisitionList.RequisitionListView.shareListTitle", deleteListTitle: "RequisitionList.RequisitionListView.deleteListTitle", deleteListMessage: "RequisitionList.RequisitionListView.deleteListMessage", confirmAction: "RequisitionList.RequisitionListWrapper.confirmAction", cancelAction: "RequisitionList.RequisitionListWrapper.cancelAction", updateTitle: "RequisitionList.RequisitionListForm.updateTitle" }), K = P(async () => {
    if (R.current || C <= 0) return;
    const D = new AbortController();
    R.current = D, q(!0);
    try {
      const j = await Me(e.uid, D.signal);
      D.signal.throwIfAborted(), Nt(j.name, j.items);
    } catch (j) {
      if (!D.signal.aborted) {
        console.error("Failed to export requisition list:", j);
        const a = { action: "export", type: "error", context: "requisitionList" };
        r ? r(a) : ei.emit("requisitionList/alert", a);
      }
    } finally {
      R.current === D && (R.current = null, q(!1));
    }
  }, [e.uid, C, r]), Y = P(() => {
    L(!0);
  }, []), B = P(async (D) => {
    var j, a;
    try {
      const _ = await Pi(e.uid, D.name, D.description, (j = e.page_info) == null ? void 0 : j.page_size, (a = e.page_info) == null ? void 0 : a.current_page, t, D.is_public);
      _ ? (l == null || l(_), L(!1), r == null || r({ action: "update", type: "success", context: "requisitionList" })) : r == null || r({ action: "update", type: "error", context: "requisitionList" });
    } catch {
      r == null || r({ action: "update", type: "error", context: "requisitionList" });
    }
  }, [e.uid, e.page_info, l, r, t]), G = P(() => {
    k(!0);
  }, []), li = P(async () => {
    T(!0);
    try {
      if (await ue(e.uid)) {
        const D = { action: "delete", type: "success", context: "requisitionList" };
        try {
          localStorage.setItem("requisitionListPendingAlert", JSON.stringify(D));
        } catch {
        }
        if (n) {
          const j = n();
          j && typeof j == "string" && wi(j);
        }
      } else r == null || r({ action: "delete", type: "error", context: "requisitionList" });
    } catch {
      r == null || r({ action: "delete", type: "error", context: "requisitionList" });
    } finally {
      T(!1), k(!1);
    }
  }, [e.uid, n, r]), ri = P(() => {
    h(!0);
  }, []), oi = gt((D) => {
    l == null || l(D), r == null || r({ action: "update", type: "success", context: "requisitionList" });
  }, () => {
    r == null || r({ action: "update", type: "error", context: "requisitionList" });
  }, t), ai = P(async (D) => {
    m(!0);
    try {
      return await (e.is_public ? De : ze)(e.uid, D);
    } catch {
      return [{ code: "SHARE_FAILED", message: "Unable to share list." }];
    } finally {
      m(!1);
    }
  }, [e.uid, e.is_public]);
  return v(pi, { children: [i(_t, { name: e.name, exportAction: C > 0 ? { onClick: K, label: M.actionExport, loading: S, loadingLabel: M.statusExporting } : void 0, description: e.description, showPublicTag: d && !!e.is_public, publicTagLabel: M.statusPublic, backLink: n ? { url: "#", label: M.actionBackToRequisitionLists, onClick: (D) => {
    D.preventDefault();
    const j = n();
    j && typeof j == "string" && wi(j);
  } } : void 0, actions: { onRename: Y, onDelete: G, onShare: g && !V ? ri : void 0, onTogglePublic: d ? () => oi(e) : void 0, renameLabel: M.actionRename, deleteLabel: M.actionDeleteList, shareLabel: g ? M.actionShare : void 0, makePublicLabel: M.actionMakePublic, makePrivateLabel: M.actionMakePrivate, isPublic: e.is_public, shareDisabled: g && V, shareDisabledReason: g && V ? C <= 0 ? M.shareDisabledReason : M.shareDisabledNoCompany : void 0 } }), u && i(hi, { isOpen: u, isLoading: !1, title: M.updateTitle, modalContent: i(Wi, { mode: "update", defaultValues: { name: e.name, description: e.description || "", is_public: e.is_public }, onSubmit: B, onCancel: () => L(!1) }), handleModalOnClose: () => L(!1) }), w && i(hi, { isOpen: w, isLoading: y, title: M.deleteListTitle, modalContent: M.deleteListMessage, confirmBtnCaption: M.confirmAction, closeBtnCaption: M.cancelAction, handleModalOnClose: () => k(!1), handleModalOnConfirm: li }), g && I && i(hi, { isOpen: I, isLoading: !1, title: M.shareListTitle, modalContent: i(fe, { requisitionListUid: e.uid, isPublic: e.is_public, isSubmitting: N, onSubmit: ai, currentCustomerEmail: o, routeSharedRequisitionList: s }), handleModalOnClose: () => h(!1) })] });
}, Pt = ({ requisitionListUid: e, skipProductLoading: n = !1, pageSize: l = yi, routeRequisitionListGrid: r, fallbackRoute: t = "/customer/account", getProductData: o, enrichConfigurableProducts: s = Ve, currentCustomerEmail: c, routeSharedRequisitionList: u }) => {
  var L, w, k, I, h, y, T;
  const [N, m] = b(!1), [S, q] = b(null), [R, g] = b(null), [d, C] = b(!1), [V, M] = b(null), [K, Y] = b(!1), [B, G] = b(l), [li, ri] = b(!0), [oi, ai] = b(!1), [D, j] = b([]), a = fi(null), _ = fi(null), E = fi(0), H = fi(null), W = P(() => {
    var f;
    (f = a.current) == null || f.abort(), m(!1), Y(!1), q(null), M(null);
    const A = new AbortController();
    return a.current = A, A;
  }, []);
  si(() => () => {
    var f;
    (f = a.current) == null || f.abort(), a.current = null;
  }, [e]);
  const x = P((f) => ({ signal: f, onWarning: (A) => console.warn("Requisition list supplemental data warning:", A) }), []), { currentRequisitionList: p, setCurrentRequisitionList: O, selectedItems: $, setSelectedItems: ci, handleItemSelection: mi, handleSelectAll: bi, handleSelectNone: vi } = pt(), U = ni({ emptyRequisitionList: "RequisitionList.RequisitionListView.emptyRequisitionList", errorLoadingProducts: "RequisitionList.RequisitionListView.errorLoadingProducts", errorLoadPage: "RequisitionList.RequisitionListView.errorLoadPage", notFoundTitle: "RequisitionList.RequisitionListView.notFoundTitle", notFoundMessage: "RequisitionList.RequisitionListView.notFoundMessage", notFoundActionLabel: "RequisitionList.RequisitionListView.notFoundActionLabel", notEnabledTitle: "RequisitionList.RequisitionListsNotEnabled.title", notEnabledMessage: "RequisitionList.RequisitionListsNotEnabled.message", partialMoveSuccess: "RequisitionList.RequisitionListAlert.partialMoveSuccess", notEnabledActionLabel: "RequisitionList.RequisitionListsNotEnabled.actionLabel", show: "RequisitionList.PageSizePicker.show", deleteItemsTitle: "RequisitionList.RequisitionListView.deleteItemsTitle", deleteItemsMessage: "RequisitionList.RequisitionListView.deleteItemsMessage", confirmAction: "RequisitionList.RequisitionListView.confirmAction", cancelAction: "RequisitionList.RequisitionListView.cancelAction", moveToListTitle: "RequisitionList.RequisitionListView.moveToListTitle", moveToListConfirm: "RequisitionList.RequisitionListView.moveToListConfirm", copyToListTitle: "RequisitionList.RequisitionListView.copyToListTitle", copyToListConfirm: "RequisitionList.RequisitionListView.copyToListConfirm" }), { alert: Ei, setAlert: _e, handleRequisitionListAlert: ti } = Qi(), { isEnabled: ye } = Zi();
  si(() => {
    const f = ei.on("requisitionList/data", (F) => {
      (F == null ? void 0 : F.uid) === e && (O(F), ci(/* @__PURE__ */ new Set()));
    }), A = ei.on("requisitionList/alert", ti);
    return () => {
      f == null || f.off(), A == null || A.off();
    };
  }, [ti, e, O, ci]), si(() => {
    G(l);
  }, [l]);
  const Ii = P(async (f, A) => (await ne(f, { ...x(A), enrichConfigurableProducts: s })).list, [s, x]), Ci = P(async (f, A) => (await Oe(f, { ...A, enrichConfigurableProducts: s })).items, [s]), Li = P(async (f, A) => {
    var F;
    if (A.throwIfAborted(), !((F = f.items) != null && F.length)) return f;
    const X = a.current;
    m(!0);
    try {
      return (await ne(f, { ...x(A), getProductData: o, skipConfigurables: !0 })).list;
    } finally {
      a.current === X && m(!1);
    }
  }, [o, x]), { showMoveToListModal: Ji, setShowMoveToListModal: Ki, movingToList: Mi, showCopyToListModal: Yi, setShowCopyToListModal: Xi, copyingToList: Di, handleMoveToList: we, handleCopyToList: Re } = mt({ sourceListUid: p == null ? void 0 : p.uid, selectedItems: $, currentPageSize: B, currentPage: ((L = p == null ? void 0 : p.page_info) == null ? void 0 : L.current_page) || 1, enrichConfigurableProductsInList: Ii, fetchAndMergeProducts: Li, setCurrentRequisitionList: O, setSelectedItems: ci, handleRequisitionListAlert: ti, beginLoad: W });
  si(() => {
    if (!e) {
      ri(!1);
      return;
    }
    if (p && p.uid === e) {
      (!_.current || _.current.signal.aborted) && ri(!1);
      return;
    }
    ri(!0);
    const f = W();
    _.current = f, (async () => {
      try {
        const A = await Oi(e, { ...x(f.signal), mode: "page", currentPage: 1, pageSize: l, enrichConfigurableProducts: s, getProductData: n ? void 0 : o });
        f.signal.throwIfAborted();
        const F = A == null ? void 0 : A.list;
        F && O(F);
      } catch (A) {
        f.signal.aborted || console.error("Failed to initialize requisition list from UID:", A);
      } finally {
        _.current === f && (_.current = null), a.current === f && ri(!1);
      }
    })();
  }, [e, l, n, s, o, x, W, O, p]);
  const ie = P(async (f) => {
    f && f.length === 1 ? (C(!1), g(f)) : (C(!0), g(null));
    try {
      const A = await Ue(p.uid, f), F = (f == null ? void 0 : f.length) || 0, X = (A == null ? void 0 : A.length) || 0, J = F - X;
      if (A && A.length > 0 && J > 0) {
        const ii = { action: "move", type: "error", context: "product", message: [U.partialMoveSuccess.replace("{successCount}", String(J)).replace("{failedCount}", String(X))] };
        ti(ii), ei.emit("requisitionList/alert", ii);
      } else if (A && A.length > 0) {
        const ii = { action: "move", type: "error", context: "product", message: A.map((zi) => zi.message) };
        ti(ii), ei.emit("requisitionList/alert", ii);
      } else {
        const ii = { action: "move", type: "success", context: "product" };
        ti(ii), ei.emit("requisitionList/alert", ii);
      }
    } catch {
      const A = { action: "move", type: "error", context: "product" };
      ti(A), ei.emit("requisitionList/alert", A);
    } finally {
      g(null), C(!1);
    }
  }, [p, ti, U]), ee = P((f) => {
    f && f.length > 0 && (j(f), ai(!0));
  }, []), ke = P(async () => {
    const f = W();
    D.length === 1 ? q(D[0]) : q("bulk");
    try {
      const A = await Be(p.uid, D, B, p.page_info.current_page, Ci, x(f.signal));
      if (f.signal.throwIfAborted(), A) {
        const F = await Li(A, f.signal);
        f.signal.throwIfAborted(), O(F), ti({ action: "delete", type: "success", context: "product" });
      } else ti({ action: "delete", type: "error", context: "product" });
    } catch {
      if (f.signal.aborted) return;
      ti({ action: "delete", type: "error", context: "product" });
    } finally {
      a.current === f && (q(null), ai(!1), j([]));
    }
  }, [D, p, B, Li, O, ti, W, x, Ci]), Ce = P(async (f, A) => {
    var F, X;
    const J = W();
    M(f);
    try {
      const ii = (F = p.items) == null ? void 0 : F.find((Vi) => Vi.uid === f);
      if (!ii) {
        ti({ action: "update", type: "error", context: "product" });
        return;
      }
      const zi = { item_id: ii.uid, entered_options: ii.entered_options, selected_options: ii.selected_options, quantity: A }, te = Fe(p.uid, [zi], B, p.page_info.current_page, Ci, x(J.signal));
      H.current = { request: J, completion: te.then(() => {
      }, () => {
      }) };
      const se = await te;
      if (J.signal.throwIfAborted(), se) {
        const Vi = await Li(se, J.signal);
        J.signal.throwIfAborted(), O(Vi), ti({ action: "update", type: "success", context: "product" });
      } else ti({ action: "update", type: "error", context: "product" });
    } catch {
      if (J.signal.aborted) return;
      ti({ action: "update", type: "error", context: "product" });
    } finally {
      ((X = H.current) == null ? void 0 : X.request) === J && (H.current = null), a.current === J && M(null);
    }
  }, [p, Li, O, B, ti, Ci, W, x]), xe = P(async (f) => {
    const A = ++E.current, F = H.current;
    if (F && (await F.completion, A !== E.current || F.request.signal.aborted)) return;
    const X = W();
    Y(!0);
    try {
      const J = await Oi(p.uid, { ...x(X.signal), mode: "page", currentPage: f, pageSize: B, enrichConfigurableProducts: s, getProductData: o });
      X.signal.throwIfAborted();
      const ii = J == null ? void 0 : J.list;
      ii ? O(ii) : console.warn(U.errorLoadPage);
    } catch (J) {
      X.signal.aborted || console.warn(J instanceof Error ? J.message : U.errorLoadPage);
    } finally {
      a.current === X && (Y(!1), m(!1));
    }
  }, [p == null ? void 0 : p.uid, o, W, x, B, U, O, s]), Se = P(async (f) => {
    const A = ++E.current, F = H.current;
    if (F && (await F.completion, A !== E.current || F.request.signal.aborted)) return;
    const X = W();
    G(f), Y(!0);
    try {
      const J = await Oi(p.uid, { ...x(X.signal), mode: "page", currentPage: 1, pageSize: f, enrichConfigurableProducts: s, getProductData: o });
      X.signal.throwIfAborted();
      const ii = J == null ? void 0 : J.list;
      ii ? O(ii) : console.warn(U.errorLoadPage);
    } catch {
      X.signal.aborted || console.warn(U.errorLoadPage);
    } finally {
      a.current === X && (Y(!1), m(!1));
    }
  }, [p == null ? void 0 : p.uid, o, W, x, U, O, s]), Te = P(async (f) => {
    const A = W();
    try {
      const F = await Ii(f, A.signal), X = await Li(F, A.signal);
      A.signal.throwIfAborted(), O(X);
    } catch (F) {
      A.signal.aborted || console.error("Failed to refresh requisition list:", F);
    }
  }, [O, Li, Ii, W]);
  return v("div", { className: "requisition-list-view__container", children: [li ? i("div", { className: "requisition-list-view__loading", children: i(_i, { stroke: "4", size: "large" }) }) : ye === !1 ? i(Fi, { title: U.notEnabledTitle, message: U.notEnabledMessage, actionLabel: U.notEnabledActionLabel, onAction: () => {
    wi(t);
  } }) : !p || !je(p == null ? void 0 : p.uid) ? i(Fi, { title: U.notFoundTitle, message: U.notFoundMessage, actionLabel: r ? U.notFoundActionLabel : void 0, onAction: r ? () => {
    const f = r();
    f && typeof f == "string" && wi(f);
  } : void 0 }) : v(pi, { children: [i(At, { requisitionList: p, routeRequisitionListGrid: r, onUpdate: Te, onAlert: ti, enrichConfigurableProducts: s, currentCustomerEmail: c, routeSharedRequisitionList: u }), Ei && i("div", { className: "requisition-list__alert-wrapper", children: i(qi, { heading: Ei.description, type: Ei.type, variant: "primary", onDismiss: () => _e(null) }) }), p.items_count === 0 ? i(Gi, { textContent: `${p.name} ${U.emptyRequisitionList}` }) : v(pi, { children: [i(wt, { selectedItems: $, deletingItemId: S, addingToCartItemId: R, bulkAddingToCart: d, updatingQuantityItemId: V, bulkMovingToList: Mi, bulkCopyingToList: Di, onSelectAll: bi, onSelectNone: vi, onBulkAddToCart: () => ie(Array.from($)), onBulkDelete: () => ee(Array.from($)), onBulkMoveToList: () => Ki(!0), onBulkCopyToList: () => Xi(!0) }), i(yt, { items: p.items, selectedItems: $, currentPage: ((w = p.page_info) == null ? void 0 : w.current_page) || 1, pageSize: ((k = p.page_info) == null ? void 0 : k.page_size) || yi, handleItemSelection: mi, handleUpdateQuantity: Ce, onAddToCart: ie, onDeleteItem: ee, useParentConfigurableThumbnail: ((I = Q.config) == null ? void 0 : I.configurable_thumbnail_source) === "parent" }), p.page_info && v("div", { className: "requisition-list-view__pagination", children: [i(Le, { pageInfo: p.page_info, totalCount: p.items_count }), (((h = p.page_info) == null ? void 0 : h.total_pages) || 0) > 1 && i(pe, { totalPages: p.page_info.total_pages, currentPage: ((y = p.page_info) == null ? void 0 : y.current_page) || 1, onChange: xe, disabled: K || N }), v("div", { className: "requisition-list-view__pagination-picker", children: [i("span", { children: U.show }), i(ve, { currentPageSize: ((T = p.page_info) == null ? void 0 : T.page_size) || yi, onPageSizeChange: Se, disabled: K || N })] })] })] })] }), oi && i(hi, { isOpen: oi, isLoading: S !== null, title: U.deleteItemsTitle, modalContent: U.deleteItemsMessage, confirmBtnCaption: U.confirmAction, closeBtnCaption: U.cancelAction, handleModalOnClose: () => {
    ai(!1), j([]);
  }, handleModalOnConfirm: ke }), Ji && i(hi, { isOpen: Ji, isLoading: Mi, title: U.moveToListTitle, modalContent: i(ji, { excludeUid: p == null ? void 0 : p.uid, confirmLabel: U.moveToListConfirm, disabled: Mi, onConfirm: we }), handleModalOnClose: () => Ki(!1) }), Yi && i(hi, { isOpen: Yi, isLoading: Di, title: U.copyToListTitle, modalContent: i(ji, { excludeUid: p == null ? void 0 : p.uid, confirmLabel: U.copyToListConfirm, disabled: Di, onConfirm: Re }), handleModalOnClose: () => Xi(!1) })] });
};
Pt.displayName = "RequisitionListView";
function Et(e, n, l) {
  var r;
  const t = e.sku ?? ((r = e.product) == null ? void 0 : r.sku);
  if (!t || t !== n.sku) return !1;
  if ((l == null ? void 0 : l.matchBySkuOnly) !== !1) return !0;
  const o = (e.configurable_options ?? []).map((c) => c.value_uid).filter((c) => !!c), s = (n.selectedOptions ?? []).filter((c) => !!c);
  return o.length !== s.length ? !1 : (o.sort(), s.sort(), o.every((c, u) => c === s[u]));
}
const It = ({ canCreate: e = !0, sku: n, selectedOptions: l, quantity: r = 1, matchBySKU: t, beforeAddProdToReqList: o }) => {
  const s = ni({ createTitle: "RequisitionList.RequisitionListForm.createTitle", addToRequisitionList: "RequisitionList.RequisitionListForm.addToRequisitionList", emptyList: "RequisitionList.RequisitionListWrapper.emptyList", addToNewRequisitionList: "RequisitionList.RequisitionListSelector.addToNewRequisitionList", addToSelected: "RequisitionList.RequisitionListSelector.addToSelected" }), [c, u] = b(!1), { lists: L } = he(), { isEnabled: w } = Zi(), [k, I] = b(null);
  si(() => {
    const B = (oi) => {
      oi && I(oi);
    }, G = (oi) => {
      oi && I((ai) => {
        const D = ai ?? Ze(), j = D.findIndex((a) => a.uid === oi.uid);
        return j >= 0 ? D.map((a, _) => _ === j ? oi : a) : [...D, oi];
      });
    }, li = ei.on("requisitionLists/data", B), ri = ei.on("requisitionList/data", G);
    return () => {
      li == null || li.off(), ri == null || ri.off();
    };
  }, []);
  const h = k ?? L, y = ki(() => {
    if (!(h != null && h.length)) return !1;
    const B = { sku: n, selectedOptions: l };
    return h.some((G) => {
      var li;
      return (li = G.items) == null ? void 0 : li.some((ri) => Et(ri, B, { matchBySkuOnly: t }));
    });
  }, [h, n, l, t]), { alert: T, setAlert: N, handleRequisitionListAlert: m } = Qi(), [S, q] = b({ isOpen: !1, isLoading: !1 }), R = P(() => {
    q({ isOpen: !0, isLoading: !1 });
  }, []), g = P(() => {
    q({ isOpen: !1, isLoading: !1 }), u(!1), N(null);
  }, [N]), d = P(async (B) => {
    try {
      const G = { sku: n, quantity: r, ...l && l.length > 0 ? { selected_options: l } : {} };
      await He(B, [G]);
    } catch (G) {
      throw console.error("Error adding product to list:", G), G;
    }
  }, [n, r, l]), C = P(async (B) => {
    try {
      await d(B), m({ action: "add", type: "success", context: "product", skus: [n] });
    } catch {
      m({ action: "add", type: "error", context: "product", skus: [n] });
    } finally {
      setTimeout(() => {
        g();
      }, 2e3);
    }
  }, [n, d, g, m]), V = P(() => {
    if (!o) {
      R();
      return;
    }
    Promise.resolve(o()).then(() => {
      R();
    }).catch(() => {
    });
  }, [o, R]), M = (L == null ? void 0 : L.length) > 0 ? c ? v("button", { type: "button", "aria-label": "Select a requisition list", role: "button", className: "requisition-list-actions", "data-testid": "requisition-list-actions-button", onClick: () => u(!1), children: [i("span", { className: "requisition-list-actions__title", "data-testid": "requisition-list-actions-button-text", children: s.addToRequisitionList }), i(di, { source: vt, size: "32" })] }) : i(ji, { confirmLabel: s.addToSelected, onConfirm: C }) : i(Gi, { textContent: s.emptyList }), K = c ? i(Ti, { variant: "secondary", children: i($i, { mode: "create", onSuccess: async (B) => {
    await C(B.uid);
  }, onError: () => {
    m({ action: "add", type: "error", context: "product", skus: [n] });
  }, onCancel: () => {
    u(!1);
  } }) }) : i(be, { onAddNew: () => {
    u(!0);
  } }), Y = v(pi, { children: [T && i("div", { className: "requisition-list__alert-wrapper", children: i(qi, { id: `requisition-list-selector__alert__${n}`, heading: T.description, type: T.type, variant: "primary", className: "requisition-list-selector__alert" }, `requisition-list-selector__alert__${n}`) }), !T && v(pi, { children: [M, e && K] })] });
  return w === null || !w ? null : v("div", { className: "requisition-list-selector", children: [i(Z, { active: y, activeIcon: i(di, { source: Ai }), "aria-label": s.addToRequisitionList, className: y ? "requisition-list-selector--active" : void 0, "data-testid": "requisition-list-selector", size: "medium", variant: "tertiary", icon: i(di, { source: Ai }), onClick: V }), S.isOpen && i(hi, { isOpen: !0, isLoading: S.isLoading, title: s.addToRequisitionList, modalContent: Y, handleModalOnClose: g })] });
};
It.displayName = "RequisitionListSelector";
const Mt = ({ token: e, routeRequisitionList: n, routeProduct: l, isPublic: r = !1, getCartId: t, onCartUpdated: o }) => {
  const [s, c] = b("preview_loading"), [u, L] = b(null), [w, k] = b(""), [I, h] = b(1), [y, T] = b([]), N = fi(!0), m = ni({ loading: "RequisitionList.SharedRequisitionList.loading", previewTitle: "RequisitionList.SharedRequisitionList.previewTitle", senderLabel: "RequisitionList.SharedRequisitionList.senderLabel", listNameLabel: "RequisitionList.SharedRequisitionList.listNameLabel", descriptionLabel: "RequisitionList.SharedRequisitionList.descriptionLabel", itemsCountLabel: "RequisitionList.SharedRequisitionList.itemsCountLabel", importButton: "RequisitionList.SharedRequisitionList.importButton", importingButton: "RequisitionList.SharedRequisitionList.importingButton", errorPreview: "RequisitionList.SharedRequisitionList.errorPreview", successImport: "RequisitionList.RequisitionListAlert.successImport", errorImport: "RequisitionList.RequisitionListAlert.errorImport", skuHeader: "RequisitionList.SharedRequisitionList.skuHeader", qtyHeader: "RequisitionList.SharedRequisitionList.qtyHeader", optionsHeader: "RequisitionList.SharedRequisitionList.optionsHeader", addToCart: "RequisitionList.SharedRequisitionList.addToCart", addSelectedToCart: "RequisitionList.SharedRequisitionList.addSelectedToCart", addingToCart: "RequisitionList.SharedRequisitionList.addingToCart", cartSuccess: "RequisitionList.SharedRequisitionList.cartSuccess", cartError: "RequisitionList.SharedRequisitionList.cartError", selectItem: "RequisitionList.SharedRequisitionList.selectItem", previousPage: "RequisitionList.SharedRequisitionList.previousPage", nextPage: "RequisitionList.SharedRequisitionList.nextPage", productHeader: "RequisitionList.RequisitionListView.productListTable.headers.productName" });
  si(() => (N.current = !0, () => {
    N.current = !1;
  }), []), si(() => {
    let g = !0;
    return c("preview_loading"), k(""), T([]), (r ? We(e, I) : $e(e)).then((d) => {
      if (!(!g || !N.current)) {
        if (!d) {
          k(""), c("preview_error");
          return;
        }
        L(d), c("preview_loaded");
      }
    }).catch((d) => {
      !g || !N.current || (k(d instanceof Error && d.message ? d.message : ""), c("preview_error"));
    }), () => {
      g = !1;
    };
  }, [e, r, I]);
  const S = P(() => {
    c("importing"), k(""), Qe(e).then(({ requisitionList: g, userErrors: d }) => {
      if (!N.current) return;
      if (d.length > 0) {
        k(d[0].message), c("import_error");
        return;
      }
      const C = (g == null ? void 0 : g.name) ?? "", V = (g == null ? void 0 : g.uid) ?? "";
      if (ei.emit("requisitionList/alert", { action: "import", type: "success", context: "requisitionList", listName: C }), n) {
        n(V, C);
        return;
      }
      c("import_success");
    }).catch((g) => {
      N.current && (k(g instanceof Error && g.message ? g.message : ""), c("import_error"));
    });
  }, [e, n]), q = async (g) => {
    if (s !== "cart_adding") {
      c("cart_adding"), k("");
      try {
        const d = await (t == null ? void 0 : t());
        if (!d) throw new Error(m.cartError);
        const C = await Ge(e, d, g);
        if (await (o == null ? void 0 : o()), !N.current) return;
        C.userErrors.length ? (k(C.userErrors.map((V) => V.message).join(" ")), c("cart_error")) : c("cart_success");
      } catch (d) {
        if (!N.current) return;
        k(d instanceof Error ? d.message : m.cartError), c("cart_error");
      }
    }
  }, R = w || (s === "import_error" ? m.errorImport : m.errorPreview);
  return i(Ct, { status: s, previewData: u, errorMessage: R, onImport: S, isPublic: r, onAddToCart: q, selectedItemUids: y, onSelectedItemsChange: T, onPageChange: h, canAddToCart: !!t, routeProduct: l, translations: m });
};
Mt.displayName = "SharedRequisitionList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, n) {
  try {
    if (typeof document < "u") {
      const l = n.styleId;
      if (document.querySelector(`style[data-dropin="${l}"]`)) return;
      const r = document.createElement("style");
      for (const o in n.attributes) r.setAttribute(o, n.attributes[o]);
      r.setAttribute("data-dropin", l), r.appendChild(document.createTextNode(e));
      const t = document.querySelector('style[data-dropin="sdk"]');
      if (t) t.after(r);
      else {
        const o = document.querySelector('link[rel="stylesheet"], style');
        o ? o.before(r) : document.head.append(r);
      }
    }
  } catch (l) {
    console.error("dropin-styles (injectCodeFunction)", l);
  }
})('.requisition-list-form{background-color:var(--color-neutral-50);box-sizing:border-box}.requisition-list-form__title{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}.requisition-list-form__notification{margin-bottom:var(--spacing-medium)}.requisition-list-form__form{display:grid;gap:var(--spacing-medium);grid-template-columns:1fr}.requisition-list-form__actions{align-items:center;display:flex;gap:0 var(--grid-2-gutters);justify-content:flex-end}.requisition-list-form_progress-spinner{float:right}.requisition-list-grid-wrapper__content{display:grid;grid-template-columns:repeat(4,1fr);row-gap:var(--spacing-xsmall);width:100%}.requisition-list-grid-wrapper__list-header{display:contents}.requisition-list-grid-wrapper__pagination{grid-column:1 / -1;margin-top:var(--spacing-small);display:flex;justify-content:space-between;align-items:center}.requisition-list-grid-wrapper__pagination-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-grid-wrapper__add-new{margin:var(--spacing-medium) 0}.requisition-list-grid-wrapper__name__title{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-emphasized-font);margin-bottom:2px}.requisition-list-grid-wrapper__name__title .dropin-tag-container{padding:2px 10px;flex-shrink:0}.requisition-list-grid-wrapper__name__description{font:var(--type-details-caption-2-font)}.requisition-list-grid-wrapper__actions{display:flex;gap:var(--spacing-medium)}.requisition-list-grid-wrapper__actions .dropin-button--tertiary{padding:0}.requisition-list-grid-wrapper__actions .dropin-button--tertiary:hover{text-decoration:underline}.requisition-list-empty-list{margin-bottom:var(--spacing-small);text-align:center}.requisition-list__alert-wrapper{margin-bottom:var(--spacing-small)}.requisition-list-actions{align-items:center;background-color:var(--color-neutral-50);border:var(--shape-border-width-2) solid var(--color-neutral-400);border-radius:var(--shape-border-radius-2);cursor:pointer;display:flex;justify-content:space-between;padding:var(--spacing-medium);width:100%}.requisition-list-actions--selectable{max-width:100%;width:auto}.requisition-list-actions__title{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);-moz-appearance:none;appearance:none;-webkit-appearance:none;color:var(--color-neutral-800)}.requisition-list-actions svg{color:var(--color-neutral-800);stroke:var(--shape-icon-stroke-4)}@supports (height: 100dvh){.requisition-list-modal .dropin-modal{height:100dvh}}.dropin-modal__body--medium>.dropin-modal__header-title,.dropin-modal__body--full>.dropin-modal__header-title,.requisition-list-modal .dropin-modal__content{align-items:center;margin:0}.requisition-list-modal .dropin-modal__header-title-content h3{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0;padding:0}.requisition-list-modal .requisition-list-modal__spinner{align-items:center;background-color:var(--color-neutral-200);display:flex;height:100%;left:0;justify-content:center;opacity:var(--color-opacity-24);position:absolute;top:0;width:100%;z-index:1}.requisition-list-modal p{margin:var(--spacing-small) 0}.requisition-list-modal .requisition-list-modal__buttons{align-items:center;display:flex;gap:0 var(--spacing-small);justify-content:right}.requisition-list-modal--overlay{margin:auto;max-width:375px;padding:var(--spacing-small);position:relative;width:100%}@media (min-width: 768px){.requisition-list-modal--overlay{margin:auto;max-width:768px;padding:var(--spacing-xxbig);position:relative;width:100%}.requisition-list-modal p{color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}}.requisition-list-header{margin-bottom:var(--spacing-large)}.requisition-list-header__back{margin-bottom:var(--spacing-medium)}.requisition-list-header__back-link{display:inline-block;color:var(--color-neutral-800);font-size:var(--type-body-1-font-size);font-weight:var(--type-body-1-font-weight);line-height:var(--type-body-1-line-height);text-decoration:none!important;cursor:pointer;transition:color .2s ease;position:relative;padding-bottom:1px}.requisition-list-header__back-link *{text-decoration:none!important}.requisition-list-header__back-link:hover{color:var(--color-neutral-600);text-decoration:none!important}.requisition-list-header__back-link:hover:after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background-color:var(--color-neutral-800)}.requisition-list-header__back-arrow{margin-right:var(--spacing-xsmall);text-decoration:none!important}.requisition-list-header__main{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--spacing-medium);flex-wrap:wrap}.requisition-list-header__title-section{flex:1;min-width:0}.requisition-list-header__title{margin:0;padding:0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-900)}.requisition-list-header__public-tag{margin-top:var(--spacing-xsmall);width:fit-content;padding:2px 10px}.requisition-list-header__description{margin:var(--spacing-xsmall) 0 0;padding:0;font-size:var(--type-body-1-font-size);font-weight:var(--type-body-1-font-weight);line-height:var(--type-body-1-line-height);color:var(--color-neutral-700)}.requisition-list-header__actions{display:flex;gap:var(--spacing-medium);flex-wrap:wrap;align-items:center}.requisition-list-header__action-link{color:var(--color-neutral-800);font-size:var(--type-body-2-font-size);font-style:normal;font-weight:var(--type-body-2-font-weight);line-height:var(--type-body-2-line-height);letter-spacing:var(--type-body-2-letter-spacing);text-decoration:underline;cursor:pointer;transition:color .2s ease}.requisition-list-header__action-link:hover{color:var(--color-neutral-600)}.requisition-list-header__action-link--disabled,.requisition-list-header__action-link--disabled:hover{color:var(--color-neutral-500)!important;cursor:not-allowed;text-decoration:none;position:relative}.requisition-list-header__action-link--disabled[data-disabled-reason]:hover:after,.requisition-list-header__action-link--disabled[data-disabled-reason]:focus-visible:after{content:attr(data-disabled-reason);position:absolute;top:calc(100% + 6px);left:0;z-index:5;max-width:260px;padding:6px 8px;border-radius:4px;background:var(--color-neutral-900);color:var(--color-neutral-100);font:var(--type-details-caption-2-font);line-height:1.3;white-space:normal}@media (max-width: 768px){.requisition-list-header__main{flex-direction:column;align-items:stretch}.requisition-list-header__actions{justify-content:flex-start}}.empty-list{text-align:center;margin:auto 0}.not-found{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--spacing-large);text-align:center;min-height:400px}.not-found svg{color:var(--color-neutral-400);margin-bottom:var(--spacing-medium)}.not-found h2{font-size:var(--type-headline-3-font-size);font-weight:var(--type-headline-3-font-weight);margin:0 0 var(--spacing-small) 0;color:var(--color-neutral-800)}.not-found p{font-size:var(--type-body-1-font-size);color:var(--color-neutral-600);margin:0 0 var(--spacing-medium) 0;max-width:500px}.not-found button{margin-top:var(--spacing-small)}.requisition-list-view-product-list-table-container{display:flex;flex-direction:column;gap:var(--spacing-small)}.requisition-list-view-product-list-table__checkbox{align-self:center;justify-self:center}.requisition-list-view-product-list-table__index-container{display:inline-block;line-height:1}.requisition-list-view-product-list-table__item-container{display:flex;align-items:flex-start;gap:var(--spacing-small)}.requisition-list-view-product-list-table__item-details{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.requisition-list-view-product-list-table__product-name{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);font-weight:700}.requisition-list-view-product-list-table__out-of-stock{font:var(--type-body-1-default-font);color:var(--color-error, #d32f2f)}.requisition-list-view-product-list-table__low-stock{font:var(--type-body-1-default-font);color:var(--color-warning, #ed6c02)}.requisition-list-view-product-list-table__product-configurable-name{font:var(--type-body-1-default-font)}.requisition-list-view-product-list-table__sku{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.requisition-list-view-product-list-table__options{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-neutral-600, #666)}.requisition-list-view-product-list-table__thumbnail{width:44px;flex-shrink:0}.requisition-list-view-product-list-table__quantity{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);display:block;justify-self:center}.requisition-list-view-product-list-table__discount-container{display:flex;flex-direction:row;flex-wrap:wrap;gap:var(--spacing-xxsmall);align-items:baseline}.requisition-list-view-product-list-table__price.strikethrough{text-decoration:line-through}.requisition-list-view-product-list-table__discounted-price{color:var(--color-alert-800)}.requisition-list-view-product-list-table-container__submit-container{display:flex;justify-content:flex-end}.requisition-list-view__batch-actions{--batch-actions-background: #f0f4f8;--batch-actions-toggle-border: #b3b3b3;--batch-actions-toggle-border-hover: #666666;--batch-actions-toggle-background: #ffffff;--batch-actions-toggle-background-hover: #f5f5f5;--batch-actions-toggle-active-background: #505050;--batch-actions-toggle-active-background-hover: #3d3d3d;--batch-actions-toggle-icon-active: #ffffff;--batch-actions-label-color: #2d2d2d;--batch-actions-badge-background: #378ef0;--batch-actions-badge-color: #ffffff;--batch-actions-button-background: #fafafa;--batch-actions-button-background-hover: #f0f0f0;--batch-actions-button-border: #d3d3d3;--batch-actions-delete-color: #4a4a4a;--batch-actions-delete-color-hover: #d7373f;display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-medium) 0;margin-bottom:var(--spacing-small);background-color:var(--batch-actions-background);border-radius:0}.requisition-list-view__batch-actions-left{display:flex;align-items:center;gap:var(--spacing-small);padding-left:var(--spacing-medium)}.requisition-list-view__batch-actions-select-toggle{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:1px solid var(--batch-actions-toggle-border);border-radius:0;background-color:var(--batch-actions-toggle-background);cursor:pointer;transition:all .2s ease}.requisition-list-view__batch-actions-select-toggle:hover:not(:disabled){border-color:var(--batch-actions-toggle-border-hover);background-color:var(--batch-actions-toggle-background-hover)}.requisition-list-view__batch-actions-select-toggle--active{background-color:var(--batch-actions-toggle-active-background);border-color:var(--batch-actions-toggle-active-background)}.requisition-list-view__batch-actions-select-toggle--active svg,.requisition-list-view__batch-actions-select-toggle--active path{fill:var(--batch-actions-toggle-icon-active);color:var(--batch-actions-toggle-icon-active)}.requisition-list-view__batch-actions-select-toggle--active:hover:not(:disabled){background-color:var(--batch-actions-toggle-active-background-hover);border-color:var(--batch-actions-toggle-active-background-hover)}.requisition-list-view__batch-actions-select-toggle:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__batch-actions-select-label{padding:0;border:none;background:none;font-size:var(--type-base-font-size);font-weight:var(--type-base-font-weight);color:var(--batch-actions-label-color);cursor:pointer;transition:opacity .2s ease}.requisition-list-view__batch-actions-select-label:hover:not(:disabled){opacity:.8}.requisition-list-view__batch-actions-select-label:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__batch-actions-count-badge{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border-radius:50%;background-color:var(--batch-actions-badge-background);color:var(--batch-actions-badge-color);font-size:var(--type-detail-2-font-size);font-weight:var(--type-detail-2-font-weight);line-height:1;flex-shrink:0}.requisition-list-view__batch-actions-buttons{display:flex;align-items:center;gap:var(--spacing-small);padding-right:var(--spacing-medium)}.requisition-list-view__batch-actions-buttons button:not(.requisition-list-view__batch-actions-delete-icon){border-radius:var(--shape-border-radius-1);background-color:var(--batch-actions-button-background);border:1px solid var(--batch-actions-button-border)}.requisition-list-view__batch-actions-buttons button:not(.requisition-list-view__batch-actions-delete-icon):hover:not(:disabled){background-color:var(--batch-actions-button-background-hover)}.requisition-list-view__batch-actions-delete-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:none;background:transparent;color:var(--batch-actions-delete-color);cursor:pointer;transition:color .2s ease}.requisition-list-view__batch-actions-delete-icon:hover:not(:disabled){color:var(--batch-actions-delete-color-hover);background:none!important}.requisition-list-view__batch-actions-delete-icon:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__bulk-actions{margin-bottom:var(--spacing-xsmall);display:flex;gap:var(--spacing-xsmall);align-items:center}.page-size-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.page-size-picker__label{font-size:var(--font-size-small);color:var(--color-text-secondary);white-space:nowrap}.page-size-picker__select{min-width:60px}.pagination-items-counter{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-picker__form .dropin-card__content{align-items:center;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;gap:var(--spacing-xxsmall);padding:var(--spacing-xsmall)}.requisition-list-picker__form .dropin-card--secondary{border:none}.requisition-list-picker__form .requisition-list-picker__actions{display:flex;justify-content:flex-end;margin-top:var(--spacing-medium)}.requisition-list-picker__available-lists{max-height:300px;min-height:200px;overflow-y:scroll}.requisition-list-picker__available-lists::-webkit-scrollbar{width:var(--spacing-small);display:block}.requisition-list-picker__available-lists::-webkit-scrollbar-track{background:var(--color-neutral-100);border-radius:var(--shape-border-radius-2)}.requisition-list-picker__available-lists::-webkit-scrollbar-thumb{background:var(--color-neutral-300);border-radius:var(--shape-border-radius-2)}.requisition-list-picker__available-lists::-webkit-scrollbar-thumb:hover{background:var(--color-neutral-500)}.share-requisition-list-content{display:flex;flex-direction:column;gap:var(--spacing-small)}.requisition-list-modal .share-requisition-list-content__instruction{color:var(--color-neutral-700)}.share-requisition-list-content__success{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.share-requisition-list-content__success .share-requisition-list-content__instruction{margin:0}.share-requisition-list-content__recipient-list{display:flex;flex-direction:column}.share-requisition-list-content__recipient-list .share-requisition-list-content__recipient{margin:0;color:var(--color-neutral-800)}.share-requisition-list-content__field{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.share-requisition-list-content__multi-select{flex:1;min-width:0}.share-requisition-list-content__multi-select .dropin-multi-select__container{min-height:unset}.share-requisition-list-content__field .dropin-field__hint{margin:0}.share-requisition-list-content__loading{display:flex;align-items:center;gap:var(--spacing-xsmall);color:var(--color-neutral-600);padding:var(--spacing-xsmall) 0}.share-requisition-list-content__actions{display:flex;justify-content:end;gap:var(--spacing-small)}.share-requisition-list-content__actions button{min-width:140px}.share-requisition-list-content__divider-secondary{width:100%}.share-requisition-list-content__link-row{display:flex;gap:var(--spacing-small);align-items:center}.share-requisition-list-content__link-row .dropin-input-container{flex:1;min-width:0}.shared-requisition-list__loading{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:200px;gap:var(--spacing-small);width:100%}.shared-requisition-list__container{width:100%;margin-top:var(--spacing-medium)}.shared-requisition-list__preview{margin-top:var(--spacing-medium);width:100%}.shared-requisition-list__alert-wrapper{margin-bottom:var(--spacing-medium)}.shared-requisition-list__preview-details{display:flex;flex-direction:column;gap:var(--spacing-small);margin-bottom:var(--spacing-small)}.shared-requisition-list__preview-row{display:flex;gap:var(--spacing-small)}.shared-requisition-list__preview-label{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);color:var(--color-neutral-800);min-width:120px;flex-shrink:0}.shared-requisition-list__preview-value{min-width:0;overflow-wrap:anywhere;font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-900)}.shared-requisition-list__actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:var(--spacing-small);align-items:center}.shared-requisition-list__table-wrapper{margin-bottom:var(--spacing-large);max-width:100%;overflow-x:auto}.shared-requisition-list__product{display:flex;align-items:center;gap:var(--spacing-small);min-width:160px}.shared-requisition-list__product img{flex-shrink:0;object-fit:contain}.shared-requisition-list__product a{display:flex;align-items:center;gap:var(--spacing-small)}.requisition-list-view__container{width:100%}.requisition-list-view__loading{display:flex;justify-content:center;align-items:center;min-height:400px;width:100%}.requisition-list-view__pagination{margin-top:var(--spacing-small);display:flex;justify-content:space-between;align-items:center}.requisition-list-view__pagination-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-modal .requisition-list-actions{margin:var(--spacing-medium) auto}', { styleId: "RequisitionList" });
export {
  $i as RequisitionListForm,
  xt as RequisitionListGrid,
  At as RequisitionListHeader,
  It as RequisitionListSelector,
  Pt as RequisitionListView,
  fe as ShareRequisitionListContent,
  Mt as SharedRequisitionList
};
//# sourceMappingURL=containers.js.map
