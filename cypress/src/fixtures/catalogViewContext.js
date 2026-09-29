/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

/**
 * Creates synthetic company catalog-view context for request-header assertions.
 *
 * @param {string} companyLabel - Stable label used to distinguish test contexts
 * @param {string|number} companyId - Company identifier expected on the context request
 * @returns {{companyId: string, catalogViewId: string, accessToken: string}}
 */
export function createCatalogViewContextFixture(companyLabel, companyId) {
  return {
    companyId: btoa(String(companyId)),
    catalogViewId: `test-company-${companyLabel}-view-${companyId}`,
    accessToken: `test-company-${companyLabel}-access-token`,
  };
}

/**
 * Builds the GraphQL response returned by GET_CATALOG_VIEW_CONTEXT.
 *
 * @param {{catalogViewId: string, accessToken: string}} context - Synthetic context
 * @returns {Object} GraphQL response fixture
 */
export function createCatalogViewContextResponseFixture(context) {
  return {
    data: {
      company: {
        catalogViewContext: {
          catalogViewId: context.catalogViewId,
          accessToken: context.accessToken,
        },
      },
    },
  };
}

function createProductFixture(path) {
  const [sku, urlKey] = path.split('/').filter(Boolean).reverse();
  const amount = {
    currency: 'USD',
    value: 10,
  };

  return {
    __typename: 'SimpleProductView',
    sku,
    name: `Catalog context test product ${sku}`,
    url: path,
    urlKey,
    externalId: sku,
    inStock: true,
    addToCartAllowed: true,
    shortDescription: '',
    description: '',
    metaDescription: '',
    metaKeyword: '',
    metaTitle: '',
    images: [],
    attributes: [],
    options: [],
    price: {
      roles: ['visible'],
      regular: { amount },
      final: { amount },
      tiers: [],
    },
  };
}

/**
 * Builds an isolated Catalog Service response for the PDP race probe.
 *
 * @param {string} query - GraphQL query from the intercepted request
 * @param {string} productPath - PDP path used by the current test phase
 * @returns {Object} GraphQL response fixture
 */
export function createCatalogServiceResponseFixture(query, productPath) {
  if (query.includes('recommendationsByUnitIds')) {
    return {
      data: {
        recommendationsByUnitIds: {
          results: [],
          totalResults: 0,
        },
      },
    };
  }

  return {
    data: {
      products: [createProductFixture(productPath)],
    },
  };
}
