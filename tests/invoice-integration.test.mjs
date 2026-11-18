import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { createContext, SourceTextModule, SyntheticModule } from 'node:vm';

async function loadHostModule(path, { url, authenticated = false, root = '', branding } = {}) {
  const calls = { mounts: [], renders: [], errors: [], listeners: {} };
  const parsedUrl = new URL(url);
  const location = {
    href: parsedUrl.href,
    origin: parsedUrl.origin,
    pathname: parsedUrl.pathname,
    search: parsedUrl.search,
    hash: parsedUrl.hash,
  };
  const context = createContext({
    URL,
    URLSearchParams,
    window: { location },
    console: { error: (...args) => calls.errors.push(args) },
  });
  const commerceSource = await readFile(new URL('../scripts/commerce.js', import.meta.url), 'utf8');
  const paths = Object.fromEntries([...commerceSource.matchAll(
    /export const (\w+_PATH) = (['"`])(.+?)\2;/g,
  )].map(([, key, , value]) => [key, value.replace('${CUSTOMER_PATH}', '/customer')]));
  const render = (container, props) => async (block) => {
    calls.renders.push({ container, props, block });
  };
  const modules = new Map();
  const entry = new URL(`../${path}`, import.meta.url);
  const module = new SourceTextModule(await readFile(entry, 'utf8'), { context });
  await module.link(async (specifier) => {
    if (modules.has(specifier)) return modules.get(specifier);
    let exports;
    if (specifier.endsWith('/commerce.js')) {
      exports = {
        ...paths,
        CORE_FETCH_GRAPHQL: {},
        checkIsAuthenticated: () => authenticated,
        fetchPlaceholders: async () => ({}),
        rootLink: (destination) => (
          root && !destination.startsWith(`${root}/`) ? `${root}${destination}` : destination
        ),
      };
    } else if (specifier === './index.js') {
      exports = { initializeDropin: (callback) => callback };
    } else if (specifier.endsWith('/event-bus.js')) {
      exports = { events: { on: (name, callback) => { calls.listeners[name] = callback; } } };
    } else if (specifier.endsWith('/initializer.js')) {
      exports = { initializers: { mountImmediately: async (_, config) => calls.mounts.push(config) } };
    } else if (specifier.endsWith('/api.js')) {
      exports = { initialize: () => {}, setEndpoint: () => {} };
    } else if (specifier.endsWith('/render.js')) {
      exports = { render: { render } };
    } else if (specifier.endsWith('/configs.js')) {
      exports = { getConfigValue: () => branding };
    } else if (specifier === './invoice-pdf-branding.js') {
      const actual = await import('../blocks/commerce-invoice-details/invoice-pdf-branding.js');
      exports = { default: actual.default };
    } else if (specifier.includes('/containers/')) {
      const name = specifier.split('/').pop().replace('.js', '');
      exports = { [name]: name };
    } else if (specifier.includes('/initializers/')) {
      exports = {};
    } else {
      throw new Error(`Unexpected dependency in ${path}: ${specifier}`);
    }
    const dependency = new SyntheticModule(Object.keys(exports), function setExports() {
      Object.entries(exports).forEach(([name, value]) => this.setExport(name, value));
    }, { context });
    modules.set(specifier, dependency);
    return dependency;
  });
  await module.evaluate();
  return { decorate: module.namespace.default, calls, location };
}

for (const suffix of ['', '/']) {
  test(`invoice navigation preserves root prefixes and encoded references (suffix "${suffix}")`, async () => {
    const list = await loadHostModule('blocks/commerce-order-invoices/commerce-order-invoices.js', {
      url: `https://shop.example/fr/customer/order-details${suffix}?orderRef=ORDER%2F1`,
      root: '/fr',
    });
    await list.decorate({});
    const destination = list.calls.renders[0].props.routeInvoiceDetails(
      { number: 'INV & 2' }, 'ORDER/1',
    );
    const parsed = new URL(destination, 'https://shop.example');
    assert.equal(parsed.pathname, '/fr/customer/invoice-details');
    assert.equal(parsed.searchParams.get('orderRef'), 'ORDER/1');
    assert.equal(parsed.searchParams.get('invoiceRef'), 'INV & 2');

    const details = await loadHostModule('blocks/commerce-invoice-details/commerce-invoice-details.js', {
      url: parsed.href.replace('/invoice-details?', `/invoice-details${suffix}?`),
      root: '/fr',
    });
    await details.decorate({});
    const props = details.calls.renders[0].props;
    assert.equal(props.invoiceRef, 'INV & 2');
    assert.equal(props.routeInvoicesList(), '/fr/customer/order-details?orderRef=ORDER%2F1');
    assert.equal(await props.getInvoicePdfBranding(), undefined);
  });
}

test('signed-out invoice destination survives sign-in including query, hash, and root prefix', async () => {
  const destination = '/fr/invoice-details?orderRef=000123&invoiceRef=INV%2F2#items';
  const initializer = await loadHostModule('scripts/initializers/order.js', {
    url: `https://shop.example${destination}`,
    root: '/fr',
  });
  const loginUrl = new URL(initializer.location.href, 'https://shop.example');
  assert.equal(loginUrl.pathname, '/fr/customer/login');
  assert.equal(loginUrl.searchParams.get('redirectUrl'), destination);
  assert.equal(initializer.calls.mounts.length, 0);

  const login = await loadHostModule('blocks/commerce-login/commerce-login.js', {
    url: loginUrl.href,
    root: '/fr',
  });
  await login.decorate({});
  assert.equal(login.calls.renders[0].props.routeRedirectOnSignIn(), destination);
});

test('authenticated invoice details stay on their destination and initialize the order', async () => {
  const url = 'https://shop.example/invoice-details?orderRef=000123&invoiceRef=INV2';
  const { calls, location } = await loadHostModule('scripts/initializers/order.js', {
    url, authenticated: true,
  });
  assert.equal(location.href, url);
  assert.equal(calls.mounts.length, 1);
  assert.equal(calls.mounts[0].orderRef, '000123');
});

test('guest token order details still initialize without a sign-in redirect', async () => {
  const token = 'guest-order-token-longer-than-twenty';
  const url = `https://shop.example/order-details?orderRef=${token}`;
  const { calls, location } = await loadHostModule('scripts/initializers/order.js', { url });
  assert.equal(location.href, url);
  assert.equal(calls.mounts[0].orderRef, token);
});

test('branding failures are logged and rejected by the host callback', async () => {
  const { decorate, calls } = await loadHostModule(
    'blocks/commerce-invoice-details/commerce-invoice-details.js',
    {
      url: 'https://shop.example/invoice-details?orderRef=000123&invoiceRef=INV2',
      branding: { storeName: 42 },
    },
  );
  await decorate({});
  await assert.rejects(calls.renders[0].props.getInvoicePdfBranding(), /Invalid invoice-pdf-branding/);
  assert.equal(calls.errors.length, 1);
  assert.equal(calls.errors[0][0], 'Unable to prepare invoice PDF branding.');
});
