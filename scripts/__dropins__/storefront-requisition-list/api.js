/*! Copyright 2025 Adobe
All Rights Reserved. */
import { f as fetchGraphQl, h as handleFetchError } from "./chunks/getRequisitionLists.js";
import { d, c, g, r, s, a, b } from "./chunks/getRequisitionLists.js";
import { Initializer } from "@dropins/tools/lib.js";
import "@dropins/tools/fetch-graphql.js";
const initialize = new Initializer({
  init: async (config2) => {
    const defaultConfig = {};
    initialize.config.setConfig({
      ...defaultConfig,
      ...config2
    });
  },
  listeners: () => [
    // events.on('authenticated', (authenticated) => {
    //   console.log('authenticated', authenticated);
    // }),
  ]
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
  return fetchGraphQl(STORE_CONFIG_QUERY, {
    method: "GET",
    cache: "force-cache"
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    return data.storeConfig.is_requisition_list_active === "1";
  });
};
export {
  config,
  d as deleteRequisitionList,
  fetchGraphQl,
  c as getConfig,
  g as getRequisitionLists,
  initialize,
  isRequisitionListEnabled,
  r as removeFetchGraphQlHeader,
  s as setEndpoint,
  a as setFetchGraphQlHeader,
  b as setFetchGraphQlHeaders
};
//# sourceMappingURL=api.js.map
