# Checkout experimentation block

## Introduction

As developers, we've been tasked with extending the checkout to show the delivery options and the estimated shipping cost only after the customer introduces the shipping address.

## Hands on

We'll use the **commerce-checkout** as our starting point and iteratively update it to meet the new product requirements.

### Step 1: ShippingMethods and EstimateShipping rendering

First we need to ensure that the **ShippingMethods** container and the Order's Summary **EstimateShipping** slot are removed from the initial render:

```diff
const [
    _mergedCartBanner,
    _heading,
    _serverError,
    _outOfStock,
    _login,
    shippingFormSkeleton,
    _billToShipping,
    _paymentMethods,
    billingFormSkeleton,
    orderSummary,
    _cartSummary,
    placeOrder,
] = await Promise.all([
  ...
-  CheckoutProvider.render(ShippingMethods, {
-    hideOnVirtualCart: true,
-  })($delivery),
  ...
  CartProvider.render(OrderSummary, {
-    slots: {
-      EstimateShipping: (esCtx) => {
-        const estimateShippingForm = document.createElement('div');
-        CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
-        esCtx.appendChild(estimateShippingForm);
-      },
-    },
  })($orderSummary),
]);
```

**Note:** We've renamed the **_orderSummary** variable to **orderSumary** as we are going to use it later on.

### Step 2: Extract the logic

For this second step we are going to create a custom function **displayShippingMethods** that when called, it will render
the **ShippingMethods** container and update the **OrderSummary** container to pass the **EstimateShipping** slot:

```js
let shippingMethods;
const displayShippingMethods = async () => {
  if (shippingMethods) return;

  $delivery.replaceChildren();

  shippingMethods = await CheckoutProvider.render(ShippingMethods, {
    hideOnVirtualCart: true,
  })($delivery);

  orderSummary.setProps((prev) => ({
    ...prev,
    slots: {
      EstimateShipping: (esCtx) => {
        const estimateShippingForm = document.createElement('div');
        CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
        esCtx.appendChild(estimateShippingForm);
      },
    },
  }));
};
```

**Note:** We've defined a new variable called **shippingMethods** that will eventually hold the reference to the **ShippingMethods** container. We can use it to ensure we do not accidentally render the container twice.

### Step 3: Checkout event handlers

Now that we've written the logic to display the shipping methods, we need to update some of the the checkout event handlers to use it.

We are going to start by updating the handler of the **checkout/initialized** event to call the **displayShippingMethods** after checking the cart's data:

```diff
const handleCheckoutInitialized = async (data) => {
  if (data === null || data.isEmpty) {
    await displayEmptyCart();
    return;
  }

+  const canDisplayDelivery = !!getCartAddress(data, 'shipping');

+  if (canDisplayDelivery) {
+    await displayShippingMethods();
+  }

  if (data.isGuest) {
    await displayGuestAddressForms(data);
  } else {
    await displayCustomerAddressForms(data);
  }
};
```

Now we do the same for the handler of the **checkout/updated** event:

```diff
const handleCheckoutUpdated = async (data) => {
  if (data === null || data.isEmpty) {
    await displayEmptyCart();
    return;
  }

  removeEmptyCart();

+  const canDisplayDelivery = !!getCartAddress(data, 'shipping');

+  if (canDisplayDelivery) {
+    await displayShippingMethods();
+  }

  if (data.isGuest) {
    await displayGuestAddressForms(data);
  } else {
    removeOverlaySpinner();
    await displayCustomerAddressForms(data);
  }
};
```

### Step 4: Delivery options placeholder

To improve the user experience, we want to display a banner that inform users that the delivery options are only going to be visible after providing the shipping details. To do that, we need to update the definition of the **checkoutFragment**: 

```diff
 const checkoutFragment = document.createRange().createContextualFragment(`
  <div class="checkout__wrapper">
    <div class="checkout__loader"></div>
    <div class="checkout__banners">
      <div class="checkout__merged-cart-banner"></div>
    </div>
    <div class="checkout__content">
      <div class="checkout__main">
        <div class="checkout__block checkout__heading"></div>
        <div class="checkout__block checkout__empty-cart"></div>
        <div class="checkout__block checkout__server-error"></div>
        <div class="checkout__block checkout__out-of-stock"></div>
        <div class="checkout__block checkout__login"></div>
        <div class="checkout__block checkout__shipping-form"></div>
        <div class="checkout__block checkout__bill-to-shipping"></div>
        <div class="checkout__block checkout__delivery">
+          <h3 class="checkout__delivery-title">Shipping options</h3>
+          <div class="checkout__delivery-banner">Enter your shipping address to view available shipping methods.</div>
        </div>
        <div class="checkout__block checkout__payment-methods"></div>
        <div class="checkout__block checkout__billing-form"></div>
      </div>
      <div class="checkout__aside">
        <div class="checkout__block checkout__block--aside checkout__order-summary"></div>
        <div class="checkout__block checkout__block--aside checkout__cart-summary"></div>
      </div>
      <div class="checkout__place-order"></div>
    </div>
  </div>
`);
```

Finally, we are going add some styles to the delivery title and banner using some of the available tokens:

```diff
.checkout__main {
  display: grid;
  row-gap: var(--spacing-xbig);
  margin-top: var(--spacing-medium);
}

.checkout__aside {
  display: grid;
  gap: var(--spacing-xbig);
}

+.checkout__delivery-title {
+  color: var(--color-neutral-800);
+  font: var(--type-body-1-default-font);
+  letter-spacing: var(--type-body-1-default-letter-spacing);
+  margin: 0 0 var(--spacing-medium) 0;
+}

+.checkout__delivery-banner {
+  background-color: var(--color-neutral-400);
+  color: var(--color-neutral-700);
+  font: var(--type-body-2-strong-font);
+  letter-spacing: var(--type-body-2-strong-letter-spacing);
+  padding: var(--spacing-small);
+  display: grid;
+  grid-template-columns: 1fr max-content;
+  align-items: center;
+  gap: var(--spacing-small);
+}
```

## Conclusion

By following these steps, you have successfully updated the base **commerce-checkout** block to only display the delivery options and the estimated shipping cost
after the customer provides the shipping details.

