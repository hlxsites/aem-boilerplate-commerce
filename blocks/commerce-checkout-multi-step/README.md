# Commerce Checkout Multi-step

This guide will walk you through the steps to extend the Checkout to implement a multi-step checkout using the available Storefront Dropin containers.

## Hands on

We'll use the **commerce-checkout** block as our starting point and iteratively update it to meet the new product requirements.

> [!NOTE]
> Please note the _**commerce-checkout.js**_ block is the only one that is fully functional up-to-date with the latest Drop-ins versions.
> Use the following guidelines just as a reference when creating a new checkout experience.

## Step-by-Step Process:

### 1. Duplicate the commerce-checkout block

First, we'll duplicate the **commerce-checkout** block.

### 2. Initialization

We need to ensure we import the initializers of the all dropins that we are going to use. For this example, we'll use the account and the checkout:

```diff
export default async function decorate(block) {
+  // Initializers
+  import('../../scripts/initializers/account.js');
+  import('../../scripts/initializers/checkout.js');
...
+  const DEBOUNCE_TIME = 1000;
+  const LOGIN_FORM_NAME = 'login-form';
+  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
+  const BILLING_FORM_NAME = 'selectedBillingAddress';
+  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
+  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;
```

**Note:** We've also defined some constants that we are going to use later on to render the containers.

### 3. Layout

We'll define the layout for or checkout with a contextual fragment and we'll also reference the DOM elements were we are going to render our containers. Finally, we replace the block content with the fragment we've just created.

```diff
+  // Define the Layout for the Checkout
+  const checkoutFragment = document.createRange().createContextualFragment(`
+    <div class="checkout__wrapper">
+      <div class="checkout__merged-cart-banner"></div>
+      <div class="checkout__heading"></div>
+      <div class="checkout__empty-cart"></div>
+      <div class="checkout__server-error"></div>
+      <div class="checkout__out-of-stock"></div>
+      <div class="checkout__content">
+        <div class="checkout__main">
+          <div class="checkout__shipping">
+            <div class="checkout__shipping-title"></div>
+            <div class="checkout__login"></div>
+            <div class="checkout__shipping-form"></div>
+            <div class="checkout__continue-to-delivery"></div>
+          </div>
+          <div class="checkout__delivery">
+            <div class="checkout__delivery-title"></div>
+            <div class="checkout__delivery-methods"></div>
+            <div class="checkout__continue-to-payment"></div>
+          </div>
+          <div class="checkout__payment">
+            <div class="checkout__payment-title"></div>
+            <div class="checkout__bill-to-shipping"></div>
+            <div class="checkout__billing-form"></div>
+            <div class="checkout__payment-methods"></div>
+            <div class="checkout__place-order"></div>
+          </div>
+        </div>
+        <div class="checkout__aside">
+          <div class="checkout__block checkout__order-summary"></div>
+          <div class="checkout__block checkout__cart-summary"></div>
+        </div>
+      </div>
+    </div>
+  `);
+
+  const $mergedCartBanner = checkoutFragment.querySelector(
+    '.checkout__merged-cart-banner',
+  );
+  const $heading = checkoutFragment.querySelector('.checkout__heading');
+  const $emptyCart = checkoutFragment.querySelector('.checkout__empty-cart');
+  const $serverError = checkoutFragment.querySelector(
+    '.checkout__server-error',
+  );
+  const $outOfStock = checkoutFragment.querySelector('.checkout__out-of-stock');
+  const $content = checkoutFragment.querySelector('.checkout__content');
+
+  const $orderSummary = checkoutFragment.querySelector('.checkout__order-summary');
+  const $cartSummary = checkoutFragment.querySelector('.checkout__cart-summary');
+
+  const $shippingTitle = checkoutFragment.querySelector('.checkout__shipping-title');
+  const $login = checkoutFragment.querySelector('.checkout__login');
+  const $shippingForm = checkoutFragment.querySelector('.checkout__shipping-form');
+  const $continueToDeliveryBtn = checkoutFragment.querySelector(
+    '.checkout__continue-to-delivery',
+  );
+
+  const $deliveryTitle = checkoutFragment.querySelector('.checkout__delivery-title');
+  const $deliveryMethods = checkoutFragment.querySelector(
+    '.checkout__delivery-methods',
+  );
+  const $continueToPaymentBtn = checkoutFragment.querySelector(
+    '.checkout__continue-to-payment',
+  );
+
+  const $paymentTitle = checkoutFragment.querySelector('.checkout__payment-title');
+  const $billToShipping = checkoutFragment.querySelector('.checkout__bill-to-shipping');
+  const $billingForm = checkoutFragment.querySelector('.checkout__billing-form');
+  const $paymentMethods = checkoutFragment.querySelector('.checkout__payment-methods');
+  const $placeOrder = checkoutFragment.querySelector('.checkout__place-order');
+
+  block.appendChild(checkoutFragment);
```

### 4. Render the initial containers
We'll render the initial containers to the corresponding DOM elements that we've created in the previous step:

```js
export default async function decorate(block) {
  ...
  const [
    _mergedCartBanner,
    heading,
    _shippingInfoHeading,
    __shippingMethodHeading,
    _paymentHeading,
    _serverError,
    _outOfStock,
    _loginForm,
    shippingFormSkeleton,
    continueToDeliveryBtn,
    orderSummary,
    _cartSummary,
  ] = await Promise.all([
  ...
    UI.render(Header, {
      title: 'Guest Checkout',
      size: 'large',
      divider: false,
    })($heading),

    UI.render(Header, {
      title: '1. SHIPPING INFORMATION',
      size: 'medium',
      divider: false,
    })($shippingTitle),

    UI.render(Header, {
      title: '2. SHIPPING METHOD',
      size: 'medium',
      divider: false,
    })($deliveryTitle),

    UI.render(Header, {
      title: '3. PAYMENT INFORMATION',
      size: 'medium',
      divider: false,
    })($paymentTitle),
  ...
    // render the initial containers
    CheckoutProvider.render(LoginForm, {
      name: LOGIN_FORM_NAME,
      onSignInClick: async (initialEmailValue) => {
        const signInForm = document.createElement('div');

        AuthProvider.render(AuthCombine, {
          signInFormConfig: {
            renderSignUpLink: true,
            initialEmailValue,
            onSuccessCallback: () => {},
          },
          signUpFormConfig: {
            slots: {
              ...authPrivacyPolicyConsentSlot,
            },
          },
          resetPasswordFormConfig: {},
        })(signInForm);

        showModal(signInForm);
      },
      onSignOutClick: () => {
        authApi.revokeCustomerToken();
      },
    })($login),

    AccountProvider.render(AddressForm, {
      isOpen: true,
      showFormLoader: true,
    })($shippingForm),

    UI.render(Button, {
      children: 'CONTINUE TO SHIPPING METHOD',
      disabled: true,
      onClick: async () => {
        await continueToDelivery();
      },
    })($continueToDeliveryBtn),

    CartProvider.render(OrderSummary, {
      slots: {
        Coupons: (ctx) => {
          const coupons = document.createElement('div');
          CartProvider.render(Coupons)(coupons);
          ctx.appendChild(coupons);
        },
      },
    })($orderSummary),

    CartProvider.render(CartSummaryList, {
      variant: 'secondary',
      slots: {
        Heading: (headingCtx) => {
          const title = 'Your Cart ({count})';

          const cartSummaryListHeading = document.createElement('div');
          cartSummaryListHeading.classList.add('cart-summary-list__heading');

          const cartSummaryListHeadingText = document.createElement('div');
          cartSummaryListHeadingText.classList.add(
            'cart-summary-list__heading-text',
          );

          cartSummaryListHeadingText.innerText = title.replace(
            '({count})',
            headingCtx.count ? `(${headingCtx.count})` : '',
          );
          const editCartLink = document.createElement('a');
          editCartLink.classList.add('cart-summary-list__edit');
          editCartLink.href = '/cart';
          editCartLink.rel = 'noreferrer';
          editCartLink.innerText = 'Edit';

          cartSummaryListHeading.appendChild(cartSummaryListHeadingText);
          cartSummaryListHeading.appendChild(editCartLink);
          headingCtx.appendChild(cartSummaryListHeading);

          headingCtx.onChange((nextHeadingCtx) => {
            cartSummaryListHeadingText.innerText = title.replace(
              '({count})',
              nextHeadingCtx.count ? `(${nextHeadingCtx.count})` : '',
            );
          });
        },
      },
    })($cartSummary),
  ]);
  ...
};
```

At this point, if you access the page were you are using the block, you should see that all the containers are being rendered. The layout is probably not looking good, but don't worry, we are going to fix this in the next step. 

### 5. Styles

As promised, we'll now add some styles to our layout and containers to make them look good. Just open the **commerce-checkout-multi-step.css** file and add the following styles:

```css
/* stylelint-disable selector-class-pattern */

.checkout__wrapper {
  padding-left: 3rem;
  padding-right: 3rem;
}

.checkout__banners {
  padding-top: 1.5rem;
}

.checkout__content {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(var(--grid-4-columns), 1fr);
  gap: var(--spacing-big);
  padding-top: 1.5rem;
}

.checkout__content--empty {
  display: none;
}

.checkout__empty-cart {
  padding-top: 1.5rem;
}

.checkout__main {
  display: grid;
  grid-column: 1 / span 7;
  row-gap: var(--spacing-xbig);
}

.checkout__aside {
  display: grid;
  grid-column: 9 / span 4;
  row-gap: var(--spacing-xbig);
}

.checkout__shipping {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-big);
  padding: 0;
}

.checkout__shipping:has(> div:empty:not(.checkout__continue-to-delivery)) {
  gap: 0;
  padding-top: var(--spacing-small);
  padding-bottom: var(--spacing-small);
  border-top: var(--shape-border-width-3) solid var(--color-neutral-400);
  border-bottom: var(--shape-border-width-3) solid var(--color-neutral-400);
}

.checkout__delivery {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-big);
  padding: 0;
}

.checkout__delivery:has(> div:empty:not(.checkout__continue-to-payment)) {
  gap: 0;
  padding-top: var(--spacing-small);
  padding-bottom: var(--spacing-small);
  border-top: var(--shape-border-width-3) solid var(--color-neutral-400);
  border-bottom: var(--shape-border-width-3) solid var(--color-neutral-400);
}

.checkout__payment {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-big);
  padding: 0;
}

.checkout__payment:has(> div:empty) {
  gap: 0;
  padding-top: var(--spacing-small);
  padding-bottom: var(--spacing-small);
  border-top: var(--shape-border-width-3) solid var(--color-neutral-400);
  border-bottom: var(--shape-border-width-3) solid var(--color-neutral-400);
}

/* temporary fix to hide the default cart heading */
[data-testid='default-cart-heading'] {
  display: none;
}

/* Responsive adjustments */
@media only screen and (width <= 768px) {
  .checkout__wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .checkout__content {
    grid-template-columns: 1fr;
    gap: var(--spacing-big) 0;
  }

  .checkout__main,
  .checkout__aside {
    grid-column: auto;
  }

  .checkout__aside {
    order: -1;
  }
}
```

### 6. Empty cart

First we'll create two utility functions that will allow us to display or remove the **EmptyCart** container when needed:

```js
let emptyCart;

const displayEmptyCart = async () => {
  if (emptyCart) return;

  heading.setProps((prev) => ({
    ...prev,
    title: 'Empty Cart',
  }));

  emptyCart = await CartProvider.render(EmptyCart, {
    routeCTA: () => '/',
  })($emptyCart);

  $content.classList.add('checkout__content--empty');
};

const removeEmptyCart = () => {
  if (!emptyCart) return;

  emptyCart.remove();
  emptyCart = null;
  $emptyCart.innerHTML = '';

  heading.setProps((prev) => ({
    ...prev,
    title: 'Guest Checkout',
  }));

  $content.classList.remove('checkout__content--empty');
};
```

**Note:** See how we are also changing the heading title and adding a new class to the content wrapper so that we are able to hide it.

### 7. Checkout event handlers

Next, we have to start listening for the **checkout/initialized** and **checkout/updated** events so that we are able to identify when to display the empty cart. Add the following declarations at the end of the **decorate** function.

```js
events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
events.on('checkout/updated', handleCheckoutUpdated);
```

Finally, we'll add the missing handlers for the previous events:

```js
const handleCheckoutInitialized = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }
};

const handleCheckoutUpdated = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  removeEmptyCart();
};
```

At this point, if you access the checkout page without a cart, you should see the **EmptyCart** container displayed.

### 8. Shipping Address

You've probably noticed that even after initializing the checkout the shipping form is still loading. To solve this issue, we are going to create a new utility method that we are going to call **continueToShipping**, that is going to remove the skeleton and render the shipping form when the checkout is initialized:

```js
let shippingForm;

const continueToShipping = async (initialData = null) => {
  if (shippingForm) return;

  // cleanup
  shippingFormSkeleton.remove();
  $shippingForm.innerHTML = '';

  const storeConfig = checkoutApi.getStoreConfigCache();

  shippingForm = await AccountProvider.render(AddressForm, {
    addressesFormTitle: 'Shipping address',
    className: 'checkout-shipping-form__address-form',
    formName: SHIPPING_FORM_NAME,
    hideActionFormButtons: true,
    inputsDefaultValueSet: initialData ?? {
      countryCode: storeConfig.defaultCountry,
    },
    isOpen: true,
    onChange: setAddressOnCart({
      api: checkoutApi.setShippingAddress,
      debounceMs: DEBOUNCE_TIME,
      placeOrderBtn: placeOrder,
    }),
    showBillingCheckBox: false,
    showShippingCheckBox: false,
  })($shippingForm);
};
```

### 9. Update event handlers

Next, we need to update the handlers to use it:

```diff
const handleCheckoutInitialized = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

+  // continue to shipping
+  const cartShippingAddress = getCartAddress(data, 'shipping');
+  await continueToShipping(cartShippingAddress);
}

const handleCheckoutUpdated = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  removeEmptyCart();

+  // continue to shipping
+  const cartShippingAddress = getCartAddress(data, 'shipping');
+  await continueToShipping(cartShippingAddress);
}
```

**Note:** We pass the data received in the event to ensure the form is properly initialized with the selected shipping address from the cart if necessary.

### 10. Delivery

If we go back to [step 4](#4-render-the-initial-containers), more precisely to the part where we rendered the **CONTINUE TO SHIPPING METHOD** button, we should see that we added a call to a non existing **continueToDelivery** method and that the button is disabled by default.

First we are going to update the **handleCheckoutUpdated** handler to enable the button when the received data contains a selected shipping address:

```diff
const handleCheckoutUpdated = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  removeEmptyCart();

  // continue to shipping
  const cartShippingAddress = getCartAddress(data, 'shipping');
  await continueToShipping(cartShippingAddress);

+  if (!cartShippingAddress) return;
+
+  continueToDeliveryBtn.setProps((prev) => ({
+    ...prev,
+    disabled: false,
+  }));
}
```

Next, we are going to update the logic inside **handleCheckoutInitialized** handler to automatically call the **continueToDelivery** method if the cart already contains the necessary data:

```diff
 const handleCheckoutInitialized = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  // continue to shipping
  const cartShippingAddress = getCartAddress(data, 'shipping');
  await continueToShipping(cartShippingAddress);

+  // continue to delivery
+  if (!cartShippingAddress) return;
+  await continueToDelivery();
}
```

Finally, we are going create the **continueToDelivery** function that renders all the containers that are relevant to the delivery step:

```js
let deliveryMethods;
let continueToPaymentBtn;

const continueToDelivery = async () => {
  if (deliveryMethods) return;

  deliveryMethods = await CheckoutProvider.render(ShippingMethods, {
    hideOnVirtualCart: true,
  })($deliveryMethods);

  orderSummary.setProps((prev) => ({
    ...prev,
    slots: {
      ...prev.slots,
      EstimateShipping: (esCtx) => {
        const estimateShippingForm = document.createElement('div');
        CheckoutProvider.render(EstimateShipping)(estimateShippingForm);
        esCtx.appendChild(estimateShippingForm);
      },
    },
  }));

  continueToDeliveryBtn.remove();
  $continueToDeliveryBtn.remove();

  continueToPaymentBtn = await UI.render(Button, {
    children: 'CONTINUE TO PAYMENT INFORMATION',
    disabled: true,
    onClick: async () => {
      await continueToPayment();
    },
  })($continueToPaymentBtn);
};
```

### 11. Payment

Similarly to what we did in the [step 10](#10-delivery), we now need to add the logic to enable the **CONTINUE TO PAYMENT INFORMATION** button and to implement the missing method **continueToPayment**.

Same as we did before, we are going to start by updating the handlers:

```diff
const handleCheckoutInitialized = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  // continue to shipping
  const cartShippingAddress = getCartAddress(data, 'shipping');
  await continueToShipping(cartShippingAddress);

  // continue to delivery
  if (!cartShippingAddress) return;
  await continueToDelivery();

+  // continue to payment
+  const deliveryMethod = getCartDeliveryMethod(data);
+  if (!deliveryMethod) return;
+  await continueToPayment();
}
```

```diff
const handleCheckoutUpdated = async (data) => {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

  removeEmptyCart();

  // continue to shipping
  const cartShippingAddress = getCartAddress(data, 'shipping');
  await continueToShipping(cartShippingAddress);

  if (!cartShippingAddress) return;

  continueToDeliveryBtn.setProps((prev) => ({
    ...prev,
    disabled: false,
  }));

+  const deliveryMethod = getCartDeliveryMethod(data);
+  if (!deliveryMethod) return;
+
+  continueToPaymentBtn.setProps((prev) => ({
+    ...prev,
+    disabled: false,
+  }));
}
```

Next, we are going create the **continueToPayment** function that renders all the containers that are relevant to the payment step:

```js
let billToShipping;
let billingForm;
let paymentMethods;
let placeOrder;

const continueToPayment = async (initialData = null) => {
  if (!billToShipping) {
    billToShipping = await CheckoutProvider.render(BillToShippingAddress, {
      hideOnVirtualCart: true,
      onChange: (checked) => {
        $billingForm.style.display = checked ? 'none' : 'block';
      },
    })($billToShipping);
  }

  if (!billingForm) {
    const storeConfig = checkoutApi.getStoreConfigCache();

    billingForm = await AccountProvider.render(AddressForm, {
      addressesFormTitle: 'Billing address',
      className: 'checkout-billing-form__address-form',
      formName: BILLING_FORM_NAME,
      hideActionFormButtons: true,
      inputsDefaultValueSet: initialData ?? {
        countryCode: storeConfig.defaultCountry,
      },
      isOpen: true,
      onChange: setAddressOnCart({
        api: checkoutApi.setBillingAddress,
        debounceMs: DEBOUNCE_TIME,
        placeOrderBtn: placeOrder,
      }),
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })($billingForm);
  }

  if (!paymentMethods) {
    paymentMethods = await CheckoutProvider.render(PaymentMethods)($paymentMethods);
  }

  if (!placeOrder) {
    placeOrder = await CheckoutProvider.render(PlaceOrder, {
      handlePlaceOrder: async ({ cartId }) => {
        orderApi.placeOrder(cartId).catch(console.error);
      },
    })($placeOrder);
  }

  continueToPaymentBtn.remove();
  $continueToPaymentBtn.remove();
};
```

At this point, we should have a fully functional multi-step checkout, but we still have some work to do...

### 12. Order confirmation

The last step to complete our checkout is to create our order confirmation page. To make things easy, we are going to reuse the code from the **commerce-checkout** block.

First we are going to copy the **displayOrderConfirmation** function.

Then, we are going to copy the **handleOrderPlaced** handler.

And finally, we are going to register the **order/placed** event listener:

```diff
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdated);
+ events.on('order/placed', handleOrderPlaced);
```

## Conclusion

By following these steps, you have successfully implemented a multi-step checkout block using some of the available Storefront Dropin containers.
