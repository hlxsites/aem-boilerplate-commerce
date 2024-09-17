/* eslint-disable import/no-unresolved */

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
import { getConfigValue, getCookie } from './configs.js';
import { getMetadata } from './aem.js';

export const getUserTokenCookie = () => getCookie('auth_dropin_user_token');

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
  // Register Initializers (Global)
  initializers.register(initialize, {});
  initializers.register(authApi.initialize, {});
  initializers.register(cartApi.initialize, {});

  // Get current page template metadata
  const templateMeta = getMetadata('template');
  const isOrderPage = templateMeta.includes('Order');

  if (isOrderPage) {
    const isAuthenticated = !!getCookie('auth_dropin_user_token');

    const currentUrl = new URL(window.location.href);
    const orderRef = currentUrl.searchParams.get('orderRef');
    const orderToken = orderRef && orderRef.length > 20 ? orderRef : null;
    const orderNumber = orderRef && orderRef.length < 20 ? orderRef : null;

    if (!isAuthenticated) {
      if (orderToken) {
        window.location.href = `/order-details?orderRef=${orderToken}`;
      } else if (orderNumber) {
        window.location.href = `/order-status?orderRef=${orderNumber}`;
      } else {
        window.location.href = '/order-status';
      }
    } else {
      events.on('order/error', () => {
        const isAuthenticatedOnErrorEvent = !!getCookie('auth_dropin_user_token');

        if (isAuthenticatedOnErrorEvent) {
          window.location.href = '/customer/orders';
        } else {
          window.location.href = '/order-status';
        }
      });

      events.on('order/data', (orderData) => {
        if (!orderData) {
          const isAuthenticatedOnDataEvent = !!getCookie('auth_dropin_user_token');

          if (isAuthenticatedOnDataEvent) {
            window.location.href = '/customer/orders';
          } else {
            window.location.href = '/order-status';
          }
        }
      });

      if (orderNumber && !isAuthenticated) {
        window.location.href = `/order-status?orderRef=${orderNumber}`;
      } else if (orderNumber && isAuthenticated) {
        if (!window.location.href.includes(`/customer/order-details?orderRef=${orderNumber}`)) {
          window.location.href = `/customer/order-details?orderRef=${orderNumber}`;
        } else {
          initializers.register(orderApi.initialize, {
            orderRef: orderNumber,
          });
        }
      }

      if (orderToken) {
        initializers.register(orderApi.initialize, {
          orderRef: orderToken,
        });
      }
    }
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
