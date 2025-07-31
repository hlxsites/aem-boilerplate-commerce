# Commerce Checkout Multi-step

This guide will walk you through the steps to extend the Checkout to implement a multi-step checkout using the available Storefront Dropin containers.

## Overview

The multi-step checkout divides the checkout process into distinct sections that are displayed sequentially, with support for both guest and logged-in users and automatic virtual product detection:

### Standard Physical Product Flow

1. **Login and Shipping Address**
   - **Guest users**: Enter email address for order notifications and create shipping address
   - **Logged-in users**: Automatically detected, can select from saved addresses or create new ones
   - **Validation**: Email format validation, complete shipping address required
   - **API calls**: `setGuestEmailOnCart()`, `setShippingAddress()`

2. **Shipping Methods**
   - **User action**: Select preferred delivery method from available options (Standard, Express, etc.)
   - **Display**: Shows shipping costs, delivery timeframes, and carrier information
   - **Validation**: One shipping method must be selected to proceed
   - **API calls**: `estimateShippingMethods()`, `setShippingMethodsOnCart()`

3. **Payment Methods**
   - **User action**: Choose payment method (Credit Card, PayPal, Check/Money Order, etc.)
   - **Options**: "Bill to shipping address" checkbox for convenience
   - **Credit cards**: Secure form with real-time validation
   - **API calls**: `setPaymentMethod()`

4. **Billing Address**
   - **Conditional**: Only shown if "Bill to shipping address" is unchecked
   - **Guest users**: Fill out complete billing address form
   - **Logged-in users**: Select from saved addresses or create new billing address
   - **API calls**: `setBillingAddress()`

5. **Order Placement**
   - **Review**: Summary of all selections (items, addresses, payment, shipping)
   - **Requirements**: Accept terms and conditions checkbox
   - **Validation**: All previous steps completed and terms accepted
   - **API calls**: `placeOrder()` - final order submission

6. **Order Confirmation**
   - **Display**: Order number, items purchased, total cost, payment method
   - **Shipping details**: Delivery address, shipping method, tracking information
   - **Next steps**: Links to order tracking and account management

### Virtual Product Flow

1. **Login**
   - **Guest users**: Enter email address for order notifications and digital product delivery
   - **Logged-in users**: Automatically detected and authenticated
   - **Validation**: Email format validation required
   - **API calls**: `setGuestEmailOnCart()` for guest users

2. **Payment Methods**
   - **User action**: Choose payment method for digital products
   - **No shipping**: Shipping-related options hidden (no "bill to shipping" checkbox)
   - **Focus**: Immediate payment processing for instant delivery
   - **API calls**: `setPaymentMethod()`

3. **Billing Address**
   - **Purpose**: Required for payment processing and tax calculation
   - **Guest users**: Complete billing address form
   - **Logged-in users**: Select from saved billing addresses
   - **API calls**: `setBillingAddress()`

4. **Order Placement**
   - **Review**: Summary shows virtual products, payment method, billing address
   - **No shipping**: No delivery options or shipping costs displayed
   - **Requirements**: Accept terms and conditions
   - **API calls**: `placeOrder()` - instant digital delivery

5. **Order Confirmation**
   - **Digital delivery**: Download links, access keys, or account activation
   - **No shipping**: No tracking information or delivery address shown
   - **Immediate access**: Virtual products available instantly

### Cart Type Detection

The checkout uses a simple binary detection system:

- **Pure Virtual Cart**: `isVirtualCart(data)` returns `true` → Follows Virtual Product Flow (5 steps)
- **Physical or Mixed Cart**: `isVirtualCart(data)` returns `false` → Follows Standard Physical Product Flow (6 steps)

> **Note**: There is no explicit "mixed cart" handling. Carts containing ANY physical products are treated as physical carts and require shipping information, even if they also contain virtual products.

### Key Features

- **User Authentication**: Supports both guest checkout and logged-in customers
- **Customer Addresses**: Logged-in users can select from saved addresses or add new ones
- **Virtual Products**: Automatically detects virtual products and skips shipping-related steps
- **Binary Cart Detection**: Pure virtual carts skip shipping steps; any physical products require full shipping flow
- **Responsive Design**: Optimized for mobile and desktop experiences

> [!NOTE]
> This implementation follows a structured, step-based organization with event-driven architecture and container-based rendering.

## Architecture

### File Structure

- **`commerce-checkout-multi-step.js`** - Entry point and block decorator
- **`steps.js`** - Main implementation with StepsManager and step module coordination
- **`steps/`** - Modular step implementations
  - **`shipping.js`** - Shipping/contact information step logic
  - **`shipping-methods.js`** - Shipping method selection step logic
  - **`payment-methods.js`** - Payment method selection step logic
  - **`billing-address.js`** - Billing address step logic
- **`fragments.js`** - HTML fragments and step-specific fragment creation functions
- **`containers.js`** - Container rendering functions  
- **`components.js`** - UI component functions
- **`utils.js`** - Utility functions and helpers
- **`constants.js`** - Shared constants and configuration (including step-related constants)
- **`commerce-checkout-multi-step.css`** - Styling

### Key Patterns

- **Modular step architecture**: Each step is implemented in its own module with factory functions
- **Step-based rendering**: Each step has display, displaySummary, continue, and isComplete functions
- **CSS-based step visibility**: Uses `CHECKOUT_STEP_CONTENT` and `CHECKOUT_STEP_SUMMARY` classes to show/hide step elements without DOM manipulation
- **Dependency injection**: Steps receive shared dependencies and specific step function references
- **Container management**: Proper cleanup and recreation of components
- **Event-driven flow**: Uses event bus for state management
- **Form validation**: Client-side validation before API calls
- **Fragment architecture**: Modular HTML creation using dedicated fragment functions
- **Virtual product detection**: Automatically adapts checkout flow based on cart contents
- **User authentication**: Seamless support for both guest and logged-in user experiences
- **Customer address management**: Smart address selection and form rendering for authenticated users

### Naming Conventions

The codebase follows consistent naming patterns for better code organization and readability:

#### Constants

- Step-related CSS classes use descriptive names: `CHECKOUT_STEP_ACTIVE`, `CHECKOUT_STEP_CONTENT`, `CHECKOUT_STEP_SUMMARY`
- Form names follow the pattern: `[CONTEXT]_FORM_NAME` (e.g., `LOGIN_FORM_NAME`, `SHIPPING_FORM_NAME`)
- Session storage keys include their purpose: `SHIPPING_ADDRESS_DATA_KEY`, `BILLING_ADDRESS_DATA_KEY`

#### Variables

- Step fragment variables include "Step": `shippingStepFragment`, `paymentMethodsStepFragment`
- Element references use descriptive prefixes: `$shippingStep`, `$paymentMethodsList`

#### Functions

- Fragment creation functions follow the pattern: `create[StepName]StepFragment()`
  - `createShippingStepFragment()`
  - `createShippingMethodsStepFragment()`
  - `createPaymentMethodsStepFragment()`
  - `createBillingAddressStepFragment()`
- Step display functions: `display[StepName]Step()` and `display[StepName]StepSummary()`
- Continue functions: `continueFrom[CurrentStep]()` - indicating which step they're continuing from
- Flow handler functions: `handleCheckoutFlow()` - unified handler for all cart types
- Step completion validators: `is[StepName]StepComplete()` - modular validation functions

## Step-by-Step Implementation

### 1. Entry Point and Initialization

The main entry point sets up meta tags and initializes the StepsManager:

```javascript
export default async function decorate(block) {
  setMetaTags('Checkout');
  document.title = 'Checkout';

  block.replaceChildren(createCheckoutFragment());

  const stepsManager = createStepsManager(block);
  await stepsManager.init();
}
```

### 2. Constants and Configuration

Constants are centrally managed in `constants.js`:

```javascript
// Key form names for validation
const LOGIN_FORM_NAME = 'login-form';
const SHIPPING_FORM_NAME = 'selectedShippingAddress';
const BILLING_FORM_NAME = 'selectedBillingAddress';
const TERMS_AND_CONDITIONS_FORM_NAME = 'checkout-terms-and-conditions__form';

// CSS classes for step management
const CHECKOUT_STEP_ACTIVE = 'checkout__step--active';
const CHECKOUT_EMPTY_CLASS = 'checkout__content--empty';

// Session storage keys
const SHIPPING_ADDRESS_DATA_KEY = 'selectedShippingAddress_addressData';
const BILLING_ADDRESS_DATA_KEY = 'selectedBillingAddress_addressData';
```

### 3. CSS-Based Step Visibility Control

The multi-step checkout uses a CSS-based approach to control step visibility without DOM manipulation:

```css
/* By default, show summaries and hide content */
.checkout__step .checkout__step-content {
  display: none;
}

.checkout__step .checkout__step-summary {
  display: grid;
}

/* When step is active, show content and hide summaries */
.checkout__step--active .checkout__step-content {
  display: grid;
}

.checkout__step--active .checkout__step-summary {
  display: none;
}
```

#### How It Works

- **All steps exist in the DOM** - No creating/destroying elements
- **`CHECKOUT_STEP_CONTENT`** - Forms, inputs, buttons (hidden by default)
- **`CHECKOUT_STEP_SUMMARY`** - Completed step summaries (shown by default)
- **`CHECKOUT_STEP_ACTIVE`** - Toggles between content and summary views

#### Benefits

- **Performance**: No DOM manipulation, just CSS class toggling
- **Accessibility**: Screen readers can navigate all content
- **State preservation**: Form values remain intact when switching steps
- **Smooth transitions**: CSS can animate visibility changes
- **SEO friendly**: All content is present in DOM

### 4. Modular Step Architecture

The checkout is organized into separate step modules for better maintainability:

#### Step Module Structure

Each step module (`steps/[step-name].js`) exports a factory function that returns five standardized methods:

- **`display(active, data)`** - Renders the step UI with forms and components
- **`displaySummary(...)`** - Shows completed step summary with edit option
- **`continue()`** - Validates inputs, makes API calls, and proceeds to next step
- **`isComplete(data, flags)`** - Checks if step has all required data for completion
- **`isActive()`** - Returns whether the step is currently active (visible to user)

#### Step Dependencies

Steps receive shared dependencies (form refs, authentication, etc.) and specific function references to call other steps. This enables proper coordination without tight coupling.

### 5. State Management

The StepsManager maintains global checkout state:

- **Cart type detection** - Tracks if cart contains virtual vs physical products
- **Progress tracking** - Prevents concurrent step processing during API calls
- **Form references** - Enables cross-step communication and validation
- **Authentication state** - Manages guest vs logged-in user experience
- **Element references** - Provides scoped DOM access for all components

### 6. HTML Layout Structure

The implementation uses fragments with CSS class selectors and dedicated fragment creation functions:

```javascript
// Create the main checkout structure using fragments
const checkoutFragment = createCheckoutFragment();
block.replaceChildren(checkoutFragment);

// Use scoped selectors to access elements
const getElement = createScopedSelector(block);
const { checkout } = selectors;

// Access elements using class selectors
const elements = {
  $content: getElement(checkout.content),           // .checkout__content
  $loader: getElement(checkout.loader),             // .checkout__loader
  $loginForm: getElement(checkout.loginForm),       // .checkout__login
  $shippingAddressForm: getElement(checkout.shippingAddressForm), // .checkout__shipping-form
  $paymentMethodsList: getElement(checkout.paymentMethodsList),   // .checkout__payment-methods-list
  // ... other elements accessed via class selectors
};
```

#### Fragment Creation Functions

The checkout structure is built using specialized fragment creation functions:

```javascript
// Step-specific fragment creation functions
const shippingStepFragment = getMainElement(checkout.shippingStep);
const shippingMethodsStepFragment = getMainElement(checkout.shippingMethodStep);
const paymentMethodsStepFragment = getMainElement(checkout.paymentStep);
const billingAddressStepFragment = getMainElement(checkout.billingStep);

// Append step-specific fragments
shippingStepFragment.appendChild(createShippingStepFragment());
shippingMethodsStepFragment.appendChild(createShippingMethodsStepFragment());
paymentMethodsStepFragment.appendChild(createPaymentMethodsStepFragment());
billingAddressStepFragment.appendChild(createBillingAddressStepFragment());
```

Each fragment creation function returns structured HTML for its respective checkout step:

- `createShippingStepFragment()` - Creates login and shipping address forms
- `createShippingMethodsStepFragment()` - Creates shipping method selection UI
- `createPaymentMethodsStepFragment()` - Creates payment method selection and billing options
- `createBillingAddressStepFragment()` - Creates billing address form

The actual HTML structure is generated by `createCheckoutFragment()` which creates:

```html
<div class="checkout__wrapper">
  <div class="checkout__loader"></div>
  <div class="checkout__merged-cart-banner"></div>
  <div class="checkout__content">
    <div class="checkout__main">
      <div class="checkout__header checkout__block"></div>
      <div class="checkout__empty-cart checkout__block"></div>
      <div class="checkout__server-error checkout__block"></div>
      <div class="checkout__out-of-stock checkout__block"></div>
      
      <!-- Step containers with nested elements -->
      <div class="checkout__shipping-address checkout__block checkout__step">
        <div class="checkout__login checkout__block checkout__step-content"></div>
        <div class="checkout__login-form-summary checkout__block checkout__step-summary"></div>
        <div class="checkout__shipping-form checkout__block checkout__step-content"></div>
        <div class="checkout__shipping-form-summary checkout__block checkout__step-summary"></div>
        <div class="checkout__continue-to-shipping-methods checkout__block checkout__step-button checkout__step-content"></div>
      </div>
      
      <!-- Additional step containers -->
    </div>
    <div class="checkout__aside">
      <div class="checkout__order-summary checkout__block"></div>
      <div class="checkout__cart-summary checkout__block"></div>
    </div>
  </div>
</div>
```

### 7. Step Implementation Pattern

Each step module follows a consistent interface:

#### Individual Step Responsibilities

- **Shipping Step** (`steps/shipping.js`) - Login form and shipping address (handles virtual product logic)
- **Shipping Methods Step** (`steps/shipping-methods.js`) - Delivery method selection (skipped for virtual products)  
- **Payment Methods Step** (`steps/payment-methods.js`) - Payment selection and bill-to-shipping option
- **Billing Address Step** (`steps/billing-address.js`) - Billing address form (conditional on bill-to-shipping)

#### Shared Step Functions

All step modules export the same standardized interface with these main functions:

- **`display(active, data)`** - Renders the step UI with forms, components, and continue button
- **`displaySummary(...)`** - Shows completed step summary with edit option and deactivates the step
- **`continue()`** - Validates forms, makes API calls, proceeds to next step, and emits `checkout/step/completed`
- **`isComplete(data)`** - Checks if step has all required data for completion
- **`isActive()`** - Returns whether the step is currently active (visible to user)

#### Common Step Patterns

All step modules follow consistent patterns:

**Factory Function Pattern:**

```javascript
export const create[StepName]Step = (dependencies) => {
  // Step-specific elements and logic
  const elements = { ... };
  
  // Main functions
  async function display[StepName]Step(active, data) { ... }
  async function display[StepName]StepSummary(...) { ... }
  const continueFrom[StepName]Step = withOverlaySpinner(async () => { ... });
  const is[StepName]StepComplete = (data) => { ... };
  const is[StepName]StepActive = () => { ... };
  
  // Return standardized interface
  return {
    continue: continueFrom[StepName]Step,
    display: display[StepName]Step,
    displaySummary: display[StepName]StepSummary,
    isActive: is[StepName]StepActive,
    isComplete: is[StepName]StepComplete,
  };
};
```

**Step Lifecycle:**

1. **Display**: Render forms and components, activate step UI
2. **User Interaction**: User fills forms and clicks continue
3. **Continue**: Validate forms, make API calls, emit completion event
4. **Summary**: Show completed step summary with edit option
5. **Next Step**: Proceed to next step in flow

**API Integration Pattern:**

- Form validation before API calls
- Error handling with console logging
- Success handling with step progression
- Loading states with `withOverlaySpinner` wrapper

**Event Integration Pattern:**

- Listen to `checkout/values` for form data
- Listen to `checkout/addresses/*` for address data
- Emit `checkout/step/completed` on successful completion
- Handle cart updates through event listeners

#### Implementation Patterns

- **Step Activation**: Uses CSS classes (`CHECKOUT_STEP_ACTIVE`) to control visibility
- **Conditional Rendering**: Different UI for guest vs logged-in users and virtual vs physical products
- **Form Validation**: Client-side validation before API calls
- **Error Handling**: Graceful handling of API failures
- **Spinner Integration**: Loading states during API operations
- **Event-driven Flow**: Listens to cart updates and user authentication changes
- **Inter-step Communication**: Steps call each other through injected function references

#### Virtual vs Physical Product Logic

- **Virtual Products**: Skip shipping methods step within unified flow
- **Physical Products**: Full flow including shipping address and method selection
- **Mixed Carts**: Treated as physical products (require shipping information)
- **Step-aware Logic**: Each step module handles virtual product conditions internally

#### Summary and Edit Pattern

Each completed step renders a summary with an edit button that reactivates the step for modification.

### 8. Container Management

Containers are modular components that handle their own lifecycle and rendering:

- **Independent Rendering**: Each container manages its own DOM updates and lifecycle
- **Element Binding**: Containers render to designated DOM elements
- **Form References**: Shared form references enable cross-step communication
- **Automatic Cleanup**: Containers handle mounting and unmounting of dropin components
- **Authentication Awareness**: Different containers for guest vs logged-in users

### 9. Event Handlers

Event handlers are the core logic that responds to checkout state changes and manages the step-by-step flow. They listen to the event bus and automatically update the UI based on cart data, user authentication, and checkout progress.

#### Key Event Handlers

- **`handleCheckoutUpdate`** - Responds to cart changes and determines which step to display
- **`handleAuthenticated`** - Manages login state changes and modal dismissal  
- **`handleOrderPlaced`** - Processes successful orders and redirects to confirmation
- **`updateContainers`** - Refreshes containers when user authentication changes

#### Event Handler Responsibilities

- **State-based rendering**: Automatically shows the correct step based on completion status
- **Virtual product detection**: Adapts flow for virtual products vs physical products
- **Authentication handling**: Switches between guest and logged-in user experiences
- **Cart merge handling**: Updates cart state during login, natural flow handles transitions
- **Progress validation**: Ensures all required data is collected before advancing
- **Error handling**: Manages API failures and validation errors

#### Flow Management Architecture

The checkout uses a unified flow handler that adapts based on cart type:

- **`handleCheckoutFlow`**: Unified flow handler for all cart types with conditional logic
- **Conditional Steps**: Automatically skips shipping methods step for virtual products
- **Billing Integration**: Billing logic is integrated directly into the unified flow

#### Step Completion Validation

Each step module provides its own completion validation through the `isComplete` method:

- **`steps.shipping.isComplete(data, isVirtual)`**: Email only for virtual products, email + address for physical
- **`steps.shippingMethods.isComplete(data)`**: Shipping method selection (automatically skipped for virtual products)
- **`steps.paymentMethods.isComplete(data)`**: Payment method selection (applies to all cart types)
- **`steps.billingAddress.isComplete(data)`**: Billing address validation (applies to all cart types)

#### Event Registration

Event handlers are registered during initialization to listen for cart updates, authentication changes, and order completion.

```javascript
// Register event handlers
async function init() {
  events.on('authenticated', handleAuthenticated);
  events.on('checkout/initialized', handleCheckoutUpdate, { eager: true });
  events.on('checkout/updated', handleCheckoutUpdate);
  events.on('order/placed', handleOrderPlaced);
  events.on('checkout/step/completed', handleCheckoutStepCompleted);

  // Render initial components
  await Promise.all([
    renderMergedCartBanner(elements.$mergedCartBanner),
    renderOutOfStock(elements.$outOfStock),
    renderServerError(elements.$serverError, block),
    renderCheckoutHeader(elements.$header),
    // ... other initial renders
  ]);
}
```

### 10. Event System Architecture

The multi-step checkout implements a comprehensive event-driven architecture for inter-step communication and state management.

#### Core Events

**Checkout Flow Events:**

- **`checkout/initialized`** - Triggered when checkout is first loaded with cart data
  - **Purpose**: Initial setup and first step determination
  - **Handler**: `handleCheckoutUpdate`
  - **Eager**: `true` - processes immediately if cart data is already available

- **`checkout/updated`** - Triggered when cart data changes (items, addresses, payment, etc.)
  - **Purpose**: Re-evaluates which step to display based on current cart state
  - **Handler**: `handleCheckoutUpdate`
  - **Behavior**: Determines next step in flow based on completion status

- **`checkout/step/completed`** - Emitted by each step module when it successfully completes
  - **Purpose**: Enables place order button when all required steps are finished
  - **Handler**: `handleCheckoutStepCompleted`
  - **Emitted by**: All step modules (`shipping.js`, `shipping-methods.js`, `payment-methods.js`, `billing-address.js`)
  - **Logic**: Checks if all steps are complete and no step is currently active, then enables place order

**Authentication Events:**

- **`authenticated`** - Triggered when user logs in during checkout
  - **Purpose**: Switches from guest forms to customer address selection
  - **Handler**: `handleAuthenticated`
  - **Actions**: Updates containers and refreshes step display

**Order Events:**

- **`order/placed`** - Triggered when order is successfully submitted
  - **Purpose**: Redirects to order confirmation and clears session data
  - **Handler**: `handleOrderPlaced`
  - **Actions**: Clears address data, redirects to order details page

#### Inter-Step Communication Events

**Address Communication:**

- **`checkout/addresses/shipping`** - Emitted when shipping address is selected or updated
  - **Purpose**: Shares shipping address data between steps
  - **Emitted by**: Shipping address containers in `containers.js`
  - **Used by**:
    - `steps/shipping.js` - For retrieving current shipping address
    - `steps/payment-methods.js` - For bill-to-shipping address functionality
  - **Data**: Contains complete address object with validation status

- **`checkout/addresses/billing`** - Emitted when billing address is selected or updated
  - **Purpose**: Shares billing address data between steps
  - **Emitted by**: Billing address containers in `containers.js`
  - **Used by**: `steps/billing-address.js` - For retrieving current billing address
  - **Data**: Contains complete billing address object

#### Event Flow Architecture

```javascript
// Step completion flow
steps.shipping.continue() → events.emit('checkout/step/completed', null)
                        ↓
handleCheckoutStepCompleted() → checks all steps → enables place order if complete

// Address sharing flow
renderShippingAddressForm() → user input → events.emit('checkout/addresses/shipping', values)
                           ↓
steps.paymentMethods.displaySummary() → events.lastPayload('checkout/addresses/shipping')

// Cart update flow
Cart API updates → events.emit('checkout/updated', data) → handleCheckoutUpdate() → determine next step
```

#### Event Handling Patterns

**Debounced Emissions:**
Address events use debounced emissions to prevent excessive API calls:

```javascript
const notifyValues = debounce((values) => {
  events.emit('checkout/addresses/shipping', values);
}, DEBOUNCE_TIME);
```

**Last Payload Access:**
Steps can access the most recent event data using `lastPayload()`:

```javascript
const { data: shippingAddress } = events.lastPayload('checkout/addresses/shipping');
const { data: billingAddress } = events.lastPayload('checkout/addresses/billing');
```

**Conditional Event Processing:**
Event handlers check current state before processing to prevent race conditions:

```javascript
const handleCheckoutStepCompleted = () => {
  if (checkoutSteps.some((step) => step.isActive())) return; // Prevent processing if step is active
  // ... process completion logic
};
```

### 11. Order Confirmation

After successful order placement, the checkout transitions to an order confirmation view:

- **Page Transition**: Updates meta tags, title, and URL to order details page
- **Order API Integration**: Initializes order dropin with order data and localization
- **Component Rendering**: Displays order status, customer details, cost summary, and product list
- **Virtual Product Handling**: Shows appropriate confirmation for digital vs physical products
- **Navigation**: Provides continue shopping functionality

### 12. Virtual Product Support

The checkout automatically detects virtual products and provides a streamlined flow:

- **Automatic Detection**: Uses `isVirtualCart()` utility to determine cart type
- **Unified Flow Handler**: Single `handleCheckoutFlow()` with conditional logic for virtual products
- **Component Management**: Removes shipping method step title for virtual products using `removeComponent()`
- **Container Management**: Unmounts shipping-related containers for virtual products
- **Direct Navigation**: Proceeds directly from login to payment for virtual-only carts
- **Cart Merge Support**: Seamlessly handles virtual-to-physical transitions through natural flow progression
- **Mixed Cart Handling**: Carts with any physical products follow the full shipping flow

### 13. User Authentication Handling

The checkout seamlessly supports both guest and logged-in users:

- **Authentication Detection**: Uses event payload to determine user authentication status
- **Dynamic Container Updates**: Renders different UI components based on authentication state
- **Guest Experience**: Provides address forms for guest users to enter new information
- **Logged-in Experience**: Shows saved address selection for authenticated customers
- **Modal Management**: Automatically closes login modals upon successful authentication
- **Mid-checkout Login**: Supports user authentication at any point during checkout

## Key Implementation Features

### Form Validation Pattern

- Consistent client-side validation across all checkout steps
- Uses native form validation with custom error handling
- Prevents submission until all required fields are valid

### Spinner Integration

- Higher-order function pattern for loading states
- Overlay spinner during API operations
- Automatic cleanup after completion or error

### Element Management

- Scoped selectors for reliable element access
- Components manage their own lifecycle and cleanup
- No direct DOM element storage to prevent memory leaks

### State-based Initialization

The checkout intelligently determines which step to show based on the current cart state using the step modules' `isComplete` methods:

- `!steps.shipping.isComplete(data, currentCartIsVirtual)` → Step 1 (Login/Shipping)
- `!steps.shippingMethods.isComplete(data)` → Step 2 (Shipping Methods) - skipped for virtual
- `!steps.paymentMethods.isComplete(data)` → Step 3 (Payment Methods)
- `!steps.billingAddress.isComplete(data)` → Step 4 (Billing)
- All steps complete → Enable place order

### Cart Merge Scenario Handling

The checkout handles complex cart merge scenarios when guest users log in mid-checkout:

- **Virtual-to-Physical Transition**: When a guest with virtual products logs in to an account with physical products
- **State Updates**: `currentCartIsVirtual` automatically updates to reflect the merged cart type
- **Container Updates**: `updateContainers()` switches between guest and authenticated address forms
- **Natural Flow**: When user continues from shipping step, the unified flow automatically handles the new cart type
- **Component Management**: Shipping method title restoration handled through standard cart type logic
- **User Experience**: User selects their address and naturally proceeds to shipping methods step

## Styling

The multi-step checkout uses a responsive grid layout with:

- Step-based visibility control
- Responsive main/aside layout
- Loading indicators and overlays
- Summary component styling
- Button and form styling

Complete styles are in `commerce-checkout-multi-step.css`.

## Container Functions

The implementation separates rendering logic into `containers.js`:

**Guest User Containers:**

- `renderLoginForm` - Email input form for guest checkout
- `renderShippingAddressForm` - Shipping address form with validation
- `renderBillingAddressForm` - Billing address form with validation

**Authenticated User Containers:**

- `renderCustomerShippingAddresses` - Customer shipping address selection
- `renderCustomerBillingAddresses` - Customer billing address selection

**Common Containers:**

- `renderShippingMethods` - Delivery method selection
- `renderPaymentMethods` - Payment method selection with credit card support
- `renderBillToShippingAddress` - Bill-to-shipping checkbox
- `renderTermsAndConditions` - Checkout terms acceptance
- `renderPlaceOrder` - Final order placement with validation

**State Containers:**

- `renderEmptyCart` - Empty cart state
- `renderMergedCartBanner` - Cart merge notification
- `renderOutOfStock` - Out of stock warning
- `renderServerError` - Error state handling

Order confirmation containers:

- `renderOrderHeader` - Order confirmation header
- `renderOrderStatus` - Order status display
- `renderCustomerDetails` - Customer information
- `renderOrderCostSummary` - Order cost breakdown
- `renderOrderProductList` - Order product details

## Utility Functions

Key utilities in `utils.js`:

**Cart and Product Detection:**

- `isDataEmpty` - Check for empty cart/checkout state  
- `isVirtualCart` - Detect if cart contains only virtual products
- `getCartAddress` - Extract shipping/billing address from cart data
- `getCartShippingMethod` - Extract selected shipping method
- `getCartPaymentMethod` - Extract selected payment method

**Data Transformation:**

- `transformAddressFormValues` - Convert form data to API format

**UI Utilities:**

- `setMetaTags` - Update page meta information
- `scrollToElement` - Smooth scroll to element
- `removeModal` - Close modal dialogs
- `showModal` - Display modal with content

**Feature-Specific:**

- `estimateShippingCost` - Calculate shipping estimates (disabled for virtual products)

## Binary Cart Type Logic

The checkout implementation uses a simple binary approach for cart type detection based on the `isVirtualCart()` utility function.

### How `isVirtualCart()` Works

- **Returns `true`**: Only when ALL cart items are virtual products
- **Returns `false`**: For pure physical carts OR mixed carts (any physical products present)

### Implications

- **No explicit mixed cart logic**: Mixed carts are handled as physical carts
- **Conservative approach**: Any physical product requires full shipping flow
- **Virtual products in mixed carts**: No special handling, processed with physical items

Fragment creation utilities in `fragments.js`:

- `createShippingStepFragment` - Creates login and shipping address forms
- `createShippingMethodsStepFragment` - Creates shipping method selection UI
- `createPaymentMethodsStepFragment` - Creates payment method selection and billing options
- `createBillingAddressStepFragment` - Creates billing address form
- `createCheckoutFragment` - Creates main checkout structure
- `createOrderConfirmationFragment` - Creates order confirmation layout

Component utilities in `components.js`:

- `renderSpinner` - Loading indicator component
- `renderStepContinueBtn` - Step navigation buttons
- `renderCheckoutHeader` - Main checkout header
- `renderShippingStepTitle` - Step title components
- `removeComponent` - Component lifecycle management
