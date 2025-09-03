/*! Copyright 2025 Adobe
All Rights Reserved. */
(function injectCodeCustomRunTimeFunction(cssCode, options) {
  try {
    if (typeof document != "undefined") {
      const elem = document.createElement("style");
      const name = options.styleId;
      for (const attribute in options.attributes) {
        elem.setAttribute(attribute, options.attributes[attribute]);
      }
      elem.setAttribute("data-dropin", name);
      elem.appendChild(document.createTextNode(cssCode));
      const sdk = document.querySelector('style[data-dropin="sdk"]');
      if (sdk) {
        sdk.after(elem);
      } else {
        const base = document.querySelector(
          'link[rel="stylesheet"], style'
        );
        if (base) {
          base.before(elem);
        } else {
          document.head.append(elem);
        }
      }
    }
  } catch (e) {
    console.error("dropin-styles (injectCodeFunction)", e);
  }
})("/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.requisition-list-item {\n  display: block;\n}\n\n.requisition-list-item__row {\n  display: contents;\n}\n\n.requisition-list-item__cell {\n  padding: 8px 12px;\n  border-bottom: 1px solid #eee;\n  background: #fff;\n  font-size: 1rem;\n}\n\n.requisition-list-item__name {\n  display: block;\n  font-weight: bold;\n  margin-bottom: 2px;\n  font: var(--type-button-2-font);\n  font-weight: 700;\n}\n\n.requisition-list-item__description,\n.requisition-list-item__items_count,\n.requisition-list-item__updated_at\n{\n  font: var(--type-button-2-font);\n  font-weight: 400;\n  color: #666;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.requisition-list-grid-wrapper__content {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  row-gap: 8px;\n  width: 100%;\n}\n\n.requisition-list-grid-wrapper__list-header {\n  display: contents; /* allows header cells to align with grid columns */\n}\n\n.requisition-list-grid-wrapper__list-header h5 {\n  padding: 8px 12px;\n  border-bottom: 2px solid #ccc;\n  /*background: #f5f5f5;*/\n  font-weight: bold;\n}\n\n.requisition-list__row {\n  display: contents; /* each row's cells align with grid columns */\n}\n\n.requisition-list__cell {\n  padding: 8px 12px;\n  border-bottom: 1px solid #eee;\n}\n\n.requisition-list-grid-wrapper__login-msg {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding: 16px 0;\n  color: #666;\n  font-size: 1rem;\n  background: #fff;\n}\n\n.requisition-list-grid-wrapper__pagination {\n  display: flex;\n  justify-content: flex-end;\n  margin: 1.5rem;\n  padding-right: 1.5rem;\n  gap: 0.5rem;\n}", { "styleId": "RequisitionList" });
import { Render } from "@dropins/tools/lib.js";
import { t, u } from "./chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-hooks.js";
import { UIProvider } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import "@dropins/tools/preact.js";
const RequisitionList = {
  containerTitle: "Requisition Lists",
  RequisitionListWrapper: {
    name: "Name",
    itemsCount: "Items count",
    lastUpdated: "Last updated",
    actions: "Actions",
    loginMsg: "Please login"
  }
};
const en_US = {
  RequisitionList
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-requisition-list/src/render/Provider.tsx";
const langDefinitions = {
  default: en_US
};
const Provider = ({
  children
}) => {
  const [lang, setLang] = t(useState("en_US"), "lang");
  useEffect(() => {
    const localeEvent = events.on("locale", (locale) => {
      setLang(locale);
    }, {
      eager: true
    });
    return () => {
      localeEvent == null ? void 0 : localeEvent.off();
    };
  }, []);
  return u(UIProvider, {
    lang,
    langDefinitions,
    children
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 38,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/render/render.tsx";
const render = new Render(u(Provider, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 4,
  columnNumber: 34
}, void 0));
export {
  render
};
//# sourceMappingURL=render.js.map
