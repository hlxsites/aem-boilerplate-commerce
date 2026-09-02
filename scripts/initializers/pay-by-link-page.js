import { events } from '@dropins/tools/event-bus.js';
import { initializers } from '@dropins/tools/initializer.js';
import * as checkoutApi from '@dropins/storefront-checkout/api.js';
import {
  CORE_FETCH_GRAPHQL,
  fetchPlaceholders,
} from '../commerce.js';
import {
  configurePayByLinkClient,
  PBL_FETCH_GRAPHQL,
} from './pay-by-link-client.js';

const setMeta = (name, content) => {
  let meta = document.head.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = name;
    document.head.append(meta);
  }
  meta.content = content;
};

export default async function initializePayByLinkPage() {
  document.body.classList.add('pay-by-link-page');
  setMeta('robots', 'noindex,nofollow');
  setMeta('referrer', 'no-referrer');
  configurePayByLinkClient(CORE_FETCH_GRAPHQL);
  const labels = await fetchPlaceholders('placeholders/checkout.json');
  checkoutApi.setEndpoint(PBL_FETCH_GRAPHQL);
  await initializers.mountImmediately(checkoutApi.initialize, {
    langDefinitions: { default: { ...labels } },
  });

  events.on('aem/lcp', async () => {
    const recaptcha = await import('@dropins/tools/recaptcha.js');
    recaptcha.setEndpoint(PBL_FETCH_GRAPHQL);
    recaptcha.enableLogger(true);
    return recaptcha.setConfig();
  });
}
