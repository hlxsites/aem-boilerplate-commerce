/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { useState, useCallback, useEffect, useMemo } from "@dropins/tools/preact-compat.js";
import { Card, Button, Header, InLineAlert, Table, Pagination, Icon, ProgressSpinner, Modal } from "@dropins/tools/components.js";
import { Slot, classes, VComponent } from "@dropins/tools/lib.js";
import "@dropins/tools/preact-hooks.js";
/* empty css                             */
import { R as RequisitionListForm } from "../chunks/RequisitionListForm.js";
import { u as useRequisitionListAlert } from "../chunks/PageSizePicker2.js";
import { events } from "@dropins/tools/event-bus.js";
import { Fragment } from "@dropins/tools/preact.js";
import { E as EmptyList, P as PageSizePicker } from "../chunks/PageSizePicker.js";
import { useText } from "@dropins/tools/i18n.js";
import { d as deleteRequisitionList } from "../chunks/deleteRequisitionList.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import "../chunks/transform-requisition-list.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName$4 = "/Users/rafaljanicki/www/storefront-requisition-list/src/hooks/useRequisitionListGrid.tsx";
function useRequisitionListGrid(initial, callbacks, routeRequisitionListDetails) {
  const translations = useText({
    actionDelete: "RequisitionList.RequisitionListItem.actionDelete",
    actionUpdate: "RequisitionList.RequisitionListItem.actionUpdate"
  });
  const [reqLists, setReqLists] = t(useState(initial), "reqLists");
  const [reqListUid, setReqListUid] = t(useState(null), "reqListUid");
  const [isAdding, setIsAdding] = t(useState(false), "isAdding");
  const [isFetching, setIsFetching] = t(useState(false), "isFetching");
  const handleClick = useCallback((uid) => {
    setReqListUid(uid);
    setIsAdding(false);
  }, []);
  const handleCancel = useCallback(() => setReqListUid(null), []);
  const handleAddNew = useCallback(() => {
    setIsAdding(true);
    setReqListUid(null);
  }, []);
  const handleCancelCreate = useCallback(() => setIsAdding(false), []);
  const fetchPage = useCallback(async (page = ((_a) => (_a = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _a.current_page)() ?? 1, pageSize = ((_b) => (_b = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _b.page_size)() ?? 10) => {
    var _a2, _b2, _c;
    setIsFetching(true);
    try {
      const data = await getRequisitionLists(page, pageSize);
      const currentPage = ((_a2 = data == null ? void 0 : data.page_info) == null ? void 0 : _a2.current_page) ?? 1;
      const totalPages = ((_b2 = data == null ? void 0 : data.page_info) == null ? void 0 : _b2.total_pages) ?? 0;
      const hasRows = (((_c = data == null ? void 0 : data.items) == null ? void 0 : _c.length) ?? 0) > 0;
      if (!hasRows && currentPage > 1 && totalPages >= currentPage - 1) {
        const prev = currentPage - 1;
        const prevData = await getRequisitionLists(prev, pageSize);
        setReqLists(prevData);
      } else {
        setReqLists(data);
      }
    } finally {
      setIsFetching(false);
    }
  }, [reqLists]);
  useEffect(() => {
    if (!reqLists) void fetchPage(1);
  }, [reqLists, fetchPage]);
  const handlePageChange = useCallback((page) => fetchPage(page), [fetchPage]);
  const handlePageSizeChange = useCallback(async (pageSize) => {
    await fetchPage(1, pageSize);
  }, [fetchPage]);
  const rows = t(useMemo(() => ((reqLists == null ? void 0 : reqLists.items) ?? []).map((rl) => {
    const isUpdating = reqListUid === rl.uid;
    return {
      name: u("div", {
        className: "requisition-list-grid-wrapper__name",
        children: [u("div", {
          className: "requisition-list-grid-wrapper__name__title",
          children: u("a", {
            href: "#",
            onClick: (e) => {
              e.preventDefault();
              if (routeRequisitionListDetails) {
                const result = routeRequisitionListDetails(rl.uid);
                if (typeof result === "string") {
                  window.location.href = result;
                }
              }
            },
            children: rl.name
          }, void 0, false, {
            fileName: _jsxFileName$4,
            lineNumber: 109,
            columnNumber: 17
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 108,
          columnNumber: 15
        }, this), rl.description && u("div", {
          className: "requisition-list-grid-wrapper__name__description",
          children: rl.description
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 125,
          columnNumber: 17
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 107,
        columnNumber: 13
      }, this),
      items_count: rl.items_count,
      last_updated: new Date(rl.updated_at).toLocaleString(),
      actions: u("div", {
        className: "requisition-list-grid-wrapper__actions",
        children: [u(Button, {
          variant: "tertiary",
          type: "button",
          "data-testid": "update-button",
          onClick: () => handleClick(rl.uid),
          children: translations.actionUpdate
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 135,
          columnNumber: 15
        }, this), u(Button, {
          variant: "tertiary",
          type: "button",
          "data-testid": "delete-button",
          onClick: () => callbacks == null ? void 0 : callbacks.handleOpenModal(rl),
          children: translations.actionDelete
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 143,
          columnNumber: 15
        }, this)]
      }, void 0, true, {
        fileName: _jsxFileName$4,
        lineNumber: 134,
        columnNumber: 13
      }, this),
      _rowDetails: isUpdating ? u(Card, {
        variant: "secondary",
        className: "requisition-list-grid-wrapper__form-row",
        children: u(RequisitionListForm, {
          mode: "update",
          requisitionListUid: rl.uid,
          defaultValues: {
            name: rl.name,
            description: rl.description
          },
          onSuccess: async () => {
            await handlePageChange();
            events.emit("requisitionList/alert", {
              action: "update",
              type: "success",
              context: "requisitionList"
            });
            setReqListUid(null);
          },
          onError: () => {
            events.emit("requisitionList/alert", {
              action: "update",
              type: "error",
              context: "requisitionList"
            });
          },
          onCancel: handleCancel
        }, void 0, false, {
          fileName: _jsxFileName$4,
          lineNumber: 158,
          columnNumber: 15
        }, this)
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 154,
        columnNumber: 13
      }, this) : void 0
    };
  }), [reqLists == null ? void 0 : reqLists.items, reqListUid, handleClick, handleCancel, translations.actionUpdate, translations.actionDelete, callbacks, handlePageChange, routeRequisitionListDetails]), "rows: Row[]");
  const expandedRows = t(useMemo(() => new Set(rows.map((row, index) => row._rowDetails ? index : -1).filter((index) => index >= 0)), [rows]), "expandedRows");
  return {
    rows,
    expandedRows,
    isLoading: isFetching || !reqLists,
    pageInfo: reqLists == null ? void 0 : reqLists.page_info,
    handlePageChange,
    handlePageSizeChange,
    isAdding,
    handleAddNew,
    handleCancelCreate
  };
}
var _jsxFileName$3 = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListGrid/RequisitionListGrid.tsx";
const RequisitionListGrid = ({
  requisitionLists,
  routeRequisitionListDetails,
  slots
}) => {
  const [modal, setModal] = t(useState({
    isOpen: false,
    isLoading: false,
    rl: null
  }), "modal");
  const handleOpenModal = (rl) => setModal({
    isOpen: true,
    isLoading: false,
    rl
  });
  const handleCloseModal = () => setModal({
    isOpen: false,
    isLoading: false,
    rl: null
  });
  const handleConfirmModal = async () => {
    if (!modal.rl) return;
    setModal((m) => ({
      ...m,
      isLoading: true
    }));
    await deleteRequisitionList(modal.rl.uid).then(async () => {
      events.emit("requisitionList/alert", {
        type: "success",
        action: "delete",
        context: "requisitionList"
      });
    }).catch(() => {
      events.emit("requisitionList/alert", {
        type: "error",
        action: "delete",
        context: "requisitionList"
      });
    }).finally(async () => {
      await handlePageChange();
      handleCloseModal();
    });
  };
  const {
    rows,
    expandedRows,
    isLoading,
    pageInfo,
    handlePageChange,
    handlePageSizeChange,
    isAdding,
    handleAddNew,
    handleCancelCreate
  } = useRequisitionListGrid(requisitionLists, {
    handleOpenModal
  }, routeRequisitionListDetails);
  const translations = useText({
    containerTitle: `RequisitionList.containerTitle`,
    deleteRequisitionListTitle: "RequisitionList.RequisitionListWrapper.deleteRequisitionListTitle",
    deleteRequisitionListMessage: "RequisitionList.RequisitionListWrapper.deleteRequisitionListMessage",
    cancelAction: "RequisitionList.RequisitionListWrapper.cancelAction",
    confirmAction: "RequisitionList.RequisitionListWrapper.confirmAction"
  });
  const getHeader = useCallback(() => {
    if (slots == null ? void 0 : slots.Header) {
      return u(Slot, {
        name: "Header",
        "aria-label": translations.containerTitle,
        title: translations.containerTitle,
        slot: slots.Header
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 113,
        columnNumber: 9
      }, void 0);
    }
    return u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 122,
      columnNumber: 7
    }, void 0);
  }, [slots, translations.containerTitle]);
  return u(Fragment, {
    children: [u(RequisitionListGridWrapper, {
      header: getHeader(),
      rows,
      expandedRows,
      skeletonRowCount: 10,
      isLoading,
      pageInfo,
      handlePageChange,
      handlePageSizeChange,
      defaultPageSize: 10,
      isAdding,
      handleAddNew,
      handleCancelCreate
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 132,
      columnNumber: 7
    }, void 0), modal.isOpen && u(RequisitionListModal, {
      isOpen: true,
      isLoading: modal.isLoading,
      title: translations.deleteRequisitionListTitle,
      modalContent: translations.deleteRequisitionListMessage,
      confirmBtnCaption: translations.confirmAction,
      closeBtnCaption: translations.cancelAction,
      handleModalOnClose: handleCloseModal,
      handleModalOnConfirm: handleConfirmModal
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 147,
      columnNumber: 9
    }, void 0)]
  }, void 0);
};
const SvgAdd = (props) => /* @__PURE__ */ React.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React.createElement("g", { id: "Large" }, /* @__PURE__ */ React.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), /* @__PURE__ */ React.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" }))));
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListGridWrapper/RequisitionListGridWrapper.tsx";
const RequisitionListGridWrapper = ({
  className,
  isLoading = false,
  header,
  rows = [],
  expandedRows,
  skeletonRowCount = 10,
  pageInfo,
  handlePageChange,
  handlePageSizeChange,
  defaultPageSize = 10,
  isAdding,
  handleAddNew,
  handleCancelCreate,
  ...props
}) => {
  const translations = useText({
    name: `RequisitionList.RequisitionListWrapper.name`,
    itemsCount: `RequisitionList.RequisitionListWrapper.itemsCount`,
    lastUpdated: `RequisitionList.RequisitionListWrapper.lastUpdated`,
    actions: `RequisitionList.RequisitionListWrapper.actions`,
    emptyList: `RequisitionList.RequisitionListWrapper.emptyList`
  });
  const hasAnyItems = ((pageInfo == null ? void 0 : pageInfo.total_pages) ?? 0) > 0;
  const showEmptyList = !isLoading && rows.length === 0 && !hasAnyItems;
  const {
    alert,
    setAlert,
    handleRequisitionListAlert
  } = useRequisitionListAlert();
  useEffect(() => {
    events.on("requisitionList/alert", handleRequisitionListAlert);
  }, [handleRequisitionListAlert]);
  return u("div", {
    ...props,
    className: classes(["requisition-list-grid-wrapper", className]),
    "data-testid": "requisition-list-grid-wrapper",
    children: [header && u("div", {
      className: classes(["requisition-list-grid-wrapper__header", className]),
      "data-testid": "requisition-list-grid-wrapper-header",
      children: u(VComponent, {
        node: header
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 110,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 103,
      columnNumber: 9
    }, void 0), alert && u(Fragment, {
      children: u(InLineAlert, {
        heading: alert.description,
        type: alert.type,
        variant: "primary",
        onDismiss: () => setAlert(null)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 116,
        columnNumber: 11
      }, void 0)
    }, void 0, false), showEmptyList ? u(EmptyList, {
      textContent: translations.emptyList
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 126,
      columnNumber: 9
    }, void 0) : u(Fragment, {
      children: [u(Table, {
        columns: [{
          key: "name",
          label: translations.name
        }, {
          key: "items_count",
          label: translations.itemsCount
        }, {
          key: "last_updated",
          label: translations.lastUpdated
        }, {
          key: "actions",
          label: translations.actions
        }],
        rowData: rows,
        expandedRows,
        loading: isLoading,
        skeletonRowCount
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 130,
        columnNumber: 11
      }, void 0), u("div", {
        className: classes(["requisition-list-grid-wrapper__pagination", className]),
        children: u("div", {
          className: "requisition-list-grid-wrapper__pagination-controls",
          children: [u(PageSizePicker, {
            currentPageSize: (pageInfo == null ? void 0 : pageInfo.page_size) || defaultPageSize,
            onPageSizeChange: handlePageSizeChange || (() => Promise.resolve()),
            disabled: isLoading
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 149,
            columnNumber: 15
          }, void 0), pageInfo && pageInfo.total_pages > 1 && u(Pagination, {
            totalPages: pageInfo.total_pages,
            currentPage: pageInfo.current_page,
            onChange: handlePageChange
          }, void 0, false, {
            fileName: _jsxFileName$2,
            lineNumber: 157,
            columnNumber: 17
          }, void 0)]
        }, void 0, true, {
          fileName: _jsxFileName$2,
          lineNumber: 148,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 142,
        columnNumber: 11
      }, void 0)]
    }, void 0, true), u("div", {
      className: classes(["requisition-list-grid-wrapper__add-new", className]),
      children: isAdding ? u(Card, {
        variant: "secondary",
        children: u(RequisitionListForm, {
          mode: "create",
          onSuccess: async () => {
            await handlePageChange();
            handleCancelCreate();
            events.emit("requisitionList/alert", {
              type: "success",
              action: "create",
              context: "requisitionList"
            });
          },
          onError: () => {
            events.emit("requisitionList/alert", {
              type: "error",
              action: "create",
              context: "requisitionList"
            });
          },
          onCancel: handleCancelCreate
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 177,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 176,
        columnNumber: 11
      }, void 0) : u(RequisitionListActions, {
        onAddNew: handleAddNew
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 199,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 169,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 96,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListActions/RequisitionListActions.tsx";
const RequisitionListActions = ({
  selectable,
  className,
  onAddNew
}) => {
  const translations = useText({
    addNewReqListBtn: `RequisitionList.AddNewReqList.addNewReqListBtn`
  });
  return u("button", {
    type: "button",
    "aria-label": translations.addNewReqListBtn,
    role: "button",
    className: classes(["requisition-list-actions", ["requisition-list-actions--selectable", selectable], className]),
    "data-testid": "requisition-list-actions-button",
    onClick: onAddNew,
    children: [u("span", {
      className: "requisition-list-actions__title",
      "data-testid": "requisition-list-actions-button-text",
      children: translations.addNewReqListBtn
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 51,
      columnNumber: 7
    }, void 0), u(Icon, {
      source: SvgAdd,
      size: "32"
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 57,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 39,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListModal/RequisitionListModal.tsx";
const RequisitionListModal = ({
  isOpen,
  isLoading,
  title,
  modalContent,
  closeBtnCaption,
  confirmBtnCaption,
  handleModalOnClose,
  handleModalOnConfirm
}) => {
  if (!isOpen) return null;
  return u(Modal, {
    className: "requisition-list-modal--overlay",
    "data-testid": "requisition-list-modal",
    size: "medium",
    centered: false,
    title,
    onClose: handleModalOnClose,
    backgroundDim: true,
    clickToDismiss: true,
    escapeToDismiss: true,
    role: "dialog",
    "aria-label": title,
    children: u("div", {
      className: "requisition-list-modal",
      children: [isLoading ? u("div", {
        className: "requisition-list-modal__spinner",
        "data-testid": "progress-spinner",
        children: u(ProgressSpinner, {
          stroke: "4",
          size: "large"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 70,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 11
      }, void 0) : null, u("p", {
        children: modalContent
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 73,
        columnNumber: 9
      }, void 0), u("div", {
        className: "requisition-list-modal__buttons",
        children: [handleModalOnClose && u(Button, {
          "data-testid": "rl-modal-close-button",
          type: "button",
          onClick: handleModalOnClose,
          variant: "secondary",
          disabled: isLoading,
          children: closeBtnCaption
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 76,
          columnNumber: 13
        }, void 0), handleModalOnConfirm && u(Button, {
          "data-testid": "rl-modal-confirm-button",
          type: "button",
          onClick: handleModalOnConfirm,
          disabled: isLoading,
          children: confirmBtnCaption
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 87,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 64,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListGrid,
  RequisitionListGrid as default
};
//# sourceMappingURL=RequisitionListGrid.js.map
