/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import { initializers } from '@dropins/tools/initializer.js';
import * as orderApi from '@dropins/storefront-order/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { getCookie } from '../../scripts/configs.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    'allow-guest-access': allowGuestAccess = 'true',
  } = readBlockConfig(block);

  const isAuthenticated = !!getCookie('auth_dropin_user_token');

  const currentUrl = new URL(window.location.href);
  const orderRef = currentUrl.searchParams.get('orderRef');
  const orderToken = orderRef && orderRef.length > 20 ? orderRef : null;
  const orderNumber = orderRef && orderRef.length < 20 ? orderRef : null;

  if (!allowGuestAccess && !isAuthenticated) {
    if (orderToken) {
      window.location.href = `/order-details?orderRef=${orderToken}`;
    } else if (orderNumber) {
      window.location.href = `/order-status?orderRef=${orderNumber}`;
    } else {
      window.location.href = '/order-status';
    }

    return;
  }

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
        orderNumber,
      });
    }
  }

  if (orderToken) {
    initializers.register(orderApi.initialize, {
      orderToken,
    });
  }
}
