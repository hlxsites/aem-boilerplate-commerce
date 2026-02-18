import { initializers } from '@dropins/tools/initializer.js';
import {
  initialize,
  setEndpoint,
  setFetchGraphQlHeaders,
  setFetchGraphQlHeader,
  removeFetchGraphQlHeader,
  config as requisitionListConfig,
} from '@dropins/storefront-requisition-list/api.js';
import {
  getProductData as pdpGetProductData,
  getRefinedProduct as pdpGetRefinedProduct,
} from '@dropins/storefront-pdp/api.js';
import { initializeDropin } from './index.js';
import { CS_FETCH_GRAPHQL, commerceEndpointWithQueryParams, fetchPlaceholders } from '../commerce.js';
import { getHeaders } from '@dropins/tools/lib/aem/configs.js';
import { getCookie } from '@dropins/tools/lib.js';
import { events } from '@dropins/tools/event-bus.js';

// Normalize product to requisition list Product shape (url, urlKey, images[].url, and price for table display)
function ensureProductShape(product) {
  if (!product) return product;
  const url = product.url ?? product.canonicalUrl ?? '';
  const urlKey = product.urlKey ?? product.url_key ?? '';
  const images = Array.isArray(product.images)
    ? product.images.map((img) => ({
        url: img?.url ?? '',
        label: img?.label ?? '',
        roles: Array.isArray(img?.roles) ? img.roles : [],
      }))
    : [];
  // Requisition list table expects product.price.final.amount.{ value, currency }.
  // PDP can return: (1) price.final.amount (GraphQL object or number), (2) prices.final.{ amount, currency } (transformed), or (3) priceRange (complex).
  let price = product.price;
  if (price?.final?.amount != null && typeof price.final.amount === 'object' && 'value' in price.final.amount) {
    // Already GraphQL shape: price.final.amount.value/currency
  } else if (price?.final?.amount != null && typeof price.final.amount === 'number') {
    price = { final: { amount: { value: price.final.amount, currency: price.final?.currency ?? '' } } };
  } else if (product.prices?.final != null) {
    // PDP transformed shape: prices.final.amount (number), prices.final.currency (string)
    const pf = product.prices.final;
    price = {
      final: { amount: { value: pf.amount ?? 0, currency: pf.currency ?? '' } },
      regular: product.prices.regular != null ? { amount: { value: product.prices.regular.amount ?? 0, currency: product.prices.regular.currency ?? '' } } : undefined,
    };
  } else if (product.priceRange?.minimum?.final?.amount != null) {
    price = {
      final: { amount: product.priceRange.minimum.final.amount },
      regular: product.priceRange.minimum.regular,
    };
  }
  return {
    ...product,
    url,
    urlKey,
    images,
    ...(price != null && { price }),
  };
}

// Adapter: PDP getProductData(sku) => single product; requisition list expects getProductData(skus) => products[]
// Exported so blocks can pass them explicitly to RequisitionListView (required props).
export const getProductData = async (skus) => {
  const results = await Promise.all(skus.map((sku) => pdpGetProductData(sku)));
  return results.filter(Boolean).map(ensureProductShape);
};

// Use PDP getRefinedProduct to enrich requisition list items that have configurable options
export const enrichConfigurableProducts = async (items) => {
  if (!items?.length) return items;
  return Promise.all(
    items.map(async (item) => {
      const product = item.product;
      const opts = item.configurable_options;
      if (!product?.sku || !opts?.length) return item;
      const optionIds = opts.map((o) => {
        const optionUid = o.option_uid ?? o.configurable_product_option_uid;
        const valueUid = o.value_uid ?? o.configurable_product_option_value_uid;
        return btoa(`configurable/${atob(optionUid)}/${atob(valueUid)}`);
      });
      try {
        const configured = await pdpGetRefinedProduct(product.sku, optionIds);
        if (!configured) return item;
        const images = Array.isArray(configured.images)
          ? configured.images.map((img) => ({ url: img?.url ?? '' }))
          : [];
        return { ...item, configured_product: { ...configured, images } };
      } catch {
        return item;
      }
    }),
  );
};

await initializeDropin(async () => {
  // Set Fetch GraphQL (Catalog Service) – pass URL string so the drop-in uses the same endpoint
  // (passing the instance can fail across bundles due to different FetchGraphQL class reference)
  let endpoint =
    (typeof CS_FETCH_GRAPHQL?.endpoint === 'string' && CS_FETCH_GRAPHQL.endpoint) ||
    (CS_FETCH_GRAPHQL?.endpoint?.href?.toString?.()) ||
    '';
  if (!endpoint) {
    const url = await commerceEndpointWithQueryParams();
    endpoint = url?.href ?? '';
  }
  if (!endpoint) {
    throw new Error('Requisition list: Commerce GraphQL endpoint not available. Ensure commerce is initialized.');
  }
  setEndpoint(endpoint);
  // Fallback for drop-in chunks that may use a different FetchGraphQL instance (fixes "Missing url")
  (typeof globalThis !== 'undefined' ? globalThis : window)['__REQUISITION_LIST_GRAPHQL_ENDPOINT__'] = endpoint;
  // Use same Catalog Service auth headers as the host (required for customer/requisition list APIs)
  setFetchGraphQlHeaders((prev) => ({ ...prev, ...getHeaders('cs') }));
  // Auth and customer-group are set on CS_FETCH_GRAPHQL in main initializer but not in getHeaders('cs') – sync them
  const token = getCookie('auth_dropin_user_token');
  if (token) setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  events.on('authenticated', (state) => {
    if (state) {
      const t = getCookie('auth_dropin_user_token');
      if (t) setFetchGraphQlHeader('Authorization', `Bearer ${t}`);
    } else {
      removeFetchGraphQlHeader('Authorization');
    }
  }, { eager: true });
  events.on('auth/group-uid', (customerGroupId) => {
    setFetchGraphQlHeader('Magento-Customer-Group', customerGroupId);
  }, { eager: true });

  // Fetch placeholders
  const labels = await fetchPlaceholders('placeholders/requisition-list.json');

  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  const initConfig = {
    langDefinitions,
    getProductData,
    enrichConfigurableProducts,
  };

  await initializers.mountImmediately(initialize, initConfig);

  // Ensure config has our functions (in case the package merge missed them or view reads config later)
  if (typeof requisitionListConfig?.setConfig === 'function') {
    requisitionListConfig.setConfig(initConfig);
  }
})();
