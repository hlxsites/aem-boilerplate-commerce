/*! Copyright 2025 Adobe
All Rights Reserved. */
import { Initializer } from "@dropins/tools/lib.js";
import { events } from "@dropins/tools/event-bus.js";
import { s as state, j as setPersistedWishlistData, f as fetchGraphQl, h as handleFetchError, g as getPersistedWishlistData, i as isMatchingWishlistItem, k as clearPersistedLocalStorage } from "./removeProductsFromWishlist.js";
const initialize = new Initializer({
  init: async (config2) => {
    const defaultConfig = {
      isGuestWishlistEnabled: false,
      ...config2
    };
    initialize.config.setConfig(defaultConfig);
    await initializeWishlist();
  },
  listeners: () => [events.on("authenticated", async (authenticated) => {
    if (state.authenticated && !authenticated) {
      events.emit("wishlist/reset", void 0);
    }
    if (authenticated && !state.authenticated) {
      state.authenticated = authenticated;
      const wishlist = await initializeWishlist();
      if (wishlist) {
        mergeWishlists(wishlist);
      }
    }
  }, {
    eager: true
  }), events.on("wishlist/data", (payload) => {
    setPersistedWishlistData(payload);
  }, {
    eager: true
  }), events.on("wishlist/reset", () => {
    resetWishlist().catch(console.error);
    events.emit("wishlist/data", null);
  })]
});
const config = initialize.config;
function transformStoreConfig(data) {
  if (!data) return null;
  const transformFixedProductTaxDisplaySetting = (fptDisplaySetting) => {
    switch (fptDisplaySetting) {
      case 1:
        return "INCLUDING_FPT_AND_DESCRIPTION";
      case 2:
        return "EXCLUDING_FPT_INCLUDING_DESCRIPTION_FINAL_PRICE";
      case 3:
        return "EXCLUDING_FPT";
      default:
        return "INCLUDING_FPT_ONLY";
    }
  };
  return {
    wishlistIsEnabled: data.storeConfig.magento_wishlist_general_is_enabled,
    wishlistMultipleListIsEnabled: data.storeConfig.enable_multiple_wishlists,
    wishlistMaxNumber: data.storeConfig.maximum_number_of_wishlists,
    fixedProductTaxesEnabled: data.storeConfig.fixed_product_taxes_enable,
    fixedProductTaxesApply: data.storeConfig.fixed_product_taxes_apply_tax_to_fpt,
    fixedProductTaxesEnabledDisplayInProductLists: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_in_product_lists),
    fixedProductTaxesEnabledDisplayInSalesModules: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_in_sales_modules),
    fixedProductTaxesEnabledDisplayInProductView: transformFixedProductTaxDisplaySetting(data.storeConfig.fixed_product_taxes_display_prices_on_product_view_page)
  };
}
function transformProduct(data, selectedOptions = []) {
  var _a;
  if (!data) return null;
  return {
    type: data.__typename,
    name: data.name,
    sku: data.sku,
    uid: data.uid,
    image: getImage(data, selectedOptions),
    stockStatus: data.stock_status,
    canonicalUrl: data.canonical_url,
    urlKey: data.url_key,
    categories: (_a = data.categories) == null ? void 0 : _a.map((category) => category.name),
    prices: getPrices(data),
    productAttributes: transformProductAttributes(data),
    options: getOptions(data)
  };
}
function getOptions(data) {
  var _a, _b;
  if (data.__typename === "ConfigurableProduct") {
    return data.configurable_options ? (_a = data.configurable_options) == null ? void 0 : _a.map((option) => {
      var _a2;
      return {
        uid: option.uid,
        attributeUid: option.attribute_uid,
        attributeCode: option.attribute_code,
        values: (_a2 = option.values) == null ? void 0 : _a2.map((value) => ({
          uid: value.uid,
          label: value.label
        })),
        required: true
      };
    }) : [];
  }
  if (data.__typename === "GiftCardProduct") {
    return data.gift_card_options ? (_b = data.gift_card_options) == null ? void 0 : _b.map((option) => ({
      uid: option.uid,
      required: option.required,
      title: option.title
    })) : [];
  }
  return [];
}
function getImage(product, selectedOptions = []) {
  var _a;
  let image = product.thumbnail;
  if (product.__typename === "ConfigurableProduct" && product.variants && (selectedOptions == null ? void 0 : selectedOptions.length) > 0) {
    const allUids = selectedOptions.map((opt) => opt.uid);
    let matchedVariant = product.variants.find((variant) => {
      var _a2;
      const variantUids = ((_a2 = variant.attributes) == null ? void 0 : _a2.map((attr) => attr.uid)) || [];
      return allUids.every((uid) => variantUids.includes(uid));
    });
    if (!matchedVariant) {
      matchedVariant = product.variants.find((variant) => {
        var _a2;
        return (_a2 = variant.attributes) == null ? void 0 : _a2.some((attribute) => selectedOptions.some((opt) => opt.uid === attribute.uid));
      });
    }
    if ((_a = matchedVariant == null ? void 0 : matchedVariant.product) == null ? void 0 : _a.image) {
      image = matchedVariant.product.image;
    }
  }
  return {
    src: image == null ? void 0 : image.url,
    alt: image == null ? void 0 : image.label
  };
}
function getPrices(product) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
  return {
    regularPrice: {
      currency: ((_c = (_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.regular_price) == null ? void 0 : _c.currency) ?? "USD",
      value: ((_f = (_e = (_d = product.price_range) == null ? void 0 : _d.minimum_price) == null ? void 0 : _e.regular_price) == null ? void 0 : _f.value) ?? 0
    },
    finalPrice: {
      currency: ((_i = (_h = (_g = product.price_range) == null ? void 0 : _g.minimum_price) == null ? void 0 : _h.final_price) == null ? void 0 : _i.currency) ?? "USD",
      value: ((_l = (_k = (_j = product.price_range) == null ? void 0 : _j.minimum_price) == null ? void 0 : _k.final_price) == null ? void 0 : _l.value) ?? 0
    },
    discount: {
      amountOff: ((_o = (_n = (_m = product.price_range) == null ? void 0 : _m.minimum_price) == null ? void 0 : _n.discount) == null ? void 0 : _o.amount_off) ?? 0,
      percentOff: ((_r = (_q = (_p = product.price_range) == null ? void 0 : _p.minimum_price) == null ? void 0 : _q.discount) == null ? void 0 : _r.percent_off) ?? 0
    },
    fixedProductTaxes: transformFixedProductTaxes(product)
  };
}
function transformProductAttributes(product) {
  var _a, _b;
  return (_b = (_a = product.custom_attributesV2) == null ? void 0 : _a.items) == null ? void 0 : _b.map((attribute) => {
    const transformedCode = attribute.code.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return {
      ...attribute,
      code: transformedCode
    };
  });
}
function transformFixedProductTaxes(product) {
  var _a, _b, _c, _d, _e;
  if (!((_b = (_a = product.price_range) == null ? void 0 : _a.minimum_price) == null ? void 0 : _b.fixed_product_taxes)) {
    return [];
  }
  return (_e = (_d = (_c = product.price_range) == null ? void 0 : _c.minimum_price) == null ? void 0 : _d.fixed_product_taxes) == null ? void 0 : _e.map((attribute) => {
    return {
      money: {
        value: attribute.amount.value,
        currency: attribute.amount.currency
      },
      label: attribute.label
    };
  });
}
function transformWishlist(data, enteredOptions) {
  if (!data) return null;
  return {
    id: data.id,
    updated_at: data.updated_at,
    sharing_code: data.sharing_code,
    items_count: data.items_count,
    items: transformItems(data, enteredOptions ?? [])
  };
}
function transformItems(data, enteredOptions) {
  var _a, _b;
  if (!((_b = (_a = data == null ? void 0 : data.items_v2) == null ? void 0 : _a.items) == null ? void 0 : _b.length)) return [];
  return data.items_v2.items.map((item) => {
    const selectedOptions = getSelectedOptions(item);
    return {
      id: item.id,
      quantity: item.quantity,
      description: item.description,
      added_at: item.added_at,
      enteredOptions,
      selectedOptions,
      product: transformProduct(item.product, selectedOptions)
    };
  });
}
function getSelectedOptions(item) {
  if (item.product.__typename === "ConfigurableProduct") {
    return item.configurable_options ? item.configurable_options.map((option) => ({
      value: option.value_label,
      label: option.option_label,
      uid: option.configurable_product_option_value_uid
    })) : [];
  }
  return [];
}
const STORE_CONFIG_QUERY = `
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
    fixed_product_taxes_enable
    fixed_product_taxes_apply_tax_to_fpt
    fixed_product_taxes_display_prices_in_product_lists
    fixed_product_taxes_display_prices_in_sales_modules
    fixed_product_taxes_display_prices_on_product_view_page    
  }
}
`;
const getStoreConfig = async () => {
  return fetchGraphQl(STORE_CONFIG_QUERY, {
    method: "GET",
    cache: "force-cache"
  }).then(({
    errors,
    data
  }) => {
    if (errors) return handleFetchError(errors);
    return transformStoreConfig(data);
  });
};
const PRICE_RANGE_FRAGMENT = `
  fragment PRICE_RANGE_FRAGMENT on PriceRange {
    minimum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
    maximum_price {
      regular_price {
        value
        currency
      }
      final_price {
        value
        currency
      }
      discount {
        percent_off
        amount_off
      }
      fixed_product_taxes {
        amount {
          currency
          value
        }
        label
      }      
    }
  }
`;
const SIMPLE_PRODUCT_FRAGMENT = `
  ... on SimpleProduct {
    options {
      uid
    }
  }
`;
const CONFIGURABLE_PRODUCT_FRAGMENT = `
  ... on ConfigurableProduct {
    configurable_options {
      uid
      attribute_uid
      attribute_code
      values {
        uid
        label
      }
    }
    variants {
      attributes {
        code
        uid
        label
      }
      product {
        sku
        stock_status
        image {
          label
          url
        }
      }
    }
  }
`;
const DOWNLOADABLE_PRODUCT_FRAGMENT = `
  ... on DownloadableProduct {
    image {
      label
      url
    }
  }
 `;
const GIFT_CARD_PRODUCT_FRAGMENT = `
  ... on GiftCardProduct {
    giftcard_type
    giftcard_amounts {
      uid
      website_id
      value
      attribute_id
      website_value
    }
    gift_card_options {
      title
      required
      uid
      ... on CustomizableFieldOption {
        value: value {
          uid
        }
      }
    }
  }
`;
const BUNDLE_PRODUCT_FRAGMENT = `
  ... on BundleProduct {
    items {
      uid
      required
      title
      options {
        uid
        label
        quantity
      }
    }
  }
`;
const PRODUCT_FRAGMENT = `
  fragment PRODUCT_FRAGMENT on ProductInterface {
    __typename
    uid
    sku
    name
    thumbnail {
      url
      label
    }
    url_key
    categories {
      url_path
      url_key
      name
    }
    stock_status
    canonical_url
    custom_attributesV2(filters: {is_visible_on_front: true}){
      items {
        code
        ...on AttributeValue {
          value
        }
        ...on AttributeSelectedOptions {
          selected_options {
            value
            label
          }
        }
      }
    }
    price_range {
        ...PRICE_RANGE_FRAGMENT
    }
    ${SIMPLE_PRODUCT_FRAGMENT}
    ${CONFIGURABLE_PRODUCT_FRAGMENT}
    ${DOWNLOADABLE_PRODUCT_FRAGMENT}
    ${GIFT_CARD_PRODUCT_FRAGMENT}
    ${BUNDLE_PRODUCT_FRAGMENT}
  }

${PRICE_RANGE_FRAGMENT}
`;
const GET_PRODUCT_BY_SKU = `
  query GET_PRODUCT_BY_SKU($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        ...PRODUCT_FRAGMENT
      }
    }
  }

${PRODUCT_FRAGMENT}
`;
const getProductBySku = async (sku, selectedOptions) => {
  if (!sku) {
    throw Error("Product SKU is not set");
  }
  return fetchGraphQl(GET_PRODUCT_BY_SKU, {
    variables: {
      sku
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.products) == null ? void 0 : _a.items)) {
      return null;
    }
    return transformProduct(data.products.items[0], selectedOptions ?? []);
  });
};
const CUSTOMIZABLE_OPTIONS_FRAGMENT = `
  fragment CUSTOMIZABLE_OPTIONS_FRAGMENT on SelectedCustomizableOption {
    type
    customizable_option_uid
    label
    is_required
    values {
      label
      value
      price{
        type
        units
        value
      }
    }
  }
`;
const CONFIGURABLE_WISHLIST_ITEM_FRAGMENT = `
  ... on ConfigurableWishlistItem {
    configurable_options {
      option_label
      value_label
      configurable_product_option_value_uid
      configurable_product_option_uid
    }
    configured_variant {
      canonical_url
    }
  }
`;
const DOWNLOADABLE_WISHLIST_ITEM_FRAGMENT = `
  ... on DownloadableWishlistItem {
    added_at
    description
    links_v2 {
      sample_url
      sort_order
      title
      uid
    }
    quantity
  }
`;
const GIFT_CARD_WISHLIST_ITEM_FRAGMENT = `
  ... on GiftCardWishlistItem {
    added_at
    description
    gift_card_options {
      amount {
        value
        currency
      }
      custom_giftcard_amount {
        value
        currency
      }
      message
      recipient_email
      recipient_name
      sender_email
      sender_name
    }
  }
`;
const BUNDLE_WISHLIST_ITEM_FRAGMENT = `
  ... on BundleWishlistItem {
    bundle_options {
      label
      type
      uid
      values {
        uid
        label
        quantity
      }
    }
  }
`;
const WISHLIST_ITEM_FRAGMENT = `
fragment WISHLIST_ITEM_FRAGMENT on WishlistItemInterface {
    __typename
    id
    quantity
    description
    added_at
    product {
      ...PRODUCT_FRAGMENT
    }
    ${CONFIGURABLE_WISHLIST_ITEM_FRAGMENT}
    ${DOWNLOADABLE_WISHLIST_ITEM_FRAGMENT}
    ${GIFT_CARD_WISHLIST_ITEM_FRAGMENT}
    ${BUNDLE_WISHLIST_ITEM_FRAGMENT}
    customizable_options {
      ...CUSTOMIZABLE_OPTIONS_FRAGMENT
    }
  }
  
  ${PRODUCT_FRAGMENT}
  ${CUSTOMIZABLE_OPTIONS_FRAGMENT}
`;
const WISHLIST_FRAGMENT = `
fragment WISHLIST_FRAGMENT on Wishlist {
    id
    updated_at
    sharing_code
    items_count
    items_v2 {
      items {
        ...WISHLIST_ITEM_FRAGMENT
      }
    }
  }

${WISHLIST_ITEM_FRAGMENT}
`;
const GET_WISHLISTS_QUERY = `
  query GET_WISHLISTS_QUERY {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${WISHLIST_FRAGMENT}
`;
const getWishlists = async () => {
  if (!state.authenticated) {
    return getPersistedWishlistData();
  }
  return fetchGraphQl(GET_WISHLISTS_QUERY).then(({
    errors,
    data
  }) => {
    var _a;
    if (errors) return handleFetchError(errors);
    if (!((_a = data == null ? void 0 : data.customer) == null ? void 0 : _a.wishlists)) {
      return null;
    }
    return data.customer.wishlists.map((wishlist) => transformWishlist(wishlist));
  });
};
const ADD_PRODUCTS_TO_WISHLIST_MUTATION = `
  mutation ADD_PRODUCTS_TO_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemInput!]!,
    ) {
    addProductsToWishlist(
      wishlistId: $wishlistId
      wishlistItems: $wishlistItems
    ) {
      wishlist {
        ...WISHLIST_FRAGMENT
      }
      user_errors {
        code
        message
      }
    }
  }
${WISHLIST_FRAGMENT}
`;
const addProductsToWishlist = async (items) => {
  var _a, _b, _c, _d, _e;
  if (!items) return null;
  const wishlist = getPersistedWishlistData();
  let updatedWishlist = {
    id: (wishlist == null ? void 0 : wishlist.id) ?? "",
    updated_at: "",
    sharing_code: "",
    items_count: 0,
    items: (wishlist == null ? void 0 : wishlist.items) ?? []
  };
  for (const item of items) {
    const skuExists = (_a = updatedWishlist.items) == null ? void 0 : _a.some((wishlistItem) => isMatchingWishlistItem(wishlistItem, {
      sku: item.sku,
      optionUIDs: item.optionsUIDs
    }));
    if (skuExists) {
      continue;
    }
    const selectedOptions = item.optionsUIDs ? (_b = item.optionsUIDs) == null ? void 0 : _b.map((option) => ({
      uid: option
    })) : [];
    const product = await getProductBySku(item.sku, selectedOptions);
    if (!product) {
      throw Error("Product not found");
    }
    updatedWishlist.items = [...updatedWishlist.items, {
      quantity: item.quantity,
      selectedOptions,
      enteredOptions: [],
      product
    }];
  }
  updatedWishlist.items_count = (_c = updatedWishlist.items) == null ? void 0 : _c.length;
  events.emit("wishlist/data", updatedWishlist);
  if (state.authenticated) {
    if (!state.wishlistId) {
      events.emit("wishlist/data", wishlist);
      throw Error("Wishlist ID is not set");
    }
    const variables = {
      wishlistId: state.wishlistId,
      wishlistItems: items.map(({
        sku,
        quantity,
        optionsUIDs,
        enteredOptions
      }) => ({
        sku,
        quantity,
        selected_options: optionsUIDs,
        entered_options: enteredOptions
      }))
    };
    const {
      errors,
      data
    } = await fetchGraphQl(ADD_PRODUCTS_TO_WISHLIST_MUTATION, {
      variables
    });
    const _errors = [...((_d = data == null ? void 0 : data.addProductsToWishlist) == null ? void 0 : _d.user_errors) ?? [], ...errors ?? []];
    if (_errors.length > 0) {
      events.emit("wishlist/data", wishlist);
      return handleFetchError(_errors);
    }
    const updatedWishlist2 = transformWishlist(data.addProductsToWishlist.wishlist, ((_e = items[0]) == null ? void 0 : _e.enteredOptions) ?? []);
    events.emit("wishlist/data", updatedWishlist2);
  }
  return null;
};
const resetWishlist = () => {
  state.wishlistId = null;
  state.authenticated = false;
  return Promise.resolve(null);
};
const initializeWishlist = async () => {
  if (state.initializing) {
    return null;
  }
  
  state.initializing = true;
  
  try {
    if (!state.config) {
      state.config = await getStoreConfig();
    }
    
    const payload = state.authenticated ? await getDefaultWishlist() : await getGuestWishlist();
    
    events.emit("wishlist/initialized", payload);
    events.emit("wishlist/data", payload);
    
    state.initializing = false;
    state.isLoading = false;
    
    return payload;
  } catch (error) {
    console.error("Wishlist initialization failed:", error);
    
    const emptyWishlist = {
      id: "",
      items: [],
      items_count: 0
    };
    
    events.emit("wishlist/initialized", emptyWishlist);
    events.emit("wishlist/data", emptyWishlist);
    
    state.initializing = false;
    state.isLoading = false;
    
    return emptyWishlist;
  }
};
async function getDefaultWishlist() {
  const wishlists = await getWishlists();
  const wishlist = wishlists ? wishlists[0] : null;
  if (!wishlist) return null;
  state.wishlistId = wishlist.id;
  return wishlist;
}
async function getGuestWishlist() {
  try {
    return await getPersistedWishlistData();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const mergeWishlists = async (wishlist) => {
  var _a;
  if (!wishlist) {
    return null;
  }
  const guestWishlist = getPersistedWishlistData(true);
  const itemsToMerge = [];
  (_a = guestWishlist == null ? void 0 : guestWishlist.items) == null ? void 0 : _a.forEach((item) => {
    var _a2;
    const optionUIDs = ((_a2 = item.selectedOptions) == null ? void 0 : _a2.map((option) => option.uid)) || [];
    const exists = wishlist.items.some((wishlistItem) => isMatchingWishlistItem(wishlistItem, {
      sku: item.product.sku,
      optionUIDs
    }));
    if (!exists) {
      const mergeItem = {
        sku: item.product.sku,
        quantity: 1,
        optionsUIDs: optionUIDs,
        enteredOptions: item.enteredOptions || void 0
      };
      itemsToMerge.push(mergeItem);
    }
  });
  if (itemsToMerge.length === 0) {
    return null;
  }
  const result = await addProductsToWishlist(itemsToMerge);
  clearPersistedLocalStorage();
  return result;
};
export {
  WISHLIST_ITEM_FRAGMENT as W,
  addProductsToWishlist as a,
  WISHLIST_FRAGMENT as b,
  config as c,
  getProductBySku as d,
  getWishlists as e,
  initializeWishlist as f,
  getStoreConfig as g,
  getDefaultWishlist as h,
  initialize as i,
  getGuestWishlist as j,
  mergeWishlists as m,
  resetWishlist as r,
  transformWishlist as t
};
//# sourceMappingURL=mergeWishlists.js.map
