import { render as accountRenderer } from '@dropins/storefront-account/render.js';
import { ProductReviews } from '@dropins/storefront-account/containers/ProductReviews.js';
import { getStoreConfig } from '@dropins/storefront-account/api.js';
import { events } from '@dropins/tools/event-bus.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_LOGIN_PATH, CUSTOMER_REVIEWS_PATH, checkIsAuthenticated, rootLink, getProductLink,
} from '../../scripts/commerce.js';
import '../../scripts/initializers/account.js';

export default async function decorate(block) {
  const authored = readBlockConfig(block);
  const minifiedView = authored['minified-view'] === 'true';
  const defaultPageSize = minifiedView ? 3 : 10;
  const pageSize = authored['page-size'] === undefined
    ? defaultPageSize
    : Number(authored['page-size']);
  if (!Number.isSafeInteger(pageSize) || pageSize < 1 || pageSize > 50) {
    throw new RangeError('Customer review page size must be an integer from 1 to 50.');
  }
  const reviewsPage = authored['reviews-page'] || CUSTOMER_REVIEWS_PATH;
  block.replaceChildren();
  if (!checkIsAuthenticated()) {
    window.location.assign(rootLink(CUSTOMER_LOGIN_PATH));
    return;
  }

  let generation = 0;
  let accountView;
  const subscription = events.on('authenticated', (authenticated) => {
    generation += 1;
    accountView?.setProps((previous) => ({
      ...previous, authenticated, contextKey: String(generation),
    }));
    if (!authenticated) window.location.assign(rootLink(CUSTOMER_LOGIN_PATH));
  });

  try {
    const mountedGeneration = generation;
    accountView = await accountRenderer.render(ProductReviews, {
      pageSize,
      minifiedView,
      routeReviewsList: () => (
        /^https?:\/\//i.test(reviewsPage) ? reviewsPage : rootLink(reviewsPage)
      ),
      enabled: (await getStoreConfig()).productReviewsEnabled,
      authenticated: checkIsAuthenticated(),
      contextKey: String(mountedGeneration),
      routeProduct: ({ urlKey, sku }) => (
        urlKey ? getProductLink(urlKey, sku) : undefined
      ),
    })(block);
    if (generation !== mountedGeneration) {
      accountView.setProps((previous) => ({
        ...previous,
        authenticated: checkIsAuthenticated(),
        contextKey: String(generation),
      }));
    }
  } catch (error) {
    accountView?.remove();
    subscription.off();
    throw error;
  }
}
