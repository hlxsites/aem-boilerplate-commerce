import { readBlockConfig } from '../../scripts/aem.js';
import { getSkuFromUrl } from '../../scripts/commerce.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Fetches and merges index data from multiple sources with intelligent caching.
 * @param {string} indexFile - The index file to fetch
 * @param {number} pageSize - The page size for pagination
 * @returns {Promise<Object>} A promise that resolves the index object
 */
async function fetchIndex(indexFile, pageSize = 500) {
  const handleIndex = async (offset) => {
    const resp = await fetch(`/${indexFile}.json?limit=${pageSize}&offset=${offset}`);
    const json = await resp.json();

    const newIndex = {
      complete: (json.limit + json.offset) === json.total,
      offset: json.offset + pageSize,
      promise: null,
      data: [...window.index[indexFile].data, ...json.data],
    };

    return newIndex;
  };

  window.index = window.index || {};
  window.index[indexFile] = window.index[indexFile] || {
    data: [],
    offset: 0,
    complete: false,
    promise: null,
  };

  // Return index if already loaded
  if (window.index[indexFile].complete) {
    return window.index[indexFile];
  }

  // Return promise if index is currently loading
  if (window.index[indexFile].promise) {
    return window.index[indexFile].promise;
  }

  window.index[indexFile].promise = handleIndex(window.index[indexFile].offset);
  const newIndex = await (window.index[indexFile].promise);
  window.index[indexFile] = newIndex;

  return newIndex;
}

export default async function decorate(block) {
  const { type, position } = readBlockConfig(block);

  try {
    const filters = {};
    if (type === 'product') {
      const productSku = getSkuFromUrl();
      if (!productSku) {
        throw new Error('No product SKU found in URL');
      }
      filters.products = productSku;
    }

    if (type === 'category') {
      const plpBlock = document.querySelector('.block.product-list-page')
        || document.querySelector('.block.product-list-page-custom');
      if (!plpBlock) {
        throw new Error('No product list page block found');
      }

      let categoryId = plpBlock.dataset?.category;
      if (!categoryId) {
        categoryId = readBlockConfig(plpBlock).category;
      }
      if (!categoryId) {
        throw new Error('No category ID found in product list page block');
      }
      filters.categories = categoryId;
    }

    if (position) {
      filters.positions = position;
    }

    const index = await fetchIndex('enrichment/enrichment');
    const matchingFragments = index.data
      .filter((fragment) => Object.keys(filters).every((filterKey) => {
        const values = JSON.parse(fragment[filterKey]);
        return values.includes(filters[filterKey]);
      }))
      .map((fragment) => fragment.path);

    (await Promise.all(matchingFragments.map((path) => loadFragment(path))))
      .filter((fragment) => fragment)
      .forEach((fragment) => {
        const sections = fragment.querySelectorAll(':scope .section');

        // If only single section, replace block with content of section
        if (sections.length === 1) {
          block.closest('.section').classList.add(...sections[0].classList);
          const wrapper = block.closest('.enrichment-wrapper');
          Array.from(sections[0].children)
            .forEach((child) => wrapper.parentNode.insertBefore(child, wrapper));
        } else if (sections.length > 1) {
          // If multiple sections, insert them after section of block
          const blockSection = block.closest('.section');
          Array.from(sections)
            .reverse()
            .forEach((section) => blockSection
              .parentNode.insertBefore(section, blockSection.nextSibling));
        }
      });
  } catch (error) {
    console.error(error);
  } finally {
    block.closest('.enrichment-wrapper')?.remove();
  }
}
