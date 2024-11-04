/* eslint-disable import/no-cycle, camelcase, max-classes-per-file */
import { h, Component, Fragment, render } from '../preact.js';
import htm from '../htm.js';

import { store } from './api.js';
import { loadCSS } from '../aem.js';
import {
  getCart,
  removeItemFromCart,
  updateQuantityOfCartItem,
} from './cart.js';

const html = htm.bind(h);
let cartVisible = false;

function ConfirmDeletionOverlay(props) {
  const { close, confirm } = props;

  return html`<div class="overlay-background">
    <div class="overlay">
      <button class="close" onclick=${close}>Close</button>
      <div class="content">
        Are you sure you would like to remove this item from the shopping cart?
      </div>
      <div class="actions">
        <button onclick=${close}>Cancel</button>
        <button onclick=${confirm}>OK</button>
      </div>
    </div>
  </div>`;
}

class ProductCard extends Component {
  constructor(props) {
    super();
    this.state = {
      quantity: props.item.quantity,
      quantityValid: true,
      confirmDelete: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.quantity !== this.props.item.quantity) {
      this.setState({
        quantity: this.props.item.quantity,
        quantityValid: true,
      });
    }
  }

  static renderImage = (item) => {
    let image;
    if (item.configured_variant?.thumbnail?.url) {
      image = item.configured_variant.thumbnail.url;
    } else if (item.product?.thumbnail?.url) {
      image = item.product.thumbnail.url;
    }

    const url = new URL(image);
    url.search = '';

    return html`<picture>
      <source
        type="image/webp"
        srcset="
          ${url}?fit=bounds&height=131&width=105&bg-color=255,255,255&format=webply&optimize=medium
        "
      />
      <img
        class="product-image-photo"
        src="${url}?fit=bounds&height=131&width=105&quality=100&bg-color=255,255,255"
        max-width="105"
        max-height="131"
        alt=${item.product.name}
      />
    </picture>`;
  };

  onQuantityChange = (event) => {
    let { value } = event.target;
    let parsedQuantity = parseInt(value, 10);

    // Checks that the quantity is not less than 1
    if (parsedQuantity < 1) {
      parsedQuantity = 1;
    }

    const maxQuantity = this.props.item.product.max_sale_qty;

    // Check if the new quantity exceeds the maximum and prevent further increase
    if (parsedQuantity > maxQuantity) {
      // If it exceeds, set the quantity to the maximum and update the state
      parsedQuantity = maxQuantity;
      this.setState({ quantity: maxQuantity, quantityValid: true });
    } else if (parsedQuantity > 0) {
      // Otherwise, if the quantity is valid, update the state
      this.setState({ quantity: parsedQuantity, quantityValid: true });
    } else {
      // If the quantity is invalid, set quantityValid to false
      this.setState({ quantity: event.target.value, quantityValid: false }); // Use event.target.value here
      return;
    }

    clearTimeout(this.updateTimeout);
    this.updateTimeout = setTimeout(async () => {
      const { quantity: newQuantity } = this.state;
      const { uid } = this.props.item;
      try {
        await this.props.api.updateQuantityOfCartItem(uid, newQuantity);
        const updatedCart = this.props.api.store.getCart();
        this.setState({ cart: updatedCart });
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }, 300);
  };

  onSubmitQuantityChange = async (event) => {
    event.preventDefault();

    event.target.disabled = true;
    const { uid } = this.props.item;
    let { quantity } = this.state;

    // Checks that the quantity is not less than 1
    if (quantity < 1) {
      quantity = 1;
      this.setState({ quantity });
    }

    try {
      await this.props.api.updateQuantityOfCartItem(uid, quantity);
      const updatedCart = this.props.api.store.getCart();
      this.setState({ cart: updatedCart });
    } finally {
      event.target.disabled = false;
    }
  };

  render(props, state) {
    const { item, index, formatter } = props;
    const { product, prices, configurable_options } = props.item;
    const maxQuantity = props.item.product.max_sale_qty;

    return html`<li>
      <div class="minicart-product">
        <div class="image">
          <a href=${`/products/${product.url_key}/${product.sku.toLowerCase()}`}
            >${ProductCard.renderImage(item)}</a
          >
        </div>
        <div class="info">
          <div class="name">
            <a
              href=${`/products/${
                product.url_key
              }/${product.sku.toLowerCase()}`}
              dangerouslySetInnerHTML=${{ __html: product.name }}
            />
          </div>
          ${configurable_options &&
          html`<div class="options">
            <input type="checkbox" id="see-options-${index}" />
            <label for="see-options-${index}">See Details</label>
            <dl>
              ${configurable_options.map(
                ({ option_label, value_label }) => html`<${Fragment}>
                  <dt>${option_label}:</dt>
                  <dd>${value_label}</dd>
                <//>`
              )}
            </dl>
          </div>`}
          <div class="colour"><p>two-tone</p></div>
          <div class="size"><p>small</p></div>
          <form onSubmit=${this.onSubmitQuantityChange}>
            <div class="quantity">
              <button
                type="button"
                class="quantity-btn minus"
                onClick=${() =>
                  this.onQuantityChange({
                    target: { value: state.quantity - 1 },
                  })}
                disabled=${state.quantity <= 1}
              >
                -
              </button>
              <span class="quantity-value">${state.quantity}</span>
              <button
                type="button"
                class="quantity-btn plus"
                onClick=${() =>
                  this.onQuantityChange({
                    target: { value: state.quantity + 1 },
                  })}
              >
                +
              </button>
            </div>
          </form>
        </div>

        <div class="actions">
          <button
            class="remove-product"
            onclick=${() => this.setState({ confirmDelete: true })}
          >
            Remove
          </button>
          <div class="price">${formatter.format(prices.price.value)}</div>
        </div>
        ${state.confirmDelete &&
        html`<${ConfirmDeletionOverlay}
          close=${() => this.setState({ confirmDelete: false })}
          confirm=${() =>
            this.props.api.removeItemFromCart(item.uid, 'Cart Quick View')}
        />`}
      </div>
    </li>`;
  }
}

export class Minicart extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      cart: {},
    };
    this.formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  componentDidMount() {
    // Subscribe to store changes
    this.props.api.store.subscribe((cart) => {
      this.setState({ cart, loading: false });
    });
  }

  render(props, state) {
    if (!props.visible) {
      return null;
    }

    const { close } = props.api;

    const { cart } = state;
    if (!cart.items || cart.items.length === 0) {
      return html`<div class="minicart-panel empty">
        <div class="minicart-header">
          <button class="close" onClick=${() => close(false)}>Close</button>
        </div>
        <div className="cart-empty">
          You have no shopping items in your cart.
        </div>
      </div>`;
    }

    return html` <div class="minicart-panel">
      <div class="minicart-header">
        <div class="title">Your Cart (${cart.total_quantity})</div>

        <button class="close" onClick=${() => close(false)}>Close</button>
      </div>
      <ul class="minicart-list">
        ${state.cart.items.map(
          (item, index) =>
            html`<${ProductCard}
              index=${index}
              item=${item}
              formatter=${this.formatter}
              api=${props.api}
            />`
        )}
      </ul>
      <div class="minicart-checkout">
        <div class="checkout-message">
          <img src="/icons/truck.svg" alt="Free shipping icon" />
          <p>This order qualifies for <b>free shipping</b></p>
        </div>
        <div class="subtotal">
          <p>Sub-Total:</p>
          <p class="price">
            ${this.formatter.format(cart.prices.subtotal_excluding_tax.value)}
          </p>
        </div>
        <div class="import-fees">
          <p>Import Duties:</p>
          <p class="import-fee">Paid</p>
        </div>
        <div class="shipping">
          <p>Shipping:</p>
          <p class="shipping-fee">FREE</p>
        </div>
        <div class="total">
          <h2>total:</h2>
          <h2 class="total-price">
            ${this.formatter.format(cart.prices.subtotal_excluding_tax.value)}
          </h2>
        </div>
        <div class="promo">
          <div class="promo-accordion">
            <div class="promo-text" onclick=${() => this.togglePromoCode()}>
              <img src="/icons/promo-code.svg" alt="promo code image" />
              <p>Add promo code / gift card</p>
              <p class="extend-accordion">+</p>
            </div>
            <div
              class="promo-code-input"
              id="promoCodeInput"
              style="display: none;"
            >
              <input placeholder="Enter code" />
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }
}

export async function toggle(refetch = true) {
  if (!cartVisible) {
    // Load CSS
    await loadCSS('/styles/minicart.css');

    if (refetch && store.getCartId()) {
      await getCart();
    }

    const backdrop = document.createElement('div');
    backdrop.classList.add('minicart-backdrop');
    backdrop.addEventListener('click', () => {
      toggle(false);
    });
    document.body.appendChild(backdrop);
  } else {
    // Remove backdrop element from the DOM
    const backdrop = document.querySelector('.minicart-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  }

  cartVisible = !cartVisible;

  const app = html`<${Minicart}
    visible=${cartVisible}
    api=${{
      store,
      removeItemFromCart,
      updateQuantityOfCartItem,
      close: toggle,
    }}
  />`;
  render(app, document.querySelector('.minicart-wrapper > div'));
  toggleAccordion();
}

export async function showCart() {
  if (!cartVisible) {
    await toggle(false);
  }
}
