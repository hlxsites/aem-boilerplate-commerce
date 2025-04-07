/*! Copyright 2025 Adobe
All Rights Reserved. */
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { Config, setImageParamsKeyMap } from "@dropins/tools/lib.js";
import { e as events } from "./chunks/index.js";
import { s as state, b as setPersistedWishlistData, f as fetchGraphQl, h as handleFetchError, a as WISHLIST_FRAGMENT, g as getPersistedWishlistData, t as transformWishlist } from "./chunks/removeProductsFromWishlist.js";
import { k, i, r, d, e, j } from "./chunks/removeProductsFromWishlist.js";
import { a, g } from "./chunks/getProductBySku.js";
import { g as g2 } from "./chunks/getWishlistById.js";
class Initializer {
  /**
   * Creates an instance of Initializer.
   * @param options - The initialization options.
   * @param options.init - A function that initializes the module.
   * @param options.listeners - A function that sets up event listeners.
   */
  constructor({
    init,
    listeners
  }) {
    __publicField(this, "_listeners", []);
    __publicField(this, "listeners");
    __publicField(this, "init");
    __publicField(this, "config", new Config({}));
    this.listeners = (config2) => {
      this._listeners.forEach((listener) => listener.off());
      return this._listeners = listeners(config2);
    };
    this.init = (options) => {
      const {
        imageParamsKeyMap,
        ...rest
      } = options;
      this.config.setConfig({
        ...this.config.getConfig(),
        ...rest
      });
      setImageParamsKeyMap(imageParamsKeyMap);
      return init(options);
    };
  }
}
const initialize = new Initializer({
  init: async (config2) => {
    const defaultConfig = {
      ...config2
    };
    initialize.config.setConfig({
      defaultConfig
    });
    initializeWishlist().catch(console.error);
  },
  listeners: () => [events.on("authenticated", (authenticated) => {
    console.warn("WISHLIST events.on(authenticated): authenticated: ", authenticated);
    if (state.authenticated && !authenticated) {
      events.emit("wishlist/reset", void 0);
    }
    if (authenticated && !state.authenticated) {
      state.authenticated = authenticated;
      initializeWishlist().catch(console.error);
    }
  }, {
    eager: true
  }), events.on("wishlist/data", (payload) => {
    setPersistedWishlistData(payload);
  }), events.on("wishlist/reset", () => {
    resetWishlist().catch(console.error);
    events.emit("wishlist/data", null);
  })]
});
const config = initialize.config;
function transformStoreConfig(data) {
  if (!data) return null;
  return {
    wishlistIsEnabled: data.storeConfig.magento_wishlist_general_is_enabled,
    wishlistMultipleListIsEnabled: data.storeConfig.enable_multiple_wishlists,
    wishlistMaxNumber: data.storeConfig.maximum_number_of_wishlists
  };
}
const STORE_CONFIG_QUERY = `
query STORE_CONFIG_QUERY {
  storeConfig {
    magento_wishlist_general_is_enabled
    enable_multiple_wishlists
    maximum_number_of_wishlists
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
const GET_WISHLISTS_QUERY = (
  /* GraphQL */
  `
  query getWishlists {
    customer {
      wishlists {
        ...WISHLIST_FRAGMENT
      }
    }
  }

  ${WISHLIST_FRAGMENT}
`
);
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
const UPDATE_PRODUCTS_IN_WISHLIST_MUTATION = `
  mutation UPDATE_PRODUCTS_IN_WISHLIST_MUTATION(
      $wishlistId: ID!, 
      $wishlistItems: [WishlistItemUpdateInput!]!,
    ) {
    updateProductsInWishlist(
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
const updateProductsInWishlist = async (items) => {
  const wishlistId = state.wishlistId;
  if (!wishlistId) {
    throw Error("Wishlist ID is not set");
  }
  return fetchGraphQl(UPDATE_PRODUCTS_IN_WISHLIST_MUTATION, {
    variables: {
      wishlistId,
      wishlistItems: items.map(({
        wishlistItemId,
        quantity,
        description,
        selectedOptions: selected_options,
        enteredOptions: entered_options
      }) => ({
        wishlistItemId,
        quantity,
        description,
        selected_options,
        entered_options
      }))
    }
  }).then(({
    errors,
    data
  }) => {
    var _a;
    const _errors = [...((_a = data == null ? void 0 : data.updateProductsInWishlist) == null ? void 0 : _a.user_errors) ?? [], ...errors ?? []];
    if (_errors.length > 0) return handleFetchError(_errors);
    return transformWishlist(data.updateProductsInWishlist.wishlist);
  });
};
const resetWishlist = () => {
  state.wishlistId = null;
  state.authenticated = false;
  return Promise.resolve(null);
};
const initializeWishlist = async () => {
  if (state.initializing) return null;
  state.initializing = true;
  if (!state.config) {
    state.config = await getStoreConfig();
  }
  const payload = state.authenticated ? await getDefaultWishlist() : await getGuestWishlist();
  events.emit("wishlist/initialized", payload);
  events.emit("wishlist/data", payload);
  state.initializing = false;
  return payload;
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
export {
  a as addProductsToWishlist,
  config,
  fetchGraphQl,
  k as getConfig,
  getDefaultWishlist,
  getGuestWishlist,
  getPersistedWishlistData,
  g as getProductBySku,
  getStoreConfig,
  g2 as getWishlistById,
  getWishlists,
  initialize,
  initializeWishlist,
  i as removeFetchGraphQlHeader,
  r as removeProductsFromWishlist,
  resetWishlist,
  d as setEndpoint,
  e as setFetchGraphQlHeader,
  j as setFetchGraphQlHeaders,
  setPersistedWishlistData,
  updateProductsInWishlist
};
//# sourceMappingURL=api.js.map
