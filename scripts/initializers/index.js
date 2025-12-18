// Drop-in Tools
import { getCookie } from '@dropins/tools/lib.js';
import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { isAemAssetsEnabled } from '@dropins/tools/lib/aem/assets.js';
import { CORE_FETCH_GRAPHQL, CS_FETCH_GRAPHQL, fetchPlaceholders } from '../commerce.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

const setAuthHeaders = (state) => {
  if (state) {
    const token = getUserTokenCookie();
    CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
    CS_FETCH_GRAPHQL.setFetchGraphQlHeader('Authorization', `Bearer ${token}`);
  } else {
    sessionStorage.removeItem('DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT');
    sessionStorage.removeItem('DROPIN__COMPANYSWITCHER__GROUP__CONTEXT');
    CORE_FETCH_GRAPHQL.removeFetchGraphQlHeader('Authorization');
    CS_FETCH_GRAPHQL.removeFetchGraphQlHeader('Authorization');
  }
};

const setCustomerGroupHeader = (customerGroupId) => {
  CS_FETCH_GRAPHQL.setFetchGraphQlHeader('Magento-Customer-Group', customerGroupId);
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

const setupAemAssetsImageParams = () => {
  if (isAemAssetsEnabled()) {
    // Convert decimal values to integers for AEM Assets compatibility
    initializers.setImageParamKeys({
      width: (value) => ['width', Math.floor(value)],
      height: (value) => ['height', Math.floor(value)],
      quality: 'quality',
      auto: 'auto',
      crop: 'crop',
      fit: 'fit',
    });
  }
};

const setStoreView = () => {
  // 1. Get Store View Code from URL param ?storeview=...
  const storeViewCodeParam = new URLSearchParams(window.location.search).get('storeview');

  if (storeViewCodeParam) {
    // 2. Set Store View Code in session storage and set it in the URL
    sessionStorage.setItem('DROPIN__STOREVIEW', storeViewCodeParam);
  } else if (storeViewCodeParam === '') {
    sessionStorage.removeItem('DROPIN__STOREVIEW');
  }

  // 3. Get current store view code from session storage
  const storeViewCode = sessionStorage.getItem('DROPIN__STOREVIEW');

  // 4. Set Store View Code in Core Fetch GraphQL
  if (storeViewCode) {
    CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('Store', storeViewCode);
    CS_FETCH_GRAPHQL.setFetchGraphQlHeader('Store', storeViewCode);
    CS_FETCH_GRAPHQL.setFetchGraphQlHeader('Magento-Store-View-Code', storeViewCode);

    // 5. Set Store View Code in the URL
    const url = new URL(window.location.href);
    url.searchParams.set('storeview', storeViewCode);
    window.history.replaceState(null, '', url.toString());
  }
};

export default async function initializeDropins() {
  const init = async () => {
    setStoreView();

    // Set Customer-Group-ID header
    events.on('auth/group-uid', setCustomerGroupHeader, { eager: true });

    // Set auth headers on authenticated event
    events.on('authenticated', setAuthHeaders, { eager: true });

    // Cache cart data in session storage
    events.on('cart/data', persistCartDataInSession, { eager: true });

    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    setAuthHeaders(!!token);

    // Event Bus Logger
    events.enableLogger(true);

    // Set up AEM Assets image parameter conversion
    setupAemAssetsImageParams();

    // Fetch global placeholders
    await fetchPlaceholders('placeholders/global.json');

    /*
     * Set the company context before initializing the auth drop-in
     * This ensures proper permissions are retrieved, and the auth/permissions event includes
     * the correct payload.
     */
    const companyContext = sessionStorage.getItem('DROPIN__COMPANYSWITCHER__COMPANY__CONTEXT');
    if (companyContext) {
      CORE_FETCH_GRAPHQL.setFetchGraphQlHeader('X-Adobe-Company', companyContext);
    }

    // Initialize Global Drop-ins
    await import('./auth.js');

    // Initialize Company Switcher
    const authenticated = events.lastPayload('authenticated');

    if (authenticated && getConfigValue('commerce-companies-enabled') === true) {
      await import('./company-switcher.js');
    }

    await import('./personalization.js');

    import('./cart.js');

    events.on('aem/lcp', async () => {
      // Recaptcha
      await import('@dropins/tools/recaptcha.js').then((recaptcha) => {
        recaptcha.setEndpoint(CORE_FETCH_GRAPHQL);
        recaptcha.enableLogger(true);
        return recaptcha.setConfig();
      });
    });
  };

  // re-initialize on prerendering changes
  document.addEventListener('prerenderingchange', initializeDropins, { once: true });

  return init();
}

export function initializeDropin(cb) {
  let initialized = false;

  const init = async (force = false) => {
    // prevent re-initialization
    if (initialized && !force) return;
    // initialize drop-in
    await cb();
    initialized = true;
  };

  // re-initialize on prerendering changes
  document.addEventListener('prerenderingchange', () => init(true), { once: true });

  return init;
}
