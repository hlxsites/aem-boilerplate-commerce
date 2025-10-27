import CartSummaryTable from '@dropins/storefront-cart/containers/CartSummaryTable.js';
import { render as cartProvider } from '@dropins/storefront-cart/render.js';

export default async function decorate(block) {
    cartProvider.render(CartSummaryTable, {
        allowRemoveItems: false,
        allowQuantityUpdates: false
    })(block);
}