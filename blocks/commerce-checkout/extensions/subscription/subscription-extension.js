/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

/**
 * Subscription Extension
 *
 * Adds "Is Recurring" (toggle) and "Frequency" (dropdown) fields to checkout.
 * On place-order, sets them as order custom_attributes via a custom GraphQL
 * mutation. Replace the mutation with your own backend endpoint as needed.
 *
 * Based on: https://developer.adobe.com/commerce/extensibility/
 */

import { fetchGraphQl } from '@dropins/tools/fetch-graphql.js';

const extensionBasePath = new URL('.', import.meta.url).pathname;

let isRecurring = false;
let frequency = 'month';

const FREQUENCY_OPTIONS = [
  { value: 'minute', label: 'Every Minute' },
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' },
];

const SET_ORDER_ATTRIBUTES_MUTATION = `
  mutation setCartCustomAttributes($cartId: String!, $attributes: [CustomAttributeInput!]!) {
    setCustomAttributesOnCart(
      input: { cart_id: $cartId, custom_attributes: $attributes }
    ) {
      cart { id }
    }
  }
`;

function buildSubscriptionUI() {
  const wrapper = document.createElement('div');
  wrapper.className = 'subscription-extension';

  wrapper.innerHTML = `
    <h3 class="subscription-extension__title">Subscription Options</h3>
    <div class="subscription-extension__field">
      <label class="subscription-extension__toggle-label" for="subscription-recurring">
        <span>Recurring order</span>
        <input type="checkbox" id="subscription-recurring" role="switch" />
      </label>
    </div>
    <div class="subscription-extension__field subscription-extension__frequency" data-hidden="true">
      <label for="subscription-frequency">Frequency</label>
      <select id="subscription-frequency">
        ${FREQUENCY_OPTIONS.map(
    (o) => `<option value="${o.value}"${o.value === frequency ? ' selected' : ''}>${o.label}</option>`,
  ).join('')}
      </select>
    </div>
  `;

  const toggle = wrapper.querySelector('#subscription-recurring');
  const freqWrapper = wrapper.querySelector('.subscription-extension__frequency');
  const freqSelect = wrapper.querySelector('#subscription-frequency');

  toggle.addEventListener('change', (e) => {
    isRecurring = e.target.checked;
    freqWrapper.dataset.hidden = String(!isRecurring);
    console.log('[Subscription] is_recurring:', isRecurring);
  });

  freqSelect.addEventListener('change', (e) => {
    frequency = e.target.value;
    console.log('[Subscription] frequency:', frequency);
  });

  return wrapper;
}

export default {
  id: 'subscription',
  name: 'Subscription Extension',

  externalScripts: [],
  externalStyles: [`${extensionBasePath}subscription-extension.css`],

  hooks: {
    /**
     * Inject subscription fields after shipping methods are rendered.
     */
    'checkout/shipping-methods-render': async ({ context }) => {
      const originalRender = context.render;

      context.render = async (props) => {
        const result = await originalRender(props);

        if (!context.container.querySelector('.subscription-extension')) {
          context.container.appendChild(buildSubscriptionUI());
        }

        return result;
      };
    },

    /**
     * Validate: if subscription is enabled, ensure a frequency is selected.
     */
    'checkout/validate': async ({ context }) => {
      if (!isRecurring) return;

      if (!frequency) {
        console.warn('[Subscription] Validation failed — no frequency selected');
        context.isValid = false;
      }
    },

    /**
     * Before order placement, persist subscription attributes on the cart.
     */
    'checkout/place-order': async ({ context }) => {
      if (!isRecurring) return;

      console.log('[Subscription] Setting custom attributes:', { is_recurring: isRecurring, frequency });

      try {
        await fetchGraphQl(SET_ORDER_ATTRIBUTES_MUTATION, {
          variables: {
            cartId: context.cartId,
            attributes: [
              { attribute_code: 'is_recurring', value: String(isRecurring) },
              { attribute_code: 'frequency', value: frequency },
            ],
          },
        });
      } catch (err) {
        console.error('[Subscription] Failed to set custom attributes:', err);
      }
    },
  },
};
