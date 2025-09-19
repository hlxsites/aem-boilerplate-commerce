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
})("/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.requisition-list-item {\n  display: block;\n}\n\n.requisition-list-item__row {\n  display: contents;\n}\n\n.requisition-list-item__cell {\n  padding: 8px 12px;\n  border-bottom: 1px solid #eee;\n  background: #fff;\n  font-size: 1rem;\n}\n\n.requisition-list-item__name {\n  display: block;\n  font-weight: bold;\n  margin-bottom: 2px;\n  font: var(--type-button-2-font);\n  font-weight: 700;\n}\n\n.requisition-list-item__description,\n.requisition-list-item__items_count,\n.requisition-list-item__updated_at,\n.requisition-list-item__actions\n{\n  font: var(--type-button-2-font);\n  font-weight: 400;\n  color: #666;\n}\n\n.requisition-list-item__actions {\n  display: flex;\n  align-items: baseline;\n  padding: 0;\n  margin-left: -8px;\n}\n\n.requisition-list-item__actions .dropin-button--tertiary:hover {\n  text-decoration: underline;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.requisition-list-grid-wrapper__content {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  row-gap: 8px;\n  width: 100%;\n}\n\n.requisition-list-grid-wrapper__list-header {\n  display: contents; /* allows header cells to align with grid columns */\n}\n\n.requisition-list-grid-wrapper__list-header h5 {\n  padding: 8px 12px;\n  border-bottom: 2px solid #ccc;\n  /*background: #f5f5f5;*/\n  font-weight: bold;\n}\n\n.requisition-list__row {\n  display: contents; /* each row's cells align with grid columns */\n}\n\n.requisition-list__cell {\n  padding: 8px 12px;\n  border-bottom: 1px solid #eee;\n}\n\n.requisition-list-grid-wrapper__login-msg {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding: 16px 0;\n  color: #666;\n  font-size: 1rem;\n  background: #fff;\n}\n\n.requisition-list-grid-wrapper__pagination {\n  display: flex;\n  justify-content: flex-end;\n  margin: 1.5rem;\n  padding-right: 1.5rem;\n  gap: 0.5rem;\n}\n\n.requisition-list-grid-wrapper__add-new {\n  margin: 1.5rem 0;\n}\n\n.requisition-list-grid-wrapper__form-row {\n  grid-column: 1 / -1;\n  width: 100%;\n}/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-actions {\n  cursor: pointer;\n  padding: var(--spacing-xsmall) var(--spacing-medium);\n  border-radius: var(--shape-border-radius-2);\n  border: var(--shape-border-width-2) solid var(--color-neutral-400);\n  background-color: var(--color-neutral-50);\n  width: 100%;\n  height: 88px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n}\n\n.requisition-list-actions--selectable {\n  max-width: 100%;\n  width: auto;\n}\n\n.requisition-list-actions__title {\n  font: var(--type-button-2-font);\n  letter-spacing: var(--type-button-2-letter-spacing);\n  appearance: none;\n  -webkit-appearance: none;\n  color: var(--color-neutral-800);\n}\n\n.requisition-list-actions svg {\n  stroke: var(--shape-icon-stroke-4);\n  color: var(--color-neutral-800);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n@supports (height: 100dvh) {\n  .requisition-list-modal .dropin-modal {\n    height: 100dvh;\n  }\n}\n\n.requisition-list-modal--overlay {\n  position: relative;\n  padding: var(--spacing-small) var(--spacing-small) var(--spacing-small)\n  var(--spacing-small);\n  width: 100%;\n  margin: auto;\n  max-width: 340px;\n}\n\n@media (min-width: 768px) {\n  .requisition-list-modal--overlay {\n    position: relative;\n    padding: var(--spacing-xbig) var(--spacing-xxbig) var(--spacing-xxbig)\n    var(--spacing-xxbig);\n    width: 100%;\n    margin: auto;\n    max-width: 721px;\n  }\n}\n\n.dropin-modal__body--medium > .dropin-modal__header-title,\n.dropin-modal__body--full > .dropin-modal__header-title,\n.requisition-list-modal .dropin-modal__content {\n  margin: 0;\n  align-items: center;\n}\n\n.requisition-list-modal .dropin-modal__header-title-content h3 {\n  font: var(--type-headline-1-font);\n  letter-spacing: var(--type-headline-1-letter-spacing);\n  margin: 0;\n  padding: 0;\n}\n\n.requisition-list-modal .requisition-list-modal__spinner {\n  position: absolute;\n  top: 0;\n  left: 0;\n  background-color: var(--color-neutral-200);\n  opacity: 0.8;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 1;\n}\n\n.requisition-list-modal p {\n  margin: var(--spacing-small) 0;\n}\n\n@media (min-width: 768px) {\n  .requisition-list-modal p {\n    color: var(--color-neutral-800);\n    font: var(--type-body-2-strong-font);\n    letter-spacing: var(--type-body-2-strong-letter-spacing);\n    margin-bottom: var(--spacing-medium);\n  }\n}\n\n.requisition-list-modal .requisition-list-modal__buttons {\n  display: flex;\n  align-items: center;\n  justify-content: right;\n  gap: 0 var(--spacing-small);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-form {\n  box-sizing: border-box;\n  background-color: var(--color-neutral-50);\n}\n\n.requisition-list-form__title {\n  color: var(--color-neutral-800);\n  font: var(--type-headline-2-strong-font);\n  letter-spacing: var(--type-headline-2-strong-letter-spacing);\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__notification {\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__form {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: var(--spacing-medium);\n}\n\n.requisition-list-form__actions {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: 0 var(--grid-2-gutters);\n}\n\n.requisition-list-form__actions\nbutton {\n  min-width: var(--spacing-xhuge);\n}", { "styleId": "RequisitionList" });
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
    loginMsg: "Please login",
    confirmRemove: "Confirm Requisition List removing",
    confirmRemoveContent: "Requisition List will be permanently deleted. This action can not be undone.",
    confirmAction: "Confirm",
    cancelAction: "Cancel"
  },
  AddNewReqList: {
    addNewReqListBtn: "Add new Requisition List"
  },
  RequisitionListItem: {
    actionRename: "Rename",
    actionRemove: "Remove"
  },
  RequisitionListForm: {
    actionCancel: "Cancel",
    actionSave: "Save",
    requiredField: "This is a required field.",
    floatingLabel: "Requisition List Name *",
    placeholder: "Requisition List Name",
    label: "Description",
    editTitle: "Rename Requisition List",
    createTitle: "Create Requisition List",
    addProductToRequisitionList: "Add Product to Requisition List:"
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
