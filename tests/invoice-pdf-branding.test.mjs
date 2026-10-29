import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import loadInvoicePdfBranding from '../blocks/commerce-invoice-details/invoice-pdf-branding.js';

const originalGlobals = {
  window: globalThis.window,
  document: globalThis.document,
  Image: globalThis.Image,
};

afterEach(() => {
  Object.entries(originalGlobals).forEach(([key, value]) => {
    if (value === undefined) delete globalThis[key];
    else globalThis[key] = value;
  });
});

function installImageFixture({ fail = false, context = true, tainted = false } = {}) {
  const images = [];
  const draws = [];
  const canvas = {
    getContext: () => (context ? {
      drawImage: (...args) => draws.push(args),
    } : null),
    toDataURL: (type) => {
      assert.equal(type, 'image/png');
      if (tainted) throw new Error('Canvas is tainted');
      return 'data:image/png;base64,test-logo';
    },
  };
  globalThis.window = { location: { href: 'https://shop.example/drafts/me/invoice-details' } };
  globalThis.document = {
    createElement: (tag) => {
      assert.equal(tag, 'canvas');
      return canvas;
    },
  };
  globalThis.Image = class {
    naturalWidth = 2400;

    naturalHeight = 800;

    constructor() {
      images.push(this);
    }

    set src(value) {
      this.url = value;
      queueMicrotask(() => {
        if (fail) this.onerror();
        else this.onload();
      });
    }
  };
  return { images, draws, canvas };
}

test('missing configuration leaves the existing download unchanged', async () => {
  assert.equal(await loadInvoicePdfBranding(undefined), undefined);
  assert.equal(await loadInvoicePdfBranding(null), undefined);
});

test('merchant name and address do not require image loading', async () => {
  const config = { storeName: 'Example Merchant', addressLines: ['Street', 'City'] };
  assert.deepEqual(await loadInvoicePdfBranding(config), config);
});

test('loads the configured logo with CORS and passes PNG branding without mutating config', async () => {
  const { images, draws, canvas } = installImageFixture();
  const config = {
    logoUrl: '/media/merchant.png',
    storeName: 'Example Merchant',
    addressLines: ['Street', 'City'],
  };
  const branding = await loadInvoicePdfBranding(config);
  assert.deepEqual(branding, {
    storeName: config.storeName,
    addressLines: config.addressLines,
    logoDataUrl: 'data:image/png;base64,test-logo',
  });
  assert.equal(images[0].url, 'https://shop.example/media/merchant.png');
  assert.equal(images[0].crossOrigin, 'anonymous');
  assert.equal(canvas.width, 1200);
  assert.equal(canvas.height, 400);
  assert.equal(draws.length, 1);
  assert.equal(config.logoDataUrl, undefined);
});

test('uses each effective site configuration independently', async () => {
  installImageFixture();
  const first = await loadInvoicePdfBranding({ logoUrl: '/a.png', storeName: 'A' });
  const second = await loadInvoicePdfBranding({ storeName: 'B', addressLines: ['B address'] });
  assert.equal(first.storeName, 'A');
  assert.deepEqual(second, { storeName: 'B', addressLines: ['B address'] });
});

test('rejects malformed branding rather than silently substituting values', async () => {
  for (const config of [
    false, [], { storeName: 42 }, { addressLines: 'Street' },
    { addressLines: [42] }, { logoUrl: 42 }, { logoUrl: ' ' },
  ]) {
    await assert.rejects(loadInvoicePdfBranding(config), /Invalid invoice-pdf-branding/);
  }
});

test('rejects non-HTTP logo URLs', async () => {
  installImageFixture();
  await assert.rejects(
    loadInvoicePdfBranding({ logoUrl: 'javascript:alert(1)' }),
    /HTTP\(S\)/,
  );
});

test('reports inaccessible logos and CORS failures instead of omitting the logo', async () => {
  installImageFixture({ fail: true });
  await assert.rejects(loadInvoicePdfBranding({ logoUrl: '/missing.png' }), /URL and CORS/);
});

test('rejects failed canvas conversion', async () => {
  installImageFixture({ context: false });
  await assert.rejects(loadInvoicePdfBranding({ logoUrl: '/logo.png' }), /convert/);
  installImageFixture({ tainted: true });
  await assert.rejects(loadInvoicePdfBranding({ logoUrl: '/logo.png' }), /tainted/);
});

test('rejects images without usable dimensions', async () => {
  const { images } = installImageFixture();
  const loading = loadInvoicePdfBranding({ logoUrl: '/empty.png' });
  images[0].naturalWidth = 0;
  await assert.rejects(loading, /dimensions/);
});
