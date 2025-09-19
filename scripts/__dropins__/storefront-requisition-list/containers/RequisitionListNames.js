/*! Copyright 2025 Adobe
All Rights Reserved. */
import { t, u } from "../chunks/jsxRuntime.module.js";
import { useState, useEffect } from "@dropins/tools/preact-compat.js";
import { Button, Card } from "@dropins/tools/components.js";
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "../chunks/transform-requisition-list.js";
import { g as getRequisitionLists } from "../chunks/getRequisitionLists.js";
import { R as RequisitionListForm } from "../chunks/RequisitionListForm.js";
import "@dropins/tools/lib.js";
import "@dropins/tools/preact-hooks.js";
/* empty css                               */
import { useText } from "@dropins/tools/i18n.js";
import { Fragment } from "@dropins/tools/preact.js";
import "@dropins/tools/fetch-graphql.js";
const REQUISITION_LIST_ITEMS_FRAGMENT = `
fragment REQUISITION_LIST_ITEMS_FRAGMENT on RequistionListItems {
  items {
    uid
    quantity
    customizable_options {
      customizable_option_uid
      is_required
      label
      sort_order
      type
      values {
        customizable_option_value_uid
        label
        value
        price {
          type
          units
          value
        }
      }
    }
    ... on BundleRequisitionListItem {
      bundle_options {
        uid
        label
        type
        values {
          uid
          label
          original_price {
            value
            currency
          }
          priceV2 {
            value
            currency
          }
          quantity
        }
      }
    }
    ... on ConfigurableRequisitionListItem {
      configurable_options {
        configurable_product_option_uid
        configurable_product_option_value_uid
        option_label
        value_label
      }
    }
    ... on DownloadableRequisitionListItem {
      links {
        price
        sample_url
        sort_order
        title
        uid
      }
      samples {
        sample_url
        sort_order
        title
      }
    }
    ... on GiftCardRequisitionListItem {
      gift_card_options {
        amount {
          currency
          value
        }
        custom_giftcard_amount {
          currency
          value
        }
        message
        recipient_email
        recipient_name
        sender_name
        sender_email
      }
    }
  }
  page_info {
    page_size
    current_page
    total_pages
  }
}
`;
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
  return transformRequisitionList(data.addProductsToRequisitionList.requisition_list);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-requisition-list/src/containers/RequisitionListNames/RequisitionListNames.tsx";
const RequisitionListNames = ({
  items = [],
  canCreate = true,
  sku,
  quantity = 1,
  ...props
}) => {
  const [reqLists, setReqLists] = t(useState(items), "reqLists");
  const [isAdding, setIsAdding] = t(useState(false), "isAdding");
  const translations = useText({
    createTitle: `RequisitionList.RequisitionListForm.createTitle`,
    addProdToReqList: `RequisitionList.RequisitionListForm.addProductToRequisitionList`
  });
  useEffect(() => {
    if (!reqLists || reqLists.length === 0) {
      getRequisitionLists().then((res) => {
        if (res && res.items) {
          setReqLists(res.items);
        }
      });
    }
  }, [reqLists]);
  const handleAddProdToReqList = async (requisitionListUid) => {
    try {
      await addProductsToRequisitionList(requisitionListUid, [{
        sku,
        quantity
      }]);
    } catch (error) {
      console.error("Error adding product to list:", error);
    }
  };
  return u("div", {
    ...props,
    className: "requisition-list-names",
    children: [translations.addProdToReqList, u("div", {
      className: "requisition-list-names__list",
      children: reqLists == null ? void 0 : reqLists.map((reqList) => u(Button, {
        onClick: (event) => {
          event.preventDefault();
          handleAddProdToReqList(reqList.uid).then(() => {
          });
        },
        variant: "text",
        className: "requisition-list-names__item",
        children: reqList.name
      }, reqList.uid, false, {
        fileName: _jsxFileName,
        lineNumber: 76,
        columnNumber: 11
      }, void 0))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 74,
      columnNumber: 7
    }, void 0), canCreate && u(Fragment, {
      children: [!isAdding && u(Button, {
        onClick: () => {
          setIsAdding(true);
        },
        children: translations.createTitle
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 13
      }, void 0), isAdding && u(Card, {
        variant: "secondary",
        children: u(RequisitionListForm, {
          mode: "create",
          onSuccess: async (newList) => {
            handleAddProdToReqList(newList.uid).then(() => {
              setIsAdding(false);
              setReqLists((prevLists) => prevLists ? [...prevLists, newList] : [newList]);
            });
          },
          onCancel: () => setIsAdding(false)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 104,
          columnNumber: 15
        }, void 0)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 103,
        columnNumber: 13
      }, void 0)]
    }, void 0, true)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 72,
    columnNumber: 5
  }, void 0);
};
export {
  RequisitionListNames,
  RequisitionListNames as default
};
//# sourceMappingURL=RequisitionListNames.js.map
