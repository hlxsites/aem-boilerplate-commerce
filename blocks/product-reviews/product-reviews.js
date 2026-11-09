import { config, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { ReviewSummary } from '@dropins/storefront-ratings-reviews/containers/ReviewSummary.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { Pagination } from '@dropins/storefront-ratings-reviews/containers/Pagination.js';
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
    <div class="product-reviews__summary"></div>
    <div class="product-reviews__list"></div>
    <div class="product-reviews__pagination"></div>
  `);
  const summary = fragment.querySelector('.product-reviews__summary');
  const reviews = fragment.querySelector('.product-reviews__list');
  const pagination = fragment.querySelector('.product-reviews__pagination');
  block.appendChild(fragment);
  block.hidden = false;

  await Promise.all([
    reviewsRenderer.render(ReviewSummary, { scope })(summary),
    reviewsRenderer.render(Review, { scope })(reviews),
    reviewsRenderer.render(Pagination, { scope })(pagination),
  ]);

  if (!block.isConnected) return;
  getProductReviews(sku, {
    pageSize: 20,
    currentPage: 1,
    withStats: true,
    scope,
}).catch((error) => {
    console.error('[Product Reviews] Failed to load reviews:', error);
  });
}
