import { Table, provider as UI } from '@dropins/tools/components.js';
import { h } from '@dropins/tools/preact.js';

// Configurable variant availability. Catalog Service `products`(options) + `variants`
// joined with `sourceAvailability` for per-variant qty. Two option axes render as a grid
// (rows x cols); any other count (one, or three-plus) renders a per-variant list built on
// the design-system Table (accessible caption, mobile stacking, per-source detail rows).
// buildMatrixModel stays framework-free, so the model logic can be tested on its own.

// id/title/inStock live on the ProductViewOptionValue interface, so select them there
// (not inside a Swatch fragment) or dropdown axes like Size come back empty.
const OPTIONS_QUERY = `
  query GET_MATRIX_OPTIONS($skus: [String!]!) {
    products(skus: $skus) {
      __typename
      ... on ComplexProductView {
        options {
          id
          title
          values { id title }
        }
      }
    }
  }
`;

const VARIANTS_QUERY = `
  query GET_MATRIX_VARIANTS($sku: String!, $cursor: String) {
    variants(sku: $sku, cursor: $cursor) {
      cursor
      variants {
        selections
        product {
          sku
          __typename
          ... on SimpleProductView {
            inStock
            price { final { amount { value currency } } }
          }
        }
      }
    }
  }
`;

const MAX_VARIANT_PAGES = 20; // bound the cursor loop
const MAX_AVAILABILITY_SKUS = 100; // sourceAvailability caps at 100 SKUs per call

const MATRIX_AVAILABILITY_QUERY = `
  query GET_MATRIX_AVAILABILITY($skus: [String!]!) {
    sourceAvailability(skus: $skus) {
      sku
      sources { source_code available_qty is_in_stock }
    }
  }
`;

// Per-variant state from its sources; falls back to the Catalog Service inStock boolean
// when sourceAvailability is unavailable (query off, or a backend without it).
function cellFromSources(sources, inStock) {
  if (sources.length === 0) {
    return { state: inStock === false ? 'out-of-stock' : 'in-stock', qty: null };
  }
  const live = sources.filter((s) => s.is_in_stock);
  if (live.length === 0) return { state: 'out-of-stock', qty: null };
  if (live.every((s) => s.available_qty != null)) {
    return { state: 'low', qty: live.reduce((sum, s) => sum + Number(s.available_qty), 0) };
  }
  return { state: 'in-stock', qty: null };
}

function toAxis(opt) {
  return { title: opt.title, values: opt.values.map((v) => ({ id: v.id, title: v.title })) };
}

// Normalize one variant into a cell payload: sku, price, live availability.
function toCell(v, availabilityBySku) {
  const sku = v.product?.sku;
  if (!sku) return null;
  const sources = availabilityBySku.get(sku) ?? [];
  const { state, qty } = cellFromSources(sources, v.product?.inStock);
  return {
    sels: v.selections ?? [],
    sku,
    price: v.product?.price?.final?.amount ?? null,
    sources,
    state,
    qty,
  };
}

// Pure: turn the fetched options/variants/availability into a render model. Exactly two
// axes become a grid (rows = first option, cols = second); any other count becomes a
// per-variant list. Returns null when there is nothing to show (no options or variants).
export function buildMatrixModel({ product, variants, availabilityBySku }) {
  const options = product?.options ?? [];
  const cells = variants.map((v) => toCell(v, availabilityBySku)).filter(Boolean);
  if (options.length === 0 || cells.length === 0) return null;

  if (options.length === 2) {
    const [rowOpt, colOpt] = options;
    const rowIds = new Set(rowOpt.values.map((v) => v.id));
    const colIds = new Set(colOpt.values.map((v) => v.id));
    const byCoord = new Map();
    cells.forEach((cell) => {
      const rowId = cell.sels.find((s) => rowIds.has(s));
      const colId = cell.sels.find((s) => colIds.has(s));
      if (rowId && colId) byCoord.set(`${rowId}|${colId}`, cell);
    });
    return {
      layout: 'grid',
      rowOpt: toAxis(rowOpt),
      colOpt: toAxis(colOpt),
      cell: (rowId, colId) => byCoord.get(`${rowId}|${colId}`) ?? null,
    };
  }

  // One or three-plus axes: label each variant by its selected value titles, in option order.
  const titleById = new Map();
  options.forEach((o) => o.values.forEach((v) => titleById.set(v.id, v.title)));
  const rows = cells.map((cell) => ({
    ...cell,
    label: options
      .map((o) => cell.sels.find((s) => o.values.some((v) => v.id === s)))
      .map((id) => titleById.get(id))
      .filter(Boolean)
      .join(' / '),
  }));
  return { layout: 'list', rows };
}

// Formatters + label bundle bound to the current locale.
function formatters(labels) {
  const t = labels?.Custom?.SaleableQty ?? {};
  const lang = document.documentElement.lang || 'en';
  return {
    t,
    fmt: (n) => new Intl.NumberFormat(lang).format(n),
    money: (a) => (a
      ? new Intl.NumberFormat(lang, { style: 'currency', currency: a.currency }).format(a.value)
      : ''),
  };
}

function qtyText(cell, t, fmt) {
  if (cell.state === 'out-of-stock') return t.OutOfStock ?? 'Out of stock';
  if (cell.qty != null) return (t.Available ?? '{qty} available').replace('{qty}', fmt(cell.qty));
  return t.InStock ?? 'In stock';
}

// Per-source breakdown, surfaced on hover for debugging.
function sourcesTitle(sources) {
  return sources
    .map((s) => `${s.source_code}: ${s.is_in_stock ? (s.available_qty ?? 'in stock') : 'out'}`)
    .join('\n');
}

function qtySpan(cell, t, fmt) {
  const qty = document.createElement('span');
  qty.className = 'product-details__matrix__qty';
  qty.textContent = qtyText(cell, t, fmt);
  return qty;
}

// Two axes: a grid, rows = first option, columns = second.
function renderGrid($el, model, { t, fmt, money }) {
  const table = document.createElement('table');
  table.className = 'product-details__matrix';

  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  const corner = document.createElement('th');
  corner.textContent = `${model.rowOpt.title} / ${model.colOpt.title}`;
  headRow.append(corner);
  model.colOpt.values.forEach((c) => {
    const th = document.createElement('th');
    th.scope = 'col';
    th.textContent = c.title;
    headRow.append(th);
  });
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement('tbody');
  model.rowOpt.values.forEach((r) => {
    const tr = document.createElement('tr');
    const rowHead = document.createElement('th');
    rowHead.scope = 'row';
    rowHead.textContent = r.title;
    tr.append(rowHead);

    model.colOpt.values.forEach((c) => {
      const td = document.createElement('td');
      td.className = 'product-details__matrix__cell';
      const cell = model.cell(r.id, c.id);
      if (!cell) {
        td.classList.add('product-details__matrix__cell--none');
        td.textContent = '—';
        tr.append(td);
        return;
      }
      td.dataset.state = cell.state;
      td.title = sourcesTitle(cell.sources);

      const price = document.createElement('span');
      price.className = 'product-details__matrix__price';
      price.textContent = money(cell.price);

      td.append(price, qtySpan(cell, t, fmt));
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);
  $el.replaceChildren(table);
  $el.hidden = false;
}

// One source's availability text, for the per-variant details row.
function sourceText(s, t, fmt) {
  if (!s.is_in_stock) return t.OutOfStock ?? 'Out of stock';
  if (s.available_qty != null) return (t.Available ?? '{qty} available').replace('{qty}', fmt(Number(s.available_qty)));
  return t.InStock ?? 'In stock';
}

// Per-source breakdown, rendered as a details row under its variant (real content, not a
// tooltip), so it is reachable on touch and by screen readers.
function sourcesNode(sources, t, fmt) {
  return h('ul', { className: 'product-details__matrix__sources' }, sources.map((s) => h('li', {
    key: s.source_code,
    className: 'product-details__matrix__source',
    'data-state': s.is_in_stock ? 'in' : 'out',
  }, [
    h('span', { className: 'product-details__matrix__source-name' }, s.source_code),
    h('span', { className: 'product-details__matrix__source-qty' }, sourceText(s, t, fmt)),
  ])));
}

// A variant's aggregate stock line.
function availabilityNode(row, t, fmt) {
  return h('div', { className: 'product-details__matrix__availability' }, [
    h('span', { className: 'product-details__matrix__qty', 'data-state': row.state }, qtyText(row, t, fmt)),
  ]);
}

// One or three-plus axes: a per-variant list on the design-system Table. Per-source rows
// ride along as always-open details rows (the Table has no built-in expander, so the set
// is controlled; we open them all rather than hide the breakdown behind a hover).
function renderList($el, model, { t, fmt, money }) {
  const props = {
    columns: [
      { label: t.Variant ?? 'Variant', key: 'variant' },
      { label: t.Price ?? 'Price', key: 'price' },
      { label: t.Availability ?? 'Availability', key: 'availability' },
    ],
    rowData: model.rows.map((row) => ({
      variant: row.label,
      price: money(row.price),
      availability: availabilityNode(row, t, fmt),
      _rowDetails: row.sources.length ? sourcesNode(row.sources, t, fmt) : undefined,
    })),
    expandedRows: new Set(model.rows.map((_, i) => i)),
    mobileLayout: 'stacked',
    caption: t.TableCaption ?? 'Availability for every option combination.',
  };
  $el.replaceChildren();
  UI.render(Table, props)($el).catch((error) => {
    console.debug('variant-matrix: table render failed', error);
  });
}

// Render the model into $el, dispatching on layout.
export function renderMatrix($el, model, labels) {
  if (!$el || !model) return;
  const f = formatters(labels);
  if (model.layout === 'list') renderList($el, model, f);
  else renderGrid($el, model, f);
}

// Fetch options + variants (Catalog Service) and per-variant availability (core-saas),
// then build the model. Fetch clients are injected so this module imports nothing.
// Returns null when the SKU is not a multi-variant configurable (so the caller can say so).
export async function fetchVariantMatrix(sku, { csFetch, coreFetch }) {
  const optRes = await csFetch.fetchGraphQl(OPTIONS_QUERY, { method: 'GET', variables: { skus: [sku] } });
  if (optRes?.errors?.length) return null;
  const product = (optRes?.data?.products ?? []).find((p) => p.__typename === 'ComplexProductView');
  if (!product || (product.options ?? []).length === 0) return null;

  // Page through variants until the cursor runs out (bounded). Fail closed on any page
  // error or if the bound is hit with more pages remaining, so the grid is never partial.
  const variants = [];
  let cursor = null;
  for (let page = 0; page < MAX_VARIANT_PAGES; page += 1) {
    // eslint-disable-next-line no-await-in-loop -- cursor paging is inherently sequential
    const vr = await csFetch.fetchGraphQl(VARIANTS_QUERY, { method: 'GET', variables: { sku, cursor } });
    if (vr?.errors?.length) return null;
    variants.push(...(vr?.data?.variants?.variants ?? []));
    cursor = vr?.data?.variants?.cursor ?? null;
    if (!cursor) break;
  }
  if (cursor || variants.length === 0) return null;

  // Per-variant availability from core, in <=100-SKU chunks (best-effort enrichment;
  // cells fall back to the Catalog Service inStock boolean when it is missing).
  const skus = [...new Set(variants.map((v) => v.product?.sku).filter(Boolean))];
  const chunks = [];
  for (let i = 0; i < skus.length; i += MAX_AVAILABILITY_SKUS) {
    chunks.push(skus.slice(i, i + MAX_AVAILABILITY_SKUS));
  }
  const availabilityBySku = new Map();
  const results = await Promise.all(chunks.map((chunk) => coreFetch
    .fetchGraphQl(MATRIX_AVAILABILITY_QUERY, { method: 'GET', variables: { skus: chunk } })
    .catch(() => null)));
  results.forEach((res) => {
    const rows = res?.data?.sourceAvailability ?? [];
    rows.forEach((s) => availabilityBySku.set(s.sku, s.sources ?? []));
  });

  return buildMatrixModel({ product, variants, availabilityBySku });
}
