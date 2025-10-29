/*! Copyright 2025 Adobe
All Rights Reserved. */
import { f as fetchGraphQl, h as handleFetchError } from "./chunks/transform-requisition-list.js";
import { g, r, s, a, b } from "./chunks/transform-requisition-list.js";
import { events } from "@dropins/tools/event-bus.js";
import { g as g2 } from "./chunks/getRequisitionLists.js";
import { a as a2, d, b as b2, g as g3, u } from "./chunks/addRequisitionListItemsToCart.js";
import { d as d2 } from "./chunks/deleteRequisitionList.js";
import { Initializer } from "@dropins/tools/lib.js";
import "@dropins/tools/fetch-graphql.js";
import "./chunks/RequisitionListItemsFragment.graphql.js";
const _state = /* @__PURE__ */ (() => {
  return {
    authenticated: false
  };
})();
const state = new Proxy(_state, {
  set(target, key, value) {
    return Reflect.set(target, key, value);
  },
  get(target, key) {
    return target[key];
  }
});
const initialize = new Initializer({
  init: async (config2) => {
    const defaultConfig = {};
    initialize.config.setConfig({
      ...defaultConfig,
      ...config2
    });
  },
  listeners: () => [events.on("authenticated", (authenticated) => {
    state.authenticated = authenticated;
  })]
});
const config = initialize.config;
const STORE_CONFIG_QUERY = `
query STORE_CONFIG_QUERY {
  storeConfig {
    is_requisition_list_active
  }
}
`;
const isRequisitionListEnabled = async () => {
  var _a;
  try {
    const {
      errors,
      data
    } = await fetchGraphQl(STORE_CONFIG_QUERY, {
      method: "GET",
      cache: "force-cache"
    });
    if (errors) {
      const missingField = errors.some((error) => error.message && error.message.includes('Cannot query field "is_requisition_list_active"'));
      if (missingField) {
        return false;
      }
      return handleFetchError(errors);
    }
    return ((_a = data == null ? void 0 : data.storeConfig) == null ? void 0 : _a.is_requisition_list_active) === "1" || false;
  } catch {
    return false;
  }
};
export {
  a2 as addRequisitionListItemsToCart,
  config,
  d2 as deleteRequisitionList,
  d as deleteRequisitionListItems,
  fetchGraphQl,
  g as getConfig,
  b2 as getProductData,
  g3 as getRequisitionList,
  g2 as getRequisitionLists,
  initialize,
  isRequisitionListEnabled,
  r as removeFetchGraphQlHeader,
  s as setEndpoint,
  a as setFetchGraphQlHeader,
  b as setFetchGraphQlHeaders,
  u as updateRequisitionListItems
};
//# sourceMappingURL=api.js.map
