/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-cycle */

// Drop-in Tools
import { events } from '@dropins/tools/event-bus.js';
import {
  removeFetchGraphQlHeader,
  setEndpoint,
  setFetchGraphQlHeader,
} from '@dropins/tools/fetch-graphql.js';
import { initializers, Initializer } from '@dropins/tools/initializer.js';

// Drop-ins
import * as authApi from '@dropins/storefront-auth/api.js';
import * as cartApi from '@dropins/storefront-cart/api.js';
import * as orderApi from '@dropins/storefront-order/api.js';

// Recaptcha
import * as recaptcha from '@dropins/tools/recaptcha.js';

// Libs
import { checkIsAuthenticated, getConfigValue, getCookie } from './configs.js';
import { fetchPlaceholders, getMetadata } from './aem.js';
import { getSkuFromUrl } from './commerce.js';
import {
  CUSTOMER_ORDER_DETAILS_PATH,
  CUSTOMER_ORDERS_PATH,
  ORDER_DETAILS_PATH,
  ORDER_STATUS_PATH,
  CUSTOMER_PATH,
} from './constants.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

const initializeOrderApi = (orderRef) => {
  initializers.register(orderApi.initialize, {
    orderRef,
  });
};

const handleUserOrdersRedirects = () => {
  const currentUrl = new URL(window.location.href);
  const isAccountPage = currentUrl.pathname.includes(CUSTOMER_PATH);
  const orderRef = currentUrl.searchParams.get('orderRef');
  const isTokenProvided = orderRef && orderRef.length > 20;

  let targetPath = null;
  if (currentUrl.pathname.includes(CUSTOMER_ORDERS_PATH)) {
    return;
  }

  events.on('order/error', () => {
    if (checkIsAuthenticated()) {
      window.location.href = CUSTOMER_ORDERS_PATH;
    } else if (isTokenProvided) {
      window.location.href = ORDER_STATUS_PATH;
    } else {
      window.location.href = `${ORDER_STATUS_PATH}?orderRef=${orderRef}`;
    }
  });

  if (checkIsAuthenticated()) {
    if (!orderRef) {
      targetPath = CUSTOMER_ORDERS_PATH;
    } else if (isAccountPage) {
      targetPath = isTokenProvided
        ? `${ORDER_DETAILS_PATH}?orderRef=${orderRef}`
        : null;
    } else {
      targetPath = isTokenProvided
        ? null
        : `${CUSTOMER_ORDER_DETAILS_PATH}?orderRef=${orderRef}`;
    }
  } else {
    targetPath = !orderRef ? ORDER_STATUS_PATH : null;
  }

  if (targetPath) {
    window.location.href = targetPath;
  } else {
    initializeOrderApi(orderRef);
  }
};

// Update auth headers
const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  } else {
    removeFetchGraphQlHeader('Authorization');
  }
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

const initialize = new Initializer({
  init: () => {
    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);
    // emit authenticated event if token has changed
    events.emit('authenticated', !!token);
  },
  listeners: () => [
    // Set auth headers on authenticated event
    events.on('authenticated', setAuthHeaders),
    // Cache cart data in session storage
    events.on('cart/data', persistCartDataInSession, { eager: true }),
  ],
});

export default async function initializeDropins() {
  const langDefinitions = getLangDefinitions();

  // Register Initializers (Global)
  initializers.register(initialize, {
    langDefinitions,
  });

  initializers.register(authApi.initialize, {
    langDefinitions,
  });

  initializers.register(cartApi.initialize, {
    langDefinitions,
  });

  // Product Details Page (PDP)
  if (isPageType('pdp')) {
    import('@dropins/storefront-pdp/api.js').then(async (pdpApi) => {
      // Set Fetch Endpoint (Service)
      pdpApi.setEndpoint(await getConfigValue('commerce-endpoint'));

      // Set Fetch Headers (Service)
      pdpApi.setFetchGraphQlHeaders({
        'Content-Type': 'application/json',
        'Magento-Environment-Id': await getConfigValue('commerce-environment-id'),
        'Magento-Website-Code': await getConfigValue('commerce-website-code'),
        'Magento-Store-View-Code': await getConfigValue('commerce-store-view-code'),
        'Magento-Store-Code': await getConfigValue('commerce-store-code'),
        'Magento-Customer-Group': await getConfigValue('commerce-customer-group'),
        'x-api-key': await getConfigValue('commerce-x-api-key'),
      });

      const sku = getSkuFromUrl();
      const optionsUIDs = new URLSearchParams(window.location.search).get('optionsUIDs')?.split(',');

      // pre-fetch PDP data
      pdpApi.config.setConfig({ sku, optionsUIDs });
      const initialData = await pdpApi.fetchPDPData(sku, { skipDataEvent: true });

      // Initialize
      initializers.register(pdpApi.initialize, {
        sku,
        optionsUIDs,
        langDefinitions,
        models: {
          ProductDetails: {
            initialData,
          },
        },
        acdl: true,
        persistURLParams: true,
      });
    });
  }

  // Get current page template metadata
  const templateMeta = getMetadata('template');
  const isOrderDetailsPage = templateMeta.includes('Order-Details');

  if (isOrderDetailsPage) {
    handleUserOrdersRedirects();
  }

  const mount = async () => {
    // Event Bus Logger
    events.enableLogger(true);
    // Set Fetch Endpoint (Global)
    setEndpoint(await getConfigValue('commerce-core-endpoint'));
    // Recaptcha
    recaptcha.setConfig();
    // Mount all registered drop-ins
    initializers.mount();
  };

  // Mount Drop-ins
  window.addEventListener('pageshow', mount);
  document.addEventListener('prerenderingchange', mount);
}

async function getLangDefinitions() {
  const labels = await fetchPlaceholders();

  return {
    default: {
      PDP: {
        Product: {
          Incrementer: { label: labels.pdpProductIncrementer },
          OutOfStock: { label: labels.pdpProductOutofstock },
          AddToCart: { label: labels.pdpProductAddtocart },
          Details: { label: labels.pdpProductDetails },
          RegularPrice: { label: labels.pdpProductRegularprice },
          SpecialPrice: { label: labels.pdpProductSpecialprice },
          PriceRange: {
            From: { label: labels.pdpProductPricerangeFrom },
            To: { label: labels.pdpProductPricerangeTo },
          },
          Image: { label: labels.pdpProductImage },
        },
        Swatches: {
          Required: { label: labels.pdpSwatchesRequired },
        },
        Carousel: {
          label: labels.pdpCarousel,
          Next: { label: labels.pdpCarouselNext },
          Previous: { label: labels.pdpCarouselPrevious },
          Slide: { label: labels.pdpCarouselSlide },
          Controls: {
            label: labels.pdpCarouselControls,
            Button: { label: labels.pdpCarouselControlsButton },
          },
        },
        Overlay: {
          Close: { label: labels.pdpOverlayClose },
        },
      },
      Custom: {
        AddingToCart: { label: labels.pdpCustomAddingtocart },
      },
    },
  };
}

function isPageType(pageType) {
  switch (pageType) {
    case 'pdp':
      return !!document.body.querySelector('main .product-details');
    default:
      return false;
  }
}
