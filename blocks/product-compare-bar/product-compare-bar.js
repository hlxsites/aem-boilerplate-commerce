import {
  Button, Icon, Image, provider as UI,
} from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';
import { isAemAssetsEnabled, tryGenerateAemAssetsOptimizedUrl } from '@dropins/tools/lib/aem/assets.js';
import { events } from '@dropins/tools/event-bus.js';
import { readBlockConfig } from '../../scripts/aem.js';

const MAX_PRODUCTS = 3;
const IMAGE_SIZE = { width: 56, height: 56 };

export default async function decorate(block) {
  const config = readBlockConfig(block);
  const comparePage = config.page ?? '/product-compare';

  const products = []; // { sku, img, name }[]

  // ── Build DOM ─────────────────────────────────────────────────────────────

  const container = document.createElement('div');
  container.className = 'product-compare-bar__container';

  const productsEl = document.createElement('div');
  productsEl.className = 'product-compare-bar__products';

  const actionsEl = document.createElement('div');
  actionsEl.className = 'product-compare-bar__actions';

  const compareBtnWrap = document.createElement('div');
  compareBtnWrap.className = 'product-compare-bar__compare';

  const clearBtnWrap = document.createElement('div');
  clearBtnWrap.className = 'product-compare-bar__clear';

  actionsEl.append(compareBtnWrap, clearBtnWrap);
  container.append(productsEl, actionsEl);

  // ── Render ────────────────────────────────────────────────────────────────

  async function render() {
    productsEl.innerHTML = '';

    await Promise.all(products.map(async ({ sku, img, name }) => {
      const item = document.createElement('div');
      item.className = 'product-compare-bar__product';
      item.dataset.sku = sku;

      if (img) {
        const imgSrc = img.replace(/^https?:/, '');
        const useAem = isAemAssetsEnabled();
        const src = useAem ? tryGenerateAemAssetsOptimizedUrl(imgSrc, sku, {}) : imgSrc;
        const params = useAem
          ? {
            ...IMAGE_SIZE, crop: undefined, fit: undefined, auto: undefined,
          }
          : { ...IMAGE_SIZE };
        const imgWrap = document.createElement('div');
        await UI.render(Image, {
          src,
          alt: name,
          loading: 'lazy',
          params,
        })(imgWrap);
        item.append(imgWrap);
      }

      const nameEl = document.createElement('span');
      nameEl.className = 'product-compare-bar__product-name';
      nameEl.textContent = name;

      const removeBtnWrap = document.createElement('div');
      await UI.render(Button, {
        icon: h(Icon, { source: 'Close' }),
        variant: 'tertiary',
        'aria-label': `Remove ${name}`,
        // eslint-disable-next-line no-use-before-define
        onClick: () => removeProduct(sku),
      })(removeBtnWrap);

      item.append(nameEl, removeBtnWrap);
      productsEl.append(item);
    }));

    const skus = products.map((p) => p.sku).join(',');
    await UI.render(Button, {
      children: 'Compare',
      href: skus ? `${comparePage}?compare=${skus}` : undefined,
      variant: 'primary',
      disabled: !skus,
    })(compareBtnWrap);

    container.hidden = products.length === 0;
  }

  function removeProduct(sku) {
    const idx = products.findIndex((p) => p.sku === sku);
    if (idx !== -1) products.splice(idx, 1);
    render();
  }

  // ── Static buttons ────────────────────────────────────────────────────────

  await UI.render(Button, {
    children: 'Clear All',
    variant: 'secondary',
    onClick: () => {
      products.length = 0;
      render();
    },
  })(clearBtnWrap);

  // ── Events ────────────────────────────────────────────────────────────────

  events.on('compare/products', ({ sku, img, name } = {}) => {
    if (!sku) return;
    const idx = products.findIndex((p) => p.sku === sku);
    if (idx !== -1) {
      products.splice(idx, 1);
    } else if (products.length < MAX_PRODUCTS) {
      products.push({ sku, img, name });
    }
    render();
  });

  // ── Mount ─────────────────────────────────────────────────────────────────

  block.innerHTML = '';
  block.append(container);
  await render();
}
