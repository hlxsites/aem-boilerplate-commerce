import { events } from '@dropins/tools/event-bus.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import {
  getCustomerGroups,
  getCustomerSegments,
  getCartRules,
  getCatalogPriceRules,
} from './graphql.js';
import conditionsMatched from './condition-matcher.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getUserTokenCookie } from '../../scripts/initializers/index.js';
import { parseUrlHashTags, hideLink, showLink } from '../../scripts/hashTagParser.js';

const blocks = [];
const displayedBlockTypes = [];

const updateTargetedBlocksVisibility = async () => {
  const activeRules = {
    customerSegments: [],
    customerGroup: await getCustomerGroups(),
    cart: [],
    catalogPriceRules: [],
  };

  if (Cart.getCartDataFromCache() !== null) {
    const cartId = Cart.getCartDataFromCache().id || null;
    if (cartId) {
      const response = await getCartRules(cartId);
      activeRules.cart = response.cart?.rules || [];
      activeRules.customerSegments = response.customerSegments || [];
    }
  }

  if (Cart.getCartDataFromCache() === null && getUserTokenCookie()) {
    activeRules.customerSegments = await getCustomerSegments();
  }

  // eslint-disable-next-line no-underscore-dangle
  const productData = events._lastEvent?.['pdp/data']?.payload ?? null;
  if (productData?.sku) {
    activeRules.catalogPriceRules = await getCatalogPriceRules(productData.sku);
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

  parseUrlHashTags(
    'nav',
    (el, namespace, value) => {
      if (value.startsWith('segment')) {
        const segments = activeRules.customerSegments.map((s) => s.name.toLowerCase());
        const [_prefix, segment] = [...value.split('_')];
        if (!segments.includes(segment.toLowerCase())) {
          hideLink(el);
        } else {
          showLink(el);
        }
      }

      if (value.startsWith('group')) {
        const [_prefix, group] = [...value.split('_')];
        if (group === activeRules.customerGroup) {
          hideLink(el);
        } else {
          showLink(el);
        }
      }

      if (value.startsWith('cartrule')) {
        const rules = activeRules.cart.map((s) => s.name.toLowerCase());
        const [_prefix, rule] = [...value.split('_')];
        if (!rules.includes(rule.toLowerCase())) {
          hideLink(el);
        } else {
          showLink(el);
        }
      }

      if (value.startsWith('catalogrule')) {
        const rules = activeRules.catalogPriceRules.map((s) => s.name.toLowerCase());
        const [_prefix, rule] = [...value.split('_')];
        if (!rules.includes(rule.toLowerCase())) {
          hideLink(el);
        } else {
          showLink(el);
        }
      }
    },
  );
};

export default function decorate(block) {
  block.style.display = 'none';
  blocks.push(readBlockConfig(block));
  block.setAttribute('data-targeted-block-key', blocks.length - 1);
}

events.on('cart/reset', () => {
  updateTargetedBlocksVisibility();
}, { eager: true });

events.on('cart/initialized', () => {
  updateTargetedBlocksVisibility();
}, { eager: true });

events.on('cart/updated', () => {
  updateTargetedBlocksVisibility();
}, { eager: true });
