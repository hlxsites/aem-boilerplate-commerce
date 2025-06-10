/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
import { events } from '@dropins/tools/event-bus.js';
import {
  buildBlock,
  decorateBlocks,
  decorateButtons,
  decorateIcons,
  decorateSections,
  decorateTemplateAndTheme,
  loadFooter,
  loadHeader,
  getMetadata,
  loadScript,
  toCamelCase,
  toClassName,
  readBlockConfig,
  waitForFirstImage,
  loadSection,
  loadSections,
  loadCSS,
  sampleRUM,
} from './aem.js';
import { trackHistory } from './commerce.js';
import initializeDropins from './initializers/index.js';
import { initializeConfig, getRootPath, getListOfRootPaths } from './configs.js';

const AUDIENCES = {
  mobile: () => window.innerWidth < 600,
  desktop: () => window.innerWidth >= 600,
  // define your custom audiences here as needed
};

/**
 * Gets all the metadata elements that are in the given scope.
 * @param {String} scope The scope/prefix for the metadata
 * @returns an array of HTMLElement nodes that match the given scope
 */
export function getAllMetadata(scope) {
  return [...document.head.querySelectorAll(`meta[property^="${scope}:"],meta[name^="${scope}-"]`)]
    .reduce((res, meta) => {
      const id = toClassName(meta.name
        ? meta.name.substring(scope.length + 1)
        : meta.getAttribute('property').split(':')[1]);
      res[id] = meta.getAttribute('content');
      return res;
    }, {});
}

// Define an execution context
const pluginContext = {
  getAllMetadata,
  getMetadata,
  loadCSS,
  loadScript,
  sampleRUM,
  toCamelCase,
  toClassName,
};

/**
 * Builds hero block and prepends to main in a new section.
 * @param {Element} main The container element
 */
function buildHeroBlock(main) {
  const h1 = main.querySelector('h1');
  const picture = main.querySelector('picture');
  // eslint-disable-next-line no-bitwise
  if (h1 && picture && (h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING)) {
    const section = document.createElement('div');
    section.append(buildBlock('hero', { elems: [picture, h1] }));
    main.prepend(section);
  }
}

/**
 * load fonts.css and set a session storage flag
 */
async function loadFonts() {
  await loadCSS(`${window.hlx.codeBasePath}/styles/fonts.css`);
  try {
    if (!window.location.hostname.includes('localhost')) sessionStorage.setItem('fonts-loaded', 'true');
  } catch (e) {
    // do nothing
  }
}

function autolinkModals(element) {
  element.addEventListener('click', async (e) => {
    const origin = e.target.closest('a');

    if (origin && origin.href && origin.href.includes('/modals/')) {
      e.preventDefault();
      const { openModal } = await import(`${window.hlx.codeBasePath}/blocks/modal/modal.js`);
      openModal(origin.href);
    }
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  try {
    buildHeroBlock(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Decorate Columns Template to the main element.
 * @param {Element} main The container element
 */
function buildTemplateColumns(doc) {
  const columns = doc.querySelectorAll('main > div.section[data-column-width]');

  columns.forEach((column) => {
    const columnWidth = column.getAttribute('data-column-width');
    const gap = column.getAttribute('data-gap');

    if (columnWidth) {
      column.style.setProperty('--column-width', columnWidth);
      column.removeAttribute('data-column-width');
    }

    if (gap) {
      column.style.setProperty('--gap', `var(--spacing-${gap.toLocaleLowerCase()})`);
      column.removeAttribute('data-gap');
    }
  });
}

async function applyTemplates(doc) {
  if (doc.body.classList.contains('columns')) {
    buildTemplateColumns(doc);
  }
}

/**
 * Notifies dropins about the current loading state.
 * @param {string} state The loading state to notify
 */
function notifyUI(event) {
  // skip if the event was already sent
  if (events.lastPayload(`aem/${event}`) === event) return;
  // notify dropins about the current loading state
  const handleEmit = () => events.emit(`aem/${event}`);
  // listen for prerender event
  document.addEventListener('prerenderingchange', handleEmit, { once: true });
  // emit the event immediately
  handleEmit();
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
// eslint-disable-next-line import/prefer-default-export
export function decorateMain(main) {
  decorateLinks(main);
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main);
  decorateSections(main);
  decorateBlocks(main);
}

/**
 * Decorates all links in scope of element
 *
 * @param {HTMLElement} main
 */
function decorateLinks(main) {
  const root = getRootPath();
  const roots = getListOfRootPaths();

  main.querySelectorAll('a').forEach((a) => {
    // If we are in the root, do nothing
    if (roots.length === 0) return;

    try {
      const url = new URL(a.href);
      const {
        origin,
        pathname,
        search,
        hash,
      } = url;

      // if the links belongs to another store, do nothing
      if (roots.some((r) => r !== root && pathname.startsWith(r))) return;

      // If the link is already localized, do nothing
      if (origin !== window.location.origin || pathname.startsWith(root)) return;
      a.href = new URL(`${origin}${root}${pathname.replace(/^\//, '')}${search}${hash}`);
    } catch {
      console.warn('Could not make localized link');
    }
  });
}

function preloadFile(href, as) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.crossOrigin = 'anonymous';
  link.href = href;
  document.head.appendChild(link);
}

function checkSSGPage() {
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
  const images = Array.from(imagesList?.querySelectorAll('li a') || [])
    .map((link) => link.href);
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
async function parseSsgData() {
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

  // TODO SSG: Use SSG data as fallback or update template in aem-commerce-ssg?
  const priceData = parseProductPrice(productDetails);
  if (priceData) {
    pageData.price = priceData;
  } else {
    // Make call to commerce API to get price data
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
  console.log('getProductTypeValues', parsedData);
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
function transformToPdpFormat(parsedData) {
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

/**
 * Loads everything needed to get to LCP.
 * @param {Element} doc The container element
 */
async function loadEager(doc) {
  document.documentElement.lang = 'en';
  decorateTemplateAndTheme();

  // Instrument experimentation plugin
  if (getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadEager: runEager } = await import('../plugins/experimentation/src/index.js');
    await runEager(document, { audiences: AUDIENCES, overrideMetadataFields: ['placeholders'] }, pluginContext);
  }

  window.adobeDataLayer = window.adobeDataLayer || [];

  let pageType = 'CMS';
  if (document.body.querySelector('main .product-details')) {
    pageType = 'Product';

    // Preload PDP Dropins assets for both flows
    preloadFile('/scripts/__dropins__/storefront-pdp/api.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/render.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductHeader.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductPrice.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductShortDescription.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductOptions.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductQuantity.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductDescription.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductAttributes.js', 'script');
    preloadFile('/scripts/__dropins__/storefront-pdp/containers/ProductGallery.js', 'script');

    // For SSG pages, prepare the data before pdp.js initialization
    if (checkSSGPage()) {
      const parsedData = await parseSsgData();
      const transformedData = transformToPdpFormat(parsedData);
      window.product = transformedData;
    }

    // Initialize pdp.js which will handle the actual initialization
    await import('./initializers/pdp.js');

    // Clean up existing product details after pdp.js has parsed them
    if (checkSSGPage()) {
      const productDetails = document.querySelector('.product-details');
      if (productDetails) {
        while (productDetails.firstChild) {
          productDetails.removeChild(productDetails.firstChild);
        }
      }
    }
  } else if (document.body.querySelector('main .product-list-page')) {
    pageType = 'Category';
    preloadFile('/scripts/widgets/search.js', 'script');
  } else if (document.body.querySelector('main .product-list-page-custom')) {
    // TODO Remove this bracket if not using custom PLP
    pageType = 'Category';
    const plpBlock = document.body.querySelector('main .product-list-page-custom');
    const { category, urlpath } = readBlockConfig(plpBlock);

    if (category && urlpath) {
      // eslint-disable-next-line import/no-unresolved, import/no-absolute-path
      const { preloadCategory } = await import('/blocks/product-list-page-custom/product-list-page-custom.js');
      preloadCategory({ id: category, urlPath: urlpath });
    }
  } else if (document.body.querySelector('main .commerce-cart')) {
    pageType = 'Cart';
  } else if (document.body.querySelector('main .commerce-checkout')) {
    pageType = 'Checkout';
  }

  // Initialize dropins after we've determined the page type and initialized the appropriate flow
  await initializeDropins();

  window.adobeDataLayer.push(
    {
      pageContext: {
        pageType,
        pageName: document.title,
        eventType: 'visibilityHidden',
        maxXOffset: 0,
        maxYOffset: 0,
        minXOffset: 0,
        minYOffset: 0,
      },
    },
    {
      shoppingCartContext: {
        totalQuantity: 0,
      },
    },
  );
  window.adobeDataLayer.push((dl) => {
    dl.push({ event: 'page-view', eventInfo: { ...dl.getState() } });
  });

  const main = doc.querySelector('main');
  if (main) {
    // Main Decorations
    decorateMain(main);

    // Template Decorations
    await applyTemplates(doc);

    // Load LCP blocks
    await loadSection(main.querySelector('.section'), waitForFirstImage);
    document.body.classList.add('appear');
  }

  // notify that the page is ready for eager loading
  notifyUI('lcp');

  try {
    /* if desktop (proxy for fast connection) or fonts already loaded, load fonts.css */
    if (window.innerWidth >= 900 || sessionStorage.getItem('fonts-loaded')) {
      loadFonts();
    }
  } catch (e) {
    // do nothing
  }
}

/**
 * Loads everything that doesn't need to be delayed.
 * @param {Element} doc The container element
 */
async function loadLazy(doc) {
  autolinkModals(doc);

  const main = doc.querySelector('main');
  await loadSections(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) element.scrollIntoView();

  await Promise.all([
    loadHeader(doc.querySelector('header')),
    loadFooter(doc.querySelector('footer')),
    loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`),
    loadFonts(),
    import('./acdl/adobe-client-data-layer.min.js'),
  ]);

  if (sessionStorage.getItem('acdl:debug')) {
    import('./acdl/validate.js');
  }

  trackHistory();

  // Implement experimentation preview pill
  if ((getMetadata('experiment')
    || Object.keys(getAllMetadata('campaign')).length
    || Object.keys(getAllMetadata('audience')).length)) {
    // eslint-disable-next-line import/no-relative-packages
    const { loadLazy: runLazy } = await import('../plugins/experimentation/src/index.js');
    await runLazy(document, { audiences: AUDIENCES }, pluginContext);
  }
  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  loadFonts();
}

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => import('./delayed.js'), 3000);
  // load anything that can be postponed to the latest here
}

export async function fetchIndex(indexFile, pageSize = 500) {
  const handleIndex = async (offset) => {
    const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`);
    const json = await resp.json();

    const newIndex = {
      complete: (json.limit + json.offset) === json.total,
      offset: json.offset + pageSize,
      promise: null,
      data: [...window.index[indexFile].data, ...json.data],
    };

    return newIndex;
  };

  window.index = window.index || {};
  window.index[indexFile] = window.index[indexFile] || {
    data: [],
    offset: 0,
    complete: false,
    promise: null,
  };

  // Return index if already loaded
  if (window.index[indexFile].complete) {
    return window.index[indexFile];
  }

  // Return promise if index is currently loading
  if (window.index[indexFile].promise) {
    return window.index[indexFile].promise;
  }

  window.index[indexFile].promise = handleIndex(window.index[indexFile].offset);
  const newIndex = await (window.index[indexFile].promise);
  window.index[indexFile] = newIndex;

  return newIndex;
}

/**
 * Decorates links.
 * @param {string} [link] url to be localized
 * @returns {string} - The localized link
 */
export function rootLink(link) {
  const root = getRootPath().replace(/\/$/, '');

  // If the link is already localized, do nothing
  if (link.startsWith(root)) return link;
  return `${root}${link}`;
}

/**
 * Check if consent was given for a specific topic.
 * @param {*} topic Topic identifier
 * @returns {boolean} True if consent was given
 */
// eslint-disable-next-line no-unused-vars
export function getConsent(topic) {
  console.warn('getConsent not implemented');
  return true;
}

async function loadPage() {
  await initializeConfig();
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

(async function loadDa() {
  if (!new URL(window.location.href).searchParams.get('dapreview')) return;
  // eslint-disable-next-line import/no-unresolved
  import('https://da.live/scripts/dapreview.js').then(({ default: daPreview }) => daPreview(loadPage));
}());
