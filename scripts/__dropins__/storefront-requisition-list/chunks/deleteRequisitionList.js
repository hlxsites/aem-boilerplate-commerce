/*! Copyright 2025 Adobe
All Rights Reserved. */
import { R as REQUISITION_LIST_FRAGMENT, f as fetchGraphQl, h as handleFetchError, t as transformRequisitionList } from "./transform-requisition-list.js";
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
    var _a, _b, _c, _d, _e, _f;
    if (!requisitionListUid) return null;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.deleteRequisitionList) == null ? void 0 : _a.requisition_lists)) {
      return null;
    }
    return {
      items: ((_c = (_b = data.deleteRequisitionList.requisition_lists) == null ? void 0 : _b.items) == null ? void 0 : _c.map((requisitionList) => transformRequisitionList(requisitionList))) || [],
      page_info: (_e = (_d = data.deleteRequisitionList) == null ? void 0 : _d.requisition_lists) == null ? void 0 : _e.page_info,
      status: (_f = data.deleteRequisitionList) == null ? void 0 : _f.status
    };
  });
};
export {
  deleteRequisitionList as d
};
//# sourceMappingURL=deleteRequisitionList.js.map
