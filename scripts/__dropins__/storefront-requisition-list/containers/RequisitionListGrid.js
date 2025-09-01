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
const _state = /* @__PURE__ */ (() => {
  return {
    authenticated: false
  };
})();
const state = new Proxy(_state, {
  set(target, key, value) {
    target[key] = value;
    return Reflect.set(target, key, value);
  },
  get(target, key) {
    return target[key];
  }
});
var _jsxFileName$2 = "/Users/rafaljanicki/www/storefront-requisition-list/src/components/RequisitionList/RequisitionList.tsx";
const RequisitionList = ({
  className,
  requisitionList,
  ...props
}) => {
  return u("div", {
    ...props,
    "data-testid": "requisition-list-row",
    className: classes(["dropin-card__content requisition-list__row", className]),
    children: [u("div", {
      className: classes(["requisition-list__cell", className]),
      children: requisitionList.name
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 44,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list__cell", className]),
      children: requisitionList.description
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 47,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list__cell", className]),
      children: requisitionList.items_count
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 50,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list__cell", className]),
      children: requisitionList.updated_at
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 53,
      columnNumber: 7
    }, void 0), u("div", {
      className: classes(["requisition-list__cell", className]),
      children: "[ edit ] [ delete ]"
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 56,
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
  isAuthenticated,
  header,
  ...props
}) => {
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
        lineNumber: 52,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName$1,
      lineNumber: 45,
      columnNumber: 9
    }, void 0), u("div", {
      className: classes(["dropin-card dropin-card--secondary requisition-list-grid-wrapper__content", className]),
      children: [u("div", {
        ...props,
        className: classes(["requisition-list-grid-wrapper__list-header", className]),
        children: [u("h5", {
          children: "Name"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 69,
          columnNumber: 11
        }, void 0), u("h5", {
          children: "Description"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 70,
          columnNumber: 11
        }, void 0), u("h5", {
          children: "Items count"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 71,
          columnNumber: 11
        }, void 0), u("h5", {
          children: "Updated"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 72,
          columnNumber: 11
        }, void 0), u("h5", {
          children: "Actions"
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 73,
          columnNumber: 11
        }, void 0)]
      }, void 0, true, {
        fileName: _jsxFileName$1,
        lineNumber: 62,
        columnNumber: 9
      }, void 0), isAuthenticated && requisitionLists.map((rl) => {
        return u(RequisitionList, {
          requisitionList: rl
        }, void 0, false, {
          fileName: _jsxFileName$1,
          lineNumber: 77,
          columnNumber: 20
        }, void 0);
      }), !isAuthenticated && u("div", {
        children: "Please login"
      }, void 0, false, {
        fileName: _jsxFileName$1,
        lineNumber: 79,
        columnNumber: 30
      }, void 0)]
    }, void 0, true, {
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
  isAuthenticated = false,
  slots
}) => {
  const [reqLists, setReqLists] = t(useState(requisitionLists), "reqLists");
  const [isLoggedIn, setIsLoggedIn] = t(useState(isAuthenticated ?? state.authenticated), "isLoggedIn");
  const translations = useText({
    containerTitle: `RequisitionList.containerTitle`
  });
  useEffect(async () => {
    events.on("authenticated", async (authenticated) => {
      setIsLoggedIn(authenticated);
      setReqLists(await getRequisitionLists());
    }, {
      eager: true
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
      lineNumber: 64,
      columnNumber: 7
    }, void 0) : u(Header, {
      "aria-label": translations.containerTitle,
      role: "region",
      title: translations.containerTitle
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 71,
      columnNumber: 7
    }, void 0);
  };
  return u(RequisitionListGridWrapper, {
    header: getHeader(),
    isAuthenticated: isLoggedIn,
    requisitionLists: reqLists
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 80,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListGrid,
  RequisitionListGrid as default
};
//# sourceMappingURL=RequisitionListGrid.js.map
