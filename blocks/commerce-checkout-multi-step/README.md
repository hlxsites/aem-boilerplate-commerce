# Commerce Checkout Multi-step

As developers, we've been tasked with implementing a multi-step checkout using the available Storefront Dropin containers.

## Hands on

We'll use the **commerce-checkout** block as our starting point and iteratively update it to meet the new product requirements.

For simplicity, we are only going to cover the guest checkout experience. Check the table below for more details:

| Feature               | Covered |
| --------------------- | ------- |
| Custom Payment Method | ❌      |
| Customer Checkout     | ❌      |
| Empty Cart            | ✅      |
| Guest Checkout        | ✅      |
| Virtual Cart          | ❌      |
| Order Confirmation    | ✅      |

### Step 1: Duplicate the commerce-checkout block

First, we'll duplicate the **commerce-checkout** block. Next, make sure to remove all the content from the CSS file. Finally, open the JS file and remove everything from inside the **decorate** function so that it looks like this:

```js
export default async function decorate(block) {};
```

### Step 2: Initialization

We need to ensure we import the initializers of the all dropins that we are going to use. For this example, we'll use the auth and the checkout:

```diff
export default async function decorate(block) {
+  // Initializers
+  import('../../scripts/initializers/auth.js');
+  import('../../scripts/initializers/checkout.js');

+  const DEBOUNCE_TIME = 1000;
+  const LOGIN_FORM_NAME = 'login-form';
+  const SHIPPING_FORM_NAME = 'selectedShippingAddress';
+  const BILLING_FORM_NAME = 'selectedBillingAddress';
+  const SHIPPING_ADDRESS_DATA_KEY = `${SHIPPING_FORM_NAME}_addressData`;
+  const BILLING_ADDRESS_DATA_KEY = `${BILLING_FORM_NAME}_addressData`;

+  // Pre-fetch checkout store configuration
+  const storeConfig = await checkoutApi.getStoreConfig();
};
```

**Note:** We've also defined some constants that we are going to use later on to render the containers and we've also pre-fetched the store configuration that the checkout dropin is going to use.

### Step 3: Layout

We'll define the layout for or checkout with a contextual fragment and we'll also reference the DOM elements were we are going to render our containers. Finally, we replace the block content with the fragment we've just created.

```diff
export default async function decorate(block) {
  ...
+  // Define the Layout for the Checkout
+  const fragment = document.createRange().createContextualFragment(`
+    <div class="checkout__wrapper">
+      <div class="checkout__heading"></div>
+      <div class="checkout__empty-cart"></div>
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
+          <div class="checkout__order-summary"></div>
+          <div class="checkout__cart-summary"></div>
+        </div>
+      </div>
+    </div>
+  `);
+
+  const $heading = fragment.querySelector('.checkout__heading');
+  const $emptyCart = fragment.querySelector('.checkout__empty-cart');
+  const $content = fragment.querySelector('.checkout__content');
+
+  const $orderSummary = fragment.querySelector('.checkout__order-summary');
+  const $cartSummary = fragment.querySelector('.checkout__cart-summary');
+
+  const $shippingTitle = fragment.querySelector('.checkout__shipping-title');
+  const $login = fragment.querySelector('.checkout__login');
+  const $shippingForm = fragment.querySelector('.checkout__shipping-form');
+  const $continueToDeliveryBtn = fragment.querySelector(
+    '.checkout__continue-to-delivery',
+  );
+
+  const $deliveryTitle = fragment.querySelector('.checkout__delivery-title');
+  const $deliveryMethods = fragment.querySelector(
+    '.checkout__delivery-methods',
+  );
+  const $continueToPaymentBtn = fragment.querySelector(
+    '.checkout__continue-to-payment',
+  );
+
+  const $paymentTitle = fragment.querySelector('.checkout__payment-title');
+  const $billToShipping = fragment.querySelector('.checkout__bill-to-shipping');
+  const $billingForm = fragment.querySelector('.checkout__billing-form');
+  const $paymentMethods = fragment.querySelector('.checkout__payment-methods');
+  const $placeOrder = fragment.querySelector('.checkout__place-order');
+
+  block.replaceChildren(fragment);
};
```

### Step 4: Render the initial containers

We'll render the initial containers to the corresponding DOM elements that we've created in the previous step:

```js
export default async function decorate(block) {
  ...
  const [
    heading,
    _shippingInfoHeading,
    __shippingMethodHeading,
    _paymentHeading,
    _loginForm,
    shippingFormSkeleton,
    continueToDeliveryBtn,
    orderSummary,
    _cartSummary,
  ] = await Promise.all([
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

    // render the initial containers
    CheckoutProvider.render(LoginForm, {
      name: LOGIN_FORM_NAME,
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

    CartProvider.render(OrderSummary)($orderSummary),

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
};
```

At this point, if you access the page were you are using the block, you should see that all the containers are being rendered. The layout is probably not looking good, but don't worry, we are going to fix this in the next step. 

### Step 5: Styles

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

### Step 6: Empty cart

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

Next, we have to start listening for the **checkout/initialized** and **checkout/updated** events so that we are able to identify when to display the empty cart. Add the following declarations at the end of the **decorate** function.

```js
events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
events.on('checkout/updated', handleCheckoutUpdated);
```

Finally, we'll add the missing handlers for the previous events:

```js
async function handleCheckoutInitialized(data) {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }
}

async function handleCheckoutUpdated(data) {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }
  removeEmptyCart();
}
```

At this point, if you access the checkout page without a cart, you should see the **EmptyCart** container displayed.

### Step 7: Shipping Address

You've probably noticed that even after initializing the checkout the shipping form is still loading. To solve this issue, we are going to create a new utility method that we are going to call **continueToShipping**, that is going to remove the skeleton and render the shipping form when the checkout is initialized:

```js
let shippingForm;

const continueToShipping = async (initialData = null) => {
  if (shippingForm) return;

  // cleanup
  shippingFormSkeleton.remove();
  $shippingForm.innerHTML = '';

  shippingForm = await AccountProvider.render(AddressForm, {
    addressesFormTitle: 'Shipping address',
    className: 'checkout-shipping-form__address-form',
    formName: SHIPPING_FORM_NAME,
    hideActionFormButtons: true,
    inputsDefaultValueSet: initialData ?? {
      countryCode: storeConfig.defaultCountry,
    },
    isOpen: true,
    onChange: debounce((values) => {
      setAddressOnCart(values, checkoutApi.setShippingAddress);
    }, DEBOUNCE_TIME),
    showBillingCheckBox: false,
    showShippingCheckBox: false,
  })($shippingForm);
};
```

Next, we need to update the handlers to use it:

```diff
async function handleCheckoutInitialized(data) {
  if (isEmptyCart(data)) {
    await displayEmptyCart();
    return;
  }

+  // continue to shipping
+  const cartShippingAddress = getCartAddress(data, 'shipping');
+  await continueToShipping(cartShippingAddress);
}

async function handleCheckoutUpdated(data) {
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

### Step 8: Delivery

If we go back to [step 4](#step-4-render-the-initial-containers), more precisely to the part where we rendered the **CONTINUE TO SHIPPING METHOD** button, we should see that we added a call to a non existing **continueToDelivery** method and that the button is disabled by default.

First we are going to update the **handleCheckoutUpdated** handler to enable the button when the received data contains a selected shipping address:

```diff
async function handleCheckoutUpdated(data) {
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
async function handleCheckoutInitialized(data) {
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

### Step 9: Payment

Similarly to what we did in the [step 8](#step-8-delivery), we now need to add the logic to enable the **CONTINUE TO PAYMENT INFORMATION** button and to implement the missing method **continueToPayment**.

Same as we did before, we are going to start by updating the handlers:

```diff
async function handleCheckoutInitialized(data) {
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
async function handleCheckoutUpdated(data) {
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

const continueToPayment = async () => {
  if (!billToShipping) {
    billToShipping = await CheckoutProvider.render(BillToShippingAddress, {
      hideOnVirtualCart: true,
      onChange: (checked) => {
        $billingForm.style.display = checked ? 'none' : 'block';
      },
    })($billToShipping);
  }

  if (!billingForm) {
    billingForm = await AccountProvider.render(AddressForm, {
      addressesFormTitle: 'Billing address',
      className: 'checkout-billing-form__address-form',
      formName: BILLING_FORM_NAME,
      hideActionFormButtons: true,
      isOpen: true,
      onChange: debounce((values) => {
        setAddressOnCart(values, checkoutApi.setBillingAddress);
      }, DEBOUNCE_TIME),
      showBillingCheckBox: false,
      showShippingCheckBox: false,
    })($billingForm);
  }

  if (!paymentMethods) {
    paymentMethods = await CheckoutProvider.render(PaymentMethods)($paymentMethods);
  }

  if (!placeOrder) {
    placeOrder = await CheckoutProvider.render(PlaceOrder)($placeOrder);
  }

  continueToPaymentBtn.remove();
  $continueToPaymentBtn.remove();
};
```

At this point, we should have a fully functional multi-step checkout, but we still have some work to do...

### Step 10: Order confirmation

The last step to complete our checkout is to create our order confirmation page. To make things easy, we are going to reuse the code from the **commerce-checkout** block.

First we are going to copy the **displayOrderConfirmation** function.

Then, we are going to copy the **handleCheckoutOrder** handler.

And finally, we are going to register the **checkout/order** event listener:

```diff
  events.on('checkout/initialized', handleCheckoutInitialized, { eager: true });
+ events.on('checkout/order', handleCheckoutOrder);
  events.on('checkout/updated', handleCheckoutUpdated);
```

## Conclusion

By following these steps, you have successfully implemented a multi-step checkout block using some of the available Storefront Dropin containers.
