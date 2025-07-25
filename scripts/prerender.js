import * as pdpApi from '@dropins/storefront-pdp/api.js';

const priceFieldsFragment = `fragment priceFields on ProductViewPrice {
  roles
  regular {
      amount {
          currency
          value
      }
  }
  final {
      amount {
          currency
          value
      }
  }
}`;
const productDetailPriceQuery = `query ProductQuery($sku: String!) {
  products(skus: [$sku]) {
    ... on SimpleProductView {
      price {
        ...priceFields
      }
    }
    ... on ComplexProductView {
      priceRange {
        maximum {
          ...priceFields
        }
        minimum {
          ...priceFields
        }
      }
    }
  }
}
${priceFieldsFragment}`;

const productsCache = {};
export async function getProductPrice(sku) {
  // eslint-disable-next-line no-param-reassign
  sku = sku.toUpperCase();
  if (productsCache[sku]) {
    return productsCache[sku];
  }
  // TODO replace with fetchGraphql
  const rawProductPromise = await pdpApi.fetchGraphQl(productDetailPriceQuery, { sku });
  const productPromise = rawProductPromise.then((productData) => {
    if (!productData?.products?.[0]) {
      return null;
    }

    return productData?.products?.[0];
  });

  productsCache[sku] = productPromise;
  return productPromise;
}

export function checkSSGPage() {
  const metaSku = document.querySelector('meta[name="sku"]');
  return metaSku?.content?.trim()?.length > 0;
}

function parseProductName(productDetails) {
  const name = productDetails.querySelector('h1')?.textContent?.trim();
  return name;
}

function parseProductImages(productDetails) {
  const imagesHeading = productDetails.querySelector('h2#images');
  const imagesList = imagesHeading?.closest('div')?.nextElementSibling?.querySelector('ul');
  const images = Array.from(imagesList?.querySelectorAll('li img') || [])
    .map((img) => img.src);
  return images;
}

function parseProductDescription(productDetails) {
  const descriptionHeadingDiv = productDetails.querySelector('h2#description')?.parentElement;
  const descriptionDiv = descriptionHeadingDiv?.nextElementSibling;
  const description = descriptionDiv?.textContent?.trim();

  return description;
}

function getCurrencyCode(priceText) {
  const currencySymbolToCode = {
    // eslint-disable-next-line quote-props
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    '₹': 'INR',
    '₩': 'KRW',
    '₽': 'RUB',
    '₫': 'VND',
    '₪': 'ILS',
    '₱': 'PHP',
    '฿': 'THB',
    '₦': 'NGN',
    '₴': 'UAH',
    '₭': 'LAK',
    '₲': 'PYG',
    '₡': 'CRC',
    '₵': 'GHS',
  };

  const match = priceText.match(/[\p{Sc}]/u);
  if (match) {
    const symbol = match[0];
    return currencySymbolToCode[symbol] || null;
  }
  return ''; // TODO SSG: Should there be some other default value?
}

function parseProductPrice(productDetails) {
  const priceHeading = productDetails.querySelector('h2#price');
  const priceContainer = priceHeading?.closest('div');
  const priceDiv = priceContainer?.nextElementSibling;
  const priceText = priceDiv?.textContent?.trim();
  const currencyCode = getCurrencyCode(priceText);

  if (!priceText) {
    return null;
  }

  if (priceText.includes('-')) {
    const [minPrice, maxPrice] = priceText.split('-').map((p) => parseFloat(p.replace(/[^0-9.]/g, '')));
    return {
      type: 'range',
      minimum: minPrice,
      maximum: maxPrice,
      currency: currencyCode,
    };
  }

  const value = parseFloat(priceText.replace(/[^0-9.]/g, ''));
  if (Number.isNaN(value)) {
    return null;
  }

  return {
    type: 'simple',
    value,
    currency: currencyCode,
  };
}

function parseProductOptions(html) {
  const doc = html;
  const options = [];
  doc.querySelectorAll('div:has(#options) > div > ul > li').forEach((optionElement) => {
    const [title, id, required] = Array.from(optionElement.querySelectorAll(':scope > p')).map((p) => p.innerText);
    const option = {
      id,
      type: 'dropdown', //  SSG: Is this always supposed to be a dropdown? If not, how do we figure out the type?
      label: title,
      required,
      items: [],
    };

    optionElement.querySelectorAll('ul > li').forEach((itemElement) => {
      const [optionTitle, optionId, inStock] = Array.from(itemElement.querySelectorAll(':scope > p')).map((div) => div.innerText);
      const item = {
        id: optionId,
        label: optionTitle,
        value: optionId,
        selected: 'false',
        inStock,
      };
      option.items.push(item);
    });
    options.push(option);
  });

  return options.length > 0 ? options : [];
}

/**
 * Parses product data from the SSG page
 * @returns {Object} Raw parsed product data
 */
export async function parseSsgData() {
  const productDetails = document.querySelector('.product-details');
  if (!productDetails) {
    return null;
  }

  window.product = window.product || {};

  const metaTags = document.querySelectorAll('meta[name]');
  const metaData = {};

  metaTags.forEach((tag) => {
    const key = tag.name;
    metaData[key] = tag.content;
  });

  const pageData = {
    name: parseProductName(productDetails),
    images: parseProductImages(productDetails),
    description: parseProductDescription(productDetails),
    options: parseProductOptions(productDetails),
  };

  const priceData = parseProductPrice(productDetails);
  if (priceData) {
    pageData.price = priceData;
  } else {
    if (!window.getProductPromise) {
      window.getProductPromise = getProductPrice(metaData.sku);
    }
    const product = await window.getProductPromise;

    if (product.price) {
      pageData.price = {
        type: 'simple',
        value: Math.min(product.price.regular.amount.value, product.price.final.amount.value),
        currency: product.price.regular.amount.currency,
      };
    }
    if (product.priceRange) {
      pageData.price = {
        type: 'range',
        minimum: Math.min(
          product.priceRange.minimum.regular.amount.value,
          product.priceRange.minimum.final.amount.value,
        ),
        maximum: Math.min(
          product.priceRange.maximum.regular.amount.value,
          product.priceRange.maximum.final.amount.value,
        ),
        currency: product.priceRange.minimum.regular.amount.currency,
      };
    }
  }

  window.product = {
    ...metaData,
    ...pageData,
  };

  return window.product;
}

/**
 * Checks product __typename and returns the product type and typename
 * @returns {Array} Array containing product type and typename
 */
function getProductTypeValues(parsedData) {
  const result = [];

  switch (parsedData.__typename) {
    case 'SimpleProductView':
      result.push('simple');
      result.push('SimpleProductView');
      break;
    case 'ConfigurableProductView':
      result.push('configurable');
      result.push('ConfigurableProductView');
      break;
    case 'ComplexProductView':
      result.push('complex');
      result.push('ComplexProductView');
      break;
    default:
      result.push('simple');
      result.push('SimpleProductView');
  }

  return result;
}

/**
 * Transforms parsed data into PDP format
 * @param {Object} parsedData Raw parsed product data
 * @returns {Object} Transformed data in PDP format
 */
export function transformToPdpFormat(parsedData) {
  const transformedData = {
    name: parsedData.name || parsedData.twitter_title,
    sku: parsedData.sku,
    description: parsedData.description,
    shortDescription: parsedData.description,
    images: parsedData.images?.map((url) => ({
      url,
      label: '',
      roles: [],
    })) || [],
    isBundle: false,
    addToCartAllowed: true,
    inStock: true,
    urlKey: window.location.pathname.split('/')[2],
    url: window.location.href,
  };
  [transformedData.productType, transformedData.__typename] = getProductTypeValues(parsedData);

  if (parsedData.price?.type === 'range') {
    transformedData.priceRange = {
      minimum: {
        regular: {
          amount: {
            value: parsedData.price.minimum || 0,
            currency: parsedData.price.currency || 'USD',
          },
        },
        final: {
          amount: {
            value: parsedData.price.minimum || 0,
            currency: parsedData.price.currency || 'USD',
          },
        },
        roles: ['visible'],
      },
      maximum: {
        regular: {
          amount: {
            value: parsedData.price.maximum || 0,
            currency: parsedData.price.currency || 'USD',
          },
        },
        final: {
          amount: {
            value: parsedData.price.maximum || 0,
            currency: parsedData.price.currency || 'USD',
          },
        },
        roles: ['visible'],
      },
    };
  } else if (parsedData.price) {
    transformedData.price = {
      roles: ['visible'],
      regular: {
        amount: {
          value: parsedData.price.value || 0,
          currency: parsedData.price.currency || 'USD',
        },
      },
      final: {
        amount: {
          value: parsedData.price.value || 0,
          currency: parsedData.price.currency || 'USD',
        },
      },
    };
  }

  if (parsedData.options?.length > 0) {
    transformedData.options = parsedData.options.map((option) => ({
      id: option.id,
      type: option.type,
      typename: option.typename,
      title: option.title || option.label,
      required: option.required,
      multiple: option.multiple,
      values: (option.values || option.items || []).map((value) => ({
        id: value.id,
        title: value.title || value.label,
        value: value.value,
        selected: value.selected,
        inStock: value.inStock,
      })),
    }));
  }

  return transformedData;
}
