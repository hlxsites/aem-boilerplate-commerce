import { events } from '@dropins/tools/event-bus.js';
import * as Cart from '@dropins/storefront-cart/api.js';
import { readBlockConfig } from '../../scripts/aem.js';
import { getConfigValue } from '../../scripts/configs.js';

const blocks = [];

const executeQuery = async (query, variables) => {
  const apiCall = new URL(await getConfigValue('commerce-core-endpoint'));

  apiCall.searchParams.append('query', query.replace(/(?:\r\n|\r|\n|\t|[\s]{4})/g, ' ').replace(/\s\s+/g, ' '));
  apiCall.searchParams.append('variables', variables ? JSON.stringify(variables) : null);

  const response = await fetch(apiCall, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return response.ok ? (await response.json()).data : null;
};

const getCustomerSegments = async () => {
  const query = `
    query CUSTOMER_SEGMENTS($cartId: String!){
      customerSegments(cartId: $cartId) {
        name
      }
    }
  `;
  try {
    const segments = await executeQuery(
      query,
      { cartId: Cart.getCartDataFromCache().id },
    );
    if (segments === null) {
      return [];
    }
    return segments?.customerSegments?.map((segment) => segment.name);
  } catch (error) {
    console.error('Could not retrieve customer segments', error);
  }
  return [];
};

const updateDynamicBlocksVisibility = async () => {
  const customerSegments = await getCustomerSegments();
  blocks.forEach((blockConfig, index) => {
    const { segment } = blockConfig;
    const block = document.querySelector(`[data-dynamic-block-key="${index}"]`);
    block.style.display = customerSegments.includes(segment) ? '' : 'none';
  });
};

export default function decorate(block) {
  block.style.display = 'none';
  blocks.push(readBlockConfig(block));
  block.setAttribute('data-dynamic-block-key', blocks.length - 1);
}

events.on('cart/initialized', () => { updateDynamicBlocksVisibility(); });
events.on('cart/updated', () => { updateDynamicBlocksVisibility(); });
