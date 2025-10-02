// Drop-in Tools
import { getCookie } from '@dropins/tools/lib.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import { events } from '@dropins/tools/event-bus.js';
import {
  removeFetchGraphQlHeader,
  setEndpoint,
  setFetchGraphQlHeader,
  fetchGraphQl,
} from '@dropins/tools/fetch-graphql.js';
import * as authApi from '@dropins/storefront-auth/api.js';
import { fetchPlaceholders } from '../commerce.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

// Default customer group ID for unauthenticated users
const DEFAULT_CUSTOMER_GROUP_ID = 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c';

// GraphQL query to get customer group
const GET_CUSTOMER_GROUP_QUERY = `
  query GetCustomerGroup {
    customer {
      group {
        uid
      }
    }
  }
`;

// Fetch customer group from GraphQL
const fetchCustomerGroup = async () => {
  try {
    const response = await fetchGraphQl(GET_CUSTOMER_GROUP_QUERY);
    if (response?.data?.customer?.group?.uid) {
      return response.data.customer.group.uid;
    }
  } catch (error) {
    console.warn('Failed to fetch customer group:', error);
  }
  return null;
};

// Update auth headers
const setAuthHeaders = async (state) => {
  if (state) {
    const token = getUserTokenCookie();
    setFetchGraphQlHeader('Authorization', `Bearer ${token}`);

    // Fetch and set customer group for authenticated users
    const customerGroupId = await fetchCustomerGroup();
    if (customerGroupId) {
      setFetchGraphQlHeader('Magento-Customer-Group', customerGroupId);
    } else {
      // Fallback to default if query fails
      setFetchGraphQlHeader('Magento-Customer-Group', DEFAULT_CUSTOMER_GROUP_ID);
    }
  } else {
    removeFetchGraphQlHeader('Authorization');
    authApi.removeFetchGraphQlHeader('Authorization');

    // Set default customer group for unauthenticated users
    setFetchGraphQlHeader('Magento-Customer-Group', DEFAULT_CUSTOMER_GROUP_ID);
  }
};

const persistCartDataInSession = (data) => {
  if (data?.id) {
    sessionStorage.setItem('DROPINS_CART_ID', data.id);
  } else {
    sessionStorage.removeItem('DROPINS_CART_ID');
  }
};

export default async function initializeDropins() {
  const init = async () => {
    // Set auth headers on authenticated event
    events.on('authenticated', setAuthHeaders);

    // Cache cart data in session storage
    events.on('cart/data', persistCartDataInSession, { eager: true });

    // on page load, check if user is authenticated
    const token = getUserTokenCookie();
    // set auth headers
    await setAuthHeaders(!!token);

    // Event Bus Logger
    events.enableLogger(true);
    // Set Fetch Endpoint (Global)
    setEndpoint(getConfigValue('commerce-core-endpoint'));

    // Fetch global placeholders
    await fetchPlaceholders('placeholders/global.json');

    // Initialize Global Drop-ins
    await import('./auth.js');
    await import('./personalization.js');

    import('./cart.js');

    events.on('aem/lcp', async () => {
      // Recaptcha
      await import('@dropins/tools/recaptcha.js').then((recaptcha) => {
        recaptcha.enableLogger(true);
        recaptcha.setEndpoint(getConfigValue('commerce-core-endpoint'));
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
