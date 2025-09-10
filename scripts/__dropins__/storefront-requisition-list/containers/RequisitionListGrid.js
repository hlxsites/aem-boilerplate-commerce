/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { useState, useEffect, useCallback } from "@dropins/tools/preact-compat.js";
import { Card, Pagination, Icon, Header } from "@dropins/tools/components.js";
import { classes, VComponent, Slot } from "@dropins/tools/lib.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import { useText } from "@dropins/tools/i18n.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName$3 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListItem/RequisitionListItem.tsx";
const RequisitionListItem = ({
  className,
  requisitionList,
  ...props
}) => {
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
        fileName: _jsxFileName$3,
        lineNumber: 25,
        columnNumber: 9
      }, void 0), u("div", {
        className: "requisition-list-item__description",
        children: requisitionList.description
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 28,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$3,
      lineNumber: 24,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__items_count", className]),
      children: requisitionList.items_count
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 32,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__updated_at", className]),
      children: requisitionList.updated_at
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 41,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", className]),
      children: "[ edit ] [ delete ]"
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 50,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$3,
    lineNumber: 19,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListGridWrapper/RequisitionListGridWrapper.tsx";
const RequisitionListGridWrapper = ({
  className,
  requisitionLists,
  header,
  addReqList = false,
  ...props
}) => {
  var _a, _b, _c;
  const translations = useText({
    name: `RequisitionList.RequisitionListWrapper.name`,
    itemsCount: `RequisitionList.RequisitionListWrapper.itemsCount`,
    lastUpdated: `RequisitionList.RequisitionListWrapper.lastUpdated`,
    actions: `RequisitionList.RequisitionListWrapper.actions`,
    loginMsg: `RequisitionList.RequisitionListWrapper.loginMsg`
  });
  const [reqLists, setReqLists] = t(useState(requisitionLists), "reqLists");
  const handlePageChange = async (page) => {
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
        fileName: _jsxFileName$2,
        lineNumber: 76,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 69,
      columnNumber: 9
    }, void 0), u("div", {
      className: classes(["requisition-list-grid-wrapper__add-new", className]),
      children: addReqList ? u(Card, {
        variant: "secondary",
        children: "Add New Requisition List Form goes here..."
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 87,
        columnNumber: 11
      }, void 0) : u(RequisitionListActions, {
        addReqList
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 91,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 80,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["dropin-card dropin-card--secondary requisition-list-grid-wrapper__content", className]),
      children: [u("div", {
        className: classes(["requisition-list-grid-wrapper__list-header", className]),
        children: [u("h5", {
          children: translations.name
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 107,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.itemsCount
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 108,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.lastUpdated
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 109,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.actions
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 110,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$2,
        lineNumber: 101,
        columnNumber: 9
      }, void 0), (_a = reqLists == null ? void 0 : reqLists.items) == null ? void 0 : _a.map((rl) => u(RequisitionListItem, {
        requisitionList: rl
      }, rl.uid, false, {
        fileName: _jsxFileName$2,
        lineNumber: 113,
        columnNumber: 11
      }, void 0)), u("div", {
        className: classes(["requisition-list-grid-wrapper__pagination", className]),
        children: u(Pagination, {
          totalPages: (_b = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _b.total_pages,
          currentPage: (_c = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _c.current_page,
          onChange: handlePageChange
        }, void 0, false, {
          fileName: _jsxFileName$2,
          lineNumber: 121,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 115,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 95,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 62,
    columnNumber: 5
  }, void 0);
};
const SvgAdd = (props) => /* @__PURE__ */ React.createElement("svg", { id: "Icon_Add_Base", "data-name": "Icon \\u2013 Add \\u2013 Base", xmlns: "http://www.w3.org/2000/svg", width: 24, height: 24, viewBox: "0 0 24 24", ...props }, /* @__PURE__ */ React.createElement("g", { id: "Large" }, /* @__PURE__ */ React.createElement("rect", { id: "Placement_area", "data-name": "Placement area", width: 24, height: 24, fill: "#fff", opacity: 0 }), /* @__PURE__ */ React.createElement("g", { id: "Add_icon", "data-name": "Add icon", transform: "translate(9.734 9.737)" }, /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_579", "data-name": "Line 579", y2: 12.7, transform: "translate(2.216 -4.087)", fill: "none", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("line", { vectorEffect: "non-scaling-stroke", id: "Line_580", "data-name": "Line 580", x2: 12.7, transform: "translate(-4.079 2.263)", fill: "none", stroke: "currentColor" }))));
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListActions/RequisitionListActions.tsx";
const RequisitionListActions = ({
  selectable,
  className
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
    children: [u("span", {
      className: "requisition-list-actions__title",
      "data-testid": "requisition-list-actions-button-text",
      children: translations.addNewReqListBtn
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 50,
      columnNumber: 7
    }, void 0), u(Icon, {
      source: SvgAdd,
      size: "32"
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 56,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 38,
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
    if (reqLists !== void 0) return;
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
        lineNumber: 49,
        columnNumber: 9
      }, void 0);
    }
    return u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 58,
      columnNumber: 7
    }, void 0);
  }, [slots, translations.containerTitle]);
  return u(RequisitionListGridWrapper, {
    header: getHeader(),
    requisitionLists: reqLists,
    isLoading
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 67,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListGrid,
  RequisitionListGrid as default
};
//# sourceMappingURL=RequisitionListGrid.js.map
