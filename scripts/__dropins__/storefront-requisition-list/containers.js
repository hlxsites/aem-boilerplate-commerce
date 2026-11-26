/*! Copyright 2026 Adobe
All Rights Reserved. */
import { Slot as De, classes as ri, VComponent as me, deepmerge as Ve } from "@dropins/tools/lib.js";
import { useText as si } from "@dropins/tools/i18n.js";
import * as U from "@dropins/tools/preact-bundle.js";
import { jsx as i, useState as _, useCallback as I, jsxs as b, Fragment as ci, useEffect as ni, useRef as vi, useMemo as ki } from "@dropins/tools/preact-bundle.js";
import { updateRequisitionList as Ei, s as Q, getCompanyUsers as Ue, getPublicRequisitionListToken as ze, shareRequisitionListByToken as Oe, i as Si, d as Be, loadRequisitionListData as xi, getAllRequisitionListItems as Fe, deleteRequisitionList as ge, sharePublicRequisitionList as je, shareRequisitionListByEmail as He, enrichRequisitionList as oe, enrichConfigurableProducts as We, e as $e, addRequisitionListItemsToCart as Qe, deleteRequisitionListItems as Ke, updateRequisitionListItems as Ge, f as Ze, g as Ye, getPublicRequisitionList as Xe, getSharedRequisitionList as Je, importSharedRequisitionList as it, h as et, addPublicRequisitionListItemsToCart as tt, c as nt, getRequisitionLists as Fi, moveItemsBetweenRequisitionLists as st, copyItemsBetweenRequisitionLists as ot, a as ae, b as Oi, u as at, config as rt } from "./api.js";
import { events as X } from "@dropins/tools/event-bus.js";
import { Header as he, InLineAlert as li, ProgressSpinner as _i, Pagination as qe, Icon as mi, Card as Ti, Button as Z, Field as wi, Input as Pi, TextArea as lt, Checkbox as be, Tag as Le, Table as Wi, Modal as ct, MultiSelect as ut, Divider as dt, Image as pt, Picker as mt, UIProvider as gt, Price as re } from "@dropins/tools/components.js";
import { render as le, h as ht } from "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
/*! Copyright 2026 Adobe
All Rights Reserved. */
const qt = { containerTitle: "Requisition Lists", RequisitionListWrapper: { name: "Name & Description", itemsCount: "Items", lastUpdated: "Latest activity", actions: "Actions", loginMsg: "Please login", deleteRequisitionListTitle: "Are you sure you want to delete this Requisition List?", deleteRequisitionListMessage: "Requisition List will be permanently deleted. This action can not be undone.", confirmAction: "Confirm", cancelAction: "Cancel", emptyList: "No Requisition Lists found" }, AddNewReqList: { addNewReqListBtn: "Add new Requisition List" }, RequisitionListItem: { actionUpdate: "Update", actionDelete: "Delete" }, RequisitionListForm: { actionCancel: "Cancel", actionSave: "Save", requiredField: "This is a required field.", nameMinLength: "Name must be at least {min} characters long.", nameInvalidCharacters: "Name contains invalid characters. Only letters, numbers, spaces, and basic punctuation are allowed.", floatingLabel: "Requisition List Name *", placeholder: "Requisition List Name", label: "Description", updateTitle: "Update Requisition List", createTitle: "Create Requisition List", addToRequisitionList: "Add to Requisition List", markPublicLabel: "Make this requisition list public" }, RequisitionListSelector: { addToNewRequisitionList: "Add to New Requisition List", addToSelected: "Add to Selected List" }, RequisitionListAlert: { errorCreate: "Error creating requisition list.", successCreate: "Requisition list created successfully.", errorAddToCart: "Error adding item to cart.", successAddToCart: "Item(s) added to cart successfully.", errorUpdateQuantity: "Error updating quantity.", successUpdateQuantity: "Item quantity updated successfully.", errorUpdate: "Error updating requisition list.", successUpdate: "Requisition list updated successfully.", errorDeleteItem: "Error deleting item.", successDeleteItem: "Item(s) deleted successfully.", errorDeleteReqList: "Error deleting requisition list.", successDeleteReqList: "Requisition list deleted successfully.", errorMove: "Error moving item(s) to cart.", successMove: "Item(s) successfully moved to cart.", partialMoveSuccess: "{successCount} product(s) successfully added and {failedCount} product(s) couldn't be added to your shopping cart.", errorAddToRequisitionList: "Error adding item(s) to requisition list.", successAddToRequisitionList: "Item(s) successfully added to requisition list.", errorMoveToList: "Error moving item(s) to requisition list.", successMoveToList: "Item(s) successfully moved to {listName}.", errorCopyToList: "Error copying item(s) to requisition list.", successCopyToList: "Item(s) successfully copied to {listName}.", errorImport: "Error importing requisition list.", errorExport: "Unable to export requisition list. Please try again.", successImport: 'Requisition list "{listName}" has been added to your account.' }, SharedRequisitionList: { loading: "Loading shared requisition list...", previewTitle: "Shared Requisition List", senderLabel: "Shared by", listNameLabel: "List name", descriptionLabel: "Description", itemsCountLabel: "Items", importButton: "Import List", importingButton: "Importing...", errorPreview: "Unable to load the shared requisition list.", skuHeader: "SKU", qtyHeader: "Qty", optionsHeader: "Options", addToCart: "Add All to Cart", addSelectedToCart: "Add Selected to Cart", addingToCart: "Adding to Cart...", cartSuccess: "Items added to your cart.", cartError: "Unable to add items to your cart.", selectItem: "Select item", previousPage: "Previous", nextPage: "Next" }, RequisitionListView: { actionDelete: "Delete", statusDeleting: "Deleting...", actionDeleteSelected: "Delete Selected", actionDeleteSelectedItems: "Delete selected items", actionSelect: "Select", actionSelectAll: "Select All", actionSelectNone: "Select None", actionAddToCart: "Add to Cart", statusAddingToCart: "Adding...", actionAddSelectedToCart: "Add Selected to Cart", statusBulkAddingToCart: "Adding to Cart...", actionUpdateQuantity: "Update", statusUpdatingQuantity: "Updating...", errorUpdateQuantity: "Error updating quantity", successUpdateQuantity: "Item quantity updated successfully.", actionBackToRequisitionListsOverview: "Back to requisition lists overview", actionBackToRequisitionLists: "Back to Requisition Lists", actionRename: "Rename", actionExport: "Export", statusExporting: "Exporting...", actionPrint: "Print", statusPrinting: "Preparing print...", printWarning: "Some product details or pricing information are unavailable or could not be resolved. Printed amounts use the same pricing rules as the list view and may be incomplete.", printRecovery: "If you have closed the print dialog and printing is still busy, reset the print operation. Close the dialog before resetting.", actionRecoverPrint: "Reset print operation", printError: "Unable to prepare the requisition list for printing. Please try again.", actionDeleteList: "Delete List", actionMakePublic: "Make Public", actionMakePrivate: "Make Private", statusPublic: "Public", actionShare: "Share", shareDisabledReason: "You cannot share an empty requisition list.", shareDisabledNoCompany: "Sharing is available only for company account users.", shareListTitle: "Share Requisition List", deleteListTitle: "Delete Requisition List?", deleteListMessage: "Are you sure you want to delete this requisition list? This action cannot be undone.", deleteItemsTitle: "Delete Item(s)?", deleteItemsMessage: "Are you sure you want to delete the selected item(s) from this requisition list? This action cannot be undone.", confirmAction: "Delete", cancelAction: "Cancel", actionMoveToList: "Move to List", moveToListTitle: "Move to Requisition List", moveToListConfirm: "Move to requisition list", actionCopyToList: "Copy to List", copyToListTitle: "Copy to Requisition List", copyToListConfirm: "Copy to requisition list", emptyRequisitionList: " Requisition List is empty", productListTable: { headers: { productName: "Product name", sku: "SKU", price: "Price", quantity: "Quantity", subtotal: "Subtotal", actions: "Actions" }, itemQuantity: "Item quantity", outOfStock: "Out of stock", onlyXLeftInStock: "Only {count} left in stock" }, errorLoadPage: "Failed to load page", errorLoadingProducts: "Failed to load product data", notFoundTitle: "Requisition List Not Found", notFoundMessage: "The requisition list you are looking for does not exist or you do not have access to it.", notFoundActionLabel: "Back to Requisition Lists" }, RequisitionListPrint: { itemCount: "{count} item in requisition list", itemsCount: "{count} items in requisition list", item: "Item", table: "Requisition list items", unavailable: "N/A", imageUnavailable: "No image available" }, ShareRequisitionListContent: { emailInstruction: "Select below the email addresses of the people with whom you'd like to share your list. Your name, email address and the details of your list will be shared with recipients. You can send your list with multiple recipients. Please note only registered users will be able to import lists.", emailLabel: "Email addresses", emailPlaceholder: "Select company users", publicEmailPlaceholder: "recipient1@example.com, recipient2@example.com", publicEmailInstruction: "Enter below the email addresses of the people with whom you'd like to share your list, separated by commas. Your name, email address and the details of your list will be shared with recipients. You can send your list with multiple recipients.", publicLinkInstruction: "Copy the link below and send it to people with whom you'd like to share your list.", invalidEmail: "Enter valid email addresses.", submitLabel: "Submit", linkInstruction: "Copy the link below and send it to people with whom you'd like to share your list. Please note only registered users will be able to import lists.", copyLink: "Copy Link", linkCopied: "Copied!", loadingUsers: "Loading users...", loadingLink: "Generating share link...", sharingInProgress: "Sharing your list...", noUsersAvailable: "No company colleagues available to share with.", usersLoadError: "Unable to load company users. Please try again.", maxRecipientsValidation: "You can select up to {max} recipients.", shareSuccessMessage: "You have shared your list with the below email addresses:" }, RequisitionListsNotEnabled: { title: "Requisition Lists Not Available", message: "Requisition Lists are not available. Please contact your administrator for more information.", actionLabel: "Go to My Account" }, PageSizePicker: { show: "Show", itemsPerPage: "Items per page" }, PaginationItemsCounter: { itemsCounter: "Items {from}-{to} of {total}" } }, pi = { RequisitionList: qt }, bt = { default: pi }, Lt = ({ children: e }) => {
  var s;
  const [r, o] = _("en_US");
  ni(() => {
    const l = X.on("locale", (n) => {
      o(n);
    }, { eager: !0 });
    return () => {
      l == null || l.off();
    };
  }, []);
  const t = (s = rt.getConfig()) == null ? void 0 : s.langDefinitions, a = Ve(bt, t ?? {});
  return i(gt, { lang: r, langDefinitions: a, children: e });
}, yi = 10, ce = 3, vt = 40, ft = 255, _t = /^[a-zA-Z0-9\s.,\-_!?'"()&]+$/, $i = ({ className: e, mode: s, defaultValues: r = { name: "", description: "" }, error: o = null, onSubmit: t, onCancel: a, ...l }) => {
  const [n, c] = _(r), [R, v] = _({ name: !1 }), [g, L] = _(!1), p = si({ actionCancel: "RequisitionList.RequisitionListForm.actionCancel", actionSave: "RequisitionList.RequisitionListForm.actionSave", requiredField: "RequisitionList.RequisitionListForm.requiredField", nameMinLength: "RequisitionList.RequisitionListForm.nameMinLength", nameInvalidCharacters: "RequisitionList.RequisitionListForm.nameInvalidCharacters", floatingLabel: "RequisitionList.RequisitionListForm.floatingLabel", placeholder: "RequisitionList.RequisitionListForm.placeholder", label: "RequisitionList.RequisitionListForm.label", updateTitle: "RequisitionList.RequisitionListForm.updateTitle", createTitle: "RequisitionList.RequisitionListForm.createTitle", markPublicLabel: "RequisitionList.RequisitionListForm.markPublicLabel" }), h = Si(Q.config), x = (d) => {
    const T = d.trim();
    return T ? T.length < ce ? p.nameMinLength.replace("{min}", ce.toString()) : _t.test(T) ? "" : p.nameInvalidCharacters : p.requiredField;
  }, k = (d) => (T) => {
    const V = T.target;
    c((B) => ({ ...B, [d]: V.value }));
  }, q = (d) => () => {
    v((T) => ({ ...T, [d]: !0 }));
  }, C = (d) => {
    const T = d.target;
    c((V) => ({ ...V, is_public: T.checked }));
  }, f = async (d) => {
    var T;
    if (d.preventDefault(), v({ name: !0, description: !0 }), !(x(n.name) || g)) {
      L(!0);
      try {
        await t({ name: n.name.trim(), description: ((T = n.description) == null ? void 0 : T.trim()) ?? "", ...h ? { is_public: !!n.is_public } : {} });
      } catch {
        L(!1);
      }
    }
  }, S = R.name ? x(n.name) : "", m = s === "update" ? p.updateTitle : p.createTitle;
  return b("div", { ...l, className: ri(["requisition-list-form", e]), children: [b("div", { className: "requisition-list-form__title", children: [m, g ? i("div", { className: ri(["requisition-list-form_progress-spinner", e]), "data-testid": "requisition-list-form-progress-spinner", children: i(_i, { stroke: "4", size: "small" }) }) : null] }), o ? i(li, { type: "error", className: "requisition-list-form__notification", variant: "secondary", heading: o, "data-testid": "requisition-list-alert" }) : null, b("form", { className: ri(["requisition-list-form__form", e]), onSubmit: f, children: [i(wi, { error: S, disabled: g, children: i(Pi, { id: "requisition-list-form-name", name: "name", type: "text", floatingLabel: p.floatingLabel, placeholder: p.placeholder, maxLength: vt, value: n.name, onChange: k("name"), onBlur: q("name") }) }), i(wi, { disabled: g, children: i(lt, { id: "requisition-list-form-description", name: "description", label: p.label, placeholder: p.label, maxLength: ft, value: n.description, onChange: k("description"), onBlur: q("description") }) }), h ? i(wi, { disabled: g, children: i(be, { id: "requisition-list-form-is-public", name: "is_public", label: p.markPublicLabel, "data-testid": "requisition-list-form-is-public", checked: !!n.is_public, onChange: C }) }) : null, b("div", { className: "requisition-list-form__actions", children: [i(Z, { type: "button", variant: "secondary", onClick: a, disabled: g, "data-testid": "requisition-list-form-cancel", children: p.actionCancel }), i(Z, { type: "submit", disabled: g, "data-testid": "requisition-list-form-save", children: p.actionSave })] })] })] });
};
function yt(e, s, r, o) {
  const [t, a] = _(null);
  return { error: t, submit: async (l) => {
    a(null);
    try {
      const n = l.description ?? "", c = e === "update" && s ? await Ei(s, l.name, n, void 0, void 0, void 0, l.is_public) : await nt(l.name, n, l.is_public);
      return c && (r == null || r(c)), c;
    } catch (n) {
      const c = (n == null ? void 0 : n.message) || "Unexpected error";
      return a(c), o == null || o(c), null;
    }
  } };
}
const Qi = ({ mode: e, requisitionListUid: s, defaultValues: r = { name: "", description: "" }, onSuccess: o, onError: t, onCancel: a }) => {
  const { error: l, submit: n } = yt(e, s, o, t);
  return i($i, { mode: e, defaultValues: r, error: l, onSubmit: async (c) => {
    await n(c);
  }, onCancel: a });
};
Qi.displayName = "RequisitionListForm";
let qi = 0;
const ve = () => {
  const [e, s] = _(Q.requisitionLists), [r, o] = _(Q.requisitionListsLoading), [t, a] = _(qi);
  return ni(() => {
    Q.requisitionLists.length === 0 && !Q.requisitionListsLoading && (ae(!0), Fi(1, 100).then((l) => {
      const n = (l == null ? void 0 : l.items) || [];
      Oi(n), qi++;
    }).catch((l) => {
      console.error("Error fetching requisition lists:", l), Oi([]), qi++;
    }).finally(() => {
      ae(!1);
    }));
  }, []), ni(() => {
    const l = X.on("requisitionLists/data", (c) => {
      c && (Oi(c), qi++, a(qi), s(Q.requisitionLists), o(Q.requisitionListsLoading));
    }), n = X.on("requisitionList/data", (c) => {
      c && (at(c), qi++, a(qi), s([...Q.requisitionLists]), o(Q.requisitionListsLoading));
    });
    return () => {
      l == null || l.off(), n == null || n.off();
    };
  }, []), ni(() => {
    t !== qi && (s(Q.requisitionLists), o(Q.requisitionListsLoading), a(qi));
  }, [t]), { lists: e, loading: r };
};
function Ki(e) {
  const [s, r] = _(null), o = si({ errorCreate: "RequisitionList.RequisitionListAlert.errorCreate", successCreate: "RequisitionList.RequisitionListAlert.successCreate", errorDeleteItem: "RequisitionList.RequisitionListAlert.errorDeleteItem", successDeleteItem: "RequisitionList.RequisitionListAlert.successDeleteItem", errorDeleteReqList: "RequisitionList.RequisitionListAlert.errorDeleteReqList", successDeleteReqList: "RequisitionList.RequisitionListAlert.successDeleteReqList", errorAddToCart: "RequisitionList.RequisitionListAlert.errorAddToCart", successAddToCart: "RequisitionList.RequisitionListAlert.successAddToCart", errorUpdateQuantity: "RequisitionList.RequisitionListAlert.errorUpdateQuantity", successUpdateQuantity: "RequisitionList.RequisitionListAlert.successUpdateQuantity", errorUpdate: "RequisitionList.RequisitionListAlert.errorUpdate", successUpdate: "RequisitionList.RequisitionListAlert.successUpdate", errorMove: "RequisitionList.RequisitionListAlert.errorMove", successMove: "RequisitionList.RequisitionListAlert.successMove", errorAddToRequisitionList: "RequisitionList.RequisitionListAlert.errorAddToRequisitionList", successAddToRequisitionList: "RequisitionList.RequisitionListAlert.successAddToRequisitionList", errorMoveToList: "RequisitionList.RequisitionListAlert.errorMoveToList", successMoveToList: "RequisitionList.RequisitionListAlert.successMoveToList", errorCopyToList: "RequisitionList.RequisitionListAlert.errorCopyToList", successCopyToList: "RequisitionList.RequisitionListAlert.successCopyToList", errorImport: "RequisitionList.RequisitionListAlert.errorImport", errorExport: "RequisitionList.RequisitionListAlert.errorExport", successImport: "RequisitionList.RequisitionListAlert.successImport" }), t = ki(() => ({ ...o, ...e }), [o, e]), a = ki(() => ({ create: { requisitionList: { success: t.successCreate, error: t.errorCreate } }, add: { product: { success: t.successAddToRequisitionList, error: t.errorAddToRequisitionList } }, update: { product: { success: t.successUpdateQuantity, error: t.errorUpdateQuantity }, requisitionList: { success: t.successUpdate, error: t.errorUpdate } }, delete: { product: { success: t.successDeleteItem, error: t.errorDeleteItem }, requisitionList: { success: t.successDeleteReqList, error: t.errorDeleteReqList } }, move: { product: { success: t.successMove, error: t.errorMove } }, moveToList: { product: { success: t.successMoveToList, error: t.errorMoveToList } }, copyToList: { product: { success: t.successCopyToList, error: t.errorCopyToList } }, import: { requisitionList: { success: t.successImport, error: t.errorImport } }, export: { requisitionList: { error: t.errorExport } } }), [t]), l = I((n) => {
    const { type: c, action: R, context: v, skus: g, message: L, listName: p } = n;
    let h = L && L.length > 0 ? L.join(". ") : a[R][v][c];
    p && (h = h.replace("{listName}", p)), r({ type: c, description: h, sku: g == null ? void 0 : g[0] });
    const x = setTimeout(() => {
      r(null);
    }, 5e3);
    return () => clearTimeout(x);
  }, [a]);
  return { alert: s, setAlert: r, handleRequisitionListAlert: l };
}
const Ri = (e) => {
  window.location.href = e;
};
function Rt(e, s, r) {
  const o = si({ actionRename: "RequisitionList.RequisitionListView.actionRename", actionDeleteList: "RequisitionList.RequisitionListView.actionDeleteList", statusPublic: "RequisitionList.RequisitionListView.statusPublic" }), t = Si(Q.config), [a, l] = _(null), [n, c] = _(!1), [R, v] = _(!1), g = I(() => {
    r && r(), c(!0);
  }, [r]), L = I(() => c(!1), []), p = ki(() => {
    if (e) return { handleOpenRenameModal: (q) => {
      c((C) => C && !1), e.handleOpenRenameModal(q);
    }, handleOpenDeleteModal: (q) => {
      c((C) => C && !1), e.handleOpenDeleteModal(q);
    } };
  }, [e]), h = I(async (q, C) => {
    var f, S, m;
    v(!0);
    try {
      const d = await Fi(q, C), T = ((f = d == null ? void 0 : d.page_info) == null ? void 0 : f.current_page) ?? 1, V = ((S = d == null ? void 0 : d.page_info) == null ? void 0 : S.total_pages) ?? 0;
      if (!((((m = d == null ? void 0 : d.items) == null ? void 0 : m.length) ?? 0) > 0) && T > 1 && V >= T - 1) {
        const B = T - 1, W = await Fi(B, C);
        l(W);
      } else l(d);
    } finally {
      v(!1);
    }
  }, []);
  ni(() => {
    const q = X.on("requisitionLists/data", (C) => {
      C && C.items && l(C);
    }, { eager: !0 });
    return () => {
      q == null || q.off();
    };
  }, []), ni(() => {
    a || h(1, yi);
  }, [a, h]);
  const x = I((q) => {
    var C, f;
    const S = q ?? ((C = a == null ? void 0 : a.page_info) == null ? void 0 : C.current_page) ?? 1, m = ((f = a == null ? void 0 : a.page_info) == null ? void 0 : f.page_size) ?? yi;
    return h(S, m);
  }, [h, a]), k = I(async (q) => {
    await h(1, q);
  }, [h]);
  return { rows: ki(() => ((a == null ? void 0 : a.items) ?? []).map((q) => ({ name: b("div", { className: "requisition-list-grid-wrapper__name", children: [b("div", { className: "requisition-list-grid-wrapper__name__title", children: [i("a", { href: "#", onClick: (C) => {
    if (C.preventDefault(), s) {
      const f = s(q.uid);
      typeof f == "string" && Ri(f);
    }
  }, children: q.name }), t && q.is_public && i("span", { "data-testid": "public-status-tag", children: i(Le, { label: o.statusPublic }) })] }), q.description && i("div", { className: "requisition-list-grid-wrapper__name__description", children: q.description })] }), items_count: q.items_count, last_updated: new Date(q.updated_at).toLocaleString(), actions: b("div", { className: "requisition-list-grid-wrapper__actions", children: [i(Z, { variant: "tertiary", type: "button", "data-testid": "rename-button", onClick: () => p == null ? void 0 : p.handleOpenRenameModal(q), children: o.actionRename }), i(Z, { variant: "tertiary", type: "button", "data-testid": "delete-button", onClick: () => p == null ? void 0 : p.handleOpenDeleteModal(q), children: o.actionDeleteList })] }) })), [a == null ? void 0 : a.items, o.actionRename, o.actionDeleteList, o.statusPublic, t, p, s]), isLoading: R || !a, pageInfo: a == null ? void 0 : a.page_info, totalCount: a == null ? void 0 : a.total_count, handlePageChange: x, handlePageSizeChange: k, isAdding: n, handleAddNew: g, handleCancelCreate: L };
}
function wt() {
  const [e, s] = _(null), [r, o] = _(/* @__PURE__ */ new Set()), t = I((n, c) => {
    o((R) => {
      const v = new Set(R);
      return c ? v.add(n) : v.delete(n), v;
    });
  }, []), a = I(() => {
    var n;
    const c = (n = e == null ? void 0 : e.items) == null ? void 0 : n.map((R) => R.uid);
    o(new Set(c));
  }, [e]), l = I(() => {
    o(/* @__PURE__ */ new Set());
  }, []);
  return { currentRequisitionList: e, setCurrentRequisitionList: s, selectedItems: r, setSelectedItems: o, handleItemSelection: t, handleSelectAll: a, handleSelectNone: l };
}
function ue() {
  const e = Q.config;
  return e ? e.is_requisition_list_active === "1" && e.company_enabled === !0 : !1;
}
const Gi = () => {
  const [e, s] = _(ue);
  return ni(() => {
    const r = X.on("requisitionList/initialized", () => {
      const o = ue();
      s((t) => Q.config != null ? o : t);
    });
    return () => r == null ? void 0 : r.off();
  }, []), { isEnabled: e };
};
function kt({ sourceListUid: e, selectedItems: s, currentPageSize: r, currentPage: o, enrichConfigurableProductsInList: t, fetchAndMergeProducts: a, setCurrentRequisitionList: l, setSelectedItems: n, handleRequisitionListAlert: c, beginLoad: R }) {
  const [v, g] = _(!1), [L, p] = _(!1), h = vi(null), [x, k] = _(!1), [q, C] = _(!1), f = si({ successMoveToList: "RequisitionList.RequisitionListAlert.successMoveToList", successCopyToList: "RequisitionList.RequisitionListAlert.successCopyToList" }), S = I(async (d) => {
    var T;
    if (s.size === 0) return;
    const V = R();
    h.current = V, p(!0);
    try {
      const B = await st(e, d, Array.from(s), r, o, V.signal);
      if (V.signal.throwIfAborted(), B != null && B.sourceList) {
        const W = await t(B.sourceList, V.signal), K = await a(W, V.signal);
        V.signal.throwIfAborted(), l(K), n(/* @__PURE__ */ new Set());
        const u = ((T = B.destinationList) == null ? void 0 : T.name) || "";
        c({ action: "moveToList", type: "success", context: "product", message: [f.successMoveToList.replace("{listName}", u)] });
      } else c({ action: "moveToList", type: "error", context: "product" });
    } catch {
      if (V.signal.aborted) return;
      c({ action: "moveToList", type: "error", context: "product" });
    } finally {
      h.current === V && (p(!1), g(!1));
    }
  }, [s, e, r, o, t, a, l, n, c, f.successMoveToList, R]), m = I(async (d) => {
    if (s.size !== 0) {
      C(!0);
      try {
        const T = await ot(e, d, Array.from(s));
        if (T != null && T.destinationList) {
          n(/* @__PURE__ */ new Set());
          const V = T.destinationList.name || "";
          c({ action: "copyToList", type: "success", context: "product", message: [f.successCopyToList.replace("{listName}", V)] });
        } else c({ action: "copyToList", type: "error", context: "product" });
      } catch {
        c({ action: "copyToList", type: "error", context: "product" });
      } finally {
        C(!1), k(!1);
      }
    }
  }, [s, e, n, c, f.successCopyToList]);
  return { showMoveToListModal: v, setShowMoveToListModal: g, movingToList: L, showCopyToListModal: x, setShowCopyToListModal: k, copyingToList: q, handleMoveToList: S, handleCopyToList: m };
}
function Ct(e, s, r) {
  return I(async (o) => {
    var t, a;
    try {
      const l = await Ei(o.uid, o.name, o.description, (t = o.page_info) == null ? void 0 : t.page_size, (a = o.page_info) == null ? void 0 : a.current_page, r, !o.is_public);
      l ? e(l) : s();
    } catch {
      s();
    }
  }, [e, s, r]);
}
const xt = ({ className: e, isLoading: s = !1, header: r, rows: o = [], skeletonRowCount: t = 10, pageInfo: a, totalCount: l = 0, handlePageChange: n, handlePageSizeChange: c, defaultPageSize: R = 10, isAdding: v, handleAddNew: g, handleCancelCreate: L, ...p }) => {
  const h = si({ name: "RequisitionList.RequisitionListWrapper.name", itemsCount: "RequisitionList.RequisitionListWrapper.itemsCount", lastUpdated: "RequisitionList.RequisitionListWrapper.lastUpdated", actions: "RequisitionList.RequisitionListWrapper.actions", emptyList: "RequisitionList.RequisitionListWrapper.emptyList", show: "RequisitionList.PageSizePicker.show" }), x = ((a == null ? void 0 : a.total_pages) ?? 0) > 0, k = !s && o.length === 0 && !x, { alert: q, setAlert: C, handleRequisitionListAlert: f } = Ki();
  return ni(() => {
    const S = X.on("requisitionList/alert", f);
    try {
      const m = localStorage.getItem("requisitionListPendingAlert");
      if (m) {
        const d = JSON.parse(m);
        f(d), localStorage.removeItem("requisitionListPendingAlert");
      }
    } catch {
    }
    return () => {
      S == null || S.off();
    };
  }, [f]), b("div", { ...p, className: ri(["requisition-list-grid-wrapper", e]), "data-testid": "requisition-list-grid-wrapper", children: [r && i("div", { className: ri(["requisition-list-grid-wrapper__header", e]), "data-testid": "requisition-list-grid-wrapper-header", children: i(me, { node: r }) }), q && i("div", { className: "requisition-list__alert-wrapper", children: i(li, { heading: q.description, type: q.type, variant: "primary", onDismiss: () => C(null) }) }), k ? i(Zi, { textContent: h.emptyList }) : b(ci, { children: [i(Wi, { columns: [{ key: "name", label: h.name }, { key: "items_count", label: h.itemsCount }, { key: "last_updated", label: h.lastUpdated }, { key: "actions", label: h.actions }], rowData: o, loading: s, skeletonRowCount: t }), a && b("div", { className: ri(["requisition-list-grid-wrapper__pagination", e]), children: [i(we, { pageInfo: a, totalCount: l }), (a.total_pages || 0) > 1 && i(qe, { totalPages: a.total_pages, currentPage: a.current_page || 1, onChange: n, disabled: s }), b("div", { className: "requisition-list-grid-wrapper__pagination-picker", children: [i("span", { children: h.show }), i(Re, { currentPageSize: a.page_size || R, onPageSizeChange: c || (() => Promise.resolve()), disabled: s })] })] })] }), i("div", { className: ri(["requisition-list-grid-wrapper__add-new", e]), children: v ? i(Ti, { variant: "secondary", children: i(Qi, { mode: "create", onSuccess: async () => {
    await n(), L(), f({ type: "success", action: "create", context: "requisitionList" });
  }, onError: () => {
    f({ type: "error", action: "create", context: "requisitionList" });
  }, onCancel: L }) }) : i(_e, { onAddNew: g }) })] });
}, St = (e) => U.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...e }, U.createElement("g", { id: "Large" }, U.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), U.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, U.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), U.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" })))), Tt = (e) => U.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, U.createElement("g", { clipPath: "url(#clip0_102_196)" }, U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), U.createElement("defs", null, U.createElement("clipPath", { id: "clip0_102_196" }, U.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" })))), Pt = (e) => U.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M7.74512 9.87701L12.0001 14.132L16.2551 9.87701", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round" })), Ai = (e) => U.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, U.createElement("rect", { x: 4.89282, y: 2.75, width: 14.2143, height: 18.5, rx: 2.25, stroke: "currentColor", strokeWidth: 1 }), U.createElement("line", { x1: 9.85718, y1: 7.67871, x2: 16.2857, y2: 7.67871, stroke: "currentColor", strokeWidth: 1 }), U.createElement("line", { x1: 9.85718, y1: 11.9644, x2: 16.2857, y2: 11.9644, stroke: "currentColor", strokeWidth: 1 }), U.createElement("line", { x1: 9.85718, y1: 16.25, x2: 16.2857, y2: 16.25, stroke: "currentColor", strokeWidth: 1 }), U.createElement("circle", { cx: 7.71429, cy: 7.71429, r: 0.714286, fill: "currentColor" }), U.createElement("circle", { cx: 7.71429, cy: 11.9999, r: 0.714286, fill: "currentColor" }), U.createElement("circle", { cx: 7.71429, cy: 16.2856, r: 0.714286, fill: "currentColor" })), At = (e) => U.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...e }, U.createElement("path", { d: "M17.3332 11.75H6.6665", strokeWidth: 1, strokeLinecap: "square", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke", fill: "none", stroke: "currentColor" })), Nt = (e) => U.createElement("svg", { id: "Icon_Search_Base", "data-name": "Icon \\u2013 Search \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, fill: "none", viewBox: "0 0 24 24", ...e }, U.createElement("g", { id: "Large" }, U.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), U.createElement("g", { id: "Search_icon", "data-name": "Search icon", transform: "translate(3.75 3.75)" }, U.createElement("circle", { vectorEffect: "non-scaling-stroke", id: "Ellipse_186", "data-name": "Ellipse 186", cx: 6, cy: 6, r: 6, fill: "none", stroke: "currentColor" }), U.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_556", "data-name": "Line 556", x2: 6, y2: 6, transform: "translate(10.5 10.5)", fill: "none", stroke: "currentColor" })))), fe = (e) => U.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...e }, U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M1 5H23", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 }), U.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1, strokeMiterlimit: 10 })), _e = ({ selectable: e, className: s, onAddNew: r }) => {
  const o = si({ addNewReqListBtn: "RequisitionList.AddNewReqList.addNewReqListBtn" });
  return b("button", { type: "button", "aria-label": o.addNewReqListBtn, role: "button", className: ri(["requisition-list-actions", ["requisition-list-actions--selectable", e], s]), "data-testid": "requisition-list-actions-button", onClick: r, children: [i("span", { className: "requisition-list-actions__title", "data-testid": "requisition-list-actions-button-text", children: o.addNewReqListBtn }), i(mi, { source: St, size: "32" })] });
}, bi = ({ isOpen: e, isLoading: s, title: r, modalContent: o, closeBtnCaption: t, confirmBtnCaption: a, handleModalOnClose: l, handleModalOnConfirm: n }) => e ? i(ct, { className: "requisition-list-modal--overlay", "data-testid": "requisition-list-modal", size: "medium", centered: !1, title: r, onClose: l, backgroundDim: !0, clickToDismiss: !0, escapeToDismiss: !0, role: "dialog", "aria-label": r, children: b("div", { className: "requisition-list-modal", children: [s ? i("div", { className: "requisition-list-modal__spinner", "data-testid": "progress-spinner", children: i(_i, { stroke: "4", size: "large" }) }) : null, i("p", { children: o }), b("div", { className: "requisition-list-modal__buttons", children: [l && t && i(Z, { "data-testid": "rl-modal-close-button", type: "button", onClick: l, variant: "secondary", disabled: s, children: t }), n && a && i(Z, { "data-testid": "rl-modal-confirm-button", type: "button", onClick: n, disabled: s, children: a })] })] }) }) : null, Et = ({ name: e, description: s, showPublicTag: r, publicTagLabel: o, exportAction: t, printAction: a, backLink: l, actions: n, className: c, ...R }) => b("div", { ...R, className: `requisition-list-header ${c || ""}`, children: [l && i("div", { className: "requisition-list-header__back", children: b("a", { href: l.url, className: "requisition-list-header__back-link", onClick: l.onClick, children: [i("span", { className: "requisition-list-header__back-arrow", children: "<" }), l.label] }) }), b("div", { className: "requisition-list-header__main", children: [b("div", { className: "requisition-list-header__title-section", children: [i("h1", { className: "requisition-list-header__title", children: e }), s && i("p", { className: "requisition-list-header__description", children: s }), r && i("span", { "data-testid": "public-status-tag", children: i(Le, { label: o, className: "requisition-list-header__public-tag" }) })] }), ((n == null ? void 0 : n.onRename) || (n == null ? void 0 : n.onDelete) || (n == null ? void 0 : n.onShare) || (n == null ? void 0 : n.onTogglePublic) || (n == null ? void 0 : n.shareDisabled) || t || a) && b("div", { className: "requisition-list-header__actions", children: [a && i("a", { href: "#", className: `requisition-list-header__action-link${a.loading ? " requisition-list-header__action-link--disabled" : ""}`, "data-testid": "print-list-btn", "aria-disabled": a.loading, "aria-busy": a.loading, onClick: (v) => {
  v.preventDefault(), a.loading || a.onClick();
}, children: a.label }), t && i("a", { href: "#", className: `requisition-list-header__action-link${t.loading ? " requisition-list-header__action-link--disabled" : ""}`, "data-testid": "export-list-btn", "aria-disabled": t.loading, "aria-busy": t.loading, onClick: (v) => {
  v.preventDefault(), t.loading || t.onClick();
}, children: t.label }), ((n == null ? void 0 : n.onShare) || (n == null ? void 0 : n.shareDisabled)) && i("a", { href: "#", onClick: (v) => {
  var g;
  v.preventDefault(), !n.shareDisabled && ((g = n.onShare) == null || g.call(n));
}, className: `requisition-list-header__action-link ${n.shareDisabled ? "requisition-list-header__action-link--disabled" : ""}`, "data-testid": "share-list-btn", "aria-disabled": n.shareDisabled ? "true" : "false", "aria-label": n.shareDisabled && n.shareDisabledReason ? `${n.shareLabel} – ${n.shareDisabledReason}` : void 0, "data-disabled-reason": n.shareDisabled ? n.shareDisabledReason : void 0, children: n.shareLabel }), (n == null ? void 0 : n.onRename) && i("a", { href: "#", onClick: (v) => {
  var g;
  v.preventDefault(), (g = n.onRename) == null || g.call(n);
}, className: "requisition-list-header__action-link", "data-testid": "rename-list-btn", children: n.renameLabel }), (n == null ? void 0 : n.onDelete) && i("a", { href: "#", onClick: (v) => {
  var g;
  v.preventDefault(), (g = n.onDelete) == null || g.call(n);
}, className: "requisition-list-header__action-link", "data-testid": "delete-list-btn", children: n.deleteLabel }), (n == null ? void 0 : n.onTogglePublic) && i("a", { href: "#", onClick: (v) => {
  var g;
  v.preventDefault(), (g = n.onTogglePublic) == null || g.call(n);
}, className: "requisition-list-header__action-link", "data-testid": "toggle-public-list-btn", "aria-pressed": !!n.isPublic, children: n.isPublic ? n.makePrivateLabel : n.makePublicLabel })] })] })] }), Zi = ({ className: e, textContent: s, ...r }) => b("div", { className: ri(["empty-list", e]), "data-testid": "empty-list", ...r, children: [i(mi, { source: Ai, size: "64", stroke: "2" }), s && i("h4", { children: s })] }), ji = ({ className: e, title: s = "404 - Not Found", message: r = "The requisition list you are looking for does not exist.", actionLabel: o, onAction: t, ...a }) => b("div", { className: ri(["not-found", e]), "data-testid": "not-found", ...a, children: [i(mi, { source: Nt, size: "64", stroke: "2" }), i("h2", { children: s }), r && i("p", { children: r }), o && t && i(Z, { variant: "primary", onClick: t, children: o })] });
function ye({ item: e }) {
  var s, r, o;
  return b(ci, { children: [!!((s = e.configurable_options) != null && s.length) && i("div", { className: "requisition-list-view-product-list-table__options", children: e.configurable_options.map((t) => `${t.option_label}: ${t.value_label}`).join(", ") }), (r = e.bundle_options) == null ? void 0 : r.map((t, a) => t.values.map((l, n) => b("span", { className: "requisition-list-view-product-list-table__product-configurable-name", children: [l.label, " x ", l.quantity] }, `${a}-${n}`))), (o = e.customizable_options) == null ? void 0 : o.map((t) => b("div", { className: "requisition-list-view-product-list-table__options", children: [t.label, ":", " ", t.values.map((a) => a.label || a.value).join(", ")] }, t.uid))] });
}
function Ni({ item: e, subtotal: s = !1 }) {
  var r, o, t, a, l, n, c, R, v, g, L, p, h, x, k, q, C, f, S, m, d, T, V, B;
  const W = Array.isArray(e.bundle_options) ? e.bundle_options : [], K = W.length ? W.reduce((G, N) => {
    var j, oi, H;
    return G + (((oi = (j = N.values[0]) == null ? void 0 : j.priceV2) == null ? void 0 : oi.value) || 0) * (((H = N.values[0]) == null ? void 0 : H.quantity) || 0);
  }, 0) : ((a = (t = (o = (r = e.configured_product) == null ? void 0 : r.price) == null ? void 0 : o.final) == null ? void 0 : t.amount) == null ? void 0 : a.value) || ((R = (c = (n = (l = e.product) == null ? void 0 : l.price) == null ? void 0 : n.final) == null ? void 0 : c.amount) == null ? void 0 : R.value) || 0, u = W.length ? W.reduce((G, N) => {
    var j, oi, H;
    return G + (((oi = (j = N.values[0]) == null ? void 0 : j.original_price) == null ? void 0 : oi.value) || 0) * (((H = N.values[0]) == null ? void 0 : H.quantity) || 0);
  }, 0) : ((p = (L = (g = (v = e.configured_product) == null ? void 0 : v.price) == null ? void 0 : g.regular) == null ? void 0 : L.amount) == null ? void 0 : p.value) || ((q = (k = (x = (h = e.product) == null ? void 0 : h.price) == null ? void 0 : x.regular) == null ? void 0 : k.amount) == null ? void 0 : q.value) || 0, A = ((m = (S = (f = (C = e.configured_product) == null ? void 0 : C.price) == null ? void 0 : f.final) == null ? void 0 : S.amount) == null ? void 0 : m.currency) || ((B = (V = (T = (d = e.product) == null ? void 0 : d.price) == null ? void 0 : T.final) == null ? void 0 : V.amount) == null ? void 0 : B.currency), z = u > 0 && K < u, O = s ? e.quantity : 1;
  return b("span", { className: "requisition-list-view-product-list-table__discount-container", children: [i(re, { className: ri(["requisition-list-view-product-list-table__price", z ? "strikethrough" : ""]), amount: u * O || K * O, currency: A }), z && i(re, { className: "requisition-list-view-product-list-table__discounted-price", amount: K * O, currency: A })] });
}
const It = ({ className: e, items: s, selectedItems: r, currentPage: o, pageSize: t, canEdit: a = !0, handleItemSelection: l, handleUpdateQuantity: n, onAddToCart: c, onDeleteItem: R, useParentConfigurableThumbnail: v = !1, ...g }) => {
  const [L, p] = _({}), [h, x] = _({}), k = si({ productNameHeader: "RequisitionList.RequisitionListView.productListTable.headers.productName", skuHeader: "RequisitionList.RequisitionListView.productListTable.headers.sku", priceHeader: "RequisitionList.RequisitionListView.productListTable.headers.price", quantityHeader: "RequisitionList.RequisitionListView.productListTable.headers.quantity", subtotalHeader: "RequisitionList.RequisitionListView.productListTable.headers.subtotal", actionsHeader: "RequisitionList.RequisitionListView.productListTable.headers.actions", actionAddToCart: "RequisitionList.RequisitionListView.actionAddToCart", actionDelete: "RequisitionList.RequisitionListView.actionDelete", actionSelect: "RequisitionList.RequisitionListView.actionSelect", itemQuantity: "RequisitionList.RequisitionListView.productListTable.itemQuantity", outOfStock: "RequisitionList.RequisitionListView.productListTable.outOfStock", onlyXLeftInStock: "RequisitionList.RequisitionListView.productListTable.onlyXLeftInStock" }), q = [{ label: "#", key: "index" }, { label: "item", key: "item" }, { label: k.priceHeader, key: "price" }, { label: k.quantityHeader, key: "quantity" }, { label: k.subtotalHeader, key: "subtotal" }];
  a && (q.unshift({ label: k.actionSelect, key: "selector" }), q.push({ label: k.actionsHeader, key: "actions" }));
  const C = (u, A) => {
    const z = u.target.checked;
    l(A.uid, z);
  }, f = (u) => (o - 1) * t + u + 1, S = (u) => {
    var A, z;
    return ((A = u.configured_product) == null ? void 0 : A.name) || ((z = u.product) == null ? void 0 : z.name) || u.sku;
  }, m = (u) => {
    var A, z, O, G, N, j;
    return !v && (z = (A = u.configured_product) == null ? void 0 : A.images) != null && z.length ? ((O = u.configured_product.images[0]) == null ? void 0 : O.url) || "" : (N = (G = u.product) == null ? void 0 : G.images) != null && N.length && ((j = u.product.images[0]) == null ? void 0 : j.url) || "";
  }, d = (u) => {
    var A;
    return ((A = u.product) == null ? void 0 : A.name) || u.sku;
  }, T = (u) => {
    var A;
    return ((A = u.configured_product) == null ? void 0 : A.sku) || u.sku;
  }, V = (u, A) => {
    const z = +u.target.value;
    z > 0 && !Number.isNaN(u.target.value) && x((O) => ({ ...O, [A.uid]: z }));
  }, B = async (u, A) => {
    const z = +u.target.value;
    if (!(z > 0 && z !== A.quantity)) {
      x((O) => ({ ...O, [A.uid]: A.quantity }));
      return;
    }
    p((O) => ({ ...O, [A.uid]: !0 }));
    try {
      await n(A.uid, z);
    } finally {
      p((O) => ({ ...O, [A.uid]: !1 }));
    }
  }, W = s.map((u, A) => ({ selector: i("label", { id: `item-selector-${u.sku}-label`, children: i(be, { className: "requisition-list-view-product-list-table__checkbox", name: `item-selector-${u.sku}`, "aria-label": `${k.actionSelect} ${d(u)}`, "data-testid": `item-checkbox-${u.sku}`, onChange: (z) => C(z, u), value: u.sku, checked: r.has(u.uid) }) }), index: i("div", { className: "requisition-list-view-product-list-table__index-container", children: f(A) }), item: b("div", { className: "requisition-list-view-product-list-table__item-container", children: [i(pt, { className: "requisition-list-view-product-list-table__thumbnail", alt: S(u), src: m(u) }), b("div", { className: "requisition-list-view-product-list-table__item-details", children: [i("div", { className: "requisition-list-view-product-list-table__product-name", children: d(u) }), u.stock_status === "OUT_OF_STOCK" && i("div", { className: "requisition-list-view-product-list-table__out-of-stock", children: k.outOfStock }), u.stock_status !== "OUT_OF_STOCK" && u.only_x_left_in_stock !== null && u.only_x_left_in_stock < u.quantity && i("div", { className: "requisition-list-view-product-list-table__low-stock", children: k.onlyXLeftInStock.replace("{count}", String(u.only_x_left_in_stock)) }), i("div", { className: "requisition-list-view-product-list-table__sku", children: T(u) }), i(ye, { item: u })] })] }), price: i(Ni, { item: u }), quantity: i("span", { className: "requisition-list-view-product-list-table__quantity", children: i(wi, { disabled: !!L[u.uid], children: i(Pi, { id: `requisition-list-item-quantity-${u.sku}`, "data-testid": `requisition-list-item-quantity-${u.sku}`, name: "quantity", type: "text", "aria-label": `${k.itemQuantity} - ${d(u)}`, value: h[u.uid] ?? u.quantity, onChange: (z) => V(z, u), onBlur: (z) => B(z, u) }) }) }), subtotal: i(Ni, { item: u, subtotal: !0 }), actions: b("div", { className: "requisition-list-view__bulk-actions", children: [i(Z, { type: "button", onClick: () => c([u.uid]), icon: i(mi, { source: Tt }), "aria-label": `${k.actionAddToCart} - ${d(u)}`, "data-testid": "product-list-table-add-to-cart-button" }), i(Z, { type: "button", variant: "secondary", icon: i(mi, { source: fe }), onClick: () => R([u.uid]), "aria-label": `${k.actionDelete} - ${d(u)}`, "data-testid": "product-list-table-delete-button" })] }) })), K = i(Wi, { columns: q, rowData: W, "data-testid": "product-list-table", mobileLayout: "stacked" });
  return i(me, { node: ht("div", {}), className: ri(["requisition-list-view-product-list-table-container", e]), "data-testid": "product-list-table-container", ...g, children: K });
}, Mt = ({ selectedItems: e, deletingItemId: s, addingToCartItemId: r, bulkAddingToCart: o, updatingQuantityItemId: t, bulkMovingToList: a = !1, bulkCopyingToList: l = !1, onSelectAll: n, onSelectNone: c, onBulkAddToCart: R, onBulkDelete: v, onBulkMoveToList: g, onBulkCopyToList: L }) => {
  const p = si({ statusDeleting: "RequisitionList.RequisitionListView.statusDeleting", actionSelectAll: "RequisitionList.RequisitionListView.actionSelectAll", actionSelectNone: "RequisitionList.RequisitionListView.actionSelectNone", actionAddToCart: "RequisitionList.RequisitionListView.actionAddToCart", actionDeleteSelectedItems: "RequisitionList.RequisitionListView.actionDeleteSelectedItems", statusBulkAddingToCart: "RequisitionList.RequisitionListView.statusBulkAddingToCart", actionMoveToList: "RequisitionList.RequisitionListView.actionMoveToList", actionCopyToList: "RequisitionList.RequisitionListView.actionCopyToList" }), h = s !== null || r !== null || o || t !== null || a || l, x = e.size > 0;
  return b("div", { className: "requisition-list-view__batch-actions", children: [b("div", { className: "requisition-list-view__batch-actions-left", children: [i("button", { "data-testid": "bulk-actions-select-toggle-btn", type: "button", className: `requisition-list-view__batch-actions-select-toggle ${x ? "requisition-list-view__batch-actions-select-toggle--active" : ""}`, onClick: x ? c : n, disabled: h, "aria-label": x ? p.actionSelectNone : p.actionSelectAll, children: i(mi, { source: At }) }), i("button", { type: "button", className: "requisition-list-view__batch-actions-select-label", onClick: x ? c : n, disabled: h, children: p.actionSelectAll })] }), x && b("div", { className: "requisition-list-view__batch-actions-buttons", children: [i("span", { className: "requisition-list-view__batch-actions-count-badge", "aria-label": `${e.size} items selected`, children: e.size }), g && i(Z, { "data-testid": "bulk-actions-move-to-list-btn", type: "button", variant: "secondary", onClick: g, disabled: h, children: p.actionMoveToList }), L && i(Z, { "data-testid": "bulk-actions-copy-to-list-btn", type: "button", variant: "secondary", onClick: L, disabled: h, children: p.actionCopyToList }), i(Z, { "data-testid": "bulk-actions-add-to-cart-btn", type: "button", variant: "secondary", onClick: R, disabled: h, children: o ? p.statusBulkAddingToCart : p.actionAddToCart }), i("button", { "data-testid": "bulk-actions-delete-btn", type: "button", className: "requisition-list-view__batch-actions-delete-icon", onClick: v, disabled: h, "aria-label": p.actionDeleteSelectedItems, children: i(mi, { source: fe }) })] })] });
}, Re = ({ currentPageSize: e, onPageSizeChange: s, disabled: r = !1, pageSizeOptions: o = [10, 25, 50, 100] }) => {
  const t = si({ itemsPerPage: "RequisitionList.PageSizePicker.itemsPerPage" }), a = (n) => {
    const c = n.target, R = parseInt(c.value, 10);
    s(R);
  }, l = o.map((n) => ({ value: n.toString(), text: n.toString() }));
  return i(mt, { disabled: r, "data-testid": "page-size-picker", variant: "primary", size: "medium", value: e.toString(), options: l, handleSelect: a, "aria-label": t.itemsPerPage });
}, we = ({ pageInfo: e, totalCount: s, className: r = "" }) => {
  const o = si({ itemsCounter: "RequisitionList.PaginationItemsCounter.itemsCounter" });
  if (!e || !s) return null;
  const t = e.page_size ?? yi, a = e.current_page ?? 1, l = t * a, n = s, c = l - t + 1, R = l > n ? n : l;
  return i("span", { className: `pagination-items-counter ${r}`.trim(), children: o.itemsCounter.replace("{from}", c.toString()).replace("{to}", R.toString()).replace("{total}", n.toString()) });
}, Hi = ({ excludeUid: e, confirmLabel: s, disabled: r = !1, onConfirm: o }) => {
  const { lists: t } = ve(), [a, l] = _(null), n = e ? t.filter((c) => c.uid !== e) : t;
  return i(Ti, { variant: "secondary", children: b("form", { onSubmit: (c) => {
    c.preventDefault(), a && o(a);
  }, className: "requisition-list-picker__form", children: [i("div", { className: "requisition-list-picker__available-lists", children: n.map((c) => b(Ti, { variant: a === c.uid ? "primary" : "secondary", onClick: () => l(c.uid), children: [i(mi, { source: Ai }), i("span", { children: c.name })] }, c.uid)) }), i("div", { className: "requisition-list-picker__actions", children: i(Z, { type: "submit", disabled: !a || r, children: s }) })] }) });
}, Dt = ({ loadingUsers: e, usersErrorMessage: s, loadingLink: r, selectedUserValues: o, multiSelectOptions: t, shareLink: a, linkErrorMessage: l, linkCopied: n, isSubmitting: c, canSubmit: R, onSubmitClick: v, onCopyLinkClick: g, onSelectedUsersChange: L, onUsersFieldInteract: p, selectionError: h, submitErrorMessage: x, isShareSuccess: k, sharedRecipientEmails: q, isPublic: C = !1, recipientEmails: f = "", onRecipientEmailsChange: S }) => {
  const m = si({ emailInstruction: "RequisitionList.ShareRequisitionListContent.emailInstruction", emailLabel: "RequisitionList.ShareRequisitionListContent.emailLabel", emailPlaceholder: "RequisitionList.ShareRequisitionListContent.emailPlaceholder", submitLabel: "RequisitionList.ShareRequisitionListContent.submitLabel", linkInstruction: "RequisitionList.ShareRequisitionListContent.linkInstruction", copyLink: "RequisitionList.ShareRequisitionListContent.copyLink", linkCopied: "RequisitionList.ShareRequisitionListContent.linkCopied", loadingUsers: "RequisitionList.ShareRequisitionListContent.loadingUsers", loadingLink: "RequisitionList.ShareRequisitionListContent.loadingLink", sharingInProgress: "RequisitionList.ShareRequisitionListContent.sharingInProgress", noUsersAvailable: "RequisitionList.ShareRequisitionListContent.noUsersAvailable", maxRecipientsValidation: "RequisitionList.ShareRequisitionListContent.maxRecipientsValidation", shareSuccessMessage: "RequisitionList.ShareRequisitionListContent.shareSuccessMessage", publicEmailPlaceholder: "RequisitionList.ShareRequisitionListContent.publicEmailPlaceholder", publicEmailInstruction: "RequisitionList.ShareRequisitionListContent.publicEmailInstruction", publicLinkInstruction: "RequisitionList.ShareRequisitionListContent.publicLinkInstruction" });
  return b("div", { className: "share-requisition-list-content", children: [k ? b("div", { className: "share-requisition-list-content__success", children: [i("p", { className: "share-requisition-list-content__instruction", children: m.shareSuccessMessage }), i("div", { className: "share-requisition-list-content__recipient-list", children: q.map((d) => i("p", { className: "share-requisition-list-content__recipient", children: d }, d)) })] }) : b(ci, { children: [i("p", { className: "share-requisition-list-content__instruction", children: C ? m.publicEmailInstruction : m.emailInstruction }), i("div", { className: "share-requisition-list-content__field", children: !C && e ? b("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: m.loadingUsers })] }) : !C && s ? i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: s }) : c ? b("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: m.sharingInProgress })] }) : i(wi, { label: m.emailLabel, error: h ?? void 0, disabled: c, onMouseDown: p, onKeyDown: p, children: C ? i(Pi, { type: "email", multiple: !0, value: f, onInput: (d) => S == null ? void 0 : S(d.currentTarget.value), placeholder: m.publicEmailPlaceholder, disabled: c, "aria-label": m.emailLabel, "data-testid": "public-share-emails" }) : i(ut, { options: t, value: o, onChange: L, placeholder: m.emailPlaceholder, noResultsText: m.noUsersAvailable, disabled: c, error: !!h, className: "share-requisition-list-content__multi-select" }) }) }), !c && i("div", { className: "share-requisition-list-content__actions", children: i(Z, { variant: "primary", onClick: v, disabled: !R, type: "button", "data-testid": "share-submit-btn", children: m.submitLabel }) }), !c && x && i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: x })] }), i(dt, { variant: "secondary", className: "share-requisition-list-content__divider-secondary" }), i("p", { className: "share-requisition-list-content__instruction", children: C ? m.publicLinkInstruction : m.linkInstruction }), r ? b("div", { className: "share-requisition-list-content__loading", children: [i(_i, { size: "small", stroke: "3" }), i("span", { children: m.loadingLink })] }) : a ? b(ci, { children: [i("div", { className: "share-requisition-list-content__link-row", children: i(Pi, { readOnly: !0, value: a, "data-testid": "share-link-field" }) }), i("div", { className: "share-requisition-list-content__actions", children: i(Z, { variant: "secondary", onClick: g, type: "button", "data-testid": "copy-link-btn", children: n ? m.linkCopied : m.copyLink }) })] }) : l ? i("p", { className: "dropin-field__hint dropin-field__hint--medium dropin-field__hint--error", children: l }) : null] });
}, Vt = (e) => {
  var s, r;
  return (s = e.configurable_options) != null && s.length ? e.configurable_options.map((o) => `${o.option_label}: ${o.value_label}`).join(", ") : (r = e.bundle_options) != null && r.length ? e.bundle_options.map((o) => o.label).join(", ") : "";
}, Ut = ({ status: e, previewData: s, errorMessage: r, onImport: o, translations: t, isPublic: a = !1, onAddToCart: l, selectedItemUids: n = [], onSelectedItemsChange: c, onPageChange: R, canAddToCart: v = !1, routeProduct: g }) => {
  var L;
  if (e === "preview_loading") return b("div", { className: "shared-requisition-list__loading", children: [i(_i, {}), i("span", { children: t.loading })] });
  if (e === "preview_error") return i("div", { className: "shared-requisition-list__container", children: i(li, { heading: r, type: "error", variant: "primary" }) });
  if (!s) return null;
  const p = s.requisitionList.name, h = s.requisitionList.items ?? [], x = e === "importing", k = e === "import_success", q = [{ label: t.skuHeader, key: "sku" }, { label: t.qtyHeader, key: "qty" }, { label: t.optionsHeader, key: "options" }], C = h.map((f) => {
    var S, m;
    const d = ((S = f.configured_product) == null ? void 0 : S.sku) || f.sku, T = b(ci, { children: [((m = f.image) == null ? void 0 : m.url) && i("img", { src: f.image.url, alt: f.image.label || f.name || f.sku, width: "48", height: "48" }), i("span", { children: f.name || f.sku })] });
    return { ...a ? { product: i("div", { className: "shared-requisition-list__product", children: g && f.urlKey ? i("a", { href: g(f.urlKey, d), children: T }) : T }), selection: i("input", { type: "checkbox", "aria-label": `${t.selectItem} ${f.sku}`, checked: n.includes(f.uid), disabled: e === "cart_adding", onChange: (V) => c == null ? void 0 : c(V.currentTarget.checked ? [...n, f.uid] : n.filter((B) => B !== f.uid)) }) } : {}, sku: d, qty: f.quantity, options: Vt(f) };
  });
  return b("div", { className: "shared-requisition-list__preview", children: [i(he, { title: t.previewTitle, "aria-label": t.previewTitle }), e === "import_success" && i("div", { className: "shared-requisition-list__alert-wrapper", children: i(li, { heading: t.successImport.replace("{listName}", p), type: "success", variant: "primary" }) }), e === "import_error" && i("div", { className: "shared-requisition-list__alert-wrapper", children: i(li, { heading: r, type: "error", variant: "primary" }) }), (e === "cart_success" || e === "cart_error") && i(li, { heading: e === "cart_success" ? t.cartSuccess ?? "" : r, type: e === "cart_success" ? "success" : "error", variant: "primary" }), b("div", { className: "shared-requisition-list__preview-details", children: [b("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.senderLabel }), i("span", { className: "shared-requisition-list__preview-value", children: s.senderName })] }), b("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.listNameLabel }), i("span", { className: "shared-requisition-list__preview-value", children: p })] }), s.requisitionList.description && b("div", { className: "shared-requisition-list__preview-row", children: [i("span", { className: "shared-requisition-list__preview-label", children: t.descriptionLabel }), i("span", { className: "shared-requisition-list__preview-value", children: s.requisitionList.description })] })] }), h.length > 0 && i("div", { className: "shared-requisition-list__table-wrapper", children: i(Wi, { columns: a ? [{ label: t.selectItem ?? "", key: "selection" }, { label: t.productHeader ?? "", key: "product" }, ...q] : q, rowData: C, "data-testid": "shared-list-items-table" }) }), i("div", { className: "shared-requisition-list__actions", children: a ? b(ci, { children: [i(Z, { type: "button", variant: "primary", onClick: () => l == null ? void 0 : l(), disabled: !v || e === "cart_adding" || !h.length, "data-testid": "add-public-list-to-cart-btn", children: e === "cart_adding" ? t.addingToCart : t.addToCart }), i(Z, { type: "button", variant: "secondary", onClick: () => l == null ? void 0 : l(n), disabled: !v || e === "cart_adding" || !n.length, "data-testid": "add-selected-public-items-to-cart-btn", children: t.addSelectedToCart })] }) : i(Z, { type: "button", variant: "primary", onClick: o, disabled: x || k, "data-testid": "import-shared-list-btn", children: x ? t.importingButton : t.importButton }) }), a && (((L = s.requisitionList.page_info) == null ? void 0 : L.total_pages) ?? 1) > 1 && b("div", { className: "shared-requisition-list__actions", children: [i(Z, { type: "button", variant: "secondary", disabled: e === "cart_adding" || s.requisitionList.page_info.current_page <= 1, onClick: () => R == null ? void 0 : R(s.requisitionList.page_info.current_page - 1), children: t.previousPage }), i(Z, { type: "button", variant: "secondary", disabled: e === "cart_adding" || s.requisitionList.page_info.current_page >= s.requisitionList.page_info.total_pages, onClick: () => R == null ? void 0 : R(s.requisitionList.page_info.current_page + 1), children: t.nextPage })] })] });
}, zt = ({ routeRequisitionListDetails: e, fallbackRoute: s = "/customer/account", slots: r }) => {
  const { isEnabled: o } = Gi(), [t, a] = _({ type: null, isOpen: !1, isLoading: !1, requisitionList: null }), l = I(() => {
    a({ type: null, isOpen: !1, isLoading: !1, requisitionList: null });
  }, []), n = I((d) => {
    a({ type: "rename", isOpen: !0, isLoading: !1, requisitionList: d });
  }, []), c = I((d) => {
    a({ type: "delete", isOpen: !0, isLoading: !1, requisitionList: d });
  }, []), { rows: R, isLoading: v, pageInfo: g, totalCount: L, handlePageChange: p, handlePageSizeChange: h, isAdding: x, handleAddNew: k, handleCancelCreate: q } = Rt({ handleOpenRenameModal: n, handleOpenDeleteModal: c }, e, l), C = I(async (d) => {
    if (t.requisitionList) try {
      await Ei(t.requisitionList.uid, d.name, d.description, void 0, void 0, void 0, d.is_public), X.emit("requisitionList/alert", { action: "update", type: "success", context: "requisitionList" }), await p(), l();
    } catch {
      X.emit("requisitionList/alert", { action: "update", type: "error", context: "requisitionList" });
    }
  }, [t.requisitionList, p, l]), f = async () => {
    t.requisitionList && (a({ ...t, isLoading: !0 }), await ge(t.requisitionList.uid).then(async () => {
      X.emit("requisitionList/alert", { type: "success", action: "delete", context: "requisitionList" });
    }).catch(() => {
      X.emit("requisitionList/alert", { type: "error", action: "delete", context: "requisitionList" });
    }).finally(async () => {
      await p(), l();
    }));
  }, S = si({ containerTitle: "RequisitionList.containerTitle", updateTitle: "RequisitionList.RequisitionListForm.updateTitle", deleteRequisitionListTitle: "RequisitionList.RequisitionListWrapper.deleteRequisitionListTitle", deleteRequisitionListMessage: "RequisitionList.RequisitionListWrapper.deleteRequisitionListMessage", cancelAction: "RequisitionList.RequisitionListWrapper.cancelAction", confirmAction: "RequisitionList.RequisitionListWrapper.confirmAction", notEnabledTitle: "RequisitionList.RequisitionListsNotEnabled.title", notEnabledMessage: "RequisitionList.RequisitionListsNotEnabled.message", notEnabledActionLabel: "RequisitionList.RequisitionListsNotEnabled.actionLabel" }), m = I(() => r != null && r.Header ? i(De, { name: "Header", "aria-label": S.containerTitle, title: S.containerTitle, slot: r.Header }) : i(he, { "aria-label": S.containerTitle, role: "region", title: S.containerTitle }), [r, S.containerTitle]);
  return o === !1 ? i(ji, { title: S.notEnabledTitle, message: S.notEnabledMessage, actionLabel: S.notEnabledActionLabel, onAction: () => {
    Ri(s);
  } }) : b(ci, { children: [i(xt, { header: m(), rows: R, skeletonRowCount: 10, isLoading: v, pageInfo: g, totalCount: L, handlePageChange: p, handlePageSizeChange: h, defaultPageSize: 10, isAdding: x, handleAddNew: k, handleCancelCreate: q }), t.type === "rename" && t.isOpen && t.requisitionList && i(bi, { isOpen: t.isOpen, isLoading: t.isLoading, title: S.updateTitle, modalContent: i($i, { mode: "update", defaultValues: { name: t.requisitionList.name, description: t.requisitionList.description || "", is_public: t.requisitionList.is_public }, onSubmit: C, onCancel: l }), handleModalOnClose: l }), t.type === "delete" && t.isOpen && i(bi, { isOpen: t.isOpen, isLoading: t.isLoading, title: S.deleteRequisitionListTitle, modalContent: S.deleteRequisitionListMessage, confirmBtnCaption: S.confirmAction, closeBtnCaption: S.cancelAction, handleModalOnClose: l, handleModalOnConfirm: f })] });
};
zt.displayName = "RequisitionListGrid";
const ke = ({ requisitionListUid: e, isSubmitting: s, onSubmit: r, currentCustomerEmail: o, routeSharedRequisitionList: t, isPublic: a = !1 }) => {
  const l = si({ emailInstruction: "RequisitionList.ShareRequisitionListContent.emailInstruction", emailLabel: "RequisitionList.ShareRequisitionListContent.emailLabel", emailPlaceholder: "RequisitionList.ShareRequisitionListContent.emailPlaceholder", submitLabel: "RequisitionList.ShareRequisitionListContent.submitLabel", linkInstruction: "RequisitionList.ShareRequisitionListContent.linkInstruction", copyLink: "RequisitionList.ShareRequisitionListContent.copyLink", linkCopied: "RequisitionList.ShareRequisitionListContent.linkCopied", loadingUsers: "RequisitionList.ShareRequisitionListContent.loadingUsers", loadingLink: "RequisitionList.ShareRequisitionListContent.loadingLink", noUsersAvailable: "RequisitionList.ShareRequisitionListContent.noUsersAvailable", usersLoadError: "RequisitionList.ShareRequisitionListContent.usersLoadError", maxRecipientsValidation: "RequisitionList.ShareRequisitionListContent.maxRecipientsValidation", shareSuccessMessage: "RequisitionList.ShareRequisitionListContent.shareSuccessMessage", invalidEmail: "RequisitionList.ShareRequisitionListContent.invalidEmail" }), [n, c] = _([]), [R, v] = _(""), [g, L] = _(!a), [p, h] = _(!1), [x, k] = _(/* @__PURE__ */ new Set()), [q, C] = _(null), [f, S] = _(!0), [m, d] = _(null), [T, V] = _(!1), [B, W] = _(null), [K, u] = _(null), [A, z] = _(!1), [O, G] = _([]), N = (() => {
    var D, y;
    const P = a ? (D = Q.config) == null ? void 0 : D.requisition_list_public_share_max_recipients : (y = Q.config) == null ? void 0 : y.requisition_list_share_max_recipients, E = Number(P);
    return Number.isFinite(E) && E > 0 ? E : null;
  })();
  ni(() => {
    if (a) {
      L(!1);
      return;
    }
    Ue().then((D) => {
      const y = D.filter((P) => !(o && P.email.toLowerCase() === o.toLowerCase()));
      c(y);
    }).catch(() => {
      h(!0);
    }).finally(() => L(!1));
  }, [o, a]), ni(() => {
    let D = !0;
    return S(!0), C(null), (a ? ze(e) : Oe(e)).then((y) => {
      var P, E;
      if (D) {
        if (y.token) {
          const J = `/${((a ? (P = Q.config) == null ? void 0 : P.requisition_list_public_share_storefront_path : (E = Q.config) == null ? void 0 : E.requisition_list_share_storefront_path) ?? "").replace(/^\/+|\/+$/g, "")}?requisition_id=${encodeURIComponent(y.token)}`, gi = t ? t(J) : J;
          C(gi);
        } else C(null);
        d(y.errorMessage);
      }
    }).catch((y) => {
      D && d(y instanceof Error ? y.message : l.usersLoadError);
    }).finally(() => {
      D && S(!1);
    }), () => {
      D = !1;
    };
  }, [e, t, a, l.usersLoadError]);
  const j = Array.from(new Set(R.split(/[\s,;]+/).filter(Boolean))), oi = N && j.length > N ? l.maxRecipientsValidation.replace("{max}", String(N)) : j.some((D) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(D)) ? l.invalidEmail : null, H = I(async () => {
    var D;
    const y = a ? j : Array.from(x), P = a ? j : n.filter((J) => y.includes(String(J.id))).map((J) => J.email), E = await r(y);
    E ? u(((D = E[0]) == null ? void 0 : D.message) || null) : (z(!0), G(P), u(null));
  }, [x, n, r, a, j]), ui = I(() => {
    navigator.clipboard.writeText(q).then(() => {
      V(!0), setTimeout(() => V(!1), 3e3);
    }, (D) => {
      console.error("Failed to copy share link to clipboard:", D);
    });
  }, [q]), Li = n.map((D) => ({ label: `${D.firstname} ${D.lastname} (${D.email})`, value: D.id })), hi = p ? l.usersLoadError : null, ai = !s && (a ? j.length > 0 && !oi : x.size > 0 && !B);
  return i(Dt, { isPublic: a, recipientEmails: R, onRecipientEmailsChange: v, loadingUsers: g, usersErrorMessage: hi, loadingLink: f, selectedUserValues: Array.from(x), multiSelectOptions: Li, shareLink: q, linkErrorMessage: m, linkCopied: T, isSubmitting: s, canSubmit: ai, onSubmitClick: H, onCopyLinkClick: ui, onUsersFieldInteract: () => {
    B && W(null), K && u(null);
  }, onSelectedUsersChange: (D) => {
    const y = D.map(String);
    if (N && y.length > N) {
      W(l.maxRecipientsValidation.replace("{max}", String(N)));
      return;
    }
    W(null), k(new Set(y));
  }, selectionError: a ? oi : B, submitErrorMessage: K, isShareSuccess: A, sharedRecipientEmails: O });
};
ke.displayName = "ShareRequisitionListContent";
function de(e) {
  const s = /^[=+-]/.test(e) ? ` ${e}` : e;
  return /[",\r\n\t ]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function Ot(e) {
  return ["sku,qty", ...e.map(({ sku: s, quantity: r }) => {
    if (typeof s != "string" || s.length === 0 || !Number.isFinite(r)) throw new Error("Unable to export an invalid requisition list line.");
    return `${de(s)},${de(String(r))}`;
  })].join(`\r
`) + `\r
`;
}
function Bt(e) {
  const s = e.replace(/[<>:"/\\|?*]/g, "_").replace(new RegExp("\\p{Cc}", "gu"), "_").trim().replace(/[. ]+$/g, "");
  return `${(/^(con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(s) ? `_${s}` : s) || "requisition-list"}.csv`;
}
function Ft(e, s) {
  const r = Ot(s), o = URL.createObjectURL(new Blob([r], { type: "text/csv;charset=utf-8" })), t = document.createElement("a");
  try {
    t.href = o, t.download = Bt(e), t.hidden = !0, document.body.appendChild(t), t.click();
  } finally {
    t.remove(), setTimeout(() => URL.revokeObjectURL(o), 0);
  }
}
function jt({ list: e, useParentConfigurableThumbnail: s = !1 }) {
  const r = si({ itemCount: "RequisitionList.RequisitionListPrint.itemCount", itemsCount: "RequisitionList.RequisitionListPrint.itemsCount", item: "RequisitionList.RequisitionListPrint.item", unavailable: "RequisitionList.RequisitionListPrint.unavailable", imageUnavailable: "RequisitionList.RequisitionListPrint.imageUnavailable", table: "RequisitionList.RequisitionListPrint.table", sku: "RequisitionList.RequisitionListView.productListTable.headers.sku", price: "RequisitionList.RequisitionListView.productListTable.headers.price", quantity: "RequisitionList.RequisitionListView.productListTable.headers.quantity", subtotal: "RequisitionList.RequisitionListView.productListTable.headers.subtotal", outOfStock: "RequisitionList.RequisitionListView.productListTable.outOfStock" });
  return b("section", { className: "requisition-list-print", children: [i("h1", { children: e.name }), e.description && i("p", { children: e.description }), i("p", { children: (e.items.length === 1 ? r.itemCount ?? pi.RequisitionList.RequisitionListPrint.itemCount : r.itemsCount ?? pi.RequisitionList.RequisitionListPrint.itemsCount).replace("{count}", String(e.items.length)) }), b("table", { "aria-label": r.table, children: [i("thead", { children: b("tr", { children: [i("th", { scope: "col", children: "#" }), i("th", { scope: "col", children: r.item }), i("th", { scope: "col", children: r.price }), i("th", { scope: "col", children: r.quantity }), i("th", { scope: "col", children: r.subtotal })] }) }), i("tbody", { children: e.items.map((o, t) => {
    var a, l, n, c, R, v, g, L, p;
    const h = ((a = o.configured_product) == null ? void 0 : a.sku) || o.sku || r.unavailable, x = ((l = o.product) == null ? void 0 : l.name) || o.name || h, k = !s && ((R = (c = (n = o.configured_product) == null ? void 0 : n.images) == null ? void 0 : c[0]) == null ? void 0 : R.url) || ((L = (g = (v = o.product) == null ? void 0 : v.images) == null ? void 0 : g[0]) == null ? void 0 : L.url) || ((p = o.image) == null ? void 0 : p.url);
    return b("tr", { "data-item-uid": o.uid, children: [i("td", { children: t + 1 }), i("td", { children: b("div", { className: "requisition-list-print__item", children: [b("span", { className: "requisition-list-print__thumbnail", children: [k && i("img", { src: k, alt: x, loading: "eager" }), i("span", { role: "img", "aria-label": r.imageUnavailable, hidden: !!k, children: r.imageUnavailable })] }), b("div", { className: "requisition-list-print__details", children: [i("strong", { children: x }), b("span", { children: [r.sku, ": ", h] }), i(ye, { item: o }), o.stock_status === "OUT_OF_STOCK" && i("span", { children: r.outOfStock })] })] }) }), i("td", { children: i(Ni, { item: o }) }), i("td", { children: o.quantity }), i("td", { children: i(Ni, { item: o, subtotal: !0 }) })] }, o.uid);
  }) })] })] });
}
const Ht = 5e3;
let Bi = null;
function Wt(e, s) {
  s.throwIfAborted();
  const r = Array.from(e.querySelectorAll("img"));
  return r.length ? new Promise((o, t) => {
    let a = !1;
    const l = new Set(r), n = /* @__PURE__ */ new Map(), c = () => {
      clearTimeout(g), s.removeEventListener("abort", R), n.forEach(({ load: L, error: p }, h) => {
        h.removeEventListener("load", L), h.removeEventListener("error", p);
      });
    }, R = () => {
      c(), t(s.reason);
    }, v = (L, p) => {
      if (l.delete(L)) {
        if (!p) {
          a = !0;
          const h = L.nextElementSibling;
          h instanceof HTMLElement && (h.hidden = !1), L.remove();
        }
        l.size || (c(), o(a));
      }
    }, g = setTimeout(() => {
      l.forEach((L) => v(L, !1));
    }, Ht);
    s.addEventListener("abort", R, { once: !0 }), r.forEach((L) => {
      const p = () => v(L, !0), h = () => v(L, !1);
      n.set(L, { load: p, error: h }), L.addEventListener("load", p), L.addEventListener("error", h);
    }), r.forEach((L) => {
      L.complete && v(L, L.naturalWidth > 0);
    });
  }) : Promise.resolve(!1);
}
function pe(e) {
  return e.throwIfAborted(), new Promise((s, r) => {
    const o = () => {
      cancelAnimationFrame(t), r(e.reason);
    }, t = requestAnimationFrame(() => {
      e.removeEventListener("abort", o), s();
    });
    e.addEventListener("abort", o, { once: !0 });
  });
}
function $t(e) {
  return e.throwIfAborted(), new Promise((s, r) => {
    const o = window.matchMedia("print");
    let t = !1;
    const a = () => {
      window.removeEventListener("afterprint", l), o.removeEventListener("change", n), e.removeEventListener("abort", c);
    }, l = () => {
      a(), s();
    }, n = (R) => {
      R.matches ? t = !0 : t && l();
    }, c = () => {
      a(), r(e.reason);
    };
    window.addEventListener("afterprint", l), o.addEventListener("change", n), e.addEventListener("abort", c, { once: !0 });
    try {
      window.print();
    } catch (R) {
      a(), r(R);
    }
  });
}
async function Qt(e, s) {
  if (s.throwIfAborted(), Bi) throw new Error("Another requisition list print operation is active.");
  const r = document.createElement("div");
  r.className = "requisition-list-print-root", r.setAttribute("aria-hidden", "true"), Bi = r, document.body.append(r);
  try {
    le(i(Lt, { children: i(jt, { ...e }) }), r), await Wt(r, s), await pe(s), await pe(s), s.throwIfAborted(), r.removeAttribute("aria-hidden"), document.body.classList.add("requisition-list-printing"), await $t(s);
  } finally {
    try {
      le(null, r);
    } finally {
      r.remove(), document.body.classList.remove("requisition-list-printing"), Bi = null;
    }
  }
}
const Kt = ({ requisitionList: e, routeRequisitionListGrid: s, onUpdate: r, onAlert: o, enrichConfigurableProducts: t, getProductData: a, currentCustomerEmail: l, routeSharedRequisitionList: n }) => {
  var c;
  const [R, v] = _(!1), [g, L] = _(!1), [p, h] = _(!1), [x, k] = _(!1), [q, C] = _(!1), [f, S] = _(!1), m = vi(null), d = vi(null), [T, V] = _(!1), [B, W] = _(null), [K, u] = _(null);
  ni(() => (S(!1), V(!1), W(null), u(null), () => {
    var P, E;
    (P = m.current) == null || P.abort(), m.current = null, (E = d.current) == null || E.abort(), d.current = null;
  }), [e.uid]);
  const A = e.is_public ? Si(Q.config) : Be(Q.config), z = Si(Q.config), O = Number(e.items_count ?? ((c = e.items) == null ? void 0 : c.length) ?? 0), G = O <= 0 || !e.is_public && !Q.isCompanyUser, N = si({ actionBackToRequisitionLists: "RequisitionList.RequisitionListView.actionBackToRequisitionLists", actionRename: "RequisitionList.RequisitionListView.actionRename", actionExport: "RequisitionList.RequisitionListView.actionExport", statusExporting: "RequisitionList.RequisitionListView.statusExporting", actionPrint: "RequisitionList.RequisitionListView.actionPrint", statusPrinting: "RequisitionList.RequisitionListView.statusPrinting", printWarning: "RequisitionList.RequisitionListView.printWarning", printError: "RequisitionList.RequisitionListView.printError", printRecovery: "RequisitionList.RequisitionListView.printRecovery", actionRecoverPrint: "RequisitionList.RequisitionListView.actionRecoverPrint", actionDeleteList: "RequisitionList.RequisitionListView.actionDeleteList", actionShare: "RequisitionList.RequisitionListView.actionShare", actionMakePublic: "RequisitionList.RequisitionListView.actionMakePublic", actionMakePrivate: "RequisitionList.RequisitionListView.actionMakePrivate", statusPublic: "RequisitionList.RequisitionListView.statusPublic", shareDisabledReason: "RequisitionList.RequisitionListView.shareDisabledReason", shareDisabledNoCompany: "RequisitionList.RequisitionListView.shareDisabledNoCompany", shareListTitle: "RequisitionList.RequisitionListView.shareListTitle", deleteListTitle: "RequisitionList.RequisitionListView.deleteListTitle", deleteListMessage: "RequisitionList.RequisitionListView.deleteListMessage", confirmAction: "RequisitionList.RequisitionListWrapper.confirmAction", cancelAction: "RequisitionList.RequisitionListWrapper.cancelAction", updateTitle: "RequisitionList.RequisitionListForm.updateTitle" }), j = I(async () => {
    var P;
    if (d.current || O <= 0) return;
    const E = new AbortController();
    d.current = E, V(!0), W(null), u(null);
    let J;
    const gi = () => clearTimeout(J);
    try {
      const di = await xi(e.uid, { mode: "all", signal: E.signal, getProductData: a, enrichConfigurableProducts: t });
      if (E.signal.throwIfAborted(), !(di != null && di.list.items.length)) throw new Error("The requisition list has no items to print.");
      u(di.warnings.length ? "warning" : null), J = setTimeout(() => W(E), 6e4), E.signal.addEventListener("abort", gi, { once: !0 }), await Qt({ list: di.list, useParentConfigurableThumbnail: ((P = Q.config) == null ? void 0 : P.configurable_thumbnail_source) === "parent" }, E.signal), d.current === E && u(null);
    } catch (di) {
      E.signal.aborted || (console.error("Failed to print requisition list:", di), u("error"));
    } finally {
      gi(), E.signal.removeEventListener("abort", gi), d.current === E && (d.current = null, V(!1), W(null), u((di) => di === "error" ? di : null));
    }
  }, [e.uid, O, a, t]), oi = I(async () => {
    if (m.current || O <= 0) return;
    const P = new AbortController();
    m.current = P, S(!0);
    try {
      const E = await Fe(e.uid, P.signal);
      P.signal.throwIfAborted(), Ft(E.name, E.items);
    } catch (E) {
      if (!P.signal.aborted) {
        console.error("Failed to export requisition list:", E);
        const J = { action: "export", type: "error", context: "requisitionList" };
        o ? o(J) : X.emit("requisitionList/alert", J);
      }
    } finally {
      m.current === P && (m.current = null, S(!1));
    }
  }, [e.uid, O, o]), H = I(() => {
    v(!0);
  }, []), ui = I(async (P) => {
    var E, J;
    try {
      const gi = await Ei(e.uid, P.name, P.description, (E = e.page_info) == null ? void 0 : E.page_size, (J = e.page_info) == null ? void 0 : J.current_page, t, P.is_public);
      gi ? (r == null || r(gi), v(!1), o == null || o({ action: "update", type: "success", context: "requisitionList" })) : o == null || o({ action: "update", type: "error", context: "requisitionList" });
    } catch {
      o == null || o({ action: "update", type: "error", context: "requisitionList" });
    }
  }, [e.uid, e.page_info, r, o, t]), Li = I(() => {
    L(!0);
  }, []), hi = I(async () => {
    k(!0);
    try {
      if (await ge(e.uid)) {
        const P = { action: "delete", type: "success", context: "requisitionList" };
        try {
          localStorage.setItem("requisitionListPendingAlert", JSON.stringify(P));
        } catch {
        }
        if (s) {
          const E = s();
          E && typeof E == "string" && Ri(E);
        }
      } else o == null || o({ action: "delete", type: "error", context: "requisitionList" });
    } catch {
      o == null || o({ action: "delete", type: "error", context: "requisitionList" });
    } finally {
      k(!1), L(!1);
    }
  }, [e.uid, s, o]), ai = I(() => {
    h(!0);
  }, []), D = Ct((P) => {
    r == null || r(P), o == null || o({ action: "update", type: "success", context: "requisitionList" });
  }, () => {
    o == null || o({ action: "update", type: "error", context: "requisitionList" });
  }, t), y = I(async (P) => {
    C(!0);
    try {
      return await (e.is_public ? je : He)(e.uid, P);
    } catch {
      return [{ code: "SHARE_FAILED", message: "Unable to share list." }];
    } finally {
      C(!1);
    }
  }, [e.uid, e.is_public]);
  return b(ci, { children: [i(Et, { name: e.name, printAction: O > 0 ? { onClick: j, label: N.actionPrint ?? pi.RequisitionList.RequisitionListView.actionPrint, loading: T, loadingLabel: N.statusPrinting ?? pi.RequisitionList.RequisitionListView.statusPrinting } : void 0, exportAction: O > 0 ? { onClick: oi, label: N.actionExport, loading: f, loadingLabel: N.statusExporting } : void 0, description: e.description, showPublicTag: z && !!e.is_public, publicTagLabel: N.statusPublic, backLink: s ? { url: "#", label: N.actionBackToRequisitionLists, onClick: (P) => {
    P.preventDefault();
    const E = s();
    E && typeof E == "string" && Ri(E);
  } } : void 0, actions: { onRename: H, onDelete: Li, onShare: A && !G ? ai : void 0, onTogglePublic: z ? () => D(e) : void 0, renameLabel: N.actionRename, deleteLabel: N.actionDeleteList, shareLabel: A ? N.actionShare : void 0, makePublicLabel: N.actionMakePublic, makePrivateLabel: N.actionMakePrivate, isPublic: e.is_public, shareDisabled: A && G, shareDisabledReason: A && G ? O <= 0 ? N.shareDisabledReason : N.shareDisabledNoCompany : void 0 } }), T && !K && i("div", { className: "requisition-list-print-status", children: i(li, { type: "warning", variant: "secondary", heading: N.statusPrinting ?? pi.RequisitionList.RequisitionListView.statusPrinting }) }), f && i("div", { className: "requisition-list-print-status", children: i(li, { type: "warning", variant: "secondary", heading: N.statusExporting ?? pi.RequisitionList.RequisitionListView.statusExporting }) }), B && i("div", { className: "requisition-list-print-status", children: i(li, { type: "warning", variant: "primary", heading: N.printRecovery ?? pi.RequisitionList.RequisitionListView.printRecovery, additionalActions: [{ label: N.actionRecoverPrint ?? pi.RequisitionList.RequisitionListView.actionRecoverPrint, onClick: () => B.abort() }] }) }), K && i("div", { className: "requisition-list-print-status", children: i(li, { type: K, variant: "primary", heading: K === "error" ? N.printError ?? pi.RequisitionList.RequisitionListView.printError : N.printWarning ?? pi.RequisitionList.RequisitionListView.printWarning, onDismiss: () => u(null) }) }), R && i(bi, { isOpen: R, isLoading: !1, title: N.updateTitle, modalContent: i($i, { mode: "update", defaultValues: { name: e.name, description: e.description || "", is_public: e.is_public }, onSubmit: ui, onCancel: () => v(!1) }), handleModalOnClose: () => v(!1) }), g && i(bi, { isOpen: g, isLoading: x, title: N.deleteListTitle, modalContent: N.deleteListMessage, confirmBtnCaption: N.confirmAction, closeBtnCaption: N.cancelAction, handleModalOnClose: () => L(!1), handleModalOnConfirm: hi }), A && p && i(bi, { isOpen: p, isLoading: !1, title: N.shareListTitle, modalContent: i(ke, { requisitionListUid: e.uid, isPublic: e.is_public, isSubmitting: q, onSubmit: y, currentCustomerEmail: l, routeSharedRequisitionList: n }), handleModalOnClose: () => h(!1) })] });
}, Gt = ({ requisitionListUid: e, skipProductLoading: s = !1, pageSize: r = yi, routeRequisitionListGrid: o, fallbackRoute: t = "/customer/account", getProductData: a, enrichConfigurableProducts: l = We, currentCustomerEmail: n, routeSharedRequisitionList: c }) => {
  var R, v, g, L, p, h, x;
  const [k, q] = _(!1), [C, f] = _(null), [S, m] = _(null), [d, T] = _(!1), [V, B] = _(null), [W, K] = _(!1), [u, A] = _(r), [z, O] = _(!0), [G, N] = _(!1), [j, oi] = _([]), H = vi(null), ui = vi(null), Li = vi(0), hi = vi(null), ai = I(() => {
    var w;
    (w = H.current) == null || w.abort(), q(!1), K(!1), f(null), B(null);
    const M = new AbortController();
    return H.current = M, M;
  }, []);
  ni(() => () => {
    var w;
    (w = H.current) == null || w.abort(), H.current = null;
  }, [e]);
  const D = I((w) => ({ signal: w, onWarning: (M) => console.warn("Requisition list supplemental data warning:", M) }), []), { currentRequisitionList: y, setCurrentRequisitionList: P, selectedItems: E, setSelectedItems: J, handleItemSelection: gi, handleSelectAll: di, handleSelectNone: Ce } = wt(), $ = si({ emptyRequisitionList: "RequisitionList.RequisitionListView.emptyRequisitionList", errorLoadingProducts: "RequisitionList.RequisitionListView.errorLoadingProducts", errorLoadPage: "RequisitionList.RequisitionListView.errorLoadPage", notFoundTitle: "RequisitionList.RequisitionListView.notFoundTitle", notFoundMessage: "RequisitionList.RequisitionListView.notFoundMessage", notFoundActionLabel: "RequisitionList.RequisitionListView.notFoundActionLabel", notEnabledTitle: "RequisitionList.RequisitionListsNotEnabled.title", notEnabledMessage: "RequisitionList.RequisitionListsNotEnabled.message", partialMoveSuccess: "RequisitionList.RequisitionListAlert.partialMoveSuccess", notEnabledActionLabel: "RequisitionList.RequisitionListsNotEnabled.actionLabel", show: "RequisitionList.PageSizePicker.show", deleteItemsTitle: "RequisitionList.RequisitionListView.deleteItemsTitle", deleteItemsMessage: "RequisitionList.RequisitionListView.deleteItemsMessage", confirmAction: "RequisitionList.RequisitionListView.confirmAction", cancelAction: "RequisitionList.RequisitionListView.cancelAction", moveToListTitle: "RequisitionList.RequisitionListView.moveToListTitle", moveToListConfirm: "RequisitionList.RequisitionListView.moveToListConfirm", copyToListTitle: "RequisitionList.RequisitionListView.copyToListTitle", copyToListConfirm: "RequisitionList.RequisitionListView.copyToListConfirm" }), { alert: Ii, setAlert: xe, handleRequisitionListAlert: ti } = Ki(), { isEnabled: Se } = Gi();
  ni(() => {
    const w = X.on("requisitionList/data", (F) => {
      (F == null ? void 0 : F.uid) === e && (P(F), J(/* @__PURE__ */ new Set()));
    }), M = X.on("requisitionList/alert", ti);
    return () => {
      w == null || w.off(), M == null || M.off();
    };
  }, [ti, e, P, J]), ni(() => {
    A(r);
  }, [r]);
  const Mi = I(async (w, M) => (await oe(w, { ...D(M), enrichConfigurableProducts: l })).list, [l, D]), Ci = I(async (w, M) => (await $e(w, { ...M, enrichConfigurableProducts: l })).items, [l]), fi = I(async (w, M) => {
    var F;
    if (M.throwIfAborted(), !((F = w.items) != null && F.length)) return w;
    const ii = H.current;
    q(!0);
    try {
      return (await oe(w, { ...D(M), getProductData: a, skipConfigurables: !0 })).list;
    } finally {
      H.current === ii && q(!1);
    }
  }, [a, D]), { showMoveToListModal: Yi, setShowMoveToListModal: Xi, movingToList: Di, showCopyToListModal: Ji, setShowCopyToListModal: ie, copyingToList: Vi, handleMoveToList: Te, handleCopyToList: Pe } = kt({ sourceListUid: y == null ? void 0 : y.uid, selectedItems: E, currentPageSize: u, currentPage: ((R = y == null ? void 0 : y.page_info) == null ? void 0 : R.current_page) || 1, enrichConfigurableProductsInList: Mi, fetchAndMergeProducts: fi, setCurrentRequisitionList: P, setSelectedItems: J, handleRequisitionListAlert: ti, beginLoad: ai });
  ni(() => {
    if (!e) {
      O(!1);
      return;
    }
    if (y && y.uid === e) {
      (!ui.current || ui.current.signal.aborted) && O(!1);
      return;
    }
    O(!0);
    const w = ai();
    ui.current = w, (async () => {
      try {
        const M = await xi(e, { ...D(w.signal), mode: "page", currentPage: 1, pageSize: r, enrichConfigurableProducts: l, getProductData: s ? void 0 : a });
        w.signal.throwIfAborted();
        const F = M == null ? void 0 : M.list;
        F && P(F);
      } catch (M) {
        w.signal.aborted || console.error("Failed to initialize requisition list from UID:", M);
      } finally {
        ui.current === w && (ui.current = null), H.current === w && O(!1);
      }
    })();
  }, [e, r, s, l, a, D, ai, P, y]);
  const ee = I(async (w) => {
    w && w.length === 1 ? (T(!1), m(w)) : (T(!0), m(null));
    try {
      const M = await Qe(y.uid, w), F = (w == null ? void 0 : w.length) || 0, ii = (M == null ? void 0 : M.length) || 0, Y = F - ii;
      if (M && M.length > 0 && Y > 0) {
        const ei = { action: "move", type: "error", context: "product", message: [$.partialMoveSuccess.replace("{successCount}", String(Y)).replace("{failedCount}", String(ii))] };
        ti(ei), X.emit("requisitionList/alert", ei);
      } else if (M && M.length > 0) {
        const ei = { action: "move", type: "error", context: "product", message: M.map((Ui) => Ui.message) };
        ti(ei), X.emit("requisitionList/alert", ei);
      } else {
        const ei = { action: "move", type: "success", context: "product" };
        ti(ei), X.emit("requisitionList/alert", ei);
      }
    } catch {
      const M = { action: "move", type: "error", context: "product" };
      ti(M), X.emit("requisitionList/alert", M);
    } finally {
      m(null), T(!1);
    }
  }, [y, ti, $]), te = I((w) => {
    w && w.length > 0 && (oi(w), N(!0));
  }, []), Ae = I(async () => {
    const w = ai();
    j.length === 1 ? f(j[0]) : f("bulk");
    try {
      const M = await Ke(y.uid, j, u, y.page_info.current_page, Ci, D(w.signal));
      if (w.signal.throwIfAborted(), M) {
        const F = await fi(M, w.signal);
        w.signal.throwIfAborted(), P(F), ti({ action: "delete", type: "success", context: "product" });
      } else ti({ action: "delete", type: "error", context: "product" });
    } catch {
      if (w.signal.aborted) return;
      ti({ action: "delete", type: "error", context: "product" });
    } finally {
      H.current === w && (f(null), N(!1), oi([]));
    }
  }, [j, y, u, fi, P, ti, ai, D, Ci]), Ne = I(async (w, M) => {
    var F, ii;
    const Y = ai();
    B(w);
    try {
      const ei = (F = y.items) == null ? void 0 : F.find((zi) => zi.uid === w);
      if (!ei) {
        ti({ action: "update", type: "error", context: "product" });
        return;
      }
      const Ui = { item_id: ei.uid, entered_options: ei.entered_options, selected_options: ei.selected_options, quantity: M }, ne = Ge(y.uid, [Ui], u, y.page_info.current_page, Ci, D(Y.signal));
      hi.current = { request: Y, completion: ne.then(() => {
      }, () => {
      }) };
      const se = await ne;
      if (Y.signal.throwIfAborted(), se) {
        const zi = await fi(se, Y.signal);
        Y.signal.throwIfAborted(), P(zi), ti({ action: "update", type: "success", context: "product" });
      } else ti({ action: "update", type: "error", context: "product" });
    } catch {
      if (Y.signal.aborted) return;
      ti({ action: "update", type: "error", context: "product" });
    } finally {
      ((ii = hi.current) == null ? void 0 : ii.request) === Y && (hi.current = null), H.current === Y && B(null);
    }
  }, [y, fi, P, u, ti, Ci, ai, D]), Ee = I(async (w) => {
    const M = ++Li.current, F = hi.current;
    if (F && (await F.completion, M !== Li.current || F.request.signal.aborted)) return;
    const ii = ai();
    K(!0);
    try {
      const Y = await xi(y.uid, { ...D(ii.signal), mode: "page", currentPage: w, pageSize: u, enrichConfigurableProducts: l, getProductData: a });
      ii.signal.throwIfAborted();
      const ei = Y == null ? void 0 : Y.list;
      ei ? P(ei) : console.warn($.errorLoadPage);
    } catch (Y) {
      ii.signal.aborted || console.warn(Y instanceof Error ? Y.message : $.errorLoadPage);
    } finally {
      H.current === ii && (K(!1), q(!1));
    }
  }, [y == null ? void 0 : y.uid, a, ai, D, u, $, P, l]), Ie = I(async (w) => {
    const M = ++Li.current, F = hi.current;
    if (F && (await F.completion, M !== Li.current || F.request.signal.aborted)) return;
    const ii = ai();
    A(w), K(!0);
    try {
      const Y = await xi(y.uid, { ...D(ii.signal), mode: "page", currentPage: 1, pageSize: w, enrichConfigurableProducts: l, getProductData: a });
      ii.signal.throwIfAborted();
      const ei = Y == null ? void 0 : Y.list;
      ei ? P(ei) : console.warn($.errorLoadPage);
    } catch {
      ii.signal.aborted || console.warn($.errorLoadPage);
    } finally {
      H.current === ii && (K(!1), q(!1));
    }
  }, [y == null ? void 0 : y.uid, a, ai, D, $, P, l]), Me = I(async (w) => {
    const M = ai();
    try {
      const F = await Mi(w, M.signal), ii = await fi(F, M.signal);
      M.signal.throwIfAborted(), P(ii);
    } catch (F) {
      M.signal.aborted || console.error("Failed to refresh requisition list:", F);
    }
  }, [P, fi, Mi, ai]);
  return b("div", { className: "requisition-list-view__container", children: [z ? i("div", { className: "requisition-list-view__loading", children: i(_i, { stroke: "4", size: "large" }) }) : Se === !1 ? i(ji, { title: $.notEnabledTitle, message: $.notEnabledMessage, actionLabel: $.notEnabledActionLabel, onAction: () => {
    Ri(t);
  } }) : !y || !Ze(y == null ? void 0 : y.uid) ? i(ji, { title: $.notFoundTitle, message: $.notFoundMessage, actionLabel: o ? $.notFoundActionLabel : void 0, onAction: o ? () => {
    const w = o();
    w && typeof w == "string" && Ri(w);
  } : void 0 }) : b(ci, { children: [i(Kt, { requisitionList: y, routeRequisitionListGrid: o, onUpdate: Me, onAlert: ti, enrichConfigurableProducts: l, getProductData: a, currentCustomerEmail: n, routeSharedRequisitionList: c }), Ii && i("div", { className: "requisition-list__alert-wrapper", children: i(li, { heading: Ii.description, type: Ii.type, variant: "primary", onDismiss: () => xe(null) }) }), y.items_count === 0 ? i(Zi, { textContent: `${y.name} ${$.emptyRequisitionList}` }) : b(ci, { children: [i(Mt, { selectedItems: E, deletingItemId: C, addingToCartItemId: S, bulkAddingToCart: d, updatingQuantityItemId: V, bulkMovingToList: Di, bulkCopyingToList: Vi, onSelectAll: di, onSelectNone: Ce, onBulkAddToCart: () => ee(Array.from(E)), onBulkDelete: () => te(Array.from(E)), onBulkMoveToList: () => Xi(!0), onBulkCopyToList: () => ie(!0) }), i(It, { items: y.items, selectedItems: E, currentPage: ((v = y.page_info) == null ? void 0 : v.current_page) || 1, pageSize: ((g = y.page_info) == null ? void 0 : g.page_size) || yi, handleItemSelection: gi, handleUpdateQuantity: Ne, onAddToCart: ee, onDeleteItem: te, useParentConfigurableThumbnail: ((L = Q.config) == null ? void 0 : L.configurable_thumbnail_source) === "parent" }), y.page_info && b("div", { className: "requisition-list-view__pagination", children: [i(we, { pageInfo: y.page_info, totalCount: y.items_count }), (((p = y.page_info) == null ? void 0 : p.total_pages) || 0) > 1 && i(qe, { totalPages: y.page_info.total_pages, currentPage: ((h = y.page_info) == null ? void 0 : h.current_page) || 1, onChange: Ee, disabled: W || k }), b("div", { className: "requisition-list-view__pagination-picker", children: [i("span", { children: $.show }), i(Re, { currentPageSize: ((x = y.page_info) == null ? void 0 : x.page_size) || yi, onPageSizeChange: Ie, disabled: W || k })] })] })] })] }), G && i(bi, { isOpen: G, isLoading: C !== null, title: $.deleteItemsTitle, modalContent: $.deleteItemsMessage, confirmBtnCaption: $.confirmAction, closeBtnCaption: $.cancelAction, handleModalOnClose: () => {
    N(!1), oi([]);
  }, handleModalOnConfirm: Ae }), Yi && i(bi, { isOpen: Yi, isLoading: Di, title: $.moveToListTitle, modalContent: i(Hi, { excludeUid: y == null ? void 0 : y.uid, confirmLabel: $.moveToListConfirm, disabled: Di, onConfirm: Te }), handleModalOnClose: () => Xi(!1) }), Ji && i(bi, { isOpen: Ji, isLoading: Vi, title: $.copyToListTitle, modalContent: i(Hi, { excludeUid: y == null ? void 0 : y.uid, confirmLabel: $.copyToListConfirm, disabled: Vi, onConfirm: Pe }), handleModalOnClose: () => ie(!1) })] });
};
Gt.displayName = "RequisitionListView";
function Zt(e, s, r) {
  var o;
  const t = e.sku ?? ((o = e.product) == null ? void 0 : o.sku);
  if (!t || t !== s.sku) return !1;
  if ((r == null ? void 0 : r.matchBySkuOnly) !== !1) return !0;
  const a = (e.configurable_options ?? []).map((n) => n.value_uid).filter((n) => !!n), l = (s.selectedOptions ?? []).filter((n) => !!n);
  return a.length !== l.length ? !1 : (a.sort(), l.sort(), a.every((n, c) => n === l[c]));
}
const Yt = ({ canCreate: e = !0, sku: s, selectedOptions: r, quantity: o = 1, matchBySKU: t, beforeAddProdToReqList: a }) => {
  const l = si({ createTitle: "RequisitionList.RequisitionListForm.createTitle", addToRequisitionList: "RequisitionList.RequisitionListForm.addToRequisitionList", emptyList: "RequisitionList.RequisitionListWrapper.emptyList", addToNewRequisitionList: "RequisitionList.RequisitionListSelector.addToNewRequisitionList", addToSelected: "RequisitionList.RequisitionListSelector.addToSelected" }), [n, c] = _(!1), { lists: R } = ve(), { isEnabled: v } = Gi(), [g, L] = _(null);
  ni(() => {
    const u = (G) => {
      G && L(G);
    }, A = (G) => {
      G && L((N) => {
        const j = N ?? et(), oi = j.findIndex((H) => H.uid === G.uid);
        return oi >= 0 ? j.map((H, ui) => ui === oi ? G : H) : [...j, G];
      });
    }, z = X.on("requisitionLists/data", u), O = X.on("requisitionList/data", A);
    return () => {
      z == null || z.off(), O == null || O.off();
    };
  }, []);
  const p = g ?? R, h = ki(() => {
    if (!(p != null && p.length)) return !1;
    const u = { sku: s, selectedOptions: r };
    return p.some((A) => {
      var z;
      return (z = A.items) == null ? void 0 : z.some((O) => Zt(O, u, { matchBySkuOnly: t }));
    });
  }, [p, s, r, t]), { alert: x, setAlert: k, handleRequisitionListAlert: q } = Ki(), [C, f] = _({ isOpen: !1, isLoading: !1 }), S = I(() => {
    f({ isOpen: !0, isLoading: !1 });
  }, []), m = I(() => {
    f({ isOpen: !1, isLoading: !1 }), c(!1), k(null);
  }, [k]), d = I(async (u) => {
    try {
      const A = { sku: s, quantity: o, ...r && r.length > 0 ? { selected_options: r } : {} };
      await Ye(u, [A]);
    } catch (A) {
      throw console.error("Error adding product to list:", A), A;
    }
  }, [s, o, r]), T = I(async (u) => {
    try {
      await d(u), q({ action: "add", type: "success", context: "product", skus: [s] });
    } catch {
      q({ action: "add", type: "error", context: "product", skus: [s] });
    } finally {
      setTimeout(() => {
        m();
      }, 2e3);
    }
  }, [s, d, m, q]), V = I(() => {
    if (!a) {
      S();
      return;
    }
    Promise.resolve(a()).then(() => {
      S();
    }).catch(() => {
    });
  }, [a, S]), B = (R == null ? void 0 : R.length) > 0 ? n ? b("button", { type: "button", "aria-label": "Select a requisition list", role: "button", className: "requisition-list-actions", "data-testid": "requisition-list-actions-button", onClick: () => c(!1), children: [i("span", { className: "requisition-list-actions__title", "data-testid": "requisition-list-actions-button-text", children: l.addToRequisitionList }), i(mi, { source: Pt, size: "32" })] }) : i(Hi, { confirmLabel: l.addToSelected, onConfirm: T }) : i(Zi, { textContent: l.emptyList }), W = n ? i(Ti, { variant: "secondary", children: i(Qi, { mode: "create", onSuccess: async (u) => {
    await T(u.uid);
  }, onError: () => {
    q({ action: "add", type: "error", context: "product", skus: [s] });
  }, onCancel: () => {
    c(!1);
  } }) }) : i(_e, { onAddNew: () => {
    c(!0);
  } }), K = b(ci, { children: [x && i("div", { className: "requisition-list__alert-wrapper", children: i(li, { id: `requisition-list-selector__alert__${s}`, heading: x.description, type: x.type, variant: "primary", className: "requisition-list-selector__alert" }, `requisition-list-selector__alert__${s}`) }), !x && b(ci, { children: [B, e && W] })] });
  return v === null || !v ? null : b("div", { className: "requisition-list-selector", children: [i(Z, { active: h, activeIcon: i(mi, { source: Ai }), "aria-label": l.addToRequisitionList, className: h ? "requisition-list-selector--active" : void 0, "data-testid": "requisition-list-selector", size: "medium", variant: "tertiary", icon: i(mi, { source: Ai }), onClick: V }), C.isOpen && i(bi, { isOpen: !0, isLoading: C.isLoading, title: l.addToRequisitionList, modalContent: K, handleModalOnClose: m })] });
};
Yt.displayName = "RequisitionListSelector";
const Xt = ({ token: e, routeRequisitionList: s, routeProduct: r, isPublic: o = !1, getCartId: t, onCartUpdated: a }) => {
  const [l, n] = _("preview_loading"), [c, R] = _(null), [v, g] = _(""), [L, p] = _(1), [h, x] = _([]), k = vi(!0), q = si({ loading: "RequisitionList.SharedRequisitionList.loading", previewTitle: "RequisitionList.SharedRequisitionList.previewTitle", senderLabel: "RequisitionList.SharedRequisitionList.senderLabel", listNameLabel: "RequisitionList.SharedRequisitionList.listNameLabel", descriptionLabel: "RequisitionList.SharedRequisitionList.descriptionLabel", itemsCountLabel: "RequisitionList.SharedRequisitionList.itemsCountLabel", importButton: "RequisitionList.SharedRequisitionList.importButton", importingButton: "RequisitionList.SharedRequisitionList.importingButton", errorPreview: "RequisitionList.SharedRequisitionList.errorPreview", successImport: "RequisitionList.RequisitionListAlert.successImport", errorImport: "RequisitionList.RequisitionListAlert.errorImport", skuHeader: "RequisitionList.SharedRequisitionList.skuHeader", qtyHeader: "RequisitionList.SharedRequisitionList.qtyHeader", optionsHeader: "RequisitionList.SharedRequisitionList.optionsHeader", addToCart: "RequisitionList.SharedRequisitionList.addToCart", addSelectedToCart: "RequisitionList.SharedRequisitionList.addSelectedToCart", addingToCart: "RequisitionList.SharedRequisitionList.addingToCart", cartSuccess: "RequisitionList.SharedRequisitionList.cartSuccess", cartError: "RequisitionList.SharedRequisitionList.cartError", selectItem: "RequisitionList.SharedRequisitionList.selectItem", previousPage: "RequisitionList.SharedRequisitionList.previousPage", nextPage: "RequisitionList.SharedRequisitionList.nextPage", productHeader: "RequisitionList.RequisitionListView.productListTable.headers.productName" });
  ni(() => (k.current = !0, () => {
    k.current = !1;
  }), []), ni(() => {
    let m = !0;
    return n("preview_loading"), g(""), x([]), (o ? Xe(e, L) : Je(e)).then((d) => {
      if (!(!m || !k.current)) {
        if (!d) {
          g(""), n("preview_error");
          return;
        }
        R(d), n("preview_loaded");
      }
    }).catch((d) => {
      !m || !k.current || (g(d instanceof Error && d.message ? d.message : ""), n("preview_error"));
    }), () => {
      m = !1;
    };
  }, [e, o, L]);
  const C = I(() => {
    n("importing"), g(""), it(e).then(({ requisitionList: m, userErrors: d }) => {
      if (!k.current) return;
      if (d.length > 0) {
        g(d[0].message), n("import_error");
        return;
      }
      const T = (m == null ? void 0 : m.name) ?? "", V = (m == null ? void 0 : m.uid) ?? "";
      if (X.emit("requisitionList/alert", { action: "import", type: "success", context: "requisitionList", listName: T }), s) {
        s(V, T);
        return;
      }
      n("import_success");
    }).catch((m) => {
      k.current && (g(m instanceof Error && m.message ? m.message : ""), n("import_error"));
    });
  }, [e, s]), f = async (m) => {
    if (l !== "cart_adding") {
      n("cart_adding"), g("");
      try {
        const d = await (t == null ? void 0 : t());
        if (!d) throw new Error(q.cartError);
        const T = await tt(e, d, m);
        if (await (a == null ? void 0 : a()), !k.current) return;
        T.userErrors.length ? (g(T.userErrors.map((V) => V.message).join(" ")), n("cart_error")) : n("cart_success");
      } catch (d) {
        if (!k.current) return;
        g(d instanceof Error ? d.message : q.cartError), n("cart_error");
      }
    }
  }, S = v || (l === "import_error" ? q.errorImport : q.errorPreview);
  return i(Ut, { status: l, previewData: c, errorMessage: S, onImport: C, isPublic: o, onAddToCart: f, selectedItemUids: h, onSelectedItemsChange: x, onPageChange: p, canAddToCart: !!t, routeProduct: r, translations: q });
};
Xt.displayName = "SharedRequisitionList";
/*! Copyright 2026 Adobe
All Rights Reserved. */
(function(e, s) {
  try {
    if (typeof document < "u") {
      const r = s.styleId;
      if (document.querySelector(`style[data-dropin="${r}"]`)) return;
      const o = document.createElement("style");
      for (const a in s.attributes) o.setAttribute(a, s.attributes[a]);
      o.setAttribute("data-dropin", r), o.appendChild(document.createTextNode(e));
      const t = document.querySelector('style[data-dropin="sdk"]');
      if (t) t.after(o);
      else {
        const a = document.querySelector('link[rel="stylesheet"], style');
        a ? a.before(o) : document.head.append(o);
      }
    }
  } catch (r) {
    console.error("dropin-styles (injectCodeFunction)", r);
  }
})('.requisition-list-form{background-color:var(--color-neutral-50);box-sizing:border-box}.requisition-list-form__title{color:var(--color-neutral-800);font:var(--type-headline-2-strong-font);letter-spacing:var(--type-headline-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}.requisition-list-form__notification{margin-bottom:var(--spacing-medium)}.requisition-list-form__form{display:grid;gap:var(--spacing-medium);grid-template-columns:1fr}.requisition-list-form__actions{align-items:center;display:flex;gap:0 var(--grid-2-gutters);justify-content:flex-end}.requisition-list-form_progress-spinner{float:right}.requisition-list-grid-wrapper__content{display:grid;grid-template-columns:repeat(4,1fr);row-gap:var(--spacing-xsmall);width:100%}.requisition-list-grid-wrapper__list-header{display:contents}.requisition-list-grid-wrapper__pagination{grid-column:1 / -1;margin-top:var(--spacing-small);display:flex;justify-content:space-between;align-items:center}.requisition-list-grid-wrapper__pagination-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-grid-wrapper__add-new{margin:var(--spacing-medium) 0}.requisition-list-grid-wrapper__name__title{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-emphasized-font);margin-bottom:2px}.requisition-list-grid-wrapper__name__title .dropin-tag-container{padding:2px 10px;flex-shrink:0}.requisition-list-grid-wrapper__name__description{font:var(--type-details-caption-2-font)}.requisition-list-grid-wrapper__actions{display:flex;gap:var(--spacing-medium)}.requisition-list-grid-wrapper__actions .dropin-button--tertiary{padding:0}.requisition-list-grid-wrapper__actions .dropin-button--tertiary:hover{text-decoration:underline}.requisition-list-empty-list{margin-bottom:var(--spacing-small);text-align:center}.requisition-list__alert-wrapper{margin-bottom:var(--spacing-small)}.requisition-list-actions{align-items:center;background-color:var(--color-neutral-50);border:var(--shape-border-width-2) solid var(--color-neutral-400);border-radius:var(--shape-border-radius-2);cursor:pointer;display:flex;justify-content:space-between;padding:var(--spacing-medium);width:100%}.requisition-list-actions--selectable{max-width:100%;width:auto}.requisition-list-actions__title{font:var(--type-button-2-font);letter-spacing:var(--type-button-2-letter-spacing);-moz-appearance:none;appearance:none;-webkit-appearance:none;color:var(--color-neutral-800)}.requisition-list-actions svg{color:var(--color-neutral-800);stroke:var(--shape-icon-stroke-4)}@supports (height: 100dvh){.requisition-list-modal .dropin-modal{height:100dvh}}.dropin-modal__body--medium>.dropin-modal__header-title,.dropin-modal__body--full>.dropin-modal__header-title,.requisition-list-modal .dropin-modal__content{align-items:center;margin:0}.requisition-list-modal .dropin-modal__header-title-content h3{font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);margin:0;padding:0}.requisition-list-modal .requisition-list-modal__spinner{align-items:center;background-color:var(--color-neutral-200);display:flex;height:100%;left:0;justify-content:center;opacity:var(--color-opacity-24);position:absolute;top:0;width:100%;z-index:1}.requisition-list-modal p{margin:var(--spacing-small) 0}.requisition-list-modal .requisition-list-modal__buttons{align-items:center;display:flex;gap:0 var(--spacing-small);justify-content:right}.requisition-list-modal--overlay{margin:auto;max-width:375px;padding:var(--spacing-small);position:relative;width:100%}@media (min-width: 768px){.requisition-list-modal--overlay{margin:auto;max-width:768px;padding:var(--spacing-xxbig);position:relative;width:100%}.requisition-list-modal p{color:var(--color-neutral-800);font:var(--type-body-2-strong-font);letter-spacing:var(--type-body-2-strong-letter-spacing);margin-bottom:var(--spacing-medium)}}.requisition-list-header{margin-bottom:var(--spacing-large)}.requisition-list-header__back{margin-bottom:var(--spacing-medium)}.requisition-list-header__back-link{display:inline-block;color:var(--color-neutral-800);font-size:var(--type-body-1-font-size);font-weight:var(--type-body-1-font-weight);line-height:var(--type-body-1-line-height);text-decoration:none!important;cursor:pointer;transition:color .2s ease;position:relative;padding-bottom:1px}.requisition-list-header__back-link *{text-decoration:none!important}.requisition-list-header__back-link:hover{color:var(--color-neutral-600);text-decoration:none!important}.requisition-list-header__back-link:hover:after{content:"";position:absolute;left:0;right:0;bottom:0;height:1px;background-color:var(--color-neutral-800)}.requisition-list-header__back-arrow{margin-right:var(--spacing-xsmall);text-decoration:none!important}.requisition-list-header__main{display:flex;justify-content:space-between;align-items:flex-start;gap:var(--spacing-medium);flex-wrap:wrap}.requisition-list-header__title-section{flex:1;min-width:0}.requisition-list-header__title{margin:0;padding:0;font:var(--type-headline-1-font);letter-spacing:var(--type-headline-1-letter-spacing);color:var(--color-neutral-900)}.requisition-list-header__public-tag{margin-top:var(--spacing-xsmall);width:fit-content;padding:2px 10px}.requisition-list-header__description{margin:var(--spacing-xsmall) 0 0;padding:0;font-size:var(--type-body-1-font-size);font-weight:var(--type-body-1-font-weight);line-height:var(--type-body-1-line-height);color:var(--color-neutral-700)}.requisition-list-header__actions{display:flex;gap:var(--spacing-medium);flex-wrap:wrap;align-items:center}.requisition-list-header__action-link{color:var(--color-neutral-800);font-size:var(--type-body-2-font-size);font-style:normal;font-weight:var(--type-body-2-font-weight);line-height:var(--type-body-2-line-height);letter-spacing:var(--type-body-2-letter-spacing);text-decoration:underline;cursor:pointer;transition:color .2s ease}.requisition-list-header__action-link:hover{color:var(--color-neutral-600)}.requisition-list-header__action-link--disabled,.requisition-list-header__action-link--disabled:hover{color:var(--color-neutral-500)!important;cursor:not-allowed;text-decoration:none;position:relative}.requisition-list-header__action-link--disabled[data-disabled-reason]:hover:after,.requisition-list-header__action-link--disabled[data-disabled-reason]:focus-visible:after{content:attr(data-disabled-reason);position:absolute;top:calc(100% + 6px);left:0;z-index:5;max-width:260px;padding:6px 8px;border-radius:4px;background:var(--color-neutral-900);color:var(--color-neutral-100);font:var(--type-details-caption-2-font);line-height:1.3;white-space:normal}@media (max-width: 768px){.requisition-list-header__main{flex-direction:column;align-items:stretch}.requisition-list-header__actions{justify-content:flex-start}}.empty-list{text-align:center;margin:auto 0}.not-found{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:var(--spacing-large);text-align:center;min-height:400px}.not-found svg{color:var(--color-neutral-400);margin-bottom:var(--spacing-medium)}.not-found h2{font-size:var(--type-headline-3-font-size);font-weight:var(--type-headline-3-font-weight);margin:0 0 var(--spacing-small) 0;color:var(--color-neutral-800)}.not-found p{font-size:var(--type-body-1-font-size);color:var(--color-neutral-600);margin:0 0 var(--spacing-medium) 0;max-width:500px}.not-found button{margin-top:var(--spacing-small)}.requisition-list-view-product-list-table-container{display:flex;flex-direction:column;gap:var(--spacing-small)}.requisition-list-view-product-list-table__checkbox{align-self:center;justify-self:center}.requisition-list-view-product-list-table__index-container{display:inline-block;line-height:1}.requisition-list-view-product-list-table__item-container{display:flex;align-items:flex-start;gap:var(--spacing-small)}.requisition-list-view-product-list-table__item-details{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.requisition-list-view-product-list-table__product-name{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);font-weight:700}.requisition-list-view-product-list-table__out-of-stock{font:var(--type-body-1-default-font);color:var(--color-error, #d32f2f)}.requisition-list-view-product-list-table__low-stock{font:var(--type-body-1-default-font);color:var(--color-warning, #ed6c02)}.requisition-list-view-product-list-table__product-configurable-name{font:var(--type-body-1-default-font)}.requisition-list-view-product-list-table__sku{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing)}.requisition-list-view-product-list-table__options{font:var(--type-details-caption-1-font);letter-spacing:var(--type-details-caption-1-letter-spacing);color:var(--color-neutral-600, #666)}.requisition-list-view-product-list-table__thumbnail{width:44px;flex-shrink:0}.requisition-list-view-product-list-table__quantity{font:var(--type-body-1-font);letter-spacing:var(--type-body-1-letter-spacing);display:block;justify-self:center}.requisition-list-view-product-list-table__discount-container{display:flex;flex-direction:row;flex-wrap:wrap;gap:var(--spacing-xxsmall);align-items:baseline}.requisition-list-view-product-list-table__price.strikethrough{text-decoration:line-through}.requisition-list-view-product-list-table__discounted-price{color:var(--color-alert-800)}.requisition-list-view-product-list-table-container__submit-container{display:flex;justify-content:flex-end}.requisition-list-view__batch-actions{--batch-actions-background: #f0f4f8;--batch-actions-toggle-border: #b3b3b3;--batch-actions-toggle-border-hover: #666666;--batch-actions-toggle-background: #ffffff;--batch-actions-toggle-background-hover: #f5f5f5;--batch-actions-toggle-active-background: #505050;--batch-actions-toggle-active-background-hover: #3d3d3d;--batch-actions-toggle-icon-active: #ffffff;--batch-actions-label-color: #2d2d2d;--batch-actions-badge-background: #378ef0;--batch-actions-badge-color: #ffffff;--batch-actions-button-background: #fafafa;--batch-actions-button-background-hover: #f0f0f0;--batch-actions-button-border: #d3d3d3;--batch-actions-delete-color: #4a4a4a;--batch-actions-delete-color-hover: #d7373f;display:flex;align-items:center;justify-content:space-between;padding:var(--spacing-medium) 0;margin-bottom:var(--spacing-small);background-color:var(--batch-actions-background);border-radius:0}.requisition-list-view__batch-actions-left{display:flex;align-items:center;gap:var(--spacing-small);padding-left:var(--spacing-medium)}.requisition-list-view__batch-actions-select-toggle{display:flex;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:1px solid var(--batch-actions-toggle-border);border-radius:0;background-color:var(--batch-actions-toggle-background);cursor:pointer;transition:all .2s ease}.requisition-list-view__batch-actions-select-toggle:hover:not(:disabled){border-color:var(--batch-actions-toggle-border-hover);background-color:var(--batch-actions-toggle-background-hover)}.requisition-list-view__batch-actions-select-toggle--active{background-color:var(--batch-actions-toggle-active-background);border-color:var(--batch-actions-toggle-active-background)}.requisition-list-view__batch-actions-select-toggle--active svg,.requisition-list-view__batch-actions-select-toggle--active path{fill:var(--batch-actions-toggle-icon-active);color:var(--batch-actions-toggle-icon-active)}.requisition-list-view__batch-actions-select-toggle--active:hover:not(:disabled){background-color:var(--batch-actions-toggle-active-background-hover);border-color:var(--batch-actions-toggle-active-background-hover)}.requisition-list-view__batch-actions-select-toggle:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__batch-actions-select-label{padding:0;border:none;background:none;font-size:var(--type-base-font-size);font-weight:var(--type-base-font-weight);color:var(--batch-actions-label-color);cursor:pointer;transition:opacity .2s ease}.requisition-list-view__batch-actions-select-label:hover:not(:disabled){opacity:.8}.requisition-list-view__batch-actions-select-label:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__batch-actions-count-badge{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;padding:0;border-radius:50%;background-color:var(--batch-actions-badge-background);color:var(--batch-actions-badge-color);font-size:var(--type-detail-2-font-size);font-weight:var(--type-detail-2-font-weight);line-height:1;flex-shrink:0}.requisition-list-view__batch-actions-buttons{display:flex;align-items:center;gap:var(--spacing-small);padding-right:var(--spacing-medium)}.requisition-list-view__batch-actions-buttons button:not(.requisition-list-view__batch-actions-delete-icon){border-radius:var(--shape-border-radius-1);background-color:var(--batch-actions-button-background);border:1px solid var(--batch-actions-button-border)}.requisition-list-view__batch-actions-buttons button:not(.requisition-list-view__batch-actions-delete-icon):hover:not(:disabled){background-color:var(--batch-actions-button-background-hover)}.requisition-list-view__batch-actions-delete-icon{display:flex;align-items:center;justify-content:center;width:40px;height:40px;padding:0;border:none;background:transparent;color:var(--batch-actions-delete-color);cursor:pointer;transition:color .2s ease}.requisition-list-view__batch-actions-delete-icon:hover:not(:disabled){color:var(--batch-actions-delete-color-hover);background:none!important}.requisition-list-view__batch-actions-delete-icon:disabled{opacity:.5;cursor:not-allowed}.requisition-list-view__bulk-actions{margin-bottom:var(--spacing-xsmall);display:flex;gap:var(--spacing-xsmall);align-items:center}.page-size-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.page-size-picker__label{font-size:var(--font-size-small);color:var(--color-text-secondary);white-space:nowrap}.page-size-picker__select{min-width:60px}.pagination-items-counter{font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-picker__form .dropin-card__content{align-items:center;cursor:pointer;display:flex;flex-direction:row;flex-wrap:wrap;gap:var(--spacing-xxsmall);padding:var(--spacing-xsmall)}.requisition-list-picker__form .dropin-card--secondary{border:none}.requisition-list-picker__form .requisition-list-picker__actions{display:flex;justify-content:flex-end;margin-top:var(--spacing-medium)}.requisition-list-picker__available-lists{max-height:300px;min-height:200px;overflow-y:scroll}.requisition-list-picker__available-lists::-webkit-scrollbar{width:var(--spacing-small);display:block}.requisition-list-picker__available-lists::-webkit-scrollbar-track{background:var(--color-neutral-100);border-radius:var(--shape-border-radius-2)}.requisition-list-picker__available-lists::-webkit-scrollbar-thumb{background:var(--color-neutral-300);border-radius:var(--shape-border-radius-2)}.requisition-list-picker__available-lists::-webkit-scrollbar-thumb:hover{background:var(--color-neutral-500)}.share-requisition-list-content{display:flex;flex-direction:column;gap:var(--spacing-small)}.requisition-list-modal .share-requisition-list-content__instruction{color:var(--color-neutral-700)}.share-requisition-list-content__success{display:flex;flex-direction:column;gap:var(--spacing-xxsmall)}.share-requisition-list-content__success .share-requisition-list-content__instruction{margin:0}.share-requisition-list-content__recipient-list{display:flex;flex-direction:column}.share-requisition-list-content__recipient-list .share-requisition-list-content__recipient{margin:0;color:var(--color-neutral-800)}.share-requisition-list-content__field{display:flex;flex-direction:column;gap:var(--spacing-xsmall)}.share-requisition-list-content__multi-select{flex:1;min-width:0}.share-requisition-list-content__multi-select .dropin-multi-select__container{min-height:unset}.share-requisition-list-content__field .dropin-field__hint{margin:0}.share-requisition-list-content__loading{display:flex;align-items:center;gap:var(--spacing-xsmall);color:var(--color-neutral-600);padding:var(--spacing-xsmall) 0}.share-requisition-list-content__actions{display:flex;justify-content:end;gap:var(--spacing-small)}.share-requisition-list-content__actions button{min-width:140px}.share-requisition-list-content__divider-secondary{width:100%}.share-requisition-list-content__link-row{display:flex;gap:var(--spacing-small);align-items:center}.share-requisition-list-content__link-row .dropin-input-container{flex:1;min-width:0}.shared-requisition-list__loading{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:200px;gap:var(--spacing-small);width:100%}.shared-requisition-list__container{width:100%;margin-top:var(--spacing-medium)}.shared-requisition-list__preview{margin-top:var(--spacing-medium);width:100%}.shared-requisition-list__alert-wrapper{margin-bottom:var(--spacing-medium)}.shared-requisition-list__preview-details{display:flex;flex-direction:column;gap:var(--spacing-small);margin-bottom:var(--spacing-small)}.shared-requisition-list__preview-row{display:flex;gap:var(--spacing-small)}.shared-requisition-list__preview-label{font:var(--type-body-1-strong-font);letter-spacing:var(--type-body-1-strong-letter-spacing);color:var(--color-neutral-800);min-width:120px;flex-shrink:0}.shared-requisition-list__preview-value{min-width:0;overflow-wrap:anywhere;font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-900)}.shared-requisition-list__actions{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:var(--spacing-small);align-items:center}.shared-requisition-list__table-wrapper{margin-bottom:var(--spacing-large);max-width:100%;overflow-x:auto}.shared-requisition-list__product{display:flex;align-items:center;gap:var(--spacing-small);min-width:160px}.shared-requisition-list__product img{flex-shrink:0;object-fit:contain}.shared-requisition-list__product a{display:flex;align-items:center;gap:var(--spacing-small)}.requisition-list-print-root{position:absolute;left:-100000px;top:0;width:210mm}.requisition-list-print{color:#000;background:#fff;font:var(--type-body-1-default-font, 14px sans-serif)}.requisition-list-print table{border-collapse:collapse;table-layout:fixed;width:100%}.requisition-list-print th,.requisition-list-print td{border-bottom:1px solid #ccc;padding:8px;text-align:left;vertical-align:top;overflow-wrap:anywhere}.requisition-list-print th:first-child{width:5%}.requisition-list-print th:nth-child(2){width:50%}.requisition-list-print__item{display:flex;align-items:flex-start;gap:8px}.requisition-list-print__thumbnail{width:44px;flex-shrink:0;font-size:10px}.requisition-list-print__thumbnail img{width:44px;height:auto}.requisition-list-print__details{min-width:0}.requisition-list-print__details>*{display:block}.requisition-list-print-status{margin-block:var(--spacing-small)}@media print{.requisition-list-print-root{display:none}body.requisition-list-printing .requisition-list-view__container,body.requisition-list-printing .requisition-list-header,body.requisition-list-printing .requisition-list-print-status,body.requisition-list-printing .dropin-modal:has(.requisition-list-modal--overlay){display:none!important}body.requisition-list-printing>.requisition-list-print-root{display:block;position:static;width:auto}.requisition-list-print thead{display:table-header-group}.requisition-list-print tr{break-inside:avoid;page-break-inside:avoid}}.requisition-list-view__container{width:100%}.requisition-list-view__loading{display:flex;justify-content:center;align-items:center;min-height:400px;width:100%}.requisition-list-view__pagination{margin-top:var(--spacing-small);display:flex;justify-content:space-between;align-items:center}.requisition-list-view__pagination-picker{display:flex;align-items:center;gap:var(--spacing-xsmall);font:var(--type-body-1-default-font);letter-spacing:var(--type-body-1-default-letter-spacing);color:var(--color-neutral-800)}.requisition-list-modal .requisition-list-actions{margin:var(--spacing-medium) auto}', { styleId: "RequisitionList" });
export {
  Qi as RequisitionListForm,
  zt as RequisitionListGrid,
  Kt as RequisitionListHeader,
  Yt as RequisitionListSelector,
  Gt as RequisitionListView,
  ke as ShareRequisitionListContent,
  Xt as SharedRequisitionList
};
//# sourceMappingURL=containers.js.map
