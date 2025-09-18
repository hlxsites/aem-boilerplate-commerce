/*! Copyright 2025 Adobe
All Rights Reserved. */
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "./fetch-error.js";
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
const DELETE_REQUISITION_LIST_MUTATION = `
  mutation DELETE_REQUISITION_LIST_MUTATION(
      $requisitionListUid: ID!,
    ) {
    deleteRequisitionList(
      requisitionListUid: $requisitionListUid
    ) {
      status
      requisition_lists {
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
const deleteRequisitionList = async (requisitionListUid) => {
  return fetchGraphQl(DELETE_REQUISITION_LIST_MUTATION, {
    variables: {
      requisitionListUid
    }
  }).then(({
    errors,
    data
  }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.deleteRequisitionList) == null ? void 0 : _a.requisition_lists)) {
      return null;
    }
    return {
      items: ((_c = (_b = data.deleteRequisitionList.requisition_lists) == null ? void 0 : _b.items) == null ? void 0 : _c.map((requisitionList) => transformRequisitionList(requisitionList))) || [],
      page_info: (_e = (_d = data.deleteRequisitionList) == null ? void 0 : _d.requisition_lists) == null ? void 0 : _e.page_info,
      status: (_g = (_f = data.deleteRequisitionList) == null ? void 0 : _f.requisition_lists) == null ? void 0 : _g.page_info
    };
  });
};
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
  deleteRequisitionList as d,
  getRequisitionLists as g
};
//# sourceMappingURL=getRequisitionLists.js.map
