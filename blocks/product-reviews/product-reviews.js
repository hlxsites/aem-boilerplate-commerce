import { config, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { getProductSku } from '../../scripts/commerce.js';
import '../../scripts/initializers/ratings-reviews.js';

export default async function decorate(block) {
  const { sku: authoredSku } = readBlockConfig(block);
  block.replaceChildren();
  block.hidden = true;
  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;
  const sku = authoredSku?.trim() || getProductSku();
  if (!sku) throw new Error('A product SKU is required to display product reviews.');

  const scope = `product-reviews-${crypto.randomUUID()}`;
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-reviews__list"></div>
  `);
  const reviews = fragment.querySelector('.product-reviews__list');
  block.appendChild(fragment);
  block.hidden = false;

  await reviewsRenderer.render(Review, { scope })(reviews);

  if (!block.isConnected) return;
  getProductReviews(sku, { pageSize: 20, currentPage: 1, scope }).catch((error) => {
    console.error('[Product Reviews] Failed to load reviews:', error);
  });
}
