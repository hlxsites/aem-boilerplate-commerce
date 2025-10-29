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
})("/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-form {\n  background-color: var(--color-neutral-50);\n  box-sizing: border-box;\n}\n\n.requisition-list-form__title {\n  color: var(--color-neutral-800);\n  font: var(--type-headline-2-strong-font);\n  letter-spacing: var(--type-headline-2-strong-letter-spacing);\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__notification {\n  margin-bottom: var(--spacing-medium);\n}\n\n.requisition-list-form__form {\n  display: grid;\n  gap: var(--spacing-medium);\n  grid-template-columns: 1fr;\n}\n\n.requisition-list-form__actions {\n  align-items: center;\n  display: flex;\n  gap: 0 var(--grid-2-gutters);\n  justify-content: flex-end;\n}\n\n.requisition-list-form_progress-spinner {\n  float: right;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-names {\n  position: relative;\n}\n\n.requisition-list-names .requisition-list-names__picker {\n  position: absolute;\n  width: 100%;\n}\n\n.requisition-list-names .requisition-list-names__picker select {\n  border: none;\n}\n\n.requisition-list-names .requisition-list-names__alert {\n  background: var(--color-neutral-50);\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 3;\n}\n\n.requisition-list-names .dropin-card {\n  top: 0;\n  position: absolute;\n  width: 100%;\n  z-index: 2;\n}\n\n.requisition-list-names.requisition-list-names--modal-hover .requisition-list-names__alert {\n  right: -17px;\n  top: -225px;\n}\n\n.requisition-list-names.requisition-list-names--modal-hover .dropin-card {\n  bottom: 0;\n  top: auto;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-grid-wrapper__content {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  row-gap: var(--spacing-xsmall);\n  width: 100%;\n}\n\n.requisition-list-grid-wrapper__list-header {\n  display: contents;\n}\n\n.requisition-list-grid-wrapper__pagination {\n  grid-column: 1 / -1;\n  margin: var(--spacing-medium);\n}\n\n.requisition-list-grid-wrapper__pagination-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-medium);\n  justify-content: center;\n  min-height: 40px; /* Ensure consistent height even when pagination is hidden */\n}\n\n.requisition-list-grid-wrapper__add-new {\n  margin: var(--spacing-medium) 0;\n}\n\n.requisition-list-grid-wrapper__name__title {\n  display: block;\n  font: var(--type-body-1-emphasized-font);\n  margin-bottom: 2px;\n}\n\n.requisition-list-grid-wrapper__name__description {\n  font: var(--type-details-caption-2-font);\n}\n\n.requisition-list-grid-wrapper__actions {\n  display: flex;\n  gap: var(--spacing-medium);\n}\n\n.requisition-list-grid-wrapper__actions .dropin-button--tertiary {\n  padding: 0;\n}\n\n.requisition-list-grid-wrapper__actions .dropin-button--tertiary:hover {\n  text-decoration: underline;\n}\n\n.requisition-list-empty-list {\n  margin-bottom: var(--spacing-small);\n  text-align: center;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.requisition-list-actions {\n  align-items: center;\n  background-color: var(--color-neutral-50);\n  border: var(--shape-border-width-2) solid var(--color-neutral-400);\n  border-radius: var(--shape-border-radius-2);\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  padding: var(--spacing-medium);\n  width: 100%;\n}\n\n.requisition-list-actions--selectable {\n  max-width: 100%;\n  width: auto;\n}\n\n.requisition-list-actions__title {\n  font: var(--type-button-2-font);\n  letter-spacing: var(--type-button-2-letter-spacing);\n  appearance: none;\n  -webkit-appearance: none;\n  color: var(--color-neutral-800);\n}\n\n.requisition-list-actions svg {\n  color: var(--color-neutral-800);\n  stroke: var(--shape-icon-stroke-4);\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n@supports (height: 100dvh) {\n  .requisition-list-modal .dropin-modal {\n    height: 100dvh;\n  }\n}\n\n.dropin-modal__body--medium > .dropin-modal__header-title,\n.dropin-modal__body--full > .dropin-modal__header-title,\n.requisition-list-modal .dropin-modal__content {\n  align-items: center;\n  margin: 0;\n}\n\n.requisition-list-modal .dropin-modal__header-title-content h3 {\n  font: var(--type-headline-1-font);\n  letter-spacing: var(--type-headline-1-letter-spacing);\n  margin: 0;\n  padding: 0;\n}\n\n.requisition-list-modal .requisition-list-modal__spinner {\n  align-items: center;\n  background-color: var(--color-neutral-200);\n  display: flex;\n  height: 100%;\n  left: 0;\n  justify-content: center;\n  opacity: var(--color-opacity-24);\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: 1;\n}\n\n.requisition-list-modal p {\n  margin: var(--spacing-small) 0;\n}\n\n.requisition-list-modal .requisition-list-modal__buttons {\n  align-items: center;\n  display: flex;\n  gap: 0 var(--spacing-small);\n  justify-content: right;\n}\n\n.requisition-list-modal--overlay {\n  margin: auto;\n  max-width: 375px; /* popular breakpoint for mobile media queries */\n  padding: var(--spacing-small);\n  position: relative;\n  width: 100%;\n}\n\n@media (min-width: 768px) {\n  .requisition-list-modal--overlay {\n    margin: auto;\n    max-width: 768px; /* popular breakpoint for tablets */\n    padding: var(--spacing-xxbig);\n    position: relative;\n    width: 100%;\n  }\n\n  .requisition-list-modal p {\n    color: var(--color-neutral-800);\n    font: var(--type-body-2-strong-font);\n    letter-spacing: var(--type-body-2-strong-letter-spacing);\n    margin-bottom: var(--spacing-medium);\n  }\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n.empty-list {\n  text-align: center;\n  margin: auto 0;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n/* Container */\n.requisition-list-view-product-list-table-container {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-small);\n}\n\n/* Checkbox */\n.requisition-list-view-product-list-table__checkbox {\n  align-self: center;\n  justify-self: center;\n}\n\n/* Product name */\n.requisition-list-view-product-list-table__product-name {\n  font: var(--type-body-1-font);\n  letter-spacing: var(--type-body-1-letter-spacing);\n}\n\n/* SKU */\n.requisition-list-view-product-list-table__sku {\n  font: var(--type-details-caption-1-font);\n  letter-spacing: var(--type-details-caption-1-letter-spacing);\n}\n\n/* Quantity */\n.requisition-list-view-product-list-table__quantity {\n  font: var(--type-body-1-font);\n  letter-spacing: var(--type-body-1-letter-spacing);\n  display: block;\n  justify-self: center;\n}\n\n/* Discount */\n.requisition-list-view-product-list-table__discount-container {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: var(--spacing-xxsmall);\n  align-items: baseline;\n}\n\n/* Submit container */\n.requisition-list-view-product-list-table-container__submit-container {\n  display: flex;\n  justify-content: flex-end;\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n/*TODO: Temporary values until final component is integrated*/\n.requisition-list-view__bulk-actions {\n  margin-bottom: var(--spacing-xsmall);\n  display: flex;\n  gap: var(--spacing-xsmall);\n  align-items: center;\n}\n\n.requisition-list-view__item {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xsmall);\n  margin-bottom: var(--spacing-xxsmall);\n}\n\n.requisition-list-view__item input[type='number'] {\n  width: var(--spacing-large);\n  margin-right: var(--spacing-xxsmall);\n}\n\n.requisition-list-view__pagination {\n  margin-top: var(--spacing-medium);\n  display: flex;\n  justify-content: center;\n}\n\n.requisition-list-view__pagination-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-medium);\n  min-height: 40px; /* Ensure consistent height even when pagination is hidden */\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n.page-size-picker {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xsmall);\n}\n\n.page-size-picker__label {\n  font-size: var(--font-size-small);\n  color: var(--color-text-secondary);\n  white-space: nowrap;\n}\n\n.page-size-picker__select {\n  min-width: 60px;\n}", { "styleId": "RequisitionList" });
import { Render } from "@dropins/tools/lib.js";
import { t, u } from "./chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-hooks.js";
import { UIProvider } from "@dropins/tools/components.js";
import { events } from "@dropins/tools/event-bus.js";
import "@dropins/tools/preact.js";
const RequisitionList = {
  containerTitle: "Requisition Lists",
  RequisitionListWrapper: {
    name: "Name & Description",
    itemsCount: "Items",
    lastUpdated: "Latest activity",
    actions: "Actions",
    loginMsg: "Please login",
    deleteRequisitionListTitle: "Are you sure you want to delete this Requisition List?",
    deleteRequisitionListMessage: "Requisition List will be permanently deleted. This action can not be undone.",
    confirmAction: "Confirm",
    cancelAction: "Cancel",
    emptyList: "No Requisition Lists found"
  },
  AddNewReqList: {
    addNewReqListBtn: "Add new Requisition List"
  },
  RequisitionListItem: {
    actionUpdate: "Update",
    actionDelete: "Delete"
  },
  RequisitionListForm: {
    actionCancel: "Cancel",
    actionSave: "Save",
    requiredField: "This is a required field.",
    floatingLabel: "Requisition List Name *",
    placeholder: "Requisition List Name",
    label: "Description",
    updateTitle: "Update Requisition List",
    createTitle: "Create Requisition List",
    addToRequisitionList: "Add to Requisition List:"
  },
  RequisitionListAlert: {
    errorCreate: "Error creating requisition list",
    successCreate: "Requisition list created successfully.",
    errorAddToCart: "Error adding item to cart",
    successAddToCart: "Item(s) added to cart successfully.",
    errorUpdateQuantity: "Error updating quantity",
    successUpdateQuantity: "Item quantity updated successfully.",
    errorUpdate: "Error updating requisition list",
    successUpdate: "Requisition list updated successfully.",
    errorDeleteItem: "Error deleting item",
    successDeleteItem: "Item(s) deleted successfully.",
    errorDeleteReqList: "Error deleting requisition list",
    successDeleteReqList: "Requisition list deleted successfully.",
    errorMove: "Error moving item(s) to cart",
    successMove: "Item(s) successfully moved to cart.",
    errorAddToRequisitionList: "Error adding item(s) to requisition list",
    successAddToRequisitionList: "Item(s) successfully added to requisition list."
  },
  RequisitionListView: {
    actionDelete: "Delete",
    statusDeleting: "Deleting...",
    actionDeleteSelected: "Delete Selected",
    actionSelectAll: "Select All",
    actionSelectNone: "Select None",
    actionAddToCart: "Add to Cart",
    statusAddingToCart: "Adding...",
    actionAddSelectedToCart: "Add Selected to Cart",
    statusBulkAddingToCart: "Adding to Cart...",
    actionUpdateQuantity: "Update",
    statusUpdatingQuantity: "Updating...",
    errorUpdateQuantity: "Error updating quantity",
    successUpdateQuantity: "Item quantity updated successfully.",
    actionBackToRequisitionListsOverview: "Back to requisition lists overview",
    emptyRequisitionList: " Requisition List is empty",
    productListTable: {
      headers: {
        productName: "Product name",
        sku: "SKU",
        price: "Price",
        quantity: "Quantity",
        subtotal: "Subtotal",
        actions: "Actions"
      },
      itemQuantity: "Item quantity"
    },
    errorLoadPage: "Failed to load page"
  },
  PageSizePicker: {
    itemsPerPage: "Items per page"
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
