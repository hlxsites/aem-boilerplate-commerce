/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import * as React from "@dropins/tools/preact-compat.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { InLineAlert, Picker, Icon, Card } from "@dropins/tools/components.js";
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "../chunks/transform-requisition-list.js";
import { events } from "@dropins/tools/event-bus.js";
import { R as REQUISITION_LIST_ITEMS_FRAGMENT } from "../chunks/RequisitionListItemsFragment.graphql.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import { R as RequisitionListForm } from "../chunks/RequisitionListForm.js";
import "@dropins/tools/lib.js";
import "@dropins/tools/preact-hooks.js";
/* empty css                             */
import { u as useRequisitionListAlert } from "../chunks/PageSizePicker2.js";
import "@dropins/tools/preact.js";
import { useText } from "@dropins/tools/i18n.js";
import "@dropins/tools/fetch-graphql.js";
const ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION = `
  mutation ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [RequisitionListItemsInput!]!
    ) {
    addProductsToRequisitionList(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${REQUISITION_LIST_ITEMS_FRAGMENT}
${REQUISITION_LIST_FRAGMENT}
`;
const addProductsToRequisitionList = async (requisitionListUid, requisitionListItems) => {
  const {
    errors,
    data
  } = await fetchGraphQl(ADD_PRODUCTS_TO_REQUISITION_LIST_MUTATION, {
    variables: {
      requisitionListUid,
      requisitionListItems
    }
  });
  if (errors) return handleFetchError(errors);
  const payload = transformRequisitionList(data.addProductsToRequisitionList.requisition_list);
  events.emit("requisitionList/data", payload);
  return payload;
};
const SvgBurger = (props) => /* @__PURE__ */ React.createElement("svg", { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M3 12H21", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M3 6H21", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("path", { vectorEffect: "non-scaling-stroke", d: "M3 18H21", stroke: "currentColor" }));
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListNames/RequisitionListNames.tsx";
const RequisitionListNames = ({
  items = [],
  canCreate = true,
  sku,
  selectedOptions,
  quantity = 1,
  variant = "neutral",
  beforeAddProdToReqList,
  ...props
}) => {
  const [reqLists, setReqLists] = t(useState(items), "reqLists");
  const [isAdding, setIsAdding] = t(useState(false), "isAdding");
  const translations = useText({
    createTitle: `RequisitionList.RequisitionListForm.createTitle`,
    addToReqList: `RequisitionList.RequisitionListForm.addToRequisitionList`
  });
  useEffect(() => {
    if (!items || items.length === 0) {
      getRequisitionLists().then((res) => {
        setReqLists((res == null ? void 0 : res.items) || []);
      }).catch((error) => {
        console.error("Error fetching requisition lists:", error);
        setReqLists([]);
      });
    }
  }, [items]);
  const reqListOptions = [...(reqLists == null ? void 0 : reqLists.map((reqList) => ({
    value: reqList.uid,
    text: reqList.name
  }))) ?? [], ...canCreate ? [{
    value: "__create__",
    text: translations.createTitle
  }] : []];
  const handleAddProdToReqList = async (requisitionListUid) => {
    if (beforeAddProdToReqList) {
      try {
        await beforeAddProdToReqList();
      } catch (error) {
        return;
      }
    }
    try {
      await addProductsToRequisitionList(requisitionListUid, [{
        sku,
        quantity,
        selected_options: selectedOptions
      }]);
    } catch (error) {
      console.error("Error adding product to list:", error);
    }
  };
  const {
    alert,
    setAlert,
    handleRequisitionListAlert
  } = useRequisitionListAlert();
  useEffect(() => {
    const updateEvent = events.on("requisitionList/alert", handleRequisitionListAlert);
    return () => {
      updateEvent == null ? void 0 : updateEvent.off();
    };
  }, [handleRequisitionListAlert]);
  return u("div", {
    ...props,
    className: `requisition-list-names ${variant === "hover" ? "requisition-list-names--modal-hover" : ""}`,
    children: [alert && sku === alert.sku && u(InLineAlert, {
      id: `requisition-list-names__alert__${sku}`,
      className: "requisition-list-names__alert",
      heading: alert.description,
      type: alert.type,
      variant: "primary",
      onDismiss: () => setAlert(null)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 130,
      columnNumber: 9
    }, void 0), u(Picker, {
      id: `requisition-list-names__picker__${sku}`,
      className: "requisition-list-names__picker",
      name: `requisition-list-names__picker__${sku}`,
      icon: u(Icon, {
        source: SvgBurger
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 143,
        columnNumber: 15
      }, void 0),
      variant: "secondary",
      placeholder: translations.addToReqList,
      disabled: isAdding,
      size: "medium",
      options: reqListOptions,
      handleSelect: (event) => {
        const selectedUid = event.currentTarget.value;
        if (selectedUid === "__create__") {
          setIsAdding(true);
          return;
        }
        if (selectedUid) {
          handleAddProdToReqList(selectedUid).then(() => {
            events.emit("requisitionList/alert", {
              action: "add",
              type: "success",
              context: "product",
              skus: [sku]
            });
            setIsAdding(false);
            event.target.value = "";
          });
        }
      }
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 139,
      columnNumber: 7
    }, void 0), canCreate && isAdding && u(Card, {
      variant: "secondary",
      children: u(RequisitionListForm, {
        mode: "create",
        onSuccess: async (newList) => {
          handleAddProdToReqList(newList.uid).then(() => {
            events.emit("requisitionList/alert", {
              action: "add",
              type: "success",
              context: "product",
              skus: [sku]
            });
            setIsAdding(false);
            setReqLists((prevLists) => [...prevLists, newList]);
          });
        },
        onError: () => {
          events.emit("requisitionList/alert", {
            action: "add",
            type: "error",
            context: "product",
            skus: [sku]
          });
        },
        onCancel: () => setIsAdding(false)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 171,
        columnNumber: 11
      }, void 0)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 170,
      columnNumber: 9
    }, void 0)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 123,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListNames,
  RequisitionListNames as default
};
//# sourceMappingURL=RequisitionListNames.js.map
