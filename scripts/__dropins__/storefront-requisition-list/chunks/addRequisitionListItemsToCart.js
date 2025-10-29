/*! Copyright 2025 Adobe
All Rights Reserved. */
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "./transform-requisition-list.js";
import { R as REQUISITION_LIST_ITEMS_FRAGMENT } from "./RequisitionListItemsFragment.graphql.js";
import { events } from "@dropins/tools/event-bus.js";
function transformProduct(data) {
  var _a;
  return {
    sku: data.sku,
    parent_sku: data.sku,
    // Use same SKU as parent for simple products
    name: data.name,
    price: data.price,
    shortDescription: data.shortDescription || "",
    metaDescription: data.metaDescription || "",
    metaKeyword: data.metaKeyword || "",
    metaTitle: data.metaTitle || "",
    description: data.description || "",
    addToCartAllowed: data.addToCartAllowed,
    url: data.url || "",
    urlKey: data.urlKey || "",
    externalId: data.externalId || "",
    images: ((_a = data.images) == null ? void 0 : _a.map((image) => ({
      url: image.url,
      label: image.label || "",
      roles: image.roles || []
    }))) || []
  };
}
function transformProducts(products) {
  if (!(products == null ? void 0 : products.length)) return [];
  return products.map(transformProduct);
}
const GET_REQUISITION_LIST_QUERY = `
  query GET_REQUISITION_LIST_QUERY(
    $requisitionListUid: String,
    $currentPage: Int = 1,
    $pageSize: Int = 10,
  ) {
    customer {
      requisition_lists (
        filter: {
          uids: {
            eq: $requisitionListUid
          }
        }
      ){
        items {
          ...REQUISITION_LIST_FRAGMENT
          items(pageSize: $pageSize, currentPage: $currentPage) {
            ...REQUISITION_LIST_ITEMS_FRAGMENT
          }
        }
      }
    }
  }
${REQUISITION_LIST_ITEMS_FRAGMENT}
${REQUISITION_LIST_FRAGMENT}
`;
const getRequisitionList = async (requisitionListID, currentPage, pageSize) => {
  return fetchGraphQl(GET_REQUISITION_LIST_QUERY, {
    variables: {
      requisitionListUid: requisitionListID,
      currentPage,
      pageSize
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.customer) == null ? void 0 : _a.requisition_lists)) {
      return null;
    }
    const payload = transformRequisitionList(data.customer.requisition_lists.items[0]);
    events.emit("requisitionList/data", payload);
    return payload;
  });
};
const UPDATE_REQUISITION_LIST_ITEMS_MUTATION = `
  mutation UPDATE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItems: [UpdateRequisitionListItemsInput!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    updateRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItems: $requisitionListItems
    ) {
      requisition_list {
      ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${REQUISITION_LIST_FRAGMENT}
${REQUISITION_LIST_ITEMS_FRAGMENT}
`;
const updateRequisitionListItems = async (requisitionListUid, requisitionListItems, pageSize, currentPage) => {
  return fetchGraphQl(UPDATE_REQUISITION_LIST_ITEMS_MUTATION, {
    variables: {
      requisitionListUid,
      requisitionListItems,
      pageSize,
      currentPage
    }
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    const payload = transformRequisitionList(data.updateRequisitionListItems.requisition_list);
    events.emit("requisitionList/data", payload);
    return payload;
  });
};
const DELETE_REQUISITION_LIST_ITEMS_MUTATION = `
  mutation DELETE_REQUISITION_LIST_ITEMS_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!,
      $pageSize: Int = 20,
      $currentPage: Int = 1
    ) {
    deleteRequisitionListItems(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      requisition_list {
        ...REQUISITION_LIST_FRAGMENT
        items(pageSize: $pageSize, currentPage: $currentPage) {
          ...REQUISITION_LIST_ITEMS_FRAGMENT
        }
      }
    }
  }
${REQUISITION_LIST_FRAGMENT}
${REQUISITION_LIST_ITEMS_FRAGMENT}
`;
const deleteRequisitionListItems = async (requisitionListUid, items, pageSize, currentPage) => {
  return fetchGraphQl(DELETE_REQUISITION_LIST_ITEMS_MUTATION, {
    variables: {
      requisitionListUid,
      requisitionListItemUids: items,
      pageSize,
      currentPage
    }
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    const payload = transformRequisitionList(data.deleteRequisitionListItems.requisition_list);
    events.emit("requisitionList/data", payload);
    return payload;
  });
};
const PRODUCT_FRAGMENT = `
fragment PRODUCT_FRAGMENT on ProductView {
  __typename
  id
  sku
  name
  shortDescription
  metaDescription
  metaKeyword
  metaTitle
  description
  inStock
  addToCartAllowed
  url
  urlKey
  externalId
  images(roles: []) {
    url
    label
    roles
  }
  attributes(roles: []) {
    name
    label
    value
    roles
  }
  ... on SimpleProductView {
    price {
      roles
      regular {
        amount {
          value
          currency
        }
      }
      final {
        amount {
          value
          currency
        }
      }
    }
  }
  ... on ComplexProductView {
    options {
      ...PRODUCT_OPTION_FRAGMENT
    }
    ...PRICE_RANGE_FRAGMENT
  }
}
fragment PRODUCT_OPTION_FRAGMENT on ProductViewOption {
  id
  title
  required
  multi
  values {
    id
    title
    inStock
    __typename
    ... on ProductViewOptionValueProduct {
      title
      quantity
      isDefault
      __typename
      product {
        sku
        shortDescription
        metaDescription
        metaKeyword
        metaTitle
        name
        price {
          final {
            amount {
              value
              currency
            }
          }
          regular {
            amount {
              value
              currency
            }
          }
          roles
        }
      }
    }
    ... on ProductViewOptionValueSwatch {
      id
      title
      type
      value
      inStock
    }
  }
}
fragment PRICE_RANGE_FRAGMENT on ComplexProductView {
  priceRange {
    maximum {
      final {
        amount {
          value
          currency
        }
      }
      regular {
        amount {
          value
          currency
        }
      }
      roles
    }
    minimum {
      final {
        amount {
          value
          currency
        }
      }
      regular {
        amount {
          value
          currency
        }
      }
      roles
    }
  }
}
`;
const GET_PRODUCT_DATA_QUERY = `
  query GET_PRODUCT_DATA($skus: [String]) {
    products(skus: $skus) {
      ...PRODUCT_FRAGMENT
    }
  }
  ${PRODUCT_FRAGMENT}
`;
const getProductData = async (skus) => {
  return fetchGraphQl(GET_PRODUCT_DATA_QUERY, {
    variables: {
      skus
    }
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    if (!(data == null ? void 0 : data.products)) {
      return null;
    }
    return transformProducts(data.products);
  });
};
const ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION = `
  mutation ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION(
      $requisitionListUid: ID!, 
      $requisitionListItemUids: [ID!]!
    ) {
    addRequisitionListItemsToCart(
      requisitionListUid: $requisitionListUid
      requisitionListItemUids: $requisitionListItemUids
    ) {
      status
      add_requisition_list_items_to_cart_user_errors {
        message
        type
      }
      cart {
        id
        itemsV2 {
          items {
            uid
            quantity
            is_available
          }
          total_count
        }
        email
        total_quantity
        is_virtual
      }
    }
  }
`;
const addRequisitionListItemsToCart = async (requisitionListUid, requisitionListItemUids) => {
  return fetchGraphQl(ADD_REQUISITION_LIST_ITEMS_TO_CART_MUTATION, {
    variables: {
      requisitionListUid,
      requisitionListItemUids
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if ((_a = data.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors) == null ? void 0 : _a.length) {
      return data.addRequisitionListItemsToCart.add_requisition_list_items_to_cart_user_errors.map((e) => e.type);
    }
    return null;
  });
};
export {
  addRequisitionListItemsToCart as a,
  getProductData as b,
  deleteRequisitionListItems as d,
  getRequisitionList as g,
  updateRequisitionListItems as u
};
//# sourceMappingURL=addRequisitionListItemsToCart.js.map
