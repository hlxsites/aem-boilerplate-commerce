/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { useState as useState$1, useEffect, useCallback as useCallback$1 } from "@dropins/tools/preact-compat.js";
import { b as getProductData, a as addRequisitionListItemsToCart, d as deleteRequisitionListItems, u as updateRequisitionListItems, g as getRequisitionList } from "../chunks/addRequisitionListItemsToCart.js";
import { Button, Icon, Field, Input, Price, Checkbox, Table, Header, InLineAlert, Pagination } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import { useState, useCallback } from "@dropins/tools/preact-hooks.js";
import { classes, VComponent } from "@dropins/tools/lib.js";
/* empty css                             */
import { u as useRequisitionListAlert } from "../chunks/PageSizePicker2.js";
import { h, Fragment } from "@dropins/tools/preact.js";
import { useText } from "@dropins/tools/i18n.js";
import { E as EmptyList, P as PageSizePicker } from "../chunks/PageSizePicker.js";
import "../chunks/transform-requisition-list.js";
import "@dropins/tools/fetch-graphql.js";
import "../chunks/RequisitionListItemsFragment.graphql.js";
function useRequisitionListSelectedItems(requisitionList) {
  const [currentRequisitionList, setCurrentRequisitionList] = t(useState(requisitionList), "currentRequisitionList");
  const [selectedItems, setSelectedItems] = t(useState(/* @__PURE__ */ new Set()), "selectedItems");
  const handleItemSelection = useCallback((itemUid, isSelected) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (isSelected) {
        newSet.add(itemUid);
      } else {
        newSet.delete(itemUid);
      }
      return newSet;
    });
  }, []);
  const handleSelectAll = useCallback(() => {
    var _a;
    const allItemUids = (_a = currentRequisitionList.items) == null ? void 0 : _a.map((item) => item.uid);
    setSelectedItems(new Set(allItemUids));
  }, [currentRequisitionList]);
  const handleSelectNone = useCallback(() => {
    setSelectedItems(/* @__PURE__ */ new Set());
  }, []);
  return {
    currentRequisitionList,
    setCurrentRequisitionList,
    selectedItems,
    setSelectedItems,
    handleItemSelection,
    handleSelectAll,
    handleSelectNone
  };
}
const SvgCart = (props) => /* @__PURE__ */ React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_102_196)" }, /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M18.3601 18.16H6.5601L4.8801 3H2.3501M19.6701 19.59C19.6701 20.3687 19.0388 21 18.2601 21C17.4814 21 16.8501 20.3687 16.8501 19.59C16.8501 18.8113 17.4814 18.18 18.2601 18.18C19.0388 18.18 19.6701 18.8113 19.6701 19.59ZM7.42986 19.59C7.42986 20.3687 6.79858 21 6.01986 21C5.24114 21 4.60986 20.3687 4.60986 19.59C4.60986 18.8113 5.24114 18.18 6.01986 18.18C6.79858 18.18 7.42986 18.8113 7.42986 19.59Z", stroke: "currentColor", strokeLinejoin: "round" }), /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M5.25 6.37L20.89 8.06L20.14 14.8H6.19", stroke: "currentColor", strokeLinejoin: "round" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_102_196" }, /* @__PURE__ */ React.createElement("rect", { vectorEffect: "non-scaling-stroke", width: 19.29, height: 19.5, fill: "white", transform: "translate(2.3501 2.25)" }))));
const SvgTrash = (props) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", ...props }, /* @__PURE__ */ React.createElement("path", { d: "M1 5H23", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10 }), /* @__PURE__ */ React.createElement("path", { d: "M17.3674 22H6.63446C5.67952 22 4.88992 21.2688 4.8379 20.3338L4 5H20L19.1621 20.3338C19.1119 21.2688 18.3223 22 17.3655 22H17.3674Z", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10 }), /* @__PURE__ */ React.createElement("path", { d: "M9.87189 2H14.1281C14.6085 2 15 2.39766 15 2.88889V5H9V2.88889C9 2.39912 9.39006 2 9.87189 2Z", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10 }), /* @__PURE__ */ React.createElement("path", { d: "M8.87402 8.58057L9.39348 17.682", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10 }), /* @__PURE__ */ React.createElement("path", { d: "M14.6673 8.58057L14.146 17.682", stroke: "currentColor", strokeWidth: 1.5, strokeMiterlimit: 10 }));
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/ProductListTable/ProductListTable.tsx";
const ProductListTable = ({
  className,
  items,
  selectedItems,
  currentPage,
  pageSize,
  canEdit = true,
  handleItemSelection,
  handleUpdateQuantity,
  onAddToCart,
  onDeleteItem,
  ...props
}) => {
  const translations = useText({
    productNameHeader: "RequisitionList.RequisitionListView.productListTable.headers.productName",
    skuHeader: "RequisitionList.RequisitionListView.productListTable.headers.sku",
    priceHeader: "RequisitionList.RequisitionListView.productListTable.headers.price",
    quantityHeader: "RequisitionList.RequisitionListView.productListTable.headers.quantity",
    subtotalHeader: "RequisitionList.RequisitionListView.productListTable.headers.subtotal",
    actionsHeader: "RequisitionList.RequisitionListView.productListTable.headers.actions",
    actionAddToCart: "RequisitionList.RequisitionListView.actionAddToCart",
    actionDelete: "RequisitionList.RequisitionListView.actionDelete",
    itemQuantity: "RequisitionList.RequisitionListView.productListTable.itemQuantity"
  });
  const columns = [{
    label: "#",
    key: "index"
  }, {
    label: "item",
    key: "item"
  }, {
    label: translations.priceHeader,
    key: "price"
  }, {
    label: translations.quantityHeader,
    key: "quantity"
  }, {
    label: translations.subtotalHeader,
    key: "subtotal"
  }];
  if (canEdit) {
    columns.unshift({
      label: "",
      key: "checkbox"
    });
    columns.push({
      label: translations.actionsHeader,
      key: "actions"
    });
  }
  const handleItemCheckboxChange = (event, item) => {
    const isSelected = event.target.checked;
    handleItemSelection(item.uid, isSelected);
  };
  const rowData = items.map((item, index) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q;
    return {
      index: u("span", {
        children: (currentPage - 1) * pageSize + index + 1
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 125,
        columnNumber: 14
      }, void 0),
      item: u("div", {
        style: "display: inline-block",
        children: [u("div", {
          style: "float: left;",
          children: u(Checkbox, {
            className: "requisition-list-view-product-list-table__checkbox",
            name: "itemSelected",
            "data-testid": `item-checkbox-${item.sku}`,
            onChange: (e) => handleItemCheckboxChange(e, item),
            value: item.sku,
            checked: selectedItems.has(item.uid)
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 129,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 128,
          columnNumber: 11
        }, void 0), u("div", {
          className: "requisition-list-view-product-list-table__product-name",
          children: ((_a = item.product) == null ? void 0 : _a.name) || item.sku
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 141,
          columnNumber: 11
        }, void 0), u("div", {
          className: "requisition-list-view-product-list-table__sku",
          children: item.sku
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 144,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 127,
        columnNumber: 9
      }, void 0),
      price: u(Price, {
        className: "requisition-list-view-product-list-table__price",
        amount: (_e = (_d = (_c = (_b = item.product) == null ? void 0 : _b.price) == null ? void 0 : _c.final) == null ? void 0 : _d.amount) == null ? void 0 : _e.value,
        currency: (_i = (_h = (_g = (_f = item.product) == null ? void 0 : _f.price) == null ? void 0 : _g.final) == null ? void 0 : _h.amount) == null ? void 0 : _i.currency
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 150,
        columnNumber: 9
      }, void 0),
      subtotal: u(Price, {
        className: "requisition-list-view-product-list-table__price",
        amount: ((_m = (_l = (_k = (_j = item.product) == null ? void 0 : _j.price) == null ? void 0 : _k.final) == null ? void 0 : _l.amount) == null ? void 0 : _m.value) * item.quantity,
        currency: (_q = (_p = (_o = (_n = item.product) == null ? void 0 : _n.price) == null ? void 0 : _o.final) == null ? void 0 : _p.amount) == null ? void 0 : _q.currency
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 157,
        columnNumber: 9
      }, void 0),
      quantity: u("span", {
        className: "requisition-list-view-product-list-table__quantity",
        children: u(Field, {
          disabled: false,
          children: u(Input, {
            id: "requisition-list-item-quantity",
            name: "quantity",
            type: "text",
            value: item.quantity,
            onBlur: (e) => {
              const newValue = Number.parseInt(e.target.value, 10);
              handleUpdateQuantity(item.uid, newValue);
            }
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 166,
            columnNumber: 13
          }, void 0)
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 165,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 164,
        columnNumber: 9
      }, void 0),
      actions: u("div", {
        className: "requisition-list-view__bulk-actions",
        children: [u(Button, {
          type: "button",
          onClick: () => onAddToCart([item.uid]),
          icon: u(Icon, {
            source: SvgCart
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 187,
            columnNumber: 19
          }, void 0),
          "data-testid": "product-list-table-add-to-cart-button"
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 184,
          columnNumber: 11
        }, void 0), u(Button, {
          type: "button",
          variant: "secondary",
          icon: u(Icon, {
            source: SvgTrash
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 193,
            columnNumber: 19
          }, void 0),
          onClick: () => onDeleteItem([item.uid]),
          "data-testid": "product-list-table-delete-button"
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 190,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 183,
        columnNumber: 9
      }, void 0)
    };
  });
  const table = u(Table, {
    columns,
    rowData,
    "data-testid": "product-list-table",
    mobileLayout: "stacked"
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 203,
    columnNumber: 5
  }, void 0);
  return u(VComponent, {
    node: h("div", {}),
    className: classes(["requisition-list-view-product-list-table-container", className]),
    "data-testid": "product-list-table-container",
    ...props,
    children: table
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 212,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/BatchActions/BatchActions.tsx";
const BatchActions = ({
  selectedItems,
  deletingItemId,
  addingToCartItemId,
  bulkAddingToCart,
  updatingQuantityItemId,
  onSelectAll,
  onSelectNone,
  onBulkAddToCart,
  onBulkDelete
}) => {
  const translations = useText({
    statusDeleting: `RequisitionList.RequisitionListView.statusDeleting`,
    actionDeleteSelected: `RequisitionList.RequisitionListView.actionDeleteSelected`,
    actionSelectAll: `RequisitionList.RequisitionListView.actionSelectAll`,
    actionSelectNone: `RequisitionList.RequisitionListView.actionSelectNone`,
    actionAddToCart: `RequisitionList.RequisitionListView.actionAddToCart`,
    actionAddSelectedToCart: `RequisitionList.RequisitionListView.actionAddSelectedToCart`,
    statusBulkAddingToCart: `RequisitionList.RequisitionListView.statusBulkAddingToCart`
  });
  return u("div", {
    class: "requisition-list-view__bulk-actions",
    children: [u(Button, {
      "data-testid": "bulk-actions-select-all-btn",
      type: "button",
      variant: "secondary",
      onClick: onSelectAll,
      disabled: deletingItemId !== null || addingToCartItemId !== null || bulkAddingToCart || updatingQuantityItemId !== null,
      children: translations.actionSelectAll
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 61,
      columnNumber: 7
    }, void 0), u(Button, {
      "data-testid": "bulk-actions-select-none-btn",
      type: "button",
      variant: "secondary",
      onClick: onSelectNone,
      disabled: deletingItemId !== null || addingToCartItemId !== null || bulkAddingToCart || updatingQuantityItemId !== null || selectedItems.size === 0,
      children: translations.actionSelectNone
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 75,
      columnNumber: 7
    }, void 0), selectedItems.size > 0 && u(Button, {
      "data-testid": "bulk-actions-add-to-cart-btn",
      type: "button",
      variant: "primary",
      onClick: onBulkAddToCart,
      icon: u(Icon, {
        source: SvgCart
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 96,
        columnNumber: 17
      }, void 0),
      disabled: deletingItemId !== null || addingToCartItemId !== null || bulkAddingToCart || updatingQuantityItemId !== null,
      children: bulkAddingToCart ? translations.statusBulkAddingToCart : `${translations.actionAddSelectedToCart} (${selectedItems.size})`
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 91,
      columnNumber: 9
    }, void 0), selectedItems.size > 0 && u(Button, {
      "data-testid": "bulk-actions-delete-all-btn",
      type: "button",
      variant: "secondary",
      onClick: onBulkDelete,
      icon: u(Icon, {
        source: SvgTrash
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 115,
        columnNumber: 17
      }, void 0),
      disabled: deletingItemId !== null || addingToCartItemId !== null || bulkAddingToCart || updatingQuantityItemId !== null,
      children: deletingItemId === "bulk" ? translations.statusDeleting : `${translations.actionDeleteSelected} (${selectedItems.size})`
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 110,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 60,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListView/RequisitionListView.tsx";
const RequisitionListView = ({
  requisitionList,
  skipProductLoading = false,
  pageSize = 10
}) => {
  const [loadingProducts, setLoadingProducts] = t(useState$1(false), "loadingProducts");
  const [deletingItemId, setDeletingItemId] = t(useState$1(null), "deletingItemId");
  const [addingToCartItemId, setAddingToCartItemId] = t(useState$1(null), "addingToCartItemId");
  const [bulkAddingToCart, setBulkAddingToCart] = t(useState$1(false), "bulkAddingToCart");
  const [updatingQuantityItemId, setUpdatingQuantityItemId] = t(useState$1(null), "updatingQuantityItemId");
  const [loadingPage, setLoadingPage] = t(useState$1(false), "loadingPage");
  const [currentPageSize, setCurrentPageSize] = t(useState$1(pageSize), "currentPageSize");
  const {
    currentRequisitionList,
    setCurrentRequisitionList,
    selectedItems,
    setSelectedItems,
    handleItemSelection,
    handleSelectAll,
    handleSelectNone
  } = useRequisitionListSelectedItems(requisitionList);
  const translations = useText({
    emptyRequisitionList: `RequisitionList.RequisitionListView.emptyRequisitionList`,
    errorLoadingProducts: `RequisitionList.RequisitionListView.errorLoadingProducts`,
    errorLoadPage: `RequisitionList.RequisitionListView.errorLoadPage`
  });
  const {
    alert,
    setAlert,
    handleRequisitionListAlert
  } = useRequisitionListAlert();
  useEffect(() => {
    const requisitionListEvent = events.on("requisitionList/data", (payload) => {
      setCurrentRequisitionList(payload);
      setSelectedItems(/* @__PURE__ */ new Set());
    });
    events.on("requisitionList/alert", handleRequisitionListAlert);
    return () => {
      requisitionListEvent == null ? void 0 : requisitionListEvent.off();
    };
  }, [handleRequisitionListAlert, setCurrentRequisitionList, setSelectedItems]);
  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);
  const fetchAndMergeProducts = useCallback$1(async (baseRequisitionList) => {
    var _a, _b;
    const productSkus = ((_a = baseRequisitionList.items) == null ? void 0 : _a.map((item) => item.sku)) || [];
    if (productSkus.length === 0) {
      return baseRequisitionList;
    }
    setLoadingProducts(true);
    try {
      const fetchedProducts = await getProductData(productSkus);
      if (fetchedProducts) {
        const productMap = /* @__PURE__ */ new Map();
        fetchedProducts.forEach((product) => {
          productMap.set(product.sku, product);
        });
        return {
          ...baseRequisitionList,
          items: (_b = baseRequisitionList.items) == null ? void 0 : _b.map((item) => ({
            ...item,
            product: productMap.get(item.sku) || item.product
            // Use fetched product or keep existing
          }))
        };
      }
      console.warn("No products found");
      return baseRequisitionList;
    } catch (error) {
      console.warn(error instanceof Error ? error.message : translations.errorLoadingProducts);
      return baseRequisitionList;
    } finally {
      setLoadingProducts(false);
    }
  }, [translations.errorLoadingProducts]);
  useEffect(() => {
    if (skipProductLoading) {
      return;
    }
    const loadInitialProducts = async () => {
      const updatedList = await fetchAndMergeProducts(requisitionList);
      setCurrentRequisitionList(updatedList);
    };
    loadInitialProducts();
  }, [requisitionList, fetchAndMergeProducts, skipProductLoading, setCurrentRequisitionList]);
  const handleAddItemsToCart = useCallback$1(async (itemUids) => {
    if (itemUids && itemUids.length === 1) {
      setBulkAddingToCart(false);
      setAddingToCartItemId(itemUids);
    } else {
      setBulkAddingToCart(true);
      setAddingToCartItemId(null);
    }
    try {
      const errors = await addRequisitionListItemsToCart(currentRequisitionList.uid, itemUids);
      if (errors && errors.length > 0) {
        events.emit("requisitionList/alert", {
          action: "move",
          type: "error",
          context: "product",
          message: errors.map((e) => e.message)
        });
      } else {
        events.emit("requisitionList/alert", {
          action: "move",
          type: "success",
          context: "product"
        });
      }
    } catch (error) {
      events.emit("requisitionList/alert", {
        action: "move",
        type: "error",
        context: "product"
      });
    } finally {
      setAddingToCartItemId(null);
      setBulkAddingToCart(false);
    }
  }, [currentRequisitionList]);
  const handleDeleteItems = useCallback$1(async (itemUids) => {
    if (itemUids && itemUids.length === 1) {
      setDeletingItemId(itemUids[0]);
    } else {
      setDeletingItemId("bulk");
    }
    try {
      const updatedRequisitionList = await deleteRequisitionListItems(currentRequisitionList.uid, itemUids, currentPageSize, currentRequisitionList.page_info.current_page);
      if (updatedRequisitionList) {
        const enrichedRequisitionList = await fetchAndMergeProducts(updatedRequisitionList);
        setCurrentRequisitionList(enrichedRequisitionList);
        events.emit("requisitionList/alert", {
          action: "delete",
          type: "success",
          context: "product"
        });
      } else {
        events.emit("requisitionList/alert", {
          action: "delete",
          type: "error",
          context: "product"
        });
      }
    } catch (error) {
      events.emit("requisitionList/alert", {
        action: "delete",
        type: "error",
        context: "product"
      });
    } finally {
      setDeletingItemId(null);
    }
  }, [currentRequisitionList, currentPageSize, fetchAndMergeProducts, setCurrentRequisitionList]);
  const handleUpdateQuantity = useCallback$1(async (itemUid, newQuantity) => {
    var _a;
    setUpdatingQuantityItemId(itemUid);
    try {
      const currentItem = (_a = currentRequisitionList.items) == null ? void 0 : _a.find((item) => item.uid === itemUid);
      if (!currentItem) {
        events.emit("requisitionList/alert", {
          action: "update",
          type: "error",
          context: "product"
        });
        return;
      }
      const updatedItem = {
        item_id: currentItem.uid,
        entered_options: currentItem.entered_options,
        selected_options: currentItem.selected_options,
        quantity: newQuantity
      };
      const updatedRequisitionList = await updateRequisitionListItems(currentRequisitionList.uid, [updatedItem], currentPageSize, currentRequisitionList.page_info.current_page);
      if (updatedRequisitionList) {
        const enrichedRequisitionList = await fetchAndMergeProducts(updatedRequisitionList);
        setCurrentRequisitionList(enrichedRequisitionList);
        events.emit("requisitionList/alert", {
          action: "update",
          type: "success",
          context: "product"
        });
      } else {
        events.emit("requisitionList/alert", {
          action: "update",
          type: "error",
          context: "product"
        });
      }
    } catch (error) {
      events.emit("requisitionList/alert", {
        action: "update",
        type: "error",
        context: "product"
      });
    } finally {
      setUpdatingQuantityItemId(null);
    }
  }, [currentRequisitionList, fetchAndMergeProducts, setCurrentRequisitionList, currentPageSize]);
  const handlePageChange = useCallback$1(async (page) => {
    setLoadingPage(true);
    try {
      const updatedRequisitionList = await getRequisitionList(currentRequisitionList.uid, page, currentPageSize);
      if (updatedRequisitionList) {
        const updatedListWithProducts = await fetchAndMergeProducts(updatedRequisitionList);
        setCurrentRequisitionList(updatedListWithProducts);
      } else {
        console.warn(translations.errorLoadPage);
      }
    } catch (error) {
      console.warn(error instanceof Error ? error.message : translations.errorLoadPage);
    } finally {
      setLoadingPage(false);
    }
  }, [currentRequisitionList.uid, fetchAndMergeProducts, currentPageSize, translations, setCurrentRequisitionList]);
  const handlePageSizeChange = useCallback$1(async (newPageSize) => {
    setCurrentPageSize(newPageSize);
    setLoadingPage(true);
    try {
      const updatedRequisitionList = await getRequisitionList(currentRequisitionList.uid, 1, newPageSize);
      if (updatedRequisitionList) {
        const updatedListWithProducts = await fetchAndMergeProducts(updatedRequisitionList);
        setCurrentRequisitionList(updatedListWithProducts);
      } else {
        console.warn(translations.errorLoadPage);
      }
    } catch (error) {
      console.warn(translations.errorLoadPage);
    } finally {
      setLoadingPage(false);
    }
  }, [currentRequisitionList.uid, fetchAndMergeProducts, translations, setCurrentRequisitionList]);
  return u("div", {
    className: "requisition-list-view__container",
    children: [u(Header, {
      "aria-label": currentRequisitionList.name,
      role: "region",
      title: currentRequisitionList.name
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 424,
      columnNumber: 7
    }, void 0), currentRequisitionList.items_count === 0 ? u(EmptyList, {
      textContent: `${currentRequisitionList.name} ${translations.emptyRequisitionList}`
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 431,
      columnNumber: 9
    }, void 0) : u(Fragment, {
      children: [alert && u(InLineAlert, {
        heading: alert.description,
        type: alert.type,
        variant: "primary",
        onDismiss: () => setAlert(null)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 437,
        columnNumber: 13
      }, void 0), u(BatchActions, {
        selectedItems,
        deletingItemId,
        addingToCartItemId,
        bulkAddingToCart,
        updatingQuantityItemId,
        onSelectAll: handleSelectAll,
        onSelectNone: handleSelectNone,
        onBulkAddToCart: () => handleAddItemsToCart(Array.from(selectedItems)),
        onBulkDelete: () => handleDeleteItems(Array.from(selectedItems))
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 445,
        columnNumber: 11
      }, void 0), u(ProductListTable, {
        items: currentRequisitionList.items,
        selectedItems,
        currentPage: currentRequisitionList.page_info.current_page,
        pageSize: currentRequisitionList.page_info.page_size,
        handleItemSelection,
        handleUpdateQuantity,
        onAddToCart: handleAddItemsToCart,
        onDeleteItem: handleDeleteItems
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 459,
        columnNumber: 11
      }, void 0), currentRequisitionList.page_info && u("div", {
        className: "requisition-list-view__pagination",
        children: u("div", {
          className: "requisition-list-view__pagination-controls",
          children: [u(PageSizePicker, {
            currentPageSize: currentRequisitionList.page_info.page_size,
            onPageSizeChange: handlePageSizeChange,
            disabled: loadingPage || loadingProducts
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 474,
            columnNumber: 17
          }, void 0), currentRequisitionList.page_info.total_pages > 1 && u(Pagination, {
            totalPages: currentRequisitionList.page_info.total_pages,
            currentPage: currentRequisitionList.page_info.current_page,
            onChange: handlePageChange,
            disabled: loadingPage || loadingProducts
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 480,
            columnNumber: 19
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 473,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 472,
        columnNumber: 13
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 423,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListView,
  RequisitionListView as default
};
//# sourceMappingURL=RequisitionListView.js.map
