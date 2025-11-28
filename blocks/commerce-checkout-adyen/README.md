# Adyen Integration Guide

This guide walks you through integrating Adyen payments with Adobe Commerce and AEM Commerce Checkout. The integration covers both backend Commerce configuration and frontend checkout implementation.

## Step 1: Install and Setup Adyen Extension in the Commerce Instance

```bash
composer require adyen/module-payment
```

> **Note**: At the time of this integration, the installed version was 9.18.1.

## Step 2: Verify Payment Method

1. Navigate to your Commerce admin panel
2. Configure the Adyen payment method settings
3. Verify installation by visiting `/checkout` - Adyen should appear in the payment methods list if enabled.

## Step 3: Install Checkout Dropin

Install the Adobe Commerce Checkout dropin `@dropins/storefront-checkout` in your AEM site. The recommended version for this integration is **v2.0.0**:

```bash
npm install @dropins/storefront-checkout@2.0.0 --save
```

> This dropin provides the core checkout containers and infrastructure that the Adyen payment method will plug into.

## Step 4: Verify Integration

> **Note**: This step assumes your AEM boilerplate has a `commerce-checkout.js` block already implemented and configured.

1. Navigate to `/checkout`
2. Check the browser console for the `checkout/initialized` event
3. Verify that `adyen_cc` appears in the `availablePaymentMethods` object

## Step 5: Load the Adyen Assets, Styles and Configure the Payment Method slot

Follow the [official Adyen documentation](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in&version=6.16.0#install-adyen-web) for full SDK details. The Checkout block loads the Adyen Drop-in assets directly from Adyen's CDN.

In your checkout block, locate the `CheckoutProvider.render(PaymentMethods, {...})` call and add the Adyen payment method (`adyen_cc`) to the slots structure:

```javascript
CheckoutProvider.render(PaymentMethods, {
  slots: {
    Methods: {
      adyen_cc: {
        autoSync: false,
        render: async (ctx) => {
          // Load the Adyen JS and CSS when the payment-method slot is rendered
          await loadScript('https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/6.16.0/adyen.js', {});
          await loadCSS('https://checkoutshopper-live.adyen.com/checkoutshopper/sdk/6.16.0/adyen.css');

          const { AdyenCheckout, Card } = (window.AdyenWeb) || {};

          if (!AdyenCheckout) {
            console.error('AdyenCheckout not available after import.');
            return;
          }
          // Adyen implementation goes here
        },
      },
      // ... other payment methods
    },
  },
})
```

The assets are fetched directly from the CDN at runtime via `loadScript`/`loadCSS`, keeping your bundle lean and always on the specified SDK version.

**Key points:**

- **Path**: `slots > Methods > adyen_cc > render`
- **autoSync: false**: Prevents the payment method from automatically syncing its state with the backend when selected.
- **render function**: Where you implement the Adyen Card component (detailed in Step 8)

## Step 6: Setup Adyen Global Configuration

**Create Global Configuration**: Follow the [Adyen documentation to set up a global configuration object](https://docs.adyen.com/online-payments/build-your-integration/sessions-flow/?platform=Web&integration=Drop-in&version=6.16.0#id552021099)

## Step 7: Important - 3rd Party Component Integration Pattern

When integrating 3rd party components like Adyen within dropin slots, you **must** follow this specific pattern:

First, declare the `adyenCard` variable at the block level so it can be accessed by both the payment method slot and the `handlePlaceOrder` function:

```javascript
// Add this declaration at the block level
let adyenCard;
```

Locate the `CheckoutProvider.render(PaymentMethods, {...})` and mount the Adyen component once the slot is in the DOM:

```javascript
adyen_cc: {
  render: async (ctx) => {
    // 1. Create the container element
    const $container = document.createElement('div');
    
    // 2. Add container to slot (this is asynchronous/queued)
    ctx.appendChild($container);
    
    // 3. Use onRender to wait for DOM update before mounting 3rd party component
    ctx.onRender(async () => {
      // Check if component is already mounted to prevent duplicates
      if ($container.hasChildNodes()) {
        return;
      }
      
      // Clear any previous reference when mounting to a new container
      adyenCard = null;
      
      // 4. Now mount the 3rd party component to the DOM-connected element
      const checkout = await AdyenCheckout(config);
      adyenCard = new Card(checkout, options);
      adyenCard.mount($container);
    });
  }
}
```

### Why This Pattern is Required

- **Slot methods are asynchronous**: `ctx.appendChild()`, `ctx.replaceWith()`, etc. don't immediately update the DOM - they queue changes
- **3rd party components need DOM-connected elements**: Adyen (and most other components) require mounting to elements that are already in the document
- **`ctx.onRender()` ensures proper timing**: This callback runs after the slot's DOM has been updated
- **Duplicate prevention**: The `hasChildNodes()` check prevents remounting the same component multiple times
- **Framework handles cleanup automatically**: When users switch payment methods, the slot system automatically cleans up and re-renders

#### ❌ Don't Do This (Won't Work)

```javascript
ctx.appendChild($container);
new Card(checkout).mount($container); // ← Container not in DOM yet!
```

#### ✅ Do This (Correct)

```javascript
ctx.appendChild($container);
ctx.onRender(() => {
  // Check if already mounted to prevent duplicates
  if ($container.hasChildNodes()) {
    return;
  }
  
  // Clear previous reference for new container
  adyenCard = null;
  
  adyenCard = new Card(checkout, options);
  adyenCard.mount($container); // ← Container is now in DOM
});
```

## Step 8: Handle Async Payment Processing

Adyen uses an asynchronous callback pattern that requires special handling to integrate with the synchronous `handlePlaceOrder` flow. You need to create a Promise bridge:

```javascript
// In the Adyen onSubmit callback
onSubmit: async (state, component) => {
  try {
    // ... payment processing logic ...
    
    // Resolve the promise in handlePlaceOrder
    adyenCard._orderPromise.resolve();
  } catch (error) {
    component.setStatus('ready');
    
    // Reject the promise in handlePlaceOrder
    adyenCard._orderPromise.reject(error);
  }
}

// In handlePlaceOrder function of the PlaceOrder container
const isAdyen = code === 'adyen_cc';

try {
  if (isAdyen) {
    // Create a promise that resolves/rejects based on the onSubmit callback
    await new Promise((resolve, reject) => {
      // Store the resolve/reject functions so onSubmit can call them
      adyenCard._orderPromise = { resolve, reject };
      
      adyenCard.submit();
    });
  }
} catch () {
  // Catch error
}
```

### Why This Promise Bridge is Required

**The Problem**: Adyen's payment flow is fundamentally different from other payment methods:

- **Other payment methods**: Synchronous flow where `handlePlaceOrder` can `await` the payment directly
- **Adyen payment method**: Asynchronous callback flow where `adyenCard.submit()` returns immediately, but the actual payment processing happens later in the `onSubmit` callback

**Without the Promise bridge**:

```javascript
// This doesn't work properly:
adyenCard.submit(); // Returns immediately
return; // handlePlaceOrder exits immediately
// ... later, onSubmit callback runs but handlePlaceOrder is long gone
```

**Result**:

- ❌ Spinner gets removed too early
- ❌ Errors don't bubble up to the main error handler
- ❌ Inconsistent user experience

**With the Promise bridge**:

```javascript
// This works correctly:
await new Promise((resolve, reject) => {
  adyenCard._orderPromise = { resolve, reject };
  adyenCard.submit();
});
// handlePlaceOrder waits here until onSubmit calls resolve/reject
```

**Result**:

- ✅ Spinner stays visible during payment processing
- ✅ Errors bubble up to the main error handler
- ✅ Consistent user experience with other payment methods
- ✅ Proper async flow coordination

## Step 9: Implement the onSubmit Callback

The `onSubmit` callback is where the actual payment processing happens. Here's the complete sample implementation you need:

```javascript
const checkout = await AdyenCheckout({
  ...globalConfiguration,
  onSubmit: async (state, component) => {
    const additionalData = {
      stateData: JSON.stringify(state.data),
    };
    try {
      const paymentMethod = {
        code: 'adyen_cc',
        adyen_additional_data_cc: additionalData,
      };

      await orderApi.setPaymentMethodAndPlaceOrder(ctx.cartId, paymentMethod);

      // Resolve the promise in handlePlaceOrder
      adyenCard._orderPromise.resolve();
    } catch (error) {
      component.setStatus('ready');
      // Reject the promise in handlePlaceOrder
      adyenCard._orderPromise.reject(error);
    }
  },
});

// Mount the Adyen Card component
adyenCard = new Card(checkout, { showPayButton: false });
adyenCard.mount($adyenCardContainer);
```

### What This Implementation Does

1. **Extracts Payment Data** from the Drop-in (`state.data`).
2. **Prepares Backend Payload** as `adyen_additional_data_cc`.
3. **Sets Payment Method & Places Order** via `orderApi.setPaymentMethodAndPlaceOrder()`.
4. **Bridges Async Flow** by resolving / rejecting the Promise stored in `adyenCard._orderPromise`.
5. **Handles Errors** cleanly—any exception rejects the bridge promise so `handlePlaceOrder` can react.
6. **Mounts the Component** with `showPayButton: false` so the primary Checkout button controls submission.

## Step 10: Configure PlaceOrder Container

```javascript
CheckoutProvider.render(PlaceOrder, {
  handlePlaceOrder: async ({ cartId, code }) => {
    const isAdyen = code === 'adyen_cc';

    if (isAdyen) {
      if (!adyenCard) {
        console.error('Adyen card not rendered.');
        return;
      }

      if (!adyenCard.state?.isValid) {
        adyenCard.showValidation?.();
        return;
      }
    }

    await displayOverlaySpinner();
    
    try {
      if (isAdyen) {
        await new Promise((resolve, reject) => {
          adyenCard._orderPromise = { resolve, reject };
          adyenCard.submit();
        });
        return;
      }
    } finally {
      removeOverlaySpinner();
    }
  },
})($placeOrder);
```

### Key Configuration Points

1. **Early Validation**: Ensures the shopper can't proceed until the card fields are valid.
2. **Promise Bridge**: Keeps the spinner up while Adyen's async `onSubmit` finishes.
3. **Single Spinner**: Shown once for the whole sequence, hidden in `finally`.
4. **Error Safety**: Any error re-throws after the spinner is dismissed.

#### Important Notes

- **Order Creation** happens in the `onSubmit` callback via `orderApi.setPaymentMethodAndPlaceOrder()`.
- **Spinner Management**: The overlay spinner is displayed only when the flow is ready to perform network operations and is removed regardless of success/failure.
- **Validation UX**: `adyenCard.showValidation()` highlights any missing or invalid fields for the shopper.

That completes the Adyen Drop-in integration steps.
