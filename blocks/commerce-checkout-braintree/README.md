# Integrating Braintree Payment Method in Checkout

This guide will walk you through the steps to integrate the Braintree payment method into the Checkout.

## Step-by-Step Process:

### 1. Import Braintree

Include the Braintree Drop-in library in your project:

```html
<script src="https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js"></script>
```

Or directly in the `commerce-checkout.js` block file:
```js
import 'https://js.braintreegateway.com/web/dropin/1.43.0/js/dropin.min.js';
```

### 2. Create `braintreeInstance` Variable and Add Braintree Handler to Payment Methods Container

Define a `braintreeInstance` variable to manage the Braintree Drop-in instance. Update the `PaymentMethods` container to include a custom handler for the Braintree payment method and set `setOnChange` to `false` to prevent automatic calls to `setPaymentMethod` mutation on change.

```js
let braintreeInstance;
```

```js
CheckoutProvider.render(PaymentMethods, {
  setOnChange: {
    braintree: false,
  },
  slots: {
    Handlers: {
      braintree: async (ctx) => {
        const container = document.createElement('div');

        window.braintree.dropin.create({
          authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
          container,
        }, (err, dropinInstance) => {
          if (err) {
            console.error(err);
          }

          braintreeInstance = dropinInstance;
        });

        ctx.replaceHTML(container);
      },
    },
  },
})($paymentMethods)
```

### 3. Handle Braintree Payment Method in `PlaceOrder` Container

Implement the Braintree payment logic in the `PlaceOrder` container within the `onPlaceOrder` handler. This includes processing the payment with the Braintree nonce.

```js
CheckoutProvider.render(PlaceOrder, {
  handleValidation: () => {
    // validation handlers skipped
  },
  onPlaceOrder: async (ctx) => {
    await displayOverlaySpinner();

    const paymentMethodCode = ctx.code;

    try {
      switch (paymentMethodCode) {
        case 'braintree': {
          braintreeInstance.requestPaymentMethod(async (err, payload) => {
            if (err) {
              removeOverlaySpinner();
              console.error(err);
              return;
            }

            await checkoutApi.setPaymentMethod({
              code: 'braintree',
              braintree: {
                is_active_payment_token_enabler: false,
                payment_method_nonce: payload.nonce,
              },
            });

            await checkoutApi.placeOrder();

            removeOverlaySpinner();
          });

          break;
        }

        default: {
          await checkoutApi.placeOrder();
          removeOverlaySpinner();
        }
      }
    } catch (error) {
      removeOverlaySpinner();
      throw error;
    }
  },
})($placeOrder)
```