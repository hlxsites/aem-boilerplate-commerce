/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect, useCallback } from "@dropins/tools/preact-compat.js";
import { Pagination, Header } from "@dropins/tools/components.js";
import { classes, VComponent, Slot } from "@dropins/tools/lib.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import { useText } from "@dropins/tools/i18n.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListItem/RequisitionListItem.tsx";
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
        fileName: _jsxFileName$2,
        lineNumber: 25,
        columnNumber: 9
      }, void 0), u("div", {
        className: "requisition-list-item__description",
        children: requisitionList.description
      }, void 0, false, {
        fileName: _jsxFileName$2,
        lineNumber: 28,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$2,
      lineNumber: 24,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__items_count", className]),
      children: requisitionList.items_count
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 32,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", "requisition-list-item__updated_at", className]),
      children: requisitionList.updated_at
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 41,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list-item__cell", className]),
      children: "[ edit ] [ delete ]"
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 50,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 19,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListGridWrapper/RequisitionListGridWrapper.tsx";
const RequisitionListGridWrapper = ({
  className,
  requisitionLists,
  isAuthenticated,
  header,
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
        fileName: _jsxFileName$1,
        lineNumber: 73,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 66,
      columnNumber: 9
    }, void 0), u("div", {
      className: classes(["dropin-card dropin-card--secondary requisition-list-grid-wrapper__content", className]),
      children: [u("div", {
        className: classes(["requisition-list-grid-wrapper__list-header", className]),
        children: [u("h5", {
          children: translations.name
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 89,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.itemsCount
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 90,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.lastUpdated
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 91,
          columnNumber: 11
        }, void 0), u("h5", {
          children: translations.actions
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 92,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 83,
        columnNumber: 9
      }, void 0), isAuthenticated ? (_a = reqLists == null ? void 0 : reqLists.items) == null ? void 0 : _a.map((rl) => u(RequisitionListItem, {
        requisitionList: rl
      }, rl.uid, false, {
        fileName: _jsxFileName$1,
        lineNumber: 96,
        columnNumber: 13
      }, void 0)) : u("div", {
        className: "requisition-list-grid-wrapper__login-msg",
        children: translations.loginMsg
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 99,
        columnNumber: 11
      }, void 0), u("div", {
        className: classes(["requisition-list-grid-wrapper__pagination", className]),
        children: u(Pagination, {
          totalPages: (_b = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _b.total_pages,
          currentPage: (_c = reqLists == null ? void 0 : reqLists.page_info) == null ? void 0 : _c.current_page,
          onChange: handlePageChange
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 109,
          columnNumber: 11
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 103,
        columnNumber: 9
      }, void 0)]
    }, void 0, true, {
      fileName: _jsxFileName$1,
      lineNumber: 77,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 59,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListGrid/RequisitionListGrid.tsx";
const RequisitionListGrid = ({
  requisitionLists,
  isAuthenticated = false,
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
        lineNumber: 51,
        columnNumber: 9
      }, void 0);
    }
    return u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, void 0);
  }, [slots, translations.containerTitle]);
  return u(RequisitionListGridWrapper, {
    header: getHeader(),
    isAuthenticated,
    requisitionLists: reqLists,
    isLoading
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 69,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListGrid,
  RequisitionListGrid as default
};
//# sourceMappingURL=RequisitionListGrid.js.map
