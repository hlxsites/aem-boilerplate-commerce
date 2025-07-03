import * as cartApi from '@dropins/storefront-cart/api.js';
import { render as wishlistRenderer } from '@dropins/storefront-wishlist/render.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { AuthCombine } from '@dropins/storefront-auth/containers/AuthCombine.js';
import { events } from '@dropins/tools/event-bus.js';
import Wishlist from '@dropins/storefront-wishlist/containers/Wishlist.js';
import { rootLink } from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/wishlist.js';

import { readBlockConfig } from '../../scripts/aem.js';

const showAuthModal = (event) => {
  if (event) {
    event.preventDefault();
  }

  const signInModal = document.createElement('div');
  signInModal.setAttribute('id', 'signin-modal');

  const signInForm = document.createElement('div');
  signInForm.setAttribute('id', 'signin-form');

  signInModal.onclick = (clickEvent) => {
    if (clickEvent.target === signInModal) {
      signInModal.remove();
    }
  };

  signInModal.appendChild(signInForm);
  document.body.appendChild(signInModal);

  // Render auth form
  authRenderer.render(AuthCombine, {
    signInFormConfig: { renderSignUpLink: true },
    signUpFormConfig: {},
    resetPasswordFormConfig: {},
  })(signInForm);

  const authListener = events.on('authenticated', (authenticated) => {
    if (authenticated) {
      signInModal.remove();
      authListener.off();
    }
  });
};

events.on('wishlist/alert', () => {
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, 0);
});

// Race condition fix: ensure loading state resolves
const fixWishlistLoadingRaceCondition = (block) => {
  // Check every 100ms for stuck loading state
  const checkInterval = setInterval(() => {
    const hasLoading = block.textContent.includes('Loading...');
    const hasEmpty = block.textContent.includes('Your wishlist is empty');
    const hasWishlistContent = block.querySelector('[data-testid="wishlist-heading-wrapper"]') || 
                             block.querySelector('[data-testid="empty-wishlist"]') ||
                             block.querySelector('.wishlist-product-item');

    // If we have content but still showing loading, fix it
    if (hasLoading && (hasEmpty || hasWishlistContent)) {
      // Try to trigger wishlist data event to resolve loading state
      events.emit('wishlist/data', null);
      clearInterval(checkInterval);
    }

    // Stop checking after 10 seconds
    if (Date.now() - startTime > 10000) {
      clearInterval(checkInterval);
    }
  }, 100);

  const startTime = Date.now();
  
  // Also stop the interval when loading is resolved
  const observer = new MutationObserver(() => {
    if (!block.textContent.includes('Loading...')) {
      clearInterval(checkInterval);
      observer.disconnect();
    }
  });
  
  observer.observe(block, { childList: true, subtree: true });
};

export default async function decorate(block) {
  const {
    'start-shopping-url': startShoppingURL = '',
  } = readBlockConfig(block);

  await wishlistRenderer.render(Wishlist, {
    routeEmptyWishlistCTA: startShoppingURL ? () => rootLink(startShoppingURL) : undefined,
    moveProdToCart: cartApi.addProductsToCart,
    routeProdDetailPage: (product) => rootLink(`/products/${product.urlKey}/${product.sku}`),
    onLoginClick: showAuthModal,
  })(block);

  // Apply race condition fix
  fixWishlistLoadingRaceCondition(block);
}
