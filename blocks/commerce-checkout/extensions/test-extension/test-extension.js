/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import * as orderApi from '@dropins/storefront-order/api.js';

let testPaymentData = null;
let testCheckboxRef = null;

export default {
  id: 'test-extension',
  name: 'Test Extension (Hooks Demo)',

  hooks: {
    /**
     * VALIDATION HOOK: Check code first, set context.isValid = false to fail
     */
    'checkout/validate': async ({ context }) => {
      const { code } = context;

      console.log('[Test Extension] Hook: checkout/validate');
      console.log('[Test Extension] ↳ Payment method code:', code);

      if (code !== 'checkmo') {
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
     * COMPOSITION HOOK: Add payment methods to context.paymentMethods
     */
    'checkout/payment-methods': async ({ context }) => {
      console.log('[Test Extension] Hook: checkout/payment-methods');

      context.paymentMethods.checkmo = {
        autoSync: false,
        render: (ctx) => {
          console.log('[Test Extension] Rendering test payment method');

          const container = document.createElement('div');
          container.style.cssText = 'padding: 20px; border: 2px dashed #ff6b6b; border-radius: 8px; background: #fff5f5;';

          const title = document.createElement('h3');
          title.textContent = 'Test Payment Method';
          title.style.cssText = 'margin: 0 0 10px 0; color: #c92a2a;';

          const description = document.createElement('p');
          description.textContent = 'This is a test payment method for demonstration purposes.';
          description.style.cssText = 'margin: 0 0 15px 0; color: #666;';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.id = 'test-payment-confirm';
          checkbox.required = true;
          checkbox.style.cssText = 'margin-right: 8px;';
          testCheckboxRef = checkbox;

          const label = document.createElement('label');
          label.htmlFor = 'test-payment-confirm';
          label.textContent = 'I confirm this test payment';
          label.style.cssText = 'cursor: pointer;';

          const checkboxContainer = document.createElement('div');
          checkboxContainer.style.cssText = 'margin-bottom: 10px;';
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

      if (code !== 'checkmo') {
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
