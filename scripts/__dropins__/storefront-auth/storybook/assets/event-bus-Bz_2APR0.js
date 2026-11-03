import{u as o,a as e,M as r,U as i,k as c}from"./iframe-S6tzT0R4.js";import"./preload-helper-C1FmrZbK.js";function a(t){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...o(),...t.components};return e(c,{children:[e(r,{title:"API/Event Bus"}),`
`,e(i,{children:[e(n.h1,{id:"event-bus",children:"Event Bus"}),e(n.p,{children:`The Event Bus provides a communication system for different parts of your
application to exchange messages and stay synchronized. It enables event-driven
architecture for drop-ins, allowing Containers to react to changes from other
Containers and communicate data changes to the storefront.`}),e(n.h2,{id:"import",children:"Import"}),e(n.p,{children:"From drop-in project using the SDK"}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`import { events } from '@adobe-commerce/elsie/lib';
`})}),e(n.p,{children:"From integration project (storefront)"}),e(n.pre,{children:e(n.code,{className:"language-js",children:`import { events } from '@dropins/tools/event-bus.js';
`})}),e(n.h2,{id:"core-methods",children:"Core Methods"}),e(n.h3,{id:"subscribe-to-events",children:"Subscribe to Events"}),e(n.p,{children:"Subscribe to events and receive notifications when they occur."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`const eventListener = events.on('<event>', (payload) => {
  // Handle the event payload
  console.log('Event received:', payload);
});

// Stop listening to the event
eventListener.off();
`})}),e(n.p,{children:e(n.strong,{children:"Example:"})}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Listen for cart updates
const cartListener = events.on('cart/data', (cartData) => {
  if (cartData) {
    console.log(\`Cart has \${cartData.totalQuantity} items\`);
    updateCartUI(cartData);
  } else {
    console.log('Cart is empty');
    showEmptyCart();
  }
});

// Later, when you want to stop listening
cartListener.off();
`})}),e(n.h3,{id:"emit-events",children:"Emit Events"}),e(n.p,{children:"Broadcast events to all listeners across your application."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`events.emit('<event>', payload);
`})}),e(n.p,{children:e(n.strong,{children:"Examples:"})}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Emit cart data
const cartData = {
  id: 'cart-123',
  totalQuantity: 2,
  items: [
    { uid: 'item-1', quantity: 1, sku: 'PROD-001', name: 'Product Name' },
  ],
};

events.emit('cart/data', cartData);
`})}),e(n.h3,{id:"get-last-event-payload",children:"Get Last Event Payload"}),e(n.p,{children:"Retrieve the most recent payload for a specific event."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`const lastPayload = events.lastPayload('<event>');
`})}),e(n.p,{children:e(n.strong,{children:"Example:"})}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Get the current cart state without waiting for an event
const currentCart = events.lastPayload('cart/data');

if (currentCart) {
  console.log('Current cart total:', currentCart.totalQuantity);
}
`})}),e(n.h3,{id:"enable-debug-logging",children:"Enable Debug Logging"}),e(n.p,{children:"Turn on console logging to debug event flow."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Enable logging to see all events in console
events.enableLogger(true);
`})}),e(n.h2,{id:"advanced-features",children:"Advanced Features"}),e(n.h3,{id:"eager-loading",children:"Eager Loading"}),e(n.p,{children:`Execute the event handler immediately with the last known payload when
subscribing. This is useful for getting the current state without waiting for
the next event.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Handler will execute immediately if there's a previous payload
const listener = events.on(
  'cart/data',
  (cartData) => {
    console.log('Cart data received:', cartData);
  },
  { eager: true },
);
`})}),e(n.p,{children:e(n.strong,{children:"Use Cases:"})}),e(n.ul,{children:[`
`,e(n.li,{children:"Initialize UI components with current state"}),`
`,e(n.li,{children:"Avoid waiting for the first event emission"}),`
`,e(n.li,{children:"Ensure components have the latest data on mount"}),`
`]}),e(n.h3,{id:"event-scoping",children:"Event Scoping"}),e(n.p,{children:`Create namespaced events to avoid conflicts between different parts of your
application.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Subscribe to a scoped event
const scopedListener = events.on(
  'data/update',
  (data) => {
    console.log('Scoped data received:', data);
  },
  { scope: 'feature-a' },
);

// Emit a scoped event
events.emit('data/update', payload, { scope: 'feature-a' });

// Get last payload for a scoped event
const lastScopedData = events.lastPayload('data/update', {
  scope: 'feature-a',
});
`})}),e(n.p,{children:[e(n.strong,{children:"Scoped Event Names:"}),` When using scopes, the actual event name becomes
`,e(n.code,{children:"scope/event"}),". For example:"]}),e(n.ul,{children:[`
`,e(n.li,{children:[e(n.code,{children:"'feature-a/data/update'"})," instead of ",e(n.code,{children:"'data/update'"})]}),`
`,e(n.li,{children:[e(n.code,{children:"'module-b/user/action'"})," instead of ",e(n.code,{children:"'user/action'"})]}),`
`]}),e(n.p,{children:e(n.strong,{children:"Use Cases:"})}),e(n.ul,{children:[`
`,e(n.li,{children:"Separate different features or modules"}),`
`,e(n.li,{children:"Different contexts within the same application"}),`
`,e(n.li,{children:"Component-specific event handling"}),`
`]}),e(n.h3,{id:"combining-options",children:"Combining Options"}),e(n.p,{children:"Use both eager loading and scoping together for powerful event handling."}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Subscribe to a scoped event with eager loading
const listener = events.on(
  'locale',
  (locale) => {
    console.log('Current locale:', locale);
  },
  {
    eager: true,
    scope: 'user-preferences',
  },
);
`})}),e(n.h2,{id:"event-driven-drop-ins",children:"Event-Driven Drop-ins"}),e(n.p,{children:`The Event Bus enables drop-ins to be truly event-driven, allowing for loose
coupling between components and seamless communication across the application.`}),e(n.h3,{id:"container-to-container-communication",children:"Container-to-Container Communication"}),e(n.p,{children:`Containers can react to changes from other Containers, enabling complex
interactions without direct dependencies.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Product Container: Emits when a product is added to cart
function ProductContainer() {
  const handleAddToCart = (product) => {
    // Add to cart logic...

    // Notify other containers about the cart change
    events.emit('cart/data', updatedCartData);
  };

  return (
    <button onClick={() => handleAddToCart(product)}>
      Add to Cart
    </button>
  );
}

// Cart Container: Reacts to cart changes from any source
function CartContainer() {
  useEffect(() => {
    const cartListener = events.on('cart/data', (cartData) => {
      updateCartDisplay(cartData);
      updateCartBadge(cartData.totalQuantity);
    }, { eager: true });

    return () => cartListener.off();
  }, []);

  return <CartDisplay />;
}

// Mini Cart Container: Also reacts to the same cart changes
function MiniCartContainer() {
  useEffect(() => {
    const cartListener = events.on('cart/data', (cartData) => {
      updateMiniCart(cartData);
    }, { eager: true });

    return () => cartListener.off();
  }, []);

  return <MiniCart />;
}
`})}),e(n.h3,{id:"storefront-communication",children:"Storefront Communication"}),e(n.p,{children:`Drop-ins can communicate data changes to the storefront, enabling seamless
integration with the host application.`}),e(n.pre,{children:e(n.code,{className:"language-ts",children:`// Authentication Container: Notifies storefront of login/logout
function AuthContainer() {
  const handleLogin = (userData) => {
    // Login logic...

    // Notify storefront of authentication change
    events.emit('authenticated', true);
  };

  const handleLogout = () => {
    // Logout logic...

    // Notify storefront of authentication change
    events.emit('authenticated', false);
  };

  return <AuthForm onLogin={handleLogin} onLogout={handleLogout} />;
}

// Storefront can listen for authentication changes
// This would be in the host application
const authListener = events.on('authenticated', (isAuthenticated) => {
  if (isAuthenticated) {
    showUserMenu();
    enableCheckout();
  } else {
    hideUserMenu();
    disableCheckout();
  }
}, { eager: true });
`})}),e(n.h2,{id:"best-practices",children:"Best Practices"}),e(n.ol,{children:[`
`,e(n.li,{children:[e(n.strong,{children:"Always unsubscribe"}),` from events when components unmount to prevent memory
leaks`]}),`
`,e(n.li,{children:[e(n.strong,{children:"Use scopes"})," to organize events by feature or component"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Enable eager loading"})," when you need immediate access to current state"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Use descriptive event names"})," that clearly indicate what data they contain"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Handle null/undefined payloads"})," gracefully in your event handlers"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Enable logging during development"})," to debug event flow"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Keep event payloads lightweight"})," to avoid performance issues"]}),`
`,e(n.li,{children:[e(n.strong,{children:"Document your event contracts"})," so other developers know what to expect"]}),`
`]})]})]})}function d(t={}){const{wrapper:n}={...o(),...t.components};return n?e(n,{...t,children:e(a,{...t})}):a(t)}export{d as default};
//# sourceMappingURL=event-bus-Bz_2APR0.js.map
