import { events } from '@dropins/tools/event-bus.js';
import { Button, provider as UI } from '@dropins/tools/components.js';
import { config, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { WriteReview } from '@dropins/storefront-ratings-reviews/containers/WriteReview.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CUSTOMER_LOGIN_PATH,
  checkIsAuthenticated,
  fetchPlaceholders,
  getProductSku,
  rootLink,
} from '../../scripts/commerce.js';
import createModal from '../modal/modal.js';
import '../../scripts/initializers/ratings-reviews.js';

// Uses the page's product for the form summary when it is the product being reviewed.
function getPageProduct(sku) {
  const product = events.lastPayload('pdp/data');
  if (!product || product.sku !== sku) return {};
  const image = product.images?.[0];
  return {
    productName: product.name,
    productImage: image?.url ? { src: image.url, alt: image.label || product.name } : undefined,
  };
}

async function openWriteReview(sku) {
  const content = document.createElement('div');
  content.className = 'product-reviews__modal-content';
  const modal = await createModal([content]);
  // Open first: the form's rating data loads before the container mounts.
  modal.showModal();
  await reviewsRenderer.render(WriteReview, {
    sku,
    ...getPageProduct(sku),
    isAuthenticated: checkIsAuthenticated(),
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
  })(content);
}

export default async function decorate(block) {
  const { sku: authoredSku } = readBlockConfig(block);
  block.replaceChildren();
  block.hidden = true;
  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;
  const sku = authoredSku?.trim() || getProductSku();
  if (!sku) throw new Error('A product SKU is required to display product reviews.');

  const scope = `product-reviews-${crypto.randomUUID()}`;
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-reviews__header">
      <h2 class="product-reviews__title"></h2>
      <div class="product-reviews__write-review"></div>
    </div>
    <div class="product-reviews__list"></div>
  `);
  const labels = await fetchPlaceholders('placeholders/ratings-reviews.json');
  fragment.querySelector('.product-reviews__title').textContent = labels.Global?.ReviewsTitle ?? 'Reviews';
  const reviews = fragment.querySelector('.product-reviews__list');
  block.appendChild(fragment);
  block.hidden = false;

  await UI.render(Button, {
    children: labels.Global?.WriteReview ?? 'Write review',
    variant: 'secondary',
    onClick: () => openWriteReview(sku),
  })(block.querySelector('.product-reviews__write-review'));

  await reviewsRenderer.render(Review, { scope })(reviews);

  if (!block.isConnected) return;
  getProductReviews(sku, { pageSize: 20, currentPage: 1, scope }).catch((error) => {
    console.error('[Product Reviews] Failed to load reviews:', error);
  });
}
