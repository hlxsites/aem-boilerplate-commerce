/*! Copyright 2025 Adobe
All Rights Reserved. */
import { FetchGraphQL } from "@dropins/tools/fetch-graphql.js";
const {
  setEndpoint,
  setFetchGraphQlHeader,
  removeFetchGraphQlHeader,
  setFetchGraphQlHeaders,
  fetchGraphQl,
  getConfig
} = new FetchGraphQL().getMethods();
const handleFetchError = (errors) => {
  const errorMessage = errors.map((e) => e.message).join(" ");
  throw Error(errorMessage);
};
const REQUISITION_LIST_FRAGMENT = `
fragment REQUISITION_LIST_FRAGMENT on RequisitionList {
    uid
    name
    description
    items_count
    updated_at
  }
`;
const GET_REQUISITION_LISTS_QUERY = `
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 3,
  ) {
    customer {
      requisition_lists(pageSize: $pageSize, currentPage: $currentPage) {
        items {
          ...REQUISITION_LIST_FRAGMENT
        }
        page_info {
          page_size
          current_page
          total_pages
        }
        total_count
      }
    }
  }
${REQUISITION_LIST_FRAGMENT}
`;
function transformRequisitionList(data) {
  var _a;
  return {
    uid: data.uid,
    name: data.name,
    description: data.description,
    updated_at: data.updated_at,
    items_count: data.items_count,
    items: transformItems((_a = data.items) == null ? void 0 : _a.items)
  };
}
function transformItems(items) {
  if (!(items == null ? void 0 : items.length)) return [];
  return items.map((item) => {
    return {
      uid: item.uid,
      quantity: item.quantity
    };
  });
}
const getRequisitionLists = async (currentPage, pageSize) => {
  return fetchGraphQl(GET_REQUISITION_LISTS_QUERY, {
    variables: {
      currentPage,
      pageSize
    }
  }).then(({
    errors,
    data
  }) => {
    var _a, _b, _c;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.customer) == null ? void 0 : _a.requisition_lists)) {
      return null;
    }
    return {
      items: data.customer.requisition_lists.items.map((requisitionList) => transformRequisitionList(requisitionList)),
      page_info: (_c = (_b = data.customer) == null ? void 0 : _b.requisition_lists) == null ? void 0 : _c.page_info
    };
  });
};
export {
  setFetchGraphQlHeader as a,
  setFetchGraphQlHeaders as b,
  getConfig as c,
  fetchGraphQl as f,
  getRequisitionLists as g,
  handleFetchError as h,
  removeFetchGraphQlHeader as r,
  setEndpoint as s
};
//# sourceMappingURL=getRequisitionLists.js.map
