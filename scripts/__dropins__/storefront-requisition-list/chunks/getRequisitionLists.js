/*! Copyright 2025 Adobe
All Rights Reserved. */
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "./transform-requisition-list.js";
const GET_REQUISITION_LISTS_QUERY = `
  query GET_REQUISITION_LISTS_QUERY(
    $currentPage: Int = 1
    $pageSize: Int = 10,
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
  getRequisitionLists as g
};
//# sourceMappingURL=getRequisitionLists.js.map
