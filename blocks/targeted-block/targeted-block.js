import { events } from '@dropins/tools/event-bus.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import { getActiveRules, getCatalogPriceRules } from './qraphql.js';
import conditionsMatched from './condition-matcher.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const blocks = [];
const displayedBlockTypes = [];

const getSkuFromUrl = () => {
  const path = window.location.pathname;
  const result = path.match(/\/products\/[\w|-]+\/([\w|-]+)$/);
  return result?.[1];
};

const updateTargetedBlocksVisibility = async () => {
  const activeRules = (Cart.getCartDataFromCache() === null) ? {
    customerSegments: [],
    CustomerGroup: [],
    cart: {
      rules: [],
    },
  } : await getActiveRules(Cart.getCartDataFromCache().id);

  const sku = getSkuFromUrl() || null;

  if (sku) {
    activeRules.catalogPriceRules = await getCatalogPriceRules(sku);
  }

  displayedBlockTypes.length = 0;
  blocks.forEach(async (blockConfig) => {
    const index = blocks.indexOf(blockConfig);
    const { fragment, type } = blockConfig;

    const block = document.querySelector(`[data-targeted-block-key="${index}"]`);
    block.style.display = 'none';

    if (!displayedBlockTypes.includes(type) && conditionsMatched(activeRules, blockConfig)) {
      displayedBlockTypes.push(type);
      if (fragment !== undefined) {
        const content = await loadFragment(fragment);
        const blockContent = document.createElement('div');
        while (content.firstElementChild) blockContent.append(content.firstElementChild);
        block.textContent = '';
        block.append(blockContent);
      }
      block.style.display = '';
    }
  });
};

export default function decorate(block) {
  block.style.display = 'none';
  blocks.push(readBlockConfig(block));
  block.setAttribute('data-targeted-block-key', blocks.length - 1);
}

events.on('cart/initialized', () => {
  updateTargetedBlocksVisibility();
}, { eager: true });

events.on('cart/updated', () => {
  updateTargetedBlocksVisibility();
}, { eager: true });
