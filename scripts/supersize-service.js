import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from './commerce.js';

// Cache fetched variant data by parent SKU to avoid redundant network calls
const variantsCache = new Map();

/**
 * PAAS (traditional Adobe Commerce core GraphQL) query.
 * Fetches all variants of a configurable product along with their prices and attribute values.
 */
const PAAS_VARIANTS_QUERY = `
  query SupersizePAAS($parentSku: String!) {
    products(filter: { sku: { eq: $parentSku } }) {
      items {
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
          }
          variants {
            product {
              sku
              price_range {
                minimum_price {
                  final_price {
                    value
                    currency
                  }
                }
              }
            }
            attributes {
              code
              label
            }
          }
        }
      }
    }
  }
`;

/**
 * SAAS (Adobe Commerce Catalog Service) query.
 * Fetches option values for a configurable product. Prices must be resolved separately.
 */
const SAAS_OPTIONS_QUERY = `
  query SupersizeSAASOptions($parentSku: String!) {
    products(skus: [$parentSku]) {
      sku
      ... on ComplexProductView {
        options {
          id
          title
          required
          values {
            id
            title
            inStock
          }
        }
      }
    }
  }
`;

/**
 * SAAS query to resolve prices for a list of variant SKUs.
 */
const SAAS_PRICES_QUERY = `
  query SupersizeSAASPrices($skus: [String!]!) {
    products(skus: $skus) {
      sku
      ... on SimpleProductView {
        price {
          final {
            amount {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

/**
 * Attempts to fetch all configurable product variants using the PAAS core GraphQL approach.
 * Returns a normalized array or null if the approach fails / returns no data.
 *
 * @param {string} parentSku
 * @returns {Promise<Array|null>}
 */
async function fetchVariantsPAAS(parentSku) {
  try {
    const response = await CORE_FETCH_GRAPHQL.query(PAAS_VARIANTS_QUERY, { parentSku });
    const items = response?.data?.products?.items;
    if (!items?.length) return null;

    const product = items[0];
    if (!product?.variants?.length) return null;

    const attributeCodes = (product.configurable_options || []).map((opt) => opt.attribute_code);

    return product.variants.map((variant) => ({
      sku: variant.product.sku,
      price: variant.product.price_range?.minimum_price?.final_price?.value,
      currency: variant.product.price_range?.minimum_price?.final_price?.currency,
      attributes: (variant.attributes || []).reduce((acc, attr) => {
        acc[attr.code] = attr.label;
        return acc;
      }, {}),
      attributeCodes,
    }));
  } catch (err) {
    console.debug('[Supersize] PAAS query failed:', err.message || err);
    return null;
  }
}

/**
 * Attempts to fetch all configurable product variants using the SAAS Catalog Service approach.
 *
 * Step 1 – Queries the parent product for its option values (titles like "500", "1000", "2000").
 * Step 2 – Constructs candidate variant SKUs using the pattern `{parentSku}-{optionTitle}`.
 *           This heuristic is validated against the known currentVariantSku so it fails gracefully
 *           for stores that use a different SKU naming convention.
 * Step 3 – Queries the catalog service for the prices of those candidate SKUs.
 *
 * Returns a normalized array or null if the approach fails / returns no data.
 *
 * @param {string} parentSku
 * @param {string} currentVariantSku
 * @returns {Promise<Array|null>}
 */
async function fetchVariantsSAAS(parentSku, currentVariantSku) {
  try {
    // Step 1 – get option value titles from the parent ComplexProductView
    const parentResponse = await CS_FETCH_GRAPHQL.query(SAAS_OPTIONS_QUERY, { parentSku });
    const parentProducts = parentResponse?.data?.products;
    if (!parentProducts?.length) return null;

    const parent = parentProducts[0];
    const options = parent?.options;
    if (!options?.length) return null;

    // Use the first option that has multiple in-stock values
    const sizeOption = options.find((opt) => opt.values?.length > 1) || options[0];
    if (!sizeOption?.values?.length) return null;

    const inStockValues = sizeOption.values.filter((v) => v.inStock !== false);

    // Step 2 – validate the SKU pattern against the current variant
    const candidateSkus = inStockValues.map((v) => `${parentSku}-${v.title}`);
    if (!candidateSkus.includes(currentVariantSku)) {
      // SKU pattern doesn't match; cannot reliably determine variant SKUs in SAAS mode
      return null;
    }

    // Step 3 – fetch individual variant prices
    const pricesResponse = await CS_FETCH_GRAPHQL.query(SAAS_PRICES_QUERY, { skus: candidateSkus });
    const priceProducts = pricesResponse?.data?.products;
    if (!priceProducts?.length) return null;

    const priceMap = Object.fromEntries(
      priceProducts
        .filter((p) => p?.price?.final?.amount)
        .map((p) => [p.sku, { value: p.price.final.amount.value, currency: p.price.final.amount.currency }]),
    );

    const optionKey = (sizeOption.title || 'size').toLowerCase();
    return inStockValues
      .map((v) => {
        const sku = `${parentSku}-${v.title}`;
        const priceData = priceMap[sku];
        if (!priceData) return null;
        return {
          sku,
          price: priceData.value,
          currency: priceData.currency,
          attributes: { [optionKey]: v.title },
          attributeCodes: [optionKey],
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.debug('[Supersize] SAAS query failed:', err.message || err);
    return null;
  }
}

/**
 * Fetches all variants for a configurable product, trying PAAS first then SAAS.
 * Results are memoised by parent SKU for the lifetime of the page.
 *
 * @param {string} parentSku
 * @param {string} currentVariantSku
 * @returns {Promise<Array|null>}
 */
async function fetchProductVariants(parentSku, currentVariantSku) {
  if (variantsCache.has(parentSku)) return variantsCache.get(parentSku);

  const variants = (await fetchVariantsPAAS(parentSku))
    ?? (await fetchVariantsSAAS(parentSku, currentVariantSku));

  if (variants) variantsCache.set(parentSku, variants);
  return variants ?? null;
}

/**
 * From a list of variants and a given attribute code, returns the unique
 * numeric attribute values sorted ascending (e.g. [500, 1000, 2000]).
 *
 * @param {Array} variants
 * @param {string} attributeCode
 * @returns {number[]}
 */
function getSortedNumericValues(variants, attributeCode) {
  const seen = new Set();
  return variants
    .map((v) => parseFloat(v.attributes[attributeCode]))
    .filter((n) => !Number.isNaN(n) && !seen.has(n) && seen.add(n))
    .sort((a, b) => a - b);
}

/**
 * Given a cart item, determines whether there is a supersize (upgrade) option available
 * that yields a per-unit saving compared with buying additional units at the current price.
 *
 * Saving formula: (nextSize / currentSize) × currentPrice − nextVariantPrice > 0
 *
 * @param {import('../scripts/__dropins__/storefront-cart/data/models/cart-model').Item} cartItem
 * @returns {Promise<{sku: string, price: number, savings: number, currency: string, sizeLabel: string, attributeCode: string}|null>}
 */
export async function getSupersizeOption(cartItem) {
  const parentSku = cartItem.topLevelSku;
  const currentSku = cartItem.sku;

  // Only applies to configurable product variants
  if (!parentSku || !currentSku || parentSku === currentSku) return null;

  // price is a flat { value, currency } object on the cart Item model
  const currentPrice = cartItem.price?.value;
  if (!currentPrice) return null;

  const variants = await fetchProductVariants(parentSku, currentSku);
  if (!variants?.length) return null;

  const currentVariant = variants.find((v) => v.sku === currentSku);
  if (!currentVariant) return null;

  // Auto-detect the "size" attribute: first attribute whose value is numeric
  const attributeCodes = currentVariant.attributeCodes || Object.keys(currentVariant.attributes);
  const sizeAttributeCode = attributeCodes.find((code) => {
    const val = currentVariant.attributes[code];
    return val !== undefined && !Number.isNaN(parseFloat(val));
  });
  if (!sizeAttributeCode) return null;

  const currentSize = parseFloat(currentVariant.attributes[sizeAttributeCode]);
  const sortedSizes = getSortedNumericValues(variants, sizeAttributeCode);
  const currentIndex = sortedSizes.indexOf(currentSize);

  // No next size available
  if (currentIndex === -1 || currentIndex >= sortedSizes.length - 1) return null;

  const nextSize = sortedSizes[currentIndex + 1];
  const nextVariant = variants.find((v) => parseFloat(v.attributes[sizeAttributeCode]) === nextSize);
  if (!nextVariant?.price) return null;

  // Calculate the saving when upgrading: buying (nextSize/currentSize) units at current price
  // compared to the actual price of the next size
  const sizeFactor = nextSize / currentSize;
  const equivalentPrice = currentPrice * sizeFactor;
  const savings = Math.round((equivalentPrice - nextVariant.price) * 100) / 100;

  // Only show the button when there is a meaningful saving
  if (savings <= 0.01) return null;

  return {
    sku: nextVariant.sku,
    price: nextVariant.price,
    savings,
    currency: nextVariant.currency || cartItem.price.currency,
    sizeLabel: String(nextSize),
    attributeCode: sizeAttributeCode,
  };
}
