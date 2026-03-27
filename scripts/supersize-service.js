/* eslint-disable no-console */
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL } from "./commerce.js";

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
 * NOTE: On some SAAS environments the Catalog Service does not index simple variant products
 * as standalone queryable entities, so this query may return an empty products array.
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

// ---------------------------------------------------------------------------
// Private fetch helpers
// ---------------------------------------------------------------------------

/**
 * Normalises a raw PAAS variants array into the common variant shape.
 * Shared between fetchVariantsPAAS and fetchVariantsPAASviaCS.
 */
function normalisePAASResponse(data) {
  const items = data?.products?.items;
  if (!items?.length) return null;

  const product = items[0];
  if (!product?.variants?.length) return null;

  const attributeCodes = (product.configurable_options || []).map(
    (opt) => opt.attribute_code,
  );

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
}

/**
 * PAAS via CORE_FETCH_GRAPHQL — works for traditional on-premise / PAAS environments.
 */
async function fetchVariantsPAAS(parentSku) {
  try {
    console.log("[Supersize] trying PAAS (CORE) for:", parentSku);
    const response = await CORE_FETCH_GRAPHQL.fetchGraphQl(
      PAAS_VARIANTS_QUERY,
      {
        variables: { parentSku },
      },
    );
    console.log(
      "[Supersize] PAAS-CORE raw data:",
      JSON.stringify(response?.data),
    );
    const result = normalisePAASResponse(response?.data);
    if (!result) console.log("[Supersize] PAAS-CORE: no usable data");
    return result;
  } catch (err) {
    console.log("[Supersize] PAAS-CORE threw:", err.message || err);
    return null;
  }
}

/**
 * PAAS via CS_FETCH_GRAPHQL — same PAAS query but sent with the Catalog Service auth headers.
 *
 * In SAAS environments the endpoint at api.commerce.adobe.com supports the core Magento
 * GraphQL schema but requires the CS auth headers (x-api-key, Magento-Environment-Id, …)
 * that CORE_FETCH_GRAPHQL does not carry. Sending the traditional products(filter:…) query
 * with CS headers allows us to get per-variant prices on SAAS deployments.
 */
async function fetchVariantsPAASviaCS(parentSku) {
  try {
    console.log("[Supersize] trying PAAS (CS headers) for:", parentSku);
    const response = await CS_FETCH_GRAPHQL.fetchGraphQl(PAAS_VARIANTS_QUERY, {
      variables: { parentSku },
    });
    console.log(
      "[Supersize] PAAS-CS raw data:",
      JSON.stringify(response?.data),
    );
    const result = normalisePAASResponse(response?.data);
    if (!result) console.log("[Supersize] PAAS-CS: no usable data");
    return result;
  } catch (err) {
    console.log("[Supersize] PAAS-CS threw:", err.message || err);
    return null;
  }
}

/**
 * SAAS Catalog Service approach — last resort.
 *
 * Step 1 – Queries the parent product for its option values (titles like "500", "1000", "2000").
 * Step 2 – Constructs candidate variant SKUs using the pattern `{parentSku}-{optionTitle}`.
 *           This heuristic is validated against the known currentVariantSku so it fails
 *           gracefully for stores that use a different SKU naming convention.
 * Step 3 – Fetches individual variant prices. On some SAAS deployments the Catalog Service
 *           does NOT index simple variants as standalone products, so this may return empty
 *           and the entire SAAS path will yield null (button will not be shown).
 */
async function fetchVariantsSAAS(parentSku, currentVariantSku) {
  try {
    console.log("[Supersize] trying SAAS options query for:", parentSku);
    const parentResponse = await CS_FETCH_GRAPHQL.fetchGraphQl(
      SAAS_OPTIONS_QUERY,
      {
        variables: { parentSku },
      },
    );
    console.log(
      "[Supersize] SAAS options raw data:",
      JSON.stringify(parentResponse?.data),
    );

    const parentProducts = parentResponse?.data?.products;
    if (!parentProducts?.length) {
      console.log("[Supersize] SAAS: no products returned for parent SKU");
      return null;
    }

    const parent = parentProducts[0];
    const options = parent?.options;
    console.log("[Supersize] SAAS options found:", options);
    if (!options?.length) {
      console.log(
        "[Supersize] SAAS: product has no options (not a ComplexProductView?)",
      );
      return null;
    }

    // Use the first option that has multiple in-stock values
    const sizeOption =
      options.find((opt) => opt.values?.length > 1) || options[0];
    if (!sizeOption?.values?.length) return null;

    const inStockValues = sizeOption.values.filter((v) => v.inStock !== false);

    // Validate the SKU pattern: {parentSku}-{optionTitle}
    const candidateSkus = inStockValues.map((v) => `${parentSku}-${v.title}`);
    console.log(
      "[Supersize] SAAS candidate SKUs:",
      candidateSkus,
      "— current:",
      currentVariantSku,
    );
    if (!candidateSkus.includes(currentVariantSku)) {
      console.log(
        "[Supersize] \u2717 SAAS: SKU pattern mismatch — button cannot be shown",
      );
      return null;
    }

    // Fetch individual variant prices
    console.log("[Supersize] SAAS fetching prices for:", candidateSkus);
    const pricesResponse = await CS_FETCH_GRAPHQL.fetchGraphQl(
      SAAS_PRICES_QUERY,
      {
        variables: { skus: candidateSkus },
      },
    );
    console.log(
      "[Supersize] SAAS prices raw data:",
      JSON.stringify(pricesResponse?.data),
    );

    const priceProducts = pricesResponse?.data?.products;
    if (!priceProducts?.length) {
      console.log(
        "[Supersize] SAAS: variant price query returned empty — variants not indexed in CS",
      );
      return null;
    }

    const priceMap = Object.fromEntries(
      priceProducts
        .filter((p) => p?.price?.final?.amount)
        .map((p) => [
          p.sku,
          {
            value: p.price.final.amount.value,
            currency: p.price.final.amount.currency,
          },
        ]),
    );
    console.log("[Supersize] SAAS priceMap:", priceMap);

    const optionKey = (sizeOption.title || "size").toLowerCase();
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
    console.log("[Supersize] SAAS threw:", err.message || err);
    return null;
  }
}

/**
 * Fetches all variants for a configurable product.
 *
 * Resolution order:
 *   1. PAAS via CORE_FETCH_GRAPHQL   – traditional PAAS environments
 *   2. PAAS via CS_FETCH_GRAPHQL     – SAAS environments (CS auth headers required)
 *   3. SAAS Catalog Service fallback – last resort; may not yield prices on all setups
 *
 * Results are memoised by parent SKU for the lifetime of the page.
 */
async function fetchProductVariants(parentSku, currentVariantSku) {
  if (variantsCache.has(parentSku)) return variantsCache.get(parentSku);

  const variants =
    (await fetchVariantsPAAS(parentSku)) ??
    (await fetchVariantsPAASviaCS(parentSku)) ??
    (await fetchVariantsSAAS(parentSku, currentVariantSku));

  if (variants) variantsCache.set(parentSku, variants);
  return variants ?? null;
}

// ---------------------------------------------------------------------------
// Size helpers
// ---------------------------------------------------------------------------

/**
 * From a list of variants and a given attribute code, returns the unique
 * numeric attribute values sorted ascending (e.g. [500, 1000, 2000]).
 */
function getSortedNumericValues(variants, attributeCode) {
  const seen = new Set();
  return variants
    .map((v) => parseFloat(v.attributes[attributeCode]))
    .filter((n) => !Number.isNaN(n) && !seen.has(n) && seen.add(n))
    .sort((a, b) => a - b);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Given a cart item, determines whether there is a supersize (upgrade) option available
 * that yields a per-unit saving compared with buying additional units at the current price.
 *
 * Saving formula: (nextSize / currentSize) × currentPrice − nextVariantPrice > 0
 *
 * @param {object} cartItem - Cart item from the dropin (see cart-model.d.ts Item interface)
 * @returns {Promise<object|null>}
 */
export async function getSupersizeOption(cartItem) {
  const parentSku = cartItem.topLevelSku;
  const currentSku = cartItem.sku;

  console.log("[Supersize] evaluating item:", {
    itemType: cartItem.itemType,
    sku: currentSku,
    topLevelSku: parentSku,
    price: cartItem.price,
  });

  if (!parentSku || !currentSku) {
    console.log("[Supersize] \u2717 missing parentSku or currentSku");
    return null;
  }
  if (parentSku === currentSku) {
    console.log(
      "[Supersize] \u2717 parentSku === currentSku — variantSku may not be set",
    );
    return null;
  }

  const currentPrice = cartItem.price?.value;
  if (!currentPrice) {
    console.log("[Supersize] \u2717 no price value on cart item");
    return null;
  }

  const variants = await fetchProductVariants(parentSku, currentSku);
  console.log("[Supersize] variants fetched:", variants);
  if (!variants?.length) {
    console.log("[Supersize] \u2717 no variants returned");
    return null;
  }

  const currentVariant = variants.find((v) => v.sku === currentSku);
  console.log("[Supersize] currentVariant match:", currentVariant);
  if (!currentVariant) {
    console.log(
      "[Supersize] \u2717 current variant SKU not found in variants list",
    );
    return null;
  }

  // Auto-detect the "size" attribute: first attribute whose value is numeric
  const attributeCodes =
    currentVariant.attributeCodes || Object.keys(currentVariant.attributes);
  const sizeAttributeCode = attributeCodes.find((code) => {
    const val = currentVariant.attributes[code];
    return val !== undefined && !Number.isNaN(parseFloat(val));
  });
  console.log(
    "[Supersize] sizeAttributeCode:",
    sizeAttributeCode,
    "attrs:",
    currentVariant.attributes,
  );
  if (!sizeAttributeCode) {
    console.log("[Supersize] \u2717 no numeric size attribute detected");
    return null;
  }

  const currentSize = parseFloat(currentVariant.attributes[sizeAttributeCode]);
  const sortedSizes = getSortedNumericValues(variants, sizeAttributeCode);
  const currentIndex = sortedSizes.indexOf(currentSize);
  console.log(
    "[Supersize] sizes:",
    sortedSizes,
    "currentSize:",
    currentSize,
    "index:",
    currentIndex,
  );

  if (currentIndex === -1 || currentIndex >= sortedSizes.length - 1) {
    console.log("[Supersize] \u2717 no next size available");
    return null;
  }

  const nextSize = sortedSizes[currentIndex + 1];
  const nextVariant = variants.find(
    (v) => parseFloat(v.attributes[sizeAttributeCode]) === nextSize,
  );
  if (!nextVariant?.price) {
    console.log("[Supersize] \u2717 next variant has no price:", nextVariant);
    return null;
  }

  const sizeFactor = nextSize / currentSize;
  const equivalentPrice = currentPrice * sizeFactor;
  const savings = Math.round((equivalentPrice - nextVariant.price) * 100) / 100;
  console.log("[Supersize] savings:", {
    currentPrice,
    sizeFactor,
    equivalentPrice,
    nextVariantPrice: nextVariant.price,
    savings,
  });

  if (savings <= 0.01) {
    console.log("[Supersize] \u2717 saving too small:", savings);
    return null;
  }

  console.log("[Supersize] \u2713 showing button:", {
    nextSku: nextVariant.sku,
    savings,
    sizeLabel: String(nextSize),
  });
  return {
    sku: nextVariant.sku,
    price: nextVariant.price,
    savings,
    currency: nextVariant.currency || cartItem.price.currency,
    sizeLabel: String(nextSize),
    attributeCode: sizeAttributeCode,
  };
}
