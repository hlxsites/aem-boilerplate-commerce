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
})("/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-item {\n  display: block;\n}\n\n.requisition-list-item__row {\n  display: contents;\n}\n\n.requisition-list-item__cell {\n  background: var(--color-neutral-50);\n  border-bottom: var(--shape-border-width-1) solid var(--color-neutral-300);\n  padding: var(--spacing-xsmall) var(--spacing-small);\n  font-size: 1rem;\n}\n\n.requisition-list-item__name {\n  display: block;\n  font: var(--type-body-1-emphasized-font);\n  margin-bottom: 2px;\n}\n\n.requisition-list-item__description {\n  font: var(--type-details-caption-2-font);\n}\n\n.requisition-list-item__items_count,\n.requisition-list-item__updated_at,\n.requisition-list-item__actions {\n  color: var(--color-neutral-700);\n  font: var(--type-button-2-font);\n}\n\n.requisition-list-item__actions {\n  align-items: baseline;\n  display: flex;\n  margin: 0;\n  padding: 0;\n}\n\n.requisition-list-item__actions .dropin-button--tertiary:hover {\n  text-decoration: underline;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-grid-wrapper__content {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  row-gap: var(--spacing-xsmall);\n  width: 100%;\n}\n\n.requisition-list-grid-wrapper__list-header {\n  display: contents;\n}\n\n.requisition-list-grid-wrapper__list-header h5 {\n  border-bottom: var(--shape-border-width-3) solid var(--color-neutral-400);\n  font-weight: bold;\n  padding: var(--spacing-xsmall) var(--spacing-small);\n}\n\n.requisition-list__row {\n  display: contents;\n}\n\n.requisition-list__cell {\n  border-bottom: var(--shape-border-width-1) solid var(--color-neutral-300);\n  padding: var(--spacing-xsmall) var(--spacing-small);\n}\n\n.requisition-list-grid-wrapper__pagination {\n  grid-column: 1 / -1;\n  margin: var(--spacing-medium);\n}\n\n.requisition-list-grid-wrapper__add-new {\n  margin: var(--spacing-medium) 0;\n}\n\n.requisition-list-grid-wrapper__form-row {\n  grid-column: 1 / -1;\n  margin: var(--spacing-small);\n}\n\n.requisition-list-empty-list {\n  margin-bottom: var(--spacing-small);\n  text-align: center;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-actions {\n  align-items: center;\n  background-color: var(--color-neutral-50);\n  border: var(--shape-border-width-2) solid var(--color-neutral-400);\n  border-radius: var(--shape-border-radius-2);\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  padding: var(--spacing-medium);\n  width: 100%;\n}\n\n.requisition-list-actions--selectable {\n  max-width: 100%;\n  width: auto;\n}\n\n.requisition-list-actions__title {\n  font: var(--type-button-2-font);\n  letter-spacing: var(--type-button-2-letter-spacing);\n  appearance: none;\n  -webkit-appearance: none;\n  color: var(--color-neutral-800);\n}\n\n.requisition-list-actions svg {\n  color: var(--color-neutral-800);\n  stroke: var(--shape-icon-stroke-4);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n@supports (height: 100dvh) {\n  .requisition-list-modal .dropin-modal {\n    height: 100dvh;\n  }\n}\n\n.dropin-modal__body--medium > .dropin-modal__header-title,\n.dropin-modal__body--full > .dropin-modal__header-title,\n.requisition-list-modal .dropin-modal__content {\n  align-items: center;\n  margin: 0;\n}\n\n.requisition-list-modal .dropin-modal__header-title-content h3 {\n  font: var(--type-headline-1-font);\n  letter-spacing: var(--type-headline-1-letter-spacing);\n  margin: 0;\n  padding: 0;\n}\n\n.requisition-list-modal .requisition-list-modal__spinner {\n  align-items: center;\n  background-color: var(--color-neutral-200);\n  display: flex;\n  height: 100%;\n  left: 0;\n  justify-content: center;\n  opacity: var(--color-opacity-24);\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n}\n\n.requisition-list-modal p {\n  margin: var(--spacing-small) 0;\n}\n\n.requisition-list-modal .requisition-list-modal__buttons {\n  align-items: center;\n  display: flex;\n  gap: 0 var(--spacing-small);\n  justify-content: right;\n}\n\n.requisition-list-modal--overlay {\n  margin: auto;\n  max-width: 375px; /* popular breakpoint for mobile media queries */\n  padding: var(--spacing-small);\n  position: relative;\n  width: 100%;\n}\n\n@media (min-width: 768px) {\n  .requisition-list-modal--overlay {\n    margin: auto;\n    max-width: 768px; /* popular breakpoint for tablets */\n    padding: var(--spacing-xxbig);\n    position: relative;\n    width: 100%;\n  }\n\n  .requisition-list-modal p {\n    color: var(--color-neutral-800);\n    font: var(--type-body-2-strong-font);\n    letter-spacing: var(--type-body-2-strong-letter-spacing);\n    margin-bottom: var(--spacing-medium);\n  }\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.empty-list {\n  text-align: center;\n  margin: auto 0;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-names {\n  position: relative;\n}\n\n.requisition-list-names .requisition-list-names__picker {\n  position: absolute;\n  width: 100%;\n}\n\n.requisition-list-names .requisition-list-names__picker select {\n  border: none;\n}\n\n.requisition-list-names .dropin-card {\n  position: relative;\n  top: var(--spacing-xbig);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-form {\n  background-color: var(--color-neutral-50);\n  box-sizing: border-box;\n}\n\n.requisition-list-form__title {\n  color: var(--color-neutral-800);\n  font: var(--type-headline-2-strong-font);\n  letter-spacing: var(--type-headline-2-strong-letter-spacing);\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__notification {\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__form {\n  display: grid;\n  gap: var(--spacing-medium);\n  grid-template-columns: 1fr;\n}\n\n.requisition-list-form__actions {\n  align-items: center;\n  display: flex;\n  gap: 0 var(--grid-2-gutters);\n  justify-content: flex-end;\n}\n\n.requisition-list-form_progress-spinner {\n  float: right;\n}", { "styleId": "RequisitionList" });
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
    cancelAction: "Cancel",
    emptyList: "No Requisition Lists found"
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
    addToRequisitionList: "Add to Requisition List:"
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
