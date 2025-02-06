import { events } from '@dropins/tools/event-bus.js';
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
  const activeRules = await getActiveRules() || {};
  const sku = getSkuFromUrl() || null;

  if (sku) {
    activeRules.catalogPriceRules = await getCatalogPriceRules(sku);
  }

  displayedBlockTypes.length = 0;
  blocks.forEach(async (blockConfig) => {
    const index = blocks.indexOf(blockConfig);
    const { fragment, type } = blockConfig;
    if (displayedBlockTypes.includes(type)) {
      return;
    }

    const block = document.querySelector(`[data-targeted-block-key="${index}"]`);
    block.style.display = 'none';
    if (conditionsMatched(activeRules, blockConfig)) {
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

events.on('cart/initialized', () => {
  updateTargetedBlocksVisibility();
});
events.on('cart/updated', () => {
  updateTargetedBlocksVisibility();
});

export default function decorate(block) {
  block.style.display = 'none';
  blocks.push(readBlockConfig(block));
  block.setAttribute('data-targeted-block-key', blocks.length - 1);
}
