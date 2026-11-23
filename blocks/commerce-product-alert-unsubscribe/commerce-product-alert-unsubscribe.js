import { SignIn } from '@dropins/storefront-auth/containers/SignIn.js';
import { render as authRenderer } from '@dropins/storefront-auth/render.js';
import { Button, InLineAlert, provider as UI } from '@dropins/tools/components.js';
import { readBlockConfig } from '../../scripts/aem.js';
import {
  CORE_FETCH_GRAPHQL,
  CUSTOMER_ACCOUNT_PATH,
  CUSTOMER_FORGOTPASSWORD_PATH,
  checkIsAuthenticated,
  rootLink,
} from '../../scripts/commerce.js';

// Initialize
import '../../scripts/initializers/auth.js';

const ACTION_UNSUBSCRIBE = 'unsubscribe';
const ACTION_UNSUBSCRIBE_ALL = 'unsubscribe-all';

const ALERT_TYPES = {
  stock: {
    label: 'back-in-stock',
    mutation: 'unsubscribeProductAlertStock',
    mutationAll: 'unsubscribeProductAlertStockAll',
  },
  price: {
    label: 'price change',
    mutation: 'unsubscribeProductAlertPrice',
    mutationAll: 'unsubscribeProductAlertPriceAll',
  },
};

/**
 * Resolves the alert type from block config, falling back to the page path
 * (/customer/stock-alerts or /customer/price-alerts).
 * @param {Element} block
 * @returns {string|null} stock|price
 */
function getAlertType(block) {
  const configured = String(readBlockConfig(block)?.type || '').trim().toLowerCase();
  if (ALERT_TYPES[configured]) return configured;

  const { pathname } = window.location;
  if (/\/price-alerts\/?$/.test(pathname)) return 'price';
  if (/\/stock-alerts\/?$/.test(pathname)) return 'stock';
  return null;
}

/**
 * Builds the unsubscribe mutation for the requested action.
 * @param {object} alert ALERT_TYPES entry
 * @param {string} action
 * @param {string} sku
 * @returns {{query: string, variables?: object, field: string}}
 */
function buildMutation(alert, action, sku) {
  if (action === ACTION_UNSUBSCRIBE_ALL) {
    return {
      field: alert.mutationAll,
      query: `mutation { ${alert.mutationAll} { success message } }`,
    };
  }

  return {
    field: alert.mutation,
    query: `mutation ($sku: String!) { ${alert.mutation}(input: { sku: $sku }) { success message } }`,
    variables: { sku },
  };
}

function renderAlert(container, type, heading, description) {
  container.replaceChildren();
  return UI.render(InLineAlert, {
    type,
    variant: 'primary',
    heading,
    description,
    'aria-live': 'assertive',
    role: 'alert',
  })(container);
}

function renderAccountLink(container) {
  const wrapper = document.createElement('div');
  wrapper.className = 'commerce-product-alert-unsubscribe__actions';
  container.append(wrapper);
  return UI.render(Button, {
    children: 'Go to My Account',
    variant: 'secondary',
    href: rootLink(CUSTOMER_ACCOUNT_PATH),
  })(wrapper);
}

async function unsubscribe(alert, action, sku) {
  const { query, variables, field } = buildMutation(alert, action, sku);
  const { data, errors } = await CORE_FETCH_GRAPHQL.fetchGraphQl(query, {
    method: 'POST',
    variables,
  });

  if (errors?.length) {
    throw new Error(errors[0]?.message || 'Unable to update your alert subscription.');
  }

  return data?.[field] || { success: false };
}

async function renderConfirmation(block, alert, action, sku) {
  const content = document.createElement('div');
  content.className = 'commerce-product-alert-unsubscribe__content';

  const heading = document.createElement('h2');
  heading.textContent = `Unsubscribe from ${alert.label} alerts`;

  const message = document.createElement('p');
  if (action === ACTION_UNSUBSCRIBE_ALL) {
    message.textContent = `You will stop receiving ${alert.label} alerts for all products.`;
  } else {
    message.append(`You will stop receiving ${alert.label} alerts for product `);
    const skuEl = document.createElement('strong');
    skuEl.textContent = sku;
    message.append(skuEl, '.');
  }

  const status = document.createElement('div');
  status.className = 'commerce-product-alert-unsubscribe__status';

  const actions = document.createElement('div');
  actions.className = 'commerce-product-alert-unsubscribe__actions';

  content.append(heading, message, status, actions);
  block.replaceChildren(content);

  // Require an explicit click: email link scanners prefetch GET URLs, so the
  // mutation must never run on page load.
  let button;
  let inFlight = false;
  const setBusy = (busy) => {
    inFlight = busy;
    button?.setProps((prev) => ({ ...prev, disabled: busy, loading: busy }));
  };

  button = await UI.render(Button, {
    children: 'Unsubscribe',
    variant: 'primary',
    onClick: async () => {
      if (inFlight) return;
      setBusy(true);

      try {
        const result = await unsubscribe(alert, action, sku);
        if (result.success) {
          actions.replaceChildren();
          await renderAlert(status, 'success', 'You have been unsubscribed.', result.message || '');
          await renderAccountLink(content);
          return;
        }
        await renderAlert(status, 'error', 'Unsubscribe failed.', result.message || 'Please try again later.');
      } catch (error) {
        console.error('Product alert unsubscribe failed', error);
        await renderAlert(status, 'error', 'Unsubscribe failed.', 'Please try again later.');
      }
      setBusy(false);
    },
  })(actions);
}

export default async function decorate(block) {
  const alertType = getAlertType(block);
  block.replaceChildren();

  const params = new URLSearchParams(window.location.search);
  const action = params.get('action');
  const sku = (params.get('sku') || '').trim();
  const alert = ALERT_TYPES[alertType];

  const isValid = alert && (
    action === ACTION_UNSUBSCRIBE_ALL || (action === ACTION_UNSUBSCRIBE && sku !== '')
  );

  if (!isValid) {
    const status = document.createElement('div');
    block.append(status);
    await renderAlert(status, 'warning', 'Invalid unsubscribe link.', 'Please use the link from your product alert email.');
    return;
  }

  if (!checkIsAuthenticated()) {
    // Product alert mutations act on the logged-in customer: sign in, then
    // come back to this exact URL (action + sku preserved).
    const returnUrl = `${window.location.pathname}${window.location.search}`;
    await authRenderer.render(SignIn, {
      routeForgotPassword: () => rootLink(CUSTOMER_FORGOTPASSWORD_PATH),
      routeRedirectOnSignIn: () => returnUrl,
    })(block);
    return;
  }

  await renderConfirmation(block, alert, action, sku);
}
