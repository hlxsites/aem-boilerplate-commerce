# Adding Buy Online, Pickup In-Store (BOPIS) to Checkout

This guide will walk you through the steps to extend the Checkout to support the Buy Online, Pickup In-Store (BOPIS) functionality.

## Hands on

We'll use the **commerce-checkout** block as our starting point and iteratively update it to meet the new product requirements.

> [!NOTE]
> Please note the _**commerce-checkout.js**_ block is the only one that is fully functional up-to-date with the latest Drop-ins versions.
> Use the following guidelines just as a reference when creating a new checkout experience.

## Step-by-Step Process:

### 1. Update Content Fragment

For the new section, we need to add additional DOM elements, which can be done by modifying the contextual fragment.

```html
<div class="checkout__delivery-method">
  <h2 class="checkout-delivery-method__title">Delivery Method</h2>
  <div class="checkout-delivery-method__toggle-buttons">
    <div class="checkout-delivery-method__delivery-button"></div>
    <div class="checkout-delivery-method__in-store-pickup-button"></div>
  </div>
</div>
<div class="checkout__in-store-pickup"></div>
```

We will also need to add new selectors, allowing us to use them later to render the required components and content.

```javascript
export const $deliveryButton = fragment.querySelector('.checkout-delivery-method__delivery-button');
export const $inStorePickupButton = fragment.querySelector('.checkout-delivery-method__in-store-pickup-button');
export const $inStorePickup = fragment.querySelector('.checkout__in-store-pickup');
```

### 2. UI Components for Delivery and In-Store Pickup

During the initialization, two buttons are rendered: one for Delivery and one for In-Store Pickup. These buttons allow users to toggle between the two options.

```javascript
UI.render(ToggleButton, {
  label: 'Delivery',
  onChange: () => onToggle('delivery'),
})($deliveryButton),

UI.render(ToggleButton, {
  label: 'In-store Pickup',
  onChange: () => onToggle('in-store-pickup'),
})($inStorePickupButton),
```

### 3. Toggle Between Delivery and In-Store Pickup

The `onToggle` function manages switching between delivery and in-store pickup. It updates the selected state of the buttons and toggles the visibility of the corresponding forms.

```javascript
async function onToggle(type) {
  if (type === 'delivery') {
    deliveryButton.setProps((prev) => ({ ...prev, selected: true }));
    inStorePickupButton.setProps((prev) => ({ ...prev, selected: false }));
    $shippingForm.removeAttribute('hidden');
    $shippingMethods.removeAttribute('hidden');
    $inStorePickup.setAttribute('hidden', '');
  } else {
    inStorePickupButton.setProps((prev) => ({ ...prev, selected: true }));
    deliveryButton.setProps((prev) => ({ ...prev, selected: false }));
    $shippingForm.setAttribute('hidden', '');
    $shippingMethods.setAttribute('hidden', '');
    $inStorePickup.removeAttribute('hidden');
  }
}
```

### 4. Fetching Pickup Locations

The function `fetchPickupLocations` retrieves the list of available pickup locations using a GraphQL query. These locations will be displayed for the user to choose where they'd like to pick up their order.

```javascript
async function fetchPickupLocations() {
  return checkoutApi
    .fetchGraphQl(
      `query pickupLocations {
        pickupLocations {
          items {
            name
            pickup_location_code
          }
          total_count
        }
      }`,
      { method: 'GET', cache: 'no-cache' },
    )
    .then((res) => res.data.pickupLocations.items);
}
```

### 5. Rendering the Pickup Location Options

Once the pickup locations are fetched, they are rendered as radio buttons. The user can select a location, which updates the shipping address with the corresponding pickup location code.

```javascript
const pickupLocations = await fetchPickupLocations();

pickupLocations.forEach((location) => {
  const { name, pickup_location_code } = location;
  const locationRadiobutton = document.createElement('div');

  UI.render(RadioButton, {
    label: name,
    name: 'pickup-location',
    value: name,
    onChange: () => {
      checkoutApi.setShippingAddress({
        pickupLocationCode: pickup_location_code,
      });
    },
  })(locationRadiobutton);

  $inStorePickup.appendChild(locationRadiobutton);
});
```

### 6. Finalizing the BOPIS Flow

Once the user selects "In-store Pickup" and chooses a location, the form for pickup is shown, while the shipping form is hidden. This provides a clear and seamless way for users to choose how they want to receive their order.
