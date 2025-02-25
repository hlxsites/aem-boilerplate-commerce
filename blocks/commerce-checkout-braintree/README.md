# Integrating Braintree Payment Method in Checkout

This guide will walk you through the steps to integrate the Braintree payment method into the Checkout.

## Hands on

We'll use the **commerce-checkout** block as our starting point and iteratively update it to meet the new product requirements.

> [!NOTE]
> Please note the _**commerce-checkout.js**_ block is the only one that is fully functional up-to-date with the latest Drop-ins versions.
> Use the following guidelines just as a reference when creating a new checkout experience.

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
  slots: {
    Methods: {
      braintree: {
        setOnChange: false,
        render: async (ctx) => {
          const container = document.createElement('div');

          window.braintree.dropin.create({
            authorization: 'sandbox_cstz6tw9_sbj9bzvx2ngq77n4',
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
  },
})($paymentMethods),
```

### 3. Handle Braintree Payment Method in `PlaceOrder` Container

Implement the Braintree payment logic in the `PlaceOrder` container within the `handlePlaceOrder` handler. This includes processing the payment with the Braintree nonce.

```js
CheckoutProvider.render(PlaceOrder, {
  handlePlaceOrder: async ({ cartId, code }) => {
    await displayOverlaySpinner();
    try {
      switch (code) {
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

            await orderApi.placeOrder(cartId);
          });

          break;
        }

        default: {
          await orderApi.placeOrder(cartId);
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await removeOverlaySpinner();
    }
  },
})($placeOrder),
```
