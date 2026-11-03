import { readBlockConfig } from '../../scripts/aem.js';
import { getProductSku, fetchIndex, IS_UE } from '../../scripts/commerce.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  const { type: rawType, position } = readBlockConfig(block);
  // Authored values (e.g. from a select field) may not match the expected case exactly.
  const type = rawType?.trim().toLowerCase();

  try {
    const filters = {};
    if (!type) {
      throw new Error('No type found in enrichment block configuration');
    }

    if (type === 'product') {
      const productSku = getProductSku();
      if (!productSku) {
        throw new Error('No product SKU found in URL');
      }
      filters.products = productSku;
    } else if (type === 'category') {
      // Look for PLP block using "product-list-page" block selector
      const plpBlock = document.querySelector('.product-list-page');
      if (!plpBlock) {
        throw new Error('No product list page block found');
      }

      const category = plpBlock.dataset?.urlpath || readBlockConfig(plpBlock).urlpath;
      if (!category) {
        throw new Error('No category ID found in product list page block');
      }
      filters.categories = category;
    } else {
      // An unrecognized type must not fall through to matching on position alone,
      // which would leak unrelated content onto every page.
      throw new Error(`Unsupported enrichment type "${rawType}"`);
    }

    if (position) {
      filters.positions = position;
    }

    const index = await fetchIndex('enrichment/enrichment');
    const matchingFragments = index.data
      .filter((fragment) => Object.keys(filters).every((filterKey) => {
        const values = fragment[filterKey];
        // An untagged position means "no restriction", so it matches any requested position.
        if (filterKey === 'positions' && values.length === 0) return true;
        // Comma-separated metadata values (e.g. "apparel, bags") aren't trimmed by the
        // query index, so compare loosely rather than requiring an exact string match.
        return values.some((value) => value.trim() === filters[filterKey]);
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
    // don't remove wrapper in UE because then it will not be authorable
    if (!IS_UE) block.closest('.enrichment-wrapper')?.remove();
  }
}
