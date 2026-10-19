import { render as provider } from '@dropins/storefront-requisition-list/render.js';
import SharedRequisitionList from '@dropins/storefront-requisition-list/containers/SharedRequisitionList.js';
import * as cartApi from '@dropins/storefront-cart/api.js';

import '../../scripts/initializers/requisition-list.js';
import '../../scripts/initializers/cart.js';

import {
  checkIsAuthenticated,
  getProductLink,
  rootLink,
} from '../../scripts/commerce.js';

// Returning a falsy id makes the dropin show its localized cart error,
// so failures are logged here and surfaced to the shopper by the dropin.
async function getCartId() {
  const cached = cartApi.getCartDataFromCache();
  if (cached?.id) return cached.id;

  if (checkIsAuthenticated()) {
    // Never fall back to a guest cart for a signed-in shopper, otherwise a
    // transient error would send their items to a cart they can't see.
    try {
      const cart = await cartApi.getCartData();
      return cart?.id ?? null;
    } catch (error) {
      console.error('Unable to load customer cart', error);
      return null;
    }
  }

  // A guest without a cart (or with an expired one) gets a new guest cart.
  const guestCart = await cartApi.getCartData().catch(() => null);
  if (guestCart?.id) return guestCart.id;
  try {
    return await cartApi.createGuestCart();
  } catch (error) {
    console.error('Unable to create guest cart', error);
    return null;
  }
}

// The dropin awaits this inside its add-to-cart try/catch; a failed refresh
// must not turn an already successful add-to-cart into an error message.
async function onCartUpdated() {
  try {
    await cartApi.refreshCart();
  } catch (error) {
    console.error('Unable to refresh cart', error);
  }
}

export default async function decorate(block) {
  const { searchParams } = new URL(window.location.href);
  // The in-app share link uses `requisition_id`; the backend public share
  // email uses `token`. Both carry the same public share token.
  const token = searchParams.get('requisition_id') || searchParams.get('token');
  if (!token) {
    window.location.replace(rootLink('/'));
    return;
  }

  provider.render(SharedRequisitionList, {
    token,
    isPublic: true,
    getCartId,
    onCartUpdated,
    routeProduct: getProductLink,
  })(block);
}
