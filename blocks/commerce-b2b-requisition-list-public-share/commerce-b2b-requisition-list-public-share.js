import { render as provider } from '@dropins/storefront-requisition-list/render.js';
import SharedRequisitionList from '@dropins/storefront-requisition-list/containers/SharedRequisitionList.js';
import * as cartApi from '@dropins/storefront-cart/api.js';

import '../../scripts/initializers/requisition-list.js';
import '../../scripts/initializers/cart.js';

import { getProductLink, rootLink } from '../../scripts/commerce.js';

// Recipients may be guests; reuse an existing cart if one is cached,
// otherwise fall back to the customer cart or create a new guest cart.
async function getCartId() {
  const cached = cartApi.getCartDataFromCache();
  if (cached?.id) return cached.id;
  const cart = await cartApi.getCartData().catch(() => null);
  return cart?.id || cartApi.createGuestCart();
}

export default async function decorate(block) {
  const { searchParams } = new URL(window.location.href);
  // The in-app share link uses `requisition_id`; the backend-rendered share
  // email currently uses `token` — accept both until that's unified.
  const token = searchParams.get('requisition_id') || searchParams.get('token');
  if (!token) { window.location.href = rootLink('/'); return; }

  provider.render(SharedRequisitionList, {
    token,
    isPublic: true,
    getCartId,
    onCartUpdated: () => cartApi.refreshCart(),
    routeProduct: getProductLink,
  })(block);
}
