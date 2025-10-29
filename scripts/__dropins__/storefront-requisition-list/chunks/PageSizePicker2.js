/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t } from "./jsxRuntime.module.js";
import { useState, useMemo, useCallback } from "@dropins/tools/preact-compat.js";
import { useText } from "@dropins/tools/i18n.js";
function useRequisitionListAlert(translationsOverride) {
  const [alert, setAlert] = t(useState(null), "alert");
  const defaultTranslations = useText({
    errorCreate: `RequisitionList.RequisitionListAlert.errorCreate`,
    successCreate: `RequisitionList.RequisitionListAlert.successCreate`,
    errorDeleteItem: `RequisitionList.RequisitionListAlert.errorDeleteItem`,
    successDeleteItem: `RequisitionList.RequisitionListAlert.successDeleteItem`,
    errorDeleteReqList: `RequisitionList.RequisitionListAlert.errorDeleteReqList`,
    successDeleteReqList: `RequisitionList.RequisitionListAlert.successDeleteReqList`,
    errorAddToCart: `RequisitionList.RequisitionListAlert.errorAddToCart`,
    successAddToCart: `RequisitionList.RequisitionListAlert.successAddToCart`,
    errorUpdateQuantity: `RequisitionList.RequisitionListAlert.errorUpdateQuantity`,
    successUpdateQuantity: `RequisitionList.RequisitionListAlert.successUpdateQuantity`,
    errorUpdate: `RequisitionList.RequisitionListAlert.errorUpdate`,
    successUpdate: `RequisitionList.RequisitionListAlert.successUpdate`,
    errorMove: `RequisitionList.RequisitionListAlert.errorMove`,
    successMove: `RequisitionList.RequisitionListAlert.successMove`,
    errorAddToRequisitionList: `RequisitionList.RequisitionListAlert.errorAddToRequisitionList`,
    successAddToRequisitionList: `RequisitionList.RequisitionListAlert.successAddToRequisitionList`
  });
  const translations = t(useMemo(() => ({
    ...defaultTranslations,
    ...translationsOverride
  }), [defaultTranslations, translationsOverride]), "translations");
  const messages = t(useMemo(() => ({
    create: {
      // adding context for consistency, although 'create' action only applies to requisition lists
      requisitionList: {
        success: translations.successCreate,
        error: translations.errorCreate
      }
    },
    add: {
      product: {
        success: translations.successAddToRequisitionList,
        error: translations.errorAddToRequisitionList
      }
    },
    update: {
      product: {
        success: translations.successUpdateQuantity,
        error: translations.errorUpdateQuantity
      },
      requisitionList: {
        success: translations.successUpdate,
        error: translations.errorUpdate
      }
    },
    delete: {
      product: {
        success: translations.successDeleteItem,
        error: translations.errorDeleteItem
      },
      requisitionList: {
        success: translations.successDeleteReqList,
        error: translations.errorDeleteReqList
      }
    },
    move: {
      // adding context for consistency, although 'move' action only applies to products
      product: {
        success: translations.successMove,
        error: translations.errorMove
      }
    }
  }), [translations]), "messages");
  const handleRequisitionListAlert = useCallback((payload) => {
    const {
      type,
      action,
      context,
      skus
    } = payload;
    setAlert({
      type,
      description: messages[action][context][type],
      sku: skus == null ? void 0 : skus[0]
    });
    const timer = setTimeout(() => {
      setAlert(null);
    }, 5e3);
    return () => clearTimeout(timer);
  }, [messages]);
  return {
    alert,
    setAlert,
    handleRequisitionListAlert
  };
}
export {
  useRequisitionListAlert as u
};
//# sourceMappingURL=PageSizePicker2.js.map
