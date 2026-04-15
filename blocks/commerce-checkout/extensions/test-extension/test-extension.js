/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import * as orderApi from '@dropins/storefront-order/api.js';

const extensionBasePath = new URL('.', import.meta.url).pathname;

let testPaymentData = null;
let testCheckboxRef = null;

const PAYMENT_METHOD_CODE = 'checkmo';

export default {
  id: 'test-extension',
  name: 'Test Extension (Hooks Demo)',

  externalScripts: [],
  externalStyles: [`${extensionBasePath}test-extension.css`],

  hooks: {
    /**
     * VALIDATION HOOK: Check code first, set context.isValid = false to fail
     */
    'checkout/validate': async ({ context }) => {
      const { code } = context;

      console.log('[Test Extension] Hook: checkout/validate');
      console.log('[Test Extension] ↳ Payment method code:', code);

      if (code !== PAYMENT_METHOD_CODE) {
        console.log('[Test Extension] ↳ Not our payment method, skipping');
        return;
      }

      console.log('[Test Extension] ↳ Test payment data:', testPaymentData);
      if (testCheckboxRef && !testCheckboxRef.reportValidity()) {
        console.log('[Test Extension] ↳ ❌ Custom validation failed: Test payment not confirmed');
        context.isValid = false;
        return;
      }

      console.log('[Test Extension] ↳ ✅ All validations passed');
    },

    /**
     * PAYMENT METHODS HOOK: Register custom payment method UI and behavior
     */
    'checkout/payment-methods': async ({ context }) => {
      console.log('[Test Extension] Hook: checkout/payment-methods');

      context.paymentMethods[PAYMENT_METHOD_CODE] = {
        autoSync: false,
        render: (ctx) => {
          console.log('[Test Extension] Rendering test payment method');

          const container = document.createElement('div');
          container.className = 'test-payment';

          const title = document.createElement('h3');
          title.textContent = 'Test Payment Method';
          title.className = 'test-payment__title';

          const description = document.createElement('p');
          description.textContent = 'This is a test payment method for demonstration purposes.';
          description.className = 'test-payment__description';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = 'test-payment-confirm';
          checkbox.required = true;
          checkbox.className = 'test-payment__checkbox';
          testCheckboxRef = checkbox;

          const label = document.createElement('label');
          label.htmlFor = 'test-payment-confirm';
          label.textContent = 'I confirm this test payment';
          label.className = 'test-payment__label';

          const checkboxContainer = document.createElement('div');
          checkboxContainer.className = 'test-payment__checkbox-container';
          checkboxContainer.appendChild(checkbox);
          checkboxContainer.appendChild(label);

          checkbox.addEventListener('change', (e) => {
            testPaymentData = { confirmed: e.target.checked };
            console.log('[Test Extension] Payment confirmed:', e.target.checked);
          });

          container.appendChild(title);
          container.appendChild(description);
          container.appendChild(checkboxContainer);

          ctx.replaceHTML(container);
        },
      };
    },

    /**
     * PLACE ORDER HOOK: Handle your payment method, early return if not yours
     */
    'checkout/place-order': async ({ context }) => {
      const { cartId, code } = context;

      console.log('[Test Extension] Hook: checkout/place-order');
      console.log('[Test Extension] ↳ Cart ID:', cartId);
      console.log('[Test Extension] ↳ Payment method code:', code);

      if (code !== PAYMENT_METHOD_CODE) {
        console.log('[Test Extension] ↳ Not our payment method, skipping');
        return;
      }

      context.preventDefault = true;

      console.log('[Test Extension] ↳ 🎉 Processing test payment...');

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      console.log('[Test Extension] ↳ ✅ Test payment processed successfully');
      console.log('[Test Extension] ↳ 📦 Placing order...');

      await orderApi.placeOrder(cartId);

      console.log('[Test Extension] ↳ ✅ Order placed successfully');
    },
  },
};
