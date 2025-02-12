import { getSignInToken, performMonolithGraphQLQuery } from '../commerce.js';

const trackViewedProductMutation = `
mutation trackViewedProduct($sku: String!) {
  trackViewedProduct(sku: $sku)
}
`;

/**
 * Track a product was viewed
 * @param sku SKU of the product viewed
 * @returns {Promise<void>}
 */
export async function trackViewedProduct(sku) {
  const token = getSignInToken();

  const response = await performMonolithGraphQLQuery(
    trackViewedProductMutation,
    { sku },
    false,
    token,
  );

  return response;
}
