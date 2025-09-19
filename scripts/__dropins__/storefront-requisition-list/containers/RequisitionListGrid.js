/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { useState, useCallback, useEffect } from "@dropins/tools/preact-compat.js";
import { Button, Card, Pagination, Icon, ProgressSpinner, Modal, Header } from "@dropins/tools/components.js";
import { classes, VComponent, Slot } from "@dropins/tools/lib.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import "@dropins/tools/preact-hooks.js";
import { R as RequisitionListForm } from "../chunks/RequisitionListForm.js";
/* empty css                             */
import { useText } from "@dropins/tools/i18n.js";
import { d as deleteRequisitionList } from "../chunks/deleteRequisitionList.js";
import "@dropins/tools/preact.js";
import "../chunks/transform-requisition-list.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName$4 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListItem/RequisitionListItem.tsx";
const RequisitionListItem = ({
  className,
  requisitionList,
  onEdit,
  onRemoveBtnClick,
  ...props
}) => {
  const translations = useText({
    actionRemove: `RequisitionList.RequisitionListItem.actionRemove`,
    actionRename: `RequisitionList.RequisitionListItem.actionRename`
  });
  const handleEdit = () => {
    if (onEdit) {
      onEdit(requisitionList.uid, {
        name: requisitionList.name,
        description: requisitionList.description || ""
      });
    }
  };
  return u("div", {
    ...props,
    "data-testid": "requisition-list-item",
    className: classes(["requisition-list-item__row", className]),
    children: [u("div", {
      className: classes(["requisition-list-item__cell", className]),
      children: [u("strong", {
        className: "requisition-list-item__name",
        children: requisitionList.name
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 67,
        columnNumber: 9
      }, void 0), u("div", {
        className: "requisition-list-item__description",
        children: requisitionList.description
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 70,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 66,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__items_count", className]),
      children: requisitionList.items_count
    }, void 0, false, {
      fileName: _jsxFileName$4,
      lineNumber: 74,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__updated_at", className]),
      children: requisitionList.updated_at
    }, void 0, false, {
      fileName: _jsxFileName$4,
      lineNumber: 83,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__actions", className]),
      children: [u(Button, {
        type: "button",
        variant: "tertiary",
        onClick: handleEdit,
        "data-testid": "rename-button",
        children: translations.actionRename
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 99,
        columnNumber: 9
      }, void 0), u(Button, {
        variant: "tertiary",
        type: "button",
        "data-testid": "remove-button",
        onClick: () => onRemoveBtnClick(requisitionList, {
          isOpen: true
        }),
        children: translations.actionRemove
      }, void 0, false, {
        fileName: _jsxFileName$4,
        lineNumber: 107,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$4,
      lineNumber: 92,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$4,
    lineNumber: 61,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$3 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListGridWrapper/RequisitionListGridWrapper.tsx";
const RequisitionListGridWrapper = ({
  className,
  requisitionLists,
  header,
  addReqList = false,
  ...props
}) => {
  var _b, _c, _d;
  const translations = useText({
    name: `RequisitionList.RequisitionListWrapper.name`,
    itemsCount: `RequisitionList.RequisitionListWrapper.itemsCount`,
    lastUpdated: `RequisitionList.RequisitionListWrapper.lastUpdated`,
    actions: `RequisitionList.RequisitionListWrapper.actions`,
    loginMsg: `RequisitionList.RequisitionListWrapper.loginMsg`,
    confirmRemove: `RequisitionList.RequisitionListWrapper.confirmRemove`,
    confirmRemoveContent: `RequisitionList.RequisitionListWrapper.confirmRemoveContent`,
    cancelAction: `RequisitionList.RequisitionListWrapper.cancelAction`,
    confirmAction: `RequisitionList.RequisitionListWrapper.confirmAction`
  });
  const [reqLists, setReqLists] = t(useState(requisitionLists), "reqLists");
  const [modalProps, setModalProps] = t(useState({
    isOpen: false,
    isLoading: false
  }), "modalProps");
  const [reqList, setReqList] = t(useState(), "reqList");
  const onRemoveBtnClick = (requisitionList, modalProps2) => {
    setReqList(requisitionList);
    if (requisitionList == null ? void 0 : requisitionList.uid) {
      setModalProps({
        ...modalProps2,
        isOpen: true
      });
    }
  };
  const handleModalOnClose = useCallback(() => {
    setModalProps({
      ...modalProps,
      isOpen: false,
      isLoading: false
    });
    setReqList(null);
  }, [modalProps, setReqList, setModalProps]);
  const performRemoveAction = useCallback(async () => {
    if (reqList == null ? void 0 : reqList.uid) {
      setModalProps({
        ...modalProps,
        isLoading: true
      });
      const result = await deleteRequisitionList(reqList == null ? void 0 : reqList.uid);
      setReqLists({
        items: result.items,
        page_info: result.page_info
      });
      handleModalOnClose();
    }
  }, [reqList, setReqLists, modalProps, handleModalOnClose]);
  const [editingId, setEditingId] = t(useState(null), "editingId");
  const [isAdding, setIsAdding] = t(useState(addReqList), "isAdding");
  const handlePageChange = async (page = ((_a) => (_a = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _a.current_page)() ?? 1) => {
    setReqLists(await getRequisitionLists(page));
  };
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
        fileName: _jsxFileName$3,
        lineNumber: 121,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 114,
      columnNumber: 9
    }, void 0), modalProps.isOpen && u(RequisitionListModal, {
      isOpen: modalProps.isOpen,
      isLoading: modalProps.isLoading,
      title: translations.confirmRemove,
      modalContent: translations.confirmRemoveContent,
      confirmBtnCaption: translations.confirmAction,
      closeBtnCaption: translations.cancelAction,
      handleModalOnClose,
      handleModalOnConfirm: performRemoveAction
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 127,
      columnNumber: 9
    }, void 0), u("div", {
      className: classes(["requisition-list-grid-wrapper__add-new", className]),
      children: isAdding ? u(Card, {
        variant: "secondary",
        children: u(RequisitionListForm, {
          mode: "create",
          onSuccess: async () => {
            await handlePageChange();
            setIsAdding(false);
          },
          onCancel: () => setIsAdding(false)
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 148,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 147,
        columnNumber: 11
      }, void 0) : u(RequisitionListActions, {
        onAddNew: () => setIsAdding(true)
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 158,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 140,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["dropin-card dropin-card--secondary requisition-list-grid-wrapper__content", className]),
      children: [u("div", {
        className: classes(["requisition-list-grid-wrapper__list-header", className]),
        children: [u("h5", {
          children: translations.name
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 175,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.itemsCount
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 176,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.lastUpdated
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 177,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.actions
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 178,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$3,
        lineNumber: 169,
        columnNumber: 9
      }, void 0), (_b = reqLists == null ? void 0 : reqLists.items) == null ? void 0 : _b.map((rl) => editingId === rl.uid ? u(Card, {
        variant: "secondary",
        className: "requisition-list-grid-wrapper__form-row",
        children: u(RequisitionListForm, {
          mode: "edit",
          requisitionListUid: rl.uid,
          defaultValues: {
            name: rl.name,
            description: rl.description
          },
          onSuccess: async () => {
            await handlePageChange();
            setEditingId(null);
          },
          onCancel: () => setEditingId(null)
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 187,
          columnNumber: 15
        }, void 0)
      }, rl.uid, false, {
        fileName: _jsxFileName$3,
        lineNumber: 182,
        columnNumber: 13
      }, void 0) : u(RequisitionListItem, {
        requisitionList: rl,
        onEdit: (uid) => setEditingId(uid),
        onRemoveBtnClick
      }, rl.uid, false, {
        fileName: _jsxFileName$3,
        lineNumber: 199,
        columnNumber: 13
      }, void 0)), u("div", {
        className: classes(["requisition-list-grid-wrapper__pagination", className]),
        children: u(Pagination, {
          totalPages: (_c = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _c.total_pages,
          currentPage: (_d = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _d.current_page,
          onChange: handlePageChange
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 213,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 207,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 163,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$3,
    lineNumber: 107,
    columnNumber: 5
  }, void 0);
};
const SvgAdd = (props) => /* @__PURE__ */ React.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React.createElement("g", { id: "Large" }, /* @__PURE__ */ React.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), /* @__PURE__ */ React.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" }))));
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListActions/RequisitionListActions.tsx";
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
      fileName: _jsxFileName$2,
      lineNumber: 51,
      columnNumber: 7
    }, void 0), u(Icon, {
      source: SvgAdd,
      size: "32"
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 57,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 39,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListModal/RequisitionListModal.tsx";
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
    children: u("div", {
      className: "requisition-list-modal",
      children: [isLoading ? u("div", {
        className: "requisition-list-modal__spinner",
        "data-testid": "progress-spinner",
        children: u(ProgressSpinner, {
          stroke: "4",
          size: "large"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 68,
          columnNumber: 13
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 64,
        columnNumber: 11
      }, void 0) : null, u("p", {
        children: modalContent
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 71,
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
          fileName: _jsxFileName$1,
          lineNumber: 74,
          columnNumber: 13
        }, void 0), handleModalOnConfirm && u(Button, {
          "data-testid": "rl-modal-confirm-button",
          type: "button",
          onClick: handleModalOnConfirm,
          disabled: isLoading,
          children: confirmBtnCaption
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 85,
          columnNumber: 13
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 72,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 62,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 51,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListGrid/RequisitionListGrid.tsx";
const RequisitionListGrid = ({
  requisitionLists,
  slots
}) => {
  const [reqLists, setReqLists] = t(useState(requisitionLists), "reqLists");
  const [isLoading, setIsLoading] = t(useState(false), "isLoading");
  const translations = useText({
    containerTitle: `RequisitionList.containerTitle`
  });
  useEffect(() => {
    if (reqLists !== null) return;
    const fetchRequisitionLists = async () => {
      setIsLoading(true);
      const result = await getRequisitionLists();
      setReqLists(result);
      setIsLoading(false);
    };
    fetchRequisitionLists();
  }, [reqLists]);
  const getHeader = useCallback(() => {
    if (slots == null ? void 0 : slots.Header) {
      return u(Slot, {
        name: "Header",
        "aria-label": translations.containerTitle,
        title: translations.containerTitle,
        slot: slots.Header
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, void 0);
    }
    return u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 7
    }, void 0);
  }, [slots, translations.containerTitle]);
  return u(RequisitionListGridWrapper, {
    header: getHeader(),
    requisitionLists: reqLists,
    isLoading
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 84,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListGrid,
  RequisitionListGrid as default
};
//# sourceMappingURL=RequisitionListGrid.js.map
