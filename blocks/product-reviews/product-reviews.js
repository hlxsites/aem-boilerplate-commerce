import { Skeleton, SkeletonRow, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { config, getProductRating, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { Rating } from '@dropins/storefront-ratings-reviews/containers/Rating.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { labels } from '../../scripts/initializers/ratings-reviews.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { CS_FETCH_GRAPHQL, getProductSku } from '../../scripts/commerce.js';

const PRODUCT_REVIEWS_SKU_QUERY = `
  query PRODUCT_REVIEWS_SKU_QUERY($skus: [String!]!) {
    products(skus: $skus) {
      sku
    }
  }
`;

function ratingStatus(message) {
  return (ctx) => {
    const status = document.createElement('p');
    status.setAttribute('role', 'status');
    status.textContent = message;
    ctx.appendChild(status);
  };
}

async function loadReviews(block, requestedSku, scope) {
  // Resolve the catalog's canonical SKU without relying on PDP data or variant events.
  const { data, errors } = await CS_FETCH_GRAPHQL.fetchGraphQl(PRODUCT_REVIEWS_SKU_QUERY, {
    method: 'GET',
    variables: { skus: [requestedSku] },
  });
  if (errors?.length) throw new Error(errors.map(({ message }) => message).join('; '));
  const sku = data?.products?.[0]?.sku;
  if (!sku) throw new Error(`Unable to resolve the product review SKU: ${requestedSku}`);
  if (!block.isConnected) return;

  await Promise.all([
    getProductRating(sku, { scope }),
    getProductReviews(sku, { pageSize: 5, currentPage: 1, scope }),
  ].map((request) => request.catch((error) => {
    console.error('[Product Reviews] Failed to load review data:', error);
  })));
}

export default async function decorate(block) {
  const { sku: authoredSku, scope: authoredScope } = readBlockConfig(block);
  block.replaceChildren();
  block.hidden = true;
  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;
  const requestedSku = authoredSku?.trim() || getProductSku();
  if (!requestedSku) throw new Error('A product SKU is required to display product reviews.');

  const scope = authoredScope?.trim() || `product-reviews-${crypto.randomUUID()}`;
  const fragment = document.createRange().createContextualFragment(`
    <div class="product-reviews__rating"></div>
    <div class="product-reviews__list"></div>
  `);
  const rating = fragment.querySelector('.product-reviews__rating');
  const reviews = fragment.querySelector('.product-reviews__list');
  block.appendChild(fragment);
  block.hidden = false;

  await Promise.all([
    reviewsRenderer.render(Rating, {
      mode: 'average',
      showCount: true,
      scope,
      slots: {
        Loading: async (ctx) => {
          const placeholder = document.createElement('div');
          await UI.render(Skeleton, {
            className: 'product-reviews__rating-skeleton',
            'aria-hidden': true,
            children: h(SkeletonRow, { variant: 'row', size: 'small', fullWidth: true }),
          })(placeholder);
          ctx.appendChild(placeholder);
        },
        Error: ratingStatus(labels.Rating?.error ?? 'Unable to load rating.'),
        Unavailable: ratingStatus(labels.Rating?.unavailable ?? 'Rating is unavailable.'),
      },
    })(rating),
    reviewsRenderer.render(Review, { scope })(reviews),
  ]);

  loadReviews(block, requestedSku, scope).catch((error) => {
    block.hidden = true;
    block.replaceChildren();
    console.error('[Product Reviews] Failed to resolve review product:', error);
  });
}
