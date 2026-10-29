import { config } from '@dropins/storefront-ratings-reviews/api.js';
import { render as reviewsRenderer } from '@dropins/storefront-ratings-reviews/render.js';
import { Pagination } from '@dropins/storefront-ratings-reviews/containers/Pagination.js';
import '../../scripts/initializers/ratings-reviews.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const { scope: authoredScope } = readBlockConfig(block);
  block.replaceChildren();
  block.hidden = true;
  if (config.getConfig()?.isProductReviewsEnabled !== true || !block.isConnected) return;

  const scope = authoredScope?.trim();
  if (!scope) throw new Error('A matching product review scope is required to display pagination.');

  await reviewsRenderer.render(Pagination, { scope })(block);
  block.hidden = false;
}
