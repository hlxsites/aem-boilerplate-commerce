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
      quantity: item.quantity,
      customizable_options: item.customizable_options ? item.customizable_options.map((option) => ({
        uid: option.customizable_option_uid,
        is_required: option.is_required,
        label: option.label,
        sort_order: option.sort_order,
        type: option.type,
        values: option.values.map((value) => ({
          uid: value.customizable_option_value_uid,
          label: value.label,
          price: value.price,
          value: value.value
        }))
      })) : [],
      bundle_options: item.bundle_options || [],
      configurable_options: item.configurable_options ? item.configurable_options.map((option) => ({
        option_uid: option.configurable_product_option_uid,
        option_label: option.option_label,
        value_uid: option.configurable_product_option_value_uid,
        value_label: option.value_label
      })) : [],
      samples: item.samples ? item.samples.map((sample) => ({
        url: sample.sample_url,
        sort_order: sample.sort_order,
        title: sample.title
      })) : [],
      gift_card_options: item.gift_card_options || {}
    };
  });
}
export {
  REQUISITION_LIST_FRAGMENT as R,
  setFetchGraphQlHeader as a,
  setFetchGraphQlHeaders as b,
  fetchGraphQl as f,
  getConfig as g,
  handleFetchError as h,
  removeFetchGraphQlHeader as r,
  setEndpoint as s,
  transformRequisitionList as t
};
//# sourceMappingURL=transform-requisition-list.js.map
