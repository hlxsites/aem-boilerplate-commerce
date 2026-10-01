import {
  Button, Image, Input, Icon, PriceRange, provider as UI,
} from '@dropins/tools/components.js';
import { debounce } from '@dropins/tools/lib.js';
import { isAemAssetsEnabled, tryGenerateAemAssetsOptimizedUrl } from '@dropins/tools/lib/aem/assets.js';
import { h } from '@dropins/tools/preact.js';
import { search } from '@dropins/storefront-product-discovery/api.js';
import { getProductLink } from '../../scripts/commerce.js';
import { readBlockConfig } from '../../scripts/aem.js';
import '../../scripts/initializers/search.js';

const IMAGE_SIZE = { width: 400, height: 400 };

const MAX_PRODUCTS = 3;

const SEARCH_SCOPE = 'product-compare';

/**
 * Returns { currency, regular, final } where `final` is non-null only when on sale.
 * Mirrors the dropin's SimpleProductPrice / ComplexProductPrice rendering logic.
 */
function buildPriceProps(product) {
  const { price, priceRange } = product;

  if (priceRange?.minimum) {
    const currency = priceRange.minimum.regular?.amount?.currency ?? 'USD';
    const minFinal = priceRange.minimum.final?.amount?.value;
    const minRegular = priceRange.minimum.regular?.amount?.value;
    const maxFinal = priceRange.maximum?.final?.amount?.value;
    const maxRegular = priceRange.maximum?.regular?.amount?.value;
    const hasSpecial = (minFinal !== undefined && minFinal < minRegular)
      || (maxFinal !== undefined && maxFinal < maxRegular);
    return {
      currency,
      regular: { display: 'from to', minimumAmount: minRegular, maximumAmount: maxRegular },
      final: hasSpecial
        ? { display: 'from to', minimumAmount: minFinal, maximumAmount: maxFinal }
        : null,
    };
  }

  const currency = price?.regular?.amount?.currency ?? 'USD';
  const regularVal = price?.regular?.amount?.value;
  const finalVal = price?.final?.amount?.value;
  const hasSpecial = finalVal !== undefined && regularVal !== undefined && finalVal < regularVal;
  return {
    currency,
    regular: { amount: regularVal },
    final: hasSpecial ? { amount: finalVal } : null,
  };
}

async function fetchProductsBySkus(skus, searchFilters = []) {
  const result = await search(
    { filter: [{ attribute: 'sku', in: skus }, ...searchFilters], pageSize: skus.length },
    { scope: `${SEARCH_SCOPE}-lookup` },
  );
  return result?.items ?? [];
}

function getCurrentSkus(block) {
  return Array.from(block.querySelectorAll('thead th[data-sku]'))
    .map((th) => th.dataset.sku);
}

/**
 * Builds a product column <th> with dropin-rendered remove button and price.
 * @param {object} p Product item from the search API
 * @param {Function} onRemove Called when the remove button is clicked
 */
async function buildProductTh(p, onRemove) {
  const link = getProductLink(p.urlKey, p.sku);
  const image = p.images?.[0];
  const { currency, regular, final } = buildPriceProps(p);

  // <th> is only valid inside a table; wrap so the browser parses it correctly.
  const frag = document.createRange().createContextualFragment(`
    <table><thead><tr>
      <th>
        <div class="product-compare__remove"></div>
        <a></a>
        <p><a></a></p>
        <div class="product-compare__price"></div>
      </th>
    </tr></thead></table>
  `);

  const th = frag.querySelector('th');
  th.dataset.sku = p.sku;

  const removeBtnWrap = th.querySelector('.product-compare__remove');
  const imgLink = th.querySelector('a');
  const nameLink = th.querySelector('p > a');
  const priceWrap = th.querySelector('.product-compare__price');

  imgLink.href = link;
  nameLink.href = link;
  nameLink.textContent = p.name;

  if (image?.url) {
    const imgSrc = image.url.replace(/^https?:/, '');
    const useAem = isAemAssetsEnabled();
    const src = useAem ? tryGenerateAemAssetsOptimizedUrl(imgSrc, p.sku, {}) : imgSrc;
    const params = useAem
      ? {
        ...IMAGE_SIZE, crop: undefined, fit: undefined, auto: undefined,
      }
      : { ...IMAGE_SIZE };
    await UI.render(Image, {
      src,
      alt: image.label || p.name,
      loading: 'lazy',
      params,
    })(imgLink);
  }

  await UI.render(Button, {
    icon: h(Icon, { source: 'Close' }),
    variant: 'tertiary',
    'aria-label': `Remove ${p.name}`,
    onClick: onRemove,
  })(removeBtnWrap);

  if (regular.amount !== undefined || regular.minimumAmount !== undefined) {
    if (!final) {
      await UI.render(PriceRange, { ...regular, currency })(priceWrap);
    } else {
      const finalEl = document.createElement('span');
      finalEl.className = 'regular-price-normal';
      await UI.render(PriceRange, { ...final, currency })(finalEl);

      const regularEl = document.createElement('span');
      regularEl.className = 'special-price-crossed';
      await UI.render(PriceRange, { ...regular, currency })(regularEl);

      priceWrap.append(finalEl, regularEl);
    }
  }

  return th;
}

/** Removes a product column by resolving its index so thead and tbody stay in sync. */
function removeProductColumn(block, sku) {
  const th = block.querySelector(`thead th[data-sku="${sku}"]`);
  if (!th) return;

  const colIndex = Array.from(th.closest('tr').children).indexOf(th);
  th.remove();

  const tbody = block.querySelector('tbody');
  if (tbody) {
    Array.from(tbody.rows).forEach((row) => {
      row.cells[colIndex]?.remove();
    });
  }

  const remaining = getCurrentSkus(block);
  const url = new URL(window.location.href);
  if (remaining.length) {
    url.searchParams.set('compare', remaining.join(','));
  } else {
    url.searchParams.delete('compare');
    block.querySelector('table')?.remove();
  }
  window.history.replaceState({}, '', url);

  const searchWrap = block.querySelector('.product-compare__search');
  if (searchWrap) searchWrap.hidden = false;
}

/**
 * Adds a product column without re-fetching — item data comes directly from the search result.
 * Falls back to a full re-render when no table exists yet.
 * @param {string[]|null} allowedAttrs Authored attribute allowlist, or null to show all.
 * @param {object[]} searchFilters Parsed filter objects kept in sync with renderBlock.
 */
async function addProductColumn(block, item, allowedAttrs = null, searchFilters = []) {
  // eslint-disable-next-line no-param-reassign
  if (block.addPending) return;
  const currentSkus = getCurrentSkus(block);
  if (currentSkus.includes(item.sku) || currentSkus.length >= MAX_PRODUCTS) return;

  // eslint-disable-next-line no-param-reassign
  block.addPending = true;
  try {
    const newSkus = [...currentSkus, item.sku];
    const url = new URL(window.location.href);
    url.searchParams.set('compare', newSkus.join(','));
    window.history.replaceState({}, '', url);

    // No table yet — initial add, full render (no visible content to flicker)
    if (!block.querySelector('table')) {
      await renderBlock(block, newSkus, allowedAttrs, searchFilters);
      return;
    }

    // Append new header column using the item already in hand — no second fetch
    const th = await buildProductTh(item, () => removeProductColumn(block, item.sku));

    // Re-read live SKUs after the async gap — a remove may have fired during buildProductTh.
    const liveSkus = getCurrentSkus(block);
    block.querySelector('thead tr').append(th);

    // Update tbody: add td to existing rows, create new rows for new attributes
    const tbody = block.querySelector('tbody');
    const attrRows = new Map();
    if (tbody) {
      Array.from(tbody.rows).forEach((row) => {
        const key = row.querySelector('th[data-attr]')?.dataset.attr;
        if (key) attrRows.set(key, row);
      });
    }

    const attrs = (item.attributes ?? [])
      .filter(({ name }) => !allowedAttrs || allowedAttrs.includes(name));

    attrs.forEach(({ name, label, value }) => {
      if (!value) return;
      if (attrRows.has(name)) {
        const td = document.createElement('td');
        td.textContent = value;
        attrRows.get(name).append(td);
      } else {
        const row = document.createElement('tr');
        const attrTh = document.createElement('th');
        attrTh.scope = 'row';
        attrTh.dataset.attr = name;
        attrTh.textContent = label;
        row.append(attrTh);
        liveSkus.forEach(() => {
          const td = document.createElement('td');
          td.textContent = '--';
          row.append(td);
        });
        const td = document.createElement('td');
        td.textContent = value;
        row.append(td);
        tbody?.append(row);
        attrRows.set(name, row);
      }
    });

    // Pad empty td for existing rows the new product lacks
    attrRows.forEach((row, name) => {
      if (!attrs.some((a) => a.name === name)) {
        const td = document.createElement('td');
        td.textContent = '--';
        row.append(td);
      }
    });

    if (liveSkus.length + 1 >= MAX_PRODUCTS) {
      const searchWrap = block.querySelector('.product-compare__search');
      if (searchWrap) searchWrap.hidden = true;
    }
  } finally {
    // eslint-disable-next-line no-param-reassign
    block.addPending = false;
  }
}

/**
 * Renders the add-product search form and results dropdown.
 * @param {HTMLElement} container
 * @param {Function} getSkus Live callback — called on each selection to read the current SKU list
 * @param {Function} onAdd Called with the selected product item
 * @param {object[]} searchFilters Parsed filter objects forwarded to every search call
 */
async function renderSearch(container, getSkus, onAdd, searchFilters = []) {
  const itemMap = new Map();

  const dropdown = document.createElement('ul');
  dropdown.className = 'product-compare__search-dropdown';
  dropdown.hidden = true;

  const updateDropdown = (items) => {
    dropdown.innerHTML = '';
    itemMap.clear();
    if (!items?.length) { dropdown.hidden = true; return; }
    items.forEach((item) => {
      itemMap.set(item.sku, item);
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = item.name;
      btn.dataset.sku = item.sku;
      li.append(btn);
      dropdown.append(li);
    });
    dropdown.hidden = false;
  };

  let inputWrap;
  let resetBtnWrap;

  const clearSearch = () => {
    updateDropdown([]);
    if (resetBtnWrap) resetBtnWrap.hidden = true;
    const inputEl = inputWrap?.querySelector('input');
    if (inputEl) {
      inputEl.value = '';
      inputEl.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  dropdown.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-sku]');
    if (!btn) return;
    const item = itemMap.get(btn.dataset.sku);
    if (!item || getSkus().includes(item.sku)) return;
    clearSearch();
    onAdd(item);
  });

  const triggerSearch = debounce(async (phrase) => {
    const result = await search(
      {
        phrase,
        pageSize: 5,
        ...(searchFilters.length ? { filter: searchFilters } : {}),
      },
      { scope: SEARCH_SCOPE },
    );
    updateDropdown(result?.items ?? []);
  }, 300);

  const fieldWrap = document.createElement('div');
  fieldWrap.className = 'product-compare__search-field';

  inputWrap = document.createElement('div');

  resetBtnWrap = document.createElement('div');
  resetBtnWrap.className = 'product-compare__search-reset';
  resetBtnWrap.hidden = true;

  await UI.render(Input, {
    name: 'product-compare-search',
    placeholder: 'Search to add a product...',
    'aria-label': 'Search products to compare',
    onValue: (phrase) => {
      resetBtnWrap.hidden = !phrase;
      if (!phrase || phrase.length < 2) { updateDropdown([]); return; }
      triggerSearch(phrase);
    },
  })(inputWrap);

  await UI.render(Button, {
    icon: h(Icon, { source: 'Close' }),
    variant: 'tertiary',
    'aria-label': 'Clear search',
    onClick: clearSearch,
  })(resetBtnWrap);

  container.addEventListener('focusout', (e) => {
    if (!container.contains(e.relatedTarget)) {
      setTimeout(() => { dropdown.hidden = true; }, 200);
    }
  });

  fieldWrap.append(inputWrap, resetBtnWrap);
  container.append(fieldWrap, dropdown);
}

/**
 * Clears and fully re-renders the block: search form then comparison table.
 * @param {HTMLElement} block
 * @param {string[]} skus
 * @param {string[]|null} allowedAttrs Authored attribute allowlist, or null to show all.
 * @param {object[]} searchFilters Parsed filter objects applied to every search call.
 */
async function renderBlock(block, skus, allowedAttrs = null, searchFilters = []) {
  block.innerHTML = '';

  const searchWrap = document.createElement('div');
  searchWrap.className = 'product-compare__search';
  searchWrap.hidden = skus.length >= MAX_PRODUCTS;
  block.append(searchWrap);
  await renderSearch(
    searchWrap,
    () => getCurrentSkus(block),
    (item) => addProductColumn(block, item, allowedAttrs, searchFilters),
    searchFilters,
  );

  if (!skus.length) return;

  let products;
  try {
    products = await fetchProductsBySkus(skus, searchFilters);
  } catch (err) {
    console.error('[product-compare]', err);
    const msg = document.createElement('p');
    msg.textContent = 'Unable to load product comparison.';
    block.append(msg);
    return;
  }

  if (!products.length) {
    const msg = document.createElement('p');
    msg.textContent = 'No matching products found.';
    block.append(msg);
    return;
  }

  const attrMap = new Map();
  if (allowedAttrs) {
    // Preserve authored order; look up the label from the first product that carries the attribute.
    allowedAttrs.forEach((name) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const p of products) {
        const attr = p.attributes?.find((a) => a.name === name);
        if (attr) { attrMap.set(name, attr.label); break; }
      }
    });
  } else {
    products.forEach((p) => {
      (p.attributes ?? []).forEach(({ name, label }) => {
        if (!attrMap.has(name)) attrMap.set(name, label);
      });
    });
  }

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  headerRow.append(document.createElement('th'));

  const productCols = await Promise.all(
    products.map((p) => buildProductTh(p, () => removeProductColumn(block, p.sku))),
  );
  productCols.forEach((th) => headerRow.append(th));

  const thead = document.createElement('thead');
  thead.append(headerRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  attrMap.forEach((label, name) => {
    const values = products.map(
      (p) => p.attributes?.find((a) => a.name === name)?.value ?? '',
    );
    if (values.every((v) => !v)) return;

    const row = document.createElement('tr');
    const th = document.createElement('th');
    th.scope = 'row';
    th.dataset.attr = name;
    th.textContent = label;
    row.append(th);

    values.forEach((val) => {
      const td = document.createElement('td');
      td.textContent = val || '--';
      row.append(td);
    });

    tbody.append(row);
  });

  table.append(tbody);
  block.append(table);
}

/**
 * Loads and decorates the block. Reads initial SKUs from the ?compare= URL parameter.
 * Supports optional `attributes` and `filters` config rows for attribute display and search scoping
 * @param {Element} block
 */
export default async function decorate(block) {
  const config = readBlockConfig(block);

  const allowedAttrs = config.attributes
    ? config.attributes.split(',').map((s) => s.trim()).filter(Boolean)
    : null;

  // Each entry is "attribute:value"; maps to { attribute, in } filter objects.
  const searchFilters = config.filter
    ? config.filter.split(',').flatMap((pair) => {
      const colonIdx = pair.indexOf(':');
      if (colonIdx === -1) return [];
      const attribute = pair.slice(0, colonIdx).trim();
      const value = pair.slice(colonIdx + 1).trim();
      return attribute && value ? [{ attribute, in: [value] }] : [];
    })
    : [];

  const skus = (new URLSearchParams(window.location.search).get('compare') ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, MAX_PRODUCTS);

  await renderBlock(block, skus, allowedAttrs, searchFilters);
}
