/*! Copyright 2025 Adobe
All Rights Reserved. */
import { u, t } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { events } from "@dropins/tools/event-bus.js";
import { Header } from "@dropins/tools/components.js";
import { classes, VComponent, Slot } from "@dropins/tools/lib.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import { useText } from "@dropins/tools/i18n.js";
import "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionList/RequisitionList.tsx";
const RequisitionList = ({
  className,
  requisitionList,
  ...props
}) => {
  return u("div", {
    ...props,
    className: classes(["requisition-list-item", className]),
    children: [u("div", {
      children: requisitionList.name
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 37,
      columnNumber: 7
    }, void 0), u("div", {
      children: requisitionList.description
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 38,
      columnNumber: 7
    }, void 0), u("div", {
      children: requisitionList.items_count
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 39,
      columnNumber: 7
    }, void 0), u("div", {
      children: requisitionList.updated_at
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 40,
      columnNumber: 7
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName$2,
    lineNumber: 36,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionListGridWrapper/RequisitionListGridWrapper.tsx";
const RequisitionListGridWrapper = ({
  className,
  requisitionLists,
  header,
  ...props
}) => {
  return u("div", {
    ...props,
    className: classes(["requisition-list-grid-wrapper", className]),
    children: [header && u("div", {
      className: classes(["requisition-list-grid-wrapper__header", className]),
      "data-testid": "requisition-list-grid-wrapper-header",
      children: u(VComponent, {
        node: header
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 50,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 43,
      columnNumber: 9
    }, void 0), requisitionLists.map((rl) => {
      return u(RequisitionList, {
        requisitionList: rl
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 55,
        columnNumber: 16
      }, void 0);
    })]
  }, void 0, true, {
    fileName: _jsxFileName$1,
    lineNumber: 37,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListGrid/RequisitionListGrid.tsx";
const RequisitionListGrid = ({
  requisitionLists,
  slots
}) => {
  const [reqLists, setReqLists] = t(useState(requisitionLists), "reqLists");
  const translations = useText({
    containerTitle: `RequisitionList.containerTitle`
  });
  useEffect(async () => {
    events.on("authenticated", async () => {
      setReqLists(await getRequisitionLists());
    });
  });
  const getHeader = () => {
    return (slots == null ? void 0 : slots.Header) ? u(Slot, {
      name: "Header",
      "aria-label": translations.containerTitle,
      title: translations.containerTitle,
      slot: slots == null ? void 0 : slots.Header
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 53,
      columnNumber: 7
    }, void 0) : u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 60,
      columnNumber: 7
    }, void 0);
  };
  return u(RequisitionListGridWrapper, {
    header: getHeader(),
    requisitionLists: reqLists
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
