// Configurable variant matrix (color x size). Catalog Service `products`(options) +
// `variants` joined with `sourceAvailability` for per-variant qty. The incoming/restock
// qty + date is not an MSI concept and needs a custom product attribute.
// No top-level imports so the pure builders/renderers can be tested in isolation.

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

// Pure: turn the fetched options/variants/availability into a grid model. Rows = first
// option, columns = second option. Returns null for anything that is not a 2-axis matrix.
export function buildMatrixModel({ product, variants, availabilityBySku }) {
  const options = product?.options ?? [];
  if (options.length !== 2) return null;
  const [rowOpt, colOpt] = options;
  const rowIds = new Set(rowOpt.values.map((v) => v.id));
  const colIds = new Set(colOpt.values.map((v) => v.id));

  const cells = new Map();
  variants.forEach((v) => {
    const sels = v.selections ?? [];
    const rowId = sels.find((s) => rowIds.has(s));
    const colId = sels.find((s) => colIds.has(s));
    const sku = v.product?.sku;
    if (!rowId || !colId || !sku) return;
    const sources = availabilityBySku.get(sku) ?? [];
    const { state, qty } = cellFromSources(sources, v.product?.inStock);
    cells.set(`${rowId}|${colId}`, {
      sku,
      price: v.product?.price?.final?.amount ?? null,
      sources,
      state,
      qty,
      restock: null, // GAP: incoming qty + available-from date are not exposed by the API
    });
  });

  return {
    rowOpt: toAxis(rowOpt),
    colOpt: toAxis(colOpt),
    cell: (rowId, colId) => cells.get(`${rowId}|${colId}`) ?? null,
  };
}

// Render the grid model into $el.
export function renderMatrix($el, model, labels) {
  if (!$el || !model) return;
  const t = labels?.Custom?.SaleableQty ?? {};
  const lang = document.documentElement.lang || 'en';
  const fmt = (n) => new Intl.NumberFormat(lang).format(n);
  const money = (a) => (a
    ? new Intl.NumberFormat(lang, { style: 'currency', currency: a.currency }).format(a.value)
    : '');

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
      // Per-source breakdown on hover, for debugging.
      td.title = cell.sources
        .map((s) => `${s.source_code}: ${s.is_in_stock ? (s.available_qty ?? 'in stock') : 'out'}`)
        .join('\n');

      const price = document.createElement('span');
      price.className = 'product-details__matrix__price';
      price.textContent = money(cell.price);

      const qty = document.createElement('span');
      qty.className = 'product-details__matrix__qty';
      if (cell.state === 'out-of-stock') qty.textContent = t.OutOfStock ?? 'Out of stock';
      else if (cell.qty != null) qty.textContent = (t.Available ?? '{qty} available').replace('{qty}', fmt(cell.qty));
      else qty.textContent = t.InStock ?? 'In stock';

      // The one API gap, drawn as a placeholder so it is visually obvious.
      const restock = document.createElement('span');
      restock.className = 'product-details__matrix__restock';
      restock.textContent = t.RestockGap ?? 'restock: not in API';

      td.append(price, qty, restock);
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);

  $el.replaceChildren(table);
  $el.hidden = false;
}

// Fetch options + variants (Catalog Service) and per-variant availability (core-saas),
// then build the model. Fetch clients are injected so this module imports nothing.
// Returns null when the SKU is not a 2-axis configurable (so the caller hides the panel).
export async function fetchVariantMatrix(sku, { csFetch, coreFetch }) {
  const optRes = await csFetch.fetchGraphQl(OPTIONS_QUERY, { method: 'GET', variables: { skus: [sku] } });
  if (optRes?.errors?.length) return null;
  const product = (optRes?.data?.products ?? []).find((p) => p.__typename === 'ComplexProductView');
  if (!product || (product.options ?? []).length !== 2) return null;

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
