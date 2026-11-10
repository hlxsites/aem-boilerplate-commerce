import { events } from '@dropins/tools/event-bus.js';
import { Button, ProgressSpinner, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { config, getProductReviews } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { ReviewSummary } from '@dropins/storefront-ratings-reviews/containers/ReviewSummary.js';
import { Review } from '@dropins/storefront-ratings-reviews/containers/Review.js';
import { WriteReview } from '@dropins/storefront-ratings-reviews/containers/WriteReview.js';
import { Pagination } from '@dropins/storefront-ratings-reviews/containers/Pagination.js';
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

// Renders the form before creating the modal so the dialog never opens empty.
async function openWriteReview(sku) {
  const content = document.createElement('div');
  content.className = 'product-reviews__modal-content';
  await reviewsRenderer.render(WriteReview, {
    sku,
    ...getPageProduct(sku),
    isAuthenticated: checkIsAuthenticated(),
    routeSignIn: () => rootLink(CUSTOMER_LOGIN_PATH),
  })(content);

  // Appending after showModal() lets the modal focus the first input once.
  const wrapper = document.createElement('div');
  const modal = await createModal([wrapper]);
  modal.showModal();
  wrapper.append(content);
}

export default async function decorate(block) {
  const { sku: authoredSku } = readBlockConfig(block);
  block.replaceChildren();
  block.hidden = true;

  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;

  const sku = authoredSku?.trim() || getProductSku();
  if (!sku) throw new Error('A product SKU is required to display product reviews.');

  const labels = await fetchPlaceholders('placeholders/ratings-reviews.json');

  const scope = `product-reviews-${crypto.randomUUID()}`;

  const fragment = document.createRange().createContextualFragment(`
    <div class="product-reviews__header">
      <h2 class="product-reviews__title"></h2>
      <div class="product-reviews__write-review"></div>
    </div>
    <div class="product-reviews__summary"></div>
    <div class="product-reviews__list"></div>
    <div class="product-reviews__pagination"></div>
  `);

  const title = fragment.querySelector('.product-reviews__title');
  const summary = fragment.querySelector('.product-reviews__summary');
  const reviews = fragment.querySelector('.product-reviews__list');
  const pagination = fragment.querySelector('.product-reviews__pagination');

  title.textContent = labels.Global?.ReviewsTitle ?? 'Reviews';

  block.appendChild(fragment);
  block.hidden = false;

  let isOpening = false;
  const writeReviewButton = await UI.render(Button, {
    children: labels.Global?.WriteReview ?? 'Write review',
    variant: 'secondary',
    onClick: async () => {
      if (isOpening) return;
      isOpening = true;
      writeReviewButton.setProps((prev) => ({
        ...prev,
        disabled: true,
        loading: true,
        icon: h(ProgressSpinner, { size: 'small', stroke: '2' }),
      }));
      try {
        await openWriteReview(sku);
      } catch (error) {
        console.error('[Product Reviews] Failed to open the review form:', error);
      } finally {
        isOpening = false;
        writeReviewButton.setProps((prev) => ({
          ...prev,
          disabled: false,
          loading: false,
          icon: undefined,
        }));
      }
    },
    loadingLabel: labels.Global?.WriteReviewLoading ?? 'Loading review form',
  })(block.querySelector('.product-reviews__write-review'));

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
