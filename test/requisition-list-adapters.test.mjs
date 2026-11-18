import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequisitionListAdapters } from '../scripts/requisition-list-adapters.js';

const amount = (value) => ({ amount: { value, currency: 'USD' } });
const product = (sku = 'parent') => ({
  sku,
  name: sku,
  price: { roles: ['visible'], final: amount(0), regular: amount(10) },
});
const parent = () => ({
  ...product(),
  options: [{ title: 'Color', values: [{ title: 'Red', id: 'catalog-red' }] }],
});
const line = (uid = '1') => ({
  uid,
  sku: 'parent',
  quantity: 0,
  configurable_options: [{ option_label: 'Color', value_label: 'Red' }],
});
const variant = () => ({
  ...product(),
  __typename: 'SimpleProductView',
  variantSku: 'child',
  variantName: 'Red variant',
});

test('uses raw responses, preserves zero and does not expose hidden or fallback prices', async () => {
  const inputs = [
    product('zero'),
    { ...product('hidden'), price: { ...product().price, roles: [] } },
    { ...product('missing-final'), price: { roles: ['visible'], regular: amount(10) } },
    { ...product('range'), price: undefined, priceRange: { minimum: { final: amount(99) } } },
    { ...product('no-roles'), price: { final: amount(99) } },
  ];
  const calls = [];
  const adapters = createRequisitionListAdapters({
    getProductData: async (...args) => {
      calls.push(args);
      return inputs.find(({ sku }) => sku === args[0]);
    },
  });
  const results = await adapters.getProductData(inputs.map(({ sku }) => sku));
  assert.equal(results[0].price.final.amount.value, 0);
  assert.equal(results[1].price, undefined);
  assert.equal(results[2].price.final, undefined);
  assert.equal(results[2].price.regular.amount.value, 10);
  assert.equal(results[3].price, undefined);
  assert.equal(results[3].priceRange, undefined);
  assert.equal(results[4].price, undefined);
  assert.deepEqual(calls[0], ['zero', { preselectFirstOption: false }, true]);
});

test('retains successful SKU results and reports failed and omitted lookups', async () => {
  const warnings = [];
  const adapters = createRequisitionListAdapters({
    getProductData: async (sku) => {
      if (sku === 'failed') throw new Error('Unavailable');
      return sku === 'missing' ? null : product(sku);
    },
  });
  const results = await adapters.getProductData(['first', 'failed', 'missing', 'last'], {
    onWarning: (warning) => warnings.push(warning),
  });
  assert.deepEqual(results.map(({ sku }) => sku), ['first', 'last']);
  assert.deepEqual(warnings.map(({ code }) => code).sort(), ['data-unavailable', 'request-failed']);
  assert.deepEqual(warnings.find(({ code }) => code === 'request-failed').skus, ['failed']);
});

test('resolves catalog option IDs from line SKU, deduplicates parents and keeps variant identity', async () => {
  let lookups = 0;
  const adapters = createRequisitionListAdapters({
    getProductData: async () => { lookups += 1; return parent(); },
    getRefinedProduct: async (...args) => {
      assert.deepEqual(args, ['parent', ['catalog-red'], undefined, true]);
      return variant();
    },
  });
  const items = [line('1'), line('2')];
  const results = await adapters.enrichConfigurableProducts(items);
  assert.equal(lookups, 1);
  assert.deepEqual(results.map(({ uid, quantity }) => [uid, quantity]), [['1', 0], ['2', 0]]);
  assert.equal(results[0].configured_product.sku, 'child');
  assert.equal(results[0].configured_product.name, 'Red variant');
  assert.equal(results[0].configured_product.price.final.amount.value, 0);
  assert.equal(items[0].configured_product, undefined);
});

['parent', 'options', 'request', 'hidden'].forEach((failure) => {
  test(`warns without accepting invalid configurable data: ${failure}`, async () => {
    const warnings = [];
    const adapters = createRequisitionListAdapters({
      getProductData: async () => (failure === 'options' ? product() : parent()),
      getRefinedProduct: async () => {
        if (failure === 'request') throw new Error('Failed');
        if (failure === 'parent') return parent();
        return { ...variant(), price: { ...product().price, roles: [] } };
      },
    });
    const results = await adapters.enrichConfigurableProducts([line()], {
      onWarning: (warning) => warnings.push(warning),
    });
    assert.equal(warnings.length, 1);
    assert.deepEqual(warnings[0].itemUids, ['1']);
    if (failure === 'hidden') assert.equal(results[0].configured_product.price, undefined);
    else assert.equal(results[0].configured_product, undefined);
  });
});

test('bounds concurrent product and configurable requests to four', async () => {
  let active = 0;
  let maximum = 0;
  const request = async (result) => {
    active += 1;
    maximum = Math.max(maximum, active);
    await new Promise((resolve) => { setTimeout(resolve, 1); });
    active -= 1;
    return result;
  };
  const adapters = createRequisitionListAdapters({
    getProductData: async () => request(parent()),
    getRefinedProduct: async () => request(variant()),
  });
  await adapters.getProductData(Array.from({ length: 11 }, (_, i) => String(i)));
  assert.equal(maximum, 4);
  maximum = 0;
  await adapters.enrichConfigurableProducts(Array.from({ length: 11 }, (_, i) => line(String(i))));
  assert.equal(maximum, 4);
});

test('keeps successful variants when another parent or refinement request fails', async () => {
  const warnings = [];
  const adapters = createRequisitionListAdapters({
    getProductData: async (sku) => {
      if (sku === 'bad-parent') throw new Error('Parent lookup failed');
      return parent();
    },
    getRefinedProduct: async (sku) => {
      if (sku === 'bad-variant') throw new Error('Refinement failed');
      return variant();
    },
  });
  const items = [
    { ...line('1'), sku: 'bad-parent' },
    { ...line('2'), sku: 'bad-variant' },
    line('3'),
    { uid: '4', sku: 'simple', quantity: 1 },
  ];
  const results = await adapters.enrichConfigurableProducts(items, {
    onWarning: (warning) => warnings.push(warning),
  });
  assert.deepEqual(results.map(({ uid }) => uid), ['1', '2', '3', '4']);
  assert.equal(results[2].configured_product.sku, 'child');
  assert.equal(results[3], items[3]);
  assert.deepEqual(warnings.map(({ itemUids }) => itemUids), [['1'], ['2']]);
});

test('discards an aborted refinement and never schedules another variant', async () => {
  const controller = new AbortController();
  let calls = 0;
  const adapters = createRequisitionListAdapters({
    getProductData: async () => parent(),
    getRefinedProduct: async () => {
      calls += 1;
      controller.abort();
      return variant();
    },
  });
  const warnings = [];
  await assert.rejects(adapters.enrichConfigurableProducts(
    Array.from({ length: 10 }, (_, i) => line(String(i))),
    { signal: controller.signal, onWarning: (warning) => warnings.push(warning) },
  ), { name: 'AbortError' });
  assert.equal(calls, 1);
  assert.deepEqual(warnings, []);
});

test('suppresses late failures from every in-flight request after cancellation', async () => {
  const controller = new AbortController();
  const pending = [];
  const warnings = [];
  const adapters = createRequisitionListAdapters({
    getProductData: () => new Promise((_resolve, reject) => { pending.push(reject); }),
  });
  const loading = adapters.getProductData(['a', 'b', 'c', 'd', 'e'], {
    signal: controller.signal,
    onWarning: (warning) => warnings.push(warning),
  });
  assert.equal(pending.length, 4);
  controller.abort();
  pending.forEach((reject) => reject(new Error('Late failure')));
  await assert.rejects(loading, { name: 'AbortError' });
  assert.equal(pending.length, 4);
  assert.deepEqual(warnings, []);
});

['products', 'configurables'].forEach((stage) => {
  test(`stops scheduling after abort and discards late ${stage} responses without warnings`, async () => {
    const controller = new AbortController();
    let calls = 0;
    const warnings = [];
    const adapters = createRequisitionListAdapters({
      getProductData: async () => {
        calls += 1;
        controller.abort();
        return parent();
      },
    });
    const context = { signal: controller.signal, onWarning: (warning) => warnings.push(warning) };
    const result = stage === 'products'
      ? adapters.getProductData(['a', 'b', 'c', 'd', 'e'], context)
      : adapters.enrichConfigurableProducts([line(), line(), line(), line(), line()], context);
    await assert.rejects(result, { name: 'AbortError' });
    assert.equal(calls, 1);
    assert.deepEqual(warnings, []);
  });
});
