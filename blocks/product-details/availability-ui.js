// Availability UI from Elsie primitives. Fulfillment icons: Delivery for ship, Business
// for in-store pickup. Rendered via UI.render, mounted once then updated with setProps.
import { Icon, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

const num = (n) => new Intl.NumberFormat(document.documentElement.lang || 'en').format(n);

// Aggregate stock line: the scarcity cue, so low stays a warning.
const AGG_ICON = { 'in-stock': 'CheckWithCircle', low: 'Warning', 'out-of-stock': 'WarningWithCircle' };

function StockIndicator({ state, text }) {
  return h('div', { className: `pdp-stock pdp-stock--${state}` }, [
    h(Icon, { source: AGG_ICON[state], size: '16', 'aria-hidden': 'true' }),
    h('span', { className: 'pdp-stock__text' }, text),
  ]);
}

// Per-source rows are fulfillment visibility, not a per-location warning: available vs not.
function sourceRowState(source, labels) {
  const t = labels?.Custom?.SaleableQty ?? {};
  if (!source.is_in_stock) return { state: 'out-of-stock', text: t.OutOfStock ?? 'Out of stock' };
  if (source.available_qty != null) {
    return { state: 'available', text: (t.Available ?? '{qty} available').replace('{qty}', num(Number(source.available_qty))) };
  }
  return { state: 'available', text: t.InStock ?? 'In stock' };
}

function SourceRow({ source, pickup, labels }) {
  const { state, text } = sourceRowState(source, labels);
  const t = labels?.Custom?.SaleableQty ?? {};
  // sourceAvailability returns only source_code, so resolve a label: a storefront
  // placeholder keyed by code (localizable) first, then the pickup name, else the code.
  const name = t.Source?.[source.source_code] ?? pickup?.name ?? source.source_code;
  const raw = `${source.source_code} · available_qty=${source.available_qty ?? 'null'}`
    + ` · is_in_stock=${source.is_in_stock} · pickup=${pickup ? 'yes' : 'no'}`;
  const fulfillTitle = pickup ? (t.PickupLocation ?? 'Pickup location') : (t.ShipsFrom ?? 'Ships from');
  return h('li', { className: 'pdp-avail__row', 'data-state': state, title: raw }, [
    h(Icon, {
      source: pickup ? 'Business' : 'Delivery', size: '16', className: 'pdp-avail__fulfill', title: fulfillTitle,
    }),
    h('span', { className: 'pdp-avail__name' }, name),
    h('span', { className: 'pdp-avail__qty' }, text),
  ]);
}

function SourceList({ sources, pickupByCode, labels }) {
  const t = labels?.Custom?.SaleableQty ?? {};
  return h('div', { className: 'pdp-avail' }, [
    h('p', { className: 'pdp-avail__title' }, t.ByLocation ?? 'Availability by location'),
    h('ul', { className: 'pdp-avail__list' }, sources.map((s) => h(SourceRow, {
      key: s.source_code,
      source: s,
      pickup: pickupByCode.get(s.source_code),
      labels,
    }))),
  ]);
}

// Mount once per element, then re-render via setProps. The pending render is stored
// synchronously so two rapid calls share one mount; a failed mount is cleared to retry.
// isCurrent guards setProps so a superseded render never overwrites fresher content.
const mounted = new WeakMap();
async function mount($el, Component, props, isCurrent) {
  const existing = mounted.get($el);
  if (existing) {
    let handle = null;
    try {
      handle = await existing;
    } catch (error) {
      mounted.delete($el);
    }
    if (handle) {
      if (isCurrent()) handle.setProps(() => props);
      return;
    }
  }
  if (!isCurrent()) return;
  const pending = UI.render(Component, props)($el);
  mounted.set($el, pending);
  try {
    await pending;
  } catch (error) {
    mounted.delete($el);
    throw error;
  }
}

// Renders the stock line, or hides it when model is null. Skips the reveal if superseded.
export async function renderStockIndicator($el, model, isCurrent = () => true) {
  if (!$el) return;
  if (!model) {
    $el.removeAttribute('data-loading');
    $el.hidden = true;
    return;
  }
  try {
    await mount($el, StockIndicator, model, isCurrent);
    if (isCurrent()) {
      $el.removeAttribute('data-loading');
      $el.hidden = false;
    }
  } catch (error) {
    console.debug('availability-ui: stock indicator render failed', error);
  }
}

// Renders the per-source list, or hides it when there are no sources. Skips if superseded.
export async function renderSourceList($el, {
  sources, pickupByCode, labels, isCurrent = () => true,
}) {
  if (!$el) return;
  if (!sources?.length) {
    $el.removeAttribute('data-loading');
    $el.hidden = true;
    return;
  }
  try {
    await mount($el, SourceList, { sources, pickupByCode, labels }, isCurrent);
    if (isCurrent()) {
      $el.removeAttribute('data-loading');
      $el.hidden = false;
    }
  } catch (error) {
    console.debug('availability-ui: source list render failed', error);
  }
}
