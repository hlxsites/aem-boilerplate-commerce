import { config, getProductRating, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { Rating } from '@dropins/storefront-ratings-reviews/containers/Rating.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { labels } from '../../scripts/initializers/ratings-reviews.js';

function ratingStatus(message) {
  return (ctx) => {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.textContent = message;
    ctx.appendChild(status);
  };
}

export default async function renderReviews(block, sku) {
  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;
  if (!sku) throw new Error('A product SKU is required to display PDP reviews.');

  const scope = `pdp-reviews-${crypto.randomUUID()}`;
  const section = document.createElement('div');
  section.className = 'product-details__reviews';
  const rating = document.createElement('div');
  rating.className = 'product-details__review-rating';
  const reviews = document.createElement('div');
  reviews.className = 'product-details__review-list';
  section.append(rating, reviews);
  block.appendChild(section);

  await Promise.all([
    reviewsRenderer.render(Rating, {
      mode: 'average',
      showCount: true,
      scope,
      slots: {
        Error: ratingStatus(labels.Rating?.error ?? 'Unable to load rating.'),
        Unavailable: ratingStatus(labels.Rating?.unavailable ?? 'Rating is unavailable.'),
      },
    })(rating),
    reviewsRenderer.render(Review, { scope })(reviews),
  ]);

  await Promise.all([
    getProductRating(sku, { scope }),
    getProductReviews(sku, { pageSize: 20, currentPage: 1, scope }),
  ].map((request) => request.catch((error) => {
    console.error('[Product Reviews] Failed to load review data:', error);
  })));
}
