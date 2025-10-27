import { events } from '@dropins/tools/event-bus.js';
import { addProductsToCart } from '@dropins/storefront-cart/api.js';

export default async function decorate(block) {
    const blockAttributes = Array.from(block.attributes);

    const button = document.createElement('button');
    blockAttributes.forEach(attribute => {
        button.setAttribute(attribute.name, attribute.value);
    });

    button.innerText = 'Cart Setup';
    button.addEventListener('click', handleCartSetupClick);

    block.replaceWith(button);

    events.on('cart/data', (data) => {
        const isEmpty = data?.items?.length === 0 ?? true;
        const isGuest = data?.isGuestCart ?? true;

        // Only enable if not guest and cart is empty
        if (!isGuest && isEmpty) {
            button.removeAttribute('disabled');
        }
        else {
            button.setAttribute('disabled', true);
        }
    });

    return button;
}

const handleCartSetupClick = async (event) => {
    event.preventDefault();

    const cartItems = JSON.parse(event.target.dataset.cartItems);

    const { data } = await addProductsToCart(cartItems);

    console.log('data', data);
}