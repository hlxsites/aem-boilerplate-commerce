const CONCURRENCY = 4;

function warn(context, stage, code, sku, item) {
  context.signal?.throwIfAborted();
  const warning = {
    stage,
    code,
    skus: [sku],
    itemUids: item ? [item.uid] : [],
  };
  if (context.onWarning) context.onWarning(warning);
  else console.warn('Requisition list supplemental data warning:', warning);
}

function rethrowCancellation(error, context) {
  context.signal?.throwIfAborted();
  if (error?.name === 'AbortError') throw error;
}

async function mapBounded(values, callback, context) {
  const results = new Array(values.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, values.length) }, async () => {
    while (next < values.length) {
      context.signal?.throwIfAborted();
      const index = next;
      next += 1;
      // Each worker must finish its request before taking another queue entry.
      // eslint-disable-next-line no-await-in-loop
      results[index] = await callback(values[index]);
      context.signal?.throwIfAborted();
    }
  }));
  context.signal?.throwIfAborted();
  return results;
}

function visiblePrice(product) {
  // Read only exact, explicitly visible amounts; never infer a total from a range.
  if (!product.price?.roles?.includes('visible')) return undefined;
  const price = {};
  ['final', 'regular'].forEach((kind) => {
    const amount = product.price[kind]?.amount;
    if (Number.isFinite(amount?.value) && amount.currency) {
      price[kind] = { amount: { value: amount.value, currency: amount.currency } };
    }
  });
  return price;
}

function normalizeProduct(product) {
  const {
    price: _price, priceRange: _priceRange, prices: _prices, ...data
  } = product;
  return {
    ...data,
    sku: product.variantSku || product.sku,
    name: product.variantName || product.name,
    url: product.url ?? '',
    urlKey: product.urlKey ?? '',
    images: (product.images ?? [])
      .filter((image) => !image.roles?.includes('hide_from_pdp'))
      .map((image) => ({
        url: image.url,
        label: image.label ?? '',
        roles: image.roles ?? [],
      })),
    price: visiblePrice(product),
  };
}

/**
 * Adapt the installed PDP raw-response APIs without changing shared PDP configuration.
 * Requests cannot be cancelled by these PDP APIs; late results are discarded.
 */
export function createRequisitionListAdapters(pdp) {
  const getProductData = async (skus, context = {}) => {
    const results = await mapBounded(skus, async (sku) => {
      let product;
      try {
        product = await pdp.getProductData(sku, { preselectFirstOption: false }, true);
      } catch (error) {
        rethrowCancellation(error, context);
        warn(context, 'products', 'request-failed', sku);
        return null;
      }
      context.signal?.throwIfAborted();
      if (!product) {
        warn(context, 'products', 'data-unavailable', sku);
        return null;
      }
      return normalizeProduct(product);
    }, context);
    return results.filter(Boolean);
  };

  const enrichConfigurableProducts = async (items, context = {}) => {
    const parents = new Map();
    return mapBounded(items, async (item) => {
      const opts = item.configurable_options;
      if (!opts?.length) return item;
      const { sku } = item;
      let parent;
      try {
        if (!parents.has(sku)) {
          parents.set(sku, pdp.getProductData(sku, { preselectFirstOption: false }, true));
        }
        parent = await parents.get(sku);
      } catch (error) {
        rethrowCancellation(error, context);
        warn(context, 'configurables', 'request-failed', sku, item);
        return item;
      }
      context.signal?.throwIfAborted();
      const optionIds = opts.map((selected) => parent?.options
        ?.find((option) => option.title === selected.option_label)
        ?.values?.find((value) => value.title === selected.value_label)?.id);
      if (optionIds.some((id) => !id)) {
        warn(context, 'configurables', 'data-unavailable', sku, item);
        return item;
      }
      let configured;
      try {
        configured = await pdp.getRefinedProduct(sku, optionIds, undefined, true);
      } catch (error) {
        rethrowCancellation(error, context);
        warn(context, 'configurables', 'request-failed', sku, item);
        return item;
      }
      context.signal?.throwIfAborted();
      // PDP returns the parent when refinement fails; only accept a resolved variant.
      if (!configured?.variantSku || configured.__typename !== 'SimpleProductView') {
        warn(context, 'configurables', 'data-unavailable', sku, item);
        return item;
      }
      const product = normalizeProduct(configured);
      if (!product.price?.final) {
        warn(context, 'configurables', 'price-unavailable', sku, item);
      }
      return { ...item, configured_product: product };
    }, context);
  };

  return { getProductData, enrichConfigurableProducts };
}
